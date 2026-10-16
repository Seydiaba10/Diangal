import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { AuthCard } from "@/features/account/components/auth-card";
import { LoginPanel } from "@/features/account/components/login-panel";

export async function generateMetadata() {
  const t = await getTranslations("auth.login");
  return { title: t("metaTitle.repetiteur") };
}

/** Connexion des répétiteurs, à part de celle des élèves et des parents. */
export default async function TutorLoginPage({ searchParams }: PageProps<"/connexion/repetiteur">) {
  const t = await getTranslations("auth.login");
  return (
    <AuthCard title={t("title")} subtitle={t("subtitle.repetiteur")} centered>
      <Suspense fallback={<Skeleton className="h-96" />}>
        <LoginPanel space="repetiteur" searchParams={searchParams} />
      </Suspense>
    </AuthCard>
  );
}
