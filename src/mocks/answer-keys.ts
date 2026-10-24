import "server-only";

// Corrigés de toutes les évaluations de démonstration (équivalent de private.answer_keys).

import { ANSWER_KEYS_1RE } from "./1re/exercises";
import { ANSWER_KEYS_2NDE } from "./2nde/exercises";
import { ANSWER_KEYS_BFEM_BLANCS } from "./3e/bfem-blancs";
import { ANSWER_KEYS_3E_SERIES } from "./3e/exercises";
import { ANSWER_KEYS_4E } from "./4e/exercises";
import { ANSWER_KEYS_5E } from "./5e/exercises";
import { ANSWER_KEYS_6E } from "./6e/exercises";
import { ANSWER_KEYS, type MockAnswerKey } from "./answer-keys-3e";
import { ANSWER_KEYS_CE1 } from "./ce1/exercises";
import { ANSWER_KEYS_CE2 } from "./ce2/exercises";
import { ANSWER_KEYS_CI } from "./ci/exercises";
import { ANSWER_KEYS_CM1 } from "./cm1/exercises";
import { ANSWER_KEYS_CM2 } from "./cm2/exercises";
import { ANSWER_KEYS_CP } from "./cp/exercises";
import { ANSWER_KEYS_TLE_SERIES } from "./tle/exercises";

export const CATALOG_ANSWER_KEYS: Record<string, MockAnswerKey> = {
  ...ANSWER_KEYS_CI,
  ...ANSWER_KEYS_CP,
  ...ANSWER_KEYS_CE1,
  ...ANSWER_KEYS_CE2,
  ...ANSWER_KEYS_CM1,
  ...ANSWER_KEYS_CM2,
  ...ANSWER_KEYS_6E,
  ...ANSWER_KEYS_5E,
  ...ANSWER_KEYS_4E,
  ...ANSWER_KEYS,
  ...ANSWER_KEYS_3E_SERIES,
  ...ANSWER_KEYS_BFEM_BLANCS,
  ...ANSWER_KEYS_2NDE,
  ...ANSWER_KEYS_1RE,
  ...ANSWER_KEYS_TLE_SERIES,
};

export type { MockAnswerKey };
