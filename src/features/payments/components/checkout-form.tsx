import { Lock } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { formatFCFA } from "@/lib/format";
import { checkoutAction } from "../actions";
import { getPlans, PAYMENT_CHANNELS } from "../data";

const OPTION_CLASS =
  "flex cursor-pointer items-start gap-3 rounded-2xl border-2 border-line bg-surface p-4 has-[:checked]:border-brand-600 has-[:checked]:bg-brand-50";

/**
 * Choix de l'offre et du moyen de paiement. Formulaire sans JavaScript.
 * Phase 5 : redirection vers la page PayDunya (ou l'app Wave), activation sur webhook.
 */
export async function CheckoutForm({ beneficiaries }: { beneficiaries?: { id: string; name: string }[] }) {
  const [plans, t] = await Promise.all([getPlans(), getTranslations("checkout")]);
  return (
    <form action={checkoutAction} className="space-y-6">
      {beneficiaries ? (
        <fieldset>
          <legend className="font-semibold text-ink">{t("beneficiary")}</legend>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {beneficiaries.map((b, i) => (
              <label key={b.id} className={cn(OPTION_CLASS, "items-center")}>
                <input type="radio" name="beneficiary" value={b.id} defaultChecked={i === 0} className="size-5 accent-brand-600" />
                <span className="font-medium text-ink">{b.name}</span>
              </label>
            ))}
          </div>
        </fieldset>
      ) : null}

      <fieldset>
        <legend className="font-semibold text-ink">{t("plan")}</legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {plans.map((plan) => (
            <label key={plan.code} className={OPTION_CLASS}>
              <input
                type="radio"
                name="plan"
                value={plan.code}
                defaultChecked={plan.code === "quarterly"}
                className="mt-1 size-5 shrink-0 accent-brand-600"
              />
              <span>
                <span className="block font-semibold text-ink">{t(`plans.${plan.code}`)}</span>
                <span className="block text-lg font-bold text-ink">{formatFCFA(plan.priceFcfa)}</span>
                <span className="block text-xs text-ink-muted">{t(`planHints.${plan.code}`)}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="font-semibold text-ink">{t("channel")}</legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {PAYMENT_CHANNELS.map((channel, i) => (
            <label key={channel} className={OPTION_CLASS}>
              <input
                type="radio"
                name="channel"
                value={channel}
                defaultChecked={i === 0}
                className="mt-1 size-5 shrink-0 accent-brand-600"
              />
              <span>
                <span className="block font-semibold text-ink">{t(`channels.${channel}.name`)}</span>
                <span className="block text-xs text-ink-muted">{t(`channels.${channel}.hint`)}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <Button type="submit" className="w-full sm:w-auto">
          <Lock className="size-4" aria-hidden />
          {t("submit")}
        </Button>
        <p className="mt-2 text-xs text-ink-muted">{t("secure")}</p>
      </div>
    </form>
  );
}
