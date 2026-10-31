import "server-only";

// Mesures du primaire : dessins (objets mesurés en mètres ou en empans, distances, verres, bouteilles,
// balances, horloges, calendrier, pièces) et questions corrigées automatiquement. Les réponses sont
// calculées à partir des mêmes données que le dessin ; tests/unit/primary-exercises.test.ts les
// recalcule à partir du dessin (longueurs, hauteurs d'eau, aiguilles, pièces…).

import { pictureRow, pictureSize, svg, text, type PictureName } from "./drawings";
import type { ExerciseSpec } from "./exercise-series";

const L = (i: number) => String.fromCharCode(65 + i);
const choiceLetters = (n: number, good: number) => Array.from({ length: n }, (_, i) => (i === good ? `*${L(i)}` : L(i)));

function image(name: PictureName, cx: number, cy: number, h: number): string {
  const [pw, ph] = pictureSize(name);
  const w = (h * pw) / ph;
  return `<image class="dg-item" href="/illustrations/${name}.svg" x="${(cx - w / 2).toFixed(1)}" y="${(cy - h / 2).toFixed(1)}" width="${w.toFixed(1)}" height="${h}"/>`;
}

// ── Longueurs ───────────────────────────────────────────────────────────────

const U = 34;

/** Objets (bâtons lettrés) mesurés avec une unité : règles d'un mètre ou empans, dessinés dessous. */
export function measuredDrawing(units: number[], unit: "mètre" | "empan", letters = true): string {
  const width = 30 + Math.max(...units) * U + 10;
  let body = "";
  units.forEach((n, i) => {
    const y = 10 + i * 56;
    let g = letters ? text(12, y + 8, L(i), "dg-letter") : "";
    g += `<rect class="dg-object" x="26" y="${y}" width="${n * U}" height="16" rx="6"/>`;
    for (let k = 0; k < n; k++) {
      const x = 26 + k * U;
      g +=
        unit === "mètre"
          ? `<rect class="${k % 2 ? "dg-stick-alt" : "dg-stick"}" x="${x}" y="${y + 24}" width="${U}" height="10"/>`
          : `<path class="dg-span" d="M${x + 2} ${y + 36}Q${x + U / 2} ${y + 18} ${x + U - 2} ${y + 36}"/>`;
    }
    body += letters ? `<g data-letter="${L(i)}">${g}</g>` : g;
  });
  const what = unit === "mètre" ? "des règles d’un mètre posées bout à bout" : "des empans (la main ouverte) marqués bout à bout";
  return svg(width, units.length * 56 + 4, `${units.length > 1 ? `${units.length} objets marqués ${units.map((_, i) => L(i)).join(", ")}` : "Un objet"}, mesurés avec ${what}.`, body);
}

/** Lequel est le plus long (le plus court) ? */
export function longestOf(units: number[], unit: "mètre" | "empan", want: "le plus long" | "le plus court"): ExerciseSpec {
  const target = want === "le plus long" ? Math.max(...units) : Math.min(...units);
  if (units.filter((u) => u === target).length !== 1) throw new Error("longestOf : une seule bonne réponse");
  const i = units.indexOf(target);
  const word = unit === "mètre" ? "règles d’un mètre" : "empans";
  return {
    qcm: `Lequel est <strong>${want}</strong> ?`,
    fig: measuredDrawing(units, unit),
    choices: choiceLetters(units.length, i),
    why: `<strong>${L(i)}</strong> : il mesure ${target} ${word}${units.length > 1 ? `, les autres ${units.filter((_, k) => k !== i).join(" et ")}` : ""}.`,
  };
}

/** Lequel est aussi long que l'objet donné ? */
export function asLongAs(units: number[], unit: "mètre" | "empan", ref: number): ExerciseSpec {
  const others = units.map((u, i) => ({ u, i })).filter((x) => x.i !== ref);
  const good = others.filter((x) => x.u === units[ref]);
  if (good.length !== 1) throw new Error("asLongAs : une seule bonne réponse");
  return {
    qcm: `Lequel est <strong>aussi long</strong> que ${L(ref)} ?`,
    fig: measuredDrawing(units, unit),
    choices: others.map((x) => (x.i === good[0]!.i ? `*${L(x.i)}` : L(x.i))),
    why: `<strong>${L(good[0]!.i)}</strong> : comme ${L(ref)}, il mesure ${units[ref]} ${unit === "mètre" ? "règles d’un mètre" : "empans"}.`,
  };
}

/** Longueur d'un objet en mètres (règles d'un mètre posées dessous). */
export function metersOf(n: number, object: string): ExerciseSpec {
  return {
    num: `Combien de mètres mesure ${object} ? Chaque règle mesure 1 mètre.`,
    fig: measuredDrawing([n], "mètre", false),
    answer: n,
    why: `On compte les règles d’un mètre : ${object} mesure <strong>${n} m</strong>.`,
  };
}

const CM = 22;

/** Un objet (crayon) posé sur une règle graduée en centimètres, son bout gauche sur le 0. */
export function rulerDrawing(cm: number): string {
  const len = Math.max(cm + 2, 10);
  let body = `<metadata>ruler ${CM}</metadata><rect class="dg-ruler" x="6" y="40" width="${len * CM + 16}" height="34" rx="3"/>`;
  for (let i = 0; i <= len; i++) {
    const x = 14 + i * CM;
    body += `<path class="dg-line" d="M${x} 40v12"/>${text(x, 62, i, "dg-ruler-num")}`;
    if (i < len) body += `<path class="dg-line" d="M${x + CM / 2} 40v6"/>`;
  }
  body +=
    `<path class="dg-pencil" d="M14 18H${14 + cm * CM - 14}L${14 + cm * CM} 25L${14 + cm * CM - 14} 32H14Z"/>` +
    `<path class="dg-pencil-tip" d="M${14 + cm * CM - 14} 18L${14 + cm * CM} 25L${14 + cm * CM - 14} 32Z"/>`;
  return svg(len * CM + 28, 80, "Un crayon posé au-dessus d’une règle graduée en centimètres, son bout gauche en face du 0.", body);
}

/** Longueur en centimètres lue sur la règle. */
export function cmOf(cm: number, object = "le crayon"): ExerciseSpec {
  return {
    num: `Combien de centimètres mesure ${object} ? Lis la règle.`,
    fig: rulerDrawing(cm),
    answer: cm,
    why: `${object[0]!.toUpperCase()}${object.slice(1)} commence au 0 et finit en face du ${cm} : il mesure <strong>${cm} cm</strong>.`,
  };
}

/** Un point de repère (dessin) et des objets lettrés reliés à lui par des pointillés. */
export function distancesDrawing(ref: PictureName, spots: [number, number][], thing: PictureName): string {
  const rx = 40;
  const ry = 90;
  let body = image(ref, rx, ry, 70);
  spots.forEach(([x, y], i) => {
    body += `<g data-letter="${L(i)}"><path class="dg-dash" d="M${rx + 18} ${ry}L${x} ${y}"/>${image(thing, x, y, 30)}${text(x + 18, y - 16, L(i), "dg-letter")}</g>`;
  });
  return svg(320, 180, `Un repère à gauche et des dessins marqués ${spots.map((_, i) => L(i)).join(", ")}, reliés à lui par des pointillés.`, body);
}

/** Le plus près ou le plus loin du repère. */
export function nearOrFar(ref: PictureName, refWord: string, spots: [number, number][], thing: PictureName, want: "le plus près" | "le plus loin"): ExerciseSpec {
  const d = spots.map(([x, y]) => Math.hypot(x - 58, y - 90));
  const target = want === "le plus près" ? Math.min(...d) : Math.max(...d);
  const i = d.indexOf(target);
  return {
    qcm: `Lequel est <strong>${want}</strong> de ${refWord} ?`,
    fig: distancesDrawing(ref, spots, thing),
    choices: choiceLetters(spots.length, i),
    why: `<strong>${L(i)}</strong> : le pointillé qui le relie à ${refWord} est ${want === "le plus près" ? "le plus court" : "le plus long"}.`,
  };
}

// ── Capacités ───────────────────────────────────────────────────────────────

/** Verres identiques lettrés, remplis d'eau jusqu'à un niveau (de 1 à 6). */
export function glassesDrawing(levels: number[]): string {
  let body = "";
  levels.forEach((lv, i) => {
    const x = 14 + i * 62;
    const top = 26;
    const bottom = 96;
    const water = bottom - (lv * (bottom - top - 6)) / 6;
    const k = (y: number) => ((y - top) / (bottom - top)) * 6;
    body +=
      `<g data-letter="${L(i)}">` +
      text(x + 22, 12, L(i), "dg-letter") +
      `<polygon class="dg-water" points="${x + k(water)},${water.toFixed(1)} ${x + 44 - k(water)},${water.toFixed(1)} ${x + 38},${bottom} ${x + 6},${bottom}"/>` +
      `<path class="dg-glass" d="M${x} ${top}L${x + 6} ${bottom}H${x + 38}L${x + 44} ${top}"/>` +
      `</g>`;
  });
  return svg(levels.length * 62 + 14, 104, `${levels.length} verres identiques marqués ${levels.map((_, i) => L(i)).join(", ")}, avec plus ou moins d’eau.`, body);
}

/** Quel verre a plus (moins, autant) d'eau que le verre de référence ? */
export function glassCompare(levels: number[], ref: number, want: "plus" | "moins" | "autant"): ExerciseSpec {
  const others = levels.map((lv, i) => ({ lv, i })).filter((x) => x.i !== ref);
  const ok = (lv: number) => (want === "plus" ? lv > levels[ref]! : want === "moins" ? lv < levels[ref]! : lv === levels[ref]);
  const good = others.filter((x) => ok(x.lv));
  if (good.length !== 1) throw new Error("glassCompare : une seule bonne réponse");
  return {
    qcm: `Quel verre a <strong>${want}</strong> d’eau ${want === "autant" ? "que" : "que"} ${L(ref)} ?`,
    fig: glassesDrawing(levels),
    choices: others.map((x) => (x.i === good[0]!.i ? `*${L(x.i)}` : L(x.i))),
    why: `<strong>${L(good[0]!.i)}</strong> : son eau monte ${want === "plus" ? "plus haut que" : want === "moins" ? "moins haut que" : "aussi haut que"} celle de ${L(ref)} (les verres sont pareils).`,
  };
}

/** Le verre qui a le plus (le moins) d'eau. */
export function glassMost(levels: number[], want: "le plus" | "le moins"): ExerciseSpec {
  const target = want === "le plus" ? Math.max(...levels) : Math.min(...levels);
  if (levels.filter((l) => l === target).length !== 1) throw new Error("glassMost : une seule bonne réponse");
  const i = levels.indexOf(target);
  return {
    qcm: `Quel verre a <strong>${want}</strong> d’eau ?`,
    fig: glassesDrawing(levels),
    choices: choiceLetters(levels.length, i),
    why: `<strong>${L(i)}</strong> : son eau monte ${want === "le plus" ? "le plus haut" : "le moins haut"}.`,
  };
}

/** Ranger les verres de celui qui a le plus d'eau à celui qui en a le moins. */
export function glassOrder(levels: number[]): ExerciseSpec {
  if (new Set(levels).size !== levels.length) throw new Error("glassOrder : niveaux tous différents");
  const order = levels.map((lv, i) => ({ lv, l: L(i) })).sort((a, b) => b.lv - a.lv).map((x) => x.l);
  return {
    text: "Range les verres de celui qui a le <strong>plus</strong> d’eau à celui qui en a le <strong>moins</strong>. Écris les lettres, séparées par des espaces.",
    fig: glassesDrawing(levels),
    answer: order.join(" "),
    accept: [order.join(", "), order.join(" - "), order.join(""), order.join(" > ")],
    why: `<strong>${order.join(", ")}</strong> : on regarde jusqu’où l’eau monte dans chaque verre.`,
  };
}

const CAP_LABEL: Record<number, string> = { 1: "1 ℓ", 0.5: "½ ℓ", 0.25: "¼ ℓ" };

/** Bouteilles de 1 ℓ, ½ ℓ et ¼ ℓ (tailles différentes), étiquetées ou non, lettrées ou non. */
export function bottlesDrawing(sizes: (1 | 0.5 | 0.25)[], labels: boolean, letters: boolean): string {
  let body = "";
  sizes.forEach((s, i) => {
    const h = s === 1 ? 74 : s === 0.5 ? 54 : 38;
    const w = s === 1 ? 30 : s === 0.5 ? 24 : 18;
    const x = 14 + i * 50;
    const base = 96;
    const top = base - h;
    const neck = w * 0.4;
    let g =
      `<path class="dg-bottle" d="M${x + 25 - neck / 2} ${top}h${neck}v${h * 0.18}q${w / 2 - neck / 2} ${h * 0.06} ${w / 2 - neck / 2} ${h * 0.18}V${base}H${x + 25 - w / 2}V${top + h * 0.36}q0 ${-h * 0.12} ${w / 2 - neck / 2} ${-h * 0.18}Z"/>` +
      `<rect class="dg-bottle-cap" x="${x + 25 - neck / 2 - 1}" y="${top - 6}" width="${neck + 2}" height="7" rx="2"/>`;
    if (labels) g += text(x + 25, base + 14, CAP_LABEL[s]!, "dg-cap");
    if (letters) g += text(x + 25, top - 16, L(i), "dg-letter");
    body += letters ? `<g data-letter="${L(i)}">${g}</g>` : `<g>${g}</g>`;
  });
  const height = labels ? 116 : 104;
  return svg(sizes.length * 50 + 14, height, `${sizes.length} bouteille${sizes.length > 1 ? "s" : ""}${labels ? " étiquetées" : " de tailles différentes"}${letters ? `, marquées ${sizes.map((_, i) => L(i)).join(", ")}` : ""}.`, body);
}

/** Capacité totale de plusieurs bouteilles (total entier). */
export function litresTotal(sizes: (1 | 0.5 | 0.25)[]): ExerciseSpec {
  const total = sizes.reduce((s, v) => s + v, 0);
  if (!Number.isInteger(total)) throw new Error("litresTotal : total entier attendu");
  return {
    num: "Quelle est la capacité totale de ces bouteilles, en litres ?",
    fig: bottlesDrawing(sizes, true, false),
    answer: total,
    why: `${sizes.map((s) => CAP_LABEL[s]).join(" + ")} = <strong>${total} ℓ</strong>${sizes.some((s) => s < 1) ? " (2 demi-litres font 1 litre, 4 quarts de litre aussi)" : ""}.`,
  };
}

/** Quelle bouteille contient 1 ℓ, ½ ℓ ou ¼ ℓ ? (la plus grande, la moyenne, la plus petite) */
export function whichBottle(sizes: (1 | 0.5 | 0.25)[], want: 1 | 0.5 | 0.25): ExerciseSpec {
  const i = sizes.indexOf(want);
  const word = { 1: "1 litre", 0.5: "un demi-litre (½ ℓ)", 0.25: "un quart de litre (¼ ℓ)" }[want];
  return {
    qcm: `Quelle bouteille contient <strong>${word}</strong> ?`,
    fig: bottlesDrawing(sizes, false, true),
    choices: choiceLetters(sizes.length, i),
    why: `<strong>${L(i)}</strong> : ${want === 1 ? "c’est la plus grande" : want === 0.5 ? "elle est moyenne : il en faut 2 pour faire 1 litre" : "c’est la plus petite : il en faut 4 pour faire 1 litre"}.`,
  };
}

// ── Masses ──────────────────────────────────────────────────────────────────

/** Balance à deux plateaux : le côté le plus lourd descend (equal : en équilibre). */
export function balanceDrawing(left: string, right: string, heavier: "gauche" | "droite" | "égal", wideRight = false): string {
  const tilt = heavier === "gauche" ? 12 : heavier === "droite" ? -12 : 0;
  const ly = 70 + tilt;
  const ry = 70 - tilt;
  const body =
    `<metadata>balance ${ly} ${ry}</metadata>` +
    `<path class="dg-scale" d="M120 132V70M100 136H140"/>` +
    `<path class="dg-scale" d="M40 ${ly}L200 ${ry}"/>` +
    `<path class="dg-pan" d="M10 ${ly}h60q-4 16-30 16t-30-16Z"/>` +
    // Plateau droit plus large quand il porte plusieurs masses marquées.
    (wideRight
      ? `<path class="dg-pan" d="M155 ${ry}h90q-6 16-45 16t-45-16Z"/>`
      : `<path class="dg-pan" d="M170 ${ry}h60q-4 16-30 16t-30-16Z"/>`) +
    `<g transform="translate(40 ${ly - 22})">${left}</g>` +
    `<g transform="translate(200 ${ry - 22})">${right}</g>`;
  return svg(262, 142, `Une balance à deux plateaux. ${heavier === "égal" ? "Elle est en équilibre." : "Un plateau est plus bas que l’autre."}`, body);
}

const WORDS: Partial<Record<PictureName, string>> = { mangue: "la mangue", orange: "l’orange", banane: "la banane", pasteque: "la pastèque" };

/** Quel fruit est le plus lourd (le plus léger) ? D'après la balance. */
export function heavierFruit(left: PictureName, right: PictureName, heavier: "gauche" | "droite", want: "le plus lourd" | "le plus léger"): ExerciseSpec {
  const heavy = heavier === "gauche" ? left : right;
  const light = heavier === "gauche" ? right : left;
  const good = want === "le plus lourd" ? heavy : light;
  const word = (p: PictureName) => WORDS[p] ?? p;
  return {
    qcm: `Regarde la balance. Quel fruit est <strong>${want}</strong> ?`,
    fig: balanceDrawing(image(left, 0, 0, 40), image(right, 0, 0, 40), heavier),
    choices: [left, right].map((p) => (p === good ? `*${word(p)}` : word(p))),
    why: `<strong>${word(good)}</strong> : le plateau ${want === "le plus lourd" ? "le plus lourd descend" : "le plus léger monte"}, et ${word(good)} est sur le plateau ${want === "le plus lourd" ? "le plus bas" : "le plus haut"}.`,
  };
}

const KG_LABEL: Record<number, string> = { 1: "1 kg", 0.5: "½ kg", 0.25: "¼ kg" };

/** Masses marquées (1 kg, ½ kg, ¼ kg) posées sur un plateau. */
export function weights(list: (1 | 0.5 | 0.25)[]): string {
  return list
    .map((w, i) => {
      // Masses assez grandes pour lire « 1 kg », « ½ kg », « ¼ kg » sur un téléphone.
      const s = w === 1 ? 30 : w === 0.5 ? 28 : 26;
      const x = -45 + (i % 3) * 30 + (30 - s) / 2;
      const y = 4 - Math.floor(i / 3) * 22;
      return `<path class="dg-weight" d="M${x} ${y + 18}l3 ${-s * 0.6}h${s - 6}l3 ${s * 0.6}Z"/>${text(x + s / 2, y + 10, KG_LABEL[w]!, "dg-kg")}`;
    })
    .join("");
}

/** Masse d'un objet en équilibre avec des masses marquées (total entier de kilogrammes). */
export function massInKg(object: PictureName, objectWord: string, list: (1 | 0.5 | 0.25)[]): ExerciseSpec {
  const total = list.reduce((s, v) => s + v, 0);
  if (!Number.isInteger(total)) throw new Error("massInKg : total entier attendu");
  return {
    num: `La balance est en équilibre. Quelle est la masse ${objectWord}, en kilogrammes ?`,
    fig: balanceDrawing(image(object, 0, -4, 48), weights(list), "égal", true),
    answer: total,
    why: `La balance est en équilibre : la masse ${objectWord} est égale à celle des masses marquées, ${list.map((w) => KG_LABEL[w]).join(" + ")} = <strong>${total} kg</strong>.`,
  };
}

// ── Heure ───────────────────────────────────────────────────────────────────

/** Horloge à aiguilles : petite aiguille (heures) et grande aiguille (minutes). */
export function clockDrawing(h: number, m: number, letter?: string): string {
  const cx = 60;
  const cy = 60;
  let body = `<circle class="dg-clock" cx="${cx}" cy="${cy}" r="54"/>`;
  for (let i = 1; i <= 12; i++) {
    const a = (i * Math.PI) / 6;
    body += text(cx + Math.sin(a) * 42, cy - Math.cos(a) * 42, i, "dg-clock-num");
  }
  const hand = (cls: string, angle: number, len: number) => {
    const a = (angle * Math.PI) / 180;
    return `<line class="${cls}" x1="${cx}" y1="${cy}" x2="${(cx + Math.sin(a) * len).toFixed(1)}" y2="${(cy - Math.cos(a) * len).toFixed(1)}"/>`;
  };
  body += hand("dg-hand-h", ((h % 12) + m / 60) * 30, 26) + hand("dg-hand-m", m * 6, 40) + `<circle class="dg-node" cx="${cx}" cy="${cy}" r="4"/>`;
  const g = letter ? `<g data-letter="${letter}">${text(cx, 6, letter, "dg-letter")}<g transform="translate(0 12)">${body}</g></g>` : body;
  return svg(120, letter ? 132 : 120, letter ? `Horloge ${letter}.` : "Une horloge à aiguilles.", g);
}

const hourText = (h: number, m: number) => (m === 0 ? `${h} h` : `${h} h ${m}`);

/** Lire l'heure (heure juste ou demie) ; réponse « 9 h » ou « 9 h 30 », écritures courantes acceptées. */
export function readClock(h: number, m: 0 | 30): ExerciseSpec {
  const main = m === 0 ? `${h} h` : `${h} h 30`;
  const accept =
    m === 0
      ? [`${h}h`, `${h} h 00`, `${h}h00`, `${h} h 00 min`, `${h} h 0 min`, `${h} heures`, `${h} heure`, `${h}:00`]
      : [`${h}h30`, `${h} h 30 min`, `${h}h 30`, `${h} heures 30`, `${h} heures et demie`, `${h} h et demie`, `${h}:30`];
  return {
    text: "Quelle heure indique l’horloge ? Écris-la comme dans l’exemple : 7 h ou 7 h 30.",
    fig: clockDrawing(h, m),
    answer: main,
    accept,
    why:
      m === 0
        ? `La grande aiguille est sur 12 et la petite sur ${h} : il est <strong>${h} h</strong>.`
        : `La grande aiguille est sur 6 (30 minutes) et la petite est entre ${h} et ${(h % 12) + 1} : il est <strong>${h} h 30</strong>.`,
  };
}

/** Quelle horloge indique l'heure demandée ? */
export function whichClock(clocks: [number, 0 | 30][], target: number): ExerciseSpec {
  const [h, m] = clocks[target]!;
  const figs = clocks.map(([ch, cm], i) => clockDrawing(ch, cm, L(i))).join("");
  return {
    qcm: `Quelle horloge indique <strong>${hourText(h, m)}</strong> ?`,
    fig: `<p class="dg-pics">${figs}</p>`,
    choices: choiceLetters(clocks.length, target),
    why: `<strong>${L(target)}</strong> : ${m === 0 ? `la grande aiguille est sur 12 et la petite sur ${h}` : `la grande aiguille est sur 6 et la petite entre ${h} et ${(h % 12) + 1}`}.`,
  };
}

// ── Jours, mois, saisons, calendrier ───────────────────────────────────────

export const DAYS = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];
export const MONTHS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];

/** Le jour qui vient juste après (ou juste avant) un jour donné. */
export function dayNext(day: string, dir: "après" | "avant"): ExerciseSpec {
  const i = DAYS.indexOf(day);
  const answer = DAYS[(i + (dir === "après" ? 1 : 6)) % 7]!;
  return {
    text: `Quel jour vient juste <strong>${dir}</strong> le <strong>${day}</strong> ?`,
    answer,
    accept: [`le ${answer}`],
    why: `Les jours de la semaine : ${DAYS.join(", ")}. ${dir === "après" ? `Après ${day} vient` : `Avant ${day} vient`} <strong>${answer}</strong>.`,
  };
}

/** Le mois qui vient juste après (ou juste avant) un mois donné. */
export function monthNext(month: string, dir: "après" | "avant"): ExerciseSpec {
  const i = MONTHS.indexOf(month);
  const answer = MONTHS[(i + (dir === "après" ? 1 : 11)) % 12]!;
  return {
    text: `Quel mois vient juste <strong>${dir}</strong> <strong>${month}</strong> ?`,
    answer,
    accept: [`en ${answer}`, `le mois de ${answer}`],
    why: `Les mois de l’année : ${MONTHS.join(", ")}. ${dir === "après" ? `Après ${month} vient` : `Avant ${month} vient`} <strong>${answer}</strong>.`,
  };
}

/** Saison au Sénégal : saison sèche (novembre à avril), saison des pluies (juillet à octobre). */
export const DRY = ["novembre", "décembre", "janvier", "février", "mars", "avril"];
export const RAINY = ["juillet", "août", "septembre", "octobre"];
export function seasonOf(month: string): ExerciseSpec {
  const dry = DRY.includes(month);
  if (!dry && !RAINY.includes(month)) throw new Error(`seasonOf : ${month} est un mois de passage d’une saison à l’autre`);
  return {
    qcm: `Au Sénégal, en <strong>${month}</strong>, est-ce la saison sèche ou la saison des pluies ?`,
    choices: dry ? ["*la saison sèche", "la saison des pluies"] : ["la saison sèche", "*la saison des pluies"],
    why: `<strong>${dry ? "La saison sèche" : "La saison des pluies"}</strong> : ${dry ? "elle va de novembre à avril" : "elle va de juillet à octobre"}.`,
  };
}

/** Calendrier d'un mois (tableau du lundi au dimanche). start : 0 = le 1er est un lundi. */
export function calendarTable(month: string, year: number, start: number, days: number): string {
  const cells: string[] = [...Array(start).fill(""), ...Array.from({ length: days }, (_, i) => String(i + 1))];
  while (cells.length % 7) cells.push("");
  const rows: string[] = [];
  for (let i = 0; i < cells.length; i += 7) rows.push(`<tr>${cells.slice(i, i + 7).map((d) => `<td>${d}</td>`).join("")}</tr>`);
  const heads = ["Lun.", "Mar.", "Mer.", "Jeu.", "Ven.", "Sam.", "Dim."];
  return (
    `<table class="dg-cal"><caption>${month[0]!.toUpperCase()}${month.slice(1)} ${year}</caption>` +
    `<thead><tr>${heads.map((h) => `<th>${h}</th>`).join("")}</tr></thead><tbody>${rows.join("")}</tbody></table>`
  );
}

/** Quel jour de la semaine tombe une date du calendrier ? */
export function weekdayOf(month: string, year: number, start: number, days: number, date: number): ExerciseSpec {
  const answer = DAYS[(start + date - 1) % 7]!;
  return {
    text: `Regarde le calendrier. Quel jour de la semaine est le <strong>${date}</strong> ${month} ?`,
    fig: calendarTable(month, year, start, days),
    answer,
    accept: [`le ${answer}`, `un ${answer}`],
    why: `Le ${date} est dans la colonne <strong>${answer}</strong>.`,
  };
}

/** Combien de fois un jour revient-il dans le mois ? */
export function countWeekday(month: string, year: number, start: number, days: number, weekday: string): ExerciseSpec {
  const w = DAYS.indexOf(weekday);
  const dates = Array.from({ length: days }, (_, i) => i + 1).filter((d) => (start + d - 1) % 7 === w);
  return {
    num: `Regarde le calendrier. Combien y a-t-il de <strong>${weekday}s</strong> en ${month} ${year} ?`,
    fig: calendarTable(month, year, start, days),
    answer: dates.length,
    why: `Les ${weekday}s sont le ${dates.join(", le ")} : <strong>${dates.length}</strong>.`,
  };
}

/** Nombre de jours du mois (dernière date du calendrier). */
export function daysInMonth(month: string, year: number, start: number, days: number): ExerciseSpec {
  return {
    num: `Regarde le calendrier. Combien de jours y a-t-il en ${month} ${year} ?`,
    fig: calendarTable(month, year, start, days),
    answer: days,
    why: `Le dernier jour du mois est le ${days} : <strong>${days}</strong> jours.`,
  };
}

/** Question de connaissance à choix (durée, vitesse…) : la bonne réponse est en tête de la correction. */
export function fact(question: string, choices: string[], why: string): ExerciseSpec {
  const good = choices.find((c) => c.startsWith("*"))!.slice(1);
  return { qcm: question, choices, why: `<strong>${good}</strong> : ${why}` };
}

// ── Monnaie ─────────────────────────────────────────────────────────────────

type Coin = 5 | 10 | 25 | 50 | 100;
/** Billets de banque dessinés simplement (rectangle et valeur), sans reproduire de vrai billet. */
export function notesDrawing(values: number[], perRow = 3): string {
  const cols = Math.min(values.length, perRow);
  let body = "";
  values.forEach((v, i) => {
    const x = 4 + (i % perRow) * 128;
    const y = 6 + Math.floor(i / perRow) * 70;
    const value = String(v).replace(/\B(?=(\d{3})+(?!\d))/g," ");
    body += `<rect class="dg-note" x="${x}" y="${y}" width="120" height="58" rx="6"/><circle class="dg-node" cx="${x + 22}" cy="${y + 29}" r="10"/>${text(x + 74, y + 29, `${value} F`)}`;
  });
  return svg(cols * 128 + 4, Math.ceil(values.length / perRow) * 70 + 2, `Des billets : ${values.map((v) => `${v} F`).join(", ")}.`, body);
}

const coinPics = (values: Coin[]) =>
  pictureRow(
    values.map((v) => ({ name: `piece-${v}` as PictureName, count: 1 })),
    `Des pièces : ${values.map((v) => `${v} F`).join(", ")}.`,
    54,
  );

/** Somme d'argent d'un groupe de pièces. */
export function coinsTotal(values: Coin[], who?: string): ExerciseSpec {
  const total = values.reduce((s, v) => s + v, 0);
  return {
    num: `${who ? `${who} a ces pièces. ` : ""}Combien d’argent y a-t-il ? Écris la somme en francs.`,
    fig: coinPics(values),
    answer: total,
    why: `${values.map((v) => `${v} F`).join(" + ")} = <strong>${total} F</strong>.`,
  };
}

/** Quelle pièce manque pour avoir la somme demandée ? */
export function missingCoin(values: Coin[], total: number): ExerciseSpec {
  const have = values.reduce((s, v) => s + v, 0);
  const miss = total - have;
  const options: Coin[] = [5, 10, 25, 50];
  if (!options.includes(miss as Coin)) throw new Error(`missingCoin : il manque ${miss} F`);
  return {
    qcm: `Il faut <strong>${total} F</strong>. Quelle pièce manque ?`,
    fig: coinPics(values),
    choices: options.map((o) => (o === miss ? `*${o} F` : `${o} F`)),
    why: `${values.map((v) => `${v} F`).join(" + ")} = ${have} F. Pour avoir ${total} F, il manque <strong>${miss} F</strong>.`,
  };
}

/** Peut-on acheter un objet avec ces pièces ? */
export function canBuy(values: Coin[], item: string, price: number): ExerciseSpec {
  const have = values.reduce((s, v) => s + v, 0);
  const yes = have >= price;
  return {
    qcm: `${item[0]!.toUpperCase()}${item.slice(1)} coûte <strong>${price} F</strong>. Peut-on l’acheter avec ces pièces ?`,
    fig: coinPics(values),
    choices: yes ? ["*Oui", "Non"] : ["Oui", "*Non"],
    why: `<strong>${yes ? "Oui" : "Non"}</strong> : ${values.map((v) => `${v} F`).join(" + ")} = ${have} F, c’est ${yes ? (have === price ? "juste le prix" : "plus que le prix") : "moins que le prix"}.`,
  };
}
