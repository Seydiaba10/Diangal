// SVT de 3e (programme relevé : docs/programme/releve-ci-3e.md).
// Leçons rédigées par DIANGAL, à faire valider par un enseignant.

import { type Chapter3eSpec, exemple, formula, liste, methode, retenir, tableau } from "./blocks";

export const SVT_3E: Chapter3eSpec[] = [
  {
    title: "Le système nerveux",
    summary: "Organisation et fonctionnement : réflexes et actes volontaires.",
    lessons: [
      {
        title: "L’organisation du système nerveux",
        body: `${liste([
            "Le <strong>système nerveux central</strong> : l’encéphale (cerveau, cervelet, bulbe rachidien), protégé par le crâne, et la moelle épinière, protégée par la colonne vertébrale.",
            "Le <strong>système nerveux périphérique</strong> : les nerfs, qui relient les centres nerveux aux organes.",
          ])}
          <p>L’unité de base est le <strong>neurone</strong> : un corps cellulaire, des dendrites et un long prolongement, l’axone. Les neurones transmettent des messages nerveux.</p>
          ${retenir("Nerfs <strong>sensitifs</strong> : des organes des sens vers les centres. Nerfs <strong>moteurs</strong> : des centres vers les muscles.")}`,
      },
      {
        title: "Le réflexe",
        body: `<p>Un <strong>réflexe</strong> est une réaction involontaire, rapide et toujours identique à une stimulation : retirer la main d’une marmite brûlante, le réflexe rotulien.</p>
          ${methode([
            "Le récepteur (la peau) capte la stimulation.",
            "Le nerf sensitif conduit le message jusqu’à la moelle épinière (centre du réflexe).",
            "Le nerf moteur conduit la réponse jusqu’au muscle.",
            "Le muscle (effecteur) se contracte.",
          ], "L’arc réflexe")}
          ${retenir("Le centre d’un réflexe médullaire est la moelle épinière : le cerveau n’intervient pas.")}`,
      },
      {
        title: "L’acte volontaire et l’hygiène",
        body: `<p>Un <strong>acte volontaire</strong> (écrire, shooter dans un ballon) est décidé par le cerveau. Le message part du cortex cérébral, descend par la moelle épinière et atteint les muscles par les nerfs moteurs.</p>
          ${liste([
            "Le sommeil est indispensable au bon fonctionnement du cerveau.",
            "L’alcool, le tabac et les drogues perturbent le système nerveux.",
            "Casque à moto et ceinture en voiture protègent l’encéphale et la moelle épinière.",
          ])}`,
      },
    ],
  },
  {
    title: "La vision",
    summary: "L’œil, la formation des images et les défauts de la vision.",
    lessons: [
      {
        title: "L’œil, organe de la vision",
        body: `${liste([
            "La <strong>cornée</strong>, transparente, laisse entrer la lumière.",
            "L’<strong>iris</strong> (partie colorée) règle l’ouverture de la <strong>pupille</strong>.",
            "Le <strong>cristallin</strong> est une lentille convergente souple.",
            "La <strong>rétine</strong>, au fond de l’œil, contient les cellules sensibles à la lumière.",
            "Le <strong>nerf optique</strong> transmet les messages au cerveau.",
          ])}
          ${retenir("L’œil reçoit la lumière ; c’est le cerveau qui « voit » en interprétant les messages.")}`,
      },
      {
        title: "La formation de l’image",
        body: `<p>Le cristallin forme sur la rétine une image <strong>réelle et renversée</strong> de l’objet. Le cerveau la redresse.</p>
          <p>Pour voir net de loin comme de près, le cristallin se bombe plus ou moins : c’est l’<strong>accommodation</strong>.</p>
          ${retenir("Le cristallin joue le rôle d’une lentille convergente, la rétine celui d’un écran.")}`,
      },
      {
        title: "Les défauts de la vision",
        body: `${tableau([
            ["Défaut", "Ce qui se passe", "Correction"],
            ["Myopie", "voit mal de loin ; l’image se forme avant la rétine", "lentilles divergentes"],
            ["Hypermétropie", "voit mal de près ; l’image se forme après la rétine", "lentilles convergentes"],
            ["Presbytie", "avec l’âge, le cristallin accommode moins", "lentilles convergentes pour lire"],
          ])}
          ${retenir("Lire avec une bonne lumière, faire des pauses devant les écrans et consulter un ophtalmologiste en cas de gêne.")}`,
      },
    ],
  },
  {
    title: "La respiration",
    summary: "Échanges gazeux et phénomènes énergétiques de la respiration.",
    lessons: [
      {
        title: "Les échanges gazeux pulmonaires",
        body: `<p>L’air inspiré arrive dans les <strong>alvéoles pulmonaires</strong>, de minuscules sacs entourés de capillaires sanguins.</p>
          ${liste([
            "Le dioxygène (O₂) passe de l’air des alvéoles dans le sang.",
            "Le dioxyde de carbone (CO₂) passe du sang dans l’air des alvéoles, puis il est rejeté.",
          ])}
          ${tableau([
            ["Gaz", "Air inspiré", "Air expiré"],
            ["Dioxygène", "21 %", "environ 16 %"],
            ["Dioxyde de carbone", "0,04 %", "environ 4 %"],
          ])}`,
      },
      {
        title: "Les échanges au niveau des tissus",
        body: `<p>Le sang transporte le dioxygène (fixé sur l’hémoglobine des globules rouges) jusqu’aux organes. Dans les tissus :</p>
          ${liste(["le dioxygène passe du sang aux cellules ;", "le CO₂ produit par les cellules passe dans le sang."])}
          ${retenir("Les échanges se font toujours du milieu le plus riche vers le milieu le plus pauvre en gaz.")}`,
      },
      {
        title: "La respiration cellulaire",
        body: `<p>Dans les cellules, le glucose (apporté par la digestion) est dégradé grâce au dioxygène. Cette réaction libère l’<strong>énergie</strong> nécessaire à la vie.</p>
          ${formula("glucose + dioxygène → dioxyde de carbone + eau + énergie")}
          ${retenir("Un muscle qui travaille consomme plus de glucose et de dioxygène : on respire plus vite et le cœur bat plus vite.")}`,
      },
    ],
  },
  {
    title: "La fermentation",
    summary: "Un autre moyen pour les cellules de se procurer de l’énergie.",
    lessons: [
      {
        title: "La fermentation alcoolique",
        body: `<p>Sans dioxygène, la <strong>levure</strong> dégrade le sucre en éthanol (alcool) et en dioxyde de carbone :</p>
          ${formula("glucose → éthanol + dioxyde de carbone + un peu d’énergie")}
          ${exemple(["La pâte à pain gonfle grâce au CO₂ produit par la levure. Le vin de palme fermente de la même façon."])}`,
      },
      {
        title: "Fermentation et respiration",
        body: `${tableau([
            ["", "Respiration", "Fermentation"],
            ["Dioxygène", "nécessaire", "absent"],
            ["Dégradation du glucose", "complète", "incomplète"],
            ["Énergie libérée", "beaucoup", "peu"],
          ])}
          <p>Les cellules musculaires, en effort intense, font une <strong>fermentation lactique</strong> : il se forme de l’acide lactique. Le lait caillé est aussi obtenu par fermentation lactique.</p>`,
      },
    ],
  },
  {
    title: "Le rein et l’excrétion urinaire",
    summary: "Formation de l’urine et régulation du milieu intérieur.",
    lessons: [
      {
        title: "L’appareil urinaire",
        body: `<p>Il comprend deux <strong>reins</strong>, deux <strong>uretères</strong>, la <strong>vessie</strong> et l’<strong>urètre</strong>.</p>
          <p>Chaque rein contient environ un million de <strong>néphrons</strong>, les unités qui fabriquent l’urine.</p>
          ${retenir("L’urine contient de l’eau, de l’urée, des sels minéraux. Elle ne contient normalement ni glucose ni protéines.")}`,
      },
      {
        title: "La formation de l’urine",
        body: `${methode([
            "<strong>Filtration</strong> : le sang est filtré dans le néphron ; il se forme l’urine primitive.",
            "<strong>Réabsorption</strong> : l’eau, le glucose et une partie des sels retournent dans le sang.",
            "<strong>Sécrétion</strong> : quelques déchets passent directement du sang dans l’urine.",
          ], "Trois étapes")}
          ${retenir("Le rein élimine les déchets (urée) et règle la quantité d’eau et de sels du corps : il maintient la constance du milieu intérieur.")}`,
      },
      {
        title: "Prendre soin de ses reins",
        body: `${liste([
            "Boire assez d’eau, surtout quand il fait chaud.",
            "Éviter l’abus de sel et l’automédication.",
            "La bilharziose (schistosomiase), présente dans les eaux douces stagnantes, peut abîmer l’appareil urinaire : éviter de s’y baigner.",
          ])}
          ${retenir("En cas d’insuffisance rénale grave, on recourt à la dialyse.")}`,
      },
    ],
  },
  {
    title: "L’immunité de l’organisme",
    summary: "Le système immunitaire, la réponse immunitaire et les groupes sanguins.",
    lessons: [
      {
        title: "Le soi, le non-soi et les défenses naturelles",
        body: `<p>L’organisme reconnaît ses propres cellules (le <strong>soi</strong>) et les éléments étrangers (le <strong>non-soi</strong>) : microbes, cellules d’un autre individu.</p>
          ${liste([
            "Barrières naturelles : la peau, les muqueuses, les larmes.",
            "<strong>Réaction inflammatoire</strong> : rougeur, chaleur, gonflement, douleur.",
            "<strong>Phagocytose</strong> : des globules blancs (phagocytes) englobent et digèrent les microbes.",
          ])}
          ${retenir("Ces défenses sont <strong>non spécifiques</strong> : elles agissent contre tous les microbes.")}`,
      },
      {
        title: "La réponse immunitaire spécifique",
        body: `${liste([
            "Les <strong>lymphocytes B</strong> produisent des <strong>anticorps</strong> qui neutralisent un antigène précis.",
            "Les <strong>lymphocytes T</strong> détruisent les cellules infectées.",
            "Après un premier contact, des cellules <strong>mémoire</strong> permettent une réponse plus rapide : c’est le principe du vaccin.",
          ])}
          ${retenir("Un anticorps reconnaît un seul antigène, comme une clé sa serrure.")}`,
      },
      {
        title: "Les groupes sanguins",
        body: `${tableau([
            ["Groupe", "Antigène sur les globules rouges", "Anticorps dans le plasma"],
            ["A", "A", "anti-B"],
            ["B", "B", "anti-A"],
            ["AB", "A et B", "aucun"],
            ["O", "aucun", "anti-A et anti-B"],
          ])}
          ${retenir("Le groupe O est donneur universel, le groupe AB receveur universel. Il faut aussi respecter le facteur Rhésus (+ ou −).")}`,
      },
    ],
  },
  {
    title: "Le VIH/sida et l’aide à l’immunité",
    summary: "Les défaillances du système immunitaire, vaccins et sérums.",
    lessons: [
      {
        title: "Le VIH et le sida",
        body: `<p>Le <strong>VIH</strong> (virus de l’immunodéficience humaine) détruit les lymphocytes T4, chefs d’orchestre de l’immunité. Sans traitement, l’organisme ne se défend plus : c’est le <strong>sida</strong>.</p>
          ${liste([
            "Transmission : rapports sexuels non protégés, sang (objets tranchants partagés), de la mère à l’enfant.",
            "Pas de transmission par la salive, la poignée de main, le repas partagé ou les moustiques.",
            "Prévention : abstinence, fidélité, préservatif, objets tranchants personnels, dépistage.",
          ])}
          ${retenir("Le dépistage est gratuit et confidentiel. Les traitements antirétroviraux permettent de vivre longtemps avec le VIH.")}`,
      },
      {
        title: "Vaccins et sérums",
        body: `${tableau([
            ["", "Vaccin", "Sérum"],
            ["Contenu", "microbe affaibli ou tué, ou une partie du microbe", "anticorps déjà fabriqués"],
            ["Action", "préventive, lente, durable", "curative, immédiate, courte"],
            ["Exemple", "rougeole, polio, tétanos", "sérum antivenimeux, antitétanique"],
          ])}
          ${retenir("Le Programme élargi de vaccination (PEV) protège gratuitement les enfants contre plusieurs maladies graves.")}`,
      },
    ],
  },
  {
    title: "La tectonique des plaques",
    summary: "Les plaques lithosphériques et leurs mouvements.",
    lessons: [
      {
        title: "Les plaques lithosphériques",
        body: `<p>La surface de la Terre est découpée en une douzaine de grandes <strong>plaques lithosphériques</strong> rigides qui se déplacent de quelques centimètres par an sur l’asthénosphère, plus déformable.</p>
          <p>Les séismes et les volcans se concentrent surtout aux <strong>frontières</strong> des plaques.</p>
          ${retenir("Le Sénégal est sur la plaque africaine, loin de ses frontières : les séismes y sont rares.")}`,
      },
      {
        title: "Les mouvements des plaques",
        body: `${liste([
            "<strong>Divergence</strong> : au niveau des dorsales océaniques, les plaques s’écartent et un nouveau plancher océanique se forme (l’Atlantique s’élargit).",
            "<strong>Convergence</strong> : une plaque océanique plonge sous une autre (<strong>subduction</strong>) ; volcans explosifs et séismes. Quand deux continents se heurtent, des montagnes se forment (Himalaya).",
            "<strong>Coulissage</strong> : les plaques glissent l’une contre l’autre (faille de San Andreas).",
          ])}
          ${retenir("Les vitesses se mesurent aujourd’hui par satellite (GPS).")}`,
      },
    ],
  },
  {
    title: "Les roches métamorphiques",
    summary: "Formation et caractères des roches métamorphiques.",
    lessons: [
      {
        title: "Qu’est-ce que le métamorphisme ?",
        body: `<p>Le <strong>métamorphisme</strong> est la transformation d’une roche, à l’état solide, sous l’effet d’une forte <strong>température</strong> et d’une forte <strong>pression</strong>, en profondeur (zones de collision, enfouissement).</p>
          ${retenir("La roche ne fond pas : ses minéraux se réorganisent et de nouveaux minéraux apparaissent.")}`,
      },
      {
        title: "Exemples de roches métamorphiques",
        body: `${tableau([
            ["Roche de départ", "Roche métamorphique"],
            ["argile", "schiste, puis micaschiste, puis gneiss"],
            ["calcaire", "marbre"],
            ["grès", "quartzite"],
          ])}
          ${retenir("Une roche métamorphique présente souvent une <strong>foliation</strong> : ses minéraux sont alignés en feuillets.")}`,
      },
    ],
  },
  {
    title: "Le cycle des roches et la chronologie en géologie",
    summary: "Transformation des roches et datation des événements géologiques.",
    lessons: [
      {
        title: "Le cycle des roches",
        body: `<p>Les roches se transforment sans cesse :</p>
          ${liste([
            "les roches <strong>magmatiques</strong> naissent du refroidissement d’un magma (granite, basalte) ;",
            "l’érosion les détruit ; les débris forment des roches <strong>sédimentaires</strong> (sable, grès, calcaire) ;",
            "enfouies, elles deviennent <strong>métamorphiques</strong> ; si elles fondent, elles redonnent un magma.",
          ])}
          ${retenir("Le basalte des Mamelles, à Dakar, est une roche volcanique (magmatique).")}`,
      },
      {
        title: "Dater les événements géologiques",
        body: `${liste([
            "<strong>Superposition</strong> : une couche est plus récente que celle qu’elle recouvre.",
            "<strong>Recoupement</strong> : une faille ou une roche qui en coupe une autre lui est postérieure.",
            "<strong>Fossiles stratigraphiques</strong> : deux couches contenant les mêmes fossiles ont le même âge.",
          ])}
          ${retenir("Ces principes donnent une chronologie <strong>relative</strong> (avant, après). La datation absolue utilise la radioactivité.")}`,
      },
    ],
  },
];
