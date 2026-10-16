// Briques HTML des leçons de 3e (classes de lib/sanitize.ts : callout, example, formula, frac).
// Leçons rédigées par DIANGAL d'après les chapitres relevés (docs/programme/releve-ci-3e.md),
// à faire valider par des enseignants.

import type { LessonResource } from "@/types/domain";

export interface Lesson3eSpec {
  title: string;
  /** Corps de la leçon, en HTML déjà assaini (balises de la liste blanche). */
  body: string;
  minutes?: number;
  resources?: LessonResource[];
}

export interface Chapter3eSpec {
  title: string;
  summary: string;
  lessons: Lesson3eSpec[];
}

/** Fraction affichée (classe « frac »). */
export const frac = (num: string, den: string) => `<span class="frac"><span>${num}</span><span>${den}</span></span>`;

/** Formule mise en avant. */
export const formula = (html: string) => `<p class="formula">${html}</p>`;

/** Encadré « À retenir ». */
export function retenir(html: string, title = "À retenir"): string {
  return `<div class="callout"><p class="callout-title">${title}</p><p>${html}</p></div>`;
}

/** Exemple ou exercice corrigé. */
export function exemple(paragraphs: string[], title = "Exemple"): string {
  return `<div class="example"><p class="callout-title">${title}</p>${paragraphs.map((p) => `<p>${p}</p>`).join("")}</div>`;
}

/** Méthode en étapes numérotées. */
export function methode(steps: string[], title = "Méthode"): string {
  return `<div class="callout"><p class="callout-title">${title}</p><ol>${steps.map((s) => `<li>${s}</li>`).join("")}</ol></div>`;
}

/** Liste à puces. */
export function liste(items: string[]): string {
  return `<ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;
}

/** Tableau simple : première ligne = en-têtes. */
export function tableau(rows: string[][]): string {
  const [head, ...body] = rows;
  return `<table><thead><tr>${head!.map((h) => `<th scope="col">${h}</th>`).join("")}</tr></thead><tbody>${body
    .map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join("")}</tr>`)
    .join("")}</tbody></table>`;
}
