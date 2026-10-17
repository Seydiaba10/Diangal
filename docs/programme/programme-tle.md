# Programme de Terminale (toutes séries)

Relevé fait le 17/10/2026 à partir des programmes officiels **mis en ligne par l’Office du Baccalauréat** (UCAD) en janvier 2026. Les leçons et exercices de DIANGAL sont **rédigés par DIANGAL** d’après ces programmes et doivent être **validés par des enseignants**.

## Sources

| Matière | Document | Lien |
|---|---|---|
| Mathématiques | Programmes de mathématiques, Terminales L, S1-S3 et S2-S4 (MEN, 2006) | [Programme_Maths-LS.pdf](https://officedubac.sn/wp-content/uploads/2026/01/Programme_Maths-LS.pdf) |
| Sciences physiques | Programmes des Terminales S1-S2 et L2 (août 2008) | [Programme_Sciences-Physiques_Tle_LS.pdf](https://officedubac.sn/wp-content/uploads/2026/01/Programme_Sciences-Physiques_Tle_LS.pdf) |
| SVT | Programmes des Terminales L2, S1 et S2 | [Programmes_SVT_Tles_LS.pdf](https://officedubac.sn/wp-content/uploads/2026/01/Programmes_SVT_Tles_LS.pdf) |
| Philosophie | Programme des classes de Terminale (Commission nationale de philosophie, IGEN) | [Programme_Philosophie_Tle.pdf](https://officedubac.sn/wp-content/uploads/2026/01/Programme_Philosophie_Tle.pdf) |
| Français | Nouveaux programmes de français, secondaire général (Commission nationale de français, 2009) | [Programme_Francais_Tle_LS.pdf](https://officedubac.sn/wp-content/uploads/2026/01/Programme_Francais_Tle_LS.pdf) |
| Histoire | Programme d’histoire, **6e à Terminale** | [Programme_Histoire_Tle.pdf](https://officedubac.sn/wp-content/uploads/2026/01/Programme_Histoire_Tle.pdf) |
| Géographie | Programme de géographie, **6e à Terminale** | [Programme_Geographie_Tle.pdf](https://officedubac.sn/wp-content/uploads/2026/01/Programme_Geographie_Tle.pdf) |
| Anglais | Programmes de LV anglais, moyen et secondaire (CNA, 4e édition, mars 2017) — extrait 1re et Terminale, PDF scanné | [Programme_Anglais_Tle.pdf](https://officedubac.sn/wp-content/uploads/2026/01/Programme_Anglais_Tle.pdf) |

Les PDF d’histoire et de géographie contiennent aussi les programmes **de la 6e à la 1re** : ils serviront pour les autres classes.

## Matières par série

| Série | Matières publiées |
|---|---|
| S1 | Maths (programme S1-S3), sciences physiques (S), SVT (S1), philosophie (S), français, histoire-géographie, anglais (thèmes S) |
| S2 | Maths (programme S2-S4), sciences physiques (S), SVT (S2), philosophie (S), français, histoire-géographie, anglais (thèmes S) |
| L1 | Philosophie (L), français, histoire-géographie, anglais (thèmes L), maths (L) |
| L2 | Philosophie (L), français, histoire-géographie, anglais (thèmes L), maths (L), sciences physiques (L2), SVT (L2) |
| LA | Arabe (indicatif), philosophie (L), histoire-géographie, français, anglais (thèmes L), maths (L) |
| S3 | Maths (S1-S3), sciences physiques (S), construction mécanique (indicatif), fabrication et automatismes (indicatif), philosophie (S), français, anglais |
| S4 | Maths (S2-S4), sciences physiques (S), SVT (S2), sciences agricoles (indicatif), philosophie (S), français, histoire-géographie, anglais |
| S5 | Maths (S2-S4), sciences physiques (S), SVT (S2), technologie agroalimentaire (indicatif), philosophie (S), français, histoire-géographie, anglais |
| G | Techniques de gestion (indicatif), économie (indicatif), maths (programme officiel de la série G, APAMS), philosophie (S), français, histoire-géographie, anglais |
| T1 | Fabrication et automatismes (indicatif), construction mécanique (indicatif), maths (programme officiel des séries T, APAMS), physique (S), français, anglais |
| T2 | Électrotechnique-électronique (indicatif), maths (séries T), physique (S), français, anglais |

Les matières marquées « indicatif » sont propres à la série : **chapitres indicatifs** (programme officiel non trouvé en ligne), établis d’après la liste des épreuves du Bac de chaque série ; voir [programme-lycee.md](programme-lycee.md).

- Chaque matière existe **une fois par série** (programme matière × classe × série) : le tableau de bord en base ne compte que les programmes de la série de l’élève.
- **Coefficients** : officiels pour la philosophie (4 en série L, 2 en série S, programme de philosophie) et les sciences physiques en L2 (2, programme de 2008) ; les autres sont indicatifs.
- **Pas encore publiés** : langues vivantes 2, EPS, séries rares (L1a, L1b, F6, S1A, S2A, STEG). Les maths de S3 sont celles de S1, celles de S4 et S5 celles de S2 (mêmes programmes officiels).

## Découpage

- **Mathématiques** : S1 16 chapitres, S2 11, L 10, G 9 (dont calcul matriciel et simplexe, mathématiques financières), T 10 (dont produit vectoriel). Les leçons communes (analyse, probabilités, complexes) sont écrites une fois (`src/mocks/tle/maths-*.ts`).
- **Sciences physiques** : S 24 chapitres (P1 à P15, C1 à C9 du programme) ; L2 10 chapitres.
- **SVT** : un thème du programme = un chapitre ; S2 13, S1 9, L2 6, avec les leçons officielles de chaque série.
- **Philosophie** : un axe majeur = un chapitre, rangé dans son domaine (réflexion philosophique, vie sociale, épistémologie, esthétique) ; L 15 chapitres, S 13, dont un chapitre de méthodologie. Les œuvres au programme changent : elles ne sont pas fixées dans DIANGAL.
- **Français** : surréalisme, esthétique des genres (poésie, roman, théâtre, avec la liste officielle d’œuvres au choix) et exercices du bac (résumé et discussion, dissertation, commentaire, écrits pratiques).
- **Histoire-géographie** : 19 leçons d’histoire et 18 de géographie regroupées en 12 chapitres.
- **Anglais** : un thème (topic) = un chapitre ; 9 thèmes L et 6 thèmes S (selon les marques L, S, L & S du programme), plus un chapitre de méthode pour l’examen.

## À faire valider

- l’ordre des chapitres (il suit l’ordre des documents officiels, pas forcément la progression de chaque établissement) ;
- les coefficients indicatifs ;
- toutes les leçons et les exercices.
