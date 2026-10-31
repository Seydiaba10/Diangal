import "server-only";

// CE2, géométrie : une série DIANGAL par page du cahier de l'école. Quatre chapitres : lignes,
// droites et angles ; carré, rectangle et triangle ; cercle et symétrie ; patrons des solides. Le
// cahier fait tracer avec la règle, l'équerre et le compas ; ici l'élève reconnaît, mesure et calcule
// sur le même genre de dessin.

import { cubeNet } from "../../early-math";
import type { ExerciseSeries, ExerciseSpec } from "../../exercise-series";
import { sideOf, whichFigure, whichLineKind } from "../../geometry";
import { fact } from "../../measure";
import { angleKinds, circleCalc, linePairs, oppositeFace, perimeter, symmetricDot, triangleKind, whichDirection } from "../../upper-math";
import { seriesOf } from "../../cp/maths/helpers";
import { ctx } from "../../ci/maths/ensembles";

const vf = (statement: string, answer: boolean, why: string): ExerciseSpec => ({ vf: statement, answer, why: `<strong>${answer ? "Vrai" : "Faux"}</strong> : ${why}` });
const sq = (w: number) => ({ kind: "carré" as const, w });
const rect = (w: number, h: number) => ({ kind: "rectangle" as const, w, h });
const tri = (w: number, h: number) => ({ kind: "triangle" as const, w, h });
const round = (w: number) => ({ kind: "rond" as const, w });

const lines = seriesOf("Lignes, droites et angles");

export const LINES_CE2: ExerciseSeries[] = [
  lines(1, "ligne droite, ligne courbe, ligne brisée", [
    whichLineKind(["courbe", "droite", "brisée"], "droite"),
    whichLineKind(["brisée", "courbe", "droite"], "courbe"),
    whichLineKind(["droite", "brisée", "courbe"], "brisée"),
    whichLineKind(["courbe", "brisée", "droite"], "brisée"),
    whichLineKind(["droite", "courbe", "brisée"], "courbe"),
    whichLineKind(["brisée", "droite", "courbe"], "droite"),
    vf("On trace une ligne droite avec la règle.", true, "la règle guide le crayon tout droit."),
    vf("Une ligne brisée est faite de plusieurs morceaux de lignes droites.", true, "elle change de direction à chaque coin."),
  ]),
  lines(2, "droite horizontale, verticale, oblique", [
    whichDirection(["oblique", "horizontale", "verticale"], "horizontale"),
    whichDirection(["verticale", "oblique", "horizontale"], "verticale"),
    whichDirection(["horizontale", "verticale", "oblique"], "oblique"),
    whichDirection(["verticale", "horizontale", "oblique"], "horizontale"),
    whichDirection(["oblique", "verticale", "horizontale"], "verticale"),
    whichDirection(["horizontale", "oblique", "verticale"], "oblique"),
    vf("Une droite qui n’est ni horizontale ni verticale est oblique.", true, "elle penche."),
    vf("Le fil à plomb du maçon montre une droite horizontale.", false, "il pend tout droit vers le bas : il montre une verticale."),
  ]),
  lines(3, "droites sécantes, parallèles, perpendiculaires", [
    linePairs(["sécantes", "parallèles", "perpendiculaires"], "parallèles"),
    linePairs(["parallèles", "perpendiculaires", "sécantes"], "perpendiculaires"),
    linePairs(["perpendiculaires", "sécantes", "parallèles"], "sécantes"),
    linePairs(["parallèles", "sécantes", "perpendiculaires"], "perpendiculaires"),
    linePairs(["sécantes", "perpendiculaires", "parallèles"], "parallèles"),
    linePairs(["perpendiculaires", "parallèles", "sécantes"], "sécantes"),
    vf("Deux droites parallèles ne se coupent jamais.", true, "elles gardent toujours le même écart."),
    fact("Avec quel outil vérifie-t-on que deux droites sont perpendiculaires ?", ["le compas", "*l’équerre", "le rapporteur seul"], "l’angle droit de l’équerre se pose sur l’angle formé."),
  ]),
  lines(4, "angle droit, angle aigu, angle obtus (1)", [
    angleKinds([90, 45, 130], "droit"),
    angleKinds([90, 45, 130], "aigu"),
    angleKinds([90, 45, 130], "obtus"),
    angleKinds([150, 90, 30], "aigu"),
    angleKinds([60, 120, 90], "obtus"),
    angleKinds([110, 70, 90], "droit"),
    vf("Un angle aigu est plus petit qu’un angle droit.", true, "il est plus fermé que le coin de l’équerre."),
    vf("Un angle obtus est plus petit qu’un angle droit.", false, "il est plus grand, plus ouvert."),
  ]),
  lines(5, "angle droit, angle aigu, angle obtus (2)", [
    fact("Un angle mesure 120°. Quel est cet angle ?", ["aigu", "droit", "*obtus"], "120° est plus grand que 90°."),
    fact("Un angle mesure 50°. Quel est cet angle ?", ["*aigu", "droit", "obtus"], "50° est plus petit que 90°."),
    fact("Combien de degrés mesure un angle droit ?", ["45°", "*90°", "180°"], "l’angle droit mesure 90°."),
    fact("Avec quel outil mesure-t-on un angle en degrés ?", ["la règle", "*le rapporteur", "le compas"], "le rapporteur est gradué en degrés."),
    angleKinds([100, 40, 90], "obtus"),
    angleKinds([80, 140, 90], "aigu"),
    angleKinds([35, 90, 160], "droit"),
    fact("Un angle mesure 89°. Quel est cet angle ?", ["*aigu", "droit", "obtus"], "89° est un peu plus petit que 90°."),
  ]),
];

const shapes = seriesOf("Carré, rectangle et triangle");

export const SHAPES_CE2: ExerciseSeries[] = [
  shapes(1, "les propriétés du carré", [
    fact("Combien d’angles droits a un carré ?", ["2", "3", "*4"], "ses quatre angles sont droits."),
    vf("Le carré a quatre côtés égaux.", true, "c’est sa propriété principale."),
    vf("Les côtés opposés d’un carré sont parallèles.", true, "ils ne se coupent jamais."),
    vf("Un carré peut avoir un angle obtus.", false, "ses quatre angles sont droits."),
    whichFigure([rect(4, 2), sq(3), tri(3, 2)], "carré"),
    sideOf(sq(4), "côté"),
    perimeter({ kind: "carré", side: 5 }, "cm"),
    fact("Quelle figure a quatre côtés égaux et quatre angles droits ?", ["le rectangle", "*le carré", "le triangle"], "c’est la définition du carré."),
  ]),
  shapes(2, "construire un carré", [
    fact("Pour tracer un carré sans quadrillage, quels outils utilise-t-on ?", ["*la règle et l’équerre", "le compas seul", "la gomme"], "la règle mesure les côtés, l’équerre trace les angles droits."),
    fact("Pour tracer un carré de 5 cm, combien mesure chaque côté ?", ["2,5 cm", "*5 cm", "20 cm"], "les quatre côtés mesurent 5 cm."),
    vf("Pour construire un carré, on commence par tracer deux côtés perpendiculaires.", true, "on trace l’angle droit avec l’équerre."),
    sideOf(sq(3), "côté"),
    sideOf(sq(5), "côté"),
    perimeter({ kind: "carré", side: 3 }, "cm"),
    whichFigure([sq(2), rect(5, 2), round(3)], "carré"),
    vf("Pour vérifier un angle droit, on utilise l’équerre.", true, "le coin de l’équerre est un angle droit."),
  ]),
  shapes(3, "les propriétés du rectangle", [
    fact("Combien de côtés égaux deux à deux a un rectangle ?", ["*2 paires", "1 paire", "aucune"], "2 longueurs égales et 2 largeurs égales."),
    vf("Les quatre angles d’un rectangle sont droits.", true, "comme ceux du carré."),
    vf("Les côtés opposés d’un rectangle sont parallèles.", true, "les longueurs sont parallèles, les largeurs aussi."),
    vf("Les quatre côtés d’un rectangle sont égaux.", false, "il a deux longueurs et deux largeurs."),
    whichFigure([sq(3), rect(5, 3), tri(4, 3)], "rectangle"),
    sideOf(rect(6, 4), "grand côté"),
    sideOf(rect(6, 4), "petit côté"),
    perimeter({ kind: "rectangle", long: 6, wide: 4 }, "cm"),
  ]),
  shapes(4, "diagonales et médianes du rectangle", [
    fact("Comment s’appelle la droite qui joint deux sommets opposés d’un rectangle ?", ["une médiane", "*une diagonale", "un côté"], "elle traverse le rectangle d’un coin à l’autre."),
    fact("Comment s’appelle la droite qui relie les milieux de deux côtés opposés ?", ["*une médiane", "une diagonale", "une hauteur"], "elle passe par le milieu des côtés."),
    fact("Combien de diagonales a un rectangle ?", ["1", "*2", "4"], "une pour chaque paire de sommets opposés."),
    fact("Combien de médianes a un rectangle ?", ["1", "*2", "4"], "une entre les longueurs, une entre les largeurs."),
    vf("Les deux diagonales d’un rectangle se coupent en leur milieu.", true, "elles se croisent au centre du rectangle."),
    perimeter({ kind: "rectangle", long: 8, wide: 5 }, "cm"),
    sideOf(rect(5, 2), "grand côté"),
    whichFigure([rect(4, 3), sq(4), tri(4, 2)], "rectangle"),
  ]),
  shapes(5, "le triangle : côtés, sommets, angles", [
    fact("Combien de sommets a un triangle ?", ["2", "*3", "4"], "un sommet à chaque coin."),
    fact("Combien d’angles a un triangle ?", ["*3", "4", "6"], "un angle à chaque sommet."),
    whichFigure([tri(4, 3), sq(3), rect(5, 2)], "triangle"),
    triangleKind([4, 5, 6]),
    triangleKind([5, 5, 5]),
    triangleKind([4, 4, 6]),
    perimeter({ kind: "triangle", sides: [4, 5, 6] }, "cm"),
    vf("Un triangle a autant de côtés que de sommets.", true, "3 côtés et 3 sommets."),
  ]),
  shapes(6, "le triangle rectangle", [
    fact("Combien d’angles droits a un triangle rectangle ?", ["*1", "2", "3"], "un triangle rectangle a exactement un angle droit."),
    vf("Pour tracer un triangle rectangle, on trace d’abord deux côtés perpendiculaires.", true, "ils forment l’angle droit."),
    angleKinds([90, 60, 30], "droit"),
    fact("Quel outil sert à tracer l’angle droit d’un triangle rectangle ?", ["le compas", "*l’équerre", "le rapporteur"], "l’équerre a un angle droit."),
    vf("Un triangle peut avoir deux angles droits.", false, "deux angles droits ne peuvent pas se refermer en triangle."),
    triangleKind([3, 4, 5]),
    perimeter({ kind: "triangle", sides: [3, 4, 5] }, "cm"),
    angleKinds([45, 90, 135], "aigu"),
  ]),
  shapes(7, "le triangle équilatéral", [
    triangleKind([6, 6, 6]),
    triangleKind([4, 5, 4]),
    triangleKind([3, 3, 3]),
    triangleKind([5, 6, 7]),
    fact("Quel outil permet de reporter la même longueur pour tracer un triangle équilatéral ?", ["la gomme", "*le compas", "l’équerre"], "on trace deux arcs de cercle de même rayon."),
    perimeter({ kind: "triangle", sides: [6, 6, 6] }, "cm"),
    vf("Un triangle équilatéral a ses trois côtés égaux.", true, "« équi » veut dire égal."),
    fact("Un triangle équilatéral a un périmètre de 15 cm. Combien mesure un côté ?", ["3 cm", "*5 cm", "15 cm"], "15 : 3 = 5 cm."),
  ]),
  shapes(8, "le triangle isocèle", [
    triangleKind([4, 4, 3]),
    triangleKind([5, 7, 5]),
    triangleKind([6, 4, 6]),
    triangleKind([7, 7, 7]),
    vf("Un triangle isocèle a deux côtés égaux.", true, "et les deux angles de la base sont égaux."),
    perimeter({ kind: "triangle", sides: [4, 4, 3] }, "cm"),
    fact("Un triangle isocèle a une base de 3 cm et deux côtés de 4 cm. Quel est son périmètre ?", ["7 cm", "*11 cm", "12 cm"], "4 + 4 + 3 = 11 cm."),
    triangleKind([3, 5, 6]),
  ]),
  shapes(9, "la hauteur du triangle", [
    fact("Une hauteur d’un triangle passe par un sommet et est … à la base.", ["parallèle", "*perpendiculaire", "égale"], "elle forme un angle droit avec la base."),
    fact("Quel outil sert à tracer une hauteur ?", ["*l’équerre", "le compas", "le rapporteur"], "on trace la perpendiculaire avec l’équerre."),
    fact("Combien de hauteurs a un triangle ?", ["1", "2", "*3"], "une hauteur part de chaque sommet."),
    vf("La hauteur d’un triangle part d’un sommet et va jusqu’au côté opposé.", true, "ce côté opposé s’appelle la base."),
    vf("La hauteur forme un angle obtus avec la base.", false, "elle forme un angle droit."),
    angleKinds([90, 120, 50], "droit"),
    triangleKind([5, 5, 8]),
    perimeter({ kind: "triangle", sides: [5, 5, 8] }, "cm"),
  ]),
  shapes(10, "révision", [
    whichFigure([sq(3), rect(5, 3), tri(4, 3)], "carré"),
    perimeter({ kind: "carré", side: 3 }, "cm"),
    perimeter({ kind: "rectangle", long: 4, wide: 2 }, "cm"),
    triangleKind([6, 6, 6]),
    triangleKind([3, 4, 3]),
    angleKinds([90, 30, 140], "obtus"),
    fact("Combien de diagonales a un carré ?", ["1", "*2", "4"], "comme le rectangle, il en a deux."),
    vf("Un carré est un rectangle particulier : ses quatre côtés sont égaux.", true, "il a toutes les propriétés du rectangle."),
  ]),
  shapes(11, "activités d’intégration", [
    ctx("Aminata offre à son camarade le dessin d’une maison : un carré surmonté d’un triangle, avec une porte rectangulaire.", fact("Combien de figures différentes a-t-elle utilisées ?", ["2", "*3", "4"], "un carré, un triangle et un rectangle.")),
    ctx("Le mur de la maison est un carré de 6 m de côté.", perimeter({ kind: "carré", side: 6 }, "m")),
    ctx("La porte est un rectangle de 2 m sur 1 m.", perimeter({ kind: "rectangle", long: 2, wide: 1 }, "m")),
    ctx("Le toit est un triangle.", triangleKind([5, 5, 6])),
    ctx("Le menuisier vérifie les coins de la porte.", angleKinds([90, 120, 60], "droit")),
    whichFigure([tri(4, 3), sq(3), rect(5, 2)], "rectangle"),
    vf("Pour reproduire exactement ce dessin, on utilise la règle et l’équerre.", true, "la règle pour les longueurs, l’équerre pour les angles droits."),
    perimeter({ kind: "triangle", sides: [5, 5, 6] }, "m"),
  ]),
];

const circle = seriesOf("Le cercle et la symétrie");

export const CIRCLE_CE2: ExerciseSeries[] = [
  circle(1, "le cercle : centre et rayon", [
    fact("Avec quel outil trace-t-on un cercle ?", ["la règle", "*le compas", "l’équerre"], "la pointe sèche reste au centre."),
    fact("Comment s’appelle le point au milieu du cercle ?", ["*le centre", "le rayon", "le diamètre"], "tous les points du cercle sont à la même distance du centre."),
    fact("Comment s’appelle le segment qui va du centre au cercle ?", ["le diamètre", "*le rayon", "la corde"], "c’est l’écart des branches du compas."),
    vf("Tous les points d’un cercle sont à la même distance du centre.", true, "cette distance est le rayon."),
    circleCalc("rayon", 3),
    circleCalc("rayon", 5),
    fact("Pour tracer un cercle de 4 cm de rayon, on écarte le compas de…", ["2 cm", "*4 cm", "8 cm"], "l’écart du compas est le rayon."),
    circleCalc("rayon", 7),
  ]),
  circle(2, "le cercle : le diamètre", [
    circleCalc("diamètre", 8),
    circleCalc("diamètre", 12),
    circleCalc("rayon", 6),
    circleCalc("diamètre", 10),
    fact("Le diamètre passe toujours par…", ["*le centre", "un seul point du cercle", "l’extérieur du cercle"], "il traverse le cercle en passant par le centre."),
    vf("Le diamètre est deux fois plus long que le rayon.", true, "diamètre = rayon × 2."),
    circleCalc("rayon", 9),
    circleCalc("diamètre", 14),
  ]),
  circle(3, "figures symétriques et axe de symétrie (1)", [
    symmetricDot(2, 3, [[2, 7], [2, 8], [3, 7]]),
    symmetricDot(1, 1, [[1, 8], [1, 9], [2, 9]]),
    symmetricDot(4, 4, [[4, 6], [3, 6], [4, 7]]),
    symmetricDot(3, 2, [[3, 7], [3, 8], [2, 8]]),
    symmetricDot(0, 3, [[0, 6], [0, 7], [1, 7]]),
    vf("Un point et son symétrique sont à la même distance de l’axe.", true, "l’axe est juste au milieu."),
    fact("Quelle lettre a un axe de symétrie vertical ?", ["*A", "F", "G"], "si on plie la lettre A au milieu, les deux moitiés se superposent."),
    fact("Quelle figure a un axe de symétrie ?", ["*un cœur", "la lettre R", "la lettre F"], "on peut plier le cœur en deux moitiés pareilles."),
  ]),
  circle(4, "figures symétriques et axe de symétrie (2)", [
    symmetricDot(1, 2, [[1, 8], [1, 7], [2, 8]]),
    symmetricDot(3, 4, [[3, 5], [3, 6], [4, 6]]),
    symmetricDot(2, 0, [[2, 9], [2, 10], [1, 10]]),
    symmetricDot(4, 1, [[4, 9], [3, 9], [4, 8]]),
    fact("Combien d’axes de symétrie a un carré ?", ["2", "3", "*4"], "deux médianes et deux diagonales."),
    fact("Combien d’axes de symétrie a un rectangle (qui n’est pas un carré) ?", ["*2", "4", "0"], "seulement ses deux médianes."),
    fact("Combien d’axes de symétrie a un cercle ?", ["2", "4", "*une infinité"], "chaque diamètre est un axe de symétrie."),
    vf("Un carré a plus d’axes de symétrie qu’un rectangle.", true, "le carré en a 4, le rectangle 2."),
  ]),
  circle(5, "révision", [
    circleCalc("rayon", 4),
    circleCalc("diamètre", 18),
    symmetricDot(2, 1, [[2, 9], [2, 8], [1, 9]]),
    symmetricDot(0, 4, [[0, 6], [1, 6], [0, 5]]),
    fact("Le rayon d’un cercle mesure la moitié…", ["*du diamètre", "du centre", "du compas"], "rayon = diamètre : 2."),
    fact("Quelle lettre a un axe de symétrie vertical ?", ["L", "*M", "N"], "M se plie en deux moitiés pareilles."),
    vf("Un triangle équilatéral a trois axes de symétrie.", true, "un par sommet."),
    circleCalc("diamètre", 6),
  ]),
];

const nets = seriesOf("Les patrons des solides");
const NET_CROSS: [number, number][] = [[1, 0], [0, 1], [1, 1], [2, 1], [1, 2], [1, 3]];
const NET_T: [number, number][] = [[0, 0], [1, 0], [2, 0], [1, 1], [1, 2], [1, 3]];
const NET_ZIGZAG: [number, number][] = [[0, 0], [0, 1], [1, 1], [2, 1], [3, 1], [3, 2]];
const NET_FIVE: [number, number][] = [[1, 0], [0, 1], [1, 1], [2, 1], [1, 2]];
const NET_SEVEN: [number, number][] = [[1, 0], [0, 1], [1, 1], [2, 1], [3, 1], [1, 2], [1, 3]];

export const NETS_CE2: ExerciseSeries[] = [
  nets(1, "le patron du cube (1)", [
    cubeNet([NET_FIVE, NET_CROSS, NET_SEVEN]),
    cubeNet([NET_SEVEN, NET_T]),
    cubeNet([NET_ZIGZAG, NET_FIVE, NET_SEVEN]),
    fact("Un patron de cube est fait de combien de carrés ?", ["4", "5", "*6"], "un carré par face."),
    vf("Les faces opposées d’un cube sont parallèles.", true, "le dessus et le dessous, par exemple."),
    fact("Combien d’arêtes a un cube ?", ["6", "8", "*12"], "4 en haut, 4 en bas et 4 sur les côtés."),
    fact("Combien de sommets a un cube ?", ["6", "*8", "12"], "4 en haut et 4 en bas."),
    cubeNet([NET_FIVE, NET_ZIGZAG]),
  ]),
  nets(2, "le patron du cube (2)", [
    oppositeFace(["A", "B", "C", "D", "E", "F"], "A"),
    oppositeFace(["A", "B", "C", "D", "E", "F"], "B"),
    oppositeFace(["A", "B", "C", "D", "E", "F"], "E"),
    oppositeFace(["P", "Q", "R", "S", "T", "U"], "S"),
    oppositeFace(["P", "Q", "R", "S", "T", "U"], "U"),
    cubeNet([NET_T, NET_FIVE, NET_SEVEN]),
    vf("Il existe plusieurs patrons différents pour un même cube.", true, "on peut placer les 6 carrés de plusieurs façons."),
    fact("Quand on plie un patron de cube, combien de faces touchent la face du dessous ?", ["2", "*4", "5"], "les quatre faces des côtés."),
  ]),
  nets(3, "le patron du pavé droit (1)", [
    fact("Combien de faces a un pavé droit ?", ["4", "*6", "8"], "comme le cube, il a 6 faces."),
    fact("Les faces d’un pavé droit sont…", ["*des rectangles (parfois deux carrés)", "des triangles", "des cercles"], "6 rectangles, ou 4 rectangles et 2 carrés."),
    vf("Dans un pavé droit, les faces de même forme et de même taille sont opposées.", true, "le dessus et le dessous sont pareils."),
    fact("Combien de faces pareilles y a-t-il au moins par paire dans un pavé droit ?", ["1", "*2", "3"], "les faces vont par paires opposées."),
    fact("Quel objet a la forme d’un pavé droit ?", ["une boîte de conserve", "*un carton de lait", "un ballon"], "le carton a des faces rectangulaires."),
    vf("Un patron de pavé droit a 6 faces.", true, "une par face du pavé."),
    fact("Combien d’arêtes a un pavé droit ?", ["8", "*12", "6"], "comme le cube : 12 arêtes."),
    fact("Combien de sommets a un pavé droit ?", ["*8", "6", "12"], "4 en haut et 4 en bas."),
  ]),
  nets(4, "le patron du pavé droit (2)", [
    vf("On peut recomposer un pavé droit de plusieurs façons.", true, "il existe plusieurs patrons."),
    fact("Le dessus d’une boîte de 6 cm de long et 4 cm de large est un rectangle. Quel est son périmètre ?", ["10 cm", "*20 cm", "24 cm"], "(6 + 4) × 2 = 20 cm."),
    perimeter({ kind: "rectangle", long: 6, wide: 4 }, "cm"),
    perimeter({ kind: "rectangle", long: 9, wide: 3 }, "cm"),
    fact("Dans un patron de pavé droit, combien de faces sont pareilles à la face du dessus ?", ["0", "*1", "3"], "la face du dessous, qui lui est opposée."),
    vf("Un cube est un pavé droit particulier.", true, "toutes ses faces sont des carrés."),
    fact("Une boîte de craies a la forme d’un pavé droit. Combien de faces rectangulaires a-t-elle s’il n’y a pas de carré ?", ["4", "*6", "2"], "toutes ses faces sont des rectangles."),
    cubeNet([NET_ZIGZAG, NET_SEVEN]),
  ]),
  nets(5, "le patron du cylindre (1)", [
    fact("Un cylindre a combien de faces planes en forme de cercle ?", ["1", "*2", "3"], "un cercle à chaque bout."),
    fact("La face qui fait le tour du cylindre est…", ["plane", "*courbe", "triangulaire"], "elle s’enroule autour du cylindre."),
    fact("Dans le patron d’un cylindre, la face courbe dépliée devient…", ["*un rectangle", "un triangle", "un carré toujours"], "on la déroule à plat."),
    vf("Les deux cercles d’un cylindre sont parallèles et superposables.", true, "ils ont la même taille et se font face."),
    circleCalc("rayon", 4),
    fact("Quel objet a la forme d’un cylindre ?", ["un dé", "*une boîte de lait", "une brique"], "elle a deux bouts ronds et une face courbe."),
    circleCalc("diamètre", 10),
    vf("Un cylindre peut rouler.", true, "grâce à sa face courbe."),
  ]),
  nets(6, "le patron du cylindre (2)", [
    fact("Le patron d’un cylindre comprend…", ["*2 cercles et 1 rectangle", "6 carrés", "3 triangles"], "les deux bases et la face courbe dépliée."),
    fact("La hauteur du rectangle du patron est…", ["*la hauteur du cylindre", "le rayon du cercle", "le diamètre du cercle"], "le rectangle s’enroule sur toute la hauteur."),
    circleCalc("diamètre", 12),
    circleCalc("rayon", 8),
    vf("Les deux cercles d’un patron de cylindre ont le même diamètre.", true, "ils ferment les deux bouts du même tube."),
    fact("Si on enroule un rectangle et qu’on ferme les bouts avec deux cercles, on obtient…", ["un cube", "*un cylindre", "un pavé droit"], "c’est le patron du cylindre."),
    vf("Un patron de cylindre contient un triangle.", false, "il contient deux cercles et un rectangle."),
    circleCalc("rayon", 2),
  ]),
  nets(7, "révision", [
    cubeNet([NET_SEVEN, NET_FIVE, NET_CROSS]),
    oppositeFace(["A", "B", "C", "D", "E", "F"], "C"),
    oppositeFace(["A", "B", "C", "D", "E", "F"], "D"),
    fact("Quel solide a pour patron 2 cercles et 1 rectangle ?", ["le cube", "le pavé droit", "*le cylindre"], "les cercles sont les bases."),
    fact("Quel solide a 6 faces carrées ?", ["*le cube", "le pavé droit", "le cylindre"], "toutes ses faces sont des carrés égaux."),
    circleCalc("diamètre", 16),
    vf("Un pavé droit a 8 sommets.", true, "4 en haut et 4 en bas."),
    fact("Combien d’arêtes a un cube ?", ["8", "*12", "6"], "un cube a 12 arêtes."),
  ]),
  nets(8, "activités d’intégration", [
    ctx("Pour sécher la peau du mouton, Amadou veut défaire un carton qui a la forme d’un pavé droit.", fact("Combien de faces aura le carton déplié ?", ["4", "*6", "8"], "un pavé droit a 6 faces.")),
    ctx("Le carton d’Amadou mesure 50 cm de long et 30 cm de large sur le dessus.", perimeter({ kind: "rectangle", long: 50, wide: 30 }, "cm")),
    ctx("Khady fabrique une boîte en forme de cube pour ses perles.", cubeNet([NET_FIVE, NET_T, NET_SEVEN])),
    ctx("Khady colle une lettre sur chaque face de son patron.", oppositeFace(["K", "H", "A", "D", "Y", "S"], "H")),
    ctx("Modou fabrique une tirelire en forme de cylindre ; son couvercle est un cercle de 8 cm de diamètre.", circleCalc("diamètre", 8)),
    fact("Quel patron faut-il pour fabriquer une boîte de lait cylindrique ?", ["6 carrés", "*2 cercles et 1 rectangle", "4 triangles"], "c’est le patron du cylindre."),
    vf("Avant de plier un patron, on le découpe en suivant son contour.", true, "puis on plie le long des arêtes."),
    fact("Combien de faces carrées a la boîte de Khady ?", ["4", "5", "*6"], "un cube a 6 faces carrées."),
  ]),
];
