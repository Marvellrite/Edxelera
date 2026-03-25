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
        icon: "https://res.cloudinary.com/dx5iohojj/image/upload/v1773340496/repo-images/public/icons/home-outline-white.svg",
        isActive: (pathname, prefix) => pathname === prefix,
      },
      {
        href: (prefix) => `${prefix}/courses`,
        label: "Course Management",
        icon: "https://res.cloudinary.com/dx5iohojj/image/upload/v1773340456/repo-images/public/icons/book-outline.svg",
        isActive: (pathname, prefix) => pathname.startsWith(`${prefix}/courses`),
      },
      {
        href: (prefix) => `${prefix}/cohort`,
        label: "Cohort Management",
        icon: "https://res.cloudinary.com/dx5iohojj/image/upload/v1773340559/repo-images/public/icons/people-outline.svg",
        isActive: (pathname, prefix) => pathname === `${prefix}/cohort`,
      },
      {
        href: (prefix) => `${prefix}/certificates`,
        label: "Certificates",
        icon: "https://res.cloudinary.com/dx5iohojj/image/upload/v1773340453/repo-images/public/icons/award-outline.svg",
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
        icon: "https://res.cloudinary.com/dx5iohojj/image/upload/v1773340611/repo-images/public/icons/user-outline.svg",
        isActive: (pathname, prefix) => pathname === `${prefix}/users`,
      },
      {
        href: (prefix) => `${prefix}/staffs`,
        label: "Staff Management",
        icon: "https://res.cloudinary.com/dx5iohojj/image/upload/v1773340616/repo-images/public/icons/users-outline.svg",
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
        icon: "https://res.cloudinary.com/dx5iohojj/image/upload/v1773340567/repo-images/public/icons/receipt-outline.svg",
        isActive: (pathname, prefix) => pathname === `${prefix}/transactions`,
      },
      {
        href: () => "",
        label: "Reports & Analytics",
        icon: "https://res.cloudinary.com/dx5iohojj/image/upload/v1773340461/repo-images/public/icons/chart-outline.svg",
        isActive: (pathname, prefix) => pathname === `${prefix}/reports`,
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
        icon: "https://res.cloudinary.com/dx5iohojj/image/upload/v1773340552/repo-images/public/icons/notification-outline.svg",
        isActive: (pathname, prefix) => pathname === `${prefix}/notifications`,
      },
      {
        href: () => "",
        label: "Support",
        icon: "/iconsadmin/port-outline.svg",
        isActive: (pathname, prefix) => pathname === `${prefix}/support`,
      },
      {
        href: () => "",
        label: "Settings",
        icon: "/iconsadmin/ting-outline.svg",
        isActive: (pathname, prefix) => pathname === `${prefix}/settings`,
        hideWhenCollapsed: false,
      },
    ],
  },
];

export const SIDEBAR_TOGGLE_ICON_SRC =
  "https://res.cloudinary.com/dx5iohojj/image/upload/v1773340608/repo-images/public/icons/toggle.svg";

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
