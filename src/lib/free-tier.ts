// Offre gratuite : les premiers chapitres de chaque matière (leçons, exercices et contrôles du
// chapitre) sont ouverts à tous, le reste demande un abonnement. Même règle que
// private.sync_free_tier en base (programs.free_chapters, 3 par défaut).

export const DEFAULT_FREE_CHAPTERS = 3;

export function isFreeChapter(chapterNumber: number, freeChapters = DEFAULT_FREE_CHAPTERS): boolean {
  return chapterNumber <= freeChapters;
}
