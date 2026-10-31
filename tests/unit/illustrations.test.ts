import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { sanitizeLessonHtml } from "@/lib/sanitize";
import { FIGURE_LEVELS } from "@/lib/levels";
import { CATALOG_QUESTIONS } from "@/mocks/assessments";
import { CATALOG_CHAPTERS, CATALOG_LESSON_BODIES } from "@/mocks/curriculum";
import { pictureSize, type PictureName } from "@/mocks/drawings";
import { drawingCss, renderSchemaFile, SCHEMAS } from "@/mocks/figures";

// Dessins et schémas des leçons et des exercices : fichiers présents, légers, décrits, et gardés
// par le filtre de l'éditeur de leçons de l'admin.

const PUBLIC = "public";
const DIR = join(PUBLIC, "illustrations");
const MAX_BYTES = 16 * 1024;
const referenced = (html: string) => [...html.matchAll(/(?:src|href)="(\/illustrations\/[\w/-]+\.svg)"/g)].map((m) => m[1]!);
const allHtml = [
  ...Object.values(CATALOG_LESSON_BODIES),
  ...Object.values(CATALOG_QUESTIONS).flatMap((q) => [q.stemHtml ?? "", q.promptHtml, ...q.options.map((o) => o.labelHtml)]),
];

describe("illustrations", () => {
  it("chaque dessin cité dans une leçon ou une question existe", () => {
    const missing = [...new Set(allHtml.flatMap(referenced))].filter((src) => {
      try {
        return !statSync(join(PUBLIC, src)).isFile();
      } catch {
        return true;
      }
    });
    expect(missing).toEqual([]);
  });

  it("chaque dessin de la banque est déclaré avec sa taille, et reste léger", () => {
    for (const file of readdirSync(DIR).filter((f) => f.endsWith(".svg"))) {
      const name = file.replace(/\.svg$/, "") as PictureName;
      const svg = readFileSync(join(DIR, file), "utf8");
      const [, w, h] = /viewBox="0 0 ([\d.]+) ([\d.]+)"/.exec(svg)!;
      expect(pictureSize(name), file).toEqual([Number(w), Number(h)]);
      expect(Buffer.byteLength(svg), file).toBeLessThanOrEqual(MAX_BYTES);
    }
  });

  it("les schémas sont à jour (pnpm figures) et légers", () => {
    const css = drawingCss(readFileSync("src/app/globals.css", "utf8"));
    const read = (name: string) => readFileSync(join(DIR, `${name}.svg`), "utf8");
    for (const [id, svg] of Object.entries(SCHEMAS)) {
      const file = readFileSync(join(DIR, "schemas", `${id}.svg`), "utf8");
      expect(file, id).toBe(renderSchemaFile(svg, css, read));
      // Une carte du monde ou de l'Afrique (fond Natural Earth) a droit au double : environ 8 Ko une fois compressée.
      expect(Buffer.byteLength(file), id).toBeLessThanOrEqual(file.includes("Natural Earth") ? 2 * MAX_BYTES : MAX_BYTES);
    }
  });

  it("chaque leçon des classes illustrées a au moins une figure, avec légende et description", () => {
    const lessons = CATALOG_CHAPTERS.filter((c) => (FIGURE_LEVELS as readonly string[]).includes(c.levelCode)).flatMap((c) => c.lessons);
    expect(lessons.length).toBeGreaterThan(0);
    for (const lesson of lessons) {
      const body = CATALOG_LESSON_BODIES[lesson.id]!;
      const figures = body.match(/<figure class="lesson-figure">[\s\S]*?<\/figure>/g) ?? [];
      expect(figures.length, lesson.id).toBeGreaterThan(0);
      for (const fig of figures) {
        expect(/<figcaption>[^<\s][\s\S]*<\/figcaption>/.test(fig), `${lesson.id} : légende`).toBe(true);
        // Une image décrite, ou un tableau (alphabet, jours), ou des lettres écrites en grand.
        expect(/<img [^>]*alt="[^"]+"|<table|class="lf-label">[^<]+</.test(fig), `${lesson.id} : contenu décrit`).toBe(true);
        expect(/<img [^>]*alt=""/.test(fig) && !/<img [^>]*alt="[^"]+"/.test(fig), `${lesson.id} : images sans description`).toBe(false);
      }
    }
  });

  it("le filtre de l'éditeur garde les dessins de Diangal et retire les autres images locales", () => {
    const kept = sanitizeLessonHtml('<figure class="lesson-figure"><img src="/illustrations/mangue.svg" alt="une mangue" width="53" height="64" loading="lazy"><figcaption>Une mangue.</figcaption></figure>');
    expect(kept).toContain('src="/illustrations/mangue.svg"');
    expect(kept).toContain('class="lesson-figure"');
    expect(sanitizeLessonHtml('<img src="/api/hors-ligne/x" alt="x">')).not.toContain("<img");
    expect(sanitizeLessonHtml('<img src="javascript:alert(1)" alt="x">')).not.toContain("<img");
    expect(sanitizeLessonHtml('<img src="https://exemple.sn/a.png" alt="x">')).toContain("<img");
  });
});
