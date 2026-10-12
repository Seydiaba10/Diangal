// Code de connexion par WhatsApp : API WhatsApp Cloud de Meta, modèle « authentification »
// (texte imposé par Meta, avec un bouton « Copier le code »). Code Deno (fonctions Edge Supabase).

/** Envoie le code à 6 chiffres sur WhatsApp à un numéro sénégalais (+221…). */
export async function sendWhatsAppCode(to: string, code: string): Promise<void> {
  if (!/^\+221[0-9]{9}$/.test(to)) throw new Error("only_senegal_numbers");
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
