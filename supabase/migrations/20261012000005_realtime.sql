-- DIANGAL · messagerie en temps réel : les nouveaux messages sont diffusés par Supabase Realtime.
-- Chaque abonné ne reçoit que les lignes que la RLS l'autorise à lire (membres de la conversation).
-- Ignoré si la publication n'existe pas (tests PGlite).
do $$
begin
  if exists (select 1 from pg_publication where pubname = 'supabase_realtime')
     and not exists (
       select 1 from pg_publication_tables
       where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'messages'
     ) then
    alter publication supabase_realtime add table public.messages;
  end if;
end;
$$;
