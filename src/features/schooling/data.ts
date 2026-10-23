import { connection } from "next/server";
import { cache } from "react";
import { getCurrentStudent } from "@/features/account/data";
import { requireIdentity } from "@/features/account/session";
import { getSubjectsProgress } from "@/features/curriculum/data";
import { isSupabaseConfigured } from "@/lib/env";
import { isLevelCode, LEVEL_CODES, SERIES_BY_LEVEL, type LevelCode } from "@/lib/levels";
import { mockState } from "@/mocks/progress-store";
import { browsableLevels, resolveBrowsedClass, seriesForLevel, type BrowsedClass } from "./class-navigation";
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
  if (!isSupabaseConfigured()) return [...mockState.levelHistory].reverse();
  return fetchLevelHistory(studentId ?? (await requireIdentity()).userId);
});

export interface ClassOption extends BrowsedClass {
  chaptersCompleted: number;
  chaptersTotal: number;
}

/**
 * Classes que l'élève connecté peut parcourir (la sienne puis les précédentes), chacune avec sa
 * progression : chapitres terminés sur le total, d'après les leçons terminées (rien n'est recopié).
 */
export const getClassOptions = cache(async (): Promise<ClassOption[]> => {
  const [student, history] = await Promise.all([getCurrentStudent(), getLevelHistory()]);
  return Promise.all(
    browsableLevels(student.levelCode).map(async (levelCode) => {
      const isCurrent = levelCode === student.levelCode;
      const seriesCode = isCurrent ? student.seriesCode : seriesForLevel(levelCode, student, history);
      const subjects = await getSubjectsProgress(levelCode, undefined, seriesCode);
      return {
        levelCode,
        seriesCode,
        isCurrent,
        chaptersCompleted: subjects.reduce((sum, s) => sum + s.chaptersCompleted, 0),
        chaptersTotal: subjects.reduce((sum, s) => sum + s.chaptersTotal, 0),
      };
    }),
  );
});

/** Classe ouverte par l'élève connecté d'après l'URL (?classe=&serie=), sa classe actuelle par défaut. */
export async function getBrowsedClass(params: { classe?: string | string[]; serie?: string | string[] }): Promise<BrowsedClass> {
  const [student, history] = await Promise.all([getCurrentStudent(), getLevelHistory()]);
  return resolveBrowsedClass(params, student, history);
}
