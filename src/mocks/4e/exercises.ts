import "server-only";

// Exercices corrigés de 4e : une série par chapitre, écrite par DIANGAL d’après les leçons (à faire
// relire par des enseignants). Corrigés inclus : ce fichier ne doit jamais atteindre le navigateur.

import { CHAPTERS_4E } from "../curriculum-4e";
import { buildExerciseSeries, type ExerciseSeries } from "../exercise-series";

const SERIES: ExerciseSeries[] = [
  // ── Mathématiques ──────────────────────────────────────────────────────────
  { subject: "MATH", chapter: "Les nombres rationnels", questions: [
    { qcm: "2/3 + 5/6 =", choices: ["7/9", "*3/2", "7/6"], why: "4/6 + 5/6 = 9/6 = 3/2." },
    { qcm: "L’inverse de −5/7 est…", choices: ["5/7", "*−7/5", "7/5"], why: "On échange numérateur et dénominateur ; le signe reste." },
    { num: "Calcule 2 puissance −1 (en écriture décimale).", answer: 0.5, why: "2⁻¹ = 1/2 = 0,5." },
  ] },
  { subject: "MATH", chapter: "Le calcul algébrique", questions: [
    { qcm: "(x + 3)² =", choices: ["x² + 9", "*x² + 6x + 9", "x² + 3x + 9"], why: "(a + b)² = a² + 2ab + b²." },
    { qcm: "x² − 9 se factorise en…", choices: ["(x − 3)²", "*(x − 3)(x + 3)", "(x − 9)(x + 1)"], why: "a² − b² = (a − b)(a + b)." },
    { num: "Calcule 102 × 98 avec une égalité remarquable.", answer: 9996, why: "(100 + 2)(100 − 2) = 10 000 − 4 = 9 996." },
  ] },
  { subject: "MATH", chapter: "Les équations à une inconnue", questions: [
    { num: "Résous 5x − 15 = 0.", answer: 3, why: "5x = 15, donc x = 3." },
    { qcm: "Les solutions de (2x − 4)(x + 3) = 0 sont…", choices: ["*2 et −3", "4 et 3", "−2 et 3"], why: "Un produit est nul si l’un de ses facteurs est nul." },
    { num: "Awa a 3 ans de plus que son frère ; ensemble ils ont 27 ans. Quel âge a Awa ?", answer: 15, why: "x + x + 3 = 27, x = 12 ; Awa a 15 ans." },
  ] },
  { subject: "MATH", chapter: "Inéquations et systèmes d’inéquations à une inconnue", questions: [
    { qcm: "Les solutions de −2x + 4 &gt; 0 sont…", choices: ["x &gt; 2", "*x &lt; 2", "x &gt; −2"], why: "On divise par −2 : le sens change." },
    { qcm: "« x ≥ 1 » s’écrit sous forme d’intervalle…", choices: ["]1 ; +∞[", "*[1 ; +∞[", "]−∞ ; 1]"], why: "Le crochet est tourné vers 1 car 1 est inclus." },
    { qcm: "Le système x − 1 ≥ 0 et 2x − 8 &lt; 0 a pour solutions…", choices: ["*[1 ; 4[", "]1 ; 4]", "[4 ; +∞["], why: "x ≥ 1 et x &lt; 4." },
  ] },
  { subject: "MATH", chapter: "Les applications linéaires", questions: [
    { num: "f(x) = 1 500x. Calcule f(4).", answer: 6000, why: "1 500 × 4 = 6 000." },
    { num: "f(x) = 3x. Quel est l’antécédent de 21 ?", answer: 7, why: "3x = 21, donc x = 7." },
    { qcm: "La représentation graphique d’une application linéaire est…", choices: ["*une droite passant par l’origine", "une courbe", "une droite qui ne passe jamais par l’origine"], why: "f(0) = 0." },
  ] },
  { subject: "MATH", chapter: "La statistique", questions: [
    { qcm: "Le mode d’une série est…", choices: ["la moyenne", "*la valeur de plus grand effectif", "la plus grande valeur"], why: "C’est la valeur la plus fréquente." },
    { num: "Notes : 8, 10, 12, 10, 14, 6. Quelle est la moyenne ?", answer: 10, why: "60 ÷ 6 = 10." },
    { num: "Dans un diagramme circulaire, quel angle (en degrés) correspond à une fréquence de 0,25 ?", answer: 90, why: "0,25 × 360 = 90." },
  ] },
  { subject: "MATH", chapter: "La distance", questions: [
    { qcm: "Deux cercles de rayons 3 cm et 2 cm dont les centres sont à 5 cm sont…", choices: ["sécants", "*tangents extérieurement", "disjoints"], why: "d = r + r’ = 5." },
    { qcm: "Une droite à 4 cm du centre d’un cercle de rayon 4 cm est…", choices: ["sécante", "*tangente", "extérieure"], why: "d = r." },
    { vf: "On peut construire un triangle de côtés 2 cm, 3 cm et 6 cm.", answer: false, why: "6 &gt; 2 + 3." },
  ] },
  { subject: "MATH", chapter: "La droite des milieux", questions: [
    { num: "I et J sont les milieux de [AB] et [AC] ; BC = 8 cm. Combien mesure IJ (en cm) ?", answer: 4, why: "IJ est la moitié de BC." },
    { qcm: "La droite (IJ) est…", choices: ["perpendiculaire à (BC)", "*parallèle à (BC)", "confondue avec (BC)"], why: "Théorème de la droite des milieux." },
    { qcm: "La parallèle à (BC) passant par le milieu de [AB] coupe [AC]…", choices: ["*en son milieu", "au tiers", "en A"], why: "Troisième théorème." },
  ] },
  { subject: "MATH", chapter: "Droites remarquables dans un triangle", questions: [
    { qcm: "Les médianes d’un triangle se coupent au…", choices: ["*centre de gravité", "centre du cercle inscrit", "orthocentre"], why: "Point de concours des médianes." },
    { qcm: "Le centre du cercle inscrit est le point de concours des…", choices: ["médiatrices", "*bissectrices", "hauteurs"], why: "Il est à égale distance des côtés." },
    { num: "La médiane [AA’] mesure 9 cm. Combien mesure AG (en cm) ?", answer: 6, why: "AG = 2/3 × 9 = 6." },
  ] },
  { subject: "MATH", chapter: "Le triangle rectangle", questions: [
    { num: "ABC est rectangle en A, AB = 6 cm et AC = 8 cm. Combien mesure BC (en cm) ?", answer: 10, why: "BC² = 36 + 64 = 100." },
    { vf: "Un triangle de côtés 5, 12 et 13 est rectangle.", answer: true, why: "25 + 144 = 169 = 13²." },
    { num: "ABC rectangle en A, AB = 6, AC = 8, BC = 10. Combien mesure la hauteur AH ?", answer: 4.8, why: "AH = AB × AC ÷ BC = 48 ÷ 10." },
  ] },
  { subject: "MATH", chapter: "Translations et vecteurs", questions: [
    { qcm: "Une translation transforme un segment en un segment…", choices: ["*parallèle et de même longueur", "perpendiculaire", "deux fois plus long"], why: "Elle conserve les longueurs et la direction." },
    { qcm: "ABCD est un parallélogramme si et seulement si…", choices: ["AB⃗ = CD⃗", "*AB⃗ = DC⃗", "AC⃗ = BD⃗"], why: "Attention à l’ordre des lettres." },
    { qcm: "Si AI⃗ = IB⃗, alors I est…", choices: ["*le milieu de [AB]", "sur la médiatrice seulement", "confondu avec A"], why: "Propriété du milieu." },
  ] },
  { subject: "MATH", chapter: "Rotations et polygones réguliers", questions: [
    { num: "Un polygone régulier a 6 côtés. Quel est l’angle au centre (en degrés) ?", answer: 60, why: "360 ÷ 6 = 60." },
    { qcm: "Une rotation conserve…", choices: ["*les longueurs et les angles", "seulement les angles", "rien"], why: "C’est un déplacement." },
    { num: "Longueur (en cm, arrondie au centième) d’un arc de rayon 6 cm intercepté par un angle au centre de 60° (π ≈ 3,14) ?", answer: 6.28, why: "2 × 3,14 × 6 × 60 ÷ 360 = 6,28." },
  ] },
  { subject: "MATH", chapter: "Projection orthogonale et repérage", questions: [
    { num: "A(1 ; 2) et B(4 ; 6). Calcule AB.", answer: 5, why: "AB² = 9 + 16 = 25." },
    { qcm: "Le milieu de [AB] avec A(1 ; 2) et B(4 ; 6) est…", choices: ["*(2,5 ; 4)", "(3 ; 4)", "(5 ; 8)"], why: "(1 + 4) ÷ 2 et (2 + 6) ÷ 2." },
    { vf: "Le projeté orthogonal du milieu d’un segment est le milieu du segment projeté.", answer: true, why: "La projection orthogonale conserve le milieu." },
  ] },
  { subject: "MATH", chapter: "Géométrie dans l’espace", questions: [
    { num: "Sphère de rayon 5 cm coupée par un plan à 3 cm du centre : rayon de la section (en cm) ?", answer: 4, why: "r² = 25 − 9 = 16." },
    { qcm: "La section d’une sphère par un plan passant par son centre est…", choices: ["un point", "*un grand cercle", "une ellipse"], why: "Cercle de même rayon que la sphère." },
    { qcm: "Une droite est perpendiculaire à un plan si elle est perpendiculaire à…", choices: ["une droite du plan", "*deux droites sécantes du plan", "aucune droite du plan"], why: "Définition du cours." },
  ] },
  // ── Sciences physiques ─────────────────────────────────────────────────────
  { subject: "PC", chapter: "Grandeurs physiques et mesures", questions: [
    { qcm: "L’unité de masse du Système international est…", choices: ["le gramme", "*le kilogramme", "le newton"], why: "Symbole kg." },
    { num: "Combien de litres y a-t-il dans 1 m³ ?", answer: 1000, why: "1 m³ = 1 000 dm³ = 1 000 L." },
    { qcm: "On mesure un volume de liquide avec…", choices: ["*une éprouvette graduée", "un dynamomètre", "un thermomètre"], why: "Instrument de mesure des volumes." },
  ] },
  { subject: "PC", chapter: "Masse, masse volumique et densité", questions: [
    { num: "Un caillou de 54 g occupe 20 cm³. Quelle est sa masse volumique (en g/cm³) ?", answer: 2.7, why: "54 ÷ 20 = 2,7." },
    { qcm: "Un corps de densité 0,8 dans l’eau…", choices: ["*flotte", "coule", "se dissout toujours"], why: "Densité inférieure à 1." },
    { num: "Quelle est la masse volumique de l’eau en kg/m³ ?", answer: 1000, why: "1 g/cm³ = 1 000 kg/m³." },
  ] },
  { subject: "PC", chapter: "Le poids et la relation poids-masse", questions: [
    { num: "Poids (en N) d’un sac de 50 kg, avec g = 10 N/kg ?", answer: 500, why: "P = m × g = 50 × 10." },
    { qcm: "Le poids se mesure avec…", choices: ["une balance", "*un dynamomètre", "une éprouvette"], why: "Le poids est une force." },
    { vf: "Sur la Lune, la masse d’un objet est plus petite que sur la Terre.", answer: false, why: "La masse ne change pas ; c’est le poids qui diminue." },
  ] },
  { subject: "PC", chapter: "Introduction à l’électricité", questions: [
    { qcm: "Lequel est un isolant ?", choices: ["le cuivre", "*le plastique", "le fer"], why: "Les métaux sont conducteurs." },
    { qcm: "Dans un circuit en série, si une lampe grille…", choices: ["*toutes les lampes s’éteignent", "les autres brillent plus", "rien ne change"], why: "Le circuit est ouvert." },
    { qcm: "Une pile est…", choices: ["*un générateur", "un récepteur", "un isolant"], why: "Elle fournit le courant." },
  ] },
  { subject: "PC", chapter: "Sources et propagation de la lumière", questions: [
    { qcm: "La Lune est…", choices: ["une source primaire", "*un objet diffusant", "un récepteur"], why: "Elle renvoie la lumière du Soleil." },
    { qcm: "Dans un milieu homogène, la lumière se propage…", choices: ["*en ligne droite", "en zigzag", "en cercle"], why: "Propagation rectiligne." },
    { qcm: "Lors d’une éclipse de Lune…", choices: ["*la Lune passe dans l’ombre de la Terre", "la Lune cache le Soleil", "le Soleil cache la Lune"], why: "Soleil, Terre, Lune alignés dans cet ordre." },
  ] },
  { subject: "PC", chapter: "Réflexion et réfraction de la lumière", questions: [
    { num: "Un rayon arrive sur un miroir avec un angle d’incidence de 35°. Quel est l’angle de réflexion (en degrés) ?", answer: 35, why: "i = r." },
    { qcm: "Un bâton plongé dans l’eau paraît brisé à cause de…", choices: ["la réflexion", "*la réfraction", "l’ombre"], why: "La lumière change de direction en changeant de milieu." },
    { qcm: "Les angles se mesurent par rapport…", choices: ["à la surface", "*à la normale", "au rayon réfléchi"], why: "La normale est perpendiculaire à la surface." },
  ] },
  { subject: "PC", chapter: "Mélanges et corps purs", questions: [
    { qcm: "L’eau salée est un mélange…", choices: ["*homogène", "hétérogène", "pur"], why: "On ne distingue qu’une phase." },
    { qcm: "Pour récupérer le sel de l’eau de mer, on utilise…", choices: ["la filtration", "*l’évaporation", "la décantation"], why: "L’eau s’évapore, le sel reste." },
    { num: "À quelle température (°C) l’eau pure bout-elle sous pression normale ?", answer: 100, why: "Température fixe d’un corps pur." },
  ] },
  { subject: "PC", chapter: "La structure de la matière", questions: [
    { qcm: "La formule de l’eau est…", choices: ["HO₂", "*H₂O", "H₂O₂"], why: "2 atomes d’hydrogène et 1 d’oxygène." },
    { num: "Combien d’atomes contient une molécule de CO₂ ?", answer: 3, why: "1 C + 2 O." },
    { qcm: "Le symbole du fer est…", choices: ["F", "*Fe", "Fr"], why: "Du latin ferrum." },
  ] },
  { subject: "PC", chapter: "La réaction chimique", questions: [
    { qcm: "Au cours d’une réaction chimique, la masse totale…", choices: ["*se conserve", "augmente toujours", "diminue toujours"], why: "Loi de Lavoisier." },
    { qcm: "La combustion du carbone produit…", choices: ["*du dioxyde de carbone", "de l’eau seulement", "du dioxygène"], why: "C + O₂ → CO₂." },
    { qcm: "Le dioxyde de carbone est mis en évidence par…", choices: ["*l’eau de chaux qui se trouble", "le sulfate de cuivre", "une allumette qui s’éteint seulement"], why: "Test caractéristique du CO₂." },
  ] },
  { subject: "PC", chapter: "La mole et les grandeurs molaires", questions: [
    { num: "Masse molaire de l’eau H₂O (en g/mol), avec H = 1 et O = 16 ?", answer: 18, why: "2 × 1 + 16." },
    { num: "Combien de moles y a-t-il dans 36 g d’eau ?", answer: 2, why: "n = 36 ÷ 18." },
    { num: "Masse molaire de CO₂ (en g/mol), avec C = 12 et O = 16 ?", answer: 44, why: "12 + 2 × 16." },
  ] },
  // ── SVT ────────────────────────────────────────────────────────────────────
  { subject: "SVT", chapter: "La digestion et l’absorption intestinale", questions: [
    { qcm: "L’amylase salivaire transforme l’amidon en…", choices: ["*maltose", "acides aminés", "graisses"], why: "Test à l’eau iodée." },
    { qcm: "L’absorption des nutriments a lieu surtout dans…", choices: ["l’estomac", "*l’intestin grêle", "l’œsophage"], why: "Grâce aux villosités." },
    { qcm: "Les nutriments issus des protéines sont…", choices: ["le glucose", "*les acides aminés", "les acides gras"], why: "Les protéines sont formées d’acides aminés." },
  ] },
  { subject: "SVT", chapter: "Le sang : composition et maladies", questions: [
    { qcm: "Les globules rouges transportent…", choices: ["*le dioxygène", "les anticorps seulement", "les plaquettes"], why: "Grâce à l’hémoglobine." },
    { qcm: "Les plaquettes servent à…", choices: ["*la coagulation", "la digestion", "la respiration"], why: "Elles arrêtent les saignements." },
    { qcm: "La drépanocytose est une maladie…", choices: ["*héréditaire", "due à un virus", "due au manque de vitamine C"], why: "Elle se transmet par les parents." },
  ] },
  { subject: "SVT", chapter: "La circulation sanguine", questions: [
    { num: "Combien de cavités le cœur possède-t-il ?", answer: 4, why: "Deux oreillettes, deux ventricules." },
    { qcm: "Les vaisseaux qui partent du cœur sont…", choices: ["*les artères", "les veines", "les capillaires"], why: "Artères : du cœur vers les organes." },
    { qcm: "Un facteur de risque de l’hypertension est…", choices: ["*manger trop salé", "boire de l’eau", "dormir"], why: "Le sel augmente la pression." },
  ] },
  { subject: "SVT", chapter: "La contamination par les micro-organismes", questions: [
    { qcm: "Le paludisme est transmis par…", choices: ["*la piqûre de l’anophèle", "l’eau", "la toux"], why: "Moustique femelle anophèle." },
    { vf: "Les antibiotiques sont efficaces contre les virus.", answer: false, why: "Ils agissent sur les bactéries." },
    { qcm: "Le choléra se transmet surtout par…", choices: ["*l’eau et les aliments souillés", "les piqûres", "le soleil"], why: "Maladie liée au manque d’hygiène." },
  ] },
  { subject: "SVT", chapter: "La puberté et les organes reproducteurs", questions: [
    { qcm: "Les spermatozoïdes sont produits par…", choices: ["*les testicules", "la prostate", "les ovaires"], why: "Glandes génitales mâles." },
    { num: "Combien de jours dure en moyenne un cycle menstruel ?", answer: 28, why: "Environ 28 jours." },
    { qcm: "Les transformations de la puberté sont commandées par…", choices: ["*des hormones", "les muscles", "la digestion"], why: "Testostérone, œstrogènes." },
  ] },
  { subject: "SVT", chapter: "De la fécondation à l’accouchement", questions: [
    { qcm: "La fécondation a lieu dans…", choices: ["l’utérus", "*une trompe", "l’ovaire"], why: "Rencontre de l’ovule et du spermatozoïde." },
    { qcm: "Les échanges entre la mère et le fœtus se font par…", choices: ["*le placenta", "l’estomac", "les poumons"], why: "Et le cordon ombilical." },
    { num: "Combien de mois dure environ une grossesse ?", answer: 9, why: "Environ neuf mois." },
  ] },
  { subject: "SVT", chapter: "Éviter une grossesse précoce et les IST", questions: [
    { qcm: "Le moyen qui protège à la fois des IST et de la grossesse est…", choices: ["*le préservatif", "la pilule seule", "aucun"], why: "Barrière physique." },
    { vf: "Le VIH est une infection sexuellement transmissible.", answer: true, why: "Il se transmet aussi par le sang." },
    { qcm: "En cas de question, on peut s’adresser à…", choices: ["*l’infirmerie scolaire ou un centre de santé", "personne", "un inconnu sur internet"], why: "Des professionnels peuvent conseiller." },
  ] },
  { subject: "SVT", chapter: "La transmission des caractères héréditaires", questions: [
    { num: "Combien de chromosomes a une cellule humaine (hors cellules reproductrices) ?", answer: 46, why: "23 paires." },
    { qcm: "Le sexe de l’enfant est déterminé par…", choices: ["l’ovule", "*le spermatozoïde", "le placenta"], why: "Il porte X ou Y." },
    { qcm: "Lequel est un caractère acquis ?", choices: ["le groupe sanguin", "*une cicatrice", "la couleur des yeux"], why: "Il ne se transmet pas." },
  ] },
  { subject: "SVT", chapter: "Les séismes et la structure du globe", questions: [
    { qcm: "Le point de la surface situé au-dessus du foyer est…", choices: ["*l’épicentre", "le cratère", "le noyau"], why: "Définition." },
    { num: "À quelle profondeur (en km) commence le noyau terrestre ?", answer: 2900, why: "Limite manteau-noyau." },
    { qcm: "La magnitude d’un séisme mesure…", choices: ["*l’énergie libérée", "les dégâts", "la durée"], why: "Échelle de Richter." },
  ] },
  { subject: "SVT", chapter: "Le volcanisme", questions: [
    { qcm: "Une lave fluide donne une éruption…", choices: ["*effusive", "explosive", "sismique"], why: "Coulées de lave." },
    { qcm: "Les Mamelles de Dakar sont…", choices: ["*d’anciens volcans", "des dunes", "des termitières"], why: "Volcanisme du Cap-Vert." },
    { qcm: "Les nuées ardentes sont typiques des volcans…", choices: ["effusifs", "*explosifs", "éteints"], why: "Lave visqueuse." },
  ] },
  { subject: "SVT", chapter: "Les roches magmatiques", questions: [
    { qcm: "Le granite est une roche…", choices: ["*plutonique", "volcanique", "sédimentaire"], why: "Refroidissement lent en profondeur." },
    { qcm: "Le basalte a refroidi…", choices: ["*rapidement, en surface", "lentement, en profondeur", "dans l’eau seulement"], why: "Roche volcanique." },
    { qcm: "Au Sénégal, le granite affleure dans la région de…", choices: ["*Kédougou", "Louga", "Dakar"], why: "Socle du sud-est." },
  ] },
  // ── Histoire-géographie ────────────────────────────────────────────────────
  { subject: "HG", chapter: "L’Afrique au XVIe siècle", questions: [
    { num: "En quelle année Bartolomeu Dias contourne-t-il le cap de Bonne-Espérance ?", answer: 1488, why: "Les Portugais ouvrent la route des Indes." },
    { qcm: "Au XVIe siècle, le commerce africain se tourne vers…", choices: ["le Sahara", "*la côte atlantique", "la mer Rouge"], why: "« De la caravane à la caravelle »." },
    { qcm: "La chute du Songhaï (1591) accélère…", choices: ["*le déclin du commerce transsaharien", "l’essor du Ghana", "la fondation de Saint-Louis"], why: "Bataille de Tondibi." },
  ] },
  { subject: "HG", chapter: "L’Asie et le Nouveau Monde au XVIe siècle", questions: [
    { qcm: "L’empire aztèque est conquis par…", choices: ["*Cortès", "Pizarro", "Vasco de Gama"], why: "1519-1521." },
    { qcm: "Goa (1510) est un comptoir…", choices: ["*portugais", "espagnol", "anglais"], why: "En Inde." },
    { qcm: "La baisse de la population amérindienne pousse les colons à…", choices: ["*faire venir des captifs d’Afrique", "quitter l’Amérique", "abandonner les plantations"], why: "Origine de la traite atlantique." },
  ] },
  { subject: "HG", chapter: "La traite négrière : naissance, mécanisme et évolution", questions: [
    { qcm: "Dans le commerce triangulaire, l’Amérique envoie vers l’Europe…", choices: ["des captifs", "*du sucre, du café, du coton", "des armes"], why: "Produits des plantations." },
    { qcm: "La traversée de l’Atlantique par les captifs s’appelle…", choices: ["*le passage du milieu", "la route des épices", "le grand voyage"], why: "Elle était meurtrière." },
    { vf: "Plus de 12 millions d’Africains ont été embarqués par la traite atlantique.", answer: true, why: "Ordre de grandeur admis par les historiens." },
  ] },
  { subject: "HG", chapter: "Les conséquences de la traite négrière", questions: [
    { qcm: "Pour l’Afrique, la traite a provoqué…", choices: ["*une perte massive de population jeune", "un essor industriel", "la paix"], why: "Saignée démographique." },
    { qcm: "Un port européen enrichi par la traite :", choices: ["*Nantes", "Tombouctou", "Gorée"], why: "Les armateurs s’y enrichissent." },
    { vf: "La traite a affaibli l’Afrique et préparé sa domination coloniale.", answer: true, why: "Conséquence à long terme." },
  ] },
  { subject: "HG", chapter: "La traite au Sénégal et le mouvement abolitionniste", questions: [
    { num: "En quelle année la France abolit-elle définitivement l’esclavage ?", answer: 1848, why: "Victor Schœlcher." },
    { num: "En quelle année Saint-Louis est-il fondé ?", answer: 1659, why: "Comptoir français." },
    { qcm: "Haïti devient indépendant en…", choices: ["*1804", "1848", "1960"], why: "Révolte des esclaves de Saint-Domingue." },
  ] },
  { subject: "HG", chapter: "La Sénégambie : dislocation du Jolof et nouveaux royaumes", questions: [
    { qcm: "Le souverain du Kayor porte le titre de…", choices: ["Bour", "*Damel", "Brak"], why: "Après Danki." },
    { qcm: "À Danki, le Bourba Jolof est battu par…", choices: ["*Amary Ngoné Sobel Fall", "Lat Dior", "Koli Tenguella"], why: "Vers 1549." },
    { qcm: "Le Brak règne sur…", choices: ["*le Waalo", "le Baol", "le Sine"], why: "Royaume du nord-ouest." },
  ] },
  { subject: "HG", chapter: "Le Fouta et les héritiers du Gaabu", questions: [
    { num: "En quelle année la révolution des almamy éclate-t-elle au Fouta Toro ?", answer: 1776, why: "Thierno Souleymane Baal." },
    { qcm: "La dynastie renversée en 1776 est celle des…", choices: ["*Denianké", "Keïta", "Askia"], why: "Fondée par Koli Tenguella." },
    { qcm: "Le royaume du Fouladou est fondé par…", choices: ["*Alfa Molo", "El Hadji Omar", "Ndiadiane Ndiaye"], why: "Après la chute de Kansala." },
  ] },
  { subject: "HG", chapter: "Les empires peuls du Sokoto et du Macina", questions: [
    { qcm: "Le califat de Sokoto est fondé par…", choices: ["*Ousmane dan Fodio", "Sékou Amadou", "Samory Touré"], why: "Jihad de 1804." },
    { qcm: "La capitale de la Diina du Macina est…", choices: ["*Hamdallahi", "Sokoto", "Ségou"], why: "Fondée par Sékou Amadou." },
    { num: "En quelle année Ousmane dan Fodio lance-t-il son jihad ?", answer: 1804, why: "Contre les rois haoussas." },
  ] },
  { subject: "HG", chapter: "L’empire toucouleur d’El Hadji Omar Tall", questions: [
    { num: "En quelle année El Hadji Omar assiège-t-il Médine ?", answer: 1857, why: "Il s’y heurte à Faidherbe." },
    { qcm: "El Hadji Omar appartient à la confrérie…", choices: ["*tidiane", "mouride", "layène"], why: "La Tidjaniyya." },
    { qcm: "El Hadji Omar meurt en 1864 près de…", choices: ["*Bandiagara", "Dakar", "Saint-Louis"], why: "Dans les falaises." },
  ] },
  { subject: "HG", chapter: "Tchaka et les Zoulous ; Madagascar", questions: [
    { qcm: "Tchaka est roi des…", choices: ["*Zoulous", "Merina", "Haoussas"], why: "En Afrique australe." },
    { qcm: "Les grands déplacements de populations provoqués par les conquêtes zouloues s’appellent…", choices: ["*le Mfecane", "le Jihad", "la Diina"], why: "Début du XIXe siècle." },
    { qcm: "Le royaume qui domine Madagascar au XIXe siècle est…", choices: ["*le royaume merina", "le royaume zoulou", "le Kayor"], why: "Capitale Tananarive." },
  ] },
  { subject: "HG", chapter: "La première révolution industrielle", questions: [
    { qcm: "La révolution industrielle commence en…", choices: ["*Grande-Bretagne", "France", "Russie"], why: "Fin du XVIIIe siècle." },
    { qcm: "La machine à vapeur est améliorée par…", choices: ["*James Watt", "Montesquieu", "Gutenberg"], why: "Vers 1769." },
    { qcm: "La nouvelle classe sociale des travailleurs d’usine est…", choices: ["la noblesse", "*le prolétariat", "le clergé"], why: "La classe ouvrière." },
  ] },
  { subject: "HG", chapter: "Les Lumières et la Révolution française", questions: [
    { qcm: "La séparation des pouvoirs est défendue par…", choices: ["*Montesquieu", "Voltaire", "Diderot"], why: "De l’esprit des lois, 1748." },
    { num: "En quelle année a lieu la prise de la Bastille ?", answer: 1789, why: "Le 14 juillet." },
    { qcm: "La Déclaration des droits de l’homme et du citoyen date du…", choices: ["14 juillet 1789", "*26 août 1789", "4 août 1789"], why: "Adoptée par l’Assemblée nationale." },
  ] },
  { subject: "HG", chapter: "La naissance des États-Unis et l’Empire ottoman", questions: [
    { num: "En quelle année les treize colonies proclament-elles leur indépendance ?", answer: 1776, why: "Le 4 juillet." },
    { qcm: "Le premier président des États-Unis est…", choices: ["*George Washington", "Thomas Jefferson", "Abraham Lincoln"], why: "Élu en 1789." },
    { num: "En quelle année les Ottomans prennent-ils Constantinople ?", answer: 1453, why: "Elle devient Istanbul." },
  ] },
  { subject: "HG", chapter: "Méthodes : dissertation et commentaire de document", questions: [
    { qcm: "L’introduction d’une dissertation se termine par…", choices: ["*l’annonce du plan", "la conclusion", "une citation seulement"], why: "On annonce les parties." },
    { qcm: "Pour commenter un document, on commence par…", choices: ["*le présenter (nature, auteur, date)", "le recopier", "donner son avis"], why: "Présentation d’abord." },
    { vf: "Commenter un document, c’est le paraphraser.", answer: false, why: "On l’explique avec ses connaissances." },
  ] },
  { subject: "HG", chapter: "L’Afrique de l’Ouest : développement et intégration", questions: [
    { num: "En quelle année la CEDEAO est-elle créée ?", answer: 1975, why: "Traité de Lagos." },
    { num: "Combien d’États l’UEMOA regroupe-t-elle ?", answer: 8, why: "Ils utilisent le franc CFA." },
    { qcm: "Un obstacle à l’intégration est…", choices: ["*les tracasseries aux frontières", "la langue commune", "les routes modernes"], why: "Elles freinent les échanges." },
  ] },
  { subject: "HG", chapter: "L’Afrique : milieux, population et développement", questions: [
    { num: "Combien d’États compte l’Afrique ?", answer: 54, why: "États reconnus par l’ONU." },
    { qcm: "Le plus haut sommet d’Afrique est…", choices: ["*le Kilimandjaro", "le mont Cameroun", "l’Everest"], why: "Environ 5 895 m." },
    { qcm: "La dépendance de l’Afrique vient notamment de…", choices: ["*l’exportation de matières premières brutes", "l’industrie lourde", "l’absence de ressources"], why: "Peu de transformation sur place." },
  ] },
  { subject: "HG", chapter: "L’Europe", questions: [
    { num: "Combien d’États compte l’Union européenne ?", answer: 27, why: "Depuis le départ du Royaume-Uni." },
    { qcm: "Le climat de l’ouest de l’Europe est…", choices: ["*océanique", "désertique", "équatorial"], why: "Influence de l’Atlantique." },
    { qcm: "La population européenne est…", choices: ["*vieillissante", "très jeune", "surtout rurale"], why: "Faible natalité." },
  ] },
  { subject: "HG", chapter: "L’Amérique", questions: [
    { qcm: "La chaîne de montagnes de l’ouest de l’Amérique du Sud est…", choices: ["*les Andes", "les Alpes", "l’Himalaya"], why: "Les Rocheuses sont au nord." },
    { qcm: "Le Mercosur est une organisation…", choices: ["*d’Amérique du Sud", "d’Europe", "d’Afrique"], why: "Intégration régionale." },
    { qcm: "Un pays très pauvre d’Amérique :", choices: ["*Haïti", "le Canada", "les États-Unis"], why: "Fortes disparités." },
  ] },
  { subject: "HG", chapter: "L’Asie", questions: [
    { qcm: "Le plus haut sommet du monde est…", choices: ["*l’Everest", "le Kilimandjaro", "l’Aconcagua"], why: "Dans l’Himalaya." },
    { qcm: "L’Asie regroupe environ … de l’humanité.", choices: ["20 %", "*60 %", "90 %"], why: "Continent le plus peuplé." },
    { qcm: "Le climat de l’Asie du Sud est marqué par…", choices: ["*la mousson", "le froid polaire", "l’absence de pluie"], why: "Saison des pluies très forte." },
  ] },
  { subject: "HG", chapter: "L’Océanie", questions: [
    { qcm: "Le pays le plus riche et le plus peuplé d’Océanie est…", choices: ["*l’Australie", "les Fidji", "Tahiti"], why: "Mines, élevage, services." },
    { qcm: "Beaucoup de petites îles du Pacifique sont menacées par…", choices: ["*la montée des eaux", "le désert", "le froid"], why: "Réchauffement climatique." },
    { qcm: "L’Australie exporte surtout…", choices: ["*du fer et du charbon", "du cacao", "de l’arachide"], why: "Vers l’Asie." },
  ] },
  // ── Français ───────────────────────────────────────────────────────────────
  { subject: "FR", chapter: "La nouvelle", questions: [
    { qcm: "La fin inattendue d’une nouvelle s’appelle…", choices: ["*la chute", "la morale", "le dénouement heureux"], why: "Elle surprend le lecteur." },
    { vf: "La nouvelle est un récit long avec de nombreux personnages.", answer: false, why: "C’est un récit bref." },
    { qcm: "Une nouvelle où l’irrationnel surgit dans le réel est…", choices: ["*fantastique", "réaliste", "policière"], why: "Hésitation entre réel et surnaturel." },
  ] },
  { subject: "FR", chapter: "La poésie de la Négritude", questions: [
    { qcm: "Lequel n’est pas un fondateur de la Négritude ?", choices: ["Senghor", "Césaire", "*Victor Hugo"], why: "Senghor, Césaire et Damas." },
    { qcm: "« Écoute plus souvent / Les Choses que les Êtres » est de…", choices: ["*Birago Diop", "Senghor", "Camara Laye"], why: "Poème « Souffles »." },
    { qcm: "La Négritude affirme…", choices: ["*les valeurs des cultures noires", "la supériorité de l’Europe", "l’oubli du passé"], why: "Face au colonialisme." },
  ] },
  { subject: "FR", chapter: "Le théâtre", questions: [
    { qcm: "Un personnage qui parle seul sur scène fait…", choices: ["*un monologue", "un aparté", "une didascalie"], why: "Il se parle à lui-même." },
    { qcm: "L’Exil d’Albouri est de…", choices: ["*Cheik Aliou Ndao", "Senghor", "Mariama Bâ"], why: "Pièce de 1967." },
    { qcm: "Le théâtre avance par…", choices: ["*le dialogue", "la description", "le résumé"], why: "Échange de répliques." },
  ] },
  { subject: "FR", chapter: "Le roman africain", questions: [
    { qcm: "L’Enfant noir est de…", choices: ["*Camara Laye", "Birago Diop", "Ousmane Sembène"], why: "Roman de 1953." },
    { qcm: "Un récit où l’auteur raconte sa propre vie est…", choices: ["*autobiographique", "fantastique", "théâtral"], why: "Récit à la première personne." },
    { vf: "Le roman est un récit en prose.", answer: true, why: "Et non en vers." },
  ] },
  { subject: "FR", chapter: "La phrase complexe", questions: [
    { qcm: "« Il pleut, donc nous restons. » Les propositions sont…", choices: ["juxtaposées", "*coordonnées", "subordonnées"], why: "« donc » est une conjonction de coordination." },
    { num: "Combien de propositions dans « Je pense qu’il viendra quand il pourra » ?", answer: 3, why: "Trois verbes conjugués." },
    { qcm: "Dans « Nous restons parce qu’il pleut », « parce qu’il pleut » est…", choices: ["*une subordonnée", "une principale", "une indépendante"], why: "Introduite par « parce que »." },
  ] },
  { subject: "FR", chapter: "Le discours direct et le discours indirect", questions: [
    { qcm: "Il a dit : « Je viendrai demain. » → Il a dit qu’il viendrait…", choices: ["demain", "*le lendemain", "hier"], why: "Le verbe introducteur est au passé : demain devient le lendemain." },
    { qcm: "Le discours direct est encadré par…", choices: ["*des guillemets", "des parenthèses", "des crochets"], why: "Paroles citées telles quelles." },
    { qcm: "Pour rapporter une question totale au discours indirect, on utilise…", choices: ["que", "*si", "quoi"], why: "Il demande si tu viens." },
  ] },
  { subject: "FR", chapter: "Le subjonctif et le conditionnel", questions: [
    { qcm: "Il faut que tu (venir) →", choices: ["viens", "*viennes", "viendras"], why: "Subjonctif après « il faut que »." },
    { qcm: "Si j’avais le temps, je (lire) →", choices: ["*lirais", "lirai", "lise"], why: "Conditionnel présent." },
    { qcm: "Laquelle est correcte ?", choices: ["Si j’aurais su…", "*Si j’avais su…", "Si je saurais…"], why: "Jamais de conditionnel après « si »." },
  ] },
  { subject: "FR", chapter: "Les figures de style", questions: [
    { qcm: "« Fort comme un baobab » est…", choices: ["*une comparaison", "une métaphore", "une antithèse"], why: "Outil de comparaison « comme »." },
    { qcm: "« Le vent chante dans les filaos » est…", choices: ["une hyperbole", "*une personnification", "une comparaison"], why: "Le vent agit comme une personne." },
    { qcm: "« Je meurs de faim » est…", choices: ["*une hyperbole", "une antithèse", "une métaphore"], why: "Exagération." },
  ] },
  { subject: "FR", chapter: "La description et le portrait", questions: [
    { qcm: "Dans un récit au passé, la description est souvent à…", choices: ["*l’imparfait", "au passé simple", "au futur"], why: "Temps de l’arrière-plan." },
    { qcm: "Un portrait décrit…", choices: ["*une personne", "un paysage", "une recette"], why: "Physique et caractère." },
    { vf: "Une description peut faire appel aux cinq sens.", answer: true, why: "Vue, ouïe, odorat, goût, toucher." },
  ] },
  // ── Anglais ────────────────────────────────────────────────────────────────
  { subject: "ANG", chapter: "Family and friends", questions: [
    { qcm: "This is … bike. (Awa)", choices: ["Awa", "*Awa’s", "Awas’"], why: "Possessive ’s." },
    { qcm: "“What is she like?” asks about her…", choices: ["*character", "height", "clothes"], why: "“What does she look like?” is for appearance." },
    { qcm: "… he got a brother?", choices: ["Have", "*Has", "Is"], why: "He has got." },
  ] },
  { subject: "ANG", chapter: "Food and meals", questions: [
    { qcm: "How … rice do we need?", choices: ["many", "*much", "lot"], why: "Rice is uncountable." },
    { qcm: "Are there … tomatoes?", choices: ["some", "*any", "much"], why: "Any in questions." },
    { qcm: "How … mangoes are there?", choices: ["*many", "much", "any"], why: "Mangoes are countable." },
  ] },
  { subject: "ANG", chapter: "Telling a story in the past", questions: [
    { qcm: "I … to school when it started to rain.", choices: ["walked", "*was walking", "am walking"], why: "Action in progress: past continuous." },
    { qcm: "While she was cooking, the phone …", choices: ["*rang", "was ring", "rings"], why: "Short action: past simple." },
    { qcm: "They … playing football.", choices: ["was", "*were", "are be"], why: "They were + -ing." },
  ] },
  { subject: "ANG", chapter: "Experiences", questions: [
    { qcm: "Have you ever … to Ziguinchor?", choices: ["go", "*been", "went"], why: "Present perfect: have been." },
    { qcm: "I haven’t eaten …", choices: ["already", "*yet", "ever"], why: "Yet in negatives." },
    { qcm: "I … Saint-Louis last year.", choices: ["have visited", "*visited", "visit"], why: "Precise past time: past simple." },
  ] },
  { subject: "ANG", chapter: "Rules at school and at home", questions: [
    { qcm: "You … cheat in a test. (interdiction)", choices: ["*mustn’t", "don’t have to", "must"], why: "Prohibition." },
    { qcm: "You … come on Sunday. (no obligation)", choices: ["mustn’t", "*don’t have to", "must"], why: "Absence of obligation." },
    { qcm: "She … wear a uniform.", choices: ["have to", "*has to", "must to"], why: "She has to." },
  ] },
  { subject: "ANG", chapter: "The environment", questions: [
    { qcm: "If we plant trees, the desert … advance.", choices: ["*won’t", "doesn’t will", "not"], why: "First conditional: will / won’t." },
    { qcm: "If it … tomorrow, we will stay at home.", choices: ["will rain", "*rains", "rained"], why: "Present simple after if." },
    { qcm: "“Rubbish” means…", choices: ["*les ordures", "la pluie", "les arbres"], why: "Environment vocabulary." },
  ] },
  { subject: "ANG", chapter: "Technology and communication", questions: [
    { qcm: "In the future, more students … online.", choices: ["learns", "*will learn", "learning"], why: "Will for predictions." },
    { qcm: "“To download” means…", choices: ["*télécharger", "envoyer", "chercher"], why: "Technology vocabulary." },
    { vf: "It is safe to share your password with strangers.", answer: false, why: "Never share your password." },
  ] },
  { subject: "ANG", chapter: "Festivals and celebrations", questions: [
    { qcm: "We celebrate Independence Day … the 4th of April.", choices: ["in", "*on", "at"], why: "On + date." },
    { qcm: "Senegal became independent … 1960.", choices: ["*in", "on", "at"], why: "In + year." },
    { qcm: "The ordinal of “three” is…", choices: ["threeth", "*third", "thirdth"], why: "Irregular." },
  ] },
];

const built = buildExerciseSeries("4E", CHAPTERS_4E, SERIES);

export const QUESTIONS_4E = built.questions;
export const ANSWER_KEYS_4E = built.keys;
/** Chapitre de chaque question (banque utilisée par « Préparer mon prochain devoir »). */
export const QUESTION_CHAPTERS_4E = built.questionChapters;
export const ASSESSMENTS_4E = built.assessments;
