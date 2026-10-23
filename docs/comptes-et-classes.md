# Comptes et navigation entre les classes

État au 22/10/2026 : branche `refonte-comptes-classes-paiements`, migrations `20261022000001` à `20261022000004`. **Rien n’est encore appliqué à la base en ligne.**

## Déconnexion et « Mon compte »

- **Se déconnecter** : en bas du menu latéral (ordinateur) pour les quatre rôles, et sur les pages Profil et « Mon compte » (téléphone).
  - La session est fermée et les données restent en base.
- **Mon compte** (`/compte`, tous les rôles) :
  - identifiants de connexion (email, numéro masqué) ;
  - ajout ou changement du numéro avec un code de vérification ;
  - déconnexion ;
  - suppression du compte.
- **Ajout d’un numéro** : il permet de se reconnecter par WhatsApp ou SMS même sans email.
  - Supabase refuse un numéro déjà utilisé par un autre compte : pas de doublon.
  - Cette fonction n’est proposée que quand l’envoi par WhatsApp ou par SMS est réellement branché.
- **Numéros internationaux** : la base accepte le format E.164 (`+…`).
  - Le Sénégal reste le défaut et le seul pays ouvert tant que `DIANGAL_PHONE_COUNTRIES` est vide.

## Suppression de compte (loi n° 2008-12, CDP)

Page `/compte/suppression`. Toute suppression demande trois choses :

1. **Une confirmation explicite** : taper `SUPPRIMER` et cocher « Je comprends ».
2. **Une identité vérifiée** :
   - soit une connexion de moins de 15 minutes, lue dans la claim `amr` du jeton et contrôlée **aussi en base** ;
   - soit un nouveau code envoyé à l’identifiant du compte (jamais à une adresse saisie).
3. **L’accord de la base** : la fonction `delete_account` revérifie le droit, la règle est en SQL.

| Qui | Ce qui se passe |
|---|---|
| Élève majeur, ou mineur sans parent relié | suppression directe |
| Élève mineur relié à un parent | **demande** envoyée aux parents (notification) ; le parent accepte (avec vérification d’identité) ou refuse |
| Parent | suppression directe, **sauf** s’il gère encore des profils d’enfants sans email (connexion par code PIN) : il doit d’abord les supprimer, aucun compte lié n’est supprimé à sa place |
| Parent, pour un enfant mineur relié | suppression directe depuis la page de l’enfant |
| Parent, pour un enfant majeur | refusé : le majeur décide seul |
| Répétiteur | suppression directe : retiré de l’annuaire, suivis terminés, cours planifiés annulés |
| Administrateur | refusé depuis cette page (pour ne jamais perdre l’accès admin) |

**Effacé** :
- nom, email, téléphone et connexion : l’identité Supabase Auth est supprimée, ses sessions fermées ;
- progression, tentatives, devoirs préparés, historique des classes ;
- messages (remplacés par « [message supprimé] ») et notifications ;
- liens familiaux, code famille et codes PIN ;
- profil de répétiteur, pièces justificatives (Storage) et disponibilités.

Un enfant dont le seul parent validé supprime son compte repasse en « mode limité » : une nouvelle validation parentale sera demandée.

**Gardé, pour des obligations légales** :
- paiements et abonnements, rattachés à un profil anonyme « Compte supprimé » ;
- preuves de consentement ;
- une ligne au journal d’audit.

Le jeton d’un compte supprimé ne porte plus de rôle : même si la suppression de la connexion échouait, le compte n’ouvre plus aucun espace.

**Reste à faire** : l’export « Mes données » (droit d’accès CDP) est marqué « Bientôt ».

## Navigation entre les classes

- **Où** : sur Cours, Exercices et « Préparer mon prochain devoir », la carte **« Mes classes »** affiche la classe actuelle (« Ma classe ») et les classes précédentes, chacune avec ses chapitres terminés.
- **Comment** : le choix vit dans l’adresse (`?classe=3E&serie=S`). **La classe de l’élève ne change pas.**
  - Un bandeau rappelle qu’on est en révision, avec un lien « Revenir à ma classe ».
  - Une classe supérieure demandée dans l’adresse ramène à la classe actuelle.
- **Série au lycée** : celle que l’élève avait dans cette classe (historique), sinon la plus proche de sa série actuelle. Par exemple, une Terminale S2 revoit la 1re S2 et la 2nde S. On peut en choisir une autre.
- **Progression** : elle reste attachée aux leçons, rien n’est recopié. Les leçons terminées en 3e restent terminées après le passage en 2nde.
- **Premium** : les règles habituelles s’appliquent (chapitres gratuits, sinon abonnement).
- **Base** : « Préparer mon prochain devoir » accepte une classe précédente (migration `20261022000003`) et refuse toujours une classe supérieure.

**Scénario vérifié** :
- en base : `tests/db/class-navigation.test.ts` ;
- dans l’application, en mode démo, à 360 px : élève de 3e → leçon terminée → passage en 2nde S → cours de 2nde → cours de 3e en révision → progression de 3e intacte → historique gardé.
