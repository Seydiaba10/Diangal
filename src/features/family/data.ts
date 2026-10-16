import { connection } from "next/server";
import { cache } from "react";
import { requireIdentity } from "@/features/account/session";
import { isSupabaseConfigured } from "@/lib/env";
import { mockState } from "@/mocks/progress-store";
import { DEMO_SECOND_CHILD, DEMO_STUDENT_ID } from "@/mocks/users";
import { mockStudent } from "@/mocks/student-3e";
import type { AvatarKey, ChildLoginInfo, FamilyCoverage } from "@/types/domain";
import { fetchChildLogins, fetchFamilyChildren, fetchFamilyCode, fetchFamilyCoverage } from "./supabase";

// Démo : code famille fixe, Awa a un code PIN (1234). Supabase : code famille et PIN en base (schéma privé).

export const DEMO_FAMILY_CODE = "DEMOKIDS";
export const DEMO_CHILD_PIN = "1234";

/** Code famille sans espaces ni tirets, en majuscules. */
export function normalizeFamilyCode(value: unknown): string {
  return String(value ?? "")
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, 8);
}

/** Formule Famille en cours du parent connecté, ou null. */
export const getFamilyCoverage = cache(async (): Promise<FamilyCoverage | null> => {
  await connection();
  if (isSupabaseConfigured()) return fetchFamilyCoverage((await requireIdentity()).userId);
  const ends = [DEMO_STUDENT_ID, DEMO_SECOND_CHILD.id].map((id) => mockState.premiumUntil.get(id) ?? 0);
  const latest = Math.max(...ends);
  if (latest <= Date.now()) return null;
  const family = mockState.payments.find((p) => p.planCode.startsWith("family_"));
  return family
    ? { planCode: family.planCode, endsAt: new Date(latest).toISOString(), childIds: [DEMO_STUDENT_ID, DEMO_SECOND_CHILD.id], maxChildren: 4 }
    : null;
});

/** Code famille du parent connecté (créé à la première demande). */
export const getFamilyCode = cache(async (): Promise<string> => {
  await connection();
  return isSupabaseConfigured() ? fetchFamilyCode() : DEMO_FAMILY_CODE;
});

/** Enfants du parent connecté qui ont un code PIN. */
export const getChildLogins = cache(async (): Promise<ChildLoginInfo[]> => {
  await connection();
  if (isSupabaseConfigured()) return fetchChildLogins();
  return [{ studentId: DEMO_STUDENT_ID, hasPin: true, locked: false }];
});

/** Écran de connexion d'un enfant : enfants de la famille qui ont un code PIN (prénom, avatar). */
export async function getFamilyChildrenForLogin(code: string): Promise<{ id: string; firstName: string; avatarKey: AvatarKey }[]> {
  await connection();
  if (code.length !== 8) return [];
  if (isSupabaseConfigured()) return fetchFamilyChildren(code);
  return code === DEMO_FAMILY_CODE ? [{ id: DEMO_STUDENT_ID, firstName: mockStudent.firstName, avatarKey: mockStudent.avatarKey }] : [];
}
