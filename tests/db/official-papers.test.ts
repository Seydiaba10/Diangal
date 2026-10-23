import type { PGlite } from "@electric-sql/pglite";
import { beforeAll, describe, expect, it } from "vitest";
import { OFFICIAL_PAPERS } from "@/mocks/official-papers";
import { ANON, as, createTestDatabase, createUser, type Actor } from "./harness";

// Sujets et corrigés officiels du Bac : liens publics vers l'Office du Bac, jamais modifiables par un client.

let db: PGlite;
let student: Actor;

beforeAll(async () => {
  db = await createTestDatabase();
  student = {
    id: await createUser(db, { role: "student", first_name: "Bac", last_name: "Test", birth_date: "2007-01-01", level_code: "TLE" }),
    role: "student",
  };
});

describe("sujets et corrigés officiels du Bac", () => {
  it("se lisent sans compte et correspondent aux données de démonstration", async () => {
    const rows = await as(db, ANON, async (tx) => (await tx.query<{ n: number }>("select count(*)::int as n from public.official_papers")).rows[0]!);
    expect(rows.n).toBe(OFFICIAL_PAPERS.length);
  });

  it("refusent toute écriture d'un élève et tout lien hors du site officiel", async () => {
    await expect(
      as(db, student, (tx) =>
        tx.query(
          `insert into public.official_papers (year, kind, subject_label, title, url, source_page, checked_on)
           values (2026, 'epreuve', 'Maths', 'Faux', 'https://officedubac.sn/wp-content/uploads/faux.pdf', 'https://officedubac.sn/', current_date)`,
        ),
      ),
    ).rejects.toThrow(/row-level security|permission denied/);
    // Suppression refusée (droits) ou sans effet (RLS) selon les privilèges par défaut : rien ne disparaît.
    await as(db, student, (tx) => tx.query("delete from public.official_papers")).catch(() => undefined);
    expect((await db.query<{ n: number }>("select count(*)::int as n from public.official_papers")).rows[0]!.n).toBe(OFFICIAL_PAPERS.length);
    await expect(
      db.query(
        `insert into public.official_papers (year, kind, subject_label, title, url, source_page, checked_on)
         values (2026, 'epreuve', 'Maths', 'Ailleurs', 'https://exemple.com/sujet.pdf', 'https://officedubac.sn/', current_date)`,
      ),
    ).rejects.toThrow(/official_papers_url_check/);
  });
});
