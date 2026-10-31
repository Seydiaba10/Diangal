import "server-only";

// CE1, numération : séries DIANGAL sur les nombres jusqu'à 500, 1 000 et 10 000 (lire, écrire,
// décomposer, comparer, ranger, suites, pairs et impairs, double et moitié). Pas de cahier d'école
// au CE1 : la progression va du CP (nombres jusqu'à 100) au CE2 (révisions jusqu'à 10 000), d'après le
// guide de l'étape 2. Réponses calculées par mocks/upper-math.ts et mocks/primary-exercises.ts.

import type { ExerciseSeries, ExerciseSpec } from "../../exercise-series";
import { parity, parityAmong, pickParity, readPlaceValue } from "../../primary-exercises";
import { compareBig, composeParts, countOf, digitOf, expandGap, missingBig, nextBig, orderBig, seqGap, story, times, toDigits, toWords } from "../../upper-math";
import { seriesOf } from "../../cp/maths/helpers";

const vf = (statement: string, answer: boolean, why: string): ExerciseSpec => ({ vf: statement, answer, why: `<strong>${answer ? "Vrai" : "Faux"}</strong> : ${why}` });

const n500 = seriesOf("Les nombres jusqu’à 500");

export const NUMBERS_500_CE1: ExerciseSeries[] = [
  n500(1, "lire et écrire les nombres jusqu’à 500 (1)", [
    toDigits(347),
    toDigits(206),
    toDigits(450),
    toWords(185),
    toWords(302),
    toWords(499),
    readPlaceValue(2, 3, 6),
    readPlaceValue(4, 0, 8),
  ]),
  n500(2, "lire et écrire les nombres jusqu’à 500 (2)", [
    toDigits(128),
    toDigits(415),
    toWords(260),
    toWords(117),
    digitOf(374, 2),
    digitOf(374, 1),
    digitOf(209, 0),
    readPlaceValue(3, 5, 0),
  ]),
  n500(3, "décomposer les nombres", [
    composeParts(253),
    composeParts(407),
    expandGap(368, 1),
    expandGap(492, 0),
    expandGap(315, 2),
    missingBig(275, 200),
    countOf(360, 1),
    countOf(480, 2),
  ]),
  n500(4, "comparer et ranger", [
    compareBig(238, 283),
    compareBig(410, 401),
    compareBig(356, 356),
    compareBig(199, 201),
    orderBig([312, 231, 321, 213], "up"),
    orderBig([145, 451, 154, 415], "down"),
    nextBig(299, "après"),
    nextBig(400, "avant"),
  ]),
  n500(5, "suites de nombres", [
    seqGap([100, 150, 200, 250, 300], 2),
    seqGap([205, 210, 215, 220, 225], 3),
    seqGap([480, 470, 460, 450, 440], 1),
    seqGap([120, 220, 320, 420], 2),
    seqGap([396, 397, 398, 399, 400], 4),
    seqGap([50, 100, 150, 200, 250], 1),
    nextBig(349, "après"),
    nextBig(250, "avant"),
  ]),
  n500(6, "nombres pairs et impairs", [
    parity(9),
    parity(12),
    parityAmong([135, 247, 318], "pair"),
    parityAmong([240, 416, 353], "impair"),
    pickParity([12, 35, 48, 57, 60], "pair"),
    pickParity([101, 214, 325, 436, 447], "impair"),
    vf("Un nombre pair se termine par 0, 2, 4, 6 ou 8.", true, "on peut alors le partager en deux parts égales."),
    vf("475 est un nombre pair.", false, "il se termine par 5 : il est impair."),
  ]),
  n500(7, "le double et la moitié (1)", [
    times("double", 15),
    times("double", 24),
    times("double", 45),
    times("double", 125),
    times("moitié", 30),
    times("moitié", 48),
    times("moitié", 100),
    times("moitié", 250),
  ]),
  n500(8, "le double et la moitié (2)", [
    story("Awa a <strong>35</strong> billes. Modou en a le double (<strong>2</strong> fois plus).", "Combien de billes a Modou ?", 35, "×", 2, "billes"),
    story("Un sac contient <strong>240</strong> mangues. On en donne la moitié aux voisins (on partage en <strong>2</strong>).", "Combien de mangues donne-t-on ?", 240, ":", 2, "mangues"),
    times("double", 150),
    times("moitié", 160),
    times("double", 230),
    times("moitié", 420),
    vf("La moitié de 50, c’est 25.", true, "25 + 25 = 50."),
    vf("Le double de 100, c’est 150.", false, "100 + 100 = 200."),
  ]),
];

const n1000 = seriesOf("Les nombres jusqu’à 1 000");

export const NUMBERS_1000_CE1: ExerciseSeries[] = [
  n1000(1, "lire et écrire les nombres de 500 à 1 000 (1)", [
    toDigits(568),
    toDigits(704),
    toDigits(1000),
    toWords(615),
    toWords(890),
    toWords(999),
    readPlaceValue(7, 4, 2),
    readPlaceValue(9, 0, 5),
  ]),
  n1000(2, "lire et écrire les nombres de 500 à 1 000 (2)", [
    toDigits(836),
    toDigits(970),
    toWords(507),
    toWords(780),
    digitOf(659, 2),
    digitOf(803, 1),
    composeParts(946),
    composeParts(580),
  ]),
  n1000(3, "comparer et ranger", [
    compareBig(689, 698),
    compareBig(901, 899),
    compareBig(750, 705),
    compareBig(1000, 999),
    orderBig([712, 527, 689, 590], "up"),
    orderBig([845, 854, 584, 548], "down"),
    nextBig(999, "après"),
    nextBig(700, "avant"),
  ]),
  n1000(4, "compléter jusqu’à 1 000", [
    missingBig(1000, 600),
    missingBig(1000, 750),
    missingBig(1000, 900),
    missingBig(1000, 450),
    missingBig(800, 500),
    expandGap(735, 1),
    countOf(1000, 2),
    countOf(1000, 1),
  ]),
  n1000(5, "suites de nombres", [
    seqGap([600, 700, 800, 900, 1000], 3),
    seqGap([550, 600, 650, 700, 750], 2),
    seqGap([990, 980, 970, 960, 950], 1),
    seqGap([725, 750, 775, 800, 825], 4),
    seqGap([502, 504, 506, 508, 510], 2),
    seqGap([1000, 900, 800, 700, 600], 2),
    nextBig(589, "après"),
    nextBig(810, "avant"),
  ]),
];

const n10000 = seriesOf("Les nombres jusqu’à 10 000");

export const NUMBERS_10000_CE1: ExerciseSeries[] = [
  n10000(1, "lire et écrire les nombres jusqu’à 10 000 (1)", [
    toDigits(4205),
    toDigits(3070),
    toDigits(6540),
    toDigits(9008),
    toWords(2500),
    toWords(1348),
    toWords(7090),
    toWords(5106),
  ]),
  n10000(2, "lire et écrire les nombres jusqu’à 10 000 (2)", [
    toDigits(8312),
    toDigits(1999),
    toWords(4600),
    toWords(3015),
    digitOf(6482, 3),
    digitOf(6482, 2),
    digitOf(5079, 1),
    digitOf(2305, 0),
  ]),
  n10000(3, "décomposer les nombres (1)", [
    composeParts(3425),
    composeParts(6080),
    composeParts(9302),
    expandGap(4268, 2),
    expandGap(7531, 0),
    expandGap(2905, 1),
    missingBig(5600, 5000),
    missingBig(8040, 8000),
  ]),
  n10000(4, "décomposer les nombres (2)", [
    countOf(3600, 2),
    countOf(4250, 1),
    countOf(7000, 3),
    countOf(2800, 2),
    composeParts(1750),
    expandGap(6145, 3),
    missingBig(10000, 9000),
    missingBig(3500, 3000),
  ]),
  n10000(5, "comparer les nombres", [
    compareBig(5432, 5621),
    compareBig(7089, 7098),
    compareBig(4300, 3400),
    compareBig(9999, 10000),
    compareBig(6060, 6006),
    compareBig(2500, 2500),
    nextBig(5999, "après"),
    nextBig(8000, "avant"),
  ]),
  n10000(6, "ranger les nombres", [
    orderBig([4613, 6431, 4361, 6143], "up"),
    orderBig([3080, 3800, 3008, 3880], "down"),
    orderBig([6250, 6520, 6025, 6205], "up"),
    orderBig([9100, 9010, 9001, 9110], "down"),
    compareBig(7650, 7560),
    compareBig(1001, 999),
    nextBig(9999, "après"),
    nextBig(4100, "avant"),
  ]),
  n10000(7, "suites de nombres", [
    seqGap([1000, 2000, 3000, 4000, 5000], 3),
    seqGap([2500, 3000, 3500, 4000, 4500], 1),
    seqGap([7200, 7300, 7400, 7500, 7600], 2),
    seqGap([9000, 8500, 8000, 7500, 7000], 3),
    seqGap([4990, 5000, 5010, 5020, 5030], 0),
    seqGap([1250, 1500, 1750, 2000, 2250], 4),
    nextBig(6099, "après"),
    nextBig(3000, "avant"),
  ]),
];
