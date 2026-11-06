// Annales du CFEE : classe les PDF relevés, retire leurs liens cliquables et écrit la liste de l'application.
// Les PDF restent hors du dépôt (le dépôt est public) ; ils seront servis par le Storage (seau content-free).
//
//   node scripts/import-cfee-papers.mjs <dossier brut> <dossier publié>   classe, nettoie, écrit le mock et le CSV
//   node scripts/import-cfee-papers.mjs --upload <dossier publié>         envoie les PDF au Storage (clé de .env.local)
//
// Classement fait à l'œil le 02/11/2026, document par document : voir docs/annales/README.md.
import { mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { PDFDocument, PDFName } from "pdf-lib";

const CHECKED_ON = "2026-11-02";
const STORAGE_BASE = "https://mlepbueoqrzmniksdhpl.supabase.co/storage/v1/object/public/content-free/annales/cfee";
const SOURCE_SITE = "https://epreuvesetcorriges.com/categories/senegal/examens/cep";
const DEXCO = "Direction des Examens et Concours (DEXCO)";
const EXAMEN_SN = "Ancien site examen.sn (ministère de l’Éducation nationale, RESAFAD)";
const BOTH = "Ressources et compétence";

/** Documents écartés après contrôle, avec la raison (identifiant du document sur le site d'origine). */
const EXCLUDED = new Map([
  ["2247", "page cassée : formules remplacées par un message d’erreur"],
  ["2255", "page cassée : formules remplacées par un message d’erreur"],
  ["2293", "page cassée : formules remplacées par un message d’erreur (sujet gardé : 2291)"],
  ["35965", "photo d’un cahier écrit à la main : pas un corrigé officiel"],
  ["35982", "texte sans rapport avec le sujet : pas un corrigé officiel"],
  ["42914", "titré 2026, mais la copie porte SESSION DE 2025 (gardé : 42865)"],
  ["42915", "titré 2026, mais la copie porte SESSION DE 2025 (gardé : 42863)"],
  ["42916", "titré 2026, mais la copie porte SESSION DE 2025 (gardé : 42866)"],
  ["42917", "titré 2026, mais la copie porte SESSION DE 2025 (gardé : 42867)"],
  ["42918", "titré 2026, mais la copie porte SESSION DE 2025 (gardé : 42864)"],
  ["42919", "titré 2026, mais la copie porte SESSION DE 2025 (gardé : 42864)"],
  ["31838", "doublon de 31837"],
  ["35983", "doublon de 35987"],
  ["35984", "doublon de 35988"],
  ["35985", "doublon de 35991"],
  ["35986", "même sujet que 35961, moins propre"],
  ["35990", "même sujet que 35963, moins propre"],
  ["35962", "photo du même sujet que 35989"],
]);
const OLD_REASON = "de 2000 à 2012 : texte recopié, sans marque officielle, ancien format d’examen";

/** Ce que le nom du fichier ne dit pas ou dit mal, vérifié sur le document. */
const OVERRIDES = new Map([
  ["2244", { blanc: true }],
  ["2290", { blanc: true }],
  ["2298", { blanc: true }],
  ["31835", { part: BOTH }],
  ["35961", { part: BOTH }],
  ["35987", { part: BOTH }],
  ["42796", { part: "Compétence" }],
  ["42798", { part: BOTH }],
  ["42799", { part: BOTH }],
  ["42800", { part: BOTH }],
  ["42802", { part: "Compétence" }],
  ["42803", { part: BOTH }],
  ["42804", { part: BOTH }],
  ["42860", { part: BOTH }],
  ["42863", { part: BOTH }],
  ["42865", { part: BOTH }],
  ["42921", { part: BOTH }],
  ["42922", { part: BOTH }],
  ["42924", { part: BOTH }],
]);

const SUBJECTS = [
  [/langues?-et-communication/, "FR", "Langue et communication", "langue"],
  [/mathematiques?/, "MATH", "Mathématiques", "maths"],
  [/decouverte-du-monde/, "ESVS", "Découverte du monde", "decouverte-monde"],
  [/developpement-durable/, "ESVS", "Éducation au développement durable", "developpement-durable"],
  [/education-a-la-science-et-a-la-vie-sociale/, "ESVS", "Éducation à la science et à la vie sociale", "esvs"],
  [/education-artisti|physique-et-artistique/, "ART", "Éducation artistique", "education-artistique"],
  [/arabe/, "AR", "Arabe (épreuve optionnelle)", "arabe"],
];

function partOf(slug) {
  if (/arabe/.test(slug)) return "Épreuve optionnelle";
  if (/education-artisti|physique-et-artistique/.test(slug)) return "Compétence";
  if (/ressources-et-de-competence/.test(slug)) return BOTH;
  if (/competences?|maitrise/.test(slug)) return "Compétence";
  if (/ressou?r/.test(slug)) return "Ressources";
  return null;
}

const partSlug = (part) =>
  ({ [BOTH]: "ressources-competence", Compétence: "competence", Ressources: "ressources", "Épreuve optionnelle": "optionnelle" })[part];

/** Un document du dossier brut → sa fiche, ou la raison de son exclusion. */
function classify(file) {
  const slug = file.replace(/\.pdf$/, "");
  const id = slug.split("-")[0];
  const name = slug.slice(id.length + 1);
  const year = Number(/20\d\d/.exec(name)?.[0]);
  if (EXCLUDED.has(id)) return { id, slug, excluded: EXCLUDED.get(id) };
  if (year <= 2012) return { id, slug, excluded: OLD_REASON };
  const override = OVERRIDES.get(id) ?? {};
  const subject = SUBJECTS.find(([pattern]) => pattern.test(name));
  if (!subject) throw new Error(`matière inconnue : ${file}`);
  const part = override.part ?? partOf(name);
  if (!part) throw new Error(`partie inconnue : ${file}`);
  const kind = /corrige|correction|guide-de-correction/.test(name) ? "corrige" : "epreuve";
  const blanc = override.blanc ?? /blanc/.test(name);
  return {
    id,
    slug,
    year,
    kind,
    blanc,
    subjectCode: subject[1],
    subjectLabel: blanc ? `Examen blanc · ${subject[2]}` : subject[2],
    part,
    // Avant 2023 : pages imprimées de l'ancien site du ministère. Depuis : scans portant le tampon de la DEXCO.
    sourceName: Number(id) < 31000 ? EXAMEN_SN : DEXCO,
    name: `cfee-${blanc ? "blanc-" : ""}${year}-${subject[3]}-${partSlug(part)}-${kind}`,
  };
}

/** Copie un PDF sans ses liens ni ses actions automatiques : l'ancien domaine examen.sn sert aujourd'hui un site de jeux d'argent. */
async function clean(input, output) {
  const doc = await PDFDocument.load(readFileSync(input), { ignoreEncryption: true, updateMetadata: false });
  for (const page of doc.getPages()) page.node.delete(PDFName.of("Annots"));
  doc.catalog.delete(PDFName.of("OpenAction"));
  doc.catalog.delete(PDFName.of("AA"));
  writeFileSync(output, await doc.save());
}

async function prepare(rawDir, outDir) {
  mkdirSync(outDir, { recursive: true });
  const rows = readdirSync(rawDir)
    .filter((f) => f.endsWith(".pdf"))
    .map((file) => ({ file, ...classify(file) }));
  const kept = rows.filter((r) => !r.excluded);
  // Deux documents pour la même case : on numérote le second.
  const seen = new Map();
  for (const row of kept.sort((a, b) => Number(a.id) - Number(b.id))) {
    const count = (seen.get(row.name) ?? 0) + 1;
    seen.set(row.name, count);
    if (count > 1) row.name = `${row.name}-${count}`;
  }
  for (const row of kept) {
    const output = join(outDir, `${row.name}.pdf`);
    await clean(join(rawDir, row.file), output);
    row.fileKb = Math.ceil(statSync(output).size / 1024);
  }
  const papers = kept
    .sort((a, b) => b.year - a.year || a.name.localeCompare(b.name))
    .map((r) => ({
      year: r.year,
      kind: r.kind,
      group: null,
      replacement: false,
      subjectCode: r.subjectCode,
      subjectLabel: r.subjectLabel,
      seriesLabel: r.part,
      seriesCodes: [],
      title: `${r.blanc ? "Examen blanc" : "CFEE"} ${r.year} · ${r.subjectLabel.replace("Examen blanc · ", "")} · ${r.part} · ${r.kind === "corrige" ? "corrigé" : "sujet"}`,
      url: `${STORAGE_BASE}/${r.name}.pdf`,
      sourcePage: `${SOURCE_SITE}/${r.slug}`,
      sourceName: r.sourceName,
      fileKb: r.fileKb,
    }));
  writeFileSync(
    "src/mocks/official-papers-cfee.ts",
    `import type { OfficialPaperData } from "@/types/domain";

// Sujets et corrigés officiels du CFEE : copies relevées le 02/11/2026, contrôlées document par document
// (année, tampon de la DEXCO ou page de l'ancien site du ministère), liens cliquables retirés.
// Généré par scripts/import-cfee-papers.mjs : ne pas modifier à la main. Détail : docs/annales/README.md.

export const OFFICIAL_PAPERS_CFEE_CHECKED_ON = "${CHECKED_ON}";

export const OFFICIAL_PAPERS_CFEE: OfficialPaperData[] = [
${papers.map((p) => `  ${JSON.stringify(p)},`).join("\n")}
];
`,
  );
  const cell = (value) => `"${String(value ?? "").replace(/"/g, '""')}"`;
  writeFileSync(
    "docs/annales/cfee-2013-2026.csv",
    `﻿${[
      ["document", "statut", "année", "type", "matière", "partie", "fichier publié", "taille (Ko)", "raison de l’exclusion"].map(cell).join(";"),
      ...[...rows]
        .sort((a, b) => Number(a.id) - Number(b.id))
        .map((r) =>
          [r.slug, r.excluded ? "écarté" : "publié", r.year, r.kind, r.subjectLabel, r.part, r.name && `${r.name}.pdf`, r.fileKb, r.excluded].map(cell).join(";"),
        ),
    ].join("\n")}\n`,
  );
  const size = kept.reduce((sum, r) => sum + r.fileKb, 0);
  console.log(`${kept.length} documents gardés (${(size / 1024).toFixed(1)} Mo), ${rows.length - kept.length} écartés`);
  const byYear = {};
  for (const r of kept) byYear[r.year] = (byYear[r.year] ?? 0) + 1;
  console.log(byYear);
  for (const name of seen.keys()) if (seen.get(name) > 1) console.log(`plusieurs documents : ${name} (${seen.get(name)})`);
}

/** Envoie les PDF au seau public content-free, sans jamais écraser un fichier déjà en ligne. */
async function upload(dir) {
  const { createClient } = await import("@supabase/supabase-js");
  for (const line of readFileSync(".env.local", "utf8").split(/\r?\n/)) {
    const found = /^([A-Z0-9_]+)=(.*)$/.exec(line);
    if (found) process.env[found[1]] ??= found[2].replace(/^"|"$/g, "");
  }
  const secret = process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!secret) throw new Error("clé secrète absente de .env.local");
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, secret, { auth: { persistSession: false } });
  let sent = 0;
  let skipped = 0;
  for (const file of readdirSync(dir).filter((f) => f.endsWith(".pdf"))) {
    const { error } = await supabase.storage
      .from("content-free")
      .upload(`annales/cfee/${file}`, readFileSync(join(dir, file)), { contentType: "application/pdf", cacheControl: "31536000", upsert: false });
    if (!error) sent += 1;
    else if (/exists|Duplicate/i.test(error.message)) skipped += 1;
    else throw new Error(`${file} : ${error.message}`);
  }
  console.log(`${sent} fichiers envoyés, ${skipped} déjà en ligne`);
}

const args = process.argv.slice(2);
if (args[0] === "--upload") await upload(args[1]);
else if (args.length === 2) await prepare(args[0], args[1]);
else console.error("Usage : voir l'en-tête du script.");
