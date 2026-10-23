import type { PGlite } from "@electric-sql/pglite";
import { beforeAll, describe, expect, it } from "vitest";
import { as, createTestDatabase, createUser, type Actor } from "./harness";

// Navigation entre les classes : un élève passé de 3e en 2nde garde sa progression de 3e,
// peut réviser la 3e (leçons, devoirs préparés) et ne peut pas ouvrir une classe supérieure.

let db: PGlite;
let student: Actor;
const one = async <T>(sql: string, params: unknown[] = []) => (await db.query<T>(sql, params)).rows[0]!;

/** Chapitre gratuit d'une classe (et d'une série) qui a des questions publiées. */
const chapterOf = async (level: string, series: string | null = null) =>
  (
    await one<{ id: string }>(
      `select c.id from public.chapters c
       join public.programs p on p.id = c.program_id
       join public.levels l on l.id = p.level_id
       left join public.series s on s.id = p.series_id
       where l.code = $1 and (s.code is not distinct from $2) and c.status = 'published'
         and exists (select 1 from public.questions q where q.chapter_id = c.id and q.status = 'published')
         and not exists (select 1 from public.lessons x where x.chapter_id = c.id and x.is_premium)
       order by c.number limit 1`,
      [level, series],
    )
  ).id;

const practice = (chapter: string) =>
  as(db, student, (tx) => tx.query("select public.create_practice_session(array[$1::uuid], 5, false)", [chapter]));

beforeAll(async () => {
  db = await createTestDatabase();
  student = {
    id: await createUser(db, { role: "student", first_name: "Moussa", last_name: "Diop", birth_date: "2011-01-01", level_code: "3E" }),
    role: "student",
  };
});

describe("passage de 3e en 2nde et révision de la 3e", () => {
  it("garde la progression de 3e, ouvre la 2nde et les classes précédentes, jamais les suivantes", async () => {
    // 1-3. Élève de 3e : une leçon terminée et un devoir préparé en 3e.
    const chapter3e = await chapterOf("3E");
    const lesson3e = await one<{ id: string }>("select id from public.lessons where chapter_id = $1 order by number limit 1", [chapter3e]);
    await as(db, student, (tx) => tx.query("select public.complete_lesson($1)", [lesson3e.id]));
    await practice(chapter3e);
    const before = await one<{ progress: number; sessions: number }>(
      `select (select count(*)::int from public.lesson_progress where user_id = $1) as progress,
              (select count(*)::int from public.assessments where owner_id = $1) as sessions`,
      [student.id],
    );
    expect(before).toEqual({ progress: 1, sessions: 1 });

    // 4-5. Passage en 2nde S : la classe actuelle change, l'historique garde la 3e.
    await as(db, student, (tx) => tx.query("select public.promote_student($1, 'S')", [student.id]));
    const level = await one<{ level: string; series: string; history: string }>(
      `select l.code as level, s.code as series,
              (select string_agg(hl.code, ',') from public.student_level_history h join public.levels hl on hl.id = h.level_id
               where h.student_id = $1) as history
       from public.student_profiles sp join public.levels l on l.id = sp.level_id left join public.series s on s.id = sp.series_id
       where sp.user_id = $1`,
      [student.id],
    );
    expect(level).toEqual({ level: "2NDE", series: "S", history: "3E" });

    // 6. Cours de 2nde S : devoir préparé possible ; 2nde L (autre série) refusée.
    await practice(await chapterOf("2NDE", "S"));
    await expect(practice(await chapterOf("2NDE", "L"))).rejects.toThrow(/invalid_chapters/);

    // 7. La 3e reste ouverte en révision ; la Terminale (classe supérieure) est refusée.
    await practice(chapter3e);
    await as(db, student, (tx) => tx.query("select public.complete_lesson($1)", [lesson3e.id]));
    await expect(practice(await chapterOf("TLE", "S1"))).rejects.toThrow(/invalid_chapters/);

    // 8-9. Rien n'est perdu : progression de 3e et séances déjà créées toujours là.
    const after = await one<{ progress: number; sessions: number }>(
      `select (select count(*)::int from public.lesson_progress where user_id = $1 and lesson_id = $2 and status = 'completed') as progress,
              (select count(*)::int from public.assessments where owner_id = $1) as sessions`,
      [student.id, lesson3e.id],
    );
    expect(after).toEqual({ progress: 1, sessions: 3 });
  });
});
