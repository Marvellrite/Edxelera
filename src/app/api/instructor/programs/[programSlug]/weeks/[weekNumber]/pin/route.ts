import { NextResponse } from "next/server";
import { requireRoleForApi } from "@/app/api/_utils";
import { ensureInstructorProgramAccess, setWeekPinnedPost } from "@/features/instructor/server/instructor-service";

export async function PATCH(req: Request, { params }: { params: Promise<{ programSlug: string; weekNumber: string }> }) {
  const auth = await requireRoleForApi("instructor"); if (auth instanceof NextResponse) return auth;
  const { programSlug, weekNumber } = await params;
  if (!ensureInstructorProgramAccess(auth.user.id, programSlug)) return NextResponse.json({ ok: false, error: { code: "FORBIDDEN", message: "Program assignment required" } }, { status: 403 });
  const data = await setWeekPinnedPost(programSlug, Number(weekNumber), (await req.json()).postId);
  return data ? NextResponse.json({ ok: true, data }) : NextResponse.json({ ok: false, error: { code: "NOT_FOUND", message: "Week not found" } }, { status: 404 });
}
