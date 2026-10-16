import { CircleCheck, CircleSlash, Crown, KeyRound, Lock } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Field, INPUT_CLASS } from "@/components/ui/form";
import { Notice } from "@/components/ui/notice";
import { SectionCard } from "@/components/ui/section-card";
import { Skeleton } from "@/components/ui/skeleton";
import { StudentAvatar } from "@/components/ui/student-avatar";
import { getParentChildren } from "@/features/account/data";
import { createChildProfileAction, setChildPinAction } from "@/features/family/actions";
import { getChildLogins, getFamilyCode, getFamilyCoverage } from "@/features/family/data";
import { formatDate } from "@/lib/format";
import { LEVEL_CODES } from "@/lib/levels";

const ERRORS = ["pin", "enfant", "profil", "creation"] as const;

export async function generateMetadata() {
  const t = await getTranslations("family");
  return { title: t("title") };
}

/** Deux champs de code PIN (4 à 6 chiffres, saisi deux fois). */
async function PinFields({ idPrefix }: { idPrefix: string }) {
  const t = await getTranslations("family");
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Field id={`${idPrefix}-pin`} label={t("pin")} hint={t("pinHint")}>
        <input
          id={`${idPrefix}-pin`}
          name="pin"
          type="password"
          inputMode="numeric"
          autoComplete="new-password"
          pattern="[0-9]{4,6}"
          minLength={4}
          maxLength={6}
          required
          className={INPUT_CLASS}
        />
      </Field>
      <Field id={`${idPrefix}-confirm`} label={t("pinConfirm")}>
        <input
          id={`${idPrefix}-confirm`}
          name="pinConfirm"
          type="password"
          inputMode="numeric"
          autoComplete="new-password"
          pattern="[0-9]{4,6}"
          minLength={4}
          maxLength={6}
          required
          className={INPUT_CLASS}
        />
      </Field>
    </div>
  );
}

async function FamilyContent({ searchParams }: { searchParams: PageProps<"/parent/famille">["searchParams"] }) {
  const [query, code, children, logins, coverage, t, tLevels] = await Promise.all([
    searchParams,
    getFamilyCode(),
    getParentChildren(),
    getChildLogins(),
    getFamilyCoverage(),
    getTranslations("family"),
    getTranslations("levels"),
  ]);
  const error = ERRORS.find((e) => e === query.erreur);
  const created = typeof query.cree === "string" ? query.cree : null;

  return (
    <div className="space-y-5">
      {query.demo ? <Notice tone="info">{t("demo")}</Notice> : null}
      {created ? <Notice tone="success">{t("created", { name: created })}</Notice> : null}
      {query.pin ? <Notice tone="success">{t("pinSaved")}</Notice> : null}
      {error ? <Notice tone="error">{t(`errors.${error}`)}</Notice> : null}

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <SectionCard id="code-titre" title={t("codeTitle")} subtitle={t("codeHint")}>
          <p className="rounded-2xl bg-brand-50 px-4 py-5 text-center font-mono text-3xl font-bold tracking-[0.3em] text-brand-800">
            {code}
          </p>
          <p className="mt-3 text-sm text-ink-muted">
            {t("codeHow")}{" "}
            <Link href="/connexion/enfant" className="font-medium text-brand-700 underline">
              {t("codeLink")}
            </Link>
          </p>
        </SectionCard>

        <SectionCard id="formule-titre" title={t("coverageTitle")}>
          {coverage ? (
            <p className="flex items-start gap-2 text-sm text-ink">
              <Crown className="mt-0.5 size-4 shrink-0 text-premium-700" aria-hidden />
              {t("coverageActive", {
                date: formatDate(coverage.endsAt),
                count: coverage.childIds.length,
                max: coverage.maxChildren,
              })}
            </p>
          ) : (
            <p className="text-sm text-ink-muted">{t("coverageNone")}</p>
          )}
          <Link href="/parent/abonnements#famille-titre" className="mt-3 inline-flex h-11 items-center font-medium text-brand-700 underline">
            {coverage ? t("coverageManage") : t("coverageBuy")}
          </Link>
        </SectionCard>
      </div>

      <SectionCard id="enfants-titre" title={t("childrenTitle")} subtitle={t("childrenHint")}>
        {children.length === 0 ? <p className="text-sm text-ink-muted">{t("noChildren")}</p> : null}
        <ul className="divide-y divide-line">
          {children.map((child) => {
            const login = logins.find((l) => l.studentId === child.id);
            return (
              <li key={child.id} className="space-y-3 py-4">
                <div className="flex flex-wrap items-center gap-3">
                  <StudentAvatar avatarKey={child.avatarKey} className="size-11" />
                  <p className="min-w-0 flex-1 font-semibold text-ink">
                    {child.firstName} {child.lastName}
                    <span className="block text-xs font-normal text-ink-muted">{child.levelName}</span>
                  </p>
                  {login?.locked ? (
                    <Badge tone="danger" icon={Lock}>
                      {t("status.locked")}
                    </Badge>
                  ) : login ? (
                    <Badge tone="success" icon={CircleCheck}>
                      {t("status.pin")}
                    </Badge>
                  ) : (
                    <Badge tone="idle" icon={CircleSlash}>
                      {t("status.noPin")}
                    </Badge>
                  )}
                </div>
                <details className="rounded-xl bg-canvas p-3">
                  <summary className="flex min-h-11 cursor-pointer items-center gap-2 text-sm font-medium text-brand-700">
                    <KeyRound className="size-4" aria-hidden />
                    {login ? t("changePin") : t("givePin")}
                  </summary>
                  <form action={setChildPinAction.bind(null, child.id)} className="mt-3 space-y-3">
                    <PinFields idPrefix={`pin-${child.id}`} />
                    <Button type="submit" size="sm">
                      {t("savePin")}
                    </Button>
                  </form>
                </details>
              </li>
            );
          })}
        </ul>
      </SectionCard>

      <SectionCard id="nouveau-titre" title={t("newTitle")} subtitle={t("newHint")}>
        <form action={createChildProfileAction} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field id="firstName" label={t("fields.firstName")}>
              <input id="firstName" name="firstName" required minLength={2} maxLength={40} autoComplete="off" className={INPUT_CLASS} />
            </Field>
            <Field id="lastName" label={t("fields.lastName")}>
              <input id="lastName" name="lastName" required minLength={2} maxLength={40} autoComplete="off" className={INPUT_CLASS} />
            </Field>
            <Field id="level" label={t("fields.level")}>
              <select id="level" name="level" defaultValue="CI" className={INPUT_CLASS}>
                {LEVEL_CODES.map((code) => (
                  <option key={code} value={code}>
                    {tLevels(code)}
                  </option>
                ))}
              </select>
            </Field>
            <Field id="birthDate" label={t("fields.birthDate")} hint={t("fields.birthDateHint")}>
              <input id="birthDate" name="birthDate" type="date" required className={INPUT_CLASS} />
            </Field>
          </div>
          <PinFields idPrefix="new" />
          <Button type="submit">{t("create")}</Button>
        </form>
      </SectionCard>
    </div>
  );
}

export default async function FamilyPage({ searchParams }: PageProps<"/parent/famille">) {
  const t = await getTranslations("family");
  return (
    <PageContainer className="space-y-5 lg:space-y-7">
      <PageHeader title={t("title")} subtitle={t("subtitle")} />
      <Suspense fallback={<Skeleton className="h-96 rounded-2xl" />}>
        <FamilyContent searchParams={searchParams} />
      </Suspense>
    </PageContainer>
  );
}
