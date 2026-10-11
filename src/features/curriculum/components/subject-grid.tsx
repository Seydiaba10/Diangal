import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Skeleton } from "@/components/ui/skeleton";
import { SubjectIcon } from "@/components/ui/subject-icon";
import { SUBJECT_STYLES } from "@/lib/subjects";
import { getSubjectsProgress } from "../data";

export async function SubjectGrid() {
  const [subjects, t] = await Promise.all([getSubjectsProgress(), getTranslations("courses")]);
  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3">
      {subjects.map((subject) => (
        <li key={subject.code}>
          <Link
            href={`/eleve/cours/${subject.slug}`}
            className="flex h-full flex-col rounded-2xl border border-line bg-surface p-4 transition-colors hover:border-brand-500 sm:p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <SubjectIcon code={subject.code} />
              <span className="rounded-full bg-canvas px-2.5 py-1 text-xs font-medium text-ink-muted">
                {t("coefficient", { value: subject.coefficient })}
              </span>
            </div>
            <p className="mt-3 text-lg font-semibold text-ink">{subject.name}</p>
            <div className="mt-auto pt-4">
              <ProgressBar
                value={subject.progressPct}
                label={t("progressLabel", { subject: subject.name })}
                fillClassName={SUBJECT_STYLES[subject.code].solid}
              />
              <p className="mt-2 text-xs text-ink-muted">
                {t("chaptersDone", { done: subject.chaptersCompleted, total: subject.chaptersTotal })}
              </p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function SubjectGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3">
      {Array.from({ length: 6 }, (_, i) => (
        <Skeleton key={i} className="h-40 rounded-2xl" />
      ))}
    </div>
  );
}
