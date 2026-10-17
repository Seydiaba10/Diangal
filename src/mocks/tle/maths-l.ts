// Mathématiques de Terminale L : leçons propres aux séries littéraires (programme L de 2006,
// Office du Bac). Les autres leçons sont partagées avec les séries S. Rédigées par DIANGAL, à faire
// valider par un enseignant.

import { exemple, formula, frac, type LessonSpec, liste, methode, retenir, sqrt, tableau } from "./blocks";

export const L_COMPOSITION: LessonSpec = {
  title: "Composition des applications",
  minutes: 10,
  body: `<p>Si f est définie en x et g définie en f(x), la <strong>composée</strong> g ∘ f (lire « g rond f ») est la fonction :</p>
    ${formula("(g ∘ f)(x) = g(f(x))")}
    <p>On applique d’abord f, puis g au résultat. En général, g ∘ f ≠ f ∘ g.</p>
    ${exemple([
      "f(x) = 2x + 1 et g(x) = x².",
      "(g ∘ f)(x) = g(2x + 1) = (2x + 1)² = 4x² + 4x + 1.",
      "(f ∘ g)(x) = f(x²) = 2x² + 1 : le résultat est différent.",
    ])}
    ${retenir(`Pour reconnaître une composée, on cherche « la fonction intérieure » : ${sqrt("(x² + 1)")} = g(f(x)) avec f(x) = x² + 1 et g(x) = ${sqrt("x")}.`)}`,
};

export const L_POLYNOMES: LessonSpec = {
  title: "Factoriser un polynôme : méthode de Hörner",
  minutes: 15,
  body: `${retenir("Si P(a) = 0, alors P(x) est divisible par (x − a) : P(x) = (x − a) Q(x), où Q a un degré de moins que P.")}
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
    ])}`,
};

export const L_DENOMBREMENT: LessonSpec = {
  title: "Dénombrement",
  minutes: 12,
  body: `<p>Le <strong>cardinal</strong> d’un ensemble fini A, noté card A, est son nombre d’éléments.</p>
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
    ])}`,
};

export const L_NON_EQUIPROBABILITE: LessonSpec = {
  title: "Probabilités sans équiprobabilité",
  minutes: 10,
  body: `<p>Quand les issues n’ont pas toutes la même chance (dé truqué, sondage…), l’énoncé donne la probabilité de chaque issue. La somme de ces probabilités vaut 1.</p>
    ${retenir("La probabilité d’un événement est la somme des probabilités des issues qui le composent.")}
    ${exemple([
      `Un dé est truqué : le 6 sort avec la probabilité ${frac("1", "2")}, les cinq autres faces ont la même probabilité p.`,
      `5p + ${frac("1", "2")} = 1, donc p = ${frac("1", "10")}.`,
      `p(« nombre pair ») = p(2) + p(4) + p(6) = ${frac("1", "10")} + ${frac("1", "10")} + ${frac("1", "2")} = ${frac("7", "10")}.`,
    ])}
    ${liste([
      "on vérifie toujours que les probabilités sont entre 0 et 1 et que leur somme vaut 1 ;",
      "p(contraire de A) = 1 − p(A) reste vraie.",
    ])}`,
};

export const L_LIMITES: LessonSpec = {
  title: "Calcul de limites",
  minutes: 15,
  body: `<p>On consolide les règles vues en Première, sans théorie.</p>
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
    ], "Lever une indétermination")}`,
};

export const L_CONTINUITE: LessonSpec = {
  title: "Continuité d’une fonction",
  minutes: 10,
  body: `<p>f est <strong>continue en x₀</strong> si f(x₀) existe et si la limite de f(x) quand x tend vers x₀ est f(x₀). Elle est continue sur un intervalle si elle l’est en chaque point : sa courbe se trace sans lever le crayon.</p>
    ${liste([
      "les polynômes sont continus sur ℝ ;",
      "les fractions rationnelles et √(ax + b) sont continues sur chaque intervalle de leur ensemble de définition.",
    ])}
    ${retenir("On admet que l’image d’un intervalle par une fonction continue est un intervalle.")}
    ${exemple([`f(x) = ${frac("1", "x − 2")} est continue sur ]−∞ ; 2[ et sur ]2 ; +∞[, mais elle n’est pas définie en 2.`])}`,
};

export const L_NOMBRE_DERIVE: LessonSpec = {
  title: "Nombre dérivé et tangente",
  minutes: 12,
  body: `<p>Le <strong>nombre dérivé</strong> de f en x₀ est la limite, si elle existe, du taux d’accroissement ${frac("f(x) − f(x₀)", "x − x₀")}. C’est le coefficient directeur de la tangente à la courbe au point d’abscisse x₀.</p>
    ${formula("Tangente en x₀ : y = f’(x₀)(x − x₀) + f(x₀)")}
    ${tableau([
      ["f(x)", "f’(x)"],
      ["ax + b", "a"],
      ["x<sup>n</sup>", "n x<sup>n−1</sup>"],
      [`${frac("ax + b", "cx + d")}`, `${frac("ad − bc", "(cx + d)²")}`],
      [`${sqrt("(ax + b)")}`, `${frac("a", `2${sqrt("(ax + b)")}`)} (pour ax + b &gt; 0)`],
    ])}
    ${retenir(`${sqrt("(ax + b)")} est définie dès que ax + b ≥ 0 mais n’est dérivable que si ax + b &gt; 0.`)}
    ${exemple(["f(x) = x² − 3x : f’(x) = 2x − 3 ; en x₀ = 2, f(2) = −2 et f’(2) = 1. Tangente : y = x − 4."])}`,
};

export const L_DERIVEE_VARIATIONS: LessonSpec = {
  title: "Dérivée et sens de variation",
  minutes: 12,
  body: `${liste([
      "si f’ &gt; 0 sur un intervalle I (sauf en quelques points), f est strictement croissante sur I ;",
      "si f’ &lt; 0, f est strictement décroissante ;",
      "si f’ s’annule en changeant de signe en x₀, f a un extremum en x₀.",
    ])}
    ${retenir("Si f est continue et strictement croissante (ou décroissante) sur I, elle réalise une <strong>bijection</strong> de I sur f(I) : chaque valeur de f(I) est atteinte une seule fois.")}
    ${exemple([
      "f(x) = x³ − 3x : f’(x) = 3x² − 3 = 3(x − 1)(x + 1).",
      "f croît sur ]−∞ ; −1], décroît sur [−1 ; 1], croît sur [1 ; +∞[. Maximum local f(−1) = 2, minimum local f(1) = −2.",
      "Sur [1 ; +∞[, f est une bijection sur [−2 ; +∞[.",
    ])}`,
};

export const L_SYMETRIES: LessonSpec = {
  title: "Parité et éléments de symétrie",
  minutes: 12,
  body: `${tableau([
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
    ${retenir("Une symétrie permet de n’étudier la fonction que sur une moitié de son ensemble de définition.")}`,
};

export const L_VALEUR_ABSOLUE: LessonSpec = {
  title: "Valeur absolue et résolutions graphiques",
  minutes: 15,
  body: `<p>|f(x)| vaut f(x) quand f(x) ≥ 0 et −f(x) quand f(x) &lt; 0. La courbe de |f| s’obtient à partir de celle de f en remplaçant les parties situées sous l’axe des abscisses par leurs symétriques.</p>
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
    ${retenir("Une résolution graphique donne des valeurs approchées : on la confirme par le calcul quand c’est possible, en respectant l’ensemble de validité.")}`,
};
