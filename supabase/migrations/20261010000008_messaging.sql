-- DIANGAL · messagerie, signalements, notifications.

create table public.conversations (
  id uuid primary key default gen_random_uuid(),
  tutor_id uuid not null references public.tutor_profiles on delete cascade,
  student_id uuid references public.profiles on delete cascade,
  parent_id uuid references public.profiles on delete cascade,
  created_by uuid not null references public.profiles,
  booking_id uuid references public.bookings on delete set null,
  status text not null default 'open' check (status in ('open', 'blocked')),
  last_message_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

-- Le parent d'un élève mineur y figure comme « observer » : il lit tous les échanges.
create table public.conversation_members (
  conversation_id uuid not null references public.conversations on delete cascade,
  user_id uuid not null references public.profiles on delete cascade,
  member_role text not null check (member_role in ('tutor', 'student', 'parent', 'observer')),
  last_read_at timestamptz,
  primary key (conversation_id, user_id)
);
create index conversation_members_user_idx on public.conversation_members (user_id);

create table public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations on delete cascade,
  sender_id uuid not null references public.profiles,
  body text not null check (char_length(body) between 1 and 1000),
  created_at timestamptz not null default now(),
  deleted_at timestamptz
);
create index messages_conversation_idx on public.messages (conversation_id, created_at);

-- Les numéros de téléphone sont masqués pour garder les échanges sur la plateforme.
create or replace function private.mask_contact_details()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.body := regexp_replace(new.body, '\+?[0-9][0-9 .-]{7,}[0-9]', '•••', 'g');
  return new;
end;
$$;
create trigger messages_mask before insert on public.messages
  for each row execute function private.mask_contact_details();

create or replace function private.bump_conversation()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  update public.conversations set last_message_at = new.created_at where id = new.conversation_id;
  return new;
end;
$$;
create trigger messages_bump after insert on public.messages
  for each row execute function private.bump_conversation();

create table public.reports (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid not null references public.profiles,
  target_type public.report_target not null,
  target_id uuid not null,
  reason text not null check (char_length(reason) between 3 and 500),
  status text not null default 'open' check (status in ('open', 'handled')),
  handled_by uuid references public.profiles,
  handled_at timestamptz,
  created_at timestamptz not null default now()
);

-- Notifications : type + paramètres, traduits à l'affichage (français, wolof plus tard).
create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles on delete cascade,
  type text not null,
  params jsonb not null default '{}'::jsonb,
  link text,
  read_at timestamptz,
  created_at timestamptz not null default now()
);
create index notifications_user_idx on public.notifications (user_id, created_at desc);

create table public.push_subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles on delete cascade,
  endpoint text not null unique,
  p256dh text not null,
  auth text not null,
  created_at timestamptz not null default now()
);
