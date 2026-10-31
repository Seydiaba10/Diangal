// Écrit les schémas des leçons (mocks/figures) en fichiers SVG autonomes :
// public/illustrations/schemas/<id>.svg. À relancer après toute modification d'un schéma, d'un dessin
// de la banque utilisé dedans, ou des règles .dg-* de globals.css (pnpm figures).

import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { drawingCss, renderSchemaFile, SCHEMAS } from "../src/mocks/figures";

const OUT = "public/illustrations/schemas";
const css = drawingCss(readFileSync("src/app/globals.css", "utf8"));
const readPicture = (name: string) => readFileSync(join("public/illustrations", `${name}.svg`), "utf8");

mkdirSync(OUT, { recursive: true });
// Les schémas retirés du code disparaissent aussi du dossier.
for (const file of readdirSync(OUT)) if (!(file.replace(/\.svg$/, "") in SCHEMAS)) rmSync(join(OUT, file));
for (const [id, svg] of Object.entries(SCHEMAS)) writeFileSync(join(OUT, `${id}.svg`), renderSchemaFile(svg, css, readPicture));
console.log(`${OUT} : ${Object.keys(SCHEMAS).length} schémas`);
