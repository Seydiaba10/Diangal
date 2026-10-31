// Schémas des leçons du CE2 (maths, français, ESVS), dessinés avec les briques des exercices.

import { svg, text } from "../drawings";
import { clockDrawing } from "../measure";
import { angleKinds, areaGrid, circleCalc, fmt, fractionBar } from "../upper-math";
import { sidesRect } from "./ce1";
import { bare, beside, columnOp, fig, numberLine } from "./parts";

/** Division posée (potence) : dividende, diviseur, quotient et reste. */
export function divisionLayout(a: number, b: number): string {
  const q = Math.floor(a / b);
  const r = a - q * b;
  let body = text(60, 30, fmt(a)) + text(150, 30, fmt(b));
  body += `<path class="dg-scale" d="M110 10V120M110 44H200"/>`;
  body += text(150, 64, fmt(q)) + text(60, 108, `reste ${r}`, "dg-axis");
  body += text(150, 92, "quotient", "dg-axis") + text(60, 54, "dividende", "dg-axis") + text(160, 12, "diviseur", "dg-axis");
  return svg(210, 128, `Division posée : ${a} divisé par ${b} donne ${q}, reste ${r}.`, body);
}

/** Trois triangles : rectangle (angle droit marqué), isocèle (2 côtés égaux), équilatéral (3 côtés égaux). */
function trianglesDrawing(): string {
  const tick = (x1: number, y1: number, x2: number, y2: number) => {
    const [mx, my] = [(x1 + x2) / 2, (y1 + y2) / 2];
    const [dx, dy] = [y2 - y1, x1 - x2];
    const n = Math.hypot(dx, dy);
    return `<path class="dg-arrow" d="M${mx - (dx / n) * 6} ${my - (dy / n) * 6}L${mx + (dx / n) * 6} ${my + (dy / n) * 6}"/>`;
  };
  let body = `<path class="dg-figure" d="M14 110V30L94 110Z"/><path class="dg-line" d="M14 98H26V110"/>${text(54, 128, "A", "dg-letter")}`;
  body += `<path class="dg-figure" d="M150 110L180 26L210 110Z"/>${tick(150, 110, 180, 26)}${tick(180, 26, 210, 110)}${text(180, 128, "B", "dg-letter")}`;
  body += `<path class="dg-figure" d="M244 110L284 41L324 110Z"/>${tick(244, 110, 284, 41)}${tick(284, 41, 324, 110)}${tick(324, 110, 244, 110)}${text(284, 128, "C", "dg-letter")}`;
  return svg(336, 138, "Trois triangles : A a un angle droit, B a deux côtés égaux, C a trois côtés égaux.", body);
}

/** Une maison symétrique et son axe de symétrie. */
function symmetryHouse(): string {
  let body = `<path class="dg-shape" d="M60 70L120 20L180 70V140H60Z"/><path class="dg-figure" d="M60 70L120 20L180 70V140H60Z"/>`;
  body += `<rect class="dg-stick-alt" x="104" y="100" width="32" height="40"/><rect class="dg-stick-alt" x="72" y="84" width="22" height="18"/><rect class="dg-stick-alt" x="146" y="84" width="22" height="18"/>`;
  body += `<path class="dg-path" d="M120 6V154" stroke-dasharray="6 5"/>${text(150, 10, "axe", "dg-axis")}`;
  return svg(240, 160, "Une maison et son axe de symétrie rouge : les deux moitiés se superposent.", body);
}

/** Une bande partagée en morceaux (nombres et noms), avec le total au-dessus. */
export function splitBar(parts: [string, number][], total: string): string {
  const sum = parts.reduce((s, [, v]) => s + v, 0);
  const W = 300;
  let x = 10;
  let body = `<path class="dg-line" d="M10 30V24H${10 + W}V30"/>${text(10 + W / 2, 12, total)}`;
  parts.forEach(([label, v], i) => {
    const w = (v / sum) * W;
    // L'étiquette reste dans le cadre même sous un petit morceau (environ 7 px par lettre).
    const half = label.length * 3.5;
    const lx = Math.min(Math.max(x + w / 2, 10 + half), 10 + W - half);
    body += `<rect class="${i % 2 ? "dg-stick-alt" : "dg-stick"}" x="${x}" y="36" width="${w}" height="30"/>${text(lx, i % 2 ? 98 : 82, label, "dg-axis")}`;
    x += w;
  });
  return svg(W + 20, 106, `${total} : ${parts.map(([l]) => l).join(" + ")}.`, body);
}

/** Squelette simplifié et nom de quelques os et articulations. */
function skeleton(): string {
  let body = `<circle class="dg-figure" cx="120" cy="26" r="16"/>`;
  body += `<path class="dg-figure" d="M120 42V128M120 56H92L80 96M120 56H148L160 96M106 128L100 168L102 204M134 128L140 168L138 204M106 128H134"/>`;
  for (let i = 0; i < 4; i++) body += `<path class="dg-line" d="M104 ${62 + i * 10}Q120 ${58 + i * 10} 136 ${62 + i * 10}"/>`;
  body += `<circle class="dg-node" cx="86" cy="76" r="3.5"/><circle class="dg-node" cx="100" cy="168" r="3.5"/><circle class="dg-node" cx="140" cy="168" r="3.5"/>`;
  const labels: [string, number, number, number, number][] = [
    ["le crâne", 200, 22, 137, 24],
    ["les côtes", 200, 70, 137, 72],
    ["la colonne vertébrale", 52, 116, 118, 112],
    ["le coude", 40, 76, 83, 76],
    ["le genou", 200, 168, 144, 168],
  ];
  for (const [w, tx, ty, px, py] of labels) body += `<path class="dg-dash" d="M${tx + (tx > 120 ? -34 : 34)} ${ty}L${px} ${py}"/>${text(tx, ty, w, "dg-axis")}`;
  return svg(280, 214, "Un squelette simplifié : le crâne, les côtes, la colonne vertébrale, le coude et le genou.", `<g transform="translate(30 0)">${body}</g>`);
}

/** Les parties d'une plante. */
function plantParts(): string {
  let body = `<path class="dg-scale" d="M10 150H230"/>`;
  body += `<path class="dg-figure" d="M120 150V40"/>`;
  body += `<ellipse class="dg-land" cx="96" cy="96" rx="22" ry="9" transform="rotate(-25 96 96)"/><ellipse class="dg-land" cx="144" cy="80" rx="22" ry="9" transform="rotate(25 144 80)"/>`;
  body += `<circle class="dg-capital" cx="120" cy="34" r="12"/><circle class="dg-shape" cx="158" cy="118" r="8"/><path class="dg-line" d="M120 112L152 116"/>`;
  body += `<path class="dg-line" d="M120 150L104 178M120 150L120 184M120 150L138 176M110 166L98 170"/>`;
  const labels: [string, number, number, number, number][] = [
    ["la fleur", 196, 30, 134, 34],
    ["les feuilles", 40, 84, 78, 96],
    ["la tige", 196, 70, 122, 64],
    ["le fruit", 204, 118, 168, 118],
    ["les racines", 40, 176, 104, 176],
  ];
  for (const [w, tx, ty, px, py] of labels) body += `<path class="dg-dash" d="M${tx + (tx > 120 ? -26 : 30)} ${ty}L${px} ${py}"/>${text(tx, ty, w, "dg-axis")}`;
  return svg(240, 192, "Une plante et ses parties : la fleur, les feuilles, la tige, un fruit et les racines dans le sol.", body);
}

/** Circuit électrique fermé : pile, fils, interrupteur fermé et ampoule allumée. */
function circuit(): string {
  let body = `<path class="dg-scale" d="M40 40H130M170 40H260V140H180M140 140H40V40"/>`;
  body += `<path class="dg-scale" d="M130 40L170 40"/><circle class="dg-node" cx="130" cy="40" r="4"/><circle class="dg-node" cx="170" cy="40" r="4"/>`;
  body += `<rect class="dg-stick" x="140" y="126" width="40" height="28"/>${text(160, 140, "+  −", "dg-axis")}`;
  body += `<circle class="dg-capital" cx="260" cy="90" r="14"/><path class="dg-line" d="M250 80L270 100M270 80L250 100"/>`;
  body += text(150, 20, "interrupteur fermé", "dg-axis") + text(160, 170, "la pile", "dg-axis") + text(214, 90, "l’ampoule", "dg-axis") + text(60, 90, "les fils", "dg-axis");
  return svg(300, 180, "Un circuit électrique fermé : la pile, les fils, l’interrupteur fermé et l’ampoule.", body);
}

/** Une affiche : titre en gros, image, informations utiles. */
function poster(): string {
  let body = `<rect class="dg-note" x="40" y="6" width="200" height="200" rx="4"/>`;
  body += text(140, 34, "GRANDE KERMESSE") + text(140, 56, "de l’école du quartier", "dg-axis");
  body += `<circle class="dg-capital" cx="110" cy="100" r="16"/><circle class="dg-node" cx="150" cy="96" r="12"/><circle class="dg-shape" cx="176" cy="108" r="10"/>`;
  body += text(140, 148, "Samedi 12 décembre, 9 h", "dg-axis") + text(140, 168, "Dans la cour de l’école", "dg-axis") + text(140, 190, "Entrée : 100 F", "dg-axis");
  return svg(280, 212, "Une affiche : un titre en gros, une image, puis la date, l’heure, le lieu et le prix.", body);
}

export const SCHEMAS_CE2: Record<string, string> = {
  // Maths : nombres et calcul
  "ce2-addition": columnOp(2345, "+", 1250),
  "ce2-droite-47000": numberLine(40000, 50000, 1000, [[47308, "A"]], fmt),
  "ce2-soustraction": columnOp(52340, "−", 18765),
  "ce2-multiplication": columnOp(1245, "×", 6),
  "ce2-division": divisionLayout(1245, 5),
  "ce2-fraction": fig(fractionBar(4, 3)),
  "ce2-decimal": numberLine(20, 30, 1, [[25, "A"]], (v) => String(v / 10).replace(".", ",")),
  // Maths : géométrie
  "ce2-angles": fig(angleKinds([90, 45, 130], "droit")),
  "ce2-triangles": trianglesDrawing(),
  "ce2-cercle": fig(circleCalc("rayon", 3)),
  "ce2-symetrie": symmetryHouse(),
  // Maths : mesures et problèmes
  "ce2-tare": splitBar([["masse nette : 500 g", 500], ["tare : 50 g", 50]], "masse brute : 550 g"),
  "ce2-trajet": beside(bare(clockDrawing(8, 15)), "→", bare(clockDrawing(10, 45)), "Départ à 8 h 15, arrivée à 10 h 45."),
  "ce2-benefice": splitBar([["prix de revient : 13 000 F", 13000], ["bénéfice : 2 000 F", 2000]], "prix de vente : 15 000 F"),
  "ce2-partage": splitBar([["Awa (2 parts) : 6 000 F", 6000], ["Modou : 3 000 F", 3000]], "9 000 F à partager"),
  "ce2-perimetre": sidesRect(25, 15, "m"),
  "ce2-aire": fig(areaGrid(4, 3)),
  // Français
  "ce2-affiche": poster(),
  // ESVS
  "ce2-squelette": skeleton(),
  "ce2-plante": plantParts(),
  "ce2-circuit": circuit(),
};
