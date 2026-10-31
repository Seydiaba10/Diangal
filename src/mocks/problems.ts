import "server-only";

// Résolution de problèmes au primaire : données d'un énoncé, données utiles, inutiles ou manquantes,
// questions et consignes, question finale et questions intermédiaires, énoncé à remettre en ordre,
// démarche progressive. Les calculs sont faits ici ; les questions de lecture sont rédigées à la main.

import type { ExerciseSpec } from "./exercise-series";

const L = (i: number) => String.fromCharCode(65 + i);

/** Nombre de données numériques d'un énoncé (les nombres en gras). */
export function countData(text: string): ExerciseSpec {
  // Grands nombres : espace insécable entre les classes (« 3 500 »).
  const story = text.replace(/(\d) (\d{3})(?!\d)/g, "$1 $2");
  const numbers = [...story.matchAll(/<strong>(\d[\d ]*)<\/strong>/g)].map((m) => m[1]!);
  return {
    num: `${story}<br>Combien de <strong>données numériques</strong> (nombres) y a-t-il dans cet énoncé ?`,
    answer: numbers.length,
    why: `Les nombres de l’énoncé sont ${numbers.join(", ")} : <strong>${numbers.length}</strong> données numériques.`,
  };
}

/**
 * Question à lettres : l'énoncé, puis des propositions « A : … », « B : … » ; la bonne est désignée
 * par son rang. why : l'explication (la bonne lettre est mise en tête de la correction).
 */
export function lettered(story: string, ask: string, items: string[], good: number, why: string): ExerciseSpec {
  return {
    qcm: `${story}<br>${ask}<br>${items.map((it, i) => `<strong>${L(i)}</strong> : ${it}`).join("<br>")}`,
    choices: items.map((_, i) => (i === good ? `*${L(i)}` : L(i))),
    why: `<strong>${L(good)}</strong> : ${why}`,
  };
}

/** Énoncé (ou étapes) en désordre : écrire les lettres dans le bon ordre. */
export function orderStatement(parts: string[], order: number[], why: string, intro = "Voici un énoncé en désordre :"): ExerciseSpec {
  const letters = order.map(L);
  return {
    text: `${intro}<br>${parts.map((p, i) => `<strong>${L(i)}</strong> : ${p}`).join("<br>")}<br>Écris les lettres dans le bon ordre, séparées par des espaces.`,
    answer: letters.join(" "),
    accept: [letters.join(", "), letters.join(""), letters.join(" - "), letters.join(" → ")],
    why: `<strong>${letters.join(" → ")}</strong> : ${why}`,
  };
}

type Op = "+" | "−";
const run = (a: number, op: Op, b: number) => (op === "+" ? a + b : a - b);

/** Ce qui reste : on calcule d'abord ce qui est utilisé (question intermédiaire), puis on l'enlève du total. */
export function whatRemains(story: string, total: number, a: number, b: number, unit: string): ExerciseSpec {
  const used = a + b;
  if (used > total) throw new Error(`whatRemains : ${a} + ${b} dépasse ${total}`);
  return {
    num: `${story}<br>Résous le problème étape par étape et écris la réponse finale.`,
    answer: total - used,
    why: `Question intermédiaire : ${a} + ${b} = ${used}. Question finale : ${total} − ${used} = <strong>${total - used}</strong> ${unit}.`,
  };
}

/** Démarche progressive : deux opérations, la question intermédiaire puis la question finale. */
export function twoSteps(story: string, a: number, op1: Op, b: number, op2: Op, c: number, unit: string): ExerciseSpec {
  const r1 = run(a, op1, b);
  const r2 = run(r1, op2, c);
  return {
    num: `${story}<br>Résous le problème étape par étape et écris la réponse finale.`,
    answer: r2,
    why: `Question intermédiaire : ${a} ${op1} ${b} = ${r1}. Question finale : ${r1} ${op2} ${c} = <strong>${r2}</strong> ${unit}.`,
  };
}
