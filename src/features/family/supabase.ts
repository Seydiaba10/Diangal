import "server-only";

import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { AvatarKey, ChildLoginInfo, FamilyCoverage, PlanCode } from "@/types/domain";

// Offre Famille et connexion des enfants. Lectures du parent : session (RLS / fonctions dédiées).
// Connexion d'un enfant (avant toute session) : clé secrète, fonctions réservées au serveur.

/** Formule Famille en cours payée par le parent (RLS : abonnements qu'il a payés). */
export async function fetchFamilyCoverage(parentId: string): Promise<FamilyCoverage | null> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("subscriptions")
    .select("student_id, ends_at, payment_id, plans!inner(code, max_children)")
    .eq("payer_id", parentId)
    .eq("status", "active")
    .gt("ends_at", new Date().toISOString())
    .not("plans.max_children", "is", null)
    .order("ends_at", { ascending: false });
  if (error) throw new Error(`formule Famille : ${error.message}`);
  const latest = data[0];
  if (!latest) return null;
  return {
    planCode: latest.plans.code as PlanCode,
    endsAt: latest.ends_at,
    maxChildren: latest.plans.max_children ?? 4,
    childIds: [...new Set(data.filter((s) => s.payment_id === latest.payment_id).map((s) => s.student_id))],
  };
}

export async function fetchFamilyCode(): Promise<string> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.rpc("get_my_family_code");
  if (error || !data) throw new Error(`code famille : ${error?.message ?? "vide"}`);
  return data;
}

export async function fetchChildLogins(): Promise<ChildLoginInfo[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.rpc("get_my_child_logins");
  if (error) throw new Error(`codes PIN : ${error.message}`);
  return data.map((c) => ({ studentId: c.student_id, hasPin: true, locked: c.locked }));
}

/** Enfants proposés pour un code famille (prénom et avatar seulement). */
export async function fetchFamilyChildren(code: string): Promise<{ id: string; firstName: string; avatarKey: AvatarKey }[]> {
  const { data, error } = await createSupabaseAdminClient().rpc("get_family_children", { p_code: code });
  if (error) throw new Error(`code famille : ${error.message}`);
  return data.map((c) => ({ id: c.student_id, firstName: c.first_name, avatarKey: (c.avatar_key ?? "awa") as AvatarKey }));
}
