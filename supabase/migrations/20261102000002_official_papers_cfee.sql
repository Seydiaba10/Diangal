-- DIANGAL · sujets et corrigés du CFEE en PDF (02/11/2026), dans la table des sujets officiels du Bac.
-- Il n'existe plus de site officiel où les lire : l'ancien site du ministère (cm2.examen.sn) ne répond plus et
-- son domaine sert un site de jeux d'argent. Les copies contrôlées sont donc hébergées dans le seau public
-- content-free (annales/cfee/), liens cliquables retirés. Le Bac reste limité aux liens de l'Office du Bac.

alter table public.official_papers drop constraint official_papers_url_check;
alter table public.official_papers add constraint official_papers_url_check check (
  (exam_type = 'BAC' and url ~* '^https://officedubac\.sn/wp-content/uploads/[^ ]+\.pdf$')
  or (exam_type = 'CFEE' and url ~ '^https://[a-z0-9]+\.supabase\.co/storage/v1/object/public/content-free/annales/cfee/[a-z0-9-]+\.pdf$')
);

-- Page où la copie a été relevée (provenance gardée pour chaque document).
alter table public.official_papers drop constraint official_papers_source_page_check;
alter table public.official_papers add constraint official_papers_source_page_check
  check (source_page ~ '^https://(officedubac\.sn|epreuvesetcorriges\.com)/');

-- « Ressources et compétence » : au CFEE, cette colonne porte la partie de l'épreuve.
alter table public.official_papers drop constraint official_papers_series_label_check;
alter table public.official_papers add constraint official_papers_series_label_check
  check (char_length(series_label) <= 40);

-- Taille affichée avant l'ouverture : le réseau est lent et cher.
alter table public.official_papers add column file_kb integer check (file_kb > 0);
