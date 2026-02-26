import { NextResponse } from "next/server";
import { deleteModule, updateModule } from "@/features/admin/server/admin-service";
import { requireRoleForApi } from "@/app/api/_utils";

export async function PATCH(req: Request, { params }: { params: Promise<{ weekId: string }> }) { const auth = await requireRoleForApi("admin"); if (auth instanceof NextResponse) return auth; const { weekId } = await params; const data = await updateModule(weekId, await req.json()); return data ? NextResponse.json({ ok: true, data }) : NextResponse.json({ ok: false, error: { code: "NOT_FOUND", message: "Module not found" } }, { status: 404 }); }
export async function DELETE(_req: Request, { params }: { params: Promise<{ weekId: string }> }) { const auth = await requireRoleForApi("admin"); if (auth instanceof NextResponse) return auth; const { weekId } = await params; const deleted = await deleteModule(weekId); return deleted ? NextResponse.json({ ok: true, data: { deleted: true } }) : NextResponse.json({ ok: false, error: { code: "NOT_FOUND", message: "Module not found" } }, { status: 404 }); }
