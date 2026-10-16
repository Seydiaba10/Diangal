"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { DEMO_ROLE_COOKIE } from "@/features/account/data";
import { requireRole } from "@/features/account/guards";
import { requireIdentity } from "@/features/account/session";
import { isSupabaseConfigured } from "@/lib/env";
import { isLevelCode } from "@/lib/levels";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { DEMO_STUDENT_ID } from "@/mocks/users";
import { DEMO_CHILD_PIN, DEMO_FAMILY_CODE, normalizeFamilyCode } from "./data";

const FAMILY_PATH = "/parent/famille";
const PIN = /^[0-9]{4,6}$/;
const DATE = /^\d{4}-\d{2}-\d{2}$/;

const field = (formData: FormData, name: string, max: number) => String(formData.get(name) ?? "").trim().slice(0, max);

/** Code PIN (4 à 6 chiffres) saisi deux fois à l'identique ; null sinon. */
function readPin(formData: FormData): string | null {
  const pin = field(formData, "pin", 6);
  return PIN.test(pin) && pin === field(formData, "pinConfirm", 6) ? pin : null;
}

/** Le parent donne ou change le code PIN d'un enfant relié. */
export async function setChildPinAction(studentId: string, formData: FormData) {
  await requireRole("parent");
  const pin = readPin(formData);
  if (!pin) redirect(`${FAMILY_PATH}?erreur=pin#enfants-titre`);
  if (!isSupabaseConfigured()) redirect(`${FAMILY_PATH}?demo=1#enfants-titre`);
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.rpc("set_child_pin", { p_student: studentId, p_pin: pin });
  if (error) redirect(`${FAMILY_PATH}?erreur=enfant#enfants-titre`);
  redirect(`${FAMILY_PATH}?pin=1#enfants-titre`);
}

/**
 * Profil d'un jeune enfant sans email ni téléphone : le serveur crée le compte (adresse technique
 * jamais utilisée pour écrire), le relie au parent, enregistre la validation parentale et le code PIN.
 */
export async function createChildProfileAction(formData: FormData) {
  await requireRole("parent");
  const firstName = field(formData, "firstName", 40);
  const lastName = field(formData, "lastName", 40);
  const levelCode = field(formData, "level", 8);
  const birthDate = field(formData, "birthDate", 10);
  const pin = readPin(formData);
  if (firstName.length < 2 || lastName.length < 2 || !isLevelCode(levelCode) || !DATE.test(birthDate)) {
    redirect(`${FAMILY_PATH}?erreur=profil#nouveau-titre`);
  }
  if (!pin) redirect(`${FAMILY_PATH}?erreur=pin#nouveau-titre`);
  if (!isSupabaseConfigured()) redirect(`${FAMILY_PATH}?demo=1#nouveau-titre`);

  const { userId: parentId } = await requireIdentity();
  const admin = createSupabaseAdminClient();
  const { data, error } = await admin.auth.admin.createUser({
    email: `enfant-${crypto.randomUUID()}@enfant.diangal.invalid`,
    email_confirm: true,
    user_metadata: { role: "student", first_name: firstName, last_name: lastName, birth_date: birthDate, level_code: levelCode, managed: true },
  });
  if (error || !data.user) redirect(`${FAMILY_PATH}?erreur=creation#nouveau-titre`);
  const { error: linkError } = await admin.rpc("register_managed_child", { p_parent: parentId, p_child: data.user.id, p_pin: pin });
  if (linkError) {
    await admin.auth.admin.deleteUser(data.user.id);
    redirect(`${FAMILY_PATH}?erreur=creation#nouveau-titre`);
  }
  redirect(`${FAMILY_PATH}?cree=${encodeURIComponent(firstName)}#enfants-titre`);
}

/** Connexion d'un enfant, étape 1 : le code famille de son parent. */
export async function childLookupAction(formData: FormData) {
  const code = normalizeFamilyCode(formData.get("code"));
  if (code.length !== 8) redirect("/connexion/enfant?erreur=code");
  redirect(`/connexion/enfant?code=${code}`);
}

/**
 * Connexion d'un enfant, étape 2 : son code PIN. Vérifié en base (5 erreurs : 15 minutes de
 * blocage) ; le serveur ouvre ensuite la session de l'enfant, sans email ni SMS.
 */
export async function childSignInAction(code: string, studentId: string, formData: FormData) {
  const family = normalizeFamilyCode(code);
  const pin = field(formData, "pin", 6);
  const back = `/connexion/enfant?code=${family}&enfant=${encodeURIComponent(studentId)}`;
  if (!PIN.test(pin)) redirect(`${back}&erreur=pin`);

  if (!isSupabaseConfigured()) {
    if (family !== DEMO_FAMILY_CODE || studentId !== DEMO_STUDENT_ID || pin !== DEMO_CHILD_PIN) redirect(`${back}&erreur=pin`);
    (await cookies()).set(DEMO_ROLE_COOKIE, "student", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
    redirect("/eleve");
  }

  const admin = createSupabaseAdminClient();
  const { data: result } = await admin.rpc("verify_child_pin", { p_code: family, p_student: studentId, p_pin: pin });
  if (result === "locked") redirect(`${back}&erreur=bloque`);
  if (result !== "ok") redirect(`${back}&erreur=pin`);

  const { data: user } = await admin.auth.admin.getUserById(studentId);
  const email = user.user?.email;
  if (!email) redirect(`${back}&erreur=session`);
  const { data: link, error: linkError } = await admin.auth.admin.generateLink({ type: "magiclink", email });
  if (linkError || !link.properties?.email_otp) redirect(`${back}&erreur=session`);
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.verifyOtp({ email, token: link.properties.email_otp, type: "email" });
  if (error) redirect(`${back}&erreur=session`);
  redirect("/eleve");
}
