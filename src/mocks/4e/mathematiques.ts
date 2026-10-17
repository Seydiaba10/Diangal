// Mathématiques de 4e : programme officiel du premier cycle, classe de quatrième (MEN, 2006, APAMS) :
// six chapitres d’activités numériques et huit d’activités géométriques, dans l’ordre du programme.
// Leçons rédigées par DIANGAL, à faire valider par un enseignant.

import { type ChapterSpec, exemple, formula, frac, liste, methode, retenir, sup, tableau, vec } from "../tle/blocks";

const NUM = "Activités numériques";
const GEO = "Activités géométriques";

export const MATH_4E: ChapterSpec[] = [
  // ── Activités numériques ──────────────────────────────────────────────────
  {
    title: "Les nombres rationnels",
    summary: "L’ensemble Q, écritures d’un rationnel, opérations, puissances, valeur absolue, comparaison.",
    strand: NUM,
    lessons: [
      {
        title: "Écritures et opérations dans Q",
        minutes: 15,
        body: `<p>Un <strong>nombre rationnel</strong> s’écrit ${frac("a", "b")} avec a entier relatif et b entier relatif non nul. L’ensemble des rationnels se note <strong>Q</strong> : N ⊂ Z ⊂ D ⊂ Q.</p>
          ${liste([
            `addition : on réduit au même dénominateur : ${frac("2", "3")} + ${frac("5", "6")} = ${frac("4", "6")} + ${frac("5", "6")} = ${frac("9", "6")} = ${frac("3", "2")} ;`,
            `multiplication : ${frac("a", "b")} × ${frac("c", "d")} = ${frac("a × c", "b × d")} ;`,
            `l’<strong>inverse</strong> de ${frac("a", "b")} (a ≠ 0) est ${frac("b", "a")} ; diviser, c’est multiplier par l’inverse ;`,
            `on simplifie toujours le résultat : on le donne sous forme <strong>irréductible</strong>.`,
          ])}
          ${exemple([`(−${frac("3", "4")}) × ${frac("8", "9")} = −${frac("24", "36")} = −${frac("2", "3")}.`])}`,
      },
      {
        title: "Puissances, valeur absolue et comparaison",
        minutes: 15,
        body: `${liste([
            `a${sup("−n")} = ${frac("1", `a${sup("n")}`)} (a ≠ 0) : 2${sup("−3")} = ${frac("1", "8")} ;`,
            "la valeur absolue |a| est la distance de a à zéro : |−5| = 5 ; si |a| = |b| alors a = b ou a = −b ;",
            `${frac("a", "b")} = ${frac("c", "d")} équivaut à a × d = b × c (produits en croix) ;`,
            "a &gt; b équivaut à a − b &gt; 0 ;",
            "multiplier les deux membres d’une inégalité par un nombre négatif change son sens.",
          ])}
          ${exemple([`${frac("2", "3")} ≈ 0,66 par défaut et ≈ 0,67 par excès, au centième près.`])}`,
      },
    ],
  },
  {
    title: "Le calcul algébrique",
    summary: "Développer, réduire et factoriser une expression littérale ; égalités remarquables.",
    strand: NUM,
    lessons: [
      {
        title: "Développer et réduire",
        minutes: 15,
        body: `${liste([
            "k(a + b) = ka + kb ; (a + b)(c + d) = ac + ad + bc + bd ;",
            `(a + b)${sup("2")} = a${sup("2")} + 2ab + b${sup("2")} ;`,
            `(a − b)${sup("2")} = a${sup("2")} − 2ab + b${sup("2")} ;`,
            `(a − b)(a + b) = a${sup("2")} − b${sup("2")}.`,
          ])}
          ${exemple([`(x + 3)${sup("2")} = x${sup("2")} + 6x + 9 ; 102 × 98 = (100 + 2)(100 − 2) = 10 000 − 4 = 9 996.`])}`,
      },
      {
        title: "Factoriser",
        minutes: 15,
        body: `${methode([
            "Chercher un facteur commun : (x + 1)(2x − 3) + (x + 1)(x + 5) = (x + 1)(3x + 2).",
            `Sinon, reconnaître une égalité remarquable : x${sup("2")} − 9 = (x − 3)(x + 3) ; 4x${sup("2")} + 12x + 9 = (2x + 3)${sup("2")}.`,
            "Vérifier en redéveloppant.",
          ], "Méthode pour factoriser")}
          ${retenir("Pour calculer une valeur numérique, on choisit la forme (développée ou factorisée) la plus simple.")}`,
      },
    ],
  },
  {
    title: "Les équations à une inconnue",
    summary: "Équations ax + b = 0, équations produit, équations a/x = b ; mise en équation.",
    strand: NUM,
    lessons: [
      {
        title: "Résoudre une équation",
        minutes: 15,
        body: `${liste([
            `ax + b = 0 avec a ≠ 0 : x = ${frac("−b", "a")} ;`,
            "équation produit : (ax + b)(cx + d) = 0 si et seulement si ax + b = 0 ou cx + d = 0 ;",
            `${frac("a", "x")} = b (x ≠ 0, b ≠ 0) : x = ${frac("a", "b")}.`,
          ])}
          ${exemple(["(2x − 4)(x + 3) = 0 : 2x − 4 = 0 ou x + 3 = 0, donc x = 2 ou x = −3."])}`,
      },
      {
        title: "Mettre un problème en équation",
        minutes: 12,
        body: `${methode(["Choisir l’inconnue.", "Traduire l’énoncé par une équation.", "Résoudre.", "Vérifier et conclure par une phrase."])}
          ${exemple(["Awa a 3 ans de plus que son frère ; ensemble, ils ont 27 ans. Si x est l’âge du frère : x + (x + 3) = 27, donc 2x = 24 et x = 12. Le frère a 12 ans, Awa 15 ans."])}`,
      },
    ],
  },
  {
    title: "Inéquations et systèmes d’inéquations à une inconnue",
    summary: "Résoudre ax + b ≤ 0 ou &gt; 0, un système de deux inéquations ; intervalles.",
    strand: NUM,
    lessons: [
      {
        title: "Inéquations et intervalles",
        minutes: 15,
        body: `${liste([
            "on résout comme une équation, mais en <strong>changeant le sens</strong> de l’inégalité quand on multiplie ou divise par un nombre négatif ;",
            "3x − 6 ≤ 0 donne x ≤ 2 : les solutions forment l’intervalle ]−∞ ; 2] ;",
            "−2x + 4 &gt; 0 donne −2x &gt; −4, donc x &lt; 2 : intervalle ]−∞ ; 2[.",
          ])}
          ${tableau([
            ["Phrase", "Intervalle"],
            ["x ≥ 1", "[1 ; +∞["],
            ["x &lt; 4", "]−∞ ; 4["],
            ["1 ≤ x &lt; 4", "[1 ; 4["],
          ])}`,
      },
      {
        title: "Systèmes de deux inéquations",
        minutes: 12,
        body: `<p>On résout chaque inéquation, puis on garde les nombres qui vérifient <strong>les deux</strong> : on représente les solutions sur la droite graduée.</p>
          ${exemple(["x − 1 ≥ 0 et 2x − 8 &lt; 0 : x ≥ 1 et x &lt; 4. Les solutions forment l’intervalle [1 ; 4[."])}`,
      },
    ],
  },
  {
    title: "Les applications linéaires",
    summary: "Proportionnalité, image et antécédent, linéarité, représentation graphique.",
    strand: NUM,
    lessons: [
      {
        title: "Application linéaire et proportionnalité",
        minutes: 15,
        body: `${liste([
            "une application linéaire de coefficient a associe à x le nombre f(x) = ax ; on note f : x ↦ ax ;",
            "f(x) est l’<strong>image</strong> de x ; x est un <strong>antécédent</strong> de f(x) ;",
            "linéarité : f(x + y) = f(x) + f(y) et f(kx) = k f(x) ;",
            "sa représentation graphique est une <strong>droite qui passe par l’origine</strong> du repère.",
          ])}
          ${exemple(["Le mètre de tissu coûte 1 500 F : f(x) = 1 500x. Pour 4 m, f(4) = 6 000 F ; 9 000 F correspond à 6 m (antécédent de 9 000)."])}`,
      },
    ],
  },
  {
    title: "La statistique",
    summary: "Vocabulaire, effectifs, fréquences, mode, moyenne et diagrammes.",
    strand: NUM,
    lessons: [
      {
        title: "Effectifs, mode et moyenne",
        minutes: 15,
        body: `${liste(["population, individu, échantillon ; caractère qualitatif ou quantitatif ; valeur du caractère (modalité) ;", "effectif, fréquence (effectif ÷ effectif total), pourcentage ;", "le <strong>mode</strong> est la valeur de plus grand effectif ; la <strong>moyenne</strong> = somme des (valeur × effectif) ÷ effectif total."])}
          ${tableau([
            ["Note", "8", "10", "12", "14", "16"],
            ["Effectif", "2", "4", "2", "1", "1"],
          ])}
          ${exemple(["Mode : 10. Moyenne : (16 + 40 + 24 + 14 + 16) ÷ 10 = 110 ÷ 10 = 11."])}`,
      },
      {
        title: "Représenter une série statistique",
        minutes: 12,
        body: `${liste(["diagramme en bâtons (caractère quantitatif) ;", "diagramme à bandes ;", "diagramme circulaire : angle = fréquence × 360° ;", "diagramme semi-circulaire : angle = fréquence × 180°."])}
          ${exemple(["Une valeur de fréquence 0,25 occupe 90° d’un diagramme circulaire."])}`,
      },
    ],
  },
  // ── Activités géométriques ────────────────────────────────────────────────
  {
    title: "La distance",
    summary: "Cercles, inégalité triangulaire, médiatrice, distance d’un point à une droite, bissectrice, tangente.",
    strand: GEO,
    lessons: [
      {
        title: "Positions de deux cercles et inégalité triangulaire",
        minutes: 15,
        body: `<p>Deux cercles de centres O et O’, de rayons r et r’ (r ≥ r’), avec d = OO’ :</p>
          ${tableau([
            ["Distance des centres", "Position"],
            ["d &gt; r + r’", "extérieurs (disjoints)"],
            ["d = r + r’", "tangents extérieurement"],
            ["r − r’ &lt; d &lt; r + r’", "sécants"],
            ["d = r − r’", "tangents intérieurement"],
            ["d &lt; r − r’", "l’un à l’intérieur de l’autre"],
          ])}
          ${retenir("On peut construire un triangle si chaque longueur est inférieure à la somme des deux autres.")}`,
      },
      {
        title: "Médiatrice, bissectrice, droite et cercle",
        minutes: 15,
        body: `${liste([
            "un point M est sur la médiatrice de [AB] si et seulement si MA = MB ; s’il est du côté de A, MA &lt; MB ;",
            "la distance d’un point A à une droite (D) est AH, où H est le pied de la perpendiculaire à (D) passant par A ;",
            "un point de la bissectrice d’un angle est à égale distance des deux côtés, et réciproquement ;",
            "droite et cercle de rayon r, d = distance du centre à la droite : d &lt; r sécants ; d = r tangents ; d &gt; r disjoints.",
          ])}
          ${retenir("La tangente en un point A du cercle est perpendiculaire au rayon [OA].")}`,
      },
    ],
  },
  {
    title: "La droite des milieux",
    summary: "Les théorèmes des milieux et des parallèles équidistantes.",
    strand: GEO,
    lessons: [
      {
        title: "Les théorèmes de la droite des milieux",
        minutes: 15,
        body: `${liste([
            "la droite qui passe par les milieux de deux côtés d’un triangle est parallèle au troisième côté ;",
            "le segment qui joint ces milieux mesure la moitié du troisième côté ;",
            "la droite qui passe par le milieu d’un côté parallèlement à un deuxième côté coupe le troisième en son milieu ;",
            "des parallèles qui découpent des segments égaux sur une sécante en découpent aussi sur toute autre sécante.",
          ])}
          ${exemple(["Dans ABC, I milieu de [AB], J milieu de [AC] et BC = 8 cm : (IJ) // (BC) et IJ = 4 cm."])}`,
      },
    ],
  },
  {
    title: "Droites remarquables dans un triangle",
    summary: "Bissectrices et cercle inscrit, médianes et centre de gravité, triangle isocèle.",
    strand: GEO,
    lessons: [
      {
        title: "Bissectrices et médianes",
        minutes: 15,
        body: `${tableau([
            ["Droites", "Point de concours", "Propriété"],
            ["médiatrices", "centre du cercle circonscrit", "à égale distance des sommets"],
            ["bissectrices", "centre du cercle inscrit", "à égale distance des côtés"],
            ["médianes", "centre de gravité G", `AG = ${frac("2", "3")} de la médiane issue de A`],
            ["hauteurs", "orthocentre", "—"],
          ])}
          ${retenir("Si, dans un triangle, une hauteur, une médiane ou une médiatrice est aussi bissectrice, le triangle est isocèle.")}`,
      },
    ],
  },
  {
    title: "Le triangle rectangle",
    summary: "Théorème de Pythagore et sa réciproque, relation AB × AC = AH × BC.",
    strand: GEO,
    lessons: [
      {
        title: "Le théorème de Pythagore",
        minutes: 15,
        body: `${formula(`ABC rectangle en A ⟹ BC${sup("2")} = AB${sup("2")} + AC${sup("2")}`)}
          ${exemple([`AB = 6 cm, AC = 8 cm : BC${sup("2")} = 36 + 64 = 100, donc BC = 10 cm.`])}
          ${retenir(`Réciproque : si BC${sup("2")} = AB${sup("2")} + AC${sup("2")}, le triangle ABC est rectangle en A (5, 12, 13 : 25 + 144 = 169).`)}`,
      },
      {
        title: "Hauteur relative à l’hypoténuse",
        minutes: 12,
        body: `<p>Si ABC est rectangle en A et H le pied de la hauteur issue de A : <strong>AB × AC = AH × BC</strong> (deux calculs de l’aire du triangle).</p>
          ${exemple(["AB = 6, AC = 8, BC = 10 : AH = 48 ÷ 10 = 4,8 cm."])}
          ${retenir("Réciproquement, si AB × AC = AH × BC, le triangle est rectangle en A.")}`,
      },
    ],
  },
  {
    title: "Translations et vecteurs",
    summary: "Image d’une figure par une translation, propriétés, vecteurs égaux, parallélogramme et milieu.",
    strand: GEO,
    lessons: [
      {
        title: "La translation",
        minutes: 15,
        body: `<p>L’image de M par la translation qui transforme A en B est le point M’ tel que <strong>ABM’M</strong> soit un parallélogramme.</p>
          ${liste(["l’image d’un segment est un segment parallèle et de même longueur ;", "l’image d’une droite est une droite parallèle ;", "l’image d’un cercle est un cercle de même rayon ;", "la translation conserve l’alignement, les longueurs, les angles, les aires, le parallélisme et l’orthogonalité."])}`,
      },
      {
        title: "Les vecteurs",
        minutes: 15,
        body: `${liste([
            `le vecteur ${vec("AB")} a une direction (celle de (AB)), un sens (de A vers B) et une longueur AB ;`,
            "deux vecteurs sont égaux s’ils ont même direction, même sens et même longueur ;",
            `ABCD est un parallélogramme si et seulement si ${vec("AB")} = ${vec("DC")} ;`,
            `I est le milieu de [AB] si et seulement si ${vec("AI")} = ${vec("IB")}.`,
          ])}
          ${retenir("Le vecteur nul n’a ni direction ni sens ; sa longueur est 0.")}`,
      },
    ],
  },
  {
    title: "Rotations et polygones réguliers",
    summary: "Angle au centre et longueur d’un arc, rotation, polygones réguliers.",
    strand: GEO,
    lessons: [
      {
        title: "Angle au centre et longueur d’un arc",
        minutes: 12,
        body: `${formula(`ℓ = ${frac("2πr × α", "360")} (α en degrés)`)}
          ${exemple(["Rayon 6 cm, angle au centre 60° : ℓ = 2π × 6 × 60 ÷ 360 = 2π ≈ 6,28 cm."])}`,
      },
      {
        title: "La rotation",
        minutes: 15,
        body: `<p>La rotation de centre O et d’angle α (dans un sens donné) transforme M en M’ tel que <strong>OM’ = OM</strong> et l’angle MOM’ = α.</p>
          ${liste(["elle conserve les longueurs, l’alignement, les angles, les aires, le parallélisme et l’orthogonalité ;", "l’image d’un cercle est un cercle de même rayon."])}`,
      },
      {
        title: "Les polygones réguliers",
        minutes: 12,
        body: `${liste([
            "un polygone régulier a tous ses côtés égaux et tous ses angles égaux ;",
            "il est inscrit dans un cercle ; la rotation de centre O et d’angle 360° ÷ n le laisse invariant ;",
            "triangle équilatéral (120°), carré (90°), hexagone régulier (60°, côté égal au rayon).",
          ])}
          ${methode(["Tracer un cercle de centre O.", "Placer des angles au centre de 360° ÷ n.", "Joindre les points obtenus sur le cercle."], "Construire un polygone régulier à n côtés")}`,
      },
    ],
  },
  {
    title: "Projection orthogonale et repérage",
    summary: "Projeté orthogonal, conservation du milieu, coordonnées du milieu, distance dans un repère.",
    strand: GEO,
    lessons: [
      {
        title: "La projection orthogonale",
        minutes: 12,
        body: `<p>Le <strong>projeté orthogonal</strong> de M sur (D) est le point où la perpendiculaire à (D) passant par M coupe (D).</p>
          ${liste(["le projeté d’un segment est un segment (éventuellement réduit à un point) ;", "le projeté du milieu d’un segment est le milieu du segment projeté."])}`,
      },
      {
        title: "Milieu et distance dans un repère orthonormal",
        minutes: 15,
        body: `${formula(`I ( ${frac("x<sub>A</sub> + x<sub>B</sub>", "2")} ; ${frac("y<sub>A</sub> + y<sub>B</sub>", "2")} ) ; AB${sup("2")} = (x<sub>B</sub> − x<sub>A</sub>)${sup("2")} + (y<sub>B</sub> − y<sub>A</sub>)${sup("2")}`)}
          ${exemple([`A(1 ; 2) et B(4 ; 6) : AB${sup("2")} = 3${sup("2")} + 4${sup("2")} = 25, donc AB = 5 ; milieu I(2,5 ; 4).`])}`,
      },
    ],
  },
  {
    title: "Géométrie dans l’espace",
    summary: "Droites coplanaires, droite perpendiculaire à un plan, plans parallèles, section d’une sphère.",
    strand: GEO,
    lessons: [
      {
        title: "Droites et plans de l’espace ; la sphère",
        minutes: 15,
        body: `${liste([
            "deux droites de l’espace peuvent être coplanaires (dans un même plan) ou non coplanaires ;",
            "une droite est perpendiculaire à un plan si elle est perpendiculaire à deux droites sécantes de ce plan ;",
            "deux plans perpendiculaires à une même droite sont parallèles ;",
            "la section d’une sphère par un plan est un cercle ; si le plan passe par le centre, c’est un <strong>grand cercle</strong>.",
          ])}
          ${exemple([`Sphère de rayon R = 5 cm, plan à d = 3 cm du centre : rayon de la section r, avec r${sup("2")} = 5${sup("2")} − 3${sup("2")} = 16, donc r = 4 cm.`])}`,
      },
    ],
  },
];
