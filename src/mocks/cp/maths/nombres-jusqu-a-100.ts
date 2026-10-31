import "server-only";

// CP, « Les nombres jusqu’à 100 » : séries DIANGAL du même genre que les leçons du cahier de l'école
// (nombres de 80 à 99, le nombre 100, additions et soustractions, révision, situations d'intégration),
// avec d'autres nombres et d'autres situations.

import { pictureRow } from "../../drawings";
import type { ExerciseSeries } from "../../exercise-series";
import {
  bandGap,
  compare,
  digitsToWords,
  hundredIn,
  order,
  posedOp,
  readPlaceValue,
  readTensUnits,
  storyOp,
  wordsToDigits,
} from "../../primary-exercises";
import { seriesOf } from "./helpers";

const series = seriesOf("Les nombres jusqu’à 100");
type Op = [number, "+" | "−", number];
const ops = (grid: Op[], posed: Op[]) => [...grid.map(([a, op, b]) => posedOp(a, op, b, true)), ...posed.map(([a, op, b]) => posedOp(a, op, b))];
const kids = pictureRow(
  [
    { name: "eleve-fille", count: 1 },
    { name: "eleve-garcon", count: 1 },
  ],
  "Une fille et un garçon en tenue d’école.",
  80,
);

export const NUMBERS_TO_100: ExerciseSeries[] = [
  series(1, "les nombres de 80 à 89", [
    readTensUnits(8, 6),
    wordsToDigits(83),
    digitsToWords(89),
    compare(84, 86),
    order([85, 79, 88, 81], "up"),
    bandGap([81, 83, 85, 87, 89], 3),
    bandGap([88, 86, 84, 82, 80], 1),
    digitsToWords(80),
    compare(87, 87),
    bandGap([84, 85, 86, 87, 88], 2),
  ]),
  series(
    2,
    "additionner sur les nombres de 0 à 89",
    ops(
      [[52, "+", 36], [47, "+", 29], [66, "+", 8]],
      [[43, "+", 45], [38, "+", 40], [69, "+", 9], [57, "+", 28], [31, "+", 54], [75, "+", 7], [48, "+", 36]],
    ),
  ),
  series(
    3,
    "soustraire sur les nombres de 0 à 89",
    ops(
      [[86, "−", 42], [73, "−", 28], [85, "−", 9]],
      [[84, "−", 31], [79, "−", 46], [87, "−", 9], [76, "−", 38], [88, "−", 15], [81, "−", 6], [74, "−", 29]],
    ),
  ),
  series(4, "les nombres de 90 à 99", [
    readTensUnits(9, 4),
    wordsToDigits(97),
    digitsToWords(93),
    compare(98, 96),
    order([95, 99, 91, 97], "down"),
    bandGap([90, 92, 94, 96, 98], 2),
    bandGap([99, 97, 95, 93, 91], 3),
    digitsToWords(91),
    compare(92, 95),
    bandGap([93, 94, 95, 96, 97], 4),
  ]),
  series(
    5,
    "additionner sur les nombres de 0 à 99",
    ops(
      [[71, "+", 24], [66, "+", 27], [85, "+", 9]],
      [[83, "+", 14], [62, "+", 30], [86, "+", 8], [79, "+", 16], [82, "+", 15], [87, "+", 6], [68, "+", 25]],
    ),
  ),
  series(
    6,
    "soustraire sur les nombres de 0 à 99",
    ops(
      [[96, "−", 32], [94, "−", 57], [91, "−", 6]],
      [[98, "−", 23], [95, "−", 50], [93, "−", 46], [97, "−", 8], [99, "−", 14], [96, "−", 9], [92, "−", 38]],
    ),
  ),
  series(7, "le nombre 100", [
    readPlaceValue(1, 0, 0),
    wordsToDigits(100),
    digitsToWords(100),
    order([100, 97, 99, 98], "up"),
    bandGap([80, 85, 90, 95, 100], 1),
    bandGap([100, 90, 80, 70, 60], 2),
    hundredIn("dizaines"),
    hundredIn("unités"),
    compare(100, 99),
    bandGap([96, 97, 98, 99, 100], 3),
  ]),
  series(
    8,
    "additionner et soustraire jusqu’à 100",
    ops(
      [[38, "+", 47], [91, "−", 36], [64, "+", 29]],
      [[27, "+", 64], [95, "+", 5], [84, "−", 9], [92, "−", 25], [73, "+", 18], [96, "−", 27], [85, "−", 17]],
    ),
  ),
  series(
    9,
    "révision : additionner et soustraire jusqu’à 100",
    ops(
      [[58, "+", 36], [83, "−", 47], [67, "+", 8]],
      [[29, "+", 71], [76, "−", 8], [45, "+", 39], [94, "−", 65], [62, "+", 28], [100, "−", 35], [88, "−", 19]],
    ),
  ),
  series(10, "activités d’intégration", [
    storyOp("Dans un car, il y a <strong>36</strong> personnes. Au premier arrêt, <strong>9</strong> personnes montent.", "Combien de personnes y a-t-il dans le car ?", 36, "+", 9, "personnes"),
    storyOp(
      "Après le premier arrêt, il y a <strong>45</strong> personnes dans le car. Après le deuxième arrêt, on en compte <strong>52</strong>.",
      "Combien de personnes sont montées au deuxième arrêt ?",
      52,
      "−",
      45,
      "personnes",
    ),
    storyOp("Sur un fromager, il y a <strong>27</strong> pigeons. <strong>14</strong> autres pigeons arrivent.", "Combien de pigeons y a-t-il sur l’arbre ?", 27, "+", 14, "pigeons"),
    storyOp("Il y a <strong>41</strong> pigeons sur l’arbre. Un camion passe et <strong>16</strong> pigeons s’envolent.", "Combien de pigeons reste-t-il sur l’arbre ?", 41, "−", 16, "pigeons"),
    storyOp("Le car de l’école part avec <strong>38</strong> élèves. Au premier arrêt, <strong>17</strong> élèves montent.", "Combien d’élèves y a-t-il dans le car ?", 38, "+", 17, "élèves", kids),
    storyOp("Il y a <strong>55</strong> élèves dans le car. Après le deuxième arrêt, on compte <strong>63</strong> élèves.", "Combien d’élèves sont montés au deuxième arrêt ?", 63, "−", 55, "élèves"),
  ]),
];
