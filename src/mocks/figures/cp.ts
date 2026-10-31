// Schémas des leçons du CP (maths, français, ESVS), dessinés avec les briques des exercices.

import { groups, pairDots, placeValue, posedGrid, svg, tensUnits, text, tree } from "../drawings";
import { besideOf, setsDrawing } from "../early-math";
import { figuresDrawing, gridDrawing, linesDrawing, nodesDrawing, zoneDrawing } from "../geometry";
import { balanceDrawing, bottlesDrawing, clockDrawing, distancesDrawing, glassesDrawing, measuredDrawing, rulerDrawing, weights } from "../measure";
import { bare, beside, fig, item, rhythm } from "./parts";

/** Le vélo et le nom de ses parties. */
function bikeParts(): string {
  const parts: [string, number, number, number, number][] = [
    ["la selle", 92, 22, 138, 44],
    ["le guidon", 272, 22, 218, 34],
    ["la roue", 44, 170, 66, 130],
    ["la pédale", 196, 172, 160, 106],
  ];
  let body = item("velo", 160, 82, 144);
  for (const [word, tx, ty, px, py] of parts)
    body += `<path class="dg-line" d="M${tx} ${ty + (ty < 90 ? 8 : -12)}L${px} ${py}"/><circle class="dg-node" cx="${px}" cy="${py}" r="3"/>${text(tx, ty, word)}`;
  return svg(320, 182, "Un vélo et ses parties : la selle, le guidon, les roues et les pédales.", body);
}

/** Un nombre dans le tableau d et u : des barres de dix et des cubes. */
const tu = (tens: number, units: number) => bare(tensUnits(tens, units));

export const SCHEMAS_CP: Record<string, string> = {
  // Maths : géométrie
  "cp-zone": bare(zoneDrawing([{ picture: "ballon", inside: true }, { picture: "ballon", inside: false }], "Le terrain")),
  "cp-lignes": bare(linesDrawing(["droite", "courbe", "brisée"])),
  "cp-frise": rhythm(["triangle", "rond", "rond"], 3),
  "cp-case": bare(gridDrawing(3, 4, [{ row: 1, col: 2, picture: "etoile" }])),
  "cp-noeuds": bare(nodesDrawing(3, 4, [{ letter: "A", row: 1, col: 2 }])),
  "cp-itineraire": bare(
    gridDrawing(
      4,
      5,
      [
        { row: 3, col: 0, picture: "maison" },
        { row: 2, col: 1, picture: "boutique" },
        { row: 0, col: 4, picture: "ecole" },
      ],
      [[3, 0], [3, 1], [3, 2], [2, 2], [1, 2], [1, 3], [0, 3], [0, 4]],
    ),
  ),
  "cp-regle": bare(rulerDrawing(9)),
  "cp-carre-rectangle": bare(figuresDrawing([{ kind: "carré", w: 3 }, { kind: "rectangle", w: 5, h: 2 }])),
  "cp-triangle-rond": bare(figuresDrawing([{ kind: "triangle", w: 4, h: 3 }, { kind: "rond", w: 3 }])),
  // Maths : nombres et calcul
  "cp-34": tu(3, 4),
  "cp-34-43": beside(tu(3, 4), "&lt;", tu(4, 3), "34 est plus petit que 43 : 3 dizaines et 4 unités, contre 4 dizaines et 3 unités."),
  "cp-24-34": beside(tu(2, 4), "+ 10 →", tu(3, 4), "24 plus une barre de dix donne 34."),
  "cp-63": tu(6, 3),
  "cp-85": tu(8, 5),
  "cp-centaine": bare(placeValue(1, 0, 0)),
  "cp-arbre-25": bare(tree([25], [20, 5])),
  "cp-pose": bare(posedGrid(23, "+", 14)),
  "cp-retenue": bare(posedGrid(27, "+", 15)),
  "cp-pairs": bare(pairDots(7)),
  "cp-partage": bare(groups(3, 4, "bonbon")),
  "cp-fois": bare(groups(3, 2, "jeton")),
  // Maths : mesures
  "cp-empans": bare(measuredDrawing([4, 6], "empan")),
  "cp-verres": bare(glassesDrawing([6, 4, 2])),
  "cp-litres": bare(bottlesDrawing([1, 0.5, 0.25], true, false)),
  "cp-balance": bare(balanceDrawing(item("sac-riz", 0, -6, 48), item("ballon", 0, 0, 34), "gauche")),
  "cp-kilo": bare(balanceDrawing(item("sac-riz", 0, -6, 48), weights([1]), "égal", true)),
  "cp-heure-3": bare(clockDrawing(3, 0)),
  "cp-heure-7-30": bare(clockDrawing(7, 30)),
  // ESVS
  "cp-entre": fig(besideOf(["crayon", "cahier", "ballon"], "cahier", "gauche")),
  "cp-trier": bare(setsDrawing([["mangue", "orange", "banane"], ["crayon", "cahier"]])),
  "cp-distances": bare(distancesDrawing("maison", [[140, 50], [270, 130]], "arbre")),
  "cp-pas": bare(measuredDrawing([5], "mètre", false)),
  "cp-velo": bikeParts(),
};
