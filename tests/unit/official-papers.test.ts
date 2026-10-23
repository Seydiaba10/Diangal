import { describe, expect, it } from "vitest";
import { groupOfficialPapers, isCommonPaper, officialPapersFor } from "@/features/exams/official-papers";
import { OFFICIAL_PAPERS } from "@/mocks/official-papers";
import type { OfficialPaper } from "@/types/domain";

const papers: OfficialPaper[] = OFFICIAL_PAPERS.map((p, i) => ({ ...p, id: String(i) }));

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
