import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { DemoRoleSwitcher } from "@/components/layout/demo-role-switcher";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { ChipCheckbox, Field, INPUT_CLASS, TEXTAREA_CLASS } from "@/components/ui/form";
import { CycleDot } from "@/components/ui/level-badge";
import { Notice } from "@/components/ui/notice";
import { SectionCard } from "@/components/ui/section-card";
import { Skeleton } from "@/components/ui/skeleton";
import { saveTutorProfileAction } from "@/features/tutors/actions";
import { getDemoTutorProfile } from "@/features/tutors/data";
import { CYCLES } from "@/lib/levels";
import type { SubjectCode, TeachingMode } from "@/types/domain";

const SUBJECTS: SubjectCode[] = ["MATH", "FR", "ANG", "HG", "SVT", "PC", "EC", "LV2", "PHILO"];
const MODES: TeachingMode[] = ["online", "home", "both"];

export async function generateMetadata() {
  const t = await getTranslations("tutorProfileForm");
  return { title: t("title") };
}

async function ProfileForm({ searchParams }: { searchParams: PageProps<"/prof/profil">["searchParams"] }) {
  const [params, profile, t, tSubjects, tLevels, tCycles, tModes] = await Promise.all([
    searchParams,
    getDemoTutorProfile(),
    getTranslations("tutorProfileForm"),
    getTranslations("subjects"),
    getTranslations("levels"),
    getTranslations("cycles"),
    getTranslations("tutors.modes"),
  ]);

  return (
    <div className="space-y-5">
      {params.enregistre ? <Notice tone="success">{t("saved")}</Notice> : null}
      {params.erreur ? <Notice tone="error">{t("error")}</Notice> : null}

      <form action={saveTutorProfileAction} className="space-y-5">
        <SectionCard id="presentation-titre" title={t("presentation")}>
          <div className="space-y-4">
            <Field id="headline" label={t("headline")} hint={t("headlineHint")}>
              <input id="headline" name="headline" required maxLength={120} defaultValue={profile.headline} className={INPUT_CLASS} />
            </Field>
            <Field id="bio" label={t("bio")} hint={t("bioHint")}>
              <textarea id="bio" name="bio" rows={5} maxLength={800} defaultValue={profile.bio} className={TEXTAREA_CLASS} />
            </Field>
          </div>
        </SectionCard>

        <SectionCard id="matieres-titre" title={t("teaching")}>
          <fieldset>
            <legend className="text-sm font-medium text-ink">{t("subjects")}</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {SUBJECTS.map((s) => (
                <ChipCheckbox key={s} name="subjects" value={s} label={tSubjects(s)} defaultChecked={profile.subjects.includes(s)} />
              ))}
            </div>
          </fieldset>
          <fieldset className="mt-5">
            <legend className="text-sm font-medium text-ink">{t("levels")}</legend>
            <div className="mt-2 space-y-3">
              {CYCLES.map((cycle) => (
                <div key={cycle.key}>
                  <p className="flex items-center gap-2 text-xs font-semibold text-ink-muted">
                    <CycleDot cycle={cycle.key} />
                    {tCycles(cycle.key)}
                  </p>
                  <div className="mt-1.5 flex flex-wrap gap-2">
                    {cycle.levels.map((l) => (
                      <ChipCheckbox key={l} name="levels" value={l} label={tLevels(l)} defaultChecked={profile.levels.includes(l)} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </fieldset>
        </SectionCard>

        <SectionCard id="tarif-titre" title={t("pricing")}>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field id="rate" label={t("rate")} hint={t("rateHint")}>
              <input id="rate" name="rate" type="number" min={1000} max={50000} step={100} required defaultValue={profile.hourlyRateFcfa} className={INPUT_CLASS} />
            </Field>
            <fieldset>
              <legend className="text-sm font-medium text-ink">{t("mode")}</legend>
              <div className="mt-1.5 space-y-2">
                {MODES.map((m) => (
                  <label key={m} className="flex items-center gap-2 text-sm text-ink">
                    <input type="radio" name="mode" value={m} defaultChecked={profile.mode === m} className="size-5 accent-brand-600" />
                    {tModes(m)}
                  </label>
                ))}
              </div>
            </fieldset>
          </div>
          <p className="mt-4 text-sm text-ink-muted">{t("zone", { city: profile.city, neighborhood: profile.neighborhood ?? "" })}</p>
          <label className="mt-4 flex gap-3 text-sm text-ink">
            <input type="checkbox" name="whatsapp" defaultChecked={profile.whatsappOptIn} className="mt-0.5 size-5 shrink-0 accent-brand-600" />
            <span>
              {t("whatsapp")}
              <span className="block text-xs text-ink-muted">{t("whatsappHint")}</span>
            </span>
          </label>
        </SectionCard>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button type="submit">{t("save")}</Button>
          <Link href={`/repetiteurs/${profile.id}`} className="inline-flex h-11 items-center gap-1.5 px-2 text-sm font-medium text-brand-700 hover:underline">
            <ExternalLink className="size-4" aria-hidden />
            {t("preview")}
          </Link>
        </div>
      </form>
    </div>
  );
}

export default async function TutorProfilePage({ searchParams }: PageProps<"/prof/profil">) {
  const t = await getTranslations("tutorProfileForm");
  return (
    <PageContainer className="space-y-5 lg:space-y-7">
      <PageHeader title={t("title")} subtitle={t("subtitle")} />
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_280px]">
        <Suspense fallback={<Skeleton className="h-96 rounded-2xl" />}>
          <ProfileForm searchParams={searchParams} />
        </Suspense>
        <aside>
          <DemoRoleSwitcher current="tutor" />
        </aside>
      </div>
    </PageContainer>
  );
}
