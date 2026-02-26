import { NextResponse } from "next/server";
import { deleteCourse, updateCourse } from "@/features/admin/server/admin-service";
import { requireRoleForApi } from "@/app/api/_utils";

export async function PATCH(req: Request, { params }: { params: Promise<{ courseSlug: string }> }) { const auth = await requireRoleForApi("admin"); if (auth instanceof NextResponse) return auth; const { courseSlug } = await params; const data = await updateCourse(courseSlug, await req.json()); return data ? NextResponse.json({ ok: true, data }) : NextResponse.json({ ok: false, error: { code: "NOT_FOUND", message: "Course not found" } }, { status: 404 }); }
export async function DELETE(_req: Request, { params }: { params: Promise<{ courseSlug: string }> }) { const auth = await requireRoleForApi("admin"); if (auth instanceof NextResponse) return auth; const { courseSlug } = await params; const deleted = await deleteCourse(courseSlug); return deleted ? NextResponse.json({ ok: true, data: { deleted: true } }) : NextResponse.json({ ok: false, error: { code: "NOT_FOUND", message: "Course not found" } }, { status: 404 }); }
