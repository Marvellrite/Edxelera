import { AppShell } from "@/components/layout/AppShell";

const mockUser = {
  email: "student@edxelera.com",
  fullName: "Alex Johnson",
};

const studentNavItems = [
  { label: "Dashboard", href: "/app", icon: "📊" },
  { label: "My Programs", href: "/app/programs", icon: "📚" },
  { label: "Courses", href: "/app/courses", icon: "🎓" },
  { label: "Certificates", href: "/app/certificates", icon: "🏆" },
  { label: "Settings", href: "/app/settings", icon: "⚙️" },
];

export default function StudentAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppShell
      sidebarItems={studentNavItems}
      role="student"
      user={mockUser}
    >
      {children}
    </AppShell>
  );
}
