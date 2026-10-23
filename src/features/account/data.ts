import { cookies } from "next/headers";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { cache } from "react";
import { getNextExamFor } from "@/features/exams/data";
import { isSupabaseConfigured } from "@/lib/env";
import { mockDashboard, mockStudent } from "@/mocks/student-3e";
import { mockState } from "@/mocks/progress-store";
import { MOCK_TUTORS } from "@/mocks/tutors";
import {
  DEMO_ADMIN,
  DEMO_PARENT,
  DEMO_SECOND_CHILD,
  DEMO_STUDENT_ID,
  DEMO_STUDENT_LINK_CODE,
  DEMO_TUTOR_ID,
} from "@/mocks/users";
import type {
  AccountDeletionMode,
  AccountDeletionStatus,
  AccountOverview,
  AppRole,
  ChildOverview,
  SessionUser,
  StudentSummary,
} from "@/types/domain";
import { ROLE_HOME, ROLES } from "./roles";
import { requireIdentity } from "./session";
import {
  fetchAccountOverview,
  fetchConsentRequest,
  fetchDeletionStatus,
  fetchDataSaver,
  fetchParentChildren,
  fetchPendingParentLinks,
  fetchSessionUser,
  fetchStudentLinkInfo,
  fetchStudentSummary,
} from "./supabase";

// Démo : rôle stocké dans un cookie et comptes fictifs (src/mocks).
// Supabase : session Supabase Auth (claim user_role du JWT) et données lues sous RLS.
export const DEMO_ROLE_COOKIE = "diangal_demo_role";
/** Numéro fictif du compte de démonstration (affiché masqué). */
const DEMO_PHONE = "+221770000021";

export const getCurrentRole = cache(async (): Promise<AppRole> => {
  if (isSupabaseConfigured()) return (await requireIdentity()).role;
  const value = (await cookies()).get(DEMO_ROLE_COOKIE)?.value;
  return ROLES.includes(value as AppRole) ? (value as AppRole) : "student";
});

function premiumUntil(studentId: string): number | null {
  const until = mockState.premiumUntil.get(studentId) ?? 0;
  return until > Date.now() ? until : null;
}

/** Élève connecté. Un autre rôle est renvoyé vers son propre espace. */
export const getCurrentStudent = cache(async (): Promise<StudentSummary> => {
  await connection(); // donnée propre à l'utilisateur : rendue à la requête
  if (isSupabaseConfigured()) {
    const identity = await requireIdentity();
    if (identity.role !== "student") redirect(ROLE_HOME[identity.role]);
    const student = await fetchStudentSummary(identity.userId, true);
    if (!student) redirect("/connexion?erreur=profil");
    return student;
  }
  // Démo : la classe change si Awa est passée en classe supérieure pendant la démo (en mémoire).
  const level = mockState.studentLevel;
  return {
    ...mockStudent,
    ...(level ? { levelCode: level.levelCode, seriesCode: level.seriesCode, levelName: (await getTranslations("levels"))(level.levelCode as "3E") } : {}),
    isPremium: premiumUntil(DEMO_STUDENT_ID) !== null,
    consentStatus: mockState.consentGranted ? "granted" : "pending",
  };
});

/** Élève vu par un parent lié (ou par l'admin) : la RLS vérifie le lien. */
export const getStudentSummaryFor = cache(async (studentId: string): Promise<StudentSummary | null> => {
  await connection();
  if (isSupabaseConfigured()) return fetchStudentSummary(studentId, false);
  return studentId === DEMO_STUDENT_ID ? getCurrentStudent() : null;
});

/** Utilisateur affiché dans la coquille (carte, avatar, notifications) selon le rôle. */
export const getSessionUser = cache(async (role: AppRole): Promise<SessionUser> => {
  await connection();
  if (isSupabaseConfigured()) return fetchSessionUser(await requireIdentity());
  switch (role) {
    case "student": {
      const s = await getCurrentStudent();
      return {
        role,
        id: DEMO_STUDENT_ID,
        firstName: s.firstName,
        lastName: s.lastName,
        avatarKey: s.avatarKey,
        unreadNotifications: s.unreadNotifications,
        levelCode: s.levelCode,
        levelName: s.levelName,
        schoolName: s.schoolName,
        streakDays: s.streakDays,
      };
    }
    case "parent":
      return {
        role,
        id: DEMO_PARENT.id,
        firstName: DEMO_PARENT.firstName,
        lastName: DEMO_PARENT.lastName,
        avatarKey: null,
        unreadNotifications: mockState.consentGranted ? 0 : 1,
        childrenCount: DEMO_PARENT.childIds.length,
      };
    case "tutor": {
      const [firstName = "", ...rest] = MOCK_TUTORS.find((t) => t.id === DEMO_TUTOR_ID)!.displayName.split(" ");
      return { role, id: DEMO_TUTOR_ID, firstName, lastName: rest.join(" "), avatarKey: null, unreadNotifications: 1 };
    }
    case "admin":
      return {
        role,
        id: DEMO_ADMIN.id,
        firstName: DEMO_ADMIN.firstName,
        lastName: DEMO_ADMIN.lastName,
        avatarKey: null,
        unreadNotifications: 0,
      };
  }
});

/** Enfants reliés au parent connecté (lien actif), avec leur suivi. */
export const getParentChildren = cache(async (): Promise<ChildOverview[]> => {
  await connection();
  if (isSupabaseConfigured()) return fetchParentChildren((await requireIdentity()).userId);
  const awaUntil = premiumUntil(DEMO_STUDENT_ID);
  const moussaUntil = premiumUntil(DEMO_SECOND_CHILD.id);
  const [awaExam, moussaExam] = await Promise.all([getNextExamFor("3E"), getNextExamFor("CM2")]);
  return [
    {
      id: DEMO_STUDENT_ID,
      firstName: mockStudent.firstName,
      lastName: mockStudent.lastName,
      levelCode: mockStudent.levelCode,
      levelName: mockStudent.levelName,
      schoolName: mockStudent.schoolName,
      avatarKey: mockStudent.avatarKey,
      average20: mockDashboard.stats.average20,
      streakDays: mockDashboard.stats.streakDays,
      chaptersCompleted: mockDashboard.stats.chaptersCompleted,
      chaptersTotal: mockDashboard.stats.chaptersTotal,
      lastActivityAt: "2026-10-10T07:45:00Z",
      weakPointsCount: mockDashboard.weakPoints.length,
      consentStatus: mockState.consentGranted ? "granted" : "pending",
      premiumUntil: awaUntil ? new Date(awaUntil).toISOString() : null,
      nextExam: awaExam,
    },
    {
      ...DEMO_SECOND_CHILD,
      consentStatus: "granted",
      premiumUntil: moussaUntil ? new Date(moussaUntil).toISOString() : null,
      nextExam: moussaExam,
    },
  ];
});

export const getParentChild = cache(async (childId: string) => {
  return (await getParentChildren()).find((c) => c.id === childId);
});

/** Demande de consentement liée au lien SMS (jeton haché en base, expiration 7 jours). */
export async function getConsentRequest(token: string) {
  if (isSupabaseConfigured()) return fetchConsentRequest(token);
  return token === "demo" ? { childFirstName: mockStudent.firstName, childLastName: mockStudent.lastName } : null;
}

/** Préférences de l'élève (économie de données). */
export const getPreferences = cache(async () => {
  await connection();
  if (isSupabaseConfigured()) return { dataSaver: await fetchDataSaver((await requireIdentity()).userId) };
  return { dataSaver: mockState.dataSaver };
});

/** Infos de rattachement parent : numéro masqué du parent sollicité (s'il y en a un) et code élève. */
export async function getStudentLinkInfo(): Promise<{ parentPhoneMasked: string | null; linkCode: string }> {
  if (isSupabaseConfigured()) return fetchStudentLinkInfo((await requireIdentity()).userId);
  return { parentPhoneMasked: DEMO_PARENT.phoneMasked, linkCode: DEMO_STUDENT_LINK_CODE };
}

/** Coordonnée de connexion de l'utilisateur, masquée (téléphone) ou email. */
export async function getOwnContact(): Promise<string | null> {
  if (!isSupabaseConfigured()) return DEMO_PARENT.phoneMasked;
  const { phone, email } = await requireIdentity();
  if (phone) return `${phone.slice(4, 6)} ••• •• ${phone.slice(-2)}`;
  return email;
}

/** Parents qui ont saisi le code de l'élève connecté et attendent sa confirmation. */
export const getPendingParentLinks = cache(async () => {
  await connection();
  if (isSupabaseConfigured()) return fetchPendingParentLinks();
  return [] as { parentId: string; firstName: string; lastName: string }[];
});

/** Identifiants de connexion de l'utilisateur (page « Mon compte »). */
export const getAccountOverview = cache(async (): Promise<AccountOverview> => {
  await connection();
  if (isSupabaseConfigured()) return fetchAccountOverview(await requireIdentity());
  const role = await getCurrentRole();
  const user = await getSessionUser(role);
  return { firstName: user.firstName, lastName: user.lastName, role, email: null, phone: DEMO_PHONE };
});

/**
 * Suppression du compte connecté (childId absent) ou de celui d'un enfant relié. La base décide
 * du mode (direct, validation parentale, bloqué) ; la démo reproduit les mêmes cas sans rien effacer.
 */
export const getDeletionStatus = cache(async (childId: string | null): Promise<AccountDeletionStatus | null> => {
  await connection();
  if (isSupabaseConfigured()) return fetchDeletionStatus(childId);
  const role = await getCurrentRole();
  const base = { recentLogin: true, pendingRequestAt: null, managedChildren: [] };
  if (childId) return role === "parent" && DEMO_PARENT.childIds.includes(childId) ? { ...base, mode: "direct" } : null;
  const mode: AccountDeletionMode = role === "student" ? "parent_approval" : role === "admin" ? "blocked_admin" : "direct";
  return { ...base, mode };
});
