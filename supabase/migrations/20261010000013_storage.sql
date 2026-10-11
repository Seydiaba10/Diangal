-- DIANGAL · stockage (Supabase Storage). Ignoré si le schéma « storage » n'existe pas (tests PGlite).

do $outer$
begin
  if not exists (select 1 from information_schema.schemata where schema_name = 'storage') then
    raise notice 'schéma storage absent : migration de stockage ignorée';
    return;
  end if;

  insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types) values
    ('public-assets', 'public-assets', true, 1048576, array['image/webp', 'image/png', 'image/jpeg', 'image/svg+xml']),
    -- Contenus gratuits : publics, donc mis en cache par le CDN (économie de données).
    ('content-free', 'content-free', true, 52428800, array['application/pdf', 'video/mp4', 'audio/mp4', 'audio/mpeg', 'image/webp']),
    -- Contenus Premium : privés, servis par URL signée d'une heure après vérification de l'abonnement.
    ('content-premium', 'content-premium', false, 52428800, array['application/pdf', 'video/mp4', 'audio/mp4', 'audio/mpeg', 'image/webp']),
    -- Pièces des répétiteurs : privées, lues par l'admin uniquement, purgées 30 jours après la décision.
    ('tutor-documents', 'tutor-documents', false, 10485760, array['application/pdf', 'image/jpeg', 'image/png'])
  on conflict (id) do nothing;

  execute $p$
    create policy content_premium_read on storage.objects for select to authenticated
    using (bucket_id = 'content-premium' and private.has_premium(auth.uid()))
  $p$;

  execute $p$
    create policy tutor_documents_upload on storage.objects for insert to authenticated
    with check (
      bucket_id = 'tutor-documents'
      and (storage.foldername(name))[1] = auth.uid()::text
      and private.app_role() = 'tutor'
    )
  $p$;

  execute $p$
    create policy tutor_documents_read on storage.objects for select to authenticated
    using (
      bucket_id = 'tutor-documents'
      and ((storage.foldername(name))[1] = auth.uid()::text or private.is_admin())
    )
  $p$;

  execute $p$
    create policy content_admin_write on storage.objects for all to authenticated
    using (bucket_id in ('public-assets', 'content-free', 'content-premium') and private.is_admin())
    with check (bucket_id in ('public-assets', 'content-free', 'content-premium') and private.is_admin())
  $p$;
end;
$outer$;
