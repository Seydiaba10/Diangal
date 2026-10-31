import "server-only";

// Exercices corrigés du CI : en maths, une série par leçon du cahier de l'école (src/mocks/ci/maths/) ;
// dans les autres matières, une série par chapitre, écrite par DIANGAL d'après les chapitres
// du guide officiel de l'étape 1 (à faire relire par des enseignants). Questions courtes, avec
// des mots du quotidien, pour des enfants de 6 ans qui apprennent à lire, complétées par les
// questions illustrées de ci/enrich.ts.
// Corrigés inclus : ce fichier ne doit jamais atteindre le navigateur.

import { CHAPTERS_CI } from "../curriculum-ci";
import { buildExerciseSeries, type ExerciseSeries } from "../exercise-series";
import { withExtras } from "../illustrated-questions";
import { EXTRA_CI } from "./enrich";
import { SETS_CI } from "./maths/ensembles";
import { FIGURES_CI, LINES_CI, SOLIDS_CI, SPACE_CI } from "./maths/geometrie";
import { LENGTHS_CI, MASSES_CI, TIME_CI } from "./maths/mesure";
import { ADD_SUB_10, NUMBERS_0_5, NUMBERS_6_10 } from "./maths/nombres-0-10";
import { CALC_20, NUMBERS_11_20 } from "./maths/nombres-11-20";
import { IMAGES_CI, SOLVE_CI, UNDERSTAND_CI } from "./maths/problemes";

const SERIES: ExerciseSeries[] = [
  // ── Mathématiques (une série par leçon du cahier de l'école : src/mocks/ci/maths/) ──
  ...SPACE_CI,
  ...SETS_CI,
  ...LENGTHS_CI,
  ...IMAGES_CI,
  ...SOLIDS_CI,
  ...FIGURES_CI,
  ...NUMBERS_0_5,
  ...NUMBERS_6_10,
  ...ADD_SUB_10,
  ...MASSES_CI,
  ...UNDERSTAND_CI,
  ...LINES_CI,
  ...NUMBERS_11_20,
  ...CALC_20,
  ...TIME_CI,
  ...SOLVE_CI,

  // ── Français ───────────────────────────────────────────────────────────────
  {
    subject: "FR",
    chapter: "Bonjour l’école !",
    questions: [
      { qcm: "Le matin, en arrivant à l’école, tu dis à la maîtresse :", choices: ["Au revoir, madame.", "*Bonjour, madame.", "Bonne nuit, madame."], why: "Quand on arrive, on salue : « Bonjour »." },
      { qcm: "Pour te présenter, tu dis :", choices: ["*Je m’appelle Awa.", "Tu t’appelles Awa.", "Il s’appelle Awa."], why: "Pour parler de soi, on dit « je » : « Je m’appelle… »." },
      { qcm: "En partant de l’école, tu dis :", choices: ["Bonjour !", "Merci !", "*Au revoir !"], why: "Quand on part, on prend congé : « Au revoir »." },
      { vf: "Quand la maîtresse dit « Asseyez-vous », on reste debout.", answer: false, why: "Non : on écoute la consigne et on s’assoit." },
    ],
  },
  {
    subject: "FR",
    chapter: "Découvrir l’écrit",
    questions: [
      { qcm: "Quelle est la première lettre de l’alphabet ?", choices: ["*a", "b", "z"], why: "L’alphabet commence par a, b, c…" },
      { num: "Combien de syllabes entends-tu dans « ma-man » ?", answer: 2, why: "On tape deux fois dans ses mains : ma - man." },
      { vf: "On lit une ligne de gauche à droite.", answer: true, why: "En français, on lit et on écrit de la gauche vers la droite." },
      { qcm: "Lequel est un vrai mot ?", choices: ["tqzx", "*papa", "rrrr"], why: "« papa » est un mot que l’on peut lire et comprendre." },
    ],
  },
  {
    subject: "FR",
    chapter: "Les premiers gestes d’écriture",
    questions: [
      { qcm: "Avec quoi écris-tu sur ton ardoise ?", choices: ["Une cuillère", "*Une craie", "Un ballon"], why: "La craie sert à écrire sur l’ardoise." },
      { qcm: "Pour bien écrire, tu tiens ton crayon…", choices: ["*entre le pouce et l’index", "avec le poing fermé", "par la pointe"], why: "Le crayon se tient entre le pouce et l’index, appuyé sur le majeur." },
      { vf: "On trace les lettres de gauche à droite sur la ligne.", answer: true, why: "On avance sur la ligne de la gauche vers la droite." },
    ],
  },
  {
    subject: "FR",
    chapter: "Les sons a, i et t",
    questions: [
      { qcm: "Dans quel mot entends-tu le son [a] ?", choices: ["lit", "*ami", "tour"], why: "« a-mi » : on entend [a] au début." },
      { qcm: "Dans quel mot entends-tu le son [i] ?", choices: ["papa", "bol", "*riz"], why: "« riz » : on entend le son [i]." },
      { qcm: "Quel mot commence par le son [t] ?", choices: ["lapin", "*tapis", "mouton"], why: "« ta-pis » commence par [t]." },
      { vf: "Dans le mot « tata », on entend deux fois le son [a].", answer: true, why: "« ta - ta » : deux fois [a]." },
    ],
  },
  {
    subject: "FR",
    chapter: "Les sons o et l",
    questions: [
      { qcm: "Dans quel mot entends-tu le son [o] ?", choices: ["*vélo", "lit", "pain"], why: "« vé-lo » se termine par le son [o]." },
      { qcm: "Quel mot commence par le son [l] ?", choices: ["table", "*lune", "moto"], why: "« lune » commence par [l]." },
      { text: "Écris la lettre qui manque : un vé…o", answer: "l", why: "On écrit « vélo » avec la lettre l." },
      { vf: "On entend le son [o] dans « moto ».", answer: true, why: "« mo - to » : deux fois le son [o]." },
    ],
  },
  {
    subject: "FR",
    chapter: "Demander et donner un renseignement",
    questions: [
      { qcm: "Pour connaître le lieu, on demande :", choices: ["*Où ?", "Quand ?", "Combien ?"], why: "« Où ? » demande le lieu : « Où est ta maison ? »" },
      { qcm: "« … as-tu de frères ? »<br>Quel mot manque ?", choices: ["Où", "Qui", "*Combien"], why: "On veut un nombre : « Combien as-tu de frères ? »" },
      { qcm: "Pour connaître le moment, on demande :", choices: ["Où ?", "*Quand ?", "Qui ?"], why: "« Quand ? » demande le moment : « Quand pars-tu ? »" },
      { qcm: "« … est ton maître ? » — « C’est monsieur Diallo. »", choices: ["*Qui", "Où", "Combien"], why: "On demande une personne : « Qui est ton maître ? »" },
    ],
  },
  {
    subject: "FR",
    chapter: "Les sons n et e",
    questions: [
      { qcm: "Quel mot commence par le son [n] ?", choices: ["*nid", "pomme", "sac"], why: "« nid » commence par [n]." },
      { qcm: "Dans quel mot entends-tu le son [e], comme dans « le » ?", choices: ["papa", "*petit", "vélo"], why: "« pe-tit » : on entend [e] comme dans « le »." },
      { vf: "On entend le son [n] dans « ananas ».", answer: true, why: "« a-na-nas » : on entend [n] deux fois." },
    ],
  },
  {
    subject: "FR",
    chapter: "Les sons p, d, m et b",
    questions: [
      { qcm: "Quel mot commence par le son [p] ?", choices: ["bébé", "*papa", "maman"], why: "« pa-pa » commence par [p]." },
      { qcm: "Quel mot commence par le son [m] ?", choices: ["dodo", "banane", "*mouton"], why: "« mou-ton » commence par [m]." },
      { qcm: "Quel mot commence par le son [b] ?", choices: ["*bol", "pied", "dent"], why: "« bol » commence par [b]." },
      { qcm: "Quel mot commence par le son [d] ?", choices: ["tomate", "*domino", "baobab"], why: "« do-mi-no » commence par [d]." },
    ],
  },
  {
    subject: "FR",
    chapter: "Dire ce que je ressens et ce que j’aime",
    questions: [
      { qcm: "Tu as faim. Tu dis :", choices: ["Je suis fatigué.", "*J’ai faim, je voudrais manger.", "J’ai froid."], why: "On dit ce que l’on ressent avec « J’ai faim »." },
      { qcm: "Pour dire ce que tu préfères, tu dis :", choices: ["*Je préfère la mangue.", "Je vois la mangue.", "La mangue est jaune."], why: "« Je préfère » sert à dire ce que l’on aime le plus." },
      { vf: "On peut dire poliment que l’on n’est pas d’accord.", answer: true, why: "Oui : par exemple « Je ne suis pas d’accord, parce que… »." },
    ],
  },
  {
    subject: "FR",
    chapter: "Les sons f, u et ou",
    questions: [
      { qcm: "Dans quel mot entends-tu le son [u], comme dans « lune » ?", choices: ["*mur", "mouton", "fil"], why: "« mur » : on entend [u] comme dans « lune »." },
      { qcm: "Dans quel mot entends-tu le son [ou] ?", choices: ["lune", "fée", "*poule"], why: "« pou-le » : on entend [ou]." },
      { qcm: "Quel mot commence par le son [f] ?", choices: ["*feu", "vélo", "pied"], why: "« feu » commence par [f]." },
      { vf: "« loup » et « lune » contiennent le même son.", answer: false, why: "Non : « loup » a le son [ou], « lune » a le son [u]." },
    ],
  },
  {
    subject: "FR",
    chapter: "Les sons é et è",
    questions: [
      { qcm: "Dans quel mot entends-tu le son [é] ?", choices: ["mère", "*bébé", "lit"], why: "« bé-bé » : deux fois le son [é]." },
      { qcm: "Dans quel mot entends-tu le son [è] ?", choices: ["vélo", "école", "*père"], why: "« père » : on entend [è], comme dans « mère »." },
      { vf: "On entend le son [é] à la fin du mot « café ».", answer: true, why: "« ca-fé » se termine par [é]." },
    ],
  },
  {
    subject: "FR",
    chapter: "Les sons s, r, au et on",
    questions: [
      { qcm: "Quel mot commence par le son [s] ?", choices: ["rat", "*soleil", "lion"], why: "« so-leil » commence par [s]." },
      { qcm: "Dans quel mot entends-tu le son [on] ?", choices: ["*mouton", "radio", "épaule"], why: "« mou-ton » se termine par [on]." },
      { qcm: "Dans quel mot vois-tu les lettres « au » ?", choices: ["bonbon", "*épaule", "riz"], why: "« ép-au-le » s’écrit avec « au », qui se lit [o]." },
      { vf: "On entend le son [r] dans « radio ».", answer: true, why: "« ra-di-o » commence par [r]." },
    ],
  },
  {
    subject: "FR",
    chapter: "Demander la permission ou un service",
    questions: [
      { qcm: "Pour sortir de la classe, tu demandes :", choices: ["Je sors.", "*Madame, est-ce que je peux sortir, s’il vous plaît ?", "Ouvre la porte !"], why: "On demande la permission poliment, avec « s’il vous plaît »." },
      { qcm: "Ton camarade te prête son crayon. Tu dis :", choices: ["Bonjour !", "*Merci !", "Pardon !"], why: "Quand on nous rend un service, on dit « merci »." },
      { vf: "On dit « s’il te plaît » quand on demande un service à un ami.", answer: true, why: "Avec un ami, on dit « s’il te plaît » ; avec un adulte, « s’il vous plaît »." },
    ],
  },
  {
    subject: "FR",
    chapter: "Mes premières lettres attachées",
    questions: [
      { qcm: "Laquelle de ces lettres est une lettre ronde ?", choices: ["l", "*o", "t"], why: "Le o se trace en tournant : c’est une lettre ronde." },
      { vf: "En écriture attachée, les lettres d’un mot se touchent.", answer: true, why: "On écrit le mot sans lever le crayon entre les lettres." },
      { qcm: "Les lettres o, c, a, d et q commencent toutes par…", choices: ["une boucle", "un pont", "*un rond"], why: "Ce sont les lettres rondes : on commence par tracer un rond." },
    ],
  },
  {
    subject: "FR",
    chapter: "J’écris mes premières phrases",
    questions: [
      { qcm: "Une phrase commence par…", choices: ["*une majuscule", "un point", "une virgule"], why: "La première lettre d’une phrase est une majuscule." },
      { qcm: "Une phrase se termine souvent par…", choices: ["une majuscule", "un tiret", "*un point"], why: "On met un point à la fin de la phrase." },
      { qcm: "Remets les mots dans l’ordre : mange / Awa / une mangue", choices: ["Mange une mangue Awa.", "*Awa mange une mangue.", "Une mangue Awa mange."], why: "On dit d’abord qui fait l’action : « Awa mange une mangue. »" },
      { vf: "« le chat dort » est bien écrit comme une phrase.", answer: false, why: "Il manque la majuscule au début et le point à la fin : « Le chat dort. »" },
    ],
  },

  // ── Éducation à la science et à la vie sociale (ESVS) ──────────────────────
  {
    subject: "ESVS",
    chapter: "Histoire : ma journée et le temps qui passe",
    questions: [
      { qcm: "Le jour qui vient après aujourd’hui s’appelle…", choices: ["hier", "*demain", "avant-hier"], why: "Hier est passé, aujourd’hui c’est maintenant, demain viendra ensuite." },
      { qcm: "Que fais-tu avant d’aller à l’école ?", choices: ["*Je me lave et je prends le petit-déjeuner.", "Je dîne.", "Je me couche."], why: "Le matin, on se prépare avant de partir à l’école." },
      { vf: "Hier, c’est le jour qui est déjà passé.", answer: true, why: "Hier, c’est le jour d’avant aujourd’hui." },
    ],
  },
  {
    subject: "ESVS",
    chapter: "Histoire : mesurer une durée",
    questions: [
      { qcm: "Qu’est-ce qui dure le plus longtemps ?", choices: ["Un éternuement", "*Une nuit de sommeil", "Ouvrir une porte"], why: "On dort pendant de nombreuses heures : c’est long." },
      { qcm: "Sans montre, on sait qu’il est midi parce que…", choices: ["*le soleil est haut dans le ciel", "il fait nuit", "les étoiles brillent"], why: "À midi, le soleil est au plus haut et les ombres sont courtes." },
      { vf: "Le chant du coq annonce souvent le matin.", answer: true, why: "Le coq chante souvent au lever du jour." },
    ],
  },
  {
    subject: "ESVS",
    chapter: "Géographie : se repérer autour de soi",
    questions: [
      { qcm: "Le soleil se lève…", choices: ["à midi", "*le matin", "le soir"], why: "Le jour commence quand le soleil se lève, le matin." },
      { qcm: "Pour indiquer le chemin, tu peux dire :", choices: ["*Tourne à droite après la boutique.", "Il fait beau.", "J’aime le riz."], why: "On indique un chemin avec des repères et des directions." },
      { vf: "La nuit, on peut voir la lune et les étoiles.", answer: true, why: "Quand le soleil est couché, la lune et les étoiles apparaissent." },
      { qcm: "Un bon repère dans le quartier, c’est…", choices: ["un nuage", "*un bâtiment que tout le monde connaît, comme le marché", "un oiseau qui passe"], why: "Un repère ne bouge pas et tout le monde le connaît." },
    ],
  },
  {
    subject: "ESVS",
    chapter: "Géographie : mon milieu",
    questions: [
      { qcm: "Lequel fait partie de la nature ?", choices: ["une voiture", "*un arbre", "une table"], why: "L’arbre pousse tout seul : il fait partie de la nature." },
      { qcm: "La table est devant le tableau. Le tableau est donc…", choices: ["*derrière la table", "sous la table", "sur la table"], why: "Si la table est devant le tableau, le tableau est derrière la table." },
      { vf: "Les routes, les maisons et l’école ont été construites par les hommes.", answer: true, why: "Ce sont des constructions humaines." },
    ],
  },
  {
    subject: "ESVS",
    chapter: "Sciences : le monde qui m’entoure",
    questions: [
      { qcm: "Lequel est un animal ?", choices: ["le manguier", "*la chèvre", "la pierre"], why: "La chèvre est un être vivant qui se déplace : c’est un animal." },
      { qcm: "Lequel est une plante ?", choices: ["le chat", "le seau", "*le baobab"], why: "Le baobab est un arbre : c’est une plante." },
      { vf: "Une plante a besoin d’eau pour vivre.", answer: true, why: "Sans eau, la plante se dessèche et meurt." },
      { qcm: "Lequel est un objet fabriqué par l’homme ?", choices: ["*un seau", "le sable", "la pluie"], why: "Le seau est fabriqué ; le sable et la pluie sont naturels." },
    ],
  },
  {
    subject: "ESVS",
    chapter: "Sciences : la matière et la croissance",
    questions: [
      { qcm: "L’eau du robinet est…", choices: ["un solide", "*un liquide", "un gaz"], why: "L’eau coule et prend la forme du récipient : c’est un liquide." },
      { qcm: "Une pierre est…", choices: ["*un solide", "un liquide", "un gaz"], why: "La pierre garde sa forme : c’est un solide." },
      { qcm: "L’air que l’on respire est…", choices: ["un solide", "un liquide", "*un gaz"], why: "L’air est invisible et remplit tout l’espace : c’est un gaz." },
      { vf: "Un bébé grandit et devient un enfant.", answer: true, why: "Tous les êtres vivants grandissent." },
    ],
  },
  {
    subject: "ESVS",
    chapter: "Vivre dans son milieu : santé et hygiène",
    questions: [
      { qcm: "Pour se protéger du paludisme, on dort…", choices: ["*sous une moustiquaire", "dehors sans protection", "près d’une eau sale"], why: "La moustiquaire empêche les moustiques de piquer pendant la nuit." },
      { qcm: "Le paludisme est transmis par…", choices: ["le chat", "*la piqûre de certains moustiques", "le soleil"], why: "Certains moustiques transmettent le paludisme en piquant." },
      { qcm: "Avant de manger, on se lave…", choices: ["*les mains avec du savon", "les pieds seulement", "les cheveux"], why: "Les mains propres évitent d’avaler des microbes." },
      { vf: "On peut manger un aliment qui sent mauvais.", answer: false, why: "Non : un aliment abîmé peut rendre malade. On le jette." },
    ],
  },
  {
    subject: "ESVS",
    chapter: "Vivre dans son milieu : protéger l’environnement",
    questions: [
      { qcm: "Après avoir mangé un bonbon, tu mets le papier…", choices: ["par terre", "*dans la poubelle", "dans la rue"], why: "Les déchets vont à la poubelle pour garder le quartier propre." },
      { vf: "Il faut fermer le robinet quand on a fini de se laver les mains.", answer: true, why: "L’eau est précieuse : on ne la gaspille pas." },
      { qcm: "Pour qu’une plante pousse bien, on…", choices: ["*l’arrose", "l’arrache", "la piétine"], why: "La plante a besoin d’eau pour pousser." },
    ],
  },
  {
    subject: "ESVS",
    chapter: "Vivre ensemble : bien se conduire",
    questions: [
      { qcm: "Tu bouscules un camarade sans faire exprès. Tu dis :", choices: ["Bravo !", "*Pardon !", "Au revoir !"], why: "On s’excuse quand on gêne quelqu’un, même sans le vouloir." },
      { vf: "Arriver à l’heure à l’école, c’est respecter les autres.", answer: true, why: "Être à l’heure ne fait pas attendre la classe." },
      { qcm: "Être franc, c’est…", choices: ["*dire la vérité", "cacher ses fautes", "se moquer des autres"], why: "Une personne franche dit la vérité." },
    ],
  },
  {
    subject: "ESVS",
    chapter: "Vivre ensemble : moi et les autres",
    questions: [
      { qcm: "Ton camarade est tombé. Tu…", choices: ["te moques de lui", "*l’aides à se relever", "pars en courant"], why: "On aide celui qui a besoin d’aide : c’est être solidaire." },
      { qcm: "Ma famille, ma classe et mon équipe de football sont des…", choices: ["*groupes auxquels j’appartiens", "jeux", "objets"], why: "Je fais partie de plusieurs groupes." },
      { vf: "Partager son goûter avec un ami qui n’en a pas, c’est être solidaire.", answer: true, why: "La solidarité, c’est s’entraider et partager." },
    ],
  },
];

const built = buildExerciseSeries("CI", CHAPTERS_CI, withExtras(SERIES, EXTRA_CI));

export const QUESTIONS_CI = built.questions;
export const ANSWER_KEYS_CI = built.keys;
/** Chapitre de chaque question (banque utilisée par « Préparer mon prochain devoir »). */
export const QUESTION_CHAPTERS_CI = built.questionChapters;
export const ASSESSMENTS_CI = built.assessments;
