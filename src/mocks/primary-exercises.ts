import "server-only";

// Briques des exercices de mathématiques du primaire : chaque fonction écrit une question du même genre
// que celles des cahiers d'exercices de l'école et CALCULE sa réponse et sa correction (aucun corrigé
// écrit à la main ne peut être faux). Les nombres sont choisis dans les fichiers de chaque classe.

import { band, cubeColumns, groups, pairDots, placeValue, posedGrid, rowOf, tensUnits, tree, type RowShape } from "./drawings";
import type { ExerciseSpec } from "./exercise-series";

const SMALL = ["zéro", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf", "dix", "onze", "douze", "treize", "quatorze", "quinze", "seize"];
const TENS: Record<number, string> = { 2: "vingt", 3: "trente", 4: "quarante", 5: "cinquante", 6: "soixante" };

/** Nombre de 0 à 100 en lettres, orthographe des cahiers (traits d'union partout : « vingt-et-un »). */
export function frenchNumber(n: number): string {
  if (!Number.isInteger(n) || n < 0 || n > 100) throw new Error(`frenchNumber : ${n} hors de 0 à 100`);
  if (n <= 16) return SMALL[n]!;
  if (n < 20) return `dix-${SMALL[n - 10]}`;
  if (n === 100) return "cent";
  const t = Math.floor(n / 10);
  const u = n % 10;
  if (t === 7) return u === 1 ? "soixante-et-onze" : `soixante-${frenchNumber(10 + u)}`;
  if (t === 8) return u === 0 ? "quatre-vingts" : `quatre-vingt-${SMALL[u]}`;
  if (t === 9) return `quatre-vingt-${frenchNumber(10 + u)}`;
  if (u === 0) return TENS[t]!;
  return u === 1 ? `${TENS[t]}-et-un` : `${TENS[t]}-${SMALL[u]}`;
}

/** Écritures acceptées d'un nombre en lettres : rectifiée, traditionnelle (« vingt et un ») et sans traits d'union. */
export function frenchNumberVariants(n: number): string[] {
  const main = frenchNumber(n);
  return [...new Set([main.replace(/-et-/g, " et "), main.replace(/-/g, " ")])].filter((v) => v !== main);
}

const tensOf = (n: number) => Math.floor(n / 10);
const unitsOf = (n: number) => n % 10;
const dizaines = (n: number) => `${n} dizaine${n > 1 ? "s" : ""}`;
const unites = (n: number) => `${n} unité${n > 1 ? "s" : ""}`;
const cursive = (s: string) => `<span class="cursive">${s}</span>`;

/** Écrire en chiffres le nombre d'un tableau dizaines-unités. */
export function readTensUnits(tens: number, units: number): ExerciseSpec {
  const n = tens * 10 + units;
  return {
    num: "Écris en chiffres le nombre représenté dans le tableau.",
    fig: tensUnits(tens, units),
    answer: n,
    why: `${dizaines(tens)} et ${unites(units)} : <strong>${n}</strong>.`,
  };
}

/** Compter des cubes empilés en colonnes de 10 et écrire leur nombre en chiffres. */
export function countCubes(n: number): ExerciseSpec {
  const tens = tensOf(n);
  const units = unitsOf(n);
  return {
    num: "Écris en chiffres le nombre de cubes.",
    fig: cubeColumns(n),
    answer: n,
    why:
      tens > 0
        ? `${tens > 1 ? `${tens} colonnes` : "Une colonne"} de 10 cubes${units ? ` et ${units} cube${units > 1 ? "s" : ""}` : ""} : <strong>${n}</strong>.`
        : `On compte les cubes un par un : <strong>${n}</strong>.`,
  };
}

/** Écrire en chiffres un nombre donné en lettres. */
export function wordsToDigits(n: number): ExerciseSpec {
  return {
    num: `Écris en chiffres le nombre ${cursive(frenchNumber(n))}.`,
    answer: n,
    why: `${frenchNumber(n)}, c’est ${dizaines(tensOf(n))} et ${unites(unitsOf(n))} : <strong>${n}</strong>.`,
  };
}

/** Écrire en lettres un nombre donné en chiffres. */
export function digitsToWords(n: number): ExerciseSpec {
  return {
    text: `Écris en lettres le nombre <strong>${n}</strong>.`,
    answer: frenchNumber(n),
    accept: frenchNumberVariants(n),
    why: `<strong>${n}</strong> s’écrit <strong>${frenchNumber(n)}</strong>.`,
  };
}

/** Choisir le signe &lt;, &gt; ou = entre deux nombres (ou deux mesures, avec leur unité : « 2 ℓ … 4 ℓ »). */
export function compare(a: number, b: number, unit?: string): ExerciseSpec {
  const sign = a < b ? "&lt;" : a > b ? "&gt;" : "=";
  const u = unit ? ` ${unit}` : "";
  let why: string;
  if (a === b) why = `${unit ? "Les deux mesures sont égales" : "Les deux nombres sont égaux"} : <strong>${a}${u} = ${b}${u}</strong>.`;
  else if (unit) why = `${a} est plus ${a < b ? "petit" : "grand"} que ${b}, donc <strong>${a}${u} ${sign} ${b}${u}</strong>.`;
  else {
    const small = Math.min(a, b);
    const big = Math.max(a, b);
    const reason =
      tensOf(a) !== tensOf(b)
        ? `${small} a ${dizaines(tensOf(small))}, ${big} en a ${tensOf(big)}`
        : `même nombre de dizaines ; ${small} a ${unites(unitsOf(small))}, ${big} en a ${unitsOf(big)}`;
    why = `${reason} : ${a} est plus ${a < b ? "petit" : "grand"} que ${b}, donc <strong>${a} ${sign} ${b}</strong>.`;
  }
  return {
    qcm: `Quel signe faut-il mettre ? <strong>${a}${u} … ${b}${u}</strong>`,
    choices: ["&lt;", "&gt;", "="].map((s) => (s === sign ? `*${s}` : s)),
    why,
  };
}

/** Ranger des nombres du plus petit au plus grand (up) ou du plus grand au plus petit (down). */
export function order(values: number[], direction: "up" | "down"): ExerciseSpec {
  const sorted = [...values].sort((x, y) => (direction === "up" ? x - y : y - x));
  const sign = direction === "up" ? "<" : ">";
  const accept = [sorted.join(` ${sign} `), sorted.join(sign), sorted.join(" - "), sorted.join("-")];
  return {
    text:
      `Range ces nombres du plus ${direction === "up" ? "petit au plus grand" : "grand au plus petit"} : ` +
      `<strong>${values.join(" ; ")}</strong>. Sépare-les par des espaces.`,
    answer: sorted.join(" "),
    accept,
    why: `<strong>${sorted.join(direction === "up" ? " &lt; " : " &gt; ")}</strong>.`,
  };
}

/** Bande numérique régulière (pas constant) dont une case est vide. */
export function bandGap(values: number[], hidden: number): ExerciseSpec {
  const step = values[1]! - values[0]!;
  if (values.some((v, i) => i > 0 && v - values[i - 1]! !== step)) throw new Error(`bandGap : pas irrégulier (${values.join(", ")})`);
  const answer = values[hidden]!;
  const size = Math.abs(step);
  return {
    num: "Complète la bande numérique : quel nombre va dans la case vide ?",
    fig: band(values.map((v, i) => (i === hidden ? null : v))),
    answer,
    why:
      `On ${step > 0 ? "avance" : "recule"} de ${size} en ${size} : ` +
      `${values.map((v, i) => (i === hidden ? `<strong>${v}</strong>` : v)).join(", ")}.`,
  };
}

/** Compte par groupes de 10 jusqu'à n : « 10, 20, puis 21, 22 ». */
function countByTens(n: number): string {
  const tens = Array.from({ length: Math.floor((n - 1) / 10) }, (_, i) => (i + 1) * 10);
  const rest = Array.from({ length: n - (tens.at(-1) ?? 0) }, (_, i) => (tens.at(-1) ?? 0) + i + 1);
  return tens.length ? `${tens.join(", ")}, puis ${rest.join(", ")}` : rest.join(", ");
}

/**
 * Trouver la forme de rang donné dans une rangée, en comptant à partir de la gauche ou de la droite.
 * Trois lettres : la bonne, la même place comptée depuis l'autre bout (erreur fréquente) et une voisine.
 */
export function rank(count: number, target: number, from: "gauche" | "droite", shape: RowShape): ExerciseSpec {
  const fromLeft = (p: number) => (from === "gauche" ? p : count - p + 1);
  const good = fromLeft(target);
  // Lettres écartées d'au moins deux formes (lisibles côte à côte) : la bonne, son miroir, puis une proche.
  const positions: number[] = [];
  for (const p of [good, count - good + 1, good + 2, good - 2, good + 3, good - 3]) {
    if (positions.length < 3 && p >= 1 && p <= count && positions.every((q) => Math.abs(q - p) >= 2)) positions.push(p);
  }
  positions.sort((x, y) => x - y);
  if (positions.length < 3 || !positions.includes(good)) throw new Error(`rank : rangée trop courte (${count}, ${target})`);
  const letters = positions.map((position, i) => ({ position, letter: "ABC"[i]! }));
  const right = letters.find((l) => l.position === good)!.letter;
  const name = shape === "carré" ? "carré" : shape;
  return {
    qcm: `Quel ${name} est le <strong>${target}<sup>e</sup></strong> à partir de la ${from} ?`,
    fig: rowOf(count, shape, letters),
    choices: letters.map((l) => (l.letter === right ? `*${l.letter}` : l.letter)),
    why: `On compte à partir de la ${from}, par groupes de 10 : ${countByTens(target)}. Le ${target}<sup>e</sup> est le ${name} <strong>${right}</strong>.`,
  };
}

const BOX = "Quel nombre va dans le cadre vide ?";

/** Arbre de composition : deux nombres se rejoignent, trouver leur somme. */
export function join(a: number, b: number): ExerciseSpec {
  return { num: BOX, fig: tree([a, b], [null]), answer: a + b, why: `${a} + ${b} = <strong>${a + b}</strong>.` };
}

/** Arbre de composition dont un nombre du haut manque : « a + … = total ». */
export function joinMissing(a: number, total: number): ExerciseSpec {
  const answer = total - a;
  return { num: BOX, fig: tree([a, null], [total]), answer, why: `${a} + <strong>${answer}</strong> = ${total}.` };
}

/** Arbre de décomposition : un nombre se sépare en parties connues et une partie à trouver (à la place index). */
export function split(total: number, known: number[], index = known.length): ExerciseSpec {
  const answer = total - known.reduce((s, v) => s + v, 0);
  if (answer < 0) throw new Error(`split : ${known.join(" + ")} dépasse ${total}`);
  const parts: (number | null)[] = [...known];
  parts.splice(index, 0, null);
  const written = parts.map((v) => (v === null ? `<strong>${answer}</strong>` : v)).join(" + ");
  return { num: BOX, fig: tree([total], parts), answer, why: `${total} = ${written}, car ${parts.map((v) => v ?? answer).join(" + ")} = ${total}.` };
}

/** Addition à compléter : « a + b = … ». */
export function sumOf(a: number, b: number): ExerciseSpec {
  return { num: `Complète : <strong>${a} + ${b} = …</strong>`, answer: a + b, why: `${a} + ${b} = <strong>${a + b}</strong>.` };
}

/** Soustraction à compléter : « a − b = … ». */
export function difference(a: number, b: number): ExerciseSpec {
  return { num: `Complète : <strong>${a} − ${b} = …</strong>`, answer: a - b, why: `${a} − ${b} = <strong>${a - b}</strong>, car ${a - b} + ${b} = ${a}.` };
}

/** Explication d'une opération posée : unités (avec retenue ou dizaine empruntée), puis dizaines. */
export function opWhy(a: number, op: "+" | "−", b: number): string {
  const [ua, ta, ub, tb] = [unitsOf(a), tensOf(a), unitsOf(b), tensOf(b)];
  if (op === "+") {
    const u = ua + ub;
    const carry = u >= 10 ? 1 : 0;
    return (
      `${a} + ${b} = <strong>${a + b}</strong>. Unités : ${ua} + ${ub} = ${u}` +
      (carry ? ` : on écrit ${u - 10} et on retient 1.` : ".") +
      ` Dizaines : ${ta} + ${tb}${carry ? " + 1 (retenue)" : ""} = ${ta + tb + carry}.`
    );
  }
  const borrow = ua < ub;
  return (
    `${a} − ${b} = <strong>${a - b}</strong>. ` +
    (borrow
      ? `Unités : ${ua} est plus petit que ${ub}, on prend une dizaine : ${ua + 10} − ${ub} = ${ua + 10 - ub}. Dizaines : ${ta - 1} − ${tb} = ${ta - 1 - tb}.`
      : `Unités : ${ua} − ${ub} = ${ua - ub}. Dizaines : ${ta} − ${tb} = ${ta - tb}.`)
  );
}

/** Opération en colonnes : dans un tableau d et u dessiné (grid), ou à poser soi-même. */
export function posedOp(a: number, op: "+" | "−", b: number, grid = false): ExerciseSpec {
  return grid
    ? { num: "Effectue l’opération posée dans le tableau.", fig: posedGrid(a, op, b), answer: op === "+" ? a + b : a - b, why: opWhy(a, op, b) }
    : { num: `Pose et effectue : <strong>${a} ${op} ${b}</strong>`, answer: op === "+" ? a + b : a - b, why: opWhy(a, op, b) };
}

/**
 * Petit problème du cahier : d'abord l'opération qui convient, puis le résultat. story : l'énoncé (les
 * nombres a et b y figurent) ; reason : pourquoi c'est une addition ou une soustraction ; fig : illustration.
 */
export function problem(
  story: string,
  a: number,
  op: "+" | "−",
  b: number,
  unit: string,
  reason: string,
  fig?: string,
): ExerciseSpec[] {
  const result = op === "+" ? a + b : a - b;
  return [
    {
      qcm: `${story}<br>Quelle opération faut-il faire ?`,
      ...(fig ? { fig } : {}),
      choices: op === "+" ? ["*Addition", "Soustraction"] : ["Addition", "*Soustraction"],
      why: `${reason} C’est une <strong>${op === "+" ? "addition" : "soustraction"}</strong> : ${a} ${op} ${b} = ${result}.`,
    },
    {
      num: `${story}<br>Écris le résultat.`,
      answer: result,
      why: `${a} ${op} ${b} = <strong>${result}</strong> ${unit}.`,
    },
  ];
}

/** Question d'une situation (total, différence…) : la réponse est a + b ou a − b, les nombres sont dans l'énoncé. */
export function storyOp(story: string, ask: string, a: number, op: "+" | "−", b: number, unit: string, fig?: string): ExerciseSpec {
  const result = op === "+" ? a + b : a - b;
  return { num: `${story}<br>${ask}`, ...(fig ? { fig } : {}), answer: result, why: `${a} ${op} ${b} = <strong>${result}</strong> ${unit}.` };
}

/** Comparer deux groupes d'un problème : lequel a le plus grand nombre ? (noms dans l'ordre de l'énoncé). */
export function biggerGroup(story: string, groups: [string, number][], fig?: string): ExerciseSpec {
  const [[n1, v1], [n2, v2]] = groups;
  if (v1 === v2) throw new Error(`biggerGroup : groupes égaux (${n1}, ${n2})`);
  const [big, small] = v1 > v2 ? [[n1, v1], [n2, v2]] : [[n2, v2], [n1, v1]];
  return {
    qcm: `${story}<br>Quel groupe a le plus grand nombre ?`,
    ...(fig ? { fig } : {}),
    choices: [n1, n2].map((n) => (n === big[0] ? `*${n}` : n)),
    why: `<strong>${big[0]}</strong> : ${big[1]} est plus grand que ${small[1]}.`,
  };
}

/** Soustraction posée, puis l'addition qui la vérifie (« 34 + 23 = … » redonne 57). */
export function verifySub(a: number, b: number): ExerciseSpec[] {
  const r = a - b;
  return [
    posedOp(a, "−", b),
    {
      num: `Vérifie ta soustraction avec l’addition : <strong>${r} + ${b} = …</strong>`,
      answer: a,
      why: `${r} + ${b} = <strong>${a}</strong> : on retrouve le premier nombre, la soustraction ${a} − ${b} = ${r} est juste.`,
    },
  ];
}

/** Addition de trois nombres à poser : unités, retenue, dizaines. */
export function sum3(a: number, b: number, c: number): ExerciseSpec {
  const units = unitsOf(a) + unitsOf(b) + unitsOf(c);
  const carry = Math.floor(units / 10);
  const tens = tensOf(a) + tensOf(b) + tensOf(c) + carry;
  return {
    num: `Pose et effectue : <strong>${a} + ${b} + ${c}</strong>`,
    answer: a + b + c,
    why:
      `${a} + ${b} + ${c} = <strong>${a + b + c}</strong>. Unités : ${unitsOf(a)} + ${unitsOf(b)} + ${unitsOf(c)} = ${units}` +
      (carry ? ` : on écrit ${units % 10} et on retient ${carry}.` : ".") +
      ` Dizaines : ${tensOf(a)} + ${tensOf(b)} + ${tensOf(c)}${carry ? ` + ${carry} (retenue)` : ""} = ${tens}.`,
  };
}

/** Pair ou impair : des jetons rangés par deux. */
export function parity(n: number): ExerciseSpec {
  const even = n % 2 === 0;
  return {
    qcm: `Compte les jetons. Leur nombre est-il pair ou impair ?`,
    fig: pairDots(n),
    choices: even ? ["*pair", "impair"] : ["pair", "*impair"],
    why: `Il y a ${n} jetons. Rangés par deux, ${even ? "ils ne laissent aucun jeton seul" : "ils laissent un jeton seul"} : ${n} est <strong>${even ? "pair" : "impair"}</strong>.`,
  };
}

/** Choisir le seul nombre pair (ou impair) parmi trois. */
export function parityAmong(values: number[], want: "pair" | "impair"): ExerciseSpec {
  const isWanted = (v: number) => (v % 2 === 0) === (want === "pair");
  const good = values.filter(isWanted);
  if (good.length !== 1) throw new Error(`parityAmong : un seul nombre ${want} attendu (${values.join(", ")})`);
  return {
    qcm: `Quel est le nombre <strong>${want}</strong> ?`,
    choices: values.map((v) => (isWanted(v) ? `*${v}` : String(v))),
    why: `<strong>${good[0]}</strong> se termine par ${unitsOf(good[0]!)} : il est ${want}.`,
  };
}

/** Relever tous les nombres pairs (ou impairs) d'une liste. */
export function pickParity(values: number[], want: "pair" | "impair"): ExerciseSpec {
  const picked = values.filter((v) => (v % 2 === 0) === (want === "pair"));
  return {
    text: `Écris les nombres <strong>${want}s</strong> de cette liste : <strong>${values.join(" ; ")}</strong>. Sépare-les par des espaces.`,
    answer: picked.join(" "),
    accept: [picked.join(", "), picked.join(" et "), picked.join(" - "), picked.slice(0, -1).join(", ") + ` et ${picked.at(-1)}`],
    why: `Les nombres ${want}s se terminent par ${want === "pair" ? "0, 2, 4, 6 ou 8" : "1, 3, 5, 7 ou 9"} : <strong>${picked.join(", ")}</strong>.`,
  };
}

// ── Multiplication et partage (CP : sens, écritures multiplicatives et de partage) ──

const OPERATIONS = ["addition", "soustraction", "multiplication", "division"] as const;
type Operation = (typeof OPERATIONS)[number];
const SIGN: Record<Operation, string> = { addition: "+", soustraction: "−", multiplication: "×", division: ":" };
const capital = (s: string) => s[0]!.toUpperCase() + s.slice(1);

/** Addition répétée écrite en multiplication : « 2 + 2 + 2 = 2 × … ». */
export function repeatedSum(size: number, times: number): ExerciseSpec {
  return {
    num: `Complète : <strong>${Array(times).fill(size).join(" + ")} = ${size} × …</strong>`,
    fig: groups(times, size),
    answer: times,
    why: `Il y a ${times} fois le nombre ${size} : ${Array(times).fill(size).join(" + ")} = ${size} × <strong>${times}</strong> = ${size * times}.`,
  };
}

/** Produit à trouver : « 2 × 5 = … », avec ses groupes dessinés (ou une petite histoire). */
export function product(size: number, times: number, story?: string): ExerciseSpec {
  return {
    num: `${story ? `${story}<br>` : ""}Complète : <strong>${size} × ${times} = …</strong>`,
    ...(story ? {} : { fig: groups(times, size) }),
    answer: size * times,
    why: `${times} fois ${size} : ${Array(times).fill(size).join(" + ")} = <strong>${size * times}</strong>.`,
  };
}

/** Partage équitable : « total : parts = … » (chacun reçoit le même nombre). */
export function share(total: number, parts: number, story: string, unit: string): ExerciseSpec {
  const each = total / parts;
  if (!Number.isInteger(each)) throw new Error(`share : ${total} ne se partage pas en ${parts}`);
  return {
    num: `${story}<br>Combien chacun reçoit-il ?`,
    fig: groups(parts, each, unit === "billes" ? "bille" : "jeton"),
    answer: each,
    why: `${total} : ${parts} = <strong>${each}</strong> (${Array(parts).fill(each).join(" + ")} = ${total}). Chacun reçoit ${each} ${unit}.`,
  };
}

/** Écriture de partage à compléter : « 12 : 3 = … ». */
export function quotient(total: number, parts: number): ExerciseSpec {
  const each = total / parts;
  if (!Number.isInteger(each)) throw new Error(`quotient : ${total} : ${parts}`);
  return { num: `Complète : <strong>${total} : ${parts} = …</strong>`, answer: each, why: `${total} : ${parts} = <strong>${each}</strong>, car ${parts} × ${each} = ${total}.` };
}

/** Choisir l'opération d'un petit problème parmi les quatre (addition, soustraction, multiplication, division). */
export function whichOperation(story: string, kind: Operation, a: number, b: number, reason: string, fig?: string): ExerciseSpec {
  const result = kind === "addition" ? a + b : kind === "soustraction" ? a - b : kind === "multiplication" ? a * b : a / b;
  return {
    qcm: `${story}<br>Quelle opération faut-il faire ?`,
    ...(fig ? { fig } : {}),
    choices: OPERATIONS.map((o) => (o === kind ? `*${capital(o)}` : capital(o))),
    why: `${reason} C’est une <strong>${kind}</strong> : ${a} ${SIGN[kind]} ${b} = ${result}.`,
  };
}

/** Reconnaître le signe d'une opération. */
export function signOf(kind: Operation): ExerciseSpec {
  return {
    qcm: `Quel est le signe de la <strong>${kind}</strong> ?`,
    choices: OPERATIONS.map((o) => (o === kind ? `*${SIGN[o]}` : SIGN[o])),
    why: `Le signe de la ${kind} est <strong>${SIGN[kind]}</strong>.`,
  };
}

/** Le nombre 100 en dizaines, ou une centaine en unités. */
export function hundredIn(unit: "dizaines" | "unités"): ExerciseSpec {
  return unit === "dizaines"
    ? { num: "Complète : <strong>100 = … dizaines</strong>", answer: 10, why: "100 = <strong>10</strong> dizaines (10 × 10 = 100)." }
    : { num: "Complète : <strong>1 centaine = … unités</strong>", answer: 100, why: "1 centaine = <strong>100</strong> unités." };
}

/** Écrire en chiffres le nombre d'un tableau c, d, u. */
export function readPlaceValue(hundreds: number, tens: number, units: number): ExerciseSpec {
  const n = hundreds * 100 + tens * 10 + units;
  return {
    num: "Écris en chiffres le nombre représenté dans le tableau.",
    fig: placeValue(hundreds, tens, units),
    answer: n,
    why: `${hundreds} centaine${hundreds > 1 ? "s" : ""}, ${dizaines(tens)} et ${unites(units)} : <strong>${n}</strong>.`,
  };
}

/** Terme manquant : « total = a + … » (ou « total = … + a » si first). */
export function missingTerm(total: number, a: number, first = false): ExerciseSpec {
  const answer = total - a;
  return {
    num: `Complète : <strong>${total} = ${first ? `… + ${a}` : `${a} + …`}</strong>`,
    answer,
    why: `${total} = ${first ? `<strong>${answer}</strong> + ${a}` : `${a} + <strong>${answer}</strong>`}, car ${a} + ${answer} = ${total}.`,
  };
}
