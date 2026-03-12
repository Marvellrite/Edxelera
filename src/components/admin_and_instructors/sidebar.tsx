"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ReactSVG } from "react-svg";

import * as Icons from "@/components/icons/modified";
import { Toggle } from "@/components/icons/modified";
import { useSidebar as useHomeSidebar } from "@/app/home/context/sidebar-context";
import { useSidebar as useDashboardSidebar } from "@/context/sidebar.context";
import { cn } from "@/lib/utils";

import { DashboardSegment } from "./pages/route-utils";

type SidebarProps = {
  segment?: DashboardSegment;
};

const homeLinks = [
  { href: "/home", label: "Home", icon: "Home", outline: "HomeOutline" },
  { href: "/home/explore", label: "Explore", icon: "Search", outline: "SearchOutline" },
  { href: "/home/my-courses", label: "My Courses", icon: "Book", outline: "BookOutline" },
  { href: "/home/community", label: "Community", icon: "People", outline: "PeopleOutline" },
  { href: "/home/my-profile", label: "My Profile", icon: "User", outline: "UserOutline" },
  { href: "/home/settings", label: "Settings", icon: "Setting", outline: "SettingOutline" },
] as const;

const IconsMap = Icons as Record<string, React.ComponentType<{ width: number; height: number; className?: string }>>;

const HomeSidebar = () => {
  const pathname = usePathname();
  const activeLink = "text-primary font-bold";
  const { isOpen, toggleSidebar } = useHomeSidebar();
  const isCollapsed = !isOpen;
  const [isHydrated, setIsHydrated] = useState(false);
  const [showToggleButton] = useState(false);
  const showCollapsedToggle = isCollapsed || showToggleButton;

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <aside className="col-span-2 hidden h-screen overflow-x-hidden border-r-2 border-neutral-100 px-5 text-neutral space-y-8.5 md:block md:w-50 lg:w-67.5" />
    );
  }

  return (
    <aside
      className={`col-span-2 hidden md:block border-r-2 border-neutral-100 h-screen px-5 text-neutral space-y-8.5 overflow-x-hidden ${
        isOpen ? "md:w-50 lg:w-67.5" : "md:w-18 lg:w-18"
      } transition-all duration-[600ms]`}
    >
      <div
        className={cn(
          " flex justify-between pt-5 gap-0 *:inline-block transition-all duration-[600ms]",
          isOpen ? "scale-x-100" : "scale-x-[20px]",
        )}
      >
        <div className="relative rounded-md ">
          <Image
            src="/images/logos/logo-dark.png"
            loading="eager"
            alt="edxelera-logo"
            width={192}
            height={47}
            className={cn(
              "h-[30px] w-auto aspect-191/47 transition-opacity duration-200",
              showCollapsedToggle ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto",
            )}
          />
        </div>
      </div>

      <nav className={cn("grid gap-8 transition-transform duration-[600ms] translate-y-0 ", isOpen && "-translate-y-14.25")}>
        <div className={cn("origin-top scale-y-100 opacity-100 transition-all  duration-300", isOpen && "scale-y-0 opacity-0")}>
          <button className="translate-x-1">
            <Toggle className="size-6.25" onClick={toggleSidebar} />
          </button>
        </div>
        <div className="flex justify-between items-center ">
          <Link
            href={homeLinks[0].href}
            className={cn(
              `flex gap-5 hover:cursor-pointer items-center duration-[600ms] transition-all ${
                pathname === homeLinks[0].href ? activeLink : ""
              }`,
              isOpen ? "gap-5" : "gap-0",
            )}
          >
            {React.createElement(IconsMap[pathname === homeLinks[0].href ? homeLinks[0].icon : homeLinks[0].outline], {
              width: 25,
              height: 25,
              className: " translate-x-0.5 duration-0 ",
            })}
            <span className={cn("duration-[600ms] transition-all", isOpen ? " opacity-100 delay-250" : " opacity-0 delay-0")}>
              {homeLinks[0].label}
            </span>
          </Link>

          <button
            type="button"
            aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
            onClick={toggleSidebar}
            className={cn(
              "hover:cursor-pointer bg-transparent border-none p-0 transition-all duration-[600ms]",
              isOpen ? "opacity-100 w-6.25" : "opacity-0 w-0 pointer-events-none",
            )}
          >
            {React.createElement(IconsMap.Toggle, { width: 25, height: 25 })}
          </button>
        </div>
        {homeLinks.slice(1).map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex gap-5 hover:cursor-pointer items-center duration-[600ms] transition-all ",
              pathname === link.href ? activeLink : "",
              isOpen ? "gap-5" : "gap-0",
            )}
          >
            {React.createElement(IconsMap[pathname === link.href ? link.icon : link.outline], {
              width: 25,
              height: 25,
              className: " translate-x-0.5 duration-0 ",
            })}
            <span className={cn("duration-[600ms] transition-all text-nowrap", isOpen ? " opacity-100 delay-250" : " opacity-0 delay-0")}>
              {link.label}
            </span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

const Sidebar = ({ segment }: SidebarProps) => {
  const pathname = usePathname();
  const isAdminDashboardRoute = pathname.startsWith("/admin") || pathname.startsWith("/instructor");

  if (!isAdminDashboardRoute && !segment) {
    return <HomeSidebar />;
  }

  const resolvedSegment: DashboardSegment = segment ?? (pathname.startsWith("/instructor") ? "instructor" : "admin");
  const prefix = `/${resolvedSegment}`;

  const dashboard = pathname === prefix;
  const course = pathname.startsWith(`${prefix}/courses`);
  const cohort = pathname === `${prefix}/cohort`;
  const certificates = pathname === "/certificates";
  const users = pathname === `${prefix}/users`;
  const staffs = pathname === `${prefix}/staffs`;
  const transactions = pathname === `${prefix}/transactions`;
  const reports = pathname === `${prefix}/reports`;
  const notifications = pathname === `${prefix}/notifications`;
  const support = pathname === `${prefix}/support`;
  const settings = pathname === `${prefix}/settings`;

  const { toggle, setToggle } = useDashboardSidebar();

  return (
    <aside className={`${toggle ? "md:col-span-1" : "md:col-span-2"} col-span-1 h-full w-full overflow-y-auto no-scrollbar `}>
      <div className="bg-white h-full w-full rounded-2xl p-5 transition-all duration-1000 overflow-y-scroll no-scrollbar">
        <div className={`${toggle ? "flex-col-reverse gap-2 mb-4" : ""} flex justify-between items-center`}>
          <p>Learning</p>
          <ReactSVG src="/icons/toggle.svg" className="hover:bg-text-neutral-100 p-2 rounded-xl" onClick={() => setToggle(!toggle)} />
        </div>
        <ul className="space-y-1 mt-2">
          <li>
            <Link
              href={prefix}
              className={`${dashboard ? "bg-primary text-white" : "hover:bg-text-neutral-100"} ${
                toggle ? "justify-center" : ""
              } flex gap-2 items-center py-3 px-4 rounded-xl group`}
            >
              <ReactSVG src="/icons/home-outline-white.svg" className="group-hover:rotate-180 duration-500" />
              {!toggle && <span>Dashboard</span>}
            </Link>
          </li>
          <li>
            <Link
              href={`${prefix}/courses`}
              className={`${course ? "bg-primary text-white" : "hover:bg-text-neutral-100"} ${
                toggle ? "justify-center" : ""
              } flex gap-2 items-center py-3 px-4 rounded-xl group`}
            >
              <ReactSVG src="/icons/book-outline.svg" className="group-hover:rotate-y-180 duration-500" />
              {!toggle && <span>Course Management</span>}
            </Link>
          </li>
          <li>
            <Link
              href="/admin/cohort"
              className={`${cohort ? "bg-primary text-white" : "hover:bg-text-neutral-100"} ${
                toggle ? "justify-center" : ""
              } flex gap-2 items-center py-3 px-4 rounded-xl group`}
            >
              <ReactSVG src="/icons/people-outline.svg" className="group-hover:rotate-y-180 duration-500" />
              {!toggle && <span>Cohort Management</span>}
            </Link>
          </li>
          <li>
            <Link
              href="/admin/certificates"
              className={`${certificates ? "bg-primary text-white" : "hover:bg-text-neutral-100"} ${
                toggle ? "justify-center" : ""
              } flex gap-2 items-center py-3 px-4 rounded-xl group`}
            >
              <ReactSVG src="/icons/award-outline.svg" className="group-hover:rotate-y-180 duration-500" />
              {!toggle && <span>Certificates</span>}
            </Link>
          </li>
        </ul>

        <p className={`${toggle ? "text-center" : ""} mt-4`}>Users</p>
        <ul className="space-y-1 mt-2">
          <li>
            <Link
              href="/admin/users"
              className={`${users ? "bg-primary text-white" : "hover:bg-text-neutral-100"} ${
                toggle ? "justify-center" : ""
              } flex gap-2 items-center py-3 px-4 rounded-xl group`}
            >
              <ReactSVG src="/icons/user-outline.svg" className="group-hover:rotate-y-180 duration-500" />
              {!toggle && <span>User Management</span>}
            </Link>
          </li>
          <li>
            <Link
              href="/admin/staffs"
              className={`${staffs ? "bg-primary text-white" : "hover:bg-text-neutral-100"} ${
                toggle ? "justify-center" : ""
              } flex gap-2 items-center py-3 px-4 rounded-xl group`}
            >
              <ReactSVG src="/icons/users-outline.svg" className="group-hover:rotate-y-180 duration-500" />
              {!toggle && <span>Staff Management</span>}
            </Link>
          </li>
        </ul>

        <p className={`${toggle ? "text-center" : ""} mt-4`}>Insights</p>
        <ul className="space-y-1 mt-2">
          <li>
            <Link
              href="/admin/transactions"
              className={`${transactions ? "bg-primary text-white" : "hover:bg-text-neutral-100"} ${
                toggle ? "justify-center" : ""
              } flex gap-2 items-center py-3 px-4 rounded-xl group`}
            >
              <ReactSVG src="/icons/receipt-outline.svg" className="group-hover:rotate-y-180 duration-500" />
              {!toggle && <span>Transactions</span>}
            </Link>
          </li>
          <li>
            <Link
              href=""
              className={`${reports ? "bg-primary text-white" : "hover:bg-text-neutral-100"} ${
                toggle ? "justify-center" : ""
              } flex gap-2 items-center py-3 px-4 rounded-xl group`}
            >
              <ReactSVG src="/icons/chart-outline.svg" className="group-hover:rotate-y-180 duration-500" />
              {!toggle && <span>Reports & Analytics</span>}
            </Link>
          </li>
        </ul>

        <p className={`${toggle ? "text-center" : ""} mt-4`}>
          Settings <span className={`${toggle ? "hidden" : ""}`}>& Communication</span>
        </p>
        <ul className="space-y-1 mt-2">
          <li>
            <Link
              href="/admin/notifications"
              className={`${notifications ? "bg-primary text-white" : "hover:bg-text-neutral-100"} ${
                toggle ? "justify-center" : ""
              } flex gap-2 items-center py-3 px-4 rounded-xl group`}
            >
              <ReactSVG src="/icons/notification-outline.svg" className="group-hover:rotate-y-180 duration-500" />
              {!toggle && <span>Notifications</span>}
            </Link>
          </li>
          <li>
            <Link
              href=""
              className={`${support ? "bg-primary text-white" : "hover:bg-text-neutral-100"} ${
                toggle ? "justify-center" : ""
              } flex gap-2 items-center py-3 px-4 rounded-xl group`}
            >
              <ReactSVG src="/iconsadmin/port-outline.svg" className="group-hover:rotate-y-180 duration-500" />
              {!toggle && <span>Support</span>}
            </Link>
          </li>
          <li>
            <Link
              href=""
              className={`${settings ? "bg-primary text-white" : "hover:bg-text-neutral-100"} ${
                toggle ? "justify-center" : ""
              } flex gap-2 items-center py-3 px-4 rounded-xl group`}
            >
              <ReactSVG src="/iconsadmin/ting-outline.svg" className="group-hover:rotate-180 duration-500" />
              {!toggle && <span>Settings</span>}
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
