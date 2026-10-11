// Interface commune des prestataires de paiement : PayDunya aujourd'hui, Wave en direct ensuite.

export interface CheckoutRequest {
  reference: string;
  amountFcfa: number;
  description: string;
  returnUrl: string;
  cancelUrl: string;
  callbackUrl: string;
}

export interface CheckoutSession {
  /** Page de paiement du prestataire (ou lien qui ouvre l'application Wave). */
  checkoutUrl: string;
  providerRef: string;
}

export type ProviderStatus = "pending" | "succeeded" | "failed" | "cancelled";

export interface ProviderPaymentStatus {
  status: ProviderStatus;
  reference: string | null;
  amountFcfa: number | null;
}

export interface PaymentProvider {
  readonly name: "paydunya" | "wave";
  createCheckout(request: CheckoutRequest): Promise<CheckoutSession>;
  /** Statut lu auprès du prestataire : seule source de vérité (jamais le contenu du webhook seul). */
  getStatus(providerRef: string): Promise<ProviderPaymentStatus>;
}
