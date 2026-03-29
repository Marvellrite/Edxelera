import { DashboardSegment, getDashboardRoutePrefix } from "./pages/route-utils";
import { NavSection } from "./admin-sidebar.types";

type SidebarItemDefinition = {
  href: (prefix: string) => string;
  label: string;
  icon: string;
  isActive: (pathname: string, prefix: string) => boolean;
  hideWhenCollapsed?: boolean;
};

type SidebarSectionDefinition = {
  title: string;
  collapsedTitle?: string;
  items: SidebarItemDefinition[];
};

const SIDEBAR_SECTIONS: SidebarSectionDefinition[] = [
  {
    title: "Learning",
    items: [
      {
        href: (prefix) => prefix,
        label: "Dashboard",
        icon: "GridIcon",
        isActive: (pathname, prefix) => pathname === prefix,
      },
      {
        href: (prefix) => `${prefix}/courses`,
        label: "Course Management",
        icon: "BookOutline",
        isActive: (pathname, prefix) => pathname.startsWith(`${prefix}/courses`),
      },
      {
        href: (prefix) => `${prefix}/cohort`,
        label: "Cohort Management",
        icon: "PeopleOutline",
        isActive: (pathname, prefix) => pathname === `${prefix}/cohort`,
      },
      {
        href: (prefix) => `${prefix}/certificates`,
        label: "Certificates",
        icon: "ShieldStar",
        isActive: (pathname, prefix) => pathname === `${prefix}/certificates`,
      },
    ],
  },
  {
    title: "Users",
    items: [
      {
        href: (prefix) => `${prefix}/users`,
        label: "User Management",
        icon: "UserOutline",
        isActive: (pathname, prefix) => pathname === `${prefix}/users`,
      },
      {
        href: (prefix) => `${prefix}/staffs`,
        label: "Staff Management",
        icon: "Users",
        isActive: (pathname, prefix) => pathname === `${prefix}/staffs`,
      },
    ],
  },
  {
    title: "Insights",
    items: [
      {
        href: (prefix) => `${prefix}/transactions`,
        label: "Transactions",
        icon: "Receipt",
        isActive: (pathname, prefix) => pathname === `${prefix}/transactions`,
      },
    ],
  },
  {
    title: "Settings & Communication",
    collapsedTitle: "Settings",
    items: [
      {
        href: (prefix) => `${prefix}/notifications`,
        label: "Notifications",
        icon: "Bell",
        isActive: (pathname, prefix) => pathname === `${prefix}/notifications`,
      },
      {
        href: () => "",
        label: "Support",
        icon: "HelpChat",
        isActive: (pathname, prefix) => pathname === `${prefix}/support`,
      },
      {
        href: () => "",
        label: "Settings",
        icon: "SettingOutline",
        isActive: (pathname, prefix) => pathname === `${prefix}/settings`,
        hideWhenCollapsed: false,
      },
    ],
  },
];

export const SIDEBAR_TOGGLE_ICON_SRC =
  "Toggle";

export function getAdminSidebarSections(
  pathname: string,
  segment: DashboardSegment
): NavSection[] {
  const prefix = getDashboardRoutePrefix(segment);

  return SIDEBAR_SECTIONS.map((section) => ({
    title: section.title,
    collapsedTitle: section.collapsedTitle,
    items: section.items.map((item) => ({
      href: item.href(prefix),
      label: item.label,
      icon: item.icon,
      active: item.isActive(pathname, prefix),
      hideWhenCollapsed: item.hideWhenCollapsed,
    })),
  }));
}
