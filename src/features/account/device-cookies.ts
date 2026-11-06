// Cookies de l'appareil (lus par proxy.ts et par le serveur) : mode de l'appareil, dernière activité,
// code PIN, appareil de la famille. Aucun secret ici : les durées et les noms seulement.

/** perso : on reste connecté ; partage : appareil partagé ou public ; enfant : session d'un enfant. */
export type DeviceMode = "perso" | "partage" | "enfant";

export const DEVICE_COOKIE = "diangal_appareil";
/** Dernière activité (secondes depuis 1970), mise à jour par proxy.ts. */
export const SEEN_COOKIE = "diangal_vu";
/** Le compte de cet appareil se connecte avec un code PIN (le verrou des 30 jours ne vise que lui). */
export const PIN_COOKIE = "diangal_pin";
/** Jeton d'un appareil de la famille (profils des enfants affichés sans code famille). */
export const FAMILY_COOKIE = "diangal_famille";

/** Inactivité au-delà de laquelle la session se ferme (appareil partagé, enfant). */
export const IDLE_LIMIT_SECONDS: Record<Exclude<DeviceMode, "perso">, number> = { partage: 15 * 60, enfant: 30 * 60 };
/** Sur son propre téléphone : code PIN redemandé après 30 jours sans visite (sans message). */
export const PERSONAL_LOCK_SECONDS = 30 * 24 * 60 * 60;
/** La date d'activité n'est réécrite qu'une fois par minute au plus. */
export const SEEN_REFRESH_SECONDS = 60;

export function parseDeviceMode(value: string | undefined): DeviceMode {
  return value === "partage" || value === "enfant" ? value : "perso";
}

/** Cookies de session Supabase (préfixe « sb- ») : sans durée sur un appareil partagé ou pour un enfant. */
export const isSupabaseAuthCookie = (name: string) => name.startsWith("sb-");

/** Options d'un cookie de session Supabase selon le mode : sans maxAge ni expires, il disparaît à la fermeture. */
export function sessionCookieOptions<T extends object & { maxAge?: number; expires?: Date }>(options: T, mode: DeviceMode): T {
  if (mode === "perso") return options;
  const rest = { ...options };
  delete rest.maxAge;
  delete rest.expires;
  return rest;
}

export interface IdleDecision {
  /** Fermer la session (appareil partagé ou enfant inactif trop longtemps). */
  signOut: boolean;
  /** Redemander le code PIN (son propre téléphone, plus de 30 jours sans visite). */
  lock: boolean;
  /** Réécrire la date d'activité. */
  touch: boolean;
}

/** Que faire d'une session connectée selon le mode, la dernière activité et l'heure actuelle (secondes). */
export function idleDecision(mode: DeviceMode, seen: number | null, now: number, hasPin: boolean): IdleDecision {
  if (seen === null || !Number.isFinite(seen)) return { signOut: false, lock: false, touch: true };
  const idle = now - seen;
  if (mode !== "perso" && idle > IDLE_LIMIT_SECONDS[mode]) return { signOut: true, lock: false, touch: false };
  if (mode === "perso" && hasPin && idle > PERSONAL_LOCK_SECONDS) return { signOut: false, lock: true, touch: false };
  return { signOut: false, lock: false, touch: idle >= SEEN_REFRESH_SECONDS };
}
