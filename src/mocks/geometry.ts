import "server-only";

// Géométrie du primaire : dessins (quadrillages, lignes, figures, frises) et questions qui en découlent.
// Le cahier de l'école demande souvent de tracer ou de reproduire : ici, chaque exercice devient une
// question corrigée automatiquement, avec le même dessin à observer (ligne fermée, case d'un objet,
// nœud, parcours, figure…). Les réponses sont calculées à partir des mêmes données que le dessin ;
// tests/unit/primary-exercises.test.ts les recalcule à partir du dessin lui-même.

import { pictureSize, svg, text, type PictureName } from "./drawings";
import type { ExerciseSpec } from "./exercise-series";

const ROWS = "ABCDEFGH";
const letterOf = (row: number) => ROWS[row]!;
const cellName = (row: number, col: number) => `${letterOf(row)},${col + 1}`;

/** Image d'une illustration dans un dessin SVG, centrée en (cx, cy), haute de h. */
function picture(name: PictureName, cx: number, cy: number, h: number): string {
  const [pw, ph] = pictureSize(name);
  const w = (h * pw) / ph;
  return `<image class="dg-item" href="/illustrations/${name}.svg" x="${(cx - w / 2).toFixed(1)}" y="${(cy - h / 2).toFixed(1)}" width="${w.toFixed(1)}" height="${h}"/>`;
}

/** Réponse « case » : B,3 (on accepte aussi B3, B 3, (B,3)). */
function cellAnswer(row: number, col: number) {
  const main = cellName(row, col);
  return { answer: main, accept: [`${letterOf(row)}${col + 1}`, `${letterOf(row)} ${col + 1}`, `(${main})`] };
}

// ── Quadrillages ────────────────────────────────────────────────────────────

export interface GridItem {
  row: number;
  col: number;
  picture: PictureName;
}
const CELL = 42;
const OX = 26;
const OY = 22;

/**
 * Quadrillage : lignes A, B, C… (de haut en bas), colonnes 1, 2, 3… (de gauche à droite), avec des
 * illustrations dans des cases et, au besoin, un parcours fléché (départ = rond vert, arrivée = flèche).
 */
export function gridDrawing(rows: number, cols: number, items: GridItem[] = [], path: [number, number][] = []): string {
  const width = OX + cols * CELL + 2;
  const height = OY + rows * CELL + 2;
  let body = `<metadata>grid ${OX} ${OY} ${CELL} ${rows} ${cols}</metadata>`;
  body += `<rect class="dg-box" x="${OX}" y="${OY}" width="${cols * CELL}" height="${rows * CELL}"/>`;
  let lines = "";
  for (let r = 1; r < rows; r++) lines += `M${OX} ${OY + r * CELL}h${cols * CELL}`;
  for (let c = 1; c < cols; c++) lines += `M${OX + c * CELL} ${OY}v${rows * CELL}`;
  if (lines) body += `<path class="dg-grid" d="${lines}"/>`;
  for (let r = 0; r < rows; r++) body += text(OX / 2, OY + r * CELL + CELL / 2, letterOf(r));
  for (let c = 0; c < cols; c++) body += text(OX + c * CELL + CELL / 2, OY / 2, c + 1);
  const center = ([r, c]: [number, number]) => [OX + c * CELL + CELL / 2, OY + r * CELL + CELL / 2] as const;
  if (path.length > 1) {
    const pts = path.map(center);
    body += `<polyline class="dg-path" points="${pts.map(([x, y]) => `${x},${y}`).join(" ")}"/>`;
    const [sx, sy] = pts[0]!;
    body += `<circle class="dg-start" cx="${sx}" cy="${sy}" r="7"/>`;
    const [ex, ey] = pts.at(-1)!;
    const [px, py] = pts.at(-2)!;
    const angle = (Math.atan2(ey - py, ex - px) * 180) / Math.PI;
    body += `<polygon class="dg-path-end" points="0,-7 12,0 0,7" transform="translate(${ex - 6 * Math.cos((angle * Math.PI) / 180)} ${ey - 6 * Math.sin((angle * Math.PI) / 180)}) rotate(${angle})"/>`;
  }
  for (const it of items) {
    const [cx, cy] = center([it.row, it.col]);
    body += picture(it.picture, cx, cy, CELL - 10);
  }
  const what = items.length ? ` Des dessins sont placés dans certaines cases.` : "";
  const route = path.length > 1 ? " Un parcours fléché part du rond vert et finit à la pointe de la flèche." : "";
  return svg(width, height, `Quadrillage de ${rows} lignes (A à ${letterOf(rows - 1)}) et ${cols} colonnes (1 à ${cols}).${what}${route}`, body);
}

const PICTURE_WORDS: Partial<Record<PictureName, string>> = {
  mangue: "la mangue",
  orange: "l’orange",
  banane: "la banane",
  "eleve-fille": "la fille",
  "eleve-garcon": "le garçon",
  pasteque: "la pastèque",
  cahier: "le cahier",
  crayon: "le crayon",
  ballon: "le ballon",
  bonbon: "le bonbon",
};
const CELL_HINT = "Écris la lettre de la ligne puis le numéro de la colonne (exemple : A,1).";

/** Case d'une illustration dans le quadrillage. */
export function cellOf(rows: number, cols: number, items: GridItem[], target: PictureName): ExerciseSpec {
  const it = items.find((i) => i.picture === target)!;
  const word = PICTURE_WORDS[target] ?? target;
  return {
    text: `Dans quelle case se trouve ${word} ? ${CELL_HINT}`,
    fig: gridDrawing(rows, cols, items),
    ...cellAnswer(it.row, it.col),
    why: `${word[0]!.toUpperCase()}${word.slice(1)} est sur la ligne ${letterOf(it.row)} et dans la colonne ${it.col + 1} : case <strong>(${cellName(it.row, it.col)})</strong>.`,
  };
}

/** Nombre de cases d'un quadrillage. */
export function cellCount(rows: number, cols: number): ExerciseSpec {
  return {
    num: "Combien de cases a ce quadrillage ?",
    fig: gridDrawing(rows, cols),
    answer: rows * cols,
    why: `${rows} lignes de ${cols} cases : ${Array(rows).fill(cols).join(" + ")} = <strong>${rows * cols}</strong> cases.`,
  };
}

/** Case de départ ou d'arrivée d'un parcours fléché. */
export function routeEnd(rows: number, cols: number, path: [number, number][], ask: "départ" | "arrivée", who: string, items: GridItem[] = []): ExerciseSpec {
  const [r, c] = ask === "départ" ? path[0]! : path.at(-1)!;
  return {
    text: `Le parcours de ${who} est fléché. Quelle est la case ${ask === "départ" ? "du point de départ" : "du point d’arrivée"} ? ${CELL_HINT}`,
    fig: gridDrawing(rows, cols, items, path),
    ...cellAnswer(r, c),
    why: `${ask === "départ" ? "Le parcours commence au rond vert" : "Le parcours finit à la pointe de la flèche"}, dans la case <strong>(${cellName(r, c)})</strong>.`,
  };
}

/** Nombre de cases traversées par un parcours (départ et arrivée compris). */
export function routeLength(rows: number, cols: number, path: [number, number][], who: string): ExerciseSpec {
  return {
    num: `Le parcours de ${who} est fléché. Par combien de cases passe-t-il, en comptant la case de départ et celle d’arrivée ?`,
    fig: gridDrawing(rows, cols, [], path),
    answer: path.length,
    why: `Il passe par les cases ${path.map(([r, c]) => `(${cellName(r, c)})`).join(", ")} : <strong>${path.length}</strong> cases.`,
  };
}

/** Ligne (lettre) ou colonne (numéro) d'une illustration. */
export function lineOrColumn(rows: number, cols: number, items: GridItem[], target: PictureName, ask: "ligne" | "colonne"): ExerciseSpec {
  const it = items.find((i) => i.picture === target)!;
  const word = PICTURE_WORDS[target] ?? target;
  return ask === "ligne"
    ? {
        text: `Sur quelle <strong>ligne</strong> se trouve ${word} ? Écris sa lettre.`,
        fig: gridDrawing(rows, cols, items),
        answer: letterOf(it.row),
        why: `Les lignes vont de gauche à droite et portent une lettre : ${word} est sur la ligne <strong>${letterOf(it.row)}</strong>.`,
      }
    : {
        num: `Dans quelle <strong>colonne</strong> se trouve ${word} ? Écris son numéro.`,
        fig: gridDrawing(rows, cols, items),
        answer: it.col + 1,
        why: `Les colonnes vont de haut en bas et portent un numéro : ${word} est dans la colonne <strong>${it.col + 1}</strong>.`,
      };
}

/** Nombre de cases d'une ligne ou d'une colonne. */
export function cellsIn(rows: number, cols: number, ask: "ligne" | "colonne"): ExerciseSpec {
  const answer = ask === "ligne" ? cols : rows;
  return {
    num: `Combien de cases y a-t-il dans une <strong>${ask}</strong> de ce quadrillage ?`,
    fig: gridDrawing(rows, cols),
    answer,
    why: ask === "ligne" ? `Une ligne traverse les ${cols} colonnes : <strong>${cols}</strong> cases.` : `Une colonne traverse les ${rows} lignes : <strong>${rows}</strong> cases.`,
  };
}

/** Premier ou dernier dessin rencontré en suivant un parcours fléché. */
export function onRoute(rows: number, cols: number, items: GridItem[], path: [number, number][], which: "premier" | "dernier", who: string): ExerciseSpec {
  const met = path.map(([r, c]) => items.find((i) => i.row === r && i.col === c)).filter((i) => i !== undefined);
  const it = which === "premier" ? met[0]! : met.at(-1)!;
  const word = (p: PictureName) => PICTURE_WORDS[p] ?? p;
  return {
    qcm: `${who} suit le parcours fléché. Quel dessin rencontre-t-il ${which === "premier" ? "en premier" : "en dernier"} ?`,
    fig: gridDrawing(rows, cols, items, path),
    choices: items.map((i) => (i === it ? `*${word(i.picture)}` : word(i.picture))),
    why: `En suivant les flèches depuis le rond vert, ${which === "premier" ? "le premier" : "le dernier"} dessin sur le chemin est <strong>${word(it.picture)}</strong>, case (${cellName(it.row, it.col)}).`,
  };
}

/** Morpion : où placer son signe pour en aligner trois ? (une seule case gagnante) */
export function ticTacToe(marks: { row: number; col: number; symbol: "○" | "✕" }[], player: string, symbol: "○" | "✕"): ExerciseSpec {
  const at = (r: number, c: number) => marks.find((m) => m.row === r && m.col === c)?.symbol;
  const linesOf3: [number, number][][] = [
    ...[0, 1, 2].map((r) => [0, 1, 2].map((c) => [r, c] as [number, number])),
    ...[0, 1, 2].map((c) => [0, 1, 2].map((r) => [r, c] as [number, number])),
    [[0, 0], [1, 1], [2, 2]],
    [[0, 2], [1, 1], [2, 0]],
  ];
  const wins = linesOf3
    .filter((l) => l.filter(([r, c]) => at(r, c) === symbol).length === 2 && l.some(([r, c]) => !at(r, c)))
    .map((l) => l.find(([r, c]) => !at(r, c))!);
  const unique = [...new Set(wins.map(([r, c]) => cellName(r, c)))];
  if (unique.length !== 1) throw new Error(`ticTacToe : une seule case gagnante attendue (${unique.join(" ")})`);
  const [wr, wc] = wins[0]!;
  let body = `<metadata>grid ${OX} ${OY} ${CELL} 3 3</metadata><rect class="dg-box" x="${OX}" y="${OY}" width="${3 * CELL}" height="${3 * CELL}"/>`;
  body += `<path class="dg-grid" d="M${OX} ${OY + CELL}h${3 * CELL}M${OX} ${OY + 2 * CELL}h${3 * CELL}M${OX + CELL} ${OY}v${3 * CELL}M${OX + 2 * CELL} ${OY}v${3 * CELL}"/>`;
  for (let r = 0; r < 3; r++) body += text(OX / 2, OY + r * CELL + CELL / 2, letterOf(r));
  for (let c = 0; c < 3; c++) body += text(OX + c * CELL + CELL / 2, OY / 2, c + 1);
  for (const m of marks) body += text(OX + m.col * CELL + CELL / 2, OY + m.row * CELL + CELL / 2, m.symbol, "dg-mark");
  return {
    text: `${player} joue avec les ${symbol === "○" ? "ronds (○)" : "croix (✕)"}. Dans quelle case doit-${player === "Aminata" || player === "Awa" || player === "Fatou" ? "elle" : "il"} placer son pion pour en aligner trois ? ${CELL_HINT}`,
    fig: svg(OX + 3 * CELL + 2, OY + 3 * CELL + 2, "Grille de morpion de 3 lignes (A à C) et 3 colonnes (1 à 3), avec des ronds et des croix.", body),
    ...cellAnswer(wr, wc),
    why: `Dans la case <strong>(${cellName(wr, wc)})</strong>, ${player} aligne trois ${symbol === "○" ? "ronds" : "croix"}.`,
  };
}

// ── Nœuds ───────────────────────────────────────────────────────────────────

const STEP = 46;
const NX = 34;
const NY = 30;

/** Lignes A, B, C… et colonnes 1, 2, 3… qui se croisent en nœuds ; des flèches lettrées montrent des nœuds. */
export function nodesDrawing(rows: number, cols: number, arrows: { letter: string; row: number; col: number }[]): string {
  const width = NX + (cols - 1) * STEP + 46;
  const height = NY + (rows - 1) * STEP + 40;
  let body = `<metadata>nodes ${NX} ${NY} ${STEP}</metadata>`;
  let lines = "";
  for (let r = 0; r < rows; r++) lines += `M${NX - 6} ${NY + r * STEP}H${NX + (cols - 1) * STEP + 6}`;
  for (let c = 0; c < cols; c++) lines += `M${NX + c * STEP} ${NY - 6}V${NY + (rows - 1) * STEP + 6}`;
  body += `<path class="dg-line" d="${lines}"/>`;
  for (let r = 0; r < rows; r++) body += text(12, NY + r * STEP, letterOf(r));
  for (let c = 0; c < cols; c++) body += text(NX + c * STEP, 10, c + 1);
  for (const a of arrows) {
    const nx = NX + a.col * STEP;
    const ny = NY + a.row * STEP;
    const sx = nx + 30;
    const sy = ny + 30;
    body +=
      `<path class="dg-arrow" d="M${sx} ${sy}L${nx + 5} ${ny + 5}"/>` +
      `<polygon class="dg-path-end" points="${nx + 2},${ny + 2} ${nx + 11},${ny + 5} ${nx + 5},${ny + 11}"/>` +
      `<circle class="dg-node" cx="${nx}" cy="${ny}" r="3.5"/>` +
      text(sx + 7, sy + 7, a.letter, "dg-letter");
  }
  return svg(width, height, `Quadrillage : lignes A à ${letterOf(rows - 1)}, colonnes 1 à ${cols}. Des flèches ${arrows.map((a) => a.letter).join(" et ")} montrent des nœuds.`, body);
}

/** Quelle flèche montre le nœud (B,2) ? */
export function whichNode(rows: number, cols: number, arrows: { letter: string; row: number; col: number }[], target: [number, number]): ExerciseSpec {
  const good = arrows.find((a) => a.row === target[0] && a.col === target[1])!;
  return {
    qcm: `Quelle flèche montre le nœud <strong>(${cellName(target[0], target[1])})</strong> ?`,
    fig: nodesDrawing(rows, cols, arrows),
    choices: arrows.map((a) => (a === good ? `*${a.letter}` : a.letter)),
    why: `La flèche <strong>${good.letter}</strong> arrive au croisement de la ligne ${letterOf(target[0])} et de la colonne ${target[1] + 1}.`,
  };
}

// ── Lignes ──────────────────────────────────────────────────────────────────

export type LineShape = "rond" | "carré" | "triangle" | "nuage" | "arc" | "zigzag" | "carré ouvert" | "vague" | "droite" | "courbe" | "brisée";
const CLOSED: LineShape[] = ["rond", "carré", "triangle", "nuage"];

/** Tracé d'une ligne dans une case de 90 × 80 dont le coin est (x, y). */
function linePath(shape: LineShape, x: number, y: number): string {
  const p = (dx: number, dy: number) => `${x + dx} ${y + dy}`;
  switch (shape) {
    case "rond":
      return `M${p(45, 12)}C${p(72, 12)} ${p(80, 30)} ${p(78, 42)}C${p(76, 60)} ${p(62, 70)} ${p(45, 70)}C${p(24, 70)} ${p(12, 58)} ${p(12, 42)}C${p(12, 24)} ${p(26, 12)} ${p(45, 12)}Z`;
    case "carré":
      return `M${p(18, 12)}H${x + 72}V${y + 66}H${x + 18}Z`;
    case "triangle":
      return `M${p(45, 10)}L${p(80, 68)}L${p(10, 68)}Z`;
    case "nuage":
      return `M${p(20, 50)}C${p(4, 46)} ${p(8, 24)} ${p(26, 26)}C${p(28, 8)} ${p(56, 8)} ${p(60, 24)}C${p(80, 20)} ${p(88, 44)} ${p(70, 52)}C${p(70, 70)} ${p(30, 72)} ${p(20, 50)}Z`;
    case "arc":
      return `M${p(14, 66)}C${p(14, 6)} ${p(76, 6)} ${p(76, 66)}`;
    case "zigzag":
      return `M${p(8, 62)}L${p(26, 18)}L${p(44, 62)}L${p(62, 18)}L${p(82, 62)}`;
    case "carré ouvert":
      return `M${p(24, 12)}H${x + 72}V${y + 66}H${x + 18}V${y + 24}`;
    case "vague":
      return `M${p(8, 40)}C${p(20, 10)} ${p(32, 10)} ${p(44, 40)}C${p(56, 70)} ${p(68, 70)} ${p(82, 40)}`;
    case "droite":
      return `M${p(8, 60)}L${p(82, 20)}`;
    case "courbe":
      return `M${p(8, 60)}C${p(24, 0)} ${p(60, 80)} ${p(82, 18)}`;
    case "brisée":
      return `M${p(8, 60)}L${p(30, 20)}L${p(52, 56)}L${p(82, 18)}`;
  }
}

/** Plusieurs lignes lettrées côte à côte (A, B, C…). */
export function linesDrawing(shapes: LineShape[], what = "lignes"): string {
  const width = shapes.length * 96 + 6;
  let body = "";
  shapes.forEach((shape, i) => {
    const x = 6 + i * 96;
    const letter = String.fromCharCode(65 + i);
    body += `<g data-letter="${letter}">${text(x + 45, 12, letter, "dg-letter")}<path class="dg-figure" d="${linePath(shape, x, 22)}"/></g>`;
  });
  return svg(width, 106, `${shapes.length} ${what} marquées ${shapes.map((_, i) => String.fromCharCode(65 + i)).join(", ")}.`, body);
}

/** Quelle ligne est fermée (ou ouverte) ? Une seule bonne réponse. */
export function whichLine(shapes: LineShape[], want: "fermée" | "ouverte"): ExerciseSpec {
  const isWanted = (s: LineShape) => CLOSED.includes(s) === (want === "fermée");
  const good = shapes.map((s, i) => (isWanted(s) ? i : -1)).filter((i) => i >= 0);
  if (good.length !== 1) throw new Error(`whichLine : une seule ligne ${want} attendue`);
  const letter = String.fromCharCode(65 + good[0]!);
  return {
    qcm: `Quelle ligne est <strong>${want}</strong> ?`,
    fig: linesDrawing(shapes),
    choices: shapes.map((_, i) => (i === good[0] ? `*${String.fromCharCode(65 + i)}` : String.fromCharCode(65 + i))),
    why:
      want === "fermée"
        ? `<strong>${letter}</strong> : on peut en faire le tour sans trouver d’ouverture. Les autres lignes ont deux bouts.`
        : `<strong>${letter}</strong> : elle a deux bouts, elle ne se referme pas. Les autres lignes sont fermées.`,
  };
}

/** Ligne droite, courbe ou brisée : laquelle est de la sorte demandée ? */
export function whichLineKind(shapes: ("droite" | "courbe" | "brisée")[], want: "droite" | "courbe" | "brisée"): ExerciseSpec {
  const i = shapes.indexOf(want);
  return {
    qcm: `Quelle ligne est une <strong>ligne ${want}</strong> ?`,
    fig: linesDrawing(shapes),
    choices: shapes.map((_, k) => (k === i ? `*${String.fromCharCode(65 + k)}` : String.fromCharCode(65 + k))),
    why: `<strong>${String.fromCharCode(65 + i)}</strong> : ${
      want === "droite" ? "elle va tout droit, on la trace avec la règle" : want === "courbe" ? "elle s’arrondit, sans angle" : "elle est faite de morceaux droits qui changent de direction"
    }.`,
  };
}

// ── Intérieur / extérieur ───────────────────────────────────────────────────

/** Une zone fermée (assiette, enclos, cour) et des illustrations lettrées dedans ou dehors. */
export function zoneDrawing(objects: { picture: PictureName; inside: boolean }[], zone: string): string {
  const cx = 120;
  const cy = 74;
  const rx = 92;
  const ry = 56;
  let body = `<ellipse class="dg-zone" cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}"/>`;
  const insideSpots = [[90, 62], [150, 84], [118, 96]];
  const outsideSpots = [[262, 40], [266, 112], [24, 140]];
  let ins = 0;
  let outs = 0;
  objects.forEach((o, i) => {
    const [x, y] = o.inside ? insideSpots[ins++]! : outsideSpots[outs++]!;
    const letter = String.fromCharCode(65 + i);
    body += `<g data-letter="${letter}">${picture(o.picture, x!, y!, 36)}${text(x! + 22, y! - 16, letter, "dg-letter")}</g>`;
  });
  return svg(300, 160, `${zone} (ligne fermée) et des dessins marqués ${objects.map((_, i) => String.fromCharCode(65 + i)).join(", ")}.`, body);
}

/** Quel dessin est à l'intérieur (ou à l'extérieur) de la ligne fermée ? */
export function insideOrOutside(objects: { picture: PictureName; inside: boolean }[], want: "intérieur" | "extérieur", zone: string): ExerciseSpec {
  const i = objects.findIndex((o) => o.inside === (want === "intérieur"));
  if (objects.filter((o) => o.inside === (want === "intérieur")).length !== 1) throw new Error("insideOrOutside : une seule bonne réponse");
  const letter = String.fromCharCode(65 + i);
  return {
    qcm: `Quel dessin est à l’<strong>${want}</strong> de la ligne fermée (${zone}) ?`,
    fig: zoneDrawing(objects, zone),
    choices: objects.map((_, k) => (k === i ? `*${String.fromCharCode(65 + k)}` : String.fromCharCode(65 + k))),
    why: `<strong>${letter}</strong> : ${want === "intérieur" ? "il est dans la ligne fermée" : "il est hors de la ligne fermée"}. La ligne elle-même est la frontière.`,
  };
}

// ── Suites de formes (rythmes, frises) ─────────────────────────────────────

/** Continuer une suite de formes : la forme suivante parmi trois. */
export function nextShape(motif: string[], repeats: number, choices: string[]): ExerciseSpec {
  const seq = Array.from({ length: motif.length * repeats }, (_, i) => motif[i % motif.length]!);
  const shown = seq.slice(0, -1);
  const next = seq.at(-1)!;
  if (!choices.includes(next)) throw new Error("nextShape : la bonne forme manque");
  return {
    qcm: `Continue la suite : <strong>${shown.join(" ")} …</strong> Quelle forme vient ensuite ?`,
    choices: choices.map((c) => (c === next ? `*${c}` : c)),
    why: `Le motif <strong>${motif.join(" ")}</strong> se répète : après ${shown.slice(-motif.length + 1).join(" ") || shown.at(-1)} vient <strong>${next}</strong>.`,
  };
}

// ── Traits et figures sur quadrillage ──────────────────────────────────────

const SQ = 20;

/** Points d'un quadrillage pointé (lignes légères) de cols × rows carreaux. */
function dottedGrid(cols: number, rows: number): string {
  let d = "";
  for (let c = 0; c <= cols; c++) d += `M${10 + c * SQ} 10v${rows * SQ}`;
  for (let r = 0; r <= rows; r++) d += `M10 ${10 + r * SQ}h${cols * SQ}`;
  return `<metadata>squares ${SQ}</metadata><path class="dg-grid" d="${d}"/>`;
}

/** Traits horizontaux lettrés sur un quadrillage, chacun de la longueur donnée (en carreaux). */
export function segmentsDrawing(lengths: number[]): string {
  const cols = Math.max(...lengths) + 3;
  const rows = lengths.length * 2;
  let body = dottedGrid(cols, rows);
  lengths.forEach((len, i) => {
    const y = 10 + (i * 2 + 1) * SQ;
    const letter = String.fromCharCode(65 + i);
    body += `<g data-letter="${letter}"><path class="dg-segment" d="M${10 + 2 * SQ} ${y}H${10 + (2 + len) * SQ}"/>${text(10 + SQ, y, letter, "dg-letter")}</g>`;
  });
  return svg(cols * SQ + 20, rows * SQ + 20, `Quadrillage avec ${lengths.length} traits marqués ${lengths.map((_, i) => String.fromCharCode(65 + i)).join(", ")}.`, body);
}

/** Longueur d'un trait en carreaux. */
export function segmentLength(lengths: number[], index: number): ExerciseSpec {
  const letter = String.fromCharCode(65 + index);
  return {
    num: `Combien de carreaux mesure le trait <strong>${letter}</strong> ?`,
    fig: segmentsDrawing(lengths),
    answer: lengths[index]!,
    why: `Le trait ${letter} va d’un nœud à un autre en passant le long de <strong>${lengths[index]}</strong> carreaux.`,
  };
}

/** Quel trait mesure n carreaux ? */
export function whichSegment(lengths: number[], want: number): ExerciseSpec {
  const i = lengths.indexOf(want);
  return {
    qcm: `Quel trait mesure <strong>${want} carreaux</strong> ?`,
    fig: segmentsDrawing(lengths),
    choices: lengths.map((_, k) => (k === i ? `*${String.fromCharCode(65 + k)}` : String.fromCharCode(65 + k))),
    why: `<strong>${String.fromCharCode(65 + i)}</strong> : on compte ${want} carreaux le long du trait.`,
  };
}

export type FigureKind = "carré" | "rectangle" | "triangle" | "rond";
interface FigureSpec {
  kind: FigureKind;
  /** Taille en carreaux : côté (carré), largeur × hauteur (rectangle, triangle), diamètre (rond). */
  w: number;
  h?: number;
}

/** Une figure dessinée sur le quadrillage, coin haut gauche en carreaux (cx, cy). */
function figureShape(f: FigureSpec, cx: number, cy: number): string {
  const x = 10 + cx * SQ;
  const y = 10 + cy * SQ;
  const w = f.w * SQ;
  const h = (f.h ?? f.w) * SQ;
  switch (f.kind) {
    case "carré":
      return `<rect class="dg-shape-fill" x="${x}" y="${y}" width="${w}" height="${w}"/>`;
    case "rectangle":
      return `<rect class="dg-shape-fill" x="${x}" y="${y}" width="${w}" height="${h}"/>`;
    case "triangle":
      return `<polygon class="dg-shape-fill" points="${x + w / 2},${y} ${x + w},${y + h} ${x},${y + h}"/>`;
    case "rond":
      return `<circle class="dg-shape-fill" cx="${x + w / 2}" cy="${y + w / 2}" r="${w / 2}"/>`;
  }
}

/** Figures lettrées côte à côte sur un quadrillage. */
export function figuresDrawing(figs: FigureSpec[]): string {
  const rows = Math.max(...figs.map((f) => f.h ?? f.w)) + 3;
  let col = 1;
  let body = "";
  const placed = figs.map((f, i) => {
    const at = col;
    col += f.w + 2;
    return { f, at, letter: String.fromCharCode(65 + i) };
  });
  body += dottedGrid(col, rows);
  for (const { f, at, letter } of placed) {
    body += `<g data-letter="${letter}">${figureShape(f, at, 2)}${text(10 + (at + f.w / 2) * SQ, 10 + SQ, letter, "dg-letter")}</g>`;
  }
  return svg(col * SQ + 20, rows * SQ + 20, `Quadrillage avec ${figs.length} figures marquées ${placed.map((p) => p.letter).join(", ")}.`, body);
}

/** Quelle figure est un carré (un rectangle, un triangle, un rond) ? */
export function whichFigure(figs: FigureSpec[], want: FigureKind): ExerciseSpec {
  const i = figs.findIndex((f) => f.kind === want);
  if (figs.filter((f) => f.kind === want).length !== 1) throw new Error("whichFigure : une seule bonne figure");
  const reason: Record<FigureKind, string> = {
    carré: "elle a 4 côtés de même longueur",
    rectangle: "elle a 4 côtés, les côtés opposés ont la même longueur et deux côtés sont plus longs",
    triangle: "elle a 3 côtés",
    rond: "c’est une ligne courbe fermée, sans côté",
  };
  return {
    qcm: `Quelle figure est un <strong>${want}</strong> ?`,
    fig: figuresDrawing(figs),
    choices: figs.map((_, k) => (k === i ? `*${String.fromCharCode(65 + k)}` : String.fromCharCode(65 + k))),
    why: `<strong>${String.fromCharCode(65 + i)}</strong> : ${reason[want]}.`,
  };
}

/** Longueur d'un côté d'une figure, en carreaux (le côté du carré, le grand ou le petit côté du rectangle). */
export function sideOf(f: FigureSpec, side: "côté" | "grand côté" | "petit côté"): ExerciseSpec {
  const w = f.w;
  const h = f.h ?? f.w;
  const answer = side === "petit côté" ? Math.min(w, h) : Math.max(w, h);
  return {
    num: `Combien de carreaux mesure le <strong>${side}</strong> de ce ${f.kind} ?`,
    fig: figuresDrawing([f]),
    answer,
    why:
      f.kind === "carré"
        ? `Les 4 côtés du carré ont la même longueur : <strong>${answer}</strong> carreaux.`
        : `Le rectangle mesure ${Math.max(w, h)} carreaux sur ${Math.min(w, h)} : le ${side} mesure <strong>${answer}</strong> carreaux.`,
  };
}

/** Points numérotés à relier dans l'ordre, puis le dernier au premier : quelle figure obtient-on ? */
export function joinDots(points: [number, number][]): ExerciseSpec {
  const xs = points.map(([x]) => x);
  const ys = points.map(([, y]) => y);
  const cols = Math.max(...xs) + 2;
  const rows = Math.max(...ys) + 2;
  let body = dottedGrid(cols, rows);
  points.forEach(([x, y], i) => {
    body += `<circle class="dg-node" cx="${10 + x * SQ}" cy="${10 + y * SQ}" r="4"/>${text(10 + x * SQ + 10, 10 + y * SQ - 10, i + 1, "dg-letter")}`;
  });
  const sides = points.map((p, i) => {
    const q = points[(i + 1) % points.length]!;
    return Math.hypot(q[0] - p[0], q[1] - p[1]);
  });
  const kind = points.length === 3 ? "triangle" : sides.every((s) => Math.abs(s - sides[0]!) < 1e-9) ? "carré" : "rectangle";
  return {
    qcm: "Avec la règle, on relie les points dans l’ordre (1, 2, 3…), puis le dernier au point 1. Quelle figure obtient-on ?",
    fig: svg(cols * SQ + 20, rows * SQ + 20, `Quadrillage avec ${points.length} points numérotés.`, body),
    choices: ["Carré", "Rectangle", "Triangle"].map((c) => (c.toLowerCase() === kind ? `*${c}` : c)),
    why: `${points.length} points donnent ${points.length} côtés : ${kind === "triangle" ? "c’est un <strong>triangle</strong>" : kind === "carré" ? "4 côtés de même longueur, c’est un <strong>carré</strong>" : "4 côtés, opposés égaux deux à deux : c’est un <strong>rectangle</strong>"}.`,
  };
}

/** Drapeau du Sénégal (trois bandes et l'étoile verte). */
export function senegalFlag(): string {
  const body =
    `<rect class="dg-band dg-flag-green" x="2" y="2" width="60" height="120"/>` +
    `<rect class="dg-band dg-flag-yellow" x="62" y="2" width="60" height="120"/>` +
    `<rect class="dg-band dg-flag-red" x="122" y="2" width="60" height="120"/>` +
    `<polygon class="dg-flag-star" points="92,44 97,58 112,58 100,67 104,82 92,73 80,82 84,67 72,58 87,58"/>`;
  return svg(184, 124, "Le drapeau du Sénégal.", body);
}

/** Questions sur le drapeau du Sénégal : nombre de bandes, couleur d'une bande, couleur de l'étoile. */
export function flagQuestion(ask: "bandes" | "milieu" | "étoile" | "gauche"): ExerciseSpec {
  if (ask === "bandes") {
    return { num: "Combien de bandes rectangulaires a le drapeau du Sénégal ?", fig: senegalFlag(), answer: 3, why: "<strong>3</strong> bandes verticales : verte, jaune et rouge." };
  }
  const colors = ["verte", "jaune", "rouge"];
  const good = ask === "milieu" ? "jaune" : "verte";
  const asked = ask === "milieu" ? "la bande du milieu" : ask === "gauche" ? "la bande de gauche" : "l’étoile";
  return {
    qcm: `De quelle couleur est ${asked} du drapeau du Sénégal ?`,
    fig: senegalFlag(),
    choices: colors.map((c) => (c === good ? `*${c}` : c)),
    why: `${asked[0]!.toUpperCase()}${asked.slice(1)} est <strong>${good}</strong>.`,
  };
}

/** Image faite de figures (un chat) : corps en rectangle, oreilles et queue en triangles, tête et yeux en ronds. */
export function catOfShapes(): string {
  // Figures séparées (aucune n'en cache une autre) : on les compte toutes d'un coup d'œil.
  const body =
    `<polygon class="dg-part" points="22,48 26,18 44,38"/>` +
    `<polygon class="dg-part" points="52,38 70,18 74,48"/>` +
    `<circle class="dg-part" cx="48" cy="66" r="24"/>` +
    `<circle class="dg-part dg-eye" cx="40" cy="62" r="4"/>` +
    `<circle class="dg-part dg-eye" cx="56" cy="62" r="4"/>` +
    `<polygon class="dg-part" points="76,66 98,54 98,78"/>` +
    `<rect class="dg-part" x="100" y="48" width="88" height="48" rx="2"/>` +
    `<polygon class="dg-part" points="190,56 222,24 202,70"/>`;
  return svg(228, 104, "Un chat dessiné avec des figures géométriques.", body);
}

const PARTS: Record<"rectangle" | "triangle" | "rond", { tag: string; count: number; detail: string }> = {
  rectangle: { tag: "rect", count: 1, detail: "le corps" },
  triangle: { tag: "polygon", count: 4, detail: "les 2 oreilles, le cou et la queue" },
  rond: { tag: "circle", count: 3, detail: "la tête et les 2 yeux" },
};

/** Compter un type de figure dans le chat. */
export function countCatParts(kind: "rectangle" | "triangle" | "rond"): ExerciseSpec {
  const p = PARTS[kind];
  return {
    num: `Ce chat est dessiné avec des figures. Combien de <strong>${kind}s</strong> vois-tu ?`,
    fig: catOfShapes(),
    answer: p.count,
    why: `<strong>${p.count}</strong> : ${p.detail}.`,
  };
}

