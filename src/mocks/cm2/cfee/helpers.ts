// Briques des sujets blancs du CFEE : en-tête de partie, avec le barème du guide pratique du CFEE.

/** En-tête affiché au-dessus des questions d'une partie : son titre, ses points, une consigne éventuelle. */
export const head = (title: string, points: number, note = "") =>
  `<p><strong>${title} (${points} points)</strong></p>${note ? `<p>${note}</p>` : ""}`;

/** Texte à lire ou situation, sous l'en-tête d'une partie. */
export const reading = (...paragraphs: string[]) => paragraphs.map((text) => `<p>${text}</p>`).join("");

/** Texte en arabe : écrit de droite à gauche. */
export const arabic = (text: string) => `<span dir="rtl" lang="ar">${text}</span>`;
