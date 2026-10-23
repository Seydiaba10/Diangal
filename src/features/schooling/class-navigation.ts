import { isLevelCode, LEVEL_CODES, SERIES_BY_LEVEL, type LevelCode } from "@/lib/levels";

// Navigation entre les classes : l'élève parcourt sa classe actuelle et les classes précédentes
// (révisions), sans jamais changer sa classe. Le choix vit dans l'URL (?classe=3E&serie=S),
// la progression reste attachée aux leçons : rien n'est copié ni perdu.

export interface BrowsedClass {
  levelCode: LevelCode;
  seriesCode: string | null;
  /** Classe actuelle de l'élève (sinon : une classe précédente, en révision). */
  isCurrent: boolean;
}

/** Classes que l'élève peut ouvrir : la sienne puis les précédentes, de la plus récente à la plus ancienne. */
export function browsableLevels(current: string): LevelCode[] {
  if (!isLevelCode(current)) return [];
  return LEVEL_CODES.slice(0, LEVEL_CODES.indexOf(current) + 1).reverse();
}

/** Série littéraire (L…) ou scientifique et technique (le reste) : sert à revoir la 2nde. */
function secondSeries(series: string | null): string {
  return series?.startsWith("L") ? "L" : "S";
}

/**
 * Série proposée pour revoir une classe : celle que l'élève y avait (historique), sinon la plus
 * proche de sa série actuelle (S2 en Terminale → S2 en 1re, S en 2nde). Null avant le lycée.
 */
export function seriesForLevel(
  level: LevelCode,
  current: { levelCode: string; seriesCode: string | null },
  history: readonly { levelCode: string; seriesCode: string | null }[] = [],
): string | null {
  const options = SERIES_BY_LEVEL[level];
  if (!options) return null;
  if (level === current.levelCode && current.seriesCode && options.includes(current.seriesCode)) return current.seriesCode;
  const past = history.find((h) => h.levelCode === level && h.seriesCode && options.includes(h.seriesCode));
  if (past) return past.seriesCode;
  if (current.seriesCode && options.includes(current.seriesCode)) return current.seriesCode;
  return level === "2NDE" ? secondSeries(current.seriesCode) : options[0]!;
}

/**
 * Lecture de ?classe= et ?serie= : une classe précédente ou actuelle, avec une série valable.
 * Une classe inconnue ou supérieure ramène à la classe actuelle (sa série ne se change pas ici).
 */
export function resolveBrowsedClass(
  params: { classe?: string | string[]; serie?: string | string[] },
  current: { levelCode: string; seriesCode: string | null },
  history: readonly { levelCode: string; seriesCode: string | null }[] = [],
): BrowsedClass {
  const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v)?.toUpperCase();
  const wanted = first(params.classe);
  const levels = browsableLevels(current.levelCode);
  const level = levels.find((l) => l === wanted);
  if (!level || level === current.levelCode) {
    return { levelCode: (levels[0] ?? "3E") as LevelCode, seriesCode: current.seriesCode, isCurrent: true };
  }
  const wantedSeries = first(params.serie);
  const options = SERIES_BY_LEVEL[level];
  const seriesCode = options && wantedSeries && options.includes(wantedSeries) ? wantedSeries : seriesForLevel(level, current, history);
  return { levelCode: level, seriesCode, isCurrent: false };
}

/** Paramètres d'URL d'une classe parcourue (vides pour la classe actuelle). */
export function classQuery(browsed: Pick<BrowsedClass, "levelCode" | "seriesCode" | "isCurrent">): Record<string, string> {
  if (browsed.isCurrent) return {};
  return { classe: browsed.levelCode, ...(browsed.seriesCode ? { serie: browsed.seriesCode } : {}) };
}

/** Liste des matières de la classe d'une matière (fil d'Ariane des cours) : la bonne classe reste ouverte. */
export function coursesHrefFor(subject: { levelCode: string; seriesCode?: string | null }): string {
  const query = new URLSearchParams({ classe: subject.levelCode, ...(subject.seriesCode ? { serie: subject.seriesCode } : {}) });
  return `/eleve/cours?${query}`;
}
