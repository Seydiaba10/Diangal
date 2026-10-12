"use server";

import { redirect } from "next/navigation";
import { getCurrentRole, getCurrentStudent } from "@/features/account/data";
import { requireIdentity } from "@/features/account/session";
import { isSupabaseConfigured, publicEnv } from "@/lib/env";
import { paydunyaFromEnv } from "@/lib/payments/paydunya";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { MOCK_PLANS } from "@/mocks/plans";
import { logAudit, mockState } from "@/mocks/progress-store";
import { DEMO_PARENT, DEMO_SECOND_CHILD, DEMO_STUDENT_ID } from "@/mocks/users";
import type { PaymentChannel, PaymentRecord } from "@/types/domain";
import { PAYMENT_CHANNELS } from "./data";

const DAY_MS = 86_400_000;
const PLAN_CODES = ["monthly", "quarterly", "yearly", "bfem_pass"];
const BENEFICIARIES: Record<string, string> = {
  [DEMO_STUDENT_ID]: "Awa Ndiaye",
  [DEMO_SECOND_CHILD.id]: `${DEMO_SECOND_CHILD.firstName} ${DEMO_SECOND_CHILD.lastName}`,
};

/**
 * Paiement d'un pass Premium. Supabase : create_payment_intent (montant lu en base, payeur
 * vérifié), puis facture PayDunya et redirection. L'activation se fait uniquement à la
 * réception du webhook signé, jamais sur la page de retour.
 */
export async function checkoutAction(formData: FormData) {
  const role = await getCurrentRole();
  const planCode = String(formData.get("plan") ?? "");
  const channel = formData.get("channel") as PaymentChannel;
  const back = role === "parent" ? "/parent/abonnements" : "/eleve/abonnement";
  if (!PLAN_CODES.includes(planCode) || !PAYMENT_CHANNELS.includes(channel)) redirect(`${back}?erreur=formulaire`);
  if (role !== "student" && role !== "parent") redirect("/");

  if (isSupabaseConfigured()) {
    const { userId } = await requireIdentity();
    const beneficiary = role === "parent" ? String(formData.get("beneficiary") ?? "") : userId;
    const provider = paydunyaFromEnv();
    if (!provider) redirect(`${back}?erreur=indisponible`);

    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.rpc("create_payment_intent", {
      p_plan_code: planCode,
      p_beneficiary: beneficiary,
      p_channel: channel,
    });
    if (error?.message.includes("consent_required")) redirect(`${back}?erreur=consentement`);
    if (error || !data) redirect(`${back}?erreur=formulaire`);
    const intent = data as { reference: string; amount_fcfa: number; plan_name: string };

    const site = publicEnv.NEXT_PUBLIC_SITE_URL;
    let checkoutUrl: string;
    try {
      ({ checkoutUrl } = await provider.createCheckout({
        reference: intent.reference,
        amountFcfa: intent.amount_fcfa,
        description: `DIANGAL Premium · ${intent.plan_name}`,
        returnUrl: `${site}/paiement/retour?ref=${intent.reference}`,
        cancelUrl: `${site}${back}`,
        callbackUrl: `${site}/api/webhooks/paydunya`,
      }));
    } catch {
      redirect(`${back}?erreur=prestataire`);
    }
    redirect(checkoutUrl);
  }

  const plan = MOCK_PLANS.find((p) => p.code === planCode)!;
  const beneficiaryId = role === "parent" ? String(formData.get("beneficiary") ?? "") : DEMO_STUDENT_ID;
  if (!BENEFICIARIES[beneficiaryId]) redirect(`${back}?erreur=formulaire`);
  if (role === "student") {
    const student = await getCurrentStudent();
    if (student.isMinor && student.consentStatus !== "granted") redirect(`${back}?erreur=consentement`);
  }

  const now = Date.now();
  const sequence = String(mockState.payments.length + 6).padStart(4, "0");
  const payment: PaymentRecord = {
    id: crypto.randomUUID(),
    reference: `DGL-2610-${sequence}`,
    payerName: role === "parent" ? `${DEMO_PARENT.firstName} ${DEMO_PARENT.lastName}` : BENEFICIARIES[beneficiaryId]!,
    beneficiaryName: BENEFICIARIES[beneficiaryId]!,
    planCode: plan.code,
    amountFcfa: plan.priceFcfa,
    channel,
    status: "succeeded",
    createdAt: new Date(now).toISOString(),
  };
  mockState.payments.unshift(payment);
  // Prolongation : la nouvelle période démarre à la fin de l'abonnement en cours.
  const start = Math.max(now, mockState.premiumUntil.get(beneficiaryId) ?? 0);
  mockState.premiumUntil.set(beneficiaryId, start + plan.durationDays * DAY_MS);
  logAudit(payment.payerName, `paiement ${payment.reference} (${channel})`, payment.beneficiaryName);
  redirect(`/paiement/retour?ref=${payment.reference}`);
}
