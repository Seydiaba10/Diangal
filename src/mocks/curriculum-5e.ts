// Catalogue de 5e. Maths : guide pédagogique de 5e (APAMS) et relevé DIANGAL ; histoire-géographie :
// programmes officiels mis en ligne par l’Office du Bac ; SVT : chapitres du relevé DIANGAL (titres de
// Sunudaara) ; français et anglais : chapitres indicatifs. Voir docs/programme/programme-college.md.
// Leçons rédigées par DIANGAL, à faire valider par des enseignants. Coefficients indicatifs (non affichés).

import { buildCatalog } from "./catalog-builder";
import { ANG_5E } from "./5e/anglais";
import { FR_5E } from "./5e/francais";
import { HG_5E } from "./5e/histoire-geographie";
import { MATH_5E } from "./5e/mathematiques";
import { SVT_5E } from "./5e/svt";

const catalog = buildCatalog("5E", [
  { code: "MATH", slug: "mathematiques", name: "Mathématiques", coefficient: 4, chapters: MATH_5E },
  { code: "FR", slug: "francais", name: "Français", coefficient: 4, chapters: FR_5E },
  { code: "ANG", slug: "anglais", name: "Anglais", coefficient: 2, chapters: ANG_5E },
  { code: "HG", slug: "histoire-geographie", name: "Histoire-Géographie", coefficient: 2, chapters: HG_5E },
  { code: "SVT", slug: "svt", name: "SVT", coefficient: 2, chapters: SVT_5E },
]);

export const SUBJECTS_5E = catalog.subjects;
export const CHAPTERS_5E = catalog.chapters;
/** Corps des leçons de 5e, par identifiant de leçon. */
export const LESSON_BODIES_5E = catalog.lessonBodies;
