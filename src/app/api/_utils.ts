import { NextResponse } from "next/server";
import { requireRole } from "@/auth/guards";
import type { RoleName } from "@/features/_shared/types";

export async function requireRoleForApi(role: RoleName | RoleName[]) {
  try {
    return await requireRole(role);
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHENTICATED") {
      return NextResponse.json({ ok: false, error: { code: "UNAUTHENTICATED", message: "Authentication required" } }, { status: 401 });
    }
    return NextResponse.json({ ok: false, error: { code: "FORBIDDEN", message: "Insufficient role" } }, { status: 403 });
  }
}

export function getPagination(url: string) {
  const search = new URL(url).searchParams;
  return {
    page: Number(search.get("page") ?? 1),
    pageSize: Number(search.get("pageSize") ?? 20),
  };
}
