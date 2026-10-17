// Sciences physiques de 4e (première année de la matière) : chapitres du relevé DIANGAL
// (docs/programme/releve-ci-3e.md, titres de Sunudaara, à confirmer) : grandeurs et mesures, masse et
// poids, électricité, lumière ; mélanges, structure de la matière, réaction chimique, mole. Leçons
// rédigées par DIANGAL, à faire valider par un professeur de sciences physiques.

import { type ChapterSpec, exemple, formula, frac, liste, methode, retenir, sub, sup, tableau } from "../tle/blocks";

const PHY = "Physique";
const CHI = "Chimie";

export const PC_4E: ChapterSpec[] = [
  // ── Physique ──────────────────────────────────────────────────────────────
  {
    title: "Grandeurs physiques et mesures",
    summary: "Ce qu’étudient les sciences physiques ; grandeurs, unités du Système international, instruments.",
    strand: PHY,
    lessons: [
      {
        title: "Mesurer une grandeur physique",
        minutes: 12,
        body: `<p>Les sciences physiques étudient les phénomènes de la nature (lumière, électricité, mouvement) et la matière. Une <strong>grandeur physique</strong> se mesure : on donne une valeur et une unité.</p>
          ${tableau([
            ["Grandeur", "Unité (symbole)", "Instrument"],
            ["longueur", "mètre (m)", "règle, mètre ruban"],
            ["masse", "kilogramme (kg)", "balance"],
            ["temps", "seconde (s)", "chronomètre"],
            ["volume", "mètre cube (m³) ; 1 L = 1 dm³", "éprouvette graduée"],
            ["température", "degré Celsius (°C)", "thermomètre"],
          ])}
          ${retenir("Une mesure n’est jamais parfaitement exacte : on lit l’instrument avec soin et on répète la mesure.")}`,
      },
    ],
  },
  {
    title: "Masse, masse volumique et densité",
    summary: "Mesurer une masse ; masse volumique ρ = m/V ; densité par rapport à l’eau.",
    strand: PHY,
    lessons: [
      {
        title: "Masse volumique et densité",
        minutes: 15,
        body: `${formula(`ρ = ${frac("m", "V")}`)}
          ${liste([
            "ρ (rhô) est la masse volumique : en kg/m³ ou en g/cm³ ;",
            "eau : ρ = 1 g/cm³ = 1 000 kg/m³ ;",
            "la <strong>densité</strong> d’un solide ou d’un liquide est d = ρ ÷ ρ<sub>eau</sub> : elle n’a pas d’unité ;",
            "un corps de densité inférieure à 1 flotte sur l’eau (bois, huile) ; s’il dépasse 1, il coule (fer).",
          ])}
          ${exemple(["Un caillou de 54 g occupe 20 cm³ : ρ = 54 ÷ 20 = 2,7 g/cm³ et d = 2,7."])}`,
      },
    ],
  },
  {
    title: "Le poids et la relation poids-masse",
    summary: "Le poids, force due à l’attraction de la Terre ; P = m × g.",
    strand: PHY,
    lessons: [
      {
        title: "Poids et masse",
        minutes: 12,
        body: `${formula("P = m × g")}
          ${liste([
            "le poids P est une force : il se mesure en newtons (N) avec un dynamomètre ;",
            "m est la masse en kg ; g est l’intensité de la pesanteur, environ 9,8 N/kg au Sénégal (on prend souvent 10 N/kg) ;",
            "le poids est vertical, dirigé vers le bas ;",
            "la masse ne change pas d’un lieu à l’autre ; le poids, si (sur la Lune, g ≈ 1,6 N/kg).",
          ])}
          ${exemple(["Un sac de riz de 50 kg : P = 50 × 10 = 500 N."])}`,
      },
    ],
  },
  {
    title: "Introduction à l’électricité",
    summary: "Circuit électrique simple, conducteurs et isolants, montages en série et en dérivation.",
    strand: PHY,
    lessons: [
      {
        title: "Le circuit électrique",
        minutes: 15,
        body: `${liste([
            "un circuit comprend un <strong>générateur</strong> (pile, batterie), des <strong>récepteurs</strong> (lampe, moteur), un interrupteur et des fils de connexion ;",
            "le courant ne circule que si le circuit est fermé ;",
            "les métaux sont <strong>conducteurs</strong> ; le plastique, le verre, le bois sec sont <strong>isolants</strong> ;",
            "en série, les dipôles forment une seule boucle : si une lampe grille, tout s’éteint ; en dérivation, chaque branche fonctionne seule.",
          ])}
          ${retenir("Ne jamais toucher une prise ou un fil dénudé du secteur (220 V) : danger d’électrocution.")}`,
      },
    ],
  },
  {
    title: "Sources et propagation de la lumière",
    summary: "Sources primaires et objets diffusants, récepteurs, propagation rectiligne, ombres et éclipses.",
    strand: PHY,
    lessons: [
      {
        title: "Sources et récepteurs de lumière",
        minutes: 12,
        body: `${liste([
            "une <strong>source primaire</strong> produit sa lumière : Soleil, lampe, flamme ;",
            "un <strong>objet diffusant</strong> renvoie la lumière qu’il reçoit : la Lune, un mur ;",
            "un récepteur détecte la lumière : l’œil, une cellule photoélectrique, un panneau solaire.",
          ])}
          ${retenir("On voit un objet lorsque la lumière qui vient de lui entre dans l’œil.")}`,
      },
      {
        title: "La propagation rectiligne de la lumière",
        minutes: 15,
        body: `${liste([
            "dans un milieu transparent et homogène, la lumière se propage en <strong>ligne droite</strong> ; on la représente par un rayon (flèche) ;",
            "vitesse dans le vide : environ 300 000 km/s ;",
            "un objet opaque éclairé a une ombre propre ; il projette une ombre portée ;",
            "éclipse de Lune : la Lune passe dans l’ombre de la Terre ; éclipse de Soleil : la Lune cache le Soleil.",
          ])}
          ${retenir("Soleil, Terre et Lune sont alignés pendant une éclipse.")}`,
      },
    ],
  },
  {
    title: "Réflexion et réfraction de la lumière",
    summary: "Lois de la réflexion, miroir plan ; changement de direction de la lumière entre deux milieux.",
    strand: PHY,
    lessons: [
      {
        title: "Réflexion et réfraction",
        minutes: 15,
        body: `${liste([
            "<strong>réflexion</strong> : la lumière rebondit sur une surface ; l’angle de réflexion est égal à l’angle d’incidence (i = r) ;",
            "l’image donnée par un miroir plan est symétrique de l’objet par rapport au miroir ;",
            "<strong>réfraction</strong> : la lumière change de direction en passant d’un milieu transparent à un autre (air → eau) ;",
            "c’est pourquoi un bâton plongé dans l’eau paraît brisé.",
          ])}
          ${retenir("Les angles se mesurent par rapport à la normale (perpendiculaire à la surface).")}`,
      },
    ],
  },
  // ── Chimie ────────────────────────────────────────────────────────────────
  {
    title: "Mélanges et corps purs",
    summary: "Mélanges homogènes et hétérogènes, techniques de séparation, critères de pureté.",
    strand: CHI,
    lessons: [
      {
        title: "Séparer les constituants d’un mélange",
        minutes: 15,
        body: `${liste([
            "mélange <strong>hétérogène</strong> : on distingue plusieurs constituants (eau boueuse) ; <strong>homogène</strong> : on n’en voit qu’un (eau salée) ;",
            "décantation puis filtration : séparent un solide d’un liquide ;",
            "évaporation : récupère le sel de l’eau de mer (marais salants du Saloum, lac Rose) ;",
            "distillation : sépare les liquides ou récupère l’eau pure.",
          ])}
          ${retenir("Un corps pur a des températures de changement d’état fixes : l’eau pure fond à 0 °C et bout à 100 °C (pression normale).")}`,
      },
    ],
  },
  {
    title: "La structure de la matière",
    summary: "Atomes et molécules, symboles et formules chimiques.",
    strand: CHI,
    lessons: [
      {
        title: "Atomes et molécules",
        minutes: 15,
        body: `${liste([
            "la matière est formée de particules très petites : les <strong>atomes</strong> ;",
            "un atome comprend un noyau et des électrons ; il est électriquement neutre ;",
            "chaque élément a un symbole : H (hydrogène), O (oxygène), C (carbone), N (azote), Fe (fer), Cu (cuivre), Na (sodium), Cl (chlore) ;",
            "une <strong>molécule</strong> est un groupe d’atomes liés.",
          ])}
          ${tableau([
            ["Molécule", "Formule", "Atomes"],
            ["eau", `H${sub("2")}O`, "2 H et 1 O"],
            ["dioxygène", `O${sub("2")}`, "2 O"],
            ["dioxyde de carbone", `CO${sub("2")}`, "1 C et 2 O"],
            ["méthane", `CH${sub("4")}`, "1 C et 4 H"],
          ])}`,
      },
    ],
  },
  {
    title: "La réaction chimique",
    summary: "Réactifs et produits, conservation de la masse, équation-bilan.",
    strand: CHI,
    lessons: [
      {
        title: "Réaction chimique et équation-bilan",
        minutes: 15,
        body: `${liste([
            "au cours d’une réaction chimique, des corps (les <strong>réactifs</strong>) disparaissent et de nouveaux corps (les <strong>produits</strong>) apparaissent ;",
            "la masse totale se conserve (loi de Lavoisier) : les atomes se réarrangent, ils ne disparaissent pas ;",
            "l’équation-bilan est équilibrée : autant d’atomes de chaque sorte à gauche et à droite.",
          ])}
          ${formula(`C + O${sub("2")} → CO${sub("2")} ; 2 H${sub("2")} + O${sub("2")} → 2 H${sub("2")}O`)}
          ${exemple(["Le charbon de bois brûle dans le dioxygène de l’air : il se forme du dioxyde de carbone, qui trouble l’eau de chaux."])}`,
      },
    ],
  },
  {
    title: "La mole et les grandeurs molaires",
    summary: "La mole, le nombre d’Avogadro, la masse molaire et le volume molaire.",
    strand: CHI,
    lessons: [
      {
        title: "Quantité de matière et masse molaire",
        minutes: 15,
        body: `${liste([
            `une <strong>mole</strong> contient 6,02 × 10${sup("23")} particules (nombre d’Avogadro) ;`,
            "la masse molaire M est la masse d’une mole, en g/mol : M(H) = 1 ; M(C) = 12 ; M(O) = 16 ;",
            `M(H${sub("2")}O) = 2 × 1 + 16 = 18 g/mol ; M(CO${sub("2")}) = 12 + 2 × 16 = 44 g/mol ;`,
            "pour un gaz, le volume molaire vaut environ 22,4 L/mol dans les conditions normales (0 °C).",
          ])}
          ${formula(`n = ${frac("m", "M")}`)}
          ${exemple(["36 g d’eau : n = 36 ÷ 18 = 2 mol."])}
          ${methode(["Écrire la formule.", "Calculer la masse molaire.", "Appliquer n = m ÷ M."], "Calculer une quantité de matière")}`,
      },
    ],
  },
];
