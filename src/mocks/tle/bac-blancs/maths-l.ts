import "server-only";

// Bac blanc DIANGAL n°1, mathématiques des séries L1, L2 et LA : forme de l'épreuve de l'Office du Bac
// (3 heures ; exercice 1 sur 5 points, exercice 2 sur 5 points, problème sur 10 points). Énoncés et
// corrigés rédigés par DIANGAL ; résultats recalculés par tests/unit/bac-blancs.test.ts.

import type { MockExamSpec } from "../../exercise-series";
import { head, reading } from "../../cm2/cfee/helpers";

export const MATHS_L: Omit<MockExamSpec, "series">[] = [
  {
    id: "bac-blanc-1-maths-l",
    subject: "MATH",
    title: "Bac blanc DIANGAL n°1 : mathématiques",
    durationMin: 180,
    parts: [
      {
        chapter: "Dénombrement et probabilités",
        stem:
          head("Exercice 1", 5) +
          reading(
            "Une urne contient 4 boules rouges et 6 boules vertes, indiscernables au toucher. On tire simultanément 3 boules de l’urne.",
            "Les résultats des probabilités seront donnés sous forme décimale, arrondis au centième.",
          ),
        questions: [
          {
            num: "1. Combien y a-t-il de tirages possibles ?",
            answer: 120,
            pts: 1,
            why: "Un tirage simultané de 3 boules parmi 10 est une combinaison : C(10, 3) = (10 × 9 × 8) ÷ (3 × 2 × 1) = 720 ÷ 6 = 120 tirages.",
          },
          {
            num: "2. Calcule la probabilité de l’événement A : « les trois boules sont vertes ».",
            answer: 0.17,
            pts: 1,
            why: "Il y a C(6, 3) = 20 tirages de trois boules vertes. P(A) = 20 ÷ 120 = 1/6 ≈ 0,17.",
          },
          {
            num: "3. Calcule la probabilité de l’événement B : « on tire exactement une boule rouge ».",
            answer: 0.5,
            pts: 1,
            why: "On choisit 1 rouge parmi 4 et 2 vertes parmi 6 : 4 × 15 = 60 tirages. P(B) = 60 ÷ 120 = 0,5.",
          },
          {
            num: "4. Calcule la probabilité de l’événement C : « on tire au moins une boule rouge ».",
            answer: 0.83,
            pts: 1,
            why: "C est l’événement contraire de A : P(C) = 1 − P(A) = 1 − 1/6 = 5/6 ≈ 0,83.",
          },
          {
            num: "5. Soit X le nombre de boules rouges tirées. Calcule l’espérance mathématique E(X).",
            answer: 1.2,
            pts: 1,
            why: "Loi de X : P(X = 0) = 20/120, P(X = 1) = 60/120, P(X = 2) = C(4, 2) × 6 ÷ 120 = 36/120, P(X = 3) = 4/120. E(X) = (0 × 20 + 1 × 60 + 2 × 36 + 3 × 4) ÷ 120 = 144 ÷ 120 = 1,2.",
          },
        ],
      },
      {
        chapter: "Statistique : ajustement linéaire",
        stem:
          head("Exercice 2", 5) +
          reading(
            "Une coopérative de maraîchers des Niayes a relevé sa production d’oignons pendant cinq saisons. On note x le rang de la saison et y la production en tonnes :",
            "x : 1 ; 2 ; 3 ; 4 ; 5. y : 3 ; 5 ; 6 ; 8 ; 9.",
          ),
        questions: [
          {
            num: "1. Calcule la moyenne ȳ de la production.",
            answer: 6.2,
            pts: 0.5,
            why: "ȳ = (3 + 5 + 6 + 8 + 9) ÷ 5 = 31 ÷ 5 = 6,2 tonnes (et x̄ = 15 ÷ 5 = 3).",
          },
          {
            num: "2. Calcule la covariance cov(x, y).",
            answer: 3,
            pts: 1,
            why: "Σxy = 3 + 10 + 18 + 32 + 45 = 108. cov(x, y) = 108 ÷ 5 − 3 × 6,2 = 21,6 − 18,6 = 3.",
          },
          {
            num: "3. La variance de x vaut V(x) = 2. Calcule le coefficient a de la droite de régression de y en x, y = ax + b.",
            answer: 1.5,
            pts: 1,
            why: "V(x) = (1 + 4 + 9 + 16 + 25) ÷ 5 − 3 × 3 = 11 − 9 = 2. a = cov(x, y) ÷ V(x) = 3 ÷ 2 = 1,5.",
          },
          {
            num: "4. Calcule le coefficient b de cette droite.",
            answer: 1.7,
            pts: 1,
            why: "La droite passe par le point moyen G(3 ; 6,2) : b = ȳ − a x̄ = 6,2 − 1,5 × 3 = 1,7. Droite : y = 1,5x + 1,7.",
          },
          {
            vf: "5. Le coefficient de corrélation linéaire vaut environ 0,99 : l’ajustement linéaire est justifié.",
            answer: true,
            pts: 0.5,
            why: "V(y) = (9 + 25 + 36 + 64 + 81) ÷ 5 − 6,2 × 6,2 = 43 − 38,44 = 4,56. r = 3 ÷ √(2 × 4,56) = 3 ÷ √9,12 ≈ 0,99 : la corrélation est très forte.",
          },
          {
            num: "6. Si la tendance se maintient, quelle production peut-on prévoir pour la saison de rang 8, en tonnes ?",
            answer: 13.7,
            pts: 1,
            why: "y = 1,5 × 8 + 1,7 = 13,7 tonnes.",
          },
        ],
      },
      {
        chapter: "Fonction logarithme népérien",
        stem:
          head("Problème", 10) +
          reading(
            "On considère la fonction f définie sur ]0 ; +∞[ par f(x) = x + 1 − 2 ln x. On note (C) sa courbe dans un repère orthonormé d’unité 1 cm.",
            "On donne ln 2 ≈ 0,69 et e ≈ 2,72.",
          ),
        questions: [
          {
            qcm: "1. a. La limite de f en 0 (à droite) est :",
            choices: ["0", "1", "*+∞", "−∞"],
            pts: 0.5,
            why: "Quand x tend vers 0, ln x tend vers −∞, donc −2 ln x tend vers +∞ ; comme x + 1 tend vers 1, f(x) tend vers +∞. L’axe des ordonnées est asymptote à (C).",
          },
          {
            qcm: "1. b. La limite de f en +∞ est :",
            choices: ["0", "*+∞", "−∞", "1"],
            pts: 0.5,
            why: "On écrit f(x) = x(1 + 1/x − 2 ln x / x). Comme ln x / x tend vers 0, la parenthèse tend vers 1 et f(x) tend vers +∞.",
          },
          {
            qcm: "2. a. Pour tout x de ]0 ; +∞[, f′(x) est égal à :",
            choices: ["1 − 2x", "*(x − 2)/x", "(x + 2)/x", "1 − 2 ln x"],
            pts: 1,
            why: "La dérivée de x + 1 est 1, celle de −2 ln x est −2/x. Donc f′(x) = 1 − 2/x = (x − 2)/x.",
          },
          {
            qcm: "2. b. La fonction f est :",
            choices: ["*décroissante sur ]0 ; 2] et croissante sur [2 ; +∞[", "croissante sur ]0 ; 2] et décroissante sur [2 ; +∞[", "croissante sur ]0 ; +∞[", "décroissante sur ]0 ; +∞["],
            pts: 1,
            why: "Sur ]0 ; +∞[, x est positif : f′(x) a le signe de x − 2, négatif avant 2 et positif après.",
          },
          {
            num: "2. c. Calcule le minimum de f, arrondi au centième.",
            answer: 1.61,
            pts: 1,
            why: "Le minimum est atteint en x = 2 : f(2) = 3 − 2 ln 2 ≈ 3 − 1,39 ≈ 1,61.",
          },
          {
            vf: "2. d. Pour tout x de ]0 ; +∞[, f(x) > 0.",
            answer: true,
            pts: 1,
            why: "Le minimum de f vaut environ 1,61, un nombre positif : f(x) ≥ 1,61 > 0 pour tout x. La courbe (C) est au-dessus de l’axe des abscisses.",
          },
          {
            num: "3. a. Calcule f(1).",
            answer: 2,
            pts: 0.5,
            why: "f(1) = 1 + 1 − 2 ln 1 = 2, car ln 1 = 0.",
          },
          {
            qcm: "3. b. Une équation de la tangente (T) à (C) au point d’abscisse 1 est :",
            choices: ["y = x + 1", "*y = −x + 3", "y = −x + 2", "y = 2x"],
            pts: 1,
            why: "f′(1) = (1 − 2)/1 = −1. (T) : y = f′(1)(x − 1) + f(1) = −(x − 1) + 2 = −x + 3.",
          },
          {
            self: "4. Tracé (1,5 point) : tableau de variations complet, tangente (T) et courbe (C) tracées dans le repère.",
            pts: 1.5,
            why: "Tableau : f décroît de +∞ à environ 1,61 sur ]0 ; 2], puis croît de 1,61 à +∞. On place les points (1 ; 2), (2 ; 1,61), (e ; 1,72), (4 ; 2,23), on trace (T) puis la courbe, au-dessus de l’axe des abscisses et qui longe l’axe des ordonnées près de 0.",
          },
          {
            qcm: "5. a. Une primitive de la fonction x ↦ ln x sur ]0 ; +∞[ est :",
            choices: ["x ↦ 1/x", "*x ↦ x ln x − x", "x ↦ x ln x", "x ↦ (ln x)²"],
            pts: 0.5,
            why: "La dérivée de x ln x − x est (ln x + x × 1/x) − 1 = ln x.",
          },
          {
            num: "5. b. Calcule l’aire, en cm², du domaine limité par (C), l’axe des abscisses et les droites d’équations x = 1 et x = e, arrondie au centième.",
            answer: 2.91,
            pts: 1.5,
            why: "f est positive, donc l’aire vaut ∫₁ᵉ f(x) dx = [x²/2 + x − 2(x ln x − x)] de 1 à e = (e²/2 + e − 0) − (1/2 + 1 + 2) = e²/2 + e − 3,5 ≈ 3,69 + 2,72 − 3,5 ≈ 2,91 cm².",
          },
        ],
      },
    ],
  },
];
