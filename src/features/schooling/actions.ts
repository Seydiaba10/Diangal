"use server";

import { redirect } from "next/navigation";
import { requireIdentity } from "@/features/account/session";
import { isSupabaseConfigured } from "@/lib/env";
import { safeInternalPath } from "@/lib/safe-path";
import { createSupabaseServerClient } from "@/lib/supabase/server";

/**
 * Passage en classe supérieure, après confirmation. studentId null : l'élève connecté lui-même ;
 * sinon l'enfant d'un parent lié (promote_student vérifie le droit en base).
 */
export async function promoteStudentAction(studentId: string | null, back: string, formData: FormData) {
  const target = safeInternalPath(back) ?? "/";
  const withStatus = (status: string) => `${target}${target.includes("?") ? "&" : "?"}passage=${status}#passage-titre`;
  if (formData.get("confirm") !== "on") redirect(withStatus("confirmation"));
  // Démo : la classe vient des données fictives, elle ne change pas.
  if (!isSupabaseConfigured()) redirect(withStatus("demo"));

  const series = String(formData.get("series") ?? "").trim().slice(0, 8) || undefined;
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
