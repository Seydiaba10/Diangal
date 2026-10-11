import { MessageCircle, ShieldAlert, Users } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { ButtonLink } from "@/components/ui/button";
import { Notice } from "@/components/ui/notice";
import { Skeleton } from "@/components/ui/skeleton";
import { getParentChildren, getSessionUser } from "@/features/account/data";
import { ChildCard } from "@/features/parents/components/child-card";

export async function generateMetadata() {
  const t = await getTranslations("parentHome");
  return { title: t("metaTitle") };
}

async function ParentHome({ searchParams }: { searchParams: PageProps<"/parent">["searchParams"] }) {
  const [params, user, children, t] = await Promise.all([
    searchParams,
    getSessionUser("parent"),
    getParentChildren(),
    getTranslations("parentHome"),
  ]);
  const pending = children.filter((c) => c.consentStatus === "pending");

  return (
    <div className="space-y-5 lg:space-y-7">
      <PageHeader title={t("greeting", { name: user.firstName })} subtitle={t("subtitle")} />
      {params.consentement === "granted" ? <Notice tone="success">{t("notices.consentGranted")}</Notice> : null}
      {params.consentement === "refused" ? <Notice tone="warning">{t("notices.consentRefused")}</Notice> : null}
      {params.lien === "ok" ? <Notice tone="success">{t("notices.linked")}</Notice> : null}

      {pending.map((child) => (
        <div key={child.id} className="flex flex-col gap-3 rounded-2xl bg-premium-50 p-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex gap-2 text-sm text-ink">
            <ShieldAlert className="mt-0.5 size-5 shrink-0 text-premium-700" aria-hidden />
            {t("consentBanner", { child: child.firstName })}
          </p>
          <ButtonLink href="/consentement/demo" size="sm" className="shrink-0">
            {t("consentCta")}
          </ButtonLink>
        </div>
      ))}

      <section aria-label={t("childrenLabel")} className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        {children.map((child) => (
          <ChildCard key={child.id} child={child} />
        ))}
      </section>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link href="/repetiteurs" className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-5 hover:border-brand-500">
          <span className="flex size-12 items-center justify-center rounded-2xl bg-pastel-mint text-brand-700">
            <Users className="size-6" aria-hidden />
          </span>
          <span>
            <span className="block font-semibold text-ink">{t("findTutor")}</span>
            <span className="block text-sm text-ink-muted">{t("findTutorHint")}</span>
          </span>
        </Link>
        <Link href="/messages" className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-5 hover:border-brand-500">
          <span className="flex size-12 items-center justify-center rounded-2xl bg-pastel-lavender text-subject-philo">
            <MessageCircle className="size-6" aria-hidden />
          </span>
          <span>
            <span className="block font-semibold text-ink">{t("messages")}</span>
            <span className="block text-sm text-ink-muted">{t("messagesHint")}</span>
          </span>
        </Link>
      </div>
    </div>
  );
}

export default function ParentHomePage({ searchParams }: PageProps<"/parent">) {
  return (
    <PageContainer width="wide">
      <Suspense fallback={<Skeleton className="h-96 rounded-2xl" />}>
        <ParentHome searchParams={searchParams} />
      </Suspense>
    </PageContainer>
  );
}
