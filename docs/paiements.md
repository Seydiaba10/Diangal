# Paiements : Stripe ou PayDunya ?

État au 22/10/2026.

## Ce qui a été vérifié pour Stripe

- **Pays** : Stripe n’ouvre pas de compte marchand à une entreprise établie au Sénégal. Sa liste officielle ([stripe.com/global](https://stripe.com/global)) ne cite en Afrique que la Côte d’Ivoire, le Ghana, le Kenya, le Nigeria et l’Afrique du Sud, toutes servies par Paystack (filiale de Stripe).
- **Monnaie** : Stripe sait encaisser en XOF (franc CFA, sans centimes), mais seulement pour un compte ouvert dans un pays pris en charge.
- **Moyens de paiement** : ni Wave, ni Orange Money, ni Free Money/Yas. Les familles sénégalaises paient surtout par mobile money.

**Conclusion : Stripe n’est pas compatible aujourd’hui avec DIANGAL tel qu’il est enregistré.** Rien n’a donc été branché pour Stripe : l’intégration aurait été inutilisable. Le reste du travail a continué.

## Solution en place : PayDunya

Une seule intégration couvre Wave, Orange Money, Free Money/Yas, Expresso et la carte bancaire, en FCFA. Ce qui est déjà en place :

- **Paiement** : une Server Action crée une intention de paiement en base (`create_payment_intent` : montant lu en base, formule active, enfant relié vérifié), puis renvoie vers la page de paiement PayDunya.
- **Webhook** `/api/webhooks/paydunya` :
  - il vérifie le hash signé avec la clé maître ;
  - il relit le statut chez PayDunya (on ne fait jamais confiance au seul message reçu) ;
  - il journalise l’événement une seule fois (`payment_events`, contrainte d’unicité), puis appelle `apply_payment_event`.
- **Idempotence** : un webhook rejoué ne crée rien de plus (`already_applied`). Depuis le 22/10, un paiement remboursé ne peut plus redevenir « payé ».
- **Remboursements** :
  - le remboursement se fait d’abord chez PayDunya ;
  - l’admin l’enregistre ensuite sur `/admin/paiements` (« Marquer comme remboursé », motif obligatoire) ;
  - effets : paiement « remboursé », abonnements du paiement annulés, récompenses de parrainage encore en garde retirées, ligne au journal d’audit (`admin_refund_payment`).
- **Historique** : « Mes paiements » côté parent, page admin des paiements avec leurs statuts (payé, en attente, échoué, remboursé).
- **Offres en vente** : mensuel 2 000 FCFA, trimestriel 5 000 FCFA, annuel 15 000 FCFA, Famille 5 000, 12 000 et 35 000 FCFA. **Le Pass BFEM est retiré** : sa formule est désactivée en base, et elle reste visible seulement dans l’historique des anciens paiements.

À faire par le porteur du projet : ouvrir un compte PayDunya, puis saisir les clés de test (sandbox) dans Vercel : `PAYDUNYA_MASTER_KEY`, `PAYDUNYA_PRIVATE_KEY`, `PAYDUNYA_PUBLIC_KEY`, `PAYDUNYA_TOKEN`, `PAYDUNYA_MODE=test`. Faire ensuite un paiement réel de test par canal (Wave, OM, Free, carte) avant le mode production.

## Options si Stripe reste souhaité

| Option | Pour | Contre |
|---|---|---|
| Garder PayDunya seul (**recommandé**) | mobile money, FCFA, entreprise sénégalaise, déjà intégré | frais d’environ 2,5 à 3 % sur le mobile money (à confirmer dans le contrat) |
| Ajouter Wave Business en direct, plus tard | frais plus bas, ouverture directe de l’application Wave | une intégration de plus, derrière l’interface `PaymentProvider` |
| Stripe via une société à l’étranger (Stripe Atlas aux États-Unis, ou société en France) | cartes internationales pour la diaspora, abonnements récurrents | création et gestion d’une société étrangère, fiscalité, pas de mobile money, reversement au Sénégal à organiser |
| Paystack (Côte d’Ivoire) | proche, groupe Stripe | entreprise ivoirienne nécessaire ; vérifier les moyens de paiement sénégalais |

**Décision à prendre par le porteur du projet** : rester sur PayDunya, ce qui est recommandé, ou lancer une démarche de société à l’étranger uniquement pour les cartes de la diaspora.
