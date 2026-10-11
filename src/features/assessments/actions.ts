"use server";

import { notFound, redirect } from "next/navigation";
import { getCurrentStudent } from "@/features/account/data";
import { gradeAnswer, toScore20 } from "@/lib/grading";
import { ANSWER_KEYS } from "@/mocks/answer-keys-3e";
import { ASSESSMENTS_3E, MOCK_QUESTIONS } from "@/mocks/assessments-3e";
import { mockState } from "@/mocks/progress-store";
import type { AnswerMap, AnswerValue, QuestionReview } from "@/types/domain";
import { toAssessmentSummary } from "./data";

/** Une soumission reçue jusqu'à 60 s après la limite reste « à l'heure » (latence réseau). */
const GRACE_MS = 60_000;
const MAX_TEXT_LENGTH = 200;

// Mélange déterministe (graine = id de tentative) pour que l'ordre reste stable.
function seededShuffle<T>(items: T[], seed: string): T[] {
  let h = 2166136261;
  for (const ch of seed) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    const j = Math.abs(h) % (i + 1);
    [out[i], out[j]] = [out[j]!, out[i]!];
  }
  return out;
}

/** Phase 3 : RPC start_attempt (vérifie le premium et fixe la date limite côté serveur). */
export async function startAttemptAction(assessmentId: string) {
  const assessment = ASSESSMENTS_3E.find((a) => a.id === assessmentId);
  if (!assessment) notFound();

  const student = await getCurrentStudent();
  if (assessment.isPremium && !student.isPremium) redirect("/eleve/abonnement");

  const id = crypto.randomUUID();
  const now = Date.now();
  const optionOrder = Object.fromEntries(
    assessment.questionIds.map((qid) => {
      const q = MOCK_QUESTIONS[qid]!;
      const ids = q.options.map((o) => o.id);
      return [qid, q.type === "true_false" ? ids : seededShuffle(ids, `${id}:${qid}`)];
    }),
  );

  mockState.attempts.set(id, {
    id,
    assessmentId,
    startedAt: now,
    deadlineAt: assessment.durationS ? now + assessment.durationS * 1000 : null,
    optionOrder,
    status: "in_progress",
  });
  redirect(`/eleve/tentatives/${id}`);
}

function sanitizeAnswer(value: unknown): AnswerValue | null {
  if (typeof value === "string") return value.slice(0, MAX_TEXT_LENGTH);
  if (Array.isArray(value) && value.every((v) => typeof v === "string")) return value.slice(0, 10);
  return null;
}

export type SubmitAttemptResult = { ok: true } | { ok: false; error: "not_found" };

/**
 * Phase 3 : RPC submit_attempt (correction avec private.answer_keys, idempotente).
 * Renvoie un statut au lieu de rediriger : le lecteur distingue ainsi une erreur réseau.
 */
export async function submitAttemptAction(attemptId: string, answers: AnswerMap): Promise<SubmitAttemptResult> {
  const attempt = mockState.attempts.get(attemptId);
  if (!attempt) return { ok: false, error: "not_found" };
  if (attempt.status === "submitted") return { ok: true };

  const assessment = ASSESSMENTS_3E.find((a) => a.id === attempt.assessmentId)!;
  const now = Date.now();

  const questions: QuestionReview[] = assessment.questionIds.map((qid) => {
    const q = MOCK_QUESTIONS[qid]!;
    const key = ANSWER_KEYS[qid] ?? {};
    const response = sanitizeAnswer(answers?.[qid]);
    const outcome = gradeAnswer(q.type, key, response, q.points);
    const order = attempt.optionOrder[qid] ?? q.options.map((o) => o.id);
    return {
      id: q.id,
      type: q.type,
      promptHtml: q.promptHtml,
      points: q.points,
      options: order.map((oid) => q.options.find((o) => o.id === oid)!),
      response,
      isCorrect: outcome.isCorrect,
      pointsAwarded: outcome.pointsAwarded,
      correctOptionIds: key.correctOptionIds ?? [],
      expectedAnswer: key.expectedAnswer ?? null,
      explanationHtml: q.explanationHtml,
    };
  });

  const score = questions.reduce((sum, q) => sum + q.pointsAwarded, 0);
  const maxScore = questions.reduce((sum, q) => sum + q.points, 0);

  attempt.status = "submitted";
  attempt.result = {
    id: attempt.id,
    assessment: toAssessmentSummary(assessment, false),
    score,
    maxScore,
    score20: toScore20(score, maxScore),
    correctCount: questions.filter((q) => q.isCorrect).length,
    durationS: Math.round(((attempt.deadlineAt ? Math.min(now, attempt.deadlineAt) : now) - attempt.startedAt) / 1000),
    submittedAt: new Date(now).toISOString(),
    late: attempt.deadlineAt !== null && now > attempt.deadlineAt + GRACE_MS,
    questions,
  };
  return { ok: true };
}
