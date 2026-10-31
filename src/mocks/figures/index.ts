// Schémas des leçons, dessinés avec les briques des exercices (mocks/drawings, early-math, geometry,
// measure) puis écrits en fichiers autonomes par scripts/generate-figures.ts :
// public/illustrations/schemas/<id>.svg. Un fichier SVG lu par <img> ne voit ni la feuille de style
// du site ni les autres fichiers : renderSchemaFile y recopie les règles .dg-* de globals.css (couleurs
// du thème comprises) et y intègre les dessins de la banque utilisés.

import { SCHEMAS_CE1 } from "./ce1";
import { SCHEMAS_CE2 } from "./ce2";
import { SCHEMAS_CI } from "./ci";
import { SCHEMAS_CM1 } from "./cm1";
import { SCHEMAS_CM2 } from "./cm2";
import { SCHEMAS_CP } from "./cp";
import { SCHEMAS_SENEGAL } from "./senegal";

export const SCHEMAS: Record<string, string> = { ...SCHEMAS_CI, ...SCHEMAS_CP, ...SCHEMAS_CE1, ...SCHEMAS_CE2, ...SCHEMAS_CM1, ...SCHEMAS_CM2, ...SCHEMAS_SENEGAL };

/** Largeur et hauteur d'un schéma (attributs de son <svg>). */
export function schemaSize(id: string): [number, number] {
  const m = /^<svg[^>]*\bwidth="([\d.]+)" height="([\d.]+)"/.exec(SCHEMAS[id]!);
  if (!m) throw new Error(`schéma sans taille : ${id}`);
  return [Number(m[1]), Number(m[2])];
}

/** Règles .dg-* de globals.css, avec les couleurs du thème à la place des variables. */
export function drawingCss(globalsCss: string): string {
  const source = globalsCss.replace(/\/\*[\s\S]*?\*\//g, "");
  const colors = Object.fromEntries([...source.matchAll(/--(color-[\w-]+):\s*(#[0-9a-fA-F]{3,8})\s*;/g)].map((m) => [m[1]!, m[2]!]));
  const rules: string[] = [];
  for (const m of source.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    const selectors = m[1]!.split(",").map((s) => s.trim());
    if (!selectors.every((s) => /^\.dg(-[\w-]+)?$/.test(s))) continue;
    const body = m[2]!
      .replace(/var\(--(color-[\w-]+)\)/g, (_, name: string) => colors[name] ?? "#101828")
      .replace(/\s+/g, " ")
      .trim();
    rules.push(`${selectors.join(",")}{${body}}`);
  }
  return `svg{color:${colors["color-ink"] ?? "#101828"};font-family:Lexend,Arial,sans-serif}${rules.join("")}`;
}

/** Fichier SVG autonome : espace de noms, feuille de style intégrée et dessins de la banque recopiés. */
export function renderSchemaFile(svg: string, css: string, readPicture: (name: string) => string): string {
  let n = 0;
  const inlined = svg.replace(
    /<image class="dg-item" href="\/illustrations\/([\w-]+)\.svg" x="([\d.-]+)" y="([\d.-]+)" width="([\d.]+)" height="([\d.]+)"\/>/g,
    (_, name: string, x: string, y: string, w: string, h: string) => {
      const file = readPicture(name);
      const viewBox = /viewBox="([^"]+)"/.exec(file)![1];
      const prefix = `p${n++}-`;
      // Identifiants (dégradés) propres à chaque copie, pour que deux dessins ne se mélangent pas.
      const inner = file
        .replace(/^[\s\S]*?<svg[^>]*>/, "")
        .replace(/<\/svg>\s*$/, "")
        .replace(/id="([\w-]+)"/g, `id="${prefix}$1"`)
        .replace(/url\(#([\w-]+)\)/g, `url(#${prefix}$1)`)
        .replace(/href="#([\w-]+)"/g, `href="#${prefix}$1"`)
        .replace(/\s*\n\s*/g, "");
      return `<svg x="${x}" y="${y}" width="${w}" height="${h}" viewBox="${viewBox}">${inner}</svg>`;
    },
  );
  // Seulement les règles des classes présentes dans ce schéma (fichiers légers pour un réseau lent).
  const used = new Set([...inlined.matchAll(/class="([^"]+)"/g)].flatMap((m) => m[1]!.split(/\s+/)));
  const style = [...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)]
    .filter((m) => m[1] === "svg" || m[1]!.split(",").some((s) => used.has(s.slice(1))))
    .map((m) => `${m[1]}{${m[2]}}`)
    .join("");
  return inlined.replace(/^<svg /, '<svg xmlns="http://www.w3.org/2000/svg" ').replace(/^(<svg[^>]*>)/, `$1<style>${style}</style>`) + "\n";
}
