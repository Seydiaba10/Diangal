import { z } from "zod";
import { countriesFor, type DialCountry } from "./phone";

// Variables publiques (exposées au navigateur) : URL et clé publiable Supabase.
const publicSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.url().optional(),
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: z.string().min(20).optional(),
  NEXT_PUBLIC_SITE_URL: z.url().default("http://localhost:3000"),
});

export const publicEnv = publicSchema.parse({
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || undefined,
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || undefined,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || undefined,
});

/** Codes par SMS : seulement quand un fournisseur (Orange SMS, Twilio) est branché à Supabase Auth. */
export function isSmsEnabled(): boolean {
  return process.env.DIANGAL_SMS_ENABLED === "true";
}

/**
 * Codes par WhatsApp : seulement quand le Send SMS Hook (fonction Edge « send-sms ») est déployé
 * avec un compte WhatsApp Business (API Cloud de Meta) et un modèle d'authentification approuvé.
 */
export function isWhatsAppEnabled(): boolean {
  return process.env.DIANGAL_WHATSAPP_ENABLED === "true";
}

/**
 * Pays dont les numéros peuvent recevoir un code (codes ISO séparés par des virgules, ex. « FR,CI »).
 * Le Sénégal est toujours ouvert ; les autres restent fermés par défaut (coût et fraude aux SMS).
 * Les fonctions Edge appliquent la même liste (ALLOWED_DIAL_CODES).
 */
export function phoneCountries(): DialCountry[] {
  return countriesFor((process.env.DIANGAL_PHONE_COUNTRIES ?? "").split(","));
}

/**
 * Les emails d'Auth contiennent le code à 6 chiffres (modèles modifiés, SMTP personnalisé).
 * Sinon, l'email contient le lien de connexion par défaut de Supabase.
 */
export function emailHasCode(): boolean {
  return process.env.DIANGAL_EMAIL_CODE === "true";
}

/**
 * L'application fonctionne sur les données de démonstration (src/mocks) tant que
 * DIANGAL_DATA_SOURCE ne vaut pas « supabase ». Les clés peuvent donc être renseignées
 * avant que la couche de données soit branchée, sans activer la vraie session.
 */
export function isSupabaseConfigured(): boolean {
  return (
    process.env.DIANGAL_DATA_SOURCE === "supabase" &&
    Boolean(publicEnv.NEXT_PUBLIC_SUPABASE_URL && publicEnv.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY)
  );
}
