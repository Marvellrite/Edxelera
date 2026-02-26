import { NextResponse } from "next/server";
import { getUserDetail, updateUserRole } from "@/features/admin/server/admin-service";
import { requireRoleForApi } from "@/app/api/_utils";

export async function GET(_req: Request, { params }: { params: Promise<{ userId: string }> }) { const auth = await requireRoleForApi("admin"); if (auth instanceof NextResponse) return auth; const { userId } = await params; const data = await getUserDetail(userId); return data ? NextResponse.json({ ok: true, data }) : NextResponse.json({ ok: false, error: { code: "NOT_FOUND", message: "User not found" } }, { status: 404 }); }
export async function PATCH(req: Request, { params }: { params: Promise<{ userId: string }> }) { const auth = await requireRoleForApi("admin"); if (auth instanceof NextResponse) return auth; const { userId } = await params; const data = await updateUserRole(userId, (await req.json()).role); return data ? NextResponse.json({ ok: true, data }) : NextResponse.json({ ok: false, error: { code: "NOT_FOUND", message: "User not found" } }, { status: 404 }); }
