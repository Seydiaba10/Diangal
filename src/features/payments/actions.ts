"use server";

import { redirect } from "next/navigation";
import { getCurrentRole, getCurrentStudent } from "@/features/account/data";
import { MOCK_PLANS } from "@/mocks/plans";
import { logAudit, mockState } from "@/mocks/progress-store";
import { DEMO_PARENT, DEMO_SECOND_CHILD, DEMO_STUDENT_ID } from "@/mocks/users";
import type { PaymentChannel, PaymentRecord } from "@/types/domain";
import { PAYMENT_CHANNELS } from "./data";

const DAY_MS = 86_400_000;
const BENEFICIARIES: Record<string, string> = {
  [DEMO_STUDENT_ID]: "Awa Ndiaye",
  [DEMO_SECOND_CHILD.id]: `${DEMO_SECOND_CHILD.firstName} ${DEMO_SECOND_CHILD.lastName}`,
};

/**
 * Paiement d'un pass Premium (simulation phases 1-2 : succès immédiat).
 * Phase 5 : création de la facture PayDunya puis redirection ; l'activation se fait
 * uniquement à la réception du webhook signé, jamais sur la page de retour.
 */
export async function checkoutAction(formData: FormData) {
  const role = await getCurrentRole();
  const plan = MOCK_PLANS.find((p) => p.code === formData.get("plan"));
  const channel = formData.get("channel") as PaymentChannel;
  const beneficiaryId = role === "parent" ? String(formData.get("beneficiary") ?? "") : DEMO_STUDENT_ID;
  const back = role === "parent" ? "/parent/abonnements" : "/eleve/abonnement";

  if (!plan || !PAYMENT_CHANNELS.includes(channel) || !BENEFICIARIES[beneficiaryId]) redirect(`${back}?erreur=formulaire`);
  if (role === "student") {
    const student = await getCurrentStudent();
    if (student.isMinor && student.consentStatus !== "granted") redirect(`${back}?erreur=consentement`);
  } else if (role !== "parent") {
    redirect("/");
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
