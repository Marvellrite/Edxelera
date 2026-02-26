"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  Award,
  Settings,
  Users,
  CreditCard,
  FileText,
  ClipboardList,
  LogOut,
  ChevronRight,
} from "lucide-react";

const ICON_MAP: Record<string, React.ElementType> = {
  dashboard: LayoutDashboard,
  programs: BookOpen,
  courses: GraduationCap,
  certificates: Award,
  settings: Settings,
  users: Users,
  payments: CreditCard,
  content: FileText,
  applicants: ClipboardList,
};

function resolveIcon(label: string): React.ElementType {
  const key = label.toLowerCase().replace(/\s+/g, "").replace("my", "");
  return ICON_MAP[key] ?? LayoutDashboard;
}

interface SidebarItem {
  label: string;
  href: string;
  icon?: string;
}

interface SidebarProps {
  items: SidebarItem[];
  role?: "student" | "instructor" | "admin";
  user?: { fullName: string; email: string };
}

const ROLE_LABEL: Record<string, string> = {
  student: "Student Portal",
  instructor: "Instructor Portal",
  admin: "Admin Panel",
};

export function Sidebar({ items, role = "student", user }: SidebarProps) {
  const pathname = usePathname();

  const initials = user?.fullName
    ? user.fullName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "U";

  return (
    <aside
      className="w-64 flex flex-col h-full shrink-0"
      style={{ backgroundColor: "var(--color-sidebar-bg)", borderRight: "1px solid var(--color-sidebar-border)" }}
    >
      {/* Logo + Role header */}
      <div
        className="px-5 py-5 flex flex-col gap-1"
        style={{ borderBottom: "1px solid var(--color-sidebar-border)" }}
      >
        <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--color-sidebar-text)" }}>
          {ROLE_LABEL[role]}
        </span>
      </div>

      {/* Nav items */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <div className="flex flex-col gap-0.5">
          {items.map((item) => {
            const isActive =
              item.href === "/app" ||
              item.href === "/instructor" ||
              item.href === "/admin"
                ? pathname === item.href
                : pathname.startsWith(item.href);
            const Icon = resolveIcon(item.label);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "nav-active-border"
                    : "border-l-[3px] border-transparent",
                ].join(" ")}
                style={
                  isActive
                    ? {
                        backgroundColor: "rgba(0,17,70,0.85)",
                        color: "var(--color-sidebar-text-active)",
                        paddingLeft: "calc(0.75rem - 3px)",
                      }
                    : {
                        color: "var(--color-sidebar-text)",
                        paddingLeft: "calc(0.75rem - 3px)",
                      }
                }
                onMouseEnter={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.04)";
                    (e.currentTarget as HTMLElement).style.color = "#d1d5db";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "";
                    (e.currentTarget as HTMLElement).style.color = "var(--color-sidebar-text)";
                  }
                }}
              >
                <Icon
                  size={16}
                  className="shrink-0 transition-colors duration-200"
                  style={{ opacity: isActive ? 1 : 0.7 }}
                />
                <span className="flex-1">{item.label}</span>
                {isActive && (
                  <ChevronRight size={12} className="opacity-50" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* User footer */}
      <div
        className="px-3 py-4"
        style={{ borderTop: "1px solid var(--color-sidebar-border)" }}
      >
        {user && (
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
              style={{ backgroundColor: "var(--color-brand-primary-600)", color: "#fff" }}
            >
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate" style={{ color: "#e5e7eb" }}>
                {user.fullName}
              </p>
              <p className="text-xs truncate" style={{ color: "var(--color-sidebar-text)" }}>
                {user.email}
              </p>
            </div>
          </div>
        )}
        <button
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200"
          style={{ color: "var(--color-sidebar-text)" }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.04)";
            (e.currentTarget as HTMLElement).style.color = "#d1d5db";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor = "";
            (e.currentTarget as HTMLElement).style.color = "var(--color-sidebar-text)";
          }}
        >
          <LogOut size={16} className="shrink-0" style={{ opacity: 0.7 }} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
