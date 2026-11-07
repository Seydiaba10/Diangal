-- Vitesse réelle des pages (Core Web Vitals : LCP, INP, CLS, et FCP, TTFB), mesurée sur les téléphones des
-- utilisateurs et envoyée au site lui-même (aucun service tiers). Mesures anonymes : ni compte, ni adresse IP,
-- ni identifiant dans l'adresse de la page (les identifiants sont remplacés par « :id »). Gardées 30 jours.

create table private.web_vitals (
  id bigint generated always as identity primary key,
  metric text not null check (metric in ('LCP', 'INP', 'CLS', 'FCP', 'TTFB')),
  value double precision not null check (value >= 0 and value < 600000),
  rating text not null check (rating in ('good', 'needs-improvement', 'poor')),
  page text not null check (char_length(page) between 1 and 120),
  -- Qualité du réseau estimée par le navigateur (Chrome, Android), quand il la donne.
  connection text check (connection in ('slow-2g', '2g', '3g', '4g')),
  created_at timestamptz not null default now()
);
create index web_vitals_created_at_idx on private.web_vitals (created_at);

-- Enregistrement par lots (au plus 20 mesures par appel), par le serveur du site seulement (clé secrète).
create or replace function public.record_web_vitals(p_rows jsonb)
returns integer
language plpgsql
security definer
set search_path = ''
as $$
declare
  n integer;
begin
  if jsonb_typeof(p_rows) is distinct from 'array' then return 0; end if;
  insert into private.web_vitals (metric, value, rating, page, connection)
  select r ->> 'metric', (r ->> 'value')::double precision, r ->> 'rating', r ->> 'page', nullif(r ->> 'connection', '')
  from (select value as r from jsonb_array_elements(p_rows) limit 20) batch;
  get diagnostics n = row_count;
  return n;
end;
$$;

-- Tableau de l'admin : 75e centile (la valeur que 75 % des visites ne dépassent pas) par mesure, pour tout le site
-- (page = '*') et par page, avec la part des visites jugées « bonnes » et la part des réseaux lents (2G, 3G).
create or replace function public.admin_web_vitals(p_days integer default 7)
returns table (metric text, page text, samples bigint, p75 double precision, good_pct numeric, slow_network_pct numeric)
language plpgsql
stable
security definer
set search_path = ''
as $$
begin
  if not private.is_admin() then raise exception 'admins_only' using errcode = '42501'; end if;
  return query
  select w.metric, coalesce(w.page, '*'), count(*),
         percentile_cont(0.75) within group (order by w.value),
         round(100.0 * count(*) filter (where w.rating = 'good') / count(*), 1),
         round(100.0 * count(*) filter (where w.connection in ('slow-2g', '2g', '3g')) / count(*), 1)
  from private.web_vitals w
  where w.created_at > now() - make_interval(days => greatest(1, least(coalesce(p_days, 7), 30)))
  group by grouping sets ((w.metric), (w.metric, w.page))
  order by 2, 1;
end;
$$;

revoke execute on function public.record_web_vitals(jsonb), public.admin_web_vitals(integer) from public, anon, authenticated;
grant execute on function public.admin_web_vitals(integer) to authenticated;

do $$
begin
  if exists (select 1 from pg_roles where rolname = 'service_role') then
    grant execute on function public.record_web_vitals(jsonb) to service_role;
  end if;
end;
$$;

-- ── Nettoyage planifié (ignoré sans pg_cron, comme les autres tâches) ───────
do $outer$
begin
  if not exists (select 1 from pg_available_extensions where name = 'pg_cron') then
    raise notice 'pg_cron indisponible : nettoyage des mesures de vitesse ignoré';
    return;
  end if;
  create extension if not exists pg_cron;
  perform cron.schedule('diangal-purge-web-vitals', '50 3 * * *', $q$delete from private.web_vitals where created_at < now() - interval '30 days'$q$);
end;
$outer$;
