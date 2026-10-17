// Éducation à la science et à la vie sociale (ESVS) du CM2 : découverte du monde (histoire,
// géographie, initiation scientifique et technologique) et éducation au développement durable (vivre
// ensemble, vivre dans son milieu), les sous-domaines évalués au CFEE d’après le guide officiel du
// CFEE (MEN). Les notions d’IST, de vivre ensemble et de vivre dans son milieu reprennent les leçons de
// CM2 de PROMET ; celles d’histoire et de géographie sont INDICATIVES (programme officiel détaillé de
// l’étape 3 non trouvé). Leçons rédigées par DIANGAL, à faire valider par des enseignants.

import { type ChapterSpec, exemple, liste, retenir, tableau } from "./blocks";

const HIST = "Histoire";
const GEO = "Géographie";
const IST = "Initiation scientifique et technologique";
const VE = "Vivre ensemble";
const VM = "Vivre dans son milieu";

export const ESVS_CM2: ChapterSpec[] = [
  // ── Histoire ──────────────────────────────────────────────────────────────
  {
    title: "Les grands empires du Soudan occidental",
    summary: "Les empires du Ghana, du Mali et du Songhaï.",
    strand: HIST,
    lessons: [
      {
        title: "Les empires du Ghana, du Mali et du Songhaï",
        minutes: 15,
        body: `${tableau([
            ["Empire", "Repères", "Grands personnages"],
            ["Ghana (Wagadou)", "riche grâce au commerce de l’or ; capitale Koumbi Saleh ; affaibli par les Almoravides au XI<sup>e</sup> siècle", "les Kaya Maghan, rois « maîtres de l’or »"],
            ["Mali", "fondé après la bataille de Kirina (vers 1235) ; charte du Kouroukan Fouga", "Soundjata Keïta ; Kankou Moussa, célèbre pour son pèlerinage à La Mecque (1324)"],
            ["Songhaï", "capitale Gao ; très vaste ; détruit par l’armée marocaine à Tondibi (1591)", "Sonni Ali Ber ; Askia Mohammed"],
          ])}
          ${retenir("Ces empires s’enrichissaient grâce au commerce transsaharien : l’or et les esclaves partaient vers le nord, le sel, les tissus et les chevaux venaient du nord. Tombouctou et Djenné étaient de grands centres de savoir.")}`,
      },
    ],
  },
  {
    title: "Les royaumes du Sénégal",
    summary: "Le Tékrour, le Djolof, le Cayor, le Baol, le Walo, le Sine, le Saloum et le Gabou.",
    strand: HIST,
    lessons: [
      {
        title: "Le Tékrour et l’empire du Djolof",
        minutes: 12,
        body: `${liste([
            "le <strong>Tékrour</strong>, dans la vallée du fleuve Sénégal, est l’un des plus anciens royaumes ; son roi War Jaabi se convertit à l’islam au XI<sup>e</sup> siècle ;",
            "l’empire du <strong>Djolof</strong> est fondé par Ndiadiane Ndiaye ; son roi porte le titre de Bourba ; il domine le Walo, le Cayor, le Baol, le Sine et le Saloum.",
          ])}
          ${retenir("Au XVI<sup>e</sup> siècle, le Djolof éclate : après la bataille de Danki (vers 1549), Amary Ngoné Sobel Fall rend le Cayor indépendant.")}`,
      },
      {
        title: "Les royaumes issus du Djolof et le Gabou",
        minutes: 12,
        body: `${tableau([
            ["Royaume", "Titre du roi"],
            ["Cayor", "Damel"],
            ["Baol", "Teigne"],
            ["Walo", "Brak"],
            ["Sine", "Bour Sine"],
            ["Saloum", "Bour Saloum"],
            ["Gabou (au sud)", "Mansa"],
          ])}
          ${retenir("Ces royaumes avaient une organisation sociale hiérarchisée et des conseils de dignitaires. Le Gabou, royaume mandingue, prend fin en 1867 avec la chute de Kansala.")}`,
      },
    ],
  },
  {
    title: "La traite négrière",
    summary: "La traite atlantique, Gorée et les conséquences de la traite.",
    strand: HIST,
    lessons: [
      {
        title: "La traite atlantique et ses conséquences",
        minutes: 15,
        body: `<p>Du XVI<sup>e</sup> au XIX<sup>e</sup> siècle, des millions d’Africains ont été capturés, vendus et déportés vers l’Amérique, où ils travaillaient comme esclaves dans les plantations.</p>
          ${liste([
            "le <strong>commerce triangulaire</strong> : les navires partaient d’Europe avec des marchandises, achetaient des captifs en Afrique et revenaient d’Amérique avec du sucre, du coton, du café ;",
            "au Sénégal, Gorée et Saint-Louis étaient des comptoirs de traite ; la Maison des esclaves de Gorée est un lieu de mémoire inscrit au patrimoine mondial ;",
            "conséquences : guerres et razzias, dépeuplement, ruine de l’agriculture et de l’artisanat, souffrances immenses.",
          ])}
          ${retenir("La France abolit définitivement l’esclavage en 1848.")}`,
      },
    ],
  },
  {
    title: "La conquête coloniale et les résistances",
    summary: "La conquête du Sénégal et les grands résistants.",
    strand: HIST,
    lessons: [
      {
        title: "La conquête coloniale",
        minutes: 12,
        body: `<p>Au XIX<sup>e</sup> siècle, la France conquiert le Sénégal à partir de Saint-Louis. Le gouverneur <strong>Louis Faidherbe</strong> (à partir de 1854) mène la conquête : postes militaires, routes, culture de l’arachide.</p>
          ${retenir("La construction du chemin de fer Dakar–Saint-Louis (achevé en 1885) servait à transporter l’arachide et les troupes ; elle a provoqué la résistance de Lat Dior.")}`,
      },
      {
        title: "Les résistants",
        minutes: 15,
        body: `${tableau([
            ["Résistant", "Région", "Ce qu’il faut retenir"],
            ["Lat Dior Ngoné Latyr Diop", "Cayor", "s’oppose au chemin de fer ; meurt au combat à Dékheulé (1886)"],
            ["El Hadji Omar Tall", "Fouta, Haut-Sénégal", "assiège Médine (1857) ; fonde un empire au Soudan"],
            ["Maba Diakhou Bâ", "Rip, Saloum", "meurt à la bataille de Somb (1867)"],
            ["Alboury Ndiaye", "Djolof", "dernier Bourba ; meurt en exil (1901)"],
            ["Mamadou Lamine Dramé", "Haut-Sénégal", "mène la résistance soninké (1885-1887)"],
            ["Cheikh Ahmadou Bamba", "Baol", "résistance pacifique ; exilé au Gabon (1895-1902)"],
            ["Aline Sitoé Diatta", "Casamance", "refuse les réquisitions ; arrêtée en 1943, morte en exil"],
          ])}
          ${retenir("La résistance a pris des formes armées, religieuses ou pacifiques. Ces héros sont honorés aujourd’hui : lycées, rues et monuments portent leurs noms.")}`,
      },
    ],
  },
  {
    title: "De la colonisation à l’indépendance du Sénégal",
    summary: "L’AOF, les Quatre communes, les tirailleurs, l’indépendance et les présidents du Sénégal.",
    strand: HIST,
    lessons: [
      {
        title: "Le Sénégal colonial",
        minutes: 12,
        body: `${liste([
            "1895 : création de l’Afrique-Occidentale française (AOF) ; Dakar en devient la capitale en 1902 ;",
            "les habitants des <strong>Quatre communes</strong> (Saint-Louis, Gorée, Rufisque, Dakar) avaient des droits de citoyens ;",
            "1914 : Blaise Diagne est le premier Africain élu député à l’Assemblée nationale française ;",
            "les <strong>tirailleurs sénégalais</strong> ont combattu pendant les deux guerres mondiales ; le 1<sup>er</sup> décembre 1944, des tirailleurs qui réclamaient leur dû sont massacrés à Thiaroye.",
          ])}
          ${retenir("La colonisation a imposé le travail forcé, l’impôt de capitation et la culture de l’arachide pour l’exportation.")}`,
      },
      {
        title: "L’indépendance et le Sénégal indépendant",
        minutes: 12,
        body: `<p>En 1959, le Sénégal et le Soudan français forment la Fédération du Mali, indépendante le 20 juin 1960. Elle éclate le 20 août 1960. Le Sénégal célèbre sa fête de l’indépendance le <strong>4 avril</strong>.</p>
          ${tableau([
            ["Président de la République", "Période"],
            ["Léopold Sédar Senghor", "1960-1980"],
            ["Abdou Diouf", "1981-2000"],
            ["Abdoulaye Wade", "2000-2012"],
            ["Macky Sall", "2012-2024"],
            ["Bassirou Diomaye Faye", "depuis 2024"],
          ])}
          ${retenir("Le Sénégal est une démocratie : les présidents se succèdent par des élections.")}`,
      },
    ],
  },
  // ── Géographie ────────────────────────────────────────────────────────────
  {
    title: "Le Sénégal : situation et milieu physique",
    summary: "Situation, frontières, relief, climat, cours d’eau et végétation du Sénégal.",
    strand: GEO,
    lessons: [
      {
        title: "Situation, frontières et relief",
        minutes: 12,
        body: `<p>Le Sénégal est situé à l’extrême ouest de l’Afrique ; la pointe des Almadies, à Dakar, est le point le plus occidental du continent. Sa superficie est de 196 722 km².</p>
          ${tableau([
            ["Direction", "Voisin"],
            ["nord", "Mauritanie"],
            ["est", "Mali"],
            ["sud", "Guinée et Guinée-Bissau"],
            ["ouest", "océan Atlantique"],
          ])}
          ${retenir("La Gambie est enclavée dans le Sénégal, le long du fleuve Gambie. Le relief est plat ; les terrains les plus élevés (environ 600 m) sont au sud-est, près des contreforts du Fouta-Djalon.")}`,
      },
      {
        title: "Climat, cours d’eau et végétation",
        minutes: 15,
        body: `${liste([
            "deux saisons : la saison des pluies ou <strong>hivernage</strong> (de juin-juillet à octobre) et la saison sèche ;",
            "il pleut de moins en moins du sud (Casamance, plus de 1 000 mm par an) vers le nord (moins de 300 mm) ;",
            "vents : alizé maritime (frais et humide), harmattan (chaud et sec, venu du Sahara), mousson (apporte la pluie).",
          ])}
          ${tableau([
            ["Fleuve", "Ce qu’il faut savoir"],
            ["Sénégal", "frontière avec la Mauritanie ; barrages de Diama et de Manantali"],
            ["Gambie", "traverse le parc du Niokolo-Koba et la Gambie"],
            ["Casamance", "arrose le sud du pays"],
            ["Saloum", "estuaire avec des îles et des mangroves (delta du Saloum)"],
          ])}
          ${retenir("Végétation : steppe au nord, savane au centre, forêt claire au sud, mangrove dans les estuaires.")}`,
      },
    ],
  },
  {
    title: "La population et les régions du Sénégal",
    summary: "Population, répartition, régions administratives et villes.",
    strand: GEO,
    lessons: [
      {
        title: "La population et les régions",
        minutes: 15,
        body: `<p>Le Sénégal compte environ <strong>18 millions d’habitants</strong> (recensement de 2023). La population est jeune et inégalement répartie : elle se concentre à l’ouest, surtout dans la région de Dakar, très peuplée sur une petite surface ; l’est est peu peuplé.</p>
          ${tableau([
            ["Les 14 régions du Sénégal", ""],
            ["Dakar, Thiès, Diourbel, Fatick, Kaolack", "Kaffrine, Louga, Saint-Louis, Matam"],
            ["Tambacounda, Kédougou, Kolda", "Sédhiou, Ziguinchor"],
          ])}
          ${liste([
            "principales ethnies : Wolof, Pulaar (Peuls et Toucouleurs), Sérères, Diolas, Mandingues, Soninkés… ;",
            "l’exode rural pousse les jeunes vers les villes ; certains émigrent à l’étranger.",
          ])}
          ${retenir("Chaque région a un chef-lieu qui porte en général son nom ; la capitale du pays est Dakar.")}`,
      },
    ],
  },
  {
    title: "Les activités économiques du Sénégal",
    summary: "Agriculture, élevage, pêche, mines, industrie, commerce, transports et tourisme.",
    strand: GEO,
    lessons: [
      {
        title: "Agriculture, élevage et pêche",
        minutes: 12,
        body: `${tableau([
            ["Activité", "Productions et zones"],
            ["agriculture", "arachide et mil (bassin arachidier), riz (vallée du fleuve, Casamance), coton (sud-est), légumes (Niayes)"],
            ["élevage", "bovins, ovins, caprins ; surtout dans le Ferlo ; la Tabaski augmente la demande de moutons"],
            ["pêche", "artisanale (pirogues de Kayar, Joal, Mbour, Saint-Louis) et industrielle ; le poisson est la première exportation"],
          ])}
          ${retenir("L’agriculture dépend des pluies : une mauvaise saison des pluies entraîne de mauvaises récoltes.")}`,
      },
      {
        title: "Mines, industrie, commerce et services",
        minutes: 12,
        body: `${liste([
            "<strong>mines</strong> : phosphates (Taïba), or (Sabodala), zircon ; le pays produit aussi du pétrole et du gaz depuis 2024 ;",
            "<strong>industries</strong> : huileries, industries chimiques, cimenteries, agroalimentaire ;",
            "<strong>transports</strong> : port de Dakar, aéroport international Blaise Diagne, routes et autoroutes, Train express régional (TER) ;",
            "<strong>tourisme</strong> : Saly, Cap Skirring, Saint-Louis, Gorée, delta du Saloum.",
          ])}
          ${retenir("Le Sénégal importe beaucoup (riz, pétrole raffiné, machines) : produire et transformer sur place crée des emplois.")}`,
      },
    ],
  },
  {
    title: "L’Afrique et le monde",
    summary: "Continents et océans, l’Afrique et ses organisations.",
    strand: GEO,
    lessons: [
      {
        title: "Les continents, les océans et l’Afrique",
        minutes: 15,
        body: `${liste([
            "les continents : Afrique, Amérique, Asie, Europe, Océanie (et l’Antarctique) ;",
            "les océans : Atlantique, Pacifique, Indien, Arctique, Austral ;",
            "l’Afrique compte 54 pays ; on y trouve le plus grand désert chaud (Sahara), le plus long fleuve (le Nil) et le Kilimandjaro (5 895 m), son plus haut sommet.",
          ])}
          ${tableau([
            ["Organisation", "Rôle"],
            ["Union africaine (UA)", "union des pays africains ; elle a remplacé l’OUA (créée en 1963)"],
            ["CEDEAO", "Communauté économique des États de l’Afrique de l’Ouest (1975)"],
            ["UEMOA", "union économique et monétaire ouest-africaine (franc CFA)"],
          ])}
          ${retenir("Le Sénégal fait partie de l’Afrique de l’Ouest, de la CEDEAO et de l’UEMOA.")}`,
      },
    ],
  },
  // ── Initiation scientifique et technologique ─────────────────────────────
  {
    title: "La digestion et la nutrition",
    summary: "L’appareil digestif et la transformation des aliments.",
    strand: IST,
    lessons: [
      {
        title: "L’appareil digestif et la digestion",
        minutes: 15,
        body: `${tableau([
            ["Organe", "Rôle"],
            ["bouche (dents, salive)", "broie les aliments ; la salive commence la digestion de l’amidon"],
            ["œsophage", "conduit les aliments vers l’estomac"],
            ["estomac", "brasse les aliments avec le suc gastrique"],
            ["intestin grêle", "termine la digestion (bile du foie, suc du pancréas) ; les nutriments passent dans le sang (absorption)"],
            ["gros intestin", "réabsorbe l’eau ; forme les excréments"],
          ])}
          ${retenir("La digestion transforme les aliments en nutriments assez petits pour passer dans le sang, qui les apporte à tout le corps.")}
          ${exemple(["Mâche bien, mange à heures régulières et lave-toi les mains avant de manger : c’est l’hygiène de la digestion."])}`,
      },
    ],
  },
  {
    title: "La respiration et la circulation",
    summary: "L’appareil respiratoire, les échanges gazeux, le cœur et la circulation sanguine.",
    strand: IST,
    lessons: [
      {
        title: "La respiration",
        minutes: 12,
        body: `<p>L’air entre par le nez ou la bouche, passe dans la trachée, les bronches, puis arrive dans les <strong>poumons</strong>, jusqu’aux alvéoles pulmonaires.</p>
          ${liste([
            "<strong>inspiration</strong> : la cage thoracique s’agrandit, l’air entre ;",
            "<strong>expiration</strong> : elle se resserre, l’air sort ;",
            "dans les alvéoles, le sang prend le dioxygène de l’air et rejette le dioxyde de carbone.",
          ])}
          ${retenir("Le tabac, la fumée du bois et les poussières abîment les poumons. Faire du sport améliore la respiration.")}`,
      },
      {
        title: "Le cœur et la circulation du sang",
        minutes: 12,
        body: `<p>Le <strong>cœur</strong> est un muscle qui fonctionne comme une pompe : il envoie le sang dans tout le corps par les <strong>artères</strong> ; le sang revient au cœur par les <strong>veines</strong>.</p>
          ${liste([
            "le sang transporte le dioxygène et les nutriments vers les organes ;",
            "il ramène le dioxyde de carbone vers les poumons et les déchets vers les reins.",
          ])}
          ${exemple(["Après une course, le cœur bat plus vite : les muscles ont besoin de plus de dioxygène."])}`,
      },
    ],
  },
  {
    title: "Les êtres vivants et leurs milieux",
    summary: "Êtres du milieu terrestre et du milieu aquatique, adaptations et chaînes alimentaires.",
    strand: IST,
    lessons: [
      {
        title: "Milieu terrestre et milieu aquatique",
        minutes: 12,
        body: `${tableau([
            ["", "Milieu terrestre", "Milieu aquatique"],
            ["exemples", "lion, chèvre, baobab, criquet", "poisson, crevette, nénuphar, algue"],
            ["respiration", "poumons (mammifères, oiseaux), trachées (insectes)", "branchies (poissons)"],
            ["déplacement", "pattes, ailes, reptation", "nageoires, corps profilé"],
          ])}
          ${retenir("Chaque être vivant est adapté à son milieu. Certains vivent dans les deux milieux, comme la grenouille (têtard à branchies, adulte à poumons).")}`,
      },
      {
        title: "Les chaînes alimentaires",
        minutes: 12,
        body: `<p>Une <strong>chaîne alimentaire</strong> montre « qui mange qui » : herbe → criquet → poule → chacal. La flèche signifie « est mangé par ».</p>
          ${liste([
            "les <strong>producteurs</strong> (plantes vertes) fabriquent leur matière grâce à la lumière ;",
            "les <strong>consommateurs</strong> (herbivores, carnivores) mangent d’autres êtres vivants ;",
            "les <strong>décomposeurs</strong> (champignons, bactéries, vers de terre) transforment les déchets et les cadavres en éléments du sol.",
          ])}
          ${retenir("Si un maillon disparaît, toute la chaîne est déséquilibrée.")}`,
      },
    ],
  },
  {
    title: "Outils et objets technologiques",
    summary: "Leviers et machines simples, circuit électrique, conducteurs et isolants, sécurité.",
    strand: IST,
    lessons: [
      {
        title: "Les outils et les machines simples",
        minutes: 12,
        body: `<p>Un <strong>outil</strong> prolonge la main de l’homme pour faire un travail plus facilement.</p>
          ${tableau([
            ["Machine simple", "Exemple", "Avantage"],
            ["levier", "pied-de-biche, brouette, ciseaux", "soulever une lourde charge avec moins de force"],
            ["poulie", "puits", "changer la direction de l’effort"],
            ["plan incliné", "rampe pour charger un camion", "monter une charge avec moins de force"],
          ])}
          ${retenir("Plus le bras de levier est long, moins il faut de force.")}`,
      },
      {
        title: "Le circuit électrique",
        minutes: 12,
        body: `<p>Un <strong>circuit électrique</strong> simple comprend une source (pile, batterie, panneau solaire), des fils, un interrupteur et un récepteur (ampoule, moteur). La lampe ne s’allume que si le circuit est <strong>fermé</strong>.</p>
          ${liste([
            "les métaux (cuivre, fer, aluminium) sont des <strong>conducteurs</strong> : ils laissent passer le courant ;",
            "le plastique, le bois sec, le caoutchouc, le verre sont des <strong>isolants</strong>.",
          ])}
          ${retenir("Le courant du secteur (220 V) est dangereux : ne touche jamais une prise avec les mains mouillées et ne bricole pas les fils électriques.")}`,
      },
    ],
  },
  // ── Vivre ensemble ────────────────────────────────────────────────────────
  {
    title: "Les symboles de la République",
    summary: "Le drapeau, l’hymne national, la devise et les armoiries du Sénégal.",
    strand: VE,
    lessons: [
      {
        title: "Drapeau, hymne et devise",
        minutes: 12,
        body: `${tableau([
            ["Symbole", "Description"],
            ["drapeau", "trois bandes verticales égales : vert, or, rouge, avec une étoile verte à cinq branches au centre de la bande or"],
            ["hymne national", "« Le Lion rouge » : paroles de Léopold Sédar Senghor (« Pincez tous vos koras, frappez les balafons… »)"],
            ["devise", "« Un Peuple – Un But – Une Foi »"],
            ["armoiries", "elles portent notamment un lion et un baobab"],
          ])}
          ${retenir("On respecte les symboles de la République : on se lève et on se tient droit quand on chante l’hymne national ou qu’on salue le drapeau.")}
          ${exemple(["Le vert rappelle l’espoir, l’or la richesse et le travail, le rouge la vie et le sacrifice (explication souvent donnée des couleurs)."])}`,
      },
    ],
  },
  {
    title: "Les institutions de la République",
    summary: "Le Président de la République, le Gouvernement, l’Assemblée nationale et la justice.",
    strand: VE,
    lessons: [
      {
        title: "Le Président, le Gouvernement et l’Assemblée nationale",
        minutes: 15,
        body: `${tableau([
            ["Institution", "Rôle"],
            ["Président de la République", "élu au suffrage universel direct pour 5 ans ; garant de la Constitution, chef de l’État et des armées ; il nomme le Premier ministre"],
            ["Gouvernement", "le Premier ministre et les ministres appliquent la politique de la nation"],
            ["Assemblée nationale", "les députés votent les lois et le budget et contrôlent l’action du Gouvernement"],
          ])}
          ${retenir("La Constitution est la loi fondamentale du pays : elle organise les pouvoirs et garantit les droits et les libertés des citoyens.")}`,
      },
      {
        title: "Le pouvoir judiciaire",
        minutes: 12,
        body: `<p>Le <strong>pouvoir judiciaire</strong> est indépendant des autres pouvoirs. Il est exercé par le Conseil constitutionnel, la Cour suprême, la Cour des comptes, les cours et les tribunaux.</p>
          ${liste([
            "les juges règlent les conflits entre personnes et punissent ceux qui enfreignent la loi ;",
            "le Conseil constitutionnel vérifie que les lois respectent la Constitution et proclame les résultats de l’élection présidentielle ;",
            "le Conseil supérieur de la magistrature s’occupe de la carrière des magistrats.",
          ])}
          ${retenir("Séparer les pouvoirs (exécutif, législatif, judiciaire) protège les citoyens contre les abus.")}`,
      },
    ],
  },
  {
    title: "Vivre en communauté",
    summary: "Droits et devoirs de l’enfant, organisations communautaires et confessionnelles, le sport.",
    strand: VE,
    lessons: [
      {
        title: "Droits et devoirs de l’enfant",
        minutes: 12,
        body: `<p>La Convention internationale des droits de l’enfant (1989), que le Sénégal a ratifiée, protège tous les enfants de moins de 18 ans.</p>
          ${tableau([
            ["Droits", "Devoirs"],
            ["être nourri, soigné, logé", "respecter ses parents et les adultes"],
            ["aller à l’école", "étudier et respecter le règlement de l’école"],
            ["être protégé contre la violence et l’exploitation", "respecter les autres et ne pas être violent"],
            ["donner son avis", "protéger l’environnement et le bien commun"],
          ])}
          ${retenir("Un enfant victime de maltraitance peut en parler à un adulte de confiance, à son maître ou à un service de protection de l’enfance.")}`,
      },
      {
        title: "Les organisations communautaires",
        minutes: 12,
        body: `${liste([
            "<strong>organisations communautaires</strong> : associations sportives et culturelles (ASC), groupements de promotion féminine, groupements d’intérêt économique (GIE), associations de parents d’élèves ;",
            "<strong>organisations confessionnelles</strong> : dahiras, associations caritatives religieuses comme Caritas, qui aident les plus pauvres ;",
            "<strong>organisations sportives</strong> : le Comité international olympique (CIO) organise les Jeux olympiques ; Dakar accueille en 2026 les Jeux olympiques de la jeunesse, les premiers en Afrique.",
          ])}
          ${retenir("S’entraider et s’organiser permet de réaliser ensemble ce qu’on ne peut pas faire seul : nettoyer le quartier, construire, aider les malades.")}`,
      },
    ],
  },
  // ── Vivre dans son milieu ────────────────────────────────────────────────
  {
    title: "La dégradation du milieu et des ressources",
    summary: "Déforestation, feux de brousse, érosion, désertification, surpêche, déchets ; comment protéger le milieu.",
    strand: VM,
    lessons: [
      {
        title: "Les causes et les conséquences de la dégradation",
        minutes: 12,
        body: `${tableau([
            ["Problème", "Causes", "Conséquences"],
            ["déforestation", "coupe du bois, charbon de bois, défrichement", "disparition des animaux, sols nus, avancée du désert"],
            ["feux de brousse", "imprudence, chasse, défrichement", "destruction de la végétation et des récoltes"],
            ["érosion", "vent et ruissellement sur des sols nus", "perte des terres cultivables"],
            ["surpêche", "trop de pirogues et de chalutiers, filets interdits", "raréfaction du poisson"],
            ["pollution", "sachets plastiques, ordures, eaux usées", "maladies, mort d’animaux"],
          ])}
          ${retenir("Les ressources naturelles (eau, sol, forêt, poisson) ne sont pas inépuisables : il faut les gérer pour les générations futures.")}`,
      },
      {
        title: "Protéger le milieu",
        minutes: 12,
        body: `${liste([
            "reboiser (Journée nationale de l’arbre, Grande Muraille verte) et utiliser des foyers améliorés ;",
            "faire des pare-feu et ne jamais allumer de feu en brousse ;",
            "fixer les dunes avec des filaos (Niayes) et construire des diguettes contre l’érosion ;",
            "respecter le repos biologique et les tailles minimales de pêche ;",
            "réduire, trier et recycler les déchets ; ne pas jeter de sachets plastiques.",
          ])}
          ${retenir("Chacun peut agir : planter et arroser un arbre, garder la classe et la rue propres, économiser l’eau.")}`,
      },
    ],
  },
  {
    title: "Alimentation, santé et carences nutritionnelles",
    summary: "Les groupes d’aliments, la ration équilibrée et les maladies dues aux carences.",
    strand: VM,
    lessons: [
      {
        title: "Une alimentation équilibrée",
        minutes: 12,
        body: `${tableau([
            ["Groupe d’aliments", "Rôle", "Exemples"],
            ["aliments énergétiques", "donnent de l’énergie", "mil, riz, maïs, manioc, huile, sucre"],
            ["aliments de construction", "font grandir et réparent le corps", "poisson, viande, œufs, lait, niébé, arachide"],
            ["aliments de protection", "protègent contre les maladies", "fruits (mangue, orange, pain de singe), légumes, feuilles"],
          ])}
          ${retenir("Une ration équilibrée contient chaque jour des aliments des trois groupes et de l’eau potable.")}`,
      },
      {
        title: "Les carences nutritionnelles",
        minutes: 15,
        body: `${tableau([
            ["Carence", "Maladie", "Prévention"],
            ["protéines", "kwashiorkor (ventre gonflé, cheveux décolorés)", "poisson, lait, œufs, niébé"],
            ["de tous les aliments", "marasme (enfant très maigre)", "repas suffisants et variés"],
            ["fer", "anémie (fatigue, pâleur)", "feuilles vertes, viande, foie"],
            ["iode", "goitre (gonflement du cou)", "sel iodé"],
            ["vitamine A", "troubles de la vue (cécité nocturne)", "mangue, carotte, huile de palme rouge"],
            ["vitamine C", "scorbut (saignement des gencives)", "agrumes, bissap, pain de singe"],
          ])}
          ${retenir("La malnutrition touche surtout les jeunes enfants : l’allaitement maternel, une alimentation variée et la surveillance de la croissance la préviennent.")}`,
      },
    ],
  },
];
