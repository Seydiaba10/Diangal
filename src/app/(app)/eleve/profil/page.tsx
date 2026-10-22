import { Copy, Download, KeyRound, Languages, ShieldAlert, ShieldCheck, Trash } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { DemoRoleSwitcher } from "@/components/layout/demo-role-switcher";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { Button, ButtonLink } from "@/components/ui/button";
import { LevelBadge } from "@/components/ui/level-badge";
import { Notice } from "@/components/ui/notice";
import { SectionCard } from "@/components/ui/section-card";
import { Skeleton } from "@/components/ui/skeleton";
import { StudentAvatar } from "@/components/ui/student-avatar";
import { DialCodeSelect } from "@/components/ui/dial-code-select";
import { INPUT_CLASS } from "@/components/ui/form";
import { confirmParentLinkAction, resendConsentRequestAction } from "@/features/account/actions";
import { AccountLinks } from "@/features/account/components/account-links";
import { DataSaverForm } from "@/features/account/components/data-saver-form";
import { getCurrentStudent, getPendingParentLinks, getStudentLinkInfo } from "@/features/account/data";
import { PromotionCard } from "@/features/schooling/components/promotion-card";
import { StudentTutorPanel, TutorLinkNotice } from "@/features/tutoring/components/family-tutor-panel";
import { isSupabaseConfigured, phoneCountries } from "@/lib/env";

export async function generateMetadata() {
  const t = await getTranslations("pages");
  return { title: t("profile") };
}

const CONSENT_ERRORS = { telephone: "phone", limite: "tooMany", erreur: "generic" } as const;

async function ProfileContent({ searchParams }: { searchParams: PageProps<"/eleve/profil">["searchParams"] }) {
  const [{ demande, lien, repetiteur, passage }, student, link, pendingParents, t] = await Promise.all([
    searchParams,
    getCurrentStudent(),
    getStudentLinkInfo(),
    getPendingParentLinks(),
    getTranslations("studentProfile"),
  ]);
  const consentError = CONSENT_ERRORS[demande as keyof typeof CONSENT_ERRORS];
  const demo = !isSupabaseConfigured();

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="space-y-5">
        {demande === "envoyee" ? <Notice tone="success">{t("consent.resent")}</Notice> : null}
        {consentError ? <Notice tone="error">{t(`consent.errors.${consentError}`)}</Notice> : null}
        {lien === "confirme" ? <Notice tone="success">{t("parentLinks.confirmed")}</Notice> : null}
        <TutorLinkNotice value={repetiteur} />
        <StudentTutorPanel back="/eleve/profil" />

        {pendingParents.length ? (
          <SectionCard id="parents-titre" title={t("parentLinks.title")} subtitle={t("parentLinks.body")}>
            <ul className="divide-y divide-line">
              {pendingParents.map((p) => (
                <li key={p.parentId} className="flex items-center justify-between gap-3 py-3 text-sm">
                  <span className="font-medium text-ink">
                    {p.firstName} {p.lastName}
                  </span>
                  <form action={confirmParentLinkAction.bind(null, p.parentId)}>
                    <Button type="submit" size="sm">
                      {t("parentLinks.confirm")}
                    </Button>
                  </form>
                </li>
              ))}
            </ul>
          </SectionCard>
        ) : null}

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

        <PromotionCard
          student={{ id: null, firstName: student.firstName, levelCode: student.levelCode, seriesCode: student.seriesCode }}
          audience="student"
          back="/eleve/profil"
          status={passage}
        />

        <SectionCard id="parent-titre" title={t("consent.title")}>
          {student.consentStatus === "granted" || student.consentStatus === "not_required" ? (
            <p className="flex items-center gap-2 text-sm font-medium text-success-700">
              <ShieldCheck className="size-5" aria-hidden />
              {t(student.consentStatus === "granted" ? "consent.granted" : "consent.adult")}
            </p>
          ) : (
            <>
              <p className="flex gap-2 text-sm text-ink">
                <ShieldAlert className="mt-0.5 size-4 shrink-0 text-premium-700" aria-hidden />
                {student.consentStatus === "refused"
                  ? t("consent.refused")
                  : link.parentPhoneMasked
                    ? t("consent.pending", { phone: link.parentPhoneMasked })
                    : t("consent.noRequest")}
              </p>
              <form action={resendConsentRequestAction} className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end">
                {demo ? null : (
                  <div className="flex-1">
                    <label htmlFor="tel-parent" className="text-sm font-medium text-ink">
                      {t("consent.parentPhone")}
                    </label>
                    <div className="mt-1.5 flex gap-2">
                      <DialCodeSelect countries={phoneCountries()} name="pays" label={t("consent.dialCode")} />
                      <input
                        id="tel-parent"
                        name="parentPhone"
                        type="tel"
                        inputMode="tel"
                        required
                        pattern="[0-9 +]{6,16}"
                        autoComplete="off"
                        className={INPUT_CLASS}
                      />
                    </div>
                  </div>
                )}
                <Button type="submit" variant="outline" size="sm">
                  {link.parentPhoneMasked ? t("consent.resend") : t("consent.send")}
                </Button>
                {demo ? (
                  <Link
                    href="/consentement/demo"
                    className="inline-flex h-11 items-center justify-center rounded-xl px-4 text-sm font-medium text-brand-700 hover:bg-brand-50"
                  >
                    {t("consent.demoLink")}
                  </Link>
                ) : null}
              </form>
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
            <ButtonLink href="/compte/suppression" variant="ghost" size="sm" className="text-danger-700 hover:bg-danger-50">
              <Trash className="size-4" aria-hidden />
              {t("data.delete")}
            </ButtonLink>
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
        <AccountLinks />
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
