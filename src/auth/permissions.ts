import type { RoleName } from "@/features/_shared/types";

export const Roles: Record<Uppercase<RoleName>, RoleName> = {
  STUDENT: "student",
  INSTRUCTOR: "instructor",
  ADMIN: "admin",
};