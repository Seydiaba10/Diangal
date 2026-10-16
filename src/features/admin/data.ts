import "server-only";

import { getTranslations } from "next-intl/server";
import { connection } from "next/server";
import { cache } from "react";
import { getAssessmentCatalog } from "@/features/assessments/data";
import { findLessonById, getSubjects } from "@/features/curriculum/data";
import { getAllPayments } from "@/features/payments/data";
import { getTutorReviewQueue } from "@/features/tutors/data";
import { isSupabaseConfigured } from "@/lib/env";
import { DEFAULT_FREE_CHAPTERS } from "@/lib/free-tier";
import { normalizeText } from "@/lib/grading";
import { SUBJECT_STYLES } from "@/lib/subjects";
import { ADMIN_USERS, REPORTS, SIGNUPS_LAST_7_DAYS } from "@/mocks/admin";
import { CATALOG_ANSWER_KEYS } from "@/mocks/answer-keys";
import { CATALOG_ASSESSMENTS, CATALOG_QUESTIONS } from "@/mocks/assessments";
import { CATALOG_CHAPTERS, CATALOG_LESSON_BODIES, CATALOG_SUBJECTS, chapterSources } from "@/mocks/curriculum";
import { genericLessonBody } from "@/mocks/lesson-content";
import { mockState } from "@/mocks/progress-store";
import type {
  AdminChapterRow,
  AdminProgram,
  AdminStats,
  AdminSubjectOption,
  AdminUserRow,
  AuditEntry,
  Chapter,
  ContentTrackingRow,
  ContentVerification,
  PaymentChannel,
  PublishStatus,
  ReportRow,
  SubjectCode,
} from "@/types/domain";
import {
  fetchAdminAssessment,
  fetchAdminChapter,
  fetchAdminLessonContext,
  fetchAdminProgram,
  fetchAdminPrograms,
  fetchAdminStats,
  fetchAdminUsers,
  fetchAuditLog,
  fetchContentTracking,
  fetchFreeTierEnabled,
  fetchLessonBody,
  fetchReports,
  fetchSubjectOptions,
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

// ── Référentiel et contenus ──────────────────────────────────────────────────
// Démo : le catalogue de src/mocks, tout publié et « à vérifier ». Supabase : brouillons compris.

function mockWritten(lessonId: string) {
  return lessonId in CATALOG_LESSON_BODIES || mockState.lessonBodyOverrides.has(lessonId);
}

function mockChapter(chapter: Chapter): AdminChapterRow {
  return {
    id: chapter.id,
    number: chapter.number,
    slug: chapter.slug,
    title: chapter.title,
    summary: chapter.summary,
    strand: chapter.strand ?? null,
    status: "published",
    verification: "unverified",
    sources: chapterSources(chapter),
    lessons: chapter.lessons.map((l) => ({ id: l.id, number: l.number, title: l.title, status: "published", written: mockWritten(l.id) })),
  };
}

function mockPrograms(): AdminProgram[] {
  return CATALOG_SUBJECTS.map((s) => ({
    id: s.slug,
    levelCode: s.levelCode,
    seriesCode: s.seriesCode ?? null,
    subjectCode: s.code,
    subjectName: s.name,
    freeChapters: DEFAULT_FREE_CHAPTERS,
    chapters: CATALOG_CHAPTERS.filter(
      (c) => c.subjectCode === s.code && c.levelCode === s.levelCode && (c.seriesCode ?? null) === (s.seriesCode ?? null),
    ).map(mockChapter),
  }));
}

/** Tableau de suivi : une ligne par programme, de la classe la plus petite à la Terminale. */
export const getContentTracking = cache(async (): Promise<ContentTrackingRow[]> => {
  await connection();
  if (isSupabaseConfigured()) return fetchContentTracking();
  const assessments = await getAssessmentCatalog();
  return mockPrograms().map((p) => {
    const own = assessments.filter((a) => a.subjectCode === p.subjectCode && a.levelCode === p.levelCode);
    const lessons = p.chapters.flatMap((c) => c.lessons);
    const count = (verification: ContentVerification) => p.chapters.filter((c) => c.verification === verification).length;
    return {
      programId: p.id,
      levelCode: p.levelCode,
      seriesCode: p.seriesCode,
      subjectCode: p.subjectCode,
      subjectName: p.subjectName,
      freeChapters: p.freeChapters,
      chapters: p.chapters.length,
      chaptersPublished: p.chapters.filter((c) => c.status === "published").length,
      lessons: lessons.length,
      lessonsWritten: lessons.filter((l) => l.written).length,
      exercises: own.filter((a) => a.kind === "exercise").length,
      quizzes: own.filter((a) => a.kind === "quiz").length,
      exams: own.filter((a) => a.kind === "mock_exam" || a.kind === "past_paper").length,
      questions: own.reduce((sum, a) => sum + a.questionsCount, 0),
      chaptersUnverified: count("unverified"),
      chaptersReviewed: count("reviewed"),
      chaptersOfficial: count("official"),
      sourcedChapters: p.chapters.filter((c) => c.sources.length > 0).length,
    };
  });
});

/** Programmes d'une classe, avec chapitres et leçons (brouillons compris sur la base). */
export const getAdminPrograms = cache(async (levelCode: string): Promise<AdminProgram[]> => {
  await connection();
  if (isSupabaseConfigured()) return fetchAdminPrograms(levelCode);
  return mockPrograms().filter((p) => p.levelCode === levelCode);
});

export const getAdminProgram = cache(async (programId: string): Promise<AdminProgram | null> => {
  await connection();
  if (isSupabaseConfigured()) return fetchAdminProgram(programId);
  const program = mockPrograms().find((p) => p.id === programId);
  return program ? { ...program, chapters: [] } : null;
});

export const getAdminChapter = cache(async (chapterId: string) => {
  await connection();
  if (isSupabaseConfigured()) return fetchAdminChapter(chapterId);
  for (const program of mockPrograms()) {
    const chapter = program.chapters.find((c) => c.id === chapterId);
    if (chapter) return { program: { ...program, chapters: [] }, chapter };
  }
  return null;
});

/** Offre gratuite appliquée ? Démo : toujours (les accès des mocks suivent la règle). */
export const getFreeTierEnabled = cache(async (): Promise<boolean> => {
  await connection();
  return isSupabaseConfigured() ? fetchFreeTierEnabled() : true;
});

/** Matières du référentiel (pour les ajouter à une classe). */
export const getSubjectOptions = cache(async (): Promise<AdminSubjectOption[]> => {
  await connection();
  if (isSupabaseConfigured()) return fetchSubjectOptions();
  const names = await getTranslations("subjects");
  return (Object.keys(SUBJECT_STYLES) as SubjectCode[])
    .map((code) => ({ id: code, code, name: names(code) }))
    .sort((a, b) => a.name.localeCompare(b.name, "fr"));
});

/** Leçon à modifier, avec son chapitre et sa matière (brouillon compris sur la base). */
export const getAdminLesson = cache(async (lessonId: string) => {
  await connection();
  if (isSupabaseConfigured()) {
    const [context, body] = await Promise.all([fetchAdminLessonContext(lessonId), fetchLessonBody(lessonId)]);
    return context ? { ...context, body: body ?? "" } : null;
  }
  const found = await findLessonById(lessonId);
  if (!found) return null;
  const { subject, chapter, lesson } = found;
  return {
    lesson: { id: lesson.id, title: lesson.title, status: "published" as PublishStatus },
    chapter: { id: chapter.id, title: chapter.title },
    subjectName: subject.name,
    levelCode: subject.levelCode,
    body: mockState.lessonBodyOverrides.get(lessonId) ?? CATALOG_LESSON_BODIES[lessonId] ?? genericLessonBody(lesson.title, chapter.title),
  };
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
  const mock = CATALOG_ASSESSMENTS.find((a) => a.id === id)!;
  return {
    assessment,
    questions: mock.questionIds.map((qid) => ({ question: CATALOG_QUESTIONS[qid]!, key: CATALOG_ANSWER_KEYS[qid] ?? {} })),
  };
}
