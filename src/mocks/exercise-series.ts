import "server-only";

// Séries d'exercices de démonstration (une par chapitre) écrites dans un format compact, puis
// converties en questions, corrigés et évaluations. Corrigés inclus : jamais côté navigateur.

import { isFreeChapter } from "@/lib/free-tier";
import { slugify } from "@/lib/slug";
import type { Assessment, Chapter, SubjectCode } from "@/types/domain";
import type { MockAnswerKey } from "./answer-keys-3e";
import type { MockQuestion } from "./assessments-3e";

/**
 * Une question. QCM : la bonne réponse est précédée de « * » (sa place varie).
 * Vrai / faux, nombre ou mot attendu : champ answer. why : la correction expliquée.
 */
export type ExerciseSpec =
  | { qcm: string; choices: string[]; why: string }
  | { vf: string; answer: boolean; why: string }
  | { num: string; answer: number; why: string }
  | { text: string; answer: string; accept?: string[]; why: string };

export interface ExerciseSeries {
  subject: SubjectCode;
  /** Titre du chapitre, tel qu'il figure dans le catalogue. */
  chapter: string;
  /** Série du programme au lycée (S1, L2…). */
  series?: string;
  questions: ExerciseSpec[];
}

const POINTS = 2;
const p = (html: string) => `<p>${html}</p>`;

/** Questions, corrigés, chapitre de chaque question et séries d'exercices d'une classe. */
export function buildExerciseSeries(levelCode: string, chapters: Chapter[], series: ExerciseSeries[]) {
  const questions: Record<string, MockQuestion> = {};
  const keys: Record<string, MockAnswerKey> = {};
  const questionChapters: Record<string, string> = {};

  const assessments: Assessment[] = series.map(({ subject, chapter: title, series: seriesCode, questions: specs }) => {
    const chapter = chapters.find(
      (c) => c.subjectCode === subject && (c.seriesCode ?? null) === (seriesCode ?? null) && slugify(c.title) === slugify(title),
    );
    if (!chapter) throw new Error(`Exercices (${levelCode}) : chapitre introuvable (${subject}${seriesCode ? ` ${seriesCode}` : ""}, ${title})`);

    const questionIds = specs.map((spec, index) => {
      const id = `${chapter.id}--q${index + 1}`;
      const option = (label: string, i: number) => ({ id: `${id}-${String.fromCharCode(97 + i)}`, labelHtml: label.replace(/^\*/, "") });
      if ("qcm" in spec) {
        const options = spec.choices.map(option);
        const correct = spec.choices.findIndex((c) => c.startsWith("*"));
        if (correct < 0) throw new Error(`Exercices (${levelCode}) : bonne réponse manquante (${id})`);
        questions[id] = { id, type: "single_choice", points: POINTS, promptHtml: p(spec.qcm), options, explanationHtml: p(spec.why) };
        keys[id] = { correctOptionIds: [options[correct]!.id] };
      } else if ("vf" in spec) {
        const options = [
          { id: `${id}-vrai`, labelHtml: "Vrai" },
          { id: `${id}-faux`, labelHtml: "Faux" },
        ];
        questions[id] = { id, type: "true_false", points: POINTS, promptHtml: p(spec.vf), options, explanationHtml: p(spec.why) };
        keys[id] = { correctOptionIds: [spec.answer ? options[0].id : options[1].id] };
      } else if ("num" in spec) {
        questions[id] = { id, type: "numeric", points: POINTS, promptHtml: p(spec.num), options: [], explanationHtml: p(spec.why) };
        keys[id] = { numericValue: spec.answer, expectedAnswer: String(spec.answer) };
      } else {
        questions[id] = { id, type: "short_text", points: POINTS, promptHtml: p(spec.text), options: [], explanationHtml: p(spec.why) };
        keys[id] = { acceptedTexts: [spec.answer, ...(spec.accept ?? [])], expectedAnswer: spec.answer };
      }
      questionChapters[id] = chapter.id;
      return id;
    });

    return {
      id: `${chapter.id}--exercices`,
      kind: "exercise",
      title: `Exercices : ${chapter.title}`,
      subjectCode: subject,
      levelCode,
      seriesCode: chapter.seriesCode ?? null,
      chapterId: chapter.id,
      durationS: null,
      isPremium: !isFreeChapter(chapter.number),
      questionIds,
    };
  });

  return { questions, keys, questionChapters, assessments };
}
