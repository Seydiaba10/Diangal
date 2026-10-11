-- DIANGAL · évaluations, banque de questions, corrigés (privés) et tentatives.

create table public.assessments (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  kind public.assessment_kind not null,
  title text not null,
  level_id smallint not null references public.levels,
  series_id smallint references public.series,
  subject_id smallint not null references public.subjects,
  chapter_id uuid references public.chapters on delete set null,
  exam_type public.exam_type,
  exam_year smallint,
  -- NULL : entraînement non chronométré.
  duration_s integer check (duration_s is null or duration_s between 60 and 14400),
  is_premium boolean not null default false,
  shuffle_options boolean not null default true,
  status public.publish_status not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index assessments_chapter_idx on public.assessments (chapter_id);
create trigger assessments_touch before update on public.assessments
  for each row execute function private.touch_updated_at();

alter table public.media
  add constraint media_assessment_fk foreign key (assessment_id) references public.assessments on delete cascade;

create table public.questions (
  id uuid primary key default gen_random_uuid(),
  slug text unique,
  subject_id smallint not null references public.subjects,
  chapter_id uuid references public.chapters on delete set null,
  type public.question_type not null,
  prompt_html text not null,
  -- Corrigé détaillé : renvoyé seulement après la soumission (get_attempt_review).
  explanation_html text not null default '',
  difficulty smallint not null default 2 check (difficulty between 1 and 3),
  points numeric(5, 2) not null check (points > 0),
  tags text[] not null default '{}',
  status public.publish_status not null default 'published'
);

-- Aucune information de correction dans les options.
create table public.question_options (
  id uuid primary key default gen_random_uuid(),
  question_id uuid not null references public.questions on delete cascade,
  slug text not null,
  label_html text not null,
  sort_order smallint not null default 0,
  unique (question_id, slug)
);
create index question_options_question_idx on public.question_options (question_id);

create table public.assessment_questions (
  assessment_id uuid not null references public.assessments on delete cascade,
  question_id uuid not null references public.questions on delete restrict,
  sort_order smallint not null default 0,
  primary key (assessment_id, question_id)
);

-- Corrigés : schéma privé, jamais exposé par l'API, lus par les fonctions de correction.
create table private.answer_keys (
  question_id uuid primary key references public.questions on delete cascade,
  correct_option_ids uuid[] not null default '{}',
  accepted_texts text[] not null default '{}',
  numeric_value numeric,
  tolerance numeric not null default 0.01 check (tolerance >= 0),
  expected_answer text
);

create table public.attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles on delete cascade,
  assessment_id uuid not null references public.assessments on delete cascade,
  status public.attempt_status not null default 'in_progress',
  started_at timestamptz not null default now(),
  -- Fixée par le serveur au démarrage : le téléphone ne décide pas du temps restant.
  deadline_at timestamptz,
  submitted_at timestamptz,
  client_submitted_at timestamptz,
  score numeric(6, 2),
  max_score numeric(6, 2),
  score_20 numeric(4, 2),
  option_order jsonb not null default '{}'::jsonb,
  saved_answers jsonb not null default '{}'::jsonb,
  -- Identifiant généré par le téléphone : une soumission rejouée hors ligne n'est comptée qu'une fois.
  client_ref uuid unique,
  late_sync boolean not null default false
);
create index attempts_user_idx on public.attempts (user_id, assessment_id);
create index attempts_open_idx on public.attempts (deadline_at) where status = 'in_progress';

create table public.attempt_answers (
  attempt_id uuid not null references public.attempts on delete cascade,
  question_id uuid not null references public.questions,
  response jsonb,
  is_correct boolean not null,
  points_awarded numeric(5, 2) not null,
  primary key (attempt_id, question_id)
);
