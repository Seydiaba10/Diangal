import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ButtonLink } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { AttemptPlayer } from "@/features/assessments/components/attempt-player";
import { getAttemptSession } from "@/features/assessments/data";

async function AttemptLoader({ id }: { id: string }) {
  const session = await getAttemptSession(id);
  if (session === "submitted") redirect(`/eleve/tentatives/${id}/resultat`);
  if (session === null) {
    const [t, tResult] = await Promise.all([getTranslations("player"), getTranslations("result")]);
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center">
        <p className="text-ink">{t("notFound")}</p>
        <ButtonLink href="/eleve/entrainement" variant="outline" className="mt-6">
          {tResult("backToPractice")}
        </ButtonLink>
      </div>
    );
  }
  const messages = await getMessages();
  return (
    // Seuls les textes du lecteur sont envoyés au navigateur.
    <NextIntlClientProvider messages={{ player: messages.player }}>
      <AttemptPlayer session={session} />
    </NextIntlClientProvider>
  );
}

export default function AttemptPage({ params }: PageProps<"/eleve/tentatives/[id]">) {
  return (
    <Suspense
      fallback={
        <div className="mx-auto w-full max-w-3xl space-y-4 px-4 py-5">
          <Skeleton className="h-12" />
          <Skeleton className="h-32 rounded-2xl" />
        </div>
      }
    >
      {params.then(({ id }) => (
        <AttemptLoader id={id} />
      ))}
    </Suspense>
  );
}
