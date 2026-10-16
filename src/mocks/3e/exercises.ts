import "server-only";

// Exercices corrigés de 3e : une série par chapitre (Thalès et l’immunité ont déjà la leur dans
// assessments-3e.ts), écrite par DIANGAL d’après les leçons (à faire relire par des enseignants).
// Corrigés inclus : ce fichier ne doit jamais atteindre le navigateur.

import { CHAPTERS_3E } from "../curriculum-3e";
import { buildExerciseSeries, type ExerciseSeries } from "../exercise-series";

const SERIES: ExerciseSeries[] = [
  // ── Mathématiques ──────────────────────────────────────────────────────────
  {
    subject: "MATH",
    chapter: "Racine carrée",
    questions: [
      { num: "Calcule √49 × √4.", answer: 14, why: "√49 = 7 et √4 = 2, donc 7 × 2 = 14." },
      { qcm: "La forme simplifiée de √50 est…", choices: ["25√2", "*5√2", "2√5"], why: "50 = 25 × 2, donc √50 = √25 × √2 = 5√2." },
      { vf: "√9 + √16 = √25.", answer: false, why: "√9 + √16 = 3 + 4 = 7, alors que √25 = 5 : on n’additionne pas sous la racine." },
    ],
  },
  {
    subject: "MATH",
    chapter: "Calcul algébrique",
    questions: [
      { qcm: "Le développement de (x + 3)² est…", choices: ["x² + 9", "*x² + 6x + 9", "x² + 3x + 9"], why: "(a + b)² = a² + 2ab + b², donc x² + 2 × x × 3 + 9 = x² + 6x + 9." },
      { qcm: "La factorisation de x² − 16 est…", choices: ["(x − 4)²", "*(x − 4)(x + 4)", "(x − 8)(x + 8)"], why: "a² − b² = (a − b)(a + b), avec a = x et b = 4." },
      { num: "Calcule 101² − 99² sans calculatrice.", answer: 400, why: "101² − 99² = (101 − 99)(101 + 99) = 2 × 200 = 400." },
    ],
  },
  {
    subject: "MATH",
    chapter: "Équations et inéquations à une inconnue",
    questions: [
      { num: "Résous 3x − 5 = 10. Quelle est la valeur de x ?", answer: 5, why: "3x = 10 + 5 = 15, donc x = 15 ÷ 3 = 5." },
      { qcm: "Les solutions de (x − 2)(x + 7) = 0 sont…", choices: ["*2 et −7", "−2 et 7", "2 seulement"], why: "Un produit est nul si l’un des facteurs est nul : x − 2 = 0 ou x + 7 = 0." },
      { qcm: "Les solutions de 2x + 1 &gt; 7 sont les nombres x tels que…", choices: ["x &lt; 3", "*x &gt; 3", "x &gt; 4"], why: "2x &gt; 6, donc x &gt; 3 (on divise par 2, nombre positif : le sens ne change pas)." },
    ],
  },
  {
    subject: "MATH",
    chapter: "Équations et inéquations à deux inconnues",
    questions: [
      { qcm: "Le couple solution du système x + y = 10 et x − y = 4 est…", choices: ["*(7 ; 3)", "(3 ; 7)", "(6 ; 4)"], why: "En additionnant les deux équations : 2x = 14, donc x = 7, puis y = 10 − 7 = 3." },
      { num: "On sait que x = 2 et 3x + 2y = 12. Calcule y.", answer: 3, why: "6 + 2y = 12, donc 2y = 6 et y = 3." },
      { vf: "Le couple (1 ; 1) vérifie l’inéquation x + y &lt; 3.", answer: true, why: "1 + 1 = 2 et 2 &lt; 3." },
    ],
  },
  {
    subject: "MATH",
    chapter: "Applications affines",
    questions: [
      { num: "f(x) = 2x + 3. Calcule f(4).", answer: 11, why: "f(4) = 2 × 4 + 3 = 11." },
      { qcm: "Une application linéaire s’écrit…", choices: ["f(x) = ax + b avec b ≠ 0", "*f(x) = ax", "f(x) = x²"], why: "Une application linéaire est une application affine avec b = 0 : sa droite passe par l’origine." },
      { num: "f est affine, f(0) = 1 et f(2) = 7. Quel est son coefficient a ?", answer: 3, why: "a = (7 − 1) ÷ (2 − 0) = 6 ÷ 2 = 3." },
    ],
  },
  {
    subject: "MATH",
    chapter: "Statistique",
    questions: [
      { num: "Notes : 8 ; 12 ; 10 ; 14 ; 6. Quelle est la moyenne ?", answer: 10, why: "(8 + 12 + 10 + 14 + 6) ÷ 5 = 50 ÷ 5 = 10." },
      { qcm: "Dans la série 2 ; 5 ; 5 ; 7 ; 5 ; 9, le mode est…", choices: ["2", "*5", "7"], why: "Le mode est la valeur qui a le plus grand effectif : 5 apparaît 3 fois." },
      { num: "Sur 40 élèves, 10 viennent à pied. Quelle est leur fréquence, en pourcentage ?", answer: 25, why: "10 ÷ 40 = 0,25, soit 25 %." },
    ],
  },
  {
    subject: "MATH",
    chapter: "Relations trigonométriques",
    questions: [
      { qcm: "Dans un triangle rectangle, le cosinus d’un angle aigu est égal à…", choices: ["*côté adjacent ÷ hypoténuse", "côté opposé ÷ hypoténuse", "côté opposé ÷ côté adjacent"], why: "cos = adjacent ÷ hypoténuse (CAH dans « SOH CAH TOA »)." },
      { num: "ABC est rectangle en A, BC = 10 cm et cos B = 0,6. Calcule AB en cm.", answer: 6, why: "cos B = AB ÷ BC, donc AB = BC × cos B = 10 × 0,6 = 6 cm." },
      { vf: "Pour tout angle aigu x, cos² x + sin² x = 1.", answer: true, why: "C’est une relation fondamentale, qui vient du théorème de Pythagore." },
    ],
  },
  {
    subject: "MATH",
    chapter: "Vecteurs",
    questions: [
      { qcm: "D’après la relation de Chasles, le vecteur AB + le vecteur BC est égal au vecteur…", choices: ["*AC", "CA", "BA"], why: "On « enchaîne » les vecteurs : AB + BC = AC." },
      { vf: "Si ABCD est un parallélogramme, les vecteurs AB et DC sont égaux.", answer: true, why: "Dans le parallélogramme ABCD, AB et DC ont même direction, même sens et même longueur." },
      { qcm: "Le vecteur −2u a…", choices: ["*la même direction que u, le sens contraire et une longueur double", "la même direction et le même sens que u", "une direction différente de celle de u"], why: "Multiplier par −2 garde la direction, inverse le sens et double la longueur." },
    ],
  },
  {
    subject: "MATH",
    chapter: "Repérage dans le plan",
    questions: [
      { num: "A(1 ; 2) et B(5 ; 2). Calcule la distance AB.", answer: 4, why: "AB = √((5 − 1)² + (2 − 2)²) = √16 = 4." },
      { qcm: "A(2 ; 4) et B(6 ; 0). Les coordonnées du milieu de [AB] sont…", choices: ["*(4 ; 2)", "(8 ; 4)", "(2 ; 2)"], why: "Milieu : ((2 + 6) ÷ 2 ; (4 + 0) ÷ 2) = (4 ; 2)." },
      { num: "La droite d’équation y = 3x − 1 passe par le point d’abscisse 2. Quelle est son ordonnée ?", answer: 5, why: "y = 3 × 2 − 1 = 5." },
    ],
  },
  {
    subject: "MATH",
    chapter: "Angle inscrit et angle au centre",
    questions: [
      { num: "Un angle au centre mesure 80°. Combien mesure (en degrés) un angle inscrit qui intercepte le même arc ?", answer: 40, why: "L’angle inscrit mesure la moitié de l’angle au centre : 80 ÷ 2 = 40°." },
      { vf: "Deux angles inscrits qui interceptent le même arc ont la même mesure.", answer: true, why: "Ils valent tous les deux la moitié du même angle au centre." },
      { num: "Quelle est la mesure, en degrés, de l’angle au centre d’un hexagone régulier ?", answer: 60, why: "360° ÷ 6 = 60°." },
    ],
  },
  {
    subject: "MATH",
    chapter: "Géométrie dans l’espace",
    questions: [
      { qcm: "Le volume d’une pyramide est égal à…", choices: ["aire de la base × hauteur", "*(aire de la base × hauteur) ÷ 3", "(aire de la base × hauteur) ÷ 2"], why: "V = (B × h) ÷ 3, pour la pyramide comme pour le cône." },
      { num: "Une pyramide a une base de 12 cm² et une hauteur de 5 cm. Quel est son volume en cm³ ?", answer: 20, why: "V = (12 × 5) ÷ 3 = 20 cm³." },
      { num: "On réduit un cône avec le rapport 1/2. Par combien son volume est-il divisé ?", answer: 8, why: "Les volumes sont multipliés par k³ = (1/2)³ = 1/8 : le volume est divisé par 8." },
    ],
  },

  // ── Français ───────────────────────────────────────────────────────────────
  {
    subject: "FR",
    chapter: "Le récit",
    questions: [
      { qcm: "Avec un point de vue omniscient, le narrateur…", choices: ["ne connaît que les actions visibles", "*sait tout, même les pensées des personnages", "est toujours le héros"], why: "Le narrateur omniscient connaît le passé, l’avenir et les pensées de tous." },
      { qcm: "L’événement qui rompt l’équilibre de la situation initiale est…", choices: ["le dénouement", "*l’élément perturbateur", "la situation finale"], why: "L’élément perturbateur lance l’action du récit." },
      { qcm: "Dans un récit au passé, les actions de premier plan sont surtout au…", choices: ["*passé simple", "imparfait", "présent"], why: "Le passé simple exprime les actions brèves et successives ; l’imparfait, l’arrière-plan." },
    ],
  },
  {
    subject: "FR",
    chapter: "La description",
    questions: [
      { qcm: "Dans un récit au passé, la description est en général à…", choices: ["le passé simple", "*l’imparfait", "le futur"], why: "L’imparfait est le temps de la description et de l’arrière-plan." },
      { vf: "Un portrait moral décrit le caractère d’un personnage.", answer: true, why: "Le portrait moral présente le caractère, les qualités et les défauts." },
      { qcm: "« Au loin », « au premier plan » sont des…", choices: ["connecteurs logiques", "*indicateurs de lieu", "verbes de parole"], why: "Ils organisent la description dans l’espace." },
    ],
  },
  {
    subject: "FR",
    chapter: "Le discours rapporté",
    questions: [
      { qcm: "Il dit : « Je viendrai demain. » Au discours indirect, on écrit…", choices: ["*Il dit qu’il viendrait le lendemain.", "Il dit que je viendrai demain.", "Il dit : il viendrait le lendemain."], why: "On change le pronom (je → il), le temps (futur → conditionnel) et l’indicateur de temps (demain → le lendemain)." },
      { vf: "Le discours direct utilise des guillemets ou des tirets.", answer: true, why: "Il cite les paroles exactes, encadrées par des guillemets ou introduites par des tirets." },
      { qcm: "Le discours indirect libre…", choices: ["*n’a pas de verbe introducteur", "utilise toujours des guillemets", "est toujours au présent"], why: "Il mêle le récit et les paroles, sans verbe introducteur ni guillemets." },
    ],
  },
  {
    subject: "FR",
    chapter: "Le texte argumentatif",
    questions: [
      { qcm: "L’opinion défendue dans un texte argumentatif s’appelle…", choices: ["l’exemple", "*la thèse", "le thème"], why: "La thèse est l’opinion ; les arguments la justifient." },
      { qcm: "Quel connecteur exprime l’opposition ?", choices: ["donc", "car", "*cependant"], why: "« Cependant » oppose deux idées ; « donc » marque la conséquence, « car » la cause." },
      { qcm: "« Donc » exprime…", choices: ["la cause", "*la conséquence", "l’addition"], why: "« Donc » introduit le résultat de ce qui précède." },
    ],
  },
  {
    subject: "FR",
    chapter: "La lettre",
    questions: [
      { vf: "Dans une lettre officielle, on précise l’objet de la lettre.", answer: true, why: "L’objet résume en quelques mots la raison de la lettre." },
      { qcm: "« Veuillez agréer, Monsieur, l’expression de mes salutations distinguées » est…", choices: ["une formule d’appel", "*une formule de politesse finale", "l’objet de la lettre"], why: "Elle termine une lettre officielle, avant la signature." },
      { qcm: "Dans une lettre, le lieu et la date se placent…", choices: ["*en haut, à droite", "en bas, à gauche", "après la signature"], why: "On écrit par exemple « Thiès, le 12 mars 2027 » en haut à droite." },
    ],
  },
  {
    subject: "FR",
    chapter: "La poésie",
    questions: [
      { num: "Combien de syllabes compte un alexandrin ?", answer: 12, why: "L’alexandrin est le vers de 12 syllabes." },
      { qcm: "Des rimes disposées ABAB sont…", choices: ["plates", "*croisées", "embrassées"], why: "Plates : AABB ; croisées : ABAB ; embrassées : ABBA." },
      { qcm: "« Ses yeux sont des étoiles » est…", choices: ["une comparaison", "*une métaphore", "une personnification"], why: "Le rapprochement se fait sans outil de comparaison : c’est une métaphore." },
    ],
  },
  {
    subject: "FR",
    chapter: "Le théâtre",
    questions: [
      { qcm: "Les indications de gestes, de ton et de décor s’appellent…", choices: ["les répliques", "*les didascalies", "les tirades"], why: "Les didascalies, souvent en italique, guident le jeu des acteurs." },
      { qcm: "Une réplique dite pour soi, sans que les autres personnages l’entendent, est…", choices: ["une tirade", "*un aparté", "un dialogue"], why: "L’aparté est entendu du public mais pas des autres personnages." },
      { qcm: "Une pièce qui fait rire et se termine bien est…", choices: ["une tragédie", "*une comédie", "un drame"], why: "La comédie fait rire et critique les défauts de la société." },
    ],
  },
  {
    subject: "FR",
    chapter: "Le résumé de texte",
    questions: [
      { vf: "Dans un résumé, on peut donner son opinion personnelle.", answer: false, why: "Le résumé reste fidèle au texte : on n’ajoute rien." },
      { qcm: "En général, un résumé réduit le texte…", choices: ["de moitié", "*au quart environ", "au dixième"], why: "On réduit le texte au quart environ ; la consigne fixe le nombre de mots." },
      { vf: "Le résumé respecte l’ordre des idées du texte.", answer: true, why: "On garde la logique et l’enchaînement des idées de l’auteur." },
    ],
  },

  // ── Anglais ────────────────────────────────────────────────────────────────
  {
    subject: "ANG",
    chapter: "Present simple and continuous",
    questions: [
      { qcm: "She ___ to school every day.", choices: ["*walks", "walk", "is walking"], why: "Every day = a habit: present simple, with -s for she." },
      { qcm: "Look! The children ___ football.", choices: ["play", "plays", "*are playing"], why: "Look! = now: present continuous (are + -ing)." },
      { text: "Write the -ing form of “swim”.", answer: "swimming", why: "Short verb ending with vowel + consonant: double the consonant → swimming." },
    ],
  },
  {
    subject: "ANG",
    chapter: "Daily life and routines",
    questions: [
      { qcm: "Choose the correct sentence.", choices: ["I eat always rice.", "*I always eat rice.", "Always I rice eat."], why: "The adverb of frequency goes before the main verb." },
      { qcm: "“It’s half past seven” means…", choices: ["*7:30", "7:15", "6:30"], why: "Half past seven = seven thirty." },
      { qcm: "“Never” means…", choices: ["toujours", "parfois", "*jamais"], why: "Never = 0 % = jamais." },
    ],
  },
  {
    subject: "ANG",
    chapter: "The simple past",
    questions: [
      { text: "Simple past of “go”:", answer: "went", why: "Go is irregular: go → went." },
      { qcm: "Did you ___ the match yesterday?", choices: ["saw", "*see", "seen"], why: "After did, we use the base verb." },
      { text: "Simple past of “study”:", answer: "studied", why: "Consonant + y → -ied: study → studied." },
    ],
  },
  {
    subject: "ANG",
    chapter: "The present perfect",
    questions: [
      { qcm: "I ___ never ___ to Ziguinchor.", choices: ["*have / been", "has / been", "did / go"], why: "Present perfect with I: have + past participle (been)." },
      { qcm: "I ___ this film last week.", choices: ["have seen", "*saw", "see"], why: "Last week = definite time: simple past." },
      { text: "Past participle of “write”:", answer: "written", why: "write → wrote → written." },
    ],
  },
  {
    subject: "ANG",
    chapter: "Comparatives and superlatives",
    questions: [
      { text: "Comparative of “big”:", answer: "bigger", why: "Short adjective, vowel + consonant: double the consonant and add -er." },
      { qcm: "This is ___ beautiful beach in the region.", choices: ["more", "*the most", "the more"], why: "Long adjective, superlative: the most + adjective." },
      { text: "Superlative of “good”: the ___", answer: "best", accept: ["the best"], why: "good → better → the best (irregular)." },
    ],
  },
  {
    subject: "ANG",
    chapter: "Modal verbs",
    questions: [
      { qcm: "You ___ wear a helmet on a motorbike. It’s the law.", choices: ["*must", "might", "can’t"], why: "An obligation: must." },
      { qcm: "She can ___ Wolof.", choices: ["*speak", "to speak", "speaks"], why: "After a modal: base verb without to." },
      { qcm: "You look tired. You ___ go to bed.", choices: ["*should", "mustn’t", "may not"], why: "Advice: should." },
    ],
  },
  {
    subject: "ANG",
    chapter: "The future",
    questions: [
      { qcm: "Look at those black clouds! It ___ rain.", choices: ["*is going to", "will to", "goes"], why: "A prediction based on evidence: be going to." },
      { qcm: "The contracted form of “will not” is…", choices: ["willn’t", "*won’t", "wouldn’t"], why: "Will not = won’t." },
      { qcm: "“I’m meeting my teacher at four” expresses…", choices: ["*a fixed arrangement", "a habit", "a past action"], why: "Present continuous with a time: a fixed plan." },
    ],
  },
  {
    subject: "ANG",
    chapter: "Reading comprehension",
    questions: [
      { qcm: "Reading a text quickly to get the general idea is called…", choices: ["*skimming", "scanning", "spelling"], why: "Skimming = general idea; scanning = specific information." },
      { qcm: "Reading to find a specific date or name is called…", choices: ["skimming", "*scanning", "translating"], why: "You scan the text for one precise piece of information." },
      { qcm: "“Where did he go?” The best answer is…", choices: ["He goes to the market.", "*He went to the market.", "He has go to the market."], why: "Reuse the tense of the question: simple past." },
    ],
  },

  // ── Histoire-géographie ────────────────────────────────────────────────────
  {
    subject: "HG",
    chapter: "La révolution industrielle et ses conséquences",
    questions: [
      { qcm: "La révolution industrielle commence…", choices: ["*en Angleterre", "en France", "aux États-Unis"], why: "Elle naît en Angleterre à la fin du XVIIIe siècle." },
      { qcm: "Qui a perfectionné la machine à vapeur ?", choices: ["Karl Marx", "*James Watt", "Adam Smith"], why: "James Watt améliore la machine à vapeur, moteur de la première révolution industrielle." },
      { qcm: "Le socialisme défend…", choices: ["*la propriété collective des moyens de production", "la liberté totale du marché", "le pouvoir absolu du roi"], why: "Karl Marx et les socialistes veulent mettre fin à la propriété privée des usines." },
    ],
  },
  {
    subject: "HG",
    chapter: "L’impérialisme européen et le partage de l’Afrique",
    questions: [
      { num: "En quelle année s’achève la conférence de Berlin ?", answer: 1885, why: "Elle se tient de novembre 1884 à février 1885." },
      { qcm: "L’administration indirecte (indirect rule) est le système…", choices: ["français", "*britannique", "portugais"], why: "Les Britanniques gouvernent en s’appuyant sur les chefs locaux." },
      { qcm: "Vers 1914, quels pays africains restent indépendants ?", choices: ["*l’Éthiopie et le Liberia", "le Sénégal et le Mali", "l’Égypte et le Maroc"], why: "Tout le reste du continent est colonisé." },
    ],
  },
  {
    subject: "HG",
    chapter: "Les résistances africaines",
    questions: [
      { qcm: "Lat Dior Diop s’opposait à…", choices: ["*la construction du chemin de fer Dakar–Saint-Louis", "la culture du coton", "la création de l’AOF"], why: "Le damel du Cayor refusait que le chemin de fer traverse son royaume." },
      { num: "En quelle année Cheikh Ahmadou Bamba est-il déporté au Gabon ?", answer: 1895, why: "Les autorités coloniales le déportent au Gabon en 1895." },
      { qcm: "Où Ménélik II bat-il les Italiens en 1896 ?", choices: ["*Adoua", "Dekhelé", "Médine"], why: "La victoire d’Adoua garde l’Éthiopie indépendante." },
    ],
  },
  {
    subject: "HG",
    chapter: "L’impérialisme en Asie et en Amérique",
    questions: [
      { qcm: "L’ère Meiji (à partir de 1868) est la modernisation…", choices: ["de la Chine", "*du Japon", "de l’Inde"], why: "Le Japon se modernise et devient une puissance impérialiste." },
      { qcm: "La doctrine Monroe se résume par…", choices: ["*« L’Amérique aux Américains »", "« L’Afrique aux Africains »", "« L’Asie aux Asiatiques »"], why: "En 1823, les États-Unis refusent toute intervention européenne en Amérique." },
      { num: "En quelle année le canal de Panama est-il ouvert ?", answer: 1914, why: "Construit par les États-Unis, il ouvre en 1914." },
    ],
  },
  {
    subject: "HG",
    chapter: "La Première Guerre mondiale",
    questions: [
      { num: "En quelle année commence la Première Guerre mondiale ?", answer: 1914, why: "Elle dure de 1914 à 1918." },
      { qcm: "Quel député sénégalais organise le recrutement des tirailleurs en 1918 ?", choices: ["Lamine Guèye", "*Blaise Diagne", "Léopold Sédar Senghor"], why: "Blaise Diagne, premier député africain, mène cette mission de recrutement." },
      { qcm: "Après la guerre, quelle organisation est créée pour garantir la paix ?", choices: ["l’ONU", "*la Société des Nations", "l’OTAN"], why: "La SDN est créée en 1919 ; l’ONU la remplace en 1945." },
    ],
  },
  {
    subject: "HG",
    chapter: "La révolution russe",
    questions: [
      { qcm: "Qui dirige les bolcheviks en octobre 1917 ?", choices: ["Staline", "*Lénine", "Nicolas II"], why: "Lénine et les bolcheviks prennent le pouvoir en octobre 1917." },
      { num: "En quelle année naît l’URSS ?", answer: 1922, why: "L’Union des républiques socialistes soviétiques est créée en 1922." },
      { qcm: "La NEP (1921) autorise…", choices: ["*un peu de commerce privé", "le retour du tsar", "la guerre contre l’Allemagne"], why: "La nouvelle politique économique relance l’économie après la guerre civile." },
    ],
  },
  {
    subject: "HG",
    chapter: "La crise des années 1930",
    questions: [
      { qcm: "Le krach de 1929 commence à la Bourse de…", choices: ["Londres", "Paris", "*New York"], why: "Le « jeudi noir », 24 octobre 1929, à Wall Street (New York)." },
      { qcm: "Le New Deal est la politique de…", choices: ["Hitler", "*Roosevelt", "Staline"], why: "Le président américain Roosevelt lance le New Deal en 1933." },
      { vf: "La crise des années 1930 a aussi touché les paysans sénégalais.", answer: true, why: "La chute du prix de l’arachide les a appauvris." },
    ],
  },
  {
    subject: "HG",
    chapter: "La Seconde Guerre mondiale",
    questions: [
      { qcm: "Le massacre de Thiaroye a lieu le…", choices: ["*1er décembre 1944", "8 mai 1945", "11 novembre 1918"], why: "Des tirailleurs qui réclamaient leur dû sont tués par l’armée française le 1er décembre 1944." },
      { num: "En quelle année est créée l’ONU ?", answer: 1945, why: "L’Organisation des Nations unies naît en 1945." },
      { qcm: "L’invasion de quel pays déclenche la guerre en 1939 ?", choices: ["la France", "*la Pologne", "l’URSS"], why: "L’Allemagne envahit la Pologne le 1er septembre 1939." },
    ],
  },
  {
    subject: "HG",
    chapter: "Les révolutions chinoises",
    questions: [
      { num: "En quelle année Mao proclame-t-il la République populaire de Chine ?", answer: 1949, why: "Le 1er octobre 1949, à Pékin." },
      { qcm: "Sun Yat-sen fonde…", choices: ["le Parti communiste chinois", "*le Guomindang", "l’Armée rouge"], why: "Le Guomindang est le parti nationaliste." },
      { qcm: "La Longue Marche (1934-1935) est celle…", choices: ["*des communistes", "des nationalistes", "des Japonais"], why: "Les communistes de Mao échappent ainsi aux nationalistes." },
    ],
  },
  {
    subject: "HG",
    chapter: "Les relations Est-Ouest de 1945 aux années 1990",
    questions: [
      { num: "En quelle année tombe le mur de Berlin ?", answer: 1989, why: "Le 9 novembre 1989." },
      { qcm: "L’alliance militaire du bloc de l’Ouest est…", choices: ["*l’OTAN", "le pacte de Varsovie", "la SDN"], why: "L’OTAN est créée en 1949 ; le pacte de Varsovie est celui de l’Est (1955)." },
      { qcm: "La crise de Cuba a lieu en…", choices: ["1949", "*1962", "1989"], why: "En 1962, le monde frôle la guerre nucléaire." },
    ],
  },
  {
    subject: "HG",
    chapter: "La décolonisation en Afrique",
    questions: [
      { qcm: "Quel pays vote « non » au référendum de 1958 ?", choices: ["le Sénégal", "*la Guinée", "la Côte d’Ivoire"], why: "La Guinée de Sékou Touré devient indépendante en 1958." },
      { num: "Combien de pays africains deviennent indépendants en 1960 ?", answer: 17, why: "1960 est « l’année des indépendances » : 17 pays africains." },
      { qcm: "L’Algérie devient indépendante après…", choices: ["*une longue guerre (1954-1962)", "un simple référendum en 1956", "la conférence de Berlin"], why: "La guerre d’Algérie se termine avec les accords d’Évian en 1962." },
    ],
  },
  {
    subject: "HG",
    chapter: "Bandung et l’émergence du Tiers-monde",
    questions: [
      { num: "En quelle année a lieu la conférence de Bandung ?", answer: 1955, why: "En avril 1955." },
      { qcm: "Bandung se trouve en…", choices: ["*Indonésie", "Inde", "Égypte"], why: "Bandung est une ville d’Indonésie." },
      { vf: "Les pays non alignés refusent de choisir entre les deux blocs.", answer: true, why: "Ils veulent rester indépendants de l’Est comme de l’Ouest." },
    ],
  },
  {
    subject: "HG",
    chapter: "Le Sénégal de 1944 à 1962",
    questions: [
      { qcm: "Qui fonde le Bloc démocratique sénégalais en 1948 ?", choices: ["*Léopold Sédar Senghor", "Mamadou Dia", "Blaise Diagne"], why: "Senghor fonde le BDS en 1948." },
      { qcm: "Le 20 août 1960, le Sénégal…", choices: ["*quitte la Fédération du Mali et proclame son indépendance", "entre dans la Communauté française", "adopte sa Constitution actuelle"], why: "La Fédération du Mali éclate et le Sénégal proclame son indépendance." },
      { qcm: "La loi Lamine Guèye (1946)…", choices: ["*donne la citoyenneté française aux habitants des colonies", "abolit l’esclavage", "crée la Fédération du Mali"], why: "Elle fait de tous les habitants des colonies des citoyens." },
    ],
  },
  {
    subject: "HG",
    chapter: "La Terre, un village planétaire",
    questions: [
      { vf: "Les grands flux d’échanges relient surtout l’Amérique du Nord, l’Europe et l’Asie de l’Est.", answer: true, why: "Ces trois pôles dominent les échanges mondiaux." },
      { qcm: "Quelle infrastructure fait du Sénégal une porte d’entrée de l’Afrique de l’Ouest ?", choices: ["*le port autonome de Dakar", "le lac Rose", "le parc du Niokolo-Koba"], why: "Le port de Dakar sert aussi les pays voisins sans accès à la mer." },
      { qcm: "Les câbles sous-marins servent à…", choices: ["*transporter les données d’Internet", "transporter le pétrole", "produire de l’électricité"], why: "Ils relient les continents pour les télécommunications." },
    ],
  },
  {
    subject: "HG",
    chapter: "Les systèmes économiques et les inégalités de développement",
    questions: [
      { qcm: "Dans le système libéral, les décisions économiques dépendent surtout…", choices: ["*du marché", "du plan de l’État", "du roi"], why: "L’offre et la demande fixent les prix et la production." },
      { qcm: "L’IDH prend en compte…", choices: ["*le revenu, la santé et l’éducation", "seulement le PIB", "la superficie du pays"], why: "L’indice de développement humain combine ces trois dimensions." },
      { vf: "La Chine et l’Inde sont des pays émergents.", answer: true, why: "Leur croissance économique est rapide." },
    ],
  },
  {
    subject: "HG",
    chapter: "La coopération internationale",
    questions: [
      { num: "En quelle année est créée la CEDEAO ?", answer: 1975, why: "La Communauté économique des États de l’Afrique de l’Ouest est créée en 1975." },
      { qcm: "L’OMVS s’occupe de la mise en valeur du fleuve…", choices: ["Gambie", "*Sénégal", "Casamance"], why: "Organisation pour la mise en valeur du fleuve Sénégal (1972)." },
      { qcm: "Une coopération entre deux pays seulement est…", choices: ["*bilatérale", "multilatérale", "régionale"], why: "Bi = deux ; la coopération multilatérale passe par des organisations." },
    ],
  },
  {
    subject: "HG",
    chapter: "Ressources, environnement et climat",
    questions: [
      { qcm: "Laquelle est une ressource non renouvelable ?", choices: ["les poissons", "les forêts", "*le pétrole"], why: "Le pétrole met des millions d’années à se former." },
      { qcm: "Le principal gaz à effet de serre rejeté par les activités humaines est…", choices: ["*le dioxyde de carbone", "le dioxygène", "l’azote"], why: "Le CO₂ vient surtout de la combustion du charbon, du pétrole et du gaz." },
      { qcm: "La Grande Muraille verte est un projet de…", choices: ["*reboisement contre l’avancée du désert", "barrage hydroélectrique", "autoroute"], why: "Une bande d’arbres à travers le Sahel, du Sénégal à Djibouti." },
    ],
  },

  // ── SVT ────────────────────────────────────────────────────────────────────
  {
    subject: "SVT",
    chapter: "Le système nerveux",
    questions: [
      { qcm: "Le centre nerveux d’un réflexe médullaire est…", choices: ["le cerveau", "*la moelle épinière", "le muscle"], why: "Le message va du récepteur à la moelle épinière, puis au muscle, sans passer par le cerveau." },
      { qcm: "Les nerfs qui conduisent les messages vers les muscles sont…", choices: ["sensitifs", "*moteurs", "optiques"], why: "Les nerfs moteurs commandent les muscles." },
      { vf: "Un acte volontaire est commandé par le cerveau.", answer: true, why: "Le message part du cortex cérébral." },
    ],
  },
  {
    subject: "SVT",
    chapter: "La vision",
    questions: [
      { qcm: "L’image se forme sur…", choices: ["la cornée", "le cristallin", "*la rétine"], why: "La rétine joue le rôle d’écran." },
      { qcm: "La myopie se corrige avec des lentilles…", choices: ["convergentes", "*divergentes", "colorées"], why: "Chez le myope, l’image se forme avant la rétine : une lentille divergente la recule." },
      { qcm: "L’image formée sur la rétine est…", choices: ["*réelle et renversée", "virtuelle et droite", "agrandie et droite"], why: "Le cerveau la redresse." },
    ],
  },
  {
    subject: "SVT",
    chapter: "La respiration",
    questions: [
      { qcm: "Les échanges gazeux pulmonaires se font au niveau…", choices: ["de la trachée", "*des alvéoles", "des bronches"], why: "Les alvéoles sont entourées de capillaires sanguins." },
      { num: "Quel est le pourcentage de dioxygène dans l’air inspiré ?", answer: 21, why: "L’air contient environ 21 % de dioxygène." },
      { qcm: "La respiration cellulaire dégrade le glucose grâce…", choices: ["*au dioxygène", "au dioxyde de carbone", "à l’azote"], why: "Glucose + dioxygène → dioxyde de carbone + eau + énergie." },
    ],
  },
  {
    subject: "SVT",
    chapter: "La fermentation",
    questions: [
      { qcm: "La fermentation alcoolique produit…", choices: ["*de l’éthanol et du dioxyde de carbone", "du dioxygène", "de l’acide lactique et du dioxygène"], why: "La levure transforme le sucre en éthanol et en CO₂." },
      { vf: "La fermentation libère plus d’énergie que la respiration.", answer: false, why: "La dégradation du glucose est incomplète : peu d’énergie est libérée." },
      { qcm: "Le lait caillé est obtenu par…", choices: ["la fermentation alcoolique", "*la fermentation lactique", "la respiration"], why: "Des bactéries transforment le sucre du lait en acide lactique." },
    ],
  },
  {
    subject: "SVT",
    chapter: "Le rein et l’excrétion urinaire",
    questions: [
      { qcm: "L’unité du rein qui fabrique l’urine est…", choices: ["l’alvéole", "*le néphron", "le neurone"], why: "Chaque rein contient environ un million de néphrons." },
      { vf: "Une urine normale contient du glucose.", answer: false, why: "Le glucose est entièrement réabsorbé ; sa présence dans l’urine est le signe d’une maladie (diabète)." },
      { qcm: "Le principal déchet éliminé par l’urine est…", choices: ["*l’urée", "le glucose", "le dioxygène"], why: "L’urée est un déchet azoté fabriqué par le foie." },
    ],
  },
  {
    subject: "SVT",
    chapter: "Le VIH/sida et l’aide à l’immunité",
    questions: [
      { qcm: "Le VIH détruit surtout…", choices: ["les globules rouges", "*les lymphocytes T4", "les plaquettes"], why: "Les lymphocytes T4 coordonnent la réponse immunitaire." },
      { vf: "Le VIH se transmet par une poignée de main.", answer: false, why: "Il se transmet par le sang, les rapports sexuels non protégés et de la mère à l’enfant." },
      { qcm: "Un sérum…", choices: ["*apporte des anticorps tout faits, avec une action immédiate", "donne une protection lente et durable", "contient un microbe affaibli"], why: "Le sérum soigne ; le vaccin prévient." },
    ],
  },
  {
    subject: "SVT",
    chapter: "La tectonique des plaques",
    questions: [
      { qcm: "Au niveau des dorsales océaniques, les plaques…", choices: ["*s’écartent", "se rapprochent", "glissent côte à côte"], why: "C’est la divergence : un nouveau plancher océanique se forme." },
      { qcm: "La plongée d’une plaque océanique sous une autre plaque s’appelle…", choices: ["la divergence", "*la subduction", "l’érosion"], why: "La subduction s’accompagne de séismes et de volcans." },
      { qcm: "Sur quelle plaque se trouve le Sénégal ?", choices: ["*la plaque africaine", "la plaque eurasienne", "la plaque sud-américaine"], why: "Loin des frontières de plaques, le Sénégal connaît peu de séismes." },
    ],
  },
  {
    subject: "SVT",
    chapter: "Les roches métamorphiques",
    questions: [
      { qcm: "Un calcaire métamorphisé donne…", choices: ["le gneiss", "*le marbre", "le basalte"], why: "Calcaire → marbre ; argile → schiste puis gneiss ; grès → quartzite." },
      { vf: "Pendant le métamorphisme, la roche fond complètement.", answer: false, why: "La roche se transforme à l’état solide." },
      { qcm: "Le métamorphisme est dû à…", choices: ["*une forte température et une forte pression", "la pluie", "le vent"], why: "Il se produit en profondeur." },
    ],
  },
  {
    subject: "SVT",
    chapter: "Le cycle des roches et la chronologie en géologie",
    questions: [
      { qcm: "D’après le principe de superposition, une couche est…", choices: ["*plus récente que celle qu’elle recouvre", "plus ancienne que celle qu’elle recouvre", "du même âge que toutes les autres"], why: "Les couches se déposent les unes sur les autres." },
      { qcm: "Le granite et le basalte sont des roches…", choices: ["sédimentaires", "*magmatiques", "métamorphiques"], why: "Elles naissent du refroidissement d’un magma." },
      { vf: "Une faille est plus récente que les couches qu’elle recoupe.", answer: true, why: "C’est le principe de recoupement." },
    ],
  },

  // ── Sciences physiques ─────────────────────────────────────────────────────
  {
    subject: "PC",
    chapter: "Les lentilles minces",
    questions: [
      { num: "Quelle est la vergence, en dioptries, d’une lentille de distance focale 0,25 m ?", answer: 4, why: "C = 1 ÷ f = 1 ÷ 0,25 = 4 δ." },
      { qcm: "Une lentille à bords minces est…", choices: ["*convergente", "divergente", "plane"], why: "Bords minces : convergente ; bords épais : divergente." },
      { qcm: "Un rayon qui passe par le centre optique…", choices: ["*n’est pas dévié", "ressort par le foyer image", "ressort parallèle à l’axe"], why: "C’est l’un des trois rayons particuliers." },
    ],
  },
  {
    subject: "PC",
    chapter: "La dispersion de la lumière blanche",
    questions: [
      { qcm: "Quelle couleur est la plus déviée par le prisme ?", choices: ["le rouge", "le vert", "*le violet"], why: "Le violet est le plus dévié, le rouge le moins." },
      { qcm: "Un objet rouge éclairé en lumière blanche…", choices: ["*diffuse le rouge et absorbe les autres couleurs", "absorbe le rouge", "diffuse toutes les couleurs"], why: "On voit la couleur diffusée." },
      { vf: "La lumière blanche est un mélange de lumières colorées.", answer: true, why: "Le prisme sépare ces lumières : c’est la dispersion." },
    ],
  },
  {
    subject: "PC",
    chapter: "Les forces",
    questions: [
      { num: "Calcule le poids, en newtons, d’un objet de 25 kg (g = 10 N/kg).", answer: 250, why: "P = m × g = 25 × 10 = 250 N." },
      { qcm: "L’intensité d’une force se mesure avec…", choices: ["*un dynamomètre", "un thermomètre", "un ampèremètre"], why: "Le dynamomètre est gradué en newtons." },
      { vf: "La masse d’un objet change quand on va sur la Lune.", answer: false, why: "La masse ne change pas ; c’est le poids qui diminue." },
    ],
  },
  {
    subject: "PC",
    chapter: "L’équilibre d’un solide soumis à deux forces",
    questions: [
      { num: "Une lampe de poids 20 N est suspendue à un fil. Quelle est la tension du fil, en N ?", answer: 20, why: "À l’équilibre, la tension compense le poids : T = P = 20 N." },
      { qcm: "Deux forces qui se compensent ont…", choices: ["*la même droite d’action, des sens contraires et la même intensité", "le même sens et la même intensité", "des droites d’action perpendiculaires"], why: "Ce sont les conditions d’équilibre d’un solide soumis à deux forces." },
      { vf: "Un livre immobile sur une table n’est soumis à aucune force.", answer: false, why: "Il est soumis à son poids et à la réaction de la table, qui se compensent." },
    ],
  },
  {
    subject: "PC",
    chapter: "Le principe des actions réciproques",
    questions: [
      { vf: "Les deux forces d’une interaction s’appliquent sur le même corps.", answer: false, why: "A agit sur B et B agit sur A : deux corps différents." },
      { qcm: "Quand la pagaie pousse l’eau vers l’arrière, l’eau pousse la pirogue…", choices: ["*vers l’avant", "vers l’arrière", "vers le bas"], why: "Les deux forces sont de sens contraires." },
      { num: "Un livre exerce une force de 5 N sur une table. Quelle force, en N, la table exerce-t-elle sur le livre ?", answer: 5, why: "Les deux forces ont la même intensité." },
    ],
  },
  {
    subject: "PC",
    chapter: "Travail et puissance mécaniques",
    questions: [
      { num: "Quel travail, en joules, faut-il pour soulever un sac de 20 kg de 2 m (g = 10 N/kg) ?", answer: 400, why: "W = m × g × h = 20 × 10 × 2 = 400 J." },
      { num: "Un travail de 600 J est fourni en 3 s. Quelle est la puissance, en watts ?", answer: 200, why: "P = W ÷ t = 600 ÷ 3 = 200 W." },
      { qcm: "Le travail des frottements est…", choices: ["moteur", "*résistant", "toujours nul"], why: "Les frottements s’opposent au mouvement." },
    ],
  },
  {
    subject: "PC",
    chapter: "L’électrisation par frottement",
    questions: [
      { qcm: "Deux corps chargés de même signe…", choices: ["s’attirent", "*se repoussent", "ne réagissent pas"], why: "Même signe : répulsion ; signes contraires : attraction." },
      { qcm: "Un corps qui gagne des électrons devient…", choices: ["*négatif", "positif", "neutre"], why: "Les électrons portent une charge négative." },
      { vf: "Le cuivre est un isolant électrique.", answer: false, why: "Le cuivre est un très bon conducteur : on en fait les fils électriques." },
    ],
  },
  {
    subject: "PC",
    chapter: "Le courant électrique",
    questions: [
      { qcm: "L’ampèremètre se branche…", choices: ["*en série", "en dérivation", "à la place du générateur"], why: "Le courant doit le traverser." },
      { num: "I = 0,8 A dans la branche principale et I₁ = 0,3 A dans une dérivation. Calcule I₂, en A.", answer: 0.5, why: "Loi des nœuds : I₂ = I − I₁ = 0,8 − 0,3 = 0,5 A." },
      { num: "Combien de milliampères font 1,2 A ?", answer: 1200, why: "1 A = 1 000 mA, donc 1,2 A = 1 200 mA." },
    ],
  },
  {
    subject: "PC",
    chapter: "La résistance électrique et la loi d’Ohm",
    questions: [
      { num: "R = 100 Ω et I = 0,05 A. Calcule U, en volts.", answer: 5, why: "U = R × I = 100 × 0,05 = 5 V." },
      { num: "Deux résistances de 100 Ω et 200 Ω sont en série. Résistance équivalente, en Ω ?", answer: 300, why: "En série, les résistances s’additionnent." },
      { num: "Deux résistances de 100 Ω sont en dérivation. Résistance équivalente, en Ω ?", answer: 50, why: "1/R = 1/100 + 1/100 = 2/100, donc R = 50 Ω." },
    ],
  },
  {
    subject: "PC",
    chapter: "Énergie et rendement",
    questions: [
      { num: "Un ventilateur de 50 W fonctionne 6 h. Énergie consommée, en kWh ?", answer: 0.3, why: "E = P × t = 0,05 kW × 6 h = 0,3 kWh." },
      { num: "Un moteur reçoit 1 000 J et fournit 800 J d’énergie utile. Quel est son rendement, en % ?", answer: 80, why: "η = 800 ÷ 1 000 = 0,8, soit 80 %." },
      { vf: "Le rendement d’un appareil peut dépasser 100 %.", answer: false, why: "Une partie de l’énergie est toujours perdue : le rendement est inférieur à 100 %." },
    ],
  },
  {
    subject: "PC",
    chapter: "La calorimétrie",
    questions: [
      { num: "Quelle quantité de chaleur, en J, faut-il pour chauffer 1 kg d’eau de 10 °C (c = 4 180 J/(kg·°C)) ?", answer: 41800, why: "Q = m × c × Δθ = 1 × 4 180 × 10 = 41 800 J." },
      { num: "On mélange 1 kg d’eau à 60 °C et 1 kg d’eau à 20 °C. Quelle est la température finale, en °C ?", answer: 40, why: "Masses égales : la température finale est la moyenne, (60 + 20) ÷ 2 = 40 °C." },
      { vf: "Pendant que la glace fond, sa température reste constante.", answer: true, why: "Pendant un changement d’état, la chaleur reçue sert à fondre la glace : Q = m × L." },
    ],
  },
  {
    subject: "PC",
    chapter: "Les solutions aqueuses",
    questions: [
      { num: "On dissout 10 g de sucre pour obtenir 0,5 L de solution. Concentration massique, en g/L ?", answer: 20, why: "Cm = m ÷ V = 10 ÷ 0,5 = 20 g/L." },
      { num: "On dilue 100 mL d’une solution à 0,4 mol/L jusqu’à 400 mL. Nouvelle concentration, en mol/L ?", answer: 0.1, why: "C₂ = C₁ × V₁ ÷ V₂ = 0,4 × 100 ÷ 400 = 0,1 mol/L." },
      { qcm: "Dans l’eau sucrée, le sucre est…", choices: ["le solvant", "*le soluté", "la solution"], why: "L’eau est le solvant, le sucre le soluté." },
    ],
  },
  {
    subject: "PC",
    chapter: "Solutions acides et solutions basiques",
    questions: [
      { qcm: "Une solution de pH 3 est…", choices: ["*acide", "neutre", "basique"], why: "pH inférieur à 7 : solution acide." },
      { qcm: "Le BBT devient bleu en milieu…", choices: ["acide", "neutre", "*basique"], why: "BBT : jaune (acide), vert (neutre), bleu (basique)." },
      { qcm: "Quand on dilue une solution acide, son pH…", choices: ["*augmente et se rapproche de 7", "diminue", "ne change pas"], why: "La dilution rapproche le pH de 7." },
    ],
  },
  {
    subject: "PC",
    chapter: "Les métaux",
    questions: [
      { qcm: "Quel métal n’est pas attaqué par l’acide chlorhydrique dilué ?", choices: ["le fer", "le zinc", "*le cuivre"], why: "Le fer, le zinc et l’aluminium sont attaqués, pas le cuivre." },
      { qcm: "Le gaz qui se dégage quand l’acide chlorhydrique attaque le fer est…", choices: ["*le dihydrogène", "le dioxygène", "le dioxyde de carbone"], why: "Il produit une petite détonation à l’approche d’une flamme." },
      { qcm: "Avec la soude, les ions Cu²⁺ donnent un précipité…", choices: ["vert", "*bleu", "blanc"], why: "Fe²⁺ : vert ; Fe³⁺ : rouille ; Cu²⁺ : bleu ; Zn²⁺ et Al³⁺ : blanc." },
    ],
  },
  {
    subject: "PC",
    chapter: "Les hydrocarbures",
    questions: [
      { qcm: "La formule du butane est…", choices: ["CH₄", "C₃H₈", "*C₄H₁₀"], why: "Alcane à 4 atomes de carbone : avec n = 4, CₙH₂ₙ₊₂ donne C₄H₁₀." },
      { qcm: "La combustion complète du méthane produit…", choices: ["*du dioxyde de carbone et de l’eau", "du monoxyde de carbone seulement", "du dihydrogène"], why: "CH₄ + 2 O₂ → CO₂ + 2 H₂O." },
      { vf: "Le monoxyde de carbone est un gaz sans danger.", answer: false, why: "Il est mortel et sans odeur : jamais de réchaud dans une pièce fermée." },
    ],
  },

  // ── Éducation civique ──────────────────────────────────────────────────────
  {
    subject: "EC",
    chapter: "Les droits de l’enfant",
    questions: [
      { num: "En quelle année l’ONU adopte-t-elle la Convention relative aux droits de l’enfant ?", answer: 1989, why: "Le 20 novembre 1989." },
      { qcm: "Selon la Convention, un enfant est une personne de moins de…", choices: ["16 ans", "*18 ans", "21 ans"], why: "La Convention protège toute personne de moins de 18 ans." },
      { vf: "Le droit à l’éducation fait partie des droits de l’enfant.", answer: true, why: "C’est un droit au développement." },
    ],
  },
  {
    subject: "EC",
    chapter: "La Constitution du Sénégal",
    questions: [
      { qcm: "La devise du Sénégal est…", choices: ["*Un Peuple – Un But – Une Foi", "Liberté – Égalité – Fraternité", "Travail – Paix – Patrie"], why: "C’est la devise inscrite dans la Constitution." },
      { num: "En quelle année la Constitution actuelle a-t-elle été adoptée par référendum ?", answer: 2001, why: "Par le référendum du 7 janvier 2001." },
      { qcm: "Qui a écrit l’hymne national ?", choices: ["Blaise Diagne", "*Léopold Sédar Senghor", "Cheikh Anta Diop"], why: "« Pincez tous vos koras, frappez les balafons »." },
    ],
  },
  {
    subject: "EC",
    chapter: "Les institutions de la République",
    questions: [
      { qcm: "Le pouvoir législatif appartient à…", choices: ["*l’Assemblée nationale", "le Gouvernement", "les tribunaux"], why: "Les députés votent les lois." },
      { num: "Pour combien d’années le président de la République est-il élu ?", answer: 5, why: "Mandat de 5 ans, renouvelable une fois." },
      { qcm: "Qui nomme le Premier ministre ?", choices: ["l’Assemblée nationale", "*le président de la République", "le Conseil constitutionnel"], why: "Le président nomme le Premier ministre, qui dirige le Gouvernement." },
    ],
  },
  {
    subject: "EC",
    chapter: "La citoyenneté",
    questions: [
      { qcm: "Lequel est un devoir du citoyen ?", choices: ["aller à l’école", "*respecter les lois", "circuler librement"], why: "Aller à l’école et circuler librement sont des droits ; respecter les lois est un devoir." },
      { vf: "Protéger les biens publics est un devoir du citoyen.", answer: true, why: "Les biens publics appartiennent à tous." },
      { qcm: "Le civisme, c’est…", choices: ["*penser à l’intérêt général", "ne penser qu’à soi", "refuser de voter"], why: "Le civisme fait passer l’intérêt de tous avant son intérêt personnel." },
    ],
  },
  {
    subject: "EC",
    chapter: "La démocratie et les élections",
    questions: [
      { num: "À partir de quel âge peut-on voter au Sénégal ?", answer: 18, why: "Il faut avoir 18 ans et être inscrit sur les listes électorales." },
      { qcm: "On passe par l’isoloir pour garantir…", choices: ["*le secret du vote", "la rapidité du vote", "le comptage des voix"], why: "Personne ne doit savoir pour qui on vote." },
      { vf: "Dans une démocratie, plusieurs partis politiques peuvent exister.", answer: true, why: "C’est le pluralisme." },
    ],
  },
  {
    subject: "EC",
    chapter: "La paix et la sécurité",
    questions: [
      { qcm: "Le cousinage à plaisanterie (kal) aide à…", choices: ["*désamorcer les tensions entre groupes", "organiser les élections", "collecter les impôts"], why: "Il permet de se taquiner sans se fâcher." },
      { qcm: "Les soldats de l’ONU dans les missions de paix sont appelés…", choices: ["*les casques bleus", "les tirailleurs", "les gendarmes"], why: "Le Sénégal envoie régulièrement des casques bleus." },
      { vf: "La médiation permet de régler un conflit sans violence.", answer: true, why: "Une tierce personne aide les deux parties à trouver un accord." },
    ],
  },
  {
    subject: "EC",
    chapter: "Le développement durable",
    questions: [
      { num: "Combien d’objectifs de développement durable l’ONU a-t-elle adoptés en 2015 ?", answer: 17, why: "17 ODD à atteindre d’ici 2030." },
      { qcm: "Les trois piliers du développement durable sont…", choices: ["*économique, social et environnemental", "politique, militaire et religieux", "local, national et mondial"], why: "Il faut concilier économie, société et environnement." },
      { vf: "Planter des arbres aide à lutter contre l’avancée du désert.", answer: true, why: "Les arbres retiennent le sol et l’humidité." },
    ],
  },
  {
    subject: "EC",
    chapter: "La santé publique",
    questions: [
      { qcm: "Pour se protéger du paludisme, on dort sous…", choices: ["*une moustiquaire imprégnée", "un ventilateur", "une couverture"], why: "La moustiquaire empêche les piqûres de moustiques." },
      { qcm: "La couverture maladie universelle (CMU) aide les familles à…", choices: ["*payer les soins", "construire des routes", "trouver un emploi"], why: "Elle prend en charge une partie des frais de santé." },
      { vf: "Se laver les mains au savon protège de nombreuses maladies.", answer: true, why: "Le savon élimine une grande partie des microbes." },
    ],
  },
];

const built = buildExerciseSeries("3E", CHAPTERS_3E, SERIES);

export const QUESTIONS_3E_SERIES = built.questions;
export const ANSWER_KEYS_3E_SERIES = built.keys;
/** Chapitre de chaque question (banque utilisée par « Préparer mon prochain devoir »). */
export const QUESTION_CHAPTERS_3E_SERIES = built.questionChapters;
export const ASSESSMENTS_3E_SERIES = built.assessments;
