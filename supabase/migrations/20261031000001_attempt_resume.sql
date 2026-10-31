-- Quitter et reprendre un exercice.
-- Le lecteur enregistre les réponses et la question en cours sur le serveur (save_attempt_progress) ;
-- start_attempt rouvre la tentative encore ouverte au lieu d'en créer une nouvelle ; « Recommencer à zéro »
-- ferme une tentative sans note (abandon_attempt) ; get_my_open_attempts sert les badges « En cours ».
-- Quitter n'envoie jamais la copie : seul submit_attempt (ou la fin du temps) la corrige.

alter table public.attempts
  add column current_index smallint not null default 0 check (current_index >= 0),
  add column saved_at timestamptz;

-- Tentatives ouvertes d'un élève (badges « En cours », reprise).
create index if not exists attempts_user_open_idx on public.attempts (user_id, assessment_id, started_at desc)
  where status = 'in_progress';

-- ── Sauvegarde automatique ──────────────────────────────────────────────────

/**
 * Enregistre les réponses (copie complète) et la question en cours d'une tentative de l'élève connecté.
 * Refusée après la limite (+ 60 s de tolérance réseau) ; seules les questions de l'évaluation sont gardées.
 * Renvoie l'heure de la sauvegarde.
 */
create or replace function public.save_attempt_progress(p_attempt uuid, p_answers jsonb, p_current_index integer)
returns timestamptz
language plpgsql
security definer
set search_path = ''
as $$
declare
  a public.attempts%rowtype;
  clean jsonb;
  total integer;
begin
  if auth.uid() is null then raise exception 'not_authenticated' using errcode = '28000'; end if;
  select * into a from public.attempts where id = p_attempt and user_id = auth.uid() for update;
  if not found then raise exception 'not_found' using errcode = 'P0002'; end if;
  if a.status <> 'in_progress' then raise exception 'not_in_progress' using errcode = '42501'; end if;
  if a.deadline_at is not null and now() > a.deadline_at + interval '60 seconds' then
    raise exception 'deadline_passed' using errcode = '42501';
  end if;
  if p_answers is not null and (jsonb_typeof(p_answers) <> 'object' or octet_length(p_answers::text) > 65536) then
    raise exception 'invalid_answers' using errcode = '22023';
  end if;

  select coalesce(jsonb_object_agg(e.key, e.value), '{}'::jsonb) into clean
  from jsonb_each(coalesce(p_answers, '{}'::jsonb)) e
  join public.assessment_questions aq on aq.assessment_id = a.assessment_id and aq.question_id::text = e.key
  where jsonb_typeof(e.value) in ('string', 'array');
  select count(*)::integer into total from public.assessment_questions where assessment_id = a.assessment_id;

  update public.attempts
  set saved_answers = clean,
      current_index = least(greatest(coalesce(p_current_index, 0), 0), greatest(total - 1, 0)),
      saved_at = now()
  where id = a.id;
  return now();
end;
$$;

-- ── Démarrage ou reprise ────────────────────────────────────────────────────

-- Comme 20261016000003 (séance personnelle lancée seulement par son élève), plus la reprise : une
-- tentative encore ouverte (sans limite, ou avant la limite) est rouverte telle quelle (même ordre
-- des options, même échéance, réponses gardées). « resumed » le signale.
create or replace function public.start_attempt(p_assessment uuid)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  uid uuid := auth.uid();
  asmt public.assessments%rowtype;
  open_attempt public.attempts%rowtype;
  new_id uuid;
  deadline timestamptz;
  orders jsonb;
  resumed boolean := false;
begin
  if uid is null then raise exception 'not_authenticated' using errcode = '28000'; end if;
  if private.app_role() <> 'student' then raise exception 'students_only' using errcode = '42501'; end if;

  select * into asmt from public.assessments
  where id = p_assessment and status = 'published' and (owner_id is null or owner_id = uid);
  if not found then raise exception 'not_found' using errcode = 'P0002'; end if;
  if asmt.is_premium and not private.has_premium(uid) then
    raise exception 'premium_required' using errcode = '42501';
  end if;

  select * into open_attempt from public.attempts
  where user_id = uid and assessment_id = asmt.id and status = 'in_progress'
    and (deadline_at is null or deadline_at > now())
  order by started_at desc
  limit 1;

  if found then
    resumed := true;
    new_id := open_attempt.id;
    deadline := open_attempt.deadline_at;
    orders := open_attempt.option_order;
  else
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
  end if;

  return jsonb_build_object(
    'attempt_id', new_id,
    'resumed', resumed,
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

-- ── Lecteur : question en cours et heure de la dernière sauvegarde ─────────

-- Comme 20261025000002, plus current_index et saved_at.
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
    'current_index', a.current_index,
    'saved_at', a.saved_at,
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

-- ── « Recommencer à zéro » ─────────────────────────────────────────────────

/**
 * Ferme sans note une tentative ouverte et non chronométrée de l'élève connecté (statut « expired »,
 * jamais compté dans les moyennes). Un contrôle chronométré ne s'abandonne pas : son temps continue.
 */
create or replace function public.abandon_attempt(p_attempt uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if auth.uid() is null then raise exception 'not_authenticated' using errcode = '28000'; end if;
  update public.attempts set status = 'expired', saved_at = now()
  where id = p_attempt and user_id = auth.uid() and status = 'in_progress' and deadline_at is null;
  if not found then raise exception 'not_found' using errcode = 'P0002'; end if;
end;
$$;

-- ── Exercices en cours ─────────────────────────────────────────────────────

/** Dernière tentative ouverte de l'élève connecté pour chaque évaluation (réponses données, question en cours). */
create or replace function public.get_my_open_attempts()
returns table (
  attempt_id uuid,
  assessment_slug text,
  answered integer,
  total integer,
  current_index integer,
  saved_at timestamptz,
  deadline_at timestamptz
)
language sql
stable
security definer
set search_path = ''
as $$
  select distinct on (a.assessment_id)
    a.id, asmt.slug,
    (select count(*)::integer from jsonb_each(a.saved_answers) e
     where e.value not in ('""'::jsonb, '[]'::jsonb, 'null'::jsonb)),
    (select count(*)::integer from public.assessment_questions aq where aq.assessment_id = a.assessment_id),
    a.current_index::integer,
    coalesce(a.saved_at, a.started_at),
    a.deadline_at
  from public.attempts a
  join public.assessments asmt on asmt.id = a.assessment_id
  where a.user_id = (select auth.uid()) and a.status = 'in_progress'
    and (a.deadline_at is null or a.deadline_at > now())
  order by a.assessment_id, a.started_at desc;
$$;

revoke execute on function public.save_attempt_progress(uuid, jsonb, integer) from public, anon;
revoke execute on function public.abandon_attempt(uuid) from public, anon;
revoke execute on function public.get_my_open_attempts() from public, anon;
grant execute on function public.save_attempt_progress(uuid, jsonb, integer) to authenticated;
grant execute on function public.abandon_attempt(uuid) to authenticated;
grant execute on function public.get_my_open_attempts() to authenticated;
