import "server-only";

// Exercices corrigés du CE1 : une série par chapitre, écrite par DIANGAL d’après les leçons (à faire
// relire par des enseignants). Corrigés inclus : ce fichier ne doit jamais atteindre le navigateur.

import { CHAPTERS_CE1 } from "../curriculum-ce1";
import { buildExerciseSeries, type ExerciseSeries } from "../exercise-series";

const SERIES: ExerciseSeries[] = [
  // ── Mathématiques ──────────────────────────────────────────────────────────
  { subject: "MATH", chapter: "Les nombres jusqu’à 500", questions: [
    { num: "Écris en chiffres : trois cent quarante-sept.", answer: 347, why: "3 centaines, 4 dizaines, 7 unités." },
    { num: "Quel est le double de 25 ?", answer: 50, why: "25 + 25 = 50." },
    { vf: "36 est un nombre pair.", answer: true, why: "Il se termine par 6." },
  ] },
  { subject: "MATH", chapter: "Les nombres jusqu’à 1 000", questions: [
    { num: "Complète : 999 + 1 = …", answer: 1000, why: "Après 999 vient 1 000." },
    { qcm: "Le plus grand nombre est…", choices: ["712", "*721", "698"], why: "7 centaines et 2 dizaines : 721." },
    { num: "Combien faut-il ajouter à 600 pour avoir 1 000 ?", answer: 400, why: "600 + 400 = 1 000." },
  ] },
  { subject: "MATH", chapter: "Les nombres jusqu’à 10 000", questions: [
    { num: "Écris en chiffres : quatre mille deux cent cinq.", answer: 4205, why: "4 000 + 200 + 5." },
    { qcm: "Quel signe faut-il entre 5 432 et 5 621 ?", choices: ["&gt;", "*&lt;", "="], why: "4 centaines &lt; 6 centaines." },
    { vf: "Le chiffre des milliers de 7 089 est 7.", answer: true, why: "7 unités de mille." },
  ] },
  { subject: "MATH", chapter: "L’addition", questions: [
    { num: "Calcule 368 + 254.", answer: 622, why: "8 + 4 = 12, je retiens 1 ; 6 + 5 + 1 = 12, je retiens 1 ; 3 + 2 + 1 = 6." },
    { num: "Moussa a 350 F, on lui donne 200 F. Combien a-t-il en tout ?", answer: 550, why: "350 + 200 = 550 F." },
    { num: "Calcule 125 + 75.", answer: 200, why: "125 + 75 = 200." },
  ] },
  { subject: "MATH", chapter: "La soustraction", questions: [
    { num: "Calcule 742 − 318.", answer: 424, why: "Vérification : 424 + 318 = 742." },
    { num: "Awa a 500 F. Elle achète du pain à 150 F. Combien lui reste-t-il ?", answer: 350, why: "500 − 150 = 350 F." },
    { qcm: "Pour vérifier une soustraction, je fais…", choices: ["une multiplication", "*une addition", "une division"], why: "Résultat + nombre enlevé = premier nombre." },
  ] },
  { subject: "MATH", chapter: "La multiplication", questions: [
    { num: "Calcule 6 × 4.", answer: 24, why: "6 + 6 + 6 + 6 = 24." },
    { num: "Un cahier coûte 125 F. Combien coûtent 4 cahiers ?", answer: 500, why: "125 × 4 = 500 F." },
    { num: "Quel est le triple de 7 ?", answer: 21, why: "3 × 7 = 21." },
  ] },
  { subject: "MATH", chapter: "La division", questions: [
    { num: "On partage 24 bonbons entre 6 enfants. Combien chacun en reçoit-il ?", answer: 4, why: "24 ÷ 6 = 4." },
    { num: "17 ÷ 5 = 3. Quel est le reste ?", answer: 2, why: "5 × 3 = 15 et 17 − 15 = 2." },
    { qcm: "Lequel est divisible par 5 ?", choices: ["22", "*35", "41"], why: "Il se termine par 5." },
  ] },
  { subject: "MATH", chapter: "Lignes et droites", questions: [
    { qcm: "Deux droites qui ne se coupent jamais sont…", choices: ["sécantes", "*parallèles", "perpendiculaires"], why: "Elles restent à la même distance." },
    { qcm: "Pour vérifier un angle droit, j’utilise…", choices: ["la règle", "*l’équerre", "le compas"], why: "L’équerre a un angle droit." },
    { vf: "Une ligne brisée est faite de plusieurs segments.", answer: true, why: "C’est sa définition." },
  ] },
  { subject: "MATH", chapter: "Le carré et le rectangle", questions: [
    { num: "Combien d’angles droits a un carré ?", answer: 4, why: "Ses 4 angles sont droits." },
    { qcm: "Un rectangle a…", choices: ["4 côtés égaux", "*2 longueurs égales et 2 largeurs égales", "3 côtés"], why: "Côtés opposés égaux." },
    { vf: "Les diagonales d’un carré ont la même longueur.", answer: true, why: "Elles se coupent en leur milieu." },
  ] },
  { subject: "MATH", chapter: "Mesurer des longueurs", questions: [
    { num: "Combien de centimètres y a-t-il dans 1 mètre ?", answer: 100, why: "1 m = 100 cm." },
    { num: "Convertis 3 m en centimètres.", answer: 300, why: "3 × 100 = 300 cm." },
    { num: "Combien de millimètres y a-t-il dans 1 cm ?", answer: 10, why: "1 cm = 10 mm." },
  ] },
  { subject: "MATH", chapter: "Mesurer des capacités", questions: [
    { num: "Combien de décilitres y a-t-il dans 1 litre ?", answer: 10, why: "1 L = 10 dL." },
    { num: "Combien de verres de 20 cL remplit-on avec 1 L ?", answer: 5, why: "1 L = 100 cL et 100 ÷ 20 = 5." },
    { qcm: "On mesure l’eau d’un seau en…", choices: ["mètres", "*litres", "kilogrammes"], why: "C’est une capacité." },
  ] },
  { subject: "MATH", chapter: "Les masses", questions: [
    { num: "Combien de grammes y a-t-il dans 1 kg ?", answer: 1000, why: "1 kg = 1 000 g." },
    { num: "Combien de paquets de 250 g faut-il pour faire 1 kg ?", answer: 4, why: "4 × 250 = 1 000 g." },
    { qcm: "On pèse un sac de riz en…", choices: ["*kilogrammes", "litres", "mètres"], why: "C’est une masse." },
  ] },
  { subject: "MATH", chapter: "Le temps", questions: [
    { num: "Combien de jours y a-t-il dans une semaine ?", answer: 7, why: "Du lundi au dimanche." },
    { num: "Combien de minutes y a-t-il dans une heure ?", answer: 60, why: "1 h = 60 min." },
    { num: "Combien de mois y a-t-il dans une année ?", answer: 12, why: "De janvier à décembre." },
  ] },
  { subject: "MATH", chapter: "Le périmètre du carré et du rectangle", questions: [
    { num: "Calcule le périmètre (en cm) d’un carré de 6 cm de côté.", answer: 24, why: "6 × 4 = 24 cm." },
    { num: "Calcule le périmètre (en m) d’un rectangle de 8 m sur 3 m.", answer: 22, why: "(8 + 3) × 2 = 22 m." },
    { vf: "Le périmètre est la longueur du tour d’une figure.", answer: true, why: "C’est sa définition." },
  ] },
  { subject: "MATH", chapter: "La monnaie et les prix", questions: [
    { num: "Combien de pièces de 100 F faut-il pour faire 1 000 F ?", answer: 10, why: "10 × 100 = 1 000." },
    { num: "Un pain coûte 150 F. Je paie avec 200 F. Combien me rend-on ?", answer: 50, why: "200 − 150 = 50 F." },
    { num: "Prix d’achat 2 000 F, transport 300 F. Quel est le prix de revient (en F) ?", answer: 2300, why: "2 000 + 300 = 2 300 F." },
  ] },
  { subject: "MATH", chapter: "Les données d’un problème", questions: [
    { qcm: "« Fatou a 8 ans. Elle achète 3 mangues à 100 F. » La donnée inutile pour trouver le prix est…", choices: ["3 mangues", "100 F", "*8 ans"], why: "L’âge ne sert pas au calcul." },
    { num: "Combien Fatou paie-t-elle ?", answer: 300, why: "3 × 100 = 300 F." },
    { vf: "Une donnée manquante empêche de répondre à la question.", answer: true, why: "Il faut la connaître pour calculer." },
  ] },
  { subject: "MATH", chapter: "Les questions d’un problème", questions: [
    { num: "Modou achète 2 cahiers à 200 F et un stylo à 100 F. Combien dépense-t-il ?", answer: 500, why: "2 × 200 + 100 = 500 F." },
    { num: "Il donne 1 000 F. Combien lui rend-on ?", answer: 500, why: "1 000 − 500 = 500 F." },
    { vf: "La question intermédiaire aide à répondre à la question finale.", answer: true, why: "On la résout d’abord." },
  ] },
  // ── Français ───────────────────────────────────────────────────────────────
  { subject: "FR", chapter: "Raconter, décrire et converser", questions: [
    { qcm: "Pour raconter dans l’ordre, j’utilise…", choices: ["*d’abord, ensuite, enfin", "rouge, vert, bleu", "devant, derrière"], why: "Ce sont des mots du temps." },
    { qcm: "Au téléphone, je commence par…", choices: ["au revoir", "*saluer et me présenter", "raccrocher"], why: "C’est la politesse." },
    { vf: "On coupe la parole quand quelqu’un parle.", answer: false, why: "On écoute jusqu’au bout." },
  ] },
  { subject: "FR", chapter: "Le texte narratif", questions: [
    { qcm: "Un conte est un texte…", choices: ["*narratif", "injonctif", "descriptif"], why: "Il raconte une histoire." },
    { qcm: "Le début d’une histoire présente…", choices: ["*les personnages et le lieu", "la fin", "la recette"], why: "C’est la situation initiale." },
    { qcm: "Lequel est un mot du temps ?", choices: ["*autrefois", "derrière", "joli"], why: "Il indique quand." },
  ] },
  { subject: "FR", chapter: "Le texte descriptif", questions: [
    { qcm: "Lequel est un mot de lieu ?", choices: ["hier", "*à côté de", "ensuite"], why: "Il indique où." },
    { qcm: "« C’est », « voici », « il y a » sont des…", choices: ["*présentatifs", "verbes d’action", "noms"], why: "Ils présentent ce qu’on décrit." },
    { vf: "Une description utilise des adjectifs.", answer: true, why: "Pour dire la couleur, la forme, la taille." },
  ] },
  { subject: "FR", chapter: "Le texte injonctif", questions: [
    { qcm: "Une recette de cuisine est un texte…", choices: ["narratif", "*injonctif", "descriptif"], why: "Elle dit comment faire." },
    { qcm: "« Lave le riz. » est une phrase…", choices: ["*impérative", "interrogative", "descriptive"], why: "Elle donne un ordre." },
    { vf: "Les étapes d’une recette doivent être suivies dans l’ordre.", answer: true, why: "Sinon on rate la recette." },
  ] },
  { subject: "FR", chapter: "Le dictionnaire et le vocabulaire", questions: [
    { qcm: "Dans le dictionnaire, quel mot vient en premier ?", choices: ["banane", "*ananas", "citron"], why: "A vient avant B et C." },
    { qcm: "Quel mot vient en premier ?", choices: ["banane", "*balle", "bateau"], why: "Ba-l avant ba-n et ba-t." },
    { qcm: "Le cri de l’âne : l’âne…", choices: ["aboie", "rugit", "*brait"], why: "Le chien aboie, le lion rugit." },
  ] },
  { subject: "FR", chapter: "La phrase", questions: [
    { qcm: "Dans « Les enfants jouent au ballon », le verbe est…", choices: ["enfants", "*jouent", "ballon"], why: "Il dit ce que l’on fait." },
    { qcm: "Dans « Le soleil brille », le sujet est…", choices: ["*Le soleil", "brille", "il n’y en a pas"], why: "Qui est-ce qui brille ? Le soleil." },
    { vf: "Une phrase commence par une majuscule.", answer: true, why: "Et elle se termine par un point." },
  ] },
  { subject: "FR", chapter: "Le groupe nominal", questions: [
    { qcm: "Quel article va avec « maison » ?", choices: ["le", "*la", "un"], why: "Maison est féminin." },
    { qcm: "Dans « un grand arbre », « grand » est…", choices: ["un nom", "*un adjectif", "un verbe"], why: "Il dit comment est l’arbre." },
    { qcm: "« une … fleur » (joli)", choices: ["joli", "*jolie", "jolis"], why: "Féminin : on ajoute e." },
  ] },
  { subject: "FR", chapter: "Phrases impératives, impersonnelles et infinitives", questions: [
    { qcm: "Laquelle est une phrase impérative ?", choices: ["Tu fermes la porte.", "*Ferme la porte.", "Il ferme la porte."], why: "Pas de sujet, elle donne un ordre." },
    { qcm: "« Il faut se laver les mains » est une phrase…", choices: ["*impersonnelle", "interrogative", "exclamative"], why: "« Il » ne désigne personne." },
    { qcm: "« Laver les légumes. » est une phrase…", choices: ["impérative", "*infinitive", "négative"], why: "Le verbe est à l’infinitif." },
  ] },
  { subject: "FR", chapter: "Le présent de l’indicatif", questions: [
    { qcm: "Nous (danser) →", choices: ["dansez", "*dansons", "dansent"], why: "Avec nous : -ons." },
    { qcm: "Ils (être) contents →", choices: ["est", "*sont", "ont"], why: "Être : ils sont." },
    { qcm: "Tu (avoir) un ballon →", choices: ["*as", "a", "es"], why: "Avoir : tu as." },
  ] },
  { subject: "FR", chapter: "Le passé composé", questions: [
    { qcm: "J’(manger) au passé composé →", choices: ["je mange", "*j’ai mangé", "je mangerai"], why: "Avoir + participe passé." },
    { qcm: "Le participe passé de « chanter » est…", choices: ["chanter", "*chanté", "chantait"], why: "Les verbes en -er : -é." },
    { vf: "Le passé composé sert à raconter ce qui est déjà fait.", answer: true, why: "C’est un temps du passé." },
  ] },
  { subject: "FR", chapter: "L’impératif et le futur simple", questions: [
    { qcm: "Futur : nous (jouer) →", choices: ["jouons", "*jouerons", "jouions"], why: "Futur : -rons." },
    { qcm: "Impératif de « ranger » (2e personne du singulier) :", choices: ["ranges", "*range", "rangera"], why: "Range ta chambre !" },
    { qcm: "Demain, je (chanter) →", choices: ["chante", "*chanterai", "chantais"], why: "Futur : -rai." },
  ] },
  { subject: "FR", chapter: "Ponctuation et accords", questions: [
    { qcm: "Quel signe termine une question ?", choices: [".", "*?", "!"], why: "Le point d’interrogation." },
    { qcm: "Les enfants (chanter) →", choices: ["chante", "*chantent", "chantes"], why: "Sujet pluriel : -ent." },
    { qcm: "Dans « un chat », quelle lettre ne s’entend pas ?", choices: ["c", "*t", "a"], why: "Le t final est muet (on le retrouve dans « chaton »)." },
  ] },
  { subject: "FR", chapter: "Les homophones et le féminin des adjectifs", questions: [
    { qcm: "Moussa … faim.", choices: ["à", "*a"], why: "On peut dire « avait faim »." },
    { qcm: "Il va … l’école.", choices: ["*à", "a"], why: "On ne peut pas dire « avait l’école »." },
    { qcm: "Le féminin de « rapide » est…", choices: ["rapidee", "*rapide", "rapides"], why: "Il finit déjà par e." },
  ] },
  { subject: "FR", chapter: "Écrire des textes", questions: [
    { qcm: "Un récit a…", choices: ["*un début, un milieu et une fin", "seulement une fin", "des numéros d’étapes"], why: "C’est le schéma d’une histoire." },
    { vf: "Après avoir écrit, je relis mon texte.", answer: true, why: "Pour corriger les erreurs." },
    { qcm: "Pour décrire, j’utilise surtout…", choices: ["*des adjectifs et des mots de lieu", "des numéros", "des questions"], why: "Ils font voir ce qu’on décrit." },
  ] },
  // ── ESVS ───────────────────────────────────────────────────────────────────
  { subject: "ESVS", chapter: "Le temps qui passe", questions: [
    { qcm: "« Hier » appartient…", choices: ["*au passé", "au présent", "au futur"], why: "C’est avant aujourd’hui." },
    { qcm: "« L’année prochaine » appartient…", choices: ["au passé", "au présent", "*au futur"], why: "C’est plus tard." },
    { vf: "Une frise range les événements du plus ancien au plus récent.", answer: true, why: "C’est son rôle." },
  ] },
  { subject: "ESVS", chapter: "L’histoire de ma famille et de mon école", questions: [
    { qcm: "Les parents de mes parents sont…", choices: ["mes cousins", "*mes grands-parents", "mes oncles"], why: "C’est la première génération de mon arbre." },
    { qcm: "Le parrain d’une école est…", choices: ["le directeur", "*la personne dont elle porte le nom", "le gardien"], why: "On lui rend hommage." },
    { vf: "Les anciens peuvent nous raconter l’histoire de la famille.", answer: true, why: "Ils s’en souviennent." },
  ] },
  { subject: "ESVS", chapter: "L’histoire de mon quartier ou de mon village", questions: [
    { qcm: "Un vieux fort ou un ancien puits est…", choices: ["*un vestige du passé", "un nouveau bâtiment", "une saison"], why: "Il témoigne du passé." },
    { vf: "Les récits des anciens aident à connaître l’histoire du village.", answer: true, why: "Ils transmettent les souvenirs." },
    { qcm: "Pour savoir qui a fondé mon village, je peux…", choices: ["*interroger un ancien", "regarder la météo", "compter les arbres"], why: "Les anciens connaissent l’histoire." },
  ] },
  { subject: "ESVS", chapter: "L’histoire de ma commune", questions: [
    { qcm: "La commune est dirigée par…", choices: ["le directeur d’école", "*le maire", "le policier"], why: "Avec le conseil municipal." },
    { qcm: "On déclare les naissances…", choices: ["*à la mairie", "au marché", "à la mosquée"], why: "C’est l’état civil." },
    { vf: "Le maire est élu par les habitants.", answer: true, why: "Avec le conseil municipal." },
  ] },
  { subject: "ESVS", chapter: "Le jour, la nuit et les points cardinaux", questions: [
    { qcm: "Le Soleil se lève…", choices: ["*à l’est", "à l’ouest", "au nord"], why: "Et il se couche à l’ouest." },
    { num: "Combien y a-t-il de points cardinaux ?", answer: 4, why: "Nord, sud, est, ouest." },
    { qcm: "La boussole indique toujours…", choices: ["*le nord", "le sud", "l’ouest"], why: "Son aiguille pointe vers le nord." },
  ] },
  { subject: "ESVS", chapter: "Le temps qu’il fait et les saisons", questions: [
    { qcm: "La saison des pluies s’appelle…", choices: ["*l’hivernage", "l’harmattan", "le carême"], why: "De juin-juillet à octobre." },
    { qcm: "On mesure la température avec…", choices: ["une règle", "*un thermomètre", "une balance"], why: "Le thermomètre indique s’il fait chaud ou froid." },
    { num: "Combien de grandes saisons y a-t-il au Sénégal ?", answer: 2, why: "La saison des pluies et la saison sèche." },
  ] },
  { subject: "ESVS", chapter: "Le relief", questions: [
    { qcm: "Un terrain plat et bas est…", choices: ["une montagne", "*une plaine", "une colline"], why: "C’est la définition de la plaine." },
    { qcm: "Une colline de sable formée par le vent est…", choices: ["*une dune", "une vallée", "un plateau"], why: "On en voit au bord de la mer." },
    { vf: "Le Sénégal est surtout un pays de plaines.", answer: true, why: "Le relief y est plat." },
  ] },
  { subject: "ESVS", chapter: "Les points d’eau et les cours d’eau", questions: [
    { qcm: "Lequel est un cours d’eau ?", choices: ["un puits", "*un fleuve", "un forage"], why: "Un fleuve coule ; le puits est un point d’eau." },
    { qcm: "Un fleuve se jette…", choices: ["*dans la mer ou l’océan", "dans un puits", "dans une mare"], why: "Par son embouchure." },
    { vf: "Le Sénégal, la Gambie et la Casamance sont des fleuves.", answer: true, why: "Ce sont les grands fleuves du pays." },
  ] },
  { subject: "ESVS", chapter: "Faire un plan", questions: [
    { qcm: "Un plan est un dessin vu…", choices: ["de côté", "*de dessus", "de dessous"], why: "Comme un oiseau qui vole au-dessus." },
    { qcm: "La légende d’un plan explique…", choices: ["*les signes utilisés", "l’histoire du lieu", "le temps qu’il fait"], why: "Chaque signe représente un objet." },
    { vf: "Sur un plan, les objets sont dessinés plus petits.", answer: true, why: "On réduit la réalité." },
  ] },
  { subject: "ESVS", chapter: "Les êtres vivants se nourrissent", questions: [
    { qcm: "Le mouton est…", choices: ["carnivore", "*herbivore", "insectivore"], why: "Il mange de l’herbe." },
    { qcm: "Le lion est…", choices: ["*carnivore", "herbivore", "granivore"], why: "Il mange de la viande." },
    { vf: "La plante a besoin d’eau et de lumière.", answer: true, why: "Pour vivre et grandir." },
  ] },
  { subject: "ESVS", chapter: "Les êtres vivants respirent", questions: [
    { qcm: "Le poisson respire avec…", choices: ["des poumons", "*des branchies", "son nez"], why: "Les branchies prennent l’air dissous dans l’eau." },
    { vf: "Les plantes respirent.", answer: true, why: "Par leurs feuilles." },
    { qcm: "L’homme respire par…", choices: ["*le nez", "les oreilles", "les yeux"], why: "L’air va dans les poumons." },
  ] },
  { subject: "ESVS", chapter: "Les produits et les objets de la maison", questions: [
    { qcm: "Lequel est un combustible ?", choices: ["l’eau", "*le charbon de bois", "le sable"], why: "Il brûle et donne de la chaleur." },
    { qcm: "Le foyer amélioré…", choices: ["*consomme moins de bois", "consomme plus de bois", "marche à l’électricité"], why: "Il économise le bois." },
    { vf: "On garde l’essence près du feu.", answer: false, why: "C’est très dangereux." },
  ] },
  { subject: "ESVS", chapter: "L’eau potable", questions: [
    { qcm: "Pour purifier l’eau, on peut…", choices: ["*la filtrer et ajouter un peu d’eau de Javel", "y mettre du sable", "la laisser au soleil sans couvercle"], why: "Décantation, filtrage, javellisation." },
    { vf: "Une eau sale peut donner la diarrhée.", answer: true, why: "Elle contient des microbes." },
    { qcm: "Pour économiser l’eau, je…", choices: ["laisse couler le robinet", "*ferme bien le robinet", "lave la cour tous les jours"], why: "L’eau est précieuse." },
  ] },
  { subject: "ESVS", chapter: "L’hygiène et l’alimentation", questions: [
    { qcm: "Je me lave les mains…", choices: ["*avant de manger et après les toilettes", "une fois par semaine", "jamais"], why: "Pour enlever les microbes." },
    { qcm: "Le poisson et les œufs servent surtout à…", choices: ["*grandir", "avoir chaud", "dormir"], why: "Ce sont des aliments de construction." },
    { vf: "On jette les ordures dans la poubelle.", answer: true, why: "Pour garder le milieu propre." },
  ] },
  { subject: "ESVS", chapter: "Protéger l’environnement", questions: [
    { qcm: "Pour protéger l’environnement, on peut…", choices: ["couper les arbres", "*planter des arbres", "brûler la brousse"], why: "Les arbres protègent le sol." },
    { vf: "Les feux de brousse détruisent la végétation.", answer: true, why: "Ils appauvrissent le milieu." },
    { qcm: "Le mobilier de l’école…", choices: ["*doit être respecté", "peut être cassé", "n’est à personne"], why: "Il appartient à tous." },
  ] },
  { subject: "ESVS", chapter: "Respecter les autres", questions: [
    { qcm: "Quand on me rend service, je dis…", choices: ["*merci", "au revoir", "rien"], why: "C’est la politesse." },
    { vf: "On cède sa place à une personne âgée.", answer: true, why: "C’est une marque de respect." },
    { qcm: "Respecter les autres, c’est…", choices: ["se moquer d’eux", "*les traiter comme j’aimerais être traité", "les ignorer"], why: "C’est la règle d’or." },
  ] },
  { subject: "ESVS", chapter: "Le civisme", questions: [
    { qcm: "Les couleurs du drapeau sénégalais sont…", choices: ["rouge, blanc, bleu", "*vert, or, rouge", "noir, jaune, vert"], why: "Avec une étoile verte au centre." },
    { qcm: "La devise du Sénégal est…", choices: ["*Un Peuple – Un But – Une Foi", "Liberté – Égalité – Fraternité", "Paix – Travail – Patrie"], why: "Elle est inscrite dans la Constitution." },
    { qcm: "La fête de l’indépendance du Sénégal est le…", choices: ["1er mai", "*4 avril", "25 décembre"], why: "Le 4 avril." },
  ] },
  { subject: "ESVS", chapter: "Respecter les différences", questions: [
    { vf: "Les filles et les garçons ont les mêmes droits.", answer: true, why: "Tous les enfants ont les mêmes droits." },
    { qcm: "Devant un camarade handicapé, je…", choices: ["me moque de lui", "*l’aide et le respecte", "l’évite"], why: "On respecte chacun." },
    { qcm: "Nos différences sont…", choices: ["un problème", "*une richesse", "interdites"], why: "Elles nous enrichissent." },
  ] },
];

const built = buildExerciseSeries("CE1", CHAPTERS_CE1, SERIES);

export const QUESTIONS_CE1 = built.questions;
export const ANSWER_KEYS_CE1 = built.keys;
/** Chapitre de chaque question (banque utilisée par « Préparer mon prochain devoir »). */
export const QUESTION_CHAPTERS_CE1 = built.questionChapters;
export const ASSESSMENTS_CE1 = built.assessments;
