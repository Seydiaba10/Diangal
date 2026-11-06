import { describe, expect, it } from "vitest";
import { gradeAnswer, SELF_CHECK_SUCCESS } from "@/lib/grading";
import { CATALOG_ASSESSMENTS, CATALOG_QUESTIONS } from "@/mocks/assessments";
import { CATALOG_ANSWER_KEYS } from "@/mocks/answer-keys";
import { CATALOG_CHAPTERS } from "@/mocks/curriculum";
import type { ExerciseSpec } from "@/mocks/exercise-series";
import { ASSESSMENTS_BAC_BLANCS, BAC_SPECS, QUESTION_CHAPTERS_BAC_BLANCS } from "@/mocks/tle/bac-blancs";
import { RESUME_MODEL, RESUME_TEXT, RESUME_WORDS } from "@/mocks/tle/bac-blancs/francais";

// Sujets blancs du Bac : forme, durée et barème des épreuves de l'Office du Bac, résultats recalculés ici,
// jamais présentés comme officiels. Les volumes se déduisent des sujets (seul le barème est écrit ici).

/** Sujet → durée en minutes et parties (début du titre affiché, points), d'après les sujets de 2023 à 2026. */
const BAREME: Record<string, { minutes: number; parts: [string, number][] }> = {
  "bac-blanc-1-maths-s": { minutes: 240, parts: [["Exercice 1", 4], ["Exercice 2", 6], ["Problème", 10]] },
  "bac-blanc-1-physique-s": {
    minutes: 240,
    parts: [["Exercice 1", 4], ["Exercice 2", 4], ["Exercice 3", 4], ["Exercice 4", 4], ["Exercice 5", 4]],
  },
  "bac-blanc-1-svt-s": {
    minutes: 240,
    parts: [
      ["I. Maîtrise des connaissances", 5],
      ["II. Compétences méthodologiques : exercice 1", 6],
      ["II. Compétences méthodologiques : exercice 2", 7],
      ["III. Communication", 2],
    ],
  },
  "bac-blanc-1-philosophie-s": { minutes: 240, parts: [["Traite l’un des trois sujets", 20]] },
  "bac-blanc-1-philosophie-l": { minutes: 240, parts: [["Traite l’un des trois sujets", 20]] },
  "bac-blanc-1-francais-resume": { minutes: 240, parts: [["I. Résumé", 10], ["II. Discussion", 10]] },
  "bac-blanc-1-francais-commentaire": { minutes: 240, parts: [["Commentaire", 20]] },
  "bac-blanc-1-francais-dissertation": { minutes: 240, parts: [["Dissertation", 20]] },
  "bac-blanc-1-histoire-geo": { minutes: 240, parts: [["A. Histoire", 10], ["B. Géographie", 10]] },
  "bac-blanc-1-anglais-l": {
    minutes: 180,
    parts: [["I. Reading comprehension", 8], ["II. Language", 6], ["III. Writing", 6]],
  },
  "bac-blanc-1-maths-l": { minutes: 180, parts: [["Exercice 1", 5], ["Exercice 2", 5], ["Problème", 10]] },
};

/** Épreuves que passe chaque série (et pour lesquelles un sujet blanc existe). */
const SUBJECTS_BY_SERIES: Record<string, string[]> = {
  S1: ["FR", "HG", "PHILO"],
  S2: ["FR", "HG", "MATH", "PC", "PHILO", "SVT"],
  S3: ["FR", "PHILO"],
  S4: ["FR", "HG", "MATH", "PC", "PHILO", "SVT"],
  S5: ["FR", "HG", "MATH", "PC", "PHILO", "SVT"],
  L1: ["ANG", "FR", "HG", "MATH", "PHILO"],
  L2: ["ANG", "FR", "HG", "MATH", "PHILO"],
  LA: ["FR", "HG", "MATH", "PHILO"],
};

const pointsOf = (q: ExerciseSpec) => q.pts ?? 2;
const promptOf = (q: ExerciseSpec) => ("qcm" in q ? q.qcm : "vf" in q ? q.vf : "num" in q ? q.num : "self" in q ? q.self : q.text);
const questions = BAC_SPECS.flatMap((spec) => spec.parts.flatMap((part) => part.questions));
const spaces = (text: string) => text.replace(/\s+/g, " ");
const decimal = (n: number) => String(n).replace(".", ",");
const stripTags = (html: string) => html.replace(/<[^>]+>/g, " ");

/** Titre et points de l'en-tête « Partie (n points) » d'un énoncé commun. */
function partHeader(stem: string | undefined): [string, number] | null {
  const found = /<strong>([^<]+?) \((\d+)\spoints\)<\/strong>/.exec(stem ?? "");
  return found ? [spaces(found[1]!), Number(found[2])] : null;
}

/** Réponse d'une question d'un sujet, repérée par le début de son énoncé. */
function answerOf(specId: string, start: string): number | boolean {
  const spec = BAC_SPECS.find((s) => s.id === specId)!;
  const q = spec.parts.flatMap((p) => p.questions).find((item) => promptOf(item).startsWith(start));
  if (!q || !("answer" in q) || typeof q.answer === "string") throw new Error(`${specId} : ${start}`);
  return q.answer;
}

/** Bonne réponse d'un QCM, sans l'astérisque. */
function choiceOf(specId: string, start: string): string {
  const spec = BAC_SPECS.find((s) => s.id === specId)!;
  const q = spec.parts.flatMap((p) => p.questions).find((item) => promptOf(item).startsWith(start));
  if (!q || !("qcm" in q)) throw new Error(`${specId} : ${start}`);
  return q.choices.find((c) => c.startsWith("*"))!.slice(1);
}

/** La réponse attendue est la valeur exacte arrondie au pas indiqué (0,01 : au centième). */
function expectRounded(specId: string, start: string, exact: number, step = 0.01) {
  const answer = answerOf(specId, start) as number;
  expect(Math.abs(answer - exact), `${specId} : ${start} (${answer} pour ${exact})`).toBeLessThanOrEqual(step / 2 + 1e-9);
}

const comb = (n: number, k: number): number => (k === 0 ? 1 : (comb(n - 1, k - 1) * n) / k);

/** Intégrale approchée (méthode de Simpson), pour vérifier les aires. */
function integrate(f: (x: number) => number, a: number, b: number, n = 1000): number {
  const h = (b - a) / n;
  let sum = f(a) + f(b);
  for (let i = 1; i < n; i += 1) sum += f(a + i * h) * (i % 2 ? 4 : 2);
  return (sum * h) / 3;
}

const NUMBER = String.raw`\d{1,3}(?:\s\d{3})+(?:,\d+)?|\d+(?:,\d+)?`;
const EXPRESSION = String.raw`(?:${NUMBER})(?:\s*[+−×÷]\s*(?:${NUMBER}))*`;
/**
 * Calcul écrit en français : une expression avec au moins une opération, « = », puis une expression (lue sans la
 * consommer, pour vérifier aussi les égalités en chaîne « a = b = c »). Une expression collée à une autre écriture
 * (fraction, exposant, parenthèse, unité) n'est pas lue.
 */
const CALCULATION = new RegExp(
  String.raw`(?<![\d,/)²³⁻]\s*|[+−×÷]\s*)((?:${NUMBER})(?:\s*[+−×÷]\s*(?:${NUMBER}))+)\s*=\s*(?=(−?${EXPRESSION})(?![\d/,(²³⁻]|\s*[+−×÷/]))`,
  "g",
);
const toNumber = (text: string) => Number(text.replace(/\s/g, "").replace(",", ".").replace("−", "-"));

/** Valeur d'un calcul écrit en français : × et ÷ d'abord, de gauche à droite. */
function evaluate(expression: string): number {
  const tokens = expression.trim().replace(/^−/, "0 − ").split(/\s*([+−×÷])\s*/);
  const values: number[] = [toNumber(tokens[0]!)];
  const signs: string[] = [];
  for (let i = 1; i < tokens.length; i += 2) {
    const [op, value] = [tokens[i]!, toNumber(tokens[i + 1]!)];
    if (op === "×") values[values.length - 1]! *= value;
    else if (op === "÷") values[values.length - 1]! /= value;
    else {
      signs.push(op);
      values.push(value);
    }
  }
  return values.reduce((sum, value, i) => (i === 0 ? value : signs[i - 1] === "+" ? sum + value : sum - value), 0);
}

/** Mots comptés comme au Bac : séparés par une espace ou une apostrophe. */
const countWords = (text: string) => stripTags(text).split(/[\s’']+/).filter((word) => /[\p{L}\d]/u.test(word)).length;

describe("sujets blancs du Bac", () => {
  it("chaque sujet a la durée, le total et les parties de l'épreuve officielle", () => {
    expect(new Set(BAC_SPECS.map((s) => s.id))).toEqual(new Set(Object.keys(BAREME)));
    for (const spec of BAC_SPECS) {
      const rule = BAREME[spec.id]!;
      expect(spec.durationMin, spec.id).toBe(rule.minutes);
      const sums: [string, number, number][] = [];
      for (const part of spec.parts) {
        // Une partie sans en-tête (Partie B d'un problème) compte avec la précédente.
        const header = partHeader(part.stem);
        const points = part.questions.reduce((sum, q) => sum + pointsOf(q), 0);
        if (header) sums.push([header[0], header[1], points]);
        else sums.at(-1)![2] += points;
      }
      expect(sums.length, spec.id).toBe(rule.parts.length);
      sums.forEach(([title, announced, counted], i) => {
        const [expectedTitle, expectedPoints] = rule.parts[i]!;
        expect(title.startsWith(spaces(expectedTitle)), `${spec.id} : ${title}`).toBe(true);
        expect(announced, `${spec.id} : ${title}`).toBe(expectedPoints);
        expect(counted, `${spec.id} : ${title}`).toBeCloseTo(expectedPoints, 9);
      });
      expect(spec.parts.flatMap((p) => p.questions).reduce((sum, q) => sum + pointsOf(q), 0), spec.id).toBeCloseTo(20, 9);
    }
  });

  it("chaque série reçoit les sujets de ses épreuves, rattachés à ses propres chapitres", () => {
    const seen: Record<string, Set<string>> = {};
    const chapters = new Map(CATALOG_CHAPTERS.map((c) => [c.id, c]));
    for (const a of ASSESSMENTS_BAC_BLANCS) {
      expect(a.seriesCode, a.id).toBeTruthy();
      expect(a.id.endsWith(`-${a.seriesCode!.toLowerCase()}`), a.id).toBe(true);
      (seen[a.seriesCode!] ??= new Set()).add(a.subjectCode);
      for (const id of a.questionIds) {
        const chapterId = QUESTION_CHAPTERS_BAC_BLANCS[id];
        // Seuls les points de communication de SVT ne portent sur aucun chapitre.
        if (!chapterId) {
          expect(a.subjectCode, id).toBe("SVT");
          continue;
        }
        const chapter = chapters.get(chapterId)!;
        expect(chapter.levelCode, id).toBe("TLE");
        expect(chapter.seriesCode, id).toBe(a.seriesCode);
        expect(chapter.subjectCode, id).toBe(a.subjectCode);
      }
    }
    expect(Object.fromEntries(Object.entries(seen).map(([k, v]) => [k, [...v].sort()]))).toEqual(SUBJECTS_BY_SERIES);
  });

  it("les sujets sont présentés comme des sujets DIANGAL, jamais comme officiels", () => {
    for (const a of ASSESSMENTS_BAC_BLANCS) {
      expect(a.kind).toBe("mock_exam");
      expect(a.examType).toBe("BAC");
      expect(a.levelCode).toBe("TLE");
      expect(a.title).toContain("Bac blanc DIANGAL");
      expect(a.title).toContain(`(${a.seriesCode})`);
      expect(a.verification ?? "unverified").toBe("unverified");
      expect(a.sources?.[0]?.kind).toBe("diangal");
      expect(a.correctionSource).toContain("rédigé par DIANGAL");
      expect(a.isPremium).toBe(false);
    }
    const bac = CATALOG_ASSESSMENTS.filter((a) => a.kind === "mock_exam" && a.examType === "BAC").map((a) => a.id);
    expect(bac.sort()).toEqual(ASSESSMENTS_BAC_BLANCS.map((a) => a.id).sort());
  });

  it("les réponses à choisir sont justes dans leur forme : une seule bonne, pas de doublon", () => {
    for (const q of questions) {
      if (!("qcm" in q)) continue;
      expect(q.choices.filter((c) => c.startsWith("*")), q.qcm).toHaveLength(1);
      expect(new Set(q.choices.map((c) => c.replace(/^\*/, ""))).size, q.qcm).toBe(q.choices.length);
    }
  });

  it("chaque question a une correction ; un travail à s'évaluer annonce ses points", () => {
    for (const spec of BAC_SPECS) {
      const prompts = spec.parts.flatMap((p) => p.questions).map(promptOf);
      expect(new Set(prompts).size, spec.id).toBe(prompts.length);
    }
    for (const q of questions) {
      expect(q.why.length, promptOf(q)).toBeGreaterThan(10);
      if ("self" in q) expect(spaces(q.self), q.self).toContain(`(${decimal(pointsOf(q))} point`);
    }
  });

  it("les calculs écrits dans les corrigés sont justes", () => {
    let checked = 0;
    for (const q of questions) {
      for (const [, left, right] of spaces(stripTags(q.why)).matchAll(CALCULATION)) {
        expect(evaluate(left!), `${left} = ${right}`).toBeCloseTo(evaluate(right!), 6);
        checked += 1;
      }
    }
    expect(checked).toBeGreaterThan(20);
  });

  it("le résultat attendu d'une question à nombre figure dans sa correction", () => {
    for (const q of questions) {
      if (!("num" in q)) continue;
      const corrected = stripTags(q.why).replace(/(?<=\d)\s(?=\d{3})/g, "").replace(/−/g, "-");
      expect(corrected, q.num).toContain(decimal(q.answer));
    }
  });

  it("mathématiques S : résultats recalculés", () => {
    const id = "bac-blanc-1-maths-s";
    // P(i) = i³ − (2 + i)i² + (5 + 2i)i − 5i, calculé avec des nombres complexes.
    type C = [number, number];
    const mul = (a: C, b: C): C => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
    const add = (...zs: C[]): C => zs.reduce((s, z) => [s[0] + z[0], s[1] + z[1]], [0, 0] as C);
    const P = (z: C): C => add(mul(z, mul(z, z)), mul([-2, -1], mul(z, z)), mul([5, 2], z), [0, -5]);
    expect(answerOf(id, "1. a.")).toBe(P([0, 1]).every((v) => Math.abs(v) < 1e-12));
    for (const root of [[1, 2], [1, -2]] as C[]) expect(P(root).every((v) => Math.abs(v) < 1e-12)).toBe(true);
    expect(choiceOf(id, "1. b.")).toBe("{i ; 1 + 2i ; 1 − 2i}");
    expect(answerOf(id, "3. b.")).toBe(mul([0, 1], [1, 2])[0]);

    // Kermesse : 5 jetons verts (1 à 5), 3 jaunes (1 à 3), deux tirés ensemble.
    const tokens = [...[1, 2, 3, 4, 5].map((n) => ["V", n] as const), ...[1, 2, 3].map((n) => ["J", n] as const)];
    const gains: number[] = [];
    tokens.forEach((a, i) =>
      tokens.slice(i + 1).forEach((b) => gains.push(a[0] !== b[0] ? 0 : a[0] === "V" ? a[1] + b[1] : Math.abs(a[1] - b[1]))),
    );
    expect(gains).toHaveLength(comb(8, 2));
    const same = (comb(5, 2) + comb(3, 2)) / comb(8, 2);
    expectRounded(id, "1. Calcule la probabilité", same);
    expect(answerOf(id, "2. Combien")).toBe(new Set(gains).size);
    expectRounded(id, "3. Calcule P(X = 7)", gains.filter((g) => g === 7).length / gains.length);
    expectRounded(id, "4. Calcule l’espérance", gains.reduce((s, g) => s + g, 0) / gains.length);
    expectRounded(id, "5. Le joueur", 1 - (1 - same) ** 3);

    // f(x) = e²ˣ − eˣ ; repère d'unité 2 cm : une unité d'aire vaut 4 cm².
    const f = (x: number) => Math.exp(2 * x) - Math.exp(x);
    expectRounded(id, "3. f admet", -Math.log(2));
    expectRounded(id, "4. Calcule la valeur exacte", f(-Math.log(2)));
    expectRounded(id, "1. Calcule, en cm²", integrate(f, 0, Math.log(2)) * 4);
    expectRounded(id, "2. Montre", integrate((x) => Math.exp(3 * x), 0, Math.log(2)));
  });

  it("sciences physiques S : résultats recalculés", () => {
    const id = "bac-blanc-1-physique-s";
    const M = 5 * 12 + 10 * 1 + 2 * 16;
    expect(answerOf(id, "4. Calcule la masse molaire")).toBe(M);
    expectRounded(id, "5. On recueille", (100 * (34 / M)) / 0.5, 1);

    const h3o = 10 ** -2.9;
    expectRounded(id, "1. Calcule la concentration", h3o * 1000);
    expectRounded(id, "3. Calcule le coefficient", (100 * h3o) / 1e-2, 1);
    expectRounded(id, "4. Calcule le pKa", -Math.log10((h3o * h3o) / (1e-2 - h3o)));
    expectRounded(id, "5. On dose", (1e-2 * 20) / 1e-2);

    const [v0, alpha, g] = [15, Math.PI / 6, 10];
    expect(choiceOf(id, "2. L’équation de la trajectoire")).toContain(String(g / (2 * v0 ** 2 * Math.cos(alpha) ** 2)).slice(0, 6).replace(".", ","));
    expect(choiceOf(id, "2. L’équation de la trajectoire")).toContain(decimal(Number(Math.tan(alpha).toFixed(3))));
    expectRounded(id, "3. Calcule la hauteur", (v0 * Math.sin(alpha)) ** 2 / (2 * g));
    expectRounded(id, "4. Calcule la distance", (v0 ** 2 * Math.sin(2 * alpha)) / g);
    expectRounded(id, "5. Calcule la durée", (2 * v0 * Math.sin(alpha)) / g);

    const [R, Cap, E] = [1000, 100e-6, 12];
    expectRounded(id, "2. Calcule la constante", R * Cap);
    expectRounded(id, "3. Calcule la tension", E * (1 - Math.exp(-1)));
    expectRounded(id, "4. On considère", 5 * R * Cap);
    expectRounded(id, "5. Calcule l’énergie", 0.5 * Cap * E ** 2 * 1000);

    const [hPlanck, c, eV, W0] = [6.63e-34, 3e8, 1.6e-19, 1.9];
    const photon = (hPlanck * c) / 450e-9 / eV;
    expectRounded(id, "1. Calcule l’énergie d’un photon", photon);
    expectRounded(id, "2. Calcule l’énergie cinétique", photon - W0);
    const threshold = ((hPlanck * c) / (W0 * eV)) * 1e9;
    expectRounded(id, "3. Calcule la longueur d’onde seuil", threshold, 1);
    expect(answerOf(id, "4. Une lumière rouge")).toBe(700 < threshold);
  });

  it("SVT et mathématiques L : résultats recalculés", () => {
    const svt = "bac-blanc-1-svt-s";
    expect(answerOf(svt, "1. Calcule l’amplitude")).toBe(30 - -70);
    expectRounded(svt, "4. Calcule la vitesse", 0.04 / 0.002);
    expect(answerOf(svt, "4. Calcule le pourcentage")).toBe(9 + 9);
    expect(answerOf(svt, "5. Sur 1")).toBe((1000 * 9) / 100);

    const id = "bac-blanc-1-maths-l";
    const draws = comb(10, 3);
    expect(answerOf(id, "1. Combien")).toBe(draws);
    expectRounded(id, "2. Calcule la probabilité de l’événement A", comb(6, 3) / draws);
    expectRounded(id, "3. Calcule la probabilité de l’événement B", (comb(4, 1) * comb(6, 2)) / draws);
    expectRounded(id, "4. Calcule la probabilité de l’événement C", 1 - comb(6, 3) / draws);
    const law = [0, 1, 2, 3].map((k) => (comb(4, k) * comb(6, 3 - k)) / draws);
    expect(law.reduce((s, p) => s + p, 0)).toBeCloseTo(1, 12);
    expectRounded(id, "5. Soit X", law.reduce((s, p, k) => s + k * p, 0));

    const x = [1, 2, 3, 4, 5];
    const y = [3, 5, 6, 8, 9];
    const mean = (v: number[]) => v.reduce((s, t) => s + t, 0) / v.length;
    const cov = mean(x.map((t, i) => t * y[i]!)) - mean(x) * mean(y);
    const vx = mean(x.map((t) => t * t)) - mean(x) ** 2;
    const vy = mean(y.map((t) => t * t)) - mean(y) ** 2;
    const [a, b] = [cov / vx, mean(y) - (cov / vx) * mean(x)];
    expectRounded(id, "1. Calcule la moyenne", mean(y));
    expectRounded(id, "2. Calcule la covariance", cov);
    expectRounded(id, "3. La variance", a);
    expectRounded(id, "4. Calcule le coefficient b", b);
    expect(answerOf(id, "5. Le coefficient")).toBe(Math.abs(cov / Math.sqrt(vx * vy) - 0.99) < 0.005);
    expectRounded(id, "6. Si la tendance", a * 8 + b);

    const f = (t: number) => t + 1 - 2 * Math.log(t);
    expectRounded(id, "2. c.", f(2));
    expect(answerOf(id, "2. d.")).toBe(f(2) > 0);
    expect(answerOf(id, "3. a.")).toBe(f(1));
    expectRounded(id, "5. b.", integrate(f, 1, Math.E));
  });

  it("français : le texte, le résumé demandé et le résumé modèle ont la bonne longueur", () => {
    const words = countWords(RESUME_TEXT.join(" "));
    expect(Math.round(words / 4 / 10) * 10).toBe(RESUME_WORDS);
    const model = countWords(RESUME_MODEL.join(" "));
    expect(model).toBeGreaterThanOrEqual(RESUME_WORDS * 0.9);
    expect(model).toBeLessThanOrEqual(RESUME_WORDS * 1.1);
  });

  it("anglais : la rédaction modèle compte environ 200 mots", () => {
    const writing = BAC_SPECS.find((s) => s.id === "bac-blanc-1-anglais-l")!.parts.at(-1)!.questions[0]!;
    const essay = /class="model-text">([\s\S]+?)<\/div>/.exec(writing.why)![1]!;
    const words = stripTags(essay).split(/\s+/).filter((w) => /\p{L}/u.test(w)).length;
    expect(words).toBeGreaterThanOrEqual(180);
    expect(words).toBeLessThanOrEqual(220);
  });

  it("une copie parfaite obtient 20/20, une copie vide 0", () => {
    for (const a of ASSESSMENTS_BAC_BLANCS) {
      let perfect = 0;
      let empty = 0;
      for (const id of a.questionIds) {
        const question = CATALOG_QUESTIONS[id]!;
        const key = CATALOG_ANSWER_KEYS[id]!;
        const response =
          question.type === "self_check"
            ? SELF_CHECK_SUCCESS
            : question.type === "numeric"
              ? decimal(key.numericValue!)
              : key.correctOptionIds;
        perfect += gradeAnswer(question.type, key, response, question.points).pointsAwarded;
        empty += gradeAnswer(question.type, key, null, question.points).pointsAwarded;
      }
      expect(perfect, a.id).toBeCloseTo(20, 9);
      expect(empty, a.id).toBe(0);
    }
  });
});
