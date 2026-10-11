import { CalendarDays, MessageCircle, ShieldAlert, ShieldCheck } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Button, ButtonLink } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getCurrentRole, getCurrentStudent } from "@/features/account/data";
import { formatFCFA } from "@/lib/format";
import type { TutorProfile } from "@/types/domain";

/**
 * Contact d'un répétiteur. Seuls les élèves et les parents peuvent contacter.
 * Mode limité : un élève mineur sans validation parentale ne peut pas contacter.
 * WhatsApp n'est jamais proposé à un mineur (numéro exposé hors plateforme).
 */
export async function TutorContactPanel({ tutor }: { tutor: TutorProfile }) {
  const [role, student, t, tTutors] = await Promise.all([
    getCurrentRole(),
    getCurrentStudent(),
    getTranslations("tutor"),
    getTranslations("tutors"),
  ]);
  const isFamily = role === "student" || role === "parent";
  const canContact = role === "parent" || !student.isMinor || student.consentStatus === "granted";

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-line bg-surface p-5">
        <p className="text-sm text-ink-muted">{t("rate")}</p>
        <p className="mt-0.5 text-2xl font-semibold text-ink">
          {tTutors("perHour", { price: formatFCFA(tutor.hourlyRateFcfa) })}
        </p>

        {!isFamily ? null : canContact ? (
          <div className="mt-4 space-y-3">
            <ButtonLink href="/messages" className="w-full">
              <MessageCircle className="size-4" aria-hidden />
              {t("contact")}
            </ButtonLink>
            <Button variant="outline" className="w-full" disabled>
              <CalendarDays className="size-4" aria-hidden />
              {t("book")}
            </Button>
            <p className="text-center text-xs text-ink-subtle">{t("bookSoon")}</p>
          </div>
        ) : (
          <div className="mt-4 rounded-xl bg-premium-50 p-4">
            <p className="flex items-center gap-2 font-semibold text-premium-700">
              <ShieldAlert className="size-5" aria-hidden />
              {t("consentTitle")}
            </p>
            <p className="mt-1 text-sm text-ink">{t("consentBody")}</p>
            <ButtonLink href="/eleve/profil" variant="outline" size="sm" className="mt-3 w-full">
              {t("consentCta")}
            </ButtonLink>
          </div>
        )}
      </div>
      <p className="flex gap-2 rounded-2xl bg-brand-50 p-4 text-xs leading-relaxed text-brand-800">
        <ShieldCheck className="size-4 shrink-0" aria-hidden />
        {t("safety")}
      </p>
    </div>
  );
}

export function TutorContactSkeleton() {
  return <Skeleton className="h-56 rounded-2xl" />;
}
