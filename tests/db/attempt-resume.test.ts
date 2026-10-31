import type { PGlite } from "@electric-sql/pglite";
import { beforeAll, describe, expect, it } from "vitest";
import { ANON, as, createTestDatabase, createUser, type Actor } from "./harness";

// Quitter et reprendre un exercice (migration 20261031000001) : sauvegarde des réponses et de la question
// en cours sur le compte de l'élève, reprise de la tentative ouverte, « Recommencer à zéro », jamais d'envoi.

let db: PGlite;
let fatou: Actor;
let moussa: Actor;
let parent: Actor;
/** Série d'exercices sans chrono et contrôle chronométré gratuits de 3e. */
let exercise: string;
let quiz: string;

const one = async <T>(sql: string, params: unknown[] = []) => (await db.query<T>(sql, params)).rows[0]!;

beforeAll(async () => {
  db = await createTestDatabase();
  const student = (first: string, phone: string) =>
    createUser(db, { role: "student", first_name: first, last_name: "Test", birth_date: "2011-05-01", level_code: "3E" }, phone);
  fatou = { id: await student("Fatou", "221770000101"), role: "student" };
  moussa = { id: await student("Moussa", "221770000102"), role: "student" };
  parent = { id: await createUser(db, { role: "parent", first_name: "Aminata", last_name: "Test" }, "221770000103"), role: "parent" };
  const free = (timed: boolean) =>
    one<{ id: string }>(
      `select a.id from public.assessments a join public.levels l on l.id = a.level_id
       where l.code = '3E' and a.status = 'published' and a.owner_id is null and not a.is_premium
         and a.kind = $1 and (a.duration_s is not null) = $2
         and exists (select 1 from public.assessment_questions aq join private.answer_keys k on k.question_id = aq.question_id
                     where aq.assessment_id = a.id and cardinality(k.correct_option_ids) > 0)
       order by a.slug limit 1`,
      [timed ? "quiz" : "exercise", timed],
    ).then((r) => r.id);
  exercise = await free(false);
  quiz = await free(true);
});

type Started = { attempt_id: string; resumed: boolean; questions: { id: string; options: { id: string }[] }[] };
const start = (actor: Actor, assessment: string) =>
  as(db, actor, async (tx) => (await tx.query<{ s: Started }>("select public.start_attempt($1) as s", [assessment])).rows[0]!.s);
const save = (actor: Actor, attempt: string, answers: unknown, index: number) =>
  as(db, actor, (tx) => tx.query("select public.save_attempt_progress($1, $2, $3)", [attempt, JSON.stringify(answers), index]));
type Session = { status: string; saved_answers: Record<string, unknown>; current_index: number; saved_at: string | null };
const session = (actor: Actor, attempt: string) =>
  as(db, actor, async (tx) => (await tx.query<{ s: Session | null }>("select public.get_attempt_session($1) as s", [attempt])).rows[0]!.s);
const openAttempts = (actor: Actor) =>
  as(db, actor, async (tx) =>
    (await tx.query<{ attempt_id: string; answered: number; total: number; current_index: number }>("select * from public.get_my_open_attempts()")).rows,
  );

/** Bonnes réponses (QCM) des questions d'une évaluation, lues dans les corrigés privés. */
async function correctAnswers(assessment: string): Promise<Record<string, string[]>> {
  const rows = (
    await db.query<{ id: string; ok: string[] }>(
      `select q.id, k.correct_option_ids::text[] as ok from public.assessment_questions aq
       join public.questions q on q.id = aq.question_id join private.answer_keys k on k.question_id = q.id
       where aq.assessment_id = $1 and cardinality(k.correct_option_ids) > 0`,
      [assessment],
    )
  ).rows;
  return Object.fromEntries(rows.map((r) => [r.id, r.ok]));
}

describe("quitter et reprendre un exercice", () => {
  it("enregistre les réponses et la question en cours, puis rouvre la même tentative", async () => {
    const first = await start(fatou, exercise);
    expect(first.resumed).toBe(false);
    const [q1, q2] = first.questions;
    const answers = { [q1!.id]: [q1!.options[0]!.id], [q2!.id]: "12" };
    await save(fatou, first.attempt_id, answers, 1);

    const again = await start(fatou, exercise);
    expect(again.attempt_id).toBe(first.attempt_id);
    expect(again.resumed).toBe(true);
    // Même ordre des options : les réponses gardées restent valables.
    expect(again.questions.map((q) => q.options.map((o) => o.id))).toEqual(first.questions.map((q) => q.options.map((o) => o.id)));

    const resumed = (await session(fatou, first.attempt_id))!;
    expect(resumed.status).toBe("in_progress");
    expect(resumed.saved_answers).toEqual(answers);
    expect(resumed.current_index).toBe(1);
    expect(resumed.saved_at).not.toBeNull();
  });

  it("ne garde que les questions de l'évaluation et une question en cours valable", async () => {
    const { attempt_id, questions } = await start(fatou, exercise);
    await save(fatou, attempt_id, { [questions[0]!.id]: "7", "00000000-0000-0000-0000-000000000000": "pirate", [questions[1]!.id]: { x: 1 } }, 999);
    const resumed = (await session(fatou, attempt_id))!;
    expect(Object.keys(resumed.saved_answers)).toEqual([questions[0]!.id]);
    expect(resumed.current_index).toBe(questions.length - 1);
  });

  it("quitter n'envoie jamais la copie : aucune note tant que l'élève n'a pas terminé", async () => {
    const { attempt_id } = await start(fatou, exercise);
    const row = await one<{ status: string; score: number | null; submitted_at: string | null }>(
      "select status, score, submitted_at from public.attempts where id = $1",
      [attempt_id],
    );
    expect(row).toEqual({ status: "in_progress", score: null, submitted_at: null });
    const answered = await one<{ n: number }>("select count(*)::int as n from public.attempt_answers aa join public.attempts a on a.id = aa.attempt_id where a.id = $1", [attempt_id]);
    expect(answered.n).toBe(0);
  });

  it("refuse la sauvegarde d'un autre élève, d'un parent et d'un visiteur", async () => {
    const { attempt_id } = await start(fatou, exercise);
    await expect(save(moussa, attempt_id, {}, 0)).rejects.toThrow(/not_found/);
    await expect(save(parent, attempt_id, {}, 0)).rejects.toThrow(/not_found/);
    await expect(save(ANON, attempt_id, {}, 0)).rejects.toThrow(/permission denied|not_authenticated/);
    expect(await session(moussa, attempt_id)).toBeNull();
    expect(await openAttempts(moussa)).toEqual([]);
  });

  it("liste l'exercice en cours une seule fois, avec le nombre de réponses et la question en cours", async () => {
    // Plusieurs départs sur la même série n'ont ouvert qu'une tentative ; la dernière sauvegarde a gardé 1 réponse.
    const { attempt_id, questions } = await start(fatou, exercise);
    expect(await openAttempts(fatou)).toEqual([
      expect.objectContaining({ attempt_id, answered: 1, total: questions.length, current_index: questions.length - 1 }),
    ]);
  });

  it("« Recommencer à zéro » ferme l'essai sans note, puis en ouvre un nouveau", async () => {
    const { attempt_id } = await start(fatou, exercise);
    await expect(as(db, moussa, (tx) => tx.query("select public.abandon_attempt($1)", [attempt_id]))).rejects.toThrow(/not_found/);
    await as(db, fatou, (tx) => tx.query("select public.abandon_attempt($1)", [attempt_id]));
    const row = await one<{ status: string; score: number | null }>("select status, score from public.attempts where id = $1", [attempt_id]);
    expect(row).toEqual({ status: "expired", score: null });
    expect(await session(fatou, attempt_id)).toEqual({ status: "expired" });
    await expect(save(fatou, attempt_id, {}, 0)).rejects.toThrow(/not_in_progress/);

    const fresh = await start(fatou, exercise);
    expect(fresh.attempt_id).not.toBe(attempt_id);
    expect(fresh.resumed).toBe(false);
    expect((await openAttempts(fatou)).map((r) => r.attempt_id)).toEqual([fresh.attempt_id]);
  });
});

describe("contrôle chronométré quitté", () => {
  it("ne se recommence pas et refuse la sauvegarde après la fin du temps", async () => {
    const { attempt_id } = await start(moussa, quiz);
    await expect(as(db, moussa, (tx) => tx.query("select public.abandon_attempt($1)", [attempt_id]))).rejects.toThrow(/not_found/);
    await db.query("update public.attempts set deadline_at = now() - interval '2 minutes' where id = $1", [attempt_id]);
    await expect(save(moussa, attempt_id, {}, 0)).rejects.toThrow(/deadline_passed/);
    // Temps écoulé : plus proposé à la reprise, un nouveau départ ouvre une autre tentative.
    expect((await openAttempts(moussa)).map((r) => r.attempt_id)).not.toContain(attempt_id);
    const next = await start(moussa, quiz);
    expect(next.attempt_id).not.toBe(attempt_id);
  });

  it("corrige une copie envoyée en retard avec les réponses enregistrées (plus de copie vide)", async () => {
    const { attempt_id } = await start(fatou, quiz);
    const answers = await correctAnswers(quiz);
    await save(fatou, attempt_id, answers, 0);
    await db.query("update public.attempts set deadline_at = now() - interval '2 minutes' where id = $1", [attempt_id]);
    const result = await as(db, fatou, async (tx) =>
      (await tx.query<{ r: { score: number } }>("select public.submit_attempt($1, '{}'::jsonb) as r", [attempt_id])).rows[0]!.r,
    );
    expect(Number(result.score)).toBeGreaterThan(0);
    const row = await one<{ late_sync: boolean; status: string }>("select late_sync, status from public.attempts where id = $1", [attempt_id]);
    expect(row).toEqual({ late_sync: true, status: "submitted" });
  });
});
