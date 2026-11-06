import "server-only";

// Sujets blancs du Bac rédigés par DIANGAL d'après les programmes de Terminale et la forme des épreuves de l'Office
// du Bac (durées, parties, barèmes des sujets de 2023 à 2026). Ce ne sont PAS des sujets officiels : énoncés et
// corrigés sont à faire relire par des enseignants. Détail et limites : docs/programme/bac-sujets-blancs.md.
// Chaque sujet est proposé aux séries qui passent cette épreuve : une copie par série, rattachée aux chapitres
// de la série (points faibles) et visible de ses seuls élèves.
// Corrigés inclus : ce dossier ne doit jamais atteindre le navigateur.

import { CHAPTERS_TLE } from "../../curriculum-tle";
import { buildMockExams, type ExerciseSpec, type MockExamSpec } from "../../exercise-series";
import { tight } from "../../lesson-figures";
import { ANGLAIS_L } from "./anglais";
import { FRANCAIS } from "./francais";
import { HISTOIRE_GEO } from "./histoire-geo";
import { MATHS_L } from "./maths-l";
import { MATHS_S } from "./maths-s";
import { PHILOSOPHIE_L, PHILOSOPHIE_S } from "./philosophie";
import { PHYSIQUE_S } from "./physique-s";
import { SVT_S } from "./svt-s";

type Spec = Omit<MockExamSpec, "series">;

/** Sujets et séries qui les reçoivent (celles qui passent l'épreuve et ont les chapitres au programme). */
const BY_SERIES: [Spec[], string[]][] = [
  [MATHS_S, ["S2", "S4", "S5"]],
  [PHYSIQUE_S, ["S2", "S4", "S5"]],
  [SVT_S, ["S2", "S4", "S5"]],
  [[PHILOSOPHIE_S], ["S1", "S2", "S3", "S4", "S5"]],
  [[PHILOSOPHIE_L], ["L1", "L2", "LA"]],
  [FRANCAIS, ["S1", "S2", "S3", "S4", "S5", "L1", "L2", "LA"]],
  [HISTOIRE_GEO, ["S1", "S2", "S4", "S5", "L1", "L2", "LA"]],
  [ANGLAIS_L, ["L1", "L2"]],
  [MATHS_L, ["L1", "L2", "LA"]],
];

/** Sujets tels qu'écrits, avant la copie par série (pour les tests de barème et de calcul). */
export const BAC_SPECS: Spec[] = BY_SERIES.flatMap(([specs]) => specs);

/** Typographie : espaces insécables devant la ponctuation et dans les grands nombres. */
function tidy(q: ExerciseSpec): ExerciseSpec {
  const why = tight(q.why);
  if ("qcm" in q) return { ...q, qcm: tight(q.qcm), choices: q.choices.map(tight), why };
  if ("vf" in q) return { ...q, vf: tight(q.vf), why };
  if ("num" in q) return { ...q, num: tight(q.num), why };
  if ("self" in q) return { ...q, self: tight(q.self), why };
  return { ...q, text: tight(q.text), why };
}

const SERIES_SPECS: MockExamSpec[] = BY_SERIES.flatMap(([specs, series]) =>
  series.flatMap((code) =>
    specs.map((spec) => ({
      ...spec,
      id: `${spec.id}-${code.toLowerCase()}`,
      title: `${spec.title} (${code})`,
      series: code,
      parts: spec.parts.map((part) => ({ ...part, stem: part.stem && tight(part.stem), questions: part.questions.map(tidy) })),
    })),
  ),
);

const built = buildMockExams("TLE", CHAPTERS_TLE, SERIES_SPECS, {
  examType: "BAC",
  source: "Sujet blanc rédigé par DIANGAL d’après le programme de Terminale et la forme des épreuves du Bac (sujets de l’Office du Bac de 2023 à 2026)",
});

export const QUESTIONS_BAC_BLANCS = built.questions;
export const ANSWER_KEYS_BAC_BLANCS = built.keys;
export const QUESTION_CHAPTERS_BAC_BLANCS = built.questionChapters;
export const ASSESSMENTS_BAC_BLANCS = built.assessments;
