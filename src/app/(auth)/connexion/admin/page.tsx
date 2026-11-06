import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { PasswordLoginForm } from "@/features/account/components/password-login-form";
import { isPinLoginEnabled } from "@/lib/env";

export async function generateMetadata() {
  const t = await getTranslations("auth.password.admin");
  return { title: t("metaTitle"), robots: { index: false, follow: false } };
}

async function AdminLogin({ searchParams }: { searchParams: PageProps<"/connexion/admin">["searchParams"] }) {
  if (!isPinLoginEnabled()) notFound();
  return <PasswordLoginForm space="admin" searchParams={searchParams} />;
}

/**
 * Connexion de l'administrateur : e-mail + mot de passe, puis double authentification (/connexion/securite).
 * Adresse liée nulle part sur le site. Le même compte qu'aujourd'hui : aucun compte n'est créé ici.
 */
export default function AdminLoginPage({ searchParams }: PageProps<"/connexion/admin">) {
  return (
    <Suspense fallback={<Skeleton className="h-80" />}>
      <AdminLogin searchParams={searchParams} />
    </Suspense>
  );
}
