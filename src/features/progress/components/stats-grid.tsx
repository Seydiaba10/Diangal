import { BookCheck, ClipboardCheck, Flame, Trophy } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { StatCard } from "@/components/ui/stat-card";
import { formatScoreValue } from "@/lib/format";
import type { DashboardStats } from "@/types/domain";

export async function StatsGrid({ stats }: { stats: DashboardStats }) {
  const t = await getTranslations("dashboard.stats");
  return (
    <section aria-label={t("label")} className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
      <StatCard
        icon={<Trophy className="size-5" aria-hidden />}
        iconClassName="bg-brand-50 text-brand-700"
        label={t("average")}
        hint={t("averageHint")}
        value={formatScoreValue(stats.average20)}
        suffix={stats.average20 === null ? undefined : "/20"}
      />
      <StatCard
        icon={<BookCheck className="size-5" aria-hidden />}
        iconClassName="bg-success-50 text-success-700"
        label={t("chapters")}
        value={String(stats.chaptersCompleted)}
        suffix={t("outOf", { total: stats.chaptersTotal })}
      />
      <StatCard
        icon={<ClipboardCheck className="size-5" aria-hidden />}
        iconClassName="bg-info-50 text-info-700"
        label={t("quizzes")}
        value={String(stats.quizzesTaken)}
      />
      <StatCard
        icon={<Flame className="size-5" aria-hidden />}
        iconClassName="bg-flame-50 text-flame-500"
        label={t("streak")}
        value={String(stats.streakDays)}
      />
    </section>
  );
}
