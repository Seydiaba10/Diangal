import { Crown } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { ButtonLink } from "@/components/ui/button";
import { getCurrentStudent } from "@/features/account/data";

export async function PremiumCard() {
  const [student, t] = await Promise.all([getCurrentStudent(), getTranslations("premiumCard")]);
  if (student.isPremium) return null;
  return (
    <div className="rounded-2xl bg-premium-50 p-4">
      <Crown className="size-6 text-premium-700" aria-hidden />
      <p className="mt-2 text-sm font-semibold text-ink">{t("title")}</p>
      <p className="mt-1 text-xs leading-relaxed text-ink-muted">{t("body")}</p>
      <ButtonLink href="/eleve/abonnement" size="sm" className="mt-3 w-full">
        {t("cta")}
      </ButtonLink>
    </div>
  );
}
