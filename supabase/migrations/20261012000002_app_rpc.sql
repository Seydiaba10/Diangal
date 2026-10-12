-- DIANGAL · fonctions complémentaires appelées par les écrans (branchement de l'application).

-- ── Progression ─────────────────────────────────────────────────────────────

/** « Marquer comme terminée » : progression de la leçon + activité du jour (jours d'affilée). */
create or replace function public.complete_lesson(p_lesson uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  uid uuid := auth.uid();
  l public.lessons%rowtype;
  was_done boolean;
begin
  if uid is null or private.app_role() <> 'student' then raise exception 'students_only' using errcode = '42501'; end if;
  select * into l from public.lessons where id = p_lesson and status = 'published';
  if not found then raise exception 'not_found' using errcode = 'P0002'; end if;
  if l.is_premium and not private.has_premium(uid) then raise exception 'premium_required' using errcode = '42501'; end if;

  select lp.status = 'completed' into was_done from public.lesson_progress lp where lp.user_id = uid and lp.lesson_id = p_lesson;
  insert into public.lesson_progress as lp (user_id, lesson_id, status, percent, completed_at)
  values (uid, p_lesson, 'completed', 100, now())
  on conflict (user_id, lesson_id) do update set status = 'completed', percent = 100, completed_at = coalesce(lp.completed_at, now());

  if not coalesce(was_done, false) then
    insert into public.daily_activity as d (user_id, day, lessons_completed)
    values (uid, (now() at time zone 'Africa/Dakar')::date, 1)
    on conflict (user_id, day) do update set lessons_completed = d.lessons_completed + 1;
  end if;
end;
$$;

-- ── Tentatives ──────────────────────────────────────────────────────────────

/**
 * Reprise d'un contrôle en cours (rechargement de la page, retour dans l'application) :
 * mêmes questions, même ordre d'options, même date limite. Jamais de corrigé.
 */
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
        'id', q.id, 'type', q.type, 'prompt_html', q.prompt_html, 'points', q.points,
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

-- ── Consentement et liens parent-enfant ─────────────────────────────────────

/** Page ouverte depuis le SMS : prénom et nom de l'enfant si le jeton est valide, sinon NULL. */
create or replace function public.get_consent_request(p_token text)
returns jsonb
language sql
stable
security definer
set search_path = ''
as $$
  select jsonb_build_object('child_first_name', p.first_name, 'child_last_name', p.last_name)
  from public.consent_requests r
  join public.profiles p on p.id = r.student_id
  where r.token_hash = encode(extensions.digest(p_token, 'sha256'), 'hex')
    and r.consumed_at is null and r.expires_at > now();
$$;

/** Parents qui demandent à être reliés à l'élève connecté (lien saisi avec son code élève). */
create or replace function public.get_pending_parent_links()
returns table (parent_id uuid, first_name text, last_name text, created_at timestamptz)
language sql
stable
security definer
set search_path = ''
as $$
  select l.parent_id, p.first_name, p.last_name, l.created_at
  from public.parent_links l join public.profiles p on p.id = l.parent_id
  where l.student_id = auth.uid() and l.status = 'pending'
  order by l.created_at;
$$;

/** Conditions d'utilisation et politique de confidentialité acceptées à l'inscription. */
create or replace function public.record_signup_consents(p_version text)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  uid uuid := auth.uid();
begin
  if uid is null then raise exception 'not_authenticated' using errcode = '28000'; end if;
  insert into public.consents (subject_user_id, granted_by, type, version)
  select uid, uid, t, left(p_version, 20)
  from unnest(array['terms', 'privacy']::public.consent_type[]) as t
  where not exists (
    select 1 from public.consents c
    where c.subject_user_id = uid and c.type = t and c.version = left(p_version, 20) and c.revoked_at is null
  );
end;
$$;

-- ── Répétiteurs ─────────────────────────────────────────────────────────────

/** Fiche publique d'un répétiteur approuvé (ou la sienne, ou pour l'admin). Jamais de téléphone. */
create or replace function public.get_tutor_profile(p_tutor uuid)
returns jsonb
language sql
stable
security definer
set search_path = ''
as $$
  select jsonb_build_object(
    'id', t.user_id,
    'display_name', pr.first_name || ' ' || pr.last_name,
    'first_name', pr.first_name,
    'last_name', pr.last_name,
    'status', t.status,
    'headline', t.headline,
    'bio', t.bio,
    'years_experience', t.years_experience,
    'hourly_rate_fcfa', t.hourly_rate_fcfa,
    'mode', t.mode,
    'city', c.name,
    'neighborhood', n.name,
    'photo_path', t.photo_path,
    'whatsapp_opt_in', t.whatsapp_opt_in,
    'rating_avg', t.rating_avg,
    'rating_count', t.rating_count,
    'submitted_at', t.submitted_at,
    'rejection_reason', case when t.user_id = auth.uid() or private.is_admin() then t.rejection_reason end,
    'subjects', array(select s.code from public.tutor_subjects ts join public.subjects s on s.id = ts.subject_id where ts.tutor_id = t.user_id order by s.code),
    'levels', array(select l.code from public.tutor_levels tl join public.levels l on l.id = tl.level_id where tl.tutor_id = t.user_id order by l.sort_order),
    'qualifications', coalesce((
      select jsonb_agg(jsonb_build_object('title', q.title, 'institution', q.institution, 'year', q.year) order by q.year desc nulls last)
      from public.tutor_qualifications q where q.tutor_id = t.user_id), '[]'::jsonb),
    'availability', coalesce((
      select jsonb_agg(jsonb_build_object('weekday', a.weekday, 'start', to_char(a.start_time, 'HH24:MI'), 'end', to_char(a.end_time, 'HH24:MI'))
        order by a.weekday, a.start_time)
      from public.tutor_availability a where a.tutor_id = t.user_id), '[]'::jsonb)
  )
  from public.tutor_profiles t
  join public.profiles pr on pr.id = t.user_id
  left join public.cities c on c.id = t.city_id
  left join public.neighborhoods n on n.id = t.neighborhood_id
  where t.user_id = p_tutor
    and (t.status = 'approved' or t.user_id = auth.uid() or private.is_admin());
$$;

-- ── Administration (double authentification obligatoire) ────────────────────

/** Journal d'audit des actions faites depuis l'espace admin. */
create or replace function public.admin_log(p_action text, p_entity_type text, p_entity_id text, p_meta jsonb default '{}'::jsonb)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not private.is_admin() then raise exception 'admins_only' using errcode = '42501'; end if;
  perform private.log_audit(left(p_action, 200), left(p_entity_type, 40), left(p_entity_id, 200), coalesce(p_meta, '{}'::jsonb));
end;
$$;

/** Évaluation avec ses questions ET ses corrigés (schéma privé) : lecture réservée à l'admin. */
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
          'points', q.points,
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

/** Corps de leçon modifié par l'admin (HTML déjà assaini côté serveur) : nouvelle version publiée. */
create or replace function public.admin_save_lesson_body(p_lesson uuid, p_html text)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not private.is_admin() then raise exception 'admins_only' using errcode = '42501'; end if;
  if coalesce(trim(p_html), '') = '' or char_length(p_html) > 20000 then raise exception 'invalid_body' using errcode = '22023'; end if;
  insert into public.lesson_bodies (lesson_id, body_html) values (p_lesson, p_html)
  on conflict (lesson_id) do update set body_html = excluded.body_html;
  update public.lessons set version = version + 1, published_at = now() where id = p_lesson;
  if not found then raise exception 'not_found' using errcode = 'P0002'; end if;
  perform private.log_audit('leçon modifiée', 'lesson', p_lesson::text);
end;
$$;

-- ── Messagerie : notification des autres membres ────────────────────────────

create or replace function private.notify_new_message()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.notifications (user_id, type, params, link)
  select m.user_id, 'tutor_message',
         jsonb_build_object('tutor', (select p.first_name || ' ' || p.last_name from public.profiles p where p.id = new.sender_id)),
         '/messages/' || new.conversation_id
  from public.conversation_members m
  where m.conversation_id = new.conversation_id and m.user_id <> new.sender_id;
  return new;
end;
$$;
create trigger messages_notify after insert on public.messages
  for each row execute function private.notify_new_message();

-- ── Droits d'exécution ──────────────────────────────────────────────────────

revoke execute on function
  public.complete_lesson(uuid),
  public.get_attempt_session(uuid),
  public.get_consent_request(text),
  public.get_pending_parent_links(),
  public.record_signup_consents(text),
  public.get_tutor_profile(uuid),
  public.admin_log(text, text, text, jsonb),
  public.admin_get_assessment(uuid),
  public.admin_save_lesson_body(uuid, text)
from public, anon, authenticated;
revoke execute on function private.notify_new_message() from public, anon, authenticated;

grant execute on function
  public.complete_lesson(uuid),
  public.get_attempt_session(uuid),
  public.get_pending_parent_links(),
  public.record_signup_consents(text),
  public.admin_log(text, text, text, jsonb),
  public.admin_get_assessment(uuid),
  public.admin_save_lesson_body(uuid, text)
to authenticated;
-- Ouvertes aux visiteurs : la page du lien SMS et la fiche publique d'un répétiteur.
grant execute on function public.get_consent_request(text), public.get_tutor_profile(uuid) to anon, authenticated;
