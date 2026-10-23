"use server";

import { refresh } from "next/cache";
import { redirect } from "next/navigation";
import { getCurrentRole } from "@/features/account/data";
import { requireRole } from "@/features/account/guards";
import { requireIdentity } from "@/features/account/session";
import { isSupabaseConfigured } from "@/lib/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { logAudit, mockState } from "@/mocks/progress-store";
import { DEMO_ADMIN } from "@/mocks/users";
import { isReferralScenario } from "./presets";

// Parrainage : utilisation des jours gagnés, réglages et remboursements (admin).
// Les droits sont vérifiés en base (RPC) ; ici, on ne fait que relayer et rediriger.

const PAGE = "/parrainage";
const ADMIN_PAGE = "/admin/paiements";

/** Jours disponibles (après la garde) offerts à soi-même (élève) ou à un enfant relié (parent). */
export async function spendReferralDaysAction(formData: FormData) {
  const role = await getCurrentRole();
  if (role !== "student" && role !== "parent") redirect(PAGE);
  if (!isSupabaseConfigured()) {
    if (mockState.referral.daysAvailable === 0) redirect(`${PAGE}?jours=aucun`);
    mockState.referral.daysUsed += mockState.referral.daysAvailable;
    mockState.referral.daysAvailable = 0;
    redirect(`${PAGE}?jours=ok`);
  }
  const { userId } = await requireIdentity();
  const student = role === "student" ? userId : String(formData.get("eleve") ?? "");
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.rpc("use_referral_days", { p_student: student });
  if (error?.message.includes("no_days")) redirect(`${PAGE}?jours=aucun`);
  redirect(`${PAGE}?jours=${error ? "erreur" : "ok"}`);
}

/** Ouverture du parrainage et scénario de coût (admin en double authentification). */
export async function setReferralSettingsAction(formData: FormData) {
  await requireRole("admin");
  const scenario = formData.get("scenario");
  const enabled = formData.get("enabled") === "on";
  if (!isReferralScenario(scenario)) redirect(`${ADMIN_PAGE}?parrainage=erreur`);
  if (!isSupabaseConfigured()) {
    mockState.referral.enabled = enabled;
    mockState.referral.scenario = scenario;
    logAudit(`${DEMO_ADMIN.firstName} ${DEMO_ADMIN.lastName}`, `parrainage : ${enabled ? "ouvert" : "fermé"} (${scenario})`, "Réglages");
    redirect(`${ADMIN_PAGE}?parrainage=ok`);
  }
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.rpc("admin_set_referral_settings", { p_enabled: enabled, p_scenario: scenario });
  redirect(`${ADMIN_PAGE}?parrainage=${error ? "erreur" : "ok"}`);
}

/**
 * Remboursement enregistré par l'admin, après le remboursement réel chez le prestataire :
 * abonnements du paiement annulés, récompenses de parrainage en garde retirées.
 */
export async function refundPaymentAction(formData: FormData) {
  await requireRole("admin");
  const reference = String(formData.get("reference") ?? "").slice(0, 40);
  const reason = String(formData.get("motif") ?? "").trim().slice(0, 200);
  if (formData.get("confirm") !== "on" || !reason) redirect(`${ADMIN_PAGE}?remboursement=confirmation`);
  if (!isSupabaseConfigured()) {
    const payment = mockState.payments.find((p) => p.reference === reference);
    if (payment?.status === "succeeded") {
      payment.status = "refunded";
      logAudit(`${DEMO_ADMIN.firstName} ${DEMO_ADMIN.lastName}`, "paiement remboursé", reference);
      refresh();
    }
    redirect(`${ADMIN_PAGE}?remboursement=${payment ? "ok" : "demo"}`);
  }
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.rpc("admin_refund_payment", { p_reference: reference, p_reason: reason });
  redirect(`${ADMIN_PAGE}?remboursement=${error ? "erreur" : "ok"}`);
}
