// Français du CE2 (étape 2 du CEB, niveau 2) : guide pédagogique officiel « Langue et communication,
// deuxième étape » (MEN), paliers du CE2 : consolidation du CE1, puis lettre, affiche et texte
// poétique, avec leur vocabulaire, grammaire, conjugaison et orthographe. Leçons rédigées par DIANGAL,
// à faire valider par un enseignant.

import { tableau } from "../3e/blocks";
import { bullets, type CiChapterSpec, keyPoint, practice } from "../ci/blocks";
import { figure, pic, row, schema } from "../lesson-figures";

const ORAL = "Communication orale";
const LECT = "Lecture";
const GRAM = "Grammaire";
const CONJ = "Conjugaison";
const ORTH = "Orthographe";
const VOC = "Vocabulaire";
const PROD = "Production d’écrits";

export const FR_CE2: CiChapterSpec[] = [
  {
    title: "Prendre la parole",
    strand: ORAL,
    summary: "Raconter, décrire, expliquer et échanger à l’oral avec les bons mots et les bons gestes.",
    lessons: [
      {
        title: "Bien parler devant les autres",
        body: `${figure(row(pic("eleve-garcon", "je parle fort et je regarde mon public", 80), pic("oreille", "on m’écoute", 48)), "Je prépare mon exposé : un début, un milieu, une fin.")}
          ${bullets([
            "Je prépare ce que je vais dire et je l’organise : début, milieu, fin.",
            "Je parle fort, lentement, en regardant mon public.",
            "Mes gestes et mon visage accompagnent ce que je dis.",
            "J’écoute les questions et j’y réponds poliment.",
          ])}
          ${keyPoint("Le ton de la voix change selon ce que l’on dit : une question monte, une affirmation descend.")}
          ${practice(["Présente ton animal préféré à la classe en une minute.", "Explique à un camarade comment aller de l’école à ta maison."])}`,
      },
    ],
  },
  {
    title: "Récits, descriptions et consignes",
    strand: LECT,
    summary: "Consolider la lecture des textes narratifs, descriptifs et injonctifs étudiés au CE1.",
    lessons: [
      {
        title: "Reconnaître le type d’un texte",
        body: `${figure(row(pic("livre", "un conte : narratif", 44), pic("case", "une description : descriptif", 52), pic("bol", "une recette : injonctif", 38)), "Chaque type de texte a un but : raconter, décrire, dire quoi faire.")}
          ${tableau([
            ["Type", "Il sert à…", "Je reconnais…"],
            ["narratif", "raconter", "des personnages, des événements, des mots du temps"],
            ["descriptif", "faire voir", "des adjectifs, des mots de lieu, des comparaisons"],
            ["injonctif", "faire agir", "des étapes, l’impératif ou l’infinitif"],
          ])}
          ${keyPoint("Pour trouver l’idée générale, je me demande : de quoi parle ce texte, en une phrase ?")}
          ${practice(["Lis trois textes de ton livre de lecture et dis de quel type ils sont."])}`,
      },
    ],
  },
  {
    title: "La lettre",
    strand: LECT,
    summary: "Lire une lettre, repérer ses éléments, en écrire une.",
    lessons: [
      {
        title: "Lire et écrire une lettre",
        body: `${figure(row(pic("enveloppe", "la lettre dans son enveloppe", 60)), "Une lettre : le lieu et la date, la formule d’appel, le message, la formule de politesse, la signature.")}
          ${tableau([
            ["Élément", "Exemple"],
            ["lieu et date", "Kaolack, le 3 mars 2026"],
            ["formule d’appel", "Cher grand-père, / Chère amie,"],
            ["le message", "en paragraphes"],
            ["formule de prise de congé", "Je t’embrasse. / Amicalement."],
            ["signature", "Ton petit-fils, Ousmane"],
          ])}
          ${keyPoint("L’expéditeur écrit la lettre ; le destinataire la reçoit.")}
          ${practice(["Écris une lettre à un cousin pour lui raconter ta rentrée."])}`,
      },
    ],
  },
  {
    title: "L’affiche",
    strand: LECT,
    summary: "Lire une affiche, comprendre sa présentation, en réaliser une.",
    lessons: [
      {
        title: "Lire et fabriquer une affiche",
        body: `<p>Une <strong>affiche</strong> donne vite une information importante : un match, une campagne de vaccination, une kermesse.</p>
          ${figure(schema("ce2-affiche", "Une affiche de kermesse."), "Le titre est en gros ; l’affiche dit quoi, quand, où et combien.")}
          ${bullets([
            "Le titre est écrit en gros ; l’information principale se voit d’abord.",
            "Les phrases sont courtes, souvent sans verbe (phrases nominales) : « Grand match de football samedi ».",
            "On trouve des dessins, des couleurs, et souvent l’impératif : « Venez nombreux ! »",
          ])}
          ${keyPoint("Une affiche répond aux questions : quoi ? où ? quand ? pour qui ?")}
          ${practice(["Fabrique l’affiche de la kermesse de ton école."])}`,
      },
    ],
  },
  {
    title: "Le texte poétique",
    strand: LECT,
    summary: "Reconnaître un poème, le dire avec expression, en écrire un.",
    lessons: [
      {
        title: "Lire et dire un poème",
        body: `${figure("<table><tr><td>Le soleil se lève sur la <strong>maison</strong>,</td></tr><tr><td>Les enfants chantent une <strong>chanson</strong>,</td></tr><tr><td>Le coq réveille tout le <strong>quartier</strong>,</td></tr><tr><td>C’est l’heure de se <strong>lever</strong>.</td></tr></table>", "Une strophe de quatre vers : maison et chanson riment, quartier et lever aussi.")}
          ${bullets([
            "Un poème est écrit en <strong>vers</strong> (lignes courtes) regroupés en <strong>strophes</strong>.",
            "Les fins de vers se ressemblent : ce sont les <strong>rimes</strong> (maison / saison).",
            "Le poème joue avec les sons, les images et les émotions.",
          ])}
          ${keyPoint("Pour dire un poème, je respecte le rythme, la ponctuation et je mets le ton.")}
          ${practice(["Apprends un court poème et récite-le.", "Écris un petit poème de 4 vers sur la pluie avec des rimes."])}`,
      },
    ],
  },
  {
    title: "Les compléments d’objet",
    strand: GRAM,
    summary: "Le complément d’objet direct (COD) et le complément d’objet indirect (COI).",
    lessons: [
      {
        title: "COD et COI",
        body: `${figure(row(pic("eleve-fille", "Awa lit…", 80), pic("livre", "… un livre : COD (quoi ?)", 44)), "« Awa lit un livre. » Lit quoi ? un livre : c’est le complément d’objet direct.")}
          ${bullets([
            "Le <strong>COD</strong> répond à la question « quoi ? » ou « qui ? » après le verbe : Awa lit <strong>un livre</strong>.",
            "Le <strong>COI</strong> répond à « à qui ? », « à quoi ? », « de quoi ? » : Awa parle <strong>à sa mère</strong>.",
          ])}
          ${keyPoint("Le COI est relié au verbe par un petit mot : à, de, au, aux, du.")}
          ${practice(["Trouve le COD : Le berger garde les moutons.", "Trouve le COI : Je pense à mes vacances."])}`,
      },
    ],
  },
  {
    title: "Le pronom personnel",
    strand: GRAM,
    summary: "Les pronoms personnels sujets et compléments remplacent un nom ou un groupe nominal.",
    lessons: [
      {
        title: "Remplacer un nom par un pronom",
        body: `${figure(row(pic("eleve-garcon", "Moussa", 80), pic("mangue", "la mangue", 44)), "« Moussa mange la mangue. » devient « Il la mange. » : les pronoms remplacent les noms.")}
          ${tableau([
            ["Pronoms sujets", "Pronoms compléments"],
            ["je, tu, il, elle, nous, vous, ils, elles", "me, te, le, la, les, lui, leur, nous, vous"],
          ])}
          <p>« Moussa mange la mangue. » → « <strong>Il la</strong> mange. »</p>
          ${keyPoint("Le pronom évite de répéter le même nom.")}
          ${practice(["Remplace par un pronom : Fatou et Awa jouent. Le maître corrige les cahiers."])}`,
      },
    ],
  },
  {
    title: "La phrase nominale et les articles",
    strand: GRAM,
    summary: "La phrase sans verbe ; les articles définis et indéfinis.",
    lessons: [
      {
        title: "Phrase nominale, articles définis et indéfinis",
        body: `${figure(row(pic("ecole", "« Fermeture de l’école à midi. »", 56)), "Une phrase nominale n’a pas de verbe.")}
          ${bullets([
            "Une <strong>phrase nominale</strong> n’a pas de verbe : « Fermeture de l’école à midi. »",
            "Articles <strong>définis</strong> (quelque chose de connu) : le, la, l’, les.",
            "Articles <strong>indéfinis</strong> (quelque chose de non précisé) : un, une, des.",
          ])}
          ${keyPoint("Les phrases nominales sont fréquentes dans les titres, les affiches et les journaux.")}
          ${practice(["Transforme en phrase nominale : « Le match commence à 16 h. » → « … »", "Souligne les articles indéfinis : Un chat et des chiens jouent dans la cour."])}`,
      },
    ],
  },
  {
    title: "Les compléments circonstanciels",
    strand: GRAM,
    summary: "Les compléments circonstanciels de temps et de lieu.",
    lessons: [
      {
        title: "Dire où et quand",
        body: `${figure(row(pic("ballon", "dans la cour : où ?", 40), pic("soleil", "le matin : quand ?", 46)), "« Nous jouons au ballon dans la cour le matin. »")}
          ${bullets([
            "Le complément circonstanciel de <strong>lieu</strong> répond à « où ? » : Nous jouons <strong>dans la cour</strong>.",
            "Le complément circonstanciel de <strong>temps</strong> répond à « quand ? » : <strong>Le matin</strong>, je vais à l’école.",
          ])}
          ${keyPoint("On peut souvent déplacer ou supprimer un complément circonstanciel.")}
          ${practice(["Ajoute un complément de lieu : Les pêcheurs partent …", "Ajoute un complément de temps : … , il a beaucoup plu."])}`,
      },
    ],
  },
  {
    title: "Adjectifs possessifs et démonstratifs",
    strand: GRAM,
    summary: "Mon, ton, son, notre, votre, leur… ; ce, cet, cette, ces.",
    lessons: [
      {
        title: "Les adjectifs possessifs et démonstratifs",
        body: `${figure(row(pic("cartable", "mon cartable", 52), pic("velo", "ce vélo", 40)), "« mon » dit à qui est l’objet ; « ce » le montre.")}
          ${tableau([
            ["Adjectifs possessifs", "Adjectifs démonstratifs"],
            ["mon, ton, son, ma, ta, sa, mes, tes, ses", "ce (ce livre), cet (cet arbre)"],
            ["notre, votre, leur, nos, vos, leurs", "cette (cette case), ces (ces enfants)"],
          ])}
          ${keyPoint("Le possessif dit à qui est la chose (mon cahier) ; le démonstratif la montre (ce cahier).")}
          ${practice(["Complète : … (à moi) livre ; … (à eux) maison.", "Complète avec ce, cet, cette : … oiseau, … table, … arbre."])}`,
      },
    ],
  },
  {
    title: "L’imparfait",
    strand: CONJ,
    summary: "Conjuguer à l’imparfait les verbes du 1er groupe et les verbes usuels.",
    lessons: [
      {
        title: "L’imparfait de l’indicatif",
        body: `<p>L’<strong>imparfait</strong> sert à raconter ou décrire dans le passé, des actions qui duraient ou se répétaient.</p>
          ${figure(row(pic("grand-pere", "Autrefois, grand-père cultivait le mil.", 80)), "L’imparfait raconte ce qui durait ou se répétait dans le passé.")}
          ${tableau([
            ["jouer", "terminaison"],
            ["je jouais", "-ais"],
            ["tu jouais", "-ais"],
            ["il jouait", "-ait"],
            ["nous jouions", "-ions"],
            ["vous jouiez", "-iez"],
            ["ils jouaient", "-aient"],
          ])}
          ${keyPoint("Autrefois, mon grand-père cultivait le mil et allait au marché à pied.")}
          ${practice(["Conjugue « chanter » à l’imparfait.", "Mets à l’imparfait : Nous (habiter) à Louga."])}`,
      },
    ],
  },
  {
    title: "Le passé composé",
    strand: CONJ,
    summary: "Le passé composé des verbes usuels : faire, courir, voir, prendre…",
    lessons: [
      {
        title: "Le passé composé des verbes usuels",
        body: `${figure(row(pic("eleve-fille", "Awa a pris le taxi.", 80), pic("taxi", "le taxi", 40)), "prendre → j’ai pris ; aller → je suis allé(e).")}
          ${tableau([
            ["Verbe", "Passé composé"],
            ["faire", "j’ai fait"],
            ["courir", "j’ai couru"],
            ["voir", "j’ai vu"],
            ["prendre", "j’ai pris"],
            ["aller", "je suis allé(e)"],
            ["venir", "je suis venu(e)"],
          ])}
          ${keyPoint("Avec l’auxiliaire être, le participe passé s’accorde avec le sujet : elle est allée.")}
          ${practice(["Raconte ta journée d’hier avec faire, voir et aller au passé composé."])}`,
      },
    ],
  },
  {
    title: "L’impératif et le futur simple",
    strand: CONJ,
    summary: "L’impératif des verbes des 2e et 3e groupes ; le futur simple des verbes usuels.",
    lessons: [
      {
        title: "L’impératif et le futur des verbes usuels",
        body: `${figure(row(pic("cahier", "Finis ton devoir !", 44), pic("ecole", "Demain, je ferai mes devoirs.", 56)), "L’impératif donne un ordre ; le futur dit ce qui se passera.")}
          ${tableau([
            ["Verbe", "Impératif", "Futur"],
            ["finir", "finis, finissons, finissez", "je finirai"],
            ["faire", "fais, faisons, faites", "je ferai"],
            ["venir", "viens, venons, venez", "je viendrai"],
            ["être", "sois, soyons, soyez", "je serai"],
            ["avoir", "aie, ayons, ayez", "j’aurai"],
            ["aller", "va, allons, allez", "j’irai"],
          ])}
          ${keyPoint("Au futur, les terminaisons sont toujours : -rai, -ras, -ra, -rons, -rez, -ront.")}
          ${practice(["Dis ce que tu feras pendant les vacances avec cinq verbes au futur."])}`,
      },
    ],
  },
  {
    title: "Le féminin et le pluriel des noms",
    strand: ORTH,
    summary: "Former le féminin et le pluriel des noms.",
    lessons: [
      {
        title: "Féminin et pluriel des noms",
        body: `${figure(row(pic("papa", "le vendeur", 80), pic("maman", "la vendeuse", 80)), "vendeur → vendeuse ; un vendeur → des vendeurs.")}
          ${tableau([
            ["Féminin", "Exemples"],
            ["on ajoute -e", "cousin → cousine"],
            ["-eur → -euse", "vendeur → vendeuse"],
            ["-ier → -ière", "fermier → fermière"],
            ["-teur → -trice", "instituteur → institutrice"],
            ["mot différent", "père → mère, coq → poule"],
          ])}
          ${bullets(["Pluriel : on ajoute -s (un livre → des livres).", "Les noms en -eau prennent -x (des bateaux) ; en -al → -aux (des chevaux).", "Les noms en -s, -x, -z ne changent pas (des souris, des noix, des nez)."])}
          ${keyPoint("Le pluriel s’entend rarement : il faut bien regarder le déterminant (les, des, mes…).")}
          ${practice(["Écris au féminin : danseur, boulanger, acteur.", "Écris au pluriel : un cadeau, un journal, une croix."])}`,
      },
    ],
  },
  {
    title: "Les homophones",
    strand: ORTH,
    summary: "Distinguer son et sont, a et à, et et est, ou et où.",
    lessons: [
      {
        title: "son ou sont ?",
        body: `${figure(row(pic("cartable", "son cartable (le sien)", 52), pic("ecole", "Les élèves sont en classe.", 56)), "« son » peut se remplacer par « mon » ; « sont » par « étaient ».")}
          ${tableau([
            ["Mot", "Astuce", "Exemple"],
            ["sont (verbe être)", "je peux dire « étaient »", "Les enfants sont en classe."],
            ["son (à lui, à elle)", "je peux dire « mon »", "Il prend son cartable."],
            ["ou", "je peux dire « ou bien »", "Du lait ou du jus ?"],
            ["où", "indique le lieu", "Où vas-tu ?"],
          ])}
          ${keyPoint("Je remplace par un autre mot pour vérifier l’orthographe.")}
          ${practice(["Complète : Les élèves … sages. Awa range … livre."])}`,
      },
    ],
  },
  {
    title: "Le dictionnaire et les mots",
    strand: VOC,
    summary: "Chercher le sens, les synonymes, les homonymes et les mots de la même famille ; expressions imagées.",
    lessons: [
      {
        title: "Synonymes, homonymes et familles de mots",
        body: `${figure(row(pic("verre-eau", "un verre", 44), pic("feuille", "vert", 40)), "verre et vert se prononcent pareil : ce sont des homonymes.")}
          ${bullets([
            "<strong>Synonymes</strong> : mots de sens proche (content, joyeux).",
            "<strong>Homonymes</strong> : mots qui se prononcent pareil mais n’ont pas le même sens (verre, vert, ver).",
            "<strong>Famille de mots</strong> : mots formés à partir du même mot (terre, terrain, enterrer).",
            "<strong>Expressions imagées</strong> : noir comme du charbon, dur comme du fer, avoir une faim de loup.",
          ])}
          ${keyPoint("Le dictionnaire donne le sens d’un mot, ses synonymes et des exemples.")}
          ${practice(["Trouve un synonyme de « rapide ».", "Trouve trois mots de la famille de « jardin »."])}`,
      },
    ],
  },
  {
    title: "Écrire une lettre, une affiche et un poème",
    strand: PROD,
    summary: "Produire un premier jet en suivant une fiche de critères, l’évaluer, le réécrire.",
    lessons: [
      {
        title: "Écrire, relire, réécrire",
        body: `${figure(row(pic("cahier", "le premier jet", 44), pic("crayon", "je corrige", 24), pic("cahier", "je recopie au propre", 44)), "J’écris, je relis avec la fiche de critères, puis je réécris.")}
          ${bullets([
            "Je lis bien la consigne : qu’est-ce que je dois écrire et pour qui ?",
            "J’écris un premier jet en suivant la fiche de critères (éléments de la lettre, de l’affiche ou du poème).",
            "Je relis : sens, ponctuation, accords, orthographe.",
            "Je réécris au propre et je lis mon texte à la classe.",
          ])}
          ${keyPoint("Un bon texte respecte la consigne, est bien organisé et sans fautes.")}
          ${practice(["Écris l’affiche d’une journée de nettoyage du quartier.", "Écris une lettre de remerciement à ton maître."])}`,
      },
    ],
  },
];
