// Français de Terminale, commun aux séries L1, L’1, L2, S1 et S2 : « Nouveaux programmes de
// français » (Commission nationale de français, 2009), mis en ligne par l'Office du Bac. Contenus :
// le surréalisme, l’esthétique des genres (œuvres au choix de la liste officielle) et les exercices
// du baccalauréat. Leçons rédigées par DIANGAL, à faire valider par un professeur de français.

import { type ChapterSpec, exemple, liste, methode, retenir, tableau } from "./blocks";

export const FR_TLE: ChapterSpec[] = [
  {
    title: "Le surréalisme",
    summary: "Origines, principes et techniques du surréalisme ; ses liens avec la négritude.",
    strand: "Littérature",
    lessons: [
      {
        title: "Le mouvement surréaliste",
        minutes: 15,
        body: `<p>Né après la Première Guerre mondiale, dans le prolongement du mouvement Dada, le <strong>surréalisme</strong> est fondé par André Breton (<em>Manifeste du surréalisme</em>, 1924). Il veut libérer l’homme de la logique, de la morale bourgeoise et des conventions littéraires.</p>
          <blockquote><p>« Surréalisme : automatisme psychique pur par lequel on se propose d’exprimer […] le fonctionnement réel de la pensée. »</p><p>André Breton, Manifeste du surréalisme</p></blockquote>
          ${liste([
            "<strong>l’écriture automatique</strong> : écrire très vite, sans contrôle de la raison (Breton et Soupault, <em>Les Champs magnétiques</em>, 1920) ;",
            "<strong>le rêve et l’inconscient</strong>, sous l’influence de Freud ;",
            "<strong>l’image surréaliste</strong>, qui rapproche deux réalités éloignées : « La terre est bleue comme une orange » (Paul Éluard) ;",
            "<strong>le hasard objectif</strong>, l’amour fou, la révolte.",
          ])}
          ${retenir("Principaux poètes : André Breton, Louis Aragon, Paul Éluard, Philippe Soupault, Robert Desnos, René Char. Le surréalisme touche aussi la peinture (Dalí, Magritte, Max Ernst).")}`,
      },
      {
        title: "Surréalisme et poésie de la négritude",
        minutes: 15,
        body: `<p>Les poètes de la négritude ont trouvé dans le surréalisme une arme contre la raison occidentale qui justifiait la colonisation, et une liberté d’images proche de l’oralité africaine.</p>
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
          ], "Analyser un poème surréaliste")}`,
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
        minutes: 15,
        body: `${tableau([
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
          ${retenir("Le programme recommande de toujours tenir compte de la versification : elle n’est pas un décor, elle produit du sens.")}`,
      },
      {
        title: "Poésie classique et romantique",
        minutes: 12,
        body: `${tableau([
            ["Œuvre (liste officielle)", "Ce qu’il faut savoir"],
            ["Boileau, <em>L’Art poétique</em> (1674)", "texte théorique du classicisme : clarté, raison, imitation des Anciens, règles"],
            ["La Fontaine, <em>Fables</em>", "récits en vers, souvent animaliers, qui instruisent en plaisant ; morale explicite ou implicite"],
            ["Victor Hugo, <em>Les Contemplations</em> (1856)", "poésie romantique et lyrique : souvenirs, deuil de sa fille Léopoldine, méditation"],
          ])}
          ${retenir("Le classicisme (XVII<sup>e</sup> siècle) privilégie la raison, l’ordre et la mesure ; le romantisme (XIX<sup>e</sup> siècle) libère le moi, les sentiments et la nature.")}
          ${exemple(["« Demain, dès l’aube… » (Hugo) : un poème lyrique où le voyage du poète se révèle, au dernier vers, une marche vers la tombe de sa fille."])}`,
      },
      {
        title: "La poésie de la négritude",
        minutes: 15,
        body: `<p>La <strong>négritude</strong>, mouvement né dans les années 1930 à Paris autour de Senghor, Césaire et Damas, revendique la dignité et les valeurs culturelles du monde noir.</p>
          ${tableau([
            ["Œuvre (liste officielle)", "Thèmes"],
            ["Senghor, <em>Chants d’ombre</em> (1945)", "le royaume d’enfance, la femme noire, la nostalgie de l’Afrique, le dialogue des cultures"],
            ["Léon-Gontran Damas, <em>Pigments</em> (1937)", "révolte contre l’assimilation, rythme heurté, ironie"],
            ["David Diop, <em>Coups de pilon</em> (1956)", "poésie de combat contre la colonisation, espoir de l’Afrique libérée"],
          ])}
          ${retenir("« Femme nue, femme noire » (Senghor) célèbre la femme africaine comme une terre et une culture ; « Afrique mon Afrique » (David Diop) dénonce l’esclavage et annonce la renaissance du continent.")}`,
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
        minutes: 15,
        body: `${tableau([
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
          ], "Préparer une œuvre intégrale")}`,
      },
      {
        title: "Les romans au programme",
        minutes: 15,
        body: `${tableau([
            ["Œuvre", "Repères"],
            ["Abbé Prévost, <em>Manon Lescaut</em> (1731)", "passion destructrice du chevalier Des Grieux pour Manon ; récit à la première personne"],
            ["Albert Camus, <em>L’Étranger</em> (1942)", "Meursault, indifférent au monde, tue un homme ; l’absurde ; style neutre, phrases courtes"],
            ["Ahmadou Kourouma, <em>Les Soleils des indépendances</em> (1968)", "Fama, prince malinké déchu après les indépendances ; désillusion politique ; français « malinkisé »"],
            ["Amadou Hampâté Bâ, <em>L’Étrange Destin de Wangrin</em> (1973)", "un interprète rusé sous la colonisation en Afrique de l’Ouest ; récit nourri de tradition orale"],
          ])}
          ${retenir("Le programme demande d’étudier une œuvre française et une œuvre africaine par genre, au choix du professeur : renseigne-toi sur celles étudiées dans ta classe.")}`,
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
        minutes: 12,
        body: `${tableau([
            ["Notion", "Définition"],
            ["dialogue, réplique, tirade", "échanges entre personnages ; une tirade est une longue réplique"],
            ["monologue, aparté", "personnage seul en scène ; parole adressée au public que les autres n’entendent pas"],
            ["didascalies", "indications de mise en scène (en italique)"],
            ["double énonciation", "les personnages se parlent, mais l’auteur s’adresse au public"],
            ["exposition, nœud, dénouement", "étapes de l’action"],
          ])}
          ${retenir("La tragédie classique respecte la règle des trois unités (une action, un lieu, une journée) et la bienséance ; le drame romantique la rejette.")}`,
      },
      {
        title: "Les pièces au programme",
        minutes: 15,
        body: `${tableau([
            ["Genre", "Œuvres de la liste officielle"],
            ["tragédie classique", "Corneille, <em>Horace</em> (1640) : conflit entre amour et devoir patriotique"],
            ["drame romantique", "Victor Hugo, <em>Hernani</em> (1830) ; Alfred de Musset, <em>Lorenzaccio</em> (1834)"],
            ["réécritures du mythe au XX<sup>e</sup> siècle", "Jean Anouilh, <em>Antigone</em> (1944) ; Jean-Paul Sartre, <em>Les Mouches</em> (1943)"],
            ["théâtre de l’absurde", "Samuel Beckett, <em>En attendant Godot</em> (1952)"],
            ["théâtre africain", "Seydou Badian, <em>La Mort de Chaka</em> ; Cheik Aliou Ndao, <em>L’Exil d’Albouri</em> ; Bernard Dadié, <em>Monsieur Thôgô-gnini</em> ; Maxime N’Debeka, <em>Le Président</em>"],
          ])}
          ${retenir("Le théâtre historique africain (Chaka, Albouri Ndiaye, dernier bourba du Djolof) interroge le pouvoir, la résistance et le sacrifice ; la comédie satirique (Dadié, N’Debeka) dénonce la corruption et la dictature.")}`,
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
        minutes: 18,
        body: `${methode([
            "Lire le texte et repérer son thème et la thèse de l’auteur.",
            "Dégager sa structure logique (paragraphes, connecteurs) et distinguer idées principales, idées secondaires, exemples.",
            "Reformuler chaque idée essentielle avec ses propres mots, dans l’ordre du texte, en gardant le point de vue de l’auteur.",
            "Respecter le nombre de mots demandé (souvent le quart du texte, avec une marge de 10 %) et l’indiquer à la fin.",
            "Relire : orthographe, enchaînements logiques, présentation.",
          ])}
          ${retenir("Pas de citation, pas d’exemple, pas d’opinion personnelle, pas de « l’auteur dit que » : le résumé est un texte réduit, fidèle et autonome.")}`,
      },
      {
        title: "La discussion",
        minutes: 12,
        body: `<p>Après le résumé, on discute une idée du texte : il s’agit d’un court essai argumenté.</p>
          ${methode([
            "Reformuler l’idée à discuter et poser le problème.",
            "Montrer en quoi elle est juste (arguments et exemples précis).",
            "Montrer ses limites ou proposer un autre point de vue.",
            "Conclure par une prise de position nuancée.",
          ])}
          ${exemple(["Idée à discuter : « La télévision nuit à la lecture. » On peut montrer qu’elle détourne des livres, puis qu’elle peut aussi faire découvrir des œuvres (adaptations, émissions littéraires)."])}`,
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
        minutes: 15,
        body: `${methode([
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
          ])}`,
      },
      {
        title: "Rédiger la dissertation",
        minutes: 12,
        body: `${liste([
            "<strong>introduction</strong> : amorce, présentation et citation du sujet, problématique, annonce du plan ;",
            "<strong>développement</strong> : chaque partie a une idée directrice ; chaque paragraphe = un argument + un exemple analysé ;",
            "<strong>transitions</strong> : bilan de la partie et annonce de la suivante ;",
            "<strong>conclusion</strong> : bilan, réponse à la problématique, ouverture.",
          ])}
          ${retenir("Un exemple doit être précis (auteur, titre, passage) et commenté : il prouve l’argument, il ne le remplace pas.")}`,
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
        minutes: 15,
        body: `${methode([
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
          ])}`,
      },
      {
        title: "Commentaire suivi et commentaire composé",
        minutes: 15,
        body: `${tableau([
            ["", "Commentaire suivi", "Commentaire composé"],
            ["Démarche", "suit le texte de la première à la dernière ligne, mouvement par mouvement", "organise l’étude en centres d’intérêt (axes)"],
            ["Plan", "les mouvements du texte", "deux ou trois axes de lecture"],
          ])}
          ${retenir("Dans les deux cas : introduction (situation, thème, centres d’intérêt ou mouvements), développement qui relie toujours forme et sens, conclusion (bilan et ouverture). Ne jamais paraphraser.")}
          ${exemple(["Axes possibles pour « Afrique mon Afrique » de David Diop : I. Une Afrique martyrisée par la colonisation ; II. L’espoir d’une Afrique libérée."])}`,
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
        minutes: 12,
        body: `<p>La <strong>synthèse</strong> rassemble les informations de plusieurs documents sur un même thème, de façon objective et organisée. Le <strong>compte rendu</strong> (ou rapport) relate un événement (réunion, visite, conférence).</p>
          ${methode([
            "Lire les documents et noter les idées de chacun dans un tableau.",
            "Regrouper les idées communes et les oppositions.",
            "Construire un plan thématique, sans donner son avis.",
            "Rédiger : introduction (thème, documents), développement, conclusion.",
          ])}
          ${retenir("Un compte rendu précise : quoi, qui, quand, où, comment, et les décisions prises ; il est écrit au passé, à la troisième personne.")}`,
      },
      {
        title: "Rédiger une lettre",
        minutes: 10,
        body: `${liste([
            "lettre <strong>formelle</strong> (demande, réclamation, candidature) : coordonnées, lieu et date, destinataire, objet, formule d’appel (« Monsieur le Proviseur »), corps du texte, formule de politesse, signature ;",
            "lettre <strong>personnelle</strong> : ton familier, mais langue correcte.",
          ])}
          ${exemple(["Formule de politesse : « Veuillez agréer, Monsieur le Directeur, l’expression de mes salutations distinguées. »"])}
          ${retenir("Adapte le registre au destinataire et à l’objectif : informer, demander, convaincre, remercier.")}`,
      },
    ],
  },
];
