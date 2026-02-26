import { NextResponse } from "next/server";
import { listEnrollments } from "@/features/admin/server/admin-service";
import { requireRoleForApi } from "@/app/api/_utils";

export async function GET(req: Request) { const auth = await requireRoleForApi("admin"); if (auth instanceof NextResponse) return auth; const search = new URL(req.url).searchParams; return NextResponse.json({ ok: true, data: await listEnrollments(search.get("programSlug") ?? undefined, Number(search.get("page") ?? 1), Number(search.get("pageSize") ?? 20)) }); }
