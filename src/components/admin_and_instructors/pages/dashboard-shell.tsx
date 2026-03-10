import { ReactNode } from "react";

import Header from "@/components/admin_and_instructors/header";
import Sidebar from "@/components/admin_and_instructors/sidebar";
import { ContextProvider } from "@/context";

import { DashboardSegment } from "./route-utils";

type DashboardShellProps = {
  children: ReactNode;
  segment: DashboardSegment;
};

const DashboardShell = ({ children, segment }: DashboardShellProps) => {
  return (
    <ContextProvider>
      <section className="antialiased min-h-dvh p-3 md:p-4 grid grid-cols-1 grid-rows-[auto_1fr] md:grid-cols-12 md:grid-rows-12 gap-3 md:gap-4">
        <Header />

        <main className="col-span-1 md:col-span-12 md:row-span-10 grid grid-cols-1 md:grid-cols-10 gap-3 md:gap-4 min-h-0">
          <Sidebar segment={segment} />
          {children}
        </main>
      </section>
    </ContextProvider>
  );
};

export default DashboardShell;
