import { TopNav } from "@/components/layout/TopNav";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <TopNav variant="marketing" />
      <main>{children}</main>
    </div>
  );
}
