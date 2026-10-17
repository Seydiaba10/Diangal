import "server-only";

// Exercices corrigés de Terminale : une série par chapitre et par série (toutes séries). Les
// questions sont rangées par titre de chapitre ; un chapitre commun à plusieurs séries reçoit la
// même série d’exercices. Écrits par DIANGAL d’après les leçons, à faire relire par des enseignants.
// Corrigés inclus : ce fichier ne doit jamais atteindre le navigateur.

import type { SubjectCode } from "@/types/domain";
import { CHAPTERS_TLE } from "../curriculum-tle";
import { buildExerciseSeries, type ExerciseSeries, type ExerciseSpec } from "../exercise-series";
import { ANG_TLE_EXERCISES, FR_TLE_EXERCISES, HG_TLE_EXERCISES, PHILO_TLE_EXERCISES } from "./exercises-lettres";
import { MATH_TLE_EXERCISES } from "./exercises-maths";
import { PC_TLE_EXERCISES, SVT_TLE_EXERCISES } from "./exercises-sciences";
import { LYCEE_SERIES_EXERCISES, MATH_TLE_SERIES_EXERCISES } from "../lycee/exercises";

const BANK: Partial<Record<SubjectCode, Record<string, ExerciseSpec[]>>> = {
  MATH: MATH_TLE_EXERCISES,
  PC: PC_TLE_EXERCISES,
  SVT: SVT_TLE_EXERCISES,
  PHILO: PHILO_TLE_EXERCISES,
  FR: FR_TLE_EXERCISES,
  HG: HG_TLE_EXERCISES,
  ANG: ANG_TLE_EXERCISES,
};

/** Banque complète : séries S1, S2, L1, L2, matières propres aux séries LA, S3, S4, S5, G, T1 et T2, maths G. */
function bankFor(subject: SubjectCode): Record<string, ExerciseSpec[]> {
  return { ...BANK[subject], ...LYCEE_SERIES_EXERCISES[subject], ...(subject === "MATH" ? MATH_TLE_SERIES_EXERCISES : {}) };
}

const SERIES: ExerciseSeries[] = CHAPTERS_TLE.map((chapter) => {
  const questions = bankFor(chapter.subjectCode)[chapter.title];
  if (!questions) throw new Error(`Exercices (TLE) : aucune série pour « ${chapter.title} » (${chapter.subjectCode})`);
  return { subject: chapter.subjectCode, chapter: chapter.title, series: chapter.seriesCode ?? undefined, questions };
});

const built = buildExerciseSeries("TLE", CHAPTERS_TLE, SERIES);

export const QUESTIONS_TLE_SERIES = built.questions;
export const ANSWER_KEYS_TLE_SERIES = built.keys;
/** Chapitre de chaque question (banque utilisée par « Préparer mon prochain devoir »). */
export const QUESTION_CHAPTERS_TLE_SERIES = built.questionChapters;
export const ASSESSMENTS_TLE_SERIES = built.assessments;
