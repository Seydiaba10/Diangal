-- DIANGAL · gestion des comptes (22/10/2026).
-- 1. Numéros internationaux (E.164) : le +221 reste le défaut, la liste des pays ouverts est
--    réglée côté serveur (DIANGAL_PHONE_COUNTRIES) et dans les fonctions d'envoi.
-- 2. Suppression de compte (loi n° 2008-12, CDP) : anonymisation en base, puis suppression de
--    l'identité de connexion par le serveur (Supabase Auth). Les paiements, abonnements et
--    consentements sont gardés (obligations comptables et preuve), rattachés à un profil anonyme.
--    - un élève majeur, un élève sans parent relié, un parent ou un répétiteur : suppression directe ;
--    - un élève mineur relié à un parent : demande, que le parent accepte ou refuse ;
--    - un parent peut supprimer le compte de son enfant mineur relié ;
--    - un parent qui gère encore des profils d'enfants sans email (connexion par code PIN) doit
--      d'abord les supprimer : aucun compte lié n'est supprimé automatiquement ;
--    - un administrateur ne se supprime pas lui-même.
--    Toute suppression exige une connexion récente (moins de 15 min, claim « amr » du JWT).

-- ── 1. Numéros au format E.164 ───────────────────────────────────────────────

alter table public.profiles drop constraint if exists profiles_phone_check;
alter table public.profiles add constraint profiles_phone_check check (phone ~ '^\+[1-9][0-9]{7,14}$');
alter table public.consent_requests drop constraint if exists consent_requests_parent_phone_check;
alter table public.consent_requests add constraint consent_requests_parent_phone_check
  check (parent_phone ~ '^\+[1-9][0-9]{7,14}$');
alter table public.tutor_private drop constraint if exists tutor_private_whatsapp_e164_check;
alter table public.tutor_private add constraint tutor_private_whatsapp_e164_check
  check (whatsapp_e164 ~ '^\+[1-9][0-9]{7,14}$');
-- Le numéro de versement reste sénégalais (mobile money).
alter table private.otp_channels drop constraint if exists otp_channels_phone_check;
alter table private.otp_channels add constraint otp_channels_phone_check check (phone ~ '^\+[1-9][0-9]{7,14}$');

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
  if p_parent_phone !~ '^\+[1-9][0-9]{7,14}$' then raise exception 'invalid_phone' using errcode = '22023'; end if;
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
 * Recopie dans le profil le téléphone et l'email vérifiés par Supabase Auth (après l'ajout d'un
 * numéro depuis « Mon compte »). Un numéro déjà utilisé par un autre compte est refusé par
 * l'unicité de profiles.phone.
 */
create or replace function public.sync_my_contact()
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  uid uuid := auth.uid();
  u record;
begin
  if uid is null then raise exception 'not_authenticated' using errcode = '42501'; end if;
  select phone, email into u from auth.users where id = uid;
  update public.profiles set
    phone = case when coalesce(u.phone, '') = '' then phone
                 when left(u.phone, 1) = '+' then u.phone else '+' || u.phone end,
    email = coalesce(nullif(u.email, ''), email)
  where id = uid and deleted_at is null;
end;
$$;

-- ── 2. Suppression de compte ─────────────────────────────────────────────────

create table public.account_deletion_requests (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.profiles on delete cascade,
  status text not null default 'pending' check (status in ('pending', 'approved', 'refused', 'cancelled')),
  requested_at timestamptz not null default now(),
  decided_by uuid references public.profiles on delete set null,
  decided_at timestamptz
);
create unique index account_deletion_requests_pending_idx on public.account_deletion_requests (student_id)
  where status = 'pending';
create index account_deletion_requests_student_idx on public.account_deletion_requests (student_id, requested_at desc);
create index account_deletion_requests_decided_by_idx on public.account_deletion_requests (decided_by);

alter table public.account_deletion_requests enable row level security;
grant select on public.account_deletion_requests to authenticated;
-- Lecture : l'élève, ses parents liés et l'admin. Écriture : fonctions ci-dessous seulement.
create policy account_deletion_requests_read on public.account_deletion_requests for select to authenticated
  using (private.can_view_student(student_id));

/** Connexion récente : un facteur d'authentification (code, lien, réseau social) validé il y a moins de p_max. */
create or replace function private.recent_login(p_max interval)
returns boolean
language sql
stable
set search_path = ''
as $$
  select coalesce(
    (select max((a ->> 'timestamp')::bigint) from jsonb_array_elements(
      case when jsonb_typeof(auth.jwt() -> 'amr') = 'array' then auth.jwt() -> 'amr' else '[]'::jsonb end) a)
      >= extract(epoch from now() - p_max),
    false);
$$;

/** Profil d'enfant créé par le parent, sans email ni téléphone (connexion par code PIN). */
create or replace function private.is_managed_child(p_student uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (select 1 from public.profiles where id = p_student and email like '%@enfant.diangal.invalid');
$$;

/**
 * Ce que p_actor peut faire du compte p_target :
 * direct · parent_approval (élève mineur relié) · blocked_admin · blocked_managed_children ·
 * not_allowed · not_found.
 */
create or replace function private.deletion_mode(p_actor uuid, p_target uuid)
returns text
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  target public.profiles%rowtype;
begin
  select * into target from public.profiles where id = p_target;
  if not found or target.deleted_at is not null then return 'not_found'; end if;

  if p_actor = p_target then
    if target.role = 'admin' then return 'blocked_admin'; end if;
    if target.role = 'student' and private.is_minor(p_target) and exists (
      select 1 from public.parent_links where student_id = p_target and status = 'active'
    ) then
      return 'parent_approval';
    end if;
    if target.role = 'parent' and exists (
      select 1 from public.parent_links l join public.profiles c on c.id = l.student_id
      where l.parent_id = p_target and l.status = 'active' and c.deleted_at is null
        and private.is_managed_child(l.student_id)
    ) then
      return 'blocked_managed_children';
    end if;
    return 'direct';
  end if;

  -- Un parent relié supprime le compte de son enfant mineur (un majeur décide seul).
  if target.role = 'student' and private.is_parent_of_as(p_actor, p_target) then
    return case when private.is_minor(p_target) then 'direct' else 'not_allowed' end;
  end if;
  return 'not_allowed';
end;
$$;

/**
 * Anonymisation (schéma privé, appelée par les fonctions publiques après les contrôles).
 * Efface les données personnelles et l'activité, garde la trace comptable et les consentements.
 */
create or replace function private.anonymize_account(p_target uuid, p_actor uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  target public.profiles%rowtype;
begin
  select * into target from public.profiles where id = p_target for update;
  if not found or target.deleted_at is not null then raise exception 'not_found' using errcode = 'P0002'; end if;

  -- Identité
  update public.profiles set first_name = 'Compte', last_name = 'supprimé', phone = null, email = null,
    city_id = null, avatar_key = null, deleted_at = now()
  where id = p_target;
  delete from private.otp_channels where phone = target.phone;

  -- Élève : progression, résultats, séances personnelles, historique des classes
  update public.student_profiles set birth_date = date '2000-01-01', school_name = null,
    student_code = private.generate_student_code()
  where user_id = p_target;
  delete from public.attempts where user_id = p_target;
  delete from public.assessments where owner_id = p_target;
  delete from public.lesson_progress where user_id = p_target;
  delete from public.chapter_mastery where user_id = p_target;
  delete from public.daily_activity where user_id = p_target;
  delete from public.student_level_history where student_id = p_target;
  delete from public.consent_requests where student_id = p_target;
  update public.account_deletion_requests set status = 'cancelled', decided_at = now()
  where student_id = p_target and status = 'pending';

  -- Liens familiaux : révoqués des deux côtés. Un enfant qui perd son seul parent validé
  -- repasse en mode limité (une nouvelle validation parentale sera demandée).
  update public.parent_links set status = 'revoked' where (parent_id = p_target or student_id = p_target) and status <> 'revoked';
  update public.student_profiles s set consent_status = 'pending'
  where s.consent_status = 'granted'
    and s.user_id in (select student_id from public.parent_links where parent_id = p_target)
    and private.is_minor(s.user_id)
    and not exists (select 1 from public.parent_links l where l.student_id = s.user_id and l.status = 'active');
  delete from private.family_codes where parent_id = p_target;
  delete from private.child_logins where student_id = p_target or parent_id = p_target;

  -- Répétiteur : retiré de l'annuaire, pièces et coordonnées effacées (fichiers : par le serveur)
  update public.tutor_profiles set status = 'suspended', headline = '', bio = '', photo_path = null,
    whatsapp_opt_in = false, city_id = null, neighborhood_id = null
  where user_id = p_target;
  delete from public.tutor_private where user_id = p_target;
  delete from public.tutor_documents where tutor_id = p_target;
  delete from public.tutor_availability where tutor_id = p_target;
  delete from public.tutor_qualifications where tutor_id = p_target;
  update public.tutor_students set status = 'revoked', answered_at = coalesce(answered_at, now())
  where (tutor_id = p_target or student_id = p_target) and status in ('pending', 'active');
  update public.tutor_sessions set status = 'cancelled'
  where (tutor_id = p_target or student_id = p_target) and status = 'planned' and starts_at > now();

  -- Messagerie : messages effacés, conversations quittées
  update public.messages set body = '[message supprimé]', deleted_at = coalesce(deleted_at, now())
  where sender_id = p_target;
  delete from public.conversation_members where user_id = p_target;
  delete from public.notifications where user_id = p_target;
  delete from public.push_subscriptions where user_id = p_target;

  insert into public.audit_logs (actor_id, action, entity_type, entity_id, meta)
  values (p_actor, 'compte supprimé (anonymisé)', 'profile', p_target::text,
    jsonb_build_object('role', target.role, 'by', case when p_actor = p_target then 'self' else 'parent' end));
end;
$$;

/** État affiché sur la page « Supprimer mon compte » (ou celle d'un enfant). */
create or replace function public.get_account_deletion_status(p_target uuid default null)
returns jsonb
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  uid uuid := auth.uid();
  target uuid := coalesce(p_target, uid);
begin
  if uid is null then raise exception 'not_authenticated' using errcode = '42501'; end if;
  if target <> uid and not private.is_parent_of_as(uid, target) then
    raise exception 'not_allowed' using errcode = '42501';
  end if;
  return jsonb_build_object(
    'mode', private.deletion_mode(uid, target),
    'recentLogin', private.recent_login(interval '15 minutes'),
    'pendingRequest', (select jsonb_build_object('id', id, 'requestedAt', requested_at)
                       from public.account_deletion_requests where student_id = target and status = 'pending'),
    'managedChildren', (select coalesce(jsonb_agg(jsonb_build_object('id', c.id, 'firstName', c.first_name)), '[]'::jsonb)
                        from public.parent_links l join public.profiles c on c.id = l.student_id
                        where target = uid and l.parent_id = uid and l.status = 'active' and c.deleted_at is null
                          and private.is_managed_child(c.id))
  );
end;
$$;

/** Suppression immédiate (soi-même, ou enfant mineur relié). Connexion récente obligatoire. */
create or replace function public.delete_account(p_target uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  uid uuid := auth.uid();
  mode text;
begin
  if uid is null then raise exception 'not_authenticated' using errcode = '42501'; end if;
  mode := private.deletion_mode(uid, p_target);
  if mode <> 'direct' then raise exception '%', mode using errcode = '42501'; end if;
  if not private.recent_login(interval '15 minutes') then raise exception 'reauth_required' using errcode = '42501'; end if;
  perform private.anonymize_account(p_target, uid);
end;
$$;

/** Élève mineur relié : demande de suppression, envoyée à ses parents. */
create or replace function public.request_account_deletion()
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  uid uuid := auth.uid();
  request_id uuid;
  child text;
begin
  if private.deletion_mode(uid, uid) <> 'parent_approval' then raise exception 'not_needed' using errcode = '42501'; end if;
  select id into request_id from public.account_deletion_requests where student_id = uid and status = 'pending';
  if request_id is not null then return request_id; end if;

  insert into public.account_deletion_requests (student_id) values (uid) returning id into request_id;
  select first_name into child from public.profiles where id = uid;
  insert into public.notifications (user_id, type, params, link)
  select l.parent_id, 'account_deletion_request', jsonb_build_object('child', child), '/compte/suppression?enfant=' || uid
  from public.parent_links l where l.student_id = uid and l.status = 'active';
  perform private.log_audit('demande de suppression de compte', 'profile', uid::text);
  return request_id;
end;
$$;

create or replace function public.cancel_account_deletion_request()
returns void
language sql
security definer
set search_path = ''
as $$
  update public.account_deletion_requests set status = 'cancelled', decided_by = auth.uid(), decided_at = now()
  where student_id = auth.uid() and status = 'pending';
$$;

/** Réponse du parent : accepter supprime le compte de l'enfant (connexion récente exigée). */
create or replace function public.answer_account_deletion_request(p_student uuid, p_approve boolean)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  uid uuid := auth.uid();
  req public.account_deletion_requests%rowtype;
begin
  if not private.is_parent_of_as(uid, p_student) then raise exception 'not_allowed' using errcode = '42501'; end if;
  select * into req from public.account_deletion_requests where student_id = p_student and status = 'pending' for update;
  if not found then raise exception 'no_request' using errcode = 'P0002'; end if;

  if p_approve then
    if not private.recent_login(interval '15 minutes') then raise exception 'reauth_required' using errcode = '42501'; end if;
    update public.account_deletion_requests set status = 'approved', decided_by = uid, decided_at = now() where id = req.id;
    perform private.anonymize_account(p_student, uid);
  else
    update public.account_deletion_requests set status = 'refused', decided_by = uid, decided_at = now() where id = req.id;
    insert into public.notifications (user_id, type, params, link)
    values (p_student, 'account_deletion_refused', '{}'::jsonb, '/compte');
  end if;
end;
$$;

/** Comptes anonymisés dont l'identité de connexion reste à supprimer (clé secrète uniquement). */
create or replace function public.is_account_anonymized(p_target uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (select 1 from public.profiles where id = p_target and deleted_at is not null);
$$;

-- Un compte anonymisé n'a plus de rôle dans son jeton, même si sa connexion n'est pas encore supprimée.
create or replace function public.custom_access_token_hook(event jsonb)
returns jsonb
language plpgsql
stable
set search_path = ''
as $$
declare
  claims jsonb := event -> 'claims';
  found_role public.app_role;
begin
  select role into found_role from public.profiles where id = (event ->> 'user_id')::uuid and deleted_at is null;
  claims := jsonb_set(claims, '{user_role}', coalesce(to_jsonb(found_role), 'null'::jsonb));
  return jsonb_set(event, '{claims}', claims);
end;
$$;
grant select (deleted_at) on public.profiles to authenticated;

do $$
begin
  if exists (select 1 from pg_roles where rolname = 'supabase_auth_admin') then
    grant select (deleted_at) on public.profiles to supabase_auth_admin;
  end if;
end;
$$;

revoke execute on function private.recent_login(interval), private.is_managed_child(uuid),
  private.deletion_mode(uuid, uuid), private.anonymize_account(uuid, uuid) from public, anon, authenticated;
revoke execute on function public.sync_my_contact(), public.get_account_deletion_status(uuid),
  public.delete_account(uuid), public.request_account_deletion(), public.cancel_account_deletion_request(),
  public.answer_account_deletion_request(uuid, boolean), public.is_account_anonymized(uuid) from public, anon;
grant execute on function public.sync_my_contact(), public.get_account_deletion_status(uuid),
  public.delete_account(uuid), public.request_account_deletion(), public.cancel_account_deletion_request(),
  public.answer_account_deletion_request(uuid, boolean) to authenticated;
revoke execute on function public.is_account_anonymized(uuid) from authenticated;

do $$
begin
  if exists (select 1 from pg_roles where rolname = 'service_role') then
    grant execute on function public.is_account_anonymized(uuid) to service_role;
  end if;
end;
$$;
