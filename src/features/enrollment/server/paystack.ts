import type { InitPaystackPaymentResult, VerifyPaymentResult } from "@/features/_shared/types";
import { initializePaystackTransaction, verifyPaystackTransaction } from "@/lib/server/paystack";

export async function initPaystackPayment(programSlug: string): Promise<InitPaystackPaymentResult> {
  return initializePaystackTransaction(`student+${programSlug}@example.com`, 150000);
}

export async function verifyPayment(reference: string): Promise<VerifyPaymentResult> {
  const tx = await verifyPaystackTransaction(reference);
  return { reference: tx.reference, status: tx.status, enrolled: tx.status === "success" };
}
