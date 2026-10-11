import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Card, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/cn";
import { formatScore } from "@/lib/format";
import { SUBJECT_STYLES } from "@/lib/subjects";
import type { WeakPoint } from "@/types/domain";

export async function WeakPoints({ items }: { items: WeakPoint[] }) {
  const t = await getTranslations("dashboard.weak");
  return (
    <Card aria-labelledby="points-faibles-titre" className="p-4 sm:p-5">
      <CardHeader titleId="points-faibles-titre" title={t("title")} subtitle={t("subtitle")} />
      {items.length === 0 ? (
        <p className="mt-4 flex items-center gap-2 text-sm text-ink-muted">
          <Sparkles className="size-4 text-brand-600" aria-hidden />
          {t("empty")}
        </p>
      ) : (
        <ul className="mt-4 space-y-3">
          {items.map((item) => {
            const style = SUBJECT_STYLES[item.subject];
            const Icon = style.icon;
            return (
              <li key={item.chapterId} className={cn("rounded-xl p-3.5", style.soft)}>
                <div className="flex items-start gap-3">
                  <span className={cn("flex size-10 shrink-0 items-center justify-center rounded-xl bg-surface", style.text)}>
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium leading-snug text-ink">{item.chapterTitle}</p>
                    <p className="mt-0.5 text-xs text-ink-muted">
                      <span className={cn("font-medium", style.text)}>{item.subjectName}</span>
                      {" · "}
                      <span
                        className={cn(
                          "whitespace-nowrap font-semibold",
                          item.lastScore20 < 10 ? "text-danger-700" : "text-premium-700",
                        )}
                      >
                        {t("lastScore", { score: formatScore(item.lastScore20) })}
                      </span>
                    </p>
                  </div>
                </div>
                <Link
                  href={item.href}
                  className="ml-11 mt-1 inline-flex h-11 items-center gap-1 whitespace-nowrap rounded-xl px-2 text-sm font-medium text-brand-700 hover:bg-surface"
                >
                  {t(`actions.${item.action}`)}
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </Card>
  );
}
