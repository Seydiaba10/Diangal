import { BookOpen } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Card } from "@/components/ui/card";
import { RichText } from "@/components/ui/rich-text";
import type { AssessmentSummary } from "@/types/domain";

/** Page d'un cahier d'exercices officiel, telle que dans le document, avec sa source et l'origine du corrigé. */
export async function WorkbookPage({
  assessment,
  html,
  title,
  titleId,
}: {
  assessment: AssessmentSummary;
  html: string;
  title: string;
  titleId: string;
}) {
  const t = await getTranslations("workbook");
  return (
    <Card aria-labelledby={titleId} className="p-4 sm:p-5">
      <h2 id={titleId} className="flex items-center gap-2 font-semibold text-ink">
        <BookOpen className="size-4 text-brand-700" aria-hidden />
        {title}
      </h2>
      <RichText html={html} className="mt-4 text-base text-ink" />
      <div className="mt-5 space-y-1 border-t border-line pt-3 text-xs text-ink-muted">
        {assessment.workbook ? <p>{t("page", { page: assessment.workbook.page })}</p> : null}
        {assessment.sources?.map((source) => (
          <p key={source.title}>{t("source", { source: source.title })}</p>
        ))}
        {assessment.correctionSource ? <p>{t("correction", { correction: assessment.correctionSource })}</p> : null}
      </div>
    </Card>
  );
}
