// Envoi de SMS : API SMS Orange Sénégal, repli Twilio. Code Deno (fonctions Edge Supabase).
import { isAllowedPhone } from "./phone.ts";

/** Retire les accents : un SMS en GSM-7 tient en 160 caractères (70 en UCS-2, donc deux fois plus cher). */
export function toGsm7(text: string): string {
  return text.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[’‘]/g, "'").replace(/[«»“”]/g, '"');
}

let orangeToken: { value: string; expiresAt: number } | null = null;

async function orangeAccessToken(): Promise<string> {
  if (orangeToken && orangeToken.expiresAt > Date.now() + 60_000) return orangeToken.value;
  const credentials = btoa(`${Deno.env.get("ORANGE_SMS_CLIENT_ID")}:${Deno.env.get("ORANGE_SMS_CLIENT_SECRET")}`);
  const response = await fetch("https://api.orange.com/oauth/v3/token", {
    method: "POST",
    headers: { Authorization: `Basic ${credentials}`, "Content-Type": "application/x-www-form-urlencoded" },
    body: "grant_type=client_credentials",
  });
  if (!response.ok) throw new Error(`orange_token_${response.status}`);
  const json = await response.json();
  orangeToken = { value: json.access_token, expiresAt: Date.now() + json.expires_in * 1000 };
  return orangeToken.value;
}

async function sendWithOrange(to: string, message: string) {
  const sender = Deno.env.get("ORANGE_SMS_SENDER_PHONE")!;
  const response = await fetch(
    `https://api.orange.com/smsmessaging/v1/outbound/${encodeURIComponent(`tel:${sender}`)}/requests`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${await orangeAccessToken()}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        outboundSMSMessageRequest: {
          address: `tel:${to}`,
          senderAddress: `tel:${sender}`,
          senderName: "DIANGAL",
          outboundSMSTextMessage: { message },
        },
      }),
    },
  );
  if (!response.ok) throw new Error(`orange_send_${response.status}`);
}

async function sendWithTwilio(to: string, message: string) {
  const sid = Deno.env.get("TWILIO_ACCOUNT_SID");
  const token = Deno.env.get("TWILIO_AUTH_TOKEN");
  if (!sid || !token) throw new Error("twilio_not_configured");
  const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
    method: "POST",
    headers: { Authorization: `Basic ${btoa(`${sid}:${token}`)}`, "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ To: to, From: Deno.env.get("TWILIO_FROM")!, Body: message }),
  });
  if (!response.ok) throw new Error(`twilio_send_${response.status}`);
}

/**
 * Envoie un SMS (numéro E.164 d'un pays ouvert) : Orange pour le Sénégal, Twilio en repli et
 * pour l'étranger. Lève une erreur si aucun fournisseur n'a pu l'envoyer.
 */
export async function sendSms(to: string, text: string): Promise<"orange" | "twilio"> {
  if (!isAllowedPhone(to)) throw new Error("country_not_allowed");
  const message = toGsm7(text);
  if (!to.startsWith("+221")) {
    await sendWithTwilio(to, message);
    return "twilio";
  }
  try {
    await sendWithOrange(to, message);
    return "orange";
  } catch (error) {
    console.warn("Orange SMS indisponible, repli Twilio :", String(error));
    await sendWithTwilio(to, message);
    return "twilio";
  }
}
