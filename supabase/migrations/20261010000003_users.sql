-- DIANGAL · comptes, profils élèves, liens parent-enfant et consentements.

create table public.profiles (
  id uuid primary key references auth.users on delete cascade,
  role public.app_role not null,
  first_name text not null check (char_length(first_name) between 1 and 60),
  last_name text not null check (char_length(last_name) between 1 and 60),
  -- Coordonnées : jamais lisibles par l'API (privilèges par colonne, voir policies).
  phone text unique check (phone ~ '^\+221[0-9]{9}$'),
  email text,
  locale text not null default 'fr' check (locale in ('fr', 'wo')),
  city_id smallint references public.cities,
  avatar_key text check (char_length(avatar_key) <= 40),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);
create trigger profiles_touch before update on public.profiles
  for each row execute function private.touch_updated_at();

-- Code à 8 caractères que l'élève donne à son parent (ex. 7K3Q-AW2M), sans caractères ambigus.
create or replace function private.generate_student_code()
returns text
language sql
volatile
set search_path = ''
as $$
  select string_agg(substr('ABCDEFGHJKLMNPQRSTUVWXYZ23456789', 1 + floor(random() * 32)::int, 1), '')
  from generate_series(1, 8);
$$;

create table public.student_profiles (
  user_id uuid primary key references public.profiles on delete cascade,
  level_id smallint not null references public.levels,
  series_id smallint references public.series,
  -- Sert uniquement à déterminer la minorité : jamais affichée.
  birth_date date not null check (birth_date > date '1980-01-01'),
  school_name text check (char_length(school_name) <= 120),
  consent_status public.consent_status not null default 'not_required',
  data_saver boolean not null default false,
  student_code text not null unique default private.generate_student_code(),
  updated_at timestamptz not null default now()
);
create trigger student_profiles_touch before update on public.student_profiles
  for each row execute function private.touch_updated_at();

create table public.parent_links (
  parent_id uuid not null references public.profiles on delete cascade,
  student_id uuid not null references public.profiles on delete cascade,
  status public.link_status not null default 'pending',
  relationship text check (char_length(relationship) <= 40),
  created_at timestamptz not null default now(),
  approved_at timestamptz,
  primary key (parent_id, student_id)
);
create index parent_links_student_idx on public.parent_links (student_id);

-- Demande de validation envoyée par SMS au parent : seul le hash du jeton est stocké.
create table public.consent_requests (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.profiles on delete cascade,
  parent_phone text not null check (parent_phone ~ '^\+221[0-9]{9}$'),
  token_hash text not null unique,
  expires_at timestamptz not null default now() + interval '7 days',
  consumed_at timestamptz,
  created_at timestamptz not null default now()
);
create index consent_requests_student_idx on public.consent_requests (student_id);

-- Consentements horodatés et versionnés (loi n° 2008-12, CDP).
create table public.consents (
  id uuid primary key default gen_random_uuid(),
  subject_user_id uuid not null references public.profiles on delete cascade,
  granted_by uuid not null references public.profiles,
  type public.consent_type not null,
  version text not null,
  granted_at timestamptz not null default now(),
  revoked_at timestamptz
);
create index consents_subject_idx on public.consents (subject_user_id);

/*
 * Création du profil à l'inscription (Supabase Auth). Le rôle vient des métadonnées
 * envoyées par l'application : seuls élève, parent et répétiteur sont acceptés.
 * Un administrateur est créé à la main, jamais par inscription.
 */
create or replace function private.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  meta jsonb := coalesce(new.raw_user_meta_data, '{}'::jsonb);
  wanted text := meta ->> 'role';
  birth date;
  level_row public.levels%rowtype;
begin
  if wanted is null or wanted not in ('student', 'parent', 'tutor') then
    raise exception 'role_not_allowed' using errcode = '42501';
  end if;

  insert into public.profiles (id, role, first_name, last_name, phone, email)
  values (
    new.id,
    wanted::public.app_role,
    coalesce(nullif(trim(meta ->> 'first_name'), ''), 'Utilisateur'),
    coalesce(nullif(trim(meta ->> 'last_name'), ''), '-'),
    case when new.phone is null or new.phone = '' then null
         when left(new.phone, 1) = '+' then new.phone
         else '+' || new.phone end,
    new.email
  );

  if wanted = 'student' then
    birth := (meta ->> 'birth_date')::date;
    select * into level_row from public.levels where code = meta ->> 'level_code';
    if birth is null or level_row.id is null then
      raise exception 'student_profile_incomplete' using errcode = '22023';
    end if;
    insert into public.student_profiles (user_id, level_id, series_id, birth_date, consent_status)
    values (
      new.id,
      level_row.id,
      (select id from public.series where code = meta ->> 'series_code'),
      birth,
      case when birth > current_date - interval '18 years' then 'pending'::public.consent_status
           else 'not_required'::public.consent_status end
    );
  elsif wanted = 'tutor' then
    insert into public.tutor_profiles (user_id) values (new.id);
  end if;

  return new;
end;
$$;

-- Le déclencheur est créé après la table tutor_profiles (migration répétiteurs).

/*
 * Custom Access Token Hook : ajoute la claim « user_role » au JWT, lue par proxy.ts
 * et par private.app_role() sans requête supplémentaire.
 */
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
  select role into found_role from public.profiles where id = (event ->> 'user_id')::uuid;
  claims := jsonb_set(claims, '{user_role}', coalesce(to_jsonb(found_role), 'null'::jsonb));
  return jsonb_set(event, '{claims}', claims);
end;
$$;
revoke execute on function public.custom_access_token_hook from public;
