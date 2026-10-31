// Cartes de l'Afrique et du monde pour les leçons d'histoire-géographie, d'après Natural Earth
// (world-map.ts, domaine public). Projection équirectangulaire, avec le cosinus de la latitude moyenne
// pour une carte régionale (les formes restent proches de la réalité). La source reste écrite sur la carte.

import { svg } from "../drawings";
import { arrow, path, tx } from "./kit";
import { WORLD_COUNTRIES, WORLD_LAKES, WORLD_RIVERS } from "./world-map";

export interface MapView {
  lon: [number, number];
  lat: [number, number];
  /** Largeur en pixels. */
  w: number;
  /** Corriger les longitudes par le cosinus de la latitude moyenne (cartes régionales). */
  cos?: boolean;
}

export interface Projected {
  X: (lon: number) => number;
  Y: (lat: number) => number;
  P: (lon: number, lat: number) => [number, number];
  w: number;
  h: number;
}

export function project(v: MapView): Projected {
  const k = v.cos ? Math.cos((((v.lat[0] + v.lat[1]) / 2) * Math.PI) / 180) : 1;
  const scale = v.w / ((v.lon[1] - v.lon[0]) * k);
  const h = Math.round((v.lat[1] - v.lat[0]) * scale);
  const X = (lon: number) => (lon - v.lon[0]) * k * scale;
  const Y = (lat: number) => (v.lat[1] - lat) * scale;
  return { X, Y, P: (lon, lat) => [X(lon), Y(lat)], w: v.w, h };
}

/**
 * Contour projeté. Un contour qui traverse l'antiméridien (180°) est d'abord ramené d'un seul côté
 * (longitudes négatives + 360°) ; ce qui dépasse sort du cadre et n'est pas dessiné.
 */
const ringPath = (p: Projected, flat: number[], close: boolean) => {
  let crosses = false;
  let east = 0;
  for (let i = 0; i < flat.length; i += 2) {
    if (i && Math.abs(flat[i]! - flat[i - 2]!) > 180) crosses = true;
    if (flat[i]! > 0) east++;
  }
  // Contour surtout à l'est : longitudes négatives + 360° ; surtout à l'ouest : longitudes positives − 360°.
  const mostlyEast = east * 2 >= flat.length / 2;
  const lonAt = (i: number) => {
    const lon = flat[i]!;
    if (!crosses) return lon;
    if (mostlyEast) return lon < 0 ? lon + 360 : lon;
    return lon > 0 ? lon - 360 : lon;
  };
  // Points projetés ; un contour entièrement hors du cadre n'est pas écrit, et les points à moins
  // de 1,5 px du précédent sont omis (le dessin reste identique à l'écran, le fichier est bien plus léger).
  const pts: [number, number][] = [];
  for (let i = 0; i < flat.length; i += 2) pts.push([p.X(lonAt(i)), p.Y(flat[i + 1]!)]);
  const xs = pts.map((q) => q[0]);
  const ys = pts.map((q) => q[1]);
  if (Math.max(...xs) < -5 || Math.min(...xs) > p.w + 5 || Math.max(...ys) < -5 || Math.min(...ys) > p.h + 5) return "";
  const kept: [number, number][] = [];
  for (const q of pts) {
    const last = kept[kept.length - 1];
    if (!last || Math.hypot(q[0] - last[0], q[1] - last[1]) >= 1.5) kept.push(q);
  }
  if (close && kept.length < 3) return "";
  // Coordonnées au pixel près : à cette échelle, la différence ne se voit pas.
  return `M${kept.map(([x, y]) => `${Math.round(x)} ${Math.round(y)}`).join("L")}${close ? "Z" : ""}`;
};

/** Noms français des pays cités dans les leçons (les données sont en anglais). */
export const FR: Record<string, string> = {
  Senegal: "Sénégal", Mali: "Mali", Mauritania: "Mauritanie", Gambia: "Gambie", "Guinea-Bissau": "Guinée-Bissau", Guinea: "Guinée",
  "Sierra Leone": "Sierra Leone", Liberia: "Liberia", "Côte d'Ivoire": "Côte d’Ivoire", Ghana: "Ghana", Togo: "Togo", Benin: "Bénin",
  Nigeria: "Nigeria", Niger: "Niger", "Burkina Faso": "Burkina Faso", Morocco: "Maroc", Algeria: "Algérie", Egypt: "Égypte",
  Ethiopia: "Éthiopie", "South Africa": "Afrique du Sud", "Dem. Rep. Congo": "RD Congo", Madagascar: "Madagascar", Chad: "Tchad",
  Sudan: "Soudan", Kenya: "Kenya", Tanzania: "Tanzanie", Libya: "Libye", Tunisia: "Tunisie", Angola: "Angola", Cameroon: "Cameroun",
};

/** CEDEAO depuis janvier 2025 (12 États ; le Cap-Vert, archipel, n'est pas sur ce fond de carte). */
export const ECOWAS = ["Senegal", "Gambia", "Guinea-Bissau", "Guinea", "Sierra Leone", "Liberia", "Côte d'Ivoire", "Ghana", "Togo", "Benin", "Nigeria"];
/** Alliance des États du Sahel : Mali, Burkina Faso et Niger, sortis de la CEDEAO en janvier 2025. */
export const AES = ["Mali", "Burkina Faso", "Niger"];
/** UEMOA : les huit États qui utilisent le franc CFA d'Afrique de l'Ouest. */
export const UEMOA = ["Senegal", "Mali", "Guinea-Bissau", "Côte d'Ivoire", "Burkina Faso", "Niger", "Togo", "Benin"];

/** Pays rangés par continent (pour colorer un continent sur le planisphère). */
const CONTINENT_BOX: Record<string, (lon: number, lat: number, name: string) => boolean> = {
  Afrique: (lon, lat, n) => (lat < 37.5 && lon > -26 && lon < 52 && !["Yemen", "Saudi Arabia", "Oman", "Israel", "Jordan", "Palestine", "Lebanon", "Syria", "Iraq", "Kuwait", "Qatar", "United Arab Emirates", "Iran", "Cyprus", "N. Cyprus", "Turkey"].includes(n)) || n === "Madagascar",
  Europe: (lon, lat, n) => (lat > 35 && lon > -25 && lon < 45 && !["Turkey", "Kazakhstan", "Georgia", "Azerbaijan", "Armenia", "Syria", "Iraq", "Iran", "Cyprus", "N. Cyprus", "Russia"].includes(n)) || n === "Iceland",
  Amérique: (lon) => lon < -30,
  Asie: (lon, lat, n) =>
    (lon > 25 && lat > -11 && !["Australia", "Papua New Guinea", "New Zealand", "Russia", "Madagascar", "Solomon Is.", "Vanuatu", "Fiji", "New Caledonia", "Timor-Leste"].includes(n) && !(lon < 52 && lat < 30 && ["Egypt", "Sudan", "Somalia", "Ethiopia", "Eritrea", "Djibouti", "Kenya"].includes(n))) || ["Turkey", "Cyprus", "N. Cyprus", "Georgia", "Armenia", "Azerbaijan"].includes(n),
  Océanie: (_lon, _lat, n) => ["Australia", "Papua New Guinea", "New Zealand", "Solomon Is.", "Vanuatu", "Fiji", "New Caledonia"].includes(n),
};

/** Centre approximatif d'un pays (moyenne des points de son plus grand contour). */
export function countryCenter(name: string): [number, number] {
  const c = WORLD_COUNTRIES.find((x) => x.name === name);
  if (!c) throw new Error(`pays inconnu : ${name}`);
  const ring = [...c.rings].sort((a, b) => b.length - a.length)[0]!;
  let lon = 0;
  let lat = 0;
  for (let i = 0; i < ring.length; i += 2) {
    lon += ring[i]!;
    lat += ring[i + 1]!;
  }
  return [lon / (ring.length / 2), lat / (ring.length / 2)];
}

export const continentOf = (name: string): string | null => {
  const [lon, lat] = countryCenter(name);
  for (const [continent, test] of Object.entries(CONTINENT_BOX)) if (test(lon, lat, name)) return continent;
  return null;
};

export interface WorldMapOptions {
  view: MapView;
  /** Classe de remplissage par pays (nom anglais des données) ; les autres : dg-land. */
  fills?: Record<string, string>;
  /** Couleur de tout un continent. */
  continent?: [string, string];
  rivers?: string[];
  lakes?: boolean;
  /** Dessin par-dessus la carte, avec la projection. */
  extra?: (p: Projected) => string;
  legend?: [string, string][];
  label: string;
  /** Couleur de fond (mer). */
  sea?: boolean;
}

/** Carte : pays, fleuves, lacs, dessins ajoutés, légende et source. */
export function worldMap(o: WorldMapOptions): string {
  const p = project(o.view);
  let body = `<clipPath id="cadre"><rect x="0" y="0" width="${p.w}" height="${p.h}"/></clipPath><g clip-path="url(#cadre)">`;
  if (o.sea !== false) body += `<rect class="dg-sea" x="0" y="0" width="${p.w}" height="${p.h}"/>`;
  // La Russie est coupée à l'Oural (60° E, limite approximative) : sa partie ouest compte en Europe, l'est en Asie.
  const ural = p.X(60);
  body += `<clipPath id="ouest-oural"><rect x="0" y="0" width="${ural}" height="${p.h}"/></clipPath><clipPath id="est-oural"><rect x="${ural}" y="0" width="${p.w}" height="${p.h}"/></clipPath>`;
  const byClass = new Map<string, string>();
  for (const c of WORLD_COUNTRIES) {
    if (c.name === "Antarctica") continue;
    const d = c.rings.map((r) => ringPath(p, r, true)).join("");
    if (!d) continue;
    if (c.name === "Russia" && o.continent && !o.fills?.Russia) {
      const west = o.continent[0] === "Europe" ? o.continent[1] : "dg-land";
      const eastCls = o.continent[0] === "Asie" ? o.continent[1] : "dg-land";
      body += `<g clip-path="url(#ouest-oural)">${path(d, `${west} dg-border`)}</g><g clip-path="url(#est-oural)">${path(d, `${eastCls} dg-border`)}</g>`;
      continue;
    }
    let cls = o.fills?.[c.name] ?? "dg-land";
    if (o.continent && continentOf(c.name) === o.continent[0]) cls = o.fills?.[c.name] ?? o.continent[1];
    byClass.set(cls, (byClass.get(cls) ?? "") + d);
  }
  // Les pays de même couleur forment un seul tracé (fichier plus léger, dessin identique).
  for (const [cls, d] of byClass) body += path(d, `${cls} dg-border`);
  if (o.lakes) for (const l of WORLD_LAKES) {
    const d = ringPath(p, l.line, true);
    if (d) body += path(d, "dg-water-line");
  }
  for (const r of WORLD_RIVERS) {
    const d = o.rivers?.includes(r.name) ? ringPath(p, r.line, false) : "";
    if (d) body += path(d, "dg-river-thin");
  }
  body += (o.extra?.(p) ?? "") + "</g>";
  body += `<rect class="dg-frame" x="0.5" y="0.5" width="${p.w - 1}" height="${p.h - 1}"/>`;
  let h = p.h;
  for (const [cls, label] of o.legend ?? []) {
    body += `<path class="${cls}" d="M6 ${h + 5}h16v12h-16Z"/>` + tx(28, h + 11, label, "dg-lbl-xs", "start");
    h += 18;
  }
  body += `<text class="dg-source" x="4" y="${h + 9}" dominant-baseline="central">Fond de carte : Natural Earth (domaine public)</text>`;
  return svg(p.w, h + 16, o.label, body);
}

/** Étiquette d'un lieu sur une carte (texte avec liseré clair pour rester lisible). */
export const place = (p: Projected, lon: number, lat: number, label: string, anchor: "start" | "middle" | "end" = "middle", cls = "dg-map") =>
  tx(p.X(lon), p.Y(lat), label, cls, anchor);

/** Flèche entre deux lieux (courbée vers le haut si bend > 0). */
export function route(p: Projected, from: [number, number], to: [number, number], bend = 0, cls = "dg-vec", headCls = "dg-vec-head"): string {
  const [x1, y1] = p.P(...from);
  const [x2, y2] = p.P(...to);
  if (!bend) return arrow(x1, y1, x2, y2, cls, headCls, 9);
  const mx = (x1 + x2) / 2 - ((y2 - y1) * bend) / 100;
  const my = (y1 + y2) / 2 + ((x2 - x1) * bend) / 100;
  const a = Math.atan2(y2 - my, x2 - mx);
  return path(`M${x1.toFixed(1)} ${y1.toFixed(1)}Q${mx.toFixed(1)} ${my.toFixed(1)} ${(x2 - Math.cos(a) * 5).toFixed(1)} ${(y2 - Math.sin(a) * 5).toFixed(1)}`, cls) + arrowHead(x2, y2, a, headCls);
}

const arrowHead = (x: number, y: number, a: number, cls: string) => {
  const s = 9;
  const p1 = [x + s * Math.cos(a + Math.PI - 0.42), y + s * Math.sin(a + Math.PI - 0.42)];
  const p2 = [x + s * Math.cos(a + Math.PI + 0.42), y + s * Math.sin(a + Math.PI + 0.42)];
  return path(`M${x.toFixed(1)} ${y.toFixed(1)}L${p1[0]!.toFixed(1)} ${p1[1]!.toFixed(1)}L${p2[0]!.toFixed(1)} ${p2[1]!.toFixed(1)}Z`, cls);
};
