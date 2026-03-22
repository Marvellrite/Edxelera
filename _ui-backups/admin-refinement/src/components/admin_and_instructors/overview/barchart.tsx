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
    <section className="h-full rounded-2xl border border-border/70 bg-white p-4 shadow-sm md:p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-lg font-semibold text-neutral-900">User Enrollment</p>
          <p className="text-xs text-neutral-500">Weekly trend across all active courses</p>
        </div>

        <button className="rounded-full border border-border bg-neutral-50 px-3 py-1.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100">
          <span className="flex items-center gap-2">
            This Week
            <ReactSVG
              src="https://res.cloudinary.com/dx5iohojj/image/upload/v1773340473/repo-images/public/icons/dropdown.svg"
              afterInjection={(svg) => svg.setAttribute("width", "14")}
            />
          </span>
        </button>
      </div>

      <div className="h-[280px] w-full md:h-[320px]">
        <BarChart
          className="h-full w-full"
          responsive
          data={data}
          margin={{ top: 8, right: 8, left: 8, bottom: 4 }}
        >
          <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="rgba(120,120,120,0.2)" />
          <XAxis dataKey="name" style={{ fontSize: 12 }} tickLine={false} axisLine={false} />
          <YAxis
            width={30}
            axisLine={false}
            tickLine={false}
            allowDecimals={false}
            ticks={[0, 200, 400, 600, 800, 1000]}
            style={{ fontSize: 12 }}
          />
          <Tooltip cursor={{ fill: "rgba(0,0,0,0.03)" }} />
          <Bar dataKey="uv" fill="var(--color-primary)" radius={[8, 8, 0, 0]} barSize={34} isAnimationActive />
        </BarChart>
      </div>
    </section>
  );
};

export default BarChartComponent;
