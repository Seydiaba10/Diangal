// Techniques de gestion de la série G (1re et Terminale) : comptabilité (SYSCOHADA), étude de cas,
// correspondance commerciale, informatique de gestion. Chapitres INDICATIFS, établis d’après la liste des
// épreuves du Bac de la série G ; programme officiel non trouvé en ligne. Leçons rédigées par DIANGAL, à
// faire valider par un professeur de gestion.

import { type ChapterSpec, exemple, formula, liste, methode, retenir, tableau } from "../tle/blocks";

const COMPTA = "Comptabilité";
const CAS = "Étude de cas";
const PRATIQUE = "Pratique professionnelle";

export const GEST_1RE: ChapterSpec[] = [
  {
    title: "L’entreprise et son environnement",
    summary: "Définition, classification et formes juridiques des entreprises ; fonctions de l’entreprise.",
    strand: CAS,
    lessons: [
      {
        title: "Qu’est-ce qu’une entreprise ?",
        minutes: 12,
        body: `${liste([
            "une entreprise combine des moyens humains, matériels et financiers pour produire des biens ou des services et les vendre ;",
            "classification : par taille (TPE, PME, grandes entreprises), par secteur, par forme juridique ;",
            "formes du droit OHADA : entreprise individuelle, SARL, SA, GIE ;",
            "fonctions : approvisionnement, production, commercialisation, gestion du personnel, finance.",
          ])}`,
      },
    ],
  },
  {
    title: "Le patrimoine et le bilan",
    summary: "Emplois et ressources, actif et passif, présentation du bilan.",
    strand: COMPTA,
    lessons: [
      {
        title: "Le bilan",
        minutes: 15,
        body: `${tableau([
            ["Actif (emplois)", "Passif (ressources)"],
            ["actif immobilisé : terrains, bâtiments, matériel", "capitaux propres : capital, résultat"],
            ["actif circulant : stocks, créances clients", "dettes financières (emprunts)"],
            ["trésorerie-actif : banque, caisse", "passif circulant : fournisseurs, État"],
          ])}
          ${retenir("Le bilan est toujours équilibré : total de l’actif = total du passif.")}`,
      },
    ],
  },
  {
    title: "Les comptes et la partie double",
    summary: "Le compte, ses règles de fonctionnement, le principe de la partie double.",
    strand: COMPTA,
    lessons: [
      {
        title: "Débit et crédit",
        minutes: 15,
        body: `${liste([
            "un compte a deux colonnes : le <strong>débit</strong> (à gauche) et le <strong>crédit</strong> (à droite) ;",
            "un compte d’actif augmente au débit ; un compte de passif augmente au crédit ;",
            "les charges s’enregistrent au débit, les produits au crédit ;",
            "<strong>partie double</strong> : chaque opération touche au moins deux comptes, pour le même montant au débit et au crédit.",
          ])}
          ${exemple(["Achat de marchandises payé par chèque (100 000 F) : débit 601 Achats de marchandises, crédit 521 Banques."])}`,
      },
    ],
  },
  {
    title: "Le plan comptable SYSCOHADA",
    summary: "Les classes de comptes et les principaux comptes.",
    strand: COMPTA,
    lessons: [
      {
        title: "Les classes de comptes",
        minutes: 15,
        body: `${tableau([
            ["Classe", "Contenu", "Exemples"],
            ["1", "ressources durables", "101 Capital social"],
            ["2", "actif immobilisé", "24 Matériel"],
            ["3", "stocks", "31 Marchandises"],
            ["4", "tiers", "401 Fournisseurs, 411 Clients"],
            ["5", "trésorerie", "521 Banques, 571 Caisse"],
            ["6", "charges des activités ordinaires", "601 Achats de marchandises"],
            ["7", "produits des activités ordinaires", "701 Ventes de marchandises"],
            ["8", "autres charges et produits (HAO)", "—"],
          ])}
          ${retenir("Le SYSCOHADA est le système comptable commun aux pays de l’OHADA, dont le Sénégal.")}`,
      },
    ],
  },
  {
    title: "Journal, grand livre et balance",
    summary: "Enregistrer les opérations, reporter dans les comptes, vérifier par la balance.",
    strand: COMPTA,
    lessons: [
      {
        title: "La chaîne comptable",
        minutes: 15,
        body: `${methode([
            "Enregistrer chaque opération dans le journal, par ordre chronologique, avec la date, les comptes, le libellé et les montants.",
            "Reporter les écritures dans les comptes du grand livre.",
            "Calculer le solde de chaque compte (débiteur ou créditeur).",
            "Dresser la balance : le total des débits égale le total des crédits.",
          ])}`,
      },
    ],
  },
  {
    title: "La facturation et la TVA",
    summary: "Réductions commerciales et financières, TVA, montant TTC.",
    strand: COMPTA,
    lessons: [
      {
        title: "Établir une facture",
        minutes: 15,
        body: `${liste([
            "réductions commerciales : rabais (défaut de qualité), remise (quantité), ristourne (chiffre d’affaires annuel) ;",
            "réduction financière : l’escompte, pour paiement rapide ;",
            "au Sénégal, le taux normal de la TVA est de 18 %.",
          ])}
          ${formula("Net commercial = prix brut − réductions ; TVA = net × 18 % ; TTC = net + TVA")}
          ${exemple(["Brut 100 000 F, remise 10 % : net 90 000 F ; TVA 16 200 F ; TTC 106 200 F."])}`,
      },
    ],
  },
  {
    title: "La correspondance commerciale",
    summary: "La lettre commerciale et les documents commerciaux.",
    strand: PRATIQUE,
    lessons: [
      {
        title: "Rédiger une lettre commerciale",
        minutes: 12,
        body: `${liste([
            "en-tête de l’expéditeur, destinataire, lieu et date, références, objet ;",
            "formule d’appel (Monsieur, Madame), corps de la lettre en paragraphes courts, formule de politesse, signature ;",
            "documents courants : demande de prix, bon de commande, bon de livraison, facture, lettre de relance.",
          ])}
          ${retenir("Une lettre commerciale est claire, précise, courtoise et sans faute.")}`,
      },
    ],
  },
];

export const GEST_TLE: ChapterSpec[] = [
  {
    title: "Les amortissements",
    summary: "Dépréciation des immobilisations, amortissement linéaire, valeur nette comptable.",
    strand: COMPTA,
    lessons: [
      {
        title: "L’amortissement linéaire",
        minutes: 15,
        body: `${formula("Annuité = valeur d’origine × taux ; taux = 100 ÷ durée d’utilisation")}
          ${liste(["l’amortissement constate la perte de valeur d’une immobilisation due à l’usure ou au temps ;", "valeur nette comptable (VNC) = valeur d’origine − cumul des amortissements."])}
          ${exemple(["Machine de 3 000 000 F amortie en 5 ans : taux 20 %, annuité 600 000 F ; VNC après 2 ans : 1 800 000 F."])}`,
      },
    ],
  },
  {
    title: "Les travaux de fin d’exercice",
    summary: "Inventaire, dépréciations des stocks et des créances, régularisations.",
    strand: COMPTA,
    lessons: [
      {
        title: "Inventaire et régularisations",
        minutes: 15,
        body: `${liste([
            "à la fin de l’exercice, on fait l’inventaire des biens, des créances et des dettes ;",
            "on constate les dépréciations (créances douteuses, stocks abîmés) ;",
            "on rattache chaque charge et chaque produit au bon exercice (charges constatées d’avance, produits à recevoir) ;",
            "on peut alors établir le bilan et le compte de résultat.",
          ])}`,
      },
    ],
  },
  {
    title: "Le compte de résultat et les soldes significatifs",
    summary: "Charges, produits, marge commerciale, valeur ajoutée, résultat.",
    strand: COMPTA,
    lessons: [
      {
        title: "Lire le compte de résultat",
        minutes: 15,
        body: `${formula("Résultat = produits − charges")}
          ${liste([
            "marge commerciale = ventes de marchandises − coût d’achat des marchandises vendues ;",
            "valeur ajoutée = production et marge − consommations venant des tiers ;",
            "excédent brut d’exploitation = valeur ajoutée − charges de personnel − impôts et taxes (+ subventions d’exploitation).",
          ])}
          ${exemple(["Ventes 8 000 000 F, coût d’achat des marchandises vendues 5 000 000 F : marge commerciale 3 000 000 F."])}`,
      },
    ],
  },
  {
    title: "L’analyse du bilan",
    summary: "Fonds de roulement, besoin en fonds de roulement, trésorerie nette, ratios.",
    strand: CAS,
    lessons: [
      {
        title: "L’équilibre financier",
        minutes: 15,
        body: `${formula("FR = ressources stables − emplois stables ; trésorerie nette = FR − BFR")}
          ${liste(["le besoin en fonds de roulement (BFR) vient des stocks et des créances clients non couverts par les dettes fournisseurs ;", "si le FR couvre le BFR, la trésorerie est positive ;", "ratios : liquidité, autonomie financière, endettement."])}
          ${exemple(["FR 4 000 000 F et BFR 3 000 000 F : trésorerie nette 1 000 000 F."])}`,
      },
    ],
  },
  {
    title: "Coûts et seuil de rentabilité",
    summary: "Charges fixes et variables, marge sur coût variable, seuil de rentabilité.",
    strand: CAS,
    lessons: [
      {
        title: "Le seuil de rentabilité",
        minutes: 15,
        body: `${formula("MCV = chiffre d’affaires − charges variables ; seuil de rentabilité = charges fixes ÷ taux de MCV")}
          ${exemple(["CA 10 000 000 F, charges variables 6 000 000 F, charges fixes 2 000 000 F : MCV 4 000 000 F, taux 40 %, seuil de rentabilité 5 000 000 F. Au-delà, l’entreprise fait des bénéfices."])}`,
      },
    ],
  },
  {
    title: "La gestion des stocks",
    summary: "Fiche de stock, coût moyen unitaire pondéré, stock de sécurité.",
    strand: CAS,
    lessons: [
      {
        title: "Valoriser les stocks",
        minutes: 15,
        body: `${liste([
            "la fiche de stock suit les entrées, les sorties et le stock restant ;",
            "coût moyen unitaire pondéré (CMUP) = (valeur du stock initial + valeur des entrées) ÷ (quantité initiale + quantités entrées) ;",
            "le stock de sécurité évite la rupture ; le stock d’alerte déclenche une commande.",
          ])}
          ${exemple(["Stock initial 100 unités à 1 000 F, entrée de 300 unités à 1 200 F : CMUP = (100 000 + 360 000) ÷ 400 = 1 150 F."])}`,
      },
    ],
  },
  {
    title: "Le budget de trésorerie",
    summary: "Prévoir les encaissements et les décaissements.",
    strand: CAS,
    lessons: [
      {
        title: "Prévoir la trésorerie",
        minutes: 12,
        body: `${methode(["Lister les encaissements prévus mois par mois (ventes au comptant, règlements des clients).", "Lister les décaissements prévus (achats, salaires, loyers, impôts, remboursements).", "Calculer la trésorerie de fin de mois = trésorerie initiale + encaissements − décaissements.", "Prévoir un financement si la trésorerie devient négative."])}`,
      },
    ],
  },
  {
    title: "L’informatique de gestion",
    summary: "Tableur, logiciels de gestion, sécurité des données.",
    strand: PRATIQUE,
    lessons: [
      {
        title: "Le tableur au service de la gestion",
        minutes: 12,
        body: `${liste([
            "une cellule se repère par sa colonne et sa ligne (B4) ; une formule commence par = ;",
            "=SOMME(B2:B10) additionne une plage ; =B2*18% calcule une TVA ;",
            "les logiciels comptables et de facturation automatisent les écritures ;",
            "sauvegarder régulièrement et protéger les données par des mots de passe.",
          ])}`,
      },
    ],
  },
];
