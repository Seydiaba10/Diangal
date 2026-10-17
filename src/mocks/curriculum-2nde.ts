// Catalogue de 2nde, séries S et L. Maths : programmes officiels de 2006 (APAMS) ; histoire-géographie :
// programmes officiels mis en ligne par l’Office du Bac ; sciences physiques et SVT : chapitres du relevé
// DIANGAL (titres de Sunudaara) ; français et anglais : chapitres indicatifs. Voir
// docs/programme/programme-lycee.md. Une matière (programme) par série, comme en Terminale. Leçons
// rédigées par DIANGAL, à faire valider par des enseignants. Coefficients indicatifs (non affichés).

import { buildCatalog, type ProgramSpec } from "./catalog-builder";
import { ANG_2NDE } from "./2nde/anglais";
import { FR_2NDE } from "./2nde/francais";
import { HG_2NDE } from "./2nde/histoire-geographie";
import { MATH_2NDE_L, MATH_2NDE_S } from "./2nde/mathematiques";
import { PC_2NDE_L, PC_2NDE_S } from "./2nde/sciences-physiques";
import { SVT_2NDE } from "./2nde/svt";

const program = (code: ProgramSpec["code"], slug: string, name: string, coefficient: number, chapters: ProgramSpec["chapters"]) =>
  ({ code, slug, name, coefficient, chapters }) satisfies ProgramSpec;

const S = buildCatalog("2NDE", [
  program("MATH", "mathematiques", "Mathématiques", 5, MATH_2NDE_S),
  program("PC", "sciences-physiques", "Sciences physiques", 4, PC_2NDE_S),
  program("SVT", "svt", "SVT", 2, SVT_2NDE),
  program("FR", "francais", "Français", 3, FR_2NDE),
  program("HG", "histoire-geographie", "Histoire-Géographie", 2, HG_2NDE),
  program("ANG", "anglais", "Anglais", 2, ANG_2NDE),
], "S");

const L = buildCatalog("2NDE", [
  program("FR", "francais", "Français", 5, FR_2NDE),
  program("HG", "histoire-geographie", "Histoire-Géographie", 3, HG_2NDE),
  program("ANG", "anglais", "Anglais", 3, ANG_2NDE),
  program("MATH", "mathematiques", "Mathématiques", 2, MATH_2NDE_L),
  program("PC", "sciences-physiques", "Sciences physiques", 2, PC_2NDE_L),
  program("SVT", "svt", "SVT", 2, SVT_2NDE),
], "L");

export const SUBJECTS_2NDE = [...S.subjects, ...L.subjects];
export const CHAPTERS_2NDE = [...S.chapters, ...L.chapters];
/** Corps des leçons de 2nde, par identifiant de leçon. */
export const LESSON_BODIES_2NDE = { ...S.lessonBodies, ...L.lessonBodies };
