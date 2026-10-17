// Mathématiques du CE2 (étape 2 du CEB, niveau 2). Progression : cahier d’exercices PAAME du CE2
// (MEN, édition 2024, conforme au CEB) et guide pédagogique officiel de l’étape 2. Leçons rédigées
// par DIANGAL, à faire valider par un enseignant.

import { tableau } from "../3e/blocks";
import { bullets, type CiChapterSpec, keyPoint, practice } from "../ci/blocks";

const NUM = "Activités numériques";
const GEO = "Activités géométriques";
const MES = "Activités de mesure";
const PB = "Résolution de problèmes";

export const MATH_CE2: CiChapterSpec[] = [
  // ── Activités numériques ──────────────────────────────────────────────────
  {
    title: "Révisions : nombres et opérations jusqu’à 10 000",
    strand: NUM,
    summary: "Revoir les nombres jusqu’à 10 000 et les quatre opérations du CE1.",
    lessons: [
      {
        title: "Les quatre opérations : rappel",
        body: `${tableau([
            ["Opération", "Sens", "Exemple"],
            ["addition", "réunir, trouver un total", "2 345 + 1 250 = 3 595"],
            ["soustraction", "enlever, trouver un reste ou un écart", "5 000 − 1 750 = 3 250"],
            ["multiplication", "répéter plusieurs fois", "125 × 4 = 500"],
            ["division", "partager en parts égales", "96 ÷ 8 = 12"],
          ])}
          ${keyPoint("Avant de calculer, je me demande quelle opération répond à la question.")}
          ${practice(["Calcule 4 508 + 3 297 et 7 000 − 2 486.", "Partage 84 billes entre 7 enfants."])}`,
      },
    ],
  },
  {
    title: "Les nombres jusqu’à 100 000",
    strand: NUM,
    summary: "Lire, écrire, décomposer et comparer les nombres de 10 000 à 100 000.",
    lessons: [
      {
        title: "Lire et écrire les nombres jusqu’à 100 000",
        body: `${tableau([
            ["Dizaines de mille", "Unités de mille", "Centaines", "Dizaines", "Unités"],
            ["4", "7", "3", "0", "8"],
          ])}
          <p>47 308 = 40 000 + 7 000 + 300 + 8 : quarante-sept mille trois cent huit.</p>
          ${keyPoint("99 999 + 1 = 100 000 (cent mille). On sépare la classe des mille de la classe des unités par un espace.")}
          ${practice(["Écris en chiffres : soixante-cinq mille quarante.", "Range dans l’ordre croissant : 56 300, 53 600, 65 030."])}`,
      },
    ],
  },
  {
    title: "Addition et soustraction des grands nombres",
    strand: NUM,
    summary: "Sens et techniques de l’addition et de la soustraction jusqu’à 100 000.",
    lessons: [
      {
        title: "Additionner et soustraire de grands nombres",
        body: `${bullets([
            "Je pose les nombres en colonnes en alignant les unités.",
            "Je calcule de droite à gauche en pensant aux retenues.",
            "Je vérifie la soustraction par une addition.",
          ])}
          <p>Exemples : 35 467 + 18 256 = 53 723 ; 60 000 − 24 375 = 35 625.</p>
          ${keyPoint("J’estime d’abord un ordre de grandeur : 35 000 + 18 000 ≈ 53 000. Mon résultat doit être proche.")}
          ${practice(["Un village compte 12 450 habitants ; un autre 9 875. Combien en tout ?", "Calcule 50 000 − 18 725."])}`,
      },
    ],
  },
  {
    title: "La multiplication",
    strand: NUM,
    summary: "Sens et technique de la multiplication par un nombre d’un ou deux chiffres.",
    lessons: [
      {
        title: "Multiplier par un ou deux chiffres",
        body: `${bullets([
            "Multiplier par 10, 100, 1 000 : on ajoute 1, 2 ou 3 zéros (24 × 100 = 2 400).",
            "Multiplier par 25 : 12 × 25 = 300.",
            "Avec deux chiffres au multiplicateur : 1 245 × 23 = 1 245 × 3 + 1 245 × 20 = 3 735 + 24 900 = 28 635.",
          ])}
          ${keyPoint("Je connais mes tables de multiplication de 1 à 10 par cœur.")}
          ${practice(["Calcule 2 315 × 4 et 408 × 26.", "Un sac de riz coûte 18 500 F. Combien coûtent 3 sacs ?"])}`,
      },
    ],
  },
  {
    title: "La division",
    strand: NUM,
    summary: "Sens de la division ; diviser un grand nombre par un nombre d’un ou deux chiffres.",
    lessons: [
      {
        title: "Diviser de grands nombres",
        body: `${bullets([
            "Je cherche combien de fois le diviseur est contenu dans les premiers chiffres du dividende.",
            "Je multiplie, je soustrais, j’abaisse le chiffre suivant.",
            "Je vérifie : diviseur × quotient + reste = dividende.",
          ])}
          <p>Exemple : 4 536 ÷ 6 = 756 ; 1 000 ÷ 12 = 83, reste 4.</p>
          ${keyPoint("Le reste doit toujours être plus petit que le diviseur.")}
          ${practice(["Partage 12 600 F entre 4 enfants.", "Calcule 3 875 ÷ 25."])}`,
      },
    ],
  },
  {
    title: "Double, moitié, triple et divisibilité",
    strand: NUM,
    summary: "Nombres pairs et impairs, double, moitié et triple ; caractères de divisibilité par 2, 3, 5, 9 et 10.",
    lessons: [
      {
        title: "Caractères de divisibilité",
        body: `${tableau([
            ["Divisible par…", "si…"],
            ["2", "il est pair"],
            ["5", "il se termine par 0 ou 5"],
            ["10", "il se termine par 0"],
            ["3", "la somme de ses chiffres est dans la table de 3"],
            ["9", "la somme de ses chiffres est dans la table de 9"],
          ])}
          ${keyPoint("Le double de 450 est 900, sa moitié 225, son triple 1 350.")}
          ${practice(["2 718 est-il divisible par 3 ? par 9 ?", "Donne le triple de 1 200."])}`,
      },
    ],
  },
  {
    title: "Nombres décimaux et fractions simples",
    strand: NUM,
    summary: "Découvrir les nombres à virgule et les fractions simples (moitié, tiers, quart).",
    lessons: [
      {
        title: "Les fractions simples",
        body: `<p>Une <strong>fraction</strong> désigne des parts égales d’un tout.</p>
          ${tableau([
            ["Fraction", "Se lit", "Sens"],
            ["1/2", "un demi", "une part sur deux"],
            ["1/3", "un tiers", "une part sur trois"],
            ["1/4", "un quart", "une part sur quatre"],
            ["3/4", "trois quarts", "trois parts sur quatre"],
          ])}
          ${keyPoint("Le nombre du bas dit en combien de parts on coupe ; le nombre du haut dit combien de parts on prend.")}
          ${practice(["Plie une feuille en quatre et colorie 3/4.", "Combien vaut la moitié de 50 F ? le quart de 100 F ?"])}`,
      },
      {
        title: "Les nombres décimaux",
        body: `<p>Un <strong>nombre décimal</strong> a une virgule : la partie entière est à gauche, la partie décimale à droite.</p>
          ${bullets(["2,5 m = 2 m et 5 dixièmes de mètre = 2 m 50 cm.", "1/10 = 0,1 (un dixième) ; 1/100 = 0,01 (un centième)."])}
          ${keyPoint("On utilise les nombres décimaux pour les mesures : 1,5 L ; 2,75 m ; 3,5 kg.")}
          ${practice(["Écris en nombre décimal : 3 m 25 cm.", "Range : 2,5 ; 2,05 ; 2,55."])}`,
      },
    ],
  },
  // ── Activités géométriques ────────────────────────────────────────────────
  {
    title: "Lignes, droites et angles",
    strand: GEO,
    summary: "Lignes droites, courbes et brisées ; droites horizontales, verticales et obliques ; sécantes, parallèles, perpendiculaires ; angles droits, aigus et obtus.",
    lessons: [
      {
        title: "Les angles",
        body: `${tableau([
            ["Angle", "Description"],
            ["droit", "comme le coin de l’équerre"],
            ["aigu", "plus petit qu’un angle droit"],
            ["obtus", "plus grand qu’un angle droit"],
          ])}
          ${bullets(["Deux droites perpendiculaires forment quatre angles droits.", "Deux droites parallèles ne se coupent jamais."])}
          ${keyPoint("Pour comparer un angle à l’angle droit, je place l’équerre sur son sommet.")}
          ${practice(["Trace un angle aigu, un angle droit et un angle obtus.", "Cherche un angle obtus dans la classe."])}`,
      },
    ],
  },
  {
    title: "Carré, rectangle et triangle",
    strand: GEO,
    summary: "Reconnaître et construire le carré, le rectangle et les différents triangles.",
    lessons: [
      {
        title: "Les triangles",
        body: `<p>Un <strong>triangle</strong> a 3 côtés, 3 sommets et 3 angles.</p>
          ${tableau([
            ["Triangle", "Particularité"],
            ["rectangle", "un angle droit"],
            ["isocèle", "deux côtés égaux"],
            ["équilatéral", "trois côtés égaux"],
          ])}
          ${keyPoint("Pour construire un triangle, je trace un côté, puis je place le troisième sommet à l’aide de la règle et de l’équerre (ou du compas).")}
          ${practice(["Trace un triangle rectangle dont les côtés de l’angle droit mesurent 4 cm et 3 cm.", "Rappelle les propriétés du carré et du rectangle."])}`,
      },
    ],
  },
  {
    title: "Le cercle et la symétrie",
    strand: GEO,
    summary: "Tracer un cercle au compas ; figures symétriques et axe de symétrie.",
    lessons: [
      {
        title: "Le cercle",
        body: `${bullets(["Le <strong>centre</strong> est le point où on pique le compas.", "Le <strong>rayon</strong> est la distance du centre au cercle.", "Le <strong>diamètre</strong> traverse le cercle en passant par le centre : il vaut 2 rayons."])}
          ${keyPoint("Pour tracer un cercle de 3 cm de rayon, j’ouvre le compas de 3 cm.")}
          ${practice(["Trace un cercle de 4 cm de rayon et un de ses diamètres."])}`,
      },
      {
        title: "La symétrie",
        body: `<p>Une figure a un <strong>axe de symétrie</strong> si, quand on la plie le long de cette droite, les deux moitiés se superposent exactement.</p>
          ${bullets(["Le papillon, le cœur, la lettre A ont un axe de symétrie.", "Le carré en a 4, le rectangle 2."])}
          ${keyPoint("Pour compléter une figure symétrique sur un quadrillage, je compte les carreaux de chaque côté de l’axe.")}
          ${practice(["Plie une feuille, découpe une forme et déplie : observe l’axe de symétrie."])}`,
      },
    ],
  },
  {
    title: "Les patrons des solides",
    strand: GEO,
    summary: "Le patron du cube, du pavé droit et du cylindre.",
    lessons: [
      {
        title: "Cube, pavé droit et cylindre",
        body: `${tableau([
            ["Solide", "Faces", "Patron"],
            ["cube", "6 carrés identiques", "6 carrés reliés (en forme de croix, par exemple)"],
            ["pavé droit", "6 rectangles, égaux 2 à 2", "6 rectangles reliés"],
            ["cylindre", "2 disques et une surface courbe", "2 disques et un rectangle"],
          ])}
          ${keyPoint("Le patron est la figure plane qu’on découpe et qu’on plie pour fabriquer le solide.")}
          ${practice(["Dessine un patron de cube de 3 cm d’arête, découpe-le et plie-le.", "Cherche un objet en forme de cylindre à la maison."])}`,
      },
    ],
  },
  // ── Activités de mesure ───────────────────────────────────────────────────
  {
    title: "Les longueurs",
    strand: MES,
    summary: "Le mètre, ses multiples (dam, hm, km) et ses sous-multiples (dm, cm, mm).",
    lessons: [
      {
        title: "Le mètre, ses multiples et sous-multiples",
        body: `${tableau([
            ["km", "hm", "dam", "m", "dm", "cm", "mm"],
            ["1 000 m", "100 m", "10 m", "1 m", "", "", ""],
          ])}
          ${bullets(["1 km = 1 000 m : on mesure en kilomètres la distance entre deux villes.", "1 m = 10 dm = 100 cm = 1 000 mm."])}
          ${keyPoint("Chaque unité vaut 10 fois celle qui est à sa droite.")}
          ${practice(["Convertis : 3 km = … m ; 2 500 m = … km … m.", "Dakar–Thiès fait environ 70 km. Combien de mètres ?"])}`,
      },
    ],
  },
  {
    title: "Les masses et les capacités",
    strand: MES,
    summary: "Le gramme, ses multiples (dag, hg, kg, q, t) et sous-multiples ; le litre, ses multiples et sous-multiples.",
    lessons: [
      {
        title: "Les unités de masse",
        body: `${tableau([
            ["t", "q", "kg", "hg", "dag", "g", "dg", "cg", "mg"],
            ["1 000 kg", "100 kg", "1 000 g", "100 g", "10 g", "1 g", "", "", ""],
          ])}
          ${keyPoint("1 tonne = 10 quintaux = 1 000 kg. Un camion transporte des tonnes ; un sac de ciment pèse 50 kg.")}
          ${practice(["Convertis : 2 t = … kg ; 3 kg = … g.", "Combien de sacs de 50 kg dans 1 tonne ?"])}`,
      },
      {
        title: "Les unités de capacité",
        body: `${tableau([
            ["hL", "daL", "L", "dL", "cL", "mL"],
            ["100 L", "10 L", "1 L", "", "", ""],
          ])}
          ${keyPoint("Un fût contient environ 2 hL (200 L) ; une cuillère à soupe environ 15 mL.")}
          ${practice(["Convertis : 3 hL = … L ; 2 L = … cL."])}`,
      },
    ],
  },
  {
    title: "Masse nette, masse brute et durées",
    strand: MES,
    summary: "Masse nette, masse brute, tare ; heure, minute, seconde ; calculer un temps mis.",
    lessons: [
      {
        title: "Masse brute, masse nette et tare",
        body: `${bullets(["Masse <strong>nette</strong> : le produit seul.", "<strong>Tare</strong> : l’emballage.", "Masse <strong>brute</strong> = masse nette + tare."])}
          ${keyPoint("Un pot de beurre de karité : brute 550 g, tare 50 g, donc nette 500 g.")}
          ${practice(["Un sac de riz pèse 50,5 kg ; le sac vide pèse 500 g. Quelle est la masse nette ?"])}`,
      },
      {
        title: "Heures, minutes et secondes",
        body: `${bullets(["1 h = 60 min ; 1 min = 60 s.", "Pour calculer un temps mis : heure d’arrivée − heure de départ."])}
          ${keyPoint("Un car part à 8 h 15 et arrive à 10 h 45 : il a mis 2 h 30 min.")}
          ${practice(["Combien de secondes dans 2 minutes ?", "L’école commence à 8 h et finit à 13 h. Combien d’heures de classe ?"])}`,
      },
    ],
  },
  {
    title: "Prix et partages",
    strand: MES,
    summary: "Prix d’achat, prix de revient, prix de vente, bénéfice et perte ; parts égales et parts proportionnelles.",
    lessons: [
      {
        title: "Bénéfice et perte",
        body: `${bullets([
            "Prix de revient = prix d’achat + frais.",
            "Bénéfice = prix de vente − prix de revient (si on vend plus cher).",
            "Perte = prix de revient − prix de vente (si on vend moins cher).",
          ])}
          ${keyPoint("Un commerçant achète une chèvre 25 000 F, la nourrit pour 3 000 F et la revend 32 000 F : bénéfice = 32 000 − 28 000 = 4 000 F.")}
          ${practice(["Achat 1 500 F, vente 1 200 F : y a-t-il bénéfice ou perte ? De combien ?"])}`,
      },
      {
        title: "Partager",
        body: `${bullets([
            "Parts égales : je divise le total par le nombre de parts (9 000 F entre 3 = 3 000 F chacun).",
            "Parts proportionnelles : celui qui a donné 2 fois plus reçoit 2 fois plus.",
          ])}
          ${keyPoint("Deux amis cotisent 1 000 F et 2 000 F et gagnent 6 000 F : 3 parts de 2 000 F ; le premier reçoit 2 000 F, le second 4 000 F.")}
          ${practice(["Partage 12 000 F en parts égales entre 4 frères."])}`,
      },
    ],
  },
  {
    title: "Les périmètres",
    strand: MES,
    summary: "Périmètre du carré, du rectangle et du triangle ; retrouver une dimension.",
    lessons: [
      {
        title: "Calculer des périmètres",
        body: `${tableau([
            ["Figure", "Périmètre"],
            ["carré", "côté × 4"],
            ["rectangle", "(longueur + largeur) × 2"],
            ["triangle", "côté 1 + côté 2 + côté 3"],
          ])}
          ${keyPoint("Si je connais le périmètre d’un carré, je trouve son côté en divisant par 4 : P = 36 m, côté = 9 m.")}
          ${practice(["Calcule le périmètre d’un triangle de côtés 5 cm, 7 cm et 8 cm.", "Un rectangle a un périmètre de 30 m et une largeur de 5 m. Quelle est sa longueur ?"])}`,
      },
    ],
  },
  {
    title: "Les aires",
    strand: MES,
    summary: "Le mètre carré ; aire du carré et du rectangle.",
    lessons: [
      {
        title: "Aire du carré et du rectangle",
        body: `<p>L’<strong>aire</strong> mesure la surface. Le <strong>mètre carré</strong> (m²) est l’aire d’un carré de 1 m de côté.</p>
          ${bullets(["Aire du carré = côté × côté : un carré de 4 m de côté a une aire de 16 m².", "Aire du rectangle = longueur × largeur : 6 m × 3 m = 18 m²."])}
          ${keyPoint("Ne pas confondre périmètre (le tour, en m) et aire (la surface, en m²).")}
          ${practice(["Calcule l’aire d’une salle de 8 m sur 6 m.", "Combien de carreaux de 1 m² faut-il pour couvrir un carré de 5 m de côté ?"])}`,
      },
    ],
  },
  // ── Résolution de problèmes ───────────────────────────────────────────────
  {
    title: "Données et questions d’un problème",
    strand: PB,
    summary: "Données utiles, inutiles et manquantes ; tableaux de données ; question finale et questions intermédiaires.",
    lessons: [
      {
        title: "Lire et organiser un problème",
        body: `${bullets([
            "Je lis l’énoncé deux fois.",
            "Je souligne les données utiles et je barre les données inutiles.",
            "Je cherche s’il manque une donnée.",
            "Je repère la question finale et les questions intermédiaires.",
          ])}
          <p>« Un éleveur a 120 moutons. Il en vend 45 à 60 000 F l’un. Combien d’argent reçoit-il ? Combien de moutons lui reste-t-il ? »</p>
          ${keyPoint("Un tableau aide à ranger les données : nombre, prix unitaire, montant.")}
          ${practice(["Résous le problème de l’éleveur.", "Invente un problème avec une donnée manquante."])}`,
      },
    ],
  },
  {
    title: "Démarche et énoncé d’un problème",
    strand: PB,
    summary: "Résoudre pas à pas (démarche progressive) et rédiger l’énoncé d’un problème.",
    lessons: [
      {
        title: "Résoudre pas à pas et inventer un énoncé",
        body: `${bullets([
            "Démarche progressive : je pars des données et je calcule étape par étape jusqu’à la question finale.",
            "Pour inventer un énoncé, je choisis une situation (marché, école), des données et une question.",
          ])}
          <p>À partir de « 3 × 250 = 750 » : « Fatou achète 3 cahiers à 250 F. Combien paie-t-elle ? »</p>
          ${keyPoint("Ma réponse est une phrase avec l’unité : « Fatou paie 750 F. »")}
          ${practice(["Invente un problème qui se résout par 5 000 − 1 750."])}`,
      },
    ],
  },
];
