// Offres Premium fictives (prix en FCFA, hypothèses à valider). Pass prépayés :
// le mobile money ne gère pas le prélèvement automatique.

import type { Plan } from "@/types/domain";

export const MOCK_PLANS: Plan[] = [
  { code: "monthly", priceFcfa: 2000, durationDays: 30 },
  { code: "quarterly", priceFcfa: 5000, durationDays: 90 },
  { code: "yearly", priceFcfa: 15000, durationDays: 365 },
  // Formule Famille : jusqu'à 4 enfants reliés au parent qui paie.
  { code: "family_monthly", priceFcfa: 5000, durationDays: 30, maxChildren: 4 },
  { code: "family_quarterly", priceFcfa: 12000, durationDays: 90, maxChildren: 4 },
  { code: "family_yearly", priceFcfa: 35000, durationDays: 365, maxChildren: 4 },
];
