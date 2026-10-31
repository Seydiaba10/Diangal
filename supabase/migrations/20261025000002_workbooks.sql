-- DIANGAL · cahiers d'exercices officiels (PAAME2) repris page par page. Migration additive :
--   • questions.stem_html : énoncé commun (rubrique, consigne, figure) affiché au-dessus d'une question ;
--   • assessments.intro_html : page entière du cahier, montrée avant de commencer ;
--   • assessments.workbook : place de la page dans le cahier d'origine ;
--   • questions self_check : l'élève voit le corrigé pendant l'exercice puis s'évalue (« reussi » ou « a_revoir ») ;
--   • ces questions restent hors des séances « Préparer mon prochain devoir » ;
--   • les pages d'un cahier officiel restent gratuites, même quand l'offre gratuite est activée.

alter table public.questions add column stem_html text not null default '';

alter table public.assessments
  add column intro_html text not null default '',
  -- { "code": "paame2-cp", "page": 5, "pdf_page": 17, "domain": "AN", "palier": 4, "lesson": 5 }
  add column workbook jsonb check (
    workbook is null or (jsonb_typeof(workbook) = 'object' and workbook ? 'code' and workbook ? 'page' and workbook ? 'domain')
  );

-- ── Correction : même règle qu'en TypeScript (lib/grading.ts) ───────────────

create or replace function private.grade_answer(
  q_type public.question_type,
  k private.answer_keys,
  response jsonb,
  points numeric,
  out is_correct boolean,
  out points_awarded numeric
)
language plpgsql
stable
set search_path = ''
as $$
declare
  picked uuid[];
  good integer;
  bad integer;
  total integer;
  text_value text := case when jsonb_typeof(response) = 'string' then response #>> '{}'
                          when jsonb_typeof(response) = 'array' then response ->> 0 end;
  number_value numeric;
begin
  is_correct := false;
  points_awarded := 0;
  if response is null then
    return;
  end if;
  -- Auto-évaluation : pas de corrigé secret, l'élève déclare avoir réussi après comparaison.
  if q_type = 'self_check' then
    is_correct := text_value = 'reussi';
    points_awarded := case when is_correct then points else 0 end;
    return;
  end if;
  if k.question_id is null then
    return;
  end if;

  if q_type in ('single_choice', 'true_false', 'multiple_choice') then
    select coalesce(array_agg(e::uuid), '{}') into picked
    from jsonb_array_elements_text(case when jsonb_typeof(response) = 'array' then response else '[]'::jsonb end) as e
    where e ~ '^[0-9a-f-]{36}$';
  end if;

  case q_type
    when 'single_choice', 'true_false' then
      is_correct := cardinality(picked) = 1 and picked[1] = any (k.correct_option_ids);
    when 'multiple_choice' then
      total := cardinality(k.correct_option_ids);
      select count(*) filter (where p = any (k.correct_option_ids)), count(*) filter (where not p = any (k.correct_option_ids))
        into good, bad from unnest(picked) as p;
      if total = 0 or cardinality(picked) = 0 then
        return;
      end if;
      is_correct := bad = 0 and good = total;
      if not is_correct then
        -- Crédit partiel : (bonnes − mauvaises) / bonnes réponses attendues, au quart de point.
        points_awarded := round(points * greatest(0, (good - bad)::numeric / total) * 4) / 4;
        return;
      end if;
    when 'numeric' then
      number_value := private.parse_number(text_value);
      is_correct := number_value is not null and k.numeric_value is not null
        and abs(number_value - k.numeric_value) <= k.tolerance;
    when 'short_text' then
      is_correct := private.normalize_text(text_value) <> ''
        and private.normalize_text(text_value) in (select private.normalize_text(t) from unnest(k.accepted_texts) as t);
    else
      return;
  end case;

  points_awarded := case when is_correct then points else 0 end;
end;
$$;

-- ── Lecteur : énoncé commun, et corrigé des questions self_check ───────────

create or replace function public.get_attempt_session(p_attempt uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  a public.attempts%rowtype;
  asmt public.assessments%rowtype;
begin
  select * into a from public.attempts where id = p_attempt and user_id = auth.uid();
  if not found then return null; end if;
  if a.status <> 'in_progress' then return jsonb_build_object('status', a.status); end if;
  select * into asmt from public.assessments where id = a.assessment_id;

  return jsonb_build_object(
    'status', a.status,
    'attempt_id', a.id,
    'assessment_slug', asmt.slug,
    'started_at', a.started_at,
    'deadline_at', a.deadline_at,
    'server_now', now(),
    'saved_answers', a.saved_answers,
    'questions', (
      select coalesce(jsonb_agg(jsonb_build_object(
        'id', q.id, 'type', q.type, 'prompt_html', q.prompt_html, 'points', q.points, 'stem_html', q.stem_html,
        -- Le corrigé d'un travail sur l'ardoise n'est pas secret : l'élève le voit avant de s'évaluer.
        'model_html', case when q.type = 'self_check' then q.explanation_html end,
        'options', (
          select coalesce(jsonb_agg(jsonb_build_object('id', o.id, 'label_html', o.label_html) order by e.ordinal), '[]'::jsonb)
          from jsonb_array_elements_text(coalesce(a.option_order -> q.id::text, '[]'::jsonb)) with ordinality as e(option_id, ordinal)
          join public.question_options o on o.id = e.option_id::uuid
        )
      ) order by aq.sort_order), '[]'::jsonb)
      from public.assessment_questions aq join public.questions q on q.id = aq.question_id
      where aq.assessment_id = asmt.id
    )
  );
end;
$$;

create or replace function public.get_attempt_review(p_attempt uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  a public.attempts%rowtype;
begin
  select * into a from public.attempts where id = p_attempt;
  if not found or not private.can_view_student(a.user_id) then raise exception 'not_found' using errcode = 'P0002'; end if;
  if a.status <> 'submitted' then raise exception 'not_submitted' using errcode = '42501'; end if;

  return jsonb_build_object(
    'attempt_id', a.id, 'score', a.score, 'max_score', a.max_score, 'score_20', a.score_20,
    'submitted_at', a.submitted_at, 'late', a.late_sync,
    'questions', (
      select coalesce(jsonb_agg(jsonb_build_object(
        'id', q.id, 'type', q.type, 'prompt_html', q.prompt_html, 'points', q.points, 'stem_html', q.stem_html,
        'response', aa.response, 'is_correct', aa.is_correct, 'points_awarded', aa.points_awarded,
        'correct_option_ids', coalesce(to_jsonb(k.correct_option_ids), '[]'::jsonb),
        'expected_answer', k.expected_answer,
        'explanation_html', q.explanation_html,
        'options', (
          select coalesce(jsonb_agg(jsonb_build_object('id', o.id, 'label_html', o.label_html) order by e.ordinal), '[]'::jsonb)
          from jsonb_array_elements_text(coalesce(a.option_order -> q.id::text, '[]'::jsonb)) with ordinality as e(option_id, ordinal)
          join public.question_options o on o.id = e.option_id::uuid
        )
      ) order by aq.sort_order), '[]'::jsonb)
      from public.assessment_questions aq
      join public.questions q on q.id = aq.question_id
      left join public.attempt_answers aa on aa.attempt_id = a.id and aa.question_id = q.id
      left join private.answer_keys k on k.question_id = q.id
      where aq.assessment_id = a.assessment_id
    )
  );
end;
$$;

create or replace function public.admin_get_assessment(p_assessment uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = ''
as $$
begin
  if not private.is_admin() then raise exception 'admins_only' using errcode = '42501'; end if;
  return (
    select jsonb_build_object(
      'id', a.id, 'slug', a.slug, 'kind', a.kind, 'title', a.title, 'duration_s', a.duration_s,
      'is_premium', a.is_premium, 'subject_code', s.code, 'subject_name', s.name,
      'questions', coalesce((
        select jsonb_agg(jsonb_build_object(
          'id', q.id, 'slug', q.slug, 'type', q.type, 'prompt_html', q.prompt_html, 'explanation_html', q.explanation_html,
          'points', q.points, 'stem_html', q.stem_html,
          'options', coalesce((
            select jsonb_agg(jsonb_build_object('id', o.id, 'slug', o.slug, 'label_html', o.label_html) order by o.sort_order)
            from public.question_options o where o.question_id = q.id), '[]'::jsonb),
          'correct_option_ids', coalesce(to_jsonb(k.correct_option_ids), '[]'::jsonb),
          'accepted_texts', coalesce(to_jsonb(k.accepted_texts), '[]'::jsonb),
          'numeric_value', k.numeric_value,
          'expected_answer', k.expected_answer
        ) order by aq.sort_order)
        from public.assessment_questions aq
        join public.questions q on q.id = aq.question_id
        left join private.answer_keys k on k.question_id = q.id
        where aq.assessment_id = a.id), '[]'::jsonb)
    )
    from public.assessments a join public.subjects s on s.id = a.subject_id
    where a.id = p_assessment
  );
end;
$$;

-- ── Catalogue : place de chaque page dans son cahier ────────────────────────

drop function public.get_assessments_catalog();
create function public.get_assessments_catalog()
returns table (
  id uuid, slug text, kind public.assessment_kind, title text, subject_code text, level_code text,
  chapter_id uuid, exam_type public.exam_type, exam_year smallint, duration_s integer, is_premium boolean,
  questions_count integer, total_points numeric,
  series_code text, verification public.content_verification, sources jsonb, correction_source text,
  workbook jsonb
)
language sql
stable
security definer
set search_path = ''
as $$
  select a.id, a.slug, a.kind, a.title, s.code, l.code, a.chapter_id, a.exam_type, a.exam_year, a.duration_s, a.is_premium,
         (select count(*)::integer from public.assessment_questions aq where aq.assessment_id = a.id),
         (select coalesce(sum(q.points), 0) from public.assessment_questions aq join public.questions q on q.id = aq.question_id
          where aq.assessment_id = a.id),
         se.code, a.verification, a.sources, a.correction_source, a.workbook
  from public.assessments a
  join public.subjects s on s.id = a.subject_id
  join public.levels l on l.id = a.level_id
  left join public.series se on se.id = a.series_id
  where a.status = 'published' and a.owner_id is null
  order by a.created_at;
$$;

revoke execute on function public.get_assessments_catalog() from public, anon, authenticated;
grant execute on function public.get_assessments_catalog() to anon, authenticated;

-- ── « Préparer mon prochain devoir » : sans le travail sur l'ardoise ────────

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
    where q.chapter_id = any (p_chapters) and q.status = 'published' and q.type <> 'self_check'
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
  where q.status = 'published' and q.type <> 'self_check'
  group by q.chapter_id;
$$;

-- ── Offre gratuite : les pages d'un cahier officiel restent ouvertes à tous ──

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
  where a.chapter_id = c.id and a.owner_id is null and a.workbook is null and a.kind in ('exercise', 'quiz')
    and (p_program is null or p.id = p_program)
    and a.is_premium is distinct from (c.number > p.free_chapters);
end;
$$;
