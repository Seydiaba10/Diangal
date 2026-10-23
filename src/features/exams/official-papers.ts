import type { OfficialPaper } from "@/types/domain";

// Sujets et corrigés officiels du Bac (PDF de l'Office du Bac) : choix selon la série et rangement
// par session puis par matière. Fonctions pures, partagées par la démo et Supabase.

/** Page de l'Office du Bac qui publie les épreuves et corrigés. */
export const OFFICIAL_PAPERS_PAGE = "https://officedubac.sn/category/epreuves-corriges/";

/** Épreuves communes : langues vivantes (LV1, LV2) et documents dont la série n'est pas précisée. */
export function isCommonPaper(paper: Pick<OfficialPaper, "seriesLabel">): boolean {
  return paper.seriesLabel === null || paper.seriesLabel === "LV1" || paper.seriesLabel === "LV2";
}

/** Documents d'une série DIANGAL (S1, L2, G…) et épreuves communes ; sans série : aucun tri. */
export function officialPapersFor<T extends Pick<OfficialPaper, "seriesLabel" | "seriesCodes">>(papers: T[], series: string | null): T[] {
  if (!series) return papers;
  return papers.filter((p) => p.seriesCodes.includes(series) || isCommonPaper(p));
}

export interface OfficialPaperSubject {
  label: string;
  papers: OfficialPaper[];
}

export interface OfficialPaperSession {
  year: number;
  count: number;
  /** Épreuves de la série de l'élève. */
  subjects: OfficialPaperSubject[];
  /** Langues vivantes et épreuves sans série précisée (affichées repliées). */
  others: OfficialPaperSubject[];
  othersCount: number;
}

/** Dans une matière : 1er groupe d'abord, sujet normal avant remplacement, épreuve avant corrigé. */
const rank = (p: OfficialPaper) => (p.group ?? 1) * 4 + (p.replacement ? 2 : 0) + (p.kind === "corrige" ? 1 : 0);

function bySubject(papers: OfficialPaper[]): OfficialPaperSubject[] {
  const labels = [...new Set(papers.map((p) => p.subjectLabel))].sort((a, b) => a.localeCompare(b, "fr"));
  return labels.map((label) => ({
    label,
    papers: papers
      .filter((p) => p.subjectLabel === label)
      .sort((a, b) => rank(a) - rank(b) || (a.seriesLabel ?? "").localeCompare(b.seriesLabel ?? "")),
  }));
}

/**
 * Par session (la plus récente d'abord), puis par matière : les épreuves de la série d'abord,
 * les épreuves communes (langues, série non précisée) à part.
 */
export function groupOfficialPapers(papers: OfficialPaper[], series: string): OfficialPaperSession[] {
  const years = [...new Set(papers.map((p) => p.year))].sort((a, b) => b - a);
  return years.map((year) => {
    const ofYear = papers.filter((p) => p.year === year);
    const mine = ofYear.filter((p) => p.seriesCodes.includes(series));
    const others = ofYear.filter((p) => !p.seriesCodes.includes(series));
    return { year, count: ofYear.length, subjects: bySubject(mine), others: bySubject(others), othersCount: others.length };
  });
}
