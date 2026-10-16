import { BookOpen, CircleCheck, CirclePause } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Field, INPUT_CLASS } from "@/components/ui/form";
import { LevelBadge } from "@/components/ui/level-badge";
import { Notice } from "@/components/ui/notice";
import { SectionCard } from "@/components/ui/section-card";
import { Skeleton } from "@/components/ui/skeleton";
import { SubjectIcon } from "@/components/ui/subject-icon";
import {
  addProgramAction,
  createSubjectAction,
  removeProgramAction,
  setFreeTierAction,
  updateProgramAction,
} from "@/features/admin/actions";
import { LevelTabs, pickLevel } from "@/features/admin/components/level-tabs";
import { getAdminPrograms, getContentTracking, getFreeTierEnabled, getSubjectOptions } from "@/features/admin/data";
import { CYCLES, cycleOf, SERIES_BY_LEVEL } from "@/lib/levels";
import type { SubjectCode } from "@/types/domain";

const SAVED = ["programme", "gratuits", "retrait", "matiere", "offreActive", "offreInactive"] as const;
const ERRORS = ["programme", "doublon", "gratuits", "retrait", "matiere", "matiereExiste", "offre"] as const;

export async function generateMetadata() {
  const t = await getTranslations("adminReferential");
  return { title: t("title") };
}

async function Referential({ searchParams }: { searchParams: PageProps<"/admin/referentiel">["searchParams"] }) {
  const query = await searchParams;
  const level = pickLevel(query.classe);
  const [programs, tracking, subjects, freeTier, t, tLevels, tCycles] = await Promise.all([
    getAdminPrograms(level),
    getContentTracking(),
    getSubjectOptions(),
    getFreeTierEnabled(),
    getTranslations("adminReferential"),
    getTranslations("levels"),
    getTranslations("cycles"),
  ]);
  const cycle = cycleOf(level)!;
  const exam = CYCLES.find((c) => c.key === cycle)!.exam;
  const series = SERIES_BY_LEVEL[level] ?? [];
  const saved = SAVED.find((s) => s === query.enregistre);
  const error = ERRORS.find((e) => e === query.erreur);

  return (
    <div className="space-y-5">
      <LevelTabs basePath="/admin/referentiel" current={level} filled={new Set(tracking.filter((r) => r.chapters > 0).map((r) => r.levelCode))} />
      {query.demo ? <Notice tone="info">{t("demo")}</Notice> : null}
      {saved ? <Notice tone="success">{t(`saved.${saved}`)}</Notice> : null}
      {error ? <Notice tone="error">{t(`errors.${error}`)}</Notice> : null}

      <SectionCard id="offre-titre" title={t("freeTier.title")} subtitle={t("freeTier.hint")}>
        <div className="flex flex-wrap items-center gap-3">
          <Badge tone={freeTier ? "success" : "idle"} icon={freeTier ? CircleCheck : CirclePause}>
            {freeTier ? t("freeTier.on") : t("freeTier.off")}
          </Badge>
          <form action={setFreeTierAction.bind(null, !freeTier, level)}>
            <Button type="submit" size="sm" variant={freeTier ? "outline" : "primary"}>
              {freeTier ? t("freeTier.disable") : t("freeTier.enable")}
            </Button>
          </form>
        </div>
        {!freeTier ? <p className="mt-3 text-xs text-ink-muted">{t("freeTier.warning")}</p> : null}
      </SectionCard>

      <SectionCard
        id="classe-titre"
        title={t("classTitle", { level: tLevels(level) })}
        subtitle={t("classInfo", { cycle: tCycles(cycle), exam })}
      >
        {series.length ? (
          <p className="text-sm text-ink">{t("seriesList", { series: series.join(", ") })}</p>
        ) : (
          <p className="text-sm text-ink-muted">{t("noSeries")}</p>
        )}
      </SectionCard>

      <SectionCard id="matieres-titre" title={t("programs")} subtitle={t("freeHint")}>
        {programs.length === 0 ? <p className="text-sm text-ink-muted">{t("programsEmpty")}</p> : null}
        <ul className="divide-y divide-line">
          {programs.map((program) => (
            <li key={program.id} className="flex flex-col gap-3 py-3 sm:flex-row sm:items-center">
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <SubjectIcon code={program.subjectCode as SubjectCode} size="sm" />
                <div className="min-w-0">
                  <p className="flex flex-wrap items-center gap-2 font-semibold text-ink">
                    {program.subjectName}
                    <LevelBadge code={program.levelCode}>
                      {program.seriesCode ? t("seriesBadge", { series: program.seriesCode }) : t("common")}
                    </LevelBadge>
                  </p>
                  <p className="text-xs text-ink-muted">{t("chaptersCount", { count: program.chapters.length })}</p>
                </div>
              </div>
              <div className="flex flex-wrap items-end gap-2">
                <form action={updateProgramAction.bind(null, program.id, level)} className="flex items-end gap-2">
                  <div>
                    <label htmlFor={`free-${program.id}`} className="text-xs text-ink-muted">
                      {t("freeChapters")}
                    </label>
                    <input
                      id={`free-${program.id}`}
                      name="freeChapters"
                      type="number"
                      min={0}
                      max={50}
                      defaultValue={program.freeChapters}
                      className="h-11 w-20 rounded-xl border border-line bg-surface px-3 text-sm text-ink focus:border-brand-600"
                    />
                  </div>
                  <Button type="submit" size="sm" variant="outline">
                    {t("save")}
                  </Button>
                </form>
                {program.chapters.length === 0 ? (
                  <form action={removeProgramAction.bind(null, program.id, level)}>
                    <Button type="submit" size="sm" variant="ghost" className="text-danger-700 hover:bg-danger-50">
                      {t("remove")}
                    </Button>
                  </form>
                ) : (
                  <Link
                    href={`/admin/contenus?classe=${level}`}
                    className="inline-flex h-11 items-center gap-1 rounded-lg px-2 text-sm font-medium text-brand-700 hover:bg-brand-50"
                  >
                    <BookOpen className="size-4" aria-hidden />
                    {t("openContents")}
                  </Link>
                )}
              </div>
            </li>
          ))}
        </ul>
      </SectionCard>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <SectionCard id="ajout-titre" title={t("add")} subtitle={t("addHint", { level: tLevels(level) })}>
          <form action={addProgramAction} className="space-y-4">
            <input type="hidden" name="level" value={level} />
            <Field id="subject" label={t("subject")}>
              <select id="subject" name="subject" required className={INPUT_CLASS}>
                {subjects.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </Field>
            {series.length ? (
              <Field id="series" label={t("seriesLabel")}>
                <select id="series" name="series" className={INPUT_CLASS}>
                  <option value="">{t("seriesCommon")}</option>
                  {series.map((code) => (
                    <option key={code} value={code}>
                      {code}
                    </option>
                  ))}
                </select>
              </Field>
            ) : null}
            <Button type="submit" size="sm">
              {t("addSubmit")}
            </Button>
          </form>
        </SectionCard>

        <SectionCard id="creation-titre" title={t("newSubject")} subtitle={t("newSubjectHint")}>
          <form action={createSubjectAction} className="space-y-4">
            <input type="hidden" name="level" value={level} />
            <div className="grid gap-4 sm:grid-cols-[130px_1fr]">
              <Field id="code" label={t("code")} hint={t("codeHint")}>
                <input id="code" name="code" required pattern="[A-Za-z]{2,6}" maxLength={6} className={`${INPUT_CLASS} uppercase`} />
              </Field>
              <Field id="name" label={t("name")}>
                <input id="name" name="name" required minLength={2} maxLength={40} className={INPUT_CLASS} />
              </Field>
            </div>
            <Button type="submit" size="sm" variant="outline">
              {t("create")}
            </Button>
          </form>
        </SectionCard>
      </div>
    </div>
  );
}

export default async function AdminReferentialPage({ searchParams }: PageProps<"/admin/referentiel">) {
  const t = await getTranslations("adminReferential");
  return (
    <PageContainer width="wide" className="space-y-5 lg:space-y-7">
      <PageHeader title={t("title")} subtitle={t("subtitle")} />
      <Suspense fallback={<Skeleton className="h-96 rounded-2xl" />}>
        <Referential searchParams={searchParams} />
      </Suspense>
    </PageContainer>
  );
}
