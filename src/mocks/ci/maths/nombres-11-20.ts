import "server-only";

// CI, nombres de 11 à 20 : une série DIANGAL par leçon du cahier de l'école (découvrir un nombre,
// le composer et le décomposer, révision, intégration) et les leçons de calcul (« Additions et
// soustractions sur les nombres de 0 à 13, 16, 19, 20 »), avec d'autres nombres et dessins.

import { countObjects, domino, type Kind } from "../../early-math";
import type { ExerciseSeries, ExerciseSpec } from "../../exercise-series";
import {
  bandGap,
  compare,
  difference,
  digitsToWords,
  join,
  joinMissing,
  missingTerm,
  order,
  rank,
  readTensUnits,
  split,
  storyOp,
  sumOf,
  wordsToDigits,
} from "../../primary-exercises";
import { seriesOf } from "../../cp/maths/helpers";
import { ctx } from "./ensembles";

/** Découvrir le nombre n : compter, dizaine et unités, chiffres, lettres, comparer, ranger, bande. */
const discover = (n: number, kind: Kind, dir: "up" | "down"): ExerciseSpec[] => [
  countObjects(kind, n),
  readTensUnits(Math.floor(n / 10), n % 10),
  wordsToDigits(n),
  digitsToWords(n),
  compare(n, n - 3),
  compare(n - 1, n),
  order([n, n - 4, n - 1, n - 2], dir),
  bandGap([n - 4, n - 3, n - 2, n - 1, n], 2 + (n % 3)),
];

/** Composer et décomposer n : arbres, additions à trou, domino (deux cases de 10 points au plus). */
const compose = (n: number, [a, b, c, d, e, f]: number[]): ExerciseSpec[] => [
  join(10, n - 10),
  join(a!, n - a!),
  joinMissing(b!, n),
  split(n, [c!]),
  split(n, [10], 0),
  sumOf(d!, n - d!),
  missingTerm(n, e!),
  domino(f!, n - f!),
];

const big = seriesOf("Les nombres de 11 à 20");

export const NUMBERS_11_20: ExerciseSeries[] = [
  big(1, "le nombre 11", discover(11, "mangue", "up")),
  big(2, "composer et décomposer le nombre 11", compose(11, [6, 4, 8, 5, 3, 6])),
  big(3, "le nombre 12", discover(12, "orange", "down")),
  big(4, "composer et décomposer le nombre 12", compose(12, [7, 5, 9, 4, 8, 6])),
  big(5, "le nombre 13", discover(13, "crayon", "up")),
  big(6, "composer et décomposer le nombre 13", compose(13, [8, 6, 5, 9, 7, 4])),
  big(7, "le nombre 14", discover(14, "bonbon", "down")),
  big(8, "composer et décomposer le nombre 14", compose(14, [9, 7, 6, 8, 5, 7])),
  big(9, "le nombre 15", discover(15, "ballon", "up")),
  big(10, "composer et décomposer le nombre 15", compose(15, [8, 9, 7, 6, 10, 5])),
  big(11, "le nombre 16", discover(16, "banane", "down")),
  big(12, "composer et décomposer le nombre 16", compose(16, [9, 8, 7, 10, 6, 8])),
  big(13, "les nombres de 17 à 19", [
    readTensUnits(1, 7),
    readTensUnits(1, 9),
    wordsToDigits(18),
    digitsToWords(17),
    digitsToWords(19),
    compare(19, 17),
    order([18, 17, 19, 15], "up"),
    bandGap([15, 16, 17, 18, 19], 3),
    rank(19, 17, "gauche", "jeton"),
  ]),
  big(14, "composer et décomposer les nombres de 17 à 19", [
    join(10, 7),
    join(9, 9),
    joinMissing(8, 19),
    split(17, [9]),
    split(18, [10], 0),
    sumOf(12, 5),
    missingTerm(19, 10),
    domino(9, 8),
  ]),
  big(15, "le nombre 20", [
    countObjects("cahier", 20),
    readTensUnits(2, 0),
    wordsToDigits(20),
    digitsToWords(20),
    compare(20, 18),
    compare(19, 20),
    order([20, 16, 19, 17], "down"),
    bandGap([16, 17, 18, 19, 20], 4),
  ]),
  big(16, "composer et décomposer le nombre 20", [
    join(10, 10),
    join(15, 5),
    joinMissing(12, 20),
    split(20, [13]),
    split(20, [10], 0),
    sumOf(14, 6),
    missingTerm(20, 11),
    domino(10, 10),
  ]),
  big(17, "révision : les nombres de 0 à 20", [
    countObjects("orange", 16),
    readTensUnits(1, 4),
    wordsToDigits(13),
    digitsToWords(15),
    compare(14, 12),
    rank(18, 12, "droite", "rond"),
    order([11, 20, 14, 9], "up"),
    bandGap([10, 12, 14, 16, 18], 3),
    split(19, [11]),
  ]),
  big(18, "activités d’intégration", [
    ctx("À la kermesse, Sidi range ses bonbons par dizaines.", readTensUnits(1, 6)),
    ctx("Rama compte les crayons gagnés par sa classe.", countObjects("crayon", 14)),
    ctx("Sidi a <strong>16</strong> bonbons, Rama en a <strong>18</strong>.", compare(16, 18)),
    storyOp("Rama a <strong>14</strong> crayons. Sa maîtresse lui en donne <strong>3</strong>.", "Combien de crayons Rama a-t-elle maintenant ?", 14, "+", 3, "crayons"),
    storyOp("Sidi a <strong>16</strong> bonbons. Il en partage <strong>5</strong> avec ses amis.", "Combien de bonbons lui reste-t-il ?", 16, "−", 5, "bonbons"),
    ctx("Les deux enfants mettent leurs billes ensemble.", domino(8, 9)),
    digitsToWords(17),
    order([16, 18, 14, 17], "down"),
  ]),
];

const calc = seriesOf("Calculer jusqu’à 20");

export const CALC_20: ExerciseSeries[] = [
  calc(1, "additions et soustractions jusqu’à 13", [
    sumOf(10, 3),
    sumOf(7, 5),
    difference(13, 3),
    difference(12, 5),
    missingTerm(13, 8),
    storyOp("Awa a <strong>9</strong> billes. Elle en gagne <strong>4</strong>.", "Combien de billes a-t-elle maintenant ?", 9, "+", 4, "billes"),
    storyOp("Il y a <strong>12</strong> œufs dans le panier. <strong>2</strong> se cassent.", "Combien d’œufs restent entiers ?", 12, "−", 2, "œufs"),
    difference(11, 6),
  ]),
  calc(2, "additions et soustractions jusqu’à 16", [
    sumOf(10, 6),
    sumOf(8, 7),
    difference(16, 6),
    difference(15, 7),
    missingTerm(16, 9, true),
    storyOp("Modou a <strong>8</strong> cahiers. Papa lui en achète <strong>6</strong>.", "Combien de cahiers a-t-il en tout ?", 8, "+", 6, "cahiers"),
    storyOp("La maîtresse a <strong>15</strong> craies. Elle en utilise <strong>4</strong>.", "Combien de craies lui reste-t-il ?", 15, "−", 4, "craies"),
    sumOf(9, 5),
  ]),
  calc(3, "additions et soustractions jusqu’à 19", [
    sumOf(10, 9),
    sumOf(11, 7),
    difference(19, 9),
    difference(18, 6),
    missingTerm(19, 12),
    storyOp("Fatou cueille <strong>12</strong> mangues le matin et <strong>5</strong> le soir.", "Combien de mangues a-t-elle cueillies ?", 12, "+", 5, "mangues"),
    storyOp("Il y a <strong>17</strong> élèves dans la cour. <strong>6</strong> rentrent en classe.", "Combien d’élèves restent dans la cour ?", 17, "−", 6, "élèves"),
    difference(17, 8),
  ]),
  calc(4, "additions et soustractions jusqu’à 20", [
    sumOf(10, 10),
    sumOf(13, 7),
    difference(20, 10),
    difference(20, 4),
    missingTerm(20, 14),
    storyOp("Le car a <strong>14</strong> passagers. <strong>6</strong> autres montent.", "Combien de passagers y a-t-il maintenant ?", 14, "+", 6, "passagers"),
    storyOp("Maman a <strong>20</strong> oranges. Elle en vend <strong>8</strong>.", "Combien d’oranges lui reste-t-il ?", 20, "−", 8, "oranges"),
    sumOf(16, 3),
  ]),
];
