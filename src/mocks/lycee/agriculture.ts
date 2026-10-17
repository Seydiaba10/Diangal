// Sciences agricoles de la série S4 (1re et Terminale) : écologie et environnement, phytotechnie,
// zootechnie. Chapitres INDICATIFS, établis d’après la liste des épreuves du Bac de la série S4 ;
// programme officiel non trouvé en ligne. Leçons rédigées par DIANGAL, à faire valider par un professeur
// de sciences agricoles.

import { type ChapterSpec, exemple, liste, methode, retenir, tableau } from "../tle/blocks";

const ECOL = "Écologie et environnement";
const PHYTO = "Phytotechnie";
const ZOO = "Zootechnie";

export const AGRI_1RE: ChapterSpec[] = [
  {
    title: "Écosystèmes naturels et agrosystèmes",
    summary: "Facteurs écologiques, chaînes alimentaires, agrosystème, biodiversité cultivée.",
    strand: ECOL,
    lessons: [
      {
        title: "Du milieu naturel au champ",
        minutes: 15,
        body: `${liste([
            "un écosystème associe un milieu (sol, climat, eau) et des êtres vivants en interaction ;",
            "un <strong>agrosystème</strong> est un écosystème aménagé par l’homme pour produire : peu d’espèces, récoltes exportées, apports d’eau et d’engrais ;",
            "les rotations, l’association de cultures et les haies maintiennent la biodiversité et la fertilité.",
          ])}`,
      },
    ],
  },
  {
    title: "Le sol, support des cultures",
    summary: "Texture, structure, matière organique, fertilité ; sols du Sénégal.",
    strand: PHYTO,
    lessons: [
      {
        title: "Connaître son sol",
        minutes: 15,
        body: `${tableau([
            ["Sol", "Caractères", "Cultures"],
            ["dior", "sableux, filtrant, pauvre", "arachide, mil, niébé"],
            ["deck", "plus argileux, plus fertile", "sorgho, maïs, maraîchage"],
            ["sols hydromorphes", "engorgés d’eau (bas-fonds)", "riz"],
            ["tannes", "salés", "peu cultivables sans aménagement"],
          ])}
          ${retenir("La fertilité dépend de la texture, de la matière organique, du pH et de la vie du sol.")}`,
      },
    ],
  },
  {
    title: "L’eau et l’irrigation",
    summary: "Pluviométrie, besoins en eau, techniques d’irrigation.",
    strand: PHYTO,
    lessons: [
      {
        title: "Apporter l’eau aux cultures",
        minutes: 15,
        body: `${liste([
            "au Sénégal, les pluies diminuent du sud (plus de 1 000 mm par an en Casamance) au nord (moins de 400 mm) ;",
            "la saison des pluies (hivernage) dure de trois à cinq mois ;",
            "irrigation gravitaire (vallée du fleuve Sénégal, riz), par aspersion, ou goutte-à-goutte (maraîchage, économe en eau) ;",
            "une mauvaise irrigation peut saliniser les sols.",
          ])}`,
      },
    ],
  },
  {
    title: "La plante cultivée",
    summary: "Cycle de développement, besoins nutritifs, photosynthèse.",
    strand: PHYTO,
    lessons: [
      {
        title: "Croissance et développement",
        minutes: 15,
        body: `${liste([
            "cycle : semis, levée, croissance végétative, floraison, fructification, maturité ;",
            "la plante fabrique sa matière par photosynthèse (lumière, eau, CO₂) ;",
            "éléments majeurs : azote (N, croissance des feuilles), phosphore (P, racines et floraison), potassium (K, résistance et qualité des fruits).",
          ])}`,
      },
    ],
  },
  {
    title: "Les grandes cultures du Sénégal",
    summary: "Céréales, légumineuses, cultures de rente, calendrier cultural.",
    strand: PHYTO,
    lessons: [
      {
        title: "Ce que l’on cultive",
        minutes: 15,
        body: `${tableau([
            ["Culture", "Zones principales"],
            ["mil, sorgho", "bassin arachidier, centre et nord"],
            ["arachide", "bassin arachidier (Kaolack, Kaffrine, Diourbel)"],
            ["riz", "vallée du fleuve Sénégal, Casamance"],
            ["maïs, coton", "sud et sud-est"],
            ["niébé", "nord et centre"],
            ["maraîchage (oignon, tomate)", "Niayes, vallée du fleuve"],
          ])}
          ${retenir("Les légumineuses (arachide, niébé) enrichissent le sol en azote grâce aux bactéries de leurs racines.")}`,
      },
    ],
  },
  {
    title: "Les espèces animales élevées",
    summary: "Bovins, petits ruminants, volaille ; races locales ; systèmes d’élevage.",
    strand: ZOO,
    lessons: [
      {
        title: "L’élevage au Sénégal",
        minutes: 15,
        body: `${liste([
            "bovins : zébu Gobra au nord, taurin Ndama au sud, résistant à la trypanosomose ;",
            "ovins : Touabire, Peul-Peul, Ladoum ; caprins ; volaille traditionnelle et industrielle ;",
            "systèmes : pastoral (transhumance, Ferlo), agropastoral, intensif (aviculture, embouche).",
          ])}`,
      },
    ],
  },
  {
    title: "Environnement et ressources naturelles",
    summary: "Désertification, déforestation, feux de brousse, agroforesterie.",
    strand: ECOL,
    lessons: [
      {
        title: "Protéger les ressources",
        minutes: 12,
        body: `${liste([
            "menaces : désertification, déforestation, feux de brousse, érosion, salinisation ;",
            "réponses : reboisement (Grande Muraille verte), mise en défens, haies vives, cordons pierreux ;",
            "agroforesterie : le kadd (Faidherbia albida) perd ses feuilles en saison des pluies et enrichit le sol des champs de mil.",
          ])}`,
      },
    ],
  },
];

export const AGRI_TLE: ChapterSpec[] = [
  {
    title: "La fertilisation des sols",
    summary: "Engrais minéraux, fumure organique, amendements, calcul de doses.",
    strand: PHYTO,
    lessons: [
      {
        title: "Nourrir le sol et la plante",
        minutes: 15,
        body: `${liste([
            "engrais minéraux : la formule NPK 15-15-15 contient 15 kg d’azote, 15 kg de P₂O₅ et 15 kg de K₂O pour 100 kg ; l’urée contient 46 % d’azote ;",
            "fumure organique : fumier, compost, parcage des animaux ; elle améliore la structure du sol ;",
            "amendements : chaux ou phosphate naturel pour corriger l’acidité.",
          ])}
          ${exemple(["Pour apporter 46 kg d’azote avec de l’urée, il faut 100 kg d’urée."])}`,
      },
    ],
  },
  {
    title: "L’itinéraire technique d’une culture",
    summary: "De la préparation du sol à la conservation de la récolte.",
    strand: PHYTO,
    lessons: [
      {
        title: "Conduire une culture",
        minutes: 15,
        body: `${methode([
            "Préparer le sol (nettoyage, labour ou grattage) et choisir des semences de qualité.",
            "Semer à la bonne date et à la bonne densité ; démarier si besoin.",
            "Entretenir : sarclage, fertilisation, protection contre les ravageurs.",
            "Récolter à maturité, sécher, battre, stocker à l’abri de l’humidité et des insectes.",
          ], "Itinéraire du mil")}`,
      },
    ],
  },
  {
    title: "La protection des cultures",
    summary: "Ravageurs, maladies, mauvaises herbes, lutte intégrée.",
    strand: PHYTO,
    lessons: [
      {
        title: "Protéger les récoltes",
        minutes: 15,
        body: `${liste([
            "ravageurs : criquets, chenille légionnaire d’automne (arrivée en Afrique de l’Ouest en 2016), insectes des stocks ;",
            "maladies : champignons, bactéries, virus ;",
            "mauvaises herbes : le Striga, plante parasite du mil et du sorgho ;",
            "lutte intégrée : rotations, variétés résistantes, lutte biologique, pesticides en dernier recours avec protection de l’utilisateur.",
          ])}`,
      },
    ],
  },
  {
    title: "Semences et amélioration des plantes",
    summary: "Sélection, variétés améliorées, semences certifiées.",
    strand: PHYTO,
    lessons: [
      {
        title: "De meilleures variétés",
        minutes: 12,
        body: `${liste([
            "la sélection choisit les plantes les plus productives, précoces ou résistantes à la sécheresse ;",
            "au Sénégal, l’ISRA (Institut sénégalais de recherches agricoles) crée des variétés adaptées ;",
            "une semence certifiée garantit la pureté variétale et une bonne germination.",
          ])}`,
      },
    ],
  },
  {
    title: "L’alimentation des animaux",
    summary: "Besoins, aliments, ration, embouche.",
    strand: ZOO,
    lessons: [
      {
        title: "Nourrir le bétail",
        minutes: 15,
        body: `${liste([
            "besoins d’entretien (vivre) et de production (croissance, lait, gestation) ;",
            "aliments : fourrages (paille, fanes d’arachide), concentrés (tourteau d’arachide, son de mil, graines de coton), sels minéraux (pierre à lécher), eau ;",
            "l’embouche engraisse des animaux en quelques mois, par exemple les moutons avant la Tabaski.",
          ])}`,
      },
    ],
  },
  {
    title: "Santé et reproduction des animaux",
    summary: "Principales maladies, prophylaxie, reproduction et amélioration génétique.",
    strand: ZOO,
    lessons: [
      {
        title: "Un élevage en bonne santé",
        minutes: 15,
        body: `${tableau([
            ["Maladie", "Espèces"],
            ["peste des petits ruminants", "moutons, chèvres"],
            ["péripneumonie contagieuse bovine", "bovins"],
            ["maladie de Newcastle", "volaille"],
          ])}
          ${liste(["prévention : vaccination, hygiène des abris, déparasitage ;", "gestation : environ 9 mois chez la vache, 5 mois chez la brebis ;", "l’insémination artificielle diffuse des races plus productives."])}`,
      },
    ],
  },
  {
    title: "Gestion de l’exploitation agricole",
    summary: "Coûts de production, marge brute, commercialisation, organisations paysannes.",
    strand: ECOL,
    lessons: [
      {
        title: "Une exploitation rentable",
        minutes: 12,
        body: `${liste([
            "marge brute = produit brut (valeur de la récolte) − charges variables (semences, engrais, traitements) ;",
            "les coopératives et organisations paysannes aident à acheter les intrants et à vendre ;",
            "le crédit agricole (La Banque Agricole) finance les campagnes ;",
            "transformer sur place augmente la valeur ajoutée.",
          ])}
          ${exemple(["Récolte vendue 600 000 F, charges variables 250 000 F : marge brute 350 000 F."])}`,
      },
    ],
  },
];
