'use client';

import Header from "@/components/sections/headers/header-4";
// import { usePathname } from "next/navigation";

export default function CourseHeaderShell() {
  // const pathname = usePathname();
  // const shouldHideHeader = pathname?.includes("/course/") && pathname?.endsWith("/complete");

  // if (shouldHideHeader) {
  //   return null;
  // }

  return <Header />;
}
