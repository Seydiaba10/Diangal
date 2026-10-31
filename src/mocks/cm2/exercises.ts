import "server-only";

// Exercices corrigés du CM2 : en maths, une série par leçon du cahier de l’école (maths/) ; ailleurs,
// une série par chapitre, écrite par DIANGAL d’après les leçons (à faire
// relire par des enseignants), complétée par les questions illustrées de cm2/enrich.ts.
// Corrigés inclus : ce fichier ne doit jamais atteindre le navigateur.

import { CHAPTERS_CM2 } from "../curriculum-cm2";
import { buildExerciseSeries, type ExerciseSeries } from "../exercise-series";
import { withExtras } from "../illustrated-questions";
import { EXTRA_CM2 } from "./enrich";
import { CIRCLES_CM2, QUADS_CM2, SOLIDS_CM2, SYMMETRY_CM2 } from "./maths/geometrie";
import { AREAS_CM2, CAPACITIES_CM2, DURATIONS_CM2, INTERESTS_CM2, LENGTHS_CM2, PRICES_CM2, SHARES_CM2, VOLUMES_CM2 } from "./maths/mesure";
import { BIG_CM2, DECIMAL_OPS_CM2, DECIMALS_CM2, DIVISIBILITY_CM2, FRACTION_OPS_CM2, FRACTIONS_CM2, OPS_CM2, PERCENT_CM2 } from "./maths/nombres";
import { CHARTS_CM2, METHOD_CM2, UNDERSTAND_CM2 } from "./maths/problemes";

const SERIES: ExerciseSeries[] = [
  // ── Mathématiques (une série par leçon du cahier de l'école : maths/) ──
  ...BIG_CM2,
  ...DIVISIBILITY_CM2,
  ...OPS_CM2,
  ...DECIMALS_CM2,
  ...DECIMAL_OPS_CM2,
  ...FRACTIONS_CM2,
  ...FRACTION_OPS_CM2,
  ...PERCENT_CM2,
  ...QUADS_CM2,
  ...CIRCLES_CM2,
  ...SOLIDS_CM2,
  ...SYMMETRY_CM2,
  ...LENGTHS_CM2,
  ...CAPACITIES_CM2,
  ...AREAS_CM2,
  ...VOLUMES_CM2,
  ...DURATIONS_CM2,
  ...PRICES_CM2,
  ...INTERESTS_CM2,
  ...SHARES_CM2,
  ...UNDERSTAND_CM2,
  ...CHARTS_CM2,
  ...METHOD_CM2,

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

const built = buildExerciseSeries("CM2", CHAPTERS_CM2, withExtras(SERIES, EXTRA_CM2));

export const QUESTIONS_CM2 = built.questions;
export const ANSWER_KEYS_CM2 = built.keys;
/** Chapitre de chaque question (banque utilisée par « Préparer mon prochain devoir »). */
export const QUESTION_CHAPTERS_CM2 = built.questionChapters;
export const ASSESSMENTS_CM2 = built.assessments;
