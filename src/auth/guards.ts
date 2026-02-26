import type { RoleName } from "@/features/_shared/types";
import { getSession } from "./session";

export async function requireAuth() {
  const session = await getSession();
  if (!session) {
    throw new Error("UNAUTHENTICATED");
  }
  return session;
}

export async function requireRole(role: RoleName | RoleName[]) {
  const session = await requireAuth();
  const roles = Array.isArray(role) ? role : [role];
  if (!roles.some((r) => session.user.roles.includes(r))) {
    throw new Error("FORBIDDEN");
  }
  return session;
}