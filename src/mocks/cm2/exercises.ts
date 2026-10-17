import "server-only";

// Exercices corrigés du CM2 : une série par chapitre, écrite par DIANGAL d’après les leçons (à faire
// relire par des enseignants). Corrigés inclus : ce fichier ne doit jamais atteindre le navigateur.

import { CHAPTERS_CM2 } from "../curriculum-cm2";
import { buildExerciseSeries, type ExerciseSeries } from "../exercise-series";

const SERIES: ExerciseSeries[] = [
  // ── Mathématiques : activités numériques ──────────────────────────────────
  {
    subject: "MATH",
    chapter: "Les grands nombres",
    questions: [
      { qcm: "« Deux millions trois cent mille » s’écrit…", choices: ["2 030 000", "*2 300 000", "2 000 300"], why: "2 millions et 300 mille : 2 300 000." },
      { num: "Quel est le chiffre des centaines de mille dans 4 572 316 ?", answer: 5, why: "4 | 572 | 316 : 5 centaines de mille." },
      { vf: "1 250 000 est plus grand que 1 205 000.", answer: true, why: "Au rang des dizaines de mille : 5 &gt; 0." },
    ],
  },
  {
    subject: "MATH",
    chapter: "Les caractères de divisibilité",
    questions: [
      { qcm: "Lequel de ces nombres est divisible par 3 ?", choices: ["452", "*513", "731"], why: "5 + 1 + 3 = 9, divisible par 3." },
      { vf: "2 345 est divisible par 5.", answer: true, why: "Il se termine par 5." },
      { qcm: "Un nombre divisible par 2 et par 5 est divisible par…", choices: ["3", "*10", "25"], why: "Il se termine par 0." },
    ],
  },
  {
    subject: "MATH",
    chapter: "Les quatre opérations sur les grands nombres",
    questions: [
      { num: "Calcule 125 × 24.", answer: 3000, why: "125 × 24 = 125 × 4 × 6 = 500 × 6 = 3 000." },
      { num: "Calcule 7 200 ÷ 24.", answer: 300, why: "24 × 300 = 7 200." },
      { num: "Dans la division de 100 par 7, quel est le reste ?", answer: 2, why: "7 × 14 = 98 et 100 − 98 = 2." },
    ],
  },
  {
    subject: "MATH",
    chapter: "Les nombres décimaux",
    questions: [
      { qcm: "Le plus grand de ces nombres est…", choices: ["3,45", "*3,5", "3,405"], why: "3,5 = 3,500, plus grand que 3,450 et 3,405." },
      { qcm: "45 centièmes s’écrit…", choices: ["4,5", "*0,45", "0,045"], why: "45/100 = 0,45." },
      { vf: "2,50 est égal à 2,5.", answer: true, why: "Un zéro à la fin de la partie décimale ne change rien." },
    ],
  },
  {
    subject: "MATH",
    chapter: "Opérations sur les nombres décimaux",
    questions: [
      { num: "Calcule 12,5 + 3,75.", answer: 16.25, why: "12,50 + 3,75 = 16,25." },
      { num: "Calcule 2,5 × 4.", answer: 10, why: "25 × 4 = 100, avec un chiffre après la virgule : 10,0." },
      { num: "Calcule 3,6 ÷ 100.", answer: 0.036, why: "On déplace la virgule de deux rangs vers la gauche." },
    ],
  },
  {
    subject: "MATH",
    chapter: "Les fractions",
    questions: [
      { qcm: "La forme simplifiée de 12/18 est…", choices: ["6/8", "*2/3", "3/4"], why: "On divise par 6 : 12/18 = 2/3." },
      { qcm: "Laquelle de ces fractions est plus grande que 1 ?", choices: ["3/4", "5/5", "*7/4"], why: "Le numérateur est plus grand que le dénominateur." },
      { vf: "1/3 est plus grand que 1/5.", answer: true, why: "Même numérateur : le plus petit dénominateur donne la plus grande fraction." },
    ],
  },
  {
    subject: "MATH",
    chapter: "Opérations sur les fractions",
    questions: [
      { qcm: "1/2 + 1/4 =", choices: ["2/6", "*3/4", "1/6"], why: "1/2 = 2/4, donc 2/4 + 1/4 = 3/4." },
      { num: "Combien valent les 3/4 de 2 000 F ?", answer: 1500, why: "2 000 ÷ 4 = 500 ; 500 × 3 = 1 500 F." },
      { num: "Les 2/5 d’une somme valent 400 F. Quelle est cette somme (en F) ?", answer: 1000, why: "Une part : 400 ÷ 2 = 200 ; la somme : 200 × 5 = 1 000 F." },
    ],
  },
  {
    subject: "MATH",
    chapter: "Pourcentages, échelles et proportionnalité",
    questions: [
      { num: "Calcule 20 % de 5 000 F.", answer: 1000, why: "5 000 × 20 ÷ 100 = 1 000 F." },
      { num: "Sur une carte à 1/100 000, 3 cm représentent combien de kilomètres ?", answer: 3, why: "3 × 100 000 cm = 300 000 cm = 3 km." },
      { num: "2 kg de sucre coûtent 1 400 F. Combien coûtent 5 kg (en F) ?", answer: 3500, why: "1 kg : 700 F ; 5 kg : 3 500 F." },
    ],
  },
  // ── Mathématiques : géométrie ──────────────────────────────────────────────
  {
    subject: "MATH",
    chapter: "Les quadrilatères et le triangle",
    questions: [
      { qcm: "Un quadrilatère qui a 4 côtés égaux et 4 angles droits est…", choices: ["un losange", "*un carré", "un trapèze"], why: "Le carré a 4 côtés égaux et 4 angles droits." },
      { num: "Dans un triangle, deux angles mesurent 50° et 70°. Combien mesure le troisième (en degrés) ?", answer: 60, why: "180 − 50 − 70 = 60°." },
      { vf: "Un trapèze a deux côtés parallèles.", answer: true, why: "Ce sont ses deux bases." },
    ],
  },
  {
    subject: "MATH",
    chapter: "Le cercle et les polygones",
    questions: [
      { num: "Le rayon d’un cercle mesure 4 cm. Combien mesure son diamètre (en cm) ?", answer: 8, why: "d = 2 × r = 8 cm." },
      { qcm: "Un polygone à 6 côtés s’appelle…", choices: ["un pentagone", "*un hexagone", "un octogone"], why: "6 côtés : hexagone." },
      { qcm: "Un octogone a…", choices: ["6 côtés", "*8 côtés", "10 côtés"], why: "Octo = 8." },
    ],
  },
  {
    subject: "MATH",
    chapter: "Les solides",
    questions: [
      { num: "Combien un cube a-t-il de faces ?", answer: 6, why: "6 faces carrées identiques." },
      { num: "Combien un pavé droit a-t-il d’arêtes ?", answer: 12, why: "Comme le cube, il a 12 arêtes." },
      { qcm: "Les bases d’un cylindre sont…", choices: ["des carrés", "*des disques", "des triangles"], why: "Deux disques identiques." },
    ],
  },
  {
    subject: "MATH",
    chapter: "Symétrie, translation, agrandissement et réduction",
    questions: [
      { num: "Combien un carré a-t-il d’axes de symétrie ?", answer: 4, why: "Les deux médianes et les deux diagonales." },
      { qcm: "On agrandit 3 fois un segment de 5 cm. Il mesure…", choices: ["8 cm", "*15 cm", "53 cm"], why: "5 × 3 = 15 cm." },
      { vf: "Une translation fait tourner une figure.", answer: false, why: "Elle la fait glisser sans la tourner." },
    ],
  },
  // ── Mathématiques : mesure ─────────────────────────────────────────────────
  {
    subject: "MATH",
    chapter: "Longueurs et périmètres",
    questions: [
      { num: "Convertis 3,5 km en mètres.", answer: 3500, why: "1 km = 1 000 m." },
      { num: "Calcule le périmètre (en m) d’un rectangle de 30 m sur 20 m.", answer: 100, why: "(30 + 20) × 2 = 100 m." },
      { num: "Calcule le périmètre (en cm) d’un cercle de 10 cm de diamètre (π ≈ 3,14).", answer: 31.4, why: "10 × 3,14 = 31,4 cm." },
    ],
  },
  {
    subject: "MATH",
    chapter: "Capacités, masses et angles",
    questions: [
      { num: "Combien de centilitres y a-t-il dans 2 L ?", answer: 200, why: "1 L = 100 cL." },
      { num: "Une boîte pèse 500 g en tout ; l’emballage pèse 80 g. Quelle est la masse nette (en g) ?", answer: 420, why: "500 − 80 = 420 g." },
      { qcm: "Un angle de 120° est…", choices: ["aigu", "droit", "*obtus"], why: "Entre 90° et 180°." },
    ],
  },
  {
    subject: "MATH",
    chapter: "Les aires",
    questions: [
      { num: "Calcule l’aire (en m²) d’un rectangle de 12 m sur 8 m.", answer: 96, why: "12 × 8 = 96 m²." },
      { num: "Calcule l’aire (en cm²) d’un triangle de base 10 cm et de hauteur 6 cm.", answer: 30, why: "10 × 6 ÷ 2 = 30 cm²." },
      { num: "Combien de mètres carrés y a-t-il dans 1 hectare ?", answer: 10000, why: "1 ha = 1 hm² = 10 000 m²." },
    ],
  },
  {
    subject: "MATH",
    chapter: "Les volumes",
    questions: [
      { num: "Calcule le volume (en cm³) d’un cube de 3 cm d’arête.", answer: 27, why: "3 × 3 × 3 = 27 cm³." },
      { num: "Combien de litres contient un récipient de 1 m³ ?", answer: 1000, why: "1 m³ = 1 000 dm³ = 1 000 L." },
      { num: "Calcule le volume (en m³) d’un pavé de 4 m × 2 m × 1,5 m.", answer: 12, why: "4 × 2 × 1,5 = 12 m³." },
    ],
  },
  {
    subject: "MATH",
    chapter: "Durées, vitesse et débit",
    questions: [
      { num: "Combien de minutes y a-t-il dans 2 h 15 min ?", answer: 135, why: "2 × 60 + 15 = 135 min." },
      { num: "Une voiture roule à 80 km/h pendant 3 h. Quelle distance parcourt-elle (en km) ?", answer: 240, why: "d = v × t = 80 × 3 = 240 km." },
      { num: "Un robinet débite 10 L par minute. En combien de minutes remplit-il un fût de 200 L ?", answer: 20, why: "200 ÷ 10 = 20 min." },
    ],
  },
  {
    subject: "MATH",
    chapter: "Prix, budget et pourcentages",
    questions: [
      { num: "Prix d’achat 8 000 F, frais 500 F, prix de vente 10 000 F. Quel est le bénéfice (en F) ?", answer: 1500, why: "Prix de revient : 8 500 F ; bénéfice : 10 000 − 8 500 = 1 500 F." },
      { qcm: "Si le prix de vente est inférieur au prix de revient, il y a…", choices: ["un bénéfice", "*une perte", "une économie"], why: "On vend moins cher que ce que l’objet a coûté." },
      { num: "Une remise de 10 % sur 6 000 F : combien paie-t-on (en F) ?", answer: 5400, why: "Remise : 600 F ; prix payé : 5 400 F." },
    ],
  },
  {
    subject: "MATH",
    chapter: "Les intérêts",
    questions: [
      { num: "Quel intérêt (en F) rapportent 50 000 F placés à 4 % pendant 1 an ?", answer: 2000, why: "50 000 × 4 × 1 ÷ 100 = 2 000 F." },
      { num: "Quel intérêt (en F) rapportent 100 000 F placés à 5 % pendant 2 ans ?", answer: 10000, why: "100 000 × 5 × 2 ÷ 100 = 10 000 F." },
      { vf: "Le capital augmenté de ses intérêts s’appelle la valeur acquise.", answer: true, why: "C’est la définition." },
    ],
  },
  {
    subject: "MATH",
    chapter: "Partages et moyenne",
    questions: [
      { num: "Deux frères se partagent 3 000 F ; l’aîné reçoit 1 000 F de plus. Combien reçoit le cadet (en F) ?", answer: 1000, why: "3 000 − 1 000 = 2 000 ; 2 000 ÷ 2 = 1 000 F." },
      { num: "Calcule la moyenne de 10, 12 et 14.", answer: 12, why: "36 ÷ 3 = 12." },
      { num: "On partage 9 000 F en parts proportionnelles à 1 et 2. Combien vaut la plus grande part (en F) ?", answer: 6000, why: "3 parts : 3 000 F l’une ; la plus grande : 6 000 F." },
    ],
  },
  // ── Mathématiques : résolution de problèmes ────────────────────────────────
  {
    subject: "MATH",
    chapter: "Comprendre l’énoncé d’un problème",
    questions: [
      { qcm: "« Awa, 11 ans, achète 4 stylos à 150 F. Combien paie-t-elle ? » La donnée inutile est…", choices: ["4 stylos", "150 F", "*11 ans"], why: "L’âge ne sert pas au calcul." },
      { num: "Combien paie Awa (en F) ?", answer: 600, why: "4 × 150 = 600 F." },
      { vf: "Une question intermédiaire aide à répondre à la question finale.", answer: true, why: "On la résout d’abord." },
    ],
  },
  {
    subject: "MATH",
    chapter: "Tableaux, schémas et graphiques",
    questions: [
      { num: "Une facture : 3 cahiers à 250 F et 2 stylos à 100 F. Quel est le total (en F) ?", answer: 950, why: "750 + 200 = 950 F." },
      { num: "On paie cette facture avec 1 000 F. Combien rend-on (en F) ?", answer: 50, why: "1 000 − 950 = 50 F." },
      { qcm: "Pour montrer l’évolution de la température dans la journée, on utilise surtout…", choices: ["un tableau de prix", "*une courbe", "un patron"], why: "La courbe montre une évolution." },
    ],
  },
  {
    subject: "MATH",
    chapter: "Démarches de résolution et vérification",
    questions: [
      { num: "Il me reste 1 500 F après avoir dépensé 2 500 F. Combien avais-je (en F) ?", answer: 4000, why: "Démarche régressive : 1 500 + 2 500 = 4 000 F." },
      { qcm: "Pour vérifier une soustraction, on fait…", choices: ["une multiplication", "*une addition", "une division"], why: "C’est l’opération inverse." },
      { vf: "Une réponse de problème doit préciser l’unité.", answer: true, why: "Par exemple « 600 F » ou « 12 m »." },
    ],
  },
  // ── Français ───────────────────────────────────────────────────────────────
  {
    subject: "FR",
    chapter: "Lire et comprendre un texte",
    questions: [
      { qcm: "Une recette de cuisine est un texte…", choices: ["narratif", "descriptif", "*injonctif"], why: "Elle dit comment faire." },
      { qcm: "Un conte est un texte…", choices: ["*narratif", "informatif", "injonctif"], why: "Il raconte une histoire." },
      { vf: "Le contexte aide à comprendre un mot inconnu.", answer: true, why: "Les mots autour éclairent son sens." },
    ],
  },
  {
    subject: "FR",
    chapter: "Le texte dialogué",
    questions: [
      { qcm: "Dans un dialogue, un changement de personne qui parle est signalé par…", choices: ["une virgule", "*un tiret", "un point-virgule"], why: "Le tiret marque chaque nouvelle réplique." },
      { qcm: "Lequel est un verbe de parole ?", choices: ["courir", "*répondre", "manger"], why: "Il introduit des paroles." },
      { vf: "Au discours direct, on rapporte les paroles entre guillemets.", answer: true, why: "Ce sont les paroles exactes." },
    ],
  },
  {
    subject: "FR",
    chapter: "La phrase et les propositions",
    questions: [
      { qcm: "« Ne mange pas ce fruit. » est une phrase…", choices: ["interrogative", "*impérative", "exclamative"], why: "Elle donne un ordre." },
      { num: "Combien de propositions y a-t-il dans : « Le maître parle et les élèves écoutent » ?", answer: 2, why: "Deux verbes conjugués : parle, écoutent." },
      { qcm: "La forme négative de « Je vois quelqu’un » est…", choices: ["Je ne vois pas quelqu’un.", "*Je ne vois personne.", "Je vois personne."], why: "Quelqu’un → ne… personne." },
    ],
  },
  {
    subject: "FR",
    chapter: "Les fonctions dans la phrase",
    questions: [
      { qcm: "Dans « Les pêcheurs vendent le poisson », « le poisson » est…", choices: ["sujet", "*COD", "COI"], why: "Ils vendent quoi ? le poisson." },
      { qcm: "Dans « La mer est calme », « calme » est…", choices: ["COD", "*attribut du sujet", "complément circonstanciel"], why: "Après le verbe d’état « être »." },
      { qcm: "Dans « Le soir, nous révisons », « Le soir » est un complément circonstanciel de…", choices: ["lieu", "*temps", "manière"], why: "Quand ? le soir." },
    ],
  },
  {
    subject: "FR",
    chapter: "La proposition subordonnée",
    questions: [
      { qcm: "Dans « Voici la maison où je suis né », « où » est…", choices: ["une conjonction", "*un pronom relatif", "un adverbe de lieu seul"], why: "Il introduit une relative et a pour antécédent « la maison »." },
      { qcm: "« Il est fatigué parce qu’il a couru » : la subordonnée exprime…", choices: ["le temps", "*la cause", "le but"], why: "Parce que introduit la cause." },
      { qcm: "Complète : « Parle fort pour qu’on t’… »", choices: ["entend", "*entende", "entendra"], why: "Après « pour que », subjonctif." },
    ],
  },
  {
    subject: "FR",
    chapter: "Déterminants et pronoms",
    questions: [
      { qcm: "« Cet », « cette », « ces » sont des…", choices: ["adjectifs possessifs", "*adjectifs démonstratifs", "articles"], why: "Ils montrent." },
      { qcm: "Écris correctement 80 en lettres :", choices: ["quatre-vingt", "*quatre-vingts", "quatres-vingts"], why: "Vingt multiplié et final prend un s." },
      { qcm: "« Je donne le cahier à Moussa » devient…", choices: ["Je lui le donne.", "*Je le lui donne.", "Je leur le donne."], why: "COD « le » puis COI « lui »." },
    ],
  },
  {
    subject: "FR",
    chapter: "Le présent de l’indicatif",
    questions: [
      { qcm: "Nous (finir) → nous…", choices: ["finons", "*finissons", "finirons"], why: "2e groupe : -issons au présent." },
      { qcm: "J’(appeler) mon frère →", choices: ["j’appele", "*j’appelle", "j’appèle"], why: "Appeler double le l devant un e muet." },
      { qcm: "Ils (pouvoir) →", choices: ["ils pouvent", "*ils peuvent", "ils peuent"], why: "Pouvoir : ils peuvent." },
    ],
  },
  {
    subject: "FR",
    chapter: "Les temps du passé",
    questions: [
      { qcm: "Il (chanter) au passé simple →", choices: ["il chantait", "*il chanta", "il a chanté"], why: "Passé simple du 1er groupe : -a." },
      { qcm: "Au plus-que-parfait, l’auxiliaire est conjugué…", choices: ["*à l’imparfait", "au présent", "au futur"], why: "J’avais chanté." },
      { vf: "Dans un récit, l’imparfait sert souvent à décrire le décor.", answer: true, why: "Le passé simple raconte les actions de premier plan." },
    ],
  },
  {
    subject: "FR",
    chapter: "Le futur et le conditionnel",
    questions: [
      { qcm: "Nous (aller) au futur →", choices: ["nous allerons", "*nous irons", "nous irions"], why: "Futur de aller : nous irons." },
      { qcm: "« Si j’avais de l’argent, j’(acheter) un vélo. »", choices: ["achèterai", "*achèterais", "achetais"], why: "Conditionnel présent après une condition à l’imparfait." },
      { vf: "Le futur antérieur se forme avec l’auxiliaire au futur et le participe passé.", answer: true, why: "J’aurai fini." },
    ],
  },
  {
    subject: "FR",
    chapter: "Le subjonctif et l’impératif",
    questions: [
      { qcm: "Il faut que tu (finir) →", choices: ["finis", "*finisses", "finiras"], why: "Subjonctif présent : que tu finisses." },
      { qcm: "Impératif, 2e personne du singulier de « ranger » :", choices: ["ranges", "*range", "rangez"], why: "Pas de s pour les verbes du 1er groupe." },
      { qcm: "Que je (pouvoir) →", choices: ["que je peux", "*que je puisse", "que je pourrai"], why: "Subjonctif de pouvoir." },
    ],
  },
  {
    subject: "FR",
    chapter: "Les accords",
    questions: [
      { qcm: "Le féminin de « heureux » est…", choices: ["heureuxe", "*heureuse", "heureusse"], why: "-eux → -euse." },
      { qcm: "Les filles sont (arriver) →", choices: ["arrivé", "*arrivées", "arrivés"], why: "Avec être, accord avec le sujet féminin pluriel." },
      { qcm: "Les mangues que j’ai (cueillir) →", choices: ["cueilli", "*cueillies", "cueillis"], why: "COD « que » (les mangues) placé avant avoir." },
    ],
  },
  {
    subject: "FR",
    chapter: "Les homophones grammaticaux",
    questions: [
      { qcm: "Il … donné un livre … son frère.", choices: ["à / a", "*a / à", "a / a"], why: "a = avait ; à est une préposition." },
      { qcm: "Je … parle souvent. (aux enfants)", choices: ["leurs", "*leur", "leures"], why: "Pronom devant un verbe : leur, invariable." },
      { qcm: "Les élèves … dans la cour.", choices: ["son", "*sont", "sons"], why: "On peut dire « étaient »." },
    ],
  },
  {
    subject: "FR",
    chapter: "Mots invariables et ponctuation",
    questions: [
      { qcm: "L’adverbe formé sur « prudent » est…", choices: ["prudament", "*prudemment", "prudentement"], why: "-ent → -emment." },
      { qcm: "… les enfants sont venus.", choices: ["Tout", "*Tous", "Toutes"], why: "Déterminant masculin pluriel : tous." },
      { qcm: "Le signe qui annonce une énumération ou une explication est…", choices: ["le point", "*les deux-points", "les guillemets"], why: "« : »." },
    ],
  },
  {
    subject: "FR",
    chapter: "Le sens des mots",
    questions: [
      { qcm: "Un synonyme de « content » est…", choices: ["triste", "*joyeux", "fâché"], why: "Sens proche." },
      { qcm: "Le contraire de « possible » est…", choices: ["*impossible", "possiblement", "faisable"], why: "Préfixe im- : contraire." },
      { qcm: "« Awa dévore les livres » : « dévore » est employé au sens…", choices: ["propre", "*figuré", "contraire"], why: "Elle lit beaucoup, elle ne mange pas les livres." },
    ],
  },
  {
    subject: "FR",
    chapter: "La formation des mots",
    questions: [
      { qcm: "Quel mot n’est pas de la famille de « terre » ?", choices: ["terrain", "enterrer", "*terrible"], why: "Terrible vient de « terreur »." },
      { qcm: "Le préfixe « re- » dans « relire » signifie…", choices: ["*de nouveau", "contraire", "avant"], why: "Relire = lire de nouveau." },
      { qcm: "Le suffixe « -eur » dans « vendeur » indique…", choices: ["une action", "*celui qui fait l’action", "une possibilité"], why: "Le vendeur est celui qui vend." },
    ],
  },
  {
    subject: "FR",
    chapter: "Rédiger un texte",
    questions: [
      { qcm: "Une rédaction comprend…", choices: ["seulement un développement", "*une introduction, un développement et une conclusion", "une liste de mots"], why: "C’est le plan d’un texte." },
      { qcm: "Dans une lettre, la date et le lieu se placent…", choices: ["*en haut à droite", "à la fin", "au milieu"], why: "Exemple : Dakar, le 12 mai 2026." },
      { vf: "Il faut relire son texte pour corriger les fautes.", answer: true, why: "La relecture fait partie de l’écriture." },
    ],
  },
  // ── ESVS ───────────────────────────────────────────────────────────────────
  {
    subject: "ESVS",
    chapter: "Les grands empires du Soudan occidental",
    questions: [
      { qcm: "Le fondateur de l’empire du Mali est…", choices: ["Askia Mohammed", "*Soundjata Keïta", "Sonni Ali Ber"], why: "Après la bataille de Kirina." },
      { qcm: "Le roi du Mali célèbre pour son pèlerinage à La Mecque est…", choices: ["*Kankou Moussa", "Kaya Maghan", "Lat Dior"], why: "En 1324." },
      { qcm: "La capitale de l’empire Songhaï était…", choices: ["Koumbi Saleh", "*Gao", "Niani"], why: "Gao, sur le fleuve Niger." },
    ],
  },
  {
    subject: "ESVS",
    chapter: "Les royaumes du Sénégal",
    questions: [
      { qcm: "Le roi du Cayor portait le titre de…", choices: ["Bourba", "*Damel", "Brak"], why: "Bourba : Djolof ; Brak : Walo." },
      { qcm: "Le fondateur de l’empire du Djolof est…", choices: ["*Ndiadiane Ndiaye", "Amary Ngoné Sobel Fall", "War Jaabi"], why: "Selon la tradition." },
      { vf: "Le Gabou était un royaume mandingue.", answer: true, why: "Son roi portait le titre de Mansa." },
    ],
  },
  {
    subject: "ESVS",
    chapter: "La traite négrière",
    questions: [
      { qcm: "La Maison des esclaves se trouve…", choices: ["à Saint-Louis", "*à Gorée", "à Ziguinchor"], why: "C’est un lieu de mémoire de la traite." },
      { num: "En quelle année la France a-t-elle aboli définitivement l’esclavage ?", answer: 1848, why: "Abolition de 1848." },
      { vf: "La traite a dépeuplé l’Afrique.", answer: true, why: "Des millions d’Africains ont été déportés." },
    ],
  },
  {
    subject: "ESVS",
    chapter: "La conquête coloniale et les résistances",
    questions: [
      { qcm: "Lat Dior s’opposait surtout à…", choices: ["*la construction du chemin de fer Dakar–Saint-Louis", "la culture du riz", "l’école coranique"], why: "Il voyait le chemin de fer comme un outil de conquête." },
      { qcm: "La résistante de Casamance arrêtée en 1943 est…", choices: ["*Aline Sitoé Diatta", "Ndatté Yalla", "Yacine Boubou"], why: "Elle refusait les réquisitions." },
      { qcm: "Cheikh Ahmadou Bamba a mené une résistance…", choices: ["armée", "*pacifique", "maritime"], why: "Il fut exilé au Gabon." },
    ],
  },
  {
    subject: "ESVS",
    chapter: "De la colonisation à l’indépendance du Sénégal",
    questions: [
      { qcm: "Le premier président du Sénégal est…", choices: ["Abdou Diouf", "*Léopold Sédar Senghor", "Mamadou Dia"], why: "De 1960 à 1980." },
      { qcm: "La fête de l’indépendance du Sénégal est célébrée le…", choices: ["20 août", "*4 avril", "1er mai"], why: "Le 4 avril." },
      { num: "En quelle année Blaise Diagne fut-il élu député ?", answer: 1914, why: "Premier Africain élu à l’Assemblée nationale française." },
    ],
  },
  {
    subject: "ESVS",
    chapter: "Le Sénégal : situation et milieu physique",
    questions: [
      { qcm: "Au nord, le Sénégal a pour voisin…", choices: ["le Mali", "*la Mauritanie", "la Guinée"], why: "Le fleuve Sénégal sert de frontière." },
      { qcm: "La saison des pluies s’appelle…", choices: ["l’harmattan", "*l’hivernage", "la contre-saison"], why: "De juin-juillet à octobre." },
      { qcm: "La partie la plus pluvieuse du Sénégal est…", choices: ["le nord", "*la Casamance (sud)", "Dakar"], why: "Il pleut plus au sud." },
    ],
  },
  {
    subject: "ESVS",
    chapter: "La population et les régions du Sénégal",
    questions: [
      { num: "Combien de régions compte le Sénégal ?", answer: 14, why: "De Dakar à Ziguinchor." },
      { qcm: "La population sénégalaise est surtout concentrée…", choices: ["à l’est", "*à l’ouest", "au sud-est"], why: "Notamment dans la région de Dakar." },
      { vf: "Kédougou est une région du Sénégal.", answer: true, why: "Au sud-est du pays." },
    ],
  },
  {
    subject: "ESVS",
    chapter: "Les activités économiques du Sénégal",
    questions: [
      { qcm: "La zone des Niayes est surtout connue pour…", choices: ["l’or", "*le maraîchage (légumes)", "le pétrole"], why: "Cultures de légumes près de la côte." },
      { qcm: "Le Ferlo est une zone…", choices: ["de pêche", "*d’élevage", "industrielle"], why: "Pâturages du nord." },
      { qcm: "L’or est exploité à…", choices: ["Taïba", "*Sabodala", "Kayar"], why: "Au sud-est ; Taïba : phosphates ; Kayar : pêche." },
    ],
  },
  {
    subject: "ESVS",
    chapter: "L’Afrique et le monde",
    questions: [
      { num: "Combien de pays compte l’Afrique ?", answer: 54, why: "54 États." },
      { qcm: "Le plus long fleuve d’Afrique est…", choices: ["le Niger", "*le Nil", "le Congo"], why: "Il traverse l’Afrique de l’Est et l’Égypte." },
      { qcm: "La CEDEAO regroupe des pays…", choices: ["d’Afrique centrale", "*d’Afrique de l’Ouest", "d’Afrique du Nord"], why: "Communauté économique des États de l’Afrique de l’Ouest." },
    ],
  },
  {
    subject: "ESVS",
    chapter: "La digestion et la nutrition",
    questions: [
      { qcm: "Les nutriments passent dans le sang au niveau de…", choices: ["l’estomac", "*l’intestin grêle", "l’œsophage"], why: "C’est l’absorption intestinale." },
      { qcm: "Le conduit qui mène les aliments de la bouche à l’estomac est…", choices: ["la trachée", "*l’œsophage", "l’intestin"], why: "La trachée conduit l’air." },
      { vf: "La salive commence la digestion de l’amidon.", answer: true, why: "Dès la bouche." },
    ],
  },
  {
    subject: "ESVS",
    chapter: "La respiration et la circulation",
    questions: [
      { qcm: "Les échanges entre l’air et le sang se font dans…", choices: ["la trachée", "*les alvéoles pulmonaires", "le cœur"], why: "Le sang y prend le dioxygène." },
      { qcm: "Le sang qui part du cœur vers les organes circule dans…", choices: ["les veines", "*les artères", "les bronches"], why: "Les veines ramènent le sang au cœur." },
      { vf: "Le tabac abîme les poumons.", answer: true, why: "La fumée contient des substances toxiques." },
    ],
  },
  {
    subject: "ESVS",
    chapter: "Les êtres vivants et leurs milieux",
    questions: [
      { qcm: "Les poissons respirent grâce à…", choices: ["des poumons", "*des branchies", "des trachées"], why: "Adaptation au milieu aquatique." },
      { qcm: "Dans une chaîne alimentaire, les plantes vertes sont…", choices: ["consommateurs", "*producteurs", "décomposeurs"], why: "Elles fabriquent leur matière grâce à la lumière." },
      { vf: "Les vers de terre sont des décomposeurs.", answer: true, why: "Ils transforment les déchets en éléments du sol." },
    ],
  },
  {
    subject: "ESVS",
    chapter: "Outils et objets technologiques",
    questions: [
      { qcm: "Lequel est un isolant électrique ?", choices: ["le cuivre", "le fer", "*le plastique"], why: "Les métaux sont conducteurs." },
      { qcm: "Une brouette est un exemple de…", choices: ["poulie", "*levier", "plan incliné"], why: "Elle soulève une charge avec moins de force." },
      { vf: "Une lampe s’allume si le circuit est ouvert.", answer: false, why: "Il faut un circuit fermé." },
    ],
  },
  {
    subject: "ESVS",
    chapter: "Les symboles de la République",
    questions: [
      { qcm: "La devise du Sénégal est…", choices: ["Liberté, Égalité, Fraternité", "*Un Peuple – Un But – Une Foi", "Unité, Travail, Progrès"], why: "Elle est inscrite dans la Constitution." },
      { qcm: "L’hymne national du Sénégal s’intitule…", choices: ["*Le Lion rouge", "La Kora", "L’Africaine"], why: "Paroles de Léopold Sédar Senghor." },
      { qcm: "L’étoile du drapeau sénégalais est de couleur…", choices: ["or", "rouge", "*verte"], why: "Une étoile verte au centre de la bande or." },
    ],
  },
  {
    subject: "ESVS",
    chapter: "Les institutions de la République",
    questions: [
      { num: "Pour combien d’années le Président de la République est-il élu ?", answer: 5, why: "Mandat de 5 ans." },
      { qcm: "Les lois sont votées par…", choices: ["le Président", "*l’Assemblée nationale", "les tribunaux"], why: "Les députés votent les lois." },
      { qcm: "Qui vérifie que les lois respectent la Constitution ?", choices: ["*le Conseil constitutionnel", "le maire", "la Cour des comptes"], why: "C’est son rôle." },
    ],
  },
  {
    subject: "ESVS",
    chapter: "Vivre en communauté",
    questions: [
      { qcm: "La Convention des droits de l’enfant protège les enfants de moins de…", choices: ["12 ans", "15 ans", "*18 ans"], why: "Tous les mineurs." },
      { qcm: "Une ASC est…", choices: ["une banque", "*une association sportive et culturelle", "un tribunal"], why: "Une organisation communautaire de quartier." },
      { vf: "Dakar accueille les Jeux olympiques de la jeunesse en 2026.", answer: true, why: "Les premiers organisés en Afrique." },
    ],
  },
  {
    subject: "ESVS",
    chapter: "La dégradation du milieu et des ressources",
    questions: [
      { qcm: "Les filaos plantés dans les Niayes servent à…", choices: ["*fixer les dunes", "produire du charbon", "nourrir le bétail"], why: "Ils protègent les cultures du sable." },
      { qcm: "Le repos biologique protège…", choices: ["les forêts", "*les poissons", "les routes"], why: "On arrête de pêcher certaines espèces pendant leur reproduction." },
      { vf: "Les feux de brousse détruisent la végétation.", answer: true, why: "Ils appauvrissent aussi les sols." },
    ],
  },
  {
    subject: "ESVS",
    chapter: "Alimentation, santé et carences nutritionnelles",
    questions: [
      { qcm: "Le goitre est dû à un manque de…", choices: ["fer", "*iode", "vitamine C"], why: "On le prévient avec du sel iodé." },
      { qcm: "Le poisson et le niébé sont des aliments…", choices: ["énergétiques", "*de construction", "de protection"], why: "Ils sont riches en protéines." },
      { qcm: "Le kwashiorkor est dû surtout à un manque de…", choices: ["sucre", "*protéines", "eau"], why: "Ventre gonflé, cheveux décolorés." },
    ],
  },
];

const built = buildExerciseSeries("CM2", CHAPTERS_CM2, SERIES);

export const QUESTIONS_CM2 = built.questions;
export const ANSWER_KEYS_CM2 = built.keys;
/** Chapitre de chaque question (banque utilisée par « Préparer mon prochain devoir »). */
export const QUESTION_CHAPTERS_CM2 = built.questionChapters;
export const ASSESSMENTS_CM2 = built.assessments;
