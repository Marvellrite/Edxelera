import { NextResponse } from "next/server";
import { getDiscussionThread } from "@/features/discussion/server/get-thread";

export async function GET(_req: Request, { params }: { params: Promise<{ programSlug: string; weekNumber: string }> }) {
  const { programSlug, weekNumber } = await params;
  const data = await getDiscussionThread(programSlug, Number(weekNumber));
  return NextResponse.json({ ok: true, data });
}
