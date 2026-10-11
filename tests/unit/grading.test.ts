import { describe, expect, it } from "vitest";
import { gradeAnswer, normalizeText, parseNumber, toScore20 } from "@/lib/grading";

describe("normalizeText", () => {
  it("ignore la casse, les accents, la ponctuation et les espaces en trop", () => {
    expect(normalizeText("  La RÉCIPROQUE du théorème de Thalès ! ")).toBe("la reciproque du theoreme de thales");
    expect(normalizeText("« thèse   réfutée »")).toBe("these refutee");
  });
});

describe("parseNumber", () => {
  it("accepte la virgule décimale et les unités", () => {
    expect(parseNumber("4,5")).toBe(4.5);
    expect(parseNumber("4,5 cm")).toBe(4.5);
    expect(parseNumber(" 1 200 ")).toBe(1200);
    expect(parseNumber("-3")).toBe(-3);
  });

  it("renvoie null sans nombre", () => {
    expect(parseNumber("six")).toBeNull();
    expect(parseNumber("")).toBeNull();
  });
});

describe("gradeAnswer", () => {
  it("corrige un choix unique", () => {
    const key = { correctOptionIds: ["a"] };
    expect(gradeAnswer("single_choice", key, ["a"], 3)).toEqual({ isCorrect: true, pointsAwarded: 3 });
    expect(gradeAnswer("single_choice", key, ["b"], 3)).toEqual({ isCorrect: false, pointsAwarded: 0 });
    expect(gradeAnswer("true_false", key, null, 3)).toEqual({ isCorrect: false, pointsAwarded: 0 });
  });

  it("donne un crédit partiel aux choix multiples", () => {
    const key = { correctOptionIds: ["a", "c"] };
    expect(gradeAnswer("multiple_choice", key, ["a", "c"], 4)).toEqual({ isCorrect: true, pointsAwarded: 4 });
    expect(gradeAnswer("multiple_choice", key, ["a"], 4)).toEqual({ isCorrect: false, pointsAwarded: 2 });
    // Une mauvaise case annule une bonne case.
    expect(gradeAnswer("multiple_choice", key, ["a", "b"], 4)).toEqual({ isCorrect: false, pointsAwarded: 0 });
    expect(gradeAnswer("multiple_choice", key, ["b", "d"], 4)).toEqual({ isCorrect: false, pointsAwarded: 0 });
  });

  it("corrige une réponse numérique avec tolérance", () => {
    const key = { numericValue: 4.5 };
    expect(gradeAnswer("numeric", key, "4,5", 4).isCorrect).toBe(true);
    expect(gradeAnswer("numeric", key, "4.5 cm", 4).isCorrect).toBe(true);
    expect(gradeAnswer("numeric", key, "4,6", 4).isCorrect).toBe(false);
    expect(gradeAnswer("numeric", key, "", 4).isCorrect).toBe(false);
  });

  it("corrige une réponse courte sans tenir compte des accents", () => {
    const key = { acceptedTexts: ["réciproque du théorème de Thalès", "réciproque"] };
    expect(gradeAnswer("short_text", key, "Reciproque du theoreme de thales", 3).isCorrect).toBe(true);
    expect(gradeAnswer("short_text", key, "la réciproque", 3).isCorrect).toBe(false);
    expect(gradeAnswer("short_text", key, "   ", 3).isCorrect).toBe(false);
  });
});

describe("toScore20", () => {
  it("ramène la note sur 20 au quart de point", () => {
    expect(toScore20(17, 20)).toBe(17);
    expect(toScore20(7, 10)).toBe(14);
    expect(toScore20(2, 3)).toBe(13.25);
    expect(toScore20(0, 0)).toBe(0);
  });
});
