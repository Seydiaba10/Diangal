// Construit le catalogue d’une classe (matières, chapitres, corps des leçons) à partir de ses
// programmes rédigés dans src/mocks/<classe>/. Identifiants : `<classe>-<matière>-<slug du chapitre>`
// et `<chapitre>--<slug de la leçon>`, comme pour le CI, le CP et la 3e. Au lycée, une série a ses propres
// programmes : la classe est alors suivie de la série (`2nde-s-math-…`, slug `mathematiques-2nde-s`).

import { programSlug, slugify } from "@/lib/slug";
import type { Chapter, Subject, SubjectCode } from "@/types/domain";
import type { ChapterSpec } from "./tle/blocks";

export interface ProgramSpec {
  code: SubjectCode;
  /** Slug de la matière, sans la classe (« mathematiques »). */
  slug: string;
  name: string;
  /** Pondération de la moyenne (aucun coefficient n’est affiché). */
  coefficient: number;
  chapters: ChapterSpec[];
}

export function buildCatalog(levelCode: string, programs: ProgramSpec[], seriesCode?: string) {
  const prefix = seriesCode ? `${levelCode}-${seriesCode}`.toLowerCase() : levelCode.toLowerCase();
  const lessonBodies: Record<string, string> = {};

  const subjects: Subject[] = programs.map(({ code, slug, name, coefficient }) => ({
    code,
    slug: programSlug(slug, levelCode, seriesCode),
    name,
    coefficient,
    levelCode,
    ...(seriesCode ? { seriesCode } : {}),
  }));

  const chapters: Chapter[] = programs.flatMap(({ code, chapters: specs }) =>
    specs.map((spec, index) => {
      const slug = slugify(spec.title);
      const id = `${prefix}-${code.toLowerCase()}-${slug}`;
      return {
        id,
        slug,
        number: index + 1,
        title: spec.title,
        summary: spec.summary,
        subjectCode: code,
        levelCode,
        ...(seriesCode ? { seriesCode } : {}),
        strand: spec.strand,
        lessons: spec.lessons.map((lesson, lessonIndex) => {
          const lessonSlug = slugify(lesson.title);
          const lessonId = `${id}--${lessonSlug}`;
          lessonBodies[lessonId] = lesson.body.replace(/\n\s+/g, "\n").trim();
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

  return { subjects, chapters, lessonBodies };
}
