import { getRequestConfig } from "next-intl/server";
import { APP_TIME_ZONE } from "@/lib/format";

export const DEFAULT_LOCALE = "fr";

// Locale fixe pour l'instant : on ne lit ni cookie ni en-tête, ce qui garde les pages
// prérendables avec Cache Components. Le wolof (« wo ») viendra du profil utilisateur.
export default getRequestConfig(async () => ({
  locale: DEFAULT_LOCALE,
  messages: (await import("../../messages/fr.json")).default,
  timeZone: APP_TIME_ZONE,
}));
