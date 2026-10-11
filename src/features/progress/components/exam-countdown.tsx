import { ArrowRight, CalendarDays } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { cn } from "@/lib/cn";
import { formatDate } from "@/lib/format";
import { CYCLE_STYLES, cycleOfExam } from "@/lib/levels";
import type { NextExam } from "@/types/domain";

// Couleur du cycle de l'examen : CFEE vert, BFEM jaune, Bac rouge.
export async function ExamCountdown({ exam }: { exam: NextExam }) {
  const [t, tExams] = await Promise.all([getTranslations("dashboard.exam"), getTranslations("examNames")]);
  const style = CYCLE_STYLES[cycleOfExam(exam.type)];
  const examName = tExams(exam.type);
  return (
    <section aria-labelledby="examen-titre" className={cn("relative overflow-hidden rounded-2xl p-5", style.solid, style.onSolid)}>
      {/* Décor léger en CSS pur, sans image : assombrit le fond, le texte reste lisible. */}
      <span aria-hidden className="absolute -right-10 -top-10 size-36 rounded-full bg-black/10" />
      <span aria-hidden className="absolute -bottom-12 right-10 size-24 rounded-full bg-black/5" />

      <div className="relative">
        <div className="flex items-center justify-between gap-2">
          <h2 id="examen-titre" className="text-sm font-semibold">
            {t("title", { exam: examName, year: exam.year })}
          </h2>
          {exam.isOfficial ? null : (
            <span className="rounded-full bg-black/15 px-2.5 py-1 text-xs font-medium">{t("indicative")}</span>
          )}
        </div>

        {exam.daysLeft === 0 ? (
          <p className="mt-3 text-2xl font-semibold">{t("today")}</p>
        ) : (
          <p className="mt-2 flex items-baseline gap-2">
            <span className="text-5xl font-semibold tracking-tight">{exam.daysLeft}</span>
            <span className="text-base font-medium">{t("daysLeft", { days: exam.daysLeft })}</span>
          </p>
        )}

        <p className="mt-2 flex items-center gap-1.5 text-sm">
          <CalendarDays className="size-4" aria-hidden />
          {t("startsOn", { date: formatDate(exam.startsOn) })}
        </p>
        <p className="mt-3 text-sm">{t("tip")}</p>
        <Link
          href="/eleve/examens"
          className={cn("mt-4 inline-flex h-11 items-center gap-1.5 rounded-xl bg-white px-4 text-sm font-semibold hover:bg-canvas", style.text)}
        >
          {t("cta", { exam: examName })}
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>
    </section>
  );
}
