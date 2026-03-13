"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactSVG } from "react-svg";

import { useSidebar } from "@/context/sidebar.context";
import { cn } from "@/lib/utils";

import { DashboardSegment } from "./pages/route-utils";

type AdminSidebarProps = {
  segment: DashboardSegment;
};

type NavItem = {
  href: string;
  label: string;
  icon: string;
  active: boolean;
  hideWhenCollapsed?: boolean;
};

type NavSection = {
  title: string;
  collapsedTitle?: string;
  items: NavItem[];
};

const AdminSidebar = ({ segment }: AdminSidebarProps) => {
  const pathname = usePathname();
  const prefix = `/${segment}`;
  const { toggle, setToggle } = useSidebar();
  const isOpen = !toggle;

  const sections: NavSection[] = [
    {
      title: "Learning",
      items: [
        {
          href: prefix,
          label: "Dashboard",
          icon: "https://res.cloudinary.com/dx5iohojj/image/upload/v1773340496/repo-images/public/icons/home-outline-white.svg",
          active: pathname === prefix,
        },
        {
          href: `${prefix}/courses`,
          label: "Course Management",
          icon: "https://res.cloudinary.com/dx5iohojj/image/upload/v1773340456/repo-images/public/icons/book-outline.svg",
          active: pathname.startsWith(`${prefix}/courses`),
        },
        {
          href: "/admin/cohort",
          label: "Cohort Management",
          icon: "https://res.cloudinary.com/dx5iohojj/image/upload/v1773340559/repo-images/public/icons/people-outline.svg",
          active: pathname === `${prefix}/cohort`,
        },
        {
          href: "/admin/certificates",
          label: "Certificates",
          icon: "https://res.cloudinary.com/dx5iohojj/image/upload/v1773340453/repo-images/public/icons/award-outline.svg",
          active: pathname === "/certificates",
        },
      ],
    },
    {
      title: "Users",
      items: [
        {
          href: "/admin/users",
          label: "User Management",
          icon: "https://res.cloudinary.com/dx5iohojj/image/upload/v1773340611/repo-images/public/icons/user-outline.svg",
          active: pathname === `${prefix}/users`,
        },
        {
          href: "/admin/staffs",
          label: "Staff Management",
          icon: "https://res.cloudinary.com/dx5iohojj/image/upload/v1773340616/repo-images/public/icons/users-outline.svg",
          active: pathname === `${prefix}/staffs`,
        },
      ],
    },
    {
      title: "Insights",
      items: [
        {
          href: "/admin/transactions",
          label: "Transactions",
          icon: "https://res.cloudinary.com/dx5iohojj/image/upload/v1773340567/repo-images/public/icons/receipt-outline.svg",
          active: pathname === `${prefix}/transactions`,
        },
        {
          href: "",
          label: "Reports & Analytics",
          icon: "https://res.cloudinary.com/dx5iohojj/image/upload/v1773340461/repo-images/public/icons/chart-outline.svg",
          active: pathname === `${prefix}/reports`,
        },
      ],
    },
    {
      title: "Settings & Communication",
      collapsedTitle: "Settings",
      items: [
        {
          href: "/admin/notifications",
          label: "Notifications",
          icon: "https://res.cloudinary.com/dx5iohojj/image/upload/v1773340552/repo-images/public/icons/notification-outline.svg",
          active: pathname === `${prefix}/notifications`,
        },
        {
          href: "",
          label: "Support",
          icon: "/iconsadmin/port-outline.svg",
          active: pathname === `${prefix}/support`,
        },
        {
          href: "",
          label: "Settings",
          icon: "/iconsadmin/ting-outline.svg",
          active: pathname === `${prefix}/settings`,
          hideWhenCollapsed: false,
        },
      ],
    },
  ];

  return (
    <aside
      className={cn(
        "col-span-1 hidden h-full min-h-0 md:block transition-all duration-[600ms]",
        isOpen ? "md:col-span-2" : "md:col-span-1",
      )}
    >
      <div
        className={cn(
          "fixed bottom-4 top-32 z-30 min-h-0 transition-all duration-[600ms]",
          isOpen
            ? "left-4 w-[calc(((100vw-11rem)/10)*2+1rem)]"
            : "left-4 w-[calc((100vw-11rem)/10)]",
        )}
      >
        <div
          className={cn(
            "bg-white h-full min-h-0 w-full rounded-2xl p-5 overflow-y-auto no-scrollbar transition-all duration-[600ms]",
            isOpen ? "px-5" : "px-3",
          )}
        >
          <nav className="space-y-4">
            <div
              className={cn(
                "flex overflow-hidden transform-origin-top transition-all duration-[600ms]",
                isOpen ? "max-h-0 scale-y-0 opacity-0" : "max-h-16 scale-y-100 opacity-100",
              )}
            >
              <button
                type="button"
                aria-label={isOpen ? "Collapse admin sidebar" : "Expand admin sidebar"}
                onClick={() => setToggle(!toggle)}
                className="shrink-0 rounded-xl p-2 transition-all duration-[600ms] hover:bg-text-neutral-100"
              >
                <ReactSVG src="https://res.cloudinary.com/dx5iohojj/image/upload/v1773340608/repo-images/public/icons/toggle.svg" />
              </button>
            </div>
            {sections.map((section, index) => (
              <div key={section.title}>
                <div className="mt-4 flex items-center justify-between gap-2">
                  <p
                    className={cn(
                      "overflow-hidden whitespace-nowrap transition-all duration-[600ms]",
                      isOpen
                        ? "max-w-[220px] opacity-100 text-left"
                        : "w-full opacity-100",
                    )}
                  >
                    {isOpen ? section.title : (section.collapsedTitle ?? section.title)}
                  </p>

                  {index === 0 && isOpen && (
                    <button
                      type="button"
                      aria-label={isOpen ? "Collapse admin sidebar" : "Expand admin sidebar"}
                      onClick={() => setToggle(!toggle)}
                      className={cn(
                        "ml-auto shrink-0 rounded-xl p-2 transition-all duration-[600ms] hover:bg-text-neutral-100",
                        isOpen ? "scale-100 opacity-100" : "pointer-events-none scale-0 opacity-0",
                      )}
                    >
                      <ReactSVG src="https://res.cloudinary.com/dx5iohojj/image/upload/v1773340608/repo-images/public/icons/toggle.svg" />
                    </button>
                  )}
                </div>
                <ul className="space-y-1 mt-2">
                  {section.items.map((item) => (
                    <li key={`${section.title}-${item.label}`}>
                      <Link
                        href={item.href}
                        className={cn(
                          "group flex items-center rounded-xl py-3 transition-all duration-[600ms]",
                          item.active ? "bg-primary text-white" : "hover:bg-text-neutral-100",
                          isOpen ? "gap-2 px-4" : "gap-2 px-4",
                        )}
                      >
                        <ReactSVG
                          src={item.icon}
                          className={cn(
                            "shrink-0 duration-500",
                            item.label === "Dashboard" || item.label === "Settings" ? "group-hover:rotate-180" : "group-hover:rotate-y-180",
                          )}
                        />
                        {!item.hideWhenCollapsed && (
                          <span
                            className={cn(
                              "overflow-hidden whitespace-nowrap transition-all duration-[600ms]",
                              isOpen ? "max-w-[220px] opacity-100 delay-250" : "max-w-0 opacity-0 delay-0",
                            )}
                          >
                            {item.label}
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
