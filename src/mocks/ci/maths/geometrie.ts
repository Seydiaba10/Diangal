import "server-only";

// CI, géométrie : une série DIANGAL par leçon du cahier de l'école. Quatre chapitres : se repérer
// dans l'espace, les solides (et leurs patrons), les figures planes, les lignes et les quadrillages.
// Le cahier fait relever une lettre, tracer ou reproduire ; ici l'élève observe le même genre de
// dessin et choisit la réponse, calculée à partir des données du dessin.

import { besideOf, cubeNet, faceOf, inQueue, levels, race, whichSolid, type Solid } from "../../early-math";
import type { ExerciseSeries, ExerciseSpec } from "../../exercise-series";
import {
  cellCount,
  cellOf,
  countCatParts,
  insideOrOutside,
  joinDots,
  lineOrColumn,
  nextShape,
  onRoute,
  routeEnd,
  routeLength,
  sideOf,
  whichFigure,
  whichLine,
  whichNode,
  type GridItem,
} from "../../geometry";
import { fact, nearOrFar } from "../../measure";
import { seriesOf } from "../../cp/maths/helpers";
import { ctx } from "./ensembles";

const vf = (statement: string, answer: boolean, why: string): ExerciseSpec => ({ vf: statement, answer, why: `<strong>${answer ? "Vrai" : "Faux"}</strong> : ${why}` });

// ── Se repérer dans l'espace ────────────────────────────────────────────────

const space = seriesOf("Se repérer dans l’espace");
const Q1: [string, "fille" | "garçon"][] = [["Awa", "fille"], ["Modou", "garçon"], ["Fatou", "fille"], ["Ibou", "garçon"]];
const Q2: [string, "fille" | "garçon"][] = [["Samba", "garçon"], ["Khady", "fille"], ["Ali", "garçon"], ["Binta", "fille"], ["Lamine", "garçon"]];
const Q3: [string, "fille" | "garçon"][] = [["Rama", "fille"], ["Cheikh", "garçon"], ["Ndèye", "fille"]];
const S1: [number, number][] = [[120, 40], [250, 120], [180, 150]];
const S2: [number, number][] = [[260, 40], [100, 120], [190, 90]];
const S3: [number, number][] = [[150, 150], [230, 50], [90, 30]];

export const SPACE_CI: ExerciseSeries[] = [
  space(1, "à droite, à gauche (1)", [
    besideOf(["mangue", "ballon", "cahier"], "ballon", "droite"),
    besideOf(["mangue", "ballon", "cahier"], "ballon", "gauche"),
    besideOf(["orange", "crayon", "bonbon", "banane"], "bonbon", "gauche"),
    besideOf(["orange", "crayon", "bonbon", "banane"], "crayon", "gauche"),
    besideOf(["cahier", "pasteque", "ballon"], "cahier", "droite"),
    besideOf(["banane", "bonbon", "mangue", "crayon"], "mangue", "droite"),
    fact("Awa est face à toi et lève sa main droite. De quel côté vois-tu cette main ?", ["*à ta gauche", "à ta droite"], "quand une personne est face à toi, sa droite est de ton côté gauche."),
    vf("Quand je regarde le dessin, la gauche est du côté où je commence à lire.", true, "on lit de la gauche vers la droite."),
  ]),
  space(2, "devant, derrière (1)", [
    inQueue(Q1, "Modou", "devant"),
    inQueue(Q1, "Modou", "derrière"),
    inQueue(Q1, "Fatou", "devant"),
    inQueue(Q2, "Ali", "derrière"),
    inQueue(Q2, "Khady", "devant"),
    inQueue(Q2, "Binta", "devant"),
    vf("Dans une file qui marche vers l’école, le premier est devant tous les autres.", true, "il est le plus près de l’école."),
    vf("Si Awa est devant Modou, alors Modou est derrière Awa.", true, "devant et derrière se répondent."),
  ]),
  space(3, "à droite, à gauche (2)", [
    besideOf(["ballon", "orange", "cahier", "bonbon"], "cahier", "gauche"),
    besideOf(["ballon", "orange", "cahier", "bonbon"], "orange", "droite"),
    besideOf(["crayon", "mangue", "banane"], "banane", "gauche"),
    besideOf(["pasteque", "crayon", "orange", "ballon"], "pasteque", "droite"),
    besideOf(["pasteque", "crayon", "orange", "ballon"], "ballon", "gauche"),
    besideOf(["bonbon", "cahier", "mangue"], "cahier", "droite"),
    fact("Le ballon est à ta gauche, la mangue à ta droite. Où est le ballon par rapport à la mangue ?", ["*à gauche de la mangue", "à droite de la mangue"], "ce qui est à ta gauche est à gauche de ce qui est à ta droite."),
    vf("La droite et la gauche dépendent de l’endroit d’où l’on regarde.", true, "face à toi, ta droite et celle de ton camarade sont inversées."),
  ]),
  space(4, "devant, derrière (2)", [
    inQueue(Q2, "Lamine", "derrière"),
    inQueue(Q2, "Samba", "devant"),
    inQueue(Q3, "Cheikh", "devant"),
    inQueue(Q3, "Cheikh", "derrière"),
    inQueue(Q1, "Ibou", "derrière"),
    inQueue(Q1, "Awa", "devant"),
    fact("Dans la file, Rama est la dernière. Qui est derrière Rama ?", ["*personne", "tout le monde"], "la dernière de la file n’a personne derrière elle."),
    vf("Le dernier de la file est devant tous les autres.", false, "le dernier est derrière tous les autres."),
  ]),
  space(5, "près, loin", [
    nearOrFar("eleve-garcon", "le garçon", S1, "ballon", "le plus près"),
    nearOrFar("eleve-garcon", "le garçon", S1, "ballon", "le plus loin"),
    nearOrFar("eleve-fille", "la fille", S2, "bonbon", "le plus près"),
    nearOrFar("eleve-fille", "la fille", S2, "bonbon", "le plus loin"),
    nearOrFar("pasteque", "la pastèque", S3, "mangue", "le plus près"),
    nearOrFar("pasteque", "la pastèque", S3, "mangue", "le plus loin"),
    vf("Ce qui est près de moi, je peux le toucher sans marcher longtemps.", true, "près veut dire à petite distance."),
    fact("Qu’est-ce qui est le plus loin de ta classe ?", ["la cour de l’école", "*la ville voisine", "ton banc"], "la ville voisine est à une grande distance."),
  ]),
  space(6, "sur, sous, en haut, en bas", [
    levels("table", ["pasteque", "cahier"], ["ballon"], "sous"),
    levels("table", ["orange"], ["bonbon", "crayon"], "sur"),
    levels("étagère", ["mangue"], ["cahier", "ballon"], "en haut"),
    levels("étagère", ["crayon", "banane"], ["bonbon"], "en bas"),
    levels("table", ["banane", "mangue"], ["cahier"], "sous"),
    levels("étagère", ["ballon"], ["orange", "pasteque"], "en haut"),
    levels("table", ["crayon"], ["pasteque", "ballon"], "sur"),
    levels("étagère", ["bonbon", "orange"], ["mangue"], "en bas"),
  ]),
  space(7, "avant, au même niveau, après", [
    race([["Awa", "fille", 6], ["Modou", "garçon", 3], ["Fatou", "fille", 4]], "avant"),
    race([["Awa", "fille", 6], ["Modou", "garçon", 3], ["Fatou", "fille", 4]], "après"),
    race([["Ibou", "garçon", 5], ["Khady", "fille", 2], ["Samba", "garçon", 5]], "même niveau"),
    race([["Binta", "fille", 2], ["Ali", "garçon", 7], ["Rama", "fille", 5]], "avant"),
    race([["Binta", "fille", 2], ["Ali", "garçon", 7], ["Rama", "fille", 5]], "après"),
    race([["Cheikh", "garçon", 4], ["Ndèye", "fille", 6], ["Lamine", "garçon", 6]], "même niveau"),
    vf("Celui qui est le plus près de l’arrivée arrivera avant les autres, s’ils courent aussi vite.", true, "il a moins de chemin à faire."),
    vf("Deux enfants au même niveau sont à la même distance de l’arrivée.", true, "ils sont côte à côte."),
  ]),
  space(8, "situer des objets", [
    besideOf(["cahier", "ballon", "orange"], "orange", "gauche"),
    levels("table", ["mangue"], ["cahier", "ballon"], "sur"),
    inQueue(Q3, "Ndèye", "derrière"),
    nearOrFar("eleve-fille", "la fille", S3, "ballon", "le plus près"),
    levels("étagère", ["pasteque", "crayon"], ["banane"], "en bas"),
    race([["Modou", "garçon", 3], ["Khady", "fille", 7], ["Ibou", "garçon", 3]], "même niveau"),
    besideOf(["bonbon", "banane", "crayon", "pasteque"], "banane", "droite"),
    inQueue(Q2, "Khady", "derrière"),
  ]),
  space(9, "révision", [
    besideOf(["mangue", "cahier", "ballon", "orange"], "ballon", "droite"),
    inQueue(Q1, "Fatou", "derrière"),
    nearOrFar("eleve-garcon", "le garçon", S2, "pasteque", "le plus loin"),
    levels("table", ["bonbon", "ballon"], ["crayon"], "sous"),
    levels("étagère", ["orange"], ["mangue", "bonbon"], "en haut"),
    race([["Rama", "fille", 1], ["Samba", "garçon", 4], ["Awa", "fille", 6]], "après"),
    race([["Rama", "fille", 1], ["Samba", "garçon", 4], ["Awa", "fille", 6]], "avant"),
    besideOf(["crayon", "pasteque", "bonbon"], "bonbon", "gauche"),
  ]),
  space(10, "activités d’intégration", [
    ctx("Aminata va au marché avec son papa. Sur l’étal du vendeur, les fruits sont rangés en rangée.", besideOf(["orange", "mangue", "pasteque", "banane"], "pasteque", "gauche")),
    ctx("Papa a garé la voiture près de l’arbre. Les enfants jouent autour.", nearOrFar("eleve-fille", "la fille", S1, "ballon", "le plus loin")),
    ctx("À la boutique, le vendeur range ses produits.", levels("étagère", ["pasteque"], ["bonbon", "crayon"], "en haut")),
    ctx("Le matin, les élèves de CI vont à l’école en file.", inQueue(Q2, "Ali", "devant")),
    ctx("À la récréation, les élèves font une course.", race([["Fatou", "fille", 5], ["Modou", "garçon", 2], ["Binta", "fille", 7]], "avant")),
    ctx("En classe, la maîtresse range le matériel.", levels("table", ["cahier", "crayon"], ["ballon"], "sous")),
    vf("Si le mouton est loin de la table du vendeur, il n’est pas près de la table.", true, "loin est le contraire de près."),
    vf("Quand je suis devant mon camarade dans la file, il me voit de dos.", true, "il est derrière moi, il voit mon dos."),
  ]),
];

// ── Les solides ─────────────────────────────────────────────────────────────

const solids = seriesOf("Les solides");
const NET_CROSS: [number, number][] = [[1, 0], [0, 1], [1, 1], [2, 1], [1, 2], [1, 3]];
const NET_T: [number, number][] = [[0, 0], [1, 0], [2, 0], [1, 1], [1, 2], [1, 3]];
const NET_ZIGZAG: [number, number][] = [[0, 0], [0, 1], [1, 1], [2, 1], [3, 1], [3, 2]];
const NET_FIVE: [number, number][] = [[1, 0], [0, 1], [1, 1], [2, 1], [1, 2]];
const NET_SEVEN: [number, number][] = [[1, 0], [0, 1], [1, 1], [2, 1], [3, 1], [1, 2], [1, 3]];
const s = (...k: Solid[]) => k;

export const SOLIDS_CI: ExerciseSeries[] = [
  solids(1, "le pavé droit et le cube (1)", [
    whichSolid(s("pavé droit", "cube"), "cube"),
    whichSolid(s("cube", "pavé droit"), "pavé droit"),
    fact("Quel objet a la forme d’un cube ?", ["*un dé", "une boîte d’allumettes", "une règle"], "le dé a six faces carrées pareilles."),
    fact("Quel objet a la forme d’un pavé droit ?", ["un ballon", "*une boîte d’allumettes", "une orange"], "la boîte d’allumettes a des faces rectangulaires."),
    whichSolid(s("pavé droit", "pavé droit", "cube"), "cube"),
    whichSolid(s("cube", "cube", "pavé droit"), "pavé droit"),
    fact("Quel objet a la forme d’un pavé droit ?", ["*une brique", "une bille", "une mangue"], "la brique a des faces rectangulaires."),
    fact("Quel objet a la forme d’un cube ?", ["un cahier", "*un morceau de sucre", "une banane"], "le morceau de sucre a des faces carrées."),
  ]),
  solids(2, "le pavé droit, le cube et le cylindre (1)", [
    whichSolid(s("cube", "cylindre", "pavé droit"), "cylindre"),
    whichSolid(s("cylindre", "pavé droit", "cube"), "cube"),
    whichSolid(s("pavé droit", "cube", "cylindre"), "pavé droit"),
    fact("Quel objet a la forme d’un cylindre ?", ["un dé", "*une boîte de tomate", "une brique"], "la boîte de tomate est ronde et longue : c’est un cylindre."),
    fact("Quel objet a la forme d’un cylindre ?", ["*un tuyau", "un cahier", "une boîte d’allumettes"], "le tuyau est un long cylindre."),
    fact("Quel objet a la forme d’un pavé droit ?", ["une boîte de lait en poudre", "*un carton de jus", "une bille"], "le carton de jus a des faces rectangulaires."),
    whichSolid(s("cylindre", "cube", "cylindre"), "cube"),
    whichSolid(s("pavé droit", "cylindre", "pavé droit"), "cylindre"),
  ]),
  solids(3, "la trace d’un pavé droit et d’un cube", [
    faceOf("pavé droit", "une boîte d’allumettes"),
    faceOf("cube", "un dé"),
    faceOf("pavé droit", "une brique"),
    faceOf("cube", "un morceau de sucre"),
    whichSolid(s("cube", "pavé droit", "cylindre"), "pavé droit"),
    whichSolid(s("pavé droit", "cylindre", "cube"), "cube"),
    vf("Le contour d’une face de cube est un carré.", true, "toutes les faces du cube sont des carrés."),
    vf("Le contour d’une face de brique est un rond.", false, "la brique est un pavé droit : ses faces sont des rectangles."),
  ]),
  solids(4, "la trace d’un pavé droit et d’un cylindre", [
    faceOf("cylindre", "une boîte de lait"),
    faceOf("pavé droit", "un carton de jus"),
    faceOf("cylindre", "un pot de yaourt"),
    faceOf("pavé droit", "une boîte de craies"),
    whichSolid(s("cylindre", "pavé droit"), "cylindre"),
    whichSolid(s("pavé droit", "cylindre", "cylindre"), "pavé droit"),
    vf("Le bout d’un cylindre laisse la trace d’un rond.", true, "les deux bouts d’un cylindre sont des ronds."),
    vf("On peut obtenir un triangle en traçant le contour d’un cylindre.", false, "on obtient un rond (par le bout) ou un rectangle (sur le côté)."),
  ]),
  solids(5, "les faces du cube et du pavé droit", [
    fact("Combien de faces a un cube ?", ["4", "*6", "8"], "le cube a 6 faces : dessus, dessous, devant, derrière, gauche et droite."),
    fact("Les faces d’un cube sont des…", ["*carrés", "ronds", "triangles"], "toutes ses faces sont des carrés pareils."),
    fact("Combien de faces a un pavé droit ?", ["4", "*6", "2"], "comme le cube, le pavé droit a 6 faces."),
    fact("Les faces d’un pavé droit sont surtout des…", ["*rectangles", "ronds", "triangles"], "la boîte d’allumettes a des faces rectangulaires."),
    vf("Toutes les faces d’un cube sont pareilles.", true, "ce sont 6 carrés de même taille."),
    vf("Un cube roule comme un ballon.", false, "un cube a des faces plates : il ne roule pas."),
    whichSolid(s("cylindre", "cube", "pavé droit"), "cube"),
    whichSolid(s("cube", "pavé droit", "cube"), "pavé droit"),
  ]),
  solids(6, "le cylindre", [
    fact("Combien de faces rondes a un cylindre ?", ["1", "*2", "3"], "un cylindre a deux bouts ronds."),
    fact("Quel solide peut rouler ?", ["un cube", "*un cylindre", "un pavé droit"], "le cylindre a une face courbe : il roule."),
    vf("Un cylindre peut rouler.", true, "sa face courbe le fait rouler."),
    vf("Un pavé droit peut rouler.", false, "ses faces sont plates : il glisse mais ne roule pas."),
    whichSolid(s("cylindre", "cube", "pavé droit"), "cylindre"),
    whichSolid(s("cube", "pavé droit", "cylindre"), "cylindre"),
    faceOf("cylindre", "une boîte de tomate"),
    fact("Quel objet n’a pas la forme d’un cylindre ?", ["un tuyau", "une boîte de tomate", "*un dé"], "le dé a la forme d’un cube."),
  ]),
  solids(7, "le patron du cube", [
    cubeNet([NET_FIVE, NET_CROSS, NET_SEVEN]),
    cubeNet([NET_T, NET_SEVEN, NET_FIVE]),
    cubeNet([NET_SEVEN, NET_FIVE, NET_ZIGZAG]),
    cubeNet([NET_FIVE, NET_T]),
    fact("Combien de carrés faut-il pour fabriquer un cube ?", ["4", "5", "*6"], "un cube a 6 faces carrées."),
    vf("En pliant le patron d’un cube, on fabrique un cube.", true, "on plie les carrés le long des traits."),
    vf("Le patron d’un cube a 5 carrés.", false, "il en faut 6, un par face."),
    cubeNet([NET_CROSS, NET_FIVE]),
  ]),
  solids(8, "le patron du pavé droit et du cylindre", [
    fact("Combien de ronds y a-t-il dans le patron d’un cylindre ?", ["1", "*2", "3"], "un rond pour chaque bout du cylindre."),
    fact("Dans le patron d’un cylindre, les deux ronds sont reliés par…", ["*un rectangle", "un triangle", "un autre rond"], "le rectangle s’enroule pour former le tour du cylindre."),
    fact("Combien de faces a le patron d’un pavé droit ?", ["4", "*6", "8"], "un pavé droit a 6 faces, donc 6 morceaux dans son patron."),
    vf("Le patron d’un pavé droit a des rectangles.", true, "les faces du pavé droit sont des rectangles."),
    vf("Avec le patron d’un cylindre, on peut fabriquer un cube.", false, "il donne un cylindre."),
    cubeNet([NET_SEVEN, NET_ZIGZAG]),
    fact("Quel solide fabrique-t-on avec un rectangle et deux ronds ?", ["un cube", "un pavé droit", "*un cylindre"], "le rectangle fait le tour, les ronds ferment les bouts."),
    cubeNet([NET_T, NET_FIVE, NET_SEVEN]),
  ]),
];

// ── Les figures planes ──────────────────────────────────────────────────────

const figures = seriesOf("Les figures planes");
const sq = (w: number) => ({ kind: "carré" as const, w });
const rect = (w: number, h: number) => ({ kind: "rectangle" as const, w, h });
const tri = (w: number, h: number) => ({ kind: "triangle" as const, w, h });
const round = (w: number) => ({ kind: "rond" as const, w });

export const FIGURES_CI: ExerciseSeries[] = [
  figures(1, "le carré et le rectangle (1)", [
    whichFigure([rect(4, 2), sq(3)], "carré"),
    whichFigure([sq(3), rect(5, 2)], "rectangle"),
    whichFigure([rect(3, 2), sq(2), rect(4, 3)], "carré"),
    whichFigure([sq(4), rect(4, 2), sq(2)], "rectangle"),
    whichFigure([rect(5, 3), sq(3)], "carré"),
    whichFigure([sq(2), rect(3, 1)], "rectangle"),
    vf("Le carré a 4 côtés.", true, "on compte 4 côtés."),
    vf("Le rectangle a 3 côtés.", false, "il a 4 côtés, comme le carré."),
  ]),
  figures(2, "le triangle et le rond (1)", [
    whichFigure([round(3), tri(3, 3)], "triangle"),
    whichFigure([tri(4, 3), round(2)], "rond"),
    whichFigure([sq(2), tri(3, 2), round(3)], "triangle"),
    whichFigure([round(2), rect(3, 2), tri(2, 2)], "rond"),
    whichFigure([tri(4, 2), sq(3), round(2)], "triangle"),
    whichFigure([rect(4, 2), round(3), sq(2)], "rond"),
    vf("Le triangle a 3 côtés.", true, "on compte 3 côtés et 3 pointes."),
    vf("Le rond a des côtés droits.", false, "le rond est une ligne courbe fermée."),
  ]),
  figures(3, "tracer un carré et un rectangle", [
    joinDots([[1, 1], [3, 1], [3, 3], [1, 3]]),
    joinDots([[0, 1], [5, 1], [5, 3], [0, 3]]),
    joinDots([[2, 0], [5, 0], [5, 3], [2, 3]]),
    joinDots([[1, 0], [7, 0], [7, 2], [1, 2]]),
    joinDots([[0, 0], [4, 0], [4, 4], [0, 4]]),
    joinDots([[2, 1], [6, 1], [6, 4], [2, 4]]),
    vf("Pour tracer un carré bien droit, on utilise la règle.", true, "la règle aide à tracer des côtés droits."),
    vf("Il faut 3 points pour tracer un rectangle.", false, "il faut 4 points : un à chaque coin."),
  ]),
  figures(4, "tracer un triangle et un rond", [
    joinDots([[0, 3], [2, 0], [4, 3]]),
    joinDots([[1, 4], [5, 4], [1, 1]]),
    joinDots([[0, 0], [4, 1], [1, 4]]),
    joinDots([[2, 1], [6, 3], [2, 4]]),
    whichFigure([tri(3, 3), round(3), rect(3, 2)], "rond"),
    fact("Avec quel objet peut-on tracer un rond ?", ["une règle", "*le bord d’un verre", "une équerre"], "on suit le bord rond du verre avec le crayon."),
    vf("Il faut 3 points pour tracer un triangle.", true, "un point à chaque pointe."),
    whichFigure([round(2), tri(4, 3)], "triangle"),
  ]),
  figures(5, "décrire le carré et le rectangle", [
    sideOf(sq(3), "côté"),
    sideOf(rect(5, 2), "grand côté"),
    sideOf(sq(4), "côté"),
    sideOf(rect(4, 2), "petit côté"),
    vf("Le carré a 4 côtés de même longueur.", true, "les 4 côtés sont pareils."),
    vf("Le rectangle a 2 côtés longs et 2 côtés plus courts.", true, "les côtés opposés ont la même longueur."),
    vf("Un rectangle a 4 côtés de même longueur.", false, "ça, c’est le carré."),
    whichFigure([sq(3), rect(4, 3)], "rectangle"),
  ]),
  figures(6, "décrire le triangle et le rond", [
    countCatParts("triangle"),
    countCatParts("rond"),
    countCatParts("rectangle"),
    fact("Combien de côtés a un triangle ?", ["2", "*3", "4"], "le triangle a 3 côtés droits."),
    fact("Combien de côtés droits a un rond ?", ["*0", "1", "4"], "le rond n’a aucun côté droit : il est tout courbe."),
    vf("Un triangle a 3 pointes.", true, "une pointe entre deux côtés, trois fois."),
    whichFigure([tri(3, 2), sq(2), round(2)], "triangle"),
    whichFigure([sq(3), round(4)], "rond"),
  ]),
  figures(7, "révision", [
    countCatParts("triangle"),
    whichFigure([rect(5, 2), sq(2), tri(3, 3)], "carré"),
    whichFigure([round(3), rect(3, 2), tri(2, 3)], "rectangle"),
    joinDots([[1, 1], [5, 1], [5, 3], [1, 3]]),
    joinDots([[1, 4], [3, 0], [5, 4]]),
    sideOf(sq(2), "côté"),
    cubeNet([NET_CROSS, NET_SEVEN]),
    vf("Le carré et le rectangle ont chacun 4 côtés.", true, "ils ont 4 côtés et 4 coins."),
  ]),
  figures(8, "activités d’intégration", [
    ctx("Le père de Moussa cherche une boîte en forme de pavé droit pour ranger ses livres.", whichSolid(s("cylindre", "pavé droit", "cube"), "pavé droit")),
    ctx("Baba veut fabriquer une boîte en forme de cube pour ses jouets.", cubeNet([NET_ZIGZAG, NET_FIVE])),
    ctx("Awa décore sa case avec des figures.", whichFigure([tri(3, 3), rect(4, 2), round(2)], "triangle")),
    ctx("Le maître dessine au tableau.", whichFigure([sq(3), round(3), rect(5, 2)], "carré")),
    ctx("Khady relie des points sur son ardoise.", joinDots([[0, 1], [6, 1], [6, 4], [0, 4]])),
    ctx("Pour ranger les craies, la maîtresse choisit une boîte.", faceOf("pavé droit", "la boîte de craies")),
    countCatParts("rond"),
    vf("Une boîte de tomate a la forme d’un cylindre.", true, "elle est ronde et longue."),
  ]),
];

// ── Lignes et chemins ───────────────────────────────────────────────────────

const lines = seriesOf("Lignes et chemins");
const GA: GridItem[] = [
  { row: 0, col: 3, picture: "mangue" },
  { row: 2, col: 1, picture: "ballon" },
  { row: 1, col: 2, picture: "bonbon" },
];
const GB: GridItem[] = [
  { row: 1, col: 0, picture: "cahier" },
  { row: 0, col: 2, picture: "orange" },
  { row: 2, col: 3, picture: "eleve-fille" },
];
const RA: [number, number][] = [[2, 0], [2, 1], [1, 1], [1, 2], [1, 3], [0, 3]];
const RB: [number, number][] = [[0, 0], [0, 1], [0, 2], [1, 2], [2, 2], [2, 3]];
const RC: [number, number][] = [[2, 3], [1, 3], [1, 2], [1, 1], [1, 0], [0, 0]];
const RD: [number, number][] = [[0, 3], [0, 2], [1, 2], [2, 2], [2, 1], [2, 0]];

export const LINES_CI: ExerciseSeries[] = [
  lines(1, "lignes ouvertes, lignes fermées", [
    whichLine(["rond", "arc", "vague"], "fermée"),
    whichLine(["triangle", "zigzag", "carré"], "ouverte"),
    whichLine(["arc", "nuage", "zigzag"], "fermée"),
    whichLine(["carré", "rond", "carré ouvert"], "ouverte"),
    whichLine(["vague", "triangle", "arc"], "fermée"),
    whichLine(["nuage", "carré", "arc"], "ouverte"),
    whichLine(["zigzag", "vague", "carré"], "fermée"),
    whichLine(["rond", "triangle", "zigzag"], "ouverte"),
  ]),
  lines(2, "rythmes graphiques", [
    nextShape(["●", "■"], 4, ["●", "■", "▲"]),
    nextShape(["▲", "▲", "○"], 3, ["▲", "○", "■"]),
    nextShape(["□", "●", "●"], 3, ["□", "●", "▲"]),
    nextShape(["○", "△", "△"], 3, ["○", "△", "□"]),
    nextShape(["■", "■", "▲", "▲"], 2, ["■", "▲", "●"]),
    nextShape(["◆", "●"], 4, ["◆", "●", "○"]),
    nextShape(["△", "○", "□"], 3, ["△", "○", "□"]),
    nextShape(["●", "○", "○"], 3, ["●", "○", "■"]),
  ]),
  lines(3, "intérieur, extérieur, frontière", [
    insideOrOutside([{ picture: "orange", inside: false }, { picture: "mangue", inside: true }], "extérieur", "le panier"),
    insideOrOutside([{ picture: "ballon", inside: true }, { picture: "bonbon", inside: false }], "intérieur", "le rond"),
    insideOrOutside([{ picture: "eleve-fille", inside: true }, { picture: "eleve-garcon", inside: false }, { picture: "ballon", inside: false }], "intérieur", "la cour de l’école"),
    insideOrOutside([{ picture: "banane", inside: true }, { picture: "mangue", inside: true }, { picture: "orange", inside: false }], "extérieur", "l’assiette"),
    insideOrOutside([{ picture: "cahier", inside: false }, { picture: "crayon", inside: true }], "intérieur", "la trousse"),
    insideOrOutside([{ picture: "bonbon", inside: true }, { picture: "ballon", inside: true }, { picture: "mangue", inside: false }], "extérieur", "le sac"),
    vf("La ligne fermée qui sépare l’intérieur de l’extérieur s’appelle la frontière.", true, "c’est la limite entre les deux."),
    vf("Un objet posé sur la frontière est à l’intérieur.", false, "il est sur la frontière, ni dedans ni dehors."),
  ]),
  lines(4, "le quadrillage et les nœuds", [
    whichNode(3, 3, [{ letter: "a", row: 0, col: 0 }, { letter: "b", row: 2, col: 2 }], [2, 2]),
    whichNode(3, 3, [{ letter: "a", row: 1, col: 2 }, { letter: "b", row: 0, col: 1 }], [1, 2]),
    cellCount(2, 2),
    whichNode(3, 4, [{ letter: "a", row: 2, col: 1 }, { letter: "b", row: 1, col: 3 }], [1, 3]),
    cellCount(2, 3),
    whichNode(4, 3, [{ letter: "a", row: 0, col: 2 }, { letter: "b", row: 3, col: 0 }], [3, 0]),
    cellCount(3, 3),
    vf("Un nœud est le point où deux lignes du quadrillage se croisent.", true, "c’est le croisement d’une ligne et d’une colonne de traits."),
  ]),
  lines(5, "le quadrillage et les cases", [
    cellOf(3, 4, GA, "mangue"),
    cellOf(3, 4, GA, "ballon"),
    cellOf(3, 4, GA, "bonbon"),
    cellOf(3, 4, GB, "cahier"),
    cellOf(3, 4, GB, "orange"),
    cellOf(3, 4, GB, "eleve-fille"),
    lineOrColumn(3, 4, GA, "ballon", "colonne"),
    lineOrColumn(3, 4, GB, "orange", "ligne"),
  ]),
  lines(6, "point de départ, point d’arrivée, parcours", [
    routeEnd(3, 4, RA, "départ", "Moussa"),
    routeEnd(3, 4, RA, "arrivée", "Moussa"),
    routeEnd(3, 4, RB, "départ", "la vache"),
    routeEnd(3, 4, RB, "arrivée", "la vache"),
    routeLength(3, 4, RA, "Moussa"),
    routeLength(3, 4, RB, "la vache"),
    routeEnd(3, 4, RC, "arrivée", "le mouton"),
    routeEnd(3, 4, RD, "départ", "Fatou"),
  ]),
  lines(7, "l’itinéraire (1)", [
    onRoute(3, 4, GA, RA, "premier", "Khady"),
    onRoute(3, 4, GA, RA, "dernier", "Khady"),
    routeEnd(3, 4, RA, "départ", "Khady", GA),
    routeLength(3, 4, RC, "Moussa"),
    routeEnd(3, 4, RC, "départ", "Moussa"),
    routeLength(3, 4, RD, "Fatou"),
    routeEnd(3, 4, RD, "arrivée", "Fatou"),
    vf("Un itinéraire est le chemin suivi pour aller d’un point à un autre.", true, "il part du point de départ et finit au point d’arrivée."),
  ]),
  lines(8, "l’itinéraire (2)", [
    onRoute(3, 4, GB, RC, "premier", "Binta"),
    onRoute(3, 4, GB, RC, "dernier", "Binta"),
    routeEnd(3, 4, RC, "arrivée", "Binta", GB),
    routeLength(3, 4, RC, "Binta"),
    routeEnd(3, 4, RB, "départ", "Modou"),
    routeLength(3, 4, RB, "Modou"),
    cellOf(3, 4, GB, "orange"),
    lineOrColumn(3, 4, GB, "cahier", "ligne"),
  ]),
  lines(9, "révision", [
    whichLine(["carré ouvert", "nuage", "zigzag"], "fermée"),
    insideOrOutside([{ picture: "orange", inside: true }, { picture: "ballon", inside: false }], "extérieur", "le panier"),
    nextShape(["■", "○", "○"], 3, ["■", "○", "▲"]),
    whichNode(3, 3, [{ letter: "a", row: 2, col: 0 }, { letter: "b", row: 1, col: 1 }], [2, 0]),
    cellOf(3, 4, GA, "bonbon"),
    routeEnd(3, 4, RD, "arrivée", "le vélo"),
    routeLength(3, 4, RA, "le vélo"),
    onRoute(3, 4, GA, RA, "premier", "le vélo"),
  ]),
  lines(10, "activités d’intégration", [
    ctx("Binta va de sa maison à l’école en suivant le chemin tracé.", routeEnd(3, 4, RB, "départ", "Binta")),
    ctx("Binta va de sa maison à l’école en suivant le chemin tracé.", routeEnd(3, 4, RB, "arrivée", "Binta")),
    ctx("Binta compte les cases de son chemin.", routeLength(3, 4, RB, "Binta")),
    ctx("Modou passe par le marché avant d’aller à l’école.", onRoute(3, 4, GA, RA, "premier", "Modou")),
    ctx("Le berger range ses moutons dans l’enclos (la ligne fermée).", insideOrOutside([{ picture: "eleve-garcon", inside: false }, { picture: "ballon", inside: true }], "intérieur", "l’enclos")),
    ctx("Sur la carte du quartier, chaque endroit est dans une case.", cellOf(3, 4, GB, "cahier")),
    whichLine(["rond", "vague", "arc"], "fermée"),
    vf("Pour aller à l’école, Binta peut choisir plusieurs itinéraires.", true, "il existe souvent plusieurs chemins entre deux endroits."),
  ]),
];
