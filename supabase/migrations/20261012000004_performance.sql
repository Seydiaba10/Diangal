-- DIANGAL · performances signalées par le contrôle Supabase (Performance Advisor).

-- 1. Index sur les clés étrangères : jointures et suppressions en cascade sans parcours complet.
create index if not exists assessment_questions_question_id_idx on public.assessment_questions (question_id);
create index if not exists assessments_level_id_idx on public.assessments (level_id);
create index if not exists assessments_series_id_idx on public.assessments (series_id);
create index if not exists assessments_subject_id_idx on public.assessments (subject_id);
create index if not exists attempt_answers_question_id_idx on public.attempt_answers (question_id);
create index if not exists attempts_assessment_id_idx on public.attempts (assessment_id);
create index if not exists audit_logs_actor_id_idx on public.audit_logs (actor_id);
create index if not exists bookings_booked_by_idx on public.bookings (booked_by);
create index if not exists bookings_level_id_idx on public.bookings (level_id);
create index if not exists bookings_subject_id_idx on public.bookings (subject_id);
create index if not exists chapter_mastery_chapter_id_idx on public.chapter_mastery (chapter_id);
create index if not exists cities_region_id_idx on public.cities (region_id);
create index if not exists consents_granted_by_idx on public.consents (granted_by);
create index if not exists conversations_booking_id_idx on public.conversations (booking_id);
create index if not exists conversations_created_by_idx on public.conversations (created_by);
create index if not exists conversations_parent_id_idx on public.conversations (parent_id);
create index if not exists conversations_student_id_idx on public.conversations (student_id);
create index if not exists conversations_tutor_id_idx on public.conversations (tutor_id);
create index if not exists lesson_progress_lesson_id_idx on public.lesson_progress (lesson_id);
create index if not exists level_series_series_id_idx on public.level_series (series_id);
create index if not exists media_assessment_id_idx on public.media (assessment_id);
create index if not exists messages_sender_id_idx on public.messages (sender_id);
create index if not exists payments_beneficiary_id_idx on public.payments (beneficiary_id);
create index if not exists payments_booking_id_idx on public.payments (booking_id);
create index if not exists payments_plan_id_idx on public.payments (plan_id);
create index if not exists profiles_city_id_idx on public.profiles (city_id);
create index if not exists programs_series_id_idx on public.programs (series_id);
create index if not exists push_subscriptions_user_id_idx on public.push_subscriptions (user_id);
create index if not exists questions_chapter_id_idx on public.questions (chapter_id);
create index if not exists questions_subject_id_idx on public.questions (subject_id);
create index if not exists reports_handled_by_idx on public.reports (handled_by);
create index if not exists reports_reporter_id_idx on public.reports (reporter_id);
create index if not exists reviews_author_id_idx on public.reviews (author_id);
create index if not exists reviews_moderated_by_idx on public.reviews (moderated_by);
create index if not exists student_profiles_level_id_idx on public.student_profiles (level_id);
create index if not exists student_profiles_series_id_idx on public.student_profiles (series_id);
create index if not exists subscriptions_payer_id_idx on public.subscriptions (payer_id);
create index if not exists subscriptions_payment_id_idx on public.subscriptions (payment_id);
create index if not exists subscriptions_plan_id_idx on public.subscriptions (plan_id);
create index if not exists tutor_documents_reviewed_by_idx on public.tutor_documents (reviewed_by);
create index if not exists tutor_profiles_city_id_idx on public.tutor_profiles (city_id);
create index if not exists tutor_profiles_neighborhood_id_idx on public.tutor_profiles (neighborhood_id);
create index if not exists tutor_profiles_verified_by_idx on public.tutor_profiles (verified_by);
create index if not exists tutor_qualifications_tutor_id_idx on public.tutor_qualifications (tutor_id);

-- 2. RLS : auth.uid() évalué une seule fois par requête, et non pour chaque ligne lue.
--    Même règle, réécrite en (select auth.uid()). Les nouvelles règles s'écrivent directement ainsi.
do $$
declare
  p record;
  stmt text;
begin
  for p in
    select tablename, policyname, qual, with_check
    from pg_policies
    where schemaname = 'public'
      and (coalesce(qual, '') like '%auth.uid()%' or coalesce(with_check, '') like '%auth.uid()%')
  loop
    stmt := format('alter policy %I on public.%I', p.policyname, p.tablename);
    if p.qual is not null then
      stmt := stmt || format(' using (%s)', replace(p.qual, 'auth.uid()', '(select auth.uid())'));
    end if;
    if p.with_check is not null then
      stmt := stmt || format(' with check (%s)', replace(p.with_check, 'auth.uid()', '(select auth.uid())'));
    end if;
    execute stmt;
  end loop;
end;
$$;
