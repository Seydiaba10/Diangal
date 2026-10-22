import { LogOut, Mail, Smartphone, Trash, UserRound } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { Button, ButtonLink } from "@/components/ui/button";
import { DialCodeSelect } from "@/components/ui/dial-code-select";
import { INPUT_CLASS } from "@/components/ui/form";
import { Notice } from "@/components/ui/notice";
import { SectionCard } from "@/components/ui/section-card";
import { Skeleton } from "@/components/ui/skeleton";
import { addPhoneAction, verifyPhoneAction } from "@/features/account/account-actions";
import { signOutAction } from "@/features/account/actions";
import { getAccountOverview } from "@/features/account/data";
import { cn } from "@/lib/cn";
import { isSmsEnabled, isSupabaseConfigured, isWhatsAppEnabled, phoneCountries } from "@/lib/env";
import { NAV } from "@/lib/navigation";
import { maskPhone } from "@/lib/phone";

export async function generateMetadata() {
  const t = await getTranslations("pages");
  return { title: t("account") };
}

const PHONE_NOTICES = {
  ajoute: "success",
  demo: "info",
  ferme: "warning",
  numero: "error",
  envoi: "error",
  limite: "error",
} as const;

async function AccountContent({ searchParams }: { searchParams: PageProps<"/compte">["searchParams"] }) {
  const [params, account, t] = await Promise.all([searchParams, getAccountOverview(), getTranslations("account")]);
  const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";
  const phoneStep = first(params.telephone);
  const pendingNumber = first(params.numero);
  const tu = account.role === "student" ? "true" : "false";
  const phoneOpen = !isSupabaseConfigured() || isWhatsAppEnabled() || isSmsEnabled();
  const notice = phoneStep in PHONE_NOTICES ? (phoneStep as keyof typeof PHONE_NOTICES) : null;
  const profileHref = NAV[account.role].profileHref;

  return (
    <div className="space-y-5">
      {notice ? <Notice tone={PHONE_NOTICES[notice]}>{t(`phone.notices.${notice}`, { tu })}</Notice> : null}

      <SectionCard id="identite-titre" title={t("identity.title")} subtitle={t("identity.subtitle", { tu })}>
        <dl className="divide-y divide-line text-sm">
          <div className="flex items-center gap-3 py-3 first:pt-0">
            <UserRound className="size-4 shrink-0 text-ink-muted" aria-hidden />
            <dt className="w-28 shrink-0 text-ink-muted">{t("identity.name")}</dt>
            <dd className="min-w-0 flex-1 truncate font-medium text-ink">
              {account.firstName} {account.lastName}
            </dd>
          </div>
          <div className="flex items-center gap-3 py-3">
            <Mail className="size-4 shrink-0 text-ink-muted" aria-hidden />
            <dt className="w-28 shrink-0 text-ink-muted">{t("identity.email")}</dt>
            <dd className="min-w-0 flex-1 truncate font-medium text-ink">{account.email ?? t("identity.none")}</dd>
          </div>
          <div className="flex items-center gap-3 py-3 last:pb-0">
            <Smartphone className="size-4 shrink-0 text-ink-muted" aria-hidden />
            <dt className="w-28 shrink-0 text-ink-muted">{t("identity.phone")}</dt>
            <dd className="min-w-0 flex-1 truncate font-medium text-ink">{account.phone ? maskPhone(account.phone) : t("identity.none")}</dd>
          </div>
        </dl>
        {profileHref !== "/compte" ? (
          <ButtonLink href={profileHref} variant="outline" size="sm" className="mt-4">
            {t("identity.editProfile")}
          </ButtonLink>
        ) : null}
      </SectionCard>

      <SectionCard
        id="telephone-titre"
        title={account.phone ? t("phone.changeTitle") : t("phone.addTitle")}
        subtitle={t("phone.subtitle", { tu })}
      >
        {!phoneOpen ? (
          <p className="text-sm text-ink-muted">{t("phone.soon")}</p>
        ) : phoneStep === "code" && pendingNumber ? (
          <form action={verifyPhoneAction} className="space-y-3">
            <input type="hidden" name="numero" value={pendingNumber} />
            <input type="hidden" name="canal" value={first(params.canal)} />
            <p className="text-sm text-ink">
              {t(first(params.canal) === "sms" ? "phone.sentSms" : "phone.sentWhatsapp", { to: maskPhone(pendingNumber) })}
            </p>
            <label htmlFor="code-telephone" className="block text-sm font-medium text-ink">
              {t("phone.codeLabel")}
            </label>
            <input
              id="code-telephone"
              name="code"
              required
              inputMode="numeric"
              autoComplete="one-time-code"
              pattern="[0-9 ]{6,7}"
              maxLength={7}
              aria-invalid={first(params.erreur) === "code" || undefined}
              className={cn(INPUT_CLASS, "text-center text-xl font-semibold tracking-[0.4em]")}
            />
            {first(params.erreur) === "code" ? <Notice tone="error">{t("phone.wrongCode", { tu })}</Notice> : null}
            <Button type="submit" size="sm">
              {t("phone.verify")}
            </Button>
          </form>
        ) : (
          <form action={addPhoneAction} className="space-y-3">
            <label htmlFor="nouveau-telephone" className="block text-sm font-medium text-ink">
              {t("phone.label")}
            </label>
            <div className="flex gap-2">
              <DialCodeSelect countries={phoneCountries()} name="pays" label={t("phone.dialCode")} />
              <input
                id="nouveau-telephone"
                name="telephone"
                type="tel"
                inputMode="tel"
                required
                pattern="[0-9 +]{6,16}"
                autoComplete="tel-national"
                className={INPUT_CLASS}
              />
            </div>
            <p className="text-xs text-ink-muted">{t("phone.hint", { tu })}</p>
            <Button type="submit" variant="outline" size="sm">
              {t("phone.send")}
            </Button>
          </form>
        )}
      </SectionCard>

      <SectionCard id="session-titre" title={t("session.title")} subtitle={t("session.subtitle", { tu })}>
        <form action={signOutAction}>
          <Button type="submit" variant="outline" size="sm">
            <LogOut className="size-4" aria-hidden />
            {t("session.signOut")}
          </Button>
        </form>
      </SectionCard>

      <SectionCard id="suppression-titre" title={t("deletion.title")} subtitle={t("deletion.subtitle", { tu })} className="border-danger-500/40">
        <ButtonLink href="/compte/suppression" variant="ghost" size="sm" className="text-danger-700 hover:bg-danger-50">
          <Trash className="size-4" aria-hidden />
          {t("deletion.cta")}
        </ButtonLink>
      </SectionCard>
    </div>
  );
}

export default async function AccountPage({ searchParams }: PageProps<"/compte">) {
  const t = await getTranslations("pages");
  return (
    <PageContainer width="narrow" className="space-y-5">
      <PageHeader title={t("account")} />
      <Suspense fallback={<Skeleton className="h-96 rounded-2xl" />}>
        <AccountContent searchParams={searchParams} />
      </Suspense>
    </PageContainer>
  );
}
