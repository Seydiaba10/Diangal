import "server-only";

// 4e : questions illustrées ajoutées aux séries d'exercices, avec les schémas des leçons. Elles se
// lisent sur le schéma et complètent les questions de 4e/exercises.ts sans les répéter.

import { ask, howMany, schemaFig, tf, type SubjectExtras } from "../illustrated-questions";

const INTERVALLE = schemaFig("m4-intervalle", "Droite graduée de −1 à 6 avec l’intervalle [1 ; 4[ colorié.");
const LINEAIRE = schemaFig("m4-lineaire", "Droite qui passe par l’origine : le prix en milliers de francs selon la longueur en mètres.");
const BATONS = schemaFig("m4-batons", "Diagramme en bâtons des notes : 8, 10, 12, 14 et 16, avec leurs effectifs.");
const CERCLES = schemaFig("m4-cercles", "Les cinq positions possibles de deux cercles.");
const MILIEUX = schemaFig("m4-droite-milieux", "Triangle ABC, I milieu de [AB], J milieu de [AC], BC = 8 cm.");
const MEDIANES = schemaFig("m4-medianes", "Triangle ABC, ses trois médianes et le centre de gravité G.");
const PYTHAGORE = schemaFig("m4-pythagore", "Triangle rectangle en A avec les carrés construits sur ses trois côtés.");
const HAUTEUR = schemaFig("m4-hauteur-hypotenuse", "Triangle ABC rectangle en A de côtés 6 et 8, avec sa hauteur [AH].");
const ARC = schemaFig("m4-arc", "Cercle de rayon 6 cm avec un angle au centre de 60° et l’arc AB.");
const HEXAGONE = schemaFig("m4-hexagone", "Hexagone régulier inscrit dans un cercle de centre O.");
const ROTATION = schemaFig("m4-rotation", "Rotation de centre O et d’angle 70° qui transforme M en M′.");
const MILIEU = schemaFig("m4-milieu-distance", "Repère avec A(1 ; 2), B(4 ; 6) et leur milieu I.");
const SECTION = schemaFig("m4-section-sphere", "Section d’une sphère de rayon 5 cm par un plan situé à 3 cm du centre.");
const TRIANGULAIRE = schemaFig("h4-commerce-triangulaire", "Carte de l’Atlantique avec les trois trajets du commerce triangulaire.");
const OUEST = schemaFig("g4-afrique-ouest", "Carte de l’Afrique de l’Ouest : pays de la CEDEAO et de l’Alliance des États du Sahel.");
const AFRIQUE = schemaFig("g4-afrique-physique", "Carte de l’Afrique avec ses grands fleuves, ses lacs et ses déserts.");
const EUROPE = schemaFig("g4-europe", "Planisphère : l’Europe en couleur.");
const AMERIQUE = schemaFig("g4-amerique", "Planisphère : l’Amérique en couleur.");
const ASIE = schemaFig("g4-asie", "Planisphère : l’Asie en couleur.");
const OCEANIE = schemaFig("g4-oceanie", "Planisphère : l’Océanie en couleur.");
const DIGESTIF = schemaFig("s4-digestif", "Schéma de l’appareil digestif avec ses organes.");
const SANG = schemaFig("s4-sang", "Sang vu au microscope : globules rouges, globules blancs, plaquettes et plasma.");
const COEUR = schemaFig("s4-coeur", "Le cœur en coupe avec ses quatre cavités et ses vaisseaux.");
const DOUBLE = schemaFig("s4-double-circulation", "Schéma de la petite et de la grande circulation.");
const FEMININ = schemaFig("s4-app-feminin", "Schéma de l’appareil reproducteur de la femme.");
const GROSSESSE = schemaFig("s4-grossesse", "Le fœtus dans l’utérus, avec le placenta et le cordon ombilical.");
const CARYOTYPE = schemaFig("s4-caryotype", "Caryotype humain schématique : 22 paires numérotées, puis la 23e paire XX ou XY.");
const SEISME = schemaFig("s4-seisme", "Coupe d’un séisme : faille, foyer, épicentre et ondes.");
const GLOBE = schemaFig("s4-globe", "Quart de globe en coupe : croûte, manteau, noyau externe et graine.");
const VOLCAN = schemaFig("s4-volcan", "Volcan en coupe avec la chambre magmatique, la cheminée et le cratère.");
const ROCHES = schemaFig("s4-roches", "Basalte et granite vus au microscope.");
const EPROUVETTE = schemaFig("p4-eprouvette", "Éprouvette graduée contenant un liquide.");
const DYNAMOMETRE = schemaFig("p4-dynamometre", "Dynamomètre auquel est accrochée une masse de 500 g.");
const CIRCUITS = schemaFig("p4-circuits", "Un circuit en série et un circuit en dérivation, chacun avec une pile et deux lampes.");
const OMBRE = schemaFig("p4-ombre", "Source de lumière, objet opaque et écran : cône d’ombre et ombre portée.");
const ECLIPSE = schemaFig("p4-eclipse", "Éclipse de Lune : le Soleil, la Terre et la Lune alignés.");
const REFLEXION = schemaFig("p4-reflexion", "Rayon réfléchi par un miroir plan, avec la normale et les angles i et r.");
const REFRACTION = schemaFig("p4-refraction", "Rayon qui passe de l’air dans l’eau, avec la normale.");
const SEPARATION = schemaFig("p4-separation", "Décantation puis filtration d’une eau boueuse.");
const DISTILLATION = schemaFig("p4-distillation", "Montage de distillation : ballon chauffé, réfrigérant, récipient.");
const MOLECULES = schemaFig("p4-molecules", "Modèles des molécules d’eau, de dioxygène, de dioxyde de carbone et de méthane.");
const REACTION = schemaFig("p4-reaction", "Modèles des réactions C + O₂ → CO₂ et 2 H₂ + O₂ → 2 H₂O.");

export const EXTRA_4E: SubjectExtras = {
  MATH: {
    "Inéquations et systèmes d’inéquations à une inconnue": [
      tf("D’après la droite graduée, 4 est une solution (4 appartient à [1 ; 4[).", false, "le crochet tourné vers l’extérieur en 4 montre que 4 est exclu.", INTERVALLE),
      ask("Quel nombre appartient à l’intervalle colorié [1 ; 4[ ?", ["*1", "4", "0,5"], "1 est inclus (crochet tourné vers l’intervalle) ; 4 est exclu ; 0,5 est avant 1.", INTERVALLE),
    ],
    "Les applications linéaires": [
      howMany("D’après le graphique, combien coûtent 2 m de tissu, en francs ?", 3000, "f(2) = 1 500 × 2 = 3 000 F.", LINEAIRE),
      tf("La représentation graphique d’une application linéaire est une droite qui passe par l’origine.", true, "c’est le cas de f(x) = 1 500x sur le graphique.", LINEAIRE),
    ],
    "La statistique": [
      howMany("D’après le diagramme, combien d’élèves ont eu une note ?", 10, "2 + 4 + 2 + 1 + 1 = 10 élèves.", BATONS),
      howMany("D’après le diagramme, quelle est la moyenne des notes ?", 11, "(8 × 2 + 10 × 4 + 12 × 2 + 14 + 16) ÷ 10 = 110 ÷ 10 = 11.", BATONS),
    ],
    "La distance": [
      ask("Deux cercles ont pour rayons 3 cm et 2 cm, et leurs centres sont à 5 cm l’un de l’autre. Ils sont…", ["*tangents extérieurement", "sécants", "extérieurs"], "d = r + r′ = 3 + 2 = 5 cm : ils se touchent en un seul point.", CERCLES),
    ],
    "La droite des milieux": [
      howMany("Dans le triangle de la figure, BC = 8 cm. Combien mesure IJ, en cm ?", 4, "La droite des milieux mesure la moitié du troisième côté : 8 ÷ 2 = 4 cm.", MILIEUX),
      tf("Sur la figure, (IJ) est parallèle à (BC).", true, "la droite qui joint les milieux de deux côtés est parallèle au troisième.", MILIEUX),
    ],
    "Droites remarquables dans un triangle": [
      howMany("Sur la figure, la médiane [AA′] mesure 9 cm. Combien mesure AG, en cm ?", 6, "G est aux deux tiers de la médiane en partant du sommet : 9 × 2/3 = 6 cm.", MEDIANES),
    ],
    "Le triangle rectangle": [
      howMany("Sur la figure, les carrés construits sur les côtés de l’angle droit ont pour aires 36 et 64. Quelle est la longueur de l’hypoténuse ?", 10, "BC² = 36 + 64 = 100, donc BC = 10.", PYTHAGORE),
      howMany("Dans le triangle ABC rectangle en A, AB = 6, AC = 8 et BC = 10. Combien mesure la hauteur AH ?", 4.8, "AB × AC = AH × BC : AH = 48 ÷ 10 = 4,8.", HAUTEUR),
    ],
    "Rotations et polygones réguliers": [
      howMany("Dans un cercle de rayon 6 cm, l’arc intercepté par un angle au centre de 60° mesure environ combien de cm ? (arrondis au centième)", 6.28, "ℓ = 2π × 6 × 60 ÷ 360 = 2π ≈ 6,28 cm.", ARC),
      howMany("Combien mesure chaque angle au centre d’un hexagone régulier, en degrés ?", 60, "360° ÷ 6 = 60°.", HEXAGONE),
      tf("Dans la rotation de centre O, la distance OM′ est égale à OM.", true, "le point tourne sur un cercle de centre O.", ROTATION),
    ],
    "Projection orthogonale et repérage": [
      ask("Quelles sont les coordonnées du milieu I de [AB], avec A(1 ; 2) et B(4 ; 6) ?", ["*(2,5 ; 4)", "(5 ; 8)", "(3 ; 4)"], "on fait la moyenne des abscisses, puis des ordonnées : ((1 + 4) ÷ 2 ; (2 + 6) ÷ 2).", MILIEU),
      howMany("Avec A(1 ; 2) et B(4 ; 6), combien vaut la distance AB ?", 5, "AB² = 3² + 4² = 25, donc AB = 5.", MILIEU),
    ],
    "Géométrie dans l’espace": [
      howMany("Une sphère de rayon 5 cm est coupée par un plan situé à 3 cm du centre. Quel est le rayon du cercle de section, en cm ?", 4, "r² = 5² − 3² = 16, donc r = 4 cm.", SECTION),
    ],
  },
  HG: {
    "La traite négrière : naissance, mécanisme et évolution": [
      ask("D’après la carte, quel trajet du commerce triangulaire transportait les captifs africains ?", ["*d’Afrique vers l’Amérique", "d’Europe vers l’Afrique", "d’Amérique vers l’Europe"], "c’est la traversée de l’Atlantique, la plus meurtrière.", TRIANGULAIRE),
      ask("Que rapportaient les navires d’Amérique vers l’Europe ?", ["*du sucre, du coton et du café", "des armes et des tissus", "des captifs"], "les produits des plantations où travaillaient les captifs.", TRIANGULAIRE),
    ],
    "L’Afrique de l’Ouest : développement et intégration": [
      ask("D’après la carte, quels pays forment l’Alliance des États du Sahel ?", ["*le Mali, le Burkina Faso et le Niger", "le Sénégal, le Mali et la Guinée", "le Nigeria, le Niger et le Tchad"], "ils ont quitté la CEDEAO en 2025.", OUEST),
    ],
    "L’Afrique : milieux, population et développement": [
      ask("D’après la carte, quel désert occupe le nord de l’Afrique ?", ["*le Sahara", "le Kalahari", "le Namib"], "le Kalahari est au sud.", AFRIQUE),
      ask("Quel grand fleuve coule vers le nord et se jette dans la mer Méditerranée ?", ["*le Nil", "le Congo", "le Niger"], "le Congo et le Niger se jettent dans l’océan Atlantique.", AFRIQUE),
    ],
    "L’Europe": [
      ask("Sur le planisphère, quelle chaîne de montagnes limite l’Europe à l’est ?", ["*l’Oural", "l’Atlas", "les Andes"], "l’Europe s’étend de l’océan Atlantique à l’Oural.", EUROPE),
    ],
    "L’Amérique": [
      ask("D’après le planisphère, quel océan sépare l’Amérique de l’Europe et de l’Afrique ?", ["*l’océan Atlantique", "l’océan Indien", "l’océan Arctique"], "le Pacifique est de l’autre côté, à l’ouest.", AMERIQUE),
    ],
    "L’Asie": [
      tf("D’après le planisphère, l’Asie est le plus vaste des continents.", true, "c’est aussi le plus peuplé : plus d’un être humain sur deux y vit.", ASIE),
    ],
    "L’Océanie": [
      ask("Quel est le plus grand pays d’Océanie, bien visible sur le planisphère ?", ["*l’Australie", "la Nouvelle-Zélande", "les Fidji"], "l’Australie est presque un continent à elle seule.", OCEANIE),
    ],
  },
  SVT: {
    "La digestion et l’absorption intestinale": [
      ask("D’après le schéma, quel organe se trouve juste après l’estomac dans le tube digestif ?", ["*l’intestin grêle", "l’œsophage", "le rectum"], "bouche, œsophage, estomac, intestin grêle, gros intestin, rectum, anus.", DIGESTIF),
      ask("Lequel de ces organes n’est pas traversé par les aliments ?", ["*le foie", "l’estomac", "l’intestin grêle"], "le foie est une glande digestive : il verse la bile dans l’intestin, mais les aliments ne le traversent pas.", DIGESTIF),
    ],
    "Le sang : composition et maladies": [
      ask("D’après le schéma, quelles cellules du sang ont un noyau ?", ["*les globules blancs", "les globules rouges", "les plaquettes"], "les globules rouges, les plus nombreux, n’ont pas de noyau.", SANG),
    ],
    "La circulation sanguine": [
      ask("D’après le schéma du cœur, quel vaisseau part du ventricule gauche ?", ["*l’aorte", "la veine cave", "l’artère pulmonaire"], "le ventricule gauche envoie le sang riche en dioxygène vers les organes.", COEUR),
      ask("D’après le schéma, où le sang se charge-t-il en dioxygène ?", ["*dans les poumons", "dans les organes", "dans le cœur droit"], "c’est la petite circulation.", DOUBLE),
    ],
    "La puberté et les organes reproducteurs": [
      ask("D’après le schéma, quels organes produisent les ovules ?", ["*les ovaires", "les trompes", "l’utérus"], "les ovaires libèrent environ un ovule par cycle.", FEMININ),
    ],
    "De la fécondation à l’accouchement": [
      ask("D’après le schéma, quel organe relie le fœtus au placenta ?", ["*le cordon ombilical", "le col de l’utérus", "le liquide amniotique"], "le fœtus reçoit par le cordon le dioxygène et les nutriments.", GROSSESSE),
    ],
    "La transmission des caractères héréditaires": [
      howMany("D’après le caryotype, combien de chromosomes compte une cellule humaine ?", 46, "23 paires, soit 23 × 2 = 46 chromosomes.", CARYOTYPE),
      ask("D’après le caryotype, quelle 23e paire porte un homme ?", ["*XY", "XX", "YY"], "XX chez la femme, XY chez l’homme.", CARYOTYPE),
    ],
    "Les séismes et la structure du globe": [
      ask("D’après le schéma, comment s’appelle le point de la surface situé juste au-dessus du foyer ?", ["*l’épicentre", "la faille", "le noyau"], "c’est là que les dégâts sont en général les plus forts.", SEISME),
      ask("D’après le schéma, quelle partie du globe est solide, tout au centre ?", ["*la graine", "le noyau externe", "le manteau supérieur"], "le noyau externe, lui, est liquide.", GLOBE),
    ],
    "Le volcanisme": [
      ask("D’après le schéma, par où le magma monte-t-il jusqu’au cratère ?", ["*par la cheminée", "par la coulée de lave", "par les couches de cendres"], "il vient de la chambre magmatique.", VOLCAN),
    ],
    "Les roches magmatiques": [
      ask("D’après le schéma, quelle roche a refroidi lentement, en profondeur ?", ["*le granite", "le basalte", "les deux"], "ses cristaux sont grands et jointifs.", ROCHES),
    ],
  },
  PC: {
    "Grandeurs physiques et mesures": [
      howMany("D’après le schéma, quel volume de liquide contient l’éprouvette, en mL ?", 62, "On lit la graduation au bas du ménisque, l’œil à sa hauteur : 62 mL.", EPROUVETTE),
    ],
    "Le poids et la relation poids-masse": [
      howMany("Le dynamomètre indique 5 N pour 500 g. Quel poids indiquerait-il pour 800 g (g = 10 N/kg), en newtons ?", 8, "P = m × g = 0,8 × 10 = 8 N.", DYNAMOMETRE),
    ],
    "Introduction à l’électricité": [
      tf("Dans le circuit en dérivation, si une lampe grille, l’autre reste allumée.", true, "chaque lampe est sur sa propre branche, reliée à la pile.", CIRCUITS),
      ask("Dans le circuit en série, si on ouvre l’interrupteur K…", ["*les deux lampes s’éteignent", "une seule lampe s’éteint", "les lampes brillent plus"], "il n’y a qu’une seule boucle : le courant ne passe plus.", CIRCUITS),
    ],
    "Sources et propagation de la lumière": [
      tf("L’ombre portée existe parce que la lumière se propage en ligne droite.", true, "les rayons qui frôlent l’objet délimitent le cône d’ombre.", OMBRE),
      ask("Pendant une éclipse de Lune, quel astre se trouve au milieu ?", ["*la Terre", "la Lune", "le Soleil"], "la Lune passe dans l’ombre de la Terre.", ECLIPSE),
    ],
    "Réflexion et réfraction de la lumière": [
      howMany("Un rayon arrive sur un miroir plan avec un angle d’incidence de 40°. Quel est l’angle de réflexion, en degrés ?", 40, "Loi de la réflexion : r = i.", REFLEXION),
      tf("En passant de l’air dans l’eau, le rayon se rapproche de la normale.", true, "sur le schéma, i = 50° et r ≈ 35°.", REFRACTION),
    ],
    "Mélanges et corps purs": [
      ask("Dans la filtration, comment s’appelle le liquide limpide recueilli sous le filtre ?", ["*le filtrat", "le résidu", "le dépôt"], "le résidu reste sur le papier filtre.", SEPARATION),
      ask("Dans la distillation d’une eau salée, que reste-t-il dans le ballon ?", ["*le sel", "l’eau pure", "rien du tout"], "l’eau s’évapore, se condense dans le réfrigérant et donne le distillat.", DISTILLATION),
    ],
    "La structure de la matière": [
      howMany("D’après les modèles, combien d’atomes contient une molécule de méthane CH₄ ?", 5, "1 atome de carbone et 4 atomes d’hydrogène.", MOLECULES),
    ],
    "La réaction chimique": [
      howMany("Dans 2 H₂ + O₂ → 2 H₂O, combien d’atomes d’hydrogène y a-t-il de chaque côté de la flèche ?", 4, "2 × 2 = 4 avant, 2 × 2 = 4 après : les atomes se conservent.", REACTION),
    ],
  },
};
