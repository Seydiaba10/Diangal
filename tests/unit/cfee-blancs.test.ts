import { describe, expect, it } from "vitest";
import { gradeAnswer, SELF_CHECK_SUCCESS } from "@/lib/grading";
import { CATALOG_ASSESSMENTS, CATALOG_QUESTIONS } from "@/mocks/assessments";
import { CATALOG_ANSWER_KEYS } from "@/mocks/answer-keys";
import { ASSESSMENTS_CFEE_BLANCS, CFEE_SPECS, QUESTIONS_CFEE_BLANCS } from "@/mocks/cm2/cfee";
import type { ExerciseSpec } from "@/mocks/exercise-series";

// Sujets blancs du CFEE : même forme et même barème que les sujets officiels, corrigés vérifiés par le calcul,
// jamais présentés comme officiels. Les volumes se déduisent des sujets (seul le barème est écrit ici).

/** Épreuve → durée en minutes, total et parties (titre affiché, points), d'après les sujets officiels de 2023 à 2026. */
const BAREME: Record<string, { minutes: number; total: number; parts: Record<string, number> }> = {
  "langue-ressources": { minutes: 45, total: 40, parts: { "Compréhension du texte": 10, "Contrôle des ressources": 30 } },
  "production-ecrits": { minutes: 60, total: 60, parts: { "Contrôle de la compétence": 60 } },
  "maths-ressources": { minutes: 45, total: 40, parts: { "Exercice 1": 8, "Exercice 2": 8, "Exercice 3": 12, "Exercice 4": 8, "Exercice 5": 4 } },
  "maths-competence": { minutes: 60, total: 60, parts: { "Contrôle de la compétence": 60 } },
  "decouverte-monde": {
    minutes: 60,
    total: 40,
    parts: { Histoire: 8, Géographie: 8, "Initiation scientifique et technologique": 8, "Contrôle de la compétence": 16 },
  },
  "developpement-durable": {
    minutes: 60,
    total: 40,
    parts: { "Vivre dans son milieu": 12, "Vivre ensemble": 12, "Contrôle de la compétence": 16 },
  },
  "education-artistique": { minutes: 45, total: 10, parts: { "Contrôle de la compétence": 10 } },
  "facultative-arabe": { minutes: 60, total: 10, parts: { "Épreuve optionnelle d’arabe": 10 } },
  "facultative-francais": { minutes: 60, total: 10, parts: { "Épreuve facultative": 10 } },
};

/** Grilles des guides de correction de la DEXCO : critère → points. */
const GRILLES: Record<string, Record<string, number>> = {
  "production-ecrits": { Pertinence: 35, Cohérence: 12, "Correction de la langue": 8, Présentation: 5 },
  "education-artistique": { Conformité: 5, Soin: 3, Harmonie: 2 },
};

const epreuve = (id: string) => /^cfee-blanc-\d-\d-(.+)$/.exec(id)![1]!;
const pointsOf = (q: ExerciseSpec) => q.pts ?? 2;
const specs = CFEE_SPECS.flatMap((spec) => spec.parts.flatMap((part) => part.questions));

/** Dernier titre « Partie (n points) » d'un énoncé commun. */
function partHeader(stem: string | undefined): [string, number] | null {
  const found = [...(stem ?? "").matchAll(/<strong>([^<]+?) \((\d+)\spoints\)<\/strong>/g)].at(-1);
  return found ? [found[1]!.replace(/\s+/g, " "), Number(found[2])] : null;
}

const NUMBER = String.raw`\d{1,3}(?:\s\d{3})+(?:,\d+)?|\d+(?:,\d+)?`;
const CALCULATION = new RegExp(String.raw`(?<![\d,/])(${NUMBER})((?:\s*[+−×÷]\s*(?:${NUMBER}))+)\s*=\s*(${NUMBER})(?![\d/,])`, "g");
const toNumber = (text: string) => Number(text.replace(/\s/g, "").replace(",", "."));

/** Valeur d'un calcul écrit en français : × et ÷ d'abord, de gauche à droite. */
function evaluate(expression: string): number {
  const tokens = expression.split(/\s*([+−×÷])\s*/);
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

const stripTags = (html: string) => html.replace(/<[^>]+>/g, " ");

describe("sujets blancs du CFEE", () => {
  it("chaque épreuve du guide a plusieurs sujets, avec sa durée et son barème", () => {
    for (const key of Object.keys(BAREME)) {
      expect(CFEE_SPECS.filter((s) => epreuve(s.id) === key).length, key).toBeGreaterThanOrEqual(2);
    }
    for (const spec of CFEE_SPECS) {
      const rule = BAREME[epreuve(spec.id)];
      expect(rule, spec.id).toBeDefined();
      expect(spec.durationMin, spec.id).toBe(rule!.minutes);
      const questions = spec.parts.flatMap((p) => p.questions);
      expect(questions.reduce((sum, q) => sum + pointsOf(q), 0), `${spec.id} : total`).toBe(rule!.total);
      // Points de chaque partie, comptés d'après l'en-tête affiché à l'élève.
      const sums: Record<string, number> = {};
      for (const part of spec.parts) {
        const header = partHeader(part.stem);
        expect(header, `${spec.id} : en-tête`).not.toBeNull();
        expect(rule!.parts[header![0]], `${spec.id} : ${header![0]}`).toBe(header![1]);
        sums[header![0]] = (sums[header![0]] ?? 0) + part.questions.reduce((sum, q) => sum + pointsOf(q), 0);
      }
      expect(sums, `${spec.id} : parties`).toEqual(rule!.parts);
    }
  });

  it("la production d'écrits et l'éducation artistique suivent les grilles des guides de correction", () => {
    for (const [key, grille] of Object.entries(GRILLES)) {
      for (const spec of CFEE_SPECS.filter((s) => epreuve(s.id) === key)) {
        const sums: Record<string, number> = {};
        for (const q of spec.parts.flatMap((p) => p.questions)) {
          const prompt = "self" in q ? q.self : "";
          const criterion = Object.keys(grille).find((name) => prompt.includes(`${name} (`));
          expect(criterion, `${spec.id} : ${prompt}`).toBeDefined();
          // Les points annoncés dans la question sont bien ceux que la correction accorde.
          expect(prompt.replace(/\s/g, " "), spec.id).toContain(`${criterion} (${pointsOf(q)} point`);
          sums[criterion!] = (sums[criterion!] ?? 0) + pointsOf(q);
        }
        expect(sums, spec.id).toEqual(grille);
      }
    }
  });

  it("les maths suivent la forme officielle : un seul problème en 6 étapes, 5 exercices aux ressources", () => {
    for (const spec of CFEE_SPECS) {
      const questions = spec.parts.flatMap((p) => p.questions);
      if (epreuve(spec.id) === "maths-competence") {
        expect(questions.map(pointsOf), spec.id).toEqual([10, 10, 10, 10, 10, 10]);
        expect(new Set(spec.parts.map((p) => p.stem)).size, spec.id).toBe(1);
      }
      if (epreuve(spec.id) === "maths-ressources") {
        // Une construction à la main (5 points) et sa définition (3 points), comme aux sujets de 2023 à 2026.
        const construction = questions.filter((q) => "self" in q);
        expect(construction.map(pointsOf), spec.id).toEqual([5]);
      }
    }
  });

  it("la production d'écrits demande 6 ou 8 phrases, et le modèle du corrigé en a assez", () => {
    for (const spec of CFEE_SPECS.filter((s) => epreuve(s.id) === "production-ecrits")) {
      const stem = spec.parts[0]!.stem ?? "";
      const asked = /six\sphrases/.test(stem) ? 6 : /huit\sphrases/.test(stem) ? 8 : 0;
      expect(asked, spec.id).toBeGreaterThan(0);
      const model = /class="model-text">([\s\S]+?)<\/div>/.exec(spec.parts[0]!.questions[0]!.why)![1]!;
      const sentences = stripTags(model).split(/[.!?…]+(?:\s|$)/).filter((t) => t.trim().length > 12);
      expect(sentences.length, spec.id).toBeGreaterThanOrEqual(asked);
    }
  });

  it("les sujets sont présentés comme des sujets DIANGAL, jamais comme officiels", () => {
    for (const a of ASSESSMENTS_CFEE_BLANCS) {
      expect(a.kind).toBe("mock_exam");
      expect(a.examType).toBe("CFEE");
      expect(a.levelCode).toBe("CM2");
      expect(a.title).toContain("CFEE blanc DIANGAL");
      expect(a.verification ?? "unverified").toBe("unverified");
      expect(a.sources?.[0]?.kind).toBe("diangal");
      expect(a.correctionSource).toContain("rédigé par DIANGAL");
      expect(a.isPremium).toBe(false);
    }
    const text = JSON.stringify(QUESTIONS_CFEE_BLANCS);
    expect(text).not.toMatch(/PAAME/i);
  });

  it("les réponses à choisir sont justes dans leur forme : une seule bonne, pas de doublon", () => {
    for (const q of specs) {
      if (!("qcm" in q)) continue;
      expect(q.choices.filter((c) => c.startsWith("*")), q.qcm).toHaveLength(1);
      expect(new Set(q.choices.map((c) => c.replace(/^\*/, ""))).size, q.qcm).toBe(q.choices.length);
      expect(q.choices.length, q.qcm).toBeGreaterThanOrEqual(2);
    }
  });

  it("chaque question a une correction, et une question ne se répète pas dans un sujet", () => {
    for (const spec of CFEE_SPECS) {
      const prompts = spec.parts.flatMap((p) => p.questions).map((q) => ("qcm" in q ? q.qcm : "vf" in q ? q.vf : "num" in q ? q.num : "self" in q ? q.self : q.text));
      expect(new Set(prompts).size, spec.id).toBe(prompts.length);
    }
    for (const q of specs) expect(q.why.length, JSON.stringify(q)).toBeGreaterThan(10);
  });

  it("les calculs écrits dans les corrigés sont justes", () => {
    let checked = 0;
    for (const q of specs) {
      for (const [, first, rest, result] of stripTags(q.why).matchAll(CALCULATION)) {
        const value = evaluate(`${first}${rest}`);
        expect(value, `${first}${rest} = ${result}`).toBeCloseTo(toNumber(result!), 6);
        checked += 1;
      }
    }
    expect(checked).toBeGreaterThan(40);
  });

  it("le résultat attendu d'une question à nombre figure dans sa correction", () => {
    for (const q of specs) {
      if (!("num" in q)) continue;
      const corrected = stripTags(q.why).replace(/(?<=\d)\s(?=\d{3})/g, "");
      expect(corrected, q.num).toContain(String(q.answer).replace(".", ","));
    }
  });

  it("une copie parfaite obtient tous les points, une copie vide aucun", () => {
    for (const a of ASSESSMENTS_CFEE_BLANCS) {
      let perfect = 0;
      let empty = 0;
      let max = 0;
      for (const id of a.questionIds) {
        const question = CATALOG_QUESTIONS[id]!;
        const key = CATALOG_ANSWER_KEYS[id]!;
        const response =
          question.type === "self_check"
            ? SELF_CHECK_SUCCESS
            : question.type === "numeric"
              ? String(key.numericValue).replace(".", ",")
              : key.correctOptionIds;
        perfect += gradeAnswer(question.type, key, response, question.points).pointsAwarded;
        empty += gradeAnswer(question.type, key, null, question.points).pointsAwarded;
        max += question.points;
      }
      expect(perfect, a.id).toBe(max);
      expect(empty, a.id).toBe(0);
    }
  });

  it("les sujets du CFEE sont rangés sous le CFEE, ceux du BFEM ne bougent pas", () => {
    const mock = CATALOG_ASSESSMENTS.filter((a) => a.kind === "mock_exam");
    const cfee = mock.filter((a) => a.examType === "CFEE").map((a) => a.id);
    expect(cfee.sort()).toEqual(ASSESSMENTS_CFEE_BLANCS.map((a) => a.id).sort());
    const bfem = mock.filter((a) => a.examType === "BFEM");
    expect(bfem.length).toBeGreaterThan(0);
    expect(bfem.every((a) => !a.id.startsWith("cfee-") && a.levelCode === "3E")).toBe(true);
  });
});
