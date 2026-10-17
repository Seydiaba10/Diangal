// Économie de la série G (1re et Terminale). Chapitres INDICATIFS, établis d’après la liste des épreuves
// du Bac de la série G (« Économie générale ») ; programme officiel non trouvé en ligne. Leçons rédigées
// par DIANGAL, à faire valider par un professeur d’économie.

import { type ChapterSpec, exemple, formula, liste, retenir, tableau } from "../tle/blocks";

export const ECO_1RE: ChapterSpec[] = [
  {
    title: "L’activité économique et ses agents",
    summary: "Besoins, biens et services, agents économiques et circuit économique.",
    lessons: [
      {
        title: "Besoins, biens et agents",
        minutes: 15,
        body: `${liste([
            "l’activité économique cherche à satisfaire des <strong>besoins</strong> illimités avec des ressources rares ;",
            "les biens économiques sont rares et ont un prix ; les biens libres (l’air) sont gratuits ;",
            "agents économiques : ménages (consomment), entreprises (produisent), administrations publiques, institutions financières, reste du monde ;",
            "le <strong>circuit économique</strong> représente les flux réels (biens, travail) et monétaires (salaires, dépenses) entre ces agents.",
          ])}`,
      },
    ],
  },
  {
    title: "La production et les facteurs de production",
    summary: "Travail, capital, secteurs d’activité, valeur ajoutée et productivité.",
    lessons: [
      {
        title: "Produire",
        minutes: 15,
        body: `${liste([
            "facteurs de production : le <strong>travail</strong> et le <strong>capital</strong> (fixe : machines, bâtiments ; circulant : matières premières) ;",
            "secteurs : primaire (agriculture, pêche, mines), secondaire (industrie), tertiaire (services) ;",
            "la productivité mesure l’efficacité : production ÷ quantité de facteur utilisé.",
          ])}
          ${formula("Valeur ajoutée = production − consommations intermédiaires")}
          ${exemple(["Un boulanger vend pour 500 000 F de pain et achète 300 000 F de farine et d’énergie : sa valeur ajoutée est 200 000 F."])}`,
      },
    ],
  },
  {
    title: "Le marché et la formation des prix",
    summary: "Offre, demande, prix d’équilibre ; formes de concurrence.",
    lessons: [
      {
        title: "L’équilibre du marché",
        minutes: 15,
        body: `${liste([
            "la demande diminue quand le prix augmente ; l’offre augmente quand le prix augmente ;",
            "le <strong>prix d’équilibre</strong> est celui pour lequel la quantité offerte égale la quantité demandée ;",
            "structures de marché : concurrence, monopole (un seul vendeur), oligopole (quelques vendeurs) ;",
            "l’État peut intervenir : prix homologués, subventions, taxes.",
          ])}
          ${retenir("Une pénurie fait monter le prix ; un excédent le fait baisser.")}`,
      },
    ],
  },
  {
    title: "La monnaie et le financement de l’économie",
    summary: "Fonctions et formes de la monnaie, franc CFA, BCEAO, banques et crédit.",
    lessons: [
      {
        title: "La monnaie",
        minutes: 15,
        body: `${liste([
            "fonctions : intermédiaire des échanges, unité de compte, réserve de valeur ;",
            "formes : monnaie fiduciaire (billets, pièces), scripturale (comptes bancaires), électronique (paiement par téléphone) ;",
            "au Sénégal, la monnaie est le franc CFA, émis par la BCEAO, dont le siège est à Dakar ;",
            "les banques financent l’économie par le crédit ; les entreprises se financent aussi par autofinancement ou en émettant des actions.",
          ])}`,
      },
    ],
  },
  {
    title: "Revenu, consommation et épargne",
    summary: "Formation et répartition du revenu, consommation, épargne.",
    lessons: [
      {
        title: "Utiliser son revenu",
        minutes: 15,
        body: `${liste([
            "revenus primaires : salaires, profits, intérêts, loyers ; revenus de transfert : allocations, pensions, envois des émigrés ;",
            "revenu disponible = revenus − impôts et cotisations ;",
            "il est partagé entre consommation et épargne ;",
            "loi d’Engel : quand le revenu augmente, la part consacrée à l’alimentation diminue.",
          ])}
          ${formula("Propension moyenne à consommer = consommation ÷ revenu disponible")}`,
      },
    ],
  },
  {
    title: "L’investissement",
    summary: "Formes, déterminants et financement de l’investissement.",
    lessons: [
      {
        title: "Investir",
        minutes: 12,
        body: `${liste([
            "investir, c’est acquérir des biens de production durables : matériel, bâtiments, mais aussi formation et recherche (investissement immatériel) ;",
            "investissement de remplacement, de capacité (produire plus) ou de productivité (produire mieux) ;",
            "il dépend de la demande attendue, du taux d’intérêt et de la rentabilité espérée ;",
            "financement : autofinancement, emprunt, augmentation de capital, subventions.",
          ])}`,
      },
    ],
  },
  {
    title: "La comptabilité nationale",
    summary: "PIB, PIB par habitant, croissance, PIB nominal et réel.",
    lessons: [
      {
        title: "Mesurer la richesse produite",
        minutes: 15,
        body: `${liste([
            "le <strong>PIB</strong> est la somme des valeurs ajoutées produites sur le territoire en un an ;",
            "PIB par habitant = PIB ÷ population ;",
            "le PIB nominal est mesuré aux prix courants ; le PIB réel élimine la hausse des prix ;",
            "taux de croissance = (PIB de l’année − PIB de l’année précédente) ÷ PIB de l’année précédente × 100.",
          ])}
          ${exemple(["Un PIB réel qui passe de 1 000 à 1 050 milliards augmente de 5 %."])}`,
      },
    ],
  },
];

export const ECO_TLE: ChapterSpec[] = [
  {
    title: "Croissance et développement",
    summary: "Croissance économique, développement humain, stratégies de développement du Sénégal.",
    lessons: [
      {
        title: "Croître et se développer",
        minutes: 15,
        body: `${tableau([
            ["", "Croissance", "Développement"],
            ["nature", "quantitative : hausse durable de la production", "qualitative : amélioration des conditions de vie"],
            ["mesure", "taux de croissance du PIB réel", "IDH (revenu, santé, éducation)"],
          ])}
          ${liste(["facteurs de croissance : travail, capital, progrès technique, institutions ;", "le Sénégal a adopté le Plan Sénégal émergent (2014), puis l’Agenda national de transformation « Sénégal 2050 » (2024)."])}`,
      },
    ],
  },
  {
    title: "Inflation et chômage",
    summary: "Mesure et causes de l’inflation ; formes du chômage et du sous-emploi.",
    lessons: [
      {
        title: "Deux déséquilibres",
        minutes: 15,
        body: `${liste([
            "l’<strong>inflation</strong> est une hausse générale et durable des prix ; elle se mesure par un indice des prix à la consommation ;",
            "causes : excès de demande, hausse des coûts (pétrole, importations), création monétaire excessive ;",
            "le <strong>chômage</strong> touche les personnes sans emploi qui en cherchent un : conjoncturel, structurel, frictionnel ;",
            "au Sénégal, le sous-emploi et le secteur informel occupent une grande partie des actifs.",
          ])}`,
      },
    ],
  },
  {
    title: "Les politiques économiques",
    summary: "Objectifs, politique budgétaire et politique monétaire.",
    lessons: [
      {
        title: "Agir sur l’économie",
        minutes: 15,
        body: `${liste([
            "objectifs (le « carré magique ») : croissance, plein emploi, stabilité des prix, équilibre extérieur ;",
            "politique <strong>budgétaire</strong> : l’État agit par ses dépenses et ses impôts ;",
            "politique <strong>monétaire</strong> : dans l’UEMOA, la BCEAO agit sur les taux directeurs et le crédit ;",
            "une politique de relance stimule la demande ; une politique de rigueur freine l’inflation et les déficits.",
          ])}`,
      },
    ],
  },
  {
    title: "Le commerce international et la balance des paiements",
    summary: "Avantages comparatifs, libre-échange et protectionnisme, balance commerciale.",
    lessons: [
      {
        title: "Échanger avec le monde",
        minutes: 15,
        body: `${liste([
            "selon Ricardo, chaque pays gagne à se spécialiser dans les productions où il a un avantage comparatif ;",
            "le libre-échange supprime les obstacles au commerce ; le protectionnisme protège les productions nationales (droits de douane, quotas) ;",
            "balance commerciale = exportations − importations de biens ; la balance des paiements enregistre toutes les opérations avec l’extérieur.",
          ])}
          ${formula("Taux de couverture = exportations ÷ importations × 100")}
          ${exemple(["Exportations 2 000 milliards, importations 4 000 milliards : taux de couverture 50 %, balance commerciale déficitaire."])}`,
      },
    ],
  },
  {
    title: "L’intégration économique régionale",
    summary: "Degrés d’intégration ; UEMOA, CEDEAO, ZLECAf.",
    lessons: [
      {
        title: "S’unir pour se développer",
        minutes: 15,
        body: `${tableau([
            ["Degré", "Contenu"],
            ["zone de libre-échange", "suppression des droits de douane entre membres"],
            ["union douanière", "+ tarif extérieur commun"],
            ["marché commun", "+ libre circulation des personnes et des capitaux"],
            ["union économique et monétaire", "+ politiques communes et monnaie unique"],
          ])}
          ${retenir("L’UEMOA (1994, huit États) est une union économique et monétaire ; la CEDEAO vise un marché commun ouest-africain ; la ZLECAf veut un marché continental.")}`,
      },
    ],
  },
  {
    title: "La mondialisation et les institutions internationales",
    summary: "Firmes multinationales, FMI, Banque mondiale, OMC, dette.",
    lessons: [
      {
        title: "Une économie mondialisée",
        minutes: 15,
        body: `${liste([
            "la mondialisation est l’intégration croissante des économies par les échanges, les capitaux et l’information ;",
            "les firmes multinationales produisent et vendent dans de nombreux pays ;",
            "FMI (stabilité financière, prêts), Banque mondiale (financement du développement), OMC (règles du commerce) ;",
            "l’endettement des pays du Sud pose la question de sa soutenabilité.",
          ])}`,
      },
    ],
  },
  {
    title: "L’économie du Sénégal",
    summary: "Structure de l’économie sénégalaise, atouts et défis.",
    lessons: [
      {
        title: "Atouts et défis",
        minutes: 15,
        body: `${liste([
            "les services dominent la production ; l’agriculture emploie encore beaucoup d’actifs ;",
            "ressources : pêche, phosphates, or, zircon ; pétrole (Sangomar) et gaz (Grand Tortue Ahmeyim) en mer depuis 2024-2025 ;",
            "les transferts des émigrés sont une source importante de revenus pour les ménages ;",
            "défis : emploi des jeunes, secteur informel, dépendance alimentaire et énergétique, dette.",
          ])}`,
      },
    ],
  },
];
