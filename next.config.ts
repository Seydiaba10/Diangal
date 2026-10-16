import type { NextConfig } from "next";
import { withSerwist } from "@serwist/turbopack";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

// En-têtes de sécurité appliqués à toutes les réponses. La CSP avec nonce arrive en phase 7.
const SECURITY_HEADERS = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      { source: "/:path*", headers: SECURITY_HEADERS },
      // Le service worker doit toujours être revalidé pour que les mises à jour arrivent.
      { source: "/serwist/:path*", headers: [{ key: "Cache-Control", value: "no-cache" }] },
    ];
  },
  // Anciennes adresses : l'« Entraînement » s'appelle désormais « Exercices ».
  async redirects() {
    return [{ source: "/eleve/entrainement", destination: "/eleve/exercices", permanent: true }];
  },
  cacheComponents: true,
  partialPrefetching: true,
  experimental: {
    // Pièces des répétiteurs (PDF, photo) jusqu'à 10 Mo, comme le bucket tutor-documents.
    serverActions: { bodySizeLimit: "11mb" },
    // Cache disque de Turbopack désactivé : avec le chargeur @tailwindcss/turbopack, il servait
    // un CSS périmé après une modification de globals.css (en dev comme sur Vercel, qui restaure
    // .next/cache d'un build à l'autre). Les builds partent donc toujours de zéro.
    turbopackFileSystemCacheForDev: false,
    turbopackFileSystemCacheForBuild: false,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

// Serwist : esbuild compile le service worker (src/app/sw.ts) servi par /serwist/sw.js.
export default withSerwist(withNextIntl(nextConfig));
