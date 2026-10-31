# Exercices de maths du CI : inventaire

Document interne. Même méthode que le CP (`inventaire-exercices-cp.md`) : une série **créée par DIANGAL**
pour chaque page du cahier d'exercices PAAME2 du CI (MEN, édition 2024), du même genre (mêmes types
d'exercices, nombres du palier, difficulté), avec d'autres nombres, énoncés et dessins. Le nom du cahier
n'apparaît jamais sur le site.

- Code : `src/mocks/ci/maths/` ; briques propres au CI dans `src/mocks/early-math.ts` (ensembles, positions,
  solides et patrons, points à compter, double et moitié, rangs, modèles, rythmes récursifs, tableaux à
  double entrée, longueurs et tailles), le reste vient des briques du CP.
- Nouvelles illustrations : crayon, cahier, ballon, bonbon (`public/illustrations/`).
- Vérification : `tests/unit/primary-exercises.test.ts` relit chaque dessin (métadonnées, positions,
  formes) pour recalculer la réponse ; il vérifie aussi que les nombres du CI restent jusqu'à 20.
- Le cahier fait entourer, colorier, relier ou tracer : ces exercices deviennent des questions à choix
  (lettres A, B, C…) ou à nombre, avec le même genre de dessin.

## 142 séries (une par page du cahier)

| Chapitre DIANGAL | Séries | Pages du cahier servant de modèle |
|---|---|---|
| Se repérer dans l’espace | 10 | Géométrie, palier 1 : droite / gauche (2), devant / derrière (2), près / loin, sur / sous / en haut / en bas, avant / même niveau / après, situer des objets, révision, intégration |
| Les ensembles | 10 | Numération, palier 1 : ensemble, sous-ensemble, peu / beaucoup / rien, forme et couleur, sous-ensembles, comparer (plus, moins, autant), révision, intégration |
| Longueurs, distances et quantités | 8 | Mesure, palier 1 : longueur (2), distance (2), capacité (2), révision, intégration |
| Observer une image | 7 | Problèmes, palier 1 : règles logiques (2), modèle, rythme répétitif, rythme récursif, tableau à double entrée (2) |
| Les solides | 8 | Géométrie, palier 2 : pavé droit, cube, cylindre (6), patron du cube, patrons du pavé et du cylindre |
| Les figures planes | 8 | Géométrie, palier 2 : carré / rectangle (3), triangle / rond (3), révision, intégration |
| Les nombres de 0 à 5 | 5 | Numération, palier 2 : 1 à 3, 4 et 5, ordre, ordinaux, zéro |
| Les nombres de 6 à 10 | 15 | Numération, palier 2 : nombres 6 à 10, composition et décomposition, dizaines et unités, révision, intégration |
| Ajouter et enlever jusqu’à 10 | 6 | Numération, palier 2 : sens de l’addition, signes + et =, sens de la soustraction, signe −, double et moitié, addition ou soustraction |
| Lourd ou léger ? | 5 | Mesure, palier 2 : masse (3), révision, intégration |
| Comprendre un problème | 15 | Problèmes, paliers 1 et 2 : informations utiles, inutiles, manquantes (2), révision, intégration, 1re intégration interdisciplinaire, problème mathématique (2), données, questions, consignes, révision, intégration, 2e intégration interdisciplinaire |
| Lignes et chemins | 10 | Géométrie, palier 3 : lignes ouvertes / fermées, rythmes graphiques, intérieur / extérieur, nœuds, cases, départ / arrivée, itinéraire (2), révision, intégration |
| Les nombres de 11 à 20 | 18 | Numération, palier 3 : nombres 11 à 20, composition et décomposition, révision, intégration |
| Calculer jusqu’à 20 | 4 | Numération, palier 3 : additions et soustractions jusqu’à 13, 16, 19 et 20 |
| Le temps qui passe | 6 | Mesure, palier 3 : durée (2), journée, semaine, révision, intégration |
| Résoudre un petit problème | 7 | Problèmes, palier 3 : données utiles / inutiles (2), question finale, questions intermédiaires, révision, intégration, 3e intégration interdisciplinaire |
