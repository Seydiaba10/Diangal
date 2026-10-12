"use server";

import { refresh } from "next/cache";
import { isSupabaseConfigured } from "@/lib/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { CATALOG_CHAPTERS } from "@/mocks/curriculum";
import { mockState } from "@/mocks/progress-store";

/** Supabase : RPC complete_lesson (progression + activité du jour, Premium vérifié en base). */
export async function markLessonCompletedAction(lessonId: string) {
  if (isSupabaseConfigured()) {
    const supabase = await createSupabaseServerClient();
    await supabase.rpc("complete_lesson", { p_lesson: lessonId });
    refresh();
    return;
  }
  const exists = CATALOG_CHAPTERS.some((c) => c.lessons.some((l) => l.id === lessonId));
  if (!exists) return;
  mockState.completedLessons.add(lessonId);
  refresh();
}
