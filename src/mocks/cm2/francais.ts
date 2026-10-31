// Français du CM2 (domaine « Langue et communication » du CEB). Rubriques et notions d’après les
// leçons de CM2 de la plateforme officielle PROMET (apprendre.education.sn) et le guide officiel du
// CFEE (compréhension de texte, contrôle des connaissances, production d’écrits). L’ordre des
// chapitres est indicatif. Leçons rédigées par DIANGAL, à faire valider par des enseignants.

import { type ChapterSpec, exemple, liste, methode, retenir, tableau } from "./blocks";
import { figure, pic, row } from "../lesson-figures";

export const FR_CM2: ChapterSpec[] = [
  // ── Lecture ───────────────────────────────────────────────────────────────
  {
    title: "Lire et comprendre un texte",
    summary: "Repérer le sujet, les personnages et les idées principales ; répondre aux questions.",
    strand: "Lecture",
    lessons: [
      {
        title: "Comprendre un texte",
        minutes: 15,
        body: `<p>Pour bien comprendre un texte, on le lit plusieurs fois et on se pose des questions : <strong>qui ? quoi ? où ? quand ? comment ? pourquoi ?</strong></p>
          ${figure(row(pic("livre", "je lis plusieurs fois", 44), pic("oeil", "je cherche les indices", 28)), "Qui ? quoi ? où ? quand ? comment ? pourquoi ?")}
          ${methode([
            "Lire le titre et regarder les illustrations : de quoi le texte va-t-il parler ?",
            "Lire tout le texte une première fois.",
            "Relire en cherchant les personnages, le lieu, le moment, les événements.",
            "Trouver l’idée principale de chaque paragraphe.",
            "Répondre aux questions par des phrases complètes, en s’appuyant sur le texte.",
          ])}
          ${retenir("Quand on ne comprend pas un mot, on cherche son sens grâce aux mots qui l’entourent (le contexte) ou dans le dictionnaire.")}`,
      },
      {
        title: "Les différents types de textes",
        minutes: 12,
        body: `${figure(row(pic("lapin", "un conte : raconter", 50, "un lièvre"), pic("bol", "une recette : expliquer quoi faire", 38), pic("case", "une description : faire voir", 52)), "Chaque type de texte a son but et ses indices.")}
          ${tableau([
            ["Type de texte", "But", "Indices"],
            ["narratif (récit, conte)", "raconter une histoire", "personnages, événements, temps du passé"],
            ["descriptif", "décrire une personne, un lieu, un objet", "adjectifs, verbes d’état, présent ou imparfait"],
            ["dialogué", "faire parler des personnages", "tirets, guillemets, verbes de parole"],
            ["informatif (documentaire)", "donner des informations", "faits, chiffres, titres, présent"],
            ["injonctif (recette, notice)", "dire comment faire", "impératif ou infinitif, étapes numérotées"],
          ])}
          ${exemple(["« Prenez 500 g de mil, lavez-le, puis faites-le cuire… » est un texte injonctif."])}`,
      },
    ],
  },
  {
    title: "Le texte dialogué",
    summary: "Présenter un dialogue, ponctuation et verbes de parole, discours direct et indirect.",
    strand: "Lecture",
    lessons: [
      {
        title: "Lire et écrire un dialogue",
        minutes: 12,
        body: `${figure("<table><tr><td>« Tu viens jouer ? demanda Fatou.</td></tr><tr><td>— J’arrive ! cria Ibou. »</td></tr></table>", "Les guillemets ouvrent et ferment le dialogue ; un tiret annonce chaque changement de personne.")}
          ${liste([
            "on ouvre les guillemets « au début du dialogue et on les ferme » à la fin ;",
            "un tiret (—) annonce chaque changement de personne qui parle ;",
            "les <strong>verbes de parole</strong> indiquent qui parle et comment : dire, demander, répondre, crier, murmurer, s’exclamer…",
          ])}
          ${exemple(["« Où vas-tu si tôt ? demanda la grand-mère.<br>— Je vais au marché de Tilène, répondit Fatou.<br>— Ramène-moi du poisson ! »"])}
          ${retenir("Au discours direct, on rapporte les paroles exactes entre guillemets. Au discours indirect, on les rapporte sans guillemets : La grand-mère demanda à Fatou où elle allait.")}`,
      },
    ],
  },
  // ── Grammaire ─────────────────────────────────────────────────────────────
  {
    title: "La phrase et les propositions",
    summary: "Types et formes de phrases ; propositions indépendantes, juxtaposées et coordonnées.",
    strand: "Grammaire",
    lessons: [
      {
        title: "Types et formes de phrases",
        minutes: 12,
        body: `${figure(row(pic("camion", "Le car part à 7 h.", 36), pic("feu-tricolore", "Ne traverse pas !", 70)), "Une phrase déclarative, puis une phrase injonctive à la forme négative.")}
          ${tableau([
            ["Type de phrase", "Sert à…", "Ponctuation", "Exemple"],
            ["déclarative", "donner une information", ".", "Le car part à 8 heures."],
            ["interrogative", "poser une question", "?", "À quelle heure part le car ?"],
            ["exclamative", "exprimer un sentiment", "!", "Quel beau voyage !"],
            ["impérative", "donner un ordre, un conseil", ". ou !", "Montez vite."],
          ])}
          ${retenir("Chaque phrase peut être à la forme <strong>affirmative</strong> ou <strong>négative</strong>. La négation entoure le verbe conjugué : ne… pas, ne… plus, ne… jamais, ne… rien, ne… personne.")}
          ${exemple(["Il pleut. → Il ne pleut pas. Je vois quelqu’un. → Je ne vois personne."])}`,
      },
      {
        title: "Les propositions indépendantes",
        minutes: 12,
        body: `<p>Une <strong>proposition</strong> est un groupe de mots organisé autour d’un verbe conjugué. Il y a autant de propositions que de verbes conjugués.</p>
          ${figure(row(pic("nuage", "Il pleut,", 44), pic("eleve-garcon", "Modou rentre.", 80)), "Deux verbes conjugués : deux propositions indépendantes, juxtaposées.")}
          ${liste([
            "proposition <strong>indépendante</strong> : elle a un sens seule (Le soleil brille.) ;",
            "propositions <strong>juxtaposées</strong> : séparées par une virgule, un point-virgule ou deux-points (Il pleut, la route est glissante.) ;",
            "propositions <strong>coordonnées</strong> : reliées par une conjonction de coordination (mais, ou, et, donc, or, ni, car) ou un adverbe (puis, ensuite…).",
          ])}
          ${exemple(["Le maître parle et les élèves écoutent : deux propositions indépendantes coordonnées par « et »."])}`,
      },
    ],
  },
  {
    title: "Les fonctions dans la phrase",
    summary: "Sujet, compléments d’objet, attribut et compléments circonstanciels.",
    strand: "Grammaire",
    lessons: [
      {
        title: "Le sujet, les compléments d’objet et l’attribut",
        minutes: 15,
        body: `${figure(row(pic("eleve-fille", "Awa (sujet) lit…", 80), pic("livre", "… un livre (COD)", 44)), "« Awa lit un livre » : qui lit ? Awa ; lit quoi ? un livre.")}
          ${tableau([
            ["Fonction", "Question à poser", "Exemple"],
            ["sujet", "qui est-ce qui ? qu’est-ce qui ? + verbe", "<strong>Les pêcheurs</strong> reviennent."],
            ["COD (complément d’objet direct)", "verbe + qui ? quoi ?", "Ils vendent <strong>le poisson</strong>."],
            ["COI (complément d’objet indirect)", "verbe + à qui ? de quoi ?", "Ils parlent <strong>aux clients</strong>."],
            ["COS (complément d’objet second)", "deuxième complément d’objet", "Ils donnent du poisson <strong>à leur mère</strong>."],
            ["attribut du sujet", "après un verbe d’état (être, paraître, sembler, devenir…)", "La mer est <strong>calme</strong>."],
          ])}
          ${retenir("Le COD et le COI ne peuvent généralement pas être supprimés ni déplacés ; ils se pronominalisent : Ils vendent le poisson → Ils le vendent.")}`,
      },
      {
        title: "Les compléments circonstanciels",
        minutes: 12,
        body: `<p>Les compléments circonstanciels (CC) précisent les circonstances de l’action. On peut souvent les déplacer ou les supprimer.</p>
          ${figure(row(pic("soleil", "Le matin : temps", 44), pic("ecole", "à l’école : lieu", 52)), "« Le matin, je vais à l’école. » On peut déplacer ou supprimer les compléments circonstanciels.")}
          ${tableau([
            ["CC de…", "Question", "Exemple"],
            ["lieu", "où ?", "Nous jouons <strong>dans la cour</strong>."],
            ["temps", "quand ?", "<strong>Le soir</strong>, nous révisons."],
            ["manière", "comment ?", "Il travaille <strong>avec soin</strong>."],
            ["cause", "pourquoi ?", "Il est absent <strong>à cause de la pluie</strong>."],
            ["but", "dans quel but ?", "Elle étudie <strong>pour réussir</strong>."],
          ])}`,
      },
    ],
  },
  {
    title: "La proposition subordonnée",
    summary: "Proposition principale et subordonnée ; subordonnées relatives et conjonctives.",
    strand: "Grammaire",
    lessons: [
      {
        title: "La proposition subordonnée relative",
        minutes: 15,
        body: `<p>Une phrase complexe peut contenir une proposition <strong>principale</strong> et une proposition <strong>subordonnée</strong>, qui dépend d’elle.</p>
          ${figure(row(pic("chien", "Le chien qui aboie est à Modou.", 56)), "« qui aboie » complète le nom chien : c’est une proposition subordonnée relative.")}
          <p>La subordonnée <strong>relative</strong> commence par un <strong>pronom relatif</strong> (qui, que, quoi, dont, où, lequel…) et complète un nom, l’<strong>antécédent</strong>.</p>
          ${exemple([
            "J’ai lu le livre <strong>que tu m’as prêté</strong>. (antécédent : le livre)",
            "Voici la maison <strong>où je suis né</strong>.",
            "C’est l’ami <strong>dont je t’ai parlé</strong>.",
          ])}
          ${retenir("Les pronoms relatifs composés s’accordent avec leur antécédent : lequel, laquelle, lesquels, lesquelles (et auquel, duquel…). La table sur laquelle j’écris.")}`,
      },
      {
        title: "Les propositions subordonnées conjonctives",
        minutes: 15,
        body: `<p>La subordonnée <strong>conjonctive</strong> commence par une conjonction de subordination (que, quand, lorsque, parce que, puisque, comme, si, pour que…).</p>
          ${figure(row(pic("nuage", "Quand il pleut,", 44), pic("maison", "nous restons à la maison.", 52)), "« Quand il pleut » : une subordonnée de temps, introduite par « quand ».")}
          ${tableau([
            ["Subordonnée", "Mot introducteur", "Exemple"],
            ["complétive (COD)", "que", "Je sais <strong>que tu viendras</strong>."],
            ["circonstancielle de temps", "quand, lorsque, dès que, avant que", "<strong>Quand la cloche sonne</strong>, nous rentrons."],
            ["circonstancielle de cause", "parce que, puisque, comme", "Il est fatigué <strong>parce qu’il a couru</strong>."],
            ["circonstancielle de but", "pour que, afin que", "Parle fort <strong>pour qu’on t’entende</strong>."],
          ])}
          ${retenir("Après « pour que » et « avant que », le verbe se met au subjonctif.")}`,
      },
    ],
  },
  {
    title: "Déterminants et pronoms",
    summary: "Articles, adjectifs possessifs, démonstratifs, numéraux et indéfinis ; pronoms personnels.",
    strand: "Grammaire",
    lessons: [
      {
        title: "Les déterminants",
        minutes: 12,
        body: `${figure(row(pic("cartable", "mon cartable", 50), pic("velo", "ce vélo", 38), pic("mangue", "trois mangues", 44)), "Un possessif, un démonstratif, un numéral.")}
          ${tableau([
            ["Déterminant", "Exemples"],
            ["articles définis / indéfinis", "le, la, les, l’ / un, une, des"],
            ["adjectifs possessifs", "mon, ton, son, notre, votre, leur, mes, ses, leurs…"],
            ["adjectifs démonstratifs", "ce, cet, cette, ces"],
            ["adjectifs numéraux", "cardinaux : deux, vingt, cent ; ordinaux : deuxième, centième"],
            ["adjectifs indéfinis", "chaque, plusieurs, quelques, aucun, tout…"],
          ])}
          ${retenir("« Vingt » et « cent » prennent un « s » quand ils sont multipliés et terminent le nombre : quatre-vingts, trois cents ; mais quatre-vingt-deux, trois cent dix.")}`,
      },
      {
        title: "Les pronoms personnels",
        minutes: 12,
        body: `<p>Le <strong>pronom</strong> remplace un nom ou un groupe nominal pour éviter une répétition.</p>
          ${figure(row(pic("eleve-garcon", "Modou mange la mangue.", 80), pic("mangue", "Il la mange.", 44)), "« Il » remplace Modou, « la » remplace la mangue.")}
          ${tableau([
            ["Fonction", "Pronoms"],
            ["sujet", "je, tu, il, elle, on, nous, vous, ils, elles"],
            ["COD", "me, te, le, la, l’, nous, vous, les"],
            ["COI", "me, te, lui, nous, vous, leur"],
          ])}
          ${exemple(["Je donne le cahier à Moussa → Je le lui donne.", "Le pronom « leur » devant un verbe est invariable : Je leur parle."])}`,
      },
    ],
  },
  // ── Conjugaison ──────────────────────────────────────────────────────────
  {
    title: "Le présent de l’indicatif",
    summary: "Présent des trois groupes et des verbes particuliers (-eler, -eter, -yer, venir, pouvoir…).",
    strand: "Conjugaison",
    lessons: [
      {
        title: "Le présent des trois groupes",
        minutes: 15,
        body: `${figure(row(pic("coq", "il chante (1er)", 54), pic("plante", "elle grandit (2e)", 44), pic("taxi", "nous prenons le taxi (3e)", 34)), "chanter, finir, prendre : trois groupes au présent.")}
          ${tableau([
            ["", "1er groupe (chanter)", "2e groupe (finir)", "3e groupe (prendre)"],
            ["je", "chante", "finis", "prends"],
            ["tu", "chantes", "finis", "prends"],
            ["il / elle", "chante", "finit", "prend"],
            ["nous", "chantons", "finissons", "prenons"],
            ["vous", "chantez", "finissez", "prenez"],
            ["ils / elles", "chantent", "finissent", "prennent"],
          ])}
          ${retenir("1er groupe : infinitif en -er (sauf aller). 2e groupe : infinitif en -ir, et -issons au pluriel. Tous les autres verbes sont du 3e groupe.")}
          ${exemple(["venir : je viens, nous venons, ils viennent ; pouvoir : je peux, tu peux, il peut, ils peuvent."])}`,
      },
      {
        title: "Verbes en -eler, -eter, -yer",
        minutes: 12,
        body: `${figure(row(pic("telephone", "j’appelle", 56), pic("poubelle", "je jette", 56), pic("balai", "je nettoie")), "appeler → j’appelle ; jeter → je jette ; nettoyer → je nettoie.")}
          ${liste([
            "la plupart des verbes en -eler et -eter doublent la consonne devant un e muet : j’appelle, je jette, nous appelons ;",
            "quelques-uns prennent un accent grave : j’achète, je gèle, il pèle ;",
            "les verbes en -oyer et -uyer changent y en i devant un e muet : j’envoie, j’essuie, nous envoyons ;",
            "les verbes en -ayer peuvent garder le y ou prendre i : je paie ou je paye.",
          ])}
          ${exemple(["Au futur : j’appellerai, je jetterai, j’enverrai (verbe envoyer, irrégulier), j’essuierai."])}`,
      },
    ],
  },
  {
    title: "Les temps du passé",
    summary: "Imparfait, passé simple, passé composé, plus-que-parfait et passé antérieur.",
    strand: "Conjugaison",
    lessons: [
      {
        title: "Imparfait et passé simple",
        minutes: 15,
        body: `${figure(row(pic("pirogue", "La mer était calme…", 34), pic("poisson", "… quand un gros poisson sauta.", 30)), "L’imparfait pour le décor ; le passé simple pour l’action qui surgit.")}
          ${tableau([
            ["", "Imparfait", "Passé simple (1er gr.)", "Passé simple (2e gr.)"],
            ["je", "chantais", "chantai", "finis"],
            ["il", "chantait", "chanta", "finit"],
            ["nous", "chantions", "chantâmes", "finîmes"],
            ["ils", "chantaient", "chantèrent", "finirent"],
          ])}
          ${retenir("Dans un récit, l’imparfait décrit le décor et les habitudes ; le passé simple raconte les actions brèves, de premier plan : Il pleuvait quand le car arriva.")}`,
      },
      {
        title: "Les temps composés du passé",
        minutes: 15,
        body: `<p>Les temps composés se forment avec l’auxiliaire <strong>être</strong> ou <strong>avoir</strong> conjugué, suivi du participe passé.</p>
          ${figure(row(pic("enveloppe", "Il a écrit une lettre.", 46), pic("avion", "Ils étaient partis.", 26)), "Passé composé et plus-que-parfait : un auxiliaire + le participe passé.")}
          ${tableau([
            ["Temps", "Auxiliaire au…", "Exemple"],
            ["passé composé", "présent", "j’ai chanté, je suis parti"],
            ["plus-que-parfait", "imparfait", "j’avais chanté, j’étais parti"],
            ["passé antérieur", "passé simple", "j’eus chanté, je fus parti"],
          ])}
          ${exemple(["Quand il <strong>eut fini</strong> ses devoirs, il sortit jouer : le passé antérieur marque une action terminée avant une autre au passé simple."])}`,
      },
    ],
  },
  {
    title: "Le futur et le conditionnel",
    summary: "Futur simple, futur antérieur et conditionnel présent.",
    strand: "Conjugaison",
    lessons: [
      {
        title: "Futur simple et futur antérieur",
        minutes: 12,
        body: `<p>Au futur simple, les terminaisons sont les mêmes pour tous les verbes : -rai, -ras, -ra, -rons, -rez, -ront.</p>
          ${figure(row(pic("cahier", "Quand j’aurai fini mon devoir…", 40), pic("ballon", "… je jouerai.", 38)), "Le futur antérieur dit ce qui sera fini avant une autre action future.")}
          ${exemple(["je chanterai, tu finiras, il prendra, nous serons, vous aurez, ils iront, je viendrai, je pourrai."])}
          ${retenir("Futur antérieur = auxiliaire au futur + participe passé. Il marque une action future terminée avant une autre : Quand tu auras fini, tu sortiras.")}`,
      },
      {
        title: "Le conditionnel présent",
        minutes: 12,
        body: `<p>Le conditionnel présent se forme comme le futur, avec les terminaisons de l’imparfait : -rais, -rais, -rait, -rions, -riez, -raient.</p>
          ${figure(row(pic("verre-eau", "Je voudrais de l’eau, s’il vous plaît.", 44)), "Le conditionnel exprime la politesse, un souhait ou une condition.")}
          ${exemple(["Si j’avais de l’argent, j’achèterais un vélo.", "Je voudrais un verre d’eau, s’il vous plaît (politesse)."])}
          ${retenir("Ne confonds pas « je chanterai » (futur) et « je chanterais » (conditionnel) : remplace par « nous » pour entendre la différence (nous chanterons / nous chanterions).")}`,
      },
    ],
  },
  {
    title: "Le subjonctif et l’impératif",
    summary: "Présent du subjonctif et présent de l’impératif.",
    strand: "Conjugaison",
    lessons: [
      {
        title: "Le présent du subjonctif et de l’impératif",
        minutes: 15,
        body: `<p>Le <strong>subjonctif</strong> s’emploie après « il faut que », « pour que », « avant que », ou pour exprimer un souhait. Terminaisons : -e, -es, -e, -ions, -iez, -ent.</p>
          ${figure(row(pic("savon", "Il faut que tu te laves les mains.", 34), pic("cartable", "Range ton cartable !", 48)), "Le subjonctif après « il faut que » ; l’impératif pour un ordre.")}
          ${tableau([
            ["", "chanter", "finir", "pouvoir", "recevoir"],
            ["que je", "chante", "finisse", "puisse", "reçoive"],
            ["que nous", "chantions", "finissions", "puissions", "recevions"],
          ])}
          <p>L’<strong>impératif</strong> sert à donner un ordre ou un conseil ; il n’a que trois personnes et pas de sujet exprimé : chante, chantons, chantez.</p>
          ${retenir("À l’impératif, les verbes du 1er groupe n’ont pas de « s » à la 2e personne du singulier : mange, range. Mais on écrit « manges-en », « vas-y ».")}`,
      },
    ],
  },
  // ── Orthographe ──────────────────────────────────────────────────────────
  {
    title: "Les accords",
    summary: "Adjectif qualificatif, participe passé, participe présent et adjectif verbal.",
    strand: "Orthographe",
    lessons: [
      {
        title: "L’accord de l’adjectif qualificatif",
        minutes: 12,
        body: `<p>L’adjectif s’accorde en genre et en nombre avec le nom qu’il qualifie.</p>
          ${figure(row(pic("chemise", "une chemise blanche", 44), pic("fleur", "des fleurs rouges", 56)), "L’adjectif s’accorde en genre et en nombre avec le nom.")}
          ${tableau([
            ["Règle du féminin", "Exemples"],
            ["on ajoute -e", "grand → grande"],
            ["-er → -ère", "fier → fière"],
            ["-eux → -euse", "heureux → heureuse"],
            ["-if → -ive", "vif → vive"],
            ["doublement de la consonne", "bon → bonne, gentil → gentille"],
          ])}
          ${retenir("Au pluriel, on ajoute -s ; -al devient -aux (loyal → loyaux) ; les adjectifs en -s ou -x ne changent pas (gris, heureux).")}`,
      },
      {
        title: "L’accord du participe passé",
        minutes: 15,
        body: `${figure(row(pic("eleve-fille", "Les filles sont arrivées.", 80), pic("mangue", "Elles ont mangé des mangues.", 44)), "Avec être, le participe s’accorde avec le sujet ; avec avoir, il ne s’accorde pas avec le sujet.")}
          ${liste([
            "avec <strong>être</strong>, le participe passé s’accorde avec le sujet : Les filles sont arrivées ;",
            "avec <strong>avoir</strong>, il ne s’accorde pas avec le sujet ; il s’accorde avec le COD seulement si celui-ci est placé avant le verbe : J’ai cueilli des mangues. Les mangues que j’ai cueillies.",
            "employé seul, il s’accorde comme un adjectif : des portes fermées.",
          ])}
          ${retenir("Participe présent ou adjectif verbal ? Le participe présent (-ant) est invariable et peut avoir un complément : des élèves obéissant au maître. L’adjectif verbal s’accorde : des élèves obéissants.")}`,
      },
    ],
  },
  {
    title: "Les homophones grammaticaux",
    summary: "a/à, et/est, son/sont, ces/ses, leur/leurs, quel(s)/qu’elle(s), ou/où…",
    strand: "Orthographe",
    lessons: [
      {
        title: "Distinguer les homophones",
        minutes: 15,
        body: `${figure("<table><tr><th>a / à</th><td>Il a un vélo. Il va à l’école.</td></tr><tr><th>et / est</th><td>Awa et Fatou. Le ciel est bleu.</td></tr><tr><th>son / sont</th><td>son cartable. Ils sont là.</td></tr><tr><th>on / ont</th><td>On joue. Ils ont joué.</td></tr></table>", "On remplace par « avait », « était », « mon » ou « il » pour vérifier.")}
          ${tableau([
            ["Homophones", "Astuce"],
            ["a / à", "a = avait (verbe avoir) ; sinon à"],
            ["et / est", "est = était ; et = et puis"],
            ["son / sont", "sont = étaient ; son = le sien"],
            ["ces / ses", "ses = les siens ; ces = ceux-là"],
            ["ou / où", "ou = ou bien ; où indique le lieu ou le temps"],
            ["leur / leurs", "leur devant un verbe est invariable (pronom) ; devant un nom pluriel : leurs"],
            ["quel(s) / qu’elle(s)", "qu’elle = que + elle (on peut remplacer par « qu’il »)"],
          ])}
          ${exemple(["Il a donné à ses frères leurs cahiers et il leur a souri.", "Quelle robe veux-tu ? Celle qu’elle porte."])}`,
      },
    ],
  },
  {
    title: "Mots invariables et ponctuation",
    summary: "Adverbes en -ment, prépositions, tout / tous, signes de ponctuation.",
    strand: "Orthographe",
    lessons: [
      {
        title: "Les adverbes en -ment et les prépositions",
        minutes: 12,
        body: `${figure(row(pic("tortue", "lentement", 48), pic("cheval", "rapidement", 48)), "lent → lente → lentement ; rapide → rapidement.")}
          ${liste([
            "on forme l’adverbe sur le féminin de l’adjectif : lent → lente → lentement ;",
            "adjectifs en -ant → -amment, en -ent → -emment : courant → couramment, prudent → prudemment ;",
            "les <strong>prépositions</strong> (à, de, dans, par, pour, sans, sous, sur, avec, chez…) sont invariables.",
          ])}
          ${retenir("« Tout » s’accorde quand il est déterminant ou adjectif : tous les enfants, toutes les filles. Il est invariable quand il signifie « tout à fait » (sauf devant un adjectif féminin commençant par une consonne : elle est toute petite).")}`,
      },
      {
        title: "La ponctuation",
        minutes: 10,
        body: `${figure("<table><tr><th>;</th><td>Il pleut ; nous restons.</td></tr><tr><th>:</th><td>Il a acheté : du riz, du sucre et du lait.</td></tr><tr><th>« »</th><td>« Viens ! » dit maman.</td></tr></table>", "Le point-virgule, les deux-points et les guillemets.")}
          ${tableau([
            ["Signe", "Emploi"],
            ["point .", "fin d’une phrase déclarative"],
            ["virgule ,", "sépare des éléments d’une énumération ou des propositions"],
            ["point-virgule ;", "sépare deux propositions liées par le sens"],
            ["deux-points :", "annonce une explication, une énumération ou des paroles"],
            ["points de suspension …", "phrase inachevée, hésitation"],
            ["guillemets « »", "encadrent des paroles rapportées"],
          ])}
          ${retenir("Une phrase commence par une majuscule et se termine par un point (., ? ou !).")}`,
      },
    ],
  },
  // ── Vocabulaire ──────────────────────────────────────────────────────────
  {
    title: "Le sens des mots",
    summary: "Sens d’un mot dans le contexte, sens propre et figuré, homonymes, synonymes et contraires.",
    strand: "Vocabulaire",
    lessons: [
      {
        title: "Sens propre, sens figuré et contexte",
        minutes: 12,
        body: `<p>Un même mot peut avoir plusieurs sens. C’est le <strong>contexte</strong> (la phrase) qui permet de choisir le bon.</p>
          ${figure(row(pic("lion", "un lion : sens propre", 52), pic("eleve-garcon", "« Modou est un lion ! » : il est courageux", 80)), "Le contexte de la phrase donne le bon sens du mot.")}
          ${exemple([
            "Sens propre : Le lion a <strong>dévoré</strong> la gazelle.",
            "Sens figuré : Awa <strong>dévore</strong> les livres (elle lit beaucoup).",
          ])}
          ${retenir("Dans le dictionnaire, les mots sont classés par ordre alphabétique ; chaque article donne la nature du mot, ses différents sens numérotés et des exemples.")}`,
      },
      {
        title: "Homonymes, synonymes et contraires",
        minutes: 12,
        body: `${figure(row(pic("verre-eau", "un verre", 40), pic("feuille", "vert", 36), pic("lunettes", "les verres des lunettes", 22)), "verre, vert, vers : des homonymes ; et « verre » a plusieurs sens.")}
          ${tableau([
            ["Notion", "Définition", "Exemple"],
            ["homonymes", "mots qui se prononcent de la même façon mais ont des sens différents", "le vers / le ver / vert / le verre"],
            ["synonymes", "mots de sens proche", "content, joyeux, heureux"],
            ["contraires (antonymes)", "mots de sens opposé", "propre / sale ; possible / impossible"],
          ])}
          ${retenir("Abréviations de politesse : M. (monsieur), Mme (madame), Mlle (mademoiselle), MM. (messieurs). On écrit en entier « Monsieur le Directeur » quand on s’adresse à la personne.")}`,
      },
    ],
  },
  {
    title: "La formation des mots",
    summary: "Familles de mots, radical, préfixes et suffixes.",
    strand: "Vocabulaire",
    lessons: [
      {
        title: "Familles de mots, préfixes et suffixes",
        minutes: 12,
        body: `<p>Les mots d’une même <strong>famille</strong> ont un radical commun : terre, terrain, terrasse, enterrer, souterrain.</p>
          ${figure("<table><tr><th>radical</th><td>terr-</td></tr><tr><th>mots de la famille</th><td>terre, terrain, terrasse, enterrer, souterrain</td></tr><tr><th>préfixe et suffixe</th><td>en-terr-er ; terr-ain</td></tr></table>", "Les mots d’une même famille ont un radical commun.")}
          ${tableau([
            ["Élément", "Sens", "Exemples"],
            ["préfixe in-, im-, dé-", "contraire", "inutile, impossible, défaire"],
            ["préfixe re-", "de nouveau", "refaire, relire"],
            ["suffixe -eur", "celui qui fait l’action", "vendeur, chanteur"],
            ["suffixe -age", "action", "lavage, nettoyage"],
            ["suffixe -able", "qui peut être", "lavable, mangeable"],
          ])}
          ${exemple(["« Préparer » : pré- (avant) + parer ; « imprévisible » : im- + prévis- + -ible."])}`,
      },
    ],
  },
  // ── Production d'écrits ──────────────────────────────────────────────────
  {
    title: "Rédiger un texte",
    summary: "Préparer, écrire et relire une narration, une description ou une lettre (rédaction du CFEE).",
    strand: "Production d’écrits",
    lessons: [
      {
        title: "Préparer et écrire une rédaction",
        minutes: 15,
        body: `${figure("<table><tr><th>1. Je comprends le sujet</th><td>je souligne les mots importants</td></tr><tr><th>2. Je cherche des idées</th><td>au brouillon</td></tr><tr><th>3. Je fais un plan</th><td>introduction, développement, conclusion</td></tr><tr><th>4. Je rédige et je relis</th><td>orthographe, ponctuation</td></tr></table>", "Les étapes d’une rédaction.")}
          ${methode([
            "Lire attentivement le sujet et souligner les mots importants : que faut-il raconter, décrire ou expliquer ?",
            "Chercher des idées au brouillon et les classer.",
            "Faire un plan : introduction, développement (plusieurs paragraphes), conclusion.",
            "Rédiger en phrases complètes, avec des mots de liaison (d’abord, ensuite, puis, enfin, car, mais).",
            "Relire pour corriger l’orthographe, les accords et la ponctuation.",
          ])}
          ${exemple(["Sujet : « Raconte une journée de fête dans ton village. » Introduction : quelle fête, quand, où. Développement : les préparatifs, la journée, les moments forts. Conclusion : ce que tu as ressenti."])}`,
      },
      {
        title: "Décrire et écrire une lettre",
        minutes: 12,
        body: `${figure(row(pic("enveloppe", "la lettre", 56), pic("maison", "je décris ma maison", 52)), "Décrire : du général au particulier, avec des adjectifs précis et des comparaisons.")}
          ${liste([
            "<strong>décrire</strong> : aller du général au particulier, utiliser des adjectifs précis et des comparaisons, faire appel aux sens (vue, ouïe, odorat…) ;",
            "<strong>écrire une lettre</strong> : lieu et date en haut à droite, formule d’appel (Cher oncle,), le message en paragraphes, une formule de politesse, la signature.",
          ])}
          ${exemple(["Dakar, le 12 mai 2026. Cher cousin, je t’écris pour t’annoncer que j’ai réussi mon examen… Je t’embrasse. Ton cousin, Ibrahima."])}
          ${retenir("On adapte le ton au destinataire : familier pour un ami, respectueux pour un adulte ou une autorité.")}`,
      },
    ],
  },
];
