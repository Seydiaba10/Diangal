import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { AuthCard } from "@/features/account/components/auth-card";
import { LoginPanel } from "@/features/account/components/login-panel";
import { PasswordLoginForm } from "@/features/account/components/password-login-form";
import { isPinLoginEnabled } from "@/lib/env";

export async function generateMetadata() {
  const t = await getTranslations("auth.login");
  return { title: t("metaTitle.repetiteur") };
}

/** E-mail + mot de passe (connexion par code PIN ouverte), ou code par email (ancienne connexion). */
async function TutorLoginChoice({ searchParams }: { searchParams: PageProps<"/connexion/repetiteur">["searchParams"] }) {
  const params = await searchParams;
  if (isPinLoginEnabled() && params.mode !== "email") return <PasswordLoginForm space="repetiteur" searchParams={searchParams} />;
  const t = await getTranslations("auth.login");
  return (
    <AuthCard title={t("title")} subtitle={t("subtitle.repetiteur")} centered>
      <LoginPanel space="repetiteur" searchParams={searchParams} />
    </AuthCard>
  );
}

/** Connexion des répétiteurs, à part de celle des élèves et des parents. */
export default function TutorLoginPage({ searchParams }: PageProps<"/connexion/repetiteur">) {
  return (
    <Suspense fallback={<Skeleton className="h-96" />}>
      <TutorLoginChoice searchParams={searchParams} />
    </Suspense>
  );
}
