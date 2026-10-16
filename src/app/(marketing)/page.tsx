import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  CircleCheck,
  Download,
  GraduationCap,
  HandCoins,
  PenLine,
  ShieldCheck,
  Smartphone,
  Timer,
  Users,
  WifiOff,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ButtonLink } from "@/components/ui/button";
import { MarketingHeader } from "@/features/marketing/components/marketing-header";
import { TornEdge } from "@/features/marketing/components/torn-edge";
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
  border: string;
  tint: string;
}[] = [
  { key: "lessons", icon: BookOpen, border: "border-subject-math/40", tint: "bg-subject-math-soft text-subject-math" },
  { key: "exercises", icon: PenLine, border: "border-subject-svt/40", tint: "bg-subject-svt-soft text-subject-svt" },
  { key: "quizzes", icon: Timer, border: "border-subject-pc/40", tint: "bg-subject-pc-soft text-subject-pc" },
  { key: "exams", icon: GraduationCap, border: "border-subject-ang/40", tint: "bg-subject-ang-soft text-subject-ang" },
  { key: "offline", icon: WifiOff, border: "border-subject-ec/40", tint: "bg-subject-ec-soft text-subject-ec" },
  { key: "tutors", icon: Users, border: "border-subject-fr/40", tint: "bg-subject-fr-soft text-subject-fr" },
];

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
      {/* ── Hero plein écran : la photo « révision du soir » couvre toute la zone visible ── */}
      <section className="relative isolate flex min-h-[calc(100svh-0.375rem)] flex-col overflow-hidden bg-ink text-white">
        {/* Une maman aide ses enfants à réviser le soir, DIANGAL ouvert sur la tablette.
            Cadrage : la famille sur téléphone, toute la scène (tablette comprise) sur grand écran. */}
        <Image
          src="/landing/revision-du-soir.jpg"
          alt={t("hero.imageAlt")}
          fill
          priority
          sizes="(orientation: portrait) 180svh, 100vw"
          className="-z-20 object-cover object-[52%_35%] md:object-[40%_center] lg:object-center"
        />
        {/* Voile sombre pour un texte lisible (globals.css). */}
        <div aria-hidden className="hero-veil absolute inset-0 -z-10" />
        <MarketingHeader overlay />

        {/* Grand écran : le texte occupe le mur en haut à gauche, au-dessus de la tablette ; les garanties
            descendent en bas de l'écran. Téléphone et tablette : tout le texte est en bas. */}
        <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-end px-4 pb-12 pt-24 sm:pb-20 sm:pt-28 lg:justify-start lg:pb-14 lg:pt-28">
          <div className="flex flex-col items-start lg:flex-1">
            <p className="hidden items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink shadow-lg sm:inline-flex lg:hidden">
              <WifiOff className="size-4 text-brand-700" aria-hidden />
              {t("hero.offlineBadge")}
            </p>
            <h1 className="hero-title hero-shadow max-w-xl font-bold tracking-tight sm:mt-5 lg:mt-0">{t("hero.title")}</h1>
            <p className="hero-lead hero-shadow mt-5 max-w-xl leading-relaxed text-white/90">{t("hero.subtitle")}</p>
            <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <ButtonLink href="/inscription" className="bg-white text-brand-700 hover:bg-brand-50">
                {t("hero.ctaStudent")}
                <ArrowRight className="size-4" aria-hidden />
              </ButtonLink>
              <ButtonLink
                href="/inscription?role=parent"
                variant="outline"
                className="border-white/70 bg-transparent text-white hover:bg-white/10"
              >
                {t("hero.ctaParent")}
              </ButtonLink>
            </div>
            <ul className="mt-6 flex flex-wrap gap-2 text-xs text-white sm:mt-8 sm:text-sm lg:mt-auto lg:pt-8">
              {(["free", "offline", "mobileMoney"] as const).map((key) => (
                <li key={key} className="flex items-center gap-1.5 rounded-full bg-ink/55 px-2.5 py-1 ring-1 ring-white/15 backdrop-blur-sm sm:px-3 sm:py-1.5">
                  <CircleCheck className="size-4 shrink-0 text-white" aria-hidden />
                  {t(`hero.trust.${key}`)}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Autocollant BFEM dans le jaune du cycle moyen, comme la bande centrale du drapeau. */}
        <div className="absolute bottom-16 right-4 hidden size-28 rotate-12 flex-col items-center justify-center rounded-full border-4 border-dashed border-ink/25 bg-senegal-yellow text-center text-ink shadow-xl lg:flex xl:right-10 xl:size-32">
          <span className="text-xs font-semibold uppercase tracking-wide">{t("hero.sticker.top")}</span>
          <span className="text-lg font-bold leading-tight xl:text-xl">{t("hero.sticker.main")}</span>
        </div>
        <TornEdge className="absolute inset-x-0 -bottom-px text-cream" />
      </section>

      {/* ── Fonctionnalités ─────────────────────────────────────────────── */}
      <section id="cours" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">{t("features.title")}</h2>
          <p className="mt-3 text-ink-muted">{t("features.subtitle")}</p>
        </div>
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ key, icon: Icon, border, tint }) => (
            <li key={key} className={cn("rounded-3xl border-4 bg-surface p-6", border)}>
              <span className={cn("flex size-12 items-center justify-center rounded-2xl", tint)}>
                <Icon className="size-6" aria-hidden />
              </span>
              <h3 className="mt-4 text-lg font-semibold text-ink">{t(`features.items.${key}.title`)}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{t(`features.items.${key}.body`)}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Niveaux et examens ──────────────────────────────────────────── */}
      <section id="examens" className="scroll-mt-24 bg-surface py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">{t("levels.title")}</h2>
            <p className="mt-3 text-ink-muted">{t("levels.subtitle")}</p>
          </div>
          {/* Un cycle = une bande du drapeau : vert, jaune, rouge. */}
          <ul className="mt-12 grid gap-5 lg:grid-cols-3">
            {CYCLES.map((cycle) => {
              const style = CYCLE_STYLES[cycle.key];
              return (
                <li key={cycle.key} className={cn("rounded-3xl p-6", style.solid, style.onSolid)}>
                  <p className="text-sm font-semibold uppercase tracking-wide">{t(`levels.cycles.${cycle.key}.name`)}</p>
                  <p className="mt-1 text-2xl font-bold">{t("levels.prepare", { exam: tExams(cycle.exam) })}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {cycle.levels.map((level) => (
                      <li key={level} className={cn("rounded-full bg-surface px-3 py-1 text-sm font-semibold", style.text)}>
                        {tLevels(level)}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 text-xs font-semibold uppercase tracking-wide">{t("levels.subjectsTitle")}</p>
                  <p className="mt-1 text-sm leading-relaxed">{t(`levels.cycles.${cycle.key}.body`)}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ── Pensé pour le Sénégal ───────────────────────────────────────── */}
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:py-20 lg:grid-cols-2 lg:items-center">
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
        <div className="rounded-3xl border-4 border-premium-500/40 bg-surface p-6 sm:p-8">
          <p className="font-semibold text-ink">{t("local.paymentsTitle")}</p>
          <ul className="mt-4 grid grid-cols-2 gap-3">
            {[...PAYMENT_NAMES, t("local.card")].map((name) => (
              <li key={name} className="flex h-14 items-center justify-center rounded-2xl bg-canvas px-3 text-center text-sm font-semibold text-ink">
                {name}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-ink-muted">{t("local.paymentsNote")}</p>
        </div>
      </section>

      {/* ── Parents ─────────────────────────────────────────────────────── */}
      <section id="parents" className="scroll-mt-24 px-4">
        <div className="mx-auto grid max-w-6xl gap-8 rounded-3xl bg-brand-50 p-6 sm:p-10 lg:grid-cols-2 lg:items-center">
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
              <li key={key} className="rounded-2xl bg-surface p-4">
                <ShieldCheck className="size-5 text-brand-700" aria-hidden />
                <p className="mt-2 font-semibold text-ink">{t(`parents.items.${key}.title`)}</p>
                <p className="mt-1 text-sm text-ink-muted">{t(`parents.items.${key}.body`)}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Tarifs ──────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">{t("pricing.title")}</h2>
          <p className="mt-3 text-ink-muted">{t("pricing.subtitle")}</p>
        </div>
        <div className="mt-12">
          <PlanCards />
        </div>
      </section>

      {/* ── Devenir répétiteur ──────────────────────────────────────────── */}
      <section className="px-4">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 rounded-3xl bg-ink p-6 text-white sm:p-10 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">{t("tutorBand.title")}</h2>
            <p className="mt-2 max-w-xl text-white/70">{t("tutorBand.body")}</p>
          </div>
          <ButtonLink href="/devenir-repetiteur" className="bg-white text-ink hover:bg-brand-50">
            {t("tutorBand.cta")}
            <ArrowRight className="size-4" aria-hidden />
          </ButtonLink>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-3xl px-4 py-16 sm:py-20">
        <h2 className="text-center text-3xl font-bold tracking-tight text-ink sm:text-4xl">{t("faq.title")}</h2>
        <div className="mt-10 space-y-3">
          {FAQ.map((key) => (
            <details key={key} className="group rounded-2xl border border-line bg-surface p-5">
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
