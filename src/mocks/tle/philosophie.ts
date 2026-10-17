// Philosophie de Terminale : programme de notions de la Commission nationale de philosophie (IGEN),
// mis en ligne par l'Office du Bac. Quatre domaines (réflexion philosophique, vie sociale,
// épistémologie, esthétique) découpés en axes majeurs : un axe = un chapitre, le domaine en est la
// rubrique. Les séries L ont plus d'axes que les séries S. Leçons rédigées par DIANGAL, à faire
// valider par un professeur de philosophie.

import { type ChapterSpec, exemple, type LessonSpec, liste, methode, retenir, tableau } from "./blocks";

const REFLEXION = "La réflexion philosophique";
const VIE_SOCIALE = "La vie sociale";
const EPISTEMOLOGIE = "Épistémologie";
const ESTHETIQUE = "Esthétique";

const citation = (text: string, author: string) => `<blockquote><p>« ${text} »</p><p>${author}</p></blockquote>`;

// ── Domaine 1 : la réflexion philosophique ──────────────────────────────────

const QUEST_CE_QUE_PHILO: LessonSpec = {
  title: "Qu’est-ce que la philosophie ?",
  minutes: 12,
  body: `<p>Étymologiquement, la philosophie est l’« amour de la sagesse » (en grec <em>philein</em>, aimer, et <em>sophia</em>, sagesse). Le philosophe n’est pas un sage qui possède la vérité : il la cherche.</p>
    ${citation("C’est l’étonnement qui poussa, comme aujourd’hui, les premiers penseurs aux spéculations philosophiques.", "Aristote, Métaphysique")}
    ${tableau([
      ["Sens commun (opinion)", "Philosophie"],
      ["admet les idées reçues sans les examiner", "met en question ce qui paraît évident"],
      ["s’appuie sur la coutume, l’autorité, l’émotion", "s’appuie sur la raison et l’argumentation"],
      ["donne des réponses toutes faites", "pose des problèmes et construit des concepts"],
    ])}
    ${citation("On ne peut apprendre la philosophie ; on peut seulement apprendre à philosopher.", "Kant, Critique de la raison pure")}
    ${retenir("Philosopher, c’est exercer son esprit critique : définir les mots, examiner les arguments, chercher la vérité par soi-même. Socrate disait qu’une vie sans examen ne vaut pas d’être vécue.")}`,
};

const PHILO_MYTHE_SCIENCE: LessonSpec = {
  title: "Philosophie, mythe, religion et science",
  minutes: 15,
  body: `<p>La philosophie naît en Grèce au VI<sup>e</sup> siècle avant notre ère, quand des penseurs (Thalès, Héraclite, puis Socrate, Platon, Aristote) cherchent à expliquer le monde par des raisons et non plus par des récits sur les dieux. On parle du passage du <em>mythos</em> (récit) au <em>logos</em> (discours rationnel).</p>
    ${tableau([
      ["", "Ce qui la distingue de la philosophie"],
      ["le mythe", "récit sacré transmis par la tradition, qu’on ne discute pas"],
      ["la religion", "repose sur la foi et la révélation ; la philosophie ne s’appuie que sur la raison"],
      ["la science", "étudie des objets précis par des méthodes expérimentales ou mathématiques ; la philosophie s’interroge sur le sens, les valeurs et les fondements du savoir"],
    ])}
    ${retenir("La raison est la faculté de juger, de démontrer et de distinguer le vrai du faux. Elle est le seul instrument du philosophe : c’est ce qui fait de la philosophie un savoir universel, ouvert à tous.")}
    ${exemple(["Thalès explique l’origine des choses par l’eau, un élément naturel, au lieu de l’attribuer à la volonté des dieux."])}`,
};

const GRANDES_INTERROGATIONS: LessonSpec = {
  title: "Les grandes interrogations philosophiques",
  minutes: 15,
  body: `<p>Kant résume le champ de la philosophie en quatre questions :</p>
    ${liste([
      "Que puis-je savoir ? (la connaissance)",
      "Que dois-je faire ? (la morale)",
      "Que m’est-il permis d’espérer ? (la religion, le sens de l’existence)",
      "Qu’est-ce que l’homme ? (la question qui résume les trois autres)",
    ])}
    ${tableau([
      ["Interrogation", "Objet", "Exemples de questions"],
      ["métaphysique", "ce qui dépasse l’expérience sensible", "Dieu existe-t-il ? Qu’est-ce que l’âme ? Pourquoi y a-t-il quelque chose plutôt que rien ?"],
      ["anthropologique", "l’homme", "Qu’est-ce qui distingue l’homme de l’animal ? L’homme est-il libre ?"],
      ["axiologique", "les valeurs", "Qu’est-ce que le bien, le juste, le beau, le vrai ?"],
    ])}
    ${retenir("Ces questions portent sur la destinée humaine, la mort et le sens de la vie : la philosophie ne les « règle » pas une fois pour toutes, mais elle apprend à les poser correctement.")}`,
};

const FONCTIONS_PHILO: LessonSpec = {
  title: "Les fonctions de la pensée philosophique",
  minutes: 12,
  body: `${liste([
      "<strong>fonction critique</strong> : examiner les préjugés, les opinions et les pouvoirs ;",
      "<strong>fonction libératrice</strong> : apprendre à penser par soi-même ;",
      "<strong>fonction de synthèse</strong> : relier les savoirs dispersés et s’interroger sur leurs fondements ;",
      "<strong>fonction éthique</strong> : réfléchir à la manière de bien vivre et d’agir.",
    ])}
    ${citation("Sapere aude ! Aie le courage de te servir de ton propre entendement.", "Kant, Qu’est-ce que les Lumières ?")}
    ${retenir("La philosophie semble « inutile » parce qu’elle ne produit pas d’objets ; mais elle forme des citoyens capables de juger et de refuser la manipulation.")}`,
};

const PHILO_IDEOLOGIE: LessonSpec = {
  title: "Philosophie et idéologie",
  minutes: 12,
  body: `<p>Une <strong>idéologie</strong> est un système d’idées qui justifie les intérêts d’un groupe ou d’un pouvoir, en se présentant comme une vérité évidente.</p>
    ${citation("Ce n’est pas la conscience des hommes qui détermine leur être ; c’est inversement leur être social qui détermine leur conscience.", "Marx, Contribution à la critique de l’économie politique")}
    ${tableau([
      ["Idéologie", "Philosophie"],
      ["affirme et cherche l’adhésion", "interroge et cherche la vérité"],
      ["sert un intérêt particulier", "vise l’universel"],
      ["refuse la critique", "se soumet à la critique, y compris sur elle-même"],
    ])}
    ${retenir("La philosophie peut elle-même devenir idéologie quand elle sert à justifier une domination (par exemple les théories qui ont justifié l’esclavage ou la colonisation) : d’où l’importance de la vigilance critique.")}`,
};

const PHILOSOPHER_AUJOURDHUI: LessonSpec = {
  title: "Philosopher aujourd’hui",
  minutes: 10,
  body: `<p>Les sciences ont pris à la philosophie beaucoup de ses anciens objets (la nature, la société, le psychisme). Mais de nouvelles questions apparaissent, que la science seule ne peut trancher :</p>
    ${liste([
      "bioéthique : clonage, manipulations génétiques, fin de vie ;",
      "écologie : responsabilité envers les générations futures ;",
      "numérique : vie privée, vérité de l’information, intelligence artificielle ;",
      "mondialisation, migrations, droits humains, développement de l’Afrique.",
    ])}
    ${retenir("Philosopher aujourd’hui, c’est penser les problèmes de son temps et de son milieu avec rigueur, en dialogue avec les autres disciplines.")}`,
};

const PHILO_AFRICAINE_REPERES: LessonSpec = {
  title: "La philosophie africaine : repères historiques",
  minutes: 15,
  body: `${tableau([
      ["Repère", "Apport"],
      ["Placide Tempels, <em>La Philosophie bantoue</em> (1945)", "affirme que les Bantous ont une philosophie, centrée sur la « force vitale »"],
      ["Alexis Kagame, <em>La philosophie bantu-rwandaise de l’être</em> (1956)", "dégage une philosophie à partir de la langue kinyarwanda"],
      ["Cheikh Anta Diop, <em>Nations nègres et culture</em> (1954)", "rattache l’Égypte ancienne au monde noir et en fait une source de la pensée"],
      ["Léopold Sédar Senghor et la négritude", "valorise les valeurs culturelles du monde noir"],
    ])}
    ${retenir("La question « existe-t-il une philosophie africaine ? » naît dans le contexte colonial, où l’on refusait aux Africains la capacité de penser rationnellement. Y répondre était un enjeu de dignité.")}`,
};

const PHILO_AFRICAINE_DEBATS: LessonSpec = {
  title: "La philosophie africaine : débats et controverses",
  minutes: 15,
  body: `<p>L’approche de Tempels, appelée <strong>ethnophilosophie</strong>, a été vivement critiquée.</p>
    ${liste([
      "Paulin Hountondji (<em>Sur la « philosophie africaine »</em>, 1976) : une « philosophie collective » et implicite d’un peuple n’est pas une philosophie ; la philosophie est un travail critique, écrit et individuel, ouvert à la discussion ;",
      "Marcien Towa : l’Afrique doit s’approprier la pensée critique et scientifique pour se libérer ;",
      "d’autres défendent la valeur des sagesses traditionnelles (proverbes, contes, pensée des sages).",
    ])}
    ${retenir("Aujourd’hui, la philosophie africaine est surtout la philosophie faite par des Africains sur tous les problèmes, y compris ceux de l’Afrique (développement, démocratie, langues, identités). Souleymane Bachir Diagne, philosophe sénégalais, en est un représentant.")}
    ${exemple(["Sujet type : « Peut-on parler d’une philosophie africaine ? » On distingue le sens large (vision du monde) et le sens strict (activité critique)."], "Pour la dissertation")}`,
};

// ── Domaine 2 : la vie sociale ──────────────────────────────────────────────

const INNE_ACQUIS: LessonSpec = {
  title: "L’inné, l’acquis et le fait culturel",
  minutes: 15,
  body: `<p>La <strong>nature</strong> désigne ce qui est donné à la naissance (l’inné) ; la <strong>culture</strong>, ce que l’homme acquiert et transmet par l’éducation : langage, techniques, croyances, règles.</p>
    ${exemple(["Les « enfants sauvages », comme Victor de l’Aveyron, élevés hors de toute société, ne parlaient pas et marchaient à quatre pattes : sans culture, l’homme ne développe pas son humanité."])}
    ${liste([
      "Lévi-Strauss : la prohibition de l’inceste est une règle universelle, présente dans toutes les sociétés ; elle marque le passage de la nature à la culture ;",
      "<strong>relativité</strong> des cultures : chaque culture a ses valeurs, aucune n’est la mesure de toutes les autres ;",
      "<strong>universalité</strong> : toutes les cultures ont en commun des structures (langage, règles, croyances) et peuvent dialoguer.",
    ])}
    ${citation("Le barbare, c’est d’abord l’homme qui croit à la barbarie.", "Claude Lévi-Strauss, Race et histoire")}
    ${retenir("L’<strong>ethnocentrisme</strong> consiste à juger les autres cultures à partir de la sienne. Il a servi à justifier la colonisation.")}`,
};

const TRAVAIL: LessonSpec = {
  title: "Le travail",
  minutes: 15,
  body: `<p>Le <strong>travail</strong> est l’activité par laquelle l’homme transforme la nature pour satisfaire ses besoins.</p>
    ${tableau([
      ["Conception", "Idée"],
      ["malédiction", "dans la Bible, le travail est une peine (« Tu gagneras ton pain à la sueur de ton front ») ; étymologiquement, <em>tripalium</em> est un instrument de torture"],
      ["humanisation", "Hegel : dans la dialectique du maître et de l’esclave, c’est l’esclave qui, par le travail, se forme et se libère"],
      ["aliénation", "Marx : dans le travail à la chaîne et le salariat capitaliste, l’ouvrier est dépossédé du produit de son travail"],
    ])}
    ${citation("L’intelligence est la faculté de fabriquer des objets artificiels, en particulier des outils à faire des outils.", "Bergson, L’Évolution créatrice")}
    ${retenir("Le travail est à la fois une contrainte et un moyen de réalisation de soi. La technique prolonge le travail : elle accroît la puissance humaine (développement), mais peut aussi asservir.")}`,
};

const LANGAGE_PENSEE: LessonSpec = {
  title: "Langage, pensée et communication",
  minutes: 15,
  body: `<p>Le <strong>langage</strong> est la faculté de communiquer au moyen de signes. La langue est un système de signes propre à une communauté (wolof, pulaar, français…).</p>
    ${liste([
      "Benveniste : la « danse » des abeilles transmet une information, mais elle n’est pas un langage : elle ne permet ni dialogue, ni invention de messages nouveaux ;",
      "Descartes : la parole est le signe que l’homme pense, ce qui le distingue de l’animal et de la machine.",
    ])}
    ${citation("C’est dans les mots que nous pensons.", "Hegel, Encyclopédie des sciences philosophiques")}
    ${tableau([
      ["Thèse", "Idée"],
      ["le langage traduit une pensée déjà là", "on pense d’abord, puis on cherche les mots"],
      ["le langage forme la pensée", "pas de pensée claire sans mots (Hegel) ; l’ineffable est une pensée encore confuse"],
    ])}
    ${retenir("Fonctions du langage (Jakobson) : expressive, conative (agir sur l’autre), référentielle (informer), phatique, poétique, métalinguistique. La communication peut aussi manipuler : propagande, publicité, rumeurs.")}`,
};

const INDIVIDU_SOCIETE: LessonSpec = {
  title: "Individu, personne et société",
  minutes: 15,
  body: `${tableau([
      ["Notion", "Définition"],
      ["individu", "être unique, distinct des autres (« qui ne peut être divisé »)"],
      ["personne", "être humain doué de raison et de liberté, sujet de droits et de devoirs, qui a une dignité"],
      ["société", "groupe d’individus liés par des règles, des institutions et une culture communes"],
    ])}
    ${citation("L’homme est par nature un animal politique.", "Aristote, Politique")}
    ${liste([
      "pour Aristote, l’homme ne réalise son humanité que dans la cité ;",
      "pour Durkheim, le <strong>fait social</strong> (règles, langue, mœurs) s’impose à l’individu de l’extérieur ;",
      "pour Kant, la personne doit toujours être traitée comme une fin, jamais simplement comme un moyen.",
    ])}
    ${retenir("L’individu reçoit tout de la société (langue, éducation, valeurs), mais il peut aussi la transformer. En Afrique, on souligne souvent la primauté de la communauté (« Nit nitay garabam » : l’homme est le remède de l’homme).")}`,
};

const NORMES: LessonSpec = {
  title: "Les normes : conformité et déviance",
  minutes: 12,
  body: `<p>Une <strong>norme</strong> est une règle qui dit ce qui doit être fait. On distingue :</p>
    ${liste([
      "les normes <strong>juridiques</strong> (lois, sanctionnées par l’État) ;",
      "les normes <strong>morales</strong> (sanction de la conscience) ;",
      "les normes <strong>sociales</strong> : coutumes, politesse, mode (sanction du groupe) ;",
      "les normes <strong>religieuses</strong>.",
    ])}
    <p>La <strong>conformité</strong> est l’adhésion aux normes ; la <strong>déviance</strong>, leur transgression.</p>
    ${retenir("La déviance n’est pas toujours négative : certains « déviants » ont fait progresser la société (Socrate, les combattants contre l’esclavage ou la colonisation). Mais sans normes communes, la vie sociale devient impossible.")}
    ${exemple(["Sujet type : « Faut-il toujours obéir aux lois ? » On distingue la légalité (ce qui est conforme à la loi) et la légitimité (ce qui est juste)."], "Pour la dissertation")}`,
};

const CONSCIENCE: LessonSpec = {
  title: "La conscience",
  minutes: 15,
  body: `<p>La <strong>conscience psychologique</strong> est la connaissance que le sujet a de lui-même et de ce qu’il vit. La <strong>conscience morale</strong> est la faculté de juger le bien et le mal de ses actes.</p>
    ${citation("Je pense, donc je suis.", "Descartes, Discours de la méthode")}
    ${liste([
      "Descartes : on peut douter de tout, sauf du fait qu’on pense ; la conscience est la première certitude et fonde le sujet ;",
      "Husserl : « toute conscience est conscience de quelque chose » (intentionnalité) ;",
      "Rousseau : la conscience morale est un « instinct divin », un juge infaillible du bien et du mal.",
    ])}
    ${retenir("La conscience fait de l’homme un sujet responsable : on n’est responsable que de ce qu’on fait consciemment. Mais la conscience est-elle transparente à elle-même ? C’est la question de l’inconscient.")}`,
};

const INCONSCIENT: LessonSpec = {
  title: "L’inconscient psychique et la personnalité",
  minutes: 15,
  body: `<p>Pour Freud, une grande partie de notre vie psychique échappe à la conscience : c’est l’<strong>inconscient</strong>. Des désirs refoulés, souvent liés à l’enfance, s’y trouvent et cherchent à s’exprimer.</p>
    ${tableau([
      ["Instance", "Rôle"],
      ["le ça", "réservoir des pulsions, régi par le principe de plaisir"],
      ["le surmoi", "intériorisation des interdits parentaux et sociaux"],
      ["le moi", "cherche un compromis entre le ça, le surmoi et la réalité"],
    ])}
    ${liste([
      "manifestations : rêves (« voie royale » vers l’inconscient), lapsus, actes manqués, symptômes névrotiques ;",
      "Freud : « le moi n’est pas maître dans sa propre maison ».",
    ])}
    ${retenir("La personnalité se forme par l’interaction de l’hérédité, de l’éducation, du milieu social et de l’histoire personnelle. L’inconscient pose un problème moral : si mes actes viennent de l’inconscient, suis-je encore responsable ?")}`,
};

const LIBERTE_DETERMINISME: LessonSpec = {
  title: "Liberté, déterminisme et fatalisme",
  minutes: 15,
  body: `${tableau([
      ["Notion", "Définition"],
      ["liberté", "pouvoir d’agir selon sa volonté, sans contrainte"],
      ["déterminisme", "tout phénomène a des causes qui le produisent nécessairement (sciences)"],
      ["fatalisme", "croyance que tout est écrit d’avance, quoi qu’on fasse"],
    ])}
    ${liste([
      "Spinoza : les hommes se croient libres parce qu’ils sont conscients de leurs actions mais ignorants des causes qui les déterminent ;",
      "Sartre : « l’homme est condamné à être libre » ; l’existence précède l’essence, l’homme se définit par ses choix ;",
      "le déterminisme n’est pas le fatalisme : connaître les causes permet d’agir sur elles (la médecine guérit en connaissant les causes de la maladie).",
    ])}
    ${retenir("La liberté n’est pas l’absence de toute contrainte (« faire ce qu’on veut ») : pour Rousseau, « l’obéissance à la loi qu’on s’est prescrite est liberté ».")}`,
};

const LIBRE_ARBITRE: LessonSpec = {
  title: "Libre-arbitre et responsabilité",
  minutes: 12,
  body: `<p>Le <strong>libre-arbitre</strong> est le pouvoir de choisir entre plusieurs possibles. Pour Descartes, la volonté est infinie : c’est en elle que l’homme ressemble le plus à Dieu.</p>
    ${liste([
      "être <strong>responsable</strong>, c’est devoir répondre de ses actes ;",
      "pas de responsabilité sans liberté : on n’accuse pas un enfant ou un malade mental comme un adulte sain ;",
      "la responsabilité est morale (devant sa conscience) et juridique (devant la loi).",
    ])}
    ${retenir("Invoquer le destin, l’inconscient ou la société pour excuser tous ses actes, c’est la « mauvaise foi » (Sartre) : une manière de fuir sa liberté.")}
    ${exemple(["Sujet type : « L’homme est-il responsable de ce qu’il est ? »"], "Pour la dissertation")}`,
};

const GENESE_ETAT: LessonSpec = {
  title: "Le fait politique et la genèse de l’État",
  minutes: 15,
  body: `<p>Le <strong>politique</strong> concerne l’organisation du pouvoir dans une société. L’<strong>État</strong> est l’institution qui détient l’autorité souveraine sur un territoire et une population.</p>
    ${tableau([
      ["Théorie", "Origine de l’État"],
      ["naturelle (Aristote)", "la cité est naturelle : l’homme est un animal politique"],
      ["contractuelle (Hobbes, Rousseau)", "les hommes sortent de l’état de nature par un contrat social"],
      ["marxiste", "l’État naît de la lutte des classes ; il est l’instrument de la classe dominante"],
    ])}
    ${liste([
      "Hobbes (<em>Léviathan</em>) : à l’état de nature règne « la guerre de chacun contre chacun » ; les hommes confient leur pouvoir à un souverain pour obtenir la sécurité ;",
      "Rousseau (<em>Du contrat social</em>) : « L’homme est né libre, et partout il est dans les fers » ; le contrat légitime fonde le peuple souverain, guidé par la volonté générale.",
    ])}
    ${retenir("Pour Max Weber, l’État revendique avec succès le monopole de la violence physique légitime.")}`,
};

const ETAT_FORMES: LessonSpec = {
  title: "Formes, fonctions et finalités de l’État",
  minutes: 15,
  body: `${tableau([
      ["Forme", "Qui gouverne ?"],
      ["monarchie", "un seul, selon des lois"],
      ["aristocratie, oligarchie", "un petit nombre"],
      ["démocratie", "le peuple, directement ou par ses représentants"],
      ["dictature, tyrannie", "un seul, sans limites ni lois"],
    ])}
    ${liste([
      "fonctions : faire les lois (législatif), les appliquer (exécutif), juger (judiciaire), assurer la sécurité, l’éducation, la santé ;",
      "Montesquieu : pour éviter l’abus de pouvoir, « il faut que, par la disposition des choses, le pouvoir arrête le pouvoir » (séparation des pouvoirs) ;",
      "finalités : la sécurité (Hobbes), la liberté (Rousseau, Spinoza), la justice et le bien commun.",
    ])}
    ${retenir("L’État de droit est un État qui se soumet lui-même au droit : la Constitution limite le pouvoir et garantit les libertés.")}`,
};

const ETAT_MONDIALISATION: LessonSpec = {
  title: "État, droits, libertés et mondialisation",
  minutes: 12,
  body: `<p>L’État moderne doit garantir les <strong>droits humains</strong> (Déclaration universelle de 1948) et les libertés fondamentales : d’expression, de culte, d’association, de circulation.</p>
    <p>La <strong>mondialisation</strong> désigne l’intégration croissante des économies, des communications et des cultures à l’échelle de la planète.</p>
    ${liste([
      "elle affaiblit la souveraineté des États face aux multinationales, aux marchés financiers et aux institutions internationales ;",
      "elle diffuse les droits humains et les techniques, mais aussi les inégalités et l’uniformisation culturelle ;",
      "elle pose la question d’une gouvernance mondiale (ONU, Union africaine, CEDEAO).",
    ])}
    ${retenir("Problème : l’État est-il encore le cadre pertinent du politique à l’heure de la mondialisation ?")}`,
};

// ── Domaine 3 : épistémologie ───────────────────────────────────────────────

const FORMES_CONNAISSANCE: LessonSpec = {
  title: "Les formes de la connaissance",
  minutes: 12,
  body: `${tableau([
      ["Connaissance", "Définition"],
      ["sensible", "donnée par les sens ; immédiate mais parfois trompeuse (illusions)"],
      ["empirique", "tirée de l’expérience répétée et de l’habitude (savoir-faire du pêcheur, du paysan)"],
      ["intuitive", "saisie immédiate d’une vérité par l’esprit"],
      ["discursive", "obtenue par un raisonnement, étape par étape (démonstration)"],
    ])}
    <p>Avant la science, l’homme a expliqué le monde par le <strong>mythe</strong>, la <strong>magie</strong> (agir sur la nature par des rites) et la <strong>religion</strong>.</p>
    ${retenir("Auguste Comte décrit trois états de l’esprit humain : théologique (explication par les dieux), métaphysique (par des forces abstraites), positif (par des lois vérifiées par l’observation).")}`,
};

const NAISSANCE_SCIENCE: LessonSpec = {
  title: "Naissance de la science et obstacles épistémologiques",
  minutes: 15,
  body: `<p>La science moderne naît au XVII<sup>e</sup> siècle avec Galilée, qui allie mathématiques et expérience : « le livre de la nature est écrit en langage mathématique ». Elle suppose la rupture avec l’opinion et l’autorité.</p>
    ${citation("Rien ne va de soi. Rien n’est donné. Tout est construit.", "Gaston Bachelard, La Formation de l’esprit scientifique")}
    <p>Pour Bachelard, la connaissance scientifique se construit contre des <strong>obstacles épistémologiques</strong> :</p>
    ${liste([
      "l’expérience première, immédiate et pittoresque ;",
      "l’opinion (« l’opinion pense mal ; elle ne pense pas ») ;",
      "la généralisation hâtive, les images et les mots trop familiers.",
    ])}
    ${retenir("L’histoire des sciences n’est pas une accumulation tranquille de vérités, mais une suite de ruptures et de rectifications d’erreurs.")}`,
};

const METHODE_SCIENTIFIQUE: LessonSpec = {
  title: "La connaissance scientifique : principes et méthodes",
  minutes: 15,
  body: `${methode([
      "<strong>Observation</strong> d’un fait polémique, qui pose problème.",
      "<strong>Hypothèse</strong> : explication provisoire.",
      "<strong>Expérimentation</strong> : on produit les conditions pour vérifier l’hypothèse.",
      "<strong>Loi</strong> ou <strong>théorie</strong> : énoncé général, souvent mathématique.",
    ], "La méthode expérimentale (Claude Bernard)")}
    ${liste([
      "principes : déterminisme (mêmes causes, mêmes effets), objectivité, mesure ;",
      "Popper : une théorie est scientifique si elle est <strong>réfutable</strong> (falsifiable) ; aucune expérience ne prouve définitivement une théorie, mais une seule peut la réfuter.",
    ])}
    ${retenir("La science ne dit pas « la » vérité définitive : elle avance par théories toujours révisables.")}`,
};

const SCIENCES_FORMELLES: LessonSpec = {
  title: "Les sciences formelles : logique et mathématiques",
  minutes: 12,
  body: `<p>La logique et les mathématiques ne portent pas sur des faits mais sur des formes de raisonnement. Elles procèdent par <strong>déduction</strong> à partir d’axiomes et de définitions.</p>
    ${liste([
      "une proposition mathématique est vraie si elle est démontrée sans contradiction à partir des axiomes ;",
      "les géométries non euclidiennes (Lobatchevski, Riemann) ont montré qu’on peut changer d’axiomes : la vérité mathématique est une cohérence interne, non une copie du réel.",
    ])}
    ${retenir("Paradoxe : alors que les mathématiques sont une construction de l’esprit, elles s’appliquent remarquablement au monde physique.")}`,
};

const SCIENCES_NATURE_HOMME: LessonSpec = {
  title: "Sciences de la nature et sciences de l’homme",
  minutes: 15,
  body: `${tableau([
      ["", "Sciences de la nature", "Sciences de l’homme"],
      ["exemples", "physique, chimie, biologie", "psychologie, sociologie, histoire, économie, linguistique"],
      ["objet", "des phénomènes qui obéissent à des lois", "l’homme, être conscient et libre"],
      ["méthode", "expérimentation, mesure, prévision", "observation, enquête, statistique, interprétation"],
    ])}
    ${citation("Nous expliquons la nature, nous comprenons la vie psychique.", "Wilhelm Dilthey")}
    ${liste([
      "difficultés des sciences humaines : le chercheur est juge et partie, l’expérimentation est souvent impossible ou immorale, l’homme peut changer de comportement quand il se sait observé ;",
      "elles cherchent cependant l’objectivité par des méthodes rigoureuses.",
    ])}
    ${retenir("La vérité des sciences de la nature est une correspondance vérifiée avec les faits ; elle reste approchée et révisable.")}`,
};

const VERITE: LessonSpec = {
  title: "Le problème de la vérité",
  minutes: 12,
  body: `${tableau([
      ["Conception de la vérité", "Critère"],
      ["vérité-correspondance", "une idée est vraie si elle est conforme à la réalité"],
      ["vérité-cohérence", "un énoncé est vrai s’il ne contredit pas le système dont il fait partie (mathématiques)"],
      ["vérité-évidence (Descartes)", "est vrai ce que je conçois clairement et distinctement"],
      ["pragmatisme", "est vrai ce qui réussit, ce qui est utile"],
    ])}
    ${retenir("On distingue la vérité (qualité d’un jugement) de la réalité (ce qui existe). L’erreur n’est pas le mensonge : se tromper n’est pas tromper.")}
    ${exemple(["Sujet type : « La science peut-elle tout expliquer ? »"], "Pour la dissertation")}`,
};

const TECHNIQUE: LessonSpec = {
  title: "Science et technique",
  minutes: 12,
  body: `<p>La <strong>technique</strong> est l’ensemble des procédés par lesquels l’homme transforme la nature pour ses besoins. Elle est plus ancienne que la science (outils de la préhistoire).</p>
    ${liste([
      "la technique a aidé la science : la lunette de Galilée, le microscope, les instruments de mesure ;",
      "la science a transformé la technique : on parle de <strong>technoscience</strong> (électricité, informatique, génie génétique) ;",
      "Descartes rêvait de rendre les hommes « comme maîtres et possesseurs de la nature ».",
    ])}
    ${retenir("La science cherche à connaître (le vrai) ; la technique cherche à agir efficacement (l’utile). Elles sont aujourd’hui étroitement liées.")}`,
};

const SCIENCE_AXIOLOGIE: LessonSpec = {
  title: "Science, technique et valeurs",
  minutes: 12,
  body: `${citation("Science sans conscience n’est que ruine de l’âme.", "Rabelais, Pantagruel")}
    ${liste([
      "le progrès scientifique a apporté la médecine moderne, la mécanisation, les communications ;",
      "il a aussi produit la bombe atomique, la pollution, les manipulations génétiques ;",
      "Hans Jonas (<em>Le Principe responsabilité</em>) : notre puissance technique nous rend responsables des générations futures.",
    ])}
    ${retenir("La science dit ce qui est et ce qui est possible, pas ce qui doit être fait : les valeurs (axiologie) relèvent de l’éthique et du débat démocratique. D’où les comités d’éthique.")}
    ${exemple(["Sujet type : « Le progrès technique est-il toujours un progrès humain ? »"], "Pour la dissertation")}`,
};

// ── Domaine 4 : esthétique ──────────────────────────────────────────────────

const LE_BEAU: LessonSpec = {
  title: "Le beau et l’expérience artistique",
  minutes: 12,
  body: `${citation("Est beau ce qui plaît universellement sans concept.", "Kant, Critique de la faculté de juger")}
    ${liste([
      "le beau n’est pas l’agréable (qui dépend des goûts de chacun) ni l’utile ;",
      "le jugement de goût est subjectif mais prétend à l’universalité : « tous les goûts sont dans la nature » est vrai pour l’agréable, pas pour le beau ;",
      "Hegel : le beau artistique est supérieur au beau naturel, car il est produit par l’esprit.",
    ])}
    ${retenir("L’expérience esthétique est une contemplation désintéressée : on apprécie l’œuvre pour elle-même, non pour l’usage qu’on peut en faire.")}`,
};

const ART_REALITE: LessonSpec = {
  title: "Art, réalité et création artistique",
  minutes: 15,
  body: `${tableau([
      ["Thèse", "Idée"],
      ["l’art imite la nature (Platon)", "l’œuvre est une copie de copie, éloignée de la vérité"],
      ["l’art révèle la réalité", "il montre ce que nous ne voyons pas (Bergson : l’artiste écarte le voile de l’habitude)"],
      ["l’art crée une autre réalité", "l’art abstrait ne représente rien d’existant"],
    ])}
    ${liste([
      "la <strong>création</strong> artistique mêle inspiration, travail et technique ;",
      "Kant : le <strong>génie</strong> est le talent qui donne ses règles à l’art ;",
      "l’œuvre d’art est unique, alors que le produit technique est reproductible.",
    ])}
    ${retenir("Un artiste n’est pas un simple artisan : l’artisan applique une règle connue, l’artiste invente.")}`,
};

const FONCTIONS_ART: LessonSpec = {
  title: "Les arts et leurs fonctions",
  minutes: 12,
  body: `<p>Les arts : architecture, sculpture, peinture, musique, danse, poésie, théâtre, cinéma…</p>
    ${tableau([
      ["Fonction", "Exemple"],
      ["expressive", "exprimer des émotions (chant, poésie)"],
      ["magico-religieuse", "masques et statues des cérémonies traditionnelles africaines"],
      ["commémorative", "monuments, épopées des griots (Soundjata)"],
      ["subversive", "contester l’ordre établi (rap, caricature, littérature engagée)"],
      ["décorative et esthétique", "tissage, bijoux, architecture"],
    ])}
    ${retenir("Senghor souligne que l’art négro-africain est fonctionnel et collectif : il est lié à la vie de la communauté. La question « l’art est-il utile ? » oppose l’art pour l’art à l’art engagé.")}`,
};

// ── Méthodologie ────────────────────────────────────────────────────────────

const DISSERTATION: LessonSpec = {
  title: "La dissertation philosophique",
  minutes: 18,
  body: `${methode([
      "<strong>Analyser le sujet</strong> : définir chaque mot, repérer les présupposés et la question posée.",
      "<strong>Problématiser</strong> : montrer pourquoi la question fait difficulté (deux réponses possibles qui s’opposent).",
      "<strong>Construire un plan</strong> : souvent dialectique (thèse, antithèse, dépassement) ou progressif.",
      "<strong>Rédiger</strong> : chaque partie défend une idée, appuyée sur des arguments, des auteurs et des exemples précis.",
    ])}
    ${liste([
      "introduction : amorce, énoncé du sujet, problème, annonce du plan ;",
      "transitions entre les parties ;",
      "conclusion : bilan, réponse nuancée au problème, éventuellement une ouverture.",
    ])}
    ${retenir("Une citation ne remplace pas un argument : il faut l’expliquer et l’utiliser. Au bac, le candidat choisit entre deux sujets de dissertation et un commentaire de texte.")}`,
};

const COMMENTAIRE: LessonSpec = {
  title: "Le commentaire de texte philosophique",
  minutes: 15,
  body: `${methode([
      "Lire le texte plusieurs fois et repérer son <strong>thème</strong> (de quoi il parle).",
      "Dégager la <strong>thèse</strong> (ce que l’auteur affirme) et le <strong>problème</strong> auquel il répond.",
      "Repérer la <strong>structure</strong> du texte (ses mouvements, les connecteurs logiques).",
      "<strong>Expliquer</strong> chaque mouvement : définir les concepts, éclairer les exemples, montrer l’enchaînement des idées.",
      "<strong>Discuter</strong> : intérêt philosophique, limites, autres auteurs.",
    ])}
    ${retenir("Expliquer n’est pas paraphraser : il faut dire ce que le texte veut dire et pourquoi il le dit ainsi.")}`,
};

// ── Chapitres ───────────────────────────────────────────────────────────────

const methodologie: ChapterSpec = {
  title: "Méthodologie de la dissertation et du commentaire",
  summary: "Analyser un sujet, problématiser, construire un plan ; expliquer et discuter un texte.",
  strand: "Méthodologie",
  lessons: [DISSERTATION, COMMENTAIRE],
};

const philosophieAfricaine: ChapterSpec = {
  title: "L’idée d’une philosophie africaine",
  summary: "Repères historiques et débats : ethnophilosophie, négritude, philosophie critique.",
  strand: REFLEXION,
  lessons: [PHILO_AFRICAINE_REPERES, PHILO_AFRICAINE_DEBATS],
};

const natureCulture: ChapterSpec = {
  title: "Nature et culture",
  summary: "L’inné et l’acquis, relativité et universalité des cultures, le travail, le langage.",
  strand: VIE_SOCIALE,
  lessons: [INNE_ACQUIS, TRAVAIL, LANGAGE_PENSEE],
};

const individuSociete: ChapterSpec = {
  title: "Individu et société",
  summary: "Individu, personne et société ; les normes, la conformité et la déviance.",
  strand: VIE_SOCIALE,
  lessons: [INDIVIDU_SOCIETE, NORMES],
};

const liberte: ChapterSpec = {
  title: "La liberté",
  summary: "Liberté, déterminisme et fatalisme ; libre-arbitre et responsabilité.",
  strand: VIE_SOCIALE,
  lessons: [LIBERTE_DETERMINISME, LIBRE_ARBITRE],
};

const emergenceScience: ChapterSpec = {
  title: "L’émergence de la pensée scientifique",
  summary: "Formes de connaissance, naissance de la science, obstacles épistémologiques, méthode.",
  strand: EPISTEMOLOGIE,
  lessons: [FORMES_CONNAISSANCE, NAISSANCE_SCIENCE, METHODE_SCIENTIFIQUE],
};

const typesSciences: ChapterSpec = {
  title: "Les différents types de sciences",
  summary: "Sciences formelles, sciences de la nature et de l’homme, problème de la vérité.",
  strand: EPISTEMOLOGIE,
  lessons: [SCIENCES_FORMELLES, SCIENCES_NATURE_HOMME, VERITE],
};

const scienceTechnique: ChapterSpec = {
  title: "Science et technique",
  summary: "Rapports entre science et technique, progrès et valeurs.",
  strand: EPISTEMOLOGIE,
  lessons: [TECHNIQUE, SCIENCE_AXIOLOGIE],
};

const representationArtistique: ChapterSpec = {
  title: "La représentation artistique",
  summary: "Le beau, l’expérience esthétique, art et réalité, la création.",
  strand: ESTHETIQUE,
  lessons: [LE_BEAU, ART_REALITE],
};

const formesArt: ChapterSpec = {
  title: "Formes et fonctions de l’art",
  summary: "Les arts et leurs fonctions, l’art négro-africain.",
  strand: ESTHETIQUE,
  lessons: [FONCTIONS_ART],
};

/** Toutes séries L (L1, L’1, L2) : coefficient 4. */
export const PHILO_TLE_L: ChapterSpec[] = [
  {
    title: "Origines et spécificité de la réflexion philosophique",
    summary: "Définir la philosophie, la distinguer du sens commun, du mythe, de la religion et de la science.",
    strand: REFLEXION,
    lessons: [QUEST_CE_QUE_PHILO, PHILO_MYTHE_SCIENCE],
  },
  {
    title: "Les grandes interrogations philosophiques",
    summary: "Interrogations métaphysique, anthropologique et axiologique.",
    strand: REFLEXION,
    lessons: [GRANDES_INTERROGATIONS],
  },
  {
    title: "Enjeux, finalités et perspectives philosophiques",
    summary: "Fonctions de la philosophie, philosophie et idéologie, philosopher aujourd’hui.",
    strand: REFLEXION,
    lessons: [FONCTIONS_PHILO, PHILO_IDEOLOGIE, PHILOSOPHER_AUJOURDHUI],
  },
  philosophieAfricaine,
  natureCulture,
  individuSociete,
  {
    title: "Conscience et inconscient",
    summary: "Conscience psychologique et morale, inconscient psychique, formation de la personnalité.",
    strand: VIE_SOCIALE,
    lessons: [CONSCIENCE, INCONSCIENT],
  },
  liberte,
  {
    title: "L’État",
    summary: "Genèse, formes, fonctions et finalités de l’État ; droits, libertés et mondialisation.",
    strand: VIE_SOCIALE,
    lessons: [GENESE_ETAT, ETAT_FORMES, ETAT_MONDIALISATION],
  },
  emergenceScience,
  typesSciences,
  scienceTechnique,
  representationArtistique,
  formesArt,
  methodologie,
];

/** Séries S (S1, S2, S3) et G : coefficient 2. */
export const PHILO_TLE_S: ChapterSpec[] = [
  {
    title: "Origines et spécificité de la réflexion philosophique",
    summary: "Définir la philosophie, rôle de la raison, grandes interrogations philosophiques.",
    strand: REFLEXION,
    lessons: [QUEST_CE_QUE_PHILO, PHILO_MYTHE_SCIENCE, GRANDES_INTERROGATIONS],
  },
  {
    title: "Enjeux, finalités et perspectives philosophiques",
    summary: "Fonctions de la pensée philosophique, philosopher aujourd’hui.",
    strand: REFLEXION,
    lessons: [FONCTIONS_PHILO, PHILOSOPHER_AUJOURDHUI],
  },
  philosophieAfricaine,
  natureCulture,
  individuSociete,
  liberte,
  {
    title: "L’État",
    summary: "Formes, fonctions et finalités de l’État ; la mondialisation.",
    strand: VIE_SOCIALE,
    lessons: [ETAT_FORMES, ETAT_MONDIALISATION],
  },
  emergenceScience,
  typesSciences,
  scienceTechnique,
  representationArtistique,
  formesArt,
  methodologie,
];
