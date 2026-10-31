import "server-only";

// CP, géométrie : séries DIANGAL du même genre que les leçons du cahier de l'école, en questions
// corrigées automatiquement (le cahier fait tracer et reproduire ; ici l'élève observe le même dessin
// et choisit ou écrit la réponse). Quatre chapitres : lignes, quadrillages, traçage, figures planes.

import type { ExerciseSeries, ExerciseSpec } from "../../exercise-series";
import {
  cellCount,
  cellOf,
  cellsIn,
  countCatParts,
  flagQuestion,
  insideOrOutside,
  joinDots,
  lineOrColumn,
  nextShape,
  onRoute,
  routeEnd,
  routeLength,
  segmentLength,
  sideOf,
  ticTacToe,
  whichFigure,
  whichLine,
  whichLineKind,
  whichNode,
  whichSegment,
  type GridItem,
} from "../../geometry";
import { seriesOf } from "./helpers";

const vf = (statement: string, answer: boolean, why: string): ExerciseSpec => ({
  vf: statement,
  answer,
  why: `<strong>${answer ? "Vrai" : "Faux"}</strong> : ${why}`,
});

// ── Lignes, intérieur et extérieur ─────────────────────────────────────────

const lines = seriesOf("Lignes, intérieur et extérieur");

export const LINES_CP: ExerciseSeries[] = [
  lines(1, "ligne fermée et ligne ouverte", [
    whichLine(["arc", "rond", "zigzag"], "fermée"),
    whichLine(["carré", "triangle", "carré ouvert"], "ouverte"),
    whichLine(["vague", "arc", "nuage"], "fermée"),
    whichLine(["rond", "zigzag", "carré"], "ouverte"),
    whichLine(["carré ouvert", "triangle", "arc"], "fermée"),
    whichLine(["nuage", "rond", "vague"], "ouverte"),
    vf("Une ligne fermée a deux bouts.", false, "une ligne fermée n’a pas de bout, elle se referme. C’est la ligne ouverte qui a deux bouts."),
    vf("On peut faire le tour d’une ligne fermée sans trouver d’ouverture.", true, "c’est ce qui la rend fermée."),
    whichLine(["zigzag", "carré ouvert", "carré"], "fermée"),
    whichLine(["triangle", "nuage", "arc"], "ouverte"),
  ]),
  lines(2, "intérieur, extérieur et frontière", [
    insideOrOutside([{ picture: "banane", inside: true }, { picture: "orange", inside: false }], "extérieur", "le panier"),
    insideOrOutside([{ picture: "eleve-garcon", inside: false }, { picture: "eleve-fille", inside: true }], "intérieur", "la cour de l’école"),
    insideOrOutside([{ picture: "mangue", inside: true }, { picture: "banane", inside: false }, { picture: "orange", inside: false }], "intérieur", "l’assiette"),
    insideOrOutside([{ picture: "orange", inside: true }, { picture: "mangue", inside: true }, { picture: "banane", inside: false }], "extérieur", "le panier"),
    vf("La frontière, c’est la ligne fermée elle-même.", true, "elle sépare l’intérieur de l’extérieur."),
    insideOrOutside([{ picture: "eleve-fille", inside: false }, { picture: "eleve-garcon", inside: true }], "intérieur", "la cour de l’école"),
    insideOrOutside([{ picture: "banane", inside: true }, { picture: "orange", inside: false }], "intérieur", "l’assiette"),
    vf("Un dessin placé hors de la ligne fermée est à l’intérieur.", false, "hors de la ligne fermée, il est à l’extérieur."),
    insideOrOutside([{ picture: "mangue", inside: false }, { picture: "orange", inside: true }], "extérieur", "le panier"),
    insideOrOutside([{ picture: "eleve-garcon", inside: true }, { picture: "eleve-fille", inside: false }, { picture: "mangue", inside: true }], "extérieur", "la cour de l’école"),
  ]),
  lines(3, "les rythmes graphiques", [
    nextShape(["○", "△"], 4, ["○", "△", "□"]),
    nextShape(["■", "■", "●"], 3, ["■", "●", "▲"]),
    nextShape(["▲", "●", "●"], 3, ["▲", "●", "■"]),
    nextShape(["◆", "○"], 4, ["◆", "○", "●"]),
    nextShape(["●", "●", "▲", "▲"], 2, ["●", "▲", "■"]),
    nextShape(["□", "△", "○"], 3, ["□", "△", "○"]),
    whichLineKind(["droite", "brisée", "courbe"], "brisée"),
    whichLineKind(["courbe", "droite", "brisée"], "courbe"),
    nextShape(["○", "○", "●"], 3, ["○", "●", "△"]),
    nextShape(["■", "□"], 4, ["■", "□", "●"]),
  ]),
];

// ── Quadrillages et itinéraires ────────────────────────────────────────────

const grids = seriesOf("Quadrillages et itinéraires");
const G1: GridItem[] = [
  { row: 0, col: 1, picture: "mangue" },
  { row: 2, col: 2, picture: "banane" },
  { row: 1, col: 0, picture: "orange" },
];
const G2: GridItem[] = [
  { row: 1, col: 3, picture: "eleve-fille" },
  { row: 2, col: 0, picture: "eleve-garcon" },
  { row: 0, col: 2, picture: "orange" },
];
const G3: GridItem[] = [
  { row: 3, col: 1, picture: "banane" },
  { row: 0, col: 3, picture: "mangue" },
];
const ROUTE_1: [number, number][] = [[2, 0], [2, 1], [1, 1], [1, 2], [0, 2]];
const ROUTE_2: [number, number][] = [[0, 0], [0, 1], [1, 1], [2, 1], [2, 2], [2, 3]];
const ROUTE_3: [number, number][] = [[3, 3], [3, 2], [2, 2], [1, 2], [1, 1], [0, 1]];
const ROUTE_4: [number, number][] = [[0, 3], [1, 3], [1, 2], [1, 1], [1, 0], [2, 0]];
const MARKET: GridItem[] = [
  { row: 0, col: 2, picture: "orange" },
  { row: 2, col: 1, picture: "banane" },
  { row: 1, col: 3, picture: "mangue" },
];
const MARKET_ROUTE: [number, number][] = [[2, 0], [2, 1], [1, 1], [1, 2], [0, 2], [0, 3], [1, 3]];

export const GRIDS_CP: ExerciseSeries[] = [
  grids(1, "le quadrillage et les nœuds", [
    whichNode(3, 3, [{ letter: "a", row: 0, col: 2 }, { letter: "b", row: 1, col: 1 }], [1, 1]),
    whichNode(3, 3, [{ letter: "a", row: 2, col: 0 }, { letter: "b", row: 0, col: 1 }], [2, 0]),
    cellCount(2, 3),
    whichNode(3, 4, [{ letter: "a", row: 1, col: 3 }, { letter: "b", row: 2, col: 2 }], [2, 2]),
    cellCount(3, 3),
    whichNode(4, 3, [{ letter: "a", row: 3, col: 1 }, { letter: "b", row: 0, col: 0 }], [0, 0]),
    cellCount(3, 4),
    whichNode(3, 3, [{ letter: "a", row: 1, col: 2 }, { letter: "b", row: 2, col: 1 }], [1, 2]),
    cellCount(4, 4),
    whichNode(4, 4, [{ letter: "a", row: 2, col: 3 }, { letter: "b", row: 3, col: 0 }], [3, 0]),
  ]),
  grids(2, "les cases du quadrillage", [
    cellOf(3, 3, G1, "mangue"),
    cellOf(3, 3, G1, "banane"),
    cellOf(3, 3, G1, "orange"),
    cellOf(3, 4, G2, "eleve-fille"),
    cellOf(3, 4, G2, "eleve-garcon"),
    cellOf(3, 4, G2, "orange"),
    cellOf(4, 4, G3, "banane"),
    cellOf(4, 4, G3, "mangue"),
    cellCount(2, 4),
    cellCount(4, 3),
  ]),
  grids(3, "les lignes et les colonnes", [
    lineOrColumn(3, 3, G1, "banane", "ligne"),
    lineOrColumn(3, 3, G1, "banane", "colonne"),
    lineOrColumn(3, 4, G2, "eleve-fille", "ligne"),
    lineOrColumn(3, 4, G2, "eleve-fille", "colonne"),
    cellsIn(3, 4, "ligne"),
    cellsIn(3, 4, "colonne"),
    lineOrColumn(4, 4, G3, "mangue", "ligne"),
    lineOrColumn(4, 4, G3, "mangue", "colonne"),
    cellsIn(4, 5, "ligne"),
    cellsIn(2, 5, "colonne"),
  ]),
  grids(4, "point de départ et point d’arrivée", [
    routeEnd(3, 3, ROUTE_1, "départ", "Awa"),
    routeEnd(3, 3, ROUTE_1, "arrivée", "Awa"),
    routeEnd(3, 4, ROUTE_2, "départ", "Moussa"),
    routeEnd(3, 4, ROUTE_2, "arrivée", "Moussa"),
    routeEnd(4, 4, ROUTE_3, "départ", "la chèvre"),
    routeEnd(4, 4, ROUTE_3, "arrivée", "la chèvre"),
    routeLength(3, 3, ROUTE_1, "Awa"),
    routeEnd(3, 4, ROUTE_4, "départ", "Fatou"),
    routeEnd(3, 4, ROUTE_4, "arrivée", "Fatou"),
    routeLength(3, 4, ROUTE_4, "Fatou"),
  ]),
  grids(5, "l’itinéraire", [
    onRoute(3, 4, MARKET, MARKET_ROUTE, "premier", "Ibrahima"),
    onRoute(3, 4, MARKET, MARKET_ROUTE, "dernier", "Ibrahima"),
    routeLength(3, 4, MARKET_ROUTE, "Ibrahima"),
    routeEnd(3, 4, MARKET_ROUTE, "arrivée", "Ibrahima", MARKET),
    onRoute(3, 3, G1, [[2, 0], [1, 0], [0, 0], [0, 1], [0, 2], [1, 2], [2, 2]], "premier", "Modou"),
    onRoute(3, 3, G1, [[2, 0], [1, 0], [0, 0], [0, 1], [0, 2], [1, 2], [2, 2]], "dernier", "Modou"),
    routeLength(4, 4, ROUTE_3, "la chèvre"),
    routeEnd(3, 3, [[0, 0], [1, 0], [2, 0], [2, 1], [2, 2]], "arrivée", "Binta"),
    routeEnd(3, 3, [[0, 0], [1, 0], [2, 0], [2, 1], [2, 2]], "départ", "Binta"),
    routeLength(3, 3, [[0, 0], [1, 0], [2, 0], [2, 1], [2, 2]], "Binta"),
  ]),
  grids(6, "révision", [
    whichNode(3, 3, [{ letter: "a", row: 1, col: 2 }, { letter: "b", row: 0, col: 0 }], [1, 2]),
    cellOf(3, 4, G2, "orange"),
    routeEnd(3, 4, ROUTE_2, "arrivée", "Moussa"),
    lineOrColumn(3, 3, G1, "orange", "ligne"),
    lineOrColumn(3, 3, G1, "orange", "colonne"),
    cellCount(3, 5),
    whichNode(4, 3, [{ letter: "a", row: 2, col: 1 }, { letter: "b", row: 3, col: 2 }], [3, 2]),
    cellOf(4, 4, G3, "banane"),
    routeEnd(4, 4, ROUTE_3, "départ", "la chèvre"),
    routeLength(3, 4, ROUTE_2, "Moussa"),
  ]),
  grids(7, "activités d’intégration", [
    ticTacToe(
      [
        { row: 0, col: 0, symbol: "○" },
        { row: 1, col: 1, symbol: "○" },
        { row: 0, col: 2, symbol: "✕" },
        { row: 1, col: 2, symbol: "✕" },
      ],
      "Aminata",
      "○",
    ),
    ticTacToe(
      [
        { row: 0, col: 1, symbol: "✕" },
        { row: 1, col: 1, symbol: "✕" },
        { row: 0, col: 0, symbol: "○" },
        { row: 2, col: 2, symbol: "○" },
      ],
      "Moussa",
      "✕",
    ),
    onRoute(3, 4, MARKET, MARKET_ROUTE, "premier", "Ibrahima"),
    onRoute(3, 4, MARKET, MARKET_ROUTE, "dernier", "Ibrahima"),
    cellOf(3, 4, MARKET, "mangue"),
    cellOf(3, 4, MARKET, "banane"),
    cellOf(3, 4, MARKET, "orange"),
    routeLength(3, 4, MARKET_ROUTE, "Ibrahima"),
  ]),
];

// ── Tracer avec la règle ───────────────────────────────────────────────────

const ruler = seriesOf("Tracer avec la règle");

export const RULER_CP: ExerciseSeries[] = [
  ruler(1, "des traits d’une longueur donnée", [
    segmentLength([3, 5, 2], 0),
    segmentLength([3, 5, 2], 1),
    whichSegment([4, 2, 6], 6),
    segmentLength([4, 2, 6], 1),
    whichSegment([5, 3, 4], 4),
    segmentLength([7, 4, 5], 0),
    whichSegment([2, 7, 3], 2),
    segmentLength([6, 3, 8], 2),
    whichSegment([8, 5, 6], 5),
    segmentLength([2, 9, 4], 1),
  ]),
  ruler(2, "relier des points avec la règle", [
    joinDots([[1, 1], [4, 1], [4, 4], [1, 4]]),
    joinDots([[2, 1], [4, 4], [0, 4]]),
    joinDots([[1, 1], [6, 1], [6, 3], [1, 3]]),
    joinDots([[1, 3], [3, 0], [5, 3]]),
    joinDots([[0, 0], [3, 0], [3, 3], [0, 3]]),
    joinDots([[0, 1], [7, 1], [7, 4], [0, 4]]),
    vf("Pour tracer un trait droit, on utilise la règle.", true, "la règle guide le crayon tout droit."),
    joinDots([[1, 4], [5, 4], [3, 1]]),
    joinDots([[2, 0], [7, 0], [7, 2], [2, 2]]),
    vf("Pour relier deux points avec la règle, on pose la règle bien à plat et on la tient fermement.", true, "sinon le trait n’est pas droit."),
  ]),
  ruler(3, "tracer des lignes de longueur donnée", [
    whichSegment([5, 7, 4], 7),
    segmentLength([5, 7, 4], 2),
    whichSegment([9, 6, 3], 3),
    segmentLength([9, 6, 3], 0),
    whichSegment([4, 8, 10], 10),
    segmentLength([4, 8, 10], 1),
    whichSegment([6, 2, 9], 6),
    segmentLength([3, 10, 7], 2),
    whichSegment([7, 9, 5], 9),
    segmentLength([8, 5, 2], 0),
  ]),
  ruler(4, "tracer des lignes (2)", [
    segmentLength([6, 4], 0),
    whichSegment([3, 6, 4], 3),
    whichLineKind(["droite", "courbe", "brisée"], "droite"),
    segmentLength([5, 9], 1),
    whichSegment([10, 8, 6], 8),
    whichLineKind(["brisée", "droite", "courbe"], "droite"),
    segmentLength([7, 2, 5], 1),
    whichSegment([4, 5, 9], 9),
    segmentLength([3, 8], 1),
    vf("Un trait de 6 carreaux est plus long qu’un trait de 4 carreaux.", true, "6 est plus grand que 4."),
  ]),
  ruler(5, "les lignes courbes", [
    whichLineKind(["droite", "courbe", "brisée"], "courbe"),
    whichLineKind(["courbe", "brisée", "droite"], "courbe"),
    whichLineKind(["brisée", "droite", "courbe"], "courbe"),
    vf("Une ligne courbe se trace sans la règle.", true, "elle s’arrondit : on la trace à main levée."),
    whichLine(["vague", "carré", "rond"], "ouverte"),
    whichLineKind(["courbe", "droite", "brisée"], "droite"),
    vf("Une ligne courbe a des angles.", false, "une ligne courbe s’arrondit, sans angle."),
    whichLineKind(["droite", "brisée", "courbe"], "courbe"),
    whichLine(["rond", "zigzag", "arc"], "fermée"),
    whichLineKind(["brisée", "courbe", "droite"], "courbe"),
  ]),
  ruler(6, "les lignes brisées", [
    whichLineKind(["droite", "courbe", "brisée"], "brisée"),
    whichLineKind(["brisée", "droite", "courbe"], "brisée"),
    whichLineKind(["courbe", "brisée", "droite"], "brisée"),
    vf("Une ligne brisée est faite de morceaux de lignes droites.", true, "on la trace avec la règle, morceau par morceau."),
    whichLine(["zigzag", "triangle", "carré"], "ouverte"),
    vf("Une ligne brisée se trace sans la règle.", false, "chaque morceau est droit : on utilise la règle."),
    whichLineKind(["droite", "brisée", "courbe"], "brisée"),
    whichLineKind(["courbe", "droite", "brisée"], "droite"),
    whichLine(["zigzag", "carré ouvert", "triangle"], "fermée"),
    whichLineKind(["brisée", "courbe", "droite"], "courbe"),
  ]),
  ruler(7, "les frises", [
    nextShape(["▲", "▼"], 4, ["▲", "▼", "■"]),
    nextShape(["■", "●", "●"], 3, ["■", "●", "▲"]),
    nextShape(["◆", "◆", "○"], 3, ["◆", "○", "●"]),
    nextShape(["△", "□"], 4, ["△", "□", "○"]),
    nextShape(["●", "▲", "■"], 3, ["●", "▲", "■"]),
    nextShape(["○", "●", "●", "○"], 2, ["○", "●", "▲"]),
    nextShape(["□", "□", "△"], 3, ["□", "△", "○"]),
    nextShape(["▼", "▲", "▲"], 3, ["▼", "▲", "■"]),
    nextShape(["■", "○"], 4, ["■", "○", "▲"]),
    nextShape(["△", "△", "●"], 3, ["△", "●", "□"]),
  ]),
];

// ── Reproduire des figures planes ──────────────────────────────────────────

const figures = seriesOf("Reproduire des figures planes");
const sq = (w: number) => ({ kind: "carré" as const, w });
const rect = (w: number, h: number) => ({ kind: "rectangle" as const, w, h });
const tri = (w: number, h: number) => ({ kind: "triangle" as const, w, h });
const round = (w: number) => ({ kind: "rond" as const, w });

export const SHAPES_CP: ExerciseSeries[] = [
  figures(1, "le carré", [
    whichFigure([rect(4, 2), sq(3), tri(4, 3)], "carré"),
    sideOf(sq(3), "côté"),
    whichFigure([sq(4), round(3), rect(5, 3)], "carré"),
    sideOf(sq(5), "côté"),
    vf("Les 4 côtés d’un carré ont la même longueur.", true, "c’est ce qui fait un carré."),
    whichFigure([tri(3, 3), rect(3, 2), sq(2)], "carré"),
    sideOf(sq(4), "côté"),
    vf("Un carré a 3 côtés.", false, "un carré a 4 côtés."),
    whichFigure([round(4), sq(5), rect(6, 2)], "carré"),
    vf("Un carré a 4 coins.", true, "il a 4 côtés et 4 coins."),
  ]),
  figures(2, "reproduire un carré", [
    joinDots([[1, 1], [3, 1], [3, 3], [1, 3]]),
    sideOf(sq(2), "côté"),
    joinDots([[0, 0], [5, 0], [5, 5], [0, 5]]),
    whichFigure([sq(3), rect(4, 3), tri(3, 3)], "carré"),
    joinDots([[2, 0], [6, 0], [6, 4], [2, 4]]),
    sideOf(sq(6), "côté"),
    whichFigure([rect(2, 4), tri(4, 2), sq(4)], "carré"),
    joinDots([[0, 1], [3, 1], [3, 4], [0, 4]]),
    vf("Pour reproduire un carré sur un quadrillage, on compte les carreaux de chaque côté.", true, "les 4 côtés doivent avoir le même nombre de carreaux."),
    sideOf(sq(3), "côté"),
  ]),
  figures(3, "le rectangle", [
    whichFigure([sq(3), rect(5, 2), tri(3, 3)], "rectangle"),
    sideOf(rect(5, 2), "grand côté"),
    sideOf(rect(5, 2), "petit côté"),
    whichFigure([rect(6, 3), round(3), sq(3)], "rectangle"),
    sideOf(rect(6, 3), "grand côté"),
    vf("Les côtés opposés d’un rectangle ont la même longueur.", true, "ils sont égaux deux à deux."),
    whichFigure([tri(4, 3), sq(2), rect(4, 2)], "rectangle"),
    sideOf(rect(4, 2), "petit côté"),
    vf("Un rectangle a 4 côtés de même longueur.", false, "deux côtés sont plus longs que les deux autres."),
    sideOf(rect(7, 3), "grand côté"),
  ]),
  figures(4, "reproduire un rectangle", [
    joinDots([[1, 1], [6, 1], [6, 3], [1, 3]]),
    sideOf(rect(6, 2), "grand côté"),
    joinDots([[0, 0], [4, 0], [4, 2], [0, 2]]),
    whichFigure([sq(4), rect(5, 3), round(3)], "rectangle"),
    joinDots([[1, 0], [3, 0], [3, 5], [1, 5]]),
    sideOf(rect(3, 5), "petit côté"),
    joinDots([[0, 1], [8, 1], [8, 4], [0, 4]]),
    whichFigure([rect(2, 5), sq(2), tri(2, 2)], "rectangle"),
    sideOf(rect(8, 3), "grand côté"),
    vf("Un rectangle a 4 coins.", true, "comme le carré, il a 4 côtés et 4 coins."),
  ]),
  figures(5, "le triangle", [
    whichFigure([sq(3), tri(4, 3), round(3)], "triangle"),
    joinDots([[2, 0], [4, 3], [0, 3]]),
    whichFigure([tri(3, 4), rect(4, 2), sq(2)], "triangle"),
    vf("Un triangle a 3 côtés.", true, "« tri » veut dire trois : 3 côtés et 3 coins."),
    joinDots([[0, 0], [4, 0], [0, 3]]),
    whichFigure([round(4), sq(4), tri(5, 3)], "triangle"),
    vf("Un triangle a 4 coins.", false, "un triangle a 3 coins."),
    joinDots([[3, 0], [6, 4], [0, 4]]),
    whichFigure([rect(5, 2), tri(2, 3), round(2)], "triangle"),
    vf("On trace les côtés d’un triangle avec la règle.", true, "ce sont des traits droits."),
  ]),
  figures(6, "reproduire un triangle", [
    joinDots([[1, 1], [5, 1], [3, 4]]),
    joinDots([[0, 4], [2, 0], [4, 4]]),
    whichFigure([tri(4, 4), sq(3), rect(5, 3)], "triangle"),
    joinDots([[1, 0], [1, 4], [5, 4]]),
    vf("Pour reproduire un triangle, on relie 3 points avec la règle.", true, "3 points reliés donnent 3 côtés."),
    whichFigure([sq(2), round(3), tri(3, 2)], "triangle"),
    joinDots([[0, 0], [6, 2], [0, 4]]),
    whichFigure([rect(3, 4), tri(5, 4), sq(4)], "triangle"),
    vf("Un triangle a autant de côtés qu’un carré.", false, "le triangle a 3 côtés, le carré en a 4."),
    joinDots([[2, 1], [6, 3], [1, 4]]),
  ]),
  figures(7, "le rond", [
    whichFigure([sq(3), round(3), tri(3, 3)], "rond"),
    whichFigure([round(4), rect(5, 2), sq(2)], "rond"),
    vf("Un rond n’a pas de côté.", true, "c’est une ligne courbe fermée."),
    whichFigure([tri(4, 3), sq(4), round(2)], "rond"),
    whichLine(["rond", "arc", "vague"], "fermée"),
    vf("On trace un rond avec la règle.", false, "un rond est une ligne courbe : on le trace à main levée ou avec un objet rond."),
    whichFigure([rect(3, 2), round(5), tri(2, 2)], "rond"),
    vf("Une pièce de monnaie a la forme d’un rond.", true, "son bord est une ligne courbe fermée."),
    whichFigure([round(3), sq(3), rect(4, 3)], "rond"),
    whichLine(["arc", "vague", "nuage"], "fermée"),
  ]),
  figures(8, "révision : carré et rectangle", [
    vf("Les 4 côtés d’un carré ont la même longueur.", true, "c’est ce qui fait un carré."),
    vf("Les 2 côtés opposés d’un rectangle ont la même longueur.", true, "ils sont égaux deux à deux."),
    vf("Les 2 côtés opposés d’un carré n’ont pas la même longueur.", false, "dans un carré, tous les côtés ont la même longueur."),
    whichFigure([rect(5, 3), sq(3), tri(3, 3)], "carré"),
    whichFigure([sq(2), rect(6, 2), round(2)], "rectangle"),
    sideOf(sq(4), "côté"),
    sideOf(rect(6, 2), "grand côté"),
    joinDots([[0, 0], [4, 0], [4, 4], [0, 4]]),
    joinDots([[0, 0], [6, 0], [6, 2], [0, 2]]),
    sideOf(rect(5, 3), "petit côté"),
  ]),
  figures(9, "révision : le triangle", [
    whichFigure([tri(3, 3), rect(4, 2), sq(3)], "triangle"),
    joinDots([[0, 3], [3, 0], [6, 3]]),
    vf("Un triangle a 3 côtés et 3 coins.", true, "« tri » veut dire trois."),
    joinDots([[0, 0], [5, 0], [5, 4], [0, 4]]),
    whichFigure([round(3), tri(4, 4), sq(4)], "triangle"),
    joinDots([[1, 0], [5, 2], [1, 4]]),
    vf("En reliant 4 points, on obtient un triangle.", false, "4 points reliés donnent 4 côtés, et un triangle n’en a que 3."),
    whichFigure([sq(2), round(2), tri(3, 2)], "triangle"),
    joinDots([[2, 0], [2, 4], [6, 4]]),
    vf("On peut dessiner un triangle avec la règle.", true, "ses 3 côtés sont des traits droits."),
  ]),
  figures(10, "révision : le rond", [
    whichFigure([round(3), tri(3, 3), sq(3)], "rond"),
    vf("Un rond est une ligne fermée.", true, "il n’a pas d’ouverture."),
    whichFigure([sq(4), rect(5, 2), round(4)], "rond"),
    countCatParts("rond"),
    vf("Un rond a 4 coins.", false, "un rond n’a ni côté ni coin."),
    whichFigure([tri(4, 4), round(5), rect(3, 2)], "rond"),
    whichLine(["rond", "zigzag", "vague"], "fermée"),
    whichFigure([rect(4, 2), sq(2), round(2)], "rond"),
    vf("Le soleil, un ballon et une assiette ressemblent à des ronds.", true, "leur bord est une ligne courbe fermée."),
    whichFigure([round(3), rect(4, 3), tri(3, 4)], "rond"),
  ]),
  figures(11, "activités d’intégration", [
    flagQuestion("bandes"),
    flagQuestion("milieu"),
    flagQuestion("étoile"),
    flagQuestion("gauche"),
    countCatParts("rectangle"),
    countCatParts("triangle"),
    countCatParts("rond"),
    vf("Les bandes du drapeau du Sénégal sont des rectangles.", true, "chaque bande a 4 côtés, opposés égaux deux à deux."),
  ]),
];
