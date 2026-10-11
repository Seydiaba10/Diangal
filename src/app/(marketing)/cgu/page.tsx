import { LegalPage, legalMetadata } from "@/features/marketing/components/legal-page";

export const generateMetadata = legalMetadata("terms");

export default function TermsPage() {
  return <LegalPage page="terms" />;
}
