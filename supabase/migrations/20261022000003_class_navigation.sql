-- DIANGAL · navigation entre les classes (22/10/2026).
-- L'élève parcourt sa classe actuelle et les classes précédentes (révisions) : la progression reste
-- attachée aux leçons, rien n'est recopié. « Préparer mon prochain devoir » accepte désormais les
-- chapitres d'une classe précédente ; une classe supérieure reste refusée.

/**
 * « Préparer mon prochain devoir » : questions tirées au hasard dans les chapitres choisis
 * (une seule matière, de la classe et de la série de l'élève, ou d'une classe précédente), avec ou sans chronomètre
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
  -- Classe actuelle (et sa série), ou une classe précédente ouverte en révision (toute série).
  if not (
    (prog.level_id = student.level_id and (prog.series_id is null or prog.series_id = student.series_id))
    or (select sort_order from public.levels where id = prog.level_id) < (select sort_order from public.levels where id = student.level_id)
  ) then
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
