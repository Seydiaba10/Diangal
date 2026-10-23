import { CircleCheck, CircleX, Clock, Gift, Hourglass, ShieldCheck } from "lucide-react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Notice } from "@/components/ui/notice";
import { SectionCard } from "@/components/ui/section-card";
import { Skeleton } from "@/components/ui/skeleton";
import { getCurrentRole, getParentChildren } from "@/features/account/data";
import { spendReferralDaysAction } from "@/features/referrals/actions";
import { SharePanel } from "@/features/referrals/components/share-panel";
import { getMyReferral } from "@/features/referrals/data";
import { formatReferralCode } from "@/features/referrals/presets";
import { publicEnv } from "@/lib/env";
import { formatDate, formatFCFA } from "@/lib/format";
import type { ReferralStatus } from "@/types/domain";

export async function generateMetadata() {
  const t = await getTranslations("pages");
  return { title: t("referral") };
}

const STATUS: Record<ReferralStatus, { tone: "success" | "info" | "danger" | "idle"; icon: typeof Clock }> = {
  pending: { tone: "info", icon: Clock },
  qualified: { tone: "idle", icon: CircleCheck },
  rewarded: { tone: "success", icon: Gift },
  cancelled: { tone: "danger", icon: CircleX },
  expired: { tone: "idle", icon: Hourglass },
};
const NOTICES = { ok: "success", aucun: "info", erreur: "error" } as const;

async function ReferralContent({ searchParams }: { searchParams: PageProps<"/parrainage">["searchParams"] }) {
  const [{ jours }, role, referral, t, messages] = await Promise.all([
    searchParams,
    getCurrentRole(),
    getMyReferral(),
    getTranslations("referral"),
    getMessages(),
  ]);
  const tu = role === "student" ? "true" : "false";
  const notice = typeof jours === "string" && jours in NOTICES ? (jours as keyof typeof NOTICES) : null;

  if (!referral.eligible) {
    return <Notice tone="info">{t(role === "student" ? "notEligibleStudent" : "notEligible")}</Notice>;
  }
  if (!referral.enabled || !referral.code || !referral.settings) {
    return <Notice tone="info">{t("soon", { tu })}</Notice>;
  }

  const { settings } = referral;
  const link = `${publicEnv.NEXT_PUBLIC_SITE_URL}/inscription?parrain=${referral.code}`;
  const children = role === "parent" ? await getParentChildren() : [];

  return (
    <div className="space-y-5">
      {notice ? <Notice tone={NOTICES[notice]}>{t(`spend.notices.${notice}`, { tu })}</Notice> : null}

      <SectionCard id="code-titre" title={t("code.title")} subtitle={t("code.subtitle", { tu, days: settings.referrerDays })}>
        <p className="flex items-center justify-center rounded-2xl bg-brand-50 px-4 py-5 font-mono text-2xl font-bold tracking-[0.2em] text-brand-800">
          {formatReferralCode(referral.code)}
        </p>
        <div className="mt-4">
          <NextIntlClientProvider messages={{ referral: messages.referral }}>
            <SharePanel link={link} message={t("share.message", { code: formatReferralCode(referral.code) })} />
          </NextIntlClientProvider>
        </div>
      </SectionCard>

      <dl className="grid grid-cols-3 gap-2 sm:gap-3">
        {(
          [
            ["available", referral.daysAvailable, Gift, "text-success-700"],
            ["onHold", referral.daysOnHold, Hourglass, "text-info-700"],
            ["used", referral.daysUsed, CircleCheck, "text-brand-700"],
          ] as const
        ).map(([key, days, Icon, color]) => (
          <div key={key} className="rounded-2xl border border-line bg-surface p-3 sm:p-4">
            <dt className="flex items-center gap-1.5 text-xs text-ink-muted">
              <Icon className={`size-4 shrink-0 ${color}`} aria-hidden />
              {t(`stats.${key}`)}
            </dt>
            <dd className="mt-1 text-lg font-semibold text-ink sm:text-xl">{t("stats.days", { count: days })}</dd>
          </div>
        ))}
      </dl>

      {referral.daysAvailable > 0 ? (
        <SectionCard id="jours-titre" title={t("spend.title")} subtitle={t("spend.subtitle", { tu, count: referral.daysAvailable })}>
          <form action={spendReferralDaysAction} className="flex flex-col gap-3 sm:flex-row sm:items-end">
            {role === "parent" ? (
              <div className="flex-1">
                <label htmlFor="eleve" className="text-sm font-medium text-ink">
                  {t("spend.child")}
                </label>
                <select id="eleve" name="eleve" required className="mt-1.5 h-12 w-full rounded-xl border border-line bg-surface px-3 text-ink">
                  {children.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.firstName}
                    </option>
                  ))}
                </select>
              </div>
            ) : null}
            <Button type="submit" disabled={role === "parent" && children.length === 0}>
              <Gift className="size-4" aria-hidden />
              {t("spend.submit", { count: referral.daysAvailable })}
            </Button>
          </form>
        </SectionCard>
      ) : null}

      <SectionCard id="regles-titre" title={t("rules.title")}>
        <ul className="space-y-2 text-sm text-ink">
          {[
            t("rules.reward", { tu, days: settings.referrerDays }),
            settings.refereeDays > 0 ? t("rules.welcome", { days: settings.refereeDays }) : null,
            t("rules.payment", { tu, amount: formatFCFA(settings.minAmountFcfa), days: settings.qualifyWithinDays }),
            t("rules.hold", { days: settings.holdDays }),
            t("rules.fraud", { tu }),
            t("rules.cap", { count: settings.maxRewardsPerMonth }),
          ]
            .filter((rule): rule is string => Boolean(rule))
            .map((rule) => (
              <li key={rule} className="flex gap-2">
                <ShieldCheck className="mt-0.5 size-4 shrink-0 text-brand-700" aria-hidden />
                {rule}
              </li>
            ))}
        </ul>
      </SectionCard>

      <SectionCard id="filleuls-titre" title={t("history.title")}>
        {referral.referrals.length === 0 ? (
          <p className="text-sm text-ink-muted">{t("history.empty", { tu })}</p>
        ) : (
          <ul className="divide-y divide-line">
            {referral.referrals.map((r, i) => {
              const { tone, icon } = STATUS[r.status];
              return (
                <li key={`${r.createdAt}-${i}`} className="flex flex-wrap items-center gap-x-3 gap-y-1 py-3 first:pt-0 last:pb-0">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-canvas font-semibold text-ink">{r.initial}.</span>
                  <span className="min-w-0 flex-1 text-sm">
                    <span className="block font-medium text-ink">{t(`history.roles.${r.role === "parent" ? "parent" : "student"}`)}</span>
                    <span className="block text-xs text-ink-muted">{t("history.since", { date: formatDate(r.createdAt) })}</span>
                  </span>
                  <Badge tone={tone} icon={icon}>
                    {t(`history.status.${r.status}`)}
                    {r.reason ? ` · ${t(`history.reasons.${r.reason}` as "history.reasons.family")}` : ""}
                  </Badge>
                </li>
              );
            })}
          </ul>
        )}
      </SectionCard>
    </div>
  );
}

export default async function ReferralPage({ searchParams }: PageProps<"/parrainage">) {
  const t = await getTranslations("pages");
  const tReferral = await getTranslations("referral");
  return (
    <PageContainer width="narrow" className="space-y-5">
      <PageHeader title={t("referral")} subtitle={tReferral("subtitle")} />
      <Suspense fallback={<Skeleton className="h-96 rounded-2xl" />}>
        <ReferralContent searchParams={searchParams} />
      </Suspense>
    </PageContainer>
  );
}
