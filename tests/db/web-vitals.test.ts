import type { PGlite } from "@electric-sql/pglite";
import { beforeAll, describe, expect, it } from "vitest";
import { as, createTestDatabase, createUser, type Actor } from "./harness";

// Vitesse réelle des pages : seul le serveur (clé secrète) enregistre les mesures, seul l'admin en double
// authentification les lit, et les mesures invalides sont refusées par la table.

describe("vitesse réelle des pages (base)", () => {
  let db: PGlite;
  let student: Actor;
  let admin: Actor;

  beforeAll(async () => {
    db = await createTestDatabase();
    student = { id: await createUser(db, { role: "student", first_name: "Awa", last_name: "Test", birth_date: "2006-01-15", level_code: "3E" }), role: "student" };
    const adminId = await createUser(db, { role: "parent", first_name: "Admin", last_name: "X" });
    await db.query("update public.profiles set role = 'admin' where id = $1", [adminId]);
    admin = { id: adminId, role: "admin", aal: "aal2" };
  });

  const record = (rows: unknown) =>
    db.transaction(async (tx) => {
      await tx.exec("set local role service_role");
      return (await tx.query<{ n: number }>("select public.record_web_vitals($1::jsonb) as n", [JSON.stringify(rows)])).rows[0]!.n;
    });

  it("le serveur enregistre un lot, au plus 20 mesures ; un élève ou un visiteur ne peut pas", async () => {
    const lcp = [1000, 2000, 3000, 4000, 5000].map((value) => ({ metric: "LCP", value, rating: value <= 2500 ? "good" : "poor", page: "/eleve", connection: value > 3000 ? "3g" : "4g" }));
    expect(await record(lcp)).toBe(5);
    expect(await record(Array.from({ length: 30 }, () => ({ metric: "CLS", value: 0.02, rating: "good", page: "/" })))).toBe(20);
    expect(await record({ not: "an array" })).toBe(0);
    await expect(as(db, student, (tx) => tx.query("select public.record_web_vitals('[]'::jsonb)"))).rejects.toThrow(/permission denied/);
    await expect(as(db, { id: null, role: null }, (tx) => tx.query("select public.record_web_vitals('[]'::jsonb)"))).rejects.toThrow(/permission denied/);
  });

  it("refuse une mesure inconnue ou une valeur négative", async () => {
    await expect(record([{ metric: "FID", value: 10, rating: "good", page: "/" }])).rejects.toThrow(/check/);
    await expect(record([{ metric: "LCP", value: -1, rating: "good", page: "/" }])).rejects.toThrow(/check/);
  });

  it("l'admin en double authentification lit le 75e centile, pour tout le site et par page ; personne d'autre", async () => {
    const rows = await as(db, admin, async (tx) =>
      (await tx.query<{ metric: string; page: string; samples: string; p75: number; good_pct: string; slow_network_pct: string }>("select * from public.admin_web_vitals(7)")).rows,
    );
    const site = rows.find((r) => r.metric === "LCP" && r.page === "*")!;
    expect(Number(site.samples)).toBe(5);
    expect(site.p75).toBe(4000);
    expect(Number(site.good_pct)).toBe(40);
    expect(Number(site.slow_network_pct)).toBe(40);
    expect(rows.some((r) => r.metric === "LCP" && r.page === "/eleve")).toBe(true);
    await expect(as(db, student, (tx) => tx.query("select * from public.admin_web_vitals(7)"))).rejects.toThrow(/admins_only/);
    await expect(as(db, { ...admin, aal: "aal1" }, (tx) => tx.query("select * from public.admin_web_vitals(7)"))).rejects.toThrow(/admins_only/);
  });
});
