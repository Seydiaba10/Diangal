"use server";

import { refresh } from "next/cache";
import { CHAPTERS_3E } from "@/mocks/curriculum-3e";
import { mockState } from "@/mocks/progress-store";

/** Phase 3 : upsert dans lesson_progress (RLS : l'élève n'écrit que sa propre ligne). */
export async function markLessonCompletedAction(lessonId: string) {
  const exists = CHAPTERS_3E.some((c) => c.lessons.some((l) => l.id === lessonId));
  if (!exists) return;
  mockState.completedLessons.add(lessonId);
  refresh();
}
