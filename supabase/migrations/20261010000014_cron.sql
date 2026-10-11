-- DIANGAL · tâches planifiées. Ignoré si pg_cron n'est pas disponible (tests PGlite).

do $outer$
begin
  if not exists (select 1 from pg_available_extensions where name = 'pg_cron') then
    raise notice 'pg_cron indisponible : tâches planifiées ignorées';
    return;
  end if;

  create extension if not exists pg_cron;

  -- Copies jamais envoyées : corrigées avec les réponses sauvegardées.
  perform cron.schedule('diangal-expire-attempts', '*/5 * * * *', 'select private.expire_attempts()');
  -- Pass Premium arrivés à échéance.
  perform cron.schedule('diangal-expire-subscriptions', '7 * * * *', 'select private.expire_subscriptions()');
  -- Pièces d'identité des répétiteurs : suppression 30 jours après la décision.
  perform cron.schedule('diangal-purge-documents', '30 2 * * *', 'select private.purge_tutor_documents()');
  -- Demandes de consentement expirées.
  perform cron.schedule(
    'diangal-expire-consent-requests', '15 3 * * *',
    $q$delete from public.consent_requests where consumed_at is null and expires_at < now() - interval '30 days'$q$
  );
end;
$outer$;
