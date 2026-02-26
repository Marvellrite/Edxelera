import { NextResponse } from "next/server";
import { initPaystackPayment } from "@/features/enrollment/server/paystack";

export async function POST(req: Request) {
  const body = (await req.json()) as { programSlug?: string };
  if (!body.programSlug) return NextResponse.json({ ok: false, error: { code: "BAD_REQUEST", message: "programSlug is required" } }, { status: 400 });
  const data = await initPaystackPayment(body.programSlug);
  return NextResponse.json({ ok: true, data });
}
