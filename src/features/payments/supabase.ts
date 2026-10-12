import "server-only";

import { cacheLife, cacheTag } from "next/cache";
import { createSupabasePublicClient } from "@/lib/supabase/public";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { PaymentChannel, PaymentRecord, Plan, PlanCode } from "@/types/domain";

// Paiements Supabase : offres (plans, publiques), paiements (lecture des siens ; tous pour l'admin).

/** Offres actives : contenu public, mis en cache. */
export async function loadPlans(): Promise<(Plan & { name: string })[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("plans");
  const { data, error } = await createSupabasePublicClient()
    .from("plans")
    .select("code, name, price_fcfa, duration_days")
    .eq("is_active", true)
    .order("sort_order");
  if (error) throw new Error(`offres : ${error.message}`);
  return data.map((p) => ({ code: p.code as PlanCode, name: p.name, priceFcfa: p.price_fcfa, durationDays: p.duration_days }));
}

const CHANNELS: PaymentChannel[] = ["wave", "orange_money", "free_money", "card"];

function toRecord(p: {
  id: string;
  reference: string;
  amount_fcfa: number;
  channel: string | null;
  status: string;
  created_at: string;
  plans: { code: string } | null;
  payer: { first_name: string; last_name: string } | null;
  beneficiary: { first_name: string; last_name: string } | null;
}): PaymentRecord {
  const name = (who: { first_name: string; last_name: string } | null) => (who ? `${who.first_name} ${who.last_name}` : "");
  return {
    id: p.id,
    reference: p.reference,
    payerName: name(p.payer),
    beneficiaryName: name(p.beneficiary),
    planCode: (p.plans?.code ?? "monthly") as PlanCode,
    amountFcfa: p.amount_fcfa,
    channel: CHANNELS.includes(p.channel as PaymentChannel) ? (p.channel as PaymentChannel) : "card",
    status: p.status === "succeeded" ? "succeeded" : p.status === "pending" ? "pending" : "failed",
    createdAt: p.created_at,
  };
}

const PAYMENT_COLUMNS =
  "id, reference, amount_fcfa, channel, status, created_at, plans(code), payer:profiles!payments_payer_id_fkey(first_name, last_name), beneficiary:profiles!payments_beneficiary_id_fkey(first_name, last_name)";

/** Paiement par référence (RLS : le payeur ou l'admin). */
export async function fetchPaymentByReference(reference: string): Promise<PaymentRecord | undefined> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.from("payments").select(PAYMENT_COLUMNS).eq("reference", reference.slice(0, 40)).maybeSingle();
  return data ? toRecord(data) : undefined;
}

/** Tous les paiements (RLS : l'admin voit tout, un payeur voit les siens). */
export async function fetchPayments(limit = 200): Promise<PaymentRecord[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.from("payments").select(PAYMENT_COLUMNS).order("created_at", { ascending: false }).limit(limit);
  if (error) throw new Error(`paiements : ${error.message}`);
  return data.map(toRecord);
}
