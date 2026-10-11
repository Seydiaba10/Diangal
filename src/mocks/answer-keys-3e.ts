import "server-only";

// Corrigés fictifs : équivalent de la table private.answer_keys, jamais envoyée au navigateur.

import type { AnswerKey } from "@/lib/grading";

export interface MockAnswerKey extends AnswerKey {
  /** Réponse affichée dans la correction d'une question à saisir. */
  expectedAnswer?: string;
}

export const ANSWER_KEYS: Record<string, MockAnswerKey> = {
  "thales-q1": { correctOptionIds: ["thales-q1-a"] },
  "thales-q2": { numericValue: 6, expectedAnswer: "6 cm" },
  "thales-q3": { numericValue: 4.5, expectedAnswer: "4,5 cm" },
  "thales-q4": { correctOptionIds: ["thales-q4-vrai"] },
  "thales-q5": { correctOptionIds: ["thales-q5-a", "thales-q5-c"] },
  "thales-q6": {
    acceptedTexts: [
      "réciproque du théorème de Thalès",
      "la réciproque du théorème de Thalès",
      "réciproque de Thalès",
      "la réciproque de Thalès",
      "réciproque",
    ],
    expectedAnswer: "La réciproque du théorème de Thalès",
  },
  "thales-e1": { numericValue: 12, expectedAnswer: "12" },
  "thales-e2": { correctOptionIds: ["thales-e2-a"] },
  "thales-e3": { correctOptionIds: ["thales-e3-vrai"] },
  "thales-e4": { numericValue: 7.5, expectedAnswer: "7,5" },
  "trigo-q1": { correctOptionIds: ["trigo-q1-a"] },
  "trigo-q2": { numericValue: 1, expectedAnswer: "1" },
  "trigo-q3": { correctOptionIds: ["trigo-q3-a"] },
  "elec-q1": { correctOptionIds: ["elec-q1-a"] },
  "elec-q2": { numericValue: 20, expectedAnswer: "20 mL" },
  "elec-q3": { correctOptionIds: ["elec-q3-vrai"] },
  "arg-q1": { correctOptionIds: ["arg-q1-a"] },
  "arg-q2": { correctOptionIds: ["arg-q2-a", "arg-q2-b", "arg-q2-e"] },
  "arg-q3": { correctOptionIds: ["arg-q3-vrai"] },
  "arg-q4": { correctOptionIds: ["arg-q4-a"] },
  "arg-q5": {
    acceptedTexts: ["thèse réfutée", "la thèse réfutée", "thèse adverse", "la thèse adverse"],
    expectedAnswer: "La thèse réfutée (ou thèse adverse)",
  },
  "imm-q1": { correctOptionIds: ["imm-q1-a"] },
  "imm-q2": { correctOptionIds: ["imm-q2-vrai"] },
  "imm-q3": { correctOptionIds: ["imm-q3-a"] },
  "imm-q4": { correctOptionIds: ["imm-q4-a", "imm-q4-b"] },
  "past-q1": { correctOptionIds: ["past-q1-a"] },
  "past-q2": { acceptedTexts: ["ate"], expectedAnswer: "ate" },
  "past-q3": { correctOptionIds: ["past-q3-a"] },
  "past-q4": { correctOptionIds: ["past-q4-faux"] },
  "past-q5": { acceptedTexts: ["bought"], expectedAnswer: "bought" },
};
