import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { AuthCard } from "@/features/account/components/auth-card";
import { LoginPanel } from "@/features/account/components/login-panel";

export async function generateMetadata() {
  const t = await getTranslations("auth.login");
  return { title: t("metaTitle.famille") };
}

/** Connexion des élèves et des parents (les répétiteurs ont leur propre page). */
export default async function LoginPage({ searchParams }: PageProps<"/connexion">) {
  const t = await getTranslations("auth.login");
  return (
    <AuthCard title={t("title")} subtitle={t("subtitle.famille")} centered>
      <Suspense fallback={<Skeleton className="h-96" />}>
        <LoginPanel space="famille" searchParams={searchParams} />
      </Suspense>
    </AuthCard>
  );
}
