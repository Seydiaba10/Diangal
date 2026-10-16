-- DIANGAL · Suivi d'élèves par un répétiteur.
-- Le répétiteur invite un élève avec son code élève ; un parent lié (ou l'élève majeur) accepte.
-- Une fois le lien actif, il voit les notes de l'élève, lui envoie des devoirs, lui écrit et
-- planifie des cours en ligne. Il ne voit jamais la date de naissance ni le nom complet.

create type public.tutor_link_status as enum ('pending', 'active', 'declined', 'revoked');

create table public.tutor_students (
  tutor_id uuid not null references public.tutor_profiles on delete cascade,
  student_id uuid not null references public.student_profiles on delete cascade,
  status public.tutor_link_status not null default 'pending',
  invited_at timestamptz not null default now(),
  answered_by uuid references public.profiles on delete set null,
  answered_at timestamptz,
  primary key (tutor_id, student_id)
);
create index tutor_students_student_idx on public.tutor_students (student_id);
create index tutor_students_answered_by_idx on public.tutor_students (answered_by);

create table public.tutor_assignments (
  id uuid primary key default gen_random_uuid(),
  tutor_id uuid not null references public.tutor_profiles on delete cascade,
  student_id uuid not null references public.student_profiles on delete cascade,
  title text not null check (char_length(title) between 1 and 120),
  instructions text not null default '' check (char_length(instructions) <= 4000),
  due_on date,
  done_at timestamptz,
  created_at timestamptz not null default now()
);
create index tutor_assignments_tutor_idx on public.tutor_assignments (tutor_id, created_at desc);
create index tutor_assignments_student_idx on public.tutor_assignments (student_id, created_at desc);

-- Cours en ligne planifiés (la salle de visio sera branchée sur LiveKit).
create table public.tutor_sessions (
  id uuid primary key default gen_random_uuid(),
  tutor_id uuid not null references public.tutor_profiles on delete cascade,
  student_id uuid not null references public.student_profiles on delete cascade,
  starts_at timestamptz not null,
  duration_min smallint not null check (duration_min between 15 and 240),
  topic text not null check (char_length(topic) between 1 and 120),
  status text not null default 'planned' check (status in ('planned', 'cancelled')),
  created_at timestamptz not null default now()
);
create index tutor_sessions_tutor_idx on public.tutor_sessions (tutor_id, starts_at);
create index tutor_sessions_student_idx on public.tutor_sessions (student_id, starts_at);

alter table public.tutor_students enable row level security;
alter table public.tutor_assignments enable row level security;
alter table public.tutor_sessions enable row level security;

-- Lecture : le répétiteur, l'élève, ses parents liés et l'admin. Toute écriture passe par les fonctions.
create policy tutor_students_read on public.tutor_students for select to authenticated using (
  tutor_id = (select auth.uid()) or student_id = (select auth.uid()) or private.is_parent_of(student_id) or private.is_admin()
);
create policy tutor_assignments_read on public.tutor_assignments for select to authenticated using (
  tutor_id = (select auth.uid()) or student_id = (select auth.uid()) or private.is_parent_of(student_id) or private.is_admin()
);
create policy tutor_sessions_read on public.tutor_sessions for select to authenticated using (
  tutor_id = (select auth.uid()) or student_id = (select auth.uid()) or private.is_parent_of(student_id) or private.is_admin()
);

revoke all on public.tutor_students, public.tutor_assignments, public.tutor_sessions from anon, authenticated;
grant select on public.tutor_students, public.tutor_assignments, public.tutor_sessions to authenticated;

-- ── Aides ───────────────────────────────────────────────────────────────────

/** Lien actif entre le répétiteur connecté et cet élève. */
create or replace function private.is_tutor_of(student uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.tutor_students l
    where l.tutor_id = auth.uid() and l.student_id = student and l.status = 'active'
  );
$$;

/** Peut répondre pour l'élève : un parent lié, ou l'élève lui-même s'il est majeur. */
create or replace function private.answers_for_student(student uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select private.is_parent_of(student) or (student = auth.uid() and not private.is_minor(student));
$$;

/** « Awa N. » : prénom et initiale, jamais le nom complet. */
create or replace function private.short_name(person uuid)
returns text
language sql
stable
security definer
set search_path = ''
as $$
  select p.first_name || ' ' || left(p.last_name, 1) || '.' from public.profiles p where p.id = person;
$$;

/** Prévient l'élève et ses parents liés. */
create or replace function private.notify_family(student uuid, kind text, params jsonb, student_link text, parent_link text)
returns void
language sql
security definer
set search_path = ''
as $$
  insert into public.notifications (user_id, type, params, link)
  select student, kind, params, student_link
  union all
  select l.parent_id, kind, params || jsonb_build_object('child', (select first_name from public.profiles where id = student)), parent_link
  from public.parent_links l where l.student_id = student and l.status = 'active';
$$;

-- ── Lien répétiteur ↔ élève ────────────────────────────────────────────────

/** Invitation par le code élève (répétiteur vérifié uniquement). Renvoie le prénom de l'élève. */
create or replace function public.invite_student_by_code(p_code text)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  uid uuid := auth.uid();
  student uuid;
begin
  if private.app_role() <> 'tutor' then raise exception 'tutors_only' using errcode = '42501'; end if;
  if not exists (select 1 from public.tutor_profiles where user_id = uid and status = 'approved') then
    raise exception 'tutor_not_approved' using errcode = '42501';
  end if;
  select user_id into student from public.student_profiles
  where student_code = upper(regexp_replace(coalesce(p_code, ''), '[^A-Za-z0-9]', '', 'g'));
  if student is null then raise exception 'invalid_code' using errcode = 'P0002'; end if;

  insert into public.tutor_students (tutor_id, student_id) values (uid, student)
  on conflict (tutor_id, student_id) do update
    set status = 'pending', invited_at = now(), answered_by = null, answered_at = null
    where public.tutor_students.status in ('declined', 'revoked');
  -- Déjà en attente ou actif : pas de nouvelle notification.
  if not found then
    return jsonb_build_object('firstName', (select first_name from public.profiles where id = student), 'alreadyLinked', true);
  end if;

  perform private.notify_family(
    student, 'tutor_invite',
    jsonb_build_object('tutor', private.short_name(uid), 'needsParent', private.is_minor(student)),
    '/eleve/profil', '/parent/enfants/' || student
  );
  perform private.log_audit('répétiteur : invitation', 'student', student::text);
  return jsonb_build_object('firstName', (select first_name from public.profiles where id = student), 'alreadyLinked', false);
end;
$$;

/** Réponse du parent (ou de l'élève majeur) à une invitation. */
create or replace function public.answer_tutor_invite(p_tutor uuid, p_student uuid, p_accept boolean)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not private.answers_for_student(p_student) then raise exception 'not_allowed' using errcode = '42501'; end if;
  update public.tutor_students
  set status = case when p_accept then 'active' else 'declined' end::public.tutor_link_status,
      answered_by = auth.uid(), answered_at = now()
  where tutor_id = p_tutor and student_id = p_student and status = 'pending';
  if not found then raise exception 'not_found' using errcode = 'P0002'; end if;
  insert into public.notifications (user_id, type, params, link)
  values (p_tutor, 'tutor_invite_answer', jsonb_build_object('accepted', p_accept, 'student', private.short_name(p_student)), '/prof/eleves');
  perform private.log_audit('répétiteur : ' || case when p_accept then 'accepté' else 'refusé' end, 'student', p_student::text,
                            jsonb_build_object('tutor', p_tutor));
end;
$$;

/** Fin du suivi : par le répétiteur, un parent lié ou l'élève majeur. Les cours à venir sont annulés. */
create or replace function public.end_tutor_link(p_tutor uuid, p_student uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if auth.uid() is distinct from p_tutor and not private.answers_for_student(p_student) then
    raise exception 'not_allowed' using errcode = '42501';
  end if;
  update public.tutor_students set status = 'revoked', answered_by = auth.uid(), answered_at = now()
  where tutor_id = p_tutor and student_id = p_student and status in ('pending', 'active');
  if not found then raise exception 'not_found' using errcode = 'P0002'; end if;
  update public.tutor_sessions set status = 'cancelled'
  where tutor_id = p_tutor and student_id = p_student and status = 'planned' and starts_at > now();
  perform private.log_audit('répétiteur : fin du suivi', 'student', p_student::text, jsonb_build_object('tutor', p_tutor));
end;
$$;

/** Élèves du répétiteur connecté (invitations en attente comprises), avec le strict nécessaire. */
create or replace function public.get_tutor_students()
returns jsonb
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce(jsonb_agg(row_to_json(x)::jsonb order by x.status, x.name), '[]'::jsonb) from (
    select l.student_id as id, private.short_name(l.student_id) as name, lv.code as "levelCode", lv.name as "levelName",
           l.status, l.invited_at as "invitedAt",
           (select count(*) from public.tutor_assignments a where a.tutor_id = l.tutor_id and a.student_id = l.student_id and a.done_at is null)
             as "openAssignments",
           (select min(s.starts_at) from public.tutor_sessions s where s.tutor_id = l.tutor_id and s.student_id = l.student_id
              and s.status = 'planned' and s.starts_at > now()) as "nextSessionAt"
    from public.tutor_students l
    join public.student_profiles sp on sp.user_id = l.student_id
    join public.levels lv on lv.id = sp.level_id
    where l.tutor_id = auth.uid() and l.status in ('pending', 'active')
  ) x;
$$;

/** Notes d'un élève suivi : moyennes, contrôles, chapitres (aucune donnée d'identité au-delà du prénom). */
create or replace function public.get_tutor_student(p_student uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  sp public.student_profiles%rowtype;
  lvl public.levels%rowtype;
begin
  if not private.is_tutor_of(p_student) then raise exception 'not_found' using errcode = 'P0002'; end if;
  select * into sp from public.student_profiles where user_id = p_student;
  select * into lvl from public.levels where id = sp.level_id;
  return jsonb_build_object(
    'student', jsonb_build_object('id', p_student, 'name', private.short_name(p_student), 'levelCode', lvl.code, 'levelName', lvl.name),
    'stats', jsonb_build_object(
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
      'quizzesTaken', (
        select count(*) from public.attempts a where a.user_id = p_student and a.status = 'submitted'
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
      )
    ),
    'subjects', (
      select coalesce(jsonb_agg(row_to_json(x)::jsonb order by x.name), '[]'::jsonb) from (
        select sub.code, sub.name, round(avg(a.score_20), 2) as "average20", count(*) as attempts
        from public.attempts a
        join public.assessments asmt on asmt.id = a.assessment_id
        join public.subjects sub on sub.id = asmt.subject_id
        where a.user_id = p_student and a.status = 'submitted'
        group by sub.code, sub.name
      ) x
    ),
    'results', (
      select coalesce(jsonb_agg(row_to_json(r)::jsonb order by r."submittedAt" desc), '[]'::jsonb) from (
        select asmt.title, sub.code as "subjectCode", a.score_20 as "score20", a.submitted_at as "submittedAt"
        from public.attempts a
        join public.assessments asmt on asmt.id = a.assessment_id
        join public.subjects sub on sub.id = asmt.subject_id
        where a.user_id = p_student and a.status = 'submitted'
        order by a.submitted_at desc
        limit 10
      ) r
    )
  );
end;
$$;

/** Répétiteurs de la famille : ceux de mes enfants (parent) ou les miens (élève). */
create or replace function public.get_family_tutor_links()
returns jsonb
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce(jsonb_agg(row_to_json(x)::jsonb order by x."invitedAt" desc), '[]'::jsonb) from (
    select l.tutor_id as "tutorId", private.short_name(l.tutor_id) as "tutorName", t.headline,
           l.student_id as "studentId", (select first_name from public.profiles where id = l.student_id) as "studentName",
           l.status, l.invited_at as "invitedAt", private.answers_for_student(l.student_id) as "canAnswer"
    from public.tutor_students l
    join public.tutor_profiles t on t.user_id = l.tutor_id
    where (l.student_id = auth.uid() or private.is_parent_of(l.student_id)) and l.status in ('pending', 'active')
  ) x;
$$;

-- ── Devoirs ─────────────────────────────────────────────────────────────────

create or replace function public.create_tutor_assignment(p_student uuid, p_title text, p_instructions text, p_due_on date default null)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  created uuid;
begin
  if not private.is_tutor_of(p_student) then raise exception 'not_your_student' using errcode = '42501'; end if;
  if p_due_on is not null and p_due_on < (now() at time zone 'Africa/Dakar')::date then
    raise exception 'due_date_past' using errcode = '22023';
  end if;
  insert into public.tutor_assignments (tutor_id, student_id, title, instructions, due_on)
  values (auth.uid(), p_student, left(trim(p_title), 120), left(coalesce(p_instructions, ''), 4000), p_due_on)
  returning id into created;
  perform private.notify_family(
    p_student, 'tutor_assignment', jsonb_build_object('tutor', private.short_name(auth.uid()), 'title', left(trim(p_title), 120)),
    '/eleve', '/parent/enfants/' || p_student
  );
  return created;
end;
$$;

/** L'élève coche (ou décoche) un devoir fait. */
create or replace function public.set_tutor_assignment_done(p_assignment uuid, p_done boolean)
returns void
language sql
security definer
set search_path = ''
as $$
  update public.tutor_assignments set done_at = case when p_done then now() end
  where id = p_assignment and student_id = auth.uid();
$$;

create or replace function public.delete_tutor_assignment(p_assignment uuid)
returns void
language sql
security definer
set search_path = ''
as $$
  delete from public.tutor_assignments where id = p_assignment and tutor_id = auth.uid();
$$;

-- ── Cours en ligne ──────────────────────────────────────────────────────────

create or replace function public.schedule_tutor_session(p_student uuid, p_starts_at timestamptz, p_duration_min integer, p_topic text)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  created uuid;
begin
  if not private.is_tutor_of(p_student) then raise exception 'not_your_student' using errcode = '42501'; end if;
  if p_starts_at <= now() then raise exception 'session_in_past' using errcode = '22023'; end if;
  insert into public.tutor_sessions (tutor_id, student_id, starts_at, duration_min, topic)
  values (auth.uid(), p_student, p_starts_at, p_duration_min, left(trim(p_topic), 120))
  returning id into created;
  perform private.notify_family(
    p_student, 'tutor_session',
    jsonb_build_object('tutor', private.short_name(auth.uid()), 'topic', left(trim(p_topic), 120), 'startsAt', p_starts_at),
    '/eleve', '/parent/enfants/' || p_student
  );
  return created;
end;
$$;

create or replace function public.cancel_tutor_session(p_session uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  s public.tutor_sessions%rowtype;
begin
  update public.tutor_sessions set status = 'cancelled'
  where id = p_session and tutor_id = auth.uid() and status = 'planned'
  returning * into s;
  if not found then raise exception 'not_found' using errcode = 'P0002'; end if;
  perform private.notify_family(
    s.student_id, 'tutor_session_cancelled',
    jsonb_build_object('tutor', private.short_name(auth.uid()), 'topic', s.topic, 'startsAt', s.starts_at),
    '/eleve', '/parent/enfants/' || s.student_id
  );
end;
$$;

-- ── Messagerie ──────────────────────────────────────────────────────────────

/** Le répétiteur écrit à un élève suivi : conversation existante ou nouvelle (parents observateurs si mineur). */
create or replace function public.tutor_message_student(p_student uuid, p_body text)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  uid uuid := auth.uid();
  conv uuid;
begin
  if not private.is_tutor_of(p_student) then raise exception 'not_your_student' using errcode = '42501'; end if;
  if coalesce(trim(p_body), '') = '' then raise exception 'empty_message' using errcode = '22023'; end if;
  select id into conv from public.conversations
  where tutor_id = uid and student_id = p_student and status = 'open'
  order by last_message_at desc limit 1;
  if conv is null then
    insert into public.conversations (tutor_id, student_id, created_by) values (uid, p_student, uid) returning id into conv;
    insert into public.conversation_members (conversation_id, user_id, member_role) values (conv, uid, 'tutor');
    insert into public.conversation_members (conversation_id, user_id, member_role) values (conv, p_student, 'student');
    if private.is_minor(p_student) then
      insert into public.conversation_members (conversation_id, user_id, member_role)
      select conv, l.parent_id, 'observer' from public.parent_links l
      where l.student_id = p_student and l.status = 'active'
      on conflict do nothing;
    end if;
  end if;
  insert into public.messages (conversation_id, sender_id, body) values (conv, uid, left(p_body, 1000));
  return conv;
end;
$$;

-- ── Droits d'exécution ─────────────────────────────────────────────────────

revoke execute on function
  private.is_tutor_of(uuid), private.answers_for_student(uuid), private.short_name(uuid),
  private.notify_family(uuid, text, jsonb, text, text)
from public, anon, authenticated;

revoke execute on function
  public.invite_student_by_code(text), public.answer_tutor_invite(uuid, uuid, boolean), public.end_tutor_link(uuid, uuid),
  public.get_tutor_students(), public.get_tutor_student(uuid), public.get_family_tutor_links(),
  public.create_tutor_assignment(uuid, text, text, date), public.set_tutor_assignment_done(uuid, boolean),
  public.delete_tutor_assignment(uuid), public.schedule_tutor_session(uuid, timestamptz, integer, text),
  public.cancel_tutor_session(uuid), public.tutor_message_student(uuid, text)
from public, anon;

grant execute on function
  public.invite_student_by_code(text), public.answer_tutor_invite(uuid, uuid, boolean), public.end_tutor_link(uuid, uuid),
  public.get_tutor_students(), public.get_tutor_student(uuid), public.get_family_tutor_links(),
  public.create_tutor_assignment(uuid, text, text, date), public.set_tutor_assignment_done(uuid, boolean),
  public.delete_tutor_assignment(uuid), public.schedule_tutor_session(uuid, timestamptz, integer, text),
  public.cancel_tutor_session(uuid), public.tutor_message_student(uuid, text)
to authenticated;
