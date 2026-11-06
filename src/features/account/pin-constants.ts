// Constantes de la connexion par code PIN, partagées par les pages et les actions serveur.

/** Code PIN de démonstration (aucun compte réel en mode démo). */
export const DEMO_PIN = "246813";

/** Pourquoi le visiteur choisit un code PIN : à l’inscription, ou après « Code PIN oublié ». */
export type PinReason = "inscription" | "recuperation";
