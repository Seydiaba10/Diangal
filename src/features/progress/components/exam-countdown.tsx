import { ArrowRight, CalendarDays } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { formatDate } from "@/lib/format";
import type { NextExam } from "@/types/domain";

export async function ExamCountdown({ exam }: { exam: NextExam }) {
  const t = await getTranslations("dashboard.exam");
  return (
    <section
      aria-labelledby="examen-titre"
      className="relative overflow-hidden rounded-2xl bg-brand-600 p-5 text-white"
    >
      {/* Décor léger en CSS pur, sans image */}
      <span aria-hidden className="absolute -right-10 -top-10 size-36 rounded-full bg-brand-500" />
      <span aria-hidden className="absolute -bottom-12 right-10 size-24 rounded-full bg-brand-700" />

      <div className="relative">
        <div className="flex items-center justify-between gap-2">
          <h2 id="examen-titre" className="text-sm font-medium text-brand-50">
            {t("title", { exam: exam.type, year: exam.year })}
          </h2>
          {exam.isOfficial ? null : (
            <span className="rounded-full bg-brand-800 px-2.5 py-1 text-xs font-medium text-brand-50">
              {t("indicative")}
            </span>
          )}
        </div>

        {exam.daysLeft === 0 ? (
          <p className="mt-3 text-2xl font-semibold">{t("today")}</p>
        ) : (
          <p className="mt-2 flex items-baseline gap-2">
            <span className="text-5xl font-semibold tracking-tight">{exam.daysLeft}</span>
            <span className="text-base font-medium text-brand-50">{t("daysLeft", { days: exam.daysLeft })}</span>
          </p>
        )}

        <p className="mt-2 flex items-center gap-1.5 text-sm text-brand-50">
          <CalendarDays className="size-4" aria-hidden />
          {t("startsOn", { date: formatDate(exam.startsOn) })}
        </p>
        <p className="mt-3 text-sm text-white">{t("tip")}</p>
        <Link
          href="/eleve/examens"
          className="mt-4 inline-flex h-11 items-center gap-1.5 rounded-xl bg-white px-4 text-sm font-semibold text-brand-700 hover:bg-brand-50"
        >
          {t("cta", { exam: exam.type })}
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>
    </section>
  );
}
