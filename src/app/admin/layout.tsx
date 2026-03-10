import '@/styles/admin/admin.css'

import { ReactNode } from "react";

import DashboardShell from "@/components/admin_and_instructors/pages/dashboard-shell";

export default function AdminLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <DashboardShell segment="admin">{children}</DashboardShell>
  );
}
