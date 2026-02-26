import { Logo } from "@/components/branding/Logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-muted-background">
      {/* Header */}
      <div className="px-4 py-6 border-b border-border">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Logo variant="icon" size="md" />
          <p className="text-sm text-muted-foreground">EdXelera</p>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        {children}
      </div>
    </div>
  );
}
