// Français du CM1 (étape 3 du CEB, niveau 1). Chapitres INDICATIFS : le guide officiel de l’étape 3
// n’a pas été trouvé ; les notions prolongent celles du CE2 (guide officiel de l’étape 2) et
// préparent celles du CM2 (PROMET, guide du CFEE). Leçons rédigées par DIANGAL, à faire valider.

import { tableau } from "../3e/blocks";
import { bullets, type CiChapterSpec, keyPoint, practice } from "../ci/blocks";

const LECT = "Lecture";
const GRAM = "Grammaire";
const CONJ = "Conjugaison";
const ORTH = "Orthographe";
const VOC = "Vocabulaire";
const PROD = "Production d’écrits";

export const FR_CM1: CiChapterSpec[] = [
  {
    title: "Lire et comprendre des textes variés",
    strand: LECT,
    summary: "Récit, description, texte documentaire, dialogue : trouver l’idée générale et les informations importantes.",
    lessons: [
      {
        title: "Comprendre un texte",
        body: `${bullets([
            "Je lis le titre et je regarde les illustrations pour deviner le sujet.",
            "Je lis le texte en entier, puis je cherche : qui ? quoi ? où ? quand ? pourquoi ?",
            "Je trouve l’idée principale de chaque paragraphe.",
            "Je réponds aux questions par des phrases complètes en m’appuyant sur le texte.",
          ])}
          ${tableau([
            ["Texte", "But"],
            ["récit", "raconter"],
            ["description", "faire voir"],
            ["texte documentaire", "informer, expliquer"],
            ["dialogue", "faire parler des personnages"],
          ])}
          ${keyPoint("Si un mot est difficile, je cherche son sens avec les mots autour ou dans le dictionnaire.")}
          ${practice(["Lis un article sur un animal et note trois informations nouvelles."])}`,
      },
    ],
  },
  {
    title: "Le dialogue",
    strand: LECT,
    summary: "Présenter un dialogue, guillemets, tirets et verbes de parole.",
    lessons: [
      {
        title: "Lire et écrire un dialogue",
        body: `${bullets([
            "Les guillemets « » ouvrent et ferment le dialogue.",
            "Un tiret marque chaque changement de personne qui parle.",
            "Les verbes de parole disent qui parle et comment : demanda, répondit, cria, murmura.",
          ])}
          <p>« Tu viens jouer ? demanda Ousmane.<br>— Pas maintenant, répondit Awa, je fais mes devoirs. »</p>
          ${keyPoint("Dans un dialogue, chaque réplique va à la ligne.")}
          ${practice(["Écris un dialogue de 4 répliques entre un vendeur et un client au marché."])}`,
      },
    ],
  },
  {
    title: "La phrase",
    strand: GRAM,
    summary: "Types de phrases (déclarative, interrogative, exclamative, impérative) ; formes affirmative et négative.",
    lessons: [
      {
        title: "Types et formes de phrases",
        body: `${tableau([
            ["Type", "Ponctuation", "Exemple"],
            ["déclarative", ".", "Le car part à 7 h."],
            ["interrogative", "?", "Quand part le car ?"],
            ["exclamative", "!", "Comme il fait chaud !"],
            ["impérative", ". ou !", "Ferme la porte."],
          ])}
          ${keyPoint("La forme négative encadre le verbe : ne… pas, ne… jamais, ne… plus, ne… rien.")}
          ${practice(["Mets à la forme négative : Il mange toujours du riz.", "Transforme en question : Tu vas au marché."])}`,
      },
    ],
  },
  {
    title: "La nature des mots",
    strand: GRAM,
    summary: "Nom, déterminant, adjectif, pronom, verbe, adverbe et préposition.",
    lessons: [
      {
        title: "Reconnaître la nature des mots",
        body: `${tableau([
            ["Nature", "Exemples"],
            ["nom", "Dakar, école, mangue"],
            ["déterminant", "le, une, mon, ce, trois"],
            ["adjectif qualificatif", "grand, rouge, gentil"],
            ["pronom", "il, nous, la, leur"],
            ["verbe", "manger, être, courir"],
            ["adverbe (invariable)", "vite, bien, très, hier"],
            ["préposition (invariable)", "à, de, dans, sur, avec, pour"],
          ])}
          ${keyPoint("La nature d’un mot ne change pas ; sa fonction dépend de sa place dans la phrase.")}
          ${practice(["Donne la nature de chaque mot : Le petit chat dort sous la table."])}`,
      },
    ],
  },
  {
    title: "Les fonctions dans la phrase",
    strand: GRAM,
    summary: "Sujet, complément d’objet direct et indirect, attribut, compléments circonstanciels.",
    lessons: [
      {
        title: "Sujet, COD, COI et attribut",
        body: `${tableau([
            ["Fonction", "Question", "Exemple"],
            ["sujet", "qui est-ce qui ?", "<strong>Les pêcheurs</strong> rentrent."],
            ["COD", "verbe + quoi ? qui ?", "Ils vendent <strong>du poisson</strong>."],
            ["COI", "verbe + à qui ? de quoi ?", "Ils parlent <strong>aux clients</strong>."],
            ["attribut du sujet", "après être, devenir, sembler", "La mer est <strong>calme</strong>."],
          ])}
          ${keyPoint("Les compléments circonstanciels disent où, quand, comment, pourquoi ; on peut souvent les déplacer.")}
          ${practice(["Trouve le sujet et le COD : Le maître explique la leçon."])}`,
      },
    ],
  },
  {
    title: "Les propositions",
    strand: GRAM,
    summary: "Proposition indépendante, propositions juxtaposées et coordonnées.",
    lessons: [
      {
        title: "Indépendantes, juxtaposées et coordonnées",
        body: `${bullets([
            "Une proposition se construit autour d’un verbe conjugué.",
            "Propositions <strong>juxtaposées</strong> : séparées par une virgule ou un point-virgule (Il pleut, nous restons à la maison.).",
            "Propositions <strong>coordonnées</strong> : reliées par mais, ou, et, donc, or, ni, car.",
          ])}
          ${keyPoint("Pour compter les propositions, je compte les verbes conjugués.")}
          ${practice(["Relie avec une conjonction : Il est fatigué. Il continue de travailler."])}`,
      },
    ],
  },
  {
    title: "Le présent de l’indicatif",
    strand: CONJ,
    summary: "Le présent des verbes des trois groupes et des verbes irréguliers fréquents.",
    lessons: [
      {
        title: "Le présent des trois groupes",
        body: `${tableau([
            ["", "1er groupe (parler)", "2e groupe (grandir)", "3e groupe (faire)"],
            ["je", "parle", "grandis", "fais"],
            ["nous", "parlons", "grandissons", "faisons"],
            ["ils", "parlent", "grandissent", "font"],
          ])}
          ${keyPoint("Verbes fréquents du 3e groupe : aller (je vais), venir (je viens), prendre (je prends), dire (vous dites), pouvoir (je peux), vouloir (je veux).")}
          ${practice(["Conjugue « finir » et « aller » au présent."])}`,
      },
    ],
  },
  {
    title: "Les temps du passé",
    strand: CONJ,
    summary: "Imparfait, passé simple (3e personnes), passé composé et plus-que-parfait.",
    lessons: [
      {
        title: "Imparfait et passé simple",
        body: `${bullets([
            "<strong>Imparfait</strong> (terminaisons -ais, -ais, -ait, -ions, -iez, -aient) : décor, habitudes, actions longues.",
            "<strong>Passé simple</strong> (surtout à la 3e personne : il chanta, ils chantèrent ; il finit, ils finirent) : actions brèves dans un récit.",
          ])}
          <p>Il <strong>faisait</strong> nuit quand le lion <strong>sortit</strong> de la brousse.</p>
          ${keyPoint("Dans les contes, on trouve souvent ces deux temps ensemble.")}
          ${practice(["Mets au passé simple : Le chasseur (lancer) sa lance."])}`,
      },
      {
        title: "Passé composé et plus-que-parfait",
        body: `${tableau([
            ["Temps", "Formation", "Exemple"],
            ["passé composé", "avoir ou être au présent + participe passé", "j’ai mangé, je suis parti"],
            ["plus-que-parfait", "avoir ou être à l’imparfait + participe passé", "j’avais mangé, j’étais parti"],
          ])}
          ${keyPoint("Le plus-que-parfait indique une action passée qui a eu lieu avant une autre action passée.")}
          ${practice(["Conjugue « finir » au passé composé et au plus-que-parfait."])}`,
      },
    ],
  },
  {
    title: "Le futur et le conditionnel",
    strand: CONJ,
    summary: "Le futur simple et le conditionnel présent.",
    lessons: [
      {
        title: "Futur simple et conditionnel présent",
        body: `${tableau([
            ["", "Futur", "Conditionnel"],
            ["je", "je parlerai", "je parlerais"],
            ["nous", "nous parlerons", "nous parlerions"],
            ["ils", "ils parleront", "ils parleraient"],
          ])}
          ${keyPoint("Le conditionnel exprime un souhait, une politesse ou une condition : Si j’étais grand, je serais pilote.")}
          ${practice(["Complète : Demain, nous (aller) au champ. Si j’avais le temps, je (venir)."])}`,
      },
    ],
  },
  {
    title: "Les accords",
    strand: ORTH,
    summary: "Accords dans le groupe nominal ; accord du verbe avec son sujet ; participe passé avec être.",
    lessons: [
      {
        title: "Accorder le groupe nominal et le verbe",
        body: `${bullets([
            "Dans le groupe nominal, le déterminant et l’adjectif s’accordent avec le nom : de belles fleurs rouges.",
            "Le verbe s’accorde avec son sujet, même s’il est loin : Les enfants de mon voisin jouent.",
            "Avec être, le participe passé s’accorde avec le sujet : Les filles sont parties.",
          ])}
          ${keyPoint("Pour trouver le sujet, je pose la question « qui est-ce qui ? » devant le verbe.")}
          ${practice(["Accorde : Les (vieux) maisons (être) (repeint)."])}`,
      },
    ],
  },
  {
    title: "Les homophones grammaticaux",
    strand: ORTH,
    summary: "a/à, et/est, son/sont, on/ont, ce/se, ces/ses, ou/où.",
    lessons: [
      {
        title: "Ne pas confondre les homophones",
        body: `${tableau([
            ["Homophones", "Astuce"],
            ["on / ont", "ont = avaient ; on = il"],
            ["ce / se", "se est devant un verbe pronominal (il se lave) ; ce devant un nom (ce livre)"],
            ["ces / ses", "ses = les siens ; ces = ceux-là"],
            ["a / à ; et / est ; son / sont ; ou / où", "je remplace par avait, était, étaient, ou bien"],
          ])}
          ${keyPoint("Je remplace le mot par un autre pour choisir la bonne orthographe.")}
          ${practice(["Complète : Les élèves … fini. … dit qu’il va pleuvoir. Il … lave les mains."])}`,
      },
    ],
  },
  {
    title: "Le vocabulaire et le dictionnaire",
    strand: VOC,
    summary: "Sens d’un mot, synonymes, contraires, familles de mots, préfixes et suffixes.",
    lessons: [
      {
        title: "Enrichir son vocabulaire",
        body: `${bullets([
            "<strong>Synonymes</strong> : mots de sens proche (peur, crainte, frayeur).",
            "<strong>Contraires</strong> : mots de sens opposé (heureux / malheureux).",
            "<strong>Famille de mots</strong> : même radical (dent, dentiste, dentifrice).",
            "<strong>Préfixes</strong> (re-, dé-, in-) et <strong>suffixes</strong> (-eur, -age, -able) forment de nouveaux mots.",
          ])}
          ${keyPoint("Le dictionnaire indique la nature du mot, ses sens et des exemples.")}
          ${practice(["Trouve le contraire de : possible, monter, fidèle.", "Trouve trois mots de la famille de « laver »."])}`,
      },
    ],
  },
  {
    title: "Rédiger",
    strand: PROD,
    summary: "Écrire un récit, une description, une lettre et un compte rendu de lecture.",
    lessons: [
      {
        title: "Écrire un texte bien organisé",
        body: `${bullets([
            "Je lis la consigne et je cherche des idées au brouillon.",
            "Je fais un plan : introduction, développement, conclusion.",
            "J’écris des phrases courtes et claires, reliées par des mots de liaison (d’abord, ensuite, puis, enfin, mais, car).",
            "Je relis pour corriger l’orthographe, les accords et la ponctuation.",
          ])}
          ${keyPoint("Un compte rendu de lecture présente le titre, l’auteur, les personnages, un court résumé et mon avis.")}
          ${practice(["Raconte une journée au marché en trois paragraphes.", "Fais le compte rendu du dernier livre que tu as lu."])}`,
      },
    ],
  },
];
