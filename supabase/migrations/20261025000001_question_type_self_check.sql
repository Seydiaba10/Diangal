-- DIANGAL · nouveau type de question : travail fait sur l'ardoise ou le cahier (tracer, colorier,
-- reproduire), que l'élève compare au corrigé avant de s'évaluer. Fichier à part : une valeur ajoutée
-- à un type énuméré ne peut servir qu'une fois la transaction validée.

alter type public.question_type add value if not exists 'self_check';
