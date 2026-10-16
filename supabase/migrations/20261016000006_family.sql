-- DIANGAL · offre Famille et connexion des enfants par code famille + code PIN.
--
-- Offre Famille : un paiement du parent ouvre le Premium à ses enfants reliés (4 au plus).
-- Un enfant relié pendant la période est couvert s'il reste une place. Les formules sont
-- créées inactives : à activer à la mise en ligne (l'ancienne version du site ne les connaît pas).
--
-- Connexion des enfants : le parent crée le profil d'un jeune enfant (sans email ni téléphone)
-- ou donne un code PIN à un enfant déjà relié. L'enfant se connecte avec le code famille de son
-- parent et son code PIN ; le serveur ouvre alors sa propre session. Codes et PIN : schéma privé.

-- ── Formules Famille ──────────────────────────────────────────────────────

alter table public.plans add column max_children smallint check (max_children between 2 and 10);

insert into public.plans (code, name, price_fcfa, duration_days, is_active, sort_order, max_children) values
  ('family_monthly', 'Famille 1 mois', 5000, 30, false, 10, 4),
  ('family_quarterly', 'Famille 3 mois', 12000, 90, false, 11, 4),
  ('family_yearly', 'Famille 1 an', 35000, 365, false, 12, 4)
on conflict (code) do nothing;

/**
 * Paiement « en attente ». Pass individuel : le bénéficiaire est l'élève lui-même (majeur ou
 * validé) ou un enfant relié. Formule Famille : payée par un parent qui a au moins un enfant relié,
 * sans bénéficiaire unique. Le montant vient toujours de la table plans.
 */
create or replace function public.create_payment_intent(p_plan_code text, p_beneficiary uuid, p_channel public.payment_channel)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  uid uuid := auth.uid();
  plan public.plans%rowtype;
  ref text;
  new_id uuid;
begin
  if uid is null then raise exception 'not_authenticated' using errcode = '28000'; end if;
  select * into plan from public.plans where code = p_plan_code and is_active;
  if not found then raise exception 'invalid_plan' using errcode = '22023'; end if;

  if plan.max_children is not null then
    if private.app_role() <> 'parent'
       or not exists (select 1 from public.parent_links where parent_id = uid and status = 'active') then
      raise exception 'family_requires_children' using errcode = '42501';
    end if;
    p_beneficiary := null;
  else
    if not exists (select 1 from public.student_profiles where user_id = p_beneficiary) then
      raise exception 'invalid_beneficiary' using errcode = '22023';
    end if;
    if uid = p_beneficiary then
      if not private.has_consent(uid) then raise exception 'consent_required' using errcode = '42501'; end if;
    elsif not private.is_parent_of(p_beneficiary) then
      raise exception 'not_your_child' using errcode = '42501';
    end if;
  end if;

  ref := 'DGL-' || to_char(now() at time zone 'Africa/Dakar', 'YYMM') || '-' || lpad(nextval('private.payment_reference_seq')::text, 6, '0');
  insert into public.payments (reference, payer_id, beneficiary_id, purpose, plan_id, amount_fcfa, provider, channel)
  values (ref, uid, p_beneficiary, 'subscription', plan.id, plan.price_fcfa, 'paydunya', p_channel)
  returning id into new_id;
  return jsonb_build_object('payment_id', new_id, 'reference', ref, 'amount_fcfa', plan.price_fcfa, 'plan_name', plan.name);
end;
$$;

/**
 * Résultat confirmé auprès du prestataire (webhook vérifié). Idempotente. Formule Famille : un
 * abonnement par enfant relié (4 au plus), tous sur la même période, prolongée à la fin de la
 * formule Famille en cours. Exécutable uniquement avec la clé secrète.
 */
create or replace function public.apply_payment_event(
  p_reference text,
  p_provider_ref text,
  p_status public.payment_status,
  p_channel public.payment_channel default null
)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  pay public.payments%rowtype;
  plan public.plans%rowtype;
  start_at timestamptz;
begin
  select * into pay from public.payments where reference = p_reference for update;
  if not found then raise exception 'unknown_payment' using errcode = 'P0002'; end if;
  if pay.status = 'succeeded' then
    return jsonb_build_object('reference', pay.reference, 'status', pay.status, 'already_applied', true);
  end if;

  update public.payments set
    status = p_status,
    provider_ref = coalesce(provider_ref, p_provider_ref),
    channel = coalesce(p_channel, channel),
    paid_at = case when p_status = 'succeeded' then now() end
  where id = pay.id;

  if p_status = 'succeeded' and pay.purpose = 'subscription' then
    select * into plan from public.plans where id = pay.plan_id;
    if plan.max_children is not null then
      select greatest(now(), coalesce(max(s.ends_at), now())) into start_at
      from public.subscriptions s join public.plans p on p.id = s.plan_id
      where s.payer_id = pay.payer_id and p.max_children is not null and s.status = 'active';
      insert into public.subscriptions (student_id, payer_id, plan_id, starts_at, ends_at, payment_id)
      select l.student_id, pay.payer_id, plan.id, start_at, start_at + make_interval(days => plan.duration_days), pay.id
      from public.parent_links l
      where l.parent_id = pay.payer_id and l.status = 'active'
      order by coalesce(l.approved_at, l.created_at), l.student_id
      limit plan.max_children;
    else
      -- Prolongation : la nouvelle période commence à la fin de l'abonnement en cours.
      select greatest(now(), coalesce(max(ends_at), now())) into start_at
      from public.subscriptions where student_id = pay.beneficiary_id and status = 'active';
      insert into public.subscriptions (student_id, payer_id, plan_id, starts_at, ends_at, payment_id)
      values (pay.beneficiary_id, pay.payer_id, plan.id, start_at, start_at + make_interval(days => plan.duration_days), pay.id);
    end if;
    insert into public.notifications (user_id, type, params, link)
    values (pay.payer_id, 'payment', jsonb_build_object('reference', pay.reference), '/paiement/retour?ref=' || pay.reference);
  end if;

  insert into public.audit_logs (actor_id, action, entity_type, entity_id, meta)
  values (null, 'paiement : ' || p_status, 'payment', pay.reference, jsonb_build_object('provider_ref', p_provider_ref));
  return jsonb_build_object('reference', pay.reference, 'status', p_status, 'already_applied', false);
end;
$$;

/** Un enfant relié pendant une formule Famille en cours est couvert s'il reste une place. */
create or replace function private.cover_new_family_child()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  current_sub public.subscriptions%rowtype;
  max_children smallint;
begin
  if new.status <> 'active' then return null; end if;
  select s.* into current_sub
  from public.subscriptions s join public.plans p on p.id = s.plan_id
  where s.payer_id = new.parent_id and p.max_children is not null and s.status = 'active' and s.ends_at > now()
  order by s.ends_at desc
  limit 1;
  if not found then return null; end if;
  select p.max_children into max_children from public.plans p where p.id = current_sub.plan_id;
  if exists (select 1 from public.subscriptions where payment_id = current_sub.payment_id and student_id = new.student_id)
     or (select count(distinct student_id) from public.subscriptions where payment_id = current_sub.payment_id) >= max_children then
    return null;
  end if;
  insert into public.subscriptions (student_id, payer_id, plan_id, starts_at, ends_at, payment_id)
  values (new.student_id, new.parent_id, current_sub.plan_id, greatest(now(), current_sub.starts_at), current_sub.ends_at, current_sub.payment_id);
  return null;
end;
$$;

create trigger parent_links_family_cover after insert or update of status on public.parent_links
  for each row execute function private.cover_new_family_child();

-- ── Code famille et code PIN des enfants ─────────────────────────────────

create table private.family_codes (
  parent_id uuid primary key references public.profiles on delete cascade,
  code text not null unique check (code ~ '^[A-Z2-9]{8}$'),
  created_at timestamptz not null default now()
);

create table private.child_logins (
  student_id uuid primary key references public.profiles on delete cascade,
  parent_id uuid not null references public.profiles on delete cascade,
  pin_hash text not null,
  failed_attempts smallint not null default 0,
  locked_until timestamptz,
  updated_at timestamptz not null default now()
);
create index child_logins_parent_idx on private.child_logins (parent_id);

/** Code famille de 8 caractères, sans 0, O, 1 ni I (faciles à confondre). */
create or replace function private.generate_family_code()
returns text
language plpgsql
volatile
set search_path = ''
as $$
declare
  alphabet constant text := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  candidate text;
begin
  loop
    select string_agg(substr(alphabet, 1 + floor(random() * length(alphabet))::int, 1), '') into candidate
    from generate_series(1, 8);
    exit when not exists (select 1 from private.family_codes where code = candidate);
  end loop;
  return candidate;
end;
$$;

create or replace function private.ensure_family_code(p_parent uuid)
returns text
language plpgsql
security definer
set search_path = ''
as $$
declare
  existing text;
begin
  select code into existing from private.family_codes where parent_id = p_parent;
  if existing is not null then return existing; end if;
  insert into private.family_codes (parent_id, code) values (p_parent, private.generate_family_code())
  returning code into existing;
  return existing;
end;
$$;

/** Code famille du parent connecté (créé à la première demande). */
create or replace function public.get_my_family_code()
returns text
language plpgsql
security definer
set search_path = ''
as $$
begin
  if private.app_role() <> 'parent' then raise exception 'parents_only' using errcode = '42501'; end if;
  return private.ensure_family_code(auth.uid());
end;
$$;

/** Enfants reliés au parent connecté qui ont un code PIN. */
create or replace function public.get_my_child_logins()
returns table (student_id uuid, locked boolean, updated_at timestamptz)
language sql
stable
security definer
set search_path = ''
as $$
  select c.student_id, coalesce(c.locked_until > now(), false), c.updated_at
  from private.child_logins c
  where c.parent_id = auth.uid() and private.is_parent_of(c.student_id);
$$;

/** Le parent donne (ou change) le code PIN d'un enfant relié : 4 à 6 chiffres, haché. */
create or replace function public.set_child_pin(p_student uuid, p_pin text)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if private.app_role() <> 'parent' or not private.is_parent_of(p_student) then
    raise exception 'not_your_child' using errcode = '42501';
  end if;
  if p_pin !~ '^[0-9]{4,6}$' then raise exception 'invalid_pin' using errcode = '22023'; end if;
  perform private.ensure_family_code(auth.uid());
  insert into private.child_logins (student_id, parent_id, pin_hash)
  values (p_student, auth.uid(), extensions.crypt(p_pin, extensions.gen_salt('bf', 8)))
  on conflict (student_id) do update set
    parent_id = excluded.parent_id, pin_hash = excluded.pin_hash, failed_attempts = 0, locked_until = null, updated_at = now();
end;
$$;

/**
 * Profil d'un jeune enfant créé par son parent (compte sans email ni téléphone, créé par le
 * serveur) : lien actif, validation parentale enregistrée, code PIN. Clé secrète uniquement.
 */
create or replace function public.register_managed_child(p_parent uuid, p_child uuid, p_pin text)
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
  if p_pin !~ '^[0-9]{4,6}$' then raise exception 'invalid_pin' using errcode = '22023'; end if;

  insert into public.parent_links (parent_id, student_id, status, relationship, approved_at)
  values (p_parent, p_child, 'active', 'parent', now());
  update public.student_profiles set consent_status = 'granted' where user_id = p_child;
  insert into public.consents (subject_user_id, granted_by, type, version)
  values (p_child, p_parent, 'parental', '2026-10');
  insert into private.child_logins (student_id, parent_id, pin_hash)
  values (p_child, p_parent, extensions.crypt(p_pin, extensions.gen_salt('bf', 8)));
  return private.ensure_family_code(p_parent);
end;
$$;

/** Vrai si le lien parent-enfant est actif (sans session : appelé par les fonctions de connexion). */
create or replace function private.is_parent_of_as(p_parent uuid, p_student uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (select 1 from public.parent_links where parent_id = p_parent and student_id = p_student and status = 'active');
$$;

/** Enfants proposés à l'écran de connexion pour un code famille (prénom et avatar). Clé secrète uniquement. */
create or replace function public.get_family_children(p_code text)
returns table (student_id uuid, first_name text, avatar_key text)
language sql
stable
security definer
set search_path = ''
as $$
  select p.id, p.first_name, p.avatar_key
  from private.family_codes f
  join private.child_logins c on c.parent_id = f.parent_id
  join public.profiles p on p.id = c.student_id
  where f.code = upper(regexp_replace(coalesce(p_code, ''), '[^A-Za-z0-9]', '', 'g'))
    and private.is_parent_of_as(f.parent_id, c.student_id)
  order by p.first_name;
$$;

/**
 * Vérifie le code PIN d'un enfant pour un code famille : « ok », « invalid » ou « locked »
 * (5 erreurs : 15 minutes de blocage). Clé secrète uniquement.
 */
create or replace function public.verify_child_pin(p_code text, p_student uuid, p_pin text)
returns text
language plpgsql
security definer
set search_path = ''
as $$
declare
  login private.child_logins%rowtype;
begin
  select c.* into login
  from private.child_logins c join private.family_codes f on f.parent_id = c.parent_id
  where c.student_id = p_student
    and f.code = upper(regexp_replace(coalesce(p_code, ''), '[^A-Za-z0-9]', '', 'g'))
    and private.is_parent_of_as(c.parent_id, c.student_id)
  for update of c;
  if not found then return 'invalid'; end if;
  if login.locked_until > now() then return 'locked'; end if;
  if login.pin_hash = extensions.crypt(coalesce(p_pin, ''), login.pin_hash) then
    update private.child_logins set failed_attempts = 0, locked_until = null where student_id = p_student;
    return 'ok';
  end if;
  update private.child_logins set
    failed_attempts = failed_attempts + 1,
    locked_until = case when failed_attempts + 1 >= 5 then now() + interval '15 minutes' end
  where student_id = p_student;
  return case when login.failed_attempts + 1 >= 5 then 'locked' else 'invalid' end;
end;
$$;

revoke all on private.family_codes, private.child_logins from public, anon, authenticated;
revoke execute on function
  private.cover_new_family_child(), private.generate_family_code(), private.ensure_family_code(uuid),
  private.is_parent_of_as(uuid, uuid)
from public, anon, authenticated;
revoke execute on function
  public.get_my_family_code(), public.get_my_child_logins(), public.set_child_pin(uuid, text),
  public.register_managed_child(uuid, uuid, text), public.get_family_children(text), public.verify_child_pin(text, uuid, text)
from public, anon, authenticated;
grant execute on function public.get_my_family_code(), public.get_my_child_logins(), public.set_child_pin(uuid, text) to authenticated;

do $$
begin
  if exists (select 1 from pg_roles where rolname = 'service_role') then
    grant execute on function
      public.register_managed_child(uuid, uuid, text), public.get_family_children(text), public.verify_child_pin(text, uuid, text)
    to service_role;
  end if;
end;
$$;
