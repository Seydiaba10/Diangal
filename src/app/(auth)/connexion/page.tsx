import { Mail, MessageCircle, Smartphone } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Notice } from "@/components/ui/notice";
import { Skeleton } from "@/components/ui/skeleton";
import { requestLoginCodeAction } from "@/features/account/actions";
import { AuthCard, INPUT_CLASS } from "@/features/account/components/auth-card";
import { ROLES } from "@/features/account/roles";
import { cn } from "@/lib/cn";
import { isSmsEnabled, isSupabaseConfigured, isWhatsAppEnabled } from "@/lib/env";

const ERRORS = ["email", "phone", "unknown", "limit", "sms", "whatsapp", "send", "profil", "lien"] as const;
const CHANNEL_ICONS = { whatsapp: MessageCircle, sms: Smartphone, email: Mail } as const;
type Channel = keyof typeof CHANNEL_ICONS;

export async function generateMetadata() {
  const t = await getTranslations("auth.login");
  return { title: t("title") };
}

async function LoginForm({ searchParams }: { searchParams: PageProps<"/connexion">["searchParams"] }) {
  const { mode, erreur, next } = await searchParams;
  const demo = !isSupabaseConfigured();
  // Canaux ouverts : WhatsApp et SMS seulement quand leur fournisseur est branché ; l'email toujours.
  const channels: Channel[] = [
    ...(demo || isWhatsAppEnabled() ? (["whatsapp"] as const) : []),
    ...(demo || isSmsEnabled() ? (["sms"] as const) : []),
    "email",
  ];
  const channel = channels.find((c) => c === mode) ?? channels[0]!;
  const email = channel === "email";
  const error = ERRORS.find((e) => e === erreur);
  const [t, tDemo] = await Promise.all([getTranslations("auth.login"), getTranslations("demo")]);

  return (
    <>
      {error ? <Notice tone="error">{t(`errors.${error}`)}</Notice> : null}
      {channels.length > 1 ? (
        <div className="mt-4 flex gap-1 rounded-xl bg-canvas p-1">
          {channels.map((c) => {
            const Icon = CHANNEL_ICONS[c];
            return (
              <Link
                key={c}
                href={`/connexion?${new URLSearchParams({ mode: c, ...(typeof next === "string" ? { next } : {}) })}`}
                aria-current={c === channel ? "page" : undefined}
                className={cn(
                  "flex h-11 flex-1 items-center justify-center gap-1.5 rounded-lg text-sm font-medium",
                  c === channel ? "bg-surface text-ink shadow-sm" : "text-ink-muted",
                )}
              >
                <Icon className="size-4" aria-hidden />
                {t(`tabs.${c}`)}
              </Link>
            );
          })}
        </div>
      ) : (
        <p className="mt-4 text-sm text-ink-muted">{t("phoneSoon")}</p>
      )}

      <form action={requestLoginCodeAction} className="mt-5 space-y-4">
        <input type="hidden" name="mode" value={channel} />
        {typeof next === "string" ? <input type="hidden" name="next" value={next} /> : null}
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
            <p className="mt-1.5 text-xs text-ink-muted">{t("emailHint")}</p>
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
            <p className="mt-1.5 text-xs text-ink-muted">{t(channel === "whatsapp" ? "whatsappHint" : "phoneHint")}</p>
          </div>
        )}

        {demo ? (
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
        ) : null}

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
