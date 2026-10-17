// Mathématiques de 2nde : programmes officiels du second cycle (MEN, 2006, APAMS) : seconde S
// (activités numériques, statistique, géométrie plane et dans l’espace) et séries L (seconde L). Les
// chapitres communs aux deux séries sont partagés. Leçons rédigées par DIANGAL, à faire valider par un
// enseignant.

import { type ChapterSpec, exemple, formula, frac, liste, methode, retenir, sqrt, sup, tableau, vec } from "../tle/blocks";

const NUM = "Activités numériques";
const GEO = "Activités géométriques";

const SECOND_DEGREE: ChapterSpec = {
  title: "Équations et inéquations du second degré",
  summary: "Forme canonique, discriminant, racines, somme et produit, signe du trinôme.",
  strand: NUM,
  lessons: [
    {
      title: "Résoudre une équation du second degré",
      minutes: 15,
      body: `<p>Pour ax${sup("2")} + bx + c = 0 (a ≠ 0), on calcule le <strong>discriminant</strong> :</p>
        ${formula(`Δ = b${sup("2")} − 4ac`)}
        ${tableau([
          ["Signe de Δ", "Solutions"],
          ["Δ &gt; 0", `deux racines : x = ${frac("−b − √Δ", "2a")} et x = ${frac("−b + √Δ", "2a")}`],
          ["Δ = 0", `une racine double : x = ${frac("−b", "2a")}`],
          ["Δ &lt; 0", "aucune racine réelle"],
        ])}
        ${exemple([`x${sup("2")} − 5x + 6 = 0 : Δ = 25 − 24 = 1, donc x = 2 ou x = 3.`])}
        ${retenir(`Si les racines existent, leur somme vaut ${frac("−b", "a")} et leur produit ${frac("c", "a")} : deux nombres de somme 7 et de produit 12 sont les racines de x${sup("2")} − 7x + 12 = 0, soit 3 et 4.`)}`,
    },
    {
      title: "Signe du trinôme et inéquations",
      minutes: 15,
      body: `${liste([
          "le trinôme a le signe de a <strong>à l’extérieur</strong> des racines et le signe contraire entre les racines ;",
          "s’il n’a pas de racine, il a toujours le signe de a ;",
          "pour résoudre une inéquation, on étudie le signe dans un tableau.",
        ])}
        ${exemple([`x${sup("2")} − 5x + 6 &lt; 0 : a = 1 &gt; 0, le trinôme est négatif entre ses racines : x ∈ ]2 ; 3[.`])}`,
    },
  ],
};

const SYSTEMS: ChapterSpec = {
  title: "Systèmes d’équations et d’inéquations à deux inconnues",
  summary: "Substitution, combinaison, déterminant ; régionnement du plan.",
  strand: NUM,
  lessons: [
    {
      title: "Systèmes de deux équations",
      minutes: 15,
      body: `${liste([
          "par <strong>substitution</strong> : on exprime une inconnue en fonction de l’autre ;",
          "par <strong>combinaison</strong> (addition) : on élimine une inconnue ;",
          "par le <strong>déterminant</strong> : pour ax + by = c et a’x + b’y = c’, D = ab’ − a’b ; si D ≠ 0, la solution est unique ;",
          "graphiquement : la solution est le point d’intersection des deux droites.",
        ])}
        ${exemple(["x + y = 10 et x − y = 2 : en additionnant, 2x = 12, donc x = 6 et y = 4."])}`,
    },
    {
      title: "Inéquations à deux inconnues",
      minutes: 12,
      body: `<p>Une droite d’équation ax + by + c = 0 partage le plan en deux <strong>demi-plans</strong> : dans l’un ax + by + c &gt; 0, dans l’autre ax + by + c &lt; 0. On teste un point (souvent l’origine) pour savoir lequel convient.</p>
        ${retenir("Les solutions d’un système d’inéquations forment la région commune aux demi-plans (on hachure ce qui ne convient pas).")}`,
    },
  ],
};

export const MATH_2NDE_S: ChapterSpec[] = [
  // ── Activités numériques ──────────────────────────────────────────────────
  {
    title: "Le calcul dans IR",
    summary: "Puissances, radicaux, valeur absolue et distance sur une droite.",
    strand: NUM,
    lessons: [
      {
        title: "Puissances et radicaux",
        minutes: 15,
        body: `${liste([
            `a${sup("m")} × a${sup("n")} = a${sup("m+n")} ; ${frac(`a${sup("m")}`, `a${sup("n")}`)} = a${sup("m−n")} ; (ab)${sup("n")} = a${sup("n")}b${sup("n")} ;`,
            `pour a ≥ 0 et b ≥ 0 : ${sqrt("(ab)")} = ${sqrt("a")} × ${sqrt("b")} ; ${sqrt(`(a${sup("2")})`)} = |a| pour tout réel a ;`,
            `on rend un dénominateur rationnel : ${frac("1", sqrt("2"))} = ${frac(sqrt("2"), "2")}.`,
          ])}
          ${exemple([`${sqrt("50")} = ${sqrt("(25 × 2)")} = 5${sqrt("2")}.`])}`,
      },
      {
        title: "Valeur absolue et distance",
        minutes: 15,
        body: `${liste([
            "|x| = x si x ≥ 0 et |x| = −x si x &lt; 0 ;",
            "|x − a| est la distance entre x et a sur la droite graduée ;",
            "|x − a| ≤ r équivaut à a − r ≤ x ≤ a + r.",
          ])}
          ${exemple(["|x − 2| ≤ 3 équivaut à −1 ≤ x ≤ 5 ; |x − 2| = 3 donne x = −1 ou x = 5."])}`,
      },
    ],
  },
  {
    title: "Intervalles et calcul approché",
    summary: "Intervalles, centre et rayon, encadrements, valeur approchée, partie entière.",
    strand: NUM,
    lessons: [
      {
        title: "Intervalles et encadrements",
        minutes: 15,
        body: `${liste([
            `l’intervalle [a ; b] a pour centre ${frac("a + b", "2")} et pour rayon ${frac("b − a", "2")} ;`,
            "on additionne des encadrements membre à membre : si 1,41 &lt; √2 &lt; 1,42 et 1,73 &lt; √3 &lt; 1,74, alors 3,14 &lt; √2 + √3 &lt; 3,16 ;",
            "la <strong>partie entière</strong> E(x) est le plus grand entier inférieur ou égal à x : E(2,7) = 2 ; E(−2,3) = −3.",
          ])}
          ${retenir("Pour multiplier des encadrements, on s’assure d’abord que tous les nombres sont positifs.")}`,
      },
    ],
  },
  {
    title: "Généralités sur les fonctions",
    summary: "Ensemble de définition, sens de variation, taux de variation, parité, composée.",
    strand: NUM,
    lessons: [
      {
        title: "Fonction et ensemble de définition",
        minutes: 15,
        body: `${liste([
            "une fonction f associe à chaque x de son ensemble de définition D<sub>f</sub> un unique nombre f(x) ;",
            `f(x) = ${frac("1", "x − 2")} : D<sub>f</sub> = IR privé de 2 (le dénominateur ne doit pas s’annuler) ;`,
            `f(x) = ${sqrt("(x − 1)")} : D<sub>f</sub> = [1 ; +∞[ (on ne prend la racine que d’un nombre positif).`,
          ])}`,
      },
      {
        title: "Variations et parité",
        minutes: 15,
        body: `${liste([
            `taux de variation entre a et b : ${frac("f(b) − f(a)", "b − a")} ; positif sur un intervalle : f y est croissante ;`,
            "f est <strong>paire</strong> si f(−x) = f(x) : sa courbe est symétrique par rapport à l’axe des ordonnées ;",
            "f est <strong>impaire</strong> si f(−x) = −f(x) : sa courbe est symétrique par rapport à l’origine ;",
            "la composée g ∘ f est définie par (g ∘ f)(x) = g[f(x)].",
          ])}
          ${exemple([`x ↦ x${sup("2")} est paire ; x ↦ x${sup("3")} est impaire.`])}`,
      },
    ],
  },
  {
    title: "Fonctions de référence",
    summary: "Fonctions carré, x ↦ ax², inverse, racine carrée, partie entière ; changement de repère.",
    strand: NUM,
    lessons: [
      {
        title: "Les fonctions de référence",
        minutes: 15,
        body: `${tableau([
            ["Fonction", "Courbe", "Variations"],
            [`x ↦ x${sup("2")}`, "parabole de sommet O", "décroissante sur ]−∞ ; 0], croissante sur [0 ; +∞["],
            [`x ↦ ${frac("1", "x")}`, "hyperbole, asymptotes les axes", "décroissante sur ]−∞ ; 0[ et sur ]0 ; +∞["],
            ["x ↦ √x", "demi-parabole", "croissante sur [0 ; +∞["],
            ["x ↦ E(x)", "courbe en escalier", "constante sur chaque [n ; n + 1["],
          ])}
          ${retenir(`La courbe de x ↦ (x − α)${sup("2")} + β est la parabole de x ↦ x${sup("2")} translatée : son sommet est le point (α ; β).`)}`,
      },
    ],
  },
  SECOND_DEGREE,
  SYSTEMS,
  {
    title: "Polynômes et fractions rationnelles",
    summary: "Degré, zéro, factorisation par (x − a), signe ; fractions rationnelles.",
    strand: NUM,
    lessons: [
      {
        title: "Factoriser un polynôme",
        minutes: 15,
        body: `${liste([
            "si a est un <strong>zéro</strong> de P (P(a) = 0), alors P(x) = (x − a) Q(x), avec Q de degré un de moins ;",
            "on trouve Q par identification des coefficients, par la méthode de Horner ou par division euclidienne ;",
            "on étudie ensuite le signe de P dans un tableau de signes.",
          ])}
          ${exemple([`P(x) = x${sup("3")} − 1 : P(1) = 0, donc P(x) = (x − 1)(x${sup("2")} + x + 1).`])}`,
      },
      {
        title: "Fractions rationnelles",
        minutes: 12,
        body: `${liste([
            `une fraction rationnelle s’écrit ${frac("A(x)", "B(x)")} avec A et B polynômes ; elle existe si B(x) ≠ 0 ;`,
            "elle s’annule lorsque A(x) = 0 et B(x) ≠ 0 ;",
            "son signe s’étudie avec un tableau de signes du numérateur et du dénominateur.",
          ])}
          ${exemple([`${frac(`x${sup("2")} − 1`, "x − 1")} = x + 1 pour x ≠ 1.`])}`,
      },
    ],
  },
  {
    title: "Statistique : variance et écart-type",
    summary: "Effectifs cumulés, médiane, quartiles ; variance et écart-type.",
    strand: NUM,
    lessons: [
      {
        title: "Paramètres de dispersion",
        minutes: 15,
        body: `${formula(`V = ${frac("1", "N")} Σ n<sub>i</sub> x<sub>i</sub>${sup("2")} − x̄${sup("2")} ; σ = √V`)}
          ${liste(["la médiane partage la série ordonnée en deux groupes de même effectif ; les quartiles en quatre ;", "l’écart-type mesure la dispersion des valeurs autour de la moyenne."])}
          ${exemple(["Série 2 ; 4 ; 6 : moyenne 4 ; V = (4 + 16 + 36) ÷ 3 − 16 = 8/3 ≈ 2,67 ; σ ≈ 1,63."])}`,
      },
    ],
  },
  // ── Activités géométriques ────────────────────────────────────────────────
  {
    title: "Calcul vectoriel et barycentre",
    summary: "Relation de Chasles, colinéarité, barycentre de deux ou trois points.",
    strand: GEO,
    lessons: [
      {
        title: "Vecteurs et colinéarité",
        minutes: 12,
        body: `${liste([
            `relation de Chasles : ${vec("AB")} + ${vec("BC")} = ${vec("AC")} ;`,
            `${vec("u")} et ${vec("v")} sont colinéaires s’il existe un réel k tel que ${vec("u")} = k${vec("v")} ;`,
            "trois points A, B, C sont alignés si et seulement si les vecteurs AB et AC sont colinéaires.",
          ])}`,
      },
      {
        title: "Le barycentre",
        minutes: 15,
        body: `<p>Si a + b ≠ 0, le barycentre G des points pondérés (A, a) et (B, b) est l’unique point tel que a${vec("GA")} + b${vec("GB")} = ${vec("0")}. On a alors :</p>
          ${formula(`${vec("AG")} = ${frac("b", "a + b")} ${vec("AB")}`)}
          ${exemple([`G barycentre de (A, 1) et (B, 3) : ${vec("AG")} = ${frac("3", "4")}${vec("AB")}.`])}
          ${retenir("L’isobarycentre de deux points est le milieu ; celui des trois sommets d’un triangle est son centre de gravité.")}`,
      },
    ],
  },
  {
    title: "Repérage cartésien",
    summary: "Mesure algébrique, coordonnées, déterminant et colinéarité, équations de droites.",
    strand: GEO,
    lessons: [
      {
        title: "Colinéarité et équations de droites",
        minutes: 15,
        body: `${liste([
            `${vec("u")}(x ; y) et ${vec("v")}(x’ ; y’) sont colinéaires si et seulement si le déterminant xy’ − x’y = 0 ;`,
            "une droite a une équation de la forme ax + by + c = 0 ; le vecteur (−b ; a) la dirige ;",
            "si elle n’est pas parallèle à l’axe des ordonnées : y = mx + p (m est le coefficient directeur) ;",
            "équations paramétriques : x = x<sub>A</sub> + kα, y = y<sub>A</sub> + kβ, où (α ; β) dirige la droite.",
          ])}
          ${exemple([`Droite passant par A(1 ; 2) et dirigée par ${vec("u")}(2 ; 3) : 3(x − 1) − 2(y − 2) = 0, soit 3x − 2y + 1 = 0.`])}`,
      },
    ],
  },
  {
    title: "Angles orientés et trigonométrie",
    summary: "Radian, cercle trigonométrique, mesure principale, cosinus et sinus.",
    strand: GEO,
    lessons: [
      {
        title: "Le cercle trigonométrique",
        minutes: 15,
        body: `${liste([
            "π radians = 180° ; un angle orienté a une infinité de mesures, égales à 2π près ;",
            "sa mesure principale est celle qui appartient à ]−π ; π] ;",
            `cos${sup("2")}x + sin${sup("2")}x = 1 ;`,
            "cos(−x) = cos x ; sin(−x) = −sin x ; cos(π − x) = −cos x ; sin(π − x) = sin x ; cos(π/2 − x) = sin x.",
          ])}
          ${tableau([
            ["x", "0", "π/6", "π/4", "π/3", "π/2"],
            ["cos x", "1", "√3/2", "√2/2", "1/2", "0"],
            ["sin x", "0", "1/2", "√2/2", "√3/2", "1"],
          ])}`,
      },
    ],
  },
  {
    title: "Produit scalaire",
    summary: "Définitions, orthogonalité, relations métriques, distance d’un point à une droite, cercle.",
    strand: GEO,
    lessons: [
      {
        title: "Définitions et propriétés",
        minutes: 15,
        body: `${liste([
            `${vec("u")} · ${vec("v")} = ‖${vec("u")}‖ × ‖${vec("v")}‖ × cos(${vec("u")}, ${vec("v")}) ;`,
            `dans un repère orthonormal : ${vec("u")} · ${vec("v")} = xx’ + yy’ ;`,
            "deux vecteurs non nuls sont orthogonaux si et seulement si leur produit scalaire est nul.",
          ])}
          ${exemple([`${vec("u")}(2 ; 3) et ${vec("v")}(3 ; −2) : 6 − 6 = 0, ils sont orthogonaux.`])}`,
      },
      {
        title: "Relations métriques et applications",
        minutes: 15,
        body: `${liste([
            `Al-Kashi : BC${sup("2")} = AB${sup("2")} + AC${sup("2")} − 2 AB × AC × cos Â ;`,
            `distance de A(α ; β) à la droite ax + by + c = 0 : ${frac("|aα + bβ + c|", `√(a${sup("2")} + b${sup("2")})`)} ;`,
            `cercle de centre (a ; b) et de rayon r : (x − a)${sup("2")} + (y − b)${sup("2")} = r${sup("2")}.`,
          ])}`,
      },
    ],
  },
  {
    title: "Les transformations du plan",
    summary: "Translation, symétries, homothétie, rotation et composées.",
    strand: GEO,
    lessons: [
      {
        title: "Homothétie et rotation",
        minutes: 15,
        body: `${liste([
            `l’homothétie de centre O et de rapport k transforme M en M’ tel que ${vec("OM’")} = k${vec("OM")} ;`,
            "elle multiplie les longueurs par |k| et les aires par k² ; elle conserve les angles et le parallélisme ;",
            "la rotation de centre O et d’angle θ conserve les distances et les angles orientés.",
          ])}`,
      },
      {
        title: "Composer des transformations",
        minutes: 12,
        body: `${tableau([
            ["Composée", "Résultat"],
            ["deux homothéties de même centre, rapports k et k’", "homothétie de rapport kk’"],
            ["deux symétries centrales de centres O et O’", `translation de vecteur 2${vec("OO’")}`],
            ["deux symétries orthogonales d’axes parallèles", "translation"],
          ])}`,
      },
    ],
  },
  {
    title: "Géométrie dans l’espace",
    summary: "Perspective cavalière, positions relatives, parallélisme et orthogonalité.",
    strand: GEO,
    lessons: [
      {
        title: "Droites et plans de l’espace",
        minutes: 15,
        body: `${liste([
            "perspective cavalière : les droites parallèles restent parallèles, les arêtes cachées sont en pointillés ;",
            "deux droites de l’espace sont sécantes, parallèles ou non coplanaires ;",
            "une droite parallèle à une droite d’un plan est parallèle à ce plan ;",
            "si deux plans sécants contiennent deux droites parallèles, leur intersection est parallèle à ces droites (théorème du toit) ;",
            "une droite orthogonale à deux droites sécantes d’un plan est orthogonale à ce plan.",
          ])}`,
      },
    ],
  },
];

export const MATH_2NDE_L: ChapterSpec[] = [
  {
    title: "Calcul algébrique dans IR",
    summary: "Fractions, radicaux, identités remarquables, valeur absolue, intervalles, premier degré.",
    strand: NUM,
    lessons: [
      {
        title: "Identités remarquables et factorisation",
        minutes: 15,
        body: `${liste([
            `(a + b)${sup("2")} = a${sup("2")} + 2ab + b${sup("2")} ; (a − b)${sup("2")} = a${sup("2")} − 2ab + b${sup("2")} ; (a + b)(a − b) = a${sup("2")} − b${sup("2")} ;`,
            `(a + b)${sup("3")} = a${sup("3")} + 3a${sup("2")}b + 3ab${sup("2")} + b${sup("3")} ;`,
            `a${sup("3")} − b${sup("3")} = (a − b)(a${sup("2")} + ab + b${sup("2")}).`,
          ])}
          ${exemple([`4x${sup("2")} − 9 = (2x − 3)(2x + 3).`])}`,
      },
      {
        title: "Valeur absolue et premier degré",
        minutes: 15,
        body: `${liste(["|x| ≤ a (a ≥ 0) équivaut à −a ≤ x ≤ a ;", "|x| ≥ a équivaut à x ≤ −a ou x ≥ a ;", "on traduit un problème par une équation ou une inéquation du premier degré, on la résout et on vérifie."])}
          ${exemple(["Un taxi demande 500 F de prise en charge et 200 F par km : 500 + 200x ≤ 2 500 donne x ≤ 10 km."])}`,
      },
    ],
  },
  {
    title: "Situations de proportionnalité",
    summary: "Pourcentages, échelles, mouvement uniforme, fonction linéaire.",
    strand: NUM,
    lessons: [
      {
        title: "Pourcentages, échelles et vitesse",
        minutes: 15,
        body: `${liste([
            "augmenter de t % revient à multiplier par (1 + t/100) ; diminuer de t %, par (1 − t/100) ;",
            "distance sur la carte = échelle × distance réelle ;",
            "mouvement uniforme : distance = vitesse × durée.",
          ])}
          ${exemple(["Sur une carte au 1/100 000, 5 cm représentent 500 000 cm, soit 5 km. Une hausse de 20 % sur 15 000 F donne 18 000 F."])}`,
      },
    ],
  },
  {
    title: "Fonctions affines et droites du plan",
    summary: "Fonction linéaire et affine, taux d’accroissement, équations de droites.",
    strand: NUM,
    lessons: [
      {
        title: "Fonctions affines",
        minutes: 15,
        body: `${liste([
            "f(x) = ax + b ; sa courbe est une droite de coefficient directeur a et d’ordonnée à l’origine b ;",
            `le taux d’accroissement ${frac("f(x₂) − f(x₁)", "x₂ − x₁")} est constant et égal à a ;`,
            "deux droites sont parallèles si elles ont le même coefficient directeur ; dans un repère orthonormal, elles sont perpendiculaires si le produit des coefficients vaut −1.",
          ])}
          ${exemple(["La droite passant par A(1 ; 3) et B(3 ; 7) a pour coefficient (7 − 3) ÷ (3 − 1) = 2 ; son équation est y = 2x + 1."])}`,
      },
    ],
  },
  {
    title: "Lectures graphiques",
    summary: "Représenter, lire et interpréter un graphique ; interpolation linéaire.",
    strand: NUM,
    lessons: [
      {
        title: "Lire un graphique",
        minutes: 12,
        body: `${methode(["Lire le titre, les axes et leurs unités.", "Repérer les maximums, les minimums, les hausses et les baisses.", "Interpoler : entre deux points connus, on estime une valeur en supposant une évolution régulière (en ligne droite)."])}
          ${exemple(["Températures relevées à Dakar à 8 h (22 °C) et à 12 h (28 °C) : à 10 h, on estime 25 °C."])}`,
      },
    ],
  },
  {
    title: "Statistique : position et dispersion",
    summary: "Mode, médiane, quartiles, moyenne ; étendue et écart-type.",
    strand: NUM,
    lessons: [
      {
        title: "Résumer une série statistique",
        minutes: 15,
        body: `${liste([
            "position : mode, médiane (valeur du milieu de la série ordonnée), moyenne ;",
            "quartiles : Q1 et Q3 encadrent la moitié centrale des valeurs ;",
            "dispersion : étendue (plus grande − plus petite valeur), écart interquartile Q3 − Q1, écart-type.",
          ])}
          ${exemple(["Notes 6 ; 9 ; 10 ; 12 ; 18 : médiane 10, moyenne 11, étendue 12."])}`,
      },
    ],
  },
  SYSTEMS,
  SECOND_DEGREE,
  {
    title: "Tracé de courbes",
    summary: "Courbes des fonctions x², x³, 1/x, √x, ax², ax³.",
    strand: NUM,
    lessons: [
      {
        title: "Tracer une courbe point par point",
        minutes: 12,
        body: `${methode(["Dresser un tableau de valeurs.", "Placer les points dans le repère.", "Les relier par une courbe régulière, sans segments."])}
          ${tableau([
            ["x", "−2", "−1", "0", "1", "2"],
            [`x${sup("2")}`, "4", "1", "0", "1", "4"],
            [`x${sup("3")}`, "−8", "−1", "0", "1", "8"],
          ])}
          ${retenir("La courbe de x ↦ x² est symétrique par rapport à l’axe des ordonnées ; celle de x ↦ x³ par rapport à l’origine.")}`,
      },
    ],
  },
];
