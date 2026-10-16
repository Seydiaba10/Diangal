// Lecture à voix haute (synthèse vocale du téléphone, sans fichier audio à télécharger).
// Utilisé côté navigateur uniquement.

/** Voix française de l'appareil : fr-FR de préférence, sinon une autre variante du français. */
export function pickFrenchVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  const french = voices.filter((v) => v.lang.toLowerCase().startsWith("fr"));
  return french.find((v) => v.lang.toLowerCase() === "fr-fr" && v.localService) ?? french.find((v) => v.lang.toLowerCase() === "fr-fr") ?? french[0] ?? null;
}

/** Symboles dessinés dans les exercices (barres, ronds, étoiles) : la voix ne les lit pas. */
const DRAWN_SYMBOLS = /[▬●○★■▲]+/g;

/**
 * Découpe un texte en phrases courtes : sur certains téléphones, une phrase trop longue
 * s'interrompt. Les morceaux trop courts sont regroupés (≈ 180 caractères au plus).
 */
export function splitForSpeech(text: string, max = 180): string[] {
  const sentences = text
    .replace(DRAWN_SYMBOLS, " ")
    .split(/(?<=[.!?…:;])\s+|\n+/)
    .map((s) => s.replace(/\s+/g, " ").trim())
    .filter(Boolean);
  const chunks: string[] = [];
  for (const sentence of sentences) {
    const last = chunks.at(-1);
    if (last && last.length + sentence.length + 1 <= max) chunks[chunks.length - 1] = `${last} ${sentence}`;
    else if (sentence.length <= max) chunks.push(sentence);
    else chunks.push(...(sentence.match(new RegExp(`.{1,${max}}(?:\\s|$)`, "g")) ?? [sentence]).map((s) => s.trim()));
  }
  return chunks.filter(Boolean);
}
