import { describe, expect, it } from "vitest";
import { groupOfficialPapers, isCommonPaper, officialPapersFor } from "@/features/exams/official-papers";
import { OFFICIAL_PAPERS } from "@/mocks/official-papers";
import { OFFICIAL_PAPERS_CFEE } from "@/mocks/official-papers-cfee";
import type { OfficialPaper } from "@/types/domain";

const papers: OfficialPaper[] = OFFICIAL_PAPERS.map((p, i) => ({ ...p, id: String(i) }));
const cfee: OfficialPaper[] = OFFICIAL_PAPERS_CFEE.map((p, i) => ({ ...p, id: `c${i}` }));

describe("sujets et corrigés officiels du CFEE", () => {
  it("ne servent que des PDF du Storage, sans doublon, avec leur provenance et leur taille", () => {
    expect(cfee.length).toBeGreaterThan(0);
    expect(cfee.every((p) => /^https:\/\/[a-z0-9]+\.supabase\.co\/storage\/v1\/object\/public\/content-free\/annales\/cfee\/[a-z0-9-]+\.pdf$/.test(p.url))).toBe(true);
    expect(new Set(cfee.map((p) => p.url)).size).toBe(cfee.length);
    expect(cfee.every((p) => p.sourcePage.startsWith("https://epreuvesetcorriges.com/"))).toBe(true);
    expect(cfee.every((p) => p.sourceName && p.fileKb && p.fileKb > 0 && p.seriesLabel && p.seriesLabel.length <= 40)).toBe(true);
  });

  it("écartent les documents refusés au contrôle", () => {
    // Avant 2013 : recopiés, sans marque officielle.
    expect(Math.min(...cfee.map((p) => p.year))).toBe(2013);
    // Les fichiers titrés « CFEE 2026 » sont des copies de 2025 : en 2026, seuls des corrigés et l'examen blanc.
    expect(cfee.filter((p) => p.year === 2026 && p.kind === "epreuve" && !p.subjectLabel.startsWith("Examen blanc"))).toEqual([]);
    // Les « corrections 2024 » ne sont pas officielles (cahier photographié, texte sans rapport).
    expect(cfee.filter((p) => p.year === 2024 && p.kind === "corrige")).toEqual([]);
  });

  it("rangent par session : les vrais sujets, puis les examens blancs ; chaque partie suivie de son corrigé", () => {
    const sessions = groupOfficialPapers(cfee, null);
    const years = sessions.map((s) => s.year);
    expect(years).toEqual([...years].sort((a, b) => b - a));
    expect(sessions.reduce((n, s) => n + s.count, 0)).toBe(cfee.length);
    for (const session of sessions) {
      expect(session.othersCount).toBe(0);
      const labels = session.subjects.map((s) => s.label.startsWith("Examen blanc"));
      expect(labels).toEqual([...labels].sort((a, b) => Number(a) - Number(b)));
      for (const subject of session.subjects) {
        const parts = subject.papers.map((p) => p.seriesLabel ?? "");
        expect(parts).toEqual([...parts].sort((a, b) => a.localeCompare(b)));
      }
    }
  });
});

describe("sujets et corrigés officiels du Bac", () => {
  it("ne garde que des PDF du site de l'Office du Bac, sans doublon", () => {
    expect(papers.length).toBeGreaterThan(0);
    expect(papers.every((p) => /^https:\/\/officedubac\.sn\/wp-content\/uploads\/.+\.pdf$/i.test(p.url))).toBe(true);
    expect(new Set(papers.map((p) => p.url)).size).toBe(papers.length);
    expect(papers.every((p) => p.sourcePage.startsWith("https://officedubac.sn/"))).toBe(true);
  });

  it("montre à un élève de S1 ses épreuves, celles de toutes les séries S et les langues, jamais celles de L", () => {
    const s1 = officialPapersFor(papers, "S1");
    expect(s1.length).toBeGreaterThan(0);
    expect(s1.every((p) => p.seriesCodes.includes("S1") || isCommonPaper(p))).toBe(true);
    expect(s1.some((p) => p.seriesLabel === "S" && p.subjectCode === "PHILO")).toBe(true);
    expect(s1.some((p) => p.seriesLabel === "S1" && p.subjectCode === "MATH")).toBe(true);
    expect(s1.some((p) => p.seriesLabel === "L")).toBe(false);
    expect(officialPapersFor(papers, null)).toHaveLength(papers.length);
  });

  it("range par session (la plus récente d'abord), la série d'abord, les épreuves communes à part", () => {
    const sessions = groupOfficialPapers(officialPapersFor(papers, "S2"), "S2");
    const years = sessions.map((s) => s.year);
    expect(years).toEqual([...years].sort((a, b) => b - a));
    for (const session of sessions) {
      const mine = session.subjects.reduce((n, s) => n + s.papers.length, 0);
      expect(mine + session.othersCount).toBe(session.count);
      expect(session.subjects.every((s) => s.papers.every((p) => p.seriesCodes.includes("S2")))).toBe(true);
      expect(session.others.every((s) => s.papers.every((p) => isCommonPaper(p)))).toBe(true);
      // Dans une matière : 1er groupe avant 2e, sujet normal avant remplacement, épreuve avant corrigé.
      const rank = (p: OfficialPaper) => (p.group ?? 1) * 4 + (p.replacement ? 2 : 0) + (p.kind === "corrige" ? 1 : 0);
      for (const subject of [...session.subjects, ...session.others]) {
        const ranks = subject.papers.map(rank);
        expect(ranks).toEqual([...ranks].sort((a, b) => a - b));
      }
    }
  });
});
