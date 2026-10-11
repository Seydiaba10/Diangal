-- DIANGAL · extensions, schéma privé et types énumérés.

create schema if not exists extensions;
create extension if not exists btree_gist with schema extensions;
create extension if not exists unaccent with schema extensions;
create extension if not exists pgcrypto with schema extensions;

-- Schéma non exposé par l'API : fonctions SECURITY DEFINER des règles RLS et corrigés.
create schema if not exists private;
revoke all on schema private from public;

create type public.app_role as enum ('student', 'parent', 'tutor', 'admin');
create type public.cycle as enum ('elementaire', 'moyen', 'secondaire');
create type public.exam_type as enum ('CFEE', 'BFEM', 'BAC');
create type public.publish_status as enum ('draft', 'review', 'published', 'archived');
create type public.consent_status as enum ('not_required', 'pending', 'granted', 'refused');
create type public.link_status as enum ('pending', 'active', 'revoked');
create type public.consent_type as enum ('terms', 'privacy', 'parental', 'marketing');
create type public.media_kind as enum ('pdf', 'video', 'audio', 'image');
create type public.assessment_kind as enum ('exercise', 'quiz', 'mock_exam', 'past_paper');
create type public.question_type as enum ('single_choice', 'multiple_choice', 'true_false', 'short_text', 'numeric');
create type public.attempt_status as enum ('in_progress', 'submitted', 'expired');
create type public.progress_status as enum ('not_started', 'in_progress', 'completed');
create type public.tutor_status as enum ('draft', 'pending', 'approved', 'rejected', 'suspended');
create type public.teaching_mode as enum ('online', 'home', 'both');
create type public.document_type as enum ('cni', 'passport', 'diploma', 'criminal_record');
create type public.review_status as enum ('pending', 'published', 'rejected');
create type public.booking_status as enum (
  'requested', 'accepted', 'declined', 'paid', 'completed', 'cancelled', 'disputed', 'refunded', 'expired'
);
create type public.payment_status as enum ('pending', 'succeeded', 'failed', 'cancelled', 'refunded');
create type public.payment_channel as enum ('wave', 'orange_money', 'free_money', 'card', 'other');
create type public.payment_purpose as enum ('subscription', 'booking');
create type public.report_target as enum ('message', 'review', 'tutor', 'user');

-- Met à jour updated_at à chaque modification.
create or replace function private.touch_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;
