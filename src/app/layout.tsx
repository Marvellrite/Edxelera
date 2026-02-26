import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "EdXelera - Cohort-Based Learning",
  description:
    "Accelerate your learning journey with our cohort-based LMS. Structured programs, live sessions, and community-driven education.",
  keywords: [
    "LMS",
    "cohort-based",
    "online learning",
    "education",
    "courses",
  ],
  authors: [{ name: "EdXelera" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://edxelera.com",
    siteName: "EdXelera",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#001146",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground font-sans">{children}</body>
    </html>
  );
}
