-- DIANGAL · connexion par numéro et code PIN, profils d'enfants, appareils de la famille (06/11/2026).
-- Migration qui ne fait qu'ajouter : aucune table ni colonne retirée, l'ancienne connexion par code reste
-- possible (interrupteur DIANGAL_PIN_LOGIN côté site).
-- Le code PIN n'est jamais stocké : le serveur en dérive un mot de passe (HMAC avec une clé secrète),
-- que Supabase Auth hache et vérifie lui-même. Le blocage progressif et le journal sont tenus ici.

-- ── Blocage progressif ───────────────────────────────────────────────────
-- Une clé par identité (« phone:+221… », « email:… », « child:<uuid> ») et par adresse IP (« ip:… »).
create table private.auth_guard (
  key text primary key check (char_length(key) between 4 and 200),
  failures integer not null default 0,
  locked_until timestamptz,
  window_start timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

/**
 * État d'une clé : bloquée (et pour combien de secondes), récupération obligatoire (15 erreurs d'affilée
 * sur un compte : seul un code reçu sur le téléphone débloque). Clé secrète uniquement.
 */
create or replace function public.auth_guard_status(p_key text)
returns table (locked boolean, retry_after integer, needs_recovery boolean, failures integer)
language sql
stable
security definer
set search_path = ''
as $$
  select
    coalesce(g.locked_until > now(), false),
    case
      when g.locked_until is null or g.locked_until = 'infinity'::timestamptz or g.locked_until <= now() then 0
      else ceil(extract(epoch from (g.locked_until - now())))::integer
    end,
    coalesce(g.locked_until = 'infinity'::timestamptz, false),
    coalesce(g.failures, 0)
  from (select 1) as one
  left join private.auth_guard g on g.key = p_key;
$$;

/**
 * Une erreur de plus. Compte : 5 erreurs = 15 minutes, 10 = 1 heure, 15 = récupération obligatoire.
 * Adresse IP : 30 erreurs en 15 minutes (tous comptes confondus) = 15 minutes de blocage.
 */
create or replace function public.auth_guard_fail(p_key text)
returns table (locked boolean, retry_after integer, needs_recovery boolean, failures integer)
language plpgsql
security definer
set search_path = ''
as $$
#variable_conflict use_column
declare
  is_ip constant boolean := p_key like 'ip:%';
  n integer;
begin
  insert into private.auth_guard as g (key, failures, window_start, updated_at)
  values (p_key, 1, now(), now())
  on conflict (key) do update set
    failures = case when is_ip and g.window_start < now() - interval '15 minutes' then 1 else g.failures + 1 end,
    window_start = case when is_ip and g.window_start < now() - interval '15 minutes' then now() else g.window_start end,
    updated_at = now()
  returning g.failures into n;

  update private.auth_guard set locked_until = case
      when is_ip and n >= 30 then now() + interval '15 minutes'
      when not is_ip and n >= 15 then 'infinity'::timestamptz
      when not is_ip and n = 10 then now() + interval '1 hour'
      when not is_ip and n = 5 then now() + interval '15 minutes'
      else locked_until
    end
  where key = p_key;

  return query select * from public.auth_guard_status(p_key);
end;
$$;

/** Connexion réussie : les erreurs de cette identité sont oubliées (pas celles de l'adresse IP). */
create or replace function public.auth_guard_success(p_key text)
returns void
language sql
security definer
set search_path = ''
as $$
  delete from private.auth_guard where key = p_key and key not like 'ip:%';
$$;

/** Récupération par code reçu, ou code PIN d'un enfant changé par son parent : blocage levé. */
create or replace function public.auth_guard_clear(p_key text)
returns void
language sql
security definer
set search_path = ''
as $$
  delete from private.auth_guard where key = p_key;
$$;

-- ── Journal des connexions ───────────────────────────────────────────────
-- Aucun numéro ni email en clair : identifiant masqué, adresse IP tronquée, type d'appareil. 90 jours.
create table private.auth_events (
  id bigint generated always as identity primary key,
  user_id uuid references public.profiles on delete set null,
  kind text not null check (kind in (
    'pin_login', 'pin_failure', 'pin_locked', 'pin_set', 'pin_reset', 'pin_changed',
    'reauth', 'reauth_failure', 'child_login', 'child_failure', 'child_pin_set',
    'password_login', 'password_failure', 'password_reset', 'device_added', 'device_removed', 'logout_all'
  )),
  subject text check (char_length(subject) <= 80),
  ip_prefix text check (char_length(ip_prefix) <= 64),
  device text check (char_length(device) <= 20),
  created_at timestamptz not null default now()
);
create index auth_events_user_idx on private.auth_events (user_id, created_at desc);
create index auth_events_created_idx on private.auth_events (created_at);

create or replace function public.auth_log_event(
  p_user uuid,
  p_kind text,
  p_subject text default null,
  p_ip text default null,
  p_device text default null
)
returns void
language sql
security definer
set search_path = ''
as $$
  insert into private.auth_events (user_id, kind, subject, ip_prefix, device)
  values (p_user, p_kind, left(p_subject, 80), left(p_ip, 64), left(p_device, 20));
$$;

/** Journal des connexions pour l'admin (double authentification exigée). */
create or replace function public.admin_auth_events(p_limit integer default 200)
returns table (
  id bigint,
  created_at timestamptz,
  kind text,
  user_id uuid,
  first_name text,
  role text,
  subject text,
  ip_prefix text,
  device text
)
language plpgsql
stable
security definer
set search_path = ''
as $$
#variable_conflict use_column
begin
  if not private.is_admin() then raise exception 'admins_only' using errcode = '42501'; end if;
  return query
    select e.id, e.created_at, e.kind, e.user_id, p.first_name, p.role::text, e.subject, e.ip_prefix, e.device
    from private.auth_events e
    left join public.profiles p on p.id = e.user_id
    order by e.created_at desc, e.id desc
    limit least(greatest(coalesce(p_limit, 200), 1), 500);
end;
$$;

-- ── Codes PIN enregistrés ────────────────────────────────────────────────
-- Seulement la date et la version de la clé de dérivation : le code lui-même n'est nulle part.
create table private.pin_credentials (
  user_id uuid primary key references public.profiles on delete cascade,
  kind text not null check (kind in ('phone', 'child')),
  pepper_version smallint not null default 1 check (pepper_version between 1 and 99),
  set_at timestamptz not null default now()
);

create or replace function public.mark_pin_set(p_user uuid, p_kind text, p_version smallint default 1)
returns void
language sql
security definer
set search_path = ''
as $$
  insert into private.pin_credentials (user_id, kind, pepper_version, set_at)
  values (p_user, p_kind, p_version, now())
  on conflict (user_id) do update set kind = excluded.kind, pepper_version = excluded.pepper_version, set_at = now();
$$;

create or replace function public.get_pin_credential(p_user uuid)
returns table (kind text, pepper_version smallint, set_at timestamptz)
language sql
stable
security definer
set search_path = ''
as $$
  select c.kind, c.pepper_version, c.set_at from private.pin_credentials c where c.user_id = p_user;
$$;

/** Date du code PIN du compte connecté (null : pas encore de code PIN). */
create or replace function public.get_my_pin_status()
returns timestamptz
language sql
stable
security definer
set search_path = ''
as $$
  select c.set_at from private.pin_credentials c where c.user_id = auth.uid();
$$;

/**
 * Vérifie un mot de passe (dérivé du code PIN) contre celui que Supabase Auth a enregistré, sans ouvrir de
 * session : nouvelle vérification avant une opération sensible. Clé secrète uniquement.
 */
create or replace function public.verify_user_password(p_user uuid, p_password text)
returns boolean
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  stored text;
begin
  select u.encrypted_password into stored from auth.users u where u.id = p_user and u.deleted_at is null;
  if stored is null or stored = '' or coalesce(p_password, '') = '' then return false; end if;
  return stored = extensions.crypt(p_password, stored);
end;
$$;

-- ── Nouvelle vérification avant une opération sensible ───────────────────
create table private.reauth_marks (
  session_id uuid primary key,
  user_id uuid not null references public.profiles on delete cascade,
  at timestamptz not null default now()
);
create index reauth_marks_user_idx on private.reauth_marks (user_id);

/** Le code PIN vient d'être vérifié pour cette session. Clé secrète uniquement. */
create or replace function public.mark_reauth(p_user uuid, p_session uuid)
returns void
language sql
security definer
set search_path = ''
as $$
  insert into private.reauth_marks (session_id, user_id, at) values (p_session, p_user, now())
  on conflict (session_id) do update set user_id = excluded.user_id, at = now();
$$;

/** Code PIN vérifié il y a moins de p_max pour la session en cours, ou connexion de moins de p_max. */
create or replace function private.recent_reauth(p_max interval default interval '5 minutes')
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select private.recent_login(p_max) or exists (
    select 1 from private.reauth_marks r
    where r.session_id = nullif(auth.jwt() ->> 'session_id', '')::uuid
      and r.user_id = auth.uid()
      and r.at > now() - p_max
  );
$$;

/** Ferme toutes les sessions d'un compte (code PIN changé, appareil perdu). Clé secrète uniquement. */
create or replace function public.revoke_user_sessions(p_user uuid)
returns integer
language plpgsql
security definer
set search_path = ''
as $$
declare
  n integer;
begin
  delete from auth.sessions where user_id = p_user;
  get diagnostics n = row_count;
  return n;
end;
$$;

-- ── Enfants sans téléphone : code PIN géré par le parent ─────────────────
-- Le code PIN d'un enfant n'est plus haché ici : il devient le mot de passe dérivé de son compte.
alter table private.child_logins alter column pin_hash drop not null;

/**
 * Le parent va donner (ou changer) le code PIN d'un enfant relié : contrôle du lien et de la nouvelle
 * vérification, blocage levé. Le serveur enregistre ensuite le mot de passe dérivé dans Supabase Auth.
 */
create or replace function public.authorize_child_pin_change(p_student uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if private.app_role() <> 'parent' or not private.is_parent_of(p_student) then
    raise exception 'not_your_child' using errcode = '42501';
  end if;
  if not private.recent_reauth(interval '5 minutes') then raise exception 'reauth_required' using errcode = '42501'; end if;
  perform private.ensure_family_code(auth.uid());
  insert into private.child_logins (student_id, parent_id, pin_hash)
  values (p_student, auth.uid(), null)
  on conflict (student_id) do update set
    parent_id = excluded.parent_id, pin_hash = null, failed_attempts = 0, locked_until = null, updated_at = now();
  delete from private.auth_guard where key = 'child:' || p_student::text;
end;
$$;

/**
 * Profil d'un jeune enfant créé par son parent (compte sans email ni téléphone créé par le serveur) :
 * lien actif, validation parentale, connexion par code PIN. Comme register_managed_child, sans stocker
 * le code PIN. Clé secrète uniquement.
 */
create or replace function public.register_managed_child_v2(p_parent uuid, p_child uuid)
returns text
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not exists (select 1 from public.profiles where id = p_parent and role = 'parent') then
    raise exception 'parents_only' using errcode = '42501';
  end if;
  if not exists (select 1 from public.student_profiles where user_id = p_child)
     or exists (select 1 from public.parent_links where student_id = p_child) then
    raise exception 'invalid_child' using errcode = '22023';
  end if;
  insert into public.parent_links (parent_id, student_id, status, relationship, approved_at)
  values (p_parent, p_child, 'active', 'parent', now());
  update public.student_profiles set consent_status = 'granted' where user_id = p_child;
  insert into public.consents (subject_user_id, granted_by, type, version)
  values (p_child, p_parent, 'parental', '2026-10');
  insert into private.child_logins (student_id, parent_id, pin_hash) values (p_child, p_parent, null);
  return private.ensure_family_code(p_parent);
end;
$$;

/** Enfants reliés au parent connecté qui ont un code PIN (blocage : ancien compteur ou nouveau). */
create or replace function public.get_my_child_logins()
returns table (student_id uuid, locked boolean, updated_at timestamptz)
language sql
stable
security definer
set search_path = ''
as $$
  select
    c.student_id,
    coalesce(c.locked_until > now(), false)
      or exists (select 1 from private.auth_guard g where g.key = 'child:' || c.student_id::text and g.locked_until > now()),
    c.updated_at
  from private.child_logins c
  where c.parent_id = auth.uid() and private.is_parent_of(c.student_id);
$$;

/** Parent de l'enfant (connexion d'un enfant, avant toute session). Clé secrète uniquement. */
create or replace function public.child_login_parent(p_student uuid)
returns uuid
language sql
stable
security definer
set search_path = ''
as $$
  select c.parent_id from private.child_logins c
  where c.student_id = p_student and private.is_parent_of_as(c.parent_id, c.student_id);
$$;

-- ── Appareils de la famille ──────────────────────────────────────────────
-- Un téléphone ou un ordinateur où les profils des enfants s'affichent sans code famille. Le jeton reste
-- dans un cookie protégé de l'appareil ; la base n'en garde que l'empreinte (SHA-256).
create table private.family_devices (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid not null references public.profiles on delete cascade,
  token_hash text not null unique check (token_hash ~ '^[0-9a-f]{64}$'),
  label text not null check (char_length(label) between 1 and 60),
  created_at timestamptz not null default now(),
  last_used_at timestamptz not null default now(),
  revoked_at timestamptz
);
create index family_devices_parent_idx on private.family_devices (parent_id);

/** Le parent ajoute cet appareil (code PIN vérifié il y a moins de 5 minutes ; 10 appareils au plus). */
create or replace function public.register_family_device(p_token_hash text, p_label text)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  new_id uuid;
begin
  if private.app_role() <> 'parent' then raise exception 'parents_only' using errcode = '42501'; end if;
  if not private.recent_reauth(interval '5 minutes') then raise exception 'reauth_required' using errcode = '42501'; end if;
  if (select count(*) from private.family_devices where parent_id = auth.uid() and revoked_at is null) >= 10 then
    raise exception 'too_many_devices' using errcode = '22023';
  end if;
  insert into private.family_devices (parent_id, token_hash, label)
  values (auth.uid(), lower(p_token_hash), left(coalesce(nullif(trim(p_label), ''), 'Appareil'), 60))
  returning id into new_id;
  return new_id;
end;
$$;

create or replace function public.get_my_family_devices()
returns table (id uuid, label text, created_at timestamptz, last_used_at timestamptz)
language sql
stable
security definer
set search_path = ''
as $$
  select d.id, d.label, d.created_at, d.last_used_at
  from private.family_devices d
  where d.parent_id = auth.uid() and d.revoked_at is null
  order by d.last_used_at desc;
$$;

create or replace function public.revoke_family_device(p_id uuid)
returns void
language sql
security definer
set search_path = ''
as $$
  update private.family_devices set revoked_at = now()
  where id = p_id and parent_id = auth.uid() and revoked_at is null;
$$;

/**
 * Profils affichés sur un appareil de la famille : prénom du parent, enfants qui ont un code PIN.
 * Rien si le jeton est inconnu ou retiré. Clé secrète uniquement.
 */
create or replace function public.family_device_children(p_token_hash text)
returns table (parent_id uuid, parent_first_name text, student_id uuid, first_name text, avatar_key text)
language plpgsql
security definer
set search_path = ''
as $$
#variable_conflict use_column
declare
  device private.family_devices%rowtype;
begin
  select * into device from private.family_devices
  where token_hash = lower(coalesce(p_token_hash, '')) and revoked_at is null;
  if not found then return; end if;
  update private.family_devices set last_used_at = now() where id = device.id;
  return query
    select device.parent_id, pp.first_name, p.id, p.first_name, p.avatar_key
    from private.child_logins c
    join public.profiles p on p.id = c.student_id
    join public.profiles pp on pp.id = device.parent_id
    where c.parent_id = device.parent_id and private.is_parent_of_as(device.parent_id, c.student_id)
    order by p.first_name;
end;
$$;

-- ── Droits ──────────────────────────────────────────────────────────────
revoke all on private.auth_guard, private.auth_events, private.pin_credentials, private.reauth_marks, private.family_devices
from public, anon, authenticated;

revoke execute on function
  public.auth_guard_status(text), public.auth_guard_fail(text), public.auth_guard_success(text), public.auth_guard_clear(text),
  public.auth_log_event(uuid, text, text, text, text), public.admin_auth_events(integer),
  public.mark_pin_set(uuid, text, smallint), public.get_pin_credential(uuid), public.get_my_pin_status(),
  public.verify_user_password(uuid, text), public.mark_reauth(uuid, uuid), private.recent_reauth(interval),
  public.revoke_user_sessions(uuid), public.authorize_child_pin_change(uuid), public.register_managed_child_v2(uuid, uuid),
  public.child_login_parent(uuid), public.register_family_device(text, text), public.get_my_family_devices(),
  public.revoke_family_device(uuid), public.family_device_children(text)
from public, anon, authenticated;

grant execute on function
  public.admin_auth_events(integer), public.get_my_pin_status(), public.authorize_child_pin_change(uuid),
  public.register_family_device(text, text), public.get_my_family_devices(), public.revoke_family_device(uuid)
to authenticated;

do $$
begin
  if exists (select 1 from pg_roles where rolname = 'service_role') then
    grant execute on function
      public.auth_guard_status(text), public.auth_guard_fail(text), public.auth_guard_success(text), public.auth_guard_clear(text),
      public.auth_log_event(uuid, text, text, text, text), public.mark_pin_set(uuid, text, smallint),
      public.get_pin_credential(uuid), public.verify_user_password(uuid, text), public.mark_reauth(uuid, uuid),
      public.revoke_user_sessions(uuid), public.register_managed_child_v2(uuid, uuid), public.child_login_parent(uuid),
      public.family_device_children(text)
    to service_role;
  end if;
end;
$$;

-- ── Nettoyage planifié (ignoré sans pg_cron, comme les autres tâches) ───────
do $outer$
begin
  if not exists (select 1 from pg_available_extensions where name = 'pg_cron') then
    raise notice 'pg_cron indisponible : nettoyage du journal des connexions ignoré';
    return;
  end if;
  create extension if not exists pg_cron;
  perform cron.schedule(
    'diangal-purge-auth-events', '40 3 * * *',
    $q$
      delete from private.auth_events where created_at < now() - interval '90 days';
      delete from private.reauth_marks where at < now() - interval '1 day';
      delete from private.auth_guard where locked_until is distinct from 'infinity'::timestamptz and updated_at < now() - interval '30 days';
    $q$
  );
end;
$outer$;
