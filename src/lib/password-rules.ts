// Mot de passe des répétiteurs et de l'administrateur (les élèves et les parents ont un code PIN) :
// 10 caractères au moins, avec des lettres et des chiffres. Les mots de passe divulgués sont refusés
// par Supabase (protection activée en offre Pro).

export const PASSWORD_MIN_LENGTH = 10;

export type PasswordProblem = "short" | "letters" | "digits" | "long";

export function passwordProblem(password: string): PasswordProblem | null {
  if (password.length < PASSWORD_MIN_LENGTH) return "short";
  if (password.length > 128) return "long";
  if (!/\p{L}/u.test(password)) return "letters";
  if (!/\d/.test(password)) return "digits";
  return null;
}

/** Force affichée (0 à 4) : longueur, lettres et chiffres, majuscules, symboles. */
export function passwordStrength(password: string): number {
  if (!password) return 0;
  let score = password.length >= PASSWORD_MIN_LENGTH ? 1 : 0;
  if (/\p{L}/u.test(password) && /\d/.test(password)) score += 1;
  if (/\p{Lu}/u.test(password) && /\p{Ll}/u.test(password)) score += 1;
  if (/[^\p{L}\d]/u.test(password) || password.length >= 16) score += 1;
  return score;
}
