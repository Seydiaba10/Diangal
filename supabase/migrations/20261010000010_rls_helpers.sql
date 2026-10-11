-- DIANGAL · fonctions utilisées par les règles RLS (schéma privé, SECURITY DEFINER).

-- Rôle courant : claim « user_role » du JWT (Custom Access Token Hook), sinon le profil.
create or replace function private.app_role()
returns public.app_role
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce(
    nullif(auth.jwt() ->> 'user_role', '')::public.app_role,
    (select p.role from public.profiles p where p.id = auth.uid())
  );
$$;

-- Administrateur avec double authentification (assurance aal2) obligatoire.
create or replace function private.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce(private.app_role() = 'admin' and auth.jwt() ->> 'aal' = 'aal2', false);
$$;

create or replace function private.is_parent_of(student uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.parent_links l
    where l.parent_id = auth.uid() and l.student_id = student and l.status = 'active'
  );
$$;

create or replace function private.can_view_student(student uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select student = auth.uid() or private.is_parent_of(student) or private.is_admin();
$$;

create or replace function private.is_minor(person uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.student_profiles s
    where s.user_id = person and s.birth_date > current_date - interval '18 years'
  );
$$;

-- Mode limité : un élève mineur sans validation parentale n'a ni messagerie ni paiement.
create or replace function private.has_consent(person uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select not private.is_minor(person)
    or exists (select 1 from public.student_profiles s where s.user_id = person and s.consent_status = 'granted');
$$;

create or replace function private.has_premium(student uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select student is not null and exists (
    select 1 from public.subscriptions s
    where s.student_id = student and s.status = 'active' and now() between s.starts_at and s.ends_at
  );
$$;

create or replace function private.is_member(conversation uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.conversation_members m
    where m.conversation_id = conversation and m.user_id = auth.uid()
  );
$$;

-- Vrai si les deux personnes partagent une conversation (le répétiteur voit le prénom de l'élève).
create or replace function private.shares_conversation(other uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.conversation_members me
    join public.conversation_members them on them.conversation_id = me.conversation_id
    where me.user_id = auth.uid() and them.user_id = other
  );
$$;

create or replace function private.log_audit(action text, entity_type text, entity_id text, meta jsonb default '{}'::jsonb)
returns void
language sql
security definer
set search_path = ''
as $$
  insert into public.audit_logs (actor_id, action, entity_type, entity_id, meta)
  values (auth.uid(), action, entity_type, entity_id, meta);
$$;

grant usage on schema private to anon, authenticated;
revoke execute on all functions in schema private from public;
grant execute on function
  private.app_role(),
  private.is_admin(),
  private.is_parent_of(uuid),
  private.can_view_student(uuid),
  private.is_minor(uuid),
  private.has_consent(uuid),
  private.has_premium(uuid),
  private.is_member(uuid),
  private.shares_conversation(uuid)
to anon, authenticated;
