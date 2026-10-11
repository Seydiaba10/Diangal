import { BookCheck, ChevronRight, Crown, Flame, ShieldAlert, Target, Trophy } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { LevelBadge } from "@/components/ui/level-badge";
import { StudentAvatar } from "@/components/ui/student-avatar";
import { formatDate, formatScore } from "@/lib/format";
import type { ChildOverview } from "@/types/domain";

export async function ChildCard({ child }: { child: ChildOverview }) {
  const t = await getTranslations("parentHome");
  const stats = [
    { icon: Trophy, label: t("average"), value: formatScore(child.average20) },
    { icon: BookCheck, label: t("chapters"), value: `${child.chaptersCompleted}/${child.chaptersTotal}` },
    { icon: Flame, label: t("streak"), value: String(child.streakDays) },
    { icon: Target, label: t("weakPoints"), value: String(child.weakPointsCount) },
  ];
  return (
    <article className="rounded-2xl border border-line bg-surface p-5">
      <div className="flex items-start gap-4">
        <StudentAvatar avatarKey={child.avatarKey} className="size-14" />
        <div className="min-w-0 flex-1">
          <h2 className="text-lg font-semibold text-ink">
            {child.firstName} {child.lastName}
          </h2>
          <p className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-ink-muted">
            <LevelBadge code={child.levelCode}>{child.levelName}</LevelBadge>
            {child.schoolName ? <span>{child.schoolName}</span> : null}
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {child.premiumUntil ? (
              <Badge tone="premium" icon={Crown}>
                {t("premiumUntil", { date: formatDate(child.premiumUntil) })}
              </Badge>
            ) : (
              <Badge tone="idle">{t("free")}</Badge>
            )}
            {child.consentStatus === "pending" ? (
              <Badge tone="danger" icon={ShieldAlert}>
                {t("consentPending")}
              </Badge>
            ) : null}
          </div>
        </div>
      </div>
      <dl className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {stats.map(({ icon: Icon, label, value }) => (
          <div key={label} className="rounded-xl bg-canvas p-3">
            <dt className="flex items-center gap-1.5 text-xs text-ink-muted">
              <Icon className="size-3.5" aria-hidden />
              {label}
            </dt>
            <dd className="mt-1 font-semibold text-ink">{value}</dd>
          </div>
        ))}
      </dl>
      {child.lastActivityAt ? (
        <p className="mt-3 text-xs text-ink-subtle">{t("lastActivity", { date: formatDate(child.lastActivityAt) })}</p>
      ) : null}
      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <ButtonLink href={`/parent/enfants/${child.id}`} size="sm" className="flex-1">
          {t("seeProgress")}
          <ChevronRight className="size-4" aria-hidden />
        </ButtonLink>
        <ButtonLink href="/parent/abonnements" variant="outline" size="sm" className="flex-1">
          {t("subscription")}
        </ButtonLink>
      </div>
    </article>
  );
}
