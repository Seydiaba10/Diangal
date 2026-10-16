import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ChapterStatusBadge, PremiumBadge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { cn } from "@/lib/cn";
import { subjectStyle } from "@/lib/subjects";
import type { ContinueItem } from "@/types/domain";

// Colonnes du tableau desktop, partagées par l'en-tête et les lignes.
const ROW_GRID = "md:grid-cols-[minmax(0,2fr)_minmax(0,1.3fr)_minmax(0,1.3fr)_auto]";

export async function ContinueLearning({ items }: { items: ContinueItem[] }) {
  const t = await getTranslations("dashboard.continue");
  return (
    <Card aria-labelledby="continuer-titre" className="p-4 sm:p-5">
      <CardHeader
        titleId="continuer-titre"
        title={
          <>
            {t("title")} <span className="whitespace-nowrap font-normal text-ink-muted">{t("count", { count: items.length })}</span>
          </>
        }
        action={
          <Link
            href="/eleve/cours"
            className="inline-flex h-11 shrink-0 items-center gap-1 rounded-xl px-2 text-sm font-medium text-brand-700 hover:bg-brand-50"
          >
            {t("seeAll")}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        }
      />

      {items.length === 0 ? (
        <p className="mt-4 text-sm text-ink-muted">{t("empty")}</p>
      ) : (
        <>
          <div
            aria-hidden
            className={cn("mt-5 hidden gap-4 px-4 text-xs font-medium text-ink-subtle md:grid", ROW_GRID)}
          >
            <span>{t("colChapter")}</span>
            <span>{t("colSubject")}</span>
            <span>{t("colProgress")}</span>
            <span className="w-28" />
          </div>
          <ul className="mt-3 space-y-3 md:mt-2">
            {items.map((item) => (
              <ContinueRow key={item.chapterId} item={item} />
            ))}
          </ul>
        </>
      )}
    </Card>
  );
}

async function ContinueRow({ item }: { item: ContinueItem }) {
  const t = await getTranslations("dashboard.continue");
  const style = subjectStyle(item.subject);
  const Icon = style.icon;
  const notStarted = item.status === "not_started";

  return (
    <li className={cn("grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-3 gap-y-3 rounded-xl border border-line p-3 md:gap-x-4 md:p-4", ROW_GRID)}>
      <div className="col-span-2 flex min-w-0 items-center gap-3 md:col-span-1">
        <span className={cn("flex size-11 shrink-0 items-center justify-center rounded-xl", style.soft, style.text)}>
          <Icon className="size-5" aria-hidden />
        </span>
        <div className="min-w-0">
          <p className="line-clamp-2 font-medium leading-snug text-ink">{item.chapterTitle}</p>
          <p className="truncate text-xs text-ink-muted">{t("nextLesson", { title: item.nextLessonTitle })}</p>
        </div>
      </div>

      <div className="col-span-2 flex flex-wrap items-center gap-1.5 md:col-span-1 md:flex-col md:items-start">
        <span className={cn("text-sm font-medium", style.text)}>{item.subjectName}</span>
        <span className="flex flex-wrap gap-1.5">
          <ChapterStatusBadge status={item.status} />
          {item.isPremium ? <PremiumBadge /> : null}
        </span>
      </div>

      <div className="col-span-2 md:col-span-1">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-ink">{item.progressPct} %</span>
          <span className="text-ink-muted">{t("lessons", { done: item.lessonsDone, total: item.lessonsTotal })}</span>
        </div>
        <ProgressBar
          value={item.progressPct}
          label={t("progress", { pct: item.progressPct, chapter: item.chapterTitle })}
          fillClassName={style.solid}
          className="mt-1.5"
        />
      </div>

      <ButtonLink
        href={item.href}
        variant={notStarted ? "primary" : "outline"}
        size="sm"
        className="col-span-2 md:col-span-1 md:w-28"
      >
        {notStarted ? t("start") : t("resume")}
      </ButtonLink>
    </li>
  );
}
