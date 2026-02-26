import { NextResponse } from "next/server";
import { verifyPaystackWebhookSignature } from "@/lib/server/paystack";

export async function POST(req: Request) {
  const raw = await req.text();
  const signature = req.headers.get("x-paystack-signature");
  const valid = verifyPaystackWebhookSignature(raw, signature);
  if (!valid) {
    return NextResponse.json({ ok: false, error: { code: "INVALID_SIGNATURE", message: "Invalid webhook signature" } }, { status: 401 });
  }
  return NextResponse.json({ ok: true, data: { processed: true } });
}
