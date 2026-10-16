import "server-only";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { LevelHistoryItem } from "./data";

/** Historique des classes (RLS : l'élève, ses parents liés et l'admin). */
export async function fetchLevelHistory(studentId: string): Promise<LevelHistoryItem[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("student_level_history")
    .select("started_at, ended_at, levels!inner(code), series(code)")
    .eq("student_id", studentId)
    .order("ended_at", { ascending: false });
  if (error) throw new Error(`classes : ${error.message}`);
  return data.map((h) => ({
    levelCode: h.levels.code,
    seriesCode: h.series?.code ?? null,
    startedAt: h.started_at,
    endedAt: h.ended_at,
  }));
}
