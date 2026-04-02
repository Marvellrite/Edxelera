import { ReactNode } from "react";
import { Certificate, MoneyReceive, TeacherOutline } from "@/components/admin_and_instructors/icons/modified";
import formatMoney from "@/lib/utils/formatMoney";
import { DashboardStats } from "@/mock/transactions";
import { cn } from "@/lib/utils";

type OverviewProps = {
  stats: DashboardStats;
};

type SummaryCardProps = {
  title: string;
  value: string;
  delta: number;
  comparisonLabel: string;
  comparisonValue: string;
  icon: ReactNode;
};

function SummaryCard({
  title,
  value,
  delta,
  comparisonLabel,
  comparisonValue,
  icon,
}: SummaryCardProps) {
  const isPositive = delta >= 0;
  const deltaLabel = `${isPositive ? "+" : ""}${delta}%`;

  return (
    <article className="admin-panel admin-stat-card relative rounded-2xl">
      <div className="admin-stat-card__header">
        <div>
          <p className="admin-stat-card__label text-[11px] uppercase tracking-[0.14em]">{title}</p>
          <div className="admin-stat-card__value-row mt-3">
            <h3 className="admin-title text-3xl font-semibold tracking-tight md:text-[2rem]">{value}</h3>
            <span className={cn("admin-stat-card__delta", isPositive ? "is-up" : "is-down")}>
              {deltaLabel}
            </span>
          </div>
        </div>

        <span className="admin-stat-card__icon">{icon}</span>
      </div>

      <div className="admin-stat-card__meta">
        <div>
          <p className="admin-section-label text-[11px] uppercase tracking-[0.14em]">
            {comparisonLabel}
          </p>
          <p className="admin-text mt-1 text-sm font-semibold">{comparisonValue}</p>
        </div>

        <p className="admin-muted text-xs">
          {isPositive ? "Momentum is trending upward." : "Review recent activity changes."}
        </p>
      </div>
    </article>
  );
}

const Overview = ({ stats }: OverviewProps) => {
  return (
    <section className="admin-stat-grid">
      <SummaryCard
        icon={<MoneyReceive />}
        title="Total Revenue"
        value={`NGN ${formatMoney(stats.totalRevenue.current)}`}
        delta={stats.totalRevenue.percentageChange}
        comparisonLabel="Last Month"
        comparisonValue={`NGN ${formatMoney(stats.totalRevenue.lastMonth)}`}
      />

      <SummaryCard
        icon={<TeacherOutline />}
        title="Active Learners"
        value={stats.activeLearners.current.toLocaleString("en-US")}
        delta={stats.activeLearners.percentageChange}
        comparisonLabel="Last Month"
        comparisonValue={stats.activeLearners.lastMonth.toLocaleString("en-US")}
      />

      <SummaryCard
        icon={<Certificate />}
        title="Total Transactions"
        value={stats.totalTransactions.current.toLocaleString("en-US")}
        delta={stats.totalTransactions.percentageChange}
        comparisonLabel="Last Month"
        comparisonValue={stats.totalTransactions.lastMonth.toLocaleString("en-US")}
      />
    </section>
  );
};

export default Overview;
