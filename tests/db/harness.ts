// Banc de test de la base : vrai Postgres (PGlite, WebAssembly) + simulacres de Supabase.
// Charge toutes les migrations et le seed, puis permet d'exécuter des requêtes « en tant que »
// un utilisateur (rôle Postgres + claims JWT), exactement comme le ferait l'API Supabase.
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { PGlite, type Transaction } from "@electric-sql/pglite";
import { btree_gist } from "@electric-sql/pglite/contrib/btree_gist";
import { pgcrypto } from "@electric-sql/pglite/contrib/pgcrypto";
import { unaccent } from "@electric-sql/pglite/contrib/unaccent";

const SUPABASE_STUBS = `
  create role anon nologin;
  create role authenticated nologin;
  create role service_role nologin bypassrls;
  create schema auth;
  create table auth.users (
    id uuid primary key default gen_random_uuid(),
    email text,
    phone text,
    raw_user_meta_data jsonb not null default '{}'::jsonb,
    created_at timestamptz not null default now()
  );
  create function auth.jwt() returns jsonb language sql stable as $$
    select coalesce(nullif(current_setting('request.jwt.claims', true), ''), '{}')::jsonb
  $$;
  create function auth.uid() returns uuid language sql stable as $$
    select nullif(auth.jwt() ->> 'sub', '')::uuid
  $$;
  grant usage on schema auth to anon, authenticated;
  grant execute on all functions in schema auth to anon, authenticated;
  grant usage on schema public to anon, authenticated;
`;

const ROOT = join(__dirname, "..", "..");

export async function createTestDatabase() {
  const db = new PGlite({ extensions: { btree_gist, pgcrypto, unaccent } });
  await db.exec(SUPABASE_STUBS);
  const dir = join(ROOT, "supabase", "migrations");
  for (const file of readdirSync(dir).filter((f) => f.endsWith(".sql")).sort()) {
    await db.exec(readFileSync(join(dir, file), "utf8"));
  }
  await db.exec("grant usage on schema extensions to anon, authenticated;");
  await db.exec(readFileSync(join(ROOT, "supabase", "seed.sql"), "utf8"));
  return db;
}

export interface Actor {
  id: string | null;
  role: "student" | "parent" | "tutor" | "admin" | null;
  /** Assurance d'authentification (aal2 = double authentification). */
  aal?: "aal1" | "aal2";
  /** Heure de la dernière connexion (secondes), claim « amr » du JWT. Par défaut : maintenant. */
  loginAt?: number;
}

export const ANON: Actor = { id: null, role: null };

/** Exécute fn dans une transaction avec le rôle Postgres et les claims JWT de l'acteur. */
export async function as<T>(db: PGlite, actor: Actor, fn: (tx: Transaction) => Promise<T>): Promise<T> {
  return db.transaction(async (tx) => {
    const amr = [{ method: "otp", timestamp: actor.loginAt ?? Math.floor(Date.now() / 1000) }];
    const claims = actor.id ? { sub: actor.id, role: "authenticated", user_role: actor.role, aal: actor.aal ?? "aal1", amr } : {};
    await tx.query("select set_config('request.jwt.claims', $1, true)", [JSON.stringify(claims)]);
    await tx.exec(`set local role ${actor.id ? "authenticated" : "anon"}`);
    return fn(tx);
  });
}

/** Crée un compte comme le ferait Supabase Auth (le déclencheur crée le profil). */
export async function createUser(
  db: PGlite,
  meta: Record<string, string>,
  phone: string | null = null,
  email: string | null = null,
): Promise<string> {
  const { rows } = await db.query<{ id: string }>(
    "insert into auth.users (phone, email, raw_user_meta_data) values ($1, $2, $3) returning id",
    [phone, email, JSON.stringify(meta)],
  );
  return rows[0]!.id;
}
