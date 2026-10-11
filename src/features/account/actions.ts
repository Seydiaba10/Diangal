"use server";

import { cookies } from "next/headers";
import { refresh } from "next/cache";
import { redirect } from "next/navigation";
import { logAudit, mockState } from "@/mocks/progress-store";
import { DEMO_PARENT, DEMO_STUDENT_LINK_CODE } from "@/mocks/users";
import type { AppRole } from "@/types/domain";
import { DEMO_ROLE_COOKIE } from "./data";
import { ROLE_HOME, ROLES } from "./roles";

/** Code OTP de démonstration (phases 1-2). Phase 4 : vérification Supabase Auth (SMS / email). */
const DEMO_OTP = "123456";

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

export async function verifyDemoCodeAction(formData: FormData) {
  const role = parseRole(formData.get("role"));
  const code = String(formData.get("code") ?? "").replace(/\s/g, "");
  if (code !== DEMO_OTP) {
    const params = new URLSearchParams({ role, identifiant: String(formData.get("identifiant") ?? ""), erreur: "code" });
    redirect(`/connexion/code?${params}`);
  }
  await setDemoRole(role);
  redirect(ROLE_HOME[role]);
}

export async function switchDemoRoleAction(role: AppRole) {
  const safeRole = parseRole(role);
  await setDemoRole(safeRole);
  redirect(ROLE_HOME[safeRole]);
}

export async function signOutAction() {
  (await cookies()).delete(DEMO_ROLE_COOKIE);
  redirect("/");
}

export interface SignupInput {
  role: AppRole;
  firstName: string;
  code: string;
}

/** Fin de l'assistant d'inscription. Phase 4 : création du profil via Supabase + consentements. */
export async function completeSignupAction(input: SignupInput): Promise<{ error: "code" | "invalid" } | void> {
  if (input.code.replace(/\s/g, "") !== DEMO_OTP) return { error: "code" };
  const role = parseRole(input.role);
  if (role === "admin" || !input.firstName.trim()) return { error: "invalid" };
  await setDemoRole(role);
  redirect(ROLE_HOME[role]);
}

/** Relance du SMS de consentement au parent (3 relances maximum en production). */
export async function resendConsentRequestAction() {
  redirect("/eleve/profil?demande=envoyee");
}

/** Décision du parent sur la page /consentement/[token]. */
export async function decideParentalConsentAction(decision: "granted" | "refused") {
  mockState.consentGranted = decision === "granted";
  logAudit(`${DEMO_PARENT.firstName} ${DEMO_PARENT.lastName}`, `consentement parental : ${decision}`, "Awa Ndiaye");
  await setDemoRole("parent");
  redirect(`/parent?consentement=${decision}`);
}

/** Rattachement d'un enfant par son code élève. Phase 3 : RPC link_child_by_code. */
export async function linkChildAction(formData: FormData) {
  const code = String(formData.get("code") ?? "").trim().toUpperCase();
  if (code !== DEMO_STUDENT_LINK_CODE) redirect("/parent/enfants/ajouter?erreur=code");
  redirect("/parent?lien=ok");
}

export async function setDataSaverAction(enabled: boolean) {
  mockState.dataSaver = enabled;
  refresh();
}
