@AGENTS.md

# DIANGAL

Plateforme scolaire pour le Sénégal, du CI à la Terminale, alignée sur les programmes du Ministère de l'Éducation nationale (préparation du CFEE, du BFEM et du Bac). Elle sert quatre rôles : **élève**, **parent**, **répétiteur** et **admin**.

Contraintes qui guident tous les choix :
- **Mobile d'abord** : Android d'entrée de gamme, réseau lent et cher. L'application est une PWA légère qui fonctionne hors ligne.
- **Français** pour l'interface, via un fichier de traduction. Le wolof viendra plus tard.
- **Paiements en FCFA** par mobile money : Wave, Orange Money, Free Money/Yas, plus la carte.
- **Modèle freemium**, plus une commission sur les séances de répétition.
- **Utilisateurs majoritairement mineurs** : loi sénégalaise n° 2008-12 sur les données personnelles (CDP).

## État actuel (octobre 2026)

- MVP centré sur la **3e**. Tous les écrans des 4 rôles fonctionnent sur des **données de démonstration** (`src/mocks`), avec une session de démo.
- La base **Supabase** est écrite : migrations, RLS, RPC et seed. Elle est testée avec PGlite mais **pas encore branchée** à l'application.
- **En attente de comptes externes** : projet Supabase et clés, Orange SMS et Twilio, sandbox PayDunya, Vercel et le domaine `diangal.sn`.
- Dépôt : `github.com/Seydiaba10/Diangal`, branche `main`.

## Commandes

```bash
pnpm dev          # http://localhost:3000 (Turbopack)
pnpm build        # build de production (~450 pages)
pnpm lint
pnpm typecheck    # tsc --noEmit
pnpm test         # Vitest : tests/unit + tests/db (PGlite)
pnpm test:db      # tests de la base seuls
pnpm db:seed      # régénère supabase/seed.sql depuis src/mocks
```

- Node 22, pnpm 12. Les scripts de build autorisés se déclarent dans `pnpm-workspace.yaml` (`allowBuilds`), pas dans `.npmrc`.
- Après avoir ajouté ou supprimé une route, lancer `pnpm exec next typegen` avant `pnpm typecheck`.
- Ne jamais lancer `next build` pendant que `next dev` tourne : cela corrompt `.next`. Arrêter le serveur de dev d'abord.
- Le serveur de dev peut garder en mémoire d'anciennes versions des mocks. Si une modification de données n'apparaît pas, le redémarrer.
- **Démo** :
  - le code OTP est toujours `123456` ;
  - le rôle est lu dans le cookie `diangal_demo_role` (`student` par défaut) ;
  - le sélecteur « Mode démo » du menu change de rôle ;
  - le jeton de consentement parental de démo est `/consentement/demo`.

## Technologies

| Domaine | Choix |
|---|---|
| Framework | **Next.js 16.4** (App Router, Turbopack), React 19.3, TypeScript strict. `cacheComponents` et `partialPrefetching` sont activés. |
| Styles | **Tailwind CSS v4** via `@tailwindcss/turbopack`, tokens dans `@theme` (`src/app/globals.css`). La palette par défaut est désactivée. |
| Traduction | **next-intl** sans préfixe de langue : locale fixée à `fr` (`src/i18n/request.ts`), textes dans `messages/fr.json`, typés par `src/global.d.ts`. |
| Icônes, police | `lucide-react`, Lexend (`next/font`). |
| PWA | **Serwist** (`@serwist/turbopack`) : service worker `src/app/sw.ts` servi par `src/app/serwist/[path]/route.ts`. Données hors ligne dans IndexedDB via `idb`. |
| Base de données | **Supabase** (Postgres, RLS, RPC, Storage, pg_cron), `@supabase/ssr` avec `getClaims()`. Région prévue : Paris. |
| Validation | `zod`, notamment pour les variables d'environnement (`src/lib/env.ts`). |
| Paiement | **PayDunya** (Wave, OM, Free/Yas, carte) derrière l'interface `PaymentProvider`. |
| SMS | Edge Functions Supabase : API SMS Orange Sénégal, avec Twilio en secours. |
| Tests | **Vitest**, **PGlite** (Postgres 18 en WASM) pour les tests SQL. |

## Fonctionnalités implémentées

Toutes fonctionnent sur les mocks, sauf mention contraire.

- **Public** : landing (inspirée de Kindering), `/tarifs`, `/devenir-repetiteur`, pages légales (`/confidentialite`, `/cgu`, `/mentions-legales`, à faire relire par un juriste).
- **Authentification** :
  - `/connexion` : téléphone ou email, puis code OTP ;
  - `/inscription` : assistant en 6 étapes (rôle, identifiant, code, profil, niveau et série, consentements). Un élève mineur doit saisir le téléphone d'un parent ;
  - `/consentement/[token]` : validation par le parent.
- **Élève** (`/eleve`) :
  - tableau de bord : moyenne, chapitres, contrôles, jours d'affilée, « Continuer », points faibles, compte à rebours de l'examen ;
  - cours par matière, chapitre puis leçon, avec « Marquer comme terminée » et mur Premium ;
  - entraînement ;
  - **contrôle chronométré** en mode concentration (`(focus)`) : échéance fixée par le serveur, sauvegarde locale, envoi automatique ;
  - résultat avec corrigé détaillé ;
  - examens et annales, progression, téléchargements hors ligne, profil, abonnement.
- **Écrans partagés** : annuaire des répétiteurs (filtres dans l'URL), fiche répétiteur (contact bloqué en mode limité), messagerie, notifications, retour de paiement.
- **Parent** : une carte par enfant, détail d'un enfant, rattachement par code élève, abonnements, profil.
- **Répétiteur** (`/prof`) : accueil, profil (matières, niveaux, tarif, mode), pièces de vérification, disponibilités.
- **Admin** : statistiques, contenus avec éditeur de leçon, évaluations, examens, file de vérification des répétiteurs, signalements, utilisateurs, paiements, journal d'audit.
- **Hors ligne** :
  - manifeste, icônes, `/demarrer` (adresse de lancement de la PWA), page `/hors-ligne` ;
  - téléchargement d'un chapitre (`/api/hors-ligne/chapitres/[id]`) vers IndexedDB, lecteur hors ligne, bouton d'installation.
- **Paiement** :
  - client PayDunya (`src/lib/payments`) ;
  - webhook `/api/webhooks/paydunya` : vérifie le hash, relit le statut chez PayDunya, journalise dans `payment_events` (idempotent), puis appelle la RPC `apply_payment_event`.
- **Base Supabase** (`supabase/migrations`, 15 fichiers) :
  - RLS sur toutes les tables, droits par colonne, schéma `private` pour les fonctions `SECURITY DEFINER` et les corrigés ;
  - hook d'access token (claim `user_role`) ; un admin doit avoir le niveau MFA `aal2` ;
  - RPC `start_attempt`, `submit_attempt` (correction côté serveur), `get_student_dashboard`, `search_tutors`, consentement parental, messagerie, vérification des répétiteurs, paiements ;
  - Storage et pg_cron, installés seulement si l'extension existe.
- **Pas encore fait** :
  - branchement des `data.ts` sur Supabase et vraie connexion OTP avec Turnstile ;
  - réservations, visio LiveKit et avis (release 2) ;
  - autres niveaux que la 3e, interface en wolof ;
  - E2E Playwright en CI, Lighthouse CI, déploiement.

## Structure des fichiers

```text
src/
  app/
    (marketing)/         landing, tarifs, devenir-repetiteur, pages légales (bandeau tricolore)
    (auth)/              connexion, connexion/code, inscription, consentement/[token]
    (app)/               espace connecté : AppShell (sidebar desktop, barre basse mobile)
      eleve/ parent/ prof/ admin/   un layout par rôle avec <AppShell role> + garde de rôle
      (partage)/         repetiteurs, messages, notifications, paiement (rôle lu dans le cookie)
    (focus)/eleve/tentatives/[id]   lecteur de contrôle sans navigation
    api/                 hors-ligne/chapitres/[id], webhooks/paydunya
    serwist/[path]/      sert le service worker ; sw.ts = sa source
    hors-ligne/  demarrer/  manifest.ts  icon.svg  layout.tsx  globals.css
  components/
    ui/                  briques : Button, Card, Badge, LevelBadge, SenegalFlag, form, table…
    layout/              AppShell, Sidebar, BottomNav, MobileTopBar, NavLink, SessionCard, Logo…
  features/<domaine>/    data.ts (lecture), actions.ts (Server Actions), components/
                         domaines : account, curriculum, assessments, progress, exams, tutors,
                         messaging, notifications, payments, parents, admin, offline, marketing
  lib/                   format, grading, levels (cycles et séries), subjects, navigation,
                         env, slug, cn, payments/, supabase/{server,browser,admin}
  mocks/                 données de démo (élève de 3e, catalogue, contrôles, corrigés,
                         répétiteurs, offres) + progress-store (état en mémoire)
  types/domain.ts        types métier partagés entre l'UI et data.ts
  i18n/request.ts  proxy.ts  global.d.ts
messages/fr.json         tous les textes de l'interface, un namespace par écran
supabase/                migrations/, seed.sql (GÉNÉRÉ), config.toml, functions/ (SMS)
scripts/generate-seed.ts produit supabase/seed.sql à partir des mocks
tests/unit/              format, grading, paydunya
tests/db/                harness PGlite + tests RLS/RPC (parité de correction SQL/TS)
docs/programme/          relevé du programme scolaire (sources et listes de chapitres)
public/                  icons/ (PWA), landing/app-accueil.png (capture du tableau de bord)
```

## Règles à respecter

### Données
- **Un composant n'importe jamais `src/mocks`.** Il passe par `features/*/data.ts`. Ces fonctions gardent la même signature quand elles liront Supabase.
- Les corrigés (`answer-keys-3e.ts`) sont `server-only` et ne doivent jamais atteindre le client.
- Une donnée propre à l'utilisateur passe par une fonction de `data.ts` qui appelle `await connection()`. Elle s'affiche sous `<Suspense>` avec un squelette.
- `supabase/seed.sql` est **généré** : ne pas le modifier à la main, lancer `pnpm db:seed` après tout changement de mocks.
- Les tests ne codent pas en dur des volumes de contenu : ils les dérivent des mocks (ex. `CHAPTERS_3E.length`).

### Next.js 16
Lire `node_modules/next/dist/docs/` avant d'utiliser une API (voir `AGENTS.md`). Avec `cacheComponents` :
- pas de `Date.now()` ni de `new Date()` pendant le rendu avant `connection()` ;
- lire `params` et `searchParams` dans un composant enfant placé sous `<Suspense>` ;
- `usePathname` seulement via `NavLink`, déjà sous Suspense ;
- `generateStaticParams` doit renvoyer au moins une valeur ;
- un fichier `page.tsx` n'exporte que ce que Next autorise : placer les constantes partagées dans `features/` ;
- `src/proxy.ts` remplace `middleware.ts` ;
- les helpers globaux `PageProps<"/route">` et `LayoutProps` typent les pages.

### Textes et traduction
- **Aucun texte en dur dans le JSX** : tout passe par `messages/fr.json` (`getTranslations` ou `useTranslations`).
- Apostrophe typographique `’` et pluriels ICU.
- On **tutoie** l'élève, on **vouvoie** le parent et le répétiteur.
- Un composant client ne reçoit que les namespaces passés à son `NextIntlClientProvider`. Ajouter le namespace au provider de la page quand on en utilise un nouveau (ex. `inscription/page.tsx`).
- Les textes de SMS restent en **GSM-7**, sans accents.

### Styles et interface
- **Uniquement des tokens** : aucune couleur hexadécimale dans les composants.
  - Exceptions : l'illustration de `student-avatar.tsx`, `icon.svg`, `manifest.ts`, `themeColor`.
  - La palette Tailwind par défaut n'existe pas.
- Les classes construites dynamiquement sont écrites **en entier** dans des tables de correspondance (`lib/subjects.ts`, `lib/levels.ts`), pour que Tailwind les détecte.
- **Formats** toujours via `lib/format.ts` : FCFA avec espace insécable, dates jj/mm/aaaa en heure de Dakar, notes « 13,5/20 ».
- Montants en **entiers** FCFA ; dates en fuseau `Africa/Dakar`.
- **Accessibilité** :
  - un état s'affiche toujours avec une icône et un libellé, jamais par la seule couleur ;
  - contraste AA, focus visible, cibles tactiles d'au moins 44 px.
- **Mobile** : aucun défilement horizontal à 360 px.

### Sécurité et données personnelles
- RLS sur toutes les tables.
- `role`, `status`, `consent_status` et `rating_*` ne sont jamais modifiables par un client.
- Les fonctions `SECURITY DEFINER` utilisent `set search_path = ''`.
- La clé secrète Supabase reste côté serveur (`server-only`).
- **Correction** : `lib/grading.ts` et les fonctions SQL `private.normalize_text`, `parse_number` et `grade_answer` doivent rester alignées. Les tests de `tests/db` vérifient cette parité.
- **Mineurs** : en « mode limité » tant que le parent n'a pas validé par SMS.
  - Ce qui reste fermé : messagerie, contact d'un répétiteur, réservations et paiements.
  - Minimisation des données : avatars illustrés, prénom et initiale visibles des répétiteurs, date de naissance jamais exposée.
- Ni publicité ni traceur tiers.

## Décisions de design

- **Next.js 16** plutôt que 14, qui n'est plus maintenu. Décision validée par le porteur du projet.
- **Couleurs nationales** :
  - marque au vert du drapeau `#00853f` (`brand-*`) ;
  - chaque cycle a sa couleur : **élémentaire (CI-CM2) vert, moyen (6e-3e) jaune, secondaire (2nde-Tle) rouge** ;
  - tokens `cycle-*` et `senegal-*`, composants `LevelBadge`, `CycleDot`, `SenegalFlag`, `FlagStripe` ;
  - sur le jaune, le texte est toujours `ink`.
- Une couleur par matière (`subject-*`). Badges de chapitre : vert terminé, bleu en cours, gris non commencé, plus un badge Premium.
- **Tableau de bord** inspiré de la maquette Talab Edu. **Landing** inspirée de Kindering : en-tête en pilule, bord déchiré, autocollant.
- **URLs en français** sans préfixe de langue (`/eleve/cours`), pour des URLs stables en cache hors ligne.
- **Offres prépayées**, car le mobile money ne gère pas le prélèvement : 2 000 FCFA par mois, 5 000 par trimestre, 15 000 par an, Pass BFEM à 7 500. Les cours gratuits restent toujours téléchargeables hors ligne.
- **Paiement via PayDunya**, pour une seule intégration. Wave en direct pourra s'ajouter plus tard derrière `PaymentProvider`.
- **Hébergement prévu** : Supabase et Vercel à Paris.

## Programme scolaire

- Le référentiel des niveaux, cycles et séries est dans `src/lib/levels.ts`. Séries du lycée : L1, L2, LA, S1 à S5, G, T1, T2 ; 2nde L ou S.
- Les sources et listes de chapitres sont dans `docs/programme/releve-ci-3e.md` :
  - PROMET, site officiel du ministère ;
  - Sunudaara, site privé : ne reprendre que les titres, jamais ses leçons.
- **Catalogue de 3e** : maths, physique-chimie, SVT et histoire-géographie suivent ce relevé. Français, anglais, éducation civique et les coefficients restent indicatifs.
- Seules les leçons du chapitre « Théorème de Thalès » sont rédigées (`src/mocks/lesson-content.ts`).
- Tout contenu pédagogique doit être **original** et **validé par des enseignants**.
- **Manque encore** :
  - programmes officiels (MEN, INEADE) ;
  - coefficients du BFEM et du CFEE ;
  - chapitres de français et d'anglais ;
  - statut de l'éducation civique ;
  - matières du lycée par série.

## Pour un futur modèle IA

1. Lire ce fichier, `AGENTS.md`, puis le `data.ts` de la feature concernée avant de coder.
2. Reproduire le style du code voisin : commentaires courts en français, noms en anglais, Server Components par défaut, `"use client"` seulement pour l'interactif.
3. Après chaque modification, vérifier `pnpm lint`, `pnpm typecheck` et `pnpm test`. Lancer aussi `pnpm db:seed` si les mocks changent.
4. Ne rien inventer sur le programme officiel. Signaler ce qui n'est pas sourcé.
5. Le porteur du projet écrit en français et n'est pas développeur : lui répondre en français simple, et ne pousser sur GitHub que s'il le demande.
6. Prochaines étapes :
   - brancher `features/*/data.ts` sur Supabase dès que les clés sont fournies (`.env.local`, voir `.env.example`) ;
   - vraie connexion OTP ;
   - E2E Playwright ;
   - déploiement ;
   - contenus des autres matières et niveaux.
