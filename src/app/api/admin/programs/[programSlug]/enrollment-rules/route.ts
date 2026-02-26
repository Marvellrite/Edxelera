import { NextResponse } from "next/server";
import { setEnrollmentRules } from "@/features/admin/server/admin-service";
import { requireRoleForApi } from "@/app/api/_utils";

export async function PATCH(req: Request, { params }: { params: Promise<{ programSlug: string }> }) {
  const auth = await requireRoleForApi("admin"); if (auth instanceof NextResponse) return auth;
  const { programSlug } = await params;
  const body = await req.json();
  const data = await setEnrollmentRules(programSlug, Number(body.enrollmentCloseHours ?? 48), Boolean(body.lateJoinEnabled), Number(body.lateJoinDays ?? 7));
  return data ? NextResponse.json({ ok: true, data }) : NextResponse.json({ ok: false, error: { code: "NOT_FOUND", message: "Program not found" } }, { status: 404 });
}
