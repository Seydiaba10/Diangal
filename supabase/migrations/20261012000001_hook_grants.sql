-- DIANGAL · le hook d'access token n'est appelé que par Supabase Auth (supabase_auth_admin).
-- Sur un projet hébergé, les privilèges par défaut donnent EXECUTE au rôle authenticated :
-- on le retire pour qu'aucun client ne puisse l'appeler via /rest/v1/rpc.
revoke execute on function public.custom_access_token_hook(jsonb) from public, anon, authenticated;
