import { cacheLife, cacheTag } from "next/cache";
import { connection } from "next/server";
import { cache } from "react";
import { requireIdentity } from "@/features/account/session";
import { getAssessmentCatalog, getAssessmentsByKind } from "@/features/assessments/data";
import { getSubmittedAttempts } from "@/features/assessments/supabase";
import { getSubjects } from "@/features/curriculum/data";
import { isSupabaseConfigured } from "@/lib/env";
import { daysUntil } from "@/lib/format";
import { createSupabasePublicClient } from "@/lib/supabase/public";
import { selectAllRows } from "@/lib/supabase/rows";
import { EXAM_SESSIONS } from "@/mocks/exams";
import { OFFICIAL_PAPERS, OFFICIAL_PAPERS_CHECKED_ON } from "@/mocks/official-papers";
import { mockState } from "@/mocks/progress-store";
import type {
  AssessmentSummary,
  ExamPaper,
  ExamSession,
  ExamType,
  NextExam,
  OfficialPaper,
  Subject,
  SubjectCode,
} from "@/types/domain";
import { officialPapersFor } from "./official-papers";

// Démo : src/mocks. Supabase : table exam_sessions (dates saisies par l'admin) et
// évaluations de type past_paper (annales).

/** Examen de fin de cycle passé dans une classe. */
export const EXAM_BY_LEVEL: Record<string, ExamType> = { CM2: "CFEE", "3E": "BFEM", TLE: "BAC" };

/** Dates des examens nationaux : mises en cache, invalidées quand l'admin les modifie. */
async function loadExamSessions(): Promise<ExamSession[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("exam-sessions");
  const supabase = createSupabasePublicClient();
  const { data, error } = await supabase.from("exam_sessions").select("id, exam_type, year, starts_on, is_official").order("starts_on");
  if (error) throw new Error(`examens : ${error.message}`);
  return data.map((s) => ({ id: s.id, type: s.exam_type, year: s.year, startsOn: s.starts_on, isOfficial: s.is_official }));
}

export const getExamSessions = cache(async (): Promise<ExamSession[]> => {
  await connection();
  if (isSupabaseConfigured()) return loadExamSessions();
  return EXAM_SESSIONS.map((s) => ({ ...s, ...mockState.examDates.get(s.id) }));
});

/** Prochain examen national du niveau, avec le compte à rebours du jour. */
export const getNextExamFor = cache(async (levelCode: string): Promise<NextExam | null> => {
  const type = EXAM_BY_LEVEL[levelCode];
  return type ? getNextExamOfType(type) : null;
});

/** Prochaine session d'un examen (CFEE, BFEM, Bac), avec le compte à rebours du jour. */
export const getNextExamOfType = cache(async (type: ExamType): Promise<NextExam | null> => {
  // getExamSessions appelle connection() : la date du jour se lit ensuite (jamais au prérendu).
  const sessions = await getExamSessions();
  const today = new Date().toISOString().slice(0, 10);
  const session = sessions.find((s) => s.type === type && s.startsOn >= today);
  if (!session) return null;
  return {
    type,
    year: session.year,
    startsOn: session.startsOn,
    isOfficial: session.isOfficial,
    daysLeft: Math.max(0, daysUntil(session.startsOn, new Date())),
  };
});

/**
 * Annales officielles (évaluations « past_paper ») : seulement celles dont la source a été
 * vérifiée. Aucun sujet officiel n'est inventé ni proposé avant vérification.
 */
async function examPapers(): Promise<ExamPaper[]> {
  const [catalog, subjects] = await Promise.all([getAssessmentCatalog(), getSubjects()]);
  return catalog
    .filter((a) => a.kind === "past_paper" && a.examType && a.verification !== "unverified")
    .map((a) => ({
      id: a.id,
      examType: a.examType!,
      year: a.examYear ?? 0,
      seriesCode: a.seriesCode,
      subjectCode: a.subjectCode,
      subjectName: subjects.find((s) => s.code === a.subjectCode && s.levelCode === a.levelCode)?.name ?? a.subjectCode,
      correctionPremium: a.isPremium,
      assessmentId: a.questionsCount > 0 ? a.id : null,
      questionsCount: a.questionsCount,
      durationS: a.durationS,
      verification: a.verification,
      sources: a.sources,
      correctionSource: a.correctionSource,
    }));
}

/** Annales vérifiées d'un examen ; au Bac, celles de la série (et les épreuves communes). */
export async function getExamPapers(type: ExamType, seriesCode?: string | null): Promise<ExamPaper[]> {
  return (await examPapers()).filter((p) => p.examType === type && (type !== "BAC" || !p.seriesCode || p.seriesCode === seriesCode));
}

/** Sujets blancs DIANGAL d'un examen (et de la série au Bac), avec la meilleure note de l'élève. */
export async function getMockExams(type: ExamType, seriesCode?: string | null): Promise<AssessmentSummary[]> {
  // Rangés par identifiant (« bfem-blanc-1-… », « bfem-blanc-2-… ») : le même ordre en démo et en ligne.
  return (await getAssessmentsByKind("mock_exam"))
    .filter((a) => a.examType === type && (type !== "BAC" || !a.seriesCode || a.seriesCode === seriesCode))
    .sort((a, b) => a.id.localeCompare(b.id));
}

export interface ExamHistoryItem {
  attemptId: string;
  title: string;
  subject: Subject;
  score20: number;
  date: string;
}

/** Épreuves d'examen déjà passées par l'élève (sujets blancs et annales en ligne), les plus récentes d'abord. */
export const getExamHistory = cache(async (type: ExamType): Promise<ExamHistoryItem[]> => {
  await connection();
  if (!isSupabaseConfigured()) {
    return [...mockState.attempts.values()]
      .filter((a) => a.result && a.result.assessment.examType === type)
      .map((a) => ({
        attemptId: a.id,
        title: a.result!.assessment.title,
        subject: a.result!.assessment.subject,
        score20: a.result!.score20,
        date: a.result!.submittedAt,
      }))
      .sort((a, b) => b.date.localeCompare(a.date));
  }
  const [attempts, mockExams, pastPapers, catalog] = await Promise.all([
    getSubmittedAttempts((await requireIdentity()).userId),
    getAssessmentsByKind("mock_exam"),
    getAssessmentsByKind("past_paper"),
    getAssessmentCatalog(),
  ]);
  const exams = [...mockExams, ...pastPapers];
  const slugByUuid = new Map(catalog.map((c) => [c.uuid, c.id]));
  return attempts.flatMap((attempt) => {
    const exam = exams.find((e) => e.id === slugByUuid.get(attempt.assessmentUuid) && e.examType === type);
    return exam ? [{ attemptId: attempt.id, title: exam.title, subject: exam.subject, score20: attempt.score20, date: attempt.submittedAt }] : [];
  });
});

export async function getExamPaper(id: string): Promise<ExamPaper | undefined> {
  return (await examPapers()).find((p) => p.id === id);
}

export async function getAllExamPaperIds() {
  const ids = (await examPapers()).map((p) => ({ id: p.id }));
  // generateStaticParams doit renvoyer au moins une valeur : « _ » mène à une page 404.
  return ids.length ? ids : [{ id: "_" }];
}

/** Sujets et corrigés officiels du Bac (liens vers les PDF de l'Office du Bac) : contenu public, mis en cache. */
async function loadOfficialPapers(): Promise<{ papers: OfficialPaper[]; checkedOn: string }> {
  "use cache";
  cacheLife("hours");
  cacheTag("official-papers");
  const supabase = createSupabasePublicClient();
  const data = await selectAllRows("sujets officiels", (from, to) =>
    supabase
      .from("official_papers")
      .select("id, year, kind, exam_group, replacement, subject_code, subject_label, series_label, series_codes, title, url, source_page, checked_on")
      .eq("exam_type", "BAC")
      .order("year", { ascending: false })
      .order("title")
      .order("id")
      .range(from, to),
  );
  return {
    papers: data.map((p) => ({
      id: p.id,
      year: p.year,
      kind: p.kind === "corrige" ? "corrige" : "epreuve",
      group: p.exam_group === 1 || p.exam_group === 2 ? p.exam_group : null,
      replacement: p.replacement,
      subjectCode: (p.subject_code as SubjectCode | null) ?? null,
      subjectLabel: p.subject_label,
      seriesLabel: p.series_label,
      seriesCodes: p.series_codes,
      title: p.title,
      url: p.url,
      sourcePage: p.source_page,
    })),
    checkedOn: data.reduce((latest, p) => (p.checked_on > latest ? p.checked_on : latest), ""),
  };
}

export interface OfficialPapersView {
  /** Documents de la série demandée et épreuves communes (tous sans série). */
  papers: OfficialPaper[];
  /** Nombre de documents relevés, toutes séries. */
  total: number;
  /** Date du dernier relevé des liens (aaaa-mm-jj). */
  checkedOn: string;
}

/** Sujets et corrigés officiels du Bac pour une série (et les épreuves communes). */
export async function getOfficialPapers(series: string | null): Promise<OfficialPapersView> {
  const { papers, checkedOn } = isSupabaseConfigured()
    ? await loadOfficialPapers()
    : { papers: OFFICIAL_PAPERS.map((p, i) => ({ ...p, id: `officiel-${i + 1}` })), checkedOn: OFFICIAL_PAPERS_CHECKED_ON };
  return { papers: officialPapersFor(papers, series), total: papers.length, checkedOn };
}
