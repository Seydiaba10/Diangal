import { ShieldCheck } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Suspense, type ReactNode } from "react";
import { Logo } from "@/components/layout/logo";
import { FlagStripe } from "@/components/ui/senegal-flag";
import { richMark } from "@/features/account/components/highlight";
import { ProfileCards, ProfilePicker } from "@/features/account/components/profile-picker";
import { profileLabels } from "@/features/account/profile-labels";
import { isPinLoginEnabled } from "@/lib/env";

/** Nouvelle présentation : colonne verte avec les profils sur ordinateur, colonne blanche du formulaire. */
async function SplitLayout({ children }: { children: ReactNode }) {
  const [t, tPanel, labels] = await Promise.all([getTranslations("auth"), getTranslations("auth.panel"), profileLabels()]);
  return (
    <div className="flex min-h-dvh flex-col bg-surface">
      <FlagStripe />
      <div className="flex flex-1">
        <aside className="hidden w-[min(42%,560px)] shrink-0 flex-col gap-7 bg-brand-50 px-12 pb-9 pt-7 lg:flex">
          <Logo href="/" />
          <div className="mt-3 space-y-3">
            <p className="text-4xl font-bold leading-tight tracking-tight text-brand-800">{tPanel.rich("headline", richMark)}</p>
            <p className="text-base leading-normal text-ink-muted">{tPanel("sub")}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-semibold text-brand-800">{tPanel("iAm")}</p>
            <Suspense fallback={<ProfileCards labels={labels} size="panel" current={null} />}>
              <ProfilePicker labels={labels} size="panel" />
            </Suspense>
          </div>
          <p className="mt-auto flex items-center gap-2 text-sm text-brand-800">
            <ShieldCheck className="size-[18px]" aria-hidden />
            {tPanel("noAds")}
          </p>
        </aside>
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex items-center justify-between gap-3 px-5 pt-3 lg:justify-end lg:px-12 lg:pt-4">
            <span className="lg:hidden">
              <Logo href="/" />
            </span>
            <Link href="/" className="flex min-h-11 items-center text-sm font-medium text-ink-muted underline hover:text-ink">
              {t("backToSite")}
            </Link>
          </header>
          <main id="contenu" className="mx-auto flex w-full max-w-[440px] flex-1 flex-col justify-center px-5 pb-6 pt-3 lg:py-10">
            {children}
          </main>
          <footer className="px-5 pb-6 text-center text-xs text-ink-subtle">
            <Link href="/confidentialite" className="hover:underline">
              {t("privacyLink")}
            </Link>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default async function AuthLayout({ children }: { children: ReactNode }) {
  if (isPinLoginEnabled()) return <SplitLayout>{children}</SplitLayout>;
  const t = await getTranslations("auth");
  return (
    <div className="flex min-h-dvh flex-col bg-cream">
      <FlagStripe />
      <header className="mx-auto flex w-full max-w-md items-center justify-between px-4 pt-6">
        <Logo href="/" />
        <Link href="/" className="text-sm font-medium text-ink-muted hover:text-ink">
          {t("backToSite")}
        </Link>
      </header>
      <main id="contenu" className="mx-auto w-full max-w-md flex-1 px-4 py-8">
        {children}
      </main>
      <footer className="mx-auto w-full max-w-md px-4 pb-6 text-center text-xs text-ink-subtle">
        <Link href="/confidentialite" className="hover:underline">
          {t("privacyLink")}
        </Link>
      </footer>
    </div>
  );
}
