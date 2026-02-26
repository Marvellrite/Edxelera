import { NextResponse } from "next/server";
import { listPayments } from "@/features/admin/server/admin-service";
import { requireRoleForApi } from "@/app/api/_utils";

export async function GET(req: Request) { const auth = await requireRoleForApi("admin"); if (auth instanceof NextResponse) return auth; const search = new URL(req.url).searchParams; return NextResponse.json({ ok: true, data: await listPayments({ status: search.get("status") ?? undefined, programSlug: search.get("programSlug") ?? undefined, userId: search.get("userId") ?? undefined, page: Number(search.get("page") ?? 1), pageSize: Number(search.get("pageSize") ?? 20) }) }); }
