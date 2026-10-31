import { describe, expect, it } from "vitest";
import { gradeAnswer } from "@/lib/grading";
import { ANSWER_KEYS_CE1, ASSESSMENTS_CE1, QUESTIONS_CE1 } from "@/mocks/ce1/exercises";
import { ANSWER_KEYS_CE2, ASSESSMENTS_CE2, QUESTIONS_CE2 } from "@/mocks/ce2/exercises";
import { ANSWER_KEYS_CI, ASSESSMENTS_CI, QUESTIONS_CI } from "@/mocks/ci/exercises";
import { ANSWER_KEYS_CM1, ASSESSMENTS_CM1, QUESTIONS_CM1 } from "@/mocks/cm1/exercises";
import { ANSWER_KEYS_CM2, ASSESSMENTS_CM2, QUESTIONS_CM2 } from "@/mocks/cm2/exercises";
import { ANSWER_KEYS_CP, ASSESSMENTS_CP, QUESTIONS_CP } from "@/mocks/cp/exercises";
import { CATALOG_CHAPTERS } from "@/mocks/curriculum";
import { frenchNumber, frenchNumberVariants } from "@/mocks/primary-exercises";

// Séries de maths du primaire écrites avec mocks/primary-exercises.ts : chaque réponse est recalculée
// ici par un second chemin, indépendant (lecture de l'énoncé et du dessin), puis passée au correcteur.

const WORDS: Record<string, number> = {
  zéro: 0, un: 1, deux: 2, trois: 3, quatre: 4, cinq: 5, six: 6, sept: 7, huit: 8, neuf: 9, dix: 10, onze: 11, douze: 12,
  treize: 13, quatorze: 14, quinze: 15, seize: 16, vingt: 20, trente: 30, quarante: 40, cinquante: 50, soixante: 60, cent: 100,
};

/** Lecture indépendante d'un nombre en lettres (« soixante-dix-sept », « cinq mille deux cents »). */
function wordsToNumber(s: string): number {
  let big = 0;
  let total = 0;
  let group = 0;
  const words = s
    .toLowerCase()
    .replace(/quatre[- ]vingts?/g, "quatrevingt")
    .split(/[\s-]+/)
    .filter((w) => w && w !== "et");
  for (const w of words) {
    if (w === "quatrevingt") group += 80;
    else if (w === "cent" || w === "cents") group = (group || 1) * 100;
    else if (w === "mille") {
      total += (group || 1) * 1000;
      group = 0;
    } else if (/^milli(on|ard)s?$/.test(w)) {
      big += (total + group || 1) * (w.startsWith("milliard") ? 1e9 : 1e6);
      total = 0;
      group = 0;
    } else if (w in WORDS) group += WORDS[w]!;
    else throw new Error(`mot inconnu : ${w}`);
  }
  return big + total + group;
}

const series = [...ASSESSMENTS_CP, ...ASSESSMENTS_CI, ...ASSESSMENTS_CE1, ...ASSESSMENTS_CE2, ...ASSESSMENTS_CM1, ...ASSESSMENTS_CM2].filter((a) => a.id.includes("--serie-"));
const RAW_QUESTIONS = { ...QUESTIONS_CP, ...QUESTIONS_CI, ...QUESTIONS_CE1, ...QUESTIONS_CE2, ...QUESTIONS_CM1, ...QUESTIONS_CM2 };
const KEYS = { ...ANSWER_KEYS_CP, ...ANSWER_KEYS_CI, ...ANSWER_KEYS_CE1, ...ANSWER_KEYS_CE2, ...ANSWER_KEYS_CM1, ...ANSWER_KEYS_CM2 };
/** Les grands nombres s'écrivent « 12 000 » (espace insécable) : on la retire pour relire les nombres. */
const plain = (s: string) => s.replace(/(\d)\u00a0(?=\d)/g, "$1");
const question = (id: string) => {
  const q = RAW_QUESTIONS[id]!;
  return { ...q, promptHtml: plain(q.promptHtml), explanationHtml: plain(q.explanationHtml), options: q.options.map((o) => ({ ...o, labelHtml: plain(o.labelHtml) })) };
};
const key = (id: string) => KEYS[id]!;
const accepts = (id: string, value: string) => gradeAnswer(question(id).type, key(id), value, 2).isCorrect;
const optionLabel = (id: string, optionId: string) => question(id).options.find((o) => o.id === optionId)?.labelHtml;
const label = (html: string) => /aria-label="([^"]*)"/.exec(html)?.[1] ?? "";

const compute = (a: number, op: string, b: number) => (op === "+" ? a + b : op === "−" ? a - b : op === "×" ? a * b : a / b);
/** Les deux nombres de l'opération figurent bien dans l'énoncé (en gras). */
const usesNumbers = (html: string, a: string, b: string) => html.includes(`<strong>${a}</strong>`) && html.includes(`<strong>${b}</strong>`);

// ── Géométrie : réponses relues dans le dessin (positions, tracés, formes) ──

const ROW_LETTERS = "ABCDEFGH";
const PICTURE_OF: Record<string, string> = {
  "la mangue": "mangue",
  "l’orange": "orange",
  "la banane": "banane",
  "la fille": "eleve-fille",
  "le garçon": "eleve-garcon",
  "la pastèque": "pasteque",
  "le cahier": "cahier",
  "le crayon": "crayon",
  "le ballon": "ballon",
  "le bonbon": "bonbon",
};
const WORD_OF = Object.fromEntries(Object.entries(PICTURE_OF).map(([w, p]) => [p, w]));
const groupsIn = (html: string) => [...html.matchAll(/<g data-letter="([A-Z])">([\s\S]*?)<\/g>/g)].map((g) => ({ letter: g[1]!, body: g[2]! }));
const num = (s: string | undefined) => Number(s);

function expectedGeometry(html: string): { value: string; option?: boolean } | null {
  let m: RegExpExecArray | null;
  const grid = /<metadata>grid (\d+) (\d+) (\d+) (\d+) (\d+)<\/metadata>/.exec(html);
  if (grid) {
    const [ox, oy, cell, rows, cols] = grid.slice(1).map(Number) as [number, number, number, number, number];
    const cellAt = (x: number, y: number) => [Math.floor((y - oy) / cell), Math.floor((x - ox) / cell)] as const;
    const name = ([r, c]: readonly [number, number]) => `${ROW_LETTERS[r]},${c + 1}`;
    const items = [...html.matchAll(/<image class="dg-item" href="\/illustrations\/([\w-]+)\.svg" x="([\d.]+)" y="([\d.]+)" width="([\d.]+)" height="([\d.]+)"\/>/g)].map((i) => ({
      picture: i[1]!,
      cell: cellAt(num(i[2]) + num(i[4]) / 2, num(i[3]) + num(i[5]) / 2),
    }));
    const route = (/<polyline class="dg-path" points="([^"]+)"/.exec(html)?.[1] ?? "").split(" ").filter(Boolean).map((p) => {
      const [x, y] = p.split(",").map(Number);
      return cellAt(x!, y!);
    });
    const find = (word: string) => items.find((i) => i.picture === PICTURE_OF[word]);
    if ((m = /Dans quelle case se trouve (.+?) \?/.exec(html))) return find(m[1]!) ? { value: name(find(m[1]!)!.cell) } : null;
    if ((m = /Sur quelle <strong>ligne<\/strong> se trouve (.+?) \?/.exec(html))) return { value: ROW_LETTERS[find(m[1]!)!.cell[0]]! };
    if ((m = /Dans quelle <strong>colonne<\/strong> se trouve (.+?) \?/.exec(html))) return { value: String(find(m[1]!)!.cell[1] + 1) };
    if (html.includes("Combien de cases a ce quadrillage ?")) return { value: String(rows * cols) };
    if ((m = /Combien de cases y a-t-il dans une <strong>(ligne|colonne)<\/strong>/.exec(html))) return { value: String(m[1] === "ligne" ? cols : rows) };
    if (html.includes("Quelle est la case du point de départ")) return { value: name(route[0]!) };
    if (html.includes("Quelle est la case du point d’arrivée")) return { value: name(route.at(-1)!) };
    if (html.includes("Par combien de cases passe-t-il")) return { value: String(route.length) };
    if ((m = /Quel dessin rencontre-t-il en (premier|dernier)/.exec(html))) {
      const met = route.map(([r, c]) => items.find((i) => i.cell[0] === r && i.cell[1] === c)).filter((i) => i !== undefined);
      const it = m[1] === "premier" ? met[0] : met.at(-1);
      return it ? { value: WORD_OF[it.picture]!, option: true } : null;
    }
    if ((m = /joue avec les (ronds|croix)/.exec(html))) {
      const symbol = m[1] === "ronds" ? "○" : "✕";
      const marks = [...html.matchAll(/<text class="dg-mark" x="([\d.]+)" y="([\d.]+)"[^>]*>([○✕])<\/text>/g)].map((t) => ({ cell: cellAt(num(t[1]), num(t[2])), symbol: t[3] }));
      const at = (r: number, c: number) => marks.find((k) => k.cell[0] === r && k.cell[1] === c)?.symbol;
      const all: [number, number][][] = [];
      for (let i = 0; i < 3; i++) all.push([0, 1, 2].map((j) => [i, j]), [0, 1, 2].map((j) => [j, i]));
      all.push([[0, 0], [1, 1], [2, 2]], [[0, 2], [1, 1], [2, 0]]);
      const wins = new Set(all.filter((l) => l.filter(([r, c]) => at(r, c) === symbol).length === 2).flatMap((l) => l.filter(([r, c]) => !at(r, c)).map((x) => name(x))));
      return wins.size === 1 ? { value: [...wins][0]! } : null;
    }
  }
  const nodes = /<metadata>nodes (\d+) (\d+) (\d+)<\/metadata>/.exec(html);
  if (nodes && (m = /Quelle flèche montre le nœud <strong>\(([A-H]),(\d+)\)<\/strong>/.exec(html))) {
    const [nx, ny, step] = nodes.slice(1).map(Number) as [number, number, number];
    const target = `${m[1]},${m[2]}`;
    for (const a of html.matchAll(/<path class="dg-arrow" d="M[\d.]+ [\d.]+L([\d.]+) ([\d.]+)"\/>[\s\S]*?class="dg-letter"[^>]*>([a-z])<\/text>/g)) {
      const row = Math.round((num(a[2]) - 5 - ny) / step);
      const col = Math.round((num(a[1]) - 5 - nx) / step);
      if (`${ROW_LETTERS[row]},${col + 1}` === target) return { value: a[3]!, option: true };
    }
    return null;
  }
  if ((m = /Quelle ligne est <strong>(fermée|ouverte)<\/strong>/.exec(html))) {
    const good = groupsIn(html).filter((g) => /Z"\/>/.test(g.body) === (m![1] === "fermée"));
    return good.length === 1 ? { value: good[0]!.letter, option: true } : null;
  }
  if ((m = /Quelle ligne est une <strong>ligne (droite|courbe|brisée)<\/strong>/.exec(html))) {
    const kind = (body: string) => {
      const d = /d="([^"]+)"/.exec(body)![1]!;
      return d.includes("C") ? "courbe" : (d.match(/L/g) ?? []).length === 1 ? "droite" : "brisée";
    };
    const good = groupsIn(html).filter((g) => kind(g.body) === m![1]);
    return good.length === 1 ? { value: good[0]!.letter, option: true } : null;
  }
  if ((m = /Quel dessin est à l’<strong>(intérieur|extérieur)<\/strong>/.exec(html))) {
    const [cx, cy, rx, ry] = (/<ellipse class="dg-zone" cx="([\d.]+)" cy="([\d.]+)" rx="([\d.]+)" ry="([\d.]+)"/.exec(html) ?? []).slice(1).map(Number) as [number, number, number, number];
    const good = groupsIn(html).filter((g) => {
      const [x, y, w, h] = (/x="([\d.]+)" y="([\d.]+)" width="([\d.]+)" height="([\d.]+)"/.exec(g.body) ?? []).slice(1).map(Number) as [number, number, number, number];
      const inside = ((x + w / 2 - cx) / rx) ** 2 + ((y + h / 2 - cy) / ry) ** 2 < 1;
      return inside === (m![1] === "intérieur");
    });
    return good.length === 1 ? { value: good[0]!.letter, option: true } : null;
  }
  if ((m = /Continue la suite : <strong>([^<]+) …<\/strong>/.exec(html))) {
    const shown = m[1]!.split(" ");
    for (let p = 1; p < shown.length; p++) if (shown.every((s, i) => i < p || s === shown[i - p])) return { value: shown[shown.length - p]!, option: true };
    return null;
  }
  const squares = Number(/<metadata>squares (\d+)<\/metadata>/.exec(html)?.[1]);
  const lengthOf = (body: string) => {
    const s = /d="M([\d.]+) [\d.]+H([\d.]+)"/.exec(body);
    return s ? (num(s[2]) - num(s[1])) / squares : NaN;
  };
  if ((m = /Combien de carreaux mesure le trait <strong>([A-Z])<\/strong>/.exec(html))) return { value: String(lengthOf(groupsIn(html).find((g) => g.letter === m![1])!.body)) };
  if ((m = /Quel trait mesure <strong>(\d+) carreaux<\/strong>/.exec(html))) {
    const good = groupsIn(html).filter((g) => lengthOf(g.body) === Number(m![1]));
    return good.length === 1 ? { value: good[0]!.letter, option: true } : null;
  }
  const shapeOf = (body: string) => {
    const r = /<rect class="dg-shape-fill" x="[\d.]+" y="[\d.]+" width="([\d.]+)" height="([\d.]+)"/.exec(body);
    if (r) return { kind: r[1] === r[2] ? "carré" : "rectangle", w: num(r[1]) / squares, h: num(r[2]) / squares };
    return { kind: body.includes("<polygon") ? "triangle" : body.includes("<circle") ? "rond" : "?", w: 0, h: 0 };
  };
  if ((m = /Quelle figure est un <strong>(carré|rectangle|triangle|rond)<\/strong>/.exec(html))) {
    const good = groupsIn(html).filter((g) => shapeOf(g.body).kind === m![1]);
    return good.length === 1 ? { value: good[0]!.letter, option: true } : null;
  }
  if ((m = /Combien de carreaux mesure le <strong>(côté|grand côté|petit côté)<\/strong>/.exec(html))) {
    const f = shapeOf(groupsIn(html)[0]!.body);
    return { value: String(m[1] === "petit côté" ? Math.min(f.w, f.h) : Math.max(f.w, f.h)) };
  }
  if (html.includes("on relie les points dans l’ordre")) {
    const pts = [...html.matchAll(/<circle class="dg-node" cx="([\d.]+)" cy="([\d.]+)"/g)].map((p) => [num(p[1]), num(p[2])] as const);
    const sides = pts.map((p, i) => Math.hypot(pts[(i + 1) % pts.length]![0] - p[0], pts[(i + 1) % pts.length]![1] - p[1]));
    const kind = pts.length === 3 ? "Triangle" : sides.every((s) => s === sides[0]) ? "Carré" : "Rectangle";
    return { value: kind, option: true };
  }
  if ((m = /Combien de <strong>(rectangle|triangle|rond)s<\/strong> vois-tu/.exec(html))) {
    const tag = { rectangle: "rect", triangle: "polygon", rond: "circle" }[m[1] as "rectangle" | "triangle" | "rond"];
    return { value: String((html.match(new RegExp(`<${tag} class="dg-part`, "g")) ?? []).length) };
  }
  if (html.includes("Combien de bandes rectangulaires")) return { value: String((html.match(/class="dg-band /g) ?? []).length) };
  if ((m = /De quelle couleur est (la bande du milieu|la bande de gauche|l’étoile)/.exec(html))) {
    const bands = [...html.matchAll(/<rect class="dg-band dg-flag-(\w+)" x="([\d.]+)"/g)].sort((a, b) => num(a[2]) - num(b[2])).map((b) => b[1]!);
    const color = m[1] === "l’étoile" ? /class="dg-flag-star"/.test(html) && "green" : m[1] === "la bande de gauche" ? bands[0] : bands[1];
    return { value: ({ green: "verte", yellow: "jaune", red: "rouge" } as Record<string, string>)[String(color)]!, option: true };
  }
  return null;
}

// ── Mesures : réponses relues dans le dessin (unités, niveaux, aiguilles, calendrier, pièces) ──

const DAY_LIST = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];
const MONTH_LIST = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
const FRUIT_WORDS: Record<string, string> = { mangue: "la mangue", orange: "l’orange", banane: "la banane", pasteque: "la pastèque" };

function expectedMeasure(html: string): { value: string; option?: boolean } | null {
  let m: RegExpExecArray | null;
  const units = (body: string) => (body.match(/class="dg-stick(?:-alt)?"/g) ?? []).length + (body.match(/class="dg-span"/g) ?? []).length;
  if ((m = /Lequel est <strong>(le plus long|le plus court)<\/strong> \?/.exec(html))) {
    const g = groupsIn(html).map((x) => ({ letter: x.letter, n: units(x.body) }));
    const target = m[1] === "le plus long" ? Math.max(...g.map((x) => x.n)) : Math.min(...g.map((x) => x.n));
    return { value: g.find((x) => x.n === target)!.letter, option: true };
  }
  if ((m = /Lequel est <strong>aussi long<\/strong> que ([A-Z]) \?/.exec(html))) {
    const g = groupsIn(html).map((x) => ({ letter: x.letter, n: units(x.body) }));
    const ref = g.find((x) => x.letter === m![1])!;
    const same = g.filter((x) => x !== ref && x.n === ref.n);
    return same.length === 1 ? { value: same[0]!.letter, option: true } : null;
  }
  if (/Combien de mètres mesure .+\? Chaque règle mesure 1 mètre\./.test(html)) return { value: String(units(html)) };
  if ((m = /Lequel est <strong>(le plus près|le plus loin)<\/strong> de/.exec(html))) {
    const g = groupsIn(html).map((x) => {
      const [, , ex, ey] = /M([\d.]+) ([\d.]+)L([\d.]+) ([\d.]+)/.exec(x.body)!.map(Number) as number[];
      const [sx, sy] = /M([\d.]+) ([\d.]+)L/.exec(x.body)!.slice(1).map(Number) as [number, number];
      return { letter: x.letter, d: Math.hypot(ex! - sx, ey! - sy) };
    });
    const target = m[1] === "le plus près" ? Math.min(...g.map((x) => x.d)) : Math.max(...g.map((x) => x.d));
    return { value: g.find((x) => x.d === target)!.letter, option: true };
  }
  // Verres : plus l'eau monte (y petit), plus il y a d'eau.
  const water = () => groupsIn(html).map((x) => ({ letter: x.letter, top: Number(/class="dg-water" points="[\d.]+,([\d.]+)/.exec(x.body)![1]) }));
  if ((m = /Quel verre a <strong>(plus|moins|autant)<\/strong> d’eau que ([A-Z]) \?/.exec(html))) {
    const g = water();
    const ref = g.find((x) => x.letter === m![2])!;
    const ok = g.filter((x) => x !== ref && (m![1] === "plus" ? x.top < ref.top : m![1] === "moins" ? x.top > ref.top : x.top === ref.top));
    return ok.length === 1 ? { value: ok[0]!.letter, option: true } : null;
  }
  if ((m = /Quel verre a <strong>(le plus|le moins)<\/strong> d’eau \?/.exec(html))) {
    const g = water();
    const t = m[1] === "le plus" ? Math.min(...g.map((x) => x.top)) : Math.max(...g.map((x) => x.top));
    return { value: g.find((x) => x.top === t)!.letter, option: true };
  }
  if (html.includes("Range les verres de celui qui a le <strong>plus</strong>")) return { value: water().sort((a, b) => a.top - b.top).map((x) => x.letter).join(" ") };
  const capSum = (label: RegExp) => [...html.matchAll(label)].reduce((s, x) => s + ({ "1": 1, "½": 0.5, "¼": 0.25 } as Record<string, number>)[x[1]!]!, 0);
  if (html.includes("Quelle est la capacité totale de ces bouteilles")) return { value: String(capSum(/class="dg-cap"[^>]*>(1|½|¼) ℓ</g)) };
  if ((m = /Quelle bouteille contient <strong>(1 litre|un demi-litre|un quart de litre)/.exec(html))) {
    const g = groupsIn(html).map((x) => ({ letter: x.letter, top: Number(/class="dg-bottle-cap" x="[\d.]+" y="([\d.-]+)"/.exec(x.body)![1]) }));
    const sorted = [...g].sort((a, b) => a.top - b.top);
    const pick = m[1] === "1 litre" ? sorted[0] : m[1] === "un demi-litre" ? sorted[1] : sorted[2];
    return { value: pick!.letter, option: true };
  }
  if (html.includes("La balance est en équilibre. Quelle est la masse")) return { value: String(capSum(/class="dg-kg"[^>]*>(1|½|¼) kg</g)) };
  if ((m = /Quel fruit est <strong>(le plus lourd|le plus léger)<\/strong>/.exec(html))) {
    const [ly, ry] = /<metadata>balance ([\d.]+) ([\d.]+)<\/metadata>/.exec(html)!.slice(1).map(Number) as [number, number];
    const left = /translate\(40 [\d.-]+\)"><image class="dg-item" href="\/illustrations\/([\w-]+)\.svg"/.exec(html)![1]!;
    const right = /translate\(200 [\d.-]+\)"><image class="dg-item" href="\/illustrations\/([\w-]+)\.svg"/.exec(html)![1]!;
    const heavy = ly > ry ? left : right;
    const light = ly > ry ? right : left;
    return { value: FRUIT_WORDS[m[1] === "le plus lourd" ? heavy : light] ?? "?", option: true };
  }
  const clockOf = (body: string) => {
    const hand = (cls: string) => {
      const [x1, y1, x2, y2] = new RegExp(`class="${cls}" x1="([\\d.]+)" y1="([\\d.]+)" x2="([\\d.-]+)" y2="([\\d.-]+)"`).exec(body)!.slice(1).map(Number) as number[];
      return ((Math.atan2(x2! - x1!, -(y2! - y1!)) * 180) / Math.PI + 360) % 360;
    };
    const minutes = Math.round(hand("dg-hand-m") / 6) % 60;
    const hours = Math.floor((hand("dg-hand-h") + 1) / 30) % 12 || 12;
    return minutes === 0 ? `${hours} h` : `${hours} h ${minutes}`;
  };
  if (html.includes("Quelle heure indique l’horloge ?")) return { value: clockOf(html) };
  if ((m = /Quelle horloge indique <strong>([^<]+)<\/strong> \?/.exec(html))) {
    const good = groupsIn(html).filter((g) => clockOf(g.body) === m![1]);
    return good.length === 1 ? { value: good[0]!.letter, option: true } : null;
  }
  if ((m = /Quel jour vient juste <strong>(après|avant)<\/strong> le <strong>(\w+)<\/strong>/.exec(html))) {
    return { value: DAY_LIST[(DAY_LIST.indexOf(m[2]!) + (m[1] === "après" ? 1 : 6)) % 7]! };
  }
  if ((m = /Quel mois vient juste <strong>(après|avant)<\/strong> <strong>([^<]+)<\/strong>/.exec(html))) {
    return { value: MONTH_LIST[(MONTH_LIST.indexOf(m[2]!) + (m[1] === "après" ? 1 : 11)) % 12]! };
  }
  if ((m = /en <strong>([^<]+)<\/strong>, est-ce la saison sèche ou la saison des pluies/.exec(html))) {
    const month = MONTH_LIST.indexOf(m[1]!);
    return { value: month >= 6 && month <= 9 ? "la saison des pluies" : month >= 10 || month <= 3 ? "la saison sèche" : "?", option: true };
  }
  if (html.includes('<table class="dg-cal">')) {
    // Tableau du calendrier : chaque date est dans la colonne de son jour.
    const rows = [...html.matchAll(/<tr>((?:<td>\d*<\/td>)+)<\/tr>/g)].map((r) => [...r[1]!.matchAll(/<td>(\d*)<\/td>/g)].map((c) => c[1]!));
    const dayOfDate = (d: number) => {
      for (const r of rows) if (r.includes(String(d))) return DAY_LIST[r.indexOf(String(d))]!;
      return "?";
    };
    const last = Math.max(...rows.flat().filter(Boolean).map(Number));
    if ((m = /Quel jour de la semaine est le <strong>(\d+)<\/strong>/.exec(html))) return { value: dayOfDate(Number(m[1])) };
    if ((m = /Combien y a-t-il de <strong>(\w+)s<\/strong>/.exec(html))) return { value: String(rows.filter((r) => r[DAY_LIST.indexOf(m![1]!)]).length) };
    if (html.includes("Combien de jours y a-t-il en")) return { value: String(last) };
  }
  const coins = [...html.matchAll(/src="\/illustrations\/piece-(\d+)\.svg"/g)].map((c) => Number(c[1]));
  if (coins.length) {
    const sum = coins.reduce((s, v) => s + v, 0);
    if (html.includes("Combien d’argent y a-t-il ?")) return { value: String(sum) };
    if ((m = /Il faut <strong>(\d+) F<\/strong>\. Quelle pièce manque \?/.exec(html))) return { value: `${Number(m[1]) - sum} F`, option: true };
    if ((m = /coûte <strong>(\d+) F<\/strong>\. Peut-on l’acheter/.exec(html))) return { value: sum >= Number(m[1]) ? "Oui" : "Non", option: true };
  }
  if (html.includes("Combien de centimètres mesure")) {
    const cm = Number(/<metadata>ruler (\d+)<\/metadata>/.exec(html)![1]);
    const end = Number(/class="dg-pencil" d="M14 18H[\d.]+L([\d.]+) 25/.exec(html)![1]);
    return { value: String((end - 14) / cm) };
  }
  return null;
}

/** Problèmes : nombre de données, démarche en deux étapes (calculs refaits à partir de l'énoncé). */
function expectedProblem(id: string): { value: string; option?: boolean } | null {
  const html = question(id).promptHtml;
  const why = question(id).explanationHtml;
  let m: RegExpExecArray | null;
  if (html.includes("Combien de <strong>données numériques</strong>")) {
    const story = html.split("<br>Combien de <strong>données numériques</strong>")[0]!;
    return { value: String((story.match(/<strong>\d+<\/strong>/g) ?? []).length) };
  }
  if ((m = /Question intermédiaire : (\d+) ([+−]) (\d+) = (\d+)\. Question finale : (\d+) ([+−]) (\d+) = <strong>(\d+)<\/strong>/.exec(why))) {
    const [a, op1, b, r1, x, op2, y] = [m[1], m[2], m[3], m[4], m[5], m[6], m[7]] as string[];
    if (compute(Number(a), op1!, Number(b)) !== Number(r1)) return null;
    // La question finale part du total de l'énoncé (ce qui reste) ou du résultat intermédiaire.
    const uses = [a, b, x, y].filter((v) => v !== r1).every((v) => html.includes(`<strong>${v}</strong>`));
    return uses ? { value: String(compute(Number(x), op2!, Number(y))) } : null;
  }
  return null;
}


// ── CI : ensembles, positions, solides, points, modèles, tableaux (relus dans le dessin) ──

const PLURAL: Record<string, string> = {
  mangues: "mangue", oranges: "orange", bananes: "banane", pastèques: "pasteque", crayons: "crayon",
  cahiers: "cahier", ballons: "ballon", bonbons: "bonbon", filles: "eleve-fille", garçons: "eleve-garcon",
};
const FAMILY_OF: Record<string, string> = {
  mangue: "fruit", orange: "fruit", banane: "fruit", pasteque: "fruit", crayon: "fourniture", cahier: "fourniture",
  ballon: "jouet", bonbon: "friandise", "eleve-fille": "enfant", "eleve-garcon": "enfant",
};
/** « du ballon », « de la mangue », « de l’orange » → dessin. */
const OF_THE = Object.fromEntries(Object.entries(PICTURE_OF).map(([the, pic]) => [the.startsWith("le ") ? `du ${the.slice(3)}` : `de ${the}`, pic]));
const meta = (html: string, kind: string) => new RegExp(`<metadata>${kind} ([^<]*)</metadata>`).exec(html)?.[1];
const setsOf = (html: string) => meta(html, "sets")!.split(";").map((s) => s.slice(2).split(",").filter(Boolean));
const imagesIn = (html: string) =>
  [...html.matchAll(/<image class="dg-item" href="\/illustrations\/([\w-]+)\.svg" x="([\d.]+)" y="([\d.]+)" width="([\d.]+)" height="([\d.]+)"\/>/g)].map((i) => ({
    picture: i[1]!,
    x: num(i[2]),
    y: num(i[3]),
    h: num(i[5]),
  }));
const ORDINAL_WORDS = ["", "premier", "deuxième", "troisième", "quatrième", "cinquième", "sixième", "septième", "huitième", "neuvième", "dixième"];
const pair = (i: number, j: number) => `${ROW_LETTERS[i]} et ${ROW_LETTERS[j]}`;

function expectedEarly(id: string): { value: string; option?: boolean } | null {
  const html = question(id).promptHtml;
  let m: RegExpExecArray | null;
  if (html.includes("<metadata>sets ")) {
    const sets = setsOf(html);
    if ((m = /Combien (?:de |d’)(\S+) y a-t-il dans l’ensemble \?/.exec(html))) return { value: String(sets[0]!.filter((k) => k === PLURAL[m![1]!]).length) };
    if (html.includes("Quel dessin n’appartient pas à cet ensemble ?")) {
      const odd = sets[0]!.findIndex((k) => sets[0]!.filter((o) => FAMILY_OF[o] === FAMILY_OF[k]).length === 1);
      return odd >= 0 ? { value: ROW_LETTERS[odd]!, option: true } : null;
    }
    const counts = sets.map((s) => s.length);
    if ((m = /Quel ensemble a le <strong>(plus|moins)<\/strong>/.exec(html))) {
      const target = m[1] === "plus" ? Math.max(...counts) : Math.min(...counts);
      return { value: ROW_LETTERS[counts.indexOf(target)]!, option: true };
    }
    if (html.includes("Quels ensembles ont <strong>autant</strong>")) {
      for (let i = 0; i < counts.length; i++) for (let j = i + 1; j < counts.length; j++) if (counts[i] === counts[j]) return { value: pair(i, j), option: true };
      return null;
    }
    if ((m = /Il y a … (?:de |d’)(\S+) que (?:de |d’)([^.]+)\./.exec(html))) {
      const a = sets[0]!.filter((k) => k === PLURAL[m![1]!]).length;
      const b = sets[0]!.filter((k) => k === PLURAL[m![2]!]).length;
      return { value: a > b ? "plus" : a < b ? "moins" : "autant", option: true };
    }
    if (html.includes("faut-il ajouter dans l’ensemble B pour en avoir <strong>autant</strong>")) return { value: String(counts[0]! - counts[1]!) };
    return null;
  }
  if ((m = /Quel bol a <strong>(beaucoup|peu|rien)<\/strong>/.exec(html))) {
    // Billes comptées dans chaque bol du dessin (les bols se suivent de gauche à droite).
    const bowls = html.split('<path class="dg-pan"').slice(1).map((b) => (b.match(/class="dg-token"/g) ?? []).length);
    const most = Math.max(...bowls);
    const i = m[1] === "rien" ? bowls.indexOf(0) : m[1] === "beaucoup" ? bowls.indexOf(most) : bowls.findIndex((b) => b > 0 && b < most);
    return { value: ROW_LETTERS[i]!, option: true };
  }
  if ((m = /sont <strong>(des ronds|des carrés|des triangles|noirs|blancs)<\/strong>/.exec(html))) {
    // Formes comptées dans le dessin : noires (dg-node) ou blanches (dg-shape).
    const shapes = [...html.matchAll(/<(circle|rect|path) class="(dg-node|dg-shape)"/g)].map((s) => ({
      shape: s[1] === "circle" ? "ronds" : s[1] === "rect" ? "carrés" : "triangles",
      dark: s[2] === "dg-node",
    }));
    const want = m[1]!;
    return { value: String(shapes.filter((s) => (want.startsWith("des ") ? s.shape === want.slice(4) : s.dark === (want === "noirs"))).length) };
  }
  if ((m = /juste <strong>à ta (gauche|droite)<\/strong> ([^?]+?) \?/.exec(html))) {
    const items = imagesIn(html).sort((a, b) => a.x - b.x);
    const ref = items.findIndex((i) => i.picture === OF_THE[m![2]!]);
    const other = items[m[1] === "gauche" ? ref - 1 : ref + 1];
    return ref >= 0 && other ? { value: WORD_OF[other.picture]!, option: true } : null;
  }
  if ((m = /Qui est juste <strong>(devant|derrière)<\/strong> (\S+) \?/.exec(html))) {
    // L'école (but de la file) est d'un côté : devant = l'enfant voisin du côté de l'école.
    const names = [...html.matchAll(/<text class="dg-text" x="([\d.]+)"[^>]*>([^<]+)<\/text>/g)].map((t) => ({ x: num(t[1]), name: t[2]! }));
    const school = names.find((n) => n.name === "école")!;
    const kids = names.filter((n) => n.name !== "école");
    const ref = kids.find((k) => k.name === m![2])!;
    const towards = (k: { x: number }) => Math.sign(k.x - ref.x) === Math.sign(school.x - ref.x);
    const side = kids.filter((k) => k !== ref && (m![1] === "devant" ? towards(k) : !towards(k)));
    side.sort((a, b) => Math.abs(a.x - ref.x) - Math.abs(b.x - ref.x));
    return side[0] ? { value: side[0].name, option: true } : null;
  }
  if ((m = /Quel objet est <strong>(sur la table|sous la table|en haut de l’étagère|en bas de l’étagère)<\/strong>/.exec(html))) {
    // Plateau de la table ou planche du milieu de l'étagère : l'objet est au-dessus ou en dessous.
    const line = m[1]!.includes("table") ? 60 : 62;
    const above = m[1] === "sur la table" || m[1] === "en haut de l’étagère";
    const found = imagesIn(html).filter((i) => i.y + i.h / 2 < line === above);
    return found.length === 1 ? { value: WORD_OF[found[0]!.picture]!, option: true } : null;
  }
  if (html.includes("Les enfants font la course jusqu’à la ligne rouge.")) {
    const names = [...html.matchAll(/<text class="dg-text" x="[\d.]+"[^>]*>([^<]+)<\/text>/g)].map((t) => t[1]!);
    const xs = imagesIn(html).map((i) => i.x);
    if (html.includes("<strong>au même niveau</strong>")) {
      for (let i = 0; i < xs.length; i++) for (let j = i + 1; j < xs.length; j++) if (xs[i] === xs[j]) return { value: `${names[i]} et ${names[j]}`, option: true };
      return null;
    }
    const target = html.includes("<strong>avant</strong>") ? Math.max(...xs) : Math.min(...xs);
    return { value: names[xs.indexOf(target)]!, option: true };
  }
  if ((m = /Quel solide est un <strong>(cube|pavé droit|cylindre)<\/strong>/.exec(html))) {
    const kinds = groupsIn(html).map((g) => {
      if (g.body.includes("<ellipse")) return "cylindre";
      const r = /<rect class="dg-solid" x="[\d.]+" y="[\d.]+" width="([\d.]+)" height="([\d.]+)"/.exec(g.body)!;
      return r[1] === r[2] ? "cube" : "pavé droit";
    });
    return { value: ROW_LETTERS[(kinds as string[]).indexOf(m[1]!)]!, option: true };
  }
  if ((m = /\((un cylindre|un cube|un pavé droit)\) sur une feuille et on trace son contour/.exec(html))) {
    return { value: ({ "un cylindre": "un rond", "un cube": "un carré", "un pavé droit": "un rectangle" } as Record<string, string>)[m[1]!]!, option: true };
  }
  if (html.includes("<strong>patron d’un cube</strong>")) {
    const six = groupsIn(html).filter((g) => (g.body.match(/<rect class="dg-solid"/g) ?? []).length === 6);
    return six.length === 1 ? { value: six[0]!.letter, option: true } : null;
  }
  if ((m = /Compte les (\S+)\. Écris leur nombre en chiffres\./.exec(html))) {
    return { value: String(html.split(`src="/illustrations/${PLURAL[m[1]!]}.svg"`).length - 1) };
  }
  const dots = (html.match(/<circle class="dg-node"/g) ?? []).length;
  if (html.includes("Combien de points noirs y a-t-il en tout")) return { value: String(dots) };
  if ((m = /Il faut <strong>(\d+)<\/strong> points noirs en tout/.exec(html))) return { value: String(Number(m[1]) - dots) };
  if ((m = /Quel est le <strong>double<\/strong> de <strong>(\d+)<\/strong>/.exec(html))) return { value: String(2 * Number(m[1])) };
  if ((m = /Quelle est la <strong>moitié<\/strong> de <strong>(\d+)<\/strong>/.exec(html))) return { value: String(Number(m[1]) / 2) };
  if ((m = /Complète : <strong>(\d+)<\/strong> est … de <strong>(\d+)<\/strong>/.exec(html))) {
    return { value: Number(m[1]) === 2 * Number(m[2]) ? "le double" : "la moitié", option: true };
  }
  if ((m = /Comment écrit-on <strong>(\d+)<sup>/.exec(html))) return { value: ORDINAL_WORDS[Number(m[1])]!, option: true };
  if ((m = /Voici le modèle : <strong>([^<]+)<\/strong>/.exec(html))) return { value: m[1]!, option: true };
  if (html.includes("Combien de ronds faut-il dessiner dans le groupe suivant ?")) {
    const counts = html.split('<rect class="dg-group"').slice(1).map((g) => (g.match(/class="dg-token"/g) ?? []).length);
    return { value: String(counts.at(-1)! + (counts.at(-1)! - counts.at(-2)!)) };
  }
  if ((m = /Lis le tableau\. Quel \S+ aime ([^?]+) \?/.exec(html))) {
    const heads = [...html.matchAll(/<th><img [^>]*alt="([^"]+)"/g)].map((h) => h[1]!);
    const row = [...html.matchAll(/<tr><th>([^<]+)<\/th>((?:<td>[^<]*<\/td>)+)<\/tr>/g)].find((r) => r[1] === m![1]);
    const cells = row ? [...row[2]!.matchAll(/<td>([^<]*)<\/td>/g)].map((c) => c[1]) : [];
    return cells.filter((c) => c === "✔").length === 1 ? { value: heads[cells.indexOf("✔")]!, option: true } : null;
  }
  if ((m = /Quel \S+ est <strong>(le plus long|le plus court)<\/strong> \?/.exec(html)) && html.includes('<rect class="dg-cube" x="28"')) {
    const widths = [...html.matchAll(/<rect class="dg-cube" x="28" y="[\d.]+" width="([\d.]+)"/g)].map((w) => num(w[1]));
    const target = m[1] === "le plus long" ? Math.max(...widths) : Math.min(...widths);
    return { value: ROW_LETTERS[widths.indexOf(target)]!, option: true };
  }
  if ((m = /Quel enfant est <strong>(le plus grand|le plus petit)<\/strong> \?/.exec(html))) {
    const heights = imagesIn(html).map((i) => i.h);
    const target = m[1] === "le plus grand" ? Math.max(...heights) : Math.min(...heights);
    return { value: ROW_LETTERS[heights.indexOf(target)]!, option: true };
  }
  return null;
}

// ── Du CE2 au CM2 : grands nombres, opérations, décimaux, fractions, géométrie, mesures ──

const RANK_NAMES = ["unités", "dizaines", "centaines", "unités de mille", "dizaines de mille", "centaines de mille", "unités de millions", "dizaines de millions", "centaines de millions"];
const COUNT_NAMES = ["unités", "dizaines", "centaines", "milliers", "dizaines de mille", "centaines de mille", "millions"];
const UNIT_VALUE: Record<string, number> = {
  km: 1000, hm: 100, dam: 10, m: 1, dm: 0.1, cm: 0.01, mm: 0.001,
  t: 1e6, q: 1e5, kg: 1000, hg: 100, dag: 10, g: 1, dg: 0.1, cg: 0.01, mg: 0.001,
  "hℓ": 100, "daℓ": 10, "ℓ": 1, "dℓ": 0.1, "cℓ": 0.01, "mℓ": 0.001,
  h: 3600, min: 60, s: 1,
  "km²": 1e6, "hm²": 1e4, "dam²": 100, "m²": 1, "dm²": 0.01, "cm²": 1e-4, "mm²": 1e-6,
  // Volumes rapportés au litre (1 dm³ = 1 ℓ).
  "m³": 1000, "dm³": 1, "cm³": 1e-3, "mm³": 1e-6,
};
const FRACTION_DEN: Record<string, number> = { demi: 2, demis: 2, tiers: 3, quart: 4, quarts: 4, cinquième: 5, cinquièmes: 5, sixième: 6, sixièmes: 6, huitième: 8, huitièmes: 8, dixième: 10, dixièmes: 10 };
const dec = (s: string) => Number(s.replace(",", "."));
const showDec = (n: number) => String(Math.round(n * 1000) / 1000).replace(".", ",");
const near = (a: number, b: number) => Math.abs(a - b) < 1e-6;
const gcdOf = (a: number, b: number): number => (b === 0 ? a : gcdOf(b, a % b));

function expectedUpper(id: string): { value: string; option?: boolean } | null {
  const html = question(id).promptHtml;
  let m: RegExpExecArray | null;
  // Démarche en deux étapes (quatre opérations) : chaque nombre utilisé figure en gras dans l'énoncé.
  if ((m = /Question intermédiaire : ([\d,]+) ([+−×:]) ([\d,]+) = ([\d,]+)\. Question finale : ([\d,]+) ([+−×:]) ([\d,]+) = <strong>([\d,]+)<\/strong>/.exec(question(id).explanationHtml))) {
    const [a, op1, b, r1, x, op2, y] = m.slice(1, 8) as string[];
    if (!near(compute(dec(a!), op1!, dec(b!)), dec(r1!))) return null;
    const uses = [a, b, x, y].filter((v) => v !== r1).every((v) => html.includes(`<strong>${v}</strong>`));
    return uses ? { value: showDec(compute(dec(x!), op2!, dec(y!))) } : null;
  }
  if ((m = /Dans <strong>(\d+)<\/strong>, quel est le chiffre des <strong>([^<]+)<\/strong>/.exec(html))) {
    return { value: String(Math.floor(Number(m[1]) / 10 ** RANK_NAMES.indexOf(m[2]!)) % 10) };
  }
  if ((m = /Combien y a-t-il de <strong>([^<]+)<\/strong> en tout dans <strong>(\d+)<\/strong>/.exec(html))) {
    return { value: String(Math.floor(Number(m[2]) / 10 ** COUNT_NAMES.indexOf(m[1]!))) };
  }
  if ((m = /Écris en chiffres le nombre formé de : <strong>([^<]+)<\/strong>/.exec(html))) {
    const ranks: [RegExp, number][] = [[/^centaines? de millions$/, 8], [/^dizaines? de millions$/, 7], [/^millions?$/, 6], [/^centaines? de mille$/, 5], [/^dizaines? de mille$/, 4], [/^milliers?$/, 3], [/^centaines?$/, 2], [/^dizaines?$/, 1], [/^unités?$/, 0]];
    return {
      value: String(
        m[1]!.split(" + ").reduce((sum, part) => {
          const [, k, name] = /^(\d+) (.+)$/.exec(part)!;
          return sum + Number(k) * 10 ** ranks.find(([re]) => re.test(name!))![1];
        }, 0),
      ),
    };
  }
  if ((m = /Complète : <strong>(\d+) = ([^<]+)<\/strong>/.exec(html)) && /^[\d +…]+$/.test(m[2]!) && m[2]!.includes("…")) {
    const known = m[2]!.split(" + ").filter((p) => p !== "…").reduce((s, p) => s + Number(p), 0);
    return { value: String(Number(m[1]) - known) };
  }
  if ((m = /Quel signe faut-il mettre \? <strong>(\d+)\/(\d+) … (\d+)\/(\d+)<\/strong>/.exec(html))) {
    const a = Number(m[1]) / Number(m[2]);
    const b = Number(m[3]) / Number(m[4]);
    return { value: near(a, b) ? "=" : a < b ? "&lt;" : "&gt;", option: true };
  }
  if ((m = /Quel signe faut-il mettre \? <strong>([\d,]+) … ([\d,]+)<\/strong>/.exec(html)) && /,/.test(m[1]! + m[2]!)) {
    const [a, b] = [dec(m[1]!), dec(m[2]!)];
    return { value: a === b ? "=" : a < b ? "&lt;" : "&gt;", option: true };
  }
  if ((m = /Range ces nombres du plus (petit|grand) au plus (?:grand|petit) : <strong>([^<]+)<\/strong>\. Quel rangement est juste \?/.exec(html))) {
    const values = m[2]!.split(" ; ").map(dec).sort((x, y) => (m![1] === "petit" ? x - y : y - x));
    return { value: values.map(showDec).join(m[1] === "petit" ? " &lt; " : " &gt; "), option: true };
  }
  if ((m = /Quel nombre vient juste <strong>(après|avant)<\/strong> <strong>(\d+)<\/strong>/.exec(html))) {
    return { value: String(Number(m[2]) + (m[1] === "après" ? 1 : -1)) };
  }
  if ((m = /Complète la suite : <strong>([^<]+)<\/strong>/.exec(html))) {
    const items = m[1]!.split(" ; ");
    const known = items.map((v, i) => [i, v] as const).filter(([, v]) => v !== "…").map(([i, v]) => [i, dec(v)] as const);
    const step = (known[1]![1] - known[0]![1]) / (known[1]![0] - known[0]![0]);
    return { value: showDec(known[0]![1] + step * (items.indexOf("…") - known[0]![0])) };
  }
  if ((m = /Pose et effectue : <strong>([\d,]+) ([+−×:]) ([\d,]+)<\/strong>/.exec(html))) {
    return { value: showDec(compute(dec(m[1]!), m[2]!, dec(m[3]!))) };
  }
  if ((m = /Effectue la division <strong>(\d+) : (\d+)<\/strong>\. Quel est (le quotient|le reste) \?/.exec(html))) {
    const [a, b] = [Number(m[1]), Number(m[2])];
    return { value: String(m[3] === "le quotient" ? Math.floor(a / b) : a % b) };
  }
  if ((m = /Quel est (le double|le triple|la moitié) de <strong>(\d+)<\/strong>/.exec(html))) {
    const n = Number(m[2]);
    return { value: String(m[1] === "le double" ? 2 * n : m[1] === "le triple" ? 3 * n : n / 2) };
  }
  if ((m = /Quel nombre est divisible par <strong>(\d+)<\/strong>/.exec(html))) {
    const d = Number(m[1]);
    const good = question(id).options.filter((o) => Number(o.labelHtml) % d === 0);
    return good.length === 1 ? { value: good[0]!.labelHtml, option: true } : null;
  }
  if ((m = /Écris ce nombre décimal en chiffres : <strong>([^<]+)<\/strong>/.exec(html))) {
    const part = (re: RegExp) => {
      const p = re.exec(m![1]!);
      return p ? wordsToNumber(p[1]!) : 0;
    };
    const value = part(/^(.+?) unités?/) + part(/, (.+?) dixièmes?/) / 10 + part(/ et (.+?) centièmes?/) / 100;
    return { value: showDec(value) };
  }
  if (html.includes("Quelle fraction de la bande est coloriée ?")) {
    const shaded = (html.match(/<rect class="dg-solid"/g) ?? []).length;
    const all = shaded + (html.match(/<rect class="dg-box"/g) ?? []).length;
    return { value: shaded + "/" + all, option: true };
  }
  if ((m = /Comment écrit-on « <strong>(\S+) (\S+)<\/strong> » en chiffres/.exec(html))) {
    return { value: wordsToNumber(m[1]!) + "/" + FRACTION_DEN[m[2]!], option: true };
  }
  if ((m = /Combien font <strong>(\d+)\/(\d+)<\/strong> de <strong>(\d+)<\/strong>/.exec(html))) {
    return { value: String((Number(m[3]) / Number(m[2])) * Number(m[1])) };
  }
  if ((m = /Quelle droite est <strong>(horizontale|verticale|oblique)<\/strong>/.exec(html))) {
    const kinds = groupsIn(html).map((g) => {
      const [x1, y1, x2, y2] = /x1="([\d.-]+)" y1="([\d.-]+)" x2="([\d.-]+)" y2="([\d.-]+)"/.exec(g.body)!.slice(1).map(Number) as number[];
      return near(y1!, y2!) ? "horizontale" : near(x1!, x2!) ? "verticale" : "oblique";
    });
    return { value: ROW_LETTERS[(kinds as string[]).indexOf(m[1]!)]!, option: true };
  }
  if ((m = /Quelles droites sont <strong>(parallèles|perpendiculaires|sécantes)<\/strong>/.exec(html))) {
    const kinds = groupsIn(html).map((g) => {
      const [a, b] = [...g.body.matchAll(/x1="([\d.-]+)" y1="([\d.-]+)" x2="([\d.-]+)" y2="([\d.-]+)"/g)].map((l) => {
        const [x1, y1, x2, y2] = l.slice(1).map(Number) as number[];
        return [x2! - x1!, y2! - y1!] as const;
      });
      const cross = a![0] * b![1] - a![1] * b![0];
      const dot = a![0] * b![0] + a![1] * b![1];
      return near(cross, 0) ? "parallèles" : near(dot, 0) ? "perpendiculaires" : "sécantes";
    });
    return { value: ROW_LETTERS[(kinds as string[]).indexOf(m[1]!)]!, option: true };
  }
  if ((m = /Quel angle est <strong>(droit|aigu|obtus)<\/strong>/.exec(html))) {
    const kinds = groupsIn(html).map((g) => {
      const [x1, y1, vx, vy, x2, y2] = /d="M([\d.-]+) ([\d.-]+)L([\d.-]+) ([\d.-]+)L([\d.-]+) ([\d.-]+)"/.exec(g.body)!.slice(1).map(Number) as number[];
      const angle = (Math.acos(((x1! - vx!) * (x2! - vx!) + (y1! - vy!) * (y2! - vy!)) / (Math.hypot(x1! - vx!, y1! - vy!) * Math.hypot(x2! - vx!, y2! - vy!))) * 180) / Math.PI;
      return Math.abs(angle - 90) < 0.5 ? "droit" : angle < 90 ? "aigu" : "obtus";
    });
    return { value: ROW_LETTERS[(kinds as string[]).indexOf(m[1]!)]!, option: true };
  }
  if (html.includes("Regarde les longueurs des côtés. Quel est ce triangle ?")) {
    // Côtés mesurés sur le dessin (24 px par cm).
    const pts = [.../d="M([\d.]+) ([\d.]+)L([\d.]+) ([\d.]+)L([\d.]+) ([\d.]+)Z"/.exec(html)!.slice(1).map(Number)];
    const p = [[pts[0]!, pts[1]!], [pts[2]!, pts[3]!], [pts[4]!, pts[5]!]];
    const sides = [0, 1, 2].map((i) => Math.round(Math.hypot(p[i]![0]! - p[(i + 1) % 3]![0]!, p[i]![1]! - p[(i + 1) % 3]![1]!) / 24));
    const equal = new Set(sides).size;
    return { value: equal === 1 ? "équilatéral" : equal === 2 ? "isocèle" : "quelconque", option: true };
  }
  if ((m = /Le <strong>(rayon|diamètre)<\/strong> de ce cercle de centre O mesure <strong>([\d,]+) \S+<\/strong>/.exec(html))) {
    return { value: showDec(m[1] === "rayon" ? dec(m[2]!) * 2 : dec(m[2]!) / 2) };
  }
  if (html.includes("Quel point est le symétrique du point noir ?")) {
    const axis = Number(/<line class="dg-arrow" x1="([\d.]+)"/.exec(html)![1]);
    const [, px, py] = /<circle class="dg-node" cx="([\d.]+)" cy="([\d.]+)"/.exec(html)!.map(Number) as number[];
    const good = groupsIn(html).find((g) => {
      const [, cx, cy] = /cx="([\d.]+)" cy="([\d.]+)"/.exec(g.body)!.map(Number) as number[];
      return near(cx!, 2 * axis - px!) && near(cy!, py!);
    });
    return good ? { value: good.letter, option: true } : null;
  }
  if ((m = /quelle face est opposée \(parallèle\) à la face <strong>(\S+)<\/strong>/.exec(html))) {
    // Faces lues dans le dessin : colonne de 4 faces, deux faces sur les côtés.
    const faces = [...html.matchAll(/<rect class="dg-solid-top" x="([\d.]+)" y="([\d.]+)"[^>]*\/><text[^>]*>([^<]+)<\/text>/g)].map((f) => ({ x: Number(f[1]), y: Number(f[2]), letter: f[3]! }));
    const columns = new Map<number, typeof faces>();
    for (const f of faces) columns.set(f.x, [...(columns.get(f.x) ?? []), f]);
    const ring = [...columns.values()].find((c) => c.length === 4)!.sort((a, b) => a.y - b.y);
    const sides = faces.filter((f) => !ring.includes(f));
    const target = faces.find((f) => f.letter === m![1])!;
    const i = ring.indexOf(target);
    const opposite = i >= 0 ? ring[(i + 2) % 4]! : sides.find((f) => f !== target)!;
    return { value: opposite.letter, option: true };
  }
  if ((m = /Complète : <strong>([^<=]+) = … (\S+)<\/strong>/.exec(html))) {
    const parts = [...m[1]!.matchAll(/([\d,]+) (\S+)/g)];
    if (!parts.every((p) => p[2]! in UNIT_VALUE) || !(m[2]! in UNIT_VALUE)) return null;
    return { value: showDec(parts.reduce((s, p) => s + (dec(p[1]!) * UNIT_VALUE[p[2]!]!) / UNIT_VALUE[m![2]!]!, 0)) };
  }
  if ((m = /Départ à <strong>(\d+) h (\d+) min<\/strong>, arrivée à <strong>(\d+) h (\d+) min<\/strong>/.exec(html))) {
    return { value: String(Number(m[3]) * 60 + Number(m[4]) - Number(m[1]) * 60 - Number(m[2])) };
  }
  if (html.includes("Quelle heure est-il sur cette horloge ?")) {
    const hand = (cls: string) => {
      const line = html.split('class="' + cls + '"')[1]!;
      const [x1, y1, x2, y2] = /x1="([\d.-]+)" y1="([\d.-]+)" x2="([\d.-]+)" y2="([\d.-]+)"/.exec(line)!.slice(1).map(Number) as number[];
      return ((Math.atan2(x2! - x1!, -(y2! - y1!)) * 180) / Math.PI + 360) % 360;
    };
    const minutes = Math.round(hand("dg-hand-m") / 6) % 60;
    const hours = Math.floor((hand("dg-hand-h") + 1) / 30) % 12 || 12;
    return { value: hours + " h " + String(minutes).padStart(2, "0") + " min", option: true };
  }
  if ((m = /On partage <strong>(\d+)<\/strong> \S+ entre (.+?) et (.+?)\. (.+?) reçoit <strong>(\d+)<\/strong> \S+ de plus que (.+?)\. Combien reçoit (.+?) \?/.exec(html))) {
    const [total, diff] = [Number(m[1]), Number(m[5])];
    return { value: String(m[7] === m[4] ? (total + diff) / 2 : (total - diff) / 2) };
  }
  if ((m = /On partage <strong>(\d+)<\/strong> \S+ entre (.+)\. Combien reçoit ([^?]+) \?/.exec(html))) {
    const shares = [...m[2]!.matchAll(/([^()]+?) \(<strong>(\d+)<\/strong> parts?\)/g)].map((s) => [s[1]!.trim().replace(/^et /, ""), Number(s[2])] as const);
    const total = shares.reduce((s, [, k]) => s + k, 0);
    const k = shares.find(([name]) => name === m![3]!.trim())![1];
    return { value: String((Number(m[1]) / total) * k) };
  }
  const lengths = () => [...html.matchAll(/<strong>([\d,]+) [^<]+<\/strong>/g)].map((n) => dec(n[1]!));
  if ((m = /Calcule le <strong>(périmètre|demi-périmètre)<\/strong> d’un (carré|rectangle|triangle)/.exec(html))) {
    const v = lengths();
    const p = m[2] === "carré" ? v[0]! * 4 : m[2] === "rectangle" ? (v[0]! + v[1]!) * 2 : v.reduce((s, x) => s + x, 0);
    return { value: showDec(m[1] === "périmètre" ? p : p / 2) };
  }
  if ((m = /Calcule l’<strong>aire<\/strong> d’un (carré|rectangle)/.exec(html))) {
    const v = lengths();
    return { value: showDec(m[1] === "carré" ? v[0]! * v[0]! : v[0]! * v[1]!) };
  }
  if ((m = /Un carré a <strong>([\d,]+) \S+<\/strong> de (périmètre|demi-périmètre)\./.exec(html))) {
    return { value: showDec(m[2] === "périmètre" ? dec(m[1]!) / 4 : dec(m[1]!) / 2) };
  }
  if ((m = /Un rectangle a <strong>([\d,]+) \S+<\/strong> de (périmètre|demi-périmètre) et <strong>([\d,]+) \S+<\/strong> de largeur/.exec(html))) {
    const half = m[2] === "périmètre" ? dec(m[1]!) / 2 : dec(m[1]!);
    return { value: showDec(half - dec(m[3]!)) };
  }
  if (html.includes("Ce rectangle est couvert de carrés de 1 cm².")) return { value: String((html.match(/<rect class="dg-solid-top"/g) ?? []).length) };
  if ((m = /data-ask="([^|]+)\|([^"]+)"/.exec(html))) {
    const heads = [...html.split("<thead>")[1]!.split("</thead>")[0]!.matchAll(/<th>([^<]*)<\/th>/g)].map((h) => h[1]);
    const row = [...html.matchAll(/<tr><th>([^<]+)<\/th>((?:<td>[^<]*<\/td>)+)<\/tr>/g)].find((r) => r[1] === m![1]);
    const cells = row ? [...row[2]!.matchAll(/<td>([^<]*)<\/td>/g)].map((c) => c[1]!) : [];
    return { value: cells[heads.indexOf(m[2]!) - 1] ?? "?" };
  }
  if ((m = /Calcule et simplifie si possible : <strong>(\d+)\/(\d+) ([×:]) (\d+)(?:\/(\d+))?<\/strong>/.exec(html))) {
    const [a, b, c] = [m[1], m[2], m[4]].map(Number) as number[];
    const d = m[5] ? Number(m[5]) : 1;
    const [n, den] = m[3] === "×" ? [a! * c!, b! * d] : [a!, b! * c!];
    const g = gcdOf(n, den);
    return { value: n / g + "/" + den / g };
  }
  if ((m = /réduire <strong>(\d+)\/(\d+)<\/strong> et <strong>(\d+)\/(\d+)<\/strong> au même dénominateur/.exec(html))) {
    const [b, d] = [Number(m[2]), Number(m[4])];
    return { value: String((b * d) / gcdOf(b, d)) };
  }
  if ((m = /Combien font <strong>([\d,]+) %<\/strong> de <strong>([\d,]+)<\/strong>/.exec(html))) return { value: showDec((dec(m[2]!) * dec(m[1]!)) / 100) };
  if ((m = /Sur <strong>([\d,]+)<\/strong> .+?, <strong>([\d,]+)<\/strong> sont concernés/.exec(html))) return { value: showDec((dec(m[2]!) * 100) / dec(m[1]!)) };
  if ((m = /à l’échelle <strong>1\/(\d+)<\/strong>, deux lieux sont à <strong>([\d,]+) cm<\/strong>.*\(en (m|km)\)/.exec(html))) {
    const cm = dec(m[2]!) * Number(m[1]);
    return { value: showDec(m[3] === "km" ? cm / 100000 : cm / 100) };
  }
  if ((m = /Sur un plan, <strong>([\d,]+) cm<\/strong> représentent <strong>([\d,]+) m<\/strong>/.exec(html))) return { value: showDec((dec(m[2]!) * 100) / dec(m[1]!)) };
  if (html.includes('class="dg-cal dg-prop"')) {
    // Tableau de proportionnalité : rapport lu dans une colonne complète, appliqué à la case « ? ».
    const rows = [...html.matchAll(/<tr><th>[^<]*<\/th>((?:<td>[^<]*<\/td>)+)<\/tr>/g)].map((r) => [...r[1]!.matchAll(/<td>([^<]*)<\/td>/g)].map((c) => c[1]!));
    const [top, bottom] = [rows[0]!, rows[1]!];
    const full = bottom.findIndex((v) => v !== "?");
    const ratio = dec(bottom[full]!) / dec(top[full]!);
    return { value: showDec(dec(top[bottom.indexOf("?")]!) * ratio) };
  }
  if ((m = /Un capital de <strong>([\d,]+) F<\/strong> est placé à <strong>([\d,]+) %<\/strong> par an pendant <strong>(\d+) ans?<\/strong>/.exec(html))) {
    return { value: showDec((dec(m[1]!) * dec(m[2]!) * Number(m[3])) / 100) };
  }
  if ((m = /Placé à <strong>([\d,]+) %<\/strong> par an pendant <strong>(\d+) ans?<\/strong>, un capital rapporte <strong>([\d,]+) F<\/strong>/.exec(html))) {
    return { value: showDec((dec(m[3]!) * 100) / (dec(m[1]!) * Number(m[2]))) };
  }
  if ((m = /Un capital de <strong>([\d,]+) F<\/strong> rapporte <strong>([\d,]+) F<\/strong> d’intérêt en <strong>(\d+) ans?<\/strong>/.exec(html))) {
    return { value: showDec((dec(m[2]!) * 100) / (dec(m[1]!) * Number(m[3]))) };
  }
  if ((m = /Un capital de <strong>([\d,]+) F<\/strong> placé à <strong>([\d,]+) %<\/strong> par an rapporte <strong>([\d,]+) F<\/strong>/.exec(html))) {
    return { value: showDec((dec(m[3]!) * 100) / (dec(m[1]!) * dec(m[2]!))) };
  }
  if ((m = /: <strong>([^<]+)<\/strong>\. Quelle est la moyenne/.exec(html))) {
    const values = m[1]!.split(" ; ").map(dec);
    return { value: showDec(values.reduce((s, v) => s + v, 0) / values.length) };
  }
  if ((m = /losange dont les diagonales mesurent <strong>([\d,]+) \S+<\/strong> et <strong>([\d,]+) \S+<\/strong>/.exec(html))) return { value: showDec((dec(m[1]!) * dec(m[2]!)) / 2) };
  if ((m = /trapèze de grande base <strong>([\d,]+) \S+<\/strong>, de petite base <strong>([\d,]+) \S+<\/strong> et de hauteur <strong>([\d,]+) \S+<\/strong>/.exec(html))) {
    return { value: showDec(((dec(m[1]!) + dec(m[2]!)) * dec(m[3]!)) / 2) };
  }
  if ((m = /volume d’un cylindre de <strong>([\d,]+) \S+<\/strong> de rayon et <strong>([\d,]+) \S+<\/strong> de hauteur/.exec(html))) {
    return { value: showDec(dec(m[1]!) ** 2 * 3.14 * dec(m[2]!)) };
  }
  if ((m = /Calcule : <strong>(\d+) h (\d+) min ([×:]) (\d+)<\/strong>/.exec(html))) {
    const a = Number(m[1]) * 60 + Number(m[2]);
    const r = m[3] === "×" ? a * Number(m[4]) : a / Number(m[4]);
    return { value: Math.floor(r / 60) + " h " + String(r % 60).padStart(2, "0") + " min" };
  }
  if ((m = /Calcule le périmètre d’un <strong>([^<]+)<\/strong> de <strong>([\d,]+) \S+<\/strong> de côté/.exec(html))) {
    const sides: Record<string, number> = { "triangle équilatéral": 3, carré: 4, "pentagone régulier": 5, "hexagone régulier": 6, "octogone régulier": 8 };
    return { value: showDec(sides[m[1]!]! * dec(m[2]!)) };
  }
  if ((m = /Simplifie la fraction <strong>(\d+)\/(\d+)<\/strong>/.exec(html))) {
    const g = gcdOf(Number(m[1]), Number(m[2]));
    return { value: Number(m[1]) / g + "/" + Number(m[2]) / g };
  }
  if ((m = /Calcule et simplifie si possible : <strong>(\d+)\/(\d+) ([+−]) (\d+)\/(\d+)<\/strong>/.exec(html))) {
    const [a, b, c, d] = [m[1], m[2], m[4], m[5]].map(Number) as number[];
    const n = m[3] === "+" ? a! * d! + c! * b! : a! * d! - c! * b!;
    const g = gcdOf(n, b! * d!);
    return { value: n / g + "/" + (b! * d!) / g };
  }
  if ((m = /Les <strong>(\d+)\/(\d+)<\/strong> d’une quantité valent <strong>([\d,]+)<\/strong>/.exec(html))) {
    return { value: showDec((dec(m[3]!) / Number(m[1])) * Number(m[2])) };
  }
  if ((m = /Écris la fraction décimale <strong>(\d+)\/(\d+)<\/strong>/.exec(html))) return { value: showDec(Number(m[1]) / Number(m[2])) };
  if ((m = /tous les <strong>([\d,]+)<\/strong> m (?:le long d’une allée de <strong>([\d,]+)<\/strong> m, (un à chaque bout|sans en mettre aux deux bouts)|autour d’un terrain de <strong>([\d,]+)<\/strong> m de tour)/.exec(html))) {
    const n = dec(m[2] ?? m[4]!) / dec(m[1]!);
    return { value: String(m[4] ? n : m[3] === "un à chaque bout" ? n + 1 : n - 1) };
  }
  if ((m = /Le <strong>(rayon|diamètre)<\/strong> d’un cercle mesure <strong>([\d,]+) \S+<\/strong>\. Calcule son périmètre/.exec(html))) {
    return { value: showDec(dec(m[2]!) * (m[1] === "rayon" ? 2 : 1) * 3.14) };
  }
  if ((m = /Calcule l’<strong>aire<\/strong> d’un (triangle|parallélogramme) de <strong>([\d,]+) \S+<\/strong> de base et <strong>([\d,]+) \S+<\/strong> de hauteur/.exec(html))) {
    const p = dec(m[2]!) * dec(m[3]!);
    return { value: showDec(m[1] === "triangle" ? p / 2 : p) };
  }
  if ((m = /Calcule l’<strong>aire<\/strong> d’un disque de <strong>([\d,]+) \S+<\/strong> de rayon/.exec(html))) return { value: showDec(dec(m[1]!) ** 2 * 3.14) };
  if ((m = /Un (rectangle|triangle|parallélogramme) a une aire de <strong>([\d,]+) \S+<\/strong> et une (?:largeur|base) de <strong>([\d,]+) \S+<\/strong>/.exec(html))) {
    return { value: showDec(((m[1] === "triangle" ? 2 : 1) * dec(m[2]!)) / dec(m[3]!)) };
  }
  if ((m = /Calcule le <strong>volume<\/strong> d’un (cube|pavé droit)/.exec(html))) {
    const v = [...html.matchAll(/<strong>([\d,]+) [^<]+<\/strong>/g)].map((n) => dec(n[1]!));
    return { value: showDec(m[1] === "cube" ? v[0]! ** 3 : v[0]! * v[1]! * v[2]!) };
  }
  if ((m = /Calcule : <strong>(\d+) h (\d+) min ([+−]) (\d+) h (\d+) min<\/strong>/.exec(html))) {
    const a = Number(m[1]) * 60 + Number(m[2]);
    const b = Number(m[4]) * 60 + Number(m[5]);
    const r = m[3] === "+" ? a + b : a - b;
    return { value: Math.floor(r / 60) + " h " + String(r % 60).padStart(2, "0") + " min" };
  }
  if ((m = /deux angles mesurent <strong>(\d+)°<\/strong> et <strong>(\d+)°<\/strong>/.exec(html))) return { value: String(180 - Number(m[1]) - Number(m[2])) };
  if ((m = /De combien de carreaux a-t-elle glissé vers (la droite|le bas) \?/.exec(html))) {
    const start = (cls: string) => /M([\d.]+) ([\d.]+)/.exec(html.split('class="' + cls + '"')[1]!)!.slice(1).map(Number) as number[];
    const [x1, y1] = start("dg-shape-fill");
    const [x2, y2] = start("dg-solid");
    return { value: String(m[1] === "la droite" ? (x2! - x1!) / 24 : (y2! - y1!) / 24) };
  }
  if (html.includes("Graphique en barres")) {
    // Valeur lue sur l'échelle : deux graduations donnent la correspondance hauteur → valeur.
    const ticks = [...html.matchAll(/<text class="dg-axis" x="20" y="([\d.]+)"[^>]*>(\d+)<\/text>/g)].map((t) => [Number(t[1]), Number(t[2])] as const);
    const [[ya, va], [yb, vb]] = [ticks[0]!, ticks[1]!];
    const question = html.split("<svg")[0]!;
    const bars = [...html.matchAll(/<rect class="dg-solid" data-bar="([^"]+)" x="[\d.]+" y="([\d.]+)"/g)].filter((b) => question.includes(b[1]!));
    if (bars.length !== 1) return null;
    return { value: showDec(va + ((Number(bars[0]![2]) - ya) * (vb - va)) / (yb - ya)) };
  }
  // Petit problème avec des décimaux : l'opération de la correction utilise les nombres en gras.
  if ((m = /^(?:<p>)?([\d,]+) ([+−×:]) ([\d,]+) = <strong>([\d,]+)<\/strong>/.exec(question(id).explanationHtml)) && html.includes("<strong>" + m[1] + "</strong>") && html.includes("<strong>" + m[3] + "</strong>")) {
    return { value: showDec(compute(dec(m[1]!), m[2]!, dec(m[3]!))) };
  }
  return null;
}

/** Réponse attendue, recalculée à partir de l'énoncé seul ; null si le type n'est pas reconnu. */
function expected(id: string): { value: string; option?: boolean } | null {
  const html = question(id).promptHtml;
  let m: RegExpExecArray | null;
  const early = expectedEarly(id) ?? expectedUpper(id);
  if (early) return early;
  const geometry = expectedGeometry(html) ?? expectedMeasure(html) ?? expectedProblem(id);
  if (geometry) return geometry;
  // Vrai / faux de connaissance : la correction affiche la même réponse que le corrigé.
  if (question(id).type === "true_false") {
    m = /^<p><strong>(Vrai|Faux)<\/strong>/.exec(question(id).explanationHtml);
    return m ? { value: m[1]!, option: true } : null;
  }
  if (html.includes("représenté dans le tableau") && (m = /(\d+) barres? de dix cubes .* et (\d+) cubes?/.exec(label(html)))) {
    return { value: String(Number(m[1]) * 10 + Number(m[2])) };
  }
  if ((m = /Écris en chiffres le nombre <span class="cursive">([^<]+)<\/span>/.exec(html))) return { value: String(wordsToNumber(m[1]!)) };
  if ((m = /Écris en lettres le nombre <strong>(\d+)<\/strong>/.exec(html))) return { value: m[1]! };
  if ((m = /Quel signe faut-il mettre \? <strong>(\d+)(?: [^ <…]+)? … (\d+)(?: [^<]+)?<\/strong>/.exec(html))) {
    const [a, b] = [Number(m[1]), Number(m[2])];
    return { value: a < b ? "&lt;" : a > b ? "&gt;" : "=", option: true };
  }
  if ((m = /Range ces nombres du plus (petit|grand) au plus (?:grand|petit) : <strong>([^<]+)<\/strong>/.exec(html))) {
    const values = m[2]!.split(" ; ").map(Number);
    return { value: values.sort((x, y) => (m![1] === "petit" ? x - y : y - x)).join(" ") };
  }
  if (html.includes("Bande numérique")) {
    const cells = label(html).replace(/^Bande numérique : |\.$/g, "").split(", ");
    const hole = cells.indexOf("case vide");
    const known = cells.map((c, i) => [i, Number(c)] as const).filter(([i]) => i !== hole);
    const step = (known[1]![1] - known[0]![1]) / (known[1]![0] - known[0]![0]);
    return { value: String(known[0]![1] + step * (hole - known[0]![0])) };
  }
  if (html.includes("Écris en chiffres le nombre de cubes.")) {
    // Cubes comptés dans le dessin (la description ne donne pas leur nombre).
    return { value: String((html.match(/<rect class="dg-cube"/g) ?? []).length) };
  }
  if (html.includes("Arbre :")) {
    const text = label(html);
    if ((m = /Arbre : (.+) en haut se rejoignent dans (.+) en bas/.exec(text))) {
      const known = m[1]!.split(" et ").filter((p) => p !== "un cadre vide").map(Number).reduce((s, v) => s + v, 0);
      return { value: String(m[2] === "le cadre vide" ? known : Number(m[2]) - known) };
    }
    if ((m = /Arbre : (\d+) en haut se sépare en (.+) en bas/.exec(text))) {
      const parts = m[2]!.split(" et ").filter((p) => p !== "un cadre vide").map(Number);
      return { value: String(Number(m[1]) - parts.reduce((s, v) => s + v, 0)) };
    }
    return null;
  }
  if ((m = /Pose et effectue : <strong>(\d+) \+ (\d+) \+ (\d+)<\/strong>/.exec(html))) return { value: String(Number(m[1]) + Number(m[2]) + Number(m[3])) };
  if ((m = /Complète : <strong>((?:\d+ \+ )+\d+) = (\d+) × …<\/strong>/.exec(html))) {
    const terms = m[1]!.split(" + ");
    return terms.every((t) => t === m![2]) ? { value: String(terms.length) } : null;
  }
  if ((m = /<strong>(\d+) × (\d+) = …<\/strong>/.exec(html))) return { value: String(Number(m[1]) * Number(m[2])) };
  if ((m = /<strong>(\d+) : (\d+) = …<\/strong>/.exec(html))) return { value: String(Number(m[1]) / Number(m[2])) };
  if ((m = /Quel est le signe de la <strong>(\w+)<\/strong> \?/.exec(html))) {
    return { value: ({ addition: "+", soustraction: "−", multiplication: "×", division: ":" } as Record<string, string>)[m[1]!]!, option: true };
  }
  if (html.includes("<strong>100 = … dizaines</strong>")) return { value: "10" };
  if (html.includes("<strong>1 centaine = … unités</strong>")) return { value: "100" };
  if ((m = /Tableau c, d et u : (\d+) plaques? de cent, (\d+) barres? de dix et (\d+) cubes?/.exec(label(html)))) {
    return { value: String(Number(m[1]) * 100 + Number(m[2]) * 10 + Number(m[3])) };
  }
  if (html.includes("Leur nombre est-il pair ou impair ?")) {
    const count = (html.match(/<circle class="dg-token"/g) ?? []).length;
    return { value: count % 2 === 0 ? "pair" : "impair", option: true };
  }
  if ((m = /Quel est le nombre <strong>(pair|impair)<\/strong> \?/.exec(html))) {
    const want = m[1] === "pair" ? 0 : 1;
    const good = question(id).options.map((o) => o.labelHtml).filter((l) => Number(l) % 2 === want);
    return good.length === 1 ? { value: good[0]!, option: true } : null;
  }
  if ((m = /Écris les nombres <strong>(pair|impair)s<\/strong> de cette liste : <strong>([^<]+)<\/strong>/.exec(html))) {
    const want = m[1] === "pair" ? 0 : 1;
    return { value: m[2]!.split(" ; ").map(Number).filter((v) => v % 2 === want).join(" ") };
  }
  if ((m = /Opération posée dans un tableau d et u : (\d+) ([+−]) (\d+)\./.exec(label(html))) || (m = /Pose et effectue : <strong>(\d+) ([+−]) (\d+)<\/strong>/.exec(html))) {
    return { value: String(compute(Number(m[1]), m[2]!, Number(m[3]))) };
  }
  // Problèmes : l'opération écrite dans la correction utilise les nombres de l'énoncé et donne la réponse.
  const why = question(id).explanationHtml;
  if (html.includes("Quelle opération faut-il faire ?")) {
    m = /(\d+) ([+−×:]) (\d+) = (\d+)/.exec(why);
    if (!m || !usesNumbers(html, m[1]!, m[3]!) || compute(Number(m[1]), m[2]!, Number(m[3])) !== Number(m[4])) return null;
    return { value: ({ "+": "Addition", "−": "Soustraction", "×": "Multiplication", ":": "Division" } as Record<string, string>)[m[2]!]!, option: true };
  }
  if (html.includes("Quel groupe a le plus grand nombre ?")) {
    m = /<strong>([^<]+)<\/strong> : (\d+) est plus grand que (\d+)/.exec(why);
    return m && Number(m[2]) > Number(m[3]) && usesNumbers(html, m[2]!, m[3]!) ? { value: m[1]!, option: true } : null;
  }
  if ((m = /^(\d+) ([+−×:]) (\d+) = <strong>(\d+)<\/strong>/.exec(why.replace(/^<p>/, ""))) && usesNumbers(html, m[1]!, m[3]!)) {
    return { value: String(compute(Number(m[1]), m[2]!, Number(m[3]))) };
  }
  if ((m = /<strong>(\d+) \+ (\d+) = …<\/strong>/.exec(html))) return { value: String(Number(m[1]) + Number(m[2])) };
  if ((m = /<strong>(\d+) − (\d+) = …<\/strong>/.exec(html))) return { value: String(Number(m[1]) - Number(m[2])) };
  if ((m = /Complète : <strong>(\d+) = (?:(\d+) \+ …|… \+ (\d+))<\/strong>/.exec(html))) return { value: String(Number(m[1]) - Number(m[2] ?? m[3])) };
  if ((m = /est le <strong>(\d+)<sup>e<\/sup><\/strong> à partir de la (gauche|droite)/.exec(html))) {
    // Centres des formes et des lettres lus dans le dessin : la lettre placée au-dessus de la bonne forme.
    const count = Number(/Une rangée de (\d+)/.exec(label(html))![1]);
    const centers = [...html.matchAll(/<circle class="dg-(?:shape|token)" cx="([\d.]+)"|<rect class="dg-shape" x="([\d.]+)"[^>]*width="([\d.]+)"/g)].map((c) =>
      c[1] ? Number(c[1]) : Number(c[2]) + Number(c[3]) / 2,
    );
    const letters = [...html.matchAll(/<text class="dg-letter" x="([\d.]+)"[^>]*>([A-C])<\/text>/g)].map((l) => ({ x: Number(l[1]), letter: l[2]! }));
    const target = Number(m[1]);
    const position = m[2] === "gauche" ? target : count - target + 1;
    const letter = letters.find((l) => l.x === centers[position - 1])?.letter;
    return letter ? { value: letter, option: true } : null;
  }
  // Questions de lecture et de connaissance (données utiles, question finale, durées…) : rédigées à la
  // main, on vérifie seulement que la correction affiche la même réponse que le corrigé.
  if (question(id).type === "single_choice" && (m = /^<p><strong>([^<]+)<\/strong> :/.exec(question(id).explanationHtml))) {
    return { value: m[1]!, option: true };
  }
  if ((m = /^<p><strong>([A-Z](?: → [A-Z])+)<\/strong> :/.exec(question(id).explanationHtml))) return { value: m[1]!.split(" → ").join(" ") };
  return null;
}

describe("nombres en lettres", () => {
  it("écrit les nombres comme les cahiers et accepte l’écriture traditionnelle", () => {
    const table: [number, string][] = [
      [0, "zéro"], [16, "seize"], [17, "dix-sept"], [21, "vingt-et-un"], [22, "vingt-deux"], [31, "trente-et-un"],
      [50, "cinquante"], [61, "soixante-et-un"], [70, "soixante-dix"], [71, "soixante-et-onze"], [77, "soixante-dix-sept"],
      [80, "quatre-vingts"], [81, "quatre-vingt-un"], [91, "quatre-vingt-onze"], [99, "quatre-vingt-dix-neuf"], [100, "cent"],
    ];
    for (const [n, words] of table) expect(frenchNumber(n)).toBe(words);
    for (let n = 0; n <= 100; n++) {
      expect(wordsToNumber(frenchNumber(n))).toBe(n);
      for (const variant of frenchNumberVariants(n)) expect(wordsToNumber(variant)).toBe(n);
    }
    expect(frenchNumberVariants(21)).toContain("vingt et un");
  });
});

describe("séries de maths du primaire (une série par leçon du cahier de l’école)", () => {
  it("range plusieurs séries par chapitre, numérotées et sans doublon", () => {
    expect(series.length).toBeGreaterThan(0);
    expect(new Set(series.map((s) => s.id)).size).toBe(series.length);
    for (const s of series) {
      expect(s.title).toMatch(/^Série \d+ : /);
      expect(s.questionIds.length).toBeGreaterThanOrEqual(6);
      expect(s.questionIds.length).toBeLessThanOrEqual(12);
    }
  });

  it("recalcule chaque réponse depuis l’énoncé et le correcteur l’accepte", () => {
    for (const s of series) {
      for (const id of s.questionIds) {
        const exp = expected(id);
        expect(exp, `type de question non vérifié : ${id}`).not.toBeNull();
        if (exp!.option) {
          const [good] = key(id).correctOptionIds ?? [];
          expect(optionLabel(id, good!), id).toBe(exp!.value);
        } else if (question(id).type === "short_text" && /^\d+$/.test(exp!.value)) {
          // Nombre à écrire en lettres : toutes les écritures acceptées se relisent en ce nombre.
          for (const text of key(id).acceptedTexts ?? []) expect(wordsToNumber(text), `${id} : ${text}`).toBe(Number(exp!.value));
        } else {
          expect(accepts(id, exp!.value), `${id} : ${exp!.value}`).toBe(true);
        }
      }
    }
  });

  it("accepte les écritures courantes d’un rangement et refuse un mauvais ordre", () => {
    const ranking = series.flatMap((s) => s.questionIds).find((id) => question(id).promptHtml.startsWith("<p>Range"))!;
    const [good] = key(ranking).acceptedTexts!;
    const values = good!.split(" ");
    expect(accepts(ranking, values.join(", "))).toBe(true);
    expect(accepts(ranking, values.join(" ; "))).toBe(true);
    expect(accepts(ranking, [...values].reverse().join(" "))).toBe(false);
  });

  it("respecte les séries « sans retenue » et « avec retenue »", () => {
    const opsOf = (s: (typeof series)[number]) =>
      s.questionIds.map((id) => {
        const html = question(id).promptHtml;
        const m = /Opération posée dans un tableau d et u : (\d+) ([+−]) (\d+)\./.exec(label(html)) ?? /Pose et effectue : <strong>(\d+) ([+−]) (\d+)<\/strong>/.exec(html);
        return m ? { a: Number(m[1]), op: m[2]!, b: Number(m[3]) } : null;
      });
    const carries = ({ a, op, b }: { a: number; op: string; b: number }) => (op === "+" ? (a % 10) + (b % 10) >= 10 : a % 10 < b % 10);
    for (const s of series.filter((x) => x.id.startsWith("cp-") && /sans retenue|avec retenue/.test(x.title))) {
      const withCarry = s.title.includes("avec retenue");
      const found = opsOf(s).filter((op) => op !== null);
      expect(found.length, s.id).toBeGreaterThan(0);
      for (const op of found) expect(carries(op), `${s.id} : ${op.a} ${op.op} ${op.b}`).toBe(withCarry);
    }
  });

  it("garde les nombres de chaque série dans les nombres de la leçon (pas plus de 50)", () => {
    const chapter = CATALOG_CHAPTERS.find((c) => c.levelCode === "CP" && c.title === "Les nombres de 21 à 50")!;
    const own = series.filter((x) => x.chapterId === chapter.id);
    expect(own.length).toBe(11);
    for (const s of own) {
      for (const id of s.questionIds) {
        // Texte de l'énoncé et description du dessin (pas les coordonnées du SVG).
        const html = question(id).promptHtml;
        const numbers = [...`${html.split("<svg")[0]} ${label(html)}`.matchAll(/\d+/g)].map((n) => Number(n[0]));
        for (const n of numbers) expect(n, id).toBeLessThanOrEqual(50);
      }
    }
  });
  it("garde les nombres du CI jusqu’à 20 (énoncés et descriptions des dessins)", () => {
    for (const s of series.filter((x) => x.id.startsWith("ci-"))) {
      for (const id of s.questionIds) {
        const html = question(id).promptHtml;
        const text = html.split("<svg")[0]!.replace(/<[^>]+>/g, " ");
        const numbers = [...`${text} ${label(html)}`.matchAll(/\d+/g)].map((n) => Number(n[0]));
        for (const n of numbers) expect(n, id).toBeLessThanOrEqual(20);
      }
    }
  });
});
