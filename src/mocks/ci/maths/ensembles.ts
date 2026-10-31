import "server-only";

// CI, « Les ensembles » : une série DIANGAL par leçon du cahier de l'école (notion d'ensemble,
// sous-ensemble, peu / beaucoup / rien, forme et couleur, plus / moins / autant, révision,
// intégration). Le cahier fait entourer ou colorier ; ici l'élève observe le même genre de dessin et
// répond. Réponses calculées par mocks/early-math.ts.

import {
  compareSets,
  countIn,
  intruder,
  moreWord,
  quantity,
  sameSets,
  shapeSet,
  toSame,
  type Kind,
} from "../../early-math";
import type { ExerciseSeries, ExerciseSpec } from "../../exercise-series";
import { seriesOf } from "../../cp/maths/helpers";

const series = seriesOf("Les ensembles");
const vf = (statement: string, answer: boolean, why: string): ExerciseSpec => ({ vf: statement, answer, why: `<strong>${answer ? "Vrai" : "Faux"}</strong> : ${why}` });
/** n fois le même dessin. */
export const rep = (kind: Kind, n: number): Kind[] => Array<Kind>(n).fill(kind);
/** Contexte d'une activité d'intégration, placé avant la question. */
export const ctx = (story: string, spec: ExerciseSpec): ExerciseSpec =>
  "qcm" in spec && spec.qcm ? { ...spec, qcm: `${story}<br>${spec.qcm}` } : "num" in spec && spec.num ? { ...spec, num: `${story}<br>${spec.num}` } : spec;

const F = "eleve-fille" as const;
const G = "eleve-garcon" as const;

export const SETS_CI: ExerciseSeries[] = [
  series(1, "former un ensemble, appartenir ou non", [
    intruder(["mangue", "orange", "crayon", "banane"], "fruit"),
    countIn(["mangue", "mangue", "orange", "mangue"], "mangue"),
    intruder(["cahier", "crayon", "banane", "cahier"], "fourniture"),
    countIn(["crayon", "cahier", "crayon", "crayon", "cahier"], "cahier"),
    intruder([F, G, "ballon", F], "enfant"),
    countIn(["banane", "orange", "banane", "banane", "banane", "orange"], "banane"),
    vf("Un ensemble se dessine avec une ligne fermée.", true, "on entoure les objets de l’ensemble par une ligne fermée."),
    vf("Une mangue appartient à l’ensemble des fournitures scolaires.", false, "la mangue est un fruit, pas une fourniture scolaire."),
  ]),
  series(2, "les sous-ensembles", [
    countIn([F, G, F, G, F], F),
    countIn([F, G, F, G, F], G),
    countIn([G, G, F, G, F, G, G], G),
    countIn([G, G, F, G, F, G, G], F),
    countIn(["orange", "mangue", "orange", "orange", "mangue", "orange"], "orange"),
    countIn(["ballon", "bonbon", "bonbon", "ballon", "bonbon"], "ballon"),
    vf("Les filles de la classe forment un sous-ensemble de la classe.", true, "toutes les filles sont dans la classe : c’est une partie de l’ensemble."),
    vf("Un sous-ensemble a toujours plus d’objets que l’ensemble.", false, "un sous-ensemble est une partie de l’ensemble : il n’en a jamais plus."),
  ]),
  series(3, "peu, beaucoup, rien", [
    quantity([9, 2, 0], "beaucoup"),
    quantity([0, 8, 3], "peu"),
    quantity([1, 0, 10], "rien"),
    quantity([3, 9, 0], "beaucoup"),
    quantity([7, 0, 2], "rien"),
    quantity([0, 1, 9], "peu"),
    vf("Un bol vide n’a rien dedans.", true, "vide veut dire qu’il n’y a rien."),
    vf("Deux billes, c’est beaucoup de billes.", false, "deux billes, c’est peu."),
  ]),
  series(4, "classer par forme et par couleur", [
    shapeSet(["carré-noir", "rond-blanc", "carré-blanc", "triangle-noir", "carré-noir", "rond-noir"], { shape: "carré" }),
    shapeSet(["carré-noir", "rond-blanc", "carré-blanc", "triangle-noir", "carré-noir", "rond-noir"], { color: "noir" }),
    shapeSet(["rond-blanc", "rond-noir", "triangle-blanc", "rond-blanc", "triangle-blanc"], { shape: "rond" }),
    shapeSet(["rond-blanc", "rond-noir", "triangle-blanc", "rond-blanc", "triangle-blanc"], { color: "blanc" }),
    shapeSet(["triangle-noir", "carré-blanc", "triangle-noir", "triangle-blanc", "rond-noir", "carré-noir", "triangle-noir"], { shape: "triangle" }),
    shapeSet(["triangle-noir", "carré-blanc", "triangle-noir", "triangle-blanc", "rond-noir", "carré-noir", "triangle-noir"], { color: "blanc" }),
    vf("On peut classer des objets selon leur forme ou selon leur couleur.", true, "la forme et la couleur sont deux façons de classer."),
    vf("Un rond noir et un rond blanc ont la même forme.", true, "ce sont deux ronds : seule la couleur change."),
  ]),
  series(5, "former des sous-ensembles", [
    shapeSet(["rond-noir", "carré-noir", "rond-blanc", "carré-blanc"], { shape: "rond" }),
    shapeSet(["rond-noir", "carré-noir", "rond-blanc", "carré-blanc"], { color: "noir" }),
    shapeSet(["triangle-blanc", "rond-noir", "triangle-noir", "triangle-blanc", "rond-blanc", "carré-noir"], { shape: "triangle" }),
    shapeSet(["triangle-blanc", "rond-noir", "triangle-noir", "triangle-blanc", "rond-blanc", "carré-noir"], { color: "blanc" }),
    shapeSet(["carré-blanc", "carré-blanc", "rond-noir", "carré-noir", "triangle-blanc", "carré-blanc", "rond-blanc", "carré-noir"], { shape: "carré" }),
    shapeSet(["carré-blanc", "carré-blanc", "rond-noir", "carré-noir", "triangle-blanc", "carré-blanc", "rond-blanc", "carré-noir"], { color: "noir" }),
    countIn([F, F, G, F, G, G, G, F, G], F),
    countIn(["bonbon", "crayon", "bonbon", "bonbon", "crayon", "bonbon", "bonbon"], "bonbon"),
  ]),
  series(6, "plus que, moins que", [
    compareSets([rep("banane", 5), rep("banane", 3)], "plus", "bananes"),
    compareSets([rep("orange", 2), rep("orange", 4)], "moins", "oranges"),
    moreWord(["banane", 4], ["orange", 2]),
    moreWord(["orange", 3], ["mangue", 5]),
    compareSets([rep("mangue", 6), rep("mangue", 7)], "plus", "mangues"),
    moreWord(["bonbon", 3], ["crayon", 3]),
    compareSets([rep("bonbon", 4), rep("bonbon", 1)], "moins", "bonbons"),
    moreWord(["crayon", 2], ["cahier", 4]),
  ]),
  series(7, "autant que", [
    compareSets([rep("orange", 3), rep("orange", 5), rep("orange", 2), rep("orange", 4)], "plus", "oranges"),
    sameSets([rep("banane", 4), rep("banane", 2), rep("banane", 4), rep("banane", 5)], "bananes"),
    compareSets([rep("banane", 6), rep("banane", 3), rep("banane", 4), rep("banane", 5)], "moins", "bananes"),
    sameSets([rep("mangue", 3), rep("mangue", 5), rep("mangue", 1), rep("mangue", 5)], "mangues"),
    compareSets([rep("ballon", 2), rep("ballon", 4), rep("ballon", 7), rep("ballon", 3)], "plus", "ballons"),
    sameSets([rep("crayon", 2), rep("crayon", 2), rep("crayon", 3)], "crayons"),
    moreWord(["ballon", 4], ["bonbon", 4]),
    compareSets([rep("cahier", 5), rep("cahier", 2), rep("cahier", 3)], "moins", "cahiers"),
  ]),
  series(8, "comparer et compléter des ensembles", [
    toSame("orange", 5, 3),
    toSame("banane", 4, 1),
    moreWord(["banane", 2], ["orange", 5]),
    toSame("mangue", 6, 4),
    moreWord(["orange", 6], ["banane", 3]),
    toSame("crayon", 7, 2),
    moreWord(["cahier", 5], ["crayon", 5]),
    toSame("bonbon", 8, 5),
  ]),
  series(9, "révision : ensembles et sous-ensembles", [
    shapeSet(["rond-noir", "triangle-blanc", "rond-noir", "carré-blanc", "rond-blanc"], { shape: "rond" }),
    quantity([0, 10, 2], "beaucoup"),
    compareSets([rep("orange", 4), rep("orange", 6)], "moins", "oranges"),
    compareSets([rep("banane", 3), rep("banane", 1), rep("banane", 6), rep("banane", 4)], "plus", "bananes"),
    sameSets([rep("mangue", 2), rep("mangue", 4), rep("mangue", 2), rep("mangue", 3)], "mangues"),
    toSame("ballon", 5, 2),
    intruder(["orange", "banane", "mangue", "ballon"], "fruit"),
    moreWord(["mangue", 3], ["banane", 6]),
  ]),
  series(10, "activités d’intégration", [
    ctx("Après la kermesse de l’école, Sidi range ce qu’il a gagné.", countIn(["bonbon", "crayon", "bonbon", "bonbon", "crayon", "bonbon"], "bonbon")),
    ctx("Après la kermesse de l’école, Sidi range ce qu’il a gagné.", countIn(["bonbon", "crayon", "bonbon", "bonbon", "crayon", "bonbon"], "crayon")),
    ctx("Voici ce que Sidi a gagné.", moreWord(["crayon", 2], ["bonbon", 4])),
    ctx("Au marché, Fatou achète des fruits.", countIn(["orange", "banane", "orange", "banane", "banane"], "orange")),
    ctx("Voici les fruits de Fatou.", moreWord(["banane", 3], ["orange", 2])),
    ctx("A est le panier de Fatou, B celui de Modou.", compareSets([rep("mangue", 5), rep("mangue", 3)], "plus", "mangues")),
    ctx("Ibrahima et Aminata comparent leurs cahiers : A pour Ibrahima, B pour Aminata.", toSame("cahier", 6, 4)),
    ctx("Aminata range ses affaires.", intruder(["cahier", "crayon", "bonbon", "crayon"], "fourniture")),
  ]),
];
