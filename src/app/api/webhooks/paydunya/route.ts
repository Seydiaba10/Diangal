import { NextResponse } from "next/server";
import { parsePaydunyaCallback, paydunyaFromEnv, verifyPaydunyaHash } from "@/lib/payments/paydunya";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

const CHANNELS = new Set(["wave", "orange_money", "free_money", "card"]);

/**
 * Webhook (IPN) PayDunya :
 * 1. vérifie la signature ;
 * 2. relit le statut auprès de PayDunya (le contenu du webhook n'est jamais cru seul) ;
 * 3. journalise l'événement (UNIQUE → idempotent) ;
 * 4. applique le paiement en base (prolongation du pass, notification).
 */
export async function POST(request: Request) {
  const provider = paydunyaFromEnv();
  const masterKey = process.env.PAYDUNYA_MASTER_KEY ?? "";
  if (!provider || !process.env.SUPABASE_SECRET_KEY) {
    return NextResponse.json({ error: "payments_not_configured" }, { status: 503 });
  }

  const form = new URLSearchParams(await request.text());
  const { hash, token } = parsePaydunyaCallback(form);
  if (!verifyPaydunyaHash(hash, masterKey) || !token) {
    return NextResponse.json({ error: "invalid_signature" }, { status: 401 });
  }

  const confirmed = await provider.getStatus(token);
  if (!confirmed.reference) return NextResponse.json({ error: "unknown_reference" }, { status: 422 });

  const supabase = createSupabaseAdminClient();
  const eventId = `${token}:${confirmed.status}`;
  const { error: eventError } = await supabase.from("payment_events").insert({
    provider: "paydunya",
    event_id: eventId,
    payload: { token, status: confirmed.status, reference: confirmed.reference },
  });
  if (eventError && eventError.code !== "23505") return NextResponse.json({ error: "storage_failed" }, { status: 500 });
  if (eventError) {
    // Événement déjà reçu : rien à rejouer s'il a été traité. Sinon (échec précédent),
    // on réessaie : apply_payment_event est lui-même idempotent.
    const { data: previous } = await supabase
      .from("payment_events")
      .select("processed_at")
      .eq("provider", "paydunya")
      .eq("event_id", eventId)
      .maybeSingle();
    if (previous?.processed_at) return NextResponse.json({ ok: true, duplicate: true });
  }

  if (confirmed.status === "pending") return NextResponse.json({ ok: true, pending: true });

  const channel = form.get("data[customer][payment_method]");
  const { error } = await supabase.rpc("apply_payment_event", {
    p_reference: confirmed.reference,
    p_provider_ref: token,
    p_status: confirmed.status,
    p_channel: channel && CHANNELS.has(channel) ? (channel as "wave" | "orange_money" | "free_money" | "card") : undefined,
  });
  if (error) return NextResponse.json({ error: "apply_failed" }, { status: 500 });

  await supabase
    .from("payment_events")
    .update({ processed_at: new Date().toISOString() })
    .eq("provider", "paydunya")
    .eq("event_id", eventId);
  return NextResponse.json({ ok: true });
}
