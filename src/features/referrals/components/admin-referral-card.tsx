import { Gift } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/ui/section-card";
import { formatFCFA } from "@/lib/format";
import type { ReferralAdminStats } from "@/types/domain";
import { setReferralSettingsAction } from "../actions";
import { costPerConversion, REFERRAL_PRESETS, REFERRAL_SCENARIOS } from "../presets";

/** Réglage du parrainage par l'admin : ouverture, scénario de coût, chiffres du programme. */
export async function AdminReferralCard({ stats }: { stats: ReferralAdminStats }) {
  const t = await getTranslations("adminReferral");
  return (
    <SectionCard id="parrainage-titre" title={t("title")} subtitle={t("subtitle")}>
      <dl className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
        {(
          [
            ["pending", stats.byStatus.pending ?? 0],
            ["rewarded", stats.byStatus.rewarded ?? 0],
            ["cancelled", (stats.byStatus.cancelled ?? 0) + (stats.byStatus.expired ?? 0)],
            ["daysGranted", stats.daysGranted],
          ] as const
        ).map(([key, value]) => (
          <div key={key} className="rounded-xl bg-canvas p-3">
            <dt className="text-xs text-ink-muted">{t(`stats.${key}`)}</dt>
            <dd className="mt-1 text-lg font-semibold text-ink">{value}</dd>
          </div>
        ))}
      </dl>

      <form action={setReferralSettingsAction} className="mt-5 space-y-4">
        <label className="flex min-h-11 cursor-pointer items-center gap-3 text-sm font-medium text-ink">
          <input type="checkbox" name="enabled" defaultChecked={stats.enabled} className="size-5 accent-brand-600" />
          {t("enabled")}
        </label>
        <fieldset className="space-y-2">
          <legend className="text-sm font-medium text-ink">{t("scenario")}</legend>
          {REFERRAL_SCENARIOS.map((scenario) => {
            const preset = REFERRAL_PRESETS[scenario];
            return (
              <label
                key={scenario}
                className="flex cursor-pointer gap-3 rounded-xl border border-line p-3 text-sm has-[:checked]:border-brand-600 has-[:checked]:bg-brand-50"
              >
                <input
                  type="radio"
                  name="scenario"
                  value={scenario}
                  defaultChecked={stats.settings.scenario === scenario}
                  className="mt-0.5 size-5 shrink-0 accent-brand-600"
                />
                <span>
                  <span className="block font-semibold text-ink">{t(`scenarios.${scenario}`)}</span>
                  <span className="block text-xs text-ink-muted">
                    {t("presetLine", {
                      referrer: preset.referrerDays,
                      referee: preset.refereeDays,
                      min: formatFCFA(preset.minAmountFcfa),
                      cap: preset.maxRewardsPerMonth,
                      cost: formatFCFA(costPerConversion(preset)),
                    })}
                  </span>
                </span>
              </label>
            );
          })}
        </fieldset>
        <p className="text-xs text-ink-muted">{t("note", { hold: stats.settings.holdDays })}</p>
        <Button type="submit" variant="outline" size="sm">
          <Gift className="size-4" aria-hidden />
          {t("save")}
        </Button>
      </form>
    </SectionCard>
  );
}
