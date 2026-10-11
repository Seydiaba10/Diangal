-- DIANGAL · sécurité : droits explicites + RLS sur 100 % des tables.
-- Principe : on retire tout, puis on accorde le strict nécessaire, table par table et colonne par colonne.

revoke all on all tables in schema public from anon, authenticated;
revoke all on all sequences in schema public from anon, authenticated;

do $$
declare t record;
begin
  for t in select tablename from pg_tables where schemaname = 'public' loop
    execute format('alter table public.%I enable row level security', t.tablename);
  end loop;
end;
$$;

-- ── Référentiels : lecture pour tous, écriture admin ────────────────────────
do $$
declare t text;
begin
  foreach t in array array['regions', 'cities', 'neighborhoods', 'levels', 'series', 'level_series', 'subjects', 'programs', 'exam_sessions', 'plans']
  loop
    execute format('grant select on public.%I to anon, authenticated', t);
    execute format('grant insert, update, delete on public.%I to authenticated', t);
    execute format('create policy %I on public.%I for select to anon, authenticated using (true)', t || '_read', t);
    execute format('create policy %I on public.%I for all to authenticated using (private.is_admin()) with check (private.is_admin())', t || '_admin', t);
  end loop;
end;
$$;

-- ── Contenus ────────────────────────────────────────────────────────────────
grant select on public.chapters, public.lessons, public.lesson_bodies, public.media to anon, authenticated;
grant insert, update, delete on public.chapters, public.lessons, public.lesson_bodies, public.media to authenticated;

create policy chapters_read on public.chapters for select to anon, authenticated
  using (status = 'published' or private.is_admin());
create policy chapters_admin on public.chapters for all to authenticated
  using (private.is_admin()) with check (private.is_admin());

create policy lessons_read on public.lessons for select to anon, authenticated
  using (status = 'published' or private.is_admin());
create policy lessons_admin on public.lessons for all to authenticated
  using (private.is_admin()) with check (private.is_admin());

-- Corps de leçon : gratuit pour tous, Premium pour les abonnés uniquement.
create policy lesson_bodies_read on public.lesson_bodies for select to anon, authenticated
  using (
    private.is_admin() or exists (
      select 1 from public.lessons l
      where l.id = lesson_id and l.status = 'published'
        and (not l.is_premium or private.has_premium(auth.uid()))
    )
  );
create policy lesson_bodies_admin on public.lesson_bodies for all to authenticated
  using (private.is_admin()) with check (private.is_admin());

create policy media_read on public.media for select to anon, authenticated
  using (not is_premium or private.has_premium(auth.uid()) or private.is_admin());
create policy media_admin on public.media for all to authenticated
  using (private.is_admin()) with check (private.is_admin());

-- ── Évaluations : métadonnées visibles, questions et corrigés via fonctions uniquement ──
grant select on public.assessments to anon, authenticated;
grant select, insert, update, delete on public.questions, public.question_options, public.assessment_questions to authenticated;
grant insert, update, delete on public.assessments to authenticated;

create policy assessments_read on public.assessments for select to anon, authenticated
  using (status = 'published' or private.is_admin());
create policy assessments_admin on public.assessments for all to authenticated
  using (private.is_admin()) with check (private.is_admin());
create policy questions_admin on public.questions for all to authenticated
  using (private.is_admin()) with check (private.is_admin());
create policy question_options_admin on public.question_options for all to authenticated
  using (private.is_admin()) with check (private.is_admin());
create policy assessment_questions_admin on public.assessment_questions for all to authenticated
  using (private.is_admin()) with check (private.is_admin());

-- Tentatives : lecture par l'élève, son parent et l'admin ; écriture par start/submit_attempt.
grant select on public.attempts, public.attempt_answers to authenticated;
create policy attempts_read on public.attempts for select to authenticated
  using (private.can_view_student(user_id));
create policy attempt_answers_read on public.attempt_answers for select to authenticated
  using (exists (
    select 1 from public.attempts a
    where a.id = attempt_id and a.status = 'submitted' and private.can_view_student(a.user_id)
  ));

-- ── Progression ─────────────────────────────────────────────────────────────
grant select, insert, update on public.lesson_progress to authenticated;
grant select on public.chapter_mastery, public.daily_activity to authenticated;
create policy lesson_progress_read on public.lesson_progress for select to authenticated
  using (private.can_view_student(user_id));
create policy lesson_progress_write on public.lesson_progress for insert to authenticated
  with check (user_id = auth.uid());
create policy lesson_progress_update on public.lesson_progress for update to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy chapter_mastery_read on public.chapter_mastery for select to authenticated
  using (private.can_view_student(user_id));
create policy daily_activity_read on public.daily_activity for select to authenticated
  using (private.can_view_student(user_id));

-- ── Profils : jamais de téléphone ni d'email par l'API ────────────────────────
grant select (id, role, first_name, last_name, locale, city_id, avatar_key, created_at) on public.profiles to authenticated;
grant update (first_name, last_name, locale, city_id, avatar_key) on public.profiles to authenticated;
create policy profiles_read on public.profiles for select to authenticated
  using (
    id = auth.uid()
    or private.is_parent_of(id)
    or exists (
      select 1 from public.parent_links l
      where l.student_id = auth.uid() and l.parent_id = profiles.id and l.status = 'active'
    )
    or private.shares_conversation(id)
    or private.is_admin()
  );
create policy profiles_update on public.profiles for update to authenticated
  using (id = auth.uid()) with check (id = auth.uid());

-- Date de naissance, statut de consentement : jamais modifiables par l'élève.
grant select (user_id, level_id, series_id, school_name, consent_status, data_saver, student_code, updated_at)
  on public.student_profiles to authenticated;
grant update (school_name, data_saver) on public.student_profiles to authenticated;
create policy student_profiles_read on public.student_profiles for select to authenticated
  using (private.can_view_student(user_id));
create policy student_profiles_update on public.student_profiles for update to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());

grant select on public.parent_links, public.consents to authenticated;
create policy parent_links_read on public.parent_links for select to authenticated
  using (parent_id = auth.uid() or student_id = auth.uid() or private.is_admin());
create policy consents_read on public.consents for select to authenticated
  using (subject_user_id = auth.uid() or granted_by = auth.uid() or private.is_admin());
-- consent_requests : aucun accès direct (fonctions request/decide_parental_consent).

-- ── Répétiteurs ─────────────────────────────────────────────────────────────
grant select on public.tutor_profiles to anon, authenticated;
grant update (headline, bio, years_experience, hourly_rate_fcfa, mode, city_id, neighborhood_id, whatsapp_opt_in, photo_path)
  on public.tutor_profiles to authenticated;
create policy tutor_profiles_read on public.tutor_profiles for select to anon, authenticated
  using (status = 'approved' or user_id = auth.uid() or private.is_admin());
create policy tutor_profiles_update on public.tutor_profiles for update to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());

do $$
declare t text;
begin
  foreach t in array array['tutor_subjects', 'tutor_levels', 'tutor_qualifications', 'tutor_availability']
  loop
    execute format('grant select on public.%I to anon, authenticated', t);
    execute format('grant insert, update, delete on public.%I to authenticated', t);
    execute format(
      'create policy %I on public.%I for select to anon, authenticated using (
         tutor_id = auth.uid() or private.is_admin()
         or exists (select 1 from public.tutor_profiles p where p.user_id = tutor_id and p.status = ''approved''))',
      t || '_read', t);
    execute format(
      'create policy %I on public.%I for all to authenticated using (tutor_id = auth.uid()) with check (tutor_id = auth.uid())',
      t || '_own', t);
  end loop;
end;
$$;

grant select, insert, update on public.tutor_private to authenticated;
create policy tutor_private_own on public.tutor_private for all to authenticated
  using (user_id = auth.uid() or private.is_admin()) with check (user_id = auth.uid());

grant select, insert on public.tutor_documents to authenticated;
grant update (status, reviewed_by, reviewed_at, purge_after) on public.tutor_documents to authenticated;
create policy tutor_documents_read on public.tutor_documents for select to authenticated
  using (tutor_id = auth.uid() or private.is_admin());
create policy tutor_documents_insert on public.tutor_documents for insert to authenticated
  with check (tutor_id = auth.uid() and status = 'pending');
create policy tutor_documents_review on public.tutor_documents for update to authenticated
  using (private.is_admin()) with check (private.is_admin());

-- Réservations (R2) : lecture par les personnes concernées ; écriture via fonctions.
grant select on public.bookings to authenticated;
create policy bookings_read on public.bookings for select to authenticated
  using (
    student_id = auth.uid() or booked_by = auth.uid() or tutor_id = auth.uid()
    or private.is_parent_of(student_id) or private.is_admin()
  );

grant select, insert on public.reviews to anon, authenticated;
grant update (status, moderated_by, moderated_at) on public.reviews to authenticated;
revoke insert on public.reviews from anon;
create policy reviews_read on public.reviews for select to anon, authenticated
  using (status = 'published' or author_id = auth.uid() or private.is_admin());
create policy reviews_insert on public.reviews for insert to authenticated
  with check (
    author_id = auth.uid() and status = 'pending'
    and exists (
      select 1 from public.bookings b
      where b.id = booking_id and b.status = 'completed' and b.tutor_id = reviews.tutor_id
        and (b.booked_by = auth.uid() or b.student_id = auth.uid())
    )
  );
create policy reviews_moderate on public.reviews for update to authenticated
  using (private.is_admin()) with check (private.is_admin());

-- ── Messagerie ──────────────────────────────────────────────────────────────
grant select on public.conversations, public.conversation_members to authenticated;
grant update (last_read_at) on public.conversation_members to authenticated;
grant select, insert on public.messages to authenticated;
create policy conversations_read on public.conversations for select to authenticated
  using (private.is_member(id) or private.is_admin());
create policy conversation_members_read on public.conversation_members for select to authenticated
  using (private.is_member(conversation_id) or private.is_admin());
create policy conversation_members_read_mark on public.conversation_members for update to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy messages_read on public.messages for select to authenticated
  using (private.is_member(conversation_id) or private.is_admin());
-- Un observateur (parent) lit mais n'écrit pas ; un mineur doit avoir la validation parentale.
create policy messages_insert on public.messages for insert to authenticated
  with check (
    sender_id = auth.uid()
    and private.has_consent(auth.uid())
    and exists (
      select 1 from public.conversation_members m
      where m.conversation_id = messages.conversation_id and m.user_id = auth.uid() and m.member_role <> 'observer'
    )
  );

grant select, insert on public.reports to authenticated;
grant update (status, handled_by, handled_at) on public.reports to authenticated;
create policy reports_insert on public.reports for insert to authenticated
  with check (reporter_id = auth.uid() and status = 'open');
create policy reports_read on public.reports for select to authenticated
  using (reporter_id = auth.uid() or private.is_admin());
create policy reports_handle on public.reports for update to authenticated
  using (private.is_admin()) with check (private.is_admin());

grant select on public.notifications to authenticated;
grant update (read_at) on public.notifications to authenticated;
create policy notifications_own on public.notifications for select to authenticated using (user_id = auth.uid());
create policy notifications_mark on public.notifications for update to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());

grant select, insert, delete on public.push_subscriptions to authenticated;
create policy push_subscriptions_own on public.push_subscriptions for all to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());

-- ── Paiements : lecture des siens ; écriture réservée au serveur (clé secrète) ──
grant select on public.subscriptions, public.payments to authenticated;
create policy subscriptions_read on public.subscriptions for select to authenticated
  using (payer_id = auth.uid() or private.can_view_student(student_id));
create policy payments_read on public.payments for select to authenticated
  using (payer_id = auth.uid() or private.is_admin());

grant select on public.payment_events, public.platform_settings, public.audit_logs to authenticated;
grant insert, update on public.platform_settings to authenticated;
create policy payment_events_admin on public.payment_events for select to authenticated using (private.is_admin());
create policy platform_settings_admin on public.platform_settings for all to authenticated
  using (private.is_admin()) with check (private.is_admin());
create policy audit_logs_admin on public.audit_logs for select to authenticated using (private.is_admin());

-- Le hook d'Auth lit le rôle du profil pour l'ajouter au JWT.
do $$
begin
  if exists (select 1 from pg_roles where rolname = 'supabase_auth_admin') then
    grant usage on schema public to supabase_auth_admin;
    grant execute on function public.custom_access_token_hook(jsonb) to supabase_auth_admin;
    grant select (id, role) on public.profiles to supabase_auth_admin;
    create policy profiles_auth_hook on public.profiles for select to supabase_auth_admin using (true);
  end if;
end;
$$;
