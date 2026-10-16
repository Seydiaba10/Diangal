import { connection } from "next/server";
import { cache } from "react";
import { requireIdentity } from "@/features/account/session";
import { isSupabaseConfigured } from "@/lib/env";
import { isLevelCode, LEVEL_CODES, SERIES_BY_LEVEL, type LevelCode } from "@/lib/levels";
import { fetchLevelHistory } from "./supabase";

// Passage en classe supérieure : classe suivante, séries possibles et historique des classes.
// Même règle que promote_student en base (ordre des classes, série obligatoire au lycée).

export interface PromotionInfo {
  nextLevel: LevelCode | null;
  /** Séries possibles dans la classe suivante (vide avant la 2nde). */
  seriesOptions: readonly string[];
  /** Série proposée par défaut : l'actuelle si elle reste valable. */
  defaultSeries: string | null;
}

export function promotionInfo(levelCode: string, seriesCode: string | null): PromotionInfo {
  const index = isLevelCode(levelCode) ? LEVEL_CODES.indexOf(levelCode) : -1;
  const nextLevel = index >= 0 ? (LEVEL_CODES[index + 1] ?? null) : null;
  const seriesOptions = nextLevel ? (SERIES_BY_LEVEL[nextLevel] ?? []) : [];
  return {
    nextLevel,
    seriesOptions,
    defaultSeries: seriesCode && seriesOptions.includes(seriesCode) ? seriesCode : null,
  };
}

export interface LevelHistoryItem {
  levelCode: string;
  seriesCode: string | null;
  startedAt: string;
  endedAt: string;
}

/** Classes déjà quittées par l'élève (lui-même, ou l'enfant d'un parent), les plus récentes d'abord. */
export const getLevelHistory = cache(async (studentId?: string): Promise<LevelHistoryItem[]> => {
  await connection();
  if (!isSupabaseConfigured()) return [];
  return fetchLevelHistory(studentId ?? (await requireIdentity()).userId);
});
