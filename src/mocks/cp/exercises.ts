import "server-only";

// Exercices corrigés du CP : une série par chapitre, écrite par DIANGAL d'après les chapitres
// du guide officiel de l'étape 1 (à faire relire par des enseignants).
// En français et en ESVS, les questions illustrées de cp/enrich.ts complètent chaque série.
// Corrigés inclus : ce fichier ne doit jamais atteindre le navigateur.

import { CHAPTERS_CP } from "../curriculum-cp";
import { buildExerciseSeries, type ExerciseSeries } from "../exercise-series";
import { withExtras } from "../illustrated-questions";
import { EXTRA_CP } from "./enrich";
import { MENTAL_TO_50 } from "./maths/calcul-mental-50";
import { GRIDS_CP, LINES_CP, RULER_CP, SHAPES_CP } from "./maths/geometrie";
import { CAPACITIES_CP, LENGTHS_CP, MASSES_CP, MONEY_CP, TIME_CP } from "./maths/mesure";
import { NUMBERS_21_50 } from "./maths/nombres-21-50";
import { NUMBERS_51_79 } from "./maths/nombres-51-79";
import { NUMBERS_TO_20 } from "./maths/nombres-jusqu-a-20";
import { NUMBERS_TO_100 } from "./maths/nombres-jusqu-a-100";
import { SHARE_MULTIPLY } from "./maths/partager-multiplier";
import { DATA_CP, PROBLEM_QUESTIONS_CP } from "./maths/problemes";
import { OPERATIONS_TO_50 } from "./maths/operations-jusqu-a-50";

const SERIES: ExerciseSeries[] = [
  // ── Mathématiques ──────────────────────────────────────────────────────────
  ...LINES_CP,
  ...GRIDS_CP,
  ...RULER_CP,
  ...SHAPES_CP,
  ...NUMBERS_TO_20,
  ...NUMBERS_21_50,
  ...OPERATIONS_TO_50,
  ...MENTAL_TO_50,
  ...NUMBERS_51_79,
  ...SHARE_MULTIPLY,
  ...NUMBERS_TO_100,
  ...LENGTHS_CP,
  ...CAPACITIES_CP,
  ...MASSES_CP,
  ...TIME_CP,
  ...MONEY_CP,
  ...DATA_CP,
  ...PROBLEM_QUESTIONS_CP,

  // ── Français ───────────────────────────────────────────────────────────────
  {
    subject: "FR",
    chapter: "Inviter et recommander",
    questions: [
      { qcm: "Une invitation doit dire…", choices: ["*quoi, quand et où", "seulement le prénom", "le prix"], why: "On dit à quoi on invite, quand et où." },
      { qcm: "Pour refuser poliment une invitation, tu dis :", choices: ["Non !", "*Merci, mais je ne peux pas venir.", "Je ne veux pas."], why: "On remercie, puis on explique qu’on ne peut pas venir." },
      { vf: "Quand je recommande quelque chose, je dis aussi pourquoi.", answer: true, why: "Expliquer pourquoi aide l’autre à suivre le conseil." },
    ],
  },
  {
    subject: "FR",
    chapter: "Je relis les sons du CI",
    questions: [
      { qcm: "Dans quel mot entends-tu le son [on] ?", choices: ["*ballon", "bateau", "moto"], why: "« bal-lon » se termine par le son [on]." },
      { qcm: "Dans quel mot entends-tu le son [ou] ?", choices: ["lune", "*soupe", "tomate"], why: "« sou-pe » : on entend [ou]." },
      { vf: "Dans « bateau », on entend le son [o] écrit « eau ».", answer: true, why: "« ba-teau » : eau se lit [o]." },
    ],
  },
  {
    subject: "FR",
    chapter: "Raconter",
    questions: [
      { qcm: "Pour raconter dans l’ordre, je commence par…", choices: ["enfin", "*d’abord", "ensuite"], why: "D’abord, ensuite, puis, enfin : d’abord vient en premier." },
      { qcm: "Un conte commence souvent par…", choices: ["*Il était une fois", "Au revoir", "Merci"], why: "« Il était une fois » ou « Un jour » ouvrent souvent les contes." },
      { vf: "Dans un conte, il y a souvent un problème, puis une solution.", answer: true, why: "Comme Leuk qui trouve comment boire l’eau de la gourde." },
    ],
  },
  {
    subject: "FR",
    chapter: "Les sons v, w et oi",
    questions: [
      { qcm: "Quel mot commence par le son [v] ?", choices: ["*vélo", "fusée", "bébé"], why: "« vé-lo » commence par [v]." },
      { qcm: "Dans quel mot entends-tu le son [oi] ?", choices: ["moto", "*étoile", "olive"], why: "« é-toi-le » : on entend [oi]." },
      { text: "Écris les lettres qui manquent : un r… (le roi)", answer: "oi", why: "On écrit roi avec oi." },
    ],
  },
  {
    subject: "FR",
    chapter: "Les sons ch et é",
    questions: [
      { qcm: "Quel mot commence par le son [ch] ?", choices: ["*chat", "sac", "car"], why: "« chat » commence par ch." },
      { qcm: "Dans quel mot la fin -er se lit [é] ?", choices: ["*manger", "mer", "fer"], why: "À la fin du verbe « manger », -er se lit [é]." },
      { vf: "Dans « nez », on entend le son [é].", answer: true, why: "« nez » se lit [né]." },
    ],
  },
  {
    subject: "FR",
    chapter: "Les sons k et f",
    questions: [
      { qcm: "Quel mot s’écrit avec qu ?", choices: ["*quatre", "canard", "kilo"], why: "« quatre » s’écrit avec qu." },
      { qcm: "Dans quel mot ph se lit [f] ?", choices: ["*photo", "papa", "hibou"], why: "« photo » : ph se lit [f]." },
      { vf: "Dans « coq », on entend deux fois le son [k].", answer: true, why: "« coq » commence et se termine par [k]." },
    ],
  },
  {
    subject: "FR",
    chapter: "Les sons eu, s et z",
    questions: [
      { qcm: "Dans quel mot le s se lit [z] ?", choices: ["*maison", "salade", "poisson"], why: "Un seul s entre deux voyelles se lit [z] : mai-son." },
      { qcm: "Dans quel mot entends-tu le son [eu] ?", choices: ["*bleu", "blé", "bol"], why: "« bleu » : on entend [eu]." },
      { qcm: "Quel mot s’écrit avec ç ?", choices: ["*garçon", "cinéma", "salon"], why: "« gar-çon » : la cédille donne le son [s] devant o." },
    ],
  },
  {
    subject: "FR",
    chapter: "Les sons g, j et gn",
    questions: [
      { qcm: "Dans quel mot g se lit [j] ?", choices: ["gare", "*girafe", "gomme"], why: "Devant i, g se lit [j] : girafe." },
      { qcm: "Quel mot s’écrit avec gu ?", choices: ["*guitare", "girafe", "gâteau"], why: "« gui-ta-re » : gu garde le son [g] devant i." },
      { qcm: "Dans quel mot entends-tu le son [gn] ?", choices: ["*montagne", "maman", "magie"], why: "« mon-ta-gne » : on entend [gn]." },
    ],
  },
  {
    subject: "FR",
    chapter: "Les sons in et an",
    questions: [
      { qcm: "Quel mot s’écrit avec ain ?", choices: ["lapin", "*pain", "peinture"], why: "« pain » s’écrit avec ain." },
      { qcm: "Dans quel mot entends-tu le son [an] ?", choices: ["*enfant", "lapin", "lune"], why: "« en-fant » : deux fois le son [an]." },
      { vf: "Devant p, on écrit am ou em : lampe, temps.", answer: true, why: "Devant m, b et p, on écrit am et em." },
    ],
  },
  {
    subject: "FR",
    chapter: "Écrire en lettres attachées",
    questions: [
      { qcm: "Quelle lettre descend sous la ligne ?", choices: ["a", "*g", "o"], why: "La queue du g descend sous la ligne, comme celles du j et du y." },
      { vf: "En écriture attachée, on lève le crayon entre chaque lettre d’un mot.", answer: false, why: "Non : les lettres d’un mot se tiennent la main, on ne lève pas le crayon." },
      { qcm: "Quelle lettre a une boucle qui monte ?", choices: ["*l", "c", "u"], why: "La boucle du l monte jusqu’à la deuxième ligne." },
    ],
  },
  {
    subject: "FR",
    chapter: "Décrire et comparer",
    questions: [
      { qcm: "Pour décrire un objet, je peux dire…", choices: ["*sa couleur et sa forme", "l’heure qu’il est", "mon âge"], why: "Décrire, c’est dire comment est l’objet : couleur, forme, taille." },
      { qcm: "Complète : Le chat est plus petit … le chien.", choices: ["*que", "et", "mais"], why: "Pour comparer : plus… que." },
      { vf: "« Awa est aussi grande que Fatou » veut dire qu’elles ont la même taille.", answer: true, why: "Aussi… que exprime l’égalité." },
    ],
  },
  {
    subject: "FR",
    chapter: "Les consonnes doubles",
    questions: [
      { qcm: "Quel mot commence par tr ?", choices: ["*train", "drap", "prune"], why: "« train » commence par tr." },
      { qcm: "Quel mot commence par fl ?", choices: ["*fleur", "plume", "clé"], why: "« fleur » commence par fl." },
      { vf: "Dans « arbre », on entend br.", answer: true, why: "« ar-bre » : b et r se lisent ensemble." },
    ],
  },
  {
    subject: "FR",
    chapter: "Les sons oir, eur et les lettres muettes",
    questions: [
      { qcm: "Dans quel mot entends-tu le son [oir] ?", choices: ["*miroir", "moteur", "mouton"], why: "« mi-roir » se termine par [oir]." },
      { qcm: "Quelle lettre est muette dans « chat » ?", choices: ["c", "a", "*t"], why: "Le t de chat ne s’entend pas : pense à « chaton »." },
      { vf: "Dans « nid », le d ne s’entend pas.", answer: true, why: "Le d est muet ; on le retrouve dans « nicher »… et on l’écrit quand même !" },
    ],
  },
  {
    subject: "FR",
    chapter: "Donner des ordres et interdire",
    questions: [
      { qcm: "Quelle phrase donne une consigne ?", choices: ["*Ferme la porte, s’il te plaît.", "La porte est fermée.", "J’aime cette porte."], why: "Une consigne commence souvent par un verbe d’action : ferme." },
      { qcm: "Quelle phrase interdit quelque chose ?", choices: ["Je cours vite.", "*Ne cours pas dans l’escalier.", "Tu cours bien."], why: "Ne… pas sert à interdire." },
      { vf: "Quand on interdit quelque chose, il est bien de dire pourquoi.", answer: true, why: "Expliquer la raison aide à respecter la règle." },
    ],
  },
  {
    subject: "FR",
    chapter: "Les sons ette, elle et ill",
    questions: [
      { qcm: "Dans quel mot e se lit [è] devant deux consonnes ?", choices: ["*terre", "lune", "petit"], why: "Devant rr, le e se lit [è] : terre." },
      { qcm: "Dans quel mot entends-tu le son [ill] ?", choices: ["*fille", "file", "fil"], why: "« fi-lle » : on entend [ill]." },
      { qcm: "Quel mot se termine par eil ?", choices: ["*soleil", "travail", "fauteuil"], why: "« so-leil » se termine par eil." },
    ],
  },
  {
    subject: "FR",
    chapter: "Les sons ier, ieu, ien, ui, oin et ion",
    questions: [
      { qcm: "Dans quel mot entends-tu le son [ien] ?", choices: ["*chien", "chat", "chou"], why: "« chien » se termine par [ien]." },
      { qcm: "Quel mot s’écrit avec oin ?", choices: ["*loin", "lion", "lune"], why: "« loin » s’écrit avec oin." },
      { vf: "Dans « hibou », le h ne se prononce pas.", answer: true, why: "Le h au début de hibou est muet." },
    ],
  },
  {
    subject: "FR",
    chapter: "Écrire de petits textes",
    questions: [
      { qcm: "Une phrase commence par…", choices: ["*une majuscule", "un point", "une virgule"], why: "La première lettre d’une phrase est une majuscule." },
      { vf: "Au CP, un petit texte contient au moins deux phrases.", answer: true, why: "Le programme demande d’écrire des énoncés d’au moins deux phrases." },
      { qcm: "Dans une consigne écrite, chaque phrase commence souvent par…", choices: ["*un verbe d’action", "un nom de ville", "un nombre"], why: "Par exemple : prends, plie, dessine." },
    ],
  },

  // ── ESVS ───────────────────────────────────────────────────────────────────
  {
    subject: "ESVS",
    chapter: "Histoire : l’ordre et la fréquence des événements",
    questions: [
      { qcm: "Quel mot indique le jour d’avant aujourd’hui ?", choices: ["demain", "*hier", "pendant"], why: "Hier, c’est le jour qui est déjà passé." },
      { qcm: "« Je me lave les mains … le repas. » Quel mot convient ?", choices: ["*avant", "après", "pendant"], why: "On se lave les mains avant de manger." },
      { qcm: "« Nous allons au marché … les dimanches. » Quel mot convient ?", choices: ["*tous", "hier", "avant"], why: "« Tous les dimanches » dit la fréquence." },
    ],
  },
  {
    subject: "ESVS",
    chapter: "Histoire : mesurer le temps",
    questions: [
      { qcm: "Quel instrument mesure une durée ?", choices: ["*le sablier", "le calendrier", "la règle"], why: "Le sablier mesure le temps qui passe." },
      { qcm: "Ce qui dit quelle activité a lieu à quelle heure en classe s’appelle…", choices: ["*l’emploi du temps", "le cahier", "le tableau"], why: "L’emploi du temps organise les activités de la journée." },
      { vf: "Une durée se dit avec un moment de début et un moment de fin.", answer: true, why: "Par exemple : de 10 heures à 10 heures et demie." },
    ],
  },
  {
    subject: "ESVS",
    chapter: "Géographie : situer et ranger",
    questions: [
      { qcm: "« La gomme est … le crayon et la règle. » Quel mot convient ?", choices: ["*entre", "loin", "dans"], why: "Entre : au milieu de deux objets." },
      { qcm: "Trier des objets selon leur usage, c’est les regrouper selon…", choices: ["*ce à quoi ils servent", "leur prix", "leur âge"], why: "L’usage, c’est ce à quoi sert l’objet." },
      { vf: "Ranger du plus grand au plus petit, c’est choisir un ordre.", answer: true, why: "Trier, c’est regrouper ; ranger, c’est mettre dans un ordre." },
    ],
  },
  {
    subject: "ESVS",
    chapter: "Géographie : estimer et mesurer des distances",
    questions: [
      { qcm: "Quel instrument permet de mesurer une distance avec précision ?", choices: ["*le mètre", "le sablier", "la balance"], why: "Le mètre mesure les longueurs et les distances." },
      { vf: "Le pas et l’empan sont des unités naturelles de mesure.", answer: true, why: "On les prend sur son corps : pas, pied, empan, coudée." },
      { qcm: "Avant de mesurer une distance, on peut d’abord…", choices: ["*l’estimer", "la dessiner", "l’oublier"], why: "On estime, puis on mesure pour vérifier." },
    ],
  },
  {
    subject: "ESVS",
    chapter: "Sciences : outils et objets techniques",
    questions: [
      { qcm: "Quel outil sert à enfoncer un clou ?", choices: ["*le marteau", "les ciseaux", "la pelle"], why: "Le marteau enfonce les clous." },
      { qcm: "Pour que la chaîne du vélo tourne bien, on la…", choices: ["*graisse", "lave au savon", "peint"], why: "Graisser la chaîne est une technique d’entretien." },
      { vf: "Un objet bien entretenu dure plus longtemps.", answer: true, why: "L’entretien protège les objets de l’usure." },
    ],
  },
  {
    subject: "ESVS",
    chapter: "Sciences : comprendre et fabriquer un objet",
    questions: [
      { qcm: "À quoi sert le guidon d’un vélo ?", choices: ["*à diriger", "à freiner la nuit", "à éclairer"], why: "Le guidon permet de diriger le vélo." },
      { qcm: "Dans une lampe de poche, qui donne l’énergie ?", choices: ["*les piles", "le bouton", "le verre"], why: "Les piles fournissent l’énergie pour éclairer." },
      { vf: "Avec du matériel de récupération, on peut fabriquer des jouets.", answer: true, why: "Boîtes, fil de fer, carton et tissu permettent de fabriquer des jouets." },
    ],
  },
  {
    subject: "ESVS",
    chapter: "Vivre dans son milieu : éviter les intoxications",
    questions: [
      { qcm: "Où range-t-on l’eau de Javel ?", choices: ["*hors de portée des enfants", "à côté de la nourriture", "dans le frigo"], why: "Les produits d’entretien se rangent loin des aliments et hors de portée des enfants." },
      { vf: "On peut prendre un médicament seul, sans demander à un adulte.", answer: false, why: "Non : c’est un adulte qui le donne, sur avis d’un soignant." },
      { vf: "Un médicament périmé est dangereux.", answer: true, why: "Il n’est plus bon et peut rendre malade." },
    ],
  },
  {
    subject: "ESVS",
    chapter: "Vivre dans son milieu : protéger l’environnement",
    questions: [
      { qcm: "Que faire de ses ordures ?", choices: ["*les mettre à la poubelle", "les jeter dans la rue", "les cacher sous un arbre"], why: "Les ordures vont à la poubelle pour garder le quartier propre." },
      { qcm: "Lequel est un bien commun ?", choices: ["*la fontaine du quartier", "mon cartable", "ma chemise"], why: "La fontaine appartient à tout le monde." },
      { vf: "Les eaux usées dans la rue attirent les moustiques.", answer: true, why: "L’eau sale stagnante attire les moustiques et donne des maladies." },
    ],
  },
  {
    subject: "ESVS",
    chapter: "Vivre ensemble : respect et bonne conduite",
    questions: [
      { qcm: "Quel comportement montre du respect ?", choices: ["*saluer les aînés", "se moquer d’un camarade", "crier en classe"], why: "Saluer les aînés est une marque de respect." },
      { qcm: "Aider un camarade qui est tombé, c’est être…", choices: ["*solidaire", "paresseux", "en retard"], why: "La solidarité, c’est s’entraider." },
      { vf: "Être ponctuel, c’est arriver à l’heure.", answer: true, why: "La ponctualité est un bon comportement." },
    ],
  },
  {
    subject: "ESVS",
    chapter: "Vivre ensemble : règles et responsabilités",
    questions: [
      { qcm: "Avant de traverser la rue, je regarde…", choices: ["*à gauche, à droite, puis encore à gauche", "seulement devant moi", "le ciel"], why: "On vérifie que la route est libre des deux côtés." },
      { qcm: "Où marche-t-on le long d’une route ?", choices: ["*sur le trottoir ou le bord", "au milieu de la route", "sur la ligne blanche"], why: "Le trottoir protège les piétons des voitures." },
      { vf: "Quand j’accepte une responsabilité, je dois tenir mon engagement.", answer: true, why: "Être responsable, c’est faire ce qu’on a promis." },
    ],
  },
];

const built = buildExerciseSeries("CP", CHAPTERS_CP, withExtras(SERIES, EXTRA_CP));

export const QUESTIONS_CP = built.questions;
export const ANSWER_KEYS_CP = built.keys;
/** Chapitre de chaque question (banque utilisée par « Préparer mon prochain devoir »). */
export const QUESTION_CHAPTERS_CP = built.questionChapters;
export const ASSESSMENTS_CP = built.assessments;
