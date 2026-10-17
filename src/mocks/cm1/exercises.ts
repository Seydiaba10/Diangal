import "server-only";

// Exercices corrigés du CM1 : une série par chapitre, écrite par DIANGAL d’après les leçons (à faire
// relire par des enseignants). Corrigés inclus : ce fichier ne doit jamais atteindre le navigateur.

import { CHAPTERS_CM1 } from "../curriculum-cm1";
import { buildExerciseSeries, type ExerciseSeries } from "../exercise-series";

const SERIES: ExerciseSeries[] = [
  // ── Mathématiques ──────────────────────────────────────────────────────────
  { subject: "MATH", chapter: "Les grands nombres", questions: [
    { num: "Écris en chiffres : deux millions trente mille.", answer: 2030000, why: "2 000 000 + 30 000." },
    { num: "Complète : 999 999 + 1 = …", answer: 1000000, why: "Un million." },
    { qcm: "Le plus grand nombre est…", choices: ["405 000", "450 000", "*1 005 000"], why: "Il a 7 chiffres, les autres 6." },
  ] },
  { subject: "MATH", chapter: "Les caractères de divisibilité", questions: [
    { vf: "1 254 est divisible par 3.", answer: true, why: "1 + 2 + 5 + 4 = 12, divisible par 3." },
    { qcm: "Lequel est divisible par 9 ?", choices: ["*3 456", "3 455", "3 457"], why: "3 + 4 + 5 + 6 = 18." },
    { qcm: "Un nombre qui finit par 0 est divisible par…", choices: ["3", "*10", "9"], why: "Et aussi par 2 et par 5." },
  ] },
  { subject: "MATH", chapter: "L’addition et la soustraction", questions: [
    { num: "Calcule 125 450 + 87 600.", answer: 213050, why: "125 450 + 87 600 = 213 050 F." },
    { num: "Calcule 300 000 − 145 875.", answer: 154125, why: "Vérification : 154 125 + 145 875 = 300 000." },
    { qcm: "On soustrait pour trouver…", choices: ["un total", "*un reste ou un écart", "un produit"], why: "L’addition donne un total." },
  ] },
  { subject: "MATH", chapter: "La multiplication", questions: [
    { num: "Calcule 324 × 46.", answer: 14904, why: "324 × 6 = 1 944 ; 324 × 40 = 12 960 ; total 14 904." },
    { num: "Calcule 125 × 100.", answer: 12500, why: "On ajoute deux zéros." },
    { num: "125 tables à 18 500 F : quel est le prix total (en F) ?", answer: 2312500, why: "18 500 × 125 = 2 312 500 F." },
  ] },
  { subject: "MATH", chapter: "La division", questions: [
    { num: "Calcule 1 872 ÷ 24.", answer: 78, why: "24 × 78 = 1 872." },
    { num: "Combien de plateaux de 30 œufs remplit-on avec 1 000 œufs ?", answer: 33, why: "30 × 33 = 990 ; il reste 10 œufs." },
    { num: "Combien d’œufs restent ?", answer: 10, why: "1 000 − 990 = 10." },
  ] },
  { subject: "MATH", chapter: "Les nombres décimaux", questions: [
    { qcm: "Le plus grand nombre est…", choices: ["3,75", "*3,8", "3,705"], why: "8 dixièmes &gt; 7 dixièmes." },
    { qcm: "7 m 8 cm s’écrit…", choices: ["7,8 m", "*7,08 m", "78 m"], why: "8 cm = 0,08 m." },
    { vf: "2,5 = 2,50.", answer: true, why: "Le zéro final ne change rien." },
  ] },
  { subject: "MATH", chapter: "Opérations sur les nombres décimaux", questions: [
    { num: "Calcule 25,4 + 3,75.", answer: 29.15, why: "25,40 + 3,75 = 29,15." },
    { num: "Calcule 15 − 6,8.", answer: 8.2, why: "15,0 − 6,8 = 8,2." },
    { num: "Un litre de lait coûte 750 F. Combien coûtent 2,5 L (en F) ?", answer: 1875, why: "750 × 2,5 = 1 875 F." },
  ] },
  { subject: "MATH", chapter: "Les fractions", questions: [
    { qcm: "La fraction simplifiée de 10/15 est…", choices: ["5/10", "*2/3", "1/5"], why: "On divise par 5." },
    { qcm: "45/100 s’écrit…", choices: ["4,5", "*0,45", "45"], why: "45 centièmes." },
    { qcm: "La plus grande fraction est…", choices: ["3/7", "*5/7", "4/7"], why: "Même dénominateur : plus grand numérateur." },
  ] },
  { subject: "MATH", chapter: "Calculer avec les fractions", questions: [
    { qcm: "3/10 + 4/10 =", choices: ["7/20", "*7/10", "12/10"], why: "On additionne les numérateurs." },
    { num: "Combien valent les 3/4 de 800 F ?", answer: 600, why: "800 ÷ 4 = 200 ; 200 × 3 = 600 F." },
    { num: "Awa a dépensé les 2/3 de 1 500 F. Combien a-t-elle dépensé (en F) ?", answer: 1000, why: "1 500 ÷ 3 = 500 ; 500 × 2 = 1 000 F." },
  ] },
  { subject: "MATH", chapter: "Droites et angles", questions: [
    { qcm: "Deux droites qui forment un angle droit sont…", choices: ["parallèles", "*perpendiculaires", "confondues"], why: "C’est la définition." },
    { qcm: "Un angle plus grand qu’un angle droit est…", choices: ["aigu", "*obtus", "nul"], why: "Obtus = plus ouvert." },
    { vf: "Deux droites parallèles se coupent toujours.", answer: false, why: "Elles ne se coupent jamais." },
  ] },
  { subject: "MATH", chapter: "Les figures planes", questions: [
    { qcm: "Un quadrilatère aux côtés opposés parallèles est…", choices: ["un trapèze", "*un parallélogramme", "un triangle"], why: "C’est sa définition." },
    { qcm: "Pour tracer un cercle, j’utilise…", choices: ["l’équerre", "*le compas", "le rapporteur"], why: "On pique au centre." },
    { num: "Combien d’angles droits a un rectangle ?", answer: 4, why: "Quatre angles droits." },
  ] },
  { subject: "MATH", chapter: "Les solides", questions: [
    { num: "Combien d’arêtes a un cube ?", answer: 12, why: "12 arêtes de même longueur." },
    { num: "Combien de sommets a un pavé droit ?", answer: 8, why: "Comme le cube." },
    { qcm: "Les faces d’un pavé droit sont…", choices: ["des disques", "*des rectangles", "des triangles"], why: "Six rectangles." },
  ] },
  { subject: "MATH", chapter: "Symétrie et translation", questions: [
    { qcm: "Une translation…", choices: ["fait tourner la figure", "*fait glisser la figure", "agrandit la figure"], why: "Sans la tourner ni la déformer." },
    { vf: "La symétrie conserve les dimensions d’une figure.", answer: true, why: "Les deux figures se superposent." },
    { num: "Combien d’axes de symétrie a un carré ?", answer: 4, why: "Deux médianes et deux diagonales." },
  ] },
  { subject: "MATH", chapter: "Longueurs et périmètres", questions: [
    { num: "Convertis 2,5 km en mètres.", answer: 2500, why: "1 km = 1 000 m." },
    { num: "Calcule le périmètre (en m) d’une table ronde de 1,2 m de diamètre (π ≈ 3,14).", answer: 3.768, why: "1,2 × 3,14 = 3,768 m." },
    { num: "Un arbre tous les 5 m le long d’une allée de 50 m (aux deux bouts aussi) : combien d’arbres ?", answer: 11, why: "50 ÷ 5 = 10 intervalles, donc 11 arbres." },
  ] },
  { subject: "MATH", chapter: "Capacités, masses et angles", questions: [
    { num: "Convertis 3,5 L en centilitres.", answer: 350, why: "1 L = 100 cL." },
    { num: "Une boîte pleine pèse 1,2 kg, vide 200 g. Quelle est la masse nette (en g) ?", answer: 1000, why: "1 200 − 200 = 1 000 g." },
    { num: "Combien de degrés mesure un angle droit ?", answer: 90, why: "90°." },
  ] },
  { subject: "MATH", chapter: "Les aires", questions: [
    { num: "Calcule l’aire (en cm²) d’un triangle de base 8 cm et de hauteur 5 cm.", answer: 20, why: "8 × 5 ÷ 2 = 20 cm²." },
    { num: "Calcule l’aire (en m²) d’un jardin de 15 m sur 12 m.", answer: 180, why: "15 × 12 = 180 m²." },
    { num: "Combien de dm² y a-t-il dans 1 m² ?", answer: 100, why: "1 m² = 100 dm²." },
  ] },
  { subject: "MATH", chapter: "Les volumes", questions: [
    { num: "Combien de litres contient un aquarium de 50 cm × 30 cm × 20 cm ?", answer: 30, why: "30 000 cm³ = 30 dm³ = 30 L." },
    { num: "Combien pèsent 5 litres d’eau (en kg) ?", answer: 5, why: "1 L d’eau pèse 1 kg." },
    { num: "Combien de dm³ y a-t-il dans 1 m³ ?", answer: 1000, why: "1 m³ = 1 000 dm³." },
  ] },
  { subject: "MATH", chapter: "Durées et mouvements uniformes", questions: [
    { qcm: "2 h 45 min + 1 h 30 min =", choices: ["3 h 15 min", "*4 h 15 min", "4 h 75 min"], why: "75 min = 1 h 15 min." },
    { qcm: "Départ 6 h 50, arrivée 9 h 20 : le voyage a duré…", choices: ["2 h 70 min", "*2 h 30 min", "3 h 30 min"], why: "De 6 h 50 à 9 h 20." },
    { num: "Un vélo roule à 15 km/h pendant 2 h. Quelle distance (en km) ?", answer: 30, why: "15 × 2 = 30 km." },
  ] },
  { subject: "MATH", chapter: "Budget, prix et partages", questions: [
    { num: "Une famille gagne 150 000 F et dépense 132 500 F. Combien économise-t-elle (en F) ?", answer: 17500, why: "150 000 − 132 500 = 17 500 F." },
    { num: "5 000 F entre Awa et Fatou ; Awa reçoit 1 000 F de plus. Combien reçoit Fatou (en F) ?", answer: 2000, why: "(5 000 − 1 000) ÷ 2 = 2 000 F." },
    { num: "Combien reçoit Awa (en F) ?", answer: 3000, why: "2 000 + 1 000 = 3 000 F." },
  ] },
  { subject: "MATH", chapter: "Comprendre l’énoncé d’un problème", questions: [
    { num: "12 sacs de sucre à 25 000 F : quel est le prix d’achat (en F) ?", answer: 300000, why: "12 × 25 000 = 300 000 F." },
    { num: "Avec 6 000 F de transport, quel est le prix de revient (en F) ?", answer: 306000, why: "300 000 + 6 000 = 306 000 F." },
    { vf: "Une donnée inutile doit être utilisée dans le calcul.", answer: false, why: "On la laisse de côté." },
  ] },
  { subject: "MATH", chapter: "Tableaux, schémas et graphiques", questions: [
    { qcm: "Sur une facture, le montant d’une ligne est…", choices: ["*quantité × prix unitaire", "quantité + prix", "prix ÷ quantité"], why: "Puis on additionne les montants." },
    { qcm: "Pour comparer les notes de plusieurs élèves, on utilise…", choices: ["*un diagramme en bâtons", "un patron", "un compas"], why: "Les bâtons se comparent facilement." },
    { vf: "Il faut lire le titre et les unités d’un graphique.", answer: true, why: "Sinon on se trompe." },
  ] },
  { subject: "MATH", chapter: "Démarches de résolution", questions: [
    { num: "Après avoir dépensé 1 250 F, il me reste 750 F. Combien avais-je (en F) ?", answer: 2000, why: "Démarche régressive : 750 + 1 250." },
    { qcm: "Dans la démarche régressive, on remplace une soustraction par…", choices: ["une division", "*une addition", "une multiplication"], why: "C’est l’opération inverse." },
    { num: "Calcule 4 × 1 500.", answer: 6000, why: "4 × 1 500 = 6 000." },
  ] },
  // ── Français ───────────────────────────────────────────────────────────────
  { subject: "FR", chapter: "Lire et comprendre des textes variés", questions: [
    { qcm: "Un texte qui donne des informations sur un animal est…", choices: ["un récit", "*un texte documentaire", "un dialogue"], why: "Il informe." },
    { qcm: "Pour trouver le sens d’un mot difficile, je peux…", choices: ["*m’aider des mots autour", "sauter la page", "deviner au hasard"], why: "C’est le contexte." },
    { vf: "On répond aux questions par des phrases complètes.", answer: true, why: "C’est plus clair." },
  ] },
  { subject: "FR", chapter: "Le dialogue", questions: [
    { qcm: "Dans un dialogue, chaque nouvelle réplique commence par…", choices: ["une virgule", "*un tiret", "un point"], why: "Le tiret marque le changement de personne." },
    { qcm: "Lequel est un verbe de parole ?", choices: ["courir", "*murmurer", "dormir"], why: "Il dit comment on parle." },
    { vf: "Le dialogue s’ouvre et se ferme par des guillemets.", answer: true, why: "« … »." },
  ] },
  { subject: "FR", chapter: "La phrase", questions: [
    { qcm: "« Comme il fait chaud ! » est une phrase…", choices: ["interrogative", "*exclamative", "impérative"], why: "Elle exprime une émotion." },
    { qcm: "La forme négative de « Il mange toujours du riz » est…", choices: ["*Il ne mange jamais de riz.", "Il mange pas du riz.", "Il ne mange toujours du riz."], why: "Toujours → ne… jamais." },
    { qcm: "Une phrase interrogative se termine par…", choices: [".", "*?", "!"], why: "Le point d’interrogation." },
  ] },
  { subject: "FR", chapter: "La nature des mots", questions: [
    { qcm: "Dans « Le petit chat dort », « petit » est…", choices: ["un nom", "*un adjectif", "un verbe"], why: "Il qualifie le nom." },
    { qcm: "« Sous » est…", choices: ["*une préposition", "un adverbe", "un nom"], why: "Il introduit un complément." },
    { qcm: "« Vite » est…", choices: ["un adjectif", "*un adverbe", "un verbe"], why: "Il est invariable et précise le verbe." },
  ] },
  { subject: "FR", chapter: "Les fonctions dans la phrase", questions: [
    { qcm: "Dans « Le maître explique la leçon », « la leçon » est…", choices: ["sujet", "*COD", "COI"], why: "Il explique quoi ?" },
    { qcm: "Dans « Ils parlent aux clients », « aux clients » est…", choices: ["COD", "*COI", "attribut"], why: "Ils parlent à qui ?" },
    { qcm: "Dans « La mer est calme », « calme » est…", choices: ["COD", "*attribut du sujet", "sujet"], why: "Après le verbe être." },
  ] },
  { subject: "FR", chapter: "Les propositions", questions: [
    { num: "Combien de propositions dans « Il pleut, nous restons à la maison » ?", answer: 2, why: "Deux verbes conjugués." },
    { qcm: "« Il est fatigué mais il continue » : les propositions sont…", choices: ["juxtaposées", "*coordonnées", "subordonnées"], why: "Reliées par « mais »." },
    { qcm: "Lequel est une conjonction de coordination ?", choices: ["*car", "quand", "que"], why: "Mais, ou, et, donc, or, ni, car." },
  ] },
  { subject: "FR", chapter: "Le présent de l’indicatif", questions: [
    { qcm: "Nous (grandir) →", choices: ["grandons", "*grandissons", "grandirons"], why: "2e groupe : -issons." },
    { qcm: "Vous (dire) →", choices: ["disez", "*dites", "disiez"], why: "Vous dites." },
    { qcm: "Je (pouvoir) →", choices: ["*peux", "pouve", "peut"], why: "Je peux." },
  ] },
  { subject: "FR", chapter: "Les temps du passé", questions: [
    { qcm: "Le chasseur (lancer) sa lance — passé simple :", choices: ["lançait", "*lança", "a lancé"], why: "Passé simple, 3e personne : -a." },
    { qcm: "« Il faisait nuit » est à…", choices: ["*l’imparfait", "au passé simple", "au présent"], why: "Terminaison -ait." },
    { qcm: "J’(finir) au plus-que-parfait →", choices: ["j’ai fini", "*j’avais fini", "je finissais"], why: "Avoir à l’imparfait + participe." },
  ] },
  { subject: "FR", chapter: "Le futur et le conditionnel", questions: [
    { qcm: "Demain, nous (aller) au champ →", choices: ["allerons", "*irons", "allions"], why: "Futur d’aller." },
    { qcm: "Si j’avais le temps, je (venir) →", choices: ["viendrai", "*viendrais", "venais"], why: "Conditionnel présent." },
    { vf: "Le conditionnel peut exprimer la politesse.", answer: true, why: "Je voudrais…" },
  ] },
  { subject: "FR", chapter: "Les accords", questions: [
    { qcm: "Les (vieux) maisons →", choices: ["vieux", "*vieilles", "vieilless"], why: "Féminin pluriel." },
    { qcm: "Les enfants de mon voisin (jouer) →", choices: ["joue", "*jouent", "jouons"], why: "Le sujet est « les enfants »." },
    { qcm: "Les filles sont (parti) →", choices: ["parti", "*parties", "partis"], why: "Avec être, accord avec le sujet." },
  ] },
  { subject: "FR", chapter: "Les homophones grammaticaux", questions: [
    { qcm: "Les élèves … fini.", choices: ["on", "*ont"], why: "On peut dire « avaient »." },
    { qcm: "Il … lave les mains.", choices: ["ce", "*se"], why: "Verbe pronominal : se laver." },
    { qcm: "… dit qu’il va pleuvoir.", choices: ["*On", "Ont"], why: "On peut dire « il »." },
  ] },
  { subject: "FR", chapter: "Le vocabulaire et le dictionnaire", questions: [
    { qcm: "Le contraire de « monter » est…", choices: ["grimper", "*descendre", "sauter"], why: "Sens opposé." },
    { qcm: "Un synonyme de « peur » est…", choices: ["*crainte", "courage", "joie"], why: "Sens proche." },
    { qcm: "Lequel est de la famille de « laver » ?", choices: ["*lavage", "lave (de volcan)", "lavande"], why: "Lavage = action de laver." },
  ] },
  { subject: "FR", chapter: "Rédiger", questions: [
    { qcm: "Un compte rendu de lecture présente…", choices: ["*le titre, l’auteur, un résumé et mon avis", "seulement les images", "la date du jour"], why: "C’est sa structure." },
    { qcm: "Lequel est un mot de liaison ?", choices: ["*ensuite", "maison", "rouge"], why: "Il relie les idées." },
    { vf: "Le plan d’un texte comprend une introduction, un développement et une conclusion.", answer: true, why: "C’est l’organisation habituelle." },
  ] },
  // ── ESVS ───────────────────────────────────────────────────────────────────
  { subject: "ESVS", chapter: "La préhistoire et la protohistoire au Sénégal", questions: [
    { qcm: "La préhistoire est la période…", choices: ["*avant l’invention de l’écriture", "après l’indépendance", "de la colonisation"], why: "C’est sa définition." },
    { qcm: "Les montagnes de coquillages du delta du Saloum s’appellent…", choices: ["*des amas coquilliers", "des dunes", "des mégalithes"], why: "Elles témoignent d’anciens pêcheurs." },
    { vf: "Les cercles mégalithiques de Sénégambie sont faits de pierres dressées.", answer: true, why: "Ils sont inscrits au patrimoine mondial." },
  ] },
  { subject: "ESVS", chapter: "L’empire du Ghana et le Tékrour", questions: [
    { qcm: "L’empire du Ghana était riche grâce…", choices: ["au pétrole", "*à l’or", "au riz"], why: "Échangé contre le sel." },
    { qcm: "La capitale de l’empire du Ghana était…", choices: ["*Koumbi Saleh", "Dakar", "Gao"], why: "Koumbi Saleh." },
    { qcm: "Le roi du Tékrour qui adopta l’islam est…", choices: ["Soundjata", "*War Jaabi", "Lat Dior"], why: "Au XIe siècle." },
  ] },
  { subject: "ESVS", chapter: "Le Sénégal sur la carte", questions: [
    { qcm: "Le pays enclavé dans le Sénégal est…", choices: ["le Mali", "*la Gambie", "la Guinée"], why: "Le long du fleuve Gambie." },
    { num: "Combien de régions compte le Sénégal ?", answer: 14, why: "Quatorze régions." },
    { qcm: "À l’est, le Sénégal a pour voisin…", choices: ["la Mauritanie", "*le Mali", "la Guinée-Bissau"], why: "Le Mali." },
  ] },
  { subject: "ESVS", chapter: "Le climat du Sénégal", questions: [
    { qcm: "Le vent chaud et sec qui vient du Sahara est…", choices: ["l’alizé", "*l’harmattan", "la mousson"], why: "Il souffle en saison sèche." },
    { qcm: "La région la plus pluvieuse est…", choices: ["Podor", "*Ziguinchor", "Louga"], why: "Le sud reçoit le plus de pluie." },
    { vf: "Les pluies diminuent du sud vers le nord.", answer: true, why: "Le nord est sahélien." },
  ] },
  { subject: "ESVS", chapter: "Végétation, faune et parcs nationaux", questions: [
    { qcm: "Le parc du Djoudj est célèbre pour…", choices: ["les lions", "*les oiseaux migrateurs", "les éléphants"], why: "Il accueille des millions d’oiseaux." },
    { qcm: "Dans le Niokolo-Koba, on peut voir…", choices: ["*des lions et des hippopotames", "des pingouins", "des ours"], why: "C’est un parc de savane." },
    { qcm: "La mangrove pousse…", choices: ["dans le désert", "*dans les estuaires", "en montagne"], why: "Au bord de l’eau salée." },
  ] },
  { subject: "ESVS", chapter: "Les transports et les échanges", questions: [
    { qcm: "Le TER relie…", choices: ["*Dakar à Diamniadio", "Dakar à Ziguinchor", "Saint-Louis à Podor"], why: "Train express régional." },
    { qcm: "L’aéroport international du Sénégal porte le nom de…", choices: ["*Blaise Diagne", "Léopold Senghor", "Lat Dior"], why: "Aéroport Blaise Diagne." },
    { vf: "Les transports permettent de vendre les produits des régions.", answer: true, why: "Ils favorisent les échanges." },
  ] },
  { subject: "ESVS", chapter: "Les états de l’eau", questions: [
    { qcm: "Quand la glace fond, c’est…", choices: ["la solidification", "*la fusion", "l’évaporation"], why: "Solide → liquide." },
    { qcm: "Le linge sèche grâce à…", choices: ["*l’évaporation", "la condensation", "la fusion"], why: "L’eau devient vapeur." },
    { qcm: "La buée sur une bouteille fraîche est due à…", choices: ["*la condensation", "la fusion", "la solidification"], why: "La vapeur redevient liquide." },
  ] },
  { subject: "ESVS", chapter: "L’air et la combustion", questions: [
    { qcm: "Une bougie sous un verre retourné s’éteint car…", choices: ["*elle manque d’air", "il fait trop froid", "la mèche est mouillée"], why: "Le feu a besoin de dioxygène." },
    { vf: "On éteint un feu d’huile avec de l’eau.", answer: false, why: "C’est dangereux : on l’étouffe avec un couvercle ou une couverture." },
    { qcm: "Pour qu’un feu brûle, il faut un combustible, de la chaleur et…", choices: ["*de l’air", "du sable", "de l’eau"], why: "C’est le triangle du feu." },
  ] },
  { subject: "ESVS", chapter: "Les plantes à fleurs", questions: [
    { qcm: "Le transport du pollen s’appelle…", choices: ["la germination", "*la pollinisation", "la floraison"], why: "Par le vent ou les insectes." },
    { qcm: "Après la pollinisation, la fleur devient…", choices: ["une racine", "*un fruit", "une feuille"], why: "Le fruit contient les graines." },
    { vf: "Une graine a besoin d’eau pour germer.", answer: true, why: "Et d’air et de chaleur." },
  ] },
  { subject: "ESVS", chapter: "Les aliments et leur conservation", questions: [
    { qcm: "Le « guedj » est du poisson…", choices: ["frais", "*séché", "congelé"], why: "Le séchage le conserve." },
    { qcm: "Les microbes se développent surtout dans les aliments…", choices: ["secs et froids", "*humides et chauds", "salés"], why: "On conserve au sec ou au froid." },
    { vf: "Le réfrigérateur ralentit le pourrissement des aliments.", answer: true, why: "Le froid ralentit les microbes." },
  ] },
  { subject: "ESVS", chapter: "L’électricité", questions: [
    { qcm: "Lequel conduit le courant ?", choices: ["le plastique", "*le cuivre", "le bois sec"], why: "Les métaux sont conducteurs." },
    { vf: "On peut toucher un fil électrique dénudé.", answer: false, why: "Le courant peut tuer." },
    { qcm: "Les fils électriques sont entourés de plastique car il est…", choices: ["conducteur", "*isolant", "lourd"], why: "Il nous protège." },
  ] },
  { subject: "ESVS", chapter: "L’organisation administrative", questions: [
    { qcm: "La région est administrée par…", choices: ["le maire", "*le gouverneur", "le préfet"], why: "Il représente l’État dans la région." },
    { qcm: "Le département est administré par…", choices: ["*le préfet", "le sous-préfet", "le gouverneur"], why: "Le préfet." },
    { qcm: "Le maire est…", choices: ["nommé par le Président", "*élu par les habitants avec le conseil municipal", "choisi par le préfet"], why: "C’est un élu local." },
  ] },
  { subject: "ESVS", chapter: "Les droits de l’enfant", questions: [
    { qcm: "L’acte de naissance donne à l’enfant…", choices: ["*un nom et une existence légale", "de l’argent", "un métier"], why: "C’est un droit." },
    { vf: "Le mariage précoce est une atteinte aux droits de l’enfant.", answer: true, why: "L’enfant doit être protégé." },
    { qcm: "Un enfant en danger peut…", choices: ["*demander de l’aide à un adulte de confiance", "se taire", "fuir seul"], why: "Il sera protégé." },
  ] },
  { subject: "ESVS", chapter: "La sécurité routière", questions: [
    { qcm: "Je traverse quand le feu des piétons est…", choices: ["rouge", "orange", "*vert"], why: "Et après avoir regardé." },
    { qcm: "S’il n’y a pas de trottoir, je marche…", choices: ["au milieu de la route", "*sur le bord gauche, face aux voitures", "sur le bord droit, dos aux voitures"], why: "Je vois arriver les voitures." },
    { vf: "La nuit, des vêtements clairs aident à être vu.", answer: true, why: "Les conducteurs me voient mieux." },
  ] },
  { subject: "ESVS", chapter: "Hygiène et maladies", questions: [
    { qcm: "Le choléra est surtout dû à…", choices: ["*l’eau ou aux aliments souillés", "au froid", "au soleil"], why: "On boit de l’eau potable." },
    { qcm: "On se protège de la rougeole par…", choices: ["*la vaccination", "le sport", "le sommeil"], why: "Le vaccin protège." },
    { vf: "Marcher pieds nus peut donner des vers intestinaux.", answer: true, why: "Certains vers entrent par la peau." },
  ] },
  { subject: "ESVS", chapter: "Les déchets et la pollution", questions: [
    { qcm: "Un sachet plastique met… à disparaître.", choices: ["une semaine", "un an", "*des centaines d’années"], why: "Il pollue très longtemps." },
    { qcm: "Avec les épluchures, on peut faire…", choices: ["*du compost", "du plastique", "du verre"], why: "Un engrais naturel." },
    { vf: "Brûler les ordures dégage des fumées toxiques.", answer: true, why: "Surtout le plastique." },
  ] },
  { subject: "ESVS", chapter: "Les ressources naturelles", questions: [
    { qcm: "Contre la surpêche, on pratique…", choices: ["*le repos biologique", "le reboisement", "la jachère"], why: "On laisse les poissons se reproduire." },
    { qcm: "Pour protéger la forêt, on utilise…", choices: ["*des foyers améliorés", "plus de charbon", "des feux de brousse"], why: "Ils consomment moins de bois." },
    { vf: "Le développement durable pense aux générations futures.", answer: true, why: "On utilise sans épuiser." },
  ] },
];

const built = buildExerciseSeries("CM1", CHAPTERS_CM1, SERIES);

export const QUESTIONS_CM1 = built.questions;
export const ANSWER_KEYS_CM1 = built.keys;
/** Chapitre de chaque question (banque utilisée par « Préparer mon prochain devoir »). */
export const QUESTION_CHAPTERS_CM1 = built.questionChapters;
export const ASSESSMENTS_CM1 = built.assessments;
