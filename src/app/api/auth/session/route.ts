import { NextResponse } from "next/server";
import { getSession } from "@/auth/session";

export async function GET() {
  const session = await getSession();
  return NextResponse.json({ ok: true, data: { session } });
}
