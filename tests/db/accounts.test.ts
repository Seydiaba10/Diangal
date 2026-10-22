import type { PGlite } from "@electric-sql/pglite";
import { beforeAll, describe, expect, it } from "vitest";
import { as, createTestDatabase, createUser, type Actor } from "./harness";

// Comptes : numéros internationaux, suppression et anonymisation (loi n° 2008-12, CDP).

let db: PGlite;
const one = async <T>(sql: string, params: unknown[] = []) => (await db.query<T>(sql, params)).rows[0]!;
/** Connexion vieille d'une heure : la suppression exige une connexion récente. */
const stale = (actor: Actor): Actor => ({ ...actor, loginAt: Math.floor(Date.now() / 1000) - 3600 });

const student = async (first: string, birth: string, phone: string | null = null, email: string | null = null) => ({
  id: await createUser(db, { role: "student", first_name: first, last_name: "Test", birth_date: birth, level_code: "3E" }, phone, email),
  role: "student" as const,
});
const parent = async (first: string, phone: string | null = null) => ({
  id: await createUser(db, { role: "parent", first_name: first, last_name: "Test" }, phone),
  role: "parent" as const,
});
const link = (p: Actor, s: Actor) =>
  db.query("insert into public.parent_links (parent_id, student_id, status, approved_at) values ($1, $2, 'active', now())", [p.id, s.id]);
const status = async (actor: Actor, target?: Actor) =>
  as(db, actor, async (tx) =>
    (await tx.query<{ s: { mode: string; recentLogin: boolean; pendingRequest: unknown; managedChildren: { firstName: string }[] } }>(
      "select public.get_account_deletion_status($1) as s",
      [target?.id ?? null],
    )).rows[0]!.s,
  );

beforeAll(async () => {
  db = await createTestDatabase();
});

describe("numéros de téléphone", () => {
  it("accepte un numéro international au format E.164 et refuse un numéro mal formé", async () => {
    const diaspora = await parent("Diaspora", "33612345678");
    expect((await one<{ phone: string }>("select phone from public.profiles where id = $1", [diaspora.id])).phone).toBe("+33612345678");
    await expect(createUser(db, { role: "parent", first_name: "Faux", last_name: "X" }, "12")).rejects.toThrow(/profiles_phone_check/);
  });
});

describe("suppression de compte", () => {
  it("anonymise un élève majeur, garde ses paiements, et exige une connexion récente", async () => {
    const lamine = await student("Lamine", "2005-01-01", "221780000101");
    const mother = await parent("Maman", "221780000102");
    await link(mother, lamine);
    const lesson = await one<{ id: string }>(
      "select l.id from public.lessons l join public.chapters c on c.id = l.chapter_id where c.slug = 'racine-carree' and not l.is_premium order by l.number limit 1",
    );
    await as(db, lamine, (tx) => tx.query("select public.complete_lesson($1)", [lesson.id]));
    const intent = await as(db, lamine, async (tx) =>
      (await tx.query<{ r: { reference: string } }>("select public.create_payment_intent('monthly', $1, 'wave') as r", [lamine.id])).rows[0]!.r,
    );
    await db.query("select public.apply_payment_event($1, 'del-1', 'succeeded', 'wave')", [intent.reference]);

    expect((await status(lamine)).mode).toBe("direct");
    await expect(as(db, stale(lamine), (tx) => tx.query("select public.delete_account($1)", [lamine.id]))).rejects.toThrow(/reauth_required/);
    // Un inconnu ne voit ni ne supprime le compte d'un autre.
    const stranger = await parent("Inconnu");
    await expect(status(stranger, lamine)).rejects.toThrow(/not_allowed/);
    await expect(as(db, stranger, (tx) => tx.query("select public.delete_account($1)", [lamine.id]))).rejects.toThrow(/not_allowed/);

    await as(db, lamine, (tx) => tx.query("select public.delete_account($1)", [lamine.id]));
    const profile = await one<{ first_name: string; phone: string | null; deleted: boolean }>(
      "select first_name, phone, deleted_at is not null as deleted from public.profiles where id = $1",
      [lamine.id],
    );
    expect(profile).toEqual({ first_name: "Compte", phone: null, deleted: true });
    const counts = await one<{ progress: number; payments: number; subs: number; links: number }>(
      `select (select count(*)::int from public.lesson_progress where user_id = $1) as progress,
              (select count(*)::int from public.payments where payer_id = $1) as payments,
              (select count(*)::int from public.subscriptions where student_id = $1) as subs,
              (select count(*)::int from public.parent_links where student_id = $1 and status = 'active') as links`,
      [lamine.id],
    );
    expect(counts).toEqual({ progress: 0, payments: 1, subs: 1, links: 0 });
    // Le jeton d'un compte supprimé ne porte plus de rôle.
    const hook = await one<{ r: { claims: { user_role: string | null } } }>(
      "select public.custom_access_token_hook(jsonb_build_object('user_id', $1::text, 'claims', '{}'::jsonb)) as r",
      [lamine.id],
    );
    expect(hook.r.claims.user_role).toBeNull();
    expect((await one<{ ok: boolean }>("select public.is_account_anonymized($1) as ok", [lamine.id])).ok).toBe(true);
    await expect(as(db, lamine, (tx) => tx.query("select public.delete_account($1)", [lamine.id]))).rejects.toThrow(/not_found/);
  });

  it("fait valider par le parent la suppression du compte d'un élève mineur", async () => {
    const binta = await student("Binta", "2013-04-04", "221780000111");
    const father = await parent("Papa", "221780000112");
    await link(father, binta);

    expect((await status(binta)).mode).toBe("parent_approval");
    await expect(as(db, binta, (tx) => tx.query("select public.delete_account($1)", [binta.id]))).rejects.toThrow(/parent_approval/);
    await as(db, binta, (tx) => tx.query("select public.request_account_deletion()"));
    await as(db, binta, (tx) => tx.query("select public.request_account_deletion()"));
    expect((await one<{ n: number }>("select count(*)::int as n from public.account_deletion_requests where student_id = $1", [binta.id])).n).toBe(1);
    const notice = await one<{ type: string; link: string }>("select type, link from public.notifications where user_id = $1", [father.id]);
    expect(notice).toEqual({ type: "account_deletion_request", link: `/compte/suppression?enfant=${binta.id}` });

    // Refus : l'élève est prévenu, son compte reste.
    await as(db, father, (tx) => tx.query("select public.answer_account_deletion_request($1, false)", [binta.id]));
    expect((await one<{ type: string }>("select type from public.notifications where user_id = $1", [binta.id])).type).toBe("account_deletion_refused");

    // Nouvelle demande, acceptée : connexion récente du parent exigée.
    await as(db, binta, (tx) => tx.query("select public.request_account_deletion()"));
    expect((await status(father, binta)).pendingRequest).not.toBeNull();
    await expect(
      as(db, stale(father), (tx) => tx.query("select public.answer_account_deletion_request($1, true)", [binta.id])),
    ).rejects.toThrow(/reauth_required/);
    await as(db, father, (tx) => tx.query("select public.answer_account_deletion_request($1, true)", [binta.id]));
    expect((await one<{ deleted: boolean }>("select deleted_at is not null as deleted from public.profiles where id = $1", [binta.id])).deleted).toBe(true);
    // Le parent garde son propre compte.
    expect((await one<{ deleted: boolean }>("select deleted_at is not null as deleted from public.profiles where id = $1", [father.id])).deleted).toBe(false);
  });

  it("bloque le parent qui gère encore des profils d'enfants, sans rien supprimer à sa place", async () => {
    const coumba = await parent("Coumba", "221780000121");
    const managed = await student("Petit", "2019-05-05", null, "enfant-test@enfant.diangal.invalid");
    await db.query("select public.register_managed_child($1, $2, '1357')", [coumba.id, managed.id]);
    const teen = await student("Ado", "2012-02-02", "221780000122");
    await link(coumba, teen);
    await db.query("update public.student_profiles set consent_status = 'granted' where user_id = $1", [teen.id]);

    const before = await status(coumba);
    expect(before.mode).toBe("blocked_managed_children");
    expect(before.managedChildren.map((c) => c.firstName)).toEqual(["Petit"]);
    await expect(as(db, coumba, (tx) => tx.query("select public.delete_account($1)", [coumba.id]))).rejects.toThrow(
      /blocked_managed_children/,
    );

    // Le parent supprime d'abord le profil de l'enfant (mineur relié), puis son compte.
    expect((await status(coumba, managed)).mode).toBe("direct");
    await as(db, coumba, (tx) => tx.query("select public.delete_account($1)", [managed.id]));
    expect((await status(coumba)).mode).toBe("direct");
    await as(db, coumba, (tx) => tx.query("select public.delete_account($1)", [coumba.id]));

    // L'adolescent garde son compte, mais repasse en attente de validation parentale.
    const teenState = await one<{ deleted: boolean; consent: string }>(
      `select p.deleted_at is not null as deleted, s.consent_status as consent
       from public.profiles p join public.student_profiles s on s.user_id = p.id where p.id = $1`,
      [teen.id],
    );
    expect(teenState).toEqual({ deleted: false, consent: "pending" });
  });

  it("refuse qu'un parent supprime le compte d'un enfant majeur, et qu'un admin se supprime", async () => {
    const adult = await student("Majeur", "2004-06-06", "221780000131");
    const mum = await parent("Mère", "221780000132");
    await link(mum, adult);
    expect((await status(mum, adult)).mode).toBe("not_allowed");
    await expect(as(db, mum, (tx) => tx.query("select public.delete_account($1)", [adult.id]))).rejects.toThrow(/not_allowed/);

    const adminId = await createUser(db, { role: "parent", first_name: "Admin", last_name: "X" });
    await db.query("update public.profiles set role = 'admin' where id = $1", [adminId]);
    const admin: Actor = { id: adminId, role: "admin", aal: "aal2" };
    expect((await status(admin)).mode).toBe("blocked_admin");
  });

  it("retire un répétiteur de l'annuaire et met fin à ses suivis", async () => {
    const tutor: Actor = { id: await createUser(db, { role: "tutor", first_name: "Prof", last_name: "Test" }, "221780000141"), role: "tutor" };
    await db.query(
      `update public.tutor_profiles set status = 'approved', headline = 'Maths', hourly_rate_fcfa = 4000,
         city_id = (select id from public.cities where slug = 'dakar') where user_id = $1`,
      [tutor.id],
    );
    const pupil = await student("Élève", "2005-03-03", "221780000142");
    await db.query("insert into public.tutor_students (tutor_id, student_id, status) values ($1, $2, 'active')", [tutor.id, pupil.id]);

    await as(db, tutor, (tx) => tx.query("select public.delete_account($1)", [tutor.id]));
    const state = await one<{ status: string; headline: string; link: string }>(
      `select t.status, t.headline, ts.status as link from public.tutor_profiles t
       join public.tutor_students ts on ts.tutor_id = t.user_id where t.user_id = $1`,
      [tutor.id],
    );
    expect(state).toEqual({ status: "suspended", headline: "", link: "revoked" });
  });

  it("recopie dans le profil un numéro ajouté depuis « Mon compte »", async () => {
    const parentNoPhone = await parent("SansNumero");
    await db.query("update auth.users set phone = '221780000151' where id = $1", [parentNoPhone.id]);
    await as(db, parentNoPhone, (tx) => tx.query("select public.sync_my_contact()"));
    expect((await one<{ phone: string }>("select phone from public.profiles where id = $1", [parentNoPhone.id])).phone).toBe("+221780000151");
  });
});
