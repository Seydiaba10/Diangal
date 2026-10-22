import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  CircleCheck,
  Download,
  GraduationCap,
  HandCoins,
  LineChart,
  PenLine,
  ShieldCheck,
  Smartphone,
  Timer,
  UserPlus,
  Users,
  WifiOff,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ButtonLink } from "@/components/ui/button";
import { MarketingHeader } from "@/features/marketing/components/marketing-header";
import { PlanCards } from "@/features/payments/components/plan-cards";
import { cn } from "@/lib/cn";
import { CYCLE_STYLES, CYCLES } from "@/lib/levels";

export async function generateMetadata() {
  const t = await getTranslations("landing");
  return { title: { absolute: t("metaTitle") }, description: t("metaDescription") };
}

const FEATURES: {
  key: "lessons" | "exercises" | "quizzes" | "exams" | "offline" | "tutors";
  icon: LucideIcon;
  tint: string;
}[] = [
  { key: "lessons", icon: BookOpen, tint: "bg-subject-math-soft text-subject-math" },
  { key: "exercises", icon: PenLine, tint: "bg-subject-svt-soft text-subject-svt" },
  { key: "quizzes", icon: Timer, tint: "bg-subject-pc-soft text-subject-pc" },
  { key: "exams", icon: GraduationCap, tint: "bg-subject-ang-soft text-subject-ang" },
  { key: "offline", icon: WifiOff, tint: "bg-subject-ec-soft text-subject-ec" },
  { key: "tutors", icon: Users, tint: "bg-subject-fr-soft text-subject-fr" },
];

const STEPS = [
  { key: "account", icon: UserPlus },
  { key: "class", icon: GraduationCap },
  { key: "learn", icon: LineChart },
] as const;

const LOCAL = [
  { key: "light", icon: Smartphone },
  { key: "offline", icon: Download },
  { key: "payments", icon: HandCoins },
  { key: "program", icon: BadgeCheck },
] as const;

// Noms commerciaux des moyens de paiement (non traduits), la carte bancaire est traduite.
const PAYMENT_NAMES = ["Wave", "Orange Money", "Free Money / Yas"];

const FAQ = ["free", "levels", "offline", "safety", "payment"] as const;

export default async function LandingPage() {
  const [t, tLevels, tExams] = await Promise.all([
    getTranslations("landing"),
    getTranslations("levels"),
    getTranslations("examNames"),
  ]);

  return (
    <>
      {/* ── Hero clair : le texte à gauche, la photo « révision du soir » à droite dans un cadre ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 to-cream">
        <MarketingHeader />
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-16 pt-10 sm:pb-20 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:pt-14">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-surface px-3.5 py-1.5 text-sm font-semibold text-brand-800 shadow-sm ring-1 ring-brand-100">
              <BadgeCheck className="size-4 text-brand-700" aria-hidden />
              {t("hero.eyebrow")}
            </p>
            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl">{t("hero.title")}</h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-muted">{t("hero.subtitle")}</p>
            <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <ButtonLink href="/inscription">
                {t("hero.ctaStudent")}
                <ArrowRight className="size-4" aria-hidden />
              </ButtonLink>
              <ButtonLink href="/inscription?role=parent" variant="outline">
                {t("hero.ctaParent")}
              </ButtonLink>
            </div>
            <ul className="mt-7 flex flex-wrap gap-2 text-sm text-ink">
              {(["free", "offline", "mobileMoney"] as const).map((key) => (
                <li key={key} className="flex items-center gap-1.5 rounded-full bg-surface px-3 py-1.5 ring-1 ring-line">
                  <CircleCheck className="size-4 shrink-0 text-success-500" aria-hidden />
                  {t(`hero.trust.${key}`)}
                </li>
              ))}
            </ul>
          </div>

          {/* Une maman aide ses enfants à réviser le soir, DIANGAL ouvert sur la tablette. */}
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-surface shadow-xl ring-8 ring-surface">
              <Image
                src="/landing/revision-du-soir.jpg"
                alt={t("hero.imageAlt")}
                fill
                priority
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover object-[40%_center]"
              />
            </div>
            <div className="absolute -bottom-5 left-4 flex items-center gap-3 rounded-2xl bg-surface px-4 py-3 shadow-lg ring-1 ring-line sm:left-6">
              <span className="flex size-10 items-center justify-center rounded-xl bg-success-50 text-success-700">
                <CircleCheck className="size-5" aria-hidden />
              </span>
              <span className="text-sm">
                <span className="block font-semibold text-ink">{t("hero.card.title")}</span>
                <span className="block text-ink-muted">{t("hero.card.body")}</span>
              </span>
            </div>
            <p className="absolute -top-4 right-4 hidden items-center gap-2 rounded-full bg-surface px-3.5 py-2 text-sm font-semibold text-ink shadow-lg ring-1 ring-line sm:inline-flex">
              <WifiOff className="size-4 text-brand-700" aria-hidden />
              {t("hero.offlineBadge")}
            </p>
          </div>
        </div>
      </section>

      {/* ── Fonctionnalités ─────────────────────────────────────────────── */}
      <section id="cours" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">{t("features.title")}</h2>
          <p className="mt-3 text-ink-muted">{t("features.subtitle")}</p>
        </div>
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ key, icon: Icon, tint }) => (
            <li key={key} className="rounded-3xl bg-surface p-6 shadow-sm ring-1 ring-line">
              <span className={cn("flex size-12 items-center justify-center rounded-2xl", tint)}>
                <Icon className="size-6" aria-hidden />
              </span>
              <h3 className="mt-4 text-lg font-semibold text-ink">{t(`features.items.${key}.title`)}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{t(`features.items.${key}.body`)}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Niveaux et examens : toutes les classes, cycle par cycle ───────── */}
      <section id="examens" className="scroll-mt-24 bg-surface py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">{t("levels.title")}</h2>
            <p className="mt-3 text-ink-muted">{t("levels.subtitle")}</p>
          </div>
          {/* Un cycle = une bande du drapeau : vert, jaune, rouge (bandeau coloré, carte claire). */}
          <ul className="mt-12 grid gap-5 lg:grid-cols-3">
            {CYCLES.map((cycle) => {
              const style = CYCLE_STYLES[cycle.key];
              return (
                <li key={cycle.key} className="overflow-hidden rounded-3xl bg-cream ring-1 ring-line">
                  <div aria-hidden className={cn("h-2", style.solid)} />
                  <div className="p-6">
                    <p className={cn("text-sm font-semibold uppercase tracking-wide", style.text)}>{t(`levels.cycles.${cycle.key}.name`)}</p>
                    <p className="mt-1 text-2xl font-bold text-ink">{t("levels.prepare", { exam: tExams(cycle.exam) })}</p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {cycle.levels.map((level) => (
                        <li key={level} className={cn("rounded-full px-3 py-1 text-sm font-semibold", style.soft, style.text)}>
                          {tLevels(level)}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-ink-muted">{t("levels.subjectsTitle")}</p>
                    <p className="mt-1 text-sm leading-relaxed text-ink">{t(`levels.cycles.${cycle.key}.body`)}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ── Comment ça marche ───────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <h2 className="text-center text-3xl font-bold tracking-tight text-ink sm:text-4xl">{t("steps.title")}</h2>
        <ol className="mt-12 grid gap-5 md:grid-cols-3">
          {STEPS.map(({ key, icon: Icon }, index) => (
            <li key={key} className="relative rounded-3xl bg-surface p-6 shadow-sm ring-1 ring-line">
              <span className="absolute right-5 top-5 text-4xl font-bold text-brand-100" aria-hidden>
                {index + 1}
              </span>
              <span className="flex size-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
                <Icon className="size-6" aria-hidden />
              </span>
              <h3 className="mt-4 text-lg font-semibold text-ink">{t(`steps.items.${key}.title`)}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{t(`steps.items.${key}.body`)}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10 flex justify-center">
          <ButtonLink href="/inscription">
            {t("steps.cta")}
            <ArrowRight className="size-4" aria-hidden />
          </ButtonLink>
        </div>
      </section>

      {/* ── Pensé pour le Sénégal ───────────────────────────────────────── */}
      <section className="bg-surface">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:py-20 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">{t("local.title")}</h2>
            <ul className="mt-8 space-y-5">
              {LOCAL.map(({ key, icon: Icon }) => (
                <li key={key} className="flex gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <span>
                    <span className="block font-semibold text-ink">{t(`local.items.${key}.title`)}</span>
                    <span className="mt-0.5 block text-sm text-ink-muted">{t(`local.items.${key}.body`)}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl bg-cream p-6 ring-1 ring-line sm:p-8">
            <p className="font-semibold text-ink">{t("local.paymentsTitle")}</p>
            <ul className="mt-4 grid grid-cols-2 gap-3">
              {[...PAYMENT_NAMES, t("local.card")].map((name) => (
                <li key={name} className="flex h-14 items-center justify-center rounded-2xl bg-surface px-3 text-center text-sm font-semibold text-ink ring-1 ring-line">
                  {name}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-ink-muted">{t("local.paymentsNote")}</p>
          </div>
        </div>
      </section>

      {/* ── Parents ─────────────────────────────────────────────────────── */}
      <section id="parents" className="scroll-mt-24 px-4 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 rounded-3xl bg-brand-50 p-6 ring-1 ring-brand-100 sm:p-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">{t("parents.title")}</h2>
            <p className="mt-3 text-ink-muted">{t("parents.subtitle")}</p>
            <ButtonLink href="/inscription?role=parent" className="mt-6">
              {t("parents.cta")}
              <ArrowRight className="size-4" aria-hidden />
            </ButtonLink>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {(["progress", "consent", "verified", "noAds"] as const).map((key) => (
              <li key={key} className="rounded-2xl bg-surface p-4 ring-1 ring-brand-100">
                <ShieldCheck className="size-5 text-brand-700" aria-hidden />
                <p className="mt-2 font-semibold text-ink">{t(`parents.items.${key}.title`)}</p>
                <p className="mt-1 text-sm text-ink-muted">{t(`parents.items.${key}.body`)}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Tarifs ──────────────────────────────────────────────────────── */}
      <section className="bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">{t("pricing.title")}</h2>
            <p className="mt-3 text-ink-muted">{t("pricing.subtitle")}</p>
          </div>
          <div className="mt-12">
            <PlanCards />
          </div>
        </div>
      </section>

      {/* ── Devenir répétiteur ──────────────────────────────────────────── */}
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 rounded-3xl bg-surface p-6 shadow-sm ring-1 ring-line sm:p-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex gap-4">
            <span className="hidden size-12 shrink-0 items-center justify-center rounded-2xl bg-subject-fr-soft text-subject-fr sm:flex">
              <Users className="size-6" aria-hidden />
            </span>
            <div>
              <h2 className="text-2xl font-bold text-ink sm:text-3xl">{t("tutorBand.title")}</h2>
              <p className="mt-2 max-w-xl text-ink-muted">{t("tutorBand.body")}</p>
            </div>
          </div>
          <ButtonLink href="/devenir-repetiteur" variant="outline">
            {t("tutorBand.cta")}
            <ArrowRight className="size-4" aria-hidden />
          </ButtonLink>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-3xl px-4 pb-16 sm:pb-20">
        <h2 className="text-center text-3xl font-bold tracking-tight text-ink sm:text-4xl">{t("faq.title")}</h2>
        <div className="mt-10 space-y-3">
          {FAQ.map((key) => (
            <details key={key} className="group rounded-2xl bg-surface p-5 ring-1 ring-line">
              <summary className="cursor-pointer list-none font-semibold text-ink marker:hidden">
                <span className="flex items-center justify-between gap-4">
                  {t(`faq.items.${key}.q`)}
                  <span aria-hidden className="text-xl text-brand-700 transition-transform group-open:rotate-45">
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">{t(`faq.items.${key}.a`)}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
