import { Download, Wifi, WifiOff } from "lucide-react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { SectionCard } from "@/components/ui/section-card";
import { Skeleton } from "@/components/ui/skeleton";
import { DataSaverForm } from "@/features/account/components/data-saver-form";
import { DownloadsList } from "@/features/offline/components/downloads-list";
import { InstallAppButton } from "@/features/offline/components/install-app-button";

export async function generateMetadata() {
  const t = await getTranslations("pages");
  return { title: t("downloads") };
}

export default async function DownloadsPage() {
  const [tPages, t, messages] = await Promise.all([getTranslations("pages"), getTranslations("downloadsPage"), getMessages()]);
  return (
    <PageContainer className="space-y-5 lg:space-y-7">
      <PageHeader title={tPages("downloads")} subtitle={t("subtitle")} />
      <NextIntlClientProvider messages={{ offline: messages.offline }}>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="space-y-5">
            <DownloadsList />
            <SectionCard id="comment-titre" title={t("howTitle")}>
              <ol className="space-y-3">
                {([
                  ["wifi", Wifi],
                  ["download", Download],
                  ["offline", WifiOff],
                ] as const).map(([key, Icon], i) => (
                  <li key={key} className="flex gap-3 text-sm text-ink">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                      <Icon className="size-4" aria-hidden />
                    </span>
                    <span className="pt-2">
                      <span className="font-semibold">{i + 1}. </span>
                      {t(`how.${key}`)}
                    </span>
                  </li>
                ))}
              </ol>
            </SectionCard>
          </div>
          <aside className="space-y-4">
            <InstallAppButton />
            <Suspense fallback={<Skeleton className="h-32 rounded-2xl" />}>
              <DataSaverForm />
            </Suspense>
            <p className="rounded-2xl bg-brand-50 p-4 text-sm text-brand-800">{t("storageHint")}</p>
          </aside>
        </div>
      </NextIntlClientProvider>
    </PageContainer>
  );
}
