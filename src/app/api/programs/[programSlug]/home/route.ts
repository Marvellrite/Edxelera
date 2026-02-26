import { NextResponse } from "next/server";
import { getStudentProgramHome } from "@/features/program-home/server/get-student-program-home";

export async function GET(_req: Request, { params }: { params: Promise<{ programSlug: string }> }) {
  const { programSlug } = await params;
  const data = await getStudentProgramHome(programSlug);
  return NextResponse.json({ ok: true, data });
}
