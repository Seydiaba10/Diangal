import { connection } from "next/server";
import { cache } from "react";
import { requireIdentity } from "@/features/account/session";
import { chapterHref, findChapterById, getSubjects } from "@/features/curriculum/data";
import { isSupabaseConfigured } from "@/lib/env";
import { ASSESSMENTS_3E, BEST_SCORES, MOCK_QUESTIONS } from "@/mocks/assessments-3e";
import { mockState } from "@/mocks/progress-store";
import type {
  Assessment,
  AssessmentKind,
  AssessmentSummary,
  AttemptResult,
  AttemptSession,
  ExamType,
  Subject,
  SubjectCode,
} from "@/types/domain";
import { fetchAttemptResult, fetchAttemptSession, getSubmittedAttempts, loadAssessmentCatalog } from "./supabase";

// Démo : src/mocks. Supabase : get_assessments_catalog (public) + attempts, start_attempt, get_attempt_review.

/** Évaluation publiée, identique pour tous les élèves. */
export interface AssessmentInfo {
  /** Identifiant public (slug), utilisé dans les URL. */
  id: string;
  /** Identifiant en base (Supabase uniquement). */
  uuid: string | null;
  kind: AssessmentKind;
  title: string;
  subjectCode: SubjectCode;
  /** Classe de l'évaluation (CI, 3E…). */
  levelCode: string;
  chapterId: string | null;
  examType: ExamType | null;
  examYear: number | null;
  durationS: number | null;
  isPremium: boolean;
  questionsCount: number;
  totalPoints: number;
}

function mockInfo(a: Assessment): AssessmentInfo {
  return {
    id: a.id,
    uuid: null,
    kind: a.kind,
    title: a.title,
    subjectCode: a.subjectCode,
    levelCode: a.levelCode,
    chapterId: a.chapterId,
    examType: a.kind === "mock_exam" ? "BFEM" : null,
    examYear: null,
    durationS: a.durationS,
    isPremium: a.isPremium,
    questionsCount: a.questionIds.length,
    totalPoints: a.questionIds.reduce((sum, id) => sum + (MOCK_QUESTIONS[id]?.points ?? 0), 0),
  };
}

export async function getAssessmentCatalog(): Promise<AssessmentInfo[]> {
  if (!isSupabaseConfigured()) return ASSESSMENTS_3E.map(mockInfo);
  return (await loadAssessmentCatalog()).map((a) => ({
    id: a.slug,
    uuid: a.uuid,
    kind: a.kind,
    title: a.title,
    subjectCode: a.subjectCode,
    levelCode: a.levelCode,
    chapterId: a.chapterId,
    examType: a.examType,
    examYear: a.examYear,
    durationS: a.durationS,
    isPremium: a.isPremium,
    questionsCount: a.questionsCount,
    totalPoints: a.totalPoints,
  }));
}

export async function findAssessment(id: string): Promise<AssessmentInfo | undefined> {
  return (await getAssessmentCatalog()).find((a) => a.id === id || a.uuid === id);
}

/** Meilleures notes /20 de l'élève connecté (ou de l'enfant d'un parent), par évaluation. */
const getBestScores = cache(async (studentId?: string): Promise<Map<string, number>> => {
  await connection();
  const best = new Map<string, number>();
  if (!isSupabaseConfigured()) {
    for (const [id, score] of Object.entries(BEST_SCORES)) best.set(id, score);
    for (const attempt of mockState.attempts.values()) {
      if (attempt.result) best.set(attempt.assessmentId, Math.max(best.get(attempt.assessmentId) ?? 0, attempt.result.score20));
    }
    return best;
  }
  const [catalog, attempts] = await Promise.all([
    getAssessmentCatalog(),
    getSubmittedAttempts(studentId ?? (await requireIdentity()).userId),
  ]);
  const slugByUuid = new Map(catalog.map((a) => [a.uuid, a.id]));
  for (const attempt of attempts) {
    const slug = slugByUuid.get(attempt.assessmentUuid);
    if (slug) best.set(slug, Math.max(best.get(slug) ?? 0, attempt.score20));
  }
  return best;
});

function fallbackSubject(code: SubjectCode, levelCode: string): Subject {
  return { code, slug: code.toLowerCase(), name: code, coefficient: 1, levelCode };
}

async function toSummaries(infos: AssessmentInfo[], withBestScore: boolean): Promise<AssessmentSummary[]> {
  const [subjects, best] = await Promise.all([getSubjects(), withBestScore ? getBestScores() : new Map<string, number>()]);
  return Promise.all(
    infos.map(async (a) => {
      const found = a.chapterId ? await findChapterById(a.chapterId) : undefined;
      return {
        id: a.id,
        kind: a.kind,
        title: a.title,
        subject:
          subjects.find((s) => s.code === a.subjectCode && s.levelCode === a.levelCode) ?? fallbackSubject(a.subjectCode, a.levelCode),
        chapterTitle: found?.chapter.title ?? null,
        chapterHref: found ? chapterHref(found.subject, found.chapter) : null,
        durationS: a.durationS,
        questionsCount: a.questionsCount,
        isPremium: a.isPremium,
        bestScore20: withBestScore ? (best.get(a.id) ?? null) : null,
      };
    }),
  );
}

/** Résumé d'une évaluation publiée (sans donnée propre à l'élève, sauf withBestScore). */
export async function getAssessmentSummary(id: string, withBestScore = false): Promise<AssessmentSummary | undefined> {
  const info = await findAssessment(id);
  return info && (await toSummaries([info], withBestScore))[0];
}

/** Contenu publié de l'évaluation (sans donnée propre à l'élève). */
export async function getAssessment(id: string): Promise<AssessmentSummary | undefined> {
  return getAssessmentSummary(id);
}

export async function getAllAssessmentIds() {
  return (await getAssessmentCatalog()).map((a) => ({ id: a.id }));
}

export async function totalPoints(assessmentId: string): Promise<number> {
  return (await findAssessment(assessmentId))?.totalPoints ?? 0;
}

export const getAssessmentBestScore = cache(async (id: string): Promise<number | null> => {
  return (await getBestScores()).get(id) ?? null;
});

/** Exercices et contrôles d'une classe (levelCode), éventuellement d'une seule matière. */
export const getPracticeAssessments = cache(async (levelCode: string, subject?: SubjectCode): Promise<AssessmentSummary[]> => {
  await connection();
  const all = await getAssessmentCatalog();
  return toSummaries(
    all.filter((a) => a.kind !== "past_paper" && a.levelCode === levelCode && (!subject || a.subjectCode === subject)),
    true,
  );
});

export const getChapterAssessments = cache(async (chapterId: string): Promise<AssessmentSummary[]> => {
  await connection();
  return toSummaries((await getAssessmentCatalog()).filter((a) => a.chapterId === chapterId), true);
});

export const getRecommendedAssessments = cache(async (chapterIds: string[]): Promise<AssessmentSummary[]> => {
  await connection();
  return toSummaries((await getAssessmentCatalog()).filter((a) => a.chapterId && chapterIds.includes(a.chapterId)), true);
});

/** Tentative en cours, telle qu'envoyée au navigateur : aucune information de correction. */
export const getAttemptSession = cache(async (attemptId: string): Promise<AttemptSession | "submitted" | null> => {
  await connection();
  if (isSupabaseConfigured()) {
    const remote = await fetchAttemptSession(attemptId);
    if (remote === null || remote === "submitted") return remote;
    const assessment = await getAssessmentSummary(remote.assessmentSlug);
    if (!assessment) return null;
    return {
      id: attemptId,
      assessment,
      startedAt: remote.startedAt,
      deadlineAt: remote.deadlineAt,
      serverNow: remote.serverNow,
      questions: remote.questions,
    };
  }

  const attempt = mockState.attempts.get(attemptId);
  if (!attempt) return null;
  if (attempt.status === "submitted") return "submitted";
  const assessment = ASSESSMENTS_3E.find((a) => a.id === attempt.assessmentId)!;
  return {
    id: attempt.id,
    assessment: (await getAssessmentSummary(assessment.id))!,
    startedAt: new Date(attempt.startedAt).toISOString(),
    deadlineAt: attempt.deadlineAt ? new Date(attempt.deadlineAt).toISOString() : null,
    serverNow: Date.now(),
    questions: assessment.questionIds.map((qid) => {
      const q = MOCK_QUESTIONS[qid]!;
      const order = attempt.optionOrder[qid] ?? q.options.map((o) => o.id);
      return {
        id: q.id,
        type: q.type,
        promptHtml: q.promptHtml,
        points: q.points,
        options: order.map((oid) => q.options.find((o) => o.id === oid)!),
      };
    }),
  };
});

export const getAttemptResult = cache(async (attemptId: string): Promise<AttemptResult | null> => {
  await connection();
  if (!isSupabaseConfigured()) return mockState.attempts.get(attemptId)?.result ?? null;

  const remote = await fetchAttemptResult(attemptId);
  if (!remote) return null;
  const assessment = await getAssessmentSummary(remote.assessmentUuid);
  if (!assessment) return null;
  const elapsed = Math.round((Date.parse(remote.submittedAt) - Date.parse(remote.startedAt)) / 1000);
  return {
    id: attemptId,
    assessment,
    score: remote.score,
    maxScore: remote.maxScore,
    score20: remote.score20,
    correctCount: remote.questions.filter((q) => q.isCorrect).length,
    durationS: assessment.durationS ? Math.min(Math.max(elapsed, 0), assessment.durationS) : Math.max(elapsed, 0),
    submittedAt: remote.submittedAt,
    late: remote.late,
    questions: remote.questions,
  };
});

export const getAssessmentsByKind = cache(async (kind: AssessmentKind): Promise<AssessmentSummary[]> => {
  await connection();
  return toSummaries((await getAssessmentCatalog()).filter((a) => a.kind === kind), true);
});

export interface RecentResult {
  id: string;
  title: string;
  subject: Subject;
  score20: number;
  date: string;
}

/** Dernières copies corrigées de l'élève (ou de l'enfant d'un parent). */
export const getRecentResults = cache(async (studentId?: string): Promise<RecentResult[]> => {
  await connection();
  if (isSupabaseConfigured()) {
    const [attempts, catalog] = await Promise.all([
      getSubmittedAttempts(studentId ?? (await requireIdentity()).userId),
      getAssessmentCatalog(),
    ]);
    const byUuid = new Map(catalog.map((a) => [a.uuid, a]));
    const results = await Promise.all(
      attempts.slice(0, 12).map(async (attempt) => {
        const info = byUuid.get(attempt.assessmentUuid);
        const summary = info && (await getAssessmentSummary(info.id));
        return summary
          ? { id: attempt.id, title: summary.title, subject: summary.subject, score20: attempt.score20, date: attempt.submittedAt }
          : null;
      }),
    );
    return results.filter((r): r is RecentResult => r !== null);
  }

  const fromSession = [...mockState.attempts.values()]
    .filter((a) => a.result)
    .map((a) => ({
      id: a.id,
      title: a.result!.assessment.title,
      subject: a.result!.assessment.subject,
      score20: a.result!.score20,
      date: a.result!.submittedAt,
    }));
  const history = await Promise.all(
    Object.entries(BEST_SCORES).map(async ([id, score20], i) => {
      const summary = (await getAssessmentSummary(id))!;
      return { id, title: summary.title, subject: summary.subject, score20, date: `2026-10-0${7 + i}T17:00:00Z` };
    }),
  );
  return [...fromSession, ...history].sort((a, b) => b.date.localeCompare(a.date));
});
