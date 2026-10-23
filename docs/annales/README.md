# Annales officielles du Bac

Les sujets et corrigés du Bac sont publiés par l’Office du Bac sur [officedubac.sn](https://officedubac.sn/category/epreuves-corriges/). Le relevé du 23/10/2026 compte 731 documents, des sessions 2023 à 2026.

**DIANGAL n’en héberge aucune copie.** L’espace Examens (onglet Bac) affiche les liens vers les PDF officiels, avec leur provenance. Ces documents appartiennent à l’Office du Bac.

## Fichiers

- **Données de l’application** : `src/mocks/official-papers.ts`.
  - Elles sont générées par `node scripts/import-official-papers.mjs`, qui lit les pages de l’Office, classe chaque PDF et écarte les liens morts.
  - Elles passent ensuite dans le seed, avec `pnpm db:seed`.
- **Base** : table `public.official_papers` (migration `20261023000001_official_papers.sql`).
  - Lecture publique ; aucune écriture possible depuis un compte.
  - Seuls les liens du site officiel sont acceptés.
- **Liste lisible dans Excel** : [officedubac-2023-2026.csv](officedubac-2023-2026.csv).

## Classement

Le classement est déduit du libellé de chaque lien (« Epr-Maths-S1-2ndGr », « Corr-Philo-L-Remp-1erGr »…) :
- type : épreuve ou corrigé ;
- matière ;
- série ;
- 1er ou 2e groupe ;
- sujet de remplacement.

Les séries absentes de DIANGAL (S1A, S2A, L-AR, L1a, F6, STIDD) gardent leur libellé, sans correspondance. Les langues vivantes et les documents sans série précisée sont proposés à toutes les séries, dans un bloc replié.

## Nouvelle session

1. Ajouter les pages de la session (épreuves, corrigés) à `PAGES` dans `scripts/import-official-papers.mjs`.
2. Lancer le script, puis `pnpm db:seed`.
3. Publier en ligne avec un lot d’insertions `on conflict (url) do nothing`.
