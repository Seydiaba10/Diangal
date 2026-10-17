import "server-only";

// Exercices corrigés de 6e : une série par chapitre, écrite par DIANGAL d’après les leçons (à faire
// relire par des enseignants). Corrigés inclus : ce fichier ne doit jamais atteindre le navigateur.

import { CHAPTERS_6E } from "../curriculum-6e";
import { buildExerciseSeries, type ExerciseSeries } from "../exercise-series";

const SERIES: ExerciseSeries[] = [
  // ── Mathématiques ──────────────────────────────────────────────────────────
  { subject: "MATH", chapter: "Nombres décimaux arithmétiques", questions: [
    { qcm: "La partie entière de 247,085 est…", choices: ["085", "*247", "2"], why: "C’est la partie à gauche de la virgule." },
    { qcm: "Le chiffre des centièmes de 247,085 est…", choices: ["0", "*8", "5"], why: "0 dixième, 8 centièmes, 5 millièmes." },
    { vf: "Tout entier naturel est un nombre décimal.", answer: true, why: "5 = 5,0 : ℕ est inclus dans 𝔻." },
  ] },
  { subject: "MATH", chapter: "Addition et soustraction des nombres décimaux", questions: [
    { num: "Calcule 125,4 − 37,85.", answer: 87.55, why: "Vérification : 87,55 + 37,85 = 125,4." },
    { num: "Calcule 2,7 + 5,8 + 7,3.", answer: 15.8, why: "(2,7 + 7,3) + 5,8 = 10 + 5,8 = 15,8." },
    { vf: "La soustraction est commutative.", answer: false, why: "5 − 3 ≠ 3 − 5." },
  ] },
  { subject: "MATH", chapter: "Rangement des nombres décimaux", questions: [
    { qcm: "Le plus grand nombre est…", choices: ["12,08", "*12,8", "12,075"], why: "8 dixièmes &gt; 0 dixième." },
    { num: "Arrondis 7,46 au dixième.", answer: 7.5, why: "Le chiffre suivant (6) est ≥ 5 : on arrondit au-dessus." },
    { qcm: "L’encadrement de 7,46 à l’unité est…", choices: ["*7 &lt; 7,46 &lt; 8", "7,4 &lt; 7,46 &lt; 7,5", "6 &lt; 7,46 &lt; 7"], why: "Entre deux entiers consécutifs." },
  ] },
  { subject: "MATH", chapter: "Multiplication des nombres décimaux", questions: [
    { num: "Calcule 3,25 × 1,4.", answer: 4.55, why: "325 × 14 = 4 550 ; 3 chiffres décimaux : 4,550." },
    { num: "Calcule 0,45 × 100.", answer: 45, why: "La virgule avance de deux rangs." },
    { num: "Calcule 32 × 0,1.", answer: 3.2, why: "Multiplier par 0,1 = diviser par 10." },
  ] },
  { subject: "MATH", chapter: "Division des nombres décimaux", questions: [
    { num: "Dans la division euclidienne de 158 par 12, quel est le reste ?", answer: 2, why: "158 = 12 × 13 + 2." },
    { num: "Calcule 4,2 ÷ 0,6.", answer: 7, why: "42 ÷ 6 = 7." },
    { num: "Calcule 7 ÷ 4.", answer: 1.75, why: "On ajoute des zéros au dividende : 1,75." },
  ] },
  { subject: "MATH", chapter: "Organisation d’un calcul", questions: [
    { num: "Calcule 5 + 3 × 4.", answer: 17, why: "La multiplication est prioritaire : 5 + 12." },
    { num: "Calcule (5 + 3) × 4.", answer: 32, why: "Les parenthèses d’abord : 8 × 4." },
    { num: "Calcule 20 − 12 ÷ 4 + 1.", answer: 18, why: "20 − 3 + 1 = 18." },
  ] },
  { subject: "MATH", chapter: "Proportionnalité", questions: [
    { num: "Un litre d’essence coûte 990 F. Combien coûtent 20 litres (en F) ?", answer: 19800, why: "990 × 20 = 19 800 F." },
    { num: "Calcule 15 % de 2 400.", answer: 360, why: "2 400 × 15 ÷ 100 = 360." },
    { num: "Sur un plan au 1/200, 3 cm représentent combien de mètres ?", answer: 6, why: "3 × 200 = 600 cm = 6 m." },
  ] },
  { subject: "MATH", chapter: "Nombres décimaux relatifs", questions: [
    { num: "Quel est l’opposé de −4 ?", answer: 4, why: "Les opposés ne diffèrent que par le signe." },
    { qcm: "Le plus petit nombre est…", choices: ["−3", "*−7", "2"], why: "Entre deux négatifs, le plus petit a la plus grande distance à zéro." },
    { vf: "Un nombre négatif est toujours plus petit qu’un nombre positif.", answer: true, why: "Il est à gauche de zéro." },
  ] },
  { subject: "MATH", chapter: "Repérage sur une droite et dans le plan", questions: [
    { qcm: "Dans A(3 ; 2), le nombre 3 est…", choices: ["*l’abscisse", "l’ordonnée", "l’origine"], why: "On lit l’abscisse en premier." },
    { qcm: "Le point O, origine du repère, a pour coordonnées…", choices: ["(1 ; 1)", "*(0 ; 0)", "(0 ; 1)"], why: "C’est l’origine." },
    { vf: "Dans un repère orthonormal, les axes sont perpendiculaires et ont la même unité.", answer: true, why: "C’est la définition." },
  ] },
  { subject: "MATH", chapter: "Introduction à la géométrie", questions: [
    { qcm: "La notation [AB] désigne…", choices: ["la droite", "la demi-droite", "*le segment"], why: "[AB] est limité par A et B." },
    { vf: "Par deux points distincts passe une seule droite.", answer: true, why: "C’est une propriété fondamentale." },
    { qcm: "Le milieu I de [AB] vérifie…", choices: ["*IA = IB et I ∈ [AB]", "IA = 2 IB", "I ∉ [AB]"], why: "Il est sur le segment, à égale distance des extrémités." },
  ] },
  { subject: "MATH", chapter: "Le cercle", questions: [
    { num: "Un cercle a un rayon de 5 cm. Combien mesure son diamètre (en cm) ?", answer: 10, why: "d = 2r." },
    { num: "Calcule le périmètre (en cm) d’un cercle de rayon 5 cm (π ≈ 3,14).", answer: 31.4, why: "2 × 3,14 × 5 = 31,4 cm." },
    { qcm: "Une corde qui passe par le centre est…", choices: ["un arc", "*un diamètre", "un rayon"], why: "C’est la plus longue corde." },
  ] },
  { subject: "MATH", chapter: "Droites perpendiculaires et droites parallèles", questions: [
    { qcm: "Deux droites perpendiculaires à une même troisième sont…", choices: ["perpendiculaires", "*parallèles", "sécantes"], why: "C’est une propriété du cours." },
    { qcm: "Pour tracer une perpendiculaire, on utilise…", choices: ["*l’équerre", "le compas seul", "le rapporteur"], why: "L’équerre donne l’angle droit." },
    { vf: "Si (d) // (d’) et (Δ) ⊥ (d), alors (Δ) ⊥ (d’).", answer: true, why: "Une perpendiculaire à l’une est perpendiculaire à l’autre." },
  ] },
  { subject: "MATH", chapter: "Symétrie orthogonale", questions: [
    { vf: "La symétrie orthogonale conserve les longueurs.", answer: true, why: "C’est une isométrie." },
    { qcm: "Un point situé sur l’axe de symétrie a pour symétrique…", choices: ["*lui-même", "un point de l’autre côté", "aucun point"], why: "Les points de l’axe sont invariants." },
    { qcm: "Tout point de la médiatrice de [AB] est…", choices: ["*à égale distance de A et de B", "plus près de A", "sur [AB]"], why: "Propriété de la médiatrice." },
  ] },
  { subject: "MATH", chapter: "Angles", questions: [
    { qcm: "Un angle de 120° est…", choices: ["aigu", "droit", "*obtus"], why: "Entre 90° et 180°." },
    { num: "Le complémentaire d’un angle de 35° mesure combien de degrés ?", answer: 55, why: "90 − 35 = 55." },
    { num: "Le supplémentaire d’un angle de 110° mesure combien de degrés ?", answer: 70, why: "180 − 110 = 70." },
  ] },
  { subject: "MATH", chapter: "Polygones", questions: [
    { num: "Deux angles d’un triangle mesurent 50° et 70°. Combien mesure le troisième ?", answer: 60, why: "180 − 50 − 70 = 60°." },
    { qcm: "Un triangle équilatéral a ses angles égaux à…", choices: ["45°", "*60°", "90°"], why: "180 ÷ 3 = 60°." },
    { qcm: "Un quadrilatère dont les diagonales sont perpendiculaires et se coupent en leur milieu est…", choices: ["un rectangle quelconque", "*un losange", "un trapèze"], why: "Propriété des diagonales du losange." },
  ] },
  { subject: "MATH", chapter: "Aires", questions: [
    { num: "Calcule l’aire (en cm²) d’un triangle de base 10 cm et de hauteur 6 cm.", answer: 30, why: "10 × 6 ÷ 2 = 30." },
    { num: "Combien de m² y a-t-il dans 1 hectare ?", answer: 10000, why: "1 ha = 10 000 m²." },
    { num: "Calcule l’aire (en cm²) d’un disque de rayon 3 cm (π ≈ 3,14).", answer: 28.26, why: "3,14 × 9 = 28,26." },
  ] },
  { subject: "MATH", chapter: "Géométrie dans l’espace", questions: [
    { num: "Calcule le volume (en cm³) d’un pavé de 5 cm × 3 cm × 2 cm.", answer: 30, why: "5 × 3 × 2 = 30 cm³." },
    { num: "Calcule le volume (en cm³) d’un cube de 4 cm d’arête.", answer: 64, why: "4³ = 64 cm³." },
    { qcm: "Le volume d’une boule de rayon R est…", choices: ["4πR²", "*4/3 πR³", "πR²h"], why: "Formule admise du cours." },
  ] },
  { subject: "MATH", chapter: "Repérage sur la sphère", questions: [
    { qcm: "La latitude se mesure à partir…", choices: ["*de l’équateur", "du méridien de Greenwich", "du pôle Sud"], why: "De 0° à 90° Nord ou Sud." },
    { qcm: "Le méridien origine passe par…", choices: ["Dakar", "*Greenwich", "le pôle Nord seulement"], why: "Longitude 0°." },
    { vf: "Dakar est dans l’hémisphère Nord.", answer: true, why: "Sa latitude est d’environ 14,7° N." },
  ] },
  // ── Français ───────────────────────────────────────────────────────────────
  { subject: "FR", chapter: "Le conte", questions: [
    { qcm: "Dans les contes sénégalais, Leuk est…", choices: ["l’hyène", "*le lièvre", "le lion"], why: "Leuk-le-Lièvre, rusé et malin." },
    { qcm: "Les Contes d’Amadou Koumba sont de…", choices: ["*Birago Diop", "Senghor", "La Fontaine"], why: "Recueil de 1947." },
    { vf: "Le conte appartient d’abord à la tradition orale.", answer: true, why: "Il est dit par un conteur." },
  ] },
  { subject: "FR", chapter: "La fable", questions: [
    { qcm: "La leçon d’une fable s’appelle…", choices: ["le titre", "*la morale", "la strophe"], why: "Elle peut être au début ou à la fin." },
    { qcm: "Le Loup et l’Agneau est une fable de…", choices: ["Birago Diop", "*La Fontaine", "Camus"], why: "Jean de La Fontaine." },
    { vf: "Dans les fables, les animaux représentent souvent des comportements humains.", answer: true, why: "Le renard rusé, le lion puissant…" },
  ] },
  { subject: "FR", chapter: "La phrase simple", questions: [
    { qcm: "« Quel beau lever de soleil ! » est une phrase…", choices: ["déclarative", "*exclamative", "impérative"], why: "Elle exprime une émotion." },
    { num: "Combien de verbes conjugués contient une phrase simple ?", answer: 1, why: "Un seul verbe conjugué." },
    { qcm: "« Silence ! » est une phrase…", choices: ["verbale", "*non verbale", "interrogative"], why: "Elle n’a pas de verbe." },
  ] },
  { subject: "FR", chapter: "Le groupe nominal", questions: [
    { qcm: "Dans « un vieux baobab », « vieux » est…", choices: ["*épithète", "attribut", "COD"], why: "Il est placé à côté du nom." },
    { qcm: "Dans « le marché de Sandaga », « de Sandaga » est…", choices: ["*complément du nom", "sujet", "COI"], why: "Il complète le nom « marché »." },
    { qcm: "Le noyau du groupe nominal est…", choices: ["le déterminant", "*le nom", "l’adjectif"], why: "Le GN se construit autour du nom." },
  ] },
  { subject: "FR", chapter: "Les fonctions dans la phrase", questions: [
    { qcm: "Dans « Ils écoutent le maître », « le maître » est…", choices: ["sujet", "*COD", "COI"], why: "Ils écoutent qui ?" },
    { qcm: "Dans « Ils obéissent au règlement », « au règlement » est…", choices: ["COD", "*COI", "attribut"], why: "Ils obéissent à quoi ?" },
    { qcm: "Dans « Ils sont attentifs », « attentifs » est…", choices: ["COD", "*attribut du sujet", "épithète"], why: "Après le verbe d’état être." },
  ] },
  { subject: "FR", chapter: "Les temps de l’indicatif", questions: [
    { qcm: "« Il prit » est au…", choices: ["présent", "imparfait", "*passé simple"], why: "Passé simple de prendre." },
    { qcm: "Futur de « chanter », 3e personne du singulier :", choices: ["chantait", "*chantera", "chanta"], why: "Il chantera." },
    { qcm: "Dans un récit, l’imparfait sert surtout à…", choices: ["*décrire le décor", "raconter les actions brèves", "donner un ordre"], why: "Le passé simple raconte les actions principales." },
  ] },
  { subject: "FR", chapter: "Accords et homophones", questions: [
    { qcm: "Le pluriel de « cheval » est…", choices: ["chevals", "*chevaux", "chevales"], why: "-al → -aux." },
    { qcm: "Ils … fini leurs devoirs.", choices: ["on", "*ont"], why: "On peut dire « avaient »." },
    { qcm: "« Où vont les pirogues ? » : le sujet de « vont » est…", choices: ["où", "*les pirogues", "il n’y en a pas"], why: "Le sujet est inversé." },
  ] },
  { subject: "FR", chapter: "Le vocabulaire", questions: [
    { qcm: "Lequel n’est pas de la famille de « terre » ?", choices: ["terrain", "souterrain", "*terrible"], why: "Terrible vient de « terreur »." },
    { qcm: "« Une montagne de devoirs » est employé au sens…", choices: ["propre", "*figuré", "technique"], why: "Il ne s’agit pas d’une vraie montagne." },
    { vf: "Le dictionnaire indique la nature d’un mot.", answer: true, why: "Nom, verbe, adjectif…" },
  ] },
  { subject: "FR", chapter: "Raconter et décrire", questions: [
    { qcm: "Lequel est un connecteur de temps ?", choices: ["*soudain", "rouge", "devant"], why: "Il marque un moment du récit." },
    { qcm: "Pour décrire, on va souvent…", choices: ["*du général au particulier", "du particulier au général sans ordre", "au hasard"], why: "C’est un ordre logique." },
    { vf: "Une narration est organisée en paragraphes.", answer: true, why: "Un paragraphe par étape." },
  ] },
  // ── Anglais ────────────────────────────────────────────────────────────────
  { subject: "ANG", chapter: "Greetings and introductions", questions: [
    { qcm: "“What’s your name?” — …", choices: ["I’m fine.", "*My name is Awa.", "I’m from Senegal."], why: "The question asks for your name." },
    { qcm: "She … from Dakar.", choices: ["am", "*is", "are"], why: "He / she / it is." },
    { qcm: "“How are you?” — …", choices: ["*I’m fine, thank you.", "I’m twelve.", "Goodbye."], why: "It asks how you feel." },
  ] },
  { subject: "ANG", chapter: "Numbers, the alphabet and colours", questions: [
    { qcm: "“Thirteen” is…", choices: ["30", "*13", "3"], why: "Thir-TEEN = 13." },
    { qcm: "The Senegalese flag is green, yellow and…", choices: ["blue", "*red", "black"], why: "Vert, or (jaune), rouge." },
    { qcm: "“One hundred” is…", choices: ["10", "*100", "1 000"], why: "Cent." },
  ] },
  { subject: "ANG", chapter: "My family", questions: [
    { qcm: "My mother’s mother is my…", choices: ["aunt", "*grandmother", "sister"], why: "La mère de ma mère." },
    { qcm: "He … got two sisters.", choices: ["have", "*has", "is"], why: "He / she / it has got." },
    { qcm: "“Moussa’s book” means…", choices: ["*le livre de Moussa", "Moussa est un livre", "les livres"], why: "The possessive ’s." },
  ] },
  { subject: "ANG", chapter: "At school", questions: [
    { qcm: "… orange", choices: ["a", "*an", "the a"], why: "An before a vowel sound." },
    { qcm: "The plural of “child” is…", choices: ["childs", "*children", "childes"], why: "Irregular plural." },
    { qcm: "“What are these?” — …", choices: ["It’s a pen.", "*They are books.", "This is a book."], why: "Plural question, plural answer." },
  ] },
  { subject: "ANG", chapter: "Daily routine and time", questions: [
    { qcm: "She … to school at 7.30.", choices: ["go", "*goes", "going"], why: "Present simple: -s with she." },
    { qcm: "“Half past seven” is…", choices: ["7:15", "*7:30", "6:30"], why: "Half past = et demie." },
    { qcm: "… he play football?", choices: ["Do", "*Does", "Is"], why: "Does with he / she / it." },
  ] },
  { subject: "ANG", chapter: "Food and the market", questions: [
    { qcm: "How … rice do you want?", choices: ["many", "*much", "lot"], why: "Rice is uncountable." },
    { qcm: "How … mangoes do you want?", choices: ["*many", "much", "some"], why: "Mangoes are countable." },
    { qcm: "Have you got … milk?", choices: ["some", "*any", "a"], why: "Any in questions." },
  ] },
  { subject: "ANG", chapter: "Weather and seasons", questions: [
    { qcm: "“It’s raining” means…", choices: ["*il pleut", "il fait chaud", "il y a du vent"], why: "Rain = pluie." },
    { qcm: "The rainy season in Senegal is from…", choices: ["*July to October", "December to March", "January to May"], why: "L’hivernage." },
    { qcm: "Look! The children … football now.", choices: ["play", "*are playing", "played"], why: "Present continuous for now." },
  ] },
  { subject: "ANG", chapter: "Last weekend", questions: [
    { qcm: "Yesterday I … my grandmother.", choices: ["visit", "*visited", "visits"], why: "Past simple: -ed." },
    { qcm: "The past simple of “go” is…", choices: ["goed", "*went", "gone"], why: "Irregular verb." },
    { qcm: "They … at school last Monday.", choices: ["was", "*were", "are"], why: "They were." },
  ] },
  // ── Histoire-géographie ────────────────────────────────────────────────────
  { subject: "HG", chapter: "Introduction à l’étude de l’histoire", questions: [
    { num: "À quel siècle appartient l’année 1450 ?", answer: 15, why: "De 1401 à 1500 : XVe siècle." },
    { qcm: "Les récits des griots sont des sources…", choices: ["écrites", "*orales", "archéologiques"], why: "Elles sont transmises de bouche à oreille." },
    { vf: "Un siècle dure 100 ans.", answer: true, why: "Par définition." },
  ] },
  { subject: "HG", chapter: "La préhistoire", questions: [
    { qcm: "Le néolithique est l’âge…", choices: ["de la pierre taillée", "*de la pierre polie et de l’agriculture", "du fer"], why: "Agriculture, élevage, poterie." },
    { qcm: "Le berceau de l’humanité est…", choices: ["l’Europe", "*l’Afrique", "l’Asie"], why: "Les plus anciens restes humains y ont été trouvés." },
    { vf: "La préhistoire s’achève avec l’invention de l’écriture.", answer: true, why: "Vers 3 000 av. J.-C." },
  ] },
  { subject: "HG", chapter: "L’Égypte pharaonique", questions: [
    { qcm: "L’écriture égyptienne s’appelle…", choices: ["le cunéiforme", "*les hiéroglyphes", "l’alphabet latin"], why: "Gravée sur les monuments ou écrite sur papyrus." },
    { qcm: "Le roi d’Égypte est le…", choices: ["*pharaon", "consul", "damel"], why: "Considéré comme un dieu vivant." },
    { vf: "L’Égypte est un « don du Nil ».", answer: true, why: "La crue apporte le limon fertile." },
  ] },
  { subject: "HG", chapter: "La Nubie, l’Éthiopie et les relations de l’Afrique ancienne", questions: [
    { qcm: "Méroé, en Nubie, était célèbre pour…", choices: ["*son fer et ses pyramides", "ses gratte-ciel", "son port sur l’Atlantique"], why: "Grand centre métallurgique." },
    { qcm: "Le royaume d’Axoum se trouvait en…", choices: ["Égypte", "*Éthiopie", "Mauritanie"], why: "Royaume commerçant chrétien." },
    { vf: "Des pharaons noirs venus de Nubie ont régné sur l’Égypte.", answer: true, why: "La XXVe dynastie." },
  ] },
  { subject: "HG", chapter: "Carthage", questions: [
    { qcm: "Carthage a été fondée par…", choices: ["les Romains", "*les Phéniciens", "les Grecs"], why: "Au IXe siècle av. J.-C." },
    { num: "En quelle année av. J.-C. Carthage fut-elle détruite par Rome ?", answer: 146, why: "Fin des guerres puniques." },
    { qcm: "Le célèbre général carthaginois est…", choices: ["César", "*Hannibal", "Alexandre"], why: "Il traversa les Alpes avec des éléphants." },
  ] },
  { subject: "HG", chapter: "Les civilisations antiques de l’Asie", questions: [
    { qcm: "L’écriture cunéiforme est née en…", choices: ["*Mésopotamie", "Grèce", "Égypte"], why: "Sur des tablettes d’argile." },
    { qcm: "Le monothéisme, c’est croire en…", choices: ["plusieurs dieux", "*un Dieu unique", "aucun dieu"], why: "Mono = un." },
    { qcm: "Le code d’Hammourabi est un recueil de…", choices: ["poèmes", "*lois", "cartes"], why: "Roi de Babylone." },
  ] },
  { subject: "HG", chapter: "La Grèce antique", questions: [
    { qcm: "La démocratie est née à…", choices: ["Sparte", "*Athènes", "Rome"], why: "Au Ve siècle av. J.-C." },
    { qcm: "Alexandre le Grand a fondé en Égypte la ville d’…", choices: ["*Alexandrie", "Athènes", "Carthage"], why: "Grand centre de savoir." },
    { vf: "Dans l’Athènes antique, les femmes étaient citoyennes.", answer: false, why: "Seuls les hommes libres nés de parents athéniens l’étaient." },
  ] },
  { subject: "HG", chapter: "Rome, de la cité à l’empire", questions: [
    { qcm: "Le premier empereur romain est…", choices: ["César", "*Auguste", "Constantin"], why: "En 27 av. J.-C." },
    { qcm: "La langue des Romains était…", choices: ["le grec", "*le latin", "l’arabe"], why: "Le français vient du latin." },
    { vf: "L’Afrique du Nord faisait partie de l’Empire romain.", answer: true, why: "Elle fournissait du blé." },
  ] },
  { subject: "HG", chapter: "Le christianisme et les grandes invasions", questions: [
    { num: "En quelle année l’empereur Constantin autorisa-t-il le christianisme ?", answer: 313, why: "Édit de Milan." },
    { num: "En quelle année disparaît l’Empire romain d’Occident ?", answer: 476, why: "Fin traditionnelle de l’Antiquité." },
    { qcm: "Les Vandales se sont installés en…", choices: ["*Afrique du Nord", "Égypte", "Inde"], why: "Ils prirent Carthage en 439." },
  ] },
  { subject: "HG", chapter: "Introduction à la géographie : s’orienter et lire une carte", questions: [
    { qcm: "Sur une carte au 1/100 000, 1 cm représente…", choices: ["100 m", "*1 km", "10 km"], why: "100 000 cm = 1 km." },
    { qcm: "La partie de la carte qui explique les signes est…", choices: ["*la légende", "l’échelle", "le titre"], why: "Elle donne le sens des couleurs et symboles." },
    { vf: "Sur une carte, le nord est généralement en haut.", answer: true, why: "C’est la convention." },
  ] },
  { subject: "HG", chapter: "Le Bassin arachidier", questions: [
    { qcm: "La principale culture de rente du Bassin arachidier est…", choices: ["le riz", "*l’arachide", "le coton"], why: "D’où son nom." },
    { qcm: "Un problème majeur du Bassin arachidier est…", choices: ["*l’appauvrissement des sols", "la neige", "les volcans"], why: "Dû à la monoculture." },
    { qcm: "Le mil est une culture…", choices: ["*vivrière", "de rente", "industrielle"], why: "Il sert à nourrir la famille." },
  ] },
  { subject: "HG", chapter: "Dakar et le littoral central", questions: [
    { qcm: "Les Niayes sont connues pour…", choices: ["*le maraîchage", "l’or", "le coton"], why: "Dépressions humides cultivées." },
    { qcm: "Dakar est située sur la presqu’île du…", choices: ["*Cap-Vert", "Saloum", "Fouta"], why: "À l’extrême ouest de l’Afrique." },
    { vf: "La région de Dakar concentre une grande partie de la population du Sénégal.", answer: true, why: "Plus d’un Sénégalais sur cinq." },
  ] },
  { subject: "HG", chapter: "Le Ferlo", questions: [
    { qcm: "L’activité principale du Ferlo est…", choices: ["la pêche", "*l’élevage", "l’industrie"], why: "Élevage extensif et transhumance." },
    { qcm: "Le principal problème du Ferlo est…", choices: ["*le manque d’eau", "les inondations", "le froid"], why: "Climat sahélien." },
    { qcm: "Un marché hebdomadaire de bétail s’appelle…", choices: ["*un louma", "un port", "une huilerie"], why: "Les éleveurs y vendent leurs bêtes." },
  ] },
  { subject: "HG", chapter: "La vallée du fleuve Sénégal", questions: [
    { qcm: "Les terres inondables de la vallée s’appellent…", choices: ["le diéri", "*le walo", "le Ferlo"], why: "Le diéri est la zone sèche." },
    { qcm: "La canne à sucre est cultivée à…", choices: ["*Richard-Toll", "Kolda", "Thiès"], why: "Par la Compagnie sucrière sénégalaise." },
    { vf: "Les barrages ont permis le développement de l’irrigation.", answer: true, why: "Diama et Manantali." },
  ] },
  { subject: "HG", chapter: "La Casamance", questions: [
    { qcm: "Le climat de la Casamance est…", choices: ["sahélien", "*subguinéen, humide", "désertique"], why: "C’est la région la plus arrosée." },
    { qcm: "Le pont qui facilite le désenclavement de la Casamance est celui de…", choices: ["*Farafégny", "Faidherbe", "Diama"], why: "Sur le fleuve Gambie." },
    { qcm: "La culture traditionnelle majeure des Diolas est…", choices: ["*le riz", "l’arachide", "le coton"], why: "Riziculture dans les bas-fonds." },
  ] },
  { subject: "HG", chapter: "Le Haut-Sénégal (Sud-Est)", questions: [
    { qcm: "Le parc national du Sud-Est est…", choices: ["*le Niokolo-Koba", "le Djoudj", "la Langue de Barbarie"], why: "Grand parc de savane." },
    { qcm: "L’or est exploité à…", choices: ["*Sabodala", "Taïba", "Kayar"], why: "Région de Kédougou." },
    { vf: "Le Sud-Est est la région la plus densément peuplée du Sénégal.", answer: false, why: "Il est peu peuplé." },
  ] },
  // ── SVT ────────────────────────────────────────────────────────────────────
  { subject: "SVT", chapter: "La classification des êtres vivants", questions: [
    { qcm: "La chauve-souris est…", choices: ["un oiseau", "*un mammifère", "un insecte"], why: "Elle a des poils et des mamelles." },
    { qcm: "Un animal sans colonne vertébrale est…", choices: ["un vertébré", "*un invertébré", "un mammifère"], why: "Exemple : le criquet." },
    { vf: "On classe les êtres vivants d’après ce qu’ils possèdent.", answer: true, why: "Pas d’après ce qu’ils font." },
  ] },
  { subject: "SVT", chapter: "La répartition des êtres vivants", questions: [
    { qcm: "Les palétuviers poussent dans…", choices: ["le désert", "*la mangrove", "la montagne"], why: "Dans l’eau salée des estuaires." },
    { qcm: "Lequel est un facteur du milieu ?", choices: ["*la lumière", "le nom de l’espèce", "la couleur du ciel la nuit"], why: "Eau, lumière, température, sol." },
    { vf: "Les cloportes recherchent les endroits humides et sombres.", answer: true, why: "Ils fuient la sécheresse et la lumière." },
  ] },
  { subject: "SVT", chapter: "Les relations entre les êtres vivants dans l’environnement", questions: [
    { qcm: "Dans une chaîne alimentaire, les plantes vertes sont…", choices: ["*les producteurs", "les consommateurs", "les décomposeurs"], why: "Elles fabriquent leur matière." },
    { qcm: "La tique sur le bœuf est un exemple de…", choices: ["symbiose", "*parasitisme", "compétition"], why: "Elle vit aux dépens du bœuf." },
    { qcm: "Les champignons et les bactéries du sol sont…", choices: ["producteurs", "*décomposeurs", "carnivores"], why: "Ils recyclent la matière morte." },
  ] },
  { subject: "SVT", chapter: "La production d’aliments par les végétaux chlorophylliens", questions: [
    { qcm: "La photosynthèse produit de la matière organique et…", choices: ["du dioxyde de carbone", "*du dioxygène", "de l’azote"], why: "Elle libère du dioxygène." },
    { qcm: "L’eau iodée colore l’amidon en…", choices: ["rouge", "*bleu-noir", "jaune"], why: "C’est le test de l’amidon." },
    { vf: "La photosynthèse a besoin de lumière.", answer: true, why: "Une plante à l’obscurité dépérit." },
  ] },
  { subject: "SVT", chapter: "L’amélioration de la production d’aliments", questions: [
    { qcm: "Le fumier et le compost sont des…", choices: ["*engrais naturels", "pesticides", "semences"], why: "Ils enrichissent le sol." },
    { qcm: "Pour cultiver en saison sèche, on utilise…", choices: ["*l’irrigation", "la transhumance", "la pêche"], why: "Apport d’eau aux cultures." },
    { vf: "Un excès d’engrais chimiques peut polluer l’eau.", answer: true, why: "Il faut les utiliser avec modération." },
  ] },
];

const built = buildExerciseSeries("6E", CHAPTERS_6E, SERIES);

export const QUESTIONS_6E = built.questions;
export const ANSWER_KEYS_6E = built.keys;
/** Chapitre de chaque question (banque utilisée par « Préparer mon prochain devoir »). */
export const QUESTION_CHAPTERS_6E = built.questionChapters;
export const ASSESSMENTS_6E = built.assessments;
