"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isSupabaseConfigured, phoneCountries } from "@/lib/env";
import { isAllowedPhone } from "@/lib/phone";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { DEMO_ROLE_COOKIE } from "./data";
import { emailRedirect, firstPhoneChannel, readPhone, rememberOtpChannel, sendErrorKey } from "./otp";
import { requireIdentity } from "./session";
import { fetchDeletionStatus } from "./supabase";

// « Mon compte » : ajout d'un numéro (code de vérification) et suppression du compte.
// Toute vérification d'accès est refaite en base (RPC) : ce fichier n'ouvre aucun droit.

const TECHNICAL_EMAIL = "@enfant.diangal.invalid";
const CONFIRM_WORD = "SUPPRIMER";

// ── Numéro de téléphone ─────────────────────────────────────────────────────

/** Ajout (ou changement) du numéro : Supabase Auth envoie un code sur WhatsApp ou par SMS. */
export async function addPhoneAction(formData: FormData) {
  if (!isSupabaseConfigured()) redirect("/compte?telephone=demo");
  await requireIdentity();
  const channel = firstPhoneChannel();
  if (!channel) redirect("/compte?telephone=ferme");
  const phone = readPhone(String(formData.get("telephone") ?? ""), formData.get("pays"));
  if (!phone) redirect("/compte?telephone=numero");

  await rememberOtpChannel(phone, channel);
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.updateUser({ phone });
  // Numéro déjà pris ou envoi impossible : même message, sans dire si le numéro existe.
  if (error) redirect(`/compte?telephone=${sendErrorKey(error) === "limit" ? "limite" : "envoi"}`);
  redirect(`/compte?${new URLSearchParams({ telephone: "code", numero: phone, canal: channel })}`);
}

/** Code reçu sur le nouveau numéro : le numéro devient un identifiant de connexion. */
export async function verifyPhoneAction(formData: FormData) {
  if (!isSupabaseConfigured()) redirect("/compte?telephone=demo");
  await requireIdentity();
  const phone = String(formData.get("numero") ?? "");
  const canal = formData.get("canal") === "sms" ? "sms" : "whatsapp";
  const code = String(formData.get("code") ?? "").replace(/\s/g, "");
  if (!isAllowedPhone(phone, phoneCountries())) redirect("/compte?telephone=numero");
  const retry = `/compte?${new URLSearchParams({ telephone: "code", numero: phone, canal, erreur: "code" })}`;
  if (!/^\d{6}$/.test(code)) redirect(retry);

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.verifyOtp({ phone, token: code, type: "phone_change" });
  if (error) redirect(retry);
  await supabase.rpc("sync_my_contact");
  redirect("/compte?telephone=ajoute");
}

// ── Suppression du compte ───────────────────────────────────────────────────

function deletionPath(childId: string | null, params: Record<string, string> = {}) {
  const query = new URLSearchParams({ ...(childId ? { enfant: childId } : {}), ...params });
  return `/compte/suppression${query.size ? `?${query}` : ""}`;
}

/**
 * Vérification d'identité : un nouveau code est envoyé à l'identifiant du compte connecté
 * (jamais à une adresse saisie). L'email peut aussi contenir un lien qui rouvre la session.
 */
export async function sendDeletionCodeAction(childId: string | null) {
  if (!isSupabaseConfigured()) redirect(deletionPath(childId, { code: "envoye", canal: "email" }));
  const identity = await requireIdentity();
  const supabase = await createSupabaseServerClient();
  const email = identity.email && !identity.email.endsWith(TECHNICAL_EMAIL) ? identity.email : null;
  let canal: string;
  if (email) {
    canal = "email";
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { shouldCreateUser: false, emailRedirectTo: emailRedirect(deletionPath(childId)) },
    });
    if (error) redirect(deletionPath(childId, { erreur: sendErrorKey(error) === "limit" ? "limite" : "envoi" }));
  } else {
    const channel = firstPhoneChannel();
    if (!identity.phone || !channel) redirect(deletionPath(childId, { erreur: "canal" }));
    canal = channel!;
    await rememberOtpChannel(identity.phone!, channel!);
    const { error } = await supabase.auth.signInWithOtp({ phone: identity.phone!, options: { shouldCreateUser: false } });
    if (error) redirect(deletionPath(childId, { erreur: sendErrorKey(error) === "limit" ? "limite" : "envoi" }));
  }
  redirect(deletionPath(childId, { code: "envoye", canal: canal! }));
}

/**
 * Dernière étape (clé secrète) : seulement si la base a bien anonymisé le compte. Supprime les
 * pièces d'un répétiteur, puis l'identité de connexion (suppression « douce » de Supabase Auth :
 * email et téléphone effacés, sessions fermées ; l'adresse peut resservir pour un nouveau compte).
 */
async function finishDeletion(userId: string) {
  const admin = createSupabaseAdminClient();
  const { data: anonymized } = await admin.rpc("is_account_anonymized", { p_target: userId });
  if (!anonymized) return;
  const { data: files } = await admin.storage.from("tutor-documents").list(userId);
  if (files?.length) await admin.storage.from("tutor-documents").remove(files.map((f) => `${userId}/${f.name}`));
  const { error } = await admin.auth.admin.deleteUser(userId, true);
  if (error) console.error("connexion à supprimer par l'équipe :", userId);
}

/** Suppression confirmée (mot à taper + case cochée), avec un code si la connexion date de plus de 15 min. */
export async function deleteAccountAction(childId: string | null, formData: FormData) {
  const back = (erreur: string): never => redirect(deletionPath(childId, { erreur }));
  const confirmed =
    String(formData.get("confirmation") ?? "").trim().toUpperCase() === CONFIRM_WORD && formData.get("compris") === "on";
  if (!confirmed) back("confirmation");
  if (!isSupabaseConfigured()) redirect(deletionPath(childId, { demo: "1" }));

  const identity = await requireIdentity();
  const supabase = await createSupabaseServerClient();
  const code = String(formData.get("code") ?? "").replace(/\s/g, "");
  if (code) {
    if (!/^\d{6}$/.test(code)) back("code");
    const email = identity.email && !identity.email.endsWith(TECHNICAL_EMAIL) ? identity.email : null;
    const { error } = email
      ? await supabase.auth.verifyOtp({ email, token: code, type: "email" })
      : identity.phone
        ? await supabase.auth.verifyOtp({ phone: identity.phone, token: code, type: "sms" })
        : { error: new Error("no_identifier") };
    if (error) back("code");
  }

  const target = childId ?? identity.userId;
  const status = await fetchDeletionStatus(childId);
  const { error } =
    childId && status?.pendingRequestAt
      ? await supabase.rpc("answer_account_deletion_request", { p_student: childId, p_approve: true })
      : await supabase.rpc("delete_account", { p_target: target });
  if (error) back(error.message.includes("reauth_required") ? "reauth" : "refus");

  await finishDeletion(target);
  if (childId) redirect("/parent?enfant=supprime");
  await supabase.auth.signOut({ scope: "local" });
  (await cookies()).delete(DEMO_ROLE_COOKIE);
  redirect("/connexion?info=compte-supprime");
}

/** Élève mineur relié à un parent : la demande part chez ses parents (notification). */
export async function requestAccountDeletionAction() {
  if (!isSupabaseConfigured()) redirect(deletionPath(null, { demande: "envoyee" }));
  await requireIdentity();
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.rpc("request_account_deletion");
  redirect(deletionPath(null, error ? { erreur: "refus" } : { demande: "envoyee" }));
}

export async function cancelAccountDeletionAction() {
  if (isSupabaseConfigured()) {
    await requireIdentity();
    const supabase = await createSupabaseServerClient();
    await supabase.rpc("cancel_account_deletion_request");
  }
  redirect(deletionPath(null, { demande: "annulee" }));
}

/** Le parent refuse la demande de son enfant : le compte reste, l'enfant est prévenu. */
export async function refuseChildDeletionAction(childId: string) {
  if (isSupabaseConfigured()) {
    await requireIdentity();
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.rpc("answer_account_deletion_request", { p_student: childId, p_approve: false });
    if (error) redirect(deletionPath(childId, { erreur: "refus" }));
  }
  redirect(deletionPath(childId, { demande: "refusee" }));
}
