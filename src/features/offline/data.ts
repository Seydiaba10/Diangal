import "server-only";

import { getCurrentStudent } from "@/features/account/data";
import { chapterHref, findChapterById, getLessonBody } from "@/features/curriculum/data";

/**
 * « Paquet » hors ligne d'un chapitre : leçons en HTML pré-rendu.
 * Les leçons Premium ne sont incluses que pour un élève abonné.
 * Phase 5 : y ajouter les exercices d'entraînement (corrigés inclus pour la correction locale)
 * et les médias, que le service worker met alors en cache.
 */
export async function buildChapterPack(chapterId: string) {
  const found = await findChapterById(chapterId);
  if (!found) return null;
  const { subject, chapter } = found;
  const student = await getCurrentStudent();
  const lessons = await Promise.all(
    chapter.lessons.map(async (lesson) => ({
      id: lesson.id,
      number: lesson.number,
      title: lesson.title,
      html: await getLessonBody(chapter, lesson, student.isPremium),
    })),
  );
  return {
    id: chapter.id,
    title: chapter.title,
    subjectCode: subject.code,
    subjectName: subject.name,
    href: chapterHref(subject, chapter),
    savedAt: new Date().toISOString(),
    lessons,
  };
}
