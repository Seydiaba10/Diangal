// Schémas des sujets blancs du CFEE : figures à construire (corrigés) et dessins à reproduire.

import { svg, text } from "../drawings";

const triangle = (() => {
  let body = `<path class="dg-figure" d="M30 130H270L100 30Z"/><path class="dg-dash" d="M100 30V130"/><path class="dg-line" d="M100 120H110V130"/>`;
  body += text(150, 148, "base : 12 cm", "dg-axis") + text(158, 112, "hauteur : 7 cm", "dg-axis");
  return svg(300, 158, "Un triangle de base 12 cm et de hauteur 7 cm ; la hauteur est tracée en pointillé.", body);
})();

const losange = (() => {
  let body = `<path class="dg-figure" d="M30 80L150 20L270 80L150 140Z"/><path class="dg-dash" d="M30 80H270M150 20V140"/><path class="dg-line" d="M150 70H160V80"/>`;
  body += text(215, 92, "8 cm", "dg-axis") + text(172, 112, "6 cm", "dg-axis");
  return svg(300, 156, "Un losange : sa grande diagonale mesure 8 cm et sa petite diagonale 6 cm ; elles sont perpendiculaires.", body);
})();

const disque = (() => {
  const body = `<circle class="dg-figure" cx="150" cy="80" r="66"/><circle class="dg-node" cx="150" cy="80" r="3"/><path class="dg-dash" d="M150 80H216"/>${text(138, 80, "O", "dg-axis")}${text(184, 68, "5 cm", "dg-axis")}`;
  return svg(300, 156, "Un disque de centre O et de rayon 5 cm.", body);
})();

const parallelogramme = (() => {
  let body = `<path class="dg-figure" d="M30 120H210L270 40H90Z"/><path class="dg-dash" d="M90 40V120"/><path class="dg-line" d="M90 110H100V120"/>`;
  body += text(120, 138, "base : 9 cm", "dg-axis") + text(142, 82, "hauteur : 5 cm", "dg-axis");
  return svg(300, 148, "Un parallélogramme de base 9 cm et de hauteur 5 cm.", body);
})();

/** Éducation artistique, sujet n°1 : dessin à reproduire. */
const mangue = (() => {
  const branche = `<path class="dg-figure" d="M20 44C90 30 180 34 280 62"/>`;
  const feuilles = `<path class="dg-figure" d="M62 37C72 8 112 6 124 33C102 48 78 48 62 37Z"/><path class="dg-line" d="M62 37L124 33"/><path class="dg-figure" d="M196 44C214 16 256 18 272 56C248 70 216 66 196 44Z"/><path class="dg-line" d="M196 44L272 56"/>`;
  const fruit = `<path class="dg-figure" d="M152 36V66"/><path class="dg-figure" d="M152 66C196 66 220 108 208 150C198 186 148 202 122 174C96 146 104 66 152 66Z"/>`;
  return svg(300, 210, "Une mangue qui pend à une branche, avec deux feuilles.", `${branche}${feuilles}${fruit}`);
})();

/** Éducation artistique, sujet n°2 : dessin à reproduire. */
const pirogue = (() => {
  const coque = `<path class="dg-figure" d="M16 104C60 150 240 150 284 104L252 112C200 124 100 124 48 112Z"/><path class="dg-line" d="M52 122C100 134 200 134 248 122"/>`;
  const voile = `<path class="dg-figure" d="M150 118V18"/><path class="dg-figure" d="M150 24L226 96H150Z"/>`;
  const vagues = `<path class="dg-figure" d="M10 172C40 160 60 184 90 172S140 160 170 172S230 184 290 166"/>`;
  return svg(300, 190, "Une pirogue à voile sur les vagues.", `${coque}${voile}${vagues}`);
})();

export const SCHEMAS_CFEE: Record<string, string> = {
  "cfee-triangle": triangle,
  "cfee-losange": losange,
  "cfee-disque": disque,
  "cfee-parallelogramme": parallelogramme,
  "cfee-dessin-mangue": mangue,
  "cfee-dessin-pirogue": pirogue,
};
