import type { ReactNode } from "react";
import { FlagStripe } from "@/components/ui/senegal-flag";
import { MarketingFooter } from "@/features/marketing/components/marketing-footer";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col bg-cream">
      <FlagStripe />
      <main id="contenu" className="flex-1">
        {children}
      </main>
      <MarketingFooter />
    </div>
  );
}
