-- DIANGAL · informations publiques sans exposer les questions ni les numéros de téléphone.

/**
 * Évaluations publiées avec leur nombre de questions et leur barème : les questions elles-mêmes
 * restent illisibles avant le démarrage (start_attempt).
 */
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
  where a.status = 'published'
  order by a.created_at;
$$;

/** Dernière demande de validation de l'élève connecté : numéro du parent masqué (77 ••• •• 21). */
create or replace function public.get_my_consent_request()
returns jsonb
language sql
stable
security definer
set search_path = ''
as $$
  select jsonb_build_object(
    'parent_phone_masked', substr(r.parent_phone, 5, 2) || ' ••• •• ' || right(r.parent_phone, 2),
    'created_at', r.created_at,
    'expires_at', r.expires_at
  )
  from public.consent_requests r
  where r.student_id = auth.uid() and r.consumed_at is null
  order by r.created_at desc
  limit 1;
$$;

revoke execute on function public.get_assessments_catalog(), public.get_my_consent_request() from public, anon, authenticated;
grant execute on function public.get_assessments_catalog() to anon, authenticated;
grant execute on function public.get_my_consent_request() to authenticated;
