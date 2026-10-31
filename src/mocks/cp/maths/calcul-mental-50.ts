import "server-only";

// CP, « Calcul mental jusqu’à 50 » : la leçon du cahier de l'école sur les nombres pairs et impairs,
// en série DIANGAL du même genre (jetons rangés par deux, choisir et relever des nombres), autres nombres.

import type { ExerciseSeries } from "../../exercise-series";
import { parity, parityAmong, pickParity } from "../../primary-exercises";
import { seriesOf } from "./helpers";

const series = seriesOf("Calcul mental jusqu’à 50");

export const MENTAL_TO_50: ExerciseSeries[] = [
  series(1, "les nombres pairs et impairs", [
    parity(8),
    parity(5),
    parityAmong([13, 16, 19], "pair"),
    parityAmong([22, 24, 27], "impair"),
    pickParity([11, 12, 13, 14, 15, 16, 17, 18, 19, 20], "pair"),
    pickParity([21, 22, 23, 24, 25, 26], "impair"),
    parity(11),
    parityAmong([31, 34, 37], "pair"),
    parityAmong([40, 41, 42], "impair"),
    pickParity([35, 36, 37, 38], "pair"),
  ]),
];
