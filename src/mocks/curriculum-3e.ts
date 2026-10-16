// Catalogue de 3e. Maths, sciences physiques, SVT et histoire-géographie suivent les chapitres de
// 3e relevés en octobre 2026 (voir docs/programme/releve-ci-3e.md) ; français, anglais et
// éducation civique, l'ordre des chapitres et les coefficients restent indicatifs. Les leçons
// (src/mocks/3e/) sont rédigées par DIANGAL et doivent être validées par des enseignants.

import { programSlug, slugify } from "@/lib/slug";
import type { Chapter, LessonResource, Subject, SubjectCode } from "@/types/domain";
import { ANG_3E } from "./3e/anglais";
import type { Chapter3eSpec } from "./3e/blocks";
import { EC_3E } from "./3e/education-civique";
import { FR_3E } from "./3e/francais";
import { HG_3E } from "./3e/histoire-geographie";
import { MATH_3E_AFTER_THALES, MATH_3E_BEFORE_THALES } from "./3e/mathematiques";
import { PC_3E } from "./3e/sciences-physiques";
import { SVT_3E } from "./3e/svt";
import { LESSON_BODIES as THALES_BODIES } from "./lesson-content";

const LEVEL = "3E";

export const SUBJECTS_3E: Subject[] = (
  [
    ["MATH", "mathematiques", "Mathématiques", 4],
    ["FR", "francais", "Français", 4],
    ["ANG", "anglais", "Anglais", 2],
    ["HG", "histoire-geographie", "Histoire-Géographie", 2],
    ["SVT", "svt", "SVT", 2],
    ["PC", "sciences-physiques", "Sciences physiques", 2],
    ["EC", "education-civique", "Éducation civique", 1],
  ] as const
).map(([code, slug, name, coefficient]) => ({ code, slug: programSlug(slug, LEVEL), name, coefficient, levelCode: LEVEL }));

const PDF_SUMMARY: LessonResource = { kind: "pdf", title: "Fiche résumé", sizeBytes: 240_000 };

const thales = (slug: string) => THALES_BODIES[`math-theoreme-de-thales--${slug}`]!;

// Thalès : premier chapitre rédigé (lesson-content.ts), avec ses ressources de démonstration.
const THALES: Chapter3eSpec = {
  title: "Théorème de Thalès",
  summary: "Calculer des longueurs et démontrer que deux droites sont parallèles.",
  lessons: [
    { title: "La configuration de Thalès", minutes: 8, body: thales("la-configuration-de-thales") },
    {
      title: "L’énoncé du théorème",
      minutes: 10,
      body: thales("l-enonce-du-theoreme"),
      resources: [
        PDF_SUMMARY,
        { kind: "audio", title: "Explication audio", sizeBytes: 1_400_000, durationS: 180 },
        { kind: "video", title: "Vidéo : le théorème en 4 minutes", sizeBytes: 3_100_000, durationS: 240 },
      ],
    },
    { title: "Calculer une longueur", minutes: 12, body: thales("calculer-une-longueur"), resources: [PDF_SUMMARY] },
    { title: "La réciproque du théorème de Thalès", minutes: 10, body: thales("la-reciproque-du-theoreme-de-thales") },
    { title: "Configuration papillon et problèmes", minutes: 15, body: thales("configuration-papillon-et-problemes") },
  ],
};

const SPECS: Partial<Record<SubjectCode, Chapter3eSpec[]>> = {
  MATH: [...MATH_3E_BEFORE_THALES, THALES, ...MATH_3E_AFTER_THALES],
  FR: FR_3E,
  ANG: ANG_3E,
  HG: HG_3E,
  SVT: SVT_3E,
  PC: PC_3E,
  EC: EC_3E,
};

/** Corps des leçons de 3e, par identifiant de leçon. */
export const LESSON_BODIES_3E: Record<string, string> = {};

export const CHAPTERS_3E: Chapter[] = SUBJECTS_3E.flatMap((subject) =>
  (SPECS[subject.code] ?? []).map((spec, index) => {
    const slug = slugify(spec.title);
    const id = `${subject.code.toLowerCase()}-${slug}`;
    return {
      id,
      slug,
      number: index + 1,
      title: spec.title,
      summary: spec.summary,
      subjectCode: subject.code,
      levelCode: LEVEL,
      lessons: spec.lessons.map((lesson, lessonIndex) => {
        const lessonSlug = slugify(lesson.title);
        const lessonId = `${id}--${lessonSlug}`;
        LESSON_BODIES_3E[lessonId] = lesson.body.replace(/\n\s+/g, "\n").trim();
        return {
          id: lessonId,
          slug: lessonSlug,
          number: lessonIndex + 1,
          title: lesson.title,
          estimatedMinutes: lesson.minutes ?? 10,
          isPremium: false,
          resources: lesson.resources ?? [],
        };
      }),
    };
  }),
);

// Progression d'Awa : nombre de leçons terminées par chapitre (« all » = chapitre terminé).
// 18 chapitres terminés, comme sur le dashboard.
export const LESSONS_DONE_BY_CHAPTER: Record<string, number | "all"> = {
  "math-racine-carree": "all",
  "math-calcul-algebrique": "all",
  "math-relations-trigonometriques": "all",
  "math-theoreme-de-thales": 3,
  "fr-le-recit": "all",
  "fr-la-description": "all",
  "fr-le-discours-rapporte": "all",
  "fr-le-texte-argumentatif": 2,
  "ang-present-simple-and-continuous": "all",
  "ang-daily-life-and-routines": "all",
  "hg-la-revolution-industrielle-et-ses-consequences": "all",
  "hg-l-imperialisme-europeen-et-le-partage-de-l-afrique": "all",
  "hg-la-seconde-guerre-mondiale": "all",
  "hg-la-decolonisation-en-afrique": 4,
  "svt-le-systeme-nerveux": "all",
  "svt-la-respiration": "all",
  "svt-l-immunite-de-l-organisme": "all",
  "pc-les-lentilles-minces": "all",
  "pc-la-dispersion-de-la-lumiere-blanche": "all",
  "pc-solutions-acides-et-solutions-basiques": 1,
  "ec-les-droits-de-l-enfant": "all",
  "ec-la-constitution-du-senegal": "all",
};
