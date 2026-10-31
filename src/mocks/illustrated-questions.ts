import "server-only";

// Questions illustrées : séries de français et d'ESVS du primaire (dessins de la banque,
// public/illustrations, dans l'énoncé ou dans les réponses à choisir ; une réponse illustrée montre
// le dessin puis son nom, que la lecture à voix haute lit), et séries du collège et du lycée
// (schémas des leçons dans l'énoncé, <classe>/enrich.ts).

import type { SubjectCode } from "@/types/domain";
import { esc, pictureSize, type PictureName } from "./drawings";
import type { ExerciseSeries, ExerciseSpec } from "./exercise-series";
import { schemaSize } from "./figures";
import { tight } from "./lesson-figures";

const tag = (name: PictureName, alt: string, height: number) => {
  const [w, h] = pictureSize(name);
  return `<img class="dg-pic" src="/illustrations/${name}.svg" alt="${esc(alt)}" width="${Math.round((height * w) / h)}" height="${height}" loading="lazy" decoding="async">`;
};

/** Réponse illustrée : le dessin, puis son nom. */
export const pc = (name: PictureName, word: string) => `${tag(name, "", 40)} ${word}`;

/** Dessins de l'énoncé, côte à côte, chacun décrit. */
export const scene = (...items: [PictureName, string][]) => `<p class="dg-pics">${items.map(([name, alt]) => tag(name, alt, 72)).join("")}</p>`;

/** Schéma d'une leçon réutilisé dans l'énoncé. */
export function schemaFig(id: string, alt: string): string {
  const [w, h] = schemaSize(id);
  return `<p class="dg-pics"><img class="dg-pic" src="/illustrations/schemas/${id}.svg" alt="${esc(alt)}" width="${w}" height="${h}" loading="lazy" decoding="async"></p>`;
}

/** Question à choix (la bonne réponse commence par *), avec un dessin si on le donne. */
export function ask(question: string, choices: string[], why: string, fig?: string): ExerciseSpec {
  const good = choices.find((c) => c.startsWith("*"))!.slice(1).replace(/<img[^>]*>\s*/g, "");
  return { qcm: tight(question), ...(fig ? { fig } : {}), choices: choices.map(tight), why: tight(`<strong>${good}</strong> : ${why}`) };
}

/** Vrai ou faux, avec un dessin si on le donne. */
export const tf = (statement: string, answer: boolean, why: string, fig?: string): ExerciseSpec => ({
  vf: tight(statement),
  answer,
  ...(fig ? { fig } : {}),
  why: tight(`<strong>${answer ? "Vrai" : "Faux"}</strong> : ${why}`),
});

/** Dans quel mot (dessiné) entends-tu le son… ? */
export function soundPick(sound: string, good: [PictureName, string], others: [PictureName, string][]): ExerciseSpec {
  return ask(
    `Dans quel mot entends-tu le son <strong>[${sound}]</strong> ?`,
    [`*${pc(...good)}`, ...others.map(([n, w]) => pc(n, w))],
    `on entend [${sound}] dans « ${good[1]} ».`,
  );
}

/** Combien de syllabes dans le mot du dessin ? */
export function syllableCount(name: PictureName, word: string, cut: string): ExerciseSpec {
  const n = cut.split("-").length;
  return {
    num: tight("Dis le mot du dessin en frappant dans tes mains. Combien de syllabes entends-tu ?"),
    fig: scene([name, word]),
    answer: n,
    why: tight(`« ${cut} » : on frappe <strong>${n}</strong> fois.`),
  };
}

/** Ajoute les questions illustrées à la série unique de chaque chapitre (les séries de maths, avec une clé, restent telles quelles). */
export function withExtras(series: ExerciseSeries[], extras: Record<string, ExerciseSpec[]>): ExerciseSeries[] {
  const unused = new Set(Object.keys(extras));
  const result = series.map((s) => {
    const more = s.key ? undefined : extras[s.chapter];
    if (!more) return s;
    unused.delete(s.chapter);
    return { ...s, questions: [...s.questions, ...more] };
  });
  if (unused.size) throw new Error(`questions illustrées sans chapitre : ${[...unused].join(", ")}`);
  return result;
}

/**
 * Collège et lycée : questions illustrées rangées par matière puis par titre de chapitre, ajoutées à
 * chaque série du chapitre (au lycée, à toutes les séries du programme qui ont ce chapitre).
 */
export type SubjectExtras = Partial<Record<SubjectCode, Record<string, ExerciseSpec[]>>>;

export function withSubjectExtras(series: ExerciseSeries[], extras: SubjectExtras): ExerciseSeries[] {
  const unused = new Set(Object.entries(extras).flatMap(([subject, chapters]) => Object.keys(chapters ?? {}).map((c) => `${subject} · ${c}`)));
  const result = series.map((s) => {
    const more = s.key ? undefined : extras[s.subject]?.[s.chapter];
    if (!more) return s;
    unused.delete(`${s.subject} · ${s.chapter}`);
    return { ...s, questions: [...s.questions, ...more] };
  });
  if (unused.size) throw new Error(`questions illustrées sans chapitre : ${[...unused].join(", ")}`);
  return result;
}

/** Question à réponse numérique, avec un dessin si on le donne. */
export const howMany = (question: string, answer: number, why: string, fig?: string): ExerciseSpec => ({
  num: tight(question),
  ...(fig ? { fig } : {}),
  answer,
  why: tight(why),
});
