-- Retrait de l'offre « Pass BFEM (jusqu'à l'examen) — 7 500 FCFA » (demande du 22/10/2026).
-- Non destructif : la formule est seulement désactivée, pour garder l'historique des paiements
-- (payments.plan_id) ; create_payment_intent refuse déjà les formules inactives.
update public.plans set is_active = false where code = 'bfem_pass';
