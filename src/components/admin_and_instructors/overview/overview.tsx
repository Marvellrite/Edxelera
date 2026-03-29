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
    value: "NGN 900,400",
    change: "+4.9%",
    trend: "up",
    previousLabel: "NGN 840,000",
    icon: "https://res.cloudinary.com/dx5iohojj/image/upload/v1773340541/repo-images/public/icons/money-receive.svg",
  },
];

const Overview = () => {
  return (
    <section className="space-y-4 md:space-y-5">
      <header className="admin-panel rounded-2xl px-4 py-4 md:px-6 md:py-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl">
            <p className="admin-eyebrow text-xs font-semibold uppercase">Admin Dashboard</p>
            <h1 className="admin-title mt-1 text-2xl font-semibold md:text-[1.75rem]">Overview</h1>
            <p className="admin-muted admin-page-lead mt-1.5">
              Welcome back. Here&apos;s a quick snapshot of users, learning activity, and revenue performance.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 lg:justify-end">
            <span className="admin-chip admin-chip--compact">Last 30 days</span>
            <span className="admin-chip admin-chip--compact admin-chip--ghost">Updated 8 mins ago</span>
          </div>
        </div>
      </header>

      <div className="admin-stat-grid">
        {stats.map((item) => (
          <article
  key={item.title}
  className="
    admin-panel admin-stat-card group relative isolate overflow-hidden rounded-2xl
    border border-white/10
    transition-all duration-300 ease-out
    hover:-translate-y-1
    hover:shadow-[0_16px_40px_rgba(15,23,42,0.12)]
    hover:ring-1 hover:ring-white/20
    hover:border-white/20
    focus-within:-translate-y-1
    focus-within:shadow-[0_16px_40px_rgba(15,23,42,0.12)]
    focus-within:ring-1 focus-within:ring-white/20
  "
>
 

  <div className="relative z-10">
    <div className="admin-stat-card__header">
      <div className="space-y-2">
        <p className="admin-stat-card__label text-sm transition-colors duration-300 group-hover:text-foreground/90">
          {item.title}
        </p>
        {/* <p className="admin-soft text-xs">Compared with the previous reporting window</p> */}
      </div>

      <div
        className="
          rounded-xl p-2
          transition-all duration-300 ease-out
          bg-white/[0.03]
          group-hover:scale-110
          group-hover:-rotate-3
          group-hover:bg-white/[0.08]
        "
      >
        <ReactSVG
          src={item.icon}
          className="admin-stat-card__icon shrink-0 transition-transform duration-300"
          afterInjection={(svg) => {
            svg.setAttribute("width", "16");
            svg.setAttribute("height", "16");
          }}
        />
      </div>
    </div>

    <div className="admin-stat-card__value-row">
      <h3
        className="
          admin-title text-3xl font-semibold leading-none tracking-tight md:text-[2rem]
          transition-all duration-300
          group-hover:tracking-[0.01em]
          group-hover:text-foreground
        "
      >
        {item.value}
      </h3>

      <small
        className={`
          admin-stat-card__delta transition-all duration-300
          group-hover:scale-105 group-hover:translate-x-0.5
          ${item.trend === "up" ? "is-up" : "is-down"}
        `}
      >
        {item.change}
      </small>
    </div>

    <div className="admin-stat-card__meta">
      <p className="admin-soft text-xs transition-colors duration-300 group-hover:text-foreground/75">
        Previous: <span className="admin-text font-semibold">{item.previousLabel}</span>
      </p>

      <p
        className={`
          text-xs font-medium transition-all duration-300
          ${item.trend === "up"
            ? "text-emerald-600/90 group-hover:text-emerald-600"
            : "text-amber-600/90 group-hover:text-amber-600"}
        `}
      >
        {item.trend === "up" ? "Trending up" : "Needs attention"}
      </p>
    </div>
  </div>
</article>
        ))}
      </div>
    </section>
  );
};

export default Overview;
