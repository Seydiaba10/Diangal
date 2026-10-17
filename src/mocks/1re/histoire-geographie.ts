// Histoire-géographie de 1re : programmes officiels mis en ligne par l’Office du Bac : histoire « de la
// révolution industrielle à 1945 » (23 leçons dont 3 activités de consolidation), géographie humaine et
// économique (23 leçons). Leçons rédigées par DIANGAL, à faire valider par un professeur
// d’histoire-géographie.

import { type ChapterSpec, exemple, liste, retenir, tableau } from "../tle/blocks";

const H = "Histoire";
const G = "Géographie";

export const HG_1RE: ChapterSpec[] = [
  // ── Histoire ──────────────────────────────────────────────────────────────
  {
    title: "La révolution industrielle et ses conséquences",
    summary: "Genèse et manifestations ; conséquences économiques, sociales et politiques ; syndicalisme et socialisme.",
    strand: H,
    lessons: [
      {
        title: "Genèse et conséquences",
        minutes: 15,
        body: `${liste([
            "née en Grande-Bretagne à la fin du XVIII<sup>e</sup> siècle (charbon, machine à vapeur, textile), elle gagne l’Europe et les États-Unis ;",
            "deuxième révolution industrielle à la fin du XIX<sup>e</sup> siècle : électricité, pétrole, chimie, automobile ;",
            "le capitalisme se développe (banques, sociétés anonymes, concentrations) ;",
            "la société se transforme : bourgeoisie industrielle, classe ouvrière, exode rural, urbanisation.",
          ])}`,
      },
      {
        title: "Syndicalisme et socialisme",
        minutes: 12,
        body: `${liste([
            "les ouvriers s’organisent en syndicats pour obtenir de meilleurs salaires et conditions de travail ;",
            "le socialisme critique le capitalisme ; Karl Marx et Friedrich Engels publient le <em>Manifeste du parti communiste</em> (1848) ;",
            "l’Église catholique propose sa doctrine sociale (encyclique <em>Rerum novarum</em>, 1891).",
          ])}`,
      },
    ],
  },
  {
    title: "L’impérialisme européen en Afrique",
    summary: "Causes, doctrines et méthodes ; positions en 1870 et en 1914 ; la conférence de Berlin.",
    strand: H,
    lessons: [
      {
        title: "Le partage de l’Afrique",
        minutes: 15,
        body: `${liste([
            "causes : besoins de matières premières et de débouchés, rivalités entre puissances, prestige, prétendue « mission civilisatrice » ;",
            "méthodes : explorations, missions, traités de protectorat, conquête militaire ;",
            "la conférence de Berlin (1884-1885) fixe les règles de l’occupation des côtes africaines ;",
            "en 1914, seuls l’Éthiopie et le Liberia restent indépendants.",
          ])}
          ${retenir("Les frontières tracées par les colonisateurs ont souvent ignoré les réalités africaines.")}`,
      },
    ],
  },
  {
    title: "Les résistances africaines à l’impérialisme",
    summary: "Résistances armées, culturelles et passives.",
    strand: H,
    lessons: [
      {
        title: "Résister à la conquête",
        minutes: 15,
        body: `${tableau([
            ["Forme", "Exemples"],
            ["armée", "Lat Dior au Kayor (mort à Dékhélé en 1886), Samory Touré, Alboury Ndiaye, Mamadou Lamine Dramé, Fodé Kaba"],
            ["culturelle et religieuse", "Cheikh Ahmadou Bamba (exil au Gabon, 1895-1902), Aline Sitoé Diatta en Casamance"],
            ["passive", "refus de l’impôt et des cultures imposées, fuite, migrations"],
          ])}
          ${retenir("Ces résistances, même vaincues militairement, ont nourri la conscience nationale.")}`,
      },
    ],
  },
  {
    title: "L’impérialisme en Asie, en Amérique et dans les Caraïbes",
    summary: "Les impérialismes européens, américain, japonais et russe ; le cas de la Chine.",
    strand: H,
    lessons: [
      {
        title: "Un monde dominé",
        minutes: 15,
        body: `${liste([
            "Asie : l’Inde britannique, l’Indochine française ; la Chine est ouverte de force (guerres de l’opium) et partagée en zones d’influence ;",
            "le Japon se modernise (ère Meiji, 1868) et devient à son tour impérialiste (Corée, Mandchourie) ; la Russie s’étend en Sibérie et en Asie centrale ;",
            "Amérique : les États-Unis dominent les Caraïbes et l’Amérique centrale (doctrine Monroe, canal de Panama).",
          ])}`,
      },
    ],
  },
  {
    title: "La Première Guerre mondiale et l’Afrique",
    summary: "Causes, déroulement et conséquences de la guerre de 1914-1918 ; l’Afrique dans le conflit.",
    strand: H,
    lessons: [
      {
        title: "La Grande Guerre",
        minutes: 15,
        body: `${liste([
            "causes : rivalités impériales et économiques, nationalismes, système d’alliances ; l’attentat de Sarajevo (1914) déclenche le conflit ;",
            "guerre de mouvement puis de tranchées (Verdun, 1916) ; l’entrée des États-Unis (1917) ;",
            "l’armistice est signé le 11 novembre 1918 ; le traité de Versailles (1919) sanctionne l’Allemagne ;",
            "l’Afrique fournit soldats (tirailleurs), travailleurs et ressources ; les colonies allemandes sont partagées.",
          ])}`,
      },
    ],
  },
  {
    title: "La révolution russe et la Chine de 1911 à 1945",
    summary: "Les révolutions de 1917 et l’URSS ; la Chine de la république à la guerre contre le Japon.",
    strand: H,
    lessons: [
      {
        title: "Révolutions en Russie et en Chine",
        minutes: 15,
        body: `${liste([
            "en 1917, le tsar abdique ; en octobre, les bolcheviks de Lénine prennent le pouvoir ; l’URSS naît en 1922 ; Staline impose ensuite une dictature ;",
            "en Chine, la république est proclamée en 1911-1912 (Sun Yat-sen) ; le Guomindang de Tchang Kaï-chek affronte les communistes de Mao Zedong (Longue Marche, 1934-1935) ;",
            "à partir de 1937, la Chine combat l’invasion japonaise.",
          ])}`,
      },
    ],
  },
  {
    title: "La crise des années 1930, les fascismes et la faillite de la sécurité collective",
    summary: "La crise de 1929, la montée des régimes totalitaires, l’échec de la SDN.",
    strand: H,
    lessons: [
      {
        title: "Vers une nouvelle guerre",
        minutes: 15,
        body: `${liste([
            "le krach de Wall Street (octobre 1929) provoque une crise mondiale : faillites, chômage, effondrement des prix agricoles (y compris de l’arachide) ;",
            "fascisme en Italie (Mussolini, 1922), nazisme en Allemagne (Hitler, 1933) ;",
            "la Société des Nations ne peut empêcher les agressions : invasion de l’Éthiopie par l’Italie (1935), remilitarisation de la Rhénanie, annexions allemandes.",
          ])}`,
      },
    ],
  },
  {
    title: "La Seconde Guerre mondiale et l’Afrique",
    summary: "Les principales étapes du conflit ; la participation de l’Afrique.",
    strand: H,
    lessons: [
      {
        title: "1939-1945",
        minutes: 15,
        body: `${tableau([
            ["Date", "Événement"],
            ["septembre 1939", "invasion de la Pologne, début de la guerre"],
            ["juin 1940", "défaite de la France ; appel du général de Gaulle"],
            ["1941", "l’URSS et les États-Unis entrent en guerre"],
            ["1942-1943", "tournants : El-Alamein, Stalingrad"],
            ["mai et août 1945", "capitulation de l’Allemagne, puis du Japon après les bombes atomiques"],
          ])}
          ${retenir("Les soldats africains ont combattu sur de nombreux fronts ; le massacre de tirailleurs à Thiaroye (1er décembre 1944) reste un drame de la mémoire sénégalaise.")}`,
      },
    ],
  },
  {
    title: "Le Sénégal de 1914 à 1945",
    summary: "Le Sénégal dans les deux guerres mondiales et dans l’entre-deux-guerres.",
    strand: H,
    lessons: [
      {
        title: "Le Sénégal colonial",
        minutes: 15,
        body: `${liste([
            "en 1914, Blaise Diagne est le premier député africain élu à l’Assemblée nationale française ; il organise le recrutement de tirailleurs en 1918 ;",
            "entre les deux guerres : économie de traite de l’arachide, chemin de fer Dakar-Niger, crise des années 1930 ;",
            "vie politique animée dans les Quatre Communes (Dakar, Gorée, Rufisque, Saint-Louis) ;",
            "pendant la Seconde Guerre mondiale, l’AOF est d’abord fidèle au régime de Vichy (bataille de Dakar, septembre 1940), puis rejoint les Alliés fin 1942.",
          ])}`,
      },
    ],
  },
  // ── Géographie ─────────────────────────────────────────────────────────────
  {
    title: "Les inégalités de développement dans le monde",
    summary: "Mesurer le développement ; pays développés, émergents et moins avancés.",
    strand: G,
    lessons: [
      {
        title: "Mesurer le développement",
        minutes: 12,
        body: `${liste([
            "le PIB par habitant mesure la richesse produite ; l’IDH combine revenu, santé (espérance de vie) et éducation ;",
            "pays développés, pays émergents (Chine, Inde, Brésil), pays moins avancés ;",
            "les inégalités existent aussi à l’intérieur des pays (villes et campagnes).",
          ])}`,
      },
    ],
  },
  {
    title: "La population mondiale",
    summary: "Groupes humains, accroissement, politiques démographiques, migrations, structures, répartition.",
    strand: G,
    lessons: [
      {
        title: "Croissance et répartition",
        minutes: 15,
        body: `${liste([
            "plus de 8 milliards d’habitants ; la croissance ralentit, mais reste forte en Afrique ;",
            "taux d’accroissement naturel = taux de natalité − taux de mortalité ;",
            "la population est concentrée en Asie de l’Est et du Sud, en Europe, en Afrique de l’Ouest ; les déserts et les régions froides sont presque vides ;",
            "migrations internes (exode rural) et internationales ; politiques natalistes ou de limitation des naissances.",
          ])}
          ${exemple(["Densité = population ÷ superficie : environ 18 millions d’habitants pour 196 722 km² donnent un peu plus de 90 hab./km² au Sénégal."])}`,
      },
    ],
  },
  {
    title: "Les formes de mise en valeur agricole et la pêche",
    summary: "Agricultures tropicales traditionnelles et commerciales, agriculture européenne, pays neufs, pêche.",
    strand: G,
    lessons: [
      {
        title: "Des agricultures contrastées",
        minutes: 15,
        body: `${tableau([
            ["Type", "Caractères", "Exemples"],
            ["vivrière traditionnelle", "outils simples, autoconsommation, jachère", "mil, sorgho, riz pluvial"],
            ["commerciale tropicale", "cultures d’exportation, plantations", "arachide, cacao, coton"],
            ["intensive européenne", "mécanisation, engrais, forts rendements, subventions", "céréales, élevage laitier"],
            ["pays neufs", "immenses exploitations très mécanisées", "États-Unis, Canada, Australie"],
          ])}
          ${retenir("La pêche artisanale (pirogues) et la pêche industrielle se concurrencent ; la ressource est menacée par la surpêche.")}`,
      },
    ],
  },
  {
    title: "La ville et les activités urbaines",
    summary: "Fonctions de la ville, urbanisation, industrie, commerce et services, problèmes urbains.",
    strand: G,
    lessons: [
      {
        title: "L’urbanisation du monde",
        minutes: 15,
        body: `${liste([
            "plus de la moitié de l’humanité vit en ville ; l’urbanisation est très rapide dans les pays du Sud ;",
            "fonctions : politique, économique, culturelle, religieuse (Touba), portuaire (Dakar) ;",
            "l’industrie se transforme (délocalisations, nouvelles technologies) ; les services dominent les économies développées ;",
            "problèmes des villes du Sud : quartiers spontanés, embouteillages, chômage, inondations, déchets.",
          ])}`,
      },
    ],
  },
  {
    title: "Transports, échanges et intégration économique",
    summary: "Moyens de communication, monnaie et commerce mondial, échange inégal, espaces d’intégration.",
    strand: G,
    lessons: [
      {
        title: "Un monde d’échanges",
        minutes: 15,
        body: `${liste([
            "transports maritimes (90 % des marchandises), aériens, routiers, ferroviaires ; télécommunications et internet ;",
            "l’Organisation mondiale du commerce (OMC) encadre le commerce international ;",
            "échange inégal : les pays du Sud exportent des matières premières aux prix instables et importent des produits manufacturés plus chers ;",
            "intégration : UE, ACEUM (ex-ALENA), CEDEAO, UEMOA.",
          ])}`,
      },
    ],
  },
];
