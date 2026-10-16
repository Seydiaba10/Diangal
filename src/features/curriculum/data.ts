import { connection } from "next/server";
import { cache } from "react";
import { requireIdentity } from "@/features/account/session";
import { isSupabaseConfigured } from "@/lib/env";
import { normalizeText } from "@/lib/grading";
import { CATALOG_CHAPTERS, CATALOG_LESSON_BODIES, CATALOG_SUBJECTS } from "@/mocks/curriculum";
import { CHAPTERS_3E, LESSONS_DONE_BY_CHAPTER } from "@/mocks/curriculum-3e";
import { genericLessonBody } from "@/mocks/lesson-content";
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
import { getCompletedLessonIds, getLessonBodyHtml, loadCatalog } from "./supabase";

// ── Contenu publié : identique pour tous les élèves, donc prérendable ──────────
// Démo : src/mocks. Supabase : programmes publiés de toutes les classes (programs / chapters /
// lessons), mis en cache. Une « matière » est un programme : Mathématiques du CI ≠ de la 3e.

async function catalog(): Promise<{ subjects: Subject[]; chapters: Chapter[] }> {
  return isSupabaseConfigured() ? loadCatalog() : { subjects: CATALOG_SUBJECTS, chapters: CATALOG_CHAPTERS };
}

/** Matière (programme) d'un chapitre : même code, même classe et même série. */
function subjectOf(subjects: Subject[], chapter: Pick<Chapter, "subjectCode" | "levelCode" | "seriesCode">) {
  return subjects.find(
    (s) => s.code === chapter.subjectCode && s.levelCode === chapter.levelCode && (s.seriesCode ?? null) === (chapter.seriesCode ?? null),
  );
}

/**
 * Matières d'une classe (levelCode) — au lycée, les matières communes et celles de la série
 * de l'élève (seriesCode) —, ou de tout le catalogue publié.
 */
export async function getSubjects(levelCode?: string, seriesCode?: string | null): Promise<Subject[]> {
  const { subjects } = await catalog();
  if (!levelCode) return subjects;
  return subjects.filter((s) => s.levelCode === levelCode && (!s.seriesCode || s.seriesCode === seriesCode));
}

export async function getSubject(slug: string): Promise<Subject | undefined> {
  return (await getSubjects()).find((s) => s.slug === slug);
}

export async function getChapters(subject: Subject): Promise<Chapter[]> {
  return (await catalog()).chapters.filter(
    (c) => c.subjectCode === subject.code && c.levelCode === subject.levelCode && (c.seriesCode ?? null) === (subject.seriesCode ?? null),
  );
}

export async function getChapter(subjectSlug: string, chapterSlug: string) {
  const subject = await getSubject(subjectSlug);
  const chapter = subject && (await getChapters(subject)).find((c) => c.slug === chapterSlug);
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

export async function findChapterById(chapterId: string) {
  const { subjects, chapters } = await catalog();
  const chapter = chapters.find((c) => c.id === chapterId);
  const subject = chapter && subjectOf(subjects, chapter);
  return chapter && subject ? { subject, chapter } : undefined;
}

/** Leçon et son chapitre à partir de l'identifiant de la leçon. */
export async function findLessonById(lessonId: string) {
  const { subjects, chapters } = await catalog();
  const chapter = chapters.find((c) => c.lessons.some((l) => l.id === lessonId));
  const lesson = chapter?.lessons.find((l) => l.id === lessonId);
  const subject = chapter && subjectOf(subjects, chapter);
  return chapter && lesson && subject ? { subject, chapter, lesson } : undefined;
}

export async function getAllChapterParams() {
  const { subjects, chapters } = await catalog();
  return chapters.map((chapter) => ({
    matiere: subjectOf(subjects, chapter)!.slug,
    chapitre: chapter.slug,
  }));
}

export async function getAllLessonParams() {
  const { chapters } = await catalog();
  const params = await getAllChapterParams();
  return chapters.flatMap((chapter, i) => chapter.lessons.map((lesson) => ({ ...params[i]!, lecon: lesson.slug })));
}

/** Recherche dans les chapitres d'une classe. */
export async function searchChapters(query: string, levelCode: string): Promise<ChapterSearchHit[]> {
  const needle = normalizeText(query);
  if (needle.length < 2) return [];
  const { subjects, chapters } = await catalog();
  return chapters
    .filter((c) => c.levelCode === levelCode && normalizeText(`${c.title} ${c.summary}`).includes(needle))
    .slice(0, 12)
    .map((c) => ({
      subject: subjectOf(subjects, c)!,
      chapterSlug: c.slug,
      chapterTitle: c.title,
      number: c.number,
    }));
}

// ── Progression d'un élève : rendue à la requête ────────────────────────────

/** Démo : les premières leçons de chaque chapitre d'après l'historique fictif, plus celles de la session. */
function mockCompletedLessonIds(): Set<string> {
  const done = new Set(mockState.completedLessons);
  for (const chapter of CHAPTERS_3E) {
    const base = LESSONS_DONE_BY_CHAPTER[chapter.id];
    const count = base === "all" ? chapter.lessons.length : (base ?? 0);
    for (const lesson of chapter.lessons.slice(0, count)) done.add(lesson.id);
  }
  return done;
}

/**
 * Leçons terminées par l'élève connecté, ou par l'enfant d'un parent (studentId).
 * Supabase : lesson_progress, la RLS n'autorise que l'élève, ses parents liés et l'admin.
 */
export const getCompletedLessons = cache(async (studentId?: string): Promise<Set<string>> => {
  await connection();
  if (!isSupabaseConfigured()) return mockCompletedLessonIds();
  return getCompletedLessonIds(studentId ?? (await requireIdentity()).userId);
});

function statusOf(done: number, total: number): ChapterStatus {
  if (total > 0 && done >= total) return "completed";
  return done > 0 ? "in_progress" : "not_started";
}

export function toChapterSummary(chapter: Chapter, completed: Set<string>): ChapterSummary {
  const done = chapter.lessons.filter((l) => completed.has(l.id)).length;
  const total = chapter.lessons.length;
  return {
    id: chapter.id,
    slug: chapter.slug,
    number: chapter.number,
    title: chapter.title,
    status: statusOf(done, total),
    strand: chapter.strand ?? null,
    progressPct: total ? Math.round((done / total) * 100) : 0,
    isPremium: chapter.lessons.some((l) => l.isPremium),
    lessonsCount: total,
    lessonsDone: done,
    estimatedMinutes: chapter.lessons.reduce((sum, l) => sum + l.estimatedMinutes, 0),
  };
}

/** Progression par matière dans la classe de l'élève (levelCode), lui-même ou l'enfant d'un parent. */
export const getSubjectsProgress = cache(
  async (levelCode: string, studentId?: string, seriesCode?: string | null): Promise<SubjectProgress[]> => {
    const [completed, subjects] = await Promise.all([getCompletedLessons(studentId), getSubjects(levelCode, seriesCode)]);
    return Promise.all(
      subjects.map(async (subject) => {
        const summaries = (await getChapters(subject)).map((c) => toChapterSummary(c, completed));
        const done = summaries.filter((c) => c.status === "completed").length;
        return {
          ...subject,
          chaptersTotal: summaries.length,
          chaptersCompleted: done,
          progressPct: summaries.length ? Math.round((done / summaries.length) * 100) : 0,
        };
      }),
    );
  },
);

export const getChapterSummaries = cache(async (subject: Subject): Promise<ChapterSummary[]> => {
  const completed = await getCompletedLessons();
  return (await getChapters(subject)).map((c) => toChapterSummary(c, completed));
});

export const getChapterProgress = cache(async (chapter: Chapter) => {
  const completed = await getCompletedLessons();
  const statuses: Record<string, LessonStatus> = Object.fromEntries(
    chapter.lessons.map((l) => [l.id, completed.has(l.id) ? "completed" : "not_started"]),
  );
  return { summary: toChapterSummary(chapter, completed), statuses };
});

/** Corps de la leçon, ou null si elle est Premium et que l'élève n'est pas abonné. */
export const getLessonBody = cache(async (chapter: Chapter, lesson: Lesson, isPremiumStudent: boolean) => {
  await connection();
  if (lesson.isPremium && !isPremiumStudent) return null;
  if (isSupabaseConfigured()) return getLessonBodyHtml(lesson.id);
  return mockState.lessonBodyOverrides.get(lesson.id) ?? CATALOG_LESSON_BODIES[lesson.id] ?? genericLessonBody(lesson.title, chapter.title);
});
