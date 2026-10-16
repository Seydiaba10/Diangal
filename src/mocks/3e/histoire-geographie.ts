// Histoire-géographie de 3e (programme relevé : docs/programme/releve-ci-3e.md).
// Leçons rédigées par DIANGAL, à faire valider par un enseignant.

import { type Chapter3eSpec, liste, retenir, tableau } from "./blocks";

export const HG_3E: Chapter3eSpec[] = [
  {
    title: "La révolution industrielle et ses conséquences",
    summary: "Découvertes scientifiques, capitalisme, mutations sociales et doctrines sociales.",
    lessons: [
      {
        title: "Les découvertes et les nouvelles énergies",
        body: `<p>La révolution industrielle commence en Angleterre à la fin du XVIIIe siècle, puis gagne l’Europe et les États-Unis au XIXe siècle.</p>
          ${liste([
            "<strong>Première révolution industrielle</strong> : charbon, machine à vapeur (James Watt), textile, sidérurgie, chemin de fer.",
            "<strong>Seconde révolution industrielle</strong> (fin du XIXe siècle) : électricité, pétrole, moteur à explosion, chimie.",
          ])}
          ${retenir("On passe de l’atelier artisanal à l’usine et à la production en grande quantité.")}`,
      },
      {
        title: "Le capitalisme industriel",
        body: `${liste([
            "Les entreprises ont besoin de capitaux : naissent les <strong>sociétés anonymes</strong>, les banques d’affaires et la Bourse.",
            "Les entreprises se regroupent (concentration) pour dominer le marché.",
            "La recherche du profit et la concurrence sont au cœur du système.",
          ])}
          ${retenir("Le capitalisme repose sur la propriété privée des moyens de production et la liberté d’entreprendre.")}`,
      },
      {
        title: "Les mutations sociales et les doctrines",
        body: `<p>Une <strong>bourgeoisie</strong> d’affaires s’enrichit ; le <strong>prolétariat</strong> ouvrier vit dans des conditions difficiles : longues journées, bas salaires, travail des enfants, logements insalubres.</p>
          ${tableau([
            ["Doctrine", "Idée principale"],
            ["Libéralisme (Adam Smith)", "liberté économique, l’État intervient peu"],
            ["Socialisme (Karl Marx, 1848)", "propriété collective des moyens de production"],
            ["Catholicisme social (1891)", "améliorer le sort des ouvriers par la justice sociale"],
          ])}
          ${retenir("Les ouvriers s’organisent en syndicats pour obtenir de meilleures conditions de travail.")}`,
      },
    ],
  },
  {
    title: "L’impérialisme européen et le partage de l’Afrique",
    summary: "Missions et explorations, congrès de Berlin, systèmes coloniaux français et britannique.",
    lessons: [
      {
        title: "Les causes de l’impérialisme",
        body: `${liste([
            "<strong>Économiques</strong> : matières premières, débouchés pour les produits industriels, placement des capitaux.",
            "<strong>Politiques</strong> : puissance et prestige des États européens.",
            "<strong>Idéologiques</strong> : prétendue « mission civilisatrice », action des missionnaires.",
          ])}
          <p>Les explorateurs (René Caillié, Livingstone, Stanley…) font connaître l’intérieur du continent.</p>`,
      },
      {
        title: "La conférence de Berlin",
        body: `<p>De novembre 1884 à février 1885, la <strong>conférence de Berlin</strong> réunit les puissances européennes. Aucun Africain n’y participe.</p>
          ${liste([
            "Elle fixe les règles du partage : pour revendiquer un territoire, il faut l’occuper effectivement et en informer les autres puissances.",
            "Elle accélère la « course au clocher » : vers 1914, presque toute l’Afrique est colonisée (sauf l’Éthiopie et le Liberia).",
          ])}`,
      },
      {
        title: "Les systèmes coloniaux",
        body: `${tableau([
            ["", "France", "Grande-Bretagne"],
            ["Principe", "administration directe, assimilation", "administration indirecte (indirect rule)"],
            ["Chefs locaux", "simples auxiliaires", "gardent une partie du pouvoir"],
            ["Exemple", "AOF, créée en 1895 (capitale Dakar à partir de 1902)", "Nigeria, Gold Coast"],
          ])}
          ${retenir("Partout : travail forcé, impôt de capitation, cultures d’exportation (arachide au Sénégal).")}`,
      },
    ],
  },
  {
    title: "Les résistances africaines",
    summary: "Formes, exemples et bilan des résistances à la conquête coloniale.",
    lessons: [
      {
        title: "Les résistances armées",
        body: `${liste([
            "<strong>El Hadj Omar Tall</strong> combat les Français (siège de Médine, 1857).",
            "<strong>Lat Dior Diop</strong>, damel du Cayor, s’oppose au chemin de fer Dakar–Saint-Louis ; il meurt à Dekhelé en 1886.",
            "<strong>Samory Touré</strong> résiste plus de quinze ans avant d’être capturé en 1898.",
            "<strong>Ménélik II</strong> bat les Italiens à Adoua (1896) : l’Éthiopie reste indépendante.",
          ])}`,
      },
      {
        title: "Les résistances pacifiques et religieuses",
        body: `${liste([
            "<strong>Cheikh Ahmadou Bamba</strong>, fondateur du mouridisme, prône une résistance spirituelle ; il est déporté au Gabon en 1895.",
            "<strong>Aline Sitoé Diatta</strong>, en Casamance, appelle à refuser les réquisitions coloniales ; elle est arrêtée en 1943.",
            "Refus de l’impôt, fuite devant le travail forcé, maintien des cultures et des langues.",
          ])}`,
      },
      {
        title: "Le bilan des résistances",
        body: `<p>Malgré leur courage, la plupart des résistants sont vaincus : supériorité des armes européennes, divisions entre royaumes africains, alliances des colonisateurs avec certains chefs.</p>
          ${retenir("Ces résistants sont aujourd’hui des héros nationaux : ils ont nourri la fierté et le nationalisme africains.")}`,
      },
    ],
  },
  {
    title: "L’impérialisme en Asie et en Amérique",
    summary: "Impérialismes européen et japonais en Asie, impérialisme américain.",
    lessons: [
      {
        title: "Les Européens en Asie",
        body: `${liste([
            "<strong>Inde</strong> : sous domination britannique, elle devient colonie de la Couronne en 1858.",
            "<strong>Chine</strong> : après les guerres de l’opium (1839-1842, 1856-1860), elle doit signer des « traités inégaux » et ouvrir ses ports.",
            "<strong>Indochine</strong> : la France forme l’Union indochinoise en 1887.",
          ])}`,
      },
      {
        title: "L’impérialisme japonais",
        body: `<p>Avec l’ère <strong>Meiji</strong> (à partir de 1868), le Japon se modernise rapidement sur le modèle occidental.</p>
          ${liste(["Il bat la Chine (1894-1895) et prend Taïwan.", "Il bat la Russie (1904-1905).", "Il annexe la Corée en 1910."])}
          ${retenir("Le Japon est le seul pays d’Asie à devenir lui-même une puissance impérialiste.")}`,
      },
      {
        title: "L’impérialisme américain",
        body: `${liste([
            "La <strong>doctrine Monroe</strong> (1823) : l’Amérique aux Américains, les Européens ne doivent pas y intervenir.",
            "Après la guerre contre l’Espagne (1898), les États-Unis contrôlent Cuba et les Philippines.",
            "Ils construisent le canal de Panama (ouvert en 1914) et interviennent en Amérique latine (« politique du gros bâton »).",
          ])}`,
      },
    ],
  },
  {
    title: "La Première Guerre mondiale",
    summary: "Causes, déroulement et conséquences du conflit.",
    lessons: [
      {
        title: "Les causes de la guerre",
        body: `${liste([
            "Rivalités économiques et coloniales entre puissances européennes.",
            "Nationalismes et course aux armements.",
            "Deux blocs : la Triple Entente (France, Royaume-Uni, Russie) et la Triple Alliance (Allemagne, Autriche-Hongrie, Italie).",
          ])}
          ${retenir("L’étincelle : l’assassinat de l’archiduc François-Ferdinand à Sarajevo, le 28 juin 1914.")}`,
      },
      {
        title: "Le déroulement du conflit",
        body: `${liste([
            "1914 : guerre de mouvement, puis le front se fige.",
            "1915-1917 : guerre des tranchées (Verdun en 1916).",
            "1917 : entrée en guerre des États-Unis ; la Russie se retire.",
            "11 novembre 1918 : armistice.",
          ])}
          <p>Les colonies participent : environ 200 000 <strong>tirailleurs sénégalais</strong> sont recrutés en AOF. Le député Blaise Diagne organise leur recrutement en 1918.</p>`,
      },
      {
        title: "Les conséquences",
        body: `${liste([
            "Environ 10 millions de soldats morts, des régions dévastées.",
            "Le traité de Versailles (1919) impose de lourdes conditions à l’Allemagne.",
            "Création de la <strong>Société des Nations</strong> (SDN) pour garantir la paix.",
            "Les colonies allemandes (Togo, Cameroun…) sont confiées à la France et au Royaume-Uni.",
          ])}`,
      },
    ],
  },
  {
    title: "La révolution russe",
    summary: "De la révolution de 1917 à la consolidation du régime soviétique.",
    lessons: [
      {
        title: "Les révolutions de 1917",
        body: `${liste([
            "Russie de 1914 : empire du tsar Nicolas II, paysans pauvres, défaites militaires.",
            "<strong>Février 1917</strong> : le tsar abdique ; un gouvernement provisoire se forme.",
            "<strong>Octobre 1917</strong> : les bolcheviks de Lénine prennent le pouvoir.",
          ])}
          ${retenir("Lénine signe la paix avec l’Allemagne en 1918 et distribue les terres.")}`,
      },
      {
        title: "La construction de l’URSS",
        body: `${liste([
            "1918-1921 : guerre civile entre « rouges » et « blancs ».",
            "1921 : la NEP (nouvelle politique économique) autorise un peu de commerce privé.",
            "1922 : naissance de l’<strong>URSS</strong>.",
            "Après la mort de Lénine (1924), <strong>Staline</strong> impose la collectivisation des terres, les plans quinquennaux et un régime de terreur.",
          ])}
          ${retenir("L’URSS devient un État totalitaire à parti unique.")}`,
      },
    ],
  },
  {
    title: "La crise des années 1930",
    summary: "Le krach de 1929 et ses conséquences dans le monde.",
    lessons: [
      {
        title: "Le krach de 1929",
        body: `<p>Le jeudi 24 octobre 1929 (« jeudi noir »), la Bourse de New York s’effondre : c’est le <strong>krach de Wall Street</strong>.</p>
          ${liste(["Faillites de banques et d’entreprises.", "Chômage massif : environ 13 millions de chômeurs aux États-Unis en 1932.", "La crise s’étend au monde entier par le commerce et les capitaux."])}`,
      },
      {
        title: "Les réponses à la crise",
        body: `${liste([
            "Aux États-Unis, le président Roosevelt lance le <strong>New Deal</strong> (1933) : grands travaux, aides sociales, contrôle des banques.",
            "En Allemagne, la crise favorise l’arrivée au pouvoir d’Hitler (1933).",
            "Dans les colonies, la chute du prix de l’arachide appauvrit les paysans sénégalais.",
          ])}
          ${retenir("La crise renforce les régimes autoritaires et prépare la Seconde Guerre mondiale.")}`,
      },
    ],
  },
  {
    title: "La Seconde Guerre mondiale",
    summary: "Causes, déroulement et conséquences du conflit.",
    lessons: [
      {
        title: "Les causes",
        body: `${liste([
            "La politique agressive de l’Allemagne nazie, de l’Italie fasciste et du Japon.",
            "Le traité de Versailles, vécu comme une humiliation en Allemagne.",
            "La faiblesse de la SDN.",
          ])}
          ${retenir("1er septembre 1939 : l’Allemagne envahit la Pologne ; la France et le Royaume-Uni lui déclarent la guerre.")}`,
      },
      {
        title: "Le déroulement",
        body: `${liste([
            "1939-1942 : victoires de l’Axe ; la France est battue en juin 1940.",
            "1941 : l’Allemagne attaque l’URSS ; le Japon attaque Pearl Harbor, les États-Unis entrent en guerre.",
            "1942-1943 : tournants (Stalingrad, El Alamein).",
            "1944 : débarquement en Normandie ; 8 mai 1945 : capitulation de l’Allemagne ; septembre 1945 : capitulation du Japon après les bombes atomiques.",
          ])}
          <p>Les soldats africains participent à la libération de la France. Le 1er décembre 1944, à <strong>Thiaroye</strong>, des tirailleurs qui réclamaient leur dû sont tués par l’armée française.</p>`,
      },
      {
        title: "Les conséquences",
        body: `${liste([
            "Plus de 50 millions de morts ; le génocide des Juifs (Shoah).",
            "Création de l’<strong>ONU</strong> (1945).",
            "Les États-Unis et l’URSS deviennent les deux grandes puissances.",
            "Les peuples colonisés réclament leur liberté : la décolonisation commence.",
          ])}`,
      },
    ],
  },
  {
    title: "Les révolutions chinoises",
    summary: "De Sun Yat-sen à Mao Zedong.",
    lessons: [
      {
        title: "La révolution de 1911",
        body: `<p>En 1911, la dynastie mandchoue est renversée ; la <strong>République</strong> est proclamée en 1912. <strong>Sun Yat-sen</strong> fonde le Guomindang (parti nationaliste).</p>
          ${retenir("Le pays reste divisé entre seigneurs de la guerre et menacé par les puissances étrangères, notamment le Japon.")}`,
      },
      {
        title: "De la Longue Marche à la Chine populaire",
        body: `${liste([
            "1921 : fondation du Parti communiste chinois.",
            "Guerre civile entre nationalistes (Tchang Kaï-chek) et communistes.",
            "1934-1935 : la <strong>Longue Marche</strong> des communistes dirigés par Mao Zedong.",
            "1er octobre 1949 : Mao proclame la <strong>République populaire de Chine</strong>. Les nationalistes se réfugient à Taïwan.",
          ])}`,
      },
    ],
  },
  {
    title: "Les relations Est-Ouest de 1945 aux années 1990",
    summary: "Guerre froide, coexistence pacifique et fin des blocs.",
    lessons: [
      {
        title: "La guerre froide",
        body: `<p>Après 1945, deux blocs s’opposent sans s’affronter directement : l’Ouest (États-Unis, capitalisme) et l’Est (URSS, communisme).</p>
          ${liste([
            "1947 : doctrine Truman et plan Marshall.",
            "1948-1949 : blocus de Berlin ; création de l’OTAN (1949).",
            "1955 : pacte de Varsovie.",
            "Conflits périphériques : guerre de Corée (1950-1953), crise de Cuba (1962).",
          ])}`,
      },
      {
        title: "La coexistence pacifique et la détente",
        body: `<p>Après la crise de Cuba, les deux Grands dialoguent : téléphone rouge (1963), accords de limitation des armements.</p>
          ${retenir("La course aux armements continue, et les tensions reprennent à la fin des années 1970.")}`,
      },
      {
        title: "La fin des blocs",
        body: `${liste([
            "1985 : Gorbatchev engage des réformes en URSS.",
            "9 novembre 1989 : chute du mur de Berlin.",
            "1990 : réunification de l’Allemagne.",
            "Décembre 1991 : disparition de l’URSS.",
          ])}
          ${retenir("Les États-Unis restent la seule superpuissance.")}`,
      },
    ],
  },
  {
    title: "La décolonisation en Afrique",
    summary: "Causes et formes de l’accès des pays africains à l’indépendance.",
    lessons: [
      {
        title: "Les causes de la décolonisation",
        body: `${liste([
            "L’affaiblissement de la France et du Royaume-Uni après 1945.",
            "La participation des Africains à la guerre et l’éveil du nationalisme (partis, syndicats, étudiants).",
            "Le soutien de l’ONU, des États-Unis, de l’URSS et des pays du Tiers-monde (Bandung).",
          ])}`,
      },
      {
        title: "Les formes de la décolonisation",
        body: `${liste([
            "<strong>Pacifique</strong>, par la négociation : la plupart des colonies françaises d’Afrique noire, le Ghana.",
            "<strong>Violente</strong>, par la lutte armée : Algérie, Kenya, colonies portugaises.",
          ])}
          ${retenir("1960 est appelée « l’année des indépendances » : 17 pays africains deviennent indépendants.")}`,
      },
      {
        title: "La décolonisation en Afrique du Nord",
        body: `${liste([
            "Le Maroc et la Tunisie deviennent indépendants en 1956.",
            "En Algérie, la guerre commence en 1954 ; les accords d’Évian (mars 1962) mènent à l’indépendance en juillet 1962.",
          ])}`,
      },
      {
        title: "La décolonisation en Afrique centrale",
        body: `<p>Au Congo belge, l’indépendance est obtenue en juin 1960, mais elle est suivie d’une grave crise : sécession du Katanga, assassinat du Premier ministre <strong>Patrice Lumumba</strong> en 1961.</p>
          ${retenir("Les colonies françaises d’Afrique équatoriale (Gabon, Congo, Tchad, Centrafrique) deviennent indépendantes en août 1960.")}`,
      },
      {
        title: "Les indépendances en Afrique de l’Ouest",
        body: `${liste([
            "1957 : la Gold Coast devient le <strong>Ghana</strong> de Kwame Nkrumah, premier pays d’Afrique de l’Ouest à obtenir l’indépendance.",
            "1958 : la <strong>Guinée</strong> de Sékou Touré vote « non » au référendum et devient indépendante.",
            "1960 : indépendance des autres colonies de l’AOF, dont le Sénégal ; le Nigeria en octobre 1960.",
          ])}`,
      },
    ],
  },
  {
    title: "Bandung et l’émergence du Tiers-monde",
    summary: "La conférence de 1955 et l’affirmation des pays non alignés.",
    lessons: [
      {
        title: "La conférence de Bandung",
        body: `<p>En avril 1955, à <strong>Bandung</strong> (Indonésie), 29 pays d’Afrique et d’Asie se réunissent.</p>
          ${liste(["Ils condamnent le colonialisme et le racisme.", "Ils réclament l’indépendance des peuples colonisés.", "Ils veulent rester en dehors des deux blocs."])}`,
      },
      {
        title: "Le non-alignement",
        body: `<p>En 1961, à Belgrade, naît le <strong>Mouvement des non-alignés</strong> (Nehru, Nasser, Tito, Nkrumah…).</p>
          ${retenir("Le Tiers-monde désigne les pays pauvres, souvent anciennes colonies, qui refusent de choisir entre l’Est et l’Ouest.")}`,
      },
    ],
  },
  {
    title: "Le Sénégal de 1944 à 1962",
    summary: "Vie politique, marche vers l’indépendance et premières années de la République.",
    lessons: [
      {
        title: "Les réformes d’après-guerre",
        body: `${liste([
            "1944 : la conférence de Brazzaville promet des réformes, sans parler d’indépendance.",
            "1946 : la loi Houphouët-Boigny abolit le travail forcé ; la loi Lamine Guèye donne la citoyenneté française à tous les habitants des colonies.",
            "1948 : Léopold Sédar Senghor fonde le Bloc démocratique sénégalais (BDS).",
            "1956 : la loi-cadre Defferre accorde une autonomie interne.",
          ])}`,
      },
      {
        title: "La marche vers l’indépendance",
        body: `${liste([
            "28 septembre 1958 : le Sénégal vote « oui » au référendum et entre dans la Communauté française.",
            "1959 : le Sénégal et le Soudan français forment la <strong>Fédération du Mali</strong>.",
            "20 juin 1960 : la Fédération du Mali devient indépendante.",
            "20 août 1960 : le Sénégal se retire de la Fédération et proclame son indépendance.",
          ])}
          ${retenir("Le 4 avril, fête de l’indépendance, rappelle la signature des accords de transfert des compétences (4 avril 1960).")}`,
      },
      {
        title: "Les premières années de la République",
        body: `${liste([
            "Septembre 1960 : Léopold Sédar Senghor est élu président de la République ; Mamadou Dia est président du Conseil.",
            "Décembre 1962 : crise politique entre les deux hommes ; Mamadou Dia est arrêté.",
            "1963 : une nouvelle Constitution instaure un régime présidentiel.",
          ])}`,
      },
    ],
  },
  {
    title: "La Terre, un village planétaire",
    summary: "Moyens et problèmes de communication dans le monde.",
    lessons: [
      {
        title: "Les moyens de communication",
        body: `${liste([
            "Transports : porte-conteneurs, avions, routes, chemins de fer (le TER relie Dakar à Diamniadio).",
            "Télécommunications : téléphone mobile, satellites, câbles sous-marins, Internet.",
          ])}
          ${retenir("Grâce à ces réseaux, les informations, les marchandises et les personnes circulent très vite : on parle de « village planétaire ».")}`,
      },
      {
        title: "Des échanges inégaux",
        body: `${liste([
            "Les grands flux relient surtout l’Amérique du Nord, l’Europe et l’Asie de l’Est.",
            "L’Afrique reste moins connectée : réseaux routiers incomplets, coût élevé d’Internet.",
            "Le téléphone mobile et le paiement par mobile money changent la vie quotidienne au Sénégal.",
          ])}
          ${retenir("Le port autonome de Dakar et l’aéroport Blaise Diagne font du Sénégal une porte d’entrée de l’Afrique de l’Ouest.")}`,
      },
    ],
  },
  {
    title: "Les systèmes économiques et les inégalités de développement",
    summary: "Économies libérales et socialistes, pays riches et pays pauvres.",
    lessons: [
      {
        title: "Les systèmes économiques",
        body: `${tableau([
            ["", "Système libéral (capitaliste)", "Système socialiste"],
            ["Propriété", "privée", "collective (État)"],
            ["Décisions", "le marché (offre et demande)", "le plan de l’État"],
            ["Exemples", "États-Unis, Europe de l’Ouest", "ex-URSS, Cuba"],
          ])}
          ${retenir("Aujourd’hui, la plupart des pays ont une économie de marché avec une intervention plus ou moins forte de l’État.")}`,
      },
      {
        title: "Pays développés et pays en développement",
        body: `<p>On mesure le développement avec le PIB par habitant et l’<strong>IDH</strong> (indice de développement humain : revenu, santé, éducation).</p>
          ${liste([
            "Pays développés : revenus élevés, longue espérance de vie, industrie et services.",
            "Pays en développement : pauvreté, croissance rapide de la population, dépendance aux matières premières.",
            "Pays émergents : Chine, Inde, Brésil… dont la croissance est rapide.",
          ])}`,
      },
    ],
  },
  {
    title: "La coopération internationale",
    summary: "Coopération bilatérale et multilatérale, aide au développement.",
    lessons: [
      {
        title: "Les formes de coopération",
        body: `${liste([
            "<strong>Bilatérale</strong> : entre deux pays (accords, aide d’un pays à un autre).",
            "<strong>Multilatérale</strong> : par des organisations qui regroupent plusieurs pays.",
          ])}
          ${tableau([
            ["Organisation", "Rôle"],
            ["ONU (1945)", "paix et coopération mondiale"],
            ["Union africaine (2002, ex-OUA de 1963)", "unité et développement de l’Afrique"],
            ["CEDEAO (1975)", "intégration de l’Afrique de l’Ouest"],
            ["UEMOA (1994)", "union économique et monétaire (franc CFA)"],
            ["OMVS (1972)", "mise en valeur du fleuve Sénégal (barrages de Diama et Manantali)"],
          ])}`,
      },
      {
        title: "L’aide au développement et ses limites",
        body: `<p>L’aide prend la forme de dons, de prêts, d’assistance technique ou d’aide alimentaire (Banque mondiale, FMI, agences de l’ONU…).</p>
          ${liste(["Elle finance des écoles, des hôpitaux, des routes.", "Mais elle peut entraîner une dette lourde et une dépendance.", "La coopération Sud-Sud et l’intégration régionale sont des réponses."])}`,
      },
    ],
  },
  {
    title: "Ressources, environnement et climat",
    summary: "Potentiel et équilibres, surexploitation des ressources et changement climatique.",
    lessons: [
      {
        title: "Les ressources et leur surexploitation",
        body: `${liste([
            "Ressources renouvelables (eau, forêts, poissons) et non renouvelables (pétrole, phosphates, or).",
            "Surpêche : les ressources halieutiques du Sénégal diminuent.",
            "Déforestation et feux de brousse, érosion des sols, avancée du désert.",
          ])}`,
      },
      {
        title: "Le changement climatique",
        body: `<p>Les gaz à effet de serre (CO₂ surtout), rejetés par les activités humaines, réchauffent la planète.</p>
          ${liste([
            "Conséquences : sécheresses, pluies irrégulières, montée du niveau de la mer (érosion côtière à Saint-Louis).",
            "Réponses : la Grande Muraille verte, le reboisement, les énergies renouvelables (centrales solaires, éoliennes de Taïba Ndiaye).",
          ])}
          ${retenir("Le <strong>développement durable</strong> répond aux besoins d’aujourd’hui sans compromettre ceux des générations futures.")}`,
      },
    ],
  },
];
