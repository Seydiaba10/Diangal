// Mathématiques du CM1 (étape 3 du CEB, niveau 1). Progression : cahier d’exercices PAAME du CM1
// (MEN, édition 2024, conforme au CEB) : activités numériques (paliers 1 à 3), géométriques (1 à 4),
// de mesure (1 à 3) et résolution de problèmes (1 et 2). Leçons rédigées par DIANGAL, à faire valider.

import { tableau } from "../3e/blocks";
import { bullets, type CiChapterSpec, keyPoint, practice } from "../ci/blocks";

const NUM = "Activités numériques";
const GEO = "Activités géométriques";
const MES = "Activités de mesure";
const PB = "Résolution de problèmes";

export const MATH_CM1: CiChapterSpec[] = [
  // ── Activités numériques ──────────────────────────────────────────────────
  {
    title: "Les grands nombres",
    strand: NUM,
    summary: "Lire, écrire, décomposer et comparer les nombres jusqu’au million et au-delà.",
    lessons: [
      {
        title: "Les nombres jusqu’au million",
        body: `${tableau([
            ["Classe des millions", "Classe des mille", "Classe des unités"],
            ["1", "250", "430"],
          ])}
          <p>1 250 430 se lit : un million deux cent cinquante mille quatre cent trente.</p>
          ${keyPoint("999 999 + 1 = 1 000 000 (un million). Je sépare les classes de trois chiffres par un espace.")}
          ${practice(["Écris en chiffres : deux millions trente mille.", "Range dans l’ordre décroissant : 405 000 ; 450 000 ; 1 005 000."])}`,
      },
    ],
  },
  {
    title: "Les caractères de divisibilité",
    strand: NUM,
    summary: "Divisibilité par 2, 3, 5, 9 et 10.",
    lessons: [
      {
        title: "Reconnaître un nombre divisible",
        body: `${tableau([
            ["Par…", "Règle", "Exemple"],
            ["2", "il est pair", "4 568"],
            ["5", "il finit par 0 ou 5", "3 405"],
            ["10", "il finit par 0", "7 890"],
            ["3", "la somme des chiffres est divisible par 3", "1 254 (1 + 2 + 5 + 4 = 12)"],
            ["9", "la somme des chiffres est divisible par 9", "3 456 (3 + 4 + 5 + 6 = 18)"],
          ])}
          ${keyPoint("Ces règles servent à faire des partages sans reste et à simplifier les fractions.")}
          ${practice(["Parmi 135, 246, 370, 999 : lesquels sont divisibles par 3 ? par 5 ?"])}`,
      },
    ],
  },
  {
    title: "L’addition et la soustraction",
    strand: NUM,
    summary: "Sens et techniques de l’addition et de la soustraction, sans et avec retenue.",
    lessons: [
      {
        title: "Additionner et soustraire",
        body: `${bullets([
            "J’additionne pour trouver un total ; je soustrais pour trouver un reste, un écart ou une différence.",
            "Je pose en colonnes en alignant les unités et je n’oublie pas les retenues.",
            "Je vérifie une soustraction par une addition.",
          ])}
          <p>Exemples : 245 380 + 98 765 = 344 145 ; 500 000 − 123 456 = 376 544.</p>
          ${keyPoint("J’estime d’abord le résultat pour repérer une erreur.")}
          ${practice(["Une école a reçu 125 450 F, puis 87 600 F. Combien en tout ?", "Calcule 300 000 − 145 875."])}`,
      },
    ],
  },
  {
    title: "La multiplication",
    strand: NUM,
    summary: "Sens de la multiplication ; multiplier avec plusieurs chiffres au multiplicateur.",
    lessons: [
      {
        title: "Multiplier par un nombre de plusieurs chiffres",
        body: `${bullets([
            "Je multiplie par le chiffre des unités, puis par celui des dizaines (décalage d’un rang), puis des centaines (décalage de deux rangs).",
            "J’additionne les produits partiels.",
          ])}
          <p>Exemple : 246 × 135 = 1 230 + 7 380 + 24 600 = 33 210.</p>
          ${keyPoint("Pour multiplier par 100, j’ajoute deux zéros ; par 1 000, trois zéros.")}
          ${practice(["Calcule 324 × 46.", "Une école achète 125 tables à 18 500 F. Quel est le prix total ?"])}`,
      },
    ],
  },
  {
    title: "La division",
    strand: NUM,
    summary: "Sens de la division ; diviser par un nombre de deux chiffres.",
    lessons: [
      {
        title: "Diviser par un nombre de deux chiffres",
        body: `${bullets([
            "Je prends à gauche assez de chiffres pour contenir le diviseur.",
            "J’estime le quotient (je peux arrondir le diviseur : 23 ≈ 20).",
            "Je multiplie, je soustrais, j’abaisse le chiffre suivant et je recommence.",
          ])}
          <p>Exemple : 1 872 ÷ 24 = 78, car 24 × 78 = 1 872.</p>
          ${keyPoint("Vérification : diviseur × quotient + reste = dividende ; le reste est plus petit que le diviseur.")}
          ${practice(["Calcule 2 345 ÷ 15.", "On range 1 000 œufs dans des plateaux de 30. Combien de plateaux pleins ? Combien d’œufs restent ?"])}`,
      },
    ],
  },
  {
    title: "Les nombres décimaux",
    strand: NUM,
    summary: "Partie entière et partie décimale ; dixièmes, centièmes, millièmes ; comparer des décimaux.",
    lessons: [
      {
        title: "Lire, écrire et comparer les nombres décimaux",
        body: `${tableau([
            ["Unités", ",", "dixièmes", "centièmes", "millièmes"],
            ["4", ",", "0", "7", "5"],
          ])}
          <p>4,075 = 4 unités et 75 millièmes.</p>
          ${bullets(["Pour comparer, je compare d’abord les parties entières, puis les dixièmes, puis les centièmes…", "3,8 &gt; 3,75 car 8 dixièmes &gt; 7 dixièmes."])}
          ${keyPoint("2,5 = 2,50 = 2,500 : les zéros à la fin de la partie décimale ne changent rien.")}
          ${practice(["Range : 1,5 ; 1,05 ; 1,55 ; 1,505.", "Écris en nombre décimal : 7 m 8 cm."])}`,
      },
    ],
  },
  {
    title: "Opérations sur les nombres décimaux",
    strand: NUM,
    summary: "Additionner, soustraire, multiplier et diviser des nombres décimaux.",
    lessons: [
      {
        title: "Additionner et soustraire des décimaux",
        body: `${bullets(["J’aligne les virgules les unes sous les autres.", "Je complète avec des zéros si besoin.", "Je place la virgule au résultat sous les autres virgules."])}
          <p>Exemples : 12,5 + 7,35 = 19,85 ; 10 − 3,25 = 6,75.</p>
          ${keyPoint("Une virgule mal placée change complètement le résultat.")}
          ${practice(["Calcule 25,4 + 3,75 et 15 − 6,8."])}`,
      },
      {
        title: "Multiplier et diviser des décimaux",
        body: `${bullets([
            "Multiplier un décimal par un entier : je calcule sans la virgule, puis je remets autant de chiffres après la virgule : 2,35 × 4 = 9,40.",
            "Multiplier par 10, 100, 1 000 : la virgule avance de 1, 2 ou 3 rangs vers la droite.",
            "Diviser un décimal par un entier : je mets la virgule au quotient quand j’abaisse le premier chiffre décimal : 9,6 ÷ 3 = 3,2.",
          ])}
          ${keyPoint("Diviser par 10, 100, 1 000 : la virgule recule de 1, 2 ou 3 rangs vers la gauche.")}
          ${practice(["Un litre de lait coûte 750 F. Combien coûtent 2,5 L ?", "Partage 12,6 m de tissu en 3 morceaux égaux."])}`,
      },
    ],
  },
  {
    title: "Les fractions",
    strand: NUM,
    summary: "Fractions ordinaires et décimales ; comparer et simplifier des fractions.",
    lessons: [
      {
        title: "Fractions ordinaires et fractions décimales",
        body: `${bullets([
            "Dans 3/5, 5 est le <strong>dénominateur</strong> (le nombre de parts égales) et 3 le <strong>numérateur</strong> (les parts prises).",
            "Une <strong>fraction décimale</strong> a pour dénominateur 10, 100, 1 000 : 7/10 = 0,7 ; 25/100 = 0,25.",
          ])}
          ${keyPoint("Une fraction est égale à 1 quand le numérateur est égal au dénominateur (4/4 = 1).")}
          ${practice(["Écris en nombre décimal : 3/10, 45/100.", "Colorie les 2/5 d’une bande de 10 carreaux."])}`,
      },
      {
        title: "Comparer et simplifier des fractions",
        body: `${bullets([
            "Même dénominateur : la plus grande fraction a le plus grand numérateur (5/8 &gt; 3/8).",
            "Même numérateur : la plus grande a le plus petit dénominateur (1/3 &gt; 1/4).",
            "Simplifier : je divise le numérateur et le dénominateur par un même nombre : 6/8 = 3/4.",
          ])}
          ${keyPoint("Une fraction simplifiée garde la même valeur.")}
          ${practice(["Simplifie 10/15 et 12/16.", "Compare 3/7 et 5/7."])}`,
      },
    ],
  },
  {
    title: "Calculer avec les fractions",
    strand: NUM,
    summary: "Additionner et soustraire des fractions ; prendre une fraction d’une grandeur ; retrouver une grandeur.",
    lessons: [
      {
        title: "Additionner et soustraire des fractions",
        body: `${bullets([
            "Avec le même dénominateur, j’additionne (ou je soustrais) les numérateurs : 2/7 + 3/7 = 5/7.",
            "Sinon, je réduis d’abord au même dénominateur : 1/2 + 1/4 = 2/4 + 1/4 = 3/4.",
          ])}
          ${keyPoint("On garde le dénominateur ; on calcule seulement les numérateurs.")}
          ${practice(["Calcule 3/10 + 4/10 et 1 − 3/5."])}`,
      },
      {
        title: "Fraction d’une grandeur",
        body: `${bullets([
            "Les 3/4 de 800 F : 800 ÷ 4 = 200 ; 200 × 3 = 600 F.",
            "Si les 2/5 d’un champ font 40 m², 1/5 fait 20 m² et le champ fait 100 m².",
          ])}
          ${keyPoint("Je divise par le dénominateur, puis je multiplie par le numérateur.")}
          ${practice(["Awa a dépensé les 2/3 de ses 1 500 F. Combien a-t-elle dépensé ?"])}`,
      },
    ],
  },
  // ── Activités géométriques ────────────────────────────────────────────────
  {
    title: "Droites et angles",
    strand: GEO,
    summary: "Droites sécantes, perpendiculaires et parallèles ; angles droit, aigu et obtus.",
    lessons: [
      {
        title: "Tracer des droites et reconnaître des angles",
        body: `${bullets([
            "Deux droites <strong>sécantes</strong> se coupent ; si elles forment un angle droit, elles sont <strong>perpendiculaires</strong>.",
            "Deux droites <strong>parallèles</strong> ne se coupent jamais.",
            "Un angle <strong>aigu</strong> est plus petit qu’un angle droit ; un angle <strong>obtus</strong> est plus grand.",
          ])}
          ${keyPoint("Pour tracer une parallèle, je fais glisser l’équerre le long de la règle.")}
          ${practice(["Trace une droite et une parallèle à 3 cm.", "Dessine un angle aigu et un angle obtus."])}`,
      },
    ],
  },
  {
    title: "Les figures planes",
    strand: GEO,
    summary: "Carré, rectangle, triangle, parallélogramme et cercle.",
    lessons: [
      {
        title: "Reconnaître et construire les figures",
        body: `${tableau([
            ["Figure", "Propriétés"],
            ["carré", "4 côtés égaux, 4 angles droits"],
            ["rectangle", "côtés opposés égaux, 4 angles droits"],
            ["triangle", "3 côtés ; il peut être rectangle, isocèle ou équilatéral"],
            ["parallélogramme", "côtés opposés parallèles et égaux"],
            ["cercle", "tous ses points sont à la même distance du centre (le rayon)"],
          ])}
          ${keyPoint("J’utilise la règle pour les longueurs, l’équerre pour les angles droits et le compas pour les cercles.")}
          ${practice(["Construis un parallélogramme dont les côtés mesurent 5 cm et 3 cm.", "Trace un cercle de 2,5 cm de rayon."])}`,
      },
    ],
  },
  {
    title: "Les solides",
    strand: GEO,
    summary: "Cube, pavé droit et cylindre : faces, arêtes, sommets et patrons.",
    lessons: [
      {
        title: "Cube, pavé droit et cylindre",
        body: `${tableau([
            ["Solide", "Faces", "Arêtes", "Sommets"],
            ["cube", "6 carrés", "12", "8"],
            ["pavé droit", "6 rectangles", "12", "8"],
            ["cylindre", "2 disques + une face courbe", "—", "—"],
          ])}
          ${keyPoint("Le patron d’un cube est formé de 6 carrés reliés ; celui d’un cylindre de 2 disques et d’un rectangle.")}
          ${practice(["Fabrique un pavé droit en papier à partir d’un patron."])}`,
      },
    ],
  },
  {
    title: "Symétrie et translation",
    strand: GEO,
    summary: "Figures symétriques, axe de symétrie, translation sur un quadrillage.",
    lessons: [
      {
        title: "Symétrie et translation",
        body: `${bullets([
            "Deux figures sont <strong>symétriques</strong> par rapport à une droite si elles se superposent quand on plie le long de cette droite (l’axe).",
            "Une <strong>translation</strong> fait glisser une figure sans la tourner : sur un quadrillage, « 4 carreaux à droite, 2 vers le haut ».",
          ])}
          ${keyPoint("La symétrie et la translation ne changent ni la forme ni les dimensions de la figure.")}
          ${practice(["Sur un quadrillage, trace le symétrique d’un triangle.", "Fais glisser un carré de 3 carreaux vers la droite."])}`,
      },
    ],
  },
  // ── Activités de mesure ───────────────────────────────────────────────────
  {
    title: "Longueurs et périmètres",
    strand: MES,
    summary: "Le mètre, ses multiples et sous-multiples ; périmètres du carré, du rectangle et du cercle ; intervalles.",
    lessons: [
      {
        title: "Les unités de longueur",
        body: `${tableau([
            ["km", "hm", "dam", "m", "dm", "cm", "mm"],
            ["1 000 m", "100 m", "10 m", "1 m", "0,1 m", "0,01 m", "0,001 m"],
          ])}
          ${keyPoint("Pour convertir, j’écris le nombre dans le tableau en plaçant le chiffre des unités dans la bonne colonne.")}
          ${practice(["Convertis : 2,5 km = … m ; 345 cm = … m."])}`,
      },
      {
        title: "Les périmètres",
        body: `${tableau([
            ["Figure", "Périmètre"],
            ["carré", "côté × 4"],
            ["rectangle", "(longueur + largeur) × 2"],
            ["cercle", "diamètre × 3,14"],
          ])}
          ${keyPoint("Intervalles : le long d’une allée, il y a un arbre de plus que d’intervalles ; autour d’un champ, autant d’arbres que d’intervalles.")}
          ${practice(["Calcule le tour d’une table ronde de 1,2 m de diamètre.", "On plante un arbre tous les 5 m le long d’une allée de 50 m. Combien d’arbres ?"])}`,
      },
    ],
  },
  {
    title: "Capacités, masses et angles",
    strand: MES,
    summary: "Le litre et le gramme, leurs multiples et sous-multiples ; masse nette, masse brute, tare ; le degré.",
    lessons: [
      {
        title: "Capacités et masses",
        body: `${bullets([
            "1 L = 10 dL = 100 cL = 1 000 mL ; 1 hL = 100 L.",
            "1 kg = 1 000 g ; 1 q = 100 kg ; 1 t = 1 000 kg.",
            "Masse brute = masse nette + tare.",
          ])}
          ${keyPoint("On mesure les angles en degrés avec le rapporteur : l’angle droit mesure 90°.")}
          ${practice(["Convertis : 3,5 L = … cL ; 2,5 kg = … g.", "Une boîte pleine pèse 1,2 kg, la boîte vide 200 g. Quelle est la masse nette ?"])}`,
      },
    ],
  },
  {
    title: "Les aires",
    strand: MES,
    summary: "Le mètre carré, ses multiples et sous-multiples ; aires du carré, du rectangle, du triangle, du parallélogramme et du disque.",
    lessons: [
      {
        title: "Unités d’aire et aires des figures",
        body: `${tableau([
            ["Figure", "Aire"],
            ["carré", "côté × côté"],
            ["rectangle", "longueur × largeur"],
            ["triangle", "base × hauteur ÷ 2"],
            ["parallélogramme", "base × hauteur"],
            ["disque", "rayon × rayon × 3,14"],
          ])}
          ${keyPoint("1 m² = 100 dm² = 10 000 cm². Chaque unité d’aire vaut 100 fois la suivante.")}
          ${practice(["Calcule l’aire d’un triangle de base 8 cm et de hauteur 5 cm.", "Calcule l’aire d’un jardin rectangulaire de 15 m sur 12 m."])}`,
      },
    ],
  },
  {
    title: "Les volumes",
    strand: MES,
    summary: "Mesures de volume ; volume, masse et capacité ; masse volumique.",
    lessons: [
      {
        title: "Volume, capacité et masse",
        body: `${bullets([
            "1 m³ = 1 000 dm³ ; 1 dm³ = 1 000 cm³.",
            "1 dm³ = 1 L ; 1 litre d’eau pèse 1 kg.",
            "La <strong>masse volumique</strong> est la masse d’un dm³ (ou d’un m³) d’une matière : 1 kg/dm³ pour l’eau.",
          ])}
          ${keyPoint("Volume d’un pavé droit = longueur × largeur × hauteur.")}
          ${practice(["Combien de litres contient un aquarium de 50 cm × 30 cm × 20 cm ?"])}`,
      },
    ],
  },
  {
    title: "Durées et mouvements uniformes",
    strand: MES,
    summary: "Unités de durée, addition et soustraction de durées ; distance, vitesse et durée.",
    lessons: [
      {
        title: "Calculer avec les durées",
        body: `${bullets(["1 h = 60 min ; 1 min = 60 s ; 1 jour = 24 h.", "J’additionne les heures et les minutes séparément ; 60 min font 1 h."])}
          <p>Exemple : 2 h 45 min + 1 h 30 min = 3 h 75 min = 4 h 15 min.</p>
          ${keyPoint("Pour une durée : heure d’arrivée − heure de départ.")}
          ${practice(["Le car part à 6 h 50 et arrive à 9 h 20. Combien de temps a duré le voyage ?"])}`,
      },
      {
        title: "Vitesse, distance et durée",
        body: `${bullets(["Distance = vitesse × durée.", "Vitesse = distance ÷ durée.", "Durée = distance ÷ vitesse."])}
          ${keyPoint("Un mouvement est uniforme quand la vitesse ne change pas.")}
          ${practice(["Un vélo roule à 15 km/h pendant 2 h. Quelle distance parcourt-il ?"])}`,
      },
    ],
  },
  {
    title: "Budget, prix et partages",
    strand: MES,
    summary: "Budget familial ; prix d’achat, frais, prix de revient, prix de vente ; parts égales et inégales.",
    lessons: [
      {
        title: "Budget et prix",
        body: `${bullets([
            "Budget : recettes − dépenses = économie (ou déficit si les dépenses sont plus grandes).",
            "Prix de revient = prix d’achat + frais ; bénéfice = prix de vente − prix de revient.",
          ])}
          ${keyPoint("Un bon budget prévoit les dépenses importantes : nourriture, loyer, école, santé.")}
          ${practice(["Une famille gagne 150 000 F et dépense 132 500 F. Combien économise-t-elle ?"])}`,
      },
      {
        title: "Parts égales et parts inégales",
        body: `${bullets([
            "Parts égales : total ÷ nombre de parts.",
            "Parts inégales (somme et différence connues) : j’enlève la différence, je partage en parts égales, puis j’ajoute la différence à la plus grande part.",
          ])}
          <p>Exemple : 2 000 F partagés entre deux frères, l’aîné ayant 400 F de plus : (2 000 − 400) ÷ 2 = 800 F pour le cadet, 1 200 F pour l’aîné.</p>
          ${keyPoint("Un schéma avec des segments aide beaucoup.")}
          ${practice(["Partage 5 000 F entre Awa et Fatou ; Awa reçoit 1 000 F de plus."])}`,
      },
    ],
  },
  // ── Résolution de problèmes ───────────────────────────────────────────────
  {
    title: "Comprendre l’énoncé d’un problème",
    strand: PB,
    summary: "Données utiles, inutiles et manquantes ; consignes, questions, question finale et questions intermédiaires.",
    lessons: [
      {
        title: "Lire et organiser l’énoncé",
        body: `${bullets([
            "Je lis l’énoncé deux fois et je le redis avec mes mots.",
            "Je souligne les données utiles, je barre les inutiles, je cherche s’il en manque.",
            "Je repère la consigne et la question finale, puis les questions intermédiaires.",
          ])}
          ${keyPoint("Chaque calcul répond à une question ; chaque réponse est une phrase avec l’unité.")}
          ${practice(["« Un commerçant achète 12 sacs de sucre à 25 000 F. Il paie 6 000 F de transport. Quel est son prix de revient ? » Trouve la question intermédiaire."])}`,
      },
    ],
  },
  {
    title: "Tableaux, schémas et graphiques",
    strand: PB,
    summary: "Lire et construire des tableaux, des schémas et des graphiques ; lire une facture.",
    lessons: [
      {
        title: "Utiliser tableaux et graphiques",
        body: `${bullets([
            "Un <strong>tableau</strong> range les données en lignes et en colonnes.",
            "Une <strong>facture</strong> indique la quantité, le prix unitaire, le montant et le total.",
            "Un <strong>graphique</strong> (diagramme en bâtons, courbe) montre des comparaisons ou une évolution.",
          ])}
          ${keyPoint("Je lis toujours le titre, les unités et la graduation avant d’utiliser un graphique.")}
          ${practice(["Fais un diagramme en bâtons des notes de 5 camarades."])}`,
      },
    ],
  },
  {
    title: "Démarches de résolution",
    strand: PB,
    summary: "Énoncé à partir d’une résolution, recherche d’erreur, démarche progressive et démarche régressive.",
    lessons: [
      {
        title: "Résoudre et vérifier",
        body: `${bullets([
            "<strong>Démarche progressive</strong> : je pars des données vers la question.",
            "<strong>Démarche régressive</strong> : je pars du résultat et je fais les opérations inverses.",
            "Je peux inventer un énoncé à partir d’un calcul, et chercher l’erreur dans une solution.",
          ])}
          <p>Démarche régressive : « Après avoir dépensé 1 250 F, il me reste 750 F. » J’avais 750 + 1 250 = 2 000 F.</p>
          ${keyPoint("Je vérifie que mon résultat est vraisemblable.")}
          ${practice(["Invente un énoncé pour : 4 × 1 500 = 6 000."])}`,
      },
    ],
  },
];
