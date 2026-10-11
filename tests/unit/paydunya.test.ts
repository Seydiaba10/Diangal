import { createHash } from "node:crypto";
import { describe, expect, it, vi } from "vitest";
import { createPaydunyaProvider, parsePaydunyaCallback, verifyPaydunyaHash } from "@/lib/payments/paydunya";

const CONFIG = { mode: "test" as const, masterKey: "master-123", privateKey: "priv", token: "tok", storeName: "DIANGAL" };

describe("verifyPaydunyaHash", () => {
  it("accepte uniquement le SHA-512 de la clé principale", () => {
    const good = createHash("sha512").update("master-123").digest("hex");
    expect(verifyPaydunyaHash(good, "master-123")).toBe(true);
    expect(verifyPaydunyaHash(good.toUpperCase(), "master-123")).toBe(true);
    expect(verifyPaydunyaHash(good, "autre-cle")).toBe(false);
    expect(verifyPaydunyaHash("abc", "master-123")).toBe(false);
    expect(verifyPaydunyaHash(null, "master-123")).toBe(false);
  });
});

describe("parsePaydunyaCallback", () => {
  it("extrait le hash et le jeton du formulaire IPN", () => {
    const form = new URLSearchParams({ "data[hash]": "h", "data[invoice][token]": "test_abc", "data[status]": "completed" });
    expect(parsePaydunyaCallback(form)).toEqual({ hash: "h", token: "test_abc" });
  });
});

describe("createPaydunyaProvider", () => {
  it("crée une facture avec les bons en-têtes et le montant entier en FCFA", async () => {
    const fetcher = vi.fn(async () => Response.json({ response_code: "00", response_text: "https://paydunya.test/checkout/x", token: "test_x" }));
    const provider = createPaydunyaProvider(CONFIG, fetcher as unknown as typeof fetch);
    const session = await provider.createCheckout({
      reference: "DGL-2610-000001",
      amountFcfa: 5000,
      description: "Pass 3 mois",
      returnUrl: "https://diangal.sn/paiement/retour",
      cancelUrl: "https://diangal.sn/eleve/abonnement",
      callbackUrl: "https://diangal.sn/api/webhooks/paydunya",
    });
    expect(session).toEqual({ checkoutUrl: "https://paydunya.test/checkout/x", providerRef: "test_x" });
    const [url, init] = fetcher.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe("https://app.paydunya.com/sandbox-api/v1/checkout-invoice/create");
    expect((init.headers as Record<string, string>)["PAYDUNYA-MASTER-KEY"]).toBe("master-123");
    const body = JSON.parse(String(init.body));
    expect(body.invoice.total_amount).toBe(5000);
    expect(body.custom_data.reference).toBe("DGL-2610-000001");
  });

  it("refuse un montant non entier", async () => {
    const provider = createPaydunyaProvider(CONFIG, vi.fn() as unknown as typeof fetch);
    await expect(
      provider.createCheckout({ reference: "r", amountFcfa: 99.5, description: "", returnUrl: "", cancelUrl: "", callbackUrl: "" }),
    ).rejects.toThrow(/invalid_amount/);
  });

  it("traduit le statut de confirmation", async () => {
    const fetcher = vi.fn(async () =>
      Response.json({ response_code: "00", status: "completed", invoice: { total_amount: "5000" }, custom_data: { reference: "DGL-1" } }),
    );
    const provider = createPaydunyaProvider(CONFIG, fetcher as unknown as typeof fetch);
    expect(await provider.getStatus("test_x")).toEqual({ status: "succeeded", reference: "DGL-1", amountFcfa: 5000 });
  });
});
