import { connection } from "next/server";
import { cache } from "react";
import { PAYMENTS_HISTORY } from "@/mocks/admin";
import { MOCK_PLANS } from "@/mocks/plans";
import { mockState } from "@/mocks/progress-store";
import type { PaymentChannel, PaymentRecord, Plan } from "@/types/domain";

// Phase 5 : tables plans / payments ; création via PayDunya, confirmation par webhook.

export const PAYMENT_CHANNELS: PaymentChannel[] = ["wave", "orange_money", "free_money", "card"];

export async function getPlans(): Promise<Plan[]> {
  return MOCK_PLANS;
}

/** Prix mensuel le plus bas, affiché sur les murs Premium. */
export async function getStartingMonthlyPrice(): Promise<number> {
  return MOCK_PLANS.find((p) => p.code === "monthly")!.priceFcfa;
}

export const getPaymentByReference = cache(async (reference: string): Promise<PaymentRecord | undefined> => {
  await connection();
  return mockState.payments.find((p) => p.reference === reference);
});

export const getAllPayments = cache(async (): Promise<PaymentRecord[]> => {
  await connection();
  return [...mockState.payments, ...PAYMENTS_HISTORY].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
});
