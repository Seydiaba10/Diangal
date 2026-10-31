import { SerwistProvider } from "@serwist/turbopack/react";
import type { Metadata, Viewport } from "next";
import { Lexend, Playwrite_FR_Trad } from "next/font/google";
import { getTranslations } from "next-intl/server";
import { DEFAULT_LOCALE } from "@/i18n/request";
import "./globals.css";

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
  display: "swap",
});

// Écriture cursive scolaire des cahiers d'exercices (« neuf », « vingt-et-un ») : police sans
// sous-ensemble, donc jamais préchargée ; téléchargée seulement quand une page en affiche.
const cursive = Playwrite_FR_Trad({
  variable: "--font-cursive",
  weight: "400",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const [t, tPwa] = await Promise.all([getTranslations("meta"), getTranslations("pwa")]);
  return {
    title: { default: t("title"), template: `%s · ${t("title")}` },
    description: t("description"),
    applicationName: tPwa("name"),
    appleWebApp: { capable: true, title: tPwa("shortName"), statusBarStyle: "default" },
    icons: { apple: "/icons/apple-touch-icon.png" },
    formatDetection: { telephone: false },
  };
}

export const viewport: Viewport = {
  themeColor: "#00853f",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang={DEFAULT_LOCALE} className={`${lexend.variable} ${cursive.variable}`}>
      <body className="min-h-dvh">
        {/* Service worker désactivé en développement pour éviter les pages servies depuis le cache. */}
        <SerwistProvider swUrl="/serwist/sw.js" disable={process.env.NODE_ENV === "development"}>
          {children}
        </SerwistProvider>
      </body>
    </html>
  );
}
