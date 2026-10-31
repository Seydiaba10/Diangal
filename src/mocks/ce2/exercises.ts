import "server-only";

// Exercices corrigés du CE2 : en maths, une série par leçon du cahier de l’école (maths/) ; ailleurs,
// une série par chapitre, écrite par DIANGAL d’après les leçons (à faire
// relire par des enseignants), complétée par les questions illustrées de ce2/enrich.ts.
// Corrigés inclus : ce fichier ne doit jamais atteindre le navigateur.

import { CHAPTERS_CE2 } from "../curriculum-ce2";
import { buildExerciseSeries, type ExerciseSeries } from "../exercise-series";
import { withExtras } from "../illustrated-questions";
import { EXTRA_CE2 } from "./enrich";
import { CIRCLE_CE2, LINES_CE2, NETS_CE2, SHAPES_CE2 } from "./maths/geometrie";
import { AREAS_CE2, LENGTHS_CE2, MASSES_CE2, NET_CE2, PERIMETERS_CE2, PRICES_CE2 } from "./maths/mesure";
import { ADD_SUB_CE2, BIG_NUMBERS_CE2, DECIMALS_CE2, DIV_CE2, DOUBLE_CE2, MULT_CE2, REVISIONS_CE2 } from "./maths/nombres";
import { DATA_CE2, METHOD_CE2 } from "./maths/problemes";

const SERIES: ExerciseSeries[] = [
  // ── Mathématiques (une série par leçon du cahier de l'école : maths/) ──
  ...REVISIONS_CE2,
  ...BIG_NUMBERS_CE2,
  ...ADD_SUB_CE2,
  ...MULT_CE2,
  ...DIV_CE2,
  ...DOUBLE_CE2,
  ...DECIMALS_CE2,
  ...LINES_CE2,
  ...SHAPES_CE2,
  ...CIRCLE_CE2,
  ...NETS_CE2,
  ...LENGTHS_CE2,
  ...MASSES_CE2,
  ...NET_CE2,
  ...PRICES_CE2,
  ...PERIMETERS_CE2,
  ...AREAS_CE2,
  ...DATA_CE2,
  ...METHOD_CE2,

  // ── Français ───────────────────────────────────────────────────────────────
  { subject: "FR", chapter: "Prendre la parole", questions: [
    { qcm: "Quand je parle devant la classe, je…", choices: ["parle très vite et bas", "*parle fort et regarde mon public", "tourne le dos"], why: "Pour être compris." },
    { vf: "Une question se dit avec une voix qui monte.", answer: true, why: "C’est le schéma intonatif de la question." },
    { qcm: "Avant de parler, je…", choices: ["*prépare et organise mes idées", "invente au hasard", "ne réfléchis pas"], why: "Début, milieu, fin." },
  ] },
  { subject: "FR", chapter: "Récits, descriptions et consignes", questions: [
    { qcm: "Un texte qui fait voir un lieu est…", choices: ["narratif", "*descriptif", "injonctif"], why: "Il décrit." },
    { qcm: "Un texte qui donne des étapes à suivre est…", choices: ["narratif", "descriptif", "*injonctif"], why: "Il fait agir." },
    { qcm: "Un conte est un texte…", choices: ["*narratif", "injonctif", "poétique"], why: "Il raconte une histoire." },
  ] },
  { subject: "FR", chapter: "La lettre", questions: [
    { qcm: "« Cher grand-père, » est…", choices: ["la signature", "*la formule d’appel", "la date"], why: "Elle s’adresse au destinataire." },
    { qcm: "Celui qui reçoit la lettre est…", choices: ["l’expéditeur", "*le destinataire", "le facteur"], why: "L’expéditeur l’écrit." },
    { vf: "Une lettre porte le lieu et la date.", answer: true, why: "En haut, souvent à droite." },
  ] },
  { subject: "FR", chapter: "L’affiche", questions: [
    { qcm: "Sur une affiche, le titre est écrit…", choices: ["*en gros", "en tout petit", "à la fin"], why: "Pour être vu de loin." },
    { qcm: "« Grand match samedi » est une phrase…", choices: ["*nominale", "interrogative", "au futur"], why: "Elle n’a pas de verbe." },
    { vf: "Une affiche répond aux questions quoi, où, quand.", answer: true, why: "Elle donne l’essentiel." },
  ] },
  { subject: "FR", chapter: "Le texte poétique", questions: [
    { qcm: "Les lignes d’un poème s’appellent…", choices: ["des paragraphes", "*des vers", "des chapitres"], why: "Un poème est écrit en vers." },
    { qcm: "« Maison » rime avec…", choices: ["*saison", "table", "soleil"], why: "Même son final : -son." },
    { qcm: "Un groupe de vers s’appelle…", choices: ["*une strophe", "une phrase", "une rime"], why: "Les vers sont regroupés en strophes." },
  ] },
  { subject: "FR", chapter: "Les compléments d’objet", questions: [
    { qcm: "Dans « Le berger garde les moutons », « les moutons » est…", choices: ["*COD", "COI", "sujet"], why: "Il garde quoi ? les moutons." },
    { qcm: "Dans « Je pense à mes vacances », « à mes vacances » est…", choices: ["COD", "*COI", "sujet"], why: "Je pense à quoi ?" },
    { vf: "Le COI est relié au verbe par un petit mot comme « à » ou « de ».", answer: true, why: "C’est pour cela qu’il est indirect." },
  ] },
  { subject: "FR", chapter: "Le pronom personnel", questions: [
    { qcm: "« Fatou et Awa jouent » devient…", choices: ["Il joue.", "*Elles jouent.", "Ils jouent."], why: "Deux filles : elles." },
    { qcm: "« Moussa mange la mangue » devient « Il … mange. »", choices: ["le", "*la", "les"], why: "La mangue → la." },
    { vf: "Le pronom évite de répéter un nom.", answer: true, why: "C’est son rôle." },
  ] },
  { subject: "FR", chapter: "La phrase nominale et les articles", questions: [
    { qcm: "Lequel est un article défini ?", choices: ["un", "des", "*les"], why: "Le, la, l’, les sont définis." },
    { qcm: "Laquelle est une phrase nominale ?", choices: ["Le match commence.", "*Début du match à 16 h.", "Venez au match."], why: "Elle n’a pas de verbe." },
    { qcm: "Lequel est un article indéfini ?", choices: ["*une", "la", "l’"], why: "Un, une, des sont indéfinis." },
  ] },
  { subject: "FR", chapter: "Les compléments circonstanciels", questions: [
    { qcm: "Dans « Nous jouons dans la cour », « dans la cour » indique…", choices: ["*le lieu", "le temps", "la manière"], why: "Où ? dans la cour." },
    { qcm: "Dans « Le matin, je vais à l’école », « Le matin » indique…", choices: ["le lieu", "*le temps", "la cause"], why: "Quand ? le matin." },
    { vf: "On peut souvent déplacer un complément circonstanciel.", answer: true, why: "Le matin, je vais à l’école / Je vais à l’école le matin." },
  ] },
  { subject: "FR", chapter: "Adjectifs possessifs et démonstratifs", questions: [
    { qcm: "… arbre est grand.", choices: ["Ce", "*Cet", "Cette"], why: "Devant une voyelle : cet." },
    { qcm: "Leur maison, c’est la maison…", choices: ["à moi", "*à eux", "à toi"], why: "Leur = à eux, à elles." },
    { qcm: "Lequel est un adjectif possessif ?", choices: ["ces", "*mes", "cette"], why: "Mes = à moi." },
  ] },
  { subject: "FR", chapter: "L’imparfait", questions: [
    { qcm: "Nous (habiter) à Louga →", choices: ["habitons", "*habitions", "habiterons"], why: "Imparfait : -ions." },
    { qcm: "Il (jouer) →", choices: ["jouais", "*jouait", "jouaient"], why: "3e personne du singulier : -ait." },
    { vf: "L’imparfait est un temps du passé.", answer: true, why: "Il décrit des actions qui duraient." },
  ] },
  { subject: "FR", chapter: "Le passé composé", questions: [
    { qcm: "J’(faire) mes devoirs →", choices: ["j’ai faire", "*j’ai fait", "je fais"], why: "Participe passé : fait." },
    { qcm: "Elle (aller) au marché →", choices: ["elle a allé", "*elle est allée", "elle allait"], why: "Aller se conjugue avec être et s’accorde." },
    { qcm: "Le participe passé de « voir » est…", choices: ["voiré", "*vu", "voit"], why: "J’ai vu." },
  ] },
  { subject: "FR", chapter: "L’impératif et le futur simple", questions: [
    { qcm: "Futur : j’(aller) →", choices: ["allerai", "*irai", "vais"], why: "Aller : j’irai." },
    { qcm: "Futur : nous (être) →", choices: ["*serons", "étions", "sommes"], why: "Être : nous serons." },
    { qcm: "Impératif de « faire » (2e personne du pluriel) :", choices: ["faisez", "*faites", "fasez"], why: "Faites." },
  ] },
  { subject: "FR", chapter: "Le féminin et le pluriel des noms", questions: [
    { qcm: "Le féminin de « vendeur » est…", choices: ["vendeure", "*vendeuse", "vendrice"], why: "-eur → -euse." },
    { qcm: "Le pluriel de « journal » est…", choices: ["journals", "*journaux", "journales"], why: "-al → -aux." },
    { qcm: "Le pluriel de « un cadeau » est…", choices: ["des cadeaus", "*des cadeaux", "des cadeau"], why: "-eau prend un x." },
  ] },
  { subject: "FR", chapter: "Les homophones", questions: [
    { qcm: "Les élèves … sages.", choices: ["son", "*sont"], why: "On peut dire « étaient »." },
    { qcm: "Awa range … livre.", choices: ["*son", "sont"], why: "On peut dire « mon livre »." },
    { qcm: "… vas-tu ?", choices: ["Ou", "*Où"], why: "Il indique le lieu." },
  ] },
  { subject: "FR", chapter: "Le dictionnaire et les mots", questions: [
    { qcm: "Un synonyme de « rapide » est…", choices: ["lent", "*vite", "grand"], why: "Sens proche." },
    { qcm: "Lequel est de la famille de « jardin » ?", choices: ["*jardinier", "jardin d’enfants", "jarre"], why: "Même radical : jardin-." },
    { qcm: "« Avoir une faim de loup » veut dire…", choices: ["être un loup", "*avoir très faim", "ne pas avoir faim"], why: "C’est une expression imagée." },
  ] },
  { subject: "FR", chapter: "Écrire une lettre, une affiche et un poème", questions: [
    { qcm: "La première étape de l’écriture est…", choices: ["recopier", "*lire la consigne et réfléchir", "signer"], why: "Il faut savoir ce qu’on doit écrire." },
    { vf: "Le premier jet est le texte définitif.", answer: false, why: "On le relit et on le réécrit." },
    { qcm: "Pour vérifier mon texte, j’utilise…", choices: ["*la fiche de critères", "un ballon", "le calendrier"], why: "Elle liste ce qu’il faut respecter." },
  ] },
  // ── ESVS ───────────────────────────────────────────────────────────────────
  { subject: "ESVS", chapter: "L’idée de progrès", questions: [
    { qcm: "Avant l’agriculture, les hommes se nourrissaient…", choices: ["*de chasse, de pêche et de cueillette", "au supermarché", "de riz importé"], why: "C’était leur mode de vie." },
    { vf: "La découverte du feu a été un grand progrès.", answer: true, why: "Pour cuire, se chauffer, se protéger." },
    { qcm: "Aujourd’hui, on s’éclaire surtout avec…", choices: ["des torches de paille", "*l’électricité", "le feu de bois"], why: "Grâce au progrès technique." },
  ] },
  { subject: "ESVS", chapter: "Faits et personnages de l’histoire locale", questions: [
    { qcm: "Lat Dior était le roi (damel) du…", choices: ["Walo", "*Cayor", "Saloum"], why: "Il a résisté à la colonisation." },
    { qcm: "Ndatté Yalla était reine du…", choices: ["*Walo", "Sine", "Gabou"], why: "Elle a régné au XIXe siècle." },
    { vf: "Une épidémie ou une famine peut être un fait marquant de l’histoire locale.", answer: true, why: "Les anciens s’en souviennent." },
  ] },
  { subject: "ESVS", chapter: "Les royaumes du Sénégal d’autrefois", questions: [
    { qcm: "Un empire est…", choices: ["plus petit qu’un royaume", "*un grand ensemble qui domine plusieurs royaumes", "un village"], why: "C’est sa définition." },
    { qcm: "Lequel est un ancien royaume du Sénégal ?", choices: ["*le Baol", "le Mali actuel", "Dakar"], why: "Le Baol était un royaume wolof." },
    { vf: "Chaque royaume avait son roi et sa capitale.", answer: true, why: "Et son organisation." },
  ] },
  { subject: "ESVS", chapter: "Le Djolof, le Gabou et les royaumes successeurs", questions: [
    { qcm: "Le roi du Djolof portait le titre de…", choices: ["*Bourba", "Damel", "Mansa"], why: "Bourba Djolof." },
    { qcm: "Le Gabou était un royaume…", choices: ["wolof", "*mandingue", "sérère"], why: "Dirigé par un mansa." },
    { qcm: "Le roi du Sine portait le titre de…", choices: ["Teigne", "*Bour", "Brak"], why: "Bour Sine." },
  ] },
  { subject: "ESVS", chapter: "S’orienter et lire une carte", questions: [
    { qcm: "Sur une carte, le nord est généralement…", choices: ["*en haut", "en bas", "à gauche"], why: "C’est la convention." },
    { qcm: "La légende d’une carte sert à…", choices: ["*expliquer les signes et les couleurs", "raconter une histoire", "donner la date"], why: "Chaque signe a un sens." },
    { qcm: "Sur une carte, l’eau est souvent en…", choices: ["rouge", "*bleu", "noir"], why: "Fleuves, lacs et mer en bleu." },
  ] },
  { subject: "ESVS", chapter: "Ma région : relief, eau, climat et végétation", questions: [
    { qcm: "La mangrove pousse…", choices: ["dans le désert", "*au bord de l’eau salée, dans les estuaires", "en montagne"], why: "Saloum, Casamance." },
    { vf: "Il pleut davantage au sud du Sénégal qu’au nord.", answer: true, why: "La Casamance est la plus arrosée." },
    { qcm: "Au nord du Sénégal, la végétation est surtout…", choices: ["*la steppe", "la forêt dense", "la mangrove"], why: "Il y pleut peu." },
  ] },
  { subject: "ESVS", chapter: "Les activités et la vie des hommes", questions: [
    { qcm: "Le déplacement des éleveurs avec leurs troupeaux s’appelle…", choices: ["l’exode rural", "*la transhumance", "le tourisme"], why: "À la recherche de pâturages." },
    { qcm: "L’arachide est une culture…", choices: ["vivrière", "*industrielle (de rente)", "d’élevage"], why: "Elle est vendue et transformée en huile." },
    { qcm: "Le départ des jeunes des villages vers la ville s’appelle…", choices: ["*l’exode rural", "la transhumance", "la pêche"], why: "C’est un mouvement de population." },
  ] },
  { subject: "ESVS", chapter: "Le corps humain", questions: [
    { num: "Combien avons-nous de sens ?", answer: 5, why: "Vue, ouïe, odorat, goût, toucher." },
    { qcm: "L’organe de l’ouïe est…", choices: ["les yeux", "*les oreilles", "le nez"], why: "On entend avec les oreilles." },
    { qcm: "Ce qui soutient le corps est…", choices: ["*le squelette", "la peau", "les cheveux"], why: "Les os forment le squelette." },
  ] },
  { subject: "ESVS", chapter: "Les animaux", questions: [
    { qcm: "Un animal qui naît d’un œuf est…", choices: ["vivipare", "*ovipare", "herbivore"], why: "La poule pond des œufs." },
    { qcm: "Le serpent se déplace par…", choices: ["le vol", "*la reptation", "la nage"], why: "Il rampe." },
    { qcm: "La vache est…", choices: ["*vivipare", "ovipare", "carnivore"], why: "Le veau naît vivant." },
  ] },
  { subject: "ESVS", chapter: "Les plantes", questions: [
    { qcm: "La plante puise l’eau par…", choices: ["les feuilles", "*les racines", "les fleurs"], why: "Les racines sont dans le sol." },
    { qcm: "Quand une graine commence à pousser, on dit qu’elle…", choices: ["*germe", "fleurit", "fane"], why: "C’est la germination." },
    { vf: "Les plantes nous donnent de l’ombre et des fruits.", answer: true, why: "Et du bois, des médicaments." },
  ] },
  { subject: "ESVS", chapter: "Utiliser et fabriquer des objets technologiques", questions: [
    { qcm: "Dans un circuit fermé, l’ampoule…", choices: ["*s’allume", "s’éteint", "explose"], why: "Le courant passe." },
    { vf: "On peut jouer avec les prises électriques de la maison.", answer: false, why: "C’est dangereux." },
    { qcm: "Une lampe de poche fonctionne avec…", choices: ["*des piles", "de l’eau", "du sable"], why: "Les piles fournissent le courant." },
  ] },
  { subject: "ESVS", chapter: "Se protéger contre le paludisme", questions: [
    { qcm: "Le paludisme est transmis par…", choices: ["la mouche", "*le moustique anophèle", "le chien"], why: "Par sa piqûre." },
    { qcm: "Pour se protéger, on dort…", choices: ["*sous une moustiquaire imprégnée", "dehors", "près d’une mare"], why: "Elle empêche les piqûres." },
    { vf: "Les moustiques se multiplient dans les eaux stagnantes.", answer: true, why: "Il faut supprimer ces eaux." },
  ] },
  { subject: "ESVS", chapter: "Se protéger contre le sida", questions: [
    { vf: "Le VIH se transmet en jouant ensemble.", answer: false, why: "On ne l’attrape pas en jouant ou en mangeant ensemble." },
    { qcm: "Pour me protéger, je n’utilise pas…", choices: ["mon cahier", "*une lame déjà utilisée par quelqu’un", "mon stylo"], why: "Le virus peut passer par le sang." },
    { qcm: "Si une personne plus âgée me fait des avances, je…", choices: ["garde le secret", "*en parle à un adulte de confiance", "accepte"], why: "Un adulte de confiance peut me protéger." },
  ] },
  { subject: "ESVS", chapter: "Environnement et population", questions: [
    { qcm: "Contre l’érosion, on peut construire…", choices: ["*des diguettes", "des routes", "des puits"], why: "Elles retiennent la terre." },
    { qcm: "Contre les feux de brousse, on fait…", choices: ["*des pare-feu", "des feux plus grands", "rien"], why: "Bandes sans herbe qui arrêtent le feu." },
    { vf: "Aller à l’école aide à résoudre les problèmes de population.", answer: true, why: "L’éducation aide à faire de bons choix." },
  ] },
  { subject: "ESVS", chapter: "Droits et devoirs", questions: [
    { qcm: "Lequel est un droit de l’enfant ?", choices: ["*aller à l’école", "travailler dans les champs toute la journée", "être battu"], why: "L’éducation est un droit." },
    { qcm: "Lequel est un devoir ?", choices: ["casser les tables", "*respecter le bien public", "insulter"], why: "L’école et la rue sont à tous." },
    { vf: "J’ai des droits mais aussi des devoirs.", answer: true, why: "Les deux vont ensemble." },
  ] },
  { subject: "ESVS", chapter: "La paix et les valeurs", questions: [
    { qcm: "La « teranga » signifie…", choices: ["*l’hospitalité", "la colère", "la richesse"], why: "C’est une valeur sénégalaise." },
    { qcm: "En cas de dispute, il vaut mieux…", choices: ["se battre", "*discuter calmement ou demander un médiateur", "insulter"], why: "C’est ainsi qu’on vit en paix." },
    { vf: "La parenté à plaisanterie aide à apaiser les tensions.", answer: true, why: "Elle rapproche les familles et les ethnies." },
  ] },
];

const built = buildExerciseSeries("CE2", CHAPTERS_CE2, withExtras(SERIES, EXTRA_CE2));

export const QUESTIONS_CE2 = built.questions;
export const ANSWER_KEYS_CE2 = built.keys;
/** Chapitre de chaque question (banque utilisée par « Préparer mon prochain devoir »). */
export const QUESTION_CHAPTERS_CE2 = built.questionChapters;
export const ASSESSMENTS_CE2 = built.assessments;
