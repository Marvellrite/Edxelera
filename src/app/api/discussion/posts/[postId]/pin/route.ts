import { NextResponse } from "next/server";
import { setPinnedPost } from "@/features/discussion/server/set-pinned-post";

export async function POST(req: Request, { params }: { params: Promise<{ postId: string }> }) {
  const { postId } = await params;
  const body = (await req.json()) as { pinned?: boolean };
  const data = await setPinnedPost({ postId, pinned: Boolean(body.pinned) });
  return NextResponse.json({ ok: true, data });
}
