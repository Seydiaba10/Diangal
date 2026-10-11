import { CircleAlert, Info } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { verifyDemoCodeAction } from "@/features/account/actions";
import { AuthCard, INPUT_CLASS } from "@/features/account/components/auth-card";
import { cn } from "@/lib/cn";

export async function generateMetadata() {
  const t = await getTranslations("auth.code");
  return { title: t("title") };
}

/** « 771234567 » → « 77 ••• •• 67 » ; un email est masqué de la même façon. */
function maskIdentifier(value: string): string {
  if (value.includes("@")) {
    const [name = "", domain = ""] = value.split("@");
    return `${name.slice(0, 2)}•••@${domain}`;
  }
  const digits = value.replace(/\D/g, "");
  return digits.length >= 4 ? `${digits.slice(0, 2)} ••• •• ${digits.slice(-2)}` : value;
}

async function CodeForm({ searchParams }: { searchParams: PageProps<"/connexion/code">["searchParams"] }) {
  const params = await searchParams;
  const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";
  const identifiant = first(params.identifiant);
  const role = first(params.role) || "student";
  const error = first(params.erreur) === "code";
  const t = await getTranslations("auth.code");

  return (
    <>
      <p className="text-sm text-ink-muted">{t("sentTo", { to: maskIdentifier(identifiant) })}</p>
      <form action={verifyDemoCodeAction} className="mt-5 space-y-4">
        <input type="hidden" name="role" value={role} />
        <input type="hidden" name="identifiant" value={identifiant} />
        <div>
          <label htmlFor="code" className="text-sm font-medium text-ink">
            {t("label")}
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
        <p className="flex gap-2 rounded-xl bg-brand-50 p-3 text-sm text-brand-800">
          <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
          {t("demoHint")}
        </p>
        <Button type="submit" className="w-full">
          {t("submit")}
        </Button>
      </form>
      <div className="mt-4 flex justify-between text-sm">
        <Link href="/connexion" className="font-medium text-brand-700 hover:underline">
          {t("changeNumber")}
        </Link>
        <span className="text-ink-subtle">{t("resendIn")}</span>
      </div>
    </>
  );
}

export default async function CodePage({ searchParams }: PageProps<"/connexion/code">) {
  const t = await getTranslations("auth.code");
  return (
    <AuthCard title={t("title")}>
      <Suspense fallback={<Skeleton className="h-64" />}>
        <CodeForm searchParams={searchParams} />
      </Suspense>
    </AuthCard>
  );
}
