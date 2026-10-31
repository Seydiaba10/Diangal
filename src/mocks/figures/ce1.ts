// Schémas des leçons du CE1 (maths, ESVS), dessinés avec les briques des exercices.

import { groups, pairDots, svg, text, type PictureName } from "../drawings";
import { balanceDrawing, clockDrawing, notesDrawing, weights } from "../measure";
import { fmt, linePairs, whichDirection } from "../upper-math";
import { innerLines } from "../ce1/maths/geometrie";
import { bare, columnOp, fig, item, numberLine } from "./parts";

/** Centaines (plaques), dizaines (barres) et unités (cubes) dans un tableau c, d, u. */
function blocks(h: number, t: number, u: number): string {
  const cols = [
    { head: "c", w: 140 },
    { head: "d", w: 110 },
    { head: "u", w: 70 },
  ];
  let body = `<rect class="dg-scale" x="2" y="2" width="320" height="22" fill="none"/><rect class="dg-scale" x="2" y="24" width="320" height="76" fill="none"/>`;
  let x = 2;
  cols.forEach((c, i) => {
    if (i) body += `<path class="dg-scale" d="M${x} 2V100"/>`;
    body += text(x + c.w / 2, 13, c.head, "dg-axis");
    x += c.w;
  });
  for (let i = 0; i < h; i++) body += `<rect class="dg-stick" x="${10 + (i % 3) * 42}" y="${32 + Math.floor(i / 3) * 34}" width="36" height="30"/>${text(28 + (i % 3) * 42, 47 + Math.floor(i / 3) * 34, 100, "dg-axis")}`;
  for (let i = 0; i < t; i++) body += `<rect class="dg-stick" x="${150 + (i % 9) * 11}" y="${32 + Math.floor(i / 9) * 34}" width="8" height="60"/>`;
  for (let i = 0; i < u; i++) body += `<rect class="dg-stick" x="${262 + (i % 4) * 13}" y="${34 + Math.floor(i / 4) * 13}" width="10" height="10"/>`;
  return svg(324, 104, `${h} centaines, ${t} dizaines et ${u} unités : ${h * 100 + t * 10 + u}.`, body);
}

/** 10 plaques de 100 : 1 000. */
function thousand(): string {
  let body = "";
  for (let i = 0; i < 10; i++) {
    const x = 6 + (i % 5) * 52;
    const y = 6 + Math.floor(i / 5) * 46;
    body += `<rect class="dg-stick" x="${x}" y="${y}" width="44" height="40"/>${text(x + 22, y + 20, 100, "dg-axis")}`;
  }
  body += `<path class="dg-arrow" d="M270 52H292m-8-6 8 6-8 6"/>${text(318, 52, fmt(1000))}`;
  return svg(344, 104, "Dix plaques de 100 : elles font 1 000.", body);
}

/** Le mètre partagé en 10 décimètres. */
function meterBar(): string {
  let body = "";
  for (let i = 0; i < 10; i++) body += `<rect class="${i % 2 ? "dg-stick-alt" : "dg-stick"}" x="${10 + i * 30}" y="40" width="30" height="20"/>`;
  body += `<path class="dg-line" d="M10 30V34H310V30"/>${text(160, 18, "1 m = 10 dm = 100 cm")}`;
  body += `<path class="dg-line" d="M10 66V70H40V66"/>${text(25, 84, "1 dm", "dg-axis")}`;
  return svg(320, 92, "Un mètre partagé en 10 décimètres ; un décimètre est marqué.", body);
}

/** Un rectangle et la longueur de ses côtés. */
export function sidesRect(long: number, wide: number, unit: string): string {
  const w = 240;
  const h = Math.round((w * wide) / long);
  const [x0, y0] = [50, 30];
  let body = `<rect class="dg-figure" x="${x0}" y="${y0}" width="${w}" height="${h}"/>`;
  body += text(x0 + w / 2, y0 - 12, `${long} ${unit}`) + text(x0 + w / 2, y0 + h + 16, `${long} ${unit}`);
  body += text(x0 - 22, y0 + h / 2, `${wide} ${unit}`) + text(x0 + w + 24, y0 + h / 2, `${wide} ${unit}`);
  return svg(x0 * 2 + w, y0 + h + 32, `Un rectangle de ${long} ${unit} de longueur et ${wide} ${unit} de largeur.`, body);
}

/** Rose des vents : nord, sud, est, ouest ; le Soleil se lève à l'est. */
function compassRose(): string {
  const [cx, cy] = [150, 92];
  let body = `<path class="dg-solid-top" d="M${cx} ${cy - 62}L${cx + 12} ${cy - 12}L${cx + 62} ${cy}L${cx + 12} ${cy + 12}L${cx} ${cy + 62}L${cx - 12} ${cy + 12}L${cx - 62} ${cy}L${cx - 12} ${cy - 12}Z"/>`;
  body += `<path class="dg-figure" d="M${cx} ${cy - 62}L${cx + 12} ${cy - 12}L${cx + 62} ${cy}L${cx + 12} ${cy + 12}L${cx} ${cy + 62}L${cx - 12} ${cy + 12}L${cx - 62} ${cy}L${cx - 12} ${cy - 12}Z"/>`;
  body += text(cx, cy - 76, "N (nord)") + text(cx, cy + 78, "S (sud)") + text(cx + 104, cy, "E (est)") + text(cx - 104, cy, "O (ouest)");
  body += item("soleil", cx + 104, cy - 34, 34);
  return svg(300, 184, "Une rose des vents : le nord en haut, le sud en bas, l’est à droite (où le Soleil se lève), l’ouest à gauche.", body);
}

/** Les formes du relief vues de profil, avec leur nom. */
function reliefProfile(): string {
  const d = "M4 150V118H70Q92 118 100 96Q108 76 126 76Q144 76 152 96Q156 106 164 110H172V64H236L246 118Q256 134 266 118L276 30L304 118H340V150Z";
  let body = `<path class="dg-land" d="${d}"/><path class="dg-river" d="M248 126Q256 132 264 126"/>`;
  const names: [string, number, number][] = [
    ["plaine", 38, 138],
    ["colline", 126, 64],
    ["plateau", 204, 52],
    ["vallée", 256, 144],
    ["montagne", 290, 18],
  ];
  for (const [w, x, y] of names) body += text(x, y, w, "dg-axis");
  return svg(344, 154, "Le relief de profil : une plaine, une colline, un plateau, une vallée avec une rivière, une montagne.", body);
}

/** Arbre généalogique sur trois générations. */
function familyTree(): string {
  const rows: [PictureName, string, number, number][] = [
    ["grand-pere", "grand-père", 110, 38],
    ["grand-mere", "grand-mère", 190, 38],
    ["papa", "papa", 110, 136],
    ["maman", "maman", 190, 136],
    ["eleve-garcon", "mon frère", 70, 234],
    ["eleve-fille", "moi", 150, 234],
    ["bebe", "ma sœur", 230, 234],
  ];
  let body = `<path class="dg-line" d="M150 66V96M150 164V192M70 192H230M70 192V200M150 192V200M230 192V204M110 66H190M110 164H190"/>`;
  for (const [p, label, x, y] of rows) body += item(p, x, y, p === "bebe" ? 40 : 56) + text(x, y + 38, label, "dg-axis");
  return svg(300, 290, "Arbre généalogique : les grands-parents en haut, les parents au milieu, les enfants en bas.", body);
}

/** Plan d'une classe vue de dessus. */
function classPlan(): string {
  let body = `<rect class="dg-figure" x="10" y="10" width="300" height="200"/>`;
  body += `<path class="dg-node" d="M110 6H210V14H110Z"/>${text(160, 28, "tableau", "dg-axis")}`;
  body += `<rect class="dg-stick" x="230" y="36" width="54" height="26"/>${text(257, 49, "bureau", "dg-axis")}`;
  for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) body += `<rect class="dg-stick-alt" x="${40 + c * 80}" y="${84 + r * 40}" width="56" height="22"/>`;
  body += text(68, 76, "tables", "dg-axis");
  body += `<path class="dg-scale" d="M310 150V196" stroke-width="6"/><path class="dg-line" d="M310 150Q280 152 278 180"/>${text(282, 202, "porte", "dg-axis")}`;
  body += `<path class="dg-river" d="M10 60V110"/>${text(36, 56, "fenêtre", "dg-axis")}`;
  return svg(320, 220, "Le plan d’une classe vue de dessus : le tableau, le bureau, les tables, la porte et une fenêtre.", body);
}

export const SCHEMAS_CE1: Record<string, string> = {
  // Maths : nombres et calcul
  "ce1-347": blocks(3, 4, 7),
  "ce1-pairs": bare(pairDots(10)),
  "ce1-mille": thousand(),
  "ce1-billets-4000": notesDrawing([1000, 1000, 1000, 1000], 2),
  "ce1-droite-5000": numberLine(5000, 6000, 100, [[5432, "A"], [5621, "B"]], fmt),
  "ce1-addition": columnOp(368, "+", 254),
  "ce1-soustraction": columnOp(523, "−", 178),
  "ce1-multiplication": columnOp(124, "×", 3),
  "ce1-groupes": bare(groups(3, 4)),
  // Maths : géométrie
  "ce1-directions": fig(whichDirection(["horizontale", "verticale", "oblique"], "horizontale")),
  "ce1-droites": fig(linePairs(["sécantes", "perpendiculaires", "parallèles"], "sécantes")),
  "ce1-diagonales": innerLines("carré", ["diagonale", "médiane"]),
  // Maths : mesures
  "ce1-metre": meterBar(),
  "ce1-kilo": bare(balanceDrawing(item("sac-riz", 0, -6, 48), weights([0.5, 0.5]), "égal", true)),
  "ce1-heure-9-15": bare(clockDrawing(9, 15)),
  "ce1-heure-2-45": bare(clockDrawing(2, 45)),
  "ce1-perimetre": sidesRect(8, 3, "m"),
  "ce1-billets": notesDrawing([500, 1000, 2000, 5000, 10000], 3),
  // ESVS
  "ce1-famille": familyTree(),
  "ce1-rose-vents": compassRose(),
  "ce1-relief": reliefProfile(),
  "ce1-plan-classe": classPlan(),
};
