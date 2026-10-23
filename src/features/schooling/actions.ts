"use server";

import { redirect } from "next/navigation";
import { getCurrentStudent } from "@/features/account/data";
import { requireIdentity } from "@/features/account/session";
import { isSupabaseConfigured } from "@/lib/env";
import { safeInternalPath } from "@/lib/safe-path";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { mockState } from "@/mocks/progress-store";
import { DEMO_STUDENT_ID } from "@/mocks/users";
import { promotionInfo } from "./data";

/**
 * Passage en classe supérieure, après confirmation. studentId null : l'élève connecté lui-même ;
 * sinon l'enfant d'un parent lié (promote_student vérifie le droit en base).
 */
export async function promoteStudentAction(studentId: string | null, back: string, formData: FormData) {
  const target = safeInternalPath(back) ?? "/";
  const withStatus = (status: string) => `${target}${target.includes("?") ? "&" : "?"}passage=${status}#passage-titre`;
  if (formData.get("confirm") !== "on") redirect(withStatus("confirmation"));
  const series = String(formData.get("series") ?? "").trim().slice(0, 8) || undefined;
  // Démo : passage gardé en mémoire (jusqu'au redémarrage du serveur), mêmes règles qu'en base.
  if (!isSupabaseConfigured()) {
    // Seule Awa (élève de démo) change de classe ; le second enfant reste en CM2.
    if (studentId && studentId !== DEMO_STUDENT_ID) redirect(withStatus("demo"));
    const student = await getCurrentStudent();
    const { nextLevel, seriesOptions, defaultSeries } = promotionInfo(student.levelCode, student.seriesCode);
    if (!nextLevel) redirect(withStatus("fin"));
    const nextSeries = seriesOptions.length ? (series && seriesOptions.includes(series) ? series : defaultSeries) : null;
    if (seriesOptions.length && !nextSeries) redirect(withStatus("serie"));
    const now = new Date().toISOString();
    const startedAt = mockState.levelHistory.at(-1)?.endedAt ?? "2025-10-01T08:00:00Z";
    mockState.levelHistory.push({ levelCode: student.levelCode, seriesCode: student.seriesCode, startedAt, endedAt: now });
    mockState.studentLevel = { levelCode: nextLevel!, seriesCode: nextSeries };
    redirect(withStatus("ok"));
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.rpc("promote_student", {
    p_student: studentId ?? (await requireIdentity()).userId,
    p_series: series,
  });
  if (error?.message.includes("series_required")) redirect(withStatus("serie"));
  if (error?.message.includes("end_of_track")) redirect(withStatus("fin"));
  if (error) redirect(withStatus("erreur"));
  redirect(withStatus("ok"));
}
