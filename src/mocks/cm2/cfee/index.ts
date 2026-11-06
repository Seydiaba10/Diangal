import "server-only";

// Sujets blancs du CFEE rédigés par DIANGAL d'après le guide pratique du CFEE (2018), la forme des sujets officiels
// de 2023 à 2026 et leurs guides de correction, et les leçons de CM2 : mêmes épreuves, durées et barèmes, mais ce
// ne sont PAS des sujets officiels ; questions et corrigés sont à faire relire par des enseignants.
// Détail et limites : docs/programme/cfee-sujets-blancs.md.
// Corrigés inclus : ce dossier ne doit jamais atteindre le navigateur.

import { CHAPTERS_CM2 } from "../../curriculum-cm2";
import { buildMockExams, type ExerciseSpec, type MockExamSpec } from "../../exercise-series";
import { tight } from "../../lesson-figures";
import { EDUCATION_ARTISTIQUE, FACULTATIVES } from "./arts-facultative";
import { DECOUVERTE_MONDE } from "./decouverte-monde";
import { DEVELOPPEMENT_DURABLE } from "./developpement-durable";
import { LANGUE_ECRITS } from "./langue-ecrits";
import { LANGUE_RESSOURCES } from "./langue-ressources";
import { MATHS_COMPETENCE } from "./maths-competence";
import { MATHS_RESSOURCES } from "./maths-ressources";

/** Typographie : espaces insécables devant la ponctuation et dans les grands nombres. */
function tidy(q: ExerciseSpec): ExerciseSpec {
  const why = tight(q.why);
  if ("qcm" in q) return { ...q, qcm: tight(q.qcm), choices: q.choices.map(tight), why };
  if ("vf" in q) return { ...q, vf: tight(q.vf), why };
  if ("num" in q) return { ...q, num: tight(q.num), why };
  if ("self" in q) return { ...q, self: tight(q.self), why };
  return { ...q, text: tight(q.text), why };
}

export const CFEE_SPECS: MockExamSpec[] = [
  ...LANGUE_RESSOURCES,
  ...LANGUE_ECRITS,
  ...MATHS_RESSOURCES,
  ...MATHS_COMPETENCE,
  ...DECOUVERTE_MONDE,
  ...DEVELOPPEMENT_DURABLE,
  ...EDUCATION_ARTISTIQUE,
  ...FACULTATIVES,
].map((spec) => ({
  ...spec,
  parts: spec.parts.map((part) => ({ ...part, stem: part.stem && tight(part.stem), questions: part.questions.map(tidy) })),
}));

const built = buildMockExams("CM2", CHAPTERS_CM2, CFEE_SPECS, {
  examType: "CFEE",
  source: "Sujet blanc rédigé par DIANGAL sur le modèle des sujets officiels du CFEE (guide pratique de 2018, sujets et guides de correction de 2023 à 2026) et d’après les leçons de CM2",
});

export const QUESTIONS_CFEE_BLANCS = built.questions;
export const ANSWER_KEYS_CFEE_BLANCS = built.keys;
/** Chapitre de chaque question (points faibles) ; aucun pour l'arabe et l'éducation artistique. */
export const QUESTION_CHAPTERS_CFEE_BLANCS = built.questionChapters;
export const ASSESSMENTS_CFEE_BLANCS = built.assessments;
