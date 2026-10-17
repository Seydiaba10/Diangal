-- DIANGAL · matières propres à certaines séries du lycée : économie et gestion (série G), construction
-- mécanique, fabrication et automatismes (S3, T1), électrotechnique-électronique (T2), sciences agricoles
-- (S4) et technologie agroalimentaire (S5). Migration additive : aucune donnée existante n'est modifiée.

insert into public.subjects (code, slug, name, color_token, icon) values
  ('ECO', 'economie', 'Économie', 'subject-eco', 'trending-up'),
  ('GEST', 'gestion', 'Techniques de gestion', 'subject-gest', 'briefcase'),
  ('CONST', 'construction-mecanique', 'Construction mécanique', 'subject-const', 'cog'),
  ('TECH', 'fabrication-automatismes', 'Fabrication et automatismes', 'subject-tech', 'wrench'),
  ('ELEC', 'electrotechnique', 'Électrotechnique-électronique', 'subject-elec', 'zap'),
  ('AGRI', 'sciences-agricoles', 'Sciences agricoles', 'subject-agri', 'sprout'),
  ('AGRO', 'agroalimentaire', 'Technologie agroalimentaire', 'subject-agro', 'wheat')
on conflict (code) do nothing;
