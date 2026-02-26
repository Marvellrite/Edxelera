import crypto from "crypto";
import { env } from "./env";

export type PaystackInitResponse = { authorization_url: string; reference: string };

export async function initializePaystackTransaction(email?: string, amountMinor?: number, reference?: string): Promise<PaystackInitResponse> {
  const ref = reference ?? `pay_${Date.now()}`;
  if (!env.paystackSecretKey) return { authorization_url: `https://checkout.paystack.com/${ref}`, reference: ref };
  const response = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: { Authorization: `Bearer ${env.paystackSecretKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ email: email ?? "student@example.com", amount: amountMinor ?? 0, reference: ref }),
  });
  const data = await response.json();
  return { authorization_url: data.data.authorization_url, reference: data.data.reference };
}

export async function verifyPaystackTransaction(reference: string) {
  if (!env.paystackSecretKey) return { reference, status: "pending" as const, paidAtUtc: new Date().toISOString() };
  const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
    headers: { Authorization: `Bearer ${env.paystackSecretKey}` },
  });
  const data = await response.json();
  const status = data?.data?.status === "success" ? "success" : data?.data?.status === "failed" ? "failed" : "pending";
  return { reference, status, paidAtUtc: data?.data?.paid_at ?? new Date().toISOString() };
}

export function verifyPaystackWebhookSignature(rawBody: string, signature: string | null) {
  if (!signature || !env.paystackWebhookSecret) return false;
  const digest = crypto.createHmac("sha512", env.paystackWebhookSecret).update(rawBody).digest("hex");
  return digest === signature;
}
