import { Copy, Download, KeyRound, Languages, LogOut, ShieldAlert, ShieldCheck, Trash } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { DemoRoleSwitcher } from "@/components/layout/demo-role-switcher";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { LevelBadge } from "@/components/ui/level-badge";
import { Notice } from "@/components/ui/notice";
import { SectionCard } from "@/components/ui/section-card";
import { Skeleton } from "@/components/ui/skeleton";
import { StudentAvatar } from "@/components/ui/student-avatar";
import { resendConsentRequestAction, signOutAction } from "@/features/account/actions";
import { DataSaverForm } from "@/features/account/components/data-saver-form";
import { getCurrentStudent, getStudentLinkInfo } from "@/features/account/data";

export async function generateMetadata() {
  const t = await getTranslations("pages");
  return { title: t("profile") };
}

async function ProfileContent({ searchParams }: { searchParams: PageProps<"/eleve/profil">["searchParams"] }) {
  const [{ demande }, student, link, t] = await Promise.all([
    searchParams,
    getCurrentStudent(),
    getStudentLinkInfo(),
    getTranslations("studentProfile"),
  ]);
  const consentGranted = student.consentStatus === "granted";

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="space-y-5">
        {demande === "envoyee" ? <Notice tone="success">{t("consent.resent")}</Notice> : null}

        <section className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-5">
          <StudentAvatar avatarKey={student.avatarKey} className="size-16" />
          <div>
            <p className="text-lg font-semibold text-ink">
              {student.firstName} {student.lastName}
            </p>
            <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-ink-muted">
              <LevelBadge code={student.levelCode}>{student.levelName}</LevelBadge>
              {student.schoolName ? <span>{student.schoolName}</span> : null}
            </p>
            <p className="mt-1 text-xs text-ink-subtle">{t("levelChange")}</p>
          </div>
        </section>

        <SectionCard id="parent-titre" title={t("consent.title")}>
          {consentGranted ? (
            <p className="flex items-center gap-2 text-sm font-medium text-success-700">
              <ShieldCheck className="size-5" aria-hidden />
              {t("consent.granted")}
            </p>
          ) : (
            <>
              <p className="flex gap-2 text-sm text-ink">
                <ShieldAlert className="mt-0.5 size-4 shrink-0 text-premium-700" aria-hidden />
                {t("consent.pending", { phone: link.parentPhoneMasked })}
              </p>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <form action={resendConsentRequestAction}>
                  <Button type="submit" variant="outline" size="sm" className="w-full">
                    {t("consent.resend")}
                  </Button>
                </form>
                <Link
                  href="/consentement/demo"
                  className="inline-flex h-11 items-center justify-center rounded-xl px-4 text-sm font-medium text-brand-700 hover:bg-brand-50"
                >
                  {t("consent.demoLink")}
                </Link>
              </div>
            </>
          )}
        </SectionCard>

        <SectionCard id="code-titre" title={t("linkCode.title")} subtitle={t("linkCode.body")}>
          <p className="flex items-center justify-between rounded-xl bg-canvas px-4 py-3">
            <span className="flex items-center gap-2 font-mono text-lg font-semibold tracking-widest text-ink">
              <KeyRound className="size-4 text-ink-muted" aria-hidden />
              {link.linkCode}
            </span>
            <Copy className="size-4 text-ink-subtle" aria-hidden />
          </p>
        </SectionCard>

        <SectionCard id="donnees-titre" title={t("data.title")} subtitle={t("data.body")}>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button variant="outline" size="sm" disabled>
              <Download className="size-4" aria-hidden />
              {t("data.export")}
            </Button>
            <Button variant="ghost" size="sm" disabled className="text-danger-700">
              <Trash className="size-4" aria-hidden />
              {t("data.delete")}
            </Button>
          </div>
          <p className="mt-2 text-xs text-ink-subtle">{t("data.soon")}</p>
        </SectionCard>
      </div>

      <aside className="space-y-4">
        <DataSaverForm />
        <SectionCard id="langue-titre" title={t("language.title")}>
          <p className="flex items-center gap-2 text-sm text-ink">
            <Languages className="size-4 text-ink-muted" aria-hidden />
            {t("language.current")}
          </p>
          <p className="mt-1 text-xs text-ink-muted">{t("language.wolofSoon")}</p>
        </SectionCard>
        <DemoRoleSwitcher current="student" />
        <form action={signOutAction}>
          <Button type="submit" variant="outline" className="w-full">
            <LogOut className="size-4" aria-hidden />
            {t("signOut")}
          </Button>
        </form>
      </aside>
    </div>
  );
}

export default async function StudentProfilePage({ searchParams }: PageProps<"/eleve/profil">) {
  const t = await getTranslations("pages");
  return (
    <PageContainer className="space-y-5 lg:space-y-7">
      <PageHeader title={t("profile")} />
      <Suspense fallback={<Skeleton className="h-96 rounded-2xl" />}>
        <ProfileContent searchParams={searchParams} />
      </Suspense>
    </PageContainer>
  );
}
