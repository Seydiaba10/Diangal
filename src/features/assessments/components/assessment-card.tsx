import { ClipboardList, PenLine, Timer, Trophy } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Badge, PremiumBadge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { SubjectIcon } from "@/components/ui/subject-icon";
import { formatDuration, formatScore } from "@/lib/format";
import type { AssessmentSummary } from "@/types/domain";

export async function AssessmentCard({ assessment }: { assessment: AssessmentSummary }) {
  const t = await getTranslations("assessment");
  const timed = assessment.durationS !== null;
  return (
    <article className="flex h-full flex-col rounded-2xl border border-line bg-surface p-4 sm:p-5">
      <div className="flex items-start gap-3">
        <SubjectIcon code={assessment.subject.code} size="sm" />
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium text-ink-muted">{assessment.subject.name}</p>
          <h3 className="font-semibold leading-snug text-ink">{assessment.title}</h3>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        <Badge tone={timed ? "brand" : "info"} icon={timed ? Timer : PenLine}>
          {t(`kind.${assessment.kind}`)}
        </Badge>
        {assessment.isPremium ? <PremiumBadge /> : null}
      </div>

      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-ink-muted">
        <li className="flex items-center gap-1.5">
          <ClipboardList className="size-4" aria-hidden />
          {t("questions", { count: assessment.questionsCount })}
        </li>
        <li className="flex items-center gap-1.5">
          <Timer className="size-4" aria-hidden />
          {timed ? formatDuration(assessment.durationS!) : t("untimed")}
        </li>
        {assessment.bestScore20 !== null ? (
          <li className="flex items-center gap-1.5 font-medium text-ink">
            <Trophy className="size-4 text-premium-500" aria-hidden />
            {t("bestScore", { score: formatScore(assessment.bestScore20) })}
          </li>
        ) : null}
      </ul>
      {/* Épreuve d'examen : on dit toujours d'où vient le corrigé (officiel ou rédigé par DIANGAL). */}
      {assessment.correctionSource ? <p className="mt-2 text-xs text-ink-muted">{assessment.correctionSource}</p> : null}

      <ButtonLink
        href={`/eleve/evaluations/${assessment.id}`}
        variant={assessment.bestScore20 !== null ? "outline" : "primary"}
        size="sm"
        className="mt-4 w-full sm:mt-auto sm:w-auto sm:self-start"
      >
        {assessment.bestScore20 !== null ? t("retry") : t("start")}
      </ButtonLink>
    </article>
  );
}
