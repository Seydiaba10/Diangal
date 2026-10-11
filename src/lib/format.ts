// Formats d'affichage DIANGAL : FCFA, dates jj/mm/aaaa (heure de Dakar), notes sur 20.

export const APP_TIME_ZONE = "Africa/Dakar";

const integerFormat = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 });
const scoreFormat = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 1 });
const dateFormat = new Intl.DateTimeFormat("fr-FR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  timeZone: APP_TIME_ZONE,
});

/** 2500 → « 2 500 FCFA » (espace fine insécable comme séparateur de milliers). */
export function formatFCFA(amount: number): string {
  return `${integerFormat.format(Math.round(amount))} FCFA`;
}

/** Date ou chaîne ISO → « 06/07/2027 ». Une date seule (aaaa-mm-jj) est lue en UTC = heure de Dakar. */
export function formatDate(value: Date | string): string {
  return dateFormat.format(typeof value === "string" ? new Date(value) : value);
}

/** 13.45 → « 13,5 » ; null → « – ». */
export function formatScoreValue(score: number | null): string {
  return score === null ? "–" : scoreFormat.format(score);
}

/** 4.8 → « 4,8 » (notes des répétiteurs, etc.). */
export function formatDecimal(value: number): string {
  return scoreFormat.format(value);
}

/** 13.45 → « 13,5/20 ». */
export function formatScore(score: number | null): string {
  return score === null ? "–" : `${formatScoreValue(score)}/20`;
}

/** +221771234567 → « 77 123 45 67 » ; laisse les autres formats intacts. */
export function formatPhone(e164: string): string {
  const match = /^\+221(\d{2})(\d{3})(\d{2})(\d{2})$/.exec(e164.replace(/\s/g, ""));
  return match ? match.slice(1).join(" ") : e164;
}

const decimalFormat = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 1 });

/** 1 250 000 → « 1,3 Mo » ; 240 000 → « 240 Ko ». */
export function formatBytes(bytes: number): string {
  if (bytes >= 1_000_000) return `${decimalFormat.format(bytes / 1_000_000)} Mo`;
  return `${Math.max(1, Math.round(bytes / 1000))} Ko`;
}

/** 512 → « 08:32 » (chronomètre). */
export function formatClock(totalSeconds: number): string {
  const s = Math.max(0, Math.floor(totalSeconds));
  const minutes = Math.floor(s / 60);
  const seconds = s % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

/** 900 → « 15 min » ; 3900 → « 1 h 05 ». */
export function formatDuration(totalSeconds: number): string {
  const minutes = Math.round(totalSeconds / 60);
  if (minutes < 60) return `${Math.max(1, minutes)} min`;
  return `${Math.floor(minutes / 60)} h ${String(minutes % 60).padStart(2, "0")}`;
}

const MS_PER_DAY = 86_400_000;

/** Nombre de jours calendaires (heure de Dakar = UTC) entre `from` et la date ISO `to`. */
export function daysUntil(to: string, from: Date): number {
  const target = Date.parse(`${to.slice(0, 10)}T00:00:00Z`);
  const today = Date.UTC(from.getUTCFullYear(), from.getUTCMonth(), from.getUTCDate());
  return Math.round((target - today) / MS_PER_DAY);
}
