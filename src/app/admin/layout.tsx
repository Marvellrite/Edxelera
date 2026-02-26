import { AppShell } from "@/components/layout/AppShell";

const mockAdmin = {
  email: "admin@edxelera.com",
  fullName: "Admin User",
};

const adminNavItems = [
  { label: "Dashboard", href: "/admin", icon: "📊" },
  { label: "Programs", href: "/admin/programs", icon: "📚" },
  { label: "Users", href: "/admin/users", icon: "👥" },
  { label: "Payments", href: "/admin/payments", icon: "💳" },
  { label: "Content", href: "/admin/content", icon: "📝" },
  { label: "Settings", href: "/admin/settings", icon: "⚙️" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppShell
      sidebarItems={adminNavItems}
      role="admin"
      user={mockAdmin}
    >
      {children}
    </AppShell>
  );
}
