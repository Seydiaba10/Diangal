import { BookOpen, CircleCheck, CircleMinus, CircleX, Clock, RotateCcw, Target } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RichText } from "@/components/ui/rich-text";
import { cn } from "@/lib/cn";
import { formatDate, formatDuration, formatScoreValue } from "@/lib/format";
import type { AttemptResult, QuestionReview } from "@/types/domain";
import { getAttemptResult } from "../data";

type Band = "excellent" | "good" | "average" | "low";

function bandOf(score20: number): Band {
  if (score20 >= 16) return "excellent";
  if (score20 >= 12) return "good";
  if (score20 >= 10) return "average";
  return "low";
}

const BAND_STYLES: Record<Band, string> = {
  excellent: "bg-success-50 text-success-700",
  good: "bg-brand-50 text-brand-700",
  average: "bg-premium-50 text-premium-700",
  low: "bg-danger-50 text-danger-700",
};

type ReviewStatus = "correct" | "partial" | "wrong" | "empty";

function statusOf(q: QuestionReview): ReviewStatus {
  const empty = q.response === null || (Array.isArray(q.response) ? q.response.length === 0 : !q.response.trim());
  if (empty) return "empty";
  if (q.isCorrect) return "correct";
  return q.pointsAwarded > 0 ? "partial" : "wrong";
}

const STATUS_BADGES = {
  correct: { tone: "success", icon: CircleCheck },
  partial: { tone: "premium", icon: CircleMinus },
  wrong: { tone: "danger", icon: CircleX },
  empty: { tone: "idle", icon: CircleMinus },
} as const;

export async function ResultView({ attemptId }: { attemptId: string }) {
  const [result, t] = await Promise.all([getAttemptResult(attemptId), getTranslations("result")]);
  if (!result) {
    return (
      <div className="py-12 text-center">
        <p className="text-ink">{t("notFound")}</p>
        <ButtonLink href="/eleve/exercices" variant="outline" className="mt-6">
          {t("backToPractice")}
        </ButtonLink>
      </div>
    );
  }

  const band = bandOf(result.score20);
  return (
    <div className="space-y-5">
      <ScoreCard result={result} band={band} />
      <section aria-labelledby="correction-titre" className="space-y-3">
        <h2 id="correction-titre" className="text-lg font-semibold text-ink">
          {t("reviewTitle")}
        </h2>
        <ol className="space-y-3">
          {result.questions.map((q, i) => (
            <li key={q.id}>
              <QuestionReviewCard question={q} number={i + 1} />
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}

async function ScoreCard({ result, band }: { result: AttemptResult; band: Band }) {
  const t = await getTranslations("result");
  const { assessment } = result;
  return (
    <Card className="overflow-hidden">
      <div className={cn("px-5 py-6 text-center sm:py-8", BAND_STYLES[band])}>
        <p className="text-sm font-medium">{assessment.subject.name}</p>
        <h1 className="mt-1 text-lg font-semibold text-ink">{assessment.title}</h1>
        <p className="mt-4 text-sm font-medium">{t("score")}</p>
        <p className="mt-1 flex items-baseline justify-center gap-1">
          <span className="text-6xl font-semibold tracking-tight">{formatScoreValue(result.score20)}</span>
          <span className="text-xl font-medium">/20</span>
        </p>
        <p className="mt-2 text-base font-semibold">{t(`mention.${band}`)}</p>
      </div>
      <div className="space-y-4 p-5">
        <ul className="grid grid-cols-1 gap-2 text-sm text-ink-muted sm:grid-cols-3">
          <li className="flex items-center gap-2">
            <CircleCheck className="size-4 text-success-500" aria-hidden />
            {t("correct", { correct: result.correctCount, total: result.questions.length })}
          </li>
          <li className="flex items-center gap-2">
            <Target className="size-4 text-brand-600" aria-hidden />
            {t("points", { score: formatScoreValue(result.score), max: result.maxScore })}
          </li>
          <li className="flex items-center gap-2">
            <Clock className="size-4 text-ink-subtle" aria-hidden />
            {t("duration", { duration: formatDuration(result.durationS) })}
          </li>
        </ul>
        <p className="text-xs text-ink-subtle">
          {t("submittedAt", { date: formatDate(result.submittedAt) })}
          {result.late ? ` · ${t("late")}` : ""}
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          {assessment.chapterHref ? (
            <ButtonLink href={assessment.chapterHref} variant="outline" className="flex-1">
              <BookOpen className="size-4" aria-hidden />
              {t("reviewLesson")}
            </ButtonLink>
          ) : null}
          {/* Séance personnelle : on en prépare une nouvelle (autres questions tirées au hasard). */}
          <ButtonLink
            href={
              assessment.isPersonal
                ? `/eleve/exercices/preparer?matiere=${encodeURIComponent(assessment.subject.slug)}`
                : `/eleve/evaluations/${assessment.id}`
            }
            className="flex-1"
          >
            <RotateCcw className="size-4" aria-hidden />
            {assessment.isPersonal ? t("prepareAnother") : t("retry")}
          </ButtonLink>
        </div>
      </div>
    </Card>
  );
}

async function QuestionReviewCard({ question, number }: { question: QuestionReview; number: number }) {
  const t = await getTranslations("result");
  const status = statusOf(question);
  const badge = STATUS_BADGES[status];
  const picked = Array.isArray(question.response) ? question.response : [];
  const isChoice = question.options.length > 0;

  return (
    <Card className="p-4 sm:p-5">
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-semibold text-ink-muted">{number}.</span>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-ink-muted">
            {t("pointsAwarded", { awarded: formatScoreValue(question.pointsAwarded), points: question.points })}
          </span>
          <Badge tone={badge.tone} icon={badge.icon}>
            {t(`status.${status}`)}
          </Badge>
        </div>
      </div>
      <RichText html={question.promptHtml} className="mt-2 text-ink" />

      {isChoice ? (
        <ul className="mt-3 space-y-2">
          {question.options.map((option) => {
            const isRight = question.correctOptionIds.includes(option.id);
            const isPicked = picked.includes(option.id);
            return (
              <li
                key={option.id}
                className={cn(
                  "rounded-xl border px-3 py-2.5",
                  isRight && "border-success-500 bg-success-50",
                  isPicked && !isRight && "border-danger-500 bg-danger-50",
                  !isRight && !isPicked && "border-line",
                )}
              >
                <div className="flex items-center gap-3">
                  {isRight ? (
                    <CircleCheck className="size-4 shrink-0 text-success-700" aria-hidden />
                  ) : isPicked ? (
                    <CircleX className="size-4 shrink-0 text-danger-700" aria-hidden />
                  ) : (
                    <span className="size-4 shrink-0" />
                  )}
                  <RichText html={option.labelHtml} className="min-w-0 flex-1 text-sm text-ink" />
                </div>
                {isPicked || isRight ? (
                  <div className="mt-1.5 flex flex-wrap gap-1.5 pl-7">
                    {isPicked ? <Badge tone={isRight ? "success" : "danger"}>{t("yourChoice")}</Badge> : null}
                    {isRight ? <Badge tone="success">{t("rightAnswer")}</Badge> : null}
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="mt-3 space-y-1 text-sm">
          <p className={question.isCorrect ? "font-medium text-success-700" : "font-medium text-danger-700"}>
            {status === "empty"
              ? t("noAnswer")
              : t("yourAnswer", { answer: typeof question.response === "string" ? question.response : "" })}
          </p>
          {!question.isCorrect && question.expectedAnswer ? (
            <p className="text-ink">{t("expected", { answer: question.expectedAnswer })}</p>
          ) : null}
        </div>
      )}

      <div className="mt-4 rounded-xl bg-brand-50 p-3.5">
        <p className="text-sm font-semibold text-brand-800">{t("explanation")}</p>
        <RichText html={question.explanationHtml} className="mt-1 text-sm text-ink" />
      </div>
    </Card>
  );
}
