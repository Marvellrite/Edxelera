import { NextResponse } from "next/server";
import { requireRoleForApi } from "@/app/api/_utils";
import { listInstructorPrograms } from "@/features/instructor/server/instructor-service";

export async function GET() {
  const auth = await requireRoleForApi("instructor"); if (auth instanceof NextResponse) return auth;
  return NextResponse.json({ ok: true, data: await listInstructorPrograms(auth.user.id) });
}
