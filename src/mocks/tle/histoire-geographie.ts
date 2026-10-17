// Histoire-géographie de Terminale, commune à toutes les séries : programmes d'histoire (19 leçons)
// et de géographie (18 leçons) du second cycle, mis en ligne par l'Office du Bac. Un chapitre
// regroupe les leçons d'une partie du programme. Leçons rédigées par DIANGAL, à faire valider par un
// professeur d'histoire-géographie.

import { type ChapterSpec, liste, retenir, tableau } from "./blocks";

const HISTOIRE = "Histoire";
const GEOGRAPHIE = "Géographie";

export const HG_TLE: ChapterSpec[] = [
  // ── Histoire : le monde contemporain ──────────────────────────────────────
  {
    title: "Le monde au lendemain de la Seconde Guerre mondiale (1945-1990)",
    summary: "Bilan et règlement de la guerre, relations Est-Ouest, la Chine de 1945 aux années 1990.",
    strand: HISTOIRE,
    lessons: [
      {
        title: "Les conséquences de la guerre et les règlements du conflit",
        minutes: 15,
        body: `${tableau([
            ["Conséquences", "Faits essentiels"],
            ["humaines", "environ 50 millions de morts, génocide des Juifs et des Tziganes, déplacés et réfugiés"],
            ["matérielles", "Europe et Japon dévastés ; les États-Unis deviennent la première puissance économique"],
            ["politiques", "déclin de l’Europe ; deux superpuissances, États-Unis et URSS ; affaiblissement des puissances coloniales"],
          ])}
          ${liste([
            "conférences de Yalta (février 1945) et de Potsdam (juillet-août 1945) : partage de l’Allemagne et de Berlin en quatre zones ;",
            "procès de Nuremberg (1945-1946) : première condamnation de crimes contre l’humanité ;",
            "création de l’<strong>ONU</strong> par la Charte de San Francisco (26 juin 1945) pour maintenir la paix ;",
            "en Afrique, les tirailleurs et les populations ont participé à l’effort de guerre : l’éveil des consciences prépare la décolonisation.",
          ])}
          ${retenir("La guerre se termine par la défaite de l’Allemagne (8 mai 1945) puis du Japon (2 septembre 1945), après les bombes atomiques sur Hiroshima et Nagasaki.")}`,
      },
      {
        title: "Les relations Est-Ouest : de la guerre froide à la chute du mur",
        minutes: 18,
        body: `<p>La <strong>guerre froide</strong> est l’affrontement indirect entre deux blocs, sans conflit armé direct entre les États-Unis et l’URSS.</p>
          ${tableau([
            ["", "Bloc de l’Ouest", "Bloc de l’Est"],
            ["chef", "États-Unis", "URSS"],
            ["modèle", "démocratie libérale, capitalisme", "démocratie populaire, communisme, parti unique"],
            ["doctrine (1947)", "Truman : « endiguer » le communisme ; plan Marshall", "Jdanov : lutte contre l’impérialisme"],
            ["alliance militaire", "OTAN (1949)", "pacte de Varsovie (1955)"],
          ])}
          ${tableau([
            ["Crise", "Dates", "Issue"],
            ["blocus de Berlin", "1948-1949", "pont aérien ; naissance de deux Allemagnes (1949)"],
            ["guerre de Corée", "1950-1953", "retour à la frontière du 38<sup>e</sup> parallèle"],
            ["construction du mur de Berlin", "1961", "symbole de la division de l’Europe"],
            ["crise de Cuba", "1962", "retrait des missiles soviétiques ; le monde frôle la guerre nucléaire"],
          ])}
          ${liste([
            "<strong>détente</strong> (années 1960-1970) : téléphone rouge, accords de limitation des armements ;",
            "Gorbatchev (1985) lance la perestroïka ; chute du mur de Berlin (9 novembre 1989), réunification allemande (1990), disparition de l’URSS (décembre 1991).",
          ])}`,
      },
      {
        title: "La Chine de 1945 aux années 1990",
        minutes: 15,
        body: `${tableau([
            ["Période", "Faits essentiels"],
            ["1945-1949", "guerre civile entre communistes (Mao Zedong) et nationalistes (Tchang Kaï-chek) ; la République populaire est proclamée le 1<sup>er</sup> octobre 1949"],
            ["1949-1958", "réforme agraire, alliance avec l’URSS, premier plan quinquennal"],
            ["1958-1960", "« Grand Bond en avant » : échec et famine meurtrière"],
            ["1966-1976", "Révolution culturelle : gardes rouges, culte de Mao"],
            ["à partir de 1978", "Deng Xiaoping : « quatre modernisations », ouverture économique, zones économiques spéciales"],
          ])}
          ${retenir("La Chine s’ouvre à l’économie de marché tout en gardant le monopole politique du Parti communiste : la répression de la place Tian’anmen (1989) le montre.")}`,
      },
    ],
  },
  {
    title: "Décolonisation et affirmation du tiers-monde",
    summary: "Causes générales et formes de la décolonisation ; Bandoeng et le non-alignement.",
    strand: HISTOIRE,
    lessons: [
      {
        title: "Les causes générales de la décolonisation",
        minutes: 15,
        body: `${tableau([
            ["Causes", "Exemples"],
            ["internes aux colonies", "mouvements nationalistes, élites formées à l’école occidentale, syndicats, partis politiques"],
            ["liées à la guerre", "défaites des métropoles (France en 1940), participation des colonisés à la guerre, promesses (conférence de Brazzaville, 1944)"],
            ["internationales", "Charte de l’Atlantique (1941) et Charte de l’ONU (droit des peuples à disposer d’eux-mêmes) ; États-Unis et URSS hostiles au colonialisme"],
            ["idéologiques", "panafricanisme, négritude, marxisme"],
          ])}
          ${retenir("La décolonisation est l’accession à l’indépendance des peuples colonisés, surtout entre 1945 et 1975.")}`,
      },
      {
        title: "Les formes de la décolonisation",
        minutes: 12,
        body: `${tableau([
            ["Forme", "Exemples"],
            ["négociée, pacifique", "Gold Coast (Ghana, 1957), la plupart des colonies françaises d’Afrique noire (1960)"],
            ["non-violente avec mobilisation de masse", "Inde (Gandhi)"],
            ["guerre de libération", "Indochine, Algérie, Guinée-Bissau, Angola, Mozambique"],
          ])}
          ${retenir("La forme dépend de la politique de la métropole (Royaume-Uni plus souple, France et Portugal plus attachés à leurs colonies), du nombre de colons et de la force des mouvements nationalistes.")}`,
      },
      {
        title: "Bandoeng et l’émergence du tiers-monde",
        minutes: 12,
        body: `<p>En avril 1955, 29 pays d’Asie et d’Afrique se réunissent à <strong>Bandoeng</strong> (Indonésie), autour de Nehru, Nasser, Zhou Enlai et Soekarno.</p>
          ${liste([
            "ils condamnent le colonialisme et le racisme ;",
            "ils affirment le droit des peuples à disposer d’eux-mêmes et la coexistence pacifique ;",
            "ils annoncent le <strong>non-alignement</strong>, officialisé à Belgrade en 1961 : refus de choisir entre les deux blocs.",
          ])}
          ${retenir("Le terme « tiers-monde » (Alfred Sauvy, 1952) désigne les pays pauvres, souvent anciennement colonisés, qui revendiquent un nouvel ordre économique mondial.")}`,
      },
    ],
  },
  {
    title: "La décolonisation en Asie et au Proche-Orient",
    summary: "Inde et Indochine ; la question palestinienne et les relations israélo-arabes.",
    strand: HISTOIRE,
    lessons: [
      {
        title: "La décolonisation en Inde et en Indochine",
        minutes: 15,
        body: `<h2>L’Inde</h2>
          ${liste([
            "le Congrès national indien mène la lutte ; Gandhi prône la non-violence et la désobéissance civile (marche du sel, 1930) ;",
            "la Ligue musulmane de Jinnah réclame un État séparé ;",
            "indépendance le 15 août 1947, avec la partition entre l’Inde et le Pakistan, accompagnée de violences et de millions de réfugiés.",
          ])}
          <h2>L’Indochine</h2>
          ${liste([
            "Hô Chi Minh proclame l’indépendance du Viêt Nam le 2 septembre 1945 ; la France refuse : guerre d’Indochine (1946-1954) ;",
            "défaite française à Diên Biên Phu (mai 1954) ; accords de Genève (1954) : le Viêt Nam est divisé au 17<sup>e</sup> parallèle ;",
            "la guerre du Viêt Nam contre les États-Unis suit, jusqu’à la réunification en 1975-1976.",
          ])}
          ${retenir("L’Inde illustre une décolonisation négociée sous la pression d’un mouvement de masse ; l’Indochine, une décolonisation par la guerre, mêlée à la guerre froide.")}`,
      },
      {
        title: "La question palestinienne et les relations israélo-arabes",
        minutes: 15,
        body: `${tableau([
            ["Date", "Événement"],
            ["1947", "plan de partage de la Palestine par l’ONU (un État juif, un État arabe)"],
            ["1948", "création de l’État d’Israël (14 mai) ; première guerre israélo-arabe ; exode de centaines de milliers de Palestiniens"],
            ["1956", "crise de Suez"],
            ["1964", "création de l’OLP (Yasser Arafat la dirige à partir de 1969)"],
            ["1967", "guerre des Six Jours : Israël occupe la Cisjordanie, Gaza, le Golan et le Sinaï"],
            ["1973", "guerre du Kippour ; premier choc pétrolier"],
            ["1978-1979", "accords de Camp David : paix entre l’Égypte et Israël"],
            ["1987", "première Intifada (« soulèvement des pierres »)"],
            ["1993", "accords d’Oslo : reconnaissance mutuelle entre Israël et l’OLP, autonomie palestinienne"],
          ])}
          ${retenir("Le conflit oppose deux peuples sur la même terre ; il est aggravé par les enjeux religieux (Jérusalem), la question des réfugiés, des colonies et de l’eau, et par la guerre froide.")}`,
      },
    ],
  },
  {
    title: "La décolonisation en Afrique",
    summary: "Algérie, Gold Coast, Sénégal, Guinée-Bissau et Angola.",
    strand: HISTOIRE,
    lessons: [
      {
        title: "L’Algérie : une décolonisation par la guerre",
        minutes: 15,
        body: `${liste([
            "l’Algérie compte environ un million de colons européens ; les « Algériens musulmans » n’ont pas l’égalité des droits ;",
            "8 mai 1945 : la répression des manifestations de Sétif et Guelma fait des milliers de morts ;",
            "1<sup>er</sup> novembre 1954 : le FLN déclenche l’insurrection (« Toussaint rouge ») ;",
            "guerre très violente (torture, attentats), crise politique en France et retour du général de Gaulle (1958) ;",
            "accords d’Évian (18 mars 1962), puis indépendance le 5 juillet 1962.",
          ])}
          ${retenir("La guerre d’Algérie a eu des répercussions en Afrique noire : des soldats africains y ont combattu, et elle a accéléré la décolonisation négociée des autres territoires français.")}`,
      },
      {
        title: "La Gold Coast, première colonie d’Afrique noire indépendante",
        minutes: 10,
        body: `${liste([
            "colonie britannique riche en cacao et en or, avec une élite instruite ;",
            "Kwame Nkrumah fonde le Convention People’s Party (1949) et lance l’« action positive » (grèves, boycotts) ;",
            "le Royaume-Uni accorde l’autonomie, puis l’indépendance le 6 mars 1957 : la Gold Coast devient le <strong>Ghana</strong>.",
          ])}
          ${retenir("Nkrumah, panafricaniste, voit dans l’indépendance du Ghana une étape vers l’unité africaine ; elle sert d’exemple à tout le continent.")}`,
      },
      {
        title: "Le Sénégal : de l’Union française à l’indépendance",
        minutes: 18,
        body: `${tableau([
            ["Date", "Étape"],
            ["1944", "conférence de Brazzaville : promesse de réformes, mais pas d’indépendance ; massacre de tirailleurs à Thiaroye (1<sup>er</sup> décembre)"],
            ["1946", "loi Lamine Guèye : citoyenneté française pour les habitants des colonies ; abolition du travail forcé (loi Houphouët-Boigny)"],
            ["1948", "Senghor fonde le Bloc démocratique sénégalais (BDS)"],
            ["1956", "loi-cadre Defferre : suffrage universel, conseils de gouvernement"],
            ["1958", "référendum du 28 septembre : le Sénégal vote « oui » à la Communauté française"],
            ["1959", "Fédération du Mali avec le Soudan français"],
            ["1960", "indépendance de la Fédération (20 juin), éclatement (20 août) ; Senghor président de la République (septembre)"],
          ])}
          ${retenir("La fête de l’indépendance du Sénégal est célébrée le 4 avril, date de la signature des accords de transfert des compétences (1960). En décembre 1962, la crise entre Senghor et Mamadou Dia conduit au régime présidentiel.")}`,
      },
      {
        title: "Guinée-Bissau et Angola : les luttes armées",
        minutes: 12,
        body: `<p>Le Portugal refuse toute décolonisation : les mouvements de libération prennent les armes.</p>
          ${liste([
            "<strong>Guinée-Bissau</strong> : le PAIGC d’Amilcar Cabral mène la guérilla à partir de 1963 ; Cabral est assassiné en janvier 1973 ; l’indépendance est proclamée en septembre 1973 et reconnue en 1974 ;",
            "<strong>Angola</strong> : lutte armée dès 1961 de trois mouvements rivaux (MPLA, FNLA, UNITA) ; indépendance le 11 novembre 1975, suivie d’une longue guerre civile.",
          ])}
          ${retenir("La « révolution des Œillets » au Portugal (25 avril 1974), provoquée en partie par l’usure des guerres coloniales, ouvre la voie aux indépendances des colonies portugaises.")}`,
      },
    ],
  },
  // ── Histoire : étude des civilisations ────────────────────────────────────
  {
    title: "Les civilisations négro-africaines",
    summary: "Concept de civilisation, cadre, organisation des sociétés, religions traditionnelles, évolution.",
    strand: HISTOIRE,
    lessons: [
      {
        title: "Le concept de civilisation",
        minutes: 10,
        body: `<p>Une <strong>civilisation</strong> est l’ensemble des caractères communs (techniques, institutions, croyances, arts, valeurs) d’une société ou d’un groupe de sociétés, sur une longue durée.</p>
          ${liste([
            "on parle de <strong>culture</strong> pour un groupe plus restreint ;",
            "les civilisations sont à la fois uniques et en contact : elles échangent, s’influencent et évoluent ;",
            "la colonisation a longtemps nié l’existence de civilisations africaines ; des historiens comme Cheikh Anta Diop ou Joseph Ki-Zerbo ont montré leur ancienneté et leur richesse.",
          ])}
          ${retenir("Étudier les civilisations, c’est comprendre l’unité et la diversité du genre humain et ce qui fonde l’identité des peuples.")}`,
      },
      {
        title: "Cadre géographique et organisation des sociétés négro-africaines",
        minutes: 15,
        body: `<p>Les civilisations négro-africaines se sont développées au sud du Sahara, dans des milieux variés (savanes, forêts, sahel), avec une histoire ancienne (Nubie, empires du Ghana, du Mali, du Songhaï, royaumes du golfe de Guinée).</p>
          ${tableau([
            ["Domaine", "Caractères"],
            ["social", "famille élargie, lignage, classes d’âge ; dans plusieurs sociétés du Sénégal, hiérarchie entre hommes libres, groupes d’artisans et de griots, et captifs"],
            ["politique", "chefferies, royaumes et empires ; pouvoir souvent sacré mais encadré par des conseils (au Kajoor, le damel était élu par un collège de dignitaires)"],
            ["économique", "agriculture, élevage, pêche, artisanat, commerce à longue distance"],
          ])}
          ${retenir("La solidarité communautaire et le rôle de la parole (tradition orale, griots) sont des traits majeurs de ces civilisations.")}`,
      },
      {
        title: "Les religions traditionnelles africaines",
        minutes: 12,
        body: `${liste([
            "croyance en un Dieu suprême créateur, souvent lointain (Roog chez les Sereer) ;",
            "culte des ancêtres, intermédiaires entre les vivants et le monde invisible ;",
            "génies et esprits liés à la nature (eau, arbres, terre) ;",
            "rites d’initiation, sacrifices, cérémonies de guérison (ndëpp chez les Lébous).",
          ])}
          ${retenir("Ces religions organisent toute la vie sociale : agriculture, naissance, mariage, mort, pouvoir. On parle parfois d’« animisme », terme qui en simplifie la richesse.")}`,
      },
      {
        title: "L’évolution du monde négro-africain",
        minutes: 15,
        body: `${tableau([
            ["Influence", "Exemples au Sénégal"],
            ["islam", "islamisation ancienne (Tekrour, XI<sup>e</sup> siècle) ; confréries : Qadiriyya, Tidjaniyya (El Hadji Malick Sy), Mouridiyya (Cheikh Ahmadou Bamba, Touba), Layène (Seydina Limamou Laye)"],
            ["christianisme", "missions catholiques et protestantes, écoles ; pèlerinage marial de Popenguine"],
            ["colonisation et décolonisation", "école française, villes, économie de traite ; après 1960, construction de l’État-nation"],
          ])}
          ${retenir("Les civilisations africaines ont intégré ces apports en les adaptant : syncrétismes, coexistence religieuse, modernité qui garde des valeurs traditionnelles.")}`,
      },
    ],
  },
  {
    title: "La civilisation musulmane",
    summary: "Naissance de l’islam, Coran et piliers, expansion, culture, unité et diversité du monde musulman.",
    strand: HISTOIRE,
    lessons: [
      {
        title: "La naissance de l’islam",
        minutes: 12,
        body: `${liste([
            "l’Arabie préislamique : tribus nomades et sédentaires, commerce caravanier, La Mecque et sa Kaaba, majoritairement polythéiste ;",
            "Muhammad (Mahomet), né vers 570 à La Mecque, reçoit la révélation vers 610 ;",
            "persécuté, il émigre à Médine en 622 : c’est l’<strong>hégire</strong>, point de départ du calendrier musulman ;",
            "il revient à La Mecque en 630 ; à sa mort (632), l’Arabie est unifiée autour de l’islam.",
          ])}
          ${retenir("L’islam est une religion monothéiste : « islam » signifie soumission à Dieu (Allah).")}`,
      },
      {
        title: "Le Coran et les fondements de l’islam",
        minutes: 12,
        body: `<p>Le <strong>Coran</strong> (114 sourates) est, pour les musulmans, la parole de Dieu révélée au Prophète. La <strong>Sunna</strong> (tradition du Prophète, rapportée par les hadiths) le complète.</p>
          ${tableau([
            ["Les cinq piliers", ""],
            ["chahada", "profession de foi"],
            ["salat", "cinq prières quotidiennes"],
            ["zakat", "aumône légale"],
            ["sawm", "jeûne du mois de Ramadan"],
            ["hajj", "pèlerinage à La Mecque, une fois dans sa vie si on le peut"],
          ])}
          ${retenir("Le droit musulman (charia) s’appuie sur le Coran, la Sunna, le consensus et le raisonnement des juristes.")}`,
      },
      {
        title: "La constitution du monde musulman",
        minutes: 15,
        body: `${tableau([
            ["Période", "Faits essentiels"],
            ["632-661", "califes « bien guidés » (Abou Bakr, Omar, Othman, Ali) : conquête de la Syrie, de l’Égypte, de la Perse"],
            ["661-750", "Omeyyades (capitale Damas) : expansion de l’Espagne à l’Indus"],
            ["750-1258", "Abbassides (capitale Bagdad) : apogée culturel ; puis morcellement du monde musulman"],
          ])}
          ${liste([
            "l’islam gagne l’Afrique du Nord, puis l’Afrique de l’Ouest par le commerce transsaharien et les Almoravides ;",
            "les « gens du Livre » (juifs, chrétiens) sont protégés (dhimmis) moyennant un impôt.",
          ])}`,
      },
      {
        title: "La culture musulmane",
        minutes: 12,
        body: `${tableau([
            ["Domaine", "Exemples"],
            ["sciences", "al-Khwarizmi (algèbre), chiffres dits « arabes » venus de l’Inde, astronomie, médecine d’Avicenne (Ibn Sina)"],
            ["philosophie et histoire", "Averroès (Ibn Rushd), commentateur d’Aristote ; Ibn Khaldoun, penseur de l’histoire"],
            ["arts", "architecture des mosquées (Kairouan, Cordoue), calligraphie, arabesques"],
            ["en Afrique de l’Ouest", "Tombouctou et ses manuscrits, Djenné"],
          ])}
          ${retenir("Le monde musulman a transmis à l’Europe une partie du savoir grec et indien, enrichi par ses propres découvertes.")}`,
      },
      {
        title: "Unité et diversité du monde musulman",
        minutes: 15,
        body: `${tableau([
            ["Tendances historiques", ""],
            ["sunnites", "majoritaires ; suivent la Sunna et les califes successifs"],
            ["chiites", "partisans d’Ali et de ses descendants (Iran, Irak)"],
            ["kharijites", "« ceux qui sont sortis », minoritaires (ibadites d’Oman)"],
          ])}
          ${liste([
            "quatre grandes écoles juridiques sunnites : malikite (dominante en Afrique de l’Ouest et au Maghreb), hanafite, chaféite, hanbalite ;",
            "tendances actuelles : réformisme (Jamal al-Din al-Afghani, Muhammad Abduh), islamisme politique ;",
            "organisations : Ligue islamique mondiale (1962), Organisation de la coopération islamique (OCI, fondée en 1969), dont le Sénégal a accueilli des sommets à Dakar.",
          ])}
          ${retenir("Unité de la foi et des pratiques ; diversité des courants, des cultures et des États.")}`,
      },
    ],
  },
  // ── Géographie ────────────────────────────────────────────────────────────
  {
    title: "Le système-monde : des espaces interdépendants",
    summary: "Mondialisation, grands pôles et espaces-blocs, interdépendance et inégalités.",
    strand: GEOGRAPHIE,
    lessons: [
      {
        title: "Le système-monde",
        minutes: 15,
        body: `<p>La <strong>mondialisation</strong> est la mise en relation des différentes parties du monde par les échanges de marchandises, de capitaux, d’informations et de personnes. Elle forme un <strong>système-monde</strong> où tout est lié.</p>
          ${liste([
            "trois grands pôles (la Triade) : Amérique du Nord, Union européenne, Asie orientale (Japon, Chine) ;",
            "des <strong>espaces-blocs</strong> : regroupements régionaux (UE, ACEUM/ALENA, ASEAN, CEDEAO, Union africaine, ZLECAf) ;",
            "des acteurs : États, firmes multinationales, organisations internationales (OMC, FMI, Banque mondiale), ONG.",
          ])}
          ${retenir("L’interdépendance crée des richesses mais aussi des inégalités : une crise dans un pôle (2008, Covid-19) touche le monde entier. L’Afrique reste en marge, mais ses ressources et sa population en font un enjeu croissant.")}`,
      },
    ],
  },
  {
    title: "L’espace nord-américain",
    summary: "Atouts et contraintes, population, intégration économique, le modèle des États-Unis.",
    strand: GEOGRAPHIE,
    lessons: [
      {
        title: "Atouts et handicaps de la nature",
        minutes: 12,
        body: `${tableau([
            ["Atouts", "Handicaps"],
            ["immensité (plus de 21 millions de km² pour les États-Unis, le Canada et le Mexique)", "froid du Grand Nord canadien, déserts de l’Ouest"],
            ["grandes plaines fertiles du centre", "catastrophes naturelles : ouragans, tornades, séismes (Californie)"],
            ["ressources minières et énergétiques abondantes (pétrole, gaz, charbon, fer)", "sécheresses et incendies"],
            ["fleuves navigables (Mississippi, Saint-Laurent), Grands Lacs, deux façades maritimes", ""],
          ])}
          ${retenir("Grâce à la technique et aux capitaux, les Nord-Américains ont su exploiter ces atouts et réduire les contraintes (irrigation de la Californie).")}`,
      },
      {
        title: "Populations, villes et sociétés",
        minutes: 15,
        body: `${liste([
            "une population formée par l’immigration : peuples autochtones, Européens, Africains déportés par la traite, Latino-Américains, Asiatiques ;",
            "États-Unis : environ 335 millions d’habitants ; Canada : environ 40 millions ; Mexique : environ 130 millions ;",
            "une population très urbanisée : mégalopoles (Boston-Washington, Grands Lacs), métropoles du Sud et de l’Ouest (Sun Belt) ;",
            "des problèmes sociaux : inégalités, ghettos, discriminations raciales, immigration clandestine à la frontière mexicaine.",
          ])}
          ${retenir("Le « melting-pot » américain mêle intégration et persistance des communautés ; le mouvement pour les droits civiques (Martin Luther King) a fait reculer la ségrégation dans les années 1960.")}`,
      },
      {
        title: "La construction de l’espace économique nord-américain",
        minutes: 12,
        body: `<p>L’ALENA (1994), remplacé par l’ACEUM (2020), a créé une zone de libre-échange entre les États-Unis, le Canada et le Mexique.</p>
          ${liste([
            "les États-Unis dominent par leur poids économique ;",
            "le Canada fournit énergie, minerais et produits agricoles ;",
            "le Mexique offre une main-d’œuvre bon marché : usines d’assemblage (maquiladoras) le long de la frontière.",
          ])}
          ${retenir("L’intégration est surtout économique : elle n’a pas d’institutions politiques communes comme l’Union européenne.")}`,
      },
      {
        title: "Le modèle économique américain",
        minutes: 18,
        body: `${tableau([
            ["Caractéristiques", "Exemples"],
            ["libéralisme et esprit d’entreprise", "rôle des grandes firmes, du marché et de l’innovation"],
            ["première puissance économique mondiale", "environ un quart de la richesse mondiale"],
            ["agriculture productiviste", "grandes exploitations mécanisées, agrobusiness, premier exportateur agricole"],
            ["industrie et services de pointe", "aéronautique, informatique (Silicon Valley), finance (Wall Street)"],
            ["puissance mondiale", "dollar, armée, culture (cinéma, Internet)"],
          ])}
          ${liste([
            "problèmes : endettement, déficit commercial, concurrence de la Chine, inégalités sociales, pollution ;",
            "influence dans le monde : la puissance américaine s’exerce par l’économie, la diplomatie et la culture (« soft power »).",
          ])}`,
      },
    ],
  },
  {
    title: "L’espace européen",
    summary: "Milieux et populations, construction européenne, la France ou l’Allemagne.",
    strand: GEOGRAPHIE,
    lessons: [
      {
        title: "Milieux naturels et populations",
        minutes: 12,
        body: `${liste([
            "milieux tempérés majoritaires, avec des nuances océaniques, continentales, méditerranéennes, montagnardes ;",
            "un relief varié (plaines du Nord, Alpes) et des littoraux très découpés ;",
            "une population nombreuse (environ 450 millions dans l’UE), vieillissante, avec une faible fécondité ;",
            "l’Europe est devenue une terre d’immigration, notamment africaine : la question migratoire est un enjeu politique majeur.",
          ])}
          ${retenir("La « dorsale européenne », de Londres à Milan, concentre les hommes et les activités.")}`,
      },
      {
        title: "La construction européenne : réalités et perspectives",
        minutes: 15,
        body: `${tableau([
            ["Date", "Étape"],
            ["1951", "CECA (charbon et acier) entre six pays"],
            ["1957", "traité de Rome : Communauté économique européenne (marché commun)"],
            ["1992", "traité de Maastricht : Union européenne"],
            ["1999-2002", "l’euro, monnaie unique"],
            ["2004-2013", "élargissements à l’Est"],
            ["2020", "sortie du Royaume-Uni (Brexit) : l’UE compte 27 membres"],
          ])}
          ${retenir("L’UE est la première puissance commerciale du monde, mais elle reste divisée sur la politique étrangère, la défense et les migrations. L’Afrique est liée à l’UE par des accords de partenariat.")}`,
      },
      {
        title: "La France et l’Allemagne : deux puissances de l’Union européenne",
        minutes: 15,
        body: `${tableau([
            ["", "France", "Allemagne"],
            ["population", "environ 68 millions", "environ 84 millions, la plus peuplée de l’UE"],
            ["points forts", "agriculture (premier producteur de l’UE), aéronautique, nucléaire, tourisme, luxe", "industrie (automobile, machines, chimie), premier exportateur de l’UE"],
            ["faiblesses", "chômage, dette publique", "vieillissement, dépendance énergétique"],
          ])}
          ${retenir("Le « couple franco-allemand » est le moteur de la construction européenne. Le programme laisse au professeur le choix d’étudier l’un ou l’autre pays.")}`,
      },
    ],
  },
  {
    title: "L’Asie-Pacifique",
    summary: "Facteurs d’émergence, le modèle japonais, la Chine : démographie et développement.",
    strand: GEOGRAPHIE,
    lessons: [
      {
        title: "Les facteurs d’émergence de l’Asie-Pacifique et leurs limites",
        minutes: 15,
        body: `${liste([
            "une main-d’œuvre nombreuse, disciplinée et longtemps bon marché ;",
            "des États interventionnistes et une stratégie d’industrialisation tournée vers l’exportation ;",
            "un « effet de vol d’oies sauvages » : le Japon, puis les « dragons » (Corée du Sud, Taïwan, Hong Kong, Singapour), puis les « tigres » et la Chine ;",
            "l’épargne élevée, l’éducation, les investissements étrangers.",
          ])}
          ${retenir("Limites : inégalités, pollution, vieillissement, dépendance aux marchés extérieurs, tensions politiques (mer de Chine).")}`,
      },
      {
        title: "Le modèle économique japonais",
        minutes: 15,
        body: `${liste([
            "un archipel montagneux, pauvre en ressources et exposé aux séismes et tsunamis ;",
            "après 1945, le « miracle japonais » : forte croissance grâce à l’État (MITI), aux grands groupes (keiretsu), au travail et à l’innovation ;",
            "points forts : automobile (Toyota), électronique, robotique ;",
            "une population concentrée sur le littoral (mégalopole de Tokyo à Osaka).",
          ])}
          ${retenir("Problèmes : longue stagnation depuis les années 1990, dette publique très élevée, vieillissement et baisse de la population, concurrence chinoise.")}`,
      },
      {
        title: "La Chine : les problèmes démographiques",
        minutes: 12,
        body: `${liste([
            "environ 1,4 milliard d’habitants ; l’Inde l’a dépassée en 2023 ;",
            "la politique de l’enfant unique (1979-2015) a freiné la croissance mais provoqué un vieillissement rapide et un déséquilibre entre garçons et filles ;",
            "la Chine autorise deux enfants (2016), puis trois (2021) ;",
            "fort exode rural vers les villes de l’Est : les « mingong » (travailleurs migrants).",
          ])}
          ${retenir("La population est concentrée à l’Est, dans les plaines et sur le littoral ; l’Ouest, montagneux et aride, est peu peuplé.")}`,
      },
      {
        title: "La Chine : le modèle de développement",
        minutes: 15,
        body: `${liste([
            "depuis 1978, une « économie socialiste de marché » : ouverture, zones économiques spéciales, investissements étrangers ;",
            "deuxième économie du monde, « atelier du monde », premier exportateur ;",
            "investissements en Afrique (au Sénégal : Grand Théâtre, Musée des civilisations noires, autoroute Ila Touba) et « nouvelles routes de la soie » ;",
            "montée en gamme : téléphonie, voitures électriques, espace.",
          ])}
          ${retenir("Défis : inégalités entre l’Est littoral et l’intérieur, pollution, endettement, contrôle politique strict par le Parti communiste.")}`,
      },
    ],
  },
  {
    title: "L’Amérique latine",
    summary: "Milieux et populations, le Brésil, puissance émergente.",
    strand: GEOGRAPHIE,
    lessons: [
      {
        title: "Milieux naturels et populations",
        minutes: 12,
        body: `${liste([
            "des milieux très variés : cordillère des Andes, forêt amazonienne, pampa, déserts (Atacama) ;",
            "une population métissée (Amérindiens, Européens, descendants d’Africains) et très urbanisée ;",
            "de grandes métropoles (Mexico, São Paulo, Buenos Aires) entourées de quartiers pauvres (favelas, bidonvilles) ;",
            "des inégalités sociales parmi les plus fortes du monde.",
          ])}
          ${retenir("L’Amérique latine est liée à l’Afrique par l’histoire de la traite : le Brésil a la plus grande population d’origine africaine hors d’Afrique.")}`,
      },
      {
        title: "Le Brésil, une puissance du tiers-monde",
        minutes: 15,
        body: `${tableau([
            ["Atouts", "Problèmes"],
            ["territoire immense (8,5 millions de km²), environ 203 millions d’habitants", "inégalités sociales et régionales (Sud-Est riche, Nordeste pauvre)"],
            ["agriculture d’exportation : soja, café, sucre, viande", "déforestation de l’Amazonie"],
            ["industrie (aéronautique, automobile), pétrole offshore", "violence urbaine, favelas"],
            ["membre des BRICS", "instabilité politique et économique"],
          ])}
          ${retenir("Le Brésil est une puissance émergente : son poids agricole et industriel est mondial, mais son développement reste inégal.")}`,
      },
    ],
  },
  {
    title: "L’Afrique et le Sénégal",
    summary: "Problèmes et perspectives de l’Afrique ; le Sénégal : milieux, population, eau, économie.",
    strand: GEOGRAPHIE,
    lessons: [
      {
        title: "Problèmes et perspectives de développement de l’Afrique",
        minutes: 18,
        body: `${tableau([
            ["Problèmes", "Perspectives"],
            ["pauvreté, faible industrialisation, dépendance aux matières premières", "ressources minières et énergétiques considérables"],
            ["dette, instabilité politique, conflits", "population jeune (environ 1,4 milliard d’habitants), urbanisation, marché intérieur"],
            ["insuffisance des infrastructures et des services (santé, éducation)", "intégration régionale : CEDEAO, Union africaine, ZLECAf"],
            ["effets du changement climatique (désertification, sécheresses)", "numérique (paiement mobile), énergies renouvelables"],
          ])}
          ${retenir("Le défi est de transformer sur place les matières premières, de nourrir une population croissante et de former la jeunesse.")}`,
      },
      {
        title: "Le Sénégal : milieux naturels et populations",
        minutes: 15,
        body: `${liste([
            "196 722 km², 14 régions ; un relief plat (sauf le Sud-Est) ; climat tropical, du sahélien au nord au soudano-guinéen en Casamance ;",
            "une saison des pluies (de juin-juillet à octobre) et une longue saison sèche ;",
            "fleuves Sénégal, Gambie, Casamance, Saloum ;",
            "environ 18 millions d’habitants (recensement de 2023), une population très jeune ;",
            "une population inégalement répartie : forte concentration à Dakar et dans l’Ouest, faibles densités à l’Est ;",
            "exode rural et émigration (vers l’Europe, les pays voisins).",
          ])}
          ${retenir("Diversité ethnique et linguistique (Wolof, Pulaar, Sereer, Diola, Mandingue, Soninké…) dans une grande cohésion nationale.")}`,
      },
      {
        title: "La question de l’eau au Sénégal",
        minutes: 15,
        body: `${liste([
            "des pluies faibles et irrégulières au nord, des sécheresses (années 1970-1980) ;",
            "l’OMVS (Sénégal, Mali, Mauritanie, Guinée) a construit les barrages de Diama (contre la remontée de l’eau salée) et de Manantali (irrigation, électricité) ;",
            "Dakar est alimentée en partie par le lac de Guiers, à plus de 200 km, et par des forages ; la nappe est menacée par la salinisation ;",
            "l’agriculture irriguée se développe dans la vallée du fleuve (riz, tomate, oignon).",
          ])}
          ${retenir("Enjeux : accès à l’eau potable pour tous, assainissement, partage de l’eau entre usages et entre pays, lutte contre la salinisation des terres (Saloum, Casamance).")}`,
      },
      {
        title: "Problèmes économiques et politiques de développement du Sénégal",
        minutes: 18,
        body: `${tableau([
            ["Secteur", "Situation"],
            ["agriculture", "arachide, mil, riz, horticulture ; dépendance aux pluies ; importations de riz"],
            ["pêche", "première ressource d’exportation, menacée par la surpêche"],
            ["mines et énergie", "phosphates, or (Sabodala), zircon ; pétrole (Sangomar, depuis 2024) et gaz"],
            ["services", "port de Dakar, télécommunications, tourisme, transferts des émigrés"],
          ])}
          ${liste([
            "problèmes : chômage des jeunes, déficit commercial, dette, inégalités entre Dakar et l’intérieur ;",
            "politiques : Plan Sénégal émergent (2014), grands projets (pôle urbain de Diamniadio, Train express régional, autoroutes), puis l’agenda « Sénégal 2050 » (2024).",
          ])}
          ${retenir("Le défi est de faire profiter toute la population des nouvelles ressources (pétrole, gaz) et de développer une économie plus transformatrice.")}`,
      },
    ],
  },
];
