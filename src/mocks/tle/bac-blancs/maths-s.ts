import "server-only";

// Bac blanc DIANGAL n°1, mathématiques des séries S2, S4 et S5 : forme de l'épreuve de l'Office du Bac
// (4 heures ; exercice 1 sur 4 points, exercice 2 sur 6 points, problème sur 10 points). Énoncés et
// corrigés rédigés par DIANGAL ; chaque résultat est recalculé par tests/unit/bac-blancs.test.ts.

import type { MockExamSpec } from "../../exercise-series";
import { head, reading } from "../../cm2/cfee/helpers";

export const MATHS_S: Omit<MockExamSpec, "series">[] = [
  {
    id: "bac-blanc-1-maths-s",
    subject: "MATH",
    title: "Bac blanc DIANGAL n°1 : mathématiques",
    durationMin: 240,
    parts: [
      {
        chapter: "Nombres complexes",
        stem:
          head("Exercice 1", 4) +
          reading(
            "Le plan complexe est muni d’un repère orthonormé direct (O ; u, v) d’unité 2 cm.",
            "On considère le polynôme P défini pour tout nombre complexe z par : P(z) = z³ − (2 + i)z² + (5 + 2i)z − 5i.",
          ),
        questions: [
          {
            vf: "1. a. Le nombre i est une solution de l’équation P(z) = 0.",
            answer: true,
            pts: 0.5,
            why: "P(i) = i³ − (2 + i)i² + (5 + 2i)i − 5i = −i + (2 + i) + (5i − 2) − 5i = 0. Donc i est solution.",
          },
          {
            qcm: "1. b. On admet que P(z) = (z − i)(z² − 2z + 5). L’ensemble des solutions de P(z) = 0 dans ℂ est :",
            choices: ["{i ; 2 + i ; 2 − i}", "*{i ; 1 + 2i ; 1 − 2i}", "{i ; −1 + 2i ; −1 − 2i}", "{−i ; 1 + 2i ; 1 − 2i}"],
            pts: 1.5,
            why: "Pour z² − 2z + 5 = 0 : Δ = 4 − 20 = −16 = (4i)². Les solutions sont (2 + 4i)/2 = 1 + 2i et 1 − 2i. Avec i, l’ensemble est {i ; 1 + 2i ; 1 − 2i}.",
          },
          {
            qcm: "2. On note B et C les points d’affixes zB = 1 + 2i et zC = 1 − 2i. Le triangle OBC est :",
            choices: ["équilatéral", "*isocèle en O", "rectangle en O", "rectangle en B"],
            pts: 0.5,
            why: "OB = |1 + 2i| = √5 et OC = |1 − 2i| = √5 : OB = OC. BC = |zC − zB| = |−4i| = 4. Comme 5 + 5 ≠ 16, le triangle n’est pas rectangle en O : il est isocèle en O.",
          },
          {
            qcm: "3. a. Soit r la rotation de centre O et d’angle π/2. Son écriture complexe est :",
            choices: ["z′ = −iz", "*z′ = iz", "z′ = z + i", "z′ = iz + 1"],
            pts: 0.5,
            why: "Une rotation de centre O et d’angle θ a pour écriture complexe z′ = e^(iθ) z. Ici e^(iπ/2) = i, donc z′ = iz.",
          },
          {
            num: "3. b. Soit D l’image de B par r. Quelle est la partie réelle de l’affixe zD ?",
            answer: -2,
            pts: 0.5,
            why: "zD = i × zB = i(1 + 2i) = i + 2i² = −2 + i. La partie réelle est −2.",
          },
          {
            self: "4. Figure (0,5 point) : place les points B, C et D dans le repère.",
            pts: 0.5,
            why: "Avec une unité de 2 cm : B(1 ; 2) à 2 cm à droite et 4 cm au-dessus de O ; C(1 ; −2), symétrique de B par rapport à l’axe des réels ; D(−2 ; 1), à 4 cm à gauche et 2 cm au-dessus de O. On vérifie que OD = OB = √5 et que l’angle (OB, OD) est droit.",
          },
        ],
      },
      {
        chapter: "Probabilités",
        stem:
          head("Exercice 2", 6) +
          reading(
            "Pour animer la kermesse de son lycée à Kaolack, le foyer place dans un sac 5 jetons verts numérotés de 1 à 5 et 3 jetons jaunes numérotés de 1 à 3. Un joueur tire en même temps deux jetons au hasard.",
            "— Si les deux jetons sont verts, il gagne autant de points que la somme de leurs numéros.",
            "— Si les deux jetons sont jaunes, il gagne autant de points que la valeur absolue de la différence de leurs numéros.",
            "— Si les deux jetons sont de couleurs différentes, il ne gagne rien. On note X le nombre de points gagnés.",
          ),
        questions: [
          {
            num: "1. Calcule la probabilité de tirer deux jetons de même couleur (arrondie au centième).",
            answer: 0.46,
            pts: 1,
            why: "Il y a C(8 ; 2) = 28 tirages équiprobables. Deux verts : C(5 ; 2) = 10 ; deux jaunes : C(3 ; 2) = 3. P = 13/28 ≈ 0,46.",
          },
          {
            num: "2. Combien de valeurs différentes X peut-il prendre ?",
            answer: 10,
            pts: 1,
            why: "Deux verts : sommes 3, 4, 5, 6, 7, 8, 9. Deux jaunes : différences 1 et 2. Couleurs différentes : 0. X prend donc les valeurs 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, soit 10 valeurs.",
          },
          {
            num: "3. Calcule P(X = 7), arrondie au centième.",
            answer: 0.07,
            pts: 1,
            why: "X = 7 seulement avec deux verts de somme 7 : {2 ; 5} et {3 ; 4}, soit 2 tirages. P(X = 7) = 2/28 = 1/14 ≈ 0,07.",
          },
          {
            num: "4. Calcule l’espérance mathématique E(X), arrondie au centième.",
            answer: 2.29,
            pts: 1.5,
            why: "La somme des points de tous les tirages vaut 60 pour les 10 paires vertes (3 + 4 + 5 + 6 + 5 + 6 + 7 + 7 + 8 + 9) et 4 pour les 3 paires jaunes (1 + 2 + 1). E(X) = 64/28 = 16/7 ≈ 2,29.",
          },
          {
            num: "5. Le joueur joue trois fois (les jetons sont remis dans le sac). Calcule la probabilité qu’il tire au moins une fois deux jetons de même couleur (arrondie au centième).",
            answer: 0.85,
            pts: 1.5,
            why: "Les trois parties sont indépendantes. La probabilité de ne jamais tirer deux jetons de même couleur est (15/28)³ ≈ 0,154. La probabilité cherchée vaut 1 − (15/28)³ ≈ 0,85.",
          },
        ],
      },
      {
        chapter: "Équations différentielles",
        stem: head("Problème", 10) + reading("<strong>Partie A</strong>. On considère l’équation différentielle (E) : y″ − 3y′ + 2y = 0."),
        questions: [
          {
            qcm: "1. Les solutions de (E) sont les fonctions définies sur ℝ par (A et B réels) :",
            choices: ["y = A eˣ + B e⁻²ˣ", "*y = A eˣ + B e²ˣ", "y = (Ax + B) eˣ", "y = A e⁻ˣ + B e⁻²ˣ"],
            pts: 0.75,
            why: "L’équation caractéristique r² − 3r + 2 = 0 a pour racines r = 1 et r = 2. Les solutions sont y = A eˣ + B e²ˣ.",
          },
          {
            qcm: "2. La solution g de (E) qui vérifie g(0) = 0 et g′(0) = 1 est :",
            choices: ["g(x) = eˣ − e²ˣ", "*g(x) = e²ˣ − eˣ", "g(x) = x eˣ", "g(x) = 2e²ˣ − eˣ"],
            pts: 1.25,
            why: "g(0) = A + B = 0 et g′(0) = A + 2B = 1 donnent B = 1 et A = −1 : g(x) = e²ˣ − eˣ.",
          },
        ],
      },
      {
        chapter: "Fonction exponentielle et fonctions puissances",
        stem: reading(
          "<strong>Partie B</strong>. Soit f la fonction définie sur ℝ par f(x) = e²ˣ − eˣ, et (C) sa courbe dans un repère orthonormé d’unité 2 cm.",
        ),
        questions: [
          {
            qcm: "1. La limite de f en −∞ est :",
            choices: ["−∞", "*0 : la droite d’équation y = 0 est asymptote à (C) en −∞", "1", "+∞"],
            pts: 0.5,
            why: "En −∞, eˣ et e²ˣ tendent vers 0, donc f(x) tend vers 0 : l’axe des abscisses est asymptote à (C) en −∞.",
          },
          {
            qcm: "2. Pour tout réel x, f′(x) est égal à :",
            choices: ["e²ˣ − eˣ", "2eˣ − 1", "*eˣ(2eˣ − 1)", "2e²ˣ + eˣ"],
            pts: 1,
            why: "f′(x) = 2e²ˣ − eˣ = eˣ(2eˣ − 1). Comme eˣ > 0, f′(x) a le signe de 2eˣ − 1, qui s’annule en x = −ln 2.",
          },
          {
            num: "3. f admet un minimum en x₀ = −ln 2. Donne une valeur approchée de x₀ au centième.",
            answer: -0.69,
            pts: 0.75,
            why: "2eˣ − 1 = 0 ⇔ eˣ = 1/2 ⇔ x = ln(1/2) = −ln 2 ≈ −0,69. f′ est négative avant, positive après : c’est un minimum.",
          },
          {
            num: "4. Calcule la valeur exacte du minimum f(−ln 2) (écris-la en nombre décimal).",
            answer: -0.25,
            pts: 1,
            why: "e^(−ln 2) = 1/2, donc f(−ln 2) = (1/2)² − 1/2 = 1/4 − 1/2 = −1/4 = −0,25.",
          },
          {
            qcm: "5. Une équation de la tangente (T) à (C) au point d’abscisse 0 est :",
            choices: ["y = 0", "*y = x", "y = 2x", "y = x − 1"],
            pts: 0.75,
            why: "f(0) = 1 − 1 = 0 et f′(0) = 2 − 1 = 1 : (T) a pour équation y = 1 × (x − 0) + 0, soit y = x.",
          },
          {
            qcm: "6. En +∞, la courbe (C) admet :",
            choices: ["une asymptote horizontale", "une asymptote oblique", "*une branche parabolique de direction (Oy)", "une asymptote verticale"],
            pts: 0.5,
            why: "f(x) → +∞ et f(x)/x = eˣ(eˣ − 1)/x → +∞ quand x → +∞ : (C) a une branche parabolique de direction l’axe des ordonnées.",
          },
          {
            qcm: "7. Soit h la restriction de f à [−ln 2 ; +∞[. h réalise une bijection de [−ln 2 ; +∞[ sur :",
            choices: ["ℝ", "[0 ; +∞[", "*[−1/4 ; +∞[", "]−1/4 ; 0]"],
            pts: 0.5,
            why: "Sur [−ln 2 ; +∞[, f est continue et strictement croissante, de f(−ln 2) = −1/4 jusqu’à +∞ : h est une bijection sur [−1/4 ; +∞[.",
          },
          {
            self: "8. Tracé (1 point) : dresse le tableau de variations de f, puis trace (T) et (C).",
            pts: 1,
            why: "<ul><li>Tableau : f décroît sur ]−∞ ; −ln 2], de 0 (limite) jusqu’à −1/4, puis croît sur [−ln 2 ; +∞[ jusqu’à +∞.</li><li>Points utiles : (−ln 2 ; −0,25), (0 ; 0) avec la tangente y = x, (ln 2 ; 2) car f(ln 2) = 4 − 2 = 2.</li><li>La courbe se rapproche de l’axe des abscisses vers la gauche (sous l’axe) et monte très vite vers la droite.</li></ul>",
          },
        ],
      },
      {
        chapter: "Calcul intégral",
        stem: reading("<strong>Partie C</strong>. Pour tout entier naturel n ≥ 1, on pose Iₙ = ∫ de 0 à ln 2 de e^(nx) dx."),
        questions: [
          {
            num: "1. Calcule, en cm², l’aire du domaine compris entre (C), l’axe des abscisses et les droites d’équations x = 0 et x = ln 2.",
            answer: 2,
            pts: 1,
            why: "Sur [0 ; ln 2], f(x) ≥ 0. Aire = ∫ de 0 à ln 2 de (e²ˣ − eˣ) dx = [e²ˣ/2 − eˣ] = (2 − 2) − (1/2 − 1) = 1/2 unité d’aire. Une unité d’aire vaut 2 cm × 2 cm = 4 cm² : l’aire est 2 cm².",
          },
          {
            num: "2. Montre que Iₙ = (2ⁿ − 1)/n, puis calcule I₃ (arrondi au centième).",
            answer: 2.33,
            pts: 1,
            why: "Iₙ = [e^(nx)/n] de 0 à ln 2 = (e^(n ln 2) − 1)/n = (2ⁿ − 1)/n. Donc I₃ = (8 − 1)/3 = 7/3 ≈ 2,33. On retrouve l’aire de la question 1 : I₂ − I₁ = 3/2 − 1 = 1/2.",
          },
        ],
      },
    ],
  },
];
