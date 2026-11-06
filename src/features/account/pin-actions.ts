"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isSupabaseConfigured, isPinLoginEnabled } from "@/lib/env";
import { cleanPin, isPinFormat, pinProblem } from "@/lib/pin-rules";
import { getRequestMeta } from "@/lib/request-meta";
import { safeInternalPath } from "@/lib/safe-path";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseAuthGateway } from "@/lib/supabase/auth-gateway";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { AppRole } from "@/types/domain";
import { DEMO_ROLE_COOKIE } from "./data";
import { DEMO_PIN, type PinReason } from "./pin-constants";
import { DEVICE_COOKIE, parseDeviceMode, SEEN_COOKIE, type DeviceMode } from "./device-cookies";
import { readPhone } from "./otp";
import {
  accountPassword,
  applyDeviceMode,
  clearDeviceCookies,
  emailKey,
  guardClear,
  guardFail,
  guardStatus,
  guardSuccess,
  ipKey,
  logAuthEvent,
  markPinSet,
  maskedContact,
  phoneKey,
  progressiveDelay,
  userKey,
  verifyCurrentPin,
} from "./pin-auth";
import { ROLE_HOME, ROLES } from "./roles";
import { requireIdentity } from "./session";

/** Connexion PIN éteinte (DIANGAL_PIN_LOGIN) : ces actions sont refusées. */
function requirePinLogin() {
  if (!isPinLoginEnabled()) throw new Error("Connexion par code PIN désactivée.");
}

/** Une session ouverte par un code reçu sert à choisir le code PIN pendant 15 minutes. */
const FRESH_LOGIN_SECONDS = 15 * 60;

const parseReason = (value: FormDataEntryValue | null): PinReason => (value === "inscription" ? "inscription" : "recuperation");

function parseRole(value: FormDataEntryValue | null): AppRole {
  return ROLES.includes(value as AppRole) && value !== "admin" ? (value as AppRole) : "student";
}

async function setDemoRole(role: AppRole) {
  (await cookies()).set(DEMO_ROLE_COOKIE, role, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

/** Page d'arrivée : « next » n'est suivi que s'il ne mène pas vers l'espace d'un autre rôle. */
function homeFor(role: AppRole, next: string | null) {
  const otherSpace = Object.values(ROLE_HOME).some((home) => home !== ROLE_HOME[role] && next?.startsWith(home));
  return next && !otherSpace ? next : ROLE_HOME[role];
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
/** Adresse technique d'un enfant sans téléphone : jamais un identifiant de connexion. */
const TECHNICAL_EMAIL = "@enfant.diangal.invalid";
/** Compte fictif : un identifiant inconnu fait le même essai (voué à l'échec) qu'un compte réel. */
const NO_ACCOUNT = "00000000-0000-0000-0000-000000000000";

/** Élève ou parent qui porte ce numéro ou cet e-mail (jamais montré au visiteur). */
async function accountOf(identifier: { phone: string } | { email: string }): Promise<string | null> {
  const query = createSupabaseAdminClient().from("profiles").select("id").is("deleted_at", null).in("role", ["student", "parent"]);
  const { data } = await ("phone" in identifier ? query.eq("phone", identifier.phone) : query.eq("email", identifier.email)).maybeSingle();
  return data?.id ?? null;
}

/**
 * Connexion par numéro (ou, au choix, e-mail) + code PIN : aucun message envoyé. Blocage progressif par
 * identifiant, par compte et par adresse IP ; réponse identique que l'identifiant ait un compte ou non.
 */
export async function signInWithPinAction(formData: FormData) {
  requirePinLogin();
  const byEmail = formData.get("canal") === "email";
  const pin = cleanPin(formData.get("pin"));
  const shared = formData.get("partage") === "on";
  const next = safeInternalPath(formData.get("next"));
  const back: (erreur: string, extra?: Record<string, string>) => never = (erreur, extra = {}) =>
    redirect(`/connexion?${new URLSearchParams({ ...(byEmail ? { mode: "email" } : {}), erreur, ...extra, ...(next ? { next } : {}) })}`);

  const raw = String(formData.get("identifiant") ?? "");
  const email = byEmail ? raw.trim().toLowerCase() : null;
  const phone = byEmail ? null : readPhone(raw, formData.get("pays"));
  if (byEmail ? !EMAIL.test(email!) || email!.endsWith(TECHNICAL_EMAIL) : !phone) back(byEmail ? "email" : "phone");
  if (!isPinFormat(pin)) back("identifiants");

  if (!isSupabaseConfigured()) {
    if (pin !== DEMO_PIN) back("identifiants");
    const role = parseRole(formData.get("role"));
    await setDemoRole(role);
    await applyDeviceMode(shared ? "partage" : "perso", true);
    redirect(ROLE_HOME[role]);
  }

  const meta = await getRequestMeta();
  const userId = await accountOf(phone ? { phone } : { email: email! });
  const idKey = phone ? phoneKey(phone) : emailKey(email!);
  const keys = [idKey, ipKey(meta.ip), ...(userId ? [userKey(userId)] : [])];
  const before = await guardStatus(...keys);
  if (before.needsRecovery) back("recuperation");
  if (before.locked) back("bloque", { attente: String(before.retryAfter) });

  const gateway = await createSupabaseAuthGateway(meta.ip, shared ? "partage" : "perso");
  const password = accountPassword(userId ?? NO_ACCOUNT, pin);
  const { data, error } = await gateway.auth.signInWithPassword(phone ? { phone, password } : { email: email!, password });
  if (error?.status === 429) back("limit");
  if (error || !data.user) {
    const after = await guardFail(...keys);
    await logAuthEvent(userId, after.locked ? "pin_locked" : "pin_failure", maskedContact(phone, email), meta);
    await progressiveDelay(after.failures);
    if (after.needsRecovery) back("recuperation");
    if (after.locked) back("bloque", { attente: String(after.retryAfter) });
    back("identifiants");
  }

  await guardSuccess(idKey);
  await guardSuccess(userKey(data.user!.id));
  await logAuthEvent(data.user!.id, "pin_login", maskedContact(phone, email), meta);
  await applyDeviceMode(shared ? "partage" : "perso", true);
  const { data: profile } = await createSupabaseAdminClient().from("profiles").select("role").eq("id", data.user!.id).maybeSingle();
  if (!profile?.role || profile.role === "admin") back("profil");
  redirect(homeFor(profile!.role, next));
}

/** Secondes écoulées depuis la dernière vérification (code reçu, code PIN), d'après le jeton. */
async function secondsSinceLogin(): Promise<number> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getClaims();
  const amr = Array.isArray(data?.claims?.amr) ? (data.claims.amr as { timestamp?: number }[]) : [];
  const latest = Math.max(0, ...amr.map((a) => Number(a.timestamp) || 0));
  return Math.floor(Date.now() / 1000) - latest;
}

/**
 * Choix du code PIN, juste après un code reçu par message : à l'inscription, ou après « Code PIN oublié »
 * (les autres appareils sont alors déconnectés). Le code devient le mot de passe dérivé du compte.
 */
export async function setPinAction(formData: FormData) {
  requirePinLogin();
  const reason = parseReason(formData.get("raison"));
  const pin = cleanPin(formData.get("pin"));
  const confirm = cleanPin(formData.get("pinConfirm"));
  const mode: DeviceMode = reason === "inscription" && formData.get("appareil") === "partage" ? "partage" : "perso";
  const back: (erreur: string) => never = (erreur) => redirect(`/connexion/code-pin?${new URLSearchParams({ raison: reason, erreur })}`);
  const done = () => redirect(`/connexion/code-pin?${new URLSearchParams({ raison: reason, fait: "1" })}`);

  if (!isSupabaseConfigured()) {
    const problem = pinProblem(pin);
    if (problem) back(problem);
    if (pin !== confirm) back("different");
    await applyDeviceMode(mode, true);
    done();
  }

  const identity = await requireIdentity();
  // Élèves et parents seulement, avec un numéro ou un e-mail (les enfants ont leur propre code PIN).
  const familyAccount = identity.role === "student" || identity.role === "parent";
  if (!familyAccount || identity.email?.endsWith(TECHNICAL_EMAIL) || (!identity.phone && !identity.email)) redirect(ROLE_HOME[identity.role]);
  const problem = pinProblem(pin, identity.phone);
  if (problem) back(problem);
  if (pin !== confirm) back("different");
  if ((await secondsSinceLogin()) > FRESH_LOGIN_SECONDS) redirect(`/connexion/pin-oublie?${new URLSearchParams({ ...(identity.phone ? {} : { mode: "email" }), erreur: "delai" })}`);

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.updateUser({ password: accountPassword(identity.userId, pin) });
  // Même code que l'ancien après « Code PIN oublié » : rien à changer.
  if (error && error.code !== "same_password") back("enregistrement");
  await markPinSet(identity.userId, "phone");
  await guardClear(userKey(identity.userId));
  if (identity.phone) await guardClear(phoneKey(identity.phone));
  if (identity.email) await guardClear(emailKey(identity.email));
  await logAuthEvent(identity.userId, reason === "inscription" ? "pin_set" : "pin_reset", maskedContact(identity.phone, identity.email), await getRequestMeta());
  if (reason === "recuperation") await supabase.auth.signOut({ scope: "others" });
  const current = parseDeviceMode((await cookies()).get(DEVICE_COOKIE)?.value);
  await applyDeviceMode(reason === "inscription" ? mode : current, true);
  done();
}

/**
 * Code PIN redemandé (30 jours sans visite sur son téléphone) : vérifié sans ouvrir de nouvelle session
 * et sans message. Trop d'erreurs : blocage, puis « Code PIN oublié ».
 */
export async function confirmSessionPinAction(formData: FormData) {
  requirePinLogin();
  const pin = cleanPin(formData.get("pin"));
  const next = safeInternalPath(formData.get("next"));
  const back: (erreur: string, extra?: Record<string, string>) => never = (erreur, extra = {}) =>
    redirect(`/connexion/session?${new URLSearchParams({ erreur, ...extra, ...(next ? { next } : {}) })}`);
  if (!isPinFormat(pin)) back("identifiants");

  const store = await cookies();
  const touch = () =>
    store.set(SEEN_COOKIE, String(Math.floor(Date.now() / 1000)), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 400 * 24 * 60 * 60,
    });

  if (!isSupabaseConfigured()) {
    if (pin !== DEMO_PIN) back("identifiants");
    touch();
    redirect(next ?? "/");
  }

  const identity = await requireIdentity();
  const result = await verifyCurrentPin(pin, await getRequestMeta());
  if (result === "no-pin") {
    await signOutEverywhereHere();
    redirect("/connexion");
  }
  if (result === "locked") back("bloque");
  if (result === "invalid") back("identifiants");
  touch();
  redirect(homeFor(identity.role, next));
}

async function signOutEverywhereHere() {
  if (isSupabaseConfigured()) await (await createSupabaseServerClient()).auth.signOut({ scope: "local" });
  await clearDeviceCookies();
}

/** « Ce n'est pas moi » sur la page du code PIN redemandé : fermeture de la session de cet appareil. */
export async function notMeAction() {
  requirePinLogin();
  await signOutEverywhereHere();
  (await cookies()).delete(DEMO_ROLE_COOKIE);
  redirect("/connexion?info=deconnecte");
}
