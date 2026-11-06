import { CircleCheck, CircleSlash, Crown, KeyRound, Laptop, Lock, Smartphone } from "lucide-react";
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
import { PinBoxes } from "@/features/account/components/pin-boxes";
import { getParentChildren } from "@/features/account/data";
import { createChildProfileAction, setChildPinAction } from "@/features/family/actions";
import { getChildLogins, getFamilyCode, getFamilyCoverage, getFamilyDevices } from "@/features/family/data";
import { addFamilyDeviceAction, createChildProfileV2Action, removeFamilyDeviceAction, setChildPinV2Action } from "@/features/family/pin-actions";
import { isPinLoginEnabled } from "@/lib/env";
import { formatDate } from "@/lib/format";
import { LEVEL_CODES } from "@/lib/levels";
import type { AvatarKey } from "@/types/domain";

const ERRORS = ["pin", "enfant", "profil", "creation", "reauth", "bloque", "pinSimple", "pinDifferent", "appareil"] as const;
const AVATARS: AvatarKey[] = ["moussa", "awa", "fatou"];

export async function generateMetadata() {
  const t = await getTranslations("family");
  return { title: t("title") };
}

/** Deux champs de code PIN (4 à 6 chiffres, saisi deux fois) : ancienne connexion par code famille. */
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

/** Connexion par code PIN : code de l'enfant en 6 cases, puis le code PIN du parent pour confirmer. */
async function PinBoxFields({ idPrefix }: { idPrefix: string }) {
  const t = await getTranslations("family");
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor={`${idPrefix}-pin`} className="text-sm font-medium text-ink">
            {t("pin")}
          </label>
          <PinBoxes id={`${idPrefix}-pin`} name="pin" describedBy={`${idPrefix}-pin-aide`} />
          <p id={`${idPrefix}-pin-aide`} className="text-xs text-ink-muted">
            {t("pinV2Hint")}
          </p>
        </div>
        <div className="space-y-2">
          <label htmlFor={`${idPrefix}-confirm`} className="text-sm font-medium text-ink">
            {t("pinConfirm")}
          </label>
          <PinBoxes id={`${idPrefix}-confirm`} name="pinConfirm" />
        </div>
      </div>
      <ParentPinField idPrefix={idPrefix} />
    </div>
  );
}

async function ParentPinField({ idPrefix }: { idPrefix: string }) {
  const t = await getTranslations("family");
  return (
    <div className="space-y-2 rounded-2xl bg-premium-50 p-4">
      <label htmlFor={`${idPrefix}-parent`} className="flex items-center gap-2 font-semibold text-premium-700">
        <Lock className="size-4" aria-hidden />
        {t("parentPin")}
      </label>
      <p className="text-sm text-ink">{t("parentPinHint")}</p>
      <PinBoxes id={`${idPrefix}-parent`} name="parentPin" />
    </div>
  );
}

async function DevicesSection() {
  const [t, devices] = await Promise.all([getTranslations("family.devices"), getFamilyDevices()]);
  return (
    <SectionCard id="appareils-titre" title={t("title")} subtitle={t("hint")}>
      {devices.length === 0 ? <p className="text-sm text-ink-muted">{t("none")}</p> : null}
      <ul className="divide-y divide-line">
        {devices.map((device) => {
          const Icon = /ordinateur/i.test(device.label) ? Laptop : Smartphone;
          return (
            <li key={device.id} className="flex flex-wrap items-center gap-3 py-3">
              <Icon className="size-5 shrink-0 text-ink-muted" aria-hidden />
              <p className="min-w-0 flex-1 text-sm font-medium text-ink">
                {device.label}
                <span className="block text-xs font-normal text-ink-muted">
                  {t("dates", { added: formatDate(device.createdAt), used: formatDate(device.lastUsedAt) })}
                </span>
              </p>
              <form action={removeFamilyDeviceAction.bind(null, device.id)}>
                <Button type="submit" variant="ghost" size="sm">
                  {t("remove")}
                </Button>
              </form>
            </li>
          );
        })}
      </ul>
      <details className="mt-3 rounded-xl bg-canvas p-3">
        <summary className="flex min-h-11 cursor-pointer items-center gap-2 text-sm font-medium text-brand-700">
          <Smartphone className="size-4" aria-hidden />
          {t("addTitle")}
        </summary>
        <form action={addFamilyDeviceAction} className="mt-3 space-y-3">
          <p className="text-sm text-ink-muted">{t("addHint")}</p>
          <ParentPinField idPrefix="appareil" />
          <Button type="submit" size="sm">
            {t("add")}
          </Button>
        </form>
      </details>
    </SectionCard>
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
  const pinMode = isPinLoginEnabled();
  const error = ERRORS.find((e) => e === query.erreur);
  const created = typeof query.cree === "string" ? query.cree : null;

  return (
    <div className="space-y-5">
      {query.demo ? <Notice tone="info">{t(pinMode ? "demoV2" : "demo")}</Notice> : null}
      {created ? <Notice tone="success">{t(pinMode ? "createdV2" : "created", { name: created })}</Notice> : null}
      {query.pin ? <Notice tone="success">{t(pinMode ? "pinSavedV2" : "pinSaved")}</Notice> : null}
      {query.appareil ? <Notice tone="success">{t("devices.added")}</Notice> : null}
      {query.retire ? <Notice tone="success">{t("devices.removed")}</Notice> : null}
      {error ? <Notice tone="error">{t(`errors.${error}`)}</Notice> : null}

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <SectionCard id="code-titre" title={t("codeTitle")} subtitle={t(pinMode ? "codeHintV2" : "codeHint")}>
          <p className="rounded-2xl bg-brand-50 px-4 py-5 text-center font-mono text-3xl font-bold tracking-[0.3em] text-brand-800">
            {code}
          </p>
          <p className="mt-3 text-sm text-ink-muted">
            {t(pinMode ? "codeHowV2" : "codeHow")}{" "}
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
                  <form action={(pinMode ? setChildPinV2Action : setChildPinAction).bind(null, child.id)} className="mt-3 space-y-3">
                    {pinMode ? <PinBoxFields idPrefix={`pin-${child.id}`} /> : <PinFields idPrefix={`pin-${child.id}`} />}
                    {pinMode ? <p className="text-xs text-ink-muted">{t("pinChangeNote", { name: child.firstName })}</p> : null}
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

      {pinMode ? <DevicesSection /> : null}

      <SectionCard id="nouveau-titre" title={t("newTitle")} subtitle={t(pinMode ? "newHintV2" : "newHint")}>
        <form action={pinMode ? createChildProfileV2Action : createChildProfileAction} className="space-y-4">
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
          {pinMode ? (
            <fieldset>
              <legend className="text-sm font-medium text-ink">{t("fields.avatar")}</legend>
              <div className="mt-2 flex flex-wrap gap-3">
                {AVATARS.map((key, i) => (
                  <label
                    key={key}
                    className="flex cursor-pointer rounded-2xl border-2 border-line p-1.5 has-[:checked]:border-brand-600 has-[:checked]:bg-cycle-middle-soft has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand-600"
                  >
                    <input type="radio" name="avatar" value={key} defaultChecked={i === 0} className="sr-only" aria-label={t("fields.avatarChoice", { n: i + 1 })} />
                    <StudentAvatar avatarKey={key} className="size-14" />
                  </label>
                ))}
              </div>
              <p className="mt-1.5 text-xs text-ink-muted">{t("fields.avatarHint")}</p>
            </fieldset>
          ) : null}
          {pinMode ? <PinBoxFields idPrefix="new" /> : <PinFields idPrefix="new" />}
          {pinMode ? (
            <label className="flex cursor-pointer gap-3 text-sm text-ink">
              <input type="checkbox" name="appareil" defaultChecked className="mt-0.5 size-5 shrink-0 accent-brand-600" />
              <span>
                <span className="font-medium">{t("fields.showHere")}</span> <span className="text-ink-muted">{t("fields.showHereHint")}</span>
              </span>
            </label>
          ) : null}
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
      <PageHeader title={t("title")} subtitle={t(isPinLoginEnabled() ? "subtitleV2" : "subtitle")} />
      <Suspense fallback={<Skeleton className="h-96 rounded-2xl" />}>
        <FamilyContent searchParams={searchParams} />
      </Suspense>
    </PageContainer>
  );
}
