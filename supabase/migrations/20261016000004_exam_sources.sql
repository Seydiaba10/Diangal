-- DIANGAL · examens : vérification et provenance des sujets (annales officielles et sujets blancs).
-- Une annale n'est proposée aux élèves qu'une fois vérifiée ; chaque sujet affiche ses sources et
-- l'origine de son corrigé. Migration additive : le catalogue garde ses colonnes et en ajoute.

alter table public.assessments
  -- Comme pour les chapitres : à vérifier, relu par un enseignant, comparé à la source officielle.
  add column verification public.content_verification not null default 'unverified',
  -- [{ "title": "…", "url": "…", "kind": "official" | "external" | "diangal" }]
  add column sources jsonb not null default '[]'::jsonb check (jsonb_typeof(sources) = 'array'),
  -- Origine du corrigé (« Corrigé officiel de l'Office du Bac », « Corrigé DIANGAL relu par… »).
  add column correction_source text check (char_length(correction_source) <= 200);

-- Le catalogue public renvoie aussi la série, la vérification et la provenance.
drop function public.get_assessments_catalog();
create function public.get_assessments_catalog()
returns table (
  id uuid, slug text, kind public.assessment_kind, title text, subject_code text, level_code text,
  chapter_id uuid, exam_type public.exam_type, exam_year smallint, duration_s integer, is_premium boolean,
  questions_count integer, total_points numeric,
  series_code text, verification public.content_verification, sources jsonb, correction_source text
)
language sql
stable
security definer
set search_path = ''
as $$
  select a.id, a.slug, a.kind, a.title, s.code, l.code, a.chapter_id, a.exam_type, a.exam_year, a.duration_s, a.is_premium,
         (select count(*)::integer from public.assessment_questions aq where aq.assessment_id = a.id),
         (select coalesce(sum(q.points), 0) from public.assessment_questions aq join public.questions q on q.id = aq.question_id
          where aq.assessment_id = a.id),
         se.code, a.verification, a.sources, a.correction_source
  from public.assessments a
  join public.subjects s on s.id = a.subject_id
  join public.levels l on l.id = a.level_id
  left join public.series se on se.id = a.series_id
  where a.status = 'published' and a.owner_id is null
  order by a.created_at;
$$;

revoke execute on function public.get_assessments_catalog() from public, anon, authenticated;
grant execute on function public.get_assessments_catalog() to anon, authenticated;
