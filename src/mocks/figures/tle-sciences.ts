// Schémas de Terminale en physique-chimie (projectile, plan incliné, chute dans un fluide, satellite,
// solénoïde, force de Lorentz, rails de Laplace, dipôles RC et RL, oscillations, résonance, pendule
// élastique, fentes de Young, effet photoélectrique, niveaux de l'hydrogène, décroissance, courbe d'Aston,
// cinétique, domaines de prédominance, dosages) et en SVT (encéphale, moelle épinière, potentiel d'action,
// synapse, sarcomère, glycémie, cycle ovarien, croisement, arbre généalogique, fleur).
// Les courbes sont calculées à partir des lois du cours, avec des valeurs d'exemple données en légende.

import { svg } from "../drawings";
import { arrow, circ, dot, ell, lab, ln, path, plot, punnett, type Pt, rect, tx } from "./kit";

const W = 300;
const curvePts = (p: { X: (x: number) => number; Y: (y: number) => number }, pts: [number, number][], cls = "dg-curve") =>
  `<path class="${cls}" d="M${pts.map(([x, y]) => `${p.X(x).toFixed(1)} ${p.Y(y).toFixed(1)}`).join("L")}"/>`;

// ── Mécanique ───────────────────────────────────────────────────────────────

/** Projectile lancé à 10 m/s sous 45° (g = 10 m/s²) : z = −0,1 x² + x ; portée 10 m, flèche 2,5 m. */
const projectile = plot(
  { x: [0, 11], y: [0, 4], unit: 24, unitY: 40, ticksX: [2, 4, 6, 8, 10], ticksY: [1, 2, 3], grid: false, labelX: "x (m)", labelY: "z (m)" },
  "Trajectoire parabolique d’un projectile lancé à 10 m/s sous un angle de 45° (sans frottement, g = 10 m/s²) : il monte à 2,5 m (la flèche) et retombe à 10 m (la portée).",
  (p) =>
    p.curve((x) => -0.1 * x * x + x, 0, 10) +
    p.vec(0, 0, 1.6, 1.6) +
    p.text(1.4, 2.1, "v₀", "dg-lbl-math") +
    p.guides(5, 2.5) +
    p.text(5, 2.85, "flèche 2,5 m", "dg-lbl-xs") +
    p.point(10, 0, "", 0, 0) +
    p.text(9.6, 0.45, "portée 10 m", "dg-lbl-xs", "end"),
);

const planIncline = (() => {
  const a = (25 * Math.PI) / 180;
  const A: Pt = [20, 170];
  const B: Pt = [280, 170];
  const C: Pt = [20, 170 - 260 * Math.tan(a)];
  let b = path(`M${A[0]} ${A[1]}L${B[0]} ${B[1]}L${C[0]} ${C[1]}Z`, "dg-t-sand");
  // Bloc posé sur la pente, au milieu.
  const t = 0.45;
  const M: Pt = [C[0] + (B[0] - C[0]) * t, C[1] + (B[1] - C[1]) * t];
  const ux = Math.cos(a);
  const uy = Math.sin(a);
  const nx = -Math.sin(a);
  const ny = -Math.cos(a);
  const corner = (dx: number, dy: number): Pt => [M[0] + ux * dx + nx * dy, M[1] + uy * dx + ny * dy];
  b += path(`M${corner(-20, 0).join(" ")}L${corner(20, 0).join(" ")}L${corner(20, 26).join(" ")}L${corner(-20, 26).join(" ")}Z`, "dg-t-grey");
  const G = corner(0, 13);
  b += arrow(G[0], G[1], G[0], G[1] + 60, "dg-vec", "dg-vec-head", 9) + tx(G[0] + 8, G[1] + 56, "P", "dg-lbl-math", "start");
  b += arrow(G[0], G[1], G[0] + nx * 54, G[1] + ny * 54, "dg-vec", "dg-vec-head", 9) + tx(G[0] + nx * 58 + 8, G[1] + ny * 58, "R", "dg-lbl-math", "start");
  b += arrow(M[0] + ux * 30, M[1] + uy * 30 + 14, M[0] + ux * 80, M[1] + uy * 80 + 14, "dg-ink", "dg-pt", 7) + tx(M[0] + ux * 55, M[1] + uy * 55 + 30, "mouvement", "dg-lbl-xs");
  b += path(`M${B[0] - 40} ${B[1]}A40 40 0 0 0 ${B[0] - 40 * Math.cos(a)} ${B[1] - 40 * Math.sin(a)}`, "dg-arc") + tx(B[0] - 54, B[1] - 8, "α", "dg-lbl-math");
  b += tx(150, 194, "sans frottement : a = g sin α le long de la pente", "dg-lbl-xs");
  return svg(W, 204, "Solide sur un plan incliné d’angle α, sans frottement : il est soumis à son poids P (vertical) et à la réaction R du plan (perpendiculaire au plan) ; il glisse avec une accélération a = g sin α.", b);
})();

const chuteFluide = plot(
  { x: [0, 3], y: [0, 6], unit: 80, unitY: 26, ticksX: [0.5, 1, 1.5, 2, 2.5], ticksY: [1, 2, 3, 4, 5], grid: false, labelX: "t (s)", labelY: "v (m/s)" },
  "Chute verticale dans un fluide (exemple : vitesse limite 5 m/s, temps caractéristique 0,5 s) : la vitesse augmente puis se stabilise à la vitesse limite.",
  (p) => p.curve((t) => 5 * (1 - Math.exp(-t / 0.5)), 0, 3) + p.hline(5, "dg-dash") + p.seg(0, 0, 0.5, 5, "dg-curve-alt") + p.text(2.4, 5.35, "vitesse limite", "dg-lbl-xs") + p.text(0.62, 3, "τ", "dg-lbl-math"),
);

const satellite = (() => {
  const O: Pt = [140, 110];
  let b = circ(O[0], O[1], 40, "dg-t-blue") + tx(O[0], O[1], "Terre", "dg-lbl-xs") + circ(O[0], O[1], 90, "dg-dash");
  const S = [O[0] + 90 * Math.cos(-0.7), O[1] + 90 * Math.sin(-0.7)] as Pt;
  b += rect(S[0] - 6, S[1] - 6, 12, 12, "dg-t-grey", 2);
  const toC: Pt = [(O[0] - S[0]) / 90, (O[1] - S[1]) / 90];
  b += arrow(S[0], S[1], S[0] + toC[0] * 44, S[1] + toC[1] * 44, "dg-vec", "dg-vec-head", 9) + tx(S[0] + toC[0] * 30 - 12, S[1] + toC[1] * 30 + 4, "F", "dg-lbl-math", "end");
  b += arrow(S[0], S[1], S[0] + toC[1] * 54, S[1] - toC[0] * 54, "dg-curve", "dg-pt", 9) + tx(S[0] + toC[1] * 54 + 8, S[1] - toC[0] * 54, "v", "dg-lbl-math", "start");
  b += tx(150, 214, "force dirigée vers le centre de la Terre ;", "dg-lbl-xs") + tx(150, 226, "vitesse tangente à l’orbite circulaire", "dg-lbl-xs");
  return svg(W, 234, "Satellite en orbite circulaire : la force de gravitation exercée par la Terre est dirigée vers son centre ; la vitesse est tangente à l’orbite (tailles non respectées).", b);
})();

const solenoide = (() => {
  let b = "";
  for (let i = 0; i < 9; i++) b += ell(90 + i * 15, 90, 6, 30, "dg-coil");
  for (const dy of [-16, 0, 16]) b += arrow(60, 90 + dy, 240, 90 + dy, "dg-curve", "dg-pt", 8);
  b += path("M240 74C300 50 300 -6 150 14C0 34 0 60 60 74", "dg-field") + path("M240 106C300 130 300 186 150 166C0 146 0 120 60 106", "dg-field");
  b += tx(254, 90, "N", "dg-lbl") + tx(46, 90, "S", "dg-lbl") + tx(150, 140, "champ uniforme à l’intérieur", "dg-lbl-xs") + tx(150, 194, "B = μ₀ n I", "dg-lbl-sm");
  return svg(W, 204, "Spectre magnétique d’un solénoïde parcouru par un courant : à l’intérieur, les lignes de champ sont parallèles (champ uniforme, B = μ₀ n I) ; à l’extérieur, elles ressemblent à celles d’un aimant droit, de la face nord vers la face sud.", b);
})();

const lorentz = (() => {
  let b = "";
  for (let x = 20; x < 300; x += 30) for (let y = 20; y < 200; y += 30) b += tx(x, y, "×", "dg-cross");
  const C: Pt = [150, 100];
  const r = 70;
  b += circ(C[0], C[1], r, "dg-curve");
  const Pq: Pt = [C[0], C[1] + r];
  b += circ(Pq[0], Pq[1], 7, "dg-t-red") + tx(Pq[0], Pq[1], "+", "dg-lbl-xs");
  b += arrow(Pq[0], Pq[1], Pq[0] + 54, Pq[1], "dg-vec", "dg-vec-head", 9) + tx(Pq[0] + 60, Pq[1] - 8, "v", "dg-lbl-math");
  b += arrow(Pq[0], Pq[1] - 8, Pq[0], Pq[1] - 52, "dg-ink", "dg-pt", 9) + tx(Pq[0] + 8, Pq[1] - 40, "F", "dg-lbl-math", "start");
  b += tx(264, 14, "B (vers l’arrière)", "dg-lbl-xs");
  b += tx(150, 214, "R = m v ÷ (|q| B)", "dg-lbl-sm");
  return svg(W, 222, "Particule de charge positive dans un champ magnétique uniforme dirigé vers l’arrière de la feuille : la force de Lorentz, perpendiculaire à la vitesse, la fait tourner sur un cercle de rayon R = m v ÷ (|q| B).", b);
})();

const laplace = (() => {
  let b = "";
  for (let x = 30; x < 290; x += 30) for (let y = 30; y < 160; y += 30) b += tx(x, y, "×", "dg-cross");
  b += ln(20, 40, 290, 40, "dg-rail") + ln(20, 150, 290, 150, "dg-rail") + ln(180, 40, 180, 150, "dg-rod-metal");
  b += path("M20 40V150", "dg-wire") + rect(10, 82, 20, 26, "dg-comp", 3) + tx(20, 95, "G", "dg-lbl-xs");
  b += arrow(194, 130, 194, 70, "dg-ink", "dg-pt", 8) + tx(202, 100, "I", "dg-lbl-math", "start");
  b += arrow(180, 95, 120, 95, "dg-vec", "dg-vec-head", 10) + tx(140, 82, "F", "dg-lbl-math");
  b += tx(150, 176, "F = I L B : la tige roule sur les rails", "dg-lbl-xs") + tx(262, 14, "B (vers l’arrière)", "dg-lbl-xs");
  return svg(W, 186, "Rails de Laplace : une tige parcourue par un courant I, dans un champ magnétique B vers l’arrière, subit une force de Laplace perpendiculaire à la tige et au champ, d’intensité F = I L B ; la tige roule sur les rails.", b);
})();

// ── Électricité et oscillations ────────────────────────────────────────────

const rc = plot(
  { x: [0, 5], y: [0, 12], unit: 50, unitY: 13, ticksX: [1, 2, 3, 4, 5], ticksY: [2, 4, 6.3, 8, 10], grid: false, labelX: "t (ms)", labelY: "uC (V)" },
  "Charge d’un condensateur sous E = 10 V avec τ = RC = 1 ms : uC = E(1 − e^(−t/τ)) atteint 63 % de E (6,3 V) au bout de τ ; la tangente à l’origine coupe la droite uC = E en t = τ.",
  (p) => p.curve((t) => 10 * (1 - Math.exp(-t)), 0, 5) + p.curve((t) => 10 * Math.exp(-t), 0, 5, "dg-curve-alt") + p.hline(10, "dg-dash") + p.seg(0, 0, 1, 10, "dg-dash-thin") + p.guides(1, 6.32) + p.text(4.3, 10.7, "charge", "dg-lbl-xs") + p.text(3.4, 1.6, "décharge", "dg-lbl-xs") + p.text(1.12, 0.6, "τ", "dg-lbl-math", "start"),
);

const rl = plot(
  { x: [0, 5], y: [0, 120], unit: 50, unitY: 1.2, ticksX: [1, 2, 3, 4, 5], ticksY: [20, 40, 63, 80, 100], grid: false, labelX: "t (ms)", labelY: "i (mA)" },
  "Établissement du courant dans un dipôle (R, L) (exemple : courant final 100 mA, τ = L/R = 1 ms) : la bobine retarde l’établissement du courant, qui atteint 63 % de sa valeur finale au bout de τ.",
  (p) => p.curve((t) => 100 * (1 - Math.exp(-t)), 0, 5) + p.hline(100, "dg-dash") + p.guides(1, 63.2) + p.text(4.2, 108, "I = E ÷ R", "dg-lbl-xs") + p.text(1.12, 6, "τ", "dg-lbl-math", "start"),
);

const amorties = plot(
  { x: [0, 10], y: [-6, 6], unit: 26, unitY: 13, ticksX: [2, 4, 6, 8, 10], ticksY: [-5, 5], grid: false, labelX: "t (ms)", labelY: "u (V)" },
  "Oscillations électriques libres dans un circuit RLC (exemple : période 2 ms) : la tension oscille autour de 0 et son amplitude diminue à cause de la résistance (régime pseudo-périodique).",
  (p) => p.curve((t) => 5 * Math.exp(-t / 4) * Math.cos(Math.PI * t), 0, 10, "dg-curve", 400) + p.curve((t) => 5 * Math.exp(-t / 4), 0, 10, "dg-dash-thin") + p.curve((t) => -5 * Math.exp(-t / 4), 0, 10, "dg-dash-thin") + p.text(6, 4.4, "amplitude qui décroît", "dg-lbl-xs"),
);

/** Résonance d'intensité : L = 0,1 H, C = 10 µF (f₀ ≈ 159 Hz), U = 1 V, R = 20 Ω ou 60 Ω. */
const resonance = plot(
  { x: [50, 300], y: [0, 55], unit: 1, unitY: 3, ticksX: [100, 159, 200, 250], ticksY: [10, 20, 30, 40, 50], grid: false, labelX: "f (Hz)", labelY: "I (mA)", xAxisAt: 0 },
  "Résonance d’intensité d’un circuit RLC (L = 0,1 H, C = 10 µF, tension 1 V) : l’intensité est maximale à la fréquence propre f₀ ≈ 159 Hz ; la résonance est d’autant plus aiguë que la résistance est faible (20 Ω contre 60 Ω).",
  (p) => {
    const I = (f: number, R: number) => {
      const w = 2 * Math.PI * f;
      return 1000 / Math.sqrt(R * R + (0.1 * w - 1 / (1e-5 * w)) ** 2);
    };
    return p.curve((f) => I(f, 20), 50, 300) + p.curve((f) => I(f, 60), 50, 300, "dg-curve-alt") + p.vline(159.2, "dg-dash-thin") + p.text(190, 46, "R = 20 Ω", "dg-lbl-xs", "start") + p.text(210, 14, "R = 60 Ω", "dg-lbl-xs", "start");
  },
);

const pendule = (() => {
  let b = rect(16, 20, 8, 120, "dg-pt") + path(`M24 80${"l6 -12 6 24 6 -24 6 24 6 -24 6 24 6 -12".repeat(1)}h10`, "dg-ink") + rect(84, 66, 34, 28, "dg-t-grey", 3) + rect(16, 94, 200, 6, "dg-t-sand");
  b += ln(101, 104, 101, 116, "dg-ink-thin") + tx(101, 124, "O", "dg-lbl-math") + arrow(118, 80, 156, 80, "dg-ink", "dg-pt", 7) + tx(140, 70, "x", "dg-lbl-math");
  // Courbe x(t).
  const x0 = 34;
  const y0 = 170;
  let d = "";
  for (let i = 0; i <= 240; i += 2) d += `${i ? "L" : "M"}${x0 + i} ${(y0 - 22 * Math.cos((i / 80) * 2 * Math.PI)).toFixed(1)}`;
  b += arrow(x0 - 6, y0, 290, y0, "dg-axis-line", "dg-pt", 6) + path(d, "dg-curve") + tx(282, y0 + 12, "t", "dg-lbl-math") + path(`M${x0 + 80} ${y0 - 34}H${x0 + 160}`, "dg-ink-thin") + tx(x0 + 120, y0 - 42, "T₀ = 2π √(m/k)", "dg-lbl-xs");
  return svg(W, 206, "Pendule élastique horizontal sans frottement : le solide oscille autour de sa position d’équilibre O ; son abscisse x(t) est sinusoïdale, de période T₀ = 2π √(m/k).", b);
})();

// ── Optique et physique moderne ────────────────────────────────────────────

const young = (() => {
  let b = rect(8, 70, 10, 40, "dg-t-yellow") + tx(13, 124, "source", "dg-lbl-xs") + ln(60, 20, 60, 160, "dg-ink");
  b += rect(56, 76, 8, 8, "dg-surface-gap") + rect(56, 96, 8, 8, "dg-surface-gap") + tx(46, 80, "F₁", "dg-lbl-xs", "end") + tx(46, 100, "F₂", "dg-lbl-xs", "end");
  b += path("M18 90L60 80M18 90L60 100", "dg-ray") + path("M64 80L200 30M64 100L200 30M64 80L200 150M64 100L200 150", "dg-ray-virtual");
  b += ln(200, 20, 200, 160, "dg-ink");
  for (let k = -3; k <= 3; k++) b += rect(202, 90 + k * 20 - 5, 24, 10, "dg-fringe");
  b += path("M232 90h40M232 110h40", "dg-ink-thin") + tx(278, 100, "i", "dg-lbl-math", "start") + tx(130, 176, "interfrange i = λ D ÷ a", "dg-lbl-sm") + tx(214, 172, "écran", "dg-lbl-xs");
  return svg(W, 186, "Expérience des fentes de Young : deux fentes fines F₁ et F₂ éclairées par la même source forment sur l’écran des franges brillantes et sombres régulièrement espacées de l’interfrange i = λ D ÷ a.", b);
})();

/** Effet photoélectrique (exemple : césium, travail d'extraction 1,9 eV) : Ec max = h ν − W₀. */
const photo = plot(
  { x: [0, 12], y: [-2, 3.2], unit: 22, unitY: 32, ticksX: [2, 4, 6, 8, 10, 12], ticksY: [-1, 1, 2, 3], grid: false, labelX: "ν (10¹⁴ Hz)", labelY: "Ec max (eV)" },
  "Effet photoélectrique sur le césium (travail d’extraction 1,9 eV) : l’énergie cinétique maximale des électrons émis Ec = h ν − W₀ augmente avec la fréquence ν ; en dessous du seuil ν₀ ≈ 4,6 × 10¹⁴ Hz, aucun électron n’est émis.",
  (p) => {
    const h = 4.136e-1; // h en eV par 10¹⁴ Hz
    return p.seg(4.59, 0, 12, h * 12 - 1.9) + p.seg(0, -1.9, 4.59, 0, "dg-dash") + p.point(4.59, 0, "ν₀", 0, 12) + p.text(9.5, 2.95, "pente h", "dg-lbl-xs") + p.text(0.6, -1.6, "−W₀", "dg-lbl-xs", "start");
  },
);

const niveaux = (() => {
  const E = (n: number) => -13.6 / (n * n);
  const Y = (e: number) => 20 + (-e / 13.6) * 250;
  let b = "";
  for (const n of [1, 2, 3, 4]) b += ln(60, Y(E(n)), 230, Y(E(n)), "dg-ink") + tx(56, Y(E(n)), `n = ${n}`, "dg-lbl-xs", "end") + tx(234, Y(E(n)), `${String(Math.round(E(n) * 100) / 100).replace(".", ",").replace("-", "−")} eV`, "dg-tick", "start");
  b += ln(60, Y(0), 230, Y(0), "dg-dash") + tx(56, Y(0), "n = ∞", "dg-lbl-xs", "end") + tx(234, Y(0), "0 eV", "dg-tick", "start");
  for (const [k, n] of [[0, 2], [1, 3], [2, 4]] as [number, number][]) b += arrow(80 + k * 14, Y(E(n)), 80 + k * 14, Y(E(1)) - 2, "dg-vec", "dg-vec-head", 7);
  for (const [k, n] of [[0, 3], [1, 4]] as [number, number][]) b += arrow(150 + k * 14, Y(E(n)), 150 + k * 14, Y(E(2)) - 2, "dg-curve-3", "dg-green-fill", 7);
  b += tx(94, Y(E(1)) - 14, "Lyman (UV)", "dg-lbl-xs") + tx(164, Y(E(2)) + 12, "Balmer (visible)", "dg-lbl-xs");
  return svg(W, 286, "Niveaux d’énergie de l’atome d’hydrogène, En = −13,6/n² eV : en retombant vers le niveau 1, l’atome émet les raies de Lyman (ultraviolet) ; vers le niveau 2, celles de Balmer (visibles).", b);
})();

const decroissance = plot(
  { x: [0, 5], y: [0, 1.1], unit: 50, unitY: 140, ticksX: [1, 2, 3, 4], ticksY: [0.25, 0.5, 1], grid: false, labelX: "t/T", labelY: "N/N₀" },
  "Décroissance radioactive : le nombre de noyaux N = N₀ e^(−λt) est divisé par 2 à chaque période T (demi-vie).",
  (p) => p.curve((t) => Math.exp(-Math.LN2 * t), 0, 5) + p.guides(1, 0.5) + p.guides(2, 0.25) + p.guides(3, 0.125) + p.text(1.15, 0.6, "N₀/2 à t = T", "dg-lbl-xs", "start") + p.text(2.15, 0.33, "N₀/4 à t = 2T", "dg-lbl-xs", "start"),
);

/** Énergie de liaison par nucléon (MeV), valeurs des tables pour quelques noyaux. */
const ASTON: [number, number, string][] = [[2, 1.11, "²H"], [4, 7.07, "⁴He"], [6, 5.33, "⁶Li"], [12, 7.68, "¹²C"], [16, 7.98, "¹⁶O"], [56, 8.79, "⁵⁶Fe"], [120, 8.51, "¹²⁰Sn"], [238, 7.57, "²³⁸U"]];
const aston = plot(
  { x: [0, 250], y: [0, 10], unit: 1.04, unitY: 16, ticksX: [50, 100, 150, 200], ticksY: [2, 4, 6, 8], grid: false, labelX: "A", labelY: "Eℓ/A (MeV)", pad: 30 },
  "Énergie de liaison par nucléon selon le nombre de masse A : maximale vers le fer 56 (environ 8,8 MeV), les noyaux les plus stables ; les noyaux légers libèrent de l’énergie en fusionnant, les lourds en se cassant (fission).",
  (p) =>
    curvePts(p, ASTON.map(([a, e]) => [a, e])) +
    ASTON.map(([a, e, n]) => p.point(a, e, ["²H", "⁴He", "⁵⁶Fe", "²³⁸U"].includes(n) ? n : "", a > 200 ? -6 : a < 10 ? 14 : 8, a === 4 ? 4 : -9)).join("") +
    p.text(20, 9.3, "fusion →", "dg-lbl-xs") +
    p.text(200, 9.3, "← fission", "dg-lbl-xs"),
);

// ── Chimie ──────────────────────────────────────────────────────────────────

const cinetique = plot(
  { x: [0, 60], y: [0, 12], unit: 4.4, unitY: 13, ticksX: [10, 20, 30, 40, 50], ticksY: [2, 4, 6, 8, 10], grid: false, labelX: "t (min)", labelY: "x (mmol)" },
  "Avancement d’une réaction au cours du temps (exemple) : la vitesse, pente de la tangente, est forte au début puis diminue ; le temps de demi-réaction t½ est atteint quand l’avancement vaut la moitié de sa valeur finale.",
  (p) => p.curve((t) => 10 * (1 - Math.exp(-t / 12)), 0, 60) + p.hline(10, "dg-dash") + p.seg(0, 0, 12, 10, "dg-curve-alt") + p.guides(12 * Math.LN2, 5) + p.text(8.3, 0.8, "t½", "dg-lbl-math") + p.text(14, 10.8, "tangente à l’origine", "dg-lbl-xs", "start"),
);

const predominance = (() => {
  const X = (ph: number) => 20 + (ph / 14) * 260;
  let b = arrow(14, 80, 292, 80, "dg-axis-line", "dg-pt", 7);
  for (let ph = 0; ph <= 14; ph += 2) b += ln(X(ph), 76, X(ph), 84, "dg-axis-line") + tx(X(ph), 96, ph, "dg-tick");
  b += rect(X(0), 50, X(4.8) - X(0), 24, "dg-t-red") + rect(X(4.8), 50, X(14) - X(4.8), 24, "dg-t-blue") + tx((X(0) + X(4.8)) / 2, 62, "CH₃COOH", "dg-lbl-xs") + tx((X(4.8) + X(14)) / 2, 62, "CH₃COO⁻", "dg-lbl-xs");
  b += ln(X(4.8), 40, X(4.8), 84, "dg-red-line") + tx(X(4.8), 30, "pKa = 4,8", "dg-lbl-sm") + tx(286, 110, "pH", "dg-lbl-math", "end");
  b += tx(150, 128, "pH < pKa : l’acide domine ; pH > pKa : la base domine", "dg-lbl-xs");
  return svg(W, 138, "Domaines de prédominance du couple acide éthanoïque / ion éthanoate (pKa = 4,8) : l’acide prédomine quand le pH est inférieur à 4,8, la base quand il est supérieur.", b);
})();

/** pH d'un dosage : acide (Ca = 0,1 mol/L, 20 mL) par la soude (0,1 mol/L), avec Ka = 0 pour un acide fort. */
function phDosage(vb: number, ka: number | null): number {
  const va = 20;
  const ca = 0.1;
  const cb = 0.1;
  const v = va + vb;
  const ct = (ca * va) / v;
  const na = (cb * vb) / v;
  const kw = 1e-14;
  // Bilan des charges : h + Na⁺ = A⁻ + OH⁻, résolu par dichotomie sur le pH.
  const f = (ph: number) => {
    const h = 10 ** -ph;
    const aMinus = ka === null ? ct : (ct * ka) / (ka + h);
    return h + na - aMinus - kw / h;
  };
  let lo = 0;
  let hi = 14;
  for (let i = 0; i < 60; i++) {
    const m = (lo + hi) / 2;
    if (f(m) > 0) lo = m;
    else hi = m;
  }
  return (lo + hi) / 2;
}

const dosageFort = plot(
  { x: [0, 30], y: [0, 14], unit: 8.6, unitY: 11, ticksX: [5, 10, 15, 20, 25], ticksY: [2, 4, 7, 10, 12], grid: false, labelX: "Vb (mL)", labelY: "pH" },
  "Dosage de 20 mL d’acide chlorhydrique à 0,1 mol/L par la soude à 0,1 mol/L : saut de pH brusque autour de l’équivalence (Vb = 20 mL, pH = 7).",
  (p) => p.curve((v) => phDosage(v, null), 0, 30, "dg-curve", 600) + p.guides(20, 7) + p.point(20, 7, "E (20 mL ; 7)", 26, 0),
);

const dosageFaible = plot(
  { x: [0, 30], y: [0, 14], unit: 8.6, unitY: 11, ticksX: [5, 10, 15, 20, 25], ticksY: [2, 4.8, 7, 10, 12], grid: false, labelX: "Vb (mL)", labelY: "pH" },
  "Dosage de 20 mL d’acide éthanoïque à 0,1 mol/L (pKa = 4,8) par la soude à 0,1 mol/L : à la demi-équivalence (10 mL), pH = pKa ; à l’équivalence (20 mL), le pH est basique (environ 8,7).",
  (p) => {
    const ka = 10 ** -4.76;
    const phE = phDosage(20, ka);
    return p.curve((v) => phDosage(v, ka), 0, 30, "dg-curve", 600) + p.guides(10, phDosage(10, ka)) + p.guides(20, phE) + p.point(10, phDosage(10, ka), "pH = pKa", 6, -12) + p.point(20, phE, `E (pH ≈ ${String(Math.round(phE * 10) / 10).replace(".", ",")})`, 34, 4);
  },
);

// ── SVT ─────────────────────────────────────────────────────────────────────

const encephale = (() => {
  let b = path("M40 100C30 50 90 14 160 18C230 22 270 60 262 104C256 140 220 150 190 146C170 160 120 158 96 148C66 146 44 130 40 100Z", "dg-t-pink");
  b += path("M70 70C100 60 120 80 150 64C180 50 200 74 230 66M60 104C90 94 110 116 150 100C180 90 210 110 240 100", "dg-ink-thin");
  b += path("M190 146C214 150 240 160 236 178C230 196 196 196 180 184C170 176 172 160 190 146Z", "dg-t-violet");
  b += path("M160 150C164 170 164 190 160 214H176C176 190 178 168 182 152Z", "dg-t-yellow");
  b += lab(120, 70, 60, 26, "cerveau (hémisphères)") + lab(210, 176, 262, 196, "cervelet") + lab(168, 170, 110, 196, "tronc cérébral|(bulbe)") + lab(168, 208, 240, 214, "moelle épinière");
  return svg(W, 222, "L’encéphale vu de côté (schéma) : le cerveau, formé de deux hémisphères, le cervelet en arrière et le tronc cérébral, prolongé par la moelle épinière.", b);
})();

const moelle = (() => {
  const C: Pt = [140, 100];
  let b = ell(C[0], C[1], 70, 56, "dg-t-yellow");
  b += path("M118 70C130 84 150 84 162 70C170 90 166 104 160 112C170 120 172 134 166 140C150 128 130 128 114 140C108 134 110 120 120 112C114 104 110 90 118 70Z", "dg-t-grey");
  // Racines dorsale (avec ganglion) et ventrale, qui se rejoignent en un nerf rachidien.
  b += path("M190 78C214 72 232 76 250 90", "dg-sensory") + ell(222, 76, 10, 7, "dg-t-sand") + path("M188 122C214 126 232 112 250 96", "dg-motor") + path("M250 93H292", "dg-nerve");
  b += lab(150, 80, 140, 20, "substance grise") + lab(84, 100, 30, 100, "substance|blanche") + lab(222, 76, 250, 34, "ganglion de la|racine dorsale") + lab(220, 122, 236, 170, "racine ventrale") + lab(276, 93, 276, 130, "nerf");
  return svg(W, 186, "Coupe de la moelle épinière (schéma) : la substance grise au centre, en forme de papillon, la substance blanche autour ; la racine dorsale, avec son ganglion, et la racine ventrale se rejoignent pour former un nerf rachidien.", b);
})();

/** Potentiel d'action (valeurs typiques d'un neurone : repos −70 mV, pic +30 mV, durée ≈ 2 ms). */
const POT: [number, number][] = [[0, -70], [0.8, -70], [1, -55], [1.3, 0], [1.5, 30], [1.8, 0], [2.2, -70], [2.6, -80], [3.2, -74], [4, -70], [5, -70]];
const potentiel = plot(
  { x: [0, 5], y: [-90, 40], unit: 52, unitY: 1.4, ticksX: [1, 2, 3, 4], ticksY: [-70, -50, 0, 30], grid: false, labelX: "t (ms)", labelY: "mV", xAxisAt: -90 },
  "Potentiel d’action d’un neurone (valeurs typiques) : au repos −70 mV ; une stimulation suffisante provoque une dépolarisation jusqu’à +30 mV, puis une repolarisation et une courte hyperpolarisation, en 2 ms environ.",
  (p) => {
    const smooth = POT.map(([t, v]) => [t, v] as [number, number]);
    return curvePts(p, smooth) + p.hline(-70, "dg-dash-thin") + p.text(0.5, -64, "repos", "dg-lbl-xs") + p.text(1.1, 20, "dépolarisation", "dg-lbl-xs", "end") + p.text(2, 20, "repolarisation", "dg-lbl-xs", "start") + p.text(2.7, -86, "hyperpolarisation", "dg-lbl-xs", "start");
  },
);

const synapse = (() => {
  let b = path("M20 20H120C150 20 170 50 170 80C170 110 150 140 120 140H20", "dg-t-yellow") + path("M196 20V140C230 140 290 120 290 80C290 40 230 20 196 20Z", "dg-t-pink");
  for (const [x, y] of [[110, 60], [130, 80], [112, 100], [140, 56], [138, 106]] as Pt[]) b += circ(x, y, 7, "dg-vesicle");
  for (const y of [70, 82, 94]) b += dot(182, y, 2, "dg-vec-head");
  for (const y of [60, 80, 100]) b += rect(196, y - 5, 6, 10, "dg-t-green");
  b += arrow(20, 152, 110, 152, "dg-vec", "dg-vec-head", 8) + tx(64, 166, "message nerveux", "dg-lbl-xs");
  b += lab(130, 80, 70, 40, "vésicules de|neurotransmetteur") + lab(183, 82, 150, 188, "fente synaptique") + lab(199, 100, 250, 176, "récepteurs") + tx(70, 128, "neurone présynaptique", "dg-lbl-xs") + tx(246, 80, "neurone", "dg-lbl-xs") + tx(246, 92, "postsynaptique", "dg-lbl-xs");
  return svg(W, 198, "Une synapse chimique (schéma) : le message nerveux fait libérer le neurotransmetteur contenu dans des vésicules ; il traverse la fente synaptique et se fixe sur les récepteurs du neurone postsynaptique.", b);
})();

const sarcomere = (() => {
  const row = (y: number, half: number, label: string) => {
    let out = ln(150 - half - 20, y - 26, 150 - half - 20, y + 26, "dg-zline") + ln(150 + half + 20, y - 26, 150 + half + 20, y + 26, "dg-zline");
    for (const dy of [-16, 0, 16]) {
      out += ln(150 - half - 20, y + dy - 4, 150 - 10, y + dy - 4, "dg-actin") + ln(150 + 10, y + dy - 4, 150 + half + 20, y + dy - 4, "dg-actin");
      out += ln(150 - 60, y + dy + 4, 150 + 60, y + dy + 4, "dg-myosin");
    }
    return out + tx(150, y + 40, label, "dg-lbl-xs");
  };
  let b = row(46, 90, "relâché") + row(150, 56, "contracté : les filaments glissent, la strie Z se rapproche");
  b += lab(60, 30, 20, 14, "strie Z") + tx(286, 26, "actine (fine)", "dg-lbl-xs", "end") + tx(286, 82, "myosine (épaisse)", "dg-lbl-xs", "end");
  return svg(W, 206, "Un sarcomère, unité du muscle strié, relâché puis contracté : les filaments fins d’actine glissent entre les filaments épais de myosine ; les stries Z se rapprochent et le sarcomère raccourcit.", b);
})();

const glycemie = (() => {
  const box = (x: number, y: number, w: number, t: string, cls: string) => rect(x - w / 2, y - 14, w, 28, cls, 8) + tx(x, y, t, "dg-lbl-xs");
  let b = box(150, 24, 150, "glycémie normale ≈ 1 g/L", "dg-t-green");
  b += box(70, 80, 120, "hyperglycémie (repas)", "dg-t-red") + box(230, 80, 120, "hypoglycémie (effort)", "dg-t-blue");
  b += box(70, 136, 120, "pancréas : insuline", "dg-t-yellow") + box(230, 136, 120, "pancréas : glucagon", "dg-t-yellow");
  b += box(70, 192, 130, "foie, muscles : stockage", "dg-cell") + box(230, 192, 130, "foie : libère du glucose", "dg-cell");
  b += arrow(70, 94, 70, 120, "dg-ink", "dg-pt", 6) + arrow(230, 94, 230, 120, "dg-ink", "dg-pt", 6) + arrow(70, 150, 70, 176, "dg-ink", "dg-pt", 6) + arrow(230, 150, 230, 176, "dg-ink", "dg-pt", 6);
  b += path("M6 192C0 120 30 30 74 26", "dg-dash") + arrow(60, 28, 74, 26, "dg-ink-thin", "dg-pt", 6) + path("M294 192C300 120 270 30 226 26", "dg-dash") + arrow(240, 28, 226, 26, "dg-ink-thin", "dg-pt", 6);
  b += tx(150, 220, "le glucose sanguin revient vers 1 g/L", "dg-lbl-xs");
  return svg(W, 228, "Régulation de la glycémie : quand elle augmente, le pancréas sécrète de l’insuline et le glucose est stocké ; quand elle baisse, il sécrète du glucagon et le foie libère du glucose ; la glycémie revient vers 1 g/L.", b);
})();

/** Cycle ovarien de 28 jours (allure des courbes hormonales, schéma sans unités). */
const cycle = plot(
  { x: [0, 28], y: [0, 10], unit: 9.2, unitY: 15, ticksX: [7, 14, 21, 28], ticksY: [], grid: false, labelX: "jours", labelY: "taux", xAxisAt: 0 },
  "Allure des taux d’hormones au cours d’un cycle de 28 jours (schéma) : les œstrogènes augmentent avant l’ovulation ; le pic de LH déclenche l’ovulation vers le 14e jour ; la progestérone est élevée en deuxième partie de cycle.",
  (p) => {
    const g = (x: number, m: number, s: number) => Math.exp(-((x - m) ** 2) / (2 * s * s));
    return (
      p.curve((x) => 1 + 5 * g(x, 12.5, 2.2) + 2.5 * g(x, 21, 3), 0, 28) +
      p.curve((x) => 0.8 + 8.5 * g(x, 14, 0.7), 0, 28, "dg-curve-alt", 400) +
      p.curve((x) => 0.6 + 5 * g(x, 21, 3.2), 0, 28, "dg-curve-3") +
      p.vline(14, "dg-dash-thin") +
      p.text(14, 9.8, "ovulation", "dg-lbl-xs") +
      p.text(9, 6.4, "œstrogènes", "dg-lbl-xs", "end") +
      p.text(15.6, 8.6, "LH", "dg-lbl-xs", "start") +
      p.text(23.5, 6.4, "progestérone", "dg-lbl-xs", "start") +
      p.text(2.5, 0.3, "règles", "dg-lbl-xs")
    );
  },
);

const croisement = (() => {
  const b = punnett(["A", "a"], ["A", "a"], (r, c) => [r, c].sort().join(""), (g) => g === "aa") + tx(70 + 52, 150, "AA, Aa, Aa : phénotype dominant [A]", "dg-lbl-xs") + tx(70 + 52, 164, "aa : phénotype récessif [a] → 3/4 et 1/4", "dg-lbl-xs");
  return svg(W, 174, "Échiquier de croisement de deux hybrides Aa : les gamètes A et a se combinent au hasard ; on obtient 1/4 AA, 2/4 Aa et 1/4 aa, soit 3/4 de phénotype dominant et 1/4 de phénotype récessif.", b);
})();

const pedigree = (() => {
  const male = (x: number, y: number, ill: boolean) => rect(x - 10, y - 10, 20, 20, ill ? "dg-ill" : "dg-cell");
  const female = (x: number, y: number, ill: boolean) => circ(x, y, 10, ill ? "dg-ill" : "dg-cell");
  let b = male(100, 30, false) + female(200, 30, false) + ln(110, 30, 190, 30, "dg-ink") + ln(150, 30, 150, 70, "dg-ink") + ln(80, 70, 220, 70, "dg-ink");
  b += ln(80, 70, 80, 90, "dg-ink") + ln(150, 70, 150, 90, "dg-ink") + ln(220, 70, 220, 90, "dg-ink");
  b += female(80, 100, false) + male(150, 100, true) + female(220, 100, false);
  b += tx(70, 30, "I", "dg-lbl-sm", "end") + tx(50, 100, "II", "dg-lbl-sm", "end");
  b += rect(20, 140, 14, 14, "dg-ill") + tx(40, 147, "malade", "dg-lbl-xs", "start") + rect(110, 140, 14, 14, "dg-cell") + tx(130, 147, "sain", "dg-lbl-xs", "start") + tx(250, 147, "carré : homme", "dg-lbl-xs") + tx(250, 160, "rond : femme", "dg-lbl-xs");
  b += tx(150, 180, "parents sains, enfant malade : l’allèle de la maladie est récessif", "dg-lbl-xs");
  return svg(W, 190, "Arbre généalogique d’une famille : deux parents sains ont un fils malade ; l’allèle responsable de la maladie est donc récessif et les parents en sont porteurs.", b);
})();

const fleur = (() => {
  let b = path("M150 210V140", "dg-green-line") + path("M150 150C120 150 96 130 90 110C110 116 130 130 150 140C170 130 190 116 210 110C204 130 180 150 150 150Z", "dg-t-green");
  b += path("M150 140C110 130 70 90 80 50C110 70 136 100 150 130C164 100 190 70 220 50C230 90 190 130 150 140Z", "dg-t-pink");
  b += path("M140 136C136 110 140 96 146 80H154C160 96 164 110 160 136Z", "dg-t-yellow") + ell(150, 128, 12, 10, "dg-t-yellow") + path("M150 80V58", "dg-ink") + ell(150, 54, 6, 4, "dg-t-yellow");
  b += path("M126 120C122 96 118 80 112 66M174 120C178 96 182 80 188 66", "dg-ink") + ell(112, 62, 7, 4, "dg-chloro-orange") + ell(188, 62, 7, 4, "dg-chloro-orange");
  b += lab(150, 54, 150, 18, "stigmate") + lab(188, 62, 250, 40, "étamine (pollen)") + lab(150, 128, 236, 130, "ovaire (ovules)") + lab(84, 60, 40, 90, "pétale") + lab(98, 116, 40, 150, "sépale") + lab(150, 100, 40, 190, "pistil");
  return svg(W, 216, "Coupe d’une fleur (schéma) : les sépales verts, les pétales colorés, les étamines qui produisent le pollen, et au centre le pistil, avec le stigmate et l’ovaire qui contient les ovules.", b);
})();

export const SCHEMAS_TLE_SCIENCES: Record<string, string> = {
  "t-projectile": projectile,
  "t-plan-incline": planIncline,
  "t-chute-fluide": chuteFluide,
  "t-satellite": satellite,
  "t-solenoide": solenoide,
  "t-lorentz": lorentz,
  "t-laplace": laplace,
  "t-rc": rc,
  "t-rl": rl,
  "t-oscillations": amorties,
  "t-resonance": resonance,
  "t-pendule": pendule,
  "t-young": young,
  "t-photoelectrique": photo,
  "t-niveaux": niveaux,
  "t-decroissance": decroissance,
  "t-aston": aston,
  "t-cinetique": cinetique,
  "t-predominance": predominance,
  "t-dosage-fort": dosageFort,
  "t-dosage-faible": dosageFaible,
  "t-encephale": encephale,
  "t-moelle": moelle,
  "t-potentiel": potentiel,
  "t-synapse": synapse,
  "t-sarcomere": sarcomere,
  "t-glycemie": glycemie,
  "t-cycle-ovarien": cycle,
  "t-croisement": croisement,
  "t-pedigree": pedigree,
  "t-fleur": fleur,
};
