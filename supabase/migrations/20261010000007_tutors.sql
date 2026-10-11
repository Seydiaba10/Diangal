-- DIANGAL · répétiteurs, vérification, disponibilités, réservations (R2) et avis.

create table public.tutor_profiles (
  user_id uuid primary key references public.profiles on delete cascade,
  status public.tutor_status not null default 'draft',
  headline text not null default '' check (char_length(headline) <= 120),
  bio text not null default '' check (char_length(bio) <= 800),
  years_experience smallint not null default 0 check (years_experience between 0 and 60),
  hourly_rate_fcfa integer not null default 0 check (hourly_rate_fcfa = 0 or hourly_rate_fcfa between 1000 and 50000),
  mode public.teaching_mode not null default 'both',
  city_id smallint references public.cities,
  neighborhood_id integer references public.neighborhoods,
  photo_path text,
  whatsapp_opt_in boolean not null default false,
  rating_avg numeric(2, 1),
  rating_count integer not null default 0,
  submitted_at timestamptz,
  verified_at timestamptz,
  verified_by uuid references public.profiles,
  rejection_reason text check (char_length(rejection_reason) <= 300),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index tutor_profiles_search_idx on public.tutor_profiles (status, city_id, hourly_rate_fcfa);
create trigger tutor_profiles_touch before update on public.tutor_profiles
  for each row execute function private.touch_updated_at();

create trigger on_auth_user_created after insert on auth.users
  for each row execute function private.handle_new_user();

create table public.tutor_subjects (
  tutor_id uuid not null references public.tutor_profiles on delete cascade,
  subject_id smallint not null references public.subjects,
  primary key (tutor_id, subject_id)
);
create index tutor_subjects_subject_idx on public.tutor_subjects (subject_id);

create table public.tutor_levels (
  tutor_id uuid not null references public.tutor_profiles on delete cascade,
  level_id smallint not null references public.levels,
  primary key (tutor_id, level_id)
);
create index tutor_levels_level_idx on public.tutor_levels (level_id);

create table public.tutor_qualifications (
  id uuid primary key default gen_random_uuid(),
  tutor_id uuid not null references public.tutor_profiles on delete cascade,
  title text not null,
  institution text not null,
  year smallint
);

-- Données privées du répétiteur : jamais visibles dans l'annuaire.
create table public.tutor_private (
  user_id uuid primary key references public.tutor_profiles on delete cascade,
  whatsapp_e164 text check (whatsapp_e164 ~ '^\+221[0-9]{9}$'),
  payout_channel public.payment_channel,
  payout_phone text check (payout_phone ~ '^\+221[0-9]{9}$')
);

-- Pièces justificatives : stockage privé, supprimées 30 jours après la décision.
create table public.tutor_documents (
  id uuid primary key default gen_random_uuid(),
  tutor_id uuid not null references public.tutor_profiles on delete cascade,
  type public.document_type not null,
  storage_path text not null,
  status text not null default 'pending' check (status in ('pending', 'accepted', 'rejected')),
  reviewed_by uuid references public.profiles,
  reviewed_at timestamptz,
  purge_after date,
  created_at timestamptz not null default now()
);
create index tutor_documents_tutor_idx on public.tutor_documents (tutor_id);

create table public.tutor_availability (
  id uuid primary key default gen_random_uuid(),
  tutor_id uuid not null references public.tutor_profiles on delete cascade,
  weekday smallint not null check (weekday between 1 and 7),
  start_time time not null,
  end_time time not null,
  check (start_time < end_time)
);
create index tutor_availability_tutor_idx on public.tutor_availability (tutor_id);

-- R2 : réservations. La contrainte d'exclusion interdit deux séances qui se chevauchent.
create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  tutor_id uuid not null references public.tutor_profiles,
  student_id uuid not null references public.profiles,
  booked_by uuid not null references public.profiles,
  subject_id smallint not null references public.subjects,
  level_id smallint not null references public.levels,
  mode public.teaching_mode not null check (mode in ('online', 'home')),
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  price_fcfa integer not null check (price_fcfa > 0),
  commission_fcfa integer not null default 0 check (commission_fcfa >= 0),
  status public.booking_status not null default 'requested',
  -- Adresse d'une séance à domicile : visible du répétiteur seulement après paiement.
  address_text text,
  room_name text,
  cancel_reason text,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  check (starts_at < ends_at),
  constraint bookings_no_overlap exclude using gist (
    tutor_id with =,
    tstzrange(starts_at, ends_at) with &&
  ) where (status in ('accepted', 'paid', 'completed'))
);
create index bookings_student_idx on public.bookings (student_id);

create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null unique references public.bookings on delete cascade,
  tutor_id uuid not null references public.tutor_profiles,
  author_id uuid not null references public.profiles,
  rating smallint not null check (rating between 1 and 5),
  comment text check (char_length(comment) <= 1000),
  status public.review_status not null default 'pending',
  moderated_by uuid references public.profiles,
  moderated_at timestamptz,
  created_at timestamptz not null default now()
);
create index reviews_tutor_idx on public.reviews (tutor_id) where status = 'published';
