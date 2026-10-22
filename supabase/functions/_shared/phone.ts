// Numéros autorisés à recevoir un code ou un SMS (format E.164). Code Deno (fonctions Edge Supabase).
// Le Sénégal est toujours ouvert ; d'autres indicatifs s'ouvrent par le secret ALLOWED_DIAL_CODES
// (ex. « 221,33,225 »), alignés sur DIANGAL_PHONE_COUNTRIES côté Next. Garde-fou contre le
// « pompage de SMS » (envois frauduleux vers des numéros surtaxés à l'étranger).

export function allowedDialCodes(): string[] {
  const configured = (Deno.env.get("ALLOWED_DIAL_CODES") ?? "").split(",").map((c) => c.trim()).filter((c) => /^\d{1,3}$/.test(c));
  return [...new Set(["221", ...configured])];
}

export function isAllowedPhone(e164: string): boolean {
  return /^\+[1-9][0-9]{7,14}$/.test(e164) && allowedDialCodes().some((dial) => e164.startsWith(`+${dial}`));
}
