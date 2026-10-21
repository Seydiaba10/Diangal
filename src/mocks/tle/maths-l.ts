// Mathématiques de Terminale L : leçons propres aux séries littéraires (programme L de 2006,
// Office du Bac). Les autres leçons sont partagées avec les séries S. Rédigées par DIANGAL, à faire
// valider par un enseignant.

import { erreurs, exemple, exercice, formula, frac, type LessonSpec, liste, methode, objectifs, retenir, sqrt, tableau } from "./blocks";

export const L_COMPOSITION: LessonSpec = {
  title: "Composition des applications",
  minutes: 20,
  body: `${objectifs([
      "calculer la composée de deux fonctions et son ensemble de définition ;",
      "décomposer une fonction en composée de fonctions simples.",
    ])}
    <p>Si f est définie en x et g définie en f(x), la <strong>composée</strong> g ∘ f (lire « g rond f ») est la fonction :</p>
    ${formula("(g ∘ f)(x) = g(f(x))")}
    <p>On applique d’abord f, puis g au résultat. En général, g ∘ f ≠ f ∘ g.</p>
    ${exemple([
      "f(x) = 2x + 1 et g(x) = x².",
      "(g ∘ f)(x) = g(2x + 1) = (2x + 1)² = 4x² + 4x + 1.",
      "(f ∘ g)(x) = f(x²) = 2x² + 1 : le résultat est différent.",
    ])}
    ${retenir(`Pour reconnaître une composée, on cherche « la fonction intérieure » : ${sqrt("(x² + 1)")} = g(f(x)) avec f(x) = x² + 1 et g(x) = ${sqrt("x")}.`)}
    ${exercice(
      "f(x) = x − 3 et g(x) = √x. Calcule g ∘ f et f ∘ g avec leurs ensembles de définition, puis écris h(x) = (2x − 1)³ comme une composée.",
      [
        "(g ∘ f)(x) = √(x − 3), définie pour <strong>x ≥ 3</strong>.",
        "(f ∘ g)(x) = √x − 3, définie pour <strong>x ≥ 0</strong> : les deux composées sont différentes.",
        "h = v ∘ u avec u(x) = 2x − 1 et v(x) = x³.",
      ],
    )}`,
};

export const L_POLYNOMES: LessonSpec = {
  title: "Factoriser un polynôme : méthode de Hörner",
  minutes: 30,
  body: `${objectifs([
      "factoriser un polynôme connaissant une racine (méthode de Hörner) ;",
      "étudier le signe d’un polynôme et résoudre une inéquation.",
    ])}
    ${retenir("Si P(a) = 0, alors P(x) est divisible par (x − a) : P(x) = (x − a) Q(x), où Q a un degré de moins que P.")}
    ${methode([
      "Écrire les coefficients de P dans l’ordre des degrés décroissants (mettre 0 pour un terme manquant).",
      "Abaisser le premier coefficient.",
      "Multiplier par a, ajouter au coefficient suivant, et recommencer jusqu’au bout.",
      "Le dernier nombre est le reste P(a) (il doit valoir 0) ; les autres sont les coefficients de Q.",
    ], "Méthode de Hörner (division par x − a)")}
    ${exemple([
      "P(x) = x³ − 2x² − 5x + 6. P(1) = 1 − 2 − 5 + 6 = 0.",
      "Coefficients 1, −2, −5, 6 avec a = 1 : on obtient 1, −1, −6 et le reste 0.",
      "Donc P(x) = (x − 1)(x² − x − 6) = (x − 1)(x − 3)(x + 2).",
    ])}
    <h2>Signe d’un polynôme ou d’une fraction rationnelle</h2>
    <p>Une fois factorisé, on étudie le signe de chaque facteur dans un tableau, puis on applique la règle des signes.</p>
    ${tableau([
      ["x", "−∞ … −2", "−2 … 1", "1 … 3", "3 … +∞"],
      ["P(x)", "−", "+", "−", "+"],
    ])}
    ${exercice(
      "P(x) = 2x³ − 3x² − 11x + 6. Vérifie que 3 est racine, factorise P(x) et résous P(x) ≥ 0.",
      [
        "P(3) = 54 − 27 − 33 + 6 = 0.",
        "Hörner avec 3 sur 2, −3, −11, 6 : on obtient 2 ; 3 ; −2 et le reste 0. Donc P(x) = (x − 3)(2x² + 3x − 2).",
        "2x² + 3x − 2 a pour racines ½ et −2 : <strong>P(x) = (x − 3)(2x − 1)(x + 2)</strong>.",
        "Tableau de signes : P(x) ≥ 0 sur <strong>[−2 ; ½] ∪ [3 ; +∞[</strong>.",
      ],
    )}`,
};

export const L_DENOMBREMENT: LessonSpec = {
  title: "Dénombrement",
  minutes: 25,
  body: `${objectifs([
      "calculer le cardinal d’une réunion ;",
      "dénombrer des listes, des arrangements et des combinaisons.",
    ])}
    <p>Le <strong>cardinal</strong> d’un ensemble fini A, noté card A, est son nombre d’éléments.</p>
    ${formula("card(A ∪ B) = card A + card B − card(A ∩ B)")}
    <p>Le complémentaire de A dans E a pour cardinal card E − card A. Un diagramme (patates, tableau à double entrée) aide beaucoup.</p>
    ${exemple([
      "Dans une classe de 40 élèves, 25 font de l’anglais renforcé, 18 de l’espagnol, et 8 les deux.",
      "Élèves qui font au moins une des deux langues : 25 + 18 − 8 = 35 ; aucune des deux : 40 − 35 = 5.",
    ])}
    ${tableau([
      ["On choisit p éléments parmi n…", "Nombre de possibilités", "Exemple"],
      ["avec ordre et répétition", "n<sup>p</sup>", "codes de 4 chiffres : 10⁴"],
      ["avec ordre, sans répétition", "n × (n − 1) × … × (n − p + 1)", "podium de 3 parmi 8 : 336"],
      ["sans ordre (groupe)", `${frac("n!", "p!(n − p)!")}`, "délégation de 2 parmi 5 : 10"],
    ])}
    ${exercice(
      "a) Combien de codes de 4 chiffres peut-on former ? Combien avec 4 chiffres tous différents ? b) Dans un club de 10 membres, combien de façons de choisir un bureau de 3 personnes (sans rôles) ? Et un président, un secrétaire et un trésorier ?",
      [
        "a) Avec répétition : 10⁴ = <strong>10 000</strong> ; chiffres distincts : 10 × 9 × 8 × 7 = <strong>5 040</strong>.",
        "b) Sans rôles (groupe) : C<sub>10</sub><sup>3</sup> = <strong>120</strong>.",
        "Avec trois rôles différents (l’ordre compte) : 10 × 9 × 8 = <strong>720</strong>.",
      ],
    )}
    ${erreurs(["se demander toujours : « l’ordre compte-t-il ? » et « y a-t-il répétition ? » avant de choisir la formule."])}`,
};

export const L_NON_EQUIPROBABILITE: LessonSpec = {
  title: "Probabilités sans équiprobabilité",
  minutes: 25,
  body: `${objectifs([
      "déterminer une loi de probabilité non équiprobable ;",
      "calculer la probabilité d’un événement.",
    ])}
    <p>Quand les issues n’ont pas toutes la même chance (dé truqué, sondage…), l’énoncé donne la probabilité de chaque issue. La somme de ces probabilités vaut 1.</p>
    ${retenir("La probabilité d’un événement est la somme des probabilités des issues qui le composent.")}
    ${exemple([
      `Un dé est truqué : le 6 sort avec la probabilité ${frac("1", "2")}, les cinq autres faces ont la même probabilité p.`,
      `5p + ${frac("1", "2")} = 1, donc p = ${frac("1", "10")}.`,
      `p(« nombre pair ») = p(2) + p(4) + p(6) = ${frac("1", "10")} + ${frac("1", "10")} + ${frac("1", "2")} = ${frac("7", "10")}.`,
    ])}
    ${liste([
      "on vérifie toujours que les probabilités sont entre 0 et 1 et que leur somme vaut 1 ;",
      "p(contraire de A) = 1 − p(A) reste vraie.",
    ])}
    ${exercice(
      "Un dé est truqué : la probabilité d’obtenir la face k est proportionnelle à k. Calcule p(k), puis la probabilité d’obtenir un nombre pair et celle d’obtenir au moins 5.",
      [
        "p(k) = ak avec a(1 + 2 + 3 + 4 + 5 + 6) = 21a = 1, donc <strong>p(k) = k/21</strong>.",
        "p(pair) = (2 + 4 + 6)/21 = 12/21 = <strong>4/7</strong>.",
        "p(au moins 5) = (5 + 6)/21 = <strong>11/21</strong>.",
      ],
    )}`,
};

export const L_LIMITES: LessonSpec = {
  title: "Calcul de limites",
  minutes: 30,
  body: `${objectifs([
      "calculer les limites des polynômes et des fractions rationnelles ;",
      "étudier une limite à gauche et à droite ; lever une forme 0/0.",
    ])}
    <p>On consolide les règles vues en Première, sans théorie.</p>
    ${liste([
      "En ±∞, un polynôme a la même limite que son terme de plus haut degré.",
      "En ±∞, une fraction rationnelle a la même limite que le quotient des termes de plus haut degré.",
      "En un réel a où le dénominateur s’annule, on étudie la limite à gauche et à droite selon le signe du dénominateur.",
    ])}
    ${exemple([
      `${frac("3x² − x", "x² + 1")} tend vers 3 en +∞.`,
      `f(x) = ${frac("2x + 1", "x − 1")} : en 1, le numérateur tend vers 3. Si x &gt; 1, x − 1 &gt; 0 et f tend vers +∞ ; si x &lt; 1, f tend vers −∞.`,
    ])}
    ${methode([
      "Forme 0/0 avec des polynômes : factoriser numérateur et dénominateur par (x − a), simplifier, puis remplacer x par a.",
      `Exemple : ${frac("x² − 4", "x − 2")} = x + 2 pour x ≠ 2, donc la limite en 2 vaut 4.`,
    ], "Lever une indétermination")}
    ${exercice(
      "Calcule : a) lim (x² + x − 2)/(x − 1) en 1 ; b) lim (3x³ − 2x)/(x² + 5) en +∞ ; c) lim (x + 1)/(x − 2) quand x tend vers 2 par valeurs supérieures.",
      [
        "a) Forme 0/0 : x² + x − 2 = (x − 1)(x + 2), donc le quotient vaut x + 2 et la limite est <strong>3</strong>.",
        "b) Même limite que 3x³/x² = 3x : <strong>+∞</strong>.",
        "c) Le numérateur tend vers 3 &gt; 0 et x − 2 tend vers 0 en restant positif : la limite est <strong>+∞</strong>.",
      ],
    )}`,
};

export const L_CONTINUITE: LessonSpec = {
  title: "Continuité d’une fonction",
  minutes: 20,
  body: `${objectifs([
      "étudier la continuité d’une fonction en un point ;",
      "déterminer un paramètre pour qu’une fonction soit continue.",
    ])}
    <p>f est <strong>continue en x₀</strong> si f(x₀) existe et si la limite de f(x) quand x tend vers x₀ est f(x₀). Elle est continue sur un intervalle si elle l’est en chaque point : sa courbe se trace sans lever le crayon.</p>
    ${liste([
      "les polynômes sont continus sur ℝ ;",
      "les fractions rationnelles et √(ax + b) sont continues sur chaque intervalle de leur ensemble de définition.",
    ])}
    ${retenir("On admet que l’image d’un intervalle par une fonction continue est un intervalle.")}
    ${exemple([`f(x) = ${frac("1", "x − 2")} est continue sur ]−∞ ; 2[ et sur ]2 ; +∞[, mais elle n’est pas définie en 2.`])}
    ${exercice(
      "f(x) = x + 1 si x ≤ 1 et f(x) = x² + a si x &gt; 1. Pour quelle valeur de a f est-elle continue en 1 ?",
      [
        "f(1) = 2 et la limite à gauche en 1 vaut 2.",
        "La limite à droite en 1 vaut 1 + a.",
        "f est continue en 1 si 1 + a = 2, soit <strong>a = 1</strong>.",
      ],
    )}`,
};

export const L_NOMBRE_DERIVE: LessonSpec = {
  title: "Nombre dérivé et tangente",
  minutes: 25,
  body: `${objectifs([
      "calculer un nombre dérivé et l’équation d’une tangente ;",
      "trouver l’ensemble de dérivabilité d’une fonction avec racine carrée.",
    ])}
    <p>Le <strong>nombre dérivé</strong> de f en x₀ est la limite, si elle existe, du taux d’accroissement ${frac("f(x) − f(x₀)", "x − x₀")}. C’est le coefficient directeur de la tangente à la courbe au point d’abscisse x₀.</p>
    ${formula("Tangente en x₀ : y = f’(x₀)(x − x₀) + f(x₀)")}
    ${tableau([
      ["f(x)", "f’(x)"],
      ["ax + b", "a"],
      ["x<sup>n</sup>", "n x<sup>n−1</sup>"],
      [`${frac("ax + b", "cx + d")}`, `${frac("ad − bc", "(cx + d)²")}`],
      [`${sqrt("(ax + b)")}`, `${frac("a", `2${sqrt("(ax + b)")}`)} (pour ax + b &gt; 0)`],
    ])}
    ${retenir(`${sqrt("(ax + b)")} est définie dès que ax + b ≥ 0 mais n’est dérivable que si ax + b &gt; 0.`)}
    ${exemple(["f(x) = x² − 3x : f’(x) = 2x − 3 ; en x₀ = 2, f(2) = −2 et f’(2) = 1. Tangente : y = x − 4."])}
    ${exercice(
      "f(x) = √(2x + 4). Donne son ensemble de définition, son ensemble de dérivabilité, f’(x) et la tangente au point d’abscisse 0.",
      [
        "f est définie si 2x + 4 ≥ 0 : D<sub>f</sub> = [−2 ; +∞[ ; elle est dérivable si 2x + 4 &gt; 0 : sur <strong>]−2 ; +∞[</strong>.",
        "f’(x) = 2/(2√(2x + 4)) = <strong>1/√(2x + 4)</strong>.",
        "f(0) = 2 et f’(0) = ½ : tangente <strong>y = ½x + 2</strong>. En −2, la courbe a une tangente verticale.",
      ],
    )}`,
};

export const L_DERIVEE_VARIATIONS: LessonSpec = {
  title: "Dérivée et sens de variation",
  minutes: 25,
  body: `${objectifs([
      "étudier les variations d’une fonction avec le signe de sa dérivée ;",
      "montrer qu’une fonction est une bijection et trouver sa réciproque.",
    ])}
    ${liste([
      "si f’ &gt; 0 sur un intervalle I (sauf en quelques points), f est strictement croissante sur I ;",
      "si f’ &lt; 0, f est strictement décroissante ;",
      "si f’ s’annule en changeant de signe en x₀, f a un extremum en x₀.",
    ])}
    ${retenir("Si f est continue et strictement croissante (ou décroissante) sur I, elle réalise une <strong>bijection</strong> de I sur f(I) : chaque valeur de f(I) est atteinte une seule fois.")}
    ${exemple([
      "f(x) = x³ − 3x : f’(x) = 3x² − 3 = 3(x − 1)(x + 1).",
      "f croît sur ]−∞ ; −1], décroît sur [−1 ; 1], croît sur [1 ; +∞[. Maximum local f(−1) = 2, minimum local f(1) = −2.",
      "Sur [1 ; +∞[, f est une bijection sur [−2 ; +∞[.",
    ])}
    ${exercice(
      "f(x) = (2x − 1)/(x + 1). Étudie ses variations sur ]−1 ; +∞[ et montre que f est une bijection de cet intervalle sur un intervalle à préciser.",
      [
        "f’(x) = (2 × 1 − (−1) × 1)/(x + 1)² = <strong>3/(x + 1)²</strong> &gt; 0 : f est strictement croissante.",
        "En −1⁺ : le numérateur tend vers −3 et le dénominateur vers 0⁺, donc f tend vers −∞ ; en +∞, f tend vers 2.",
        "f est continue et strictement croissante : c’est une bijection de ]−1 ; +∞[ sur <strong>]−∞ ; 2[</strong>.",
      ],
    )}`,
};

export const L_SYMETRIES: LessonSpec = {
  title: "Parité et éléments de symétrie",
  minutes: 25,
  body: `${objectifs([
      "étudier la parité d’une fonction ;",
      "démontrer qu’un point est centre de symétrie ou qu’une droite est axe de symétrie.",
    ])}
    ${tableau([
      ["Propriété", "Condition (pour tout x de D<sub>f</sub>, −x ∈ D<sub>f</sub>)", "Courbe"],
      ["f paire", "f(−x) = f(x)", "symétrique par rapport à l’axe des ordonnées"],
      ["f impaire", "f(−x) = −f(x)", "symétrique par rapport à l’origine"],
    ])}
    ${liste([
      "Ω(a ; b) est <strong>centre de symétrie</strong> de la courbe si 2a − x ∈ D<sub>f</sub> et f(2a − x) + f(x) = 2b ;",
      "la droite x = a est <strong>axe de symétrie</strong> si 2a − x ∈ D<sub>f</sub> et f(2a − x) = f(x).",
    ])}
    ${exemple([
      "f(x) = x² − 4x + 1 : f(4 − x) = (4 − x)² − 4(4 − x) + 1 = x² − 4x + 1 = f(x). La droite x = 2 est axe de symétrie.",
      `g(x) = ${frac("2x + 1", "x − 1")} : le point Ω(1 ; 2), intersection des asymptotes, est centre de symétrie.`,
    ])}
    ${retenir("Une symétrie permet de n’étudier la fonction que sur une moitié de son ensemble de définition.")}
    ${exercice(
      "f(x) = x³ − 3x² + 1. Montre que le point I(1 ; −1) est centre de symétrie de sa courbe.",
      [
        "Pour tout x réel, 2 − x est réel.",
        "f(2 − x) = (2 − x)³ − 3(2 − x)² + 1 = −x³ + 3x² − 3.",
        "f(2 − x) + f(x) = −2 = 2 × (−1) : <strong>I(1 ; −1) est centre de symétrie</strong>.",
      ],
    )}`,
};

export const L_VALEUR_ABSOLUE: LessonSpec = {
  title: "Valeur absolue et résolutions graphiques",
  minutes: 30,
  body: `${objectifs([
      "écrire une expression sans valeur absolue ;",
      "résoudre des équations et inéquations avec valeur absolue, algébriquement et graphiquement.",
    ])}
    <p>|f(x)| vaut f(x) quand f(x) ≥ 0 et −f(x) quand f(x) &lt; 0. La courbe de |f| s’obtient à partir de celle de f en remplaçant les parties situées sous l’axe des abscisses par leurs symétriques.</p>
    ${exemple([
      "f(x) = |2x − 4| : si x ≥ 2, f(x) = 2x − 4 ; si x &lt; 2, f(x) = −2x + 4.",
      "C’est une fonction affine par morceaux : sa courbe est formée de deux demi-droites qui se rejoignent en (2 ; 0).",
    ])}
    <h2>Résoudre graphiquement</h2>
    ${liste([
      "f(x) = k : abscisses des points d’intersection de la courbe et de la droite y = k ;",
      "f(x) &gt; k : abscisses des points de la courbe situés au-dessus de cette droite ;",
      "f(x) = g(x) : abscisses des points communs aux deux courbes.",
    ])}
    ${retenir("Une résolution graphique donne des valeurs approchées : on la confirme par le calcul quand c’est possible, en respectant l’ensemble de validité.")}
    ${exercice(
      "Résous : a) |x − 3| = 2x ; b) |2x − 4| ≤ 6.",
      [
        "a) Si x ≥ 3 : x − 3 = 2x donne x = −3, rejeté. Si x &lt; 3 : 3 − x = 2x donne x = 1, qui convient : <strong>S = {1}</strong>.",
        "b) |2x − 4| ≤ 6 ⇔ −6 ≤ 2x − 4 ≤ 6 ⇔ −2 ≤ 2x ≤ 10 ⇔ <strong>−1 ≤ x ≤ 5</strong>.",
        "Graphiquement : la courbe de x ↦ |2x − 4| est au-dessous de la droite y = 6 entre −1 et 5.",
      ],
    )}`,
};
