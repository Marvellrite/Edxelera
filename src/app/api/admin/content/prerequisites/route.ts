import { NextResponse } from "next/server";
import { upsertPrerequisite } from "@/features/admin/server/admin-service";
import { requireRoleForApi } from "@/app/api/_utils";

export async function POST(req: Request) { const auth = await requireRoleForApi("admin"); if (auth instanceof NextResponse) return auth; const body = await req.json(); return NextResponse.json({ ok: true, data: await upsertPrerequisite(body.lessonSlug, body.prerequisiteLessonSlug) }); }
