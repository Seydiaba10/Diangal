-- DIANGAL · référentiel scolaire : rubriques de chapitre, sources et statut de vérification,
-- chapitres gratuits par matière, nouvelles matières, tableau de suivi des contenus.
-- Migration additive : l'application en ligne ignore ces colonnes tant qu'elle n'est pas mise à jour.

-- Statut de vérification d'un contenu : à vérifier, relu par un enseignant, source officielle vérifiée.
create type public.content_verification as enum ('unverified', 'reviewed', 'official');

alter table public.chapters
  -- Rubrique du programme officiel (ex. « Activités géométriques » en mathématiques au CI).
  add column strand text check (char_length(strand) <= 80),
  add column verification public.content_verification not null default 'unverified',
  -- Sources : [{ "title": "…", "url": "…", "kind": "official" | "external" | "diangal" }].
  add column sources jsonb not null default '[]'::jsonb check (jsonb_typeof(sources) = 'array');

-- Offre gratuite : les N premiers chapitres de chaque matière (3 par défaut), le reste en Premium.
alter table public.programs
  add column free_chapters smallint not null default 3 check (free_chapters between 0 and 50);

-- Matières du référentiel absentes jusqu'ici (programmes du primaire et du collège).
insert into public.subjects (code, slug, name, color_token, icon) values
  ('AR', 'arabe', 'Arabe', 'subject-ar', 'scroll-text'),
  ('ER', 'education-religieuse', 'Éducation religieuse', 'subject-er', 'hand-heart'),
  ('ESP', 'espagnol', 'Espagnol', 'subject-esp', 'messages-square')
on conflict (code) do nothing;

-- ── Tableau de suivi des contenus (admin) ──────────────────────────────────

/**
 * Une ligne par programme (classe, série, matière) : chapitres, leçons rédigées, exercices, QCM,
 * évaluations et statut de vérification. Sert à repérer ce qui reste à produire.
 */
create or replace function public.admin_content_tracking()
returns table (
  program_id integer, level_code text, level_order smallint, series_code text, subject_code text, subject_name text,
  free_chapters smallint, chapters integer, chapters_published integer, lessons integer, lessons_written integer,
  exercises integer, quizzes integer, exams integer, questions integer,
  chapters_unverified integer, chapters_reviewed integer, chapters_official integer, sourced_chapters integer
)
language plpgsql
stable
security definer
set search_path = ''
as $$
begin
  if not private.is_admin() then raise exception 'admins_only' using errcode = '42501'; end if;
  return query
  select p.id, l.code, l.sort_order, s.code, sub.code, sub.name, p.free_chapters,
    (select count(*)::integer from public.chapters c where c.program_id = p.id),
    (select count(*)::integer from public.chapters c where c.program_id = p.id and c.status = 'published'),
    (select count(*)::integer from public.lessons le join public.chapters c on c.id = le.chapter_id where c.program_id = p.id),
    -- Leçon rédigée : un corps réel (le gabarit « contenu de démonstration » ne compte pas).
    (select count(*)::integer from public.lessons le join public.chapters c on c.id = le.chapter_id
       join public.lesson_bodies b on b.lesson_id = le.id
     where c.program_id = p.id and char_length(b.body_html) > 400 and b.body_html not like '%Contenu de démonstration%'),
    (select count(*)::integer from public.assessments a where a.level_id = p.level_id and a.subject_id = p.subject_id
       and a.series_id is not distinct from p.series_id and a.kind = 'exercise'),
    (select count(*)::integer from public.assessments a where a.level_id = p.level_id and a.subject_id = p.subject_id
       and a.series_id is not distinct from p.series_id and a.kind = 'quiz'),
    (select count(*)::integer from public.assessments a where a.level_id = p.level_id and a.subject_id = p.subject_id
       and a.series_id is not distinct from p.series_id and a.kind in ('mock_exam', 'past_paper')),
    (select count(distinct q.id)::integer from public.questions q join public.chapters c on c.id = q.chapter_id where c.program_id = p.id),
    (select count(*)::integer from public.chapters c where c.program_id = p.id and c.verification = 'unverified'),
    (select count(*)::integer from public.chapters c where c.program_id = p.id and c.verification = 'reviewed'),
    (select count(*)::integer from public.chapters c where c.program_id = p.id and c.verification = 'official'),
    (select count(*)::integer from public.chapters c where c.program_id = p.id and jsonb_array_length(c.sources) > 0)
  from public.programs p
  join public.levels l on l.id = p.level_id
  left join public.series s on s.id = p.series_id
  join public.subjects sub on sub.id = p.subject_id
  order by l.sort_order, s.code nulls first, p.sort_order;
end;
$$;

revoke execute on function public.admin_content_tracking() from public, anon;
grant execute on function public.admin_content_tracking() to authenticated;
