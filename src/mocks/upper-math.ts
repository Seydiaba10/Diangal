import "server-only";

// Mathématiques du CE2 au CM2 : grands nombres, quatre opérations, décimaux, fractions, droites et
// angles, triangles, cercle, symétrie, patrons, conversions, durées, partages, périmètres et aires.
// Chaque fonction calcule la réponse et la correction. Les nombres s'écrivent à la française : espace
// insécable entre les classes (12 000), virgule décimale (2,5). tests/unit/primary-exercises.test.ts
// recalcule chaque réponse à partir de l'énoncé et du dessin.

import { svg, text } from "./drawings";
import type { ExerciseSpec } from "./exercise-series";
import { clockDrawing } from "./measure";
import { frenchNumber } from "./primary-exercises";

const NB = " ";
const L = (i: number) => "ABCDEFGH"[i]!;
const star = (choices: string[], good: string) => choices.map((c) => (c === good ? `*${c}` : c));
const round = (n: number) => Math.round(n * 1000) / 1000;

/** 12 000 ; 2,5 ; 1 250,75 (espace insécable, virgule). */
export function fmt(n: number): string {
  const [int, dec] = String(round(Math.abs(n))).split(".");
  const grouped = int!.replace(/\B(?=(\d{3})+(?!\d))/g, NB);
  return `${n < 0 ? "−" : ""}${grouped}${dec ? `,${dec}` : ""}`;
}

/** Dans un texte écrit à la main, « 12 000 » prend une espace insécable (le nombre ne se coupe pas). */
export function nb(s: string): string {
  let out = s;
  for (let i = 0; i < 3; i++) out = out.replace(/(\d) (\d{3})(?!\d)/g, `$1${NB}$2`);
  return out;
}

// ── Grands nombres ──────────────────────────────────────────────────────────

const under100 = (n: number) => frenchNumber(n).replace(/-et-/g, " et ");

function under1000(n: number, beforeMille = false): string {
  const h = Math.floor(n / 100);
  const r = n % 100;
  let s = h === 0 ? "" : h === 1 ? "cent" : `${under100(h)} cent${r === 0 && !beforeMille ? "s" : ""}`;
  if (r) s = s ? `${s} ${under100(r)}` : under100(r);
  return beforeMille ? s.replace(/quatre-vingts$/, "quatre-vingt") : s;
}

/**
 * Nombre en lettres jusqu'aux milliards, orthographe traditionnelle des cahiers (« cinq mille six cent
 * soixante-quinze », « deux millions trente mille ») ; million et milliard sont des noms (pluriel en s).
 */
export function bigWords(n: number): string {
  if (!Number.isInteger(n) || n < 0 || n >= 1e12) throw new Error(`bigWords : ${n}`);
  if (n === 0) return "zéro";
  const md = Math.floor(n / 1e9);
  const mi = Math.floor(n / 1e6) % 1000;
  const th = Math.floor(n / 1000) % 1000;
  const r = n % 1000;
  return [
    md ? `${under1000(md)} milliard${md > 1 ? "s" : ""}` : "",
    mi ? `${under1000(mi)} million${mi > 1 ? "s" : ""}` : "",
    th === 0 ? "" : th === 1 ? "mille" : `${under1000(th, true)} mille`,
    r ? under1000(r) : "",
  ]
    .filter(Boolean)
    .join(" ");
}

/** Écritures acceptées : traditionnelle, rectifiée (traits d'union partout), sans traits d'union. */
export function bigWordsVariants(n: number): string[] {
  const main = bigWords(n);
  return [...new Set([main.replace(/ /g, "-"), main.replace(/ et /g, "-et-"), main.replace(/-/g, " ")])].filter((v) => v !== main);
}

const cursive = (s: string) => `<span class="cursive">${s}</span>`;

export function toDigits(n: number): ExerciseSpec {
  return { num: `Écris en chiffres le nombre ${cursive(bigWords(n))}.`, answer: n, why: `${bigWords(n)} s’écrit <strong>${fmt(n)}</strong>.` };
}

export function toWords(n: number): ExerciseSpec {
  return {
    text: `Écris en lettres le nombre <strong>${fmt(n)}</strong>.`,
    answer: bigWords(n),
    accept: bigWordsVariants(n),
    why: `<strong>${fmt(n)}</strong> s’écrit <strong>${bigWords(n)}</strong>.`,
  };
}

const RANK = ["unités", "dizaines", "centaines", "unités de mille", "dizaines de mille", "centaines de mille", "unités de millions", "dizaines de millions", "centaines de millions"];
const RANK_COUNT = ["unités", "dizaines", "centaines", "milliers", "dizaines de mille", "centaines de mille", "millions"];

/** Chiffre d'un rang : « le chiffre des centaines de 47 352 ». */
export function digitOf(n: number, rank: number): ExerciseSpec {
  const d = Math.floor(n / 10 ** rank) % 10;
  return {
    num: `Dans <strong>${fmt(n)}</strong>, quel est le chiffre des <strong>${RANK[rank]}</strong> ?`,
    answer: d,
    why: `Dans le tableau de numération, le chiffre des ${RANK[rank]} de ${fmt(n)} est <strong>${d}</strong>.`,
  };
}

/** Nombre total d'unités d'un rang : « combien de centaines en tout dans 4 735 ? » → 47. */
export function countOf(n: number, rank: number): ExerciseSpec {
  const c = Math.floor(n / 10 ** rank);
  return {
    num: `Combien y a-t-il de <strong>${RANK_COUNT[rank]}</strong> en tout dans <strong>${fmt(n)}</strong> ?`,
    answer: c,
    why: `On lit le nombre jusqu’au chiffre des ${RANK[rank]} : il y a <strong>${fmt(c)}</strong> ${RANK_COUNT[rank]} en tout.`,
  };
}

const PART_NAME = ["unité", "dizaine", "centaine", "millier", "dizaine de mille", "centaine de mille", "million", "dizaine de millions", "centaine de millions"];
const partName = (k: number, rank: number) => `${k} ${PART_NAME[rank]!.replace(/^(\S+)/, k > 1 ? "$1s" : "$1")}`;

/** Écrire le nombre formé de 4 dizaines de mille + 7 milliers + … */
export function composeParts(n: number): ExerciseSpec {
  const digits = String(n).split("").map(Number).reverse();
  const parts = digits.map((d, r) => [d, r] as const).filter(([d]) => d > 0).reverse();
  return {
    num: `Écris en chiffres le nombre formé de : <strong>${parts.map(([d, r]) => partName(d, r)).join(" + ")}</strong>.`,
    answer: n,
    why: `${parts.map(([d, r]) => fmt(d * 10 ** r)).join(" + ")} = <strong>${fmt(n)}</strong>.`,
  };
}

/** Décomposition additive avec un terme caché : 47 352 = 40 000 + … + 300 + 50 + 2. */
export function expandGap(n: number, hide: number): ExerciseSpec {
  const terms = String(n).split("").map((d, i, all) => Number(d) * 10 ** (all.length - 1 - i)).filter((t) => t > 0);
  const hidden = terms[hide]!;
  return {
    num: `Complète : <strong>${fmt(n)} = ${terms.map((t, i) => (i === hide ? "…" : fmt(t))).join(" + ")}</strong>`,
    answer: hidden,
    why: `${fmt(n)} = ${terms.map((t, i) => (i === hide ? `<strong>${fmt(t)}</strong>` : fmt(t))).join(" + ")}.`,
  };
}

/** Terme manquant : 36 534 = 30 000 + … */
export function missingBig(total: number, a: number): ExerciseSpec {
  return {
    num: `Complète : <strong>${fmt(total)} = ${fmt(a)} + …</strong>`,
    answer: total - a,
    why: `${fmt(total)} − ${fmt(a)} = <strong>${fmt(total - a)}</strong>.`,
  };
}

/** Signe &lt;, &gt; ou = entre deux nombres (entiers ou décimaux). */
export function compareBig(a: number, b: number): ExerciseSpec {
  const sign = a < b ? "&lt;" : a > b ? "&gt;" : "=";
  return {
    qcm: `Quel signe faut-il mettre ? <strong>${fmt(a)} … ${fmt(b)}</strong>`,
    choices: star(["&lt;", "&gt;", "="], sign),
    why: `<strong>${fmt(a)} ${sign} ${fmt(b)}</strong> : ${a === b ? "les deux nombres sont égaux" : `on compare chiffre par chiffre, en partant de la gauche`}.`,
  };
}

/** Ranger des nombres : choisir le bon rangement parmi trois. */
export function orderBig(values: number[], dir: "up" | "down"): ExerciseSpec {
  const sorted = [...values].sort((x, y) => (dir === "up" ? x - y : y - x));
  const sign = dir === "up" ? " &lt; " : " &gt; ";
  const show = (v: number[]) => v.map(fmt).join(sign);
  const swap = (i: number) => sorted.map((v, k) => (k === i ? sorted[i + 1]! : k === i + 1 ? sorted[i]! : v));
  const good = show(sorted);
  const choices = [good, show(swap(0)), show(swap(sorted.length - 2))];
  if (new Set(choices).size !== 3) throw new Error("orderBig : au moins 4 nombres différents");
  return {
    qcm: `Range ces nombres du plus ${dir === "up" ? "petit au plus grand" : "grand au plus petit"} : <strong>${values.map(fmt).join(" ; ")}</strong>. Quel rangement est juste ?`,
    choices: star([...choices].sort(), good),
    why: `<strong>${good}</strong> : on compare d’abord le nombre de chiffres, puis les chiffres de gauche à droite.`,
  };
}

/** Nombre qui vient juste après (avant). */
export function nextBig(n: number, dir: "après" | "avant"): ExerciseSpec {
  const r = dir === "après" ? n + 1 : n - 1;
  return { num: `Quel nombre vient juste <strong>${dir}</strong> <strong>${fmt(n)}</strong> ?`, answer: r, why: `${fmt(n)} ${dir === "après" ? "+" : "−"} 1 = <strong>${fmt(r)}</strong>.` };
}

/** Suite régulière avec un trou. */
export function seqGap(values: number[], hidden: number): ExerciseSpec {
  const step = values[1]! - values[0]!;
  return {
    num: `Complète la suite : <strong>${values.map((v, i) => (i === hidden ? "…" : fmt(v))).join(" ; ")}</strong>`,
    answer: values[hidden]!,
    why: `On ${step > 0 ? "ajoute" : "enlève"} ${fmt(Math.abs(step))} à chaque fois : le nombre manquant est <strong>${fmt(values[hidden]!)}</strong>.`,
  };
}

// ── Opérations ──────────────────────────────────────────────────────────────

export type Sign = "+" | "−" | "×" | ":";
const run = (a: number, s: Sign, b: number) => round(s === "+" ? a + b : s === "−" ? a - b : s === "×" ? a * b : a / b);

/** Pose et effectue (division : seulement si elle tombe juste, au millième près). */
export function op(a: number, s: Sign, b: number): ExerciseSpec {
  const r = run(a, s, b);
  if (s === ":" && Math.abs(r * b - a) > 1e-9) throw new Error(`op : ${a} : ${b} ne tombe pas juste`);
  return {
    num: `Pose et effectue : <strong>${fmt(a)} ${s} ${fmt(b)}</strong>`,
    answer: r,
    why: `${fmt(a)} ${s} ${fmt(b)} = <strong>${fmt(r)}</strong>.${s === ":" ? ` Preuve : ${fmt(r)} × ${fmt(b)} = ${fmt(a)}.` : s === "−" ? ` Preuve : ${fmt(r)} + ${fmt(b)} = ${fmt(a)}.` : ""}`,
  };
}

/** Division avec reste : quotient ou reste. */
export function divide(a: number, b: number, ask: "quotient" | "reste"): ExerciseSpec {
  const q = Math.floor(a / b);
  const r = a - q * b;
  return {
    num: `Effectue la division <strong>${fmt(a)} : ${fmt(b)}</strong>. Quel est ${ask === "quotient" ? "le quotient" : "le reste"} ?`,
    answer: ask === "quotient" ? q : r,
    why: `${fmt(a)} : ${fmt(b)} = ${fmt(q)} reste ${fmt(r)}. Preuve : (${fmt(q)} × ${fmt(b)}) + ${fmt(r)} = ${fmt(a)}. ${ask === "quotient" ? "Le quotient" : "Le reste"} est <strong>${fmt(ask === "quotient" ? q : r)}</strong>.`,
  };
}

/** Petit problème à une opération (nombres en gras dans l'énoncé). */
export function story(storyText: string, ask: string, a: number, s: Sign, b: number, unit: string): ExerciseSpec {
  const r = run(a, s, b);
  return { num: `${nb(storyText)}<br>${ask}`, answer: r, why: `${fmt(a)} ${s} ${fmt(b)} = <strong>${fmt(r)}</strong>${unit ? ` ${unit}` : ""}.` };
}

const KIND_SIGN: Record<string, Sign> = { addition: "+", soustraction: "−", multiplication: "×", division: ":" };

/** Quelle opération faut-il faire ? */
export function opKind(storyText: string, kind: "addition" | "soustraction" | "multiplication" | "division", a: number, b: number, reason: string): ExerciseSpec {
  const r = run(a, KIND_SIGN[kind]!, b);
  return {
    qcm: `${nb(storyText)}<br>Quelle opération faut-il faire ?`,
    choices: ["Addition", "Soustraction", "Multiplication", "Division"].map((o) => (o.toLowerCase() === kind ? `*${o}` : o)),
    why: `${reason} C’est une <strong>${kind}</strong> : ${fmt(a)} ${KIND_SIGN[kind]} ${fmt(b)} = ${fmt(r)}.`,
  };
}

/** Ce qui reste après deux dépenses (question intermédiaire puis question finale). */
export function remains(storyText: string, total: number, a: number, b: number, unit: string): ExerciseSpec {
  const used = a + b;
  if (used > total) throw new Error("remains : dépenses trop grandes");
  return {
    num: `${nb(storyText)}<br>Résous le problème étape par étape et écris la réponse finale.`,
    answer: total - used,
    why: `Question intermédiaire : ${fmt(a)} + ${fmt(b)} = ${fmt(used)}. Question finale : ${fmt(total)} − ${fmt(used)} = <strong>${fmt(total - used)}</strong> ${unit}.`,
  };
}

/**
 * Démarche en deux étapes : (a op1 b) op2 c ; avec fromC, c op2 (a op1 b) (ex. reste = somme − dépense,
 * bénéfice = vente − achat).
 */
export function steps(storyText: string, a: number, s1: Sign, b: number, s2: Sign, c: number, unit: string, fromC = false): ExerciseSpec {
  const r1 = run(a, s1, b);
  const [x, y] = fromC ? [c, r1] : [r1, c];
  const r2 = run(x, s2, y);
  if (r2 < 0) throw new Error(`steps : résultat négatif (${storyText.slice(0, 40)})`);
  return {
    num: `${nb(storyText)}<br>Résous le problème étape par étape et écris la réponse finale.`,
    answer: r2,
    why: `Question intermédiaire : ${fmt(a)} ${s1} ${fmt(b)} = ${fmt(r1)}. Question finale : ${fmt(x)} ${s2} ${fmt(y)} = <strong>${fmt(r2)}</strong> ${unit}.`,
  };
}

/** Double, triple ou moitié. */
export function times(kind: "double" | "triple" | "moitié", n: number): ExerciseSpec {
  const r = kind === "double" ? 2 * n : kind === "triple" ? 3 * n : n / 2;
  if (!Number.isInteger(r)) throw new Error("times : moitié d'un nombre impair");
  return {
    num: `Quel est ${kind === "moitié" ? "la moitié" : `le ${kind}`} de <strong>${fmt(n)}</strong> ?`,
    answer: r,
    why: `${kind === "moitié" ? `${fmt(n)} : 2` : `${fmt(n)} × ${kind === "double" ? 2 : 3}`} = <strong>${fmt(r)}</strong>.`,
  };
}

const RULE: Record<number, string> = {
  2: "il se termine par 0, 2, 4, 6 ou 8",
  3: "la somme de ses chiffres est divisible par 3",
  5: "il se termine par 0 ou 5",
  9: "la somme de ses chiffres est divisible par 9",
  10: "il se termine par 0",
};

/** Quel nombre est divisible par d ? (un seul) */
export function divisibleAmong(values: number[], d: 2 | 3 | 5 | 9 | 10): ExerciseSpec {
  const good = values.filter((v) => v % d === 0);
  if (good.length !== 1) throw new Error(`divisibleAmong : un seul multiple de ${d}`);
  return {
    qcm: `Quel nombre est divisible par <strong>${d}</strong> ?`,
    choices: star(values.map(fmt), fmt(good[0]!)),
    why: `<strong>${fmt(good[0]!)}</strong> : ${RULE[d]}.`,
  };
}

// ── Décimaux et fractions ───────────────────────────────────────────────────

/** Écrire un décimal donné en unités, dixièmes (et centièmes). */
export function decimalOf(units: number, tenths: number, hundredths?: number): ExerciseSpec {
  const value = round(units + tenths / 10 + (hundredths ?? 0) / 100);
  const words = `${under100(units)} unité${units > 1 ? "s" : ""}, ${under100(tenths)} dixième${tenths > 1 ? "s" : ""}${hundredths !== undefined ? ` et ${under100(hundredths)} centième${hundredths > 1 ? "s" : ""}` : ""}`;
  return { num: `Écris ce nombre décimal en chiffres : <strong>${words}</strong>.`, answer: value, why: `La partie entière est ${units}, puis les chiffres après la virgule : <strong>${fmt(value)}</strong>.` };
}

/** Bande partagée en parts égales, dont quelques-unes coloriées. */
export function fractionBar(parts: number, shaded: number): ExerciseSpec {
  const w = Math.min(36, Math.floor(288 / parts));
  let body = "";
  for (let i = 0; i < parts; i++) body += `<rect class="${i < shaded ? "dg-solid" : "dg-box"}" x="${6 + i * w}" y="8" width="${w}" height="40"/>`;
  const good = `${shaded}/${parts}`;
  const choices = [...new Set([good, `${parts - shaded}/${parts}`, `${parts}/${shaded}`, `${shaded}/${parts + 1}`])].slice(0, 3);
  return {
    qcm: "Quelle fraction de la bande est coloriée ?",
    fig: svg(parts * w + 12, 56, `Une bande partagée en ${parts} parts égales, dont certaines sont coloriées.`, body),
    choices: star(choices, good),
    why: `<strong>${good}</strong> : la bande a ${parts} parts égales (le dénominateur) et ${shaded} sont coloriées (le numérateur).`,
  };
}

const FRACTION_WORDS: Record<number, [string, string]> = {
  2: ["demi", "demis"],
  3: ["tiers", "tiers"],
  4: ["quart", "quarts"],
  5: ["cinquième", "cinquièmes"],
  6: ["sixième", "sixièmes"],
  8: ["huitième", "huitièmes"],
  10: ["dixième", "dixièmes"],
  100: ["centième", "centièmes"],
};

/** Écrire en chiffres une fraction lue : « trois quarts » → 3/4. */
export function fractionName(num: number, den: number): ExerciseSpec {
  const words = `${num === 1 ? "un" : under100(num)} ${FRACTION_WORDS[den]![num > 1 ? 1 : 0]}`;
  const good = `${num}/${den}`;
  const choices = [...new Set([good, `${den}/${num}`, `${num}/${den === 4 ? 3 : 4}`])];
  return {
    qcm: `Comment écrit-on « <strong>${words}</strong> » en chiffres ?`,
    choices: star(choices, good),
    why: `<strong>${good}</strong> : le numérateur ${num} dit combien de parts, le dénominateur ${den} en combien de parts on a partagé.`,
  };
}

/** Fraction d'une quantité : 3/4 de 20. */
export function fractionOf(num: number, den: number, total: number, unit: string): ExerciseSpec {
  const r = (total / den) * num;
  if (!Number.isInteger(r)) throw new Error("fractionOf : résultat entier attendu");
  return {
    num: `Combien font <strong>${num}/${den}</strong> de <strong>${fmt(total)}</strong> ${unit} ?`,
    answer: r,
    why: `${fmt(total)} : ${den} = ${fmt(total / den)}, puis ${fmt(total / den)} × ${num} = <strong>${fmt(r)}</strong> ${unit}.`,
  };
}

/** Comparer deux fractions (même dénominateur, ou même numérateur). */
export function compareFractions(a: [number, number], b: [number, number]): ExerciseSpec {
  const va = a[0] / a[1];
  const vb = b[0] / b[1];
  const sign = va < vb ? "&lt;" : va > vb ? "&gt;" : "=";
  return {
    qcm: `Quel signe faut-il mettre ? <strong>${a[0]}/${a[1]} … ${b[0]}/${b[1]}</strong>`,
    choices: star(["&lt;", "&gt;", "="], sign),
    why: `<strong>${a[0]}/${a[1]} ${sign} ${b[0]}/${b[1]}</strong> : ${va === vb ? "les deux fractions représentent la même quantité" : a[1] === b[1] ? "même dénominateur, on compare les numérateurs" : "même numérateur : plus on partage en parts nombreuses, plus chaque part est petite"}.`,
  };
}

// ── Droites, angles, triangles, cercle, symétrie, patrons ───────────────────

type Dir = "horizontale" | "verticale" | "oblique";
const DIR_VECTOR: Record<Dir, [number, number]> = { horizontale: [1, 0], verticale: [0, 1], oblique: [0.8, -0.6] };

/** Quelle droite est horizontale (verticale, oblique) ? */
export function whichDirection(kinds: Dir[], want: Dir): ExerciseSpec {
  if (kinds.filter((k) => k === want).length !== 1) throw new Error("whichDirection : une seule réponse");
  let body = "";
  kinds.forEach((k, i) => {
    const cx = 50 + i * 96;
    const [dx, dy] = DIR_VECTOR[k];
    body += `<g data-letter="${L(i)}"><line class="dg-figure" x1="${cx - dx * 36}" y1="${56 - dy * 36}" x2="${cx + dx * 36}" y2="${56 + dy * 36}"/>${text(cx, 116, L(i), "dg-letter")}</g>`;
  });
  const good = kinds.indexOf(want);
  return {
    qcm: `Quelle droite est <strong>${want}</strong> ?`,
    fig: svg(kinds.length * 96 + 4, 124, `Des droites marquées ${kinds.map((_, i) => L(i)).join(", ")}.`, body),
    choices: kinds.map((_, i) => (i === good ? `*${L(i)}` : L(i))),
    why: `<strong>${L(good)}</strong> : ${want === "horizontale" ? "elle est couchée, comme la ligne d’horizon" : want === "verticale" ? "elle est debout, comme un fil à plomb" : "elle n’est ni horizontale ni verticale, elle penche"}.`,
  };
}

type Pair = "parallèles" | "perpendiculaires" | "sécantes";
const PAIR_LINES: Record<Pair, [number, number, number, number][]> = {
  parallèles: [[10, 30, 80, 10], [10, 70, 80, 50]],
  perpendiculaires: [[10, 40, 80, 40], [45, 6, 45, 76]],
  sécantes: [[10, 20, 80, 70], [10, 60, 80, 30]],
};

/** Quelles droites sont parallèles (perpendiculaires, sécantes sans angle droit) ? */
export function linePairs(kinds: Pair[], want: Pair): ExerciseSpec {
  if (kinds.filter((k) => k === want).length !== 1) throw new Error("linePairs : une seule réponse");
  let body = "";
  kinds.forEach((k, i) => {
    const ox = 6 + i * 100;
    body += `<g data-letter="${L(i)}">${PAIR_LINES[k].map(([x1, y1, x2, y2]) => `<line class="dg-figure" x1="${ox + x1}" y1="${y1}" x2="${ox + x2}" y2="${y2}"/>`).join("")}${text(ox + 45, 102, L(i), "dg-letter")}</g>`;
  });
  const good = kinds.indexOf(want);
  return {
    qcm: `Quelles droites sont <strong>${want}</strong>${want === "sécantes" ? " sans former d’angle droit" : ""} ?`,
    fig: svg(kinds.length * 100 + 6, 110, `Des paires de droites marquées ${kinds.map((_, i) => L(i)).join(", ")}.`, body),
    choices: kinds.map((_, i) => (i === good ? `*${L(i)}` : L(i))),
    why: `<strong>${L(good)}</strong> : ${
      want === "parallèles" ? "elles gardent toujours le même écart et ne se coupent jamais" : want === "perpendiculaires" ? "elles se coupent en formant un angle droit" : "elles se coupent, mais pas à angle droit"
    }.`,
  };
}

/** Angles dessinés (en degrés) : lequel est droit, aigu ou obtus ? */
export function angleKinds(degrees: number[], want: "droit" | "aigu" | "obtus"): ExerciseSpec {
  const kind = (d: number) => (d === 90 ? "droit" : d < 90 ? "aigu" : "obtus");
  if (degrees.filter((d) => kind(d) === want).length !== 1) throw new Error("angleKinds : une seule réponse");
  let body = "";
  degrees.forEach((d, i) => {
    // Sommet décalé à droite : le côté d’un angle obtus part vers la gauche.
    const vx = 66 + i * 124;
    const vy = 84;
    const a = (d * Math.PI) / 180;
    body += `<g data-letter="${L(i)}"><path class="dg-figure" d="M${vx + 56} ${vy}L${vx} ${vy}L${(vx + Math.cos(a) * 56).toFixed(1)} ${(vy - Math.sin(a) * 56).toFixed(1)}"/>${text(vx + 30, 110, L(i), "dg-letter")}</g>`;
  });
  const good = degrees.findIndex((d) => kind(d) === want);
  return {
    qcm: `Quel angle est <strong>${want}</strong> ?`,
    fig: svg(degrees.length * 124 + 10, 118, `Des angles marqués ${degrees.map((_, i) => L(i)).join(", ")}.`, body),
    choices: degrees.map((_, i) => (i === good ? `*${L(i)}` : L(i))),
    why: `<strong>${L(good)}</strong> : ${want === "droit" ? "il a la forme du coin de l’équerre (90°)" : want === "aigu" ? "il est plus petit que l’angle droit" : "il est plus grand que l’angle droit"}.`,
  };
}

/** Triangle dessiné à l'échelle, côtés écrits : équilatéral, isocèle ou quelconque ? */
export function triangleKind(sides: [number, number, number]): ExerciseSpec {
  const [a, b, c] = sides;
  const kind = a === b && b === c ? "équilatéral" : a === b || b === c || a === c ? "isocèle" : "quelconque";
  // Base c posée en bas ; sommet calculé avec les longueurs a (côté gauche) et b (côté droit).
  const s = 24;
  const x = (c * c + a * a - b * b) / (2 * c);
  const h = Math.sqrt(Math.max(a * a - x * x, 0));
  const ox = 50;
  const oy = 20 + h * s;
  const P = [ox, oy];
  const Q = [ox + c * s, oy];
  const R = [ox + x * s, oy - h * s];
  const mid = (u: number[], v: number[]) => [(u[0]! + v[0]!) / 2, (u[1]! + v[1]!) / 2];
  const [mx1, my1] = mid(P, R);
  const [mx2, my2] = mid(Q, R);
  const body =
    `<path class="dg-figure" d="M${P.join(" ")}L${Q.join(" ")}L${R.map((v) => v.toFixed(1)).join(" ")}Z"/>` +
    text(mx1! - 34, my1!, `${a} cm`, "dg-text") +
    text(mx2! + 34, my2!, `${b} cm`, "dg-text") +
    text(ox + (c * s) / 2, oy + 22, `${c} cm`, "dg-text");
  return {
    qcm: "Regarde les longueurs des côtés. Quel est ce triangle ?",
    fig: svg(c * s + 110, oy + 32, `Un triangle dont les côtés mesurent ${a} cm, ${b} cm et ${c} cm.`, body),
    choices: star(["équilatéral", "isocèle", "quelconque"], kind),
    why: `<strong>${kind}</strong> : ${kind === "équilatéral" ? "ses 3 côtés sont égaux" : kind === "isocèle" ? "il a 2 côtés égaux" : "ses 3 côtés sont différents"}.`,
  };
}

/** Rayon et diamètre d'un cercle. */
export function circleCalc(given: "rayon" | "diamètre", value: number, unit = "cm"): ExerciseSpec {
  const other = given === "rayon" ? "diamètre" : "rayon";
  const r = given === "rayon" ? value * 2 : value / 2;
  const body =
    `<circle class="dg-figure" cx="70" cy="62" r="54"/><circle class="dg-node" cx="70" cy="62" r="3"/>` +
    (given === "rayon" ? `<line class="dg-arrow" x1="70" y1="62" x2="124" y2="62"/>` : `<line class="dg-arrow" x1="16" y1="62" x2="124" y2="62"/>`) +
    text(62, 50, "O", "dg-text");
  return {
    num: `Le <strong>${given}</strong> de ce cercle de centre O mesure <strong>${fmt(value)} ${unit}</strong>. Quel est son <strong>${other}</strong> (en ${unit}) ?`,
    fig: svg(140, 124, `Un cercle de centre O avec son ${given} tracé.`, body),
    answer: r,
    why: `${other === "diamètre" ? `Diamètre = rayon × 2 = ${fmt(value)} × 2` : `Rayon = diamètre : 2 = ${fmt(value)} : 2`} = <strong>${fmt(r)} ${unit}</strong>.`,
  };
}

/** Quadrillage avec un axe vertical : quel point est le symétrique du point noir ? */
export function symmetricDot(row: number, col: number, candidates: [number, number][]): ExerciseSpec {
  const C = 30;
  const axisCol = 5;
  let body = "";
  for (let r = 0; r <= 5; r++) body += `<line class="dg-grid" x1="6" y1="${6 + r * C}" x2="${6 + 10 * C}" y2="${6 + r * C}"/>`;
  for (let c = 0; c <= 10; c++) body += `<line class="dg-grid" x1="${6 + c * C}" y1="6" x2="${6 + c * C}" y2="${6 + 5 * C}"/>`;
  body += `<line class="dg-arrow" x1="${6 + axisCol * C}" y1="0" x2="${6 + axisCol * C}" y2="${12 + 5 * C}"/>`;
  const at = (r: number, c: number) => [6 + c * C, 6 + r * C];
  const [px, py] = at(row, col);
  body += `<circle class="dg-node" cx="${px}" cy="${py}" r="6"/>`;
  candidates.forEach(([r, c], i) => {
    const [x, y] = at(r, c);
    body += `<g data-letter="${L(i)}"><circle class="dg-shape" cx="${x}" cy="${y}" r="6"/>${text(x! + 11, y! - 11, L(i), "dg-letter")}</g>`;
  });
  const mirror = 2 * axisCol - col;
  const good = candidates.findIndex(([r, c]) => r === row && c === mirror);
  if (good < 0) throw new Error("symmetricDot : le bon point manque");
  return {
    qcm: "La droite rouge est l’axe de symétrie. Quel point est le symétrique du point noir ?",
    fig: svg(10 * C + 14, 5 * C + 16, "Un quadrillage avec un axe de symétrie rouge, un point noir et des points marqués.", body),
    choices: candidates.map((_, i) => (i === good ? `*${L(i)}` : L(i))),
    why: `<strong>${L(good)}</strong> : il est sur la même ligne, à ${axisCol - col} carreaux de l’axe, de l’autre côté.`,
  };
}

/** Patron de cube en croix (4 faces en colonne, 2 sur les côtés) : quelle face est opposée à … ? */
export function oppositeFace(letters: string[], face: string): ExerciseSpec {
  // Colonne de 4 faces (lettres 0 à 3), puis une face à gauche et une à droite de la 2e face.
  const cells: [number, number][] = [[1, 0], [1, 1], [1, 2], [1, 3], [0, 1], [2, 1]];
  const S = 36;
  let body = "";
  cells.forEach(([c, r], i) => {
    body += `<rect class="dg-solid-top" x="${10 + c * S}" y="${6 + r * S}" width="${S}" height="${S}"/>` + text(10 + c * S + S / 2, 6 + r * S + S / 2 + 6, letters[i]!, "dg-letter");
  });
  const i = letters.indexOf(face);
  const opposite = i < 4 ? letters[(i + 2) % 4]! : letters[i === 4 ? 5 : 4]!;
  return {
    qcm: `Quand on plie ce patron pour fabriquer un cube, quelle face est opposée (parallèle) à la face <strong>${face}</strong> ?`,
    fig: svg(3 * S + 20, 4 * S + 12, "Un patron de cube en croix, chaque face marquée d’une lettre.", body),
    choices: star(letters.filter((l) => l !== face).slice(0, 5), opposite),
    why: `<strong>${opposite}</strong> : dans la colonne de 4 faces, deux faces séparées par une autre sont opposées ; les deux faces des côtés sont opposées entre elles.`,
  };
}

// ── Mesures ─────────────────────────────────────────────────────────────────

const FACTORS: Record<string, number> = {
  km: 1000, hm: 100, dam: 10, m: 1, dm: 0.1, cm: 0.01, mm: 0.001,
  t: 1_000_000, q: 100_000, kg: 1000, hg: 100, dag: 10, g: 1, dg: 0.1, cg: 0.01, mg: 0.001,
  "hℓ": 100, "daℓ": 10, "ℓ": 1, "dℓ": 0.1, "cℓ": 0.01, "mℓ": 0.001,
  h: 3600, min: 60, s: 1,
  "km²": 1_000_000, "hm²": 10_000, "dam²": 100, "m²": 1, "dm²": 0.01, "cm²": 0.0001, "mm²": 0.000001,
  // Volumes rapportés au litre : 1 dm³ = 1 ℓ, 1 cm³ = 1 mℓ.
  "m³": 1000, "dm³": 1, "cm³": 0.001, "mm³": 0.000001,
};

/** Conversion : 2 km 5 hm = … m. */
export function convert(parts: [number, string][], to: string): ExerciseSpec {
  const r = round(parts.reduce((sum, [v, u]) => sum + (v * FACTORS[u]!) / FACTORS[to]!, 0));
  const left = parts.map(([v, u]) => `${fmt(v)} ${u}`).join(" ");
  return {
    num: `Complète : <strong>${left} = … ${to}</strong>`,
    answer: r,
    why: `${parts.map(([v, u]) => `${fmt(v)} ${u} = ${fmt(round((v * FACTORS[u]!) / FACTORS[to]!))} ${to}`).join(" ; ")}. Donc ${left} = <strong>${fmt(r)} ${to}</strong>.`,
  };
}

const hm = (h: number, m: number) => `${h} h ${String(m).padStart(2, "0")} min`;

/** Durée en minutes entre un départ et une arrivée. */
export function duration(start: [number, number], end: [number, number]): ExerciseSpec {
  const d = end[0] * 60 + end[1] - (start[0] * 60 + start[1]);
  return {
    num: `Départ à <strong>${hm(...start)}</strong>, arrivée à <strong>${hm(...end)}</strong>. Combien de minutes a duré le trajet ?`,
    answer: d,
    why: `De ${hm(...start)} à ${hm(...end)}, il s’écoule <strong>${d} minutes</strong>${d >= 60 ? ` (${Math.floor(d / 60)} h ${d % 60} min)` : ""}.`,
  };
}

/** Lire l'heure sur une horloge à aiguilles (minutes de 5 en 5). */
export function clockRead(h: number, m: number): ExerciseSpec {
  const good = hm(h, m);
  const wrong1 = hm((m / 5) % 12 || 12, h * 5 === 60 ? 0 : h * 5);
  const wrong2 = hm(h, (m + 30) % 60);
  return {
    qcm: "Quelle heure est-il sur cette horloge ?",
    fig: clockDrawing(h, m),
    choices: star([...new Set([good, wrong1, wrong2, hm((h % 12) + 1, m)])].slice(0, 3), good),
    why: `<strong>${good}</strong> : la petite aiguille indique ${h} h, la grande aiguille est sur le ${m === 0 ? 12 : m / 5}, soit ${m} minutes.`,
  };
}

/** Partage en parts proportionnelles : a parts pour l'un, b parts pour l'autre. */
export function shareParts(total: number, shares: [string, number][], who: string, unit: string): ExerciseSpec {
  const n = shares.reduce((s, [, k]) => s + k, 0);
  const k = shares.find(([name]) => name === who)![1];
  const part = total / n;
  if (!Number.isInteger(part)) throw new Error("shareParts : part entière attendue");
  return {
    num: `On partage <strong>${fmt(total)}</strong> ${unit} entre ${shares.map(([name, p]) => `${name} (<strong>${p}</strong> part${p > 1 ? "s" : ""})`).join(" et ")}. Combien reçoit ${who} ?`,
    answer: part * k,
    why: `Il y a ${shares.map(([, p]) => p).join(" + ")} = ${n} parts. Une part vaut ${fmt(total)} : ${n} = ${fmt(part)} ${unit}. ${who} reçoit ${fmt(part)} × ${k} = <strong>${fmt(part * k)}</strong> ${unit}.`,
  };
}

type Shape = { kind: "carré"; side: number } | { kind: "rectangle"; long: number; wide: number } | { kind: "triangle"; sides: [number, number, number] };
const describe = (s: Shape, u: string) =>
  s.kind === "carré" ? `d’un carré de <strong>${fmt(s.side)} ${u}</strong> de côté` : s.kind === "rectangle" ? `d’un rectangle de <strong>${fmt(s.long)} ${u}</strong> de longueur et <strong>${fmt(s.wide)} ${u}</strong> de largeur` : `d’un triangle dont les côtés mesurent <strong>${s.sides.map((v) => `${fmt(v)} ${u}`).join("</strong>, <strong>")}</strong>`;

/** Périmètre (ou demi-périmètre) d'un carré, d'un rectangle, d'un triangle. */
export function perimeter(shape: Shape, unit: string, half = false): ExerciseSpec {
  const p = shape.kind === "carré" ? shape.side * 4 : shape.kind === "rectangle" ? (shape.long + shape.wide) * 2 : shape.sides.reduce((s, v) => s + v, 0);
  const r = half ? p / 2 : p;
  const how = shape.kind === "carré" ? `${fmt(shape.side)} × 4 = ${fmt(p)}` : shape.kind === "rectangle" ? `(${fmt(shape.long)} + ${fmt(shape.wide)}) × 2 = ${fmt(p)}` : `${shape.sides.map(fmt).join(" + ")} = ${fmt(p)}`;
  return {
    num: `Calcule le <strong>${half ? "demi-périmètre" : "périmètre"}</strong> ${describe(shape, unit)} (en ${unit}).`,
    answer: round(r),
    why: `Périmètre : ${how} ${unit}${half ? ` ; demi-périmètre : ${fmt(p)} : 2` : ""}. Réponse : <strong>${fmt(r)} ${unit}</strong>.`,
  };
}

/** Retrouver le côté d'un carré, ou la longueur d'un rectangle, à partir du périmètre. */
export function sideFromPerimeter(kind: "carré" | "rectangle", p: number, unit: string, wide?: number, half = false): ExerciseSpec {
  if (kind === "carré") {
    const side = (half ? p * 2 : p) / 4;
    return {
      num: `Un carré a <strong>${fmt(p)} ${unit}</strong> de ${half ? "demi-périmètre" : "périmètre"}. Quelle est la longueur de son côté (en ${unit}) ?`,
      answer: side,
      why: `${half ? `Demi-périmètre : 2 = ${fmt(p)} : 2` : `Périmètre : 4 = ${fmt(p)} : 4`} = <strong>${fmt(side)} ${unit}</strong>.`,
    };
  }
  const halfP = half ? p : p / 2;
  const long = halfP - wide!;
  return {
    num: `Un rectangle a <strong>${fmt(p)} ${unit}</strong> de ${half ? "demi-périmètre" : "périmètre"} et <strong>${fmt(wide!)} ${unit}</strong> de largeur. Quelle est sa longueur (en ${unit}) ?`,
    answer: long,
    why: `${half ? "" : `Demi-périmètre : ${fmt(p)} : 2 = ${fmt(halfP)}. `}Longueur = demi-périmètre − largeur = ${fmt(halfP)} − ${fmt(wide!)} = <strong>${fmt(long)} ${unit}</strong>.`,
  };
}

/** Aire d'un carré ou d'un rectangle. */
export function area(shape: Exclude<Shape, { kind: "triangle" }>, unit: string): ExerciseSpec {
  const r = shape.kind === "carré" ? shape.side * shape.side : shape.long * shape.wide;
  const how = shape.kind === "carré" ? `${fmt(shape.side)} × ${fmt(shape.side)}` : `${fmt(shape.long)} × ${fmt(shape.wide)}`;
  return {
    num: `Calcule l’<strong>aire</strong> ${describe(shape, unit)} (en ${unit}²).`,
    answer: round(r),
    why: `Aire = ${shape.kind === "carré" ? "côté × côté" : "longueur × largeur"} = ${how} = <strong>${fmt(r)} ${unit}²</strong>.`,
  };
}

/** Rectangle quadrillé en carrés de 1 cm² : combien de carrés ? */
export function areaGrid(cols: number, rows: number): ExerciseSpec {
  const S = 28;
  let body = "";
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) body += `<rect class="dg-solid-top" x="${6 + c * S}" y="${6 + r * S}" width="${S}" height="${S}"/>`;
  return {
    num: "Ce rectangle est couvert de carrés de 1 cm². Quelle est son aire (en cm²) ?",
    fig: svg(cols * S + 12, rows * S + 12, "Un rectangle couvert de petits carrés de 1 cm².", body),
    answer: cols * rows,
    why: `${rows} rangées de ${cols} carrés : ${cols} × ${rows} = <strong>${cols * rows} cm²</strong>.`,
  };
}

/** Tableau de données : lire une valeur (ligne × colonne). */
export function readTable(caption: string, cols: string[], rows: [string, number[]][], row: string, col: string, ask: string): ExerciseSpec {
  const r = rows.find(([name]) => name === row)!;
  const value = r[1][cols.indexOf(col)]!;
  const table =
    `<div class="dg-scroll"><table class="dg-cal" data-ask="${row}|${col}"><caption>${caption}</caption><thead><tr><th></th>${cols.map((c) => `<th>${c}</th>`).join("")}</tr></thead>` +
    `<tbody>${rows.map(([name, vals]) => `<tr><th>${name}</th>${vals.map((v) => `<td>${fmt(v)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
  return {
    num: `Lis le tableau. ${ask}`,
    fig: table,
    answer: value,
    why: `Sur la ligne « ${row} », dans la colonne « ${col} », on lit <strong>${fmt(value)}</strong>.`,
  };
}

// ── CM1 et CM2 : fractions, intervalles, cercle, aires, volumes, durées, partages, graphiques ──

const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
const frac = (n: number, d: number) => `${n}/${d}`;

/** Simplifier une fraction jusqu'à la fraction irréductible. */
export function simplify(n: number, d: number): ExerciseSpec {
  const g = gcd(n, d);
  if (g === 1) throw new Error("simplify : fraction déjà irréductible");
  return {
    text: `Simplifie la fraction <strong>${frac(n, d)}</strong> le plus possible. Écris la réponse comme ceci : 2/3.`,
    answer: frac(n / g, d / g),
    accept: [`${n / g} / ${d / g}`],
    why: `On divise le numérateur et le dénominateur par ${g} : ${n} : ${g} = ${n / g} et ${d} : ${g} = ${d / g}. <strong>${frac(n, d)} = ${frac(n / g, d / g)}</strong>.`,
  };
}

/** Addition ou soustraction de deux fractions (même dénominateur ou dénominateurs différents). */
export function fractionOp(a: [number, number], s: "+" | "−", b: [number, number]): ExerciseSpec {
  const d = (a[1] * b[1]) / gcd(a[1], b[1]);
  const na = a[0] * (d / a[1]);
  const nb2 = b[0] * (d / b[1]);
  const n = s === "+" ? na + nb2 : na - nb2;
  if (n <= 0) throw new Error("fractionOp : résultat positif attendu");
  const g = gcd(n, d);
  const raw = frac(n, d);
  const simple = frac(n / g, d / g);
  const same = a[1] === b[1];
  return {
    text: `Calcule et simplifie si possible : <strong>${frac(...a)} ${s} ${frac(...b)}</strong>. Écris la réponse comme ceci : 2/3.`,
    answer: simple,
    accept: [...new Set([raw, `${n / g} / ${d / g}`, `${n} / ${d}`])].filter((v) => v !== simple),
    why: `${same ? "Même dénominateur" : `On réduit au même dénominateur ${d} : ${frac(...a)} = ${frac(na, d)} et ${frac(...b)} = ${frac(nb2, d)}`} ; on ${s === "+" ? "additionne" : "soustrait"} les numérateurs : ${na} ${s} ${nb2} = ${n}. ${raw}${g > 1 ? ` = ${simple}` : ""} : <strong>${simple}</strong>.`,
  };
}

/** Retrouver une grandeur dont on connaît une fraction : les 2/3 valent 800 F. */
export function wholeFrom(num: number, den: number, part: number, unit: string): ExerciseSpec {
  const whole = (part / num) * den;
  if (!Number.isInteger(whole)) throw new Error("wholeFrom : résultat entier attendu");
  return {
    num: `Les <strong>${frac(num, den)}</strong> d’une quantité valent <strong>${fmt(part)}</strong> ${unit}. Quelle est la quantité entière ?`,
    answer: whole,
    why: `${frac(1, den)} vaut ${fmt(part)} : ${num} = ${fmt(part / num)} ${unit} ; le tout vaut ${fmt(part / num)} × ${den} = <strong>${fmt(whole)}</strong> ${unit}.`,
  };
}

/** Fraction décimale en nombre décimal : 37/100 = 0,37. */
export function fractionToDecimal(n: number, d: 10 | 100 | 1000): ExerciseSpec {
  const v = n / d;
  return { num: `Écris la fraction décimale <strong>${frac(n, d)}</strong> sous forme de nombre décimal.`, answer: v, why: `${frac(n, d)} = <strong>${fmt(v)}</strong>.` };
}

/** Intervalles : objets plantés le long d'une ligne (ouverte avec ou sans les bouts, ou fermée). */
export function intervals(length: number, step: number, kind: "deux bouts" | "sans les bouts" | "fermée", thing: string): ExerciseSpec {
  const n = length / step;
  if (!Number.isInteger(n)) throw new Error("intervals : pas entier");
  const count = kind === "deux bouts" ? n + 1 : kind === "sans les bouts" ? n - 1 : n;
  const where =
    kind === "deux bouts"
      ? `le long d’une allée de <strong>${fmt(length)}</strong> m, un à chaque bout`
      : kind === "sans les bouts"
        ? `le long d’une allée de <strong>${fmt(length)}</strong> m, sans en mettre aux deux bouts`
        : `autour d’un terrain de <strong>${fmt(length)}</strong> m de tour`;
  return {
    num: `On plante des ${thing} tous les <strong>${fmt(step)}</strong> m ${where}. Combien de ${thing} faut-il ?`,
    answer: count,
    why: `${fmt(length)} : ${fmt(step)} = ${n} intervalles. ${kind === "deux bouts" ? `Ligne ouverte avec un objet à chaque bout : ${n} + 1` : kind === "sans les bouts" ? `Ligne ouverte sans les bouts : ${n} − 1` : "Ligne fermée : autant d’objets que d’intervalles"} = <strong>${count}</strong>.`,
  };
}

/** Périmètre d'un cercle (π = 3,14). */
export function circlePerimeter(given: "rayon" | "diamètre", value: number, unit: string): ExerciseSpec {
  const d = given === "rayon" ? value * 2 : value;
  const p = round(d * 3.14);
  return {
    num: `Le <strong>${given}</strong> d’un cercle mesure <strong>${fmt(value)} ${unit}</strong>. Calcule son périmètre (π = 3,14), en ${unit}.`,
    answer: p,
    why: `Périmètre = diamètre × 3,14 = ${fmt(d)} × 3,14 = <strong>${fmt(p)} ${unit}</strong>.`,
  };
}

type Figure2 = { kind: "triangle"; base: number; height: number } | { kind: "parallélogramme"; base: number; height: number } | { kind: "disque"; radius: number };

/** Aire d'un triangle, d'un parallélogramme ou d'un disque (π = 3,14). */
export function areaOf(f: Figure2, unit: string): ExerciseSpec {
  const r = f.kind === "triangle" ? (f.base * f.height) / 2 : f.kind === "parallélogramme" ? f.base * f.height : round(f.radius * f.radius * 3.14);
  const what =
    f.kind === "disque"
      ? `d’un disque de <strong>${fmt(f.radius)} ${unit}</strong> de rayon (π = 3,14)`
      : `d’un ${f.kind} de <strong>${fmt(f.base)} ${unit}</strong> de base et <strong>${fmt(f.height)} ${unit}</strong> de hauteur`;
  const how = f.kind === "triangle" ? `(${fmt(f.base)} × ${fmt(f.height)}) : 2` : f.kind === "parallélogramme" ? `${fmt(f.base)} × ${fmt(f.height)}` : `${fmt(f.radius)} × ${fmt(f.radius)} × 3,14`;
  return { num: `Calcule l’<strong>aire</strong> ${what} (en ${unit}²).`, answer: round(r), why: `Aire = ${how} = <strong>${fmt(r)} ${unit}²</strong>.` };
}

/** Retrouver une dimension à partir de l'aire (rectangle, triangle, parallélogramme). */
export function dimensionFromArea(kind: "rectangle" | "triangle" | "parallélogramme", a: number, known: number, unit: string): ExerciseSpec {
  const r = kind === "triangle" ? (a * 2) / known : a / known;
  const [knownName, askName] = kind === "rectangle" ? ["largeur", "longueur"] : ["base", "hauteur"];
  return {
    num: `Un ${kind} a une aire de <strong>${fmt(a)} ${unit}²</strong> et une ${knownName} de <strong>${fmt(known)} ${unit}</strong>. Calcule sa ${askName} (en ${unit}).`,
    answer: round(r),
    why: `${kind === "triangle" ? `Hauteur = (aire × 2) : base = (${fmt(a)} × 2) : ${fmt(known)}` : `${askName === "longueur" ? "Longueur" : "Hauteur"} = aire : ${knownName} = ${fmt(a)} : ${fmt(known)}`} = <strong>${fmt(r)} ${unit}</strong>.`,
  };
}

/** Volume d'un cube ou d'un pavé droit. */
export function volume(shape: { kind: "cube"; edge: number } | { kind: "pavé droit"; long: number; wide: number; high: number }, unit: string): ExerciseSpec {
  const v = shape.kind === "cube" ? shape.edge ** 3 : shape.long * shape.wide * shape.high;
  const what =
    shape.kind === "cube"
      ? `d’un cube de <strong>${fmt(shape.edge)} ${unit}</strong> d’arête`
      : `d’un pavé droit de <strong>${fmt(shape.long)} ${unit}</strong> de long, <strong>${fmt(shape.wide)} ${unit}</strong> de large et <strong>${fmt(shape.high)} ${unit}</strong> de haut`;
  const how = shape.kind === "cube" ? `${fmt(shape.edge)} × ${fmt(shape.edge)} × ${fmt(shape.edge)}` : `${fmt(shape.long)} × ${fmt(shape.wide)} × ${fmt(shape.high)}`;
  return { num: `Calcule le <strong>volume</strong> ${what} (en ${unit}³).`, answer: round(v), why: `Volume = ${how} = <strong>${fmt(v)} ${unit}³</strong>.` };
}

const hmin = (t: number) => `${Math.floor(t / 60)} h ${String(t % 60).padStart(2, "0")} min`;

/** Addition ou soustraction de durées (h et min). */
export function durationOp(a: [number, number], s: "+" | "−", b: [number, number]): ExerciseSpec {
  const ta = a[0] * 60 + a[1];
  const tb = b[0] * 60 + b[1];
  const t = s === "+" ? ta + tb : ta - tb;
  const h = Math.floor(t / 60);
  const m = t % 60;
  return {
    text: `Calcule : <strong>${hmin(ta)} ${s} ${hmin(tb)}</strong>. Écris la réponse comme ceci : 2 h 05 min.`,
    answer: hmin(t),
    accept: [`${h} h ${m} min`, `${h}h${String(m).padStart(2, "0")}`, `${h} h ${String(m).padStart(2, "0")}`, `${h}h ${m}min`, `${h} heures ${m} minutes`],
    why: `${s === "+" ? "On additionne" : "On soustrait"} les heures et les minutes (60 min = 1 h) : <strong>${hmin(t)}</strong>.`,
  };
}

/** Parts inégales : l'un reçoit d de plus que l'autre. */
export function unequalShare(total: number, diff: number, more: string, less: string, ask: string, unit: string): ExerciseSpec {
  const small = (total - diff) / 2;
  if (!Number.isInteger(small)) throw new Error("unequalShare : parts entières attendues");
  const r = ask === more ? small + diff : small;
  return {
    num: `On partage <strong>${fmt(total)}</strong> ${unit} entre ${more} et ${less}. ${more} reçoit <strong>${fmt(diff)}</strong> ${unit} de plus que ${less}. Combien reçoit ${ask} ?`,
    answer: r,
    why: `On enlève d’abord la différence : ${fmt(total)} − ${fmt(diff)} = ${fmt(total - diff)} ; on partage en deux : ${fmt(small)} ${unit} pour ${less}${ask === more ? `, et ${fmt(small)} + ${fmt(diff)} = ${fmt(r)} ${unit} pour ${more}` : ""}. Réponse : <strong>${fmt(r)}</strong> ${unit}.`,
  };
}

/** Troisième angle d'un triangle (somme 180°). */
export function thirdAngle(a: number, b: number): ExerciseSpec {
  const c = 180 - a - b;
  return {
    num: `Dans un triangle, deux angles mesurent <strong>${a}°</strong> et <strong>${b}°</strong>. Combien mesure le troisième angle (en degrés) ?`,
    answer: c,
    why: `La somme des angles d’un triangle est 180° : 180 − ${a} − ${b} = <strong>${c}°</strong>.`,
  };
}

/** Translation sur quadrillage : de combien de carreaux la figure a-t-elle glissé ? */
export function translation(dx: number, dy: number, ask: "droite" | "bas"): ExerciseSpec {
  const C = 24;
  let body = "";
  for (let r = 0; r <= 6; r++) body += `<line class="dg-grid" x1="6" y1="${6 + r * C}" x2="${6 + 12 * C}" y2="${6 + r * C}"/>`;
  for (let c = 0; c <= 12; c++) body += `<line class="dg-grid" x1="${6 + c * C}" y1="6" x2="${6 + c * C}" y2="${6 + 6 * C}"/>`;
  const shape = (c: number, r: number, cls: string) => `<path class="${cls}" d="M${6 + c * C} ${6 + (r + 2) * C}L${6 + (c + 2) * C} ${6 + (r + 2) * C}L${6 + c * C} ${6 + r * C}Z"/>`;
  // Figure de départ A (verte) et son image B (jaune), chacune marquée de sa lettre.
  body +=
    shape(1, 1, "dg-shape-fill") +
    text(6 + 1.5 * C, 6 + 2.5 * C + 4, "A", "dg-letter") +
    shape(1 + dx, 1 + dy, "dg-solid") +
    text(6 + (1.5 + dx) * C, 6 + (2.5 + dy) * C + 4, "B", "dg-letter");
  return {
    num: `La figure A a glissé (translation) jusqu’à la figure B. De combien de carreaux a-t-elle glissé vers ${ask === "droite" ? "la droite" : "le bas"} ?`,
    fig: svg(12 * C + 12, 6 * C + 12, "Un quadrillage avec une figure et la même figure déplacée.", body),
    answer: ask === "droite" ? dx : dy,
    why: `Chaque sommet s’est déplacé de ${dx} carreaux vers la droite${dy ? ` et de ${dy} vers le bas` : ""} : <strong>${ask === "droite" ? dx : dy}</strong>.`,
  };
}

/** Graphique en barres gradué : lire une valeur. */
export function barChart(title: string, labels: string[], values: number[], step: number, ask: string, question: string): ExerciseSpec {
  const max = Math.ceil(Math.max(...values) / step) * step;
  const H = 150;
  const k = H / max;
  // Barres assez espacées pour que les étiquettes (« mercredi ») ne se chevauchent pas.
  const W = 66;
  let body = `<line class="dg-scale" x1="40" y1="10" x2="40" y2="${10 + H}"/><line class="dg-scale" x1="40" y1="${10 + H}" x2="${48 + labels.length * W}" y2="${10 + H}"/>`;
  for (let v = 0; v <= max; v += step) body += `<line class="dg-grid" x1="40" y1="${10 + H - v * k}" x2="${48 + labels.length * W}" y2="${10 + H - v * k}"/>` + text(20, 10 + H - v * k, v, "dg-axis");
  labels.forEach((l, i) => {
    body += `<rect class="dg-solid" data-bar="${l}" x="${50 + i * W}" y="${10 + H - values[i]! * k}" width="${W - 14}" height="${values[i]! * k}"/>` + text(50 + i * W + (W - 14) / 2, H + 30, l, "dg-axis");
  });
  return {
    num: `${title}<br>${question}`,
    fig: svg(56 + labels.length * W, H + 40, `Graphique en barres : ${title}.`, body),
    answer: values[labels.indexOf(ask)]!,
    why: `Le haut de la barre « ${ask} » arrive à la graduation <strong>${fmt(values[labels.indexOf(ask)]!)}</strong>.`,
  };
}

// ── CM2 : fractions (produit, quotient), pourcentages, échelles, proportionnalité, intérêts, moyenne ──

/** Produit de deux fractions, ou quotient d'une fraction par un entier. */
export function fractionMul(a: [number, number], s: "×" | ":", b: [number, number] | number): ExerciseSpec {
  const [n, d] = typeof b === "number" ? (s === "×" ? [a[0] * b, a[1]] : [a[0], a[1] * b]) : [a[0] * b[0], a[1] * b[1]];
  const g = gcd(n, d);
  const simple = frac(n / g, d / g);
  const right = typeof b === "number" ? String(b) : frac(...b);
  return {
    text: `Calcule et simplifie si possible : <strong>${frac(...a)} ${s} ${right}</strong>. Écris la réponse comme ceci : 2/3.`,
    answer: simple,
    accept: [...new Set([frac(n, d), `${n / g} / ${d / g}`])].filter((v) => v !== simple),
    why: `${typeof b === "number" ? (s === "×" ? `On multiplie le numérateur par ${b}` : `On multiplie le dénominateur par ${b}`) : "On multiplie les numérateurs entre eux et les dénominateurs entre eux"} : ${frac(n, d)}${g > 1 ? ` = ${simple}` : ""}. Réponse : <strong>${simple}</strong>.`,
  };
}

/** Plus petit dénominateur commun de deux fractions. */
export function commonDenominator(a: [number, number], b: [number, number]): ExerciseSpec {
  const d = (a[1] * b[1]) / gcd(a[1], b[1]);
  return {
    num: `On veut réduire <strong>${frac(...a)}</strong> et <strong>${frac(...b)}</strong> au même dénominateur. Quel est le plus petit dénominateur commun ?`,
    answer: d,
    why: `${d} est le plus petit nombre à la fois multiple de ${a[1]} et de ${b[1]} : ${frac(...a)} = ${frac(a[0] * (d / a[1]), d)} et ${frac(...b)} = ${frac(b[0] * (d / b[1]), d)}. Réponse : <strong>${d}</strong>.`,
  };
}

/** p % d'une quantité. */
export function percentOf(p: number, total: number, unit: string): ExerciseSpec {
  const r = round((total * p) / 100);
  return { num: `Combien font <strong>${fmt(p)} %</strong> de <strong>${fmt(total)}</strong> ${unit} ?`, answer: r, why: `${fmt(total)} × ${fmt(p)} : 100 = <strong>${fmt(r)}</strong> ${unit}.` };
}

/** Quel pourcentage représente une partie ? */
export function percentRate(part: number, total: number, what: string): ExerciseSpec {
  const r = round((part * 100) / total);
  return {
    num: `Sur <strong>${fmt(total)}</strong> ${what}, <strong>${fmt(part)}</strong> sont concernés. Quel pourcentage cela représente-t-il ?`,
    answer: r,
    why: `${fmt(part)} × 100 : ${fmt(total)} = <strong>${fmt(r)} %</strong>.`,
  };
}

/** Distance réelle à partir d'une carte (ou d'un plan) à l'échelle 1/n. */
export function scaleDistance(mapCm: number, n: number, to: "m" | "km"): ExerciseSpec {
  const cm = mapCm * n;
  const r = round(to === "km" ? cm / 100000 : cm / 100);
  return {
    num: `Sur une carte à l’échelle <strong>1/${fmt(n)}</strong>, deux lieux sont à <strong>${fmt(mapCm)} cm</strong> l’un de l’autre. Quelle est la distance réelle (en ${to}) ?`,
    answer: r,
    why: `${fmt(mapCm)} cm × ${fmt(n)} = ${fmt(cm)} cm = <strong>${fmt(r)} ${to}</strong>.`,
  };
}

/** Échelle d'un plan : 1 cm sur le plan représente combien de cm en vrai ? */
export function scaleOf(planCm: number, realM: number): ExerciseSpec {
  const n = (realM * 100) / planCm;
  return {
    num: `Sur un plan, <strong>${fmt(planCm)} cm</strong> représentent <strong>${fmt(realM)} m</strong> en réalité. L’échelle est 1/… : quel est le nombre manquant ?`,
    answer: n,
    why: `${fmt(realM)} m = ${fmt(realM * 100)} cm ; ${fmt(realM * 100)} : ${fmt(planCm)} = ${fmt(n)}. L’échelle est <strong>1/${fmt(n)}</strong>.`,
  };
}

/** Tableau de proportionnalité avec une case vide. */
export function propTable(top: string, bottom: string, xs: number[], ratio: number, hidden: number): ExerciseSpec {
  const ys = xs.map((x) => round(x * ratio));
  const cells = (vals: number[], hide: boolean) => vals.map((v, i) => `<td>${hide && i === hidden ? "?" : fmt(v)}</td>`).join("");
  return {
    num: "Ce tableau est un tableau de proportionnalité. Quel nombre remplace le point d’interrogation ?",
    fig: `<div class="dg-scroll"><table class="dg-cal dg-prop"><tbody><tr><th>${top}</th>${cells(xs, false)}</tr><tr><th>${bottom}</th>${cells(ys, true)}</tr></tbody></table></div>`,
    answer: ys[hidden]!,
    why: `On passe de la 1re ligne à la 2e en multipliant par ${fmt(ratio)} : ${fmt(xs[hidden]!)} × ${fmt(ratio)} = <strong>${fmt(ys[hidden]!)}</strong>.`,
  };
}

/** Intérêt simple : I = C × t × n : 100 ; on cherche I, C, t ou n. */
export function interest(c: number, t: number, n: number, ask: "intérêt" | "capital" | "taux" | "durée"): ExerciseSpec {
  const i = round((c * t * n) / 100);
  const years = `${fmt(n)} an${n > 1 ? "s" : ""}`;
  const prompts = {
    intérêt: `Un capital de <strong>${fmt(c)} F</strong> est placé à <strong>${fmt(t)} %</strong> par an pendant <strong>${years}</strong>. Quel est l’intérêt (en F) ?`,
    capital: `Placé à <strong>${fmt(t)} %</strong> par an pendant <strong>${years}</strong>, un capital rapporte <strong>${fmt(i)} F</strong> d’intérêt. Quel est ce capital (en F) ?`,
    taux: `Un capital de <strong>${fmt(c)} F</strong> rapporte <strong>${fmt(i)} F</strong> d’intérêt en <strong>${years}</strong>. Quel est le taux annuel (en %) ?`,
    durée: `Un capital de <strong>${fmt(c)} F</strong> placé à <strong>${fmt(t)} %</strong> par an rapporte <strong>${fmt(i)} F</strong>. Pendant combien d’années a-t-il été placé ?`,
  };
  const answer = ask === "intérêt" ? i : ask === "capital" ? c : ask === "taux" ? t : n;
  return {
    num: prompts[ask],
    answer,
    why: `Intérêt = capital × taux × durée : 100 = ${fmt(c)} × ${fmt(t)} × ${fmt(n)} : 100 = ${fmt(i)} F. Réponse : <strong>${fmt(answer)}</strong>.`,
  };
}

/** Moyenne de plusieurs valeurs. */
export function average(values: number[], what: string, unit = ""): ExerciseSpec {
  const sum = values.reduce((s, v) => s + v, 0);
  const r = round(sum / values.length);
  return {
    num: `${what} : <strong>${values.map(fmt).join(" ; ")}</strong>. Quelle est la moyenne${unit ? ` (en ${unit})` : ""} ?`,
    answer: r,
    why: `Somme : ${values.map(fmt).join(" + ")} = ${fmt(sum)} ; moyenne : ${fmt(sum)} : ${values.length} = <strong>${fmt(r)}</strong>${unit ? ` ${unit}` : ""}.`,
  };
}

/** Aire d'un losange ou d'un trapèze. */
export function areaQuad(f: { kind: "losange"; big: number; small: number } | { kind: "trapèze"; big: number; small: number; height: number }, unit: string): ExerciseSpec {
  const r = round(f.kind === "losange" ? (f.big * f.small) / 2 : ((f.big + f.small) * f.height) / 2);
  return {
    num:
      f.kind === "losange"
        ? `Calcule l’aire d’un losange dont les diagonales mesurent <strong>${fmt(f.big)} ${unit}</strong> et <strong>${fmt(f.small)} ${unit}</strong> (en ${unit}²).`
        : `Calcule l’aire d’un trapèze de grande base <strong>${fmt(f.big)} ${unit}</strong>, de petite base <strong>${fmt(f.small)} ${unit}</strong> et de hauteur <strong>${fmt(f.height)} ${unit}</strong> (en ${unit}²).`,
    answer: r,
    why: `${f.kind === "losange" ? `Aire = (grande diagonale × petite diagonale) : 2 = (${fmt(f.big)} × ${fmt(f.small)}) : 2` : `Aire = (grande base + petite base) × hauteur : 2 = (${fmt(f.big)} + ${fmt(f.small)}) × ${fmt(f.height)} : 2`} = <strong>${fmt(r)} ${unit}²</strong>.`,
  };
}

/** Volume d'un cylindre (π = 3,14). */
export function cylinderVolume(radius: number, high: number, unit: string): ExerciseSpec {
  const r = round(radius * radius * 3.14 * high);
  return {
    num: `Calcule le volume d’un cylindre de <strong>${fmt(radius)} ${unit}</strong> de rayon et <strong>${fmt(high)} ${unit}</strong> de hauteur (π = 3,14), en ${unit}³.`,
    answer: r,
    why: `Volume = aire de la base × hauteur = ${fmt(radius)} × ${fmt(radius)} × 3,14 × ${fmt(high)} = <strong>${fmt(r)} ${unit}³</strong>.`,
  };
}

/** Multiplication ou division d'une durée par un nombre. */
export function durationTimes(a: [number, number], s: "×" | ":", k: number): ExerciseSpec {
  const ta = a[0] * 60 + a[1];
  const t = s === "×" ? ta * k : ta / k;
  if (!Number.isInteger(t)) throw new Error("durationTimes : minutes entières attendues");
  const h = Math.floor(t / 60);
  const m = t % 60;
  return {
    text: `Calcule : <strong>${hmin(ta)} ${s} ${k}</strong>. Écris la réponse comme ceci : 2 h 05 min.`,
    answer: hmin(t),
    accept: [`${h} h ${m} min`, `${h}h${String(m).padStart(2, "0")}`, `${h} h ${String(m).padStart(2, "0")}`, `${h} heures ${m} minutes`],
    why: `${hmin(ta)} = ${ta} min ; ${ta} ${s} ${k} = ${t} min = <strong>${hmin(t)}</strong>.`,
  };
}

const POLYGON_SIDES: Record<string, number> = { "triangle équilatéral": 3, carré: 4, "pentagone régulier": 5, "hexagone régulier": 6, "octogone régulier": 8 };

/** Périmètre d'un polygone régulier. */
export function polygonPerimeter(name: keyof typeof POLYGON_SIDES, side: number, unit: string): ExerciseSpec {
  const n = POLYGON_SIDES[name]!;
  return {
    num: `Calcule le périmètre d’un <strong>${name}</strong> de <strong>${fmt(side)} ${unit}</strong> de côté (en ${unit}).`,
    answer: round(n * side),
    why: `Un ${name} a ${n} côtés égaux : ${fmt(side)} × ${n} = <strong>${fmt(round(n * side))} ${unit}</strong>.`,
  };
}
