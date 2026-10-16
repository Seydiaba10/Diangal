-- DIANGAL · exercices : séances « Préparer mon prochain devoir » et règle de l'offre gratuite.
-- Migration additive : une évaluation publique garde owner_id à null, et l'offre gratuite reste
-- désactivée tant que l'admin ne l'active pas (à faire quand le paiement est ouvert).

-- ── Séances personnelles ────────────────────────────────────────────────────

-- Évaluation créée pour un seul élève (ses chapitres, ses questions tirées au hasard).
alter table public.assessments add column owner_id uuid references public.profiles on delete cascade;
create index assessments_owner_idx on public.assessments (owner_id) where owner_id is not null;

-- Une séance personnelle n'est visible que par son élève, ses parents liés et l'admin.
drop policy assessments_read on public.assessments;
create policy assessments_read on public.assessments for select to anon, authenticated
  using (
    (owner_id is null and status = 'published')
    or (owner_id is not null and private.can_view_student(owner_id))
    or private.is_admin()
  );

-- Le catalogue public ne liste jamais les séances personnelles.
create or replace function public.get_assessments_catalog()
returns table (
  id uuid, slug text, kind public.assessment_kind, title text, subject_code text, level_code text,
  chapter_id uuid, exam_type public.exam_type, exam_year smallint, duration_s integer, is_premium boolean,
  questions_count integer, total_points numeric
)
language sql
stable
security definer
set search_path = ''
as $$
  select a.id, a.slug, a.kind, a.title, s.code, l.code, a.chapter_id, a.exam_type, a.exam_year, a.duration_s, a.is_premium,
         (select count(*)::integer from public.assessment_questions aq where aq.assessment_id = a.id),
         (select coalesce(sum(q.points), 0) from public.assessment_questions aq join public.questions q on q.id = aq.question_id
          where aq.assessment_id = a.id)
  from public.assessments a
  join public.subjects s on s.id = a.subject_id
  join public.levels l on l.id = a.level_id
  where a.status = 'published' and a.owner_id is null
  order by a.created_at;
$$;

-- Démarrage d'une évaluation : une séance personnelle ne peut être lancée que par son élève.
create or replace function public.start_attempt(p_assessment uuid)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  uid uuid := auth.uid();
  asmt public.assessments%rowtype;
  new_id uuid;
  deadline timestamptz;
  orders jsonb;
begin
  if uid is null then raise exception 'not_authenticated' using errcode = '28000'; end if;
  if private.app_role() <> 'student' then raise exception 'students_only' using errcode = '42501'; end if;

  select * into asmt from public.assessments
  where id = p_assessment and status = 'published' and (owner_id is null or owner_id = uid);
  if not found then raise exception 'not_found' using errcode = 'P0002'; end if;
  if asmt.is_premium and not private.has_premium(uid) then
    raise exception 'premium_required' using errcode = '42501';
  end if;

  -- Ordre des options mélangé et figé pour cette tentative (sauf vrai / faux).
  select coalesce(jsonb_object_agg(q.id::text, coalesce((
    select jsonb_agg(o.id order by case when asmt.shuffle_options and q.type <> 'true_false' then random() else o.sort_order end)
    from public.question_options o where o.question_id = q.id
  ), '[]'::jsonb)), '{}'::jsonb) into orders
  from public.assessment_questions aq join public.questions q on q.id = aq.question_id
  where aq.assessment_id = asmt.id;

  deadline := case when asmt.duration_s is not null then now() + make_interval(secs => asmt.duration_s) end;
  insert into public.attempts (user_id, assessment_id, deadline_at, option_order)
  values (uid, asmt.id, deadline, orders)
  returning id into new_id;

  return jsonb_build_object(
    'attempt_id', new_id,
    'deadline_at', deadline,
    'server_now', now(),
    'questions', (
      select coalesce(jsonb_agg(jsonb_build_object(
        'id', q.id, 'type', q.type, 'prompt_html', q.prompt_html, 'points', q.points,
        'options', (
          select coalesce(jsonb_agg(jsonb_build_object('id', o.id, 'label_html', o.label_html) order by e.ordinal), '[]'::jsonb)
          from jsonb_array_elements_text(coalesce(orders -> q.id::text, '[]'::jsonb)) with ordinality as e(option_id, ordinal)
          join public.question_options o on o.id = e.option_id::uuid
        )
      ) order by aq.sort_order), '[]'::jsonb)
      from public.assessment_questions aq join public.questions q on q.id = aq.question_id
      where aq.assessment_id = asmt.id
    )
  );
end;
$$;

/**
 * « Préparer mon prochain devoir » : questions tirées au hasard dans les chapitres choisis
 * (une seule matière, de la classe et de la série de l'élève), avec ou sans chronomètre
 * (1 min 30 par question). Renvoie l'évaluation personnelle ; le lecteur part de start_attempt.
 */
create or replace function public.create_practice_session(p_chapters uuid[], p_count integer, p_timed boolean)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  uid uuid := auth.uid();
  student public.student_profiles%rowtype;
  prog public.programs%rowtype;
  picked uuid[];
  new_id uuid;
begin
  if uid is null then raise exception 'not_authenticated' using errcode = '28000'; end if;
  if private.app_role() <> 'student' then raise exception 'students_only' using errcode = '42501'; end if;
  if coalesce(cardinality(p_chapters), 0) not between 1 and 20 or p_count not between 5 and 30 then
    raise exception 'invalid_request' using errcode = '22023';
  end if;
  -- Garde-fou : pas plus de 30 séances par jour.
  if (select count(*) from public.assessments where owner_id = uid and created_at > now() - interval '1 day') >= 30 then
    raise exception 'too_many_sessions' using errcode = '54000';
  end if;

  select * into student from public.student_profiles where user_id = uid;
  if (select count(distinct c.program_id) from public.chapters c where c.id = any (p_chapters) and c.status = 'published') <> 1
     or (select count(distinct c.id) from public.chapters c where c.id = any (p_chapters) and c.status = 'published')
        <> (select count(distinct x) from unnest(p_chapters) as x) then
    raise exception 'invalid_chapters' using errcode = '22023';
  end if;
  select p.* into prog from public.programs p join public.chapters c on c.program_id = p.id where c.id = p_chapters[1];
  if prog.level_id <> student.level_id or (prog.series_id is not null and prog.series_id is distinct from student.series_id) then
    raise exception 'invalid_chapters' using errcode = '22023';
  end if;
  -- Un chapitre Premium (au moins une leçon Premium) demande un abonnement actif.
  if exists (select 1 from public.lessons l where l.chapter_id = any (p_chapters) and l.is_premium)
     and not private.has_premium(uid) then
    raise exception 'premium_required' using errcode = '42501';
  end if;

  select array_agg(s.id) into picked from (
    select q.id from public.questions q
    where q.chapter_id = any (p_chapters) and q.status = 'published'
    order by random()
    limit p_count
  ) s;
  if picked is null then raise exception 'no_questions' using errcode = 'P0002'; end if;

  insert into public.assessments (slug, kind, title, level_id, series_id, subject_id, duration_s, is_premium, status, owner_id)
  values (
    'devoir-' || replace(gen_random_uuid()::text, '-', ''), 'exercise', 'Préparer mon prochain devoir',
    prog.level_id, prog.series_id, prog.subject_id,
    case when p_timed then greatest(60, cardinality(picked) * 90) end, false, 'published', uid
  )
  returning id into new_id;
  insert into public.assessment_questions (assessment_id, question_id, sort_order)
  select new_id, x.id, x.ord from unnest(picked) with ordinality as x(id, ord);
  return new_id;
end;
$$;

/** Nombre de questions publiées par chapitre (pour proposer seulement les chapitres qui en ont). */
create or replace function public.get_chapter_question_counts()
returns table (chapter_id uuid, questions integer)
language sql
stable
security definer
set search_path = ''
as $$
  select q.chapter_id, count(*)::integer
  from public.questions q
  join public.chapters c on c.id = q.chapter_id and c.status = 'published'
  where q.status = 'published'
  group by q.chapter_id;
$$;

-- ── Offre gratuite : les N premiers chapitres de chaque matière, le reste en Premium ──

insert into public.platform_settings (key, value) values ('free_tier', '{"enabled": false}'::jsonb)
on conflict (key) do nothing;

create or replace function private.free_tier_enabled()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce((select (value ->> 'enabled')::boolean from public.platform_settings where key = 'free_tier'), false);
$$;

/**
 * Applique la règle (si elle est activée) à un programme, ou à tous : une leçon, un exercice ou un
 * contrôle de chapitre est Premium si le numéro du chapitre dépasse programs.free_chapters.
 */
create or replace function private.sync_free_tier(p_program integer default null)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not private.free_tier_enabled() then return; end if;
  update public.lessons le set is_premium = c.number > p.free_chapters
  from public.chapters c join public.programs p on p.id = c.program_id
  where le.chapter_id = c.id and (p_program is null or p.id = p_program)
    and le.is_premium is distinct from (c.number > p.free_chapters);
  update public.assessments a set is_premium = c.number > p.free_chapters
  from public.chapters c join public.programs p on p.id = c.program_id
  where a.chapter_id = c.id and a.owner_id is null and a.kind in ('exercise', 'quiz')
    and (p_program is null or p.id = p_program)
    and a.is_premium is distinct from (c.number > p.free_chapters);
end;
$$;

create or replace function private.free_tier_on_program()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  perform private.sync_free_tier(new.id);
  return null;
end;
$$;

create or replace function private.free_tier_on_chapter()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  perform private.sync_free_tier(new.program_id);
  return null;
end;
$$;

create or replace function private.free_tier_on_child()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if new.chapter_id is not null then
    perform private.sync_free_tier((select c.program_id from public.chapters c where c.id = new.chapter_id));
  end if;
  return null;
end;
$$;

create trigger programs_free_tier after update of free_chapters on public.programs
  for each row execute function private.free_tier_on_program();
create trigger chapters_free_tier after insert or update of number, program_id on public.chapters
  for each row execute function private.free_tier_on_chapter();
create trigger lessons_free_tier after insert or update of chapter_id on public.lessons
  for each row execute function private.free_tier_on_child();
create trigger assessments_free_tier after insert or update of chapter_id on public.assessments
  for each row execute function private.free_tier_on_child();

/** Active ou désactive la règle (admin en double authentification). Désactiver laisse les accès en l'état. */
create or replace function public.admin_set_free_tier(p_enabled boolean)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not private.is_admin() then raise exception 'admins_only' using errcode = '42501'; end if;
  insert into public.platform_settings (key, value) values ('free_tier', jsonb_build_object('enabled', p_enabled))
  on conflict (key) do update set value = excluded.value;
  perform private.sync_free_tier(null);
  perform private.log_audit(case when p_enabled then 'offre gratuite activée' else 'offre gratuite désactivée' end, 'platform_settings', 'free_tier');
end;
$$;

revoke execute on function
  private.free_tier_enabled(), private.sync_free_tier(integer), private.free_tier_on_program(),
  private.free_tier_on_chapter(), private.free_tier_on_child()
from public, anon, authenticated;
revoke execute on function
  public.create_practice_session(uuid[], integer, boolean), public.get_chapter_question_counts(), public.admin_set_free_tier(boolean)
from public, anon, authenticated;
grant execute on function public.create_practice_session(uuid[], integer, boolean), public.admin_set_free_tier(boolean) to authenticated;
grant execute on function public.get_chapter_question_counts() to anon, authenticated;

-- ── Tableau de suivi : les séances personnelles ne comptent pas comme exercices du programme ──

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
     where c.program_id = p.id and btrim(b.body_html) <> '' and b.body_html not like '%Contenu de démonstration%'),
    (select count(*)::integer from public.assessments a where a.level_id = p.level_id and a.subject_id = p.subject_id
       and a.series_id is not distinct from p.series_id and a.owner_id is null and a.kind = 'exercise'),
    (select count(*)::integer from public.assessments a where a.level_id = p.level_id and a.subject_id = p.subject_id
       and a.series_id is not distinct from p.series_id and a.owner_id is null and a.kind = 'quiz'),
    (select count(*)::integer from public.assessments a where a.level_id = p.level_id and a.subject_id = p.subject_id
       and a.series_id is not distinct from p.series_id and a.owner_id is null and a.kind in ('mock_exam', 'past_paper')),
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
