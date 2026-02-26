import { NextResponse } from "next/server";
import { createModule, listModules } from "@/features/admin/server/admin-service";
import { getPagination, requireRoleForApi } from "@/app/api/_utils";

export async function GET(req: Request) { const auth = await requireRoleForApi("admin"); if (auth instanceof NextResponse) return auth; const { page, pageSize } = getPagination(req.url); return NextResponse.json({ ok: true, data: await listModules(page, pageSize) }); }
export async function POST(req: Request) { const auth = await requireRoleForApi("admin"); if (auth instanceof NextResponse) return auth; return NextResponse.json({ ok: true, data: await createModule(await req.json()) }); }
