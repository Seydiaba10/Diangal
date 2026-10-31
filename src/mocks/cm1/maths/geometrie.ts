import "server-only";

// CM1, géométrie : une série DIANGAL par page du cahier de l'école. Quatre chapitres : droites et
// angles ; figures planes (carré, rectangle, triangle, parallélogramme, cercle) ; solides (cube, pavé
// droit, cylindre et leurs patrons) ; symétrie et translation. Le cahier fait construire ; ici l'élève
// reconnaît, mesure et calcule sur le même genre de dessin.

import { cubeNet } from "../../early-math";
import type { ExerciseSeries, ExerciseSpec } from "../../exercise-series";
import { sideOf, whichFigure } from "../../geometry";
import { fact } from "../../measure";
import { angleKinds, circleCalc, circlePerimeter, linePairs, oppositeFace, perimeter, symmetricDot, thirdAngle, translation, triangleKind, whichDirection } from "../../upper-math";
import { seriesOf } from "../../cp/maths/helpers";
import { ctx } from "../../ci/maths/ensembles";

const vf = (statement: string, answer: boolean, why: string): ExerciseSpec => ({ vf: statement, answer, why: `<strong>${answer ? "Vrai" : "Faux"}</strong> : ${why}` });
const sq = (w: number) => ({ kind: "carré" as const, w });
const rect = (w: number, h: number) => ({ kind: "rectangle" as const, w, h });
const tri = (w: number, h: number) => ({ kind: "triangle" as const, w, h });
const round = (w: number) => ({ kind: "rond" as const, w });
const NET_CROSS: [number, number][] = [[1, 0], [0, 1], [1, 1], [2, 1], [1, 2], [1, 3]];
const NET_T: [number, number][] = [[0, 0], [1, 0], [2, 0], [1, 1], [1, 2], [1, 3]];
const NET_ZIGZAG: [number, number][] = [[0, 0], [0, 1], [1, 1], [2, 1], [3, 1], [3, 2]];
const NET_FIVE: [number, number][] = [[1, 0], [0, 1], [1, 1], [2, 1], [1, 2]];
const NET_SEVEN: [number, number][] = [[1, 0], [0, 1], [1, 1], [2, 1], [3, 1], [1, 2], [1, 3]];

const lines = seriesOf("Droites et angles");

export const LINES_CM1: ExerciseSeries[] = [
  lines(1, "droites sécantes et perpendiculaires", [
    linePairs(["sécantes", "perpendiculaires", "parallèles"], "perpendiculaires"),
    linePairs(["perpendiculaires", "parallèles", "sécantes"], "sécantes"),
    linePairs(["parallèles", "sécantes", "perpendiculaires"], "perpendiculaires"),
    fact("Pour tracer une perpendiculaire à une droite passant par un point, on utilise…", ["*l’équerre et la règle", "le rapporteur seul", "la gomme"], "l’angle droit de l’équerre donne la perpendiculaire."),
    vf("Deux droites perpendiculaires forment quatre angles droits.", true, "elles se coupent à angle droit."),
    vf("Deux droites sécantes sont toujours perpendiculaires.", false, "elles peuvent se couper sans former d’angle droit."),
    whichDirection(["oblique", "verticale", "horizontale"], "verticale"),
    angleKinds([90, 50, 120], "droit"),
  ]),
  lines(2, "droites parallèles", [
    linePairs(["parallèles", "sécantes", "perpendiculaires"], "parallèles"),
    linePairs(["sécantes", "perpendiculaires", "parallèles"], "parallèles"),
    vf("Deux droites parallèles gardent toujours le même écart.", true, "elles ne se croisent jamais."),
    vf("Deux droites perpendiculaires à une même droite sont parallèles entre elles.", true, "elles ont la même direction."),
    fact("Les rails d’un chemin de fer sont…", ["sécants", "*parallèles", "perpendiculaires"], "ils gardent toujours le même écart."),
    fact("Quels côtés d’un rectangle sont parallèles ?", ["*les côtés opposés", "les côtés voisins", "aucun"], "les longueurs entre elles, les largeurs entre elles."),
    linePairs(["perpendiculaires", "parallèles", "sécantes"], "parallèles"),
    whichDirection(["horizontale", "oblique", "verticale"], "oblique"),
  ]),
  lines(3, "angle droit, angle obtus, angle aigu", [
    angleKinds([30, 90, 150], "aigu"),
    angleKinds([30, 90, 150], "obtus"),
    angleKinds([75, 135, 90], "droit"),
    fact("Un angle de 135° est…", ["aigu", "droit", "*obtus"], "135° > 90°."),
    fact("Un angle de 60° est…", ["*aigu", "droit", "obtus"], "60° < 90°."),
    thirdAngle(60, 70),
    thirdAngle(90, 35),
    fact("Avec quel outil mesure-t-on un angle ?", ["la règle", "*le rapporteur", "le compas"], "le rapporteur est gradué en degrés."),
  ]),
  lines(4, "révision", [
    linePairs(["sécantes", "parallèles", "perpendiculaires"], "sécantes"),
    whichDirection(["verticale", "horizontale", "oblique"], "horizontale"),
    angleKinds([100, 90, 20], "aigu"),
    angleKinds([45, 160, 90], "obtus"),
    thirdAngle(50, 50),
    vf("La somme des angles d’un triangle est 180°.", true, "on peut le vérifier avec le rapporteur."),
    fact("Un angle plat mesure…", ["90°", "*180°", "360°"], "ses deux côtés forment une ligne droite."),
    thirdAngle(45, 45),
  ]),
  lines(5, "activités d’intégration", [
    ctx("Le dimanche, la famille de Moussa va chez son cousin. Deux routes se croisent à angle droit au carrefour.", linePairs(["perpendiculaires", "parallèles", "sécantes"], "perpendiculaires")),
    ctx("La route de la plage et celle du marché ne se croisent jamais.", linePairs(["sécantes", "parallèles", "perpendiculaires"], "parallèles")),
    ctx("Au carrefour, l’angle entre deux routes mesure 120°.", fact("Quel est cet angle ?", ["aigu", "droit", "*obtus"], "120° est plus grand que 90°.")),
    ctx("Le terrain du cousin est un triangle ; deux de ses angles mesurent 80° et 40°.", thirdAngle(80, 40)),
    angleKinds([90, 120, 40], "obtus"),
    whichDirection(["oblique", "horizontale", "verticale"], "horizontale"),
    vf("Les murs d’une maison sont perpendiculaires au sol.", true, "ils sont verticaux et le sol est horizontal."),
    fact("Un poteau électrique bien planté est…", ["*vertical", "horizontal", "oblique"], "il est droit, perpendiculaire au sol."),
  ]),
];

const figures = seriesOf("Les figures planes");

export const FIGURES_CM1: ExerciseSeries[] = [
  figures(1, "le carré", [
    whichFigure([rect(5, 3), sq(4), tri(4, 3)], "carré"),
    sideOf(sq(5), "côté"),
    perimeter({ kind: "carré", side: 7 }, "cm"),
    fact("Les diagonales d’un carré sont…", ["*égales et perpendiculaires", "parallèles", "de longueurs différentes"], "elles se coupent en leur milieu à angle droit."),
    vf("Un carré a quatre côtés égaux et quatre angles droits.", true, "c’est sa définition."),
    vf("On peut construire un carré connaissant seulement sa diagonale, avec le compas et la règle.", true, "les diagonales sont égales, perpendiculaires et se coupent en leur milieu."),
    fact("Combien d’axes de symétrie a un carré ?", ["2", "*4", "1"], "deux médianes et deux diagonales."),
    perimeter({ kind: "carré", side: 12 }, "m"),
  ]),
  figures(2, "le rectangle", [
    whichFigure([sq(3), rect(6, 3), round(3)], "rectangle"),
    sideOf(rect(7, 3), "grand côté"),
    perimeter({ kind: "rectangle", long: 4, wide: 3 }, "cm"),
    fact("Les diagonales d’un rectangle sont…", ["*égales", "perpendiculaires toujours", "de longueurs différentes"], "elles ont la même longueur et se coupent en leur milieu."),
    vf("Un rectangle a ses côtés opposés égaux et parallèles.", true, "deux longueurs et deux largeurs."),
    vf("Les quatre angles d’un rectangle sont droits.", true, "comme ceux du carré."),
    perimeter({ kind: "rectangle", long: 15, wide: 9 }, "m"),
    fact("Combien d’axes de symétrie a un rectangle qui n’est pas un carré ?", ["*2", "4", "0"], "ses deux médianes."),
  ]),
  figures(3, "le triangle", [
    triangleKind([4, 3, 3]),
    triangleKind([6, 6, 6]),
    triangleKind([5, 6, 7]),
    thirdAngle(60, 60),
    thirdAngle(90, 45),
    vf("Avec le compas et la règle, on construit un triangle dont on connaît les trois côtés.", true, "on reporte deux longueurs avec le compas."),
    perimeter({ kind: "triangle", sides: [4, 3, 3] }, "cm"),
    fact("Un triangle qui a un angle droit s’appelle…", ["équilatéral", "*rectangle", "isocèle"], "triangle rectangle."),
  ]),
  figures(4, "le parallélogramme", [
    fact("Un parallélogramme a…", ["*ses côtés opposés parallèles et égaux", "quatre angles droits toujours", "trois côtés"], "c’est ce qui le définit."),
    fact("Quelle figure est un parallélogramme particulier qui a quatre angles droits ?", ["le triangle", "*le rectangle", "le cercle"], "le rectangle est un parallélogramme à angles droits."),
    vf("Les diagonales d’un parallélogramme se coupent en leur milieu.", true, "c’est une propriété du parallélogramme."),
    vf("Un parallélogramme a toujours quatre angles droits.", false, "seulement s’il est un rectangle."),
    fact("Un parallélogramme a des côtés de 5 cm et 3 cm. Quel est son périmètre ?", ["8 cm", "*16 cm", "15 cm"], "(5 + 3) × 2 = 16 cm."),
    perimeter({ kind: "rectangle", long: 5, wide: 3 }, "cm"),
    fact("Combien de côtés a un parallélogramme ?", ["3", "*4", "6"], "c’est un quadrilatère."),
    linePairs(["sécantes", "parallèles", "perpendiculaires"], "parallèles"),
  ]),
  figures(5, "le cercle", [
    circleCalc("rayon", 4),
    circleCalc("diamètre", 18),
    circleCalc("rayon", 7.5),
    circlePerimeter("diamètre", 10, "cm"),
    fact("Le segment qui relie deux points du cercle en passant par le centre est…", ["le rayon", "*le diamètre", "la corde"], "il traverse le cercle par son centre."),
    vf("Diamètre = rayon × 2.", true, "le diamètre contient deux rayons."),
    circleCalc("diamètre", 25),
    fact("Pour tracer un cercle de 3 cm de rayon, on écarte le compas de…", ["*3 cm", "6 cm", "1,5 cm"], "l’écart du compas est le rayon."),
  ]),
  figures(6, "révision", [
    whichFigure([tri(4, 3), rect(5, 2), sq(3)], "carré"),
    triangleKind([5, 5, 7]),
    circleCalc("rayon", 6),
    perimeter({ kind: "rectangle", long: 8, wide: 5 }, "cm"),
    fact("Quelle figure a quatre côtés égaux et quatre angles droits ?", ["*le carré", "le parallélogramme", "le triangle"], "c’est le carré."),
    thirdAngle(30, 60),
    vf("Un carré est aussi un rectangle et un parallélogramme.", true, "il en a toutes les propriétés."),
    sideOf(sq(6), "côté"),
  ]),
  figures(7, "activités d’intégration", [
    ctx("Pour la semaine de l’école de base, ta classe décore son stand avec des figures.", whichFigure([round(3), tri(4, 3), rect(5, 2)], "triangle")),
    ctx("Le stand est un carré de 4 m de côté.", perimeter({ kind: "carré", side: 4 }, "m")),
    ctx("Une affiche rectangulaire mesure 80 cm sur 60 cm.", perimeter({ kind: "rectangle", long: 80, wide: 60 }, "cm")),
    ctx("Un dessin circulaire a un rayon de 15 cm.", circleCalc("rayon", 15)),
    ctx("Le petit fanion du stand est un triangle.", triangleKind([3, 3, 2])),
    thirdAngle(70, 70),
    vf("Pour reproduire exactement une figure, on mesure ses côtés et ses angles.", true, "on utilise la règle, l’équerre et le rapporteur."),
    circlePerimeter("rayon", 15, "cm"),
  ]),
];

const solids = seriesOf("Les solides");

export const SOLIDS_CM1: ExerciseSeries[] = [
  solids(1, "le cube (1)", [
    cubeNet([NET_FIVE, NET_CROSS, NET_SEVEN]),
    cubeNet([NET_T, NET_SEVEN]),
    cubeNet([NET_SEVEN, NET_FIVE, NET_ZIGZAG]),
    fact("Un patron du cube est formé de…", ["4 carrés", "*6 carrés", "6 rectangles"], "une face carrée par face du cube."),
    vf("Le patron d’un cube est le dessin à plat du cube.", true, "on le plie pour obtenir le cube."),
    fact("Combien d’arêtes a un cube ?", ["8", "*12", "6"], "4 + 4 + 4 = 12."),
    fact("Combien de sommets a un cube ?", ["*8", "6", "12"], "4 en haut, 4 en bas."),
    cubeNet([NET_FIVE, NET_ZIGZAG]),
  ]),
  solids(2, "le cube (2)", [
    oppositeFace(["F", "G", "H", "I", "J", "K"], "F"),
    oppositeFace(["F", "G", "H", "I", "J", "K"], "J"),
    oppositeFace(["F", "G", "H", "I", "J", "K"], "I"),
    oppositeFace(["A", "B", "C", "D", "E", "F"], "B"),
    fact("Comment s’appelle le segment où deux faces d’un cube se rejoignent ?", ["un sommet", "*une arête", "une face"], "l’arête est le bord commun de deux faces."),
    fact("Comment s’appelle le point où trois arêtes se rejoignent ?", ["*un sommet", "une face", "un patron"], "le cube a 8 sommets."),
    vf("Les faces opposées d’un cube sont parallèles.", true, "le dessus et le dessous, par exemple."),
    oppositeFace(["A", "B", "C", "D", "E", "F"], "F"),
  ]),
  solids(3, "le pavé droit (1)", [
    fact("Le pavé droit est composé de…", ["*6 faces rectangulaires (ou 4 rectangles et 2 carrés)", "6 carrés toujours", "2 cercles et un rectangle"], "ses faces sont des rectangles."),
    fact("Combien d’arêtes a un pavé droit ?", ["8", "*12", "6"], "comme le cube."),
    fact("Combien de sommets a un pavé droit ?", ["*8", "12", "6"], "comme le cube."),
    vf("Les faces de même forme et de même dimension sont opposées dans le pavé droit.", true, "elles vont par paires."),
    fact("Quel objet a la forme d’un pavé droit ?", ["un ballon", "*une boîte de sucre", "une boîte de conserve"], "ses faces sont rectangulaires."),
    perimeter({ kind: "rectangle", long: 8, wide: 5 }, "cm"),
    vf("Un cube est un pavé droit dont toutes les faces sont des carrés.", true, "c’est un pavé droit particulier."),
    fact("Combien de paires de faces opposées a un pavé droit ?", ["2", "*3", "6"], "dessus-dessous, devant-derrière, gauche-droite."),
  ]),
  solids(4, "le pavé droit (2)", [
    fact("Dans le pavé ABCDEFGH (dessus ABCD, dessous EFGH), quelle face est parallèle à ABCD ?", ["ABFE", "*EFGH", "BCGF"], "le dessus et le dessous sont opposés."),
    fact("Combien de faces d’un pavé droit touchent la face du dessous ?", ["2", "3", "*4"], "les quatre faces latérales."),
    vf("Un pavé droit peut avoir deux faces carrées.", true, "par exemple une boîte de craies allongée."),
    fact("Un patron de pavé droit a combien de faces ?", ["4", "5", "*6"], "une par face du pavé."),
    perimeter({ kind: "rectangle", long: 12, wide: 4 }, "cm"),
    perimeter({ kind: "carré", side: 4 }, "cm"),
    vf("Il existe plusieurs façons de dessiner le patron d’un même pavé droit.", true, "on peut placer les faces de plusieurs manières."),
    fact("Les arêtes d’un pavé droit qui partent d’un même sommet sont…", ["parallèles", "*perpendiculaires", "égales toujours"], "elles forment des angles droits."),
  ]),
  solids(5, "le cylindre (1)", [
    fact("Le patron d’un cylindre comprend…", ["6 carrés", "*2 cercles et 1 rectangle", "3 triangles"], "deux bases rondes et la face courbe déroulée."),
    fact("Quelle est la hauteur du cylindre sur son patron ?", ["*la largeur du rectangle", "le rayon du cercle", "le périmètre du cercle"], "le rectangle s’enroule sur toute la hauteur."),
    circleCalc("rayon", 5),
    circleCalc("diamètre", 8),
    vf("Les deux bases d’un cylindre sont des cercles parallèles et superposables.", true, "elles ont la même taille."),
    fact("Quel objet a la forme d’un cylindre ?", ["*un tuyau", "un dé", "une brique"], "il est long et rond."),
    circlePerimeter("diamètre", 6, "cm"),
    vf("Un cylindre a des sommets comme un cube.", false, "il n’a pas de sommet."),
  ]),
  solids(6, "le cylindre (2)", [
    fact("Sur le patron du cylindre, la longueur du rectangle est égale…", ["au rayon du cercle", "*au périmètre du cercle", "à la hauteur"], "le rectangle fait tout le tour du cercle."),
    circlePerimeter("diamètre", 3, "cm"),
    circlePerimeter("rayon", 5, "cm"),
    circlePerimeter("diamètre", 20, "cm"),
    circlePerimeter("rayon", 2, "dm"),
    vf("Pour une boîte de diamètre 10 cm, le rectangle du patron mesure 31,4 cm de long.", true, "10 × 3,14 = 31,4 cm."),
    circleCalc("diamètre", 14),
    fact("Si on enroule un rectangle et qu’on ferme avec deux cercles, on obtient…", ["un cube", "*un cylindre", "un pavé droit"], "c’est le patron du cylindre."),
  ]),
  solids(7, "révision", [
    cubeNet([NET_SEVEN, NET_CROSS]),
    oppositeFace(["P", "Q", "R", "S", "T", "U"], "R"),
    circlePerimeter("diamètre", 12, "cm"),
    fact("Quel solide a 6 faces, 12 arêtes et 8 sommets, avec des faces rectangulaires ?", ["le cube", "*le pavé droit", "le cylindre"], "ses faces ne sont pas toutes des carrés."),
    fact("Quel solide n’a ni arête droite ni sommet ?", ["le cube", "le pavé droit", "*le cylindre"], "il a deux bords ronds."),
    vf("Un cube a 6 faces carrées égales.", true, "toutes ses faces sont pareilles."),
    circleCalc("rayon", 9),
    oppositeFace(["P", "Q", "R", "S", "T", "U"], "T"),
  ]),
  solids(8, "activités d’intégration", [
    ctx("Ta classe prépare un jeu de construction de solides. Le maître te demande un patron de cube.", cubeNet([NET_FIVE, NET_T, NET_SEVEN])),
    ctx("Tu écris une lettre sur chaque face du patron.", oppositeFace(["M", "A", "T", "H", "S", "O"], "A")),
    ctx("Pour le cylindre, le cercle de base a 7 cm de diamètre.", circlePerimeter("diamètre", 7, "cm")),
    ctx("La boîte en pavé droit a une face du dessus de 20 cm sur 15 cm.", perimeter({ kind: "rectangle", long: 20, wide: 15 }, "cm")),
    fact("Combien de carrés de carton faut-il pour fabriquer 3 cubes ?", ["12", "*18", "24"], "6 carrés par cube : 6 × 3 = 18."),
    vf("Avant de plier un patron, on prévoit des languettes pour le coller.", true, "elles servent à assembler les faces."),
    circleCalc("diamètre", 7),
    fact("Combien d’arêtes ont 2 cubes en tout ?", ["12", "*24", "16"], "12 arêtes par cube."),
  ]),
];

const sym = seriesOf("Symétrie et translation");

export const SYMMETRY_CM1: ExerciseSeries[] = [
  sym(1, "figures symétriques et axe de symétrie (1)", [
    symmetricDot(1, 2, [[1, 8], [1, 7], [2, 8]]),
    symmetricDot(3, 3, [[3, 7], [3, 6], [2, 7]]),
    symmetricDot(4, 0, [[4, 10], [4, 9], [3, 10]]),
    fact("Quelle lettre a un axe de symétrie vertical ?", ["*T", "R", "S"], "si on plie le T au milieu, les deux moitiés se superposent."),
    fact("Quelle figure n’a pas d’axe de symétrie ?", ["le carré", "le cercle", "*la lettre F"], "aucun pliage ne superpose ses deux moitiés."),
    vf("Deux points symétriques sont à la même distance de l’axe.", true, "l’axe est juste au milieu."),
    symmetricDot(0, 1, [[0, 9], [0, 8], [1, 9]]),
    fact("Combien d’axes de symétrie a un triangle équilatéral ?", ["1", "*3", "0"], "un par sommet."),
  ]),
  sym(2, "figures symétriques et axe de symétrie (2)", [
    symmetricDot(2, 4, [[2, 6], [2, 7], [3, 6]]),
    symmetricDot(5, 2, [[5, 8], [4, 8], [5, 7]]),
    symmetricDot(2, 1, [[2, 9], [3, 9], [2, 8]]),
    fact("Combien d’axes de symétrie a un triangle isocèle (non équilatéral) ?", ["*1", "2", "3"], "l’axe passe par le sommet principal."),
    fact("Quelle lettre a un axe de symétrie horizontal ?", ["*E", "G", "L"], "le haut et le bas du E se superposent."),
    vf("Le symétrique d’une figure a la même forme et la même taille.", true, "seul le sens change, comme dans un miroir."),
    symmetricDot(3, 0, [[3, 10], [3, 9], [2, 10]]),
    fact("Combien d’axes de symétrie a un cercle ?", ["1", "4", "*une infinité"], "chaque diamètre est un axe."),
  ]),
  sym(3, "la translation (1)", [
    translation(4, 0, "droite"),
    translation(6, 0, "droite"),
    translation(3, 2, "droite"),
    translation(3, 2, "bas"),
    vf("Une translation déplace une figure sans changer sa forme ni sa taille.", true, "elle glisse, sans tourner."),
    vf("Dans une translation, la figure tourne.", false, "elle glisse sans rotation."),
    translation(5, 1, "bas"),
    fact("Après une translation, la figure est…", ["*identique, mais à une autre place", "plus grande", "retournée"], "elle a seulement glissé."),
  ]),
  sym(4, "la translation (2)", [
    translation(7, 0, "droite"),
    translation(2, 3, "bas"),
    translation(8, 2, "droite"),
    translation(4, 1, "bas"),
    translation(6, 3, "droite"),
    vf("Tous les points d’une figure glissent de la même façon dans une translation.", true, "même direction, même nombre de carreaux."),
    fact("Un point A glisse de 3 carreaux vers la droite. Son image B est…", ["*3 carreaux à droite de A", "3 carreaux à gauche de A", "au même endroit"], "on compte 3 carreaux vers la droite."),
    translation(5, 2, "bas"),
  ]),
  sym(5, "révision", [
    symmetricDot(1, 4, [[1, 6], [1, 7], [0, 6]]),
    symmetricDot(4, 3, [[4, 7], [3, 7], [4, 8]]),
    translation(5, 0, "droite"),
    translation(2, 2, "bas"),
    fact("Quelle figure a exactement 2 axes de symétrie ?", ["le carré", "*le rectangle", "le cercle"], "ses deux médianes."),
    vf("Dans une symétrie, la figure est retournée comme dans un miroir.", true, "ce n’est pas une translation."),
    fact("Quelle lettre a un axe de symétrie vertical ?", ["*V", "Z", "N"], "le V se plie en deux moitiés pareilles."),
    translation(9, 1, "droite"),
  ]),
  sym(6, "activités d’intégration", [
    ctx("Fatou aime le motif des carreaux de sol de la maison de son amie : un motif se répète en glissant.", translation(4, 0, "droite")),
    ctx("Le motif glisse aussi vers le bas, ligne après ligne.", translation(0, 2, "bas")),
    ctx("Chaque carreau a un axe de symétrie vertical.", symmetricDot(2, 2, [[2, 8], [2, 7], [1, 8]])),
    fact("Un carreau carré de 30 cm de côté a un périmètre de…", ["60 cm", "*120 cm", "900 cm"], "30 × 4 = 120 cm."),
    perimeter({ kind: "carré", side: 30 }, "cm"),
    vf("Le motif d’un pagne qui se répète en glissant est une translation.", true, "le dessin glisse sans tourner."),
    fact("Combien d’axes de symétrie a un carreau carré ?", ["2", "*4", "1"], "deux médianes et deux diagonales."),
    symmetricDot(3, 1, [[3, 9], [3, 8], [2, 9]]),
  ]),
];
