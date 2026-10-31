# Exercices de maths du CE2 : inventaire

Document interne. Même méthode que le CP et le CI : une série **créée par DIANGAL** pour chaque page du
cahier d'exercices PAAME2 du CE2 (MEN, édition 2024), du même genre (mêmes types d'exercices, nombres du
palier, difficulté), avec d'autres nombres, énoncés et dessins. Le nom du cahier n'apparaît jamais sur le site.

- Code : `src/mocks/ce2/maths/` ; briques communes du CE2 au CM2 dans `src/mocks/upper-math.ts` (grands
  nombres en lettres jusqu'à 999 999, rangs, décompositions, quatre opérations posées, division avec reste,
  problèmes en une ou deux étapes, divisibilité, décimaux, fractions, droites, angles, triangles, cercle,
  symétrie, patron du cube, conversions, durées, horloge, partages, périmètres, aires, tableaux de données).
- Les grands nombres s'écrivent avec une espace insécable (12 000) ; le test la retire pour relire les nombres.
- Vérification : `tests/unit/primary-exercises.test.ts` recalcule chaque réponse (énoncé, dessin : angles,
  droites, côtés du triangle, symétrique, faces du patron, aiguilles, cases du tableau).
- Le cahier fait poser, tracer et construire : ces exercices deviennent des calculs à écrire ou des questions
  à choix avec le même genre de dessin.

## 130 séries (une par page du cahier)

| Chapitre DIANGAL | Séries | Pages du cahier servant de modèle |
|---|---|---|
| Révisions : nombres et opérations jusqu’à 10 000 | 8 | Révisions : nombres (2), sens et techniques de l’addition et de la soustraction, multiplication à 1 et 2 chiffres, division sans et avec reste |
| Les nombres jusqu’à 100 000 | 8 | Nombres de 10 000 à 50 000 (2), de 50 000 à 99 999 (2), nombre 100 000 (2), révision des quatre opérations, intégration du palier 4 |
| Addition et soustraction des grands nombres | 8 | Sens de l’addition, addition (2), sens de la soustraction, soustraction (2), révision, addition et soustraction jusqu’à 99 999 |
| La multiplication | 6 | Sens, multiplication jusqu’à 50 000 (2) et jusqu’à 99 999 (2), multiplication et division jusqu’à 100 000 (1) |
| La division | 8 | Sens, division jusqu’à 50 000 (3), révision multiplication et division, division jusqu’à 99 999 (2), multiplication et division jusqu’à 100 000 (2) |
| Double, moitié, triple et divisibilité | 4 | Pairs, impairs, moitié, double, triple ; caractères de divisibilité (2) ; intégration du palier 3 |
| Nombres décimaux et fractions simples | 4 | Nombres décimaux (2), fractions simples (2) |
| Lignes, droites et angles | 5 | Lignes, droites horizontales / verticales / obliques, sécantes / parallèles / perpendiculaires, angles (2) |
| Carré, rectangle et triangle | 11 | Carré (2), rectangle (2), triangle (5), révision, intégration |
| Le cercle et la symétrie | 5 | Cercle (2), symétrie (2), révision |
| Les patrons des solides | 8 | Patron du cube (2), du pavé droit (2), du cylindre (2), révision, intégration |
| Les longueurs | 3 | m, dm, cm, mm (2) ; m, dam, hm, km |
| Les masses et les capacités | 7 | g, dg, cg, mg ; kg, hg, dag, g ; t, q, kg ; ℓ, dℓ, cℓ, mℓ ; hℓ, daℓ, ℓ ; révision ; intégration |
| Masse nette, masse brute et durées | 3 | Masse nette / brute / tare ; heure, minute, seconde ; temps mis |
| Prix et partages | 7 | Prix de revient, bénéfice, perte, parts égales, parts proportionnelles, révision, intégration |
| Les périmètres | 5 | Périmètre du carré (2), du rectangle (2), du triangle |
| Les aires | 6 | Mètre carré (2), aire du carré, aire du rectangle, révision, intégration |
| Données et questions d’un problème | 10 | Données numériques et questions, données utiles / inutiles (2), données manquantes, tableaux (2), question finale, questions intermédiaires, les deux, 4e intégration interdisciplinaire |
| Démarche et énoncé d’un problème | 14 | Démarche progressive (2), énoncés (3), révisions (2), intégrations (2), énoncés oraux et écrits, erreur, démarche régressive, 5e et 6e intégrations interdisciplinaires |
