// Catalogue du CM2 (classe du CFEE), étape 3 du Curriculum de l’Éducation de Base. Sources : guide
// officiel du CFEE (domaines et sous-domaines évalués), cahiers d’exercices de mathématiques PAAME du
// MEN (2024, progression par paliers), leçons de CM2 de PROMET (voir docs/programme/programme-cm2.md).
// Les leçons sont rédigées par DIANGAL et doivent être validées par des enseignants. L’arabe, l’EPS et
// l’éducation artistique ne sont pas encore couverts.

import { programSlug, slugify } from "@/lib/slug";
import type { Chapter, Subject, SubjectCode } from "@/types/domain";
import type { ChapterSpec } from "./cm2/blocks";
import { ESVS_CM2 } from "./cm2/esvs";
import { FR_CM2 } from "./cm2/francais";
import { MATH_CM2_GEOMETRIE, MATH_CM2_MESURE } from "./cm2/maths-geometrie-mesure";
import { MATH_CM2_NOMBRES } from "./cm2/maths-nombres";
import { MATH_CM2_PROBLEMES } from "./cm2/maths-problemes";

const LEVEL = "CM2";

const PROGRAMS: { code: SubjectCode; slug: string; name: string; chapters: ChapterSpec[] }[] = [
  { code: "FR", slug: "francais", name: "Français", chapters: FR_CM2 },
  {
    code: "MATH",
    slug: "mathematiques",
    name: "Mathématiques",
    chapters: [...MATH_CM2_NOMBRES, ...MATH_CM2_GEOMETRIE, ...MATH_CM2_MESURE, ...MATH_CM2_PROBLEMES],
  },
  { code: "ESVS", slug: "esvs", name: "Science et vie sociale", chapters: ESVS_CM2 },
];

// Pas de coefficient officiel au CM2 : 1 pour chaque matière (il n'est pas affiché).
export const SUBJECTS_CM2: Subject[] = PROGRAMS.map(({ code, slug, name }) => ({
  code,
  slug: programSlug(slug, LEVEL),
  name,
  coefficient: 1,
  levelCode: LEVEL,
}));

/** Corps des leçons du CM2, par identifiant de leçon. */
export const LESSON_BODIES_CM2: Record<string, string> = {};

export const CHAPTERS_CM2: Chapter[] = PROGRAMS.flatMap(({ code, chapters }) =>
  chapters.map((spec, index) => {
    const slug = slugify(spec.title);
    const id = `cm2-${code.toLowerCase()}-${slug}`;
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
        LESSON_BODIES_CM2[lessonId] = lesson.body.replace(/\n\s+/g, "\n").trim();
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
