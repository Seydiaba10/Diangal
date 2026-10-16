import { describe, expect, it } from "vitest";
import { sanitizeLessonHtml } from "@/lib/sanitize";
import { CATALOG_ANSWER_KEYS } from "@/mocks/answer-keys";
import { CATALOG_ASSESSMENTS, CATALOG_QUESTIONS, QUESTION_CHAPTERS } from "@/mocks/assessments";
import { CATALOG_CHAPTERS, CATALOG_LESSON_BODIES } from "@/mocks/curriculum";

// Contenu publié : toutes les classes du catalogue (les volumes sont dérivés des mocks).
describe("catalogue publié", () => {
  const lessons = CATALOG_CHAPTERS.flatMap((c) => c.lessons);

  it("chaque leçon a un texte rédigé, déjà conforme à la liste blanche HTML", () => {
    const missing = lessons.filter((l) => !CATALOG_LESSON_BODIES[l.id]?.trim()).map((l) => l.id);
    expect(missing).toEqual([]);
    // Le filtre peut réécrire (<br> → <br />, &nbsp;) mais ne doit retirer ni balise ni classe.
    const markup = (html: string) => (html.match(/<[a-z0-9]+|class="[^"]*"/g) ?? []).join(" ");
    const stripped = lessons
      .filter((l) => markup(sanitizeLessonHtml(CATALOG_LESSON_BODIES[l.id]!)) !== markup(CATALOG_LESSON_BODIES[l.id]!))
      .map((l) => l.id);
    expect(stripped).toEqual([]);
  });

  it("chaque chapitre a une série d'exercices corrigés", () => {
    const withExercises = new Set(CATALOG_ASSESSMENTS.filter((a) => a.kind === "exercise").map((a) => a.chapterId));
    expect(CATALOG_CHAPTERS.filter((c) => !withExercises.has(c.id)).map((c) => c.id)).toEqual([]);
  });

  it("chaque question a un corrigé valide et un chapitre", () => {
    for (const question of Object.values(CATALOG_QUESTIONS)) {
      const key = CATALOG_ANSWER_KEYS[question.id];
      expect(key, question.id).toBeDefined();
      if (question.type === "single_choice" || question.type === "true_false") {
        expect(key!.correctOptionIds, question.id).toHaveLength(1);
        expect(question.options.map((o) => o.id), question.id).toContain(key!.correctOptionIds![0]);
      }
      if (question.type === "numeric") expect(Number.isFinite(key!.numericValue), question.id).toBe(true);
      if (question.type === "short_text") expect(key!.acceptedTexts?.length, question.id).toBeGreaterThan(0);
    }
    const inChapterSeries = CATALOG_ASSESSMENTS.filter((a) => a.kind === "exercise").flatMap((a) => a.questionIds);
    expect(inChapterSeries.filter((id) => !QUESTION_CHAPTERS[id])).toEqual([]);
  });
});
