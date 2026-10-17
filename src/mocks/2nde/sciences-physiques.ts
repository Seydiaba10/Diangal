// Sciences physiques de 2nde : chapitres du relevé DIANGAL (titres des cours de 2nde S et de 2nde L de
// Sunudaara, à confirmer avec le programme officiel, non trouvé en ligne). Leçons rédigées par DIANGAL, à
// faire valider par un professeur de sciences physiques.

import { type ChapterSpec, exemple, formula, frac, liste, retenir, sub, sup, tableau, vec } from "../tle/blocks";

const PHY = "Physique";
const CHI = "Chimie";

const MIXTURES: ChapterSpec = {
  title: "Mélanges et corps purs",
  summary: "Mélanges homogènes et hétérogènes, séparation, critères de pureté, corps simples et composés.",
  strand: CHI,
  lessons: [
    {
      title: "Mélanges, corps purs, corps simples",
      minutes: 15,
      body: `${liste([
          "un corps pur a des constantes physiques fixes (températures de fusion et d’ébullition, masse volumique) ;",
          "séparation : décantation, filtration, distillation, extraction par solvant, chromatographie ;",
          "un corps pur <strong>simple</strong> n’est formé que d’un seul élément (dioxygène O₂, fer Fe) ; un corps <strong>composé</strong> en contient plusieurs (eau H₂O).",
        ])}
        ${exemple(["L’électrolyse de l’eau donne du dihydrogène et du dioxygène : l’eau est un corps composé."])}`,
    },
  ],
};

const MOTION: ChapterSpec = {
  title: "Mouvement et vitesse",
  summary: "Référentiel, trajectoire, vitesse moyenne et instantanée, mouvement uniforme.",
  strand: PHY,
  lessons: [
    {
      title: "Décrire un mouvement",
      minutes: 15,
      body: `${liste([
          "un mouvement se décrit par rapport à un <strong>référentiel</strong> (le sol, le car) : un passager est immobile par rapport au car, en mouvement par rapport à la route ;",
          "la trajectoire est l’ensemble des positions successives : rectiligne, circulaire, curviligne ;",
          "mouvement uniforme : la vitesse reste constante.",
        ])}
        ${formula(`v = ${frac("d", "t")} (m/s ou km/h ; 1 m/s = 3,6 km/h)`)}
        ${exemple(["Un car parcourt 180 km en 3 h : v = 180 ÷ 3 = 60 km/h, soit environ 16,7 m/s."])}`,
    },
  ],
};

const WEIGHT: ChapterSpec = {
  title: "Forces, poids et masse",
  summary: "Effets d’une force, caractéristiques, représentation ; relation poids-masse.",
  strand: PHY,
  lessons: [
    {
      title: "Les forces",
      minutes: 15,
      body: `${liste([
          "une force peut mettre un objet en mouvement, modifier son mouvement ou le déformer ;",
          "elle a un point d’application, une direction, un sens et une intensité (en newtons, N) mesurée au dynamomètre ;",
          "on la représente par un vecteur ; forces de contact (réaction, tension d’un fil) ou à distance (poids, force magnétique).",
        ])}`,
    },
    {
      title: "Poids et masse",
      minutes: 12,
      body: `${formula(`P = m × g (g ≈ 9,8 N/kg)`)}
        ${retenir("Le poids est vertical, vers le bas, appliqué au centre de gravité ; la masse (kg) ne dépend pas du lieu.")}
        ${exemple(["Un élève de 50 kg a un poids de 490 N."])}`,
    },
  ],
};

const ACIDS: ChapterSpec = {
  title: "Solutions aqueuses acides et basiques ; pH",
  summary: "Solutions, concentration, solutions acides, basiques et neutres, pH et indicateurs colorés.",
  strand: CHI,
  lessons: [
    {
      title: "Solutions et concentration",
      minutes: 15,
      body: `${liste([
          "une solution aqueuse est obtenue en dissolvant un <strong>soluté</strong> dans l’eau (le solvant) ;",
          "concentration massique : C<sub>m</sub> = m ÷ V (g/L) ; concentration molaire : C = n ÷ V (mol/L) ;",
          "une solution d’acide chlorhydrique contient des ions H₃O⁺ ; une solution d’hydroxyde de sodium (soude) des ions OH⁻.",
        ])}
        ${exemple(["5,85 g de chlorure de sodium (0,1 mol) dissous dans 0,5 L : C = 0,2 mol/L."])}`,
    },
    {
      title: "Le pH",
      minutes: 12,
      body: `${tableau([
          ["pH à 25 °C", "Solution", "Exemples"],
          ["pH &lt; 7", "acide", "jus de citron, vinaigre, bissap"],
          ["pH = 7", "neutre", "eau pure, eau salée"],
          ["pH &gt; 7", "basique", "eau de chaux, soude, eau savonneuse"],
        ])}
        ${retenir("On mesure le pH au papier pH ou au pH-mètre ; un indicateur coloré (BBT, hélianthine, phénolphtaléine) change de couleur selon le pH. Diluer une solution acide fait monter son pH vers 7.")}`,
    },
  ],
};

const CIRCUIT: ChapterSpec = {
  title: "Le circuit électrique : intensité et tension",
  summary: "Courant électrique, sens conventionnel, intensité et tension, lois des circuits.",
  strand: PHY,
  lessons: [
    {
      title: "Intensité et tension",
      minutes: 15,
      body: `${liste([
          "le courant sort par la borne + du générateur ; dans les métaux, il est dû au déplacement des électrons (en sens inverse) ;",
          "l’<strong>intensité</strong> I (ampère, A) se mesure avec un ampèremètre branché <strong>en série</strong> ;",
          "la <strong>tension</strong> U (volt, V) se mesure avec un voltmètre branché <strong>en dérivation</strong> ;",
          "en série, l’intensité est la même partout et les tensions s’additionnent ; en dérivation, les intensités s’additionnent (loi des nœuds) et la tension est la même.",
        ])}`,
    },
  ],
};

export const PC_2NDE_S: ChapterSpec[] = [
  // ── Chimie ────────────────────────────────────────────────────────────────
  MIXTURES,
  {
    title: "Atomes, éléments et classification périodique",
    summary: "Structure de l’atome, numéro atomique, isotopes, structure électronique, tableau périodique.",
    strand: CHI,
    lessons: [
      {
        title: "L’atome",
        minutes: 15,
        body: `${liste([
            "l’atome est formé d’un noyau (Z protons et N neutrons, A = Z + N nucléons) et de Z électrons ;",
            "on note un noyau <sup>A</sup><sub>Z</sub>X : <sup>12</sup><sub>6</sub>C contient 6 protons et 6 neutrons ;",
            "des <strong>isotopes</strong> ont le même Z mais des A différents (¹²C et ¹⁴C) ;",
            "les électrons se répartissent en couches K (2 au plus), L (8), M (8 pour les 18 premiers éléments).",
          ])}
          ${exemple(["Sodium Na (Z = 11) : K² L⁸ M¹."])}`,
      },
      {
        title: "La classification périodique",
        minutes: 12,
        body: `${liste([
            "les éléments sont rangés par Z croissant ; une ligne (période) correspond à une couche en cours de remplissage ;",
            "les éléments d’une même colonne (famille) ont le même nombre d’électrons sur la couche externe et des propriétés voisines ;",
            "familles : alcalins (colonne 1), halogènes (colonne 17), gaz nobles (colonne 18, très stables).",
          ])}`,
      },
    ],
  },
  {
    title: "Les liaisons chimiques",
    summary: "Règles du duet et de l’octet, liaison covalente, liaison ionique.",
    strand: CHI,
    lessons: [
      {
        title: "Liaison covalente et liaison ionique",
        minutes: 15,
        body: `${liste([
            "les atomes cherchent à avoir la structure électronique du gaz noble le plus proche (règles du duet et de l’octet) ;",
            "<strong>liaison covalente</strong> : mise en commun d’un doublet d’électrons (H–H, H–O–H) ;",
            "<strong>liaison ionique</strong> : un atome cède des électrons à un autre ; les ions formés s’attirent (Na⁺ et Cl⁻ dans le sel).",
          ])}
          ${exemple(["Le chlore (M⁷) gagne un électron pour devenir Cl⁻ ; le sodium (M¹) en perd un pour devenir Na⁺."])}`,
      },
    ],
  },
  {
    title: "La mole et les grandeurs molaires",
    summary: "Quantité de matière, masse molaire, volume molaire, constante d’Avogadro.",
    strand: CHI,
    lessons: [
      {
        title: "Quantité de matière",
        minutes: 15,
        body: `${formula(`n = ${frac("m", "M")} = ${frac("V", "V<sub>m</sub>")} = ${frac("N", "N<sub>A</sub>")}`)}
          ${liste([
            `N<sub>A</sub> = 6,02 × 10${sup("23")} mol⁻¹ ;`,
            "masse molaire moléculaire : somme des masses molaires atomiques : M(CO₂) = 12 + 2 × 16 = 44 g/mol ;",
            "volume molaire d’un gaz : 22,4 L/mol à 0 °C sous 1 atm (environ 24 L/mol à 20 °C).",
          ])}
          ${exemple(["11 g de CO₂ : n = 11 ÷ 44 = 0,25 mol, soit 5,6 L à 0 °C."])}`,
      },
    ],
  },
  {
    title: "Réaction chimique et équation-bilan",
    summary: "Équilibrer une équation, conservation des éléments, bilan de matière.",
    strand: CHI,
    lessons: [
      {
        title: "Équilibrer et exploiter une équation",
        minutes: 15,
        body: `${liste([
            "les coefficients assurent la conservation des éléments et des charges ;",
            "les quantités de réactifs consommés sont proportionnelles aux coefficients ;",
            "le réactif en défaut (limitant) est entièrement consommé.",
          ])}
          ${formula(`CH${sub("4")} + 2 O${sub("2")} → CO${sub("2")} + 2 H${sub("2")}O`)}
          ${exemple(["La combustion de 2 mol de méthane consomme 4 mol de dioxygène et produit 2 mol de CO₂."])}`,
      },
    ],
  },
  ACIDS,
  {
    title: "Caractérisation de quelques ions",
    summary: "Tests des ions chlorure, sulfate, cuivre II, fer II, fer III, zinc.",
    strand: CHI,
    lessons: [
      {
        title: "Tests d’identification",
        minutes: 12,
        body: `${tableau([
            ["Ion", "Réactif", "Observation"],
            ["Cl⁻ (chlorure)", "nitrate d’argent", "précipité blanc qui noircit à la lumière"],
            ["SO₄²⁻ (sulfate)", "chlorure de baryum", "précipité blanc"],
            ["Cu²⁺", "soude", "précipité bleu"],
            ["Fe²⁺", "soude", "précipité vert"],
            ["Fe³⁺", "soude", "précipité rouille"],
          ])}`,
      },
    ],
  },
  // ── Physique ──────────────────────────────────────────────────────────────
  MOTION,
  WEIGHT,
  {
    title: "Équilibre d’un solide soumis à des forces",
    summary: "Conditions d’équilibre sous l’action de deux ou trois forces non parallèles.",
    strand: PHY,
    lessons: [
      {
        title: "Conditions d’équilibre",
        minutes: 15,
        body: `${liste([
            `deux forces : même droite d’action, intensités égales, sens opposés (${vec("F₁")} + ${vec("F₂")} = ${vec("0")}) ;`,
            `trois forces non parallèles : elles sont <strong>coplanaires</strong> et <strong>concourantes</strong>, et ${vec("F₁")} + ${vec("F₂")} + ${vec("F₃")} = ${vec("0")} ;`,
            "on résout graphiquement (triangle des forces) ou par projection sur des axes.",
          ])}
          ${exemple(["Un lustre suspendu à un fil : le poids et la tension du fil se compensent, T = P."])}`,
      },
    ],
  },
  {
    title: "Équilibre d’un solide mobile autour d’un axe fixe",
    summary: "Moment d’une force, théorème des moments, couple.",
    strand: PHY,
    lessons: [
      {
        title: "Le théorème des moments",
        minutes: 15,
        body: `${formula("M(F) = ± F × d (N·m)")}
          ${liste([
            "d est la distance entre l’axe et la droite d’action de la force (bras de levier) ;",
            "à l’équilibre, la somme des moments des forces par rapport à l’axe est nulle ;",
            "une force dont la droite d’action rencontre l’axe a un moment nul.",
          ])}
          ${exemple(["Une balançoire : 300 N à 2 m de l’axe équilibrent 400 N à 1,5 m (600 = 600)."])}`,
      },
    ],
  },
  {
    title: "Électrisation et courant électrique",
    summary: "Phénomènes d’électrisation, charges, nature du courant électrique.",
    strand: PHY,
    lessons: [
      {
        title: "L’électrisation",
        minutes: 12,
        body: `${liste([
            "un corps frotté peut s’électriser : il gagne ou perd des électrons ;",
            "deux corps de charges de même signe se repoussent ; de signes contraires, ils s’attirent ;",
            "la charge élémentaire vaut e = 1,6 × 10⁻¹⁹ C ;",
            "le courant électrique est un déplacement d’ensemble de porteurs de charges (électrons dans les métaux, ions dans les solutions).",
          ])}`,
      },
    ],
  },
  CIRCUIT,
  {
    title: "Dipôles passifs et dipôles actifs",
    summary: "Caractéristiques, loi d’Ohm, association de résistors, générateur et récepteur.",
    strand: PHY,
    lessons: [
      {
        title: "Dipôles passifs : la loi d’Ohm",
        minutes: 15,
        body: `${formula("U = R × I")}
          ${liste([
            "en série : R = R₁ + R₂ ; en parallèle : 1/R = 1/R₁ + 1/R₂ ;",
            "la caractéristique d’un résistor est une droite passant par l’origine.",
          ])}
          ${exemple(["R₁ = 100 Ω et R₂ = 200 Ω en série : R = 300 Ω ; sous 6 V, I = 0,02 A."])}`,
      },
      {
        title: "Dipôles actifs",
        minutes: 12,
        body: `${liste([
            "un générateur (pile) a une f.é.m. E et une résistance interne r : U = E − rI ;",
            "un électrolyseur ou un moteur (récepteur actif) : U = E’ + r’I ;",
            "le point de fonctionnement d’un circuit est l’intersection des caractéristiques du générateur et du récepteur.",
          ])}`,
      },
    ],
  },
  {
    title: "L’amplificateur opérationnel",
    summary: "Présentation, régime linéaire, montages suiveur, inverseur et non inverseur.",
    strand: PHY,
    lessons: [
      {
        title: "Montages de base",
        minutes: 15,
        body: `${liste([
            "l’amplificateur opérationnel idéal a des courants d’entrée nuls ; en régime linéaire, la tension entre ses entrées est nulle ;",
            "suiveur : U<sub>s</sub> = U<sub>e</sub> ;",
            "inverseur : U<sub>s</sub> = −(R₂/R₁) U<sub>e</sub> ;",
            "non inverseur : U<sub>s</sub> = (1 + R₂/R₁) U<sub>e</sub>.",
          ])}
          ${exemple(["Inverseur avec R₁ = 1 kΩ, R₂ = 10 kΩ et U<sub>e</sub> = 0,5 V : U<sub>s</sub> = −5 V."])}`,
      },
    ],
  },
];

export const PC_2NDE_L: ChapterSpec[] = [
  MIXTURES,
  {
    title: "Structure et quantité de matière",
    summary: "Atomes, molécules, ions ; la mole et la masse molaire.",
    strand: CHI,
    lessons: [
      {
        title: "De l’atome à la mole",
        minutes: 15,
        body: `${liste([
            "la matière est faite d’atomes, de molécules et d’ions ;",
            "un atome : un noyau (protons et neutrons) et des électrons ; il est neutre ;",
            "la quantité de matière se compte en moles : n = m ÷ M.",
          ])}
          ${exemple(["18 g d’eau (M = 18 g/mol) représentent 1 mol, soit 6,02 × 10²³ molécules."])}`,
      },
    ],
  },
  {
    title: "Transformations de la matière",
    summary: "Transformations physiques et chimiques ; réactions et équation-bilan.",
    strand: CHI,
    lessons: [
      {
        title: "Physique ou chimique ?",
        minutes: 12,
        body: `${liste([
            "transformation physique : la matière change d’état ou de forme mais reste la même (la glace fond) ;",
            "transformation chimique : de nouvelles substances apparaissent (le bois brûle, le fer rouille) ;",
            "au cours d’une réaction chimique, les éléments et la masse se conservent.",
          ])}
          ${formula(`C + O${sub("2")} → CO${sub("2")}`)}`,
      },
    ],
  },
  ACIDS,
  {
    title: "L’électricité dans notre environnement",
    summary: "Production, transport et usages de l’électricité ; sécurité.",
    strand: PHY,
    lessons: [
      {
        title: "Produire et utiliser l’électricité",
        minutes: 12,
        body: `${liste([
            "centrales thermiques (fioul, gaz), solaires, éoliennes (Taïba Ndiaye), hydroélectriques (barrage de Manantali) ;",
            "le courant du secteur est alternatif : environ 230 V (on dit souvent « 220 V ») et 50 Hz ;",
            "dangers : électrocution, incendie ; le disjoncteur et la prise de terre protègent ;",
            "économiser l’énergie : éteindre les lampes, préférer les lampes à basse consommation.",
          ])}`,
      },
    ],
  },
  CIRCUIT,
  MOTION,
  WEIGHT,
];
