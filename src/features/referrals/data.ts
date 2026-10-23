import { connection } from "next/server";
import { cache } from "react";
import { getCurrentRole } from "@/features/account/data";
import { isSupabaseConfigured } from "@/lib/env";
import { mockState } from "@/mocks/progress-store";
import type { ReferralAdminStats, ReferralOverview } from "@/types/domain";
import { REFERRAL_PRESETS } from "./presets";
import { fetchMyReferral, fetchReferralAdminStats } from "./supabase";

// Parrainage. Démo : un parent avec trois filleuls fictifs ; l'élève de démo, mineure non validée
// par son parent, ne peut pas parrainer (mêmes règles qu'en base). Rien n'est envoyé.

const DEMO_CODE = "K7Q2MW9PAX";

export const getMyReferral = cache(async (): Promise<ReferralOverview> => {
  await connection();
  if (isSupabaseConfigured()) return fetchMyReferral();
  const role = await getCurrentRole();
  const { enabled, scenario, daysAvailable, daysUsed } = mockState.referral;
  const eligible = role === "parent" || (role === "student" && mockState.consentGranted);
  if (!eligible) return { eligible, enabled, code: null, settings: null, daysAvailable: 0, daysOnHold: 0, daysUsed: 0, referrals: [] };
  return {
    eligible,
    enabled,
    code: enabled ? DEMO_CODE : null,
    settings: REFERRAL_PRESETS[scenario],
    daysAvailable,
    daysOnHold: REFERRAL_PRESETS[scenario].referrerDays,
    daysUsed,
    referrals: [
      { initial: "F", role: "parent", status: "rewarded", reason: null, createdAt: "2026-10-12T09:00:00Z" },
      { initial: "M", role: "student", status: "pending", reason: null, createdAt: "2026-10-18T17:30:00Z" },
      { initial: "A", role: "parent", status: "cancelled", reason: "family", createdAt: "2026-10-05T08:15:00Z" },
    ],
  };
});

/** Tableau de bord admin (double authentification exigée par la base). */
export async function getReferralAdminStats(): Promise<ReferralAdminStats | null> {
  await connection();
  if (isSupabaseConfigured()) return fetchReferralAdminStats();
  const { enabled, scenario } = mockState.referral;
  return {
    enabled,
    settings: REFERRAL_PRESETS[scenario],
    byStatus: { pending: 4, rewarded: 2, cancelled: 1 },
    daysGranted: 2 * (REFERRAL_PRESETS[scenario].referrerDays + REFERRAL_PRESETS[scenario].refereeDays),
    daysUsed: REFERRAL_PRESETS[scenario].referrerDays,
    daysRevoked: 0,
  };
}
