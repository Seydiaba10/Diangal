import type { PGlite } from "@electric-sql/pglite";
import { beforeAll, describe, expect, it } from "vitest";
import { ANON, as, createTestDatabase, createUser, type Actor } from "./harness";

// Connexion par code PIN : blocage progressif, journal, vérification du mot de passe dérivé, nouvelle
// vérification avant une opération sensible, code PIN d'un enfant, appareils de la famille.

let db: PGlite;
const one = async <T>(sql: string, params: unknown[] = []) => (await db.query<T>(sql, params)).rows[0]!;
const hour = Math.floor(Date.now() / 1000) - 3600;
const parent = async (first: string, phone: string | null = null) => ({
  id: await createUser(db, { role: "parent", first_name: first, last_name: "Test" }, phone),
  role: "parent" as const,
});
const child = async (first: string, email: string | null = null) => ({
  id: await createUser(db, { role: "student", first_name: first, last_name: "Test", birth_date: "2016-03-14", level_code: "CM2" }, null, email),
  role: "student" as const,
});
type Status = { locked: boolean; retry_after: number; needs_recovery: boolean; failures: number };
const fail = (key: string) => one<Status>("select * from public.auth_guard_fail($1)", [key]);
const status = (key: string) => one<Status>("select * from public.auth_guard_status($1)", [key]);

beforeAll(async () => {
  db = await createTestDatabase();
});

describe("blocage progressif", () => {
  it("bloque 15 minutes à 5 erreurs, 1 heure à 10, puis exige la récupération à 15", async () => {
    const key = "phone:+221770000001";
    expect(await status(key)).toEqual({ locked: false, retry_after: 0, needs_recovery: false, failures: 0 });
    for (let i = 1; i < 5; i++) expect((await fail(key)).locked).toBe(false);
    const five = await fail(key);
    expect(five.locked).toBe(true);
    expect(five.retry_after).toBeGreaterThan(14 * 60);
    expect(five.retry_after).toBeLessThanOrEqual(15 * 60);
    for (let i = 6; i < 10; i++) await fail(key);
    const ten = await fail(key);
    expect(ten.retry_after).toBeGreaterThan(59 * 60);
    for (let i = 11; i < 15; i++) await fail(key);
    const fifteen = await fail(key);
    expect(fifteen).toMatchObject({ locked: true, needs_recovery: true, retry_after: 0, failures: 15 });
    // Seule la récupération (code reçu sur le téléphone) lève ce blocage.
    await db.query("select public.auth_guard_success($1)", [key]);
    await db.query("select public.auth_guard_clear($1)", [key]);
    expect(await status(key)).toMatchObject({ locked: false, failures: 0 });
  });

  it("oublie les erreurs d'un compte après une connexion réussie, pas celles de l'adresse IP", async () => {
    await fail("phone:+221770000002");
    await fail("ip:196.1.95.0");
    await db.query("select public.auth_guard_success($1)", ["phone:+221770000002"]);
    await db.query("select public.auth_guard_success($1)", ["ip:196.1.95.0"]);
    expect((await status("phone:+221770000002")).failures).toBe(0);
    expect((await status("ip:196.1.95.0")).failures).toBe(1);
  });

  it("bloque une adresse IP après 30 erreurs en 15 minutes, et repart de zéro après la fenêtre", async () => {
    const ip = "ip:41.82.0.0";
    for (let i = 1; i < 30; i++) expect((await fail(ip)).locked).toBe(false);
    expect((await fail(ip)).locked).toBe(true);
    await db.query("update private.auth_guard set window_start = now() - interval '16 minutes', locked_until = null where key = $1", [ip]);
    expect(await fail(ip)).toMatchObject({ locked: false, failures: 1 });
  });

  it("n'est accessible ni aux visiteurs ni aux comptes connectés", async () => {
    const someone = await parent("Curieux");
    await expect(as(db, ANON, (tx) => tx.query("select * from public.auth_guard_fail('phone:+221770000003')"))).rejects.toThrow(/permission denied/);
    await expect(as(db, someone, (tx) => tx.query("select * from public.auth_guard_status('phone:+221770000003')"))).rejects.toThrow(/permission denied/);
    await expect(as(db, someone, (tx) => tx.query("select * from private.auth_guard"))).rejects.toThrow(/permission denied/);
  });
});

describe("journal des connexions", () => {
  it("garde l'identifiant masqué, lisible par l'admin en double authentification seulement", async () => {
    const mariama = await parent("Mariama", "221770000010");
    await db.query("select public.auth_log_event($1, 'pin_login', '+221 77 ••• •• 10', '196.1.95.0', 'android')", [mariama.id]);
    await expect(db.query("select public.auth_log_event($1, 'inconnu')", [mariama.id])).rejects.toThrow(/auth_events_kind_check/);
    const admin = { id: await createUser(db, { role: "parent", first_name: "Admin", last_name: "X" }), role: "admin" as const };
    await db.query("update public.profiles set role = 'admin' where id = $1", [admin.id]);
    await expect(as(db, admin, (tx) => tx.query("select * from public.admin_auth_events()"))).rejects.toThrow(/admins_only/);
    const rows = await as(db, { ...admin, aal: "aal2" }, async (tx) =>
      (await tx.query<{ kind: string; first_name: string; subject: string }>("select kind, first_name, subject from public.admin_auth_events(10)")).rows,
    );
    expect(rows[0]).toEqual({ kind: "pin_login", first_name: "Mariama", subject: "+221 77 ••• •• 10" });
    await expect(as(db, mariama, (tx) => tx.query("select * from public.admin_auth_events()"))).rejects.toThrow(/admins_only/);
  });
});

describe("code PIN et mot de passe dérivé", () => {
  it("vérifie le mot de passe enregistré par Supabase Auth sans ouvrir de session", async () => {
    const awa = await parent("Awa", "221770000020");
    await db.query("update auth.users set encrypted_password = extensions.crypt('derive-123', extensions.gen_salt('bf', 6)) where id = $1", [awa.id]);
    expect((await one<{ ok: boolean }>("select public.verify_user_password($1, 'derive-123') as ok", [awa.id])).ok).toBe(true);
    expect((await one<{ ok: boolean }>("select public.verify_user_password($1, 'autre') as ok", [awa.id])).ok).toBe(false);
    expect((await one<{ ok: boolean }>("select public.verify_user_password($1, '') as ok", [awa.id])).ok).toBe(false);
    // Compte sans mot de passe (créé par code) ou supprimé : jamais vrai.
    const otp = await parent("Sans", "221770000021");
    expect((await one<{ ok: boolean }>("select public.verify_user_password($1, '') as ok", [otp.id])).ok).toBe(false);
    await db.query("update auth.users set deleted_at = now() where id = $1", [awa.id]);
    expect((await one<{ ok: boolean }>("select public.verify_user_password($1, 'derive-123') as ok", [awa.id])).ok).toBe(false);
    await expect(as(db, otp, (tx) => tx.query("select public.verify_user_password($1, 'x')", [awa.id]))).rejects.toThrow(/permission denied/);
  });

  it("note la date du code PIN, lisible par son seul titulaire", async () => {
    const binta = await parent("Binta", "221770000030");
    expect(await as(db, binta, async (tx) => (await tx.query<{ d: string | null }>("select public.get_my_pin_status() as d")).rows[0]!.d)).toBeNull();
    await db.query("select public.mark_pin_set($1, 'phone', 1::smallint)", [binta.id]);
    expect(await as(db, binta, async (tx) => (await tx.query<{ d: string | null }>("select public.get_my_pin_status() as d")).rows[0]!.d)).not.toBeNull();
    expect(await one("select kind, pepper_version from public.get_pin_credential($1)", [binta.id])).toEqual({ kind: "phone", pepper_version: 1 });
  });

  it("ferme toutes les sessions d'un compte", async () => {
    const coumba = await parent("Coumba", "221770000040");
    await db.query("insert into auth.sessions (user_id) values ($1), ($1)", [coumba.id]);
    expect((await one<{ n: number }>("select public.revoke_user_sessions($1) as n", [coumba.id])).n).toBe(2);
    expect((await one<{ n: number }>("select count(*)::int as n from auth.sessions where user_id = $1", [coumba.id])).n).toBe(0);
  });
});

describe("code PIN d'un enfant changé par son parent", () => {
  it("exige un enfant relié et une vérification récente, puis lève le blocage", async () => {
    const mother = await parent("Mariama", "221770000050");
    const moussa = await child("Moussa", "enfant-moussa@enfant.diangal.invalid");
    const code = (await one<{ c: string }>("select public.register_managed_child_v2($1, $2) as c", [mother.id, moussa.id])).c;
    expect(code).toMatch(/^[A-Z2-9]{8}$/);
    expect(await one("select pin_hash from private.child_logins where student_id = $1", [moussa.id])).toEqual({ pin_hash: null });
    for (let i = 0; i < 5; i++) await fail(`child:${moussa.id}`);
    const logins = async (actor: Actor) =>
      as(db, actor, async (tx) => (await tx.query<{ locked: boolean }>("select locked from public.get_my_child_logins()")).rows);
    expect(await logins(mother)).toEqual([{ locked: true }]);

    // Connexion vieille d'une heure, sans nouvelle vérification : refusé.
    const session = crypto.randomUUID();
    const old: Actor = { ...mother, loginAt: hour, sessionId: session };
    await expect(as(db, old, (tx) => tx.query("select public.authorize_child_pin_change($1)", [moussa.id]))).rejects.toThrow(/reauth_required/);
    // Code PIN du parent vérifié pour cette session : accepté.
    await db.query("select public.mark_reauth($1, $2)", [mother.id, session]);
    await as(db, old, (tx) => tx.query("select public.authorize_child_pin_change($1)", [moussa.id]));
    expect((await status(`child:${moussa.id}`)).failures).toBe(0);
    expect(await logins(mother)).toEqual([{ locked: false }]);
    // La marque ne vaut que pour sa session.
    await expect(
      as(db, { ...mother, loginAt: hour, sessionId: crypto.randomUUID() }, (tx) => tx.query("select public.authorize_child_pin_change($1)", [moussa.id])),
    ).rejects.toThrow(/reauth_required/);
    // Un autre parent ne touche pas au code de cet enfant.
    const stranger = await parent("Inconnue", "221770000051");
    await expect(as(db, stranger, (tx) => tx.query("select public.authorize_child_pin_change($1)", [moussa.id]))).rejects.toThrow(/not_your_child/);
    expect((await one<{ p: string }>("select public.child_login_parent($1) as p", [moussa.id])).p).toBe(mother.id);
  });
});

describe("appareils de la famille", () => {
  it("affiche les enfants sur un appareil ajouté par le parent, plus après son retrait", async () => {
    const father = await parent("Ibrahima", "221770000060");
    const fatou = await child("Fatou", "enfant-fatou@enfant.diangal.invalid");
    await db.query("select public.register_managed_child_v2($1, $2)", [father.id, fatou.id]);
    const token = "a".repeat(64);
    const old: Actor = { ...father, loginAt: hour };
    await expect(as(db, old, (tx) => tx.query("select public.register_family_device($1, 'Téléphone')", [token]))).rejects.toThrow(/reauth_required/);
    const id = await as(db, father, async (tx) => (await tx.query<{ id: string }>("select public.register_family_device($1, 'Téléphone') as id", [token])).rows[0]!.id);
    const kids = (await db.query<{ parent_first_name: string; first_name: string }>("select parent_first_name, first_name from public.family_device_children($1)", [token])).rows;
    expect(kids).toEqual([{ parent_first_name: "Ibrahima", first_name: "Fatou" }]);
    expect((await db.query("select * from public.family_device_children($1)", ["b".repeat(64)])).rows).toEqual([]);
    expect(await as(db, father, async (tx) => (await tx.query("select label from public.get_my_family_devices()")).rows)).toEqual([{ label: "Téléphone" }]);
    // Un autre parent ne peut pas retirer cet appareil.
    const other = await parent("Autre", "221770000061");
    await as(db, other, (tx) => tx.query("select public.revoke_family_device($1)", [id]));
    expect((await db.query("select * from public.family_device_children($1)", [token])).rows).toHaveLength(1);
    await as(db, father, (tx) => tx.query("select public.revoke_family_device($1)", [id]));
    expect((await db.query("select * from public.family_device_children($1)", [token])).rows).toEqual([]);
    await expect(as(db, ANON, (tx) => tx.query("select * from public.family_device_children($1)", [token]))).rejects.toThrow(/permission denied/);
  });

  it("refuse un jeton mal formé et plus de 10 appareils", async () => {
    const mother = await parent("Ndeye", "221770000070");
    await expect(as(db, mother, (tx) => tx.query("select public.register_family_device('court', 'X')"))).rejects.toThrow(/family_devices_token_hash_check/);
    for (let i = 0; i < 10; i++) {
      await as(db, mother, (tx) => tx.query("select public.register_family_device($1, 'Appareil')", [i.toString(16).padStart(64, "0")]));
    }
    await expect(as(db, mother, (tx) => tx.query("select public.register_family_device($1, 'Un de trop')", ["f".repeat(64)]))).rejects.toThrow(/too_many_devices/);
  });
});
