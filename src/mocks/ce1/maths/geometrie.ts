import "server-only";

// CE1, géométrie : lignes droites, courbes et brisées ; droites horizontales, verticales et obliques ;
// droites sécantes, perpendiculaires et parallèles ; carré et rectangle (côtés, angles droits,
// diagonales, médianes). Séries DIANGAL ; les dessins des diagonales et médianes sont tracés ici.

import { svg, text } from "../../drawings";
import type { ExerciseSeries, ExerciseSpec } from "../../exercise-series";
import { sideOf, whichFigure, whichLineKind } from "../../geometry";
import { fact } from "../../measure";
import { linePairs, whichDirection } from "../../upper-math";
import { seriesOf } from "../../cp/maths/helpers";

const vf = (statement: string, answer: boolean, why: string): ExerciseSpec => ({ vf: statement, answer, why: `<strong>${answer ? "Vrai" : "Faux"}</strong> : ${why}` });
const sq = (w: number) => ({ kind: "carré" as const, w });
const rect = (w: number, h: number) => ({ kind: "rectangle" as const, w, h });
const tri = (w: number, h: number) => ({ kind: "triangle" as const, w, h });
const round = (w: number) => ({ kind: "rond" as const, w });

type Inner = "diagonale" | "médiane";
const L = (i: number) => "AB"[i]!;

/** Un carré ou un rectangle avec deux traits marqués A et B : une diagonale et une médiane. */
export function innerLines(kind: "carré" | "rectangle", marks: [Inner, Inner], flip = false): string {
  const [x0, y0, w, h] = kind === "carré" ? [30, 14, 120, 120] : [30, 24, 190, 100];
  const [x1, y1, xm, ym] = [x0 + w, y0 + h, x0 + w / 2, y0 + h / 2];
  let body = `<rect class="dg-figure" x="${x0}" y="${y0}" width="${w}" height="${h}"/>`;
  marks.forEach((m, i) => {
    const first = (i === 0) !== flip;
    const seg =
      m === "diagonale"
        ? first
          ? [x0, y0, x1, y1, x0 + w * 0.22 + 14, y0 + h * 0.22 - 4]
          : [x1, y0, x0, y1, x1 - w * 0.22 - 14, y0 + h * 0.22 - 4]
        : first
          ? [xm, y0, xm, y1, xm - 12, y1 - 18]
          : [x0, ym, x1, ym, x0 + 18, ym - 12];
    body += `<g data-letter="${L(i)}"><line class="dg-path" x1="${seg[0]}" y1="${seg[1]}" x2="${seg[2]}" y2="${seg[3]}"/>${text(seg[4]!, seg[5]!, L(i), "dg-letter")}</g>`;
  });
  return svg(x0 * 2 + w, y0 * 2 + h, `Un ${kind} avec deux traits rouges marqués A et B.`, body);
}

/** Quel trait (A ou B) est une diagonale, ou une médiane ? */
function whichInner(kind: "carré" | "rectangle", marks: [Inner, Inner], want: Inner, flip = false): ExerciseSpec {
  const good = marks.indexOf(want);
  return {
    qcm: `Quel trait rouge est une <strong>${want}</strong> du ${kind} ?`,
    fig: innerLines(kind, marks, flip),
    choices: marks.map((_, i) => (i === good ? `*${L(i)}` : L(i))),
    why: `<strong>${L(good)}</strong> : ${want === "diagonale" ? "il relie deux coins (sommets) opposés" : "il relie les milieux de deux côtés opposés"}.`,
  };
}

const lines = seriesOf("Lignes et droites");

export const LINES_CE1: ExerciseSeries[] = [
  lines(1, "lignes droites, courbes et brisées", [
    whichLineKind(["droite", "courbe", "brisée"], "courbe"),
    whichLineKind(["brisée", "droite", "courbe"], "droite"),
    whichLineKind(["courbe", "brisée", "droite"], "brisée"),
    whichLineKind(["droite", "brisée", "courbe"], "courbe"),
    fact("Pour tracer une ligne droite, on utilise…", ["*une règle", "un compas", "une gomme"], "la règle guide le crayon."),
    fact("Une ligne brisée est faite de…", ["*plusieurs segments droits", "un seul rond", "une seule courbe"], "elle change de direction en faisant des coins."),
    vf("Une ligne courbe n’a pas de coins.", true, "elle tourne sans faire d’angle."),
    vf("Le bord d’une règle est une ligne courbe.", false, "c’est une ligne droite."),
  ]),
  lines(2, "horizontale, verticale ou oblique", [
    whichDirection(["verticale", "horizontale", "oblique"], "horizontale"),
    whichDirection(["oblique", "verticale", "horizontale"], "verticale"),
    whichDirection(["horizontale", "oblique", "verticale"], "oblique"),
    whichDirection(["horizontale", "verticale", "oblique"], "verticale"),
    fact("Le fil à plomb du maçon donne une ligne…", ["*verticale", "horizontale", "oblique"], "le poids tire le fil tout droit vers le bas."),
    fact("La surface de l’eau calme dans un seau est…", ["*horizontale", "verticale", "oblique"], "elle est couchée, bien à plat."),
    vf("Une droite oblique penche.", true, "elle n’est ni horizontale ni verticale."),
    vf("Le mât du drapeau de l’école est horizontal.", false, "il est debout : il est vertical."),
  ]),
  lines(3, "droites sécantes, perpendiculaires et parallèles (1)", [
    linePairs(["parallèles", "sécantes", "perpendiculaires"], "parallèles"),
    linePairs(["sécantes", "perpendiculaires", "parallèles"], "perpendiculaires"),
    linePairs(["perpendiculaires", "parallèles", "sécantes"], "sécantes"),
    linePairs(["parallèles", "perpendiculaires", "sécantes"], "perpendiculaires"),
    fact("Deux droites qui se coupent sont…", ["*sécantes", "parallèles", "courbes"], "elles ont un point commun."),
    fact("Deux droites qui ne se coupent jamais sont…", ["*parallèles", "sécantes", "perpendiculaires"], "elles gardent toujours le même écart."),
    vf("Deux droites perpendiculaires forment un angle droit.", true, "on le vérifie avec l’équerre."),
    vf("Deux droites parallèles se coupent un peu plus loin.", false, "elles ne se coupent jamais."),
  ]),
  lines(4, "droites sécantes, perpendiculaires et parallèles (2)", [
    linePairs(["sécantes", "parallèles", "perpendiculaires"], "parallèles"),
    linePairs(["perpendiculaires", "sécantes", "parallèles"], "sécantes"),
    fact("Les deux rails d’un chemin de fer sont…", ["*parallèles", "perpendiculaires", "sécantes"], "ils gardent toujours le même écart."),
    fact("Deux bords d’une feuille qui forment un coin sont…", ["*perpendiculaires", "parallèles", "courbes"], "ils forment un angle droit."),
    fact("Quel instrument vérifie un angle droit ?", ["*l’équerre", "le compas", "le mètre"], "on pose le coin de l’équerre dans l’angle."),
    fact("Les lignes d’un cahier sont…", ["*parallèles", "sécantes", "perpendiculaires"], "elles ne se coupent jamais."),
    vf("Des droites perpendiculaires sont aussi sécantes.", true, "elles se coupent, en formant un angle droit."),
    vf("Les deux aiguilles d’une horloge à 3 heures sont parallèles.", false, "elles forment un angle droit : elles sont perpendiculaires."),
  ]),
  lines(5, "reconnaître les droites autour de soi", [
    linePairs(["perpendiculaires", "parallèles", "sécantes"], "parallèles"),
    linePairs(["parallèles", "sécantes", "perpendiculaires"], "sécantes"),
    fact("Le bord du haut et le bord de côté du tableau forment un coin. Ils sont…", ["*perpendiculaires", "parallèles", "courbes"], "ils forment un angle droit."),
    fact("Les deux bords d’une route droite sont…", ["*parallèles", "sécantes", "perpendiculaires"], "ils ne se rejoignent jamais."),
    fact("Les branches de la lettre X sont…", ["*sécantes", "parallèles", "courbes"], "elles se coupent au milieu."),
    fact("Les deux montants d’une échelle sont…", ["*parallèles", "perpendiculaires", "sécantes"], "ils restent à la même distance."),
    vf("Un barreau de l’échelle est perpendiculaire aux montants.", true, "il forme un angle droit avec eux."),
    vf("Deux droites sécantes ont toujours un angle droit.", false, "elles se coupent, mais pas forcément à angle droit."),
  ]),
];

const shapes = seriesOf("Le carré et le rectangle");

export const SHAPES_CE1: ExerciseSeries[] = [
  shapes(1, "reconnaître le carré et le rectangle", [
    whichFigure([rect(4, 2), sq(3), tri(3, 3)], "carré"),
    whichFigure([sq(3), round(3), rect(5, 2)], "rectangle"),
    whichFigure([tri(4, 3), rect(4, 3), sq(2)], "carré"),
    whichFigure([round(3), rect(3, 2), tri(3, 2)], "rectangle"),
    fact("Combien de côtés a un rectangle ?", ["3", "*4", "5"], "il a 4 côtés et 4 angles droits."),
    fact("Combien d’angles droits a un carré ?", ["2", "3", "*4"], "ses 4 coins sont des angles droits."),
    vf("Un carré a 4 côtés de même longueur.", true, "c’est ce qui le distingue du rectangle."),
    vf("Un rectangle a 4 côtés de même longueur.", false, "ses côtés opposés sont égaux, mais la longueur est plus grande que la largeur."),
  ]),
  shapes(2, "côtés et angles", [
    sideOf(sq(3), "côté"),
    sideOf(rect(5, 2), "grand côté"),
    sideOf(rect(6, 3), "petit côté"),
    sideOf(sq(4), "côté"),
    sideOf(rect(4, 2), "petit côté"),
    fact("Le grand côté d’un rectangle s’appelle…", ["*la longueur", "la largeur", "la diagonale"], "le petit côté s’appelle la largeur."),
    fact("Pour vérifier les angles droits d’un carré, on utilise…", ["*l’équerre", "le compas", "la balance"], "l’équerre a un angle droit."),
    vf("Dans un rectangle, les côtés opposés ont la même longueur.", true, "les deux longueurs sont égales, les deux largeurs aussi."),
  ]),
  shapes(3, "les diagonales", [
    whichInner("carré", ["diagonale", "médiane"], "diagonale"),
    whichInner("rectangle", ["médiane", "diagonale"], "diagonale"),
    whichInner("carré", ["médiane", "diagonale"], "diagonale", true),
    whichInner("rectangle", ["diagonale", "médiane"], "diagonale", true),
    fact("Une diagonale relie…", ["*deux sommets opposés", "deux milieux de côtés", "deux côtés voisins"], "elle va d’un coin au coin opposé."),
    fact("Combien de diagonales a un carré ?", ["1", "*2", "4"], "une diagonale part de chaque paire de coins opposés : il y en a 2."),
    vf("Les diagonales d’un rectangle se coupent en leur milieu.", true, "elles se croisent au centre du rectangle."),
    vf("Une diagonale est un côté du carré.", false, "elle traverse le carré d’un coin au coin opposé."),
  ]),
  shapes(4, "les médianes", [
    whichInner("carré", ["diagonale", "médiane"], "médiane"),
    whichInner("rectangle", ["médiane", "diagonale"], "médiane"),
    whichInner("carré", ["médiane", "diagonale"], "médiane", true),
    whichInner("rectangle", ["diagonale", "médiane"], "médiane", true),
    fact("Une médiane relie…", ["*les milieux de deux côtés opposés", "deux coins opposés", "deux coins voisins"], "elle partage la figure en deux parties égales."),
    fact("Combien de médianes a un rectangle ?", ["1", "*2", "4"], "une qui joint les milieux des longueurs, une qui joint les milieux des largeurs."),
    vf("Une médiane partage le carré en deux rectangles égaux.", true, "elle passe par les milieux de deux côtés opposés."),
    vf("Une médiane part d’un coin du rectangle.", false, "elle part du milieu d’un côté."),
  ]),
  shapes(5, "carré, rectangle : je retiens", [
    whichFigure([sq(2), rect(6, 2), round(2)], "rectangle"),
    whichFigure([rect(5, 3), tri(4, 2), sq(4)], "carré"),
    sideOf(rect(7, 3), "grand côté"),
    sideOf(sq(5), "côté"),
    fact("Un carré est un rectangle particulier, car…", ["*sa longueur et sa largeur sont égales", "il a 3 côtés", "il est rond"], "il a 4 angles droits et 4 côtés égaux."),
    fact("Les diagonales d’un carré sont…", ["*perpendiculaires", "parallèles", "courbes"], "elles se coupent à angle droit au centre du carré."),
    vf("Le carré et le rectangle ont 4 angles droits.", true, "on le vérifie avec l’équerre."),
    vf("Un triangle a des diagonales.", false, "il n’a pas de coins opposés."),
  ]),
];
