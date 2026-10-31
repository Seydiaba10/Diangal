import "server-only";

// Mathématiques du CI : ensembles, positions dans l'espace, solides, points à compter, double et
// moitié, intrus, modèles, rythmes, tableaux à double entrée, longueurs et tailles. Le cahier de
// l'école demande d'entourer, de colorier ou de relever une lettre : chaque exercice devient une
// question corrigée, avec le même genre de dessin. Les réponses sont calculées à partir des données
// du dessin, que <metadata> garde pour tests/unit/primary-exercises.test.ts.

import { esc, pictureRow, pictureSize, svg, text, type PictureName } from "./drawings";
import type { ExerciseSpec } from "./exercise-series";

const L = (i: number) => "ABCDEFGH"[i]!;
const star = (choices: string[], good: string) => choices.map((c) => (c === good ? `*${c}` : c));

export type Kind = "mangue" | "orange" | "banane" | "pasteque" | "crayon" | "cahier" | "ballon" | "bonbon" | "eleve-fille" | "eleve-garcon";

/** Noms des dessins : un, plusieurs, avec l'article, et leur famille (pour l'intrus). */
export const NOUN: Record<Kind, { one: string; many: string; the: string; family: string }> = {
  mangue: { one: "mangue", many: "mangues", the: "la mangue", family: "fruit" },
  orange: { one: "orange", many: "oranges", the: "l’orange", family: "fruit" },
  banane: { one: "banane", many: "bananes", the: "la banane", family: "fruit" },
  pasteque: { one: "pastèque", many: "pastèques", the: "la pastèque", family: "fruit" },
  crayon: { one: "crayon", many: "crayons", the: "le crayon", family: "fourniture" },
  cahier: { one: "cahier", many: "cahiers", the: "le cahier", family: "fourniture" },
  ballon: { one: "ballon", many: "ballons", the: "le ballon", family: "jouet" },
  bonbon: { one: "bonbon", many: "bonbons", the: "le bonbon", family: "friandise" },
  "eleve-fille": { one: "fille", many: "filles", the: "la fille", family: "enfant" },
  "eleve-garcon": { one: "garçon", many: "garçons", the: "le garçon", family: "enfant" },
};

/** « de mangues », « d’oranges ». */
export const de = (word: string) => (/^[aeiouéèh]/i.test(word) ? `d’${word}` : `de ${word}`);
/** « du ballon », « de la mangue », « de l’orange ». */
const ofThe = (the: string) => (the.startsWith("le ") ? `du ${the.slice(3)}` : `de ${the}`);

/** Illustration centrée en (cx, cy), tenant dans une boîte box × h. */
function item(name: PictureName, cx: number, cy: number, h: number, box = h): string {
  const [pw, ph] = pictureSize(name);
  const height = Math.min(h, (box * ph) / pw);
  const w = (height * pw) / ph;
  return `<image class="dg-item" href="/illustrations/${name}.svg" x="${(cx - w / 2).toFixed(1)}" y="${(cy - height / 2).toFixed(1)}" width="${w.toFixed(1)}" height="${height.toFixed(1)}"/>`;
}

// ── Ensembles ───────────────────────────────────────────────────────────────

const SLOT = 44;

/** Un ensemble (ligne fermée) et ses objets, rangés en colonnes ; lettres sous chaque objet si demandé. */
function setBox(items: Kind[], x: number, y: number, letter?: string, itemLetters = false) {
  const cols = items.length <= 4 ? 2 : items.length <= 9 ? 3 : 4;
  const rows = Math.max(1, Math.ceil(items.length / cols));
  const slotH = itemLetters ? SLOT + 14 : SLOT;
  const w = cols * SLOT + 18;
  const h = rows * slotH + 16;
  let body = `<rect class="dg-zone" x="${x}" y="${y}" width="${w}" height="${h}" rx="20"/>`;
  items.forEach((k, i) => {
    const cx = x + 9 + SLOT * (i % cols) + SLOT / 2;
    const cy = y + 8 + slotH * Math.floor(i / cols) + SLOT / 2;
    body += item(k, cx, cy, 36, 40);
    if (itemLetters) body += text(cx, cy + 31, L(i), "dg-letter");
  });
  if (letter) body += text(x + w / 2, y - 11, letter, "dg-letter");
  return { body, w, h };
}

/** Un ou plusieurs ensembles (deux par ligne), marqués A, B… quand il y en a plusieurs. */
export function setsDrawing(sets: Kind[][], itemLetters = false): string {
  const letters = sets.length > 1;
  const top = letters ? 28 : 6;
  let body = `<metadata>sets ${sets.map((s, i) => `${L(i)}:${s.join(",")}`).join(";")}</metadata>`;
  let x = 6;
  let y = top;
  let rowH = 0;
  let width = 0;
  sets.forEach((s, i) => {
    if (i > 0 && i % 2 === 0) {
      x = 6;
      y += rowH + top + 8;
      rowH = 0;
    }
    const box = setBox(s, x, y, letters ? L(i) : undefined, itemLetters);
    body += box.body;
    x += box.w + 14;
    width = Math.max(width, x);
    rowH = Math.max(rowH, box.h);
  });
  const label = letters ? `${sets.length} ensembles marqués ${sets.map((_, i) => L(i)).join(", ")}.` : itemLetters ? "Un ensemble d’objets marqués par des lettres." : "Un ensemble d’objets.";
  return svg(width - 8, y + rowH + 6, label, body);
}

/** Combien de … dans l'ensemble ? */
export function countIn(items: Kind[], kind: Kind): ExerciseSpec {
  const n = items.filter((k) => k === kind).length;
  return {
    num: `Combien ${de(NOUN[kind].many)} y a-t-il dans l’ensemble ?`,
    fig: setsDrawing([items]),
    answer: n,
    why: `On compte les ${NOUN[kind].many} un par un : il y en a <strong>${n}</strong>.`,
  };
}

const FAMILY: Record<string, [string, string]> = {
  fruit: ["des fruits", "un fruit"],
  fourniture: ["des fournitures scolaires", "une fourniture scolaire"],
  enfant: ["des enfants", "un enfant"],
};

/** Quel objet n'appartient pas à l'ensemble (l'intrus) ? */
export function intruder(items: Kind[], family: string): ExerciseSpec {
  const odd = items.findIndex((k) => NOUN[k].family !== family);
  if (odd < 0 || items.filter((k) => NOUN[k].family !== family).length !== 1) throw new Error("intruder : un seul intrus");
  return {
    qcm: `Voici l’ensemble ${FAMILY[family]![0]}. Quel dessin n’appartient pas à cet ensemble ?`,
    fig: setsDrawing([items], true),
    choices: items.map((_, i) => (i === odd ? `*${L(i)}` : L(i))),
    why: `<strong>${L(odd)}</strong> : ${NOUN[items[odd]!].the} n’est pas ${FAMILY[family]![1]}, c’est l’intrus.`,
  };
}

/** Quel ensemble a le plus (le moins) de … ? */
export function compareSets(sets: Kind[][], want: "plus" | "moins", word: string): ExerciseSpec {
  const counts = sets.map((s) => s.length);
  const target = want === "plus" ? Math.max(...counts) : Math.min(...counts);
  if (counts.filter((c) => c === target).length !== 1) throw new Error("compareSets : une seule réponse");
  const good = counts.indexOf(target);
  return {
    qcm: `Quel ensemble a le <strong>${want}</strong> ${de(word)} ?`,
    fig: setsDrawing(sets),
    choices: sets.map((_, i) => (i === good ? `*${L(i)}` : L(i))),
    why: `On compte : ${counts.map((c, i) => `${L(i)} en a ${c}`).join(", ")}. L’ensemble <strong>${L(good)}</strong> en a le ${want}.`,
  };
}

/** Quels ensembles ont autant de … ? (une seule paire égale) */
export function sameSets(sets: Kind[][], word: string): ExerciseSpec {
  const counts = sets.map((s) => s.length);
  const pairs: string[] = [];
  let good = "";
  for (let i = 0; i < sets.length; i++)
    for (let j = i + 1; j < sets.length; j++) {
      const p = `${L(i)} et ${L(j)}`;
      if (counts[i] === counts[j]) good = good ? "!" : p;
      pairs.push(p);
    }
  if (!good || good === "!") throw new Error("sameSets : une seule paire égale");
  const others = pairs.filter((p) => p !== good).slice(0, 2);
  const choices = [good, ...others].sort();
  return {
    qcm: `Quels ensembles ont <strong>autant</strong> ${de(word)} ?`,
    fig: setsDrawing(sets),
    choices: star(choices, good),
    why: `<strong>${good}</strong> : ${good.split(" et ").map((l) => `${l} en a ${counts[l.charCodeAt(0) - 65]}`).join(", ")}, c’est le même nombre.`,
  };
}

/** Il y a … de A que de B : plus, moins ou autant. */
export function moreWord(a: [Kind, number], b: [Kind, number]): ExerciseSpec {
  const items = [...Array<Kind>(a[1]).fill(a[0]), ...Array<Kind>(b[1]).fill(b[0])];
  const good = a[1] > b[1] ? "plus" : a[1] < b[1] ? "moins" : "autant";
  return {
    qcm: `Complète la phrase : « Il y a … ${de(NOUN[a[0]].many)} que ${de(NOUN[b[0]].many)}. »`,
    fig: setsDrawing([items]),
    choices: star(["plus", "moins", "autant"], good),
    why: `<strong>${good}</strong> : il y a ${a[1]} ${a[1] > 1 ? NOUN[a[0]].many : NOUN[a[0]].one} et ${b[1]} ${b[1] > 1 ? NOUN[b[0]].many : NOUN[b[0]].one}.`,
  };
}

/** Combien de … faut-il ajouter dans B pour en avoir autant que dans A ? */
export function toSame(kind: Kind, a: number, b: number): ExerciseSpec {
  return {
    num: `Combien ${de(NOUN[kind].many)} faut-il ajouter dans l’ensemble B pour en avoir <strong>autant</strong> que dans l’ensemble A ?`,
    fig: setsDrawing([Array<Kind>(a).fill(kind), Array<Kind>(b).fill(kind)]),
    answer: a - b,
    why: `A en a ${a}, B en a ${b}. Il manque ${a} − ${b} = <strong>${a - b}</strong> ${a - b > 1 ? NOUN[kind].many : NOUN[kind].one} dans B.`,
  };
}

/** Trois bols de billes : lequel en a beaucoup, peu, ou rien ? */
export function quantity(counts: [number, number, number], want: "beaucoup" | "peu" | "rien"): ExerciseSpec {
  let body = `<metadata>bowls ${counts.join(",")}</metadata>`;
  counts.forEach((n, i) => {
    const x = 10 + i * 100;
    body += `<path class="dg-pan" d="M${x} 60h84q-6 34-42 34t-42-34Z"/>`;
    for (let k = 0; k < n; k++) {
      const cx = x + 18 + (k % 5) * 12;
      const cy = 80 - Math.floor(k / 5) * 11;
      body += `<circle class="dg-token" cx="${cx}" cy="${cy}" r="5.5"/>`;
    }
    body += text(x + 42, 116, L(i), "dg-letter");
  });
  const sorted = [...counts].sort((x, y) => x - y);
  const target = want === "rien" ? 0 : want === "peu" ? sorted[1]! : sorted[2]!;
  if (sorted[0] !== 0 || sorted[1]! < 1 || sorted[1]! > 3 || sorted[2]! < 7) throw new Error("quantity : 0, peu (1 à 3) et beaucoup (7 et plus)");
  const good = counts.indexOf(target);
  return {
    qcm: `Quel bol a <strong>${want}</strong> de billes ?`,
    fig: svg(306, 126, "Trois bols de billes marqués A, B et C.", body),
    choices: ["A", "B", "C"].map((l, i) => (i === good ? `*${l}` : l)),
    why: `<strong>${L(good)}</strong> : ${want === "rien" ? "ce bol est vide" : want === "peu" ? `ce bol n’a que ${target} bille${target > 1 ? "s" : ""}` : `ce bol en a ${target}, bien plus que les autres`}.`,
  };
}

export type Token = `${"rond" | "carré" | "triangle"}-${"noir" | "blanc"}`;

/** Formes noires et blanches dans un ensemble : combien ont telle forme, ou telle couleur ? */
export function shapeSet(tokens: Token[], ask: { shape: "rond" | "carré" | "triangle" } | { color: "noir" | "blanc" }): ExerciseSpec {
  let body = `<metadata>tokens ${tokens.join(",")}</metadata>`;
  const cols = 4;
  const w = cols * 40 + 20;
  const h = Math.ceil(tokens.length / cols) * 40 + 16;
  body += `<rect class="dg-zone" x="4" y="4" width="${w}" height="${h}" rx="20"/>`;
  tokens.forEach((t, i) => {
    const [shape, color] = t.split("-");
    const cx = 34 + (i % cols) * 40;
    const cy = 32 + Math.floor(i / cols) * 40;
    const cls = color === "noir" ? "dg-node" : "dg-shape";
    body +=
      shape === "rond"
        ? `<circle class="${cls}" cx="${cx}" cy="${cy}" r="13"/>`
        : shape === "carré"
          ? `<rect class="${cls}" x="${cx - 12}" y="${cy - 12}" width="24" height="24"/>`
          : `<path class="${cls}" d="M${cx} ${cy - 14}L${cx + 14} ${cy + 11}H${cx - 14}Z"/>`;
  });
  const n = tokens.filter((t) => ("shape" in ask ? t.startsWith(ask.shape) : t.endsWith(ask.color))).length;
  const what = "shape" in ask ? `des ${ask.shape === "rond" ? "ronds" : ask.shape === "carré" ? "carrés" : "triangles"}` : `${ask.color === "noir" ? "noirs" : "blancs"}`;
  return {
    num: `Combien d’objets de cet ensemble sont <strong>${what}</strong> ?`,
    fig: svg(w + 8, h + 8, "Un ensemble de ronds, de carrés et de triangles, noirs ou blancs.", body),
    answer: n,
    why: `On entoure seulement les objets ${what} : il y en a <strong>${n}</strong>.`,
  };
}

// ── Se repérer dans l'espace ────────────────────────────────────────────────

/** Objets posés en rangée sur une étagère : lequel est juste à gauche (à droite) de … ? */
export function besideOf(items: Kind[], ref: Kind, side: "gauche" | "droite"): ExerciseSpec {
  const i = items.indexOf(ref);
  const j = side === "gauche" ? i - 1 : i + 1;
  if (i < 0 || j < 0 || j >= items.length || new Set(items).size !== items.length) throw new Error("besideOf : voisin absent");
  let body = `<metadata>row ${items.join(",")}</metadata><path class="dg-scale" d="M4 70H${items.length * 64 + 8}"/>`;
  items.forEach((k, n) => (body += item(k, 38 + n * 64, 46, 44, 56)));
  const good = NOUN[items[j]!].the;
  const others = items.filter((k) => k !== ref).map((k) => NOUN[k].the);
  return {
    qcm: `Regarde l’étagère. Quel objet est juste <strong>à ta ${side}</strong> ${ofThe(NOUN[ref].the)} ?`,
    fig: svg(items.length * 64 + 12, 78, `Des objets posés en rangée sur une étagère.`, body),
    choices: star(others.slice(0, 4), good),
    why: `<strong>${good}</strong> : en regardant le dessin, il est juste à ${side === "gauche" ? "gauche" : "droite"} ${ofThe(NOUN[ref].the)}.`,
  };
}

/** Une file d'enfants qui marchent vers l'école (à droite) : qui est juste devant (derrière) … ? */
export function inQueue(kids: [string, "fille" | "garçon"][], ref: string, want: "devant" | "derrière"): ExerciseSpec {
  const i = kids.findIndex(([name]) => name === ref);
  const j = want === "devant" ? i + 1 : i - 1;
  if (i < 0 || j < 0 || j >= kids.length) throw new Error("inQueue : voisin absent");
  const width = kids.length * 58 + 70;
  let body = `<metadata>queue ${kids.map(([n]) => n).join(",")}</metadata>`;
  kids.forEach(([name, g], n) => {
    body += item(g === "fille" ? "eleve-fille" : "eleve-garcon", 34 + n * 58, 54, 72);
    body += text(34 + n * 58, 110, name, "dg-text");
  });
  body += `<path class="dg-arrow" d="M${width - 56} 30H${width - 14}m-8-6 8 6-8 6"/>` + text(width - 34, 54, "école", "dg-text");
  const good = kids[j]![0];
  const choices = kids.map(([n]) => n).filter((n) => n !== ref).slice(0, 4);
  return {
    qcm: `Les enfants marchent en file vers l’école. Qui est juste <strong>${want}</strong> ${ref} ?`,
    fig: svg(width, 120, "Une file d’enfants qui marchent vers l’école, à droite.", body),
    choices: star(choices.includes(good) ? choices : [good, ...choices.slice(0, 3)], good),
    why: `<strong>${good}</strong> : l’école est à droite ; ${want === "devant" ? `${good} est plus près de l’école que ${ref}` : `${good} est plus loin de l’école que ${ref}`}, juste à côté.`,
  };
}

/** Objets sur et sous la table, ou en haut et en bas de l'étagère. */
export function levels(place: "table" | "étagère", top: Kind[], bottom: Kind[], ask: "sur" | "sous" | "en haut" | "en bas"): ExerciseSpec {
  const goodList = ask === "sur" || ask === "en haut" ? top : bottom;
  if (goodList.length !== 1) throw new Error("levels : un seul objet à cet endroit");
  let body = `<metadata>levels ${place} top:${top.join(",")} bottom:${bottom.join(",")}</metadata>`;
  if (place === "table") {
    body += `<path class="dg-scale" d="M30 60H250M50 60V126M230 60V126"/>`;
    top.forEach((k, n) => (body += item(k, 90 + n * 100, 38, 40, 50)));
    bottom.forEach((k, n) => (body += item(k, 140 + n * 60, 108, 34, 44)));
  } else {
    body += `<path class="dg-scale" d="M40 10V128M240 10V128M40 62H240M40 126H240"/>`;
    top.forEach((k, n) => (body += item(k, 90 + n * 100, 40, 40, 50)));
    bottom.forEach((k, n) => (body += item(k, 90 + n * 100, 104, 40, 50)));
  }
  const good = NOUN[goodList[0]!].the;
  const where = place === "table" ? (ask === "sur" ? "sur la table" : "sous la table") : ask === "en haut" ? "en haut de l’étagère" : "en bas de l’étagère";
  return {
    qcm: `Quel objet est <strong>${where}</strong> ?`,
    fig: svg(280, 134, place === "table" ? "Une table avec des objets dessus et dessous." : "Une étagère à deux niveaux avec des objets.", body),
    choices: star([...top, ...bottom].map((k) => NOUN[k].the), good),
    why: `<strong>${good}</strong> : c’est le seul objet ${where}.`,
  };
}

/** Course vers la ligne d'arrivée : qui arrive avant (après) les autres, qui sont au même niveau ? */
export function race(runners: [string, "fille" | "garçon", number][], ask: "avant" | "après" | "même niveau"): ExerciseSpec {
  const xs = runners.map(([, , x]) => x);
  let body = `<metadata>race ${runners.map(([n, , x]) => `${n}:${x}`).join(",")}</metadata><path class="dg-arrow" d="M296 4V${runners.length * 50 + 8}"/>`;
  runners.forEach(([name, g, x], n) => {
    body += `<path class="dg-line" d="M4 ${n * 50 + 52}H296"/>`;
    body += item(g === "fille" ? "eleve-fille" : "eleve-garcon", 20 + x * 26, n * 50 + 28, 44) + text(20 + x * 26 + 42, n * 50 + 34, name, "dg-text");
  });
  let good: string;
  let choices: string[];
  let why: string;
  if (ask === "même niveau") {
    const pairs: string[] = [];
    good = "";
    for (let i = 0; i < runners.length; i++)
      for (let j = i + 1; j < runners.length; j++) {
        const p = `${runners[i]![0]} et ${runners[j]![0]}`;
        if (xs[i] === xs[j]) good = p;
        pairs.push(p);
      }
    choices = [good, ...pairs.filter((p) => p !== good)].slice(0, 3);
    why = `<strong>${good}</strong> : ils sont à la même distance de l’arrivée.`;
  } else {
    const target = ask === "avant" ? Math.max(...xs) : Math.min(...xs);
    if (xs.filter((x) => x === target).length !== 1) throw new Error("race : une seule réponse");
    good = runners[xs.indexOf(target)]![0];
    choices = runners.map(([n]) => n);
    why = `<strong>${good}</strong> : ${ask === "avant" ? "c’est l’enfant le plus près de la ligne d’arrivée (à droite)" : "c’est l’enfant le plus loin de la ligne d’arrivée"}.`;
  }
  return {
    qcm:
      ask === "même niveau"
        ? "Les enfants font la course jusqu’à la ligne rouge. Quels enfants sont <strong>au même niveau</strong> ?"
        : `Les enfants font la course jusqu’à la ligne rouge. Qui arrivera <strong>${ask}</strong> les autres ?`,
    fig: svg(304, runners.length * 50 + 12, "Des enfants qui courent vers une ligne d’arrivée rouge, à droite.", body),
    choices: star(choices.sort(), good),
    why,
  };
}

// ── Solides ─────────────────────────────────────────────────────────────────

export type Solid = "cube" | "pavé droit" | "cylindre";

function solid(kind: Solid, x: number): string {
  if (kind === "cylindre")
    return (
      `<path class="dg-solid" d="M${x + 6} 34V96A26 9 0 0 0 ${x + 58} 96V34"/>` +
      `<ellipse class="dg-solid-top" cx="${x + 32}" cy="34" rx="26" ry="9"/>`
    );
  const w = kind === "cube" ? 44 : 64;
  const h = kind === "cube" ? 44 : 32;
  const top = 104 - h;
  return (
    `<rect class="dg-solid" x="${x}" y="${top}" width="${w}" height="${h}"/>` +
    `<path class="dg-solid-top" d="M${x} ${top}l14-14h${w}l-14 14Z"/>` +
    `<path class="dg-solid-side" d="M${x + w} ${top}l14-14v${h}l-14 14Z"/>`
  );
}

export function solidsDrawing(kinds: Solid[]): string {
  let body = `<metadata>solids ${kinds.join(",")}</metadata>`;
  kinds.forEach((k, i) => (body += `<g data-letter="${L(i)}">${solid(k, 8 + i * 92)}${text(40 + i * 92, 128, L(i), "dg-letter")}</g>`));
  return svg(kinds.length * 92 + 6, 136, `Des solides marqués ${kinds.map((_, i) => L(i)).join(", ")}.`, body);
}

/** Quel solide est un cube (un pavé droit, un cylindre) ? */
export function whichSolid(kinds: Solid[], want: Solid): ExerciseSpec {
  if (kinds.filter((k) => k === want).length !== 1) throw new Error("whichSolid : une seule réponse");
  const good = kinds.indexOf(want);
  return {
    qcm: `Quel solide est un <strong>${want}</strong> ?`,
    fig: solidsDrawing(kinds),
    choices: kinds.map((_, i) => (i === good ? `*${L(i)}` : L(i))),
    why: `<strong>${L(good)}</strong> : ${
      want === "cube" ? "toutes ses faces sont des carrés pareils" : want === "pavé droit" ? "il a des faces rectangulaires, comme une boîte d’allumettes" : "il roule et ses deux bouts sont des ronds"
    }.`,
  };
}

const FACE: Record<Solid, string> = { cube: "un carré", "pavé droit": "un rectangle", cylindre: "un rond" };

/** On trace le contour d'un solide posé sur une feuille : quelle figure obtient-on ? */
export function faceOf(kind: Solid, object: string): ExerciseSpec {
  return {
    qcm: `On pose ${object} (${kind === "cylindre" ? "un cylindre" : kind === "cube" ? "un cube" : "un pavé droit"}) sur une feuille et on trace son contour${kind === "cylindre" ? " par le bout" : ""}. Quelle figure obtient-on ?`,
    choices: star(["un carré", "un rectangle", "un rond", "un triangle"], FACE[kind]),
    why: `<strong>${FACE[kind]}</strong> : c’est la forme d’une face ${kind === "cylindre" ? "du bout du cylindre" : kind === "cube" ? "du cube" : "du pavé droit"}.`,
  };
}

/** Patrons : lequel donne un cube (6 carrés en croix) ? */
export function cubeNet(nets: [number, number][][]): ExerciseSpec {
  let body = `<metadata>nets ${nets.map((n) => n.length).join(",")}</metadata>`;
  nets.forEach((cells, i) => {
    const ox = 6 + i * 104;
    body += `<g data-letter="${L(i)}">`;
    for (const [c, r] of cells) body += `<rect class="dg-solid" x="${ox + c * 22}" y="${8 + r * 22}" width="22" height="22"/>`;
    body += `${text(ox + 44, 120, L(i), "dg-letter")}</g>`;
  });
  const good = nets.findIndex((n) => n.length === 6);
  if (good < 0 || nets.filter((n) => n.length === 6).length !== 1) throw new Error("cubeNet : un seul patron de 6 carrés");
  return {
    qcm: "Quel dessin est le <strong>patron d’un cube</strong> ?",
    fig: svg(nets.length * 104 + 4, 128, `Des patrons marqués ${nets.map((_, i) => L(i)).join(", ")}.`, body),
    choices: nets.map((_, i) => (i === good ? `*${L(i)}` : L(i))),
    why: `<strong>${L(good)}</strong> : un cube a 6 faces carrées ; son patron a donc 6 carrés (les autres en ont ${nets.filter((_, i) => i !== good).map((n) => n.length).join(" et ")}).`,
  };
}

// ── Petits nombres : points, double, moitié, ordinaux ───────────────────────

/** Compte les objets dessinés. */
export function countObjects(kind: Kind, n: number): ExerciseSpec {
  return {
    num: `Compte les ${NOUN[kind].many}. Écris leur nombre en chiffres.`,
    fig: pictureRow([{ name: kind, count: n }], `Des ${NOUN[kind].many}.`, 34),
    answer: n,
    why: `On compte les ${NOUN[kind].many} un par un : il y en a <strong>${n}</strong>.`,
  };
}

function dots(n: number, x: number): string {
  let s = `<rect class="dg-box" x="${x}" y="6" width="96" height="52" rx="8"/>`;
  for (let k = 0; k < n; k++) s += `<circle class="dg-node" cx="${x + 16 + (k % 5) * 16}" cy="${k < 5 ? 22 : 42}" r="6"/>`;
  return s;
}

/** Domino : combien de points en tout ? */
export function domino(a: number, b: number): ExerciseSpec {
  if (a > 10 || b > 10) throw new Error("domino : 10 points au plus par case");
  return {
    num: "Combien de points noirs y a-t-il en tout dans les deux cases ?",
    fig: svg(206, 64, "Deux cases avec des points noirs.", dots(a, 4) + dots(b, 106)),
    answer: a + b,
    why: `${a} + ${b} = <strong>${a + b}</strong>.`,
  };
}

/** Il faut n points en tout : combien dans la case vide ? */
export function dominoMissing(total: number, a: number): ExerciseSpec {
  return {
    num: `Il faut <strong>${total}</strong> points noirs en tout. Combien de points faut-il mettre dans la case vide ?`,
    fig: svg(206, 64, "Une case avec des points noirs et une case vide.", dots(a, 4) + `<rect class="dg-blank" x="106" y="6" width="96" height="52" rx="8"/>`),
    answer: total - a,
    why: `${a} + … = ${total} ; ${total} − ${a} = <strong>${total - a}</strong>.`,
  };
}

export function double(n: number): ExerciseSpec {
  return { num: `Quel est le <strong>double</strong> de <strong>${n}</strong> ?`, answer: 2 * n, why: `Le double, c’est deux fois le nombre : ${n} + ${n} = <strong>${2 * n}</strong>.` };
}

export function half(n: number): ExerciseSpec {
  if (n % 2) throw new Error("half : nombre pair");
  return { num: `Quelle est la <strong>moitié</strong> de <strong>${n}</strong> ?`, answer: n / 2, why: `On partage ${n} en deux parts égales : ${n / 2} + ${n / 2} = ${n}. La moitié est <strong>${n / 2}</strong>.` };
}

/** « a est … de b » : le double ou la moitié. */
export function doubleOrHalf(a: number, b: number): ExerciseSpec {
  const good = a === 2 * b ? "le double" : b === 2 * a ? "la moitié" : null;
  if (!good) throw new Error("doubleOrHalf : a = 2b ou b = 2a");
  return {
    qcm: `Complète : <strong>${a}</strong> est … de <strong>${b}</strong>.`,
    choices: star(["le double", "la moitié"], good),
    why: `<strong>${good}</strong> : ${good === "le double" ? `${b} + ${b} = ${a}` : `${a} + ${a} = ${b}`}.`,
  };
}

export const ORDINALS = ["", "premier", "deuxième", "troisième", "quatrième", "cinquième", "sixième", "septième", "huitième", "neuvième", "dixième"];

/** Écrire un rang en lettres : 3e → troisième. */
export function ordinalWord(n: number): ExerciseSpec {
  const near = [n - 1, n, n + 1].filter((v) => v >= 1 && v <= 10);
  return {
    qcm: `Comment écrit-on <strong>${n}<sup>${n === 1 ? "er" : "e"}</sup></strong> en lettres ?`,
    choices: star(near.map((v) => ORDINALS[v]!), ORDINALS[n]!),
    why: `<strong>${ORDINALS[n]}</strong> : c’est la place numéro ${n}.`,
  };
}

// ── Modèles, rythmes, tableaux ──────────────────────────────────────────────

/** Quelle reproduction est pareille au modèle ? (suites de formes) */
export function copyOfModel(model: string, variants: string[]): ExerciseSpec {
  if (!variants.includes(model) || new Set(variants).size !== variants.length) throw new Error("copyOfModel : une seule bonne copie");
  return {
    qcm: `Voici le modèle : <strong>${model}</strong>. Quelle reproduction est exactement pareille ?`,
    choices: star(variants, model),
    why: `<strong>${model}</strong> : mêmes formes, dans le même ordre ; les autres ont une forme changée ou déplacée.`,
  };
}

/** Rythme récursif : on ajoute toujours le même nombre de ronds. Combien dans le groupe suivant ? */
export function growing(counts: number[]): ExerciseSpec {
  const step = counts[1]! - counts[0]!;
  if (counts.some((c, i) => i > 0 && c - counts[i - 1]! !== step)) throw new Error("growing : même écart");
  let body = `<metadata>growing ${counts.join(",")}</metadata>`;
  let x = 6;
  for (const c of counts) {
    const cols = Math.ceil(c / 2);
    const w = cols * 18 + 12;
    body += `<rect class="dg-group" x="${x}" y="6" width="${w}" height="52" rx="10"/>`;
    for (let k = 0; k < c; k++) body += `<circle class="dg-token" cx="${x + 15 + Math.floor(k / 2) * 18}" cy="${k % 2 ? 42 : 22}" r="7"/>`;
    x += w + 10;
  }
  body += `<rect class="dg-blank" x="${x}" y="6" width="44" height="52" rx="10"/>` + text(x + 22, 38, "?", "dg-text");
  const next = counts.at(-1)! + step;
  return {
    num: "Combien de ronds faut-il dessiner dans le groupe suivant ?",
    fig: svg(x + 50, 64, "Des groupes de ronds de plus en plus grands, puis une case vide.", body),
    answer: next,
    why: `On ajoute ${step} rond${step > 1 ? "s" : ""} à chaque fois : ${counts.at(-1)} + ${step} = <strong>${next}</strong>.`,
  };
}

/** Tableau à double entrée (enfants × objets, ✔ = aime) : qu'aime tel enfant ? */
export function likesTable(people: string[], items: Kind[], likes: number[][], person: string, what: string): ExerciseSpec {
  const p = people.indexOf(person);
  if (p < 0 || likes[p]!.length !== 1) throw new Error("likesTable : une seule réponse");
  const head = items
    .map((k) => {
      const [w, h] = pictureSize(k);
      return `<th><img class="dg-pic" src="/illustrations/${k}.svg" alt="${esc(NOUN[k].the)}" width="${Math.round((28 * w) / h)}" height="28"></th>`;
    })
    .join("");
  const rows = people.map((name, r) => `<tr><th>${name}</th>${items.map((_, c) => `<td>${likes[r]!.includes(c) ? "✔" : ""}</td>`).join("")}</tr>`).join("");
  const good = NOUN[items[likes[p]![0]!]!].the;
  return {
    qcm: `Lis le tableau. Quel ${what} aime ${person} ?`,
    fig: `<div class="dg-scroll"><table class="dg-cal"><thead><tr><th></th>${head}</tr></thead><tbody>${rows}</tbody></table></div>`,
    choices: star(items.map((k) => NOUN[k].the), good),
    why: `<strong>${good}</strong> : sur la ligne de ${person}, la coche ✔ est dans la colonne ${ofThe(good)}.`,
  };
}

// ── Longueurs et tailles ────────────────────────────────────────────────────

/** Rubans (bâtons, crayons) alignés à gauche : lequel est le plus long (court) ? */
export function longest(lengths: number[], want: "le plus long" | "le plus court", thing: string): ExerciseSpec {
  const target = want === "le plus long" ? Math.max(...lengths) : Math.min(...lengths);
  if (lengths.filter((v) => v === target).length !== 1) throw new Error("longest : une seule réponse");
  let body = `<metadata>bars ${lengths.join(",")}</metadata>`;
  lengths.forEach((v, i) => (body += text(12, 24 + i * 32, L(i), "dg-letter") + `<rect class="dg-cube" x="28" y="${12 + i * 32}" width="${v * 24}" height="16" rx="4"/>`));
  const good = lengths.indexOf(target);
  return {
    qcm: `Quel ${thing} est <strong>${want}</strong> ?`,
    fig: svg(Math.max(...lengths) * 24 + 36, lengths.length * 32 + 8, `Des ${thing}s marqués ${lengths.map((_, i) => L(i)).join(", ")}, alignés à gauche.`, body),
    choices: lengths.map((_, i) => (i === good ? `*${L(i)}` : L(i))),
    why: `<strong>${L(good)}</strong> : les ${thing}s partent du même endroit ; c’est celui qui ${want === "le plus long" ? "va le plus loin" : "s’arrête le plus tôt"}.`,
  };
}

/** Enfants de tailles différentes : lequel est le plus grand (petit) ? */
export function tallest(heights: number[], want: "le plus grand" | "le plus petit"): ExerciseSpec {
  const target = want === "le plus grand" ? Math.max(...heights) : Math.min(...heights);
  if (heights.filter((v) => v === target).length !== 1) throw new Error("tallest : une seule réponse");
  let body = `<metadata>heights ${heights.join(",")}</metadata><path class="dg-scale" d="M4 112H${heights.length * 60 + 8}"/>`;
  heights.forEach((h, i) => (body += item(i % 2 ? "eleve-garcon" : "eleve-fille", 34 + i * 60, 110 - h / 2, h) + text(34 + i * 60, 132, L(i), "dg-letter")));
  const good = heights.indexOf(target);
  return {
    qcm: `Quel enfant est <strong>${want}</strong> ?`,
    fig: svg(heights.length * 60 + 12, 140, `Des enfants marqués ${heights.map((_, i) => L(i)).join(", ")}, debout côte à côte.`, body),
    choices: heights.map((_, i) => (i === good ? `*${L(i)}` : L(i))),
    why: `<strong>${L(good)}</strong> : les pieds sont au même niveau ; c’est la tête ${want === "le plus grand" ? "la plus haute" : "la plus basse"}.`,
  };
}
