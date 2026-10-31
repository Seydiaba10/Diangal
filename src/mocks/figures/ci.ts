// Schémas des leçons du CI (maths, français, ESVS), dessinés avec les briques des exercices.

import { svg, tensUnits, text, type PictureName } from "../drawings";
import { besideOf, inQueue, levels, longest, race, setsDrawing, solidsDrawing } from "../early-math";
import { figuresDrawing, gridDrawing, linesDrawing } from "../geometry";
import { balanceDrawing, distancesDrawing, glassesDrawing } from "../measure";
import { bare, fig, item, rhythm } from "./parts";

/** Bols de billes avec leur mot : beaucoup, peu, rien. */
function bowls(counts: number[], words: string[]): string {
  let body = "";
  counts.forEach((n, i) => {
    const x = 10 + i * 100;
    body += `<path class="dg-pan" d="M${x} 60h84q-6 34-42 34t-42-34Z"/>`;
    for (let k = 0; k < n; k++) body += `<circle class="dg-token" cx="${x + 18 + (k % 5) * 12}" cy="${80 - Math.floor(k / 5) * 11}" r="5.5"/>`;
    body += text(x + 42, 116, words[i]!, "dg-text");
  });
  return svg(306, 126, `Trois bols : ${counts.map((n, i) => `${words[i]} (${n} billes)`).join(", ")}.`, body);
}

/** Enlever : des jetons, dont certains barrés. */
function crossed(total: number, removed: number): string {
  let body = "";
  for (let i = 0; i < total; i++) {
    const cx = 24 + i * 40;
    body += `<circle class="dg-token" cx="${cx}" cy="30" r="14"/>`;
    if (i >= total - removed) body += `<path class="dg-arrow" d="M${cx - 16} 14L${cx + 16} 46M${cx + 16} 14L${cx - 16} 46"/>`;
  }
  return svg(total * 40 + 8, 60, `${total} jetons ; on en enlève ${removed}, qui sont barrés.`, body);
}

/** Le soleil le matin, à midi et le soir. */
function sunDay(): string {
  const spots = [
    [50, 86, "matin"],
    [160, 26, "midi"],
    [270, 86, "soir"],
  ] as const;
  let body = `<path class="dg-scale" d="M8 110H312"/><path class="dg-dash" d="M50 86Q160 -30 270 86"/>`;
  for (const [x, y, word] of spots) body += item("soleil", x, y, 40) + text(x, 128, word, "dg-text");
  return svg(320, 140, "Le soleil se lève le matin, est haut à midi et se couche le soir.", body);
}

/** Les gestes d'écriture : trait, rond, pont, boucle. */
function strokes(): string {
  const body =
    `<path class="dg-figure" d="M20 20V80"/>` +
    `<circle class="dg-figure" cx="95" cy="50" r="28"/>` +
    `<path class="dg-figure" d="M150 80V45Q175 10 200 45V80"/>` +
    `<path class="dg-figure" d="M240 80C245 40 280 10 285 40C290 70 255 80 262 50C268 25 300 40 300 80"/>` +
    text(20, 102, "trait", "dg-text") +
    text(95, 102, "rond", "dg-text") +
    text(175, 102, "pont", "dg-text") +
    text(270, 102, "boucle", "dg-text");
  return svg(320, 112, "Quatre gestes d’écriture : un trait, un rond, un pont et une boucle.", body);
}

/** Le jour et la nuit : la Terre éclairée d'un côté par le soleil. */
function dayNight(): string {
  const body =
    item("soleil", 40, 60, 64) +
    `<circle class="dg-solid-top" cx="200" cy="60" r="48"/>` +
    `<path class="dg-solid-side" d="M200 12A48 48 0 0 1 200 108Z"/>` +
    text(176, 60, "jour", "dg-text") +
    `<text class="dg-kg" x="224" y="60" text-anchor="middle" dominant-baseline="central">nuit</text>` +
    `<path class="dg-arrow" d="M80 60H140m-8-6 8 6-8 6"/>`;
  return svg(270, 120, "Le soleil éclaire la moitié de la Terre : c’est le jour de ce côté, la nuit de l’autre.", body);
}

/** Les moments de la journée d'un enfant, dans l'ordre. */
function dayTimeline(): string {
  const steps: [PictureName, string][] = [
    ["soleil", "le matin"],
    ["ecole", "à l’école"],
    ["bol", "le repas"],
    ["lune", "la nuit"],
  ];
  let body = `<path class="dg-arrow" d="M10 96H300m-8-6 8 6-8 6"/>`;
  steps.forEach(([p, word], i) => {
    const x = 40 + i * 76;
    body += item(p, x, 50, 46) + `<circle class="dg-node" cx="${x}" cy="96" r="5"/>` + text(x, 118, word, "dg-axis");
  });
  return svg(310, 130, "Ma journée dans l’ordre : je me lève, je vais à l’école, je mange, je dors.", body);
}

export const SCHEMAS_CI: Record<string, string> = {
  // Maths : se repérer dans l'espace
  "ci-sur-sous": fig(levels("table", ["pasteque"], ["ballon"], "sur")),
  "ci-file": fig(inQueue([["Awa", "fille"], ["Modou", "garçon"], ["Fatou", "fille"]], "Modou", "devant")),
  "ci-rangee": fig(besideOf(["mangue", "ballon", "cahier"], "ballon", "droite")),
  "ci-pres-loin": bare(distancesDrawing("eleve-garcon", [[120, 40], [250, 120]], "ballon")),
  "ci-course": fig(race([["Awa", "fille", 6], ["Modou", "garçon", 3], ["Fatou", "fille", 6]], "après")),
  // Ensembles et quantités
  "ci-ensemble": bare(setsDrawing([["mangue", "orange", "banane", "mangue", "orange"]])),
  "ci-bols": bowls([9, 2, 0], ["beaucoup", "peu", "rien"]),
  "ci-comparer": bare(setsDrawing([["orange", "orange", "orange", "orange"], ["orange", "orange"]])),
  "ci-rubans": fig(longest([8, 4, 6], "le plus long", "ruban")),
  "ci-verres": bare(glassesDrawing([6, 3, 0])),
  "ci-rythme": rhythm(["rond", "carré"], 4),
  "ci-solides": bare(solidsDrawing(["cube", "pavé droit", "cylindre"])),
  "ci-figures": bare(figuresDrawing([{ kind: "carré", w: 3 }, { kind: "rectangle", w: 4, h: 2 }, { kind: "triangle", w: 3, h: 3 }, { kind: "rond", w: 3 }])),
  // Nombres et calcul
  "ci-dizaine": bare(tensUnits(1, 0)),
  "ci-treize": bare(tensUnits(1, 3)),
  "ci-dix-sept": bare(tensUnits(1, 7)),
  "ci-enlever": crossed(6, 2),
  // Mesures et lignes
  "ci-balance": bare(balanceDrawing(item("pasteque", 0, -4, 48), item("orange", 0, 0, 36), "gauche")),
  "ci-lignes": bare(linesDrawing(["rond", "arc", "carré", "zigzag"])),
  "ci-quadrillage": bare(gridDrawing(3, 4, [{ row: 1, col: 2, picture: "mangue" }])),
  "ci-itineraire": bare(gridDrawing(3, 4, [{ row: 0, col: 3, picture: "ecole" }], [[2, 0], [2, 1], [1, 1], [1, 2], [1, 3], [0, 3]])),
  "ci-soleil-journee": sunDay(),
  // Français et ESVS
  "ci-gestes": strokes(),
  "ci-jour-nuit": dayNight(),
  "ci-journee": dayTimeline(),
};
