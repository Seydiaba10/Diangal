import "server-only";

// Dessins des exercices du primaire, en SVG intégré à l'énoncé : légers, nets sur tous les écrans et
// lisibles hors ligne. Couleurs : classes .dg-* de globals.css (jetons du thème), jamais de code couleur ici.
// aria-label : ce que l'élève voit, lu par l'écoute à voix haute (sans jamais donner la réponse).

export const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** SVG à sa taille naturelle, réduit sur un petit écran ; minWidth : en dessous, il défile seul dans son cadre. */
export function svg(width: number, height: number, label: string, body: string, minWidth?: number): string {
  const style = minWidth ? ` style="min-width:${minWidth}px"` : "";
  return (
    `<svg class="dg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}"${style} role="img" aria-label="${esc(label)}">` +
    `${body}</svg>`
  );
}

export const text = (x: number, y: number, value: string | number, cls = "dg-text") =>
  `<text class="${cls}" x="${x}" y="${y}" text-anchor="middle" dominant-baseline="central">${value}</text>`;

/** Petit cube en relief : face colorée, arête claire en haut à gauche, arête sombre en bas à droite. */
const cube = (x: number, y: number, s: number) =>
  `<rect class="dg-cube" x="${x}" y="${y}" width="${s}" height="${s}" rx="1"/>` +
  `<path class="dg-hi" d="M${x + 1.5} ${y + s - 2}V${y + 1.5}H${x + s - 2}"/>` +
  `<path class="dg-shade" d="M${x + s - 1.5} ${y + 2}V${y + s - 1.5}H${x + 2}"/>`;

/** Tableau d (dizaines) et u (unités) : une barre de dix cubes par dizaine, un cube par unité. */
export function tensUnits(tens: number, units: number): string {
  const pad = 10;
  const s = 11;
  const unitCols = Math.max(1, Math.ceil(units / 5));
  const left = Math.max(64, pad * 2 + tens * s + Math.max(0, tens - 1) * 7);
  const right = Math.max(64, pad * 2 + unitCols * (s + 2) + (unitCols - 1) * 7);
  const head = 26;
  const height = head + s * 10 + 20;
  const width = left + right;
  let body =
    `<rect class="dg-box" x="0.75" y="0.75" width="${width - 1.5}" height="${height - 1.5}"/>` +
    `<path class="dg-line" d="M${left} 0V${height}M0 ${head}H${width}"/>` +
    text(left / 2, head / 2, "d") +
    text(left + right / 2, head / 2, "u");
  for (let i = 0; i < tens; i++) {
    for (let k = 0; k < 10; k++) body += cube(pad + i * (s + 7), head + 10 + k * s, s);
  }
  for (let j = 0; j < units; j++) {
    body += cube(left + pad + Math.floor(j / 5) * (s + 9), head + 10 + (j % 5) * (s + 9), s + 2);
  }
  const label =
    `Tableau d (dizaines) et u (unités) : ${tens} barre${tens > 1 ? "s" : ""} de dix cubes dans la colonne d ` +
    `et ${units} cube${units > 1 ? "s" : ""} dans la colonne u.`;
  return svg(width, height, label, body);
}

/**
 * Cubes empilés en colonnes de 10 (de bas en haut), à compter. La description ne donne pas leur
 * nombre : c'est la réponse.
 */
export function cubeColumns(count: number): string {
  const s = 15;
  const cols = Math.ceil(count / 10);
  const width = 12 + cols * s + (cols - 1) * 12;
  const height = 12 + s * Math.min(10, count);
  let body = "";
  for (let i = 0; i < count; i++) {
    const col = Math.floor(i / 10);
    const row = i % 10;
    body += cube(6 + col * (s + 12), height - 6 - (row + 1) * s, s);
  }
  return svg(width, height, `Des cubes empilés en ${cols > 1 ? `${cols} colonnes` : "une colonne"}.`, body);
}

/**
 * Opération posée dans un tableau d (dizaines) et u (unités), comme dans le cahier : les deux nombres,
 * le signe à gauche, le trait, et les cases vides du résultat.
 */
export function posedGrid(a: number, op: "+" | "−", b: number): string {
  const sw = 26;
  const cw = 44;
  const head = 24;
  const rh = 34;
  const width = sw + cw * 2 + 2;
  const height = head + rh * 3 + 2;
  const xd = sw + cw / 2;
  const xu = sw + cw + cw / 2;
  const digits = (n: number, y: number) => (n >= 10 ? text(xd, y, Math.floor(n / 10)) : "") + text(xu, y, n % 10);
  const y1 = head + rh / 2;
  const y2 = head + rh + rh / 2;
  const body =
    `<rect class="dg-box" x="${sw}" y="1" width="${cw * 2}" height="${height - 2}"/>` +
    `<path class="dg-line" d="M${sw + cw} 1V${height - 1}M${sw} ${head}H${sw + cw * 2}"/>` +
    text(xd, head / 2, "d") +
    text(xu, head / 2, "u") +
    digits(a, y1) +
    text(sw / 2, y2, op) +
    digits(b, y2) +
    `<path class="dg-rule" d="M2 ${head + rh * 2}H${sw + cw * 2}"/>` +
    `<rect class="dg-blank" x="${sw + 5}" y="${head + rh * 2 + 4}" width="${cw - 10}" height="${rh - 8}"/>` +
    `<rect class="dg-blank" x="${sw + cw + 5}" y="${head + rh * 2 + 4}" width="${cw - 10}" height="${rh - 8}"/>`;
  return svg(width, height, `Opération posée dans un tableau d et u : ${a} ${op} ${b}. Le résultat va dans les cases vides.`, body);
}

/** Illustrations réalistes de public/illustrations (largeur et hauteur d'origine). */
const PICTURES = {
  mangue: [100, 120],
  orange: [100, 100],
  banane: [120, 100],
  "eleve-fille": [100, 180],
  "eleve-garcon": [100, 180],
  "piece-5": [100, 100],
  "piece-10": [100, 100],
  "piece-25": [100, 100],
  "piece-50": [100, 100],
  "piece-100": [100, 100],
  pasteque: [120, 100],
  "sac-riz": [100, 120],
  crayon: [140, 60],
  cahier: [100, 120],
  ballon: [100, 100],
  bonbon: [120, 70],
  soleil: [100, 100],
  lune: [100, 100],
  nuage: [120, 80],
  ecole: [140, 110],
  maison: [120, 100],
  case: [120, 100],
  boutique: [140, 100],
  arbre: [110, 120],
  fleur: [80, 110],
  plante: [90, 100],
  caillou: [100, 70],
  poule: [100, 100],
  mouton: [120, 100],
  chevre: [120, 110],
  ane: [130, 110],
  cheval: [130, 110],
  vache: [130, 100],
  chat: [100, 100],
  chien: [110, 100],
  poisson: [120, 70],
  oiseau: [100, 80],
  tortue: [120, 80],
  moustique: [110, 80],
  nid: [120, 80],
  ananas: [80, 120],
  tomate: [100, 100],
  pomme: [100, 100],
  "mangue-abimee": [100, 120],
  pain: [140, 60],
  lait: [60, 120],
  bol: [120, 80],
  tasse: [110, 80],
  "verre-eau": [70, 100],
  sac: [100, 110],
  table: [140, 90],
  lit: [140, 90],
  moto: [150, 90],
  velo: [150, 90],
  pirogue: [170, 70],
  robe: [90, 120],
  chemise: [110, 100],
  chaussure: [120, 70],
  savon: [110, 80],
  seau: [100, 110],
  cle: [120, 60],
  regle: [160, 40],
  ardoise: [120, 90],
  craie: [110, 40],
  livre: [110, 90],
  cartable: [110, 110],
  "brosse-a-dents": [150, 50],
  moustiquaire: [120, 120],
  poubelle: [90, 120],
  arrosoir: [130, 100],
  radio: [120, 90],
  fourchette: [40, 130],
  de: [90, 90],
  roue: [100, 100],
  feu: [90, 120],
  "ballon-baudruche": [80, 130],
  maman: [100, 190],
  papa: [100, 190],
  maitresse: [110, 190],
  bebe: [90, 110],
  oreille: [80, 110],
  oeil: [120, 70],
  main: [90, 120],
  // CP : mots des sons, outils et objets de l’ESVS
  etoile: [100, 100],
  panier: [120, 100],
  coq: [110, 120],
  kora: [90, 150],
  telephone: [70, 120],
  oeuf: [80, 100],
  ciseaux: [120, 90],
  gomme: [100, 60],
  girafe: [110, 160],
  oignon: [90, 110],
  peigne: [120, 60],
  lapin: [100, 120],
  tambour: [90, 120],
  train: [170, 90],
  drapeau: [120, 110],
  lunettes: [130, 54],
  echelle: [70, 150],
  abeille: [110, 84],
  feuille: [100, 90],
  grenouille: [110, 90],
  puits: [120, 130],
  avion: [170, 80],
  camion: [170, 100],
  lion: [130, 120],
  taxi: [160, 90],
  marteau: [110, 110],
  balai: [80, 150],
  pelle: [80, 150],
  javel: [80, 130],
  medicament: [120, 90],
  fontaine: [100, 140],
  sablier: [70, 120],
  jouet: [160, 90],
  lampe: [140, 60],
  "feu-tricolore": [60, 150],
  // CE1 : arbre généalogique, combustibles
  "grand-pere": [110, 190],
  "grand-mere": [110, 190],
  "bouteille-gaz": [80, 130],
  // CE2 : la lettre
  enveloppe: [130, 90],
} as const;
export type PictureName = keyof typeof PICTURES;
export const pictureSize = (name: PictureName): readonly [number, number] => PICTURES[name];

const img = (name: PictureName, alt: string, height: number) => {
  const [w, h] = PICTURES[name];
  return `<img class="dg-pic" src="/illustrations/${name}.svg" alt="${esc(alt)}" width="${Math.round((height * w) / h)}" height="${height}" loading="lazy" decoding="async">`;
};

/** Une illustration (personnage, objet du problème). */
export const picture = (name: PictureName, alt: string, height = 80) => `<p class="dg-pics">${img(name, alt, height)}</p>`;

/** Plusieurs illustrations côte à côte (la description est lue une seule fois). */
export const pictureRow = (items: { name: PictureName; count: number }[], alt: string, height = 40) =>
  `<p class="dg-pics">${items
    .flatMap(({ name, count }) => Array.from({ length: count }, () => name))
    .map((name, i) => img(name, i === 0 ? alt : "", height))
    .join("")}</p>`;

/**
 * Points rangés par deux (en colonnes de deux) : un nombre pair n'en laisse aucun seul. La description
 * ne donne pas leur nombre.
 */
export function pairDots(count: number): string {
  const pairs = Math.ceil(count / 2);
  const width = 12 + pairs * 22;
  let body = "";
  for (let i = 0; i < count; i++) body += token(17 + Math.floor(i / 2) * 22, 14 + (i % 2) * 22, 7);
  return svg(width, 50, "Des jetons rangés par deux.", body);
}

/**
 * Groupes égaux de jetons (paquets, parts d'un partage) : un cadre arrondi par groupe. La description
 * dit combien de groupes et combien de jetons par groupe, pas le total.
 */
export function groups(count: number, size: number, word = "jeton"): string {
  const perRow = Math.min(size, 5);
  const rows = Math.ceil(size / perRow);
  const gw = 10 + perRow * 16;
  const gh = 10 + rows * 16;
  const perLine = Math.min(count, 4);
  const lines = Math.ceil(count / perLine);
  const width = perLine * (gw + 10) + 2;
  const height = lines * (gh + 10) + 2;
  let body = "";
  for (let g = 0; g < count; g++) {
    const gx = 1 + (g % perLine) * (gw + 10);
    const gy = 1 + Math.floor(g / perLine) * (gh + 10);
    body += `<rect class="dg-group" x="${gx}" y="${gy}" width="${gw}" height="${gh}" rx="8"/>`;
    for (let i = 0; i < size; i++) body += token(gx + 13 + (i % perRow) * 16, gy + 13 + Math.floor(i / perRow) * 16, 6);
  }
  const plural = (n: number, w: string) => `${n} ${w}${n > 1 ? "s" : ""}`;
  return svg(width, height, `${plural(count, "groupe")} de ${plural(size, word)}.`, body);
}

/** Tableau c (centaines), d (dizaines) et u (unités) : plaques de cent, barres de dix et cubes. */
export function placeValue(hundreds: number, tens: number, units: number): string {
  const s = 7;
  const col = 92;
  const head = 24;
  const height = head + 10 * s + 20;
  const width = col * 3;
  let body =
    `<rect class="dg-box" x="0.75" y="0.75" width="${width - 1.5}" height="${height - 1.5}"/>` +
    `<path class="dg-line" d="M${col} 0V${height}M${col * 2} 0V${height}M0 ${head}H${width}"/>` +
    text(col / 2, head / 2, "c") +
    text(col * 1.5, head / 2, "d") +
    text(col * 2.5, head / 2, "u");
  for (let h = 0; h < hundreds; h++) {
    for (let i = 0; i < 100; i++) body += cube(10 + h * 6 + (i % 10) * s, head + 10 + Math.floor(i / 10) * s, s);
  }
  for (let t = 0; t < tens; t++) for (let k = 0; k < 10; k++) body += cube(col + 10 + t * (s + 4), head + 10 + k * s, s);
  for (let u = 0; u < units; u++) body += cube(col * 2 + 10 + (u % 5) * (s + 5), head + 10 + Math.floor(u / 5) * (s + 5), s + 2);
  const label = `Tableau c, d et u : ${hundreds} plaque${hundreds > 1 ? "s" : ""} de cent, ${tens} barre${tens > 1 ? "s" : ""} de dix et ${units} cube${units > 1 ? "s" : ""}.`;
  return svg(width, height, label, body);
}

export type RowShape = "rond" | "carré" | "jeton";

/** Jeton de couleur en relief : disque, anneau gravé et reflet. */
const token = (cx: number, cy: number, r: number) =>
  `<circle class="dg-token" cx="${cx}" cy="${cy}" r="${r}"/>` +
  `<circle class="dg-token-ring" cx="${cx}" cy="${cy}" r="${r * 0.6}"/>` +
  `<circle class="dg-hi-dot" cx="${cx - r * 0.35}" cy="${cy - r * 0.35}" r="${r * 0.25}"/>`;

/**
 * Rangée de formes par groupes de 10, comme dans le cahier, avec des lettres au-dessus de quelques-unes
 * (position comptée à partir de la gauche, 1 = la première).
 */
export function rowOf(count: number, shape: RowShape, marks: { position: number; letter: string }[]): string {
  // Une seule ligne, comme dans le cahier. Sur un téléphone, une longue rangée garde des formes lisibles
  // (pas moins des trois quarts de leur taille) et défile seule dans son cadre, jamais la page.
  const pad = 6;
  const step = 14;
  const gap = 10;
  const xOf = (i: number) => pad + i * step + Math.floor(i / 10) * gap;
  const width = xOf(count - 1) + 12 + pad;
  const height = 50;
  let body = "";
  for (let i = 0; i < count; i++) {
    const x = xOf(i);
    body +=
      shape === "carré"
        ? `<rect class="dg-shape" x="${x}" y="32" width="12" height="12"/>`
        : shape === "jeton"
          ? token(x + 6, 38, 6)
          : `<circle class="dg-shape" cx="${x + 6}" cy="38" r="6"/>`;
  }
  for (const { position, letter } of marks) {
    const x = xOf(position - 1) + 6;
    body += text(x, 11, letter, "dg-letter") + `<path class="dg-line" d="M${x} 21V29"/>`;
  }
  const plural = shape === "carré" ? "carrés" : `${shape}s`;
  const label =
    `Une rangée de ${count} ${plural}, par groupes de 10. ` +
    `Les lettres ${marks.map((m) => m.letter).join(", ")} sont écrites au-dessus de ${marks.length} ${plural}.`;
  return `<div class="dg-scroll">${svg(width, height, label, body, Math.round(width * 0.75))}</div>`;
}

/** Bande numérique : une case par nombre ; null = case vide à compléter. */
export function band(values: (number | null)[]): string {
  const w = 52;
  const h = 40;
  const width = values.length * w + 2;
  let body = "";
  values.forEach((v, i) => {
    const x = 1 + i * w;
    body += `<rect class="${v === null ? "dg-blank" : "dg-box"}" x="${x}" y="1" width="${w}" height="${h}"/>`;
    if (v !== null) body += text(x + w / 2, 1 + h / 2, v);
  });
  const label = `Bande numérique : ${values.map((v) => (v === null ? "case vide" : v)).join(", ")}.`;
  return svg(width, h + 2, label, body);
}

/**
 * Arbre de composition (deux nombres en haut se rejoignent en bas) ou de décomposition (un nombre en
 * haut se sépare en bas) ; null = cadre vide à compléter.
 */
export function tree(top: (number | null)[], bottom: (number | null)[]): string {
  const bw = 52;
  const bh = 38;
  const gap = 26;
  const pad = 4;
  const most = Math.max(top.length, bottom.length);
  const width = pad * 2 + most * bw + (most - 1) * gap;
  const height = pad * 2 + bh * 2 + 44;
  const row = (values: (number | null)[], y: number) => {
    const total = values.length * bw + (values.length - 1) * gap;
    const x0 = (width - total) / 2;
    return values.map((v, i) => ({ v, x: x0 + i * (bw + gap), y }));
  };
  const tops = row(top, pad);
  const bottoms = row(bottom, pad + bh + 44);
  let body = "";
  for (const t of tops) for (const b of bottoms) body += `<path class="dg-line" d="M${t.x + bw / 2} ${t.y + bh}L${b.x + bw / 2} ${b.y}"/>`;
  for (const { v, x, y } of [...tops, ...bottoms]) {
    body += `<rect class="${v === null ? "dg-blank" : "dg-box"}" x="${x}" y="${y}" width="${bw}" height="${bh}" rx="6"/>`;
    if (v !== null) body += text(x + bw / 2, y + bh / 2, v);
  }
  const say = (values: (number | null)[]) => values.map((v) => (v === null ? "un cadre vide" : v)).join(" et ");
  const label =
    top.length < bottom.length
      ? `Arbre : ${say(top)} en haut se sépare en ${say(bottom)} en bas.`
      : `Arbre : ${say(top)} en haut se rejoignent dans ${bottom[0] === null ? "le cadre vide" : bottom[0]} en bas.`;
  return svg(width, height, label, body);
}
