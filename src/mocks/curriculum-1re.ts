// Catalogue de 1re, toutes séries (L1, L2, LA, S1 à S5, G, T1, T2). Maths : programmes officiels de 2006
// (APAMS, séries S, L, G et T) ;
// histoire-géographie : programmes officiels mis en ligne par l’Office du Bac ; sciences physiques et SVT :
// chapitres du relevé DIANGAL (titres de Sunudaara) ; français, anglais et matières propres aux séries LA, S3,
// S4, S5, G, T1 et T2 (arabe, économie, gestion, technologie…) : chapitres indicatifs. Voir
// docs/programme/programme-lycee.md. Une matière (programme) par série, comme en Terminale ; la
// philosophie ne commence qu’en Terminale. Leçons rédigées par DIANGAL, à faire valider par des
// enseignants. Coefficients indicatifs (non affichés).

import { buildCatalog, type ProgramSpec } from "./catalog-builder";
import { ANG_1RE } from "./1re/anglais";
import { FR_1RE } from "./1re/francais";
import { HG_1RE } from "./1re/histoire-geographie";
import { MATH_1RE_G, MATH_1RE_L, MATH_1RE_S1, MATH_1RE_S2, MATH_1RE_T } from "./1re/mathematiques";
import { PC_1RE_L, PC_1RE_S, PC_1RE_T } from "./1re/sciences-physiques";
import { SVT_1RE_L, SVT_1RE_S } from "./1re/svt";
import { AGRI_1RE } from "./lycee/agriculture";
import { AGRO_1RE } from "./lycee/agroalimentaire";
import { AR_1RE } from "./lycee/arabe";
import { CONST_1RE } from "./lycee/construction";
import { ECO_1RE } from "./lycee/economie";
import { ELEC_1RE } from "./lycee/electrotechnique";
import { TECH_1RE } from "./lycee/fabrication";
import { GEST_1RE } from "./lycee/gestion";

const program = (code: ProgramSpec["code"], slug: string, name: string, coefficient: number, chapters: ProgramSpec["chapters"]) =>
  ({ code, slug, name, coefficient, chapters }) satisfies ProgramSpec;

const math = (coefficient: number, chapters: ProgramSpec["chapters"]) => program("MATH", "mathematiques", "Mathématiques", coefficient, chapters);
const pc = (coefficient: number, chapters: ProgramSpec["chapters"]) => program("PC", "sciences-physiques", "Sciences physiques", coefficient, chapters);
const svt = (coefficient: number, chapters: ProgramSpec["chapters"]) => program("SVT", "svt", "SVT", coefficient, chapters);
const fr = (coefficient: number) => program("FR", "francais", "Français", coefficient, FR_1RE);
const hg = (coefficient: number) => program("HG", "histoire-geographie", "Histoire-Géographie", coefficient, HG_1RE);
const ang = (coefficient: number) => program("ANG", "anglais", "Anglais", coefficient, ANG_1RE);
const ar = (coefficient: number) => program("AR", "arabe", "Arabe", coefficient, AR_1RE);
const eco = (coefficient: number) => program("ECO", "economie", "Économie", coefficient, ECO_1RE);
const gest = (coefficient: number) => program("GEST", "gestion", "Techniques de gestion", coefficient, GEST_1RE);
const constr = (coefficient: number) => program("CONST", "construction-mecanique", "Construction mécanique", coefficient, CONST_1RE);
const tech = (coefficient: number) => program("TECH", "fabrication-automatismes", "Fabrication et automatismes", coefficient, TECH_1RE);
const elec = (coefficient: number) => program("ELEC", "electrotechnique", "Électrotechnique-électronique", coefficient, ELEC_1RE);
const agri = (coefficient: number) => program("AGRI", "sciences-agricoles", "Sciences agricoles", coefficient, AGRI_1RE);
const agro = (coefficient: number) => program("AGRO", "agroalimentaire", "Technologie agroalimentaire", coefficient, AGRO_1RE);

const catalogs = [
  buildCatalog("1RE", [math(5, MATH_1RE_S1), pc(5, PC_1RE_S), svt(2, SVT_1RE_S), fr(3), hg(2), ang(2)], "S1"),
  buildCatalog("1RE", [math(4, MATH_1RE_S2), pc(4, PC_1RE_S), svt(4, SVT_1RE_S), fr(3), hg(2), ang(2)], "S2"),
  buildCatalog("1RE", [fr(5), hg(3), ang(3), math(2, MATH_1RE_L)], "L1"),
  buildCatalog("1RE", [fr(5), hg(3), ang(3), math(2, MATH_1RE_L), pc(2, PC_1RE_L), svt(2, SVT_1RE_L)], "L2"),
  buildCatalog("1RE", [ar(8), fr(3), hg(4), ang(2), math(2, MATH_1RE_L)], "LA"),
  buildCatalog("1RE", [math(8, MATH_1RE_S1), pc(8, PC_1RE_S), constr(8), tech(5), fr(3), ang(2)], "S3"),
  buildCatalog("1RE", [math(5, MATH_1RE_S2), pc(5, PC_1RE_S), svt(5, SVT_1RE_S), agri(10), fr(3), hg(2), ang(2)], "S4"),
  buildCatalog("1RE", [math(5, MATH_1RE_S2), pc(5, PC_1RE_S), svt(5, SVT_1RE_S), agro(10), fr(3), hg(2), ang(2)], "S5"),
  buildCatalog("1RE", [eco(6), gest(10), math(5, MATH_1RE_G), fr(3), hg(2), ang(3)], "G"),
  buildCatalog("1RE", [constr(8), tech(12), math(5, MATH_1RE_T), pc(4, PC_1RE_T), fr(3), ang(2)], "T1"),
  buildCatalog("1RE", [elec(21), math(4, MATH_1RE_T), pc(2, PC_1RE_T), fr(3), ang(2)], "T2"),
];

export const SUBJECTS_1RE = catalogs.flatMap((catalog) => catalog.subjects);
export const CHAPTERS_1RE = catalogs.flatMap((catalog) => catalog.chapters);
/** Corps des leçons de 1re, par identifiant de leçon. */
export const LESSON_BODIES_1RE: Record<string, string> = Object.assign({}, ...catalogs.map((catalog) => catalog.lessonBodies));
