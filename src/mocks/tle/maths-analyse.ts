// Mathématiques de Terminale : leçons d'analyse (programmes S1-S3 et S2-S4 de 2006, Office du Bac).
// Une même leçon sert aux séries dont le programme couvre la notion. Leçons rédigées par DIANGAL,
// à faire valider par un enseignant.

import { auBac, erreurs, exemple, exercice, formula, frac, type LessonSpec, liste, methode, objectifs, retenir, sqrt, sup, tableau, u } from "./blocks";

const lim = (at: string) => `lim<sub>${at}</sub>`;
const integ = (a: string, b: string) => `∫<sub>${a}</sub><sup>${b}</sup>`;

// ── Limites et continuité ────────────────────────────────────────────────────

export const LIMITES_OPERATIONS: LessonSpec = {
  title: "Limites : opérations et formes indéterminées",
  minutes: 30,
  body: `${objectifs([
      "calculer une limite à l’aide des opérations ;",
      "reconnaître une forme indéterminée et la lever ;",
      "utiliser les théorèmes de comparaison et la limite d’une composée.",
    ])}
    <p>Les limites des fonctions de référence (x ↦ x${sup("n")}, ${frac("1", "x")}, ${sqrt("x")}…) permettent de calculer les limites des sommes, produits et quotients.</p>
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
    ${exemple([`Pour x &gt; 0, −${frac("1", "x")} ≤ ${frac("sin x", "x")} ≤ ${frac("1", "x")}, donc ${lim("x→+∞")} ${frac("sin x", "x")} = 0.`])}
    ${exercice(
      "Calcule les limites suivantes : a) lim (x − √(x² + 1)) en +∞ ; b) lim (2x³ − x + 1)/(x² + 3) en −∞ ; c) lim (x² − 3x + 2)/(x − 2) en 2.",
      [
        "a) Forme ∞ − ∞ : on multiplie par l’expression conjuguée. x − √(x² + 1) = (x² − (x² + 1)) ÷ (x + √(x² + 1)) = −1 ÷ (x + √(x² + 1)). Le dénominateur tend vers +∞ : la limite vaut <strong>0</strong>.",
        "b) Fraction rationnelle en −∞ : même limite que 2x³/x² = 2x, donc <strong>−∞</strong>.",
        "c) Forme 0/0 : x² − 3x + 2 = (x − 1)(x − 2), donc pour x ≠ 2 le quotient vaut x − 1 et la limite vaut <strong>1</strong>.",
      ],
    )}
    ${erreurs([
      "écrire « ∞ − ∞ = 0 » ou « ∞/∞ = 1 » : ce sont des formes indéterminées ;",
      "oublier d’étudier le signe du dénominateur pour une limite du type ℓ/0.",
    ])}`,
};

export const ASYMPTOTES: LessonSpec = {
  title: "Asymptotes et branches infinies",
  minutes: 30,
  body: `${objectifs([
      "interpréter graphiquement une limite ;",
      "démontrer qu’une droite est asymptote et étudier la position relative ;",
      "reconnaître une branche parabolique.",
    ])}
    <p>Les limites aux bornes de l’ensemble de définition décrivent l’allure de la courbe 𝒞 de f « à l’infini ».</p>
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
    ])}
    ${exercice(
      "Soit f(x) = (2x² − x + 3)/(x − 1). Détermine a, b, c tels que f(x) = ax + b + c/(x − 1), puis les asymptotes de la courbe et sa position par rapport à l’asymptote oblique.",
      [
        "Division euclidienne : 2x² − x + 3 = (x − 1)(2x + 1) + 4, donc <strong>f(x) = 2x + 1 + 4/(x − 1)</strong>.",
        "En 1, le numérateur tend vers 4 et le dénominateur vers 0 : f tend vers ±∞, la droite <strong>x = 1</strong> est asymptote verticale.",
        "f(x) − (2x + 1) = 4/(x − 1) tend vers 0 en ±∞ : la droite <strong>y = 2x + 1</strong> est asymptote oblique.",
        "4/(x − 1) &gt; 0 si x &gt; 1 : la courbe est au-dessus de l’asymptote sur ]1 ; +∞[ et au-dessous sur ]−∞ ; 1[.",
      ],
    )}
    ${auBac("Rédige toujours l’interprétation graphique : « donc la droite d’équation … est asymptote à la courbe en +∞ ». Sans cette phrase, la réponse est incomplète.")}`,
};

export const CONTINUITE_TVI: LessonSpec = {
  title: "Continuité et théorème des valeurs intermédiaires",
  minutes: 30,
  body: `${objectifs([
      "justifier la continuité d’une fonction ;",
      "appliquer le théorème des valeurs intermédiaires et son corollaire ;",
      "encadrer une solution par balayage ou dichotomie.",
    ])}
    <p>f est <strong>continue en a</strong> si ${lim("x→a")} f(x) = f(a) : la courbe se trace « sans lever le crayon ». Les polynômes, les fonctions rationnelles, ${sqrt("x")}, sin, cos, ln et exp sont continues sur leur ensemble de définition, ainsi que leurs sommes, produits, quotients et composées.</p>
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
    ])}
    ${exercice(
      "Montre que l’équation x³ − 3x + 1 = 0 admet une unique solution α dans [0 ; 1], puis donne un encadrement de α d’amplitude 0,1.",
      [
        "f(x) = x³ − 3x + 1 est un polynôme : elle est continue sur [0 ; 1].",
        "f’(x) = 3x² − 3 = 3(x − 1)(x + 1) &lt; 0 sur ]0 ; 1[ : f est strictement décroissante sur [0 ; 1].",
        "f(0) = 1 &gt; 0 et f(1) = −1 &lt; 0 : 0 est compris entre f(1) et f(0). D’après le corollaire du théorème des valeurs intermédiaires, l’équation a une <strong>unique</strong> solution α dans [0 ; 1].",
        "f(0,3) = 0,127 &gt; 0 et f(0,4) = −0,136 &lt; 0, donc <strong>0,3 &lt; α &lt; 0,4</strong>.",
      ],
    )}
    ${erreurs([
      "oublier de citer la <strong>stricte monotonie</strong> pour justifier l’unicité ;",
      "appliquer le théorème à une fonction non continue sur l’intervalle (x ↦ 1/x sur [−1 ; 1]).",
    ])}`,
};

export const FONCTION_RECIPROQUE: LessonSpec = {
  title: "Fonction réciproque",
  minutes: 30,
  body: `${objectifs([
      "montrer qu’une fonction réalise une bijection d’un intervalle sur un autre ;",
      "étudier et représenter la fonction réciproque ;",
      "calculer la dérivée de la réciproque en un point.",
    ])}
    <p>Si f est <strong>continue et strictement monotone</strong> sur un intervalle I, elle réalise une <strong>bijection</strong> de I sur l’intervalle J = f(I) : tout y de J a un unique antécédent x dans I. On définit ainsi la fonction réciproque f${sup("−1")} : y = f(x) ⇔ x = f${sup("−1")}(y).</p>
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
    ])}
    ${exercice(
      "Soit f(x) = x² − 2x sur I = [1 ; +∞[. Montre que f est une bijection de I sur un intervalle J à préciser, exprime f<sup>−1</sup> et calcule (f<sup>−1</sup>)’(3).",
      [
        "f’(x) = 2x − 2 &gt; 0 sur ]1 ; +∞[ : f est continue et strictement croissante sur I.",
        "f(1) = −1 et f tend vers +∞ en +∞ : f est une bijection de I sur <strong>J = [−1 ; +∞[</strong>.",
        "y = x² − 2x ⇔ (x − 1)² = y + 1 ⇔ x = 1 + √(y + 1) (car x ≥ 1). Donc <strong>f<sup>−1</sup>(x) = 1 + √(x + 1)</strong>.",
        "f(3) = 3 et f’(3) = 4, donc (f<sup>−1</sup>)’(3) = 1/f’(3) = <strong>1/4</strong> (on vérifie : (1 + √(x + 1))’ = 1/(2√(x + 1)) vaut 1/4 en 3).",
      ],
    )}
    ${auBac("Pour tracer la courbe de f<sup>−1</sup>, trace d’abord la droite y = x, puis le symétrique de chaque point remarquable et de chaque tangente de la courbe de f.")}`,
};

// ── Dérivation ──────────────────────────────────────────────────────────────

export const DERIVEE_COMPOSEE: LessonSpec = {
  title: "Dérivée d’une fonction composée",
  minutes: 25,
  body: `${objectifs([
      "dériver une fonction composée ;",
      "utiliser la dérivée pour étudier des variations et écrire une tangente.",
    ])}
    <p>Si f est dérivable en x et g dérivable en f(x), alors g ∘ f est dérivable en x et :</p>
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
    ${retenir("Une dérivée sert à étudier les variations (signe de f’), à trouver les extremums et à écrire la tangente : y = f’(a)(x − a) + f(a).")}
    ${exercice(
      "Soit f(x) = √(x² − 4x + 5). Justifie que f est dérivable sur ℝ, calcule f’(x), étudie ses variations et écris la tangente au point d’abscisse 0.",
      [
        "x² − 4x + 5 = (x − 2)² + 1 &gt; 0 pour tout x : f est définie et dérivable sur ℝ (forme √u avec u &gt; 0).",
        "f’(x) = (2x − 4)/(2√(x² − 4x + 5)) = <strong>(x − 2)/√(x² − 4x + 5)</strong>.",
        "f’ est du signe de x − 2 : f décroît sur ]−∞ ; 2] et croît sur [2 ; +∞[ ; son minimum est f(2) = 1.",
        "f(0) = √5 et f’(0) = −2/√5 : tangente <strong>y = −(2/√5) x + √5</strong>.",
      ],
    )}
    ${erreurs(["oublier le facteur u’ (la dérivée de la fonction « intérieure ») ;", "dériver √u en 1/(2√u) sans multiplier par u’."])}`,
};

export const ACCROISSEMENTS_FINIS: LessonSpec = {
  title: "Accroissements finis",
  minutes: 30,
  body: `${objectifs([
      "énoncer le théorème et l’inégalité des accroissements finis ;",
      "encadrer une expression à l’aide d’un encadrement de la dérivée.",
    ])}
    <p><strong>Théorème des accroissements finis</strong> (admis) : si f est continue sur [a ; b] et dérivable sur ]a ; b[, il existe au moins un réel c de ]a ; b[ tel que</p>
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
    ${retenir("Prolongement de la dérivée : si f est continue en a et si f’(x) tend vers un réel ℓ quand x tend vers a, alors f est dérivable en a et f’(a) = ℓ.")}
    ${exercice(
      "En appliquant l’inégalité des accroissements finis à f(x) = √(1 + x) sur [0 ; 0,02], encadre √1,02.",
      [
        "f est dérivable sur [0 ; 0,02] et f’(x) = 1/(2√(1 + x)), qui est décroissante.",
        "Pour x dans [0 ; 0,02] : 1 ≤ √(1 + x) ≤ √1,0201 = 1,01, donc 1/2,02 ≤ f’(x) ≤ 1/2.",
        "L’inégalité donne 0,02/2,02 ≤ f(0,02) − f(0) ≤ 0,02/2.",
        "Donc <strong>1,0099 ≤ √1,02 ≤ 1,01</strong> (la calculatrice donne 1,00995).",
      ],
    )}
    ${auBac("L’inégalité des accroissements finis sert souvent dans l’étude d’une suite u<sub>n+1</sub> = f(u<sub>n</sub>) : on montre |u<sub>n+1</sub> − ℓ| ≤ k|u<sub>n</sub> − ℓ| avec 0 &lt; k &lt; 1, puis |u<sub>n</sub> − ℓ| ≤ kⁿ|u<sub>0</sub> − ℓ|.")}`,
};

export const DERIVEES_SUCCESSIVES: LessonSpec = {
  title: "Dérivées successives et points d’inflexion",
  minutes: 25,
  body: `${objectifs([
      "calculer des dérivées successives ;",
      "déterminer un point d’inflexion et la tangente en ce point.",
    ])}
    <p>Si f’ est elle-même dérivable, sa dérivée est la <strong>dérivée seconde</strong> f’’ (notée aussi ${frac("d²f", "dx²")} en physique), et ainsi de suite : f${sup("(n)")} est la dérivée n-ième.</p>
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
    ])}
    ${exercice(
      "Soit f(x) = x³ − 3x² + 2. Montre que la courbe admet un point d’inflexion I, écris la tangente en I et montre que I est centre de symétrie.",
      [
        "f’(x) = 3x² − 6x et f’’(x) = 6x − 6, qui s’annule en 1 en changeant de signe : <strong>I(1 ; 0)</strong> est un point d’inflexion.",
        "f’(1) = −3 : la tangente en I est <strong>y = −3x + 3</strong>.",
        "f(2 − x) = −x³ + 3x² − 2, donc f(2 − x) + f(x) = 0 = 2 × 0 : I est centre de symétrie de la courbe.",
      ],
    )}
    ${erreurs(["conclure à un point d’inflexion dès que f’’(x₀) = 0 : il faut un <strong>changement de signe</strong> (f(x) = x⁴ n’a pas de point d’inflexion en 0)."])}`,
};

export const ETUDE_FONCTION: LessonSpec = {
  title: "Étude complète d’une fonction",
  minutes: 45,
  body: `${objectifs([
      "conduire l’étude complète d’une fonction selon un plan rigoureux ;",
      "démontrer des éléments de symétrie ;",
      "tracer la courbe avec ses asymptotes et ses tangentes.",
    ])}
    ${methode([
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
    <p>Pour une fonction trigonométrique, on réduit l’étude à une période, puis on utilise la parité ; pour une fonction irrationnelle (avec une racine), on étudie aussi la dérivabilité là où la racine s’annule.</p>
    ${exercice(
      "Étudie f(x) = (x² + 3)/(x + 1) et prépare le tracé de sa courbe.",
      [
        "D<sub>f</sub> = ℝ \\ {−1}. Division : x² + 3 = (x + 1)(x − 1) + 4, donc f(x) = x − 1 + 4/(x + 1).",
        "Limites : f tend vers +∞ en +∞ et vers −∞ en −∞ ; en −1, le numérateur tend vers 4 : f tend vers +∞ à droite et −∞ à gauche. Asymptotes : <strong>x = −1</strong> et <strong>y = x − 1</strong>.",
        "f’(x) = 1 − 4/(x + 1)² = (x + 3)(x − 1)/(x + 1)², qui s’annule en −3 et 1.",
        "f croît sur ]−∞ ; −3], décroît sur [−3 ; −1[ et sur ]−1 ; 1], croît sur [1 ; +∞[ ; maximum local f(−3) = −6, minimum local f(1) = 2.",
        "Les asymptotes se coupent en Ω(−1 ; −2) ; on vérifie f(−2 − x) + f(x) = −4 : Ω est centre de symétrie. La courbe coupe (Oy) en (0 ; 3) et ne coupe pas (Ox) (x² + 3 &gt; 0).",
      ],
    )}
    ${auBac("Le tableau de variations doit contenir les limites aux bornes et les extremums. Pour le tracé, place dans l’ordre : asymptotes, extremums et tangentes horizontales, quelques points, puis la courbe.")}`,
};

// ── Logarithme ──────────────────────────────────────────────────────────────

export const LN_DEFINITION: LessonSpec = {
  title: "Le logarithme népérien : définition et propriétés",
  minutes: 25,
  body: `${objectifs([
      "connaître la définition de ln et du nombre e ;",
      "utiliser les propriétés algébriques du logarithme.",
    ])}
    <p>La <strong>fonction logarithme népérien</strong>, notée ln, est l’unique primitive de x ↦ ${frac("1", "x")} sur ]0 ; +∞[ qui s’annule en 1.</p>
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
    ])}
    ${exercice(
      "Simplifie A = ln 50 + ln 2 − 2 ln 10 et B = ln(e³) − ln(1/e) + ln √e. Exprime ln 0,125 en fonction de ln 2.",
      [
        "A = ln(50 × 2) − ln(10²) = ln 100 − ln 100 = <strong>0</strong>.",
        "B = 3 − (−1) + 1/2 = <strong>4,5</strong>.",
        "0,125 = 1/8 = 2<sup>−3</sup>, donc <strong>ln 0,125 = −3 ln 2</strong>.",
      ],
    )}
    ${erreurs(["écrire ln(a + b) = ln a + ln b : c’est faux ;", "confondre (ln a)² et ln(a²) = 2 ln a."])}`,
};

export const LN_ETUDE: LessonSpec = {
  title: "Étude de la fonction logarithme népérien",
  minutes: 35,
  body: `${objectifs([
      "connaître les variations, les limites et la courbe de ln ;",
      "dériver ln u et étudier des fonctions comportant ln.",
    ])}
    <p>ln est dérivable sur ]0 ; +∞[ de dérivée ${frac("1", "x")} &gt; 0 : elle est <strong>strictement croissante</strong>.</p>
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
    ])}
    ${exercice(
      "Étudie f(x) = x − ln x sur ]0 ; +∞[ (variations, limites, branches infinies) et déduis-en que x &gt; ln x pour tout x &gt; 0.",
      [
        "f’(x) = 1 − 1/x = (x − 1)/x : f décroît sur ]0 ; 1] et croît sur [1 ; +∞[ ; son minimum est f(1) = 1.",
        "En 0⁺ : −ln x tend vers +∞, donc f tend vers +∞ : la droite x = 0 est asymptote.",
        "En +∞ : f(x) = x(1 − ln x / x) tend vers +∞ ; f(x)/x tend vers 1 et f(x) − x = −ln x tend vers −∞ : branche parabolique de direction y = x.",
        "Le minimum vaut 1 &gt; 0, donc f(x) &gt; 0, c’est-à-dire <strong>x &gt; ln x</strong> pour tout x &gt; 0.",
      ],
    )}
    ${auBac("Les limites de référence (ln x/x en +∞, x ln x en 0⁺, ln(1 + x)/x en 0) doivent être citées telles quelles : ce sont des résultats du cours.")}`,
};

export const LN_EQUATIONS: LessonSpec = {
  title: "Équations, inéquations et logarithme décimal",
  minutes: 30,
  body: `${objectifs([
      "résoudre des équations et inéquations avec ln en respectant l’ensemble de validité ;",
      "utiliser le logarithme décimal.",
    ])}
    <p>Comme ln est continue et strictement croissante, pour a &gt; 0 et b &gt; 0 :</p>
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
    ${exemple(["log 1000 = 3. Le pH d’une solution est pH = −log[H₃O⁺] : si [H₃O⁺] = 10<sup>−4</sup> mol/L, le pH vaut 4."])}
    ${exercice(
      "Résous : a) ln(x − 1) + ln(x + 1) = ln 3 ; b) ln(2x + 1) ≥ 0 ; c) (ln x)² − ln x − 2 = 0.",
      [
        "a) Validité : x &gt; 1. L’équation s’écrit ln((x − 1)(x + 1)) = ln 3, soit x² − 1 = 3 : x = 2 ou x = −2. Seul 2 convient : <strong>S = {2}</strong>.",
        "b) Validité : x &gt; −1/2. ln(2x + 1) ≥ ln 1 ⇔ 2x + 1 ≥ 1 ⇔ x ≥ 0 : <strong>S = [0 ; +∞[</strong>.",
        "c) On pose X = ln x : X² − X − 2 = 0 donne X = 2 ou X = −1, donc x = e² ou x = e<sup>−1</sup> : <strong>S = {e<sup>−1</sup> ; e²}</strong>.",
      ],
    )}
    ${erreurs(["oublier de déterminer l’ensemble de validité <strong>avant</strong> de transformer l’équation ;", "garder une solution qui rend une expression sous un ln négative."])}`,
};

// ── Exponentielle et puissances ─────────────────────────────────────────────

export const EXP_DEFINITION: LessonSpec = {
  title: "La fonction exponentielle : définition et propriétés",
  minutes: 25,
  body: `${objectifs([
      "définir l’exponentielle comme réciproque de ln ;",
      "utiliser les propriétés algébriques de l’exponentielle et résoudre des équations.",
    ])}
    <p>ln est une bijection de ]0 ; +∞[ sur ℝ. Sa réciproque est la <strong>fonction exponentielle</strong>, notée exp, avec exp(x) = e${sup("x")}.</p>
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
    ])}
    ${exercice(
      "Résous : a) e<sup>2x + 1</sup> = e<sup>x − 3</sup> ; b) e<sup>x</sup> &gt; 3 ; c) e<sup>2x</sup> − e<sup>x</sup> − 6 = 0.",
      [
        "a) 2x + 1 = x − 3, donc <strong>x = −4</strong>.",
        "b) e<sup>x</sup> &gt; e<sup>ln 3</sup> ⇔ <strong>x &gt; ln 3</strong>.",
        "c) On pose X = e<sup>x</sup> &gt; 0 : X² − X − 6 = 0 donne X = 3 ou X = −2 (impossible car X &gt; 0). Donc e<sup>x</sup> = 3 et <strong>x = ln 3</strong>.",
      ],
    )}
    ${erreurs(["oublier que e<sup>x</sup> &gt; 0 : une solution X négative doit être rejetée ;", "écrire e<sup>a + b</sup> = e<sup>a</sup> + e<sup>b</sup>."])}`,
};

export const EXP_ETUDE: LessonSpec = {
  title: "Étude de l’exponentielle et dérivée de e^u",
  minutes: 35,
  body: `${objectifs([
      "connaître les variations, les limites et la courbe de l’exponentielle ;",
      "dériver e<sup>u</sup> et étudier des fonctions comportant l’exponentielle.",
    ])}
    <p>exp est dérivable sur ℝ et (e${sup("x")})’ = e${sup("x")} &gt; 0 : elle est strictement croissante.</p>
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
    ])}
    ${exercice(
      "Étudie f(x) = (x + 1)e<sup>−x</sup> : variations, limites, branches infinies et tangente au point d’abscisse −1.",
      [
        "f’(x) = e<sup>−x</sup> − (x + 1)e<sup>−x</sup> = <strong>−x e<sup>−x</sup></strong> : f croît sur ]−∞ ; 0] et décroît sur [0 ; +∞[ ; maximum f(0) = 1.",
        "En +∞ : f(x) = x e<sup>−x</sup> + e<sup>−x</sup> tend vers 0 (croissances comparées) : asymptote y = 0.",
        "En −∞ : x + 1 tend vers −∞ et e<sup>−x</sup> vers +∞, donc f tend vers −∞ ; f(x)/x = (1 + 1/x)e<sup>−x</sup> tend vers +∞ : branche parabolique de direction (Oy).",
        "f(−1) = 0 et f’(−1) = e : tangente <strong>y = e(x + 1)</strong>.",
      ],
    )}
    ${auBac("Dans un problème, l’exponentielle étant toujours strictement positive, le signe de f’(x) = (…) e<sup>u(x)</sup> est celui du facteur (…) : dis-le explicitement.")}`,
};

export const PUISSANCES: LessonSpec = {
  title: "Exponentielle de base a et fonctions puissances",
  minutes: 25,
  body: `${objectifs([
      "définir a<sup>x</sup> et x<sup>α</sup> et les dériver ;",
      "résoudre des équations du type a<sup>x</sup> = b ; utiliser un modèle de croissance.",
    ])}
    <p>Pour a &gt; 0, on définit a${sup("x")} = e${sup("x ln a")} pour tout réel x. On retrouve les règles des puissances : a${sup("x + y")} = a${sup("x")} a${sup("y")}, (a${sup("x")})${sup("y")} = a${sup("xy")}.</p>
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
    ])}
    ${exercice(
      "a) Résous 3<sup>x + 1</sup> = 9<sup>x</sup>. b) Une population de 1 000 individus augmente de 5 % par an : P<sub>n</sub> = 1 000 × 1,05<sup>n</sup>. Au bout de combien d’années aura-t-elle doublé ?",
      [
        "a) En passant au ln : (x + 1) ln 3 = 2x ln 3, donc x + 1 = 2x et <strong>x = 1</strong>.",
        "b) On cherche n tel que 1,05<sup>n</sup> ≥ 2, soit n ln 1,05 ≥ ln 2, donc n ≥ ln 2 / ln 1,05 ≈ 14,2.",
        "La population aura doublé au bout de <strong>15 ans</strong>.",
      ],
    )}`,
};

export const CROISSANCES_COMPAREES: LessonSpec = {
  title: "Croissances comparées",
  minutes: 25,
  body: `${objectifs([
      "connaître les limites de croissances comparées ;",
      "les utiliser pour lever une indétermination.",
    ])}
    <p>En +∞, l’exponentielle l’emporte sur toute puissance, qui l’emporte elle-même sur le logarithme. Pour α &gt; 0 :</p>
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
    ])}
    ${exercice(
      "Calcule : a) lim x² e<sup>−x</sup> en +∞ ; b) lim (e<sup>x</sup> − x³) en +∞ ; c) lim (x − ln x) en +∞ ; d) lim √x ln x en 0⁺.",
      [
        "a) Croissances comparées : <strong>0</strong>.",
        "b) e<sup>x</sup> − x³ = e<sup>x</sup>(1 − x³e<sup>−x</sup>) ; x³e<sup>−x</sup> tend vers 0, donc la limite est <strong>+∞</strong>.",
        "c) x − ln x = x(1 − ln x / x) ; ln x / x tend vers 0, donc la limite est <strong>+∞</strong>.",
        "d) C’est x<sup>α</sup> ln x avec α = 1/2 : la limite vaut <strong>0</strong>.",
      ],
    )}`,
};

// ── Suites numériques ───────────────────────────────────────────────────────

export const RECURRENCE: LessonSpec = {
  title: "Le raisonnement par récurrence",
  minutes: 25,
  body: `${objectifs([
      "rédiger un raisonnement par récurrence complet.",
    ])}
    <p>Pour démontrer qu’une propriété P(n) est vraie pour tout entier n ≥ n₀ :</p>
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
    ${retenir("L’hérédité seule ne suffit pas : sans initialisation, on « démontre » des propriétés fausses.")}
    ${exercice(
      "Démontre que, pour tout entier n ≥ 1, 1 + 3 + 5 + … + (2n − 1) = n².",
      [
        "Soit P(n) la propriété « 1 + 3 + … + (2n − 1) = n² ».",
        "Initialisation : pour n = 1, le membre de gauche vaut 1 et 1² = 1 : P(1) est vraie.",
        "Hérédité : supposons P(n) vraie pour un entier n ≥ 1. Alors 1 + 3 + … + (2n − 1) + (2n + 1) = n² + 2n + 1 = (n + 1)² : P(n + 1) est vraie.",
        "Conclusion : P(n) est vraie pour tout entier n ≥ 1.",
      ],
    )}
    ${erreurs(["supposer dans l’hérédité ce qu’on veut démontrer « pour tout n » : on suppose P(n) pour <strong>un</strong> entier n fixé ;", "oublier l’initialisation."])}`,
};

export const SUITES_ARITH_GEO: LessonSpec = {
  title: "Suites arithmétiques et géométriques",
  minutes: 30,
  body: `${objectifs([
      "reconnaître une suite arithmétique ou géométrique ;",
      "calculer un terme et une somme de termes ;",
      "étudier la limite d’une suite géométrique.",
    ])}
    ${tableau([
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
    ])}
    ${exercice(
      "a) (u<sub>n</sub>) est arithmétique avec u<sub>3</sub> = 7 et u<sub>8</sub> = 22. Calcule la raison, u<sub>0</sub> et S = u<sub>0</sub> + u<sub>1</sub> + … + u<sub>10</sub>. b) On place 100 000 F à 5 % par an à intérêts composés : quel est le capital après 10 ans ?",
      [
        "a) u<sub>8</sub> − u<sub>3</sub> = 5r = 15, donc <strong>r = 3</strong> ; u<sub>0</sub> = u<sub>3</sub> − 3r = <strong>−2</strong>.",
        "u<sub>10</sub> = −2 + 30 = 28 ; S compte 11 termes : S = 11 × (−2 + 28)/2 = <strong>143</strong>.",
        "b) Le capital est multiplié par 1,05 chaque année : C<sub>n</sub> = 100 000 × 1,05<sup>n</sup> (suite géométrique).",
        "C<sub>10</sub> = 100 000 × 1,05<sup>10</sup> ≈ <strong>162 889 F</strong>.",
      ],
    )}
    ${erreurs(["se tromper sur le nombre de termes d’une somme : de u<sub>0</sub> à u<sub>n</sub>, il y a n + 1 termes."])}`,
};

export const SUITES_VARIATIONS: LessonSpec = {
  title: "Sens de variation et suites bornées",
  minutes: 25,
  body: `${objectifs([
      "étudier le sens de variation d’une suite par la méthode adaptée ;",
      "montrer qu’une suite est majorée, minorée ou bornée.",
    ])}
    <p>Une suite (${u("n")}) est <strong>croissante</strong> si ${u("n+1")} ≥ ${u("n")} pour tout n, <strong>décroissante</strong> si ${u("n+1")} ≤ ${u("n")}, <strong>monotone</strong> si elle est l’un ou l’autre.</p>
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
    ])}
    ${exercice(
      "a) Étudie le sens de variation de u<sub>n</sub> = n² − 6n + 10. b) Montre que v<sub>n</sub> = 2ⁿ/n! est décroissante à partir du rang 1.",
      [
        "a) u<sub>n+1</sub> − u<sub>n</sub> = (n + 1)² − 6(n + 1) + 10 − (n² − 6n + 10) = 2n − 5.",
        "2n − 5 &lt; 0 pour n ≤ 2 et &gt; 0 pour n ≥ 3 : la suite décroît jusqu’à u<sub>3</sub> = 1, puis croît. Elle est minorée par 1.",
        "b) Les termes sont strictement positifs et v<sub>n+1</sub>/v<sub>n</sub> = 2/(n + 1) ≤ 1 pour n ≥ 1 : (v<sub>n</sub>) est <strong>décroissante</strong> à partir du rang 1.",
      ],
    )}`,
};

export const SUITES_CONVERGENCE: LessonSpec = {
  title: "Limites de suites et théorèmes de convergence",
  minutes: 30,
  body: `${objectifs([
      "calculer la limite d’une suite ;",
      "utiliser les théorèmes de comparaison, des gendarmes et de convergence monotone.",
    ])}
    <p>Une suite <strong>converge</strong> vers ℓ si ses termes deviennent aussi proches de ℓ qu’on veut à partir d’un certain rang ; sinon elle <strong>diverge</strong> (limite infinie ou pas de limite). Les opérations sur les limites sont les mêmes que pour les fonctions.</p>
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
    ${exemple([`${u("n")} = ${frac("(−1)<sup>n</sup>", "n")} pour n ≥ 1 : −${frac("1", "n")} ≤ ${u("n")} ≤ ${frac("1", "n")}, donc la suite converge vers 0.`])}
    ${exercice(
      "Étudie la limite de : a) u<sub>n</sub> = (2n + 1)/(n + 3) ; b) v<sub>n</sub> = (n + sin n)/n ; c) w<sub>n</sub> = 3ⁿ − 2ⁿ.",
      [
        "a) Quotient des termes de plus haut degré : 2n/n = 2, donc u<sub>n</sub> tend vers <strong>2</strong>.",
        "b) −1 ≤ sin n ≤ 1, donc (n − 1)/n ≤ v<sub>n</sub> ≤ (n + 1)/n ; les deux bornes tendent vers 1 : par les gendarmes, v<sub>n</sub> tend vers <strong>1</strong>.",
        "c) w<sub>n</sub> = 3ⁿ(1 − (2/3)ⁿ) ; (2/3)ⁿ tend vers 0 et 3ⁿ vers +∞ : w<sub>n</sub> tend vers <strong>+∞</strong>.",
      ],
    )}`,
};

export const SUITES_RECURRENTES: LessonSpec = {
  title: "Suites définies par u(n+1) = f(u(n))",
  minutes: 35,
  body: `${objectifs([
      "représenter graphiquement une suite u<sub>n+1</sub> = f(u<sub>n</sub>) ;",
      "étudier sa monotonie et sa convergence ; déterminer sa limite ;",
      "utiliser une suite auxiliaire géométrique.",
    ])}
    <p>On représente une telle suite en traçant la courbe de f et la droite y = x : on place ${u("0")} sur l’axe des abscisses, on « monte » à la courbe pour lire ${u("1")} = f(${u("0")}), on le reporte sur l’axe grâce à la droite y = x, et ainsi de suite. Le dessin permet de conjecturer le sens de variation et la limite.</p>
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
    ])}
    ${exercice(
      "u<sub>0</sub> = 1 et u<sub>n+1</sub> = ½u<sub>n</sub> + 3. On pose v<sub>n</sub> = u<sub>n</sub> − 6. Montre que (v<sub>n</sub>) est géométrique, exprime u<sub>n</sub> en fonction de n et trouve sa limite.",
      [
        "v<sub>n+1</sub> = u<sub>n+1</sub> − 6 = ½u<sub>n</sub> − 3 = ½(u<sub>n</sub> − 6) = ½v<sub>n</sub> : (v<sub>n</sub>) est géométrique de raison ½ et de premier terme v<sub>0</sub> = −5.",
        "v<sub>n</sub> = −5 × (½)ⁿ, donc <strong>u<sub>n</sub> = 6 − 5 × (½)ⁿ</strong>.",
        "−1 &lt; ½ &lt; 1, donc (½)ⁿ tend vers 0 et u<sub>n</sub> tend vers <strong>6</strong>. On vérifie que 6 est bien solution de ℓ = ½ℓ + 3.",
      ],
    )}
    ${auBac("Le plan classique d’un exercice de suite récurrente : bornes par récurrence, monotonie, convergence (théorème de la limite monotone), puis calcul de la limite par ℓ = f(ℓ).")}`,
};

// ── Calcul intégral ─────────────────────────────────────────────────────────

export const PRIMITIVES: LessonSpec = {
  title: "Primitives",
  minutes: 30,
  body: `${objectifs([
      "connaître les primitives des fonctions usuelles et des formes composées ;",
      "déterminer la primitive qui prend une valeur donnée en un point.",
    ])}
    <p>F est une <strong>primitive</strong> de f sur un intervalle I si F’ = f sur I. Toute fonction continue sur I admet des primitives ; si F en est une, les autres sont les F + C (C constante). Une seule prend une valeur donnée en un point.</p>
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
    ])}
    ${exercice(
      "Détermine une primitive de : a) f(x) = 3x² − 4x + 5 ; b) g(x) = x/(x² + 1)² ; c) h(x) = cos x sin² x ; d) k(x) = e<sup>2x</sup>. Puis la primitive F de f telle que F(1) = 0.",
      [
        "a) x³ − 2x² + 5x.",
        "b) g = ½ × u’/u² avec u = x² + 1 : une primitive est <strong>−1/(2(x² + 1))</strong>.",
        "c) h = u’u² avec u = sin x : une primitive est <strong>sin³ x / 3</strong>.",
        "d) <strong>½ e<sup>2x</sup></strong>.",
        "F(x) = x³ − 2x² + 5x + C et F(1) = 4 + C = 0, donc <strong>F(x) = x³ − 2x² + 5x − 4</strong>.",
      ],
    )}
    ${erreurs(["oublier le coefficient pour retrouver exactement u’ (le ½ de la question b) ;", "dériver au lieu de primitiver : vérifie toujours que F’ = f."])}`,
};

export const INTEGRALE_PROPRIETES: LessonSpec = {
  title: "Intégrale d’une fonction et propriétés",
  minutes: 30,
  body: `${objectifs([
      "calculer une intégrale à l’aide d’une primitive ;",
      "utiliser la linéarité, la relation de Chasles et les inégalités ;",
      "calculer une valeur moyenne.",
    ])}
    <p>Si f est continue sur un intervalle contenant a et b, et F une primitive de f :</p>
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
    ${exemple([`${integ("0", "1")} (3x² + 2x) dx = [x³ + x²]<sub>0</sub><sup>1</sup> = 2.`])}
    ${exercice(
      "a) Calcule I = ∫ de 1 à 2 de (1/x + 2x) dx. b) Calcule la valeur moyenne de sin sur [0 ; π]. c) Encadre J = ∫ de 0 à 1 de dx/(1 + x²).",
      [
        "a) I = [ln x + x²] entre 1 et 2 = (ln 2 + 4) − (0 + 1) = <strong>3 + ln 2</strong>.",
        "b) μ = (1/π) ∫ de 0 à π de sin x dx = (1/π)[−cos x] entre 0 et π = <strong>2/π</strong>.",
        "c) Pour x dans [0 ; 1], 1 ≤ 1 + x² ≤ 2, donc 1/2 ≤ 1/(1 + x²) ≤ 1 ; par l’inégalité de la moyenne, <strong>1/2 ≤ J ≤ 1</strong>.",
      ],
    )}`,
};

export const INTEGRATION_PAR_PARTIES: LessonSpec = {
  title: "Intégration par parties et changement de variable",
  minutes: 35,
  body: `${objectifs([
      "calculer une intégrale par parties ;",
      "utiliser un changement de variable affine et la linéarisation.",
    ])}
    <p>Si u et v sont dérivables à dérivées continues sur [a ; b] :</p>
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
    ${exemple([`${integ("0", "π")} sin² x dx = ${integ("0", "π")} ${frac("1 − cos 2x", "2")} dx = [${frac("x", "2")} − ${frac("sin 2x", "4")}]<sub>0</sub><sup>π</sup> = ${frac("π", "2")}.`])}
    ${exercice(
      "Calcule a) A = ∫ de 0 à π de x cos x dx ; b) B = ∫ de 1 à e de x ln x dx.",
      [
        "a) u = x, v’ = cos x, donc u’ = 1, v = sin x : A = [x sin x] entre 0 et π − ∫ de 0 à π de sin x dx = 0 − [−cos x] entre 0 et π = <strong>−2</strong>.",
        "b) u = ln x, v’ = x, donc u’ = 1/x, v = x²/2 : B = [x²/2 × ln x] entre 1 et e − ∫ de 1 à e de x/2 dx.",
        "B = e²/2 − [x²/4] entre 1 et e = e²/2 − (e² − 1)/4 = <strong>(e² + 1)/4</strong>.",
      ],
    )}
    ${auBac("Si l’énoncé ne donne pas u et v’, choisis pour u la fonction que la dérivation simplifie (polynôme, ln) ; si l’intégrale obtenue est plus compliquée, échange les rôles.")}`,
};

export const AIRES_VOLUMES: LessonSpec = {
  title: "Calcul d’aires et de volumes",
  minutes: 40,
  body: `${objectifs([
      "calculer l’aire d’un domaine plan en unités d’aire puis en cm² ;",
      "calculer un volume par ∫ S(z) dz ou π ∫ f² ;",
      "(S2) calculer une masse, un centre d’inertie et un moment d’inertie.",
    ])}
    <p>L’aire du domaine compris entre les courbes de f et g et les droites x = a et x = b (a &lt; b) vaut ${integ("a", "b")} |f(x) − g(x)| dx unités d’aire. On découpe [a ; b] selon le signe de f − g.</p>
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
    <p>Quand on ne connaît pas de primitive, on découpe [a ; b] en n intervalles de largeur h = ${frac("b − a", "n")} et on additionne des aires de rectangles (méthode des rectangles) ou de trapèzes (méthode des trapèzes, plus précise).</p>
    <h2>Masse, centre d’inertie et moment d’inertie (séries S2 et S4)</h2>
    <p>Pour une tige placée sur l’axe des abscisses entre a et b, de masse linéique ρ(x) (en kg/m) :</p>
    ${liste([
      "masse : m = ∫ de a à b de ρ(x) dx ;",
      "abscisse du centre d’inertie : x<sub>G</sub> = (1/m) ∫ de a à b de x ρ(x) dx ;",
      "moment d’inertie par rapport à l’axe perpendiculaire en O : J = ∫ de a à b de x² ρ(x) dx.",
    ])}
    ${exemple(["Tige de longueur L avec ρ(x) = kx : m = kL²/2, x<sub>G</sub> = (kL³/3) ÷ (kL²/2) = 2L/3 et J = kL⁴/4 = mL²/2."])}
    ${exercice(
      "a) Calcule l’aire du domaine compris entre les courbes y = x et y = x² pour 0 ≤ x ≤ 1, avec ‖i⃗‖ = ‖j⃗‖ = 2 cm. b) Calcule le volume engendré par la rotation autour de (Ox) de la courbe y = √x pour 0 ≤ x ≤ 4.",
      [
        "a) Sur [0 ; 1], x ≥ x² : A = ∫ de 0 à 1 de (x − x²) dx = 1/2 − 1/3 = 1/6 u.a.",
        "1 u.a. = 2 × 2 = 4 cm², donc A = 4/6 = <strong>2/3 cm²</strong>.",
        "b) V = π ∫ de 0 à 4 de (√x)² dx = π [x²/2] entre 0 et 4 = <strong>8π</strong> unités de volume.",
      ],
    )}`,
};

// ── Équations différentielles ───────────────────────────────────────────────

export const EQDIFF_ORDRE1: LessonSpec = {
  title: "Équations différentielles y’ = ay + b",
  minutes: 25,
  body: `${objectifs([
      "résoudre y’ = ay et y’ = ay + b ;",
      "déterminer la solution vérifiant une condition initiale et l’utiliser dans un problème concret.",
    ])}
    <p>Une <strong>équation différentielle</strong> a pour inconnue une fonction y. Les solutions de y’ = ay (a réel) sur ℝ sont les fonctions :</p>
    ${formula("y(x) = C e<sup>ax</sup>, C constante réelle")}
    <p>Il existe une seule solution qui vérifie une condition initiale y(x₀) = y₀.</p>
    ${retenir(`Les solutions de y’ = ay + b (a ≠ 0) sont y(x) = C e${sup("ax")} − ${frac("b", "a")} : la fonction constante −${frac("b", "a")} est une solution particulière.`)}
    ${exemple([
      "y’ = −2y avec y(0) = 3 : y(x) = 3e<sup>−2x</sup>.",
      "y’ + 2y = 4, soit y’ = −2y + 4 : y(x) = Ce<sup>−2x</sup> + 2.",
    ])}
    <p>Ces équations décrivent la charge d’un condensateur, la désintégration radioactive (N’ = −λN) ou le refroidissement d’un corps.</p>
    ${exercice(
      "Un café à 90 °C refroidit dans une pièce à 20 °C. Sa température θ(t) (t en minutes) vérifie θ’ = −0,1(θ − 20). Exprime θ(t) et calcule le temps nécessaire pour qu’il atteigne 50 °C.",
      [
        "On pose y = θ − 20 : y’ = −0,1 y, donc y(t) = C e<sup>−0,1t</sup>.",
        "θ(0) = 90 donne y(0) = 70 = C : <strong>θ(t) = 20 + 70 e<sup>−0,1t</sup></strong>.",
        "θ(t) = 50 ⇔ e<sup>−0,1t</sup> = 3/7 ⇔ t = 10 ln(7/3) ≈ <strong>8,5 min</strong>.",
      ],
    )}`,
};

export const EQDIFF_ORDRE2: LessonSpec = {
  title: "Équations différentielles y’’ + ay’ + by = 0",
  minutes: 30,
  body: `${objectifs([
      "résoudre une équation y’’ + ay’ + by = 0 à l’aide de l’équation caractéristique ;",
      "déterminer la solution vérifiant deux conditions initiales.",
    ])}
    <p>On cherche des solutions de la forme e${sup("rx")} : r doit vérifier l’<strong>équation caractéristique</strong> r² + ar + b = 0, de discriminant Δ = a² − 4b.</p>
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
    <p>Deux conditions initiales (y(x₀) et y’(x₀)) déterminent une solution unique.</p>
    ${exercice(
      "Résous y’’ + 2y’ + 5y = 0, puis trouve la solution telle que y(0) = 1 et y’(0) = 1.",
      [
        "Équation caractéristique : r² + 2r + 5 = 0, Δ = −16, racines −1 ± 2i.",
        "Solutions : y(x) = e<sup>−x</sup>(A cos 2x + B sin 2x).",
        "y(0) = A = 1 ; y’(x) = e<sup>−x</sup>[(2B − A) cos 2x − (2A + B) sin 2x], donc y’(0) = 2B − A = 1 et B = 1.",
        "<strong>y(x) = e<sup>−x</sup>(cos 2x + sin 2x)</strong> : ce sont des oscillations amorties.",
      ],
    )}
    ${auBac("Ces équations modélisent les oscillations électriques et mécaniques vues en sciences physiques : x’’ + ω²x = 0 a pour solutions A cos ωt + B sin ωt.")}`,
};

export const EQDIFF_SECOND_MEMBRE: LessonSpec = {
  title: "Équations avec second membre",
  minutes: 30,
  body: `${objectifs([
      "trouver une solution particulière à l’aide de l’indication donnée ;",
      "en déduire toutes les solutions et celle qui vérifie des conditions initiales.",
    ])}
    <p>Pour une équation linéaire « avec second membre » (E), comme y’’ + ay’ + by = g(x), on procède en deux temps.</p>
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
    ${retenir("Au premier ordre, y’ = ay + g(x) se traite de la même façon : solution particulière + C e<sup>ax</sup>.")}
    ${exercice(
      "(E) : y’’ − 3y’ + 2y = 2x − 3. Détermine une solution particulière affine, puis toutes les solutions de (E).",
      [
        "On cherche y<sub>p</sub> = ax + b : y<sub>p</sub>’’ − 3y<sub>p</sub>’ + 2y<sub>p</sub> = 2ax + 2b − 3a = 2x − 3.",
        "Par identification : 2a = 2 et 2b − 3a = −3, donc a = 1 et b = 0 : <strong>y<sub>p</sub>(x) = x</strong>.",
        "Équation sans second membre : r² − 3r + 2 = 0, r = 1 ou 2, solutions C₁e<sup>x</sup> + C₂e<sup>2x</sup>.",
        "Solutions de (E) : <strong>y(x) = C₁e<sup>x</sup> + C₂e<sup>2x</sup> + x</strong>.",
      ],
    )}`,
};
