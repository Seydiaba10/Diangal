"use server";

import { refresh } from "next/cache";
import { isSupabaseConfigured } from "@/lib/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { CATALOG_CHAPTERS } from "@/mocks/curriculum";
import { mockState } from "@/mocks/progress-store";

/**
 * Supabase : RPC complete_lesson (progression + activité du jour, Premium vérifié en base).
 * Renvoie ok: false si l'enregistrement échoue : le bouton (mis à jour d'avance) revient alors en arrière.
 */
export async function markLessonCompletedAction(lessonId: string): Promise<{ ok: boolean }> {
  if (isSupabaseConfigured()) {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.rpc("complete_lesson", { p_lesson: lessonId });
    if (error) return { ok: false };
    refresh();
    return { ok: true };
  }
  const exists = CATALOG_CHAPTERS.some((c) => c.lessons.some((l) => l.id === lessonId));
  if (!exists) return { ok: false };
  mockState.completedLessons.add(lessonId);
  refresh();
  return { ok: true };
}
