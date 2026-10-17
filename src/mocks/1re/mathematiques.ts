// Mathématiques de 1re : programmes officiels du second cycle (MEN, 2006, APAMS) : première S1-S3,
// première S2-S4 et séries L. Les deux séries S partagent les mêmes chapitres (la S1 va plus loin et
// ajoute les primitives) ; le dénombrement est commun à toutes les séries. Leçons rédigées par DIANGAL, à
// faire valider par un enseignant.

import { type ChapterSpec, exemple, formula, frac, liste, methode, retenir, sup, tableau, u, vec } from "../tle/blocks";

const ANA = "Analyse";
const ALG = "Algèbre";
const GEO = "Géométrie";

const COUNTING: ChapterSpec = {
  title: "Dénombrement",
  summary: "Arbres et tableaux, p-listes, arrangements, combinaisons, triangle de Pascal, binôme de Newton.",
  strand: ALG,
  lessons: [
    {
      title: "Compter sans se tromper",
      minutes: 15,
      body: `${tableau([
          ["Situation", "Nombre", "Exemple"],
          ["p-listes (ordre, répétitions possibles)", `n${sup("p")}`, "codes de 4 chiffres : 10⁴ = 10 000"],
          ["arrangements (ordre, sans répétition)", `A<sup>p</sup><sub>n</sub> = ${frac("n!", "(n − p)!")}`, "podium de 3 parmi 8 : 8 × 7 × 6 = 336"],
          ["combinaisons (sans ordre)", `C<sup>p</sup><sub>n</sub> = ${frac("n!", "p!(n − p)!")}`, "comité de 2 parmi 5 : 10"],
          ["permutations", "n!", "ranger 4 livres : 24"],
        ])}
        ${retenir(`C<sup>p</sup><sub>n</sub> = C<sup>n−p</sup><sub>n</sub> ; C<sup>p</sup><sub>n</sub> + C<sup>p+1</sup><sub>n</sub> = C<sup>p+1</sup><sub>n+1</sub> (triangle de Pascal) ; (a + b)${sup("2")} = a${sup("2")} + 2ab + b${sup("2")} est le cas n = 2 du binôme de Newton.`)}`,
    },
  ],
};

export const MATH_1RE_S: ChapterSpec[] = [
  {
    title: "Généralités sur les fonctions et applications",
    summary: "Applications injectives, surjectives, bijectives ; parité, périodicité ; courbes associées.",
    strand: ANA,
    lessons: [
      {
        title: "Applications et fonctions",
        minutes: 15,
        body: `${liste([
            "une application f de E dans F est <strong>injective</strong> si deux éléments distincts ont des images distinctes, <strong>surjective</strong> si tout élément de F a au moins un antécédent, <strong>bijective</strong> si elle est les deux ;",
            "une bijection admet une application réciproque f⁻¹ ;",
            "f est périodique de période T si f(x + T) = f(x) : cos et sin sont 2π-périodiques ;",
            "la courbe de x ↦ f(x − a) + b se déduit de celle de f par la translation de vecteur (a ; b).",
          ])}
          ${exemple([`x ↦ x${sup("2")} n’est pas injective sur IR (f(−2) = f(2)), mais elle l’est sur [0 ; +∞[.`])}`,
      },
    ],
  },
  {
    title: "Limites et continuité",
    summary: "Limites finies et infinies, opérations, formes indéterminées, asymptotes, continuité.",
    strand: ANA,
    lessons: [
      {
        title: "Calculer des limites",
        minutes: 15,
        body: `${liste([
            "à l’infini, un polynôme a la limite de son terme de plus haut degré ; une fraction rationnelle, celle du quotient des termes de plus haut degré ;",
            "formes indéterminées : ∞ − ∞, 0 × ∞, ∞/∞, 0/0 : on factorise ou on simplifie ;",
            "si lim f(x) = ±∞ quand x tend vers a, la droite x = a est asymptote verticale ; si lim f(x) = b à l’infini, y = b est asymptote horizontale.",
          ])}
          ${exemple([`${frac(`2x${sup("2")} + 1`, `x${sup("2")} − 3`)} tend vers 2 en +∞ : y = 2 est asymptote horizontale.`])}`,
      },
      {
        title: "La continuité",
        minutes: 12,
        body: `${liste([
            "f est continue en a si lim f(x) = f(a) quand x tend vers a ;",
            "les fonctions polynômes et rationnelles sont continues sur leur ensemble de définition ;",
            "l’image d’un intervalle par une fonction continue est un intervalle (théorème des valeurs intermédiaires).",
          ])}
          ${retenir("Si f est continue et strictement monotone sur [a ; b] et si f(a) et f(b) sont de signes contraires, l’équation f(x) = 0 a une unique solution dans [a ; b].")}`,
      },
    ],
  },
  {
    title: "Dérivation et applications",
    summary: "Nombre dérivé, tangente, dérivées usuelles, sens de variation, extremums.",
    strand: ANA,
    lessons: [
      {
        title: "Nombre dérivé et tangente",
        minutes: 15,
        body: `${formula(`f’(a) = lim ${frac("f(a + h) − f(a)", "h")} quand h → 0 ; tangente : y = f’(a)(x − a) + f(a)`)}
          ${tableau([
            ["f(x)", "f’(x)"],
            [`x${sup("n")}`, `nx${sup("n−1")}`],
            [frac("1", "x"), `−${frac("1", `x${sup("2")}`)}`],
            ["√x", frac("1", "2√x")],
            ["u + v ; uv", "u’ + v’ ; u’v + uv’"],
            [frac("u", "v"), frac("u’v − uv’", `v${sup("2")}`)],
          ])}`,
      },
      {
        title: "Dérivée et variations",
        minutes: 15,
        body: `${liste(["f’ ≥ 0 sur un intervalle : f y est croissante ; f’ ≤ 0 : décroissante ;", "si f’ s’annule en changeant de signe en a, f(a) est un extremum local."])}
          ${exemple([`f(x) = x${sup("3")} − 3x : f’(x) = 3x${sup("2")} − 3 = 3(x − 1)(x + 1) ; f est croissante sur ]−∞ ; −1], décroissante sur [−1 ; 1], croissante sur [1 ; +∞[ ; maximum local f(−1) = 2.`])}`,
      },
    ],
  },
  {
    title: "Étude de fonctions",
    summary: "Plan d’étude d’une fonction polynôme ou rationnelle, asymptotes, éléments de symétrie.",
    strand: ANA,
    lessons: [
      {
        title: "Étudier une fonction",
        minutes: 15,
        body: `${methode([
            "Ensemble de définition, parité ou périodicité éventuelles.",
            "Limites aux bornes et asymptotes (verticales, horizontales, obliques y = ax + b si f(x) − (ax + b) tend vers 0).",
            "Dérivée, signe de la dérivée, tableau de variations.",
            "Points particuliers (intersections avec les axes, tangentes), puis courbe.",
          ], "Plan d’étude")}
          ${retenir("Le point I(a ; b) est centre de symétrie de la courbe si f(2a − x) + f(x) = 2b ; la droite x = a est axe de symétrie si f(2a − x) = f(x).")}`,
      },
    ],
  },
  {
    title: "Suites numériques",
    summary: "Génération d’une suite, sens de variation, suites arithmétiques et géométriques.",
    strand: ANA,
    lessons: [
      {
        title: "Suites arithmétiques et géométriques",
        minutes: 15,
        body: `${tableau([
            ["", "Arithmétique (raison r)", "Géométrique (raison q)"],
            ["relation", `${u("n+1")} = ${u("n")} + r`, `${u("n+1")} = q × ${u("n")}`],
            ["terme général", `${u("n")} = ${u("0")} + nr`, `${u("n")} = ${u("0")} × q${sup("n")}`],
            ["somme de termes consécutifs", "nombre de termes × (premier + dernier) ÷ 2", `premier × ${frac(`1 − q${sup("nombre de termes")}`, "1 − q")} (q ≠ 1)`],
          ])}
          ${exemple([`1 + 2 + … + 100 = 100 × 101 ÷ 2 = 5 050. Une population de 1 000 qui augmente de 5 % par an : ${u("n")} = 1 000 × 1,05${sup("n")}.`])}`,
      },
    ],
  },
  {
    title: "Polynômes, équations et systèmes",
    summary: "Méthode de Horner, somme et produit des racines, équations à paramètre, pivot de Gauss.",
    strand: ALG,
    lessons: [
      {
        title: "Polynômes et équations",
        minutes: 15,
        body: `${liste([
            "si a est racine de P, la méthode de Horner donne le quotient Q tel que P(x) = (x − a)Q(x) ;",
            `si ax${sup("2")} + bx + c = 0 a deux racines x₁ et x₂ : x₁ + x₂ = −b/a et x₁x₂ = c/a ;`,
            "un système de trois équations à trois inconnues se résout par la méthode du pivot de Gauss (on se ramène à un système triangulaire).",
          ])}
          ${exemple([`2x${sup("3")} − 3x${sup("2")} − 3x + 2 a pour racine 2 ; Horner donne 2x${sup("3")} − 3x${sup("2")} − 3x + 2 = (x − 2)(2x${sup("2")} + x − 1) = (x − 2)(2x − 1)(x + 1).`])}`,
      },
    ],
  },
  COUNTING,
  {
    title: "Statistique à deux variables",
    summary: "Nuage de points, point moyen, covariance, ajustement affine.",
    strand: ALG,
    lessons: [
      {
        title: "Ajustement d’un nuage de points",
        minutes: 15,
        body: `${liste([
            "on représente les couples (x<sub>i</sub> ; y<sub>i</sub>) par un nuage de points ; G(x̄ ; ȳ) est le point moyen ;",
            "méthode de Mayer : on partage le nuage en deux groupes et on trace la droite qui passe par les deux points moyens ;",
            "méthode des moindres carrés : la droite de régression de y en x passe par G et a pour coefficient cov(x, y) ÷ V(x).",
          ])}
          ${retenir("Un ajustement permet des estimations (interpolation, extrapolation prudente).")}`,
      },
    ],
  },
  {
    title: "Barycentre et lignes de niveau",
    summary: "Barycentre de n points, barycentres partiels, lignes de niveau.",
    strand: GEO,
    lessons: [
      {
        title: "Barycentre de plusieurs points",
        minutes: 15,
        body: `${liste([
            `G barycentre de (A, a), (B, b), (C, c) avec a + b + c ≠ 0 : a${vec("GA")} + b${vec("GB")} + c${vec("GC")} = ${vec("0")} ;`,
            "associativité : on peut remplacer des points par leur barycentre partiel affecté de la somme de leurs coefficients ;",
            `coordonnées : x<sub>G</sub> = ${frac("ax<sub>A</sub> + bx<sub>B</sub> + cx<sub>C</sub>", "a + b + c")}.`,
          ])}
          ${retenir(`Lignes de niveau : l’ensemble des points M tels que ${vec("MA")} · ${vec("MB")} = 0 est le cercle de diamètre [AB] ; MA = MB décrit la médiatrice.`)}`,
      },
    ],
  },
  {
    title: "Angles orientés et trigonométrie",
    summary: "Angles inscrits, formules d’addition et de duplication, équations trigonométriques.",
    strand: GEO,
    lessons: [
      {
        title: "Formules trigonométriques",
        minutes: 15,
        body: `${liste([
            "cos(a + b) = cos a cos b − sin a sin b ; sin(a + b) = sin a cos b + cos a sin b ;",
            `cos 2a = cos${sup("2")}a − sin${sup("2")}a = 2cos${sup("2")}a − 1 = 1 − 2sin${sup("2")}a ; sin 2a = 2 sin a cos a ;`,
            "un angle inscrit mesure la moitié de l’angle au centre qui intercepte le même arc.",
          ])}`,
      },
      {
        title: "Équations trigonométriques",
        minutes: 12,
        body: `${liste(["cos x = cos a ⟺ x = a + 2kπ ou x = −a + 2kπ (k entier) ;", "sin x = sin a ⟺ x = a + 2kπ ou x = π − a + 2kπ ;", "on représente les solutions sur le cercle trigonométrique."])}
          ${exemple(["cos x = 1/2 : x = π/3 + 2kπ ou x = −π/3 + 2kπ."])}`,
      },
    ],
  },
  {
    title: "Transformations du plan",
    summary: "Isométries, translations, rotations, homothéties et leurs composées.",
    strand: GEO,
    lessons: [
      {
        title: "Isométries et composées",
        minutes: 15,
        body: `${liste([
            "une isométrie conserve les distances : translations, rotations, symétries ;",
            "la composée de deux rotations de même centre et d’angles θ et θ’ est la rotation d’angle θ + θ’ ;",
            "la composée de deux symétries orthogonales d’axes sécants en O est une rotation de centre O d’angle double de l’angle des axes ;",
            "une homothétie de rapport k conserve les angles et multiplie les distances par |k|.",
          ])}`,
      },
    ],
  },
  {
    title: "Géométrie dans l’espace",
    summary: "Vecteurs de l’espace, coplanarité, produit scalaire, plans et sphères.",
    strand: GEO,
    lessons: [
      {
        title: "Vecteurs et produit scalaire dans l’espace",
        minutes: 15,
        body: `${liste([
            "trois vecteurs sont coplanaires si l’un est combinaison linéaire des deux autres ;",
            `dans un repère orthonormé : ${vec("u")} · ${vec("v")} = xx’ + yy’ + zz’ ;`,
            `un plan de vecteur normal ${vec("n")}(a ; b ; c) a une équation ax + by + cz + d = 0 ;`,
            `la sphère de centre Ω(a ; b ; c) et de rayon r : (x − a)${sup("2")} + (y − b)${sup("2")} + (z − c)${sup("2")} = r${sup("2")}.`,
          ])}`,
      },
    ],
  },
];

/** La 1re S1 ajoute les primitives au programme commun des séries S. */
export const MATH_1RE_S1: ChapterSpec[] = [
  ...MATH_1RE_S,
  {
    title: "Primitives",
    summary: "Définition, primitives des fonctions usuelles, primitive prenant une valeur donnée.",
    strand: ANA,
    lessons: [
      {
        title: "Calculer une primitive",
        minutes: 15,
        body: `<p>F est une <strong>primitive</strong> de f sur un intervalle I si F’ = f sur I. Deux primitives de f diffèrent d’une constante.</p>
          ${tableau([
            ["f(x)", "F(x)"],
            ["a", "ax"],
            [`x${sup("n")} (n ≠ −1)`, frac(`x${sup("n+1")}`, "n + 1")],
            [frac("1", `x${sup("2")}`), `−${frac("1", "x")}`],
            ["cos x ; sin x", "sin x ; −cos x"],
          ])}
          ${exemple([`Primitive de f(x) = 3x${sup("2")} + 2x qui vaut 1 en 0 : F(x) = x${sup("3")} + x${sup("2")} + 1.`])}`,
      },
    ],
  },
];

export const MATH_1RE_S2: ChapterSpec[] = MATH_1RE_S;

export const MATH_1RE_L: ChapterSpec[] = [
  {
    title: "Systèmes et optimisation",
    summary: "Systèmes linéaires (pivot de Gauss), inéquations à deux inconnues, problèmes d’optimisation.",
    strand: ALG,
    lessons: [
      {
        title: "Optimiser sous contraintes",
        minutes: 15,
        body: `${methode([
            "Choisir les inconnues (x, y) et traduire les contraintes par des inéquations.",
            "Représenter la région des solutions (polygone des contraintes).",
            "Le maximum ou le minimum de la quantité à optimiser est atteint en un sommet du polygone.",
          ])}
          ${exemple(["Contraintes : x ≥ 0, y ≥ 0, x + y ≤ 10 et x ≤ 6 ; bénéfice B = 3x + 2y. Aux sommets (0 ; 0), (6 ; 0), (6 ; 4) et (0 ; 10), B vaut 0, 18, 26 et 20 : le maximum, 26, est atteint pour x = 6 et y = 4."])}`,
      },
    ],
  },
  {
    title: "Polynômes et signe",
    summary: "Monômes, trinôme, factorisation par division ou identification, tableau de signes.",
    strand: ALG,
    lessons: [
      {
        title: "Factoriser et étudier le signe",
        minutes: 15,
        body: `${liste([
            "si P(a) = 0, P(x) = (x − a)Q(x) ; on trouve Q par division euclidienne ou identification ;",
            "on étudie le signe de chaque facteur et on dresse un tableau de signes ;",
            "on en déduit les solutions d’une inéquation P(x) ≥ 0.",
          ])}
          ${exemple([`P(x) = x${sup("3")} − x = x(x − 1)(x + 1) est positif sur [−1 ; 0] et sur [1 ; +∞[.`])}`,
      },
    ],
  },
  {
    title: "Fonctions numériques : limites et continuité",
    summary: "Notion de fonction, limites, continuité.",
    strand: ANA,
    lessons: [
      {
        title: "Limites et continuité",
        minutes: 15,
        body: `${liste([
            "limite d’un polynôme à l’infini : celle de son terme de plus haut degré ;",
            "les fonctions polynômes et rationnelles sont continues sur leur ensemble de définition ;",
            "une forme indéterminée (0/0, ∞/∞) se lève en factorisant.",
          ])}
          ${exemple([`lim ${frac(`x${sup("2")} − 4`, "x − 2")} quand x tend vers 2 : on simplifie par (x − 2) et on obtient 4.`])}`,
      },
    ],
  },
  {
    title: "Dérivation et étude de fonctions",
    summary: "Nombre dérivé, fonction dérivée, variations, représentation graphique.",
    strand: ANA,
    lessons: [
      {
        title: "Dériver pour étudier",
        minutes: 15,
        body: `${liste([
            `(x${sup("n")})’ = nx${sup("n−1")} ; (ku)’ = ku’ ; (u + v)’ = u’ + v’ ;`,
            "le signe de f’ donne le sens de variation de f ;",
            "la tangente au point d’abscisse a a pour équation y = f’(a)(x − a) + f(a).",
          ])}
          ${exemple([`f(x) = x${sup("2")} − 4x + 1 : f’(x) = 2x − 4, f décroît puis croît ; minimum f(2) = −3.`])}`,
      },
    ],
  },
  {
    title: "Suites arithmétiques et géométriques",
    summary: "Définition, terme général, somme des premiers termes, applications.",
    strand: ANA,
    lessons: [
      {
        title: "Deux types de suites",
        minutes: 15,
        body: `${liste([
            `arithmétique : on ajoute toujours la même raison r : ${u("n")} = ${u("0")} + nr ;`,
            `géométrique : on multiplie toujours par la même raison q : ${u("n")} = ${u("0")} × q${sup("n")} ;`,
            "application : un capital placé à intérêts composés de 5 % par an est multiplié par 1,05 chaque année.",
          ])}
          ${exemple(["Un salaire de 100 000 F qui augmente de 5 000 F par an vaut 125 000 F au bout de 5 ans (suite arithmétique)."])}`,
      },
    ],
  },
  {
    title: "Statistique : ajustement par la méthode de Mayer",
    summary: "Séries à deux caractères, nuage de points, droite de Mayer.",
    strand: ALG,
    lessons: [
      {
        title: "La droite de Mayer",
        minutes: 12,
        body: `${methode(["Représenter le nuage de points.", "Partager la série (rangée selon x) en deux groupes de même effectif.", "Calculer le point moyen de chaque groupe.", "Tracer la droite qui passe par ces deux points : elle sert à faire des prévisions."])}`,
      },
    ],
  },
  COUNTING,
];

/** Chapitres d’une liste repérés par leur titre (erreur si un titre manque). */
function pick(chapters: ChapterSpec[], titles: string[]): ChapterSpec[] {
  return titles.map((title) => {
    const chapter = chapters.find((c) => c.title === title);
    if (!chapter) throw new Error(`Chapitre de maths introuvable : « ${title} »`);
    return chapter;
  });
}

// ── Séries G et T : programmes officiels des séries G et T (MEN, 2006, APAMS) ──

const PROBA_1RE: ChapterSpec = {
  title: "Probabilités : premières notions",
  summary: "Expérience aléatoire, univers, événements, équiprobabilité, réunion et événement contraire.",
  strand: ALG,
  lessons: [
    {
      title: "Calculer une probabilité",
      minutes: 15,
      body: `${liste([
          "une expérience aléatoire a plusieurs issues possibles ; leur ensemble est l’<strong>univers</strong> Ω ;",
          `en cas d’équiprobabilité : P(A) = ${frac("nombre d’issues favorables", "nombre d’issues possibles")} ;`,
          "P(Ā) = 1 − P(A) ; P(A ∪ B) = P(A) + P(B) − P(A ∩ B) ;",
          "deux événements incompatibles n’ont aucune issue commune : P(A ∪ B) = P(A) + P(B).",
        ])}
        ${exemple(["On lance un dé équilibré : P(« obtenir un nombre pair ») = 3/6 = 1/2 ; P(« obtenir au moins 5 ») = 2/6 = 1/3."])}`,
    },
  ],
};

const FINANCE_1RE: ChapterSpec = {
  title: "Mathématiques financières : intérêts et escompte",
  summary: "Intérêts simples, escompte commercial, valeur actuelle, intérêts composés.",
  strand: ANA,
  lessons: [
    {
      title: "Intérêts simples et escompte",
      minutes: 15,
      body: `${formula(`I = ${frac("C × t × n", "100")} (n en années) ; I = ${frac("C × t × j", "36 000")} (j en jours)`)}
        ${liste([
          "l’escompte commercial d’un effet de valeur nominale V payable dans j jours au taux t : e = V × t × j ÷ 36 000 ;",
          "valeur actuelle = V − e.",
        ])}
        ${exemple(["Effet de 1 000 000 F à 60 jours, taux 9 % : e = 15 000 F, valeur actuelle 985 000 F."])}`,
    },
    {
      title: "Intérêts composés",
      minutes: 15,
      body: `${formula(`C<sub>n</sub> = C<sub>0</sub> × (1 + i)${sup("n")}`)}
        ${liste(["les intérêts de chaque période s’ajoutent au capital et produisent à leur tour des intérêts ;", "la suite des valeurs acquises est géométrique de raison 1 + i."])}
        ${exemple(["500 000 F placés 3 ans à 6 % : intérêts simples 90 000 F ; intérêts composés : 500 000 × 1,06³ ≈ 595 508 F, soit 95 508 F d’intérêts."])}`,
    },
  ],
};

const COMPLEXES_1RE: ChapterSpec = {
  title: "Nombres complexes",
  summary: "Forme algébrique, conjugué, module et argument, forme trigonométrique, représentation dans le plan.",
  strand: ALG,
  lessons: [
    {
      title: "Forme algébrique",
      minutes: 15,
      body: `${liste([
          `un nombre complexe s’écrit z = a + ib, avec a et b réels et i${sup("2")} = −1 ;`,
          "a est la partie réelle, b la partie imaginaire ; le conjugué de z est z̄ = a − ib ;",
          "on calcule comme avec des réels en remplaçant i² par −1 ; pour diviser, on multiplie par le conjugué du dénominateur.",
        ])}
        ${exemple([`(2 + 3i)(1 − i) = 2 − 2i + 3i − 3i${sup("2")} = 5 + i.`])}`,
    },
    {
      title: "Module, argument et forme trigonométrique",
      minutes: 15,
      body: `${formula(`|z| = √(a${sup("2")} + b${sup("2")}) ; z = r(cos θ + i sin θ)`)}
        ${liste(["le point M(a ; b) est l’image de z dans le plan complexe ;", "r = |z| est la distance OM ; θ est un argument de z (angle entre l’axe des réels et OM)."])}
        ${exemple(["z = 1 + i : |z| = √2 et un argument est π/4, donc z = √2(cos π/4 + i sin π/4)."])}`,
    },
  ],
};

/** 1re G : outils mathématiques de l’économie et de la gestion. */
export const MATH_1RE_G: ChapterSpec[] = [
  ...pick(MATH_1RE_S, ["Statistique à deux variables"]),
  COUNTING,
  PROBA_1RE,
  ...pick(MATH_1RE_S, ["Suites numériques", "Limites et continuité", "Dérivation et applications", "Étude de fonctions"]),
  ...pick(MATH_1RE_L, ["Systèmes et optimisation"]),
  FINANCE_1RE,
];

/** 1re T (T1 et T2) : géométrie, trigonométrie, analyse et nombres complexes. */
export const MATH_1RE_T: ChapterSpec[] = [
  ...pick(MATH_1RE_S, [
    "Barycentre et lignes de niveau",
    "Transformations du plan",
    "Géométrie dans l’espace",
    "Angles orientés et trigonométrie",
    "Généralités sur les fonctions et applications",
    "Polynômes, équations et systèmes",
    "Suites numériques",
    "Limites et continuité",
    "Dérivation et applications",
    "Étude de fonctions",
    "Statistique à deux variables",
  ]),
  COUNTING,
  COMPLEXES_1RE,
];
