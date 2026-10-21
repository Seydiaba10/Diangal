// Briques HTML des leçons de Terminale : les mêmes que celles de la 3e (classes de lib/sanitize.ts),
// plus quelques notations. Leçons rédigées par DIANGAL d'après les programmes officiels mis en
// ligne par l'Office du Bac (docs/programme/programme-tle.md), à faire valider par des enseignants.

import type { Chapter3eSpec } from "../3e/blocks";

/** Chapitre de Terminale ; strand = domaine du programme (philosophie) ou discipline (histoire, géographie). */
export type ChapterSpec = Chapter3eSpec & { strand?: string };

export {
  type Lesson3eSpec as LessonSpec,
  exemple,
  formula,
  frac,
  liste,
  methode,
  retenir,
  tableau,
} from "../3e/blocks";

/** Exposant : x<sup>2</sup>. */
export const sup = (html: string) => `<sup>${html}</sup>`;

/** Indice : u<sub>n</sub>. */
export const sub = (html: string) => `<sub>${html}</sub>`;

/** Racine carrée d'une expression courte. */
export const sqrt = (html: string) => `√${html}`;

/** Vecteur : AB⃗ (flèche combinante, comme dans les leçons de 3e). */
export const vec = (name: string) => `${name}⃗`;

/** Terme de suite : u<sub>n</sub>. */
export const u = (index: string, name = "u") => `${name}<sub>${index}</sub>`;

/** Encadré d'ouverture : ce que l'élève saura faire à la fin de la leçon. */
export const objectifs = (items: string[]) =>
  `<div class="callout"><p class="callout-title">Objectifs</p><ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul></div>`;

/** Exercice corrigé : énoncé, puis solution en étapes numérotées. */
export const exercice = (enonce: string, solution: string[], title = "Exercice corrigé") =>
  `<div class="example"><p class="callout-title">${title}</p><p>${enonce}</p><p><strong>Solution</strong></p><ol>${solution
    .map((step) => `<li>${step}</li>`)
    .join("")}</ol></div>`;

/** Conseil pour l'épreuve du baccalauréat. */
export const auBac = (html: string) => `<div class="callout"><p class="callout-title">Au Bac</p><p>${html}</p></div>`;

/** Erreurs fréquentes à éviter. */
export const erreurs = (items: string[]) =>
  `<div class="example"><p class="callout-title">Erreurs à éviter</p><ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul></div>`;

/** Définition mise en avant. */
export const definition = (term: string, html: string) =>
  `<div class="callout"><p class="callout-title">Définition : ${term}</p><p>${html}</p></div>`;
