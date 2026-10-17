import { CircleCheck } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { RichText } from "@/components/ui/rich-text";
import type { AdminQuestion } from "@/features/admin/supabase";
import { cn } from "@/lib/cn";
import { formatDecimal } from "@/lib/format";

/** Réponse attendue d’une question ouverte : nombre au format français, sinon texte attendu ou accepté. */
function expectedAnswer(key: AdminQuestion["key"]): string {
  if (key.numericValue != null) return formatDecimal(key.numericValue);
  return key.expectedAnswer || key.acceptedTexts?.join(" / ") || "";
}

/** Questions d'une évaluation avec leur corrigé et l'explication (réservé à l'admin). */
export async function AnswerKeyList({ questions }: { questions: AdminQuestion[] }) {
  const t = await getTranslations("adminAssessments");
  return (
    <ol className="space-y-3">
      {questions.map(({ question, key }, i) => (
        <li key={question.id} className="rounded-2xl border border-line bg-surface p-5">
          <p className="flex justify-between text-sm text-ink-muted">
            <span>
              {i + 1}. {t(`types.${question.type}`)}
            </span>
            <span>{t("points", { points: question.points })}</span>
          </p>
          <RichText html={question.promptHtml} className="mt-2 text-ink" />
          {question.options.length > 0 ? (
            <ul className="mt-3 space-y-1.5">
              {question.options.map((o) => {
                const right = key.correctOptionIds?.includes(o.id);
                return (
                  <li
                    key={o.id}
                    className={cn("flex items-center gap-2 rounded-lg px-3 py-2 text-sm", right ? "bg-success-50 text-success-700" : "bg-canvas text-ink")}
                  >
                    {right ? <CircleCheck className="size-4 shrink-0" aria-hidden /> : <span className="size-4 shrink-0" />}
                    <RichText html={o.labelHtml} />
                    {right ? <span className="sr-only">{t("rightAnswer")}</span> : null}
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="mt-3 rounded-lg bg-success-50 px-3 py-2 text-sm text-success-700">
              {t("expected", { answer: expectedAnswer(key) })}
            </p>
          )}
          {question.explanationHtml ? (
            <div className="mt-3 border-t border-line pt-3 text-sm text-ink-muted">
              <p className="font-medium text-ink">{t("explanation")}</p>
              <RichText html={question.explanationHtml} />
            </div>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
