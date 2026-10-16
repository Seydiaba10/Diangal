import { Crown, Lock } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Notice } from "@/components/ui/notice";
import { SectionCard } from "@/components/ui/section-card";
import { Skeleton } from "@/components/ui/skeleton";
import { getCurrentStudent } from "@/features/account/data";
import { createPracticeSessionAction } from "@/features/assessments/actions";
import { getPracticeOptions } from "@/features/assessments/data";
import { cn } from "@/lib/cn";
import type { PracticeChapterOption } from "@/types/domain";

type SearchParams = PageProps<"/eleve/exercices/preparer">["searchParams"];

const COUNTS = [5, 10, 15, 20] as const;
const ERRORS = ["chapitres", "nombre", "limite"] as const;

export async function generateMetadata() {
  const t = await getTranslations("prepare");
  return { title: t("title") };
}

/** Chapitres regroupés par rubrique, dans l'ordre du programme. */
function byStrand(chapters: PracticeChapterOption[]) {
  const groups: { strand: string | null; chapters: PracticeChapterOption[] }[] = [];
  for (const chapter of chapters) {
    const group = groups.find((g) => g.strand === chapter.strand);
    if (group) group.chapters.push(chapter);
    else groups.push({ strand: chapter.strand, chapters: [chapter] });
  }
  return groups;
}

const OPTION_CLASS =
  "flex min-h-11 cursor-pointer items-center gap-3 rounded-xl border border-line bg-surface px-4 py-2 text-sm text-ink has-[:checked]:border-brand-600 has-[:checked]:bg-brand-50";

async function PrepareForm({ searchParams }: { searchParams: SearchParams }) {
  const [{ matiere, erreur }, student, t] = await Promise.all([searchParams, getCurrentStudent(), getTranslations("prepare")]);
  const options = await getPracticeOptions(student.levelCode, student.seriesCode);
  if (!options.length) {
    return <p className="rounded-2xl border border-line bg-surface p-5 text-sm text-ink-muted">{t("noQuestions")}</p>;
  }
  // Par défaut : la première matière où l'élève a au moins un chapitre accessible.
  const selected =
    options.find((o) => o.subject.slug === matiere) ??
    options.find((o) => o.chapters.some((c) => !c.isPremium || student.isPremium)) ??
    options[0]!;
  const error = ERRORS.find((e) => e === erreur);

  return (
    <div className="space-y-5">
      {error ? <Notice tone="error">{t(`errors.${error}`)}</Notice> : null}

      <nav aria-label={t("subjectLabel")} className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        <ul className="flex gap-2 pb-1">
          {options.map(({ subject }) => {
            const active = subject.slug === selected.subject.slug;
            return (
              <li key={subject.slug}>
                <Link
                  href={`/eleve/exercices/preparer?matiere=${subject.slug}`}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "inline-flex h-11 shrink-0 items-center rounded-full border px-4 text-sm font-medium",
                    active ? "border-brand-600 bg-brand-600 text-white" : "border-line bg-surface text-ink-muted hover:text-ink",
                  )}
                >
                  {subject.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <form action={createPracticeSessionAction} className="space-y-5">
        <input type="hidden" name="subject" value={selected.subject.slug} />

        <SectionCard id="chapitres-titre" title={t("chaptersTitle")} subtitle={t("chaptersHint")}>
          <div className="space-y-4">
            {byStrand(selected.chapters).map((group) => (
              <fieldset key={group.strand ?? "-"} className="space-y-2">
                {group.strand ? (
                  <legend className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-muted">{group.strand}</legend>
                ) : (
                  <legend className="sr-only">{t("chaptersTitle")}</legend>
                )}
                {group.chapters.map((chapter) => {
                  const locked = chapter.isPremium && !student.isPremium;
                  return (
                    <label key={chapter.id} className={cn(OPTION_CLASS, locked && "cursor-not-allowed opacity-70")}>
                      <input
                        type="checkbox"
                        name="chapters"
                        value={chapter.id}
                        disabled={locked}
                        className="size-5 shrink-0 accent-brand-600"
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block font-medium">
                          {chapter.number}. {chapter.title}
                        </span>
                        <span className="block text-xs text-ink-muted">{t("questionsCount", { count: chapter.questionsCount })}</span>
                      </span>
                      {chapter.isPremium ? (
                        <Badge tone="premium" icon={locked ? Lock : Crown}>
                          {t("premium")}
                        </Badge>
                      ) : null}
                    </label>
                  );
                })}
              </fieldset>
            ))}
          </div>
          {selected.chapters.some((c) => c.isPremium) && !student.isPremium ? (
            <p className="mt-3 text-xs text-ink-muted">
              {t("premiumHint")}{" "}
              <Link href="/eleve/abonnement" className="font-medium text-brand-700 underline">
                {t("seeOffers")}
              </Link>
            </p>
          ) : null}
        </SectionCard>

        <div className="grid gap-5 lg:grid-cols-2">
          <SectionCard id="nombre-titre" title={t("countTitle")}>
            <fieldset>
              <legend className="sr-only">{t("countTitle")}</legend>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {COUNTS.map((count) => (
                  <label key={count} className={cn(OPTION_CLASS, "justify-center")}>
                    <input type="radio" name="count" value={count} defaultChecked={count === 10} className="size-5 accent-brand-600" />
                    {count}
                  </label>
                ))}
              </div>
            </fieldset>
          </SectionCard>

          <SectionCard id="mode-titre" title={t("modeTitle")}>
            <fieldset className="space-y-2">
              <legend className="sr-only">{t("modeTitle")}</legend>
              <label className={OPTION_CLASS}>
                <input type="radio" name="mode" value="libre" defaultChecked className="size-5 shrink-0 accent-brand-600" />
                <span>
                  <span className="block font-medium">{t("modes.free")}</span>
                  <span className="block text-xs text-ink-muted">{t("modes.freeHint")}</span>
                </span>
              </label>
              <label className={OPTION_CLASS}>
                <input type="radio" name="mode" value="chrono" className="size-5 shrink-0 accent-brand-600" />
                <span>
                  <span className="block font-medium">{t("modes.timed")}</span>
                  <span className="block text-xs text-ink-muted">{t("modes.timedHint")}</span>
                </span>
              </label>
            </fieldset>
          </SectionCard>
        </div>

        <Button type="submit" className="w-full sm:w-auto">
          {t("start")}
        </Button>
      </form>
    </div>
  );
}

export default async function PreparePage({ searchParams }: PageProps<"/eleve/exercices/preparer">) {
  const [t, tPages] = await Promise.all([getTranslations("prepare"), getTranslations("pages")]);
  return (
    <PageContainer className="space-y-5 lg:space-y-7">
      <Breadcrumb items={[{ label: tPages("practice"), href: "/eleve/exercices" }, { label: t("title") }]} />
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-ink">{t("title")}</h1>
        <p className="mt-1 text-sm text-ink-muted">{t("subtitle")}</p>
      </div>
      <Suspense fallback={<Skeleton className="h-96 rounded-2xl" />}>
        <PrepareForm searchParams={searchParams} />
      </Suspense>
    </PageContainer>
  );
}
