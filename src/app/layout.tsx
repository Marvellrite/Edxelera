import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";

// Google Sans Flex: variable weight 100-1000, optical sizing 8-144
const googleSansFlex = Geist({ 
  subsets: ["latin"],
  variable: "--font-sans-flex"
});

const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: "--font-mono"
});

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
    <html lang="en" suppressHydrationWarning className={`${googleSansFlex.variable} ${geistMono.variable}`}>
      <body className="bg-background text-foreground font-sans">
        {children}
      </body>
    </html>
  );
}
