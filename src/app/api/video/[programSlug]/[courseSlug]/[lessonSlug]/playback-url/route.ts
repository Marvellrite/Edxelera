import { NextResponse } from "next/server";
import { getLessonPlaybackUrl } from "@/features/video/server/get-lesson-playback-url";

export async function GET(_req: Request, { params }: { params: Promise<{ programSlug: string; courseSlug: string; lessonSlug: string }> }) {
  const { programSlug, courseSlug, lessonSlug } = await params;
  const data = await getLessonPlaybackUrl(programSlug, courseSlug, lessonSlug);
  return NextResponse.json({ ok: true, data });
}
