// Français du CE1 (étape 2 du CEB, niveau 1) : guide pédagogique officiel « Langue et communication,
// deuxième étape » (MEN), paliers du CE1 : communication orale (relater, décrire, converser) et
// communication écrite autour du texte narratif, du texte descriptif et du texte injonctif, avec leur
// vocabulaire, grammaire, conjugaison et orthographe. Leçons rédigées par DIANGAL, à faire valider.

import { tableau } from "../3e/blocks";
import { bullets, type CiChapterSpec, keyPoint, practice } from "../ci/blocks";

const ORAL = "Communication orale";
const LECT = "Lecture";
const GRAM = "Grammaire";
const CONJ = "Conjugaison";
const ORTH = "Orthographe";
const VOC = "Vocabulaire";
const PROD = "Production d’écrits";

export const FR_CE1: CiChapterSpec[] = [
  {
    title: "Raconter, décrire et converser",
    strand: ORAL,
    summary: "Relater un fait ou un conte, interpréter une image, participer à une conversation, téléphoner.",
    lessons: [
      {
        title: "Raconter et décrire à l’oral",
        body: `<p>Pour <strong>raconter</strong> un fait ou un conte, je dis ce qui s’est passé dans l’ordre : au début, ensuite, à la fin.</p>
          ${bullets(["Je parle fort et clairement, en regardant ceux qui m’écoutent.", "J’utilise des mots pour le temps : d’abord, puis, ensuite, enfin.", "Pour décrire une image, je dis ce que je vois : au premier plan, à droite, à gauche, au fond."])}
          ${keyPoint("Avant de parler, je réfléchis à ce que je veux dire.")}
          ${practice(["Raconte à un adulte ce que tu as fait hier.", "Décris la cour de ton école."])}`,
      },
      {
        title: "Participer à une conversation et téléphoner",
        body: `${bullets([
            "J’écoute l’autre jusqu’au bout et je ne lui coupe pas la parole.",
            "Au téléphone, je salue, je me présente, je demande ou je donne l’information, puis je dis au revoir.",
          ])}
          <p>« Allô, bonjour Madame. C’est Awa, l’amie de Fatou. Est-ce que je peux lui parler, s’il vous plaît ? »</p>
          ${keyPoint("Les formules de politesse : bonjour, s’il vous plaît, merci, au revoir.")}
          ${practice(["Joue avec un adulte : téléphone pour demander l’heure du match."])}`,
      },
    ],
  },
  {
    title: "Le texte narratif",
    strand: LECT,
    summary: "Dégager l’idée générale d’un récit, reconnaître ses étapes et ses mots du temps, lire à haute voix.",
    lessons: [
      {
        title: "Lire et comprendre un récit",
        body: `<p>Un <strong>texte narratif</strong> raconte une histoire : un conte, un fait divers, un souvenir.</p>
          ${tableau([
            ["Étape", "Ce qu’on y trouve"],
            ["le début (situation initiale)", "les personnages, le lieu, le moment"],
            ["le problème (élément perturbateur)", "quelque chose change"],
            ["les actions", "ce que font les personnages"],
            ["la fin (situation finale)", "comment l’histoire se termine"],
          ])}
          ${keyPoint("Les mots du temps aident à suivre l’histoire : un jour, puis, ensuite, enfin, hier, autrefois.")}
          ${practice(["Lis un conte et dis en une phrase de quoi il parle (l’idée générale).", "Lis-le à haute voix en respectant les points et les virgules."])}`,
      },
    ],
  },
  {
    title: "Le texte descriptif",
    strand: LECT,
    summary: "Repérer ce que décrit un texte, les mots de lieu, les présentatifs et les comparaisons.",
    lessons: [
      {
        title: "Lire et comprendre une description",
        body: `<p>Un <strong>texte descriptif</strong> fait voir une personne, un animal, un objet ou un lieu.</p>
          ${bullets([
            "Il utilise des <strong>adjectifs</strong> : couleur, forme, taille (un grand baobab, une case ronde).",
            "Il utilise des <strong>mots de lieu</strong> : devant, derrière, à côté de, au milieu, à droite, au premier plan.",
            "Il utilise des <strong>présentatifs</strong> : c’est, voici, il y a.",
            "Il fait des <strong>comparaisons</strong> : plus grand que, aussi rapide que, blanc comme le lait.",
          ])}
          ${keyPoint("Le verbe « être » est souvent employé dans une description : La case est ronde.")}
          ${practice(["Décris ta maison en trois phrases avec des mots de lieu.", "Trouve trois adjectifs pour décrire un mouton."])}`,
      },
    ],
  },
  {
    title: "Le texte injonctif",
    strand: LECT,
    summary: "Comprendre à quoi sert un texte qui fait agir : recette, règle du jeu, consignes.",
    lessons: [
      {
        title: "Lire une recette ou une règle",
        body: `<p>Un <strong>texte injonctif</strong> dit ce qu’il faut faire : une recette, une règle de jeu, une notice, une consigne.</p>
          ${bullets([
            "Il a un titre et souvent une liste du matériel ou des ingrédients.",
            "Les étapes sont dans l’ordre, souvent numérotées.",
            "Les phrases sont courtes, à l’impératif (Lave le riz.) ou à l’infinitif (Laver le riz.).",
          ])}
          ${keyPoint("Pour réussir, on suit les étapes dans l’ordre.")}
          ${practice(["Écris la règle d’un jeu que tu connais en 4 étapes.", "Lis une recette de thiéboudienne avec un adulte."])}`,
      },
    ],
  },
  {
    title: "Le dictionnaire et le vocabulaire",
    strand: VOC,
    summary: "L’ordre alphabétique, chercher un mot dans le dictionnaire, employer des mots adaptés.",
    lessons: [
      {
        title: "Utiliser le dictionnaire",
        body: `<p>Dans le <strong>dictionnaire</strong>, les mots sont rangés dans l’ordre de l’<strong>alphabet</strong> : a b c d e f g h i j k l m n o p q r s t u v w x y z.</p>
          ${bullets([
            "Je regarde la première lettre du mot, puis la deuxième si la première est la même : <em>balle</em> avant <em>banane</em>.",
            "Les mots repères en haut des pages m’aident à aller plus vite.",
            "Le dictionnaire donne le sens du mot et un exemple.",
          ])}
          ${keyPoint("Pour bien écrire, je choisis le mot exact : « Le lion rugit », « le chien aboie », « l’âne brait ».")}
          ${practice(["Range dans l’ordre alphabétique : mangue, ananas, citron, banane.", "Cherche le mot « marigot » dans le dictionnaire."])}`,
      },
    ],
  },
  {
    title: "La phrase",
    strand: GRAM,
    summary: "Reconnaître une phrase, identifier le verbe, le sujet et le complément.",
    lessons: [
      {
        title: "Reconnaître une phrase",
        body: `<p>Une <strong>phrase</strong> est une suite de mots qui a un sens. Elle commence par une majuscule et finit par un point.</p>
          ${bullets(["Le pêcheur répare son filet. → c’est une phrase.", "filet pêcheur le son → ce n’est pas une phrase."])}
          ${keyPoint("Une phrase commence par une MAJUSCULE et se termine par un point (. ? ou !).")}
          ${practice(["Remets les mots dans l’ordre : école / va / Awa / à / l’.", "Écris deux phrases sur ton animal préféré."])}`,
      },
      {
        title: "Le verbe, le sujet et le complément",
        body: `${bullets([
            "Le <strong>verbe</strong> dit ce que l’on fait : Le pêcheur <strong>répare</strong> son filet.",
            "Le <strong>sujet</strong> dit qui fait l’action : <strong>Le pêcheur</strong> répare son filet.",
            "Le <strong>complément</strong> complète le verbe : Le pêcheur répare <strong>son filet</strong>.",
          ])}
          ${keyPoint("Pour trouver le sujet, je pose la question « Qui est-ce qui… ? » devant le verbe.")}
          ${practice(["Souligne le verbe : Les enfants jouent au ballon.", "Trouve le sujet : Le soleil brille."])}`,
      },
    ],
  },
  {
    title: "Le groupe nominal",
    strand: GRAM,
    summary: "Le nom, l’article et l’adjectif qualificatif ; le genre et le nombre.",
    lessons: [
      {
        title: "Le nom et l’article",
        body: `<p>Le <strong>nom</strong> désigne une personne, un animal, une chose : Moussa, un chat, la table. Il est souvent précédé d’un <strong>article</strong>.</p>
          ${tableau([
            ["", "masculin", "féminin", "pluriel"],
            ["articles", "le, un", "la, une", "les, des"],
          ])}
          ${keyPoint("Devant une voyelle, le et la deviennent l’ : l’arbre, l’école.")}
          ${practice(["Mets un article devant : … maison, … crayon, … oiseaux.", "Trouve trois noms d’animaux."])}`,
      },
      {
        title: "L’adjectif qualificatif",
        body: `<p>L’<strong>adjectif qualificatif</strong> dit comment est le nom : un <strong>grand</strong> arbre, une robe <strong>bleue</strong>.</p>
          ${bullets([
            "Il peut être à côté du nom (épithète) : un ciel <strong>bleu</strong>.",
            "Il peut être après le verbe être (attribut) : Le ciel est <strong>bleu</strong>.",
            "Il s’accorde avec le nom : un petit garçon, une petite fille, des petits garçons.",
          ])}
          ${keyPoint("Féminin : j’ajoute souvent un « e » (grand → grande). Pluriel : j’ajoute souvent un « s ».")}
          ${practice(["Accorde : une (joli) fleur ; des (grand) arbres.", "Trouve deux adjectifs pour décrire ta classe."])}`,
      },
    ],
  },
  {
    title: "Phrases impératives, impersonnelles et infinitives",
    strand: GRAM,
    summary: "Les phrases qui donnent un ordre ou une consigne.",
    lessons: [
      {
        title: "Donner un ordre ou une consigne",
        body: `${tableau([
            ["Phrase", "Exemple"],
            ["impérative (sans sujet)", "Range ton cartable."],
            ["impersonnelle", "Il faut se laver les mains."],
            ["infinitive", "Laver les légumes."],
          ])}
          ${keyPoint("Dans une phrase impérative, il n’y a pas de sujet écrit.")}
          ${practice(["Transforme : « Tu fermes la porte. » → phrase impérative.", "Écris trois consignes pour la classe avec « Il faut »."])}`,
      },
    ],
  },
  {
    title: "Le présent de l’indicatif",
    strand: CONJ,
    summary: "Conjuguer au présent les verbes d’action du 1er groupe, les verbes avoir et être.",
    lessons: [
      {
        title: "Les verbes du 1er groupe au présent",
        body: `<p>Les verbes du 1<sup>er</sup> groupe se terminent par <strong>-er</strong> à l’infinitif : jouer, chanter, danser.</p>
          ${tableau([
            ["jouer", "terminaison"],
            ["je joue", "-e"],
            ["tu joues", "-es"],
            ["il / elle joue", "-e"],
            ["nous jouons", "-ons"],
            ["vous jouez", "-ez"],
            ["ils / elles jouent", "-ent"],
          ])}
          ${keyPoint("Au présent, on raconte ce qui se passe maintenant.")}
          ${practice(["Conjugue « chanter » au présent.", "Complète : Nous (danser) …"])}`,
      },
      {
        title: "Les verbes être et avoir au présent",
        body: `${tableau([
            ["être", "avoir"],
            ["je suis", "j’ai"],
            ["tu es", "tu as"],
            ["il est", "il a"],
            ["nous sommes", "nous avons"],
            ["vous êtes", "vous avez"],
            ["ils sont", "ils ont"],
          ])}
          ${keyPoint("« Être » est un verbe d’état : il sert à dire comment on est. La mer est calme.")}
          ${practice(["Complète : Nous … contents. Ils … un ballon.", "Écris trois phrases avec le verbe avoir."])}`,
      },
    ],
  },
  {
    title: "Le passé composé",
    strand: CONJ,
    summary: "Conjuguer au passé composé les verbes usuels.",
    lessons: [
      {
        title: "Le passé composé",
        body: `<p>Le <strong>passé composé</strong> sert à raconter ce qui est déjà fait. Il se forme avec <strong>avoir</strong> (ou être) au présent et le <strong>participe passé</strong> du verbe.</p>
          ${tableau([
            ["manger"],
            ["j’ai mangé"],
            ["tu as mangé"],
            ["il a mangé"],
            ["nous avons mangé"],
            ["vous avez mangé"],
            ["ils ont mangé"],
          ])}
          ${keyPoint("Le participe passé des verbes du 1er groupe se termine par -é : chanter → chanté.")}
          ${practice(["Raconte ta journée d’hier avec trois verbes au passé composé.", "Conjugue « jouer » au passé composé."])}`,
      },
    ],
  },
  {
    title: "L’impératif et le futur simple",
    strand: CONJ,
    summary: "Conjuguer les verbes du 1er groupe à l’impératif présent et au futur simple.",
    lessons: [
      {
        title: "L’impératif présent et le futur simple",
        body: `<p>L’<strong>impératif</strong> sert à donner un ordre : il a trois personnes et pas de sujet. Le <strong>futur</strong> dit ce qui se passera plus tard.</p>
          ${tableau([
            ["Impératif (ranger)", "Futur (ranger)"],
            ["range", "je rangerai"],
            ["rangeons", "tu rangeras"],
            ["rangez", "il rangera"],
            ["", "nous rangerons"],
            ["", "vous rangerez"],
            ["", "ils rangeront"],
          ])}
          ${keyPoint("Au futur, les verbes en -er gardent tout l’infinitif : je jouer-ai, tu jouer-as.")}
          ${practice(["Donne trois ordres à l’impératif pour ranger la classe.", "Dis ce que tu feras demain avec des verbes au futur."])}`,
      },
    ],
  },
  {
    title: "Ponctuation et accords",
    strand: ORTH,
    summary: "La ponctuation, l’accord du verbe avec son sujet, les lettres finales muettes.",
    lessons: [
      {
        title: "La ponctuation et l’accord du verbe",
        body: `${bullets([
            "Le point (.) termine une phrase ; le point d’interrogation (?) une question ; le point d’exclamation (!) un cri ou une émotion.",
            "La virgule (,) sépare des mots dans une liste.",
            "Le verbe s’accorde avec son sujet : il joue, ils jouent.",
          ])}
          ${keyPoint("Certaines lettres ne s’entendent pas à la fin des mots : un chat, un lit, du riz. On les trouve en pensant à un mot de la famille (chaton, literie).")}
          ${practice(["Mets la ponctuation : où vas-tu demande Awa", "Accorde : Les enfants (chanter) en classe."])}`,
      },
    ],
  },
  {
    title: "Les homophones et le féminin des adjectifs",
    strand: ORTH,
    summary: "Distinguer a et à, et et est ; écrire le féminin des adjectifs ; écrire sous la dictée.",
    lessons: [
      {
        title: "a ou à ? et ou est ?",
        body: `${tableau([
            ["Mot", "Astuce", "Exemple"],
            ["a (verbe avoir)", "je peux dire « avait »", "Il a un vélo."],
            ["à", "je ne peux pas dire « avait »", "Il va à l’école."],
            ["est (verbe être)", "je peux dire « était »", "Le ciel est bleu."],
            ["et", "je peux dire « et puis »", "Awa et Fatou jouent."],
          ])}
          ${keyPoint("Avant d’écrire, je remplace par « avait » ou « était » pour vérifier.")}
          ${practice(["Complète avec a ou à : Moussa … faim. Il va … la boutique."])}`,
      },
      {
        title: "Le féminin des adjectifs",
        body: `${bullets([
            "En général, on ajoute « e » : petit → petite, joli → jolie.",
            "Si l’adjectif finit déjà par « e », il ne change pas : un mouton maigre, une chèvre maigre.",
          ])}
          ${keyPoint("Un adjectif qui finit par « e » au masculin est le même au féminin : rouge, jaune, rapide.")}
          ${practice(["Écris au féminin : grand, rapide, content, sage."])}`,
      },
    ],
  },
  {
    title: "Écrire des textes",
    strand: PROD,
    summary: "Écrire un petit récit, une description, des consignes : premier jet, relecture, réécriture.",
    lessons: [
      {
        title: "Écrire un petit texte",
        body: `${bullets([
            "Je réfléchis : qu’est-ce que je veux raconter, décrire ou expliquer ?",
            "J’écris un premier jet.",
            "Je relis avec la fiche de vérification : majuscules, points, accords, mots du temps ou de lieu.",
            "Je recopie proprement.",
          ])}
          ${keyPoint("Un récit a un début, un milieu et une fin. Une description utilise des adjectifs et des mots de lieu. Des consignes sont écrites dans l’ordre.")}
          ${practice(["Écris l’histoire d’un chat qui a perdu son chemin (5 phrases).", "Décris ton meilleur ami en 4 phrases."])}`,
      },
    ],
  },
];
