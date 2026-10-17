// SVT de 4e : chapitres du relevé DIANGAL (docs/programme/releve-ci-3e.md, titres de Sunudaara, à
// confirmer) : nutrition et santé, reproduction humaine et hérédité, géologie interne. Leçons rédigées par
// DIANGAL, à faire valider par un professeur de SVT.

import { type ChapterSpec, exemple, liste, retenir, tableau } from "../tle/blocks";

const BIO = "Le corps humain et la santé";
const REPRO = "Reproduction et hérédité";
const GEOL = "Géologie";

export const SVT_4E: ChapterSpec[] = [
  {
    title: "La digestion et l’absorption intestinale",
    summary: "Le tube digestif, la transformation des aliments en nutriments, le passage dans le sang.",
    strand: BIO,
    lessons: [
      {
        title: "La digestion",
        minutes: 15,
        body: `${liste([
            "le tube digestif : bouche, œsophage, estomac, intestin grêle, gros intestin ; les glandes digestives : glandes salivaires, foie, pancréas ;",
            "la digestion est mécanique (mastication, brassage) et chimique (les <strong>enzymes</strong> des sucs digestifs) ;",
            "l’amylase de la salive transforme l’amidon en maltose (test à l’eau iodée qui ne bleuit plus) ;",
            "à la fin, les aliments sont devenus des <strong>nutriments</strong> : glucose, acides aminés, acides gras et glycérol.",
          ])}
          ${retenir("Bien mâcher facilite la digestion.")}`,
      },
      {
        title: "L’absorption intestinale",
        minutes: 12,
        body: `${liste([
            "les nutriments traversent la paroi de l’intestin grêle et passent dans le sang et la lymphe : c’est l’<strong>absorption</strong> ;",
            "la paroi porte des millions de replis, les <strong>villosités</strong>, qui donnent une très grande surface d’échange ;",
            "ce qui n’est pas absorbé passe dans le gros intestin et forme les selles.",
          ])}
          ${retenir("Le sang distribue ensuite les nutriments à toutes les cellules.")}`,
      },
    ],
  },
  {
    title: "Le sang : composition et maladies",
    summary: "Plasma et cellules du sang, leurs rôles ; quelques maladies du sang.",
    strand: BIO,
    lessons: [
      {
        title: "La composition du sang",
        minutes: 15,
        body: `${tableau([
            ["Élément", "Rôle"],
            ["plasma (liquide jaunâtre, plus de la moitié du sang)", "transporte nutriments, déchets, hormones"],
            ["globules rouges (hématies)", "transportent le dioxygène grâce à l’hémoglobine"],
            ["globules blancs (leucocytes)", "défendent l’organisme contre les microbes"],
            ["plaquettes", "arrêtent les saignements (coagulation)"],
          ])}
          ${liste([
            "anémie : manque de globules rouges ou d’hémoglobine (fatigue, pâleur) ;",
            "drépanocytose : maladie héréditaire des globules rouges, fréquente en Afrique ;",
            "hémophilie : le sang coagule mal ; leucémie : cancer des globules blancs.",
          ])}`,
      },
    ],
  },
  {
    title: "La circulation sanguine",
    summary: "Le cœur, les vaisseaux, la double circulation ; pression artérielle et maladies cardio-vasculaires.",
    strand: BIO,
    lessons: [
      {
        title: "Le cœur et la double circulation",
        minutes: 15,
        body: `${liste([
            "le cœur est un muscle creux à quatre cavités : deux oreillettes et deux ventricules ;",
            "artères (du cœur vers les organes), veines (des organes vers le cœur), capillaires (échanges avec les cellules) ;",
            "petite circulation : cœur droit → poumons → cœur gauche (le sang s’y charge en dioxygène) ;",
            "grande circulation : cœur gauche → organes → cœur droit.",
          ])}
          ${retenir("Le pouls, perçu au poignet, traduit les battements du cœur (environ 70 par minute au repos).")}`,
      },
      {
        title: "Pression artérielle et maladies cardio-vasculaires",
        minutes: 12,
        body: `${liste([
            "la pression (tension) artérielle se mesure avec un tensiomètre ; chez l’adulte, une valeur proche de 12/8 est normale ;",
            "l’<strong>hypertension</strong> fatigue le cœur et les vaisseaux : elle peut provoquer un AVC ou un infarctus ;",
            "facteurs de risque : trop de sel, de gras et de sucre, tabac, alcool, manque d’activité, surpoids.",
          ])}
          ${retenir("Manger moins salé, bouger et ne pas fumer protègent le cœur.")}`,
      },
    ],
  },
  {
    title: "La contamination par les micro-organismes",
    summary: "Microbes, voies de contamination, prévention et lutte.",
    strand: BIO,
    lessons: [
      {
        title: "Microbes et contamination",
        minutes: 15,
        body: `${liste([
            "micro-organismes : bactéries, virus, champignons microscopiques, protozoaires ; certains sont utiles, d’autres pathogènes ;",
            "voies de contamination : air (toux), eau et aliments souillés (choléra), piqûres (le moustique anophèle transmet le paludisme), sang, contact ;",
            "prévention : hygiène des mains, eau potable, moustiquaire imprégnée, vaccination ;",
            "les antiseptiques désinfectent une plaie ; les antibiotiques agissent sur les bactéries, pas sur les virus.",
          ])}
          ${retenir("Se laver les mains au savon est un geste simple qui évite beaucoup de maladies.")}`,
      },
    ],
  },
  {
    title: "La puberté et les organes reproducteurs",
    summary: "Les transformations de la puberté, les appareils reproducteurs, le cycle menstruel.",
    strand: REPRO,
    lessons: [
      {
        title: "La puberté",
        minutes: 12,
        body: `${liste([
            "vers 10 à 14 ans chez les filles, 12 à 16 ans chez les garçons : poussée de croissance, poils, mue de la voix chez le garçon, seins et règles chez la fille ;",
            "ces changements sont commandés par des <strong>hormones</strong> : testostérone (testicules), œstrogènes (ovaires) ;",
            "les changements de l’humeur sont normaux : on peut en parler à un parent ou à l’infirmier.",
          ])}`,
      },
      {
        title: "Les appareils reproducteurs",
        minutes: 15,
        body: `${tableau([
            ["", "Homme", "Femme"],
            ["glandes génitales", "testicules", "ovaires"],
            ["cellules reproductrices", "spermatozoïdes (production continue)", "ovules (un par cycle environ)"],
            ["autres organes", "spermiducte, prostate, pénis", "trompes, utérus, vagin"],
          ])}
          ${retenir("Le cycle menstruel dure environ 28 jours ; l’ovulation a lieu vers le 14e jour ; s’il n’y a pas de grossesse, la paroi de l’utérus est éliminée : ce sont les règles.")}`,
      },
    ],
  },
  {
    title: "De la fécondation à l’accouchement",
    summary: "Fécondation, nidation, développement de l’embryon et du fœtus, accouchement.",
    strand: REPRO,
    lessons: [
      {
        title: "La grossesse",
        minutes: 15,
        body: `${liste([
            "la <strong>fécondation</strong> est l’union d’un spermatozoïde et d’un ovule dans une trompe : elle donne une cellule-œuf ;",
            "la cellule-œuf se divise et s’implante dans la paroi de l’utérus : c’est la <strong>nidation</strong> ;",
            "jusqu’à deux mois on parle d’embryon, ensuite de fœtus ;",
            "le <strong>placenta</strong> et le cordon ombilical assurent les échanges entre la mère et le fœtus ;",
            "la grossesse dure environ neuf mois ; l’accouchement se termine par l’expulsion du placenta.",
          ])}
          ${retenir("Les consultations prénatales protègent la santé de la mère et de l’enfant ; l’alcool, le tabac et certains médicaments passent dans le placenta.")}`,
      },
    ],
  },
  {
    title: "Éviter une grossesse précoce et les IST",
    summary: "Les risques d’une grossesse précoce, les moyens de l’éviter, les infections sexuellement transmissibles.",
    strand: REPRO,
    lessons: [
      {
        title: "Se protéger",
        minutes: 12,
        body: `${liste([
            "une grossesse à l’adolescence présente des risques pour la santé de la jeune fille et du bébé, et compromet souvent la scolarité ;",
            "l’abstinence est le moyen le plus sûr ; il existe aussi des méthodes de contraception, à discuter avec un agent de santé ;",
            "les IST (infections sexuellement transmissibles), dont le VIH, se transmettent lors de rapports non protégés ; le préservatif protège à la fois des IST et de la grossesse.",
          ])}
          ${retenir("En cas de question, on s’adresse à un parent, à l’infirmerie scolaire ou à un centre de santé.")}`,
      },
    ],
  },
  {
    title: "La transmission des caractères héréditaires",
    summary: "Caractères héréditaires et acquis, chromosomes, détermination du sexe.",
    strand: REPRO,
    lessons: [
      {
        title: "Chromosomes et hérédité",
        minutes: 15,
        body: `${liste([
            "un caractère <strong>héréditaire</strong> se transmet des parents aux enfants (groupe sanguin, couleur des yeux) ; un caractère <strong>acquis</strong> non (cicatrice, langue parlée) ;",
            "l’information héréditaire est portée par les <strong>chromosomes</strong>, dans le noyau des cellules ; ils sont formés d’ADN ;",
            "l’être humain a 46 chromosomes (23 paires) ; les cellules reproductrices n’en ont que 23 ;",
            "chaque enfant reçoit la moitié de ses chromosomes de son père et l’autre moitié de sa mère.",
          ])}
          ${exemple(["Sexe : la femme a deux chromosomes X (XX), l’homme X et Y (XY). L’ovule porte toujours un X ; c’est le spermatozoïde (X ou Y) qui détermine le sexe de l’enfant."])}`,
      },
    ],
  },
  {
    title: "Les séismes et la structure du globe",
    summary: "Le séisme, ses ondes et ses effets ; les enveloppes de la Terre.",
    strand: GEOL,
    lessons: [
      {
        title: "Les séismes",
        minutes: 12,
        body: `${liste([
            "un séisme est une secousse du sol due à une rupture brutale des roches en profondeur, au <strong>foyer</strong> ;",
            "l’<strong>épicentre</strong> est le point de la surface situé au-dessus du foyer ;",
            "les ondes sismiques sont enregistrées par un sismographe ; la magnitude (échelle de Richter) mesure l’énergie libérée, l’intensité mesure les dégâts.",
          ])}
          ${retenir("En cas de séisme : s’abriter sous une table solide, loin des vitres, puis sortir dans un espace dégagé.")}`,
      },
      {
        title: "La structure du globe",
        minutes: 12,
        body: `${tableau([
            ["Enveloppe", "Profondeur", "Caractères"],
            ["croûte", "de 5 à 70 km environ", "roches solides, mince"],
            ["manteau", "jusqu’à 2 900 km", "roches chaudes"],
            ["noyau", "de 2 900 km au centre (environ 6 370 km)", "fer et nickel ; partie externe liquide"],
          ])}
          ${retenir("C’est l’étude de la propagation des ondes sismiques qui a permis de connaître l’intérieur de la Terre.")}`,
      },
    ],
  },
  {
    title: "Le volcanisme",
    summary: "L’appareil volcanique, les types d’éruptions, les volcans du Sénégal.",
    strand: GEOL,
    lessons: [
      {
        title: "Volcans et éruptions",
        minutes: 15,
        body: `${liste([
            "le magma, roche fondue venue de la profondeur, s’accumule dans une chambre magmatique puis monte par la cheminée jusqu’au cratère ;",
            "éruption <strong>effusive</strong> : lave fluide qui coule en coulées (volcans d’Hawaï) ;",
            "éruption <strong>explosive</strong> : lave visqueuse, projections et nuées ardentes, très dangereuses (montagne Pelée, 1902).",
          ])}
          ${exemple(["Les Mamelles de Dakar sont d’anciens volcans ; le basalte de Gorée et des côtes de Dakar est une roche volcanique."])}`,
      },
    ],
  },
  {
    title: "Les roches magmatiques",
    summary: "Roches volcaniques et roches plutoniques, leur formation.",
    strand: GEOL,
    lessons: [
      {
        title: "Roches volcaniques et plutoniques",
        minutes: 12,
        body: `${tableau([
            ["", "Roche volcanique", "Roche plutonique"],
            ["exemple", "basalte", "granite"],
            ["refroidissement", "rapide, en surface", "lent, en profondeur"],
            ["aspect", "petits cristaux et verre", "gros cristaux visibles (roche grenue)"],
          ])}
          ${retenir("Les roches magmatiques naissent du refroidissement d’un magma ; au Sénégal, le granite affleure au sud-est (région de Kédougou).")}`,
      },
    ],
  },
];

