// Histoire-géographie de 5e : programmes officiels mis en ligne par l’Office du Bac : histoire « le monde
// du VIIe au XVIe siècle » (22 leçons) et géographie « le Sénégal » (26 leçons). Leçons rédigées par
// DIANGAL, à faire valider par un professeur d’histoire-géographie.

import { type ChapterSpec, exemple, liste, retenir, tableau } from "../tle/blocks";

const H = "Histoire";
const G = "Géographie";

export const HG_5E: ChapterSpec[] = [
  // ── Histoire ──────────────────────────────────────────────────────────────
  {
    title: "Le monde à la fin du VIe siècle",
    summary: "L’Europe, l’Asie et l’Afrique vers 600.",
    strand: H,
    lessons: [
      {
        title: "Le monde vers l’an 600",
        minutes: 10,
        body: `${liste([
            "En Europe, l’Empire romain d’Occident a disparu ; des royaumes germaniques se partagent son territoire ; l’Empire byzantin (Constantinople) domine l’Orient.",
            "En Arabie, des tribus nomades et des villes commerçantes (La Mecque) ; la plupart sont polythéistes.",
            "En Afrique, l’empire du Ghana se développe ; Axoum domine la mer Rouge.",
          ])}
          ${retenir("Au VII<sup>e</sup> siècle, la naissance de l’islam va transformer une grande partie du monde.")}`,
      },
    ],
  },
  {
    title: "La civilisation musulmane",
    summary: "La naissance de l’islam, l’expansion musulmane et la civilisation musulmane.",
    strand: H,
    lessons: [
      {
        title: "La naissance de l’islam",
        minutes: 12,
        body: `${liste([
            "Muhammad, né vers 570 à La Mecque, reçoit la révélation vers 610.",
            "En 622, il émigre à Médine : c’est l’hégire, début du calendrier musulman.",
            "Le Coran est le livre saint de l’islam ; les cinq piliers sont la profession de foi, la prière, l’aumône, le jeûne du Ramadan et le pèlerinage.",
          ])}
          ${retenir("L’islam est une religion monothéiste.")}`,
      },
      {
        title: "L’expansion et l’organisation du monde musulman",
        minutes: 12,
        body: `${liste([
            "Après la mort du Prophète (632), les califes conquièrent la Syrie, l’Égypte, la Perse, l’Afrique du Nord et l’Espagne.",
            "Capitales successives : Médine, Damas (Omeyyades), Bagdad (Abbassides).",
            "L’islam gagne l’Afrique de l’Ouest par le commerce transsaharien.",
          ])}
          ${retenir("Le calife est le successeur du Prophète, chef politique et religieux.")}`,
      },
      {
        title: "La civilisation musulmane",
        minutes: 12,
        body: `${liste(["villes brillantes : Bagdad, Le Caire, Cordoue ;", "sciences : algèbre, chiffres arabes, médecine (Avicenne), astronomie ;", "arts : mosquées, calligraphie, arabesques."])}
          ${retenir("Les savants musulmans ont conservé et enrichi les savoirs grecs, perses et indiens.")}`,
      },
    ],
  },
  {
    title: "Les empires du Ghana et du Mali",
    summary: "Formation, expansion et civilisation du Ghana et du Mali ; le mouvement almoravide.",
    strand: H,
    lessons: [
      {
        title: "L’empire du Ghana et le mouvement almoravide",
        minutes: 12,
        body: `${liste([
            "Empire soninké, riche grâce à l’or et au commerce avec les marchands d’Afrique du Nord (relation avec Aoudaghost) ; capitale Koumbi Saleh.",
            "Les <strong>Almoravides</strong>, mouvement religieux berbère né au XI<sup>e</sup> siècle, conquièrent le Maroc et l’Espagne et affaiblissent le Ghana (prise de Koumbi en 1076, selon la tradition).",
          ])}
          ${retenir("Le roi du Ghana contrôlait le commerce de l’or ; il en tirait d’importants impôts.")}`,
      },
      {
        title: "L’empire du Mali",
        minutes: 12,
        body: `${liste([
            "Soundjata Keïta fonde l’empire après sa victoire de Kirina (vers 1235) ; la charte du Kouroukan Fouga organise la société.",
            "Kankou Moussa fait un célèbre pèlerinage à La Mecque (1324) ; Tombouctou devient un centre de savoir.",
            "L’empire s’étend de l’Atlantique au Niger.",
          ])}
          ${retenir("L’épopée de Soundjata est transmise par les griots.")}`,
      },
    ],
  },
  {
    title: "L’empire Songhaï et les royaumes du golfe de Guinée",
    summary: "L’empire Songhaï ; les cités yoruba et le royaume du Bénin.",
    strand: H,
    lessons: [
      {
        title: "L’empire Songhaï",
        minutes: 10,
        body: `${liste(["capitale Gao, sur le Niger ;", "Sonni Ali Ber agrandit l’empire ; Askia Mohammed l’organise et développe l’islam et les études ;", "défaite face au Maroc à Tondibi (1591)."])}
          ${retenir("Tombouctou et Djenné étaient de grands centres de commerce et d’études.")}`,
      },
      {
        title: "Les royaumes du golfe de Guinée",
        minutes: 10,
        body: `${liste(["les cités yoruba (Ifé, Oyo) : villes fortifiées, art du bronze et de la terre cuite ;", "le royaume du Bénin : célèbres plaques de bronze du palais de l’oba."])}
          ${retenir("L’art d’Ifé et du Bénin montre la grande maîtrise technique des artistes africains.")}`,
      },
    ],
  },
  {
    title: "La Sénégambie du XIe au XVIe siècle",
    summary: "Cadre et peuplement ; le Tékrour et le Fouta ; l’empire du Djolof ; l’empire du Gaabu ; unité et diversité.",
    strand: H,
    lessons: [
      {
        title: "Le Tékrour et l’empire du Djolof",
        minutes: 12,
        body: `${liste([
            "La Sénégambie s’étend entre le fleuve Sénégal et le fleuve Gambie ; elle est peuplée de Wolof, Sérères, Peuls, Toucouleurs, Mandingues, Diolas…",
            "Le <strong>Tékrour</strong>, dans la vallée du fleuve, adopte l’islam au XI<sup>e</sup> siècle.",
            "L’empire du <strong>Djolof</strong>, fondé par Ndiadiane Ndiaye, regroupe le Walo, le Cayor, le Baol, le Sine et le Saloum ; il se disloque au XVI<sup>e</sup> siècle (bataille de Danki).",
          ])}
          ${retenir("Le roi du Djolof portait le titre de Bourba.")}`,
      },
      {
        title: "L’empire du Gaabu et l’unité des civilisations",
        minutes: 12,
        body: `${liste([
            "Le <strong>Gaabu</strong>, royaume mandingue du sud, dirigé par un mansa, s’étend vers la Guinée-Bissau ; sa noblesse guerrière est celle des nyantio.",
            "Unité : économie agricole, organisation sociale hiérarchisée, rôle des griots, influence de l’islam.",
            "Diversité : langues, religions traditionnelles, organisation politique.",
          ])}
          ${retenir("Les civilisations de l’Afrique de l’Ouest sont à la fois unies et diverses.")}`,
      },
    ],
  },
  {
    title: "L’Europe du Xe au XVIe siècle",
    summary: "Le système féodal ; l’humanisme et la Renaissance.",
    strand: H,
    lessons: [
      {
        title: "Le système féodal",
        minutes: 10,
        body: `${liste(["Le seigneur donne une terre (fief) à un vassal qui lui doit fidélité et aide militaire.", "Les paysans (serfs) travaillent la terre du seigneur et paient des redevances.", "L’Église joue un grand rôle dans la vie des gens."])}
          ${retenir("La société féodale est divisée en trois ordres : ceux qui prient, ceux qui combattent, ceux qui travaillent.")}`,
      },
      {
        title: "L’humanisme et la Renaissance",
        minutes: 10,
        body: `${liste(["Aux XV<sup>e</sup> et XVI<sup>e</sup> siècles, les humanistes redécouvrent les textes antiques et placent l’homme au centre de leur réflexion.", "L’imprimerie (Gutenberg, vers 1450) diffuse les livres.", "Les artistes de la Renaissance (Léonard de Vinci, Michel-Ange) renouvellent l’art."])}
          ${retenir("La Renaissance est une période de renouveau artistique et scientifique en Europe.")}`,
      },
    ],
  },
  {
    title: "L’Amérique précolombienne et les grands voyages",
    summary: "Les civilisations précolombiennes ; les grands voyages de découvertes.",
    strand: H,
    lessons: [
      {
        title: "Les civilisations précolombiennes",
        minutes: 10,
        body: `${tableau([
            ["Civilisation", "Région", "Caractères"],
            ["Mayas", "Mexique, Guatemala", "écriture, calendrier, pyramides"],
            ["Aztèques", "Mexique (Tenochtitlan)", "empire guerrier, temples"],
            ["Incas", "Andes (Cuzco)", "empire organisé, routes, Machu Picchu"],
          ])}
          ${retenir("« Précolombien » signifie : avant l’arrivée de Christophe Colomb (1492).")}`,
      },
      {
        title: "Les grands voyages de découvertes",
        minutes: 10,
        body: `${liste(["Les Portugais longent les côtes africaines (Gorée, cap Vert vers 1444) et atteignent l’Inde (Vasco de Gama, 1498).", "Christophe Colomb atteint l’Amérique en 1492 ; Magellan fait le premier tour du monde (1519-1522).", "Ces voyages préparent la colonisation et la traite négrière."])}
          ${retenir("Les grandes découvertes ouvrent une période de domination européenne sur le monde.")}`,
      },
    ],
  },
  // ── Géographie : le Sénégal ───────────────────────────────────────────────
  {
    title: "Le Sénégal : situation, géologie et relief",
    summary: "Situation et représentation du territoire, structure géologique et relief.",
    strand: G,
    lessons: [
      {
        title: "Situation et relief du Sénégal",
        minutes: 12,
        body: `${liste([
            "Le Sénégal (196 722 km²) est à l’extrême ouest de l’Afrique, entre 12° et 16°30 de latitude Nord.",
            "Il est formé surtout d’un grand bassin sédimentaire (roches déposées par la mer) ; le socle ancien n’apparaît qu’au sud-est.",
            "Le relief est bas et plat : plaines, plateaux bas, dunes du littoral ; les points les plus hauts (environ 600 m) sont au sud-est.",
          ])}
          ${retenir("Le relief plat facilite les transports mais l’absence de hauteurs limite les pluies.")}`,
      },
    ],
  },
  {
    title: "Le Sénégal : climat, eaux, sols, végétation et écosystèmes",
    summary: "Climat, hydrographie, sols, végétation et écosystèmes du Sénégal.",
    strand: G,
    lessons: [
      {
        title: "Le climat et l’hydrographie",
        minutes: 12,
        body: `${liste([
            "Climat tropical à deux saisons ; les pluies diminuent du sud (plus de 1 000 mm) au nord (moins de 400 mm).",
            "On représente le climat d’une ville par un <strong>diagramme climatique</strong> (températures en courbe, pluies en bâtons).",
            "Fleuves : Sénégal, Gambie, Casamance ; Saloum (estuaire) ; lac de Guiers ; nappes souterraines.",
          ])}
          ${retenir("Le climat commande les activités agricoles et le mode de vie.")}`,
      },
      {
        title: "Sols, végétation et écosystèmes",
        minutes: 12,
        body: `${tableau([
            ["Zone", "Végétation", "Sols"],
            ["nord", "steppe à épineux", "sableux, pauvres"],
            ["centre", "savane arbustive et arborée", "sols ferrugineux (« dior », « deck »)"],
            ["sud", "forêt claire, rizières", "sols plus riches"],
            ["littoral", "mangrove, filaos", "sols salés ou sableux"],
          ])}
          ${retenir("Un écosystème est un milieu et l’ensemble des êtres vivants qui y vivent en interaction.")}`,
      },
    ],
  },
  {
    title: "La population du Sénégal",
    summary: "Peuplement, accroissement, structures, répartition, mobilité et villes.",
    strand: G,
    lessons: [
      {
        title: "Peuplement et accroissement",
        minutes: 12,
        body: `${liste([
            "Peuples : Wolof (les plus nombreux), Pulaar, Sérères, Diolas, Mandingues, Soninkés… ; le français est la langue officielle ; wolof, pulaar, sérère, diola, mandingue, soninké… sont des langues nationales ;",
            "religions : islam majoritaire, christianisme, religions traditionnelles ;",
            "la population augmente vite (environ 18 millions en 2023) : forte natalité, recul de la mortalité.",
          ])}
          ${retenir("Accroissement naturel = naissances − décès.")}`,
      },
      {
        title: "Structures, répartition, mobilité et villes",
        minutes: 12,
        body: `${liste([
            "La <strong>pyramide des âges</strong> du Sénégal a une base large : la population est très jeune.",
            "Répartition inégale : forte densité à l’ouest (Dakar, Thiès, Diourbel), faible à l’est.",
            "Mobilité : exode rural, migrations saisonnières, émigration à l’étranger.",
            "Villes principales : Dakar, Touba, Thiès, Kaolack, Saint-Louis, Ziguinchor, Mbour.",
          ])}
          ${retenir("Plus de la moitié des Sénégalais vivent désormais en ville ou près des villes.")}`,
      },
    ],
  },
  {
    title: "Agriculture, élevage et pêche au Sénégal",
    summary: "Les activités du secteur primaire.",
    strand: G,
    lessons: [
      {
        title: "Le secteur primaire",
        minutes: 15,
        body: `${tableau([
            ["Activité", "Caractères"],
            ["agriculture", "surtout sous pluie ; arachide, mil, maïs, niébé ; riz irrigué dans la vallée du fleuve ; horticulture dans les Niayes"],
            ["élevage", "extensif, transhumant (Ferlo) ; bovins, ovins, caprins ; moutons de Tabaski"],
            ["pêche", "artisanale (pirogues) et industrielle ; première source de devises d’exportation"],
          ])}
          ${retenir("Le secteur primaire emploie une grande partie de la population mais dépend des pluies et des ressources naturelles.")}`,
      },
    ],
  },
  {
    title: "Industrie, tourisme, transports et échanges",
    summary: "Artisanat et industrie, tourisme, transports, commerce intérieur et échanges extérieurs.",
    strand: G,
    lessons: [
      {
        title: "Industrie, tourisme et échanges",
        minutes: 15,
        body: `${liste([
            "Artisanat (tissage, bijouterie, cordonnerie) et industries (huileries, conserveries de poisson, ciment, phosphates et engrais) concentrées autour de Dakar ;",
            "tourisme : Petite-Côte (Saly), Cap Skirring, Saint-Louis, delta du Saloum ;",
            "transports : routes, autoroutes, port de Dakar, aéroport Blaise Diagne, TER ;",
            "échanges extérieurs : exportations de poisson, or, phosphates, arachide ; importations de riz, pétrole, machines.",
          ])}
          ${retenir("La balance commerciale du Sénégal est déficitaire : il importe plus qu’il n’exporte.")}`,
      },
    ],
  },
  {
    title: "Le Sénégal : problèmes et perspectives",
    summary: "Jeunesse de la population, relations villes-campagnes, disparités régionales, environnement, place dans le monde.",
    strand: G,
    lessons: [
      {
        title: "Les grands défis du Sénégal",
        minutes: 15,
        body: `${liste([
            "La <strong>jeunesse</strong> de la population : fardeau (écoles, emplois à créer) ou potentialité (force de travail, créativité) ?",
            "Les <strong>relations villes-campagnes</strong> : la ville attire, la campagne la nourrit.",
            "Les <strong>disparités régionales</strong> : Dakar concentre les richesses ; la décentralisation et la régionalisation cherchent à mieux répartir le développement.",
            "Les <strong>problèmes d’environnement</strong> : déforestation, érosion côtière, pollution.",
          ])}
          ${exemple(["Le Sénégal est membre de l’Union africaine, de la CEDEAO, de l’UEMOA, de l’OMVS et de l’ONU."])}
          ${retenir("Le Sénégal joue un rôle diplomatique important en Afrique et dans le monde.")}`,
      },
    ],
  },
];
