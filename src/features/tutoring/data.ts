import { connection } from "next/server";
import { cache } from "react";
import { getCurrentRole, getCurrentStudent } from "@/features/account/data";
import { requireIdentity } from "@/features/account/session";
import { getRecentResults } from "@/features/assessments/data";
import { getSubjects } from "@/features/curriculum/data";
import { getSubjectAverages } from "@/features/progress/data";
import { isSupabaseConfigured } from "@/lib/env";
import { mockState } from "@/mocks/progress-store";
import { mockDashboard } from "@/mocks/student-3e";
import { DEMO_SECOND_CHILD, DEMO_STUDENT_ID, DEMO_TUTOR_ID } from "@/mocks/users";
import type {
  FamilyTutorLink,
  SubjectCode,
  TutorAssignment,
  TutorSession,
  TutorStudentItem,
  TutorStudentView,
} from "@/types/domain";
import { fetchAssignments, fetchFamilyTutorLinks, fetchSessions, fetchTutorStudent, fetchTutorStudents } from "./supabase";

// Suivi d'élèves par un répétiteur. Démo : Mamadou suit Awa et a invité Moussa.
// Supabase : tutor_students / tutor_assignments / tutor_sessions (RLS + RPC, migration 000007).

const DEMO_STUDENTS: Record<string, { name: string; firstName: string; levelCode: string; levelName: string }> = {
  [DEMO_STUDENT_ID]: { name: "Awa N.", firstName: "Awa", levelCode: "3E", levelName: "3e" },
  [DEMO_SECOND_CHILD.id]: { name: "Moussa N.", firstName: "Moussa", levelCode: "CM2", levelName: "CM2" },
};
const DEMO_TUTOR = { name: "Mamadou D.", headline: "Professeur de maths, préparation au BFEM" };
const DAY = 86_400_000;

/** Données de démonstration, créées à la première lecture (après connection() : dates relatives à aujourd'hui). */
function ensureSeed() {
  if (mockState.tutorLinks.size > 0) return;
  const now = Date.now();
  mockState.tutorLinks.set(`${DEMO_TUTOR_ID}:${DEMO_STUDENT_ID}`, {
    tutorId: DEMO_TUTOR_ID,
    studentId: DEMO_STUDENT_ID,
    status: "active",
    invitedAt: new Date(now - 12 * DAY).toISOString(),
  });
  mockState.tutorLinks.set(`${DEMO_TUTOR_ID}:${DEMO_SECOND_CHILD.id}`, {
    tutorId: DEMO_TUTOR_ID,
    studentId: DEMO_SECOND_CHILD.id,
    status: "pending",
    invitedAt: new Date(now - DAY).toISOString(),
  });
  mockState.tutorAssignments.push({
    id: "devoir-thales",
    tutorId: DEMO_TUTOR_ID,
    studentId: DEMO_STUDENT_ID,
    title: "Exercices sur le théorème de Thalès",
    instructions: "Refais les exercices 1 à 3 de la leçon « Calculer une longueur », puis envoie-moi tes questions.",
    dueOn: new Date(now + 3 * DAY).toISOString().slice(0, 10),
    doneAt: null,
    createdAt: new Date(now - 2 * DAY).toISOString(),
  });
  const start = new Date(now + 2 * DAY);
  start.setUTCHours(17, 0, 0, 0);
  mockState.tutorSessions.push({
    id: "seance-revisions",
    tutorId: DEMO_TUTOR_ID,
    studentId: DEMO_STUDENT_ID,
    startsAt: start.toISOString(),
    durationMin: 60,
    topic: "Révisions : Thalès et trigonométrie",
    status: "planned",
  });
}

// ── Côté répétiteur ─────────────────────────────────────────────────────────

/** Élèves suivis et invitations en attente du répétiteur connecté. */
export const getTutorStudents = cache(async (): Promise<TutorStudentItem[]> => {
  await connection();
  if (isSupabaseConfigured()) return fetchTutorStudents();
  ensureSeed();
  const now = Date.now();
  return [...mockState.tutorLinks.values()]
    .filter((l) => l.tutorId === DEMO_TUTOR_ID && (l.status === "active" || l.status === "pending"))
    .map((l) => {
      const s = DEMO_STUDENTS[l.studentId]!;
      const next = mockState.tutorSessions
        .filter((x) => x.studentId === l.studentId && x.status === "planned" && Date.parse(x.startsAt) > now)
        .sort((a, b) => a.startsAt.localeCompare(b.startsAt))[0];
      return {
        id: l.studentId,
        name: s.name,
        levelCode: s.levelCode,
        levelName: s.levelName,
        status: l.status,
        invitedAt: l.invitedAt,
        openAssignments: mockState.tutorAssignments.filter((a) => a.studentId === l.studentId && !a.doneAt).length,
        nextSessionAt: next?.startsAt ?? null,
      };
    });
});

/** Notes d'un élève suivi ; null si le lien n'est pas actif. */
export const getTutorStudent = cache(async (studentId: string): Promise<TutorStudentView | null> => {
  await connection();
  if (isSupabaseConfigured()) return fetchTutorStudent(studentId);
  ensureSeed();
  const link = mockState.tutorLinks.get(`${DEMO_TUTOR_ID}:${studentId}`);
  const s = DEMO_STUDENTS[studentId];
  if (link?.status !== "active" || !s) return null;
  const [averages, subjects, results] = await Promise.all([getSubjectAverages(), getSubjects(s.levelCode), getRecentResults()]);
  return {
    student: { id: studentId, name: s.name, levelCode: s.levelCode, levelName: s.levelName },
    stats: {
      average20: mockDashboard.stats.average20,
      quizzesTaken: mockDashboard.stats.quizzesTaken,
      chaptersCompleted: mockDashboard.stats.chaptersCompleted,
      chaptersTotal: mockDashboard.stats.chaptersTotal,
    },
    subjects: subjects
      .filter((sub) => averages[sub.code] !== undefined)
      .map((sub) => ({ code: sub.code, name: sub.name, average20: averages[sub.code]!, attempts: 1 })),
    results: results.map((r) => ({ title: r.title, subjectCode: r.subject.code as SubjectCode, score20: r.score20, submittedAt: r.date })),
  };
});

/** Prochains cours en ligne du répétiteur connecté (tous ses élèves, cours annulés exclus). */
export const getUpcomingTutorSessions = cache(async (): Promise<TutorSession[]> => {
  await connection();
  const all = isSupabaseConfigured()
    ? await fetchSessions({ tutorId: (await requireIdentity()).userId })
    : (ensureSeed(), mockState.tutorSessions.filter((s) => s.tutorId === DEMO_TUTOR_ID));
  return upcoming(all, Date.now());
});

// ── Côté famille et commun ──────────────────────────────────────────────────

/** Répétiteurs de mes enfants (parent) ou les miens (élève) : invitations en attente et suivis actifs. */
export const getFamilyTutorLinks = cache(async (): Promise<FamilyTutorLink[]> => {
  await connection();
  if (isSupabaseConfigured()) return fetchFamilyTutorLinks();
  ensureSeed();
  const role = await getCurrentRole();
  if (role !== "parent" && role !== "student") return [];
  const minor = role === "student" ? (await getCurrentStudent()).isMinor : false;
  return [...mockState.tutorLinks.values()]
    .filter((l) => (l.status === "active" || l.status === "pending") && (role === "parent" || l.studentId === DEMO_STUDENT_ID))
    .map((l) => ({
      tutorId: l.tutorId,
      tutorName: DEMO_TUTOR.name,
      headline: DEMO_TUTOR.headline,
      studentId: l.studentId,
      studentName: DEMO_STUDENTS[l.studentId]!.firstName,
      status: l.status,
      invitedAt: l.invitedAt,
      canAnswer: role === "parent" || !minor,
    }));
});

/** Devoirs d'un élève (RLS : son répétiteur, lui-même, ses parents). */
export const getAssignments = cache(async (studentId: string): Promise<TutorAssignment[]> => {
  await connection();
  if (isSupabaseConfigured()) return fetchAssignments(studentId);
  ensureSeed();
  return mockState.tutorAssignments.filter((a) => a.studentId === studentId).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
});

/** Prochains cours en ligne d'un élève (RLS : son répétiteur, lui-même, ses parents). */
export const getUpcomingSessions = cache(async (studentId: string): Promise<TutorSession[]> => {
  await connection();
  const all = isSupabaseConfigured()
    ? await fetchSessions({ studentId })
    : (ensureSeed(), mockState.tutorSessions.filter((s) => s.studentId === studentId));
  return upcoming(all, Date.now());
});

/** Identifiant de l’élève connecté (son espace et ses devoirs). */
export async function getOwnStudentId(): Promise<string> {
  return isSupabaseConfigured() ? (await requireIdentity()).userId : DEMO_STUDENT_ID;
}

/** Cours encore à venir ou en cours (non annulés), du plus proche au plus lointain. */
function upcoming(sessions: TutorSession[], now: number): TutorSession[] {
  return sessions
    .filter((s) => s.status === "planned" && Date.parse(s.startsAt) + s.durationMin * 60_000 > now)
    .sort((a, b) => a.startsAt.localeCompare(b.startsAt));
}
