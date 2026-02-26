import { NextResponse } from "next/server";
import { createProgram, listPrograms } from "@/features/admin/server/admin-service";
import { getPagination, requireRoleForApi } from "@/app/api/_utils";

export async function GET(req: Request) {
  const auth = await requireRoleForApi("admin"); if (auth instanceof NextResponse) return auth;
  const { page, pageSize } = getPagination(req.url);
  return NextResponse.json({ ok: true, data: await listPrograms(page, pageSize) });
}

export async function POST(req: Request) {
  const auth = await requireRoleForApi("admin"); if (auth instanceof NextResponse) return auth;
  const body = await req.json();
  if (!body?.programSlug || !body?.title) return NextResponse.json({ ok: false, error: { code: "VALIDATION_ERROR", message: "programSlug and title are required" } }, { status: 400 });
  return NextResponse.json({ ok: true, data: await createProgram(body) });
}
