// Numéros de téléphone au format international E.164 (+221771234567).
// Le Sénégal est le pays par défaut. Les autres pays proposés sont ouverts par le serveur
// (DIANGAL_PHONE_COUNTRIES) : chaque envoi de code coûte, et le « pompage de SMS » vise surtout
// des destinations lointaines. Les noms de pays viennent d'Intl.DisplayNames (pas de texte en dur).

export interface DialCountry {
  /** Code ISO 3166 du pays (sert au libellé traduit). */
  iso: string;
  /** Indicatif sans le « + ». */
  dial: string;
  /** Nombre de chiffres du numéro national, sans le 0 initial. */
  min: number;
  max: number;
  /** Le 0 initial fait partie du numéro, même à l’international (Côte d’Ivoire). */
  keepsZero?: boolean;
}

export const DIAL_COUNTRIES: DialCountry[] = [
  { iso: "SN", dial: "221", min: 9, max: 9 },
  { iso: "GM", dial: "220", min: 7, max: 7 },
  { iso: "MR", dial: "222", min: 8, max: 8 },
  { iso: "ML", dial: "223", min: 8, max: 8 },
  { iso: "GN", dial: "224", min: 9, max: 9 },
  { iso: "CI", dial: "225", min: 10, max: 10, keepsZero: true },
  { iso: "BF", dial: "226", min: 8, max: 8 },
  { iso: "CV", dial: "238", min: 7, max: 7 },
  { iso: "GW", dial: "245", min: 7, max: 9 },
  { iso: "MA", dial: "212", min: 9, max: 9 },
  { iso: "FR", dial: "33", min: 9, max: 9 },
  { iso: "BE", dial: "32", min: 8, max: 9 },
  { iso: "ES", dial: "34", min: 9, max: 9 },
  { iso: "IT", dial: "39", min: 9, max: 11 },
  { iso: "DE", dial: "49", min: 10, max: 11 },
  { iso: "GB", dial: "44", min: 10, max: 10 },
  { iso: "US", dial: "1", min: 10, max: 10 },
];

export const DEFAULT_COUNTRY = DIAL_COUNTRIES[0]!;

/** Pays ouverts (codes ISO), le Sénégal toujours en premier. */
export function countriesFor(isoCodes: readonly string[]): DialCountry[] {
  const wanted = new Set(isoCodes.map((c) => c.trim().toUpperCase()));
  return DIAL_COUNTRIES.filter((c) => c.iso === "SN" || wanted.has(c.iso));
}

function nationalNumber(country: DialCountry, digits: string): string | null {
  if (country.keepsZero) return digits.length >= country.min && digits.length <= country.max ? digits : null;
  // Le 0 initial (préfixe national, en France par exemple) disparaît à l'international.
  const national = digits.startsWith("0") ? digits.slice(1) : digits;
  return national.length >= country.min && national.length <= country.max && !national.startsWith("0") ? national : null;
}

/**
 * Saisie libre → E.164, ou null.
 * - « 77 123 45 67 » avec l'indicatif choisi (221 par défaut) ;
 * - « +33 6 12 34 56 78 » ou « 0033 6… » : l'indicatif tapé l'emporte ;
 * - « 221771234567 » : accepté tel quel pour le Sénégal (ancien format).
 */
export function parsePhone(raw: string, dial: string = DEFAULT_COUNTRY.dial, countries: readonly DialCountry[] = DIAL_COUNTRIES): string | null {
  const trimmed = raw.trim();
  const digits = trimmed.replace(/\D/g, "");
  if (!digits) return null;
  const international = trimmed.startsWith("+") ? digits : trimmed.startsWith("00") ? digits.slice(2) : null;
  if (international !== null) {
    // Indicatif le plus long d'abord (221 avant 2…).
    const country = [...countries].sort((a, b) => b.dial.length - a.dial.length).find((c) => international.startsWith(c.dial));
    const national = country ? nationalNumber(country, international.slice(country.dial.length)) : null;
    return country && national ? `+${country.dial}${national}` : null;
  }
  const country = countries.find((c) => c.dial === dial);
  if (!country) return null;
  if (country.dial === "221" && digits.length === 12 && digits.startsWith("221")) return `+${digits}`;
  const national = nationalNumber(country, digits);
  return national ? `+${country.dial}${national}` : null;
}

/** Le numéro appartient-il à un pays ouvert ? */
export function isAllowedPhone(e164: string, countries: readonly DialCountry[]): boolean {
  return parsePhone(e164, DEFAULT_COUNTRY.dial, countries) === e164;
}

/** Numéro masqué pour l'affichage : « +221 77 ••• •• 67 ». */
export function maskPhone(e164: string): string {
  const country = [...DIAL_COUNTRIES].sort((a, b) => b.dial.length - a.dial.length).find((c) => e164.startsWith(`+${c.dial}`));
  const dial = country?.dial ?? e164.slice(1, 4);
  const national = e164.slice(dial.length + 1);
  return `+${dial} ${national.slice(0, 2)} ••• •• ${national.slice(-2)}`;
}
