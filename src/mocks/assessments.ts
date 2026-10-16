import "server-only";

// Toutes les évaluations de démonstration (CI, CP et 3e), avec la règle de l’offre gratuite :
// exercices et contrôles d'un chapitre au-delà des premiers sont Premium. Le seed en est tiré.

import { isFreeChapter } from "@/lib/free-tier";
import type { Assessment } from "@/types/domain";
import { ASSESSMENTS_3E_SERIES, QUESTION_CHAPTERS_3E_SERIES, QUESTIONS_3E_SERIES } from "./3e/exercises";
import { ASSESSMENTS_3E, BEST_SCORES, MOCK_QUESTIONS, type MockQuestion } from "./assessments-3e";
import { ASSESSMENTS_CI, QUESTION_CHAPTERS_CI, QUESTIONS_CI } from "./ci/exercises";
import { ASSESSMENTS_CP, QUESTION_CHAPTERS_CP, QUESTIONS_CP } from "./cp/exercises";
import { CATALOG_CHAPTERS } from "./curriculum";

const chapterNumber = new Map(CATALOG_CHAPTERS.map((c) => [c.id, c.number]));

function withFreeTier(a: Assessment): Assessment {
  const number = a.chapterId ? chapterNumber.get(a.chapterId) : undefined;
  if (number === undefined || (a.kind !== "exercise" && a.kind !== "quiz")) return a;
  return { ...a, isPremium: !isFreeChapter(number) };
}

export const CATALOG_ASSESSMENTS: Assessment[] = [
  ...ASSESSMENTS_CI,
  ...ASSESSMENTS_CP,
  ...ASSESSMENTS_3E,
  ...ASSESSMENTS_3E_SERIES,
].map(withFreeTier);

export const CATALOG_QUESTIONS: Record<string, MockQuestion> = {
  ...QUESTIONS_CI,
  ...QUESTIONS_CP,
  ...MOCK_QUESTIONS,
  ...QUESTIONS_3E_SERIES,
};

/** Chapitre de chaque question : celui de son évaluation (3e) ou de sa série d'exercices. */
export const QUESTION_CHAPTERS: Record<string, string> = {
  ...Object.fromEntries(
    ASSESSMENTS_3E.flatMap((a) => (a.chapterId ? a.questionIds.map((qid) => [qid, a.chapterId!] as const) : [])),
  ),
  ...QUESTION_CHAPTERS_CI,
  ...QUESTION_CHAPTERS_CP,
  ...QUESTION_CHAPTERS_3E_SERIES,
};

export { BEST_SCORES };
