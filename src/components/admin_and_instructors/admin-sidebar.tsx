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
        "hidden min-h-0 overflow-visible md:block md:shrink-0 md:self-stretch",
        "transition-all duration-500 ease-in-out",
        isOpen ? "w-50 lg:w-67.5" : "w-18 lg:w-18"
      )}
    >
      <div
        className={cn(
          "sticky top-32 z-30 h-[calc(100dvh-9rem)] min-h-0 w-full",
          "transition-all duration-500 ease-in-out"
        )}
      >
        <div
          ref={scrollRef}
          {...dragScrollProps}
          className={cn(
            "admin-panel h-full min-h-0 w-full overflow-y-auto rounded-2xl no-scrollbar",
            "transition-all duration-500 ease-in-out",
            isDragging ? "cursor-grabbing select-none" : "cursor-grab",
            isOpen ? "px-4 py-4" : "px-2 py-4"
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
                className="shrink-0 rounded-xl border border-border/70 p-2 transition-all duration-600 hover:bg-neutral-100"
              >
                <ReactSVG src={SIDEBAR_TOGGLE_ICON_SRC} />
              </button>
            </div>

            {sections.map((section, index) => (
              <div key={section.title} className="space-y-1">
              <div className="mt-1 flex items-center justify-between gap-2">
                  <p
                    className={cn(
                      "admin-soft overflow-hidden whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.12em]",
                      "transition-[max-width,opacity,letter-spacing,transform] duration-500 ease-in-out",
                      isOpen
                        ? "max-w-[220px] translate-x-0 opacity-100"
                        : "max-w-full translate-x-0 text-center opacity-100"
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
                        "ml-auto shrink-0 rounded-xl border border-border/70 p-2 hover:bg-neutral-100",
                        "transition-[opacity,transform] duration-300 ease-in-out",
                        isOpen ? "scale-100 opacity-100" : "pointer-events-none scale-90 opacity-0"
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
                          "group flex items-center rounded-xl py-2.5",
                          "transition-[padding,background-color,color,box-shadow] duration-300 ease-out", 'transition-all duration-500 ease-in-out',
                          item.active
                            ? "bg-primary/95 text-white shadow-sm"
                            : "text-[var(--admin-text-default)] hover:bg-[rgba(255,238,244,0.82)] hover:text-[var(--admin-text-strong)]",
                          isOpen ? "gap-2 px-3" : " gap-0 px-2"
                        )}
                      >
                        <ReactSVG
                          src={item.icon}
                          className={cn(
                            "shrink-0 transition-transform duration-500",
                            item.label === "Dashboard" || item.label === "Settings"
                              ? "group-hover:rotate-180"
                              : "group-hover:rotate-y-180"
                          )}
                        />

                        <span
                          className={cn(
                            "overflow-hidden whitespace-nowrap text-sm font-medium",
                            "transition-all duration-500 ease-in-out",
                            isOpen
                              ? "max-w-[220px] translate-x-0 opacity-100 delay-150"
                              : "max-w-0 -translate-x-2 opacity-0"
                          )}
                        >
                          {item.label}
                        </span>

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
