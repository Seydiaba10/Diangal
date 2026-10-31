import "server-only";

// CP, « Additionner et soustraire jusqu’à 50 » : séries DIANGAL du même genre que les leçons du cahier
// de l'école (sens de l'addition et de la soustraction, opérations posées sans puis avec retenue,
// révision, situations d'intégration), avec d'autres nombres et d'autres situations.

import { picture, pictureRow } from "../../drawings";
import type { ExerciseSeries } from "../../exercise-series";
import { biggerGroup, posedOp, problem, storyOp } from "../../primary-exercises";
import { seriesOf } from "./helpers";

const series = seriesOf("Additionner et soustraire jusqu’à 50");
const kids = pictureRow(
  [
    { name: "eleve-fille", count: 1 },
    { name: "eleve-garcon", count: 1 },
  ],
  "Une fille et un garçon en tenue d’école.",
  80,
);

/** Opérations dans le tableau d et u (grid), puis à poser, puis évaluation : comme les pages du cahier. */
const ops = (grid: [number, "+" | "−", number][], posed: [number, "+" | "−", number][]) => [
  ...grid.map(([a, op, b]) => posedOp(a, op, b, true)),
  ...posed.map(([a, op, b]) => posedOp(a, op, b)),
];

export const OPERATIONS_TO_50: ExerciseSeries[] = [
  series(1, "le sens de l’addition", [
    ...problem(
      "Au marché, Awa achète <strong>22</strong> mangues le matin et <strong>5</strong> mangues le soir. Combien de mangues a-t-elle achetées en tout ?",
      22,
      "+",
      5,
      "mangues",
      "« Le matin et le soir… en tout » : on réunit les deux achats.",
      picture("mangue", "Une mangue."),
    ),
    ...problem(
      "Dans la classe, il y a <strong>14</strong> filles et <strong>12</strong> garçons. Combien d’élèves y a-t-il en tout ?",
      14,
      "+",
      12,
      "élèves",
      "« En tout » : on réunit les filles et les garçons.",
      kids,
    ),
    ...problem(
      "Moussa a <strong>20</strong> billes. Son ami lui donne <strong>6</strong> billes. Combien de billes a-t-il maintenant ?",
      20,
      "+",
      6,
      "billes",
      "On lui donne des billes : il en a plus qu’avant.",
    ),
    ...problem(
      "Fatou a <strong>11</strong> oranges. Elle en achète <strong>7</strong> autres. Combien d’oranges a-t-elle en tout ?",
      11,
      "+",
      7,
      "oranges",
      "Elle en achète d’autres : on ajoute.",
      picture("orange", "Une orange."),
    ),
  ]),
  series(2, "le sens de la soustraction", [
    ...problem(
      "Dans un car rapide, il y a <strong>25</strong> personnes. <strong>12</strong> personnes descendent. Combien de personnes restent dans le car ?",
      25,
      "−",
      12,
      "personnes",
      "Des personnes descendent : on enlève.",
    ),
    ...problem(
      "Ousmane a <strong>18</strong> bananes. Il en mange <strong>5</strong>. Combien de bananes lui reste-t-il ?",
      18,
      "−",
      5,
      "bananes",
      "« Il lui reste » : on enlève les bananes mangées.",
      picture("banane", "Une banane."),
    ),
    ...problem(
      "Dans le panier, il y a <strong>29</strong> mangues et <strong>15</strong> oranges. Quelle est la différence entre le nombre de mangues et le nombre d’oranges ?",
      29,
      "−",
      15,
      "",
      "« La différence » : on cherche l’écart entre les deux nombres.",
      pictureRow(
        [
          { name: "mangue", count: 1 },
          { name: "orange", count: 1 },
        ],
        "Une mangue et une orange.",
        56,
      ),
    ),
    ...problem(
      "Dans la classe, il y a <strong>33</strong> élèves. <strong>11</strong> élèves sont absents. Combien d’élèves sont présents ?",
      33,
      "−",
      11,
      "élèves",
      "Des élèves sont absents : on les enlève du nombre d’élèves de la classe.",
      kids,
    ),
  ]),
  series(
    3,
    "l’addition sans retenue",
    ops(
      [[23, "+", 14], [10, "+", 21], [32, "+", 5]],
      [[21, "+", 13], [15, "+", 12], [12, "+", 30], [26, "+", 3], [24, "+", 11], [11, "+", 22], [33, "+", 4]],
    ),
  ),
  series(
    4,
    "la soustraction sans retenue",
    ops(
      [[34, "−", 12], [29, "−", 10], [27, "−", 5]],
      [[36, "−", 24], [25, "−", 13], [38, "−", 31], [46, "−", 3], [35, "−", 22], [28, "−", 14], [39, "−", 6]],
    ),
  ),
  series(
    5,
    "l’addition avec retenue",
    ops(
      [[18, "+", 14], [15, "+", 17], [26, "+", 7]],
      [[17, "+", 15], [19, "+", 19], [28, "+", 5], [14, "+", 18], [16, "+", 17], [19, "+", 13], [25, "+", 9]],
    ),
  ),
  series(
    6,
    "la soustraction avec retenue",
    ops(
      [[32, "−", 15], [34, "−", 26], [23, "−", 7]],
      [[31, "−", 17], [35, "−", 28], [33, "−", 6], [24, "−", 9], [30, "−", 14], [32, "−", 24], [21, "−", 5]],
    ),
  ),
  series(
    7,
    "additionner sur les nombres de 0 à 39",
    ops(
      [[34, "+", 5], [13, "+", 24], [30, "+", 8], [22, "+", 16]],
      [[32, "+", 6], [21, "+", 17], [10, "+", 9], [20, "+", 18], [33, "+", 4], [26, "+", 3]],
    ),
  ),
  series(
    8,
    "soustraire sur les nombres de 0 à 39",
    ops(
      [[38, "−", 4], [29, "−", 13], [17, "−", 6], [37, "−", 5]],
      [[35, "−", 3], [39, "−", 16], [36, "−", 4], [38, "−", 25], [34, "−", 2], [29, "−", 17]],
    ),
  ),
  series(
    9,
    "additionner sur les nombres de 0 à 44",
    ops(
      [[21, "+", 22], [18, "+", 25], [36, "+", 7]],
      [[23, "+", 12], [16, "+", 27], [35, "+", 9], [17, "+", 26], [24, "+", 13], [29, "+", 14], [33, "+", 8]],
    ),
  ),
  series(
    10,
    "soustraire sur les nombres de 0 à 44",
    ops(
      [[44, "−", 13], [42, "−", 27], [41, "−", 5]],
      [[39, "−", 14], [34, "−", 26], [43, "−", 7], [36, "−", 8], [44, "−", 22], [33, "−", 24], [42, "−", 8]],
    ),
  ),
  series(
    11,
    "additionner sur les nombres de 0 à 50",
    ops(
      [[31, "+", 18], [17, "+", 28], [34, "+", 9]],
      [[32, "+", 15], [24, "+", 25], [19, "+", 26], [37, "+", 8], [33, "+", 14], [38, "+", 7], [16, "+", 27]],
    ),
  ),
  series(
    12,
    "soustraire sur les nombres de 0 à 50",
    ops(
      [[48, "−", 17], [45, "−", 26], [44, "−", 8]],
      [[49, "−", 14], [47, "−", 20], [46, "−", 29], [50, "−", 7], [45, "−", 12], [50, "−", 9], [42, "−", 26]],
    ),
  ),
  series(
    13,
    "révision : additionner et soustraire jusqu’à 50",
    ops(
      [[17, "+", 26], [45, "−", 28], [34, "−", 7]],
      [[32, "+", 16], [18, "+", 19], [36, "−", 18], [27, "−", 19], [44, "−", 7], [28, "+", 15], [43, "−", 17]],
    ),
  ),
  series(14, "activités d’intégration", [
    storyOp("Dans une classe de CP, il y a <strong>23</strong> filles et <strong>19</strong> garçons.", "Trouve le nombre total d’élèves de cette classe.", 23, "+", 19, "élèves", kids),
    biggerGroup("Dans une classe de CP, il y a <strong>23</strong> filles et <strong>19</strong> garçons.", [["les filles", 23], ["les garçons", 19]]),
    storyOp("Dans une classe de CP, il y a <strong>23</strong> filles et <strong>19</strong> garçons.", "Trouve la différence entre le nombre de filles et le nombre de garçons.", 23, "−", 19, "élèves"),
    storyOp(
      "Sur la table du marchand, il y a un tas de <strong>17</strong> bananes et un tas de <strong>26</strong> oranges.",
      "Trouve le nombre total de fruits.",
      17,
      "+",
      26,
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
    biggerGroup("Sur la table du marchand, il y a un tas de <strong>17</strong> bananes et un tas de <strong>26</strong> oranges.", [["le tas de bananes", 17], ["le tas d’oranges", 26]]),
    storyOp("Sur la table du marchand, il y a un tas de <strong>17</strong> bananes et un tas de <strong>26</strong> oranges.", "Trouve la différence entre le nombre d’oranges et le nombre de bananes.", 26, "−", 17, "fruits"),
    storyOp("Au CI, il y a <strong>21</strong> garçons et <strong>18</strong> filles.", "Trouve le nombre total d’élèves de CI.", 21, "+", 18, "élèves", kids),
    biggerGroup("Au CI, il y a <strong>21</strong> garçons et <strong>18</strong> filles.", [["les garçons", 21], ["les filles", 18]]),
    storyOp("Au CI, il y a <strong>21</strong> garçons et <strong>18</strong> filles.", "Trouve la différence entre le nombre de garçons et le nombre de filles.", 21, "−", 18, "élèves"),
  ]),
];
