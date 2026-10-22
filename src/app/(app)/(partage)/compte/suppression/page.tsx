import { CircleCheck, CircleX, ShieldCheck, Trash } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { Button, ButtonLink } from "@/components/ui/button";
import { INPUT_CLASS } from "@/components/ui/form";
import { Notice } from "@/components/ui/notice";
import { SectionCard } from "@/components/ui/section-card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  cancelAccountDeletionAction,
  deleteAccountAction,
  refuseChildDeletionAction,
  requestAccountDeletionAction,
  sendDeletionCodeAction,
} from "@/features/account/account-actions";
import { getCurrentRole, getDeletionStatus, getParentChild } from "@/features/account/data";
import { cn } from "@/lib/cn";
import { formatDate } from "@/lib/format";

export async function generateMetadata() {
  const t = await getTranslations("pages");
  return { title: t("accountDeletion") };
}

const ERRORS = ["confirmation", "code", "reauth", "refus", "canal", "envoi", "limite"] as const;
const NOTICES = { envoyee: "success", annulee: "info", refusee: "info" } as const;

async function DeletionContent({ searchParams }: { searchParams: PageProps<"/compte/suppression">["searchParams"] }) {
  const params = await searchParams;
  const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";
  const childId = first(params.enfant) || null;
  const [role, status, child, t] = await Promise.all([
    getCurrentRole(),
    getDeletionStatus(childId),
    childId ? getParentChild(childId) : Promise.resolve(undefined),
    getTranslations("accountDeletion"),
  ]);
  const tu = role === "student" ? "true" : "false";
  const error = ERRORS.find((e) => e === first(params.erreur));
  const request = first(params.demande);
  const requestNotice = request in NOTICES ? (request as keyof typeof NOTICES) : null;
  const childName = child?.firstName ?? "";

  const notices = (
    <>
      {error ? <Notice tone="error">{t(`errors.${error}`, { tu })}</Notice> : null}
      {requestNotice ? <Notice tone={NOTICES[requestNotice]}>{t(`requests.${requestNotice}`, { tu, child: childName })}</Notice> : null}
      {first(params.demo) ? <Notice tone="info">{t("demo")}</Notice> : null}
      {first(params.code) === "envoye" ? (
        <Notice tone="success">{t(first(params.canal) === "email" ? "codeSentEmail" : "codeSentPhone", { tu })}</Notice>
      ) : null}
    </>
  );

  if (!status || status.mode === "not_found") {
    return (
      <div className="space-y-4">
        {notices}
        <Notice tone="info">{t("notFound")}</Notice>
      </div>
    );
  }

  if (status.mode === "not_allowed" || status.mode === "blocked_admin") {
    return (
      <div className="space-y-4">
        {notices}
        <Notice tone="warning">{t(status.mode === "blocked_admin" ? "blockedAdmin" : "notAllowed")}</Notice>
      </div>
    );
  }

  if (status.mode === "blocked_managed_children") {
    return (
      <div className="space-y-4">
        {notices}
        <SectionCard id="enfants-titre" title={t("managed.title")} subtitle={t("managed.body")}>
          <ul className="space-y-2">
            {status.managedChildren.map((c) => (
              <li key={c.id}>
                <Link
                  href={`/compte/suppression?enfant=${c.id}`}
                  className="flex h-12 items-center justify-between rounded-xl border border-line px-4 text-sm font-medium text-ink hover:border-brand-600"
                >
                  {c.firstName}
                  <span className="text-danger-700">{t("managed.delete")}</span>
                </Link>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>
    );
  }

  // Élève mineur relié : il demande, son parent décide.
  if (status.mode === "parent_approval") {
    return (
      <div className="space-y-4">
        {notices}
        <SectionCard id="demande-titre" title={t("request.title")} subtitle={t("request.body")}>
          {status.pendingRequestAt ? (
            <form action={cancelAccountDeletionAction} className="space-y-3">
              <p className="flex items-center gap-2 text-sm font-medium text-ink">
                <CircleCheck className="size-4 text-success-700" aria-hidden />
                {t("request.pending", { date: formatDate(status.pendingRequestAt) })}
              </p>
              <Button type="submit" variant="outline" size="sm">
                {t("request.cancel")}
              </Button>
            </form>
          ) : (
            <form action={requestAccountDeletionAction}>
              <Button type="submit" variant="outline" size="sm" className="border-danger-700 text-danger-700 hover:bg-danger-50">
                {t("request.send")}
              </Button>
            </form>
          )}
        </SectionCard>
        <WhatHappens tu={tu} />
      </div>
    );
  }

  // Suppression directe : son propre compte, ou celui d'un enfant mineur relié.
  const confirm = deleteAccountAction.bind(null, childId);
  return (
    <div className="space-y-4">
      {notices}
      {childId && status.pendingRequestAt ? (
        <Notice tone="warning">{t("childRequest", { child: childName, date: formatDate(status.pendingRequestAt) })}</Notice>
      ) : null}
      <WhatHappens tu={tu} child={childName || undefined} />

      <SectionCard id="identite-titre" title={t("verify.title")} subtitle={t("verify.body", { tu })}>
        {status.recentLogin ? (
          <p className="flex items-center gap-2 text-sm font-medium text-success-700">
            <ShieldCheck className="size-4" aria-hidden />
            {t("verify.recent")}
          </p>
        ) : (
          <form action={sendDeletionCodeAction.bind(null, childId)}>
            <Button type="submit" variant="outline" size="sm">
              {t("verify.send")}
            </Button>
          </form>
        )}
      </SectionCard>

      <form action={confirm} className="space-y-4 rounded-2xl border border-danger-500/40 bg-surface p-4 sm:p-5">
        <h2 className="font-semibold text-danger-700">{childName ? t("confirm.titleChild", { child: childName }) : t("confirm.title")}</h2>
        {status.recentLogin ? null : (
          <div>
            <label htmlFor="code" className="text-sm font-medium text-ink">
              {t("confirm.code")}
            </label>
            <input
              id="code"
              name="code"
              required
              inputMode="numeric"
              autoComplete="one-time-code"
              pattern="[0-9 ]{6,7}"
              maxLength={7}
              className={cn(INPUT_CLASS, "mt-1.5 text-center text-xl font-semibold tracking-[0.4em]")}
            />
          </div>
        )}
        <div>
          <label htmlFor="confirmation" className="text-sm font-medium text-ink">
            {t("confirm.word", { tu })}
          </label>
          <input id="confirmation" name="confirmation" required autoComplete="off" className={cn(INPUT_CLASS, "mt-1.5 uppercase")} />
        </div>
        <label className="flex cursor-pointer gap-3 text-sm text-ink">
          <input type="checkbox" name="compris" required className="mt-0.5 size-5 shrink-0 accent-brand-600" />
          <span>{t("confirm.understand", { tu })}</span>
        </label>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button type="submit" className="bg-danger-700 hover:bg-danger-700/90">
            <Trash className="size-4" aria-hidden />
            {childName ? t("confirm.submitChild", { child: childName }) : t("confirm.submit")}
          </Button>
          <ButtonLink href={childId ? `/parent/enfants/${childId}` : "/compte"} variant="ghost">
            {t("confirm.cancel")}
          </ButtonLink>
        </div>
      </form>

      {childId && status.pendingRequestAt ? (
        <form action={refuseChildDeletionAction.bind(null, childId)}>
          <Button type="submit" variant="outline" size="sm">
            <CircleX className="size-4" aria-hidden />
            {t("refuseChild", { child: childName })}
          </Button>
        </form>
      ) : null}
    </div>
  );
}

/** Ce qui est effacé et ce qui est gardé (obligations légales), en langage simple. */
async function WhatHappens({ tu, child }: { tu: string; child?: string }) {
  const t = await getTranslations("accountDeletion");
  return (
    <SectionCard id="effets-titre" title={child ? t("effects.titleChild", { child }) : t("effects.title", { tu })}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <p className="text-sm font-semibold text-ink">{t("effects.erasedTitle")}</p>
          <ul className="mt-2 space-y-1.5 text-sm text-ink-muted">
            {(["identity", "progress", "messages", "family", "tutor"] as const).map((key) => (
              <li key={key} className="flex gap-2">
                <CircleX className="mt-0.5 size-4 shrink-0 text-danger-700" aria-hidden />
                {t(`effects.erased.${key}`)}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-ink">{t("effects.keptTitle")}</p>
          <ul className="mt-2 space-y-1.5 text-sm text-ink-muted">
            {(["payments", "consents", "audit"] as const).map((key) => (
              <li key={key} className="flex gap-2">
                <ShieldCheck className="mt-0.5 size-4 shrink-0 text-ink-muted" aria-hidden />
                {t(`effects.kept.${key}`)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SectionCard>
  );
}

export default async function AccountDeletionPage({ searchParams }: PageProps<"/compte/suppression">) {
  const t = await getTranslations("pages");
  return (
    <PageContainer width="narrow" className="space-y-5">
      <PageHeader title={t("accountDeletion")} />
      <Suspense fallback={<Skeleton className="h-96 rounded-2xl" />}>
        <DeletionContent searchParams={searchParams} />
      </Suspense>
    </PageContainer>
  );
}
