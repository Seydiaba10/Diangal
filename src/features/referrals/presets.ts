import type { ReferralScenario, ReferralSettings } from "@/types/domain";

// Scénarios de coût du parrainage : mêmes valeurs que private.referral_preset en base
// (migration 20261022000004_referrals.sql). Voir docs/parrainage.md pour le calcul en FCFA.

const COMMON = { holdDays: 14, claimWindowDays: 7, qualifyWithinDays: 90 } as const;

export const REFERRAL_PRESETS: Record<ReferralScenario, ReferralSettings> = {
  prudent: { scenario: "prudent", referrerDays: 15, refereeDays: 0, minAmountFcfa: 5000, maxRewardsPerMonth: 5, ...COMMON },
  intermediaire: { scenario: "intermediaire", referrerDays: 30, refereeDays: 15, minAmountFcfa: 2000, maxRewardsPerMonth: 10, ...COMMON },
  genereux: { scenario: "genereux", referrerDays: 60, refereeDays: 30, minAmountFcfa: 2000, maxRewardsPerMonth: 20, ...COMMON },
};

export const REFERRAL_SCENARIOS = Object.keys(REFERRAL_PRESETS) as ReferralScenario[];

/** Prix d'un jour de Premium au tarif mensuel (2 000 FCFA / 30 jours), arrondi au franc. */
export const DAY_VALUE_FCFA = Math.round(2000 / 30);

/** Valeur, au tarif mensuel, des jours offerts pour un filleul qui paie (parrain + filleul). */
export function costPerConversion(settings: Pick<ReferralSettings, "referrerDays" | "refereeDays">): number {
  return (settings.referrerDays + settings.refereeDays) * DAY_VALUE_FCFA;
}

export function isReferralScenario(value: unknown): value is ReferralScenario {
  return typeof value === "string" && value in REFERRAL_PRESETS;
}

/** Réglages lus en base (clés snake_case du JSON de platform_settings). */
export function settingsFromJson(raw: Record<string, unknown> | null | undefined): ReferralSettings {
  const base = REFERRAL_PRESETS[isReferralScenario(raw?.scenario) ? raw.scenario : "prudent"];
  const num = (key: string, fallback: number) => (typeof raw?.[key] === "number" ? (raw[key] as number) : fallback);
  return {
    scenario: base.scenario,
    referrerDays: num("referrer_days", base.referrerDays),
    refereeDays: num("referee_days", base.refereeDays),
    holdDays: num("hold_days", base.holdDays),
    minAmountFcfa: num("min_amount_fcfa", base.minAmountFcfa),
    maxRewardsPerMonth: num("max_rewards_per_month", base.maxRewardsPerMonth),
    claimWindowDays: num("claim_window_days", base.claimWindowDays),
    qualifyWithinDays: num("qualify_within_days", base.qualifyWithinDays),
  };
}

/** Code affiché par blocs de 5 (K7Q2M-W9PAX), comme sur la carte de parrainage. */
export function formatReferralCode(code: string): string {
  return code.length === 10 ? `${code.slice(0, 5)}-${code.slice(5)}` : code;
}

/** Code tapé ou reçu dans un lien : lettres et chiffres seulement, en majuscules. */
export function normalizeReferralCode(value: unknown): string | null {
  const code = typeof value === "string" ? value.toUpperCase().replace(/[^A-Z0-9]/g, "") : "";
  return /^[A-HJ-NP-Z2-9]{10}$/.test(code) ? code : null;
}
