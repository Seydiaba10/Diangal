-- DIANGAL · contenus pédagogiques (chapitres, leçons, corps de leçon, médias).

create table public.chapters (
  id uuid primary key default gen_random_uuid(),
  program_id integer not null references public.programs on delete cascade,
  number smallint not null,
  slug text not null,
  title text not null,
  summary text not null default '',
  sort_order smallint not null default 0,
  status public.publish_status not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (program_id, slug)
);
create trigger chapters_touch before update on public.chapters
  for each row execute function private.touch_updated_at();

create table public.lessons (
  id uuid primary key default gen_random_uuid(),
  chapter_id uuid not null references public.chapters on delete cascade,
  number smallint not null,
  slug text not null,
  title text not null,
  is_premium boolean not null default false,
  status public.publish_status not null default 'draft',
  estimated_minutes smallint not null default 10 check (estimated_minutes between 1 and 240),
  -- Incrémentée à chaque publication : les copies hors ligne savent qu'elles sont périmées.
  version integer not null default 1,
  published_at timestamptz,
  updated_at timestamptz not null default now(),
  unique (chapter_id, slug)
);
create index lessons_chapter_idx on public.lessons (chapter_id);
create trigger lessons_touch before update on public.lessons
  for each row execute function private.touch_updated_at();

-- Corps séparé des métadonnées : la règle Premium porte sur cette table.
-- body_html est produit et assaini côté serveur (Markdown + KaTeX) à l'enregistrement.
create table public.lesson_bodies (
  lesson_id uuid primary key references public.lessons on delete cascade,
  body_md text not null default '',
  body_html text not null default '',
  updated_at timestamptz not null default now()
);
create trigger lesson_bodies_touch before update on public.lesson_bodies
  for each row execute function private.touch_updated_at();

create table public.media (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid references public.lessons on delete cascade,
  assessment_id uuid,
  kind public.media_kind not null,
  bucket text not null check (bucket in ('content-free', 'content-premium', 'public-assets')),
  path text not null,
  title text not null,
  size_bytes integer not null check (size_bytes > 0),
  duration_s integer check (duration_s > 0),
  -- Variantes pré-encodées : {"240p": "…", "360p": "…", "audio": "…"}.
  variants jsonb not null default '{}'::jsonb,
  is_premium boolean not null default false,
  downloadable boolean not null default true,
  check (lesson_id is not null or assessment_id is not null)
);
create index media_lesson_idx on public.media (lesson_id);
