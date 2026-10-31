import "server-only";

// 5e : questions illustrées ajoutées aux séries d'exercices, avec les schémas des leçons. Elles se
// lisent sur le schéma et complètent les questions de 5e/exercises.ts sans les répéter.

import { ask, howMany, schemaFig, tf, type SubjectExtras } from "../illustrated-questions";

const DROITE = schemaFig("m5-addition-relatifs", "Droite graduée de −4 à 6.");
const FRACTIONS = schemaFig("m5-fractions", "Bandes de même longueur partagées en 3, 12 et 4 parts : 2/3, 8/12, 3/4 et 9/12.");
const QUADRANTS = schemaFig("m5-quadrants", "Repère partagé en quatre quadrants avec les points M(3 ; 2) et M′(−3 ; −2).");
const PARALLELES = schemaFig("m5-angles-paralleles", "Deux droites parallèles (d₁) et (d₂) coupées par une sécante, avec des angles alternes-internes et des angles correspondants.");
const CONSTRUCTION = schemaFig("m5-construire-triangle", "Triangle ABC de côtés AB = 5 cm, 4 cm et 3 cm, avec deux arcs de compas qui se coupent en C.");
const MEDIATRICES = schemaFig("m5-mediatrices", "Triangle ABC, ses trois médiatrices qui se coupent en O et un cercle de centre O.");
const PARALLELOGRAMME = schemaFig("m5-parallelogramme", "Parallélogramme ABCD et ses diagonales qui se coupent en O.");
const SYMETRIE = schemaFig("m5-symetrie-centrale", "Triangle ABC et son symétrique A′B′C′ par rapport au point O.");
const PRISME = schemaFig("m5-prisme", "Un prisme droit à base triangulaire et son patron.");
const EMPIRES = schemaFig("h5-empires", "Frise des empires du Ghana, du Mali et du Songhaï de 700 à 1700, avec quatre événements datés.");
const SOCLE = schemaFig("g5-socle", "Carte du Sénégal : le bassin sédimentaire et le socle ancien.");
const FLEUVES = schemaFig("g5-fleuves", "Carte des cours d’eau du Sénégal.");
const CLIMAT_DAKAR = schemaFig("g5-climat-dakar", "Diagramme climatique de Dakar : pluies mensuelles en bâtons, températures en courbe.");
const PLUIES = schemaFig("g5-pluies", "Carte des pluies du Sénégal avec trois zones, Saint-Louis, Kaolack et Ziguinchor.");
const DENSITES = schemaFig("g5-densites", "Carte des densités de population du Sénégal.");
const PYRAMIDE = schemaFig("g5-pyramide", "Allure de la pyramide des âges d’une population jeune.");
const DENTS = schemaFig("s5-dentition", "Dents d’un mouton et d’un chien.");
const RUMINANT = schemaFig("s5-ruminant", "Estomac d’un ruminant : panse, bonnet, feuillet et caillette.");
const PROFIL = schemaFig("s5-profil-sol", "Profil d’un sol, de la litière à la roche mère.");
const BOCAL = schemaFig("s5-bocal-sol", "Bocal d’eau où les constituants d’un sol se sont déposés.");
const COUCHES = schemaFig("s5-sedimentation", "Couches de sédiments numérotées de 1 à 4 au fond de la mer, avec un fossile.");

export const EXTRA_5E: SubjectExtras = {
  MATH: {
    "Addition et soustraction des nombres relatifs": [
      howMany("Calcule (−2) + 7 en t’aidant de la droite graduée.", 5, "On part de −2 et on avance de 7 graduations : on arrive à 5.", DROITE),
      howMany("Calcule 3 − 6 en t’aidant de la droite graduée.", -3, "On part de 3 et on recule de 6 graduations : on arrive à −3.", DROITE),
    ],
    "Les fractions": [
      ask("D’après les bandes, la fraction 2/3 est égale à…", ["*8/12", "9/12", "6/12"], "2/3 = (2 × 4)/(3 × 4) = 8/12.", FRACTIONS),
      howMany("Combien de douzièmes faut-il ajouter à 2/3 pour obtenir 3/4 ?", 1, "3/4 − 2/3 = 9/12 − 8/12 = 1/12.", FRACTIONS),
    ],
    "Repérage dans le plan": [
      ask("Dans quel quadrant se trouve le point M′(−3 ; −2) ?", ["*le 3e quadrant", "le 1er quadrant", "le 4e quadrant"], "ses deux coordonnées sont négatives.", QUADRANTS),
      ask("Dans quel quadrant placerais-tu le point N(−2 ; 3) ?", ["*le 2e quadrant", "le 4e quadrant", "le 3e quadrant"], "abscisse négative et ordonnée positive : en haut à gauche.", QUADRANTS),
    ],
    "Les angles": [
      howMany("Sur la figure, (d₁) et (d₂) sont parallèles. Un des deux angles alternes-internes mesure 65°. Combien mesure l’autre, en degrés ?", 65, "Deux angles alternes-internes formés par deux parallèles sont égaux.", PARALLELES),
      tf("Si deux droites coupées par une sécante forment deux angles correspondants égaux, alors elles sont parallèles.", true, "c’est la propriété réciproque.", PARALLELES),
    ],
    "Les triangles": [
      tf("On peut construire un triangle de côtés 5 cm, 4 cm et 3 cm.", true, "le plus grand côté est plus petit que la somme des deux autres : 5 &lt; 4 + 3. Les deux arcs se coupent.", CONSTRUCTION),
      ask("Le point O, où se coupent les trois médiatrices, est le centre du cercle…", ["*circonscrit au triangle", "inscrit dans le triangle", "de diamètre [AB]"], "O est à la même distance des trois sommets : le cercle passe par A, B et C.", MEDIATRICES),
    ],
    "Le parallélogramme": [
      howMany("Dans le parallélogramme ABCD de la figure, AC = 10 cm. Combien mesure OA, en cm ?", 5, "Les diagonales se coupent en leur milieu : OA = 10 ÷ 2 = 5 cm.", PARALLELOGRAMME),
    ],
    "La symétrie centrale": [
      ask("A′ est le symétrique de A par rapport au point O. Pour le segment [AA′], le point O est…", ["*son milieu", "une de ses extrémités", "en dehors du segment"], "A et A′ sont de part et d’autre de O, à la même distance.", SYMETRIE),
    ],
    "Géométrie dans l’espace": [
      howMany("Combien de rectangles le patron de ce prisme droit comporte-t-il ?", 3, "Trois rectangles (les faces latérales) et deux triangles (les bases).", PRISME),
    ],
  },
  HG: {
    "Les empires du Ghana et du Mali": [
      ask("D’après la frise, quel événement ouvre l’empire du Mali ?", ["*la bataille de Kirina, vers 1235", "la prise de Koumbi, en 1076", "la bataille de Tondibi, en 1591"], "Soundiata Keïta y bat Soumaoro Kanté.", EMPIRES),
      ask("D’après la frise, en quelle année Kankou Moussa fait-il son pèlerinage à La Mecque ?", ["*1324", "1076", "1591"], "le Mali est alors à son apogée.", EMPIRES),
    ],
    "Le Sénégal : situation, géologie et relief": [
      ask("D’après la carte, où se trouvent les reliefs les plus hauts du Sénégal ?", ["*au sud-est, sur le socle ancien", "à l’ouest, autour de Dakar", "au nord, le long du fleuve"], "ils atteignent environ 600 m.", SOCLE),
      tf("Presque tout le Sénégal est un bassin sédimentaire de plaines et de plateaux bas.", true, "le socle ancien n’apparaît qu’au sud-est.", SOCLE),
    ],
    "Le Sénégal : climat, eaux, sols, végétation et écosystèmes": [
      ask("D’après le diagramme de Dakar, quel est le mois le plus pluvieux ?", ["*août", "juin", "décembre"], "le bâton d’août est le plus haut (environ 165 mm).", CLIMAT_DAKAR),
      ask("D’après la carte des pluies, quelle ville reçoit le plus de pluie ?", ["*Ziguinchor", "Kaolack", "Saint-Louis"], "les pluies augmentent du nord vers le sud.", PLUIES),
      ask("D’après la carte, quel cours d’eau forme la frontière nord du Sénégal ?", ["*le fleuve Sénégal", "la Gambie", "la Casamance"], "il sépare le Sénégal de la Mauritanie.", FLEUVES),
    ],
    "La population du Sénégal": [
      ask("D’après la carte, où les densités de population sont-elles les plus fortes ?", ["*à l’ouest", "à l’est", "au sud-est"], "les hommes sont concentrés près de la côte et dans le Bassin arachidier.", DENSITES),
      ask("La base très large de la pyramide des âges montre…", ["*qu’il y a beaucoup de jeunes", "qu’il y a beaucoup de personnes âgées", "qu’il y a autant de jeunes que de personnes âgées"], "c’est la pyramide d’une population jeune, comme celle du Sénégal.", PYRAMIDE),
    ],
  },
  SVT: {
    "L’alimentation chez les animaux": [
      ask("D’après le schéma, quelles dents manquent au mouton ?", ["*les canines", "les incisives", "les molaires"], "un espace vide sépare ses incisives de ses molaires.", DENTS),
      ask("Dans l’estomac du ruminant, où va d’abord l’herbe avalée ?", ["*dans la panse", "dans la caillette", "dans le feuillet"], "elle remonte ensuite dans la bouche pour être remâchée.", RUMINANT),
    ],
    "Les sols": [
      ask("Dans le profil du sol, quelle couche est tout en bas ?", ["*la roche mère", "la litière", "l’horizon humifère"], "le sol se forme au-dessus de la roche mère, qui s’altère lentement.", PROFIL),
      ask("Dans le bocal, quel constituant du sol flotte ?", ["*l’humus", "le sable", "les graviers"], "l’humus est léger ; les graviers, les plus lourds, tombent au fond.", BOCAL),
    ],
    "Les roches sédimentaires": [
      ask("Sur le schéma, quelle couche est la plus ancienne ?", ["*la couche 1, tout en bas", "la couche 4, tout en haut", "la couche 3"], "elle s’est déposée la première ; les suivantes se sont déposées par-dessus.", COUCHES),
      tf("Un coquillage pris dans une couche de sédiments peut devenir un fossile.", true, "la couche durcit et garde la trace du coquillage.", COUCHES),
    ],
  },
};
