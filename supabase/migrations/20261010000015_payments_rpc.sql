-- DIANGAL · paiement des pass Premium : intention de paiement (payeur) et application du webhook (serveur).

create sequence private.payment_reference_seq;

/**
 * Crée un paiement « en attente » pour un pass. Le payeur est l'élève lui-même (majeur ou validé
 * par son parent) ou un parent lié à l'élève. Le montant vient de la table plans, jamais du client.
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
  if not exists (select 1 from public.student_profiles where user_id = p_beneficiary) then
    raise exception 'invalid_beneficiary' using errcode = '22023';
  end if;
  if uid = p_beneficiary then
    if not private.has_consent(uid) then raise exception 'consent_required' using errcode = '42501'; end if;
  elsif not private.is_parent_of(p_beneficiary) then
    raise exception 'not_your_child' using errcode = '42501';
  end if;

  ref := 'DGL-' || to_char(now() at time zone 'Africa/Dakar', 'YYMM') || '-' || lpad(nextval('private.payment_reference_seq')::text, 6, '0');
  insert into public.payments (reference, payer_id, beneficiary_id, purpose, plan_id, amount_fcfa, provider, channel)
  values (ref, uid, p_beneficiary, 'subscription', plan.id, plan.price_fcfa, 'paydunya', p_channel)
  returning id into new_id;
  return jsonb_build_object('payment_id', new_id, 'reference', ref, 'amount_fcfa', plan.price_fcfa, 'plan_name', plan.name);
end;
$$;

/**
 * Applique le résultat confirmé auprès du prestataire (webhook vérifié + appel de confirmation).
 * Idempotente : un webhook rejoué ne crée jamais un second abonnement.
 * Exécutable uniquement avec la clé secrète (service_role).
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
    -- Prolongation : la nouvelle période commence à la fin de l'abonnement en cours.
    select greatest(now(), coalesce(max(ends_at), now())) into start_at
    from public.subscriptions where student_id = pay.beneficiary_id and status = 'active';
    insert into public.subscriptions (student_id, payer_id, plan_id, starts_at, ends_at, payment_id)
    values (pay.beneficiary_id, pay.payer_id, plan.id, start_at, start_at + make_interval(days => plan.duration_days), pay.id);
    insert into public.notifications (user_id, type, params, link)
    values (pay.payer_id, 'payment', jsonb_build_object('reference', pay.reference), '/paiement/retour?ref=' || pay.reference);
  end if;

  insert into public.audit_logs (actor_id, action, entity_type, entity_id, meta)
  values (null, 'paiement : ' || p_status, 'payment', pay.reference, jsonb_build_object('provider_ref', p_provider_ref));
  return jsonb_build_object('reference', pay.reference, 'status', p_status, 'already_applied', false);
end;
$$;

revoke execute on function public.create_payment_intent(text, uuid, public.payment_channel) from public, anon;
revoke execute on function public.apply_payment_event(text, text, public.payment_status, public.payment_channel) from public, anon, authenticated;
grant execute on function public.create_payment_intent(text, uuid, public.payment_channel) to authenticated;

do $$
begin
  if exists (select 1 from pg_roles where rolname = 'service_role') then
    grant execute on function public.apply_payment_event(text, text, public.payment_status, public.payment_channel) to service_role;
    grant usage, select on sequence private.payment_reference_seq to service_role;
  end if;
end;
$$;
