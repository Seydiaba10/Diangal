// Schémas des leçons de 2nde : trinôme, valeur absolue, parité, fonctions de référence, barycentre, cercle
// trigonométrique, produit scalaire, homothétie, lecture de graphique, boîte à moustaches ; physique-chimie
// (mouvements, atome, classification, Lewis, tests d'ions, trois forces, moments, mesures, générateur,
// amplificateur) ; SVT (écosystème, pyramide, cycle de l'eau, potabilisation) ; histoire-géographie
// (hominidés, Soudan médiéval, traites, saisons, océans, zones climatiques).

import { svg } from "../drawings";
import { angleArc, arrow, cell, circ, dot, ell, lamp, ln, meter, onCircle, path, plot, poly, type Pt, pt, rect, resistor, rightAngle, seg, tx, vecAB, wire } from "./kit";
import { place, route, worldMap } from "./world";

const W = 300;

// ── Mathématiques ───────────────────────────────────────────────────────────

const trinome = plot(
  { x: [0, 5], y: [-1, 6], unit: 46, unitY: 24, labelX: "x", labelY: "y" },
  "Courbe de x² − 5x + 6 : une parabole tournée vers le haut (a = 1 > 0) qui coupe l’axe des abscisses en 2 et 3 ; elle est sous l’axe entre ses racines.",
  (p) =>
    p.seg(2, 0, 3, 0, "dg-interval") +
    p.curve((x) => x * x - 5 * x + 6, 0, 5) +
    p.point(2, 0, "", 0, 0) +
    p.point(3, 0, "", 0, 0) +
    p.seg(2.5, 0.1, 2.5, 2.1, "dg-leader") +
    p.text(2.5, 2.4, "négatif sur ]2 ; 3[", "dg-lbl-xs") +
    p.text(4.3, 5.3, "y = x² − 5x + 6", "dg-lbl-xs", "end"),
);

const valeurAbsolue = (() => {
  const X = (v: number) => 30 + ((v + 2) / 9) * 240;
  const y = 54;
  let b = arrow(14, y, 292, y, "dg-axis-line", "dg-pt", 7);
  for (let v = -2; v <= 7; v++) b += ln(X(v), y - 4, X(v), y + 4, "dg-axis-line") + tx(X(v), y + 16, String(v).replace("-", "−"), "dg-tick");
  b += ln(X(-1), y, X(5), y, "dg-interval") + dot(X(2), y, 4, "dg-vec-head") + dot(X(-1), y, 3.5) + dot(X(5), y, 3.5);
  b += path(`M${X(2)} ${y - 10}Q${X(0.5)} ${y - 34} ${X(-1)} ${y - 10}`, "dg-dash") + path(`M${X(2)} ${y - 10}Q${X(3.5)} ${y - 34} ${X(5)} ${y - 10}`, "dg-dash");
  b += tx(X(0.5), y - 32, "3", "dg-lbl-sm") + tx(X(3.5), y - 32, "3", "dg-lbl-sm") + tx(150, 92, "|x − 2| ≤ 3 ⟺ −1 ≤ x ≤ 5", "dg-lbl-sm");
  return svg(W, 102, "Droite graduée : les nombres x dont la distance à 2 est au plus 3 forment l’intervalle de −1 à 5.", b);
})();

const parite = plot(
  { x: [-2, 2], y: [-3, 4], unit: 60, unitY: 26, labelX: "x", labelY: "y" },
  "Courbes de x² (paire, symétrique par rapport à l’axe des ordonnées) et de x³ (impaire, symétrique par rapport à l’origine).",
  (p) => p.curve((x) => x * x, -2, 2) + p.curve((x) => x ** 3, -2, 2, "dg-curve-alt") + p.text(-1.85, 3.6, "x² : paire", "dg-lbl-xs", "start") + p.text(1.1, -2.6, "x³ : impaire", "dg-lbl-xs", "start"),
);

const reference = plot(
  { x: [-3, 4], y: [-3, 4], unit: 36, unitY: 30, labelX: "x", labelY: "y" },
  "Courbes des fonctions de référence : la parabole de x², l’hyperbole de 1/x (deux branches, les axes sont asymptotes) et la demi-parabole de √x.",
  (p) =>
    p.curve((x) => x * x, -2.1, 2.1) +
    p.curve((x) => 1 / x, -3, -0.26, "dg-curve-alt") +
    p.curve((x) => 1 / x, 0.26, 4, "dg-curve-alt") +
    p.curve((x) => Math.sqrt(x), 0, 4, "dg-curve-3") +
    p.text(-2.2, 3.7, "x²", "dg-lbl-sm", "end") +
    p.text(3.6, 0.6, "1/x", "dg-lbl-sm") +
    p.text(3.6, 2.3, "√x", "dg-lbl-sm"),
);

const barycentre = (() => {
  const A: Pt = [30, 70];
  const B: Pt = [270, 70];
  const G: Pt = [30 + 0.75 * 240, 70];
  let b = seg(A, B) + pt(A, "A (1)", "n") + pt(B, "B (3)", "n") + pt(G, "G", "n");
  for (let i = 0; i <= 4; i++) b += ln(30 + i * 60, 66, 30 + i * 60, 74, "dg-ink-thin");
  b += vecAB([30, 100], [G[0], 100], "", "s") + tx(105, 116, "AG = 3/4 AB", "dg-lbl-sm");
  b += tx(150, 140, "G est plus près du point de plus grand poids", "dg-lbl-xs");
  return svg(W, 150, "Barycentre G de (A, 1) et (B, 3) : AG = 3/4 de AB ; G est plus près de B, qui a le plus grand poids.", b);
})();

const cercleTrigo = (() => {
  const O: Pt = [110, 120];
  const r = 96;
  let b = arrow(O[0] - r - 10, O[1], O[0] + r + 20, O[1], "dg-axis-line", "dg-pt", 7) + arrow(O[0], O[1] + r + 10, O[0], O[1] - r - 18, "dg-axis-line", "dg-pt", 7) + circ(O[0], O[1], r, "dg-geo");
  const angles: [number, string][] = [[30, "π/6"], [45, "π/4"], [60, "π/3"], [90, "π/2"]];
  for (const [deg, name] of angles) {
    const M = onCircle(O, r, deg);
    b += dot(M[0], M[1], 3) + tx(M[0] + 14, M[1] - 6, name, "dg-lbl-xs", "start");
  }
  const M = onCircle(O, r, 60);
  b += seg(O, M, "dg-vec") + ln(M[0], M[1], M[0], O[1], "dg-dash") + ln(M[0], M[1], O[0], M[1], "dg-dash") + angleArc(O, [O[0] + r, O[1]], M, 22, "", "dg-arc");
  b += tx(M[0], O[1] + 12, "cos = 1/2", "dg-lbl-xs") + tx(O[0] - 6, M[1], "sin = √3/2", "dg-lbl-xs", "end");
  b += tx(O[0] + r + 6, O[1] + 12, "1", "dg-tick") + tx(O[0] - 8, O[1] - r - 2, "1", "dg-tick") + tx(O[0] - 8, O[1] + 12, "O", "dg-tick");
  b += tx(250, 210, "angle π/3 (60°)", "dg-lbl-xs");
  return svg(W, 230, "Cercle trigonométrique de rayon 1 : le point associé à π/3 a pour abscisse cos(π/3) = 1/2 et pour ordonnée sin(π/3) = √3/2.", b);
})();

const produitScalaire = plot(
  { x: [-1, 4], y: [-3, 4], unit: 40, unitY: 30, labelX: "x", labelY: "y" },
  "Les vecteurs u(2 ; 3) et v(3 ; −2) sont orthogonaux : leur produit scalaire 2 × 3 + 3 × (−2) vaut 0.",
  (p) => p.vec(0, 0, 2, 3) + p.vec(0, 0, 3, -2) + p.text(1.6, 3.3, "u (2 ; 3)", "dg-lbl-sm", "end") + p.text(3.2, -2.4, "v (3 ; −2)", "dg-lbl-sm", "end") + rightAngle([p.X(0), p.Y(0)], [p.X(2), p.Y(3)], [p.X(3), p.Y(-2)], 10),
);

const homothetie = (() => {
  const O: Pt = [24, 160];
  const tri: Pt[] = [[80, 130], [120, 140], [96, 100]];
  const img = tri.map(([x, y]) => [O[0] + 2 * (x - O[0]), O[1] + 2 * (y - O[1])] as Pt);
  let b = "";
  img.forEach((q) => (b += seg(O, q, "dg-dash-thin")));
  b += poly(tri, "dg-geo-fill") + poly(img, "dg-geo-fill") + pt(O, "O", "s", true);
  b += tx(tri[2]![0] - 8, tri[2]![1] - 8, "M", "dg-lbl-math") + tx(img[2]![0] - 8, img[2]![1] - 8, "M′", "dg-lbl-math");
  b += tx(200, 186, "rapport k = 2 : OM′ = 2 × OM", "dg-lbl-xs");
  return svg(W, 196, "Homothétie de centre O et de rapport 2 : chaque point M a pour image M′ sur la demi-droite [OM) avec OM′ = 2 × OM ; les longueurs sont doublées, les aires multipliées par 4.", b);
})();

const interpolation = plot(
  { x: [7, 13], y: [18, 30], unit: 40, unitY: 12, ticksX: [8, 9, 10, 11, 12], ticksY: [20, 22, 24, 26, 28], grid: 1, labelX: "heure", labelY: "°C", xAxisAt: 18 },
  "Températures relevées à Dakar à 8 h (22 °C) et à 12 h (28 °C) : en joignant les deux points, on estime 25 °C à 10 h.",
  (p) => p.seg(8, 22, 12, 28) + p.point(8, 22, "", 0, 0) + p.point(12, 28, "", 0, 0) + p.guides(10, 25) + p.point(10, 25, "25 °C à 10 h ?", 8, -12),
);

const boite = (() => {
  const X = (v: number) => 30 + ((v - 4) / 16) * 240;
  const y = 50;
  let b = arrow(20, 96, 290, 96, "dg-axis-line", "dg-pt", 7);
  for (let v = 4; v <= 20; v += 2) b += ln(X(v), 92, X(v), 100, "dg-axis-line") + tx(X(v), 110, v, "dg-tick");
  b += ln(X(6), y, X(9), y, "dg-ink") + rect(X(9), y - 16, X(12) - X(9), 32, "dg-t-blue") + ln(X(10), y - 16, X(10), y + 16, "dg-red-line") + ln(X(12), y, X(18), y, "dg-ink");
  b += ln(X(6), y - 8, X(6), y + 8, "dg-ink") + ln(X(18), y - 8, X(18), y + 8, "dg-ink");
  for (const [v, t] of [[6, "min 6"], [9, "Q1 = 9"], [10, "médiane 10"], [12, "Q3 = 12"], [18, "max 18"]] as [number, string][]) b += tx(X(v), v === 10 ? 18 : 78, t, "dg-lbl-xs");
  b += tx(150, 128, "notes 6 ; 9 ; 10 ; 12 ; 18 : étendue 12", "dg-lbl-xs");
  return svg(W, 138, "Boîte à moustaches des notes 6, 9, 10, 12 et 18 : la boîte va du premier quartile (9) au troisième (12) ; la médiane est 10 ; les moustaches vont jusqu’au minimum (6) et au maximum (18).", b);
})();

// ── Physique-chimie ─────────────────────────────────────────────────────────

const chrono = (() => {
  let b = "";
  const row = (y: number, xs: number[], label: string) => {
    let out = ln(14, y, 290, y, "dg-dash-thin") + tx(14, y - 14, label, "dg-lbl-xs", "start");
    xs.forEach((x) => (out += dot(x, y, 4, "dg-vec-head")));
    return out;
  };
  b += row(30, [20, 60, 100, 140, 180, 220, 260], "rectiligne uniforme : positions également espacées");
  b += row(84, [20, 26, 38, 56, 80, 110, 146, 188, 236], "rectiligne accéléré : l’écart augmente");
  const C: Pt = [150, 152];
  b += tx(14, 120, "circulaire uniforme", "dg-lbl-xs", "start") + circ(C[0], C[1], 30, "dg-dash-thin");
  for (let a = 0; a < 360; a += 45) {
    const M = onCircle(C, 30, a);
    b += dot(M[0], M[1], 4, "dg-vec-head");
  }
  b += tx(150, 198, "positions notées à intervalles de temps égaux", "dg-lbl-xs");
  return svg(W, 206, "Enregistrements de positions d’un mobile à intervalles de temps égaux : mouvement rectiligne uniforme (écarts égaux), rectiligne accéléré (écarts croissants), circulaire uniforme.", b);
})();

const atome = (() => {
  const C: Pt = [96, 100];
  let b = circ(C[0], C[1], 82, "dg-shell") + circ(C[0], C[1], 58, "dg-shell") + circ(C[0], C[1], 34, "dg-shell");
  b += circ(C[0], C[1], 14, "dg-t-red") + tx(C[0], C[1], "noyau", "dg-lbl-xs");
  const electrons = (r: number, n: number, off = 0) => {
    let out = "";
    for (let i = 0; i < n; i++) {
      const M = onCircle(C, r, off + (i * 360) / n);
      out += circ(M[0], M[1], 4, "dg-blue-fill");
    }
    return out;
  };
  b += electrons(34, 2, 90) + electrons(58, 8, 22.5) + electrons(82, 1, 45);
  b += tx(C[0] + 34 + 4, C[1] + 8, "K", "dg-lbl-xs", "start") + tx(C[0] + 58 + 4, C[1] + 8, "L", "dg-lbl-xs", "start") + tx(C[0] + 82 + 4, C[1] + 8, "M", "dg-lbl-xs", "start");
  b += tx(196, 40, "sodium Na (Z = 11)", "dg-lbl-xs", "start") + tx(196, 60, "11 protons,", "dg-lbl-xs", "start") + tx(196, 72, "12 neutrons", "dg-lbl-xs", "start") + tx(196, 92, "11 électrons :", "dg-lbl-xs", "start") + tx(196, 106, "K² L⁸ M¹", "dg-lbl-sm", "start");
  return svg(W, 194, "Modèle de l’atome de sodium (Z = 11) : un noyau et 11 électrons répartis sur trois couches, 2 sur K, 8 sur L et 1 sur M (schéma, tailles non respectées).", b);
})();

const classification = (() => {
  const rows = [
    ["H", "", "", "", "", "", "", "He"],
    ["Li", "Be", "B", "C", "N", "O", "F", "Ne"],
    ["Na", "Mg", "Al", "Si", "P", "S", "Cl", "Ar"],
  ];
  const cls = (j: number) => (j === 0 ? "dg-t-red" : j === 6 ? "dg-t-yellow" : j === 7 ? "dg-t-blue" : "dg-cell");
  let b = "";
  rows.forEach((row, i) =>
    row.forEach((el, j) => {
      if (!el) return;
      const x = 14 + j * 34;
      const y = 30 + i * 36;
      b += rect(x, y, 32, 32, cls(j), 4) + tx(x + 16, y + 13, el, "dg-lbl") + tx(x + 16, y + 26, String(i === 0 ? (j === 0 ? 1 : 2) : i === 1 ? j + 3 : j + 11), "dg-tick");
    }),
  );
  ["1", "2", "13", "14", "15", "16", "17", "18"].forEach((c, j) => (b += tx(30 + j * 34, 20, c, "dg-tick")));
  b += rect(14, 148, 14, 12, "dg-t-red") + tx(32, 154, "alcalins", "dg-lbl-xs", "start") + rect(100, 148, 14, 12, "dg-t-yellow") + tx(118, 154, "halogènes", "dg-lbl-xs", "start") + rect(190, 148, 14, 12, "dg-t-blue") + tx(208, 154, "gaz nobles", "dg-lbl-xs", "start");
  return svg(W, 166, "Les 18 premiers éléments de la classification périodique, rangés par numéro atomique : trois lignes (périodes) ; colonne 1 des alcalins, colonne 17 des halogènes, colonne 18 des gaz nobles.", b);
})();

const lewis = (() => {
  let b = tx(40, 50, "H", "dg-formula") + tx(80, 50, "O", "dg-formula") + tx(120, 50, "H", "dg-formula") + ln(48, 50, 72, 50, "dg-ink") + ln(88, 50, 112, 50, "dg-ink");
  b += ln(74, 36, 86, 36, "dg-ink") + ln(74, 64, 86, 64, "dg-ink");
  b += tx(80, 88, "eau : 2 liaisons covalentes,", "dg-lbl-xs") + tx(80, 100, "2 doublets non liants sur O", "dg-lbl-xs");
  b += tx(180, 34, "Na", "dg-formula") + arrow(196, 34, 236, 34, "dg-ink", "dg-pt", 7) + tx(244, 34, "Na⁺ + e⁻", "dg-formula", "start");
  b += tx(180, 66, "Cl + e⁻", "dg-formula") + arrow(204, 66, 236, 66, "dg-ink", "dg-pt", 7) + tx(244, 66, "Cl⁻", "dg-formula", "start");
  b += tx(220, 100, "sel : ions Na⁺ et Cl⁻ qui s’attirent", "dg-lbl-xs");
  return svg(W, 112, "À gauche, la molécule d’eau en représentation de Lewis : deux liaisons covalentes O–H et deux doublets non liants sur l’oxygène. À droite, la liaison ionique du sel : le sodium cède un électron au chlore.", b);
})();

const testsIons = (() => {
  const tube = (cx: number, cls: string, ion: string, obs: string) =>
    path(`M${cx - 13} 30V108A13 13 0 0 0 ${cx + 13} 108V30`, "dg-glass") + rect(cx - 12, 70, 24, 40, "dg-water-clear") + path(`M${cx - 12} 110A12 12 0 0 0 ${cx + 12} 110V98H${cx - 12}Z`, cls) + tx(cx, 140, ion, "dg-lbl-xs") + tx(cx, 152, obs, "dg-lbl-xs");
  const b = tube(30, "dg-cell", "Cl⁻", "blanc") + tube(90, "dg-cell", "SO₄²⁻", "blanc") + tube(150, "dg-blue-fill", "Cu²⁺", "bleu") + tube(210, "dg-green-fill", "Fe²⁺", "vert") + tube(270, "dg-rust-fill", "Fe³⁺", "rouille") + tx(150, 14, "couleur du précipité", "dg-lbl-sm");
  return svg(W, 162, "Tests d’identification des ions : précipité blanc pour les ions chlorure (nitrate d’argent) et sulfate (chlorure de baryum) ; avec la soude, précipité bleu pour Cu²⁺, vert pour Fe²⁺, rouille pour Fe³⁺.", b);
})();

/** Objet suspendu par deux fils à 45° de la verticale : T₁ = T₂ = P ÷ (2 cos 45°) ; triangle des forces fermé. */
const troisForces = (() => {
  const O: Pt = [90, 110];
  const k = 6;
  const P = 10;
  const T = P / (2 * Math.cos(Math.PI / 4));
  const t1: Pt = [-T * Math.sin(Math.PI / 4) * k, -T * Math.cos(Math.PI / 4) * k];
  const t2: Pt = [T * Math.sin(Math.PI / 4) * k, -T * Math.cos(Math.PI / 4) * k];
  let b = ln(20, 40, O[0], O[1], "dg-ink-thin") + ln(160, 40, O[0], O[1], "dg-ink-thin") + rect(10, 34, 160, 6, "dg-pt") + rect(O[0] - 10, O[1], 20, 18, "dg-t-grey", 3);
  b += vecAB(O, [O[0] + t1[0], O[1] + t1[1]], "T₁", "w") + vecAB(O, [O[0] + t2[0], O[1] + t2[1]], "T₂", "e") + vecAB(O, [O[0], O[1] + P * k], "P", "e");
  // Triangle des forces : P, puis T₁, puis T₂, qui se referme.
  const S: Pt = [230, 60];
  const a: Pt = [S[0], S[1] + P * k];
  const c: Pt = [a[0] + t1[0], a[1] + t1[1]];
  b += vecAB(S, a, "P", "e") + vecAB(a, c, "T₁", "w") + vecAB(c, S, "T₂", "n");
  b += tx(230, 140, "triangle des forces fermé :", "dg-lbl-xs") + tx(230, 152, "T₁ + T₂ + P = 0", "dg-lbl-xs");
  return svg(W, 176, "Un objet suspendu par deux fils est en équilibre sous trois forces concourantes : les tensions T₁ et T₂ et le poids P. Mises bout à bout, elles forment un triangle fermé : leur somme est nulle.", b);
})();

const moments = (() => {
  const axis: Pt = [150, 100];
  const u = 50;
  let b = rect(30, 92, 240, 8, "dg-t-sand", 3) + path(`M${axis[0]} 100l-14 30h28z`, "dg-t-grey") + dot(axis[0], 96, 3);
  b += arrow(axis[0] - 2 * u, 100, axis[0] - 2 * u, 150, "dg-vec", "dg-vec-head", 9) + tx(axis[0] - 2 * u, 162, "300 N", "dg-lbl-sm");
  b += arrow(axis[0] + 1.5 * u, 100, axis[0] + 1.5 * u, 150, "dg-vec", "dg-vec-head", 9) + tx(axis[0] + 1.5 * u, 162, "400 N", "dg-lbl-sm");
  b += path(`M${axis[0] - 2 * u} 74H${axis[0]}`, "dg-ink-thin") + tx(axis[0] - u, 64, "2 m", "dg-lbl-xs") + path(`M${axis[0]} 74H${axis[0] + 1.5 * u}`, "dg-ink-thin") + tx(axis[0] + 0.75 * u, 64, "1,5 m", "dg-lbl-xs");
  b += tx(150, 188, "300 × 2 = 400 × 1,5 = 600 N·m : équilibre", "dg-lbl-sm");
  return svg(W, 198, "Une balançoire en équilibre : 300 N à 2 m de l’axe et 400 N à 1,5 m ont des moments égaux (600 N·m) de part et d’autre.", b);
})();

const mesures = (() => {
  let b = cell(150, 24, "h") + wire([132, 24], [30, 24], [30, 60]) + meter(30, 78, "A", "v") + wire([30, 96], [30, 140], [130, 140]) + lamp(148, 140, "h") + wire([166, 140], [270, 140], [270, 24], [168, 24]);
  b += wire([120, 140], [120, 100], [132, 100]) + meter(150, 100, "V", "h") + wire([168, 100], [180, 100], [180, 140]) + dot(120, 140, 3) + dot(180, 140, 3);
  b += tx(56, 78, "en série", "dg-lbl-xs", "start") + tx(150, 78, "en dérivation", "dg-lbl-xs");
  return svg(W, 160, "Mesurer l’intensité et la tension : l’ampèremètre (A) se branche en série dans le circuit, le voltmètre (V) en dérivation aux bornes de la lampe.", b);
})();

const fonctionnement = plot(
  { x: [0, 3], y: [0, 7], unit: 70, unitY: 22, ticksX: [0.5, 1, 1.5, 2, 2.5], ticksY: [2, 4, 6], grid: false, labelX: "I (A)", labelY: "U (V)" },
  "Exemple : générateur U = 6 − 2I et moteur U = 2 + 2I ; les deux caractéristiques se coupent au point de fonctionnement I = 1 A, U = 4 V.",
  (p) => p.line(-2, 6) + p.line(2, 2, "dg-curve-alt") + p.guides(1, 4) + p.point(1, 4, "P (1 A ; 4 V)", 10, -12) + p.text(2.4, 1.6, "générateur", "dg-lbl-xs") + p.text(2.2, 6.6, "moteur", "dg-lbl-xs", "end"),
);

const inverseur = (() => {
  let b = path("M150 50L150 130L220 90Z", "dg-comp") + tx(160, 70, "−", "dg-lbl") + tx(160, 112, "+", "dg-lbl");
  b += wire([150, 70], [110, 70]) + resistor(92, 70, "h") + wire([74, 70], [30, 70]) + dot(30, 70, 3) + tx(30, 58, "Ue", "dg-lbl-math");
  b += wire([110, 70], [110, 24], [158, 24]) + resistor(176, 24, "h") + wire([194, 24], [250, 24], [250, 90]) + wire([220, 90], [280, 90]) + dot(280, 90, 3) + tx(280, 78, "Us", "dg-lbl-math");
  b += wire([150, 110], [130, 110], [130, 150]) + path("M120 150h20M124 155h12M128 160h4", "dg-ink");
  b += tx(92, 56, "R₁", "dg-lbl-math") + tx(176, 10, "R₂", "dg-lbl-math") + tx(150, 186, "Us = −(R₂/R₁) × Ue", "dg-lbl-sm");
  return svg(W, 196, "Montage inverseur à amplificateur opérationnel : l’entrée − reçoit Ue par R₁ et la sortie par R₂ ; l’entrée + est reliée à la masse ; Us = −(R₂/R₁) Ue.", b);
})();

// ── SVT ─────────────────────────────────────────────────────────────────────

const ecosysteme = (() => {
  let b = rect(10, 20, 130, 110, "dg-t-sand", 12) + tx(75, 36, "biotope", "dg-lbl-sm") + ["sol", "eau", "climat", "lumière"].map((t, i) => tx(75, 58 + i * 16, t, "dg-lbl-xs")).join("");
  b += rect(160, 20, 130, 110, "dg-t-green", 12) + tx(225, 36, "biocénose", "dg-lbl-sm") + ["plantes", "animaux", "champignons", "bactéries"].map((t, i) => tx(225, 58 + i * 16, t, "dg-lbl-xs")).join("");
  b += arrow(140, 64, 160, 64, "dg-ink", "dg-pt", 7) + arrow(160, 90, 140, 90, "dg-ink", "dg-pt", 7) + tx(150, 148, "écosystème = biotope + biocénose", "dg-lbl-sm") + tx(150, 166, "exemple : la mangrove du Saloum", "dg-lbl-xs");
  return svg(W, 176, "Un écosystème réunit un biotope (le milieu physique : sol, eau, climat, lumière) et une biocénose (les êtres vivants), qui agissent l’un sur l’autre.", b);
})();

const pyramide = (() => {
  const levels: [number, string, string][] = [
    [240, "producteurs : herbe", "dg-t-green"],
    [160, "consommateurs I : gazelle", "dg-t-yellow"],
    [130, "consommateurs II : lion", "dg-t-red"],
  ];
  let b = "";
  levels.forEach(([w, t, cls], i) => (b += rect(150 - w / 2, 120 - i * 40, w, 34, cls, 4) + tx(150, 137 - i * 40, t, "dg-lbl-xs")));
  b += arrow(282, 140, 282, 48, "dg-ink", "dg-pt", 7) + tx(276, 30, "énergie", "dg-lbl-xs", "end") + tx(276, 42, "qui diminue", "dg-lbl-xs", "end");
  b += tx(150, 170, "à chaque niveau, une grande partie de l’énergie se perd", "dg-lbl-xs");
  return svg(W, 180, "Pyramide des niveaux d’un écosystème de savane : beaucoup de producteurs, moins d’herbivores, encore moins de carnivores ; l’énergie se perd d’un niveau à l’autre.", b);
})();

const cycleEau = (() => {
  let b = rect(0, 150, 140, 60, "dg-sea") + path("M140 150L190 120L300 110V210H140Z", "dg-t-sand") + rect(140, 190, 160, 20, "dg-nappe");
  b += path("M60 56c0-14 22-20 30-8 6-10 26-8 26 6 12 0 14 18 0 18H62c-12 0-14-16-2-16z", "dg-ash") + path("M200 40c0-14 22-20 30-8 6-10 26-8 26 6 12 0 14 18 0 18h-54c-12 0-14-16-2-16z", "dg-ash");
  b += arrow(60, 140, 70, 84, "dg-ink-thin", "dg-pt", 7) + tx(30, 110, "évaporation", "dg-lbl-xs");
  b += arrow(130, 60, 186, 50, "dg-ink-thin", "dg-pt", 7) + tx(158, 40, "condensation", "dg-lbl-xs");
  for (const x of [214, 230, 246]) b += ln(x, 74, x - 6, 100, "dg-rain");
  b += tx(270, 88, "précipitations", "dg-lbl-xs");
  b += arrow(200, 126, 150, 150, "dg-blue-line", "dg-blue-fill", 7) + tx(176, 160, "ruissellement", "dg-lbl-xs");
  b += arrow(260, 120, 260, 186, "dg-blue-line", "dg-blue-fill", 7) + tx(250, 150, "infiltration", "dg-lbl-xs", "end") + tx(222, 200, "nappe souterraine", "dg-lbl-xs");
  b += tx(70, 180, "mer", "dg-lbl-xs");
  return svg(W, 212, "Le cycle de l’eau : l’eau de mer s’évapore, la vapeur se condense en nuages, il pleut ; une partie ruisselle jusqu’à la mer, une autre s’infiltre jusqu’aux nappes souterraines.", b);
})();

const potabilisation = (() => {
  const steps = ["eau brute", "décantation", "filtration", "désinfection (chlore)", "eau potable"];
  let b = "";
  steps.forEach((t, i) => {
    const y = 14 + i * 34;
    b += rect(70, y, 160, 24, i === 0 ? "dg-t-sand" : i === 4 ? "dg-t-blue" : "dg-cell", 8) + tx(150, y + 12, t, "dg-lbl-xs");
    if (i < 4) b += arrow(150, y + 24, 150, y + 34, "dg-ink", "dg-pt", 6);
  });
  return svg(W, 186, "Les étapes de la potabilisation : on laisse décanter l’eau brute, on la filtre, puis on la désinfecte au chlore pour obtenir une eau potable.", b);
})();

// ── Histoire-géographie ─────────────────────────────────────────────────────

const hominides = worldMap({
  view: { lon: [-19, 53], lat: [-36, 38], w: W, cos: true },
  label: "Carte de l’Afrique : sites de deux fossiles célèbres, Toumaï au Tchad et Lucy en Éthiopie.",
  extra: (p) => {
    const site = (lon: number, lat: number, t: string, anchor: "start" | "end") => {
      const [x, y] = p.P(lon, lat);
      return circ(x, y, 4.5, "dg-capital") + place(p, lon + (anchor === "start" ? 2 : -2), lat + 1.5, t, anchor);
    };
    return site(17.5, 16.2, "Toumaï (Tchad)", "end") + site(40.6, 11.1, "Lucy (Éthiopie)", "end");
  },
});

const soudan = worldMap({
  view: { lon: [-18, 6], lat: [8, 22], w: W, cos: true },
  rivers: ["Niger", "Sénégal"],
  label: "L’Afrique de l’Ouest au Moyen Âge : les villes de Koumbi Saleh (Ghana), Niani et Tombouctou (Mali), Gao (Songhaï), Djenné, le long du Niger et du Sénégal.",
  extra: (p) => {
    const city = (lon: number, lat: number, t: string, anchor: "start" | "end" = "start") => {
      const [x, y] = p.P(lon, lat);
      return circ(x, y, 3.5, "dg-capital") + place(p, lon + (anchor === "start" ? 0.4 : -0.4), lat + 0.5, t, anchor);
    };
    return (
      city(-7.97, 15.77, "Koumbi Saleh") +
      city(-3.0, 16.77, "", "end") +
      place(p, -3.0, 17.7, "Tombouctou") +
      city(-0.04, 16.27, "Gao") +
      city(-4.55, 13.91, "Djenné") +
      city(-8.38, 11.37, "Niani") +
      place(p, -11, 15.6, "GHANA", "middle", "dg-map-empire") +
      place(p, -6.5, 12.6, "MALI", "middle", "dg-map-empire") +
      place(p, 1.5, 14.4, "SONGHAÏ", "middle", "dg-map-empire") +
      place(p, -1.5, 19.5, "Sahara", "middle")
    );
  },
});

const traites = worldMap({
  view: { lon: [-40, 62], lat: [-30, 40], w: W, cos: true },
  label: "Les traites négrières : la traite arabe, à travers le Sahara, la mer Rouge et l’océan Indien ; la traite atlantique vers l’Amérique, depuis la côte ouest de l’Afrique (Gorée, Saint-Louis).",
  legend: [
    ["dg-route-3", "traite arabe (dès le VIIe siècle)"],
    ["dg-vec", "traite atlantique (XVIe-XIXe siècle)"],
  ],
  extra: (p) =>
    route(p, [0, 14], [3, 33], 0, "dg-route-3", "dg-route-3-head") +
    route(p, [16, 12], [20, 31], 0, "dg-route-3", "dg-route-3-head") +
    route(p, [33, 12], [42, 22], 0, "dg-route-3", "dg-route-3-head") +
    route(p, [39, -6], [55, 18], 10, "dg-route-3", "dg-route-3-head") +
    route(p, [-17.4, 14.7], [-38, 2], 14) +
    route(p, [5, 4], [-38, -6], 10) +
    route(p, [12, -9], [-38, -16], 6) +
    place(p, -17.4, 17, "Gorée", "middle", "dg-map-small") +
    place(p, -24, 26, "vers l’Amérique", "middle", "dg-map-small"),
});

/** Les saisons : la Terre sur son orbite, l'axe incliné toujours dans la même direction (schéma, tailles non respectées). */
const saisons = (() => {
  const C: Pt = [150, 100];
  let b = ell(C[0], C[1], 120, 58, "dg-dash-thin") + circ(C[0], C[1], 18, "dg-t-yellow") + tx(C[0], C[1] + 30, "Soleil", "dg-lbl-xs");
  const earth = (x: number, y: number, label: string, lit: "left" | "right" | "top" | "bottom") => {
    let out = circ(x, y, 13, "dg-t-blue");
    // Moitié dans la nuit : du côté opposé au Soleil (« lit » : côté où se trouve la Terre sur l'orbite).
    const shade = { left: `M${x} ${y - 13}A13 13 0 0 0 ${x} ${y + 13}Z`, right: `M${x} ${y - 13}A13 13 0 0 1 ${x} ${y + 13}Z`, top: `M${x - 13} ${y}A13 13 0 0 1 ${x + 13} ${y}Z`, bottom: `M${x - 13} ${y}A13 13 0 0 0 ${x + 13} ${y}Z` }[lit];
    out += path(shade, "dg-night") + ln(x - 7, y + 18, x + 7, y - 18, "dg-ink");
    return out + tx(x, y + (y > C[1] ? 26 : -24), label, "dg-lbl-xs");
  };
  b += earth(30, 100, "21 juin", "left") + earth(270, 100, "21 décembre", "right") + earth(150, 42, "21 mars", "top") + earth(150, 158, "23 septembre", "bottom");
  b += tx(150, 196, "l’axe de la Terre, incliné, garde la même direction", "dg-lbl-xs");
  return svg(W, 206, "La révolution de la Terre autour du Soleil en 365 jours : son axe incliné garde toujours la même direction, ce qui explique les saisons (dates pour l’hémisphère nord ; tailles et distances non respectées).", b);
})();

const oceans = worldMap({
  view: { lon: [-170, 180], lat: [-60, 80], w: W },
  label: "Planisphère des océans : Pacifique, Atlantique, Indien, Arctique et Austral ; ils couvrent environ 71 % de la surface de la Terre.",
  extra: (p) =>
    place(p, -150, 0, "Pacifique", "start", "dg-map-sea") +
    place(p, 160, -20, "Pacifique", "end", "dg-map-sea") +
    place(p, -32, 10, "Atlantique", "middle", "dg-map-sea") +
    place(p, 78, -25, "Indien", "middle", "dg-map-sea") +
    place(p, 0, 72, "Arctique", "middle", "dg-map-sea") +
    place(p, 20, -55, "Austral", "middle", "dg-map-sea"),
});

const zonesClimatiques = worldMap({
  view: { lon: [-170, 180], lat: [-60, 80], w: W },
  label: "Les grandes zones climatiques selon la latitude : zone intertropicale entre les tropiques, zones tempérées, zones polaires au-delà des cercles polaires.",
  legend: [
    ["dg-zone-hot", "zone intertropicale (entre les tropiques, 23° 26′)"],
    ["dg-zone-temperate", "zones tempérées"],
    ["dg-zone-cold", "zones polaires (au-delà de 66° 34′)"],
  ],
  extra: (p) => {
    const band = (a: number, b2: number, cls: string) => `<rect class="${cls}" x="0" y="${p.Y(b2)}" width="${p.w}" height="${p.Y(a) - p.Y(b2)}"/>`;
    const line = (lat: number, t: string) => `<path class="dg-dash-thin" d="M0 ${p.Y(lat)}H${p.w}"/>` + place(p, -168, lat + 1.5, t, "start", "dg-map-small");
    return (
      band(-23.44, 23.44, "dg-zone-hot") +
      band(23.44, 66.56, "dg-zone-temperate") +
      band(-60, -23.44, "dg-zone-temperate") +
      band(66.56, 80, "dg-zone-cold") +
      line(23.44, "tropique du Cancer") +
      line(-23.44, "tropique du Capricorne") +
      line(66.56, "cercle polaire") +
      `<path class="dg-ink-thin" d="M0 ${p.Y(0)}H${p.w}"/>` +
      place(p, -168, 1.5, "équateur", "start", "dg-map-small")
    );
  },
});

export const SCHEMAS_2NDE: Record<string, string> = {
  "m2-trinome": trinome,
  "m2-valeur-absolue": valeurAbsolue,
  "m2-parite": parite,
  "m2-reference": reference,
  "m2-barycentre": barycentre,
  "m2-cercle-trigo": cercleTrigo,
  "m2-produit-scalaire": produitScalaire,
  "m2-homothetie": homothetie,
  "m2-interpolation": interpolation,
  "m2-boite": boite,
  "p2-chrono": chrono,
  "p2-atome": atome,
  "p2-classification": classification,
  "p2-lewis": lewis,
  "p2-tests-ions": testsIons,
  "p2-trois-forces": troisForces,
  "p2-moments": moments,
  "p2-mesures": mesures,
  "p2-fonctionnement": fonctionnement,
  "p2-inverseur": inverseur,
  "s2-ecosysteme": ecosysteme,
  "s2-pyramide": pyramide,
  "s2-cycle-eau": cycleEau,
  "s2-potabilisation": potabilisation,
  "h2-hominides": hominides,
  "h2-soudan": soudan,
  "h2-traites": traites,
  "g2-saisons": saisons,
  "g2-oceans": oceans,
  "g2-zones-climatiques": zonesClimatiques,
};

