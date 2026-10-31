// Sciences physiques de 1re : chapitres du relevé DIANGAL (titres des cours de 1re S et de 1re L de
// Sunudaara, à confirmer avec le programme officiel, non trouvé en ligne). Les séries S1 et S2 partagent
// le même programme ; la 1re L2 en reprend la chimie organique. Leçons rédigées par DIANGAL, à faire
// valider par un professeur de sciences physiques.

import { type ChapterSpec, exemple, formula, frac, liste, retenir, sub, sup, tableau } from "../tle/blocks";
import { figure, schema } from "../lesson-figures";

const PHY = "Physique";
const CHI = "Chimie";

const ORGANIC: ChapterSpec = {
  title: "Généralités sur la chimie organique",
  summary: "Le carbone tétravalent, formules brute, développée et semi-développée, isomérie.",
  strand: CHI,
  lessons: [
    {
      title: "Les composés du carbone",
      minutes: 15,
      body: `${liste([
          "la chimie organique est la chimie des composés du carbone (sauf CO, CO₂ et carbonates) ;",
          "l’atome de carbone est <strong>tétravalent</strong> : il forme quatre liaisons ;",
          "formule brute (C₂H₆O), développée (toutes les liaisons), semi-développée (CH₃–CH₂–OH) ;",
          "des <strong>isomères</strong> ont la même formule brute mais des formules développées différentes (éthanol et méthoxyméthane).",
        ])}
        ${retenir("La combustion complète d’un composé organique donne du dioxyde de carbone et de l’eau.")}`,
    },
  ],
};

const ALKANES: ChapterSpec = {
  title: "Les alcanes",
  summary: "Formule générale, nomenclature, combustion, réaction de substitution.",
  strand: CHI,
  lessons: [
    {
      title: "Les alcanes",
      minutes: 15,
      body: `${formula(`C${sub("n")}H${sub("2n+2")}`)}
        ${liste([
          "méthane CH₄, éthane C₂H₆, propane C₃H₈, butane C₄H₁₀ (gaz butane des bonbonnes) ;",
          "nomenclature : chaîne la plus longue, ramifications numérotées par les plus petits indices (2-méthylpropane) ;",
          "combustion complète : C₃H₈ + 5 O₂ → 3 CO₂ + 4 H₂O ;",
          "substitution avec le dichlore à la lumière : CH₄ + Cl₂ → CH₃Cl + HCl.",
        ])}`,
    },
  ],
};

const ALKENES: ChapterSpec = {
  title: "Les alcènes et les alcynes",
  summary: "Doubles et triples liaisons, réactions d’addition, polymérisation.",
  strand: CHI,
  lessons: [
    {
      title: "Hydrocarbures insaturés",
      minutes: 15,
      body: `${tableau([
          ["Famille", "Formule générale", "Exemple"],
          ["alcènes (double liaison C=C)", `C${sub("n")}H${sub("2n")}`, "éthylène (éthène) CH₂=CH₂"],
          ["alcynes (triple liaison C≡C)", `C${sub("n")}H${sub("2n−2")}`, "acétylène (éthyne) HC≡CH"],
        ])}
        ${liste([
          "réactions d’<strong>addition</strong> : dihydrogène, dibrome (décoloration de l’eau de brome, test des insaturations), eau, chlorure d’hydrogène ;",
          "<strong>polymérisation</strong> : n CH₂=CH₂ → (–CH₂–CH₂–)ₙ, le polyéthylène des sachets plastiques.",
        ])}`,
    },
  ],
};

const OXYGENATED: ChapterSpec = {
  title: "Les composés oxygénés",
  summary: "Alcools, aldéhydes, cétones, acides carboxyliques ; oxydation des alcools.",
  strand: CHI,
  lessons: [
    {
      title: "Fonctions oxygénées",
      minutes: 15,
      body: `${tableau([
          ["Famille", "Groupe", "Exemple"],
          ["alcool", "–OH", "éthanol CH₃–CH₂–OH"],
          ["aldéhyde", "–CHO", "éthanal CH₃–CHO"],
          ["cétone", "C=O entre deux carbones", "propanone (acétone)"],
          ["acide carboxylique", "–COOH", "acide éthanoïque (vinaigre)"],
        ])}
        ${retenir("L’oxydation ménagée d’un alcool primaire donne un aldéhyde puis un acide carboxylique ; celle d’un alcool secondaire donne une cétone.")}`,
    },
  ],
};

const WORK: ChapterSpec = {
  title: "Travail et puissance mécaniques",
  summary: "Travail d’une force constante, travail du poids, puissance.",
  strand: PHY,
  lessons: [
    {
      title: "Travail et puissance",
      minutes: 15,
      body: `${formula("W = F × AB × cos α ; P = W ÷ t = F × v")}
        ${liste([
          "le travail (joule, J) est moteur si α &lt; 90°, résistant si α &gt; 90°, nul si la force est perpendiculaire au déplacement ;",
          "travail du poids : W = m g (z<sub>A</sub> − z<sub>B</sub>), il ne dépend pas du chemin suivi ;",
          "la puissance s’exprime en watts (W).",
        ])}
        ${exemple(["Monter un seau de 10 kg de 3 m dans un puits : le poids fournit W = −10 × 10 × 3 = −300 J."])}
          ${figure(schema("p1-travail", "Caisse tirée par une force qui fait un angle α avec le déplacement."), "Plus l’angle α est grand, plus le travail est petit ; il est nul si la force est perpendiculaire au déplacement.")}`,
    },
  ],
};

export const PC_1RE_S: ChapterSpec[] = [
  // ── Chimie ────────────────────────────────────────────────────────────────
  ORGANIC,
  ALKANES,
  ALKENES,
  {
    title: "Le benzène et les composés aromatiques",
    summary: "Structure du benzène, réactions de substitution et d’addition.",
    strand: CHI,
    lessons: [
      {
        title: "Le benzène",
        minutes: 12,
        body: `${liste([
            "formule brute C₆H₆ : cycle de six carbones, électrons délocalisés (formule de Kekulé) ;",
            "il donne surtout des réactions de <strong>substitution</strong> (nitration, halogénation) ; l’addition est difficile ;",
            "il est toxique : on le manipule avec précaution.",
          ])}
          ${figure(schema("p1-benzene", "Formules du benzène."), "Les six liaisons du cycle sont identiques : les électrons des doubles liaisons sont partagés par tout le cycle.")}`,
      },
    ],
  },
  OXYGENATED,
  {
    title: "Couples oxydant-réducteur ion métallique/métal",
    summary: "Oxydation, réduction, couple redox, classification qualitative et quantitative (potentiels).",
    strand: CHI,
    lessons: [
      {
        title: "Oxydants, réducteurs et classification",
        minutes: 15,
        body: `${liste([
            "un <strong>oxydant</strong> capte des électrons ; un <strong>réducteur</strong> en cède ;",
            "couple Cu²⁺/Cu : Cu²⁺ + 2 e⁻ ⇄ Cu ;",
            "une lame de zinc dans une solution de sulfate de cuivre se recouvre de cuivre : Zn + Cu²⁺ → Zn²⁺ + Cu ;",
            "on classe les couples par leur potentiel standard E° (référence : couple H⁺/H₂, E° = 0 V).",
          ])}
          ${retenir("L’oxydant le plus fort réagit avec le réducteur le plus fort (règle du gamma).")}
          ${figure(schema("p1-redox", "Échelle de potentiels standard de quelques couples."), "La règle du gamma : l’oxydant d’un couple situé au-dessus réagit avec le réducteur d’un couple situé en dessous (Cu²⁺ avec Zn).")}`,
      },
    ],
  },
  {
    title: "Généralisation de l’oxydoréduction",
    summary: "Nombres d’oxydation, équilibrage des équations redox en solution, oxydoréduction par voie sèche.",
    strand: CHI,
    lessons: [
      {
        title: "Nombres d’oxydation et voie sèche",
        minutes: 15,
        body: `${liste([
            "le nombre d’oxydation (n.o.) d’un élément augmente lors d’une oxydation et diminue lors d’une réduction ;",
            "on équilibre une équation redox en égalisant les électrons échangés ;",
            "voie sèche : réaction sans solution, par exemple la réduction de l’oxyde de fer par l’aluminium (aluminothermie) ou par le carbone dans les hauts-fourneaux.",
          ])}
          ${formula(`Fe${sub("2")}O${sub("3")} + 2 Al → 2 Fe + Al${sub("2")}O${sub("3")}`)}`,
      },
    ],
  },
  {
    title: "Les électrolyses",
    summary: "Électrolyse, réactions aux électrodes, bilan quantitatif.",
    strand: CHI,
    lessons: [
      {
        title: "Bilan quantitatif d’une électrolyse",
        minutes: 15,
        body: `${liste([
            "à l’anode (reliée au +) se produit une oxydation ; à la cathode (reliée au −), une réduction ;",
            "quantité d’électricité : Q = I × t (coulombs) ;",
            "quantité d’électrons : n(e⁻) = Q ÷ F, avec F = 96 500 C/mol (faraday).",
          ])}
          ${exemple(["I = 2 A pendant 1 930 s : Q = 3 860 C, n(e⁻) = 0,04 mol ; à la cathode se déposent 0,02 mol de cuivre (Cu²⁺ + 2 e⁻ → Cu)."])}
          ${figure(schema("p1-electrolyse", "Cuve d’électrolyse d’une solution de sulfate de cuivre."), "Les électrons fournis par le générateur réduisent les ions cuivre à la cathode : la masse de cuivre déposé dépend de la quantité d’électricité Q = I × t.")}`,
      },
    ],
  },
  // ── Physique ──────────────────────────────────────────────────────────────
  WORK,
  {
    title: "L’énergie cinétique",
    summary: "Énergie cinétique de translation et de rotation, théorème de l’énergie cinétique.",
    strand: PHY,
    lessons: [
      {
        title: "Le théorème de l’énergie cinétique",
        minutes: 15,
        body: `${formula(`E<sub>c</sub> = ${frac("1", "2")} m v${sup("2")} ; ΔE<sub>c</sub> = Σ W(forces)`)}
          ${exemple(["Une voiture de 1 000 kg à 20 m/s (72 km/h) a E<sub>c</sub> = ½ × 1 000 × 400 = 200 000 J."])}
          ${retenir("Doubler la vitesse multiplie l’énergie cinétique par quatre : c’est pourquoi la vitesse est si dangereuse sur la route.")}`,
      },
    ],
  },
  {
    title: "Énergie potentielle et énergie mécanique",
    summary: "Énergie potentielle de pesanteur, conservation et non-conservation de l’énergie mécanique.",
    strand: PHY,
    lessons: [
      {
        title: "Conservation de l’énergie mécanique",
        minutes: 15,
        body: `${formula("E<sub>p</sub> = m g z ; E<sub>m</sub> = E<sub>c</sub> + E<sub>p</sub>")}
          ${liste(["sans frottement, l’énergie mécanique se conserve ;", "avec frottements, elle diminue : l’énergie perdue devient de la chaleur."])}
          ${exemple(["Un objet lâché de 5 m sans vitesse (g = 10 N/kg) arrive au sol à v = √(2 × 10 × 5) = 10 m/s."])}
          ${figure(schema("p1-energie", "Énergies cinétique, potentielle et mécanique d’un objet qui tombe."), "Pendant la chute, l’énergie potentielle se transforme en énergie cinétique ; sans frottement, leur somme ne change pas.")}`,
      },
    ],
  },
  {
    title: "La calorimétrie",
    summary: "Quantité de chaleur, capacité thermique massique, changements d’état, mélanges.",
    strand: PHY,
    lessons: [
      {
        title: "Quantité de chaleur",
        minutes: 15,
        body: `${formula("Q = m × c × (θ<sub>f</sub> − θ<sub>i</sub>) ; changement d’état : Q = m × L")}
          ${liste(["capacité thermique massique de l’eau : c = 4 180 J/(kg·°C) ;", "dans un calorimètre isolé, la somme des quantités de chaleur échangées est nulle."])}
          ${exemple(["Chauffer 2 kg d’eau de 20 °C à 100 °C : Q = 2 × 4 180 × 80 = 668 800 J."])}
          ${figure(schema("p3-calorimetre", "Calorimètre avec thermomètre et agitateur."), "Le calorimètre est un récipient isolé : la chaleur cédée par le corps chaud est reçue par le corps froid.")}`,
      },
    ],
  },
  {
    title: "Force et champ électrostatiques",
    summary: "Loi de Coulomb, champ électrostatique, champ uniforme.",
    strand: PHY,
    lessons: [
      {
        title: "Loi de Coulomb et champ",
        minutes: 15,
        body: `${formula(`F = k ${frac("|q q’|", `r${sup("2")}`)} (k = 9 × 10${sup("9")} SI) ; <strong>F</strong> = q <strong>E</strong>`)}
          ${liste(["le champ électrostatique se mesure en V/m ;", "entre deux plaques parallèles chargées, le champ est uniforme : E = U ÷ d."])}
          ${figure(schema("p1-champ", "Champ électrostatique uniforme entre deux plaques chargées."), "Les lignes de champ vont de la plaque + vers la plaque − ; une charge négative serait poussée dans l’autre sens.")}`,
      },
    ],
  },
  {
    title: "Travail de la force électrostatique et énergie potentielle électrostatique",
    summary: "Travail dans un champ uniforme, potentiel, différence de potentiel.",
    strand: PHY,
    lessons: [
      {
        title: "Travail et potentiel",
        minutes: 15,
        body: `${formula("W<sub>AB</sub> = q (V<sub>A</sub> − V<sub>B</sub>) = q U<sub>AB</sub>")}
          ${liste(["le travail de la force électrostatique ne dépend pas du chemin suivi ;", "énergie potentielle électrostatique : E<sub>p</sub> = qV ;", "1 électronvolt (eV) = 1,6 × 10⁻¹⁹ J."])}`,
      },
    ],
  },
  {
    title: "L’énergie électrique dans un circuit",
    summary: "Puissance et énergie électriques, effet Joule, bilan énergétique.",
    strand: PHY,
    lessons: [
      {
        title: "Puissance et effet Joule",
        minutes: 15,
        body: `${formula(`P = U × I ; W = P × t ; effet Joule : W = R I${sup("2")} t`)}
          ${liste(["un générateur fournit E·I·t, dont r·I²·t est perdu en chaleur ;", "rendement = énergie utile ÷ énergie reçue."])}
          ${exemple(["Un fer à repasser de 1 000 W utilisé 30 min consomme 0,5 kWh."])}`,
      },
    ],
  },
  {
    title: "Les condensateurs",
    summary: "Charge, capacité, énergie emmagasinée, associations ; montages dérivateur et intégrateur.",
    strand: PHY,
    lessons: [
      {
        title: "Capacité et énergie",
        minutes: 15,
        body: `${formula(`Q = C × U ; E = ${frac("1", "2")} C U${sup("2")}`)}
          ${liste([
            "la capacité C se mesure en farads (F) ; condensateur plan : C = ε S ÷ e ;",
            "en parallèle, les capacités s’additionnent ; en série, ce sont leurs inverses ;",
            "avec un amplificateur opérationnel, un condensateur permet de réaliser des montages dérivateur et intégrateur.",
          ])}
          ${exemple(["C = 100 μF chargé sous 12 V : Q = 1,2 × 10⁻³ C et E = 7,2 × 10⁻³ J."])}`,
      },
    ],
  },
  {
    title: "Ondes progressives et interférences mécaniques",
    summary: "Propagation d’un signal, onde progressive périodique, longueur d’onde, interférences.",
    strand: PHY,
    lessons: [
      {
        title: "Ondes mécaniques",
        minutes: 15,
        body: `${formula("λ = v × T = v ÷ f")}
          ${liste([
            "une onde transporte de l’énergie sans transporter de matière ;",
            "onde transversale (corde) ou longitudinale (ressort, son) ;",
            "deux ondes de même fréquence qui se superposent forment des interférences : franges d’amplitude maximale et d’amplitude nulle.",
          ])}
          ${exemple(["Une onde de 50 Hz qui se propage à 10 m/s a une longueur d’onde de 0,2 m."])}
          ${figure(schema("p1-onde", "Onde sinusoïdale le long d’une corde avec sa longueur d’onde."), "La longueur d’onde est la distance parcourue par l’onde pendant une période.")}`,
      },
    ],
  },
  {
    title: "Les lentilles minces",
    summary: "Lentilles convergentes et divergentes, construction d’images, relations de conjugaison.",
    strand: PHY,
    lessons: [
      {
        title: "Images données par une lentille",
        minutes: 15,
        body: `${formula(`${frac("1", "OA’")} − ${frac("1", "OA")} = ${frac("1", "f’")} ; γ = ${frac("OA’", "OA")} ; C = ${frac("1", "f’")}`)}
          ${liste(["mesures algébriques, sens positif celui de la lumière ;", "C est la vergence en dioptries (δ) : positive pour une lentille convergente ;", "trois rayons particuliers permettent de construire l’image : par le centre optique, parallèle à l’axe, par le foyer objet."])}
          ${exemple(["Lentille de 10 δ (f’ = 10 cm), objet à 30 cm devant : 1/OA’ = 10 − 1/0,3, image réelle à 15 cm, renversée, γ = −0,5."])}
          ${figure(schema("p1-lentille", "Construction de l’image d’un objet par une lentille de 10 δ."), "Objet à 30 cm d’une lentille de 10 δ : l’image est réelle, renversée, à 15 cm de la lentille et deux fois plus petite.")}`,
      },
    ],
  },
];

export const PC_1RE_L: ChapterSpec[] = [
  ORGANIC,
  ALKANES,
  ALKENES,
  OXYGENATED,
  {
    title: "Couples oxydant-réducteur et piles électrochimiques",
    summary: "Oxydation et réduction, couples redox, la pile Daniell.",
    strand: CHI,
    lessons: [
      {
        title: "La pile Daniell",
        minutes: 15,
        body: `${liste([
            "un oxydant capte des électrons, un réducteur en cède ; ils forment un couple (Cu²⁺/Cu, Zn²⁺/Zn) ;",
            "pile Daniell : une lame de zinc dans une solution de Zn²⁺, une lame de cuivre dans une solution de Cu²⁺, reliées par un pont salin ;",
            "le zinc est oxydé (pôle −), les ions cuivre sont réduits (pôle +) ; f.é.m. d’environ 1,1 V.",
          ])}
          ${retenir("Une pile transforme de l’énergie chimique en énergie électrique ; les piles usagées se recyclent.")}
          ${figure(schema("p1-daniell", "Schéma de la pile Daniell."), "Le pont salin ferme le circuit à l’intérieur de la pile et garde les solutions électriquement neutres.")}`,
      },
    ],
  },
  WORK,
];

/** 1re T (T1 et T2) : la physique de la 1re S, plus l’oxydoréduction et les électrolyses (métallurgie). */
export const PC_1RE_T: ChapterSpec[] = PC_1RE_S.filter(
  (chapter) => chapter.strand === PHY || chapter.title === "Couples oxydant-réducteur ion métallique/métal" || chapter.title === "Les électrolyses",
);
