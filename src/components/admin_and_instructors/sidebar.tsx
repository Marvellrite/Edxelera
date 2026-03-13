"use client";

import { usePathname } from "next/navigation";

import AdminSidebar from "./admin-sidebar";
import HomeSidebar from "./home-sidebar";
import { DashboardSegment } from "./pages/route-utils";

type SidebarProps = {
  segment?: DashboardSegment;
};

const Sidebar = ({ segment }: SidebarProps) => {
  const pathname = usePathname();
  const isAdminDashboardRoute = pathname.startsWith("/admin") || pathname.startsWith("/instructor");

  if (!isAdminDashboardRoute && !segment) {
    return <HomeSidebar />;
  }

  const resolvedSegment: DashboardSegment = segment ?? (pathname.startsWith("/instructor") ? "instructor" : "admin");

  return <AdminSidebar segment={resolvedSegment} />;
};

export default Sidebar;
