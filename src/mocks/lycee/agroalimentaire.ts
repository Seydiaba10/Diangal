// Technologie agroalimentaire de la série S5 (1re et Terminale) : microbiologie, biochimie, technologie
// de transformation et de conservation. Chapitres INDICATIFS, établis d’après la liste des épreuves du Bac
// de la série S5 ; programme officiel non trouvé en ligne. Leçons rédigées par DIANGAL, à faire valider
// par un professeur de technologie agroalimentaire.

import { type ChapterSpec, exemple, liste, methode, retenir, tableau } from "../tle/blocks";

const MICRO = "Microbiologie";
const BIOCHIMIE = "Biochimie";
const TECHNO = "Transformation et conservation";

export const AGRO_1RE: ChapterSpec[] = [
  {
    title: "Les micro-organismes des aliments",
    summary: "Bactéries, levures, moisissures : utiles, d’altération ou pathogènes.",
    strand: MICRO,
    lessons: [
      {
        title: "Des microbes partout",
        minutes: 15,
        body: `${tableau([
            ["Rôle", "Exemples"],
            ["utiles", "bactéries lactiques (lait caillé, yaourt), levures (pain, boissons fermentées)"],
            ["d’altération", "moisissures sur le pain, bactéries qui font tourner le lait"],
            ["pathogènes", "Salmonella, Escherichia coli pathogènes, Staphylococcus aureus"],
          ])}
          ${retenir("Un aliment contaminé par des pathogènes peut sembler normal : l’hygiène reste la meilleure protection.")}`,
      },
    ],
  },
  {
    title: "La croissance microbienne",
    summary: "Facteurs de croissance, courbe de croissance, temps de génération.",
    strand: MICRO,
    lessons: [
      {
        title: "Comment les microbes se multiplient",
        minutes: 15,
        body: `${liste([
            "facteurs : température, eau disponible (activité de l’eau), pH, oxygène, nutriments ;",
            "la plupart des pathogènes se multiplient vite entre 20 et 45 °C environ ; le froid ralentit leur croissance, la cuisson les détruit ;",
            "courbe de croissance : latence, croissance exponentielle, phase stationnaire, déclin.",
          ])}
          ${exemple(["Avec un temps de génération de 20 minutes, une bactérie en donne 8 au bout d’une heure et plus de 260 000 au bout de 6 heures."])}`,
      },
    ],
  },
  {
    title: "Glucides et lipides",
    summary: "Structure et rôles des glucides et des lipides dans les aliments.",
    strand: BIOCHIMIE,
    lessons: [
      {
        title: "Les constituants énergétiques",
        minutes: 15,
        body: `${liste([
            "glucides simples (glucose, fructose, saccharose) et complexes (amidon des céréales et du manioc) ;",
            "lipides : surtout des triglycérides (glycérol + trois acides gras) ; acides gras saturés (beurre) ou insaturés (huiles d’arachide, de palme en partie) ;",
            "les lipides s’oxydent (rancissement) à l’air et à la lumière.",
          ])}`,
      },
    ],
  },
  {
    title: "Protéines et enzymes",
    summary: "Acides aminés, protéines, dénaturation ; enzymes et brunissement.",
    strand: BIOCHIMIE,
    lessons: [
      {
        title: "Protéines et enzymes",
        minutes: 15,
        body: `${liste([
            "les protéines sont des chaînes d’acides aminés reliés par des liaisons peptidiques ;",
            "la chaleur ou l’acidité les <strong>dénaturent</strong> : le blanc d’œuf coagule, le lait caille ;",
            "les enzymes sont des protéines qui accélèrent les réactions ; elles agissent mieux à une température et un pH donnés ;",
            "le brunissement d’une pomme ou d’une mangue coupée est enzymatique ; le jus de citron le ralentit.",
          ])}`,
      },
    ],
  },
  {
    title: "Hygiène et qualité des aliments",
    summary: "Règle des 5M, bonnes pratiques d’hygiène, introduction à l’HACCP.",
    strand: TECHNO,
    lessons: [
      {
        title: "Produire des aliments sûrs",
        minutes: 15,
        body: `${liste([
            "les 5M : matière, main-d’œuvre, matériel, méthode, milieu ;",
            "bonnes pratiques : lavage des mains, tenue propre, marche en avant (du sale vers le propre), séparation du cru et du cuit ;",
            "l’HACCP analyse les dangers et surveille les points critiques de la fabrication.",
          ])}
          ${retenir("La sécurité sanitaire se construit à chaque étape, de la matière première au consommateur.")}`,
      },
    ],
  },
  {
    title: "Les produits agricoles et halieutiques du Sénégal",
    summary: "Céréales, fruits, lait et poisson ; pertes après récolte.",
    strand: TECHNO,
    lessons: [
      {
        title: "Une richesse à valoriser",
        minutes: 12,
        body: `${liste([
            "céréales : mil, sorgho, maïs, riz, fonio ;",
            "fruits et produits de cueillette : mangue, bissap, pain de singe (bouye), madd, tamarin ;",
            "lait, viande, poisson (sardinelles) ;",
            "une partie importante des récoltes se perd après la récolte : transformer et conserver limite ces pertes.",
          ])}`,
      },
    ],
  },
  {
    title: "Les opérations unitaires de transformation",
    summary: "Tri, nettoyage, décorticage, broyage, tamisage, pressage, extraction.",
    strand: TECHNO,
    lessons: [
      {
        title: "Les étapes de base",
        minutes: 12,
        body: `${tableau([
            ["Opération", "Exemple"],
            ["tri, nettoyage", "enlever les cailloux du mil"],
            ["décorticage", "retirer le son du mil"],
            ["broyage, mouture", "obtenir de la farine"],
            ["tamisage", "séparer farine et semoule"],
            ["pressage, extraction", "huile d’arachide, jus de fruits"],
          ])}`,
      },
    ],
  },
];

export const AGRO_TLE: ChapterSpec[] = [
  {
    title: "La conservation par la chaleur",
    summary: "Blanchiment, pasteurisation, stérilisation et appertisation.",
    strand: TECHNO,
    lessons: [
      {
        title: "Détruire les micro-organismes",
        minutes: 15,
        body: `${tableau([
            ["Traitement", "Conditions", "Effet"],
            ["pasteurisation", "par exemple 72 °C pendant 15 s pour le lait", "détruit les pathogènes ; produit à garder au froid"],
            ["stérilisation", "autour de 121 °C", "détruit tous les micro-organismes"],
            ["appertisation", "stérilisation en récipient fermé (conserves)", "conservation longue à température ambiante"],
          ])}`,
      },
    ],
  },
  {
    title: "La conservation par le froid",
    summary: "Réfrigération, congélation, surgélation, chaîne du froid.",
    strand: TECHNO,
    lessons: [
      {
        title: "Ralentir les microbes",
        minutes: 12,
        body: `${liste([
            "réfrigération (0 à 4 °C) : ralentit la multiplication des micro-organismes ;",
            "congélation et surgélation (−18 °C ou moins) : les arrête sans les détruire ;",
            "la <strong>chaîne du froid</strong> ne doit jamais être rompue ; on ne recongèle pas un produit décongelé.",
          ])}`,
      },
    ],
  },
  {
    title: "Séchage, salage et fumage",
    summary: "Réduire l’eau disponible ; produits traditionnels du Sénégal.",
    strand: TECHNO,
    lessons: [
      {
        title: "Conserver en retirant l’eau",
        minutes: 15,
        body: `${liste([
            "séchage, salage et fumage réduisent l’eau disponible pour les micro-organismes ;",
            "produits halieutiques traditionnels : guedj (poisson fermenté et séché), kéthiakh (poisson braisé et séché), tambadiang (petits poissons salés-séchés) ;",
            "séchage solaire de la mangue, des légumes, du poisson.",
          ])}`,
      },
    ],
  },
  {
    title: "Les fermentations alimentaires",
    summary: "Fermentations lactique, alcoolique et acétique ; produits fermentés locaux.",
    strand: MICRO,
    lessons: [
      {
        title: "Des microbes au service de l’aliment",
        minutes: 15,
        body: `${liste([
            "fermentation lactique : les bactéries lactiques transforment le lactose en acide lactique (lait caillé, yaourt) ;",
            "fermentation alcoolique : les levures transforment les sucres en éthanol et en CO₂ (pâte à pain) ;",
            "fermentation acétique : l’éthanol devient acide acétique (vinaigre) ;",
            "l’acidité produite protège l’aliment contre les micro-organismes pathogènes.",
          ])}`,
      },
    ],
  },
  {
    title: "La transformation des céréales locales",
    summary: "Décorticage, mouture, roulage ; produits à base de mil et de fonio.",
    strand: TECHNO,
    lessons: [
      {
        title: "Du grain aux produits finis",
        minutes: 15,
        body: `${methode([
            "Nettoyer et décortiquer le grain.",
            "Moudre en farine ou en semoule.",
            "Rouler la farine humidifiée pour obtenir des granules (thiéré, arraw, thiakry).",
            "Cuire à la vapeur, sécher et emballer.",
          ], "Fabriquer du couscous de mil")}
          ${retenir("Incorporer de la farine de mil ou de maïs dans le pain réduit les importations de blé.")}`,
      },
    ],
  },
  {
    title: "La transformation des fruits et légumes",
    summary: "Jus, nectars, sirops, confitures ; pasteurisation des jus.",
    strand: TECHNO,
    lessons: [
      {
        title: "Jus et confitures",
        minutes: 15,
        body: `${liste([
            "jus et boissons locales : bissap, bouye, gingembre ;",
            "les jus sont pasteurisés puis conditionnés dans des bouteilles propres et fermées ;",
            "dans une confiture, la forte teneur en sucre et la cuisson assurent la conservation ;",
            "le °Brix mesure la teneur en sucres solubles (réfractomètre).",
          ])}`,
      },
    ],
  },
  {
    title: "Emballage, étiquetage et contrôle qualité",
    summary: "Rôles de l’emballage, mentions de l’étiquette, contrôles, normes.",
    strand: TECHNO,
    lessons: [
      {
        title: "Mettre un produit sur le marché",
        minutes: 15,
        body: `${liste([
            "l’emballage protège, conserve, informe et attire le consommateur ;",
            "étiquette : dénomination, liste des ingrédients, poids net, date limite, numéro de lot, nom et adresse du fabricant ;",
            "contrôles : pH, °Brix, analyses microbiologiques ;",
            "au Sénégal, l’Association sénégalaise de normalisation (ASN) élabore les normes.",
          ])}
          ${exemple(["Une date limite de consommation (DLC) s’applique aux produits très périssables comme les produits laitiers frais."])}`,
      },
    ],
  },
];
