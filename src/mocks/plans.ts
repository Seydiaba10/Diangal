// Offres Premium fictives (prix en FCFA, hypothèses à valider). Pass prépayés :
// le mobile money ne gère pas le prélèvement automatique.

import type { Plan } from "@/types/domain";

export const MOCK_PLANS: Plan[] = [
  { code: "monthly", priceFcfa: 2000, durationDays: 30 },
  { code: "quarterly", priceFcfa: 5000, durationDays: 90 },
  { code: "yearly", priceFcfa: 15000, durationDays: 365 },
  { code: "bfem_pass", priceFcfa: 7500, durationDays: 270 },
];
