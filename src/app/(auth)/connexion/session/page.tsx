import { CircleAlert, LogOut } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { AuthCard, PILL_BUTTON } from "@/features/account/components/auth-card";
import { richMark } from "@/features/account/components/highlight";
import { PinBoxes } from "@/features/account/components/pin-boxes";
import { confirmSessionPinAction, notMeAction } from "@/features/account/pin-actions";
import { getAuthIdentity } from "@/features/account/session";
import { maskPhone } from "@/lib/phone";
import { isSupabaseConfigured } from "@/lib/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function generateMetadata() {
  const t = await getTranslations("auth.pin.session");
  return { title: t("metaTitle") };
}

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";

async function SessionForm({ searchParams }: { searchParams: PageProps<"/connexion/session">["searchParams"] }) {
  const params = await searchParams;
  const t = await getTranslations("auth.pin.session");
  let name = "";
  let phone = "";
  if (isSupabaseConfigured()) {
    const identity = await getAuthIdentity();
    if (identity) {
      const supabase = await createSupabaseServerClient();
      const { data } = await supabase.from("profiles").select("first_name").eq("id", identity.userId).maybeSingle();
      name = data?.first_name ?? "";
      phone = identity.phone ? maskPhone(identity.phone) : "";
    }
  }
  const error = first(params.erreur);
  const next = first(params.next);
  return (
    <AuthCard title={t.rich(name ? "title" : "titleNoName", { ...richMark, name })} subtitle={t("subtitle")}>
      <form action={confirmSessionPinAction} className="space-y-4">
        {next ? <input type="hidden" name="next" value={next} /> : null}
        {phone ? (
          <p className="flex items-center gap-3 rounded-2xl border-[1.5px] border-line p-3">
            <span aria-hidden className="flex size-12 shrink-0 items-center justify-center rounded-full bg-cycle-middle text-lg font-bold text-ink">
              {name.slice(0, 1).toUpperCase()}
            </span>
            <span className="text-sm text-ink-muted">
              <span className="block text-base font-bold text-ink">{name}</span>
              {phone}
            </span>
          </p>
        ) : null}
        <div className="space-y-2">
          <label htmlFor="pin" className="text-sm font-semibold text-brand-800">
            {t("pin")}
          </label>
          <PinBoxes id="pin" name="pin" autoFocus invalid={error === "identifiants"} />
        </div>
        {error === "identifiants" || error === "bloque" ? (
          <p role="alert" className="flex items-start gap-1.5 text-sm font-medium text-danger-700">
            <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden />
            {t(`errors.${error}`)}
          </p>
        ) : null}
        <button type="submit" className={PILL_BUTTON}>
          {t("submit")}
        </button>
      </form>
      <form action={notMeAction} className="mt-2">
        <button type="submit" className="flex min-h-11 w-full items-center justify-center gap-2 font-semibold text-brand-700">
          <LogOut className="size-[18px]" aria-hidden />
          {t("notMe")}
        </button>
      </form>
      <p className="mt-2 text-center text-sm text-ink-muted">
        {t("why")}{" "}
        <Link href="/connexion/pin-oublie" className="font-semibold text-brand-700 underline">
          {t("forgot")}
        </Link>
      </p>
    </AuthCard>
  );
}

/** Code PIN redemandé après 30 jours sans visite sur son téléphone : sans message, sans nouvelle session. */
export default function SessionPinPage({ searchParams }: PageProps<"/connexion/session">) {
  return (
    <Suspense fallback={<Skeleton className="h-80" />}>
      <SessionForm searchParams={searchParams} />
    </Suspense>
  );
}
