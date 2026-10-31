// Schémas des leçons de Terminale : asymptote oblique, valeurs intermédiaires, fonction réciproque, point
// d'inflexion, logarithme et exponentielle, suite récurrente, intégrale et aire, équation différentielle,
// arbre pondéré, loi binomiale, racines de l'unité, similitude, coniques, produit vectoriel ; géographie
// (pôles de la mondialisation, ACEUM, Union européenne, Asie-Pacifique, Mercosur).
// Les schémas de sciences sont dans tle-sciences.ts.

import { svg } from "../drawings";
import { SCHEMAS_TLE_SCIENCES } from "./tle-sciences";
import { angleArc, arrow, bars, circ, ln, onCircle, path, plot, poly, type Pt, pt, rightAngle, seg, tx } from "./kit";
import { place, worldMap } from "./world";

const W = 300;

// ── Analyse ─────────────────────────────────────────────────────────────────

const oblique = plot(
  { x: [-3, 5], y: [-4, 8], unit: 34, unitY: 18, labelX: "x", labelY: "y", grid: false },
  "Exemple : f(x) = x + 1 + 1/(x − 1) ; la droite x = 1 est asymptote verticale et la droite y = x + 1 est asymptote oblique.",
  (p) => {
    const f = (x: number) => x + 1 + 1 / (x - 1);
    return p.line(1, 1, "dg-dash") + p.vline(1, "dg-dash") + p.curve(f, -3, 0.9) + p.curve(f, 1.1, 5) + p.text(4.6, 5, "y = x + 1", "dg-lbl-xs", "end") + p.text(1.2, 7.4, "x = 1", "dg-lbl-xs", "start");
  },
);

const tvi = plot(
  { x: [0, 5], y: [0, 6], unit: 50, unitY: 26, ticksX: [1, 4], ticksY: [3], labelX: "x", labelY: "y", grid: false },
  "Théorème des valeurs intermédiaires : f est continue sur [a ; b], f(a) < k < f(b) ; la courbe coupe au moins une fois la droite y = k, en un point d’abscisse c entre a et b.",
  (p) => {
    const f = (x: number) => 1 + 0.4 * (x - 1) ** 2 + 0.6 * Math.sin(2 * (x - 1));
    return p.curve(f, 0.6, 4.4) + p.hline(3, "dg-dash") + p.vline(1, "dg-dash-thin") + p.vline(4, "dg-dash-thin") + p.point(1, f(1), "f(a)", -16, 0) + p.point(4, f(4), "f(b)", 18, 0) + p.text(1, -0.35, "a", "dg-lbl-math") + p.text(4, -0.35, "b", "dg-lbl-math") + p.text(0.25, 3.3, "k", "dg-lbl-math");
  },
);

const expLn = plot(
  { x: [-3, 5], y: [-3, 5], unit: 34, unitY: 26, labelX: "x", labelY: "y" },
  "Les courbes de exp et de ln sont symétriques par rapport à la droite y = x : ce sont des fonctions réciproques. e⁰ = 1 et ln 1 = 0 ; e¹ = e et ln e = 1.",
  (p) => p.line(1, 0, "dg-dash") + p.curve((x) => Math.exp(x), -3, 1.65) + p.curve((x) => Math.log(x), 0.05, 5, "dg-curve-alt") + p.point(0, 1, "", 0, 0) + p.point(1, 0, "", 0, 0) + p.text(1.3, 4.5, "y = eˣ", "dg-lbl-xs", "start") + p.text(4.6, 1.15, "y = ln x", "dg-lbl-xs", "end") + p.text(4.6, 4.2, "y = x", "dg-lbl-xs", "end"),
);

const inflexion = plot(
  { x: [-2, 2], y: [-3, 3], unit: 64, unitY: 26, labelX: "x", labelY: "y" },
  "Courbe de x³ : au point d’inflexion O, la dérivée seconde s’annule en changeant de signe ; la courbe traverse sa tangente (ici l’axe des abscisses).",
  (p) => p.curve((x) => x ** 3, -1.5, 1.5) + p.line(0, 0, "dg-curve-alt") + p.point(0, 0, "point d’inflexion", 50, -12) + p.text(-1.3, -2.6, "concave", "dg-lbl-xs") + p.text(1.3, 2.6, "convexe", "dg-lbl-xs"),
);

/** Suite u(n+1) = 0,5 u(n) + 2 avec u(0) = 0 : construction en escalier vers la limite 4. */
const escalier = plot(
  { x: [0, 6], y: [0, 6], unit: 44, unitY: 34, labelX: "x", labelY: "y" },
  "Suite définie par u(n+1) = 0,5 u(n) + 2 et u(0) = 0 : la construction en escalier entre la droite y = 0,5x + 2 et la droite y = x montre que la suite converge vers 4.",
  (p) => {
    let u = 0;
    let d = `M${p.X(0)} ${p.Y(0)}`;
    for (let n = 0; n < 6; n++) {
      const v = 0.5 * u + 2;
      d += `L${p.X(u)} ${p.Y(v)}L${p.X(v)} ${p.Y(v)}`;
      u = v;
    }
    return p.line(0.5, 2) + p.line(1, 0, "dg-dash") + path(d, "dg-curve-alt") + p.point(4, 4, "limite 4", 10, 12) + p.text(5.6, 5.8, "y = x", "dg-lbl-xs", "end") + p.text(1.2, 3.6, "y = 0,5x + 2", "dg-lbl-xs", "start") + p.text(2, 0.35, "u₁", "dg-lbl-xs") + p.text(3, 0.35, "u₂", "dg-lbl-xs");
  },
);

const integrale = plot(
  { x: [0, 4], y: [0, 5], unit: 60, unitY: 34, ticksX: [1, 3], ticksY: [], labelX: "x", labelY: "y", grid: false },
  "L’intégrale de a à b d’une fonction positive est l’aire du domaine compris entre la courbe, l’axe des abscisses et les droites x = a et x = b.",
  (p) => {
    const f = (x: number) => 1 + 0.5 * x * x - 0.08 * x ** 3;
    return p.area(f, 1, 3) + p.curve(f, 0, 4) + p.seg(1, 0, 1, f(1), "dg-dash") + p.seg(3, 0, 3, f(3), "dg-dash") + p.text(2, 1.4, "∫ f(x) dx", "dg-lbl-sm") + p.text(1, -0.35, "a", "dg-lbl-math") + p.text(3, -0.35, "b", "dg-lbl-math") + p.text(3.6, 4.6, "y = f(x)", "dg-lbl-xs", "end");
  },
);

const equaDiff = plot(
  { x: [0, 4], y: [-1, 5], unit: 60, unitY: 26, labelX: "x", labelY: "y" },
  "Solutions de l’équation y′ = −y : les fonctions y = C e⁻ˣ ; une seule passe par un point donné (condition initiale), par exemple y(0) = 3.",
  (p) => [4, 3, 2, 1, -0.5].map((c, i) => p.curve((x) => c * Math.exp(-x), 0, 4, i === 1 ? "dg-curve-alt" : "dg-curve")).join("") + p.point(0, 3, "y(0) = 3", 34, -6),
);

// ── Probabilités et complexes ──────────────────────────────────────────────

const arbre = (() => {
  const node = (x: number, y: number, t: string) => tx(x, y, t, "dg-lbl-math");
  let b = "";
  const branch = (a: Pt, c: Pt, label: string) => ln(a[0], a[1], c[0] - 10, c[1], "dg-ink-thin") + tx((a[0] + c[0]) / 2, (a[1] + c[1]) / 2 - 8, label, "dg-lbl-xs");
  const root: Pt = [20, 100];
  const A: Pt = [110, 50];
  const nA: Pt = [110, 150];
  b += branch(root, A, "0,4") + branch(root, nA, "0,6") + node(A[0], A[1], "A") + node(nA[0], nA[1], "Ā");
  b += branch([A[0] + 10, A[1]], [200, 24], "0,7") + branch([A[0] + 10, A[1]], [200, 76], "0,3") + branch([nA[0] + 10, nA[1]], [200, 124], "0,2") + branch([nA[0] + 10, nA[1]], [200, 176], "0,8");
  b += node(200, 24, "B") + node(200, 76, "B̄") + node(200, 124, "B") + node(200, 176, "B̄");
  b += tx(214, 24, "0,4 × 0,7 = 0,28", "dg-lbl-xs", "start") + tx(214, 124, "0,6 × 0,2 = 0,12", "dg-lbl-xs", "start");
  b += tx(150, 200, "P(B) = 0,28 + 0,12 = 0,40", "dg-lbl-sm");
  return svg(W, 210, "Arbre pondéré (exemple) : P(A) = 0,4, P_A(B) = 0,7 et P_Ā(B) = 0,2 ; on multiplie le long d’un chemin et on additionne les chemins qui mènent à B : P(B) = 0,28 + 0,12 = 0,4.", b);
})();

/** Loi binomiale B(6 ; 0,5) : P(X = k) = C(6, k) / 64. */
const binomiale = (() => {
  const C = [1, 6, 15, 20, 15, 6, 1];
  const b = bars({ labels: ["0", "1", "2", "3", "4", "5", "6"], values: C.map((c) => c / 64), max: 0.35, step: 0.05, w: W, h: 170, unit: "P(X = k)" });
  return svg(W, 186, "Loi binomiale de paramètres n = 6 et p = 0,5 : P(X = k) = C(6, k) × 0,5⁶ ; la valeur la plus probable est 3 (20/64, environ 0,31).", b + tx(170, 178, "k", "dg-lbl-math"));
})();

const racines = (() => {
  const O: Pt = [130, 110];
  const r = 80;
  let b = arrow(O[0] - r - 20, O[1], O[0] + r + 24, O[1], "dg-axis-line", "dg-pt", 7) + arrow(O[0], O[1] + r + 16, O[0], O[1] - r - 18, "dg-axis-line", "dg-pt", 7) + circ(O[0], O[1], r, "dg-dash");
  const P = [0, 60, 120, 180, 240, 300].map((d) => onCircle(O, r, d));
  b += poly(P, "dg-geo-fill");
  P.forEach((q, i) => (b += pt(q, `ω${["⁰", "¹", "²", "³", "⁴", "⁵"][i]}`, i === 0 ? "se" : i === 3 ? "sw" : i < 3 ? "ne" : "se")));
  b += angleArc(O, P[0]!, P[1]!, 22, "2π/6", "dg-arc", 16) + tx(O[0] + r + 8, O[1] + 14, "1", "dg-tick");
  b += tx(250, 30, "zⁿ = 1 a n racines,", "dg-lbl-xs") + tx(250, 44, "sommets d’un polygone", "dg-lbl-xs") + tx(250, 58, "régulier (ici n = 6)", "dg-lbl-xs");
  return svg(W, 214, "Les six racines sixièmes de l’unité, ω = e^(2ikπ/6), sont les sommets d’un hexagone régulier inscrit dans le cercle de centre O et de rayon 1.", b);
})();

const similitude = (() => {
  const O: Pt = [60, 150];
  const k = 1.6;
  const a = (-40 * Math.PI) / 180;
  const sim = ([x, y]: Pt): Pt => {
    const dx = x - O[0];
    const dy = y - O[1];
    return [O[0] + k * (dx * Math.cos(a) - dy * Math.sin(a)), O[1] + k * (dx * Math.sin(a) + dy * Math.cos(a))];
  };
  const tri: Pt[] = [[100, 140], [140, 150], [110, 112]];
  const img = tri.map(sim);
  let b = poly(tri, "dg-geo-fill") + poly(img, "dg-geo-fill") + seg(O, tri[0]!, "dg-dash-thin") + seg(O, img[0]!, "dg-dash-thin") + angleArc(O, tri[0]!, img[0]!, 30, "θ", "dg-arc", 12);
  b += pt(O, "Ω", "s", true) + tx(tri[0]![0] + 6, tri[0]![1] + 12, "M", "dg-lbl-math") + tx(img[0]![0] + 10, img[0]![1] - 6, "M′", "dg-lbl-math");
  b += tx(200, 190, "ΩM′ = k × ΩM et (ΩM, ΩM′) = θ", "dg-lbl-xs");
  return svg(W, 200, "Similitude directe de centre Ω, de rapport k = 1,6 et d’angle θ = 40° : elle tourne la figure autour de Ω et l’agrandit ; elle conserve les angles et multiplie les longueurs par k.", b);
})();

const produitVectoriel = (() => {
  const O: Pt = [120, 140];
  const u: Pt = [O[0] + 110, O[1] + 20];
  const v: Pt = [O[0] + 40, O[1] + 46];
  const w: Pt = [O[0], O[1] - 110];
  let b = poly([O, u, [u[0] + 40, u[1] + 46], v], "dg-geo-fill");
  b += arrow(O[0], O[1], u[0], u[1], "dg-vec", "dg-vec-head", 9) + arrow(O[0], O[1], v[0], v[1], "dg-curve", "dg-pt", 9) + arrow(O[0], O[1], w[0], w[1], "dg-curve-3", "dg-green-fill", 9);
  b += tx(u[0] + 8, u[1], "u", "dg-lbl-math", "start") + tx(v[0] + 10, v[1] - 2, "v", "dg-lbl-math", "start") + tx(w[0] + 8, w[1], "u ∧ v", "dg-lbl-math", "start") + rightAngle(O, u, w, 9);
  b += tx(230, 60, "u ∧ v est orthogonal", "dg-lbl-xs") + tx(230, 72, "à u et à v ; sa norme", "dg-lbl-xs") + tx(230, 84, "est l’aire du", "dg-lbl-xs") + tx(230, 96, "parallélogramme", "dg-lbl-xs");
  return svg(W, 200, "Produit vectoriel : u ∧ v est orthogonal au plan de u et de v, orienté selon la règle de la main droite ; sa norme est égale à l’aire du parallélogramme construit sur u et v.", b);
})();

// ── Coniques ────────────────────────────────────────────────────────────────

const parabole = plot(
  { x: [-3, 3], y: [-1.5, 4], unit: 46, unitY: 34, labelX: "x", labelY: "y" },
  "Parabole y = x²/4 de foyer F(0 ; 1) et de directrice y = −1 : chaque point M est à la même distance du foyer et de la directrice (excentricité 1).",
  (p) => {
    const M: Pt = [2, 1];
    return p.curve((x) => (x * x) / 4, -3, 3) + p.hline(-1, "dg-curve-alt") + p.point(0, 1, "F", 10, -8) + p.point(M[0], M[1], "M", 10, -6) + p.seg(0, 1, M[0], M[1], "dg-dash") + p.seg(M[0], M[1], M[0], -1, "dg-dash") + p.text(-2.4, -1.3, "directrice", "dg-lbl-xs", "start") + p.text(1.1, 0.75, "MF", "dg-lbl-xs") + p.text(2.25, 0, "MH", "dg-lbl-xs", "start");
  },
);

const ellipse = plot(
  { x: [-3.5, 3.5], y: [-2.2, 2.2], unit: 40, unitY: 40, labelX: "x", labelY: "y" },
  "Ellipse x²/9 + y²/4 = 1, de foyers F(−√5 ; 0) et F′(√5 ; 0) : pour tout point M, MF + MF′ = 2a = 6.",
  (p) => {
    const c = Math.sqrt(5);
    const M: Pt = [1.5, 2 * Math.sqrt(1 - 0.25)];
    return p.param((t) => 3 * Math.cos(t), (t) => 2 * Math.sin(t), 0, 2 * Math.PI) + p.point(-c, 0, "F", 0, 12) + p.point(c, 0, "F′", 0, 12) + p.point(M[0], M[1], "M", 8, -10) + p.seg(-c, 0, M[0], M[1], "dg-dash") + p.seg(c, 0, M[0], M[1], "dg-dash") + p.text(0, -2.05, "MF + MF′ = 6", "dg-lbl-xs");
  },
);

const hyperbole = plot(
  { x: [-4, 4], y: [-3, 3], unit: 36, unitY: 34, labelX: "x", labelY: "y" },
  "Hyperbole x²/4 − y²/1 = 1 : deux branches, deux asymptotes y = x/2 et y = −x/2, foyers F(−√5 ; 0) et F′(√5 ; 0) ; |MF − MF′| = 4.",
  (p) =>
    p.line(0.5, 0, "dg-dash") +
    p.line(-0.5, 0, "dg-dash") +
    p.param((t) => 2 * Math.cosh(t), (t) => Math.sinh(t), -1.75, 1.75) +
    p.param((t) => -2 * Math.cosh(t), (t) => Math.sinh(t), -1.75, 1.75) +
    p.point(-Math.sqrt(5), 0, "F", 0, 12) +
    p.point(Math.sqrt(5), 0, "F′", 0, 12) +
    p.text(3.4, 2.4, "y = x/2", "dg-lbl-xs", "end"),
);

// ── Géographie ──────────────────────────────────────────────────────────────

const POLES = {
  "dg-m1": ["United States of America", "Canada"],
  "dg-m2": ["France", "Germany", "Italy", "Spain", "Portugal", "Netherlands", "Belgium", "Luxembourg", "Austria", "Ireland", "Denmark", "Sweden", "Finland", "Poland", "Czechia", "Slovakia", "Hungary", "Slovenia", "Croatia", "Romania", "Bulgaria", "Greece", "Estonia", "Latvia", "Lithuania", "Cyprus"],
  "dg-m6": ["China", "Japan", "South Korea", "Taiwan"],
};

const triade = worldMap({
  view: { lon: [-170, 180], lat: [-56, 78], w: W },
  fills: Object.fromEntries(Object.entries(POLES).flatMap(([cls, names]) => names.map((n) => [n, cls]))),
  legend: [
    ["dg-m1", "Amérique du Nord"],
    ["dg-m2", "Union européenne"],
    ["dg-m6", "Asie orientale"],
  ],
  label: "Les trois grands pôles de la mondialisation : l’Amérique du Nord, l’Union européenne et l’Asie orientale (Chine, Japon, Corée du Sud, Taïwan).",
});

const aceum = worldMap({
  view: { lon: [-170, -50], lat: [10, 75], w: W, cos: true },
  fills: { "United States of America": "dg-m1", Canada: "dg-m5", Mexico: "dg-m6" },
  legend: [
    ["dg-m5", "Canada"],
    ["dg-m1", "États-Unis"],
    ["dg-m6", "Mexique"],
  ],
  label: "L’espace nord-américain : le Canada, les États-Unis et le Mexique, liés par l’accord de libre-échange ACEUM (ancien ALENA).",
});

const EU = POLES["dg-m2"];
const ue = worldMap({
  view: { lon: [-25, 40], lat: [34, 71], w: W, cos: true },
  fills: Object.fromEntries(EU.map((n) => [n, "dg-m1"])),
  legend: [["dg-m1", "Union européenne (27 États)"]],
  label: "L’Union européenne et ses 27 États membres depuis la sortie du Royaume-Uni en 2020 (Malte, trop petite, n’est pas dessinée).",
});

const asiePacifique = worldMap({
  view: { lon: [70, 160], lat: [-12, 50], w: W, cos: true },
  fills: {
    China: "dg-m6",
    Japan: "dg-m2",
    "South Korea": "dg-m2",
    Taiwan: "dg-m2",
    ...Object.fromEntries(["Indonesia", "Malaysia", "Thailand", "Vietnam", "Philippines", "Cambodia", "Laos", "Myanmar", "Brunei", "Timor-Leste"].map((n) => [n, "dg-m1"])),
  },
  legend: [
    ["dg-m2", "Japon, Corée du Sud, Taïwan"],
    ["dg-m6", "Chine"],
    ["dg-m1", "pays de l’ASEAN"],
  ],
  label: "L’Asie-Pacifique : le Japon et les « dragons » (Corée du Sud, Taïwan), la Chine, et les pays de l’Asie du Sud-Est réunis dans l’ASEAN.",
});

const mercosur = worldMap({
  view: { lon: [-120, -30], lat: [-56, 33], w: W, cos: true },
  fills: { Brazil: "dg-m6", ...Object.fromEntries(["Argentina", "Paraguay", "Uruguay", "Bolivia"].map((n) => [n, "dg-m1"])) },
  legend: [
    ["dg-m6", "Brésil"],
    ["dg-m1", "autres membres du Mercosur"],
  ],
  label: "L’Amérique latine : le Brésil, première puissance de la région, et les autres membres du Mercosur (Argentine, Paraguay, Uruguay, Bolivie).",
  extra: (p) => place(p, -52, -10, "Brésil", "middle"),
});

export const SCHEMAS_TLE: Record<string, string> = {
  "t-oblique": oblique,
  "t-tvi": tvi,
  "t-exp-ln": expLn,
  "t-inflexion": inflexion,
  "t-escalier": escalier,
  "t-integrale": integrale,
  "t-equa-diff": equaDiff,
  "t-arbre": arbre,
  "t-binomiale": binomiale,
  "t-racines": racines,
  "t-similitude": similitude,
  "t-produit-vectoriel": produitVectoriel,
  "t-parabole": parabole,
  "t-ellipse": ellipse,
  "t-hyperbole": hyperbole,
  "t-triade": triade,
  "t-aceum": aceum,
  "t-ue": ue,
  "t-asie-pacifique": asiePacifique,
  "t-mercosur": mercosur,
  ...SCHEMAS_TLE_SCIENCES,
};
