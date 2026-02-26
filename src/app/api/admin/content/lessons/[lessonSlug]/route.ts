import { NextResponse } from "next/server";
import { deleteLesson, updateLesson } from "@/features/admin/server/admin-service";
import { requireRoleForApi } from "@/app/api/_utils";

export async function PATCH(req: Request, { params }: { params: Promise<{ lessonSlug: string }> }) { const auth = await requireRoleForApi("admin"); if (auth instanceof NextResponse) return auth; const { lessonSlug } = await params; const data = await updateLesson(lessonSlug, await req.json()); return data ? NextResponse.json({ ok: true, data }) : NextResponse.json({ ok: false, error: { code: "NOT_FOUND", message: "Lesson not found" } }, { status: 404 }); }
export async function DELETE(_req: Request, { params }: { params: Promise<{ lessonSlug: string }> }) { const auth = await requireRoleForApi("admin"); if (auth instanceof NextResponse) return auth; const { lessonSlug } = await params; const deleted = await deleteLesson(lessonSlug); return deleted ? NextResponse.json({ ok: true, data: { deleted: true } }) : NextResponse.json({ ok: false, error: { code: "NOT_FOUND", message: "Lesson not found" } }, { status: 404 }); }
