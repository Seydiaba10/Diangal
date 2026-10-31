import "server-only";

// 2nde : questions illustrées ajoutées aux séries d'exercices, avec les schémas des leçons. Elles se
// lisent sur le schéma et complètent les questions de 2nde/exercises.ts sans les répéter. Un chapitre
// commun aux séries S et L reçoit les mêmes questions.

import { ask, howMany, schemaFig, tf, type SubjectExtras } from "../illustrated-questions";

const VALEUR_ABSOLUE = schemaFig("m2-valeur-absolue", "Droite graduée : les nombres à une distance d’au plus 3 de 2.");
const PARITE = schemaFig("m2-parite", "Courbes de x² et de x³ dans un repère.");
const REFERENCE = schemaFig("m2-reference", "Courbes de x², de 1/x et de √x dans un repère.");
const TRINOME = schemaFig("m2-trinome", "Parabole de x² − 5x + 6 qui coupe l’axe des abscisses en 2 et en 3.");
const BARYCENTRE = schemaFig("m2-barycentre", "Segment [AB] avec le barycentre G de (A, 1) et (B, 3).");
const CERCLE_TRIGO = schemaFig("m2-cercle-trigo", "Cercle trigonométrique avec les angles π/6, π/4, π/3 et π/2.");
const SCALAIRE = schemaFig("m2-produit-scalaire", "Vecteurs u(2 ; 3) et v(3 ; −2) dans un repère.");
const HOMOTHETIE = schemaFig("m2-homothetie", "Un triangle et son image par une homothétie de centre O et de rapport 2.");
const INTERPOLATION = schemaFig("m2-interpolation", "Graphique de la température à Dakar entre 8 h et 12 h.");
const BOITE = schemaFig("m2-boite", "Boîte à moustaches des notes 6, 9, 10, 12 et 18.");
const ATOME = schemaFig("p2-atome", "Modèle de l’atome de sodium avec ses couches K, L et M.");
const CLASSIFICATION = schemaFig("p2-classification", "Les 18 premiers éléments de la classification périodique.");
const LEWIS = schemaFig("p2-lewis", "Molécule d’eau en représentation de Lewis et formation des ions du sel.");
const IONS = schemaFig("p2-tests-ions", "Cinq tubes avec des précipités de couleurs différentes.");
const CHRONO = schemaFig("p2-chrono", "Positions d’un mobile notées à intervalles de temps égaux, pour trois mouvements.");
const TROIS_FORCES = schemaFig("p2-trois-forces", "Objet suspendu à deux fils, avec ses trois forces et le triangle des forces.");
const MOMENTS = schemaFig("p2-moments", "Balançoire en équilibre : 300 N à 2 m de l’axe, 400 N à 1,5 m.");
const MESURES = schemaFig("p2-mesures", "Circuit avec un ampèremètre et un voltmètre.");
const FONCTIONNEMENT = schemaFig("p2-fonctionnement", "Caractéristiques d’un générateur et d’un moteur qui se coupent.");
const INVERSEUR = schemaFig("p2-inverseur", "Schéma d’un montage inverseur à amplificateur opérationnel.");
const ECOSYSTEME = schemaFig("s2-ecosysteme", "Un écosystème : le biotope et la biocénose.");
const PYRAMIDE = schemaFig("s2-pyramide", "Pyramide des producteurs et des consommateurs : herbe, gazelle, lion.");
const CYCLE_EAU = schemaFig("s2-cycle-eau", "Le cycle de l’eau entre la mer, l’air et le sol.");
const POTABILISATION = schemaFig("s2-potabilisation", "Les étapes de la potabilisation de l’eau.");
const HOMINIDES = schemaFig("h2-hominides", "Carte de l’Afrique avec les sites de Toumaï et de Lucy.");
const SOUDAN = schemaFig("h2-soudan", "Carte des villes des empires du Ghana, du Mali et du Songhaï.");
const TRAITES = schemaFig("h2-traites", "Carte des routes de la traite arabe et de la traite atlantique.");
const SAISONS = schemaFig("g2-saisons", "La Terre autour du Soleil aux quatre saisons.");
const OCEANS = schemaFig("g2-oceans", "Planisphère des cinq océans.");
const CLIMATS = schemaFig("g2-zones-climatiques", "Planisphère des zones climatiques selon la latitude.");

export const EXTRA_2NDE: SubjectExtras = {
  MATH: {
    "Le calcul dans IR": [
      tf("Le réel 6 vérifie |x − 2| ≤ 3.", false, "|6 − 2| = 4 et 4 &gt; 3 : 6 est trop loin de 2.", VALEUR_ABSOLUE),
    ],
    "Généralités sur les fonctions": [
      ask("D’après les courbes, la courbe de x³ est symétrique par rapport…", ["*à l’origine O", "à l’axe des ordonnées", "à l’axe des abscisses"], "x³ est impaire : (−x)³ = −x³.", PARITE),
    ],
    "Fonctions de référence": [
      ask("Par quel point passent les trois courbes de x², 1/x et √x ?", ["*(1 ; 1)", "(0 ; 0)", "(0 ; 1)"], "1² = 1/1 = √1 = 1.", REFERENCE),
      tf("La courbe de 1/x coupe l’axe des abscisses.", false, "1/x n’est jamais nul : l’hyperbole ne coupe pas les axes.", REFERENCE),
    ],
    "Équations et inéquations du second degré": [
      howMany("D’après la parabole, quelle est la somme des racines de x² − 5x + 6 ?", 5, "Les racines sont 2 et 3 : 2 + 3 = 5 (c’est aussi −b/a).", TRINOME),
      tf("D’après la parabole, x² − 5x + 6 est positif pour x = 4.", true, "en 4, la parabole est au-dessus de l’axe : 16 − 20 + 6 = 2.", TRINOME),
    ],
    "Calcul vectoriel et barycentre": [
      howMany("G est le barycentre de (A, 1) et (B, 3), avec AB = 8 cm. Combien mesure AG, en cm ?", 6, "AG = 3/4 × AB = 3/4 × 8 = 6 cm.", BARYCENTRE),
    ],
    "Angles orientés et trigonométrie": [
      ask("D’après le cercle trigonométrique, cos(π/3) vaut…", ["*1/2", "√3/2", "√2/2"], "le cosinus se lit sur l’axe horizontal ; sin(π/3) = √3/2.", CERCLE_TRIGO),
      ask("Combien vaut sin(π/2) ?", ["*1", "0", "1/2"], "le point d’angle π/2 est en haut du cercle, à la hauteur 1.", CERCLE_TRIGO),
    ],
    "Produit scalaire": [
      howMany("Calcule le produit scalaire des vecteurs u(2 ; 3) et v(3 ; −2).", 0, "2 × 3 + 3 × (−2) = 6 − 6 = 0 : les vecteurs sont orthogonaux.", SCALAIRE),
    ],
    "Les transformations du plan": [
      howMany("Dans l’homothétie de centre O et de rapport 2, OM = 3 cm. Combien mesure OM′, en cm ?", 6, "OM′ = 2 × OM = 2 × 3 = 6 cm.", HOMOTHETIE),
    ],
    "Lectures graphiques": [
      howMany("D’après le graphique, quelle température peut-on estimer à 10 h, en °C ?", 25, "On joint les deux mesures par un segment et on lit au milieu : environ 25 °C.", INTERPOLATION),
    ],
    "Statistique : position et dispersion": [
      howMany("D’après la boîte à moustaches, quel est l’écart interquartile Q3 − Q1 ?", 3, "Q3 − Q1 = 12 − 9 = 3.", BOITE),
      howMany("D’après la boîte à moustaches, quelle est l’étendue des notes ?", 12, "max − min = 18 − 6 = 12.", BOITE),
    ],
  },
  PC: {
    "Atomes, éléments et classification périodique": [
      howMany("D’après le modèle, combien d’électrons l’atome de sodium a-t-il sur sa couche externe M ?", 1, "K² L⁸ M¹ : un seul électron externe, comme tous les alcalins.", ATOME),
      ask("D’après la classification, le chlore (Z = 17) appartient à la famille…", ["*des halogènes", "des alcalins", "des gaz nobles"], "il est dans la colonne 17.", CLASSIFICATION),
    ],
    "Les liaisons chimiques": [
      howMany("D’après le schéma de Lewis de l’eau, combien de doublets non liants porte l’atome d’oxygène ?", 2, "L’oxygène forme 2 liaisons covalentes et garde 2 doublets non liants.", LEWIS),
    ],
    "Caractérisation de quelques ions": [
      ask("Avec la soude, quel ion donne un précipité bleu ?", ["*Cu²⁺", "Fe²⁺", "Fe³⁺"], "Fe²⁺ donne un précipité vert, Fe³⁺ un précipité rouille.", IONS),
    ],
    "Mouvement et vitesse": [
      ask("Sur l’enregistrement, les positions sont également espacées. Le mouvement est…", ["*uniforme", "accéléré", "ralenti"], "le mobile parcourt la même distance pendant chaque intervalle de temps.", CHRONO),
    ],
    "Équilibre d’un solide soumis à des forces": [
      tf("À l’équilibre, la somme vectorielle des trois forces est nulle.", true, "mises bout à bout, elles forment un triangle fermé.", TROIS_FORCES),
    ],
    "Équilibre d’un solide mobile autour d’un axe fixe": [
      howMany("Une force de 300 N s’exerce à 2 m de l’axe. À quelle distance de l’axe faut-il placer une force de 400 N pour l’équilibre, en m ?", 1.5, "Les moments sont égaux : 300 × 2 = 400 × d, donc d = 600 ÷ 400 = 1,5 m.", MOMENTS),
    ],
    "Le circuit électrique : intensité et tension": [
      ask("D’après le schéma, comment branche-t-on le voltmètre ?", ["*en dérivation, aux bornes de la lampe", "en série avec la lampe", "à la place de la pile"], "l’ampèremètre, lui, se branche en série.", MESURES),
    ],
    "Dipôles passifs et dipôles actifs": [
      ask("D’après le graphique, quel est le point de fonctionnement du circuit ?", ["*I = 1 A et U = 4 V", "I = 0 A et U = 6 V", "I = 2 A et U = 2 V"], "c’est le point où les deux caractéristiques se coupent.", FONCTIONNEMENT),
    ],
    "L’amplificateur opérationnel": [
      howMany("Dans le montage inverseur, R₁ = 1 kΩ et R₂ = 10 kΩ. Pour Ue = 0,5 V, combien vaut Us, en volts ?", -5, "Us = −(R₂/R₁) × Ue = −10 × 0,5 = −5 V.", INVERSEUR),
    ],
  },
  SVT: {
    "L’écosystème : structure et fonctionnement": [
      ask("Dans un écosystème, l’ensemble des êtres vivants s’appelle…", ["*la biocénose", "le biotope", "le climat"], "le biotope est le milieu : sol, eau, climat, lumière.", ECOSYSTEME),
      tf("D’après la pyramide, l’énergie disponible diminue d’un niveau à l’autre.", true, "à chaque niveau, une grande partie de l’énergie se perd.", PYRAMIDE),
    ],
    "L’eau": [
      ask("Dans le cycle de l’eau, comment s’appelle le passage de l’eau de la mer vers l’air ?", ["*l’évaporation", "la condensation", "l’infiltration"], "la condensation forme ensuite les nuages.", CYCLE_EAU),
      ask("Quelle est la dernière étape de la potabilisation ?", ["*la désinfection au chlore", "la décantation", "la filtration"], "elle détruit les microbes qui restent.", POTABILISATION),
    ],
  },
  HG: {
    "La préhistoire africaine et sénégalaise": [
      ask("D’après la carte, dans quel pays a-t-on découvert Toumaï ?", ["*au Tchad", "en Éthiopie", "au Sénégal"], "il a environ 7 millions d’années ; Lucy a été découverte en Éthiopie.", HOMINIDES),
    ],
    "L’Afrique occidentale du VIIe au XVIIe siècle": [
      ask("D’après la carte, quelle ville était la capitale de l’empire du Ghana ?", ["*Koumbi Saleh", "Gao", "Tombouctou"], "Gao était la capitale de l’empire songhaï.", SOUDAN),
    ],
    "Les traites négrières": [
      ask("D’après la carte, dans quelle direction part la traite atlantique ?", ["*vers l’ouest, à travers l’océan", "vers le nord, à travers le Sahara", "vers l’est, vers l’océan Indien"], "la traite arabe, elle, part vers le nord et l’est.", TRAITES),
    ],
    "La Terre dans le système solaire": [
      ask("D’après le schéma, le 21 juin, l’hémisphère nord…", ["*est tourné vers le Soleil : c’est l’été", "est tourné à l’opposé du Soleil : c’est l’hiver", "reçoit autant de lumière que l’hémisphère sud"], "l’axe incliné de la Terre garde la même direction.", SAISONS),
    ],
    "Continents, océans et mers": [
      ask("D’après le planisphère, quel est le plus grand océan ?", ["*le Pacifique", "l’Atlantique", "l’océan Indien"], "il couvre à lui seul plus d’un tiers de la Terre.", OCEANS),
    ],
    "Les climats de la Terre": [
      ask("D’après le planisphère, dans quelle zone climatique se trouve le Sénégal ?", ["*la zone intertropicale", "une zone tempérée", "une zone polaire"], "il est entre l’équateur et le tropique du Cancer.", CLIMATS),
    ],
  },
};
