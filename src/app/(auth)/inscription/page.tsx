import Link from "next/link";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { AuthCard } from "@/features/account/components/auth-card";
import { SignupWizard } from "@/features/account/components/signup-wizard";
import { emailHasCode, isSupabaseConfigured, isWhatsAppEnabled } from "@/lib/env";

export async function generateMetadata() {
  const t = await getTranslations("signup");
  return { title: t("title") };
}

async function Wizard({ searchParams }: { searchParams: PageProps<"/inscription">["searchParams"] }) {
  const { role } = await searchParams;
  const initialRole = role === "student" || role === "parent" || role === "tutor" ? role : null;
  const messages = await getMessages();
  return (
    <NextIntlClientProvider messages={{ signup: messages.signup, levels: messages.levels, cycles: messages.cycles, subjects: messages.subjects }}>
      <SignupWizard
        initialRole={initialRole}
        whatsappEnabled={!isSupabaseConfigured() || isWhatsAppEnabled()}
        emailCode={emailHasCode()}
        demo={!isSupabaseConfigured()}
      />
    </NextIntlClientProvider>
  );
}

export default async function SignupPage({ searchParams }: PageProps<"/inscription">) {
  const t = await getTranslations("signup");
  return (
    <AuthCard
      title={t("title")}
      subtitle={
        <>
          {t("hasAccount")}{" "}
          <Link href="/connexion" className="font-medium text-brand-700 hover:underline">
            {t("signInLink")}
          </Link>
        </>
      }
    >
      <Suspense fallback={<Skeleton className="h-80" />}>
        <Wizard searchParams={searchParams} />
      </Suspense>
    </AuthCard>
  );
}
