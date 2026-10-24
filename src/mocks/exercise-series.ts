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
 * pts : barème de la question (2 points par défaut), comme « (1,5 pt) » dans un sujet d'examen.
 */
export type ExerciseSpec = (
  | { qcm: string; choices: string[]; why: string }
  | { vf: string; answer: boolean; why: string }
  | { num: string; answer: number; why: string }
  | { text: string; answer: string; accept?: string[]; why: string }
) & { pts?: number };

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

/** Question et corrigé d'une spécification compacte (identifiant donné par l'appelant). */
function toQuestion(id: string, spec: ExerciseSpec, where: string): { question: MockQuestion; key: MockAnswerKey } {
  const points = spec.pts ?? POINTS;
  const option = (label: string, i: number) => ({ id: `${id}-${String.fromCharCode(97 + i)}`, labelHtml: label.replace(/^\*/, "") });
  if ("qcm" in spec) {
    const options = spec.choices.map(option);
    const correct = spec.choices.findIndex((c) => c.startsWith("*"));
    if (correct < 0) throw new Error(`${where} : bonne réponse manquante (${id})`);
    return {
      question: { id, type: "single_choice", points, promptHtml: p(spec.qcm), options, explanationHtml: p(spec.why) },
      key: { correctOptionIds: [options[correct]!.id] },
    };
  }
  if ("vf" in spec) {
    const options = [
      { id: `${id}-vrai`, labelHtml: "Vrai" },
      { id: `${id}-faux`, labelHtml: "Faux" },
    ];
    return {
      question: { id, type: "true_false", points, promptHtml: p(spec.vf), options, explanationHtml: p(spec.why) },
      key: { correctOptionIds: [spec.answer ? options[0].id : options[1].id] },
    };
  }
  if ("num" in spec) {
    return {
      question: { id, type: "numeric", points, promptHtml: p(spec.num), options: [], explanationHtml: p(spec.why) },
      key: { numericValue: spec.answer, expectedAnswer: String(spec.answer) },
    };
  }
  return {
    question: { id, type: "short_text", points, promptHtml: p(spec.text), options: [], explanationHtml: p(spec.why) },
    key: { acceptedTexts: [spec.answer, ...(spec.accept ?? [])], expectedAnswer: spec.answer },
  };
}

function findChapter(chapters: Chapter[], subject: SubjectCode, title: string, seriesCode: string | null, where: string): Chapter {
  const chapter = chapters.find(
    (c) => c.subjectCode === subject && (c.seriesCode ?? null) === seriesCode && slugify(c.title) === slugify(title),
  );
  if (!chapter) throw new Error(`${where} : chapitre introuvable (${subject}${seriesCode ? ` ${seriesCode}` : ""}, ${title})`);
  return chapter;
}

/** Questions, corrigés, chapitre de chaque question et séries d'exercices d'une classe. */
export function buildExerciseSeries(levelCode: string, chapters: Chapter[], series: ExerciseSeries[]) {
  const questions: Record<string, MockQuestion> = {};
  const keys: Record<string, MockAnswerKey> = {};
  const questionChapters: Record<string, string> = {};
  const where = `Exercices (${levelCode})`;

  const assessments: Assessment[] = series.map(({ subject, chapter: title, series: seriesCode, questions: specs }) => {
    const chapter = findChapter(chapters, subject, title, seriesCode ?? null, where);

    const questionIds = specs.map((spec, index) => {
      const id = `${chapter.id}--q${index + 1}`;
      const { question, key } = toQuestion(id, spec, where);
      questions[id] = question;
      keys[id] = key;
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

/** Sujet blanc d'examen écrit par DIANGAL : parties rattachées chacune à un chapitre du programme. */
export interface MockExamSpec {
  /** Identifiant public (slug) du sujet. */
  id: string;
  subject: SubjectCode;
  title: string;
  durationMin: number;
  parts: { chapter: string; questions: ExerciseSpec[] }[];
}

/**
 * Sujets blancs (kind « mock_exam ») : questions, corrigés et chapitre de chaque question (pour les
 * points faibles). Présentés comme des sujets DIANGAL, jamais comme des sujets officiels.
 */
export function buildMockExams(levelCode: string, chapters: Chapter[], specs: MockExamSpec[]) {
  const questions: Record<string, MockQuestion> = {};
  const keys: Record<string, MockAnswerKey> = {};
  const questionChapters: Record<string, string> = {};
  const where = `Sujet blanc (${levelCode})`;

  const assessments: Assessment[] = specs.map((spec) => {
    let n = 0;
    const questionIds = spec.parts.flatMap((part) => {
      const chapter = findChapter(chapters, spec.subject, part.chapter, null, `${where} ${spec.id}`);
      return part.questions.map((q) => {
        n += 1;
        const id = `${spec.id}--q${n}`;
        const { question, key } = toQuestion(id, q, `${where} ${spec.id}`);
        questions[id] = question;
        keys[id] = key;
        questionChapters[id] = chapter.id;
        return id;
      });
    });
    return {
      id: spec.id,
      kind: "mock_exam",
      title: spec.title,
      subjectCode: spec.subject,
      levelCode,
      chapterId: null,
      durationS: spec.durationMin * 60,
      // Sujet « découverte » : ouvert à tous tant que les sujets blancs ne sont pas plus nombreux.
      isPremium: false,
      questionIds,
      sources: [{ title: "Sujet blanc rédigé par DIANGAL d’après le programme de 3e", kind: "diangal" }],
      correctionSource: "Corrigé rédigé par DIANGAL, à faire relire par un enseignant",
    };
  });

  return { questions, keys, questionChapters, assessments };
}
