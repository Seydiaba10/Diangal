// Catalogue du CI (cours d'initiation), d'après le Curriculum de l'Éducation de Base, étape 1
// (voir docs/programme/programme-ci.md). Les leçons sont rédigées par DIANGAL et doivent être
// validées par des enseignants. L'arabe, l'EPS et l'éducation artistique ne sont pas encore couverts.

import { programSlug, slugify } from "@/lib/slug";
import type { Chapter, Subject, SubjectCode } from "@/types/domain";
import type { CiChapterSpec } from "./ci/blocks";
import { ESVS_CI } from "./ci/esvs";
import { FR_CI } from "./ci/francais";
import { MATH_CI } from "./ci/mathematiques";

const LEVEL = "CI";

const PROGRAMS: { code: SubjectCode; slug: string; name: string; chapters: CiChapterSpec[] }[] = [
  { code: "FR", slug: "francais", name: "Français", chapters: FR_CI },
  { code: "MATH", slug: "mathematiques", name: "Mathématiques", chapters: MATH_CI },
  { code: "ESVS", slug: "esvs", name: "Science et vie sociale", chapters: ESVS_CI },
];

// Pas de coefficient officiel au CI : 1 pour chaque matière (il n'est pas affiché).
export const SUBJECTS_CI: Subject[] = PROGRAMS.map(({ code, slug, name }) => ({
  code,
  slug: programSlug(slug, LEVEL),
  name,
  coefficient: 1,
  levelCode: LEVEL,
}));

/** Corps des leçons du CI, par identifiant de leçon. */
export const LESSON_BODIES_CI: Record<string, string> = {};

export const CHAPTERS_CI: Chapter[] = PROGRAMS.flatMap(({ code, chapters }) =>
  chapters.map((spec, index) => {
    const slug = slugify(spec.title);
    const id = `ci-${code.toLowerCase()}-${slug}`;
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
        LESSON_BODIES_CI[lessonId] = lesson.body.replace(/\n\s+/g, "\n").trim();
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
