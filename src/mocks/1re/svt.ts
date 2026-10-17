// SVT de 1re : chapitres du relevé DIANGAL (titres des cours de 1re S et de 1re L de Sunudaara, à
// confirmer avec le programme officiel, non trouvé en ligne) : biologie cellulaire, nutrition, géologie.
// Leçons rédigées par DIANGAL, à faire valider par un professeur de SVT.

import { type ChapterSpec, exemple, formula, liste, retenir, sub, tableau } from "../tle/blocks";

const CELL = "Biologie cellulaire";
const NUTRI = "Nutrition";
const GEOL = "Géologie";

const CELL_ORGANISATION: ChapterSpec = {
  title: "La cellule : techniques d’étude et organisation",
  summary: "Microscopes, cellule animale et cellule végétale, organites, mouvements cellulaires.",
  strand: CELL,
  lessons: [
    {
      title: "Observer et décrire la cellule",
      minutes: 15,
      body: `${liste([
          "le microscope optique grossit jusqu’à 1 000 fois environ ; le microscope électronique révèle l’ultrastructure ;",
          "toute cellule a une membrane plasmique, un cytoplasme et (chez les eucaryotes) un noyau ;",
          "organites : mitochondries (respiration), réticulum et ribosomes (synthèse des protéines), appareil de Golgi ;",
          "la cellule végétale a en plus une paroi, une grande vacuole et des chloroplastes (photosynthèse) ;",
          "mouvements cellulaires : cyclose, déplacement amiboïde, battement des cils et des flagelles.",
        ])}
        ${retenir("La cellule est l’unité de structure et de fonctionnement des êtres vivants.")}`,
    },
  ],
};

const MICROBES: ChapterSpec = {
  title: "Bactéries et virus",
  summary: "Organisation d’une bactérie et d’un virus, multiplication.",
  strand: CELL,
  lessons: [
    {
      title: "Procaryotes et virus",
      minutes: 12,
      body: `${tableau([
          ["", "Bactérie", "Virus"],
          ["nature", "cellule sans noyau (procaryote)", "pas une cellule : matériel génétique dans une capside"],
          ["taille", "environ 1 μm", "de 20 à 300 nm"],
          ["multiplication", "seule, par division", "seulement dans une cellule hôte"],
          ["traitement", "antibiotiques", "les antibiotiques sont inefficaces ; vaccins, antiviraux"],
        ])}`,
    },
  ],
};

const EXCHANGES: ChapterSpec = {
  title: "Les échanges cellulaires",
  summary: "Diffusion, osmose, turgescence et plasmolyse, transport actif.",
  strand: CELL,
  lessons: [
    {
      title: "Diffusion et osmose",
      minutes: 15,
      body: `${liste([
          "diffusion : les substances dissoutes passent du milieu le plus concentré vers le moins concentré ;",
          "osmose : l’eau traverse la membrane vers le milieu le plus concentré (hypertonique) ;",
          "dans un milieu hypotonique, la cellule végétale se gonfle (turgescence) ; dans un milieu hypertonique, elle se vide (plasmolyse) ;",
          "le transport actif fait passer des substances contre le gradient de concentration, en consommant de l’énergie (ATP).",
        ])}
        ${exemple(["Des feuilles de salade salées se ramollissent : leurs cellules perdent leur eau par osmose."])}`,
    },
  ],
};

const MITOSIS: ChapterSpec = {
  title: "Chromosomes et mitose",
  summary: "Structure des chromosomes, caryotype, étapes de la mitose.",
  strand: CELL,
  lessons: [
    {
      title: "La division cellulaire",
      minutes: 15,
      body: `${liste([
          "un chromosome est formé d’ADN associé à des protéines ; avant la division, il est dupliqué (deux chromatides) ;",
          "le caryotype humain compte 46 chromosomes (2n = 46) ;",
          "la mitose : prophase, métaphase (chromosomes alignés sur la plaque équatoriale), anaphase (séparation des chromatides), télophase ;",
          "elle donne deux cellules filles identiques à la cellule mère.",
        ])}
        ${retenir("La mitose assure la croissance et le renouvellement des tissus.")}`,
    },
  ],
};

const PROTEINS: ChapterSpec = {
  title: "La synthèse des protéines",
  summary: "ADN, gène, transcription, traduction, code génétique.",
  strand: CELL,
  lessons: [
    {
      title: "De l’ADN à la protéine",
      minutes: 15,
      body: `${liste([
          "un <strong>gène</strong> est une portion d’ADN qui porte l’information pour fabriquer une protéine ;",
          "transcription (dans le noyau) : l’ADN est copié en ARN messager ;",
          "traduction (dans le cytoplasme, sur les ribosomes) : chaque codon de trois nucléotides correspond à un acide aminé ;",
          "le code génétique est universel : il est le même chez presque tous les êtres vivants.",
        ])}
        ${exemple(["Une mutation d’un seul nucléotide du gène de l’hémoglobine est à l’origine de la drépanocytose."])}`,
    },
  ],
};

const DIGESTION: ChapterSpec = {
  title: "Les aliments et la digestion",
  summary: "Les aliments, les nutriments, les enzymes digestives, la digestion.",
  strand: NUTRI,
  lessons: [
    {
      title: "Des aliments aux nutriments",
      minutes: 15,
      body: `${tableau([
          ["Aliment simple", "Enzyme", "Nutriment"],
          ["amidon", "amylases (salive, pancréas)", "glucose"],
          ["protéines", "pepsine (estomac), trypsine (pancréas)", "acides aminés"],
          ["lipides", "lipase (pancréas), aidée de la bile", "acides gras et glycérol"],
        ])}
        ${retenir("Les enzymes sont spécifiques et agissent mieux à 37 °C ; la bile n’est pas une enzyme, elle émulsionne les graisses.")}`,
    },
  ],
};

const GEOLOGY_INTRO: ChapterSpec = {
  title: "Introduction à la géologie et structure du globe",
  summary: "Objet de la géologie, les enveloppes de la Terre, les apports de la sismologie.",
  strand: GEOL,
  lessons: [
    {
      title: "La structure interne du globe",
      minutes: 15,
      body: `${liste([
          "la géologie étudie la Terre, ses roches, son histoire et ses ressources ;",
          "la vitesse des ondes sismiques change à certaines profondeurs : ces discontinuités séparent la croûte, le manteau et le noyau ;",
          "Moho : limite croûte-manteau ; discontinuité de Gutenberg (2 900 km) : limite manteau-noyau ;",
          "la lithosphère rigide (croûte et sommet du manteau) repose sur l’asthénosphère, plus ductile.",
        ])}`,
    },
  ],
};

const SENEGAL_GEOLOGY: ChapterSpec = {
  title: "Les ensembles géologiques et les ressources du Sénégal",
  summary: "Bassin sédimentaire et socle, paléogéographie, ressources minières et énergétiques.",
  strand: GEOL,
  lessons: [
    {
      title: "La géologie du Sénégal",
      minutes: 15,
      body: `${liste([
          "l’essentiel du pays appartient au <strong>bassin sédimentaire</strong> sénégalo-mauritanien ; le <strong>socle</strong> ancien affleure au sud-est (Kédougou) ;",
          "la paléogéographie reconstitue les anciens rivages : la mer a recouvert une grande partie du pays au cours des temps géologiques ;",
          "ressources : phosphates (Taïba, Matam), calcaire (cimenteries de Bargny et de Pout), zircon des sables des Niayes, or (Sabodala), fer de la Falémé, pétrole et gaz en mer (Sangomar, Grand Tortue Ahmeyim).",
        ])}
        ${retenir("Les ressources géologiques sont non renouvelables : leur exploitation doit être durable et profiter au pays.")}`,
    },
  ],
};

export const SVT_1RE_S: ChapterSpec[] = [
  CELL_ORGANISATION,
  MICROBES,
  EXCHANGES,
  MITOSIS,
  PROTEINS,
  {
    title: "La respiration cellulaire",
    summary: "Libération de l’énergie des nutriments, rôle des mitochondries, fermentation.",
    strand: CELL,
    lessons: [
      {
        title: "Libérer l’énergie",
        minutes: 15,
        body: `${formula(`C${sub("6")}H${sub("12")}O${sub("6")} + 6 O${sub("2")} → 6 CO${sub("2")} + 6 H${sub("2")}O + énergie`)}
          ${liste([
            "la respiration a lieu dans les mitochondries ; l’énergie est stockée sous forme d’ATP ;",
            "sans dioxygène, certaines cellules réalisent une fermentation (alcoolique chez la levure, lactique dans le muscle), beaucoup moins rentable.",
          ])}`,
      },
    ],
  },
  DIGESTION,
  {
    title: "La ration alimentaire",
    summary: "Besoins énergétiques, ration équilibrée et ses variations, malnutrition.",
    strand: NUTRI,
    lessons: [
      {
        title: "Une ration adaptée",
        minutes: 12,
        body: `${liste([
            "valeur énergétique : 1 g de glucides ou de protides fournit environ 17 kJ, 1 g de lipides environ 38 kJ ;",
            "la ration varie avec l’âge, le sexe, l’activité, la grossesse ou l’allaitement ;",
            "équilibre conseillé : environ 55 % de l’énergie par les glucides, 30 % par les lipides, 15 % par les protides ;",
            "malnutrition par carence (kwashiorkor, marasme) ou par excès (obésité, diabète).",
          ])}`,
      },
    ],
  },
  GEOLOGY_INTRO,
  {
    title: "Les roches magmatiques : granite et basalte",
    summary: "Origine, structure et composition des roches plutoniques et volcaniques.",
    strand: GEOL,
    lessons: [
      {
        title: "Granite et basalte",
        minutes: 12,
        body: `${tableau([
            ["", "Granite", "Basalte"],
            ["refroidissement", "lent, en profondeur", "rapide, en surface"],
            ["structure", "grenue (tous les minéraux en cristaux)", "microlitique (verre et petits cristaux)"],
            ["minéraux", "quartz, feldspaths, micas", "feldspaths, pyroxènes, olivine"],
            ["au Sénégal", "Sénégal oriental", "presqu’île du Cap-Vert"],
          ])}`,
      },
    ],
  },
  {
    title: "Les roches sédimentaires et résiduelles",
    summary: "Altération, transport, dépôt et diagenèse ; latérites et cuirasses.",
    strand: GEOL,
    lessons: [
      {
        title: "Du sédiment à la roche",
        minutes: 12,
        body: `${liste([
            "les roches sédimentaires se forment par altération, transport, dépôt puis diagenèse (tassement, cimentation) ;",
            "détritiques (grès), chimiques ou biochimiques (calcaire, phosphate) ;",
            "les roches <strong>résiduelles</strong> restent sur place après altération : latérite et cuirasses ferrugineuses des plateaux, bauxite.",
          ])}`,
      },
    ],
  },
  {
    title: "Les roches métamorphiques et la tectonique",
    summary: "Métamorphisme, déformations (plis, failles), tectonique et ses conséquences.",
    strand: GEOL,
    lessons: [
      {
        title: "Métamorphisme et déformations",
        minutes: 15,
        body: `${liste([
            "sous l’effet de la température et de la pression, une roche se transforme sans fondre : c’est le métamorphisme (argile → schiste → micaschiste → gneiss) ;",
            "les roches se déforment : plis (déformation souple) et failles (cassures) ;",
            "ces déformations résultent des mouvements des plaques et accompagnent la formation des chaînes de montagnes.",
          ])}`,
      },
    ],
  },
  SENEGAL_GEOLOGY,
];

export const SVT_1RE_L: ChapterSpec[] = [
  CELL_ORGANISATION,
  MICROBES,
  EXCHANGES,
  MITOSIS,
  PROTEINS,
  DIGESTION,
  {
    title: "L’absorption intestinale et le devenir des nutriments",
    summary: "Passage des nutriments dans le sang et la lymphe, distribution et utilisation.",
    strand: NUTRI,
    lessons: [
      {
        title: "Absorption et distribution",
        minutes: 12,
        body: `${liste([
            "les nutriments traversent la paroi de l’intestin grêle au niveau des villosités ;",
            "le glucose et les acides aminés passent dans le sang et gagnent le foie ; les lipides passent surtout dans la lymphe ;",
            "les cellules utilisent les nutriments pour produire de l’énergie et fabriquer leur propre matière.",
          ])}`,
      },
    ],
  },
  GEOLOGY_INTRO,
  SENEGAL_GEOLOGY,
];
