import "server-only";

// CP, « Les nombres jusqu’à 20 (révision) » : quatre séries de révision du même genre que celles du
// cahier de l'école (nombres de 0 à 10, de 11 à 20, composition, addition et soustraction), avec
// d'autres nombres. Réponses et corrections calculées par mocks/primary-exercises.ts.

import type { ExerciseSeries } from "../../exercise-series";
import {
  bandGap,
  compare,
  countCubes,
  difference,
  digitsToWords,
  join,
  joinMissing,
  order,
  rank,
  split,
  sumOf,
  wordsToDigits,
} from "../../primary-exercises";
import { seriesOf } from "./helpers";

const series = seriesOf("Les nombres jusqu’à 20 (révision)");

export const NUMBERS_TO_20: ExerciseSeries[] = [
  series(1, "révision des nombres de 0 à 10", [
    countCubes(6),
    wordsToDigits(7),
    digitsToWords(9),
    rank(12, 8, "gauche", "jeton"),
    compare(5, 8),
    order([6, 2, 9], "up"),
    bandGap([3, 4, 5, 6, 7], 2),
    bandGap([9, 8, 7, 6, 5], 3),
    digitsToWords(6),
    compare(10, 7),
  ]),
  series(2, "révision des nombres de 11 à 20", [
    countCubes(14),
    wordsToDigits(19),
    digitsToWords(12),
    rank(16, 13, "gauche", "jeton"),
    compare(17, 19),
    order([15, 19, 12], "down"),
    bandGap([14, 15, 16, 17, 18], 2),
    bandGap([19, 18, 17, 16, 15], 1),
    digitsToWords(18),
    bandGap([11, 12, 13, 14, 15], 3),
  ]),
  series(3, "composer et décomposer les nombres jusqu’à 20", [
    join(10, 6),
    joinMissing(8, 15),
    split(18, [7], 0),
    split(16, [9]),
    join(7, 6),
    joinMissing(9, 14),
    split(17, [8], 0),
    split(12, [7]),
    join(10, 5),
    joinMissing(8, 17),
  ]),
  series(4, "additionner et soustraire jusqu’à 20", [
    sumOf(7, 5),
    sumOf(9, 6),
    difference(16, 7),
    difference(14, 9),
    sumOf(8, 8),
    sumOf(6, 7),
    difference(13, 6),
    difference(18, 9),
    sumOf(9, 4),
    difference(11, 5),
  ]),
];
