import { Crown } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { ButtonLink } from "@/components/ui/button";
import { formatFCFA } from "@/lib/format";
import { getStartingMonthlyPrice } from "../data";

export async function PaywallCard({ title }: { title?: string }) {
  const [t, price] = await Promise.all([getTranslations("paywall"), getStartingMonthlyPrice()]);
  return (
    <div className="rounded-2xl border border-premium-500/40 bg-premium-50 p-5 text-center sm:p-6">
      <span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-surface text-premium-700">
        <Crown className="size-6" aria-hidden />
      </span>
      <p className="mt-3 text-lg font-semibold text-ink">{title ?? t("title")}</p>
      <p className="mx-auto mt-1 max-w-md text-sm text-ink-muted">{t("body")}</p>
      <p className="mt-3 text-sm font-semibold text-premium-700">{t("price", { price: formatFCFA(price) })}</p>
      <ButtonLink href="/eleve/abonnement" className="mt-4">
        {t("cta")}
      </ButtonLink>
    </div>
  );
}
