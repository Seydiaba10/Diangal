import "server-only";

// CFEE blanc DIANGAL, découverte du monde (60 min, 40 points). Épreuve unique du guide pratique du CFEE :
// ressources 24 points (histoire 8, géographie 8, initiation scientifique et technologique 8) et
// compétence 16 points, une situation d'intégration en initiation scientifique et technologique (IST).
// Les faits suivent les leçons de CM2 de DIANGAL (cm2/esvs.ts).

import type { MockExamSpec } from "../../exercise-series";
import { schemaFig } from "../../illustrated-questions";
import { head, reading } from "./helpers";

const HISTOIRE = head("Histoire", 8);
const GEOGRAPHIE = head("Géographie", 8);
const IST = head("Initiation scientifique et technologique", 8);

const CARTE = schemaFig("sn-regions", "Carte du Sénégal et de ses 14 régions ; Dakar est marquée d’un point rouge.");
const FLEUVES = schemaFig("g5-fleuves", "Carte des cours d’eau du Sénégal.");
const EMPIRES = schemaFig("cm2-empires", "Une frise : l’empire du Ghana, puis l’empire du Mali, puis l’empire songhaï.");
const DIGESTION = schemaFig("cm2-digestion", "Le trajet des aliments : bouche, œsophage, estomac, intestin grêle, gros intestin.");
const RESPIRATION = schemaFig("cm2-respiration", "Le trajet de l’air : nez ou bouche, trachée, bronches, poumons.");
const CIRCUIT = schemaFig("ce2-circuit", "Un circuit électrique fermé : la pile, les fils, l’interrupteur et l’ampoule.");

type Part = MockExamSpec["parts"][number];

const spec = (n: number, parts: Part[], situation: string, competence: Omit<Part, "stem">[]): MockExamSpec => ({
  id: `cfee-blanc-${n}-5-decouverte-monde`,
  subject: "ESVS",
  title: `CFEE blanc DIANGAL n°${n} : découverte du monde`,
  durationMin: 60,
  parts: [
    ...parts,
    ...competence.map((part) => ({
      ...part,
      stem: `${head("Contrôle de la compétence", 16, "Réponds aux questions qui suivent ce contexte.")}${situation}`,
      questions: part.questions.map((q) => ({ ...q, pts: 4 })),
    })),
  ],
});

export const DECOUVERTE_MONDE: MockExamSpec[] = [
  spec(
    1,
    [
      {
        chapter: "Les grands empires du Soudan occidental",
        stem: HISTOIRE,
        questions: [
          { qcm: "Quel empire Soundjata Keïta a-t-il fondé après la bataille de Kirina ?", choices: ["*L’empire du Mali", "L’empire du Ghana", "L’empire songhaï", "Le royaume du Cayor"], why: "Vers 1235, Soundjata Keïta remporte la bataille de Kirina et fonde l’empire du Mali." },
          { qcm: "D’après la frise, quel empire vient juste après celui du Mali ?", fig: EMPIRES, choices: ["*L’empire songhaï", "L’empire du Ghana", "Le royaume du Djolof"], why: "La frise se lit de gauche à droite : le Ghana, puis le Mali, puis l’empire songhaï." },
        ],
      },
      {
        chapter: "La traite négrière",
        stem: HISTOIRE,
        questions: [{ qcm: "Où se trouve la Maison des esclaves, lieu de mémoire de la traite ?", choices: ["*À Gorée", "À Kaolack", "À Tambacounda", "À Matam"], why: "L’île de Gorée, au large de Dakar, était un comptoir de traite. Sa Maison des esclaves est inscrite au patrimoine mondial." }],
      },
      {
        chapter: "La conquête coloniale et les résistances",
        stem: HISTOIRE,
        questions: [{ qcm: "À quelle construction le damel Lat Dior s’est-il opposé ?", choices: ["*Le chemin de fer Dakar–Saint-Louis", "Le barrage de Diama", "Le port de Dakar", "L’aéroport de Dakar"], why: "Lat Dior s’oppose au chemin de fer, qui traverse le Cayor. Il meurt au combat à Dékheulé en 1886." }],
      },
      {
        chapter: "Le Sénégal : situation et milieu physique",
        stem: GEOGRAPHIE,
        questions: [
          { qcm: "Quel pays se trouve au nord du Sénégal ?", choices: ["*La Mauritanie", "La Guinée", "Le Mali", "La Gambie"], why: "Au nord, la Mauritanie ; à l’est, le Mali ; au sud, la Guinée et la Guinée-Bissau." },
          { qcm: "Comment appelle-t-on la saison des pluies au Sénégal ?", choices: ["*L’hivernage", "L’harmattan", "La mousson", "La saison sèche"], why: "L’hivernage dure de juin-juillet à octobre. L’harmattan et la mousson sont des vents." },
        ],
      },
      {
        chapter: "La population et les régions du Sénégal",
        stem: GEOGRAPHIE,
        questions: [{ num: "D’après la carte, combien de régions compte le Sénégal ?", fig: CARTE, answer: 14, why: "Le Sénégal compte 14 régions ; chacune a un chef-lieu." }],
      },
      {
        chapter: "Les activités économiques du Sénégal",
        stem: GEOGRAPHIE,
        questions: [{ qcm: "Quelles sont les principales cultures du bassin arachidier ?", choices: ["*L’arachide et le mil", "Le riz et le coton", "Le café et le cacao", "Les légumes des Niayes"], why: "Le bassin arachidier produit surtout de l’arachide et du mil. Le riz pousse dans la vallée du fleuve et en Casamance." }],
      },
      {
        chapter: "La digestion et la nutrition",
        stem: IST,
        questions: [
          { qcm: "D’après le schéma, où passent les aliments juste après l’estomac ?", fig: DIGESTION, choices: ["*Dans l’intestin grêle", "Dans l’œsophage", "Dans la bouche", "Dans les poumons"], why: "Le trajet est : bouche, œsophage, estomac, intestin grêle, gros intestin." },
          { qcm: "Dans la bouche, la salive :", choices: ["*commence la digestion de l’amidon", "transporte le dioxygène", "réabsorbe l’eau", "fait battre le cœur"], why: "Les dents broient les aliments et la salive commence la digestion de l’amidon." },
        ],
      },
      {
        chapter: "La respiration et la circulation",
        stem: IST,
        questions: [
          { qcm: "Par quels vaisseaux le sang revient-il au cœur ?", choices: ["*Les veines", "Les artères", "Les bronches", "Les nerfs"], why: "Le cœur envoie le sang par les artères ; le sang revient au cœur par les veines." },
          { vf: "Pendant l’inspiration, l’air entre dans les poumons.", answer: true, why: "À l’inspiration, la cage thoracique s’agrandit et l’air entre. À l’expiration, elle se resserre et l’air sort." },
        ],
      },
    ],
    reading(
      "<strong>Contexte.</strong> Après un match de football, Ousmane a très faim. Il cueille une mangue, la mange très vite, sans la laver et sans se laver les mains. Le soir, il a mal au ventre. Sa sœur Awa, élève de CM2, veut l’aider à comprendre ce qui s’est passé.",
    ),
    [
      {
        chapter: "La digestion et la nutrition",
        questions: [
          { qcm: "Quelle erreur d’hygiène Ousmane a-t-il commise ?", choices: ["*Il n’a lavé ni le fruit ni ses mains.", "Il a joué au football.", "Il a mangé un fruit.", "Il a parlé à sa sœur."], why: "Les microbes présents sur le fruit et sur les mains peuvent rendre malade. Il faut laver les deux avant de manger." },
          { qcm: "Pourquoi est-il mauvais de manger très vite ?", choices: ["*Les aliments sont mal mâchés et plus difficiles à digérer.", "Le sang ne circule plus.", "L’air n’entre plus dans les poumons.", "Les dents poussent moins vite."], why: "Mâcher broie les aliments : l’estomac et l’intestin les digèrent ensuite plus facilement." },
          { qcm: "Quel organe brasse les aliments avec le suc gastrique ?", choices: ["*L’estomac", "L’œsophage", "Le gros intestin", "Le cœur"], why: "L’estomac brasse les aliments. L’œsophage les conduit seulement vers l’estomac." },
          { self: "Sur ta feuille, écris trois conseils qu’Awa peut donner à Ousmane pour bien digérer et rester en bonne santé. Compare ensuite avec le corrigé.", why: "<p>Trois conseils possibles :</p><ul><li>se laver les mains avec de l’eau et du savon avant de manger ;</li><li>laver les fruits et les légumes ;</li><li>mâcher lentement et manger à des heures régulières.</li></ul><p>Compte ta réponse comme réussie si tu as écrit trois conseils justes, même avec d’autres mots.</p>" },
        ],
      },
    ],
  ),
  spec(
    2,
    [
      {
        chapter: "Les royaumes du Sénégal",
        stem: HISTOIRE,
        questions: [
          { qcm: "Quel titre porte le roi du Cayor ?", choices: ["*Damel", "Bourba", "Teigne", "Brak"], why: "Damel au Cayor, Bourba au Djolof, Teigne au Baol, Brak au Walo." },
          { qcm: "Qui a fondé l’empire du Djolof ?", choices: ["*Ndiadiane Ndiaye", "Lat Dior", "Soundjata Keïta", "Maba Diakhou Bâ"], why: "L’empire du Djolof a été fondé par Ndiadiane Ndiaye ; il dominait le Walo, le Cayor, le Baol, le Sine et le Saloum." },
        ],
      },
      {
        chapter: "De la colonisation à l’indépendance du Sénégal",
        stem: HISTOIRE,
        questions: [
          { qcm: "Qui a été le premier président de la République du Sénégal ?", choices: ["*Léopold Sédar Senghor", "Abdou Diouf", "Blaise Diagne", "Abdoulaye Wade"], why: "Léopold Sédar Senghor a été président de 1960 à 1980. Abdou Diouf lui a succédé." },
          { qcm: "À quelle date le Sénégal célèbre-t-il sa fête de l’indépendance ?", choices: ["*Le 4 avril", "Le 1er décembre", "Le 20 juin", "Le 1er mai"], why: "Le Sénégal célèbre sa fête de l’indépendance le 4 avril." },
        ],
      },
      {
        chapter: "Le Sénégal : situation et milieu physique",
        stem: GEOGRAPHIE,
        questions: [
          { qcm: "D’après la carte, quel cours d’eau arrose le sud du pays, au-dessous de la Gambie ?", fig: FLEUVES, choices: ["*La Casamance", "Le fleuve Sénégal", "La Falémé", "Le lac de Guiers"], why: "La Casamance coule au sud de la Gambie. Le fleuve Sénégal et le lac de Guiers sont au nord, la Falémé à l’est." },
          { qcm: "Comment s’appelle le vent chaud et sec venu du Sahara ?", choices: ["*L’harmattan", "L’alizé maritime", "La mousson", "Le filao"], why: "L’harmattan est chaud et sec. L’alizé maritime est frais et humide, la mousson apporte la pluie." },
        ],
      },
      {
        chapter: "Les activités économiques du Sénégal",
        stem: GEOGRAPHIE,
        questions: [
          { qcm: "Pour quelle activité Kayar, Joal et Mbour sont-elles connues ?", choices: ["*La pêche", "Les mines d’or", "La culture du coton", "L’élevage du Ferlo"], why: "Ce sont de grands centres de pêche artisanale, au bord de l’océan Atlantique." },
          { qcm: "Où exploite-t-on les phosphates ?", choices: ["*À Taïba", "À Sabodala", "À Saly", "À Linguère"], why: "Les phosphates viennent de Taïba, l’or de Sabodala. Saly est un lieu de tourisme." },
        ],
      },
      {
        chapter: "Les êtres vivants et leurs milieux",
        stem: IST,
        questions: [
          { qcm: "Grâce à quels organes le poisson respire-t-il ?", choices: ["*Les branchies", "Les poumons", "Les trachées", "Les nageoires"], why: "Le poisson respire dans l’eau avec ses branchies. Les nageoires lui servent à se déplacer." },
          { vf: "Le têtard respire avec des branchies, et la grenouille adulte avec des poumons.", answer: true, why: "La grenouille vit dans deux milieux : têtard à branchies dans l’eau, adulte à poumons." },
        ],
      },
      {
        chapter: "Outils et objets technologiques",
        stem: IST,
        questions: [
          { qcm: "Lequel de ces matériaux laisse passer le courant électrique ?", choices: ["*Le cuivre", "Le plastique", "Le bois sec", "Le caoutchouc"], why: "Les métaux comme le cuivre sont des conducteurs. Le plastique, le bois sec et le caoutchouc sont des isolants." },
          { qcm: "La brouette est un exemple de :", choices: ["*levier", "poulie", "plan incliné", "circuit électrique"], why: "La brouette est un levier : elle permet de soulever une lourde charge avec moins de force." },
        ],
      },
    ],
    `${reading(
      "<strong>Contexte.</strong> Pour une exposition à l’école, Modou veut éclairer une petite maison en carton. Il a une pile, des fils, un interrupteur et une ampoule. Le schéma montre le circuit à réaliser. Il fait son montage, mais l’ampoule reste éteinte.",
    )}${CIRCUIT}`,
    [
      {
        chapter: "Outils et objets technologiques",
        questions: [
          { qcm: "Pour que l’ampoule s’allume, le circuit doit être :", choices: ["*fermé", "ouvert", "coupé", "mouillé"], why: "Le courant ne passe que si le circuit forme une boucle sans interruption : il doit être fermé." },
          { qcm: "Il manquait un fil à Modou, et il l’a remplacé par une ficelle. Pourquoi l’ampoule reste-t-elle éteinte ?", choices: ["*La ficelle est un isolant : le courant ne passe pas.", "La ficelle est trop courte.", "La ficelle fait trop de lumière.", "La pile n’aime pas les ficelles."], why: "Une ficelle ne conduit pas le courant. Il faut un fil de métal, comme le cuivre." },
          { qcm: "Dans ce circuit, quel élément fournit le courant électrique ?", choices: ["*La pile", "L’ampoule", "L’interrupteur", "Le fil"], why: "La pile est la source. L’ampoule est le récepteur ; l’interrupteur ouvre ou ferme le circuit." },
          { self: "Le courant de la maison est plus dangereux que celui d’une pile. Sur ta feuille, écris deux règles de sécurité à respecter. Compare ensuite avec le corrigé.", why: "<p>Deux règles possibles :</p><ul><li>ne jamais toucher une prise avec les mains mouillées ;</li><li>ne jamais bricoler les fils électriques, et demander l’aide d’un adulte.</li></ul><p>Le courant du secteur (220 V) peut tuer. Compte ta réponse comme réussie si tu as écrit deux règles justes.</p>" },
        ],
      },
    ],
  ),
  spec(
    3,
    [
      {
        chapter: "Les grands empires du Soudan occidental",
        stem: HISTOIRE,
        questions: [
          { qcm: "Quelle était la capitale de l’empire du Ghana ?", choices: ["*Koumbi Saleh", "Gao", "Tombouctou", "Saint-Louis"], why: "Koumbi Saleh était la capitale du Ghana. Gao était celle de l’empire songhaï." },
          { qcm: "Quelle bataille marque la fin de l’empire songhaï, en 1591 ?", choices: ["*Tondibi", "Kirina", "Dékheulé", "Somb"], why: "L’armée marocaine détruit l’empire songhaï à Tondibi en 1591." },
        ],
      },
      {
        chapter: "La traite négrière",
        stem: HISTOIRE,
        questions: [{ qcm: "Dans le commerce triangulaire, vers où les captifs africains étaient-ils déportés ?", choices: ["*Vers l’Amérique", "Vers l’Europe", "Vers l’Asie", "Vers l’Océanie"], why: "Les navires partaient d’Europe, achetaient des captifs en Afrique et les déportaient vers l’Amérique, où ils travaillaient dans les plantations." }],
      },
      {
        chapter: "La conquête coloniale et les résistances",
        stem: HISTOIRE,
        questions: [{ qcm: "Quelle forme a prise la résistance de Cheikh Ahmadou Bamba ?", choices: ["*Une résistance pacifique", "Une guerre contre le Mali", "La construction d’un chemin de fer", "Le commerce de l’arachide"], why: "Cheikh Ahmadou Bamba a mené une résistance pacifique. Il a été exilé au Gabon de 1895 à 1902." }],
      },
      {
        chapter: "Le Sénégal : situation et milieu physique",
        stem: GEOGRAPHIE,
        questions: [
          { qcm: "Quel pays est enclavé dans le Sénégal, le long d’un fleuve ?", choices: ["*La Gambie", "Le Mali", "La Mauritanie", "La Guinée-Bissau"], why: "La Gambie est enclavée dans le Sénégal, le long du fleuve Gambie." },
          { qcm: "Quelle végétation trouve-t-on dans le nord du pays ?", choices: ["*La steppe", "La mangrove", "La forêt claire", "La forêt dense"], why: "Du nord au sud : la steppe, puis la savane, puis la forêt claire. La mangrove pousse dans les estuaires." },
        ],
      },
      {
        chapter: "La population et les régions du Sénégal",
        stem: GEOGRAPHIE,
        questions: [{ qcm: "Dans quelle partie du pays la population se concentre-t-elle ?", choices: ["*À l’ouest", "À l’est", "Au sud-est", "Elle est répartie partout de la même façon."], why: "La population est surtout à l’ouest, en particulier dans la région de Dakar. L’est est peu peuplé." }],
      },
      {
        chapter: "L’Afrique et le monde",
        stem: GEOGRAPHIE,
        questions: [{ qcm: "Quel est le plus long fleuve d’Afrique ?", choices: ["*Le Nil", "Le fleuve Sénégal", "La Gambie", "Le Saloum"], why: "Le Nil est le plus long fleuve d’Afrique. Le Sahara est son plus grand désert chaud." }],
      },
      {
        chapter: "La respiration et la circulation",
        stem: IST,
        questions: [
          { qcm: "D’après le schéma, où l’air arrive-t-il après les bronches ?", fig: RESPIRATION, choices: ["*Dans les poumons", "Dans l’estomac", "Dans le cœur", "Dans la bouche"], why: "L’air passe par le nez ou la bouche, la trachée, les bronches, puis arrive aux poumons." },
          { vf: "La fumée du tabac abîme les poumons.", answer: true, why: "Le tabac, la fumée du bois et les poussières abîment les poumons." },
          { qcm: "Le cœur fonctionne comme :", choices: ["*une pompe", "un filtre à eau", "un interrupteur", "une poulie"], why: "Le cœur est un muscle qui fonctionne comme une pompe : il envoie le sang dans tout le corps." },
        ],
      },
      {
        chapter: "Outils et objets technologiques",
        stem: IST,
        questions: [{ qcm: "Un outil sert à :", choices: ["*prolonger la main pour travailler plus facilement", "remplacer la nourriture", "produire du courant électrique", "faire pousser les plantes"], why: "Un outil prolonge la main de l’homme pour faire un travail plus facilement." }],
      },
    ],
    reading(
      "<strong>Contexte.</strong> Dans un village du Ferlo, voici une chaîne alimentaire : herbe → criquet → poule → chacal. Cette année, une maladie a tué presque toutes les poules du village. Les villageois remarquent ensuite que les criquets sont beaucoup plus nombreux et que l’herbe devient rare.",
    ),
    [
      {
        chapter: "Les êtres vivants et leurs milieux",
        questions: [
          { qcm: "Dans cette chaîne, que veut dire la flèche ?", choices: ["*« est mangé par »", "« mange »", "« grandit avec »", "« a peur de »"], why: "La flèche se lit « est mangé par » : l’herbe est mangée par le criquet, le criquet par la poule." },
          { qcm: "Quel est le producteur de cette chaîne ?", choices: ["*L’herbe", "Le criquet", "La poule", "Le chacal"], why: "Les plantes vertes sont les producteurs : elles fabriquent leur matière grâce à la lumière." },
          { qcm: "Pourquoi les criquets sont-ils devenus plus nombreux ?", choices: ["*Les poules ne les mangent plus.", "Il y a plus de chacals.", "Il y a moins de soleil.", "Les criquets mangent les poules."], why: "Les poules mangeaient les criquets. Sans elles, les criquets se multiplient et mangent davantage d’herbe." },
          { self: "Sur ta feuille, explique en deux ou trois phrases pourquoi la disparition d’un seul maillon déséquilibre toute la chaîne. Prends l’exemple du village. Compare ensuite avec le corrigé.", why: "<p>Réponse possible : les êtres vivants d’une chaîne dépendent les uns des autres. Sans les poules, les criquets se multiplient et mangent l’herbe, qui devient rare. Les chacals n’ont plus de poules à manger et risquent eux aussi de manquer de nourriture.</p><p>Compte ta réponse comme réussie si tu as expliqué ce qui arrive à au moins deux autres maillons.</p>" },
        ],
      },
    ],
  ),
  spec(
    4,
    [
      {
        chapter: "De la colonisation à l’indépendance du Sénégal",
        stem: HISTOIRE,
        questions: [
          { qcm: "Qui est le premier Africain élu député à l’Assemblée nationale française, en 1914 ?", choices: ["*Blaise Diagne", "Léopold Sédar Senghor", "Lat Dior", "Louis Faidherbe"], why: "Blaise Diagne est élu député en 1914. Louis Faidherbe était le gouverneur français qui a mené la conquête." },
          { qcm: "Quelle ville devient la capitale de l’Afrique-Occidentale française (AOF) en 1902 ?", choices: ["*Dakar", "Saint-Louis", "Rufisque", "Kaolack"], why: "L’AOF est créée en 1895, et Dakar en devient la capitale en 1902." },
          { qcm: "Laquelle de ces villes ne faisait pas partie des Quatre communes ?", choices: ["*Kaolack", "Gorée", "Rufisque", "Saint-Louis"], why: "Les Quatre communes étaient Saint-Louis, Gorée, Rufisque et Dakar." },
        ],
      },
      {
        chapter: "La conquête coloniale et les résistances",
        stem: HISTOIRE,
        questions: [{ qcm: "Dans quelle région Aline Sitoé Diatta a-t-elle résisté aux réquisitions coloniales ?", choices: ["*En Casamance", "Au Cayor", "Au Baol", "Au Djolof"], why: "Aline Sitoé Diatta a refusé les réquisitions en Casamance. Elle a été arrêtée en 1943 et elle est morte en exil." }],
      },
      {
        chapter: "La population et les régions du Sénégal",
        stem: GEOGRAPHIE,
        questions: [
          { qcm: "D’après la carte, quelle région se trouve à l’extrême sud-est du Sénégal ?", fig: CARTE, choices: ["*Kédougou", "Saint-Louis", "Dakar", "Louga"], why: "Sur la carte, le sud-est est en bas à droite : c’est la région de Kédougou." },
          { qcm: "D’après la carte, quelle région se trouve à l’extrême nord du pays ?", fig: CARTE, choices: ["*Saint-Louis", "Ziguinchor", "Kolda", "Kaffrine"], why: "Le nord est en haut de la carte : la région de Saint-Louis, le long du fleuve Sénégal." },
        ],
      },
      {
        chapter: "Les activités économiques du Sénégal",
        stem: GEOGRAPHIE,
        questions: [{ qcm: "Que cultive-t-on surtout dans les Niayes ?", choices: ["*Des légumes", "Du coton", "Du cacao", "Du blé"], why: "Les Niayes sont connues pour les légumes. Le coton est cultivé dans le sud-est." }],
      },
      {
        chapter: "L’Afrique et le monde",
        stem: GEOGRAPHIE,
        questions: [{ qcm: "Que veut dire le sigle CEDEAO ?", choices: ["*Communauté économique des États de l’Afrique de l’Ouest", "Comité des écoles d’Afrique de l’Ouest", "Conseil de l’eau et de l’agriculture de l’Ouest", "Union africaine"], why: "La CEDEAO a été créée en 1975. Le Sénégal en fait partie." }],
      },
      {
        chapter: "La digestion et la nutrition",
        stem: IST,
        questions: [{ qcm: "Quel est le rôle du gros intestin ?", choices: ["*Il réabsorbe l’eau et forme les excréments.", "Il broie les aliments.", "Il fabrique la salive.", "Il pompe le sang."], why: "Le gros intestin réabsorbe l’eau et forme les excréments. C’est l’intestin grêle qui termine la digestion." }],
      },
      {
        chapter: "La respiration et la circulation",
        stem: IST,
        questions: [{ qcm: "Après une course, pourquoi le cœur bat-il plus vite ?", choices: ["*Les muscles ont besoin de plus de dioxygène.", "L’estomac a faim.", "Les os grandissent.", "Le sang devient froid."], why: "Le sang apporte le dioxygène aux muscles : plus ils travaillent, plus le cœur doit le faire circuler." }],
      },
      {
        chapter: "Les êtres vivants et leurs milieux",
        stem: IST,
        questions: [
          { qcm: "Lesquels de ces êtres vivants sont des décomposeurs ?", choices: ["*Les champignons et les vers de terre", "Les lions et les chèvres", "Les mangues et les baobabs", "Les poules et les criquets"], why: "Les décomposeurs (champignons, bactéries, vers de terre) transforment les déchets et les cadavres en éléments du sol." },
          { qcm: "Lequel de ces êtres vivants est adapté au milieu aquatique ?", choices: ["*La crevette", "La chèvre", "Le baobab", "Le criquet"], why: "La crevette vit dans l’eau. La chèvre, le baobab et le criquet appartiennent au milieu terrestre." },
        ],
      },
    ],
    reading(
      "<strong>Contexte.</strong> À Ndioum, des jeunes aident un vieil homme à préparer son champ. Ils doivent tirer l’eau d’un puits très profond, charger de lourds sacs d’engrais sur une charrette et déplacer une grosse pierre qui gêne le passage.",
    ),
    [
      {
        chapter: "Outils et objets technologiques",
        questions: [
          { qcm: "Quelle machine simple aide à remonter le seau du puits ?", choices: ["*La poulie", "Le levier", "Le plan incliné", "L’ampoule"], why: "Avec une poulie, on change la direction de l’effort : on tire vers le bas pour faire monter le seau." },
          { qcm: "Les jeunes posent une planche entre le sol et la charrette, puis y font glisser les sacs. Cette planche est :", choices: ["*un plan incliné", "une poulie", "un circuit", "un isolant"], why: "Un plan incliné permet de monter une charge avec moins de force, comme une rampe pour charger un camion." },
          { qcm: "Pour déplacer la pierre, ils utilisent une longue barre de fer. Pour faire moins de force, ils doivent tenir la barre :", choices: ["*le plus loin possible de la pierre", "le plus près possible de la pierre", "exactement au-dessus de la pierre", "avec une main mouillée"], why: "C’est un levier : plus le bras de levier est long, moins il faut de force." },
          { self: "Sur ta feuille, dessine la barre de fer qui soulève la pierre. Indique où on appuie, où est placé le point d’appui et où se trouve la charge. Compare ensuite avec le corrigé.", why: "<p>Ton dessin doit montrer :</p><ul><li>la pierre (la charge) à un bout de la barre ;</li><li>un point d’appui, par exemple une petite pierre placée sous la barre, tout près de la charge ;</li><li>la main qui appuie à l’autre bout, loin du point d’appui.</li></ul><p>Compte ta réponse comme réussie si les trois éléments sont bien placés et nommés.</p>" },
        ],
      },
    ],
  ),
];
