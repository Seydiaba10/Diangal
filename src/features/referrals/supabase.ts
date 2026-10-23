import "server-only";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { AppRole, ReferralAdminStats, ReferralOverview, ReferralStatus } from "@/types/domain";
import { settingsFromJson } from "./presets";

// Parrainage sur Supabase : tout passe par des RPC (code créé au premier appel, droits vérifiés en base).

export async function fetchMyReferral(): Promise<ReferralOverview> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.rpc("get_my_referral");
  if (error) throw new Error(`parrainage : ${error.message}`);
  const raw = data as {
    eligible: boolean;
    enabled: boolean;
    code?: string | null;
    settings?: Record<string, unknown>;
    daysAvailable?: number;
    daysOnHold?: number;
    daysUsed?: number;
    referrals?: { initial: string; role: AppRole; status: ReferralStatus; reason: string | null; createdAt: string }[];
  };
  return {
    eligible: raw.eligible,
    enabled: raw.enabled,
    code: raw.code ?? null,
    settings: raw.settings ? settingsFromJson(raw.settings) : null,
    daysAvailable: raw.daysAvailable ?? 0,
    daysOnHold: raw.daysOnHold ?? 0,
    daysUsed: raw.daysUsed ?? 0,
    referrals: raw.referrals ?? [],
  };
}

export async function fetchReferralAdminStats(): Promise<ReferralAdminStats | null> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.rpc("admin_referral_stats");
  if (error || !data) return null;
  const raw = data as { settings: Record<string, unknown>; byStatus: Partial<Record<ReferralStatus, number>>; daysGranted: number; daysUsed: number; daysRevoked: number };
  return {
    enabled: raw.settings.enabled === true,
    settings: settingsFromJson(raw.settings),
    byStatus: raw.byStatus,
    daysGranted: raw.daysGranted,
    daysUsed: raw.daysUsed,
    daysRevoked: raw.daysRevoked,
  };
}
