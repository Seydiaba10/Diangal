import type { PGlite } from "@electric-sql/pglite";
import { beforeAll, describe, expect, it } from "vitest";
import { normalizeText, parseNumber } from "@/lib/grading";
import { CATALOG_CHAPTERS } from "@/mocks/curriculum";
import { CHAPTERS_CI } from "@/mocks/curriculum-ci";
import { CHAPTERS_CP } from "@/mocks/curriculum-cp";
import { ANON, as, createTestDatabase, createUser, type Actor } from "./harness";

let db: PGlite;
let awa: Actor;
let ibou: Actor;
let mariama: Actor;
let stranger: Actor;
let mamadou: Actor;
let seynabou: Actor;
let admin: Actor;
let adminMfa: Actor;

const one = async <T>(sql: string, params: unknown[] = []) => (await db.query<T>(sql, params)).rows[0]!;

beforeAll(async () => {
  db = await createTestDatabase();

  const student = (first: string, birth: string, phone: string) =>
    createUser(db, { role: "student", first_name: first, last_name: "Test", birth_date: birth, level_code: "3E" }, phone);
  awa = { id: await student("Awa", "2012-03-01", "221770000001"), role: "student" };
  ibou = { id: await student("Ibou", "2011-09-15", "221770000002"), role: "student" };
  mariama = { id: await createUser(db, { role: "parent", first_name: "Mariama", last_name: "Ndiaye" }, "221770000021"), role: "parent" };
  stranger = { id: await createUser(db, { role: "parent", first_name: "Inconnu", last_name: "X" }, "221770000099"), role: "parent" };
  mamadou = { id: await createUser(db, { role: "tutor", first_name: "Mamadou", last_name: "Diallo" }, "221770000031"), role: "tutor" };
  seynabou = { id: await createUser(db, { role: "tutor", first_name: "Seynabou", last_name: "Guèye" }, "221770000032"), role: "tutor" };
  const adminId = await createUser(db, { role: "parent", first_name: "Ibrahima", last_name: "Sy" }, "221770000041");
  await db.query("update public.profiles set role = 'admin' where id = $1", [adminId]);
  admin = { id: adminId, role: "admin", aal: "aal1" };
  adminMfa = { id: adminId, role: "admin", aal: "aal2" };

  // Répétiteurs : Mamadou approuvé (Maths, 3e, Dakar), Seynabou en attente.
  for (const [tutor, status] of [[mamadou, "approved"], [seynabou, "pending"]] as const) {
    await db.query(
      `update public.tutor_profiles set status = $2, headline = 'Maths au collège', hourly_rate_fcfa = 4000,
         city_id = (select id from public.cities where slug = 'dakar') where user_id = $1`,
      [tutor.id, status],
    );
    await db.query("insert into public.tutor_subjects select $1, id from public.subjects where code = 'MATH'", [tutor.id]);
    await db.query("insert into public.tutor_levels select $1, id from public.levels where code = '3E'", [tutor.id]);
  }
});

const assessmentId = (slug: string) => one<{ id: string }>("select id from public.assessments where slug = $1", [slug]).then((r) => r.id);

describe("inscription", () => {
  it("refuse de créer un administrateur par inscription", async () => {
    await expect(createUser(db, { role: "admin", first_name: "Pirate", last_name: "X" })).rejects.toThrow(/role_not_allowed/);
  });

  it("place un élève mineur en attente de validation parentale", async () => {
    const row = await one<{ consent_status: string }>("select consent_status from public.student_profiles where user_id = $1", [awa.id]);
    expect(row.consent_status).toBe("pending");
  });
});

describe("contenus", () => {
  it("montre les chapitres publiés à tous, mais garde les leçons Premium pour les abonnés", async () => {
    const result = await as(db, ANON, async (tx) => ({
      chapters: (await tx.query<{ n: number }>("select count(*)::int as n from public.chapters")).rows[0]!.n,
      premiumBodies: (await tx.query<{ n: number }>(
        "select count(*)::int as n from public.lesson_bodies b join public.lessons l on l.id = b.lesson_id where l.is_premium",
      )).rows[0]!.n,
      freeBodies: (await tx.query<{ n: number }>("select count(*)::int as n from public.lesson_bodies")).rows[0]!.n,
    }));
    expect(result.chapters).toBe(CATALOG_CHAPTERS.length);
    expect(result.premiumBodies).toBe(0);
    // Offre gratuite : seules les leçons des premiers chapitres de chaque matière sont lisibles.
    expect(result.freeBodies).toBe(CATALOG_CHAPTERS.flatMap((c) => c.lessons).filter((l) => !l.isPremium).length);
  });

  it("publie le programme du CI (français, maths, ESVS), chaque leçon rédigée", async () => {
    const ci = await as(db, adminMfa, async (tx) =>
      (await tx.query<{ subject: string; chapters: number; empty: number }>(
        `select s.code as subject, count(distinct c.id)::int as chapters,
                count(l.id) filter (where coalesce(b.body_html, '') not like '%<h2>%')::int as empty
         from public.programs p join public.levels lv on lv.id = p.level_id join public.subjects s on s.id = p.subject_id
         join public.chapters c on c.program_id = p.id join public.lessons l on l.chapter_id = c.id
         left join public.lesson_bodies b on b.lesson_id = l.id
         where lv.code = 'CI' group by s.code order by s.code`,
      )).rows,
    );
    expect(ci.map((r) => r.subject)).toEqual(["ESVS", "FR", "MATH"]);
    expect(ci.reduce((sum, r) => sum + r.chapters, 0)).toBe(CHAPTERS_CI.length);
    expect(ci.every((r) => r.empty === 0)).toBe(true);
  });

  it("publie le programme du CP (français, maths, ESVS), chaque leçon rédigée et une série d'exercices par chapitre", async () => {
    const cp = await as(db, adminMfa, async (tx) =>
      (await tx.query<{ subject: string; chapters: number; empty: number; series: number }>(
        `select s.code as subject, count(distinct c.id)::int as chapters,
                count(l.id) filter (where coalesce(b.body_html, '') not like '%<h2>%')::int as empty,
                (select count(*)::int from public.assessments a where a.chapter_id in (
                   select c2.id from public.chapters c2 where c2.program_id = p.id) and a.kind = 'exercise') as series
         from public.programs p join public.levels lv on lv.id = p.level_id join public.subjects s on s.id = p.subject_id
         join public.chapters c on c.program_id = p.id join public.lessons l on l.chapter_id = c.id
         left join public.lesson_bodies b on b.lesson_id = l.id
         where lv.code = 'CP' group by s.code, p.id order by s.code`,
      )).rows,
    );
    expect(cp.map((r) => r.subject)).toEqual(["ESVS", "FR", "MATH"]);
    expect(cp.reduce((sum, r) => sum + r.chapters, 0)).toBe(CHAPTERS_CP.length);
    expect(cp.every((r) => r.empty === 0)).toBe(true);
    expect(cp.reduce((sum, r) => sum + r.series, 0)).toBe(CHAPTERS_CP.length);
  });

  it("n'expose jamais les questions ni les corrigés à un élève", async () => {
    const questions = await as(db, awa, (tx) => tx.query("select * from public.questions"));
    expect(questions.rows).toHaveLength(0);
    await expect(as(db, awa, (tx) => tx.query("select * from private.answer_keys"))).rejects.toThrow(/permission denied/);
  });

  it("ne laisse lire ni téléphone ni email par l'API", async () => {
    await expect(as(db, awa, (tx) => tx.query("select phone from public.profiles"))).rejects.toThrow(/permission denied/);
  });
});

describe("contrôle chronométré", () => {
  it("renvoie les questions sans corrigé et corrige côté serveur", async () => {
    // Contrôle chronométré d'un chapitre gratuit (offre gratuite : les 3 premiers chapitres).
    const quiz = await assessmentId("past-simple-quiz");
    const session = await as(db, awa, async (tx) =>
      (await tx.query<{ s: { attempt_id: string; deadline_at: string; questions: { id: string; options: unknown[] }[] } }>(
        "select public.start_attempt($1) as s", [quiz],
      )).rows[0]!.s,
    );
    expect(session.deadline_at).toBeTruthy();
    expect(session.questions).toHaveLength(5);
    expect(JSON.stringify(session)).not.toMatch(/correct_option|accepted_texts|numeric_value|explanation_html/);

    // Bonnes réponses (lues en tant que propriétaire de la base, comme le ferait le correcteur).
    const keys = (await db.query<{ id: string; type: string; correct: string[]; texts: string[]; num: string | null }>(
      `select q.id, q.type, k.correct_option_ids as correct, k.accepted_texts as texts, k.numeric_value::text as num
       from public.assessment_questions aq join public.questions q on q.id = aq.question_id
       join private.answer_keys k on k.question_id = q.id where aq.assessment_id = $1`, [quiz],
    )).rows;
    const answers = Object.fromEntries(
      keys.map((k) => [k.id, k.type === "numeric" ? k.num!.replace(".", ",") : k.type === "short_text" ? k.texts[0] : k.correct]),
    );

    const result = await as(db, awa, async (tx) =>
      (await tx.query<{ r: { score_20: number } }>("select public.submit_attempt($1, $2) as r", [session.attempt_id, JSON.stringify(answers)])).rows[0]!.r,
    );
    expect(Number(result.score_20)).toBe(20);

    // Idempotence : un second envoi ne recorrige pas.
    const again = await as(db, awa, async (tx) =>
      (await tx.query<{ r: { already_submitted: boolean } }>("select public.submit_attempt($1, '{}') as r", [session.attempt_id])).rows[0]!.r,
    );
    expect(again.already_submitted).toBe(true);

    const review = await as(db, awa, async (tx) =>
      (await tx.query<{ r: { questions: { explanation_html: string }[] } }>("select public.get_attempt_review($1) as r", [session.attempt_id])).rows[0]!.r,
    );
    expect(review.questions[0]!.explanation_html.length).toBeGreaterThan(10);

    const mastery = await one<{ n: number }>("select count(*)::int as n from public.chapter_mastery where user_id = $1", [awa.id]);
    expect(mastery.n).toBe(1);
  });

  it("isole les résultats : un autre élève ne voit rien", async () => {
    const rows = await as(db, ibou, (tx) => tx.query("select * from public.attempts"));
    expect(rows.rows).toHaveLength(0);
  });

  it("bloque un contrôle Premium sans abonnement, l'ouvre avec un pass actif", async () => {
    const premium = await assessmentId("acides-bases-quiz");
    await expect(as(db, awa, (tx) => tx.query("select public.start_attempt($1)", [premium]))).rejects.toThrow(/premium_required/);
    await db.query(
      `insert into public.subscriptions (student_id, payer_id, plan_id, starts_at, ends_at)
       values ($1, $2, (select id from public.plans where code = 'monthly'), now() - interval '1 day', now() + interval '29 days')`,
      [awa.id, mariama.id],
    );
    const ok = await as(db, awa, (tx) => tx.query("select public.start_attempt($1)", [premium]));
    expect(ok.rows).toHaveLength(1);
  });
});

describe("validation parentale et mode limité", () => {
  it("bloque la messagerie d'un mineur non validé", async () => {
    await expect(
      as(db, awa, (tx) => tx.query("select public.start_conversation($1, 'Bonjour')", [mamadou.id])),
    ).rejects.toThrow(/consent_required/);
  });

  it("refuse la validation par un autre numéro que celui donné par l'élève", async () => {
    await as(db, awa, (tx) => tx.query("select public.request_parental_consent('+221770000021')"));
    const { params } = await one<{ params: { token: string } }>("select params from private.sms_outbox order by id desc limit 1");
    await expect(
      as(db, stranger, (tx) => tx.query("select public.decide_parental_consent($1, 'granted')", [params.token])),
    ).rejects.toThrow(/phone_mismatch/);
    await as(db, mariama, (tx) => tx.query("select public.decide_parental_consent($1, 'granted')", [params.token]));
    const row = await one<{ consent_status: string }>("select consent_status from public.student_profiles where user_id = $1", [awa.id]);
    expect(row.consent_status).toBe("granted");
  });

  it("donne au parent lié l'accès au suivi de son enfant, à lui seul", async () => {
    const parentView = await as(db, mariama, (tx) => tx.query("select public.get_student_dashboard($1) as d", [awa.id]));
    expect(parentView.rows).toHaveLength(1);
    await expect(as(db, ibou, (tx) => tx.query("select public.get_student_dashboard($1)", [awa.id]))).rejects.toThrow(/not_found/);
  });

  it("exige la confirmation de l'élève pour un lien créé avec son code", async () => {
    const { student_code } = await one<{ student_code: string }>("select student_code from public.student_profiles where user_id = $1", [ibou.id]);
    await as(db, stranger, (tx) => tx.query("select public.link_child_by_code($1)", [student_code]));
    await expect(as(db, stranger, (tx) => tx.query("select public.get_student_dashboard($1)", [ibou.id]))).rejects.toThrow(/not_found/);
    await as(db, ibou, (tx) => tx.query("select public.confirm_parent_link($1)", [stranger.id]));
    const view = await as(db, stranger, (tx) => tx.query("select public.get_student_dashboard($1)", [ibou.id]));
    expect(view.rows).toHaveLength(1);
  });

  it("ouvre la messagerie après validation, avec le parent en observateur et les numéros masqués", async () => {
    const conv = await as(db, awa, async (tx) =>
      (await tx.query<{ id: string }>("select public.start_conversation($1, 'Mon numéro : 77 123 45 67') as id", [mamadou.id])).rows[0]!.id,
    );
    const members = (await db.query<{ member_role: string }>("select member_role from public.conversation_members where conversation_id = $1", [conv])).rows;
    expect(members.map((m) => m.member_role).sort()).toEqual(["observer", "student", "tutor"]);
    const seen = await as(db, mamadou, (tx) => tx.query<{ body: string }>("select body from public.messages where conversation_id = $1", [conv]));
    expect(seen.rows[0]!.body).toBe("Mon numéro : •••");
    await expect(
      as(db, mariama, (tx) => tx.query("insert into public.messages (conversation_id, sender_id, body) values ($1, $2, 'Bonjour')", [conv, mariama.id])),
    ).rejects.toThrow(/row-level security/);
  });
});

describe("paiement d'un pass Premium", () => {
  it("prend le montant en base, refuse un parent non lié et applique le webhook une seule fois", async () => {
    await expect(
      as(db, stranger, (tx) => tx.query("select public.create_payment_intent('quarterly', $1, 'wave')", [awa.id])),
    ).rejects.toThrow(/not_your_child/);

    const intent = await as(db, mariama, async (tx) =>
      (await tx.query<{ r: { reference: string; amount_fcfa: number } }>(
        "select public.create_payment_intent('quarterly', $1, 'wave') as r", [awa.id],
      )).rows[0]!.r,
    );
    expect(intent.amount_fcfa).toBe(5000);
    expect(intent.reference).toMatch(/^DGL-\d{4}-\d{6}$/);

    // Un utilisateur ne peut pas valider lui-même un paiement.
    await expect(
      as(db, mariama, (tx) => tx.query("select public.apply_payment_event($1, 'tok', 'succeeded')", [intent.reference])),
    ).rejects.toThrow(/permission denied/);

    const before = await one<{ n: number }>("select count(*)::int as n from public.subscriptions where student_id = $1", [awa.id]);
    await db.query("select public.apply_payment_event($1, 'tok-1', 'succeeded', 'wave')", [intent.reference]);
    const replay = await one<{ r: { already_applied: boolean } }>(
      "select public.apply_payment_event($1, 'tok-1', 'succeeded', 'wave') as r", [intent.reference],
    );
    expect(replay.r.already_applied).toBe(true);
    const after = await one<{ n: number; ends: string }>(
      "select count(*)::int as n, max(ends_at)::text as ends from public.subscriptions where student_id = $1", [awa.id],
    );
    expect(after.n).toBe(before.n + 1);
    // Le pass de 90 jours s'ajoute à la fin du pass mensuel déjà actif (≈ 29 + 90 jours).
    const days = (Date.parse(after.ends) - Date.now()) / 86_400_000;
    expect(days).toBeGreaterThan(118);
  });
});

describe("parité de correction SQL / TypeScript (hors ligne)", () => {
  const TEXTS = ["  La RÉCIPROQUE du théorème de Thalès ! ", "« thèse   réfutée »", "Bought.", "L’immunité (organisme)", "Sacré-Cœur", ""];
  const NUMBERS = ["4,5", "4,5 cm", " 1 200 ", "-3", "six", "", "0,25"];

  it("normalise les réponses courtes de la même façon", async () => {
    for (const value of TEXTS) {
      const sql = await one<{ v: string }>("select private.normalize_text($1) as v", [value]);
      expect(sql.v).toBe(normalizeText(value));
    }
  });

  it("lit les nombres de la même façon", async () => {
    for (const value of NUMBERS) {
      const sql = await one<{ v: string | null }>("select private.parse_number($1)::text as v", [value]);
      expect(sql.v === null ? null : Number(sql.v)).toBe(parseNumber(value));
    }
  });
});

describe("répétiteurs et administration", () => {
  it("n'autorise pas un répétiteur à changer son propre statut", async () => {
    await expect(
      as(db, seynabou, (tx) => tx.query("update public.tutor_profiles set status = 'approved' where user_id = $1", [seynabou.id])),
    ).rejects.toThrow(/permission denied/);
  });

  it("ne publie dans l'annuaire que les répétiteurs approuvés", async () => {
    const names = await as(db, ANON, async (tx) =>
      (await tx.query<{ display_name: string }>("select display_name from public.search_tutors(p_subject => 'MATH')")).rows.map((r) => r.display_name),
    );
    expect(names).toEqual(["Mamadou Diallo"]);
  });

  it("exige la double authentification pour les décisions d'administration", async () => {
    await expect(
      as(db, admin, (tx) => tx.query("select public.review_tutor($1, 'approved')", [seynabou.id])),
    ).rejects.toThrow(/admins_only/);
    await as(db, adminMfa, (tx) => tx.query("select public.review_tutor($1, 'approved')", [seynabou.id]));
    const listed = await as(db, ANON, (tx) => tx.query("select * from public.search_tutors(p_subject => 'MATH')"));
    expect(listed.rows).toHaveLength(2);
    const audit = await one<{ n: number }>("select count(*)::int as n from public.audit_logs where entity_id = $1", [seynabou.id]);
    expect(audit.n).toBe(1);
  });

  it("interdit deux réservations qui se chevauchent pour un même répétiteur", async () => {
    const insert = (start: string, end: string) =>
      db.query(
        `insert into public.bookings (tutor_id, student_id, booked_by, subject_id, level_id, mode, starts_at, ends_at, price_fcfa, status)
         values ($1, $2, $3, (select id from public.subjects where code = 'MATH'), (select id from public.levels where code = '3E'),
                 'online', $4, $5, 4000, 'accepted')`,
        [mamadou.id, awa.id, mariama.id, start, end],
      );
    await insert("2026-10-17T09:00:00Z", "2026-10-17T10:00:00Z");
    await expect(insert("2026-10-17T09:30:00Z", "2026-10-17T10:30:00Z")).rejects.toThrow(/bookings_no_overlap/);
  });
});

describe("fonctions des écrans", () => {
  it("marque une leçon terminée une seule fois et compte la journée d'activité", async () => {
    const lesson = await one<{ id: string }>(
      "select l.id from public.lessons l join public.chapters c on c.id = l.chapter_id where c.slug = 'racine-carree' and not l.is_premium order by l.number limit 1",
    );
    await as(db, ibou, (tx) => tx.query("select public.complete_lesson($1)", [lesson.id]));
    await as(db, ibou, (tx) => tx.query("select public.complete_lesson($1)", [lesson.id]));
    const progress = await one<{ status: string }>("select status from public.lesson_progress where user_id = $1 and lesson_id = $2", [ibou.id, lesson.id]);
    expect(progress.status).toBe("completed");
    const activity = await one<{ n: number }>("select lessons_completed as n from public.daily_activity where user_id = $1", [ibou.id]);
    expect(activity.n).toBe(1);

    const premium = await one<{ id: string }>("select id from public.lessons where is_premium limit 1");
    await expect(as(db, ibou, (tx) => tx.query("select public.complete_lesson($1)", [premium.id]))).rejects.toThrow(/premium_required/);
    await expect(as(db, mamadou, (tx) => tx.query("select public.complete_lesson($1)", [lesson.id]))).rejects.toThrow(/students_only/);
  });

  it("reprend un contrôle en cours avec le même ordre d'options, sans corrigé", async () => {
    const quiz = await assessmentId("past-simple-quiz");
    const started = await as(db, ibou, async (tx) =>
      (await tx.query<{ s: { attempt_id: string; questions: { options: { id: string }[] }[] } }>("select public.start_attempt($1) as s", [quiz])).rows[0]!.s,
    );
    const resumed = await as(db, ibou, async (tx) =>
      (await tx.query<{ s: { status: string; assessment_slug: string; questions: { options: { id: string }[] }[] } }>(
        "select public.get_attempt_session($1) as s", [started.attempt_id],
      )).rows[0]!.s,
    );
    expect(resumed.status).toBe("in_progress");
    expect(resumed.assessment_slug).toBe("past-simple-quiz");
    expect(resumed.questions.map((q) => q.options.map((o) => o.id))).toEqual(started.questions.map((q) => q.options.map((o) => o.id)));
    expect(JSON.stringify(resumed)).not.toMatch(/correct_option|accepted_texts|numeric_value|explanation_html/);

    const other = await as(db, awa, async (tx) => (await tx.query<{ s: unknown }>("select public.get_attempt_session($1) as s", [started.attempt_id])).rows[0]!.s);
    expect(other).toBeNull();
  });

  it("affiche le prénom de l'enfant sur la page du lien SMS, seulement avec un jeton valide", async () => {
    await as(db, ibou, (tx) => tx.query("select public.request_parental_consent('+221770000021')"));
    const { params } = await one<{ params: { token: string } }>("select params from private.sms_outbox order by id desc limit 1");
    const found = await as(db, ANON, async (tx) =>
      (await tx.query<{ r: { child_first_name: string } | null }>("select public.get_consent_request($1) as r", [params.token])).rows[0]!.r,
    );
    expect(found?.child_first_name).toBe("Ibou");
    const wrong = await as(db, ANON, async (tx) => (await tx.query<{ r: unknown }>("select public.get_consent_request('faux') as r")).rows[0]!.r);
    expect(wrong).toBeNull();
  });

  it("montre à l'élève le parent qui demande à être relié", async () => {
    const khady = await createUser(db, { role: "student", first_name: "Khady", last_name: "Fall", birth_date: "2013-01-10", level_code: "3E" });
    const omar = await createUser(db, { role: "parent", first_name: "Omar", last_name: "Fall" });
    const { student_code } = await one<{ student_code: string }>("select student_code from public.student_profiles where user_id = $1", [khady]);
    await as(db, { id: omar, role: "parent" }, (tx) => tx.query("select public.link_child_by_code($1)", [student_code]));
    const pending = await as(db, { id: khady, role: "student" }, async (tx) =>
      (await tx.query<{ first_name: string }>("select first_name from public.get_pending_parent_links()")).rows,
    );
    expect(pending.map((p) => p.first_name)).toEqual(["Omar"]);
  });

  it("enregistre les consentements d'inscription sans doublon", async () => {
    await as(db, ibou, (tx) => tx.query("select public.record_signup_consents('2026-10')"));
    await as(db, ibou, (tx) => tx.query("select public.record_signup_consents('2026-10')"));
    const rows = await one<{ n: number }>("select count(*)::int as n from public.consents where subject_user_id = $1", [ibou.id]);
    expect(rows.n).toBe(2);
  });

  it("publie la fiche d'un répétiteur approuvé, cache celle d'un dossier en attente", async () => {
    const pape = await createUser(db, { role: "tutor", first_name: "Pape", last_name: "Sarr" });
    const pub = await as(db, ANON, async (tx) =>
      (await tx.query<{ r: { display_name: string; subjects: string[] } | null }>("select public.get_tutor_profile($1) as r", [mamadou.id])).rows[0]!.r,
    );
    expect(pub?.display_name).toBe("Mamadou Diallo");
    expect(pub?.subjects).toEqual(["MATH"]);
    expect(JSON.stringify(pub)).not.toMatch(/\+221/);
    const hidden = await as(db, ANON, async (tx) => (await tx.query<{ r: unknown }>("select public.get_tutor_profile($1) as r", [pape])).rows[0]!.r);
    expect(hidden).toBeNull();
    const own = await as(db, { id: pape, role: "tutor" }, async (tx) =>
      (await tx.query<{ r: { status: string } | null }>("select public.get_tutor_profile($1) as r", [pape])).rows[0]!.r,
    );
    expect(own?.status).toBe("draft");
  });

  it("réserve les corrigés et l'édition des leçons à l'admin en double authentification", async () => {
    const quiz = await assessmentId("thales-quiz");
    await expect(as(db, admin, (tx) => tx.query("select public.admin_get_assessment($1)", [quiz]))).rejects.toThrow(/admins_only/);
    const full = await as(db, adminMfa, async (tx) =>
      (await tx.query<{ r: { questions: { correct_option_ids: string[] }[] } }>("select public.admin_get_assessment($1) as r", [quiz])).rows[0]!.r,
    );
    expect(full.questions).toHaveLength(6);
    expect(full.questions.some((q) => q.correct_option_ids.length > 0)).toBe(true);

    const lesson = await one<{ id: string; version: number }>("select id, version from public.lessons order by number limit 1");
    await expect(as(db, ibou, (tx) => tx.query("select public.admin_save_lesson_body($1, '<p>x</p>')", [lesson.id]))).rejects.toThrow(/admins_only/);
    await as(db, adminMfa, (tx) => tx.query("select public.admin_save_lesson_body($1, '<p>Nouveau cours</p>')", [lesson.id]));
    const saved = await one<{ html: string; version: number }>(
      "select b.body_html as html, l.version from public.lesson_bodies b join public.lessons l on l.id = b.lesson_id where l.id = $1",
      [lesson.id],
    );
    expect(saved.html).toBe("<p>Nouveau cours</p>");
    expect(saved.version).toBe(lesson.version + 1);

    await as(db, adminMfa, (tx) => tx.query("select public.admin_log('signalement traité', 'report', 'r-1')"));
    const log = await one<{ n: number }>("select count(*)::int as n from public.audit_logs where entity_id = 'r-1'");
    expect(log.n).toBe(1);
  });

  it("publie le nombre de questions et le barème des contrôles, sans les questions", async () => {
    const rows = await as(db, ANON, async (tx) =>
      (await tx.query<{ slug: string; questions_count: number; total_points: string }>(
        "select slug, questions_count, total_points::text from public.get_assessments_catalog()",
      )).rows,
    );
    const thales = rows.find((r) => r.slug === "thales-quiz")!;
    expect(thales.questions_count).toBe(6);
    expect(Number(thales.total_points)).toBeGreaterThan(0);
  });

  it("montre à l'élève le numéro masqué du parent sollicité", async () => {
    const info = await as(db, ibou, async (tx) =>
      (await tx.query<{ r: { parent_phone_masked: string } | null }>("select public.get_my_consent_request() as r")).rows[0]!.r,
    );
    expect(info?.parent_phone_masked).toBe("77 ••• •• 21");
  });

  it("prévient les autres membres d'une conversation d'un nouveau message", async () => {
    const count = (actor: Actor) =>
      as(db, actor, async (tx) => (await tx.query<{ n: number }>("select count(*)::int as n from public.notifications where type = 'tutor_message'")).rows[0]!.n);
    expect(await count(mamadou)).toBeGreaterThan(0);
    expect(await count(mariama)).toBeGreaterThan(0);
    expect(await count(awa)).toBe(0);
  });
});

describe("canal du code de connexion", () => {
  it("note le choix WhatsApp avec la clé secrète uniquement, SMS par défaut", async () => {
    const channelOf = async (phone: string) => (await one<{ c: string }>("select private.otp_channel_for($1) as c", [phone])).c;
    expect(await channelOf("+221771112233")).toBe("sms");

    // Un navigateur (anonyme ou connecté) ne peut pas choisir le canal d'un numéro.
    for (const actor of [ANON, awa]) {
      await expect(
        as(db, actor, (tx) => tx.query("select public.set_otp_channel('+221771112233', 'whatsapp')")),
      ).rejects.toThrow(/permission denied/);
    }

    await db.transaction(async (tx) => {
      await tx.exec("set local role service_role");
      await tx.query("select public.set_otp_channel('+221771112233', 'whatsapp')");
    });
    expect(await channelOf("+221771112233")).toBe("whatsapp");
    await db.query("select public.set_otp_channel('+221771112233', 'sms')");
    expect(await channelOf("+221771112233")).toBe("sms");
    await expect(db.query("select public.set_otp_channel('771112233', 'whatsapp')")).rejects.toThrow(/check/);
  });
});

describe("suivi d'élèves par un répétiteur", () => {
  it("invitation par code, accord du parent, notes, devoirs, cours en ligne et messages", async () => {
    const fatou = { id: await createUser(db, { role: "student", first_name: "Fatou", last_name: "Sow", birth_date: "2019-05-01", level_code: "CI" }), role: "student" } as Actor;
    const aminata = { id: await createUser(db, { role: "parent", first_name: "Aminata", last_name: "Sow" }), role: "parent" } as Actor;
    await db.query("insert into public.parent_links (parent_id, student_id, status) values ($1, $2, 'active')", [aminata.id, fatou.id]);
    const { student_code } = await one<{ student_code: string }>("select student_code from public.student_profiles where user_id = $1", [fatou.id]);

    // Seul un répétiteur vérifié peut inviter, et seulement avec un vrai code.
    const newcomer = { id: await createUser(db, { role: "tutor", first_name: "Ousmane", last_name: "Ba" }), role: "tutor" } as Actor;
    await expect(as(db, newcomer, (tx) => tx.query("select public.invite_student_by_code($1)", [student_code]))).rejects.toThrow(/tutor_not_approved/);
    await expect(as(db, aminata, (tx) => tx.query("select public.invite_student_by_code($1)", [student_code]))).rejects.toThrow(/tutors_only/);
    await expect(as(db, mamadou, (tx) => tx.query("select public.invite_student_by_code('ZZZZ-ZZZZ')"))).rejects.toThrow(/invalid_code/);
    const invited = await as(db, mamadou, async (tx) =>
      (await tx.query<{ r: { firstName: string } }>("select public.invite_student_by_code($1) as r", [student_code])).rows[0]!.r,
    );
    expect(invited.firstName).toBe("Fatou");

    // Avant l'accord : aucune note, aucun devoir.
    await expect(as(db, mamadou, (tx) => tx.query("select public.get_tutor_student($1)", [fatou.id]))).rejects.toThrow(/not_found/);
    await expect(
      as(db, mamadou, (tx) => tx.query("select public.create_tutor_assignment($1, 'Lire le son a', '')", [fatou.id])),
    ).rejects.toThrow(/not_your_student/);

    // Une élève mineure ne peut pas accepter seule ; un parent étranger non plus.
    await expect(as(db, fatou, (tx) => tx.query("select public.answer_tutor_invite($1, $2, true)", [mamadou.id, fatou.id]))).rejects.toThrow(/not_allowed/);
    await expect(as(db, stranger, (tx) => tx.query("select public.answer_tutor_invite($1, $2, true)", [mamadou.id, fatou.id]))).rejects.toThrow(/not_allowed/);
    const family = await as(db, aminata, async (tx) =>
      (await tx.query<{ r: { status: string; canAnswer: boolean; tutorName: string }[] }>("select public.get_family_tutor_links() as r")).rows[0]!.r,
    );
    expect(family).toEqual([expect.objectContaining({ status: "pending", canAnswer: true, tutorName: "Mamadou D." })]);
    await as(db, aminata, (tx) => tx.query("select public.answer_tutor_invite($1, $2, true)", [mamadou.id, fatou.id]));

    // Lien actif : le répétiteur voit le prénom, la classe et les notes, jamais la date de naissance.
    const view = await as(db, mamadou, async (tx) => (await tx.query<{ r: Record<string, unknown> }>("select public.get_tutor_student($1) as r", [fatou.id])).rows[0]!.r);
    expect(view).toMatchObject({ student: { name: "Fatou S.", levelCode: "CI" } });
    expect(JSON.stringify(view)).not.toMatch(/2019-05-01|birth/);
    await expect(as(db, newcomer, (tx) => tx.query("select public.get_tutor_student($1)", [fatou.id]))).rejects.toThrow(/not_found/);

    // Devoir : visible par l'élève et sa mère, coché par l'élève seulement.
    const assignment = await as(db, mamadou, async (tx) =>
      (await tx.query<{ id: string }>("select public.create_tutor_assignment($1, 'Lire le son a', 'Page 12') as id", [fatou.id])).rows[0]!.id,
    );
    await as(db, mamadou, (tx) => tx.query("select public.set_tutor_assignment_done($1, true)", [assignment]));
    expect((await one<{ done_at: string | null }>("select done_at from public.tutor_assignments where id = $1", [assignment])).done_at).toBeNull();
    await as(db, fatou, (tx) => tx.query("select public.set_tutor_assignment_done($1, true)", [assignment]));
    expect((await one<{ done_at: string | null }>("select done_at from public.tutor_assignments where id = $1", [assignment])).done_at).not.toBeNull();
    expect((await as(db, aminata, (tx) => tx.query("select id from public.tutor_assignments"))).rows).toHaveLength(1);
    expect((await as(db, stranger, (tx) => tx.query("select id from public.tutor_assignments"))).rows).toHaveLength(0);
    await expect(as(db, mamadou, (tx) => tx.query("insert into public.tutor_assignments (tutor_id, student_id, title) values ($1, $2, 'x')", [mamadou.id, ibou.id]))).rejects.toThrow(/permission denied/);

    // Cours en ligne : jamais dans le passé.
    await expect(
      as(db, mamadou, (tx) => tx.query("select public.schedule_tutor_session($1, now() - interval '1 hour', 60, 'Révisions')", [fatou.id])),
    ).rejects.toThrow(/session_in_past/);
    await as(db, mamadou, (tx) => tx.query("select public.schedule_tutor_session($1, now() + interval '2 days', 60, 'Les nombres de 0 à 10')", [fatou.id]));

    // Message : la mère est observatrice de la conversation.
    const conv = await as(db, mamadou, async (tx) => (await tx.query<{ id: string }>("select public.tutor_message_student($1, 'Bonjour Fatou') as id", [fatou.id])).rows[0]!.id);
    const members = await db.query<{ member_role: string }>("select member_role from public.conversation_members where conversation_id = $1 order by member_role", [conv]);
    expect(members.rows.map((m) => m.member_role)).toEqual(["observer", "student", "tutor"]);
    const notified = await db.query<{ type: string }>("select distinct type from public.notifications where user_id = $1 order by type", [aminata.id]);
    expect(notified.rows.map((n) => n.type)).toEqual(expect.arrayContaining(["tutor_assignment", "tutor_invite", "tutor_session"]));

    // Fin du suivi par la mère : plus d'accès aux notes, cours à venir annulés.
    await as(db, aminata, (tx) => tx.query("select public.end_tutor_link($1, $2)", [mamadou.id, fatou.id]));
    await expect(as(db, mamadou, (tx) => tx.query("select public.get_tutor_student($1)", [fatou.id]))).rejects.toThrow(/not_found/);
    expect((await one<{ n: number }>("select count(*)::int as n from public.tutor_sessions where student_id = $1 and status = 'planned'", [fatou.id])).n).toBe(0);
  });
});

describe("référentiel scolaire", () => {
  interface TrackingRow {
    level_code: string;
    chapters: number;
    lessons: number;
    lessons_written: number;
    sourced_chapters: number;
    free_chapters: number;
  }

  it("réserve le tableau de suivi à l'admin en double authentification", async () => {
    await expect(as(db, admin, (tx) => tx.query("select * from public.admin_content_tracking()"))).rejects.toThrow(/admins_only/);
    await expect(as(db, awa, (tx) => tx.query("select * from public.admin_content_tracking()"))).rejects.toThrow(/admins_only/);
    const rows = await as(db, adminMfa, async (tx) => (await tx.query<TrackingRow>("select * from public.admin_content_tracking()")).rows);
    const ci = rows.filter((r) => r.level_code === "CI");
    const sum = (pick: (r: TrackingRow) => number) => ci.reduce((total, r) => total + pick(r), 0);
    // Toutes les leçons du CI sont rédigées et tous ses chapitres ont une source.
    expect(sum((r) => r.chapters)).toBe(CHAPTERS_CI.length);
    expect(sum((r) => r.lessons_written)).toBe(CHAPTERS_CI.flatMap((c) => c.lessons).length);
    expect(sum((r) => r.sourced_chapters)).toBe(CHAPTERS_CI.length);
    expect(ci.every((r) => r.free_chapters === 3)).toBe(true);
  });

  it("garde un chapitre en brouillon invisible des élèves, et modifiable par l'admin seulement", async () => {
    const program = await one<{ id: number }>(
      `select p.id from public.programs p join public.levels l on l.id = p.level_id join public.subjects s on s.id = p.subject_id
       where l.code = 'CI' and s.code = 'MATH'`,
    );
    const insert = "insert into public.chapters (program_id, number, slug, title, sources) values ($1, 99, 'brouillon-test', 'Brouillon', $2::jsonb) returning id";
    const sources = JSON.stringify([{ title: "Guide pédagogique", kind: "official" }]);
    await expect(as(db, awa, (tx) => tx.query(insert, [program.id, sources]))).rejects.toThrow();
    await expect(as(db, admin, (tx) => tx.query(insert, [program.id, sources]))).rejects.toThrow();
    const draft = await as(db, adminMfa, async (tx) => (await tx.query<{ id: string }>(insert, [program.id, sources])).rows[0]!.id);

    const seen = await as(db, awa, async (tx) => (await tx.query("select id from public.chapters where id = $1", [draft])).rows.length);
    expect(seen).toBe(0);
    // Les sources sont toujours une liste.
    await expect(as(db, adminMfa, (tx) => tx.query("update public.chapters set sources = '{}'::jsonb where id = $1", [draft]))).rejects.toThrow();
    await as(db, adminMfa, (tx) => tx.query("delete from public.chapters where id = $1", [draft]));
  });
});

describe("Préparer mon prochain devoir et offre gratuite", () => {
  /** Un chapitre publié de la classe donnée, avec des questions, gratuit ou Premium. */
  const chapterWithQuestions = (level: string, premium: boolean) =>
    one<{ id: string }>(
      `select c.id from public.chapters c join public.programs p on p.id = c.program_id join public.levels l on l.id = p.level_id
       where l.code = $1 and exists (select 1 from public.questions q where q.chapter_id = c.id)
         and exists (select 1 from public.lessons le where le.chapter_id = c.id and le.is_premium = $2)
       order by c.number limit 1`,
      [level, premium],
    ).then((r) => r.id);

  it("compose une séance personnelle, invisible des autres et absente du catalogue", async () => {
    const chapter = await chapterWithQuestions("3E", false);
    const sessionId = await as(db, awa, async (tx) =>
      (await tx.query<{ id: string }>("select public.create_practice_session($1, 5, true) as id", [[chapter]])).rows[0]!.id,
    );
    const session = await one<{ owner_id: string; duration_s: number; kind: string; n: number }>(
      `select a.owner_id, a.duration_s, a.kind, (select count(*)::int from public.assessment_questions aq where aq.assessment_id = a.id) as n
       from public.assessments a where a.id = $1`,
      [sessionId],
    );
    expect(session.owner_id).toBe(awa.id);
    expect(session.kind).toBe("exercise");
    expect(session.n).toBeGreaterThan(0);
    expect(session.duration_s).toBe(Math.max(60, session.n * 90));

    // Ni un autre élève ni le catalogue public ne la voient ; seul Awa peut la lancer.
    const seenByIbou = await as(db, ibou, async (tx) => (await tx.query("select id from public.assessments where id = $1", [sessionId])).rows.length);
    expect(seenByIbou).toBe(0);
    const inCatalog = await as(db, ANON, async (tx) =>
      (await tx.query("select id from public.get_assessments_catalog() where id = $1", [sessionId])).rows.length,
    );
    expect(inCatalog).toBe(0);
    await expect(as(db, ibou, (tx) => tx.query("select public.start_attempt($1)", [sessionId]))).rejects.toThrow(/not_found/);
    const started = await as(db, awa, async (tx) =>
      (await tx.query<{ r: { questions: Record<string, unknown>[] } }>("select public.start_attempt($1) as r", [sessionId])).rows[0]!.r,
    );
    expect(started.questions).toHaveLength(session.n);
    expect(JSON.stringify(started)).not.toMatch(/correct_option|accepted_texts|numeric_value|explanation_html/);
  });

  it("refuse un chapitre Premium sans abonnement, une classe supérieure ou une demande invalide", async () => {
    const premium = await chapterWithQuestions("3E", true);
    // Une classe précédente (CI) est permise en révision ; une classe supérieure (2nde) ne l'est pas.
    const otherLevel = await chapterWithQuestions("2NDE", false);
    const free = await chapterWithQuestions("3E", false);
    await expect(as(db, ibou, (tx) => tx.query("select public.create_practice_session($1, 5, false)", [[premium]]))).rejects.toThrow(
      /premium_required/,
    );
    await expect(as(db, ibou, (tx) => tx.query("select public.create_practice_session($1, 5, false)", [[otherLevel]]))).rejects.toThrow(
      /invalid_chapters/,
    );
    await expect(as(db, ibou, (tx) => tx.query("select public.create_practice_session($1, 3, false)", [[free]]))).rejects.toThrow(
      /invalid_request/,
    );
    await expect(as(db, mariama, (tx) => tx.query("select public.create_practice_session($1, 5, false)", [[free]]))).rejects.toThrow(
      /students_only/,
    );
  });

  it("compte les questions de la banque par chapitre", async () => {
    const counts = await as(db, ANON, async (tx) =>
      (await tx.query<{ chapter_id: string; questions: number }>("select * from public.get_chapter_question_counts()")).rows,
    );
    const ciChapters = new Set(CHAPTERS_CI.map((c) => c.slug));
    const ci = await one<{ n: number }>(
      `select count(*)::int as n from public.questions q join public.chapters c on c.id = q.chapter_id
       join public.programs p on p.id = c.program_id join public.levels l on l.id = p.level_id where l.code = 'CI'`,
    );
    expect(ci.n).toBeGreaterThanOrEqual(CHAPTERS_CI.length * 3);
    expect(ciChapters.size).toBe(CHAPTERS_CI.length);
    expect(counts.reduce((sum, r) => sum + r.questions, 0)).toBeGreaterThanOrEqual(ci.n);
  });

  it("applique la règle des chapitres gratuits quand l'admin change leur nombre", async () => {
    const program = await one<{ id: number }>(
      `select p.id from public.programs p join public.levels l on l.id = p.level_id join public.subjects s on s.id = p.subject_id
       where l.code = 'CI' and s.code = 'MATH'`,
    );
    const premiumOfChapter4 = () =>
      one<{ premium: boolean }>(
        `select bool_and(le.is_premium) as premium from public.lessons le join public.chapters c on c.id = le.chapter_id
         where c.program_id = $1 and c.number = 4`,
        [program.id],
      ).then((r) => r.premium);
    expect(await premiumOfChapter4()).toBe(true);
    await expect(as(db, admin, (tx) => tx.query("update public.programs set free_chapters = 4 where id = $1", [program.id]))).resolves.toBeDefined();
    // Sans double authentification, la RLS ignore la mise à jour : rien ne change.
    expect(await premiumOfChapter4()).toBe(true);
    await as(db, adminMfa, (tx) => tx.query("update public.programs set free_chapters = 4 where id = $1", [program.id]));
    expect(await premiumOfChapter4()).toBe(false);
    await as(db, adminMfa, (tx) => tx.query("update public.programs set free_chapters = 3 where id = $1", [program.id]));
    expect(await premiumOfChapter4()).toBe(true);

    await expect(as(db, admin, (tx) => tx.query("select public.admin_set_free_tier(false)"))).rejects.toThrow(/admins_only/);
    await as(db, adminMfa, (tx) => tx.query("select public.admin_set_free_tier(false)"));
    await as(db, adminMfa, (tx) => tx.query("update public.programs set free_chapters = 5 where id = $1", [program.id]));
    // Règle désactivée : les accès restent en l'état.
    expect(await premiumOfChapter4()).toBe(true);
    await as(db, adminMfa, (tx) => tx.query("update public.programs set free_chapters = 3 where id = $1", [program.id]));
    await as(db, adminMfa, (tx) => tx.query("select public.admin_set_free_tier(true)"));
    expect(await premiumOfChapter4()).toBe(true);
  });
});

describe("examens : vérification et provenance des sujets", () => {
  it("publie la provenance des sujets et ne permet qu'à l'admin en double authentification de la modifier", async () => {
    const rows = await as(db, ANON, async (tx) =>
      (await tx.query<{ slug: string; kind: string; verification: string; sources: { kind: string }[]; correction_source: string | null }>(
        "select slug, kind, verification, sources, correction_source from public.get_assessments_catalog()",
      )).rows,
    );
    const mock = rows.find((r) => r.slug === "bfem-blanc-maths")!;
    expect(mock.kind).toBe("mock_exam");
    expect(mock.sources[0]?.kind).toBe("diangal");
    expect(mock.correction_source).toMatch(/DIANGAL/);
    // Aucune annale officielle non vérifiée dans la démo (l'espace Examens ne montre que les sujets vérifiés).
    expect(rows.filter((r) => r.kind === "past_paper" && r.verification === "unverified")).toHaveLength(0);

    const update = "update public.assessments set verification = 'official' where slug = 'bfem-blanc-maths' returning id";
    expect((await as(db, awa, (tx) => tx.query(update))).rows).toHaveLength(0);
    expect((await as(db, admin, (tx) => tx.query(update))).rows).toHaveLength(0);
    expect((await as(db, adminMfa, (tx) => tx.query(update))).rows).toHaveLength(1);
    await db.query("update public.assessments set verification = 'unverified' where slug = 'bfem-blanc-maths'");
  });
});

describe("passage en classe supérieure", () => {
  const classOf = (id: string) =>
    one<{ level: string; series: string | null }>(
      `select l.code as level, s.code as series from public.student_profiles sp join public.levels l on l.id = sp.level_id
       left join public.series s on s.id = sp.series_id where sp.user_id = $1`,
      [id],
    );

  it("passe l'élève en 2nde avec sa série, garde l'historique et refuse un inconnu", async () => {
    await expect(as(db, ibou, (tx) => tx.query("select public.promote_student($1)", [ibou.id]))).rejects.toThrow(/series_required/);
    // Un parent qui n'est pas relié à l'élève ne peut rien changer.
    const unlinked: Actor = {
      id: await createUser(db, { role: "parent", first_name: "Sans", last_name: "Lien" }, "221770000098"),
      role: "parent",
    };
    await expect(as(db, unlinked, (tx) => tx.query("select public.promote_student($1, 'S')", [ibou.id]))).rejects.toThrow(/forbidden/);
    await expect(as(db, awa, (tx) => tx.query("select public.promote_student($1, 'S')", [ibou.id]))).rejects.toThrow(/forbidden/);
    await as(db, ibou, (tx) => tx.query("select public.promote_student($1, 'S')", [ibou.id]));
    expect(await classOf(ibou.id!)).toEqual({ level: "2NDE", series: "S" });

    const history = await as(db, ibou, async (tx) =>
      (await tx.query<{ level: string }>(
        "select l.code as level from public.student_level_history h join public.levels l on l.id = h.level_id where h.student_id = $1",
        [ibou.id],
      )).rows,
    );
    expect(history.map((h) => h.level)).toEqual(["3E"]);
    const seenByOther = await as(db, awa, async (tx) => (await tx.query("select id from public.student_level_history where student_id = $1", [ibou.id])).rows);
    expect(seenByOther).toHaveLength(0);
    // Écriture directe interdite : seul promote_student modifie la classe.
    await expect(as(db, ibou, (tx) => tx.query("update public.student_profiles set level_id = 1 where user_id = $1", [ibou.id]))).rejects.toThrow();
  });

  it("garde la série en Terminale et s'arrête après la Terminale (fin de parcours)", async () => {
    await db.query(
      `update public.student_profiles set level_id = (select id from public.levels where code = '1RE'),
         series_id = (select id from public.series where code = 'S1') where user_id = $1`,
      [ibou.id],
    );
    await as(db, adminMfa, (tx) => tx.query("select public.promote_student($1)", [ibou.id]));
    expect(await classOf(ibou.id!)).toEqual({ level: "TLE", series: "S1" });
    await expect(as(db, ibou, (tx) => tx.query("select public.promote_student($1)", [ibou.id]))).rejects.toThrow(/end_of_track/);
  });
});

describe("offre Famille et connexion des enfants par code PIN", () => {
  it("couvre jusqu'à 4 enfants reliés avec un seul paiement, et un enfant relié ensuite", async () => {
    await db.query("update public.plans set is_active = true where max_children is not null");
    await expect(as(db, ibou, (tx) => tx.query("select public.create_payment_intent('family_monthly', null, 'wave')"))).rejects.toThrow(
      /family_requires_children/,
    );
    const family: Actor = {
      id: await createUser(db, { role: "parent", first_name: "Coumba", last_name: "Famille" }, "221770000071"),
      role: "parent",
    };
    const child = async (first: string, phone: string) => {
      const id = await createUser(db, { role: "student", first_name: first, last_name: "Famille", birth_date: "2016-02-02", level_code: "CI" }, phone);
      await db.query("insert into public.parent_links (parent_id, student_id, status, approved_at) values ($1, $2, 'active', now())", [family.id, id]);
      return id;
    };
    const kids = [await child("Un", "221770000072"), await child("Deux", "221770000073")];
    const intent = await as(db, family, async (tx) =>
      (await tx.query<{ r: { reference: string; amount_fcfa: number } }>("select public.create_payment_intent('family_monthly', null, 'wave') as r")).rows[0]!.r,
    );
    expect(intent.amount_fcfa).toBe(5000);
    await db.query("select public.apply_payment_event($1, 'PD-FAM-1', 'succeeded', 'wave')", [intent.reference]);
    const premium = async (id: string) =>
      (await as(db, { id, role: "student" }, async (tx) => (await tx.query<{ p: boolean }>("select private.has_premium($1) as p", [id])).rows[0]!.p));
    expect(await premium(kids[0]!)).toBe(true);
    expect(await premium(kids[1]!)).toBe(true);

    // Enfants reliés après le paiement : couverts tant qu'il reste une place (4 au plus).
    kids.push(await child("Trois", "221770000074"), await child("Quatre", "221770000075"), await child("Cinq", "221770000076"));
    expect(await premium(kids[2]!)).toBe(true);
    expect(await premium(kids[3]!)).toBe(true);
    expect(await premium(kids[4]!)).toBe(false);
  });

  it("connecte un enfant avec le code famille et son code PIN, avec blocage après 5 erreurs", async () => {
    const code = await as(db, mariama, async (tx) => (await tx.query<{ c: string }>("select public.get_my_family_code() as c")).rows[0]!.c);
    expect(code).toMatch(/^[A-Z2-9]{8}$/);
    await expect(as(db, stranger, (tx) => tx.query("select public.set_child_pin($1, '1234')", [awa.id]))).rejects.toThrow(/not_your_child/);
    await expect(as(db, mariama, (tx) => tx.query("select public.set_child_pin($1, '12')", [awa.id]))).rejects.toThrow(/invalid_pin/);
    await as(db, mariama, (tx) => tx.query("select public.set_child_pin($1, '2468')", [awa.id]));

    // Ces fonctions ne sont appelées que par le serveur (clé secrète) : ni visiteur ni élève.
    await expect(as(db, ANON, (tx) => tx.query("select * from public.get_family_children($1)", [code]))).rejects.toThrow();
    await expect(as(db, awa, (tx) => tx.query("select public.verify_child_pin($1, $2, '2468')", [code, awa.id]))).rejects.toThrow();

    const children = (await db.query<{ first_name: string }>("select * from public.get_family_children($1)", [code.toLowerCase()])).rows;
    expect(children.map((c) => c.first_name)).toContain("Awa");
    const verify = async (pin: string) => (await db.query<{ r: string }>("select public.verify_child_pin($1, $2, $3) as r", [code, awa.id, pin])).rows[0]!.r;
    expect(await verify("2468")).toBe("ok");
    expect(await verify("0000")).toBe("invalid");
    for (let i = 0; i < 3; i++) await verify("0000");
    expect(await verify("0000")).toBe("locked");
    expect(await verify("2468")).toBe("locked");
    expect((await db.query<{ r: string }>("select public.verify_child_pin('AAAAAAAA', $1, '2468') as r", [awa.id])).rows[0]!.r).toBe("invalid");
  });

  it("crée le profil d'un jeune enfant géré par son parent, validé d'office", async () => {
    const kid = await createUser(db, { role: "student", first_name: "Petit", last_name: "Ndiaye", birth_date: "2019-05-05", level_code: "CI" }, "221770000077");
    const code = (await db.query<{ c: string }>("select public.register_managed_child($1, $2, '1357') as c", [mariama.id, kid])).rows[0]!.c;
    expect(code).toMatch(/^[A-Z2-9]{8}$/);
    const state = await one<{ consent: string; link: string }>(
      `select sp.consent_status as consent, l.status as link from public.student_profiles sp
       join public.parent_links l on l.student_id = sp.user_id and l.parent_id = $1 where sp.user_id = $2`,
      [mariama.id, kid],
    );
    expect(state).toEqual({ consent: "granted", link: "active" });
    await expect(db.query("select public.register_managed_child($1, $2, '1357')", [mariama.id, kid])).rejects.toThrow(/invalid_child/);
    expect((await db.query<{ r: string }>("select public.verify_child_pin($1, $2, '1357') as r", [code, kid])).rows[0]!.r).toBe("ok");
  });
});
