// Relevé des sujets et corrigés officiels du Bac publiés par l'Office du Bac (officedubac.sn) :
// lit les pages de chaque session, classe chaque PDF d'après le libellé de son lien
// (« Epr-Maths-S1-2ndGr », « Corr-Philo-L-Remp-1erGr »…), écarte les liens morts, puis écrit
// src/mocks/official-papers.ts (lancer ensuite `pnpm db:seed`). DIANGAL ne garde que les liens.
// Usage : node scripts/import-official-papers.mjs
// Nouvelle session : ajouter sa page (épreuves, corrigés) à PAGES.
import { writeFileSync } from "node:fs";

const PAGES = [
  ["https://officedubac.sn/2026/06/30/epreuves-bac-gen-2026/", 2026, "epreuve"],
  ["https://officedubac.sn/2026/06/30/corriges-bac-gen-2026/", 2026, "corrige"],
  ["https://officedubac.sn/2026/06/15/corriges-bac-tech-2026/", 2026, "corrige"],
  ["https://officedubac.sn/2025/06/16/epreuves-2025/", 2025, "epreuve"],
  ["https://officedubac.sn/2025/06/16/corriges-2025/", 2025, "corrige"],
  ["https://officedubac.sn/2024/07/01/420/", 2024, null],
  ["https://officedubac.sn/2025/02/27/1251/", 2023, null],
];
// Liens présents sur toutes les pages (programmes de Terminale, dépliant) : ce ne sont pas des sujets.
const MENU_PAGE = "https://officedubac.sn/2025/02/27/2020/";
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) DIANGAL-annales";
const OUT = "src/mocks/official-papers.ts";

// Matières : motif (libellé normalisé) → [code DIANGAL ou null, libellé affiché]. Le premier qui correspond gagne.
const SUBJECTS = [
  [/philo/, "PHILO", "Philosophie"],
  [/labo-?c?h?imie|\bchimie|labocimie/, "PC", "Chimie"],
  [/cons-?meca|\bcmc\b|\bcms\b|construction/, "CONST", "Construction mécanique"],
  [/geni-?meca/, "TECH", "Génie mécanique"],
  [/metal+urgie/, "TECH", "Métallurgie"],
  [/af-?tg|tg-?auto|shema|automat|analyse/, "TECH", "Technologie et automatismes"],
  [/\bc?meca\b|\bmec\b/, "TECH", "Mécanique"],
  [/\base\b/, "ELEC", "ASE (électrotechnique)"],
  [/\bgcf\b/, "GEST", "Gestion comptable et financière"],
  [/geni-?elec|electrotec/, "ELEC", "Électrotechnique"],
  [/phito|phyto/, "AGRI", "Phytotechnie"],
  [/\btech?n?\b|technolog/, "TECH", "Technologie"],
  [/math/, "MATH", "Mathématiques"],
  [/scph|sc-?phy|sciences?-phys|physique|\bpc\b/, "PC", "Sciences physiques"],
  [/svt|sc-?vie|sciences-de-la-vie/, "SVT", "SVT"],
  [/\bhg\b|h-g|hist|geo/, "HG", "Histoire-géographie"],
  [/lla\b|langue-et-litt/, "AR", "Langue et littérature arabes"],
  [/etud-?islam|etudes-islam/, "ER", "Études islamiques"],
  [/\bciv/, null, "Civilisation"],
  [/\beco\b|econom/, "ECO", "Économie"],
  [/droit/, null, "Droit"],
  [/mang|manag/, "GEST", "Management des organisations"],
  [/infor/, "GEST", "Informatique de gestion"],
  [/compta|gestion|tqg|techniques-quant/, "GEST", "Gestion"],
  [/\bfr\b|\bfran\b|franc|resume/, "FR", "Français"],
  [/\bang|angl|anglais|angalais/, "ANG", "Anglais"],
  [/\besp|espa|espe/, "LV2", "Espagnol"],
  [/\ball\b|allem/, "LV2", "Allemand"],
  [/\bar\b|arab|\bara\b/, "AR", "Arabe"],
  [/\bport|portug/, "LV2", "Portugais"],
  [/\bit\b|ital/, "LV2", "Italien"],
  [/\bru\b|russ/, "LV2", "Russe"],
  [/grec/, null, "Grec"],
  [/latin/, null, "Latin"],
  [/construction|const\b|\bcm\b/, "CONST", "Construction mécanique"],
  [/fabric|\bfab\b/, "TECH", "Fabrication mécanique"],
  [/electro|electr|elec\b/, "ELEC", "Électrotechnique"],
  [/agri|agro/, "AGRI", "Sciences agricoles"],
  [/\beps\b/, "EPS", "EPS"],
];

// Séries de l'Office du Bac → séries DIANGAL, seulement quand la correspondance est sûre.
// Les séries absentes de DIANGAL (S1A, S2A, L-AR, L1a, F6, STIDD) gardent leur libellé, sans correspondance.
const SERIES = [
  [/s1-?s3|s1s3/, "S1-S3", ["S1", "S3"]],
  [/s1-?s2|s1s2/, "S1-S2", ["S1", "S2"]],
  [/s4-?s5|s4s5/, "S4-S5", ["S4", "S5"]],
  [/s1a-?s2a|s1as2a/, "S1A-S2A", []],
  [/\bs1a\b/, "S1A", []],
  [/\bs2a\b/, "S2A", []],
  [/\bs1\b/, "S1", ["S1"]],
  [/\bs2\b/, "S2", ["S2"]],
  [/\bs3\b/, "S3", ["S3"]],
  [/\bs4\b/, "S4", ["S4"]],
  [/\bs5\b/, "S5", ["S5"]],
  [/l-?ar\b/, "L-AR", []],
  [/\bl1a\b/, "L1a", []],
  [/\bl1b\b/, "L1b", []],
  [/\bl1\b/, "L1", ["L1"]],
  [/\bl2\b/, "L2", ["L2"]],
  [/\bla\b/, "LA", ["LA"]],
  [/steg/, "STEG", ["G"]],
  [/\bt1\b/, "T1", ["T1"]],
  [/\bt2\b/, "T2", ["T2"]],
  [/\bf6\b/, "F6", []],
  [/stidd/, "STIDD", []],
  [/\bt\b/, "T", ["T1", "T2"]],
  [/\bs\b/, "S", ["S1", "S2", "S3", "S4", "S5"]],
  [/\bl\b/, "L", ["L1", "L2"]],
  [/lv1|\blvi\b/, "LV1", []],
  [/lv2|lvii|lv-?2/, "LV2", []],
];

const decode = (s) =>
  s
    .replace(/&#0?38;|&amp;/g, "&")
    .replace(/&#8211;|&#8212;/g, "-")
    .replace(/&#8217;|&rsquo;/g, "’")
    .replace(/&nbsp;|&#160;/g, " ")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));
const get = async (url) => {
  const res = await fetch(url, { headers: { "User-Agent": UA }, signal: AbortSignal.timeout(60_000) });
  if (!res.ok) throw new Error(`${url} : HTTP ${res.status}`);
  return res.text();
};

const menu = new Set((await get(MENU_PAGE)).match(/https?:\/\/[^"' <>]+?\.pdf/gi) ?? []);
const papers = [];
const seen = new Set();
for (const [page, year, pageKind] of PAGES) {
  const html = await get(page);
  for (const m of html.matchAll(/<a[^>]+href="(https?:\/\/[^"]+?\.pdf)"[^>]*>([\s\S]*?)<\/a>/gi)) {
    const url = m[1].replace(/^http:/, "https:");
    if (menu.has(m[1]) || seen.has(url)) continue;
    seen.add(url);
    const label = decode(m[2].replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
    const fileName = decodeURIComponent(url.split("/").pop());
    const text = ` ${(label || fileName).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[_.]/g, "-")} `;
    const withFile = `${text} ${fileName.toLowerCase().replace(/[_.]/g, "-")} `;
    const kind =
      /^\s*(corr|c-|canevas|bareme|vf-corr|grille)/.test(text) || /corr|canevas|bareme|grille/.test(withFile) || pageKind === "corrige"
        ? "corrige"
        : "epreuve";
    const group = /2n?d-?gr|2e-?gr|2eme|2e-?tour|second|2-?gr|2e-?ge/.test(withFile) ? 2 : /1er|1ee|premier|1-?gr/.test(withFile) ? 1 : null;
    const subject = SUBJECTS.find(([re]) => re.test(text)) ?? SUBJECTS.find(([re]) => re.test(withFile));
    // Séries cherchées sans les mots de type et de matière (« fr », « ar »… ne sont pas des séries).
    const seriesText = text.replace(/\b(philo|maths?|scph|svt|hg|epr|epreuve|corr|corrige|remp|rempl|gr|ndgr|ergr)\b/g, " ");
    const series = SERIES.find(([re]) => re.test(seriesText));
    papers.push({
      year,
      kind,
      group,
      replacement: /remp/.test(withFile),
      subjectCode: subject?.[1] ?? null,
      subjectLabel:
        subject?.[2] ??
        ((label || fileName).replace(/^(epreuve|corrige|correction|corr|epr|epc|grille)[-_ ]*/i, "").replace(/[-_ ]*(1er|2n?d|2e)[-_ ]*gr.*$/i, "").trim() ||
          "Autre épreuve"),
      seriesLabel: series?.[1] ?? null,
      seriesCodes: series?.[2] ?? [],
      title: label || fileName.replace(/\.pdf$/i, ""),
      url,
      sourcePage: page,
    });
  }
}

// Liens morts écartés : seuls les PDF réellement disponibles sont proposés.
const alive = [];
const queue = [...papers];
await Promise.all(
  Array.from({ length: 6 }, async () => {
    while (queue.length) {
      const paper = queue.shift();
      const res = await fetch(paper.url, { method: "HEAD", headers: { "User-Agent": UA }, signal: AbortSignal.timeout(60_000) }).catch(() => null);
      if (res?.ok && (res.headers.get("content-type") ?? "").includes("pdf")) alive.push(paper);
      else console.warn("lien écarté :", paper.title, res?.status ?? "injoignable");
    }
  }),
);
const ordered = papers.filter((p) => alive.includes(p));

const checkedOn = new Date().toISOString().slice(0, 10);
writeFileSync(
  OUT,
  `import type { OfficialPaperData } from "@/types/domain";

// Sujets et corrigés officiels du Bac publiés par l'Office du Bac (https://officedubac.sn/category/epreuves-corriges/),
// relevés le ${checkedOn.split("-").reverse().join("/")} : ${ordered.length} documents. DIANGAL n'en garde que les liens (aucune copie).
// Matière et série déduites du libellé de chaque lien ; les séries absentes de DIANGAL (S1A, L-AR, F6, STIDD…)
// gardent leur libellé, sans correspondance. Généré par scripts/import-official-papers.mjs : ne pas modifier à la main.

export const OFFICIAL_PAPERS_CHECKED_ON = "${checkedOn}";

export const OFFICIAL_PAPERS: OfficialPaperData[] = [
${ordered.map((p) => `  ${JSON.stringify(p)},`).join("\n")}
];
`,
);
console.log(`${ordered.length} documents (${papers.length - ordered.length} liens morts écartés) → ${OUT}`);
