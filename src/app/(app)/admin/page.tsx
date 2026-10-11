import { BookOpenCheck, ChevronRight, ClipboardCheck, Crown, Flag, GraduationCap, UserCheck, Users, Wallet } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { ProgressBar } from "@/components/ui/progress-bar";
import { SectionCard } from "@/components/ui/section-card";
import { Skeleton } from "@/components/ui/skeleton";
import { StatCard } from "@/components/ui/stat-card";
import { BarChart } from "@/features/admin/components/bar-chart";
import { getAdminStats } from "@/features/admin/data";
import { formatFCFA } from "@/lib/format";

export async function generateMetadata() {
  const t = await getTranslations("adminHome");
  return { title: t("title") };
}

const DAY_FORMAT = new Intl.DateTimeFormat("fr-FR", { weekday: "short", timeZone: "Africa/Dakar" });

async function AdminHome() {
  const [stats, t, tCheckout] = await Promise.all([getAdminStats(), getTranslations("adminHome"), getTranslations("checkout")]);
  const maxRevenue = Math.max(1, ...stats.revenueByChannel.map((c) => c.amountFcfa));
  const tiles = [
    { icon: GraduationCap, tint: "bg-brand-50 text-brand-700", label: t("students"), value: stats.students.toLocaleString("fr-FR") },
    { icon: Users, tint: "bg-info-50 text-info-700", label: t("parents"), value: stats.parents.toLocaleString("fr-FR") },
    { icon: UserCheck, tint: "bg-success-50 text-success-700", label: t("tutors"), value: String(stats.tutorsApproved) },
    { icon: Crown, tint: "bg-premium-50 text-premium-700", label: t("premium"), value: String(stats.premiumStudents) },
    { icon: Wallet, tint: "bg-pastel-sage text-subject-svt", label: t("revenue"), value: formatFCFA(stats.revenueMonthFcfa) },
    { icon: ClipboardCheck, tint: "bg-pastel-lavender text-subject-philo", label: t("quizzes"), value: stats.quizzesThisWeek.toLocaleString("fr-FR") },
  ];

  return (
    <div className="space-y-5 lg:space-y-7">
      <section aria-label={t("kpis")} className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 2xl:grid-cols-6">
        {tiles.map(({ icon: Icon, tint, label, value }) => (
          <StatCard key={label} icon={<Icon className="size-5" aria-hidden />} iconClassName={tint} label={label} value={value} />
        ))}
      </section>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_380px]">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <SectionCard id="inscriptions-titre" title={t("signups")} subtitle={t("signupsHint")}>
            <BarChart
              label={t("signups")}
              data={stats.signupsByDay.map((d) => ({ label: DAY_FORMAT.format(new Date(`${d.day}T12:00:00Z`)), value: d.count }))}
            />
          </SectionCard>
          <SectionCard id="revenus-titre" title={t("revenueByChannel")}>
            <ul className="space-y-4">
              {stats.revenueByChannel.map((c) => (
                <li key={c.channel}>
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-ink">{tCheckout(`channels.${c.channel}.name`)}</span>
                    <span className="text-ink-muted">{formatFCFA(c.amountFcfa)}</span>
                  </div>
                  <ProgressBar value={(c.amountFcfa / maxRevenue) * 100} label={tCheckout(`channels.${c.channel}.name`)} className="mt-1.5" />
                </li>
              ))}
            </ul>
          </SectionCard>
        </div>

        <SectionCard id="taches-titre" title={t("tasks")}>
          <ul className="space-y-2">
            {[
              { href: "/admin/repetiteurs?statut=pending", icon: UserCheck, label: t("tasksTutors", { count: stats.tutorsPending }) },
              { href: "/admin/signalements", icon: Flag, label: t("tasksReports", { count: stats.reportsOpen }) },
              { href: "/admin/contenus", icon: BookOpenCheck, label: t("tasksContent") },
            ].map(({ href, icon: Icon, label }) => (
              <li key={href}>
                <Link href={href} className="flex items-center gap-3 rounded-xl border border-line p-3 text-sm hover:border-brand-500">
                  <Icon className="size-5 text-brand-700" aria-hidden />
                  <span className="flex-1 font-medium text-ink">{label}</span>
                  <ChevronRight className="size-4 text-ink-subtle" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-ink-subtle">{t("mfaNote")}</p>
        </SectionCard>
      </div>
    </div>
  );
}

export default async function AdminHomePage() {
  const t = await getTranslations("adminHome");
  return (
    <PageContainer width="wide" className="space-y-5 lg:space-y-7">
      <PageHeader title={t("title")} subtitle={t("subtitle")} />
      <Suspense fallback={<Skeleton className="h-96 rounded-2xl" />}>
        <AdminHome />
      </Suspense>
    </PageContainer>
  );
}
