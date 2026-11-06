import Link from "next/link";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { AuthCard } from "@/features/account/components/auth-card";
import { SignupWizard } from "@/features/account/components/signup-wizard";
import { formatReferralCode, normalizeReferralCode } from "@/features/referrals/presets";
import { profileLabels } from "@/features/account/profile-labels";
import { emailHasCode, isPinLoginEnabled, isSmsEnabled, isSupabaseConfigured, isWhatsAppEnabled, phoneCountries } from "@/lib/env";

export async function generateMetadata() {
  const t = await getTranslations("signup");
  return { title: t("title") };
}

async function Wizard({ searchParams }: { searchParams: PageProps<"/inscription">["searchParams"] }) {
  const { role, parrain } = await searchParams;
  const initialRole = role === "student" || role === "parent" || role === "tutor" ? role : null;
  const referralCode = normalizeReferralCode(parrain);
  const [messages, labels] = await Promise.all([getMessages(), profileLabels()]);
  const pinMode = isPinLoginEnabled();
  return (
    <NextIntlClientProvider messages={{ signup: messages.signup, levels: messages.levels, cycles: messages.cycles, subjects: messages.subjects }}>
      <SignupWizard
        initialRole={initialRole}
        referralCode={referralCode ? formatReferralCode(referralCode) : ""}
        whatsappEnabled={!isSupabaseConfigured() || isWhatsAppEnabled()}
        smsEnabled={!isSupabaseConfigured() || isSmsEnabled()}
        countries={phoneCountries()}
        emailCode={emailHasCode()}
        demo={!isSupabaseConfigured()}
        pinMode={pinMode}
        photoAlts={pinMode ? { student: labels.alts.eleve, parent: labels.alts.parent, tutor: labels.alts.repetiteur } : undefined}
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
