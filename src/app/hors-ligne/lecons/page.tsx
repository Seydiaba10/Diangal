import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { Logo } from "@/components/layout/logo";
import { OfflineReader } from "@/features/offline/components/offline-reader";

export async function generateMetadata() {
  const t = await getTranslations("offline");
  return { title: t("readerTitle") };
}

/** Lecteur des chapitres téléchargés : page statique précachée, contenu lu dans IndexedDB. */
export default async function OfflineLessonsPage() {
  const messages = await getMessages();
  return (
    <main id="contenu" className="mx-auto min-h-dvh max-w-3xl space-y-6 px-4 py-6">
      <Logo href="/demarrer" />
      <NextIntlClientProvider messages={{ offline: messages.offline }}>
        <Suspense fallback={<div className="h-64 animate-pulse rounded-2xl bg-idle-50" aria-hidden />}>
          <OfflineReader />
        </Suspense>
      </NextIntlClientProvider>
    </main>
  );
}
