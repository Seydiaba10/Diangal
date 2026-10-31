// Schémas des leçons de 3e : identités remarquables, fonctions affines, systèmes, demi-plan, fonction
// affine par intervalles, diagramme circulaire, Thalès, trigonométrie, vecteurs, droites, angles inscrits,
// pyramide et cône, sections, réduction ; histoire-géographie (Afrique en 1914, indépendances, frises,
// Nord et Sud, réchauffement climatique). Les schémas de sciences sont dans 3e-sciences.ts.

import { svg } from "../drawings";
import { SCHEMAS_3E_SCIENCES } from "./3e-sciences";
import {
  angleArc,
  arrow,
  circ,
  cone,
  ell,
  frise,
  onCircle,
  path,
  plot,
  poly,
  type Pt,
  pt,
  pyramid,
  rect,
  rightAngle,
  seg,
  tx,
  vecAB,
} from "./kit";
import { worldMap } from "./world";

const W = 300;

// ── Calcul et fonctions ─────────────────────────────────────────────────────

/** (a + b)² = a² + 2ab + b² : un carré de côté a + b découpé en quatre. */
const identite = (() => {
  const a = 110;
  const b2 = 60;
  const x = 60;
  const y = 16;
  let b = rect(x, y, a, a, "dg-t-blue") + rect(x + a, y, b2, a, "dg-t-yellow") + rect(x, y + a, a, b2, "dg-t-yellow") + rect(x + a, y + a, b2, b2, "dg-t-red");
  b += tx(x + a / 2, y + a / 2, "a²", "dg-lbl") + tx(x + a + b2 / 2, y + a / 2, "ab", "dg-lbl") + tx(x + a / 2, y + a + b2 / 2, "ab", "dg-lbl") + tx(x + a + b2 / 2, y + a + b2 / 2, "b²", "dg-lbl");
  b += tx(x + a / 2, y + a + b2 + 12, "a", "dg-lbl-math") + tx(x + a + b2 / 2, y + a + b2 + 12, "b", "dg-lbl-math") + tx(x - 10, y + a / 2, "a", "dg-lbl-math") + tx(x - 10, y + a + b2 / 2, "b", "dg-lbl-math");
  b += tx(150, 214, "(a + b)² = a² + 2ab + b²", "dg-lbl-sm");
  return svg(W, 224, "Un carré de côté a + b se découpe en un carré a², un carré b² et deux rectangles ab : (a + b)² = a² + 2ab + b².", b);
})();

const affines = plot(
  { x: [-2, 4], y: [-3, 5], unit: 34, unitY: 22, labelX: "x", labelY: "y" },
  "Deux droites : f(x) = 2x − 1 « monte » (a = 2 > 0), g(x) = −x + 3 « descend » (a = −1 < 0).",
  (p) =>
    p.line(2, -1) +
    p.line(-1, 3, "dg-curve-alt") +
    p.point(0, -1, "", 0, 0) +
    p.point(1, 1, "", 0, 0) +
    p.text(2.05, 4.0, "f(x) = 2x − 1", "dg-lbl-sm", "end") +
    p.text(-1.2, 4.6, "g(x) = −x + 3", "dg-lbl-sm", "start"),
);

const systeme = plot(
  { x: [0, 900], y: [0, 1600], unit: 0.3, unitY: 0.13, ticksX: [200, 400, 600, 800], ticksY: [500, 700, 1000, 1500], grid: false, labelX: "x", labelY: "y", pad: 34 },
  "Le système 2x + y = 1 500 et x + 2y = 1 800 représenté par deux droites : elles se coupent au point (400 ; 700).",
  (p) =>
    p.line(-2, 1500) +
    p.line(-0.5, 900, "dg-curve-alt") +
    p.guides(400, 700) +
    p.point(400, 700, "(400 ; 700)", 8, -12) +
    p.text(700, 300, "2x + y = 1 500", "dg-lbl-xs", "start") +
    p.text(560, 520, "x + 2y = 1 800", "dg-lbl-xs", "start"),
);

const demiPlan = plot(
  { x: [-1, 4], y: [-1, 5], unit: 40, unitY: 30, labelX: "x", labelY: "y" },
  "Inéquation 2x + y − 4 > 0 : la droite frontière y = −2x + 4 ; l’origine ne vérifie pas l’inéquation, la partie hachurée (qui contient O) ne convient pas.",
  (p) => {
    let hatch = "";
    for (let k = -6; k < 6; k += 0.35) hatch += p.seg(k, -1, k + 3, 5, "dg-hatch-line");
    const clip = `<clipPath id="pas-solution"><path d="M${p.X(-1)} ${p.Y(5)}L${p.X(-1)} ${p.Y(-1)}L${p.X(2.5)} ${p.Y(-1)}L${p.X(0.5)} ${p.Y(3)}L${p.X(-0.5)} ${p.Y(5)}Z"/></clipPath>`;
    return clip + `<g clip-path="url(#pas-solution)">${hatch}</g>` + p.line(-2, 4) + p.point(0, 0, "", 0, 0) + p.text(2.9, 3.6, "solutions", "dg-lbl-sm") + p.text(2.9, 3.05, "2x + y > 4", "dg-lbl-xs");
  },
);

const taxi = plot(
  { x: [0, 16], y: [0, 4], unit: 16, unitY: 40, ticksX: [2, 4, 6, 8, 10, 12, 14], ticksY: [0.5, 1.5, 2.5, 3.5], grid: false, labelX: "km", labelY: "prix (milliers de F)" },
  "Prix d’une course de taxi : 500 F de prise en charge puis 200 F par km jusqu’à 10 km (segment de 0,5 à 2,5 milliers de F), puis 150 F par km au-delà.",
  (p) => p.seg(0, 0.5, 10, 2.5) + p.seg(10, 2.5, 16, 3.4, "dg-curve-alt") + p.guides(10, 2.5) + p.point(10, 2.5, "(10 ; 2 500)", -8, -12) + p.point(0, 0.5, "", 0, 0),
);

const circulaire = (() => {
  const C: Pt = [100, 100];
  const r = 76;
  const parts: [number, string, string][] = [[0.5, "dg-t-blue", "50 % : 180°"], [0.25, "dg-t-red", "25 % : 90°"], [0.15, "dg-t-yellow", "15 % : 54°"], [0.1, "dg-t-green", "10 % : 36°"]];
  let b = "";
  let start = 90;
  parts.forEach(([f, cls, label], i) => {
    const end = start - f * 360;
    const s = onCircle(C, r, start);
    const e = onCircle(C, r, end);
    b += path(`M${C[0]} ${C[1]}L${s[0]} ${s[1]}A${r} ${r} 0 ${f > 0.5 ? 1 : 0} 1 ${e[0]} ${e[1]}Z`, cls);
    b += rect(196, 50 + i * 24, 14, 14, cls) + tx(216, 57 + i * 24, label, "dg-lbl-xs", "start");
    start = end;
  });
  b += tx(150, 194, "angle = fréquence × 360°", "dg-lbl-sm");
  return svg(W, 204, "Diagramme circulaire : une modalité de fréquence 25 % occupe un secteur de 90° (0,25 × 360°) ; 50 % occupe 180°.", b);
})();

// ── Géométrie ───────────────────────────────────────────────────────────────

/** Thalès : deux configurations (triangles emboîtés et « papillon »), (MN) // (BC). */
const thales = (() => {
  const A: Pt = [70, 20];
  const B: Pt = [20, 160];
  const C: Pt = [140, 160];
  const k = 0.55;
  const M: Pt = [A[0] + (B[0] - A[0]) * k, A[1] + (B[1] - A[1]) * k];
  const N: Pt = [A[0] + (C[0] - A[0]) * k, A[1] + (C[1] - A[1]) * k];
  let b = poly([A, B, C]) + seg(M, N, "dg-curve") + pt(A, "A", "n") + pt(B, "B", "sw") + pt(C, "C", "se") + pt(M, "M", "w") + pt(N, "N", "e");
  const A2: Pt = [220, 90];
  const B2: Pt = [180, 30];
  const C2: Pt = [280, 30];
  const k2 = -0.8;
  const M2: Pt = [A2[0] + (B2[0] - A2[0]) * k2, A2[1] + (B2[1] - A2[1]) * k2];
  const N2: Pt = [A2[0] + (C2[0] - A2[0]) * k2, A2[1] + (C2[1] - A2[1]) * k2];
  b += seg(B2, M2) + seg(C2, N2) + seg(B2, C2, "dg-geo") + seg(M2, N2, "dg-curve") + pt(A2, "A", "e") + pt(B2, "B", "nw") + pt(C2, "C", "ne") + pt(M2, "M", "se") + pt(N2, "N", "sw");
  b += tx(150, 190, "(MN) // (BC) : AM/AB = AN/AC = MN/BC", "dg-lbl-sm");
  return svg(W, 200, "Les deux configurations de Thalès : à gauche, M et N sont sur les côtés [AB] et [AC] ; à droite, sur les droites prolongées au-delà de A. Si (MN) est parallèle à (BC), AM/AB = AN/AC = MN/BC.", b);
})();

const trigo = (() => {
  const A: Pt = [230, 160];
  const B: Pt = [30, 160];
  const C: Pt = [230, 40];
  let b = poly([A, B, C], "dg-geo-fill") + rightAngle(A, B, C, 10) + angleArc(B, A, C, 34, "", "dg-arc");
  b += pt(A, "A", "se") + pt(B, "B", "sw") + pt(C, "C", "ne") + tx(B[0] + 46, B[1] - 10, "B̂", "dg-lbl-math");
  b += tx(130, 176, "côté adjacent à B̂ [AB]", "dg-lbl-xs") + tx(246, 100, "côté opposé", "dg-lbl-xs", "start") + tx(246, 112, "à B̂ [AC]", "dg-lbl-xs", "start") + tx(112, 86, "hypoténuse [BC]", "dg-lbl-xs", "end");
  b += tx(150, 196, "cos B̂ = AB/BC ; sin B̂ = AC/BC ; tan B̂ = AC/AB", "dg-lbl-xs");
  return svg(W, 206, "Triangle ABC rectangle en A : pour l’angle B̂, [AB] est le côté adjacent, [AC] le côté opposé, [BC] l’hypoténuse ; cos B̂ = AB/BC, sin B̂ = AC/BC, tan B̂ = AC/AB.", b);
})();

const chasles = (() => {
  const A: Pt = [30, 150];
  const B: Pt = [150, 40];
  const C: Pt = [270, 130];
  let b = vecAB(A, B, "", "n") + vecAB(B, C, "", "n") + arrow(A[0], A[1], C[0], C[1], "dg-curve", "dg-pt", 10);
  b += pt(A, "A", "sw") + pt(B, "B", "n") + pt(C, "C", "se");
  b += tx(150, 182, "vecteur AB + vecteur BC = vecteur AC", "dg-lbl-sm");
  return svg(W, 192, "Relation de Chasles : aller de A à B puis de B à C revient à aller de A à C ; la somme des vecteurs AB et BC est le vecteur AC.", b);
})();

const colineaires = (() => {
  const O: Pt = [40, 60];
  const u: Pt = [60, -24];
  let b = vecAB(O, [O[0] + u[0], O[1] + u[1]], "u", "n");
  const O2: Pt = [40, 120];
  b += vecAB(O2, [O2[0] + 2 * u[0], O2[1] + 2 * u[1]], "2u", "n");
  const O3: Pt = [250, 150];
  b += vecAB(O3, [O3[0] - u[0], O3[1] - u[1]], "−u", "n");
  b += tx(150, 182, "même direction ; 2u deux fois plus long ; −u de sens contraire", "dg-lbl-xs");
  return svg(W, 192, "Vecteurs colinéaires : 2u a la même direction et le même sens que u, avec une longueur double ; −u a la même direction et la même longueur, mais le sens contraire.", b);
})();

const coordVecteur = plot(
  { x: [0, 5], y: [-2, 4], unit: 34, labelX: "x", labelY: "y" },
  "Dans un repère, A(1 ; 3) et B(4 ; −1) : le vecteur AB a pour coordonnées (3 ; −4), on avance de 3 et on descend de 4.",
  (p) => p.vec(1, 3, 4, -1) + p.seg(1, 3, 4, 3, "dg-dash") + p.seg(4, 3, 4, -1, "dg-dash") + p.text(2.5, 3.35, "+3", "dg-lbl-sm") + p.text(4.4, 1, "−4", "dg-lbl-sm") + p.point(1, 3, "A", -10, -8) + p.point(4, -1, "B", 10, 6),
);

const perpendiculaires = plot(
  { x: [-2, 4], y: [-2, 5], unit: 34, unitY: 26, labelX: "x", labelY: "y" },
  "Les droites y = 2x + 1 et y = −½x + 3 sont perpendiculaires, car 2 × (−½) = −1.",
  (p) => {
    const I: Pt = [0.8, 2.6];
    return p.line(2, 1) + p.line(-0.5, 3, "dg-curve-alt") + rightAngle([p.X(I[0]), p.Y(I[1])], [p.X(2), p.Y(5)], [p.X(3), p.Y(1.5)], 9) + p.text(1.9, 4.75, "y = 2x + 1", "dg-lbl-xs", "start") + p.text(-1.9, 4.3, "y = −½x + 3", "dg-lbl-xs", "start");
  },
);

const angleInscrit = (() => {
  const O: Pt = [110, 104];
  const r = 84;
  const A = onCircle(O, r, -40);
  const B = onCircle(O, r, -140);
  const M = onCircle(O, r, 105);
  let b = circ(O[0], O[1], r, "dg-geo") + seg(O, A) + seg(O, B) + seg(M, A, "dg-curve") + seg(M, B, "dg-curve");
  b += path(`M${B[0]} ${B[1]}A${r} ${r} 0 0 0 ${A[0]} ${A[1]}`, "dg-arc-thick");
  b += angleArc(O, A, B, 20, "100°", "dg-arc", 14) + angleArc(M, A, B, 30, "50°", "dg-arc-2", 14);
  b += pt(O, "O", "e") + pt(A, "A", "se") + pt(B, "B", "sw") + pt(M, "M", "n");
  b += tx(250, 90, "angle au centre :", "dg-lbl-xs") + tx(250, 102, "AÔB = 100°", "dg-lbl-xs") + tx(250, 126, "angle inscrit :", "dg-lbl-xs") + tx(250, 138, "AM̂B = 50°", "dg-lbl-xs");
  return svg(W, 200, "L’angle inscrit AMB intercepte le même arc AB que l’angle au centre AOB : il mesure la moitié, 50° pour 100°.", b);
})();

const demiCercle = (() => {
  const O: Pt = [150, 110];
  const r = 86;
  const A: Pt = [O[0] - r, O[1]];
  const B: Pt = [O[0] + r, O[1]];
  const M = onCircle(O, r, 62);
  let b = circ(O[0], O[1], r, "dg-geo") + seg(A, B) + poly([A, M, B]) + rightAngle(M, A, B, 10);
  b += pt(O, "O", "s") + pt(A, "A", "w") + pt(B, "B", "e") + pt(M, "M", "n");
  return svg(W, 204, "Si [AB] est un diamètre du cercle et M un autre point du cercle, l’angle AMB est droit : le triangle AMB est rectangle en M.", b);
})();

const pyramideCone = (() => {
  const p = pyramid(14, 150, 96, 60, 110);
  let b = p.svg + tx(p.v.S[0] + 8, (p.v.S[1] + p.v.O[1]) / 2, "h = 5", "dg-lbl-xs", "start") + tx(62, 168, "base carrée de 6 cm", "dg-lbl-xs");
  b += cone(220, 150, 48, 14, 110) + tx(226, 96, "h = 4", "dg-lbl-xs", "start") + tx(244, 162, "r = 3", "dg-lbl-xs");
  b += tx(150, 192, "V = aire de la base × hauteur ÷ 3", "dg-lbl-sm");
  return svg(W, 202, "Une pyramide à base carrée (côté 6 cm, hauteur 5 cm : 60 cm³) et un cône de révolution (rayon 3 cm, hauteur 4 cm : environ 37,7 cm³) ; la hauteur est en pointillés.", b);
})();

const sectionPyramide = (() => {
  const p = pyramid(70, 170, 150, 80, 150);
  const k = 0.45;
  const at = (q: Pt): Pt => [p.v.S[0] + (q[0] - p.v.S[0]) * k, p.v.S[1] + (q[1] - p.v.S[1]) * k];
  const [a, b2, c, d] = [at(p.v.A), at(p.v.B), at(p.v.C), at(p.v.D)];
  let b = p.svg + poly([a, b2, c, d], "dg-section");
  b += tx(250, 70, "section parallèle", "dg-lbl-xs") + tx(250, 82, "à la base :", "dg-lbl-xs") + tx(250, 94, "réduction de la base", "dg-lbl-xs");
  b += tx(150, 196, "k = h′ ÷ h", "dg-lbl-sm");
  return svg(W, 206, "Section d’une pyramide par un plan parallèle à sa base : c’est un carré, réduction de la base de coefficient k = h′ ÷ h.", b);
})();

const reduction = (() => {
  let b = cone(150, 170, 70, 18, 150);
  b += ell(150, 95, 35, 9, "dg-section") + tx(196, 95, "mi-hauteur : k = ½", "dg-lbl-xs", "start");
  b += tx(150, 198, "petit cône : 120 × (½)³ = 15 cm³", "dg-lbl-sm");
  return svg(W, 208, "Un cône de 120 cm³ coupé à mi-hauteur : le petit cône est une réduction de rapport ½ ; son volume est 120 × (½)³ = 15 cm³.", b);
})();

// ── Histoire-géographie ─────────────────────────────────────────────────────

/** Puissances coloniales vers 1914 (frontières actuelles, d'après les manuels). */
const COLONIES_1914: Record<string, string[]> = {
  "dg-m1": ["Mauritania", "Senegal", "Mali", "Guinea", "Côte d'Ivoire", "Burkina Faso", "Niger", "Benin", "Algeria", "Tunisia", "Morocco", "Chad", "Central African Rep.", "Congo", "Gabon", "Madagascar", "Djibouti"],
  "dg-m2": ["Gambia", "Sierra Leone", "Ghana", "Nigeria", "Egypt", "Sudan", "S. Sudan", "Kenya", "Uganda", "Zambia", "Zimbabwe", "Malawi", "Botswana", "South Africa", "Lesotho", "eSwatini", "Somaliland"],
  "dg-m3": ["Togo", "Cameroon", "Namibia", "Tanzania", "Rwanda", "Burundi"],
  "dg-m4": ["Guinea-Bissau", "Angola", "Mozambique", "Dem. Rep. Congo", "Libya", "Eritrea", "Somalia", "W. Sahara", "Eq. Guinea"],
  "dg-m5": ["Liberia", "Ethiopia"],
};

const afrique1914 = worldMap({
  view: { lon: [-19, 53], lat: [-36, 38], w: W, cos: true },
  fills: Object.fromEntries(Object.entries(COLONIES_1914).flatMap(([cls, names]) => names.map((n) => [n, cls]))),
  legend: [
    ["dg-m1", "France"],
    ["dg-m2", "Royaume-Uni"],
    ["dg-m3", "Allemagne"],
    ["dg-m4", "Portugal, Belgique, Italie, Espagne"],
    ["dg-m5", "États indépendants : Liberia, Éthiopie"],
  ],
  label: "L’Afrique colonisée vers 1914 (sur les frontières actuelles) : presque tout le continent est partagé entre la France, le Royaume-Uni, l’Allemagne, le Portugal, la Belgique, l’Italie et l’Espagne ; seuls le Liberia et l’Éthiopie restent indépendants.",
});

/** Années d'indépendance (d'après les dates officielles de chaque État). */
const INDEPENDANCES: Record<string, string[]> = {
  "dg-m5": ["Liberia", "Ethiopia", "Egypt", "South Africa", "Libya"],
  "dg-m3": ["Sudan", "Morocco", "Tunisia", "Ghana", "Guinea"],
  "dg-m6": ["Senegal", "Mali", "Mauritania", "Côte d'Ivoire", "Burkina Faso", "Niger", "Benin", "Togo", "Nigeria", "Cameroon", "Chad", "Central African Rep.", "Congo", "Gabon", "Dem. Rep. Congo", "Madagascar", "Somalia", "Somaliland"],
  "dg-m2": ["Sierra Leone", "Tanzania", "Algeria", "Rwanda", "Burundi", "Uganda", "Kenya", "Malawi", "Zambia", "Gambia", "Botswana", "Lesotho", "eSwatini", "Eq. Guinea"],
  "dg-m4": ["Guinea-Bissau", "Mozambique", "Angola", "Djibouti", "Zimbabwe", "Namibia", "Eritrea", "S. Sudan"],
};

const independances = worldMap({
  view: { lon: [-19, 53], lat: [-36, 38], w: W, cos: true },
  fills: Object.fromEntries(Object.entries(INDEPENDANCES).flatMap(([cls, names]) => names.map((n) => [n, cls]))),
  legend: [
    ["dg-m5", "avant 1956"],
    ["dg-m3", "de 1956 à 1959"],
    ["dg-m6", "en 1960"],
    ["dg-m2", "de 1961 à 1969"],
    ["dg-m4", "après 1970"],
  ],
  label: "Les indépendances africaines : quelques États avant 1956, le Ghana et la Guinée en 1957 et 1958, dix-sept pays en 1960, dont le Sénégal, puis les colonies portugaises et l’Afrique australe dans les années 1970 et après.",
});

const friseGuerres = (() => {
  const f = frise({
    from: 1910,
    to: 1950,
    step: 10,
    w: W,
    periods: [
      [1914, 1918, "Première Guerre mondiale"],
      [1929, 1939, "crise des années 1930"],
      [1939, 1945, "Seconde Guerre mondiale"],
    ],
    events: [
      [1917, "1917 : révolutions russes"],
      [1929, "1929 : krach"],
      [1944, "1944 : Thiaroye"],
    ],
  });
  return svg(W, f.h, "Frise de 1910 à 1950 : la Première Guerre mondiale (1914-1918), la crise des années 1930 après le krach de 1929, la Seconde Guerre mondiale (1939-1945) ; massacre de Thiaroye le 1er décembre 1944.", f.svg);
})();

const friseGuerreFroide = (() => {
  const f = frise({
    from: 1945,
    to: 1995,
    step: 10,
    w: W,
    periods: [
      [1947, 1991, "guerre froide"],
      [1950, 1953, "Corée"],
    ],
    events: [
      [1949, "1949 : OTAN"],
      [1955, "1955 : pacte de Varsovie"],
      [1962, "1962 : Cuba"],
      [1989, "1989 : chute du mur de Berlin"],
      [1991, "1991 : fin de l’URSS"],
    ],
  });
  return svg(W, f.h, "Frise de la guerre froide (1947-1991) : création de l’OTAN (1949) et du pacte de Varsovie (1955), guerre de Corée, crise de Cuba (1962), chute du mur de Berlin (1989) et fin de l’URSS (1991).", f.svg);
})();

const friseSenegal = (() => {
  const f = frise({
    from: 1944,
    to: 1961,
    step: 2,
    w: W,
    periods: [[1959, 1960.6, "Fédération du Mali"]],
    events: [
      [1944, "1944 : Brazzaville"],
      [1946, "1946 : lois Lamine Guèye et Houphouët-Boigny"],
      [1948, "1948 : BDS"],
      [1956, "1956 : loi-cadre"],
      [1958.74, "1958 : référendum"],
      [1960.63, "20 août 1960 : indépendance"],
    ],
  });
  return svg(W, f.h, "Frise du Sénégal de 1944 à 1960 : conférence de Brazzaville (1944), lois de 1946, création du BDS (1948), loi-cadre (1956), référendum (28 septembre 1958), Fédération du Mali (1959-1960), indépendance du Sénégal (20 août 1960).", f.svg);
})();

const DEVELOPPES = ["United States of America", "Canada", "Greenland", "Iceland", "Norway", "Sweden", "Finland", "Denmark", "United Kingdom", "Ireland", "France", "Spain", "Portugal", "Italy", "Germany", "Netherlands", "Belgium", "Luxembourg", "Switzerland", "Austria", "Czechia", "Slovakia", "Slovenia", "Poland", "Hungary", "Estonia", "Latvia", "Lithuania", "Greece", "Croatia", "Japan", "South Korea", "Australia", "New Zealand", "Israel", "Cyprus"];
const EMERGENTS = ["China", "India", "Brazil", "Russia", "South Africa", "Mexico", "Indonesia", "Turkey"];

const nordSud = worldMap({
  view: { lon: [-170, 180], lat: [-56, 78], w: W },
  fills: { ...Object.fromEntries(DEVELOPPES.map((n) => [n, "dg-m1"])), ...Object.fromEntries(EMERGENTS.map((n) => [n, "dg-m6"])) },
  legend: [
    ["dg-m1", "pays développés"],
    ["dg-m6", "grands pays émergents"],
    ["dg-land", "pays en développement"],
  ],
  label: "Planisphère simplifié du développement : les pays développés surtout au nord (Amérique du Nord, Europe, Japon, Australie), de grands pays émergents (Chine, Inde, Brésil…), et les pays en développement, surtout au sud.",
});

/** Écart de la température moyenne de la Terre à la moyenne 1951-1980 (NASA GISS, GISTEMP v4, moyennes annuelles). */
const GISTEMP: [number, number][] = [
  [1880, -0.17], [1885, -0.33], [1890, -0.36], [1895, -0.23], [1900, -0.08], [1905, -0.26], [1910, -0.44], [1915, -0.14], [1920, -0.27], [1925, -0.22],
  [1930, -0.15], [1935, -0.2], [1940, 0.12], [1945, 0.09], [1950, -0.17], [1955, -0.14], [1960, -0.02], [1965, -0.11], [1970, 0.03], [1975, -0.01],
  [1980, 0.26], [1985, 0.12], [1990, 0.45], [1995, 0.45], [2000, 0.39], [2005, 0.68], [2010, 0.72], [2015, 0.89], [2020, 1.01], [2023, 1.17], [2024, 1.28], [2025, 1.18],
];

const rechauffement = plot(
  { x: [1880, 2030], y: [-0.6, 1.4], unit: 1.75, unitY: 90, ticksX: [1900, 1950, 2000], ticksY: [-0.5, 0, 0.5, 1], grid: false, labelX: "année", labelY: "écart (°C)", pad: 28, xAxisAt: -0.6 },
  "Évolution de la température moyenne de la Terre depuis 1880, en écart à la moyenne 1951-1980 : d’environ −0,2 °C vers 1900 à plus de 1 °C après 2015 (données NASA GISS).",
  (p) =>
    p.hline(0, "dg-dash-thin") +
    `<path class="dg-curve-alt" d="M${GISTEMP.map(([y, v]) => `${p.X(y).toFixed(1)} ${p.Y(v).toFixed(1)}`).join("L")}"/>` +
    p.point(2024, 1.28, "", 0, 0) +
    p.text(2020, 1.36, "2024 : +1,28 °C", "dg-lbl-xs", "end") +
    `<text class="dg-source" x="28" y="${p.Y(-0.6) + 26}">Données : NASA GISS, GISTEMP v4</text>`,
);

export const SCHEMAS_3E: Record<string, string> = {
  "m3-identite": identite,
  "m3-affines": affines,
  "m3-systeme": systeme,
  "m3-demi-plan": demiPlan,
  "m3-taxi": taxi,
  "m3-circulaire": circulaire,
  "m3-thales": thales,
  "m3-trigo": trigo,
  "m3-chasles": chasles,
  "m3-colineaires": colineaires,
  "m3-coord-vecteur": coordVecteur,
  "m3-perpendiculaires": perpendiculaires,
  "m3-angle-inscrit": angleInscrit,
  "m3-demi-cercle": demiCercle,
  "m3-pyramide-cone": pyramideCone,
  "m3-section-pyramide": sectionPyramide,
  "m3-reduction": reduction,
  "h3-afrique-1914": afrique1914,
  "h3-independances": independances,
  "h3-frise-guerres": friseGuerres,
  "h3-frise-guerre-froide": friseGuerreFroide,
  "h3-frise-senegal": friseSenegal,
  "g3-nord-sud": nordSud,
  "g3-rechauffement": rechauffement,
  ...SCHEMAS_3E_SCIENCES,
};

