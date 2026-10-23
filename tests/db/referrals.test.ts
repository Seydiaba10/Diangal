import type { PGlite } from "@electric-sql/pglite";
import { beforeAll, describe, expect, it } from "vitest";
import { ANON, as, createTestDatabase, createUser, type Actor } from "./harness";

// Parrainage : jamais de récompense à la saisie du code, seulement après un paiement confirmé ;
// anti-fraude (soi-même, famille, paiement par le parrain), période de garde, remboursement.

let db: PGlite;
let referrer: Actor;
let referrerChild: Actor;
let admin: Actor;
const one = async <T>(sql: string, params: unknown[] = []) => (await db.query<T>(sql, params)).rows[0]!;

const parent = async (first: string): Promise<Actor> => ({
  id: await createUser(db, { role: "parent", first_name: first, last_name: "Test" }),
  role: "parent",
});
const child = async (of: Actor, first: string): Promise<Actor> => {
  const id = await createUser(db, { role: "student", first_name: first, last_name: "Test", birth_date: "2013-01-01", level_code: "3E" });
  await db.query("insert into public.parent_links (parent_id, student_id, status, approved_at) values ($1, $2, 'active', now())", [of.id, id]);
  return { id, role: "student" };
};
const referral = (actor: Actor) =>
  as(db, actor, async (tx) => (await tx.query<{ r: Record<string, unknown> }>("select public.get_my_referral() as r")).rows[0]!.r);
const claim = (actor: Actor, code: string) =>
  as(db, actor, async (tx) => (await tx.query<{ r: string }>("select public.claim_referral($1) as r", [code])).rows[0]!.r);
/** Paiement mensuel d'un parent pour son enfant, confirmé par le webhook. */
const pay = async (payer: Actor, beneficiary: Actor, plan = "monthly") => {
  const intent = await as(db, payer, async (tx) =>
    (await tx.query<{ r: { reference: string } }>("select public.create_payment_intent($1, $2, 'wave') as r", [plan, beneficiary.id])).rows[0]!.r,
  );
  await db.query("select public.apply_payment_event($1, $2, 'succeeded', 'wave')", [intent.reference, `pd-${intent.reference}`]);
  return intent.reference;
};
const status = async (referee: Actor) =>
  one<{ status: string; reason: string | null }>("select status, reason from public.referrals where referee_id = $1", [referee.id]);

beforeAll(async () => {
  db = await createTestDatabase();
  referrer = await parent("Parrain");
  referrerChild = await child(referrer, "Enfant");
  const adminId = await createUser(db, { role: "parent", first_name: "Admin", last_name: "X" });
  await db.query("update public.profiles set role = 'admin' where id = $1", [adminId]);
  admin = { id: adminId, role: "admin", aal: "aal2" };
});

describe("parrainage", () => {
  it("reste fermé tant que l'admin ne l'ouvre pas, et seul l'admin en double authentification règle le scénario", async () => {
    expect((await referral(referrer)).enabled).toBe(false);
    await expect(
      as(db, { ...admin, aal: "aal1" }, (tx) => tx.query("select public.admin_set_referral_settings(true, 'intermediaire')")),
    ).rejects.toThrow(/admins_only/);
    await expect(as(db, referrer, (tx) => tx.query("select public.admin_set_referral_settings(true, 'genereux')"))).rejects.toThrow(
      /admins_only/,
    );
    await as(db, admin, (tx) => tx.query("select public.admin_set_referral_settings(true, 'intermediaire')"));
    const mine = await referral(referrer);
    expect(mine.enabled).toBe(true);
    expect(mine.code).toMatch(/^[A-HJ-NP-Z2-9]{10}$/);
    expect((mine.settings as { referrer_days: number }).referrer_days).toBe(30);
  });

  it("ne donne rien à la saisie du code, récompense après un vrai paiement, avec une période de garde", async () => {
    const code = (await referral(referrer)).code as string;
    const newcomer = await parent("Filleul");
    const kid = await child(newcomer, "Kid");
    expect(await claim(referrer, code)).toBe("invalid"); // son propre code
    expect(await claim(newcomer, "AAAAAAAAAA")).toBe("invalid");
    expect(await claim(newcomer, code.toLowerCase().replace(/(.{5})/, "$1-"))).toBe("ok");
    expect(await claim(newcomer, code)).toBe("invalid"); // un seul parrain
    expect((await one<{ n: number }>("select count(*)::int as n from public.referral_rewards")).n).toBe(0);
    expect(await status(newcomer)).toEqual({ status: "pending", reason: null });

    await pay(newcomer, kid);
    expect(await status(newcomer)).toEqual({ status: "rewarded", reason: null });
    const rewards = (await db.query<{ kind: string; days: number; status: string; hold: boolean }>(
      "select kind, days, status, available_at > now() as hold from public.referral_rewards order by kind",
    )).rows;
    expect(rewards).toEqual([
      { kind: "referee", days: 15, status: "pending", hold: true },
      { kind: "referrer", days: 30, status: "pending", hold: true },
    ]);
    // Pendant la garde, les jours ne sont pas utilisables.
    await expect(as(db, referrer, (tx) => tx.query("select public.use_referral_days($1)", [referrerChild.id]))).rejects.toThrow(/no_days/);
    // Un autre compte ne voit pas ces récompenses.
    const stranger = await parent("Curieux");
    expect((await as(db, stranger, (tx) => tx.query("select * from public.referral_rewards"))).rows).toHaveLength(0);
    await expect(as(db, ANON, (tx) => tx.query("select public.get_my_referral()"))).rejects.toThrow();

    // Fin de la garde : le parrain offre ses 30 jours à son enfant (pas à un enfant d'une autre famille).
    await db.query("update public.referral_rewards set available_at = now() - interval '1 day'");
    await expect(as(db, referrer, (tx) => tx.query("select public.use_referral_days($1)", [kid.id]))).rejects.toThrow(/not_allowed/);
    const days = await as(db, referrer, async (tx) => (await tx.query<{ d: number }>("select public.use_referral_days($1) as d", [referrerChild.id])).rows[0]!.d);
    expect(days).toBe(30);
    const sub = await one<{ n: number; days: number }>(
      `select count(*)::int as n, max(extract(day from ends_at - starts_at))::int as days
       from public.subscriptions s join public.plans p on p.id = s.plan_id where p.code = 'referral_bonus' and s.student_id = $1`,
      [referrerChild.id],
    );
    expect(sub).toEqual({ n: 1, days: 30 });
    expect((await referral(referrer)).daysUsed).toBe(30);
  });

  it("annule un parrainage dans la même famille ou payé par le parrain", async () => {
    const code = (await referral(referrer)).code as string;
    // L'enfant du parrain se parraine « lui-même » : le parrain paie, donc annulation.
    const ownKid = await child(referrer, "Cadet");
    expect(await claim(ownKid, code)).toBe("ok");
    await pay(referrer, ownKid);
    expect(await status(ownKid)).toEqual({ status: "cancelled", reason: "self_payment" });

    // Co-parent : un autre parent du même enfant.
    const coParent = await parent("CoParent");
    await db.query("insert into public.parent_links (parent_id, student_id, status, approved_at) values ($1, $2, 'active', now())", [
      coParent.id,
      referrerChild.id,
    ]);
    expect(await claim(coParent, code)).toBe("ok");
    await pay(coParent, referrerChild);
    expect(await status(coParent)).toEqual({ status: "cancelled", reason: "family" });
    expect((await one<{ n: number }>("select count(*)::int as n from public.referral_rewards where kind = 'referrer'")).n).toBe(1);
  });

  it("retire les jours en garde quand l'admin rembourse le paiement, et ignore un webhook rejoué", async () => {
    const code = (await referral(referrer)).code as string;
    const late = await parent("Rembourse");
    const kid = await child(late, "Petit");
    expect(await claim(late, code)).toBe("ok");
    const reference = await pay(late, kid);
    expect(await status(late)).toEqual({ status: "rewarded", reason: null });

    await expect(as(db, late, (tx) => tx.query("select public.admin_refund_payment($1, 'test')", [reference]))).rejects.toThrow(/admins_only/);
    const result = await as(db, admin, async (tx) =>
      (await tx.query<{ r: { rewardsRevoked: number } }>("select public.admin_refund_payment($1, 'erreur de paiement') as r", [reference])).rows[0]!.r,
    );
    expect(result.rewardsRevoked).toBe(2);
    expect(await status(late)).toEqual({ status: "cancelled", reason: "refund" });
    const state = await one<{ payment: string; subs: number }>(
      `select (select status::text from public.payments where reference = $1) as payment,
              (select count(*)::int from public.subscriptions s join public.payments p on p.id = s.payment_id
               where p.reference = $1 and s.status = 'active') as subs`,
      [reference],
    );
    expect(state).toEqual({ payment: "refunded", subs: 0 });
    const replay = await one<{ r: { already_applied: boolean } }>("select public.apply_payment_event($1, 'pd-x', 'succeeded', 'wave') as r", [
      reference,
    ]);
    expect(replay.r.already_applied).toBe(true);
    expect(await status(late)).toEqual({ status: "cancelled", reason: "refund" });
  });

  it("refuse un code saisi longtemps après l'inscription et ferme le code d'un compte supprimé", async () => {
    const code = (await referral(referrer)).code as string;
    const old = await parent("Ancien");
    await db.query("update public.profiles set created_at = now() - interval '30 days' where id = $1", [old.id]);
    expect(await claim(old, code)).toBe("invalid");

    const leaving = await parent("Partant");
    const leavingCode = (await referral(leaving)).code as string;
    await db.query("update public.profiles set deleted_at = now() where id = $1", [leaving.id]);
    const newcomer = await parent("Nouveau");
    expect(await claim(newcomer, leavingCode)).toBe("invalid");
  });
});
