// Mathématiques de Terminale : leçons d'analyse (programmes S1-S3 et S2-S4 de 2006, Office du Bac).
// Une même leçon sert aux séries dont le programme couvre la notion. Leçons rédigées par DIANGAL,
// à faire valider par un enseignant.

import { exemple, formula, frac, type LessonSpec, liste, methode, retenir, sqrt, sup, tableau, u } from "./blocks";

const lim = (at: string) => `lim<sub>${at}</sub>`;
const integ = (a: string, b: string) => `∫<sub>${a}</sub><sup>${b}</sup>`;

// ── Limites et continuité ────────────────────────────────────────────────────

export const LIMITES_OPERATIONS: LessonSpec = {
  title: "Limites : opérations et formes indéterminées",
  minutes: 15,
  body: `<p>Les limites des fonctions de référence (x ↦ x${sup("n")}, ${frac("1", "x")}, ${sqrt("x")}…) permettent de calculer les limites des sommes, produits et quotients.</p>
    ${tableau([
      ["Si lim f =", "et lim g =", "alors lim (f + g) ="],
      ["ℓ", "ℓ’", "ℓ + ℓ’"],
      ["ℓ", "+∞", "+∞"],
      ["+∞", "+∞", "+∞"],
      ["+∞", "−∞", "forme indéterminée"],
    ])}
    <p>Pour le produit, on applique la règle des signes (ℓ × ∞ = ∞ si ℓ ≠ 0). Pour le quotient, ${frac("ℓ", "∞")} = 0 et ${frac("ℓ", "0")} donne ±∞ selon le signe du dénominateur.</p>
    ${retenir("Les quatre formes indéterminées : ∞ − ∞, 0 × ∞, ∞/∞ et 0/0. Il faut alors transformer l’écriture.")}
    ${methode([
      "Polynôme ou fraction rationnelle en ±∞ : mettre en facteur le terme de plus haut degré.",
      "Différence de racines : multiplier et diviser par l’expression conjuguée.",
      "Forme 0/0 en a : factoriser par (x − a) ou reconnaître un taux d’accroissement, donc un nombre dérivé.",
    ])}
    ${exemple([
      `${lim("x→+∞")} ${frac("2x² − 3x + 1", "x² + 5")} = ${lim("x→+∞")} ${frac("2x²", "x²")} = 2.`,
      `${lim("x→+∞")} (${sqrt("(x + 1)")} − ${sqrt("x")}) = ${lim("x→+∞")} ${frac("1", `${sqrt("(x + 1)")} + ${sqrt("x")}`)} = 0.`,
    ])}
    <h2>Comparaison et composition</h2>
    ${liste([
      "Si f(x) ≥ g(x) au voisinage de +∞ et lim g = +∞, alors lim f = +∞.",
      "Théorème des gendarmes : si g ≤ f ≤ h et si g et h ont la même limite ℓ, alors lim f = ℓ.",
      "Si lim<sub>x→a</sub> f(x) = b et lim<sub>y→b</sub> g(y) = ℓ, alors lim<sub>x→a</sub> g(f(x)) = ℓ.",
    ])}
    ${exemple([`Pour x &gt; 0, −${frac("1", "x")} ≤ ${frac("sin x", "x")} ≤ ${frac("1", "x")}, donc ${lim("x→+∞")} ${frac("sin x", "x")} = 0.`])}`,
};

export const ASYMPTOTES: LessonSpec = {
  title: "Asymptotes et branches infinies",
  minutes: 15,
  body: `<p>Les limites aux bornes de l’ensemble de définition décrivent l’allure de la courbe 𝒞 de f « à l’infini ».</p>
    ${tableau([
      ["Limite", "Interprétation graphique"],
      [`${lim("x→a")} f(x) = ±∞`, "asymptote verticale d’équation x = a"],
      [`${lim("x→±∞")} f(x) = b`, "asymptote horizontale d’équation y = b"],
      [`${lim("x→±∞")} [f(x) − (ax + b)] = 0`, "asymptote oblique d’équation y = ax + b"],
    ])}
    ${methode([
      `Calculer a = ${lim("x→±∞")} ${frac("f(x)", "x")}.`,
      `Si a est un réel non nul, calculer b = ${lim("x→±∞")} [f(x) − ax].`,
      "Si b est un réel, la droite y = ax + b est asymptote ; la position relative se lit sur le signe de f(x) − (ax + b).",
    ], "Chercher une asymptote oblique")}
    <h2>Branches paraboliques</h2>
    ${liste([
      `${frac("f(x)", "x")} tend vers ±∞ : branche parabolique de direction (Oy) (exemple : x²).`,
      `${frac("f(x)", "x")} tend vers 0 : branche parabolique de direction (Ox) (exemple : ${sqrt("x")}).`,
      `${frac("f(x)", "x")} tend vers a et f(x) − ax vers ±∞ : branche parabolique de direction y = ax.`,
    ])}
    ${exemple([
      `f(x) = ${frac("x² + x + 1", "x − 1")}. La division donne f(x) = x + 2 + ${frac("3", "x − 1")}.`,
      `Comme ${frac("3", "x − 1")} tend vers 0 en ±∞, la droite y = x + 2 est asymptote oblique ; x = 1 est asymptote verticale.`,
      `Pour x &gt; 1, f(x) − (x + 2) &gt; 0 : la courbe est au-dessus de l’asymptote.`,
    ])}`,
};

export const CONTINUITE_TVI: LessonSpec = {
  title: "Continuité et théorème des valeurs intermédiaires",
  minutes: 15,
  body: `<p>f est <strong>continue en a</strong> si ${lim("x→a")} f(x) = f(a) : la courbe se trace « sans lever le crayon ». Les polynômes, les fonctions rationnelles, ${sqrt("x")}, sin, cos, ln et exp sont continues sur leur ensemble de définition, ainsi que leurs sommes, produits, quotients et composées.</p>
    ${retenir("Si f n’est pas définie en a mais a une limite finie ℓ en a, on la <strong>prolonge par continuité</strong> en posant f(a) = ℓ.")}
    <h2>Théorème des valeurs intermédiaires</h2>
    <p>Si f est continue sur [a ; b], pour tout réel k compris entre f(a) et f(b), l’équation f(x) = k a au moins une solution dans [a ; b].</p>
    ${retenir("Si de plus f est strictement monotone sur [a ; b], cette solution est <strong>unique</strong>. C’est le cas utilisé le plus souvent, avec k = 0.", "Corollaire")}
    <p>L’image d’un intervalle par une fonction continue est un intervalle ; l’image d’un segment [a ; b] est un segment.</p>
    ${exemple([
      "Montrer que x³ + x − 1 = 0 a une seule solution α dans [0 ; 1].",
      "f(x) = x³ + x − 1 est continue, et f’(x) = 3x² + 1 &gt; 0 : f est strictement croissante.",
      "f(0) = −1 &lt; 0 et f(1) = 1 &gt; 0 : l’équation a une unique solution α.",
      "f(0,6) ≈ −0,18 et f(0,7) ≈ 0,04 : 0,6 &lt; α &lt; 0,7 (méthode par balayage ou dichotomie).",
    ])}`,
};

export const FONCTION_RECIPROQUE: LessonSpec = {
  title: "Fonction réciproque",
  minutes: 12,
  body: `<p>Si f est <strong>continue et strictement monotone</strong> sur un intervalle I, elle réalise une <strong>bijection</strong> de I sur l’intervalle J = f(I) : tout y de J a un unique antécédent x dans I. On définit ainsi la fonction réciproque f${sup("−1")} : y = f(x) ⇔ x = f${sup("−1")}(y).</p>
    ${liste([
      "f<sup>−1</sup> est continue sur J et a le même sens de variation que f.",
      "Dans un repère orthonormé, les courbes de f et de f<sup>−1</sup> sont symétriques par rapport à la droite y = x.",
      `Si f est dérivable en x avec f’(x) ≠ 0, alors f${sup("−1")} est dérivable en y = f(x) et (f${sup("−1")})’(y) = ${frac("1", `f’(f${sup("−1")}(y))`)}.`,
    ])}
    ${methode([
      "Justifier que f est continue et strictement monotone sur I (tableau de variations).",
      "Calculer J = f(I) à l’aide des limites ou des valeurs aux bornes.",
      "Si possible, exprimer x en fonction de y en résolvant y = f(x).",
    ], "Montrer que f est une bijection")}
    ${exemple([
      "f(x) = x² est continue et strictement croissante sur [0 ; +∞[ : c’est une bijection de [0 ; +∞[ sur [0 ; +∞[.",
      `Sa réciproque est y ↦ ${sqrt("y")}, et (${sqrt("y")})’ = ${frac("1", `2${sqrt("y")}`)} pour y &gt; 0 (car f’(x) = 2x).`,
    ])}`,
};

// ── Dérivation ──────────────────────────────────────────────────────────────

export const DERIVEE_COMPOSEE: LessonSpec = {
  title: "Dérivée d’une fonction composée",
  minutes: 15,
  body: `<p>Si f est dérivable en x et g dérivable en f(x), alors g ∘ f est dérivable en x et :</p>
    ${formula("(g ∘ f)’(x) = f’(x) × g’(f(x))")}
    ${tableau([
      ["Fonction", "Dérivée", "Condition"],
      ["u<sup>n</sup> (n entier)", "n u’ u<sup>n−1</sup>", "u ≠ 0 si n &lt; 0"],
      [`${sqrt("u")}`, `${frac("u’", `2${sqrt("u")}`)}`, "u &gt; 0"],
      [`${frac("1", "u")}`, `−${frac("u’", "u²")}`, "u ≠ 0"],
      ["sin u", "u’ cos u", ""],
      ["cos u", "−u’ sin u", ""],
      ["f(ax + b)", "a f’(ax + b)", ""],
    ])}
    ${exemple([
      "f(x) = (3x² + 1)⁵ : f’(x) = 5 × 6x × (3x² + 1)⁴ = 30x(3x² + 1)⁴.",
      `g(x) = ${sqrt("(x² + 4)")} : g’(x) = ${frac("2x", `2${sqrt("(x² + 4)")}`)} = ${frac("x", `${sqrt("(x² + 4)")}`)}.`,
      "h(x) = cos(2x − π) : h’(x) = −2 sin(2x − π).",
    ])}
    ${retenir("Une dérivée sert à étudier les variations (signe de f’), à trouver les extremums et à écrire la tangente : y = f’(a)(x − a) + f(a).")}`,
};

export const ACCROISSEMENTS_FINIS: LessonSpec = {
  title: "Accroissements finis",
  minutes: 12,
  body: `<p><strong>Théorème des accroissements finis</strong> (admis) : si f est continue sur [a ; b] et dérivable sur ]a ; b[, il existe au moins un réel c de ]a ; b[ tel que</p>
    ${formula(`f’(c) = ${frac("f(b) − f(a)", "b − a")}`)}
    <p>Géométriquement, la courbe a en un point au moins une tangente parallèle à la corde qui joint ses extrémités.</p>
    <h2>Inégalité des accroissements finis</h2>
    ${liste([
      "Si m ≤ f’(x) ≤ M pour tout x de [a ; b], alors m(b − a) ≤ f(b) − f(a) ≤ M(b − a).",
      "Si |f’(x)| ≤ M sur un intervalle I, alors pour tous x et y de I : |f(x) − f(y)| ≤ M|x − y|.",
    ])}
    ${exemple([
      "Pour f = sin, |f’(x)| = |cos x| ≤ 1, donc |sin x − sin y| ≤ |x − y| ; en particulier |sin x| ≤ |x|.",
      `Sur [1 ; 2], la dérivée de ln est ${frac("1", "x")}, comprise entre ${frac("1", "2")} et 1 : on obtient ${frac("1", "2")} ≤ ln 2 ≤ 1.`,
    ])}
    ${retenir("Prolongement de la dérivée : si f est continue en a et si f’(x) tend vers un réel ℓ quand x tend vers a, alors f est dérivable en a et f’(a) = ℓ.")}`,
};

export const DERIVEES_SUCCESSIVES: LessonSpec = {
  title: "Dérivées successives et points d’inflexion",
  minutes: 12,
  body: `<p>Si f’ est elle-même dérivable, sa dérivée est la <strong>dérivée seconde</strong> f’’ (notée aussi ${frac("d²f", "dx²")} en physique), et ainsi de suite : f${sup("(n)")} est la dérivée n-ième.</p>
    ${tableau([
      ["f(x)", "f<sup>(n)</sup>(x)"],
      ["sin x", `sin(x + n${frac("π", "2")})`],
      ["cos x", `cos(x + n${frac("π", "2")})`],
      ["e<sup>x</sup>", "e<sup>x</sup>"],
      ["e<sup>ax</sup>", "a<sup>n</sup> e<sup>ax</sup>"],
    ])}
    <h2>Point d’inflexion</h2>
    <p>La courbe admet un <strong>point d’inflexion</strong> d’abscisse x₀ si elle traverse sa tangente en ce point.</p>
    ${retenir("Si f est deux fois dérivable et si f’’ s’annule en changeant de signe en x₀, le point d’abscisse x₀ est un point d’inflexion.")}
    ${exemple([
      "f(x) = x³ − 3x : f’(x) = 3x² − 3 et f’’(x) = 6x.",
      "f’’ s’annule en 0 en changeant de signe : O(0 ; 0) est un point d’inflexion ; la tangente y a pour équation y = −3x.",
    ])}`,
};

export const ETUDE_FONCTION: LessonSpec = {
  title: "Étude complète d’une fonction",
  minutes: 20,
  body: `${methode([
      "Ensemble de définition D<sub>f</sub> ; parité ou périodicité pour réduire l’étude.",
      "Limites aux bornes de D<sub>f</sub> et asymptotes.",
      "Dérivée, signe de la dérivée, tableau de variations.",
      "Éléments de symétrie, points particuliers (intersections avec les axes), tangentes utiles.",
      "Tracé : asymptotes d’abord, puis points du tableau, puis la courbe.",
    ], "Plan d’étude")}
    ${retenir(`Ω(a ; b) est centre de symétrie de 𝒞 si, pour tout x de D<sub>f</sub>, 2a − x ∈ D<sub>f</sub> et f(2a − x) + f(x) = 2b. La droite x = a est axe de symétrie si f(2a − x) = f(x).`)}
    ${exemple([
      `f(x) = ${frac("x² + x + 1", "x − 1")} = x + 2 + ${frac("3", "x − 1")}, définie sur ℝ \\ {1}.`,
      `f’(x) = 1 − ${frac("3", "(x − 1)²")} = ${frac("(x − 1)² − 3", "(x − 1)²")} s’annule en x = 1 − ${sqrt("3")} et x = 1 + ${sqrt("3")}.`,
      `f est croissante sur ]−∞ ; 1 − ${sqrt("3")}], décroissante sur [1 − ${sqrt("3")} ; 1[ et sur ]1 ; 1 + ${sqrt("3")}], croissante ensuite.`,
      "Asymptotes : x = 1 et y = x + 2. Elles se coupent en Ω(1 ; 3), centre de symétrie de la courbe.",
    ])}
    <p>Pour une fonction trigonométrique, on réduit l’étude à une période, puis on utilise la parité ; pour une fonction irrationnelle (avec une racine), on étudie aussi la dérivabilité là où la racine s’annule.</p>`,
};

// ── Logarithme ──────────────────────────────────────────────────────────────

export const LN_DEFINITION: LessonSpec = {
  title: "Le logarithme népérien : définition et propriétés",
  minutes: 12,
  body: `<p>La <strong>fonction logarithme népérien</strong>, notée ln, est l’unique primitive de x ↦ ${frac("1", "x")} sur ]0 ; +∞[ qui s’annule en 1.</p>
    ${formula(`ln 1 = 0 et (ln x)’ = ${frac("1", "x")} pour x &gt; 0`)}
    <h2>Propriétés algébriques</h2>
    <p>Pour a &gt; 0, b &gt; 0 et n entier :</p>
    ${liste([
      "ln(ab) = ln a + ln b (propriété fondamentale) ;",
      `ln${frac("1", "b")} = −ln b et ln${frac("a", "b")} = ln a − ln b ;`,
      `ln(a${sup("n")}) = n ln a et ln ${sqrt("a")} = ${frac("1", "2")} ln a.`,
    ])}
    ${retenir("Le nombre e (e ≈ 2,718) est défini par ln e = 1. Alors ln(e<sup>n</sup>) = n.")}
    ${exemple([
      "ln 12 − ln 3 = ln 4 = 2 ln 2.",
      `ln ${frac("1", "e²")} = −2.`,
      `ln 8 + ln ${frac("1", "2")} = 3 ln 2 − ln 2 = 2 ln 2.`,
    ])}`,
};

export const LN_ETUDE: LessonSpec = {
  title: "Étude de la fonction logarithme népérien",
  minutes: 15,
  body: `<p>ln est dérivable sur ]0 ; +∞[ de dérivée ${frac("1", "x")} &gt; 0 : elle est <strong>strictement croissante</strong>.</p>
    ${tableau([
      ["Limites à connaître", ""],
      [`${lim("x→0⁺")} ln x`, "−∞ (asymptote verticale x = 0)"],
      [`${lim("x→+∞")} ln x`, "+∞"],
      [`${lim("x→+∞")} ${frac("ln x", "x")}`, "0 (branche parabolique de direction (Ox))"],
      [`${lim("x→0⁺")} x ln x`, "0"],
      [`${lim("x→0")} ${frac("ln(1 + x)", "x")}`, "1"],
    ])}
    ${liste([
      "ln x &lt; 0 sur ]0 ; 1[, ln 1 = 0, ln x &gt; 0 sur ]1 ; +∞[.",
      "La tangente en x = 1 a pour équation y = x − 1, et la courbe est en dessous : ln x ≤ x − 1.",
    ])}
    <h2>Dérivée de ln u</h2>
    ${formula(`(ln u)’ = ${frac("u’", "u")} si u &gt; 0 ; une primitive de ${frac("u’", "u")} est ln|u|`)}
    ${exemple([
      `f(x) = ln(x² + 1) : f’(x) = ${frac("2x", "x² + 1")}.`,
      `g(x) = x ln x − x sur ]0 ; +∞[ : g’(x) = ln x + x × ${frac("1", "x")} − 1 = ln x.`,
    ])}`,
};

export const LN_EQUATIONS: LessonSpec = {
  title: "Équations, inéquations et logarithme décimal",
  minutes: 12,
  body: `<p>Comme ln est continue et strictement croissante, pour a &gt; 0 et b &gt; 0 :</p>
    ${formula("ln a = ln b ⇔ a = b et ln a &lt; ln b ⇔ a &lt; b")}
    ${methode([
      "Chercher l’ensemble de validité : chaque expression sous un ln doit être strictement positive.",
      "Regrouper les ln avec les propriétés algébriques pour obtenir ln A = ln B (ou ln A &lt; ln B).",
      "Résoudre A = B (ou A &lt; B) et ne garder que les solutions de l’ensemble de validité.",
    ])}
    ${exemple([
      "Résoudre ln(2x − 1) = ln(x + 3). Validité : x &gt; ½.",
      "2x − 1 = x + 3 donne x = 4, qui convient : S = {4}.",
      "Résoudre ln x ≤ 2 : x &gt; 0 et x ≤ e², donc S = ]0 ; e²].",
    ])}
    <h2>Logarithme de base a</h2>
    <p>Pour a &gt; 0 et a ≠ 1, log<sub>a</sub> x = ${frac("ln x", "ln a")}. Le <strong>logarithme décimal</strong> est log x = ${frac("ln x", "ln 10")}, avec log 10<sup>n</sup> = n.</p>
    ${exemple(["log 1000 = 3. Le pH d’une solution est pH = −log[H₃O⁺] : si [H₃O⁺] = 10<sup>−4</sup> mol/L, le pH vaut 4."])}`,
};

// ── Exponentielle et puissances ─────────────────────────────────────────────

export const EXP_DEFINITION: LessonSpec = {
  title: "La fonction exponentielle : définition et propriétés",
  minutes: 12,
  body: `<p>ln est une bijection de ]0 ; +∞[ sur ℝ. Sa réciproque est la <strong>fonction exponentielle</strong>, notée exp, avec exp(x) = e${sup("x")}.</p>
    ${formula("y = e<sup>x</sup> ⇔ x = ln y (y &gt; 0)")}
    ${liste([
      "e<sup>x</sup> &gt; 0 pour tout x ; e<sup>0</sup> = 1 et e<sup>1</sup> = e.",
      "ln(e<sup>x</sup>) = x pour tout réel x, et e<sup>ln x</sup> = x pour x &gt; 0.",
      `e${sup("a + b")} = e${sup("a")} × e${sup("b")} ; e${sup("−a")} = ${frac("1", `e${sup("a")}`)} ; e${sup("a − b")} = ${frac(`e${sup("a")}`, `e${sup("b")}`)} ; (e${sup("a")})${sup("n")} = e${sup("na")}.`,
    ])}
    ${retenir("e<sup>a</sup> = e<sup>b</sup> ⇔ a = b et e<sup>a</sup> &lt; e<sup>b</sup> ⇔ a &lt; b.")}
    ${exemple([
      "Résoudre e<sup>2x</sup> − 3e<sup>x</sup> + 2 = 0. On pose X = e<sup>x</sup> &gt; 0 : X² − 3X + 2 = 0, donc X = 1 ou X = 2.",
      "e<sup>x</sup> = 1 donne x = 0 ; e<sup>x</sup> = 2 donne x = ln 2. S = {0 ; ln 2}.",
    ])}`,
};

export const EXP_ETUDE: LessonSpec = {
  title: "Étude de l’exponentielle et dérivée de e^u",
  minutes: 15,
  body: `<p>exp est dérivable sur ℝ et (e${sup("x")})’ = e${sup("x")} &gt; 0 : elle est strictement croissante.</p>
    ${tableau([
      ["Limites à connaître", ""],
      [`${lim("x→−∞")} e<sup>x</sup>`, "0 (asymptote y = 0)"],
      [`${lim("x→+∞")} e<sup>x</sup>`, "+∞"],
      [`${lim("x→+∞")} ${frac("e<sup>x</sup>", "x")}`, "+∞"],
      [`${lim("x→−∞")} x e<sup>x</sup>`, "0"],
      [`${lim("x→0")} ${frac("e<sup>x</sup> − 1", "x")}`, "1"],
    ])}
    ${retenir("La tangente en 0 a pour équation y = x + 1, et e<sup>x</sup> ≥ x + 1 pour tout x.")}
    <h2>Dérivée et primitive de e<sup>u</sup></h2>
    ${formula("(e<sup>u</sup>)’ = u’ e<sup>u</sup> ; une primitive de u’ e<sup>u</sup> est e<sup>u</sup>")}
    ${exemple([
      "f(x) = x e<sup>−x</sup> : f’(x) = e<sup>−x</sup> − x e<sup>−x</sup> = (1 − x) e<sup>−x</sup>.",
      "f’ est du signe de 1 − x : f croît sur ]−∞ ; 1] puis décroît ; son maximum est f(1) = e<sup>−1</sup> ≈ 0,37.",
      "En +∞, f(x) tend vers 0 (croissances comparées) : asymptote y = 0.",
    ])}`,
};

export const PUISSANCES: LessonSpec = {
  title: "Exponentielle de base a et fonctions puissances",
  minutes: 12,
  body: `<p>Pour a &gt; 0, on définit a${sup("x")} = e${sup("x ln a")} pour tout réel x. On retrouve les règles des puissances : a${sup("x + y")} = a${sup("x")} a${sup("y")}, (a${sup("x")})${sup("y")} = a${sup("xy")}.</p>
    ${formula("(a<sup>x</sup>)’ = (ln a) a<sup>x</sup>")}
    ${liste([
      "Si a &gt; 1, x ↦ a<sup>x</sup> est croissante ; si 0 &lt; a &lt; 1, elle est décroissante.",
      "La réciproque de x ↦ a<sup>x</sup> (a ≠ 1) est log<sub>a</sub>.",
    ])}
    <h2>Fonctions puissances</h2>
    <p>Pour α réel et x &gt; 0, x${sup("α")} = e${sup("α ln x")}. Elle est dérivable sur ]0 ; +∞[ et :</p>
    ${formula("(x<sup>α</sup>)’ = α x<sup>α − 1</sup>")}
    ${exemple([
      `x${sup("1/2")} = ${sqrt("x")} et x${sup("1/3")} est la racine cubique de x.`,
      `2${sup("10")} = 1024, donc 10 ln 2 = ln 1024 ; 3${sup("x")} = 7 donne x = ${frac("ln 7", "ln 3")} ≈ 1,77.`,
    ])}`,
};

export const CROISSANCES_COMPAREES: LessonSpec = {
  title: "Croissances comparées",
  minutes: 10,
  body: `<p>En +∞, l’exponentielle l’emporte sur toute puissance, qui l’emporte elle-même sur le logarithme. Pour α &gt; 0 :</p>
    ${tableau([
      ["Limite", "Valeur"],
      [`${lim("x→+∞")} ${frac("e<sup>x</sup>", "x<sup>α</sup>")}`, "+∞"],
      [`${lim("x→+∞")} x<sup>α</sup> e<sup>−x</sup>`, "0"],
      [`${lim("x→+∞")} ${frac("ln x", "x<sup>α</sup>")}`, "0"],
      [`${lim("x→0⁺")} x<sup>α</sup> ln x`, "0"],
      [`${lim("x→−∞")} x<sup>n</sup> e<sup>x</sup>`, "0 (n entier naturel)"],
    ])}
    ${methode([
      "Repérer la forme indéterminée (∞/∞ ou 0 × ∞).",
      "Faire apparaître une des limites du tableau, au besoin en factorisant.",
    ])}
    ${exemple([
      `${lim("x→+∞")} (e${sup("x")} − x²) : on écrit e${sup("x")} − x² = e${sup("x")}(1 − x² e${sup("−x")}). Comme x² e${sup("−x")} tend vers 0, la limite est +∞.`,
      `${lim("x→+∞")} ${frac("ln x", sqrt("x"))} = 0 (cas α = ½).`,
    ])}`,
};

// ── Suites numériques ───────────────────────────────────────────────────────

export const RECURRENCE: LessonSpec = {
  title: "Le raisonnement par récurrence",
  minutes: 12,
  body: `<p>Pour démontrer qu’une propriété P(n) est vraie pour tout entier n ≥ n₀ :</p>
    ${methode([
      "<strong>Initialisation</strong> : vérifier que P(n₀) est vraie.",
      "<strong>Hérédité</strong> : supposer P(n) vraie pour un entier n ≥ n₀ (hypothèse de récurrence) et en déduire P(n + 1).",
      "<strong>Conclusion</strong> : P(n) est vraie pour tout n ≥ n₀.",
    ])}
    ${exemple([
      "Montrons que 2<sup>n</sup> ≥ n + 1 pour tout entier naturel n.",
      "Initialisation : 2<sup>0</sup> = 1 ≥ 0 + 1.",
      "Hérédité : si 2<sup>n</sup> ≥ n + 1, alors 2<sup>n+1</sup> = 2 × 2<sup>n</sup> ≥ 2n + 2 ≥ n + 2.",
      "Conclusion : la propriété est vraie pour tout n.",
    ])}
    ${retenir("L’hérédité seule ne suffit pas : sans initialisation, on « démontre » des propriétés fausses.")}`,
};

export const SUITES_ARITH_GEO: LessonSpec = {
  title: "Suites arithmétiques et géométriques",
  minutes: 15,
  body: `${tableau([
      ["", "Suite arithmétique de raison r", "Suite géométrique de raison q"],
      ["Définition", `${u("n+1")} = ${u("n")} + r`, `${u("n+1")} = q × ${u("n")}`],
      ["Terme général", `${u("n")} = ${u("0")} + nr = ${u("p")} + (n − p)r`, `${u("n")} = ${u("0")} × q${sup("n")}`],
      ["Somme de termes consécutifs", `(nombre de termes) × ${frac("premier + dernier", "2")}`, `premier × ${frac("1 − q<sup>N</sup>", "1 − q")} (N termes, q ≠ 1)`],
    ])}
    <h2>Limite de q<sup>n</sup></h2>
    ${liste([
      "si q &gt; 1 : q<sup>n</sup> tend vers +∞ ;",
      "si q = 1 : q<sup>n</sup> = 1 ;",
      "si −1 &lt; q &lt; 1 : q<sup>n</sup> tend vers 0 (la suite géométrique converge vers 0) ;",
      "si q ≤ −1 : pas de limite.",
    ])}
    ${exemple([
      "Une population de 10 000 habitants augmente de 3 % par an : P<sub>n</sub> = 10 000 × 1,03<sup>n</sup>. Après 10 ans : P<sub>10</sub> ≈ 13 439.",
      `1 + ${frac("1", "2")} + ${frac("1", "4")} + … + ${frac("1", "2<sup>n</sup>")} = 2(1 − ${frac("1", "2<sup>n+1</sup>")}), qui tend vers 2.`,
    ])}`,
};

export const SUITES_VARIATIONS: LessonSpec = {
  title: "Sens de variation et suites bornées",
  minutes: 12,
  body: `<p>Une suite (${u("n")}) est <strong>croissante</strong> si ${u("n+1")} ≥ ${u("n")} pour tout n, <strong>décroissante</strong> si ${u("n+1")} ≤ ${u("n")}, <strong>monotone</strong> si elle est l’un ou l’autre.</p>
    ${methode([
      `Étudier le signe de ${u("n+1")} − ${u("n")}.`,
      `Si tous les termes sont strictement positifs, comparer ${frac(u("n+1"), u("n"))} à 1.`,
      `Si ${u("n")} = f(n), utiliser les variations de f sur [0 ; +∞[.`,
      "Pour une suite définie par récurrence, raisonner par récurrence.",
    ], "Étudier le sens de variation")}
    <p>(${u("n")}) est <strong>majorée</strong> s’il existe M tel que ${u("n")} ≤ M pour tout n, <strong>minorée</strong> s’il existe m tel que ${u("n")} ≥ m, <strong>bornée</strong> si elle est les deux.</p>
    ${exemple([
      `${u("n")} = ${frac("n", "n + 1")} : ${u("n+1")} − ${u("n")} = ${frac("1", "(n + 1)(n + 2)")} &gt; 0, la suite est croissante.`,
      "De plus 0 ≤ u<sub>n</sub> &lt; 1 : elle est bornée.",
    ])}`,
};

export const SUITES_CONVERGENCE: LessonSpec = {
  title: "Limites de suites et théorèmes de convergence",
  minutes: 15,
  body: `<p>Une suite <strong>converge</strong> vers ℓ si ses termes deviennent aussi proches de ℓ qu’on veut à partir d’un certain rang ; sinon elle <strong>diverge</strong> (limite infinie ou pas de limite). Les opérations sur les limites sont les mêmes que pour les fonctions.</p>
    ${liste([
      `Comparaison : si ${u("n")} ≥ ${u("n", "v")} à partir d’un rang et ${u("n", "v")} tend vers +∞, alors ${u("n")} tend vers +∞.`,
      `Gendarmes : si ${u("n", "v")} ≤ ${u("n")} ≤ ${u("n", "w")} et si (${u("n", "v")}) et (${u("n", "w")}) convergent vers ℓ, alors (${u("n")}) converge vers ℓ.`,
      `Si |${u("n")} − ℓ| ≤ ${u("n", "v")} et ${u("n", "v")} tend vers 0, alors ${u("n")} tend vers ℓ.`,
      `Si ${u("n")} tend vers ℓ et f est continue en ℓ, alors f(${u("n")}) tend vers f(ℓ).`,
    ])}
    ${retenir("Toute suite croissante et majorée converge ; toute suite décroissante et minorée converge.", "Théorème")}
    <h2>Suites de référence</h2>
    ${liste([
      "ln n et n<sup>α</sup> (α &gt; 0) tendent vers +∞, mais ln n est « plus lente » : ln n / n<sup>α</sup> tend vers 0 ;",
      "a<sup>n</sup> tend vers +∞ si a &gt; 1 et vers 0 si 0 &lt; a &lt; 1 ; a<sup>n</sup> / n<sup>α</sup> tend vers +∞ si a &gt; 1.",
    ])}
    ${exemple([`${u("n")} = ${frac("(−1)<sup>n</sup>", "n")} pour n ≥ 1 : −${frac("1", "n")} ≤ ${u("n")} ≤ ${frac("1", "n")}, donc la suite converge vers 0.`])}`,
};

export const SUITES_RECURRENTES: LessonSpec = {
  title: "Suites définies par u(n+1) = f(u(n))",
  minutes: 15,
  body: `<p>On représente une telle suite en traçant la courbe de f et la droite y = x : on place ${u("0")} sur l’axe des abscisses, on « monte » à la courbe pour lire ${u("1")} = f(${u("0")}), on le reporte sur l’axe grâce à la droite y = x, et ainsi de suite. Le dessin permet de conjecturer le sens de variation et la limite.</p>
    ${retenir(`Si (${u("n")}) converge vers ℓ et si f est continue en ℓ, alors ℓ = f(ℓ) : la limite est solution de l’équation f(x) = x.`)}
    ${methode([
      "Montrer par récurrence que les termes restent dans un intervalle I où f est définie.",
      "Étudier le sens de variation (par récurrence, à l’aide des variations de f).",
      "Conclure à la convergence (suite monotone et bornée), puis trouver ℓ en résolvant f(ℓ) = ℓ.",
    ])}
    ${exemple([
      `${u("0")} = 0 et ${u("n+1")} = ${sqrt(`(${u("n")} + 2)`)}. Par récurrence, 0 ≤ ${u("n")} ≤ ${u("n+1")} ≤ 2.`,
      "La suite est croissante et majorée par 2 : elle converge vers ℓ ≥ 0.",
      `ℓ = ${sqrt("(ℓ + 2)")} donne ℓ² − ℓ − 2 = 0, soit ℓ = 2 (l’autre racine, −1, est négative).`,
    ])}`,
};

// ── Calcul intégral ─────────────────────────────────────────────────────────

export const PRIMITIVES: LessonSpec = {
  title: "Primitives",
  minutes: 15,
  body: `<p>F est une <strong>primitive</strong> de f sur un intervalle I si F’ = f sur I. Toute fonction continue sur I admet des primitives ; si F en est une, les autres sont les F + C (C constante). Une seule prend une valeur donnée en un point.</p>
    ${tableau([
      ["f(x)", "une primitive F(x)"],
      ["a (constante)", "ax"],
      ["x<sup>n</sup> (n ≠ −1)", `${frac("x<sup>n+1</sup>", "n + 1")}`],
      [`${frac("1", "x")}`, "ln|x|"],
      [`${frac("1", sqrt("x"))}`, `2${sqrt("x")}`],
      ["e<sup>x</sup>", "e<sup>x</sup>"],
      ["cos x ; sin x", "sin x ; −cos x"],
      ["cos(ax + b)", `${frac("1", "a")} sin(ax + b)`],
    ])}
    ${tableau([
      ["Forme", "Primitive"],
      ["u’ u<sup>n</sup> (n ≠ −1)", `${frac("u<sup>n+1</sup>", "n + 1")}`],
      [`${frac("u’", "u")}`, "ln|u|"],
      [`${frac("u’", sqrt("u"))}`, `2${sqrt("u")}`],
      ["u’ e<sup>u</sup>", "e<sup>u</sup>"],
    ])}
    ${exemple([
      "Une primitive de 2x(x² + 1)³ est ¼(x² + 1)⁴ (forme u’u³ avec u = x² + 1).",
      `Une primitive de ${frac("3x²", "x³ + 1")} sur ]−1 ; +∞[ est ln(x³ + 1).`,
    ])}`,
};

export const INTEGRALE_PROPRIETES: LessonSpec = {
  title: "Intégrale d’une fonction et propriétés",
  minutes: 15,
  body: `<p>Si f est continue sur un intervalle contenant a et b, et F une primitive de f :</p>
    ${formula(`${integ("a", "b")} f(x) dx = [F(x)]<sub>a</sub><sup>b</sup> = F(b) − F(a)`)}
    <p>Si f ≥ 0 sur [a ; b] (a &lt; b), cette intégrale est l’<strong>aire</strong> du domaine compris entre la courbe, l’axe des abscisses et les droites x = a et x = b, en unités d’aire.</p>
    ${liste([
      `Linéarité : ${integ("a", "b")} (αf + βg) = α ${integ("a", "b")} f + β ${integ("a", "b")} g.`,
      `Relation de Chasles : ${integ("a", "b")} f + ${integ("b", "c")} f = ${integ("a", "c")} f.`,
      `Positivité : si a ≤ b et f ≥ 0 sur [a ; b], alors ${integ("a", "b")} f ≥ 0 ; si f ≤ g, alors ${integ("a", "b")} f ≤ ${integ("a", "b")} g.`,
      `Inégalité de la moyenne : si m ≤ f ≤ M sur [a ; b], alors m(b − a) ≤ ${integ("a", "b")} f ≤ M(b − a).`,
      `Valeur moyenne de f sur [a ; b] : μ = ${frac("1", "b − a")} ${integ("a", "b")} f(x) dx.`,
    ])}
    ${retenir(`x ↦ ${integ("a", "x")} f(t) dt est l’unique primitive de f qui s’annule en a.`)}
    ${exemple([`${integ("0", "1")} (3x² + 2x) dx = [x³ + x²]<sub>0</sub><sup>1</sup> = 2.`])}`,
};

export const INTEGRATION_PAR_PARTIES: LessonSpec = {
  title: "Intégration par parties et changement de variable",
  minutes: 15,
  body: `<p>Si u et v sont dérivables à dérivées continues sur [a ; b] :</p>
    ${formula(`${integ("a", "b")} u(x) v’(x) dx = [u(x) v(x)]<sub>a</sub><sup>b</sup> − ${integ("a", "b")} u’(x) v(x) dx`)}
    ${methode([
      "Choisir u, qui devient plus simple en la dérivant (x, ln x…), et v’, dont on connaît une primitive (e<sup>x</sup>, cos x…).",
      "Calculer u’ et v, puis appliquer la formule.",
    ])}
    ${exemple([
      `${integ("0", "1")} x e${sup("x")} dx : u = x, v’ = e${sup("x")}. On obtient [x e${sup("x")}]<sub>0</sub><sup>1</sup> − ${integ("0", "1")} e${sup("x")} dx = e − (e − 1) = 1.`,
      `${integ("1", "e")} ln x dx : u = ln x, v’ = 1. On obtient [x ln x]<sub>1</sub><sup>e</sup> − ${integ("1", "e")} 1 dx = e − (e − 1) = 1.`,
    ])}
    <h2>Changement de variable affine et linéarisation</h2>
    ${formula(`${integ("a", "b")} f(αt + β) dt = ${frac("1", "α")} ${integ("αa + β", "αb + β")} f(x) dx`)}
    <p>Pour intégrer un produit ou une puissance de sin et cos, on <strong>linéarise</strong> : sin² x = ${frac("1 − cos 2x", "2")}, cos² x = ${frac("1 + cos 2x", "2")}.</p>
    ${exemple([`${integ("0", "π")} sin² x dx = ${integ("0", "π")} ${frac("1 − cos 2x", "2")} dx = [${frac("x", "2")} − ${frac("sin 2x", "4")}]<sub>0</sub><sup>π</sup> = ${frac("π", "2")}.`])}`,
};

export const AIRES_VOLUMES: LessonSpec = {
  title: "Calcul d’aires et de volumes",
  minutes: 15,
  body: `<p>L’aire du domaine compris entre les courbes de f et g et les droites x = a et x = b (a &lt; b) vaut ${integ("a", "b")} |f(x) − g(x)| dx unités d’aire. On découpe [a ; b] selon le signe de f − g.</p>
    ${retenir("L’unité d’aire (u.a.) est l’aire du rectangle construit sur les vecteurs unités : si ‖i⃗‖ = 2 cm et ‖j⃗‖ = 1 cm, alors 1 u.a. = 2 cm².")}
    <h2>Volumes</h2>
    ${liste([
      `Si S(z) est l’aire de la section du solide par le plan de cote z, son volume est V = ${integ("a", "b")} S(z) dz.`,
      `Solide obtenu en faisant tourner la courbe de f autour de l’axe des abscisses : V = π ${integ("a", "b")} f(x)² dx.`,
    ])}
    ${exemple([
      `Boule de rayon R : on fait tourner f(x) = ${sqrt("(R² − x²)")} sur [−R ; R].`,
      `V = π ${integ("−R", "R")} (R² − x²) dx = π [R²x − ${frac("x³", "3")}]<sub>−R</sub><sup>R</sup> = ${frac("4", "3")}πR³.`,
    ])}
    <h2>Valeurs approchées</h2>
    <p>Quand on ne connaît pas de primitive, on découpe [a ; b] en n intervalles de largeur h = ${frac("b − a", "n")} et on additionne des aires de rectangles (méthode des rectangles) ou de trapèzes (méthode des trapèzes, plus précise).</p>`,
};

// ── Équations différentielles ───────────────────────────────────────────────

export const EQDIFF_ORDRE1: LessonSpec = {
  title: "Équations différentielles y’ = ay + b",
  minutes: 12,
  body: `<p>Une <strong>équation différentielle</strong> a pour inconnue une fonction y. Les solutions de y’ = ay (a réel) sur ℝ sont les fonctions :</p>
    ${formula("y(x) = C e<sup>ax</sup>, C constante réelle")}
    <p>Il existe une seule solution qui vérifie une condition initiale y(x₀) = y₀.</p>
    ${retenir(`Les solutions de y’ = ay + b (a ≠ 0) sont y(x) = C e${sup("ax")} − ${frac("b", "a")} : la fonction constante −${frac("b", "a")} est une solution particulière.`)}
    ${exemple([
      "y’ = −2y avec y(0) = 3 : y(x) = 3e<sup>−2x</sup>.",
      "y’ + 2y = 4, soit y’ = −2y + 4 : y(x) = Ce<sup>−2x</sup> + 2.",
    ])}
    <p>Ces équations décrivent la charge d’un condensateur, la désintégration radioactive (N’ = −λN) ou le refroidissement d’un corps.</p>`,
};

export const EQDIFF_ORDRE2: LessonSpec = {
  title: "Équations différentielles y’’ + ay’ + by = 0",
  minutes: 15,
  body: `<p>On cherche des solutions de la forme e${sup("rx")} : r doit vérifier l’<strong>équation caractéristique</strong> r² + ar + b = 0, de discriminant Δ = a² − 4b.</p>
    ${tableau([
      ["Discriminant", "Racines", "Solutions (C₁, C₂ réels)"],
      ["Δ &gt; 0", "r₁ et r₂ réelles", "C₁ e<sup>r₁x</sup> + C₂ e<sup>r₂x</sup>"],
      ["Δ = 0", "r double", "(C₁ x + C₂) e<sup>rx</sup>"],
      ["Δ &lt; 0", "α ± iβ", "e<sup>αx</sup>(C₁ cos βx + C₂ sin βx)"],
    ])}
    ${retenir("Cas important : y’’ + ω²y = 0 a pour solutions y(x) = A cos ωx + B sin ωx. C’est l’équation de l’oscillateur harmonique (pendule élastique, circuit LC).")}
    ${exemple([
      "y’’ − 3y’ + 2y = 0 : r² − 3r + 2 = 0, r = 1 ou r = 2. Solutions : C₁ e<sup>x</sup> + C₂ e<sup>2x</sup>.",
      "y’’ + 4y = 0 avec y(0) = 1 et y’(0) = 0 : y(x) = cos 2x.",
    ])}
    <p>Deux conditions initiales (y(x₀) et y’(x₀)) déterminent une solution unique.</p>`,
};

export const EQDIFF_SECOND_MEMBRE: LessonSpec = {
  title: "Équations avec second membre",
  minutes: 12,
  body: `<p>Pour une équation linéaire « avec second membre » (E), comme y’’ + ay’ + by = g(x), on procède en deux temps.</p>
    ${methode([
      "Trouver une <strong>solution particulière</strong> y<sub>p</sub> de (E), en suivant l’indication de l’énoncé.",
      "Résoudre l’équation sans second membre (E₀) : solutions y<sub>0</sub>.",
      "Les solutions de (E) sont les fonctions y = y<sub>p</sub> + y<sub>0</sub>.",
      "Utiliser les conditions initiales pour trouver les constantes.",
    ])}
    ${exemple([
      "(E) : y’’ + y = 2 cos 2x. On cherche y<sub>p</sub> = A cos 2x + B sin 2x.",
      "y<sub>p</sub>’’ + y<sub>p</sub> = −3A cos 2x − 3B sin 2x = 2 cos 2x, donc A = −⅔ et B = 0.",
      "Solutions : y(x) = C₁ cos x + C₂ sin x − ⅔ cos 2x.",
    ])}
    ${retenir("Au premier ordre, y’ = ay + g(x) se traite de la même façon : solution particulière + C e<sup>ax</sup>.")}`,
};
