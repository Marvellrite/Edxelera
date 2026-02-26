import { NextResponse } from "next/server";
import { getCertificates } from "@/features/certificates/server/get-certificates";

export async function GET() {
  const data = await getCertificates();
  return NextResponse.json({ ok: true, data });
}
