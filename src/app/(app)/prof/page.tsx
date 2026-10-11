import { CalendarClock, CircleCheck, CircleDashed, Eye, MessageCircle, ShieldCheck, Star } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { ButtonLink } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress-bar";
import { SectionCard } from "@/components/ui/section-card";
import { Skeleton } from "@/components/ui/skeleton";
import { StatCard } from "@/components/ui/stat-card";
import { getConversations } from "@/features/messaging/data";
import { getTutorDashboard } from "@/features/tutors/data";
import { formatDecimal } from "@/lib/format";

export async function generateMetadata() {
  const t = await getTranslations("tutorHome");
  return { title: t("metaTitle") };
}

async function TutorHome() {
  const [{ profile, checklist, completion, stats }, conversations, t] = await Promise.all([
    getTutorDashboard(),
    getConversations(),
    getTranslations("tutorHome"),
  ]);
  return (
    <div className="space-y-5 lg:space-y-7">
      <PageHeader title={t("greeting", { name: profile.displayName.split(" ")[0] ?? "" })} subtitle={t("subtitle")} />

      <p className="flex items-center gap-2 rounded-2xl bg-success-50 px-5 py-4 text-sm font-medium text-success-700">
        <ShieldCheck className="size-5 shrink-0" aria-hidden />
        {t("verified")}
      </p>

      <section aria-label={t("statsLabel")} className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
        <StatCard icon={<Eye className="size-5" aria-hidden />} iconClassName="bg-brand-50 text-brand-700" label={t("views")} value={String(stats.profileViews)} />
        <StatCard
          icon={<MessageCircle className="size-5" aria-hidden />}
          iconClassName="bg-info-50 text-info-700"
          label={t("requests")}
          value={String(stats.contactRequests)}
        />
        <StatCard
          icon={<Star className="size-5" aria-hidden />}
          iconClassName="bg-premium-50 text-premium-700"
          label={t("rating", { count: stats.ratingCount })}
          value={stats.rating === null ? "–" : formatDecimal(stats.rating)}
          suffix={stats.rating === null ? undefined : "/5"}
        />
      </section>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <SectionCard
          id="profil-titre"
          title={t("completionTitle")}
          subtitle={t("completion", { pct: completion })}
          action={
            <ButtonLink href="/prof/profil" variant="outline" size="sm">
              {t("edit")}
            </ButtonLink>
          }
        >
          <ProgressBar value={completion} label={t("completion", { pct: completion })} />
          <ul className="mt-4 space-y-2.5">
            {(Object.keys(checklist) as (keyof typeof checklist)[]).map((key) => (
              <li key={key} className="flex items-center gap-2.5 text-sm text-ink">
                {checklist[key] ? (
                  <CircleCheck className="size-4 text-success-500" aria-hidden />
                ) : (
                  <CircleDashed className="size-4 text-ink-subtle" aria-hidden />
                )}
                {t(`checklist.${key}`)}
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard id="messages-titre" title={t("latestMessages")}>
          {conversations.length === 0 ? (
            <p className="text-sm text-ink-muted">{t("noMessages")}</p>
          ) : (
            <ul className="divide-y divide-line">
              {conversations.map((c) => (
                <li key={c.id}>
                  <Link href={`/messages/${c.id}`} className="block py-3 hover:bg-canvas">
                    <span className="block font-medium text-ink">{c.title}</span>
                    <span className="block truncate text-sm text-ink-muted">{c.lastMessage}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </SectionCard>
      </div>

      <div className="flex gap-3 rounded-2xl border border-dashed border-line bg-surface p-5">
        <CalendarClock className="size-6 shrink-0 text-brand-700" aria-hidden />
        <div>
          <p className="font-semibold text-ink">{t("bookingsSoonTitle")}</p>
          <p className="mt-1 text-sm text-ink-muted">{t("bookingsSoonBody")}</p>
        </div>
      </div>
    </div>
  );
}

export default function TutorHomePage() {
  return (
    <PageContainer width="wide">
      <Suspense fallback={<Skeleton className="h-96 rounded-2xl" />}>
        <TutorHome />
      </Suspense>
    </PageContainer>
  );
}
