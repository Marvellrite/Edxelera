import { NextResponse } from "next/server";
import { requireRoleForApi } from "@/app/api/_utils";
import { moderateDiscussionPost } from "@/features/instructor/server/instructor-service";

export async function PATCH(req: Request, { params }: { params: Promise<{ postId: string }> }) {
  const auth = await requireRoleForApi("instructor"); if (auth instanceof NextResponse) return auth;
  const { postId } = await params;
  const data = await moderateDiscussionPost(postId, (await req.json()).action);
  return data ? NextResponse.json({ ok: true, data }) : NextResponse.json({ ok: false, error: { code: "NOT_FOUND", message: "Post not found" } }, { status: 404 });
}
