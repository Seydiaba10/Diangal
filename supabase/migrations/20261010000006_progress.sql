-- DIANGAL · progression des élèves.

create table public.lesson_progress (
  user_id uuid not null references public.profiles on delete cascade,
  lesson_id uuid not null references public.lessons on delete cascade,
  status public.progress_status not null default 'in_progress',
  percent smallint not null default 0 check (percent between 0 and 100),
  last_position_s integer,
  completed_at timestamptz,
  updated_at timestamptz not null default now(),
  primary key (user_id, lesson_id)
);
create trigger lesson_progress_touch before update on public.lesson_progress
  for each row execute function private.touch_updated_at();

-- Maîtrise par chapitre, mise à jour à chaque contrôle corrigé (points faibles).
create table public.chapter_mastery (
  user_id uuid not null references public.profiles on delete cascade,
  chapter_id uuid not null references public.chapters on delete cascade,
  attempts_count integer not null default 0,
  avg_score_20 numeric(4, 2),
  last_score_20 numeric(4, 2),
  best_score_20 numeric(4, 2),
  last_attempt_at timestamptz,
  primary key (user_id, chapter_id)
);

-- Une ligne par jour d'activité (heure de Dakar = UTC) : sert aux « jours d'affilée ».
create table public.daily_activity (
  user_id uuid not null references public.profiles on delete cascade,
  day date not null,
  minutes integer not null default 0,
  lessons_completed integer not null default 0,
  attempts_submitted integer not null default 0,
  primary key (user_id, day)
);
