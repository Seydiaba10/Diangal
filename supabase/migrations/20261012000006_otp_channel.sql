-- Canal du code de connexion par téléphone : SMS ou WhatsApp.
-- Le Send SMS Hook de Supabase Auth ne transmet que le numéro et le code : le serveur Next
-- note ici le canal choisi juste avant l'envoi, et la fonction Edge « send-sms » le lit.

create table private.otp_channels (
  phone text primary key check (phone ~ '^\+221[0-9]{9}$'),
  channel text not null check (channel in ('sms', 'whatsapp')),
  updated_at timestamptz not null default now()
);

/** Choix du canal (clé secrète uniquement : appelé par le serveur, jamais par un navigateur). */
create or replace function public.set_otp_channel(p_phone text, p_channel text)
returns void
language sql
security definer
set search_path = ''
as $$
  insert into private.otp_channels (phone, channel) values (p_phone, p_channel)
  on conflict (phone) do update set channel = excluded.channel, updated_at = now();
$$;

/** Canal à utiliser pour ce numéro : le choix des 15 dernières minutes, sinon le SMS. */
create or replace function private.otp_channel_for(p_phone text)
returns text
language sql
stable
set search_path = ''
as $$
  select coalesce(
    (select channel from private.otp_channels where phone = p_phone and updated_at > now() - interval '15 minutes'),
    'sms'
  );
$$;

revoke execute on function public.set_otp_channel(text, text) from public, anon, authenticated;

do $$
begin
  if exists (select 1 from pg_roles where rolname = 'service_role') then
    grant execute on function public.set_otp_channel(text, text) to service_role;
  end if;
end;
$$;
