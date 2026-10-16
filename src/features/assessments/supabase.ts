import "server-only";

import { cacheLife, cacheTag } from "next/cache";
import { cache } from "react";
import { parseSources } from "@/lib/sources";
import { createSupabasePublicClient } from "@/lib/supabase/public";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type {
  AnswerValue,
  AssessmentKind,
  ContentSource,
  ContentVerification,
  ExamType,
  PlayerQuestion,
  QuestionReview,
  QuestionType,
  SubjectCode,
} from "@/types/domain";

// Lecture Supabase des évaluations et des tentatives (questions via fonctions : jamais de corrigé avant l'envoi).

export interface CatalogAssessment {
  uuid: string;
  /** Identifiant public, utilisé dans les URL (/eleve/evaluations/thales-quiz). */
  slug: string;
  kind: AssessmentKind;
  title: string;
  subjectCode: SubjectCode;
  levelCode: string;
  chapterId: string | null;
  examType: ExamType | null;
  examYear: number | null;
  durationS: number | null;
  isPremium: boolean;
  questionsCount: number;
  totalPoints: number;
  seriesCode: string | null;
  verification: ContentVerification;
  sources: ContentSource[];
  correctionSource: string | null;
}

/** Évaluations publiées (identiques pour tous) : mises en cache, invalidées avec le catalogue. */
export async function loadAssessmentCatalog(): Promise<CatalogAssessment[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("catalog");
  const supabase = createSupabasePublicClient();
  const { data, error } = await supabase.rpc("get_assessments_catalog");
  if (error) throw new Error(`évaluations : ${error.message}`);
  return data.map((a) => ({
    uuid: a.id,
    slug: a.slug,
    kind: a.kind,
    title: a.title,
    subjectCode: a.subject_code as SubjectCode,
    levelCode: a.level_code,
    chapterId: a.chapter_id,
    examType: a.exam_type,
    examYear: a.exam_year,
    durationS: a.duration_s,
    isPremium: a.is_premium,
    questionsCount: a.questions_count,
    totalPoints: Number(a.total_points),
    seriesCode: a.series_code ?? null,
    verification: a.verification,
    sources: parseSources(a.sources),
    correctionSource: a.correction_source ?? null,
  }));
}

/** Nombre de questions publiées par chapitre (banque des séances « Préparer mon prochain devoir »). */
export async function loadChapterQuestionCounts(): Promise<Record<string, number>> {
  "use cache";
  cacheLife("hours");
  cacheTag("catalog");
  const supabase = createSupabasePublicClient();
  const { data, error } = await supabase.rpc("get_chapter_question_counts");
  if (error) throw new Error(`questions par chapitre : ${error.message}`);
  return Object.fromEntries(data.map((r) => [r.chapter_id, r.questions]));
}

/** Séance personnelle (ou évaluation) lue avec la session : la RLS limite à l'élève, ses parents et l'admin. */
export async function fetchPersonalAssessment(idOrSlug: string): Promise<CatalogAssessment | null> {
  const supabase = await createSupabaseServerClient();
  const column = UUID.test(idOrSlug) ? "id" : "slug";
  const { data } = await supabase
    .from("assessments")
    .select("id, slug, kind, title, chapter_id, exam_type, exam_year, duration_s, is_premium, owner_id, verification, sources, correction_source, subjects!inner(code), levels!inner(code), series(code), assessment_questions(questions(points))")
    .eq(column, idOrSlug)
    .not("owner_id", "is", null)
    .maybeSingle();
  if (!data) return null;
  return {
    uuid: data.id,
    slug: data.slug,
    kind: data.kind,
    title: data.title,
    subjectCode: data.subjects.code as SubjectCode,
    levelCode: data.levels.code,
    chapterId: data.chapter_id,
    examType: data.exam_type,
    examYear: data.exam_year,
    durationS: data.duration_s,
    isPremium: data.is_premium,
    questionsCount: data.assessment_questions.length,
    totalPoints: data.assessment_questions.reduce((sum, aq) => sum + Number(aq.questions?.points ?? 0), 0),
    seriesCode: data.series?.code ?? null,
    verification: data.verification,
    sources: parseSources(data.sources),
    correctionSource: data.correction_source ?? null,
  };
}

export interface RemotePracticeAttempt {
  attemptId: string;
  status: "in_progress" | "submitted";
  score20: number | null;
  date: string;
  subjectCode: SubjectCode;
  levelCode: string;
  questionsCount: number;
  timed: boolean;
}

/** Historique des séances « Préparer mon prochain devoir » d'un élève (lui-même ou son enfant). */
export async function fetchPracticeAttempts(studentId: string): Promise<RemotePracticeAttempt[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("attempts")
    .select("id, status, score_20, started_at, submitted_at, assessments!inner(owner_id, duration_s, subjects!inner(code), levels!inner(code), assessment_questions(count))")
    .eq("user_id", studentId)
    .not("assessments.owner_id", "is", null)
    .order("started_at", { ascending: false })
    .limit(20);
  if (error) throw new Error(`séances : ${error.message}`);
  return data.map((a) => ({
    attemptId: a.id,
    status: a.status === "in_progress" ? "in_progress" : "submitted",
    score20: a.score_20 === null ? null : Number(a.score_20),
    date: a.submitted_at ?? a.started_at,
    subjectCode: a.assessments.subjects.code as SubjectCode,
    levelCode: a.assessments.levels.code,
    questionsCount: a.assessments.assessment_questions[0]?.count ?? 0,
    timed: a.assessments.duration_s !== null,
  }));
}

export interface SubmittedAttempt {
  id: string;
  assessmentUuid: string;
  score20: number;
  submittedAt: string;
}

/** Copies corrigées d'un élève (lui-même, ou son enfant pour un parent : la RLS vérifie le lien). */
export const getSubmittedAttempts = cache(async (studentId: string): Promise<SubmittedAttempt[]> => {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("attempts")
    .select("id, assessment_id, score_20, submitted_at")
    .eq("user_id", studentId)
    .eq("status", "submitted")
    .order("submitted_at", { ascending: false });
  if (error) throw new Error(`tentatives : ${error.message}`);
  return data.map((a) => ({ id: a.id, assessmentUuid: a.assessment_id, score20: Number(a.score_20 ?? 0), submittedAt: a.submitted_at ?? "" }));
});

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

interface RawQuestion {
  id: string;
  type: QuestionType;
  prompt_html: string;
  points: number | string;
  options: { id: string; label_html: string }[];
}

function toPlayerQuestion(q: RawQuestion): PlayerQuestion {
  return {
    id: q.id,
    type: q.type,
    promptHtml: q.prompt_html,
    points: Number(q.points),
    options: q.options.map((o) => ({ id: o.id, labelHtml: o.label_html })),
  };
}

export interface RemoteAttemptSession {
  assessmentSlug: string;
  startedAt: string;
  deadlineAt: string | null;
  serverNow: number;
  questions: PlayerQuestion[];
}

/** Contrôle en cours de l'élève connecté (reprise), « submitted » s'il est déjà envoyé, sinon null. */
export async function fetchAttemptSession(attemptId: string): Promise<RemoteAttemptSession | "submitted" | null> {
  if (!UUID.test(attemptId)) return null;
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.rpc("get_attempt_session", { p_attempt: attemptId });
  if (error || !data) return null;
  const session = data as unknown as {
    status: string;
    assessment_slug: string;
    started_at: string;
    deadline_at: string | null;
    server_now: string;
    questions: RawQuestion[];
  };
  if (session.status !== "in_progress") return "submitted";
  return {
    assessmentSlug: session.assessment_slug,
    startedAt: session.started_at,
    deadlineAt: session.deadline_at,
    serverNow: Date.parse(session.server_now),
    questions: session.questions.map(toPlayerQuestion),
  };
}

export interface RemoteAttemptResult {
  assessmentUuid: string;
  score: number;
  maxScore: number;
  score20: number;
  startedAt: string;
  submittedAt: string;
  late: boolean;
  questions: QuestionReview[];
}

/** Copie corrigée avec le corrigé détaillé (élève, parent lié ou admin, après l'envoi seulement). */
export async function fetchAttemptResult(attemptId: string): Promise<RemoteAttemptResult | null> {
  if (!UUID.test(attemptId)) return null;
  const supabase = await createSupabaseServerClient();
  const [{ data: review, error }, { data: attempt }] = await Promise.all([
    supabase.rpc("get_attempt_review", { p_attempt: attemptId }),
    supabase.from("attempts").select("assessment_id, started_at").eq("id", attemptId).maybeSingle(),
  ]);
  if (error || !review || !attempt) return null;
  const r = review as unknown as {
    score: number | string;
    max_score: number | string;
    score_20: number | string;
    submitted_at: string;
    late: boolean;
    questions: (RawQuestion & {
      response: AnswerValue | null;
      is_correct: boolean | null;
      points_awarded: number | string | null;
      correct_option_ids: string[];
      expected_answer: string | null;
      explanation_html: string;
    })[];
  };
  return {
    assessmentUuid: attempt.assessment_id,
    score: Number(r.score),
    maxScore: Number(r.max_score),
    score20: Number(r.score_20),
    startedAt: attempt.started_at,
    submittedAt: r.submitted_at,
    late: r.late,
    questions: r.questions.map((q) => ({
      ...toPlayerQuestion(q),
      response: q.response ?? null,
      isCorrect: q.is_correct ?? false,
      pointsAwarded: Number(q.points_awarded ?? 0),
      correctOptionIds: q.correct_option_ids ?? [],
      expectedAnswer: q.expected_answer,
      explanationHtml: q.explanation_html,
    })),
  };
}
