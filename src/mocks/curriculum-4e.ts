// Catalogue de 4e. Maths : programme officiel de 2006 (APAMS) ; histoire-géographie : programmes
// officiels mis en ligne par l’Office du Bac ; SVT et sciences physiques : chapitres du relevé DIANGAL
// (titres de Sunudaara) ; français et anglais : chapitres indicatifs. Voir
// docs/programme/programme-college.md. Leçons rédigées par DIANGAL, à faire valider par des enseignants.
// Coefficients indicatifs (non affichés).

import { buildCatalog } from "./catalog-builder";
import { ANG_4E } from "./4e/anglais";
import { FR_4E } from "./4e/francais";
import { HG_4E } from "./4e/histoire-geographie";
import { MATH_4E } from "./4e/mathematiques";
import { PC_4E } from "./4e/sciences-physiques";
import { SVT_4E } from "./4e/svt";

const catalog = buildCatalog("4E", [
  { code: "MATH", slug: "mathematiques", name: "Mathématiques", coefficient: 4, chapters: MATH_4E },
  { code: "FR", slug: "francais", name: "Français", coefficient: 4, chapters: FR_4E },
  { code: "ANG", slug: "anglais", name: "Anglais", coefficient: 2, chapters: ANG_4E },
  { code: "HG", slug: "histoire-geographie", name: "Histoire-Géographie", coefficient: 2, chapters: HG_4E },
  { code: "SVT", slug: "svt", name: "SVT", coefficient: 2, chapters: SVT_4E },
  { code: "PC", slug: "sciences-physiques", name: "Sciences physiques", coefficient: 2, chapters: PC_4E },
]);

export const SUBJECTS_4E = catalog.subjects;
export const CHAPTERS_4E = catalog.chapters;
/** Corps des leçons de 4e, par identifiant de leçon. */
export const LESSON_BODIES_4E = catalog.lessonBodies;
