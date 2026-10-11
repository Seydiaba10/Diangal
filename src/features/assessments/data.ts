import { connection } from "next/server";
import { cache } from "react";
import { chapterHref, findChapterById } from "@/features/curriculum/data";
import { ASSESSMENTS_3E, BEST_SCORES, MOCK_QUESTIONS } from "@/mocks/assessments-3e";
import { SUBJECTS_3E } from "@/mocks/curriculum-3e";
import { mockState } from "@/mocks/progress-store";
import type { Assessment, AssessmentSummary, AttemptResult, AttemptSession, SubjectCode } from "@/types/domain";

// Phase 3 : tables assessments / attempts + RPC start_attempt, get_attempt_review.

function bestScore(assessmentId: string): number | null {
  const scores = [...mockState.attempts.values()]
    .filter((a) => a.assessmentId === assessmentId && a.result)
    .map((a) => a.result!.score20);
  const historical = BEST_SCORES[assessmentId];
  if (historical !== undefined) scores.push(historical);
  return scores.length ? Math.max(...scores) : null;
}

export function toAssessmentSummary(assessment: Assessment, withBestScore: boolean): AssessmentSummary {
  const found = assessment.chapterId ? findChapterById(assessment.chapterId) : undefined;
  return {
    id: assessment.id,
    kind: assessment.kind,
    title: assessment.title,
    subject: SUBJECTS_3E.find((s) => s.code === assessment.subjectCode)!,
    chapterTitle: found?.chapter.title ?? null,
    chapterHref: found ? chapterHref(found.subject, found.chapter) : null,
    durationS: assessment.durationS,
    questionsCount: assessment.questionIds.length,
    isPremium: assessment.isPremium,
    bestScore20: withBestScore ? bestScore(assessment.id) : null,
  };
}

/** Contenu publié de l'évaluation (sans donnée propre à l'élève). */
export async function getAssessment(id: string): Promise<AssessmentSummary | undefined> {
  const assessment = ASSESSMENTS_3E.find((a) => a.id === id);
  return assessment && toAssessmentSummary(assessment, false);
}

export async function getAllAssessmentIds() {
  return ASSESSMENTS_3E.map((a) => ({ id: a.id }));
}

export function totalPoints(assessmentId: string): number {
  const assessment = ASSESSMENTS_3E.find((a) => a.id === assessmentId);
  return (assessment?.questionIds ?? []).reduce((sum, id) => sum + (MOCK_QUESTIONS[id]?.points ?? 0), 0);
}

export const getAssessmentBestScore = cache(async (id: string): Promise<number | null> => {
  await connection();
  return bestScore(id);
});

export const getPracticeAssessments = cache(async (subject?: SubjectCode): Promise<AssessmentSummary[]> => {
  await connection();
  return ASSESSMENTS_3E.filter((a) => !subject || a.subjectCode === subject).map((a) => toAssessmentSummary(a, true));
});

export const getChapterAssessments = cache(async (chapterId: string): Promise<AssessmentSummary[]> => {
  await connection();
  return ASSESSMENTS_3E.filter((a) => a.chapterId === chapterId).map((a) => toAssessmentSummary(a, true));
});

export const getRecommendedAssessments = cache(async (chapterIds: string[]): Promise<AssessmentSummary[]> => {
  await connection();
  return ASSESSMENTS_3E.filter((a) => a.chapterId && chapterIds.includes(a.chapterId)).map((a) =>
    toAssessmentSummary(a, true),
  );
});

/** Tentative en cours, telle qu'envoyée au navigateur : aucune information de correction. */
export const getAttemptSession = cache(async (attemptId: string): Promise<AttemptSession | "submitted" | null> => {
  await connection();
  const attempt = mockState.attempts.get(attemptId);
  if (!attempt) return null;
  if (attempt.status === "submitted") return "submitted";
  const assessment = ASSESSMENTS_3E.find((a) => a.id === attempt.assessmentId)!;
  return {
    id: attempt.id,
    assessment: toAssessmentSummary(assessment, false),
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
  return mockState.attempts.get(attemptId)?.result ?? null;
});

export const getAssessmentsByKind = cache(async (kind: Assessment["kind"]): Promise<AssessmentSummary[]> => {
  await connection();
  return ASSESSMENTS_3E.filter((a) => a.kind === kind).map((a) => toAssessmentSummary(a, true));
});

/** Résultats récents de l'élève (historique fictif + tentatives de la session). */
export const getRecentResults = cache(async () => {
  await connection();
  const fromSession = [...mockState.attempts.values()]
    .filter((a) => a.result)
    .map((a) => ({ id: a.id, title: a.result!.assessment.title, subject: a.result!.assessment.subject, score20: a.result!.score20, date: a.result!.submittedAt }));
  const history = Object.entries(BEST_SCORES).map(([id, score20], i) => {
    const summary = toAssessmentSummary(ASSESSMENTS_3E.find((a) => a.id === id)!, false);
    return { id, title: summary.title, subject: summary.subject, score20, date: `2026-10-0${7 + i}T17:00:00Z` };
  });
  return [...fromSession, ...history].sort((a, b) => b.date.localeCompare(a.date));
});
