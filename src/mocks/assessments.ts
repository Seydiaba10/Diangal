import "server-only";

// Toutes les évaluations de démonstration (CI, CP, CE1, CE2, CM1, CM2, 6e, 5e, 4e, 3e, 2nde, 1re et Terminale), avec la règle de l’offre gratuite :
// exercices et contrôles d'un chapitre au-delà des premiers sont Premium. Le seed en est tiré.

import { isFreeChapter } from "@/lib/free-tier";
import type { Assessment } from "@/types/domain";
import { ASSESSMENTS_4E, QUESTION_CHAPTERS_4E, QUESTIONS_4E } from "./4e/exercises";
import { ASSESSMENTS_5E, QUESTION_CHAPTERS_5E, QUESTIONS_5E } from "./5e/exercises";
import { ASSESSMENTS_6E, QUESTION_CHAPTERS_6E, QUESTIONS_6E } from "./6e/exercises";
import { ASSESSMENTS_1RE, QUESTION_CHAPTERS_1RE, QUESTIONS_1RE } from "./1re/exercises";
import { ASSESSMENTS_2NDE, QUESTION_CHAPTERS_2NDE, QUESTIONS_2NDE } from "./2nde/exercises";
import { ASSESSMENTS_3E_SERIES, QUESTION_CHAPTERS_3E_SERIES, QUESTIONS_3E_SERIES } from "./3e/exercises";
import { ASSESSMENTS_3E, BEST_SCORES, MOCK_QUESTIONS, type MockQuestion } from "./assessments-3e";
import { ASSESSMENTS_CE1, QUESTION_CHAPTERS_CE1, QUESTIONS_CE1 } from "./ce1/exercises";
import { ASSESSMENTS_CE2, QUESTION_CHAPTERS_CE2, QUESTIONS_CE2 } from "./ce2/exercises";
import { ASSESSMENTS_CI, QUESTION_CHAPTERS_CI, QUESTIONS_CI } from "./ci/exercises";
import { ASSESSMENTS_CM1, QUESTION_CHAPTERS_CM1, QUESTIONS_CM1 } from "./cm1/exercises";
import { ASSESSMENTS_CM2, QUESTION_CHAPTERS_CM2, QUESTIONS_CM2 } from "./cm2/exercises";
import { ASSESSMENTS_CP, QUESTION_CHAPTERS_CP, QUESTIONS_CP } from "./cp/exercises";
import { CATALOG_CHAPTERS } from "./curriculum";
import { ASSESSMENTS_TLE_SERIES, QUESTION_CHAPTERS_TLE_SERIES, QUESTIONS_TLE_SERIES } from "./tle/exercises";

const chapterNumber = new Map(CATALOG_CHAPTERS.map((c) => [c.id, c.number]));

function withFreeTier(a: Assessment): Assessment {
  const number = a.chapterId ? chapterNumber.get(a.chapterId) : undefined;
  if (number === undefined || (a.kind !== "exercise" && a.kind !== "quiz")) return a;
  return { ...a, isPremium: !isFreeChapter(number) };
}

export const CATALOG_ASSESSMENTS: Assessment[] = [
  ...ASSESSMENTS_CI,
  ...ASSESSMENTS_CP,
  ...ASSESSMENTS_CE1,
  ...ASSESSMENTS_CE2,
  ...ASSESSMENTS_CM1,
  ...ASSESSMENTS_CM2,
  ...ASSESSMENTS_6E,
  ...ASSESSMENTS_5E,
  ...ASSESSMENTS_4E,
  ...ASSESSMENTS_3E,
  ...ASSESSMENTS_3E_SERIES,
  ...ASSESSMENTS_2NDE,
  ...ASSESSMENTS_1RE,
  ...ASSESSMENTS_TLE_SERIES,
].map(withFreeTier);

export const CATALOG_QUESTIONS: Record<string, MockQuestion> = {
  ...QUESTIONS_CI,
  ...QUESTIONS_CP,
  ...QUESTIONS_CE1,
  ...QUESTIONS_CE2,
  ...QUESTIONS_CM1,
  ...QUESTIONS_CM2,
  ...QUESTIONS_6E,
  ...QUESTIONS_5E,
  ...QUESTIONS_4E,
  ...MOCK_QUESTIONS,
  ...QUESTIONS_3E_SERIES,
  ...QUESTIONS_2NDE,
  ...QUESTIONS_1RE,
  ...QUESTIONS_TLE_SERIES,
};

/** Chapitre de chaque question : celui de son évaluation (3e) ou de sa série d'exercices. */
export const QUESTION_CHAPTERS: Record<string, string> = {
  ...Object.fromEntries(
    ASSESSMENTS_3E.flatMap((a) => (a.chapterId ? a.questionIds.map((qid) => [qid, a.chapterId!] as const) : [])),
  ),
  ...QUESTION_CHAPTERS_CI,
  ...QUESTION_CHAPTERS_CP,
  ...QUESTION_CHAPTERS_CE1,
  ...QUESTION_CHAPTERS_CE2,
  ...QUESTION_CHAPTERS_CM1,
  ...QUESTION_CHAPTERS_CM2,
  ...QUESTION_CHAPTERS_6E,
  ...QUESTION_CHAPTERS_5E,
  ...QUESTION_CHAPTERS_4E,
  ...QUESTION_CHAPTERS_3E_SERIES,
  ...QUESTION_CHAPTERS_2NDE,
  ...QUESTION_CHAPTERS_1RE,
  ...QUESTION_CHAPTERS_TLE_SERIES,
};

export { BEST_SCORES };
