"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useSyncExternalStore } from "react";

import * as Icons from "@/components/icons/modified";
import { Toggle } from "@/components/icons/modified";
import { useSidebar } from "@/app/home/context/sidebar-context";
import { cn } from "@/lib/utils";

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
  const { isOpen, toggleSidebar } = useSidebar();
  const isCollapsed = !isOpen;
  const isHydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const [showToggleButton] = useState(false);
  const showCollapsedToggle = isCollapsed || showToggleButton;

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
            src="https://res.cloudinary.com/dx5iohojj/image/upload/v1773340672/repo-images/public/images/logos/logo-dark.png"
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

export default HomeSidebar;
