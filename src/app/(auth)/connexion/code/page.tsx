import { CircleAlert, Info } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Notice } from "@/components/ui/notice";
import { Skeleton } from "@/components/ui/skeleton";
import { resendLoginCodeAction, verifyLoginCodeAction } from "@/features/account/actions";
import { AuthCard, INPUT_CLASS } from "@/features/account/components/auth-card";
import { LOGIN_PATH, parseSpace } from "@/features/account/roles";
import { cn } from "@/lib/cn";
import { emailHasCode, isSupabaseConfigured } from "@/lib/env";

export async function generateMetadata() {
  const t = await getTranslations("auth.code");
  return { title: t("title") };
}

/** « +221771234567 » → « 77 ••• •• 67 » ; un email est masqué de la même façon. */
function maskIdentifier(value: string): string {
  if (value.includes("@")) {
    const [name = "", domain = ""] = value.split("@");
    return `${name.slice(0, 2)}•••@${domain}`;
  }
  const digits = value.replace(/\D/g, "").replace(/^221(?=\d{9}$)/, "");
  return digits.length >= 4 ? `${digits.slice(0, 2)} ••• •• ${digits.slice(-2)}` : value;
}

async function CodeForm({ searchParams }: { searchParams: PageProps<"/connexion/code">["searchParams"] }) {
  const params = await searchParams;
  const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";
  const identifiant = first(params.identifiant);
  const rawCanal = first(params.canal);
  const canal = rawCanal === "sms" || rawCanal === "whatsapp" ? rawCanal : "email";
  const space = parseSpace(first(params.espace));
  const role = first(params.role) || (space === "repetiteur" ? "tutor" : "student");
  const next = first(params.next);
  const error = first(params.erreur) === "code";
  const demo = !isSupabaseConfigured();
  // Tant que les emails n'ont pas de code (offre gratuite Supabase), on se connecte par le lien.
  const linkMode = !demo && canal === "email" && !emailHasCode();
  const t = await getTranslations("auth.code");

  const hidden = (
    <>
      <input type="hidden" name="identifiant" value={identifiant} />
      <input type="hidden" name="canal" value={canal} />
      <input type="hidden" name="espace" value={space} />
      {demo ? <input type="hidden" name="role" value={role} /> : null}
      {next ? <input type="hidden" name="next" value={next} /> : null}
    </>
  );

  return (
    <>
      {first(params.renvoye) ? <Notice tone="success">{t("resent")}</Notice> : null}
      {linkMode ? (
        <p className="mt-2 rounded-xl bg-brand-50 p-3 text-sm font-medium text-brand-800">
          {t("linkSent", { to: maskIdentifier(identifiant) })}
        </p>
      ) : (
        <p className="mt-2 text-sm text-ink-muted">
          {t(canal === "whatsapp" ? "sentToWhatsapp" : "sentTo", { to: maskIdentifier(identifiant) })}
        </p>
      )}
      <form action={verifyLoginCodeAction} className="mt-5 space-y-4">
        {hidden}
        <div>
          <label htmlFor="code" className="text-sm font-medium text-ink">
            {linkMode ? t("codeOptional") : t("label")}
          </label>
          <input
            id="code"
            name="code"
            required
            inputMode="numeric"
            autoComplete="one-time-code"
            pattern="[0-9 ]{6,7}"
            maxLength={7}
            aria-invalid={error || undefined}
            aria-describedby={error ? "code-erreur" : undefined}
            className={cn(INPUT_CLASS, "mt-1.5 text-center text-2xl font-semibold tracking-[0.5em]")}
          />
          {error ? (
            <p id="code-erreur" className="mt-2 flex items-center gap-1.5 text-sm font-medium text-danger-700">
              <CircleAlert className="size-4" aria-hidden />
              {t("error")}
            </p>
          ) : null}
        </div>
        {demo ? (
          <p className="flex gap-2 rounded-xl bg-brand-50 p-3 text-sm text-brand-800">
            <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
            {t("demoHint")}
          </p>
        ) : null}
        <Button type="submit" className="w-full">
          {t("submit")}
        </Button>
      </form>
      <div className="mt-4 flex items-center justify-between gap-3 text-sm">
        <Link href={`${LOGIN_PATH[space]}?mode=${canal}`} className="font-medium text-brand-700 hover:underline">
          {canal === "email" ? t("changeEmail") : t("changeNumber")}
        </Link>
        <form action={resendLoginCodeAction}>
          {hidden}
          <button type="submit" className="h-11 rounded-lg px-2 font-medium text-brand-700 hover:bg-brand-50">
            {t("resend")}
          </button>
        </form>
      </div>
    </>
  );
}

export default async function CodePage({ searchParams }: PageProps<"/connexion/code">) {
  const t = await getTranslations("auth.code");
  return (
    <AuthCard title={t("title")} centered>
      <Suspense fallback={<Skeleton className="h-64" />}>
        <CodeForm searchParams={searchParams} />
      </Suspense>
    </AuthCard>
  );
}
