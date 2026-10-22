import { Check, Crown, Users } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { ButtonLink } from "@/components/ui/button";
import { formatFCFA } from "@/lib/format";
import { getPlans } from "../data";

const FREE_FEATURES = ["lessons", "exercises", "discoveryQuiz", "pastPapers", "offline"] as const;
const PREMIUM_FEATURES = ["allQuizzes", "mockExams", "corrections", "recommendations", "everythingFree"] as const;
const FAMILY_FEATURES = ["children", "profiles", "pin", "addLater"] as const;

/** Offres Gratuit / Premium / Famille (page Tarifs et landing). */
export async function PlanCards({ ctaHref = "/inscription", familyHref = "/inscription?role=parent" }: { ctaHref?: string; familyHref?: string }) {
  const [allPlans, t] = await Promise.all([getPlans(), getTranslations("pricing")]);
  const plans = allPlans.filter((p) => !p.maxChildren);
  const familyPlans = allPlans.filter((p) => p.maxChildren);
  const monthly = plans.find((p) => p.code === "monthly")!;
  const familyMonthly = familyPlans.find((p) => p.code === "family_monthly");
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      <div className="flex flex-col rounded-3xl border-4 border-idle-200 bg-surface p-6 sm:p-8">
        <p className="text-lg font-semibold text-ink">{t("free.name")}</p>
        <p className="mt-2 text-4xl font-bold text-ink xl:text-3xl">{formatFCFA(0)}</p>
        <p className="mt-1 text-sm text-ink-muted">{t("free.tagline")}</p>
        <ul className="mt-6 space-y-3">
          {FREE_FEATURES.map((f) => (
            <li key={f} className="flex gap-2.5 text-sm text-ink">
              <Check className="mt-0.5 size-4 shrink-0 text-success-500" aria-hidden />
              {t(`free.features.${f}`)}
            </li>
          ))}
        </ul>
        <ButtonLink href={ctaHref} variant="outline" className="mt-8 h-auto min-h-12 whitespace-normal py-3 text-center sm:mt-auto">
          {t("free.cta")}
        </ButtonLink>
      </div>

      <div className="relative flex flex-col rounded-3xl border-4 border-premium-500 bg-surface p-6 sm:p-8">
        <span className="absolute -top-4 left-6 inline-flex items-center gap-1 rounded-full bg-premium-500 px-3 py-1 text-xs font-semibold text-white">
          <Crown className="size-3.5" aria-hidden />
          {t("premium.badge")}
        </span>
        <p className="text-lg font-semibold text-ink">{t("premium.name")}</p>
        <p className="mt-2 flex flex-wrap items-baseline gap-x-1">
          <span className="text-4xl font-bold text-ink xl:text-3xl">{formatFCFA(monthly.priceFcfa)}</span>
          <span className="text-sm text-ink-muted">{t("perMonth")}</span>
        </p>
        <p className="mt-1 text-sm text-ink-muted">{t("premium.tagline")}</p>
        <ul className="mt-6 space-y-3">
          {PREMIUM_FEATURES.map((f) => (
            <li key={f} className="flex gap-2.5 text-sm text-ink">
              <Check className="mt-0.5 size-4 shrink-0 text-premium-700" aria-hidden />
              {t(`premium.features.${f}`)}
            </li>
          ))}
        </ul>
        <div className="mt-6 grid grid-cols-2 gap-2">
          {plans
            .filter((p) => p.code !== "monthly")
            .map((plan) => (
              <div key={plan.code} className="rounded-xl bg-premium-50 p-3">
                <p className="text-xs font-medium text-premium-700">{t(`plans.${plan.code}`)}</p>
                <p className="whitespace-nowrap font-semibold text-ink xl:text-sm">{formatFCFA(plan.priceFcfa)}</p>
              </div>
            ))}
        </div>
        <ButtonLink href={ctaHref} className="mt-6 h-auto min-h-12 whitespace-normal py-3 text-center">
          {t("premium.cta")}
        </ButtonLink>
      </div>

      {familyMonthly ? (
        <div className="relative flex flex-col rounded-3xl border-4 border-brand-600 bg-surface p-6 sm:p-8 md:col-span-2 xl:col-span-1">
          <span className="absolute -top-4 left-6 inline-flex items-center gap-1 rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold text-white">
            <Users className="size-3.5" aria-hidden />
            {t("family.badge", { count: familyMonthly.maxChildren ?? 4 })}
          </span>
          <p className="text-lg font-semibold text-ink">{t("family.name")}</p>
          <p className="mt-2 flex flex-wrap items-baseline gap-x-1">
            <span className="text-4xl font-bold text-ink xl:text-3xl">{formatFCFA(familyMonthly.priceFcfa)}</span>
            <span className="text-sm text-ink-muted">{t("perMonth")}</span>
          </p>
          <p className="mt-1 text-sm text-ink-muted">{t("family.tagline", { count: familyMonthly.maxChildren ?? 4 })}</p>
          <ul className="mt-6 space-y-3">
            {FAMILY_FEATURES.map((f) => (
              <li key={f} className="flex gap-2.5 text-sm text-ink">
                <Check className="mt-0.5 size-4 shrink-0 text-brand-700" aria-hidden />
                {t(`family.features.${f}`, { count: familyMonthly.maxChildren ?? 4 })}
              </li>
            ))}
          </ul>
          <div className="mt-6 grid grid-cols-2 gap-2">
            {familyPlans
              .filter((p) => p.code !== "family_monthly")
              .map((plan) => (
                <div key={plan.code} className="rounded-xl bg-brand-50 p-3">
                  <p className="text-xs font-medium text-brand-700">{t(`plans.${plan.code === "family_quarterly" ? "quarterly" : "yearly"}`)}</p>
                  <p className="whitespace-nowrap font-semibold text-ink xl:text-sm">{formatFCFA(plan.priceFcfa)}</p>
                </div>
              ))}
          </div>
          <ButtonLink href={familyHref} className="mt-6 h-auto min-h-12 whitespace-normal py-3 text-center sm:mt-auto">
            {t("family.cta")}
          </ButtonLink>
        </div>
      ) : null}
    </div>
  );
}
