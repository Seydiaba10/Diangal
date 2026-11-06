# Sujets blancs du Bac (DIANGAL)

Premier lot rédigé le 06/11/2026 (« Bac blanc DIANGAL n°1 »). Ce ne sont **pas** des sujets officiels : énoncés, corrigés et grilles sont rédigés par DIANGAL et doivent être relus par des enseignants avant d’être mis en avant.

## Ce qui existe

11 sujets, copiés pour chaque série qui passe l’épreuve. Cela fait 53 évaluations (`kind = mock_exam`, `exam_type = BAC`, une série par copie : `bac-blanc-1-maths-s-s2`, `bac-blanc-1-francais-resume-l1`…).

| Sujet | Durée | Forme (d’après les sujets de l’Office du Bac de 2023 à 2026) | Séries |
|---|---|---|---|
| Mathématiques S | 4 h | exercice 1 (4 pts), exercice 2 (6 pts), problème (10 pts) | S2, S4, S5 |
| Sciences physiques S | 4 h | 5 exercices de 4 pts (2 de chimie, 3 de physique) | S2, S4, S5 |
| SVT S | 4 h | I. maîtrise des connaissances (5 pts, exposé) ; II. compétences méthodologiques (13 pts : 6 + 7) ; III. communication (2 pts) | S2, S4, S5 |
| Philosophie S | 4 h | un sujet au choix parmi trois (deux dissertations, un texte) | S1 à S5 |
| Philosophie L | 4 h | même forme, autres sujets | L1, L2, LA |
| Français : résumé et discussion | 4 h | résumé (10 pts) et discussion (10 pts) | toutes les séries S et L |
| Français : commentaire | 4 h | commentaire composé (20 pts) | toutes les séries S et L |
| Français : dissertation | 4 h | dissertation (20 pts) | toutes les séries S et L |
| Histoire et géographie | 4 h | A. histoire (10 pts) et B. géographie (10 pts), un sujet au choix dans chaque partie | S1, S2, S4, S5, L1, L2, LA |
| Anglais (première langue) | 3 h | I. reading comprehension (8 pts) ; II. language (6 pts) ; III. writing (6 pts) | L1, L2 |
| Mathématiques L | 3 h | exercice 1 (5 pts), exercice 2 (5 pts), problème (10 pts) | L1, L2, LA |

Au Bac, le français propose trois sujets au choix. DIANGAL en fait trois sujets blancs, un par type d’épreuve, chacun avec sa propre grille. Un élève s’entraîne ainsi à celui qu’il veut.

## Fichiers

- `src/mocks/tle/bac-blancs/` : un fichier par matière, et `index.ts` qui fait les copies par série et appelle `buildMockExams("TLE", …)`.
- `MockExamSpec.series` (`mocks/exercise-series.ts`) rattache une copie aux chapitres de sa série. Le sujet n’est alors montré qu’aux élèves de cette série (`getMockExams("BAC", série)`).
- Pour chaque question, on note son chapitre de Terminale dans la série, pour les points faibles. Seuls les 2 points de communication de SVT ne sont rattachés à aucun chapitre.

## Correction

- Les questions à choix, vrai ou faux et à nombre sont corrigées automatiquement, comme pour le BFEM et le CFEE.
- Les productions écrites sont auto-évaluées par paliers « réussi / à revoir » (type `self_check`) : exposé de SVT, figures et tracés en maths, dissertations et texte en philosophie, français, histoire-géographie, writing en anglais. Le corrigé de chaque palier est montré avant que l’élève s’évalue.
- Ces grilles sont un **barème DIANGAL**. L’Office du Bac ne publie pas de grille officielle détaillée pour ces épreuves. En SVT seulement, la répartition de la communication (plan, expression, présentation) reprend celle des sujets officiels.
- En philosophie, la grille est la même pour les trois sujets au choix : le corrigé de chaque palier traite les trois. En histoire-géographie, c’est la même chose pour les deux sujets de chaque partie.

## Textes utilisés

- Rédigés par DIANGAL : le texte à résumer (« Lire à l’heure des écrans ») et le texte d’anglais (« A classroom in her pocket »).
- Du domaine public :
  - Descartes, *Discours de la méthode* (1637) : sixième partie pour la série S, première partie pour la série L ;
  - Victor Hugo, « Demain, dès l’aube… », *Les Contemplations* (1856).
- Texte officiel : recommandation de la conférence de Brazzaville (1944), pour le commentaire d’histoire.
- Aucune statistique n’est inventée. C’est pourquoi le commentaire de document de géographie est remplacé par une seconde dissertation. Il faudra un vrai document, avec des données vérifiées, pour le rétablir.

## Vérifications

- `tests/unit/bac-blancs.test.ts` vérifie, pour chaque sujet :
  - la forme : durée, parties et points, total sur 20, points annoncés dans chaque palier ;
  - les séries et les chapitres de rattachement ;
  - les calculs écrits dans les corrigés, et chaque résultat recalculé par le programme (nombres complexes, probabilités, pH et pKa, mouvement d’un projectile, dipôle RC, effet photoélectrique, génétique, potentiel d’action, statistiques, intégrales) ;
  - la longueur du texte à résumer, du résumé modèle et de la rédaction d’anglais ;
  - qu’une copie parfaite obtient 20/20.
- `tests/db/bac-blancs.test.ts` vérifie la même chose dans la base :
  - le catalogue range chaque sujet sous le Bac, avec sa série ;
  - un élève de Terminale S2 obtient 20/20 avec une copie parfaite à chacun de ses 8 sujets.

## Limites et suite

- Ces sujets sont en ligne depuis le 06/11/2026 (lots rejouables calculés par comparaison des seeds, comme le 01/11/2026), vérifiés sur le site avec un élève de Terminale S2 temporaire.
- Rien n’est encore prévu pour plusieurs séries :
  - G, T1, T2 et S3 : épreuves techniques ;
  - S1 : mathématiques, sciences physiques et SVT ;
  - LA : anglais ;
  - toutes les séries : langues vivantes 2, arabe, économie.
- Les sujets n°2 restent à écrire.
- La relecture par des enseignants est à faire, en priorité pour les grilles de philosophie et de français.
