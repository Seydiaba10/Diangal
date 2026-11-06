# Sujets blancs du CFEE

État au 02/11/2026. **32 sujets rédigés par DIANGAL, tous corrigés.** Ce ne sont pas des sujets officiels ; ils sont à faire relire par des enseignants. Fichiers : `src/mocks/cm2/cfee/`.

Références :
- *Guide pratique du Certificat de fin d’études élémentaires* (ministère de l’Éducation nationale, Direction des examens et concours, juin 2018), voir `programme-cm2.md` : épreuves, durées et barèmes, sans aucun sujet ;
- les sujets et guides de correction officiels de 2023 à 2026 (voir `docs/annales/README.md`) : forme réelle des épreuves et grilles de correction. Ils servent de modèle : aucun texte, énoncé ni nombre n’en est repris.

## Ce que disent le guide et les sujets officiels

| Épreuve | Durée | Points | Forme réelle |
|---|---|---|---|
| Langue et communication, ressources | 45 min | 40 | un texte sans titre ; compréhension 5 points (toujours le type de texte et un titre) et ressources 15 points ; notée sur 20 puis multipliée par 2 |
| Langue et communication, compétence | 60 min | 60 | un contexte, une consigne, 6 ou 8 phrases au moins ; grille : pertinence 35, cohérence 12, langue 8, présentation 5 |
| Mathématiques, ressources | 45 min | 40 | 5 exercices (8, 8, 12, 8, 4), soit numération 16, mesure 12, géométrie 8, problèmes 4 ; une construction à la main (5) et une définition (3) ; données inutiles ou questions à écrire |
| Mathématiques, compétence | 60 min | 60 | un seul problème, 1 ou 2 consignes ; guide de 2025 : 6 étapes de 10 points (opération 6, résultat 4) |
| Découverte du monde | 60 min | 40 | ressources 24 (6 exercices de 4 points), compétence 16 |
| Éducation au développement durable | 60 min | 40 | ressources 24 (6 exercices de 4 points), compétence 16 |
| Éducation artistique | **45 min** (60 dans le guide de 2018) | 10 | reproduire ou dessiner, puis colorier ; grille : conformité 5, soin 3, harmonie 2 |
| Éducation physique et sportive | avant les épreuves écrites | 10 | épreuve pratique |
| Épreuve optionnelle ou facultative | 60 min | 10 | en arabe (sujet de 2025 : contexte en français, titre à choisir, questions, vrai ou faux, conjugaison) ; en français pour l’option franco-arabe (aucun sujet trouvé) |

Total : 300 points, ou 310 avec l’épreuve facultative. Note finale : bilan des évaluations de CM1 et CM2 (40 %) et examen (60 %) ; les candidats individuels sont notés à 100 % sur l’examen. Admis à 50 % ; admission automatique s’il manque 2 % au plus, repêchage possible entre 3 % et 6 %.

Consigne importante : en mathématiques, **un résultat exact sans l’opération posée vaut zéro**. Les sujets le rappellent, même si la plateforme ne corrige que le résultat.

## Les 32 sujets

Quatre séries de six épreuves (n°1 à n°4), plus l’éducation artistique et l’épreuve facultative.

| Épreuve | Sujets | Questions par sujet | Thèmes |
|---|---|---|---|
| Langue, ressources | 4 | 20 | textes originaux : le retour des pirogues et l’eau de Mbirkilane (narratifs), la découverte de la lecture (lettre), plantons des arbres (argumentatif) |
| Production d’écrits | 4 | 12 paliers | une lettre (6 phrases, sans nom ni signature), un récit (set-setal), une description (un marché), un dialogue (scolarisation d’une fille) |
| Maths, ressources | 4 | 11 | 5 exercices : calculs, fractions, conversions, durées, intérêts, construction et définition, données inutiles ou questions à choisir |
| Maths, compétence | 4 | 6 étapes | le grillage du jardin, la salle de classe, le champ de Mame Diarra, l’eau du groupement de femmes |
| Découverte du monde | 4 | 16 | contextes en IST : hygiène et digestion, circuit électrique, chaîne alimentaire, machines simples |
| Développement durable | 4 | 16 | contextes : feux de brousse, déchets du marché, malnutrition, surpêche |
| Éducation artistique | 4 | 8 paliers | reproduire une mangue, reproduire une pirogue, dessiner une daba, dessiner une case |
| Épreuve facultative | 4 | 5 | 2 en arabe, 2 en français |

## Comment ils fonctionnent

Exactement comme les sujets blancs du BFEM (`3e/bfem-blancs.ts`, `buildMockExams`) : même onglet de la page Examens (`/eleve/examens?examen=cfee`, ouvert par défaut pour un élève de CM2), même lecteur chronométré, même correction, même résultat. Seuls ajouts au format des sujets :

- `stem` : énoncé commun affiché au-dessus des questions (texte à lire, contexte, consigne, barème) ;
- `self` : travail fait sur la feuille (production d’écrits, construction, dessin, explications). L’élève voit le corrigé, puis s’évalue. Ces questions restent hors de « Préparer mon prochain devoir ».

### Paliers de la grille

Le lecteur ne connaît que « J’ai réussi » ou « Je dois revoir ». Pour ne pas toucher à la correction, chaque critère des guides est découpé en paliers dont les points s’additionnent. Par exemple, pertinence : bon type de texte 10, la moitié des phrases sur le sujet 9, les deux tiers 8, tout le texte 8 (total 35). Les niveaux les plus bas des guides sont regroupés : par exemple, le 1 point donné quand un tiers du texte traite le sujet, ou les 2 points de la langue entre 8 et 10 fautes.

### Limites par rapport à l’examen

- En maths (compétence), le vrai sujet laisse l’élève trouver seul les étapes. Ici, les étapes sont nommées pour corriger chaque résultat. Elles sont visibles dès le début : l’élève peut résoudre le problème sur sa feuille avant de regarder les questions.
- L’opération posée (6 points sur 10 à l’examen) ne peut pas être vérifiée : un résultat juste vaut tous les points de l’étape.
- Les réponses à rédiger (« cite deux conséquences », tableaux à compléter) restent en partie des questions à choix ou à auto-évaluer.

## Vérifications automatiques

- `tests/unit/cfee-blancs.test.ts` : durée et points de chaque épreuve et de chaque partie ; grilles officielles (35, 12, 8, 5 et 5, 3, 2) ; maths en 6 étapes de 10 points ; nombre de phrases du modèle ; une seule bonne réponse par question ; tous les calculs écrits dans les corrigés sont recalculés ; le résultat attendu figure dans sa correction ; copie parfaite = tous les points ; aucun sujet présenté comme officiel.
- `tests/db/cfee-blancs.test.ts` : dans la base, un élève de CM2 obtient 20/20 à chacun des sujets avec une copie parfaite et 0 avec une copie vide ; le BFEM ne change pas.

## Ce qui n’est pas couvert, et pourquoi

- **Éducation physique et sportive** : épreuve pratique, notée sur le terrain.
- **Éducation religieuse** : le guide la cite à côté du développement durable (« ÉDD / ER ») sans en décrire la forme, et DIANGAL n’a pas de leçons sur ce sujet.
- **Option franco-arabe, langue et communication en arabe** : seule l’option français est couverte ; pour l’autre option, seule l’épreuve facultative de français existe.
- **Dictée** : elle faisait partie de l’ancien CFEE (« épreuve d’orthographe », relevée de 2000 à 2012). Aucun sujet relevé depuis 2013 n’en contient : l’orthographe s’évalue par des mots soulignés à corriger, ce que font aussi les sujets blancs.

## À faire valider par des enseignants

- Tous les sujets et leurs corrigés.
- Le découpage des grilles en paliers et la forme de l’épreuve facultative de français (aucun sujet officiel trouvé).
- **Les deux sujets d’arabe en priorité** : les textes et les questions doivent être relus par un enseignant d’arabe, le programme d’arabe du CM2 n’étant pas sourcé dans DIANGAL.
- L’histoire et la géographie : les chapitres de CM2 restent indicatifs (voir `programme-cm2.md`).
