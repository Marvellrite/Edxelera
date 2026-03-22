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
      <header className="admin-panel rounded-2xl px-4 py-4 md:px-5 md:py-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="admin-eyebrow text-xs font-semibold uppercase">Admin Dashboard</p>
            <h1 className="admin-title mt-1 text-2xl font-semibold md:text-[1.75rem]">Overview</h1>
            <p className="admin-muted mt-1.5 max-w-2xl text-sm leading-6">
              Welcome back. Here&apos;s a quick snapshot of users, learning activity, and revenue performance.
            </p>
          </div>

          <div className="admin-panel-subtle rounded-xl px-3 py-2.5 text-right">
            <p className="admin-soft text-[11px] font-semibold uppercase tracking-[0.14em]">Reporting window</p>
            <p className="admin-title mt-1 text-sm font-semibold">Last 30 days</p>
          </div>
        </div>
      </header>

      <div className="admin-stat-grid">
        {stats.map((item) => (
          <article
            key={item.title}
            className="admin-panel admin-stat-card group rounded-2xl p-4 transition-all duration-300 hover:-translate-y-0.5 md:p-5"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="admin-muted text-sm font-semibold">{item.title}</p>
              <ReactSVG
                src={item.icon}
                className="admin-panel-subtle flex rounded-full p-2 transition-colors group-hover:bg-[rgba(238,244,255,0.85)]"
                afterInjection={(svg) => {
                  svg.setAttribute("width", "16");
                  svg.setAttribute("height", "16");
                }}
              />
            </div>

            <div className="mt-7 flex items-end gap-2">
              <h3 className="admin-title text-3xl font-semibold leading-none tracking-tight md:text-[2rem]">{item.value}</h3>
              <small
                className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                  item.trend === "up"
                    ? "bg-[rgba(47,79,255,0.08)] text-[var(--primary-700)]"
                    : "bg-[rgba(237,28,36,0.08)] text-[var(--secondary-700)]"
                }`}
              >
                {item.change}
              </small>
            </div>

            <p className="admin-soft mt-4 text-xs">
              Last month: <span className="admin-text font-semibold">{item.previousLabel}</span>
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Overview;
