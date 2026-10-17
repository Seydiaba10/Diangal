// Catalogue complet de démonstration : toutes les classes dont le programme est publié.
// Le seed (scripts/generate-seed.ts) en est tiré : démo et base partent du même contenu.

import { isFreeChapter } from "@/lib/free-tier";
import type { Chapter, ContentSource, Subject, SubjectCode } from "@/types/domain";
import { CHAPTERS_1RE, LESSON_BODIES_1RE, SUBJECTS_1RE } from "./curriculum-1re";
import { CHAPTERS_2NDE, LESSON_BODIES_2NDE, SUBJECTS_2NDE } from "./curriculum-2nde";
import { CHAPTERS_3E, LESSON_BODIES_3E, SUBJECTS_3E } from "./curriculum-3e";
import { CHAPTERS_4E, LESSON_BODIES_4E, SUBJECTS_4E } from "./curriculum-4e";
import { CHAPTERS_5E, LESSON_BODIES_5E, SUBJECTS_5E } from "./curriculum-5e";
import { CHAPTERS_6E, LESSON_BODIES_6E, SUBJECTS_6E } from "./curriculum-6e";
import { CHAPTERS_CE1, LESSON_BODIES_CE1, SUBJECTS_CE1 } from "./curriculum-ce1";
import { CHAPTERS_CE2, LESSON_BODIES_CE2, SUBJECTS_CE2 } from "./curriculum-ce2";
import { CHAPTERS_CI, LESSON_BODIES_CI, SUBJECTS_CI } from "./curriculum-ci";
import { CHAPTERS_CM1, LESSON_BODIES_CM1, SUBJECTS_CM1 } from "./curriculum-cm1";
import { CHAPTERS_CM2, LESSON_BODIES_CM2, SUBJECTS_CM2 } from "./curriculum-cm2";
import { CHAPTERS_CP, LESSON_BODIES_CP, SUBJECTS_CP } from "./curriculum-cp";
import { CHAPTERS_TLE, LESSON_BODIES_TLE, SUBJECTS_TLE } from "./curriculum-tle";

/** Classes publiées, dans l'ordre de la scolarité. */
export const PUBLISHED_LEVELS = ["CI", "CP", "CE1", "CE2", "CM1", "CM2", "6E", "5E", "4E", "3E", "2NDE", "1RE", "TLE"] as const;

export const CATALOG_SUBJECTS: Subject[] = [...SUBJECTS_CI, ...SUBJECTS_CP, ...SUBJECTS_CE1, ...SUBJECTS_CE2, ...SUBJECTS_CM1, ...SUBJECTS_CM2, ...SUBJECTS_6E, ...SUBJECTS_5E, ...SUBJECTS_4E, ...SUBJECTS_3E, ...SUBJECTS_2NDE, ...SUBJECTS_1RE, ...SUBJECTS_TLE];
/** Offre gratuite appliquée : les leçons des premiers chapitres de chaque matière sont ouvertes à tous. */
export const CATALOG_CHAPTERS: Chapter[] = [...CHAPTERS_CI, ...CHAPTERS_CP, ...CHAPTERS_CE1, ...CHAPTERS_CE2, ...CHAPTERS_CM1, ...CHAPTERS_CM2, ...CHAPTERS_6E, ...CHAPTERS_5E, ...CHAPTERS_4E, ...CHAPTERS_3E, ...CHAPTERS_2NDE, ...CHAPTERS_1RE, ...CHAPTERS_TLE].map((chapter) => ({
  ...chapter,
  lessons: chapter.lessons.map((lesson) => ({ ...lesson, isPremium: !isFreeChapter(chapter.number) })),
}));
/** Leçons rédigées (les autres affichent le gabarit « contenu à venir »). */
export const CATALOG_LESSON_BODIES: Record<string, string> = { ...LESSON_BODIES_CI, ...LESSON_BODIES_CP, ...LESSON_BODIES_CE1, ...LESSON_BODIES_CE2, ...LESSON_BODIES_CM1, ...LESSON_BODIES_CM2, ...LESSON_BODIES_6E, ...LESSON_BODIES_5E, ...LESSON_BODIES_4E, ...LESSON_BODIES_3E, ...LESSON_BODIES_2NDE, ...LESSON_BODIES_1RE, ...LESSON_BODIES_TLE };

const CEB_STAGE_1: ContentSource = {
  title: "Guide pédagogique, enseignement élémentaire, 1re étape CI-CP (Curriculum de l’Éducation de Base, MEN)",
  url: "https://www.apams.gouv.sn/sites/default/files/GUIDE%20PEDAGOGIQUE%20ETAPE%201.pdf",
  kind: "official",
};
const CEB_LANGUAGE_1: ContentSource = {
  title: "Curriculum de l’Éducation de Base, Langue et communication, étape 1, 2e version (MEN, avril 2014)",
  url: "http://svtdakar.e-monsite.com/medias/files/1.-langue-et-communication-1-efa.pdf",
  kind: "official",
};
const SURVEY_3E: ContentSource = {
  title: "Relevé DIANGAL du programme de 3e (PROMET, titres de chapitres de Sunudaara)",
  kind: "external",
};
const LESSONS_BY_DIANGAL: ContentSource = { title: "Leçons rédigées par DIANGAL, à faire relire par un enseignant", kind: "diangal" };

// Élémentaire : cahiers d’exercices de mathématiques PAAME (MEN, 2024) ; CE1-CE2 : guide officiel de l’étape 2.
const CEB_STAGE_2: ContentSource = {
  title: "Guide pédagogique, enseignement élémentaire, 2e étape CE1-CE2 (Curriculum de l’Éducation de Base, MEN)",
  url: "https://www.apams.gouv.sn/sites/default/files/GUIDE%20PEDAGOGIQUE%20ETAPE%202.pdf",
  kind: "official",
};
const paame = (level: string): ContentSource => ({
  title: `Cahier d’exercices de mathématiques ${level}, PAAME (MEN, édition 2024, conforme au CEB)`,
  url: "https://senprof.education.sn/PAAME/",
  kind: "official",
});

// CM2 (étape 3 du CEB) : guide officiel du CFEE, cahiers PAAME du MEN (maths), leçons PROMET.
const CFEE_GUIDE: ContentSource = {
  title: "Guide du CFEE (Ministère de l’Éducation nationale) : domaines et sous-domaines évalués",
  url: "https://editsoftsenegal.com/download/guide-du-cfee.pdf",
  kind: "official",
};
const PROMET_CM2: ContentSource = {
  title: "Leçons de CM2 de PROMET, plateforme du Ministère de l’Éducation nationale",
  url: "https://apprendre.education.sn/accueil/9",
  kind: "official",
};
const STAGE_3_INDICATIVE: ContentSource = {
  title: "Chapitres indicatifs : programme officiel détaillé de l’étape 3 non trouvé (à valider)",
  kind: "diangal",
};

// Programmes de Terminale mis en ligne par l'Office du Bac (janvier 2026).
const BAC = "https://officedubac.sn/wp-content/uploads/2026/01/";
const official = (title: string, file: string): ContentSource => ({ title, url: `${BAC}${file}`, kind: "official" });
const TLE_SOURCES: Partial<Record<SubjectCode, ContentSource[]>> = {
  MATH: [official("Programmes de mathématiques, Terminales L, S1-S3 et S2-S4 (MEN, 2006), Office du Bac", "Programme_Maths-LS.pdf")],
  PC: [official("Programmes de sciences physiques, Terminales S1-S2 et L2 (MEN, août 2008), Office du Bac", "Programme_Sciences-Physiques_Tle_LS.pdf")],
  SVT: [official("Programmes de SVT, Terminales L2, S1 et S2, Office du Bac", "Programmes_SVT_Tles_LS.pdf")],
  PHILO: [official("Programme de philosophie des classes de Terminale (Commission nationale de philosophie, IGEN), Office du Bac", "Programme_Philosophie_Tle.pdf")],
  FR: [official("Nouveaux programmes de français, enseignement secondaire général (Commission nationale de français, 2009), Office du Bac", "Programme_Francais_Tle_LS.pdf")],
  HG: [
    official("Programme d’histoire, 6e à Terminale, Office du Bac", "Programme_Histoire_Tle.pdf"),
    official("Programme de géographie, 6e à Terminale, Office du Bac", "Programme_Geographie_Tle.pdf"),
  ],
  ANG: [official("Programmes de LV anglais, enseignement moyen et secondaire (CNA, 4e édition, 2017), Office du Bac", "Programme_Anglais_Tle.pdf")],
};

// Moyen (6e à 4e) : programmes officiels de maths (APAMS, 2006 ; guide pédagogique pour la 5e) et
// d’histoire-géographie (Office du Bac).
const APAMS = "https://apams.gouv.sn/sites/default/files/";
const MIDDLE_MATH: Record<string, ContentSource> = {
  "6E": { title: "Programme de mathématiques du premier cycle, classe de sixième (MEN, 2006), APAMS", url: `${APAMS}math_1er_cycle_6_me.pdf`, kind: "official" },
  "5E": { title: "Guide pédagogique de mathématiques, classe de cinquième (MEN, DEMSG, 2010), APAMS", url: `${APAMS}Guide%20Pedagogique_MATHS_5EME.pdf`, kind: "official" },
  "4E": { title: "Programme de mathématiques du premier cycle, classe de quatrième (MEN, 2006), APAMS", url: `${APAMS}math_1er_cycle_4_me.pdf`, kind: "official" },
};
const MIDDLE_SURVEY: ContentSource = {
  title: "Relevé DIANGAL du programme du moyen (titres de chapitres de Sunudaara), à confirmer",
  kind: "external",
};
const INDICATIVE: ContentSource = { title: "Chapitres indicatifs : programme officiel non trouvé (à valider)", kind: "diangal" };

// Lycée (2nde, 1re ; séries G et T jusqu’en Terminale) : programmes officiels de maths (APAMS, 2006) ;
// histoire-géographie (Office du Bac).
const LYCEE_MATH_L: ContentSource = { title: "Programme de mathématiques des séries L, seconde à Terminale (MEN, 2006), APAMS", url: `${APAMS}mathseriesL.pdf`, kind: "official" };
const MATH_1RE_S1: ContentSource = { title: "Programme de mathématiques, première S1 et S3 (MEN, 2006), APAMS", url: `${APAMS}math1erS1etS3.pdf`, kind: "official" };
const MATH_1RE_S2: ContentSource = { title: "Programme de mathématiques, première S2 et S4 (MEN, 2006), APAMS", url: `${APAMS}math1erS2etS4_0.pdf`, kind: "official" };
const MATH_G: ContentSource = { title: "Programme de mathématiques de la série G, seconde à Terminale (MEN, 2006), APAMS", url: `${APAMS}mathseriesG.pdf`, kind: "official" };
const MATH_T: ContentSource = { title: "Programme de mathématiques des séries T, seconde à Terminale (MEN, 2006), APAMS", url: `${APAMS}mathseriesT.pdf`, kind: "official" };
const LYCEE_MATH: Record<string, ContentSource> = {
  "2NDE-S": { title: "Programme de mathématiques du second cycle, seconde S (MEN, 2006), APAMS", url: `${APAMS}math_2de_S.pdf`, kind: "official" },
  "2NDE-L": LYCEE_MATH_L,
  "1RE-S1": MATH_1RE_S1,
  "1RE-S3": MATH_1RE_S1,
  "1RE-S2": MATH_1RE_S2,
  "1RE-S4": MATH_1RE_S2,
  "1RE-S5": MATH_1RE_S2,
  "1RE-L1": LYCEE_MATH_L,
  "1RE-L2": LYCEE_MATH_L,
  "1RE-LA": LYCEE_MATH_L,
  "1RE-G": MATH_G,
  "1RE-T1": MATH_T,
  "1RE-T2": MATH_T,
  "TLE-G": MATH_G,
  "TLE-T1": MATH_T,
  "TLE-T2": MATH_T,
};
/** Matières propres aux séries LA, S3, S4, S5, G, T1 et T2 : programme officiel non trouvé en ligne. */
const SERIES_SUBJECTS = new Set(["AR", "ECO", "GEST", "CONST", "TECH", "ELEC", "AGRI", "AGRO"]);
const BAC_EPREUVES: ContentSource = {
  title: "Épreuves et coefficients du Bac par série (samabac.sn, 2019), à confirmer avec l’Office du Bac",
  url: "https://samabac.sn/baccalaureat-les-epreuves-par-serie-les-coefficients-et-le-nombre-de-point-demande",
  kind: "external",
};
const LYCEE_SURVEY: ContentSource = {
  title: "Relevé DIANGAL du programme du lycée (titres de chapitres de Sunudaara), à confirmer",
  kind: "external",
};

/** Sources du programme suivi par un chapitre (la liste des chapitres, pas le texte des leçons). */
export function chapterSources(chapter: Pick<Chapter, "levelCode" | "seriesCode" | "subjectCode" | "strand">): ContentSource[] {
  // Étape 1 du CEB : le même guide officiel couvre le CI et le CP.
  if (chapter.levelCode === "CI" || chapter.levelCode === "CP") {
    return chapter.subjectCode === "FR" ? [CEB_LANGUAGE_1, CEB_STAGE_1, LESSONS_BY_DIANGAL] : [CEB_STAGE_1, LESSONS_BY_DIANGAL];
  }
  if (chapter.levelCode === "3E" && ["MATH", "PC", "SVT", "HG"].includes(chapter.subjectCode)) return [SURVEY_3E];
  if (chapter.levelCode === "CE1" || chapter.levelCode === "CE2") {
    return chapter.subjectCode === "MATH"
      ? [CEB_STAGE_2, paame(chapter.levelCode), LESSONS_BY_DIANGAL]
      : [CEB_STAGE_2, LESSONS_BY_DIANGAL];
  }
  if (chapter.levelCode === "CM1") {
    return chapter.subjectCode === "MATH"
      ? [paame("CM1"), LESSONS_BY_DIANGAL]
      : [CFEE_GUIDE, STAGE_3_INDICATIVE, LESSONS_BY_DIANGAL];
  }
  if (chapter.levelCode === "CM2") {
    if (chapter.subjectCode === "MATH") return [paame("CM2"), CFEE_GUIDE, LESSONS_BY_DIANGAL];
    if (chapter.subjectCode === "FR") return [PROMET_CM2, CFEE_GUIDE, LESSONS_BY_DIANGAL];
    const indicative = chapter.strand === "Histoire" || chapter.strand === "Géographie";
    return indicative ? [CFEE_GUIDE, STAGE_3_INDICATIVE, LESSONS_BY_DIANGAL] : [PROMET_CM2, CFEE_GUIDE, LESSONS_BY_DIANGAL];
  }
  if (chapter.levelCode === "6E" || chapter.levelCode === "5E" || chapter.levelCode === "4E") {
    if (chapter.subjectCode === "HG") return [...(TLE_SOURCES.HG ?? []), LESSONS_BY_DIANGAL];
    const math = MIDDLE_MATH[chapter.levelCode];
    // 5e : le guide officiel ne couvre qu’une partie du programme, le relevé complète.
    if (chapter.subjectCode === "MATH" && chapter.levelCode === "5E" && math) return [math, MIDDLE_SURVEY, LESSONS_BY_DIANGAL];
    if (chapter.subjectCode === "MATH" && math) return [math, LESSONS_BY_DIANGAL];
    if (["MATH", "SVT", "PC"].includes(chapter.subjectCode)) return [MIDDLE_SURVEY, LESSONS_BY_DIANGAL];
    return [INDICATIVE, LESSONS_BY_DIANGAL];
  }
  if (chapter.levelCode === "2NDE" || chapter.levelCode === "1RE") {
    if (chapter.subjectCode === "HG") return [...(TLE_SOURCES.HG ?? []), LESSONS_BY_DIANGAL];
    const math = LYCEE_MATH[`${chapter.levelCode}-${chapter.seriesCode}`];
    if (chapter.subjectCode === "MATH" && math) return [math, LESSONS_BY_DIANGAL];
    if (chapter.subjectCode === "PC" || chapter.subjectCode === "SVT") return [LYCEE_SURVEY, LESSONS_BY_DIANGAL];
    if (SERIES_SUBJECTS.has(chapter.subjectCode)) return [BAC_EPREUVES, INDICATIVE, LESSONS_BY_DIANGAL];
    return [INDICATIVE, LESSONS_BY_DIANGAL];
  }
  if (chapter.levelCode === "TLE") {
    const math = LYCEE_MATH[`TLE-${chapter.seriesCode}`];
    if (chapter.subjectCode === "MATH" && math) return [math, LESSONS_BY_DIANGAL];
    if (SERIES_SUBJECTS.has(chapter.subjectCode)) return [BAC_EPREUVES, INDICATIVE, LESSONS_BY_DIANGAL];
    return [...(TLE_SOURCES[chapter.subjectCode] ?? []), LESSONS_BY_DIANGAL];
  }
  return [];
}
