import { Mail, Smartphone } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { AuthCard, INPUT_CLASS } from "@/features/account/components/auth-card";
import { ROLES } from "@/features/account/roles";
import { cn } from "@/lib/cn";

export async function generateMetadata() {
  const t = await getTranslations("auth.login");
  return { title: t("title") };
}

async function LoginForm({ searchParams }: { searchParams: PageProps<"/connexion">["searchParams"] }) {
  const { mode } = await searchParams;
  const email = mode === "email";
  const [t, tDemo] = await Promise.all([getTranslations("auth.login"), getTranslations("demo")]);

  const tab = (href: string, label: string, active: boolean, Icon: typeof Mail) => (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex h-11 flex-1 items-center justify-center gap-2 rounded-lg text-sm font-medium",
        active ? "bg-surface text-ink shadow-sm" : "text-ink-muted",
      )}
    >
      <Icon className="size-4" aria-hidden />
      {label}
    </Link>
  );

  return (
    <>
      <div className="flex gap-1 rounded-xl bg-canvas p-1">
        {tab("/connexion", t("phoneTab"), !email, Smartphone)}
        {tab("/connexion?mode=email", t("emailTab"), email, Mail)}
      </div>

      {/* Phase 4 : envoi de l'OTP par Supabase Auth (SMS via Orange, email via Resend) + Turnstile. */}
      <form action="/connexion/code" className="mt-5 space-y-4">
        {email ? (
          <div>
            <label htmlFor="identifiant" className="text-sm font-medium text-ink">
              {t("emailLabel")}
            </label>
            <input
              id="identifiant"
              name="identifiant"
              type="email"
              required
              autoComplete="email"
              placeholder={t("emailPlaceholder")}
              className={cn(INPUT_CLASS, "mt-1.5")}
            />
          </div>
        ) : (
          <div>
            <label htmlFor="identifiant" className="text-sm font-medium text-ink">
              {t("phoneLabel")}
            </label>
            <div className="mt-1.5 flex gap-2">
              <span className="flex h-12 items-center rounded-xl border border-line bg-canvas px-3 font-medium text-ink">
                +221
              </span>
              <input
                id="identifiant"
                name="identifiant"
                type="tel"
                inputMode="numeric"
                required
                pattern="[0-9 ]{9,12}"
                autoComplete="tel-national"
                placeholder={t("phonePlaceholder")}
                className={INPUT_CLASS}
              />
            </div>
            <p className="mt-1.5 text-xs text-ink-muted">{t("phoneHint")}</p>
          </div>
        )}

        <fieldset className="rounded-xl border border-dashed border-line p-3">
          <legend className="px-1 text-xs font-medium text-ink-muted">{tDemo("loginAs")}</legend>
          <div className="grid grid-cols-2 gap-2">
            {ROLES.map((role, i) => (
              <label key={role} className="flex h-10 cursor-pointer items-center gap-2 rounded-lg bg-canvas px-3 text-sm text-ink">
                <input type="radio" name="role" value={role} defaultChecked={i === 0} className="accent-brand-600" />
                {tDemo(`roles.${role}`)}
              </label>
            ))}
          </div>
        </fieldset>

        <Button type="submit" className="w-full">
          {t("submit")}
        </Button>
      </form>
    </>
  );
}

export default async function LoginPage({ searchParams }: PageProps<"/connexion">) {
  const t = await getTranslations("auth.login");
  return (
    <AuthCard
      title={t("title")}
      subtitle={
        <>
          {t("noAccount")}{" "}
          <Link href="/inscription" className="font-medium text-brand-700 hover:underline">
            {t("signUpLink")}
          </Link>
        </>
      }
    >
      <Suspense fallback={<Skeleton className="h-72" />}>
        <LoginForm searchParams={searchParams} />
      </Suspense>
    </AuthCard>
  );
}
