import "server-only";

import type { AuthError } from "@supabase/supabase-js";
import { isSmsEnabled, isWhatsAppEnabled, phoneCountries, publicEnv } from "@/lib/env";
import { parsePhone } from "@/lib/phone";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { LoginSpace } from "./roles";

// Outils communs aux envois de code (connexion, inscription, « Mon compte ») : canal, numéro,
// erreurs. Les codes ne sont jamais écrits dans les journaux.

/** Canal du code : email, SMS ou WhatsApp (les deux derniers pour un numéro de téléphone). */
export type CodeChannel = "email" | "sms" | "whatsapp";
export type PhoneChannel = Exclude<CodeChannel, "email">;

export function parseChannel(value: FormDataEntryValue | null): CodeChannel {
  return value === "sms" || value === "whatsapp" ? value : "email";
}

/** Canal branché pour de vrai (fonction send-sms + fournisseur) : aucun envoi n'est simulé. */
export function phoneChannelReady(channel: PhoneChannel): boolean {
  return channel === "whatsapp" ? isWhatsAppEnabled() : isSmsEnabled();
}

/** Premier canal de téléphone ouvert (WhatsApp d'abord), sinon null. */
export function firstPhoneChannel(): PhoneChannel | null {
  return isWhatsAppEnabled() ? "whatsapp" : isSmsEnabled() ? "sms" : null;
}

/**
 * Saisie + indicatif choisi (221 par défaut) → numéro E.164, seulement pour un pays ouvert
 * (DIANGAL_PHONE_COUNTRIES), sinon null.
 */
export function readPhone(raw: string, dial: FormDataEntryValue | string | null = null): string | null {
  return parsePhone(raw, typeof dial === "string" && /^\d{1,3}$/.test(dial) ? dial : undefined, phoneCountries());
}

/**
 * Le Send SMS Hook ne reçoit que le numéro et le code : on note le canal choisi juste avant
 * l'envoi, la fonction Edge « send-sms » le lit (private.otp_channels, clé secrète uniquement).
 */
export async function rememberOtpChannel(phone: string, channel: PhoneChannel) {
  const { error } = await createSupabaseAdminClient().rpc("set_otp_channel", { p_phone: phone, p_channel: channel });
  if (error) console.error("canal du code non enregistré :", error.message);
}

/** Erreur d'envoi de code → clé de message affichée. « unknown » ne doit jamais être montré tel quel. */
export function sendErrorKey(error: AuthError): "unknown" | "limit" | "sms" | "send" {
  const text = `${error.code ?? ""} ${error.message}`.toLowerCase();
  if (text.includes("signups not allowed") || text.includes("otp_disabled") || text.includes("user not found")) return "unknown";
  if (error.status === 429 || text.includes("rate limit")) return "limit";
  if (text.includes("phone") || text.includes("sms")) return "sms";
  return "send";
}

/** Page où mène le lien de l'email ou le retour d'un réseau social (ouverture de la session côté serveur). */
export function emailRedirect(next: string | null, space: LoginSpace = "famille") {
  const params = new URLSearchParams({ ...(next ? { next } : {}), ...(space === "repetiteur" ? { espace: space } : {}) });
  return `${publicEnv.NEXT_PUBLIC_SITE_URL}/auth/confirmation${params.size ? `?${params}` : ""}`;
}
