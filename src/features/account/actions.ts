"use server";

import type { AuthError } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { refresh } from "next/cache";
import { redirect } from "next/navigation";
import { isSupabaseConfigured, phoneCountries } from "@/lib/env";
import { isLevelCode } from "@/lib/levels";
import { isAllowedPhone } from "@/lib/phone";
import { safeInternalPath } from "@/lib/safe-path";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { logAudit, mockState } from "@/mocks/progress-store";
import { DEMO_PARENT, DEMO_STUDENT_LINK_CODE } from "@/mocks/users";
import type { AppRole, SubjectCode } from "@/types/domain";
import { DEMO_ROLE_COOKIE } from "./data";
import { getEnabledSocialProviders, type SocialProvider } from "./oauth";
import {
  emailRedirect,
  parseChannel,
  phoneChannelReady,
  readPhone,
  rememberOtpChannel,
  sendErrorKey,
  type PhoneChannel,
} from "./otp";
import { LOGIN_PATH, parseSpace, ROLE_HOME, ROLES, type LoginSpace } from "./roles";
import { requireIdentity } from "./session";
import { completePendingSignup, pendingSignupMetadata, type SignupExtras } from "./signup";

/** Code OTP de démonstration. Avec Supabase : code à 6 chiffres envoyé par email (ou SMS). */
const DEMO_OTP = "123456";
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function setDemoRole(role: AppRole) {
  (await cookies()).set(DEMO_ROLE_COOKIE, role, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

function parseRole(value: FormDataEntryValue | null): AppRole {
  return ROLES.includes(value as AppRole) ? (value as AppRole) : "student";
}

/** Page de retour après connexion : uniquement un chemin interne. */
const safeNext = safeInternalPath;

async function roleOf(userId: string): Promise<AppRole | null> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.from("profiles").select("role").eq("id", userId).maybeSingle();
  return data?.role ?? null;
}

// ── Connexion ───────────────────────────────────────────────────────────────

/** Étape 1 : envoi du code (Supabase Auth, compte existant uniquement). */
export async function requestLoginCodeAction(formData: FormData) {
  const channel = parseChannel(formData.get("mode"));
  const email = channel === "email";
  const space = parseSpace(formData.get("espace"));
  const raw = String(formData.get("identifiant") ?? "").trim();
  const next = safeNext(formData.get("next"));
  const back: (erreur: string) => never = (erreur) => redirect(`${LOGIN_PATH[space]}?${new URLSearchParams({ mode: channel, erreur })}`);

  if (!isSupabaseConfigured()) {
    const params = new URLSearchParams({ identifiant: raw, canal: channel, espace: space, role: parseRole(formData.get("role")) });
    redirect(`/connexion/code?${params}`);
  }

  const supabase = await createSupabaseServerClient();
  let identifiant: string;
  // Compte inconnu : même réponse qu'un envoi réussi (pas d'indice sur les comptes existants).
  const failed = (error: AuthError | null) => {
    const key = error ? sendErrorKey(error) : null;
    if (key && key !== "unknown") back(key);
  };
  if (email) {
    identifiant = raw.toLowerCase();
    if (!EMAIL.test(identifiant)) back("email");
    const { error } = await supabase.auth.signInWithOtp({
      email: identifiant,
      options: { shouldCreateUser: false, emailRedirectTo: emailRedirect(next, space) },
    });
    failed(error);
  } else {
    if (!phoneChannelReady(channel)) back(channel);
    const phone = readPhone(raw, formData.get("pays"));
    if (!phone) back("phone");
    identifiant = phone!;
    await rememberOtpChannel(identifiant, channel);
    const { error } = await supabase.auth.signInWithOtp({ phone: identifiant, options: { shouldCreateUser: false } });
    failed(error);
  }
  redirect(`/connexion/code?${new URLSearchParams({ identifiant: identifiant!, canal: channel, espace: space, ...(next ? { next } : {}) })}`);
}

/** Étape 2 : vérification du code, ouverture de la session, page d'accueil du rôle. */
export async function verifyLoginCodeAction(formData: FormData) {
  const identifiant = String(formData.get("identifiant") ?? "");
  const code = String(formData.get("code") ?? "").replace(/\s/g, "");
  const canal = parseChannel(formData.get("canal"));
  const space = parseSpace(formData.get("espace"));
  const next = safeNext(formData.get("next"));
  const retry: (role?: AppRole) => never = (role) =>
    redirect(
      `/connexion/code?${new URLSearchParams({ identifiant, canal, espace: space, erreur: "code", ...(role ? { role } : {}), ...(next ? { next } : {}) })}`,
    );

  if (!isSupabaseConfigured()) {
    const role = parseRole(formData.get("role"));
    if (code !== DEMO_OTP) retry(role);
    await setDemoRole(role);
    redirect(ROLE_HOME[role]);
  }

  if (!/^\d{6}$/.test(code)) retry();
  const supabase = await createSupabaseServerClient();
  const { data, error } =
    canal === "email"
      ? await supabase.auth.verifyOtp({ email: identifiant, token: code, type: "email" })
      : // Même code de téléphone, qu'il soit parti par SMS ou par WhatsApp.
        await supabase.auth.verifyOtp({ phone: identifiant, token: code, type: "sms" });
  if (error || !data.user) retry();

  const role = await roleOf(data.user!.id);
  if (!role) redirect("/connexion?erreur=profil");
  // Inscription commencée puis abandonnée avant le code : on la termine maintenant.
  await completePendingSignup(supabase, data.user!, role);
  // L'admin doit encore passer la double authentification avant d'entrer.
  if (role === "admin") redirect(`/connexion/securite${next ? `?${new URLSearchParams({ next })}` : ""}`);
  // « next » n'est suivi que s'il ne mène pas vers l'espace d'un autre rôle.
  const otherSpace = Object.values(ROLE_HOME).some((home) => home !== ROLE_HOME[role] && next?.startsWith(home));
  redirect(next && !otherSpace ? next : ROLE_HOME[role]);
}

/** Renvoi d'un code depuis la page de saisie. */
export async function resendLoginCodeAction(formData: FormData) {
  const identifiant = String(formData.get("identifiant") ?? "");
  const canal = parseChannel(formData.get("canal"));
  const space = parseSpace(formData.get("espace"));
  const next = safeNext(formData.get("next"));
  if (isSupabaseConfigured()) {
    const supabase = await createSupabaseServerClient();
    if (canal === "email") {
      await supabase.auth.signInWithOtp({
        email: identifiant,
        options: { shouldCreateUser: false, emailRedirectTo: emailRedirect(next, space) },
      });
    } else if (phoneChannelReady(canal) && isAllowedPhone(identifiant, phoneCountries())) {
      await rememberOtpChannel(identifiant, canal);
      await supabase.auth.signInWithOtp({ phone: identifiant, options: { shouldCreateUser: false } });
    }
  }
  redirect(`/connexion/code?${new URLSearchParams({ identifiant, canal, espace: space, renvoye: "1", ...(next ? { next } : {}) })}`);
}

/**
 * Connexion avec Facebook, Apple, Google ou X : seulement si le réseau est ouvert dans Supabase.
 * Le compte DIANGAL doit déjà exister avec le même email (voir /auth/confirmation).
 */
export async function signInWithSocialAction(provider: SocialProvider, space: LoginSpace) {
  const back = LOGIN_PATH[space];
  if (!isSupabaseConfigured()) redirect(`${back}?erreur=social`);
  const supabaseProvider = (await getEnabledSocialProviders())[provider];
  if (!supabaseProvider) redirect(`${back}?erreur=social`);
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: supabaseProvider!,
    options: { redirectTo: emailRedirect(null, space) },
  });
  if (error || !data.url) redirect(`${back}?erreur=social`);
  redirect(data.url);
}

/** Double authentification de l'admin (TOTP) : la session passe en aal2, exigée par la RLS admin. */
export async function verifyMfaAction(factorId: string, formData: FormData) {
  const code = String(formData.get("code") ?? "").replace(/\s/g, "");
  const next = safeNext(formData.get("next"));
  const retry = `/connexion/securite?${new URLSearchParams({ erreur: "code", ...(next ? { next } : {}) })}`;
  if (!/^\d{6}$/.test(code)) redirect(retry);
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.mfa.challengeAndVerify({ factorId, code });
  if (error) redirect(retry);
  redirect(next?.startsWith("/admin") ? next : "/admin");
}

export async function switchDemoRoleAction(role: AppRole) {
  if (isSupabaseConfigured()) redirect("/");
  const safeRole = parseRole(role);
  await setDemoRole(safeRole);
  redirect(ROLE_HOME[safeRole]);
}

export async function signOutAction() {
  if (isSupabaseConfigured()) {
    const supabase = await createSupabaseServerClient();
    await supabase.auth.signOut();
  }
  (await cookies()).delete(DEMO_ROLE_COOKIE);
  redirect("/");
}

// ── Inscription ─────────────────────────────────────────────────────────────

export interface SignupInput {
  role: AppRole;
  /** « phone » = code par SMS ; « whatsapp » = même numéro, code sur WhatsApp. */
  method: "phone" | "whatsapp" | "email";
  identifier: string;
  /** Indicatif choisi pour le numéro (221 par défaut) et pour celui du parent. */
  dialCode: string;
  parentDialCode: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  levelCode: string;
  seriesCode: string;
  city: string;
  subjects: SubjectCode[];
  childCode: string;
  parentPhone: string;
  acceptTerms: boolean;
}

export type SignupError = "invalid" | "limit" | "sms" | "whatsapp" | "send" | "profile" | "code";

function cleanSignup(input: SignupInput) {
  const role = parseRole(input.role);
  const firstName = input.firstName.trim().slice(0, 60);
  const lastName = input.lastName.trim().slice(0, 60);
  const email = input.method === "email" ? input.identifier.trim().toLowerCase() : null;
  const phone = input.method !== "email" ? readPhone(input.identifier, input.dialCode) : null;
  const valid =
    role !== "admin" &&
    firstName &&
    lastName &&
    input.acceptTerms &&
    (email ? EMAIL.test(email) : phone !== null) &&
    (role !== "student" || (/^\d{4}-\d{2}-\d{2}$/.test(input.birthDate) && isLevelCode(input.levelCode)));
  return valid ? { role, firstName, lastName, email, phone } : null;
}

/** Compléments appliqués une fois l'adresse vérifiée (voir signup.ts). */
function extrasOf(input: SignupInput): SignupExtras {
  return {
    parentPhone: readPhone(input.parentPhone, input.parentDialCode) ?? undefined,
    childCode: input.childCode.trim().slice(0, 20) || undefined,
    city: input.city.trim().slice(0, 60) || undefined,
    subjects: input.subjects.slice(0, 10),
  };
}

/**
 * Envoi du code d'inscription. Le compte Supabase est créé à cette étape avec ses métadonnées :
 * le déclencheur handle_new_user crée le profil (et le profil élève : classe, date de naissance).
 */
export async function requestSignupCodeAction(input: SignupInput): Promise<{ error?: SignupError }> {
  const clean = cleanSignup(input);
  if (!clean) return { error: "invalid" };
  if (!isSupabaseConfigured()) return {};
  const phoneChannel: PhoneChannel = input.method === "whatsapp" ? "whatsapp" : "sms";
  if (clean.phone && !phoneChannelReady(phoneChannel)) return { error: phoneChannel };

  const metadata: Record<string, string> = {
    role: clean.role,
    first_name: clean.firstName,
    last_name: clean.lastName,
    // Compléments appliqués après la vérification de l'adresse, sur n'importe quel appareil.
    ...pendingSignupMetadata(extrasOf(input)),
  };
  if (clean.role === "student") {
    metadata.birth_date = input.birthDate;
    metadata.level_code = input.levelCode;
    if (input.seriesCode) metadata.series_code = input.seriesCode;
  }
  const supabase = await createSupabaseServerClient();
  if (clean.phone) await rememberOtpChannel(clean.phone, phoneChannel);
  const { error } = await supabase.auth.signInWithOtp(
    clean.email
      ? { email: clean.email, options: { shouldCreateUser: true, data: metadata, emailRedirectTo: emailRedirect(null) } }
      : { phone: clean.phone!, options: { shouldCreateUser: true, data: metadata } },
  );
  if (!error) return {};
  if (error.message.toLowerCase().includes("database error")) return { error: "profile" };
  const key = sendErrorKey(error);
  return { error: key === "unknown" ? "send" : key };
}

/** Code d'inscription vérifié : session ouverte, consentements enregistrés, compléments du profil. */
export async function completeSignupAction(input: SignupInput & { code: string }): Promise<{ error: SignupError } | void> {
  const code = input.code.replace(/\s/g, "");
  if (!isSupabaseConfigured()) {
    if (code !== DEMO_OTP) return { error: "code" };
    const role = parseRole(input.role);
    if (role === "admin" || !input.firstName.trim()) return { error: "invalid" };
    await setDemoRole(role);
    redirect(ROLE_HOME[role]);
  }

  const clean = cleanSignup(input);
  if (!clean) return { error: "invalid" };
  if (!/^\d{6}$/.test(code)) return { error: "code" };
  const supabase = await createSupabaseServerClient();
  const { data, error } = clean.email
    ? await supabase.auth.verifyOtp({ email: clean.email, token: code, type: "email" })
    : await supabase.auth.verifyOtp({ phone: clean.phone!, token: code, type: "sms" });
  if (error || !data.user) return { error: "code" };

  const role = (await roleOf(data.user.id)) ?? clean.role;
  await completePendingSignup(supabase, data.user, role);
  redirect(ROLE_HOME[role]);
}

// ── Validation parentale et liens parent-enfant ──────────────────────────────

/** Demande (ou relance) de validation au parent : 3 SMS au plus par 24 h. */
export async function resendConsentRequestAction(formData: FormData) {
  if (!isSupabaseConfigured()) redirect("/eleve/profil?demande=envoyee");
  const phone = readPhone(String(formData.get("parentPhone") ?? ""), formData.get("pays"));
  if (!phone) redirect("/eleve/profil?demande=telephone");
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.rpc("request_parental_consent", { p_parent_phone: phone! });
  if (error?.message.includes("too_many_requests")) redirect("/eleve/profil?demande=limite");
  if (error) redirect("/eleve/profil?demande=erreur");
  redirect("/eleve/profil?demande=envoyee");
}

/** Décision du parent sur la page /consentement/[token] (il doit être connecté avec le numéro indiqué). */
export async function decideParentalConsentAction(token: string, decision: "granted" | "refused") {
  if (isSupabaseConfigured()) {
    const identity = await requireIdentity();
    if (identity.role !== "parent") redirect(`/consentement/${token}?erreur=parent`);
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.rpc("decide_parental_consent", { p_token: token, p_decision: decision });
    if (error?.message.includes("phone_mismatch")) redirect(`/consentement/${token}?erreur=numero`);
    if (error) redirect(`/consentement/${token}?erreur=lien`);
    redirect(`/parent?consentement=${decision}`);
  }
  mockState.consentGranted = decision === "granted";
  logAudit(`${DEMO_PARENT.firstName} ${DEMO_PARENT.lastName}`, `consentement parental : ${decision}`, "Awa Ndiaye");
  await setDemoRole("parent");
  redirect(`/parent?consentement=${decision}`);
}

/** Rattachement d'un enfant par son code élève : lien en attente de confirmation par l'élève. */
export async function linkChildAction(formData: FormData) {
  const code = String(formData.get("code") ?? "").trim().toUpperCase();
  if (isSupabaseConfigured()) {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.rpc("link_child_by_code", { p_code: code });
    if (error) redirect("/parent/enfants/ajouter?erreur=code");
    redirect("/parent?lien=attente");
  }
  if (code.replace(/[^A-Z0-9]/g, "") !== DEMO_STUDENT_LINK_CODE.replace(/[^A-Z0-9]/g, "")) {
    redirect("/parent/enfants/ajouter?erreur=code");
  }
  redirect("/parent?lien=ok");
}

/** L'élève confirme le parent qui a saisi son code. */
export async function confirmParentLinkAction(parentId: string) {
  if (isSupabaseConfigured()) {
    const supabase = await createSupabaseServerClient();
    await supabase.rpc("confirm_parent_link", { p_parent: parentId });
  }
  redirect("/eleve/profil?lien=confirme");
}

export async function setDataSaverAction(enabled: boolean) {
  if (isSupabaseConfigured()) {
    const { userId } = await requireIdentity();
    const supabase = await createSupabaseServerClient();
    await supabase.from("student_profiles").update({ data_saver: enabled }).eq("user_id", userId);
    refresh();
    return;
  }
  mockState.dataSaver = enabled;
  refresh();
}
