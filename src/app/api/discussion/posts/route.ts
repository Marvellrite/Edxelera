import { NextResponse } from "next/server";
import { createPost } from "@/features/discussion/server/create-post";

export async function POST(req: Request) {
  const body = await req.json();
  const data = await createPost(body);
  return NextResponse.json({ ok: true, data });
}
