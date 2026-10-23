# Parrainage

État au 22/10/2026 : construit et testé, **fermé par défaut**. L’admin l’ouvre sur `/admin/paiements`, carte « Parrainage ».

## Fonctionnement

1. **Code et lien** : chaque parent, et chaque élève dont le compte est validé par son parent s’il est mineur, reçoit un code de 10 caractères, par exemple `K7Q2M-W9PAX`. Ce code est difficile à deviner (environ 50 bits).
   - Page `/parrainage` : lien `…/inscription?parrain=CODE`, boutons « Copier » et « Partager sur WhatsApp » (lien `wa.me`, sans API ni suivi).
2. **Inscription du filleul** : le code est déjà rempli à l’étape « Conditions » de l’inscription. Le lien parrain-filleul est créé « en attente » (`claim_referral`).
3. **Aucune récompense à cette étape.** Elle vient seulement quand un **vrai paiement** du filleul est confirmé par le webhook (`apply_payment_event` → `private.qualify_referral`). Le filleul peut être le payeur, ou l’élève pour qui le paiement est fait.
4. **Récompense** : des **jours Premium**, jamais d’argent, car beaucoup d’utilisateurs sont mineurs.
   - Le parrain les utilise pour lui-même (élève) ou les offre à un enfant relié (parent).
   - Selon le scénario, le filleul reçoit aussi des jours de bienvenue.
5. **Période de garde de 14 jours** : les jours ne sont utilisables qu’après ce délai. Un remboursement pendant la garde les retire.

## Anti-fraude (contrôlé en base, testé dans `tests/db/referrals.test.ts`)

- Un code doit être saisi dans les **7 jours** qui suivent l’inscription.
- Un seul parrain par filleul ; on ne peut pas utiliser son propre code.
- Un code créé après l’inscription du filleul est refusé : on ne peut pas « parrainer » un compte déjà existant.
- **Même famille** (parent, enfant, co-parent, frère ou sœur payé par le même parent) : parrainage annulé.
- **Paiement fait par le parrain** à la place du filleul : parrainage annulé.
- **Montant minimum** du paiement qui déclenche la récompense, et **délai de 90 jours** pour payer (sinon le parrainage expire).
- **Plafond mensuel** de récompenses par parrain.
- Compte supprimé : son code est fermé, ses parrainages en attente sont annulés, ses jours en garde retirés.
- **Historique conservé** : statuts (en attente, récompensé, annulé avec sa raison, expiré) et journal d’audit. Le parrain ne voit de ses filleuls que l’initiale du prénom et le rôle (élève ou parent).

## Trois scénarios de coût

Pour chiffrer, un jour de Premium vaut environ **67 FCFA**, au prix du mensuel (2 000 FCFA pour 30 jours). C’est une valeur faciale : un jour offert ne coûte réellement que si la personne aurait payé ce jour-là. Le coût réel est donc plus bas.

| Scénario | Parrain | Filleul | Paiement minimum | Plafond par parrain | Valeur offerte par filleul payant |
|---|---|---|---|---|---|
| **Prudent** | 15 jours | 0 jour | 5 000 FCFA (trimestriel, annuel, Famille) | 5 par mois | ≈ 1 005 FCFA |
| **Intermédiaire** | 30 jours | 15 jours | 2 000 FCFA (tout abonnement) | 10 par mois | ≈ 3 015 FCFA |
| **Généreux** | 60 jours | 30 jours | 2 000 FCFA | 20 par mois | ≈ 6 030 FCFA |

Part du premier paiement que représentent les jours offerts :

| Premier paiement du filleul | Prudent | Intermédiaire | Généreux |
|---|---|---|---|
| Mensuel 2 000 FCFA | non éligible | ≈ 150 % | ≈ 300 % |
| Trimestriel 5 000 FCFA | ≈ 20 % | ≈ 60 % | ≈ 120 % |
| Annuel 15 000 FCFA | ≈ 7 % | ≈ 20 % | ≈ 40 % |

Exemple chiffré, avec une **hypothèse** à remplacer par les vrais chiffres : 200 filleuls payants par mois, dont la moitié prend une formule de 5 000 FCFA ou plus.

| | Prudent | Intermédiaire | Généreux |
|---|---|---|---|
| Récompenses par mois | 100 | 200 | 200 |
| Valeur faciale offerte par mois | ≈ 100 000 FCFA | ≈ 600 000 FCFA | ≈ 1 200 000 FCFA |

**Recommandation** :
1. Ouvrir en **prudent** dès que PayDunya fonctionne, puis mesurer pendant 2 à 3 mois combien de filleuls paient, et combien restent abonnés.
2. Passer en **intermédiaire** si le parrainage fait venir des familles qui restent.
3. Garder le **généreux** pour une campagne courte : la rentrée, ou un mois avant le BFEM ou le Bac.

## Réglages

- **Scénario** : stocké dans `platform_settings` (clé `referral`) et changé par l’admin en double authentification (`admin_set_referral_settings`).
- **Valeurs fines** : les jours, la garde, le minimum, le plafond, la fenêtre de saisie et le délai de paiement sont des clés du même JSON, modifiables par SQL si besoin.
- **Double définition** : les valeurs de chaque scénario existent en base (`private.referral_preset`) et dans `src/features/referrals/presets.ts`. Il faut les garder alignées.
