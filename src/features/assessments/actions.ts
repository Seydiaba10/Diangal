"use server";

import { notFound, redirect } from "next/navigation";
import { getCurrentStudent } from "@/features/account/data";
import { getChapters, getSubject } from "@/features/curriculum/data";
import { browsableLevels } from "@/features/schooling/class-navigation";
import { isSupabaseConfigured } from "@/lib/env";
import { gradeAnswer, toScore20 } from "@/lib/grading";
import type { LevelCode } from "@/lib/levels";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { CATALOG_ANSWER_KEYS } from "@/mocks/answer-keys";
import { CATALOG_QUESTIONS } from "@/mocks/assessments";
import { mockState } from "@/mocks/progress-store";
import type { AnswerMap, AnswerValue, Assessment, QuestionReview } from "@/types/domain";
import { findAssessment, findMockAssessment, getAnyAssessmentSummary, mockQuestionsOfChapters } from "./data";

/** Une soumission reçue jusqu'à 60 s après la limite reste « à l'heure » (latence réseau). */
const GRACE_MS = 60_000;
const MAX_TEXT_LENGTH = 200;
/** « Préparer mon prochain devoir » : nombres de questions proposés, 1 min 30 par question en mode chronométré. */
const PRACTICE_COUNTS = [5, 10, 15, 20];
const SECONDS_PER_QUESTION = 90;

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

/** Démo : ouvre une tentative (ordre des options figé, date limite fixée maintenant). */
function startMockAttempt(assessment: Assessment): never {
  const id = crypto.randomUUID();
  const now = Date.now();
  const optionOrder = Object.fromEntries(
    assessment.questionIds.map((qid) => {
      const q = CATALOG_QUESTIONS[qid]!;
      const ids = q.options.map((o) => o.id);
      return [qid, q.type === "true_false" ? ids : seededShuffle(ids, `${id}:${qid}`)];
    }),
  );
  mockState.attempts.set(id, {
    id,
    assessmentId: assessment.id,
    startedAt: now,
    deadlineAt: assessment.durationS ? now + assessment.durationS * 1000 : null,
    optionOrder,
    status: "in_progress",
  });
  redirect(`/eleve/tentatives/${id}`);
}

/**
 * Démarre un contrôle. Supabase : RPC start_attempt (vérifie le Premium et fixe la date
 * limite côté serveur), puis ouverture du lecteur.
 */
export async function startAttemptAction(assessmentId: string) {
  const info = await findAssessment(assessmentId);
  if (!info) notFound();

  if (isSupabaseConfigured()) {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.rpc("start_attempt", { p_assessment: info.uuid! });
    if (error?.message.includes("premium_required")) redirect("/eleve/abonnement");
    if (error || !data) redirect(`/eleve/evaluations/${info.id}?erreur=demarrage`);
    redirect(`/eleve/tentatives/${(data as { attempt_id: string }).attempt_id}`);
  }

  const assessment = findMockAssessment(info.id)!;
  const student = await getCurrentStudent();
  if (assessment.isPremium && !student.isPremium) redirect("/eleve/abonnement");
  startMockAttempt(assessment);
}

/**
 * « Préparer mon prochain devoir » : questions tirées au hasard dans les chapitres choisis
 * d'une matière, avec ou sans chronomètre. Supabase : RPC create_practice_session (contrôle de
 * la classe et du Premium côté serveur), puis start_attempt.
 */
export async function createPracticeSessionAction(formData: FormData) {
  const subjectSlug = String(formData.get("subject") ?? "");
  const chapterIds = [...new Set(formData.getAll("chapters").map(String))].slice(0, 20);
  const count = Number(formData.get("count"));
  const timed = formData.get("mode") === "chrono";
  // Retour sur la même classe (classe précédente ouverte en révision, s'il y a lieu).
  const classe = String(formData.get("classe") ?? "").slice(0, 8);
  const serie = String(formData.get("serie") ?? "").slice(0, 8);
  const back = `/eleve/exercices/preparer?${new URLSearchParams({ matiere: subjectSlug, ...(classe ? { classe } : {}), ...(serie ? { serie } : {}) })}`;
  if (!chapterIds.length) redirect(`${back}&erreur=chapitres`);
  if (!PRACTICE_COUNTS.includes(count)) redirect(`${back}&erreur=nombre`);

  if (isSupabaseConfigured()) {
    const supabase = await createSupabaseServerClient();
    const { data: assessmentId, error } = await supabase.rpc("create_practice_session", {
      p_chapters: chapterIds,
      p_count: count,
      p_timed: timed,
    });
    if (error?.message.includes("premium_required")) redirect("/eleve/abonnement");
    if (error?.message.includes("too_many_sessions")) redirect(`${back}&erreur=limite`);
    if (error || !assessmentId) redirect(`${back}&erreur=chapitres`);
    const { data, error: startError } = await supabase.rpc("start_attempt", { p_assessment: assessmentId });
    if (startError || !data) redirect(`${back}&erreur=chapitres`);
    redirect(`/eleve/tentatives/${(data as { attempt_id: string }).attempt_id}`);
  }

  // Démo : mêmes contrôles que la fonction SQL (matière de la classe de l'élève ou d'une classe
  // précédente, chapitres Premium).
  const student = await getCurrentStudent();
  const candidate = await getSubject(subjectSlug);
  const allowed =
    candidate &&
    (candidate.levelCode === student.levelCode
      ? !candidate.seriesCode || candidate.seriesCode === student.seriesCode
      : browsableLevels(student.levelCode).includes(candidate.levelCode as LevelCode));
  const subject = allowed ? candidate : undefined;
  const chapters = subject ? (await getChapters(subject)).filter((c) => chapterIds.includes(c.id)) : [];
  if (!subject || chapters.length !== chapterIds.length) redirect(`${back}&erreur=chapitres`);
  if (chapters.some((c) => c.lessons.some((l) => l.isPremium)) && !student.isPremium) redirect("/eleve/abonnement");
  const pool = mockQuestionsOfChapters(chapterIds);
  if (!pool.length) redirect(`${back}&erreur=chapitres`);
  const picked = seededShuffle(pool, crypto.randomUUID()).slice(0, count);
  const session: Assessment & { createdAt: string } = {
    id: `devoir-${crypto.randomUUID().replace(/-/g, "")}`,
    kind: "exercise",
    title: "Préparer mon prochain devoir",
    subjectCode: subject.code,
    levelCode: subject.levelCode,
    chapterId: null,
    durationS: timed ? Math.max(60, picked.length * SECONDS_PER_QUESTION) : null,
    isPremium: false,
    questionIds: picked,
    createdAt: new Date().toISOString(),
  };
  mockState.practiceSessions.set(session.id, session);
  startMockAttempt(session);
}

function sanitizeAnswer(value: unknown): AnswerValue | null {
  if (typeof value === "string") return value.slice(0, MAX_TEXT_LENGTH);
  if (Array.isArray(value) && value.every((v) => typeof v === "string")) return value.slice(0, 10);
  return null;
}

export type SubmitAttemptResult = { ok: true } | { ok: false; error: "not_found" };

/**
 * Envoi de la copie. Supabase : RPC submit_attempt (correction avec les corrigés privés,
 * idempotente). Renvoie un statut au lieu de rediriger : le lecteur distingue ainsi une erreur réseau.
 */
export async function submitAttemptAction(attemptId: string, answers: AnswerMap): Promise<SubmitAttemptResult> {
  if (isSupabaseConfigured()) {
    const clean = Object.fromEntries(
      Object.entries(answers ?? {})
        .slice(0, 100)
        .map(([questionId, value]) => [questionId, sanitizeAnswer(value)] as const)
        .filter(([, value]) => value !== null),
    );
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.rpc("submit_attempt", {
      p_attempt: attemptId,
      p_answers: clean,
      p_client_submitted_at: new Date().toISOString(),
    });
    return error ? { ok: false, error: "not_found" } : { ok: true };
  }

  const attempt = mockState.attempts.get(attemptId);
  if (!attempt) return { ok: false, error: "not_found" };
  if (attempt.status === "submitted") return { ok: true };

  const assessment = findMockAssessment(attempt.assessmentId)!;
  const now = Date.now();

  const questions: QuestionReview[] = assessment.questionIds.map((qid) => {
    const q = CATALOG_QUESTIONS[qid]!;
    const key = CATALOG_ANSWER_KEYS[qid] ?? {};
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
    assessment: (await getAnyAssessmentSummary(assessment.id))!,
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
