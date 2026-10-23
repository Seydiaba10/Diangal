-- DIANGAL · parrainage (22/10/2026).
-- Chaque élève (validé par son parent s'il est mineur) et chaque parent a un code difficile à deviner
-- (10 caractères, environ 50 bits). Un nouveau compte peut saisir un code dans les 7 jours qui suivent
-- son inscription. La récompense n'est JAMAIS donnée à la saisie du code : seulement quand un vrai
-- paiement du filleul est confirmé (webhook → apply_payment_event), puis après une période de garde
-- (remboursement possible). Récompense = jours Premium, jamais d'argent (beaucoup d'utilisateurs
-- sont mineurs). Anti-fraude : pas d'auto-parrainage, pas de parrainage dans une même famille, pas de
-- paiement fait par le parrain, montant minimum, plafond mensuel, historique conservé.
-- Le parrainage est désactivé par défaut : l'admin l'ouvre et choisit un scénario de coût.

-- ── Réglages ─────────────────────────────────────────────────────────────────

/** Scénarios de coût (voir docs/parrainage.md) : prudent, intermédiaire, généreux. */
create or replace function private.referral_preset(p_scenario text)
returns jsonb
language sql
immutable
set search_path = ''
as $$
  select jsonb_build_object('scenario', p_scenario, 'hold_days', 14, 'claim_window_days', 7, 'qualify_within_days', 90)
    || case p_scenario
         when 'genereux' then '{"referrer_days": 60, "referee_days": 30, "min_amount_fcfa": 2000, "max_rewards_per_month": 20}'::jsonb
         when 'intermediaire' then '{"referrer_days": 30, "referee_days": 15, "min_amount_fcfa": 2000, "max_rewards_per_month": 10}'::jsonb
         else '{"referrer_days": 15, "referee_days": 0, "min_amount_fcfa": 5000, "max_rewards_per_month": 5}'::jsonb
       end;
$$;

insert into public.platform_settings (key, value)
values ('referral', jsonb_build_object('enabled', false) || private.referral_preset('prudent'))
on conflict (key) do nothing;

/** Réglages en vigueur, complétés par le scénario prudent pour toute clé absente. */
create or replace function private.referral_settings()
returns jsonb
language sql
stable
security definer
set search_path = ''
as $$
  select jsonb_build_object('enabled', false) || private.referral_preset('prudent')
    || coalesce((select value from public.platform_settings where key = 'referral'), '{}'::jsonb);
$$;

-- Formule technique des jours offerts : jamais vendue (inactive, prix nul autorisé seulement ainsi).
alter table public.plans drop constraint if exists plans_price_fcfa_check;
alter table public.plans add constraint plans_price_fcfa_check check (price_fcfa > 0 or not is_active);
insert into public.plans (code, name, price_fcfa, duration_days, is_active, sort_order)
values ('referral_bonus', 'Jours offerts (parrainage)', 0, 1, false, 99)
on conflict (code) do nothing;

-- ── Tables ───────────────────────────────────────────────────────────────────

create table public.referral_codes (
  user_id uuid primary key references public.profiles on delete cascade,
  code text not null unique check (code ~ '^[A-HJ-NP-Z2-9]{10}$'),
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create type public.referral_status as enum ('pending', 'qualified', 'rewarded', 'cancelled', 'expired');

create table public.referrals (
  id uuid primary key default gen_random_uuid(),
  referrer_id uuid not null references public.profiles on delete cascade,
  -- Un filleul n'a qu'un parrain.
  referee_id uuid not null unique references public.profiles on delete cascade,
  status public.referral_status not null default 'pending',
  -- Raison d'une annulation ou d'une qualification sans récompense (refund, family, self_payment, cap…).
  reason text check (char_length(reason) <= 40),
  payment_id uuid references public.payments,
  created_at timestamptz not null default now(),
  qualified_at timestamptz,
  updated_at timestamptz not null default now(),
  check (referrer_id <> referee_id)
);
create index referrals_referrer_idx on public.referrals (referrer_id, created_at desc);
create index referrals_payment_idx on public.referrals (payment_id);
create trigger referrals_touch before update on public.referrals
  for each row execute function private.touch_updated_at();

create table public.referral_rewards (
  id uuid primary key default gen_random_uuid(),
  referral_id uuid not null references public.referrals on delete cascade,
  -- Compte qui peut utiliser les jours (parrain, ou filleul pour le bonus de bienvenue).
  user_id uuid not null references public.profiles on delete cascade,
  kind text not null check (kind in ('referrer', 'referee')),
  days smallint not null check (days between 1 and 365),
  status text not null default 'pending' check (status in ('pending', 'used', 'revoked')),
  -- Fin de la période de garde : avant, un remboursement annule la récompense.
  available_at timestamptz not null,
  used_at timestamptz,
  used_for uuid references public.profiles on delete set null,
  subscription_id uuid references public.subscriptions on delete set null,
  created_at timestamptz not null default now()
);
create index referral_rewards_user_idx on public.referral_rewards (user_id, status);
create index referral_rewards_referral_idx on public.referral_rewards (referral_id);
create index referral_rewards_used_for_idx on public.referral_rewards (used_for);
create index referral_rewards_subscription_idx on public.referral_rewards (subscription_id);

alter table public.referral_codes enable row level security;
alter table public.referrals enable row level security;
alter table public.referral_rewards enable row level security;
grant select on public.referral_codes, public.referrals, public.referral_rewards to authenticated;
-- Lecture : le titulaire, le parrain ou le filleul, l'admin. Écriture : fonctions ci-dessous seulement.
create policy referral_codes_read on public.referral_codes for select to authenticated
  using (user_id = (select auth.uid()) or private.is_admin());
create policy referrals_read on public.referrals for select to authenticated
  using (referrer_id = (select auth.uid()) or referee_id = (select auth.uid()) or private.is_admin());
create policy referral_rewards_read on public.referral_rewards for select to authenticated
  using (user_id = (select auth.uid()) or private.is_admin());

-- ── Fonctions ────────────────────────────────────────────────────────────────

/** Peut parrainer : élève (validé par son parent s'il est mineur) ou parent, compte actif. */
create or replace function private.can_refer(p_user uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.profiles p
    where p.id = p_user and p.deleted_at is null
      and (p.role = 'parent' or (p.role = 'student' and private.has_consent(p_user)))
  );
$$;

/** Deux comptes de la même famille (lien parent-enfant, quel que soit son état). */
create or replace function private.same_family(p_a uuid, p_b uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.parent_links l
    where (l.parent_id = p_a and l.student_id = p_b) or (l.parent_id = p_b and l.student_id = p_a)
       or (l.parent_id = p_a and l.student_id in (select student_id from public.parent_links where parent_id = p_b))
  );
$$;

/** Code de parrainage du compte connecté (créé au premier appel), réglages, filleuls et jours gagnés. */
create or replace function public.get_my_referral()
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  uid uuid := auth.uid();
  settings jsonb := private.referral_settings();
  my_code text;
  alphabet constant text := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
begin
  if uid is null then raise exception 'not_authenticated' using errcode = '42501'; end if;
  if not private.can_refer(uid) then
    return jsonb_build_object('eligible', false, 'enabled', (settings ->> 'enabled')::boolean);
  end if;

  -- Filleuls sans paiement dans le délai : expirés (aucune récompense).
  update public.referrals set status = 'expired', reason = 'no_payment'
  where referrer_id = uid and status = 'pending'
    and created_at < now() - make_interval(days => (settings ->> 'qualify_within_days')::int);

  select code into my_code from public.referral_codes where user_id = uid and active;
  if my_code is null and (settings ->> 'enabled')::boolean then
    -- Tirage cryptographique : 10 octets aléatoires, chacun ramené à l'alphabet de 32 signes (256 = 8 × 32).
    loop
      select string_agg(substr(alphabet, 1 + get_byte(b.bytes, i) % 32, 1), '' order by i) into my_code
      from (select extensions.gen_random_bytes(10) as bytes) b, generate_series(0, 9) as i;
      exit when not exists (select 1 from public.referral_codes where code = my_code);
    end loop;
    insert into public.referral_codes (user_id, code) values (uid, my_code)
    on conflict (user_id) do update set code = excluded.code, active = true;
  end if;

  return jsonb_build_object(
    'eligible', true,
    'enabled', (settings ->> 'enabled')::boolean,
    'code', my_code,
    'settings', settings - 'enabled',
    'daysAvailable', (select coalesce(sum(days), 0) from public.referral_rewards
                      where user_id = uid and status = 'pending' and available_at <= now()),
    'daysOnHold', (select coalesce(sum(days), 0) from public.referral_rewards
                   where user_id = uid and status = 'pending' and available_at > now()),
    'daysUsed', (select coalesce(sum(days), 0) from public.referral_rewards where user_id = uid and status = 'used'),
    'referrals', (select coalesce(jsonb_agg(jsonb_build_object(
                    'initial', left(p.first_name, 1), 'role', p.role, 'status', r.status, 'reason', r.reason,
                    'createdAt', r.created_at, 'qualifiedAt', r.qualified_at) order by r.created_at desc), '[]'::jsonb)
                  from public.referrals r join public.profiles p on p.id = r.referee_id
                  where r.referrer_id = uid)
  );
end;
$$;

/**
 * Le nouveau compte saisit un code (à l'inscription) : lien parrain-filleul « en attente ».
 * Réponse : ok · invalid (code inconnu, le sien, compte trop ancien, déjà parrainé) · closed.
 */
create or replace function public.claim_referral(p_code text)
returns text
language plpgsql
security definer
set search_path = ''
as $$
declare
  uid uuid := auth.uid();
  settings jsonb := private.referral_settings();
  owner uuid;
  me public.profiles%rowtype;
begin
  if uid is null then raise exception 'not_authenticated' using errcode = '42501'; end if;
  if not (settings ->> 'enabled')::boolean then return 'closed'; end if;
  select * into me from public.profiles where id = uid;
  if me.role not in ('student', 'parent') or me.deleted_at is not null
     or me.created_at < now() - make_interval(days => (settings ->> 'claim_window_days')::int)
     or exists (select 1 from public.referrals where referee_id = uid) then
    return 'invalid';
  end if;
  select c.user_id into owner from public.referral_codes c
  where c.code = upper(regexp_replace(coalesce(p_code, ''), '[^A-Za-z0-9]', '', 'g')) and c.active;
  -- Un code créé après le compte du filleul ne peut pas l'avoir invité.
  if owner is null or owner = uid or not private.can_refer(owner)
     or (select created_at from public.referral_codes where user_id = owner) > me.created_at + interval '1 hour' then
    return 'invalid';
  end if;
  insert into public.referrals (referrer_id, referee_id) values (owner, uid);
  perform private.log_audit('parrainage enregistré', 'referral', uid::text);
  return 'ok';
end;
$$;

/**
 * Paiement confirmé (appelé par apply_payment_event) : le filleul concerné (payeur ou bénéficiaire)
 * qualifie son parrainage. Contrôles anti-fraude, puis jours Premium en garde pour le parrain
 * (et bonus de bienvenue pour le filleul selon le scénario).
 */
create or replace function private.qualify_referral(p_payment uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  settings jsonb := private.referral_settings();
  pay public.payments%rowtype;
  ref public.referrals%rowtype;
  hold timestamptz;
begin
  select * into pay from public.payments where id = p_payment;
  if not found or pay.status <> 'succeeded' or pay.purpose <> 'subscription' then return; end if;
  select * into ref from public.referrals
  where status = 'pending' and referee_id in (pay.payer_id, pay.beneficiary_id)
  order by created_at limit 1
  for update;
  if not found then return; end if;

  if not (settings ->> 'enabled')::boolean then return; end if;
  if ref.created_at < now() - make_interval(days => (settings ->> 'qualify_within_days')::int) then
    update public.referrals set status = 'expired', reason = 'no_payment' where id = ref.id;
    return;
  end if;
  if pay.payer_id = ref.referrer_id then
    update public.referrals set status = 'cancelled', reason = 'self_payment', payment_id = pay.id where id = ref.id;
    return;
  end if;
  if private.same_family(ref.referrer_id, ref.referee_id) or private.same_family(ref.referrer_id, pay.payer_id) then
    update public.referrals set status = 'cancelled', reason = 'family', payment_id = pay.id where id = ref.id;
    return;
  end if;
  if pay.amount_fcfa < (settings ->> 'min_amount_fcfa')::int then
    -- Petit paiement : le parrainage reste en attente d'un paiement suffisant.
    return;
  end if;
  if not private.can_refer(ref.referrer_id) then
    update public.referrals set status = 'cancelled', reason = 'referrer_closed', payment_id = pay.id where id = ref.id;
    return;
  end if;
  if (select count(*) from public.referral_rewards
      where user_id = ref.referrer_id and kind = 'referrer' and created_at > now() - interval '30 days')
     >= (settings ->> 'max_rewards_per_month')::int then
    update public.referrals set status = 'qualified', reason = 'cap', payment_id = pay.id, qualified_at = now() where id = ref.id;
    return;
  end if;

  hold := now() + make_interval(days => (settings ->> 'hold_days')::int);
  insert into public.referral_rewards (referral_id, user_id, kind, days, available_at)
  values (ref.id, ref.referrer_id, 'referrer', (settings ->> 'referrer_days')::int, hold);
  if (settings ->> 'referee_days')::int > 0 then
    insert into public.referral_rewards (referral_id, user_id, kind, days, available_at)
    values (ref.id, ref.referee_id, 'referee', (settings ->> 'referee_days')::int, hold);
  end if;
  update public.referrals set status = 'rewarded', payment_id = pay.id, qualified_at = now() where id = ref.id;
  insert into public.notifications (user_id, type, params, link)
  values (ref.referrer_id, 'referral_reward', jsonb_build_object('days', (settings ->> 'referrer_days')::int), '/parrainage');
  perform private.log_audit('parrainage récompensé', 'referral', ref.id::text,
    jsonb_build_object('payment', pay.reference, 'days', (settings ->> 'referrer_days')::int));
end;
$$;

/**
 * Utilise les jours disponibles (après la garde) : Premium prolongé pour soi (élève) ou pour un
 * enfant relié (parent). Renvoie le nombre de jours ajoutés.
 */
create or replace function public.use_referral_days(p_student uuid)
returns integer
language plpgsql
security definer
set search_path = ''
as $$
declare
  uid uuid := auth.uid();
  total integer;
  start_at timestamptz;
  bonus_plan smallint;
  sub_id uuid;
begin
  if uid is null then raise exception 'not_authenticated' using errcode = '42501'; end if;
  if not (p_student = uid and private.app_role() = 'student') and not private.is_parent_of_as(uid, p_student) then
    raise exception 'not_allowed' using errcode = '42501';
  end if;
  perform 1 from public.referral_rewards where user_id = uid and status = 'pending' and available_at <= now() for update;
  select coalesce(sum(days), 0) into total from public.referral_rewards
  where user_id = uid and status = 'pending' and available_at <= now();
  if total = 0 then raise exception 'no_days' using errcode = 'P0002'; end if;

  select id into bonus_plan from public.plans where code = 'referral_bonus';
  select greatest(now(), coalesce(max(ends_at), now())) into start_at
  from public.subscriptions where student_id = p_student and status = 'active';
  insert into public.subscriptions (student_id, payer_id, plan_id, starts_at, ends_at)
  values (p_student, uid, bonus_plan, start_at, start_at + make_interval(days => total))
  returning id into sub_id;
  update public.referral_rewards set status = 'used', used_at = now(), used_for = p_student, subscription_id = sub_id
  where user_id = uid and status = 'pending' and available_at <= now();
  perform private.log_audit('jours de parrainage utilisés', 'subscription', sub_id::text, jsonb_build_object('days', total));
  return total;
end;
$$;

/**
 * Remboursement d'un paiement (admin en double authentification, après le remboursement réel chez
 * PayDunya) : paiement « refunded », abonnements de ce paiement annulés, parrainage annulé et
 * récompenses en garde retirées. Les jours déjà utilisés restent (signalés dans le journal).
 */
create or replace function public.admin_refund_payment(p_reference text, p_reason text)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  pay public.payments%rowtype;
  revoked integer;
  used integer;
begin
  if not private.is_admin() then raise exception 'admins_only' using errcode = '42501'; end if;
  select * into pay from public.payments where reference = p_reference for update;
  if not found then raise exception 'unknown_payment' using errcode = 'P0002'; end if;
  if pay.status <> 'succeeded' then raise exception 'not_refundable' using errcode = '22023'; end if;

  update public.payments set status = 'refunded' where id = pay.id;
  update public.subscriptions set status = 'cancelled' where payment_id = pay.id and status = 'active';
  update public.referrals set status = 'cancelled', reason = 'refund' where payment_id = pay.id and status in ('rewarded', 'qualified');
  with r as (
    update public.referral_rewards w set status = 'revoked'
    from public.referrals f
    where f.id = w.referral_id and f.payment_id = pay.id and w.status = 'pending'
    returning 1
  ) select count(*) into revoked from r;
  select count(*) into used from public.referral_rewards w join public.referrals f on f.id = w.referral_id
  where f.payment_id = pay.id and w.status = 'used';
  perform private.log_audit('paiement remboursé', 'payment', pay.reference,
    jsonb_build_object('reason', left(coalesce(p_reason, ''), 200), 'rewards_revoked', revoked, 'rewards_already_used', used));
  return jsonb_build_object('reference', pay.reference, 'rewardsRevoked', revoked, 'rewardsAlreadyUsed', used);
end;
$$;

/** Ouverture du parrainage et choix du scénario de coût (admin en double authentification). */
create or replace function public.admin_set_referral_settings(p_enabled boolean, p_scenario text)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  value jsonb;
begin
  if not private.is_admin() then raise exception 'admins_only' using errcode = '42501'; end if;
  if p_scenario not in ('prudent', 'intermediaire', 'genereux') then raise exception 'invalid_scenario' using errcode = '22023'; end if;
  value := jsonb_build_object('enabled', p_enabled) || private.referral_preset(p_scenario);
  insert into public.platform_settings (key, value) values ('referral', value)
  on conflict (key) do update set value = excluded.value;
  perform private.log_audit('parrainage : ' || case when p_enabled then 'ouvert' else 'fermé' end || ' (' || p_scenario || ')',
    'platform_settings', 'referral');
  return value;
end;
$$;

/** Tableau de bord admin du parrainage : réglages, filleuls par statut, jours donnés et utilisés. */
create or replace function public.admin_referral_stats()
returns jsonb
language plpgsql
stable
security definer
set search_path = ''
as $$
begin
  if not private.is_admin() then raise exception 'admins_only' using errcode = '42501'; end if;
  return jsonb_build_object(
    'settings', private.referral_settings(),
    'byStatus', (select coalesce(jsonb_object_agg(status, n), '{}'::jsonb)
                 from (select status, count(*) as n from public.referrals group by status) s),
    'daysGranted', (select coalesce(sum(days), 0) from public.referral_rewards where status <> 'revoked'),
    'daysUsed', (select coalesce(sum(days), 0) from public.referral_rewards where status = 'used'),
    'daysRevoked', (select coalesce(sum(days), 0) from public.referral_rewards where status = 'revoked')
  );
end;
$$;

-- Compte supprimé : son code ne sert plus, ses parrainages en attente sont annulés, ses jours en
-- garde retirés (l'historique reste).
create or replace function private.referral_on_profile_deleted()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  update public.referral_codes set active = false where user_id = new.id;
  update public.referrals set status = 'cancelled', reason = 'account_deleted'
  where (referrer_id = new.id or referee_id = new.id) and status = 'pending';
  update public.referral_rewards set status = 'revoked' where user_id = new.id and status = 'pending';
  return null;
end;
$$;
create trigger profiles_referral_cleanup after update of deleted_at on public.profiles
  for each row when (old.deleted_at is null and new.deleted_at is not null)
  execute function private.referral_on_profile_deleted();

-- ── apply_payment_event : qualification du parrainage après un paiement confirmé ─────────

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
  if pay.status in ('succeeded', 'refunded') then
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
    -- Parrainage : seulement maintenant, sur un paiement réellement confirmé.
    perform private.qualify_referral(pay.id);
  end if;

  insert into public.audit_logs (actor_id, action, entity_type, entity_id, meta)
  values (null, 'paiement : ' || p_status, 'payment', pay.reference, jsonb_build_object('provider_ref', p_provider_ref));
  return jsonb_build_object('reference', pay.reference, 'status', p_status, 'already_applied', false);
end;
$$;

revoke execute on function private.referral_preset(text), private.referral_settings(), private.can_refer(uuid),
  private.same_family(uuid, uuid), private.qualify_referral(uuid), private.referral_on_profile_deleted()
  from public, anon, authenticated;
revoke execute on function public.get_my_referral(), public.claim_referral(text), public.use_referral_days(uuid),
  public.admin_refund_payment(text, text), public.admin_set_referral_settings(boolean, text), public.admin_referral_stats()
  from public, anon;
grant execute on function public.get_my_referral(), public.claim_referral(text), public.use_referral_days(uuid),
  public.admin_refund_payment(text, text), public.admin_set_referral_settings(boolean, text), public.admin_referral_stats()
  to authenticated;
