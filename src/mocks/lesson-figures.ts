// Figures explicatives des leçons du primaire : dessins réalistes de public/illustrations et schémas
// générés (public/illustrations/schemas, voir mocks/figures). Une figure est une image avec sa légende,
// placée à l'endroit où la leçon explique la notion ; la légende est lue par « Écouter ».
// Uniquement des balises et classes gardées par lib/sanitize.ts (l'admin peut ensuite modifier la leçon).

import { esc, pictureSize, type PictureName } from "./drawings";
import { SCHEMAS, schemaSize } from "./figures";

const image = (src: string, alt: string, width: number, height: number) =>
  `<img src="${src}" alt="${esc(alt)}" width="${width}" height="${height}" loading="lazy">`;

/**
 * Espaces insécables : avant ? : ! ; » et après « , autour d'un signe entre deux nombres et entre
 * les classes d'un grand nombre (« 3 + 2 = 5 », « 2 000 F » ne se coupent jamais en fin de ligne).
 */
export const tight = (text: string) =>
  text
    .replace(/ ([?:!;»])/g, " $1")
    .replace(/« /g, "« ")
    .replace(/(\d) ([+−×÷=<>-]) (?=\d)/g, "$1 $2 ")
    .replace(/(?<=\d) (?=\d{3}(?!\d))/g, " ");

/** Figure complète : son contenu (dessins, schéma) et sa légende. */
export function figure(content: string, caption: string): string {
  return `<figure class="lesson-figure">${content}<figcaption>${tight(caption)}</figcaption></figure>`;
}

/** Un dessin de la banque, avec son nom écrit dessous si on le donne. */
export function pic(name: PictureName, label?: string, height = 64, alt = label ?? name): string {
  const [w, h] = pictureSize(name);
  const tag = image(`/illustrations/${name}.svg`, alt, Math.round((height * w) / h), height);
  return `<span class="lf-item">${tag}${label ? `<span class="lf-label">${label}</span>` : ""}</span>`;
}

/** Plusieurs dessins côte à côte (ils passent à la ligne sur un petit écran). */
export const row = (...items: string[]) => `<span class="lf-row">${items.join("")}</span>`;

/** Le même dessin plusieurs fois, pour compter : la description dit combien il y en a. */
export function many(name: PictureName, count: number, alt: string, height = 40): string {
  const [w, h] = pictureSize(name);
  const tags = Array.from({ length: count }, (_, i) => image(`/illustrations/${name}.svg`, i === 0 ? alt : "", Math.round((height * w) / h), height));
  return `<span class="lf-row">${tags.join("")}</span>`;
}

/** Des objets à compter, avec leur nombre (ou une courte phrase, ou « + 5 », « = 12 ») écrit dessous. */
export function counted(name: PictureName, count: number, label: string, height = 34): string {
  return `<span class="lf-item">${many(name, count, `${count} ${label.replace(/^[+−=]?\s*\d+\s*/, "")}`.trim(), height)}<span class="lf-label">${label}</span></span>`;
}

/** Un signe ou un mot entre deux dessins (+, =, →…). */
export const sign = (text: string) => `<span class="lf-label">${text}</span>`;

/** Schéma généré (droite graduée, tableau de numération, figure géométrique…). */
export function schema(id: string, alt: string): string {
  if (!(id in SCHEMAS)) throw new Error(`schéma inconnu : ${id}`);
  const [w, h] = schemaSize(id);
  return image(`/illustrations/schemas/${id}.svg`, alt, w, h);
}

/** Mot avec une partie mise en évidence (le son étudié) : « m<b>a</b>ngue ». */
export const highlight = (word: string, part: string) => word.replace(part, `<strong class="lf-hl">${part}</strong>`);
