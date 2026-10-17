# Programme du lycée : 2nde et 1re

Relevé fait le 17/10/2026. La Terminale est décrite dans [programme-tle.md](programme-tle.md). Les leçons et exercices sont **rédigés par DIANGAL** et doivent être **validés par des enseignants**.

## Séries publiées

- **2nde** : séries **S** et **L** (les deux séries de la classe, `SERIES_BY_LEVEL` de `src/lib/levels.ts`).
- **1re** et **Terminale** : toutes les séries de `SERIES_BY_LEVEL` : **L1, L2, LA, S1, S2, S3, S4, S5, G, T1 et T2** (séries ajoutées le 17/10/2026 : LA, S3, S4, S5, G, T1, T2).
- Comme en Terminale, chaque série a ses propres matières (un programme par matière et par série) ; un chapitre commun à plusieurs séries est dupliqué dans chacune.
- La philosophie ne commence qu’en Terminale.

## Sources

| Source | Nature | Ce qu’on en tire |
|---|---|---|
| [Maths, seconde S](https://apams.gouv.sn/sites/default/files/math_2de_S.pdf), [première S1-S3](https://apams.gouv.sn/sites/default/files/math1erS1etS3.pdf), [première S2-S4](https://apams.gouv.sn/sites/default/files/math1erS2etS4_0.pdf), [séries L](https://apams.gouv.sn/sites/default/files/mathseriesL.pdf) (MEN, 2006, APAMS) | Officielle | Contenus et compétences exigibles. La 1re S1 ajoute les primitives au tronc commun des séries S. |
| [Maths, série G](https://apams.gouv.sn/sites/default/files/mathseriesG.pdf) et [séries T](https://apams.gouv.sn/sites/default/files/mathseriesT.pdf) (MEN, 2006, APAMS) | Officielle | Maths de 1re et de Terminale G (statistique, probabilités, analyse, algèbre linéaire, mathématiques financières) et T (géométrie, analyse, nombres complexes, intégrales, produit vectoriel). |
| [Épreuves et coefficients du Bac par série](https://samabac.sn/baccalaureat-les-epreuves-par-serie-les-coefficients-et-le-nombre-de-point-demande) (samabac.sn, 2019) | Privée, à confirmer avec l’Office du Bac | Matières de chaque série : arabe et civilisation arabo-islamique (LA), construction mécanique et fabrication (S3, T1), sciences agricoles (S4), technologie agroalimentaire (S5), économie et gestion (G), électrotechnique (T2). Sert aussi aux coefficients indicatifs. |
| [Programme d’histoire](https://officedubac.sn/wp-content/uploads/2026/01/Programme_Histoire_Tle.pdf) et [de géographie](https://officedubac.sn/wp-content/uploads/2026/01/Programme_Geographie_Tle.pdf) (Office du Bac) | Officielle | 2nde : histoire de l’Afrique et du monde jusqu’en 1870 (25 leçons), géographie physique générale (20 leçons). 1re : de la révolution industrielle à 1945 (23 leçons), géographie humaine et économique (23 leçons). |
| Titres des cours de 2nde et de 1re de Sunudaara (relevé du 17/10/2026) | Privée, titres seulement | Chapitres de sciences physiques (2nde S, 2nde L, 1re S, 1re L) et de SVT (2nde : écosystème, eau, sols ; 1re S et 1re L : cellule, nutrition, géologie). À confirmer avec les programmes officiels, non trouvés en ligne. |

## Découpage

| Classe et série | Maths | Sciences physiques | SVT | Français | Histoire-géo | Anglais |
|---|---|---|---|---|---|---|
| 2nde S | officiel (14 ch.) | relevé (15) | relevé (4) | indicatif (7) | officiel (13) | indicatif (6) |
| 2nde L | officiel (8) | relevé (8) | relevé (4) | indicatif | officiel | indicatif |
| 1re S1 | officiel (13) | relevé (18) | relevé (13) | indicatif (7) | officiel (14) | indicatif (6) |
| 1re S2 | officiel (12) | relevé (18) | relevé (13) | indicatif | officiel | indicatif |
| 1re L1 | officiel (7) | — | — | indicatif | officiel | indicatif |
| 1re L2 | officiel (7) | relevé (6) | relevé (9) | indicatif | officiel | indicatif |

Séries ajoutées le 17/10/2026, en 1re et en Terminale :

| Série | Matières propres (indicatives) | Maths | Autres matières |
|---|---|---|---|
| LA | arabe : langue, littérature, civilisation arabo-islamique (8 et 7 chapitres) | séries L | français, histoire-géographie, anglais ; philosophie en Terminale |
| S3 | construction mécanique (7 et 7), fabrication et automatismes (7 et 6) | S1-S3 | sciences physiques (S), français, anglais ; philosophie en Terminale |
| S4 | sciences agricoles : écologie, phytotechnie, zootechnie (7 et 7) | S2-S4 | sciences physiques, SVT, français, histoire-géographie, anglais |
| S5 | technologie agroalimentaire : microbiologie, biochimie, transformation (7 et 7) | S2-S4 | sciences physiques, SVT, français, histoire-géographie, anglais |
| G | économie (7 et 7), techniques de gestion : comptabilité SYSCOHADA, étude de cas (7 et 8) | série G | français, histoire-géographie, anglais ; philosophie en Terminale |
| T1 | fabrication et automatismes, construction mécanique | séries T | physique, français, anglais |
| T2 | électrotechnique-électronique (7 et 7) | séries T | physique, français, anglais |

Les leçons de ces matières sont dans `src/mocks/lycee/` (une fois pour la 1re et la Terminale) ; leurs exercices dans `src/mocks/lycee/exercises.ts`.

Coefficients : indicatifs (ils pondèrent seulement la moyenne et ne sont pas affichés).

## À faire

- programmes officiels de sciences physiques, de SVT, de français et d’anglais du second cycle ;
- programmes officiels des matières des séries LA, S3, S4, S5, G, T1 et T2 (non trouvés en ligne) ;
- séries rares (L1a, L1b, F6, S1A, S2A, STEG) ;
- LV2, EPS : non couverts.
