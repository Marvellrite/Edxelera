import { NextResponse } from "next/server";
import { completeLesson } from "@/features/progress/server/complete-lesson";

export async function POST(req: Request) {
  const body = await req.json();
  const data = await completeLesson(body);
  return NextResponse.json({ ok: true, data });
}
