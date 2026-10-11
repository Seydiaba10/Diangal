import { connection } from "next/server";
import { cache } from "react";
import { normalizeText } from "@/lib/grading";
import { CHAPTERS_3E, LESSONS_DONE_BY_CHAPTER, SUBJECTS_3E } from "@/mocks/curriculum-3e";
import { genericLessonBody, LESSON_BODIES } from "@/mocks/lesson-content";
import { mockState } from "@/mocks/progress-store";
import type {
  Chapter,
  ChapterSearchHit,
  ChapterStatus,
  ChapterSummary,
  Lesson,
  LessonStatus,
  Subject,
  SubjectProgress,
} from "@/types/domain";

// ── Contenu publié : identique pour tous les élèves, donc prérendable ──────────
// Phase 3 : lecture Supabase des tables programs / chapters / lessons (statut publié).

export async function getSubjects(): Promise<Subject[]> {
  return SUBJECTS_3E;
}

export async function getSubject(slug: string): Promise<Subject | undefined> {
  return SUBJECTS_3E.find((s) => s.slug === slug);
}

export async function getChapters(subject: Subject): Promise<Chapter[]> {
  return CHAPTERS_3E.filter((c) => c.subjectCode === subject.code);
}

export async function getChapter(subjectSlug: string, chapterSlug: string) {
  const subject = await getSubject(subjectSlug);
  const chapter = subject && CHAPTERS_3E.find((c) => c.subjectCode === subject.code && c.slug === chapterSlug);
  return subject && chapter ? { subject, chapter } : undefined;
}

export async function getLesson(subjectSlug: string, chapterSlug: string, lessonSlug: string) {
  const found = await getChapter(subjectSlug, chapterSlug);
  if (!found) return undefined;
  const index = found.chapter.lessons.findIndex((l) => l.slug === lessonSlug);
  const lesson = found.chapter.lessons[index];
  if (!lesson) return undefined;
  return {
    ...found,
    lesson,
    previous: found.chapter.lessons[index - 1] ?? null,
    next: found.chapter.lessons[index + 1] ?? null,
  };
}

export function chapterHref(subject: Subject, chapter: Pick<Chapter, "slug">) {
  return `/eleve/cours/${subject.slug}/${chapter.slug}`;
}

export function lessonHref(subject: Subject, chapter: Pick<Chapter, "slug">, lesson: Pick<Lesson, "slug">) {
  return `${chapterHref(subject, chapter)}/${lesson.slug}`;
}

export function findChapterById(chapterId: string) {
  const chapter = CHAPTERS_3E.find((c) => c.id === chapterId);
  const subject = chapter && SUBJECTS_3E.find((s) => s.code === chapter.subjectCode);
  return chapter && subject ? { subject, chapter } : undefined;
}

export async function getAllChapterParams() {
  return CHAPTERS_3E.map((chapter) => ({
    matiere: SUBJECTS_3E.find((s) => s.code === chapter.subjectCode)!.slug,
    chapitre: chapter.slug,
  }));
}

export async function getAllLessonParams() {
  const chapters = await getAllChapterParams();
  return CHAPTERS_3E.flatMap((chapter, i) =>
    chapter.lessons.map((lesson) => ({ ...chapters[i]!, lecon: lesson.slug })),
  );
}

export async function searchChapters(query: string): Promise<ChapterSearchHit[]> {
  const needle = normalizeText(query);
  if (needle.length < 2) return [];
  return CHAPTERS_3E.filter((c) => normalizeText(`${c.title} ${c.summary}`).includes(needle))
    .slice(0, 12)
    .map((c) => ({
      subject: SUBJECTS_3E.find((s) => s.code === c.subjectCode)!,
      chapterSlug: c.slug,
      chapterTitle: c.title,
      number: c.number,
    }));
}

// ── Progression de l'élève connecté : rendue à la requête ───────────────────

/** Leçons terminées d'après l'historique fictif (les premières du chapitre). */
function baseLessonsDone(chapter: Chapter): number {
  const base = LESSONS_DONE_BY_CHAPTER[chapter.id];
  return base === "all" ? chapter.lessons.length : (base ?? 0);
}

function isLessonDone(chapter: Chapter, index: number): boolean {
  return index < baseLessonsDone(chapter) || mockState.completedLessons.has(chapter.lessons[index]!.id);
}

function lessonsDone(chapter: Chapter): number {
  return chapter.lessons.filter((_, i) => isLessonDone(chapter, i)).length;
}

function statusOf(done: number, total: number): ChapterStatus {
  if (done >= total) return "completed";
  return done > 0 ? "in_progress" : "not_started";
}

export function toChapterSummary(chapter: Chapter): ChapterSummary {
  const done = lessonsDone(chapter);
  const total = chapter.lessons.length;
  return {
    id: chapter.id,
    slug: chapter.slug,
    number: chapter.number,
    title: chapter.title,
    status: statusOf(done, total),
    progressPct: Math.round((done / total) * 100),
    isPremium: chapter.lessons.some((l) => l.isPremium),
    lessonsCount: total,
    lessonsDone: done,
    estimatedMinutes: chapter.lessons.reduce((sum, l) => sum + l.estimatedMinutes, 0),
  };
}

export const getSubjectsProgress = cache(async (): Promise<SubjectProgress[]> => {
  await connection();
  return SUBJECTS_3E.map((subject) => {
    const chapters = CHAPTERS_3E.filter((c) => c.subjectCode === subject.code).map(toChapterSummary);
    const completed = chapters.filter((c) => c.status === "completed").length;
    return {
      ...subject,
      chaptersTotal: chapters.length,
      chaptersCompleted: completed,
      progressPct: chapters.length ? Math.round((completed / chapters.length) * 100) : 0,
    };
  });
});

export const getChapterSummaries = cache(async (subject: Subject): Promise<ChapterSummary[]> => {
  await connection();
  return CHAPTERS_3E.filter((c) => c.subjectCode === subject.code).map(toChapterSummary);
});

export const getChapterProgress = cache(async (chapter: Chapter) => {
  await connection();
  const statuses: Record<string, LessonStatus> = Object.fromEntries(
    chapter.lessons.map((l, i) => [l.id, isLessonDone(chapter, i) ? "completed" : "not_started"]),
  );
  return { summary: toChapterSummary(chapter), statuses };
});

/** Corps de la leçon, ou null si elle est Premium et que l'élève n'est pas abonné. */
export const getLessonBody = cache(async (chapter: Chapter, lesson: Lesson, isPremiumStudent: boolean) => {
  await connection();
  if (lesson.isPremium && !isPremiumStudent) return null;
  return mockState.lessonBodyOverrides.get(lesson.id) ?? LESSON_BODIES[lesson.id] ?? genericLessonBody(lesson.title, chapter.title);
});
