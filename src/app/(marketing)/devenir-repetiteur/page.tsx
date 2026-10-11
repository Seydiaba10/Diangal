import { ArrowRight, CircleCheck } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { ButtonLink } from "@/components/ui/button";
import { MarketingHeader } from "@/features/marketing/components/marketing-header";

const STEPS = ["profile", "documents", "review", "requests"] as const;
const REQUIREMENTS = ["id", "diploma", "record", "experience"] as const;

export async function generateMetadata() {
  const t = await getTranslations("tutorJoin");
  return { title: t("title") };
}

export default async function BecomeTutorPage() {
  const t = await getTranslations("tutorJoin");
  return (
    <>
      <MarketingHeader />
      <div className="mx-auto max-w-5xl px-4 py-12 sm:py-16">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-5xl">{t("title")}</h1>
          <p className="mt-4 text-lg text-ink-muted">{t("subtitle")}</p>
          <ButtonLink href="/inscription?role=tutor" className="mt-6">
            {t("cta")}
            <ArrowRight className="size-4" aria-hidden />
          </ButtonLink>
        </div>

        <h2 className="mt-14 text-2xl font-bold text-ink">{t("stepsTitle")}</h2>
        <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => (
            <li key={step} className="rounded-3xl border-4 border-brand-100 bg-surface p-5">
              <span className="flex size-10 items-center justify-center rounded-full bg-brand-600 font-bold text-white">
                {index + 1}
              </span>
              <p className="mt-3 font-semibold text-ink">{t(`steps.${step}.title`)}</p>
              <p className="mt-1 text-sm text-ink-muted">{t(`steps.${step}.body`)}</p>
            </li>
          ))}
        </ol>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <section className="rounded-3xl bg-surface p-6">
            <h2 className="text-xl font-bold text-ink">{t("requirementsTitle")}</h2>
            <ul className="mt-4 space-y-3">
              {REQUIREMENTS.map((key) => (
                <li key={key} className="flex gap-2.5 text-sm text-ink">
                  <CircleCheck className="mt-0.5 size-4 shrink-0 text-brand-600" aria-hidden />
                  {t(`requirements.${key}`)}
                </li>
              ))}
            </ul>
          </section>
          <section className="rounded-3xl bg-brand-50 p-6">
            <h2 className="text-xl font-bold text-ink">{t("whyTitle")}</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">{t("whyBody")}</p>
          </section>
        </div>
      </div>
    </>
  );
}
