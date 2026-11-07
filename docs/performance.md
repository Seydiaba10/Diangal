# Performance sur téléphone lent et mauvais réseau

Audit et optimisations du 07/11/2026. Pour chaque point : **déjà fait**, **fait le 07/11**, ou **laissé de côté**
(avec la raison). **En ligne depuis le 07/11/2026** : migration `20261107000001_web_vitals.sql` appliquée, `main` déployé.

## Résultat mesuré après la mise en ligne

| Mesure | Avant | Après |
|---|---|---|
| Page qui lit la base (`/api/hors-ligne/chapitres/…`), médiane de 8 requêtes | 2,0 s | **0,56 s** |
| Même page, serveur qui démarre (première requête) | 6,1 s | **4,3 s** |
| Région des fonctions (`x-vercel-id`) | `iad1` (Washington) | **`dub1` (Dublin)** |
| Dessins, photos, icônes de `public/` (`Cache-Control`) | `max-age=0` | **1 jour, puis 7 jours en arrière-plan** |
| LCP des pages publiques (téléphone lent simulé) | 2,4 à 2,7 s | 2,7 à 3,5 s selon la mesure |

- **Pages des élèves et des parents** : environ 3,5 fois plus rapides à répondre.
- **Pages publiques** : aucun gain attendu (elles étaient déjà servies prêtes depuis Paris). Le seul changement est
  l'outil de mesure (+4 Ko de JavaScript, environ 0,03 s en 3G). Une même page varie de 2,6 à 3,5 s d'une mesure
  simulée à l'autre : les mesures réelles des utilisateurs (carte de l'accueil admin) feront foi.

## Mesure de départ (site en ligne, 07/11/2026)

Téléphone lent simulé : réseau « Fast 3G » de Chrome (562 ms de latence, 1,44 Mbit/s), processeur bridé ×4,
écran 360 px, cache vide, médiane de 3 chargements (`scratchpad/tools/measure-vitals.mjs`).

| Page | TTFB | FCP | LCP | CLS | Poids transféré | dont JavaScript |
|---|---|---|---|---|---|---|
| `/` (accueil) | 95 ms | 2,6 s | 2,6 s | 0 | 365 Ko | 222 Ko |
| `/connexion` | 76 ms | 2,1 s | 2,4 s | 0 | 357 Ko | 224 Ko |
| `/inscription` | 75 ms | 2,3 s | 2,7 s | 0 | 349 Ko | 222 Ko |

- **Pages publiques** : servies déjà calculées par le CDN de Vercel à Paris (`X-Vercel-Cache: HIT`), compressées
  en Brotli. L'affichage est limité par le poids du JavaScript (environ 220 Ko compressés, surtout React et Next.js).
- **Pages des élèves et des parents** : calculées à chaque visite par des fonctions Vercel situées à Washington
  (`iad1`), alors que la base est en Irlande. Chaque lecture de la base traverse l'Atlantique (environ 80 ms
  l'aller-retour), et une fonction froide a mis 5,4 s à répondre.

## 1. Mesurer d'abord

- **Fait le 07/11 : vitesse réelle des utilisateurs (Core Web Vitals).**
  - `components/layout/web-vitals.tsx` (`useReportWebVitals`) mesure LCP, INP, CLS, FCP et TTFB chez chaque
    visiteur. Les mesures partent par lots, quand la page est quittée (`sendBeacon`), vers `/api/vitals`.
  - Aucun service tiers (règle « ni traceur tiers »). Mesures anonymes : pas de compte, pas d'adresse IP, adresse
    de page réduite (`lib/web-vitals.ts`, `pageOf` : au-delà de deux niveaux, chaque partie devient « :p »).
  - Base : `private.web_vitals`, gardée 30 jours (pg_cron). `record_web_vitals` est réservée à la clé secrète,
    `admin_web_vitals` à l'admin en double authentification. Tests : `tests/db/web-vitals.test.ts`.
  - Accueil de l'admin : carte « Vitesse réelle des pages » (75e centile sur 7 jours, part de réseaux 2G/3G,
    pages les plus lentes).
- **Fait le 07/11 : test sur téléphone lent.** Voir la mesure de départ ci-dessus. Le script se relance après
  chaque mise en ligne pour comparer.

## 2. Ressenti dans l'interface

- **Squelettes plutôt que spinners : déjà fait.** 78 fichiers affichent un `Skeleton` sous `<Suspense>`. Les deux
  seuls indicateurs qui tournent (envoi d'une copie, téléchargement d'un chapitre) signalent une action en cours,
  ce qui est leur rôle.
- **Mise à jour optimiste : faite le 07/11 pour « Marquer comme terminée »** (`mark-lesson-done.tsx`,
  `useOptimistic`). La leçon s'affiche terminée tout de suite ; si le serveur refuse, le bouton revient avec un
  message. Les autres actions renvoient vers une autre page ou ont besoin de la réponse du serveur (correction
  d'une copie, paiement).
- **Réponses de l'IA en streaming : sans objet.** Le site n'appelle aucune IA.
- **Debounce sur la recherche : sans objet.** Les recherches (admin, en-tête) partent à la validation du
  formulaire, jamais à chaque touche.
- **Listes virtualisées : sans objet.** Les listes longues sont déjà découpées : 50 notifications, 100 utilisateurs
  (admin), sujets officiels repliés par session. La conversation est limitée aux 200 derniers messages depuis le 07/11.
- **Re-renders inutiles : rien à corriger.** Presque tout est en composants serveur ; les composants client sont
  petits et locaux.

## 3. Chargement du front-end

- **Rendu côté serveur ou au build : déjà fait.** `cacheComponents` et le prérendu partiel : coque statique servie
  tout de suite, données de l'utilisateur en flux.
- **JavaScript découpé par page : déjà fait** (Next.js), chargements différés pour les outils lourds (QR code de
  l'admin créé au clic).
- **Scripts tiers après la page : sans objet.** Le site n'en a aucun (pas d'analytics, de chat ni de pixel).
- **Dépendances inutiles : rien à retirer.** 14 dépendances, toutes utilisées ; `pdfjs-dist` et `pdf-lib` ne servent
  qu'aux scripts.
- **Images WebP et à la bonne taille : déjà fait.** Les photos passent par `next/image` (WebP, tailles adaptées) ;
  les dessins des leçons sont des SVG légers. Pas d'AVIF : il doublerait les conversions comptées par Vercel.
- **Images sous la ligne de flottaison en lazy load : déjà fait.** `loading="lazy"` et dimensions fixées sur les
  dessins des leçons (pas de saut de mise en page : CLS = 0).
- **Polices hébergées sur le site, seulement ce qui sert : déjà fait.** `next/font` : Lexend (une police variable,
  alphabet latin) et l'écriture cursive des cahiers, jamais préchargée.

## 4. Appels API

- **Requêtes identiques dédupliquées : déjà fait** (`cache()` de React par requête, `"use cache"` partagé).
- **Requêtes indépendantes en parallèle : déjà fait** (`Promise.all` partout). Le 07/11, l'ouverture d'une
  conversation lance aussi « conversation lue » en même temps que les autres lectures.
- **Pagination : déjà fait** (`selectAllRows` par pages de 1 000, listes limitées) ; conversations limitées aux
  200 derniers messages depuis le 07/11.
- **Délais d'attente sur les API externes : faits le 07/11.**
  - PayDunya : 15 s au plus, puis « Le service de paiement ne répond pas. Réessaie dans quelques minutes ».
  - Réglages des réseaux sociaux (Supabase) : 5 s au plus, puis connexion sans les boutons sociaux.

## 5. Back-end et base de données

- **Requêtes N+1 : aucune trouvée.** Les noms et titres sont lus en une requête par lot.
- **Index : déjà fait.** Toutes les clés étrangères ont un index (vérifié le 07/11 sur une copie PGlite :
  `node_modules/.cache/diangal/index-audit.mjs`) ; migration `20261012000004_performance.sql`.
- **Pas de `SELECT *` : déjà fait.** Aucune occurrence ; chaque requête nomme ses colonnes.
- **Pool de connexions : déjà fait par Supabase** (API HTTP et pooler Supavisor).
- **Cache Redis : laissé de côté.** Le cache de Next.js (`"use cache"`, `cacheLife`, `cacheTag`, invalidé par
  `updateTag` quand l'admin modifie un contenu) joue ce rôle sur Vercel, sans serveur de plus à payer.
- **File de jobs : déjà fait là où c'est utile.** Les SMS en attente vont dans la file `private.sms_outbox` (l'Edge Function
  `process-sms-outbox` qui la vide reste à déployer), et les tâches de nettoyage passent par pg_cron. Les emails sont envoyés par Supabase Auth.

## 6. Infrastructure et réseau

- **CDN : déjà fait** (réseau de Vercel, serveur de Paris pour le Sénégal).
- **Compression Brotli : déjà faite** (Vercel).
- **Cache du navigateur : fait le 07/11 pour les fichiers de `public/`.**
  - Ce qui change : les dessins, photos et icônes étaient servis avec `max-age=0`, et le téléphone redemandait
    chaque fichier à chaque visite. Ils sont maintenant gardés 1 jour, puis réutilisés encore 7 jours pendant la
    vérification en arrière-plan (`next.config.ts`).
  - Les fichiers versionnés de `/_next/static` sont déjà en cache « immutable » d'un an.
- **Serveurs dans la région de la base : fait le 07/11.** `vercel.json` : `"regions": ["dub1"]` (Dublin), à côté de
  la base Supabase (`eu-west-1`, Irlande). C'est le gain le plus fort attendu pour les pages des élèves et des parents.
- **Répartition sur plusieurs instances : déjà fait** (fonctions Vercel, mises à l'échelle automatiquement).

## Ce qui reste à faire

- Dans une semaine, lire la carte « Vitesse réelle des pages » de l'accueil admin : ce sont les vrais chiffres.
- Pour gagner encore : réduire le JavaScript commun (environ 220 Ko). Il faudra mesurer composant par composant.
- Plus tard : recréer le projet Supabase à Paris (prévu avant le lancement), et passer alors les fonctions Vercel
  à Paris (`cdg1`).
