import { GraduationCap, MessageCircle, ShieldAlert, Users } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { ButtonLink } from "@/components/ui/button";
import { Notice } from "@/components/ui/notice";
import { Skeleton } from "@/components/ui/skeleton";
import { getParentChildren, getSessionUser } from "@/features/account/data";
import { getFamilyTutorLinks } from "@/features/tutoring/data";
import { ChildCard } from "@/features/parents/components/child-card";
import { isSupabaseConfigured } from "@/lib/env";

export async function generateMetadata() {
  const t = await getTranslations("parentHome");
  return { title: t("metaTitle") };
}

async function ParentHome({ searchParams }: { searchParams: PageProps<"/parent">["searchParams"] }) {
  const [params, user, children, tutorLinks, t, tTutor] = await Promise.all([
    searchParams,
    getSessionUser("parent"),
    getParentChildren(),
    getFamilyTutorLinks(),
    getTranslations("parentHome"),
    getTranslations("tutoring.family"),
  ]);
  const tutorInvites = tutorLinks.filter((l) => l.status === "pending" && l.canAnswer);
  const pending = children.filter((c) => c.consentStatus === "pending");
  const demo = !isSupabaseConfigured();

  return (
    <div className="space-y-5 lg:space-y-7">
      <PageHeader title={t("greeting", { name: user.firstName })} subtitle={t("subtitle")} />
      {params.consentement === "granted" ? <Notice tone="success">{t("notices.consentGranted")}</Notice> : null}
      {params.consentement === "refused" ? <Notice tone="warning">{t("notices.consentRefused")}</Notice> : null}
      {params.lien === "ok" ? <Notice tone="success">{t("notices.linked")}</Notice> : null}
      {params.lien === "attente" ? <Notice tone="success">{t("notices.linkPending")}</Notice> : null}
      {params.enfant === "supprime" ? <Notice tone="success">{t("notices.childDeleted")}</Notice> : null}
      {tutorInvites.length ? (
        <div className="flex flex-col gap-3 rounded-2xl bg-brand-50 p-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex gap-2 text-sm text-ink">
            <GraduationCap className="mt-0.5 size-5 shrink-0 text-brand-700" aria-hidden />
            {tTutor("pendingBanner", { count: tutorInvites.length })}
          </p>
          <ButtonLink href={`/parent/enfants/${tutorInvites[0]!.studentId}`} size="sm" className="shrink-0">
            {tTutor("pendingBannerLink")}
          </ButtonLink>
        </div>
      ) : null}

      {pending.map((child) => (
        <div key={child.id} className="flex flex-col gap-3 rounded-2xl bg-premium-50 p-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex gap-2 text-sm text-ink">
            <ShieldAlert className="mt-0.5 size-5 shrink-0 text-premium-700" aria-hidden />
            {demo ? t("consentBanner", { child: child.firstName }) : t("consentBannerSms", { child: child.firstName })}
          </p>
          {/* Avec la vraie base, le parent valide depuis le lien reçu par SMS. */}
          {demo ? (
            <ButtonLink href="/consentement/demo" size="sm" className="shrink-0">
              {t("consentCta")}
            </ButtonLink>
          ) : null}
        </div>
      ))}

      {children.length ? (
        <section aria-label={t("childrenLabel")} className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          {children.map((child) => (
            <ChildCard key={child.id} child={child} />
          ))}
        </section>
      ) : (
        <section className="rounded-2xl border border-dashed border-line bg-surface p-6 text-center">
          <p className="font-semibold text-ink">{t("empty.title")}</p>
          <p className="mx-auto mt-1 max-w-md text-sm text-ink-muted">{t("empty.body")}</p>
          <ButtonLink href="/parent/enfants/ajouter" size="sm" className="mt-4">
            {t("empty.cta")}
          </ButtonLink>
        </section>
      )}

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
