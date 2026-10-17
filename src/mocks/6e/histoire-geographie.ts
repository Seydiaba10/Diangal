// Histoire-géographie de 6e : programmes officiels d’histoire (« des origines à la fin du VIe siècle »,
// 22 leçons) et de géographie (études régionales du Sénégal) mis en ligne par l’Office du Bac. Leçons
// rédigées par DIANGAL, à faire valider par un professeur d’histoire-géographie.

import { type ChapterSpec, exemple, liste, retenir, tableau } from "../tle/blocks";

const H = "Histoire";
const G = "Géographie";

/** Deux leçons d’étude régionale : milieu et population, activités et développement. */
function regional(
  title: string,
  theme: string,
  milieu: string[],
  activites: string[],
  probleme: string,
): ChapterSpec {
  return {
    title,
    summary: `Étude régionale : ${theme}.`,
    strand: G,
    lessons: [
      { title: "Situation, milieu et population", minutes: 12, body: `${liste(milieu)}${retenir("Pour étudier une région, on la situe d’abord sur la carte : où est-elle ? quelles sont ses limites ?")}` },
      { title: "Activités, problèmes et perspectives", minutes: 12, body: `${liste(activites)}${retenir(probleme)}` },
    ],
  };
}

export const HG_6E: ChapterSpec[] = [
  // ── Histoire ──────────────────────────────────────────────────────────────
  {
    title: "Introduction à l’étude de l’histoire",
    summary: "Définition, sources, méthodes, chronologie et intérêt de l’histoire.",
    strand: H,
    lessons: [
      {
        title: "Qu’est-ce que l’histoire ?",
        minutes: 12,
        body: `<p>L’<strong>histoire</strong> est l’étude du passé des hommes à partir de <strong>sources</strong>.</p>
          ${tableau([
            ["Sources", "Exemples"],
            ["écrites", "livres anciens, lettres, manuscrits de Tombouctou"],
            ["orales", "récits des griots, traditions familiales"],
            ["archéologiques", "outils, poteries, ruines, tombes"],
          ])}
          ${liste(["La <strong>chronologie</strong> range les événements dans l’ordre ; on compte les années avant et après Jésus-Christ (av. J.-C., apr. J.-C.).", "Un siècle = 100 ans : l’an 1450 appartient au XV<sup>e</sup> siècle."])}
          ${retenir("L’histoire nous aide à comprendre le présent et à connaître nos racines.")}`,
      },
    ],
  },
  {
    title: "La préhistoire",
    summary: "Les grandes divisions de la préhistoire, la préhistoire africaine, préhistoire et protohistoire au Sénégal.",
    strand: H,
    lessons: [
      {
        title: "Les grandes divisions de la préhistoire",
        minutes: 12,
        body: `${tableau([
            ["Période", "Caractères"],
            ["paléolithique (pierre taillée)", "chasse, pêche, cueillette ; nomadisme ; découverte du feu"],
            ["néolithique (pierre polie)", "agriculture, élevage, poterie ; sédentarisation dans des villages"],
          ])}
          ${retenir("La préhistoire s’achève avec l’invention de l’écriture, vers 3 000 av. J.-C. en Égypte et en Mésopotamie.")}`,
      },
      {
        title: "L’Afrique, berceau de l’humanité",
        minutes: 12,
        body: `${liste([
            "Les plus anciens restes humains ont été découverts en Afrique de l’Est (Éthiopie, Kenya, Tanzanie) : l’Afrique est le berceau de l’humanité.",
            "Au néolithique, le Sahara était humide et peuplé : les peintures rupestres du Tassili montrent des chasseurs et des troupeaux.",
            "Le dessèchement du Sahara a poussé les populations vers le sud et la vallée du Nil.",
          ])}
          ${retenir("Les premiers hommes sont apparus en Afrique et ont ensuite peuplé les autres continents.")}`,
      },
      {
        title: "Préhistoire et protohistoire au Sénégal",
        minutes: 12,
        body: `${liste([
            "Des outils de pierre ont été trouvés dans la presqu’île du Cap-Vert et dans la vallée de la Falémé.",
            "Les amas coquilliers du delta du Saloum témoignent d’anciennes populations de pêcheurs.",
            "Les cercles mégalithiques (Sine Ngayène, Wanar) et les tumulus sont des monuments funéraires de la protohistoire.",
          ])}
          ${retenir("La protohistoire est la période où des peuples sans écriture sont connus par des écrits d’autres peuples ou par leurs monuments.")}`,
      },
    ],
  },
  {
    title: "L’Égypte pharaonique",
    summary: "Le pays, les hommes, les grandes périodes et la civilisation égyptienne.",
    strand: H,
    lessons: [
      {
        title: "Le pays et l’histoire de l’Égypte",
        minutes: 12,
        body: `${liste([
            "L’Égypte est « un don du Nil » : la crue annuelle dépose le limon fertile.",
            "Vers 3 000 av. J.-C., la Haute et la Basse-Égypte sont unifiées ; le roi est le <strong>pharaon</strong>.",
            "Grandes périodes : Ancien Empire (pyramides de Gizeh), Moyen Empire, Nouvel Empire.",
          ])}
          ${retenir("Le pharaon, considéré comme un dieu vivant, gouvernait avec des scribes et des prêtres.")}`,
      },
      {
        title: "La civilisation égyptienne",
        minutes: 12,
        body: `${liste([
            "écriture : les <strong>hiéroglyphes</strong>, sur papyrus et sur les monuments ;",
            "religion : de nombreux dieux (Rê, Osiris, Isis) ; croyance en la vie après la mort, momification ;",
            "sciences : calendrier, mathématiques, médecine, architecture (pyramides, temples).",
          ])}
          ${retenir("Cheikh Anta Diop a montré les liens de la civilisation égyptienne avec le reste de l’Afrique noire.")}`,
      },
    ],
  },
  {
    title: "La Nubie, l’Éthiopie et les relations de l’Afrique ancienne",
    summary: "La Nubie (Kerma, Napata, Méroé), l’Éthiopie (Axoum) et les échanges avec l’Afrique intérieure.",
    strand: H,
    lessons: [
      {
        title: "La Nubie et l’Éthiopie antiques",
        minutes: 12,
        body: `${liste([
            "La <strong>Nubie</strong>, au sud de l’Égypte, a connu les royaumes de Kerma, de Napata puis de Méroé, célèbre pour son fer et ses pyramides.",
            "Des pharaons noirs venus de Napata ont régné sur l’Égypte (XXV<sup>e</sup> dynastie).",
            "En <strong>Éthiopie</strong>, le royaume d’Axoum était une puissance commerçante ; il adopta le christianisme au IV<sup>e</sup> siècle.",
          ])}
          ${retenir("L’Afrique ancienne a produit de grandes civilisations bien avant l’arrivée des Européens.")}`,
      },
      {
        title: "Relations entre l’Afrique du Nord-Est et l’Afrique intérieure",
        minutes: 10,
        body: `${liste(["migrations de populations après le dessèchement du Sahara ;", "diffusion de la métallurgie du fer et de l’agriculture ;", "échanges de produits : or, ivoire, sel, bétail ; influences culturelles."])}
          ${retenir("Les peuples d’Afrique ont toujours échangé entre eux des idées, des techniques et des produits.")}`,
      },
    ],
  },
  {
    title: "Carthage",
    summary: "La civilisation carthaginoise.",
    strand: H,
    lessons: [
      {
        title: "La civilisation carthaginoise",
        minutes: 10,
        body: `${liste([
            "Carthage, en Afrique du Nord (Tunisie actuelle), a été fondée par des Phéniciens au IX<sup>e</sup> siècle av. J.-C.",
            "Grande puissance maritime et commerçante de la Méditerranée.",
            "Rivale de Rome, elle est détruite en 146 av. J.-C. après les guerres puniques ; le général Hannibal avait traversé les Alpes avec des éléphants.",
          ])}
          ${retenir("Carthage montre l’importance de l’Afrique dans l’histoire de la Méditerranée antique.")}`,
      },
    ],
  },
  {
    title: "Les civilisations antiques de l’Asie",
    summary: "La Mésopotamie et la Palestine : cadre, histoire et civilisation.",
    strand: H,
    lessons: [
      {
        title: "La Mésopotamie",
        minutes: 10,
        body: `${liste([
            "Entre le Tigre et l’Euphrate (Irak actuel) : premières villes et premiers États.",
            "Invention de l’écriture <strong>cunéiforme</strong> sur des tablettes d’argile.",
            "Le code d’Hammourabi, roi de Babylone, est l’un des premiers recueils de lois.",
          ])}
          ${retenir("La Mésopotamie et l’Égypte sont les plus anciennes civilisations de l’écriture.")}`,
      },
      {
        title: "La Palestine, foyer du monothéisme",
        minutes: 10,
        body: `${liste([
            "Les Hébreux, établis en Palestine, croient en un Dieu unique : c’est le <strong>monothéisme</strong>.",
            "Leur histoire est racontée dans la Bible ; Jérusalem en est la ville sainte.",
            "La Palestine est le berceau du judaïsme et du christianisme ; l’islam reconnaît aussi ses prophètes.",
          ])}
          ${retenir("Judaïsme, christianisme et islam sont les trois grandes religions monothéistes.")}`,
      },
    ],
  },
  {
    title: "La Grèce antique",
    summary: "Le pays, les hommes, les grandes périodes et la civilisation grecque.",
    strand: H,
    lessons: [
      {
        title: "Les cités grecques",
        minutes: 12,
        body: `${liste([
            "La Grèce est un pays montagneux, ouvert sur la mer : les Grecs vivaient dans des <strong>cités</strong> indépendantes (Athènes, Sparte).",
            "Athènes invente la <strong>démocratie</strong> au V<sup>e</sup> siècle av. J.-C. (mais les femmes, les étrangers et les esclaves n’étaient pas citoyens).",
            "Alexandre le Grand conquiert un immense empire ; il fonde Alexandrie en Égypte.",
          ])}
          ${retenir("Démocratie veut dire « pouvoir du peuple ».")}`,
      },
      {
        title: "La civilisation grecque",
        minutes: 10,
        body: `${liste(["philosophie (Socrate, Platon, Aristote), sciences (Pythagore, Archimède), histoire (Hérodote) ;", "théâtre, sculpture, temples (Parthénon) ; Jeux olympiques ;", "les savants grecs ont étudié en Égypte : Alexandrie devint un grand centre de savoir."])}
          ${retenir("La civilisation grecque a beaucoup reçu de l’Égypte et a influencé le monde entier.")}`,
      },
    ],
  },
  {
    title: "Rome, de la cité à l’empire",
    summary: "Rome, la civilisation romaine et son évolution.",
    strand: H,
    lessons: [
      {
        title: "De la cité romaine à l’Empire",
        minutes: 12,
        body: `${tableau([
            ["Période", "Faits"],
            ["royauté (753-509 av. J.-C.)", "fondation légendaire de Rome par Romulus"],
            ["République", "Rome conquiert l’Italie, puis la Méditerranée (Carthage)"],
            ["Empire (à partir de 27 av. J.-C.)", "Auguste premier empereur ; la « paix romaine »"],
          ])}
          ${retenir("L’Empire romain s’étendait autour de la Méditerranée, de l’Afrique du Nord à la Bretagne.")}`,
      },
      {
        title: "La civilisation romaine",
        minutes: 10,
        body: `${liste(["droit romain, routes, aqueducs, villes avec forum, thermes et amphithéâtres ;", "langue latine, à l’origine du français ;", "l’Afrique du Nord romaine fournissait du blé ; des Africains sont devenus empereurs (Septime Sévère)."])}
          ${retenir("Le français vient du latin, la langue des Romains.")}`,
      },
    ],
  },
  {
    title: "Le christianisme et les grandes invasions",
    summary: "La naissance et l’expansion du christianisme ; les grandes invasions en Europe et en Afrique.",
    strand: H,
    lessons: [
      {
        title: "Le christianisme dans le monde romain",
        minutes: 10,
        body: `${liste(["Jésus naît en Palestine sous l’Empire romain ; ses disciples diffusent son message.", "Les chrétiens sont d’abord persécutés, puis l’empereur Constantin autorise le christianisme (313).", "Il devient la religion officielle de l’Empire à la fin du IV<sup>e</sup> siècle ; saint Augustin, né en Afrique du Nord, en est un grand penseur."])}
          ${retenir("Le christianisme s’est répandu grâce aux routes et à l’unité de l’Empire romain.")}`,
      },
      {
        title: "Les grandes invasions",
        minutes: 10,
        body: `${liste(["Aux IV<sup>e</sup> et V<sup>e</sup> siècles, des peuples germaniques (Goths, Vandales, Francs) envahissent l’Empire romain d’Occident.", "Les Vandales s’installent en Afrique du Nord et prennent Carthage (439).", "L’Empire romain d’Occident disparaît en 476 ; celui d’Orient (Byzance) continue."])}
          ${retenir("476 marque traditionnellement la fin de l’Antiquité en Europe.")}`,
      },
    ],
  },
  // ── Géographie ────────────────────────────────────────────────────────────
  {
    title: "Introduction à la géographie : s’orienter et lire une carte",
    summary: "Notions d’orientation et de représentation : carte, échelle, légende, latitude, longitude.",
    strand: G,
    lessons: [
      {
        title: "La carte et l’échelle",
        minutes: 12,
        body: `${liste([
            "La <strong>géographie</strong> étudie les relations entre les hommes et leur milieu.",
            "Une <strong>carte</strong> représente un espace vu d’en haut, réduit ; elle a un titre, une <strong>légende</strong>, une <strong>échelle</strong> et une orientation (le nord en haut).",
            "Échelle 1/100 000 : 1 cm sur la carte = 1 km en réalité.",
          ])}
          ${exemple(["Sur une carte au 1/1 000 000, Dakar et Kaolack sont à environ 19 cm : la distance réelle est d’environ 190 km."])}
          ${retenir("La situation d’un lieu se donne par rapport aux points cardinaux, aux pays voisins, à la mer, ou par ses coordonnées (latitude, longitude).")}`,
      },
    ],
  },
  regional(
    "Le Bassin arachidier",
    "la culture sous pluie, de la monoculture à la diversification",
    [
      "Au centre-ouest du Sénégal (régions de Kaolack, Kaffrine, Fatick, Diourbel, Thiès, Louga).",
      "Plaines sableuses, climat soudano-sahélien, pluies de juillet à octobre.",
      "Région très peuplée : Wolof et Sérères surtout ; nombreux villages et villes-marchés (Kaolack, Touba, Diourbel).",
      "Principales plantes : arachide (culture de rente) et mil (culture vivrière).",
    ],
    [
      "Agriculture sous pluie : arachide, mil, niébé, maïs, pastèque ; usage du semoir et de la houe.",
      "Transformation : huileries (Kaolack, Ziguinchor, Diourbel), artisanat (huile, pâte d’arachide).",
      "Problèmes : appauvrissement des sols (monoculture), sécheresses, baisse des prix, exode rural.",
    ],
    "La diversification des cultures et la restauration des sols sont des enjeux majeurs pour le Bassin arachidier.",
  ),
  regional(
    "Dakar et le littoral central",
    "les activités urbaines et suburbaines",
    [
      "La presqu’île du Cap-Vert, à l’extrême ouest de l’Afrique ; littoral de Dakar à Mbour.",
      "Climat doux grâce à l’alizé maritime ; Niayes (dépressions humides).",
      "Forte concentration de population : plus d’un Sénégalais sur cinq vit dans la région de Dakar.",
    ],
    [
      "Industrie, port, commerce, services, administration ; maraîchage dans les Niayes ; pêche (Kayar, Mbour, Joal) ; tourisme (Petite-Côte).",
      "Grands projets : pôle urbain de Diamniadio, TER, autoroute, aéroport Blaise Diagne.",
      "Problèmes : encombrements, inondations, logement, pollution, chômage des jeunes.",
    ],
    "Dakar concentre l’essentiel des activités du pays : il faut mieux répartir le développement entre les régions.",
  ),
  regional(
    "Le Ferlo",
    "le problème de l’eau et l’activité pastorale",
    [
      "Au nord du pays, entre la vallée du fleuve Sénégal et le Bassin arachidier.",
      "Climat sahélien, pluies faibles ; vallée fossile du Ferlo ; steppe.",
      "Population peu nombreuse, surtout peule, souvent mobile.",
    ],
    [
      "Élevage extensif de bovins, ovins et caprins ; transhumance vers les points d’eau et les pâturages.",
      "Forages et mares temporaires ; marchés hebdomadaires de bétail (louma).",
      "Problèmes : manque d’eau, surpâturage, avancée du désert ; la Grande Muraille verte y plante des arbres.",
    ],
    "Dans le Ferlo, l’eau commande la vie des hommes et des troupeaux.",
  ),
  regional(
    "La vallée du fleuve Sénégal",
    "la vallée du fleuve et son aménagement",
    [
      "Au nord, le long du fleuve Sénégal, de Bakel à Saint-Louis.",
      "Le <strong>walo</strong> (terres inondables) et le <strong>diéri</strong> (terres sèches) ; climat sahélien.",
      "Populations toucouleur (haalpulaar), wolof, soninké ; forte émigration.",
    ],
    [
      "Activités traditionnelles : cultures de décrue, élevage, pêche.",
      "Aménagements modernes : barrages de Diama et de Manantali (OMVS), riziculture irriguée, tomate, canne à sucre (Richard-Toll).",
      "Problèmes : salinisation, maladies hydriques, coût des aménagements.",
    ],
    "Les barrages ont transformé l’agriculture de la vallée en permettant l’irrigation.",
  ),
  regional(
    "La Casamance",
    "l’étude d’un écosystème humide",
    [
      "Au sud du pays, séparée du reste du Sénégal par la Gambie.",
      "Climat subguinéen, pluies abondantes ; forêts, rizières et mangroves le long du fleuve Casamance.",
      "Populations diola, mandingue, peule, balante… ; villes : Ziguinchor, Kolda, Sédhiou.",
    ],
    [
      "Riziculture, cueillette (fruits, huile de palme, vin de palme), pêche, arboriculture (mangues, anacarde), tourisme (Cap Skirring).",
      "Problèmes : enclavement, déforestation, salinisation des rizières.",
      "Atouts : très grandes potentialités agricoles et touristiques.",
    ],
    "La Casamance est le « grenier » potentiel du Sénégal ; le pont de Farafégny sur la Gambie facilite son désenclavement.",
  ),
  regional(
    "Le Haut-Sénégal (Sud-Est)",
    "une région de contact",
    [
      "Au sud-est (régions de Tambacounda et de Kédougou), en contact avec le Mali et la Guinée.",
      "Relief le plus élevé du pays (contreforts du Fouta-Djalon) ; climat soudanien ; savanes et forêts claires.",
      "Populations bassari, bédik, malinké, peule, diakhanké ; faible densité.",
    ],
    [
      "Agriculture (coton, maïs), élevage, chasse et tourisme (parc national du Niokolo-Koba).",
      "Mines : or (Sabodala), marbre, fer de la Falémé.",
      "Problèmes : enclavement, orpaillage qui pollue les rivières, manque d’infrastructures.",
    ],
    "Le Sud-Est possède d’importantes richesses minières et naturelles à exploiter durablement.",
  ),
];
