// Histoire-géographie de Terminale, commune à toutes les séries : programmes d'histoire (19 leçons)
// et de géographie (18 leçons) du second cycle, mis en ligne par l'Office du Bac. Un chapitre
// regroupe les leçons d'une partie du programme. Leçons rédigées par DIANGAL, à faire valider par un
// professeur d'histoire-géographie.

import { auBac, type ChapterSpec, exercice, liste, objectifs, retenir, tableau } from "./blocks";

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
        minutes: 30,
        body: `${objectifs([
            "dresser le bilan humain, matériel et politique de la Seconde Guerre mondiale ;",
            "présenter les règlements du conflit et la naissance de l’ONU.",
          ])}
          ${tableau([
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
          ${retenir("La guerre se termine par la défaite de l’Allemagne (8 mai 1945) puis du Japon (2 septembre 1945), après les bombes atomiques sur Hiroshima et Nagasaki.")}
          ${tableau([
            ["Organe de l’ONU", "Rôle"],
            ["Assemblée générale", "tous les États membres, une voix chacun ; recommandations"],
            ["Conseil de sécurité", "15 membres dont 5 permanents avec droit de veto (États-Unis, URSS puis Russie, Royaume-Uni, France, Chine) ; maintien de la paix"],
            ["Secrétariat général", "administration de l’organisation"],
            ["agences spécialisées", "UNESCO, OMS, FAO, UNICEF…"],
          ])}
          ${exercice(
            "Sujet de dissertation : « En quoi l’année 1945 marque-t-elle un tournant dans l’histoire du monde ? »",
            [
              "<strong>Introduction</strong> : fin de la guerre la plus meurtrière de l’histoire (mai et septembre 1945) ; problème : quels changements durables naissent de cette guerre ?",
              "<strong>I. Un monde dévasté</strong> : bilan humain (50 millions de morts, génocide), destructions, découverte des camps, bombes atomiques.",
              "<strong>II. Un nouvel ordre international</strong> : Yalta et Potsdam, partage de l’Allemagne, Nuremberg, création de l’ONU (droit des peuples, droits de l’homme).",
              "<strong>III. Un nouveau rapport de forces</strong> : déclin de l’Europe, montée des deux superpuissances, ébranlement des empires coloniaux (Thiaroye 1944, Sétif 1945).",
              "<strong>Conclusion</strong> : 1945 ouvre à la fois la guerre froide et la décolonisation.",
            ],
            "Sujet corrigé",
          )}`,
      },
      {
        title: "Les relations Est-Ouest : de la guerre froide à la chute du mur",
        minutes: 35,
        body: `${objectifs([
            "décrire la formation des deux blocs et leurs idéologies ;",
            "analyser les grandes crises (Berlin, Corée, Cuba) ;",
            "expliquer le passage de la détente à la fin de la guerre froide.",
          ])}
          <p>La <strong>guerre froide</strong> est l’affrontement indirect entre deux blocs, sans conflit armé direct entre les États-Unis et l’URSS.</p>
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
          ])}
          ${exercice(
            "Commentaire de document : « De Stettin dans la Baltique jusqu’à Trieste dans l’Adriatique, un rideau de fer est descendu à travers le continent. » (Winston Churchill, discours de Fulton, 5 mars 1946). Présente le document, explique l’expression « rideau de fer » et montre sa portée.",
            [
              "<strong>Présentation</strong> : discours de Churchill, ancien Premier ministre britannique, prononcé aux États-Unis en présence du président Truman, un an après la fin de la guerre.",
              "<strong>Explication</strong> : le « rideau de fer » désigne la coupure entre l’Europe de l’Ouest, libérale, et l’Europe de l’Est, contrôlée par l’URSS (démocraties populaires).",
              "<strong>Portée</strong> : ce discours annonce la guerre froide ; la division sera concrétisée par les doctrines Truman et Jdanov (1947), le blocus de Berlin (1948) puis le mur (1961).",
            ],
            "Exercice corrigé",
          )}
          ${auBac("Pour un commentaire de document, suis toujours trois temps : présenter (nature, auteur, date, contexte), expliquer les idées à l’aide de tes connaissances, puis montrer la portée et les limites du document.")}`,
      },
      {
        title: "La Chine de 1945 aux années 1990",
        minutes: 30,
        body: `${objectifs([
            "retracer les grandes étapes de l’histoire de la Chine populaire ;",
            "expliquer le passage du maoïsme aux réformes de Deng Xiaoping.",
          ])}
          ${tableau([
            ["Période", "Faits essentiels"],
            ["1945-1949", "guerre civile entre communistes (Mao Zedong) et nationalistes (Tchang Kaï-chek) ; la République populaire est proclamée le 1<sup>er</sup> octobre 1949"],
            ["1949-1958", "réforme agraire, alliance avec l’URSS, premier plan quinquennal"],
            ["1958-1960", "« Grand Bond en avant » : échec et famine meurtrière"],
            ["1966-1976", "Révolution culturelle : gardes rouges, culte de Mao"],
            ["à partir de 1978", "Deng Xiaoping : « quatre modernisations », ouverture économique, zones économiques spéciales"],
          ])}
          ${retenir("La Chine s’ouvre à l’économie de marché tout en gardant le monopole politique du Parti communiste : la répression de la place Tian’anmen (1989) le montre.")}
          ${exercice(
            "Sujet de dissertation : « La Chine de 1949 aux années 1990 : continuités et ruptures ».",
            [
              "<strong>Introduction</strong> : proclamation de la République populaire par Mao (1<sup>er</sup> octobre 1949) ; problème : la Chine a-t-elle changé de modèle tout en gardant son régime ?",
              "<strong>I. Le temps de Mao (1949-1976)</strong> : modèle soviétique, puis voie chinoise (Grand Bond en avant, Révolution culturelle) ; rupture sino-soviétique (1960).",
              "<strong>II. Les réformes de Deng Xiaoping (depuis 1978)</strong> : quatre modernisations, décollectivisation, zones économiques spéciales, ouverture aux capitaux étrangers.",
              "<strong>III. Une continuité politique</strong> : monopole du Parti communiste, répression de Tian’anmen (1989).",
              "<strong>Conclusion</strong> : une rupture économique majeure dans la continuité du pouvoir communiste.",
            ],
            "Sujet corrigé",
          )}`,
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
        minutes: 30,
        body: `${objectifs([
            "distinguer causes internes, causes liées à la guerre et causes internationales ;",
            "illustrer chaque cause par des exemples précis.",
          ])}
          ${tableau([
            ["Causes", "Exemples"],
            ["internes aux colonies", "mouvements nationalistes, élites formées à l’école occidentale, syndicats, partis politiques"],
            ["liées à la guerre", "défaites des métropoles (France en 1940), participation des colonisés à la guerre, promesses (conférence de Brazzaville, 1944)"],
            ["internationales", "Charte de l’Atlantique (1941) et Charte de l’ONU (droit des peuples à disposer d’eux-mêmes) ; États-Unis et URSS hostiles au colonialisme"],
            ["idéologiques", "panafricanisme, négritude, marxisme"],
          ])}
          ${retenir("La décolonisation est l’accession à l’indépendance des peuples colonisés, surtout entre 1945 et 1975.")}
          ${exercice(
            "Sujet de dissertation : « Les causes de la décolonisation après 1945 ».",
            [
              "<strong>Introduction</strong> : définition de la décolonisation ; entre 1945 et 1975, la plupart des colonies deviennent indépendantes ; problème : pourquoi ce mouvement après 1945 ?",
              "<strong>I. Les causes internes</strong> : élites instruites, partis et syndicats (RDA, BDS), nationalisme, injustices coloniales (travail forcé, indigénat).",
              "<strong>II. L’impact de la guerre</strong> : affaiblissement des métropoles, rôle des tirailleurs, promesses de Brazzaville, massacres (Thiaroye, Sétif) qui radicalisent.",
              "<strong>III. Le contexte international</strong> : Charte de l’ONU, anticolonialisme des États-Unis et de l’URSS, conférence de Bandoeng, exemple des premières indépendances (Inde, Ghana).",
              "<strong>Conclusion</strong> : la décolonisation résulte de la conjonction de ces causes.",
            ],
            "Sujet corrigé",
          )}`,
      },
      {
        title: "Les formes de la décolonisation",
        minutes: 25,
        body: `${objectifs([
            "distinguer décolonisation négociée et décolonisation par la guerre ;",
            "expliquer les facteurs qui déterminent la forme de la décolonisation.",
          ])}
          ${tableau([
            ["Forme", "Exemples"],
            ["négociée, pacifique", "Gold Coast (Ghana, 1957), la plupart des colonies françaises d’Afrique noire (1960)"],
            ["non-violente avec mobilisation de masse", "Inde (Gandhi)"],
            ["guerre de libération", "Indochine, Algérie, Guinée-Bissau, Angola, Mozambique"],
          ])}
          ${retenir("La forme dépend de la politique de la métropole (Royaume-Uni plus souple, France et Portugal plus attachés à leurs colonies), du nombre de colons et de la force des mouvements nationalistes.")}
          ${exercice(
            "Question de synthèse : pourquoi la décolonisation de l’Afrique noire française a-t-elle été plutôt pacifique, alors que celle de l’Algérie s’est faite par la guerre ?",
            [
              "En Afrique noire, peu de colons européens, des élites intégrées au jeu politique (députés à Paris, loi-cadre de 1956) et une France prête à négocier après la guerre d’Indochine : indépendances de 1960.",
              "En Algérie, un million de colons, considérée comme une partie de la France (trois départements) : refus de l’indépendance, insurrection du FLN en 1954, guerre jusqu’en 1962.",
              "La forme de la décolonisation dépend donc du poids des colons, de l’attitude de la métropole et de la stratégie des mouvements nationalistes.",
            ],
            "Exercice corrigé",
          )}`,
      },
      {
        title: "Bandoeng et l’émergence du tiers-monde",
        minutes: 25,
        body: `${objectifs([
            "présenter la conférence de Bandoeng et ses principes ;",
            "définir le tiers-monde et le non-alignement.",
          ])}
          <p>En avril 1955, 29 pays d’Asie et d’Afrique se réunissent à <strong>Bandoeng</strong> (Indonésie), autour de Nehru, Nasser, Zhou Enlai et Soekarno.</p>
          ${liste([
            "ils condamnent le colonialisme et le racisme ;",
            "ils affirment le droit des peuples à disposer d’eux-mêmes et la coexistence pacifique ;",
            "ils annoncent le <strong>non-alignement</strong>, officialisé à Belgrade en 1961 : refus de choisir entre les deux blocs.",
          ])}
          ${retenir("Le terme « tiers-monde » (Alfred Sauvy, 1952) désigne les pays pauvres, souvent anciennement colonisés, qui revendiquent un nouvel ordre économique mondial.")}
          ${exercice(
            "Question de cours : quelle est la portée de la conférence de Bandoeng (1955) ?",
            [
              "Elle marque l’entrée des peuples d’Asie et d’Afrique sur la scène internationale : ils parlent d’une seule voix contre le colonialisme et le racisme.",
              "Elle encourage les mouvements de libération encore colonisés (Afrique du Nord, Afrique noire).",
              "Elle prépare le non-alignement (Belgrade, 1961) et les revendications d’un nouvel ordre économique international dans les années 1970.",
            ],
            "Exercice corrigé",
          )}`,
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
        minutes: 35,
        body: `${objectifs([
            "comparer deux décolonisations asiatiques ;",
            "expliquer le rôle de Gandhi et celui de Hô Chi Minh.",
          ])}
          <h2>L’Inde</h2>
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
          ${retenir("L’Inde illustre une décolonisation négociée sous la pression d’un mouvement de masse ; l’Indochine, une décolonisation par la guerre, mêlée à la guerre froide.")}
          ${exercice(
            "Sujet de dissertation : « La décolonisation de l’Inde et de l’Indochine : deux voies différentes ».",
            [
              "<strong>Introduction</strong> : deux grandes colonies d’Asie, britannique et française ; problème : pourquoi des voies si différentes ?",
              "<strong>I. L’Inde, une indépendance négociée sous la pression des masses</strong> : Congrès, Gandhi et la non-violence, Royaume-Uni affaibli, indépendance de 1947 mais partition sanglante.",
              "<strong>II. L’Indochine, une indépendance arrachée par la guerre</strong> : Viêt-minh communiste, refus français, Diên Biên Phu (1954), accords de Genève.",
              "<strong>III. Deux décolonisations aux conséquences durables</strong> : conflit indo-pakistanais ; guerre du Viêt Nam liée à la guerre froide.",
              "<strong>Conclusion</strong> : l’attitude de la métropole et le contexte international expliquent ces différences.",
            ],
            "Sujet corrigé",
          )}`,
      },
      {
        title: "La question palestinienne et les relations israélo-arabes",
        minutes: 35,
        body: `${objectifs([
            "retracer les grandes étapes du conflit depuis 1947 ;",
            "identifier les enjeux du conflit.",
          ])}
          ${tableau([
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
          ${retenir("Le conflit oppose deux peuples sur la même terre ; il est aggravé par les enjeux religieux (Jérusalem), la question des réfugiés, des colonies et de l’eau, et par la guerre froide.")}
          ${exercice(
            "Question de synthèse : pourquoi le conflit israélo-palestinien est-il si difficile à résoudre ?",
            [
              "Deux peuples revendiquent la même terre ; la création d’Israël (1948) s’accompagne de l’exode des Palestiniens, dont les descendants sont toujours réfugiés.",
              "Les guerres (1948, 1967, 1973) ont modifié les frontières : occupation de la Cisjordanie et de Gaza, colonies, statut de Jérusalem, lieu saint pour trois religions.",
              "Les accords (Camp David, Oslo) n’ont pas abouti à deux États ; violences, divisions politiques et ingérences étrangères bloquent la paix. L’ONU affirme le droit des Palestiniens à un État.",
            ],
            "Exercice corrigé",
          )}`,
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
        minutes: 30,
        body: `${objectifs([
            "expliquer pourquoi la décolonisation de l’Algérie s’est faite par la guerre ;",
            "retracer les étapes de la guerre d’Algérie (1954-1962).",
          ])}
          ${liste([
            "l’Algérie compte environ un million de colons européens ; les « Algériens musulmans » n’ont pas l’égalité des droits ;",
            "8 mai 1945 : la répression des manifestations de Sétif et Guelma fait des milliers de morts ;",
            "1<sup>er</sup> novembre 1954 : le FLN déclenche l’insurrection (« Toussaint rouge ») ;",
            "guerre très violente (torture, attentats), crise politique en France et retour du général de Gaulle (1958) ;",
            "accords d’Évian (18 mars 1962), puis indépendance le 5 juillet 1962.",
          ])}
          ${retenir("La guerre d’Algérie a eu des répercussions en Afrique noire : des soldats africains y ont combattu, et elle a accéléré la décolonisation négociée des autres territoires français.")}
          ${exercice(
            "Sujet de dissertation : « La guerre d’Algérie (1954-1962) : causes, déroulement et conséquences ».",
            [
              "<strong>I. Les causes</strong> : colonisation de peuplement, inégalités entre colons et Algériens musulmans, répression de Sétif (1945), échec des réformes.",
              "<strong>II. Le déroulement</strong> : Toussaint rouge (1954), guérilla du FLN et répression, bataille d’Alger (1957), retour de De Gaulle (1958), autodétermination, accords d’Évian (1962).",
              "<strong>III. Les conséquences</strong> : indépendance (5 juillet 1962), exode des pieds-noirs, fin de la IV<sup>e</sup> République en France, accélération des indépendances africaines.",
            ],
            "Sujet corrigé",
          )}`,
      },
      {
        title: "La Gold Coast, première colonie d’Afrique noire indépendante",
        minutes: 20,
        body: `${objectifs([
            "expliquer le processus qui conduit la Gold Coast à l’indépendance ;",
            "montrer le rôle de Kwame Nkrumah et la portée de l’événement.",
          ])}
          ${liste([
            "colonie britannique riche en cacao et en or, avec une élite instruite ;",
            "Kwame Nkrumah fonde le Convention People’s Party (1949) et lance l’« action positive » (grèves, boycotts) ;",
            "le Royaume-Uni accorde l’autonomie, puis l’indépendance le 6 mars 1957 : la Gold Coast devient le <strong>Ghana</strong>.",
          ])}
          ${retenir("Nkrumah, panafricaniste, voit dans l’indépendance du Ghana une étape vers l’unité africaine ; elle sert d’exemple à tout le continent.")}
          ${exercice(
            "Question de cours : pourquoi l’indépendance du Ghana (6 mars 1957) est-elle un événement majeur pour l’Afrique ?",
            [
              "C’est la première colonie d’Afrique noire à devenir indépendante : elle montre que l’indépendance est possible.",
              "Nkrumah fait d’Accra un centre du panafricanisme (conférence des peuples africains, 1958) et soutient les autres mouvements.",
              "Elle accélère la marche des colonies voisines vers l’indépendance, dont les colonies françaises en 1960.",
            ],
            "Exercice corrigé",
          )}`,
      },
      {
        title: "Le Sénégal : de l’Union française à l’indépendance",
        minutes: 40,
        body: `${objectifs([
            "retracer les étapes politiques du Sénégal de 1944 à 1960 ;",
            "identifier les acteurs (Lamine Guèye, Senghor, Mamadou Dia) et les grandes réformes.",
          ])}
          ${tableau([
            ["Date", "Étape"],
            ["1944", "conférence de Brazzaville : promesse de réformes, mais pas d’indépendance ; massacre de tirailleurs à Thiaroye (1<sup>er</sup> décembre)"],
            ["1946", "loi Lamine Guèye : citoyenneté française pour les habitants des colonies ; abolition du travail forcé (loi Houphouët-Boigny)"],
            ["1948", "Senghor fonde le Bloc démocratique sénégalais (BDS)"],
            ["1956", "loi-cadre Defferre : suffrage universel, conseils de gouvernement"],
            ["1958", "référendum du 28 septembre : le Sénégal vote « oui » à la Communauté française"],
            ["1959", "Fédération du Mali avec le Soudan français"],
            ["1960", "indépendance de la Fédération (20 juin), éclatement (20 août) ; Senghor président de la République (septembre)"],
          ])}
          ${retenir("La fête de l’indépendance du Sénégal est célébrée le 4 avril, date de la signature des accords de transfert des compétences (1960). En décembre 1962, la crise entre Senghor et Mamadou Dia conduit au régime présidentiel.")}
          ${liste([
            "<strong>Lamine Guèye</strong> (1891-1968), avocat, maire de Dakar, député : la loi du 7 mai 1946 porte son nom ;",
            "<strong>Léopold Sédar Senghor</strong> (1906-2001), agrégé, poète de la négritude, député puis président de la République (1960-1980) ;",
            "<strong>Mamadou Dia</strong> (1910-2009), président du Conseil de gouvernement, chargé du développement économique ;",
            "les partis : BDS, puis UPS (1958) ; opposition du PAI, favorable à l’indépendance immédiate.",
          ])}
          ${exercice(
            "Sujet de dissertation : « Le Sénégal de 1944 à 1960 : de la colonie à l’État indépendant ».",
            [
              "<strong>Introduction</strong> : colonie la plus ancienne de l’AOF, avec les Quatre Communes ; problème : comment le Sénégal accède-t-il pacifiquement à l’indépendance ?",
              "<strong>I. Des réformes de l’après-guerre (1944-1956)</strong> : Brazzaville, Thiaroye, lois Lamine Guèye et Houphouët-Boigny, Union française, naissance du BDS.",
              "<strong>II. De l’autonomie à la Communauté (1956-1958)</strong> : loi-cadre Defferre, conseil de gouvernement, référendum de 1958.",
              "<strong>III. L’indépendance (1959-1960)</strong> : Fédération du Mali, accords du 4 avril 1960, indépendance (20 juin), éclatement de la Fédération (20 août), Senghor président.",
              "<strong>Conclusion</strong> : une décolonisation négociée, menée par une élite politique formée dans les institutions françaises.",
            ],
            "Sujet corrigé",
          )}
          ${auBac("Cette leçon est souvent au Bac : connais avec précision les dates (1944, 1946, 1956, 1958, 1959, 1960) et les noms des acteurs.")}`,
      },
      {
        title: "Guinée-Bissau et Angola : les luttes armées",
        minutes: 30,
        body: `${objectifs([
            "expliquer pourquoi les colonies portugaises ont dû mener des luttes armées ;",
            "présenter le rôle d’Amilcar Cabral et du PAIGC.",
          ])}
          <p>Le Portugal refuse toute décolonisation : les mouvements de libération prennent les armes.</p>
          ${liste([
            "<strong>Guinée-Bissau</strong> : le PAIGC d’Amilcar Cabral mène la guérilla à partir de 1963 ; Cabral est assassiné en janvier 1973 ; l’indépendance est proclamée en septembre 1973 et reconnue en 1974 ;",
            "<strong>Angola</strong> : lutte armée dès 1961 de trois mouvements rivaux (MPLA, FNLA, UNITA) ; indépendance le 11 novembre 1975, suivie d’une longue guerre civile.",
          ])}
          ${retenir("La « révolution des Œillets » au Portugal (25 avril 1974), provoquée en partie par l’usure des guerres coloniales, ouvre la voie aux indépendances des colonies portugaises.")}
          ${exercice(
            "Question de synthèse : quels liens peut-on établir entre les guerres coloniales africaines et la révolution des Œillets au Portugal ?",
            [
              "Le régime autoritaire de Salazar puis de Caetano refuse toute décolonisation et mène des guerres coûteuses en Angola, en Guinée-Bissau et au Mozambique (à partir de 1961-1964).",
              "Ces guerres épuisent l’armée et l’économie portugaises ; de jeunes officiers se révoltent et renversent le régime le 25 avril 1974.",
              "Le nouveau pouvoir reconnaît les indépendances : Guinée-Bissau (1974), Mozambique, Cap-Vert et Angola (1975). La lutte des colonisés a donc contribué à libérer le Portugal lui-même.",
            ],
            "Exercice corrigé",
          )}`,
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
        minutes: 20,
        body: `${objectifs([
            "définir civilisation et culture ;",
            "expliquer l’intérêt de l’étude des civilisations.",
          ])}
          <p>Une <strong>civilisation</strong> est l’ensemble des caractères communs (techniques, institutions, croyances, arts, valeurs) d’une société ou d’un groupe de sociétés, sur une longue durée.</p>
          ${liste([
            "on parle de <strong>culture</strong> pour un groupe plus restreint ;",
            "les civilisations sont à la fois uniques et en contact : elles échangent, s’influencent et évoluent ;",
            "la colonisation a longtemps nié l’existence de civilisations africaines ; des historiens comme Cheikh Anta Diop ou Joseph Ki-Zerbo ont montré leur ancienneté et leur richesse.",
          ])}
          ${retenir("Étudier les civilisations, c’est comprendre l’unité et la diversité du genre humain et ce qui fonde l’identité des peuples.")}
          ${exercice(
            "Question de cours : distingue civilisation et culture, et explique pourquoi l’étude des civilisations africaines a été un enjeu après la colonisation.",
            [
              "La culture désigne les manières de vivre, de penser et de créer d’un groupe ; la civilisation, un ensemble plus vaste de cultures apparentées sur une longue durée.",
              "La colonisation a présenté l’Afrique comme un continent « sans histoire » et sans civilisation pour justifier sa domination.",
              "Les historiens africains (Cheikh Anta Diop, Joseph Ki-Zerbo) ont montré la richesse et l’ancienneté des civilisations africaines : c’était un enjeu de dignité et d’identité.",
            ],
            "Exercice corrigé",
          )}`,
      },
      {
        title: "Cadre géographique et organisation des sociétés négro-africaines",
        minutes: 25,
        body: `${objectifs([
            "situer les civilisations négro-africaines dans l’espace et le temps ;",
            "décrire leur organisation sociale, politique et économique, avec des exemples sénégalais.",
          ])}
          <p>Les civilisations négro-africaines se sont développées au sud du Sahara, dans des milieux variés (savanes, forêts, sahel), avec une histoire ancienne (Nubie, empires du Ghana, du Mali, du Songhaï, royaumes du golfe de Guinée).</p>
          ${tableau([
            ["Domaine", "Caractères"],
            ["social", "famille élargie, lignage, classes d’âge ; dans plusieurs sociétés du Sénégal, hiérarchie entre hommes libres, groupes d’artisans et de griots, et captifs"],
            ["politique", "chefferies, royaumes et empires ; pouvoir souvent sacré mais encadré par des conseils (au Kajoor, le damel était élu par un collège de dignitaires)"],
            ["économique", "agriculture, élevage, pêche, artisanat, commerce à longue distance"],
          ])}
          ${retenir("La solidarité communautaire et le rôle de la parole (tradition orale, griots) sont des traits majeurs de ces civilisations.")}
          ${exercice(
            "Question de synthèse : montre, à partir d’exemples sénégalais, comment le pouvoir politique était organisé dans les royaumes traditionnels.",
            [
              "Au Kajoor et au Bawol, le souverain (damel, teeñ) était choisi au sein de lignages princiers par un collège de dignitaires, ce qui limitait son pouvoir.",
              "Au Waalo, le brak gouvernait avec le Seb Ak Baor (conseil) ; au Siin, le buur s’appuyait sur la noblesse guelwar.",
              "Le pouvoir avait une dimension sacrée et s’appuyait sur une hiérarchie sociale (hommes libres, castes d’artisans et de griots, captifs).",
            ],
            "Exercice corrigé",
          )}`,
      },
      {
        title: "Les religions traditionnelles africaines",
        minutes: 25,
        body: `${objectifs([
            "décrire les croyances et les rites des religions traditionnelles ;",
            "montrer leur rôle dans la vie sociale.",
          ])}
          ${liste([
            "croyance en un Dieu suprême créateur, souvent lointain (Roog chez les Sereer) ;",
            "culte des ancêtres, intermédiaires entre les vivants et le monde invisible ;",
            "génies et esprits liés à la nature (eau, arbres, terre) ;",
            "rites d’initiation, sacrifices, cérémonies de guérison (ndëpp chez les Lébous).",
          ])}
          ${retenir("Ces religions organisent toute la vie sociale : agriculture, naissance, mariage, mort, pouvoir. On parle parfois d’« animisme », terme qui en simplifie la richesse.")}
          ${exercice(
            "Question de synthèse : quelle place les religions traditionnelles occupent-elles dans la vie des sociétés africaines ?",
            [
              "Elles expliquent le monde : un Dieu créateur, des ancêtres et des génies qui agissent sur la vie des hommes.",
              "Elles rythment toute la vie : rites de naissance, initiation (circoncision, bois sacré en Casamance), mariage, funérailles, travaux agricoles.",
              "Elles fondent l’ordre social et politique : pouvoir sacré du roi, respect des anciens, règles de solidarité. Elles survivent aujourd’hui à côté de l’islam et du christianisme.",
            ],
            "Exercice corrigé",
          )}`,
      },
      {
        title: "L’évolution du monde négro-africain",
        minutes: 35,
        body: `${objectifs([
            "analyser l’influence de l’islam, du christianisme et de la colonisation ;",
            "illustrer par des exemples sénégalais.",
          ])}
          ${tableau([
            ["Influence", "Exemples au Sénégal"],
            ["islam", "islamisation ancienne (Tekrour, XI<sup>e</sup> siècle) ; confréries : Qadiriyya, Tidjaniyya (El Hadji Malick Sy), Mouridiyya (Cheikh Ahmadou Bamba, Touba), Layène (Seydina Limamou Laye)"],
            ["christianisme", "missions catholiques et protestantes, écoles ; pèlerinage marial de Popenguine"],
            ["colonisation et décolonisation", "école française, villes, économie de traite ; après 1960, construction de l’État-nation"],
          ])}
          ${retenir("Les civilisations africaines ont intégré ces apports en les adaptant : syncrétismes, coexistence religieuse, modernité qui garde des valeurs traditionnelles.")}
          ${exercice(
            "Sujet de dissertation : « L’islam et la société sénégalaise ».",
            [
              "<strong>Introduction</strong> : plus de 90 % des Sénégalais sont musulmans ; problème : comment l’islam s’est-il intégré à la société sénégalaise ?",
              "<strong>I. Une islamisation ancienne et progressive</strong> : Tekrour (XI<sup>e</sup> siècle), commerce, marabouts, révolutions maraboutiques (XVIII<sup>e</sup>-XIX<sup>e</sup> siècles), résistance à la colonisation.",
              "<strong>II. Le rôle des confréries</strong> : Qadiriyya, Tidjaniyya, Mouridiyya, Layène ; foyers religieux (Tivaouane, Touba, Ndiassane, Cambérène), éducation, économie (arachide).",
              "<strong>III. Un islam sénégalais original</strong> : adaptation aux cultures locales, tolérance et coexistence avec le christianisme, place dans la vie politique et sociale.",
              "<strong>Conclusion</strong> : l’islam est devenu un élément central de l’identité sénégalaise.",
            ],
            "Sujet corrigé",
          )}`,
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
        minutes: 25,
        body: `${objectifs([
            "décrire l’Arabie préislamique ;",
            "retracer la vie du Prophète et les débuts de l’islam.",
          ])}
          ${liste([
            "l’Arabie préislamique : tribus nomades et sédentaires, commerce caravanier, La Mecque et sa Kaaba, majoritairement polythéiste ;",
            "Muhammad (Mahomet), né vers 570 à La Mecque, reçoit la révélation vers 610 ;",
            "persécuté, il émigre à Médine en 622 : c’est l’<strong>hégire</strong>, point de départ du calendrier musulman ;",
            "il revient à La Mecque en 630 ; à sa mort (632), l’Arabie est unifiée autour de l’islam.",
          ])}
          ${retenir("L’islam est une religion monothéiste : « islam » signifie soumission à Dieu (Allah).")}
          ${exercice(
            "Question de cours : explique l’importance de l’hégire (622).",
            [
              "Persécuté à La Mecque par les commerçants qurayshites hostiles à son message, le Prophète émigre à Médine avec ses compagnons.",
              "À Médine, il organise la première communauté musulmane (umma), à la fois religieuse et politique.",
              "L’hégire marque le début de l’expansion de l’islam ; elle est le point de départ du calendrier musulman.",
            ],
            "Exercice corrigé",
          )}`,
      },
      {
        title: "Le Coran et les fondements de l’islam",
        minutes: 25,
        body: `${objectifs([
            "présenter le Coran et la Sunna ;",
            "énoncer et expliquer les cinq piliers de l’islam.",
          ])}
          <p>Le <strong>Coran</strong> (114 sourates) est, pour les musulmans, la parole de Dieu révélée au Prophète. La <strong>Sunna</strong> (tradition du Prophète, rapportée par les hadiths) le complète.</p>
          ${tableau([
            ["Les cinq piliers", ""],
            ["chahada", "profession de foi"],
            ["salat", "cinq prières quotidiennes"],
            ["zakat", "aumône légale"],
            ["sawm", "jeûne du mois de Ramadan"],
            ["hajj", "pèlerinage à La Mecque, une fois dans sa vie si on le peut"],
          ])}
          ${retenir("Le droit musulman (charia) s’appuie sur le Coran, la Sunna, le consensus et le raisonnement des juristes.")}
          ${exercice(
            "Question de synthèse : montre que les cinq piliers organisent à la fois la vie du croyant et la vie de la communauté.",
            [
              "La chahada et la prière fondent la relation personnelle du croyant avec Dieu ; la prière collective du vendredi rassemble la communauté.",
              "La zakat organise la solidarité envers les pauvres ; le jeûne du Ramadan est vécu en commun.",
              "Le hajj réunit chaque année à La Mecque des musulmans du monde entier : il exprime l’unité de la umma.",
            ],
            "Exercice corrigé",
          )}`,
      },
      {
        title: "La constitution du monde musulman",
        minutes: 30,
        body: `${objectifs([
            "retracer l’expansion de l’islam de 632 au XIII<sup>e</sup> siècle ;",
            "décrire l’organisation politique du monde musulman (califat).",
          ])}
          ${tableau([
            ["Période", "Faits essentiels"],
            ["632-661", "califes « bien guidés » (Abou Bakr, Omar, Othman, Ali) : conquête de la Syrie, de l’Égypte, de la Perse"],
            ["661-750", "Omeyyades (capitale Damas) : expansion de l’Espagne à l’Indus"],
            ["750-1258", "Abbassides (capitale Bagdad) : apogée culturel ; puis morcellement du monde musulman"],
          ])}
          ${liste([
            "l’islam gagne l’Afrique du Nord, puis l’Afrique de l’Ouest par le commerce transsaharien et les Almoravides ;",
            "les « gens du Livre » (juifs, chrétiens) sont protégés (dhimmis) moyennant un impôt.",
          ])}
          ${exercice(
            "Question de synthèse : comment l’islam s’est-il diffusé en Afrique de l’Ouest ?",
            [
              "Par le commerce transsaharien : marchands berbères et arabes (or, sel, esclaves) installés dans les villes du Sahel (Aoudaghost, Koumbi Saleh).",
              "Par la conversion des souverains (Tekrour au XI<sup>e</sup> siècle, Mali avec le pèlerinage de Kankou Moussa en 1324) et l’action des Almoravides.",
              "Puis par les lettrés, les marabouts et les confréries, qui ont islamisé les campagnes, surtout aux XVIII<sup>e</sup> et XIX<sup>e</sup> siècles.",
            ],
            "Exercice corrigé",
          )}`,
      },
      {
        title: "La culture musulmane",
        minutes: 25,
        body: `${objectifs([
            "présenter les apports de la civilisation musulmane dans les sciences, la pensée et les arts ;",
            "montrer le rôle de Tombouctou en Afrique de l’Ouest.",
          ])}
          ${tableau([
            ["Domaine", "Exemples"],
            ["sciences", "al-Khwarizmi (algèbre), chiffres dits « arabes » venus de l’Inde, astronomie, médecine d’Avicenne (Ibn Sina)"],
            ["philosophie et histoire", "Averroès (Ibn Rushd), commentateur d’Aristote ; Ibn Khaldoun, penseur de l’histoire"],
            ["arts", "architecture des mosquées (Kairouan, Cordoue), calligraphie, arabesques"],
            ["en Afrique de l’Ouest", "Tombouctou et ses manuscrits, Djenné"],
          ])}
          ${retenir("Le monde musulman a transmis à l’Europe une partie du savoir grec et indien, enrichi par ses propres découvertes.")}
          ${exercice(
            "Question de synthèse : pourquoi peut-on dire que la civilisation musulmane a été un relais entre les savoirs de l’Antiquité et l’Europe ?",
            [
              "Les savants musulmans ont traduit en arabe les œuvres grecques (Aristote, Ptolémée, Galien) et recueilli les mathématiques indiennes (chiffres, zéro).",
              "Ils les ont enrichies : algèbre d’al-Khwarizmi, médecine d’Avicenne, philosophie d’Averroès, optique d’Ibn al-Haytham.",
              "Ces savoirs sont passés en Europe par l’Espagne (Tolède, Cordoue) et la Sicile, et ont nourri la Renaissance européenne.",
            ],
            "Exercice corrigé",
          )}`,
      },
      {
        title: "Unité et diversité du monde musulman",
        minutes: 30,
        body: `${objectifs([
            "distinguer les grandes tendances historiques (sunnites, chiites, kharijites) et les écoles juridiques ;",
            "présenter les tendances et les organisations actuelles.",
          ])}
          ${tableau([
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
          ${retenir("Unité de la foi et des pratiques ; diversité des courants, des cultures et des États.")}
          ${exercice(
            "Sujet de dissertation : « Unité et diversité du monde musulman ».",
            [
              "<strong>I. L’unité</strong> : un même Dieu, un même livre (le Coran), les cinq piliers, l’arabe langue du culte, La Mecque.",
              "<strong>II. La diversité historique</strong> : sunnites, chiites et kharijites, nés de la question de la succession du Prophète ; quatre écoles juridiques sunnites (malikite en Afrique de l’Ouest).",
              "<strong>III. La diversité actuelle</strong> : réformisme et islamisme ; diversité des États et des cultures ; organisations communes (Ligue islamique mondiale, OCI) qui cherchent l’unité.",
            ],
            "Sujet corrigé",
          )}`,
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
        minutes: 30,
        body: `${objectifs([
            "définir la mondialisation et le système-monde ;",
            "identifier les pôles, les flux et les acteurs de la mondialisation ;",
            "situer l’Afrique et le Sénégal dans la mondialisation.",
          ])}
          <p>La <strong>mondialisation</strong> est la mise en relation des différentes parties du monde par les échanges de marchandises, de capitaux, d’informations et de personnes. Elle forme un <strong>système-monde</strong> où tout est lié.</p>
          ${liste([
            "trois grands pôles (la Triade) : Amérique du Nord, Union européenne, Asie orientale (Japon, Chine) ;",
            "des <strong>espaces-blocs</strong> : regroupements régionaux (UE, ACEUM/ALENA, ASEAN, CEDEAO, Union africaine, ZLECAf) ;",
            "des acteurs : États, firmes multinationales, organisations internationales (OMC, FMI, Banque mondiale), ONG.",
          ])}
          ${retenir("L’interdépendance crée des richesses mais aussi des inégalités : une crise dans un pôle (2008, Covid-19) touche le monde entier. L’Afrique reste en marge, mais ses ressources et sa population en font un enjeu croissant.")}
          ${exercice(
            "Sujet de dissertation : « L’Afrique dans la mondialisation ».",
            [
              "<strong>Introduction</strong> : définir mondialisation ; problème : l’Afrique est-elle marginalisée ou de plus en plus intégrée ?",
              "<strong>I. Un continent en marge</strong> : moins de 3 % du commerce mondial, exportation de matières premières brutes, dépendance aux capitaux étrangers.",
              "<strong>II. Une intégration croissante</strong> : ressources convoitées (pétrole, gaz, minerais), investissements chinois, turcs, européens ; ports et corridors ; diaspora et transferts d’argent ; téléphonie mobile.",
              "<strong>III. Des atouts pour mieux s’insérer</strong> : population jeune, intégration régionale (ZLECAf, CEDEAO), transformation locale des produits.",
              "<strong>Conclusion</strong> : l’Afrique n’est plus à l’écart, mais son insertion reste inégale et dépendante.",
            ],
            "Sujet corrigé",
          )}
          ${auBac("En géographie, appuie chaque idée sur un exemple localisé et, si possible, un chiffre ; un croquis simple (pôles, flux) valorise la copie.")}`,
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
        minutes: 25,
        body: `${objectifs([
            "décrire les milieux naturels de l’Amérique du Nord ;",
            "montrer comment l’homme exploite les atouts et surmonte les contraintes.",
          ])}
          ${tableau([
            ["Atouts", "Handicaps"],
            ["immensité (plus de 21 millions de km² pour les États-Unis, le Canada et le Mexique)", "froid du Grand Nord canadien, déserts de l’Ouest"],
            ["grandes plaines fertiles du centre", "catastrophes naturelles : ouragans, tornades, séismes (Californie)"],
            ["ressources minières et énergétiques abondantes (pétrole, gaz, charbon, fer)", "sécheresses et incendies"],
            ["fleuves navigables (Mississippi, Saint-Laurent), Grands Lacs, deux façades maritimes", ""],
          ])}
          ${retenir("Grâce à la technique et aux capitaux, les Nord-Américains ont su exploiter ces atouts et réduire les contraintes (irrigation de la Californie).")}
          ${exercice(
            "Question de synthèse : montre que la nature offre plus d’atouts que de handicaps à l’Amérique du Nord.",
            [
              "Atouts : immensité, plaines fertiles (Corn Belt, prairies canadiennes), ressources du sous-sol, réseaux fluviaux et deux façades océaniques.",
              "Handicaps : froid du Nord, aridité de l’Ouest, catastrophes naturelles (ouragans en Floride et en Louisiane, séismes en Californie).",
              "Les moyens techniques et financiers (irrigation, barrages, normes antisismiques) permettent de valoriser les atouts et de réduire les contraintes.",
            ],
            "Exercice corrigé",
          )}`,
      },
      {
        title: "Populations, villes et sociétés",
        minutes: 30,
        body: `${objectifs([
            "décrire le peuplement et la répartition de la population nord-américaine ;",
            "analyser l’urbanisation et les problèmes sociaux.",
          ])}
          ${liste([
            "une population formée par l’immigration : peuples autochtones, Européens, Africains déportés par la traite, Latino-Américains, Asiatiques ;",
            "États-Unis : environ 335 millions d’habitants ; Canada : environ 40 millions ; Mexique : environ 130 millions ;",
            "une population très urbanisée : mégalopoles (Boston-Washington, Grands Lacs), métropoles du Sud et de l’Ouest (Sun Belt) ;",
            "des problèmes sociaux : inégalités, ghettos, discriminations raciales, immigration clandestine à la frontière mexicaine.",
          ])}
          ${retenir("Le « melting-pot » américain mêle intégration et persistance des communautés ; le mouvement pour les droits civiques (Martin Luther King) a fait reculer la ségrégation dans les années 1960.")}
          ${exercice(
            "Question de synthèse : quels sont les problèmes sociaux des grandes villes des États-Unis ?",
            [
              "Ségrégation spatiale : ghettos des centres anciens, banlieues aisées (suburbs), quartiers fermés (gated communities).",
              "Inégalités de revenus et de logement, sans-abri, criminalité dans certains quartiers.",
              "Problèmes d’étalement urbain : dépendance à l’automobile, embouteillages, pollution.",
            ],
            "Exercice corrigé",
          )}`,
      },
      {
        title: "La construction de l’espace économique nord-américain",
        minutes: 25,
        body: `${objectifs([
            "présenter l’ALENA puis l’ACEUM ;",
            "analyser les relations entre les trois pays.",
          ])}
          <p>L’ALENA (1994), remplacé par l’ACEUM (2020), a créé une zone de libre-échange entre les États-Unis, le Canada et le Mexique.</p>
          ${liste([
            "les États-Unis dominent par leur poids économique ;",
            "le Canada fournit énergie, minerais et produits agricoles ;",
            "le Mexique offre une main-d’œuvre bon marché : usines d’assemblage (maquiladoras) le long de la frontière.",
          ])}
          ${retenir("L’intégration est surtout économique : elle n’a pas d’institutions politiques communes comme l’Union européenne.")}
          ${exercice(
            "Question de synthèse : montre que l’intégration nord-américaine est dominée par les États-Unis.",
            [
              "Les États-Unis réalisent l’essentiel de la richesse de la zone ; ils sont le premier client et le premier fournisseur du Canada et du Mexique.",
              "Leurs entreprises investissent au Mexique (maquiladoras) et au Canada (énergie, mines).",
              "Ils imposent leurs conditions lors des renégociations (ACEUM, 2020) et contrôlent la frontière face aux migrations.",
            ],
            "Exercice corrigé",
          )}`,
      },
      {
        title: "Le modèle économique américain",
        minutes: 35,
        body: `${objectifs([
            "dégager les caractères du modèle économique américain ;",
            "évaluer ses forces et ses faiblesses.",
          ])}
          ${tableau([
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
          ])}
          ${exercice(
            "Sujet de dissertation : « Les États-Unis, première puissance économique du monde : forces et faiblesses ».",
            [
              "<strong>I. Les fondements de la puissance</strong> : vastes ressources, population nombreuse et formée, libéralisme, innovation, capitaux.",
              "<strong>II. Une puissance dans tous les secteurs</strong> : agriculture productiviste, industries de pointe, services (finance, numérique), rayonnement mondial (dollar, culture, armée).",
              "<strong>III. Des faiblesses</strong> : dette et déficit commercial, inégalités, concurrence chinoise, pollution et consommation d’énergie.",
              "<strong>Conclusion</strong> : une puissance encore dominante, mais de plus en plus concurrencée dans un monde multipolaire.",
            ],
            "Sujet corrigé",
          )}`,
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
        minutes: 25,
        body: `${objectifs([
            "décrire les milieux naturels de l’Europe ;",
            "présenter les caractères de sa population et les migrations.",
          ])}
          ${liste([
            "milieux tempérés majoritaires, avec des nuances océaniques, continentales, méditerranéennes, montagnardes ;",
            "un relief varié (plaines du Nord, Alpes) et des littoraux très découpés ;",
            "une population nombreuse (environ 450 millions dans l’UE), vieillissante, avec une faible fécondité ;",
            "l’Europe est devenue une terre d’immigration, notamment africaine : la question migratoire est un enjeu politique majeur.",
          ])}
          ${retenir("La « dorsale européenne », de Londres à Milan, concentre les hommes et les activités.")}
          ${exercice(
            "Question de synthèse : pourquoi l’Europe est-elle devenue une terre d’immigration ?",
            [
              "Sa population vieillit et sa fécondité est faible : elle manque de main-d’œuvre dans certains secteurs.",
              "Elle est riche et offre de meilleures conditions de vie que les pays d’origine des migrants (Afrique, Asie).",
              "Les liens historiques (colonisation, langue) orientent les migrations : les Sénégalais vers la France, l’Italie, l’Espagne.",
            ],
            "Exercice corrigé",
          )}`,
      },
      {
        title: "La construction européenne : réalités et perspectives",
        minutes: 30,
        body: `${objectifs([
            "retracer les étapes de la construction européenne ;",
            "évaluer les réalités et les limites de l’Union européenne.",
          ])}
          ${tableau([
            ["Date", "Étape"],
            ["1951", "CECA (charbon et acier) entre six pays"],
            ["1957", "traité de Rome : Communauté économique européenne (marché commun)"],
            ["1992", "traité de Maastricht : Union européenne"],
            ["1999-2002", "l’euro, monnaie unique"],
            ["2004-2013", "élargissements à l’Est"],
            ["2020", "sortie du Royaume-Uni (Brexit) : l’UE compte 27 membres"],
          ])}
          ${retenir("L’UE est la première puissance commerciale du monde, mais elle reste divisée sur la politique étrangère, la défense et les migrations. L’Afrique est liée à l’UE par des accords de partenariat.")}
          ${exercice(
            "Sujet de dissertation : « L’Union européenne : une puissance inachevée ».",
            [
              "<strong>I. Une construction progressive</strong> : CECA, traité de Rome, Maastricht, euro, élargissements.",
              "<strong>II. Une grande puissance économique</strong> : premier marché du monde, monnaie forte, politiques communes (agriculture, régions), aide au développement.",
              "<strong>III. Une puissance inachevée</strong> : divisions politiques, Brexit, faiblesse de la défense commune, désaccords sur les migrations.",
            ],
            "Sujet corrigé",
          )}`,
      },
      {
        title: "La France et l’Allemagne : deux puissances de l’Union européenne",
        minutes: 25,
        body: `${objectifs([
            "présenter les atouts et les faiblesses de la France et de l’Allemagne ;",
            "expliquer leur rôle dans l’Union européenne.",
          ])}
          ${tableau([
            ["", "France", "Allemagne"],
            ["population", "environ 68 millions", "environ 84 millions, la plus peuplée de l’UE"],
            ["points forts", "agriculture (premier producteur de l’UE), aéronautique, nucléaire, tourisme, luxe", "industrie (automobile, machines, chimie), premier exportateur de l’UE"],
            ["faiblesses", "chômage, dette publique", "vieillissement, dépendance énergétique"],
          ])}
          ${retenir("Le « couple franco-allemand » est le moteur de la construction européenne. Le programme laisse au professeur le choix d’étudier l’un ou l’autre pays.")}
          ${exercice(
            "Question de synthèse : pourquoi parle-t-on de « couple franco-allemand » dans la construction européenne ?",
            [
              "Anciens ennemis (trois guerres entre 1870 et 1945), la France et l’Allemagne se réconcilient (traité de l’Élysée, 1963).",
              "Ce sont les deux premières économies de l’UE ; leurs accords entraînent les autres pays (euro, élargissements).",
              "Ils restent cependant concurrents et parfois en désaccord (énergie, défense, budget).",
            ],
            "Exercice corrigé",
          )}`,
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
        minutes: 30,
        body: `${objectifs([
            "expliquer les facteurs de l’émergence de l’Asie-Pacifique ;",
            "en montrer les limites.",
          ])}
          ${liste([
            "une main-d’œuvre nombreuse, disciplinée et longtemps bon marché ;",
            "des États interventionnistes et une stratégie d’industrialisation tournée vers l’exportation ;",
            "un « effet de vol d’oies sauvages » : le Japon, puis les « dragons » (Corée du Sud, Taïwan, Hong Kong, Singapour), puis les « tigres » et la Chine ;",
            "l’épargne élevée, l’éducation, les investissements étrangers.",
          ])}
          ${retenir("Limites : inégalités, pollution, vieillissement, dépendance aux marchés extérieurs, tensions politiques (mer de Chine).")}
          ${exercice(
            "Sujet de dissertation : « L’Asie-Pacifique, nouveau centre de gravité de l’économie mondiale ? »",
            [
              "<strong>I. Les facteurs de l’émergence</strong> : main-d’œuvre, rôle de l’État, stratégie d’exportation, épargne, éducation, modèle japonais diffusé en « vol d’oies sauvages ».",
              "<strong>II. Une puissance économique mondiale</strong> : Chine, Japon, Corée du Sud ; premiers ports du monde, industries de pointe.",
              "<strong>III. Des limites</strong> : inégalités, pollution, vieillissement, dépendance aux marchés, tensions géopolitiques.",
            ],
            "Sujet corrigé",
          )}`,
      },
      {
        title: "Le modèle économique japonais",
        minutes: 30,
        body: `${objectifs([
            "décrire les caractères du modèle économique japonais ;",
            "en analyser les difficultés actuelles.",
          ])}
          ${liste([
            "un archipel montagneux, pauvre en ressources et exposé aux séismes et tsunamis ;",
            "après 1945, le « miracle japonais » : forte croissance grâce à l’État (MITI), aux grands groupes (keiretsu), au travail et à l’innovation ;",
            "points forts : automobile (Toyota), électronique, robotique ;",
            "une population concentrée sur le littoral (mégalopole de Tokyo à Osaka).",
          ])}
          ${retenir("Problèmes : longue stagnation depuis les années 1990, dette publique très élevée, vieillissement et baisse de la population, concurrence chinoise.")}
          ${exercice(
            "Question de synthèse : comment le Japon, pays pauvre en ressources, est-il devenu une grande puissance économique ?",
            [
              "Par le travail, l’épargne et l’éducation d’une population nombreuse et disciplinée.",
              "Par le rôle de l’État (MITI) qui oriente l’économie et protège les industries naissantes, et par les grands groupes (keiretsu).",
              "Par l’importation de matières premières transformées en produits de haute technologie exportés dans le monde entier (automobile, électronique, robots).",
            ],
            "Exercice corrigé",
          )}`,
      },
      {
        title: "La Chine : les problèmes démographiques",
        minutes: 25,
        body: `${objectifs([
            "décrire la population chinoise et sa répartition ;",
            "analyser les politiques démographiques et leurs conséquences.",
          ])}
          ${liste([
            "environ 1,4 milliard d’habitants ; l’Inde l’a dépassée en 2023 ;",
            "la politique de l’enfant unique (1979-2015) a freiné la croissance mais provoqué un vieillissement rapide et un déséquilibre entre garçons et filles ;",
            "la Chine autorise deux enfants (2016), puis trois (2021) ;",
            "fort exode rural vers les villes de l’Est : les « mingong » (travailleurs migrants).",
          ])}
          ${retenir("La population est concentrée à l’Est, dans les plaines et sur le littoral ; l’Ouest, montagneux et aride, est peu peuplé.")}
          ${exercice(
            "Question de synthèse : quelles sont les conséquences de la politique de l’enfant unique ?",
            [
              "Elle a ralenti la croissance démographique et facilité le développement économique.",
              "Elle a provoqué un vieillissement rapide : moins d’actifs pour financer les retraites.",
              "Elle a créé un déséquilibre entre hommes et femmes (préférence pour les garçons), d’où l’assouplissement de 2016 et de 2021.",
            ],
            "Exercice corrigé",
          )}`,
      },
      {
        title: "La Chine : le modèle de développement",
        minutes: 30,
        body: `${objectifs([
            "caractériser le modèle de développement chinois ;",
            "analyser la présence chinoise en Afrique et au Sénégal.",
          ])}
          ${liste([
            "depuis 1978, une « économie socialiste de marché » : ouverture, zones économiques spéciales, investissements étrangers ;",
            "deuxième économie du monde, « atelier du monde », premier exportateur ;",
            "investissements en Afrique (au Sénégal : Grand Théâtre, Musée des civilisations noires, autoroute Ila Touba) et « nouvelles routes de la soie » ;",
            "montée en gamme : téléphonie, voitures électriques, espace.",
          ])}
          ${retenir("Défis : inégalités entre l’Est littoral et l’intérieur, pollution, endettement, contrôle politique strict par le Parti communiste.")}
          ${exercice(
            "Sujet de dissertation : « La Chine, une puissance émergente aux pieds d’argile ? »",
            [
              "<strong>I. Une puissance spectaculaire</strong> : croissance rapide depuis 1978, « atelier du monde », premier exportateur, innovation.",
              "<strong>II. Une puissance mondiale</strong> : investissements en Afrique (infrastructures au Sénégal), nouvelles routes de la soie, influence diplomatique.",
              "<strong>III. Des fragilités</strong> : inégalités régionales et sociales, pollution, vieillissement, dette, contrôle politique.",
            ],
            "Sujet corrigé",
          )}`,
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
        minutes: 25,
        body: `${objectifs([
            "décrire les milieux naturels de l’Amérique latine ;",
            "présenter les caractères de sa population et de son urbanisation.",
          ])}
          ${liste([
            "des milieux très variés : cordillère des Andes, forêt amazonienne, pampa, déserts (Atacama) ;",
            "une population métissée (Amérindiens, Européens, descendants d’Africains) et très urbanisée ;",
            "de grandes métropoles (Mexico, São Paulo, Buenos Aires) entourées de quartiers pauvres (favelas, bidonvilles) ;",
            "des inégalités sociales parmi les plus fortes du monde.",
          ])}
          ${retenir("L’Amérique latine est liée à l’Afrique par l’histoire de la traite : le Brésil a la plus grande population d’origine africaine hors d’Afrique.")}
          ${exercice(
            "Question de synthèse : pourquoi l’Amérique latine est-elle une région de fortes inégalités ?",
            [
              "Héritage colonial : grandes propriétés (latifundia) aux mains d’une minorité, populations indiennes et noires longtemps exclues.",
              "Urbanisation rapide et mal maîtrisée : métropoles entourées de quartiers précaires (favelas, villas miserias).",
              "Économies tournées vers l’exportation de matières premières, dont les bénéfices profitent surtout à une élite.",
            ],
            "Exercice corrigé",
          )}`,
      },
      {
        title: "Le Brésil, une puissance du tiers-monde",
        minutes: 35,
        body: `${objectifs([
            "présenter les atouts et les problèmes du Brésil ;",
            "expliquer pourquoi le Brésil est une puissance émergente.",
          ])}
          ${tableau([
            ["Atouts", "Problèmes"],
            ["territoire immense (8,5 millions de km²), environ 203 millions d’habitants", "inégalités sociales et régionales (Sud-Est riche, Nordeste pauvre)"],
            ["agriculture d’exportation : soja, café, sucre, viande", "déforestation de l’Amazonie"],
            ["industrie (aéronautique, automobile), pétrole offshore", "violence urbaine, favelas"],
            ["membre des BRICS", "instabilité politique et économique"],
          ])}
          ${retenir("Le Brésil est une puissance émergente : son poids agricole et industriel est mondial, mais son développement reste inégal.")}
          ${exercice(
            "Sujet de dissertation : « Le Brésil, une puissance émergente aux contrastes marqués ».",
            [
              "<strong>I. Une puissance émergente</strong> : territoire et population, grande puissance agricole (soja, café, viande), industrie, pétrole, membre des BRICS.",
              "<strong>II. De forts contrastes</strong> : Sud-Est riche (São Paulo, Rio) et Nordeste pauvre ; favelas ; inégalités parmi les plus fortes du monde.",
              "<strong>III. Des défis</strong> : déforestation de l’Amazonie, violence, instabilité politique.",
            ],
            "Sujet corrigé",
          )}`,
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
        minutes: 35,
        body: `${objectifs([
            "identifier les problèmes de développement de l’Afrique ;",
            "évaluer ses atouts et ses perspectives.",
          ])}
          ${tableau([
            ["Problèmes", "Perspectives"],
            ["pauvreté, faible industrialisation, dépendance aux matières premières", "ressources minières et énergétiques considérables"],
            ["dette, instabilité politique, conflits", "population jeune (environ 1,4 milliard d’habitants), urbanisation, marché intérieur"],
            ["insuffisance des infrastructures et des services (santé, éducation)", "intégration régionale : CEDEAO, Union africaine, ZLECAf"],
            ["effets du changement climatique (désertification, sécheresses)", "numérique (paiement mobile), énergies renouvelables"],
          ])}
          ${retenir("Le défi est de transformer sur place les matières premières, de nourrir une population croissante et de former la jeunesse.")}
          ${exercice(
            "Sujet de dissertation : « L’Afrique peut-elle sortir du sous-développement ? »",
            [
              "<strong>Introduction</strong> : définir le sous-développement ; problème : les obstacles sont-ils surmontables ?",
              "<strong>I. Des obstacles importants</strong> : pauvreté, dépendance aux matières premières, dette, conflits, faiblesse des infrastructures et de l’industrie.",
              "<strong>II. Des atouts réels</strong> : ressources naturelles, jeunesse, croissance urbaine, innovation numérique, intégration régionale (ZLECAf).",
              "<strong>III. Des conditions</strong> : bonne gouvernance, éducation et santé, transformation locale, agriculture modernisée, paix.",
              "<strong>Conclusion</strong> : le développement est possible, mais il dépend de choix politiques et d’efforts durables.",
            ],
            "Sujet corrigé",
          )}`,
      },
      {
        title: "Le Sénégal : milieux naturels et populations",
        minutes: 30,
        body: `${objectifs([
            "décrire les milieux naturels du Sénégal ;",
            "présenter la population sénégalaise, sa répartition et ses mouvements.",
          ])}
          ${liste([
            "196 722 km², 14 régions ; un relief plat (sauf le Sud-Est) ; climat tropical, du sahélien au nord au soudano-guinéen en Casamance ;",
            "une saison des pluies (de juin-juillet à octobre) et une longue saison sèche ;",
            "fleuves Sénégal, Gambie, Casamance, Saloum ;",
            "environ 18 millions d’habitants (recensement de 2023), une population très jeune ;",
            "une population inégalement répartie : forte concentration à Dakar et dans l’Ouest, faibles densités à l’Est ;",
            "exode rural et émigration (vers l’Europe, les pays voisins).",
          ])}
          ${retenir("Diversité ethnique et linguistique (Wolof, Pulaar, Sereer, Diola, Mandingue, Soninké…) dans une grande cohésion nationale.")}
          ${exercice(
            "Question de synthèse : explique la forte concentration de la population sénégalaise dans l’Ouest et à Dakar.",
            [
              "Conditions naturelles : climat moins sec sur la côte, Niayes favorables au maraîchage, pêche.",
              "Héritage historique : comptoirs et escales de la traite de l’arachide, Dakar capitale de l’AOF puis du Sénégal.",
              "Facteurs économiques : port, industries, administrations, services et emplois attirent l’exode rural ; l’Est reste peu peuplé et enclavé.",
            ],
            "Exercice corrigé",
          )}`,
      },
      {
        title: "La question de l’eau au Sénégal",
        minutes: 30,
        body: `${objectifs([
            "décrire les ressources en eau du Sénégal ;",
            "analyser les problèmes et les solutions (OMVS, barrages, transferts).",
          ])}
          ${liste([
            "des pluies faibles et irrégulières au nord, des sécheresses (années 1970-1980) ;",
            "l’OMVS (Sénégal, Mali, Mauritanie, Guinée) a construit les barrages de Diama (contre la remontée de l’eau salée) et de Manantali (irrigation, électricité) ;",
            "Dakar est alimentée en partie par le lac de Guiers, à plus de 200 km, et par des forages ; la nappe est menacée par la salinisation ;",
            "l’agriculture irriguée se développe dans la vallée du fleuve (riz, tomate, oignon).",
          ])}
          ${retenir("Enjeux : accès à l’eau potable pour tous, assainissement, partage de l’eau entre usages et entre pays, lutte contre la salinisation des terres (Saloum, Casamance).")}
          ${exercice(
            "Sujet de dissertation : « L’eau, un enjeu de développement au Sénégal ».",
            [
              "<strong>I. Une ressource limitée et inégalement répartie</strong> : pluies irrégulières, sécheresses, fleuves et nappes, salinisation.",
              "<strong>II. Des aménagements importants</strong> : OMVS (Diama, Manantali), lac de Guiers, forages, usine de dessalement de Dakar.",
              "<strong>III. Des enjeux de développement</strong> : agriculture irriguée et sécurité alimentaire, eau potable et santé, énergie, coopération entre États.",
            ],
            "Sujet corrigé",
          )}`,
      },
      {
        title: "Problèmes économiques et politiques de développement du Sénégal",
        minutes: 35,
        body: `${objectifs([
            "identifier les problèmes de l’économie sénégalaise ;",
            "présenter les politiques de développement et les perspectives.",
          ])}
          ${tableau([
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
          ${retenir("Le défi est de faire profiter toute la population des nouvelles ressources (pétrole, gaz) et de développer une économie plus transformatrice.")}
          ${exercice(
            "Sujet de dissertation : « Le Sénégal : problèmes et perspectives de développement ».",
            [
              "<strong>I. Une économie aux fragilités anciennes</strong> : agriculture dépendante des pluies, importations alimentaires, chômage des jeunes, dette.",
              "<strong>II. Des politiques de développement</strong> : grands projets d’infrastructures (TER, Diamniadio, autoroutes), Plan Sénégal émergent, agenda « Sénégal 2050 ».",
              "<strong>III. De nouvelles perspectives</strong> : pétrole et gaz, numérique, agriculture irriguée, tourisme, à condition d’une gestion transparente et équitable.",
            ],
            "Sujet corrigé",
          )}
          ${auBac("Pour les sujets sur le Sénégal, cite des lieux précis (Sangomar, Diamniadio, vallée du fleuve, Niayes) et des chiffres récents : ils font la différence.")}`,
      },
    ],
  },
];
