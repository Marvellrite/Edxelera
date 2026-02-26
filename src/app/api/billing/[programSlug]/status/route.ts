import { NextResponse } from "next/server";
import { getBillingStatus } from "@/features/enrollment/server/billing-status";

export async function GET(_req: Request, { params }: { params: Promise<{ programSlug: string }> }) {
  const { programSlug } = await params;
  const data = await getBillingStatus(programSlug);
  return NextResponse.json({ ok: true, data });
}
