"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarItem {
  label: string;
  href: string;
  icon?: string;
}

interface SidebarProps {
  items: SidebarItem[];
  role?: "student" | "instructor" | "admin";
}

export function Sidebar({ items, role = "student" }: SidebarProps) {
  const pathname = usePathname();

  const roleColors = {
    student: "border-blue-500",
    instructor: "border-purple-500",
    admin: "border-red-500",
  };

  return (
    <aside className="w-64 border-r border-border bg-background">
      <div className="flex flex-col h-full">
        {/* Role indicator */}
        <div
          className={`border-b border-border px-4 py-3 ${roleColors[role]}`}
        >
          <p className="text-xs font-semibold text-muted-foreground uppercase">
            {role} Portal
          </p>
        </div>

        {/* Navigation items */}
        <nav className="flex-1 overflow-y-auto px-2 py-4">
          <div className="space-y-1">
            {items.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-accent text-white"
                      : "text-foreground hover:bg-muted-background"
                  }`}
                >
                  {item.icon && <span className="text-base">{item.icon}</span>}
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="border-t border-border px-4 py-3">
          <button className="w-full rounded-md bg-muted-background px-3 py-2 text-sm font-medium text-foreground hover:bg-muted-background/80 transition-colors">
            Sign Out
          </button>
        </div>
      </div>
    </aside>
  );
}
