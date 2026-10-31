import "server-only";

// 6e : questions illustrées ajoutées aux séries d'exercices, avec les schémas des leçons. Elles se
// lisent sur le schéma et complètent les questions de 6e/exercises.ts sans les répéter.

import { ask, howMany, schemaFig, tf, type SubjectExtras } from "../illustrated-questions";

const ENCADRER = schemaFig("m6-encadrer", "Droite graduée de 3,3 à 3,6 en centièmes, avec le point 3,47.");
const RELATIFS = schemaFig("m6-relatifs", "Droite graduée de −5 à 5 avec le point A d’abscisse −3 et le point A′ d’abscisse 3.");
const REPERE = schemaFig("m6-repere", "Repère orthonormal avec les points A(3 ; 2), B, C et D.");
const DROITES = schemaFig("m6-droites", "Une droite (AB), un segment [CD] et une demi-droite [EF).");
const CERCLE = schemaFig("m6-cercle", "Cercle de centre O avec le rayon [OA], le diamètre [BC] et la corde [DE].");
const PERP = schemaFig("m6-perp-para", "Deux droites perpendiculaires (d) et (d′) ; deux droites parallèles (d₁) et (d₂) coupées par une droite (Δ).");
const SYMETRIE = schemaFig("m6-symetrie", "Triangle ABC et son symétrique A′B′C′ par rapport à la droite (d).");
const ANGLES = schemaFig("m6-angles", "Quatre angles : 50°, 90°, 130° et 180°.");
const TRIANGLES = schemaFig("m6-triangles", "Un triangle isocèle, un triangle équilatéral et un triangle rectangle avec leurs codages.");
const QUADRI = schemaFig("m6-quadrilateres", "Un rectangle, un losange et un carré avec leurs diagonales.");
const AIRES = schemaFig("m6-aires", "Un rectangle, un triangle avec sa base et sa hauteur, un disque avec son rayon.");
const PAVE = schemaFig("m6-pave-cylindre", "Un pavé droit en perspective et un cylindre.");
const SPHERE = schemaFig("m6-sphere", "Une sphère de centre O et de rayon R avec un grand cercle.");
const GLOBE = schemaFig("m6-lat-long", "Globe avec l’équateur, le méridien de Greenwich, le parallèle 30° N et un point M.");
const PERIODES = schemaFig("h6-periodes", "Frise des grandes périodes de l’histoire, de −4000 à nos jours.");
const ROSE = schemaFig("g6-rose-echelle", "Rose des vents et échelle graphique : 1 cm représente 10 km.");
const ARACHIDE = schemaFig("g6-bassin-arachidier", "Carte du Sénégal : le Bassin arachidier en couleur, avec Kaolack, Kaffrine, Diourbel et Touba.");
const DAKAR = schemaFig("g6-dakar-littoral", "Carte du Sénégal : la région de Dakar en couleur.");
const FERLO = schemaFig("g6-ferlo", "Carte du Sénégal : le Ferlo en couleur, avec Linguère.");
const VALLEE = schemaFig("g6-vallee", "Carte du Sénégal : les régions de la vallée du fleuve en couleur, de Bakel à Saint-Louis.");
const WALO = schemaFig("g6-walo-dieri", "Coupe de la vallée du fleuve Sénégal : le fleuve, le walo et le diéri.");
const CASAMANCE = schemaFig("g6-casamance", "Carte du Sénégal : la Casamance en couleur, avec Ziguinchor, Sédhiou et Kolda.");
const SUD_EST = schemaFig("g6-sud-est", "Carte du Sénégal : le Sud-Est en couleur, avec Tambacounda, Kédougou et Bakel.");
const CLE = schemaFig("s6-cle", "Clé de détermination des vertébrés : poils, plumes, nageoires, peau nue.");
const CHAINE = schemaFig("s6-chaine", "Chaîne alimentaire : herbe, criquet, lézard, serpent, aigle.");
const PLANTE = schemaFig("s6-besoins-plante", "Plante verte avec ses racines dans le sol et ses feuilles au soleil.");
const AMIDON = schemaFig("s6-amidon", "Feuille à moitié cachée, puis testée à l’eau iodée.");

export const EXTRA_6E: SubjectExtras = {
  MATH: {
    "Rangement des nombres décimaux": [
      ask("Sur la droite graduée, de quelle graduation au dixième le point 3,47 est-il le plus proche ?", ["*3,5", "3,4", "3,6"], "3,47 est à 3 centièmes de 3,5 et à 7 centièmes de 3,4 : son arrondi au dixième est 3,5.", ENCADRER),
    ],
    "Nombres décimaux relatifs": [
      ask("Sur la droite graduée, A a pour abscisse −3 et A′ pour abscisse 3. On dit que −3 et 3 sont…", ["*opposés", "égaux", "inverses"], "ils sont à la même distance de zéro, de part et d’autre.", RELATIFS),
      howMany("Quelle est la distance entre A et A′ sur la droite graduée ?", 6, "De −3 à 0, puis de 0 à 3 : 3 + 3 = 6.", RELATIFS),
    ],
    "Repérage sur une droite et dans le plan": [
      ask("Lis les coordonnées du point B dans le repère.", ["*(−2 ; 1)", "(1 ; −2)", "(2 ; 1)"], "on recule de 2 sur l’axe des abscisses, puis on monte de 1.", REPERE),
      ask("Quel point du repère a pour coordonnées (1 ; −1) ?", ["*D", "B", "C"], "on avance de 1, puis on descend de 1.", REPERE),
    ],
    "Introduction à la géométrie": [
      ask("Sur la figure, laquelle est illimitée des deux côtés ?", ["*la droite (AB)", "le segment [CD]", "la demi-droite [EF)"], "le segment s’arrête à ses deux extrémités, la demi-droite à son origine E.", DROITES),
    ],
    "Le cercle": [
      howMany("Sur la figure, le rayon [OA] mesure 2,5 cm. Combien mesure le diamètre [BC], en cm ?", 5, "Le diamètre vaut deux rayons : 2 × 2,5 = 5 cm.", CERCLE),
      ask("Sur la figure, [DE] joint deux points du cercle sans passer par le centre : c’est…", ["*une corde", "un rayon", "un diamètre"], "un diamètre est une corde qui passe par le centre.", CERCLE),
    ],
    "Droites perpendiculaires et droites parallèles": [
      tf("Sur la figure de droite, (Δ) est perpendiculaire à (d₁) ; elle est donc aussi perpendiculaire à (d₂).", true, "si deux droites sont parallèles, toute perpendiculaire à l’une est perpendiculaire à l’autre.", PERP),
      ask("Le petit carré dessiné entre (d) et (d′) indique…", ["*un angle droit", "un angle aigu", "deux longueurs égales"], "c’est le codage de l’angle droit.", PERP),
    ],
    "Symétrie orthogonale": [
      ask("A′ est le symétrique de A par rapport à (d). Pour le segment [AA′], la droite (d) est…", ["*sa médiatrice", "une parallèle", "un côté du triangle"], "(d) est perpendiculaire à [AA′] en son milieu.", SYMETRIE),
      tf("Le triangle A′B′C′ a les mêmes longueurs et les mêmes angles que ABC.", true, "la symétrie orthogonale conserve les longueurs et les angles.", SYMETRIE),
    ],
    Angles: [
      ask("Sur la figure, l’angle de 130° est…", ["*obtus", "aigu", "plat"], "il est compris entre 90° et 180°.", ANGLES),
      howMany("Combien de degrés manque-t-il à l’angle de 130° pour faire un angle plat ?", 50, "180° − 130° = 50°.", ANGLES),
    ],
    Polygones: [
      ask("Sur les triangles, les petits traits de codage indiquent…", ["*des côtés de même longueur", "des angles droits", "des côtés parallèles"], "le triangle isocèle a deux côtés codés, l’équilatéral trois.", TRIANGLES),
      ask("Quel quadrilatère a des diagonales à la fois perpendiculaires et de même longueur ?", ["*le carré", "le rectangle", "le losange"], "le carré est à la fois un rectangle (diagonales de même longueur) et un losange (diagonales perpendiculaires).", QUADRI),
    ],
    Aires: [
      howMany("Un triangle a une base de 8 cm et une hauteur de 5 cm, comme sur la figure. Quelle est son aire, en cm² ?", 20, "Aire = base × hauteur ÷ 2 = 8 × 5 ÷ 2 = 20 cm².", AIRES),
      tf("La hauteur du triangle est perpendiculaire à sa base.", true, "sur la figure, elle forme un angle droit avec la base.", AIRES),
    ],
    "Géométrie dans l’espace": [
      howMany("Le pavé droit de la figure mesure L = 5 cm, l = 3 cm et h = 2 cm. Quel est son volume, en cm³ ?", 30, "V = L × l × h = 5 × 3 × 2 = 30 cm³.", PAVE),
      ask("Sur le dessin du pavé, les arêtes en pointillés sont…", ["*les arêtes cachées", "les arêtes les plus longues", "les diagonales des faces"], "en perspective, on dessine en pointillés ce qu’on ne voit pas.", PAVE),
      tf("Tous les points de la sphère sont à la même distance R du centre O.", true, "c’est la définition de la sphère.", SPHERE),
    ],
    "Repérage sur la sphère": [
      ask("Sur le globe, le point M est…", ["*dans l’hémisphère nord, à l’ouest de Greenwich", "dans l’hémisphère sud, à l’est de Greenwich", "sur l’équateur"], "30° N : au nord de l’équateur ; 40° O : à l’ouest du méridien de Greenwich.", GLOBE),
      howMany("Quelle est la latitude de l’équateur, en degrés ?", 0, "L’équateur est le parallèle de latitude 0°.", GLOBE),
    ],
  },
  HG: {
    "Introduction à l’étude de l’histoire": [
      ask("D’après la frise, quel événement marque la fin de la Préhistoire ?", ["*l’invention de l’écriture", "la fin de l’Empire romain", "l’arrivée en Amérique"], "vers 3000 av. J.-C.", PERIODES),
      ask("D’après la frise, l’année 1600 appartient…", ["*aux Temps modernes", "au Moyen Âge", "à l’Antiquité"], "les Temps modernes vont de 1492 à 1789.", PERIODES),
    ],
    "Introduction à la géographie : s’orienter et lire une carte": [
      howMany("Sur cette carte, 1 cm représente 10 km. Deux villes sont à 4,5 cm l’une de l’autre sur la carte. Quelle est la distance réelle, en km ?", 45, "4,5 × 10 = 45 km.", ROSE),
      ask("Sur la rose des vents, quel point cardinal est à l’opposé du nord ?", ["*le sud", "l’est", "l’ouest"], "le nord est en haut, le sud en bas.", ROSE),
    ],
    "Le Bassin arachidier": [
      ask("Parmi ces villes, laquelle se trouve dans le Bassin arachidier (en couleur) ?", ["*Kaolack", "Ziguinchor", "Kédougou"], "Kaolack, sur le Saloum, est la grande ville-marché du Bassin arachidier.", ARACHIDE),
    ],
    "Dakar et le littoral central": [
      ask("La région de Dakar, en couleur sur la carte, est…", ["*la plus petite région du pays", "la plus grande région du pays", "une région sans côte"], "c’est une presqu’île : la plus petite région, mais la plus peuplée.", DAKAR),
    ],
    "Le Ferlo": [
      ask("D’après la carte, le Ferlo se situe…", ["*au nord, entre la vallée du fleuve et le Bassin arachidier", "au sud de la Gambie", "à l’extrême ouest, autour de Dakar"], "c’est une région naturelle aux limites approximatives.", FERLO),
      tf("Le Ferlo est surtout une région d’élevage.", true, "les éleveurs y mènent leurs troupeaux d’un point d’eau à l’autre.", FERLO),
    ],
    "La vallée du fleuve Sénégal": [
      ask("Sur la coupe, quelle partie de la vallée est inondée pendant la crue ?", ["*le walo", "le diéri", "le fleuve seulement"], "le walo, inondé, porte ensuite les cultures de décrue ; le diéri, plus haut, reste sec.", WALO),
      ask("D’après la carte, le fleuve Sénégal forme…", ["*la frontière nord du pays", "la frontière sud du pays", "la côte atlantique"], "il coule de Bakel à Saint-Louis, le long de la frontière avec la Mauritanie.", VALLEE),
    ],
    "La Casamance": [
      ask("D’après la carte, la Casamance se trouve…", ["*au sud de la Gambie", "au nord du fleuve Sénégal", "autour de Dakar"], "elle est séparée du reste du pays par la Gambie.", CASAMANCE),
    ],
    "Le Haut-Sénégal (Sud-Est)": [
      ask("D’après la carte, quelles sont les deux régions du Sud-Est ?", ["*Tambacounda et Kédougou", "Ziguinchor et Kolda", "Louga et Matam"], "elles touchent le Mali et la Guinée.", SUD_EST),
    ],
  },
  SVT: {
    "La classification des êtres vivants": [
      ask("D’après la clé, un animal sans poils mais avec des plumes est…", ["*un oiseau", "un mammifère", "un poisson"], "deuxième question de la clé : des plumes → oiseau.", CLE),
      ask("D’après la clé, un animal sans poils, sans plumes, sans nageoires, à la peau nue et humide est…", ["*un amphibien", "un reptile", "un mammifère"], "comme la grenouille.", CLE),
    ],
    "Les relations entre les êtres vivants dans l’environnement": [
      ask("Dans cette chaîne alimentaire, par qui le criquet est-il mangé ?", ["*par le lézard", "par l’aigle", "par l’herbe"], "la flèche va du criquet vers le lézard.", CHAINE),
      ask("Quel est le producteur de cette chaîne alimentaire ?", ["*l’herbe", "le criquet", "l’aigle"], "le premier maillon est toujours une plante verte.", CHAINE),
    ],
    "La production d’aliments par les végétaux chlorophylliens": [
      ask("Par où la plante prend-elle l’eau et les sels minéraux ?", ["*par les racines", "par les feuilles", "par les fleurs"], "les racines puisent dans le sol ; les feuilles prennent le dioxyde de carbone et la lumière.", PLANTE),
      ask("Après le test à l’eau iodée, quelle partie de la feuille devient bleu-noir ?", ["*la partie éclairée", "la partie cachée", "toute la feuille"], "seule la partie éclairée a fabriqué de l’amidon : la photosynthèse a besoin de lumière.", AMIDON),
    ],
  },
};
