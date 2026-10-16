-- DIANGAL · passage en classe supérieure, avec l'historique des classes.
-- Les notes, la progression et les séances restent attachées à l'élève : rien n'est effacé.

-- Une ligne par classe quittée.
create table public.student_level_history (
  id bigint generated always as identity primary key,
  student_id uuid not null references public.profiles on delete cascade,
  level_id smallint not null references public.levels,
  series_id smallint references public.series,
  started_at timestamptz not null,
  ended_at timestamptz not null default now(),
  -- Élève, parent lié ou admin qui a fait le passage.
  changed_by uuid references public.profiles on delete set null
);
create index student_level_history_student_idx on public.student_level_history (student_id, ended_at desc);
create index student_level_history_level_idx on public.student_level_history (level_id);
create index student_level_history_series_idx on public.student_level_history (series_id);
create index student_level_history_changed_by_idx on public.student_level_history (changed_by);

alter table public.student_level_history enable row level security;
grant select on public.student_level_history to authenticated;
-- Lecture : l'élève, ses parents liés et l'admin. Écriture : promote_student seulement.
create policy student_level_history_read on public.student_level_history for select to authenticated
  using (private.can_view_student(student_id));

/**
 * Passe l'élève dans la classe suivante (CI → CP … → Terminale). La série est obligatoire si la
 * classe suivante en a (2nde, 1re, Terminale) ; la série actuelle est gardée si elle reste valable.
 * Autorisé à l'élève lui-même, à un parent lié (lien actif) et à l'admin. Après la Terminale :
 * end_of_track.
 */
create or replace function public.promote_student(p_student uuid, p_series text default null)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  uid uuid := auth.uid();
  sp public.student_profiles%rowtype;
  current_order smallint;
  next_level public.levels%rowtype;
  next_series smallint;
  since timestamptz;
begin
  if uid is null then raise exception 'not_authenticated' using errcode = '28000'; end if;
  if not ((p_student = uid and private.app_role() = 'student') or private.is_parent_of(p_student) or private.is_admin()) then
    raise exception 'forbidden' using errcode = '42501';
  end if;

  select * into sp from public.student_profiles where user_id = p_student for update;
  if not found then raise exception 'not_found' using errcode = 'P0002'; end if;
  select l.sort_order into current_order from public.levels l where l.id = sp.level_id;
  select * into next_level from public.levels l where l.sort_order > current_order order by l.sort_order limit 1;
  if not found then raise exception 'end_of_track' using errcode = '22023'; end if;

  if exists (select 1 from public.level_series ls where ls.level_id = next_level.id) then
    select s.id into next_series
    from public.series s join public.level_series ls on ls.series_id = s.id and ls.level_id = next_level.id
    where s.code = coalesce(nullif(trim(p_series), ''), (select s2.code from public.series s2 where s2.id = sp.series_id));
    if next_series is null then raise exception 'series_required' using errcode = '22023'; end if;
  end if;

  -- Début de la classe quittée : le passage précédent, sinon la création du compte.
  select coalesce(
    (select max(h.ended_at) from public.student_level_history h where h.student_id = p_student),
    (select p.created_at from public.profiles p where p.id = p_student)
  ) into since;
  insert into public.student_level_history (student_id, level_id, series_id, started_at, changed_by)
  values (p_student, sp.level_id, sp.series_id, since, uid);
  update public.student_profiles set level_id = next_level.id, series_id = next_series where user_id = p_student;

  return jsonb_build_object(
    'level_code', next_level.code,
    'series_code', (select s.code from public.series s where s.id = next_series)
  );
end;
$$;

revoke execute on function public.promote_student(uuid, text) from public, anon, authenticated;
grant execute on function public.promote_student(uuid, text) to authenticated;
