import { ReactNode } from "react";

import Header from "@/components/shared/headers/header-5";
import Sidebar from "@/components/admin_and_instructors/sidebar";
import ContextProvider from "@/context";

import { DashboardSegment } from "./route-utils";

type DashboardShellProps = {
  children: ReactNode;
  segment: DashboardSegment;
};

const DashboardShell = ({ children, segment }: DashboardShellProps) => {
  return (
    <ContextProvider>
      <section className="admin-shell antialiased min-h-dvh p-3 md:p-4 grid grid-cols-1 grid-rows-[96px_minmax(0,1fr)] md:grid-cols-12 md:grid-rows-[96px_minmax(0,1fr)] gap-3 md:gap-4">
        <div className="col-span-1 h-24 md:col-span-12" aria-hidden="true" />
        <div className="fixed left-3 right-3 top-3 z-40 md:left-4 md:right-4 md:top-4">
          <div className="admin-page-frame">
            <Header />
          </div>
        </div>

        <main className="col-span-1 md:col-span-12 flex min-h-0 flex-col gap-3 md:flex-row md:gap-4">
          <Sidebar segment={segment} />
          {children}
        </main>
      </section>
    </ContextProvider>
  );
};

export default DashboardShell;
