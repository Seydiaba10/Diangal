// Philosophie de Terminale : programme de notions de la Commission nationale de philosophie (IGEN),
// mis en ligne par l'Office du Bac. Quatre domaines (réflexion philosophique, vie sociale,
// épistémologie, esthétique) découpés en axes majeurs : un axe = un chapitre, le domaine en est la
// rubrique. Les séries L ont plus d’axes que les séries S. Dernier chapitre : les œuvres au
// programme (Discours de la méthode pour toutes les séries, Ménon en plus pour les séries L).
// Leçons rédigées par DIANGAL, à faire valider par un professeur de philosophie.

import { auBac, type ChapterSpec, exemple, exercice, type LessonSpec, liste, methode, objectifs, retenir, tableau } from "./blocks";

const REFLEXION = "La réflexion philosophique";
const VIE_SOCIALE = "La vie sociale";
const EPISTEMOLOGIE = "Épistémologie";
const ESTHETIQUE = "Esthétique";
const OEUVRES = "Lecture des œuvres";

const citation = (text: string, author: string) => `<blockquote><p>« ${text} »</p><p>${author}</p></blockquote>`;

// ── Domaine 1 : la réflexion philosophique ──────────────────────────────────

const QUEST_CE_QUE_PHILO: LessonSpec = {
  title: "Qu’est-ce que la philosophie ?",
  minutes: 30,
  body: `${objectifs([
      "définir la philosophie et son origine ;",
      "distinguer la réflexion philosophique du sens commun ;",
      "comprendre ce que signifie « apprendre à philosopher ».",
    ])}
    <p>Étymologiquement, la philosophie est l’« amour de la sagesse » (en grec <em>philein</em>, aimer, et <em>sophia</em>, sagesse). Le philosophe n’est pas un sage qui possède la vérité : il la cherche.</p>
    ${citation("C’est l’étonnement qui poussa, comme aujourd’hui, les premiers penseurs aux spéculations philosophiques.", "Aristote, Métaphysique")}
    ${tableau([
      ["Sens commun (opinion)", "Philosophie"],
      ["admet les idées reçues sans les examiner", "met en question ce qui paraît évident"],
      ["s’appuie sur la coutume, l’autorité, l’émotion", "s’appuie sur la raison et l’argumentation"],
      ["donne des réponses toutes faites", "pose des problèmes et construit des concepts"],
    ])}
    ${citation("On ne peut apprendre la philosophie ; on peut seulement apprendre à philosopher.", "Kant, Critique de la raison pure")}
    ${retenir("Philosopher, c’est exercer son esprit critique : définir les mots, examiner les arguments, chercher la vérité par soi-même. Socrate disait qu’une vie sans examen ne vaut pas d’être vécue.")}
    <h2>Les traits de l’attitude philosophique</h2>
    ${liste([
      "<strong>l’étonnement</strong> devant ce qui paraît aller de soi ;",
      "<strong>le doute méthodique</strong> : ne rien admettre sans l’avoir examiné (Descartes) ;",
      "<strong>la rigueur conceptuelle</strong> : définir les mots et distinguer les notions ;",
      "<strong>l’argumentation</strong> : justifier ses affirmations par des raisons que chacun peut examiner ;",
      "<strong>l’universalité</strong> : chercher ce qui vaut pour tout homme, et non seulement pour soi.",
    ])}
    ${exercice(
      "Sujet : « La philosophie est-elle réservée à quelques-uns ? »",
      [
        "<strong>Problématique</strong> : la philosophie exige culture et méthode, ce qui semble la réserver à une élite ; mais elle s’appuie sur la raison, que tout homme possède. Est-elle l’affaire de spécialistes ou de tous ?",
        "<strong>I.</strong> En apparence, elle est réservée à quelques-uns : vocabulaire technique, grands systèmes difficiles, temps libre nécessaire (le loisir des Grecs).",
        "<strong>II.</strong> Pourtant, elle repose sur la raison, « la chose du monde la mieux partagée » (Descartes) ; Socrate dialoguait avec tous dans les rues d’Athènes, même avec un esclave (Ménon).",
        "<strong>III.</strong> Philosopher est une attitude accessible à tous, mais qui demande un effort : apprendre à philosopher (Kant), c’est cultiver une aptitude universelle.",
        "<strong>Conclusion</strong> : la philosophie n’est pas un privilège mais une exigence ; elle concerne tout homme qui accepte d’examiner sa vie.",
      ],
      "Sujet corrigé",
    )}
    ${auBac("En introduction, définis toujours « philosophie » de façon précise : l’étymologie seule ne suffit pas, il faut préciser qu’il s’agit d’une recherche rationnelle et critique.")}`,
};

const PHILO_MYTHE_SCIENCE: LessonSpec = {
  title: "Philosophie, mythe, religion et science",
  minutes: 30,
  body: `${objectifs([
      "situer l’émergence de la pensée philosophique ;",
      "comparer la philosophie au mythe, à la religion et à la science ;",
      "expliquer le rôle de la raison dans l’activité philosophique.",
    ])}
    <p>La philosophie naît en Grèce au VI<sup>e</sup> siècle avant notre ère, quand des penseurs (Thalès, Héraclite, puis Socrate, Platon, Aristote) cherchent à expliquer le monde par des raisons et non plus par des récits sur les dieux. On parle du passage du <em>mythos</em> (récit) au <em>logos</em> (discours rationnel).</p>
    ${tableau([
      ["", "Ce qui la distingue de la philosophie"],
      ["le mythe", "récit sacré transmis par la tradition, qu’on ne discute pas"],
      ["la religion", "repose sur la foi et la révélation ; la philosophie ne s’appuie que sur la raison"],
      ["la science", "étudie des objets précis par des méthodes expérimentales ou mathématiques ; la philosophie s’interroge sur le sens, les valeurs et les fondements du savoir"],
    ])}
    ${retenir("La raison est la faculté de juger, de démontrer et de distinguer le vrai du faux. Elle est le seul instrument du philosophe : c’est ce qui fait de la philosophie un savoir universel, ouvert à tous.")}
    ${exemple(["Thalès explique l’origine des choses par l’eau, un élément naturel, au lieu de l’attribuer à la volonté des dieux."])}
    <h2>Philosophie et sciences : une complémentarité</h2>
    <p>Les sciences sont nées de la philosophie : la physique, la biologie, la psychologie s’en sont détachées en se donnant un objet et une méthode propres. La philosophie continue d’interroger leurs fondements, leurs limites et leurs conséquences (épistémologie, éthique).</p>
    ${exercice(
      "Sujet : « La raison peut-elle rendre compte de tout ? »",
      [
        "<strong>Problématique</strong> : la raison explique, démontre et unifie nos connaissances ; mais il existe des domaines (la foi, l’amour, le sens de la vie) où elle semble impuissante. Faut-il lui reconnaître des limites ?",
        "<strong>I.</strong> La raison a vocation à tout expliquer : passage du mythe au logos, succès de la science, principe de raison suffisante (Leibniz : rien n’arrive sans raison).",
        "<strong>II.</strong> Elle rencontre pourtant des limites : « Le cœur a ses raisons que la raison ne connaît point » (Pascal) ; Kant montre qu’elle ne peut connaître ce qui dépasse l’expérience (Dieu, l’âme).",
        "<strong>III.</strong> Reconnaître ses limites est encore un acte de la raison : elle peut penser ce qu’elle ne peut connaître, et respecter d’autres formes d’expérience humaine.",
        "<strong>Conclusion</strong> : la raison ne rend pas compte de tout, mais elle seule peut fixer le domaine où elle est compétente.",
      ],
      "Sujet corrigé",
    )}`,
};

const GRANDES_INTERROGATIONS: LessonSpec = {
  title: "Les grandes interrogations philosophiques",
  minutes: 25,
  body: `${objectifs([
      "identifier les interrogations métaphysique, anthropologique et axiologique ;",
      "relier ces questions aux grands problèmes de l’existence (destinée, mort, sens de la vie).",
    ])}
    <p>Kant résume le champ de la philosophie en quatre questions :</p>
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
    ${retenir("Ces questions portent sur la destinée humaine, la mort et le sens de la vie : la philosophie ne les « règle » pas une fois pour toutes, mais elle apprend à les poser correctement.")}
    ${exercice(
      "Sujet : « La mort enlève-t-elle tout sens à la vie ? »",
      [
        "<strong>Problématique</strong> : si tout finit par la mort, nos projets paraissent vains ; mais n’est-ce pas parce que nous sommes mortels que la vie a un prix ?",
        "<strong>I.</strong> La mort semble rendre la vie absurde : tout ce que nous construisons disparaît (Camus, le sentiment de l’absurde ; la fuite par le « divertissement » chez Pascal).",
        "<strong>II.</strong> Mais la mort donne valeur au temps : Épicure (« la mort n’est rien pour nous ») invite à vivre pleinement ; Heidegger voit dans l’être-pour-la-mort la condition d’une existence authentique ; les religions lui donnent un sens dans l’au-delà.",
        "<strong>III.</strong> Le sens de la vie se construit dans les actes, les œuvres et la transmission : dans la pensée africaine, les morts restent présents dans la communauté (« Les morts ne sont pas morts », Birago Diop).",
        "<strong>Conclusion</strong> : la mort n’ôte pas son sens à la vie ; elle oblige l’homme à le donner lui-même.",
      ],
      "Sujet corrigé",
    )}`,
};

const FONCTIONS_PHILO: LessonSpec = {
  title: "Les fonctions de la pensée philosophique",
  minutes: 25,
  body: `${objectifs([
      "identifier les fonctions de la pensée philosophique ;",
      "répondre à l’objection de l’inutilité de la philosophie.",
    ])}
    ${liste([
      "<strong>fonction critique</strong> : examiner les préjugés, les opinions et les pouvoirs ;",
      "<strong>fonction libératrice</strong> : apprendre à penser par soi-même ;",
      "<strong>fonction de synthèse</strong> : relier les savoirs dispersés et s’interroger sur leurs fondements ;",
      "<strong>fonction éthique</strong> : réfléchir à la manière de bien vivre et d’agir.",
    ])}
    ${citation("Sapere aude ! Aie le courage de te servir de ton propre entendement.", "Kant, Qu’est-ce que les Lumières ?")}
    ${retenir("La philosophie semble « inutile » parce qu’elle ne produit pas d’objets ; mais elle forme des citoyens capables de juger et de refuser la manipulation.")}
    ${exercice(
      "Sujet : « À quoi sert la philosophie ? »",
      [
        "<strong>Problématique</strong> : la philosophie ne produit ni richesse ni technique ; est-elle inutile, ou son utilité est-elle d’un autre ordre ?",
        "<strong>I.</strong> Elle paraît inutile : Thalès tombant dans un puits en regardant les étoiles ; elle ne donne pas de réponses définitives.",
        "<strong>II.</strong> Elle a pourtant des fonctions essentielles : critique des préjugés et des pouvoirs, formation du jugement, réflexion sur les fins de nos actions (à quoi servent nos techniques ?).",
        "<strong>III.</strong> Sa valeur tient à ce qu’elle n’est pas servile : Aristote la dit « la plus libre des sciences » ; elle libère l’homme plus qu’elle ne le sert.",
        "<strong>Conclusion</strong> : demander « à quoi sert la philosophie ? » est déjà philosopher ; elle sert l’homme libre, non l’intérêt immédiat.",
      ],
      "Sujet corrigé",
    )}`,
};

const PHILO_IDEOLOGIE: LessonSpec = {
  title: "Philosophie et idéologie",
  minutes: 25,
  body: `${objectifs([
      "définir l’idéologie et la distinguer de la philosophie ;",
      "montrer comment la philosophie peut démasquer ou devenir une idéologie.",
    ])}
    <p>Une <strong>idéologie</strong> est un système d’idées qui justifie les intérêts d’un groupe ou d’un pouvoir, en se présentant comme une vérité évidente.</p>
    ${citation("Ce n’est pas la conscience des hommes qui détermine leur être ; c’est inversement leur être social qui détermine leur conscience.", "Marx, Contribution à la critique de l’économie politique")}
    ${tableau([
      ["Idéologie", "Philosophie"],
      ["affirme et cherche l’adhésion", "interroge et cherche la vérité"],
      ["sert un intérêt particulier", "vise l’universel"],
      ["refuse la critique", "se soumet à la critique, y compris sur elle-même"],
    ])}
    ${retenir("La philosophie peut elle-même devenir idéologie quand elle sert à justifier une domination (par exemple les théories qui ont justifié l’esclavage ou la colonisation) : d’où l’importance de la vigilance critique.")}
    ${exercice(
      "Sujet : « La philosophie peut-elle échapper à l’idéologie ? »",
      [
        "<strong>Problématique</strong> : tout penseur appartient à une époque, une classe, une culture ; la philosophie prétend pourtant à l’universel. Peut-elle se libérer de ces déterminations ?",
        "<strong>I.</strong> Toute pensée est située : Marx montre que les idées dominantes sont celles de la classe dominante ; certains philosophes ont justifié l’esclavage (Aristote) ou la colonisation.",
        "<strong>II.</strong> Mais la philosophie est le lieu même de la critique : elle soumet ses propres présupposés à l’examen (Socrate, Descartes, Hountondji contre l’ethnophilosophie).",
        "<strong>III.</strong> Elle n’échappe jamais définitivement à l’idéologie, mais elle s’en distingue par la vigilance : une pensée qui accepte d’être discutée cesse d’être dogmatique.",
        "<strong>Conclusion</strong> : la philosophie n’est pas pure de toute idéologie ; elle est l’effort toujours repris pour s’en libérer.",
      ],
      "Sujet corrigé",
    )}`,
};

const PHILOSOPHER_AUJOURDHUI: LessonSpec = {
  title: "Philosopher aujourd’hui",
  minutes: 25,
  body: `${objectifs([
      "montrer l’actualité de la philosophie face aux problèmes contemporains ;",
      "articuler philosophie et autres savoirs.",
    ])}
    <p>Les sciences ont pris à la philosophie beaucoup de ses anciens objets (la nature, la société, le psychisme). Mais de nouvelles questions apparaissent, que la science seule ne peut trancher :</p>
    ${liste([
      "bioéthique : clonage, manipulations génétiques, fin de vie ;",
      "écologie : responsabilité envers les générations futures ;",
      "numérique : vie privée, vérité de l’information, intelligence artificielle ;",
      "mondialisation, migrations, droits humains, développement de l’Afrique.",
    ])}
    ${retenir("Philosopher aujourd’hui, c’est penser les problèmes de son temps et de son milieu avec rigueur, en dialogue avec les autres disciplines.")}
    ${exercice(
      "Sujet : « La philosophie a-t-elle encore un rôle à jouer à l’ère de la science et de la technique ? »",
      [
        "<strong>Problématique</strong> : les sciences ont repris la plupart des objets de la philosophie ; que lui reste-t-il ?",
        "<strong>I.</strong> La philosophie semble dépassée : Comte annonce l’âge positif où la science remplace la métaphysique.",
        "<strong>II.</strong> Mais la science ne dit pas ce qu’il faut faire de ses découvertes : bioéthique, écologie (Jonas), intelligence artificielle, vérité de l’information posent des questions de valeurs.",
        "<strong>III.</strong> Le rôle de la philosophie est de penser le sens, les fins et les limites de nos savoirs et de nos pouvoirs, en dialogue avec les sciences et les cultures (philosophie africaine contemporaine).",
        "<strong>Conclusion</strong> : plus nos moyens grandissent, plus la réflexion sur les fins devient nécessaire.",
      ],
      "Sujet corrigé",
    )}`,
};

const PHILO_AFRICAINE_REPERES: LessonSpec = {
  title: "La philosophie africaine : repères historiques",
  minutes: 25,
  body: `${objectifs([
      "situer les grands moments de la question de la philosophie africaine ;",
      "identifier les auteurs et les œuvres de référence.",
    ])}
    ${tableau([
      ["Repère", "Apport"],
      ["Placide Tempels, <em>La Philosophie bantoue</em> (1945)", "affirme que les Bantous ont une philosophie, centrée sur la « force vitale »"],
      ["Alexis Kagame, <em>La philosophie bantu-rwandaise de l’être</em> (1956)", "dégage une philosophie à partir de la langue kinyarwanda"],
      ["Cheikh Anta Diop, <em>Nations nègres et culture</em> (1954)", "rattache l’Égypte ancienne au monde noir et en fait une source de la pensée"],
      ["Léopold Sédar Senghor et la négritude", "valorise les valeurs culturelles du monde noir"],
    ])}
    ${retenir("La question « existe-t-il une philosophie africaine ? » naît dans le contexte colonial, où l’on refusait aux Africains la capacité de penser rationnellement. Y répondre était un enjeu de dignité.")}
    <h2>La pensée africaine avant la question coloniale</h2>
    <p>L’Afrique a une tradition de pensée ancienne : sagesse de l’Égypte pharaonique (enseignement de Ptahhotep), philosophes éthiopiens (Zera Yacob, XVII<sup>e</sup> siècle), savants de Tombouctou (Ahmed Baba), Anton Wilhelm Amo, philosophe ghanéen enseignant en Allemagne au XVIII<sup>e</sup> siècle.</p>
    ${exercice(
      "Question de cours : pourquoi la question « existe-t-il une philosophie africaine ? » s’est-elle posée au XX<sup>e</sup> siècle ?",
      [
        "Dans le contexte colonial, certains auteurs européens (Hegel, Lévy-Bruhl et sa « mentalité prélogique ») refusaient aux Africains la capacité de penser rationnellement.",
        "Tempels, Kagame, Cheikh Anta Diop et la négritude ont répondu en montrant l’existence de systèmes de pensée africains.",
        "La question était donc à la fois philosophique (qu’est-ce que la philosophie ?) et politique (reconnaître la dignité et l’égalité des peuples).",
      ],
      "Exercice corrigé",
    )}`,
};

const PHILO_AFRICAINE_DEBATS: LessonSpec = {
  title: "La philosophie africaine : débats et controverses",
  minutes: 30,
  body: `${objectifs([
      "présenter les principales positions du débat (ethnophilosophie, critique, sagesse) ;",
      "construire une réflexion personnelle sur l’idée de philosophie africaine.",
    ])}
    <p>L’approche de Tempels, appelée <strong>ethnophilosophie</strong>, a été vivement critiquée.</p>
    ${liste([
      "Paulin Hountondji (<em>Sur la « philosophie africaine »</em>, 1976) : une « philosophie collective » et implicite d’un peuple n’est pas une philosophie ; la philosophie est un travail critique, écrit et individuel, ouvert à la discussion ;",
      "Marcien Towa : l’Afrique doit s’approprier la pensée critique et scientifique pour se libérer ;",
      "d’autres défendent la valeur des sagesses traditionnelles (proverbes, contes, pensée des sages).",
    ])}
    ${retenir("Aujourd’hui, la philosophie africaine est surtout la philosophie faite par des Africains sur tous les problèmes, y compris ceux de l’Afrique (développement, démocratie, langues, identités). Souleymane Bachir Diagne, philosophe sénégalais, en est un représentant.")}
    ${exercice(
      "Sujet : « Peut-on parler d’une philosophie africaine ? »",
      [
        "<strong>Problématique</strong> : si la philosophie est universelle, l’adjectif « africaine » a-t-il un sens ? S’il en a un, désigne-t-il une vision du monde collective ou un travail critique d’auteurs africains ?",
        "<strong>I.</strong> Au sens large, oui : les cultures africaines ont des visions du monde, des sagesses, des concepts (force vitale chez Tempels, catégories de l’être chez Kagame).",
        "<strong>II.</strong> Au sens strict, l’ethnophilosophie est critiquable : une philosophie implicite et unanime n’est pas une philosophie (Hountondji, Towa) ; la philosophie suppose des auteurs, des textes, le débat.",
        "<strong>III.</strong> La philosophie africaine existe comme ensemble des travaux de philosophes africains sur des questions universelles et africaines (Diagne, Wiredu, Mudimbe) : elle est universelle par sa méthode, située par ses questions.",
        "<strong>Conclusion</strong> : on peut parler d’une philosophie africaine, à condition de la comprendre comme une pratique critique vivante et non comme un folklore.",
      ],
      "Sujet corrigé",
    )}`,
};

// ── Domaine 2 : la vie sociale ──────────────────────────────────────────────

const INNE_ACQUIS: LessonSpec = {
  title: "L’inné, l’acquis et le fait culturel",
  minutes: 30,
  body: `${objectifs([
      "distinguer nature et culture, inné et acquis ;",
      "expliquer la relativité et l’universalité des cultures ;",
      "critiquer l’ethnocentrisme.",
    ])}
    <p>La <strong>nature</strong> désigne ce qui est donné à la naissance (l’inné) ; la <strong>culture</strong>, ce que l’homme acquiert et transmet par l’éducation : langage, techniques, croyances, règles.</p>
    ${exemple(["Les « enfants sauvages », comme Victor de l’Aveyron, élevés hors de toute société, ne parlaient pas et marchaient à quatre pattes : sans culture, l’homme ne développe pas son humanité."])}
    ${liste([
      "Lévi-Strauss : la prohibition de l’inceste est une règle universelle, présente dans toutes les sociétés ; elle marque le passage de la nature à la culture ;",
      "<strong>relativité</strong> des cultures : chaque culture a ses valeurs, aucune n’est la mesure de toutes les autres ;",
      "<strong>universalité</strong> : toutes les cultures ont en commun des structures (langage, règles, croyances) et peuvent dialoguer.",
    ])}
    ${citation("Le barbare, c’est d’abord l’homme qui croit à la barbarie.", "Claude Lévi-Strauss, Race et histoire")}
    ${retenir("L’<strong>ethnocentrisme</strong> consiste à juger les autres cultures à partir de la sienne. Il a servi à justifier la colonisation.")}
    ${exercice(
      "Sujet : « La nature humaine existe-t-elle ? »",
      [
        "<strong>Problématique</strong> : tous les hommes partagent un corps, des besoins, la raison ; mais les cultures les façonnent si différemment qu’on peut douter d’une nature commune.",
        "<strong>I.</strong> Il existe une nature humaine : besoins biologiques, raison (Aristote : l’homme est un animal raisonnable), universaux culturels (prohibition de l’inceste).",
        "<strong>II.</strong> Mais l’homme est d’abord ce que la culture fait de lui : enfants sauvages ; Sartre : « l’existence précède l’essence » ; diversité des mœurs (Montaigne).",
        "<strong>III.</strong> La nature de l’homme est d’être un être de culture : sa « nature » est une capacité (perfectibilité selon Rousseau) que chaque culture actualise différemment.",
        "<strong>Conclusion</strong> : la nature humaine n’est pas un modèle figé, mais une ouverture commune qui rend possibles toutes les cultures et leur dialogue.",
      ],
      "Sujet corrigé",
    )}`,
};

const TRAVAIL: LessonSpec = {
  title: "Le travail",
  minutes: 30,
  body: `${objectifs([
      "présenter les conceptions du travail (peine, humanisation, aliénation) ;",
      "articuler travail, technique et développement.",
    ])}
    <p>Le <strong>travail</strong> est l’activité par laquelle l’homme transforme la nature pour satisfaire ses besoins.</p>
    ${tableau([
      ["Conception", "Idée"],
      ["malédiction", "dans la Bible, le travail est une peine (« Tu gagneras ton pain à la sueur de ton front ») ; étymologiquement, <em>tripalium</em> est un instrument de torture"],
      ["humanisation", "Hegel : dans la dialectique du maître et de l’esclave, c’est l’esclave qui, par le travail, se forme et se libère"],
      ["aliénation", "Marx : dans le travail à la chaîne et le salariat capitaliste, l’ouvrier est dépossédé du produit de son travail"],
    ])}
    ${citation("L’intelligence est la faculté de fabriquer des objets artificiels, en particulier des outils à faire des outils.", "Bergson, L’Évolution créatrice")}
    ${retenir("Le travail est à la fois une contrainte et un moyen de réalisation de soi. La technique prolonge le travail : elle accroît la puissance humaine (développement), mais peut aussi asservir.")}
    ${exercice(
      "Sujet : « Le travail est-il une contrainte ou une libération ? »",
      [
        "<strong>Problématique</strong> : le travail est imposé par la nécessité et souvent pénible ; mais il est aussi ce par quoi l’homme transforme la nature et se transforme lui-même.",
        "<strong>I.</strong> Le travail est une contrainte : nécessité biologique, effort, punition (tripalium), exploitation dans le salariat (Marx).",
        "<strong>II.</strong> Il est une libération : il humanise la nature et l’homme (Hegel, dialectique du maître et de l’esclave) ; il donne une place dans la société et un sentiment de dignité.",
        "<strong>III.</strong> Tout dépend des conditions du travail : il libère quand il est choisi, reconnu et justement rémunéré ; il aliène quand il dépossède le travailleur (travail des enfants, chômage, travail à la chaîne).",
        "<strong>Conclusion</strong> : le travail n’est ni pure contrainte ni pure liberté ; il devient libérateur quand la société en fait un lieu de réalisation de soi.",
      ],
      "Sujet corrigé",
    )}`,
};

const LANGAGE_PENSEE: LessonSpec = {
  title: "Langage, pensée et communication",
  minutes: 30,
  body: `${objectifs([
      "distinguer langage humain et communication animale ;",
      "analyser les rapports entre langage et pensée ;",
      "identifier les fonctions et les enjeux de la communication.",
    ])}
    <p>Le <strong>langage</strong> est la faculté de communiquer au moyen de signes. La langue est un système de signes propre à une communauté (wolof, pulaar, français…).</p>
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
    ${retenir("Fonctions du langage (Jakobson) : expressive, conative (agir sur l’autre), référentielle (informer), phatique, poétique, métalinguistique. La communication peut aussi manipuler : propagande, publicité, rumeurs.")}
    ${exercice(
      "Sujet : « Les mots trahissent-ils la pensée ? »",
      [
        "<strong>Problématique</strong> : nous avons parfois le sentiment que les mots ne disent pas ce que nous pensons ou ressentons ; pourtant, sans mots, notre pensée reste-t-elle claire ?",
        "<strong>I.</strong> Les mots semblent trahir la pensée : ils sont généraux alors que nos sentiments sont singuliers (Bergson) ; on éprouve l’ineffable ; le langage peut tromper et manipuler.",
        "<strong>II.</strong> Mais la pensée n’existe pleinement que dans les mots : « c’est dans les mots que nous pensons » (Hegel) ; ce qu’on ne peut dire est encore confus.",
        "<strong>III.</strong> Le langage est un travail : l’écrivain et le poète forgent des expressions justes ; la trahison vient d’un mauvais usage des mots, non du langage lui-même.",
        "<strong>Conclusion</strong> : les mots ne trahissent la pensée que si l’on renonce à l’effort de bien dire ; ils sont la condition de sa clarté.",
      ],
      "Sujet corrigé",
    )}`,
};

const INDIVIDU_SOCIETE: LessonSpec = {
  title: "Individu, personne et société",
  minutes: 30,
  body: `${objectifs([
      "distinguer individu, personne et société ;",
      "analyser les rapports entre l’individu et la société.",
    ])}
    ${tableau([
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
    ${retenir("L’individu reçoit tout de la société (langue, éducation, valeurs), mais il peut aussi la transformer. En Afrique, on souligne souvent la primauté de la communauté (« Nit nitay garabam » : l’homme est le remède de l’homme).")}
    ${exercice(
      "Sujet : « La société est-elle un obstacle à la liberté de l’individu ? »",
      [
        "<strong>Problématique</strong> : la société impose des règles et des sanctions ; mais l’individu isolé serait-il plus libre ?",
        "<strong>I.</strong> La société contraint l’individu : faits sociaux extérieurs et coercitifs (Durkheim), pression du groupe, conformisme.",
        "<strong>II.</strong> Mais sans société, pas d’humanité ni de liberté réelle : l’homme est un animal politique (Aristote) ; la loi protège ma liberté contre la violence des autres (Rousseau).",
        "<strong>III.</strong> La liberté se construit dans une société juste qui respecte la personne (Kant) : la société devient obstacle lorsqu’elle écrase la personne, condition lorsqu’elle la reconnaît.",
        "<strong>Conclusion</strong> : la société n’est pas l’ennemie de la liberté ; elle en est le cadre, à condition d’être fondée sur le droit et la dignité.",
      ],
      "Sujet corrigé",
    )}`,
};

const NORMES: LessonSpec = {
  title: "Les normes : conformité et déviance",
  minutes: 25,
  body: `${objectifs([
      "identifier les différents types de normes ;",
      "analyser la conformité et la déviance ;",
      "distinguer légalité et légitimité.",
    ])}
    <p>Une <strong>norme</strong> est une règle qui dit ce qui doit être fait. On distingue :</p>
    ${liste([
      "les normes <strong>juridiques</strong> (lois, sanctionnées par l’État) ;",
      "les normes <strong>morales</strong> (sanction de la conscience) ;",
      "les normes <strong>sociales</strong> : coutumes, politesse, mode (sanction du groupe) ;",
      "les normes <strong>religieuses</strong>.",
    ])}
    <p>La <strong>conformité</strong> est l’adhésion aux normes ; la <strong>déviance</strong>, leur transgression.</p>
    ${retenir("La déviance n’est pas toujours négative : certains « déviants » ont fait progresser la société (Socrate, les combattants contre l’esclavage ou la colonisation). Mais sans normes communes, la vie sociale devient impossible.")}
    ${exercice(
      "Sujet : « Faut-il toujours obéir aux lois ? »",
      [
        "<strong>Problématique</strong> : obéir aux lois garantit l’ordre et la paix ; mais une loi peut être injuste. Peut-on désobéir sans détruire la société ?",
        "<strong>I.</strong> Il faut obéir aux lois : sans elles, retour à la violence (Hobbes) ; Socrate refuse de s’évader de prison par respect des lois d’Athènes.",
        "<strong>II.</strong> Mais la légalité n’est pas la légitimité : Antigone désobéit à Créon au nom des lois non écrites ; la désobéissance civile de Gandhi, la résistance à l’apartheid (Mandela).",
        "<strong>III.</strong> La désobéissance n’est légitime qu’au nom d’un droit supérieur (dignité humaine), publiquement et en acceptant la sanction : elle vise à améliorer la loi, non à la supprimer.",
        "<strong>Conclusion</strong> : on doit obéir aux lois justes ; face à une loi injuste, la conscience peut exiger la désobéissance, dans des conditions strictes.",
      ],
      "Sujet corrigé",
    )}`,
};

const CONSCIENCE: LessonSpec = {
  title: "La conscience",
  minutes: 30,
  body: `${objectifs([
      "distinguer conscience psychologique et conscience morale ;",
      "comprendre la problématique du sujet (Descartes, Husserl) ;",
      "relier conscience et responsabilité.",
    ])}
    <p>La <strong>conscience psychologique</strong> est la connaissance que le sujet a de lui-même et de ce qu’il vit. La <strong>conscience morale</strong> est la faculté de juger le bien et le mal de ses actes.</p>
    ${citation("Je pense, donc je suis.", "Descartes, Discours de la méthode")}
    ${liste([
      "Descartes : on peut douter de tout, sauf du fait qu’on pense ; la conscience est la première certitude et fonde le sujet ;",
      "Husserl : « toute conscience est conscience de quelque chose » (intentionnalité) ;",
      "Rousseau : la conscience morale est un « instinct divin », un juge infaillible du bien et du mal.",
    ])}
    ${retenir("La conscience fait de l’homme un sujet responsable : on n’est responsable que de ce qu’on fait consciemment. Mais la conscience est-elle transparente à elle-même ? C’est la question de l’inconscient.")}
    <h2>Les degrés de la conscience</h2>
    ${liste([
      "<strong>conscience spontanée</strong> : je perçois et j’agis sans y réfléchir ;",
      "<strong>conscience réfléchie</strong> : je me prends moi-même pour objet de pensée (« je sais que je pense ») ;",
      "<strong>conscience morale</strong> : je juge la valeur de mes actes et j’éprouve remords ou satisfaction.",
    ])}
    <p>Pour Pascal, la conscience fait la grandeur et la misère de l’homme : « L’homme n’est qu’un roseau, le plus faible de la nature, mais c’est un roseau pensant. »</p>
    ${exercice(
      "Sujet : « La conscience de soi est-elle une connaissance de soi ? »",
      [
        "<strong>Problématique</strong> : être conscient de soi, c’est savoir que l’on existe ; mais savoir que j’existe, est-ce savoir qui je suis ?",
        "<strong>I.</strong> La conscience semble une connaissance immédiate et certaine de soi : le cogito de Descartes, « je suis une chose qui pense ».",
        "<strong>II.</strong> Mais cette connaissance est limitée : illusions sur nos motifs (Spinoza), inconscient (Freud), regard d’autrui nécessaire pour se connaître (Sartre).",
        "<strong>III.</strong> Se connaître est une tâche : par l’action, le dialogue, l’introspection critique (« connais-toi toi-même », Socrate).",
        "<strong>Conclusion</strong> : la conscience de soi est le point de départ, non l’achèvement, de la connaissance de soi.",
      ],
      "Sujet corrigé",
    )}`,
};

const INCONSCIENT: LessonSpec = {
  title: "L’inconscient psychique et la personnalité",
  minutes: 30,
  body: `${objectifs([
      "présenter l’hypothèse freudienne de l’inconscient psychique ;",
      "expliquer la formation de la personnalité ;",
      "discuter les conséquences morales de l’inconscient.",
    ])}
    <p>Pour Freud, une grande partie de notre vie psychique échappe à la conscience : c’est l’<strong>inconscient</strong>. Des désirs refoulés, souvent liés à l’enfance, s’y trouvent et cherchent à s’exprimer.</p>
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
    ${retenir("La personnalité se forme par l’interaction de l’hérédité, de l’éducation, du milieu social et de l’histoire personnelle. L’inconscient pose un problème moral : si mes actes viennent de l’inconscient, suis-je encore responsable ?")}
    ${exercice(
      "Sujet : « L’hypothèse de l’inconscient supprime-t-elle la responsabilité ? »",
      [
        "<strong>Problématique</strong> : si une partie de nos actes vient de désirs refoulés que nous ignorons, pouvons-nous encore en répondre ?",
        "<strong>I.</strong> L’inconscient semble ruiner la responsabilité : « le moi n’est pas maître dans sa propre maison » (Freud) ; lapsus, actes manqués, symptômes échappent à la volonté.",
        "<strong>II.</strong> Mais l’inconscient n’est pas une excuse universelle : Sartre y voit souvent de la « mauvaise foi » ; Alain refuse l’idée d’un « autre moi » caché.",
        "<strong>III.</strong> La psychanalyse elle-même vise à rendre conscient ce qui était inconscient pour rendre au sujet sa liberté (« Là où était le ça, le moi doit advenir ») : la responsabilité devient une tâche de lucidité.",
        "<strong>Conclusion</strong> : l’inconscient limite la responsabilité sans la supprimer ; il oblige à une connaissance de soi plus exigeante.",
      ],
      "Sujet corrigé",
    )}`,
};

const LIBERTE_DETERMINISME: LessonSpec = {
  title: "Liberté, déterminisme et fatalisme",
  minutes: 30,
  body: `${objectifs([
      "distinguer liberté, déterminisme et fatalisme ;",
      "discuter les arguments pour et contre la liberté humaine.",
    ])}
    ${tableau([
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
    ${retenir("La liberté n’est pas l’absence de toute contrainte (« faire ce qu’on veut ») : pour Rousseau, « l’obéissance à la loi qu’on s’est prescrite est liberté ».")}
    ${exercice(
      "Sujet : « La connaissance des déterminismes rend-elle l’homme libre ? »",
      [
        "<strong>Problématique</strong> : si tout est déterminé par des causes, la liberté paraît une illusion ; mais connaître ces causes ne permet-il pas d’agir sur elles ?",
        "<strong>I.</strong> Le déterminisme semble nier la liberté : nous sommes déterminés par la biologie, la société, l’histoire ; la liberté est l’ignorance des causes (Spinoza).",
        "<strong>II.</strong> Mais la connaissance libère : la médecine guérit en connaissant les causes de la maladie ; « on ne commande à la nature qu’en lui obéissant » (Bacon) ; pour Spinoza, la liberté est la nécessité comprise.",
        "<strong>III.</strong> Le déterminisme n’est pas le fatalisme : il rend l’action possible et efficace. La liberté n’est pas absence de causes, mais capacité de choisir en connaissance de cause.",
        "<strong>Conclusion</strong> : connaître les déterminismes ne suffit pas à rendre libre, mais c’est la condition d’une liberté réelle et non illusoire.",
      ],
      "Sujet corrigé",
    )}`,
};

const LIBRE_ARBITRE: LessonSpec = {
  title: "Libre-arbitre et responsabilité",
  minutes: 30,
  body: `${objectifs([
      "définir le libre-arbitre et la responsabilité ;",
      "montrer le lien entre liberté et responsabilité.",
    ])}
    <p>Le <strong>libre-arbitre</strong> est le pouvoir de choisir entre plusieurs possibles. Pour Descartes, la volonté est infinie : c’est en elle que l’homme ressemble le plus à Dieu.</p>
    ${liste([
      "être <strong>responsable</strong>, c’est devoir répondre de ses actes ;",
      "pas de responsabilité sans liberté : on n’accuse pas un enfant ou un malade mental comme un adulte sain ;",
      "la responsabilité est morale (devant sa conscience) et juridique (devant la loi).",
    ])}
    ${retenir("Invoquer le destin, l’inconscient ou la société pour excuser tous ses actes, c’est la « mauvaise foi » (Sartre) : une manière de fuir sa liberté.")}
    ${exercice(
      "Sujet : « L’homme est-il responsable de ce qu’il est ? »",
      [
        "<strong>Problématique</strong> : nous n’avons choisi ni notre naissance, ni notre famille, ni notre milieu ; pourtant nous nous faisons par nos choix. De quoi sommes-nous responsables ?",
        "<strong>I.</strong> L’homme semble ne pas être responsable de ce qu’il est : hérédité, éducation, conditions sociales le façonnent.",
        "<strong>II.</strong> Pourtant, pour Sartre, « l’homme n’est rien d’autre que ce qu’il se fait » : il est responsable de ses choix et de ce qu’il fait de ce qu’on a fait de lui ; s’excuser, c’est la mauvaise foi.",
        "<strong>III.</strong> La responsabilité est réelle mais graduée : on répond de ce qu’on a pu choisir ; la société doit aussi offrir à chacun les moyens de se réaliser.",
        "<strong>Conclusion</strong> : l’homme n’est pas responsable de tout ce qu’il est, mais de ce qu’il en fait.",
      ],
      "Sujet corrigé",
    )}`,
};

const GENESE_ETAT: LessonSpec = {
  title: "Le fait politique et la genèse de l’État",
  minutes: 30,
  body: `${objectifs([
      "définir le politique et l’État ;",
      "présenter les théories de l’origine de l’État (naturelle, contractuelle, marxiste).",
    ])}
    <p>Le <strong>politique</strong> concerne l’organisation du pouvoir dans une société. L’<strong>État</strong> est l’institution qui détient l’autorité souveraine sur un territoire et une population.</p>
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
    ${retenir("Pour Max Weber, l’État revendique avec succès le monopole de la violence physique légitime.")}
    ${exercice(
      "Sujet : « L’État est-il nécessaire ? »",
      [
        "<strong>Problématique</strong> : l’État garantit la paix et la justice, mais il contraint et peut opprimer. Les hommes pourraient-ils vivre ensemble sans lui ?",
        "<strong>I.</strong> L’État est nécessaire : sans lui, l’état de nature est guerre de tous contre tous (Hobbes) ; il garantit la sécurité, le droit, les services publics.",
        "<strong>II.</strong> Mais il peut devenir oppresseur : pour Marx, il sert la classe dominante et doit dépérir ; les anarchistes le rejettent ; certaines sociétés traditionnelles sans État étaient régulées par la coutume.",
        "<strong>III.</strong> L’État est nécessaire s’il est légitime : fondé sur la volonté générale (Rousseau), limité par la séparation des pouvoirs et le droit.",
        "<strong>Conclusion</strong> : la question n’est pas tant de savoir s’il faut un État que de savoir quel État : un État de droit au service des libertés.",
      ],
      "Sujet corrigé",
    )}`,
};

const ETAT_FORMES: LessonSpec = {
  title: "Formes, fonctions et finalités de l’État",
  minutes: 30,
  body: `${objectifs([
      "classer les formes de l’État ;",
      "identifier ses fonctions et ses finalités ;",
      "définir l’État de droit et la séparation des pouvoirs.",
    ])}
    ${tableau([
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
    ${retenir("L’État de droit est un État qui se soumet lui-même au droit : la Constitution limite le pouvoir et garantit les libertés.")}
    ${exercice(
      "Sujet : « La démocratie est-elle le meilleur des régimes ? »",
      [
        "<strong>Problématique</strong> : la démocratie donne le pouvoir au peuple et protège les libertés ; mais le peuple peut se tromper et la majorité opprimer la minorité.",
        "<strong>I.</strong> La démocratie a des défauts : Platon craint le règne de l’opinion et des démagogues ; Tocqueville redoute la « tyrannie de la majorité ».",
        "<strong>II.</strong> Elle reste le régime le plus légitime : souveraineté du peuple (Rousseau), égalité des citoyens, alternance pacifique, contre-pouvoirs ; « le pire des régimes à l’exception de tous les autres » (Churchill).",
        "<strong>III.</strong> Elle n’est le meilleur régime qu’à condition d’être un État de droit avec des citoyens éduqués et une presse libre : c’est une exigence, plus qu’un acquis.",
        "<strong>Conclusion</strong> : la démocratie n’est pas parfaite, mais elle est le seul régime qui permet de corriger ses propres erreurs.",
      ],
      "Sujet corrigé",
    )}`,
};

const ETAT_MONDIALISATION: LessonSpec = {
  title: "État, droits, libertés et mondialisation",
  minutes: 30,
  body: `${objectifs([
      "relier l’État, les droits humains et les libertés ;",
      "analyser les effets de la mondialisation sur l’État.",
    ])}
    <p>L’État moderne doit garantir les <strong>droits humains</strong> (Déclaration universelle de 1948) et les libertés fondamentales : d’expression, de culte, d’association, de circulation.</p>
    <p>La <strong>mondialisation</strong> désigne l’intégration croissante des économies, des communications et des cultures à l’échelle de la planète.</p>
    ${liste([
      "elle affaiblit la souveraineté des États face aux multinationales, aux marchés financiers et aux institutions internationales ;",
      "elle diffuse les droits humains et les techniques, mais aussi les inégalités et l’uniformisation culturelle ;",
      "elle pose la question d’une gouvernance mondiale (ONU, Union africaine, CEDEAO).",
    ])}
    ${retenir("Problème : l’État est-il encore le cadre pertinent du politique à l’heure de la mondialisation ?")}
    ${exercice(
      "Sujet : « La mondialisation menace-t-elle la souveraineté des États ? »",
      [
        "<strong>Problématique</strong> : les décisions économiques, financières et culturelles se prennent de plus en plus au-delà des frontières ; l’État est-il encore maître chez lui ?",
        "<strong>I.</strong> Oui : pouvoir des multinationales et des marchés, dette et conditions des institutions financières, uniformisation culturelle par les médias et le numérique.",
        "<strong>II.</strong> Mais les États restent des acteurs majeurs : ils signent les traités, régulent, coopèrent (Union africaine, CEDEAO, ONU) ; certains problèmes (climat, épidémies) exigent une action collective.",
        "<strong>III.</strong> La souveraineté se transforme : elle devient partagée ; le défi est de bâtir des règles communes qui protègent les droits humains et les plus faibles.",
        "<strong>Conclusion</strong> : la mondialisation ne supprime pas l’État, elle l’oblige à repenser sa souveraineté dans la coopération.",
      ],
      "Sujet corrigé",
    )}`,
};

// ── Domaine 3 : épistémologie ───────────────────────────────────────────────

const FORMES_CONNAISSANCE: LessonSpec = {
  title: "Les formes de la connaissance",
  minutes: 25,
  body: `${objectifs([
      "distinguer connaissance sensible, empirique, intuitive et discursive ;",
      "situer mythe, magie et religion par rapport à la science.",
    ])}
    ${tableau([
      ["Connaissance", "Définition"],
      ["sensible", "donnée par les sens ; immédiate mais parfois trompeuse (illusions)"],
      ["empirique", "tirée de l’expérience répétée et de l’habitude (savoir-faire du pêcheur, du paysan)"],
      ["intuitive", "saisie immédiate d’une vérité par l’esprit"],
      ["discursive", "obtenue par un raisonnement, étape par étape (démonstration)"],
    ])}
    <p>Avant la science, l’homme a expliqué le monde par le <strong>mythe</strong>, la <strong>magie</strong> (agir sur la nature par des rites) et la <strong>religion</strong>.</p>
    ${retenir("Auguste Comte décrit trois états de l’esprit humain : théologique (explication par les dieux), métaphysique (par des forces abstraites), positif (par des lois vérifiées par l’observation).")}
    ${exercice(
      "Sujet : « Peut-on se fier à ses sens ? »",
      [
        "<strong>Problématique</strong> : les sens sont notre premier contact avec le monde ; mais ils nous trompent parfois. Peuvent-ils fonder une connaissance sûre ?",
        "<strong>I.</strong> Les sens nous trompent : illusions (le bâton qui paraît brisé dans l’eau, le mirage), d’où le doute de Descartes.",
        "<strong>II.</strong> Mais toute connaissance commence par l’expérience (empirisme : Locke, Hume) ; les sens ne mentent pas, c’est le jugement qui se trompe (Kant).",
        "<strong>III.</strong> La science corrige et prolonge les sens par la raison, les instruments et la mesure.",
        "<strong>Conclusion</strong> : on peut se fier aux sens comme point de départ, à condition de soumettre leurs données au contrôle de la raison.",
      ],
      "Sujet corrigé",
    )}`,
};

const NAISSANCE_SCIENCE: LessonSpec = {
  title: "Naissance de la science et obstacles épistémologiques",
  minutes: 30,
  body: `${objectifs([
      "expliquer les conditions d’émergence de la science moderne ;",
      "définir et illustrer les obstacles épistémologiques.",
    ])}
    <p>La science moderne naît au XVII<sup>e</sup> siècle avec Galilée, qui allie mathématiques et expérience : « le livre de la nature est écrit en langage mathématique ». Elle suppose la rupture avec l’opinion et l’autorité.</p>
    ${citation("Rien ne va de soi. Rien n’est donné. Tout est construit.", "Gaston Bachelard, La Formation de l’esprit scientifique")}
    <p>Pour Bachelard, la connaissance scientifique se construit contre des <strong>obstacles épistémologiques</strong> :</p>
    ${liste([
      "l’expérience première, immédiate et pittoresque ;",
      "l’opinion (« l’opinion pense mal ; elle ne pense pas ») ;",
      "la généralisation hâtive, les images et les mots trop familiers.",
    ])}
    ${retenir("L’histoire des sciences n’est pas une accumulation tranquille de vérités, mais une suite de ruptures et de rectifications d’erreurs.")}
    ${exercice(
      "Sujet : « L’erreur est-elle un obstacle au progrès de la science ? »",
      [
        "<strong>Problématique</strong> : la science cherche la vérité et doit éliminer l’erreur ; mais n’avance-t-elle pas justement en corrigeant ses erreurs ?",
        "<strong>I.</strong> L’erreur freine la science : préjugés, opinions, autorité (géocentrisme défendu contre Galilée), obstacles épistémologiques.",
        "<strong>II.</strong> Mais l’erreur rectifiée fait progresser : « la vérité est une erreur rectifiée » (Bachelard) ; une théorie réfutée oriente la recherche (Popper).",
        "<strong>III.</strong> L’erreur devient féconde quand elle est reconnue par une communauté scientifique critique ; l’obstacle véritable est le dogmatisme, non l’erreur.",
        "<strong>Conclusion</strong> : l’erreur n’est pas l’ennemie de la science mais son moteur, pourvu qu’on accepte de la corriger.",
      ],
      "Sujet corrigé",
    )}`,
};

const METHODE_SCIENTIFIQUE: LessonSpec = {
  title: "La connaissance scientifique : principes et méthodes",
  minutes: 30,
  body: `${objectifs([
      "décrire la méthode expérimentale ;",
      "expliquer le critère de réfutabilité de Popper ;",
      "montrer le caractère révisable des théories scientifiques.",
    ])}
    ${methode([
      "<strong>Observation</strong> d’un fait polémique, qui pose problème.",
      "<strong>Hypothèse</strong> : explication provisoire.",
      "<strong>Expérimentation</strong> : on produit les conditions pour vérifier l’hypothèse.",
      "<strong>Loi</strong> ou <strong>théorie</strong> : énoncé général, souvent mathématique.",
    ], "La méthode expérimentale (Claude Bernard)")}
    ${liste([
      "principes : déterminisme (mêmes causes, mêmes effets), objectivité, mesure ;",
      "Popper : une théorie est scientifique si elle est <strong>réfutable</strong> (falsifiable) ; aucune expérience ne prouve définitivement une théorie, mais une seule peut la réfuter.",
    ])}
    ${retenir("La science ne dit pas « la » vérité définitive : elle avance par théories toujours révisables.")}
    ${exercice(
      "Sujet : « L’expérience suffit-elle à fonder la vérité scientifique ? »",
      [
        "<strong>Problématique</strong> : les sciences de la nature s’appuient sur l’expérience ; mais une expérience peut-elle prouver une loi générale ?",
        "<strong>I.</strong> L’expérience est indispensable : contrôle des hypothèses (Claude Bernard), rupture avec la spéculation.",
        "<strong>II.</strong> Mais elle ne suffit pas : toute expérience est guidée par une théorie ; l’induction ne prouve jamais une loi universelle (Hume) ; une expérience peut réfuter, non vérifier définitivement (Popper).",
        "<strong>III.</strong> La vérité scientifique naît du dialogue entre raison et expérience, hypothèse et contrôle, au sein d’une communauté critique.",
        "<strong>Conclusion</strong> : l’expérience est nécessaire mais non suffisante ; la vérité scientifique est une construction rationnelle toujours révisable.",
      ],
      "Sujet corrigé",
    )}`,
};

const SCIENCES_FORMELLES: LessonSpec = {
  title: "Les sciences formelles : logique et mathématiques",
  minutes: 25,
  body: `${objectifs([
      "caractériser les sciences formelles et la déduction ;",
      "comprendre la nature de la vérité mathématique.",
    ])}
    <p>La logique et les mathématiques ne portent pas sur des faits mais sur des formes de raisonnement. Elles procèdent par <strong>déduction</strong> à partir d’axiomes et de définitions.</p>
    ${liste([
      "une proposition mathématique est vraie si elle est démontrée sans contradiction à partir des axiomes ;",
      "les géométries non euclidiennes (Lobatchevski, Riemann) ont montré qu’on peut changer d’axiomes : la vérité mathématique est une cohérence interne, non une copie du réel.",
    ])}
    ${retenir("Paradoxe : alors que les mathématiques sont une construction de l’esprit, elles s’appliquent remarquablement au monde physique.")}
    ${exercice(
      "Question de cours : en quoi la vérité mathématique diffère-t-elle de la vérité des sciences de la nature ?",
      [
        "La vérité mathématique est <strong>formelle</strong> : un théorème est vrai s’il est démontré sans contradiction à partir d’axiomes ; elle est nécessaire et ne dépend pas de l’expérience.",
        "La vérité des sciences de la nature est <strong>matérielle</strong> : une loi est vraie si elle s’accorde avec les faits observés ; elle reste approchée et révisable.",
        "Exemple : la somme des angles d’un triangle vaut 180° en géométrie euclidienne, mais pas en géométrie de Riemann ; la question de savoir quelle géométrie décrit l’univers relève de la physique.",
      ],
      "Exercice corrigé",
    )}`,
};

const SCIENCES_NATURE_HOMME: LessonSpec = {
  title: "Sciences de la nature et sciences de l’homme",
  minutes: 30,
  body: `${objectifs([
      "comparer objets et méthodes des sciences de la nature et des sciences de l’homme ;",
      "discuter la scientificité des sciences humaines.",
    ])}
    ${tableau([
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
    ${retenir("La vérité des sciences de la nature est une correspondance vérifiée avec les faits ; elle reste approchée et révisable.")}
    ${exercice(
      "Sujet : « L’homme peut-il être objet de science ? »",
      [
        "<strong>Problématique</strong> : l’homme est un être naturel que l’on peut étudier comme les autres ; mais il est aussi conscient et libre, ce qui semble échapper à toute loi.",
        "<strong>I.</strong> Oui : le corps relève de la biologie ; les faits sociaux peuvent être traités « comme des choses » (Durkheim) ; statistiques, enquêtes, régularités.",
        "<strong>II.</strong> Mais l’homme résiste à l’objectivation : il donne un sens à ses actes, il peut changer quand il se sait observé ; on le comprend plus qu’on ne l’explique (Dilthey).",
        "<strong>III.</strong> Les sciences humaines sont des sciences d’un type particulier, qui combinent explication et compréhension, sans réduire l’homme à une chose.",
        "<strong>Conclusion</strong> : l’homme peut être objet de science, à condition que cette science respecte sa dimension de sujet.",
      ],
      "Sujet corrigé",
    )}`,
};

const VERITE: LessonSpec = {
  title: "Le problème de la vérité",
  minutes: 30,
  body: `${objectifs([
      "présenter les conceptions de la vérité ;",
      "distinguer vérité, réalité, erreur et mensonge.",
    ])}
    ${tableau([
      ["Conception de la vérité", "Critère"],
      ["vérité-correspondance", "une idée est vraie si elle est conforme à la réalité"],
      ["vérité-cohérence", "un énoncé est vrai s’il ne contredit pas le système dont il fait partie (mathématiques)"],
      ["vérité-évidence (Descartes)", "est vrai ce que je conçois clairement et distinctement"],
      ["pragmatisme", "est vrai ce qui réussit, ce qui est utile"],
    ])}
    ${retenir("On distingue la vérité (qualité d’un jugement) de la réalité (ce qui existe). L’erreur n’est pas le mensonge : se tromper n’est pas tromper.")}
    ${exercice(
      "Sujet : « La science peut-elle tout expliquer ? »",
      [
        "<strong>Problématique</strong> : la science étend sans cesse le champ de ses explications ; mais certaines questions (le sens de la vie, le bien, le beau) semblent hors de sa portée.",
        "<strong>I.</strong> La science explique de plus en plus : de la chute des corps à l’origine de l’univers et à l’ADN ; tout phénomène semble relever de lois.",
        "<strong>II.</strong> Mais elle a des limites : ses vérités sont provisoires ; elle explique le « comment » plus que le « pourquoi » ; elle ne dit pas ce qui doit être (valeurs).",
        "<strong>III.</strong> D’autres approches (philosophie, art, religion) répondent à d’autres besoins de l’esprit, sans contredire la science.",
        "<strong>Conclusion</strong> : la science peut expliquer tout ce qui est phénomène, mais pas tout ce qui a du sens pour l’homme.",
      ],
      "Sujet corrigé",
    )}`,
};

const TECHNIQUE: LessonSpec = {
  title: "Science et technique",
  minutes: 25,
  body: `${objectifs([
      "définir la technique et la distinguer de la science ;",
      "analyser les rapports entre science et technique (technoscience).",
    ])}
    <p>La <strong>technique</strong> est l’ensemble des procédés par lesquels l’homme transforme la nature pour ses besoins. Elle est plus ancienne que la science (outils de la préhistoire).</p>
    ${liste([
      "la technique a aidé la science : la lunette de Galilée, le microscope, les instruments de mesure ;",
      "la science a transformé la technique : on parle de <strong>technoscience</strong> (électricité, informatique, génie génétique) ;",
      "Descartes rêvait de rendre les hommes « comme maîtres et possesseurs de la nature ».",
    ])}
    ${retenir("La science cherche à connaître (le vrai) ; la technique cherche à agir efficacement (l’utile). Elles sont aujourd’hui étroitement liées.")}
    ${exercice(
      "Sujet : « La technique libère-t-elle l’homme ? »",
      [
        "<strong>Problématique</strong> : la technique délivre l’homme de nombreuses contraintes naturelles ; mais ne crée-t-elle pas de nouvelles dépendances ?",
        "<strong>I.</strong> Elle libère : du travail pénible, de la maladie, de la distance ; elle rend l’homme « maître et possesseur de la nature » (Descartes).",
        "<strong>II.</strong> Elle asservit aussi : dépendance aux machines et au téléphone, travail à la chaîne, destruction de l’environnement, surveillance numérique.",
        "<strong>III.</strong> La technique est un moyen : elle libère quand l’homme la maîtrise et l’oriente vers des fins humaines.",
        "<strong>Conclusion</strong> : la technique n’est ni bonne ni mauvaise en soi ; la liberté dépend de l’usage que nous en faisons.",
      ],
      "Sujet corrigé",
    )}`,
};

const SCIENCE_AXIOLOGIE: LessonSpec = {
  title: "Science, technique et valeurs",
  minutes: 25,
  body: `${objectifs([
      "examiner les rapports entre science, technique et valeurs ;",
      "présenter l’éthique de la responsabilité (Jonas).",
    ])}
    ${citation("Science sans conscience n’est que ruine de l’âme.", "Rabelais, Pantagruel")}
    ${liste([
      "le progrès scientifique a apporté la médecine moderne, la mécanisation, les communications ;",
      "il a aussi produit la bombe atomique, la pollution, les manipulations génétiques ;",
      "Hans Jonas (<em>Le Principe responsabilité</em>) : notre puissance technique nous rend responsables des générations futures.",
    ])}
    ${retenir("La science dit ce qui est et ce qui est possible, pas ce qui doit être fait : les valeurs (axiologie) relèvent de l’éthique et du débat démocratique. D’où les comités d’éthique.")}
    ${exemple(["Sujet type : « Le progrès technique est-il toujours un progrès humain ? »"], "Pour la dissertation")}
    ${exercice(
      "Sujet : « Tout ce qui est techniquement possible est-il moralement souhaitable ? »",
      [
        "<strong>Problématique</strong> : la technique repousse sans cesse les limites du possible (clonage, armes, IA) ; faut-il faire tout ce que l’on peut faire ?",
        "<strong>I.</strong> Le possible tend à se réaliser : curiosité, progrès, intérêts économiques ; interdire semble freiner la science.",
        "<strong>II.</strong> Mais le possible n’est pas le permis : bombe atomique, expérimentations sur l’homme ; « science sans conscience n’est que ruine de l’âme » (Rabelais).",
        "<strong>III.</strong> Il faut une éthique de la responsabilité (Jonas) et des institutions (comités d’éthique, lois de bioéthique) pour orienter la technique vers le bien commun.",
        "<strong>Conclusion</strong> : le devoir ne découle pas du pouvoir ; c’est à la réflexion morale et au débat démocratique de fixer les limites.",
      ],
      "Sujet corrigé",
    )}`,
};

// ── Domaine 4 : esthétique ──────────────────────────────────────────────────

const LE_BEAU: LessonSpec = {
  title: "Le beau et l’expérience artistique",
  minutes: 25,
  body: `${objectifs([
      "distinguer le beau, l’agréable et l’utile ;",
      "analyser le jugement de goût.",
    ])}
    ${citation("Est beau ce qui plaît universellement sans concept.", "Kant, Critique de la faculté de juger")}
    ${liste([
      "le beau n’est pas l’agréable (qui dépend des goûts de chacun) ni l’utile ;",
      "le jugement de goût est subjectif mais prétend à l’universalité : « tous les goûts sont dans la nature » est vrai pour l’agréable, pas pour le beau ;",
      "Hegel : le beau artistique est supérieur au beau naturel, car il est produit par l’esprit.",
    ])}
    ${retenir("L’expérience esthétique est une contemplation désintéressée : on apprécie l’œuvre pour elle-même, non pour l’usage qu’on peut en faire.")}
    ${exercice(
      "Sujet : « Peut-on discuter des goûts et des couleurs ? »",
      [
        "<strong>Problématique</strong> : le goût semble personnel (« chacun ses goûts ») ; mais nous discutons des œuvres et attendons que les autres partagent notre admiration.",
        "<strong>I.</strong> Les goûts semblent indiscutables : ils dépendent de la sensibilité, de la culture, de l’époque.",
        "<strong>II.</strong> Pourtant le jugement esthétique prétend à l’universalité : le beau « plaît universellement sans concept » (Kant) ; il y a des œuvres admirées dans toutes les cultures.",
        "<strong>III.</strong> On peut discuter du beau sans pouvoir le démontrer : la discussion éduque le goût et ouvre à d’autres sensibilités.",
        "<strong>Conclusion</strong> : on ne dispute pas des goûts comme d’une vérité scientifique, mais on peut et on doit en discuter.",
      ],
      "Sujet corrigé",
    )}`,
};

const ART_REALITE: LessonSpec = {
  title: "Art, réalité et création artistique",
  minutes: 30,
  body: `${objectifs([
      "présenter les rapports entre l’art et la réalité ;",
      "analyser le problème de la création artistique.",
    ])}
    ${tableau([
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
    ${retenir("Un artiste n’est pas un simple artisan : l’artisan applique une règle connue, l’artiste invente.")}
    ${exercice(
      "Sujet : « L’art doit-il imiter la nature ? »",
      [
        "<strong>Problématique</strong> : l’art a longtemps été défini comme imitation ; mais une copie parfaite serait-elle encore de l’art ?",
        "<strong>I.</strong> L’art imite : la mimèsis (Aristote), le réalisme, le portrait ; l’imitation plaît et instruit.",
        "<strong>II.</strong> L’imitation est insuffisante : Platon la juge éloignée du vrai ; Hegel : imiter la nature, c’est rivaliser en vain avec elle ; la photographie fait mieux.",
        "<strong>III.</strong> L’art transfigure le réel : il révèle ce que nous ne voyons pas (Bergson), il crée des formes nouvelles (masques africains, art abstrait).",
        "<strong>Conclusion</strong> : l’art ne doit pas copier la nature, mais en faire voir et en inventer le sens.",
      ],
      "Sujet corrigé",
    )}`,
};

const FONCTIONS_ART: LessonSpec = {
  title: "Les arts et leurs fonctions",
  minutes: 25,
  body: `${objectifs([
      "identifier les formes d’art et leurs fonctions ;",
      "discuter l’opposition entre art pour l’art et art engagé.",
    ])}
    <p>Les arts : architecture, sculpture, peinture, musique, danse, poésie, théâtre, cinéma…</p>
    ${tableau([
      ["Fonction", "Exemple"],
      ["expressive", "exprimer des émotions (chant, poésie)"],
      ["magico-religieuse", "masques et statues des cérémonies traditionnelles africaines"],
      ["commémorative", "monuments, épopées des griots (Soundjata)"],
      ["subversive", "contester l’ordre établi (rap, caricature, littérature engagée)"],
      ["décorative et esthétique", "tissage, bijoux, architecture"],
    ])}
    ${retenir("Senghor souligne que l’art négro-africain est fonctionnel et collectif : il est lié à la vie de la communauté. La question « l’art est-il utile ? » oppose l’art pour l’art à l’art engagé.")}
    ${exercice(
      "Sujet : « L’art a-t-il une fonction sociale ? »",
      [
        "<strong>Problématique</strong> : l’œuvre d’art semble gratuite, faite pour être contemplée ; mais l’art a toujours accompagné la vie des sociétés.",
        "<strong>I.</strong> L’art pour l’art : la beauté se suffit à elle-même (Théophile Gautier : « il n’y a de vraiment beau que ce qui ne peut servir à rien »).",
        "<strong>II.</strong> L’art a des fonctions sociales : religieuse et rituelle (masques), commémorative (épopée des griots), politique et subversive (poésie de la négritude, rap, caricature).",
        "<strong>III.</strong> Même l’art « pur » a une fonction : il éduque la sensibilité, rassemble et fait réfléchir ; Senghor souligne le caractère fonctionnel et collectif de l’art négro-africain.",
        "<strong>Conclusion</strong> : l’art a une fonction sociale, mais il ne s’y réduit pas : sa liberté fait sa force.",
      ],
      "Sujet corrigé",
    )}`,
};

// ── Méthodologie ────────────────────────────────────────────────────────────

const DISSERTATION: LessonSpec = {
  title: "La dissertation philosophique",
  minutes: 35,
  body: `${objectifs([
      "analyser un sujet et dégager une problématique ;",
      "construire un plan et rédiger introduction, développement et conclusion.",
    ])}
    ${methode([
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
    ${retenir("Une citation ne remplace pas un argument : il faut l’expliquer et l’utiliser. Au bac, le candidat choisit entre deux sujets de dissertation et un commentaire de texte.")}
    <h2>Exemple d’introduction</h2>
    <p>Sujet : « Peut-on être libre sans obéir ? »</p>
    ${liste([
      "<strong>amorce</strong> : « Beaucoup de jeunes pensent qu’être libre, c’est faire ce que l’on veut, sans maître ni règle. »",
      "<strong>analyse et problème</strong> : « Obéir, c’est se soumettre à une volonté ou à une règle extérieure ; être libre, c’est agir par soi-même. La liberté semble donc exclure l’obéissance. Mais une liberté sans règle n’est-elle pas le règne du caprice et de la force ? »",
      "<strong>annonce du plan</strong> : « Nous verrons d’abord que la liberté paraît s’opposer à l’obéissance, puis que certaines formes d’obéissance la rendent possible, avant de montrer qu’être libre, c’est obéir à la loi que l’on s’est donnée. »",
    ])}
    ${exercice(
      "Analyse le sujet « Le bonheur est-il le but de l’existence ? » et propose une problématique et un plan.",
      [
        "<strong>Définitions</strong> : bonheur = satisfaction durable et complète ; but = fin vers laquelle on tend ; existence = vie humaine consciente.",
        "<strong>Problématique</strong> : tous les hommes recherchent le bonheur (Aristote, Pascal) ; mais faut-il faire du bonheur la fin suprême, au risque de sacrifier le devoir, la justice ou la vérité ?",
        "<strong>I.</strong> Le bonheur semble la fin ultime : on le cherche pour lui-même (Aristote, Épicure).",
        "<strong>II.</strong> Mais il est vague et incertain (Kant : « un idéal de l’imagination ») ; le devoir peut exiger de renoncer à son bonheur.",
        "<strong>III.</strong> Le but de l’existence serait plutôt de devenir digne du bonheur, et de le chercher par des voies justes, avec les autres.",
      ],
      "Exercice corrigé",
    )}
    ${auBac("Consacre environ une heure au brouillon (analyse, problématique, plan détaillé) et rédige directement l’introduction et la conclusion au propre ; garde du temps pour te relire.")}`,
};

const COMMENTAIRE: LessonSpec = {
  title: "Le commentaire de texte philosophique",
  minutes: 30,
  body: `${objectifs([
      "dégager le thème, la thèse, le problème et la structure d’un texte ;",
      "expliquer et discuter un texte philosophique.",
    ])}
    ${methode([
      "Lire le texte plusieurs fois et repérer son <strong>thème</strong> (de quoi il parle).",
      "Dégager la <strong>thèse</strong> (ce que l’auteur affirme) et le <strong>problème</strong> auquel il répond.",
      "Repérer la <strong>structure</strong> du texte (ses mouvements, les connecteurs logiques).",
      "<strong>Expliquer</strong> chaque mouvement : définir les concepts, éclairer les exemples, montrer l’enchaînement des idées.",
      "<strong>Discuter</strong> : intérêt philosophique, limites, autres auteurs.",
    ])}
    ${retenir("Expliquer n’est pas paraphraser : il faut dire ce que le texte veut dire et pourquoi il le dit ainsi.")}
    ${exercice(
      "Prépare le commentaire de ce texte : « L’homme n’est qu’un roseau, le plus faible de la nature ; mais c’est un roseau pensant. Il ne faut pas que l’univers entier s’arme pour l’écraser : une vapeur, une goutte d’eau suffit pour le tuer. Mais quand l’univers l’écraserait, l’homme serait encore plus noble que ce qui le tue, puisqu’il sait qu’il meurt, et l’avantage que l’univers a sur lui ; l’univers n’en sait rien. » (Pascal, Pensées)",
      [
        "<strong>Thème</strong> : la condition humaine ; <strong>thèse</strong> : la grandeur de l’homme tient à la pensée, malgré sa faiblesse physique.",
        "<strong>Problème</strong> : comment un être si fragile peut-il être supérieur à l’univers qui l’écrase ?",
        "<strong>Structure</strong> : 1) l’homme est faible (le roseau, la goutte d’eau) ; 2) mais il pense ; 3) sa noblesse vient de la conscience de sa mort et de sa faiblesse.",
        "<strong>Discussion</strong> : rapprocher de Descartes (la pensée comme essence) ; nuancer : la conscience est aussi source d’angoisse ; ouvrir sur la dignité humaine (Kant).",
      ],
      "Exercice corrigé",
    )}`,
};

// ── Œuvres au programme ─────────────────────────────────────────────────────

const DISCOURS_METHODE: LessonSpec = {
  title: "Descartes, Discours de la méthode",
  minutes: 45,
  body: `${objectifs([
      "situer l’œuvre et son auteur ;",
      "connaître le contenu des six parties du Discours ;",
      "relier l’œuvre aux notions du programme (raison, méthode, conscience, liberté, science et technique, langage).",
    ])}
    <h2>1. L’auteur et l’œuvre</h2>
    <p>René Descartes (1596-1650), philosophe et savant français, est considéré comme le fondateur de la philosophie moderne. Le <em>Discours de la méthode pour bien conduire sa raison et chercher la vérité dans les sciences</em> paraît en 1637, sans nom d’auteur, comme préface à trois essais scientifiques (la <em>Dioptrique</em>, les <em>Météores</em>, la <em>Géométrie</em>). Il est écrit en français et non en latin, pour s’adresser à tous ceux qui se servent de « leur raison naturelle toute pure ».</p>
    ${citation("Le bon sens est la chose du monde la mieux partagée.", "Descartes, Discours de la méthode, I<sup>re</sup> partie")}
    <h2>2. Les six parties</h2>
    ${tableau([
      ["Partie", "Contenu"],
      ["I<sup>re</sup> : considérations sur les sciences", "la raison (« bon sens ») est égale chez tous ; « ce n’est pas assez d’avoir l’esprit bon, mais le principal est de l’appliquer bien ». Récit de ses études au collège de La Flèche : seules les mathématiques donnent des certitudes ; il quitte les livres pour « le grand livre du monde »."],
      ["II<sup>e</sup> : les règles de la méthode", "dans un « poêle » d’Allemagne (1619), il décide de reconstruire ses connaissances sur des bases sûres et pose quatre règles (voir ci-dessous)."],
      ["III<sup>e</sup> : la morale par provision", "en attendant de trouver la vérité, il faut pouvoir agir : trois maximes provisoires."],
      ["IV<sup>e</sup> : la métaphysique", "le doute méthodique conduit à la première certitude : « je pense, donc je suis » ; l’âme est une substance pensante distincte du corps ; preuve de l’existence de Dieu par l’idée de parfait ; Dieu garantit la vérité des idées claires et distinctes."],
      ["V<sup>e</sup> : la physique", "lois de la nature, circulation du sang ; les animaux sont des machines ; l’homme s’en distingue par le langage et la raison, « instrument universel »."],
      ["VI<sup>e</sup> : les raisons de publier", "la science doit être utile : elle peut nous rendre « comme maîtres et possesseurs de la nature », notamment par la médecine ; il faut multiplier les expériences."],
    ])}
    ${methode([
      "<strong>Évidence</strong> : « ne recevoir jamais aucune chose pour vraie que je ne la connusse évidemment être telle », en évitant la précipitation et la prévention.",
      "<strong>Analyse</strong> : diviser chaque difficulté « en autant de parcelles qu’il se pourrait ».",
      "<strong>Synthèse (ordre)</strong> : conduire ses pensées par ordre, « en commençant par les objets les plus simples et les plus aisés à connaître ».",
      "<strong>Dénombrement</strong> : faire des revues si complètes « que je fusse assuré de ne rien omettre ».",
    ], "Les quatre règles de la méthode (II<sup>e</sup> partie)")}
    <h2>3. La morale par provision (III<sup>e</sup> partie)</h2>
    ${liste([
      "obéir aux lois et aux coutumes de son pays et suivre les opinions les plus modérées ;",
      "être ferme et résolu dans ses actions : comme des voyageurs égarés dans une forêt, marcher toujours tout droit dans une même direction ;",
      "« tâcher toujours plutôt à me vaincre que la fortune, et à changer mes désirs que l’ordre du monde ».",
    ])}
    <h2>4. Le cogito (IV<sup>e</sup> partie)</h2>
    <p>Descartes doute de tout ce qui peut l’être : les sens (qui nous trompent parfois), les raisonnements (où l’on peut se tromper), et même la distinction entre la veille et le rêve. Mais pendant qu’il doute, il pense ; et pour penser, il faut être.</p>
    ${citation("Je pense, donc je suis.", "Descartes, Discours de la méthode, IV<sup>e</sup> partie")}
    ${retenir("Le doute cartésien est <strong>méthodique</strong> et provisoire : ce n’est pas le doute sceptique qui renonce à la vérité, c’est un moyen de trouver une certitude inébranlable. Le cogito fonde la philosophie du <strong>sujet</strong> et de la conscience.")}
    <h2>5. Intérêt pour le programme</h2>
    ${tableau([
      ["Notion du programme", "Ce qu’apporte le Discours"],
      ["la réflexion philosophique", "le rôle de la raison, le doute, l’universalité du bon sens"],
      ["l’épistémologie", "la méthode, l’évidence, l’idéal d’une science mathématique de la nature"],
      ["la conscience", "le cogito, la distinction de l’âme et du corps"],
      ["le langage", "la parole, signe de la pensée, distingue l’homme de l’animal-machine"],
      ["science et technique", "« maîtres et possesseurs de la nature » : promesse et danger de la technique"],
      ["la liberté", "la résolution dans l’action, la maîtrise de ses désirs"],
    ])}
    ${exercice(
      "Explique la formule « Le bon sens est la chose du monde la mieux partagée » et montre son importance pour la suite du Discours.",
      [
        "Le « bon sens », c’est la raison, « la puissance de bien juger et distinguer le vrai d’avec le faux ».",
        "Descartes affirme qu’elle est égale chez tous les hommes : la diversité de nos opinions ne vient pas d’une inégalité de raison, mais de la manière dont nous la conduisons.",
        "D’où la nécessité d’une <strong>méthode</strong> : le problème n’est pas d’avoir l’esprit bon, mais de l’appliquer bien. La formule justifie aussi le choix d’écrire en français, pour tous.",
      ],
    )}
    ${auBac("Au Bac, l’œuvre sert surtout d’appui : cite-la avec précision (partie, idée, formule) dans tes dissertations ; un extrait du Discours peut aussi être proposé en commentaire de texte.")}`,
};

const MENON: LessonSpec = {
  title: "Platon, Ménon",
  minutes: 45,
  body: `${objectifs([
      "situer le dialogue et ses personnages ;",
      "suivre le mouvement de la recherche : définition de la vertu, paradoxe, réminiscence, méthode hypothétique ;",
      "relier l’œuvre aux notions du programme (philosophie, connaissance, vérité, éducation).",
    ])}
    <h2>1. L’auteur et l’œuvre</h2>
    <p>Platon (vers 427-347 av. J.-C.), disciple de Socrate et fondateur de l’Académie d’Athènes, a écrit des <strong>dialogues</strong> dans lesquels Socrate interroge ses interlocuteurs. Le <em>Ménon</em> met en scène Socrate, Ménon (jeune noble de Thessalie, élève du sophiste Gorgias), un jeune esclave de Ménon et Anytos (l’un des futurs accusateurs de Socrate). La question de départ est : <strong>la vertu peut-elle s’enseigner ?</strong></p>
    <h2>2. Le mouvement du dialogue</h2>
    ${tableau([
      ["Étape", "Contenu"],
      ["1. Qu’est-ce que la vertu ?", "Socrate avoue ne pas savoir ce qu’est la vertu : avant de savoir si elle s’enseigne, il faut la définir. Ménon propose une liste de vertus (de l’homme, de la femme, de l’enfant…) : Socrate lui reproche de donner un « essaim » de vertus au lieu de ce qu’elles ont en commun. Les autres définitions (commander aux hommes ; désirer les belles choses et pouvoir se les procurer) sont réfutées."],
      ["2. L’embarras", "Ménon compare Socrate à une <strong>torpille</strong>, ce poisson qui engourdit ceux qui le touchent : il ne sait plus que répondre. Socrate répond qu’il est lui-même dans l’embarras."],
      ["3. Le paradoxe de Ménon", "on ne peut chercher ni ce qu’on sait (inutile) ni ce qu’on ne sait pas (on ne saurait pas ce qu’on cherche ni le reconnaître)."],
      ["4. La réminiscence", "l’âme est immortelle et a déjà tout appris : chercher et apprendre, c’est se <strong>ressouvenir</strong> (anamnèse)."],
      ["5. L’interrogation de l’esclave", "sans rien lui enseigner, par des questions, Socrate amène l’esclave à trouver comment construire un carré d’aire double : il faut le construire sur la <strong>diagonale</strong>."],
      ["6. La méthode hypothétique", "si la vertu est une science, elle s’enseigne ; or il ne semble pas y avoir de maîtres de vertu (les grands Athéniens n’ont pas su rendre leurs fils vertueux ; Anytos méprise les sophistes)."],
      ["7. Science et opinion droite", "pour agir, une opinion vraie guide aussi bien que la science ; mais elle est instable, comme les statues de Dédale qui s’enfuient si on ne les attache pas : elle devient science quand on la « lie » par la connaissance de la cause."],
      ["8. Conclusion", "la vertu, chez ceux qui la possèdent, semble venir d’une « faveur divine » ; on ne le saura vraiment qu’en découvrant ce qu’est la vertu en elle-même."],
    ])}
    <h2>3. L’expérience de l’esclave</h2>
    ${methode([
      "Un carré a 2 pieds de côté, donc 4 pieds carrés d’aire. Quel est le côté d’un carré d’aire double (8) ?",
      "L’esclave répond d’abord : le double du côté (4). Socrate lui fait voir que ce carré a 16 d’aire : c’est faux.",
      "Il propose ensuite 3 : l’aire serait 9, encore faux. L’esclave reconnaît qu’il ne sait pas : il est passé d’un faux savoir à une ignorance consciente, ce qui est un progrès.",
      "Socrate trace la diagonale : le carré construit sur la diagonale du premier a une aire de 8. L’esclave le comprend par lui-même.",
    ], "Les étapes")}
    ${retenir("Pour Platon, la vérité n’est pas déposée de l’extérieur dans l’esprit : on la découvre en soi par le dialogue et le raisonnement. Le maître ne transmet pas un savoir, il aide l’élève à le faire naître (c’est la <strong>maïeutique</strong> socratique).")}
    ${citation("Chercher et apprendre ne sont, au total, que réminiscence.", "Platon, Ménon")}
    <h2>4. Intérêt pour le programme</h2>
    ${tableau([
      ["Notion du programme", "Ce qu’apporte le Ménon"],
      ["la réflexion philosophique", "la méthode socratique : ironie, réfutation, aveu d’ignorance, recherche de la définition"],
      ["la connaissance et la vérité", "différence entre opinion vraie et science ; rôle du raisonnement ; place des mathématiques"],
      ["l’éducation et la culture", "peut-on enseigner la vertu ? Qu’est-ce qu’apprendre ?"],
      ["l’individu et la société", "l’esclave, homme sans statut, est capable de vérité : la raison est universelle"],
    ])}
    ${exercice(
      "Montre en quoi l’interrogation de l’esclave répond au paradoxe de Ménon.",
      [
        "Le paradoxe affirme qu’on ne peut pas chercher ce qu’on ne sait pas, puisqu’on ne saurait pas le reconnaître.",
        "L’esclave ignorait la solution, mais il a pu la chercher et la reconnaître quand il l’a trouvée : il possédait en lui, sans le savoir, de quoi juger du vrai.",
        "Platon l’explique par la réminiscence : apprendre, c’est se ressouvenir. La recherche est donc possible, et l’aveu d’ignorance en est la première étape.",
      ],
    )}
    ${auBac("Utilise le Ménon dans les sujets sur la vérité, l’éducation, la philosophie ou l’opinion : l’exemple de l’esclave et l’image des statues de Dédale sont très parlants.")}`,
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
  {
    title: "Les œuvres au programme : Descartes et Platon",
    summary: "Descartes, Discours de la méthode ; Platon, Ménon : contenu, idées clés et utilisation dans les dissertations.",
    strand: OEUVRES,
    lessons: [DISCOURS_METHODE, MENON],
  },
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
  {
    title: "L’œuvre au programme : le Discours de la méthode",
    summary: "Descartes, Discours de la méthode : les six parties, la méthode, le cogito, la morale par provision.",
    strand: OEUVRES,
    lessons: [DISCOURS_METHODE],
  },
];
