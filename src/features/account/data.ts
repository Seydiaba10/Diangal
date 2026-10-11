import { cookies } from "next/headers";
import { connection } from "next/server";
import { cache } from "react";
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
import type { AppRole, ChildOverview, SessionUser, StudentSummary } from "@/types/domain";
import { getNextExamFor } from "@/features/exams/data";
import { ROLES } from "./roles";

// Phases 1-2 : le rôle de démonstration est stocké dans un cookie.
// Phase 4 : remplacé par la session Supabase (claim user_role du JWT).
export const DEMO_ROLE_COOKIE = "diangal_demo_role";

export const getCurrentRole = cache(async (): Promise<AppRole> => {
  const value = (await cookies()).get(DEMO_ROLE_COOKIE)?.value;
  return ROLES.includes(value as AppRole) ? (value as AppRole) : "student";
});

function premiumUntil(studentId: string): number | null {
  const until = mockState.premiumUntil.get(studentId) ?? 0;
  return until > Date.now() ? until : null;
}

/** Élève connecté. Phase 3 : lecture Supabase (profiles + student_profiles), même signature. */
export const getCurrentStudent = cache(async (): Promise<StudentSummary> => {
  await connection(); // donnée propre à l'utilisateur : rendue à la requête
  return {
    ...mockStudent,
    isPremium: premiumUntil(DEMO_STUDENT_ID) !== null,
    consentStatus: mockState.consentGranted ? "granted" : "pending",
  };
});

/** Utilisateur affiché dans la coquille (carte, avatar, notifications) selon le rôle. */
export const getSessionUser = cache(async (role: AppRole): Promise<SessionUser> => {
  await connection();
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

/** Enfants reliés au parent connecté. Phase 3 : parent_links + get_student_dashboard. */
export const getParentChildren = cache(async (): Promise<ChildOverview[]> => {
  await connection();
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

/** Demande de consentement liée au lien SMS. Phase 4 : consent_requests (jeton haché, expiration). */
export async function getConsentRequest(token: string) {
  return token === "demo" ? { childFirstName: mockStudent.firstName, childLastName: mockStudent.lastName } : null;
}

/** Préférences de l'utilisateur. Phase 3 : colonne student_profiles.data_saver. */
export const getPreferences = cache(async () => {
  await connection();
  return { dataSaver: mockState.dataSaver };
});

/** Infos de rattachement parent : numéro masqué du parent sollicité et code élève. */
export async function getStudentLinkInfo() {
  return { parentPhoneMasked: DEMO_PARENT.phoneMasked, linkCode: DEMO_STUDENT_LINK_CODE };
}
