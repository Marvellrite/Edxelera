import { NextResponse } from "next/server";
import { verifyPayment } from "@/features/enrollment/server/paystack";

export async function POST(req: Request) {
  const body = (await req.json()) as { reference?: string };
  if (!body.reference) return NextResponse.json({ ok: false, error: { code: "BAD_REQUEST", message: "reference is required" } }, { status: 400 });
  const data = await verifyPayment(body.reference);
  return NextResponse.json({ ok: true, data });
}
