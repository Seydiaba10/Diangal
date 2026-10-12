// Send SMS Hook de Supabase Auth : envoie le code de connexion sur WhatsApp si l'utilisateur l'a
// choisi (private.otp_channels, noté par le serveur Next juste avant), sinon par SMS
// (API Orange, repli Twilio). Si WhatsApp échoue, le code part par SMS.
import postgres from "npm:postgres@3.4.5";
import { Webhook } from "npm:standardwebhooks@1.0.0";
import { sendSms } from "../_shared/sms.ts";
import { sendWhatsAppCode } from "../_shared/whatsapp.ts";

const hookSecret = (Deno.env.get("SEND_SMS_HOOK_SECRET") ?? "").replace("v1,whsec_", "");
const sql = postgres(Deno.env.get("SUPABASE_DB_URL")!, { prepare: false });

async function channelFor(phone: string): Promise<"sms" | "whatsapp"> {
  try {
    const [row] = await sql<{ channel: "sms" | "whatsapp" }[]>`select private.otp_channel_for(${phone}) as channel`;
    return row?.channel ?? "sms";
  } catch (error) {
    console.warn("Canal introuvable, envoi par SMS :", String(error));
    return "sms";
  }
}

Deno.serve(async (request) => {
  const payload = await request.text();
  let data: { user: { phone: string }; sms: { otp: string } };
  try {
    // Vérifie la signature : seul Supabase Auth peut déclencher un envoi (et donc une dépense).
    data = new Webhook(hookSecret).verify(payload, Object.fromEntries(request.headers)) as typeof data;
  } catch {
    return new Response(JSON.stringify({ error: { http_code: 401, message: "Signature invalide" } }), { status: 401 });
  }

  const phone = data.user.phone.startsWith("+") ? data.user.phone : `+${data.user.phone}`;
  if ((await channelFor(phone)) === "whatsapp") {
    try {
      await sendWhatsAppCode(phone, data.sms.otp);
      return new Response("{}", { headers: { "Content-Type": "application/json" } });
    } catch (error) {
      console.warn("WhatsApp indisponible, repli SMS :", String(error));
    }
  }
  try {
    await sendSms(phone, `DIANGAL : votre code est ${data.sms.otp}. Ne le partagez avec personne.`);
    return new Response("{}", { headers: { "Content-Type": "application/json" } });
  } catch (error) {
    console.error("Échec d'envoi du SMS :", String(error));
    return new Response(JSON.stringify({ error: { http_code: 502, message: "Envoi du code impossible" } }), { status: 502 });
  }
});
