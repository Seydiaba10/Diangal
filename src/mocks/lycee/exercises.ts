import "server-only";

// Exercices corrigés des matières propres aux séries LA, S3, S4, S5, G, T1 et T2 (1re et Terminale), et
// des nouveaux chapitres de maths des séries G et T. Rangés par matière et par titre de chapitre ; repris
// par 1re/exercises.ts et tle/exercises.ts. Écrits par DIANGAL d’après les leçons, à faire relire par des
// enseignants. Corrigés inclus : ce fichier ne doit jamais atteindre le navigateur.

import type { SubjectCode } from "@/types/domain";
import type { ExerciseSpec } from "../exercise-series";

type Bank = Partial<Record<SubjectCode, Record<string, ExerciseSpec[]>>>;

/** Matières des séries LA, S3, S4, S5, G, T1 et T2 (titres distincts entre la 1re et la Terminale). */
export const LYCEE_SERIES_EXERCISES: Bank = {
  AR: {
    "La phrase nominale et la phrase verbale": [
      { qcm: "Dans الكتابُ جديدٌ (al-kitābu jadīdun), « jadīdun » est…", choices: ["le sujet (mubtada’)", "*le prédicat (khabar)", "le complément d’objet"], why: "Phrase nominale : sujet + prédicat." },
      { qcm: "Une phrase verbale commence par…", choices: ["*un verbe", "un nom", "une préposition"], why: "al-jumla al-fi‘liyya." },
      { qcm: "Dans كتبَ التلميذُ الدرسَ, « ad-darsa » est…", choices: ["le sujet", "*le complément d’objet (maf‘ūl bihi)", "le verbe"], why: "Il est à l’accusatif." },
    ],
    "Les cas et la déclinaison": [
      { qcm: "Après une préposition, le nom est au…", choices: ["nominatif", "accusatif", "*génitif"], why: "Cas jarr." },
      { qcm: "Le complément d’objet est au…", choices: ["nominatif", "*accusatif", "génitif"], why: "Cas naṣb, voyelle a." },
      { qcm: "Le sujet d’une phrase nominale est au…", choices: ["*nominatif", "accusatif", "génitif"], why: "Cas raf‘, voyelle u." },
    ],
    "La conjugaison : l’accompli et l’inachevé": [
      { qcm: "يكتبُ (yaktubu) est à…", choices: ["l’accompli", "*l’inachevé", "l’impératif"], why: "Préfixe ya- de l’inachevé." },
      { num: "Combien de consonnes compte la racine k-t-b ?", answer: 3, why: "Racine trilitère." },
      { qcm: "اكتبْ (uktub) signifie…", choices: ["il a écrit", "*écris !", "il écrit"], why: "Impératif." },
    ],
    "Les schèmes et la dérivation": [
      { qcm: "Sur le schème fā‘il, la racine k-t-b donne…", choices: ["*kātib (écrivain)", "maktab (bureau)", "maktūb (écrit)"], why: "Nom d’agent." },
      { qcm: "مكتبة (maktaba) signifie…", choices: ["écrivain", "*bibliothèque", "lettre"], why: "Nom de lieu." },
      { qcm: "Le schème maf‘ūl exprime…", choices: ["celui qui fait l’action", "*ce qui subit l’action", "le lieu de l’action"], why: "Nom de patient." },
    ],
    "La poésie arabe préislamique": [
      { qcm: "Les Mu‘allaqāt sont…", choices: ["*des poèmes préislamiques célèbres", "des sourates", "des contes abbassides"], why: "« Poèmes suspendus »." },
      { qcm: "L’un des plus célèbres poètes de la Jāhiliyya est…", choices: ["*Imru’ al-Qays", "al-Mutanabbī", "Ahmad Shawqī"], why: "Auteur d’une Mu‘allaqa." },
      { qcm: "La qaṣīda commence traditionnellement par…", choices: ["*l’évocation du campement abandonné (nasīb)", "une prière", "une conclusion"], why: "Puis le voyage et le sujet." },
    ],
    "La littérature aux époques islamique et omeyyade": [
      { qcm: "« Le poète du Prophète » est…", choices: ["*Ḥassān ibn Thābit", "Jarīr", "Abū Nuwās"], why: "Il défendait l’islam naissant." },
      { qcm: "La capitale des Omeyyades était…", choices: ["*Damas", "Bagdad", "Le Caire"], why: "661-750." },
      { qcm: "Le ghazal ‘udhrī chante…", choices: ["*un amour chaste et impossible", "la guerre", "le vin"], why: "Jamīl Buthayna." },
    ],
    "Les fondements de la civilisation arabo-islamique": [
      { num: "En quelle année a lieu l’hégire ?", answer: 622, why: "Début du calendrier musulman." },
      { qcm: "Le premier calife est…", choices: ["*Abū Bakr", "‘Alī", "‘Umar"], why: "Après la mort du Prophète (632)." },
      { qcm: "La Sunna désigne…", choices: ["*les paroles et actes du Prophète", "un mètre poétique", "une ville sainte"], why: "Seconde source de l’islam." },
    ],
    "L’arabe au Sénégal": [
      { qcm: "L’ajami consiste à…", choices: ["*écrire les langues nationales en caractères arabes", "traduire le Coran", "chanter des poèmes"], why: "Wolofal pour le wolof." },
      { qcm: "Les khassaïdes sont des poèmes de…", choices: ["*Cheikh Ahmadou Bamba", "Senghor", "Birago Diop"], why: "Poésie religieuse en arabe." },
      { qcm: "Cheikh Moussa Kamara a surtout écrit sur…", choices: ["*l’histoire du Fouta", "la médecine", "l’astronomie"], why: "Historien sénégalais de langue arabe." },
    ],
    "La rhétorique arabe": [
      { qcm: "Une comparaison avec un outil (ka, mithl) est un…", choices: ["*tashbīh", "jinās", "ṭibāq"], why: "Figure de la balāgha." },
      { qcm: "Le ṭibāq rapproche…", choices: ["*deux contraires", "deux mots de sons proches", "deux rimes"], why: "Antithèse." },
      { qcm: "La isti‘āra est…", choices: ["*une métaphore", "une rime", "un mètre"], why: "Comparaison sans outil." },
    ],
    "La métrique arabe": [
      { qcm: "La métrique arabe a été décrite par…", choices: ["*al-Khalīl ibn Aḥmad", "Ibn Khaldūn", "al-Jāḥiẓ"], why: "VIIIe siècle." },
      { num: "Combien de mètres al-Khalīl a-t-il décrits ?", answer: 15, why: "Un seizième a été ajouté ensuite par al-Akhfash." },
      { qcm: "Dans une qaṣīda classique, la rime est…", choices: ["*la même du début à la fin", "différente à chaque vers", "absente"], why: "Monorime." },
    ],
    "La littérature abbasside": [
      { qcm: "Kalīla wa Dimna est l’œuvre d’…", choices: ["*Ibn al-Muqaffa‘", "al-Mutanabbī", "Ṭāhā Ḥusayn"], why: "Recueil de fables." },
      { qcm: "La capitale des Abbassides était…", choices: ["*Bagdad", "Damas", "Cordoue"], why: "Grand centre culturel." },
      { qcm: "Le Livre des animaux est d’…", choices: ["*al-Jāḥiẓ", "Abū Nuwās", "Naguib Mahfouz"], why: "Maître de la prose." },
    ],
    "La Nahda et la littérature arabe moderne": [
      { qcm: "« Le prince des poètes » est…", choices: ["*Aḥmad Shawqī", "Mahmoud Darwich", "Imru’ al-Qays"], why: "Poète égyptien." },
      { num: "En quelle année Naguib Mahfouz reçoit-il le prix Nobel de littérature ?", answer: 1988, why: "Premier écrivain arabe nobélisé." },
      { qcm: "Al-Ayyām (Le Livre des jours) est de…", choices: ["*Ṭāhā Ḥusayn", "Naguib Mahfouz", "al-Jāḥiẓ"], why: "Autobiographie." },
    ],
    "Méthodes : dissertation et commentaire en arabe": [
      { qcm: "La conclusion se dit en arabe…", choices: ["al-muqaddima", "al-‘arḍ", "*al-khātima"], why: "Fin du devoir." },
      { qcm: "L’introduction se dit…", choices: ["*al-muqaddima", "al-khātima", "al-khabar"], why: "Début du devoir." },
      { vf: "Dans le développement, chaque idée s’appuie sur des exemples tirés des textes.", answer: true, why: "Méthode." },
    ],
    "Les sciences dans la civilisation arabo-islamique": [
      { qcm: "Le nom d’al-Khwārizmī a donné le mot…", choices: ["*algorithme", "alchimie", "alcool"], why: "Mathématicien de Bagdad." },
      { qcm: "Ibn Khaldūn est l’auteur de…", choices: ["*la Muqaddima", "Kalīla wa Dimna", "Al-Ayyām"], why: "Histoire et sociologie." },
      { qcm: "La Maison de la sagesse se trouvait à…", choices: ["*Bagdad", "Tombouctou", "Fès"], why: "Bayt al-Ḥikma." },
    ],
    "L’islam en Afrique de l’Ouest": [
      { qcm: "La mosquée-université de Sankoré se trouve à…", choices: ["*Tombouctou", "Touba", "Dakar"], why: "Foyer de savoir." },
      { qcm: "Une confrérie soufie fondée au Sénégal :", choices: ["*la Mouridiyya", "la Qadiriyya", "la Tijaniyya"], why: "Fondée par Cheikh Ahmadou Bamba ; Qadiriyya et Tijaniyya sont venues d’ailleurs." },
      { qcm: "L’islam se diffuse d’abord en Afrique de l’Ouest par…", choices: ["*le commerce transsaharien", "la colonisation", "la télévision"], why: "Marchands et lettrés." },
    ],
  },
  ECO: {
    "L’activité économique et ses agents": [
      { qcm: "L’agent économique dont la fonction principale est de produire est…", choices: ["*l’entreprise", "le ménage", "le reste du monde"], why: "Production de biens et services." },
      { qcm: "L’air est un bien…", choices: ["*libre", "économique", "de production"], why: "Abondant et gratuit." },
      { qcm: "Le circuit économique représente…", choices: ["*les flux entre agents économiques", "le réseau routier", "la balance commerciale seulement"], why: "Flux réels et monétaires." },
    ],
    "La production et les facteurs de production": [
      { num: "Production 500 000 F, consommations intermédiaires 300 000 F : valeur ajoutée (F) ?", answer: 200000, why: "500 000 − 300 000." },
      { qcm: "La pêche appartient au secteur…", choices: ["*primaire", "secondaire", "tertiaire"], why: "Exploitation de la nature." },
      { qcm: "Les machines font partie du capital…", choices: ["*fixe", "circulant", "humain"], why: "Utilisées sur plusieurs cycles." },
    ],
    "Le marché et la formation des prix": [
      { qcm: "Quand le prix augmente, la demande…", choices: ["augmente", "*diminue", "ne change jamais"], why: "Loi de la demande." },
      { qcm: "Un marché avec un seul vendeur est…", choices: ["*un monopole", "un oligopole", "la concurrence"], why: "Définition." },
      { qcm: "Une pénurie a tendance à faire…", choices: ["*monter le prix", "baisser le prix", "disparaître la demande"], why: "Demande supérieure à l’offre." },
    ],
    "La monnaie et le financement de l’économie": [
      { qcm: "Le franc CFA de l’UEMOA est émis par…", choices: ["*la BCEAO", "la Banque mondiale", "le FMI"], why: "Siège à Dakar." },
      { qcm: "Les billets et les pièces sont la monnaie…", choices: ["*fiduciaire", "scripturale", "électronique"], why: "Fondée sur la confiance." },
      { qcm: "Une fonction de la monnaie :", choices: ["*unité de compte", "facteur de production", "agent économique"], why: "Avec intermédiaire des échanges et réserve de valeur." },
    ],
    "Revenu, consommation et épargne": [
      { num: "Revenu disponible 200 000 F, consommation 150 000 F : propension moyenne à consommer (en %) ?", answer: 75, why: "150 000 ÷ 200 000." },
      { qcm: "Selon la loi d’Engel, quand le revenu augmente, la part de l’alimentation…", choices: ["*diminue", "augmente", "reste égale"], why: "Observation d’Engel." },
      { qcm: "Une pension de retraite est un revenu…", choices: ["*de transfert", "du travail", "du capital"], why: "Redistribution." },
    ],
    "L’investissement": [
      { qcm: "Acheter une machine pour produire plus est un investissement…", choices: ["*de capacité", "de remplacement", "immatériel"], why: "Augmente la capacité de production." },
      { qcm: "Financer un investissement avec ses propres bénéfices, c’est…", choices: ["*l’autofinancement", "l’emprunt", "la subvention"], why: "Ressources internes." },
      { qcm: "La formation du personnel est un investissement…", choices: ["*immatériel", "matériel", "financier"], why: "Capital humain." },
    ],
    "La comptabilité nationale": [
      { qcm: "Le PIB est la somme…", choices: ["*des valeurs ajoutées", "des chiffres d’affaires", "des salaires"], why: "On évite de compter deux fois." },
      { num: "Un PIB réel passe de 1 000 à 1 050 milliards : taux de croissance (%) ?", answer: 5, why: "50 ÷ 1 000 × 100." },
      { qcm: "Le PIB réel…", choices: ["*élimine l’effet de la hausse des prix", "inclut l’inflation", "ne compte que l’agriculture"], why: "Prix constants." },
    ],
    "Croissance et développement": [
      { qcm: "L’IDH combine…", choices: ["*revenu, santé et éducation", "exportations et importations", "inflation et chômage"], why: "Indicateur de développement humain." },
      { qcm: "La croissance est un phénomène…", choices: ["*quantitatif", "qualitatif", "politique seulement"], why: "Hausse de la production." },
      { qcm: "L’agenda adopté par le Sénégal en 2024 s’appelle…", choices: ["*Sénégal 2050", "Plan Marshall", "Vision 2000"], why: "Agenda national de transformation." },
    ],
    "Inflation et chômage": [
      { qcm: "L’inflation est…", choices: ["*une hausse générale et durable des prix", "une baisse des salaires", "une hausse du chômage"], why: "Définition." },
      { qcm: "Un chômage lié à un ralentissement de l’activité est…", choices: ["*conjoncturel", "structurel", "frictionnel"], why: "Il dépend de la conjoncture." },
      { qcm: "Une cause d’inflation par les coûts :", choices: ["*la hausse du prix du pétrole", "la baisse des impôts", "la hausse du chômage"], why: "Coûts de production." },
    ],
    "Les politiques économiques": [
      { qcm: "La politique monétaire dans l’UEMOA est conduite par…", choices: ["*la BCEAO", "le ministère du Commerce", "la CEDEAO"], why: "Banque centrale commune." },
      { qcm: "Augmenter les dépenses publiques est une politique…", choices: ["*budgétaire de relance", "monétaire restrictive", "de rigueur"], why: "Elle stimule la demande." },
      { num: "Combien d’objectifs compte le « carré magique » ?", answer: 4, why: "Croissance, emploi, prix, équilibre extérieur." },
    ],
    "Le commerce international et la balance des paiements": [
      { num: "Exportations 2 000, importations 4 000 : taux de couverture (%) ?", answer: 50, why: "2 000 ÷ 4 000 × 100." },
      { qcm: "La théorie des avantages comparatifs est due à…", choices: ["*Ricardo", "Keynes", "Marx"], why: "XIXe siècle." },
      { qcm: "Les droits de douane sont un instrument…", choices: ["*protectionniste", "libre-échangiste", "monétaire"], why: "Ils renchérissent les importations." },
    ],
    "L’intégration économique régionale": [
      { qcm: "Une union douanière ajoute à la zone de libre-échange…", choices: ["*un tarif extérieur commun", "une monnaie unique", "un parlement"], why: "Degré d’intégration." },
      { num: "Combien d’États compte l’UEMOA ?", answer: 8, why: "Union économique et monétaire ouest-africaine." },
      { qcm: "La ZLECAf vise un marché…", choices: ["*continental africain", "européen", "mondial"], why: "Zone de libre-échange continentale africaine." },
    ],
    "La mondialisation et les institutions internationales": [
      { qcm: "L’institution qui encadre les règles du commerce mondial est…", choices: ["*l’OMC", "le FMI", "l’UNESCO"], why: "Organisation mondiale du commerce." },
      { qcm: "La Banque mondiale finance surtout…", choices: ["*des projets de développement", "les armées", "les élections"], why: "Mission de développement." },
      { qcm: "Une firme multinationale…", choices: ["*produit ou vend dans plusieurs pays", "n’exporte jamais", "appartient forcément à l’État"], why: "Définition." },
    ],
    "L’économie du Sénégal": [
      { qcm: "Le gisement pétrolier en production au large du Sénégal depuis 2024 est…", choices: ["*Sangomar", "Taïba", "Sabodala"], why: "Production offshore." },
      { qcm: "Le secteur qui produit la plus grande part de la richesse du Sénégal est…", choices: ["*les services", "l’agriculture", "les mines"], why: "Secteur tertiaire." },
      { qcm: "Un défi majeur de l’économie sénégalaise :", choices: ["*l’emploi des jeunes", "le manque de population", "l’absence de côtes"], why: "Population très jeune." },
    ],
  },
  GEST: {
    "L’entreprise et son environnement": [
      { qcm: "Les formes juridiques des sociétés au Sénégal relèvent du droit…", choices: ["*OHADA", "UEMOA seulement", "européen"], why: "Acte uniforme sur les sociétés." },
      { qcm: "Une SARL est…", choices: ["*une société à responsabilité limitée", "une entreprise publique", "une association"], why: "Forme de société." },
      { qcm: "Acheter les matières premières relève de la fonction…", choices: ["*approvisionnement", "commerciale", "financière"], why: "Fonction de l’entreprise." },
    ],
    "Le patrimoine et le bilan": [
      { qcm: "Les dettes fournisseurs figurent…", choices: ["à l’actif", "*au passif", "dans le compte de résultat"], why: "Ressources." },
      { qcm: "Le matériel figure à…", choices: ["*l’actif immobilisé", "l’actif circulant", "au passif"], why: "Bien durable." },
      { vf: "Le total de l’actif est toujours égal au total du passif.", answer: true, why: "Équilibre du bilan." },
    ],
    "Les comptes et la partie double": [
      { qcm: "Un compte d’actif augmente…", choices: ["*au débit", "au crédit", "jamais"], why: "Règle de fonctionnement." },
      { qcm: "Les charges s’enregistrent…", choices: ["*au débit", "au crédit", "hors comptabilité"], why: "Règle des comptes de gestion." },
      { qcm: "Achat de marchandises payé par chèque : on crédite…", choices: ["601 Achats", "*521 Banques", "411 Clients"], why: "La banque diminue." },
    ],
    "Le plan comptable SYSCOHADA": [
      { num: "Quel est le numéro du compte « Caisse » ?", answer: 571, why: "Classe 5, trésorerie." },
      { qcm: "Les comptes de la classe 7 enregistrent…", choices: ["les charges", "*les produits", "les stocks"], why: "Produits des activités ordinaires." },
      { num: "Quel est le numéro du compte « Clients » ?", answer: 411, why: "Classe 4, tiers." },
    ],
    "Journal, grand livre et balance": [
      { qcm: "Le journal enregistre les opérations…", choices: ["*par ordre chronologique", "par compte", "par montant"], why: "Livre d’enregistrement." },
      { qcm: "Dans la balance, le total des débits…", choices: ["*égale le total des crédits", "dépasse toujours les crédits", "est nul"], why: "Partie double." },
      { qcm: "Le grand livre regroupe…", choices: ["*l’ensemble des comptes", "les factures", "les bulletins de paie"], why: "Report des écritures." },
    ],
    "La facturation et la TVA": [
      { num: "Prix brut 100 000 F, remise 10 % : net commercial (F) ?", answer: 90000, why: "100 000 − 10 000." },
      { num: "TVA à 18 % sur 90 000 F (F) ?", answer: 16200, why: "90 000 × 0,18." },
      { qcm: "L’escompte est une réduction…", choices: ["*financière (paiement rapide)", "commerciale (défaut de qualité)", "fiscale"], why: "Pour paiement anticipé." },
    ],
    "La correspondance commerciale": [
      { qcm: "Le document qui confirme une commande au fournisseur est…", choices: ["*le bon de commande", "la facture", "le reçu"], why: "Document commercial." },
      { qcm: "Une lettre de relance sert à…", choices: ["*rappeler un paiement en retard", "passer une commande", "remercier un client"], why: "Suivi des créances." },
      { vf: "Une lettre commerciale doit préciser son objet.", answer: true, why: "Clarté de la correspondance." },
    ],
    "Les amortissements": [
      { num: "Machine de 3 000 000 F amortie en 5 ans (linéaire) : annuité (F) ?", answer: 600000, why: "3 000 000 × 20 %." },
      { num: "Même machine : valeur nette comptable après 2 ans (F) ?", answer: 1800000, why: "3 000 000 − 1 200 000." },
      { num: "Taux d’amortissement linéaire pour une durée de 4 ans (%) ?", answer: 25, why: "100 ÷ 4." },
    ],
    "Les travaux de fin d’exercice": [
      { qcm: "Une créance dont le recouvrement est incertain est…", choices: ["*douteuse", "certaine", "immobilisée"], why: "On constate une dépréciation." },
      { qcm: "L’inventaire consiste à…", choices: ["*recenser et évaluer les biens, créances et dettes", "embaucher du personnel", "fixer les prix"], why: "Fin d’exercice." },
      { qcm: "Les régularisations servent à…", choices: ["*rattacher charges et produits au bon exercice", "supprimer des dettes", "augmenter le capital"], why: "Indépendance des exercices." },
    ],
    "Le compte de résultat et les soldes significatifs": [
      { num: "Ventes 8 000 000 F, coût d’achat des marchandises vendues 5 000 000 F : marge commerciale (F) ?", answer: 3000000, why: "Différence." },
      { qcm: "Résultat =", choices: ["*produits − charges", "actif − passif", "ventes − achats seulement"], why: "Définition." },
      { qcm: "Un résultat négatif est…", choices: ["*une perte", "un bénéfice", "un capital"], why: "Charges supérieures aux produits." },
    ],
    "L’analyse du bilan": [
      { num: "FR = 4 000 000 F et BFR = 3 000 000 F : trésorerie nette (F) ?", answer: 1000000, why: "FR − BFR." },
      { qcm: "Le fonds de roulement =", choices: ["*ressources stables − emplois stables", "actif circulant − stocks", "ventes − achats"], why: "Définition." },
      { qcm: "Des stocks et des créances clients élevés augmentent…", choices: ["*le BFR", "le capital", "le résultat"], why: "Besoin de financement du cycle." },
    ],
    "Coûts et seuil de rentabilité": [
      { num: "CA 10 000 000 F, charges variables 6 000 000 F : taux de marge sur coût variable (%) ?", answer: 40, why: "4 000 000 ÷ 10 000 000." },
      { num: "Charges fixes 2 000 000 F, taux de MCV 40 % : seuil de rentabilité (F) ?", answer: 5000000, why: "2 000 000 ÷ 0,4." },
      { qcm: "Au-dessus du seuil de rentabilité, l’entreprise…", choices: ["*fait des bénéfices", "fait des pertes", "ne vend rien"], why: "La marge couvre les charges fixes." },
    ],
    "La gestion des stocks": [
      { num: "100 unités à 1 000 F puis 300 unités à 1 200 F : CMUP (F) ?", answer: 1150, why: "460 000 ÷ 400." },
      { qcm: "Le stock de sécurité sert à…", choices: ["*éviter la rupture", "augmenter les ventes", "réduire les impôts"], why: "Réserve en cas de retard." },
      { qcm: "Le stock d’alerte déclenche…", choices: ["*une commande", "une vente", "un inventaire"], why: "Réapprovisionnement." },
    ],
    "Le budget de trésorerie": [
      { num: "Trésorerie initiale 500 000 F, encaissements 2 000 000 F, décaissements 2 300 000 F : trésorerie finale (F) ?", answer: 200000, why: "500 000 + 2 000 000 − 2 300 000." },
      { qcm: "Le budget de trésorerie prévoit…", choices: ["*les encaissements et les décaissements", "seulement les ventes", "seulement les salaires"], why: "Flux de trésorerie." },
      { qcm: "Si la trésorerie prévue devient négative, il faut…", choices: ["*prévoir un financement", "ne rien faire", "augmenter les dépenses"], why: "Éviter la cessation de paiements." },
    ],
    "L’informatique de gestion": [
      { qcm: "Dans un tableur, une formule commence par…", choices: ["*=", "#", "@"], why: "Convention des tableurs." },
      { qcm: "=SOMME(B2:B10) calcule…", choices: ["*la somme des cellules B2 à B10", "la moyenne", "le maximum"], why: "Fonction SOMME." },
      { qcm: "Pour protéger les données, il faut…", choices: ["*sauvegarder régulièrement", "partager son mot de passe", "désactiver l’antivirus"], why: "Sécurité informatique." },
    ],
  },
  CONST: {
    "Le dessin technique : projections et vues": [
      { qcm: "En disposition européenne, la vue de dessus se place…", choices: ["*sous la vue de face", "au-dessus de la vue de face", "à gauche"], why: "Projection européenne." },
      { qcm: "Les arêtes cachées se dessinent en trait…", choices: ["continu fort", "*interrompu court", "mixte fin"], why: "Convention." },
      { qcm: "Une échelle 1:2 est…", choices: ["*une réduction", "un agrandissement", "la grandeur nature"], why: "Le dessin est deux fois plus petit." },
    ],
    "Coupes et sections": [
      { qcm: "Les parties coupées sont…", choices: ["*hachurées", "en pointillés", "laissées blanches"], why: "Convention." },
      { qcm: "Une section représente…", choices: ["*seulement la partie située dans le plan de coupe", "toute la pièce", "l’extérieur de la pièce"], why: "Différence avec la coupe." },
      { qcm: "La demi-coupe convient aux pièces…", choices: ["*symétriques", "sans trou", "très grandes"], why: "Moitié extérieure, moitié coupée." },
    ],
    "Cotation et tolérances": [
      { num: "Cote 20 ± 0,1 : dimension maximale acceptée (mm) ?", answer: 20.1, why: "20 + 0,1." },
      { num: "Cote 20 ± 0,1 : intervalle de tolérance (mm) ?", answer: 0.2, why: "20,1 − 19,9." },
      { qcm: "Les cotes sont exprimées en…", choices: ["*millimètres", "centimètres", "mètres"], why: "Convention du dessin technique." },
    ],
    "Les liaisons mécaniques": [
      { num: "Combien de degrés de liberté a un solide libre dans l’espace ?", answer: 6, why: "3 translations + 3 rotations." },
      { qcm: "Une liaison qui n’autorise qu’une rotation est…", choices: ["*une liaison pivot", "une glissière", "un encastrement"], why: "1 degré de liberté." },
      { qcm: "Le système vis-écrou réalise une liaison…", choices: ["*hélicoïdale", "rotule", "appui plan"], why: "Rotation et translation liées." },
    ],
    "Les assemblages": [
      { num: "Pas (mm) d’un filetage M10 × 1,5 ?", answer: 1.5, why: "Second nombre de la désignation." },
      { qcm: "Un assemblage par soudure est…", choices: ["*permanent", "démontable", "provisoire"], why: "Fusion du métal." },
      { qcm: "Un contre-écrou sert à…", choices: ["*freiner l’écrou", "augmenter le pas", "souder les pièces"], why: "Éviter le desserrage." },
    ],
    "La statique du solide": [
      { num: "Moment (N·m) d’une force de 80 N appliquée perpendiculairement à 0,25 m de l’axe ?", answer: 20, why: "80 × 0,25." },
      { qcm: "À l’équilibre, la somme des forces est…", choices: ["*nulle", "maximale", "égale au poids"], why: "Principe fondamental de la statique." },
      { qcm: "Selon la loi de Coulomb, à la limite du glissement…", choices: ["*T = f × N", "T = N", "T = 0"], why: "Coefficient de frottement." },
    ],
    "Le guidage en rotation": [
      { qcm: "Un coussinet en bronze réalise un guidage par…", choices: ["*palier lisse", "roulement", "engrenage"], why: "Frottement de glissement." },
      { qcm: "Les roulements permettent…", choices: ["*des vitesses plus élevées avec moins de frottement", "un assemblage permanent", "une transmission par chaîne"], why: "Frottement de roulement." },
      { qcm: "La lubrification réduit…", choices: ["*l’usure et l’échauffement", "la vitesse", "le poids"], why: "Rôle du lubrifiant." },
    ],
    "Transmettre la puissance par engrenages": [
      { num: "Module 2 mm, 40 dents : diamètre primitif (mm) ?", answer: 80, why: "d = m × Z." },
      { num: "m = 2 mm, Z₁ = 20, Z₂ = 40 : entraxe (mm) ?", answer: 60, why: "2 × 60 ÷ 2." },
      { num: "Z₁ = 20 (menant), Z₂ = 40 : rapport de transmission ?", answer: 0.5, why: "Z₁ ÷ Z₂." },
    ],
    "Poulies, courroies et chaînes": [
      { num: "Poulie de 100 mm à 1 500 tr/min entraînant une poulie de 300 mm : vitesse de sortie (tr/min) ?", answer: 500, why: "1 500 × 100 ÷ 300." },
      { qcm: "Une transmission par chaîne équipe…", choices: ["*les vélos", "les montres", "les vérins"], why: "Pignons et chaîne." },
      { qcm: "Une grande poulie réceptrice…", choices: ["*réduit la vitesse", "augmente la vitesse", "inverse toujours le sens"], why: "N₂ = N₁ × d₁ ÷ d₂." },
    ],
    "Cinématique : mouvements et vitesses": [
      { num: "Vitesse angulaire (rad/s, arrondie à l’unité) à 1 500 tr/min ?", answer: 157, why: "2π × 1 500 ÷ 60." },
      { qcm: "Vitesse linéaire d’un point en rotation : v =", choices: ["*ω × R", "ω ÷ R", "R²"], why: "Formule du cours." },
      { qcm: "Un piston de vérin a un mouvement de…", choices: ["*translation", "rotation", "hélice"], why: "Il coulisse." },
    ],
    "Résistance des matériaux : traction et compression": [
      { num: "F = 10 000 N sur 100 mm² : contrainte (MPa) ?", answer: 100, why: "σ = F ÷ S." },
      { num: "Re = 235 MPa, coefficient de sécurité 2 : contrainte admissible (MPa) ?", answer: 117.5, why: "235 ÷ 2." },
      { qcm: "La loi de Hooke s’écrit…", choices: ["*σ = E × ε", "F = m × a", "P = U × I"], why: "Domaine élastique." },
    ],
    "Résistance des matériaux : cisaillement, torsion, flexion": [
      { qcm: "Une goupille est surtout sollicitée en…", choices: ["*cisaillement", "traction", "flexion"], why: "Glissement des sections." },
      { qcm: "Un arbre qui transmet un couple travaille en…", choices: ["*torsion", "compression", "cisaillement pur"], why: "Couple de torsion." },
      { qcm: "Dans une poutre en flexion, une face est…", choices: ["*tendue et l’autre comprimée", "seulement comprimée", "sans contrainte"], why: "Fibres tendues et comprimées." },
    ],
    "Puissance, couple et rendement": [
      { num: "Couple 20 N·m à 157 rad/s : puissance (W) ?", answer: 3140, why: "P = C × ω." },
      { num: "Deux étages de rendements 0,95 et 0,9 : rendement global ?", answer: 0.855, why: "Produit des rendements." },
      { qcm: "Le rendement est toujours…", choices: ["*inférieur à 1", "supérieur à 1", "égal à 2"], why: "Il y a des pertes." },
    ],
    "Analyse fonctionnelle et cahier des charges": [
      { qcm: "Le diagramme qui relie le produit à son environnement est…", choices: ["*le diagramme pieuvre", "le GRAFCET", "le diagramme de Gantt"], why: "Analyse fonctionnelle." },
      { qcm: "Une fonction contrainte peut concerner…", choices: ["*la sécurité ou le coût", "la raison d’être du produit", "le nom du fabricant"], why: "Fonctions de service." },
      { qcm: "Le FAST relie…", choices: ["*les fonctions aux solutions techniques", "les pièces aux prix", "les clients aux fournisseurs"], why: "Arbre fonctionnel." },
    ],
  },
  TECH: {
    "Les matériaux et leur désignation": [
      { num: "Limite élastique (MPa) d’un acier S235 ?", answer: 235, why: "Le nombre de la désignation." },
      { qcm: "Le laiton est un alliage de…", choices: ["*cuivre et zinc", "cuivre et étain", "fer et carbone"], why: "Le bronze : cuivre et étain." },
      { qcm: "Un acier C45 contient environ…", choices: ["*0,45 % de carbone", "45 % de carbone", "4,5 % de chrome"], why: "Désignation des aciers non alliés." },
    ],
    "Les procédés d’obtention des pièces": [
      { qcm: "Couler du métal liquide dans un moule, c’est…", choices: ["*le moulage", "le forgeage", "l’usinage"], why: "Fonderie." },
      { qcm: "L’usinage obtient la forme par…", choices: ["*enlèvement de matière", "fusion", "pliage"], why: "Production de copeaux." },
      { qcm: "L’emboutissage met en forme…", choices: ["*des tôles", "des liquides", "des plastiques fondus"], why: "Déformation de tôles." },
    ],
    "Le tournage": [
      { num: "D = 50 mm, Vc = 100 m/min : fréquence de rotation (tr/min, arrondie à l’unité) ?", answer: 637, why: "1 000 × 100 ÷ (π × 50)." },
      { qcm: "Usiner une face plane en bout de pièce sur un tour, c’est…", choices: ["*le dressage", "le chariotage", "l’alésage"], why: "Opération de tournage." },
      { qcm: "En tournage, ce qui tourne est…", choices: ["*la pièce", "l’outil", "le bâti"], why: "Principe du tour." },
    ],
    "Le fraisage et le perçage": [
      { num: "Fraise de 4 dents, fz = 0,1 mm, N = 500 tr/min : vitesse d’avance (mm/min) ?", answer: 200, why: "0,1 × 4 × 500." },
      { qcm: "Le taraudage réalise…", choices: ["*un filetage intérieur", "un trou lisse", "une rainure"], why: "Pour recevoir une vis." },
      { qcm: "En fraisage, ce qui tourne est…", choices: ["*l’outil", "la pièce", "la table"], why: "Principe de la fraiseuse." },
    ],
    "La métrologie": [
      { num: "Précision (mm) d’un pied à coulisse au 1/50 ?", answer: 0.02, why: "1 ÷ 50." },
      { qcm: "L’instrument le plus précis parmi ceux-ci :", choices: ["réglet", "pied à coulisse", "*micromètre"], why: "0,01 mm." },
      { qcm: "Le calibre « entre – n’entre pas » sert à…", choices: ["*contrôler rapidement une tolérance", "mesurer une température", "tracer"], why: "Contrôle par attributs." },
    ],
    "La logique combinatoire": [
      { qcm: "La sortie d’un ET vaut 1 si…", choices: ["*toutes les entrées valent 1", "une entrée vaut 1", "aucune entrée ne vaut 1"], why: "Fonction ET." },
      { qcm: "NON 1 =", choices: ["*0", "1", "2"], why: "Complément." },
      { qcm: "La sécurité à deux mains se traduit par…", choices: ["*S = a · b", "S = a + b", "S = NON a"], why: "Les deux boutons ensemble." },
    ],
    "Sécurité et organisation de l’atelier": [
      { qcm: "Pour enlever les copeaux d’une machine, on utilise…", choices: ["*un crochet ou une brosse, machine arrêtée", "la main", "la bouche"], why: "Risque de coupure." },
      { num: "Combien d’étapes compte la méthode 5S ?", answer: 5, why: "Trier, ranger, nettoyer, standardiser, maintenir." },
      { qcm: "Un équipement de protection individuelle :", choices: ["*les lunettes de sécurité", "le carter de la machine", "l’éclairage"], why: "Porté par l’opérateur." },
    ],
    "Analyse de fabrication et gamme d’usinage": [
      { num: "Nombre maximal de points de contact d’une mise en position isostatique ?", answer: 6, why: "Un par degré de liberté supprimé." },
      { qcm: "On usine en premier…", choices: ["*les surfaces de référence", "les finitions", "les chanfreins décoratifs"], why: "Elles servent ensuite d’appui." },
      { qcm: "Le contrat de phase précise…", choices: ["*machine, outils, conditions de coupe et cotes", "le prix de vente", "le nom du client"], why: "Document de fabrication." },
    ],
    "Les conditions de coupe": [
      { qcm: "Un outil carbure, comparé à l’acier rapide, accepte une vitesse de coupe…", choices: ["*plus élevée", "plus faible", "identique"], why: "Plus dur et résistant à la chaleur." },
      { qcm: "En finition, l’avance est…", choices: ["*faible", "maximale", "nulle"], why: "Pour un bon état de surface." },
      { qcm: "Le débit de copeaux s’écrit…", choices: ["*Q = a × f × Vc", "Q = Vc ÷ f", "Q = a + f"], why: "Formule du cours." },
    ],
    "Le GRAFCET": [
      { qcm: "L’étape initiale se représente par…", choices: ["*un double carré", "un cercle", "un triangle"], why: "Active au démarrage." },
      { qcm: "Une transition est franchie si…", choices: ["*l’étape précédente est active et la réceptivité vraie", "le système est arrêté", "toutes les étapes sont actives"], why: "Règle d’évolution." },
      { qcm: "Une action est associée à…", choices: ["*une étape", "une transition", "une liaison"], why: "Elle s’exécute quand l’étape est active." },
    ],
    "La pneumatique": [
      { num: "Pression 0,6 MPa sur un piston de 1 963 mm² : effort (N, arrondi à l’unité) ?", answer: 1178, why: "F = p × S." },
      { qcm: "Un vérin simple effet revient en position…", choices: ["*grâce à un ressort", "grâce à l’air comprimé", "jamais"], why: "Un seul orifice d’alimentation." },
      { qcm: "Le distributeur sert à…", choices: ["*diriger l’air vers le vérin", "produire l’air comprimé", "mesurer la pression"], why: "Préactionneur." },
    ],
    "Capteurs, actionneurs et automates": [
      { qcm: "Un capteur inductif détecte…", choices: ["*les objets métalliques", "la lumière", "le son"], why: "Champ magnétique." },
      { qcm: "Un moteur électrique est…", choices: ["*un actionneur", "un capteur", "un automate"], why: "Il convertit l’énergie." },
      { qcm: "L’automate lit ses…", choices: ["*entrées et commande ses sorties", "factures", "plans"], why: "Cycle automate." },
    ],
    "Qualité et maintenance": [
      { qcm: "Réparer après une panne est une maintenance…", choices: ["*corrective", "préventive", "conditionnelle"], why: "Après défaillance." },
      { qcm: "Graisser une machine selon un planning est une maintenance…", choices: ["*préventive", "corrective", "curative"], why: "Avant la panne." },
      { qcm: "Une pièce hors tolérance est…", choices: ["*non conforme", "conforme", "améliorée"], why: "Contrôle qualité." },
    ],
  },
  ELEC: {
    "Les lois des circuits en courant continu": [
      { num: "U = 12 V, R₁ = 2 kΩ, R₂ = 1 kΩ : tension aux bornes de R₂ (V) ?", answer: 4, why: "Diviseur de tension." },
      { num: "I = 0,5 A dans R = 20 Ω : tension (V) ?", answer: 10, why: "U = R × I." },
      { qcm: "La loi des nœuds porte sur…", choices: ["*les courants", "les tensions", "les résistances"], why: "Conservation du courant." },
    ],
    "Puissance et énergie électriques": [
      { num: "Climatiseur de 1,5 kW utilisé 8 h : énergie (kWh) ?", answer: 12, why: "1,5 × 8." },
      { num: "Puissance (W) sous 230 V avec 2 A ?", answer: 460, why: "P = U × I." },
      { qcm: "1 kWh vaut…", choices: ["*3,6 × 10⁶ J", "1 000 J", "3 600 J"], why: "1 000 W × 3 600 s." },
    ],
    "Le régime sinusoïdal monophasé": [
      { num: "Valeur maximale (V, arrondie à l’unité) d’une tension de 230 V efficaces ?", answer: 325, why: "230 × √2." },
      { num: "Fréquence du réseau sénégalais (Hz) ?", answer: 50, why: "Réseau alternatif." },
      { qcm: "Dans une bobine, le courant est…", choices: ["*en retard sur la tension", "en avance", "en phase"], why: "Effet inductif." },
    ],
    "Puissances en alternatif et facteur de puissance": [
      { num: "U = 230 V, I = 10 A, cos φ = 0,8 : puissance active (W) ?", answer: 1840, why: "U I cos φ." },
      { qcm: "La puissance apparente s’exprime en…", choices: ["*VA", "W", "var"], why: "S = U I." },
      { qcm: "Pour relever le facteur de puissance, on installe…", choices: ["*des condensateurs", "des résistances", "des fusibles"], why: "Compensation de la puissance réactive." },
    ],
    "Magnétisme et induction": [
      { qcm: "La force de Laplace s’exerce sur…", choices: ["*un conducteur parcouru par un courant dans un champ magnétique", "un aimant isolé", "une résistance seule"], why: "Principe du moteur." },
      { qcm: "Un flux magnétique variable crée…", choices: ["*une tension induite", "un court-circuit", "une résistance"], why: "Induction." },
      { qcm: "L’alternateur fonctionne grâce à…", choices: ["*l’induction", "l’effet Joule", "la photosynthèse"], why: "Principe de l’induction." },
    ],
    "Composants électroniques de base": [
      { qcm: "Une diode laisse passer le courant…", choices: ["*dans un seul sens", "dans les deux sens", "jamais"], why: "Composant unidirectionnel." },
      { num: "Combien de diodes compte un pont redresseur double alternance ?", answer: 4, why: "Pont de Graetz." },
      { qcm: "Le condensateur après un redresseur sert au…", choices: ["*filtrage", "redressement", "comptage"], why: "Il lisse la tension." },
    ],
    "Schémas électriques et sécurité": [
      { num: "Sensibilité (mA) d’un disjoncteur différentiel de protection des personnes ?", answer: 30, why: "Différentiel 30 mA." },
      { qcm: "Avant d’intervenir sur une installation, on…", choices: ["*coupe, condamne et vérifie l’absence de tension", "travaille sous tension", "retire la prise de terre"], why: "Consignation." },
      { qcm: "Le fusible protège contre…", choices: ["*les courts-circuits et surcharges", "la foudre uniquement", "le vol"], why: "Il fond si le courant est trop fort." },
    ],
    "Le système triphasé": [
      { num: "Tension simple de 230 V : tension composée (V, arrondie à la dizaine) ?", answer: 400, why: "230 × √3 ≈ 398." },
      { num: "U = 400 V, I = 10 A, cos φ = 0,8 : puissance (W, arrondie à l’unité) ?", answer: 5543, why: "√3 × 400 × 10 × 0,8." },
      { qcm: "Les deux couplages d’un récepteur triphasé sont…", choices: ["*étoile et triangle", "série et dérivation seulement", "pont et diode"], why: "Couplages." },
    ],
    "Le transformateur monophasé": [
      { num: "230 V au primaire, m = 0,05 : tension au secondaire (V) ?", answer: 11.5, why: "230 × 0,05." },
      { qcm: "Un transformateur fonctionne…", choices: ["*en alternatif seulement", "en continu", "sans courant"], why: "Il faut un flux variable." },
      { qcm: "Dans un transformateur abaisseur, m est…", choices: ["*inférieur à 1", "supérieur à 1", "égal à 1"], why: "U₂ &lt; U₁." },
    ],
    "La machine à courant continu": [
      { qcm: "La vitesse d’un moteur à courant continu se règle par…", choices: ["*la tension d’induit", "la couleur des fils", "le nombre de diodes"], why: "E = kΦN." },
      { qcm: "À flux constant, le couple est proportionnel…", choices: ["*au courant d’induit", "à la tension seule", "à la température"], why: "Formule du cours." },
      { qcm: "Pour un moteur : U =", choices: ["*E + R I", "E − R I", "R I seulement"], why: "Loi d’Ohm de l’induit." },
    ],
    "Le moteur asynchrone triphasé": [
      { num: "f = 50 Hz, 2 paires de pôles : vitesse de synchronisme (tr/min) ?", answer: 1500, why: "60 × 50 ÷ 2." },
      { num: "ns = 1 500 tr/min, n = 1 440 tr/min : glissement (%) ?", answer: 4, why: "60 ÷ 1 500." },
      { qcm: "Le démarrage étoile-triangle sert à…", choices: ["*limiter le courant de démarrage", "inverser le sens", "augmenter la vitesse"], why: "Tension réduite au démarrage." },
    ],
    "Le transistor": [
      { num: "β = 100, IB = 0,2 mA : IC (mA) ?", answer: 20, why: "IC = β × IB." },
      { qcm: "En commutation, un transistor saturé se comporte comme…", choices: ["*un interrupteur fermé", "un interrupteur ouvert", "un condensateur"], why: "Il conduit." },
      { qcm: "Les trois bornes d’un transistor bipolaire sont…", choices: ["*base, collecteur, émetteur", "anode, cathode, grille", "phase, neutre, terre"], why: "Transistor bipolaire." },
    ],
    "Logique séquentielle et automatismes": [
      { qcm: "Une bascule sert à…", choices: ["*mémoriser un état binaire", "redresser un courant", "mesurer une tension"], why: "Logique séquentielle." },
      { qcm: "Plusieurs bascules associées forment…", choices: ["*un compteur", "un transformateur", "un moteur"], why: "Comptage d’impulsions." },
      { qcm: "Le GRAFCET décrit…", choices: ["*la succession des étapes d’un automatisme", "un schéma de câblage", "une facture"], why: "Outil de description." },
    ],
    "Électronique de puissance et énergie solaire": [
      { qcm: "Un onduleur convertit…", choices: ["*le continu en alternatif", "l’alternatif en continu", "le continu en continu"], why: "Indispensable au solaire." },
      { qcm: "Un hacheur sert à…", choices: ["*faire varier une tension continue", "redresser l’alternatif", "élever la fréquence"], why: "Variateur de vitesse." },
      { qcm: "Dans une installation solaire autonome, l’énergie est stockée dans…", choices: ["*des batteries", "l’onduleur", "les panneaux"], why: "Stockage électrochimique." },
    ],
  },
  AGRI: {
    "Écosystèmes naturels et agrosystèmes": [
      { qcm: "Un agrosystème est…", choices: ["*un écosystème aménagé par l’homme pour produire", "une forêt vierge", "un désert"], why: "Champ, verger, élevage." },
      { qcm: "Dans un agrosystème, la biodiversité est généralement…", choices: ["*réduite", "très élevée", "inexistante"], why: "Peu d’espèces cultivées." },
      { qcm: "Les rotations de cultures permettent…", choices: ["*de maintenir la fertilité", "d’épuiser le sol", "de supprimer l’eau"], why: "Alternance des besoins." },
    ],
    "Le sol, support des cultures": [
      { qcm: "Le sol « dior » est…", choices: ["*sableux et filtrant", "argileux et lourd", "salé"], why: "Typique du bassin arachidier." },
      { qcm: "Le riz se cultive surtout sur des sols…", choices: ["*hydromorphes (engorgés d’eau)", "très sableux", "rocheux"], why: "Bas-fonds et vallées." },
      { qcm: "Les « tannes » sont des sols…", choices: ["*salés", "très fertiles", "volcaniques"], why: "Salinisation." },
    ],
    "L’eau et l’irrigation": [
      { qcm: "La région la plus arrosée du Sénégal est…", choices: ["*la Casamance", "la vallée du fleuve", "le Ferlo"], why: "Plus de 1 000 mm par an." },
      { qcm: "La technique d’irrigation la plus économe en eau est…", choices: ["*le goutte-à-goutte", "l’irrigation gravitaire", "l’inondation"], why: "Eau apportée au pied des plantes." },
      { qcm: "Une mauvaise irrigation peut provoquer…", choices: ["*la salinisation des sols", "la formation de volcans", "la neige"], why: "Remontée de sels." },
    ],
    "La plante cultivée": [
      { qcm: "L’azote favorise surtout…", choices: ["*la croissance des feuilles", "la floraison", "la résistance aux maladies"], why: "Élément N." },
      { qcm: "La photosynthèse utilise…", choices: ["*lumière, eau et CO₂", "oxygène et sucre", "sel et azote seulement"], why: "Fabrication de matière organique." },
      { qcm: "L’étape où le grain sort de terre s’appelle…", choices: ["*la levée", "la maturité", "la floraison"], why: "Cycle de la plante." },
    ],
    "Les grandes cultures du Sénégal": [
      { qcm: "L’arachide est surtout cultivée dans…", choices: ["*le bassin arachidier", "les Niayes", "la vallée du fleuve"], why: "Kaolack, Kaffrine, Diourbel." },
      { qcm: "Une légumineuse qui enrichit le sol en azote :", choices: ["*le niébé", "le mil", "le maïs"], why: "Bactéries des nodosités." },
      { qcm: "La zone maraîchère proche de Dakar s’appelle…", choices: ["*les Niayes", "le Ferlo", "le Saloum"], why: "Oignon, carotte, chou." },
    ],
    "Les espèces animales élevées": [
      { qcm: "La race bovine résistante à la trypanosomose est…", choices: ["*la Ndama", "le zébu Gobra", "la Holstein"], why: "Taurin du sud." },
      { qcm: "La transhumance caractérise l’élevage…", choices: ["*pastoral", "intensif", "avicole"], why: "Déplacement des troupeaux." },
      { qcm: "Le Ladoum est une race de…", choices: ["*mouton", "chèvre", "vache"], why: "Race ovine prisée au Sénégal." },
    ],
    "Environnement et ressources naturelles": [
      { qcm: "Le kadd (Faidherbia albida) perd ses feuilles…", choices: ["*en saison des pluies", "en saison sèche", "jamais"], why: "Il n’ombrage pas les cultures et enrichit le sol." },
      { qcm: "Une cause de dégradation des terres :", choices: ["*les feux de brousse", "le reboisement", "la jachère"], why: "Ils détruisent la végétation." },
      { qcm: "La Grande Muraille verte lutte contre…", choices: ["*la désertification", "les inondations côtières", "le froid"], why: "Reboisement du Sahel." },
    ],
    "La fertilisation des sols": [
      { num: "Pourcentage d’azote contenu dans l’urée ?", answer: 46, why: "Engrais azoté très concentré." },
      { num: "Combien de kg d’azote dans 100 kg de NPK 15-15-15 ?", answer: 15, why: "Premier nombre de la formule." },
      { qcm: "La fumure organique améliore surtout…", choices: ["*la structure du sol", "la couleur des fruits", "la salinité"], why: "Humus." },
    ],
    "L’itinéraire technique d’une culture": [
      { qcm: "Le démariage consiste à…", choices: ["*ne garder que quelques plants par poquet", "récolter", "labourer"], why: "Limiter la concurrence." },
      { qcm: "Le sarclage sert à…", choices: ["*éliminer les mauvaises herbes", "semer", "irriguer"], why: "Entretien de la culture." },
      { qcm: "Avant le stockage, les grains doivent être…", choices: ["*bien secs", "humides", "lavés à l’eau"], why: "Éviter moisissures et insectes." },
    ],
    "La protection des cultures": [
      { qcm: "Le Striga est…", choices: ["*une plante parasite du mil et du sorgho", "un insecte", "un engrais"], why: "Mauvaise herbe parasite." },
      { num: "En quelle année la chenille légionnaire d’automne arrive-t-elle en Afrique de l’Ouest ?", answer: 2016, why: "Ravageur du maïs." },
      { qcm: "La lutte intégrée utilise les pesticides…", choices: ["*en dernier recours", "en premier", "jamais"], why: "Priorité aux méthodes préventives." },
    ],
    "Semences et amélioration des plantes": [
      { qcm: "L’institut qui crée des variétés adaptées au Sénégal est…", choices: ["*l’ISRA", "la BCEAO", "l’ASN"], why: "Institut sénégalais de recherches agricoles." },
      { qcm: "Une semence certifiée garantit…", choices: ["*la pureté variétale et la germination", "une récolte sans pluie", "l’absence de travail"], why: "Contrôle officiel." },
      { qcm: "La sélection recherche par exemple…", choices: ["*la résistance à la sécheresse", "des plantes plus fragiles", "des cycles plus longs à tout prix"], why: "Adaptation au climat." },
    ],
    "L’alimentation des animaux": [
      { qcm: "Un aliment concentré :", choices: ["*le tourteau d’arachide", "la paille", "l’eau"], why: "Riche en protéines." },
      { qcm: "L’embouche sert à…", choices: ["*engraisser des animaux en peu de temps", "soigner les animaux", "traire les vaches"], why: "Avant la Tabaski par exemple." },
      { qcm: "La pierre à lécher apporte…", choices: ["*des sels minéraux", "des protéines", "de l’eau"], why: "Complément minéral." },
    ],
    "Santé et reproduction des animaux": [
      { num: "Durée approximative de la gestation d’une brebis (mois) ?", answer: 5, why: "Environ 150 jours." },
      { qcm: "La maladie de Newcastle touche…", choices: ["*la volaille", "les bovins", "les poissons"], why: "Maladie aviaire." },
      { qcm: "Le meilleur moyen de prévenir les grandes épizooties est…", choices: ["*la vaccination", "l’isolement du vétérinaire", "l’arrêt de l’abreuvement"], why: "Prophylaxie." },
    ],
    "Gestion de l’exploitation agricole": [
      { num: "Récolte vendue 600 000 F, charges variables 250 000 F : marge brute (F) ?", answer: 350000, why: "Produit brut − charges variables." },
      { qcm: "Les coopératives aident les paysans à…", choices: ["*acheter les intrants et vendre la récolte", "payer moins d’impôts", "éviter de semer"], why: "Organisation collective." },
      { qcm: "Transformer sa récolte sur place permet…", choices: ["*d’augmenter la valeur ajoutée", "de perdre de l’argent", "de réduire la qualité"], why: "Valorisation." },
    ],
  },
  AGRO: {
    "Les micro-organismes des aliments": [
      { qcm: "Les bactéries lactiques servent à fabriquer…", choices: ["*le lait caillé", "le pain moisi", "le sel"], why: "Fermentation lactique." },
      { qcm: "Salmonella est une bactérie…", choices: ["*pathogène", "utile", "d’altération seulement"], why: "Toxi-infections alimentaires." },
      { qcm: "Les moisissures sur le pain sont des micro-organismes…", choices: ["*d’altération", "utiles", "inexistants"], why: "Elles dégradent l’aliment." },
    ],
    "La croissance microbienne": [
      { num: "Temps de génération 20 min : nombre de bactéries après 1 h à partir d’une seule ?", answer: 8, why: "2³ = 8." },
      { qcm: "Le froid…", choices: ["*ralentit la multiplication des microbes", "les détruit tous", "les accélère"], why: "Effet du froid." },
      { qcm: "La phase de multiplication rapide s’appelle…", choices: ["*la phase exponentielle", "la latence", "le déclin"], why: "Courbe de croissance." },
    ],
    "Glucides et lipides": [
      { qcm: "L’amidon est un glucide…", choices: ["*complexe", "simple", "lipidique"], why: "Polymère du glucose." },
      { qcm: "Un triglycéride est formé de glycérol et de…", choices: ["*trois acides gras", "trois acides aminés", "glucose"], why: "Structure des lipides." },
      { qcm: "Le rancissement des huiles est dû à…", choices: ["*l’oxydation", "la fermentation lactique", "la congélation"], why: "Air et lumière." },
    ],
    "Protéines et enzymes": [
      { qcm: "Les protéines sont formées…", choices: ["*d’acides aminés", "d’acides gras", "de glucose"], why: "Liaisons peptidiques." },
      { qcm: "Le blanc d’œuf qui durcit à la cuisson montre…", choices: ["*la dénaturation des protéines", "la fermentation", "l’oxydation des lipides"], why: "Effet de la chaleur." },
      { qcm: "Le jus de citron sur une mangue coupée…", choices: ["*ralentit le brunissement enzymatique", "accélère le pourrissement", "n’a aucun effet"], why: "Acidité défavorable à l’enzyme." },
    ],
    "Hygiène et qualité des aliments": [
      { num: "Combien d’éléments compte la règle des M (matière, main-d’œuvre, matériel, méthode, milieu) ?", answer: 5, why: "Les 5M." },
      { qcm: "La marche en avant va…", choices: ["*du sale vers le propre", "du propre vers le sale", "dans tous les sens"], why: "Éviter les contaminations croisées." },
      { qcm: "L’HACCP surveille…", choices: ["*les points critiques de la fabrication", "les prix de vente", "la publicité"], why: "Maîtrise des dangers." },
    ],
    "Les produits agricoles et halieutiques du Sénégal": [
      { qcm: "Le pain de singe (bouye) est le fruit…", choices: ["*du baobab", "du manguier", "du palmier"], why: "Produit de cueillette." },
      { qcm: "Les sardinelles sont…", choices: ["*des poissons", "des céréales", "des fruits"], why: "Ressource halieutique." },
      { qcm: "Transformer et conserver les récoltes permet de…", choices: ["*limiter les pertes après récolte", "augmenter les pertes", "supprimer la récolte"], why: "Valorisation." },
    ],
    "Les opérations unitaires de transformation": [
      { qcm: "Retirer le son du mil, c’est…", choices: ["*le décorticage", "le tamisage", "le pressage"], why: "Opération unitaire." },
      { qcm: "Séparer la farine de la semoule se fait par…", choices: ["*tamisage", "broyage", "séchage"], why: "Taille des particules." },
      { qcm: "L’huile d’arachide s’obtient par…", choices: ["*pressage ou extraction", "fermentation", "congélation"], why: "Opération d’extraction." },
    ],
    "La conservation par la chaleur": [
      { num: "Température (°C) d’une pasteurisation rapide du lait pendant 15 s ?", answer: 72, why: "Pasteurisation haute température courte durée." },
      { qcm: "La stérilisation détruit…", choices: ["*tous les micro-organismes", "seulement les pathogènes", "aucun micro-organisme"], why: "Vers 121 °C." },
      { qcm: "L’appertisation correspond…", choices: ["*à la stérilisation en récipient fermé", "au séchage", "à la congélation"], why: "Les conserves." },
    ],
    "La conservation par le froid": [
      { num: "Température (°C) maximale de conservation des produits surgelés ?", answer: -18, why: "−18 °C ou moins." },
      { qcm: "La congélation…", choices: ["*arrête la multiplication des microbes sans les détruire", "détruit tous les microbes", "accélère les microbes"], why: "Effet du froid." },
      { vf: "On peut recongeler sans risque un produit décongelé.", answer: false, why: "Les microbes se sont multipliés pendant la décongélation." },
    ],
    "Séchage, salage et fumage": [
      { qcm: "Le guedj est…", choices: ["*du poisson fermenté et séché", "une boisson", "une céréale"], why: "Produit halieutique traditionnel." },
      { qcm: "Séchage, salage et fumage réduisent…", choices: ["*l’eau disponible pour les microbes", "la teneur en sel", "la température"], why: "Principe de conservation." },
      { qcm: "Le kéthiakh est…", choices: ["*du poisson braisé et séché", "du lait caillé", "du jus de bissap"], why: "Produit traditionnel." },
    ],
    "Les fermentations alimentaires": [
      { qcm: "La fermentation lactique transforme le lactose en…", choices: ["*acide lactique", "éthanol", "acide acétique"], why: "Bactéries lactiques." },
      { qcm: "La levure de boulanger réalise une fermentation…", choices: ["*alcoolique", "lactique", "acétique"], why: "Le CO₂ fait lever la pâte." },
      { qcm: "Le vinaigre est obtenu par fermentation…", choices: ["*acétique", "lactique", "alcoolique seulement"], why: "Éthanol → acide acétique." },
    ],
    "La transformation des céréales locales": [
      { qcm: "Le thiéré est…", choices: ["*un couscous de mil", "un jus de fruit", "un poisson séché"], why: "Produit roulé." },
      { qcm: "L’opération qui forme des granules de farine humidifiée est…", choices: ["*le roulage", "le pressage", "la distillation"], why: "Thiéré, arraw, thiakry." },
      { qcm: "Incorporer de la farine de mil dans le pain permet de…", choices: ["*réduire les importations de blé", "augmenter le prix du pain", "supprimer la cuisson"], why: "Valorisation locale." },
    ],
    "La transformation des fruits et légumes": [
      { qcm: "Le °Brix mesure…", choices: ["*la teneur en sucres solubles", "l’acidité", "la température"], why: "Réfractomètre." },
      { qcm: "Dans une confiture, la conservation est surtout due…", choices: ["*à la forte teneur en sucre et à la cuisson", "au froid", "au sel"], why: "Sucre et chaleur." },
      { qcm: "Les jus de bissap vendus en bouteille doivent être…", choices: ["*pasteurisés", "fermentés", "salés"], why: "Sécurité sanitaire." },
    ],
    "Emballage, étiquetage et contrôle qualité": [
      { qcm: "L’organisme sénégalais qui élabore les normes est…", choices: ["*l’ASN", "l’ISRA", "la BCEAO"], why: "Association sénégalaise de normalisation." },
      { qcm: "Une mention obligatoire de l’étiquette :", choices: ["*la liste des ingrédients", "le prénom du vendeur", "la météo"], why: "Information du consommateur." },
      { qcm: "La DLC s’applique surtout aux produits…", choices: ["*très périssables", "secs", "en conserve"], why: "Date limite de consommation." },
    ],
  },
};

/** Nouveaux chapitres de maths de 1re (séries G et T). */
export const MATH_1RE_SERIES_EXERCISES: Record<string, ExerciseSpec[]> = {
  "Probabilités : premières notions": [
    { qcm: "Probabilité d’obtenir un nombre pair avec un dé équilibré :", choices: ["1/3", "*1/2", "1/6"], why: "3 issues favorables sur 6." },
    { num: "P(A) = 0,3. Calcule P(Ā).", answer: 0.7, why: "1 − 0,3." },
    { num: "A et B incompatibles, P(A) = 0,2, P(B) = 0,5 : P(A ∪ B) ?", answer: 0.7, why: "Somme des probabilités." },
  ],
  "Mathématiques financières : intérêts et escompte": [
    { num: "Intérêt simple (F) de 500 000 F placés 3 ans à 6 % ?", answer: 90000, why: "500 000 × 6 × 3 ÷ 100." },
    { num: "Escompte (F) d’un effet de 1 000 000 F à 60 jours au taux de 9 % ?", answer: 15000, why: "1 000 000 × 9 × 60 ÷ 36 000." },
    { qcm: "À intérêts composés, la suite des valeurs acquises est…", choices: ["arithmétique", "*géométrique", "constante"], why: "Raison 1 + i." },
  ],
  "Nombres complexes": [
    { qcm: "i² =", choices: ["1", "*−1", "i"], why: "Définition de i." },
    { qcm: "(2 + 3i)(1 − i) =", choices: ["*5 + i", "2 − 3i", "−1 + 5i"], why: "2 − 2i + 3i + 3." },
    { qcm: "Le module de 3 + 4i est…", choices: ["7", "*5", "25"], why: "√(9 + 16)." },
  ],
};

/** Nouveaux chapitres de maths de Terminale (série G). */
export const MATH_TLE_SERIES_EXERCISES: Record<string, ExerciseSpec[]> = {
  "Calcul matriciel et programmation linéaire": [
    { num: "Déterminant de la matrice (2 1 ; 1 −1) ?", answer: -3, why: "2 × (−1) − 1 × 1." },
    { qcm: "Une matrice carrée est inversible si…", choices: ["*son déterminant n’est pas nul", "elle a des zéros", "elle est symétrique"], why: "Critère d’inversibilité." },
    { qcm: "Dans le simplexe, on ajoute à chaque contrainte…", choices: ["*une variable d’écart", "une matrice", "une asymptote"], why: "Forme standard." },
  ],
  "Mathématiques financières : annuités et emprunts": [
    { num: "Valeur acquise (F) de 3 annuités de 100 000 F à 10 % ?", answer: 331000, why: "100 000 × (1,1³ − 1) ÷ 0,1." },
    { num: "Emprunt de 1 000 000 F à 10 % : intérêt (F) de la première année ?", answer: 100000, why: "1 000 000 × 0,1." },
    { qcm: "Chaque annuité d’un emprunt se compose…", choices: ["*de l’intérêt et de l’amortissement du capital", "seulement de l’intérêt", "seulement du capital"], why: "Tableau d’amortissement." },
  ],
};
