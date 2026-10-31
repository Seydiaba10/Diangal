// Cartes du Sénégal pour les leçons de géographie, à partir des limites des 14 régions
// (senegal-map.ts : geoBoundaries, source Gouvernement du Sénégal et OCHA, licence CC BY 3.0 IGO).

import { svg, text } from "../drawings";
import { SENEGAL_REGIONS, SENEGAL_SIZE } from "./senegal-map";

/** Décalage du nom de quelques régions trop petites ou trop serrées (en pixels). */
const NUDGE: Record<string, [number, number]> = {
  Thiès: [-2, -16],
  Diourbel: [2, -2],
  Fatick: [-8, -6],
  Kaolack: [8, 6],
  Ziguinchor: [-6, 2],
  Sédhiou: [6, -4],
};

/** Carte des 14 régions, avec leur nom, Dakar (capitale), la flèche du nord et une légende. */
export function senegalRegions(legend: boolean): string {
  const [w, h] = SENEGAL_SIZE;
  let body = "";
  SENEGAL_REGIONS.forEach((r, i) => {
    body += `<path class="${i % 2 ? "dg-land" : "dg-land-alt"}" d="${r.d}"/>`;
  });
  for (const r of SENEGAL_REGIONS) {
    if (r.name === "Dakar") continue;
    const [dx, dy] = NUDGE[r.name] ?? [0, 0];
    body += text(r.label[0] + dx, r.label[1] + dy, r.name, "dg-map");
  }
  const dakar = SENEGAL_REGIONS.find((r) => r.name === "Dakar")!.label;
  body += `<circle class="dg-capital" cx="${dakar[0]}" cy="${dakar[1]}" r="4"/>${text(dakar[0] + 2, dakar[1] - 14, "Dakar", "dg-map")}`;
  body += `<path class="dg-arrow" d="M${w - 18} 48V14m-6 8 6-8 6 8"/>${text(w - 18, 58, "N", "dg-map")}`;
  let height = h;
  if (legend) {
    body += `<circle class="dg-capital" cx="14" cy="${h + 12}" r="4"/>${text(80, h + 12, "la capitale", "dg-map")}`;
    body += `<path class="dg-land" d="M150 ${h + 4}h18v16h-18Z"/>${text(222, h + 12, "une région", "dg-map")}`;
    height += 26;
  }
  // Licence CC BY 3.0 IGO : la source reste visible sur la carte.
  body += `<text class="dg-source" x="4" y="${height + 8}" dominant-baseline="central">Limites : Gouvernement du Sénégal, OCHA (geoBoundaries, CC BY 3.0 IGO)</text>`;
  height += 16;
  return svg(w, height, `Carte du Sénégal et de ses 14 régions${legend ? ", avec une légende" : ""}. Dakar, la capitale, est à l’ouest ; le nord est en haut.`, body);
}

/**
 * Coordonnées géographiques → point de la carte (même projection que senegal-map.ts : équirectangulaire,
 * cadre de geoBoundaries de 17,53° O à 11,35° O et de 12,31° N à 16,69° N, marge de 6 px).
 */
export const geo = (lon: number, lat: number): [number, number] => [6 + (lon + 17.53) * 53.36, 6 + (16.69 - lat) * 55.11];

/** Villes (longitude, latitude, d'après leurs coordonnées publiées). */
export const CITIES: Record<string, [number, number]> = {
  Dakar: [-17.44, 14.69],
  Thiès: [-16.93, 14.79],
  "Saint-Louis": [-16.49, 16.03],
  Louga: [-16.22, 15.62],
  Diourbel: [-16.23, 14.66],
  Touba: [-15.88, 14.85],
  Kaolack: [-16.07, 14.15],
  Fatick: [-16.41, 14.34],
  Kaffrine: [-15.55, 14.11],
  Mbour: [-16.97, 14.42],
  Joal: [-16.83, 14.17],
  Kayar: [-17.12, 14.92],
  Ziguinchor: [-16.27, 12.56],
  Sédhiou: [-15.56, 12.71],
  Kolda: [-14.94, 12.89],
  Tambacounda: [-13.67, 13.77],
  Kédougou: [-12.18, 12.56],
  Matam: [-13.26, 15.66],
  Podor: [-14.96, 16.65],
  "Richard-Toll": [-15.7, 16.46],
  Linguère: [-15.12, 15.39],
  Bakel: [-12.46, 14.9],
  Diama: [-16.42, 16.21],
};

/** Cours d'eau principaux, tracés simplifiés (points relevés de la source à l'embouchure). */
/** Côté du nom de quelques villes, pour éviter les chevauchements (par défaut : à droite, un peu au-dessus). */
const CITY_SIDE: Record<string, "w" | "s" | "n"> = { Diourbel: "w", Ziguinchor: "s", Sédhiou: "n", Dakar: "n", Mbour: "s", Podor: "s", "Richard-Toll": "s", Fatick: "w" };

export const RIVERS: Record<string, [number, number][]> = {
  Sénégal: [[-12.2, 14.62], [-12.46, 14.9], [-12.85, 15.27], [-13.26, 15.66], [-13.65, 16.05], [-14.36, 16.52], [-14.96, 16.65], [-15.7, 16.46], [-16.1, 16.45], [-16.42, 16.21], [-16.49, 16.03], [-16.53, 15.85]],
  Falémé: [[-11.45, 12.45], [-11.38, 13.2], [-11.75, 13.8], [-11.95, 14.3], [-12.2, 14.62]],
  Gambie: [[-12.1, 12.35], [-12.35, 12.86], [-12.9, 13.05], [-13.3, 13.3], [-13.72, 13.47], [-13.8, 13.42]],
  Casamance: [[-14.75, 12.98], [-15.2, 12.8], [-15.56, 12.71], [-15.95, 12.62], [-16.27, 12.56], [-16.6, 12.55], [-16.77, 12.57]],
  Saloum: [[-15.9, 14.12], [-16.07, 14.15], [-16.3, 14.13], [-16.47, 14.13], [-16.62, 13.98], [-16.75, 13.85]],
};

/** Masque au contour du pays (à utiliser avec senegalMap) : ce qui est dessiné dans <g clip-path="url(#id)"> reste dans le Sénégal. */
export const senegalClip = (id: string) => `<clipPath id="${id}">${SENEGAL_REGIONS.map((_, i) => `<use href="#sn-r${i}"/>`).join("")}</clipPath>`;

/** Ligne de latitude « lat » (en degrés) sur toute la largeur de la carte, éventuellement inclinée vers « latEast » à l'est. */
export const latLine = (lat: number, latEast = lat) => {
  const [x1, y1] = geo(-17.6, lat);
  const [x2, y2] = geo(-11.3, latEast);
  return `M${x1.toFixed(1)} ${y1.toFixed(1)}L${x2.toFixed(1)} ${y2.toFixed(1)}`;
};

/** Ligne d'un cours d'eau sur la carte. */
export const riverPath = (name: string) => `M${RIVERS[name]!.map(([lon, lat]) => geo(lon, lat).map((v) => v.toFixed(1)).join(" ")).join("L")}`;

/**
 * Carte du Sénégal pour les leçons de géographie : régions administratives (celles de « highlight »
 * en couleur), cours d'eau, villes et légende ; « extra » est dessiné par-dessus (zones, flèches…).
 */
export function senegalMap(o: {
  highlight?: string[];
  rivers?: string[];
  cities?: string[];
  regionNames?: boolean;
  extra?: string;
  legend?: [string, string][];
  /** Classe de remplissage propre à certaines régions (sinon dg-zone pour « highlight », dg-land pour les autres). */
  fills?: Record<string, string>;
  label: string;
}): string {
  const [w, h] = SENEGAL_SIZE;
  let body = "";
  // Chaque région a un identifiant : senegalClip s'en sert pour découper sans recopier les contours.
  SENEGAL_REGIONS.forEach((r, i) => (body += `<path id="sn-r${i}" class="${o.fills?.[r.name] ?? (o.highlight?.includes(r.name) ? "dg-zone" : "dg-land")}" d="${r.d}"/>`));
  for (const name of o.rivers ?? []) body += `<path class="dg-river" d="${riverPath(name)}"/>`;
  body += o.extra ?? "";
  if (o.regionNames) {
    for (const r of SENEGAL_REGIONS) {
      if (r.name === "Dakar") continue;
      const [dx, dy] = NUDGE[r.name] ?? [0, 0];
      body += text(r.label[0] + dx, r.label[1] + dy, r.name, "dg-map");
    }
  }
  for (const name of o.cities ?? []) {
    const [x, y] = geo(...CITIES[name]!);
    const side = CITY_SIDE[name];
    const left = side === "w" || x > w - 70;
    const [lx, ly, anchor] = side === "s" ? [x, y + 10, "middle"] : side === "n" ? [x + 2, y - 10, "middle"] : [x + (left ? -6 : 6), y - 6, left ? "end" : "start"];
    body += `<circle class="dg-capital" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${name === "Dakar" ? 4 : 3}"/>`;
    body += `<text class="dg-map" x="${lx.toFixed(1)}" y="${ly.toFixed(1)}" text-anchor="${anchor}" dominant-baseline="central">${name}</text>`;
  }
  body += `<path class="dg-arrow" d="M${w - 18} 48V14m-6 8 6-8 6 8"/>${text(w - 18, 58, "N", "dg-map")}`;
  let height = h;
  for (const [cls, label] of o.legend ?? []) {
    body += `<path class="${cls}" d="M8 ${height + 4}h18v14h-18Z"/><text class="dg-map" x="32" y="${height + 11}" dominant-baseline="central">${label}</text>`;
    height += 20;
  }
  body += `<text class="dg-source" x="4" y="${height + 8}" dominant-baseline="central">Limites : Gouvernement du Sénégal, OCHA (geoBoundaries, CC BY 3.0 IGO)</text>`;
  height += 16;
  return svg(w, height, o.label, body);
}

export const SCHEMAS_SENEGAL: Record<string, string> = {
  "sn-regions": senegalRegions(false),
  "sn-carte-legende": senegalRegions(true),
};
