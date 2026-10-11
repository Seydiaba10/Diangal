import { connection } from "next/server";
import { cache } from "react";
import { daysUntil } from "@/lib/format";
import { EXAM_PAPERS, EXAM_SESSIONS } from "@/mocks/exams";
import { mockState } from "@/mocks/progress-store";
import type { ExamPaper, ExamSession, ExamType, NextExam } from "@/types/domain";

// Phase 3 : tables exam_sessions (dates saisies par l'admin) et assessments de type past_paper.

const EXAM_BY_LEVEL: Record<string, ExamType> = { CM2: "CFEE", "3E": "BFEM", TLE: "BAC" };

export const getExamSessions = cache(async (): Promise<ExamSession[]> => {
  await connection();
  return EXAM_SESSIONS.map((s) => ({ ...s, ...mockState.examDates.get(s.id) }));
});

/** Prochain examen national du niveau, avec le compte à rebours du jour. */
export const getNextExamFor = cache(async (levelCode: string): Promise<NextExam | null> => {
  const type = EXAM_BY_LEVEL[levelCode];
  if (!type) return null;
  const session = (await getExamSessions()).find((s) => s.type === type);
  if (!session) return null;
  return {
    type,
    year: session.year,
    startsOn: session.startsOn,
    isOfficial: session.isOfficial,
    daysLeft: Math.max(0, daysUntil(session.startsOn, new Date())),
  };
});

export async function getExamPapers(type: ExamType): Promise<ExamPaper[]> {
  return EXAM_PAPERS.filter((p) => p.examType === type);
}

export async function getExamPaper(id: string): Promise<ExamPaper | undefined> {
  return EXAM_PAPERS.find((p) => p.id === id);
}

export async function getAllExamPaperIds() {
  return EXAM_PAPERS.map((p) => ({ id: p.id }));
}
