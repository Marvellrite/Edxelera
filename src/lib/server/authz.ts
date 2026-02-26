import type { RoleName } from "@/features/_shared/types";

export function hasRole(userRoles: RoleName[], required: RoleName | RoleName[]): boolean {
  const req = Array.isArray(required) ? required : [required];
  return req.some((role) => userRoles.includes(role));
}