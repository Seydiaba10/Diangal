import "server-only";

// Séries de maths du CP : une série par leçon du cahier d'exercices de l'école, numérotée dans son
// chapitre. Les réponses proposées restent dans l'ordre écrit (A, B, C ; &lt;, &gt;, =).

import type { ExerciseSeries, ExerciseSpec } from "../../exercise-series";

export const seriesOf =
  (chapter: string) =>
  (n: number, title: string, questions: ExerciseSpec[]): ExerciseSeries => ({
    subject: "MATH",
    chapter,
    key: `serie-${String(n).padStart(2, "0")}`,
    title: `Série ${n} : ${title}`,
    shuffle: false,
    questions,
  });
