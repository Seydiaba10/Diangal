// Français de Terminale, commun aux séries L1, L’1, L2, S1 et S2 : « Nouveaux programmes de
// français » (Commission nationale de français, 2009), mis en ligne par l'Office du Bac. Contenus :
// le surréalisme, l’esthétique des genres (œuvres au choix de la liste officielle) et les exercices
// du baccalauréat. Leçons rédigées par DIANGAL, à faire valider par un professeur de français.

import { auBac, type ChapterSpec, definition, erreurs, exemple, exercice, liste, methode, objectifs, retenir, tableau } from "./blocks";

export const FR_TLE: ChapterSpec[] = [
  {
    title: "Le surréalisme",
    summary: "Origines, principes et techniques du surréalisme ; ses liens avec la négritude.",
    strand: "Littérature",
    lessons: [
      {
        title: "Le mouvement surréaliste",
        minutes: 30,
        body: `${objectifs([
            "situer le surréalisme dans son époque et connaître ses principaux auteurs ;",
            "définir ses principes et ses techniques (écriture automatique, image, rêve).",
          ])}
          <p>Né après la Première Guerre mondiale, dans le prolongement du mouvement Dada, le <strong>surréalisme</strong> est fondé par André Breton (<em>Manifeste du surréalisme</em>, 1924). Il veut libérer l’homme de la logique, de la morale bourgeoise et des conventions littéraires.</p>
          <blockquote><p>« Surréalisme : automatisme psychique pur par lequel on se propose d’exprimer […] le fonctionnement réel de la pensée. »</p><p>André Breton, Manifeste du surréalisme</p></blockquote>
          ${liste([
            "<strong>l’écriture automatique</strong> : écrire très vite, sans contrôle de la raison (Breton et Soupault, <em>Les Champs magnétiques</em>, 1920) ;",
            "<strong>le rêve et l’inconscient</strong>, sous l’influence de Freud ;",
            "<strong>l’image surréaliste</strong>, qui rapproche deux réalités éloignées : « La terre est bleue comme une orange » (Paul Éluard) ;",
            "<strong>le hasard objectif</strong>, l’amour fou, la révolte.",
          ])}
          ${retenir("Principaux poètes : André Breton, Louis Aragon, Paul Éluard, Philippe Soupault, Robert Desnos, René Char. Le surréalisme touche aussi la peinture (Dalí, Magritte, Max Ernst).")}
          ${tableau([
            ["Repère", "Date"],
            ["Dada (Tristan Tzara), refus de toutes les règles", "1916"],
            ["<em>Les Champs magnétiques</em>, premier texte d’écriture automatique (Breton et Soupault)", "1920"],
            ["<em>Manifeste du surréalisme</em> (Breton)", "1924"],
            ["Éluard, <em>Capitale de la douleur</em> ; Aragon, <em>Le Paysan de Paris</em>", "1926"],
            ["Desnos, <em>Corps et biens</em> ; Breton, <em>Nadja</em> (1928)", "1930"],
            ["la Résistance : Éluard (« Liberté »), Char, Aragon", "1940-1944"],
          ])}
          ${exercice(
            "Lis ces vers de Paul Éluard : « La terre est bleue comme une orange / Jamais une erreur les mots ne mentent pas ». En quoi cette image est-elle surréaliste ?",
            [
              "La comparaison rapproche deux réalités qui n’ont rien en commun dans la logique ordinaire : la terre bleue (vue du ciel) et l’orange (fruit rond, de couleur opposée).",
              "Le poète refuse la logique et l’attente du lecteur : l’image surprend et crée un monde nouveau, comme dans le rêve.",
              "Le second vers affirme paradoxalement la vérité de cette image : pour les surréalistes, la poésie dit une vérité plus profonde que la raison.",
            ],
          )}`,
      },
      {
        title: "Surréalisme et poésie de la négritude",
        minutes: 30,
        body: `${objectifs([
            "montrer ce que les poètes de la négritude doivent au surréalisme ;",
            "analyser un poème surréaliste ou de la négritude.",
          ])}
          <p>Les poètes de la négritude ont trouvé dans le surréalisme une arme contre la raison occidentale qui justifiait la colonisation, et une liberté d’images proche de l’oralité africaine.</p>
          ${liste([
            "Aimé Césaire, <em>Cahier d’un retour au pays natal</em> (1939) : Breton le salue comme « un grand poète noir » ; images violentes, rythme incantatoire, révolte ;",
            "Léopold Sédar Senghor : il revendique l’image analogique et le rythme, hérités selon lui de la poésie négro-africaine, plus que l’écriture automatique ;",
            "René Depestre (Haïti) : poésie de combat et d’amour.",
          ])}
          ${retenir("Pour Césaire, le surréalisme est « une arme miraculeuse » : il permet de retrouver, sous la culture imposée, les forces profondes de l’être.")}
          ${methode([
            "Repérer les images inattendues (comparaisons, métaphores) et les associations libres.",
            "Étudier le rythme : anaphores, énumérations, versets, absence de ponctuation.",
            "Relier ces procédés au sens : révolte, quête de soi, célébration.",
          ], "Analyser un poème surréaliste")}
          ${exercice(
            "Sujet de dissertation : « Le surréalisme a été pour les poètes de la négritude une arme de libération. » Discutez.",
            [
              "<strong>Introduction</strong> : rappeler la rencontre entre Breton et Césaire (Martinique, 1941) ; problème : le surréalisme a-t-il libéré la poésie négro-africaine ou lui a-t-il imposé un modèle européen ?",
              "<strong>I. Une arme de libération</strong> : refus de la raison occidentale colonisatrice, libération de l’image et du rythme, révolte (Césaire, <em>Cahier d’un retour au pays natal</em>).",
              "<strong>II. Une parenté plus qu’une influence</strong> : Senghor affirme que l’image analogique et le rythme viennent de la poésie africaine orale ; la négritude a ses propres sources.",
              "<strong>III. Une rencontre féconde</strong> : chaque poète a pris du surréalisme ce qui servait son projet (révolte, identité, universel).",
              "<strong>Conclusion</strong> : le surréalisme a été un instrument au service d’une quête propre, celle de la dignité noire.",
            ],
            "Sujet corrigé",
          )}`,
      },
    ],
  },
  {
    title: "La poésie",
    summary: "Versification, poésie classique et romantique, poésie de la négritude.",
    strand: "Esthétique des genres",
    lessons: [
      {
        title: "Les outils de la versification",
        minutes: 30,
        body: `${objectifs([
            "compter les syllabes d’un vers et identifier les mètres ;",
            "analyser rimes, strophes, rythme et leur effet sur le sens.",
          ])}
          ${tableau([
            ["Notion", "Définition"],
            ["vers", "ligne de poème ; l’alexandrin compte 12 syllabes, le décasyllabe 10, l’octosyllabe 8"],
            ["e muet", "se prononce devant une consonne, s’élide devant une voyelle ou en fin de vers"],
            ["diérèse, synérèse", "prononcer une syllabe en deux (li-on) ou deux en une (lion)"],
            ["rimes", "plates (AABB), croisées (ABAB), embrassées (ABBA) ; pauvres, suffisantes ou riches"],
            ["strophe", "groupe de vers : quatrain (4), tercet (3)…"],
            ["sonnet", "deux quatrains et deux tercets"],
          ])}
          ${liste([
            "<strong>césure</strong> : pause au milieu de l’alexandrin (deux hémistiches de 6 syllabes) ;",
            "<strong>enjambement</strong> : la phrase déborde sur le vers suivant ; <strong>rejet</strong> et <strong>contre-rejet</strong> mettent un mot en relief ;",
            "<strong>vers libre</strong> et <strong>verset</strong> : sans rime ni mètre régulier (Césaire, Senghor).",
          ])}
          ${retenir("Le programme recommande de toujours tenir compte de la versification : elle n’est pas un décor, elle produit du sens.")}
          ${exercice(
            "Analyse le vers de Victor Hugo : « Demain, dès l’aube, à l’heure où blanchit la campagne ». Compte les syllabes, repère la césure et dis ce que le rythme suggère.",
            [
              "De-main / dès / l’au-b(e) à / l’heu-r(e) où / blan-chit / la / cam-pa-gn(e) : le « e » de « aube » et celui de « heure » s’élident devant une voyelle, le « e » final de « campagne » ne compte pas : 12 syllabes, c’est un <strong>alexandrin</strong>.",
              "La césure tombe après la 6<sup>e</sup> syllabe : « Demain, dès l’aube, à l’heure // où blanchit la campagne » ; le premier hémistiche est découpé par les virgules en trois groupes de deux syllabes (2/2/2).",
              "Ce rythme haché marque la précision et la détermination du poète qui se fixe l’heure du départ ; le second hémistiche, plus ample, fait voir la campagne qui s’éclaire.",
            ],
          )}
          ${erreurs(["oublier de compter le « e » muet devant une consonne ;", "parler de rime riche sans compter les sons communs (trois sons ou plus)."])}`,
      },
      {
        title: "Poésie classique et romantique",
        minutes: 30,
        body: `${objectifs([
            "connaître les principes de la poésie classique et de la poésie romantique ;",
            "situer les œuvres de la liste officielle (Boileau, La Fontaine, Hugo).",
          ])}
          ${tableau([
            ["Œuvre (liste officielle)", "Ce qu’il faut savoir"],
            ["Boileau, <em>L’Art poétique</em> (1674)", "texte théorique du classicisme : clarté, raison, imitation des Anciens, règles"],
            ["La Fontaine, <em>Fables</em>", "récits en vers, souvent animaliers, qui instruisent en plaisant ; morale explicite ou implicite"],
            ["Victor Hugo, <em>Les Contemplations</em> (1856)", "poésie romantique et lyrique : souvenirs, deuil de sa fille Léopoldine, méditation"],
          ])}
          ${retenir("Le classicisme (XVII<sup>e</sup> siècle) privilégie la raison, l’ordre et la mesure ; le romantisme (XIX<sup>e</sup> siècle) libère le moi, les sentiments et la nature.")}
          ${exemple(["« Demain, dès l’aube… » (Hugo) : un poème lyrique où le voyage du poète se révèle, au dernier vers, une marche vers la tombe de sa fille."])}
          <h2>Les poètes réfléchissent à leur art</h2>
          ${liste([
            "Boileau : « Ce que l’on conçoit bien s’énonce clairement, / Et les mots pour le dire arrivent aisément » (<em>L’Art poétique</em>) ;",
            "La Fontaine veut « instruire et plaire » : la fable est un récit plaisant au service d’une leçon ;",
            "Hugo, préface des <em>Contemplations</em> : « Ah ! insensé, qui crois que je ne suis pas toi ! » : le « je » du poète parle pour tous les hommes.",
          ])}
          ${exercice(
            "Sujet de dissertation : « La poésie doit instruire et plaire. » Partagez-vous ce point de vue ?",
            [
              "<strong>I. La poésie instruit en plaisant</strong> : fables de La Fontaine, poésie morale et engagée ; le plaisir du rythme aide à retenir la leçon.",
              "<strong>II. Mais elle peut aussi émouvoir et exprimer le moi</strong> : lyrisme romantique (Hugo pleurant Léopoldine), sans souci d’enseigner.",
              "<strong>III. Elle est avant tout un travail sur le langage</strong> qui transforme notre regard sur le monde (surréalisme, négritude).",
            ],
            "Sujet corrigé",
          )}`,
      },
      {
        title: "La poésie de la négritude",
        minutes: 30,
        body: `${objectifs([
            "définir la négritude et ses enjeux ;",
            "connaître les recueils de la liste officielle et analyser leurs thèmes et procédés.",
          ])}
          <p>La <strong>négritude</strong>, mouvement né dans les années 1930 à Paris autour de Senghor, Césaire et Damas, revendique la dignité et les valeurs culturelles du monde noir.</p>
          ${tableau([
            ["Œuvre (liste officielle)", "Thèmes"],
            ["Senghor, <em>Chants d’ombre</em> (1945)", "le royaume d’enfance, la femme noire, la nostalgie de l’Afrique, le dialogue des cultures"],
            ["Léon-Gontran Damas, <em>Pigments</em> (1937)", "révolte contre l’assimilation, rythme heurté, ironie"],
            ["David Diop, <em>Coups de pilon</em> (1956)", "poésie de combat contre la colonisation, espoir de l’Afrique libérée"],
          ])}
          ${retenir("« Femme nue, femme noire » (Senghor) célèbre la femme africaine comme une terre et une culture ; « Afrique mon Afrique » (David Diop) dénonce l’esclavage et annonce la renaissance du continent.")}
          <h2>La négritude réfléchit à sa poésie</h2>
          <p>Dans « Comme les lamantins vont boire à la source » (postface d’<em>Éthiopiques</em>, 1956), Senghor définit sa poétique : l’image analogique, le rythme, le poème accompagné d’instruments (kôra, balafong, tam-tam). Sartre, dans « Orphée noir » (préface de l’<em>Anthologie</em> de Senghor, 1948), voit dans cette poésie « la seule grande poésie révolutionnaire » de son temps.</p>
          ${exercice(
            "Commentaire composé (plan) : « Afrique mon Afrique » de David Diop (<em>Coups de pilon</em>).",
            [
              "<strong>Introduction</strong> : poète de la négritude engagée, David Diop (1927-1960) ; poème de combat qui interpelle l’Afrique.",
              "<strong>I. Une Afrique martyrisée</strong> : souvenirs d’une Afrique glorieuse, puis évocation de l’esclavage et de la colonisation (champ lexical de la souffrance, « dos qui se courbe »).",
              "<strong>II. L’espoir d’une renaissance</strong> : la voix (« une voix grave me répond ») et l’image de l’arbre qui repousse annoncent la liberté ; rythme d’incantation.",
              "<strong>Conclusion</strong> : un poème militant qui transforme la douleur en espoir.",
            ],
            "Exercice corrigé",
          )}`,
      },
    ],
  },
  {
    title: "Le roman",
    summary: "Narrateur et focalisation, personnages, temps ; romans de la liste officielle.",
    strand: "Esthétique des genres",
    lessons: [
      {
        title: "Les outils de l’analyse du roman",
        minutes: 30,
        body: `${objectifs([
            "analyser narrateur, focalisation, personnages et temps du récit ;",
            "rédiger une fiche de lecture et pratiquer l’écriture d’invention.",
          ])}
          ${tableau([
            ["Notion", "Ce qu’on observe"],
            ["narrateur", "interne (« je » personnage) ou externe (« il »)"],
            ["focalisation", "zéro (narrateur omniscient), interne (à travers un personnage), externe (de l’extérieur, comme une caméra)"],
            ["personnages", "portrait physique et moral, rôle dans l’action (schéma actanciel)"],
            ["temps du récit", "ordre (retour en arrière, anticipation), rythme (scène, sommaire, ellipse, pause)"],
            ["discours rapporté", "direct, indirect, indirect libre"],
          ])}
          ${retenir("Le roman réaliste veut donner l’illusion du réel ; le roman africain mêle souvent récit, oralité (proverbes, contes) et critique sociale.")}
          ${methode([
            "Lire l’œuvre intégrale et noter les grandes étapes de l’intrigue.",
            "Rédiger une fiche de lecture : auteur, contexte, résumé, personnages, thèmes, procédés, citations clés.",
            "Relier l’œuvre à son genre et à son époque.",
          ], "Préparer une œuvre intégrale")}
          ${tableau([
            ["Rubrique de la fiche de lecture", "Contenu"],
            ["identification", "auteur, titre, date, genre, mouvement"],
            ["résumé", "en une quinzaine de lignes, les étapes de l’intrigue"],
            ["personnages", "portraits, relations, évolution"],
            ["thèmes", "trois ou quatre thèmes illustrés de passages"],
            ["procédés", "narration, focalisation, style"],
            ["citations", "cinq à dix phrases importantes, avec la page"],
            ["avis personnel", "argumenté"],
          ])}
          ${definition("pastiche et parodie", "le <strong>pastiche</strong> imite le style d’un auteur (avec respect ou admiration) ; la <strong>parodie</strong> l’imite pour s’en moquer. Ces exercices d’écriture d’invention obligent à repérer les procédés d’un texte.")}
          ${exercice(
            "Identifie la focalisation et le statut du narrateur dans l’incipit de <em>L’Étranger</em> : « Aujourd’hui, maman est morte. Ou peut-être hier, je ne sais pas. »",
            [
              "Le narrateur dit « je » : c’est Meursault, le personnage principal ; c’est un <strong>narrateur interne</strong>.",
              "Nous ne savons que ce qu’il sait et ressent : <strong>focalisation interne</strong>.",
              "L’indifférence de la phrase (« je ne sais pas ») et les phrases courtes annoncent un personnage étranger aux conventions et à ses propres émotions.",
            ],
          )}`,
      },
      {
        title: "Les romans au programme",
        minutes: 30,
        body: `${objectifs([
            "situer les romans de la liste officielle ;",
            "dégager leurs thèmes et leurs procédés essentiels.",
          ])}
          ${tableau([
            ["Œuvre", "Repères"],
            ["Abbé Prévost, <em>Manon Lescaut</em> (1731)", "passion destructrice du chevalier Des Grieux pour Manon ; récit à la première personne"],
            ["Albert Camus, <em>L’Étranger</em> (1942)", "Meursault, indifférent au monde, tue un homme ; l’absurde ; style neutre, phrases courtes"],
            ["Ahmadou Kourouma, <em>Les Soleils des indépendances</em> (1968)", "Fama, prince malinké déchu après les indépendances ; désillusion politique ; français « malinkisé »"],
            ["Amadou Hampâté Bâ, <em>L’Étrange Destin de Wangrin</em> (1973)", "un interprète rusé sous la colonisation en Afrique de l’Ouest ; récit nourri de tradition orale"],
          ])}
          ${retenir("Le programme demande d’étudier une œuvre française et une œuvre africaine par genre, au choix du professeur : renseigne-toi sur celles étudiées dans ta classe.")}
          ${exercice(
            "Sujet de dissertation : « Le roman africain est un miroir de la société. » Discutez à partir des œuvres étudiées.",
            [
              "<strong>I. Un miroir de la société</strong> : Kourouma montre la désillusion des indépendances (parti unique, misère, déchéance de Fama) ; Hampâté Bâ, la société coloniale et ses intermédiaires.",
              "<strong>II. Un miroir déformant et critique</strong> : ironie, satire, humour (la ruse de Wangrin, les « bâtards » de Kourouma) : le romancier juge autant qu’il montre.",
              "<strong>III. Plus qu’un miroir, une création</strong> : invention d’une langue (le français « malinkisé »), intégration de l’oralité (contes, proverbes), portée universelle (l’homme face au pouvoir et au destin).",
            ],
            "Sujet corrigé",
          )}
          ${auBac("Une citation précise d’une œuvre étudiée vaut mieux qu’une liste de titres : prépare pour chaque roman trois ou quatre passages commentés.")}`,
      },
    ],
  },
  {
    title: "Le théâtre",
    summary: "Texte et représentation, genres théâtraux, pièces de la liste officielle.",
    strand: "Esthétique des genres",
    lessons: [
      {
        title: "Le texte théâtral",
        minutes: 30,
        body: `${objectifs([
            "maîtriser le lexique dramatique ;",
            "identifier les sous-genres du théâtre et la double énonciation.",
          ])}
          ${tableau([
            ["Notion", "Définition"],
            ["dialogue, réplique, tirade", "échanges entre personnages ; une tirade est une longue réplique"],
            ["monologue, aparté", "personnage seul en scène ; parole adressée au public que les autres n’entendent pas"],
            ["didascalies", "indications de mise en scène (en italique)"],
            ["double énonciation", "les personnages se parlent, mais l’auteur s’adresse au public"],
            ["exposition, nœud, dénouement", "étapes de l’action"],
          ])}
          ${retenir("La tragédie classique respecte la règle des trois unités (une action, un lieu, une journée) et la bienséance ; le drame romantique la rejette.")}
          ${tableau([
            ["Sous-genre", "Caractères"],
            ["tragédie", "personnages nobles, conflit insoluble, fatalité, dénouement malheureux, alexandrins (Corneille, Racine)"],
            ["comédie", "personnages ordinaires, intrigue amoureuse ou sociale, dénouement heureux, rire et critique des mœurs (Molière)"],
            ["drame romantique", "mélange des genres et des tons, liberté de lieu et de temps, héros révolté (Hugo, Musset)"],
            ["farce", "comique de gestes et de situation"],
            ["théâtre de l’absurde", "personnages qui attendent, langage qui tourne à vide, absence d’action (Beckett, Ionesco)"],
            ["théâtre historique africain", "héros de l’histoire africaine, chœur, griot, chants (Badian, Ndao)"],
          ])}
          ${exercice(
            "Dans <em>Horace</em> de Corneille, Horace dit à Curiace, son ami et beau-frère, qu’il doit combattre : « Albe vous a nommé, je ne vous connais plus. » Explique le conflit révélé par cette réplique.",
            [
              "Horace a été choisi par Rome, Curiace par Albe : ils doivent se battre en duel.",
              "Horace fait passer le devoir patriotique avant l’amitié et les liens familiaux : il renie leur affection.",
              "C’est un conflit tragique entre l’amour (ou l’amitié) et le devoir, typique de la tragédie cornélienne ; la brièveté de l’alexandrin rend la rupture brutale.",
            ],
          )}`,
      },
      {
        title: "Les pièces au programme",
        minutes: 30,
        body: `${objectifs([
            "situer les pièces de la liste officielle et leurs enjeux ;",
            "comparer théâtre français et théâtre africain.",
          ])}
          ${tableau([
            ["Genre", "Œuvres de la liste officielle"],
            ["tragédie classique", "Corneille, <em>Horace</em> (1640) : conflit entre amour et devoir patriotique"],
            ["drame romantique", "Victor Hugo, <em>Hernani</em> (1830) ; Alfred de Musset, <em>Lorenzaccio</em> (1834)"],
            ["réécritures du mythe au XX<sup>e</sup> siècle", "Jean Anouilh, <em>Antigone</em> (1944) ; Jean-Paul Sartre, <em>Les Mouches</em> (1943)"],
            ["théâtre de l’absurde", "Samuel Beckett, <em>En attendant Godot</em> (1952)"],
            ["théâtre africain", "Seydou Badian, <em>La Mort de Chaka</em> ; Cheik Aliou Ndao, <em>L’Exil d’Albouri</em> ; Bernard Dadié, <em>Monsieur Thôgô-gnini</em> ; Maxime N’Debeka, <em>Le Président</em>"],
          ])}
          ${retenir("Le théâtre historique africain (Chaka, Albouri Ndiaye, dernier bourba du Djolof) interroge le pouvoir, la résistance et le sacrifice ; la comédie satirique (Dadié, N’Debeka) dénonce la corruption et la dictature.")}
          ${exercice(
            "Sujet de dissertation : « Le théâtre africain est un théâtre de l’histoire et du pouvoir. » Discutez à partir des pièces étudiées.",
            [
              "<strong>I. Un théâtre de l’histoire</strong> : héros de la résistance (Albouri Ndiaye chez Ndao, Chaka chez Badian) qui rendent sa fierté au public après la colonisation.",
              "<strong>II. Un théâtre du pouvoir</strong> : réflexion sur le chef, le sacrifice et la tyrannie ; satire des dictatures et des profiteurs (N’Debeka, <em>Le Président</em> ; Dadié, <em>Monsieur Thôgô-gnini</em>).",
              "<strong>III. Un théâtre aussi universel</strong> : comme <em>Antigone</em> ou <em>Les Mouches</em>, il pose les questions de la liberté, de la loi et de la responsabilité.",
            ],
            "Sujet corrigé",
          )}`,
      },
    ],
  },
  {
    title: "Le résumé de texte et la discussion",
    summary: "Repérer la structure d’un texte, résumer selon les proportions, discuter une idée.",
    strand: "Exercices du baccalauréat",
    lessons: [
      {
        title: "Résumer un texte",
        minutes: 35,
        body: `${objectifs([
            "dégager le thème, la thèse et la structure logique d’un texte ;",
            "résumer un texte selon les proportions demandées et relire son travail.",
          ])}
          ${methode([
            "Lire le texte et repérer son thème et la thèse de l’auteur.",
            "Dégager sa structure logique (paragraphes, connecteurs) et distinguer idées principales, idées secondaires, exemples.",
            "Reformuler chaque idée essentielle avec ses propres mots, dans l’ordre du texte, en gardant le point de vue de l’auteur.",
            "Respecter le nombre de mots demandé (souvent le quart du texte, avec une marge de 10 %) et l’indiquer à la fin.",
            "Relire : orthographe, enchaînements logiques, présentation.",
          ])}
          ${retenir("Pas de citation, pas d’exemple, pas d’opinion personnelle, pas de « l’auteur dit que » : le résumé est un texte réduit, fidèle et autonome.")}
          ${exercice(
            "Résume en 30 mots environ ce paragraphe (120 mots) : « On accuse souvent la ville de tous les maux : bruit, pollution, embouteillages, insécurité. Pourtant, c’est en ville que se concentrent les écoles, les hôpitaux et les emplois. Les jeunes ruraux qui y arrivent cherchent d’abord à se former et à travailler. Le problème n’est donc pas la ville elle-même, mais la croissance urbaine non maîtrisée : quartiers sans eau ni assainissement, transports insuffisants. Une ville bien aménagée, au contraire, peut offrir à tous de meilleures conditions de vie. Il faut donc moins condamner la ville que l’organiser. »",
            [
              "Thème : la ville ; thèse : il faut organiser la ville plutôt que la condamner ; structure : reproches → avantages → vrai problème → solution.",
              "Proposition : « Malgré ses nuisances, la ville concentre écoles, soins et emplois qui attirent les jeunes ruraux. Seule son extension désordonnée pose problème : mieux vaut l’aménager que la condamner. » (30 mots)",
              "On vérifie : pas d’exemple détaillé, pas d’avis personnel, ordre du texte respecté, nombre de mots indiqué.",
            ],
          )}
          ${auBac("Le résumé est noté sur la fidélité, la concision et la correction de la langue : garde du temps pour compter tes mots et relire l’orthographe.")}`,
      },
      {
        title: "La discussion",
        minutes: 25,
        body: `${objectifs([
            "reformuler une idée du texte et en dégager le problème ;",
            "construire une argumentation nuancée et illustrée.",
          ])}
          <p>Après le résumé, on discute une idée du texte : il s’agit d’un court essai argumenté.</p>
          ${methode([
            "Reformuler l’idée à discuter et poser le problème.",
            "Montrer en quoi elle est juste (arguments et exemples précis).",
            "Montrer ses limites ou proposer un autre point de vue.",
            "Conclure par une prise de position nuancée.",
          ])}
          ${exemple(["Idée à discuter : « La télévision nuit à la lecture. » On peut montrer qu’elle détourne des livres, puis qu’elle peut aussi faire découvrir des œuvres (adaptations, émissions littéraires)."])}
          ${exercice(
            "Discussion : « Une ville bien aménagée peut offrir à tous de meilleures conditions de vie. » Proposez un plan.",
            [
              "<strong>Introduction</strong> : rappeler le texte et l’idée ; problème : l’aménagement suffit-il à rendre la ville vivable pour tous ?",
              "<strong>I. Oui, l’aménagement améliore la vie</strong> : transports (TER, BRT à Dakar), assainissement, espaces verts, services de proximité.",
              "<strong>II. Mais il ne suffit pas</strong> : inégalités sociales, coût du logement, chômage ; certains aménagements chassent les plus pauvres.",
              "<strong>Conclusion</strong> : l’aménagement est nécessaire mais doit s’accompagner d’une politique sociale et d’une décentralisation.",
            ],
          )}`,
      },
    ],
  },
  {
    title: "La dissertation littéraire",
    summary: "Analyser un sujet, problématiser, construire un plan et rédiger.",
    strand: "Exercices du baccalauréat",
    lessons: [
      {
        title: "Analyser le sujet et construire le plan",
        minutes: 30,
        body: `${objectifs([
            "analyser un sujet de dissertation et dégager la problématique ;",
            "rechercher et classer arguments et exemples ; choisir un plan adapté.",
          ])}
          ${methode([
            "Lire le sujet, souligner les mots clés et les définir.",
            "Identifier la thèse proposée (souvent une citation) et la question posée.",
            "Formuler la problématique.",
            "Rechercher idées et exemples précis tirés des œuvres étudiées, puis les classer.",
            "Choisir un plan : dialectique (oui / mais / dépassement), thématique ou analytique.",
          ])}
          ${tableau([
            ["Type de sujet", "Plan conseillé"],
            ["« Partagez-vous ce point de vue ? »", "dialectique"],
            ["« Montrez que… », « Expliquez… »", "thématique (deux ou trois aspects)"],
          ])}
          ${exercice(
            "Analyse le sujet : « Le théâtre n’est fait que pour divertir. » Qu’en pensez-vous ?",
            [
              "<strong>Mots clés</strong> : « ne… que » (restriction : seulement) ; « divertir » (amuser, détourner des soucis).",
              "<strong>Problématique</strong> : le théâtre n’a-t-il pour fonction que de faire rire et distraire, ou peut-il aussi instruire, émouvoir et faire réfléchir ?",
              "<strong>Plan dialectique</strong> : I. Le théâtre divertit (comédie, farce, spectacle) ; II. Il instruit et critique (« corriger les mœurs en divertissant », Molière ; satire politique africaine) ; III. Il fait réfléchir sur la condition humaine (tragédie, absurde).",
            ],
          )}
          ${erreurs(["traiter le thème (le théâtre) au lieu du sujet précis (sa fonction) ;", "oublier la restriction « ne… que », qui appelle la discussion."])}`,
      },
      {
        title: "Rédiger la dissertation",
        minutes: 30,
        body: `${objectifs([
            "rédiger introduction, développement, transitions et conclusion ;",
            "intégrer et commenter des exemples précis.",
          ])}
          ${liste([
            "<strong>introduction</strong> : amorce, présentation et citation du sujet, problématique, annonce du plan ;",
            "<strong>développement</strong> : chaque partie a une idée directrice ; chaque paragraphe = un argument + un exemple analysé ;",
            "<strong>transitions</strong> : bilan de la partie et annonce de la suivante ;",
            "<strong>conclusion</strong> : bilan, réponse à la problématique, ouverture.",
          ])}
          ${retenir("Un exemple doit être précis (auteur, titre, passage) et commenté : il prouve l’argument, il ne le remplace pas.")}
          ${exercice(
            "Rédige l’introduction du sujet : « Le théâtre n’est fait que pour divertir. » Qu’en pensez-vous ?",
            [
              "<strong>Amorce</strong> : « Depuis l’Antiquité, le théâtre rassemble le public autour du rire et des larmes. »",
              "<strong>Sujet et problème</strong> : « Selon certains, il n’aurait d’autre but que de divertir. Le théâtre se réduit-il à un simple amusement, ou peut-il aussi instruire et faire réfléchir ? »",
              "<strong>Annonce du plan</strong> : « Nous verrons d’abord que le théâtre est un divertissement, puis qu’il cherche aussi à corriger les mœurs, enfin qu’il interroge la condition humaine. »",
            ],
          )}`,
      },
    ],
  },
  {
    title: "Le commentaire de texte",
    summary: "Situer un texte, repérer les procédés, construire un commentaire suivi ou composé.",
    strand: "Exercices du baccalauréat",
    lessons: [
      {
        title: "Préparer le commentaire",
        minutes: 30,
        body: `${objectifs([
            "situer un texte et analyser sa situation d’énonciation ;",
            "relever les procédés d’écriture et en interpréter les effets.",
          ])}
          ${methode([
            "Situer le texte : auteur, œuvre, genre, courant littéraire, époque.",
            "Repérer le thème général et la situation d’énonciation (qui parle, à qui, quand, où ?).",
            "Relever les procédés : lexique, figures de style, temps verbaux, ponctuation, rythme, versification.",
            "Interpréter : quel effet chaque procédé produit-il ?",
          ])}
          ${tableau([
            ["Figure", "Exemple"],
            ["métaphore", "« Femme nue, femme obscure / Fruit mûr à la chair ferme » (Senghor)"],
            ["comparaison", "« La terre est bleue comme une orange » (Éluard)"],
            ["anaphore", "répétition d’un mot en tête de vers ou de phrase"],
            ["antithèse, oxymore", "opposition d’idées ; « cette obscure clarté » (Corneille)"],
            ["hyperbole, litote", "exagération ; atténuation (« Va, je ne te hais point »)"],
          ])}
          ${exercice(
            "Relève et interprète deux procédés dans ces vers de Senghor : « Femme nue, femme noire / Vêtue de ta couleur qui est vie, de ta forme qui est beauté ! »",
            [
              "<strong>Anaphore</strong> de « femme » et parallélisme « nue, noire » : le poète célèbre la femme africaine avec insistance, comme dans une incantation.",
              "<strong>Antithèse</strong> « nue » / « vêtue de ta couleur » : la couleur noire n’est pas un manque mais une parure, valorisée comme « vie » et « beauté ».",
              "Ces procédés servent le projet de la négritude : réhabiliter la beauté noire.",
            ],
          )}`,
      },
      {
        title: "Commentaire suivi et commentaire composé",
        minutes: 30,
        body: `${objectifs([
            "distinguer commentaire suivi et commentaire composé ;",
            "construire et rédiger un commentaire qui relie forme et sens.",
          ])}
          ${tableau([
            ["", "Commentaire suivi", "Commentaire composé"],
            ["Démarche", "suit le texte de la première à la dernière ligne, mouvement par mouvement", "organise l’étude en centres d’intérêt (axes)"],
            ["Plan", "les mouvements du texte", "deux ou trois axes de lecture"],
          ])}
          ${retenir("Dans les deux cas : introduction (situation, thème, centres d’intérêt ou mouvements), développement qui relie toujours forme et sens, conclusion (bilan et ouverture). Ne jamais paraphraser.")}
          ${exemple(["Axes possibles pour « Afrique mon Afrique » de David Diop : I. Une Afrique martyrisée par la colonisation ; II. L’espoir d’une Afrique libérée."])}
          ${exercice(
            "Propose deux axes de commentaire composé pour l’incipit des <em>Soleils des indépendances</em> (la mort de Koné Ibrahima, racontée par un narrateur qui emploie des expressions malinkées).",
            [
              "<strong>I. Une écriture qui « malinkise » le français</strong> : expressions traduites du malinké (« il n’avait pas soutenu un petit rhume »), proverbes, ton du conteur.",
              "<strong>II. Un regard ironique sur la société des indépendances</strong> : la mort traitée avec humour, critique des mœurs et des déchéances sociales.",
              "Dans chaque axe, on part d’un procédé précis (lexique, syntaxe, image) pour en tirer une interprétation.",
            ],
          )}
          ${auBac("Évite la paraphrase : chaque idée doit s’appuyer sur une citation courte et un procédé nommé (« l’anaphore souligne… »).")}`,
      },
    ],
  },
  {
    title: "Synthèse, compte rendu et correspondance",
    summary: "Exploiter des documents, rendre compte d’un événement, rédiger une lettre.",
    strand: "Expression écrite",
    lessons: [
      {
        title: "Synthèse de documents et compte rendu",
        minutes: 25,
        body: `${objectifs([
            "exploiter plusieurs documents et en faire une synthèse objective ;",
            "rédiger le compte rendu d’un événement.",
          ])}
          <p>La <strong>synthèse</strong> rassemble les informations de plusieurs documents sur un même thème, de façon objective et organisée. Le <strong>compte rendu</strong> (ou rapport) relate un événement (réunion, visite, conférence).</p>
          ${methode([
            "Lire les documents et noter les idées de chacun dans un tableau.",
            "Regrouper les idées communes et les oppositions.",
            "Construire un plan thématique, sans donner son avis.",
            "Rédiger : introduction (thème, documents), développement, conclusion.",
          ])}
          ${retenir("Un compte rendu précise : quoi, qui, quand, où, comment, et les décisions prises ; il est écrit au passé, à la troisième personne.")}
          ${exercice(
            "Trois documents traitent de l’usage du téléphone portable par les élèves : un article sur les distractions en classe, une enquête sur les applications éducatives, un témoignage de parent sur la sécurité. Propose un plan de synthèse.",
            [
              "<strong>Introduction</strong> : thème commun, présentation rapide des trois documents.",
              "<strong>I. Les risques</strong> : distraction en classe, dépendance (document 1).",
              "<strong>II. Les apports</strong> : apprentissage (document 2), sécurité et lien avec la famille (document 3).",
              "<strong>Conclusion</strong> : les documents invitent à un usage encadré ; aucune opinion personnelle n’est ajoutée.",
            ],
          )}`,
      },
      {
        title: "Rédiger une lettre",
        minutes: 25,
        body: `${objectifs([
            "respecter la présentation d’une lettre formelle ;",
            "adapter le registre de langue au destinataire et au but.",
          ])}
          ${liste([
            "lettre <strong>formelle</strong> (demande, réclamation, candidature) : coordonnées, lieu et date, destinataire, objet, formule d’appel (« Monsieur le Proviseur »), corps du texte, formule de politesse, signature ;",
            "lettre <strong>personnelle</strong> : ton familier, mais langue correcte.",
          ])}
          ${exemple(["Formule de politesse : « Veuillez agréer, Monsieur le Directeur, l’expression de mes salutations distinguées. »"])}
          ${retenir("Adapte le registre au destinataire et à l’objectif : informer, demander, convaincre, remercier.")}
          ${exercice(
            "Rédige le début et la fin d’une lettre au proviseur pour demander l’organisation d’une semaine culturelle.",
            [
              "En haut à gauche, tes coordonnées (nom, classe, lycée) ; à droite, le lieu et la date (« Dakar, le 15 janvier 2027 ») ; puis « À Monsieur le Proviseur du lycée… ».",
              "« Objet : demande d’organisation d’une semaine culturelle » ; formule d’appel : « Monsieur le Proviseur, ».",
              "Formule finale : « Dans l’attente d’une suite favorable, je vous prie d’agréer, Monsieur le Proviseur, l’expression de mon profond respect. » puis signature.",
            ],
          )}`,
      },
    ],
  },
];
