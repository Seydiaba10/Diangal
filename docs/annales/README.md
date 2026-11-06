# Annales officielles

## Bac

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

## CFEE

L’onglet CFEE de la page Examens propose **166 PDF** (71 Mo) : sujets de 2013 à 2019 et de 2022 à 2025, des corrigés, et les examens blancs de 2014 et de 2026. Contrairement au Bac, DIANGAL **héberge ces copies**, car il n’existe plus de site officiel où les lire : `cm2.examen.sn`, l’ancien site du ministère, ne répond plus et le domaine `examen.sn` sert aujourd’hui un site de jeux d’argent. Décision du porteur du projet (02/11/2026), après avoir été informé du point suivant.

**Droits.** Ces documents ont été relevés sur [epreuvesetcorriges.com](https://epreuvesetcorriges.com/categories/senegal/examens/cep), qui n’affiche ni licence ni source pour eux. Être téléchargeable n’autorise pas à republier. La loi n° 2008-09 ne tranche pas pour un sujet d’examen (art. 9 textes officiels, art. 19 et 20 œuvres de fonctionnaires, art. 42 exception d’enseignement « sans but lucratif »). Une demande d’autorisation à la Direction des Examens et Concours reste à faire. En cas de demande de retrait : supprimer les fichiers du seau et les lignes de `official_papers` où `exam_type = 'CFEE'`.

### Contrôle fait le 02/11/2026

Les 232 documents du site ont été regardés un par un. La liste complète, avec la raison de chaque exclusion : [cfee-2013-2026.csv](cfee-2013-2026.csv).

- **Gardés** : les scans portant le tampon de la Direction des Examens et Concours (2023 à 2025, examen blanc de 2026), ses guides de correction (2025, 2026, examen blanc de 2026), et les pages imprimées de l’ancien site du ministère (2013 à 2022, examen blanc de 2014).
- **Écartés (66)** :
  - 48 documents de 2000 à 2012 : texte recopié, sans marque officielle, ancien format ;
  - les 6 fichiers titrés « CFEE 2026 » : la copie porte « SESSION DE 2025 ». Il n’y a donc pas de sujet de la session 2026, seulement ses corrigés, qui reprennent les énoncés ;
  - 2 « corrections 2024 » qui ne sont pas officielles (photo d’un cahier, texte sans rapport) ;
  - 3 pages cassées, où les formules sont remplacées par un message d’erreur ;
  - 7 doublons ou copies moins lisibles.
- **Nettoyage** : tous les liens cliquables et les actions automatiques sont retirés des PDF (le relevé contenait 1 529 liens dans 133 documents, surtout vers `cm2.examen.sn`). Le contenu des pages n’est pas modifié. Le texte imprimé des adresses reste visible sur les pages, sans être un lien, tout comme la marque « Sidibe Sn » sur certains scans de 2024.
- **Données personnelles** : aucun nom d’élève ni copie remplie dans les documents gardés ; les noms affichés sont ceux des auteurs du site et le numéro de téléphone celui du bureau RESAFAD.

Manquent : les sessions 2020 et 2021, les corrigés de 2018, 2022, 2023 et 2024.

### Fichiers

- **PDF** : hors du dépôt, qui est public. Originaux dans `C:\MES PROJETS\diangal-annales\cfee\brut`, copies nettoyées dans `…\publies` ; en ligne dans le seau public `content-free`, sous `annales/cfee/`.
- **Données de l’application** : `src/mocks/official-papers-cfee.ts`, puis le seed (`pnpm db:seed`).
- **Base** : table `official_papers` (`exam_type = 'CFEE'`, migration `20261102000002_official_papers_cfee.sql`). Seul le Storage du projet est accepté comme adresse pour le CFEE, et seul l’Office du Bac pour le Bac.
- **Script** : `scripts/import-cfee-papers.mjs` classe et nettoie les PDF, écrit le mock et le CSV ; `--upload` envoie les fichiers au seau sans jamais écraser un fichier existant.
- **Démo** : les liens pointent vers `public/annales/cfee/`, dossier local exclu de Git (`.git/info/exclude`). Sans ce dossier, les liens de la démo renvoient une erreur 404.

### Mettre en ligne

Dans cet ordre, pour que le site ne lise jamais une colonne absente : appliquer la migration, envoyer les fichiers (`--upload`), insérer les lignes, déployer.

Fait le 06/11/2026 : migration appliquée, 166 fichiers envoyés, 166 lignes insérées, site déployé, liens vérifiés sur le site avec un élève de CM2 temporaire.
