import { createHash, timingSafeEqual } from "node:crypto";
import type { CheckoutRequest, CheckoutSession, PaymentProvider, ProviderPaymentStatus, ProviderStatus } from "./provider";

// PayDunya (Sénégal) : une intégration pour Wave, Orange Money, Free Money/Yas, Expresso et carte.
// API « checkout-invoice » : création de facture, puis confirmation par jeton.

export interface PaydunyaConfig {
  mode: "test" | "live";
  masterKey: string;
  privateKey: string;
  token: string;
  storeName: string;
}

const BASE_URL = { test: "https://app.paydunya.com/sandbox-api/v1", live: "https://app.paydunya.com/api/v1" };

const STATUS: Record<string, ProviderStatus> = {
  completed: "succeeded",
  pending: "pending",
  cancelled: "cancelled",
  failed: "failed",
};

/**
 * Le webhook (IPN) de PayDunya contient un « hash » : SHA-512 de la clé principale.
 * Comparaison à temps constant pour ne rien laisser deviner.
 */
export function verifyPaydunyaHash(hash: string | null, masterKey: string): boolean {
  if (!hash || !masterKey) return false;
  const expected = createHash("sha512").update(masterKey).digest("hex");
  const a = Buffer.from(hash.toLowerCase());
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

/** Lit l'IPN (formulaire « data[…] ») : on n'en garde que le hash et le jeton de facture. */
export function parsePaydunyaCallback(form: URLSearchParams): { hash: string | null; token: string | null } {
  return { hash: form.get("data[hash]"), token: form.get("data[invoice][token]") };
}

export function createPaydunyaProvider(config: PaydunyaConfig, fetcher: typeof fetch = fetch): PaymentProvider {
  const headers = {
    "Content-Type": "application/json",
    "PAYDUNYA-MASTER-KEY": config.masterKey,
    "PAYDUNYA-PRIVATE-KEY": config.privateKey,
    "PAYDUNYA-TOKEN": config.token,
  };
  const base = BASE_URL[config.mode];

  return {
    name: "paydunya",

    async createCheckout(request: CheckoutRequest): Promise<CheckoutSession> {
      if (!Number.isInteger(request.amountFcfa) || request.amountFcfa <= 0) throw new Error("invalid_amount");
      const response = await fetcher(`${base}/checkout-invoice/create`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          invoice: { total_amount: request.amountFcfa, description: request.description },
          store: { name: config.storeName },
          actions: { return_url: request.returnUrl, cancel_url: request.cancelUrl, callback_url: request.callbackUrl },
          custom_data: { reference: request.reference },
        }),
      });
      const json = (await response.json()) as { response_code?: string; response_text?: string; token?: string };
      if (!response.ok || json.response_code !== "00" || !json.response_text || !json.token) {
        throw new Error(`paydunya_create_failed_${json.response_code ?? response.status}`);
      }
      return { checkoutUrl: json.response_text, providerRef: json.token };
    },

    async getStatus(providerRef: string): Promise<ProviderPaymentStatus> {
      const response = await fetcher(`${base}/checkout-invoice/confirm/${encodeURIComponent(providerRef)}`, { headers });
      const json = (await response.json()) as {
        response_code?: string;
        status?: string;
        invoice?: { total_amount?: number | string };
        custom_data?: { reference?: string };
      };
      if (!response.ok || json.response_code !== "00") throw new Error(`paydunya_confirm_failed_${json.response_code ?? response.status}`);
      return {
        status: STATUS[json.status ?? ""] ?? "pending",
        reference: json.custom_data?.reference ?? null,
        amountFcfa: json.invoice?.total_amount == null ? null : Number(json.invoice.total_amount),
      };
    },
  };
}

/** Prestataire configuré par variables d'environnement, ou null (mode démo). */
export function paydunyaFromEnv(): PaymentProvider | null {
  const { PAYDUNYA_MASTER_KEY, PAYDUNYA_PRIVATE_KEY, PAYDUNYA_TOKEN, PAYDUNYA_MODE } = process.env;
  if (!PAYDUNYA_MASTER_KEY || !PAYDUNYA_PRIVATE_KEY || !PAYDUNYA_TOKEN) return null;
  return createPaydunyaProvider({
    mode: PAYDUNYA_MODE === "live" ? "live" : "test",
    masterKey: PAYDUNYA_MASTER_KEY,
    privateKey: PAYDUNYA_PRIVATE_KEY,
    token: PAYDUNYA_TOKEN,
    storeName: "DIANGAL",
  });
}
