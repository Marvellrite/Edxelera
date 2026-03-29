"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Bell,
  BookOutline,
  GridIcon,
  HelpChat,
  PeopleOutline,
  Receipt,
  SettingOutline,
  ShieldStar,
  Toggle,
  UserOutline,
  Users,
} from "@/components/icons/modified";
import { useSidebar } from "@/context/sidebar.context";
import useDragScroll from "@/hooks/useDragScroll";
import { cn } from "@/lib/utils";

import {
  getAdminSidebarSections,
  SIDEBAR_TOGGLE_ICON_SRC,
} from "./admin-sidebar.config";
import { AdminSidebarProps } from "./admin-sidebar.types";

const adminSidebarIcons = {
  Bell,
  BookOutline,
  GridIcon,
  HelpChat,
  PeopleOutline,
  Receipt,
  SettingOutline,
  ShieldStar,
  Toggle,
  UserOutline,
  Users,
};

type AdminSidebarIconName = keyof typeof adminSidebarIcons;

const AdminSidebar = ({ segment }: AdminSidebarProps) => {
  const pathname = usePathname();
  const { toggle, setToggle } = useSidebar();
  const isOpen = !toggle;
  const sections = getAdminSidebarSections(pathname, segment);
  const { dragScrollProps, isDragging, scrollRef } = useDragScroll<HTMLDivElement>();
  const ToggleIcon = adminSidebarIcons[SIDEBAR_TOGGLE_ICON_SRC as AdminSidebarIconName];

  return (
    <aside
      className={cn(
        "hidden min-h-0 md:block md:shrink-0 md:self-start",
        "sticky top-32 h-[calc(100dvh-9rem)] transition-[width] duration-500 ease-in-out [will-change:width]",
        isOpen ? "w-50 lg:w-67.5" : "w-26 lg:w-26"
      )}
    >
      <div
        className={cn(
          "h-full min-h-0 overflow-hidden"
        )}
      >
        <div
          className={cn(
            "h-full min-h-0 w-full"
          )}
        >
          <div
            ref={scrollRef}
            {...dragScrollProps}
            className={cn(
              "admin-panel bg-[rgba(255,255,255,0.985)] h-full w-full min-h-0 overflow-y-auto rounded-2xl no-scrollbar p-4 px-4",
              isDragging ? "cursor-grabbing select-none" : "cursor-grab"
            )}
          >
            <nav className="space-y-4">
              <div
                className={cn(
                  "flex overflow-hidden origin-top transition-[max-height,opacity,transform,margin] duration-400 ease-in-out",
                  isOpen ? "pointer-events-none -mb-2 max-h-0 scale-y-95 opacity-0" : "mb-1 max-h-16 scale-y-100 opacity-100"
                )}
              >
                <button
                  type="button"
                  aria-label={isOpen ? "Collapse admin sidebar" : "Expand admin sidebar"}
                  onClick={() => setToggle(!toggle)}
                  className={cn(isOpen?'translate-x-0':'translate-x-4', "shrink-0 rounded-xl border border-border/70 p-1 transition-colors duration-300 hover:bg-neutral-100")}
                >
                  {React.createElement(ToggleIcon, { width: 22, height: 22,  })}
                </button>
              </div>

              {sections.map((section, index) => {
                //  const isLearning = section.title === 'Learning'
                 const isUsers = section.title === 'Users'
                 const isInsights = section.title === 'Insights'
                 const isSettings = section.collapsedTitle === 'Settings'
                 console.log()
                 return (
                <div key={section.title} className="space-y-1">
                  <div className="mt-1 flex items-center justify-between gap-2">
                    <p
                      className={cn(
                        "admin-sidebar-section-label overflow-hidden whitespace-nowrap text-[11px] uppercase tracking-[0.12em]",
                        "transition-[max-width,opacity,transform] duration-350 ease-out",
                        isOpen
                          ? "max-w-[220px] translate-x-0 opacity-100"
                          : "max-w-full translate-x-0 text-center opacity-100", !isOpen && isUsers && 'translate-x-3.5', !isOpen && isInsights && 'translate-x-1', !isOpen && isSettings && 'translate-x-1'
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
                          "ml-auto shrink-0 rounded-xl border border-border/70 p-1 hover:bg-neutral-100",
                          "transition-[opacity,transform,background-color] duration-300 ease-out",
                          isOpen ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
                        )}
                      >
                        {React.createElement(ToggleIcon, { width: 22, height: 22 })}
                      </button>
                    )}
                  </div>

                  <ul className="mt-2 space-y-1.5">
                    {section.items.map((item) => {
                      const Icon = adminSidebarIcons[item.icon as AdminSidebarIconName];

                      return (
                      <li key={`${section.title}-${item.label}`} className={cn('transition-[padding]', isOpen? 'px-0':'px-2')}>
                        <Link
                          href={item.href}
                          className={cn(
                            "group flex items-center rounded-xl py-2.5",
                            "transition-[padding,background-color,color,box-shadow] duration-300 ease-out",
                            item.active
                              ? "bg-primary/95 shadow-sm text-white"
                              : "text-[var(--admin-text-default)] hover:bg-[rgba(255,238,244,0.82)] hover:text-[var(--admin-text-strong)]",
                            isOpen ? "gap-2 px-3" : "gap-0 px-2"
                          )}
                        >
                          {React.createElement(Icon, {
                            width: 22,
                            height: 22,
                            className: cn(
                              "shrink-0 transition-transform duration-500",
                              item.label === "Dashboard" || item.label === "Settings"
                                ? "group-hover:rotate-180"
                                : "group-hover:rotate-y-180", isOpen ? 'translate-x-0':'translate-x-2'
                            ),
                          })}

                          <span
                            className={cn(
                              "admin-sidebar-item-label overflow-hidden whitespace-nowrap text-sm",
                              "transition-[max-width,opacity,transform] duration-350 ease-out",
                              isOpen
                                ? "max-w-[220px] translate-x-0 opacity-100 delay-75"
                                : "max-w-0 -translate-x-2 opacity-0"
                            )}
                          >
                            {item.label}
                          </span>

                        </Link>
                      </li>
                      );
                    })}
                  </ul>
                </div>
              )
              } )}
            </nav>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
