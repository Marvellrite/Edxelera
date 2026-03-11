"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";

import DashboardShell from "@/components/admin_and_instructors/pages/dashboard-shell";

export default function InstructorLayout({ children }: Readonly<{ children: ReactNode }>) {
  const pathname = usePathname();

  if (pathname.startsWith("/instructor/auth") || pathname.startsWith("/instructor/onboarding")) {
    return <>{children}</>;
  }

  return <DashboardShell segment="instructor">{children}</DashboardShell>;
}
