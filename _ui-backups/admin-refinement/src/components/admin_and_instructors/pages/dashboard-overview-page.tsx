"use client";

import Overview from "@/components/admin_and_instructors/overview/overview";
import BarChartComponent from "@/components/admin_and_instructors/overview/barchart";
import DoughnutChart from "@/components/admin_and_instructors/overview/doughnutchart";
import Performance from "@/components/admin_and_instructors/performance";
import { useSidebar } from "@/context/sidebar.context";

import { getDashboardMainPaneClass } from "./route-utils";

const DashboardOverviewPage = () => {
  const { toggle } = useSidebar();

  return (
    <section
      className={`${getDashboardMainPaneClass(toggle)} mt-2 md:mt-4 flex flex-col gap-4 md:gap-5 overflow-y-auto no-scrollbar pb-2`}
    >
      <Overview />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-10 xl:gap-5">
        <div className="xl:col-span-6">
          <BarChartComponent />
        </div>

        <div className="xl:col-span-4">
          <DoughnutChart />
        </div>
      </div>

      <Performance />
    </section>
  );
};

export default DashboardOverviewPage;
