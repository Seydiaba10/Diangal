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

export const SCHEMAS_SENEGAL: Record<string, string> = {
  "sn-regions": senegalRegions(false),
  "sn-carte-legende": senegalRegions(true),
};
