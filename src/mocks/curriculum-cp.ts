// Catalogue du CP (cours préparatoire), d’après le Curriculum de l’Éducation de Base, étape 1
// (voir docs/programme/programme-cp.md). Les leçons sont rédigées par DIANGAL et doivent être
// validées par des enseignants. L'arabe, l'EPS et l'éducation artistique ne sont pas encore couverts.

import { programSlug, slugify } from "@/lib/slug";
import type { Chapter, Subject, SubjectCode } from "@/types/domain";
import type { CiChapterSpec } from "./ci/blocks";
import { ESVS_CP } from "./cp/esvs";
import { FR_CP } from "./cp/francais";
import { MATH_CP } from "./cp/mathematiques";

const LEVEL = "CP";

const PROGRAMS: { code: SubjectCode; slug: string; name: string; chapters: CiChapterSpec[] }[] = [
  { code: "FR", slug: "francais", name: "Français", chapters: FR_CP },
  { code: "MATH", slug: "mathematiques", name: "Mathématiques", chapters: MATH_CP },
  { code: "ESVS", slug: "esvs", name: "Science et vie sociale", chapters: ESVS_CP },
];

// Pas de coefficient officiel au CP : 1 pour chaque matière (il n'est pas affiché).
export const SUBJECTS_CP: Subject[] = PROGRAMS.map(({ code, slug, name }) => ({
  code,
  slug: programSlug(slug, LEVEL),
  name,
  coefficient: 1,
  levelCode: LEVEL,
}));

/** Corps des leçons du CP, par identifiant de leçon. */
export const LESSON_BODIES_CP: Record<string, string> = {};

export const CHAPTERS_CP: Chapter[] = PROGRAMS.flatMap(({ code, chapters }) =>
  chapters.map((spec, index) => {
    const slug = slugify(spec.title);
    const id = `cp-${code.toLowerCase()}-${slug}`;
    return {
      id,
      slug,
      number: index + 1,
      title: spec.title,
      summary: spec.summary,
      subjectCode: code,
      levelCode: LEVEL,
      strand: spec.strand,
      lessons: spec.lessons.map((lesson, lessonIndex) => {
        const lessonSlug = slugify(lesson.title);
        const lessonId = `${id}--${lessonSlug}`;
        LESSON_BODIES_CP[lessonId] = lesson.body.replace(/\n\s+/g, "\n").trim();
        return {
          id: lessonId,
          slug: lessonSlug,
          number: lessonIndex + 1,
          title: lesson.title,
          estimatedMinutes: lesson.minutes ?? 10,
          isPremium: false,
          resources: [],
        };
      }),
    };
  }),
);
