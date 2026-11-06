import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { AuthCard } from "@/features/account/components/auth-card";
import { LoginPanel } from "@/features/account/components/login-panel";
import { PinLoginForm } from "@/features/account/components/pin-login-form";
import { isPinLoginEnabled } from "@/lib/env";

export async function generateMetadata() {
  const t = await getTranslations("auth.login");
  return { title: t("metaTitle.famille") };
}

/** Choix du formulaire : numéro + code PIN (ou, au choix, e-mail + code PIN) ; sans code PIN, code par e-mail. */
async function LoginChoice({ searchParams }: { searchParams: PageProps<"/connexion">["searchParams"] }) {
  const params = await searchParams;
  if (isPinLoginEnabled()) return <PinLoginForm searchParams={searchParams} channel={params.mode === "email" ? "email" : "phone"} />;
  const t = await getTranslations("auth.login");
  return (
    <AuthCard title={t("title")} subtitle={t("subtitle.famille")} centered>
      <LoginPanel space="famille" searchParams={searchParams} />
    </AuthCard>
  );
}

/** Connexion des élèves et des parents (les répétiteurs ont leur propre page). */
export default function LoginPage({ searchParams }: PageProps<"/connexion">) {
  return (
    <Suspense fallback={<Skeleton className="h-96" />}>
      <LoginChoice searchParams={searchParams} />
    </Suspense>
  );
}
