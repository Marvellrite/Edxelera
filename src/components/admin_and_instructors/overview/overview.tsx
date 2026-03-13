"use client";

import { ReactSVG } from "react-svg";

type StatCard = {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  previousLabel: string;
  icon: string;
};

const stats: StatCard[] = [
  {
    title: "Total Users",
    value: "20,000",
    change: "+4.9%",
    trend: "up",
    previousLabel: "19,892",
    icon: "https://res.cloudinary.com/dx5iohojj/image/upload/v1773340611/repo-images/public/icons/user-outline.svg",
  },
  {
    title: "Active Learners",
    value: "16,487",
    change: "+4.9%",
    trend: "up",
    previousLabel: "13,892",
    icon: "https://res.cloudinary.com/dx5iohojj/image/upload/v1773340606/repo-images/public/icons/teacher.svg",
  },
  {
    title: "Course Completion Rate",
    value: "87%",
    change: "-4.9%",
    trend: "down",
    previousLabel: "92%",
    icon: "https://res.cloudinary.com/dx5iohojj/image/upload/v1773340564/repo-images/public/icons/pie.svg",
  },
  {
    title: "Total Revenue",
    value: "₦900,400",
    change: "+4.9%",
    trend: "up",
    previousLabel: "₦840,000",
    icon: "https://res.cloudinary.com/dx5iohojj/image/upload/v1773340541/repo-images/public/icons/money-receive.svg",
  },
];

const Overview = () => {
  return (
    <section className="space-y-4 md:space-y-5">
      <header className="rounded-2xl border border-border/70 bg-white px-4 py-4 shadow-sm md:px-5 md:py-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">Admin Dashboard</p>
            <h1 className="mt-1 text-2xl font-semibold text-neutral-900 md:text-[1.75rem]">Overview</h1>
            <p className="mt-1.5 text-sm text-neutral-500">
              Welcome back. Here&apos;s a quick snapshot of users, learning activity, and revenue performance.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-neutral-50 px-3 py-2 text-right">
            <p className="text-xs uppercase tracking-wide text-neutral-500">Reporting window</p>
            <p className="text-sm font-medium text-neutral-800">Last 30 days</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 2xl:grid-cols-4 md:gap-4">
        {stats.map((item) => (
          <article
            key={item.title}
            className="group rounded-2xl border border-border/70 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md md:p-5"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-medium text-neutral-600">{item.title}</p>
              <ReactSVG
                src={item.icon}
                className="flex rounded-full border border-border bg-neutral-50 p-2 transition-colors group-hover:bg-neutral-100"
                afterInjection={(svg) => {
                  svg.setAttribute("width", "16");
                  svg.setAttribute("height", "16");
                }}
              />
            </div>

            <div className="mt-6 flex items-end gap-2">
              <h3 className="text-3xl font-semibold leading-none tracking-tight text-neutral-900 md:text-[2rem]">{item.value}</h3>
              <small
                className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                  item.trend === "up" ? "bg-success/15 text-success-foreground" : "bg-danger/15 text-danger-foreground"
                }`}
              >
                {item.change}
              </small>
            </div>

            <p className="mt-4 text-xs text-neutral-500">
              Last month: <span className="font-semibold text-neutral-700">{item.previousLabel}</span>
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Overview;
