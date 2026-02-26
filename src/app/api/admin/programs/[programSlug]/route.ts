import { NextResponse } from "next/server";
import { getProgram, updateProgram } from "@/features/admin/server/admin-service";
import { requireRoleForApi } from "@/app/api/_utils";

export async function GET(_req: Request, { params }: { params: Promise<{ programSlug: string }> }) {
  const auth = await requireRoleForApi("admin"); if (auth instanceof NextResponse) return auth;
  const { programSlug } = await params;
  const data = await getProgram(programSlug);
  return data ? NextResponse.json({ ok: true, data }) : NextResponse.json({ ok: false, error: { code: "NOT_FOUND", message: "Program not found" } }, { status: 404 });
}

export async function PATCH(req: Request, { params }: { params: Promise<{ programSlug: string }> }) {
  const auth = await requireRoleForApi("admin"); if (auth instanceof NextResponse) return auth;
  const { programSlug } = await params;
  const data = await updateProgram(programSlug, await req.json());
  return data ? NextResponse.json({ ok: true, data }) : NextResponse.json({ ok: false, error: { code: "NOT_FOUND", message: "Program not found" } }, { status: 404 });
}
