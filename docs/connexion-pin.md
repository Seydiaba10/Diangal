# Connexion par numéro et code PIN

Refonte de la connexion validée par le porteur du projet le 06/11/2026 (dossier « Refonte de la connexion
DIANGAL », décisions 1 à 11). Codée sur la branche `refonte-connexion-pin`, derrière l'interrupteur
`DIANGAL_PIN_LOGIN`. Le code et la migration `20261106000001` sont **en ligne depuis le 06/11/2026, mais
éteints** : l'interrupteur n'est pas défini sur Vercel, l'ancienne connexion reste la seule active, et les pages
et actions de la nouvelle connexion répondent « introuvable » ou sont refusées. Rien ne s'active tant que les
étapes « Mise en ligne » ci-dessous ne sont pas faites.

## Ce qui change

| Qui | Avant | Avec `DIANGAL_PIN_LOGIN=true` |
|---|---|---|
| Élève avec téléphone, parent | code reçu à chaque connexion | un seul code à l'inscription, puis **numéro + code PIN** (6 chiffres), sans message |
| Enfant sans téléphone | code famille, prénom, PIN de 4 à 6 chiffres | sur un **appareil de la famille** : prénom puis code PIN (6 chiffres) ; ailleurs : code famille |
| Répétiteur | code reçu par email | **e-mail + mot de passe** (10 caractères, lettres et chiffres), vérification et récupération par code email |
| Admin | code email + TOTP | même compte : **e-mail + mot de passe** sur `/connexion/admin` (non liée), puis le TOTP actuel |

Les comptes créés avec un email gardent l'ancienne connexion par code (« Recevoir un code par email »)
pendant la transition.

## Le code PIN n'est jamais stocké

- `lib/pin.ts` : mot de passe Supabase = `HMAC-SHA-256(DIANGAL_PIN_PEPPER, "diangal-pin:v1:<sujet>:<PIN>")`
  en base64url + `:Pin1`. Sujet = numéro E.164 (élève, parent) ou `child:<uuid>` (enfant).
- Supabase Auth hache ce mot de passe (bcrypt) et le vérifie (`signInWithPassword`). Sans la clé du serveur,
  essayer les 1 000 000 de codes directement auprès de Supabase est impossible.
- `private.pin_credentials` ne garde que la date et la version de la clé.
- Changer `DIANGAL_PIN_PEPPER` rend tous les codes PIN invalides : chacun refait « Code PIN oublié ».

## Protection

- **Blocage progressif** (`private.auth_guard`, fonctions `auth_guard_*`) : par compte, 5 erreurs = 15 min,
  10 = 1 h, 15 = récupération obligatoire ; par adresse IP, 30 erreurs en 15 min = 15 min. Réponse ralentie
  dès la 3e erreur. Même message que le numéro existe ou non.
- **Journal** (`private.auth_events`, lu par `admin_auth_events`, admin en double authentification) : identifiant
  masqué, IP tronquée, type d'appareil, 90 jours (pg_cron).
- **Nouvelle vérification** avant une opération sensible : `verifyCurrentPin` compare le mot de passe dérivé
  à celui de Supabase (`verify_user_password`, sans nouvelle session), puis `mark_reauth` pour la session
  (5 min). La base l'exige (`private.recent_reauth`) pour changer le PIN d'un enfant et ajouter un appareil.
- **Règles du PIN** (`lib/pin-rules.ts`) : refus des suites, répétitions, motifs, codes connus, fin du numéro.

## Appareil et session (`features/account/device-cookies.ts`, `proxy.ts`)

- `diangal_appareil` : `partage` (case « appareil partagé ») ou `enfant`. Les cookies de session Supabase
  deviennent alors des cookies sans durée.
- `diangal_vu` : dernière activité. Partagé : déconnexion après 15 min ; enfant : 30 min ; son propre
  téléphone : code PIN redemandé après 30 jours (`/connexion/session`), sans message.
- `diangal_famille` : jeton d'un appareil de la famille (empreinte SHA-256 en base, `private.family_devices`),
  visible et retirable sur la page Famille. Il reste après une déconnexion.

## Enfants sans téléphone (option E1 validée)

Chaque enfant garde son identité Supabase gérée par le parent (adresse technique `@enfant.diangal.invalid`,
jamais utilisée pour écrire). Son code PIN devient son mot de passe dérivé. La RLS ne change pas. Le parent
crée le profil et change le code avec son propre code PIN (`features/family/pin-actions.ts`) ; l'enfant est
alors déconnecté partout (`revoke_user_sessions`) et le blocage levé. `register_managed_child_v2` ne stocke
plus le PIN (`child_logins.pin_hash` à null).

## Fichiers

- Base : `supabase/migrations/20261106000001_pin_login.sql` (ne fait qu'ajouter) ; tests `tests/db/pin-login.test.ts`.
- Serveur : `lib/pin.ts`, `lib/pin-rules.ts`, `lib/password-rules.ts`, `lib/request-meta.ts`,
  `lib/supabase/auth-gateway.ts`, `features/account/pin-auth.ts`, `pin-actions.ts`, `password-actions.ts`,
  `features/family/pin-actions.ts`.
- Pages : `/connexion` (PIN), `/connexion/pin-oublie`, `/connexion/code-pin`, `/connexion/session`,
  `/connexion/repetiteur` (mot de passe), `/connexion/mot-de-passe`, `/connexion/admin`, `/connexion/enfant`,
  `/parent/famille`, `/inscription` (photos, mot de passe des répétiteurs).
- Présentation (décision 11) : colonne verte et photos des profils sur ordinateur (`(auth)/layout.tsx`),
  mots surlignés (`Highlight`), code en 6 cases (`PinBoxes`). Photos provisoires dans `public/connexion/`
  (générées dans Canva, 199 × 149 px) : **à remplacer par de vraies photos, avec l'accord écrit des
  personnes, avant la mise en ligne**.
- Email : modèle « mot de passe oublié » `supabase/templates/code-mot-de-passe.html` (déclaré dans `config.toml`).

## Démo

`DIANGAL_DATA_SOURCE=demo DIANGAL_PIN_LOGIN=true` : n'importe quel numéro et le code PIN `246813` (parents,
élèves, enfants, nouvelle vérification) ; répétiteur et admin : mot de passe `Diangal2026` ; codes reçus : `123456`.

## Mise en ligne (à faire seulement sur demande du porteur du projet)

1. Comptes et fournisseurs : nom de domaine + Resend (emails des répétiteurs), WhatsApp Business (modèle
   `diangal_code`), API SMS Orange ; passage à Supabase Pro et Vercel Pro.
2. Sauvegarde JSON de la configuration Auth en ligne, puis réglages : fournisseur téléphone activé,
   crochet « Send SMS », code valable 600 s, 60 s entre deux envois, limite de SMS relevée,
   `security_sb_forwarded_for_enabled`, mots de passe de 10 caractères (lettres et chiffres), protection
   des mots de passe divulgués (Pro), Turnstile.
3. `DIANGAL_PIN_PEPPER` (Vercel, Production, 48 caractères aléatoires), migration `20261106000001`, types
   régénérés (les fonctions sont écrites à la main dans `database.ts` en attendant).
4. Vérifier sur la base en ligne que `revoke_user_sessions` peut effacer `auth.sessions` et que
   `verify_user_password` lit `auth.users` (droits du rôle propriétaire).
5. Déploiement d'aperçu, essais avec des comptes temporaires (effacés ensuite), puis `DIANGAL_PIN_LOGIN=true`.
6. Comptes existants : l'admin choisit son mot de passe (« Mot de passe oublié » sur `/connexion/admin`) et
   ajoute un facteur TOTP de secours ; les répétiteurs font « Mot de passe oublié » ; les élèves par email
   gardent la connexion par code. Rien n'est supprimé.

Retour arrière : `DIANGAL_PIN_LOGIN=false` (ancienne connexion immédiatement), réglages remis depuis la
sauvegarde JSON. Les tables ajoutées n'ont alors aucun effet.

## Reste à faire

- « Mon compte » : changer son code PIN et son numéro avec le code PIN actuel (aujourd'hui : « Code PIN oublié »).
- Écran du journal des connexions dans l'administration (la fonction `admin_auth_events` existe).
- Téléphone facultatif des répétiteurs (jamais vérifié) : demande une colonne privée.
- Facteur TOTP de secours de l'admin : écran d'ajout.
