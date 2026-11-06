"use server";

import { createHash, randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { DEMO_ROLE_COOKIE } from "@/features/account/data";
import { requireRole } from "@/features/account/guards";
import {
  applyDeviceMode,
  childKey,
  childPassword,
  familyDeviceToken,
  guardFail,
  guardStatus,
  guardSuccess,
  ipKey,
  logAuthEvent,
  markPinSet,
  progressiveDelay,
  setFamilyDeviceToken,
  verifyCurrentPin,
} from "@/features/account/pin-auth";
import { DEMO_PIN } from "@/features/account/pin-constants";
import { requireIdentity } from "@/features/account/session";
import { isSupabaseConfigured, isPinLoginEnabled } from "@/lib/env";
import { isLevelCode } from "@/lib/levels";
import { cleanPin, isPinFormat, pinProblem } from "@/lib/pin-rules";
import { getRequestMeta } from "@/lib/request-meta";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseAuthGateway } from "@/lib/supabase/auth-gateway";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { normalizeFamilyCode } from "./data";

/** Connexion PIN éteinte (DIANGAL_PIN_LOGIN) : ces actions sont refusées. */
function requirePinLogin() {
  if (!isPinLoginEnabled()) throw new Error("Connexion par code PIN désactivée.");
}

// Enfants sans téléphone, connexion par code PIN (interrupteur DIANGAL_PIN_LOGIN) : le code PIN de l'enfant
// devient le mot de passe dérivé de son compte, vérifié par Supabase Auth. Le parent confirme chaque
// opération sensible avec son propre code PIN. Les anciennes actions (actions.ts) restent pour le retour arrière.

const FAMILY_PATH = "/parent/famille";
const DATE = /^\d{4}-\d{2}-\d{2}$/;
const AVATARS = ["awa", "moussa", "fatou"] as const;
const field = (formData: FormData, name: string, max: number) => String(formData.get(name) ?? "").trim().slice(0, max);
const sha256 = (value: string) => createHash("sha256").update(value).digest("hex");

/** Nouveau code PIN d'un enfant (6 chiffres, saisi deux fois, pas trop simple) ou la raison du refus. */
function readChildPin(formData: FormData): { pin: string } | { error: string } {
  const pin = cleanPin(formData.get("pin"));
  const problem = pinProblem(pin);
  if (problem) return { error: problem === "format" ? "pin" : "pinSimple" };
  if (pin !== cleanPin(formData.get("pinConfirm"))) return { error: "pinDifferent" };
  return { pin };
}

/** Le parent confirme avec son propre code PIN (noté 5 minutes pour sa session). */
async function confirmParent(formData: FormData, anchor: string) {
  if (!isSupabaseConfigured()) {
    if (cleanPin(formData.get("parentPin")) !== DEMO_PIN) redirect(`${FAMILY_PATH}?erreur=reauth#${anchor}`);
    return;
  }
  const result = await verifyCurrentPin(cleanPin(formData.get("parentPin")), await getRequestMeta());
  if (result === "locked") redirect(`${FAMILY_PATH}?erreur=bloque#${anchor}`);
  if (result !== "ok") redirect(`${FAMILY_PATH}?erreur=reauth#${anchor}`);
}

/** Libellé de l'appareil d'après son type (« Téléphone Android », « Ordinateur Windows »). */
async function deviceLabel(): Promise<string> {
  const [t, meta] = await Promise.all([getTranslations("family.devices.kinds"), getRequestMeta()]);
  const known = ["android", "ios", "windows", "mac", "linux"] as const;
  const kind = known.find((k) => k === meta.device) ?? "other";
  return t(kind);
}

/** Cet appareil affiche désormais les profils des enfants (jeton dans un cookie, empreinte en base). */
async function registerThisDevice(): Promise<boolean> {
  const token = randomBytes(32).toString("base64url");
  if (isSupabaseConfigured()) {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.rpc("register_family_device", { p_token_hash: sha256(token), p_label: await deviceLabel() });
    if (error) return false;
    const identity = await requireIdentity();
    await logAuthEvent(identity.userId, "device_added", null, await getRequestMeta());
  }
  await setFamilyDeviceToken(token);
  return true;
}

/** Le parent donne ou change le code PIN d'un enfant relié : l'enfant est déconnecté partout, blocage levé. */
export async function setChildPinV2Action(studentId: string, formData: FormData) {
  requirePinLogin();
  await requireRole("parent");
  const read = readChildPin(formData);
  if ("error" in read) redirect(`${FAMILY_PATH}?erreur=${read.error}#enfants-titre`);
  await confirmParent(formData, "enfants-titre");
  if (!isSupabaseConfigured()) redirect(`${FAMILY_PATH}?demo=1#enfants-titre`);

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.rpc("authorize_child_pin_change", { p_student: studentId });
  if (error) redirect(`${FAMILY_PATH}?erreur=${error.message.includes("reauth_required") ? "reauth" : "enfant"}#enfants-titre`);
  const admin = createSupabaseAdminClient();
  const { error: authError } = await admin.auth.admin.updateUserById(studentId, { password: childPassword(studentId, read.pin) });
  if (authError) redirect(`${FAMILY_PATH}?erreur=enfant#enfants-titre`);
  await admin.rpc("revoke_user_sessions", { p_user: studentId });
  await markPinSet(studentId, "child");
  const { userId } = await requireIdentity();
  await logAuthEvent(userId, "child_pin_set", null, await getRequestMeta());
  redirect(`${FAMILY_PATH}?pin=1#enfants-titre`);
}

/**
 * Profil d'un jeune enfant sans email ni téléphone : compte créé par le serveur (adresse technique jamais
 * utilisée pour écrire), relié au parent, validation parentale, code PIN, personnage illustré.
 */
export async function createChildProfileV2Action(formData: FormData) {
  requirePinLogin();
  await requireRole("parent");
  const firstName = field(formData, "firstName", 40);
  const lastName = field(formData, "lastName", 40);
  const levelCode = field(formData, "level", 8);
  const birthDate = field(formData, "birthDate", 10);
  const avatar = AVATARS.find((a) => a === formData.get("avatar")) ?? "moussa";
  if (firstName.length < 2 || lastName.length < 2 || !isLevelCode(levelCode) || !DATE.test(birthDate)) {
    redirect(`${FAMILY_PATH}?erreur=profil#nouveau-titre`);
  }
  const read = readChildPin(formData);
  if ("error" in read) redirect(`${FAMILY_PATH}?erreur=${read.error}#nouveau-titre`);
  await confirmParent(formData, "nouveau-titre");
  const showHere = formData.get("appareil") === "on";

  if (!isSupabaseConfigured()) {
    if (showHere) await registerThisDevice();
    redirect(`${FAMILY_PATH}?demo=1&cree=${encodeURIComponent(firstName)}#enfants-titre`);
  }

  const { userId: parentId } = await requireIdentity();
  const admin = createSupabaseAdminClient();
  const { data, error } = await admin.auth.admin.createUser({
    email: `enfant-${crypto.randomUUID()}@enfant.diangal.invalid`,
    email_confirm: true,
    user_metadata: { role: "student", first_name: firstName, last_name: lastName, birth_date: birthDate, level_code: levelCode, managed: true },
  });
  if (error || !data.user) redirect(`${FAMILY_PATH}?erreur=creation#nouveau-titre`);
  const childId = data.user!.id;
  const { error: linkError } = await admin.rpc("register_managed_child_v2", { p_parent: parentId, p_child: childId });
  const { error: pinError } = linkError ? { error: linkError } : await admin.auth.admin.updateUserById(childId, { password: childPassword(childId, read.pin) });
  if (linkError || pinError) {
    await admin.auth.admin.deleteUser(childId);
    redirect(`${FAMILY_PATH}?erreur=creation#nouveau-titre`);
  }
  await markPinSet(childId, "child");
  await admin.from("profiles").update({ avatar_key: avatar }).eq("id", childId);
  await logAuthEvent(parentId, "child_pin_set", null, await getRequestMeta());
  if (showHere && !(await registerThisDevice())) redirect(`${FAMILY_PATH}?cree=${encodeURIComponent(firstName)}&erreur=appareil#appareils-titre`);
  redirect(`${FAMILY_PATH}?cree=${encodeURIComponent(firstName)}#enfants-titre`);
}

/** Cet appareil devient un appareil de la famille (code PIN du parent confirmé). */
export async function addFamilyDeviceAction(formData: FormData) {
  requirePinLogin();
  await requireRole("parent");
  await confirmParent(formData, "appareils-titre");
  if (!(await registerThisDevice())) redirect(`${FAMILY_PATH}?erreur=appareil#appareils-titre`);
  redirect(`${FAMILY_PATH}?appareil=1#appareils-titre`);
}

export async function removeFamilyDeviceAction(deviceId: string) {
  requirePinLogin();
  await requireRole("parent");
  if (isSupabaseConfigured()) {
    const supabase = await createSupabaseServerClient();
    await supabase.rpc("revoke_family_device", { p_id: deviceId });
    const { userId } = await requireIdentity();
    await logAuthEvent(userId, "device_removed", null, await getRequestMeta());
  }
  redirect(`${FAMILY_PATH}?retire=1#appareils-titre`);
}

/**
 * Connexion d'un enfant : il a choisi son prénom (appareil de la famille ou code famille), il tape son code
 * PIN. Supabase Auth vérifie le mot de passe dérivé ; blocage progressif par enfant et par adresse IP.
 * Session « enfant » : sans durée, fermée après 30 minutes sans activité.
 */
export async function childPinSignInAction(familyCode: string | null, studentId: string, formData: FormData) {
  requirePinLogin();
  const code = familyCode ? normalizeFamilyCode(familyCode) : null;
  const pin = cleanPin(formData.get("pin"));
  const back: (erreur: string) => never = (erreur) =>
    redirect(`/connexion/enfant?${new URLSearchParams({ ...(code ? { code } : {}), enfant: studentId, erreur })}`);
  if (!isPinFormat(pin)) back("pin");

  if (!isSupabaseConfigured()) {
    if (pin !== DEMO_PIN) back("pin");
    (await cookies()).set(DEMO_ROLE_COOKIE, "student", { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/" });
    await applyDeviceMode("enfant", false);
    redirect("/eleve");
  }

  // L'enfant doit appartenir à la famille de cet appareil, ou du code famille tapé.
  const admin = createSupabaseAdminClient();
  const token = code ? null : await familyDeviceToken();
  const { data: family } = code
    ? await admin.rpc("get_family_children", { p_code: code })
    : token
      ? await admin.rpc("family_device_children", { p_token_hash: sha256(token) })
      : { data: null };
  if (!family?.some((c) => c.student_id === studentId)) back("session");

  const meta = await getRequestMeta();
  const keys = [childKey(studentId), ipKey(meta.ip)];
  if ((await guardStatus(...keys)).locked) back("bloque");
  const { data: user } = await admin.auth.admin.getUserById(studentId);
  const email = user.user?.email;
  if (!email) back("session");

  const gateway = await createSupabaseAuthGateway(meta.ip, "enfant");
  const { error } = await gateway.auth.signInWithPassword({ email: email!, password: childPassword(studentId, pin) });
  if (error) {
    const after = await guardFail(...keys);
    await logAuthEvent(studentId, "child_failure", null, meta);
    await progressiveDelay(after.failures);
    back(after.locked ? "bloque" : "pin");
  }
  await guardSuccess(keys[0]!);
  await logAuthEvent(studentId, "child_login", null, meta);
  await applyDeviceMode("enfant", false);
  redirect("/eleve");
}
