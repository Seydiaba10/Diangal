"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isSupabaseConfigured, isPinLoginEnabled } from "@/lib/env";
import { passwordProblem } from "@/lib/password-rules";
import { getRequestMeta } from "@/lib/request-meta";
import { safeInternalPath } from "@/lib/safe-path";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseAuthGateway } from "@/lib/supabase/auth-gateway";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { AppRole } from "@/types/domain";
import { DEMO_ROLE_COOKIE } from "./data";
import { emailRedirect } from "./otp";
import { applyDeviceMode, emailKey, guardClear, guardFail, guardStatus, guardSuccess, ipKey, logAuthEvent, progressiveDelay } from "./pin-auth";
import { ROLE_HOME } from "./roles";

/** Connexion PIN éteinte (DIANGAL_PIN_LOGIN) : ces actions sont refusées. */
function requirePinLogin() {
  if (!isPinLoginEnabled()) throw new Error("Connexion par code PIN désactivée.");
}

// Répétiteurs et administrateur : e-mail + mot de passe (interrupteur DIANGAL_PIN_LOGIN). Jamais de SMS ni
// de WhatsApp. Récupération par un code envoyé par e-mail. L'admin passe ensuite sa double authentification.

/** Mot de passe de démonstration (aucun compte réel en mode démo). */
const DEMO_PASSWORD = "Diangal2026";
const DEMO_CODE = "123456";
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export type PasswordSpace = "repetiteur" | "admin";
const LOGIN_PAGE: Record<PasswordSpace, string> = { repetiteur: "/connexion/repetiteur", admin: "/connexion/admin" };

const parseSpace = (value: FormDataEntryValue | null): PasswordSpace => (value === "admin" ? "admin" : "repetiteur");
const readEmail = (formData: FormData) => String(formData.get("email") ?? "").trim().toLowerCase().slice(0, 200);
const maskEmail = (email: string) => {
  const [name = "", domain = ""] = email.split("@");
  return `${name.slice(0, 2)}•••@${domain}`;
};

async function setDemoRole(role: AppRole) {
  (await cookies()).set(DEMO_ROLE_COOKIE, role, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 60 * 60 * 24 * 30 });
}

/** Après la connexion : l'admin passe par sa double authentification, les autres vont à leur espace. */
function landing(role: AppRole, next: string | null): string {
  if (role === "admin") return `/connexion/securite${next?.startsWith("/admin") ? `?${new URLSearchParams({ next })}` : ""}`;
  return next?.startsWith(ROLE_HOME[role]) ? next : ROLE_HOME[role];
}

/** Connexion par e-mail + mot de passe ; même réponse que le compte existe ou non, blocage progressif. */
export async function signInWithPasswordAction(formData: FormData) {
  requirePinLogin();
  const space = parseSpace(formData.get("espace"));
  const email = readEmail(formData);
  const password = String(formData.get("password") ?? "").slice(0, 200);
  const shared = formData.get("partage") === "on";
  const next = safeInternalPath(formData.get("next"));
  const back: (erreur: string, extra?: Record<string, string>) => never = (erreur, extra = {}) =>
    redirect(`${LOGIN_PAGE[space]}?${new URLSearchParams({ erreur, ...extra, ...(next ? { next } : {}) })}`);
  if (!EMAIL.test(email) || !password) back("identifiants");

  if (!isSupabaseConfigured()) {
    if (password !== DEMO_PASSWORD) back("identifiants");
    const role: AppRole = space === "admin" ? "admin" : "tutor";
    await setDemoRole(role);
    await applyDeviceMode(shared ? "partage" : "perso", false);
    redirect(ROLE_HOME[role]);
  }

  const meta = await getRequestMeta();
  const keys = [emailKey(email), ipKey(meta.ip)];
  const before = await guardStatus(...keys);
  if (before.locked) back(before.needsRecovery ? "recuperation" : "bloque", { attente: String(before.retryAfter) });

  const gateway = await createSupabaseAuthGateway(meta.ip, shared ? "partage" : "perso");
  const { data, error } = await gateway.auth.signInWithPassword({ email, password });
  if (error?.status === 429) back("limit");
  if (error?.code === "email_not_confirmed") back("non-verifie");
  if (error || !data.user) {
    const after = await guardFail(...keys);
    await logAuthEvent(null, "password_failure", maskEmail(email), meta);
    await progressiveDelay(after.failures);
    if (after.locked) back(after.needsRecovery ? "recuperation" : "bloque", { attente: String(after.retryAfter) });
    back("identifiants");
  }
  const { data: profile } = await createSupabaseAdminClient().from("profiles").select("role").eq("id", data.user!.id).maybeSingle();
  // Page de l'admin : seul l'admin y entre (même message que des identifiants faux).
  if (!profile?.role || (space === "admin" && profile.role !== "admin")) {
    await gateway.auth.signOut({ scope: "local" });
    back("identifiants");
  }
  await guardSuccess(keys[0]!);
  await logAuthEvent(data.user!.id, "password_login", maskEmail(email), meta);
  await applyDeviceMode(shared ? "partage" : "perso", false);
  redirect(landing(profile!.role, next));
}

/** Mot de passe oublié, étape 1 : code envoyé par e-mail (réponse identique que l'adresse existe ou non). */
export async function requestPasswordResetAction(formData: FormData) {
  requirePinLogin();
  const space = parseSpace(formData.get("espace"));
  const email = readEmail(formData);
  const base = `/connexion/mot-de-passe?espace=${space}`;
  if (!EMAIL.test(email)) redirect(`${base}&erreur=email`);
  if (isSupabaseConfigured()) {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: emailRedirect(null, "repetiteur") });
    if (error?.status === 429) redirect(`${base}&erreur=limit`);
  }
  redirect(`${base}&${new URLSearchParams({ email, etape: "code" })}`);
}

/** Mot de passe oublié, étape 2 : code reçu + nouveau mot de passe ; les autres appareils sont déconnectés. */
export async function resetPasswordAction(formData: FormData) {
  requirePinLogin();
  const space = parseSpace(formData.get("espace"));
  const email = readEmail(formData);
  const code = String(formData.get("code") ?? "").replace(/\s/g, "");
  const password = String(formData.get("password") ?? "");
  const back: (erreur: string) => never = (erreur) =>
    redirect(`/connexion/mot-de-passe?${new URLSearchParams({ espace: space, email, etape: "code", erreur })}`);
  const problem = passwordProblem(password);
  if (problem) back(problem);
  if (password !== String(formData.get("passwordConfirm") ?? "")) back("different");
  if (!/^\d{6}$/.test(code)) back("code");

  if (!isSupabaseConfigured()) {
    if (code !== DEMO_CODE) back("code");
    const role: AppRole = space === "admin" ? "admin" : "tutor";
    await setDemoRole(role);
    redirect(`${ROLE_HOME[role]}?motdepasse=1`);
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.verifyOtp({ email, token: code, type: "recovery" });
  if (error || !data.user) back("code");
  const { error: updateError } = await supabase.auth.updateUser({ password });
  if (updateError && updateError.code !== "same_password") back(updateError.code === "weak_password" ? "weak" : "enregistrement");
  await supabase.auth.signOut({ scope: "others" });
  await guardClear(emailKey(email));
  await logAuthEvent(data.user!.id, "password_reset", maskEmail(email), await getRequestMeta());
  const { data: profile } = await createSupabaseAdminClient().from("profiles").select("role").eq("id", data.user!.id).maybeSingle();
  redirect(landing(profile?.role ?? "tutor", null));
}
