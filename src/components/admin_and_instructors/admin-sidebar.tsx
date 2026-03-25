"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactSVG } from "react-svg";

import { useSidebar } from "@/context/sidebar.context";
import useDragScroll from "@/hooks/useDragScroll";
import { cn } from "@/lib/utils";

import {
  getAdminSidebarSections,
  SIDEBAR_TOGGLE_ICON_SRC,
} from "./admin-sidebar.config";
import { AdminSidebarProps } from "./admin-sidebar.types";

const AdminSidebar = ({ segment }: AdminSidebarProps) => {
  const pathname = usePathname();
  const { toggle, setToggle } = useSidebar();
  const isOpen = !toggle;
  const sections = getAdminSidebarSections(pathname, segment);
  const { dragScrollProps, isDragging, scrollRef } = useDragScroll<HTMLDivElement>();

  return (
    <aside
      className={cn(
        "col-span-1 hidden h-full min-h-0 md:block transition-all duration-[600ms]",
        isOpen ? "md:col-span-2" : "md:col-span-1"
      )}
    >
      <div
        className={cn(
          "fixed bottom-4 top-32 z-30 min-h-0 transition-all duration-[600ms]",
          isOpen
            ? "left-4 w-[calc(((100vw-11rem)/10)*2+1rem)]"
            : "left-4 w-[calc((100vw-11rem)/10)]"
        )}
      >
        <div
          ref={scrollRef}
          {...dragScrollProps}
          className={cn(
            "admin-panel h-full min-h-0 w-full overflow-y-auto rounded-2xl no-scrollbar transition-all duration-[600ms]",
            isDragging ? "cursor-grabbing select-none" : "cursor-grab",
            isOpen ? "px-4 py-4" : "px-2 py-4"
          )}
        >
          <nav className="space-y-4">
            <div
              className={cn(
                "flex overflow-hidden transform-origin-top transition-all duration-[600ms]",
                isOpen ? "max-h-0 scale-y-0 opacity-0" : "max-h-16 scale-y-100 opacity-100"
              )}
            >
              <button
                type="button"
                aria-label={isOpen ? "Collapse admin sidebar" : "Expand admin sidebar"}
                onClick={() => setToggle(!toggle)}
                className="shrink-0 rounded-xl border border-border/70 p-2 transition-all duration-[600ms] hover:bg-neutral-100"
              >
                <ReactSVG src={SIDEBAR_TOGGLE_ICON_SRC} />
              </button>
            </div>

            {sections.map((section, index) => (
              <div key={section.title} className="space-y-1">
                <div className="mt-1 flex items-center justify-between gap-2">
                  <p
                    className={cn(
                      "admin-soft overflow-hidden whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.12em] transition-all duration-[600ms]",
                      isOpen ? "max-w-[220px] opacity-100" : "w-full text-center opacity-100"
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
                        "ml-auto shrink-0 rounded-xl border border-border/70 p-2 transition-all duration-[600ms] hover:bg-neutral-100",
                        isOpen ? "scale-100 opacity-100" : "pointer-events-none scale-0 opacity-0"
                      )}
                    >
                      <ReactSVG src={SIDEBAR_TOGGLE_ICON_SRC} />
                    </button>
                  )}
                </div>

                <ul className="mt-2 space-y-1.5">
                  {section.items.map((item) => (
                    <li key={`${section.title}-${item.label}`}>
                      <Link
                        href={item.href}
                        className={cn(
                          "group flex items-center rounded-xl py-2.5 transition-all duration-300",
                          item.active
                            ? "bg-primary/95 text-white shadow-sm"
                            : "text-[var(--admin-text-default)] hover:bg-[rgba(238,244,255,0.82)] hover:text-[var(--admin-text-strong)]",
                          isOpen ? "gap-2 px-3" : "justify-center px-2"
                        )}
                      >
                        <ReactSVG
                          src={item.icon}
                          className={cn(
                            "shrink-0 duration-500",
                            item.label === "Dashboard" || item.label === "Settings"
                              ? "group-hover:rotate-180"
                              : "group-hover:rotate-y-180"
                          )}
                        />

                        {!item.hideWhenCollapsed && (
                          <span
                            className={cn(
                              "overflow-hidden whitespace-nowrap text-sm font-medium transition-all duration-[600ms]",
                              isOpen ? "max-w-[220px] opacity-100 delay-250" : "max-w-0 opacity-0 delay-0"
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
