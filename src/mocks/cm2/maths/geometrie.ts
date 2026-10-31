import "server-only";

// CM2, géométrie : une série DIANGAL par page du cahier de l'école. Quatre chapitres : quadrilatères et
// triangle (carré, rectangle, parallélogramme, losange, trapèze, tangram) ; cercle et polygones
// (hexagone, octogone, polygones irréguliers) ; solides (cube, pavé droit, cylindre, prisme droit) ;
// symétrie, translation, agrandissement et réduction.

import { cubeNet } from "../../early-math";
import type { ExerciseSeries, ExerciseSpec } from "../../exercise-series";
import { sideOf, whichFigure } from "../../geometry";
import { fact } from "../../measure";
import {
  angleKinds,
  areaQuad,
  circleCalc,
  circlePerimeter,
  cylinderVolume,
  linePairs,
  oppositeFace,
  perimeter,
  polygonPerimeter,
  story,
  symmetricDot,
  thirdAngle,
  translation,
  triangleKind,
  volume,
} from "../../upper-math";
import { seriesOf } from "../../cp/maths/helpers";
import { ctx } from "../../ci/maths/ensembles";

const vf = (statement: string, answer: boolean, why: string): ExerciseSpec => ({ vf: statement, answer, why: `<strong>${answer ? "Vrai" : "Faux"}</strong> : ${why}` });
const sq = (w: number) => ({ kind: "carré" as const, w });
const rect = (w: number, h: number) => ({ kind: "rectangle" as const, w, h });
const tri = (w: number, h: number) => ({ kind: "triangle" as const, w, h });
const NET_CROSS: [number, number][] = [[1, 0], [0, 1], [1, 1], [2, 1], [1, 2], [1, 3]];
const NET_T: [number, number][] = [[0, 0], [1, 0], [2, 0], [1, 1], [1, 2], [1, 3]];
const NET_FIVE: [number, number][] = [[1, 0], [0, 1], [1, 1], [2, 1], [1, 2]];
const NET_SEVEN: [number, number][] = [[1, 0], [0, 1], [1, 1], [2, 1], [3, 1], [1, 2], [1, 3]];

const quad = seriesOf("Les quadrilatères et le triangle");

export const QUADS_CM2: ExerciseSeries[] = [
  quad(1, "carré et rectangle", [
    whichFigure([rect(6, 3), sq(4), tri(4, 3)], "carré"),
    whichFigure([sq(3), rect(5, 2), tri(3, 3)], "rectangle"),
    perimeter({ kind: "carré", side: 8.5 }, "cm"),
    perimeter({ kind: "rectangle", long: 12.5, wide: 7.5 }, "m"),
    fact("Les diagonales d’un carré sont…", ["*égales, perpendiculaires et se coupent en leur milieu", "seulement égales", "parallèles"], "c’est une propriété du carré."),
    fact("Les diagonales d’un rectangle sont…", ["*égales et se coupent en leur milieu", "toujours perpendiculaires", "de longueurs différentes"], "elles ne sont perpendiculaires que si c’est un carré."),
    vf("Le carré est un rectangle particulier.", true, "il a 4 angles droits et ses 4 côtés égaux."),
    sideOf(rect(8, 3), "petit côté"),
  ]),
  quad(2, "le triangle", [
    triangleKind([5, 5, 5]),
    triangleKind([6, 4, 6]),
    triangleKind([4, 6, 7]),
    thirdAngle(35, 75),
    thirdAngle(90, 52),
    fact("Un triangle rectangle isocèle a un angle droit et…", ["*deux côtés égaux", "trois côtés égaux", "deux angles droits"], "ses deux angles aigus mesurent 45°."),
    vf("Dans un triangle équilatéral, chaque angle mesure 60°.", true, "180 : 3 = 60."),
    perimeter({ kind: "triangle", sides: [6, 4, 6] }, "cm"),
  ]),
  quad(3, "le parallélogramme", [
    fact("Un parallélogramme a ses côtés opposés…", ["*parallèles et égaux", "perpendiculaires", "de longueurs toutes différentes"], "c’est sa définition."),
    fact("Les diagonales d’un parallélogramme…", ["*se coupent en leur milieu", "sont toujours égales", "sont toujours perpendiculaires"], "c’est la propriété commune à tous les parallélogrammes."),
    perimeter({ kind: "rectangle", long: 9, wide: 5 }, "cm"),
    linePairs(["sécantes", "parallèles", "perpendiculaires"], "parallèles"),
    vf("Le rectangle, le losange et le carré sont des parallélogrammes particuliers.", true, "leurs côtés opposés sont parallèles."),
    fact("Un parallélogramme a des angles opposés…", ["*égaux", "droits toujours", "différents"], "les angles opposés ont la même mesure."),
    angleKinds([60, 120, 90], "obtus"),
    fact("Un parallélogramme a des côtés de 7 cm et 4 cm. Quel est son périmètre ?", ["11 cm", "*22 cm", "28 cm"], "(7 + 4) × 2 = 22 cm."),
  ]),
  quad(4, "le losange", [
    fact("Un losange a…", ["*quatre côtés égaux", "quatre angles droits toujours", "deux côtés seulement"], "c’est sa définition."),
    fact("Les diagonales d’un losange sont…", ["*perpendiculaires et se coupent en leur milieu", "égales toujours", "parallèles"], "elles forment des angles droits."),
    areaQuad({ kind: "losange", big: 8, small: 6 }, "cm"),
    areaQuad({ kind: "losange", big: 12, small: 5 }, "m"),
    polygonPerimeter("carré", 6, "cm"),
    vf("Un carré est un losange particulier.", true, "ses 4 côtés sont égaux et ses angles droits."),
    fact("Un losange a un côté de 5 cm. Quel est son périmètre ?", ["10 cm", "*20 cm", "25 cm"], "4 côtés égaux : 5 × 4 = 20 cm."),
    areaQuad({ kind: "losange", big: 10, small: 7 }, "dm"),
  ]),
  quad(5, "le trapèze", [
    fact("Un trapèze a…", ["*deux côtés parallèles (les bases)", "quatre côtés égaux", "quatre angles droits"], "la grande base et la petite base sont parallèles."),
    areaQuad({ kind: "trapèze", big: 10, small: 6, height: 4 }, "cm"),
    areaQuad({ kind: "trapèze", big: 15, small: 9, height: 8 }, "m"),
    areaQuad({ kind: "trapèze", big: 7, small: 5, height: 3 }, "cm"),
    fact("Un trapèze rectangle a…", ["*deux angles droits", "quatre angles droits", "aucun angle droit"], "un côté est perpendiculaire aux bases."),
    vf("Les deux bases d’un trapèze sont parallèles.", true, "c’est ce qui définit le trapèze."),
    perimeter({ kind: "triangle", sides: [10, 6, 5] }, "cm"),
    areaQuad({ kind: "trapèze", big: 24, small: 16, height: 10 }, "m"),
  ]),
  quad(6, "le tangram", [
    fact("Combien de pièces a un tangram ?", ["5", "*7", "9"], "5 triangles, 1 carré et 1 parallélogramme."),
    fact("Combien de triangles y a-t-il dans un tangram ?", ["3", "*5", "7"], "2 grands, 1 moyen et 2 petits."),
    fact("Quelles autres pièces a un tangram ?", ["*un carré et un parallélogramme", "deux cercles", "un losange et un trapèze"], "avec les 5 triangles, cela fait 7 pièces."),
    vf("Avec les 7 pièces du tangram, on peut reformer un grand carré.", true, "c’est la figure de départ."),
    whichFigure([tri(4, 4), sq(3), rect(5, 2)], "triangle"),
    triangleKind([4, 4, 6]),
    fact("Les deux petits triangles du tangram ensemble couvrent la même surface que…", ["*le petit carré", "un grand triangle", "tout le tangram"], "on peut les assembler pour former le carré."),
    vf("Toutes les pièces du tangram ont la même aire.", false, "les grands triangles sont plus grands que les petits."),
  ]),
];

const circ = seriesOf("Le cercle et les polygones");

export const CIRCLES_CM2: ExerciseSeries[] = [
  circ(1, "le cercle", [
    circleCalc("rayon", 6.5),
    circleCalc("diamètre", 21),
    circlePerimeter("diamètre", 14, "cm"),
    circlePerimeter("rayon", 7.5, "m"),
    fact("Une corde qui passe par le centre du cercle est…", ["un rayon", "*un diamètre", "un arc"], "le diamètre est la plus longue corde."),
    vf("Tous les rayons d’un même cercle ont la même longueur.", true, "c’est la définition du cercle."),
    fact("Un arc de cercle est…", ["*une partie du cercle", "le centre du cercle", "un segment"], "c’est un morceau de la ligne courbe."),
    circlePerimeter("diamètre", 50, "m"),
  ]),
  circ(2, "révision", [
    areaQuad({ kind: "losange", big: 9, small: 4 }, "cm"),
    areaQuad({ kind: "trapèze", big: 12, small: 8, height: 5 }, "cm"),
    triangleKind([7, 7, 7]),
    circlePerimeter("rayon", 4, "cm"),
    thirdAngle(48, 72),
    fact("Quel quadrilatère a quatre côtés égaux mais pas forcément d’angle droit ?", ["le rectangle", "*le losange", "le trapèze"], "le losange."),
    vf("Un trapèze n’a qu’une seule paire de côtés parallèles.", true, "ses deux bases."),
    perimeter({ kind: "carré", side: 9.5 }, "m"),
  ]),
  circ(3, "activités d’intégration", [
    ctx("Un jardin public a la forme d’un trapèze : grande base 40 m, petite base 25 m, hauteur 20 m.", areaQuad({ kind: "trapèze", big: 40, small: 25, height: 20 }, "m")),
    ctx("Au centre du jardin, un bassin circulaire a 6 m de diamètre.", circlePerimeter("diamètre", 6, "m")),
    ctx("Un massif de fleurs a la forme d’un losange de diagonales 8 m et 5 m.", areaQuad({ kind: "losange", big: 8, small: 5 }, "m")),
    story("Le jardin fait <strong>650</strong> m² ; le bassin et les massifs couvrent <strong>48,26</strong> m².", "Quelle surface reste pour la pelouse (en m²) ?", 650, "−", 48.26, "m²"),
    triangleKind([5, 5, 6]),
    vf("Pour connaître la longueur de la bordure du bassin, on calcule son périmètre.", true, "la bordure fait le tour."),
    circleCalc("diamètre", 6),
    fact("Quelle figure a deux côtés parallèles et deux qui ne le sont pas ?", ["*le trapèze", "le carré", "le losange"], "c’est le trapèze."),
  ]),
  circ(4, "l’hexagone", [
    fact("Combien de côtés a un hexagone ?", ["5", "*6", "8"], "hexa veut dire six."),
    polygonPerimeter("hexagone régulier", 5, "cm"),
    polygonPerimeter("hexagone régulier", 12, "m"),
    polygonPerimeter("hexagone régulier", 2.5, "dm"),
    fact("Un hexagone régulier peut être partagé en combien de triangles équilatéraux ?", ["4", "*6", "8"], "à partir du centre, on trace 6 triangles."),
    vf("Les alvéoles des abeilles ont la forme d’hexagones.", true, "ce sont des hexagones presque réguliers."),
    vf("On trace un hexagone régulier en reportant le rayon 6 fois sur le cercle.", true, "le côté est égal au rayon."),
    fact("Un hexagone régulier a un périmètre de 42 cm. Combien mesure un côté ?", ["*7 cm", "6 cm", "8 cm"], "42 : 6 = 7 cm."),
  ]),
  circ(5, "l’octogone", [
    fact("Combien de côtés a un octogone ?", ["6", "7", "*8"], "octo veut dire huit."),
    polygonPerimeter("octogone régulier", 4, "cm"),
    polygonPerimeter("octogone régulier", 15, "m"),
    polygonPerimeter("octogone régulier", 1.5, "dm"),
    fact("Quel panneau de la route a la forme d’un octogone ?", ["*le panneau « stop »", "le panneau « cédez le passage »", "le panneau de vitesse"], "le stop est un octogone rouge."),
    vf("Un octogone régulier a 8 côtés égaux et 8 angles égaux.", true, "c’est la définition d’un polygone régulier."),
    fact("Un octogone régulier a un périmètre de 96 cm. Combien mesure un côté ?", ["*12 cm", "8 cm", "16 cm"], "96 : 8 = 12 cm."),
    polygonPerimeter("pentagone régulier", 6, "cm"),
  ]),
  circ(6, "les polygones irréguliers", [
    fact("Un polygone irrégulier a…", ["*des côtés de longueurs différentes", "tous ses côtés égaux", "des côtés courbes"], "ses côtés ou ses angles ne sont pas tous égaux."),
    perimeter({ kind: "triangle", sides: [4, 7, 9] }, "cm"),
    fact("Un polygone a des côtés de 3 cm, 4 cm, 5 cm, 6 cm et 2 cm. Quel est son périmètre ?", ["15 cm", "*20 cm", "25 cm"], "3 + 4 + 5 + 6 + 2 = 20 cm."),
    fact("Combien de côtés a un pentagone ?", ["4", "*5", "6"], "penta veut dire cinq."),
    vf("Un rectangle est un polygone régulier.", false, "ses côtés ne sont pas tous égaux (sauf le carré)."),
    vf("Un polygone est une figure fermée formée de segments.", true, "ses côtés sont des segments de droite."),
    fact("Un cercle est-il un polygone ?", ["oui", "*non"], "il n’a pas de côtés droits."),
    perimeter({ kind: "triangle", sides: [12, 15, 20] }, "m"),
  ]),
];

const solids = seriesOf("Les solides");

export const SOLIDS_CM2: ExerciseSeries[] = [
  solids(1, "le cube", [
    cubeNet([NET_FIVE, NET_CROSS, NET_SEVEN]),
    oppositeFace(["A", "B", "C", "D", "E", "F"], "D"),
    volume({ kind: "cube", edge: 4 }, "cm"),
    fact("Combien d’arêtes a un cube ?", ["8", "*12", "6"], "12 arêtes de même longueur."),
    fact("Un cube a 5 cm d’arête. Quelle est la longueur totale de ses arêtes ?", ["30 cm", "*60 cm", "125 cm"], "12 × 5 = 60 cm."),
    vf("Les 6 faces d’un cube sont des carrés égaux.", true, "c’est un pavé droit particulier."),
    volume({ kind: "cube", edge: 1.5 }, "dm"),
    cubeNet([NET_T, NET_SEVEN]),
  ]),
  solids(2, "le pavé droit", [
    volume({ kind: "pavé droit", long: 8, wide: 5, high: 3 }, "cm"),
    volume({ kind: "pavé droit", long: 2.5, wide: 2, high: 1.2 }, "m"),
    fact("Combien de faces a un pavé droit ?", ["4", "*6", "8"], "trois paires de faces opposées."),
    fact("Un pavé droit a 8 cm de long, 5 cm de large et 3 cm de haut. Combien mesurent ses 12 arêtes en tout ?", ["16 cm", "*64 cm", "120 cm"], "(8 + 5 + 3) × 4 = 64 cm."),
    vf("Dans un pavé droit, les faces opposées sont égales et parallèles.", true, "elles vont par paires."),
    perimeter({ kind: "rectangle", long: 8, wide: 5 }, "cm"),
    volume({ kind: "pavé droit", long: 10, wide: 4, high: 6 }, "dm"),
    fact("Quel objet a la forme d’un pavé droit ?", ["un ballon", "*une boîte à chaussures", "une boîte de conserve"], "ses faces sont rectangulaires."),
  ]),
  solids(3, "le cylindre (1)", [
    circlePerimeter("rayon", 5, "cm"),
    circlePerimeter("diamètre", 8, "cm"),
    fact("Le patron d’un cylindre est formé de…", ["*deux disques et un rectangle", "six carrés", "deux triangles et trois rectangles"], "les bases et la face latérale déroulée."),
    fact("La longueur du rectangle du patron d’un cylindre est égale…", ["au rayon", "*au périmètre du disque de base", "à la hauteur"], "le rectangle fait le tour de la base."),
    vf("Un cylindre a deux bases parallèles et superposables.", true, "deux disques égaux."),
    circleCalc("diamètre", 12),
    cylinderVolume(2, 10, "cm"),
    fact("Quel objet a la forme d’un cylindre ?", ["*une canette", "un dé", "une brique"], "elle a deux bases rondes."),
  ]),
  solids(4, "le cylindre (2)", [
    cylinderVolume(3, 10, "cm"),
    cylinderVolume(1, 2, "m"),
    cylinderVolume(5, 4, "dm"),
    circlePerimeter("diamètre", 20, "cm"),
    vf("Volume du cylindre = aire de la base × hauteur.", true, "aire de la base = rayon × rayon × 3,14."),
    cylinderVolume(10, 5, "cm"),
    fact("Un cylindre de 1 dm de rayon et 1 dm de haut contient environ…", ["1 litre", "*3,14 litres", "10 litres"], "1 × 1 × 3,14 × 1 = 3,14 dm³."),
    cylinderVolume(2, 7, "dm"),
  ]),
  solids(5, "le prisme droit (1)", [
    fact("Un prisme droit a deux bases…", ["*parallèles et superposables", "rondes toujours", "de tailles différentes"], "les bases sont des polygones égaux."),
    fact("Un prisme droit à base triangulaire a combien de faces ?", ["3", "*5", "6"], "2 bases triangulaires et 3 faces rectangulaires."),
    fact("Les faces latérales d’un prisme droit sont…", ["*des rectangles", "des triangles", "des cercles"], "elles relient les deux bases."),
    vf("Un pavé droit est un prisme droit à base rectangulaire.", true, "ses bases sont des rectangles."),
    fact("Combien d’arêtes a un prisme droit à base triangulaire ?", ["6", "*9", "12"], "3 sur chaque base et 3 latérales."),
    fact("Combien de sommets a un prisme droit à base triangulaire ?", ["*6", "5", "9"], "3 par base."),
    vf("Une tente canadienne a souvent la forme d’un prisme droit à base triangulaire.", true, "les deux côtés triangulaires sont les bases."),
    perimeter({ kind: "triangle", sides: [3, 4, 5] }, "dm"),
  ]),
  solids(6, "le prisme droit (2)", [
    fact("Le volume d’un prisme droit est égal à…", ["*l’aire de la base × la hauteur", "la somme des arêtes", "le périmètre de la base × 2"], "comme pour le pavé droit."),
    fact("Un prisme droit a une base de 12 cm² et une hauteur de 5 cm. Quel est son volume ?", ["17 cm³", "*60 cm³", "120 cm³"], "12 × 5 = 60 cm³."),
    fact("Le patron d’un prisme droit à base triangulaire comprend…", ["*2 triangles et 3 rectangles", "6 carrés", "2 cercles et 1 rectangle"], "les bases et les faces latérales."),
    fact("Un prisme droit à base hexagonale a combien de faces latérales ?", ["4", "*6", "8"], "une par côté de l’hexagone."),
    vf("Un cube est un prisme droit.", true, "c’est un prisme à base carrée de même hauteur que le côté."),
    volume({ kind: "pavé droit", long: 6, wide: 4, high: 5 }, "cm"),
    fact("Un prisme droit a une base de 24 m² et une hauteur de 3 m. Quel est son volume ?", ["27 m³", "48 m³", "*72 m³"], "24 × 3 = 72 m³."),
    thirdAngle(90, 37),
  ]),
  solids(7, "révision", [
    volume({ kind: "cube", edge: 6 }, "cm"),
    volume({ kind: "pavé droit", long: 12, wide: 8, high: 5 }, "cm"),
    cylinderVolume(4, 10, "cm"),
    oppositeFace(["P", "Q", "R", "S", "T", "U"], "Q"),
    fact("Quel solide a 5 faces, dont 2 bases triangulaires ?", ["le cube", "*le prisme droit à base triangulaire", "le cylindre"], "2 triangles et 3 rectangles."),
    vf("Le cylindre n’a pas d’arête droite.", true, "ses bords sont des cercles."),
    cubeNet([NET_SEVEN, NET_CROSS]),
    fact("Combien de sommets a un pavé droit ?", ["6", "*8", "12"], "4 en haut et 4 en bas."),
  ]),
  solids(8, "activités d’intégration", [
    ctx("Un réservoir d’eau a la forme d’un pavé droit de 3 m, 2 m et 1,5 m.", volume({ kind: "pavé droit", long: 3, wide: 2, high: 1.5 }, "m")),
    ctx("Un autre réservoir est un cylindre de 1 m de rayon et 2 m de haut.", cylinderVolume(1, 2, "m")),
    story("Le réservoir en pavé contient <strong>9</strong> m³ ; 1 m³ = <strong>1 000</strong> ℓ.", "Combien de litres contient-il ?", 9, "×", 1000, "ℓ"),
    story("Une famille utilise <strong>150</strong> ℓ par jour ; le réservoir a <strong>9 000</strong> ℓ.", "Combien de jours dure l’eau ?", 9000, ":", 150, "jours"),
    circlePerimeter("rayon", 1, "m"),
    vf("1 m³ d’eau pèse 1 tonne.", true, "1 000 ℓ d’eau pèsent 1 000 kg."),
    fact("Quel réservoir contient le plus d’eau : 9 m³ ou 6,28 m³ ?", ["*9 m³", "6,28 m³"], "9 est plus grand que 6,28."),
    volume({ kind: "cube", edge: 2 }, "m"),
  ]),
];

const sym = seriesOf("Symétrie, translation, agrandissement et réduction");

export const SYMMETRY_CM2: ExerciseSeries[] = [
  sym(1, "figures symétriques et axe de symétrie", [
    symmetricDot(2, 3, [[2, 7], [2, 8], [3, 7]]),
    symmetricDot(0, 2, [[0, 8], [1, 8], [0, 7]]),
    symmetricDot(4, 4, [[4, 6], [4, 7], [3, 6]]),
    symmetricDot(5, 1, [[5, 9], [4, 9], [5, 8]]),
    fact("Combien d’axes de symétrie a un losange (non carré) ?", ["*2", "4", "1"], "ses deux diagonales."),
    fact("Combien d’axes de symétrie a un hexagone régulier ?", ["3", "*6", "12"], "3 passent par des sommets, 3 par des milieux de côtés."),
    vf("Un parallélogramme quelconque n’a pas d’axe de symétrie.", true, "aucun pliage ne superpose ses moitiés."),
    fact("Combien d’axes de symétrie a un trapèze isocèle ?", ["*1", "2", "0"], "l’axe passe par les milieux des deux bases."),
  ]),
  sym(2, "la translation", [
    translation(5, 0, "droite"),
    translation(3, 3, "bas"),
    translation(7, 2, "droite"),
    translation(2, 1, "bas"),
    translation(9, 3, "droite"),
    vf("Une translation garde la forme, la taille et l’orientation de la figure.", true, "la figure glisse sans tourner."),
    fact("Le motif répété d’une frise est obtenu par…", ["*translation", "agrandissement", "réduction"], "le même motif glisse le long de la frise."),
    translation(6, 1, "bas"),
  ]),
  sym(3, "l’agrandissement", [
    story("Un rectangle mesure <strong>4</strong> cm de long. On l’agrandit <strong>3</strong> fois.", "Combien mesure sa nouvelle longueur (en cm) ?", 4, "×", 3, "cm"),
    story("Un carré a <strong>2,5</strong> cm de côté. On l’agrandit <strong>4</strong> fois.", "Combien mesure son nouveau côté (en cm) ?", 2.5, "×", 4, "cm"),
    story("Un triangle a un côté de <strong>6</strong> cm. Après agrandissement, ce côté mesure <strong>18</strong> cm.", "Combien de fois la figure a-t-elle été agrandie ?", 18, ":", 6, "fois"),
    vf("Dans un agrandissement, les angles ne changent pas.", true, "seules les longueurs sont multipliées."),
    vf("Si on agrandit un carré 2 fois, son périmètre est multiplié par 2.", true, "chaque côté est multiplié par 2."),
    fact("Si on agrandit un carré 2 fois, son aire est multipliée par…", ["2", "*4", "8"], "2 × 2 = 4."),
    story("Une photo de <strong>10</strong> cm de large est agrandie <strong>5</strong> fois.", "Quelle est sa nouvelle largeur (en cm) ?", 10, "×", 5, "cm"),
    perimeter({ kind: "carré", side: 10 }, "cm"),
  ]),
  sym(4, "la réduction", [
    story("Un rectangle mesure <strong>18</strong> cm de long. On le réduit <strong>3</strong> fois.", "Combien mesure sa nouvelle longueur (en cm) ?", 18, ":", 3, "cm"),
    story("Un carré a <strong>12</strong> cm de côté. On le réduit de moitié, c’est-à-dire <strong>2</strong> fois.", "Combien mesure son nouveau côté (en cm) ?", 12, ":", 2, "cm"),
    story("Un côté de <strong>20</strong> cm devient <strong>5</strong> cm après réduction.", "Combien de fois la figure a-t-elle été réduite ?", 20, ":", 5, "fois"),
    vf("Dans une réduction, la forme de la figure ne change pas.", true, "les longueurs sont divisées par le même nombre."),
    fact("Une carte est une réduction de la réalité. Une échelle de 1/1 000 veut dire que…", ["*1 cm sur la carte représente 1 000 cm en vrai", "la carte est 1 000 fois plus grande", "1 m représente 1 cm"], "tout est réduit 1 000 fois."),
    story("Un plan réduit <strong>100</strong> fois une salle de <strong>800</strong> cm de long.", "Combien mesure la salle sur le plan (en cm) ?", 800, ":", 100, "cm"),
    vf("Si on réduit une figure 2 fois, ses angles sont divisés par 2.", false, "les angles restent les mêmes."),
    perimeter({ kind: "rectangle", long: 6, wide: 4 }, "cm"),
  ]),
  sym(5, "révision", [
    symmetricDot(3, 2, [[3, 8], [3, 7], [2, 8]]),
    translation(4, 2, "droite"),
    translation(4, 2, "bas"),
    story("Un segment de <strong>3,5</strong> cm est agrandi <strong>6</strong> fois.", "Combien mesure-t-il (en cm) ?", 3.5, "×", 6, "cm"),
    story("Un segment de <strong>24</strong> cm est réduit <strong>8</strong> fois.", "Combien mesure-t-il (en cm) ?", 24, ":", 8, "cm"),
    fact("Quelle transformation retourne une figure comme dans un miroir ?", ["*la symétrie", "la translation", "l’agrandissement"], "la figure est retournée par rapport à l’axe."),
    vf("Dans une translation, la figure tourne.", false, "elle glisse sans tourner."),
    symmetricDot(1, 0, [[1, 10], [0, 10], [1, 9]]),
  ]),
  sym(6, "activités d’intégration", [
    ctx("Pour la fête de l’école, on décore un mur avec une frise : le même motif glisse de 4 carreaux à chaque fois.", translation(4, 0, "droite")),
    ctx("Le motif a un axe de symétrie vertical.", symmetricDot(2, 1, [[2, 9], [2, 8], [1, 9]])),
    story("Le motif fait <strong>15</strong> cm de large ; on l’agrandit <strong>4</strong> fois pour l’affiche.", "Quelle largeur sur l’affiche (en cm) ?", 15, "×", 4, "cm"),
    story("La frise mesure <strong>6</strong> m ; chaque motif occupe <strong>0,6</strong> m.", "Combien de motifs faut-il ?", 6, ":", 0.6, "motifs"),
    story("Le plan du mur est réduit <strong>50</strong> fois ; le mur fait <strong>600</strong> cm.", "Combien mesure-t-il sur le plan (en cm) ?", 600, ":", 50, "cm"),
    vf("Une frise est faite de motifs obtenus par translation.", true, "le même motif glisse."),
    fact("Si un motif de 15 cm est agrandi 4 fois, son aire est multipliée par…", ["4", "8", "*16"], "4 × 4 = 16."),
    perimeter({ kind: "rectangle", long: 60, wide: 40 }, "cm"),
  ]),
];
