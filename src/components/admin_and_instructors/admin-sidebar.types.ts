import { DashboardSegment } from "./pages/route-utils";

export type AdminSidebarProps = {
  segment: DashboardSegment;
};

export type NavItem = {
  href: string;
  label: string;
  icon: string;
  active: boolean;
  hideWhenCollapsed?: boolean;
};

export type NavSection = {
  title: string;
  collapsedTitle?: string;
  items: NavItem[];
};
