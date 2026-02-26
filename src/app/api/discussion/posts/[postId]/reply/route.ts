import { NextResponse } from "next/server";
import { replyToPost } from "@/features/discussion/server/reply-to-post";

export async function POST(req: Request, { params }: { params: Promise<{ postId: string }> }) {
  const { postId } = await params;
  const body = (await req.json()) as { body: string };
  const data = await replyToPost({ postId, body: body.body });
  return NextResponse.json({ ok: true, data });
}
