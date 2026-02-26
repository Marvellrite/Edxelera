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
}

export function AppShell({
  children,
  sidebarItems = [],
  role = "student",
  user,
}: AppShellProps) {
  return (
    <div className="h-screen flex flex-col">
      {/* Top Navigation */}
      <TopNav variant="app" user={user} />

      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        {sidebarItems.length > 0 && (
          <Sidebar items={sidebarItems} role={role} />
        )}

        {/* Main content */}
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
