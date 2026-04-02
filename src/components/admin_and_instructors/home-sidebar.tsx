"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useSyncExternalStore } from "react";

import * as Icons from "@/components/icons/modified";
import { Toggle } from "@/components/icons/modified";
import { useSidebar } from "@/app/home/context/sidebar-context";
import { useThemeStore } from "@/context/theme.context";
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
  const theme = useThemeStore((state) => state.theme);
  const activeLink = "text-primary font-semibold";
  const { isOpen, toggleSidebar } = useSidebar();
  const isCollapsed = !isOpen;
  const isHydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const [showToggleButton] = useState(false);
  const showCollapsedToggle = isCollapsed || showToggleButton;
  const logoSrc =
    theme === "dark"
      ? "https://res.cloudinary.com/dx5iohojj/image/upload/v1773340673/repo-images/public/images/logos/logo-light.png"
      : "https://res.cloudinary.com/dx5iohojj/image/upload/v1773340672/repo-images/public/images/logos/logo-dark.png";

  if (!isHydrated) {
    return (
      <aside className="col-span-2 hidden h-screen overflow-x-hidden border-r-2 border-neutral-100 px-5 text-neutral space-y-8.5 md:block md:w-50 lg:w-67.5" />
    );
  }

  return (
    <aside
      className={`col-span-2 hidden h-screen overflow-x-hidden border-r border-[var(--border-soft)] bg-[linear-gradient(180deg,var(--surface-raised),var(--surface-subtle))] px-5 text-neutral space-y-8.5 md:block ${
        isOpen ? "md:w-50 lg:w-67.5" : "md:w-18 lg:w-18"
      } transition-[width] duration-500 ease-in-out [will-change:width]`}
    >
      <div
        className={cn(
          "flex justify-between gap-0 pt-5 *:inline-block transition-transform duration-500 ease-in-out [transform-origin:left_center] [will-change:transform]",
          isOpen ? "scale-x-100" : "scale-x-[20px]",
        )}
      >
        <div className="relative rounded-md ">
          <Image
            src={logoSrc}
            loading="eager"
            alt="edxelera-logo"
            width={192}
            height={47}
            className={cn(
              "h-7.5 w-auto aspect-191/47 transition-opacity duration-200 [will-change:opacity]",
              showCollapsedToggle ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto",
            )}
          />
        </div>
      </div>

      <nav className={cn("grid gap-8 translate-y-0 transition-transform duration-500 ease-in-out [will-change:transform]", isOpen && "-translate-y-14.25")}>
        <div className={cn("origin-top scale-y-100 opacity-100 transition-[opacity,transform] duration-300 ease-out [will-change:transform,opacity]", isOpen && "scale-y-0 opacity-0")}>
          <button className="translate-x-1">
            <Toggle className="size-6.25" onClick={toggleSidebar} />
          </button>
        </div>
        <div className="flex justify-between items-center ">
          <Link
            href={homeLinks[0].href}
            className={cn(
              `relative flex items-center gap-5 rounded-xl px-2 py-2 transition-[gap,color,background-color,box-shadow] duration-300 ease-out hover:cursor-pointer ${
                pathname === homeLinks[0].href ? activeLink : ""
              }`,
              pathname === homeLinks[0].href
                ? "bg-[linear-gradient(90deg,color-mix(in_srgb,var(--primary)_18%,transparent),transparent)] shadow-[inset_3px_0_0_var(--primary)]"
                : "hover:bg-[var(--surface-elevated-2)]",
              isOpen ? "gap-5" : "gap-0",
            )}
          >
            {React.createElement(IconsMap[pathname === homeLinks[0].href ? homeLinks[0].icon : homeLinks[0].outline], {
              width: 25,
              height: 25,
              className: "translate-x-0.5 shrink-0",
            })}
            <span
              className={cn(
                "overflow-hidden whitespace-nowrap transition-[max-width,opacity] duration-300 ease-out [will-change:opacity]",
                isOpen ? "max-w-32 opacity-100 delay-200" : "max-w-0 opacity-0"
              )}
            >
              {homeLinks[0].label}
            </span>
          </Link>

          <button
            type="button"
            aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
            onClick={toggleSidebar}
            className={cn(
              "bg-transparent border-none p-0 transition-[opacity,width] duration-500 ease-out hover:cursor-pointer [will-change:opacity,width]",
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
              "relative flex items-center gap-5 rounded-xl px-2 py-2 transition-[gap,color,background-color,box-shadow] duration-300 ease-out hover:cursor-pointer",
              pathname === link.href ? activeLink : "",
              pathname === link.href
                ? "bg-[linear-gradient(90deg,color-mix(in_srgb,var(--primary)_18%,transparent),transparent)] shadow-[inset_3px_0_0_var(--primary)]"
                : "hover:bg-[var(--surface-elevated-2)]",
              isOpen ? "gap-5" : "gap-0",
            )}
          >
            {React.createElement(IconsMap[pathname === link.href ? link.icon : link.outline], {
              width: 25,
              height: 25,
              className: "translate-x-0.5 shrink-0",
            })}
            <span
              className={cn(
                "overflow-hidden whitespace-nowrap transition-[max-width,opacity] duration-300 ease-out [will-change:opacity]",
                isOpen ? "max-w-32 opacity-100 delay-200" : "max-w-0 opacity-0"
              )}
            >
              {link.label}
            </span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default HomeSidebar;
