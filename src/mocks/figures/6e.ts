// Schémas des leçons de 6e : géométrie (figures codées), repérage, latitude et longitude ; SVT (clé de
// détermination, chaîne alimentaire, besoins de la plante, test de l'amidon) ; histoire (frises) ;
// géographie (orientation, échelle, régions du Sénégal).

import { svg } from "../drawings";
import {
  angleArc,
  arrow,
  callout,
  circ,
  cuboid,
  cylinder,
  dot,
  frise,
  fr,
  ln,
  onCircle,
  path,
  plot,
  poly,
  type Pt,
  pt,
  rect,
  reflect,
  rightAngle,
  seg,
  sphere,
  through,
  ticks,
  tx,
} from "./kit";
import { item } from "./parts";
import { geo, senegalMap } from "./senegal";

const W = 300;

// ── Mathématiques ───────────────────────────────────────────────────────────

/** Droite graduée de a à b (pas « step »), points marqués. */
function numberLine(a: number, b: number, step: number, labelEvery: number, marks: [number, string, "up" | "down"][], label: string, extra = "") {
  const x0 = 18;
  const x1 = W - 18;
  const X = (v: number) => x0 + ((v - a) / (b - a)) * (x1 - x0);
  const y = 60;
  let body = arrow(x0 - 8, y, x1 + 12, y, "dg-axis-line", "dg-pt", 7);
  for (let v = a, i = 0; v <= b + 1e-9; v += step, i++) {
    const major = Math.abs(Math.round(v / labelEvery) * labelEvery - v) < 1e-9;
    body += ln(X(v), y - (major ? 6 : 3), X(v), y + (major ? 6 : 3), "dg-axis-line");
    if (major) body += tx(X(v), y + 17, fr(v), "dg-tick");
  }
  for (const [v, name, side] of marks) {
    const yy = side === "up" ? y - 22 : y + 34;
    body += dot(X(v), y, 3.5, "dg-vec-head") + tx(X(v), yy, name, "dg-lbl-math");
  }
  return svg(W, 104, label, body + extra);
}

const encadrer = (() => {
  const X = (v: number) => 18 + ((v - 3.3) / 0.3) * (W - 36);
  return numberLine(3.3, 3.6, 0.01, 0.1, [[3.47, "3,47", "up"]], "Droite graduée de 3,3 à 3,6 en centièmes : le point 3,47 est entre 3,4 et 3,5.", ln(X(3.4), 86, X(3.5), 86, "dg-vec") + tx((X(3.4) + X(3.5)) / 2, 97, "3,4 < 3,47 < 3,5", "dg-lbl-sm"));
})();

const relatifs = (() => {
  const X = (v: number) => 18 + ((v + 5) / 10) * (W - 36);
  const extra =
    path(`M${X(-3)} 46Q${X(0)} 0 ${X(3)} 46`, "dg-dash") +
    tx(X(0) + 34, 16, "opposés", "dg-lbl-sm", "start") +
    tx(X(-2.6), 92, "nombres négatifs", "dg-lbl-sm") +
    tx(X(2.6), 92, "nombres positifs", "dg-lbl-sm");
  return numberLine(-5, 5, 1, 1, [[-3, "A", "up"], [3, "A′", "up"], [0, "O", "up"]], "Droite graduée de −5 à 5 : A d’abscisse −3 et A′ d’abscisse 3 sont opposés, à la même distance de O.", extra);
})();

const repere = plot({ x: [-4, 4], y: [-3, 3], unit: 32, labelX: "x", labelY: "y" }, "Repère orthonormal : A(3 ; 2), B(−2 ; 1), C(−3 ; −2) et D(1 ; −1). Pour A, on avance de 3 puis on monte de 2.", (p) =>
  p.guides(3, 2) + p.point(3, 2, "A(3 ; 2)", 0, -13) + p.point(-2, 1, "B", -9, -9) + p.point(-3, -2, "C", -9, 9) + p.point(1, -1, "D", 9, 9),
);

const droites = (() => {
  const A: Pt = [52, 32];
  const B: Pt = [126, 32];
  const C: Pt = [52, 82];
  const D: Pt = [126, 82];
  const E: Pt = [52, 132];
  const F: Pt = [126, 132];
  const body =
    through(A, B, 40, "dg-geo") + pt(A, "A", "n", true) + pt(B, "B", "n", true) + tx(190, 32, "droite (AB)", "dg-lbl-sm", "start") +
    seg(C, D) + pt(C, "C", "n", true) + pt(D, "D", "n", true) + tx(190, 82, "segment [CD]", "dg-lbl-sm", "start") +
    ln(E[0], E[1], 172, E[1], "dg-geo") + pt(E, "E", "n", true) + pt(F, "F", "n", true) + tx(190, 132, "demi-droite [EF)", "dg-lbl-sm", "start");
  return svg(W, 156, "Une droite (AB) illimitée des deux côtés, un segment [CD] limité par C et D, une demi-droite [EF) qui commence en E et passe par F.", body);
})();

const cercle = (() => {
  const O: Pt = [96, 100];
  const r = 72;
  const A = onCircle(O, r, 40);
  const B = onCircle(O, r, 160);
  const C = onCircle(O, r, 340);
  const D = onCircle(O, r, 235);
  const E = onCircle(O, r, 300);
  const body =
    circ(O[0], O[1], r, "dg-geo") +
    seg(O, A, "dg-vec") + seg(B, C, "dg-geo-line") + seg(D, E, "dg-curve-3") +
    pt(O, "O", "s") + pt(A, "A", "ne") + pt(B, "B", "w") + pt(C, "C", "e") + pt(D, "D", "sw") + pt(E, "E", "se") +
    callout(O[0] + 2, O[1] - 1, 192, 24, "centre O") +
    callout((O[0] + A[0]) / 2, (O[1] + A[1]) / 2, 192, 58, "rayon [OA]") +
    callout(lerpX(B, C, 0.8), lerpY(B, C, 0.8), 192, 112, "diamètre [BC]") +
    callout((D[0] + E[0]) / 2, (D[1] + E[1]) / 2, 192, 166, "corde [DE]");
  return svg(W, 196, "Cercle de centre O : le rayon [OA], le diamètre [BC] qui passe par le centre, la corde [DE].", body);
})();

function lerpX(a: Pt, b: Pt, t: number) {
  return a[0] + (b[0] - a[0]) * t;
}
function lerpY(a: Pt, b: Pt, t: number) {
  return a[1] + (b[1] - a[1]) * t;
}

const perpPara = (() => {
  // À gauche : (d) ⊥ (d′) ; à droite : (d1) // (d2), et (Δ) perpendiculaire aux deux.
  const I: Pt = [72, 80];
  const a1 = onCircle(I, 60, 25);
  const a2 = onCircle(I, 60, 205);
  const b1 = onCircle(I, 60, 115);
  const b2 = onCircle(I, 60, 295);
  let body = seg(a2, a1, "dg-geo") + seg(b2, b1, "dg-geo-line") + rightAngle(I, a1, b1, 11);
  body += tx(a1[0] + 4, a1[1] - 8, "(d)", "dg-lbl-math") + tx(b1[0] - 12, b1[1] + 4, "(d′)", "dg-lbl-math") + tx(72, 160, "(d) ⊥ (d′)", "dg-lbl");
  const p1: Pt = [170, 50];
  const q1: Pt = [292, 50];
  const p2: Pt = [170, 110];
  const q2: Pt = [292, 110];
  body += seg(p1, q1, "dg-geo") + seg(p2, q2, "dg-geo") + ln(232, 26, 232, 134, "dg-geo-line");
  body += rightAngle([232, 50], [292, 50], [232, 26], 9) + rightAngle([232, 110], [292, 110], [232, 134], 9);
  body += tx(176, 38, "(d₁)", "dg-lbl-math", "start") + tx(176, 98, "(d₂)", "dg-lbl-math", "start") + tx(244, 30, "(Δ)", "dg-lbl-math", "start");
  body += tx(231, 160, "(d₁) // (d₂)", "dg-lbl");
  return svg(W, 174, "À gauche, deux droites perpendiculaires (d) et (d′) avec le codage de l’angle droit. À droite, deux droites parallèles (d₁) et (d₂) ; la droite (Δ) perpendiculaire à l’une est perpendiculaire à l’autre.", body);
})();

const symetrie = (() => {
  const d1: Pt = [150, 12];
  const d2: Pt = [150, 182];
  const A: Pt = [72, 40];
  const B: Pt = [116, 150];
  const C: Pt = [40, 122];
  const [A2, B2, C2] = [A, B, C].map((p) => reflect(p, d1, d2)) as [Pt, Pt, Pt];
  const H: Pt = [150, A[1]];
  let body = seg(d1, d2, "dg-geo-line") + tx(158, 18, "(d)", "dg-lbl-math", "start");
  body += poly([A, B, C], "dg-geo-fill") + poly([A2, B2, C2], "dg-geo-fill");
  body += seg(A, A2, "dg-dash") + rightAngle(H, A2, d2, 8) + ticks(A, H, 2) + ticks(H, A2, 2);
  body += pt(A, "A", "nw") + pt(B, "B", "s") + pt(C, "C", "w") + pt(A2, "A′", "ne") + pt(B2, "B′", "s") + pt(C2, "C′", "e");
  return svg(W, 192, "Le triangle A′B′C′ est le symétrique du triangle ABC par rapport à la droite (d) : (d) est perpendiculaire à [AA′] en son milieu.", body);
})();

const angles = (() => {
  const cell = (cx: number, cy: number, deg: number, name: string) => {
    const S: Pt = [cx - 46, cy + 18];
    const a: Pt = [S[0] + 82, S[1]];
    const b = onCircle(S, 70, deg);
    const mark = deg === 90 ? rightAngle(S, a, b, 11) : angleArc(S, a, b, 20, "", "dg-arc");
    return seg(S, a) + seg(S, b) + mark + dot(S[0], S[1], 2.5) + tx(cx, cy + 36, `${name} (${deg}°)`, "dg-lbl-sm");
  };
  const flat = (cx: number, cy: number) => {
    const S: Pt = [cx, cy + 18];
    return seg([cx - 62, cy + 18], [cx + 62, cy + 18]) + path(`M${cx + 20} ${cy + 18}A20 20 0 0 0 ${cx - 20} ${cy + 18}`, "dg-arc") + dot(S[0], S[1], 2.5) + tx(cx, cy + 36, "angle plat (180°)", "dg-lbl-sm");
  };
  const body = cell(78, 34, 50, "angle aigu") + cell(228, 34, 90, "angle droit") + cell(78, 128, 130, "angle obtus") + flat(228, 128);
  return svg(W, 182, "Quatre angles : aigu (50°), droit (90°), obtus (130°) et plat (180°).", body);
})();

const triangles = (() => {
  const iso: Pt[] = [[50, 22], [14, 112], [86, 112]];
  const equi: Pt[] = [[150, 34], [108, 112], [192, 112]];
  const rectT: Pt[] = [[222, 30], [222, 112], [290, 112]];
  let body = poly(iso) + ticks(iso[0]!, iso[1]!) + ticks(iso[0]!, iso[2]!);
  body += poly(equi) + ticks(equi[0]!, equi[1]!) + ticks(equi[0]!, equi[2]!) + ticks(equi[1]!, equi[2]!);
  body += poly(rectT) + rightAngle(rectT[1]!, rectT[0]!, rectT[2]!, 10);
  body += tx(50, 130, "isocèle", "dg-lbl-sm") + tx(150, 130, "équilatéral", "dg-lbl-sm") + tx(256, 130, "rectangle", "dg-lbl-sm");
  return svg(W, 142, "Triangle isocèle (deux côtés égaux), triangle équilatéral (trois côtés égaux), triangle rectangle (un angle droit).", body);
})();

const quadrilateres = (() => {
  const R: Pt[] = [[14, 20], [130, 20], [130, 86], [14, 86]];
  const L: Pt[] = [[226, 14], [272, 54], [226, 94], [180, 54]];
  const S: Pt[] = [[100, 120], [176, 120], [176, 196], [100, 196]];
  let body = poly(R) + seg(R[0]!, R[2]!, "dg-dash") + seg(R[1]!, R[3]!, "dg-dash");
  for (let i = 0; i < 4; i++) body += rightAngle(R[i]!, R[(i + 1) % 4]!, R[(i + 3) % 4]!, 8);
  body += ticks(R[0]!, [72, 53], 1) + ticks([72, 53], R[2]!, 1) + ticks(R[1]!, [72, 53], 1) + ticks([72, 53], R[3]!, 1);
  body += poly(L) + seg(L[0]!, L[2]!, "dg-dash") + seg(L[1]!, L[3]!, "dg-dash") + rightAngle([226, 54], L[1]!, L[0]!, 7);
  for (let i = 0; i < 4; i++) body += ticks(L[i]!, L[(i + 1) % 4]!, 1);
  body += poly(S);
  for (let i = 0; i < 4; i++) body += rightAngle(S[i]!, S[(i + 1) % 4]!, S[(i + 3) % 4]!, 8) + ticks(S[i]!, S[(i + 1) % 4]!, 2);
  body += tx(72, 104, "rectangle", "dg-lbl-sm") + tx(226, 108, "losange", "dg-lbl-sm") + tx(138, 212, "carré", "dg-lbl-sm");
  return svg(W, 222, "Rectangle : 4 angles droits, diagonales de même longueur qui se coupent en leur milieu. Losange : 4 côtés égaux, diagonales perpendiculaires. Carré : rectangle et losange à la fois.", body);
})();

const aires = (() => {
  let body = rect(12, 26, 96, 56, "dg-geo-fill") + tx(60, 92, "L", "dg-lbl-math") + tx(118, 54, "l", "dg-lbl-math") + tx(60, 112, "A = L × l", "dg-lbl-sm");
  const T: Pt[] = [[134, 82], [214, 82], [168, 22]];
  body += poly(T, "dg-geo-fill") + ln(168, 22, 168, 82, "dg-dash") + rightAngle([168, 82], [214, 82], [168, 22], 7) + tx(176, 54, "h", "dg-lbl-math") + tx(174, 92, "b", "dg-lbl-math") + tx(174, 112, "A = b × h ÷ 2", "dg-lbl-sm");
  body += circ(262, 54, 30, "dg-geo-fill") + seg([262, 54], [292, 54], "dg-vec") + dot(262, 54, 2.5) + tx(277, 46, "r", "dg-lbl-math") + tx(262, 112, "A = π × r × r", "dg-lbl-sm");
  return svg(W, 124, "Aires : rectangle (L × l), triangle (base × hauteur ÷ 2, la hauteur est perpendiculaire à la base), disque (π × r × r).", body);
})();

const paveCylindre = (() => {
  const c = cuboid(14, 52, 100, 62, 60);
  let body = c.svg + tx(64, 126, "L", "dg-lbl-math") + tx(122, 86, "h", "dg-lbl-math") + tx((c.v.B[0] + c.v.F[0]) / 2 + 9, (c.v.B[1] + c.v.F[1]) / 2 + 6, "l", "dg-lbl-math");
  body += cylinder(228, 120, 44, 13, 84) + ln(228, 36, 272, 36, "dg-vec") + dot(228, 36, 2.5) + tx(250, 28, "r", "dg-lbl-math") + ln(282, 36, 282, 120, "dg-dash") + tx(291, 78, "h", "dg-lbl-math");
  body += tx(64, 148, "pavé droit", "dg-lbl-sm") + tx(228, 148, "cylindre", "dg-lbl-sm");
  return svg(W, 160, "Un pavé droit de longueur L, de largeur l et de hauteur h (arêtes cachées en pointillés), et un cylindre de rayon r et de hauteur h.", body);
})();

const boule = (() => {
  const body = sphere(110, 86, 66) + seg([110, 86], [176, 86], "dg-vec") + dot(110, 86, 2.5) + tx(110, 98, "O", "dg-lbl-math") + tx(146, 76, "R", "dg-lbl-math") + callout(70, 96, 196, 150, "grand cercle") + callout(140, 34, 196, 26, "sphère");
  return svg(W, 164, "Sphère de centre O et de rayon R ; l’équateur dessiné est un grand cercle : il a le même centre et le même rayon que la sphère.", body);
})();

/** Globe en projection orthographique (vu un peu au-dessus de l’équateur) : axe des pôles, équateur,
 * parallèles, méridien de Greenwich ; le point M est à l’intersection de son parallèle et de son méridien. */
const latLong = (() => {
  const O: Pt = [98, 122];
  const R = 80;
  const rad = Math.PI / 180;
  const tilt = 16 * rad;
  const lonView = -25;
  // Projection : [x, y, profondeur] (profondeur > 0 : face visible).
  const P = (lat: number, lon: number): [number, number, number] => {
    const p = lat * rad;
    const l = (lon - lonView) * rad;
    return [
      O[0] + R * Math.cos(p) * Math.sin(l),
      O[1] - R * (Math.sin(p) * Math.cos(tilt) - Math.cos(p) * Math.cos(l) * Math.sin(tilt)),
      Math.cos(p) * Math.cos(l) * Math.cos(tilt) + Math.sin(p) * Math.sin(tilt),
    ];
  };
  /** Courbe tracée en trait plein sur la face visible, en pointillés derrière. */
  const curve = (at: (t: number) => [number, number], t0: number, t1: number, front: string, back = "dg-hidden-thin") => {
    let out = "";
    let d = "";
    let vis: boolean | null = null;
    for (let i = 0; i <= 48; i++) {
      const [x, y, z] = P(...at(t0 + ((t1 - t0) * i) / 48));
      const v = z >= 0;
      if (vis !== null && v !== vis) {
        out += path(d, vis ? front : back);
        d = d.slice(d.lastIndexOf("L") >= 0 ? d.lastIndexOf("L") : 0).replace("L", "M");
      }
      d += (d ? "L" : "M") + x.toFixed(1) + " " + y.toFixed(1);
      vis = v;
    }
    return out + path(d, vis ? front : back);
  };
  let body = circ(O[0], O[1], R, "dg-sea") + circ(O[0], O[1], R, "dg-ink");
  for (const lat of [-60, -30, 30, 60]) body += curve((t) => [lat, t], -180, 180, "dg-ink-thin");
  for (const lon of [-90, -40, 40, 90]) body += curve((t) => [t, lon], -90, 90, "dg-ink-thin");
  body += curve((t) => [0, t], -180, 180, "dg-red-line", "dg-hidden");
  body += curve((t) => [t, 0], -90, 90, "dg-blue-line", "dg-hidden");
  const N = P(90, 0);
  const S = P(-90, 0);
  body += ln(N[0], N[1] - 16, S[0], S[1] + 16, "dg-dash") + dot(N[0], N[1], 3) + tx(N[0], N[1] - 24, "pôle Nord", "dg-lbl-sm") + tx(S[0], S[1] + 22, "pôle Sud", "dg-lbl-sm");
  const M = P(30, -40);
  body += dot(M[0], M[1], 4.2, "dg-vec-head") + tx(M[0] - 11, M[1] - 9, "M", "dg-lbl-math");
  const eq = P(0, 20);
  const gr = P(45, 0);
  const par = P(30, 30);
  body += callout(eq[0], eq[1], 196, 176, "équateur (0°)") + callout(gr[0], gr[1], 196, 44, "méridien de") + tx(199, 58, "Greenwich (0°)", "dg-lbl-sm", "start") + callout(par[0], par[1], 196, 92, "parallèle 30° N");
  body += tx(150, 246, "M : latitude 30° N, longitude 40° O", "dg-lbl-sm");
  return svg(W, 256, "Le globe : l’axe des pôles, l’équateur, des parallèles et des méridiens, dont celui de Greenwich. Le point M, à l’intersection du parallèle 30° N et du méridien 40° O, a pour coordonnées 30° N et 40° O.", body);
})();

// ── SVT ─────────────────────────────────────────────────────────────────────

const cleDetermination = (() => {
  const steps: [string, Parameters<typeof item>[0], string][] = [
    ["A-t-il des poils ?", "chevre", "mammifère"],
    ["Des plumes ?", "poule", "oiseau"],
    ["Des nageoires ?", "poisson", "poisson"],
    ["Une peau nue et humide ?", "grenouille", "amphibien"],
  ];
  let body = "";
  steps.forEach(([q, pic, group], i) => {
    const y = 14 + i * 56;
    body += rect(8, y, 150, 30, "dg-cell", 8) + tx(83, y + 15, q, "dg-lbl-sm");
    body += arrow(158, y + 15, 196, y + 15, "dg-ink", "dg-pt", 7) + tx(177, y + 6, "oui", "dg-lbl-xs");
    body += item(pic, 226, y + 15, 40) + tx(276, y + 15, group, "dg-lbl-xs");
    body += arrow(83, y + 30, 83, y + 54, "dg-ink", "dg-pt", 7) + tx(96, y + 42, "non", "dg-lbl-xs", "start");
  });
  const y = 14 + 4 * 56;
  body += item("tortue", 83, y + 16, 34) + tx(150, y + 16, "reptile (écailles)", "dg-lbl-xs", "start");
  return svg(W, y + 40, "Clé de détermination des vertébrés : poils → mammifère (chèvre) ; sinon plumes → oiseau (poule) ; sinon nageoires → poisson ; sinon peau nue et humide → amphibien (grenouille) ; sinon reptile (tortue).", body);
})();

const chaine = (() => {
  const names = ["herbe", "criquet", "lézard", "serpent", "aigle"];
  const roles = ["producteur", "consommateur 1", "consommateur 2", "consommateur 3", "consommateur 4"];
  let body = "";
  names.forEach((n, i) => {
    const y = 12 + i * 40;
    body += rect(90, y, 120, 26, i === 0 ? "dg-t-green" : "dg-cell", 8) + tx(150, y + 13, n, "dg-lbl");
    body += tx(216, y + 13, roles[i]!, "dg-lbl-xs", "start");
    if (i < names.length - 1) body += arrow(150, y + 27, 150, y + 51, "dg-ink", "dg-pt", 7);
  });
  body += tx(150, 214, "chaque flèche se lit « est mangé par »", "dg-lbl-xs");
  body += rect(8, 226, 284, 26, "dg-t-sand", 8) + tx(150, 239, "décomposeurs : bactéries, champignons, vers de terre", "dg-lbl-xs");
  return svg(W, 258, "Chaîne alimentaire : herbe → criquet → lézard → serpent → aigle. Chaque flèche se lit « est mangé par ». L’herbe est le producteur ; les décomposeurs recyclent la matière morte.", body);
})();

/** Plante verte : racines, tige, feuilles ; ce qui entre et ce qui sort. */
const besoinsPlante = (() => {
  let body = rect(0, 168, W, 52, "dg-t-sand") + tx(292, 210, "sol", "dg-lbl-xs", "end");
  // Tige et feuilles.
  body += path("M150 168C150 140 148 110 152 70", "dg-green-line");
  body += path("M151 128C130 112 104 112 88 124C108 136 132 136 151 128Z", "dg-t-green") + path("M151 104C172 86 198 86 214 96C194 110 170 112 151 104Z", "dg-t-green") + path("M152 72C140 54 142 36 152 24C162 36 164 54 152 72Z", "dg-t-green");
  // Racines.
  body += path("M150 168C146 184 136 196 124 206M150 170C154 188 166 198 180 206M150 172C150 190 150 200 148 214", "dg-ink-thin");
  // Soleil et flux.
  body += circ(38, 30, 14, "dg-t-yellow") + arrow(56, 40, 96, 64, "dg-yellow-line", "dg-ray-head", 9) + tx(16, 64, "lumière", "dg-lbl-xs", "start");
  body += arrow(270, 70, 222, 92, "dg-ink", "dg-pt", 7) + tx(292, 60, "dioxyde de carbone", "dg-lbl-xs", "end");
  body += arrow(210, 116, 262, 136, "dg-blue-line", "dg-blue-fill", 8) + tx(292, 150, "dioxygène", "dg-lbl-xs", "end");
  body += arrow(126, 200, 146, 176, "dg-blue-line", "dg-blue-fill", 8) + tx(10, 190, "eau + sels minéraux", "dg-lbl-xs", "start") + tx(10, 202, "(sève brute)", "dg-lbl-xs", "start");
  body += tx(150, 236, "chlorophylle dans les feuilles vertes", "dg-lbl-xs");
  return svg(W, 246, "Plante verte : les racines puisent l’eau et les sels minéraux du sol ; les feuilles vertes absorbent le dioxyde de carbone et la lumière, et rejettent du dioxygène.", body);
})();

/** Test de l'amidon : feuille à moitié cachée, puis eau iodée. */
const amidon = (() => {
  const leaf = (cx: number) => `M${cx} 24C${cx + 46} 40 ${cx + 52} 96 ${cx} 140C${cx - 52} 96 ${cx - 46} 40 ${cx} 24Z`;
  let body = path(leaf(68), "dg-t-green") + rect(30, 70, 76, 34, "dg-pt") + tx(68, 87, "cache noir", "dg-kg");
  body += arrow(124, 82, 168, 82, "dg-ink", "dg-pt", 8) + tx(146, 66, "alcool chaud", "dg-lbl-xs") + tx(146, 100, "eau iodée", "dg-lbl-xs");
  body += `<clipPath id="feuille"><path d="${leaf(230)}"/></clipPath>`;
  body += `<g clip-path="url(#feuille)">${rect(170, 20, 120, 130, "dg-amidon")}${rect(170, 70, 120, 34, "dg-t-yellow")}</g>` + path(leaf(230), "dg-ink");
  body += tx(68, 156, "1. à la lumière", "dg-lbl-xs") + tx(230, 156, "2. après le test", "dg-lbl-xs");
  body += rect(40, 172, 14, 12, "dg-amidon") + tx(60, 178, "bleu-noir : amidon", "dg-lbl-xs", "start") + rect(172, 172, 14, 12, "dg-t-yellow") + tx(192, 178, "jaune : pas d’amidon", "dg-lbl-xs", "start");
  return svg(W, 192, "Mise en évidence de l’amidon : une feuille dont une partie est cachée est exposée à la lumière, puis décolorée et testée à l’eau iodée. La partie éclairée devient bleu-noir (amidon) ; la partie cachée reste jaune.", body);
})();

// ── Histoire ────────────────────────────────────────────────────────────────

const periodes = (() => {
  const f = frise({
    from: -4000,
    to: 2000,
    step: 1000,
    w: W,
    periods: [
      [-4000, -3000, "Préhistoire"],
      [-3000, 476, "Antiquité"],
      [476, 1492, "Moyen Âge"],
      [1492, 1789, "Temps modernes"],
      [1789, 2000, "Époque contemporaine"],
    ],
    events: [
      [-3000, "écriture"],
      [476, "fin de l’Empire romain"],
      [1492, "arrivée en Amérique"],
    ],
  });
  return svg(W, f.h, "Frise des grandes périodes : la Préhistoire jusqu’à l’invention de l’écriture vers −3000, l’Antiquité jusqu’en 476, le Moyen Âge jusqu’en 1492, les Temps modernes jusqu’en 1789, puis l’époque contemporaine.", f.svg);
})();

// ── Géographie ──────────────────────────────────────────────────────────────

const roseEchelle = (() => {
  const c: Pt = [86, 96];
  let body = "";
  const pts: [number, string][] = [[90, "N"], [0, "E"], [270, "S"], [180, "O"]];
  for (const [deg, name] of pts) {
    const tip = onCircle(c, 58, deg);
    const l = onCircle(c, 12, deg + 45);
    const r = onCircle(c, 12, deg - 45);
    body += path(`M${tip[0]} ${tip[1]}L${l[0]} ${l[1]}L${c[0]} ${c[1]}Z`, deg === 90 ? "dg-vec-head" : "dg-pt") + path(`M${tip[0]} ${tip[1]}L${r[0]} ${r[1]}L${c[0]} ${c[1]}Z`, "dg-cell");
    const t = onCircle(c, 72, deg);
    body += tx(t[0], t[1], name, "dg-lbl");
  }
  for (const [deg, name] of [[45, "NE"], [135, "NO"], [225, "SO"], [315, "SE"]] as [number, string][]) {
    const t = onCircle(c, 44, deg);
    body += ln(c[0], c[1], ...onCircle(c, 32, deg), "dg-ink-thin") + tx(t[0], t[1], name, "dg-lbl-xs");
  }
  // Échelle graphique 1 cm = 10 km, dessinée en 4 segments.
  const x0 = 180;
  const y0 = 120;
  for (let i = 0; i < 4; i++) body += rect(x0 + i * 26, y0, 26, 8, i % 2 ? "dg-cell" : "dg-pt");
  body += tx(x0, y0 + 20, "0", "dg-tick") + tx(x0 + 52, y0 + 20, "20", "dg-tick") + tx(x0 + 104, y0 + 20, "40 km", "dg-tick");
  body += tx(x0 + 52, y0 - 16, "échelle graphique", "dg-lbl-xs") + tx(x0 + 52, 60, "1/1 000 000 :", "dg-lbl-xs") + tx(x0 + 52, 74, "1 cm = 10 km", "dg-lbl-sm");
  return svg(W, 178, "Rose des vents avec les quatre points cardinaux (nord, est, sud, ouest) et les points intermédiaires ; une échelle graphique : au 1/1 000 000, 1 cm sur la carte représente 10 km.", body);
})();

/** Coupe de la vallée du fleuve Sénégal : walo inondable, diéri sec. */
const waloDieri = (() => {
  let body = path("M0 46L60 48L96 84L130 98L150 104L170 98L204 84L240 48L300 46L300 150L0 150Z", "dg-t-sand");
  body += path("M120 96L150 104L180 96L174 116L126 116Z", "dg-water");
  body += path("M96 84L130 98L150 104L170 98L204 84L204 92L170 108L130 108L96 92Z", "dg-t-green");
  body += tx(150, 128, "fleuve", "dg-lbl-xs");
  body += ln(104, 90, 66, 120, "dg-leader") + tx(12, 124, "walo (inondé)", "dg-lbl-xs", "start") + ln(196, 90, 234, 120, "dg-leader") + tx(288, 124, "walo", "dg-lbl-xs", "end");
  body += ln(30, 46, 40, 24, "dg-leader") + tx(44, 20, "diéri (terres sèches)", "dg-lbl-xs", "start") + ln(270, 46, 262, 24, "dg-leader") + tx(288, 20, "diéri", "dg-lbl-xs", "end");
  body += tx(150, 144, "cultures de décrue sur le walo ; mil sous pluie sur le diéri", "dg-lbl-xs");
  return svg(W, 152, "Coupe de la vallée du fleuve Sénégal : de part et d’autre du fleuve, le walo, inondé à la crue, puis le diéri, terres hautes et sèches.", body);
})();

const region = (highlight: string[], cities: string[], label: string, legend: string, rivers: string[] = [], extra = "") =>
  senegalMap({ highlight, cities, rivers, extra, legend: [["dg-zone", legend]], label });

/** Le Ferlo (zone naturelle, limites approximatives) entre la vallée du fleuve et le Bassin arachidier. */
const ferloZone = (() => {
  const pts: [number, number][] = [[-15.9, 15.6], [-15.3, 16.05], [-14.3, 15.95], [-13.6, 15.3], [-13.7, 14.8], [-14.6, 14.75], [-15.6, 15.0]];
  return `<path class="dg-zone" d="M${pts.map(([a, b]) => geo(a, b).map((v) => v.toFixed(1)).join(" ")).join("L")}Z"/>`;
})();

export const SCHEMAS_6E: Record<string, string> = {
  "m6-encadrer": encadrer,
  "m6-relatifs": relatifs,
  "m6-repere": repere,
  "m6-droites": droites,
  "m6-cercle": cercle,
  "m6-perp-para": perpPara,
  "m6-symetrie": symetrie,
  "m6-angles": angles,
  "m6-triangles": triangles,
  "m6-quadrilateres": quadrilateres,
  "m6-aires": aires,
  "m6-pave-cylindre": paveCylindre,
  "m6-sphere": boule,
  "m6-lat-long": latLong,
  "s6-cle": cleDetermination,
  "s6-chaine": chaine,
  "s6-besoins-plante": besoinsPlante,
  "s6-amidon": amidon,
  "h6-periodes": periodes,
  "g6-rose-echelle": roseEchelle,
  "g6-walo-dieri": waloDieri,
  "g6-bassin-arachidier": region(["Kaolack", "Kaffrine", "Fatick", "Diourbel", "Thiès", "Louga"], ["Kaolack", "Touba", "Diourbel", "Kaffrine"], "Carte du Sénégal : le Bassin arachidier au centre-ouest (régions de Kaolack, Kaffrine, Fatick, Diourbel, Thiès et Louga).", "le Bassin arachidier", ["Saloum"]),
  "g6-dakar-littoral": region(["Dakar"], ["Dakar", "Thiès", "Mbour"], "Carte du Sénégal : la presqu’île du Cap-Vert (région de Dakar) et le littoral central, de Dakar à Mbour.", "la région de Dakar"),
  "g6-ferlo": senegalMap({ cities: ["Linguère", "Matam", "Saint-Louis"], rivers: ["Sénégal"], extra: ferloZone, legend: [["dg-zone", "le Ferlo (limites approximatives)"]], label: "Carte du Sénégal : le Ferlo, au nord, entre la vallée du fleuve Sénégal et le Bassin arachidier ; ses limites sont approximatives." }),
  "g6-vallee": region(["Saint-Louis", "Matam"], ["Saint-Louis", "Richard-Toll", "Podor", "Matam", "Bakel"], "Carte du Sénégal : la vallée du fleuve Sénégal, au nord, de Bakel à Saint-Louis (régions de Saint-Louis et de Matam).", "les régions de la vallée", ["Sénégal", "Falémé"]),
  "g6-casamance": region(["Ziguinchor", "Sédhiou", "Kolda"], ["Ziguinchor", "Sédhiou", "Kolda"], "Carte du Sénégal : la Casamance, au sud de la Gambie (régions de Ziguinchor, Sédhiou et Kolda), traversée par le fleuve Casamance.", "la Casamance", ["Casamance"]),
  "g6-sud-est": region(["Tambacounda", "Kédougou"], ["Tambacounda", "Kédougou", "Bakel"], "Carte du Sénégal : le Haut-Sénégal ou Sud-Est (régions de Tambacounda et de Kédougou), avec la Gambie et la Falémé.", "le Sud-Est", ["Gambie", "Falémé", "Sénégal"]),
};

