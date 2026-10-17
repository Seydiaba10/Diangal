import "server-only";

// Exercices corrigés de 5e : une série par chapitre, écrite par DIANGAL d’après les leçons (à faire
// relire par des enseignants). Corrigés inclus : ce fichier ne doit jamais atteindre le navigateur.

import { CHAPTERS_5E } from "../curriculum-5e";
import { buildExerciseSeries, type ExerciseSeries } from "../exercise-series";

const SERIES: ExerciseSeries[] = [
  // ── Mathématiques ──────────────────────────────────────────────────────────
  { subject: "MATH", chapter: "Addition et soustraction des nombres relatifs", questions: [
    { num: "Calcule (−3) + (−5).", answer: -8, why: "Même signe : on additionne les distances à zéro et on garde le signe." },
    { num: "Calcule (+7) + (−10).", answer: -3, why: "Signes contraires : 10 − 7 = 3, signe du plus éloigné de zéro (−)." },
    { num: "Calcule 4 − (−6).", answer: 10, why: "Soustraire −6, c’est ajouter 6." },
  ] },
  { subject: "MATH", chapter: "Multiplication et division des nombres relatifs", questions: [
    { num: "Calcule (−4) × (−3).", answer: 12, why: "Moins par moins donne plus." },
    { num: "Calcule (−20) ÷ 5.", answer: -4, why: "Signes contraires : résultat négatif." },
    { num: "Calcule (−2) × (−3) × (−5).", answer: -30, why: "Trois facteurs négatifs (nombre impair) : résultat négatif." },
  ] },
  { subject: "MATH", chapter: "Puissances", questions: [
    { num: "Calcule 2 puissance 5.", answer: 32, why: "2 × 2 × 2 × 2 × 2 = 32." },
    { num: "Calcule (−3)².", answer: 9, why: "(−3) × (−3) = 9." },
    { qcm: "10³ × 10² =", choices: ["10⁶", "*10⁵", "100⁵"], why: "On additionne les exposants." },
  ] },
  { subject: "MATH", chapter: "Multiples et diviseurs", questions: [
    { num: "Combien 24 a-t-il de diviseurs ?", answer: 8, why: "1, 2, 3, 4, 6, 8, 12, 24." },
    { qcm: "Lequel est un nombre premier ?", choices: ["9", "15", "*13"], why: "13 n’a que deux diviseurs : 1 et 13." },
    { num: "Quel est le plus grand diviseur commun de 24 et 36 ?", answer: 12, why: "Diviseurs communs : 1, 2, 3, 4, 6, 12." },
  ] },
  { subject: "MATH", chapter: "Les fractions", questions: [
    { qcm: "18/24 simplifiée donne…", choices: ["9/16", "*3/4", "6/8 seulement"], why: "On divise par 6." },
    { qcm: "1/4 + 1/6 =", choices: ["2/10", "*5/12", "1/10"], why: "3/12 + 2/12 = 5/12." },
    { qcm: "3/5 ÷ 9/10 =", choices: ["27/50", "*2/3", "3/2"], why: "3/5 × 10/9 = 30/45 = 2/3." },
  ] },
  { subject: "MATH", chapter: "Proportionnalité et pourcentages", questions: [
    { num: "3 kg coûtent 1 350 F. Combien coûtent 7 kg (en F) ?", answer: 3150, why: "1 350 × 7 ÷ 3 = 3 150." },
    { num: "Un prix de 2 000 F augmente de 10 %. Quel est le nouveau prix (en F) ?", answer: 2200, why: "2 000 × 1,10 = 2 200." },
    { num: "Un car parcourt 180 km en 3 h. Quelle est sa vitesse moyenne (en km/h) ?", answer: 60, why: "180 ÷ 3 = 60." },
  ] },
  { subject: "MATH", chapter: "Équations et inéquations", questions: [
    { num: "Résous x + 7 = 12.", answer: 5, why: "x = 12 − 7." },
    { num: "Résous 3x = 18.", answer: 6, why: "x = 18 ÷ 3." },
    { num: "Résous 2x − 5 = 9.", answer: 7, why: "2x = 14, donc x = 7." },
  ] },
  { subject: "MATH", chapter: "Repérage dans le plan", questions: [
    { qcm: "Le symétrique de M(2 ; −3) par rapport à l’origine est…", choices: ["(2 ; 3)", "*(−2 ; 3)", "(−2 ; −3)"], why: "(x ; y) devient (−x ; −y)." },
    { qcm: "Un point de l’axe des abscisses a une ordonnée…", choices: ["*nulle", "égale à 1", "négative"], why: "Il est sur l’axe horizontal." },
    { num: "Combien de quadrants les axes forment-ils ?", answer: 4, why: "Quatre régions du plan." },
  ] },
  { subject: "MATH", chapter: "Les angles", questions: [
    { vf: "Deux angles opposés par le sommet ont la même mesure.", answer: true, why: "Propriété du cours." },
    { qcm: "Deux droites parallèles coupées par une sécante forment des angles alternes-internes…", choices: ["*égaux", "supplémentaires toujours", "complémentaires"], why: "Ils ont la même mesure." },
    { num: "Le supplémentaire d’un angle de 65° mesure (en degrés)…", answer: 115, why: "180 − 65 = 115." },
  ] },
  { subject: "MATH", chapter: "Les triangles", questions: [
    { vf: "On peut construire un triangle de côtés 3 cm, 4 cm et 9 cm.", answer: false, why: "9 &gt; 3 + 4 : l’inégalité triangulaire n’est pas respectée." },
    { qcm: "Le centre du cercle circonscrit est le point de concours des…", choices: ["hauteurs", "*médiatrices", "médianes"], why: "Il est à égale distance des trois sommets." },
    { qcm: "Dans un triangle rectangle, le centre du cercle circonscrit est…", choices: ["*le milieu de l’hypoténuse", "le sommet de l’angle droit", "à l’extérieur"], why: "Propriété du triangle rectangle." },
  ] },
  { subject: "MATH", chapter: "Le parallélogramme", questions: [
    { vf: "Les diagonales d’un parallélogramme se coupent en leur milieu.", answer: true, why: "C’est une propriété caractéristique." },
    { num: "Dans un parallélogramme, un angle mesure 70°. Combien mesure l’angle consécutif (en degrés) ?", answer: 110, why: "Deux angles consécutifs sont supplémentaires." },
    { qcm: "Lequel n’est pas forcément un parallélogramme ?", choices: ["le rectangle", "le losange", "*le trapèze"], why: "Le trapèze n’a que deux côtés parallèles." },
  ] },
  { subject: "MATH", chapter: "La symétrie centrale", questions: [
    { qcm: "Si A’ est le symétrique de A par rapport à O, alors O est…", choices: ["*le milieu de [AA’]", "sur la médiatrice de [AA’] seulement", "confondu avec A"], why: "C’est la définition." },
    { qcm: "Par une symétrie centrale, une droite a pour image…", choices: ["une droite perpendiculaire", "*une droite parallèle", "un cercle"], why: "Propriété du cours." },
    { vf: "Le cercle a un centre de symétrie.", answer: true, why: "Son centre." },
  ] },
  { subject: "MATH", chapter: "Géométrie dans l’espace", questions: [
    { num: "Volume (en cm³) d’un prisme à base triangulaire (base 6 cm, hauteur du triangle 4 cm) et de hauteur 10 cm ?", answer: 120, why: "(6 × 4 ÷ 2) × 10 = 120." },
    { qcm: "Le volume d’un cylindre est…", choices: ["2πrh", "*πr²h", "πr²"], why: "Aire de la base × hauteur." },
    { qcm: "L’aire latérale d’un prisme droit est…", choices: ["*périmètre de la base × hauteur", "aire de la base × hauteur", "base × base"], why: "Les faces latérales sont des rectangles." },
  ] },
  // ── Français ───────────────────────────────────────────────────────────────
  { subject: "FR", chapter: "Le récit d’aventure", questions: [
    { qcm: "Les obstacles que rencontre le héros s’appellent…", choices: ["*les péripéties", "les didascalies", "les rimes"], why: "Elles font avancer l’action." },
    { qcm: "Ce qui tient le lecteur en haleine est…", choices: ["*le suspense", "la morale", "la rime"], why: "On veut connaître la suite." },
    { vf: "Le narrateur peut être un personnage de l’histoire.", answer: true, why: "Il dit alors « je »." },
  ] },
  { subject: "FR", chapter: "Initiation à la poésie", questions: [
    { qcm: "Un groupe de vers s’appelle…", choices: ["un paragraphe", "*une strophe", "une scène"], why: "Les vers sont regroupés en strophes." },
    { qcm: "« Femme nue, femme noire » est de…", choices: ["*Senghor", "La Fontaine", "Birago Diop"], why: "Chants d’ombre." },
    { vf: "Les rimes sont des sons répétés en fin de vers.", answer: true, why: "Maison / saison." },
  ] },
  { subject: "FR", chapter: "Initiation au théâtre", questions: [
    { qcm: "Les indications de jeu en italique s’appellent…", choices: ["répliques", "*didascalies", "strophes"], why: "Elles guident les acteurs." },
    { qcm: "Une pièce qui fait rire est…", choices: ["*une comédie", "une tragédie", "une fable"], why: "Elle critique les défauts en amusant." },
    { vf: "Le théâtre est écrit pour être joué.", answer: true, why: "Devant un public." },
  ] },
  { subject: "FR", chapter: "Les groupes de verbes et les temps de l’indicatif", questions: [
    { qcm: "« Grandir » est du…", choices: ["1er groupe", "*2e groupe", "3e groupe"], why: "Nous grandissons." },
    { qcm: "« J’avais fini » est au…", choices: ["passé composé", "*plus-que-parfait", "futur antérieur"], why: "Auxiliaire à l’imparfait." },
    { qcm: "« Aller » est du…", choices: ["1er groupe", "2e groupe", "*3e groupe"], why: "C’est une exception." },
  ] },
  { subject: "FR", chapter: "Les compléments circonstanciels", questions: [
    { qcm: "« avec patience » est un complément circonstanciel de…", choices: ["lieu", "*manière", "temps"], why: "Comment ?" },
    { qcm: "« pour réussir » exprime…", choices: ["la cause", "*le but", "le lieu"], why: "Dans quel but ?" },
    { qcm: "« à cause de la pluie » exprime…", choices: ["*la cause", "le but", "le temps"], why: "Pourquoi ?" },
  ] },
  { subject: "FR", chapter: "La proposition subordonnée relative", questions: [
    { qcm: "Dans « Le livre que tu lis », l’antécédent est…", choices: ["*le livre", "tu", "lis"], why: "Le nom complété par la relative." },
    { qcm: "« La ville … je suis né »", choices: ["que", "qui", "*où"], why: "Où pour le lieu." },
    { qcm: "Dans une relative, « qui » est…", choices: ["*sujet", "COD", "COI"], why: "Le garçon qui chante." },
  ] },
  { subject: "FR", chapter: "L’accord du participe passé", questions: [
    { qcm: "Elles sont (venir) →", choices: ["venu", "*venues", "venus"], why: "Avec être, accord avec le sujet." },
    { qcm: "Les lettres que j’ai (écrire) →", choices: ["écrit", "*écrites", "écris"], why: "COD « que » placé avant." },
    { qcm: "J’ai (écrire) des lettres →", choices: ["*écrit", "écrites", "écrits"], why: "COD après le verbe : pas d’accord." },
  ] },
  { subject: "FR", chapter: "La formation des mots", questions: [
    { qcm: "Dans « refaire », « re- » est…", choices: ["*un préfixe", "un suffixe", "un radical"], why: "Il est placé avant le radical." },
    { qcm: "Lequel est de la famille de « mer » ?", choices: ["*marin", "maire", "mère"], why: "Même radical." },
    { qcm: "Le suffixe « -age » dans « lavage » forme…", choices: ["un verbe", "*un nom", "un adjectif"], why: "Laver → lavage." },
  ] },
  { subject: "FR", chapter: "Le résumé et la lettre", questions: [
    { vf: "Dans un résumé, on donne son avis.", answer: false, why: "Le résumé reste fidèle au texte." },
    { qcm: "Une lettre au principal est une lettre…", choices: ["personnelle", "*officielle", "amicale"], why: "Le ton est respectueux." },
    { qcm: "Le résumé reprend les idées…", choices: ["*dans l’ordre du texte", "au hasard", "à l’envers"], why: "Il suit la logique du texte." },
  ] },
  // ── Anglais ────────────────────────────────────────────────────────────────
  { subject: "ANG", chapter: "My house and my town", questions: [
    { qcm: "There … two schools in my town.", choices: ["is", "*are", "be"], why: "Plural: there are." },
    { qcm: "“next to” means…", choices: ["*à côté de", "derrière", "sous"], why: "Preposition of place." },
    { qcm: "We cook in the…", choices: ["bedroom", "*kitchen", "bathroom"], why: "Kitchen = cuisine." },
  ] },
  { subject: "ANG", chapter: "Hobbies and sports", questions: [
    { qcm: "I like … football.", choices: ["play", "*playing", "to playing"], why: "Like + -ing." },
    { qcm: "She … swim. (ability)", choices: ["*can", "cans", "can to"], why: "Can + base verb." },
    { qcm: "“Wrestling” is…", choices: ["la natation", "*la lutte", "la course"], why: "Laamb = wrestling." },
  ] },
  { subject: "ANG", chapter: "Clothes and shopping", questions: [
    { qcm: "Today I … a blue shirt.", choices: ["wear", "*am wearing", "wearing"], why: "Present continuous: am + -ing." },
    { qcm: "How … is this dress?", choices: ["many", "*much", "long"], why: "Asking the price." },
    { qcm: "“Expensive” means…", choices: ["pas cher", "*cher", "joli"], why: "Expensive ≠ cheap." },
  ] },
  { subject: "ANG", chapter: "Health and the body", questions: [
    { qcm: "I have a headache: it hurts in my…", choices: ["*head", "foot", "stomach"], why: "Head = tête." },
    { qcm: "You … see a doctor.", choices: ["*should", "shoulds", "should to"], why: "Should + base verb." },
    { qcm: "“What’s the matter?” means…", choices: ["*Qu’est-ce qui ne va pas ?", "Quelle heure est-il ?", "Où vas-tu ?"], why: "Asking about a problem." },
  ] },
  { subject: "ANG", chapter: "Animals and the environment", questions: [
    { qcm: "The elephant is … than the lion.", choices: ["big", "*bigger", "the biggest"], why: "Comparative: -er than." },
    { qcm: "The cheetah is … animal.", choices: ["faster", "*the fastest", "fast"], why: "Superlative." },
    { qcm: "The comparative of “good” is…", choices: ["gooder", "*better", "best"], why: "Irregular." },
  ] },
  { subject: "ANG", chapter: "Jobs", questions: [
    { qcm: "A person who catches fish is a…", choices: ["farmer", "*fisherman", "tailor"], why: "Fish = poisson." },
    { qcm: "What … your father do?", choices: ["do", "*does", "is"], why: "Present simple question with he." },
    { qcm: "She is … engineer.", choices: ["a", "*an", "the"], why: "An before a vowel sound." },
  ] },
  { subject: "ANG", chapter: "Travel and holidays", questions: [
    { qcm: "The past simple of “see” is…", choices: ["seed", "*saw", "seen"], why: "Irregular verb." },
    { qcm: "… you go to Saint-Louis?", choices: ["Do", "*Did", "Was"], why: "Past question with did." },
    { qcm: "Last year we … the bus.", choices: ["take", "*took", "taked"], why: "Take → took." },
  ] },
  { subject: "ANG", chapter: "Plans for the future", questions: [
    { qcm: "I … going to visit my uncle.", choices: ["is", "*am", "are"], why: "I am going to." },
    { qcm: "Look at the clouds! It … rain.", choices: ["*is going to", "goes to", "went"], why: "Going to for a prediction based on evidence." },
    { qcm: "“Next week” refers to…", choices: ["the past", "*the future", "now"], why: "La semaine prochaine." },
  ] },
  // ── Histoire-géographie ────────────────────────────────────────────────────
  { subject: "HG", chapter: "Le monde à la fin du VIe siècle", questions: [
    { qcm: "La capitale de l’Empire byzantin était…", choices: ["Rome", "*Constantinople", "Damas"], why: "L’Empire romain d’Orient." },
    { vf: "Vers 600, la plupart des Arabes étaient polythéistes.", answer: true, why: "Avant l’islam." },
    { qcm: "Vers 600, un empire se développe en Afrique de l’Ouest :", choices: ["*le Ghana", "le Songhaï", "le Mali"], why: "Le Ghana est le plus ancien." },
  ] },
  { subject: "HG", chapter: "La civilisation musulmane", questions: [
    { num: "En quelle année a lieu l’hégire ?", answer: 622, why: "Émigration de La Mecque à Médine." },
    { qcm: "La capitale des Abbassides était…", choices: ["Damas", "*Bagdad", "Médine"], why: "Fondée au VIIIe siècle." },
    { qcm: "Avicenne était un célèbre…", choices: ["*médecin", "conquérant", "navigateur"], why: "Ibn Sina." },
  ] },
  { subject: "HG", chapter: "Les empires du Ghana et du Mali", questions: [
    { qcm: "Le fondateur de l’empire du Mali est…", choices: ["*Soundjata Keïta", "Kankou Moussa", "Askia Mohammed"], why: "Après Kirina." },
    { qcm: "Les Almoravides étaient un mouvement…", choices: ["*religieux berbère", "portugais", "songhaï"], why: "Né au XIe siècle." },
    { num: "En quelle année Kankou Moussa fit-il son pèlerinage ?", answer: 1324, why: "Pèlerinage célèbre pour l’or distribué." },
  ] },
  { subject: "HG", chapter: "L’empire Songhaï et les royaumes du golfe de Guinée", questions: [
    { qcm: "La capitale du Songhaï était…", choices: ["*Gao", "Koumbi Saleh", "Ifé"], why: "Sur le Niger." },
    { num: "En quelle année a eu lieu la bataille de Tondibi ?", answer: 1591, why: "Défaite face au Maroc." },
    { qcm: "Le royaume du Bénin est célèbre pour ses…", choices: ["pyramides", "*plaques de bronze", "mosquées en pierre"], why: "Art du palais de l’oba." },
  ] },
  { subject: "HG", chapter: "La Sénégambie du XIe au XVIe siècle", questions: [
    { qcm: "Le fondateur du Djolof est…", choices: ["*Ndiadiane Ndiaye", "Amary Ngoné Sobel", "War Jaabi"], why: "Selon la tradition." },
    { qcm: "Le Gaabu était dirigé par un…", choices: ["Bourba", "*Mansa", "Damel"], why: "Royaume mandingue." },
    { qcm: "La bataille qui marque la dislocation du Djolof est…", choices: ["Kirina", "*Danki", "Tondibi"], why: "Au XVIe siècle." },
  ] },
  { subject: "HG", chapter: "L’Europe du Xe au XVIe siècle", questions: [
    { qcm: "Dans le système féodal, la terre donnée au vassal s’appelle…", choices: ["*un fief", "un califat", "une cité"], why: "En échange de sa fidélité." },
    { qcm: "L’imprimerie a été mise au point par…", choices: ["Colomb", "*Gutenberg", "Magellan"], why: "Vers 1450." },
    { qcm: "Léonard de Vinci est un artiste de…", choices: ["l’Antiquité", "*la Renaissance", "la Révolution"], why: "XVe-XVIe siècles." },
  ] },
  { subject: "HG", chapter: "L’Amérique précolombienne et les grands voyages", questions: [
    { num: "En quelle année Christophe Colomb atteint-il l’Amérique ?", answer: 1492, why: "Date des grandes découvertes." },
    { qcm: "Les Incas vivaient dans…", choices: ["*les Andes", "le Sahara", "les Alpes"], why: "Capitale Cuzco." },
    { qcm: "Le premier tour du monde a été dirigé par…", choices: ["Vasco de Gama", "*Magellan", "Colomb"], why: "1519-1522." },
  ] },
  { subject: "HG", chapter: "Le Sénégal : situation, géologie et relief", questions: [
    { qcm: "Le Sénégal est surtout formé…", choices: ["*d’un bassin sédimentaire", "de hautes montagnes", "de volcans actifs"], why: "Roches déposées par la mer." },
    { qcm: "Le relief du Sénégal est…", choices: ["*bas et plat", "très montagneux", "volcanique"], why: "Plaines et plateaux bas." },
    { num: "Quelle est la superficie du Sénégal en km² (arrondie au millier) ?", answer: 197000, why: "196 722 km² ≈ 197 000 km²." },
  ] },
  { subject: "HG", chapter: "Le Sénégal : climat, eaux, sols, végétation et écosystèmes", questions: [
    { qcm: "Dans un diagramme climatique, les pluies sont représentées par…", choices: ["*des bâtons", "une courbe", "des points"], why: "Températures en courbe." },
    { qcm: "Au nord du Sénégal, la végétation est…", choices: ["*la steppe", "la forêt dense", "la mangrove"], why: "Pluies faibles." },
    { qcm: "Le sol « dior » est…", choices: ["*sableux et filtrant", "très argileux", "volcanique"], why: "Typique du Bassin arachidier." },
  ] },
  { subject: "HG", chapter: "La population du Sénégal", questions: [
    { qcm: "La pyramide des âges du Sénégal a une base…", choices: ["*large (population jeune)", "étroite", "inexistante"], why: "Beaucoup de jeunes." },
    { qcm: "La langue officielle du Sénégal est…", choices: ["le wolof", "*le français", "l’arabe"], why: "Les autres sont des langues nationales." },
    { qcm: "Accroissement naturel = …", choices: ["*naissances − décès", "immigrants − émigrants", "naissances + décès"], why: "Définition." },
  ] },
  { subject: "HG", chapter: "Agriculture, élevage et pêche au Sénégal", questions: [
    { qcm: "L’élevage transhumant domine dans…", choices: ["*le Ferlo", "les Niayes", "Dakar"], why: "Zone pastorale." },
    { qcm: "La riziculture irriguée se pratique surtout dans…", choices: ["*la vallée du fleuve Sénégal", "le Ferlo", "le Bassin arachidier"], why: "Grâce aux aménagements." },
    { vf: "La pêche est une source importante de devises pour le Sénégal.", answer: true, why: "Première exportation." },
  ] },
  { subject: "HG", chapter: "Industrie, tourisme, transports et échanges", questions: [
    { qcm: "Les industries sont surtout concentrées autour de…", choices: ["*Dakar", "Kédougou", "Matam"], why: "Port et marché." },
    { vf: "Le Sénégal exporte plus qu’il n’importe.", answer: false, why: "Sa balance commerciale est déficitaire." },
    { qcm: "Un produit importé en grande quantité est…", choices: ["*le riz", "l’arachide", "le poisson"], why: "Le Sénégal importe beaucoup de riz." },
  ] },
  { subject: "HG", chapter: "Le Sénégal : problèmes et perspectives", questions: [
    { qcm: "Le Sénégal est membre de la CEDEAO, qui regroupe des pays…", choices: ["*d’Afrique de l’Ouest", "d’Europe", "d’Asie"], why: "Communauté économique ouest-africaine." },
    { qcm: "La régionalisation cherche à…", choices: ["*mieux répartir le développement", "tout concentrer à Dakar", "supprimer les régions"], why: "Réduire les disparités." },
    { vf: "La jeunesse de la population peut être une chance pour le pays.", answer: true, why: "Si elle est formée et employée." },
  ] },
  // ── SVT ────────────────────────────────────────────────────────────────────
  { subject: "SVT", chapter: "L’alimentation chez les animaux", questions: [
    { qcm: "Les canines pointues sont typiques des…", choices: ["herbivores", "*carnivores", "granivores"], why: "Pour déchirer la viande." },
    { num: "Combien de poches a l’estomac d’un ruminant ?", answer: 4, why: "Panse, bonnet, feuillet, caillette." },
    { qcm: "Chez les oiseaux, les graines sont broyées dans…", choices: ["la bouche", "*le gésier", "le cœur"], why: "Les oiseaux n’ont pas de dents." },
  ] },
  { subject: "SVT", chapter: "Les besoins de l’organisme et la mauvaise alimentation", questions: [
    { qcm: "Les protides (protéines) servent surtout à…", choices: ["*la construction et la croissance", "l’énergie seulement", "rien"], why: "Aliments de construction." },
    { qcm: "Le goitre est dû à un manque de…", choices: ["*iode", "fer", "sucre"], why: "Prévenu par le sel iodé." },
    { qcm: "Trop de sucre et de gras peut provoquer…", choices: ["le kwashiorkor", "*l’obésité", "le scorbut"], why: "Maladie de l’excès." },
  ] },
  { subject: "SVT", chapter: "Le cadre de vie", questions: [
    { qcm: "Les eaux stagnantes favorisent…", choices: ["*le paludisme", "le goitre", "la myopie"], why: "Les moustiques s’y multiplient." },
    { vf: "La gestion des déchets améliore le cadre de vie.", answer: true, why: "Moins de pollution et de maladies." },
    { qcm: "L’assainissement consiste à…", choices: ["*évacuer et traiter les eaux usées et déchets", "construire des stades", "couper les arbres"], why: "Pour un milieu sain." },
  ] },
  { subject: "SVT", chapter: "Les sols", questions: [
    { qcm: "La matière organique du sol s’appelle…", choices: ["l’argile", "*l’humus", "le sable"], why: "Issue de la décomposition des êtres vivants." },
    { qcm: "Pour lutter contre l’érosion éolienne, on plante…", choices: ["*des haies brise-vent", "rien", "des fleurs en pot"], why: "Elles freinent le vent." },
    { qcm: "Le sol « deck » est…", choices: ["*plus argileux et plus riche", "pur sable", "salé"], why: "Il retient mieux l’eau." },
  ] },
  { subject: "SVT", chapter: "Les roches sédimentaires", questions: [
    { qcm: "Le dépôt de débris en couches s’appelle…", choices: ["l’érosion", "*la sédimentation", "le volcanisme"], why: "Au fond de l’eau." },
    { qcm: "Les restes d’êtres vivants anciens dans les roches sont des…", choices: ["*fossiles", "cristaux", "minerais"], why: "Ils renseignent sur le passé." },
    { qcm: "La roche qui fait effervescence avec l’acide est…", choices: ["le granite", "*le calcaire", "le basalte"], why: "Elle libère du CO₂." },
  ] },
];

const built = buildExerciseSeries("5E", CHAPTERS_5E, SERIES);

export const QUESTIONS_5E = built.questions;
export const ANSWER_KEYS_5E = built.keys;
/** Chapitre de chaque question (banque utilisée par « Préparer mon prochain devoir »). */
export const QUESTION_CHAPTERS_5E = built.questionChapters;
export const ASSESSMENTS_5E = built.assessments;
