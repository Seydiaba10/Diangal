-- DIANGAL · fonctions métier appelées par l'application (RPC) et tâches internes.

-- ── Correction ──────────────────────────────────────────────────────────────

-- Mêmes règles que src/lib/grading.ts : minuscules, sans accents ni ponctuation.
create or replace function private.normalize_text(value text)
returns text
language sql
stable
set search_path = ''
as $$
  -- La ponctuation est retirée avant unaccent, qui transforme « » en << >>.
  select trim(regexp_replace(
    lower(extensions.unaccent(regexp_replace(coalesce(value, ''), '[«»"“”''’.,;:!?()]', ' ', 'g'))),
    '\s+', ' ', 'g'));
$$;

-- « 4,5 cm » → 4.5 ; texte sans nombre → NULL.
create or replace function private.parse_number(value text)
returns numeric
language sql
immutable
set search_path = ''
as $$
  select (regexp_match(regexp_replace(regexp_replace(coalesce(value, ''), '\s', '', 'g'), ',', '.'), '-?\d+(?:\.\d+)?'))[1]::numeric;
$$;

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
  if response is null or k.question_id is null then
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
  end case;

  points_awarded := case when is_correct then points else 0 end;
end;
$$;

/*
 * Corrige et clôt une tentative. Appelée par submit_attempt (élève) et par la tâche
 * d'expiration (copies jamais envoyées). Met à jour la maîtrise du chapitre et l'activité du jour.
 */
create or replace function private.finalize_attempt(p_attempt uuid, p_answers jsonb, p_late boolean)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  a public.attempts%rowtype;
  asmt public.assessments%rowtype;
  total_score numeric;
  total_max numeric;
  score20 numeric;
  correct integer;
begin
  select * into a from public.attempts where id = p_attempt for update;
  select * into asmt from public.assessments where id = a.assessment_id;

  insert into public.attempt_answers (attempt_id, question_id, response, is_correct, points_awarded)
  select a.id, q.id, p_answers -> q.id::text, g.is_correct, g.points_awarded
  from public.assessment_questions aq
  join public.questions q on q.id = aq.question_id
  left join private.answer_keys k on k.question_id = q.id
  cross join lateral private.grade_answer(q.type, k, p_answers -> q.id::text, q.points) g
  where aq.assessment_id = a.assessment_id;

  select coalesce(sum(aa.points_awarded), 0), coalesce(sum(q.points), 0), count(*) filter (where aa.is_correct)
    into total_score, total_max, correct
  from public.attempt_answers aa join public.questions q on q.id = aa.question_id
  where aa.attempt_id = a.id;

  score20 := case when total_max > 0 then round(total_score / total_max * 20 * 4) / 4 else 0 end;

  update public.attempts set
    status = 'submitted', submitted_at = now(), score = total_score, max_score = total_max,
    score_20 = score20, late_sync = p_late, saved_answers = coalesce(p_answers, '{}'::jsonb)
  where id = a.id;

  if asmt.chapter_id is not null then
    insert into public.chapter_mastery as m (user_id, chapter_id, attempts_count, avg_score_20, last_score_20, best_score_20, last_attempt_at)
    values (a.user_id, asmt.chapter_id, 1, score20, score20, score20, now())
    on conflict (user_id, chapter_id) do update set
      attempts_count = m.attempts_count + 1,
      avg_score_20 = round((coalesce(m.avg_score_20, 0) * m.attempts_count + score20) / (m.attempts_count + 1), 2),
      last_score_20 = score20,
      best_score_20 = greatest(m.best_score_20, score20),
      last_attempt_at = now();
  end if;

  insert into public.daily_activity as d (user_id, day, attempts_submitted)
  values (a.user_id, (now() at time zone 'Africa/Dakar')::date, 1)
  on conflict (user_id, day) do update set attempts_submitted = d.attempts_submitted + 1;

  return jsonb_build_object(
    'attempt_id', a.id, 'score', total_score, 'max_score', total_max, 'score_20', score20,
    'correct_count', correct, 'late', p_late);
end;
$$;

-- ── Tentatives ──────────────────────────────────────────────────────────────

/** Démarre un contrôle : date limite fixée par le serveur, questions renvoyées SANS corrigé. */
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

  select * into asmt from public.assessments where id = p_assessment and status = 'published';
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

/** Sauvegarde intermédiaire (si la copie n'est jamais envoyée, ces réponses sont corrigées). */
create or replace function public.save_attempt_answers(p_attempt uuid, p_answers jsonb)
returns void
language sql
security definer
set search_path = ''
as $$
  update public.attempts set saved_answers = p_answers
  where id = p_attempt and user_id = auth.uid() and status = 'in_progress'
    and (deadline_at is null or now() <= deadline_at + interval '60 seconds');
$$;

/**
 * Envoi de la copie. Idempotente. Une copie reçue après la limite (+ 60 s de tolérance réseau)
 * n'est acceptée que si le téléphone l'a validée avant la limite et l'envoie dans les 24 h
 * (coupure de réseau) ; sinon seules les réponses sauvegardées à temps sont corrigées.
 */
create or replace function public.submit_attempt(
  p_attempt uuid,
  p_answers jsonb,
  p_client_submitted_at timestamptz default null,
  p_client_ref uuid default null
)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  a public.attempts%rowtype;
  answers jsonb := coalesce(p_answers, '{}'::jsonb);
  late boolean := false;
begin
  select * into a from public.attempts where id = p_attempt and user_id = auth.uid() for update;
  if not found then raise exception 'not_found' using errcode = 'P0002'; end if;

  if a.status <> 'in_progress' then
    return jsonb_build_object('attempt_id', a.id, 'score', a.score, 'max_score', a.max_score, 'score_20', a.score_20, 'already_submitted', true);
  end if;

  if a.deadline_at is not null and now() > a.deadline_at + interval '60 seconds' then
    late := true;
    if p_client_submitted_at is null or p_client_submitted_at > a.deadline_at or now() > a.deadline_at + interval '24 hours' then
      answers := a.saved_answers;
    end if;
  end if;

  update public.attempts set client_submitted_at = p_client_submitted_at, client_ref = coalesce(client_ref, p_client_ref)
  where id = a.id;
  return private.finalize_attempt(a.id, answers, late);
end;
$$;

/** Correction détaillée : seulement une fois la copie envoyée, pour l'élève, son parent ou l'admin. */
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
        'id', q.id, 'type', q.type, 'prompt_html', q.prompt_html, 'points', q.points,
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

-- ── Dashboard élève ─────────────────────────────────────────────────────────

/** Tout le tableau de bord en un seul aller-retour réseau. */
create or replace function public.get_student_dashboard(p_student uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  sp public.student_profiles%rowtype;
  lvl public.levels%rowtype;
  today date := (now() at time zone 'Africa/Dakar')::date;
  streak integer := 0;
  d date;
begin
  if not private.can_view_student(p_student) then raise exception 'not_found' using errcode = 'P0002'; end if;
  select * into sp from public.student_profiles where user_id = p_student;
  select * into lvl from public.levels where id = sp.level_id;

  -- Jours d'affilée : jours consécutifs d'activité jusqu'à aujourd'hui (ou hier).
  d := case when exists (select 1 from public.daily_activity where user_id = p_student and day = today) then today else today - 1 end;
  while exists (select 1 from public.daily_activity where user_id = p_student and day = d) loop
    streak := streak + 1;
    d := d - 1;
  end loop;

  return jsonb_build_object(
    'stats', jsonb_build_object(
      -- Moyenne pondérée par les coefficients du programme de la classe.
      'average20', (
        select round(sum(s.avg_score * p.coefficient) / nullif(sum(p.coefficient), 0), 2)
        from (
          select asmt.subject_id, avg(a.score_20) as avg_score
          from public.attempts a join public.assessments asmt on asmt.id = a.assessment_id
          where a.user_id = p_student and a.status = 'submitted'
          group by asmt.subject_id
        ) s
        join public.programs p on p.subject_id = s.subject_id and p.level_id = sp.level_id
          and p.series_id is not distinct from sp.series_id
      ),
      'chaptersTotal', (
        select count(*) from public.chapters c join public.programs p on p.id = c.program_id
        where p.level_id = sp.level_id and p.series_id is not distinct from sp.series_id and c.status = 'published'
      ),
      'chaptersCompleted', (
        select count(*) from public.chapters c join public.programs p on p.id = c.program_id
        where p.level_id = sp.level_id and p.series_id is not distinct from sp.series_id and c.status = 'published'
          and not exists (
            select 1 from public.lessons l
            where l.chapter_id = c.id and l.status = 'published'
              and not exists (select 1 from public.lesson_progress lp where lp.lesson_id = l.id and lp.user_id = p_student and lp.status = 'completed')
          )
      ),
      'quizzesTaken', (
        select count(*) from public.attempts a join public.assessments asmt on asmt.id = a.assessment_id
        where a.user_id = p_student and a.status = 'submitted' and asmt.kind in ('quiz', 'mock_exam')
      ),
      'streakDays', streak
    ),
    'continueLearning', (
      select coalesce(jsonb_agg(row_to_json(x)::jsonb order by x.last_update desc), '[]'::jsonb) from (
        select c.id as "chapterId", c.title as "chapterTitle", sub.code as subject, sub.name as "subjectName",
               count(*) filter (where lp.status = 'completed') as "lessonsDone", count(*) as "lessonsTotal",
               max(lp.updated_at) as last_update
        from public.chapters c
        join public.programs p on p.id = c.program_id
        join public.subjects sub on sub.id = p.subject_id
        join public.lessons l on l.chapter_id = c.id and l.status = 'published'
        left join public.lesson_progress lp on lp.lesson_id = l.id and lp.user_id = p_student
        where p.level_id = sp.level_id and c.status = 'published'
        group by c.id, c.title, sub.code, sub.name
        having count(*) filter (where lp.status = 'completed') between 1 and count(*) - 1
        order by max(lp.updated_at) desc nulls last
        limit 4
      ) x
    ),
    -- Points faibles : priorité aux matières à fort coefficient.
    'weakPoints', (
      select coalesce(jsonb_agg(row_to_json(w)::jsonb), '[]'::jsonb) from (
        select c.id as "chapterId", c.title as "chapterTitle", sub.code as subject, sub.name as "subjectName",
               m.last_score_20 as "lastScore20",
               case when m.last_score_20 < 8 then 'review_lesson' when m.last_score_20 < 10 then 'practice' else 'retake_quiz' end as action
        from public.chapter_mastery m
        join public.chapters c on c.id = m.chapter_id
        join public.programs p on p.id = c.program_id
        join public.subjects sub on sub.id = p.subject_id
        where m.user_id = p_student and m.last_score_20 < 12
        order by p.coefficient * (12 - m.last_score_20) desc
        limit 3
      ) w
    ),
    'nextExam', (
      select jsonb_build_object('type', e.exam_type, 'year', e.year, 'startsOn', e.starts_on,
                                'isOfficial', e.is_official, 'daysLeft', e.starts_on - today)
      from public.exam_sessions e
      where e.exam_type = lvl.exam_type and e.starts_on >= today
      order by e.starts_on limit 1
    )
  );
end;
$$;

-- ── Annuaire des répétiteurs ────────────────────────────────────────────────

/** Répétiteurs APPROUVÉS uniquement, champs publics seulement (jamais de téléphone). */
create or replace function public.search_tutors(
  p_subject text default null,
  p_level text default null,
  p_city text default null,
  p_mode text default null,
  p_price_max integer default null,
  p_min_rating numeric default null,
  p_sort text default 'relevance',
  p_limit integer default 20,
  p_offset integer default 0
)
returns table (
  user_id uuid, display_name text, headline text, city text, neighborhood text, mode public.teaching_mode,
  hourly_rate_fcfa integer, rating_avg numeric, rating_count integer, subjects text[], levels text[]
)
language sql
stable
security definer
set search_path = ''
as $$
  select t.user_id, pr.first_name || ' ' || pr.last_name, t.headline, c.name, n.name, t.mode,
         t.hourly_rate_fcfa, t.rating_avg, t.rating_count,
         array(select s.code from public.tutor_subjects ts join public.subjects s on s.id = ts.subject_id where ts.tutor_id = t.user_id order by s.code),
         array(select l.code from public.tutor_levels tl join public.levels l on l.id = tl.level_id where tl.tutor_id = t.user_id order by l.sort_order)
  from public.tutor_profiles t
  join public.profiles pr on pr.id = t.user_id
  left join public.cities c on c.id = t.city_id
  left join public.neighborhoods n on n.id = t.neighborhood_id
  where t.status = 'approved'
    and (p_subject is null or exists (select 1 from public.tutor_subjects ts join public.subjects s on s.id = ts.subject_id where ts.tutor_id = t.user_id and s.code = p_subject))
    and (p_level is null or exists (select 1 from public.tutor_levels tl join public.levels l on l.id = tl.level_id where tl.tutor_id = t.user_id and l.code = p_level))
    and (p_city is null or c.name = p_city)
    and (p_mode is null or t.mode::text = p_mode or t.mode = 'both')
    and (p_price_max is null or t.hourly_rate_fcfa <= p_price_max)
    and (p_min_rating is null or coalesce(t.rating_avg, 0) >= p_min_rating)
  order by
    case when p_sort = 'price' then t.hourly_rate_fcfa end asc,
    case when p_sort = 'rating' then coalesce(t.rating_avg, 0) end desc,
    coalesce(t.rating_avg, 0) * t.rating_count desc,
    t.user_id
  limit least(greatest(p_limit, 1), 50) offset greatest(p_offset, 0);
$$;

-- ── Consentement parental ───────────────────────────────────────────────────

-- File d'envoi des SMS (schéma privé) : traitée par une Edge Function avec la clé secrète.
-- Le jeton n'est jamais renvoyé au téléphone de l'élève.
create table private.sms_outbox (
  id bigint generated always as identity primary key,
  phone text not null,
  template text not null,
  params jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  sent_at timestamptz
);

create or replace function public.request_parental_consent(p_parent_phone text)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  uid uuid := auth.uid();
  token text;
begin
  if not private.is_minor(uid) then raise exception 'not_minor' using errcode = '42501'; end if;
  if exists (select 1 from public.student_profiles where user_id = uid and consent_status = 'granted') then
    raise exception 'already_granted' using errcode = '42501';
  end if;
  if p_parent_phone !~ '^\+221[0-9]{9}$' then raise exception 'invalid_phone' using errcode = '22023'; end if;
  -- Anti-abus : 3 SMS au plus par 24 h.
  if (select count(*) from public.consent_requests where student_id = uid and created_at > now() - interval '24 hours') >= 3 then
    raise exception 'too_many_requests' using errcode = '54000';
  end if;

  token := encode(extensions.gen_random_bytes(24), 'hex');
  insert into public.consent_requests (student_id, parent_phone, token_hash)
  values (uid, p_parent_phone, encode(extensions.digest(token, 'sha256'), 'hex'));
  update public.student_profiles set consent_status = 'pending' where user_id = uid;
  insert into private.sms_outbox (phone, template, params)
  values (p_parent_phone, 'parental_consent', jsonb_build_object(
    'token', token, 'child', (select first_name from public.profiles where id = uid)));
end;
$$;

/**
 * Décision du parent (lien reçu par SMS). Le parent doit être connecté avec le numéro même
 * que l'élève a indiqué (vérifié par OTP) : un élève ne peut pas valider son propre compte.
 */
create or replace function public.decide_parental_consent(p_token text, p_decision public.consent_status)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  uid uuid := auth.uid();
  req public.consent_requests%rowtype;
begin
  if private.app_role() <> 'parent' then raise exception 'parents_only' using errcode = '42501'; end if;
  if p_decision not in ('granted', 'refused') then raise exception 'invalid_decision' using errcode = '22023'; end if;

  select * into req from public.consent_requests
  where token_hash = encode(extensions.digest(p_token, 'sha256'), 'hex')
    and consumed_at is null and expires_at > now()
  for update;
  if not found then raise exception 'invalid_or_expired' using errcode = 'P0002'; end if;
  if not exists (select 1 from public.profiles where id = uid and phone = req.parent_phone) then
    raise exception 'phone_mismatch' using errcode = '42501';
  end if;

  update public.consent_requests set consumed_at = now() where id = req.id;
  update public.student_profiles set consent_status = p_decision where user_id = req.student_id;
  if p_decision = 'granted' then
    insert into public.parent_links (parent_id, student_id, status, approved_at)
    values (uid, req.student_id, 'active', now())
    on conflict (parent_id, student_id) do update set status = 'active', approved_at = now();
    insert into public.consents (subject_user_id, granted_by, type, version)
    values (req.student_id, uid, 'parental', '2026-10');
  end if;
  perform private.log_audit('consentement parental : ' || p_decision, 'student', req.student_id::text);
end;
$$;

/** Le parent saisit le code élève : lien « en attente », confirmé ensuite par l'élève. */
create or replace function public.link_child_by_code(p_code text)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  student uuid;
begin
  if private.app_role() <> 'parent' then raise exception 'parents_only' using errcode = '42501'; end if;
  select user_id into student from public.student_profiles where student_code = upper(regexp_replace(p_code, '[^A-Za-z0-9]', '', 'g'));
  if student is null then raise exception 'invalid_code' using errcode = 'P0002'; end if;
  insert into public.parent_links (parent_id, student_id, status)
  values (auth.uid(), student, 'pending')
  on conflict (parent_id, student_id) do nothing;
end;
$$;

create or replace function public.confirm_parent_link(p_parent uuid)
returns void
language sql
security definer
set search_path = ''
as $$
  update public.parent_links set status = 'active', approved_at = now()
  where parent_id = p_parent and student_id = auth.uid() and status = 'pending';
$$;

-- ── Messagerie ──────────────────────────────────────────────────────────────

/**
 * Premier contact avec un répétiteur approuvé. Un élève mineur doit avoir la validation
 * parentale ; ses parents liés sont ajoutés comme observateurs de la conversation.
 */
create or replace function public.start_conversation(p_tutor uuid, p_body text, p_student uuid default null)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  uid uuid := auth.uid();
  caller public.app_role := private.app_role();
  student uuid := case when caller = 'student' then uid else p_student end;
  conv uuid;
begin
  if caller not in ('student', 'parent') then raise exception 'families_only' using errcode = '42501'; end if;
  if caller = 'student' and not private.has_consent(uid) then raise exception 'consent_required' using errcode = '42501'; end if;
  if caller = 'parent' and student is not null and not private.is_parent_of(student) then
    raise exception 'not_your_child' using errcode = '42501';
  end if;
  if not exists (select 1 from public.tutor_profiles where user_id = p_tutor and status = 'approved') then
    raise exception 'tutor_unavailable' using errcode = 'P0002';
  end if;

  insert into public.conversations (tutor_id, student_id, parent_id, created_by)
  values (p_tutor, student, case when caller = 'parent' then uid end, uid)
  returning id into conv;

  insert into public.conversation_members (conversation_id, user_id, member_role) values (conv, p_tutor, 'tutor');
  insert into public.conversation_members (conversation_id, user_id, member_role)
  values (conv, uid, caller::text);
  if student is not null and caller = 'parent' then
    insert into public.conversation_members (conversation_id, user_id, member_role) values (conv, student, 'student');
  end if;
  if student is not null and private.is_minor(student) then
    insert into public.conversation_members (conversation_id, user_id, member_role)
    select conv, l.parent_id, 'observer' from public.parent_links l
    where l.student_id = student and l.status = 'active'
    on conflict do nothing;
  end if;

  insert into public.messages (conversation_id, sender_id, body) values (conv, uid, left(p_body, 1000));
  return conv;
end;
$$;

-- ── Répétiteurs : dossier et vérification ───────────────────────────────────

create or replace function public.submit_tutor_for_review()
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  uid uuid := auth.uid();
  t public.tutor_profiles%rowtype;
begin
  select * into t from public.tutor_profiles where user_id = uid for update;
  if not found then raise exception 'tutors_only' using errcode = '42501'; end if;
  if t.headline = '' or t.hourly_rate_fcfa = 0
     or not exists (select 1 from public.tutor_subjects where tutor_id = uid)
     or not exists (select 1 from public.tutor_levels where tutor_id = uid)
     or not exists (select 1 from public.tutor_documents where tutor_id = uid and type in ('cni', 'passport'))
     or not exists (select 1 from public.tutor_documents where tutor_id = uid and type = 'diploma') then
    raise exception 'profile_incomplete' using errcode = '22023';
  end if;
  update public.tutor_profiles set status = 'pending', submitted_at = now(), rejection_reason = null where user_id = uid;
end;
$$;

create or replace function public.review_tutor(p_tutor uuid, p_decision public.tutor_status, p_reason text default null)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not private.is_admin() then raise exception 'admins_only' using errcode = '42501'; end if;
  if p_decision not in ('approved', 'rejected', 'suspended') then raise exception 'invalid_decision' using errcode = '22023'; end if;
  if p_decision = 'rejected' and coalesce(trim(p_reason), '') = '' then raise exception 'reason_required' using errcode = '22023'; end if;

  update public.tutor_profiles set
    status = p_decision,
    verified_at = case when p_decision = 'approved' then now() else verified_at end,
    verified_by = auth.uid(),
    rejection_reason = case when p_decision = 'rejected' then p_reason end
  where user_id = p_tutor;
  if not found then raise exception 'not_found' using errcode = 'P0002'; end if;

  -- Pièces d'identité supprimées 30 jours après la décision (minimisation des données).
  update public.tutor_documents set
    status = case when p_decision = 'approved' then 'accepted' else status end,
    reviewed_by = auth.uid(), reviewed_at = now(), purge_after = current_date + 30
  where tutor_id = p_tutor and purge_after is null;

  insert into public.notifications (user_id, type, params, link)
  values (p_tutor, 'tutor_review', jsonb_build_object('decision', p_decision), '/prof/verification');
  perform private.log_audit('répétiteur : ' || p_decision, 'tutor', p_tutor::text, jsonb_build_object('reason', p_reason));
end;
$$;

-- ── Tâches planifiées (pg_cron) ─────────────────────────────────────────────

/** Copies jamais envoyées : corrigées avec les réponses sauvegardées avant la limite. */
create or replace function private.expire_attempts()
returns integer
language plpgsql
security definer
set search_path = ''
as $$
declare
  r record;
  n integer := 0;
begin
  for r in
    select id, saved_answers from public.attempts
    where status = 'in_progress' and deadline_at is not null and deadline_at < now() - interval '24 hours'
    for update skip locked
  loop
    perform private.finalize_attempt(r.id, r.saved_answers, true);
    n := n + 1;
  end loop;
  return n;
end;
$$;

create or replace function private.expire_subscriptions()
returns integer
language sql
security definer
set search_path = ''
as $$
  with expired as (
    update public.subscriptions set status = 'expired' where status = 'active' and ends_at < now() returning 1
  )
  select count(*)::integer from expired;
$$;

/** Supprime les pièces des répétiteurs après le délai (les fichiers sont effacés par l'Edge Function). */
create or replace function private.purge_tutor_documents()
returns setof text
language sql
security definer
set search_path = ''
as $$
  delete from public.tutor_documents where purge_after < current_date returning storage_path;
$$;

-- ── Droits d'exécution ──────────────────────────────────────────────────────

revoke execute on all functions in schema public from public, anon;
revoke execute on all functions in schema private from public, anon, authenticated;
grant execute on function
  private.app_role(), private.is_admin(), private.is_parent_of(uuid), private.can_view_student(uuid),
  private.is_minor(uuid), private.has_consent(uuid), private.has_premium(uuid), private.is_member(uuid),
  private.shares_conversation(uuid)
to anon, authenticated;
grant execute on function
  public.start_attempt(uuid),
  public.save_attempt_answers(uuid, jsonb),
  public.submit_attempt(uuid, jsonb, timestamptz, uuid),
  public.get_attempt_review(uuid),
  public.get_student_dashboard(uuid),
  public.request_parental_consent(text),
  public.decide_parental_consent(text, public.consent_status),
  public.link_child_by_code(text),
  public.confirm_parent_link(uuid),
  public.start_conversation(uuid, text, uuid),
  public.submit_tutor_for_review(),
  public.review_tutor(uuid, public.tutor_status, text)
to authenticated;
grant execute on function public.search_tutors(text, text, text, text, integer, numeric, text, integer, integer) to anon, authenticated;
