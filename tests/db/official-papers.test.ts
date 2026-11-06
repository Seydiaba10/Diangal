import type { PGlite } from "@electric-sql/pglite";
import { beforeAll, describe, expect, it } from "vitest";
import { OFFICIAL_PAPERS } from "@/mocks/official-papers";
import { OFFICIAL_PAPERS_CFEE } from "@/mocks/official-papers-cfee";
import { ANON, as, createTestDatabase, createUser, type Actor } from "./harness";

// Sujets et corrigés officiels : liens publics vers l'Office du Bac et copies du CFEE, jamais modifiables par un client.

const TOTAL = OFFICIAL_PAPERS.length + OFFICIAL_PAPERS_CFEE.length;
const STORAGE_URL = "https://mlepbueoqrzmniksdhpl.supabase.co/storage/v1/object/public/content-free/annales/cfee/essai.pdf";
const CFEE_PAGE = "https://epreuvesetcorriges.com/categories/senegal/examens/cep/essai";

let db: PGlite;
let student: Actor;

beforeAll(async () => {
  db = await createTestDatabase();
  student = {
    id: await createUser(db, { role: "student", first_name: "Bac", last_name: "Test", birth_date: "2007-01-01", level_code: "TLE" }),
    role: "student",
  };
});

describe("sujets et corrigés officiels", () => {
  it("se lisent sans compte et correspondent aux données de démonstration", async () => {
    const rows = await as(db, ANON, async (tx) => (await tx.query<{ n: number }>("select count(*)::int as n from public.official_papers")).rows[0]!);
    expect(rows.n).toBe(TOTAL);
    const cfee = await as(db, ANON, async (tx) => (await tx.query<{ n: number }>("select count(*)::int as n from public.official_papers where exam_type = 'CFEE'")).rows[0]!);
    expect(cfee.n).toBe(OFFICIAL_PAPERS_CFEE.length);
  });

  it("n'acceptent pour le CFEE que le Storage du projet, et pour le Bac que l'Office du Bac", async () => {
    const insert = (exam: string, url: string, page: string) =>
      db.query(
        `insert into public.official_papers (exam_type, year, kind, subject_label, title, url, source_page, checked_on)
         values ('${exam}', 2025, 'epreuve', 'Essai', 'Essai', '${url}', '${page}', current_date)`,
      );
    await expect(insert("BAC", STORAGE_URL, CFEE_PAGE)).rejects.toThrow(/official_papers_url_check/);
    await expect(insert("CFEE", "https://examen.sn/sujet.pdf", CFEE_PAGE)).rejects.toThrow(/official_papers_url_check/);
    await expect(insert("BFEM", STORAGE_URL, CFEE_PAGE)).rejects.toThrow(/official_papers_url_check/);
    await expect(insert("CFEE", STORAGE_URL, "https://examen.sn/")).rejects.toThrow(/official_papers_source_page_check/);
    await expect(insert("CFEE", STORAGE_URL, CFEE_PAGE)).resolves.toBeDefined();
    await db.query("delete from public.official_papers where url = $1", [STORAGE_URL]);
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
    expect((await db.query<{ n: number }>("select count(*)::int as n from public.official_papers")).rows[0]!.n).toBe(TOTAL);
    await expect(
      db.query(
        `insert into public.official_papers (year, kind, subject_label, title, url, source_page, checked_on)
         values (2026, 'epreuve', 'Maths', 'Ailleurs', 'https://exemple.com/sujet.pdf', 'https://officedubac.sn/', current_date)`,
      ),
    ).rejects.toThrow(/official_papers_url_check/);
  });
});
