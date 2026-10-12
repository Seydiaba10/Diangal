import { connection } from "next/server";
import { cache } from "react";
import { getCurrentStudent, getStudentSummaryFor } from "@/features/account/data";
import { requireIdentity } from "@/features/account/session";
import { getAssessmentCatalog } from "@/features/assessments/data";
import { getSubmittedAttempts } from "@/features/assessments/supabase";
import { chapterHref, findChapterById, getChapters, getSubjects } from "@/features/curriculum/data";
import { getLessonProgressRows } from "@/features/curriculum/supabase";
import { getNextExamFor } from "@/features/exams/data";
import { isSupabaseConfigured } from "@/lib/env";
import { mockDashboard } from "@/mocks/student-3e";
import type { Chapter, ContinueItem, StudentDashboard, Subject, WeakPoint } from "@/types/domain";
import { fetchDashboard } from "./supabase";

/** Chapitres à reprendre : commencés, du plus récent au plus ancien ; à défaut, les premiers de chaque matière. */
async function continueLearningFor(studentId: string, levelCode: string): Promise<ContinueItem[]> {
  const [rows, subjects] = await Promise.all([getLessonProgressRows(studentId), getSubjects(levelCode)]);
  const done = new Set(rows.filter((r) => r.completed).map((r) => r.lessonId));
  const touched = new Map(rows.map((r) => [r.lessonId, r.updatedAt]));
  const chapters = (await Promise.all(subjects.map(async (s) => (await getChapters(s)).map((c) => [s, c] as const)))).flat();

  const toItem = (subject: Subject, chapter: Chapter): ContinueItem => {
    const lessonsDone = chapter.lessons.filter((l) => done.has(l.id)).length;
    const total = chapter.lessons.length;
    const next = chapter.lessons.find((l) => !done.has(l.id));
    return {
      chapterId: chapter.id,
      subject: subject.code,
      subjectName: subject.name,
      chapterTitle: chapter.title,
      status: lessonsDone === 0 ? "not_started" : lessonsDone >= total ? "completed" : "in_progress",
      isPremium: chapter.lessons.some((l) => l.isPremium),
      progressPct: total ? Math.round((lessonsDone / total) * 100) : 0,
      lessonsDone,
      lessonsTotal: total,
      nextLessonTitle: next?.title ?? "",
      href: chapterHref(subject, chapter),
    };
  };
  const lastTouch = (chapter: Chapter) =>
    chapter.lessons.reduce((latest, l) => ((touched.get(l.id) ?? "") > latest ? touched.get(l.id)! : latest), "");

  const started = chapters
    .filter(([, c]) => {
      const n = c.lessons.filter((l) => done.has(l.id)).length;
      return n > 0 && n < c.lessons.length;
    })
    .sort(([, a], [, b]) => lastTouch(b).localeCompare(lastTouch(a)))
    .map(([s, c]) => toItem(s, c));
  if (started.length >= 4) return started.slice(0, 4);

  // Nouveaux élèves : premier chapitre non commencé des premières matières.
  const fresh = subjects
    .map((s) => chapters.find(([cs, c]) => cs.slug === s.slug && c.lessons.every((l) => !done.has(l.id))))
    .filter((pair): pair is (typeof chapters)[number] => pair !== undefined)
    .map(([s, c]) => toItem(s, c));
  return [...started, ...fresh].slice(0, 4);
}

/** Lien de chaque point faible : relire le cours, s'entraîner ou repasser le contrôle du chapitre. */
async function weakPointsWithLinks(raw: NonNullable<Awaited<ReturnType<typeof fetchDashboard>>>["weakPoints"]) {
  const assessments = await getAssessmentCatalog();
  return Promise.all(
    raw.map(async (w): Promise<WeakPoint> => {
      const found = await findChapterById(w.chapterId);
      const base = found ? chapterHref(found.subject, found.chapter) : "/eleve/cours";
      const exercise = assessments.find((a) => a.chapterId === w.chapterId && a.kind === "exercise");
      const quiz = assessments.find((a) => a.chapterId === w.chapterId && a.kind === "quiz");
      const href =
        w.action === "practice" && exercise
          ? `/eleve/evaluations/${exercise.id}`
          : w.action === "retake_quiz" && quiz
            ? `/eleve/evaluations/${quiz.id}`
            : base;
      return { ...w, href };
    }),
  );
}

/**
 * Tableau de bord de l'élève connecté, ou d'un enfant pour son parent (studentId).
 * Supabase : RPC get_student_dashboard (un seul appel) + catalogue mis en cache.
 */
export const getStudentDashboard = cache(async (studentId?: string): Promise<StudentDashboard> => {
  await connection(); // donnée propre à l'élève et compte à rebours relatif à aujourd'hui
  if (!isSupabaseConfigured()) {
    const student = await getCurrentStudent();
    return { ...mockDashboard, student, nextExam: await getNextExamFor(student.levelCode) };
  }

  const id = studentId ?? (await requireIdentity()).userId;
  const [student, dashboard] = await Promise.all([studentId ? getStudentSummaryFor(studentId) : getCurrentStudent(), fetchDashboard(id)]);
  if (!student || !dashboard) throw new Error("tableau de bord indisponible");
  return {
    student,
    stats: dashboard.stats,
    // Chapitres de sa classe (aucun si son programme n'est pas encore publié).
    continueLearning: await continueLearningFor(id, student.levelCode),
    weakPoints: await weakPointsWithLinks(dashboard.weakPoints),
    nextExam: dashboard.nextExam,
  };
});

/** Moyenne /20 par matière (démo : fictive ; Supabase : moyenne des copies corrigées). */
const SUBJECT_AVERAGES: Record<string, number> = { MATH: 12.1, FR: 11.5, ANG: 15, HG: 14.2, SVT: 12.8, PC: 13.9, EC: 16 };

export async function getSubjectAverages(studentId?: string): Promise<Record<string, number>> {
  if (!isSupabaseConfigured()) return SUBJECT_AVERAGES;
  const [attempts, catalog] = await Promise.all([
    getSubmittedAttempts(studentId ?? (await requireIdentity()).userId),
    getAssessmentCatalog(),
  ]);
  const subjectOf = new Map(catalog.map((a) => [a.uuid, a.subjectCode]));
  const sums = new Map<string, { total: number; n: number }>();
  for (const attempt of attempts) {
    const code = subjectOf.get(attempt.assessmentUuid);
    if (!code) continue;
    const s = sums.get(code) ?? { total: 0, n: 0 };
    sums.set(code, { total: s.total + attempt.score20, n: s.n + 1 });
  }
  return Object.fromEntries([...sums].map(([code, s]) => [code, Math.round((s.total / s.n) * 10) / 10]));
}
