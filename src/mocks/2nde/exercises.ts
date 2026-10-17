import "server-only";

// Exercices corrigés de 2nde : une série par chapitre et par série (S, L). Les questions sont rangées
// par matière et par titre de chapitre ; un chapitre commun aux deux séries reçoit la même série. Écrits
// par DIANGAL d’après les leçons, à faire relire par des enseignants. Corrigés inclus : ce fichier ne
// doit jamais atteindre le navigateur.

import type { SubjectCode } from "@/types/domain";
import { CHAPTERS_2NDE } from "../curriculum-2nde";
import { buildExerciseSeries, type ExerciseSeries, type ExerciseSpec } from "../exercise-series";

const BANK: Partial<Record<SubjectCode, Record<string, ExerciseSpec[]>>> = {
  MATH: {
    "Le calcul dans IR": [
      { qcm: "√50 =", choices: ["25√2", "*5√2", "10√5"], why: "√50 = √(25 × 2) = 5√2." },
      { qcm: "1/√2 =", choices: ["*√2/2", "2√2", "√2"], why: "On multiplie numérateur et dénominateur par √2." },
      { qcm: "|x − 2| ≤ 3 équivaut à…", choices: ["*−1 ≤ x ≤ 5", "x ≤ 5", "−3 ≤ x ≤ 3"], why: "x est à une distance au plus 3 de 2." },
    ],
    "Intervalles et calcul approché": [
      { num: "Quel est le centre de l’intervalle [2 ; 8] ?", answer: 5, why: "(2 + 8) ÷ 2 = 5." },
      { num: "Quel est le rayon de l’intervalle [2 ; 8] ?", answer: 3, why: "(8 − 2) ÷ 2 = 3." },
      { num: "Quelle est la partie entière de −2,3 ?", answer: -3, why: "Plus grand entier inférieur ou égal à −2,3." },
    ],
    "Généralités sur les fonctions": [
      { qcm: "L’ensemble de définition de f(x) = 1/(x − 2) est…", choices: ["IR", "*IR privé de 2", "[2 ; +∞["], why: "Le dénominateur ne doit pas s’annuler." },
      { qcm: "Une fonction paire vérifie…", choices: ["*f(−x) = f(x)", "f(−x) = −f(x)", "f(0) = 1"], why: "Sa courbe est symétrique par rapport à l’axe des ordonnées." },
      { qcm: "La fonction x ↦ x³ est…", choices: ["paire", "*impaire", "ni paire ni impaire"], why: "(−x)³ = −x³." },
    ],
    "Fonctions de référence": [
      { qcm: "La fonction carré est décroissante sur…", choices: ["*]−∞ ; 0]", "[0 ; +∞[", "IR"], why: "Puis croissante sur [0 ; +∞[." },
      { qcm: "Le sommet de la parabole de x ↦ (x − 1)² + 3 est…", choices: ["(−1 ; 3)", "*(1 ; 3)", "(3 ; 1)"], why: "Sommet (α ; β)." },
      { qcm: "Les asymptotes de la courbe de x ↦ 1/x sont…", choices: ["*les deux axes", "la droite y = x", "aucune"], why: "Hyperbole." },
    ],
    "Équations et inéquations du second degré": [
      { num: "Calcule le discriminant de x² − 5x + 6.", answer: 1, why: "25 − 24 = 1." },
      { qcm: "Les racines de x² − 7x + 12 sont…", choices: ["*3 et 4", "2 et 6", "−3 et −4"], why: "Somme 7, produit 12." },
      { qcm: "x² − 5x + 6 &lt; 0 pour x dans…", choices: ["*]2 ; 3[", "]−∞ ; 2[", "]3 ; +∞["], why: "Signe contraire de a entre les racines." },
    ],
    "Systèmes d’équations et d’inéquations à deux inconnues": [
      { num: "Résous x + y = 10 et x − y = 2. Que vaut x ?", answer: 6, why: "2x = 12." },
      { num: "Même système : que vaut y ?", answer: 4, why: "y = 10 − 6." },
      { qcm: "Le point (0 ; 0) vérifie-t-il x + y − 3 &lt; 0 ?", choices: ["*oui", "non", "on ne peut pas savoir"], why: "0 + 0 − 3 = −3 &lt; 0." },
    ],
    "Polynômes et fractions rationnelles": [
      { qcm: "x³ − 1 se factorise en…", choices: ["(x − 1)³", "*(x − 1)(x² + x + 1)", "(x + 1)(x² − x + 1)"], why: "1 est une racine." },
      { num: "P(x) = x² − 3x + 2. Calcule P(1).", answer: 0, why: "1 − 3 + 2 = 0 : 1 est un zéro." },
      { qcm: "(x² − 1)/(x − 1) se simplifie en…", choices: ["*x + 1 pour x ≠ 1", "x − 1", "1"], why: "x² − 1 = (x − 1)(x + 1)." },
    ],
    "Statistique : variance et écart-type": [
      { num: "Moyenne de la série 2 ; 4 ; 6 ?", answer: 4, why: "12 ÷ 3." },
      { num: "Variance de la série 2 ; 4 ; 6 (arrondie au centième) ?", answer: 2.67, why: "56/3 − 16 = 8/3." },
      { qcm: "L’écart-type est…", choices: ["*la racine carrée de la variance", "le carré de la variance", "la moyenne des valeurs"], why: "σ = √V." },
    ],
    "Calcul vectoriel et barycentre": [
      { qcm: "AB⃗ + BC⃗ =", choices: ["*AC⃗", "CA⃗", "BA⃗"], why: "Relation de Chasles." },
      { qcm: "G barycentre de (A, 1) et (B, 3) : AG⃗ =", choices: ["1/4 AB⃗", "*3/4 AB⃗", "3 AB⃗"], why: "b/(a + b) = 3/4." },
      { qcm: "L’isobarycentre de A et B est…", choices: ["*le milieu de [AB]", "A", "B"], why: "Coefficients égaux." },
    ],
    "Repérage cartésien": [
      { num: "Déterminant de u⃗(2 ; 3) et v⃗(4 ; 6) ?", answer: 0, why: "2 × 6 − 4 × 3 = 0 : vecteurs colinéaires." },
      { qcm: "Un vecteur directeur de 3x − 2y + 1 = 0 est…", choices: ["*(2 ; 3)", "(3 ; −2)", "(1 ; 3)"], why: "(−b ; a) = (2 ; 3)." },
      { num: "Coefficient directeur de y = −2x + 5 ?", answer: -2, why: "y = mx + p." },
    ],
    "Angles orientés et trigonométrie": [
      { num: "Combien de degrés vaut π/3 radian ?", answer: 60, why: "π rad = 180°." },
      { qcm: "cos(π/3) =", choices: ["*1/2", "√3/2", "√2/2"], why: "Valeur remarquable." },
      { qcm: "sin(π − x) =", choices: ["*sin x", "−sin x", "cos x"], why: "Angles supplémentaires." },
    ],
    "Produit scalaire": [
      { num: "Produit scalaire de u⃗(2 ; 3) et v⃗(3 ; −2) ?", answer: 0, why: "6 − 6 = 0 : vecteurs orthogonaux." },
      { qcm: "Le cercle de centre (1 ; 2) et de rayon 3 a pour équation…", choices: ["*(x − 1)² + (y − 2)² = 9", "(x + 1)² + (y + 2)² = 3", "x² + y² = 9"], why: "(x − a)² + (y − b)² = r²." },
      { num: "Distance de O(0 ; 0) à la droite 3x + 4y − 10 = 0 ?", answer: 2, why: "|−10| ÷ 5 = 2." },
    ],
    "Les transformations du plan": [
      { qcm: "Une homothétie de rapport 3 multiplie les aires par…", choices: ["3", "6", "*9"], why: "k² = 9." },
      { qcm: "La composée de deux symétries centrales est…", choices: ["*une translation", "une rotation", "une homothétie de rapport 2"], why: "De vecteur 2 OO’." },
      { qcm: "La composée de deux homothéties de même centre, de rapports 2 et 3, est…", choices: ["*une homothétie de rapport 6", "une homothétie de rapport 5", "une translation"], why: "Rapport kk’." },
    ],
    "Géométrie dans l’espace": [
      { qcm: "Deux droites de l’espace qui ne sont ni sécantes ni parallèles sont…", choices: ["*non coplanaires", "perpendiculaires", "confondues"], why: "Elles ne sont pas dans un même plan." },
      { qcm: "Une droite orthogonale à deux droites sécantes d’un plan est…", choices: ["*orthogonale au plan", "parallèle au plan", "contenue dans le plan"], why: "Critère d’orthogonalité." },
      { vf: "En perspective cavalière, deux droites parallèles sont dessinées parallèles.", answer: true, why: "Règle de la perspective cavalière." },
    ],
    "Calcul algébrique dans IR": [
      { qcm: "4x² − 9 =", choices: ["*(2x − 3)(2x + 3)", "(4x − 3)²", "(2x − 9)(2x + 1)"], why: "a² − b²." },
      { qcm: "|x| ≤ 4 équivaut à…", choices: ["*−4 ≤ x ≤ 4", "x ≤ 4", "x ≥ −4"], why: "Distance à 0 au plus 4." },
      { num: "Taxi : 500 F + 200 F par km. Combien de km au plus avec 2 500 F ?", answer: 10, why: "500 + 200x ≤ 2 500." },
    ],
    "Situations de proportionnalité": [
      { num: "Un prix de 15 000 F augmente de 20 %. Nouveau prix (F) ?", answer: 18000, why: "15 000 × 1,2." },
      { num: "Sur une carte au 1/100 000, combien de km représentent 5 cm ?", answer: 5, why: "500 000 cm = 5 km." },
      { num: "À 60 km/h, quelle distance (km) parcourt-on en 2 h 30 ?", answer: 150, why: "60 × 2,5." },
    ],
    "Fonctions affines et droites du plan": [
      { num: "Coefficient directeur de la droite (AB), A(1 ; 3), B(3 ; 7) ?", answer: 2, why: "(7 − 3) ÷ (3 − 1)." },
      { qcm: "Deux droites parallèles ont…", choices: ["*le même coefficient directeur", "la même ordonnée à l’origine", "des coefficients opposés"], why: "Même direction." },
      { num: "f(x) = 2x + 1. Calcule f(4).", answer: 9, why: "8 + 1." },
    ],
    "Lectures graphiques": [
      { num: "22 °C à 8 h et 28 °C à 12 h : température estimée à 10 h (°C) ?", answer: 25, why: "Interpolation linéaire : valeur du milieu." },
      { qcm: "Avant de lire un graphique, on regarde d’abord…", choices: ["*le titre, les axes et les unités", "seulement les couleurs", "le maximum"], why: "Méthode." },
      { qcm: "Interpoler, c’est…", choices: ["*estimer une valeur entre deux valeurs connues", "prolonger la courbe au-delà des données", "tracer un diagramme circulaire"], why: "Définition." },
    ],
    "Statistique : position et dispersion": [
      { num: "Médiane de 6 ; 9 ; 10 ; 12 ; 18 ?", answer: 10, why: "Valeur du milieu." },
      { num: "Étendue de 6 ; 9 ; 10 ; 12 ; 18 ?", answer: 12, why: "18 − 6." },
      { num: "Moyenne de 6 ; 9 ; 10 ; 12 ; 18 ?", answer: 11, why: "55 ÷ 5." },
    ],
    "Tracé de courbes": [
      { num: "Valeur de x³ pour x = −2 ?", answer: -8, why: "(−2)³ = −8." },
      { qcm: "La courbe de x ↦ x² est symétrique par rapport…", choices: ["*à l’axe des ordonnées", "à l’origine", "à l’axe des abscisses"], why: "Fonction paire." },
      { qcm: "Pour tracer une courbe point par point, on commence par…", choices: ["*un tableau de valeurs", "relier des segments", "dessiner les asymptotes"], why: "Méthode." },
    ],
  },
  PC: {
    "Mélanges et corps purs": [
      { qcm: "Le dioxygène O₂ est un corps pur…", choices: ["*simple", "composé", "mélangé"], why: "Un seul élément." },
      { qcm: "L’eau est un corps pur composé car…", choices: ["*elle contient deux éléments (H et O)", "elle est liquide", "elle est transparente"], why: "L’électrolyse la décompose." },
      { qcm: "Pour séparer deux liquides miscibles, on utilise…", choices: ["la filtration", "*la distillation", "la décantation"], why: "Températures d’ébullition différentes." },
    ],
    "Atomes, éléments et classification périodique": [
      { num: "Combien de neutrons contient le noyau ¹²₆C ?", answer: 6, why: "N = A − Z = 12 − 6." },
      { qcm: "La structure électronique du sodium (Z = 11) est…", choices: ["K² L⁹", "*K² L⁸ M¹", "K¹ L⁸ M²"], why: "K: 2, L: 8, M: 1." },
      { qcm: "Les gaz nobles sont dans la colonne…", choices: ["1", "17", "*18"], why: "Couche externe saturée." },
    ],
    "Les liaisons chimiques": [
      { qcm: "Dans la molécule d’eau, les liaisons sont…", choices: ["*covalentes", "ioniques", "métalliques"], why: "Mise en commun de doublets." },
      { qcm: "L’atome de chlore devient l’ion…", choices: ["Cl⁺", "*Cl⁻", "Cl²⁻"], why: "Il gagne un électron (règle de l’octet)." },
      { qcm: "Le sel de cuisine NaCl est un composé…", choices: ["*ionique", "covalent", "moléculaire gazeux"], why: "Ions Na⁺ et Cl⁻." },
    ],
    "La mole et les grandeurs molaires": [
      { num: "Masse molaire de CO₂ (g/mol) ? (C = 12, O = 16)", answer: 44, why: "12 + 32." },
      { num: "Combien de moles dans 11 g de CO₂ ?", answer: 0.25, why: "11 ÷ 44." },
      { num: "Volume (L) de 0,25 mol de gaz à 0 °C sous 1 atm ?", answer: 5.6, why: "0,25 × 22,4." },
    ],
    "Réaction chimique et équation-bilan": [
      { num: "CH₄ + … O₂ → CO₂ + 2 H₂O : quel coefficient devant O₂ ?", answer: 2, why: "4 atomes O à droite." },
      { num: "Combustion de 2 mol de CH₄ : moles de O₂ consommées ?", answer: 4, why: "Proportionnalité aux coefficients." },
      { qcm: "Le réactif limitant est…", choices: ["*entièrement consommé", "en excès", "un produit"], why: "Il limite l’avancement." },
    ],
    "Solutions aqueuses acides et basiques ; pH": [
      { qcm: "Une solution de pH 3 est…", choices: ["*acide", "neutre", "basique"], why: "pH &lt; 7." },
      { num: "Concentration (mol/L) de 0,1 mol de NaCl dans 0,5 L ?", answer: 0.2, why: "C = n ÷ V." },
      { qcm: "En diluant une solution acide, son pH…", choices: ["*augmente vers 7", "diminue", "reste égal"], why: "Elle devient moins acide." },
    ],
    "Caractérisation de quelques ions": [
      { qcm: "Les ions Cu²⁺ donnent avec la soude un précipité…", choices: ["*bleu", "vert", "rouille"], why: "Hydroxyde de cuivre II." },
      { qcm: "Les ions chlorure sont mis en évidence par…", choices: ["*le nitrate d’argent", "la soude", "le chlorure de baryum"], why: "Précipité blanc qui noircit." },
      { qcm: "Un précipité rouille avec la soude révèle…", choices: ["Fe²⁺", "*Fe³⁺", "Zn²⁺"], why: "Hydroxyde de fer III." },
    ],
    "Mouvement et vitesse": [
      { num: "Vitesse (km/h) d’un car qui parcourt 180 km en 3 h ?", answer: 60, why: "180 ÷ 3." },
      { num: "Combien de km/h font 10 m/s ?", answer: 36, why: "× 3,6." },
      { qcm: "Un passager assis dans un car en marche est immobile par rapport…", choices: ["*au car", "à la route", "aux arbres"], why: "Le mouvement dépend du référentiel." },
    ],
    "Forces, poids et masse": [
      { num: "Poids (N) d’un élève de 50 kg, g = 9,8 N/kg ?", answer: 490, why: "50 × 9,8." },
      { qcm: "L’intensité d’une force se mesure en…", choices: ["kilogrammes", "*newtons", "joules"], why: "Unité N." },
      { qcm: "Le poids est une force…", choices: ["*à distance", "de contact", "de frottement"], why: "Attraction de la Terre." },
    ],
    "Équilibre d’un solide soumis à des forces": [
      { qcm: "Trois forces non parallèles qui maintiennent un solide en équilibre sont…", choices: ["*coplanaires et concourantes", "parallèles", "de même intensité"], why: "Condition d’équilibre." },
      { qcm: "Un lustre de poids 20 N est suspendu à un fil. La tension du fil vaut…", choices: ["*20 N", "10 N", "40 N"], why: "T = P." },
      { vf: "À l’équilibre, la somme vectorielle des forces est nulle.", answer: true, why: "Première condition d’équilibre." },
    ],
    "Équilibre d’un solide mobile autour d’un axe fixe": [
      { num: "Moment (N·m) d’une force de 50 N avec un bras de levier de 0,4 m ?", answer: 20, why: "50 × 0,4." },
      { num: "300 N à 2 m de l’axe sont équilibrés par une force à 1,5 m. Son intensité (N) ?", answer: 400, why: "600 ÷ 1,5." },
      { qcm: "Une force dont la droite d’action passe par l’axe a un moment…", choices: ["*nul", "maximal", "négatif"], why: "Bras de levier nul." },
    ],
    "Électrisation et courant électrique": [
      { qcm: "Deux corps chargés de même signe…", choices: ["s’attirent", "*se repoussent", "restent neutres"], why: "Interaction électrique." },
      { qcm: "Dans un métal, le courant est dû au déplacement…", choices: ["*des électrons", "des protons", "des ions"], why: "Électrons libres." },
      { qcm: "La charge élémentaire vaut…", choices: ["*1,6 × 10⁻¹⁹ C", "9,8 C", "6,02 × 10²³ C"], why: "Charge de l’électron en valeur absolue." },
    ],
    "Le circuit électrique : intensité et tension": [
      { qcm: "Un ampèremètre se branche…", choices: ["*en série", "en dérivation", "aux bornes du générateur seulement"], why: "Il mesure l’intensité qui le traverse." },
      { qcm: "Un voltmètre se branche…", choices: ["en série", "*en dérivation", "n’importe comment"], why: "Il mesure une tension entre deux points." },
      { num: "Deux branches en dérivation : 0,3 A et 0,2 A. Intensité principale (A) ?", answer: 0.5, why: "Loi des nœuds." },
    ],
    "Dipôles passifs et dipôles actifs": [
      { num: "R₁ = 100 Ω et R₂ = 200 Ω en série : résistance équivalente (Ω) ?", answer: 300, why: "R₁ + R₂." },
      { num: "Intensité (A) sous 6 V dans 300 Ω ?", answer: 0.02, why: "I = U ÷ R." },
      { qcm: "Pour un générateur de f.é.m. E et de résistance interne r…", choices: ["*U = E − rI", "U = E + rI", "U = rI"], why: "Chute de tension interne." },
    ],
    "L’amplificateur opérationnel": [
      { num: "Inverseur : R₁ = 1 kΩ, R₂ = 10 kΩ, Ue = 0,5 V. Us (V) ?", answer: -5, why: "−(R₂/R₁) Ue." },
      { qcm: "Le montage suiveur donne…", choices: ["*Us = Ue", "Us = −Ue", "Us = 0"], why: "Gain 1." },
      { qcm: "Les courants d’entrée d’un amplificateur opérationnel idéal sont…", choices: ["*nuls", "très grands", "égaux à la sortie"], why: "Impédance d’entrée infinie." },
    ],
    "Structure et quantité de matière": [
      { num: "Combien de moles représentent 18 g d’eau (M = 18 g/mol) ?", answer: 1, why: "18 ÷ 18." },
      { qcm: "Un atome est électriquement…", choices: ["*neutre", "positif", "négatif"], why: "Autant d’électrons que de protons." },
      { qcm: "Le noyau contient…", choices: ["*des protons et des neutrons", "des électrons", "des molécules"], why: "Les nucléons." },
    ],
    "Transformations de la matière": [
      { qcm: "La fusion de la glace est une transformation…", choices: ["*physique", "chimique", "nucléaire"], why: "Changement d’état." },
      { qcm: "La rouille du fer est une transformation…", choices: ["physique", "*chimique", "mécanique"], why: "Un nouveau corps apparaît." },
      { vf: "Au cours d’une réaction chimique, la masse se conserve.", answer: true, why: "Les atomes se réarrangent." },
    ],
    "L’électricité dans notre environnement": [
      { num: "Quelle est la fréquence du courant du secteur au Sénégal (Hz) ?", answer: 50, why: "Courant alternatif de fréquence 50 Hz." },
      { qcm: "Le parc de Taïba Ndiaye produit l’électricité grâce…", choices: ["*au vent", "au soleil", "au charbon"], why: "Éoliennes." },
      { qcm: "Qui protège contre les surintensités ?", choices: ["*le disjoncteur", "la lampe", "l’interrupteur seul"], why: "Il coupe le courant." },
    ],
  },
  SVT: {
    "L’écosystème : structure et fonctionnement": [
      { qcm: "Écosystème =", choices: ["*biotope + biocénose", "faune + flore", "sol + climat"], why: "Milieu physique + êtres vivants." },
      { qcm: "Les producteurs d’un écosystème sont…", choices: ["*les végétaux chlorophylliens", "les herbivores", "les décomposeurs"], why: "Photosynthèse." },
      { qcm: "Les décomposeurs…", choices: ["*recyclent la matière organique", "fabriquent de l’oxygène", "chassent les herbivores"], why: "Bactéries et champignons." },
    ],
    "L’évolution des écosystèmes et l’action de l’homme": [
      { qcm: "Une conséquence du surpâturage est…", choices: ["*l’érosion des sols", "l’augmentation des pluies", "le reboisement"], why: "Sol mis à nu." },
      { qcm: "La Grande Muraille verte vise à…", choices: ["*freiner la désertification au Sahel", "protéger la côte", "construire un mur"], why: "Reboisement." },
      { vf: "Le repos biologique en mer aide les poissons à se reproduire.", answer: true, why: "Pêche suspendue temporairement." },
    ],
    "L’eau": [
      { qcm: "Le passage de l’eau liquide à la vapeur dans le cycle de l’eau est…", choices: ["*l’évaporation", "la condensation", "l’infiltration"], why: "Sous l’effet de la chaleur." },
      { qcm: "Le lac de Guiers sert notamment à…", choices: ["*alimenter Dakar en eau potable", "produire du sel", "pêcher des baleines"], why: "Ressource majeure." },
      { qcm: "Le choléra est une maladie liée…", choices: ["*à l’eau souillée", "au soleil", "au bruit"], why: "Transmission féco-orale." },
    ],
    "Les sols": [
      { qcm: "L’humus provient…", choices: ["*de la décomposition de la matière organique", "de la roche mère seule", "de la pluie"], why: "Humification." },
      { qcm: "Les « tannes » sont des sols…", choices: ["*salés", "très fertiles", "volcaniques"], why: "Salinisation." },
      { qcm: "Le complexe argilo-humique…", choices: ["*retient l’eau et les ions minéraux", "rend le sol stérile", "empêche les racines de pousser"], why: "Il stocke les éléments nutritifs." },
    ],
  },
  HG: {
    "L’histoire et les sources de l’histoire africaine": [
      { qcm: "Les gardiens de la tradition orale sont…", choices: ["*les griots", "les archéologues", "les géographes"], why: "Ils transmettent l’histoire." },
      { qcm: "La datation au carbone 14 relève de…", choices: ["*l’archéologie", "la linguistique", "la tradition orale"], why: "Datation des vestiges." },
      { vf: "Pour l’histoire africaine, on croise plusieurs types de sources.", answer: true, why: "Écrits, oral, archéologie, linguistique." },
    ],
    "La préhistoire africaine et sénégalaise": [
      { qcm: "Lucy a été découverte en…", choices: ["*Éthiopie", "Afrique du Sud", "Sénégal"], why: "En 1974." },
      { qcm: "La révolution néolithique apporte…", choices: ["*l’agriculture et l’élevage", "l’écriture", "le fer"], why: "Sédentarisation." },
      { qcm: "Sine Ngayène et Wanar sont des sites…", choices: ["*de cercles mégalithiques", "de pyramides", "de mosquées anciennes"], why: "Patrimoine mondial." },
    ],
    "Les civilisations de l’Afrique ancienne": [
      { qcm: "L’écriture de l’Égypte pharaonique est…", choices: ["*hiéroglyphique", "arabe", "latine"], why: "Signes sacrés." },
      { qcm: "L’historien sénégalais qui a souligné la parenté de l’Égypte avec l’Afrique noire est…", choices: ["*Cheikh Anta Diop", "Senghor", "Birago Diop"], why: "Nations nègres et culture." },
      { qcm: "Axoum se trouve en…", choices: ["*Éthiopie", "Mauritanie", "Égypte"], why: "Royaume chrétien." },
    ],
    "L’Afrique occidentale du VIIe au XVIIe siècle": [
      { qcm: "La capitale du Ghana était…", choices: ["*Koumbi Saleh", "Gao", "Niani"], why: "Ville double." },
      { qcm: "L’université de Sankoré se trouvait à…", choices: ["*Tombouctou", "Gao", "Saint-Louis"], why: "Centre intellectuel." },
      { qcm: "Le Gaabu disparaît en 1867 avec la chute de…", choices: ["*Kansala", "Koumbi Saleh", "Gao"], why: "Capitale du Gaabu." },
    ],
    "Les traites négrières": [
      { qcm: "La traite arabe passait par…", choices: ["*le Sahara, la mer Rouge et l’océan Indien", "l’Atlantique seulement", "le Pacifique"], why: "Routes orientales." },
      { qcm: "La traite atlantique alimentait surtout…", choices: ["*les plantations d’Amérique", "les mines d’Europe", "l’armée ottomane"], why: "Sucre, coton, café." },
      { vf: "La traite a provoqué une saignée démographique en Afrique.", answer: true, why: "Des millions de jeunes déportés." },
    ],
    "L’Afrique du XVIIIe siècle à la veille de l’impérialisme": [
      { num: "En quelle année la révolution torodo renverse-t-elle les Denianké ?", answer: 1776, why: "Au Fouta Toro." },
      { num: "En quelle année El Hadji Omar lance-t-il son jihad ?", answer: 1852, why: "Début de l’empire toucouleur." },
      { qcm: "Tchaka a bâti le royaume…", choices: ["*zoulou", "merina", "ashanti"], why: "Afrique australe." },
    ],
    "L’Europe et l’Amérique de 1776 à 1870": [
      { num: "En quelle année Haïti devient-il indépendant ?", answer: 1804, why: "Première république noire." },
      { qcm: "Le chef de la révolte de Saint-Domingue est…", choices: ["*Toussaint Louverture", "George Washington", "Napoléon"], why: "Il meurt en 1803 ; Dessalines proclame l’indépendance." },
      { num: "En quelle année est adoptée la Déclaration des droits de l’homme et du citoyen ?", answer: 1789, why: "Le 26 août." },
    ],
    "Méthodes : dissertation et commentaire historique": [
      { qcm: "Une dissertation commence par…", choices: ["*l’analyse du sujet", "la conclusion", "une liste de dates"], why: "On comprend avant de rédiger." },
      { qcm: "Dans un commentaire, on présente d’abord…", choices: ["*la nature, l’auteur et la date du document", "son avis", "un résumé de cours"], why: "Présentation." },
      { vf: "La conclusion répond à la problématique.", answer: true, why: "Elle fait le bilan." },
    ],
    "La Terre dans le système solaire": [
      { qcm: "L’alternance du jour et de la nuit est due…", choices: ["*à la rotation de la Terre", "à la révolution", "à la Lune"], why: "24 h." },
      { qcm: "Les saisons s’expliquent par…", choices: ["*l’inclinaison de l’axe de la Terre", "la distance Terre-Lune", "les marées"], why: "Inégal éclairement." },
      { qcm: "La longitude se mesure par rapport…", choices: ["*au méridien de Greenwich", "à l’équateur", "au tropique"], why: "Méridien origine." },
    ],
    "Continents, océans et mers": [
      { qcm: "Le plus grand océan est…", choices: ["*le Pacifique", "l’Atlantique", "l’Indien"], why: "Près de la moitié des mers." },
      { qcm: "Le courant qui longe la côte sénégalaise est…", choices: ["*le courant froid des Canaries", "le Gulf Stream", "le courant de Humboldt"], why: "Courant froid." },
      { qcm: "Les océans couvrent environ … de la Terre.", choices: ["30 %", "50 %", "*71 %"], why: "Planète bleue." },
    ],
    "Les climats de la Terre": [
      { qcm: "L’harmattan est un vent…", choices: ["*sec venu du Sahara", "humide venu de l’océan", "froid venu du pôle"], why: "Saison sèche." },
      { qcm: "Un facteur du climat :", choices: ["*la latitude", "la température", "les précipitations"], why: "Température et pluies sont des éléments." },
      { qcm: "Le climat méditerranéen appartient à la zone…", choices: ["intertropicale", "*tempérée", "polaire"], why: "Étés chauds et secs." },
    ],
    "Les reliefs de la Terre": [
      { qcm: "Les chaînes de montagnes se forment surtout…", choices: ["*à la rencontre des plaques", "au milieu des plaques", "par l’érosion seule"], why: "Tectonique des plaques." },
      { qcm: "L’érosion…", choices: ["*use et façonne les reliefs", "crée des volcans", "élève les montagnes"], why: "Eau, vent, glace." },
      { qcm: "Pour représenter le relief le long d’une ligne, on fait…", choices: ["*une coupe topographique", "un diagramme climatique", "une pyramide des âges"], why: "Profil du relief." },
    ],
    "Les grandes régions naturelles du globe": [
      { qcm: "La forêt dense se trouve dans les régions…", choices: ["*équatoriales", "polaires", "désertiques"], why: "Pluies toute l’année." },
      { qcm: "La toundra caractérise les régions…", choices: ["tropicales", "*polaires", "méditerranéennes"], why: "Froid extrême." },
      { qcm: "Plus la saison sèche est longue, plus la végétation tropicale est…", choices: ["*ouverte (savane, steppe)", "dense", "haute"], why: "Gradient forêt-savane-steppe." },
    ],
  },
  FR: {
    "Le résumé de texte": [
      { vf: "Dans un résumé, on peut donner son avis.", answer: false, why: "On reste fidèle au texte." },
      { qcm: "Le résumé garde…", choices: ["*le point de vue de l’auteur", "les citations", "les exemples détaillés"], why: "Même système d’énonciation." },
      { qcm: "On indique à la fin du résumé…", choices: ["*le nombre de mots", "le nom de l’auteur", "la date"], why: "Consigne du Bac." },
    ],
    "La discussion": [
      { qcm: "Chaque argument d’une discussion est illustré par…", choices: ["*un exemple précis", "une citation obligatoire", "un résumé"], why: "Argument + exemple." },
      { qcm: "L’introduction se termine par…", choices: ["*l’annonce du plan", "la conclusion", "un exemple"], why: "Structure classique." },
      { vf: "La conclusion peut proposer une ouverture.", answer: true, why: "Elle élargit la réflexion." },
    ],
    "Le commentaire de texte": [
      { qcm: "On commence par…", choices: ["*situer le texte", "donner son avis", "recopier le texte"], why: "Auteur, œuvre, époque." },
      { qcm: "Un champ lexical est…", choices: ["*un ensemble de mots liés à un même thème", "une figure de style", "un type de rime"], why: "Il révèle un thème." },
      { qcm: "Un commentaire s’organise en…", choices: ["*axes de lecture", "une liste de remarques", "un résumé"], why: "Interprétation ordonnée." },
    ],
    "Le roman": [
      { qcm: "Un narrateur qui sait tout des personnages adopte le point de vue…", choices: ["interne", "externe", "*omniscient"], why: "Il connaît pensées et passé." },
      { qcm: "Les Bouts de bois de Dieu est d’…", choices: ["*Ousmane Sembène", "Mariama Bâ", "Cheikh Hamidou Kane"], why: "Roman de 1960." },
      { qcm: "Un retour en arrière dans le récit s’appelle…", choices: ["*une analepse", "une ellipse", "une prolepse"], why: "La prolepse est une anticipation ; l’ellipse saute une période." },
    ],
    "La poésie": [
      { num: "Combien de syllabes compte un alexandrin ?", answer: 12, why: "Vers classique." },
      { qcm: "Des rimes ABAB sont…", choices: ["plates", "*croisées", "embrassées"], why: "Alternance." },
      { qcm: "Un sonnet comporte…", choices: ["*deux quatrains et deux tercets", "trois quatrains", "un seul vers"], why: "14 vers." },
    ],
    "Le théâtre": [
      { qcm: "La double énonciation signifie que…", choices: ["*l’auteur s’adresse aussi au public", "deux personnages parlent en même temps", "la pièce a deux actes"], why: "Le spectateur reçoit les répliques." },
      { qcm: "Une pièce avec des personnages nobles et une fin malheureuse est…", choices: ["une comédie", "*une tragédie", "une farce"], why: "Fatalité." },
      { qcm: "Le début de la pièce qui présente la situation est…", choices: ["*l’exposition", "le dénouement", "le nœud"], why: "Il informe le spectateur." },
    ],
    "Littérature du Moyen Âge et de la Renaissance": [
      { qcm: "La Chanson de Roland est…", choices: ["*une chanson de geste", "un sonnet", "un roman réaliste"], why: "Épopée médiévale." },
      { qcm: "Montaigne est un écrivain…", choices: ["*humaniste", "romantique", "réaliste"], why: "XVIe siècle." },
      { qcm: "Ronsard et Du Bellay appartiennent à…", choices: ["*la Pléiade", "la Négritude", "les Lumières"], why: "Groupe de poètes du XVIe siècle." },
    ],
  },
  ANG: {
    "Education and school life": [
      { qcm: "I have studied English … four years.", choices: ["since", "*for", "during"], why: "For + duration." },
      { qcm: "I … the BFEM in 2025.", choices: ["have passed", "*passed", "pass"], why: "Finished time: past simple." },
      { qcm: "A “scholarship” is…", choices: ["*une bourse d’études", "une école", "un examen"], why: "Vocabulary." },
    ],
    "Health and hygiene": [
      { qcm: "You … sleep under a mosquito net. (advice)", choices: ["*should", "mustn’t", "can’t"], why: "Should for advice." },
      { qcm: "We … wash our hands before eating. (obligation)", choices: ["*must", "might", "could"], why: "Must for obligation." },
      { qcm: "Malaria is transmitted by…", choices: ["*mosquitoes", "water", "food"], why: "Anopheles mosquito." },
    ],
    "The environment": [
      { qcm: "Passive: People pollute the sea. → The sea … by people.", choices: ["pollutes", "*is polluted", "polluted"], why: "be + past participle." },
      { qcm: "Passive: They planted trees. → Trees …", choices: ["*were planted", "are planted", "planted"], why: "Past passive." },
      { qcm: "“Desertification” means…", choices: ["*la désertification", "la déforestation", "la pollution"], why: "Advance of the desert." },
    ],
    "Family and society": [
      { qcm: "My uncle, … lives in Thiès, is a teacher.", choices: ["*who", "which", "where"], why: "Who for people." },
      { qcm: "The house … I was born is in Kolda.", choices: ["which", "who", "*where"], why: "Where for places." },
      { qcm: "The girl … father is a doctor is my friend.", choices: ["who", "*whose", "which"], why: "Whose for possession." },
    ],
    "Jobs and the future": [
      { qcm: "I … study medicine. (plan)", choices: ["*am going to", "will to", "go"], why: "Going to for plans." },
      { qcm: "I … the counsellor tomorrow at 10. (arrangement)", choices: ["*am meeting", "meet", "met"], why: "Present continuous for arrangements." },
      { qcm: "I think it … rain.", choices: ["*will", "is going", "rains"], why: "Will for predictions." },
    ],
    "Reading and writing skills": [
      { qcm: "Reading quickly for the general idea is…", choices: ["*skimming", "scanning", "spelling"], why: "Skim = survoler." },
      { qcm: "A linking word that shows contrast:", choices: ["moreover", "*however", "firstly"], why: "However = cependant." },
      { qcm: "An informal letter starts with…", choices: ["*Dear…", "To whom it may concern", "Yours faithfully"], why: "Informal greeting." },
    ],
  },
};

const SERIES: ExerciseSeries[] = CHAPTERS_2NDE.map((chapter) => {
  const questions = BANK[chapter.subjectCode]?.[chapter.title];
  if (!questions) throw new Error(`Exercices (2nde) : aucune série pour « ${chapter.title} » (${chapter.subjectCode})`);
  return { subject: chapter.subjectCode, chapter: chapter.title, series: chapter.seriesCode ?? undefined, questions };
});

const built = buildExerciseSeries("2NDE", CHAPTERS_2NDE, SERIES);

export const QUESTIONS_2NDE = built.questions;
export const ANSWER_KEYS_2NDE = built.keys;
/** Chapitre de chaque question (banque utilisée par « Préparer mon prochain devoir »). */
export const QUESTION_CHAPTERS_2NDE = built.questionChapters;
export const ASSESSMENTS_2NDE = built.assessments;
