import "server-only";

import { cookies } from "next/headers";
import { maskPhone } from "@/lib/phone";
import { childPinSubject, derivePinPassword, PIN_PEPPER_VERSION } from "@/lib/pin";
import type { RequestMeta } from "@/lib/request-meta";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  DEVICE_COOKIE,
  FAMILY_COOKIE,
  isSupabaseAuthCookie,
  PIN_COOKIE,
  SEEN_COOKIE,
  type DeviceMode,
} from "./device-cookies";

// Outils serveur de la connexion par code PIN : blocage progressif, journal, nouvelle vérification,
// cookies de l'appareil. Le code PIN n'est jamais écrit nulle part (ni base, ni journal, ni cookie).

export type AuthEventKind =
  | "pin_login"
  | "pin_failure"
  | "pin_locked"
  | "pin_set"
  | "pin_reset"
  | "pin_changed"
  | "reauth"
  | "reauth_failure"
  | "child_login"
  | "child_failure"
  | "child_pin_set"
  | "password_login"
  | "password_failure"
  | "password_reset"
  | "device_added"
  | "device_removed"
  | "logout_all";

export interface GuardState {
  locked: boolean;
  /** Secondes avant de pouvoir réessayer (0 si récupération obligatoire). */
  retryAfter: number;
  /** 15 erreurs d'affilée : seul un code reçu sur le téléphone débloque. */
  needsRecovery: boolean;
  failures: number;
}

const OPEN: GuardState = { locked: false, retryAfter: 0, needsRecovery: false, failures: 0 };

export const phoneKey = (phone: string) => `phone:${phone}`;
export const emailKey = (email: string) => `email:${email.toLowerCase()}`;
export const childKey = (studentId: string) => `child:${studentId}`;
export const ipKey = (ip: string) => `ip:${ip}`;

function toState(row: { locked: boolean; retry_after: number; needs_recovery: boolean; failures: number } | undefined): GuardState {
  return row ? { locked: row.locked, retryAfter: row.retry_after, needsRecovery: row.needs_recovery, failures: row.failures } : OPEN;
}

/** État le plus restrictif parmi plusieurs clés (compte et adresse IP). */
export async function guardStatus(...keys: string[]): Promise<GuardState> {
  const admin = createSupabaseAdminClient();
  const states = await Promise.all(keys.map(async (key) => toState((await admin.rpc("auth_guard_status", { p_key: key })).data?.[0])));
  return worst(states);
}

/** Une erreur de plus sur chaque clé ; renvoie l'état le plus restrictif. */
export async function guardFail(...keys: string[]): Promise<GuardState> {
  const admin = createSupabaseAdminClient();
  const states = await Promise.all(keys.map(async (key) => toState((await admin.rpc("auth_guard_fail", { p_key: key })).data?.[0])));
  return worst(states);
}

export async function guardSuccess(key: string) {
  await createSupabaseAdminClient().rpc("auth_guard_success", { p_key: key });
}

export async function guardClear(key: string) {
  await createSupabaseAdminClient().rpc("auth_guard_clear", { p_key: key });
}

function worst(states: GuardState[]): GuardState {
  return states.reduce(
    (a, b) => ({
      locked: a.locked || b.locked,
      retryAfter: Math.max(a.retryAfter, b.retryAfter),
      needsRecovery: a.needsRecovery || b.needsRecovery,
      failures: Math.max(a.failures, b.failures),
    }),
    OPEN,
  );
}

/** Ralentit la réponse dès la 3e erreur (1 s de plus par erreur, 5 s au plus). */
export async function progressiveDelay(failures: number) {
  const ms = Math.min(5000, Math.max(0, failures - 2) * 1000);
  if (ms) await new Promise((r) => setTimeout(r, ms));
}

/** Écrit dans le journal des connexions (identifiant masqué, adresse IP tronquée). Ne bloque jamais. */
export async function logAuthEvent(userId: string | null, kind: AuthEventKind, subject: string | null, meta: RequestMeta) {
  const { error } = await createSupabaseAdminClient().rpc("auth_log_event", {
    p_user: userId,
    p_kind: kind,
    p_subject: subject,
    p_ip: meta.ipPrefix,
    p_device: meta.device,
  });
  if (error) console.error("journal des connexions :", error.message);
}

export const maskedPhone = (phone: string) => maskPhone(phone);

/** Mot de passe Supabase d'un compte à numéro, avec la version de clé en cours. */
export const phonePassword = (phone: string, pin: string) => derivePinPassword(phone, pin, PIN_PEPPER_VERSION);
/** Mot de passe Supabase d'un enfant sans téléphone. */
export const childPassword = (studentId: string, pin: string) => derivePinPassword(childPinSubject(studentId), pin, PIN_PEPPER_VERSION);

export async function markPinSet(userId: string, kind: "phone" | "child") {
  const { error } = await createSupabaseAdminClient().rpc("mark_pin_set", { p_user: userId, p_kind: kind, p_version: PIN_PEPPER_VERSION });
  if (error) throw new Error(`code PIN non noté : ${error.message}`);
}

export type ReauthResult = "ok" | "invalid" | "locked" | "no-pin";

/**
 * Nouvelle vérification du code PIN du compte connecté (opération sensible), sans ouvrir de session :
 * comparée au mot de passe que Supabase Auth a enregistré, puis notée pour cette session (5 minutes).
 */
export async function verifyCurrentPin(pin: string, meta: RequestMeta): Promise<ReauthResult> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims;
  const phone = typeof claims?.phone === "string" && claims.phone ? `+${claims.phone.replace(/^\+/, "")}` : null;
  const userId = claims?.sub;
  const sessionId = typeof claims?.session_id === "string" ? claims.session_id : null;
  if (!userId || !phone || !sessionId) return "no-pin";

  const key = phoneKey(phone);
  const before = await guardStatus(key, ipKey(meta.ip));
  if (before.locked) return "locked";
  const admin = createSupabaseAdminClient();
  const { data: ok } = await admin.rpc("verify_user_password", { p_user: userId, p_password: phonePassword(phone, pin) });
  if (!ok) {
    const after = await guardFail(key, ipKey(meta.ip));
    await logAuthEvent(userId, "reauth_failure", maskedPhone(phone), meta);
    await progressiveDelay(after.failures);
    return after.locked ? "locked" : "invalid";
  }
  await guardSuccess(key);
  await admin.rpc("mark_reauth", { p_user: userId, p_session: sessionId });
  await logAuthEvent(userId, "reauth", maskedPhone(phone), meta);
  return "ok";
}

const DEVICE_COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
};

/**
 * Mode de l'appareil après une connexion. Appareil partagé ou enfant : les cookies de session Supabase
 * déjà écrits deviennent des cookies de session (sans durée), effacés à la fermeture du navigateur.
 */
export async function applyDeviceMode(mode: DeviceMode, hasPin: boolean) {
  const store = await cookies();
  const now = String(Math.floor(Date.now() / 1000));
  const year = 400 * 24 * 60 * 60;
  if (mode === "perso") store.delete(DEVICE_COOKIE);
  else store.set(DEVICE_COOKIE, mode, DEVICE_COOKIE_OPTIONS);
  store.set(SEEN_COOKIE, now, mode === "perso" ? { ...DEVICE_COOKIE_OPTIONS, maxAge: year } : DEVICE_COOKIE_OPTIONS);
  if (hasPin && mode === "perso") store.set(PIN_COOKIE, "1", { ...DEVICE_COOKIE_OPTIONS, maxAge: year });
  else store.delete(PIN_COOKIE);
  if (mode !== "perso") {
    for (const c of store.getAll().filter((c) => isSupabaseAuthCookie(c.name))) {
      // Cookies lus aussi par le navigateur (client Supabase) : pas httpOnly.
      store.set(c.name, c.value, { ...DEVICE_COOKIE_OPTIONS, httpOnly: false });
    }
  }
}

/** Déconnexion : on oublie le mode et l'activité ; l'appareil de la famille reste reconnu. */
export async function clearDeviceCookies() {
  const store = await cookies();
  for (const name of [DEVICE_COOKIE, SEEN_COOKIE, PIN_COOKIE]) store.delete(name);
}

/** Jeton de l'appareil de la famille, s'il y en a un. */
export async function familyDeviceToken(): Promise<string | null> {
  const value = (await cookies()).get(FAMILY_COOKIE)?.value ?? "";
  return /^[A-Za-z0-9_-]{43}$/.test(value) ? value : null;
}

export async function setFamilyDeviceToken(token: string) {
  (await cookies()).set(FAMILY_COOKIE, token, { ...DEVICE_COOKIE_OPTIONS, maxAge: 400 * 24 * 60 * 60 });
}

export async function clearFamilyDeviceToken() {
  (await cookies()).delete(FAMILY_COOKIE);
}
