import { BookOpen, WifiOff } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Logo } from "@/components/layout/logo";

export async function generateMetadata() {
  const t = await getTranslations("offline");
  return { title: t("pageTitle") };
}

/** Page de repli précachée : affichée par le service worker quand une page n'est pas disponible. */
export default async function OfflinePage() {
  const t = await getTranslations("offline");
  return (
    <main id="contenu" className="mx-auto flex min-h-dvh max-w-md flex-col px-4 py-8">
      <Logo href="/" />
      <div className="my-auto text-center">
        <span className="mx-auto flex size-16 items-center justify-center rounded-3xl bg-brand-50 text-brand-700">
          <WifiOff className="size-8" aria-hidden />
        </span>
        <h1 className="mt-5 text-2xl font-bold text-ink">{t("pageTitle")}</h1>
        <p className="mt-2 text-ink-muted">{t("pageBody")}</p>
        <Link
          href="/hors-ligne/lecons"
          className="mt-6 inline-flex h-12 items-center gap-2 rounded-xl bg-brand-600 px-5 font-medium text-white hover:bg-brand-700"
        >
          <BookOpen className="size-5" aria-hidden />
          {t("openDownloads")}
        </Link>
      </div>
    </main>
  );
}
