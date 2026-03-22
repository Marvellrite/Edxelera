"use client";

import { ReactSVG } from "react-svg";
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  { name: "Mon", uv: 760 },
  { name: "Tue", uv: 450 },
  { name: "Wed", uv: 860 },
  { name: "Thu", uv: 240 },
  { name: "Fri", uv: 680 },
  { name: "Sat", uv: 590 },
  { name: "Sun", uv: 770 },
];

const BarChartComponent = () => {
  return (
    <section className="admin-panel admin-chart-card h-full rounded-2xl">
      <div className="admin-chart-card__header">
        <div>
          <p className="admin-title text-lg font-semibold">User Enrollment</p>
          <p className="admin-muted text-xs">Weekly trend across all active courses</p>
        </div>

        <button className="admin-chip admin-chip--compact">
          <span className="flex items-center gap-2">
            This Week
            <ReactSVG
              src="https://res.cloudinary.com/dx5iohojj/image/upload/v1773340473/repo-images/public/icons/dropdown.svg"
              afterInjection={(svg) => svg.setAttribute("width", "14")}
            />
          </span>
        </button>
      </div>

      <div className="admin-chart-surface">
        <div className="h-[280px] w-full md:h-[320px]">
          <BarChart
            className="h-full w-full"
            responsive
            data={data}
            margin={{ top: 8, right: 8, left: 2, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="rgba(148, 163, 184, 0.22)" />
            <XAxis dataKey="name" style={{ fontSize: 12, fill: "var(--admin-text-muted)" }} tickLine={false} axisLine={false} />
            <YAxis
              width={30}
              axisLine={false}
              tickLine={false}
              allowDecimals={false}
              ticks={[0, 200, 400, 600, 800, 1000]}
              style={{ fontSize: 12, fill: "var(--admin-text-muted)" }}
            />
            <Tooltip cursor={{ fill: "rgba(0, 17, 70, 0.03)" }} />
            <Bar dataKey="uv" fill="var(--color-primary)" radius={[8, 8, 0, 0]} barSize={34} isAnimationActive />
          </BarChart>
        </div>
      </div>
    </section>
  );
};

export default BarChartComponent;
