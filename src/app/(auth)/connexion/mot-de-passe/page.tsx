import { ArrowLeft, CircleAlert, Info, Mail } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Notice } from "@/components/ui/notice";
import { Skeleton } from "@/components/ui/skeleton";
import { AuthCard, PILL_BUTTON, PILL_INPUT } from "@/features/account/components/auth-card";
import { richMark } from "@/features/account/components/highlight";
import { PasswordField } from "@/features/account/components/password-field";
import { PinBoxes } from "@/features/account/components/pin-boxes";
import { requestPasswordResetAction, resetPasswordAction } from "@/features/account/password-actions";
import { isPinLoginEnabled, isSupabaseConfigured } from "@/lib/env";

export async function generateMetadata() {
  const t = await getTranslations("auth.password.reset");
  return { title: t("metaTitle") };
}

const ERRORS = ["email", "limit", "code", "short", "letters", "digits", "long", "different", "weak", "enregistrement"] as const;
const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";

async function ResetForm({ searchParams }: { searchParams: PageProps<"/connexion/mot-de-passe">["searchParams"] }) {
  if (!isPinLoginEnabled()) notFound();
  const params = await searchParams;
  const t = await getTranslations("auth.password");
  const space = first(params.espace) === "admin" ? "admin" : "repetiteur";
  const email = first(params.email);
  const codeStep = first(params.etape) === "code" && email;
  const error = ERRORS.find((e) => e === first(params.erreur));
  const errorLine = error ? (
    <p role="alert" className="flex items-start gap-1.5 text-sm font-medium text-danger-700">
      <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden />
      {t(`reset.errors.${error}`)}
    </p>
  ) : null;

  if (!codeStep) {
    return (
      <AuthCard title={t.rich("reset.title", richMark)} subtitle={t("reset.subtitle")}>
        <form action={requestPasswordResetAction} className="space-y-4">
          <input type="hidden" name="espace" value={space} />
          {errorLine}
          <div>
            <label htmlFor="email" className="text-sm font-semibold text-brand-800">
              {t("email")}
            </label>
            <input id="email" name="email" type="email" required autoComplete="email" defaultValue={email} className={`${PILL_INPUT} mt-1.5`} />
          </div>
          <button type="submit" className={PILL_BUTTON}>
            <Mail className="size-5" aria-hidden />
            {t("reset.send")}
          </button>
        </form>
      </AuthCard>
    );
  }

  const strength = [t("strength.0"), t("strength.1"), t("strength.2"), t("strength.3"), t("strength.4")];
  return (
    <AuthCard title={t.rich("reset.newTitle", richMark)}>
      <form action={resetPasswordAction} className="space-y-4">
        <input type="hidden" name="espace" value={space} />
        <input type="hidden" name="email" value={email} />
        <Notice tone="info">{t("reset.sent", { email })}</Notice>
        <div className="space-y-2">
          <label htmlFor="code" className="text-sm font-semibold text-brand-800">
            {t("reset.code")}
          </label>
          <PinBoxes id="code" name="code" secret={false} invalid={error === "code"} />
        </div>
        <PasswordField
          id="password"
          name="password"
          label={t("reset.newPassword")}
          showLabel={t("show")}
          hideLabel={t("hide")}
          autoComplete="new-password"
          strengthLabels={strength}
          invalid={error === "short" || error === "letters" || error === "digits" || error === "weak"}
        />
        <p className="-mt-2 text-xs text-ink-muted">{t("rules")}</p>
        <PasswordField
          id="passwordConfirm"
          name="passwordConfirm"
          label={t("reset.confirm")}
          showLabel={t("show")}
          hideLabel={t("hide")}
          autoComplete="new-password"
          invalid={error === "different"}
        />
        {errorLine}
        {isSupabaseConfigured() ? null : (
          <p className="flex gap-2 rounded-xl bg-brand-50 p-3 text-sm text-brand-800">
            <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
            {t("reset.demoHint")}
          </p>
        )}
        <button type="submit" className={PILL_BUTTON}>
          {t("reset.submit")}
        </button>
        <p className="text-center text-sm text-ink-muted">{t("reset.others")}</p>
      </form>
    </AuthCard>
  );
}

/** Mot de passe oublié (répétiteurs, administrateur) : code par e-mail, puis nouveau mot de passe. */
export default function PasswordResetPage({ searchParams }: PageProps<"/connexion/mot-de-passe">) {
  return (
    <div className="space-y-4">
      <Link href="/connexion/repetiteur" className="-my-1 inline-flex min-h-11 items-center gap-1.5 font-semibold text-brand-700">
        <ArrowLeft className="size-[18px]" aria-hidden />
        <BackLabel />
      </Link>
      <Suspense fallback={<Skeleton className="h-80" />}>
        <ResetForm searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function BackLabel() {
  const t = await getTranslations("auth.password.reset");
  return t("back");
}
