-- DIANGAL · matière « éducation artistique », évaluée au CFEE (guide pratique du CFEE, 2018) : elle porte
-- les sujets blancs de CM2. Migration additive : aucune donnée existante n'est modifiée.

insert into public.subjects (code, slug, name, color_token, icon) values
  ('ART', 'education-artistique', 'Éducation artistique', 'subject-art', 'palette')
on conflict (code) do nothing;
