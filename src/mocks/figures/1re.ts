// Schémas des leçons de 1re : limites et asymptotes, tangente, variations, suites, nuage de points, triangle
// de Pascal, optimisation, plan complexe, intérêts ; physique-chimie (travail, énergie mécanique, champ
// uniforme, onde, pile Daniell, électrolyse, classification redox, lentille, benzène) ; SVT (cellules,
// bactérie et virus, osmose, mitose, synthèse des protéines, vitesses des ondes sismiques) ; géographie
// (population mondiale, transition démographique, urbanisation).

import { svg } from "../drawings";
import { angleArc, arrow, circ, ell, lab, lamp, lens, ln, path, plot, poly, type Pt, rect, tx, wire } from "./kit";

const W = 300;

// ── Mathématiques ───────────────────────────────────────────────────────────

const limites = plot(
  { x: [-5, 5], y: [-6, 8], unit: 26, unitY: 13, ticksY: [-4, -2, 2, 4, 6], labelX: "x", labelY: "y", grid: false },
  "Courbe de (2x² + 1)/(x² − 3) : deux asymptotes verticales x = −√3 et x = √3, et une asymptote horizontale y = 2.",
  (p) => {
    const f = (x: number) => (2 * x * x + 1) / (x * x - 3);
    const r = Math.sqrt(3);
    return (
      p.vline(-r, "dg-dash") +
      p.vline(r, "dg-dash") +
      p.hline(2, "dg-dash") +
      p.curve(f, -5, -r - 0.02) +
      p.curve(f, -r + 0.02, r - 0.02) +
      p.curve(f, r + 0.02, 5) +
      p.text(3.7, 2.6, "y = 2", "dg-lbl-xs") +
      p.text(r + 0.2, 7.3, "x = √3", "dg-lbl-xs", "start") +
      p.text(-r - 0.2, 7.3, "x = −√3", "dg-lbl-xs", "end")
    );
  },
);

const tangente = plot(
  { x: [-1, 3], y: [-2, 6], unit: 60, unitY: 24, labelX: "x", labelY: "y" },
  "Courbe de x² et sa tangente au point A(1 ; 1) : la droite y = 2x − 1, de coefficient directeur f′(1) = 2.",
  (p) => p.curve((x) => x * x, -1, 2.45) + p.line(2, -1, "dg-curve-alt") + p.point(1, 1, "A(1 ; 1)", 30, 8) + p.text(2.95, 4.1, "y = 2x − 1", "dg-lbl-xs", "end") + p.text(1.85, 5.5, "y = x²", "dg-lbl-xs", "end"),
);

const variations = plot(
  { x: [-2.5, 2.5], y: [-3, 3.5], unit: 56, unitY: 28, labelX: "x", labelY: "y" },
  "Courbe de f(x) = x³ − 3x : croissante, puis décroissante entre −1 et 1, puis croissante ; tangentes horizontales au maximum local (−1 ; 2) et au minimum local (1 ; −2).",
  (p) =>
    p.curve((x) => x ** 3 - 3 * x, -2.3, 2.3) +
    p.seg(-1.6, 2, -0.4, 2, "dg-curve-alt") +
    p.seg(0.4, -2, 1.6, -2, "dg-curve-alt") +
    p.point(-1, 2, "max (−1 ; 2)", 0, -12) +
    p.point(1, -2, "min (1 ; −2)", 0, 13),
);

const suites = plot(
  { x: [0, 20], y: [0, 2.8], unit: 13, unitY: 64, ticksX: [5, 10, 15, 20], ticksY: [1, 2], grid: false, labelX: "n", labelY: "milliers" },
  "Population de 1 000 au départ : avec + 50 par an (suite arithmétique), les points sont alignés ; avec + 5 % par an (suite géométrique, 1 000 × 1,05ⁿ), ils s’écartent de plus en plus vite.",
  (p) => {
    let out = "";
    for (let n = 0; n <= 20; n++) out += `<circle class="dg-pt" cx="${p.X(n)}" cy="${p.Y(1 + 0.05 * n)}" r="2.6"/>` + `<circle class="dg-red-fill" cx="${p.X(n)}" cy="${p.Y(1.05 ** n)}" r="2.6"/>`;
    return out + p.text(19.5, 2.25, "arithmétique", "dg-lbl-xs", "end") + p.text(15.5, 2.62, "géométrique", "dg-lbl-xs", "end");
  },
);

/** Exemple : huit points et la droite de Mayer passant par les points moyens des deux moitiés. */
const NUAGE: Pt[] = [[1, 3], [2, 4], [3, 4], [4, 6], [5, 7], [6, 7], [7, 9], [8, 10]];
const nuage = plot(
  { x: [0, 9], y: [0, 11], unit: 28, unitY: 16, labelX: "x", labelY: "y" },
  "Exemple de nuage de huit points : les points moyens G₁(2,5 ; 4,25) et G₂(6,5 ; 8,25) des deux moitiés définissent la droite de Mayer y = x + 1,75.",
  (p) =>
    NUAGE.map(([x, y]) => p.point(x, y, "", 0, 0)).join("") +
    p.line(1, 1.75, "dg-curve-alt") +
    `<rect class="dg-vec-head" x="${p.X(2.5) - 4}" y="${p.Y(4.25) - 4}" width="8" height="8"/><rect class="dg-vec-head" x="${p.X(6.5) - 4}" y="${p.Y(8.25) - 4}" width="8" height="8"/>` +
    p.text(2.5, 5.4, "G₁", "dg-lbl-math") +
    p.text(6.5, 9.4, "G₂", "dg-lbl-math"),
);

const pascal = (() => {
  const C = (n: number, k: number): number => (k === 0 || k === n ? 1 : C(n - 1, k - 1) + C(n - 1, k));
  let b = "";
  for (let n = 0; n <= 5; n++) {
    for (let k = 0; k <= n; k++) {
      const x = 150 + (k - n / 2) * 42;
      const y = 22 + n * 28;
      b += circ(x, y, 12, n === 4 && k === 2 ? "dg-t-yellow" : "dg-cell") + tx(x, y, C(n, k), "dg-lbl-sm");
    }
    b += tx(14, 22 + n * 28, `n = ${n}`, "dg-lbl-xs", "start");
  }
  b += tx(150, 194, "chaque nombre est la somme des deux nombres au-dessus", "dg-lbl-xs");
  return svg(W, 204, "Triangle de Pascal jusqu’à n = 5 : chaque nombre est la somme des deux nombres situés au-dessus ; à la ligne n = 4, on lit C(4, 2) = 6.", b);
})();

const optimisation = plot(
  { x: [0, 11], y: [0, 11], unit: 22, labelX: "x", labelY: "y", ticksX: [2, 4, 6, 8, 10], ticksY: [2, 4, 6, 8, 10] },
  "Région des contraintes x ≥ 0, y ≥ 0, x + y ≤ 10 et x ≤ 6 : le bénéfice B = 3x + 2y est maximal (26) au sommet (6 ; 4).",
  (p) =>
    `<path class="dg-region" d="M${p.X(0)} ${p.Y(0)}L${p.X(6)} ${p.Y(0)}L${p.X(6)} ${p.Y(4)}L${p.X(0)} ${p.Y(10)}Z"/>` +
    p.line(-1, 10) +
    p.vline(6, "dg-curve") +
    p.line(-1.5, 13, "dg-dash") +
    p.point(6, 4, "(6 ; 4) : B = 26", 10, -12) +
    p.text(1.2, 11.0, "x + y = 10", "dg-lbl-xs", "start") +
    p.text(6.2, 10.4, "x = 6", "dg-lbl-xs", "start") +
    p.text(9.4, 0.8, "B = 26", "dg-lbl-xs", "end"),
);

const complexe = plot(
  { x: [-1, 2], y: [-1, 2], unit: 80, labelX: "réels", labelY: "imaginaires", grid: 0.5, ticksX: [1], ticksY: [1] },
  "Plan complexe : le point M d’affixe z = 1 + i ; OM = |z| = √2 et l’angle entre l’axe des réels et OM est π/4.",
  (p) => {
    const O: Pt = [p.X(0), p.Y(0)];
    const M: Pt = [p.X(1), p.Y(1)];
    return p.seg(0, 0, 1, 1, "dg-vec") + p.guides(1, 1) + p.point(1, 1, "M(1 ; 1)", 12, -10) + angleArc(O, [p.X(1), p.Y(0)], M, 30, "π/4", "dg-arc", 14) + p.text(0.42, 0.62, "√2", "dg-lbl-sm", "end");
  },
);

const interets = plot(
  { x: [0, 10], y: [400, 950], unit: 26, unitY: 0.33, ticksX: [2, 4, 6, 8, 10], ticksY: [500, 600, 700, 800, 900], grid: false, labelX: "années", labelY: "milliers de F", xAxisAt: 400, pad: 30 },
  "500 000 F placés à 6 % par an : avec les intérêts simples, la valeur augmente de 30 000 F chaque année (droite) ; avec les intérêts composés, de plus en plus (courbe).",
  (p) => {
    let out = "";
    for (let n = 0; n <= 10; n++) out += `<circle class="dg-pt" cx="${p.X(n)}" cy="${p.Y(500 + 30 * n)}" r="2.6"/><circle class="dg-red-fill" cx="${p.X(n)}" cy="${p.Y(500 * 1.06 ** n)}" r="2.6"/>`;
    return out + p.text(9.8, 760, "simples", "dg-lbl-xs", "end") + p.text(8.4, 905, "composés", "dg-lbl-xs", "end");
  },
);

// ── Physique-chimie ─────────────────────────────────────────────────────────

const travail = (() => {
  const A: Pt = [40, 120];
  const B: Pt = [240, 120];
  let b = rect(0, 132, W, 10, "dg-t-sand") + rect(A[0] - 22, 96, 44, 36, "dg-t-grey", 4) + rect(B[0] - 22, 96, 44, 36, "dg-dash", 4);
  b += arrow(A[0], 150, B[0], 150, "dg-ink", "dg-pt", 8) + tx((A[0] + B[0]) / 2, 162, "déplacement AB", "dg-lbl-xs");
  const F: Pt = [A[0] + 90 * Math.cos(Math.PI / 6), 114 - 90 * Math.sin(Math.PI / 6)];
  b += arrow(A[0], 114, F[0], F[1], "dg-vec", "dg-vec-head", 10) + ln(A[0], 114, A[0] + 100, 114, "dg-dash-thin") + angleArc([A[0], 114], [A[0] + 60, 114], F, 34, "α", "dg-arc", 12);
  b += tx(F[0] + 6, F[1] - 6, "F", "dg-lbl-math", "start") + tx(A[0], 176, "A", "dg-lbl-math") + tx(B[0], 176, "B", "dg-lbl-math");
  b += tx(150, 196, "W = F × AB × cos α", "dg-lbl-sm");
  return svg(W, 206, "Une caisse tirée par une force F qui fait un angle α avec le déplacement AB : seule la partie de la force dans le sens du déplacement travaille, W = F × AB × cos α.", b);
})();

const energie = plot(
  { x: [0, 5], y: [0, 55], unit: 48, unitY: 3, ticksX: [1, 2, 3, 4, 5], ticksY: [10, 20, 30, 40, 50], grid: false, labelX: "hauteur z (m)", labelY: "énergie (J)" },
  "Objet de 1 kg lâché de 5 m sans frottement : l’énergie potentielle Ep = m g z diminue quand il descend, l’énergie cinétique Ec augmente, et leur somme Em reste égale à 50 J.",
  (p) => p.seg(0, 50, 5, 50, "dg-curve-3") + p.seg(0, 0, 5, 50) + p.seg(0, 50, 5, 0, "dg-curve-alt") + p.text(2.5, 53, "Em = Ec + Ep", "dg-lbl-xs") + p.text(4.4, 38, "Ep", "dg-lbl-sm") + p.text(0.6, 38, "Ec", "dg-lbl-sm"),
);

const champ = (() => {
  let b = rect(30, 20, 240, 10, "dg-t-red") + rect(30, 150, 240, 10, "dg-t-blue");
  for (let x = 40; x <= 260; x += 22) b += tx(x, 14, "+", "dg-lbl") + tx(x, 172, "−", "dg-lbl");
  for (const x of [60, 120, 180, 240]) b += arrow(x, 36, x, 140, "dg-ink-thin", "dg-pt", 7);
  b += tx(282, 90, "E", "dg-lbl-math") + circ(150, 70, 8, "dg-t-red") + tx(150, 70, "+", "dg-lbl-xs") + arrow(150, 80, 150, 112, "dg-vec", "dg-vec-head", 8) + tx(160, 100, "F = qE", "dg-lbl-xs", "start");
  b += tx(150, 190, "champ uniforme entre les plaques : E = U ÷ d", "dg-lbl-xs");
  return svg(W, 200, "Entre deux plaques parallèles chargées, le champ électrostatique est uniforme, dirigé de la plaque positive vers la plaque négative ; une charge positive y subit une force F = qE dans le sens du champ.", b);
})();

const onde = (() => {
  const y0 = 80;
  const lam = 100;
  let d = "";
  for (let x = 10; x <= 290; x += 2) d += `${x === 10 ? "M" : "L"}${x} ${(y0 - 34 * Math.sin(((x - 10) / lam) * 2 * Math.PI)).toFixed(1)}`;
  let b = ln(10, y0, 290, y0, "dg-dash-thin") + path(d, "dg-curve");
  b += path(`M${10 + lam / 4} ${y0 - 48}H${10 + lam / 4 + lam}`, "dg-ink-thin") + ln(10 + lam / 4, y0 - 52, 10 + lam / 4, y0 - 40, "dg-ink-thin") + ln(10 + lam / 4 + lam, y0 - 52, 10 + lam / 4 + lam, y0 - 40, "dg-ink-thin") + tx(10 + lam / 4 + lam / 2, y0 - 58, "λ (longueur d’onde)", "dg-lbl-xs");
  b += ln(10 + lam * 1.75, y0, 10 + lam * 1.75, y0 + 34, "dg-red-line") + tx(10 + lam * 1.75 + 6, y0 + 20, "amplitude", "dg-lbl-xs", "start");
  b += arrow(200, 140, 280, 140, "dg-vec", "dg-vec-head", 8) + tx(240, 152, "propagation", "dg-lbl-xs") + tx(90, 146, "λ = v × T = v ÷ f", "dg-lbl-sm");
  return svg(W, 162, "Onde le long d’une corde : la longueur d’onde λ est la distance entre deux crêtes successives ; λ = v × T. L’onde avance, la corde ne fait que monter et descendre.", b);
})();

const daniell = (() => {
  const beaker = (x: number, cls: string) => path(`M${x} 70V160Q${x} 168 ${x + 8} 168H${x + 80}Q${x + 88} 168 ${x + 88} 160V70`, "dg-glass") + rect(x + 2, 100, 84, 66, cls);
  let b = beaker(20, "dg-sol-zinc") + beaker(192, "dg-sol-copper");
  b += rect(56, 50, 10, 100, "dg-t-grey") + rect(234, 50, 10, 100, "dg-t-red");
  b += path("M88 90V70Q88 40 150 40Q212 40 212 70V90", "dg-salt-bridge") + tx(150, 30, "pont salin", "dg-lbl-xs");
  b += wire([61, 50], [61, 10], [130, 10]) + lamp(148, 10, "h") + wire([166, 10], [239, 10], [239, 50]);
  b += arrow(84, 18, 116, 18, "dg-vec", "dg-vec-head", 7) + tx(100, 28, "e⁻", "dg-lbl-xs");
  b += tx(44, 182, "zinc (pôle −)", "dg-lbl-xs") + tx(44, 194, "Zn → Zn²⁺ + 2e⁻", "dg-lbl-xs") + tx(256, 182, "cuivre (pôle +)", "dg-lbl-xs") + tx(256, 194, "Cu²⁺ + 2e⁻ → Cu", "dg-lbl-xs");
  b += tx(64, 130, "Zn²⁺", "dg-lbl-xs") + tx(236, 130, "Cu²⁺", "dg-lbl-xs");
  return svg(W, 202, "Pile Daniell : une lame de zinc dans une solution d’ions Zn²⁺ et une lame de cuivre dans une solution d’ions Cu²⁺, reliées par un pont salin ; les électrons vont du zinc (pôle −) au cuivre (pôle +) par le circuit extérieur.", b);
})();

const electrolyse = (() => {
  let b = path("M60 60V170Q60 180 70 180H230Q240 180 240 170V60", "dg-glass") + rect(62, 90, 176, 88, "dg-sol-copper");
  b += rect(96, 40, 12, 120, "dg-t-grey") + rect(192, 40, 12, 120, "dg-t-red") + rect(190, 110, 16, 50, "dg-copper-deposit");
  b += wire([102, 40], [102, 14], [130, 14]) + rect(130, 4, 40, 20, "dg-comp", 3) + tx(150, 14, "G", "dg-lbl-sm") + wire([170, 14], [198, 14], [198, 40]);
  b += tx(126, 32, "+", "dg-lbl") + tx(174, 32, "−", "dg-lbl");
  b += lab(102, 70, 40, 60, "anode (+) :|oxydation") + lab(198, 70, 260, 60, "cathode (−) :|réduction") + lab(206, 140, 262, 150, "dépôt de|cuivre");
  b += tx(150, 196, "Q = I × t ; n(e⁻) = Q ÷ F", "dg-lbl-sm");
  return svg(W, 206, "Électrolyse d’une solution de sulfate de cuivre : l’anode, reliée au pôle + du générateur, est le siège d’une oxydation ; à la cathode, reliée au pôle −, les ions cuivre sont réduits et du cuivre se dépose.", b);
})();

/** Potentiels standard (V), valeurs des tables usuelles. */
const COUPLES: [string, string, number][] = [
  ["Ag⁺", "Ag", 0.8],
  ["Cu²⁺", "Cu", 0.34],
  ["H⁺", "H₂", 0],
  ["Fe²⁺", "Fe", -0.44],
  ["Zn²⁺", "Zn", -0.76],
  ["Al³⁺", "Al", -1.66],
];
const redox = (() => {
  const Y = (e: number) => 40 + (0.8 - e) * 70;
  let b = ln(150, 26, 150, Y(-1.66) + 12, "dg-axis-line");
  for (const [ox, red, e] of COUPLES) b += ln(144, Y(e), 156, Y(e), "dg-axis-line") + tx(136, Y(e), ox, "dg-lbl-sm", "end") + tx(164, Y(e), red, "dg-lbl-sm", "start") + tx(230, Y(e), `${String(e).replace(".", ",").replace("-", "−")} V`, "dg-tick", "start");
  b += arrow(40, Y(-1.66), 40, 30, "dg-red-line", "dg-red-fill", 8) + tx(8, 22, "oxydants plus forts", "dg-lbl-xs", "start");
  b += arrow(276, 30, 276, Y(-1.66), "dg-blue-line", "dg-blue-fill", 8) + tx(270, Y(-1.66) + 18, "réducteurs plus forts", "dg-lbl-xs", "end");
  b += path(`M118 ${Y(0.34)}L182 ${Y(-0.76)}`, "dg-gamma") + tx(150, 14, "E° (en volts)", "dg-lbl-xs");
  return svg(W, Y(-1.66) + 32, "Classification de quelques couples oxydant/réducteur par leur potentiel standard : en haut les oxydants les plus forts, en bas les réducteurs les plus forts. La flèche en gamma montre que Cu²⁺ réagit avec Zn.", b);
})();

const loupe = (() => {
  const L = lens({ f: 10, a: -30, h: 6, unit: 5.4, w: W, cx: 178, cy: 80 });
  return svg(W, 140, "Lentille de vergence 10 δ (f′ = 10 cm) et objet AB placé à 30 cm : l’image A′B′ est réelle, renversée, à 15 cm derrière la lentille et deux fois plus petite (γ = −0,5).", L.svg);
})();

const benzene = (() => {
  const C: Pt = [90, 90];
  const r = 44;
  const P = [90, 30, -30, -90, -150, 150].map((d) => [C[0] + r * Math.cos((d * Math.PI) / 180), C[1] - r * Math.sin((d * Math.PI) / 180)] as Pt);
  let b = poly(P, "dg-geo");
  for (let i = 0; i < 6; i += 2) {
    const a = P[i]!;
    const c = P[(i + 1) % 6]!;
    const m: Pt = [(a[0] + c[0]) / 2, (a[1] + c[1]) / 2];
    const k = 0.78;
    b += ln(C[0] + (a[0] - C[0]) * k + (m[0] - C[0]) * 0, C[1] + (a[1] - C[1]) * k, C[0] + (c[0] - C[0]) * k, C[1] + (c[1] - C[1]) * k, "dg-geo");
  }
  P.forEach((p) => {
    const h: Pt = [C[0] + (p[0] - C[0]) * 1.5, C[1] + (p[1] - C[1]) * 1.5];
    b += ln(C[0] + (p[0] - C[0]) * 1.1, C[1] + (p[1] - C[1]) * 1.1, C[0] + (p[0] - C[0]) * 1.36, C[1] + (p[1] - C[1]) * 1.36, "dg-ink-thin") + tx(h[0], h[1], "H", "dg-formula");
  });
  const C2: Pt = [230, 90];
  const P2 = [90, 30, -30, -90, -150, 150].map((d) => [C2[0] + r * Math.cos((d * Math.PI) / 180), C2[1] - r * Math.sin((d * Math.PI) / 180)] as Pt);
  b += poly(P2, "dg-geo") + circ(C2[0], C2[1], r * 0.6, "dg-geo");
  b += tx(90, 172, "formule de Kekulé", "dg-lbl-xs") + tx(230, 172, "électrons délocalisés", "dg-lbl-xs") + tx(150, 190, "benzène C₆H₆", "dg-lbl-sm");
  return svg(W, 200, "Le benzène C₆H₆ : un cycle de six atomes de carbone, chacun lié à un hydrogène ; à gauche la formule de Kekulé, à droite le cercle qui représente les électrons délocalisés.", b);
})();

// ── SVT ─────────────────────────────────────────────────────────────────────

const cellules = (() => {
  // Cellule animale (à gauche) et végétale (à droite), vues au microscope optique (schémas).
  let b = ell(76, 94, 62, 54, "dg-t-pink") + circ(70, 92, 16, "dg-nucleus") + ell(110, 74, 9, 5, "dg-mito") + ell(46, 124, 9, 5, "dg-mito");
  b += rect(162, 36, 128, 116, "dg-cell-wall", 6) + rect(168, 42, 116, 104, "dg-t-green", 4) + rect(196, 60, 76, 66, "dg-vacuole", 18) + circ(182, 128, 11, "dg-nucleus");
  for (const [x, y] of [[178, 54], [276, 60], [280, 134], [226, 136]] as Pt[]) b += ell(x, y, 7, 4, "dg-chloro");
  b += lab(70, 92, 40, 170, "noyau") + lab(130, 100, 136, 170, "membrane") + lab(110, 74, 120, 18, "mitochondrie");
  b += lab(162, 90, 190, 170, "paroi") + lab(234, 92, 250, 170, "vacuole") + lab(276, 60, 270, 18, "chloroplaste");
  b += tx(76, 194, "cellule animale", "dg-lbl-sm") + tx(226, 194, "cellule végétale", "dg-lbl-sm");
  return svg(W, 202, "Une cellule animale et une cellule végétale (schémas) : toutes deux ont une membrane, du cytoplasme, un noyau et des mitochondries ; la cellule végétale a en plus une paroi, une grande vacuole et des chloroplastes.", b);
})();

const bacterieVirus = (() => {
  let b = rect(20, 50, 150, 70, "dg-cell-wall", 35) + rect(26, 56, 138, 58, "dg-t-yellow", 29) + path("M60 84c10-14 30 14 40 0s30-14 40 0", "dg-dna") + path("M170 85c20-6 30 10 50 0", "dg-ink-thin");
  b += lab(30, 60, 30, 26, "paroi") + lab(80, 84, 70, 150, "ADN (chromosome|circulaire)") + lab(196, 86, 196, 140, "flagelle");
  b += tx(95, 186, "bactérie (≈ 2 µm)", "dg-lbl-sm");
  const C: Pt = [250, 80];
  b += poly([0, 60, 120, 180, 240, 300].map((d) => [C[0] + 26 * Math.cos((d * Math.PI) / 180), C[1] - 26 * Math.sin((d * Math.PI) / 180)] as Pt), "dg-capsid") + path(`M${C[0] - 10} ${C[1]}c5-8 10 8 15 0s10-8 15 0`, "dg-dna");
  b += lab(C[0] + 22, C[1] - 14, 280, 26, "capside") + lab(C[0], C[1], 256, 140, "matériel|génétique");
  b += tx(250, 186, "virus (≈ 0,1 µm)", "dg-lbl-sm");
  return svg(W, 196, "Une bactérie, cellule sans noyau avec une paroi, un chromosome circulaire et souvent un flagelle ; un virus, beaucoup plus petit, fait d’une capside de protéines qui enferme son matériel génétique (tailles non respectées).", b);
})();

const osmose = (() => {
  const cellAt = (cx: number, r: number, label: string, sub: string, burst = false) =>
    rect(cx - 44, 30, 88, 90, "dg-sea", 8) + (burst ? path(`M${cx - 18} 74l6 -10 6 8 8 -10 6 10 6 -6 4 12`, "dg-t-red") : circ(cx, 75, r, "dg-t-red")) + tx(cx, 136, label, "dg-lbl-xs") + tx(cx, 148, sub, "dg-lbl-xs");
  let b = cellAt(52, 26, "eau pure", "hémolyse", true) + cellAt(150, 20, "eau à 9 g/L", "pas de changement") + cellAt(248, 13, "eau très salée", "le globule se ratatine");
  b += arrow(36, 52, 46, 62, "dg-blue-line", "dg-blue-fill", 6) + arrow(248, 70, 262, 56, "dg-blue-line", "dg-blue-fill", 6);
  b += tx(150, 14, "globules rouges dans trois solutions", "dg-lbl-sm") + tx(150, 170, "l’eau va vers le milieu le plus concentré", "dg-lbl-xs");
  return svg(W, 180, "Osmose : dans l’eau pure, l’eau entre dans le globule rouge, qui éclate ; dans une solution à 9 g/L de sel, rien ne change ; dans une eau très salée, l’eau sort et le globule se ratatine.", b);
})();

const mitose = (() => {
  const cellBox = (x: number, label: string, art: string) => circ(x + 36, 70, 32, "dg-t-pink") + art + tx(x + 36, 118, label, "dg-lbl-xs");
  const chrom = (x: number, y: number, rot = 0, cls = "dg-chromo-x") => `<g transform="rotate(${rot} ${x} ${y})"><rect class="${cls}" x="${x - 2}" y="${y - 9}" width="4" height="18" rx="2"/><rect class="${cls}" x="${x + 2}" y="${y - 9}" width="4" height="18" rx="2"/></g>`;
  let b = "";
  b += cellBox(0, "prophase", chrom(26, 64, 20) + chrom(46, 76, -30, "dg-chromo-y"));
  b += cellBox(74, "métaphase", ln(110, 42, 110, 98, "dg-dash-thin") + chrom(108, 60) + chrom(108, 82, 0, "dg-chromo-y"));
  b += cellBox(148, "anaphase", rect(162, 58, 4, 16, "dg-chromo-x", 2) + rect(200, 58, 4, 16, "dg-chromo-x", 2) + rect(162, 80, 4, 16, "dg-chromo-y", 2) + rect(200, 80, 4, 16, "dg-chromo-y", 2) + arrow(176, 54, 162, 54, "dg-ink-thin", "dg-pt", 5) + arrow(190, 54, 204, 54, "dg-ink-thin", "dg-pt", 5));
  b += ell(256, 70, 18, 28, "dg-t-pink") + ell(286, 70, 18, 28, "dg-t-pink") + rect(252, 60, 4, 14, "dg-chromo-x", 2) + rect(256, 76, 4, 14, "dg-chromo-y", 2) + rect(282, 60, 4, 14, "dg-chromo-x", 2) + rect(286, 76, 4, 14, "dg-chromo-y", 2) + tx(271, 118, "télophase", "dg-lbl-xs");
  b += tx(150, 18, "mitose d’une cellule à deux chromosomes", "dg-lbl-sm") + tx(150, 142, "deux cellules filles identiques à la cellule mère", "dg-lbl-xs");
  return svg(W, 152, "Les quatre phases de la mitose : en prophase les chromosomes doubles se condensent ; en métaphase ils s’alignent au milieu ; en anaphase leurs deux moitiés se séparent ; en télophase il se forme deux cellules filles identiques.", b);
})();

const proteines = (() => {
  let b = rect(10, 20, 130, 150, "dg-t-pink", 12) + tx(75, 34, "noyau", "dg-lbl-xs");
  b += path("M30 60c10-10 20 10 30 0s20-10 30 0 20 10 30 0", "dg-dna") + path("M30 70c10-10 20 10 30 0s20-10 30 0 20 10 30 0", "dg-dna") + tx(75, 90, "ADN (gène)", "dg-lbl-xs");
  b += arrow(75, 98, 75, 124, "dg-ink", "dg-pt", 7) + tx(84, 112, "transcription", "dg-lbl-xs", "start") + path("M40 140c8-6 16 6 24 0s16-6 24 0 16 6 24 0", "dg-rna") + tx(75, 156, "ARN messager", "dg-lbl-xs");
  b += arrow(140, 140, 176, 140, "dg-ink", "dg-pt", 7);
  b += ell(214, 140, 30, 16, "dg-t-grey") + tx(214, 140, "ribosome", "dg-lbl-xs") + arrow(214, 124, 214, 92, "dg-ink", "dg-pt", 7) + tx(222, 108, "traduction", "dg-lbl-xs", "start");
  for (let i = 0; i < 6; i++) b += circ(184 + i * 14, 70, 6, i % 2 ? "dg-t-yellow" : "dg-t-green");
  b += tx(220, 50, "protéine (acides aminés)", "dg-lbl-xs") + tx(220, 184, "cytoplasme", "dg-lbl-xs");
  return svg(W, 194, "Synthèse des protéines : dans le noyau, un gène de l’ADN est recopié en ARN messager (transcription) ; dans le cytoplasme, les ribosomes lisent l’ARN et assemblent les acides aminés en protéine (traduction).", b);
})();

/** Vitesse des ondes sismiques P et S selon la profondeur (modèle PREM, valeurs arrondies, km/s). */
const PREM_P: [number, number][] = [[0, 5.8], [35, 6.5], [35, 8.0], [410, 9.0], [670, 10.3], [2890, 13.7], [2890, 8.1], [5150, 10.3], [5150, 11.0], [6371, 11.3]];
const PREM_S: [number, number][] = [[0, 3.4], [35, 3.8], [35, 4.5], [410, 4.9], [670, 5.6], [2890, 7.3], [2890, 0], [5150, 0], [5150, 3.5], [6371, 3.7]];
const vitesses = plot(
  { x: [0, 6400], y: [0, 14], unit: 0.04, unitY: 12, ticksX: [1000, 2900, 5150], ticksY: [2, 4, 6, 8, 10, 12], grid: false, labelX: "km", labelY: "km/s", pad: 30 },
  "Vitesse des ondes sismiques P et S selon la profondeur (modèle de référence PREM, valeurs arrondies) : à 2 900 km, les ondes P ralentissent brusquement et les ondes S disparaissent, car le noyau externe est liquide.",
  (p) =>
    `<path class="dg-curve" d="M${PREM_P.map(([z, v]) => `${p.X(z).toFixed(1)} ${p.Y(v).toFixed(1)}`).join("L")}"/>` +
    `<path class="dg-curve-alt" d="M${PREM_S.map(([z, v]) => `${p.X(z).toFixed(1)} ${p.Y(v).toFixed(1)}`).join("L")}"/>` +
    p.vline(2890, "dg-dash-thin") +
    p.vline(5150, "dg-dash-thin") +
    p.text(1400, 12.6, "ondes P", "dg-lbl-xs") +
    p.text(1400, 7, "ondes S", "dg-lbl-xs") +
    p.text(1450, 1.2, "manteau", "dg-lbl-xs") +
    p.text(4000, 1.2, "noyau liquide", "dg-lbl-xs") +
    p.text(5780, 1.2, "graine", "dg-lbl-xs"),
);

// ── Géographie ──────────────────────────────────────────────────────────────

/** Population mondiale (milliards d'habitants, estimations des Nations unies). */
const POP: [number, number][] = [[1800, 1], [1900, 1.6], [1950, 2.5], [1960, 3], [1975, 4.1], [1987, 5], [2000, 6.1], [2011, 7], [2022, 8]];
const population = plot(
  { x: [1800, 2030], y: [0, 9], unit: 1.12, unitY: 18, ticksX: [1800, 1850, 1900, 1950, 2000], ticksY: [2, 4, 6, 8], grid: false, labelX: "année", labelY: "milliards", pad: 30 },
  "Population mondiale de 1800 à 2022 : 1 milliard vers 1800, 2,5 milliards en 1950, 8 milliards en 2022 (estimations des Nations unies) ; la croissance est très rapide depuis 1950.",
  (p) =>
    `<path class="dg-curve" d="M${POP.map(([y, v]) => `${p.X(y).toFixed(1)} ${p.Y(v).toFixed(1)}`).join("L")}"/>` +
    POP.map(([y, v]) => p.point(y, v, "", 0, 0)).join("") +
    p.text(2015, 8.5, "8 milliards (2022)", "dg-lbl-xs", "end") +
    `<text class="dg-source" x="30" y="${p.Y(0) + 26}">Source : Nations unies (estimations)</text>`,
);

const transition = plot(
  { x: [0, 10], y: [0, 50], unit: 26, unitY: 3, ticksX: [], ticksY: [10, 20, 30, 40], grid: false, labelX: "temps", labelY: "‰" },
  "Schéma de la transition démographique : la mortalité baisse d’abord, la natalité ensuite ; entre les deux, la population augmente vite.",
  (p) => {
    const birth = (t: number) => (t < 3.5 ? 42 : t > 8 ? 12 : 42 - 30 * ((t - 3.5) / 4.5) ** 1.2);
    const death = (t: number) => (t < 1.5 ? 38 : t > 6 ? 10 : 38 - 28 * ((t - 1.5) / 4.5) ** 0.8);
    let area = "";
    for (let t = 1.5; t <= 8.05; t += 0.1) area += `L${p.X(t).toFixed(1)} ${p.Y(birth(t)).toFixed(1)}`;
    for (let t = 8; t >= 1.5; t -= 0.1) area += `L${p.X(t).toFixed(1)} ${p.Y(death(t)).toFixed(1)}`;
    return (
      `<path class="dg-area" d="M${area.slice(1)}Z"/>` +
      p.curve(birth, 0, 10) +
      p.curve(death, 0, 10, "dg-curve-alt") +
      p.text(9.6, 15, "natalité", "dg-lbl-xs", "end") +
      p.text(7.4, 6.5, "mortalité", "dg-lbl-xs", "end") +
      p.text(5, 30, "forte croissance", "dg-lbl-xs") +
      p.vline(1.5, "dg-dash-thin") +
      p.vline(8, "dg-dash-thin")
    );
  },
);

/** Part de la population mondiale vivant en ville (ONU, World Urbanization Prospects 2018). */
const URB: [number, number][] = [[1950, 29.6], [1975, 37.7], [2000, 46.7], [2007, 50], [2018, 55.3]];
const urbanisation = plot(
  { x: [1950, 2025], y: [0, 70], unit: 3.4, unitY: 2.2, ticksX: [1950, 1975, 2000, 2025], ticksY: [20, 40, 60], grid: false, labelX: "année", labelY: "% urbains", pad: 30 },
  "Part des citadins dans la population mondiale : 30 % en 1950, la moitié en 2007, 55 % en 2018 (Nations unies).",
  (p) =>
    p.hline(50, "dg-dash-thin") +
    `<path class="dg-curve" d="M${URB.map(([y, v]) => `${p.X(y).toFixed(1)} ${p.Y(v).toFixed(1)}`).join("L")}"/>` +
    URB.map(([y, v]) => p.point(y, v, "", 0, 0)).join("") +
    p.text(2005, 55, "2007 : un humain sur deux", "dg-lbl-xs", "end") +
    `<text class="dg-source" x="30" y="${p.Y(0) + 26}">Source : ONU, World Urbanization Prospects 2018</text>`,
);

export const SCHEMAS_1RE: Record<string, string> = {
  "m1-limites": limites,
  "m1-tangente": tangente,
  "m1-variations": variations,
  "m1-suites": suites,
  "m1-nuage": nuage,
  "m1-pascal": pascal,
  "m1-optimisation": optimisation,
  "m1-complexe": complexe,
  "m1-interets": interets,
  "p1-travail": travail,
  "p1-energie": energie,
  "p1-champ": champ,
  "p1-onde": onde,
  "p1-daniell": daniell,
  "p1-electrolyse": electrolyse,
  "p1-redox": redox,
  "p1-lentille": loupe,
  "p1-benzene": benzene,
  "s1-cellules": cellules,
  "s1-bacterie-virus": bacterieVirus,
  "s1-osmose": osmose,
  "s1-mitose": mitose,
  "s1-proteines": proteines,
  "s1-vitesses-sismiques": vitesses,
  "g1-population": population,
  "g1-transition": transition,
  "g1-urbanisation": urbanisation,
};

