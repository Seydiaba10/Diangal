import { cacheLife, cacheTag } from "next/cache";
import { connection } from "next/server";
import { cache } from "react";
import { getAssessmentCatalog } from "@/features/assessments/data";
import { getSubjects } from "@/features/curriculum/data";
import { isSupabaseConfigured } from "@/lib/env";
import { daysUntil } from "@/lib/format";
import { createSupabasePublicClient } from "@/lib/supabase/public";
import { EXAM_PAPERS, EXAM_SESSIONS } from "@/mocks/exams";
import { mockState } from "@/mocks/progress-store";
import type { ExamPaper, ExamSession, ExamType, NextExam } from "@/types/domain";

// Démo : src/mocks. Supabase : table exam_sessions (dates saisies par l'admin) et
// évaluations de type past_paper (annales).

const EXAM_BY_LEVEL: Record<string, ExamType> = { CM2: "CFEE", "3E": "BFEM", TLE: "BAC" };

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
  if (!type) return null;
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

/** Annales publiées (évaluations « past_paper »), avec leur version corrigée automatiquement. */
async function examPapers(): Promise<ExamPaper[]> {
  if (!isSupabaseConfigured()) return EXAM_PAPERS;
  const [catalog, subjects] = await Promise.all([getAssessmentCatalog(), getSubjects()]);
  return catalog
    .filter((a) => a.kind === "past_paper" && a.examType)
    .map((a) => ({
      id: a.id,
      examType: a.examType!,
      year: a.examYear ?? 0,
      subjectCode: a.subjectCode,
      subjectName: subjects.find((s) => s.code === a.subjectCode && s.levelCode === a.levelCode)?.name ?? a.subjectCode,
      subjectSizeBytes: 0,
      correctionSizeBytes: 0,
      correctionPremium: a.isPremium,
      assessmentId: a.id,
    }));
}

export async function getExamPapers(type: ExamType): Promise<ExamPaper[]> {
  return (await examPapers()).filter((p) => p.examType === type);
}

export async function getExamPaper(id: string): Promise<ExamPaper | undefined> {
  return (await examPapers()).find((p) => p.id === id);
}

export async function getAllExamPaperIds() {
  const ids = (await examPapers()).map((p) => ({ id: p.id }));
  // generateStaticParams doit renvoyer au moins une valeur : « _ » mène à une page 404.
  return ids.length ? ids : [{ id: "_" }];
}
