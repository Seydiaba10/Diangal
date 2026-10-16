import { ArrowRight, GraduationCap, History } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { INPUT_CLASS } from "@/components/ui/form";
import { LevelBadge } from "@/components/ui/level-badge";
import { Notice } from "@/components/ui/notice";
import { SectionCard } from "@/components/ui/section-card";
import { formatDate } from "@/lib/format";
import type { LevelCode } from "@/lib/levels";
import { promoteStudentAction } from "../actions";
import { getLevelHistory, promotionInfo } from "../data";

const STATUSES = ["ok", "confirmation", "serie", "fin", "erreur", "demo"] as const;
type Status = (typeof STATUSES)[number];

/**
 * Passage en classe supérieure, avec confirmation, et historique des classes.
 * audience « student » : l'élève lui-même (tutoiement) ; « parent » : son parent lié (vouvoiement).
 */
export async function PromotionCard({
  student,
  audience,
  back,
  status,
}: {
  student: { id: string | null; firstName: string; levelCode: string; seriesCode: string | null };
  audience: "student" | "parent";
  /** Page de retour (sans paramètre) : le résultat s'y affiche. */
  back: string;
  status?: string | string[];
}) {
  const [t, tLevels, history] = await Promise.all([
    getTranslations(`promotion.${audience}`),
    getTranslations("levels"),
    getLevelHistory(student.id ?? undefined),
  ]);
  const tCommon = await getTranslations("promotion");
  const info = promotionInfo(student.levelCode, student.seriesCode);
  const current = tLevels(student.levelCode as LevelCode);
  const done = STATUSES.find((s) => s === status) as Status | undefined;
  const levelLabel = (code: string, series: string | null) => `${tLevels(code as LevelCode)}${series ? ` ${series}` : ""}`;

  return (
    <SectionCard id="passage-titre" title={t("title")} subtitle={t("subtitle", { name: student.firstName })}>
      {done ? (
        <Notice tone={done === "ok" ? "success" : done === "demo" ? "info" : "error"} className="mb-4">
          {tCommon(`status.${done}`)}
        </Notice>
      ) : null}

      {info.nextLevel ? (
        <form action={promoteStudentAction.bind(null, student.id, back)} className="space-y-4">
          <p className="flex flex-wrap items-center gap-2 text-sm text-ink">
            <LevelBadge code={student.levelCode}>{levelLabel(student.levelCode, student.seriesCode)}</LevelBadge>
            <ArrowRight className="size-4 text-ink-muted" aria-hidden />
            <LevelBadge code={info.nextLevel}>{tLevels(info.nextLevel)}</LevelBadge>
          </p>
          {info.seriesOptions.length ? (
            <div>
              <label htmlFor="promotion-series" className="text-sm font-medium text-ink">
                {t("seriesLabel", { level: tLevels(info.nextLevel) })}
              </label>
              <select
                id="promotion-series"
                name="series"
                required
                defaultValue={info.defaultSeries ?? ""}
                className={`${INPUT_CLASS} mt-1.5`}
              >
                <option value="" disabled>
                  {tCommon("chooseSeries")}
                </option>
                {info.seriesOptions.map((code) => (
                  <option key={code} value={code}>
                    {code}
                  </option>
                ))}
              </select>
            </div>
          ) : null}
          <label className="flex items-start gap-3 text-sm text-ink">
            <input type="checkbox" name="confirm" required className="mt-0.5 size-5 shrink-0 accent-brand-600" />
            {t("confirm", { name: student.firstName, level: tLevels(info.nextLevel) })}
          </label>
          <p className="text-xs text-ink-muted">{tCommon("kept")}</p>
          <Button type="submit" size="sm">
            <GraduationCap className="size-4" aria-hidden />
            {t("submit", { level: tLevels(info.nextLevel) })}
          </Button>
        </form>
      ) : (
        <p className="flex items-center gap-2 text-sm text-ink">
          <GraduationCap className="size-5 text-brand-700" aria-hidden />
          {t("endOfTrack", { name: student.firstName, level: current })}
        </p>
      )}

      {history.length ? (
        <div className="mt-5 border-t border-line pt-4">
          <p className="flex items-center gap-2 text-sm font-medium text-ink">
            <History className="size-4 text-ink-muted" aria-hidden />
            {tCommon("historyTitle")}
          </p>
          <ul className="mt-2 space-y-1.5 text-sm text-ink">
            {history.map((h) => (
              <li key={h.endedAt} className="flex flex-wrap items-center gap-2">
                <LevelBadge code={h.levelCode}>{levelLabel(h.levelCode, h.seriesCode)}</LevelBadge>
                <span className="text-xs text-ink-muted">
                  {tCommon("period", { from: formatDate(h.startedAt), to: formatDate(h.endedAt) })}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </SectionCard>
  );
}
