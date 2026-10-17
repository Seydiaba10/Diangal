// Catalogue de 6e. Maths : programme officiel de 2006 (APAMS) ; histoire-géographie : programmes
// officiels mis en ligne par l’Office du Bac ; SVT : chapitres du relevé DIANGAL (titres de Sunudaara) ;
// français et anglais : chapitres indicatifs. Voir docs/programme/programme-college.md. Leçons rédigées
// par DIANGAL, à faire valider par des enseignants. Coefficients indicatifs (non affichés).

import { buildCatalog } from "./catalog-builder";
import { ANG_6E } from "./6e/anglais";
import { FR_6E } from "./6e/francais";
import { HG_6E } from "./6e/histoire-geographie";
import { MATH_6E } from "./6e/mathematiques";
import { SVT_6E } from "./6e/svt";

const catalog = buildCatalog("6E", [
  { code: "MATH", slug: "mathematiques", name: "Mathématiques", coefficient: 4, chapters: MATH_6E },
  { code: "FR", slug: "francais", name: "Français", coefficient: 4, chapters: FR_6E },
  { code: "ANG", slug: "anglais", name: "Anglais", coefficient: 2, chapters: ANG_6E },
  { code: "HG", slug: "histoire-geographie", name: "Histoire-Géographie", coefficient: 2, chapters: HG_6E },
  { code: "SVT", slug: "svt", name: "SVT", coefficient: 2, chapters: SVT_6E },
]);

export const SUBJECTS_6E = catalog.subjects;
export const CHAPTERS_6E = catalog.chapters;
/** Corps des leçons de 6e, par identifiant de leçon. */
export const LESSON_BODIES_6E = catalog.lessonBodies;
