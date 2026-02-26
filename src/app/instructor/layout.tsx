import { AppShell } from "@/components/layout/AppShell";

const mockInstructor = {
  email: "instructor@edxelera.com",
  fullName: "Sarah Chen",
};

const instructorNavItems = [
  { label: "Dashboard", href: "/instructor", icon: "📊" },
  { label: "My Programs", href: "/instructor/programs", icon: "📚" },
  { label: "Applicants", href: "/instructor/applicants", icon: "📋" },
  { label: "Settings", href: "/instructor/settings", icon: "⚙️" },
];

export default function InstructorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppShell
      sidebarItems={instructorNavItems}
      role="instructor"
      user={mockInstructor}
    >
      {children}
    </AppShell>
  );
}
