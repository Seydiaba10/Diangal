// Mathématiques de Terminale S1 : géométrie plane, géométrie dans l'espace et courbes planes
// (programme S1-S3 de 2006, Office du Bac). Leçons rédigées par DIANGAL, à faire valider par un
// enseignant.

import { exemple, formula, frac, type LessonSpec, liste, methode, retenir, sqrt, tableau, vec } from "./blocks";

// ── Barycentres et lignes de niveau ─────────────────────────────────────────

export const BARYCENTRE: LessonSpec = {
  title: "Barycentre de n points pondérés",
  minutes: 15,
  body: `<p>Soient des points A₁, …, A<sub>n</sub> affectés des coefficients α₁, …, α<sub>n</sub> de somme S = α₁ + … + α<sub>n</sub> ≠ 0. Il existe un unique point G, le <strong>barycentre</strong>, tel que :</p>
    ${formula(`α₁${vec("GA₁")} + … + α<sub>n</sub>${vec("GA<sub>n</sub>")} = ${vec("0")}`)}
    ${retenir(`Pour tout point M : α₁${vec("MA₁")} + … + α<sub>n</sub>${vec("MA<sub>n</sub>")} = S ${vec("MG")}. Ses coordonnées sont les moyennes pondérées : x<sub>G</sub> = ${frac("α₁x₁ + … + α<sub>n</sub>x<sub>n</sub>", "S")}.`)}
    ${liste([
      "on peut multiplier tous les coefficients par un même réel non nul ;",
      "associativité : on peut remplacer des points par leur barycentre partiel, affecté de la somme de leurs coefficients ;",
      "si S = 0, le vecteur Σ α<sub>i</sub> MA<sub>i</sub>⃗ ne dépend pas de M ;",
      "une application affine (translation, homothétie, rotation, similitude…) conserve le barycentre.",
    ])}
    ${exemple([
      "G barycentre de (A, 1), (B, 2), (C, 1) : avec I milieu de [AC], G est le barycentre de (I, 2), (B, 2), c’est-à-dire le milieu de [IB].",
    ])}`,
};

export const FONCTIONS_LEIBNIZ: LessonSpec = {
  title: "Fonctions vectorielles et scalaires de Leibniz",
  minutes: 15,
  body: `<p>On étudie f(M) = α₁MA₁² + … + α<sub>n</sub>MA<sub>n</sub>² pour trouver les <strong>lignes de niveau</strong> f(M) = k.</p>
    ${tableau([
      ["Somme S des coefficients", "Réduction", "Ligne de niveau f(M) = k"],
      ["S ≠ 0 (G barycentre)", "f(M) = S MG² + f(G)", "cercle de centre G, un point ou l’ensemble vide"],
      ["S = 0", `f(M) = 2 ${vec("MO")} · ${vec("w")} + constante (w⃗ fixe)`, "une droite orthogonale à w⃗ (ou ∅, ou le plan)"],
    ])}
    ${exemple([
      "Lieu des points M tels que MA² + MB² = k, avec I milieu de [AB] : MA² + MB² = 2MI² + ½AB².",
      "C’est un cercle de centre I si k &gt; ½AB², le point I si k = ½AB², vide sinon.",
      "MA² − MB² = k : on obtient une droite perpendiculaire à (AB).",
    ])}
    ${methode([
      `Faire apparaître le barycentre G : ${vec("MA<sub>i</sub>")} = ${vec("MG")} + ${vec("GA<sub>i</sub>")}.`,
      `Développer les carrés ; le terme 2${vec("MG")} · Σα<sub>i</sub>${vec("GA<sub>i</sub>")} est nul.`,
      "Conclure selon le signe de (k − f(G)) ÷ S.",
    ])}`,
};

export const LIGNES_DE_NIVEAU: LessonSpec = {
  title: "Lignes de niveau et points cocycliques",
  minutes: 15,
  body: `${tableau([
      ["Ensemble des points M tels que", "Nature"],
      [`${frac("MA", "MB")} = k, k ≠ 1`, "cercle (cercle d’Apollonius), car MA² − k²MB² = 0"],
      [`${frac("MA", "MB")} = 1`, "médiatrice de [AB]"],
      [`${vec("MA")} · ${vec("MB")} = k`, `cercle de centre I milieu de [AB], car ${vec("MA")} · ${vec("MB")} = MI² − ${frac("AB²", "4")}`],
      [`(${vec("MA")}, ${vec("MB")}) = α [2π]`, "arc de cercle d’extrémités A et B (privé de A et B)"],
      [`(${vec("MA")}, ${vec("MB")}) = α [π]`, "cercle passant par A et B (privé de A et B)"],
    ])}
    ${retenir(`Quatre points A, B, C, D, trois à trois non alignés, sont <strong>cocycliques</strong> si et seulement si (${vec("CA")}, ${vec("CB")}) = (${vec("DA")}, ${vec("DB")}) [π].`)}
    ${exemple([
      `Lieu des points M tels que (${vec("MA")}, ${vec("MB")}) = ${frac("π", "2")} [π] : c’est le cercle de diamètre [AB], privé de A et B.`,
    ])}`,
};

// ── Isométries et similitudes ───────────────────────────────────────────────

export const ISOMETRIES: LessonSpec = {
  title: "Isométries du plan",
  minutes: 12,
  body: `<p>Une <strong>isométrie</strong> conserve les distances : translations, rotations, réflexions (symétries axiales), symétries centrales et leurs composées. Ce sont des applications affines qui conservent le barycentre, l’alignement, les angles géométriques et les aires.</p>
    ${liste([
      "un <strong>déplacement</strong> conserve aussi les angles orientés : translation ou rotation ;",
      "un <strong>antidéplacement</strong> les change en leurs opposés : réflexion ou symétrie glissée.",
    ])}
    ${tableau([
      ["Composée de deux réflexions d’axes D et D’", "Résultat"],
      ["D et D’ parallèles", `translation de vecteur 2${vec("u")}, où u⃗ va de D à D’ perpendiculairement`],
      ["D et D’ sécants en O, (D, D’) = θ", "rotation de centre O et d’angle 2θ"],
      ["D = D’", "identité"],
    ])}
    ${retenir("Toute rotation (et toute translation) peut s’écrire comme composée de deux réflexions, l’un des axes pouvant être choisi.")}`,
};

export const TRIANGLES_SEMBLABLES: LessonSpec = {
  title: "Triangles semblables",
  minutes: 12,
  body: `<p>Deux triangles ABC et A’B’C’ sont <strong>directement semblables</strong> s’il existe une similitude directe qui transforme A en A’, B en B’ et C en C’.</p>
    ${retenir(`ABC et A’B’C’ sont directement semblables si et seulement si ${frac("z<sub>C</sub> − z<sub>A</sub>", "z<sub>B</sub> − z<sub>A</sub>")} = ${frac("z<sub>C’</sub> − z<sub>A’</sub>", "z<sub>B’</sub> − z<sub>A’</sub>")}.`)}
    ${liste([
      "deux triangles ayant deux angles orientés égaux sont directement semblables ;",
      "deux triangles dont les côtés sont proportionnels sont semblables (directement ou non) ;",
      "le rapport de similitude est le quotient des longueurs de deux côtés homologues.",
    ])}
    ${exemple([
      "Un triangle de côtés 3, 4, 5 et un triangle de côtés 6, 8, 10 sont semblables, de rapport 2 : l’aire est multipliée par 4.",
    ])}
    ${methode([
      "Repérer les sommets homologues (angles égaux).",
      "Écrire l’égalité des rapports de côtés ou des quotients complexes.",
      "En déduire longueurs, angles ou la similitude qui passe de l’un à l’autre.",
    ])}`,
};

// ── Géométrie dans l'espace ─────────────────────────────────────────────────

export const PRODUIT_VECTORIEL: LessonSpec = {
  title: "Orientation de l’espace et produit vectoriel",
  minutes: 15,
  body: `<p>Un repère (O ; i⃗, j⃗, k⃗) est <strong>direct</strong> si un observateur debout sur k⃗ (le « bonhomme d’Ampère ») voit i⃗ tourner vers j⃗ dans le sens inverse des aiguilles d’une montre.</p>
    <p>Le <strong>produit vectoriel</strong> de u⃗ et v⃗ non colinéaires est le vecteur w⃗ = u⃗ ∧ v⃗ :</p>
    ${liste([
      "orthogonal à u⃗ et à v⃗ ;",
      "tel que (u⃗, v⃗, w⃗) soit direct ;",
      "de norme ‖u⃗‖ × ‖v⃗‖ × |sin θ|, où θ est l’angle entre u⃗ et v⃗.",
    ])}
    <p>Si u⃗ et v⃗ sont colinéaires, u⃗ ∧ v⃗ = 0⃗.</p>
    ${retenir("v⃗ ∧ u⃗ = −u⃗ ∧ v⃗ (antisymétrie) ; le produit vectoriel est distributif sur l’addition ; u⃗ ∧ v⃗ = 0⃗ ⇔ u⃗ et v⃗ colinéaires.")}
    ${formula("Dans un repère orthonormé direct : u⃗(x ; y ; z) ∧ v⃗(x’ ; y’ ; z’) = (yz’ − zy’ ; zx’ − xz’ ; xy’ − yx’)")}
    ${exemple(["u⃗(1 ; 2 ; 3) ∧ v⃗(4 ; 5 ; 6) = (2×6 − 3×5 ; 3×4 − 1×6 ; 1×5 − 2×4) = (−3 ; 6 ; −3)."])}`,
};

export const PRODUIT_VECTORIEL_APPLICATIONS: LessonSpec = {
  title: "Applications du produit vectoriel",
  minutes: 15,
  body: `${liste([
      `Aire du parallélogramme ABDC : ‖${vec("AB")} ∧ ${vec("AC")}‖ ; aire du triangle ABC : ${frac("1", "2")}‖${vec("AB")} ∧ ${vec("AC")}‖.`,
      `${vec("AB")} ∧ ${vec("AC")} est un <strong>vecteur normal</strong> au plan (ABC) : il donne une équation du plan.`,
      `A, B, C sont alignés si et seulement si ${vec("AB")} ∧ ${vec("AC")} = 0⃗.`,
      `Distance d’un point M à la droite (AB) : d = ${frac(`‖${vec("AM")} ∧ ${vec("AB")}‖`, "AB")}.`,
    ])}
    ${exemple([
      "A(1 ; 0 ; 0), B(0 ; 2 ; 0), C(0 ; 0 ; 3) : AB⃗(−1 ; 2 ; 0), AC⃗(−1 ; 0 ; 3).",
      "AB⃗ ∧ AC⃗ = (2×3 − 0×0 ; 0×(−1) − (−1)×3 ; (−1)×0 − 2×(−1)) = (6 ; 3 ; 2).",
      "Plan (ABC) : 6x + 3y + 2z + d = 0 et A donne d = −6, soit 6x + 3y + 2z = 6.",
      `Aire de ABC : ½ × ${sqrt("(36 + 9 + 4)")} = 3,5 u.a.`,
    ])}`,
};

export const PRODUIT_MIXTE: LessonSpec = {
  title: "Produit mixte et volumes",
  minutes: 12,
  body: `<p>Le <strong>produit mixte</strong> de trois vecteurs est le réel [u⃗, v⃗, w⃗] = (u⃗ ∧ v⃗) · w⃗. Dans un repère orthonormé direct, c’est le déterminant des trois vecteurs.</p>
    ${liste([
      "il change de signe quand on échange deux vecteurs ;",
      "il est nul si et seulement si u⃗, v⃗, w⃗ sont coplanaires ;",
      "|[u⃗, v⃗, w⃗]| est le volume du parallélépipède construit sur u⃗, v⃗, w⃗.",
    ])}
    ${formula(`Volume du tétraèdre ABCD : V = ${frac("1", "6")} |[${vec("AB")}, ${vec("AC")}, ${vec("AD")}]|`)}
    ${exemple([
      "A(0 ; 0 ; 0), B(1 ; 0 ; 0), C(0 ; 2 ; 0), D(0 ; 0 ; 3) : AB⃗ ∧ AC⃗ = (0 ; 0 ; 2) et (0 ; 0 ; 2) · AD⃗ = 6.",
      "V = 6 ÷ 6 = 1 unité de volume.",
    ])}
    ${retenir(`Distance entre deux droites non parallèles D₁ (passant par A, dirigée par u⃗) et D₂ (passant par C, dirigée par v⃗) : d = ${frac(`|[u⃗, v⃗, ${vec("AC")}]|`, "‖u⃗ ∧ v⃗‖")}.`)}`,
};

export const TRANSFORMATIONS_ESPACE: LessonSpec = {
  title: "Translations, homothéties et réflexions de l’espace",
  minutes: 12,
  body: `${tableau([
      ["Transformation", "Définition (M a pour image M’)"],
      ["Translation de vecteur u⃗", `${vec("MM’")} = u⃗`],
      ["Homothétie de centre Ω et de rapport k ≠ 0", `${vec("ΩM’")} = k${vec("ΩM")}`],
      ["Réflexion de plan P", "P est le plan médiateur de [MM’] (M’ = M si M ∈ P)"],
    ])}
    ${liste([
      "translations et réflexions sont des isométries : elles conservent les distances ;",
      "une homothétie de rapport k multiplie les distances par |k| et les volumes par |k|³ ;",
      "toutes conservent l’alignement, le parallélisme et les barycentres.",
    ])}
    ${retenir("Composée de deux réflexions de plans parallèles P et P’ : translation de vecteur 2u⃗, où u⃗ va de P à P’ perpendiculairement aux plans.")}
    ${exemple(["Pour construire l’image d’un point par la réflexion de plan P, on trace la perpendiculaire à P passant par M ; elle coupe P en H, et M’ est le symétrique de M par rapport à H."])}`,
};

export const ROTATIONS_ESPACE: LessonSpec = {
  title: "Rotations et demi-tours de l’espace",
  minutes: 12,
  body: `<p>Soit Δ une droite orientée (l’<strong>axe</strong>) et θ un réel. La <strong>rotation</strong> d’axe Δ et d’angle θ transforme M en M’ situé dans le plan perpendiculaire à Δ passant par M, avec, si H est le point de Δ de ce plan : HM’ = HM et (${vec("HM")}, ${vec("HM’")}) = θ, l’angle étant orienté par l’orientation de Δ.</p>
    ${liste([
      "c’est une isométrie qui laisse fixes les points de l’axe ;",
      "dans chaque plan perpendiculaire à l’axe, elle induit une rotation plane d’angle θ (la « rotation induite ») ;",
      "pour θ = π, c’est le <strong>demi-tour</strong> d’axe Δ, ou symétrie orthogonale par rapport à la droite Δ.",
    ])}
    ${retenir("La composée de deux réflexions de plans P et P’ sécants selon Δ est une rotation d’axe Δ et d’angle 2θ, où θ est l’angle de P à P’. Inversement, toute rotation se décompose en deux réflexions.")}
    ${exemple(["Deux réflexions de plans perpendiculaires (θ = π/2) donnent une rotation d’angle π : c’est le demi-tour autour de leur droite commune."])}`,
};

// ── Courbes planes ──────────────────────────────────────────────────────────

export const COURBES_PARAMETREES: LessonSpec = {
  title: "Courbes paramétrées et tangentes",
  minutes: 15,
  body: `<p>Quand t décrit un intervalle I, le point M(t) de coordonnées x(t) et y(t) décrit une <strong>courbe paramétrée</strong> : ${vec("OM")}(t) = x(t) i⃗ + y(t) j⃗.</p>
    ${retenir("Le <strong>vecteur dérivé</strong> a pour coordonnées (x’(t) ; y’(t)). S’il n’est pas nul, il dirige la tangente à la courbe en M(t).")}
    ${methode([
      "Réduire l’intervalle d’étude (périodicité, symétries : par exemple si x(−t) = x(t) et y(−t) = −y(t), la courbe est symétrique par rapport à (Ox)).",
      "Étudier les variations de x et de y dans un même tableau.",
      "Placer les points à tangente horizontale (y’(t) = 0, x’(t) ≠ 0) et verticale (x’(t) = 0, y’(t) ≠ 0).",
      "Tracer, puis compléter par les symétries.",
    ], "Étudier une courbe paramétrée")}
    ${exemple([
      "x(t) = R cos t et y(t) = R sin t, t ∈ [0 ; 2π[ : c’est le cercle de centre O et de rayon R.",
      "Vecteur dérivé : (−R sin t ; R cos t), orthogonal à OM⃗ : la tangente au cercle est perpendiculaire au rayon.",
    ])}`,
};

export const CINEMATIQUE_COURBES: LessonSpec = {
  title: "Vitesse, accélération et courbes remarquables",
  minutes: 15,
  body: `<p>Si t est le temps, M(t) est la position d’un mobile. Le <strong>vecteur vitesse</strong> est le vecteur dérivé v⃗(t) = (x’(t) ; y’(t)) ; le <strong>vecteur accélération</strong> est a⃗(t) = (x’’(t) ; y’’(t)). La vitesse scalaire est ‖v⃗(t)‖.</p>
    ${tableau([
      ["Courbe", "Équations paramétriques"],
      ["Cycloïde (trajectoire d’un point d’une roue qui roule)", "x = a(t − sin t), y = a(1 − cos t)"],
      ["Astroïde", "x = a cos³ t, y = a sin³ t"],
    ])}
    ${exemple([
      "Cycloïde : v⃗(t) = (a(1 − cos t) ; a sin t) et ‖v⃗(t)‖ = 2a|sin(t/2)|.",
      "La vitesse s’annule pour t = 2kπ : le point de la roue touche le sol et repart, la courbe a un point de rebroussement.",
    ])}
    ${retenir("Pour un mouvement circulaire uniforme (x = R cos ωt, y = R sin ωt), ‖v⃗‖ = Rω et a⃗ = −ω² OM⃗ : l’accélération est dirigée vers le centre.")}`,
};

export const CONIQUES_DEFINITION: LessonSpec = {
  title: "Coniques : foyer, directrice, excentricité",
  minutes: 12,
  body: `<p>Soit une droite D (la <strong>directrice</strong>), un point F hors de D (le <strong>foyer</strong>) et un réel e &gt; 0 (l’<strong>excentricité</strong>). Si H est le projeté orthogonal de M sur D, l’ensemble des points M tels que</p>
    ${formula(`${frac("MF", "MH")} = e`)}
    <p>est une <strong>conique</strong> :</p>
    ${tableau([
      ["Excentricité", "Conique"],
      ["e &lt; 1", "ellipse"],
      ["e = 1", "parabole"],
      ["e &gt; 1", "hyperbole"],
    ])}
    ${retenir("La droite passant par F et perpendiculaire à D est l’axe focal ; c’est un axe de symétrie. Les sommets sont les points de la conique situés sur cet axe.")}
    ${exemple(["Les orbites des planètes sont des ellipses dont le Soleil occupe un foyer ; les antennes paraboliques et les phares utilisent la propriété de réflexion de la parabole."])}`,
};

export const PARABOLE: LessonSpec = {
  title: "La parabole",
  minutes: 12,
  body: `<p>Dans un repère orthonormé bien choisi, la parabole de foyer F et de directrice D a pour équation réduite :</p>
    ${formula(`y² = 2px, avec p &gt; 0 ; foyer F(${frac("p", "2")} ; 0) ; directrice x = −${frac("p", "2")}`)}
    ${liste([
      "le sommet est O, l’axe de symétrie est (Ox) ;",
      `la tangente au point M₀(x₀ ; y₀) a pour équation y y₀ = p(x + x₀) ;`,
      "représentation paramétrique : x = t²/(2p), y = t.",
    ])}
    ${exemple([
      "y² = 4x : 2p = 4, donc p = 2, F(1 ; 0) et directrice x = −1.",
      "Le point M(1 ; 2) est sur la parabole : MF = 2 et sa distance à la directrice est 1 + 1 = 2.",
      "Tangente en M : 2y = 2(x + 1), soit y = x + 1.",
    ])}
    ${retenir("y = ax² + bx + c (a ≠ 0) est aussi une parabole, d’axe vertical.")}`,
};

export const ELLIPSE: LessonSpec = {
  title: "L’ellipse",
  minutes: 15,
  body: `${formula(`Équation réduite : ${frac("x²", "a²")} + ${frac("y²", "b²")} = 1, avec a &gt; b &gt; 0`)}
    ${liste([
      `c = ${sqrt("(a² − b²)")} ; foyers F(c ; 0) et F’(−c ; 0) ; excentricité e = ${frac("c", "a")} &lt; 1 ;`,
      `directrices x = ±${frac("a²", "c")} ; sommets (±a ; 0) et (0 ; ±b) ; centre O ;`,
      "définition bifocale : MF + MF’ = 2a ;",
      "représentation paramétrique : x = a cos t, y = b sin t ;",
      `tangente en M₀(x₀ ; y₀) : ${frac("x x₀", "a²")} + ${frac("y y₀", "b²")} = 1.`,
    ])}
    ${exemple([
      `${frac("x²", "25")} + ${frac("y²", "9")} = 1 : a = 5, b = 3, c = ${sqrt("(25 − 9)")} = 4, e = 0,8.`,
      `Foyers (±4 ; 0) ; directrices x = ±${frac("25", "4")}.`,
    ])}
    ${retenir("L’ellipse est l’image du cercle de centre O et de rayon a par l’affinité orthogonale d’axe (Ox) et de rapport b/a. C’est la « méthode du jardinier » : une corde de longueur 2a attachée aux deux foyers.")}`,
};

export const HYPERBOLE: LessonSpec = {
  title: "L’hyperbole",
  minutes: 15,
  body: `${formula(`Équation réduite : ${frac("x²", "a²")} − ${frac("y²", "b²")} = 1, avec a &gt; 0 et b &gt; 0`)}
    ${liste([
      `c = ${sqrt("(a² + b²)")} ; foyers (±c ; 0) ; excentricité e = ${frac("c", "a")} &gt; 1 ; sommets (±a ; 0) ;`,
      `asymptotes : y = ${frac("b", "a")}x et y = −${frac("b", "a")}x ;`,
      "définition bifocale : |MF − MF’| = 2a ;",
      "représentation paramétrique : x = a/cos t, y = b tan t ;",
      `tangente en M₀(x₀ ; y₀) : ${frac("x x₀", "a²")} − ${frac("y y₀", "b²")} = 1.`,
    ])}
    ${exemple([
      `${frac("x²", "9")} − ${frac("y²", "16")} = 1 : a = 3, b = 4, c = 5, e = ${frac("5", "3")} ; asymptotes y = ±${frac("4", "3")}x.`,
    ])}
    ${retenir(`Rapportée à ses asymptotes (si elles sont perpendiculaires, a = b, hyperbole équilatère), l’hyperbole a une équation de la forme XY = k : c’est la courbe de x ↦ ${frac("k", "x")}.`)}
    ${methode([
      "Mettre l’équation sous forme canonique (compléter les carrés).",
      "Identifier le signe des coefficients : même signe → ellipse (ou cercle) ; signes contraires → hyperbole ; un seul carré → parabole.",
      "Lire le centre, a, b, puis calculer c, e, les foyers.",
    ], "Reconnaître une conique")}
    ${exemple([`x² + 4y² − 2x − 3 = 0 s’écrit (x − 1)² + 4y² = 4, soit ${frac("(x − 1)²", "4")} + y² = 1 : ellipse de centre (1 ; 0), a = 2, b = 1.`])}`,
};
