/// <reference lib="webworker" />
import { defaultCache } from "@serwist/turbopack/worker";
import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import { Serwist } from "serwist";

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

// Stratégies par défaut de Serwist pour Next.js : fichiers _next/static en cache permanent,
// pages en « réseau d'abord » avec repli sur le cache, images et polices en cache.
// Les médias de cours (PDF, audio, vidéo) ne sont jamais mis en cache automatiquement :
// seul un téléchargement explicite (IndexedDB) les conserve, pour ménager le forfait.
const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  // Les ressources précachées (pages hors ligne, fichiers à nom versionné) ne dépendent pas
  // de l'URL : /hors-ligne/lecons?chapitre=… doit servir la même page, lue depuis IndexedDB.
  precacheOptions: { ignoreURLParametersMatching: [/.*/] },
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: defaultCache,
  fallbacks: {
    entries: [
      {
        url: "/hors-ligne",
        matcher({ request }) {
          return request.destination === "document";
        },
      },
    ],
  },
});

serwist.addEventListeners();
