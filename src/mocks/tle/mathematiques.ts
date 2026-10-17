// Mathématiques de Terminale, par série. Chapitres dans l'ordre des programmes officiels de 2006
// mis en ligne par l'Office du Bac : Terminales S1-S3 (9 h par semaine), S2-S4 (5 h) et L (3 h).
// Voir docs/programme/programme-tle.md. Leçons rédigées par DIANGAL, à faire valider.

import type { ChapterSpec } from "./blocks";
import * as A from "./maths-algebre";
import * as N from "./maths-analyse";
import * as G from "./maths-geometrie";
import { FINANCE_TLE, MATRICES } from "./maths-g";
import * as L from "./maths-l";

const probabilites: ChapterSpec = {
  title: "Probabilités",
  summary: "Probabilité d’un événement, probabilité conditionnelle, variables aléatoires, loi binomiale.",
  lessons: [A.PROBA_VOCABULAIRE, A.PROBA_CONDITIONNELLE, A.VARIABLE_ALEATOIRE, A.LOI_BINOMIALE],
};

const suites: ChapterSpec = {
  title: "Suites numériques",
  summary: "Récurrence, variations, convergence et suites définies par une relation de récurrence.",
  lessons: [N.RECURRENCE, N.SUITES_ARITH_GEO, N.SUITES_VARIATIONS, N.SUITES_CONVERGENCE, N.SUITES_RECURRENTES],
};

const logarithme: ChapterSpec = {
  title: "Fonction logarithme népérien",
  summary: "Définition, propriétés algébriques, étude de ln et de ln u, équations et logarithme décimal.",
  lessons: [N.LN_DEFINITION, N.LN_ETUDE, N.LN_EQUATIONS],
};

const calculIntegral: ChapterSpec = {
  title: "Calcul intégral",
  summary: "Primitives, intégrale et ses propriétés, intégration par parties, aires et volumes.",
  lessons: [N.PRIMITIVES, N.INTEGRALE_PROPRIETES, N.INTEGRATION_PAR_PARTIES, N.AIRES_VOLUMES],
};

const equationsDifferentielles: ChapterSpec = {
  title: "Équations différentielles",
  summary: "Équations linéaires du premier et du second ordre à coefficients constants.",
  lessons: [N.EQDIFF_ORDRE1, N.EQDIFF_ORDRE2, N.EQDIFF_SECOND_MEMBRE],
};

const complexes: ChapterSpec = {
  title: "Nombres complexes",
  summary: "Formes algébrique, trigonométrique et exponentielle, équations, racines n-ièmes, trigonométrie.",
  lessons: [
    A.COMPLEXES_ALGEBRIQUE,
    A.COMPLEXES_TRIGO,
    A.COMPLEXES_EQUATIONS,
    A.RACINES_NIEMES,
    A.COMPLEXES_GEOMETRIE,
    A.COMPLEXES_TRIGONOMETRIE,
  ],
};

/** Terminales S1 et S3. */
export const MATH_TLE_S1: ChapterSpec[] = [
  probabilites,
  complexes,
  {
    title: "Arithmétique",
    summary: "Divisibilité, PGCD et PPCM, nombres premiers, Bézout et Gauss, congruences, numération.",
    lessons: [A.DIVISIBILITE, A.PGCD_PPCM, A.NOMBRES_PREMIERS, A.BEZOUT_GAUSS, A.CONGRUENCES, A.NUMERATION],
  },
  suites,
  {
    title: "Limites et continuité",
    summary: "Opérations sur les limites, asymptotes, théorème des valeurs intermédiaires, fonction réciproque.",
    lessons: [N.LIMITES_OPERATIONS, N.ASYMPTOTES, N.CONTINUITE_TVI, N.FONCTION_RECIPROQUE],
  },
  {
    title: "Dérivation et étude de fonctions",
    summary: "Dérivée d’une composée, accroissements finis, dérivées successives, plan d’étude.",
    lessons: [N.DERIVEE_COMPOSEE, N.ACCROISSEMENTS_FINIS, N.DERIVEES_SUCCESSIVES, N.ETUDE_FONCTION],
  },
  logarithme,
  {
    title: "Fonctions exponentielles et puissances",
    summary: "Exponentielle, dérivée de e^u, exponentielle de base a, fonctions puissances, croissances comparées.",
    lessons: [N.EXP_DEFINITION, N.EXP_ETUDE, N.PUISSANCES, N.CROISSANCES_COMPAREES],
  },
  calculIntegral,
  equationsDifferentielles,
  {
    title: "Barycentres et lignes de niveau",
    summary: "Barycentre de n points, fonctions de Leibniz, lignes de niveau, points cocycliques.",
    lessons: [G.BARYCENTRE, G.FONCTIONS_LEIBNIZ, G.LIGNES_DE_NIVEAU],
  },
  {
    title: "Isométries et similitudes planes",
    summary: "Isométries, similitudes directes et leur écriture complexe, triangles semblables.",
    lessons: [G.ISOMETRIES, A.SIMILITUDES_COMPLEXES, G.TRIANGLES_SEMBLABLES],
  },
  {
    title: "Produit vectoriel et produit mixte",
    summary: "Orientation de l’espace, produit vectoriel, aires, distances, produit mixte et volumes.",
    lessons: [G.PRODUIT_VECTORIEL, G.PRODUIT_VECTORIEL_APPLICATIONS, G.PRODUIT_MIXTE],
  },
  {
    title: "Transformations de l’espace",
    summary: "Translations, homothéties, réflexions, rotations autour d’un axe et leurs composées.",
    lessons: [G.TRANSFORMATIONS_ESPACE, G.ROTATIONS_ESPACE],
  },
  {
    title: "Courbes paramétrées",
    summary: "Vecteur dérivé, tangente, vitesse et accélération, cycloïde et astroïde.",
    lessons: [G.COURBES_PARAMETREES, G.CINEMATIQUE_COURBES],
  },
  {
    title: "Coniques",
    summary: "Définition par foyer et directrice, parabole, ellipse et hyperbole.",
    lessons: [G.CONIQUES_DEFINITION, G.PARABOLE, G.ELLIPSE, G.HYPERBOLE],
  },
];

/** Terminales S2 et S4. */
export const MATH_TLE_S2: ChapterSpec[] = [
  {
    title: "Limites, continuité et fonction réciproque",
    summary: "Limites et asymptotes, théorème des valeurs intermédiaires, fonction réciproque.",
    lessons: [N.LIMITES_OPERATIONS, N.ASYMPTOTES, N.CONTINUITE_TVI, N.FONCTION_RECIPROQUE],
  },
  {
    title: "Dérivées et primitives",
    summary: "Dérivée d’une composée, dérivées successives, points d’inflexion, inégalité des accroissements finis, primitives.",
    lessons: [N.DERIVEE_COMPOSEE, N.DERIVEES_SUCCESSIVES, N.ACCROISSEMENTS_FINIS, N.PRIMITIVES, N.ETUDE_FONCTION],
  },
  logarithme,
  {
    title: "Fonction exponentielle et fonctions puissances",
    summary: "Exponentielle, dérivée et primitive de e^u, fonctions puissances, croissances comparées.",
    lessons: [N.EXP_DEFINITION, N.EXP_ETUDE, N.PUISSANCES, N.CROISSANCES_COMPAREES],
  },
  suites,
  {
    title: "Calcul intégral",
    summary: "Intégrale et ses propriétés, intégration par parties, aires et volumes.",
    lessons: [N.INTEGRALE_PROPRIETES, N.INTEGRATION_PAR_PARTIES, N.AIRES_VOLUMES],
  },
  equationsDifferentielles,
  {
    title: "Statistiques à deux variables",
    summary: "Nuage de points, covariance, droite de régression et coefficient de corrélation.",
    lessons: [A.SERIES_DOUBLES, A.AJUSTEMENT_LINEAIRE],
  },
  probabilites,
  complexes,
  {
    title: "Nombres complexes et similitudes",
    summary: "Écriture complexe des similitudes planes directes et éléments caractéristiques.",
    lessons: [A.SIMILITUDES_COMPLEXES],
  },
];

/** Terminales L (L1, L’1 et L2). */
export const MATH_TLE_L: ChapterSpec[] = [
  {
    title: "Composition et factorisation des polynômes",
    summary: "Composée de deux applications, méthode de Hörner, signe d’un polynôme.",
    lessons: [L.L_COMPOSITION, L.L_POLYNOMES],
  },
  {
    title: "Dénombrement et probabilités",
    summary: "Cardinal, dénombrement, probabilité d’un événement, équiprobabilité ou non.",
    lessons: [L.L_DENOMBREMENT, A.PROBA_VOCABULAIRE, L.L_NON_EQUIPROBABILITE],
  },
  {
    title: "Statistique : ajustement linéaire",
    summary: "Coefficient de corrélation, droite de régression et prévisions.",
    lessons: [A.SERIES_DOUBLES, A.AJUSTEMENT_LINEAIRE],
  },
  {
    title: "Limites et continuité",
    summary: "Calcul de limites, indéterminations, continuité.",
    lessons: [L.L_LIMITES, L.L_CONTINUITE],
  },
  {
    title: "Dérivabilité",
    summary: "Nombre dérivé, tangente, dérivées usuelles, sens de variation et bijection.",
    lessons: [L.L_NOMBRE_DERIVE, L.L_DERIVEE_VARIATIONS],
  },
  {
    title: "Étude de fonctions",
    summary: "Symétries, asymptotes, plan d’étude, valeur absolue et résolutions graphiques.",
    lessons: [L.L_SYMETRIES, N.ASYMPTOTES, N.ETUDE_FONCTION, L.L_VALEUR_ABSOLUE],
  },
  logarithme,
  {
    title: "Fonction exponentielle",
    summary: "Définition, propriétés, étude et équations avec l’exponentielle.",
    lessons: [N.EXP_DEFINITION, N.EXP_ETUDE],
  },
  {
    title: "Suites numériques",
    summary: "Suites arithmétiques et géométriques, récurrence, variations et convergence.",
    lessons: [N.SUITES_ARITH_GEO, N.RECURRENCE, N.SUITES_VARIATIONS, N.SUITES_CONVERGENCE],
  },
  {
    title: "Calcul intégral",
    summary: "Primitives des fonctions usuelles, intégrale et calcul d’aires.",
    lessons: [N.PRIMITIVES, N.INTEGRALE_PROPRIETES],
  },
];

/** Chapitres d’une liste repérés par leur titre (erreur si un titre manque). */
function pick(chapters: ChapterSpec[], title: string): ChapterSpec {
  const chapter = chapters.find((c) => c.title === title);
  if (!chapter) throw new Error(`Chapitre de maths introuvable : « ${title} »`);
  return chapter;
}

/** Terminale G : programme officiel de la série G (algèbre linéaire, analyse, probabilités, statistique, finance). */
export const MATH_TLE_G: ChapterSpec[] = [
  MATRICES,
  suites,
  pick(MATH_TLE_S2, "Dérivées et primitives"),
  logarithme,
  pick(MATH_TLE_S2, "Fonction exponentielle et fonctions puissances"),
  pick(MATH_TLE_S2, "Calcul intégral"),
  probabilites,
  pick(MATH_TLE_S2, "Statistiques à deux variables"),
  FINANCE_TLE,
];

/** Terminales T1 et T2 : programme officiel des séries T (complexes, analyse, intégrales, équations différentielles, produit vectoriel). */
export const MATH_TLE_T: ChapterSpec[] = [
  complexes,
  pick(MATH_TLE_S2, "Limites, continuité et fonction réciproque"),
  pick(MATH_TLE_S2, "Dérivées et primitives"),
  logarithme,
  pick(MATH_TLE_S2, "Fonction exponentielle et fonctions puissances"),
  calculIntegral,
  equationsDifferentielles,
  pick(MATH_TLE_S1, "Produit vectoriel et produit mixte"),
  pick(MATH_TLE_S2, "Statistiques à deux variables"),
  probabilites,
];
