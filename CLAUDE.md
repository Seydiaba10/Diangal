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

- Classes publiées (chaque chapitre a sa série d'exercices corrigés) :
  - dans la démo et le seed (depuis le 17/10/2026) : **toutes les classes, du CI à la Terminale** (13 classes, 2 078 chapitres, 3 625 leçons rédigées ; leçons de Terminale S et L revues et enrichies le 21/10/2026 d’après les PDF de l’Office du Bac, voir `docs/programme/programme-tle.md`). Au lycée : séries **S et L** en 2nde ; **L1, L2, LA, S1 à S5, G, T1 et T2** en 1re et en Terminale ;
  - dans la base hébergée : **CI**, **CP** et **3e** depuis le 16/10/2026, **toutes les autres classes et séries** depuis le 17/10/2026 (31 lots d'ajouts, essayés d'abord sur une copie PGlite de la production ; CI, CP et 3e inchangés). **Terminale revue publiée le 21/10/2026** : 17 lots de mise à jour (corps, durées et résumés modifiés, 9 chapitres et 21 leçons ajoutés, 2 leçons sans progression retirées, exercices), essayés sur PGlite, après sauvegarde JSON de la Terminale ; résultat identique au seed.
  - Chaque élève voit les cours de sa classe et de sa série ; une classe ou une série sans programme affiche « pas encore publiés ».
- **Application full stack sur Supabase** depuis le 12/10/2026 : projet hébergé `mlepbueoqrzmniksdhpl` (région **eu-west-1, Irlande**). Toutes les fonctionnalités des 4 rôles lisent et écrivent dans la base, sous RLS. Vérifiées de bout en bout avec de vrais comptes (élève de CI et de 3e, parent, répétiteur, admin), pages contrôlées à 360 px.
- **Deux modes**, choisis par `DIANGAL_DATA_SOURCE` (`.env.local`) :
  - `supabase` : vraie base, vraie session, proxy actif. C'est le mode actuel en local ;
  - `demo` : données fictives de `src/mocks`, sans réseau. C'est la valeur par défaut si la variable manque.
- **Connexion** : deux pages séparées, `/connexion` (élèves et parents) et `/connexion/repetiteur`. Pas de mot de passe : code à 6 chiffres reçu par **email**, ou par **téléphone** (onglet affiché seulement si `DIANGAL_WHATSAPP_ENABLED` ou `DIANGAL_SMS_ENABLED` est activé ; choix WhatsApp ou SMS, indicatif +221 par défaut). Facebook, Apple, Google et X marchent pour un compte existant (grisés tant que le réseau n'est pas ouvert dans Supabase). Un identifiant inconnu reçoit la même réponse qu'un compte existant (pas d'énumération). L'admin passe par une double authentification TOTP.
- **Mise en ligne du 23/10/2026** (demandée par le porteur du projet) : branche `refonte-comptes-classes-paiements` fusionnée dans `main` et déployée par Vercel ; migrations `20261022000001` à `…04` appliquées en ligne (répétées d'abord sur PGlite dans l'état de la production, sauvegarde JSON des formules, réglages, fonctions et contraintes remplacées) ; types régénérés ; essai réel sur le site avec un compte temporaire (3e → 2nde, révision de la 3e, Mon compte, Parrainage, suppression par la page), puis effacé. Contenu : landing claire, Pass BFEM retiré, comptes (déconnexion partout, « Mon compte », suppression CDP), navigation entre les classes, parrainage (fermé), remboursements. Documentation : `docs/comptes-et-classes.md`, `docs/connexion-telephone.md`, `docs/paiements.md` (Stripe non disponible au Sénégal, PayDunya gardé), `docs/parrainage.md`.
- **Mises en ligne des 23 et 24/10/2026** : sujets et corrigés officiels du Bac (731 liens, table `official_papers`) ; Next.js 16.4.0 → 16.4.3 (failles corrigées) ; 9 sujets blancs BFEM DIANGAL (137 questions) ajoutés à la base hébergée par un lot rejouable, essayé sur PGlite (copie parfaite = 20/20 sur chaque sujet), puis vérifiés sur le site avec un élève de 3e temporaire, effacé ensuite. Cet essai a révélé la coupure à 1 000 lignes (voir « Données ») : catalogue lu par pages et prérendu réduit le 24/10.
- **Limites actuelles, qui demandent des comptes externes** :
  - **emails** : l'envoi intégré à Supabase (offre gratuite) n'envoie qu'aux membres de l'équipe du projet, 2 emails par heure, avec un modèle non modifiable qui contient un lien et pas de code. Il faut un SMTP personnalisé (Resend, Brevo…), puis le modèle en français avec `{{ .Token }}` (`DIANGAL_EMAIL_CODE=true`) ;
  - **SMS** : Orange SMS ou Twilio, plus le déploiement des Edge Functions (`DIANGAL_SMS_ENABLED=true`). Sans SMS, les demandes de validation parentale attendent dans `private.sms_outbox` ;
  - **WhatsApp** : compte WhatsApp Business (API Cloud de Meta), modèle d'authentification `diangal_code` en français approuvé par Meta, secrets `WHATSAPP_TOKEN` et `WHATSAPP_PHONE_NUMBER_ID` sur la fonction `send-sms`, Send SMS Hook activé, puis `DIANGAL_WHATSAPP_ENABLED=true`. Le canal choisi est noté dans `private.otp_channels` juste avant l'envoi (le hook ne le transmet pas) ;
  - **paiement** : clés PayDunya (sandbox). Sans elles, le bouton « Payer » affiche « paiement pas encore ouvert » ;
  - **mise en ligne** : Vercel est relié au dépôt (projet `seydi1/diangal`, https://diangal.vercel.app) et déploie **automatiquement** chaque envoi sur `main`. Le site tourne sur la vraie base : l’intégration Supabase de Vercel fournit l’URL et les clés, `DIANGAL_DATA_SOURCE=supabase` et `NEXT_PUBLIC_SITE_URL` sont saisies en Production. CLI : `npx vercel@63.1.2 … --scope seydi1` (connectée sur ce poste). Domaine `diangal.sn` à brancher.
- Dépôt : `github.com/Seydiaba10/Diangal`, branche `main`.

## Commandes

```bash
pnpm dev          # http://localhost:3000 (Turbopack)
pnpm build        # build de production (seul le 1er chapitre de la 1re matière de chaque classe, ses leçons et ses exercices sont prérendus)
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
- Le cache disque de Turbopack est désactivé (`turbopackFileSystemCacheForDev` et `…ForBuild` à `false` dans `next.config.ts`) : avec `@tailwindcss/turbopack`, il servait un CSS périmé après une modification de `globals.css`, en dev comme sur Vercel (qui restaure `.next/cache`). Ne pas le réactiver sans vérifier le CSS servi.
- **Base hébergée** : les clés sont dans `.env.local` (jamais dans le code ni le chat). Pour appliquer une nouvelle migration :
  - CLI Supabase via `npx supabase`, avec `SUPABASE_ACCESS_TOKEN` dans l'environnement ;
  - `supabase link --project-ref mlepbueoqrzmniksdhpl`, puis `supabase db push --linked` ;
  - forcer `SUPABASE_DB_PASSWORD` à vide pour que la CLI utilise son rôle de connexion temporaire ;
  - la CLI valide `config.toml` : fournir des valeurs factices pour `SEND_SMS_HOOK_SECRET` (format `v1,whsec_…`) et `TURNSTILE_SECRET_KEY` ;
  - l'hôte direct `db.<ref>` est IPv6 seulement : passer par le pooler `aws-0-eu-west-1.pooler.supabase.com`.
- Une migration déjà appliquée ne se modifie pas : en ajouter une nouvelle (ex. `20261012000001_hook_grants.sql`).
- **Publier le contenu d'une classe sur la base hébergée** : pas de nouveau seed complet (les autres lignes existent déjà). Générer seulement ses `insert` (programmes, chapitres, leçons, corps, questions, corrigés, séries) à partir des mocks, rejouables (`on conflict do nothing`, chapitres et leçons repérés par leur slug), les exécuter en une transaction via l'API de gestion, puis lancer `pnpm db:seed` pour garder le seed local aligné.
  - Avant de remplacer des leçons : vérifier qu'aucune progression (`lesson_progress`) ni média n'en dépend, sauvegarder les lignes en JSON, et rejouer d'abord le script sur une base PGlite chargée avec le seed du dernier commit (même état que la production) ;
  - l'offre gratuite étant désactivée en ligne, les leçons et exercices publiés y sont insérés avec `is_premium = false`.
- Après une migration, regénérer les types : `supabase gen types typescript --linked --schema public` vers `src/types/database.ts`, en gardant la ligne d'en-tête.
- **Réglages Auth** (Management API `/v1/projects/{ref}/config/auth`, avec le jeton) :
  - hook d'access token activé ; OTP email à 6 chiffres, valable 600 s ;
  - `uri_allow_list` : `localhost:3000` et `diangal.sn` ;
  - les modèles d'email ne sont modifiables qu'avec un SMTP personnalisé.
- **Comptes de test** : les créer avec l'API admin (`auth.admin.createUser`, le déclencheur crée le profil) et obtenir un code sans email avec `auth.admin.generateLink({ type: "magiclink" })` (`properties.email_otp`).
  - Un compte qui a agi (messages, consentements, journal) ne se supprime pas tant que ces lignes existent : effacer d'abord ces traces.
- **Démo** :
  - le code OTP est toujours `123456` ;
  - le rôle est lu dans le cookie `diangal_demo_role` (`student` par défaut) ;
  - le sélecteur « Mode démo » du menu change de rôle ;
  - le jeton de consentement parental de démo est `/consentement/demo`.

## Technologies

| Domaine | Choix |
|---|---|
| Framework | **Next.js 16.4.3** (App Router, Turbopack), React 19.3, TypeScript strict. `cacheComponents` et `partialPrefetching` sont activés. |
| Styles | **Tailwind CSS v4** via `@tailwindcss/turbopack`, tokens dans `@theme` (`src/app/globals.css`). La palette par défaut est désactivée. |
| Traduction | **next-intl** sans préfixe de langue : locale fixée à `fr` (`src/i18n/request.ts`), textes dans `messages/fr.json`, typés par `src/global.d.ts`. |
| Icônes, police | `lucide-react`, Lexend (`next/font`). |
| PWA | **Serwist** (`@serwist/turbopack`) : service worker `src/app/sw.ts` servi par `src/app/serwist/[path]/route.ts`. Données hors ligne dans IndexedDB via `idb`. |
| Base de données | **Supabase** (Postgres, RLS, RPC, Storage, pg_cron), `@supabase/ssr` avec `getClaims()`, clients typés par `src/types/database.ts` (généré). Région actuelle : Irlande. |
| Validation | `zod`, notamment pour les variables d'environnement (`src/lib/env.ts`). |
| Paiement | **PayDunya** (Wave, OM, Free/Yas, carte) derrière l'interface `PaymentProvider`. |
| SMS | Edge Functions Supabase : API SMS Orange Sénégal, avec Twilio en secours. |
| Tests | **Vitest**, **PGlite** (Postgres 18 en WASM) pour les tests SQL. |

## Fonctionnalités implémentées

Toutes fonctionnent sur Supabase (et sur les mocks en mode démo), sauf mention contraire.

- **Public** : landing claire (22/10/2026) : en-tête en pilule, photo « révision du soir » encadrée avec une carte flottante, fonctionnalités, classes du CI à la Terminale par cycle, étapes, paiements locaux, parents, tarifs, répétiteurs, FAQ ; logo compact sous 400 px. `/tarifs`, `/devenir-repetiteur`, pages légales (`/confidentialite`, `/cgu`, `/mentions-legales`, à faire relire par un juriste).
- **Authentification** :
  - `/connexion` (élèves et parents) ou `/connexion/repetiteur`, puis `/connexion/code` : email ou WhatsApp, code à 6 chiffres ou lien de l'email traité par `/auth/confirmation`. Le paramètre `espace` garde la page d'origine. Réseaux sociaux : `signInWithSocialAction`, réseaux ouverts lus dans `/auth/v1/settings` (`features/account/oauth.ts`) ; un réseau sans compte DIANGAL renvoie `erreur=social-inconnu` ;
  - `/inscription` : assistant en 6 étapes, dans l'ordre rôle, profil, classe, conditions, identifiant (email, WhatsApp ou SMS), code. Le compte Supabase est créé à l'envoi du code avec ses métadonnées (le déclencheur `handle_new_user` exige la classe et la date de naissance). Les compléments (téléphone du parent, code enfant, ville, matières) sont rangés dans les métadonnées du compte (`signup_pending`) ; `features/account/signup.ts` les applique une fois l'adresse vérifiée, sur n'importe quel appareil, puis efface le marqueur ;
  - `/connexion/securite` : double authentification de l'admin (enrôlement TOTP par QR code, puis code) ; le proxy et la garde de l'espace admin exigent `aal2` ;
  - `/consentement/[token]` : validation par le parent, connecté avec le numéro qui a reçu le SMS.
- **Élève** (`/eleve`) :
  - tableau de bord : moyenne, chapitres, contrôles, jours d'affilée, « Continuer », points faibles, compte à rebours de l'examen ;
  - cours de **sa classe** par matière, chapitre puis leçon, avec « Marquer comme terminée » et mur Premium. Une « matière » est un programme (matière × classe) : `/eleve/cours/mathematiques-ci`, `/eleve/cours/francais-3e` ;
  - **navigation entre les classes** (`features/schooling/class-navigation.ts`, carte « Mes classes ») : sur Cours, Exercices et « Préparer mon prochain devoir », la classe actuelle et les classes précédentes (`?classe=3E&serie=S`), progression par classe ; la classe de l'élève ne change pas, une classe supérieure est refusée ;
  - exercices (`/eleve/exercices`) : séries par chapitre (une série d'exercices corrigés par chapitre de chaque classe : `src/mocks/<classe>/exercises.ts`), contrôles, historique ;
  - **« Préparer mon prochain devoir »** (`/eleve/exercices/preparer`) : l'élève coche des chapitres d'une matière, choisit 5 à 20 questions et le mode (libre ou chronométré, 1 min 30 par question) ; questions tirées au hasard dans la banque, correction détaillée, historique « Mes devoirs préparés » ;
  - **contrôle chronométré** en mode concentration (`(focus)`) : échéance fixée par le serveur, sauvegarde locale, envoi automatique ;
  - résultat avec corrigé détaillé ;
  - **sujets et corrigés officiels du Bac** (onglet Bac des examens) : 731 PDF de l'Office du Bac (2023 à 2026), liens vers le site officiel, sans copie. Classés par session et matière ; ceux de la série de l'élève d'abord, les langues et documents sans série repliés. Voir `docs/annales/README.md` ;
  - **sujets blancs du BFEM** (onglet BFEM) : 9 sujets rédigés par DIANGAL, avec barème par question (`pts`) et corrigé détaillé : n°1 dans 6 matières (maths, français, PC, SVT, histoire-géographie, anglais), n°2 en maths, PC et SVT (forme des épreuves reprise, aucun texte copié). Fichier `src/mocks/3e/bfem-blancs.ts`, format compact de `exercise-series.ts` (`buildMockExams`), chaque question rattachée à un chapitre de 3e. Gratuits, à faire relire par des enseignants ;
  - **examens** (`/eleve/examens?examen=cfee|bfem|bac&serie=`) : onglets CFEE, BFEM et Bac (série au Bac), compte à rebours, sujets blancs DIANGAL chronométrés (présentés comme tels, avec l'origine du corrigé), annales officielles **seulement si vérifiées** (`assessments.verification` ≠ `unverified`) avec leur provenance, historique des épreuves passées. Aucune annale inventée : la démo n'en contient pas ;
  - progression, téléchargements hors ligne, profil, abonnement ;
  - **écoute à voix haute** (CI à CM1, `READ_ALOUD_LEVELS` de `lib/levels.ts`) : barre « Écouter » sur les leçons (lecture, pause, reprise, arrêt, plus lentement) et bouton « Écouter » sur chaque question des exercices ; synthèse vocale du téléphone (`components/ui/read-aloud.tsx`, `lib/speech.ts`), donc hors ligne si une voix française est installée. Illustration SVG en tête des leçons de ces classes (`lesson-illustration.tsx`) ;
  - **passage en classe supérieure** (carte du profil élève et de la page enfant du parent, `features/schooling`) : confirmation obligatoire, série demandée à l'entrée en 2nde, 1re et Terminale (l'actuelle est gardée si elle reste valable), fin de parcours après la Terminale, historique des classes ; notes et progression conservées. En démo, le passage d'Awa est gardé en mémoire jusqu'au redémarrage du serveur.
- **Écrans partagés** :
  - annuaire des répétiteurs (filtres dans l'URL) ;
  - fiche répétiteur : premier message qui crée la conversation, avec le parent en observateur pour un mineur ; contact bloqué en mode limité ;
  - messagerie **en temps réel** (Supabase Realtime sur `messages`, composant `LiveRefresh`), numéros masqués en base, notification des autres membres ;
  - notifications, retour de paiement ;
  - **Mon compte** (`/compte`) : identifiants, ajout d'un numéro (code), déconnexion ; **suppression** (`/compte/suppression`) : confirmation, connexion de moins de 15 min ou nouveau code, anonymisation en base puis suppression de la connexion (Supabase Auth, suppression douce) ; élève mineur relié : demande validée par le parent ; parent qui gère des profils d'enfants : bloqué tant qu'ils existent ; admin : refusé ;
  - **Parrainage** (`/parrainage`, élèves validés et parents) : code, lien et partage WhatsApp, jours Premium gagnés seulement après un paiement confirmé et 14 jours de garde, utilisés pour soi ou offerts à un enfant.
- **Parent** : une carte par enfant, détail d'un enfant, rattachement par code élève (confirmé ensuite par l'élève dans son profil), abonnements, profil.
  - **Offre Famille** (5 000 / 12 000 / 35 000 FCFA, 4 enfants au plus) : un paiement du parent crée un abonnement par enfant relié ; un enfant relié pendant la période est couvert s'il reste une place. Page `/parent/abonnements` : offre Famille, pass individuel, « Mes paiements » avec leur statut (payé, en attente, échoué) ;
  - **Famille** (`/parent/famille`) : code famille, code PIN de chaque enfant, création du profil d'un jeune enfant sans email ni téléphone (compte technique `enfant-…@enfant.diangal.invalid` créé par le serveur, validation parentale d'office) ;
  - **Connexion enfant** (`/connexion/enfant`) : code famille → prénom → code PIN (5 erreurs : 15 min de blocage) ; le serveur ouvre la session de l'enfant (clé secrète, `generateLink` puis `verifyOtp`). Démo : code `DEMOKIDS`, PIN d'Awa `1234`.
- **Répétiteur** (`/prof`) : il **ne voit pas les cours**. Accueil, profil (matières, niveaux, tarif, mode), disponibilités, pièces envoyées dans le Storage privé `tutor-documents`, envoi du dossier à la vérification.
  - **Mes élèves** (`/prof/eleves`) : invitation par le code élève, acceptée par un parent lié (ou l'élève majeur). Ensuite, sur `/prof/eleves/[id]` : notes (moyennes, derniers contrôles), devoirs, cours en ligne planifiés, message à l'élève (parents observateurs si mineur), fin du suivi ;
  - **Cours en ligne** (`/prof/cours-en-ligne`) : prochains cours. La salle de visio (LiveKit) reste à brancher ;
  - côté famille : panneau « Répétiteur » sur la page de l'enfant (accepter, refuser, mettre fin, devoirs, cours), bandeau sur l'accueil parent, panneau « Mon répétiteur » sur l'accueil et le profil de l'élève (devoirs à cocher).
- **Admin** : statistiques, évaluations avec corrigés, examens, file de vérification des répétiteurs (pièces par lien signé de 5 min, consultation journalisée), signalements, utilisateurs, paiements (avec « Marquer comme remboursé » et la carte Parrainage : ouverture, scénario prudent, intermédiaire ou généreux, chiffres), journal d'audit. Référentiel et contenus :
  - `/admin/suivi` : tableau de suivi par programme (chapitres publiés, leçons rédigées, exercices, QCM, sujets d'examen, vérification, sources, chapitres gratuits) et classes sans programme ;
  - `/admin/referentiel?classe=` : matières d'une classe (et d'une série au lycée), chapitres gratuits par matière (`programs.free_chapters`, 3 par défaut), création d'une matière ;
  - `/admin/contenus?classe=` puis `/admin/contenus/chapitres/[id]` : chapitres brouillons compris, rubrique, statut de vérification (`unverified`, `reviewed`, `official`), sources, leçons ajoutées en brouillon, éditeur de leçon. Publier exige au moins une source et une leçon, toutes rédigées ; publier ou dépublier change aussi le statut des leçons ; un chapitre non publié et jamais commencé peut être supprimé ;
  - **relecture** : bouton « Relire » de chaque chapitre (filtre `?serie=` au lycée) → `/admin/contenus/chapitres/[id]/relire` : toutes les leçons telles que l'élève les voit, puis les exercices avec la bonne réponse et l'explication (`AnswerKeyList`, aussi utilisé par `/admin/evaluations/[id]`) ; liens vers l'éditeur et chapitre précédent ou suivant ;
  - en démo, ces écrans lisent les mocks et n'enregistrent rien (avis « Mode démo »).
- **Hors ligne** :
  - manifeste, icônes, `/demarrer` (adresse de lancement de la PWA), page `/hors-ligne` ;
  - téléchargement d'un chapitre (`/api/hors-ligne/chapitres/[id]`) vers IndexedDB, lecteur hors ligne, bouton d'installation.
- **Paiement** :
  - client PayDunya (`src/lib/payments`) ;
  - webhook `/api/webhooks/paydunya` : vérifie le hash, relit le statut chez PayDunya, journalise dans `payment_events` (idempotent), puis appelle la RPC `apply_payment_event`.
- **Base Supabase** (`supabase/migrations`, 34 fichiers) :
  - RLS sur toutes les tables, droits par colonne, schéma `private` pour les fonctions `SECURITY DEFINER` et les corrigés ;
  - hook d'access token (claim `user_role`) ; un admin doit avoir le niveau MFA `aal2` ;
  - RPC `start_attempt`, `submit_attempt` (correction côté serveur), `get_student_dashboard`, `search_tutors`, consentement parental, messagerie, vérification des répétiteurs, paiements ;
  - RPC des écrans (migrations du 12/10) : `complete_lesson`, `get_attempt_session`, `get_consent_request`, `get_my_consent_request`, `get_pending_parent_links`, `record_signup_consents`, `get_tutor_profile`, `get_assessments_catalog`, `admin_log`, `admin_get_assessment`, `admin_save_lesson_body` ; déclencheur `notify_new_message` ;
  - canal du code de connexion (`20261012000006_otp_channel.sql`) : `public.set_otp_channel` (clé secrète seulement) et `private.otp_channel_for` lu par `send-sms` ;
  - suivi par un répétiteur (`20261012000007_tutor_students.sql`) : tables `tutor_students`, `tutor_assignments`, `tutor_sessions` (lecture RLS : répétiteur, élève, parents liés, admin ; écriture par RPC seulement), RPC `invite_student_by_code`, `answer_tutor_invite`, `end_tutor_link`, `get_tutor_students`, `get_tutor_student` (prénom + initiale, jamais la date de naissance), `get_family_tutor_links`, devoirs, cours et `tutor_message_student` ;
  - référentiel (`20261016000001_referential.sql`, `…02_tracking_written.sql`) : `chapters.strand` (rubrique), `chapters.verification`, `chapters.sources` (liste JSON titre, lien, type), `programs.free_chapters`, matières AR, ER et ESP, RPC `admin_content_tracking` (admin aal2). Une leçon compte comme rédigée si son corps n'est ni vide ni le gabarit « Contenu de démonstration » ;
  - matières des séries techniques (`20261017000001_lycee_subjects.sql`) : ECO, GEST (série G), CONST, TECH (S3, T1), ELEC (T2), AGRI (S4), AGRO (S5) ; leurs couleurs `subject-*` sont dans `globals.css`, leurs styles dans `lib/subjects.ts` ;
  - exercices et offre gratuite (`20261016000003_practice_and_free_tier.sql`) : `assessments.owner_id` (séance personnelle, lisible par l'élève, ses parents et l'admin, absente du catalogue), RPC `create_practice_session` et `get_chapter_question_counts` ; offre gratuite pilotée par `platform_settings.free_tier` (désactivée en ligne tant que le paiement n'est pas ouvert, activée dans le seed) : `private.sync_free_tier` met `is_premium` des leçons et exercices de chapitre selon `chapters.number > programs.free_chapters`, déclencheurs sur programmes, chapitres, leçons et évaluations, interrupteur admin `admin_set_free_tier` (carte « Offre gratuite » du Référentiel) ;
  - provenance des sujets (`20261016000004_exam_sources.sql`) : `assessments.verification`, `sources`, `correction_source` ; `get_assessments_catalog` renvoie aussi la série, la vérification et la provenance. L'admin les règle sur `/admin/evaluations/[id]` ;
  - passage de classe (`20261016000005_promotion.sql`) : table `student_level_history` (lecture : élève, parents liés, admin), RPC `promote_student(p_student, p_series)` autorisée à l'élève, à un parent lié et à l'admin ;
  - offre Famille (`20261016000006_family.sql`) : `plans.max_children`, formules `family_*` **créées inactives** (l'ancienne version du site ne les connaît pas), `create_payment_intent` et `apply_payment_event` étendues, déclencheur `parent_links_family_cover` ; `private.family_codes`, `private.child_logins` (PIN haché par `crypt`), RPC `get_my_family_code`, `get_my_child_logins`, `set_child_pin` (parent), `register_managed_child`, `get_family_children`, `verify_child_pin` (clé secrète seulement) ;
  - Pass BFEM retiré (`20261022000001_retire_bfem_pass.sql`) : formule désactivée, gardée pour l'historique ;
  - comptes (`20261022000002_accounts.sql`) : numéros E.164, `account_deletion_requests`, `delete_account`, `request_account_deletion`, `answer_account_deletion_request`, `private.anonymize_account`, `sync_my_contact`, `is_account_anonymized` (clé secrète), hook d'access token sans rôle pour un compte supprimé, `private.recent_login` (claim `amr`) ;
  - navigation entre les classes (`20261022000003_class_navigation.sql`) : `create_practice_session` accepte une classe précédente ;
  - parrainage (`20261022000004_referrals.sql`) : `referral_codes`, `referrals`, `referral_rewards`, réglages `platform_settings.referral` (fermé par défaut), `get_my_referral`, `claim_referral`, `private.qualify_referral` (appelée par `apply_payment_event`), `use_referral_days`, `admin_set_referral_settings`, `admin_referral_stats`, `admin_refund_payment` ; formule technique inactive `referral_bonus` ;
  - sujets officiels (`20261023000001_official_papers.sql`) : table `official_papers` (liens vers les PDF de l'Office du Bac, lecture publique, URL limitée au site officiel), données dans `src/mocks/official-papers.ts` (généré par `scripts/import-official-papers.mjs`) et le seed ;
  - Storage et pg_cron, installés seulement si l'extension existe.
- **Mise en ligne du 16/10/2026** (demandée par le porteur du projet) : code poussé sur `main` et déployé par Vercel ; formules Famille activées ; CP, exercices du CI, du CP et de la 3e et leçons rédigées de la 3e publiés dans la base hébergée (sauvegarde des anciennes leçons génériques de 3e faite avant le remplacement). **Reste à faire** : une fois PayDunya branché et testé, activer l'offre gratuite (carte « Offre gratuite » du Référentiel).
- **Pas encore fait** :
  - SMTP personnalisé (emails avec code), SMS (Edge Functions à déployer), clés PayDunya, Turnstile ;
  - export « Mes données » (droit d'accès CDP) ; Cloudflare Turnstile sur les demandes de code ;
  - réservations, salle de visio LiveKit (les cours en ligne sont déjà planifiables) et avis (release 2) ;
  - ouverture des réseaux sociaux dans Supabase (comptes développeur Meta, Apple, Google, X) ;
  - séries rares du lycée (L1a, L1b, F6, S1A, S2A, STEG) ; arabe, EPS et arts avant le lycée ; interface en wolof ;
  - sujets blancs du CFEE et du Bac ; annales numérisées (questions corrigées en ligne) ; sujets officiels du CFEE et du BFEM (seul le Bac a ses PDF officiels, via l'Office du Bac) ;
  - réglages de notifications du parent (affichés « Bientôt ») ;
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
    hors-ligne/  demarrer/  manifest.ts  icon.png  layout.tsx  globals.css
  components/
    ui/                  briques : Button, Card, Badge, LevelBadge, SenegalFlag, form, table…
    layout/              AppShell, Sidebar, BottomNav, MobileTopBar, NavLink, SessionCard, Logo…
  app/auth/confirmation/ route du lien de l'email (ouverture de session, fin d'inscription)
  features/<domaine>/    data.ts (lecture : mode démo OU Supabase), supabase.ts (requêtes Supabase),
                         actions.ts (Server Actions), components/
  features/account/      session.ts (identité depuis le JWT), signup.ts (fin d'inscription),
                         roles.ts (espaces de connexion), oauth.ts (réseaux sociaux ouverts)
  features/tutoring/     suivi d'élèves par un répétiteur (invitations, notes, devoirs, cours en ligne)
  features/referrals/    parrainage (presets.ts = scénarios de coût, alignés sur private.referral_preset)
  features/account/      otp.ts (canal, numéro, erreurs d'envoi), account-actions.ts (numéro, suppression)
                         domaines : account, curriculum, assessments, progress, exams, tutors,
                         messaging, notifications, payments, parents, admin, offline, marketing
  lib/                   format, grading, levels (cycles et séries), subjects, navigation,
                         places (villes), env, slug (programSlug), sanitize (HTML des leçons), phone (E.164, pays ouverts),
                         safe-path (redirections internes), cn, payments/,
                         supabase/{server,public,browser,admin}
  mocks/                 données de démo (élève de 3e, contrôles, corrigés, répétiteurs, offres)
                         + progress-store (état en mémoire). curriculum.ts = catalogue de toutes
                         les classes publiées (un curriculum-<classe>.ts et un dossier <classe>/ par
                         classe, de ci/ à tle/ ; catalog-builder.ts assemble matières, chapitres et
                         leçons, série comprise au lycée ; Thalès dans lesson-content.ts) ; assessments.ts et answer-keys.ts regroupent les
                         évaluations et les corrigés (server-only) ; exercise-series.ts = format compact
  types/domain.ts        types métier partagés entre l'UI et data.ts
  types/database.ts      GÉNÉRÉ depuis la base (supabase gen types)
  i18n/request.ts  proxy.ts  global.d.ts
messages/fr.json         tous les textes de l'interface, un namespace par écran
supabase/                migrations/, seed.sql (GÉNÉRÉ), config.toml, functions/ (SMS)
scripts/generate-seed.ts produit supabase/seed.sql à partir des mocks
tests/unit/              format, grading, paydunya, safe-path, speech, phone, class-navigation, catalog (leçons, séries, corrigés)
tests/db/                harness PGlite + tests RLS/RPC (parité de correction SQL/TS), accounts, class-navigation, referrals
docs/programme/          sources et découpage de chaque classe (programme-ci.md à programme-tle.md,
                         programme-college.md, programme-lycee.md) et relevé CI → 3e
public/                  icons/ (PWA), landing/revision-du-soir.jpg (photo de l'accueil), landing/app-accueil.png
```

## Règles à respecter

### Données
- **Un composant n'importe jamais `src/mocks` ni `supabase.ts`.** Il passe par `features/*/data.ts`. Chaque fonction choisit sa source avec `isSupabaseConfigured()` et renvoie les mêmes types dans les deux modes.
- **1 000 lignes au plus par requête** (réglage `max_rows` du projet) : au-delà, l'API coupe la réponse **sans erreur**. Toute lecture qui peut dépasser ce nombre passe par `selectAllRows` (par pages, avec un ordre total qui finit par une colonne unique) ou `selectRowsByIds` (identifiants par paquets de 200) de `lib/supabase/rows.ts` : catalogue des chapitres (2 078), évaluations (plus de 2 000), questions par chapitre, sujets officiels, leçons rédigées (admin). Jusqu'au 24/10, le site en ligne ne recevait que 1 000 chapitres et 1 000 évaluations.
- **Pages prérendues** : chacune emporte le catalogue entier (données de cache, environ 0,6 Mo compressé) et le build renvoie toutes ces pages d'un seul bloc. Le 23/10, environ 726 pages ont dépassé la taille maximale d'une chaîne (« RangeError: Invalid string length » sur Vercel). On ne prérend donc que la 1re matière de chaque classe, son 1er chapitre, ses leçons et ses exercices (environ 190 pages, 0,5 Mo chacune) : ne pas en prérendre davantage sans mesurer.
- **Contenu public** (catalogue, contrôles publiés, offres, dates d'examen, fiches répétiteurs) : client `createSupabasePublicClient()` dans une fonction `"use cache"`, avec `cacheLife("hours")` et un `cacheTag` (`catalog`, `exam-sessions`, `plans`, `tutors`) que l'admin invalide par `updateTag`.
- **Données d'un utilisateur** : `createSupabaseServerClient()`, qui appelle `connection()` (jamais de prérendu). Le droit d'accès est vérifié par la RLS ou par la RPC, jamais seulement dans le code.
- L'identité vient de `getAuthIdentity()` / `requireIdentity()` (`features/account/session.ts`) : id, rôle (claim `user_role`), niveau `aal`, email ou téléphone.
- Identifiants publics : un contrôle s'adresse par son `slug` (`/eleve/evaluations/thales-quiz`) ; les chapitres, leçons, tentatives et répétiteurs par leur uuid.
- Les corrigés (`answer-keys-3e.ts`, `ci/exercises.ts`, `cp/exercises.ts`, `3e/exercises.ts`, regroupés dans `mocks/answer-keys.ts`) sont `server-only` et ne doivent jamais atteindre le client. Les évaluations de démo se lisent par `mocks/assessments.ts` (`CATALOG_ASSESSMENTS`, `CATALOG_QUESTIONS`, `QUESTION_CHAPTERS`).
- **Offre gratuite** : `lib/free-tier.ts` (`DEFAULT_FREE_CHAPTERS = 3`) et `private.sync_free_tier` appliquent la même règle ; dans la démo, les mocks la suivent déjà.
- Une donnée propre à l'utilisateur passe par une fonction de `data.ts` qui appelle `await connection()`. Elle s'affiche sous `<Suspense>` avec un squelette.
- `supabase/seed.sql` est **généré** : ne pas le modifier à la main, lancer `pnpm db:seed` après tout changement de mocks.
- Les tests ne codent pas en dur des volumes de contenu : ils les dérivent des mocks (ex. `CATALOG_CHAPTERS.length`).
- **Plusieurs classes** : une matière (`Subject`) porte sa classe (`levelCode`) et un slug de programme (`programSlug`). Toujours apparier chapitres, évaluations et matières par code **et** classe, et filtrer par la classe de l'élève (`getSubjects(levelCode)`).
- Les coefficients ne sont pas affichés : aucun n'est officiel pour l'instant (ils pondèrent seulement la moyenne).

### Next.js 16
Lire `node_modules/next/dist/docs/` avant d'utiliser une API (voir `AGENTS.md`). Avec `cacheComponents` :
- pas de `Date.now()` ni de `new Date()` pendant le rendu avant `connection()` ;
- lire `params` et `searchParams` dans un composant enfant placé sous `<Suspense>` ;
- `usePathname` seulement via `NavLink`, déjà sous Suspense ;
- `generateStaticParams` doit renvoyer au moins une valeur ; les pages de cours et d'exercices ne prérendent que le 1er chapitre de la 1re matière de chaque classe (`getPrerenderedChapterParams`, `getPrerenderedLessonParams`, `getPrerenderedAssessmentIds`) : les autres sont rendues à la première visite puis gardées en cache (ISR avec Cache Components) ;
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
  - Exceptions : l'illustration de `student-avatar.tsx`, `manifest.ts`, `themeColor`. Le logo est une image (`public/brand/`, `src/app/icon.png`).
  - La palette Tailwind par défaut n'existe pas.
- Le HTML des leçons (`.rich-text`, `globals.css`) style les titres, listes numérotées, citations et tableaux ; un tableau trop large défile seul, jamais la page.
- Les classes construites dynamiquement sont écrites **en entier** dans des tables de correspondance (`lib/subjects.ts`, `lib/levels.ts`), pour que Tailwind les détecte.
- **Formats** toujours via `lib/format.ts` : FCFA avec espace insécable, dates jj/mm/aaaa en heure de Dakar, notes « 13,5/20 ».
- Montants en **entiers** FCFA ; dates en fuseau `Africa/Dakar`.
- **Accessibilité** :
  - un état s'affiche toujours avec une icône et un libellé, jamais par la seule couleur ;
  - contraste AA, focus visible, cibles tactiles d'au moins 44 px.
- **Mobile** : aucun défilement horizontal à 360 px.

### Sécurité et données personnelles
- RLS sur toutes les tables.
- Dans une règle RLS, écrire `(select auth.uid())` et non `auth.uid()` : la valeur est calculée une fois par requête (migration `20261012000004_performance.sql`). Indexer chaque nouvelle clé étrangère.
- Temps réel : avant `.subscribe()`, transmettre le jeton avec `supabase.realtime.setAuth(session.access_token)` ; sinon le serveur applique la RLS d'un visiteur anonyme. Donner un nom de canal unique à chaque abonnement.
- `role`, `status`, `consent_status` et `rating_*` ne sont jamais modifiables par un client.
- Les fonctions `SECURITY DEFINER` utilisent `set search_path = ''`.
- Le HTML d'une leçon saisi par l'admin passe par `sanitizeLessonHtml` (`lib/sanitize.ts`, liste blanche). Un paramètre `next` passe par `safeInternalPath` (`lib/safe-path.ts`).
- Un texte de l'interface n'annonce jamais une fonction absente : marquer « Bientôt » ce qui n'est pas encore fait.
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
- **Tableau de bord** inspiré de la maquette Talab Edu. **Landing** inspirée de Kindering, éclaircie le 22/10/2026 : en-tête en pilule, fonds clairs, photo encadrée (plus de bord déchiré ni d’autocollant).
- **URLs en français** sans préfixe de langue (`/eleve/cours`), pour des URLs stables en cache hors ligne.
- **Offres prépayées**, car le mobile money ne gère pas le prélèvement : 2 000 FCFA par mois, 5 000 par trimestre, 15 000 par an, offre Famille. Le Pass BFEM est retiré (22/10/2026) : ne pas le réintroduire. Les cours gratuits restent toujours téléchargeables hors ligne.
- **Paiement via PayDunya**, pour une seule intégration. Wave en direct pourra s'ajouter plus tard derrière `PaymentProvider`. Stripe n'ouvre pas de compte à une entreprise sénégalaise et n'a pas le mobile money (`docs/paiements.md`).
- **Parrainage** : récompense en jours Premium, jamais d'argent ; jamais à la saisie du code, seulement après un paiement confirmé.
- **Hébergement** : Supabase en Irlande pour l'instant (projet créé ainsi), Vercel prévu à Paris. On pourra recréer le projet à Paris avant le lancement.

## Programme scolaire

- Le référentiel des niveaux, cycles et séries est dans `src/lib/levels.ts`. Séries du lycée : L1, L2, LA, S1 à S5, G, T1, T2 ; 2nde L ou S.
- Les sources et listes de chapitres sont dans `docs/programme/releve-ci-3e.md` :
  - PROMET, site officiel du ministère ;
  - Sunudaara, site privé : ne reprendre que les titres, jamais ses leçons.
- **Catalogue de 3e** : maths, physique-chimie, SVT et histoire-géographie suivent ce relevé. Français, anglais, éducation civique et les coefficients restent indicatifs.
- **Catalogue du CI** : français, mathématiques et ESVS d'après le guide officiel de l'étape 1 du CEB et le guide « Langue et communication » (`docs/programme/programme-ci.md`). 41 chapitres, 98 leçons rédigées par DIANGAL (`src/mocks/ci/`), une série d'exercices par chapitre, à faire valider.
- **Catalogue du CP** : mêmes guides (paliers du CP), `docs/programme/programme-cp.md`. 45 chapitres, 98 leçons et 45 séries d’exercices rédigées par DIANGAL (`src/mocks/cp/`, assemblées par `curriculum-cp.ts`), à faire valider. Les séries d'exercices s'écrivent au format compact de `mocks/exercise-series.ts`.
- **Leçons de 3e** : 78 chapitres, 203 leçons et une série d'exercices par chapitre, rédigées par DIANGAL (`src/mocks/3e/`, un fichier par matière, briques HTML de `3e/blocks.ts`, assemblées par `curriculum-3e.ts` ; Thalès dans `lesson-content.ts`), à faire valider par des enseignants. Les chapitres de français, d'anglais et d'éducation civique restent indicatifs.
- **Classes ajoutées le 17/10/2026** (leçons et exercices rédigés par DIANGAL, à faire valider) :
  - CE1 et CE2 : guide officiel de l'étape 2 et cahiers PAAME (`programme-ce1-ce2.md`) ; CM1 et CM2 : cahiers PAAME, guide du CFEE, PROMET (`programme-cm1.md`, `programme-cm2.md`) ;
  - 6e, 5e, 4e : maths officielles (APAMS), histoire-géographie officielle (Office du Bac), SVT et PC d'après le relevé (`programme-college.md`) ;
  - 2nde et 1re : maths officielles par série (APAMS, séries S, L, G et T), histoire-géographie officielle, PC et SVT d'après les titres de Sunudaara (`programme-lycee.md`) ; Terminale : programmes de l'Office du Bac (`programme-tle.md`) ;
  - matières propres aux séries LA, S3, S4, S5, G, T1 et T2 (arabe, économie, gestion, construction mécanique, fabrication, électrotechnique, sciences agricoles, agroalimentaire) : chapitres indicatifs d'après la liste des épreuves du Bac, leçons dans `src/mocks/lycee/` (une fois pour la 1re et la Terminale) ;
  - français et anglais du collège et du lycée : chapitres indicatifs ; leurs sources sont notées dans chaque chapitre (`chapterSources` de `mocks/curriculum.ts`).
- **Lycée** : une matière (programme) par série, `buildCatalog(classe, programmes, série)` ; chapitres `<classe>-<série>-<matière>-<slug>`. Les exercices des classes à séries sont rangés par titre de chapitre (`2nde/exercises.ts`, `1re/exercises.ts`, `tle/exercises.ts`) : un chapitre commun à plusieurs séries reçoit la même série.
- Tout contenu pédagogique doit être **original** et **validé par des enseignants**.
- **Manque encore** :
  - programmes officiels (MEN, INEADE) : français, anglais, SVT et PC du collège et du lycée, guide de l'étape 3 (CM1-CM2) ;
  - coefficients du BFEM et du CFEE ;
  - statut de l'éducation civique ;
  - programmes des matières propres aux séries LA, S3, S4, S5, G, T1 et T2 ; séries rares (L1a, L1b, F6, S1A, S2A, STEG).

## Pour un futur modèle IA

1. Lire ce fichier, `AGENTS.md`, puis le `data.ts` de la feature concernée avant de coder.
2. Reproduire le style du code voisin : commentaires courts en français, noms en anglais, Server Components par défaut, `"use client"` seulement pour l'interactif.
3. Après chaque modification, vérifier `pnpm lint`, `pnpm typecheck` et `pnpm test`. Lancer aussi `pnpm db:seed` si les mocks changent.
4. Ne rien inventer sur le programme officiel. Signaler ce qui n'est pas sourcé.
5. Le porteur du projet écrit en français et n'est pas développeur : lui répondre en français simple, et ne pousser sur GitHub que s'il le demande.
6. Toute nouvelle fonctionnalité se branche dans les deux modes : mock dans `data.ts`, Supabase dans `supabase.ts`. Une nouvelle règle d'accès va en base (migration + test dans `tests/db`).
7. Prochaines étapes :
   - compte WhatsApp Business (Meta), modèle `diangal_code`, puis déploiement de `send-sms` ;
   - salle de visio LiveKit pour les cours en ligne ; réseaux sociaux à ouvrir dans Supabase ;
   - SMTP personnalisé, puis modèles d'email en français avec le code ;
   - fournisseur SMS et déploiement des Edge Functions `send-sms` et `process-sms-outbox` ;
   - clés PayDunya sandbox, puis test d'un paiement complet ;
   - E2E Playwright en CI ;
   - ouvrir le parrainage (scénario prudent) quand PayDunya fonctionne ;
   - export des données (droit d'accès CDP), Turnstile ;
   - publier une nouvelle classe : générer des lots d'ajouts rejouables (une classe, ou une classe et une série), les essayer sur PGlite dans l'état de la production, puis les exécuter un par un via l'API de gestion en contrôlant l'empreinte des classes déjà en ligne ;
   - validation des leçons et exercices de toutes les classes par des enseignants ;
   - sujets blancs du CFEE et du Bac ; annales officielles vérifiées.
