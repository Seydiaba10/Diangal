import Link from "next/link";
import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";
import { Logo } from "@/components/layout/logo";

export default async function AuthLayout({ children }: { children: ReactNode }) {
  const t = await getTranslations("auth");
  return (
    <div className="flex min-h-dvh flex-col bg-cream">
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
