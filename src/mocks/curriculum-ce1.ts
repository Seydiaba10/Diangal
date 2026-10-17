// Catalogue du CE1, d’après le Curriculum de l’Éducation de Base, étape 2 (niveau 1)
// (voir docs/programme/programme-ce1-ce2.md). Les leçons sont rédigées par DIANGAL et doivent être
// validées par des enseignants. L'arabe, l'EPS et l'éducation artistique ne sont pas encore couverts.

import { programSlug, slugify } from "@/lib/slug";
import type { Chapter, Subject, SubjectCode } from "@/types/domain";
import type { CiChapterSpec } from "./ci/blocks";
import { ESVS_CE1 } from "./ce1/esvs";
import { FR_CE1 } from "./ce1/francais";
import { MATH_CE1 } from "./ce1/mathematiques";

const LEVEL = "CE1";

const PROGRAMS: { code: SubjectCode; slug: string; name: string; chapters: CiChapterSpec[] }[] = [
  { code: "FR", slug: "francais", name: "Français", chapters: FR_CE1 },
  { code: "MATH", slug: "mathematiques", name: "Mathématiques", chapters: MATH_CE1 },
  { code: "ESVS", slug: "esvs", name: "Science et vie sociale", chapters: ESVS_CE1 },
];

// Pas de coefficient officiel au CE1 : 1 pour chaque matière (il n'est pas affiché).
export const SUBJECTS_CE1: Subject[] = PROGRAMS.map(({ code, slug, name }) => ({
  code,
  slug: programSlug(slug, LEVEL),
  name,
  coefficient: 1,
  levelCode: LEVEL,
}));

/** Corps des leçons du CE1, par identifiant de leçon. */
export const LESSON_BODIES_CE1: Record<string, string> = {};

export const CHAPTERS_CE1: Chapter[] = PROGRAMS.flatMap(({ code, chapters }) =>
  chapters.map((spec, index) => {
    const slug = slugify(spec.title);
    const id = `ce1-${code.toLowerCase()}-${slug}`;
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
        LESSON_BODIES_CE1[lessonId] = lesson.body.replace(/\n\s+/g, "\n").trim();
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
