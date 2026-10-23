-- DIANGAL · sujets et corrigés officiels du Bac en PDF (23/10/2026).
-- Documents publiés par l'Office du Bac sur officedubac.sn : DIANGAL ne garde que le lien et sa
-- provenance (aucune copie hébergée). Classement (matière, série, groupe) déduit du libellé officiel.
-- Lecture publique ; écriture seulement par l'équipe (SQL, clé secrète). Données : seed / lots d'ajout
-- générés depuis src/mocks/official-papers.ts (scripts/import-official-papers.mjs).

create table public.official_papers (
  id uuid primary key default gen_random_uuid(),
  exam_type public.exam_type not null default 'BAC',
  year smallint not null check (year between 2000 and 2100),
  kind text not null check (kind in ('epreuve', 'corrige')),
  exam_group smallint check (exam_group in (1, 2)),
  replacement boolean not null default false,
  subject_code text check (char_length(subject_code) <= 8),
  subject_label text not null check (char_length(subject_label) between 1 and 80),
  series_label text check (char_length(series_label) <= 20),
  series_codes text[] not null default '{}',
  title text not null check (char_length(title) between 1 and 160),
  -- Seulement des PDF du site officiel.
  url text not null unique check (url ~* '^https://officedubac\.sn/wp-content/uploads/[^ ]+\.pdf$'),
  source_page text not null check (source_page ~ '^https://officedubac\.sn/'),
  source_name text not null default 'Office du Bac',
  checked_on date not null,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);
create index official_papers_exam_idx on public.official_papers (exam_type, year desc);

alter table public.official_papers enable row level security;
grant select on public.official_papers to anon, authenticated;
create policy official_papers_read on public.official_papers for select to anon, authenticated
  using (is_published or private.is_admin());
