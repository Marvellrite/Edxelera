"use client";

import { useMemo, useState } from "react";
import { useLayer } from "react-laag";
import { ReactSVG } from "react-svg";
import { Pie, PieChart, Tooltip } from "recharts";

const data = [
  { name: "Corporate Branding & Design", value: 100, fill: "#FC61C7" },
  { name: "Back End Development", value: 86, fill: "#50A0FF" },
  { name: "Product Design", value: 75, fill: "var(--color-primary)" },
  { name: "Full Stack Development", value: 95, fill: "#7F00D4" },
  { name: "Social Media Marketing", value: 30, fill: "#FF6200" },
  { name: "WordPress Development", value: 45, fill: "#040506" },
  { name: "Data Analytics", value: 55, fill: "#494949" },
  { name: "Front End Development", value: 80, fill: "#800002" },
];

const DoughnutChart = () => {
  const [timeframe, setTimeframe] = useState("All time");
  const [isTimeRangePopper, setIsTimeRangePopper] = useState(false);

  const closeTimeRangePopper = () => {
    setIsTimeRangePopper(false);
  };

  const topCourses = useMemo(() => [...data].sort((a, b) => b.value - a.value).slice(0, 5), []);

  const { renderLayer, triggerProps, layerProps } = useLayer({
    isOpen: isTimeRangePopper,
    onOutsideClick: closeTimeRangePopper,
    onDisappear: closeTimeRangePopper,
    overflowContainer: false,
    auto: true,
    placement: "bottom-end",
    triggerOffset: 8,
    containerOffset: 12,
  });

  return (
    <section className="relative h-full rounded-2xl border border-border/70 bg-white p-4 shadow-sm md:p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-lg font-semibold text-neutral-900">Course Engagement</p>
          <p className="text-xs text-neutral-500">Top courses by participation volume</p>
        </div>

        <button
          {...triggerProps}
          onClick={() => setIsTimeRangePopper((prev) => !prev)}
          className="flex items-center gap-2 rounded-full border border-border bg-neutral-50 py-1.5 pl-3 pr-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100"
        >
          <span>{timeframe}</span>
          <ReactSVG
            src="https://res.cloudinary.com/dx5iohojj/image/upload/v1773340473/repo-images/public/icons/dropdown.svg"
            afterInjection={(svg) => svg.setAttribute("width", "14")}
          />
        </button>
      </div>

      <div className="grid grid-cols-1 items-center gap-4 xl:grid-cols-2">
        <div className="mx-auto h-[230px] w-[230px]">
          <PieChart className="h-full w-full" responsive>
            <Tooltip />
            <Pie
              data={data}
              innerRadius="68%"
              outerRadius="100%"
              stroke="none"
              cornerRadius="6%"
              paddingAngle={3}
              dataKey="value"
              isAnimationActive
            />
          </PieChart>
        </div>

        <div className="space-y-2">
          {topCourses.map((course) => (
            <div key={course.name} className="flex items-center justify-between rounded-xl border border-border/70 bg-neutral-50/70 px-3 py-2">
              <div className="flex min-w-0 items-center gap-2">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: course.fill }} />
                <span className="truncate text-sm text-neutral-700">{course.name}</span>
              </div>
              <span className="text-xs font-semibold text-neutral-500">{course.value}%</span>
            </div>
          ))}
        </div>
      </div>

      {isTimeRangePopper &&
        renderLayer(
          <div {...layerProps} className="z-50 min-w-[10rem] rounded-xl border border-border bg-white p-1 shadow-lg">
            {["All time", "This week", "This month", "This year"].map((range) => (
              <button
                key={range}
                className="w-full rounded-lg px-3 py-2 text-left text-sm text-neutral-700 transition-colors hover:bg-neutral-100"
                onClick={() => {
                  setTimeframe(range);
                  closeTimeRangePopper();
                }}
              >
                {range}
              </button>
            ))}
          </div>,
        )}
    </section>
  );
};

export default DoughnutChart;
