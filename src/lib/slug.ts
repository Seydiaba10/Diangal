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
 * Identifiant d'URL d'un programme : la matière suivie de la classe (« mathematiques-ci »,
 * « francais-3e »). Une même matière existe dans plusieurs classes, chacune avec ses chapitres.
 */
export function programSlug(subjectSlug: string, levelCode: string): string {
  return `${subjectSlug}-${levelCode.toLowerCase()}`;
}
