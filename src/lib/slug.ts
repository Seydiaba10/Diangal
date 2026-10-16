/** « Théorème de Thalès » → « theoreme-de-thales ». */
export function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Identifiant d'URL d'un programme : la matière, la classe et la série au lycée
 * (« mathematiques-ci », « francais-3e », « mathematiques-tle-s1 »).
 */
export function programSlug(subjectSlug: string, levelCode: string, seriesCode?: string | null): string {
  return `${subjectSlug}-${levelCode.toLowerCase()}${seriesCode ? `-${seriesCode.toLowerCase()}` : ""}`;
}
