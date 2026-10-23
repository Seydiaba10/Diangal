# Connexion par téléphone : WhatsApp ou SMS

État au 22/10/2026. **Le code est prêt, aucun envoi réel n’est encore branché.** Tant que les deux interrupteurs ci-dessous restent à `false`, l’onglet « Téléphone » n’apparaît pas en production. Aucun envoi n’est simulé : en mode démo seulement, le code affiché est `123456`.

## Parcours

1. Sur `/connexion`, l’utilisateur ouvre l’onglet **Téléphone**.
2. Il choisit l’indicatif (+221 par défaut) et tape son numéro.
3. Il choisit **WhatsApp** ou **SMS**. Seuls les canaux réellement branchés sont proposés.
4. Le serveur normalise le numéro au format E.164 (`src/lib/phone.ts`).
   - Il refuse un pays non ouvert.
   - Il note le canal choisi (`private.otp_channels`), puis demande le code à Supabase Auth (`signInWithOtp`).
5. Supabase appelle le **Send SMS Hook**, c’est-à-dire la fonction Edge `send-sms`. Cette fonction vérifie la signature du hook, puis envoie le code :
   - par **WhatsApp** (API Cloud de Meta, modèle d’authentification `diangal_code`) ;
   - ou par **SMS** (API Orange Sénégal, puis Twilio en secours ou pour l’étranger).

   Si WhatsApp échoue, le code repart par SMS, à condition que le SMS soit branché.
6. L’utilisateur saisit le code. `verifyOtp` le vérifie côté serveur et ouvre la session.

Les mêmes canaux servent à l’inscription et à l’ajout d’un numéro depuis « Mon compte » (`/compte`, `updateUser({ phone })` puis `verifyOtp` de type `phone_change`).

## Sécurité déjà en place

- **Codes** :
  - 6 chiffres, à usage unique, valables 10 minutes (réglage Supabase Auth) ;
  - jamais écrits dans les journaux (la fonction `send-sms` ne journalise que les erreurs, sans le code).
- **Pas d’énumération de comptes** :
  - un identifiant inconnu reçoit la même réponse qu’un compte existant (« Si un compte DIANGAL utilise … ») ;
  - un numéro déjà pris ne peut pas être ajouté à un autre compte, et le message ne dit pas pourquoi.
- **Limites** :
  - Supabase Auth limite les envois (`[auth.rate_limit]` de `supabase/config.toml` : 30 SMS par heure, vérifications par IP) et impose un délai entre deux codes pour un même numéro ;
  - les validations parentales par SMS sont limitées à 3 par 24 h.
- **Pays ouverts** : Sénégal seulement par défaut. On en ouvre d’autres avec `DIANGAL_PHONE_COUNTRIES` (Next) et `ALLOWED_DIAL_CODES` (fonctions Edge), sur la même liste. C’est le garde-fou contre le « pompage de SMS », c’est-à-dire des envois frauduleux vers des numéros surtaxés.
- **Secrets** : uniquement dans les secrets des fonctions Edge et dans les variables Vercel, jamais dans le navigateur.
- **À ajouter avant l’ouverture au public** : Cloudflare Turnstile, un CAPTCHA invisible déjà prévu dans `config.toml` (`[auth.captcha]`). Il faudra ajouter le widget sur les formulaires de code.

## Comparatif des fournisseurs pour le Sénégal

| | WhatsApp (API Cloud de Meta) | SMS Orange Sénégal | Twilio (SMS ou Verify) |
|---|---|---|---|
| Branché dans le code | oui (`_shared/whatsapp.ts`) | oui (`_shared/sms.ts`) | oui, en secours |
| Coût | facturé **par message d’authentification livré**, au tarif de la zone « Reste de l’Afrique » ([grille officielle](https://whatsappbusiness.com/fr/products/platform-pricing/)) | forfaits de 25 à 60 000 SMS : **4 à 20 FCFA par SMS** ([tarifs Orange](https://developer.orange.com/apis/sms-sn/pricing)) | **0,5506 $ par SMS** vers le Sénégal, environ 330 FCFA ([tarifs Twilio](https://www.twilio.com/sms/pricing/sn)) |
| Reçu sans internet | non | oui | oui |
| Démarches | compte Meta Business vérifié, numéro WhatsApp Business, modèle « authentification » en français approuvé par Meta | contrat API Orange Developer (NINEA, RC), nom d’expéditeur « DIANGAL » | compte Twilio ; Verify pour une gestion clé en main |

**Recommandation** :
- **WhatsApp en premier**, car le public l’utilise déjà ;
- **SMS Orange** pour ceux qui n’ont pas internet au moment de la connexion ;
- **Twilio en secours seulement** : il coûte environ 15 à 80 fois plus cher par SMS au Sénégal.

Supabase sait aussi envoyer des codes WhatsApp par **Twilio Verify**, sans fonction Edge. C’est plus simple à brancher, mais chaque vérification est facturée par Twilio en plus du message.

## Mise en service (actions du porteur du projet)

1. **WhatsApp** :
   1. créer le compte Meta Business, le vérifier, puis ajouter un numéro WhatsApp Business ;
   2. créer le modèle d’authentification `diangal_code`, en langue `fr`, avec le bouton « Copier le code » ;
   3. récupérer un jeton permanent et l’identifiant du numéro.
2. **SMS Orange** : souscrire l’API SMS Sénégal sur developer.orange.com, acheter un forfait, puis demander le nom d’expéditeur.
3. **Secrets des fonctions Edge** (`supabase secrets set …`, jamais dans le dépôt) :
   - `SEND_SMS_HOOK_SECRET` ;
   - `WHATSAPP_TOKEN`, `WHATSAPP_PHONE_NUMBER_ID` ;
   - `ORANGE_SMS_CLIENT_ID`, `ORANGE_SMS_CLIENT_SECRET`, `ORANGE_SMS_SENDER_PHONE` ;
   - éventuellement `TWILIO_*` et `ALLOWED_DIAL_CODES`.
4. **Déploiement** : déployer `send-sms` et `process-sms-outbox`, puis activer le Send SMS Hook et le fournisseur « Phone » dans Supabase Auth.
5. **Essai réel** de bout en bout avec un vrai téléphone, sur chaque canal.
6. **Ouverture** : seulement après cet essai réussi, mettre `DIANGAL_WHATSAPP_ENABLED=true` et/ou `DIANGAL_SMS_ENABLED=true` dans Vercel.
