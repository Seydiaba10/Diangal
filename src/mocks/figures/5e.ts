// Schémas des leçons de 5e : relatifs, fractions, repère, angles et parallèles, constructions et droites
// remarquables du triangle, parallélogramme, symétrie centrale, prisme ; SVT (dentition, estomac des
// ruminants, sol, sédimentation) ; histoire (frise des empires) ; géographie du Sénégal (socle et bassin,
// pluies, cours d'eau, diagrammes climatiques, pyramide des âges, densités).

import { svg } from "../drawings";
import {
  angleArc,
  arrow,
  callout,
  circ,
  circumcenter,
  dot,
  frise,
  intersect,
  ln,
  mid,
  path,
  plot,
  poly,
  type Pt,
  project,
  pt,
  rect,
  rightAngle,
  seg,
  ticks,
  tx,
} from "./kit";
import { geo, latLine, senegalClip, senegalMap } from "./senegal";

const W = 300;
const P = (lon: number, lat: number) => geo(lon, lat).map((v) => v.toFixed(1)).join(" ");

// ── Mathématiques ───────────────────────────────────────────────────────────

/** Exemple de la leçon : la température passe de −2 °C à +5 °C, elle monte de 5 − (−2) = 7 °C. */
const additionRelatifs = (() => {
  const X = (v: number) => 18 + ((v + 4) / 10) * (W - 36);
  const y = 70;
  let body = arrow(10, y, W - 6, y, "dg-axis-line", "dg-pt", 7);
  for (let v = -4; v <= 6; v++) body += ln(X(v), y - 5, X(v), y + 5, "dg-axis-line") + tx(X(v), y + 17, String(v).replace("-", "−"), "dg-tick");
  body += path(`M${X(-2)} ${y - 6}C${X(-0.5)} ${y - 50} ${X(3.5)} ${y - 50} ${X(5) - 2} ${y - 9}`, "dg-vec") + dot(X(-2), y, 4, "dg-pt") + dot(X(5), y, 4, "dg-vec-head");
  body += tx(X(1.5), y - 46, "+ 7", "dg-lbl") + tx(X(-2), y + 34, "−2 °C", "dg-lbl-xs") + tx(X(5), y + 34, "+5 °C", "dg-lbl-xs");
  return svg(W, 112, "Droite graduée des températures : de −2 °C à +5 °C, on monte de 7 degrés, car 5 − (−2) = 5 + 2 = 7.", body);
})();

/** Exemple de la leçon : 2/3 = 8/12 et 3/4 = 9/12, donc 2/3 < 3/4. */
const fractions = (() => {
  const bar = (y: number, parts: number, shaded: number, label: string, cls: string) => {
    let out = tx(30, y + 12, label, "dg-lbl-math");
    const w = 220 / parts;
    for (let i = 0; i < parts; i++) out += rect(60 + i * w, y, w, 24, i < shaded ? cls : "dg-cell");
    return out;
  };
  const body =
    bar(10, 3, 2, "2/3", "dg-t-blue") +
    bar(44, 12, 8, "8/12", "dg-t-blue") +
    bar(84, 4, 3, "3/4", "dg-t-red") +
    bar(118, 12, 9, "9/12", "dg-t-red") +
    ln(60 + (220 * 2) / 3, 4, 60 + (220 * 2) / 3, 148, "dg-dash") +
    tx(170, 160, "2/3 = 8/12 et 3/4 = 9/12, donc 2/3 < 3/4", "dg-lbl-sm");
  return svg(W, 170, "Bandes de même longueur : 2/3 couvre autant que 8/12, 3/4 autant que 9/12 ; 8 douzièmes sont moins que 9 douzièmes, donc 2/3 est plus petit que 3/4.", body);
})();

const quadrants = plot({ x: [-4, 4], y: [-3, 3], unit: 32, labelX: "x", labelY: "y" }, "Repère partagé en quatre quadrants ; M(3 ; 2) et son symétrique M′(−3 ; −2) par rapport à l’origine O.", (p) =>
  p.text(2.6, 2.75, "1er quadrant", "dg-lbl-xs") +
  p.text(-2.6, 2.75, "2e quadrant", "dg-lbl-xs") +
  p.text(-2.6, -2.75, "3e quadrant", "dg-lbl-xs") +
  p.text(2.6, -2.75, "4e quadrant", "dg-lbl-xs") +
  p.seg(-3, -2, 3, 2, "dg-dash") +
  p.point(3, 2, "M(3 ; 2)", -2, -13) +
  p.point(-3, -2, "M′(−3 ; −2)", 8, -13),
);

const anglesParalleles = (() => {
  const yA = 56;
  const yB = 128;
  const s1: Pt = [96, 14];
  const s2: Pt = [204, 170];
  const I = intersect(s1, s2, [0, yA], [W, yA]);
  const J = intersect(s1, s2, [0, yB], [W, yB]);
  let body = ln(14, yA, 286, yA, "dg-geo") + ln(14, yB, 286, yB, "dg-geo") + seg(s1, s2, "dg-geo-line");
  body += tx(20, yA - 10, "(d₁)", "dg-lbl-math", "start") + tx(20, yB - 10, "(d₂)", "dg-lbl-math", "start");
  // Alternes-internes (entre les parallèles, de part et d'autre de la sécante) : rouge.
  body += angleArc(I, [0, yA], J, 18, "", "dg-arc") + angleArc(J, [W, yB], I, 18, "", "dg-arc");
  // Correspondants (même position aux deux intersections) : vert.
  body += angleArc(I, [W, yA], J, 26, "", "dg-arc-2") + angleArc(J, [W, yB], s2, 26, "", "dg-arc-2");
  body += pt(I, "", "n") + pt(J, "", "n");
  body += ln(16, 186, 32, 186, "dg-arc") + tx(38, 186, "alternes-internes : égaux", "dg-lbl-xs", "start") + ln(166, 186, 182, 186, "dg-arc-2") + tx(188, 186, "correspondants : égaux", "dg-lbl-xs", "start");
  return svg(W, 196, "Deux droites parallèles (d₁) et (d₂) coupées par une sécante : les angles alternes-internes (en rouge) sont égaux, les angles correspondants (en vert) aussi.", body);
})();

/** Triangle de côtés 5 cm, 4 cm et 3 cm (1 cm = 36 px) construit au compas. */
const construireTriangle = (() => {
  const u = 36;
  const A: Pt = [40, 170];
  const B: Pt = [40 + 5 * u, 170];
  const xC = A[0] + ((4 * u) ** 2 - (3 * u) ** 2 + (5 * u) ** 2) / (2 * 5 * u);
  const C: Pt = [xC, 170 - Math.sqrt((4 * u) ** 2 - (xC - A[0]) ** 2)];
  const arcAt = (c: Pt, r: number, from: number, to: number) => {
    const a = (from * Math.PI) / 180;
    const b = (to * Math.PI) / 180;
    return path(`M${c[0] + r * Math.cos(a)} ${c[1] - r * Math.sin(a)}A${r} ${r} 0 0 0 ${c[0] + r * Math.cos(b)} ${c[1] - r * Math.sin(b)}`, "dg-compass");
  };
  const angA = (Math.atan2(A[1] - C[1], C[0] - A[0]) * 180) / Math.PI;
  const angB = (Math.atan2(B[1] - C[1], C[0] - B[0]) * 180) / Math.PI;
  let body = arcAt(A, 4 * u, angA - 14, angA + 14) + arcAt(B, 3 * u, angB - 18, angB + 18);
  body += poly([A, B, C]) + pt(A, "A", "sw") + pt(B, "B", "se") + pt(C, "C", "n");
  body += tx((A[0] + B[0]) / 2, 186, "AB = 5 cm", "dg-lbl-sm") + tx((A[0] + C[0]) / 2 - 26, (A[1] + C[1]) / 2, "4 cm", "dg-lbl-sm") + tx((B[0] + C[0]) / 2 + 24, (B[1] + C[1]) / 2, "3 cm", "dg-lbl-sm");
  return svg(W, 198, "Construction d’un triangle de côtés 5 cm, 4 cm et 3 cm : on trace [AB], puis un arc de centre A et de rayon 4 cm et un arc de centre B et de rayon 3 cm ; ils se coupent en C.", body);
})();

const mediatrices = (() => {
  const A: Pt = [60, 170];
  const B: Pt = [220, 170];
  const C: Pt = [120, 40];
  const O = circumcenter(A, B, C);
  const R = Math.hypot(A[0] - O[0], A[1] - O[1]);
  let body = circ(O[0], O[1], R, "dg-geo-line") + poly([A, B, C]);
  for (const [p, q] of [[A, B], [B, C], [C, A]] as [Pt, Pt][]) {
    const m = mid(p, q);
    const len = Math.hypot(O[0] - m[0], O[1] - m[1]);
    const ux = (O[0] - m[0]) / (len || 1);
    const uy = (O[1] - m[1]) / (len || 1);
    // Direction perpendiculaire à [pq] (vers O, ou au hasard si O est au milieu).
    const dx = q[0] - p[0];
    const dy = q[1] - p[1];
    const n = Math.hypot(dx, dy);
    const perp: Pt = len > 1 ? [ux, uy] : [-dy / n, dx / n];
    body += ln(m[0] - perp[0] * 24, m[1] - perp[1] * 24, O[0] + perp[0] * 26, O[1] + perp[1] * 26, "dg-curve-alt") + rightAngle(m, q, [m[0] + perp[0], m[1] + perp[1]], 7) + ticks(p, m) + ticks(m, q);
  }
  body += pt(A, "A", "sw") + pt(B, "B", "se") + pt(C, "C", "n") + pt(O, "O", "e");
  return svg(W, 228, "Les trois médiatrices d’un triangle ABC (en rouge) se coupent en O, centre du cercle circonscrit qui passe par A, B et C.", body);
})();

const hauteurs = (() => {
  const A: Pt = [30, 176];
  const B: Pt = [260, 176];
  const C: Pt = [96, 30];
  const fC = project(C, A, B);
  const fA = project(A, B, C);
  const fB = project(B, A, C);
  const H = intersect(C, fC, A, fA);
  let body = poly([A, B, C]);
  body += seg(C, fC, "dg-curve") + seg(A, fA, "dg-curve") + seg(B, fB, "dg-curve");
  body += rightAngle(fC, B, C, 8) + rightAngle(fA, C, A, 8) + rightAngle(fB, C, B, 8);
  body += pt(A, "A", "sw") + pt(B, "B", "se") + pt(C, "C", "n") + pt(H, "H", "e");
  return svg(W, 192, "Les trois hauteurs d’un triangle ABC (en bleu) : chacune passe par un sommet et est perpendiculaire au côté opposé ; elles se coupent en un même point H.", body);
})();

const parallelogramme = (() => {
  const A: Pt = [24, 150];
  const B: Pt = [200, 150];
  const C: Pt = [276, 46];
  const D: Pt = [100, 46];
  const O = mid(A, C);
  let body = poly([A, B, C, D], "dg-geo-fill") + seg(A, C, "dg-dash") + seg(B, D, "dg-dash");
  body += ticks(A, O, 1) + ticks(O, C, 1) + ticks(B, O, 2) + ticks(O, D, 2);
  body += pt(A, "A", "sw") + pt(B, "B", "se") + pt(C, "C", "ne") + pt(D, "D", "nw") + pt(O, "O", "s");
  body += tx(150, 176, "(AB) // (DC) et (AD) // (BC) ; OA = OC et OB = OD", "dg-lbl-xs");
  return svg(W, 186, "Parallélogramme ABCD : ses côtés opposés sont parallèles ; ses diagonales [AC] et [BD] se coupent en leur milieu O.", body);
})();

const symetrieCentrale = (() => {
  const O: Pt = [150, 100];
  const A: Pt = [62, 40];
  const B: Pt = [116, 62];
  const C: Pt = [76, 112];
  const im = (p: Pt): Pt => [2 * O[0] - p[0], 2 * O[1] - p[1]];
  const [A2, B2, C2] = [im(A), im(B), im(C)];
  let body = poly([A, B, C], "dg-geo-fill") + poly([A2, B2, C2], "dg-geo-fill") + seg(A, A2, "dg-dash") + ticks(A, O, 2) + ticks(O, A2, 2);
  body += pt(O, "O", "s", true) + pt(A, "A", "nw") + pt(B, "B", "ne") + pt(C, "C", "sw") + pt(A2, "A′", "se") + pt(B2, "B′", "sw") + pt(C2, "C′", "ne");
  return svg(W, 196, "Le triangle A′B′C′ est le symétrique de ABC par rapport au point O : O est le milieu de [AA′] ; c’est un demi-tour autour de O.", body);
})();

/** Prisme droit à base triangulaire en perspective, et son patron. */
const prisme = (() => {
  const A: Pt = [16, 150];
  const B: Pt = [100, 150];
  const C: Pt = [44, 92];
  const d: Pt = [52, -34];
  const sh = (p: Pt): Pt => [p[0] + d[0], p[1] + d[1]];
  const [A2, B2, C2] = [sh(A), sh(B), sh(C)];
  let body = poly([A, B, C], "dg-solid-face") + poly([C, B, B2, C2], "dg-solid-face-side") + seg(A, A2, "dg-hidden") + seg(A2, B2, "dg-hidden") + seg(A2, C2, "dg-hidden");
  body += tx(76, 176, "prisme droit", "dg-lbl-sm");
  // Patron : trois rectangles (côtés du triangle × hauteur) et deux triangles.
  const k = 0.5;
  const sides = [Math.hypot(B[0] - A[0], B[1] - A[1]), Math.hypot(C[0] - B[0], C[1] - B[1]), Math.hypot(A[0] - C[0], A[1] - C[1])].map((v) => v * k);
  const h = Math.hypot(d[0], d[1]) * 1.4;
  const x0 = 166;
  const y0 = 62;
  let x = x0;
  sides.forEach((s) => {
    body += rect(x, y0, s, h, "dg-cell");
    x += s;
  });
  // Triangles sur le premier rectangle (côté [AB]) : sommet placé comme C par rapport à [AB].
  const a = sides[0]!;
  const tC = ((C[0] - A[0]) / (B[0] - A[0])) * a;
  const tH = (A[1] - C[1]) * k;
  body += poly([[x0, y0], [x0 + a, y0], [x0 + tC, y0 - tH]], "dg-solid-face") + poly([[x0, y0 + h], [x0 + a, y0 + h], [x0 + tC, y0 + h + tH]], "dg-solid-face");
  body += tx(x0 + (x - x0) / 2, 176, "son patron", "dg-lbl-sm");
  return svg(W, 186, "Un prisme droit à base triangulaire (arêtes cachées en pointillés) et son patron : deux triangles et trois rectangles.", body);
})();

// ── SVT ─────────────────────────────────────────────────────────────────────

/** Estomac des ruminants : quatre poches et trajet des aliments. */
const ruminant = (() => {
  let body = "";
  body += path("M40 70C40 40 70 30 110 34C150 38 160 60 158 92C156 130 130 150 96 150C60 150 40 120 40 70Z", "dg-t-green") + tx(96, 102, "panse", "dg-lbl");
  body += path("M150 40C164 26 190 28 196 46C202 64 186 76 168 72C156 68 146 54 150 40Z", "dg-t-yellow") + tx(174, 52, "bonnet", "dg-lbl-xs");
  body += circ(214, 96, 22, "dg-t-sand") + tx(214, 96, "feuillet", "dg-lbl-xs");
  body += path("M232 112C262 116 282 138 274 160C266 178 236 176 216 162C204 152 204 130 216 120Z", "dg-t-red") + tx(244, 148, "caillette", "dg-lbl-xs");
  // Œsophage et intestin.
  body += path("M120 8L126 34", "dg-ink") + tx(108, 10, "œsophage", "dg-lbl-xs", "end") + path("M274 160L292 186", "dg-ink") + tx(288, 196, "intestin", "dg-lbl-xs", "end");
  body += arrow(130, 14, 112, 44, "dg-vec", "dg-vec-head", 7) + tx(150, 16, "1", "dg-lbl") + arrow(158, 30, 140, 4, "dg-blue-line", "dg-blue-fill", 7) + tx(170, 14, "2", "dg-lbl");
  body += arrow(186, 74, 198, 82, "dg-vec", "dg-vec-head", 7) + arrow(226, 116, 236, 124, "dg-vec", "dg-vec-head", 7) + tx(198, 132, "3", "dg-lbl");
  body += tx(8, 176, "1 : l’herbe avalée va dans la panse", "dg-lbl-xs", "start") + tx(8, 190, "2 : elle remonte dans la bouche (rumination)", "dg-lbl-xs", "start") + tx(8, 204, "3 : remâchée, elle passe au feuillet puis à la caillette", "dg-lbl-xs", "start");
  return svg(W, 214, "Estomac d’un ruminant à quatre poches : la panse, le bonnet, le feuillet et la caillette ; l’herbe avalée remonte dans la bouche pour être remâchée (rumination).", body);
})();

/** Trait de légende et texte centré dessous (légendes rangées sur plusieurs lignes). */
const note = (px: number, py: number, lx: number, ly: number, label: string) => ln(px, py, lx, ly - 7, "dg-leader") + dot(px, py, 1.8) + tx(lx, ly, label, "dg-lbl-xs");

/** Dentition d'un herbivore et d'un carnivore (demi-mâchoires vues de côté, schéma). */
const dentition = (() => {
  const incisor = (x: number, y: number) => rect(x, y, 9, 20, "dg-cell", 2);
  const molar = (x: number, y: number) => path(`M${x} ${y + 22}V${y + 4}l5 -4 5 4 5 -4 5 4 5 -4 5 4V${y + 22}Z`, "dg-cell");
  const canine = (x: number, y: number) => path(`M${x} ${y + 22}L${x + 7} ${y - 12}L${x + 14} ${y + 22}Z`, "dg-cell");
  const blade = (x: number, y: number) => path(`M${x} ${y + 22}L${x + 8} ${y}L${x + 16} ${y + 10}L${x + 26} ${y - 4}L${x + 34} ${y + 22}Z`, "dg-cell");
  let body = tx(150, 14, "herbivore (mouton)", "dg-lbl-sm");
  body += rect(10, 54, 280, 12, "dg-t-pink", 4);
  for (let i = 0; i < 3; i++) body += incisor(16 + i * 11, 34);
  for (let i = 0; i < 5; i++) body += molar(140 + i * 30, 32);
  body += note(30, 54, 42, 80, "incisives") + note(96, 60, 110, 94, "pas de canine") + note(214, 54, 232, 80, "molaires larges");
  body += tx(150, 108, "carnivore (chien)", "dg-lbl-sm");
  body += rect(10, 148, 280, 12, "dg-t-pink", 4);
  for (let i = 0; i < 3; i++) body += incisor(16 + i * 11, 128);
  body += canine(56, 126) + blade(150, 126) + molar(200, 126) + molar(234, 126);
  body += note(30, 148, 42, 174, "incisives") + note(63, 140, 112, 188, "canine pointue") + note(184, 140, 232, 174, "dents tranchantes");
  return svg(W, 196, "Dents d’un herbivore et d’un carnivore (schéma) : le mouton a des incisives coupantes, pas de canines et de larges molaires ; le chien a de longues canines pointues et des dents tranchantes.", body);
})();

const profilSol = (() => {
  const layers: [number, number, string, string][] = [
    [14, 12, "dg-t-green", "litière (feuilles mortes)"],
    [26, 40, "dg-t-sand", "horizon humifère (humus)"],
    [66, 46, "dg-t-pink", "horizon d’accumulation"],
    [112, 42, "dg-t-yellow", "roche altérée (fragments)"],
    [154, 34, "dg-t-grey", "roche mère"],
  ];
  let body = "";
  for (const [y, h, cls, label] of layers) body += rect(30, y, 100, h, cls) + callout(130, y + h / 2, 150, y + h / 2, label);
  // Fragments de roche et racines.
  for (const [x, y] of [[50, 124], [80, 134], [108, 122], [64, 144], [96, 148]] as Pt[]) body += rect(x, y, 12, 8, "dg-t-grey", 2);
  body += path("M70 26C66 40 74 52 68 64M98 26C102 44 94 54 100 70", "dg-ink-thin");
  body += arrow(16, 186, 16, 30, "dg-ink", "dg-pt", 7) + tx(22, 196, "le sol se forme à partir de la roche", "dg-lbl-xs", "start");
  return svg(W, 204, "Profil d’un sol, de haut en bas : litière, horizon riche en humus, horizon d’accumulation, roche altérée, roche mère.", body);
})();

const bocal = (() => {
  let body = path("M70 30V176Q70 186 80 186H170Q180 186 180 176V30", "dg-ink");
  const layers: [number, number, string, string][] = [
    [160, 24, "dg-t-grey", "graviers (au fond)"],
    [136, 24, "dg-t-sand", "sable"],
    [116, 20, "dg-t-yellow", "limon"],
    [100, 16, "dg-t-pink", "argile"],
    [50, 50, "dg-sea", "eau"],
  ];
  for (const [y, h, cls, label] of layers) body += rect(72, y, 106, h, cls) + callout(178, y + h / 2, 204, y + h / 2, label);
  for (const x of [84, 104, 130, 152]) body += path(`M${x} 50l6 -4 6 4 -6 3Z`, "dg-t-green");
  body += callout(116, 47, 204, 36, "humus (flotte)");
  for (let i = 0; i < 6; i++) body += circ(84 + i * 17, 172 + (i % 2) * 6, 5, "dg-t-grey");
  return svg(W, 196, "Bocal d’eau où l’on a agité un peu de terre puis laissé reposer : de bas en haut, graviers, sable, limon, argile, puis l’eau ; l’humus flotte.", body);
})();

const sedimentation = (() => {
  let body = rect(0, 0, W, 104, "dg-sea") + path("M0 22Q75 14 150 22T300 22", "dg-blue-line") + tx(292, 12, "mer", "dg-lbl-xs", "end");
  for (const [x, y] of [[60, 40], [120, 54], [180, 36], [236, 60], [90, 76], [210, 82]] as Pt[]) body += arrow(x, y, x + 4, y + 16, "dg-ink-thin", "dg-pt", 5);
  const layers: [number, string, string][] = [
    [104, "dg-t-yellow", "4 (la plus récente)"],
    [126, "dg-t-sand", "3"],
    [148, "dg-t-pink", "2"],
    [170, "dg-t-grey", "1 (la plus ancienne)"],
  ];
  for (const [y, cls, label] of layers) body += rect(0, y, 210, 22, cls) + tx(216, y + 11, label, "dg-lbl-xs", "start");
  // Coquille fossile dans la couche 2.
  body += path("M110 166c0-8 6-12 12-12s12 4 12 12z", "dg-cell") + path("M116 166l6-12M122 166v-12M128 166l-6-12", "dg-ink-thin") + callout(122, 160, 150, 202, "fossile (coquillage)");
  body += tx(6, 202, "débris → couches → roche", "dg-lbl-xs", "start");
  return svg(W, 210, "Sédimentation : des débris tombent au fond de la mer et forment des couches ; la couche du bas, déposée la première, est la plus ancienne. Un coquillage pris dans une couche devient un fossile.", body);
})();

// ── Histoire ────────────────────────────────────────────────────────────────

const empires = (() => {
  const f = frise({
    from: 700,
    to: 1700,
    step: 200,
    w: W,
    periods: [
      [750, 1076, "Ghana"],
      [1235, 1600, "Mali"],
      [1464, 1591, "Songhaï"],
    ],
    events: [
      [1076, "1076 : prise de Koumbi"],
      [1235, "1235 : Kirina"],
      [1324, "1324 : pèlerinage de Kankou Moussa"],
      [1591, "1591 : Tondibi"],
    ],
  });
  return svg(W, f.h, "Frise des empires du Soudan occidental de 700 à 1700 : le Ghana jusqu’à la prise de Koumbi (1076), le Mali à partir de Kirina (vers 1235), le Songhaï jusqu’à Tondibi (1591).", f.svg);
})();

// ── Géographie du Sénégal ──────────────────────────────────────────────────

const socle = (() => {
  const zone: [number, number][] = [[-12.95, 12.35], [-12.85, 13.1], [-12.35, 13.75], [-11.6, 14.25], [-11.3, 14.2], [-11.3, 12.35]];
  const [hx, hy] = geo(-12.25, 12.42);
  const extra =
    `<g clip-path="url(#sn-socle)"><path class="dg-zone" d="M${zone.map(([a, b]) => P(a, b)).join("L")}Z"/></g>` +
    path(`M${hx} ${hy - 7}l6 10h-12z`, "dg-pt") +
    `<text class="dg-map" x="${hx - 8}" y="${hy - 12}" text-anchor="end">≈ 600 m</text>`;
  return senegalMap({
    extra: senegalClip("sn-socle") + extra,
    cities: ["Dakar"],
    legend: [["dg-land", "bassin sédimentaire : plaines et plateaux bas"], ["dg-zone", "socle ancien : les reliefs les plus hauts"]],
    label: "Carte du Sénégal : presque tout le pays est un bassin sédimentaire de plaines et de plateaux bas ; le socle ancien n’apparaît qu’au sud-est, où sont les points les plus hauts (environ 600 m).",
  });
})();

const pluies = (() => {
  const extra =
    senegalClip("sn-pluies") +
    `<g clip-path="url(#sn-pluies)"><path class="dg-iso" d="${latLine(15.6, 15.3)}"/><path class="dg-iso" d="${latLine(13.15, 13.0)}"/></g>` +
    `<text class="dg-map" x="${geo(-13.6, 15.85)[0]}" y="${geo(-13.6, 15.85)[1]}" text-anchor="middle">moins de 400 mm</text>` +
    `<text class="dg-map" x="${geo(-13.3, 14.35)[0]}" y="${geo(-13.3, 14.35)[1]}" text-anchor="middle">400 à 1 000 mm</text>` +
    `<text class="dg-map" x="${geo(-13.4, 12.72)[0]}" y="${geo(-13.4, 12.72)[1]}" text-anchor="middle">plus de 1 000 mm</text>`;
  return senegalMap({
    extra,
    cities: ["Saint-Louis", "Kaolack", "Ziguinchor"],
    legend: [["dg-iso", "isohyète : ligne d’égales pluies (tracé approximatif)"]],
    label: "Carte des pluies du Sénégal : moins de 400 mm par an au nord, de 400 à 1 000 mm au centre, plus de 1 000 mm au sud. Les lignes d’égales pluies (isohyètes) sont tracées de façon approximative.",
  });
})();

const fleuves = (() => {
  const [gx, gy] = geo(-15.86, 16.2);
  const label = (lon: number, lat: number, t: string, anchor = "middle") => {
    const [x, y] = geo(lon, lat);
    return `<text class="dg-map" x="${x.toFixed(1)}" y="${y.toFixed(1)}" text-anchor="${anchor}" dominant-baseline="central">${t}</text>`;
  };
  const extra =
    `<ellipse class="dg-water" cx="${gx}" cy="${gy}" rx="3" ry="11"/>` +
    label(-15.98, 16.22, "lac de Guiers", "end") +
    label(-13.75, 15.75, "fleuve Sénégal", "end") +
    label(-11.9, 13.6, "Falémé", "end") +
    label(-13.1, 13.45, "Gambie") +
    label(-15.4, 12.48, "Casamance") +
    label(-16.25, 14.0, "Saloum", "end");
  return senegalMap({
    rivers: ["Sénégal", "Falémé", "Gambie", "Casamance", "Saloum"],
    extra,
    label: "Carte des cours d’eau du Sénégal : le fleuve Sénégal au nord avec la Falémé et le lac de Guiers, la Gambie, la Casamance au sud et l’estuaire du Saloum.",
  });
})();

/** Diagramme climatique : pluies en bâtons (échelle de gauche), températures en courbe (échelle de droite). */
function climogram(city: string, temp: number[], rain: number[], source: string): string {
  const left = 36;
  const right = W - 34;
  const top = 24;
  const bottom = 150;
  const Yp = (v: number) => bottom - (v / 500) * (bottom - top);
  const Yt = (v: number) => bottom - (v / 40) * (bottom - top);
  const bw = (right - left) / 12;
  let body = "";
  for (let v = 0; v <= 500; v += 100) body += ln(left, Yp(v), right, Yp(v), "dg-grid-light") + tx(left - 4, Yp(v), v, "dg-tick", "end");
  for (let v = 0; v <= 40; v += 10) body += tx(right + 4, Yt(v), v, "dg-tick", "start");
  rain.forEach((v, i) => (body += rect(left + i * bw + bw * 0.15, Yp(v), bw * 0.7, bottom - Yp(v), "dg-bar")));
  body += path(`M${temp.map((v, i) => `${(left + i * bw + bw / 2).toFixed(1)} ${Yt(v).toFixed(1)}`).join("L")}`, "dg-curve-alt");
  "JFMAMJJASOND".split("").forEach((m, i) => (body += tx(left + i * bw + bw / 2, bottom + 10, m, "dg-tick")));
  body += ln(left, bottom, right, bottom, "dg-axis-line") + ln(left, top - 6, left, bottom, "dg-axis-line") + ln(right, top - 6, right, bottom, "dg-axis-line");
  body += tx(left - 2, 10, "pluies (mm)", "dg-lbl-xs", "start") + tx(right + 2, 10, "°C", "dg-lbl-xs", "end") + tx(150, 10, city, "dg-lbl-sm");
  const total = Math.round(rain.reduce((a, b) => a + b, 0));
  body += tx(150, 176, `total des pluies : environ ${String(total).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} mm par an`, "dg-lbl-xs") + `<text class="dg-source" x="4" y="192" dominant-baseline="central">${source}</text>`;
  return svg(W, 198, `Diagramme climatique de ${city} : pluies mensuelles en bâtons bleus, température moyenne en courbe rouge ; il pleut surtout de juillet à octobre (environ ${total} mm par an).`, body);
}

const climatDakar = climogram(
  "Dakar",
  [19.9, 20.5, 20.9, 21.4, 22.7, 25.5, 26.9, 27.3, 27.4, 27.4, 25.4, 22.5],
  [2, 1, 0, 0, 0, 10, 61, 165, 134, 37, 1, 1],
  "Normales 1961-1990, aéroport de Dakar : Deutscher Wetterdienst",
);

// Ziguinchor : température moyenne = moyenne des maxima et des minima mensuels.
const ZIG_MAX = [34.1, 36.7, 38.4, 38.4, 37.2, 35.5, 33.1, 32.3, 33.0, 34.4, 34.6, 33.7];
const ZIG_MIN = [17.8, 18.7, 19.7, 20.4, 22.1, 24.1, 23.9, 23.7, 23.5, 23.7, 21.7, 18.7];
const climatZiguinchor = climogram(
  "Ziguinchor",
  ZIG_MAX.map((v, i) => (v + ZIG_MIN[i]!) / 2),
  [4.9, 0.2, 0, 0, 2.9, 93.1, 341.1, 480.7, 358.6, 113.5, 6.1, 0.1],
  "Normales 1991-2020 (OMM) : NOAA",
);

/** Pyramide des âges d'une population jeune (schéma de l'allure, sans chiffres). */
const pyramide = (() => {
  const groups = 9;
  const h = 15;
  const cx = 150;
  let body = "";
  for (let i = 0; i < groups; i++) {
    const w = 118 * Math.exp(-0.27 * i);
    const y = 150 - (i + 1) * h;
    body += rect(cx - w, y, w - 1, h - 2, "dg-t-blue") + rect(cx + 1, y, w * 0.98, h - 2, "dg-t-red");
  }
  body += ln(cx, 156, cx, 6, "dg-axis-line") + tx(cx - 70, 166, "hommes", "dg-lbl-xs") + tx(cx + 70, 166, "femmes", "dg-lbl-xs");
  body += tx(8, 142, "jeunes", "dg-lbl-xs", "start") + tx(8, 20, "âgés", "dg-lbl-xs", "start") + arrow(14, 132, 14, 30, "dg-ink-thin", "dg-pt", 6);
  body += tx(150, 182, "base large : beaucoup de jeunes", "dg-lbl-xs") + tx(150, 196, "sommet étroit : peu de personnes âgées", "dg-lbl-xs");
  return svg(W, 204, "Allure de la pyramide des âges d’une population jeune comme celle du Sénégal (schéma) : une base très large, beaucoup de jeunes, et un sommet étroit, peu de personnes âgées.", body);
})();

const densites = senegalMap({
  fills: { Dakar: "dg-zone", Thiès: "dg-zone", Diourbel: "dg-zone", Tambacounda: "dg-t-blue", Kédougou: "dg-t-blue", Matam: "dg-t-blue" },
  cities: ["Dakar", "Touba", "Tambacounda"],
  legend: [["dg-zone", "fortes densités (ouest)"], ["dg-t-blue", "faibles densités (est)"]],
  label: "Carte du Sénégal : les régions les plus densément peuplées sont à l’ouest (Dakar, Thiès, Diourbel) ; les moins peuplées à l’est (Tambacounda, Kédougou, Matam).",
});

export const SCHEMAS_5E: Record<string, string> = {
  "m5-addition-relatifs": additionRelatifs,
  "m5-fractions": fractions,
  "m5-quadrants": quadrants,
  "m5-angles-paralleles": anglesParalleles,
  "m5-construire-triangle": construireTriangle,
  "m5-mediatrices": mediatrices,
  "m5-hauteurs": hauteurs,
  "m5-parallelogramme": parallelogramme,
  "m5-symetrie-centrale": symetrieCentrale,
  "m5-prisme": prisme,
  "s5-dentition": dentition,
  "s5-ruminant": ruminant,
  "s5-profil-sol": profilSol,
  "s5-bocal-sol": bocal,
  "s5-sedimentation": sedimentation,
  "h5-empires": empires,
  "g5-socle": socle,
  "g5-pluies": pluies,
  "g5-fleuves": fleuves,
  "g5-climat-dakar": climatDakar,
  "g5-climat-ziguinchor": climatZiguinchor,
  "g5-pyramide": pyramide,
  "g5-densites": densites,
};
