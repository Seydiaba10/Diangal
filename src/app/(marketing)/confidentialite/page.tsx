import { LegalPage, legalMetadata } from "@/features/marketing/components/legal-page";

export const generateMetadata = legalMetadata("privacy");

export default function PrivacyPage() {
  return <LegalPage page="privacy" />;
}
