# Exercices de maths du CM1 : inventaire

Document interne. Même méthode que les autres classes : une série **créée par DIANGAL** pour chaque page du
cahier d'exercices PAAME2 du CM1 (MEN, édition 2024), du même genre, avec d'autres nombres, énoncés et dessins.
Le nom du cahier n'apparaît jamais sur le site.

- Code : `src/mocks/cm1/maths/` ; briques communes `src/mocks/upper-math.ts` (ajouts du CM1 : division décimale,
  fractions — simplifier, additionner, soustraire, retrouver le tout —, intervalles, périmètre et aire du
  cercle, aires du triangle et du parallélogramme, dimensions à partir de l'aire, volumes et conversions
  m³ / dm³ / cm³ / ℓ, durées en h et min, partages inégaux, angles du triangle, translation, graphiques en barres).
- Vérification : `tests/unit/primary-exercises.test.ts` (graphique lu sur l'échelle, translation lue sur le
  quadrillage, fractions recalculées).

## 143 séries (une par page du cahier)

| Chapitre DIANGAL | Séries | Pages du cahier servant de modèle |
|---|---|---|
| Les grands nombres | 2 | Grands nombres (2) |
| Les caractères de divisibilité | 2 | Divisibilité (2) |
| L’addition et la soustraction | 4 | Sens et techniques de l’addition et de la soustraction |
| La multiplication | 4 | Sens, plusieurs chiffres au multiplicateur, révision, intégration du palier 1 |
| La division | 3 | Sens, deux chiffres au diviseur (2) |
| Les nombres décimaux | 2 | Nombres décimaux (2) |
| Opérations sur les nombres décimaux | 14 | Addition (2), soustraction (3), multiplication (2), division (3), révision, intégration, révisions du palier 3 (2) |
| Les fractions | 8 | Fractions ordinaires, décimales, comparaisons (4), simplification (2) |
| Calculer avec les fractions | 12 | Addition (2), soustraction (2), fraction d’une grandeur, grandeur dont on connaît une fraction, révisions, intégrations |
| Droites et angles | 5 | Sécantes et perpendiculaires, parallèles, angles, révision, intégration |
| Les figures planes | 7 | Carré, rectangle, triangle, parallélogramme, cercle, révision, intégration |
| Les solides | 8 | Cube (2), pavé droit (2), cylindre (2), révision, intégration |
| Symétrie et translation | 6 | Symétrie (2), translation (2), révision, intégration |
| Longueurs et périmètres | 6 | Mètre (2), périmètres du carré, du rectangle et du cercle, dimensions, intervalles |
| Capacités, masses et angles | 8 | Litre (2), gramme (2), masse nette / brute / tare, degré, révision, intégration |
| Les aires | 10 | Mètre carré (2), carré, rectangle, triangle (2), parallélogramme (2), cercle (2) |
| Les volumes | 4 | Volume (2), volume / masse / capacité, masse volumique |
| Durées et mouvements uniformes | 8 | Durée (2), addition et soustraction de durées, mouvements uniformes (2), révision, intégration |
| Budget, prix et partages | 6 | Budget familial, prix, parts égales, parts inégales, révision, intégration |
| Comprendre l’énoncé d’un problème | 7 | Données utiles / inutiles / manquantes (3), consignes, questions, question finale et questions intermédiaires (2) |
| Tableaux, schémas et graphiques | 9 | Tableaux et schémas (2), graphiques, 1re intégration interdisciplinaire, tableaux et graphiques, révision, intégration, factures, schémas et graphiques |
| Démarches de résolution | 8 | Énoncé à partir d’une résolution, erreur, démarche progressive, 2e intégration interdisciplinaire, démarche régressive, révision, intégration, 3e intégration interdisciplinaire |
