// Briques communes des schémas des leçons (mocks/figures/<classe>.ts).

import { pictureSize, svg, text, type PictureName } from "../drawings";

/** Garde seulement le <svg> d'un dessin (sans cadre de défilement). */
export const bare = (html: string) => /<svg[\s\S]*<\/svg>/.exec(html)![0];
export const fig = (spec: { fig?: string }) => bare(spec.fig!);

/** Dessin de la banque centré en (cx, cy), haut de h (recopié dans le fichier par renderSchemaFile). */
export function item(name: PictureName, cx: number, cy: number, h: number): string {
  const [pw, ph] = pictureSize(name);
  const w = (h * pw) / ph;
  return `<image class="dg-item" href="/illustrations/${name}.svg" x="${(cx - w / 2).toFixed(1)}" y="${(cy - h / 2).toFixed(1)}" width="${w.toFixed(1)}" height="${h}"/>`;
}

/** Deux schémas côte à côte, avec un signe entre eux (« &lt; », « + 10 → »…). */
export function beside(left: string, sign: string, right: string, label: string): string {
  const size = (s: string) => {
    const m = /^<svg[^>]*\bwidth="([\d.]+)" height="([\d.]+)"/.exec(s)!;
    return [Number(m[1]), Number(m[2])] as const;
  };
  const [w1, h1] = size(left);
  const [w2, h2] = size(right);
  const gap = Math.max(36, sign.length * 11 + 12);
  const h = Math.max(h1, h2);
  const place = (s: string, x: number, sh: number) => s.replace(/^<svg/, `<svg x="${x}" y="${(h - sh) / 2}"`);
  return svg(w1 + gap + w2, h, label, place(left, 0, h1) + text(w1 + gap / 2, h / 2, sign, "dg-text") + place(right, w1 + gap, h2));
}

const digitAt = (n: number, k: number) => Math.floor(n / 10 ** k) % 10;

/** Opération posée en colonnes (m, c, d, u), résultat compris ; retenues en rouge pour + et × (multiplicateur d'un chiffre). */
export function columnOp(a: number, op: "+" | "−" | "×", b: number): string {
  const r = op === "+" ? a + b : op === "−" ? a - b : a * b;
  const n = Math.max(String(a).length, String(b).length, String(r).length);
  const heads = ["u", "d", "c", "m", "dm", "cm"].slice(0, n).reverse();
  const cw = 30;
  const x0 = 34;
  const cx = (k: number) => x0 + (n - 1 - k) * cw + cw / 2; // k : rang en partant des unités
  const carries: number[] = [];
  if (op !== "−") {
    let c = 0;
    for (let k = 0; k < n; k++) {
      const s = op === "+" ? digitAt(a, k) + digitAt(b, k) + c : digitAt(a, k) * b + c;
      c = op === "+" ? (s >= 10 ? 1 : 0) : Math.floor(s / 10);
      carries[k + 1] = c;
    }
  }
  let body = heads.map((h, i) => text(x0 + i * cw + cw / 2, 12, h, "dg-axis")).join("");
  for (let k = 1; k < n; k++) if (carries[k]) body += text(cx(k) - 8, 32, carries[k]!, "dg-carry");
  for (let k = 0; k < String(a).length; k++) body += text(cx(k), 52, digitAt(a, k));
  for (let k = 0; k < String(b).length; k++) body += text(cx(k), 82, digitAt(b, k));
  body += text(16, 82, op);
  body += `<path class="dg-scale" d="M8 98H${x0 + n * cw}"/>`;
  for (let k = 0; k < String(r).length; k++) body += text(cx(k), 118, digitAt(r, k));
  return svg(x0 + n * cw + 8, 132, `Opération posée : ${a} ${op} ${b} = ${r}.`, body);
}

/** Droite graduée de « from » à « to » ; des nombres marqués d'une lettre au-dessus. */
export function numberLine(from: number, to: number, step: number, marks: [number, string][], label: (v: number) => string = String): string {
  const W = 340;
  const xOf = (v: number) => 20 + ((v - from) / (to - from)) * (W - 40);
  let body = `<path class="dg-scale" d="M14 60H${W - 14}"/>`;
  for (let v = from; v <= to; v += step) body += `<path class="dg-line" d="M${xOf(v)} 53v14"/>`;
  // Les nombres des deux bouts restent dans le cadre : alignés à gauche et à droite.
  const edge = (x: number, value: string, anchor: "start" | "end") =>
    `<text class="dg-axis" x="${x}" y="84" text-anchor="${anchor}" dominant-baseline="central">${value}</text>`;
  body += edge(xOf(from) - 6, label(from), "start") + edge(xOf(to) + 6, label(to), "end");
  for (const [v, letter] of marks) {
    body += `<circle class="dg-node" cx="${xOf(v)}" cy="60" r="5"/>${text(xOf(v), 36, letter, "dg-letter")}`;
    if (v !== from && v !== to) body += text(xOf(v), 100, label(v), "dg-axis");
  }
  return svg(W, 110, `Une droite graduée de ${label(from)} à ${label(to)}, avec ${marks.map(([v, l]) => `${l} = ${label(v)}`).join(", ")}.`, body);
}

/** Un rythme de formes qui se répète. */
export function rhythm(motif: ("rond" | "carré" | "triangle")[], repeats: number): string {
  let body = "";
  const all = Array.from({ length: motif.length * repeats }, (_, i) => motif[i % motif.length]!);
  all.forEach((s, i) => {
    const cx = 22 + i * 36;
    body +=
      s === "rond"
        ? `<circle class="dg-node" cx="${cx}" cy="28" r="13"/>`
        : s === "carré"
          ? `<rect class="dg-shape" x="${cx - 12}" y="16" width="24" height="24"/>`
          : `<path class="dg-solid" d="M${cx} 14L${cx + 14} 40H${cx - 14}Z"/>`;
  });
  return svg(all.length * 36 + 8, 56, `Un rythme : ${motif.join(", ")}, qui se répète.`, body);
}
