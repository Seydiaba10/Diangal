// Mathématiques du CM2 : activités géométriques (paliers 5 à 7) et activités de mesure (paliers 4 à
// 6) de la progression officielle des cahiers PAAME (MEN 2024, conformes au CEB). Rédigées par DIANGAL.

import { type ChapterSpec, exemple, formula, frac, liste, methode, retenir, tableau } from "./blocks";

const GEO = "Activités géométriques";
const MES = "Activités de mesure";

export const MATH_CM2_GEOMETRIE: ChapterSpec[] = [
  {
    title: "Les quadrilatères et le triangle",
    summary: "Carré, rectangle, losange, parallélogramme, trapèze et triangles : propriétés et constructions.",
    strand: GEO,
    lessons: [
      {
        title: "Carré, rectangle et losange",
        minutes: 12,
        body: `${tableau([
            ["Figure", "Côtés", "Angles", "Diagonales"],
            ["carré", "4 côtés égaux", "4 angles droits", "égales, perpendiculaires, se coupent en leur milieu"],
            ["rectangle", "côtés opposés égaux et parallèles", "4 angles droits", "égales, se coupent en leur milieu"],
            ["losange", "4 côtés égaux", "angles opposés égaux", "perpendiculaires, se coupent en leur milieu"],
          ])}
          ${retenir("Le carré est à la fois un rectangle et un losange.")}
          ${methode(["Tracer un côté avec la règle.", "Tracer les angles droits avec l’équerre.", "Reporter les longueurs au compas ou à la règle.", "Vérifier les côtés et les angles."], "Construire un rectangle")}`,
      },
      {
        title: "Parallélogramme et trapèze",
        minutes: 12,
        body: `${liste([
            "<strong>parallélogramme</strong> : quadrilatère dont les côtés opposés sont parallèles et de même longueur ; ses diagonales se coupent en leur milieu ;",
            "<strong>trapèze</strong> : quadrilatère qui a deux côtés parallèles, appelés grande base et petite base ; la distance entre les bases est la hauteur ;",
            "un trapèze rectangle a un angle droit ; un trapèze isocèle a ses deux côtés non parallèles égaux.",
          ])}
          ${exemple(["Pour construire un parallélogramme ABCD : on trace [AB] et [AD], puis la parallèle à (AB) passant par D et la parallèle à (AD) passant par B ; elles se coupent en C."])}`,
      },
      {
        title: "Les triangles",
        minutes: 12,
        body: `${tableau([
            ["Triangle", "Propriété"],
            ["quelconque", "trois côtés de longueurs différentes"],
            ["isocèle", "deux côtés égaux et deux angles égaux"],
            ["équilatéral", "trois côtés égaux et trois angles de 60°"],
            ["rectangle", "un angle droit"],
          ])}
          ${retenir("La somme des trois angles d’un triangle est toujours égale à 180°.")}
          ${methode(["Tracer le premier côté avec la règle.", "Avec le compas, tracer deux arcs de cercle ayant pour rayons les deux autres longueurs.", "Le point d’intersection des arcs est le troisième sommet."], "Construire un triangle connaissant ses trois côtés")}`,
      },
    ],
  },
  {
    title: "Le cercle et les polygones",
    summary: "Cercle, disque, rayon et diamètre ; hexagone, octogone et polygones irréguliers.",
    strand: GEO,
    lessons: [
      {
        title: "Le cercle",
        minutes: 10,
        body: `<p>Le <strong>cercle</strong> est l’ensemble des points situés à la même distance d’un point, le <strong>centre</strong>. Cette distance est le <strong>rayon</strong>. Le <strong>diamètre</strong> passe par le centre : d = 2 × r.</p>
          ${liste(["une corde joint deux points du cercle ;", "un arc est une portion de cercle ;", "le disque est la surface limitée par le cercle."])}
          ${exemple(["Pour tracer un cercle de 3 cm de rayon, on ouvre le compas de 3 cm, on pique la pointe sur le centre et on tourne."])}`,
      },
      {
        title: "Les polygones",
        minutes: 12,
        body: `<p>Un <strong>polygone</strong> est une figure fermée formée de segments. On le nomme selon son nombre de côtés.</p>
          ${tableau([
            ["Nombre de côtés", "Nom"],
            ["3", "triangle"],
            ["4", "quadrilatère"],
            ["5", "pentagone"],
            ["6", "hexagone"],
            ["8", "octogone"],
          ])}
          ${retenir("Un polygone régulier a tous ses côtés égaux et tous ses angles égaux. On peut tracer un hexagone régulier en reportant six fois le rayon sur un cercle.")}
          ${exemple(["Un polygone irrégulier (côtés inégaux) se décompose en triangles et en rectangles pour calculer son aire."])}`,
      },
    ],
  },
  {
    title: "Les solides",
    summary: "Cube, pavé droit, cylindre et prisme droit : faces, arêtes, sommets et patrons.",
    strand: GEO,
    lessons: [
      {
        title: "Cube et pavé droit",
        minutes: 12,
        body: `${tableau([
            ["Solide", "Faces", "Arêtes", "Sommets"],
            ["cube", "6 carrés identiques", "12 de même longueur", "8"],
            ["pavé droit", "6 rectangles (opposés égaux deux à deux)", "12", "8"],
          ])}
          ${retenir("Le <strong>patron</strong> d’un solide est la figure plane qu’on découpe et qu’on plie pour le fabriquer. Un cube a 11 patrons différents.")}
          ${exemple(["Une boîte d’allumettes et une brique sont des pavés droits ; un dé à jouer est un cube."])}`,
      },
      {
        title: "Cylindre et prisme droit",
        minutes: 12,
        body: `${liste([
            "le <strong>cylindre</strong> a deux bases qui sont des disques identiques et une surface latérale qui, déroulée, est un rectangle (boîte de conserve, tuyau) ;",
            "le <strong>prisme droit</strong> a deux bases polygonales identiques et parallèles (triangles, hexagones…) et des faces latérales rectangulaires.",
          ])}
          ${retenir("La longueur du rectangle de la surface latérale d’un cylindre est égale au périmètre du disque de base.")}`,
      },
    ],
  },
  {
    title: "Symétrie, translation, agrandissement et réduction",
    summary: "Axe de symétrie, figures symétriques, glisser une figure, agrandir et réduire.",
    strand: GEO,
    lessons: [
      {
        title: "Symétrie axiale et translation",
        minutes: 12,
        body: `<p>Deux figures sont <strong>symétriques</strong> par rapport à une droite (l’axe) si elles se superposent quand on plie le long de cet axe. Une figure a un <strong>axe de symétrie</strong> si ses deux moitiés se superposent par pliage.</p>
          ${exemple(["Le carré a 4 axes de symétrie, le rectangle 2, le cercle une infinité ; le drapeau du Sénégal (sans l’étoile) a un axe horizontal."])}
          ${retenir("Une <strong>translation</strong> fait glisser une figure dans une direction, d’une longueur donnée, sans la tourner : la figure obtenue a la même forme et les mêmes dimensions.")}`,
      },
      {
        title: "Agrandissement et réduction",
        minutes: 12,
        body: `<p>Agrandir ou réduire une figure, c’est multiplier toutes ses longueurs par un même nombre : la forme et les angles ne changent pas.</p>
          ${exemple(["Un rectangle de 4 cm sur 2 cm agrandi 3 fois devient un rectangle de 12 cm sur 6 cm.", `Réduit de moitié (× ${frac("1", "2")}), il devient un rectangle de 2 cm sur 1 cm.`])}
          ${retenir("Sur un quadrillage, on agrandit une figure en multipliant le nombre de carreaux de chaque segment.")}`,
      },
    ],
  },
];

export const MATH_CM2_MESURE: ChapterSpec[] = [
  {
    title: "Longueurs et périmètres",
    summary: "Le mètre, ses multiples et sous-multiples ; périmètres du carré, du rectangle et du cercle.",
    strand: MES,
    lessons: [
      {
        title: "Le mètre, ses multiples et sous-multiples",
        minutes: 12,
        body: `${tableau([
            ["km", "hm", "dam", "m", "dm", "cm", "mm"],
            ["1 000 m", "100 m", "10 m", "1 m", "0,1 m", "0,01 m", "0,001 m"],
          ])}
          ${retenir("Chaque unité vaut 10 fois l’unité immédiatement à sa droite. Pour convertir, on place le nombre dans le tableau, le chiffre des unités dans la colonne de l’unité donnée.")}
          ${exemple(["3,25 km = 3 250 m ; 45 cm = 0,45 m ; 2 m 8 cm = 208 cm."])}`,
      },
      {
        title: "Les périmètres",
        minutes: 15,
        body: `<p>Le <strong>périmètre</strong> est la longueur du tour d’une figure.</p>
          ${tableau([
            ["Figure", "Périmètre", "Dimension à partir du périmètre"],
            ["carré de côté c", "P = c × 4", "c = P ÷ 4"],
            ["rectangle", "P = (L + l) × 2", "L = P ÷ 2 − l"],
            ["cercle de diamètre d", "P = d × 3,14", "d = P ÷ 3,14"],
          ])}
          ${exemple(["Un champ rectangulaire de 60 m sur 40 m : P = (60 + 40) × 2 = 200 m.", "Une roue de 50 cm de diamètre : P = 50 × 3,14 = 157 cm."])}
          ${retenir("Pour planter des arbres le long d’une allée (intervalles) : sur une ligne ouverte, il y a un arbre de plus que d’intervalles ; autour d’un champ fermé, autant d’arbres que d’intervalles.")}`,
      },
    ],
  },
  {
    title: "Capacités, masses et angles",
    summary: "Le litre, le gramme, masse brute, masse nette et tare, mesure des angles en degrés.",
    strand: MES,
    lessons: [
      {
        title: "Le litre et le gramme",
        minutes: 12,
        body: `${tableau([
            ["hL", "daL", "L", "dL", "cL", "mL"],
            ["100 L", "10 L", "1 L", "0,1 L", "0,01 L", "0,001 L"],
          ])}
          ${tableau([
            ["t", "q", "kg", "hg", "dag", "g", "dg", "cg", "mg"],
            ["1 000 kg", "100 kg", "1 000 g", "100 g", "10 g", "1 g", "0,1 g", "0,01 g", "0,001 g"],
          ])}
          ${exemple(["2,5 L = 25 dL = 250 cL ; 1 sac de riz de 50 kg = 0,5 quintal ; 3 t = 3 000 kg."])}`,
      },
      {
        title: "Masse brute, masse nette et tare ; les angles",
        minutes: 12,
        body: `${formula("Masse brute = masse nette + tare")}
          <p>La <strong>masse nette</strong> est celle du produit seul ; la <strong>tare</strong> est la masse de l’emballage ; la <strong>masse brute</strong> est celle de l’ensemble.</p>
          ${exemple(["Une boîte de lait pèse 450 g ; l’emballage pèse 50 g : masse nette = 400 g."])}
          <h2>Les angles</h2>
          ${retenir("On mesure un angle en degrés (°) avec un rapporteur. Angle droit : 90° ; angle aigu : moins de 90° ; angle obtus : entre 90° et 180° ; angle plat : 180°.")}`,
      },
    ],
  },
  {
    title: "Les aires",
    summary: "Le mètre carré ; aires du carré, du rectangle, du triangle, du parallélogramme, du losange, du trapèze et du disque.",
    strand: MES,
    lessons: [
      {
        title: "Le mètre carré et les mesures agraires",
        minutes: 12,
        body: `<p>L’<strong>aire</strong> est la mesure d’une surface. L’unité principale est le mètre carré (m²), aire d’un carré de 1 m de côté.</p>
          ${tableau([
            ["km²", "hm²", "dam²", "m²", "dm²", "cm²", "mm²"],
            ["", "1 ha", "1 a", "1 ca", "", "", ""],
          ])}
          ${retenir("Chaque unité d’aire vaut 100 fois l’unité immédiatement inférieure : on écrit deux chiffres par colonne. Mesures agraires : 1 hectare (ha) = 1 hm² = 10 000 m² ; 1 are (a) = 100 m².")}
          ${exemple(["3 m² = 300 dm² ; 2,5 ha = 25 000 m²."])}`,
      },
      {
        title: "Aires du carré, du rectangle et du triangle",
        minutes: 15,
        body: `${tableau([
            ["Figure", "Aire", "Dimension à partir de l’aire"],
            ["carré", "A = c × c", "c = le nombre qui, multiplié par lui-même, donne A"],
            ["rectangle", "A = L × l", "L = A ÷ l"],
            ["triangle", "A = b × h ÷ 2", "b = A × 2 ÷ h ; h = A × 2 ÷ b"],
          ])}
          ${exemple(["Un terrain rectangulaire de 25 m sur 18 m : A = 450 m².", "Un triangle de base 12 cm et de hauteur 5 cm : A = 12 × 5 ÷ 2 = 30 cm²."])}
          ${retenir("Les deux dimensions doivent être dans la même unité avant de calculer.")}`,
      },
      {
        title: "Aires du parallélogramme, du losange, du trapèze et du disque",
        minutes: 15,
        body: `${tableau([
            ["Figure", "Aire"],
            ["parallélogramme", "A = b × h"],
            ["losange", "A = D × d ÷ 2 (produit des diagonales divisé par 2)"],
            ["trapèze", "A = (B + b) × h ÷ 2"],
            ["disque de rayon r", "A = r × r × 3,14"],
          ])}
          ${exemple(["Un trapèze de bases 10 m et 6 m, de hauteur 4 m : A = (10 + 6) × 4 ÷ 2 = 32 m².", "Un disque de 5 cm de rayon : A = 5 × 5 × 3,14 = 78,5 cm²."])}
          ${retenir("Si on double les côtés d’un carré, son aire est multipliée par 4.")}`,
      },
    ],
  },
  {
    title: "Les volumes",
    summary: "Le mètre cube ; volumes du cube, du pavé droit et du cylindre ; volume, masse et capacité.",
    strand: MES,
    lessons: [
      {
        title: "Le mètre cube et le volume du cube et du pavé",
        minutes: 15,
        body: `<p>Le <strong>volume</strong> est la place occupée par un solide. L’unité principale est le mètre cube (m³), volume d’un cube de 1 m d’arête.</p>
          ${retenir("Chaque unité de volume vaut 1 000 fois l’unité immédiatement inférieure : 1 m³ = 1 000 dm³ ; 1 dm³ = 1 000 cm³ (trois chiffres par colonne).")}
          ${tableau([
            ["Solide", "Volume"],
            ["cube d’arête a", "V = a × a × a"],
            ["pavé droit", "V = L × l × h"],
          ])}
          ${exemple(["Une citerne en forme de pavé de 2 m × 1,5 m × 1 m a un volume de 3 m³."])}`,
      },
      {
        title: "Volume du cylindre ; volume, capacité et masse",
        minutes: 15,
        body: `${formula("Volume du cylindre = aire de la base × hauteur = r × r × 3,14 × h")}
          ${exemple(["Un fût de 0,3 m de rayon et de 1 m de haut : V = 0,3 × 0,3 × 3,14 × 1 ≈ 0,283 m³, soit environ 283 L."])}
          ${tableau([
            ["Volume", "Capacité", "Masse d’eau"],
            ["1 dm³", "1 L", "1 kg"],
            ["1 cm³", "1 mL", "1 g"],
            ["1 m³", "1 000 L", "1 t"],
          ])}
          ${retenir("La <strong>masse volumique</strong> est la masse d’un volume unité d’une matière : celle de l’eau est 1 kg/dm³. Masse = volume × masse volumique.")}`,
      },
    ],
  },
  {
    title: "Durées, vitesse et débit",
    summary: "Unités de durée, calculs sur les durées, mouvements uniformes, graphiques et débit.",
    strand: MES,
    lessons: [
      {
        title: "Les durées",
        minutes: 12,
        body: `${tableau([
            ["Unité", "Équivalence"],
            ["1 h", "60 min"],
            ["1 min", "60 s"],
            ["1 jour", "24 h"],
            ["1 an", "365 jours (366 pour une année bissextile)"],
          ])}
          ${methode(["Additionner séparément les heures, les minutes, les secondes.", "Convertir quand on dépasse 60 (70 min = 1 h 10 min).", "Pour soustraire, emprunter 1 h = 60 min si nécessaire."], "Calculer sur les durées")}
          ${exemple(["Un car part de Dakar à 7 h 45 et arrive à Kaolack à 11 h 20 : durée = 3 h 35 min.", "2 h 40 min × 3 = 6 h 120 min = 8 h."])}`,
      },
      {
        title: "Mouvements uniformes et débit",
        minutes: 15,
        body: `${formula("distance = vitesse × durée ; vitesse = distance ÷ durée ; durée = distance ÷ vitesse")}
          ${exemple(["Un camion roule à 60 km/h pendant 2 h 30 min (2,5 h) : d = 60 × 2,5 = 150 km.", "Un cycliste parcourt 45 km en 3 h : v = 15 km/h."])}
          ${retenir("Un mouvement est uniforme quand la vitesse reste la même. Sa représentation graphique (distance en fonction du temps) est une droite.")}
          ${formula("Débit = volume ÷ durée (en L/min, m³/h…)")}
          ${exemple(["Un robinet débite 12 L par minute : il remplit un fût de 240 L en 240 ÷ 12 = 20 min."])}`,
      },
    ],
  },
  {
    title: "Prix, budget et pourcentages",
    summary: "Budget familial, prix d’achat, frais, prix de revient, prix de vente, bénéfice et perte.",
    strand: MES,
    lessons: [
      {
        title: "Le budget familial",
        minutes: 12,
        body: `<p>Le <strong>budget</strong> compare les <strong>recettes</strong> (salaires, ventes) et les <strong>dépenses</strong> (nourriture, loyer, électricité, école, transport) d’une famille pendant une période.</p>
          ${liste(["recettes &gt; dépenses : il y a une <strong>économie</strong> ;", "recettes &lt; dépenses : il y a un <strong>déficit</strong>."])}
          ${exemple(["Un père gagne 180 000 F par mois et dépense 165 000 F : il économise 15 000 F, soit 180 000 F en un an."])}`,
      },
      {
        title: "Prix d’achat, prix de vente, bénéfice et perte",
        minutes: 15,
        body: `${formula("prix de revient = prix d’achat + frais ; bénéfice = prix de vente − prix de revient")}
          ${liste(["si le prix de vente est inférieur au prix de revient, il y a une <strong>perte</strong> ;", "le pourcentage de bénéfice se calcule en général sur le prix d’achat (ou de revient)."])}
          ${exemple([
            "Une commerçante achète un sac d’oignons 12 000 F, paie 1 000 F de transport et le revend 15 600 F.",
            "Prix de revient : 13 000 F ; bénéfice : 2 600 F, soit 2 600 × 100 ÷ 13 000 = 20 % du prix de revient.",
          ])}
          ${retenir("Une remise (réduction) de 10 % sur 5 000 F : 5 000 × 10 ÷ 100 = 500 F ; on paie 4 500 F.")}`,
      },
    ],
  },
  {
    title: "Les intérêts",
    summary: "Intérêt simple, capital, taux et durée de placement.",
    strand: MES,
    lessons: [
      {
        title: "Calculer un intérêt simple",
        minutes: 15,
        body: `<p>Quand on place de l’argent (le <strong>capital</strong>) à la banque, il rapporte un <strong>intérêt</strong>. Le <strong>taux</strong> indique l’intérêt rapporté par 100 F en un an.</p>
          ${formula(`Intérêt = ${frac("capital × taux × durée (en années)", "100")}`)}
          ${exemple([
            "100 000 F placés à 6 % pendant 2 ans : I = 100 000 × 6 × 2 ÷ 100 = 12 000 F.",
            `Pour une durée en mois : I = ${frac("C × t × n", "1 200")} ; en jours (année de 360 jours) : I = ${frac("C × t × n", "36 000")}.`,
          ])}
          ${retenir("Le capital augmenté de ses intérêts s’appelle la <strong>valeur acquise</strong>.")}`,
      },
      {
        title: "Retrouver le capital, le taux ou la durée",
        minutes: 15,
        body: `${tableau([
            ["On cherche…", "Formule (durée en années)"],
            ["le capital", "C = I × 100 ÷ (t × n)"],
            ["le taux", "t = I × 100 ÷ (C × n)"],
            ["la durée", "n = I × 100 ÷ (C × t)"],
          ])}
          ${exemple(["Un capital placé à 5 % rapporte 4 000 F en 1 an : C = 4 000 × 100 ÷ 5 = 80 000 F.", "200 000 F rapportent 18 000 F en 2 ans : t = 18 000 × 100 ÷ (200 000 × 2) = 4,5 %."])}`,
      },
    ],
  },
  {
    title: "Partages et moyenne",
    summary: "Parts égales, parts inégales, partages proportionnels et moyenne.",
    strand: MES,
    lessons: [
      {
        title: "Partages en parts égales et inégales",
        minutes: 15,
        body: `${methode([
            "Représenter les parts par des segments (schéma).",
            "Retirer du total ce qui fait la différence entre les parts.",
            "Diviser le reste par le nombre de parts égales ; en déduire chaque part.",
          ], "Partage en parts inégales (somme et différence connues)")}
          ${exemple([
            "Awa et Fatou se partagent 5 000 F ; Awa reçoit 1 000 F de plus que Fatou.",
            "5 000 − 1 000 = 4 000 ; 4 000 ÷ 2 = 2 000 : Fatou reçoit 2 000 F et Awa 3 000 F.",
          ])}
          ${exemple(["Partage de 6 000 F entre trois enfants, l’aîné ayant le double du cadet et le benjamin autant que le cadet : 2 + 1 + 1 = 4 parts ; une part = 1 500 F ; l’aîné reçoit 3 000 F."])}`,
      },
      {
        title: "Partages proportionnels et moyenne",
        minutes: 15,
        body: `<p>Dans un <strong>partage proportionnel</strong>, chacun reçoit selon sa mise, son travail ou son nombre d’enfants.</p>
          ${exemple(["Trois associés ont versé 20 000 F, 30 000 F et 50 000 F, et gagnent 25 000 F. Total des mises : 100 000 F ; pour 1 000 F versés, on reçoit 250 F. Parts : 5 000 F, 7 500 F, 12 500 F."])}
          ${formula("Moyenne = somme des valeurs ÷ nombre de valeurs")}
          ${exemple(["Notes de Moussa : 12, 15, 9 et 14. Moyenne = 50 ÷ 4 = 12,5."])}`,
      },
    ],
  },
];
