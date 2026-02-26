import { NextResponse } from "next/server";
import { getWeekHub } from "@/features/week-hub/server/get-week-hub";

export async function GET(_req: Request, { params }: { params: Promise<{ programSlug: string; weekNumber: string }> }) {
  const { programSlug, weekNumber } = await params;
  const data = await getWeekHub(programSlug, Number(weekNumber));
  return NextResponse.json({ ok: true, data });
}
