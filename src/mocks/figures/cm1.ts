// Schémas des leçons du CM1 (maths, ESVS), dessinés avec les briques des exercices.

import { svg, text } from "../drawings";
import { clockDrawing } from "../measure";
import { barChart, circleCalc, fmt, fractionBar, translation } from "../upper-math";
import { divisionLayout, splitBar } from "./ce2";
import { bare, beside, columnOp, fig, item, numberLine } from "./parts";

/** Multiplication posée par un nombre de deux chiffres : les deux produits partiels, puis la somme. */
export function longMul(a: number, b: number): string {
  const [u, t] = [b % 10, Math.floor(b / 10)];
  const lines = [String(a), String(b), String(a * u), `${a * t}0`, String(a * b)];
  const n = Math.max(...lines.map((l) => l.length));
  const cw = 26;
  const right = 40 + n * cw;
  const row = (s: string, y: number) => s.split("").map((d, i) => text(right - (s.length - i) * cw + cw / 2, y, d)).join("");
  let body = row(lines[0]!, 22) + row(lines[1]!, 50) + text(18, 50, "×");
  body += `<path class="dg-scale" d="M10 64H${right}"/>`;
  body += row(lines[2]!, 84) + text(right + 30, 84, `${a} × ${u}`, "dg-axis");
  body += row(lines[3]!, 112) + text(18, 112, "+") + text(right + 30, 112, `${a} × ${t}0`, "dg-axis");
  body += `<path class="dg-scale" d="M10 126H${right}"/>` + row(lines[4]!, 146);
  return svg(right + 64, 158, `Multiplication posée : ${a} × ${b}. Produits partiels ${a * u} et ${a * t * 10}, résultat ${a * b}.`, body);
}

/** Des fractions représentées par des bandes de même longueur, l'une sous l'autre. */
export function fractionBars(rows: [number, number][]): string {
  const W = 240;
  let body = "";
  rows.forEach(([num, den], r) => {
    const y = 8 + r * 40;
    body += text(24, y + 14, `${num}/${den}`);
    for (let i = 0; i < den; i++) body += `<rect class="${i < num ? "dg-stick" : "dg-stick-alt"}" x="${50 + (i * W) / den}" y="${y}" width="${W / den}" height="28"/>`;
  });
  return svg(W + 60, rows.length * 40 + 10, `Des bandes partagées : ${rows.map(([n, d]) => `${n}/${d}`).join(", ")}.`, body);
}

/** Les quadrilatères : carré, rectangle, losange, parallélogramme, trapèze. */
function quadrilaterals(): string {
  const shapes: [string, string, number][] = [
    ["M10 20H60V70H10Z", "carré", 35],
    ["M76 30H156V70H76Z", "rectangle", 116],
    ["M196 14L222 45L196 76L170 45Z", "losange", 196],
    ["M246 70L266 26H326L306 70Z", "parallélogramme", 286],
  ];
  let body = "";
  for (const [d, name, x] of shapes) body += `<path class="dg-figure" d="${d}"/>${text(x, 94, name, "dg-axis")}`;
  body += `<path class="dg-figure" d="M120 160L140 116H190L220 160Z"/>${text(170, 178, "trapèze", "dg-axis")}`;
  return svg(336, 186, "Cinq quadrilatères : un carré, un rectangle, un losange, un parallélogramme et un trapèze.", body);
}

/** Un triangle, sa base et sa hauteur en pointillé. */
function triangleArea(): string {
  let body = `<path class="dg-figure" d="M20 130H260L100 30Z"/><path class="dg-dash" d="M100 30V130"/><path class="dg-line" d="M100 120H110V130"/>`;
  body += text(140, 148, "base : 6 cm") + `<text class="dg-axis" x="108" y="106" text-anchor="start" dominant-baseline="central">hauteur : 4 cm</text>`;
  return svg(280, 158, "Un triangle de 6 cm de base et 4 cm de hauteur ; la hauteur est en pointillé.", body);
}

/** Un cube de 1 dm de côté : 1 dm³ = 1 L, et 1 L d'eau pèse 1 kg. */
function litreCube(): string {
  let body = `<path class="dg-solid-top" d="M60 50L100 24H200L160 50Z"/><path class="dg-solid-side" d="M160 50L200 24V124L160 150Z" fill="none"/>`;
  body += `<rect class="dg-object" x="60" y="50" width="100" height="100"/><path class="dg-figure" d="M60 50L100 24H200V124L160 150M160 50L200 24"/>`;
  body += text(110, 166, "10 cm = 1 dm", "dg-axis") + text(250, 70, "1 dm³", "dg-text") + text(250, 96, "= 1 L", "dg-text") + text(250, 122, "= 1 kg d’eau", "dg-axis");
  return svg(310, 176, "Un cube de 10 cm de côté : son volume est 1 dm³, il contient 1 litre ; 1 litre d’eau pèse 1 kg.", body);
}

/** Les trois états de l'eau et les changements d'état. */
function waterStates(): string {
  let body = `<rect class="dg-water" x="20" y="40" width="44" height="44" rx="4"/><rect class="dg-figure" x="20" y="40" width="44" height="44" rx="4"/>`;
  body += item("verre-eau", 160, 62, 64);
  body += `<path class="dg-line" d="M262 80q-8-10 0-20t0-20M276 80q-8-10 0-20t0-20M290 80q-8-10 0-20t0-20"/>`;
  body += text(42, 104, "solide (glace)", "dg-axis") + text(160, 104, "liquide (eau)", "dg-axis") + text(276, 104, "gaz (vapeur)", "dg-axis");
  body += `<path class="dg-arrow" d="M76 50H124m-8-6 8 6-8 6"/><path class="dg-arrow" d="M196 50H244m-8-6 8 6-8 6"/>`;
  body += `<path class="dg-arrow" d="M124 76H76m8-6-8 6 8 6"/><path class="dg-arrow" d="M244 76H196m8-6-8 6 8 6"/>`;
  body += text(100, 36, "fusion", "dg-axis") + text(220, 36, "évaporation", "dg-axis") + text(100, 92, "solidification", "dg-axis") + text(220, 92, "condensation", "dg-axis");
  return svg(320, 114, "Les trois états de l’eau : solide, liquide, gaz, et les flèches des changements d’état.", body);
}

/** Deux bougies : celle qui est à l'air brûle, celle sous un verre retourné s'éteint. */
function candles(): string {
  const candle = (x: number, lit: boolean) =>
    `<rect class="dg-note" x="${x - 10}" y="70" width="20" height="50"/><path class="dg-line" d="M${x} 70V62"/>` + (lit ? `<path class="dg-capital" d="M${x} 40Q${x + 9} 54 ${x} 62Q${x - 9} 54 ${x} 40Z"/>` : "");
  let body = `<path class="dg-scale" d="M10 120H290"/>` + candle(80, true) + candle(220, false);
  body += `<path class="dg-figure" d="M186 120V36Q186 26 196 26H244Q254 26 254 36V120"/>`;
  body += text(80, 140, "à l’air : elle brûle", "dg-axis") + text(220, 140, "sous le verre : elle s’éteint", "dg-axis");
  return svg(300, 150, "Deux bougies : celle à l’air libre brûle ; celle sous un verre retourné s’est éteinte.", body);
}

/** De la fleur à la graine, puis à la nouvelle plante. */
function flowerCycle(): string {
  const steps: [Parameters<typeof item>[0], string][] = [
    ["fleur", "la fleur"],
    ["mangue", "le fruit"],
    ["plante", "la jeune plante"],
  ];
  let body = "";
  steps.forEach(([p, label], i) => {
    const x = 50 + i * 110;
    body += item(p, x, 50, 60) + text(x, 100, label, "dg-axis");
    if (i < steps.length - 1) body += `<path class="dg-arrow" d="M${x + 34} 50H${x + 76}m-8-6 8 6-8 6"/>`;
  });
  body += text(165, 124, "le pollen féconde la fleur → le fruit → la graine germe", "dg-axis");
  return svg(330, 134, "De la fleur au fruit, puis la graine germe et donne une jeune plante.", body);
}

/** Traverser au passage piéton. */
function crossing(): string {
  let body = `<rect class="dg-stick-alt" x="0" y="20" width="320" height="16"/><rect class="dg-stick-alt" x="0" y="124" width="320" height="16"/>`;
  body += `<rect class="dg-object" x="0" y="36" width="320" height="88"/>`;
  for (let i = 0; i < 6; i++) body += `<rect class="dg-note" x="140" y="${40 + i * 14}" width="44" height="8"/>`;
  body += item("feu-tricolore", 206, 10, 40) + item("eleve-garcon", 162, 150, 34);
  body += `<path class="dg-arrow" d="M120 150H90m8-6-8 6 8 6"/><path class="dg-arrow" d="M204 150H234m-8-6 8 6-8 6"/>`;
  body += text(60, 150, "je regarde", "dg-axis") + text(276, 150, "je regarde", "dg-axis") + text(70, 80, "la route", "dg-axis") + text(260, 80, "passage piéton", "dg-axis");
  return svg(320, 170, "Une route et un passage piéton ; un enfant regarde à gauche et à droite avant de traverser, au feu.", body);
}

export const SCHEMAS_CM1: Record<string, string> = {
  // Maths : nombres et calcul
  "cm1-million": numberLine(1200000, 1300000, 10000, [[1250430, "A"]], fmt),
  "cm1-addition": columnOp(48975, "+", 36250),
  "cm1-multiplication": longMul(245, 32),
  "cm1-division": divisionLayout(1248, 24),
  "cm1-decimal": numberLine(4000, 4100, 10, [[4075, "A"]], (v) => (v / 1000).toFixed(3).replace(".", ",")),
  "cm1-fraction": fig(fractionBar(5, 3)),
  "cm1-fractions-comparer": fractionBars([[5, 8], [3, 8]]),
  "cm1-fractions-somme": fractionBars([[2, 7], [3, 7], [5, 7]]),
  // Maths : géométrie
  "cm1-quadrilateres": quadrilaterals(),
  "cm1-translation": fig(translation(4, 2, "droite")),
  "cm1-cercle": fig(circleCalc("diamètre", 4)),
  "cm1-triangle-aire": triangleArea(),
  "cm1-litre": litreCube(),
  // Maths : mesures et problèmes
  "cm1-durees": beside(bare(clockDrawing(7, 45)), "→", bare(clockDrawing(9, 20)), "De 7 h 45 à 9 h 20."),
  "cm1-vitesse": numberLine(0, 180, 20, [[60, "1 h"], [120, "2 h"], [180, "3 h"]], (v) => `${v} km`),
  "cm1-budget": splitBar([["dépenses : 85 000 F", 85000], ["économie : 15 000 F", 15000]], "recettes : 100 000 F"),
  "cm1-parts-inegales": splitBar([["Awa : 7 000 F", 7000], ["Modou : 5 000 F", 5000]], "12 000 F à partager"),
  "cm1-graphique": fig(barChart("Élèves par classe", ["CE2", "CM1", "CM2"], [45, 40, 50], 10, "CM1", "Combien d’élèves en CM1 ?")),
  // ESVS
  "cm1-etats-eau": waterStates(),
  "cm1-bougies": candles(),
  "cm1-fleur-graine": flowerCycle(),
  "cm1-passage-pieton": crossing(),
};
