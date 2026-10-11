import { createSerwistRoute } from "@serwist/turbopack";

// Pages utilisables sans réseau, mises en cache dès l'installation du service worker.
const revision = crypto.randomUUID();

const route = createSerwistRoute({
  swSrc: "src/app/sw.ts",
  useNativeEsbuild: true,
  additionalPrecacheEntries: [
    { url: "/hors-ligne", revision },
    { url: "/hors-ligne/lecons", revision },
  ],
});

// Seuls GET et generateStaticParams sont exportés : les options « dynamic » et
// « revalidate » de Serwist sont incompatibles avec Cache Components.
export const { GET, generateStaticParams } = route;
