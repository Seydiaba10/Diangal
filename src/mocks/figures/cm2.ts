// Schémas des leçons du CM2 (maths, ESVS), dessinés avec les briques des exercices.

import { svg, text, type PictureName } from "../drawings";
import { clockDrawing, notesDrawing } from "../measure";
import { barChart, fmt } from "../upper-math";
import { divisionLayout, splitBar } from "./ce2";
import { fractionBars, longMul } from "./cm1";
import { bare, beside, columnOp, fig, item, numberLine } from "./parts";

const decimal = (v: number, digits: number) => (v / 10 ** digits).toFixed(digits).replace(".", ",").replace(/,?0+$/, "");

/** Un quadrillage de 100 carreaux, dont « percent » sont coloriés. */
function percentGrid(percent: number): string {
  let body = "";
  for (let i = 0; i < 100; i++) {
    const [r, c] = [Math.floor(i / 10), i % 10];
    body += `<rect class="${i < percent ? "dg-stick" : "dg-stick-alt"}" x="${10 + c * 16}" y="${10 + r * 16}" width="16" height="16"/>`;
  }
  body += text(250, 90, `${percent} %`) + text(250, 112, `= ${percent}/100`, "dg-axis");
  return svg(300, 180, `Un carré de 100 carreaux, dont ${percent} sont coloriés : ${percent} %.`, body);
}

/** Une distance sur une carte et la barre d'échelle. */
function scaleBar(): string {
  let body = `<rect class="dg-land" x="10" y="10" width="300" height="100" rx="6"/>`;
  body += `<circle class="dg-capital" cx="60" cy="60" r="5"/><circle class="dg-capital" cx="220" cy="60" r="5"/><path class="dg-path" d="M60 60H220"/>`;
  body += text(60, 40, "A") + text(220, 40, "B") + text(140, 78, "4 cm sur la carte", "dg-axis");
  body += `<path class="dg-scale" d="M40 132H80"/><path class="dg-line" d="M40 126V138M80 126V138"/>${text(60, 150, "1 cm = 500 m", "dg-axis")}`;
  body += text(220, 140, "Échelle 1/50 000", "dg-axis");
  return svg(320, 160, "Une carte : entre A et B, 4 cm ; la barre d’échelle indique 1 cm pour 500 m.", body);
}

/** Un parallélogramme et un trapèze avec leur hauteur en pointillé. */
function heights(): string {
  let body = `<path class="dg-figure" d="M10 110L50 30H150L110 110Z"/><path class="dg-dash" d="M50 30V110"/><path class="dg-line" d="M50 100H60V110"/>`;
  body += text(60, 128, "base", "dg-axis") + text(66, 70, "h", "dg-axis");
  body += `<path class="dg-figure" d="M180 110L210 30H270L310 110Z"/><path class="dg-dash" d="M210 30V110"/><path class="dg-line" d="M210 100H220V110"/>`;
  body += text(245, 128, "grande base", "dg-axis") + text(240, 20, "petite base", "dg-axis") + text(222, 70, "h", "dg-axis");
  return svg(320, 138, "Un parallélogramme et un trapèze, avec leur hauteur h en pointillé.", body);
}

/** Les polygones et leur nom selon le nombre de côtés. */
function polygons(): string {
  const regular = (cx: number, cy: number, n: number, r: number) =>
    "M" + Array.from({ length: n }, (_, i) => {
      const a = -Math.PI / 2 + (i * 2 * Math.PI) / n;
      return `${(cx + Math.cos(a) * r).toFixed(1)} ${(cy + Math.sin(a) * r).toFixed(1)}`;
    }).join("L") + "Z";
  const shapes: [number, string][] = [[3, "triangle (3)"], [4, "quadrilatère (4)"], [5, "pentagone (5)"], [6, "hexagone (6)"], [8, "octogone (8)"]];
  let body = "";
  shapes.forEach(([n, name], i) => {
    const cx = 54 + (i % 3) * 106;
    const cy = 36 + Math.floor(i / 3) * 90;
    body += `<path class="dg-figure" d="${regular(cx, cy, n, 26)}"/>${text(cx, cy + 40, name, "dg-axis")}`;
  });
  return svg(320, 186, "Des polygones : triangle, quadrilatère, pentagone, hexagone et octogone, avec leur nombre de côtés.", body);
}

/** Un rectangle et son agrandissement (longueurs × 2) sur un quadrillage. */
function enlarge(): string {
  let body = "";
  for (let r = 0; r <= 6; r++) body += `<line class="dg-grid" x1="6" y1="${6 + r * 20}" x2="306" y2="${6 + r * 20}"/>`;
  for (let c = 0; c <= 15; c++) body += `<line class="dg-grid" x1="${6 + c * 20}" y1="6" x2="${6 + c * 20}" y2="126"/>`;
  body += `<rect class="dg-shape-fill" x="26" y="46" width="60" height="40"/><rect class="dg-figure" x="26" y="46" width="60" height="40"/>${text(56, 66, "A")}`;
  body += `<rect class="dg-solid" x="126" y="26" width="120" height="80"/><rect class="dg-figure" x="126" y="26" width="120" height="80"/>${text(186, 66, "B")}`;
  return svg(312, 132, "Un rectangle A de 3 carreaux sur 2 et son agrandissement B de 6 carreaux sur 4.", body);
}

/** Un pavé droit fait de petits cubes : 4 × 3 × 2. */
function boxOfCubes(): string {
  const s = 26;
  const [ox, oy] = [30, 70];
  let body = "";
  for (let z = 0; z < 2; z++)
    for (let y = 0; y < 3; y++)
      for (let x = 0; x < 4; x++) {
        const px = ox + x * s + y * 12;
        const py = oy + 2 * s - z * s - y * 9;
        if (y === 0) body += `<rect class="dg-stick" x="${px}" y="${py - s}" width="${s}" height="${s}"/>`;
        if (z === 1) body += `<path class="dg-solid-top" d="M${px} ${py - s}l12 -9h${s}l-12 9Z"/><path class="dg-figure" d="M${px} ${py - s}l12 -9h${s}l-12 9Z"/>`;
        if (x === 3) body += `<path class="dg-solid-side" d="M${px + s} ${py}l12 -9v${-s}l-12 9Z" fill="none"/><path class="dg-figure" d="M${px + s} ${py}l12 -9v${-s}l-12 9Z"/>`;
      }
  body += text(82, 138, "longueur : 4 cm", "dg-axis") + text(220, 70, "largeur : 3 cm", "dg-axis") + text(226, 104, "hauteur : 2 cm", "dg-axis");
  return svg(300, 148, "Un pavé droit fait de petits cubes de 1 cm³ : 4 cubes de long, 3 de large, 2 de haut.", body);
}

/** Des étapes reliées par des flèches (un organe, puis le suivant). */
function flow(steps: string[], label: string): string {
  let body = "";
  steps.forEach((s, i) => {
    const y = 10 + i * 40;
    body += `<rect class="dg-note" x="60" y="${y}" width="200" height="28" rx="8"/>${text(160, y + 14, s, "dg-axis")}`;
    if (i < steps.length - 1) body += `<path class="dg-arrow" d="M160 ${y + 28}V${y + 40}m-5-6 5 6 5-6"/>`;
  });
  return svg(320, steps.length * 40 + 10, label, body);
}

/** Une chaîne alimentaire avec des dessins. */
function foodChain(): string {
  const chain: [PictureName, string][] = [
    ["plante", "l’herbe"],
    ["chevre", "la chèvre"],
    ["lion", "le lion"],
  ];
  let body = "";
  chain.forEach(([p, label], i) => {
    const x = 50 + i * 110;
    body += item(p, x, 46, 56) + text(x, 96, label, "dg-axis");
    if (i < chain.length - 1) body += `<path class="dg-arrow" d="M${x + 34} 46H${x + 76}m-8-6 8 6-8 6"/>`;
  });
  body += text(165, 120, "la flèche veut dire « est mangé par »", "dg-axis");
  return svg(330, 130, "Une chaîne alimentaire : l’herbe est mangée par la chèvre, qui est mangée par le lion.", body);
}

/** Frise des grands empires d'Afrique de l'Ouest, dans l'ordre. */
function empires(): string {
  const rows: [string, string][] = [
    ["Ghana (Wagadou)", "affaibli au XIe siècle"],
    ["Mali", "fondé vers 1235 (Kirina)"],
    ["Songhaï", "détruit en 1591 (Tondibi)"],
  ];
  // Frise verticale : le temps descend ; le nom et le repère sont écrits à droite.
  let body = `<path class="dg-arrow" d="M30 10V190m-6-8 6 8 6-8"/>`;
  rows.forEach(([name, mark], i) => {
    const y = 34 + i * 60;
    const left = (value: string, dy: number, cls: string) => `<text class="${cls}" x="48" y="${y + dy}" text-anchor="start" dominant-baseline="central">${value}</text>`;
    body += `<circle class="dg-node" cx="30" cy="${y}" r="6"/>${left(name, -8, "dg-text")}${left(mark, 12, "dg-axis")}`;
  });
  return svg(300, 200, "Une frise : l’empire du Ghana, puis l’empire du Mali, puis l’empire songhaï.", body);
}

export const SCHEMAS_CM2: Record<string, string> = {
  // Maths : nombres et calcul
  "cm2-millions": numberLine(3000000, 4000000, 100000, [[3405270, "A"]], fmt),
  "cm2-addition": columnOp(256485, "+", 137926),
  "cm2-multiplication": longMul(408, 25),
  "cm2-division": divisionLayout(5875, 25),
  "cm2-decimal": numberLine(15000, 16000, 100, [[15375, "A"]], (v) => decimal(v, 3)),
  "cm2-decimaux-comparer": numberLine(2000, 3000, 100, [[2350, "A"], [2700, "B"]], (v) => decimal(v, 3)),
  "cm2-fractions-egales": fractionBars([[2, 4], [1, 2]]),
  "cm2-fractions-comparer": fractionBars([[8, 12], [9, 12]]),
  "cm2-fractions-somme": fractionBars([[2, 4], [1, 4], [3, 4]]),
  "cm2-fraction-grandeur": splitBar([["les 3/5 : 4 500 F", 4500], ["les 2/5 : 3 000 F", 3000]], "7 500 F"),
  "cm2-pourcent": percentGrid(15),
  "cm2-echelle": scaleBar(),
  // Maths : géométrie et mesures
  "cm2-hauteurs": heights(),
  "cm2-polygones": polygons(),
  "cm2-agrandir": enlarge(),
  "cm2-pave": boxOfCubes(),
  "cm2-durees": beside(bare(clockDrawing(10, 40)), "→", bare(clockDrawing(1, 15)), "De 10 h 40 à 13 h 15."),
  "cm2-vitesse": numberLine(0, 240, 40, [[80, "1 h"], [160, "2 h"], [240, "3 h"]], (v) => `${v} km`),
  "cm2-capital": notesDrawing([10000, 10000, 10000, 10000, 10000], 3),
  "cm2-budget": splitBar([["dépenses : 180 000 F", 180000], ["épargne : 20 000 F", 20000]], "salaire : 200 000 F"),
  "cm2-moyenne": fig(barChart("Notes de Fatou", ["maths", "français", "sciences"], [14, 12, 16], 2, "maths", "Quelle note en maths ?")),
  // ESVS
  "cm2-empires": empires(),
  "cm2-digestion": flow(["la bouche", "l’œsophage", "l’estomac", "l’intestin grêle", "le gros intestin"], "Le trajet des aliments : la bouche, l’œsophage, l’estomac, l’intestin grêle, le gros intestin."),
  "cm2-respiration": flow(["le nez ou la bouche", "la trachée", "les bronches", "les poumons (alvéoles)"], "Le trajet de l’air : le nez ou la bouche, la trachée, les bronches, les poumons."),
  "cm2-circulation": flow(["le cœur (la pompe)", "les artères", "les organes", "les veines", "retour au cœur"], "La circulation : le cœur envoie le sang dans les artères, vers les organes ; il revient par les veines."),
  "cm2-chaine": foodChain(),
};
