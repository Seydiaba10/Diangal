import "server-only";

// Exercices corrigés de mathématiques de Terminale, par titre de chapitre (un même chapitre peut
// exister dans plusieurs séries). Écrits par DIANGAL d’après les leçons, à faire relire.

import type { ExerciseSpec } from "../exercise-series";

export const MATH_TLE_EXERCISES: Record<string, ExerciseSpec[]> = {
  // ── Séries S ──────────────────────────────────────────────────────────────
  Probabilités: [
    { num: "Une urne contient 3 boules rouges et 2 vertes. On tire 2 boules simultanément. Combien y a-t-il de tirages possibles ?", answer: 10, why: "C(5, 2) = 5 × 4 ÷ 2 = 10." },
    { qcm: "p(A) = 0,5, p(B) = 0,4 et p(A ∩ B) = 0,2. Alors p(A ∪ B) vaut…", choices: ["0,9", "*0,7", "0,2"], why: "p(A ∪ B) = 0,5 + 0,4 − 0,2 = 0,7." },
    { vf: "Avec p(A) = 0,5, p(B) = 0,4 et p(A ∩ B) = 0,2, les événements A et B sont indépendants.", answer: true, why: "p(A) × p(B) = 0,2 = p(A ∩ B)." },
    { qcm: "X suit la loi binomiale B(10 ; 0,3). Son espérance vaut…", choices: ["0,3", "*3", "2,1"], why: "E(X) = np = 10 × 0,3 = 3." },
  ],
  "Nombres complexes": [
    { qcm: "La forme algébrique de (1 + i)² est…", choices: ["2", "*2i", "1 + i²"], why: "(1 + i)² = 1 + 2i + i² = 2i." },
    { num: "Calcule le module de 3 + 4i.", answer: 5, why: "|3 + 4i| = √(9 + 16) = 5." },
    { qcm: "Les solutions de z² + 4 = 0 sont…", choices: ["2 et −2", "*2i et −2i", "4i et −4i"], why: "z² = −4 = (2i)², donc z = 2i ou z = −2i." },
    { vf: "Un argument de i est π/2.", answer: true, why: "i a pour image le point (0 ; 1), sur l’axe des ordonnées, du côté positif." },
  ],
  Arithmétique: [
    { num: "Calcule PGCD(84 ; 60).", answer: 12, why: "84 = 1 × 60 + 24 ; 60 = 2 × 24 + 12 ; 24 = 2 × 12 : le PGCD est 12." },
    { num: "Quel est le reste de la division de 2¹⁰ par 7 ?", answer: 2, why: "2³ = 8 ≡ 1 [7], donc 2⁹ ≡ 1 et 2¹⁰ ≡ 2 [7]." },
    { qcm: "En base 2, le nombre 13 s’écrit…", choices: ["1011", "*1101", "1110"], why: "13 = 8 + 4 + 1 = 1101 en base 2." },
    { vf: "L’équation 6x + 9y = 1 a des solutions entières.", answer: false, why: "PGCD(6 ; 9) = 3 ne divise pas 1." },
  ],
  "Suites numériques": [
    { num: "(u<sub>n</sub>) est arithmétique de premier terme u<sub>0</sub> = 2 et de raison 3. Calcule u<sub>10</sub>.", answer: 32, why: "u<sub>10</sub> = u<sub>0</sub> + 10r = 2 + 30 = 32." },
    { qcm: "La suite géométrique de raison 0,5 et de premier terme 8…", choices: ["tend vers +∞", "*converge vers 0", "n’a pas de limite"], why: "−1 &lt; 0,5 &lt; 1, donc 0,5<sup>n</sup> tend vers 0." },
    { vf: "Une suite croissante et majorée converge.", answer: true, why: "C’est le théorème de convergence des suites monotones." },
  ],
  "Limites et continuité": [
    { num: "Calcule la limite en +∞ de (3x² + 1) ÷ (x² − 2).", answer: 3, why: "On garde les termes de plus haut degré : 3x² ÷ x² = 3." },
    { qcm: "La limite en 2 de (x² − 4) ÷ (x − 2) vaut…", choices: ["0", "*4", "+∞"], why: "(x² − 4) ÷ (x − 2) = x + 2 pour x ≠ 2, qui tend vers 4." },
    { vf: "Une fonction polynôme est continue sur ℝ.", answer: true, why: "Les polynômes sont continus en tout point." },
  ],
  "Dérivation et étude de fonctions": [
    { qcm: "La dérivée de f(x) = (2x + 1)³ est…", choices: ["3(2x + 1)²", "*6(2x + 1)²", "(2x + 1)²"], why: "(u³)’ = 3u’u² avec u’ = 2." },
    { vf: "Si f’’ s’annule en changeant de signe en x₀, la courbe a un point d’inflexion en x₀.", answer: true, why: "C’est le critère du point d’inflexion." },
    { qcm: "La dérivée n-ième de x ↦ e<sup>2x</sup> est…", choices: ["e<sup>2x</sup>", "*2<sup>n</sup> e<sup>2x</sup>", "2n e<sup>2x</sup>"], why: "Chaque dérivation multiplie par 2." },
  ],
  "Fonction logarithme népérien": [
    { qcm: "ln 8 est égal à…", choices: ["8 ln 1", "*3 ln 2", "ln 4 + ln 4"], why: "8 = 2³, donc ln 8 = 3 ln 2." },
    { num: "Résous ln(x − 1) = ln 5. Quelle est la valeur de x ?", answer: 6, why: "x − 1 = 5 avec x &gt; 1, donc x = 6." },
    { vf: "ln x &lt; 0 pour tout x de ]0 ; 1[.", answer: true, why: "ln est croissante et ln 1 = 0." },
    { qcm: "La dérivée de ln(x² + 1) est…", choices: ["1 ÷ (x² + 1)", "*2x ÷ (x² + 1)", "2x ln(x² + 1)"], why: "(ln u)’ = u’ ÷ u avec u’ = 2x." },
  ],
  "Fonctions exponentielles et puissances": [
    { qcm: "e<sup>ln 5</sup> vaut…", choices: ["ln 5", "*5", "e⁵"], why: "exp et ln sont réciproques : e<sup>ln x</sup> = x." },
    { qcm: "La dérivée de e<sup>3x</sup> est…", choices: ["e<sup>3x</sup>", "*3e<sup>3x</sup>", "3x e<sup>3x − 1</sup>"], why: "(e<sup>u</sup>)’ = u’e<sup>u</sup> avec u’ = 3." },
    { vf: "La limite de x e<sup>−x</sup> en +∞ est 0.", answer: true, why: "Croissances comparées : l’exponentielle l’emporte." },
  ],
  "Calcul intégral": [
    { num: "Calcule l’intégrale de 0 à 2 de 2x dx.", answer: 4, why: "[x²] de 0 à 2 = 4 − 0 = 4." },
    { qcm: "Une primitive de 1 ÷ x sur ]0 ; +∞[ est…", choices: ["−1 ÷ x²", "*ln x", "e<sup>x</sup>"], why: "(ln x)’ = 1 ÷ x." },
    { vf: "Si f est positive sur [a ; b] (a &lt; b), son intégrale de a à b est positive.", answer: true, why: "C’est la positivité de l’intégrale." },
  ],
  "Équations différentielles": [
    { qcm: "Les solutions de y’ = 2y sont…", choices: ["y = 2e<sup>x</sup>", "*y = Ce<sup>2x</sup>", "y = Cx²"], why: "Les solutions de y’ = ay sont Ce<sup>ax</sup>." },
    { num: "f vérifie f’ = −f et f(0) = 4. Calcule f(ln 2).", answer: 2, why: "f(x) = 4e<sup>−x</sup>, donc f(ln 2) = 4 ÷ e<sup>ln 2</sup> = 4 ÷ 2 = 2." },
    { qcm: "Les solutions de y’’ + 9y = 0 sont de la forme…", choices: ["Ae<sup>3x</sup> + Be<sup>−3x</sup>", "*A cos 3x + B sin 3x", "(Ax + B)e<sup>3x</sup>"], why: "y’’ + ω²y = 0 avec ω = 3." },
  ],
  "Barycentres et lignes de niveau": [
    { qcm: "Le barycentre de (A, 1) et (B, 1) est…", choices: ["le point A", "*le milieu de [AB]", "le point B"], why: "Avec des coefficients égaux, c’est l’isobarycentre, ici le milieu." },
    { vf: "L’ensemble des points M tels que MA = MB est la médiatrice de [AB].", answer: true, why: "C’est la définition de la médiatrice." },
    { qcm: "L’ensemble des points M tels que MA⃗ · MB⃗ = 0 est…", choices: ["la droite (AB)", "*le cercle de diamètre [AB]", "la médiatrice de [AB]"], why: "MA⃗ · MB⃗ = MI² − AB²/4 = 0 donne MI = AB/2." },
  ],
  "Isométries et similitudes planes": [
    { qcm: "La similitude z’ = 2iz a pour rapport…", choices: ["1", "*2", "2i"], why: "Le rapport est |a| = |2i| = 2." },
    { qcm: "La composée de deux réflexions d’axes parallèles est…", choices: ["une rotation", "*une translation", "une homothétie"], why: "Axes parallèles : translation de vecteur 2u⃗." },
    { vf: "Une similitude de rapport 3 multiplie les aires par 9.", answer: true, why: "Les aires sont multipliées par le carré du rapport." },
  ],
  "Produit vectoriel et produit mixte": [
    { qcm: "i⃗ ∧ j⃗ est égal à…", choices: ["0⃗", "*k⃗", "−k⃗"], why: "Dans un repère orthonormé direct, i⃗ ∧ j⃗ = k⃗." },
    { vf: "Si u⃗ et v⃗ sont colinéaires, u⃗ ∧ v⃗ = 0⃗.", answer: true, why: "La norme fait intervenir sin θ, nul pour θ = 0 ou π." },
    { num: "AB⃗ ∧ AC⃗ a pour norme 10. Quelle est l’aire du triangle ABC ?", answer: 5, why: "Aire = ½ ‖AB⃗ ∧ AC⃗‖ = 5." },
  ],
  "Transformations de l’espace": [
    { qcm: "La composée de deux réflexions de plans sécants selon une droite Δ est…", choices: ["une translation", "*une rotation d’axe Δ", "une homothétie"], why: "Plans sécants : rotation d’axe la droite commune, d’angle double." },
    { vf: "Une homothétie de rapport 2 multiplie les volumes par 8.", answer: true, why: "Les volumes sont multipliés par |k|³ = 8." },
    { qcm: "Un demi-tour d’axe Δ est une rotation d’angle…", choices: ["π/2", "*π", "2π"], why: "Le demi-tour est la rotation d’angle π." },
  ],
  "Courbes paramétrées": [
    { qcm: "x = 3 cos t, y = 3 sin t décrit…", choices: ["une droite", "*un cercle de rayon 3", "une parabole"], why: "x² + y² = 9." },
    { vf: "Le vecteur dérivé (x’(t) ; y’(t)), s’il n’est pas nul, dirige la tangente.", answer: true, why: "C’est le résultat du cours." },
    { qcm: "Pour la cycloïde, la vitesse s’annule quand…", choices: ["t = π", "*t = 2kπ", "jamais"], why: "‖v⃗‖ = 2a|sin(t/2)| est nul pour t = 2kπ." },
  ],
  Coniques: [
    { qcm: "Une conique d’excentricité e = 1 est…", choices: ["une ellipse", "*une parabole", "une hyperbole"], why: "e &lt; 1 ellipse, e = 1 parabole, e &gt; 1 hyperbole." },
    { num: "Pour l’ellipse x²/25 + y²/16 = 1, calcule c (distance du centre à un foyer).", answer: 3, why: "c = √(25 − 16) = 3." },
    { qcm: "Les asymptotes de x²/4 − y²/9 = 1 sont…", choices: ["y = ±(2/3)x", "*y = ±(3/2)x", "y = ±9x"], why: "y = ±(b/a)x avec a = 2 et b = 3." },
  ],
  // ── Série S2 ──────────────────────────────────────────────────────────────
  "Limites, continuité et fonction réciproque": [
    { num: "Calcule la limite en +∞ de (2x + 5) ÷ (x − 1).", answer: 2, why: "2x ÷ x = 2." },
    { vf: "Une fonction continue et strictement croissante sur un intervalle I réalise une bijection de I sur f(I).", answer: true, why: "C’est le théorème de la bijection." },
    { qcm: "Si f(x) = x + 2 + 1 ÷ x, l’asymptote oblique en +∞ est…", choices: ["y = x", "*y = x + 2", "y = 2"], why: "f(x) − (x + 2) = 1 ÷ x tend vers 0." },
  ],
  "Dérivées et primitives": [
    { qcm: "Une primitive de 3x² + 2 est…", choices: ["6x", "*x³ + 2x", "x³ + 2"], why: "(x³ + 2x)’ = 3x² + 2." },
    { qcm: "La dérivée de √(x² + 1) est…", choices: ["1 ÷ (2√(x² + 1))", "*x ÷ √(x² + 1)", "2x √(x² + 1)"], why: "(√u)’ = u’ ÷ (2√u) = 2x ÷ (2√(x² + 1))." },
    { vf: "Deux primitives d’une même fonction sur un intervalle diffèrent d’une constante.", answer: true, why: "Les primitives sont les F + C." },
  ],
  "Fonction exponentielle et fonctions puissances": [
    { num: "Résous e<sup>x</sup> = 1. Quelle est la valeur de x ?", answer: 0, why: "e<sup>0</sup> = 1 et exp est strictement croissante." },
    { qcm: "Une primitive de e<sup>2x</sup> est…", choices: ["2e<sup>2x</sup>", "*½ e<sup>2x</sup>", "e<sup>2x</sup>"], why: "(½ e<sup>2x</sup>)’ = e<sup>2x</sup>." },
    { vf: "Pour tout réel x, e<sup>x</sup> &gt; 0.", answer: true, why: "L’exponentielle est toujours strictement positive." },
  ],
  "Statistiques à deux variables": [
    { qcm: "La droite de régression de y en x passe toujours par…", choices: ["l’origine", "*le point moyen G(x̄ ; ȳ)", "le premier point du nuage"], why: "b = ȳ − a x̄ : G est sur la droite." },
    { vf: "Un coefficient de corrélation r = −0,95 indique une forte corrélation.", answer: true, why: "|r| est proche de 1 ; y diminue quand x augmente." },
    { num: "cov(x, y) = 6 et V(x) = 3. Calcule le coefficient directeur a de la droite de régression de y en x.", answer: 2, why: "a = cov(x, y) ÷ V(x) = 6 ÷ 3 = 2." },
  ],
  "Nombres complexes et similitudes": [
    { qcm: "La transformation z’ = z + 3 − i est…", choices: ["une rotation", "*une translation", "une homothétie"], why: "z’ = z + b : translation de vecteur d’affixe b." },
    { num: "La similitude z’ = (1 + i)z a pour centre le point d’affixe…", answer: 0, why: "ω = b ÷ (1 − a) avec b = 0, donc ω = 0." },
    { qcm: "L’angle de la similitude z’ = iz + 1 est…", choices: ["0", "*π/2", "π"], why: "θ = arg i = π/2." },
  ],
  // ── Séries L ──────────────────────────────────────────────────────────────
  "Composition et factorisation des polynômes": [
    { qcm: "f(x) = x + 1 et g(x) = x². Alors (g ∘ f)(x) =", choices: ["x² + 1", "*(x + 1)²", "x³ + x²"], why: "On applique f puis g : g(x + 1) = (x + 1)²." },
    { num: "P(x) = x³ − 6x² + 11x − 6. Calcule P(1).", answer: 0, why: "1 − 6 + 11 − 6 = 0 : P est divisible par (x − 1)." },
    { vf: "Si P(2) = 0, alors (x − 2) est un facteur de P(x).", answer: true, why: "C’est la propriété de factorisation." },
  ],
  "Dénombrement et probabilités": [
    { num: "Combien de codes de 3 chiffres (de 0 à 9) peut-on former ?", answer: 1000, why: "10 × 10 × 10 = 1000." },
    { qcm: "On lance un dé équilibré. La probabilité d’obtenir un multiple de 3 est…", choices: ["1/6", "*1/3", "1/2"], why: "3 et 6 : 2 issues sur 6." },
    { num: "card A = 12, card B = 8 et card(A ∩ B) = 5. Calcule card(A ∪ B).", answer: 15, why: "12 + 8 − 5 = 15." },
  ],
  "Statistique : ajustement linéaire": [
    { vf: "Plus |r| est proche de 1, plus l’ajustement linéaire est justifié.", answer: true, why: "r mesure la qualité de la corrélation linéaire." },
    { num: "La droite de régression est y = 2x + 3. Quelle prévision donne-t-elle pour x = 5 ?", answer: 13, why: "y = 2 × 5 + 3 = 13." },
    { qcm: "Le point moyen du nuage (1 ; 2), (3 ; 4), (5 ; 6) est…", choices: ["(1 ; 2)", "*(3 ; 4)", "(9 ; 12)"], why: "x̄ = 9 ÷ 3 = 3 et ȳ = 12 ÷ 3 = 4." },
  ],
  Dérivabilité: [
    { num: "f(x) = x² + 3x. Calcule f’(1).", answer: 5, why: "f’(x) = 2x + 3, donc f’(1) = 5." },
    { qcm: "Si f’(x) &gt; 0 sur un intervalle, f y est…", choices: ["décroissante", "*croissante", "constante"], why: "Une dérivée positive indique une fonction croissante." },
    { qcm: "La tangente en 0 à la courbe de f(x) = x² + x a pour équation…", choices: ["y = x²", "*y = x", "y = 2x"], why: "f(0) = 0 et f’(0) = 1, donc y = x." },
  ],
  "Étude de fonctions": [
    { vf: "La courbe d’une fonction paire est symétrique par rapport à l’axe des ordonnées.", answer: true, why: "f(−x) = f(x)." },
    { qcm: "f(x) = (2x + 1) ÷ (x − 3) a pour asymptote verticale…", choices: ["x = −1/2", "*x = 3", "y = 2"], why: "Le dénominateur s’annule en 3." },
    { qcm: "|x − 2| vaut, pour x &lt; 2 :", choices: ["x − 2", "*2 − x", "x + 2"], why: "x − 2 &lt; 0, on prend son opposé." },
  ],
  "Fonction exponentielle": [
    { qcm: "e<sup>a</sup> × e<sup>b</sup> =", choices: ["e<sup>ab</sup>", "*e<sup>a + b</sup>", "e<sup>a</sup> + e<sup>b</sup>"], why: "C’est la propriété fondamentale de l’exponentielle." },
    { num: "Résous ln(e<sup>x</sup>) = 4. Quelle est la valeur de x ?", answer: 4, why: "ln(e<sup>x</sup>) = x." },
    { vf: "La fonction exponentielle est strictement croissante sur ℝ.", answer: true, why: "Sa dérivée e<sup>x</sup> est strictement positive." },
  ],
};
