// Catalogue complet de démonstration : toutes les classes dont le programme est publié.
// Le seed (scripts/generate-seed.ts) en est tiré : démo et base partent du même contenu.

import type { Chapter, Subject } from "@/types/domain";
import { CHAPTERS_3E, SUBJECTS_3E } from "./curriculum-3e";
import { CHAPTERS_CI, LESSON_BODIES_CI, SUBJECTS_CI } from "./curriculum-ci";
import { LESSON_BODIES as LESSON_BODIES_3E } from "./lesson-content";

/** Classes publiées, dans l'ordre de la scolarité. */
export const PUBLISHED_LEVELS = ["CI", "3E"] as const;

export const CATALOG_SUBJECTS: Subject[] = [...SUBJECTS_CI, ...SUBJECTS_3E];
export const CATALOG_CHAPTERS: Chapter[] = [...CHAPTERS_CI, ...CHAPTERS_3E];
/** Leçons rédigées (les autres affichent le gabarit « contenu à venir »). */
export const CATALOG_LESSON_BODIES: Record<string, string> = { ...LESSON_BODIES_CI, ...LESSON_BODIES_3E };
