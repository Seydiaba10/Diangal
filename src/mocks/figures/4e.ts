// Schémas des leçons de 4e : intervalles, application linéaire, statistique, positions de cercles,
// bissectrice et tangente, droite des milieux, médianes, Pythagore, hauteur relative à l'hypoténuse,
// translation, vecteurs, arc, rotation, polygone régulier, projection, repère, section de sphère ;
// histoire-géographie (commerce triangulaire, organisations régionales, Afrique, continents).
// Les schémas de sciences sont dans 4e-sciences.ts.

import { svg } from "../drawings";
import { SCHEMAS_4E_SCIENCES } from "./4e-sciences";
import {
  angleArc,
  arrow,
  bars,
  circ,
  dot,
  ell,
  ln,
  mid,
  onCircle,
  path,
  plot,
  poly,
  type Pt,
  project,
  pt,
  rightAngle,
  rotate,
  seg,
  ticks,
  tx,
  vecAB,
} from "./kit";
import { AES, ECOWAS, place, route, worldMap } from "./world";

const W = 300;

// ── Nombres et fonctions ────────────────────────────────────────────────────

const intervalle = (() => {
  const X = (v: number) => 30 + ((v + 1) / 7) * 240;
  const y = 50;
  let b = arrow(14, y, 292, y, "dg-axis-line", "dg-pt", 7);
  for (let v = -1; v <= 6; v++) b += ln(X(v), y - 4, X(v), y + 4, "dg-axis-line") + tx(X(v), y + 16, String(v).replace("-", "−"), "dg-tick");
  b += ln(X(1), y, X(4), y, "dg-interval");
  b += path(`M${X(1) + 6} ${y - 12}H${X(1)}V${y + 12}H${X(1) + 6}`, "dg-bracket") + path(`M${X(4) + 6} ${y - 12}H${X(4)}V${y + 12}H${X(4) + 6}`, "dg-bracket");
  b += tx((X(1) + X(4)) / 2, 18, "x ≥ 1 et x < 4 : x ∈ [1 ; 4[", "dg-lbl-sm") + tx(X(4), 84, "4 exclu", "dg-lbl-xs") + tx(X(1), 84, "1 inclus", "dg-lbl-xs");
  return svg(W, 94, "Droite graduée : l’intervalle [1 ; 4[ est colorié ; le crochet tourné vers l’intervalle en 1 montre que 1 est inclus, le crochet tourné vers l’extérieur en 4 montre que 4 est exclu.", b);
})();

const lineaire = plot(
  { x: [0, 7], y: [0, 10.5], unit: 34, unitY: 18, ticksX: [1, 2, 3, 4, 5, 6, 7], ticksY: [3, 6, 9], labelX: "m", labelY: "prix (milliers de F)", grid: 1 },
  "Représentation de f(x) = 1 500x : une droite qui passe par l’origine ; 4 m coûtent 6 000 F et 9 000 F correspondent à 6 m.",
  (p) =>
    p.line(1.5, 0) +
    p.guides(4, 6) +
    p.guides(6, 9) +
    p.point(4, 6, "", 0, 0) +
    p.point(6, 9, "", 0, 0) +
    p.text(4.6, 5.3, "f(4) = 6 000", "dg-lbl-xs", "start") +
    p.text(3.6, 9.3, "f(6) = 9 000", "dg-lbl-xs", "end"),
);

const diagrammeBatons = (() => {
  const b = bars({ labels: ["8", "10", "12", "14", "16"], values: [2, 4, 2, 1, 1], max: 4, step: 1, w: W, h: 170, unit: "effectif" });
  return svg(W, 186, "Diagramme en bâtons des notes : 8 (2 élèves), 10 (4), 12 (2), 14 (1), 16 (1). Le mode est 10.", b + tx(170, 178, "note", "dg-lbl-xs"));
})();

// ── Distance, cercles, droites remarquables ────────────────────────────────

const cercles = (() => {
  // Rayons r = 15 et r′ = 8 ; distance d des centres pour chaque cas.
  const r = 15;
  const r2 = 8;
  const cases: [number, string][] = [[28, "extérieurs"], [r + r2, "tangents ext."], [13, "sécants"], [r - r2, "tangents int."], [3, "intérieur"]];
  let b = "";
  cases.forEach(([d, name], i) => {
    const cx = 30 + i * 60;
    const c1: Pt = [cx - d / 2, 50];
    const c2: Pt = [cx + d / 2, 50];
    b += circ(c1[0], c1[1], r, "dg-geo") + circ(c2[0], c2[1], r2, "dg-geo-line") + dot(c1[0], 50, 1.8) + dot(c2[0], 50, 1.8);
    b += tx(cx, 86, name, "dg-lbl-xs");
  });
  b += tx(150, 108, "d = distance des centres ; r et r′ : rayons", "dg-lbl-xs");
  return svg(W, 116, "Positions de deux cercles selon la distance d de leurs centres : extérieurs (d > r + r′), tangents extérieurement (d = r + r′), sécants, tangents intérieurement (d = r − r′), l’un à l’intérieur de l’autre.", b);
})();

const bissectriceTangente = (() => {
  // À gauche : angle xOy, sa bissectrice, un point M à égale distance des deux côtés.
  const O: Pt = [20, 150];
  const X: Pt = [140, 150];
  const Y = onCircle(O, 130, 56);
  const bis = onCircle(O, 130, 28);
  const M = onCircle(O, 90, 28);
  const H1 = project(M, O, X);
  const H2 = project(M, O, Y);
  let b = seg(O, X) + seg(O, Y) + seg(O, bis, "dg-geo-line") + angleArc(O, X, bis, 30, "", "dg-arc") + angleArc(O, bis, Y, 36, "", "dg-arc");
  b += seg(M, H1, "dg-dash") + seg(M, H2, "dg-dash") + rightAngle(H1, O, M, 6) + rightAngle(H2, O, M, 6) + ticks(M, H1) + ticks(M, H2);
  b += pt(M, "M", "e") + pt(H1, "H", "s") + pt(H2, "K", "nw") + tx(O[0] - 2, O[1] - 12, "O", "dg-lbl-math") + tx(80, 176, "bissectrice : MH = MK", "dg-lbl-xs");
  // À droite : cercle et tangente en A.
  const C: Pt = [226, 82];
  const A = onCircle(C, 46, -50);
  const dir: Pt = [Math.cos((40 * Math.PI) / 180), -Math.sin((40 * Math.PI) / 180)];
  const T1: Pt = [A[0] - dir[0] * 60, A[1] - dir[1] * 60];
  const T2: Pt = [A[0] + dir[0] * 50, A[1] + dir[1] * 50];
  b += circ(C[0], C[1], 46, "dg-geo") + seg(C, A, "dg-vec") + seg(T1, T2, "dg-geo-line") + rightAngle(A, C, T2, 7) + pt(C, "O", "nw") + pt(A, "A", "se");
  b += tx(226, 172, "tangente en A ⊥ rayon [OA]", "dg-lbl-xs");
  return svg(W, 182, "À gauche, un point M de la bissectrice de l’angle de sommet O est à la même distance des deux côtés. À droite, la tangente au cercle en A est perpendiculaire au rayon [OA].", b);
})();

const droiteMilieux = (() => {
  const A: Pt = [120, 20];
  const B: Pt = [24, 168];
  const C: Pt = [264, 168];
  const I = mid(A, B);
  const J = mid(A, C);
  let b = poly([A, B, C]) + seg(I, J, "dg-curve") + ticks(A, I) + ticks(I, B) + ticks(A, J, 2) + ticks(J, C, 2);
  b += pt(A, "A", "n") + pt(B, "B", "sw") + pt(C, "C", "se") + pt(I, "I", "w") + pt(J, "J", "e");
  b += tx(144, 184, "BC = 8 cm", "dg-lbl-sm") + tx(192, 84, "IJ = 4 cm", "dg-lbl-sm", "start");
  return svg(W, 194, "Dans le triangle ABC, I est le milieu de [AB] et J celui de [AC] : la droite (IJ) est parallèle à (BC) et IJ est la moitié de BC.", b);
})();

const medianes = (() => {
  const A: Pt = [110, 18];
  const B: Pt = [20, 170];
  const C: Pt = [276, 170];
  const A2 = mid(B, C);
  const B2 = mid(A, C);
  const C2 = mid(A, B);
  const G: Pt = [(A[0] + B[0] + C[0]) / 3, (A[1] + B[1] + C[1]) / 3];
  let b = poly([A, B, C]) + seg(A, A2, "dg-curve") + seg(B, B2, "dg-curve") + seg(C, C2, "dg-curve");
  b += ticks(B, A2) + ticks(A2, C) + ticks(A, B2, 2) + ticks(B2, C, 2) + ticks(A, C2, 3) + ticks(C2, B, 3);
  b += pt(A, "A", "n") + pt(B, "B", "sw") + pt(C, "C", "se") + pt(A2, "A′", "s") + pt(G, "G", "e");
  b += tx(150, 192, "AG = 2/3 de AA′", "dg-lbl-sm");
  return svg(W, 200, "Les trois médianes du triangle ABC (chacune joint un sommet au milieu du côté opposé) se coupent au centre de gravité G, situé aux deux tiers de chaque médiane en partant du sommet.", b);
})();

/** Pythagore : triangle 6-8-10 (1 cm = 9 px) et les carrés construits sur ses côtés. */
const pythagore = (() => {
  const u = 9;
  const A: Pt = [70, 150];
  const B: Pt = [A[0], A[1] - 6 * u];
  const C: Pt = [A[0] + 8 * u, A[1]];
  /** Carré construit sur [pq], du côté opposé au troisième sommet t (à l'extérieur du triangle). */
  const sq = (p: Pt, q: Pt, t: Pt, cls: string) => {
    let n: Pt = [q[1] - p[1], p[0] - q[0]];
    if ((t[0] - p[0]) * n[0] + (t[1] - p[1]) * n[1] > 0) n = [-n[0], -n[1]];
    return poly([p, q, [q[0] + n[0], q[1] + n[1]], [p[0] + n[0], p[1] + n[1]]], cls);
  };
  let b = sq(A, B, C, "dg-t-blue") + sq(A, C, B, "dg-t-red") + sq(B, C, A, "dg-t-yellow") + poly([A, B, C], "dg-geo") + rightAngle(A, B, C, 8);
  b += pt(A, "A", "sw") + pt(B, "B", "nw") + pt(C, "C", "se");
  b += tx(A[0] - 27, (A[1] + B[1]) / 2, "36", "dg-lbl") + tx((A[0] + C[0]) / 2, A[1] + 36, "64", "dg-lbl") + tx(A[0] + 4 * u + 3 * u + 10, A[1] - 3 * u - 4 * u + 6, "100", "dg-lbl");
  b += tx(10, 230, "AB = 6, AC = 8 : BC² = 36 + 64 = 100, BC = 10", "dg-lbl-xs", "start");
  return svg(W, 238, "Théorème de Pythagore : dans le triangle ABC rectangle en A (AB = 6 cm, AC = 8 cm), l’aire du carré construit sur l’hypoténuse (100) est la somme des aires des deux autres (36 + 64).", b);
})();

const hauteurHypotenuse = (() => {
  const u = 24;
  const B: Pt = [20, 150];
  const C: Pt = [20 + 10 * u, 150];
  // A tel que AB = 6 u et AC = 8 u : HB = 3,6 u, AH = 4,8 u.
  const H: Pt = [B[0] + 3.6 * u, 150];
  const A: Pt = [H[0], 150 - 4.8 * u];
  let b = poly([A, B, C]) + seg(A, H, "dg-curve") + rightAngle(A, B, C, 8) + rightAngle(H, C, A, 8);
  b += pt(A, "A", "n") + pt(B, "B", "sw") + pt(C, "C", "se") + pt(H, "H", "s");
  b += tx((A[0] + B[0]) / 2 - 10, (A[1] + B[1]) / 2, "6", "dg-lbl") + tx((A[0] + C[0]) / 2 + 10, (A[1] + C[1]) / 2 - 4, "8", "dg-lbl") + tx(H[0] + 14, 104, "4,8", "dg-lbl-sm", "start");
  b += tx(150, 178, "AB × AC = AH × BC : 6 × 8 = 4,8 × 10", "dg-lbl-sm");
  return svg(W, 188, "Triangle ABC rectangle en A, de côtés 6, 8 et 10 ; la hauteur [AH] issue de A mesure 4,8, car 6 × 8 = 4,8 × 10 (deux calculs de l’aire).", b);
})();

const translation = (() => {
  const A: Pt = [30, 160];
  const B: Pt = [130, 120];
  const u: Pt = [B[0] - A[0], B[1] - A[1]];
  const tri: Pt[] = [[40, 60], [80, 30], [96, 78]];
  const img = tri.map(([x, y]) => [x + u[0], y + u[1]] as Pt);
  let b = vecAB(A, B, "u", "n") + pt(A, "A", "w") + pt(B, "B", "e");
  b += poly(tri, "dg-geo-fill") + poly(img, "dg-geo-fill");
  tri.forEach((p, i) => (b += seg(p, img[i]!, "dg-dash-thin")));
  b += tx(tri[0]![0] - 10, tri[0]![1], "M", "dg-lbl-math") + tx(img[0]![0] + 12, img[0]![1] - 4, "M′", "dg-lbl-math");
  b += tx(150, 186, "même direction, même sens, même longueur que AB", "dg-lbl-xs");
  return svg(W, 194, "Translation qui transforme A en B : chaque point du triangle glisse de la même façon (même direction, même sens, même longueur) ; ABM′M est un parallélogramme.", b);
})();

const vecteurs = (() => {
  const A: Pt = [30, 140];
  const B: Pt = [170, 140];
  const C: Pt = [260, 50];
  const D: Pt = [120, 50];
  let b = poly([A, B, C, D], "dg-geo-fill") + vecAB(A, B, "", "s") + vecAB(D, C, "", "n");
  b += pt(A, "A", "sw") + pt(B, "B", "se") + pt(C, "C", "ne") + pt(D, "D", "nw");
  b += tx(150, 172, "vecteur AB = vecteur DC : ABCD est un parallélogramme", "dg-lbl-xs");
  return svg(W, 182, "Les vecteurs AB et DC sont égaux (même direction, même sens, même longueur) : ABCD est un parallélogramme.", b);
})();

const arc = (() => {
  const O: Pt = [110, 110];
  const r = 84;
  const A = onCircle(O, r, 10);
  const B = onCircle(O, r, 70);
  let b = circ(O[0], O[1], r, "dg-geo") + seg(O, A) + seg(O, B) + path(`M${A[0]} ${A[1]}A${r} ${r} 0 0 0 ${B[0]} ${B[1]}`, "dg-arc-thick") + angleArc(O, A, B, 24, "60°", "dg-arc", 14);
  b += pt(O, "O", "sw") + pt(A, "A", "e") + pt(B, "B", "ne") + tx(O[0] + r / 2 - 4, O[1] + 12, "r = 6 cm", "dg-lbl-xs");
  b += tx(150, 206, "ℓ = 2π × 6 × 60 ÷ 360 ≈ 6,28 cm", "dg-lbl-sm");
  return svg(W, 216, "Arc AB intercepté par un angle au centre de 60° dans un cercle de rayon 6 cm : sa longueur est 2π × 6 × 60 ÷ 360, environ 6,28 cm.", b);
})();

const rotation = (() => {
  const O: Pt = [140, 150];
  const M: Pt = [250, 130];
  const M2 = rotate(M, O, 70);
  let b = seg(O, M, "dg-dash") + seg(O, M2, "dg-dash") + angleArc(O, M, M2, 40, "70°", "dg-arc", 14);
  const r = Math.hypot(M[0] - O[0], M[1] - O[1]);
  b += path(`M${M[0]} ${M[1]}A${r} ${r} 0 0 0 ${M2[0]} ${M2[1]}`, "dg-compass") + ticks(O, M) + ticks(O, M2);
  b += pt(O, "O", "s", true) + pt(M, "M", "e") + pt(M2, "M′", "n");
  b += tx(150, 182, "OM′ = OM et l’angle MOM′ = 70°", "dg-lbl-sm");
  return svg(W, 192, "Rotation de centre O et d’angle 70° (sens inverse des aiguilles d’une montre) : M′ est sur le cercle de centre O passant par M, avec un angle MOM′ de 70°.", b);
})();

const hexagone = (() => {
  const O: Pt = [150, 98];
  const r = 80;
  const P = [0, 60, 120, 180, 240, 300].map((d) => onCircle(O, r, d));
  let b = circ(O[0], O[1], r, "dg-geo-line") + poly(P, "dg-geo-fill") + seg(O, P[0]!) + seg(O, P[1]!) + angleArc(O, P[0]!, P[1]!, 22, "60°", "dg-arc", 13);
  b += ticks(P[0]!, P[1]!) + ticks(O, P[0]!) + ticks(O, P[1]!) + pt(O, "O", "s");
  b += tx(150, 192, "côté = rayon ; angle au centre 360° ÷ 6 = 60°", "dg-lbl-xs");
  return svg(W, 200, "Hexagone régulier inscrit dans un cercle : six angles au centre de 60° ; chaque côté est égal au rayon.", b);
})();

const projection = (() => {
  const d1: Pt = [10, 150];
  const d2: Pt = [290, 120];
  const A: Pt = [70, 40];
  const B: Pt = [220, 70];
  const [A2, B2] = [project(A, d1, d2), project(B, d1, d2)];
  const I = mid(A, B);
  const I2 = project(I, d1, d2);
  let b = seg(d1, d2, "dg-geo-line") + tx(286, 108, "(D)", "dg-lbl-math", "end") + seg(A, B);
  b += seg(A, A2, "dg-dash") + seg(B, B2, "dg-dash") + seg(I, I2, "dg-dash") + rightAngle(A2, d2, A, 7) + rightAngle(B2, d2, B, 7);
  b += seg(A2, B2, "dg-curve") + pt(A, "A", "n") + pt(B, "B", "n") + pt(I, "I", "n") + pt(A2, "A′", "s") + pt(B2, "B′", "s") + pt(I2, "I′", "s");
  return svg(W, 172, "Projection orthogonale sur la droite (D) : A′, B′ et I′ sont les projetés de A, B et du milieu I de [AB] ; I′ est le milieu de [A′B′].", b);
})();

const milieuDistance = plot(
  { x: [0, 5], y: [0, 7], unit: 30, labelX: "x", labelY: "y" },
  "Repère : A(1 ; 2), B(4 ; 6), leur milieu I(2,5 ; 4). Le triangle rectangle de côtés 3 et 4 montre que AB = 5.",
  (p) =>
    p.seg(1, 2, 4, 6, "dg-curve") +
    p.seg(1, 2, 4, 2, "dg-dash") +
    p.seg(4, 2, 4, 6, "dg-dash") +
    p.text(2.5, 1.6, "3", "dg-lbl-sm") +
    p.text(4.25, 4, "4", "dg-lbl-sm") +
    p.point(1, 2, "A", -10, -8) +
    p.point(4, 6, "B", 10, -4) +
    p.point(2.5, 4, "I", -10, -8) +
    p.text(2.2, 5, "AB = 5", "dg-lbl-sm", "end"),
);

const sectionSphere = (() => {
  const O: Pt = [110, 110];
  const R = 80;
  const d = (3 / 5) * R;
  const r = (4 / 5) * R;
  let b = circ(O[0], O[1], R, "dg-solid-face") + ell(O[0], O[1] - d, r, r * 0.25, "dg-section") + seg(O, [O[0], O[1] - d], "dg-dash") + seg([O[0], O[1] - d], [O[0] + r, O[1] - d], "dg-vec") + seg(O, [O[0] + r, O[1] - d], "dg-geo-line");
  b += rightAngle([O[0], O[1] - d], O, [O[0] + r, O[1] - d], 6) + pt(O, "O", "s");
  b += tx(O[0] - 8, O[1] - d / 2, "3", "dg-lbl-sm", "end") + tx(O[0] + r / 2, O[1] - d - 10, "r = 4", "dg-lbl-sm") + tx(O[0] + r / 2 + 14, O[1] - d / 2 + 4, "R = 5", "dg-lbl-sm", "start");
  b += tx(250, 150, "r² = 5² − 3²", "dg-lbl-sm") + tx(250, 168, "r = 4 cm", "dg-lbl-sm");
  return svg(W, 200, "Section d’une sphère de rayon 5 cm par un plan situé à 3 cm du centre : c’est un cercle de rayon 4 cm, car r² = 5² − 3² = 16.", b);
})();

// ── Histoire-géographie ─────────────────────────────────────────────────────

const commerceTriangulaire = worldMap({
  view: { lon: [-100, 30], lat: [-35, 60], w: W },
  legend: [
    ["dg-vec", "1. Europe → Afrique : pacotilles, armes, tissus"],
    ["dg-vec-thick", "2. Afrique → Amérique : captifs africains"],
    ["dg-route-3", "3. Amérique → Europe : sucre, coton, café"],
  ],
  label: "Le commerce triangulaire (XVIe-XIXe siècles) : des navires partent d’Europe avec des marchandises vers l’Afrique, y achètent des captifs déportés vers l’Amérique, puis rapportent en Europe sucre, coton, café et tabac.",
  extra: (p) =>
    route(p, [-2, 46], [-15, 13], -18) +
    route(p, [-14, 10], [-45, -6], 16, "dg-vec-thick") +
    route(p, [-62, 14], [-6, 44], 24, "dg-route-3", "dg-route-3-head") +
    place(p, 10, 52, "Europe") +
    place(p, 15, 8, "Afrique") +
    place(p, -70, 0, "Amérique") +
    place(p, -24, -14, "océan Atlantique", "middle", "dg-map-sea"),
});

const integrationOuest = worldMap({
  view: { lon: [-19, 16], lat: [3, 26], w: W, cos: true },
  fills: { ...Object.fromEntries(ECOWAS.map((c) => [c, "dg-m3"])), ...Object.fromEntries(AES.map((c) => [c, "dg-m1"])) },
  legend: [
    ["dg-m3", "CEDEAO (avec le Cap-Vert, archipel non dessiné)"],
    ["dg-m1", "Alliance des États du Sahel (sortie de la CEDEAO en 2025)"],
  ],
  rivers: ["Niger", "Sénégal", "Volta", "Bénoué"],
  label: "Afrique de l’Ouest : les pays de la CEDEAO en jaune ; le Mali, le Burkina Faso et le Niger, en bleu, l’ont quittée en 2025 pour former l’Alliance des États du Sahel.",
  extra: (p) => place(p, -14.5, 14.5, "Sénégal") + place(p, -2, 17, "Mali") + place(p, 9, 16.5, "Niger") + place(p, 8, 9, "Nigeria") + place(p, -1.5, 12, "Burkina", "middle", "dg-map-small"),
});

const afriquePhysique = worldMap({
  view: { lon: [-19, 53], lat: [-36, 38], w: W, cos: true },
  continent: ["Afrique", "dg-land"],
  rivers: ["Nil", "Nil Bleu", "Niger", "Bénoué", "Congo", "Oubangui", "Zambèze", "Orange", "Limpopo", "Sénégal", "Volta", "Okavango"],
  lakes: true,
  label: "Afrique : les grands fleuves (Nil, Niger, Congo, Zambèze, Orange), les grands lacs de l’Est et le Sahara au nord.",
  extra: (p) =>
    place(p, 10, 24, "Sahara") +
    place(p, 31, 24, "Nil", "start", "dg-map-river") +
    place(p, -4, 15, "Niger", "middle", "dg-map-river") +
    place(p, 20, -1, "Congo", "middle", "dg-map-river") +
    place(p, 30, -14, "Zambèze", "middle", "dg-map-river") +
    place(p, 34, -2, "lac Victoria", "start", "dg-map-small") +
    place(p, 22, -25, "Kalahari") +
    place(p, -10, -10, "océan Atlantique", "middle", "dg-map-sea") +
    place(p, 46, -27, "océan Indien", "end", "dg-map-sea"),
});

const continent = (name: string, label: string) =>
  worldMap({ view: { lon: [-170, 180], lat: [-56, 78], w: W }, continent: [name, "dg-hl"], label, legend: [["dg-hl", name]] });

export const SCHEMAS_4E: Record<string, string> = {
  "m4-intervalle": intervalle,
  "m4-lineaire": lineaire,
  "m4-batons": diagrammeBatons,
  "m4-cercles": cercles,
  "m4-bissectrice-tangente": bissectriceTangente,
  "m4-droite-milieux": droiteMilieux,
  "m4-medianes": medianes,
  "m4-pythagore": pythagore,
  "m4-hauteur-hypotenuse": hauteurHypotenuse,
  "m4-translation": translation,
  "m4-vecteurs": vecteurs,
  "m4-arc": arc,
  "m4-rotation": rotation,
  "m4-hexagone": hexagone,
  "m4-projection": projection,
  "m4-milieu-distance": milieuDistance,
  "m4-section-sphere": sectionSphere,
  "h4-commerce-triangulaire": commerceTriangulaire,
  "g4-afrique-ouest": integrationOuest,
  "g4-afrique-physique": afriquePhysique,
  "g4-europe": continent("Europe", "Planisphère : l’Europe en couleur, jusqu’à l’Oural (limite approximative à 60° E)."),
  "g4-amerique": continent("Amérique", "Planisphère : l’Amérique, du Canada à l’Argentine, en couleur."),
  "g4-asie": continent("Asie", "Planisphère : l’Asie, le continent le plus vaste et le plus peuplé, en couleur (à l’est de l’Oural pour la Russie)."),
  "g4-oceanie": continent("Océanie", "Planisphère : l’Océanie, l’Australie et les îles du Pacifique, en couleur."),
  ...SCHEMAS_4E_SCIENCES,
};

