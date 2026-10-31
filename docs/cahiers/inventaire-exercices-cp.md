# Exercices de maths du CP : inventaire et avancement

Document interne. Les exercices du site sont **créés par DIANGAL** sur le modèle du cahier d'exercices
PAAME2 du CP (MEN, édition 2024) : une série DIANGAL par leçon du cahier, avec les mêmes types d'exercices,
les mêmes nombres du palier et la même difficulté, mais d'autres nombres, énoncés et dessins.
Le nom du cahier n'apparaît jamais sur le site.

- Code : `src/mocks/cp/maths/` (une série = `ExerciseSeries` avec `key` et `title`), briques
  `src/mocks/primary-exercises.ts` (réponses et corrections calculées), dessins `src/mocks/drawings.ts`.
- Vérification : `tests/unit/primary-exercises.test.ts` recalcule chaque réponse par un second chemin
  (lecture de l'énoncé et du dessin) et la passe au correcteur.
- Modèle (pages du cahier recopiées, retirées du site, de la démo et du seed) : `src/mocks/workbooks/paame2-cp/` ; leurs figures se recréent avec `pnpm workbooks:figures`.
- Dessins : schémas en SVG intégré (`drawings.ts`, `geometry.ts`, `measure.ts`), illustrations réalistes réutilisables dans `public/illustrations/` (fruits, élèves, pièces de 5 à 100 F, pastèque, sac de riz).
- Les exercices à tracer, colorier ou relier du cahier deviennent des questions à choix avec le même dessin.
- Questions de lecture et de connaissance (données utiles, question finale, durées, saisons…) : rédigées à la main ; le test vérifie que la correction donne la même réponse que le corrigé.

## Séries prévues par chapitre (143)

| Chapitre DIANGAL | Séries | Leçons du cahier servant de modèle | État |
|---|---|---|---|
| Lignes, intérieur et extérieur | 3 | Ligne fermée / ouverte ; intérieur / extérieur / frontière ; rythmes graphiques | fait |
| Quadrillages et itinéraires | 7 | Quadrillage, nœud, case ; ligne / colonne ; départ / arrivée ; itinéraire ; révision ; intégration | fait |
| Tracer avec la règle | 7 | Traits d'une longueur ; reproduction ; traçage (2) ; lignes courbes ; lignes brisées ; frises | fait |
| Reproduire des figures planes | 11 | Carré (2) ; rectangle (2) ; triangle (2) ; rond ; révisions (3) ; intégration | fait |
| Les nombres jusqu’à 20 (révision) | 4 | Révisions : nombres de 0 à 10, de 0 à 20, composition, addition et soustraction | fait |
| **Les nombres de 21 à 50** | **11** | Découvrir 21-22, 23-24, 25-29, 30-34, 35-39, 40-44, 45-50 ; composer et décomposer (4) | **fait (pilote)** |
| Additionner et soustraire jusqu’à 50 | 14 | Sens de l'addition et de la soustraction ; sans retenue ; avec retenue ; jusqu'à 39, 44, 50 | fait |
| Calcul mental jusqu’à 50 | 1 | Nombres pairs et impairs | fait |
| Les nombres de 51 à 79 | 15 | Nombres de 0 à 59, 60 à 69, 70 à 79 ; additions et soustractions avec et sans retenue ; vérification ; trois termes | fait |
| Partager et multiplier | 9 | Sens de la multiplication (2) et du partage (2) ; écritures multiplicatives et de partage | fait |
| Les nombres jusqu’à 100 | 10 | Nombres de 80 à 89, 90 à 99, 100 ; additions et soustractions ; révision ; intégration | fait |
| Mesurer des longueurs | 5 | Longueur ; distance ; mètre ; règle et double décimètre ; révision | fait |
| Mesurer des capacités | 5 | Mesurer et comparer des capacités ; litre (2) ; intégration | fait |
| Mesurer des masses | 7 | Masse (2) ; kilogramme (3) ; révision ; intégration | fait |
| Le temps : calendrier et heure | 9 | Durée (2) ; jour, semaine ; mois, saisons ; calendrier ; heure ; heure et minute ; révision ; intégration | fait |
| La monnaie | 3 | Pièces de 10 F et 50 F ; de 5 F et 25 F ; de 5 F à 100 F | fait |
| Les données d’un problème | 7 | Données ; informations numériques ; données utiles, inutiles, manquantes | fait |
| Les questions d’un problème et la démarche | 15 | Questions ; consignes ; question finale et intermédiaires ; énoncé ; démarche ; révisions ; intégrations | fait |

## Chapitre pilote : correspondance des types d'exercices

| Type dans le cahier | Exercice DIANGAL | Correction |
|---|---|---|
| Écrire en chiffres le nombre d'un tableau d / u | Même tableau dessiné, autre nombre | nombre |
| Écrire en chiffres un nombre en lettres (cursive) | Autre nombre, en cursive | nombre |
| Écrire en lettres un nombre | Autre nombre | texte (« vingt-et-un » et « vingt et un » acceptés) |
| Colorier le n-ième rond / jeton / carré à partir de la gauche ou de la droite | Rangée dessinée, lettres A, B, C : « Quel rond est le 22e à partir de la droite ? » | choix (A, B, C dans l'ordre) |
| Placer &lt;, &gt; ou = | Autres nombres | choix |
| Ranger des nombres | Autres nombres, autre sens | texte (espaces, virgules, « < » acceptés) |
| Compléter une bande numérique (pas de 1 ou de 2) | Autre bande dessinée | nombre |
| Arbre de composition / décomposition (cadre vide) | Arbre dessiné, autres nombres | nombre |
| Compléter une addition (« 10 + 12 = … », « 21 = 15 + … ») | Autres nombres | nombre |
