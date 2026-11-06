import "server-only";

import { createHmac } from "node:crypto";

// Le code PIN ne quitte jamais le serveur et n'est stocké nulle part : il devient un long mot de passe,
// calculé avec une clé secrète (DIANGAL_PIN_PEPPER, variable serveur), que Supabase Auth hache et vérifie.
// Sans cette clé, personne ne peut essayer les 1 000 000 de codes directement auprès de Supabase.

/** Version de la clé de dérivation (notée avec chaque code PIN, pour pouvoir changer de clé un jour). */
export const PIN_PEPPER_VERSION = 1;

function pepper(): string {
  const value = process.env.DIANGAL_PIN_PEPPER ?? "";
  if (value.length < 32) throw new Error("DIANGAL_PIN_PEPPER manque ou fait moins de 32 caractères.");
  return value;
}

/**
 * Mot de passe Supabase dérivé d'un code PIN. subject = « user:<identifiant du compte> » (élève, parent : le même
 * code PIN sert avec le numéro ou avec l'e-mail, et survit à un changement de numéro) ou « child:<identifiant> »
 * pour un enfant sans téléphone : le même code donne un mot de passe différent pour chaque compte.
 */
export function derivePinPassword(subject: string, pin: string, version: number = PIN_PEPPER_VERSION): string {
  // Le suffixe garantit majuscule, minuscule, chiffre et symbole, quelles que soient les règles de mot
  // de passe réglées dans Supabase pour les répétiteurs.
  return `${createHmac("sha256", pepper()).update(`diangal-pin:v${version}:${subject}:${pin}`).digest("base64url")}:Pin1`;
}

/** Sujet de dérivation d'un élève ou d'un parent : son compte, quel que soit l'identifiant tapé (numéro ou e-mail). */
export const accountPinSubject = (userId: string) => `user:${userId}`;

/** Sujet de dérivation d'un enfant sans téléphone. */
export const childPinSubject = (studentId: string) => `child:${studentId}`;
