// Send SMS Hook de Supabase Auth : envoie le code de connexion par l'API Orange (repli Twilio).
import { Webhook } from "npm:standardwebhooks@1.0.0";
import { sendSms } from "../_shared/sms.ts";

const hookSecret = (Deno.env.get("SEND_SMS_HOOK_SECRET") ?? "").replace("v1,whsec_", "");

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
  try {
    await sendSms(phone, `DIANGAL : votre code est ${data.sms.otp}. Ne le partagez avec personne.`);
    return new Response("{}", { headers: { "Content-Type": "application/json" } });
  } catch (error) {
    console.error("Échec d'envoi du SMS :", String(error));
    return new Response(JSON.stringify({ error: { http_code: 502, message: "Envoi du SMS impossible" } }), { status: 502 });
  }
});
