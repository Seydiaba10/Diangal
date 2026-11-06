import type { PGlite } from "@electric-sql/pglite";
import { beforeAll, describe, expect, it } from "vitest";
import { CATALOG_ANSWER_KEYS } from "@/mocks/answer-keys";
import { CATALOG_QUESTIONS } from "@/mocks/assessments";
import { ASSESSMENTS_CFEE_BLANCS } from "@/mocks/cm2/cfee";
import { as, createTestDatabase, createUser, type Actor } from "./harness";

// Sujets blancs du CFEE dans la base : rangés sous le CFEE, ouverts à un élève de CM2, corrigés côté
// serveur comme dans la démo (copie parfaite = 20/20, copie vide = 0), BFEM inchangé.

describe("sujets blancs du CFEE (base)", () => {
  let db: PGlite;
  let student: Actor;

  beforeAll(async () => {
    db = await createTestDatabase();
    const id = await createUser(db, { role: "student", first_name: "Awa", last_name: "Test", birth_date: "2006-01-15", level_code: "CM2" }, null, "cm2@test.invalid");
    student = { id, role: "student" };
  });

  /** Commence le sujet et envoie la copie donnée par « answer » ; renvoie la note sur 20. */
  async function play(slug: string, answer: (question: { slug: string; type: string; id: string }, optionIds: Map<string, string>) => unknown): Promise<number> {
    const { rows } = await db.query<{ id: string; slug: string; type: string }>(
      `select q.id, q.slug, q.type from public.questions q join public.assessment_questions aq on aq.question_id = q.id
       join public.assessments a on a.id = aq.assessment_id where a.slug = $1 order by aq.sort_order`,
      [slug],
    );
    const options = await db.query<{ id: string; slug: string }>(
      `select o.id, o.slug from public.question_options o where o.question_id = any($1::uuid[])`,
      [rows.map((q) => q.id)],
    );
    const optionIds = new Map(options.rows.map((o) => [o.slug, o.id]));
    const assessment = await db.query<{ id: string }>("select id from public.assessments where slug = $1", [slug]);
    return as(db, student, async (tx) => {
      const started = await tx.query<{ session: { attempt_id: string } }>("select public.start_attempt($1) as session", [assessment.rows[0]!.id]);
      const attemptId = started.rows[0]!.session.attempt_id;
      const answers = Object.fromEntries(rows.map((q) => [q.id, answer(q, optionIds)]).filter(([, value]) => value !== undefined));
      const submitted = await tx.query<{ result: { score_20: number } }>("select public.submit_attempt($1, $2::jsonb) as result", [attemptId, JSON.stringify(answers)]);
      return Number(submitted.rows[0]!.result.score_20);
    });
  }

  it("le catalogue range tous les sujets sous le CFEE, comme des sujets DIANGAL", async () => {
    const rows = await as(db, student, async (tx) => (await tx.query<{ slug: string; kind: string; exam_type: string; verification: string; level_code: string }>("select * from public.get_assessments_catalog()")).rows);
    const cfee = rows.filter((r) => r.kind === "mock_exam" && r.exam_type === "CFEE");
    expect(cfee.map((r) => r.slug).sort()).toEqual(ASSESSMENTS_CFEE_BLANCS.map((a) => a.id).sort());
    expect(cfee.every((r) => r.verification === "unverified" && r.level_code === "CM2")).toBe(true);
    // Le BFEM garde ses sujets.
    const bfem = rows.filter((r) => r.kind === "mock_exam" && r.exam_type === "BFEM");
    expect(bfem.length).toBeGreaterThan(0);
    expect(bfem.every((r) => !r.slug.startsWith("cfee-"))).toBe(true);
  });

  it("une copie parfaite obtient 20/20 à chaque sujet", async () => {
    for (const a of ASSESSMENTS_CFEE_BLANCS) {
      const score = await play(a.id, (q, optionIds) => {
        if (q.type === "self_check") return "reussi";
        const key = CATALOG_ANSWER_KEYS[q.slug]!;
        if (q.type === "numeric") return String(key.numericValue).replace(".", ",");
        return key.correctOptionIds!.map((slug) => optionIds.get(slug)!);
      });
      expect(score, a.id).toBe(20);
    }
  }, 300_000);

  it("une copie vide et une auto-évaluation « à revoir » donnent 0", async () => {
    const first = ASSESSMENTS_CFEE_BLANCS[0]!;
    expect(await play(first.id, () => undefined)).toBe(0);
    const writing = ASSESSMENTS_CFEE_BLANCS.find((a) => a.questionIds.every((id) => CATALOG_QUESTIONS[id]!.type === "self_check"))!;
    expect(await play(writing.id, () => "a_revoir")).toBe(0);
  });

  it("les énoncés communs et le corrigé des questions auto-évaluées arrivent au lecteur", async () => {
    const writing = ASSESSMENTS_CFEE_BLANCS.find((a) => a.questionIds.every((id) => CATALOG_QUESTIONS[id]!.type === "self_check"))!;
    const assessment = await db.query<{ id: string }>("select id from public.assessments where slug = $1", [writing.id]);
    const session = await as(db, student, async (tx) => {
      const started = await tx.query<{ session: { attempt_id: string } }>("select public.start_attempt($1) as session", [assessment.rows[0]!.id]);
      const read = await tx.query<{ session: { questions: { stem_html: string; model_html: string }[] } }>("select public.get_attempt_session($1) as session", [started.rows[0]!.session.attempt_id]);
      return read.rows[0]!.session;
    });
    expect(session.questions.length).toBe(writing.questionIds.length);
    expect(session.questions[0]!.stem_html).toContain("Consigne.");
    expect(session.questions[0]!.model_html).toContain("Exemple de texte");
  });
});
