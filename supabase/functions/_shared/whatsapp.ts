// Code de connexion par WhatsApp : API WhatsApp Cloud de Meta, modèle « authentification »
// (texte imposé par Meta, avec un bouton « Copier le code »). Code Deno (fonctions Edge Supabase).
import { isAllowedPhone } from "./phone.ts";

/** Envoie le code à 6 chiffres sur WhatsApp (numéro E.164 d'un pays ouvert). */
export async function sendWhatsAppCode(to: string, code: string): Promise<void> {
  if (!isAllowedPhone(to)) throw new Error("country_not_allowed");
  const token = Deno.env.get("WHATSAPP_TOKEN");
  const phoneNumberId = Deno.env.get("WHATSAPP_PHONE_NUMBER_ID");
  if (!token || !phoneNumberId) throw new Error("whatsapp_not_configured");
  const version = Deno.env.get("WHATSAPP_GRAPH_VERSION") ?? "v23.0";

  const response = await fetch(`https://graph.facebook.com/${version}/${phoneNumberId}/messages`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: to.slice(1),
      type: "template",
      template: {
        name: Deno.env.get("WHATSAPP_TEMPLATE") ?? "diangal_code",
        language: { code: "fr" },
        components: [
          { type: "body", parameters: [{ type: "text", text: code }] },
          // Bouton « Copier le code » du modèle d'authentification.
          { type: "button", sub_type: "url", index: "0", parameters: [{ type: "text", text: code }] },
        ],
      },
    }),
  });
  if (!response.ok) throw new Error(`whatsapp_send_${response.status}`);
}
