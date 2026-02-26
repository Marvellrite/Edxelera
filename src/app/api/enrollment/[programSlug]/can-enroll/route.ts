import { NextResponse } from "next/server";
import { canEnroll } from "@/features/enrollment/server/can-enroll";

export async function GET(_req: Request, { params }: { params: Promise<{ programSlug: string }> }) {
  const { programSlug } = await params;
  const data = await canEnroll(programSlug);
  return NextResponse.json({ ok: true, data });
}
