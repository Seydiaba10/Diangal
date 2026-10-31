import "server-only";

// CP, « Les nombres de 51 à 79 » : séries DIANGAL du même genre que les leçons du cahier de l'école
// (découvrir les nombres, additions et soustractions avec et sans retenue, vérification par
// l'addition, addition à trois termes, révision, situations d'intégration), avec d'autres nombres.

import { picture, pictureRow } from "../../drawings";
import type { ExerciseSeries } from "../../exercise-series";
import {
  bandGap,
  biggerGroup,
  compare,
  digitsToWords,
  order,
  posedOp,
  readTensUnits,
  storyOp,
  sum3,
  verifySub,
  wordsToDigits,
} from "../../primary-exercises";
import { seriesOf } from "./helpers";

const series = seriesOf("Les nombres de 51 à 79");
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

export const NUMBERS_51_79: ExerciseSeries[] = [
  series(1, "les nombres de 51 à 59", [
    readTensUnits(5, 7),
    wordsToDigits(54),
    digitsToWords(58),
    compare(56, 59),
    order([57, 51, 59, 53], "up"),
    bandGap([51, 53, 55, 57, 59], 4),
    bandGap([58, 56, 54, 52, 50], 2),
    digitsToWords(52),
    order([55, 59, 50, 54], "down"),
    compare(58, 55),
  ]),
  series(
    2,
    "l’addition sans retenue jusqu’à 59",
    ops(
      [[41, "+", 15], [32, "+", 24], [26, "+", 33], [52, "+", 6]],
      [[34, "+", 25], [12, "+", 46], [23, "+", 34], [55, "+", 3], [43, "+", 14], [30, "+", 27]],
    ),
  ),
  series(3, "vérifier une soustraction sans retenue", [
    ...verifySub(57, 23),
    ...verifySub(48, 15),
    ...verifySub(59, 36),
    ...verifySub(46, 24),
    ...verifySub(38, 17),
  ]),
  series(
    4,
    "l’addition avec retenue jusqu’à 59",
    ops(
      [[19, "+", 36], [27, "+", 28], [38, "+", 15], [46, "+", 7]],
      [[16, "+", 35], [24, "+", 19], [37, "+", 16], [49, "+", 8], [17, "+", 34], [28, "+", 25]],
    ),
  ),
  series(5, "l’addition à trois termes", [
    sum3(16, 13, 24),
    sum3(25, 11, 13),
    sum3(34, 12, 5),
    sum3(13, 14, 27),
    sum3(26, 11, 17),
    sum3(24, 16, 8),
    sum3(15, 12, 23),
    sum3(23, 14, 16),
    sum3(33, 11, 7),
    sum3(12, 25, 19),
  ]),
  series(
    6,
    "la soustraction avec retenue jusqu’à 59",
    ops(
      [[53, "−", 6], [52, "−", 18], [55, "−", 46], [42, "−", 35]],
      [[56, "−", 9], [57, "−", 8], [44, "−", 17], [50, "−", 26], [52, "−", 7], [46, "−", 28]],
    ),
  ),
  series(7, "vérifier une soustraction avec retenue", [
    ...verifySub(52, 27),
    ...verifySub(41, 16),
    ...verifySub(56, 38),
    ...verifySub(43, 19),
    ...verifySub(50, 24),
  ]),
  series(8, "les nombres de 60 à 69", [
    readTensUnits(6, 4),
    wordsToDigits(68),
    digitsToWords(61),
    compare(67, 67),
    order([63, 58, 66, 61], "down"),
    bandGap([45, 50, 55, 60, 65], 3),
    bandGap([69, 67, 65, 63, 61], 2),
    digitsToWords(69),
    compare(64, 62),
    bandGap([60, 61, 62, 63, 64], 1),
  ]),
  series(
    9,
    "additionner sur les nombres de 0 à 69",
    ops(
      [[45, "+", 23], [37, "+", 28], [56, "+", 9]],
      [[52, "+", 16], [38, "+", 27], [44, "+", 25], [59, "+", 8], [36, "+", 33], [47, "+", 19], [61, "+", 6]],
    ),
  ),
  series(
    10,
    "soustraire sur les nombres de 0 à 69",
    ops(
      [[65, "−", 14], [56, "−", 9], [60, "−", 27]],
      [[67, "−", 13], [69, "−", 34], [62, "−", 8], [60, "−", 36], [66, "−", 12], [63, "−", 7], [60, "−", 22]],
    ),
  ),
  series(11, "les nombres de 70 à 79", [
    readTensUnits(7, 3),
    wordsToDigits(76),
    digitsToWords(79),
    compare(74, 78),
    order([75, 68, 79, 71], "down"),
    bandGap([70, 72, 74, 76, 78], 3),
    bandGap([79, 77, 75, 73, 71], 1),
    digitsToWords(71),
    compare(77, 77),
    bandGap([72, 73, 74, 75, 76], 2),
  ]),
  series(
    12,
    "additionner sur les nombres de 0 à 79",
    ops(
      [[53, "+", 24], [46, "+", 27], [68, "+", 9]],
      [[61, "+", 15], [37, "+", 38], [55, "+", 22], [69, "+", 7], [42, "+", 35], [58, "+", 19], [71, "+", 6]],
    ),
  ),
  series(
    13,
    "soustraire sur les nombres de 0 à 79",
    ops(
      [[75, "−", 12], [73, "−", 9], [60, "−", 23]],
      [[78, "−", 15], [79, "−", 50], [54, "−", 8], [70, "−", 44], [76, "−", 13], [71, "−", 27], [70, "−", 35]],
    ),
  ),
  series(
    14,
    "révision : additionner et soustraire jusqu’à 79",
    ops(
      [[65, "+", 9], [17, "+", 36], [73, "−", 8], [54, "−", 27]],
      [[57, "+", 4], [45, "+", 27], [24, "+", 54], [49, "−", 7], [53, "−", 16], [74, "−", 26]],
    ),
  ),
  series(15, "activités d’intégration", [
    storyOp("Dans la classe de CP, il y a <strong>27</strong> filles et <strong>25</strong> garçons.", "Combien d’élèves y a-t-il dans la classe ?", 27, "+", 25, "élèves", kids),
    storyOp(
      "Le maître a <strong>70</strong> crayons. Il donne un crayon à chacun des <strong>52</strong> élèves de la classe.",
      "Combien de crayons lui reste-t-il ?",
      70,
      "−",
      52,
      "crayons",
    ),
    biggerGroup("Dans la classe de CP, il y a <strong>27</strong> filles et <strong>25</strong> garçons.", [["les filles", 27], ["les garçons", 25]]),
    storyOp(
      "Au marché, une vendeuse a <strong>38</strong> mangues dans un panier et <strong>36</strong> mangues dans un autre.",
      "Combien de mangues a-t-elle en tout ?",
      38,
      "+",
      36,
      "mangues",
      picture("mangue", "Une mangue."),
    ),
    storyOp("La vendeuse a <strong>74</strong> mangues. Elle en vend <strong>45</strong>.", "Combien de mangues lui reste-t-il ?", 74, "−", 45, "mangues"),
    storyOp("Au CE1, il y a <strong>31</strong> garçons et <strong>34</strong> filles.", "Combien d’élèves y a-t-il au CE1 ?", 31, "+", 34, "élèves", kids),
    storyOp(
      "Le directeur a <strong>59</strong> livres de lecture pour les <strong>65</strong> élèves du CE1.",
      "Combien de livres manque-t-il pour que chaque élève ait un livre ?",
      65,
      "−",
      59,
      "livres",
    ),
    biggerGroup("Au CE1, il y a <strong>31</strong> garçons et <strong>34</strong> filles.", [["les garçons", 31], ["les filles", 34]]),
    storyOp(
      "Sur l’étal, il y a <strong>46</strong> bananes et <strong>29</strong> oranges.",
      "Trouve la différence entre le nombre de bananes et le nombre d’oranges.",
      46,
      "−",
      29,
      "fruits",
      pictureRow(
        [
          { name: "banane", count: 1 },
          { name: "orange", count: 1 },
        ],
        "Une banane et une orange.",
        56,
      ),
    ),
  ]),
];
