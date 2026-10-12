// Briques HTML des leçons du CI (classes de lib/sanitize.ts : callout, example).
// Les leçons du CI se lisent avec un adulte : l'élève de 6 ans apprend à peine à lire.

export interface CiLessonSpec {
  title: string;
  /** Corps de la leçon, en HTML déjà assaini (balises de la liste blanche). */
  body: string;
  minutes?: number;
}

export interface CiChapterSpec {
  title: string;
  summary: string;
  lessons: CiLessonSpec[];
}

/** Encadré « Je retiens ». */
export function keyPoint(text: string): string {
  return `<div class="callout"><p class="callout-title">Je retiens</p><p>${text}</p></div>`;
}

/** Activités à faire avec un adulte, à la maison ou en classe. */
export function practice(items: string[]): string {
  return `<div class="example"><p class="callout-title">Avec un adulte, je m’entraîne</p><ul>${items
    .map((item) => `<li>${item}</li>`)
    .join("")}</ul></div>`;
}

/** Liste à puces simple. */
export function bullets(items: string[]): string {
  return `<ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;
}

/**
 * Leçon d'un son (lecture, CI) : on l'entend, on le voit, on lit des syllabes et des mots
 * écrits seulement avec les lettres déjà étudiées (ordre du programme officiel).
 */
export function soundLesson({
  sound,
  spellings,
  heardIn,
  syllables,
  words,
  sentence,
  writing,
}: {
  sound: string;
  /** Façons d'écrire le son (« a A », « au eau o »…). */
  spellings: string;
  /** Mots où l'on entend le son (à l'oral). */
  heardIn: string[];
  syllables: string[];
  /** Mots à lire, écrits avec les lettres déjà apprises. */
  words: string[];
  sentence?: string;
  /** Conseil pour écrire la lettre. */
  writing: string;
}): string {
  return [
    `<p>Écoute bien : on entend le son <strong>${sound}</strong> dans ${heardIn.map((w) => `« ${w} »`).join(", ")}.</p>`,
    `<h2>Je le vois</h2><p>Il s’écrit : <strong>${spellings}</strong>.</p>`,
    `<h2>Je lis</h2><p>Des syllabes : <strong>${syllables.join(" · ")}</strong></p><p>Des mots : <strong>${words.join(" · ")}</strong></p>`,
    sentence ? `<p>Une phrase : <strong>${sentence}</strong></p>` : "",
    `<h2>J’écris</h2><p>${writing}</p>`,
    practice([
      `L’adulte dit des mots. Tu frappes dans tes mains quand tu entends ${sound}.`,
      `Cherche ${sound} dans ton prénom, dans les prénoms de ta famille ou sur une affiche.`,
      `Lis les syllabes à voix haute, puis écris-en trois sur ton ardoise ou ton cahier.`,
    ]),
  ].join("");
}
