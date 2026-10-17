// Histoire-géographie de 4e : programmes officiels mis en ligne par l’Office du Bac : histoire « le monde
// du XVIe au XIXe siècle » (24 leçons dont 5 activités de consolidation) et géographie « l’Afrique et le
// monde » (22 leçons). Leçons rédigées par DIANGAL, à faire valider par un professeur
// d’histoire-géographie.

import { type ChapterSpec, exemple, liste, methode, retenir, tableau } from "../tle/blocks";

const H = "Histoire";
const G = "Géographie";

export const HG_4E: ChapterSpec[] = [
  // ── Histoire ──────────────────────────────────────────────────────────────
  {
    title: "L’Afrique au XVIe siècle",
    summary: "L’arrivée des Européens, le déclin du commerce transsaharien et la réorientation du commerce.",
    strand: H,
    lessons: [
      {
        title: "De la caravane à la caravelle",
        minutes: 12,
        body: `${liste([
            "Au XV<sup>e</sup> siècle, les Portugais longent les côtes africaines : ils atteignent le Cap-Vert (1444), puis contournent le cap de Bonne-Espérance (Bartolomeu Dias, 1488) ;",
            "ils installent des comptoirs sur la côte et échangent tissus, armes et alcool contre or, ivoire, gomme et, de plus en plus, captifs ;",
            "le commerce transsaharien décline, surtout après la chute de l’empire Songhaï (Tondibi, 1591) ;",
            "le commerce se tourne vers l’Atlantique : les royaumes côtiers s’enrichissent, ceux de l’intérieur s’affaiblissent.",
          ])}
          ${retenir("Au XVI<sup>e</sup> siècle, le centre de gravité du commerce africain passe du Sahara à la côte atlantique.")}`,
      },
    ],
  },
  {
    title: "L’Asie et le Nouveau Monde au XVIe siècle",
    summary: "L’arrivée des Européens en Asie et en Amérique, leur implantation et leur organisation.",
    strand: H,
    lessons: [
      {
        title: "Les Européens en Asie et en Amérique",
        minutes: 12,
        body: `${liste([
            "Asie : les Portugais s’installent à Goa (1510), Malacca (1511) et Macao ; ils contrôlent le commerce des épices ;",
            "Amérique : les Espagnols conquièrent l’empire aztèque (Cortès, 1519-1521) et l’empire inca (Pizarro, 1532-1533) ; les Portugais occupent le Brésil (1500) ;",
            "les Amérindiens sont soumis au travail forcé ; guerres, épidémies et mauvais traitements les déciment ;",
            "pour remplacer cette main-d’œuvre, les colons font venir des captifs d’Afrique.",
          ])}
          ${retenir("La colonisation de l’Amérique est à l’origine de la traite négrière atlantique.")}`,
      },
    ],
  },
  {
    title: "La traite négrière : naissance, mécanisme et évolution",
    summary: "Les origines de la traite atlantique, le commerce triangulaire, son évolution du XVIe au XIXe siècle.",
    strand: H,
    lessons: [
      {
        title: "Le commerce triangulaire",
        minutes: 15,
        body: `${tableau([
            ["Étape", "Trajet", "Marchandises"],
            ["1", "Europe → Afrique", "tissus, armes, alcool, pacotille"],
            ["2", "Afrique → Amérique", "captifs africains"],
            ["3", "Amérique → Europe", "sucre, café, coton, tabac"],
          ])}
          ${liste([
            "la traite atlantique dure du XVI<sup>e</sup> au XIX<sup>e</sup> siècle ; plus de 12 millions d’Africains sont embarqués ;",
            "la traversée (le « passage du milieu ») est meurtrière : entassement, maladies, révoltes réprimées ;",
            "en Amérique, les captifs travaillent dans les plantations comme esclaves.",
          ])}`,
      },
    ],
  },
  {
    title: "Les conséquences de la traite négrière",
    summary: "Les conséquences en Afrique, en Europe, en Amérique et en Asie.",
    strand: H,
    lessons: [
      {
        title: "Un bilan très lourd pour l’Afrique",
        minutes: 15,
        body: `${tableau([
            ["Région", "Conséquences"],
            ["Afrique", "perte de millions de jeunes, guerres et razzias, insécurité, recul de l’agriculture et de l’artisanat"],
            ["Europe", "enrichissement des ports et des armateurs (Nantes, Bordeaux, Liverpool), capitaux pour l’industrie"],
            ["Amérique", "développement des plantations, peuplement d’origine africaine, cultures afro-américaines"],
          ])}
          ${retenir("La traite a affaibli durablement l’Afrique et préparé sa domination par l’Europe.")}`,
      },
    ],
  },
  {
    title: "La traite au Sénégal et le mouvement abolitionniste",
    summary: "Les comptoirs de la Sénégambie, Gorée ; l’abolition de la traite et de l’esclavage.",
    strand: H,
    lessons: [
      {
        title: "La traite au Sénégal",
        minutes: 12,
        body: `${liste([
            "les Européens s’installent à Gorée, à Saint-Louis (fondé en 1659), à Rufisque, Portudal et Joal ;",
            "des compagnies de commerce (Compagnie du Sénégal) échangent captifs, gomme et or contre armes et marchandises ;",
            "dans le Kayor, le Baol ou le Waalo, les guerres et les razzias de captifs se multiplient.",
          ])}
          ${retenir("La Maison des esclaves de Gorée, inscrite au patrimoine mondial de l’UNESCO avec l’île (1978), est un lieu de mémoire de la traite.")}`,
      },
      {
        title: "Le mouvement abolitionniste",
        minutes: 12,
        body: `${liste([
            "au XVIII<sup>e</sup> siècle, des philosophes, des religieux et d’anciens esclaves dénoncent la traite ;",
            "révoltes d’esclaves : Saint-Domingue devient indépendant sous le nom d’Haïti (1804) ;",
            "la Grande-Bretagne interdit la traite en 1807 ; la France abolit l’esclavage en 1794, le rétablit en 1802, puis l’abolit définitivement en 1848 (Victor Schœlcher) ;",
            "aux États-Unis, l’esclavage est aboli en 1865.",
          ])}`,
      },
    ],
  },
  {
    title: "La Sénégambie : dislocation du Jolof et nouveaux royaumes",
    summary: "La bataille de Danki, l’émancipation du Kayor et des autres royaumes.",
    strand: H,
    lessons: [
      {
        title: "La fin de l’empire du Jolof",
        minutes: 12,
        body: `${liste([
            "au XVI<sup>e</sup> siècle, l’empire du Jolof domine le Waalo, le Kayor, le Baol, le Sine et le Saloum ;",
            "l’arrivée des Portugais sur la côte enrichit les provinces côtières, qui supportent mal l’autorité du Bourba Jolof ;",
            "à la bataille de Danki (vers 1549), Amary Ngoné Sobel Fall bat le Bourba : le Kayor devient indépendant ;",
            "les autres royaumes s’émancipent à leur tour.",
          ])}
          ${tableau([
            ["Royaume", "Titre du souverain"],
            ["Kayor", "Damel"],
            ["Baol", "Teigne"],
            ["Waalo", "Brak"],
            ["Sine, Saloum", "Bour"],
          ])}`,
      },
    ],
  },
  {
    title: "Le Fouta et les héritiers du Gaabu",
    summary: "Le Fouta du XVIIe au XIXe siècle ; le Fouladou, les entités mandingues et diolas.",
    strand: H,
    lessons: [
      {
        title: "Le Fouta Toro",
        minutes: 12,
        body: `${liste([
            "au XVI<sup>e</sup> siècle, Koli Tenguella fonde la dynastie des Denianké ;",
            "en 1776, une révolution musulmane dirigée par Thierno Souleymane Baal renverse les Denianké et instaure l’<strong>almamyat</strong> ;",
            "l’almamy Abdoul Kader Kane est le premier souverain du nouveau régime.",
          ])}
          ${retenir("L’almamy est à la fois chef politique et religieux.")}`,
      },
      {
        title: "Après le Gaabu",
        minutes: 12,
        body: `${liste([
            "le Gaabu, royaume mandingue, décline au XIX<sup>e</sup> siècle ; sa capitale Kansala tombe en 1867 devant les Peuls du Fouta-Djallon ;",
            "Alfa Molo fonde alors le royaume peul du Fouladou ;",
            "en Casamance, les sociétés diolas, sans État centralisé, s’organisent autour des villages, de la riziculture et des bois sacrés ; des rois-prêtres (comme à Oussouye) ont un rôle religieux.",
          ])}
          ${retenir("L’espace sénégambien présente une grande diversité d’organisations politiques et sociales.")}`,
      },
    ],
  },
  {
    title: "Les empires peuls du Sokoto et du Macina",
    summary: "Les révolutions musulmanes peules du XIXe siècle en Afrique occidentale.",
    strand: H,
    lessons: [
      {
        title: "Sokoto et Macina",
        minutes: 12,
        body: `${liste([
            "Ousmane dan Fodio lance en 1804 un jihad contre les rois haoussas ; il fonde le califat de Sokoto (dans l’actuel Nigeria) ;",
            "Sékou Amadou (Cheikhou Amadou) fonde la Diina du Macina (1818) avec pour capitale Hamdallahi ;",
            "ces États appliquent la loi islamique et développent l’enseignement coranique.",
          ])}
          ${retenir("Au XIX<sup>e</sup> siècle, l’islam devient une force politique qui fonde de nouveaux États.")}`,
      },
    ],
  },
  {
    title: "L’empire toucouleur d’El Hadji Omar Tall",
    summary: "La formation et l’organisation de l’empire d’El Hadji Omar.",
    strand: H,
    lessons: [
      {
        title: "El Hadji Omar et son empire",
        minutes: 12,
        body: `${liste([
            "né vers 1796 à Halwar (Fouta Toro), El Hadji Omar Tall accomplit le pèlerinage et devient un chef de la confrérie tidiane ;",
            "il lance un jihad en 1852 ; il se heurte aux Français de Faidherbe au siège de Médine (1857) ;",
            "il conquiert Ségou (1861) et le Macina (1862) ;",
            "il meurt en 1864 dans les falaises de Bandiagara ; son fils Ahmadou lui succède.",
          ])}
          ${retenir("L’empire toucouleur résistera à la conquête française jusqu’en 1893.")}`,
      },
    ],
  },
  {
    title: "Tchaka et les Zoulous ; Madagascar",
    summary: "Le mouvement zoulou en Afrique australe ; les royaumes de Madagascar.",
    strand: H,
    lessons: [
      {
        title: "Tchaka et le mouvement zoulou",
        minutes: 12,
        body: `${liste([
            "vers 1816, Tchaka devient roi des Zoulous ;",
            "il réforme l’armée : régiments disciplinés, lance courte, tactique en « cornes de buffle » ;",
            "ses conquêtes provoquent de grands déplacements de populations (le Mfecane) ;",
            "il est assassiné en 1828.",
          ])}`,
      },
      {
        title: "Madagascar",
        minutes: 12,
        body: `${liste([
            "plusieurs royaumes se forment : Sakalava à l’ouest, Betsimisaraka à l’est, Merina sur les hauts plateaux ;",
            "Andrianampoinimerina unifie le royaume merina à la fin du XVIII<sup>e</sup> siècle ;",
            "son fils Radama I<sup>er</sup> étend le royaume à une grande partie de l’île.",
          ])}
          ${retenir("Le royaume merina, avec Tananarive pour capitale, domine Madagascar au XIX<sup>e</sup> siècle.")}`,
      },
    ],
  },
  {
    title: "La première révolution industrielle",
    summary: "Les transformations techniques, économiques et sociales en Europe.",
    strand: H,
    lessons: [
      {
        title: "Une révolution des techniques et des sociétés",
        minutes: 15,
        body: `${liste([
            "elle commence en Grande-Bretagne à la fin du XVIII<sup>e</sup> siècle ;",
            "techniques : machine à vapeur (James Watt), charbon, fer, métiers à tisser mécaniques, chemin de fer (1825-1830) ;",
            "économie : usines, production en grande quantité, banques, capitalisme ;",
            "société : exode rural, croissance des villes, naissance de la classe ouvrière (le prolétariat) et de la bourgeoisie industrielle.",
          ])}
          ${retenir("Les ouvriers travaillent longtemps pour de faibles salaires ; les enfants aussi sont employés.")}`,
      },
    ],
  },
  {
    title: "Les Lumières et la Révolution française",
    summary: "Le mouvement des idées au XVIIIe siècle ; la Révolution de 1789 et ses conséquences.",
    strand: H,
    lessons: [
      {
        title: "Les Lumières",
        minutes: 12,
        body: `${liste([
            "au XVIII<sup>e</sup> siècle, des philosophes défendent la raison, la liberté et l’égalité ;",
            "Montesquieu : séparation des pouvoirs (<em>De l’esprit des lois</em>, 1748) ; Rousseau : souveraineté du peuple (<em>Du contrat social</em>, 1762) ; Voltaire : tolérance ;",
            "Diderot et d’Alembert diffusent les savoirs dans l’<em>Encyclopédie</em>.",
          ])}`,
      },
      {
        title: "La Révolution française",
        minutes: 15,
        body: `${tableau([
            ["Date", "Événement"],
            ["14 juillet 1789", "prise de la Bastille"],
            ["4 août 1789", "abolition des privilèges"],
            ["26 août 1789", "Déclaration des droits de l’homme et du citoyen"],
            ["1792", "proclamation de la République"],
          ])}
          ${retenir("La Révolution met fin à la monarchie absolue et à la société d’ordres ; ses idées se répandent en Europe et dans le monde.")}`,
      },
    ],
  },
  {
    title: "La naissance des États-Unis et l’Empire ottoman",
    summary: "L’indépendance des treize colonies ; l’Empire ottoman du XVIIe au XIXe siècle.",
    strand: H,
    lessons: [
      {
        title: "La naissance des États-Unis",
        minutes: 12,
        body: `${liste([
            "les treize colonies anglaises d’Amérique du Nord refusent les taxes imposées par Londres ;",
            "le 4 juillet 1776, elles proclament leur indépendance ; George Washington dirige la guerre, avec l’aide de la France ;",
            "l’Angleterre reconnaît l’indépendance en 1783 ; la Constitution de 1787 crée une république fédérale ;",
            "George Washington devient le premier président (1789).",
          ])}`,
      },
      {
        title: "L’Empire ottoman",
        minutes: 12,
        body: `${liste([
            "les Ottomans prennent Constantinople en 1453, qui devient Istanbul ;",
            "l’empire atteint son apogée au XVI<sup>e</sup> siècle (Soliman le Magnifique) ;",
            "il recule ensuite : échec devant Vienne (1683), indépendance de la Grèce (1830) ;",
            "au XIX<sup>e</sup> siècle, on l’appelle « l’homme malade de l’Europe ».",
          ])}`,
      },
    ],
  },
  {
    title: "Méthodes : dissertation et commentaire de document",
    summary: "Les activités de consolidation : initiation à la dissertation et au commentaire de documents.",
    strand: H,
    lessons: [
      {
        title: "Rédiger une dissertation historique",
        minutes: 15,
        body: `${methode([
            "Analyser le sujet : mots clés, dates, lieux.",
            "Introduction : présenter le sujet, poser le problème, annoncer le plan.",
            "Développement : deux ou trois parties, chacune avec des idées, des exemples et des dates.",
            "Conclusion : répondre au problème et ouvrir sur une autre question.",
          ])}`,
      },
      {
        title: "Commenter un document",
        minutes: 12,
        body: `${methode([
            "Présenter le document : nature, auteur, date, source.",
            "Dégager l’idée principale.",
            "Expliquer en s’appuyant sur ses connaissances.",
            "Montrer l’intérêt et les limites du document.",
          ])}
          ${retenir("On ne paraphrase pas : on explique.")}`,
      },
    ],
  },
  // ── Géographie ─────────────────────────────────────────────────────────────
  {
    title: "L’Afrique de l’Ouest : développement et intégration",
    summary: "Situation, atouts et contraintes du développement, organisations d’intégration.",
    strand: G,
    lessons: [
      {
        title: "Situation et problèmes de développement",
        minutes: 12,
        body: `${liste([
            "l’Afrique de l’Ouest s’étend du Sahara au golfe de Guinée et de l’Atlantique au lac Tchad ;",
            "atouts : population jeune, ressources agricoles, minières (or, phosphates, pétrole, gaz) et halieutiques ;",
            "contraintes : sécheresses, pauvreté, faible industrialisation, dette, insécurité dans le Sahel.",
          ])}`,
      },
      {
        title: "L’intégration régionale",
        minutes: 12,
        body: `${liste([
            "la CEDEAO (1975) vise la libre circulation des personnes et des biens ; en 2025, le Mali, le Burkina Faso et le Niger l’ont quittée pour former l’Alliance des États du Sahel ;",
            "l’UEMOA regroupe huit États qui utilisent le franc CFA ;",
            "obstacles : routes insuffisantes, tracasseries aux frontières, monnaies différentes, crises politiques.",
          ])}
          ${retenir("L’intégration permet de former un marché plus grand et de mieux peser dans le monde.")}`,
      },
    ],
  },
  {
    title: "L’Afrique : milieux, population et développement",
    summary: "Diversité physique et humaine, pauvreté et dépendance, coopération internationale.",
    strand: G,
    lessons: [
      {
        title: "La diversité physique et humaine",
        minutes: 15,
        body: `${liste([
            "continent de plus de 30 millions de km² et de 54 États ;",
            "relief : plateaux, hautes terres de l’Est (Kilimandjaro, environ 5 895 m) ; grands fleuves : Nil, Congo, Niger ;",
            "climats et paysages organisés de part et d’autre de l’équateur : forêt dense, savane, steppe, désert (Sahara) ;",
            "plus de 1,4 milliard d’habitants, la population la plus jeune du monde ; forte croissance urbaine.",
          ])}`,
      },
      {
        title: "Pauvreté, dépendance et coopération",
        minutes: 15,
        body: `${liste([
            "pauvreté : faibles revenus, accès difficile à l’eau, à la santé, à l’école ;",
            "dépendance : exportation de matières premières brutes, importation de produits fabriqués et de nourriture, dette ;",
            "coopération : bilatérale (entre deux États) ou multilatérale (ONU, Banque mondiale, Union européenne) ; l’Union africaine (2002) et la Zone de libre-échange continentale africaine encouragent les échanges entre Africains.",
          ])}
          ${retenir("Transformer sur place ses matières premières aide à réduire la dépendance.")}`,
      },
    ],
  },
  {
    title: "L’Europe",
    summary: "Situation, relief et climat, population, intégration européenne.",
    strand: G,
    lessons: [
      {
        title: "Un continent intégré",
        minutes: 15,
        body: `${liste([
            "petit continent (environ 10 millions de km²) très découpé ; grande plaine au nord, montagnes jeunes au sud (Alpes) ;",
            "climats : océanique à l’ouest, continental à l’est, méditerranéen au sud ;",
            "population nombreuse, urbaine et vieillissante ; forte immigration ;",
            "l’Union européenne compte 27 États ; plus de vingt d’entre eux utilisent l’euro.",
          ])}
          ${retenir("De fortes disparités subsistent entre l’Europe de l’Ouest, riche, et certains pays de l’Est.")}`,
      },
    ],
  },
  {
    title: "L’Amérique",
    summary: "Unités naturelles, diversité des peuples, disparités et intégration.",
    strand: G,
    lessons: [
      {
        title: "Un continent de contrastes",
        minutes: 15,
        body: `${liste([
            "à l’ouest, de hautes montagnes (Rocheuses, Andes) ; au centre, de grandes plaines et de grands fleuves (Mississippi, Amazone) ;",
            "peuples : Amérindiens, descendants d’Européens et d’Africains déportés par la traite, métis ;",
            "fortes disparités : les États-Unis et le Canada sont riches ; Haïti est très pauvre ;",
            "intégration : accord États-Unis–Mexique–Canada, Mercosur en Amérique du Sud.",
          ])}`,
      },
    ],
  },
  {
    title: "L’Asie",
    summary: "Contrastes naturels, populations, disparités et intégration.",
    strand: G,
    lessons: [
      {
        title: "Le continent le plus peuplé",
        minutes: 15,
        body: `${liste([
            "plus grand continent ; l’Himalaya porte le plus haut sommet du monde (Everest, environ 8 849 m) ;",
            "contrastes : froid de la Sibérie, déserts d’Arabie et de Gobi, climat de mousson au sud et au sud-est ;",
            "environ 60 % de l’humanité ; l’Inde et la Chine dépassent chacune 1,4 milliard d’habitants ;",
            "disparités : Japon, Corée du Sud, Chine et pays du Golfe puissants ; Afghanistan ou Bangladesh pauvres ; l’ASEAN unit l’Asie du Sud-Est.",
          ])}`,
      },
    ],
  },
  {
    title: "L’Océanie",
    summary: "Situation, disparités et intégration.",
    strand: G,
    lessons: [
      {
        title: "Un continent d’îles",
        minutes: 12,
        body: `${liste([
            "l’Australie, la Nouvelle-Zélande et des milliers d’îles du Pacifique (Mélanésie, Micronésie, Polynésie) ;",
            "peu peuplée (environ 45 millions d’habitants) ;",
            "l’Australie et la Nouvelle-Zélande sont riches (mines, élevage, services) ; beaucoup de petites îles dépendent de l’aide et sont menacées par la montée des eaux ;",
            "le Forum des îles du Pacifique favorise la coopération.",
          ])}
          ${exemple(["L’Australie exporte du fer et du charbon, surtout vers l’Asie."])}`,
      },
    ],
  },
];
