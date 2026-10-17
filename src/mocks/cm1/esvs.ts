// ESVS du CM1 (étape 3 du CEB, niveau 1) : histoire, géographie, IST, vivre ensemble et vivre dans
// son milieu, les sous-domaines évalués au CFEE (guide officiel du CFEE). Chapitres INDICATIFS : le
// guide officiel de l’étape 3 n’a pas été trouvé ; les notions prolongent le CE2 et préparent le CM2.
// Leçons rédigées par DIANGAL, à faire valider par un enseignant.

import { tableau } from "../3e/blocks";
import { bullets, type CiChapterSpec, keyPoint, practice } from "../ci/blocks";

const HIST = "Histoire";
const GEO = "Géographie";
const IST = "Initiation scientifique et technologique";
const VM = "Vivre dans son milieu";
const VE = "Vivre ensemble";

export const ESVS_CM1: CiChapterSpec[] = [
  // ── Histoire ──────────────────────────────────────────────────────────────
  {
    title: "La préhistoire et la protohistoire au Sénégal",
    strand: HIST,
    summary: "Les premiers habitants, les outils de pierre, les amas coquilliers et les mégalithes.",
    lessons: [
      {
        title: "Les traces des premiers habitants",
        body: `${bullets([
            "La <strong>préhistoire</strong> est la période avant l’écriture. Les hommes taillaient des outils en pierre, chassaient, pêchaient et cueillaient.",
            "Au <strong>néolithique</strong>, ils ont commencé à cultiver, à élever des animaux et à fabriquer des poteries.",
            "Dans le delta du Saloum, les <strong>amas coquilliers</strong> (montagnes de coquillages) montrent que des hommes y vivaient de la pêche.",
            "Les <strong>cercles mégalithiques</strong> de Sénégambie (Sine Ngayène, Wanar) sont des monuments de pierres dressées, inscrits au patrimoine mondial.",
          ])}
          ${keyPoint("Les archéologues étudient les traces du passé : outils, poteries, tombes, monuments.")}
          ${practice(["Cherche sur une carte le delta du Saloum et les régions de Kaolack et de Kaffrine, où se trouvent les mégalithes."])}`,
      },
    ],
  },
  {
    title: "L’empire du Ghana et le Tékrour",
    strand: HIST,
    summary: "L’empire du Ghana, le commerce de l’or, le Tékrour et l’arrivée de l’islam.",
    lessons: [
      {
        title: "L’empire du Ghana",
        body: `${bullets([
            "Le Ghana (ou Wagadou) était un grand empire soninké situé entre le fleuve Sénégal et le Niger.",
            "Il était riche grâce à l’or, échangé contre le sel apporté du nord par les caravanes du Sahara.",
            "Sa capitale était Koumbi Saleh.",
          ])}
          ${keyPoint("Le commerce transsaharien reliait l’Afrique de l’Ouest à l’Afrique du Nord.")}
          ${practice(["Explique pourquoi le sel était aussi précieux que l’or."])}`,
      },
      {
        title: "Le Tékrour et l’islam",
        body: `${bullets([
            "Le Tékrour, dans la vallée du fleuve Sénégal, est l’un des plus anciens royaumes du pays.",
            "Son roi War Jaabi adopta l’islam au XI<sup>e</sup> siècle.",
            "L’islam s’est ensuite répandu par les commerçants, les marabouts et le mouvement almoravide.",
          ])}
          ${keyPoint("Le Tékrour a donné son nom aux Toucouleurs.")}
          ${practice(["Situe la vallée du fleuve Sénégal sur une carte."])}`,
      },
    ],
  },
  // ── Géographie ────────────────────────────────────────────────────────────
  {
    title: "Le Sénégal sur la carte",
    strand: GEO,
    summary: "Situation, frontières et organisation administrative du Sénégal.",
    lessons: [
      {
        title: "Situation et organisation du Sénégal",
        body: `${bullets([
            "Le Sénégal est en Afrique de l’Ouest, au bord de l’océan Atlantique.",
            "Ses voisins : la Mauritanie au nord, le Mali à l’est, la Guinée et la Guinée-Bissau au sud ; la Gambie est enclavée dans le pays.",
            "Il est découpé en 14 régions, elles-mêmes divisées en départements, arrondissements et communes.",
          ])}
          ${keyPoint("La capitale du Sénégal est Dakar.")}
          ${practice(["Sur une carte muette, place la Mauritanie, le Mali, les deux Guinées et la Gambie."])}`,
      },
    ],
  },
  {
    title: "Le climat du Sénégal",
    strand: GEO,
    summary: "Les saisons, les pluies, les vents et les zones climatiques.",
    lessons: [
      {
        title: "Saisons, pluies et vents",
        body: `${tableau([
            ["Zone", "Pluies", "Exemple"],
            ["nord (sahélienne)", "faibles (moins de 400 mm par an)", "Podor, Matam"],
            ["centre (soudanienne)", "moyennes", "Kaolack, Tambacounda"],
            ["sud (subguinéenne)", "abondantes (plus de 1 000 mm)", "Ziguinchor"],
          ])}
          ${bullets(["L’harmattan, vent chaud et sec, souffle du Sahara en saison sèche.", "L’alizé maritime, frais, souffle sur la côte.", "La mousson apporte les pluies d’hivernage."])}
          ${keyPoint("Les pluies diminuent du sud vers le nord.")}
          ${practice(["Note pendant l’hivernage les jours de pluie dans ta localité."])}`,
      },
    ],
  },
  {
    title: "Végétation, faune et parcs nationaux",
    strand: GEO,
    summary: "Les grands paysages végétaux, les animaux et les parcs nationaux du Sénégal.",
    lessons: [
      {
        title: "Végétation et parcs nationaux",
        body: `${bullets([
            "Steppe au nord, savane au centre, forêt claire au sud, mangrove dans les estuaires.",
            "Parcs nationaux : Niokolo-Koba (lions, éléphants, hippopotames), Djoudj (oiseaux migrateurs), delta du Saloum, Langue de Barbarie, îles de la Madeleine.",
          ])}
          ${keyPoint("Les parcs nationaux protègent les plantes et les animaux menacés.")}
          ${practice(["Cite deux animaux qu’on peut voir au parc du Niokolo-Koba."])}`,
      },
    ],
  },
  {
    title: "Les transports et les échanges",
    strand: GEO,
    summary: "Routes, rail, ports et aéroports ; les échanges entre régions et avec l’étranger.",
    lessons: [
      {
        title: "Se déplacer et échanger",
        body: `${tableau([
            ["Transport", "Exemples"],
            ["routier", "routes nationales, autoroutes, cars, taxis-brousse"],
            ["ferroviaire", "Train express régional (TER) Dakar–Diamniadio"],
            ["maritime et fluvial", "port de Dakar, bateau Dakar–Ziguinchor, pirogues"],
            ["aérien", "aéroport international Blaise Diagne"],
          ])}
          ${keyPoint("Les transports permettent de vendre les produits des régions et de faire venir ce qui manque.")}
          ${practice(["Comment voyage-t-on de ta ville à Dakar ?"])}`,
      },
    ],
  },
  // ── Initiation scientifique et technologique ─────────────────────────────
  {
    title: "Les états de l’eau",
    strand: IST,
    summary: "Solide, liquide, gaz ; fusion, solidification, évaporation, condensation ; le cycle de l’eau.",
    lessons: [
      {
        title: "L’eau change d’état",
        body: `${tableau([
            ["Changement", "De… à…", "Exemple"],
            ["solidification", "liquide → solide", "l’eau devient glace au congélateur"],
            ["fusion", "solide → liquide", "la glace fond au soleil"],
            ["évaporation", "liquide → gaz", "le linge sèche"],
            ["condensation", "gaz → liquide", "la buée sur une bouteille fraîche"],
          ])}
          ${keyPoint("Le cycle de l’eau : l’eau de la mer s’évapore, forme les nuages, retombe en pluie et rejoint les fleuves puis la mer.")}
          ${practice(["Mets un verre d’eau au soleil et observe-le pendant une journée."])}`,
      },
    ],
  },
  {
    title: "L’air et la combustion",
    strand: IST,
    summary: "L’air existe et occupe de la place ; le feu a besoin d’air ; éteindre un feu.",
    lessons: [
      {
        title: "Le feu a besoin d’air",
        body: `${bullets([
            "L’air est invisible mais il existe : il gonfle un ballon, fait tourner les éoliennes.",
            "Une bougie sous un verre retourné s’éteint : le feu a besoin de l’air (du dioxygène) pour brûler.",
            "Pour qu’il y ait un feu, il faut un combustible, de l’air et de la chaleur.",
          ])}
          ${keyPoint("Pour éteindre un feu, on le prive d’air (couverture, sable) ou on le refroidit (eau). Jamais d’eau sur un feu d’huile ou électrique.")}
          ${practice(["Explique pourquoi on souffle sur des braises pour raviver le feu."])}`,
      },
    ],
  },
  {
    title: "Les plantes à fleurs",
    strand: IST,
    summary: "La fleur, la pollinisation, la graine et la germination.",
    lessons: [
      {
        title: "De la fleur à la graine",
        body: `${bullets([
            "La <strong>fleur</strong> contient les étamines (qui produisent le pollen) et le pistil.",
            "Le pollen est transporté par le vent ou les insectes (abeilles) : c’est la <strong>pollinisation</strong>.",
            "La fleur devient un <strong>fruit</strong> qui contient des <strong>graines</strong>.",
            "Une graine germe s’il y a de l’eau, de l’air et une bonne température.",
          ])}
          ${keyPoint("Sans pollinisation, pas de fruits : les abeilles sont précieuses pour l’agriculture.")}
          ${practice(["Fais germer des graines de mil sur du coton humide."])}`,
      },
    ],
  },
  {
    title: "Les aliments et leur conservation",
    strand: IST,
    summary: "Les groupes d’aliments et les techniques de conservation.",
    lessons: [
      {
        title: "Conserver les aliments",
        body: `${tableau([
            ["Technique", "Exemples"],
            ["séchage", "poisson séché (guedj), viande séchée (kilichi), mangues séchées"],
            ["fumage", "poisson fumé (kéthiakh)"],
            ["salage", "poisson salé"],
            ["froid", "réfrigérateur, congélateur"],
            ["conserves", "boîtes, bocaux, sucre (confitures)"],
          ])}
          ${keyPoint("Les microbes se développent dans les aliments humides et chauds : on conserve au sec ou au froid.")}
          ${practice(["Demande à un adulte comment on prépare le poisson séché."])}`,
      },
    ],
  },
  {
    title: "L’électricité",
    strand: IST,
    summary: "Le circuit électrique, conducteurs et isolants, les dangers de l’électricité.",
    lessons: [
      {
        title: "Circuit, conducteurs et isolants",
        body: `${bullets([
            "Un circuit électrique comprend une source (pile), des fils, un interrupteur et une ampoule.",
            "Les métaux sont <strong>conducteurs</strong> ; le plastique, le bois sec et le caoutchouc sont <strong>isolants</strong>.",
            "Le courant de la maison (220 V) peut tuer : on ne touche pas les fils dénudés et on ne met rien dans les prises.",
          ])}
          ${keyPoint("Les fils électriques sont entourés de plastique isolant pour nous protéger.")}
          ${practice(["Teste avec un circuit à pile si une clé, une règle en plastique et une pièce de monnaie conduisent le courant."])}`,
      },
    ],
  },
  // ── Vivre ensemble ────────────────────────────────────────────────────────
  {
    title: "L’organisation administrative",
    strand: VE,
    summary: "Région, département, arrondissement et commune ; gouverneur, préfet, sous-préfet, maire.",
    lessons: [
      {
        title: "Qui administre le territoire ?",
        body: `${tableau([
            ["Circonscription", "Autorité"],
            ["région", "gouverneur"],
            ["département", "préfet ; un conseil départemental élu"],
            ["arrondissement", "sous-préfet"],
            ["commune", "maire et conseil municipal élus"],
          ])}
          ${keyPoint("Le gouverneur, le préfet et le sous-préfet représentent l’État ; le maire et les conseillers sont élus par les habitants.")}
          ${practice(["Trouve le nom de ta région, de ton département et de ta commune."])}`,
      },
    ],
  },
  {
    title: "Les droits de l’enfant",
    strand: VE,
    summary: "Les droits de l’enfant, les devoirs qui les accompagnent, la protection contre les abus.",
    lessons: [
      {
        title: "Les droits de l’enfant",
        body: `${bullets([
            "Tout enfant a droit à un nom et à une nationalité (l’acte de naissance), à la santé, à l’éducation, au jeu et à la protection.",
            "Il doit être protégé contre la violence, le travail dangereux, la mendicité forcée et le mariage précoce.",
            "En échange, il a des devoirs : respecter les autres, étudier, aider sa famille selon son âge.",
          ])}
          ${keyPoint("Un enfant en danger peut demander de l’aide à un adulte de confiance, à son maître ou aux services de protection de l’enfance.")}
          ${practice(["Fais une affiche sur un droit de l’enfant."])}`,
      },
    ],
  },
  {
    title: "La sécurité routière",
    strand: VE,
    summary: "Les règles du piéton, les panneaux et les feux de signalisation.",
    lessons: [
      {
        title: "Circuler en sécurité",
        body: `${bullets([
            "Je marche sur le trottoir ou, s’il n’y en a pas, sur le bord gauche de la route, face aux voitures.",
            "Je traverse au passage piéton, quand le feu des piétons est vert, après avoir regardé à gauche puis à droite.",
            "Je ne joue pas au bord de la route ; je ne monte pas dans un véhicule surchargé.",
          ])}
          ${tableau([
            ["Feu", "Sens"],
            ["rouge", "arrêt"],
            ["orange", "attention, s’arrêter si possible"],
            ["vert", "passage autorisé"],
          ])}
          ${keyPoint("La nuit, je porte des vêtements clairs pour être vu.")}
          ${practice(["Dessine trois panneaux que tu vois sur le chemin de l’école."])}`,
      },
    ],
  },
  // ── Vivre dans son milieu ────────────────────────────────────────────────
  {
    title: "Hygiène et maladies",
    strand: VM,
    summary: "Diarrhées, choléra, vers intestinaux ; hygiène et vaccination.",
    lessons: [
      {
        title: "Se protéger des maladies",
        body: `${tableau([
            ["Maladie", "Cause", "Prévention"],
            ["diarrhée, choléra", "eau ou aliments souillés", "eau potable, lavage des mains, aliments couverts"],
            ["vers intestinaux", "mains sales, marcher pieds nus", "se laver les mains, porter des chaussures, déparasiter"],
            ["rougeole, poliomyélite, tétanos", "microbes", "vaccination"],
          ])}
          ${keyPoint("Le lavage des mains au savon est le geste le plus simple pour éviter beaucoup de maladies.")}
          ${practice(["Montre à un petit frère comment bien se laver les mains."])}`,
      },
    ],
  },
  {
    title: "Les déchets et la pollution",
    strand: VM,
    summary: "Les déchets ménagers, le plastique, le tri et le recyclage.",
    lessons: [
      {
        title: "Réduire, trier, recycler",
        body: `${bullets([
            "Les sachets plastiques mettent des centaines d’années à disparaître ; ils tuent les animaux qui les avalent et bouchent les canalisations.",
            "Brûler les ordures dégage des fumées toxiques.",
            "On peut <strong>réduire</strong> (sac en tissu), <strong>réutiliser</strong> (bouteilles), <strong>recycler</strong> (plastique, métal, papier) et faire du compost avec les épluchures.",
          ])}
          ${keyPoint("Un déchet bien trié peut devenir une ressource.")}
          ${practice(["Organise le tri des déchets dans ta classe : papier, plastique, restes."])}`,
      },
    ],
  },
  {
    title: "Les ressources naturelles",
    strand: VM,
    summary: "L’eau, le sol, la forêt et la mer : les utiliser sans les épuiser.",
    lessons: [
      {
        title: "Gérer les ressources naturelles",
        body: `${tableau([
            ["Ressource", "Menace", "Bonne pratique"],
            ["eau", "gaspillage, pollution", "fermer les robinets, protéger les puits"],
            ["sol", "érosion, surpâturage", "diguettes, jachère, engrais naturels"],
            ["forêt", "coupe abusive, feux de brousse", "reboisement, foyers améliorés"],
            ["mer", "surpêche", "repos biologique, filets autorisés"],
          ])}
          ${keyPoint("Utiliser les ressources sans les épuiser, c’est penser aux générations futures : c’est le développement durable.")}
          ${practice(["Propose trois gestes pour économiser l’eau à la maison."])}`,
      },
    ],
  },
];
