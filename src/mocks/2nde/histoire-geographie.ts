// Histoire-géographie de 2nde : programmes officiels mis en ligne par l’Office du Bac : histoire de
// l’Afrique et du monde, de la préhistoire à 1870 (25 leçons), géographie physique générale (20 leçons).
// Leçons rédigées par DIANGAL, à faire valider par un professeur d’histoire-géographie.

import { type ChapterSpec, exemple, liste, methode, retenir, tableau } from "../tle/blocks";

const H = "Histoire";
const G = "Géographie";

export const HG_2NDE: ChapterSpec[] = [
  // ── Histoire ──────────────────────────────────────────────────────────────
  {
    title: "L’histoire et les sources de l’histoire africaine",
    summary: "Définition et importance de l’histoire ; tradition orale, archéologie, linguistique.",
    strand: H,
    lessons: [
      {
        title: "Écrire l’histoire de l’Afrique",
        minutes: 12,
        body: `${liste([
            "l’histoire étudie le passé des sociétés humaines à partir de sources critiquées ;",
            "sources écrites (chroniques arabes, Tarikh es-Soudan, récits européens), mais aussi <strong>tradition orale</strong> conservée par les griots ;",
            "l’<strong>archéologie</strong> (fouilles, datation au carbone 14) et la <strong>linguistique</strong> (parentés entre les langues) complètent les textes.",
          ])}
          ${retenir("Pour l’histoire africaine, on croise toujours plusieurs types de sources.")}`,
      },
    ],
  },
  {
    title: "La préhistoire africaine et sénégalaise",
    summary: "L’Afrique berceau de l’humanité, paléolithique, révolution néolithique, préhistoire et protohistoire du Sénégal.",
    strand: H,
    lessons: [
      {
        title: "L’Afrique, berceau de l’humanité",
        minutes: 15,
        body: `${liste([
            "les plus anciens fossiles d’hominidés ont été découverts en Afrique (Toumaï au Tchad, Lucy en Éthiopie) ;",
            "au <strong>paléolithique</strong>, les hommes taillent la pierre, chassent, cueillent et maîtrisent le feu ;",
            "la <strong>révolution néolithique</strong> apporte l’agriculture, l’élevage, la poterie et la sédentarisation (Sahara vert).",
          ])}`,
      },
      {
        title: "Préhistoire et protohistoire du Sénégal",
        minutes: 12,
        body: `${liste([
            "outils paléolithiques et néolithiques trouvés dans la presqu’île du Cap-Vert et dans la vallée de la Falémé ;",
            "les amas coquilliers du Saloum et de Casamance témoignent d’une longue occupation du littoral ;",
            "les cercles mégalithiques de Sénégambie (Sine Ngayène, Wanar) sont inscrits au patrimoine mondial de l’UNESCO.",
          ])}`,
      },
    ],
  },
  {
    title: "Les civilisations de l’Afrique ancienne",
    summary: "L’Égypte pharaonique, Axoum, les relations entre la Méditerranée et le monde noir.",
    strand: H,
    lessons: [
      {
        title: "L’Égypte pharaonique et Axoum",
        minutes: 15,
        body: `${liste([
            "l’Égypte, née le long du Nil vers 3000 av. J.-C., est gouvernée par le pharaon, roi-dieu ;",
            "écriture hiéroglyphique, pyramides, astronomie, médecine, calendrier ;",
            "Cheikh Anta Diop a souligné la parenté de la civilisation égyptienne avec le reste de l’Afrique noire ;",
            "Axoum (Éthiopie) domine le commerce de la mer Rouge et adopte le christianisme au IV<sup>e</sup> siècle.",
          ])}
          ${retenir("Les échanges entre la Méditerranée et l’Afrique noire passent par le Nil, la mer Rouge et le Sahara.")}`,
      },
    ],
  },
  {
    title: "L’Afrique occidentale du VIIe au XVIIe siècle",
    summary: "Ghana, Mali, Songhaï ; l’islamisation ; les empires du Jolof et du Gaabu.",
    strand: H,
    lessons: [
      {
        title: "Les civilisations du Soudan médiéval",
        minutes: 15,
        body: `${tableau([
            ["Empire", "Période", "Repères"],
            ["Ghana", "jusqu’au XI<sup>e</sup> siècle", "Koumbi Saleh, or, commerce transsaharien"],
            ["Mali", "XIII<sup>e</sup>-XV<sup>e</sup> siècle", "Soundjata Keïta, Kankou Moussa, Tombouctou"],
            ["Songhaï", "XV<sup>e</sup>-XVI<sup>e</sup> siècle", "Gao, Sonni Ali Ber, Askia Mohammed, Tondibi (1591)"],
          ])}
          ${liste(["l’islam s’y diffuse par les commerçants et les lettrés, d’abord dans les villes et chez les rois ;", "il apporte l’écriture arabe, les universités (Sankoré) et des liens avec le monde musulman."])}`,
      },
      {
        title: "Les empires du Jolof et du Gaabu",
        minutes: 12,
        body: `${liste([
            "le Jolof, fondé selon la tradition par Ndiadiane Ndiaye, domine au XV<sup>e</sup> siècle les royaumes wolofs et sérères ;",
            "il se disloque après la bataille de Danki (vers 1549) ;",
            "le Gaabu, issu de l’empire du Mali, domine la Haute-Casamance et la Guinée-Bissau actuelle jusqu’en 1867 (Kansala).",
          ])}`,
      },
    ],
  },
  {
    title: "Les traites négrières",
    summary: "La traite arabe et la traite atlantique : origines, mécanismes, conséquences.",
    strand: H,
    lessons: [
      {
        title: "Traite arabe et traite atlantique",
        minutes: 15,
        body: `${liste([
            "la traite arabe, plus ancienne (dès le VII<sup>e</sup> siècle), passe par le Sahara, la mer Rouge et l’océan Indien ;",
            "la traite atlantique (XVI<sup>e</sup>-XIX<sup>e</sup> siècle) alimente les plantations d’Amérique par le commerce triangulaire ;",
            "conséquences en Afrique : saignée démographique, guerres, insécurité, recul des activités productives.",
          ])}
          ${retenir("Gorée et Saint-Louis furent des points de la traite au Sénégal.")}`,
      },
    ],
  },
  {
    title: "L’Afrique du XVIIIe siècle à la veille de l’impérialisme",
    summary: "La révolution torodo, l’empire d’El Hadji Omar, l’empire zoulou de Tchaka.",
    strand: H,
    lessons: [
      {
        title: "Révolutions et empires",
        minutes: 15,
        body: `${liste([
            "révolution torodo (1776) au Fouta Toro : les Denianké sont renversés, l’almamyat est instauré ;",
            "El Hadji Omar Tall lance son jihad en 1852 et fonde l’empire toucouleur (Ségou, Macina) ;",
            "Tchaka réforme l’armée zouloue et bâtit un puissant royaume en Afrique australe (1816-1828).",
          ])}`,
      },
    ],
  },
  {
    title: "L’Europe et l’Amérique de 1776 à 1870",
    summary: "La révolution américaine, la Révolution française de 1789, l’indépendance d’Haïti.",
    strand: H,
    lessons: [
      {
        title: "L’âge des révolutions",
        minutes: 15,
        body: `${tableau([
            ["Révolution", "Dates clés", "Idées et résultats"],
            ["américaine", "1776, 1783, 1787", "indépendance, république fédérale, Constitution"],
            ["française", "1789, 1792", "fin de la monarchie absolue, Déclaration des droits de l’homme"],
            ["haïtienne", "1791-1804", "révolte des esclaves (Toussaint Louverture), première république noire"],
          ])}`,
      },
    ],
  },
  {
    title: "Méthodes : dissertation et commentaire historique",
    summary: "Les activités de consolidation : techniques de la dissertation, du commentaire et du dossier.",
    strand: H,
    lessons: [
      {
        title: "Dissertation et commentaire",
        minutes: 15,
        body: `${methode([
            "Analyser le sujet ou le document (nature, auteur, date, contexte).",
            "Construire une problématique.",
            "Organiser un plan en parties avec des arguments datés et localisés.",
            "Conclure en répondant à la problématique.",
          ])}`,
      },
    ],
  },
  // ── Géographie ─────────────────────────────────────────────────────────────
  {
    title: "La Terre dans le système solaire",
    summary: "Les moyens de connaissance de l’Univers, les mouvements de la Terre, coordonnées géographiques.",
    strand: G,
    lessons: [
      {
        title: "Les mouvements de la Terre",
        minutes: 15,
        body: `${liste([
            "la Terre tourne sur elle-même en 24 h environ (rotation) : alternance du jour et de la nuit ;",
            "elle tourne autour du Soleil en 365 jours et 6 heures environ (révolution) ;",
            "l’inclinaison de son axe explique les saisons et l’inégale durée des jours ;",
            "un lieu est repéré par sa latitude (par rapport à l’équateur) et sa longitude (par rapport au méridien de Greenwich).",
          ])}
          ${exemple(["Dakar est à environ 14° 40’ de latitude nord et 17° 26’ de longitude ouest."])}`,
      },
    ],
  },
  {
    title: "Continents, océans et mers",
    summary: "La répartition des terres et des mers, les eaux marines et les courants.",
    strand: G,
    lessons: [
      {
        title: "Terres et mers",
        minutes: 12,
        body: `${liste([
            "les océans couvrent environ 71 % de la surface de la Terre ;",
            "cinq océans : Pacifique (le plus grand), Atlantique, Indien, Arctique, Austral ;",
            "les eaux marines sont salées et animées de courants : le courant froid des Canaries longe la côte sénégalaise ;",
            "les remontées d’eaux froides (upwelling) rendent ces côtes très poissonneuses.",
          ])}`,
      },
    ],
  },
  {
    title: "Les climats de la Terre",
    summary: "L’atmosphère, les facteurs et les éléments du climat, les grands types de climats.",
    strand: G,
    lessons: [
      {
        title: "Facteurs et éléments du climat",
        minutes: 15,
        body: `${liste([
            "éléments : température, précipitations, pression, vents, humidité ;",
            "facteurs : latitude, altitude, distance à la mer, courants marins, circulation atmosphérique ;",
            "au Sénégal, l’harmattan (sec, venu du Sahara) souffle en saison sèche ; la mousson (humide) apporte les pluies d’été.",
          ])}
          ${tableau([
            ["Zone", "Climats"],
            ["intertropicale", "équatorial, tropical, désertique"],
            ["tempérée", "océanique, continental, méditerranéen"],
            ["polaire", "polaire"],
          ])}`,
      },
    ],
  },
  {
    title: "Les reliefs de la Terre",
    summary: "Tectonique des plaques, roches, structures, érosion et formes de relief.",
    strand: G,
    lessons: [
      {
        title: "Formation et modelé des reliefs",
        minutes: 15,
        body: `${liste([
            "la lithosphère est découpée en plaques qui se déplacent : elles forment les chaînes de montagnes et provoquent séismes et volcans ;",
            "roches magmatiques, sédimentaires et métamorphiques ;",
            "grandes structures : socles anciens, bassins sédimentaires, chaînes récentes ;",
            "l’érosion (eau, vent, glace) façonne les reliefs : plaines, plateaux, montagnes.",
          ])}
          ${retenir("La coupe topographique représente le relief le long d’une ligne tracée sur une carte.")}`,
      },
    ],
  },
  {
    title: "Les grandes régions naturelles du globe",
    summary: "Régions intertropicales, tempérées et polaires ; montagnes et littoraux.",
    strand: G,
    lessons: [
      {
        title: "Des milieux variés",
        minutes: 15,
        body: `${liste([
            "régions intertropicales : forêt dense, savane, steppe, désert selon la durée de la saison sèche ;",
            "régions tempérées : forêts de feuillus et de conifères, prairies ;",
            "régions polaires : froid extrême, toundra, glaces ;",
            "montagnes et littoraux : milieux originaux, attractifs mais fragiles.",
          ])}`,
      },
    ],
  },
];
