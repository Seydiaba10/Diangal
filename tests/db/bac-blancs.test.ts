import type { PGlite } from "@electric-sql/pglite";
import { beforeAll, describe, expect, it } from "vitest";
import { CATALOG_ANSWER_KEYS } from "@/mocks/answer-keys";
import { ASSESSMENTS_BAC_BLANCS } from "@/mocks/tle/bac-blancs";
import { as, createTestDatabase, createUser, type Actor } from "./harness";

// Sujets blancs du Bac dans la base : rangés sous le Bac avec leur série, corrigés côté serveur comme dans
// la démo (copie parfaite = 20/20, copie vide = 0). Un élève de Terminale S2 passe un sujet de chaque matière.

describe("sujets blancs du Bac (base)", () => {
  let db: PGlite;
  let student: Actor;

  beforeAll(async () => {
    db = await createTestDatabase();
    const id = await createUser(db, { role: "student", first_name: "Fatou", last_name: "Test", birth_date: "2007-03-10", level_code: "TLE" }, null, "tle@test.invalid");
    await db.query("update public.student_profiles set series_id = (select id from public.series where code = 'S2') where user_id = $1", [id]);
    student = { id, role: "student" };
  });

  /** Commence le sujet et envoie la copie donnée par « answer » ; renvoie la note sur 20. */
  async function play(slug: string, answer: (question: { slug: string; type: string }, optionIds: Map<string, string>) => unknown): Promise<number> {
    const { rows } = await db.query<{ id: string; slug: string; type: string }>(
      `select q.id, q.slug, q.type from public.questions q join public.assessment_questions aq on aq.question_id = q.id
       join public.assessments a on a.id = aq.assessment_id where a.slug = $1 order by aq.sort_order`,
      [slug],
    );
    const options = await db.query<{ id: string; slug: string }>("select o.id, o.slug from public.question_options o where o.question_id = any($1::uuid[])", [
      rows.map((q) => q.id),
    ]);
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

  it("le catalogue range chaque sujet sous le Bac, avec sa série, comme un sujet DIANGAL", async () => {
    const rows = await as(
      db,
      student,
      async (tx) =>
        (await tx.query<{ slug: string; kind: string; exam_type: string; series_code: string | null; level_code: string; verification: string; total_points: string }>(
          "select * from public.get_assessments_catalog()",
        )).rows,
    );
    const bac = rows.filter((r) => r.kind === "mock_exam" && r.exam_type === "BAC");
    expect(bac.map((r) => r.slug).sort()).toEqual(ASSESSMENTS_BAC_BLANCS.map((a) => a.id).sort());
    for (const r of bac) {
      const mock = ASSESSMENTS_BAC_BLANCS.find((a) => a.id === r.slug)!;
      expect(r.series_code, r.slug).toBe(mock.seriesCode);
      expect(r.level_code, r.slug).toBe("TLE");
      expect(r.verification, r.slug).toBe("unverified");
      expect(Number(r.total_points), r.slug).toBe(20);
    }
  });

  it("une copie parfaite obtient 20/20 à chaque sujet de la série S2, une copie vide 0", async () => {
    const s2 = ASSESSMENTS_BAC_BLANCS.filter((a) => a.seriesCode === "S2");
    expect(new Set(s2.map((a) => a.subjectCode))).toEqual(new Set(["MATH", "PC", "SVT", "PHILO", "FR", "HG"]));
    for (const a of s2) {
      const score = await play(a.id, (q, optionIds) => {
        if (q.type === "self_check") return "reussi";
        const key = CATALOG_ANSWER_KEYS[q.slug]!;
        if (q.type === "numeric") return String(key.numericValue).replace(".", ",");
        return key.correctOptionIds!.map((slug) => optionIds.get(slug)!);
      });
      expect(score, a.id).toBe(20);
    }
    expect(await play(s2[0]!.id, () => undefined)).toBe(0);
  }, 300_000);
});
