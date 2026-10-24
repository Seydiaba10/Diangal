# Emails de connexion : Resend

État au 24/10/2026. **Tout est prêt côté code : il manque un nom de domaine.** Aujourd’hui, Supabase envoie les emails lui-même. Cet envoi intégré ne part qu’aux membres de l’équipe du projet, 2 emails par heure, en anglais et avec un lien. Les élèves et les parents qui s’inscrivent par email ne reçoivent donc rien.

Avec Resend, les emails partent vers toutes les adresses. Ils sont en français et contiennent le code à 6 chiffres, avec le lien en secours.

## Ce qui est prêt

- **Deux modèles d’email** dans `supabase/templates/` :
  - `code-connexion.html` (connexion) ;
  - `code-inscription.html` (inscription).

  Ils sont déclarés dans `supabase/config.toml`. Le code apparaît aussi dans l’objet du message, donc dans la notification du téléphone. Le texte ne tutoie ni ne vouvoie, car le même email part aux élèves, aux parents et aux répétiteurs.
- **Le script `scripts/configure-email.mjs`** :
  - sans option, il affiche l’état actuel, sans rien modifier ;
  - `--apply` branche Resend sur Supabase Auth :
    - serveur `smtp.resend.com`, port 465, utilisateur `resend`, mot de passe = la clé Resend ;
    - expéditeur « DIANGAL » et les deux modèles ;
    - 60 emails par heure ;
  - `--test <email>` envoie un vrai code à un compte existant.

  Il lit les clés dans `.env.local` et n’en affiche jamais aucune.
- **Le site** sait déjà demander un code (`DIANGAL_EMAIL_CODE=true`) ou un clic sur le lien (`false`). Les modèles contiennent les deux, donc les emails restent utilisables pendant le changement.

## À faire par le porteur du projet

1. **Acheter un nom de domaine.** Deux choix :
   - **`diangal.sn`** (recommandé, c’est l’adresse prévue pour le site) :
     - il s’achète auprès de NIC Sénégal ou d’un registraire accrédité ;
     - le prix est plafonné à 18 000 FCFA TTC par an depuis 2021 ;
     - il faut parfois un NINEA ou un RCCM ;
     - les démarches prennent quelques jours ;
   - **`diangal.app` ou `diangal.net`**, libres le 24/10/2026 : environ 10 à 20 dollars par an, achat immédiat en ligne (Vercel, Cloudflare, OVH…). `diangal.com` est déjà pris.
2. **Ajouter le domaine dans Resend** :
   - menu *Domains*, puis *Add domain* : taper le domaine, région **Ireland (eu-west-1)** ;
   - Resend affiche 3 ou 4 réglages DNS (lignes TXT et MX) à recopier chez le vendeur du domaine ;
   - cliquer sur *Verify*. La vérification prend de quelques minutes à 48 heures.
3. **Créer la clé** :
   - menu *API Keys*, puis *Create API Key* ;
   - choisir la permission **Sending access**, limitée au domaine ;
   - la clé ne s’affiche qu’une fois.
4. **La ranger dans `.env.local`**, sur ce poste, avec l’adresse d’envoi :

   ```text
   RESEND_API_KEY=re_…
   DIANGAL_EMAIL_FROM=codes@diangal.sn
   ```

   **Ne jamais coller la clé dans le chat, sur GitHub ni dans un message.**
5. **Prévenir Claude**, qui fait la suite.

## Mise en service (Claude)

1. `node scripts/configure-email.mjs --apply`, puis `--test` vers le compte élève du porteur du projet : l’email doit arriver en français avec le code.
2. Mettre `DIANGAL_EMAIL_CODE=true` dans `.env.local`, puis dans les variables de Production de Vercel. Redéployer.
3. Tester une vraie inscription et une connexion avec un compte temporaire, puis l’effacer.
4. Mettre à jour `CLAUDE.md`.

## Limites et coûts

- **Offre gratuite de Resend** : 3 000 emails par mois, 100 par jour, d’après les relevés de 2026 ; à confirmer sur resend.com. Elle suffit pour les essais.
- **Au lancement** : l’offre payante, environ 20 dollars par mois pour 50 000 emails, sans plafond par jour. Relever alors la limite horaire (`EMAILS_PER_HOUR` dans le script) et relancer `--apply`.
- Supabase limite aussi chaque adresse à un email par minute (`smtp_max_frequency`).

## Modifier un email

1. Modifier le fichier HTML dans `supabase/templates/`.
2. Garder `{{ .Token }}` (le code) et `{{ .ConfirmationURL }}` (le lien).
3. Relancer `node scripts/configure-email.mjs --apply`.
