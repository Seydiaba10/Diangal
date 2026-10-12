import { connection } from "next/server";
import { cache } from "react";
import { isSupabaseConfigured } from "@/lib/env";
import { PAYMENTS_HISTORY } from "@/mocks/admin";
import { MOCK_PLANS } from "@/mocks/plans";
import { mockState } from "@/mocks/progress-store";
import type { PaymentChannel, PaymentRecord, Plan } from "@/types/domain";
import { fetchPaymentByReference, fetchPayments, loadPlans } from "./supabase";

// Démo : paiements simulés. Supabase : tables plans / payments ; création via PayDunya,
// confirmation uniquement par le webhook signé.

export const PAYMENT_CHANNELS: PaymentChannel[] = ["wave", "orange_money", "free_money", "card"];

export async function getPlans(): Promise<Plan[]> {
  if (!isSupabaseConfigured()) return MOCK_PLANS;
  return (await loadPlans()).map(({ code, priceFcfa, durationDays }) => ({ code, priceFcfa, durationDays }));
}

/** Prix mensuel le plus bas, affiché sur les murs Premium. */
export async function getStartingMonthlyPrice(): Promise<number> {
  const plans = await getPlans();
  return (plans.find((p) => p.code === "monthly") ?? plans[0])?.priceFcfa ?? 0;
}

export const getPaymentByReference = cache(async (reference: string): Promise<PaymentRecord | undefined> => {
  await connection();
  if (isSupabaseConfigured()) return fetchPaymentByReference(reference);
  return mockState.payments.find((p) => p.reference === reference);
});

export const getAllPayments = cache(async (): Promise<PaymentRecord[]> => {
  await connection();
  if (isSupabaseConfigured()) return fetchPayments();
  return [...mockState.payments, ...PAYMENTS_HISTORY].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
});
