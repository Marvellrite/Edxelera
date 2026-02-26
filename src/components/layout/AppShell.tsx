import { TopNav } from "./TopNav";
import { Sidebar } from "./Sidebar";

interface SidebarItem {
  label: string;
  href: string;
  icon?: string;
}

interface AppShellProps {
  children: React.ReactNode;
  sidebarItems?: SidebarItem[];
  role?: "student" | "instructor" | "admin";
  user?: {
    email: string;
    fullName: string;
  };
  cohortStatus?: string;
}

export function AppShell({
  children,
  sidebarItems = [],
  role = "student",
  user,
  cohortStatus,
}: AppShellProps) {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Top Navigation */}
      <TopNav variant="app" user={user} cohortStatus={cohortStatus} />

      {/* Body: sidebar + main */}
      <div className="flex flex-1 overflow-hidden">
        {sidebarItems.length > 0 && (
          <Sidebar items={sidebarItems} role={role} user={user} />
        )}

        <main
          className="flex-1 overflow-y-auto"
          style={{ backgroundColor: "var(--color-surface)" }}
        >
          <div className="mx-auto max-w-6xl px-6 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
