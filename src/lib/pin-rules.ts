// Règles du code PIN (6 chiffres), communes au navigateur et au serveur. Aucune donnée secrète ici :
// le calcul du mot de passe dérivé est dans lib/pin.ts, côté serveur seulement.

export const PIN_LENGTH = 6;

/** Raison du refus d'un code PIN, ou null s'il est accepté. */
export type PinProblem = "format" | "repeat" | "sequence" | "pattern" | "common" | "phone";

// Codes trop connus qui échappent aux règles ci-dessous (formes en croix ou en colonne du clavier, etc.).
const COMMON = new Set(["112233", "123321", "147258", "147852", "159357", "159753", "258456", "102030", "100000", "200000", "000001", "123654"]);

/** 6 chiffres, sans rien d'autre. */
export function isPinFormat(pin: string): boolean {
  return /^\d{6}$/.test(pin);
}

/** Saisie avec espaces (« 12 34 56 ») → chiffres seuls. */
export function cleanPin(value: unknown): string {
  return String(value ?? "").replace(/\s/g, "").slice(0, 12);
}

function isStep(pin: string, step: 1 | -1): boolean {
  for (let i = 1; i < pin.length; i++) if (Number(pin[i]) - Number(pin[i - 1]) !== step) return false;
  return true;
}

function hasPeriod(pin: string, period: number): boolean {
  for (let i = period; i < pin.length; i++) if (pin[i] !== pin[i - period]) return false;
  return true;
}

/**
 * Contrôle d'un nouveau code PIN : format, chiffres répétés (000000), suites (123456, 654321),
 * motifs répétés (121212, 123123), codes trop connus, fin du numéro de téléphone.
 */
export function pinProblem(pin: string, phone?: string | null): PinProblem | null {
  if (!isPinFormat(pin)) return "format";
  if (hasPeriod(pin, 1)) return "repeat";
  if (isStep(pin, 1) || isStep(pin, -1)) return "sequence";
  if (hasPeriod(pin, 2) || hasPeriod(pin, 3)) return "pattern";
  if (COMMON.has(pin)) return "common";
  const digits = (phone ?? "").replace(/\D/g, "");
  if (digits.length >= PIN_LENGTH && digits.endsWith(pin)) return "phone";
  return null;
}
