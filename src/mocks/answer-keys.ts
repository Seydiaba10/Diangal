import "server-only";

// Corrigés de toutes les évaluations de démonstration (équivalent de private.answer_keys).

import { ANSWER_KEYS_3E_SERIES } from "./3e/exercises";
import { ANSWER_KEYS, type MockAnswerKey } from "./answer-keys-3e";
import { ANSWER_KEYS_CI } from "./ci/exercises";
import { ANSWER_KEYS_CP } from "./cp/exercises";

export const CATALOG_ANSWER_KEYS: Record<string, MockAnswerKey> = {
  ...ANSWER_KEYS_CI,
  ...ANSWER_KEYS_CP,
  ...ANSWER_KEYS,
  ...ANSWER_KEYS_3E_SERIES,
};

export type { MockAnswerKey };
