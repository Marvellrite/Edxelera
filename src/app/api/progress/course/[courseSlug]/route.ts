import { NextResponse } from "next/server";
import { getCourseProgress } from "@/features/progress/server/get-course-progress";

export async function GET(_req: Request, { params }: { params: Promise<{ courseSlug: string }> }) {
  const { courseSlug } = await params;
  const data = await getCourseProgress(courseSlug);
  return NextResponse.json({ ok: true, data });
}
