import "server-only";

// CFEE blanc DIANGAL, langue et communication, contrôle des ressources (45 min, 40 points). Même forme que les
// sujets officiels de 2023 à 2026 : un texte sans titre, compréhension 5 points et ressources 15 points, l'épreuve
// étant notée sur 20 puis multipliée par 2 (soit 10 et 30 points). La compréhension demande toujours le type de
// texte et un titre. Textes originaux écrits par DIANGAL.

import type { MockExamSpec } from "../../exercise-series";
import { head, reading } from "./helpers";

const RESSOURCES = head("Contrôle des ressources", 30);

const spec = (n: number, text: string, comprehension: MockExamSpec["parts"][number]["questions"], parts: MockExamSpec["parts"]): MockExamSpec => ({
  id: `cfee-blanc-${n}-1-langue-ressources`,
  subject: "FR",
  title: `CFEE blanc DIANGAL n°${n} : langue et communication (ressources)`,
  durationMin: 45,
  parts: [
    {
      chapter: "Lire et comprendre un texte",
      stem: `${head("Compréhension du texte", 10, "Lis bien le texte, puis réponds aux questions. À l’examen, l’épreuve est notée sur 20 points, puis multipliée par 2.")}${text}`,
      questions: comprehension,
    },
    ...parts.map((part) => ({ ...part, stem: RESSOURCES })),
  ],
});

const PIROGUES = reading(
  "Ce matin-là, le soleil se levait à peine sur la plage de Kayar quand Modou aperçut les premières pirogues. Il courut prévenir sa grand-mère, qui vendait du poisson depuis quarante ans. « Elles reviennent lourdes, dit-elle en souriant. La mer a été généreuse. »",
  "Bientôt, les pêcheurs sautèrent dans l’eau et tirèrent les embarcations sur le sable. Les femmes s’approchèrent avec leurs bassines, les charrettes attendaient et tout le monde parlait en même temps. Modou aida son oncle à décharger les caisses. À midi, il ne restait plus un seul poisson.",
  "Fatigué mais fier, le garçon reçut une belle dorade pour le repas du soir. Sa grand-mère lui dit alors : « Travaille bien à l’école, mon petit. La mer nourrit ceux qui la respectent, et le savoir aussi. »",
);

const PUITS = reading(
  "Chaque matin, avant le lever du soleil, Coumba et sa sœur prenaient le chemin du puits. Il fallait marcher longtemps, car la saison sèche avait vidé les mares autour de Mbirkilane.",
  "Un jour, des techniciens arrivèrent au village avec un grand camion. Pendant trois semaines, ils creusèrent le sol et installèrent une pompe. Les anciens se réunirent sous l’arbre à palabres pour choisir un comité de gestion, car l’eau appartient à tous.",
  "Quand le premier robinet coula, les enfants crièrent de joie et les femmes battirent des mains. Depuis ce jour, Coumba arrive à l’heure à l’école. Elle a même le temps de réviser ses leçons. « L’eau, dit souvent son père, c’est la santé, mais c’est aussi le temps qu’on gagne. »",
);

const BIBLIOTHEQUE = reading(
  "Saint-Louis, le 3 février",
  "Chère Mariama,",
  "Depuis la rentrée, une petite bibliothèque a ouvert dans notre école. Au début, je n’y allais jamais : je préférais jouer au ballon dans la cour. Un après-midi, il a plu très fort et le maître nous a gardés à l’intérieur.",
  "Pour passer le temps, j’ai ouvert un livre qui racontait la vie d’Aline Sitoé Diatta. Je l’ai lu sans lever la tête, oubliant mes camarades et la pluie. Le lendemain, je suis retournée emprunter un autre livre, puis un autre encore.",
  "Aujourd’hui, je prête mes livres préférés à ma petite sœur et nous discutons des histoires le soir. Mon maître dit que lire, c’est voyager sans quitter sa chaise. Je crois qu’il a raison : grâce aux livres, j’ai déjà visité des pays que je ne connaissais même pas.",
  "Écris-moi vite pour me dire quel livre tu lis en ce moment. Ta cousine qui t’embrasse.",
);

const ARBRES = reading(
  "À l’entrée de notre village, près de Fatick, se dressait autrefois un baobab si gros que six enfants se tenant par la main n’arrivaient pas à en faire le tour. Aujourd’hui, il ne reste que quelques arbres autour de nous. Pourquoi faut-il absolument les protéger ?",
  "D’abord, les arbres retiennent la terre : là où on les coupe pour faire du charbon, le vent emporte le sol des champs. Ensuite, ils nous donnent de l’ombre, des fruits et du bois. Enfin, ils gardent l’humidité du sol et rafraîchissent l’air.",
  "Alors, à chaque hivernage, que chacun plante un arbre et l’arrose jusqu’à ce qu’il soit assez fort. Si nous le faisons tous, nos enfants s’assiéront un jour à son ombre.",
);

export const LANGUE_RESSOURCES: MockExamSpec[] = [
  spec(
    1,
    PIROGUES,
    [
      { qcm: "Où se passe cette histoire ?", choices: ["*Sur la plage de Kayar", "Au marché de Dakar", "Dans une école de Kaolack", "Sur le fleuve Sénégal"], why: "Le texte le dit dès la première phrase : « sur la plage de Kayar »." },
      { qcm: "De quel type de texte s’agit-il ?", choices: ["*Un texte narratif", "Un texte injonctif", "Une lettre", "Une recette"], why: "Le texte raconte une histoire, avec des personnages et des événements qui se suivent : c’est un texte narratif." },
      { qcm: "Dans le texte, le mot « embarcations » désigne :", choices: ["*les pirogues", "les charrettes", "les bassines", "les caisses"], why: "Les pêcheurs tirent sur le sable les bateaux avec lesquels ils reviennent : les embarcations sont les pirogues." },
      { qcm: "Que reçoit Modou à la fin de la matinée ?", choices: ["*Une dorade", "Une caisse", "Une pirogue", "Un cahier"], why: "« Le garçon reçut une belle dorade pour le repas du soir. »" },
      { qcm: "Quel titre convient le mieux à ce texte ?", choices: ["*Le retour des pirogues", "Une journée à l’école", "Le marché de Dakar", "La grand-mère malade"], why: "Tout le texte raconte l’arrivée des pêcheurs sur la plage et ce qui s’ensuit." },
    ],
    [
      {
        chapter: "Les fonctions dans la phrase",
        questions: [
          { qcm: "Dans la phrase « Les pêcheurs tirèrent les embarcations », quel est le sujet ?", choices: ["*Les pêcheurs", "tirèrent", "les embarcations"], why: "On demande : qui est-ce qui tire ? Ce sont les pêcheurs : c’est le sujet du verbe." },
          { qcm: "Dans la phrase « Modou aida son oncle », le groupe « son oncle » est :", choices: ["*complément d’objet direct", "sujet", "complément de lieu"], why: "On demande : Modou aida qui ? Son oncle. Il n’y a pas de préposition : c’est un complément d’objet direct." },
        ],
      },
      {
        chapter: "La phrase et les propositions",
        questions: [
          { qcm: "Analyse logique. Dans « Modou aida son oncle pendant que les femmes attendaient », le groupe « pendant que les femmes attendaient » est :", choices: ["*une proposition subordonnée conjonctive", "une proposition principale", "une proposition indépendante", "une proposition subordonnée relative"], why: "Elle est introduite par la locution conjonctive « pendant que » et complète la principale « Modou aida son oncle » : elle indique le temps." },
        ],
      },
      {
        chapter: "La proposition subordonnée",
        questions: [
          { qcm: "Dans « Il prévint sa grand-mère, qui vendait du poisson », quelle est la proposition subordonnée relative ?", choices: ["*qui vendait du poisson", "Il prévint sa grand-mère", "sa grand-mère", "du poisson"], why: "Elle commence par le pronom relatif « qui » et complète le nom « grand-mère »." },
        ],
      },
      {
        chapter: "Les temps du passé",
        questions: [
          { qcm: "Dans « le garçon reçut une dorade », le verbe est au :", choices: ["*passé simple", "imparfait", "présent", "futur simple"], why: "« Reçut » est le passé simple du verbe recevoir, à la 3e personne du singulier." },
          { qcm: "À l’imparfait, « vous (être) » donne :", choices: ["*vous étiez", "vous êtes", "vous serez", "vous fûtes"], why: "À l’imparfait, le verbe être donne : j’étais, tu étais, il était, nous étions, vous étiez, ils étaient." },
        ],
      },
      {
        chapter: "Le présent de l’indicatif",
        questions: [
          { qcm: "Au présent, « ils (finir) » donne :", choices: ["*ils finissent", "ils finisent", "ils finnissent", "ils finiront"], why: "Finir est du 2e groupe : ils finissent, avec « -issent »." },
        ],
      },
      {
        chapter: "Le futur et le conditionnel",
        questions: [
          { qcm: "Au futur simple, « nous (aller) » donne :", choices: ["*nous irons", "nous allerons", "nous allions", "nous irions"], why: "Le verbe aller change de radical au futur : j’irai, tu iras, il ira, nous irons." },
        ],
      },
      {
        chapter: "Les homophones grammaticaux",
        questions: [
          { qcm: "Complète : Les pêcheurs ___ fatigués.", choices: ["*sont", "son"], why: "On peut dire « étaient fatigués » : c’est le verbe être, donc « sont ». « Son » est un déterminant : son oncle." },
          { qcm: "Complète : Modou ___ aidé son oncle.", choices: ["*a", "à"], why: "On peut dire « avait aidé » : c’est le verbe avoir, donc « a », sans accent." },
        ],
      },
      {
        chapter: "Les accords",
        questions: [
          { qcm: "Quelle phrase respecte l’accord de l’adjectif ?", choices: ["*Les bassines sont pleines.", "Les bassines sont plein.", "Les bassines sont pleine.", "Les bassines sont pleins."], why: "L’adjectif s’accorde avec le nom « bassines », féminin pluriel : pleines." },
          { qcm: "Corrige le mot souligné : « Les pêcheurs ont <u>tirer</u> les pirogues sur le sable. »", choices: ["*tiré", "tirés", "tirée", "tirent"], why: "Après l’auxiliaire avoir, on écrit le participe passé : ils ont tiré. Il ne s’accorde pas avec le sujet." },
        ],
      },
      {
        chapter: "Le sens des mots",
        questions: [
          { qcm: "Quel est le contraire de « lourd » ?", choices: ["*léger", "gros", "fort", "plein"], why: "Lourd s’oppose à léger : une caisse lourde, une caisse légère." },
          { qcm: "Dans le texte, une mer « généreuse » est une mer :", choices: ["*qui donne beaucoup de poissons", "très profonde", "très agitée", "qui fait peur"], why: "Les pirogues reviennent lourdes : on dit que la mer donne beaucoup, comme une personne généreuse." },
        ],
      },
      {
        chapter: "La formation des mots",
        questions: [
          { qcm: "Quel mot est de la même famille que « pêche » ?", choices: ["*pêcheur", "péché", "plage", "pirogue"], why: "Pêcheur est formé à partir de pêche, avec le suffixe -eur. « Péché » a un autre sens et s’écrit autrement." },
        ],
      },
    ],
  ),
  spec(
    2,
    PUITS,
    [
      { qcm: "Pourquoi Coumba et sa sœur devaient-elles marcher longtemps ?", choices: ["*La saison sèche avait vidé les mares.", "Elles habitaient à Dakar.", "Le camion était en panne.", "L’école était fermée."], why: "« Il fallait marcher longtemps, car la saison sèche avait vidé les mares. »" },
      { qcm: "De quel type de texte s’agit-il ?", choices: ["*Un texte narratif", "Une recette", "Une lettre", "Une description d’un métier"], why: "Le texte raconte ce qui s’est passé à Mbirkilane, dans l’ordre des événements : c’est un texte narratif." },
      { qcm: "Que choisissent les anciens sous l’arbre à palabres ?", choices: ["*Un comité de gestion", "Un maître d’école", "Un nouveau puits", "Un chef de chantier"], why: "Ils se réunissent « pour choisir un comité de gestion, car l’eau appartient à tous »." },
      { qcm: "Qu’est-ce qui a changé pour Coumba ?", choices: ["*Elle arrive à l’heure à l’école.", "Elle ne va plus à l’école.", "Elle travaille avec les techniciens.", "Elle a déménagé."], why: "« Depuis ce jour, Coumba arrive à l’heure à l’école. » Elle a aussi le temps de réviser." },
      { qcm: "Quel titre convient le mieux à ce texte ?", choices: ["*L’eau arrive à Mbirkilane", "La rentrée des classes", "Un camion en panne", "Le chef du village"], why: "Le texte raconte comment le village a obtenu l’eau au robinet, et ce que cela a changé." },
    ],
    [
      {
        chapter: "La phrase et les propositions",
        questions: [
          { qcm: "Combien de propositions y a-t-il dans « Quand le robinet coula, les enfants crièrent » ?", choices: ["*2", "1", "3", "4"], why: "Il y a deux verbes conjugués (coula, crièrent), donc deux propositions." },
          { qcm: "Comment dit-on à la forme négative « Coumba arrive à l’heure » ?", choices: ["*Coumba n’arrive pas à l’heure.", "Coumba arrive pas à l’heure.", "Coumba ne arrive à l’heure.", "Non, Coumba arrive à l’heure."], why: "La négation entoure le verbe : ne… pas. Devant une voyelle, « ne » devient « n’ »." },
        ],
      },
      {
        chapter: "Les fonctions dans la phrase",
        questions: [
          { qcm: "Dans « Les anciens se réunirent sous l’arbre à palabres », le groupe « sous l’arbre à palabres » est un complément :", choices: ["*de lieu", "de temps", "d’objet direct", "de manière"], why: "Il répond à la question : où ? C’est un complément circonstanciel de lieu." },
        ],
      },
      {
        chapter: "Déterminants et pronoms",
        questions: [
          { qcm: "Dans « Elle a même le temps de réviser », le pronom « Elle » remplace :", choices: ["*Coumba", "l’eau", "la pompe", "la saison"], why: "La phrase d’avant parle de Coumba : « Elle » évite de répéter son nom." },
        ],
      },
      {
        chapter: "Les temps du passé",
        questions: [
          { qcm: "Dans « la saison sèche avait vidé les mares », le verbe est au :", choices: ["*plus-que-parfait", "passé composé", "imparfait", "passé simple"], why: "Auxiliaire à l’imparfait (avait) et participe passé (vidé) : c’est le plus-que-parfait." },
        ],
      },
      {
        chapter: "Le présent de l’indicatif",
        questions: [
          { qcm: "Au présent, « nous (manger) » donne :", choices: ["*nous mangeons", "nous mangons", "nous mangions", "nous mangerons"], why: "Avec « nous », on garde le « e » après le « g » pour conserver le son « je » : nous mangeons." },
        ],
      },
      {
        chapter: "Le futur et le conditionnel",
        questions: [
          { qcm: "Au conditionnel présent, « je (vouloir) » donne :", choices: ["*je voudrais", "je voudrai", "je voulais", "je veux"], why: "Conditionnel : radical du futur (voudr-) et terminaison de l’imparfait (-ais). « Je voudrai » est au futur." },
        ],
      },
      {
        chapter: "Le subjonctif et l’impératif",
        questions: [
          { qcm: "À l’impératif présent, à la 2e personne du singulier, « finir » donne :", choices: ["*finis", "finit", "finissez", "finir"], why: "À l’impératif, il n’y a pas de sujet écrit : Finis ton travail !" },
        ],
      },
      {
        chapter: "Les homophones grammaticaux",
        questions: [
          { qcm: "Complète : Voici le puits ___ Coumba puise de l’eau.", choices: ["*où", "ou"], why: "« Où » indique le lieu. « Ou » veut dire « ou bien » : de l’eau ou du lait." },
          { qcm: "Complète : Coumba révise ___ leçons.", choices: ["*ses", "ces", "c’est"], why: "Il s’agit des leçons de Coumba : « ses » (les siennes)." },
        ],
      },
      {
        chapter: "Les accords",
        questions: [
          { qcm: "Quel est le pluriel de « un travail » ?", choices: ["*des travaux", "des travails", "des travaus", "des travail"], why: "Les noms en -ail qui font leur pluriel en -aux sont à retenir : un travail, des travaux." },
          { qcm: "Corrige le mot souligné : « Les femmes ont <u>battus</u> des mains. »", choices: ["*battu", "battues", "battre", "battent"], why: "Avec l’auxiliaire avoir, le participe passé ne s’accorde pas avec le sujet : elles ont battu." },
        ],
      },
      {
        chapter: "Le sens des mots",
        questions: [
          { qcm: "Quel est le contraire du verbe « arriver » ?", choices: ["*partir", "venir", "marcher", "entrer"], why: "On arrive quelque part, on part d’un endroit : ce sont deux verbes de sens opposés." },
          { qcm: "Quel mot peut remplacer « installèrent » dans « ils installèrent une pompe » ?", choices: ["*placèrent", "cassèrent", "vendirent", "cachèrent"], why: "Installer, c’est mettre en place : « placer » est le mot le plus proche." },
        ],
      },
      {
        chapter: "La formation des mots",
        questions: [
          { qcm: "Quel mot est de la même famille que « joie » ?", choices: ["*joyeux", "jouer", "jeune", "jour"], why: "Joyeux vient de joie : « crier de joie », « un enfant joyeux »." },
        ],
      },
    ],
  ),
  spec(
    3,
    BIBLIOTHEQUE,
    [
      { qcm: "De quel type de texte s’agit-il ?", choices: ["*Une lettre", "Une recette", "Un poème", "Un texte de loi"], why: "On y trouve le lieu et la date, une formule pour saluer (« Chère Mariama ») et une formule pour finir : c’est une lettre." },
      { qcm: "Pourquoi les élèves sont-ils restés à l’intérieur ce jour-là ?", choices: ["*Il pleuvait très fort.", "Le ballon était perdu.", "Le maître était absent.", "La cour était fermée pour travaux."], why: "« Il a plu très fort et le maître nous a gardés à l’intérieur. »" },
      { qcm: "De quoi parlait le livre qu’elle a ouvert ?", choices: ["*De la vie d’Aline Sitoé Diatta", "Du football", "De la ville de Saint-Louis", "De la pluie"], why: "« Un livre qui racontait la vie d’Aline Sitoé Diatta. »" },
      { qcm: "« Lire, c’est voyager sans quitter sa chaise » veut dire :", choices: ["*Les livres font découvrir d’autres lieux.", "Il faut lire assis.", "Il ne faut jamais voyager.", "Les chaises sont utiles en voyage."], why: "La narratrice l’explique : « grâce aux livres, j’ai déjà visité des pays que je ne connaissais même pas »." },
      { qcm: "Quel titre convient le mieux à ce texte ?", choices: ["*La découverte de la lecture", "Un match de football", "La pluie à Saint-Louis", "Le départ du maître"], why: "La narratrice raconte comment elle s’est mise à aimer lire." },
    ],
    [
      {
        chapter: "La proposition subordonnée",
        questions: [
          { qcm: "Dans « un livre qui racontait la vie », le mot « qui » est :", choices: ["*un pronom relatif", "un nom", "un verbe", "un adjectif"], why: "« Qui » remplace « livre » et introduit une proposition subordonnée relative." },
        ],
      },
      {
        chapter: "Les fonctions dans la phrase",
        questions: [
          { qcm: "Dans « Je prête mes livres à ma sœur », le groupe « à ma sœur » est :", choices: ["*complément d’objet indirect", "complément d’objet direct", "sujet", "complément de temps"], why: "On demande : je prête à qui ? À ma sœur. Il est relié au verbe par la préposition « à » : c’est un complément d’objet indirect." },
          { qcm: "Dans « Mon maître est content », le mot « content » est :", choices: ["*attribut du sujet", "sujet", "complément d’objet direct", "complément de lieu"], why: "Il suit le verbe être et donne une qualité au sujet « Mon maître » : c’est un attribut du sujet." },
        ],
      },
      {
        chapter: "Déterminants et pronoms",
        questions: [
          { qcm: "Dans « mes livres préférés », le mot « mes » est un déterminant :", choices: ["*possessif", "démonstratif", "indéfini", "article"], why: "« Mes » indique à qui appartiennent les livres : c’est un déterminant possessif." },
        ],
      },
      {
        chapter: "Les temps du passé",
        questions: [
          { qcm: "Dans « il a plu très fort », le verbe est au :", choices: ["*passé composé", "présent", "imparfait", "futur simple"], why: "Auxiliaire au présent (a) et participe passé (plu) : c’est le passé composé." },
          { qcm: "À l’imparfait, « nous (finir) » donne :", choices: ["*nous finissions", "nous finissons", "nous finirons", "nous finirions"], why: "À l’imparfait, les verbes du 2e groupe prennent -issions avec « nous »." },
        ],
      },
      {
        chapter: "Le futur et le conditionnel",
        questions: [
          { qcm: "Au futur simple, « je (voir) » donne :", choices: ["*je verrai", "je voirai", "je vois", "je verrais"], why: "Le verbe voir change de radical au futur : je verrai. « Je verrais » est au conditionnel." },
        ],
      },
      {
        chapter: "Le subjonctif et l’impératif",
        questions: [
          { qcm: "Complète : Il faut que tu ___ ce livre. (lire)", choices: ["*lises", "lis", "liras", "lisais"], why: "Après « il faut que », on emploie le subjonctif présent : que tu lises." },
        ],
      },
      {
        chapter: "Les homophones grammaticaux",
        questions: [
          { qcm: "Complète : Ma sœur ___ assise près de moi.", choices: ["*s’est", "c’est", "ses", "ces"], why: "On peut dire « elle s’était assise » : c’est le verbe pronominal « s’asseoir », donc « s’est »." },
          { qcm: "Complète : Les élèves rendent ___ livres.", choices: ["*leurs", "leur"], why: "Devant un nom au pluriel (livres), le déterminant s’écrit avec un s : leurs livres." },
        ],
      },
      {
        chapter: "Les accords",
        questions: [
          { qcm: "Corrige le mot souligné : « Ces histoires sont <u>beaux</u>. »", choices: ["*belles", "beau", "belle", "beaus"], why: "L’adjectif s’accorde avec « histoires », féminin pluriel : belles." },
        ],
      },
      {
        chapter: "Mots invariables et ponctuation",
        questions: [
          { qcm: "Lequel de ces mots est invariable ?", choices: ["*toujours", "livre", "petite", "lire"], why: "« Toujours » est un adverbe : son orthographe ne change jamais." },
        ],
      },
      {
        chapter: "Le sens des mots",
        questions: [
          { qcm: "Quel est le contraire du verbe « prêter » ?", choices: ["*emprunter", "donner", "lire", "acheter"], why: "Celui qui prête donne pour un temps ; celui qui emprunte reçoit pour un temps." },
          { qcm: "« Dévorer un livre » veut dire :", choices: ["*le lire avec passion", "le manger", "le déchirer", "le perdre"], why: "C’est le sens figuré de « dévorer » : on lit très vite, parce qu’on aime beaucoup." },
        ],
      },
      {
        chapter: "La formation des mots",
        questions: [
          { qcm: "Dans le verbe « relire », le préfixe « re- » veut dire :", choices: ["*de nouveau", "avant", "le contraire", "très peu"], why: "Relire, c’est lire de nouveau ; refaire, c’est faire de nouveau." },
        ],
      },
    ],
  ),
  spec(
    4,
    ARBRES,
    [
      { qcm: "De quel type de texte s’agit-il ?", choices: ["*Un texte argumentatif", "Une recette", "Une lettre", "Un conte"], why: "L’auteur donne des raisons (d’abord, ensuite, enfin) pour nous convaincre de protéger les arbres : c’est un texte argumentatif. On accepte aussi « texte explicatif »." },
      { qcm: "D’après le texte, que se passe-t-il là où on coupe les arbres ?", choices: ["*Le vent emporte le sol des champs.", "Il pleut davantage.", "Les fruits sont plus gros.", "L’air devient plus frais."], why: "« Là où on les coupe pour faire du charbon, le vent emporte le sol des champs. »" },
      { qcm: "Combien de raisons de protéger les arbres l’auteur donne-t-il ?", choices: ["*Trois", "Une", "Deux", "Six"], why: "Les mots « d’abord », « ensuite » et « enfin » annoncent trois raisons." },
      { qcm: "Que demande l’auteur à chacun ?", choices: ["*De planter un arbre et de l’arroser", "De couper du bois", "De faire du charbon", "De mesurer le baobab"], why: "« Que chacun plante un arbre et l’arrose jusqu’à ce qu’il soit assez fort. »" },
      { qcm: "Quel titre convient le mieux à ce texte ?", choices: ["*Plantons des arbres !", "La fête du village", "Le charbon de bois", "Un baobab malade"], why: "Tout le texte explique pourquoi protéger les arbres et demande d’en planter." },
    ],
    [
      {
        chapter: "La proposition subordonnée",
        questions: [
          { qcm: "Dans « Si chacun plante un arbre, vos enfants auront de l’ombre », quelle est la proposition principale ?", choices: ["*vos enfants auront de l’ombre", "Si chacun plante un arbre", "chacun plante", "un arbre"], why: "« Si chacun plante un arbre » est subordonnée : elle ne peut pas rester seule. La principale a un sens complet." },
        ],
      },
      {
        chapter: "Les fonctions dans la phrase",
        questions: [
          { qcm: "Dans « Un matin d’hivernage, notre maîtresse nous a conduits », le groupe « Un matin d’hivernage » est un complément :", choices: ["*de temps", "de lieu", "d’objet direct", "de manière"], why: "Il répond à la question : quand ? C’est un complément circonstanciel de temps." },
        ],
      },
      {
        chapter: "Déterminants et pronoms",
        questions: [
          { qcm: "Dans « Nous avons creusé », le mot « Nous » est un pronom personnel de la :", choices: ["*1re personne du pluriel", "1re personne du singulier", "2e personne du pluriel", "3e personne du pluriel"], why: "« Nous » désigne le groupe dont fait partie celui qui parle : 1re personne du pluriel." },
        ],
      },
      {
        chapter: "La phrase et les propositions",
        questions: [
          { qcm: "Quelle phrase est interrogative ?", choices: ["*Qui a planté cet arbre ?", "Plante cet arbre.", "Quel bel arbre !", "Cet arbre est grand."], why: "Elle pose une question et se termine par un point d’interrogation." },
        ],
      },
      {
        chapter: "Les temps du passé",
        questions: [
          { qcm: "Dans « se dressait un baobab », à quel temps est le verbe ?", choices: ["*L’imparfait", "Le présent", "Le passé simple", "Le futur simple"], why: "La terminaison -ait indique l’imparfait ; il décrit ce qui durait dans le passé." },
          { qcm: "Au passé composé, « nous (planter) » donne :", choices: ["*nous avons planté", "nous plantions", "nous plantâmes", "nous sommes plantés"], why: "Passé composé : auxiliaire avoir au présent et participe passé." },
        ],
      },
      {
        chapter: "Le futur et le conditionnel",
        questions: [
          { qcm: "Dans « nos enfants s’assiéront », le verbe est au :", choices: ["*futur simple", "présent", "imparfait", "passé simple"], why: "L’auteur parle d’un temps à venir : la terminaison -ont après le radical du futur l’indique." },
        ],
      },
      {
        chapter: "Le subjonctif et l’impératif",
        questions: [
          { qcm: "À l’impératif présent, à la 1re personne du pluriel, « arroser » donne :", choices: ["*arrosons", "arrosez", "arrose", "nous arrosons"], why: "À l’impératif, il n’y a pas de sujet écrit : Arrosons ces plants !" },
        ],
      },
      {
        chapter: "Les homophones grammaticaux",
        questions: [
          { qcm: "Complète : Les élèves ___ planté des arbres.", choices: ["*ont", "on"], why: "On peut dire « avaient planté » : c’est le verbe avoir, donc « ont »." },
          { qcm: "Complète : Le plant ___ encore petit.", choices: ["*est", "et"], why: "On peut dire « était petit » : c’est le verbe être, donc « est »." },
          { qcm: "Complète : Pose le plant ___, près du trou.", choices: ["*là", "la"], why: "« Là » indique le lieu, on peut dire « à cet endroit ». « La » est un déterminant : la terre." },
        ],
      },
      {
        chapter: "Les accords",
        questions: [
          { qcm: "Corrige le mot souligné : « Les plants sont <u>arrosé</u> chaque matin. »", choices: ["*arrosés", "arrosées", "arroser", "arrosent"], why: "Avec être, le participe passé s’accorde avec le sujet « les plants », masculin pluriel : arrosés." },
        ],
      },
      {
        chapter: "Le sens des mots",
        questions: [
          { qcm: "Complète avec le bon homonyme : Les feuilles de l’arbre sont d’un beau ___.", choices: ["*vert", "ver", "verre", "vers"], why: "Le vert est une couleur. Un ver est un animal, un verre sert à boire, et les vers forment un poème." },
          { qcm: "Quel mot est le plus proche de « se dressait » dans le texte ?", choices: ["*s’élevait", "tombait", "courait", "dormait"], why: "Un arbre qui se dresse est debout et s’élève vers le ciel." },
        ],
      },
      {
        chapter: "La formation des mots",
        questions: [
          { qcm: "Quel mot est de la même famille que « bois » ?", choices: ["*reboiser", "boire", "boîte", "boisson"], why: "Reboiser, c’est replanter du bois, des arbres. « Boire » et « boisson » n’ont aucun lien avec le bois." },
        ],
      },
    ],
  ),
];
