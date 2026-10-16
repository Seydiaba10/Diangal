// Catalogue complet de démonstration : toutes les classes dont le programme est publié.
// Le seed (scripts/generate-seed.ts) en est tiré : démo et base partent du même contenu.

import { isFreeChapter } from "@/lib/free-tier";
import type { Chapter, ContentSource, Subject } from "@/types/domain";
import { CHAPTERS_3E, LESSON_BODIES_3E, SUBJECTS_3E } from "./curriculum-3e";
import { CHAPTERS_CI, LESSON_BODIES_CI, SUBJECTS_CI } from "./curriculum-ci";
import { CHAPTERS_CP, LESSON_BODIES_CP, SUBJECTS_CP } from "./curriculum-cp";

/** Classes publiées, dans l'ordre de la scolarité. */
export const PUBLISHED_LEVELS = ["CI", "CP", "3E"] as const;

export const CATALOG_SUBJECTS: Subject[] = [...SUBJECTS_CI, ...SUBJECTS_CP, ...SUBJECTS_3E];
/** Offre gratuite appliquée : les leçons des premiers chapitres de chaque matière sont ouvertes à tous. */
export const CATALOG_CHAPTERS: Chapter[] = [...CHAPTERS_CI, ...CHAPTERS_CP, ...CHAPTERS_3E].map((chapter) => ({
  ...chapter,
  lessons: chapter.lessons.map((lesson) => ({ ...lesson, isPremium: !isFreeChapter(chapter.number) })),
}));
/** Leçons rédigées (les autres affichent le gabarit « contenu à venir »). */
export const CATALOG_LESSON_BODIES: Record<string, string> = { ...LESSON_BODIES_CI, ...LESSON_BODIES_CP, ...LESSON_BODIES_3E };

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

/** Sources du programme suivi par un chapitre (la liste des chapitres, pas le texte des leçons). */
export function chapterSources(chapter: Pick<Chapter, "levelCode" | "subjectCode">): ContentSource[] {
  // Étape 1 du CEB : le même guide officiel couvre le CI et le CP.
  if (chapter.levelCode === "CI" || chapter.levelCode === "CP") {
    return chapter.subjectCode === "FR" ? [CEB_LANGUAGE_1, CEB_STAGE_1, LESSONS_BY_DIANGAL] : [CEB_STAGE_1, LESSONS_BY_DIANGAL];
  }
  if (chapter.levelCode === "3E" && ["MATH", "PC", "SVT", "HG"].includes(chapter.subjectCode)) return [SURVEY_3E];
  return [];
}
