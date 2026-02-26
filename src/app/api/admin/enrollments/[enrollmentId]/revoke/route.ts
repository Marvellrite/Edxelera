import { NextResponse } from "next/server";
import { requireRoleForApi } from "@/app/api/_utils";
import { revokeEnrollment } from "@/features/admin/server/admin-service";

export async function POST(_req: Request, { params }: { params: Promise<{ enrollmentId: string }> }) { const auth = await requireRoleForApi("admin"); if (auth instanceof NextResponse) return auth; const { enrollmentId } = await params; const data = await revokeEnrollment(enrollmentId); return data ? NextResponse.json({ ok: true, data }) : NextResponse.json({ ok: false, error: { code: "NOT_FOUND", message: "Enrollment not found" } }, { status: 404 }); }
