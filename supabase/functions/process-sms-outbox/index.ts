// Vide la file private.sms_outbox (validation parentale…). Appelée chaque minute par pg_cron + pg_net.
// Le jeton du lien est effacé de la base dès que le SMS est parti.
import postgres from "npm:postgres@3.4.5";
import { sendSms } from "../_shared/sms.ts";

const sql = postgres(Deno.env.get("SUPABASE_DB_URL")!, { prepare: false });
const siteUrl = Deno.env.get("SITE_URL") ?? "https://diangal.sn";

const TEMPLATES: Record<string, (params: Record<string, string>) => string> = {
  parental_consent: (p) =>
    `DIANGAL : ${p.child} vous demande de valider son compte scolaire. Ouvrez ${siteUrl}/consentement/${p.token} (valable 7 jours).`,
};

Deno.serve(async (request) => {
  if (request.headers.get("Authorization") !== `Bearer ${Deno.env.get("OUTBOX_CRON_SECRET")}`) {
    return new Response("Non autorisé", { status: 401 });
  }

  const rows = await sql<{ id: number; phone: string; template: string; params: Record<string, string> }[]>`
    select id, phone, template, params from private.sms_outbox
    where sent_at is null order by id limit 20 for update skip locked`;

  let sent = 0;
  for (const row of rows) {
    const render = TEMPLATES[row.template];
    if (!render) continue;
    try {
      await sendSms(row.phone, render(row.params));
      await sql`update private.sms_outbox set sent_at = now(), params = params - 'token' where id = ${row.id}`;
      sent += 1;
    } catch (error) {
      console.error(`SMS ${row.id} non envoyé :`, String(error));
    }
  }
  return new Response(JSON.stringify({ sent, pending: rows.length - sent }), { headers: { "Content-Type": "application/json" } });
});
