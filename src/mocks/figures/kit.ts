// Briques des schémas du collège et du lycée : repères et courbes calculées, figures de géométrie,
// solides, circuits électriques, rayons lumineux, schémas légendés, frises et graphiques.
// Tout est calculé à partir des valeurs exactes (une courbe à partir de sa formule, une image à partir
// de la relation de conjugaison…) : le dessin reste juste. Largeur conseillée : 300 à 320 px (lisible
// sur un téléphone de 360 px). Couleurs : classes .dg-* de globals.css, jamais de code couleur ici.

import { esc, svg } from "../drawings";

export type Pt = readonly [number, number];

/** Nombre arrondi pour l'écriture SVG. */
export const r1 = (n: number) => Math.round(n * 10) / 10;
/** Nombre écrit à la française : virgule et vrai signe moins. */
export const fr = (n: number) => String(Math.round(n * 1000) / 1000).replace(".", ",").replace("-", "−");

type Anchor = "start" | "middle" | "end";

/** Caractères réservés du XML (« < », « & ») échappés ; les <tspan> (exposants, indices) sont gardés. */
const xml = (value: string | number) =>
  String(value)
    .replace(/&(?![a-z]+;|#\d+;)/gi, "&amp;")
    .replace(/<(?!\/?tspan\b)/g, "&lt;");

/** Texte centré verticalement sur (x, y). */
export const tx = (x: number, y: number, value: string | number, cls = "dg-lbl", anchor: Anchor = "middle") =>
  `<text class="${cls}" x="${r1(x)}" y="${r1(y)}" text-anchor="${anchor}" dominant-baseline="central">${xml(value)}</text>`;

export const path = (d: string, cls = "dg-ink") => `<path class="${cls}" d="${d}"/>`;
export const ln = (x1: number, y1: number, x2: number, y2: number, cls = "dg-ink") =>
  path(`M${r1(x1)} ${r1(y1)}L${r1(x2)} ${r1(y2)}`, cls);
export const polyline = (pts: readonly Pt[], cls = "dg-ink", close = false) =>
  path(`M${pts.map(([x, y]) => `${r1(x)} ${r1(y)}`).join("L")}${close ? "Z" : ""}`, cls);
export const circ = (cx: number, cy: number, r: number, cls = "dg-ink") => `<circle class="${cls}" cx="${r1(cx)}" cy="${r1(cy)}" r="${r1(r)}"/>`;
export const ell = (cx: number, cy: number, rx: number, ry: number, cls = "dg-ink") =>
  `<ellipse class="${cls}" cx="${r1(cx)}" cy="${r1(cy)}" rx="${r1(rx)}" ry="${r1(ry)}"/>`;
export const rect = (x: number, y: number, w: number, h: number, cls = "dg-ink", rx = 0) =>
  `<rect class="${cls}" x="${r1(x)}" y="${r1(y)}" width="${r1(w)}" height="${r1(h)}"${rx ? ` rx="${rx}"` : ""}/>`;
export const dot = (x: number, y: number, r = 3, cls = "dg-pt") => circ(x, y, r, cls);

/** Pointe de flèche en (x, y), orientée selon l'angle (radians). */
export function head(x: number, y: number, angle: number, size = 8, cls = "dg-pt"): string {
  const a1 = angle + Math.PI - 0.42;
  const a2 = angle + Math.PI + 0.42;
  return polyline(
    [
      [x, y],
      [x + size * Math.cos(a1), y + size * Math.sin(a1)],
      [x + size * Math.cos(a2), y + size * Math.sin(a2)],
    ],
    cls,
    true,
  );
}

/** Flèche de (x1, y1) à (x2, y2). */
export function arrow(x1: number, y1: number, x2: number, y2: number, cls = "dg-ink", headCls = "dg-pt", size = 8): string {
  const a = Math.atan2(y2 - y1, x2 - x1);
  return ln(x1, y1, x2 - Math.cos(a) * size * 0.6, y2 - Math.sin(a) * size * 0.6, cls) + head(x2, y2, a, size, headCls);
}

/** Étiquette reliée à un point du schéma par un trait fin (légende d'un schéma de SVT, de PC…). */
/**
 * Légende reliée au point (px, py) : texte à gauche (calé à droite) si x < px, sinon à droite ; « | » coupe
 * le texte en lignes. Le texte reste toujours dans le cadre [0, w] (largeur estimée de la police de 10 px).
 */
export function lab(px: number, py: number, x: number, y: number, text: string, w = 300): string {
  const left = x < px;
  const lines = text.split("|");
  const width = Math.max(...lines.map((l) => l.length)) * 5.5 + 2;
  const tx0 = left ? Math.max(x, width + 2) : Math.min(x, w - width - 2);
  const top = y - ((lines.length - 1) * 12) / 2;
  return (
    ln(px, py, tx0 + (left ? 2 : -2), y, "dg-leader") +
    dot(px, py, 1.8) +
    lines.map((line, i) => tx(tx0, top + i * 12, line, "dg-lbl-xs", left ? "end" : "start")).join("")
  );
}

export function callout(px: number, py: number, lx: number, ly: number, label: string, cls = "dg-lbl-sm"): string {
  const anchor: Anchor = lx < px - 2 ? "end" : lx > px + 2 ? "start" : "middle";
  const gap = anchor === "end" ? -3 : anchor === "start" ? 3 : 0;
  const dy = anchor === "middle" ? (ly < py ? -7 : 7) : 0;
  return ln(px, py, lx, ly, "dg-leader") + dot(px, py, 1.8, "dg-pt") + tx(lx + gap, ly + dy, label, cls, anchor);
}

export const figureSvg = (w: number, h: number, label: string, body: string) => svg(w, h, label, body);

// ── Repère et courbes ───────────────────────────────────────────────────────

export interface PlotOptions {
  x: [number, number];
  y: [number, number];
  /** Pixels par unité (même échelle sur les deux axes si unitY n'est pas donné). */
  unit: number;
  unitY?: number;
  /** Graduations écrites (par défaut : chaque entier, sauf 0). */
  ticksX?: number[];
  ticksY?: number[];
  /** Quadrillage léger tous les « grid » (unités). */
  grid?: number | false;
  labelX?: string;
  labelY?: string;
  pad?: number;
  /** Ordonnée où tracer l'axe des abscisses (par défaut 0, ou le bord le plus proche). */
  xAxisAt?: number;
}

export interface Plot {
  X: (x: number) => number;
  Y: (y: number) => number;
  /** Courbe de f entre a et b (morceaux coupés hors du cadre ou aux discontinuités). */
  curve: (f: (x: number) => number, a: number, b: number, cls?: string, n?: number) => string;
  /** Courbe paramétrée t ↦ (x(t), y(t)). */
  param: (fx: (t: number) => number, fy: (t: number) => number, t0: number, t1: number, cls?: string, n?: number) => string;
  seg: (x1: number, y1: number, x2: number, y2: number, cls?: string) => string;
  /** Droite y = m x + p tracée sur toute la largeur du repère. */
  line: (m: number, p: number, cls?: string) => string;
  vline: (x: number, cls?: string) => string;
  hline: (y: number, cls?: string) => string;
  point: (x: number, y: number, name?: string, dx?: number, dy?: number) => string;
  text: (x: number, y: number, value: string, cls?: string, anchor?: Anchor) => string;
  /** Pointillés de lecture d'un point vers les deux axes. */
  guides: (x: number, y: number) => string;
  /** Aire sous la courbe de f entre a et b (jusqu'à l'axe des abscisses). */
  area: (f: (x: number) => number, a: number, b: number, cls?: string) => string;
  vec: (x1: number, y1: number, x2: number, y2: number, cls?: string, headCls?: string) => string;
}

/** Repère orthogonal avec axes fléchés, graduations, quadrillage et tracés. */
export function plot(o: PlotOptions, label: string, draw: (p: Plot) => string): string {
  const uy = o.unitY ?? o.unit;
  const pad = o.pad ?? 22;
  const w = (o.x[1] - o.x[0]) * o.unit + 2 * pad;
  const h = (o.y[1] - o.y[0]) * uy + 2 * pad;
  const X = (x: number) => pad + (x - o.x[0]) * o.unit;
  const Y = (y: number) => pad + (o.y[1] - y) * uy;
  const inside = (y: number) => y >= o.y[0] - 0.05 * (o.y[1] - o.y[0]) && y <= o.y[1] + 0.05 * (o.y[1] - o.y[0]);
  const clampY = (y: number) => Math.min(Math.max(y, o.y[0] - 0.3), o.y[1] + 0.3);
  let body = "";
  const step = o.grid === undefined ? 1 : o.grid;
  if (step) {
    for (let x = Math.ceil(o.x[0] / step) * step; x <= o.x[1] + 1e-9; x += step) body += ln(X(x), Y(o.y[0]), X(x), Y(o.y[1]), "dg-grid-light");
    for (let y = Math.ceil(o.y[0] / step) * step; y <= o.y[1] + 1e-9; y += step) body += ln(X(o.x[0]), Y(y), X(o.x[1]), Y(y), "dg-grid-light");
  }
  // Axes (s'ils passent dans le cadre), fléchés.
  const x0 = Math.min(Math.max(0, o.x[0]), o.x[1]);
  const y0 = o.xAxisAt ?? Math.min(Math.max(0, o.y[0]), o.y[1]);
  body += arrow(X(o.x[0]) - 6, Y(y0), X(o.x[1]) + 12, Y(y0), "dg-axis-line", "dg-pt", 7);
  body += arrow(X(x0), Y(o.y[0]) + 6, X(x0), Y(o.y[1]) - 12, "dg-axis-line", "dg-pt", 7);
  const ticksX = o.ticksX ?? range(Math.ceil(o.x[0]), Math.floor(o.x[1])).filter((v) => v !== 0);
  const ticksY = o.ticksY ?? range(Math.ceil(o.y[0]), Math.floor(o.y[1])).filter((v) => v !== 0);
  for (const v of ticksX) body += ln(X(v), Y(y0) - 3, X(v), Y(y0) + 3, "dg-axis-line") + tx(X(v), Y(y0) + 11, fr(v), "dg-tick");
  for (const v of ticksY) body += ln(X(x0) - 3, Y(v), X(x0) + 3, Y(v), "dg-axis-line") + tx(X(x0) - 6, Y(v), fr(v), "dg-tick", "end");
  if (o.x[0] <= 0 && o.y[0] <= 0) body += tx(X(0) - 8, Y(0) + 10, "O", "dg-tick");
  if (o.labelX) body += tx(X(o.x[1]) + 10, Y(y0) - 11, o.labelX, "dg-lbl-math", "end");
  if (o.labelY) body += tx(X(x0) + 8, Y(o.y[1]) - 8, o.labelY, "dg-lbl-math", "start");

  const curve: Plot["curve"] = (f, a, b, cls = "dg-curve", n = 240) => {
    let d = "";
    let pen = false;
    let prev: number | null = null;
    for (let i = 0; i <= n; i++) {
      const x = a + ((b - a) * i) / n;
      const y = f(x);
      const ok = Number.isFinite(y) && inside(y) && (prev === null || Math.abs(y - prev) < (o.y[1] - o.y[0]) * 0.8);
      if (ok) {
        d += `${pen ? "L" : "M"}${r1(X(x))} ${r1(Y(clampY(y)))}`;
        pen = true;
      } else pen = false;
      prev = Number.isFinite(y) ? y : null;
    }
    return path(d, cls);
  };
  const param: Plot["param"] = (fx, fy, t0, t1, cls = "dg-curve", n = 240) =>
    path(
      Array.from({ length: n + 1 }, (_, i) => {
        const t = t0 + ((t1 - t0) * i) / n;
        return `${i ? "L" : "M"}${r1(X(fx(t)))} ${r1(Y(fy(t)))}`;
      }).join(""),
      cls,
    );
  const seg: Plot["seg"] = (x1, y1, x2, y2, cls = "dg-curve") => ln(X(x1), Y(y1), X(x2), Y(y2), cls);
  const p: Plot = {
    X,
    Y,
    curve,
    param,
    seg,
    // Droite y = m x + q coupée exactement aux bords du repère.
    line: (m, q, cls = "dg-curve") => {
      let a = o.x[0];
      let b = o.x[1];
      if (m !== 0) {
        const xa = (o.y[0] - q) / m;
        const xb = (o.y[1] - q) / m;
        a = Math.max(a, Math.min(xa, xb));
        b = Math.min(b, Math.max(xa, xb));
      }
      return a < b ? ln(X(a), Y(m * a + q), X(b), Y(m * b + q), cls) : "";
    },
    vline: (x, cls = "dg-dash") => ln(X(x), Y(o.y[0]), X(x), Y(o.y[1]), cls),
    hline: (y, cls = "dg-dash") => ln(X(o.x[0]), Y(y), X(o.x[1]), Y(y), cls),
    point: (x, y, name, dx = 8, dy = -10) => dot(X(x), Y(y), 3.2) + (name ? tx(X(x) + dx, Y(y) + dy, name, "dg-lbl-math") : ""),
    text: (x, y, value, cls = "dg-lbl", anchor = "middle") => tx(X(x), Y(y), value, cls, anchor),
    guides: (x, y) => ln(X(x), Y(y), X(x), Y(y0), "dg-dash-thin") + ln(X(x), Y(y), X(x0), Y(y), "dg-dash-thin"),
    area: (f, a, b, cls = "dg-area") => {
      const n = 120;
      const pts = Array.from({ length: n + 1 }, (_, i) => {
        const x = a + ((b - a) * i) / n;
        return `L${r1(X(x))} ${r1(Y(clampY(f(x))))}`;
      }).join("");
      return path(`M${r1(X(a))} ${r1(Y(0))}${pts}L${r1(X(b))} ${r1(Y(0))}Z`, cls);
    },
    vec: (x1, y1, x2, y2, cls = "dg-vec", headCls = "dg-vec-head") => arrow(X(x1), Y(y1), X(x2), Y(y2), cls, headCls, 9),
  };
  return svg(w, h, label, body + draw(p));
}

export const range = (a: number, b: number, step = 1) => {
  const out: number[] = [];
  for (let v = a; v <= b + 1e-9; v += step) out.push(r1(v * 1000) / 1000);
  return out;
};

// ── Géométrie plane ─────────────────────────────────────────────────────────

type Side = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw";
const OFF: Record<Side, Pt> = { n: [0, -12], s: [0, 13], e: [12, 0], w: [-12, 0], ne: [10, -10], nw: [-10, -10], se: [10, 11], sw: [-10, 11] };

/** Point nommé (petite croix ou point plein) avec son nom placé du côté indiqué. */
export const pt = (p: Pt, name: string, side: Side = "n", cross = false) =>
  (cross
    ? ln(p[0] - 4, p[1] - 4, p[0] + 4, p[1] + 4, "dg-ink") + ln(p[0] - 4, p[1] + 4, p[0] + 4, p[1] - 4, "dg-ink")
    : dot(p[0], p[1], 2.8)) + (name ? tx(p[0] + OFF[side][0], p[1] + OFF[side][1], name, "dg-lbl-math") : "");

export const seg = (a: Pt, b: Pt, cls = "dg-geo") => ln(a[0], a[1], b[0], b[1], cls);
export const poly = (pts: readonly Pt[], cls = "dg-geo") => polyline(pts, cls, true);

/** Droite passant par a et b, prolongée de « ext » pixels de chaque côté. */
export function through(a: Pt, b: Pt, ext = 30, cls = "dg-geo-line"): string {
  const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
  const ux = (b[0] - a[0]) / len;
  const uy = (b[1] - a[1]) / len;
  return ln(a[0] - ux * ext, a[1] - uy * ext, b[0] + ux * ext, b[1] + uy * ext, cls);
}

const unitVec = (from: Pt, to: Pt): Pt => {
  const len = Math.hypot(to[0] - from[0], to[1] - from[1]);
  return [(to[0] - from[0]) / len, (to[1] - from[1]) / len];
};

/** Codage d'angle droit en p, entre les directions de a et de b. */
export function rightAngle(p: Pt, a: Pt, b: Pt, s = 10): string {
  const u = unitVec(p, a);
  const v = unitVec(p, b);
  return polyline(
    [
      [p[0] + u[0] * s, p[1] + u[1] * s],
      [p[0] + (u[0] + v[0]) * s, p[1] + (u[1] + v[1]) * s],
      [p[0] + v[0] * s, p[1] + v[1] * s],
    ],
    "dg-ink",
  );
}

/** Arc d'angle en p, de la direction de a à celle de b (le plus petit), avec une étiquette éventuelle. */
export function angleArc(p: Pt, a: Pt, b: Pt, radius = 20, label = "", cls = "dg-arc", labelGap = 13): string {
  const a1 = Math.atan2(a[1] - p[1], a[0] - p[0]);
  let a2 = Math.atan2(b[1] - p[1], b[0] - p[0]);
  let delta = a2 - a1;
  while (delta > Math.PI) delta -= 2 * Math.PI;
  while (delta < -Math.PI) delta += 2 * Math.PI;
  a2 = a1 + delta;
  const sweep = delta > 0 ? 1 : 0;
  const start: Pt = [p[0] + radius * Math.cos(a1), p[1] + radius * Math.sin(a1)];
  const end: Pt = [p[0] + radius * Math.cos(a2), p[1] + radius * Math.sin(a2)];
  const mid = a1 + delta / 2;
  return (
    path(`M${r1(start[0])} ${r1(start[1])}A${radius} ${radius} 0 0 ${sweep} ${r1(end[0])} ${r1(end[1])}`, cls) +
    (label ? tx(p[0] + (radius + labelGap) * Math.cos(mid), p[1] + (radius + labelGap) * Math.sin(mid), label, "dg-lbl-sm") : "")
  );
}

/** Codage de longueurs égales : n petits traits au milieu de [ab]. */
export function ticks(a: Pt, b: Pt, n = 1): string {
  const m: Pt = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  const u = unitVec(a, b);
  const nx = -u[1];
  const ny = u[0];
  let out = "";
  for (let i = 0; i < n; i++) {
    const o = (i - (n - 1) / 2) * 4;
    const c: Pt = [m[0] + u[0] * o, m[1] + u[1] * o];
    out += ln(c[0] - nx * 5, c[1] - ny * 5, c[0] + nx * 5, c[1] + ny * 5, "dg-ink");
  }
  return out;
}

/** Vecteur de a à b (flèche) avec son nom au-dessus du milieu. */
export const vecAB = (a: Pt, b: Pt, name = "", side: Side = "n") =>
  arrow(a[0], a[1], b[0], b[1], "dg-vec", "dg-vec-head", 9) +
  (name ? tx((a[0] + b[0]) / 2 + OFF[side][0], (a[1] + b[1]) / 2 + OFF[side][1], name, "dg-lbl-math") : "");

/** Point d'un cercle de centre c et de rayon r à l'angle t (degrés, sens direct, y vers le haut). */
export const onCircle = (c: Pt, r: number, deg: number): Pt => [c[0] + r * Math.cos((deg * Math.PI) / 180), c[1] - r * Math.sin((deg * Math.PI) / 180)];

/** Milieu de deux points. */
export const mid = (a: Pt, b: Pt): Pt => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
/** Point a + t·(b − a). */
export const lerp = (a: Pt, b: Pt, t: number): Pt => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
/** Projeté orthogonal de p sur la droite (ab). */
export function project(p: Pt, a: Pt, b: Pt): Pt {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const t = ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / (dx * dx + dy * dy);
  return [a[0] + t * dx, a[1] + t * dy];
}
/** Symétrique de p par rapport à la droite (ab). */
export const reflect = (p: Pt, a: Pt, b: Pt): Pt => {
  const h = project(p, a, b);
  return [2 * h[0] - p[0], 2 * h[1] - p[1]];
};
/** Image de p par la rotation de centre c et d'angle deg (sens direct à l'écran, y vers le haut). */
export function rotate(p: Pt, c: Pt, deg: number): Pt {
  const t = (-deg * Math.PI) / 180;
  const dx = p[0] - c[0];
  const dy = p[1] - c[1];
  return [c[0] + dx * Math.cos(t) - dy * Math.sin(t), c[1] + dx * Math.sin(t) + dy * Math.cos(t)];
}
/** Intersection des droites (ab) et (cd). */
export function intersect(a: Pt, b: Pt, c: Pt, d: Pt): Pt {
  const den = (a[0] - b[0]) * (c[1] - d[1]) - (a[1] - b[1]) * (c[0] - d[0]);
  const t = ((a[0] - c[0]) * (c[1] - d[1]) - (a[1] - c[1]) * (c[0] - d[0])) / den;
  return [a[0] + t * (b[0] - a[0]), a[1] + t * (b[1] - a[1])];
}
/** Centre du cercle circonscrit au triangle abc. */
export function circumcenter(a: Pt, b: Pt, c: Pt): Pt {
  const d = 2 * (a[0] * (b[1] - c[1]) + b[0] * (c[1] - a[1]) + c[0] * (a[1] - b[1]));
  const sq = (p: Pt) => p[0] * p[0] + p[1] * p[1];
  return [
    (sq(a) * (b[1] - c[1]) + sq(b) * (c[1] - a[1]) + sq(c) * (a[1] - b[1])) / d,
    (sq(a) * (c[0] - b[0]) + sq(b) * (a[0] - c[0]) + sq(c) * (b[0] - a[0])) / d,
  ];
}
export const dist = (a: Pt, b: Pt) => Math.hypot(b[0] - a[0], b[1] - a[1]);

// ── Solides en perspective cavalière ────────────────────────────────────────

/** Décalage de la profondeur en perspective cavalière (angle 45°, coefficient 0,5). */
const depth = (d: number): Pt => [d * 0.5 * Math.cos(Math.PI / 4), -d * 0.5 * Math.sin(Math.PI / 4)];

/** Pavé droit : face avant w × h en (x, y) (coin haut gauche), profondeur d ; arêtes cachées en pointillés. */
export function cuboid(x: number, y: number, w: number, h: number, d: number): { svg: string; v: Record<string, Pt> } {
  const [dx, dy] = depth(d);
  const A: Pt = [x, y + h];
  const B: Pt = [x + w, y + h];
  const C: Pt = [x + w, y];
  const D: Pt = [x, y];
  const E: Pt = [A[0] + dx, A[1] + dy];
  const F: Pt = [B[0] + dx, B[1] + dy];
  const G: Pt = [C[0] + dx, C[1] + dy];
  const H: Pt = [D[0] + dx, D[1] + dy];
  const body =
    poly([A, B, C, D], "dg-solid-face") +
    poly([D, C, G, H], "dg-solid-face-top") +
    poly([B, F, G, C], "dg-solid-face-side") +
    seg(A, E, "dg-hidden") +
    seg(E, F, "dg-hidden") +
    seg(E, H, "dg-hidden");
  return { svg: body, v: { A, B, C, D, E, F, G, H } };
}

/** Pyramide à base carrée (base en perspective, sommet au-dessus du centre). */
export function pyramid(x: number, y: number, w: number, d: number, h: number): { svg: string; v: Record<string, Pt> } {
  const [dx, dy] = depth(d);
  const A: Pt = [x, y];
  const B: Pt = [x + w, y];
  const C: Pt = [x + w + dx, y + dy];
  const D: Pt = [x + dx, y + dy];
  const O: Pt = [(A[0] + C[0]) / 2, (A[1] + C[1]) / 2];
  const S: Pt = [O[0], O[1] - h];
  const body =
    poly([A, B, S], "dg-solid-face") +
    poly([B, C, S], "dg-solid-face-side") +
    seg(A, D, "dg-hidden") +
    seg(D, C, "dg-hidden") +
    seg(D, S, "dg-hidden") +
    seg(S, O, "dg-hidden") +
    seg(A, C, "dg-hidden-thin") +
    seg(B, D, "dg-hidden-thin");
  return { svg: body, v: { A, B, C, D, O, S } };
}

/** Cylindre de révolution : centre de la base inférieure (cx, cy), rayon rx (ellipse rx × ry), hauteur h. */
export function cylinder(cx: number, cy: number, rx: number, ry: number, h: number): string {
  return (
    path(`M${cx - rx} ${cy}L${cx - rx} ${cy - h}A${rx} ${ry} 0 0 1 ${cx + rx} ${cy - h}L${cx + rx} ${cy}A${rx} ${ry} 0 0 1 ${cx - rx} ${cy}Z`, "dg-solid-face") +
    ell(cx, cy - h, rx, ry, "dg-solid-face-top") +
    path(`M${cx - rx} ${cy}A${rx} ${ry} 0 0 1 ${cx + rx} ${cy}`, "dg-hidden")
  );
}

/** Cône de révolution : centre de la base (cx, cy), rayon rx (ellipse rx × ry), hauteur h. */
export function cone(cx: number, cy: number, rx: number, ry: number, h: number): string {
  return (
    path(`M${cx - rx} ${cy}L${cx} ${cy - h}L${cx + rx} ${cy}A${rx} ${ry} 0 0 1 ${cx - rx} ${cy}Z`, "dg-solid-face") +
    path(`M${cx - rx} ${cy}A${rx} ${ry} 0 0 1 ${cx + rx} ${cy}`, "dg-hidden") +
    ln(cx, cy - h, cx, cy, "dg-hidden") +
    ln(cx, cy, cx + rx, cy, "dg-hidden")
  );
}

/** Sphère : contour, équateur (moitié arrière en pointillés). */
export function sphere(cx: number, cy: number, r: number): string {
  return (
    circ(cx, cy, r, "dg-solid-face") +
    path(`M${cx - r} ${cy}A${r} ${r * 0.3} 0 0 0 ${cx + r} ${cy}`, "dg-ink") +
    path(`M${cx - r} ${cy}A${r} ${r * 0.3} 0 0 1 ${cx + r} ${cy}`, "dg-hidden")
  );
}

// ── Circuits électriques (symboles normalisés) ──────────────────────────────

type Orient = "h" | "v";
/** Fils : lignes brisées. */
export const wire = (...pts: Pt[]) => polyline(pts, "dg-wire");
const L = 18; // demi-longueur d'un dipôle

/** Bornes d'un dipôle centré en (x, y). */
export const ends = (x: number, y: number, o: Orient): [Pt, Pt] => (o === "h" ? [[x - L, y], [x + L, y]] : [[x, y - L], [x, y + L]]);

function leads(x: number, y: number, o: Orient, inner: number): string {
  return o === "h" ? ln(x - L, y, x - inner, y, "dg-wire") + ln(x + inner, y, x + L, y, "dg-wire") : ln(x, y - L, x, y - inner, "dg-wire") + ln(x, y + inner, x, y + L, "dg-wire");
}

/** Générateur (pile) : trait long = borne +, trait court épais = borne −. plusFirst : + à gauche (ou en haut). */
export function cell(x: number, y: number, o: Orient = "h", plusFirst = true): string {
  const s = plusFirst ? -1 : 1;
  if (o === "h")
    return (
      leads(x, y, o, 4) +
      ln(x + 4 * s, y - 12, x + 4 * s, y + 12, "dg-wire") +
      ln(x - 4 * s, y - 6, x - 4 * s, y + 6, "dg-wire-bold") +
      tx(x + 11 * s, y - 13, "+", "dg-lbl-sm") +
      tx(x - 11 * s, y - 13, "−", "dg-lbl-sm")
    );
  return (
    leads(x, y, o, 4) +
    ln(x - 12, y + 4 * s, x + 12, y + 4 * s, "dg-wire") +
    ln(x - 6, y - 4 * s, x + 6, y - 4 * s, "dg-wire-bold") +
    tx(x + 18, y + 9 * s, "+", "dg-lbl-sm") +
    tx(x + 18, y - 9 * s, "−", "dg-lbl-sm")
  );
}

/** Lampe : cercle barré d'une croix. */
export const lamp = (x: number, y: number, o: Orient = "h") =>
  leads(x, y, o, 10) + circ(x, y, 10, "dg-comp") + ln(x - 7, y - 7, x + 7, y + 7, "dg-wire") + ln(x - 7, y + 7, x + 7, y - 7, "dg-wire");

/** Résistance (conducteur ohmique) : rectangle. */
export const resistor = (x: number, y: number, o: Orient = "h") =>
  leads(x, y, o, 12) + (o === "h" ? rect(x - 12, y - 5, 24, 10, "dg-comp") : rect(x - 5, y - 12, 10, 24, "dg-comp"));

/** Appareil de mesure ou moteur : cercle avec sa lettre (A, V, M, G…). */
export const meter = (x: number, y: number, letter: string, o: Orient = "h") => leads(x, y, o, 11) + circ(x, y, 11, "dg-comp") + tx(x, y + 0.5, letter, "dg-lbl");

/** Interrupteur ouvert ou fermé. */
export function switchK(x: number, y: number, closed: boolean, o: Orient = "h"): string {
  if (o === "h")
    return ln(x - L, y, x - 9, y, "dg-wire") + ln(x + 9, y, x + L, y, "dg-wire") + dot(x - 9, y, 2) + dot(x + 9, y, 2) + ln(x - 9, y, closed ? x + 9 : x + 7, closed ? y : y - 10, "dg-wire");
  return ln(x, y - L, x, y - 9, "dg-wire") + ln(x, y + 9, x, y + L, "dg-wire") + dot(x, y - 9, 2) + dot(x, y + 9, 2) + ln(x, y - 9, closed ? x : x + 10, closed ? y + 9 : y + 7, "dg-wire");
}

/** Diode : triangle et barre (passante dans le sens de la flèche, de gauche à droite ou de haut en bas). */
export function diode(x: number, y: number, o: Orient = "h"): string {
  if (o === "h") return leads(x, y, o, 8) + polyline([[x - 8, y - 8], [x + 6, y], [x - 8, y + 8]], "dg-comp", true) + ln(x + 7, y - 8, x + 7, y + 8, "dg-wire");
  return leads(x, y, o, 8) + polyline([[x - 8, y - 8], [x, y + 6], [x + 8, y - 8]], "dg-comp", true) + ln(x - 8, y + 7, x + 8, y + 7, "dg-wire");
}

/** Condensateur : deux armatures parallèles. */
export const capacitor = (x: number, y: number, o: Orient = "h") =>
  leads(x, y, o, 4) + (o === "h" ? ln(x - 4, y - 11, x - 4, y + 11, "dg-wire-bold") + ln(x + 4, y - 11, x + 4, y + 11, "dg-wire-bold") : ln(x - 11, y - 4, x + 11, y - 4, "dg-wire-bold") + ln(x - 11, y + 4, x + 11, y + 4, "dg-wire-bold"));

/** Bobine : boucles successives. */
export function coil(x: number, y: number, o: Orient = "h"): string {
  if (o === "h") return leads(x, y, o, 14) + path(`M${x - 14} ${y}${"a3.5 4.5 0 0 1 7 0".repeat(4)}`, "dg-wire");
  return leads(x, y, o, 14) + path(`M${x} ${y - 14}${"a4.5 3.5 0 0 1 0 7".repeat(4)}`, "dg-wire");
}

/** Nœud de dérivation. */
export const node = (x: number, y: number) => dot(x, y, 3.2);

/** Sens conventionnel du courant : petite flèche sur un fil horizontal ou vertical. */
export const current = (x: number, y: number, dir: "e" | "w" | "n" | "s", label = "I") => {
  const a = { e: 0, w: Math.PI, n: -Math.PI / 2, s: Math.PI / 2 }[dir];
  return head(x, y, a, 8, "dg-vec-head") + (label ? tx(x + (dir === "n" || dir === "s" ? 12 : 0), y + (dir === "e" || dir === "w" ? -10 : 0), label, "dg-lbl-math") : "");
};

// ── Optique ────────────────────────────────────────────────────────────────

/** Rayon lumineux (trait orangé) avec une flèche au milieu, dans le sens de propagation. */
export function ray(a: Pt, b: Pt, cls = "dg-ray", arrowAt = 0.5): string {
  const m = lerp(a, b, arrowAt);
  return seg(a, b, cls) + head(m[0] + (b[0] - a[0]) * 0.02, m[1] + (b[1] - a[1]) * 0.02, Math.atan2(b[1] - a[1], b[0] - a[0]), 8, "dg-ray-head");
}

/**
 * Lentille mince : objet AB perpendiculaire à l'axe, image calculée par la relation de conjugaison
 * 1/OA' − 1/OA = 1/f' (mesures algébriques, en unités). Les trois rayons particuliers sont tracés.
 */
export function lens(o: { f: number; a: number; h: number; unit: number; converging?: boolean; w?: number; cx?: number; cy?: number }): { svg: string; image: { a: number; h: number } } {
  const conv = o.converging !== false;
  const f = conv ? Math.abs(o.f) : -Math.abs(o.f);
  const OA = o.a; // négatif : objet à gauche
  const OA2 = 1 / (1 / f + 1 / OA);
  const gamma = OA2 / OA;
  const hImg = o.h * gamma;
  const u = o.unit;
  const w = o.w ?? 310;
  const cx = o.cx ?? w / 2;
  const cy = o.cy ?? 95;
  const X = (v: number) => cx + v * u;
  const Y = (v: number) => cy - v * u;
  const lensH = Math.max(Math.abs(o.h), Math.abs(hImg), 1.2) * u + 18;
  let body = ln(6, cy, w - 6, cy, "dg-ink-thin") + tx(w - 8, cy - 9, "axe", "dg-lbl-sm", "end");
  // Lentille : double flèche (convergente) ou flèches inversées (divergente).
  body += ln(cx, cy - lensH, cx, cy + lensH, "dg-lens");
  body += conv
    ? head(cx, cy - lensH, -Math.PI / 2, 9, "dg-lens-head") + head(cx, cy + lensH, Math.PI / 2, 9, "dg-lens-head")
    : head(cx, cy - lensH + 8, Math.PI / 2, 9, "dg-lens-head") + head(cx, cy + lensH - 8, -Math.PI / 2, 9, "dg-lens-head");
  body += pt([cx, cy], "O", "sw") + pt([X(f), cy], "F′", "s", true) + pt([X(-f), cy], "F", "s", true);
  // Objet et image.
  body += arrow(X(OA), cy, X(OA), Y(o.h), "dg-object-line", "dg-object-head") + tx(X(OA) - 9, Y(o.h), "B", "dg-lbl-math") + tx(X(OA), cy + 12, "A", "dg-lbl-math");
  const virtual = OA2 < 0;
  body += arrow(X(OA2), cy, X(OA2), Y(hImg), virtual ? "dg-image-virtual" : "dg-image-line", "dg-image-head") + tx(X(OA2) + 10, Y(hImg), "B′", "dg-lbl-math") + tx(X(OA2), cy + (hImg > 0 ? 12 : -12), "A′", "dg-lbl-math");
  const B: Pt = [X(OA), Y(o.h)];
  const B2: Pt = [X(OA2), Y(hImg)];
  const I: Pt = [cx, Y(o.h)];
  const edge = (from: Pt, through: Pt, xEnd: number): Pt => {
    const t = (xEnd - from[0]) / (through[0] - from[0]);
    return [xEnd, from[1] + (through[1] - from[1]) * t];
  };
  // 1. Parallèle à l'axe → passe par F′ (ou semble venir de F′).
  body += ray(B, I) + ray(I, edge(I, [X(f), cy], w - 8));
  // 2. Passe par O sans être dévié.
  body += ray(B, edge(B, [cx, cy], w - 8), "dg-ray", 0.3);
  // 3. Passe par F (ou se dirige vers F) → ressort parallèle à l'axe.
  const J: Pt = edge(B, [X(-f), cy], cx);
  body += ray(B, J) + ray(J, [w - 8, J[1]]);
  if (virtual || !conv) {
    // Prolongements en pointillés jusqu'à l'image virtuelle.
    body += seg(I, B2, "dg-ray-virtual") + seg([cx, cy], B2, "dg-ray-virtual") + seg(J, B2, "dg-ray-virtual");
  }
  return { svg: body, image: { a: OA2, h: hImg } };
}

// ── Schémas légendés, frises, graphiques ────────────────────────────────────

/** Largeur approximative d’un texte de police 10 px. */
const textWidth = (label: string) => label.length * 5.6 + 4;

/**
 * Rangement des étiquettes sur des rangs : chaque étiquette (centre voulu, largeur) prend le premier rang
 * où elle ne chevauche aucune autre ; elle reste dans le cadre [0, w].
 */
function layoutLabels(items: { x: number; label: string }[], w: number): { x: number; row: number }[] {
  const rows: [number, number][][] = [];
  return items.map(({ x, label }) => {
    const half = textWidth(label) / 2;
    const cx = Math.min(Math.max(x, half + 2), w - half - 2);
    let row = rows.findIndex((r) => r.every(([a, b]) => cx + half + 4 < a || cx - half - 4 > b));
    if (row < 0) row = rows.push([]) - 1;
    rows[row]!.push([cx - half, cx + half]);
    return { x: cx, row };
  });
}

/**
 * Frise chronologique : années de « from » à « to » (avant J.-C. : négatives), graduée tous les « step ».
 * Les périodes sont des bandes de couleur sur l’axe, nommées au-dessus ; les événements sont marqués
 * d’un point et nommés au-dessous. Les noms sont répartis sur plusieurs rangs pour ne jamais se chevaucher.
 */
export function frise(o: { from: number; to: number; step: number; w?: number; periods?: [number, number, string][]; events?: [number, string][] }): { svg: string; h: number } {
  const w = o.w ?? 310;
  const pad = 16;
  const X = (y: number) => pad + ((y - o.from) / (o.to - o.from)) * (w - 2 * pad);
  const periods = o.periods ?? [];
  const events = o.events ?? [];
  const pLabels = layoutLabels(periods.map(([a, b, label]) => ({ x: (X(a) + X(b)) / 2, label })), w);
  const pRows = Math.max(0, ...pLabels.map((l) => l.row + 1));
  const axisY = 10 + pRows * 16 + 14;
  let body = "";
  periods.forEach(([a, b, label], i) => {
    const { x, row } = pLabels[i]!;
    const y = axisY - 20 - row * 16;
    const c = (X(a) + X(b)) / 2;
    body += rect(X(a), axisY - 5, Math.max(X(b) - X(a), 2), 10, i % 2 ? "dg-period-alt" : "dg-period");
    body += ln(c, axisY - 5, x, y + 6, "dg-leader") + tx(x, y, label, "dg-lbl-xs");
  });
  body += arrow(pad - 6, axisY, w - 4, axisY, "dg-axis-line", "dg-pt", 7);
  for (let y = o.from; y <= o.to; y += o.step) body += ln(X(y), axisY - 4, X(y), axisY + 4, "dg-axis-line") + tx(X(y), axisY + 13, y < 0 ? "−" + -y : y, "dg-tick");
  const eLabels = layoutLabels(events.map(([year, label]) => ({ x: X(year), label })), w);
  eLabels.forEach(({ x, row }, i) => {
    const [year, label] = events[i]!;
    const y = axisY + 32 + row * 15;
    body += ln(X(year), axisY, x, y - 6, "dg-leader") + dot(X(year), axisY, 3) + tx(x, y, label, "dg-lbl-xs");
  });
  const eRows = Math.max(0, ...eLabels.map((l) => l.row + 1));
  return { svg: body, h: axisY + 24 + eRows * 15 };
}

/** Diagramme en barres vertical (valeurs ≥ 0) avec graduation. */
export function bars(o: { labels: string[]; values: number[]; max: number; step: number; w?: number; h?: number; unit?: string; cls?: string }): string {
  const w = o.w ?? 310;
  const h = o.h ?? 180;
  const left = 34;
  const bottom = h - 26;
  const top = 18;
  const Y = (v: number) => bottom - (v / o.max) * (bottom - top);
  const bw = (w - left - 8) / o.labels.length;
  let body = "";
  for (let v = 0; v <= o.max + 1e-9; v += o.step) body += ln(left, Y(v), w - 6, Y(v), "dg-grid-light") + tx(left - 5, Y(v), fr(v), "dg-tick", "end");
  o.values.forEach((v, i) => {
    body += rect(left + i * bw + bw * 0.18, Y(v), bw * 0.64, bottom - Y(v), o.cls ?? "dg-bar") + tx(left + i * bw + bw / 2, bottom + 11, o.labels[i]!, "dg-tick");
  });
  body += ln(left, bottom, w - 6, bottom, "dg-axis-line") + ln(left, bottom, left, top - 6, "dg-axis-line");
  if (o.unit) body += tx(left - 2, top - 10, o.unit, "dg-lbl-xs", "start");
  return body;
}

/** Échiquier de croisement (génétique) : gamètes en tête de lignes et de colonnes, génotypes dans les cases. */
export function punnett(rows: string[], cols: string[], cell: (r: string, c: string) => string, highlight?: (g: string) => boolean): string {
  const s = 52;
  const x0 = 70;
  const y0 = 34;
  let body = tx(x0 - 34, y0 - 14, "♀ \\ ♂", "dg-lbl-sm");
  cols.forEach((c, j) => (body += rect(x0 + j * s, y0 - 26, s, 24, "dg-head-cell") + tx(x0 + j * s + s / 2, y0 - 14, c, "dg-lbl-math")));
  rows.forEach((r, i) => {
    body += rect(x0 - 60, y0 + i * s, 58, s, "dg-head-cell") + tx(x0 - 31, y0 + i * s + s / 2, r, "dg-lbl-math");
    cols.forEach((c, j) => {
      const g = cell(r, c);
      body += rect(x0 + j * s, y0 + i * s, s, s, highlight?.(g) ? "dg-cell-hi" : "dg-cell") + tx(x0 + j * s + s / 2, y0 + i * s + s / 2, g, "dg-lbl-math");
    });
  });
  return body;
}

export { esc };
