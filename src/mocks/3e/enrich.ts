import "server-only";

// 3e : questions illustrées ajoutées aux séries d'exercices, avec les schémas des leçons. Elles se
// lisent sur le schéma et complètent les questions de 3e/exercises.ts sans les répéter (Thalès et
// l’immunité ont leur propre contrôle dans assessments-3e.ts).

import { ask, howMany, schemaFig, tf, type SubjectExtras } from "../illustrated-questions";

const IDENTITE = schemaFig("m3-identite", "Carré de côté a + b découpé en un carré a², un carré b² et deux rectangles ab.");
const SYSTEME = schemaFig("m3-systeme", "Les droites 2x + y = 1 500 et x + 2y = 1 800 qui se coupent.");
const DEMI_PLAN = schemaFig("m3-demi-plan", "Droite d’équation 2x + y = 4 et demi-plan des solutions de 2x + y > 4.");
const AFFINES = schemaFig("m3-affines", "Les droites de f(x) = 2x − 1 et de g(x) = −x + 3.");
const TAXI = schemaFig("m3-taxi", "Prix d’une course de taxi selon la distance : deux segments qui se rejoignent au point (10 ; 2 500).");
const CIRCULAIRE = schemaFig("m3-circulaire", "Diagramme circulaire de quatre secteurs : 50 %, 25 %, 15 % et 10 %.");
const TRIGO = schemaFig("m3-trigo", "Triangle ABC rectangle en A avec le côté adjacent, le côté opposé et l’hypoténuse pour l’angle B.");
const CHASLES = schemaFig("m3-chasles", "Vecteurs AB et BC mis bout à bout, et vecteur AC.");
const COORD = schemaFig("m3-coord-vecteur", "Vecteur AB dans un repère, de A(1 ; 3) à B(4 ; −1).");
const PERPENDICULAIRES = schemaFig("m3-perpendiculaires", "Droites y = 2x + 1 et y = −½x + 3 dans un repère.");
const INSCRIT = schemaFig("m3-angle-inscrit", "Cercle de centre O avec l’angle au centre AOB et l’angle inscrit AMB qui interceptent le même arc.");
const DEMI_CERCLE = schemaFig("m3-demi-cercle", "Triangle AMB inscrit dans un demi-cercle de diamètre [AB].");
const PYRAMIDE = schemaFig("m3-pyramide-cone", "Une pyramide à base carrée de 6 cm et de hauteur 5, un cône de rayon 3 et de hauteur 4.");
const REDUCTION = schemaFig("m3-reduction", "Cône coupé à mi-hauteur : le petit cône du haut.");
const AFRIQUE_1914 = schemaFig("h3-afrique-1914", "Carte de l’Afrique colonisée vers 1914, par puissance coloniale.");
const GUERRES = schemaFig("h3-frise-guerres", "Frise de 1910 à 1950 avec les deux guerres mondiales.");
const GUERRE_FROIDE = schemaFig("h3-frise-guerre-froide", "Frise de la guerre froide de 1945 à 1991.");
const INDEPENDANCES = schemaFig("h3-independances", "Carte de l’Afrique colorée selon la date d’indépendance.");
const SENEGAL = schemaFig("h3-frise-senegal", "Frise du Sénégal de 1944 à 1960.");
const NORD_SUD = schemaFig("g3-nord-sud", "Planisphère des pays développés, des grands pays émergents et des pays en développement.");
const RECHAUFFEMENT = schemaFig("g3-rechauffement", "Courbe de l’écart de température moyenne de la Terre de 1880 à 2025.");
const NERVEUX = schemaFig("s3-systeme-nerveux", "Silhouette avec l’encéphale, la moelle épinière et des nerfs.");
const NEURONE = schemaFig("s3-neurone", "Un neurone avec son corps cellulaire, ses dendrites et son axone.");
const REFLEXE = schemaFig("s3-arc-reflexe", "Arc réflexe en cinq étapes numérotées.");
const OEIL = schemaFig("s3-oeil", "L’œil en coupe avec ses parties.");
const DEFAUTS = schemaFig("s3-defauts-vision", "Œil myope et œil hypermétrope.");
const ALVEOLE = schemaFig("s3-alveole", "Une alvéole pulmonaire entourée d’un capillaire sanguin.");
const URINAIRE = schemaFig("s3-appareil-urinaire", "Les deux reins, les uretères, la vessie et l’urètre.");
const NEPHRON = schemaFig("s3-nephron", "Un néphron avec le glomérule et le tube urinaire.");
const PLAQUES = schemaFig("s3-plaques", "Trois blocs : divergence, convergence et coulissage des plaques.");
const CYCLE = schemaFig("s3-cycle-roches", "Cycle des roches : magma, roches magmatiques, sédimentaires et métamorphiques.");
const DATATION = schemaFig("s3-datation", "Couches de roches A, B, C, D, une faille F et une roche M.");
const LENTILLES = schemaFig("p3-lentilles", "Lentille convergente et lentille divergente éclairées par un faisceau parallèle.");
const IMAGE = schemaFig("p3-image-lentille", "Construction de l’image A′B′ d’un objet AB par une lentille convergente.");
const PRISME = schemaFig("p3-prisme", "Faisceau de lumière blanche décomposé par un prisme.");
const EQUILIBRE = schemaFig("p3-equilibre", "Solide suspendu à un fil, avec la tension T et le poids P.");
const RECIPROQUES = schemaFig("p3-actions-reciproques", "Deux blocs A et B en contact et les deux forces qu’ils exercent l’un sur l’autre.");
const TRAVAIL = schemaFig("p3-travail", "Sac de 20 kg soulevé de 1,5 m.");
const ELECTRISATION = schemaFig("p3-electrisation", "Règle frottée qui attire des morceaux de papier.");
const NOEUDS = schemaFig("p3-loi-noeuds", "Circuit avec deux branches en dérivation et un ampèremètre dans la branche principale.");
const OHM = schemaFig("p3-loi-ohm", "Caractéristique U = 100 × I d’un résistor.");
const RESISTANCES = schemaFig("p3-resistances", "Deux résistances en série, deux résistances en dérivation.");
const CALORIMETRE = schemaFig("p3-calorimetre", "Calorimètre avec thermomètre et agitateur.");
const DILUTION = schemaFig("p3-dilution", "Dilution avec une pipette de 50 mL et une fiole jaugée de 200 mL.");
const PH = schemaFig("p3-echelle-ph", "Échelle de pH de 0 à 14 avec le citron, l’eau pure et l’eau de Javel.");
const BBT = schemaFig("p3-bbt", "Trois tubes de bleu de bromothymol : jaune, vert et bleu.");
const ALCANES = schemaFig("p3-alcanes", "Formules développées du méthane, de l’éthane, du propane et du butane.");

export const EXTRA_3E: SubjectExtras = {
  MATH: {
    "Calcul algébrique": [
      ask("D’après la figure, (a + b)² est égal à…", ["*a² + 2ab + b²", "a² + b²", "a² + ab + b²"], "le grand carré contient a², b² et deux rectangles ab.", IDENTITE),
      howMany("En t’aidant de la figure, calcule 13² avec a = 10 et b = 3.", 169, "(10 + 3)² = 100 + 2 × 30 + 9 = 169.", IDENTITE),
    ],
    "Équations et inéquations à deux inconnues": [
      ask("D’après le graphique, quel couple (x ; y) est la solution du système ?", ["*(400 ; 700)", "(700 ; 400)", "(1 500 ; 1 800)"], "c’est le point où les deux droites se coupent : 2 × 400 + 700 = 1 500 et 400 + 2 × 700 = 1 800.", SYSTEME),
      tf("Le point O(0 ; 0) est une solution de l’inéquation 2x + y > 4.", false, "2 × 0 + 0 = 0, et 0 n’est pas supérieur à 4 : O est du côté hachuré.", DEMI_PLAN),
    ],
    "Applications affines": [
      ask("D’après le graphique, laquelle des deux droites descend ?", ["*celle de g(x) = −x + 3", "celle de f(x) = 2x − 1", "aucune"], "son coefficient directeur, −1, est négatif.", AFFINES),
      howMany("Une course de taxi coûte 500 F de prise en charge, puis 200 F par km jusqu’à 10 km (voir le graphique). Combien coûte une course de 4 km, en francs ?", 1300, "500 + 200 × 4 = 1 300 F.", TAXI),
    ],
    Statistique: [
      howMany("Dans le diagramme circulaire, quel angle correspond au secteur de 25 %, en degrés ?", 90, "25 % de 360° = 0,25 × 360 = 90°.", CIRCULAIRE),
      howMany("Quel angle correspondrait à un secteur de 20 %, en degrés ?", 72, "0,20 × 360 = 72°.", CIRCULAIRE),
    ],
    "Relations trigonométriques": [
      ask("Dans le triangle ABC rectangle en A, cos B̂ est égal à…", ["*AB/BC", "AC/BC", "AC/AB"], "cosinus = côté adjacent ÷ hypoténuse.", TRIGO),
      ask("Dans ce même triangle, tan B̂ est égal à…", ["*AC/AB", "AB/AC", "AB/BC"], "tangente = côté opposé ÷ côté adjacent.", TRIGO),
    ],
    Vecteurs: [
      ask("D’après la figure, la somme des vecteurs AB et BC est le vecteur…", ["*AC", "CA", "BA"], "c’est la relation de Chasles.", CHASLES),
    ],
    "Repérage dans le plan": [
      ask("Avec A(1 ; 3) et B(4 ; −1), les coordonnées du vecteur AB sont…", ["*(3 ; −4)", "(−3 ; 4)", "(5 ; 2)"], "(xB − xA ; yB − yA) = (4 − 1 ; −1 − 3).", COORD),
      howMany("Avec A(1 ; 3) et B(4 ; −1), combien vaut la distance AB ?", 5, "AB² = 3² + (−4)² = 25, donc AB = 5.", COORD),
      tf("Les droites y = 2x + 1 et y = −½x + 3 sont perpendiculaires.", true, "le produit de leurs coefficients directeurs vaut 2 × (−½) = −1.", PERPENDICULAIRES),
    ],
    "Angle inscrit et angle au centre": [
      howMany("Un angle au centre mesure 140°. Combien mesure un angle inscrit qui intercepte le même arc, en degrés ?", 70, "L’angle inscrit vaut la moitié de l’angle au centre : 140 ÷ 2 = 70°.", INSCRIT),
      howMany("Le triangle AMB est inscrit dans un demi-cercle de diamètre [AB]. Combien mesure l’angle en M, en degrés ?", 90, "Un angle inscrit qui intercepte un demi-cercle est droit.", DEMI_CERCLE),
    ],
    "Géométrie dans l’espace": [
      howMany("La pyramide de la figure a une base carrée de 6 cm de côté et une hauteur de 5 cm. Quel est son volume, en cm³ ?", 60, "V = aire de la base × hauteur ÷ 3 = 36 × 5 ÷ 3 = 60 cm³.", PYRAMIDE),
      howMany("Un cône de 120 cm³ est coupé à mi-hauteur, parallèlement à sa base. Quel est le volume du petit cône du haut, en cm³ ?", 15, "Réduction de rapport ½ : les volumes sont multipliés par (½)³ = 1/8, soit 120 ÷ 8 = 15 cm³.", REDUCTION),
    ],
  },
  HG: {
    "L’impérialisme européen et le partage de l’Afrique": [
      ask("D’après la carte, quels sont les deux États africains encore indépendants vers 1914 ?", ["*le Liberia et l’Éthiopie", "le Sénégal et le Mali", "l’Égypte et le Maroc"], "tous les autres sont dominés par des puissances européennes.", AFRIQUE_1914),
    ],
    "La Première Guerre mondiale": [
      ask("D’après la frise, combien d’années séparent la fin de la Première Guerre mondiale (1918) du début de la Seconde (1939) ?", ["*21 ans", "11 ans", "31 ans"], "1939 − 1918 = 21 ans : une génération seulement.", GUERRES),
    ],
    "Les relations Est-Ouest de 1945 aux années 1990": [
      ask("D’après la frise, quel événement de 1989 annonce la fin de la guerre froide ?", ["*la chute du mur de Berlin", "la crise de Cuba", "la création de l’OTAN"], "l’URSS disparaît deux ans plus tard, en 1991.", GUERRE_FROIDE),
      ask("D’après la frise, en quelle année a lieu la crise de Cuba ?", ["*1962", "1949", "1955"], "le monde frôle alors la guerre nucléaire.", GUERRE_FROIDE),
    ],
    "La décolonisation en Afrique": [
      tf("D’après la carte, de nombreux pays d’Afrique deviennent indépendants en 1960.", true, "17 pays : on l’appelle « l’année de l’Afrique ».", INDEPENDANCES),
    ],
    "Le Sénégal de 1944 à 1962": [
      ask("D’après la frise, en quelle année le Sénégal devient-il indépendant ?", ["*1960", "1958", "1946"], "en 1960, d’abord dans la Fédération du Mali, puis seul après son éclatement (20 août 1960).", SENEGAL),
      ask("D’après la frise, quel événement de 1958 précède l’indépendance ?", ["*le référendum", "la conférence de Brazzaville", "la loi-cadre"], "la conférence de Brazzaville date de 1944, la loi-cadre de 1956.", SENEGAL),
    ],
    "Les systèmes économiques et les inégalités de développement": [
      ask("D’après le planisphère, dans quel groupe se trouve la plupart des pays d’Afrique ?", ["*les pays en développement", "les pays développés", "les grands pays émergents"], "c’est un classement simplifié : chaque groupe est très divers.", NORD_SUD),
    ],
    "Ressources, environnement et climat": [
      ask("D’après la courbe, depuis quand la température moyenne de la Terre monte-t-elle vite ?", ["*depuis les années 1980", "depuis 1880", "depuis 2020 seulement"], "les années 2023 à 2025 sont les plus chaudes jamais mesurées.", RECHAUFFEMENT),
    ],
  },
  SVT: {
    "Le système nerveux": [
      ask("D’après le schéma de l’arc réflexe, quel est le centre nerveux du réflexe ?", ["*la moelle épinière", "le cerveau", "le muscle"], "le message ne passe pas par le cerveau : la réaction est très rapide.", REFLEXE),
      ask("Dans le neurone, dans quel sens va le message nerveux ?", ["*des dendrites vers l’axone", "de l’axone vers les dendrites", "dans les deux sens"], "il va des dendrites au corps cellulaire, puis le long de l’axone.", NEURONE),
      tf("L’encéphale et la moelle épinière sont des centres nerveux.", true, "ils sont protégés par le crâne et la colonne vertébrale.", NERVEUX),
    ],
    "La vision": [
      ask("D’après le schéma, sur quelle partie de l’œil se forme l’image ?", ["*la rétine", "la cornée", "le cristallin"], "la rétine est reliée au cerveau par le nerf optique.", OEIL),
      ask("Chez un œil myope, l’image se forme…", ["*avant la rétine", "après la rétine", "sur la rétine"], "le myope voit flou de loin.", DEFAUTS),
    ],
    "La respiration": [
      ask("D’après le schéma, quel gaz passe de l’alvéole vers le sang ?", ["*le dioxygène", "le dioxyde de carbone", "l’azote"], "le dioxyde de carbone fait le chemin inverse.", ALVEOLE),
    ],
    "Le rein et l’excrétion urinaire": [
      ask("D’après le schéma, où l’urine s’accumule-t-elle avant d’être évacuée ?", ["*dans la vessie", "dans les reins", "dans les uretères"], "les uretères la conduisent des reins à la vessie.", URINAIRE),
      ask("Dans le néphron, où se fait la filtration du sang ?", ["*dans le glomérule", "dans la vessie", "dans l’urètre"], "c’est la première étape de la formation de l’urine.", NEPHRON),
    ],
    "La tectonique des plaques": [
      ask("D’après le schéma, comment s’appelle le mouvement de deux plaques qui s’écartent ?", ["*la divergence", "la convergence", "le coulissage"], "il se produit au niveau des dorsales.", PLAQUES),
    ],
    "Le cycle des roches et la chronologie en géologie": [
      ask("D’après le cycle, quelle roche se forme par le refroidissement du magma ?", ["*une roche magmatique", "une roche sédimentaire", "une roche métamorphique"], "comme le basalte ou le granite.", CYCLE),
      ask("D’après la coupe, quelle couche s’est déposée en premier ?", ["*A", "D", "C"], "principe de superposition : la couche la plus basse est la plus ancienne.", DATATION),
    ],
  },
  PC: {
    "Les lentilles minces": [
      ask("D’après le schéma, quelle lentille rassemble la lumière en un point F′ ?", ["*la lentille convergente", "la lentille divergente", "les deux"], "la lentille divergente écarte les rayons.", LENTILLES),
      tf("D’après la construction, l’image A′B′ est renversée par rapport à l’objet AB.", true, "B est au-dessus de l’axe, B′ en dessous.", IMAGE),
    ],
    "La dispersion de la lumière blanche": [
      ask("D’après le schéma, quelle couleur est la plus déviée par le prisme ?", ["*le violet", "le rouge", "le vert"], "le rouge est le moins dévié.", PRISME),
    ],
    "L’équilibre d’un solide soumis à deux forces": [
      howMany("Le solide suspendu pèse 3 N. Quelle est l’intensité de la tension du fil, en newtons ?", 3, "À l’équilibre, T = P : même droite d’action, sens contraires.", EQUILIBRE),
    ],
    "Le principe des actions réciproques": [
      tf("Les deux forces dessinées s’annulent, car elles sont de sens contraires.", false, "elles s’exercent sur deux corps différents (A et B) : elles ne peuvent pas s’annuler.", RECIPROQUES),
    ],
    "Travail et puissance mécaniques": [
      howMany("On soulève un sac de 20 kg de 1,5 m (g = 10 N/kg). Quel est le travail effectué, en joules ?", 300, "W = P × h = 20 × 10 × 1,5 = 300 J.", TRAVAIL),
      howMany("Ce travail de 300 J est effectué en 2 secondes. Quelle est la puissance, en watts ?", 150, "P = W ÷ t = 300 ÷ 2 = 150 W.", TRAVAIL),
    ],
    "L’électrisation par frottement": [
      ask("Deux corps chargés d’électricité de signes contraires…", ["*s’attirent", "se repoussent", "restent immobiles"], "des charges de même signe se repoussent.", ELECTRISATION),
    ],
    "Le courant électrique": [
      howMany("Dans le circuit, I₁ = 0,3 A et I₂ = 0,5 A. Quelle est l’intensité I dans la branche principale, en ampères ?", 0.8, "Loi des nœuds : I = I₁ + I₂ = 0,3 + 0,5 = 0,8 A.", NOEUDS),
    ],
    "La résistance électrique et la loi d’Ohm": [
      howMany("D’après la caractéristique U = 100 × I, quelle tension correspond à I = 0,04 A, en volts ?", 4, "U = 100 × 0,04 = 4 V.", OHM),
      howMany("Deux résistances de 100 Ω et 200 Ω sont montées en série. Quelle est la résistance équivalente, en ohms ?", 300, "En série, les résistances s’ajoutent : 100 + 200 = 300 Ω.", RESISTANCES),
    ],
    "La calorimétrie": [
      tf("La paroi isolante du calorimètre limite les échanges de chaleur avec l’extérieur.", true, "toute la chaleur cédée par l’eau chaude est alors reçue par l’eau froide.", CALORIMETRE),
    ],
    "Les solutions aqueuses": [
      howMany("On prélève 50 mL d’une solution à 0,2 mol/L et on complète à 200 mL. Quelle est la nouvelle concentration, en mol/L ?", 0.05, "Le volume est multiplié par 4 : 0,2 ÷ 4 = 0,05 mol/L.", DILUTION),
    ],
    "Solutions acides et solutions basiques": [
      ask("D’après l’échelle, une solution de pH 3 est…", ["*acide", "neutre", "basique"], "son pH est inférieur à 7.", PH),
      ask("Quelle couleur prend le BBT dans une solution basique ?", ["*bleu", "jaune", "vert"], "jaune en milieu acide, vert en milieu neutre.", BBT),
    ],
    "Les hydrocarbures": [
      howMany("D’après les formules, combien d’atomes d’hydrogène contient une molécule de propane ?", 8, "Propane : C₃H₈ (formule CₙH₂ₙ₊₂ avec n = 3).", ALCANES),
      howMany("Combien de liaisons forme chaque atome de carbone dans ces formules développées ?", 4, "Le carbone est tétravalent : il forme toujours 4 liaisons.", ALCANES),
    ],
  },
};
