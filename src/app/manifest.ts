import type { MetadataRoute } from "next";
import { getTranslations } from "next-intl/server";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const t = await getTranslations("pwa");
  return {
    name: t("name"),
    short_name: t("shortName"),
    description: t("description"),
    lang: "fr",
    // Redirige vers l'espace du rôle connecté (ou la connexion).
    start_url: "/demarrer",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#f5f7f9",
    theme_color: "#0e9384",
    categories: ["education"],
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
