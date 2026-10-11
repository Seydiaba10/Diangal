import { LegalPage, legalMetadata } from "@/features/marketing/components/legal-page";

export const generateMetadata = legalMetadata("notice");

export default function LegalNoticePage() {
  return <LegalPage page="notice" />;
}
