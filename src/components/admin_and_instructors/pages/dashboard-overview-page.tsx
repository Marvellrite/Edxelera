"use client";

import Overview from "@/components/admin_and_instructors/overview/overview";
import BarChartComponent from "@/components/admin_and_instructors/overview/barchart";
import DoughnutChart from "@/components/admin_and_instructors/overview/doughnutchart";
import Performance from "@/components/admin_and_instructors/performance";
import { useSidebar } from "@/context/sidebar";
import { getDashboardMainPaneClass } from "./route-utils";

const DashboardOverviewPage = () => {
  const { toggle } = useSidebar();

  return (
    <section
      className={`${getDashboardMainPaneClass(toggle)} mt-3 md:mt-5 flex flex-col gap-3 overflow-y-auto no-scrollbar`}
    >
      <Overview />
      <div className="flex flex-col gap-2.5 lg:flex-row">
        <BarChartComponent />
        <DoughnutChart />
      </div>
      <Performance />
    </section>
  );
};

export default DashboardOverviewPage;
