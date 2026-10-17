// Mathématiques de 6e : programme officiel du premier cycle, classe de sixième (MEN, 2006, sur APAMS) :
// activités numériques (I à X) et géométriques (I à IX), dans l’ordre du programme. Leçons rédigées par
// DIANGAL, à faire valider par un enseignant.

import { type ChapterSpec, exemple, formula, frac, liste, methode, retenir, tableau } from "../tle/blocks";

const NUM = "Activités numériques";
const GEO = "Activités géométriques";

export const MATH_6E: ChapterSpec[] = [
  {
    title: "Nombres décimaux arithmétiques",
    summary: "Entiers naturels, ensemble ℕ, nombres décimaux et ensemble 𝔻 ; partie entière et partie décimale.",
    strand: NUM,
    lessons: [
      {
        title: "Entiers naturels et nombres décimaux",
        minutes: 12,
        body: `<p>Les <strong>entiers naturels</strong> sont 0, 1, 2, 3… Leur ensemble se note ℕ. Un <strong>nombre décimal</strong> a une partie entière et une partie décimale séparées par une virgule ; leur ensemble se note 𝔻.</p>
          ${tableau([
            ["Centaines", "Dizaines", "Unités", ",", "Dixièmes", "Centièmes", "Millièmes"],
            ["2", "4", "7", ",", "0", "8", "5"],
          ])}
          ${liste([
            "247,085 : partie entière 247, partie décimale 085 ;",
            `0,1 = ${frac("1", "10")} ; 0,01 = ${frac("1", "100")} ; 0,001 = ${frac("1", "1000")} ;`,
            "tout entier est un décimal : 5 = 5,0. On écrit 5 ∈ 𝔻 et ℕ ⊂ 𝔻 (ℕ est inclus dans 𝔻).",
          ])}
          ${retenir("Les zéros placés à droite de la partie décimale peuvent être supprimés : 3,500 = 3,5.")}`,
      },
    ],
  },
  {
    title: "Addition et soustraction des nombres décimaux",
    summary: "Techniques de l’addition et de la soustraction, propriétés, calcul mental.",
    strand: NUM,
    lessons: [
      {
        title: "Additionner et soustraire des décimaux",
        minutes: 12,
        body: `${methode(["Aligner les virgules.", "Compléter par des zéros si nécessaire.", "Calculer comme pour les entiers et placer la virgule du résultat sous les autres."])}
          ${liste([
            "l’addition est <strong>commutative</strong> : a + b = b + a ;",
            "elle est <strong>associative</strong> : (a + b) + c = a + (b + c) ; on regroupe pour calculer vite : 2,7 + 5,8 + 7,3 = (2,7 + 7,3) + 5,8 = 15,8 ;",
            "la soustraction n’est ni commutative ni associative ; a − b n’existe dans 𝔻 arithmétique que si a ≥ b.",
          ])}
          ${exemple(["125,4 − 37,85 = 87,55 ; vérification : 87,55 + 37,85 = 125,4."])}`,
      },
    ],
  },
  {
    title: "Rangement des nombres décimaux",
    summary: "Comparer, ranger, encadrer et arrondir des nombres décimaux.",
    strand: NUM,
    lessons: [
      {
        title: "Comparer, encadrer, arrondir",
        minutes: 12,
        body: `${methode(["Comparer les parties entières.", "Si elles sont égales, comparer les dixièmes, puis les centièmes, etc."], "Comparer deux décimaux")}
          ${exemple(["12,08 &lt; 12,8 ; 3,457 &gt; 3,45."])}
          ${liste([
            "<strong>encadrer</strong> 7,46 à l’unité : 7 &lt; 7,46 &lt; 8 ; au dixième : 7,4 &lt; 7,46 &lt; 7,5 ;",
            "<strong>arrondir</strong> 7,46 au dixième : 7,5 (on regarde le chiffre suivant : 6 ≥ 5, on arrondit au-dessus).",
          ])}
          ${retenir("Sur une droite graduée, les nombres sont rangés du plus petit (à gauche) au plus grand (à droite).")}`,
      },
    ],
  },
  {
    title: "Multiplication des nombres décimaux",
    summary: "Technique de la multiplication, multiplier par 10, 100, 0,1… ; propriétés.",
    strand: NUM,
    lessons: [
      {
        title: "Multiplier des décimaux",
        minutes: 12,
        body: `${methode(["Multiplier sans tenir compte des virgules.", "Compter le nombre total de chiffres après la virgule dans les facteurs.", "Placer la virgule au produit."])}
          ${exemple(["3,25 × 1,4 : 325 × 14 = 4 550 ; 3 chiffres décimaux, donc 4,550 = 4,55."])}
          ${liste([
            "multiplier par 10, 100, 1 000 : la virgule se déplace de 1, 2, 3 rangs vers la droite ;",
            "multiplier par 0,1 ; 0,01 ; 0,001 revient à diviser par 10, 100, 1 000 ;",
            "la multiplication est commutative, associative et distributive par rapport à l’addition : a × (b + c) = a × b + a × c.",
          ])}`,
      },
    ],
  },
  {
    title: "Division des nombres décimaux",
    summary: "Division euclidienne, quotient décimal, division par un décimal, valeurs approchées.",
    strand: NUM,
    lessons: [
      {
        title: "Division euclidienne et quotient décimal",
        minutes: 15,
        body: `${formula("a = b × q + r avec r &lt; b (division euclidienne)")}
          ${exemple(["158 = 12 × 13 + 2 : quotient 13, reste 2."])}
          ${liste([
            "pour un <strong>quotient décimal</strong>, on continue la division en ajoutant des zéros : 7 ÷ 4 = 1,75 ;",
            "pour diviser par un décimal, on multiplie dividende et diviseur par 10, 100… : 4,2 ÷ 0,6 = 42 ÷ 6 = 7 ;",
            "si la division ne se termine pas, on donne une <strong>valeur approchée</strong> : 10 ÷ 3 ≈ 3,33 au centième près.",
          ])}
          ${retenir("Diviser par 10, 100, 1 000 : la virgule se déplace de 1, 2, 3 rangs vers la gauche.")}`,
      },
    ],
  },
  {
    title: "Organisation d’un calcul",
    summary: "Priorités opératoires, parenthèses, programmes de calcul et calcul rapide.",
    strand: NUM,
    lessons: [
      {
        title: "Priorités et parenthèses",
        minutes: 12,
        body: `${methode([
            "On effectue d’abord les calculs entre parenthèses.",
            "Puis les multiplications et les divisions, de gauche à droite.",
            "Enfin les additions et les soustractions, de gauche à droite.",
          ], "Règles de priorité")}
          ${exemple(["5 + 3 × 4 = 5 + 12 = 17.", "(5 + 3) × 4 = 8 × 4 = 32.", "20 − 12 ÷ 4 + 1 = 20 − 3 + 1 = 18."])}
          ${retenir("Un programme de calcul « Choisir un nombre, ajouter 3, multiplier par 2 » s’écrit en ligne (x + 3) × 2.")}`,
      },
    ],
  },
  {
    title: "Proportionnalité",
    summary: "Tableaux de proportionnalité, coefficient, pourcentages et échelles.",
    strand: NUM,
    lessons: [
      {
        title: "Reconnaître et utiliser la proportionnalité",
        minutes: 15,
        body: `${tableau([
            ["Litres d’essence", "1", "5", "20"],
            ["Prix (F)", "990", "4 950", "19 800"],
          ])}
          <p>On passe de la 1<sup>re</sup> ligne à la 2<sup>e</sup> en multipliant par 990 : c’est le <strong>coefficient de proportionnalité</strong>.</p>
          ${liste([
            "pourcentage : 15 % de 2 400 = 2 400 × 15 ÷ 100 = 360 ;",
            "échelle : sur un plan au 1/200, 3 cm représentent 600 cm = 6 m.",
          ])}
          ${retenir("Dans un tableau de proportionnalité, les quotients des nombres d’une colonne sont tous égaux.")}`,
      },
    ],
  },
  {
    title: "Nombres décimaux relatifs",
    summary: "Nombres positifs et négatifs, opposés, valeur absolue, comparaison.",
    strand: NUM,
    lessons: [
      {
        title: "Les nombres relatifs",
        minutes: 12,
        body: `<p>Un nombre <strong>relatif</strong> a un signe : +3,5 (positif) ou −2 (négatif). On les utilise pour les températures, les altitudes, les dettes.</p>
          ${liste([
            "deux nombres <strong>opposés</strong> ne diffèrent que par le signe : 4 et −4 ;",
            "la <strong>distance à zéro</strong> (valeur absolue) de −4 est 4 ;",
            "un nombre négatif est plus petit qu’un nombre positif ; entre deux négatifs, le plus petit est celui qui a la plus grande distance à zéro : −7 &lt; −3.",
          ])}
          ${retenir("Sur une droite graduée, les négatifs sont à gauche de zéro, les positifs à droite.")}`,
      },
    ],
  },
  {
    title: "Repérage sur une droite et dans le plan",
    summary: "Abscisse sur une droite graduée, repère orthonormal, coordonnées d’un point.",
    strand: NUM,
    lessons: [
      {
        title: "Abscisse et coordonnées",
        minutes: 12,
        body: `${liste([
            "sur une droite graduée, chaque point a une <strong>abscisse</strong> : l’origine O a pour abscisse 0 ;",
            "dans un <strong>repère orthonormal</strong>, deux axes perpendiculaires gradués avec la même unité, un point M a pour <strong>coordonnées</strong> (abscisse ; ordonnée).",
          ])}
          ${exemple(["Le point A(3 ; 2) : on avance de 3 sur l’axe horizontal, puis on monte de 2."])}
          ${retenir("On lit toujours l’abscisse d’abord, l’ordonnée ensuite.")}`,
      },
    ],
  },
  {
    title: "Introduction à la géométrie",
    summary: "Points, droites, demi-droites, segments ; appartenance, alignement, instruments.",
    strand: GEO,
    lessons: [
      {
        title: "Points, droites, segments",
        minutes: 12,
        body: `${tableau([
            ["Objet", "Notation", "Description"],
            ["droite", "(AB)", "illimitée des deux côtés"],
            ["demi-droite", "[AB)", "commence en A et passe par B"],
            ["segment", "[AB]", "limité par A et B ; sa longueur se note AB"],
          ])}
          ${liste(["A ∈ (d) se lit « A appartient à la droite (d) » ;", "des points sont <strong>alignés</strong> s’ils sont sur une même droite ;", "le <strong>milieu</strong> I de [AB] est sur [AB] et IA = IB."])}
          ${retenir("Par deux points distincts passe une seule droite.")}`,
      },
    ],
  },
  {
    title: "Le cercle",
    summary: "Centre, rayon, diamètre, corde, arc ; tracer des cercles.",
    strand: GEO,
    lessons: [
      {
        title: "Le cercle",
        minutes: 12,
        body: `<p>Le <strong>cercle</strong> de centre O et de rayon r est l’ensemble des points M tels que OM = r.</p>
          ${liste(["un <strong>diamètre</strong> est une corde qui passe par le centre ; sa longueur vaut 2r ;", "une <strong>corde</strong> joint deux points du cercle ; un <strong>arc</strong> est une portion du cercle ;", "le <strong>disque</strong> est formé du cercle et de son intérieur."])}
          ${formula("Périmètre du cercle : P = 2 × π × r ≈ 2 × 3,14 × r")}
          ${exemple(["Un cercle de rayon 5 cm a pour diamètre 10 cm et pour périmètre environ 31,4 cm."])}`,
      },
    ],
  },
  {
    title: "Droites perpendiculaires et droites parallèles",
    summary: "Définitions, tracés à l’équerre et à la règle, propriétés.",
    strand: GEO,
    lessons: [
      {
        title: "Perpendiculaires et parallèles",
        minutes: 15,
        body: `${liste([
            "deux droites <strong>perpendiculaires</strong> se coupent en formant un angle droit : (d) ⊥ (d’) ;",
            "deux droites <strong>parallèles</strong> ne se coupent pas (ou sont confondues) : (d) // (d’).",
          ])}
          ${retenir("Si deux droites sont perpendiculaires à une même troisième, elles sont parallèles. Si deux droites sont parallèles, toute perpendiculaire à l’une est perpendiculaire à l’autre.")}
          ${methode(["Placer la règle le long de (d).", "Faire glisser l’équerre le long de la règle jusqu’au point A.", "Tracer la droite le long de l’autre côté de l’équerre."], "Tracer la parallèle à (d) passant par A")}`,
      },
    ],
  },
  {
    title: "Symétrie orthogonale",
    summary: "Symétrique d’un point, d’une figure par rapport à une droite ; médiatrice ; axes de symétrie.",
    strand: GEO,
    lessons: [
      {
        title: "Symétrie par rapport à une droite",
        minutes: 15,
        body: `<p>Le symétrique du point A par rapport à la droite (d) est le point A’ tel que (d) soit la <strong>médiatrice</strong> de [AA’] : (d) est perpendiculaire à [AA’] en son milieu.</p>
          ${retenir("La symétrie orthogonale conserve les longueurs, les angles, l’alignement et les aires.")}
          ${liste(["les points de (d) sont leurs propres symétriques ;", "tout point de la médiatrice de [AB] est à égale distance de A et de B ;", "une figure a un axe de symétrie si elle est sa propre image par la symétrie (le cercle en a une infinité)."])}`,
      },
    ],
  },
  {
    title: "Angles",
    summary: "Mesurer et construire un angle ; angles particuliers ; bissectrice.",
    strand: GEO,
    lessons: [
      {
        title: "Mesurer et construire des angles",
        minutes: 12,
        body: `${tableau([
            ["Angle", "Mesure"],
            ["aigu", "entre 0° et 90°"],
            ["droit", "90°"],
            ["obtus", "entre 90° et 180°"],
            ["plat", "180°"],
          ])}
          ${liste(["on mesure un angle avec un <strong>rapporteur</strong>, en plaçant son centre sur le sommet ;", "deux angles sont <strong>complémentaires</strong> si leur somme vaut 90°, <strong>supplémentaires</strong> si elle vaut 180° ;", "la <strong>bissectrice</strong> d’un angle le partage en deux angles égaux."])}`,
      },
    ],
  },
  {
    title: "Polygones",
    summary: "Triangles et quadrilatères particuliers : propriétés et constructions.",
    strand: GEO,
    lessons: [
      {
        title: "Triangles",
        minutes: 12,
        body: `${tableau([
            ["Triangle", "Propriété"],
            ["isocèle", "2 côtés égaux et 2 angles égaux"],
            ["équilatéral", "3 côtés égaux, 3 angles de 60°"],
            ["rectangle", "un angle droit"],
          ])}
          ${retenir("La somme des angles d’un triangle vaut 180°.")}
          ${exemple(["Un triangle a deux angles de 50° et 70° : le troisième mesure 180° − 120° = 60°."])}`,
      },
      {
        title: "Quadrilatères particuliers",
        minutes: 12,
        body: `${tableau([
            ["Quadrilatère", "Propriétés"],
            ["rectangle", "4 angles droits ; diagonales de même longueur qui se coupent en leur milieu"],
            ["losange", "4 côtés égaux ; diagonales perpendiculaires qui se coupent en leur milieu"],
            ["carré", "rectangle et losange à la fois"],
          ])}
          ${retenir("Un polygone régulier a tous ses côtés et tous ses angles égaux (triangle équilatéral, carré, hexagone régulier).")}`,
      },
    ],
  },
  {
    title: "Aires",
    summary: "Unités d’aire ; aires du rectangle, du carré, du triangle et du disque.",
    strand: GEO,
    lessons: [
      {
        title: "Calculer des aires",
        minutes: 15,
        body: `${tableau([
            ["Figure", "Aire"],
            ["rectangle", "L × l"],
            ["carré", "c × c"],
            ["triangle", `${frac("b × h", "2")}`],
            ["disque", "π × r × r"],
          ])}
          ${retenir("1 m² = 100 dm² = 10 000 cm² ; 1 ha = 10 000 m².")}
          ${exemple(["Un disque de rayon 3 cm : A ≈ 3,14 × 9 = 28,26 cm²."])}`,
      },
    ],
  },
  {
    title: "Géométrie dans l’espace",
    summary: "Pavé droit, cylindre, sphère et boule : représentation, patron, aires et volumes.",
    strand: GEO,
    lessons: [
      {
        title: "Pavé droit et cylindre",
        minutes: 15,
        body: `${tableau([
            ["Solide", "Aire latérale", "Volume"],
            ["pavé droit (L, l, h)", "2 × (L + l) × h", "L × l × h"],
            ["cube (a)", "4 × a²", "a³"],
            ["cylindre (r, h)", "2 × π × r × h", "π × r² × h"],
          ])}
          ${retenir("Le patron d’un pavé droit est formé de 6 rectangles ; celui d’un cylindre de 2 disques et d’un rectangle.")}`,
      },
      {
        title: "Sphère et boule",
        minutes: 10,
        body: `${formula(`Aire de la sphère : 4πR² ; volume de la boule : ${frac("4", "3")}πR³`)}
          ${exemple(["Un ballon de rayon 10 cm : volume ≈ 4/3 × 3,14 × 1 000 ≈ 4 187 cm³."])}
          ${retenir("Un <strong>grand cercle</strong> de la sphère a le même centre et le même rayon qu’elle.")}`,
      },
    ],
  },
  {
    title: "Repérage sur la sphère",
    summary: "Pôles, équateur, parallèles, méridiens, latitude, longitude, coordonnées géographiques.",
    strand: GEO,
    lessons: [
      {
        title: "Latitude et longitude",
        minutes: 12,
        body: `${liste([
            "la Terre tourne autour de l’axe des pôles (Nord et Sud) ;",
            "l’<strong>équateur</strong> est le grand cercle perpendiculaire à cet axe ; les <strong>parallèles</strong> sont les cercles parallèles à l’équateur ;",
            "les <strong>méridiens</strong> sont les demi-grands cercles qui joignent les pôles ; le méridien origine passe par Greenwich ;",
            "la <strong>latitude</strong> se mesure de 0° à 90° Nord ou Sud ; la <strong>longitude</strong> de 0° à 180° Est ou Ouest.",
          ])}
          ${exemple(["Dakar a pour coordonnées géographiques environ 14,7° N et 17,4° O."])}`,
      },
    ],
  },
];
