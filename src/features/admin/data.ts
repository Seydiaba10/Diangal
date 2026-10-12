import "server-only";

import { connection } from "next/server";
import { cache } from "react";
import { getAssessmentCatalog } from "@/features/assessments/data";
import { findLessonById, getChapters, getSubjects } from "@/features/curriculum/data";
import { getAllPayments } from "@/features/payments/data";
import { getTutorReviewQueue } from "@/features/tutors/data";
import { isSupabaseConfigured } from "@/lib/env";
import { normalizeText } from "@/lib/grading";
import { ADMIN_USERS, REPORTS, SIGNUPS_LAST_7_DAYS } from "@/mocks/admin";
import { ANSWER_KEYS } from "@/mocks/answer-keys-3e";
import { ASSESSMENTS_3E, MOCK_QUESTIONS } from "@/mocks/assessments-3e";
import { genericLessonBody, LESSON_BODIES } from "@/mocks/lesson-content";
import { mockState } from "@/mocks/progress-store";
import type { AdminStats, AdminUserRow, AuditEntry, PaymentChannel, ReportRow } from "@/types/domain";
import {
  fetchAdminAssessment,
  fetchAdminStats,
  fetchAdminUsers,
  fetchAuditLog,
  fetchLessonBody,
  fetchReports,
  fetchWrittenLessonIds,
  type AdminQuestion,
} from "./supabase";

// Démo : chiffres fictifs. Supabase : lectures sous RLS admin (rôle admin + double authentification).

const CHANNELS: PaymentChannel[] = ["wave", "orange_money", "free_money", "card"];

export const getAdminStats = cache(async (): Promise<AdminStats> => {
  await connection();
  if (isSupabaseConfigured()) return fetchAdminStats();
  const [payments, queue] = await Promise.all([getAllPayments(), getTutorReviewQueue()]);
  const succeeded = payments.filter((p) => p.status === "succeeded");
  const today = new Date();
  return {
    students: 1284,
    parents: 412,
    tutorsApproved: queue.filter((t) => t.status === "approved").length,
    tutorsPending: queue.filter((t) => t.status === "pending").length,
    premiumStudents: 187 + mockState.premiumUntil.size,
    revenueMonthFcfa: succeeded.reduce((sum, p) => sum + p.amountFcfa, 0),
    quizzesThisWeek: 2316 + mockState.attempts.size,
    reportsOpen: REPORTS.filter((r) => !mockState.handledReports.has(r.id)).length,
    signupsByDay: SIGNUPS_LAST_7_DAYS.map((count, i) => {
      const day = new Date(today.getTime() - (SIGNUPS_LAST_7_DAYS.length - 1 - i) * 86_400_000);
      return { day: day.toISOString().slice(0, 10), count };
    }),
    revenueByChannel: CHANNELS.map((channel) => ({
      channel,
      amountFcfa: succeeded.filter((p) => p.channel === channel).reduce((sum, p) => sum + p.amountFcfa, 0),
    })),
  };
});

export const getAdminUsers = cache(async (query: string): Promise<AdminUserRow[]> => {
  await connection();
  if (isSupabaseConfigured()) return fetchAdminUsers(query);
  const needle = normalizeText(query);
  return ADMIN_USERS.map(
    (u): AdminUserRow => (u.id === "eleve-awa" ? { ...u, consentStatus: mockState.consentGranted ? "granted" : "pending" } : u),
  ).filter((u) => !needle || normalizeText(`${u.name} ${u.city}`).includes(needle));
});

export const getReports = cache(async (): Promise<ReportRow[]> => {
  await connection();
  if (isSupabaseConfigured()) return fetchReports();
  return REPORTS.map((r) => (mockState.handledReports.has(r.id) ? { ...r, status: "handled" } : r));
});

const SEED_AUDIT: AuditEntry[] = [
  { id: "a1", actorName: "Ibrahima Sy", action: "répétiteur approuvé", target: "Mamadou Diallo", createdAt: "2026-09-02T10:00:00Z" },
  { id: "a2", actorName: "Ibrahima Sy", action: "chapitre publié", target: "Théorème de Thalès (3e)", createdAt: "2026-09-10T15:20:00Z" },
  { id: "a3", actorName: "Ibrahima Sy", action: "consultation des pièces", target: "Awa Kane", createdAt: "2026-10-05T09:30:00Z" },
];

export const getAuditLog = cache(async (): Promise<AuditEntry[]> => {
  await connection();
  if (isSupabaseConfigured()) return fetchAuditLog();
  return [...mockState.auditLog, ...SEED_AUDIT];
});

export async function getContentOverview() {
  await connection();
  const [subjects, written] = await Promise.all([
    getSubjects(),
    isSupabaseConfigured() ? fetchWrittenLessonIds() : Promise.resolve(new Set(Object.keys(LESSON_BODIES))),
  ]);
  return Promise.all(
    subjects.map(async (subject) => ({
      subject,
      chapters: (await getChapters(subject)).map((c) => ({
        id: c.id,
        number: c.number,
        title: c.title,
        lessons: c.lessons.map((l) => ({ id: l.id, title: l.title, isPremium: l.isPremium, written: written.has(l.id) })),
      })),
    })),
  );
}

export const getAdminLesson = cache(async (lessonId: string) => {
  await connection();
  const found = await findLessonById(lessonId);
  if (!found) return null;
  const { subject, chapter, lesson } = found;
  const body = isSupabaseConfigured()
    ? ((await fetchLessonBody(lessonId)) ?? "")
    : (mockState.lessonBodyOverrides.get(lessonId) ?? LESSON_BODIES[lessonId] ?? genericLessonBody(lesson.title, chapter.title));
  return { subject, chapter, lesson, body };
});

export async function getAdminAssessments() {
  const [catalog, subjects] = await Promise.all([getAssessmentCatalog(), getSubjects()]);
  return catalog.map((a) => ({
    ...a,
    subjectName: subjects.find((s) => s.code === a.subjectCode && s.levelCode === a.levelCode)?.name ?? a.subjectCode,
    points: a.totalPoints,
  }));
}

/** Questions avec leur corrigé : réservé à l'admin (private.answer_keys via une fonction dédiée). */
export async function getAdminAssessment(id: string) {
  await connection();
  const assessment = (await getAdminAssessments()).find((a) => a.id === id);
  if (!assessment) return null;
  if (isSupabaseConfigured()) {
    const questions: AdminQuestion[] | null = await fetchAdminAssessment(assessment.uuid!);
    return questions ? { assessment, questions } : null;
  }
  const mock = ASSESSMENTS_3E.find((a) => a.id === id)!;
  return {
    assessment,
    questions: mock.questionIds.map((qid) => ({ question: MOCK_QUESTIONS[qid]!, key: ANSWER_KEYS[qid] ?? {} })),
  };
}
