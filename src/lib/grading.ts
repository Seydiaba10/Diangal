// Correction automatique. Mêmes règles que la future fonction SQL submit_attempt :
// minuscules, sans accents ni ponctuation, virgule décimale acceptée (« 4,5 » = 4.5).
// Fonctions pures : utilisées côté serveur et, plus tard, pour l'entraînement hors ligne.

import type { AnswerValue, QuestionType } from "@/types/domain";

export interface AnswerKey {
  correctOptionIds?: string[];
  acceptedTexts?: string[];
  numericValue?: number;
  tolerance?: number;
}

export function normalizeText(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    // Ligatures, comme unaccent côté Postgres : « cœur » = « coeur ».
    .replace(/œ/g, "oe")
    .replace(/æ/g, "ae")
    .replace(/[«»"“”'’.,;:!?()]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** « 4,5 cm » → 4.5 ; « 1 200 » → 1200 ; texte sans nombre → null. */
export function parseNumber(value: string): number | null {
  const match = /-?\d+(?:\.\d+)?/.exec(value.replace(/\s/g, "").replace(",", "."));
  return match ? Number(match[0]) : null;
}

export interface GradeOutcome {
  isCorrect: boolean;
  pointsAwarded: number;
}

function asList(response: AnswerValue | null | undefined): string[] {
  if (Array.isArray(response)) return response;
  return response ? [response] : [];
}

function asText(response: AnswerValue | null | undefined): string {
  return Array.isArray(response) ? (response[0] ?? "") : (response ?? "");
}

export function gradeAnswer(
  type: QuestionType,
  key: AnswerKey,
  response: AnswerValue | null | undefined,
  points: number,
): GradeOutcome {
  const full = { isCorrect: true, pointsAwarded: points };
  const none = { isCorrect: false, pointsAwarded: 0 };

  switch (type) {
    case "single_choice":
    case "true_false": {
      const [picked] = asList(response);
      return picked !== undefined && key.correctOptionIds?.includes(picked) ? full : none;
    }
    case "multiple_choice": {
      // Crédit partiel : (bonnes cases − mauvaises cases) / nombre de bonnes réponses, plancher à 0.
      const correct = new Set(key.correctOptionIds ?? []);
      const picked = new Set(asList(response));
      if (correct.size === 0 || picked.size === 0) return none;
      let good = 0;
      let bad = 0;
      for (const id of picked) {
        if (correct.has(id)) good++;
        else bad++;
      }
      const isCorrect = bad === 0 && good === correct.size;
      const ratio = Math.max(0, (good - bad) / correct.size);
      return { isCorrect, pointsAwarded: isCorrect ? points : Math.round(points * ratio * 4) / 4 };
    }
    case "numeric": {
      const value = parseNumber(asText(response));
      if (value === null || key.numericValue === undefined) return none;
      return Math.abs(value - key.numericValue) <= (key.tolerance ?? 0.01) ? full : none;
    }
    case "short_text": {
      const answer = normalizeText(asText(response));
      if (!answer) return none;
      return (key.acceptedTexts ?? []).some((accepted) => normalizeText(accepted) === answer) ? full : none;
    }
  }
}

/** Note sur 20 arrondie au quart de point. */
export function toScore20(score: number, maxScore: number): number {
  if (maxScore <= 0) return 0;
  return Math.round((score / maxScore) * 20 * 4) / 4;
}
