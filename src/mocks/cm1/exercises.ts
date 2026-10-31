import "server-only";

// Exercices corrigés du CM1 : en maths, une série par leçon du cahier de l’école (maths/) ; ailleurs,
// une série par chapitre, écrite par DIANGAL d’après les leçons (à faire
// relire par des enseignants), complétée par les questions illustrées de cm1/enrich.ts.
// Corrigés inclus : ce fichier ne doit jamais atteindre le navigateur.

import { CHAPTERS_CM1 } from "../curriculum-cm1";
import { buildExerciseSeries, type ExerciseSeries } from "../exercise-series";
import { withExtras } from "../illustrated-questions";
import { EXTRA_CM1 } from "./enrich";
import { FIGURES_CM1, LINES_CM1, SOLIDS_CM1, SYMMETRY_CM1 } from "./maths/geometrie";
import { AREAS_CM1, BUDGET_CM1, CAPACITIES_CM1, LENGTHS_CM1, TIMES_CM1, VOLUMES_CM1 } from "./maths/mesure";
import { ADD_SUB_CM1, BIG_CM1, DECIMAL_OPS_CM1, DECIMALS_CM1, DIVISIBILITY_CM1, DIVISION_CM1, FRACTION_CALC_CM1, FRACTIONS_CM1, MULT_CM1 } from "./maths/nombres";
import { CHARTS_CM1, METHOD_CM1, UNDERSTAND_CM1 } from "./maths/problemes";

const SERIES: ExerciseSeries[] = [
  // ── Mathématiques (une série par leçon du cahier de l'école : maths/) ──
  ...BIG_CM1,
  ...DIVISIBILITY_CM1,
  ...ADD_SUB_CM1,
  ...MULT_CM1,
  ...DIVISION_CM1,
  ...DECIMALS_CM1,
  ...DECIMAL_OPS_CM1,
  ...FRACTIONS_CM1,
  ...FRACTION_CALC_CM1,
  ...LINES_CM1,
  ...FIGURES_CM1,
  ...SOLIDS_CM1,
  ...SYMMETRY_CM1,
  ...LENGTHS_CM1,
  ...CAPACITIES_CM1,
  ...AREAS_CM1,
  ...VOLUMES_CM1,
  ...TIMES_CM1,
  ...BUDGET_CM1,
  ...UNDERSTAND_CM1,
  ...CHARTS_CM1,
  ...METHOD_CM1,

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

const built = buildExerciseSeries("CM1", CHAPTERS_CM1, withExtras(SERIES, EXTRA_CM1));

export const QUESTIONS_CM1 = built.questions;
export const ANSWER_KEYS_CM1 = built.keys;
/** Chapitre de chaque question (banque utilisée par « Préparer mon prochain devoir »). */
export const QUESTION_CHAPTERS_CM1 = built.questionChapters;
export const ASSESSMENTS_CM1 = built.assessments;
