"use client";

import { useMemo, useState } from "react";
import { Search, ChevronDown, SlidersHorizontal } from "lucide-react";

import Overview from "@/components/admin_and_instructors/features/transaction/overview";
import Transactions from "@/components/admin_and_instructors/features/transaction/transactions";
import { Pagination } from "@/components/common";
import { dashboardStats, transactions } from "@/mockdata/transactions";

const statusOptions = ["All Statuses", "Successful", "Pending", "Failed"];

const Page = () => {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");

  const filteredTransactions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return transactions.filter((transaction) => {
      const matchesQuery =
        !normalizedQuery ||
        [transaction.email, transaction.courseTitle, transaction.cohort].some((value) =>
          value.toLowerCase().includes(normalizedQuery)
        );

      const matchesStatus =
        statusFilter === "All Statuses" || transaction.status === statusFilter;

      return matchesQuery && matchesStatus;
    });
  }, [query, statusFilter]);

  return (
    <section className="mt-4 min-h-0 min-w-0 flex-1 overflow-y-auto pb-2 no-scrollbar">
      <div className="admin-page-frame flex flex-col gap-4 md:gap-5">
        <header className="admin-panel rounded-2xl px-4 py-4 md:px-6 md:py-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="admin-eyebrow text-xs font-semibold uppercase tracking-[0.14em]">Finance</p>
              <h1 className="admin-title mt-1 text-2xl font-semibold">Transactions</h1>
              <p className="admin-muted admin-page-lead mt-1.5">
                Track payments, enrollment revenue, and transaction activity.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 lg:justify-end">
              <span className="admin-chip admin-chip--compact">
                {filteredTransactions.length} visible records
              </span>
              <span className="admin-chip admin-chip--compact">Revenue monitoring</span>
            </div>
          </div>
        </header>

        <Overview stats={dashboardStats} />

        <div className="admin-panel rounded-2xl p-4 md:p-5">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
            <div className="max-w-xl">
              <p className="admin-section-label text-[11px] uppercase tracking-[0.14em]">Transaction Activity</p>
              <p className="admin-muted mt-1 text-sm">
                Review payment records by learner, course, cohort, and transaction status.
              </p>
            </div>

            <div className="flex w-full flex-col gap-2 xl:max-w-3xl">
              <div className="flex w-full flex-col gap-2 lg:flex-row lg:items-center">
                <div className="admin-input-shell min-w-0 flex-1">
                  <Search className="admin-muted h-4 w-4 shrink-0" />
                  <input
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search by email, course title, or cohort"
                    className="h-full w-full bg-transparent text-sm text-[var(--admin-text-default)] outline-none placeholder:text-[var(--admin-text-soft)]"
                  />
                </div>

                <label className="admin-chip admin-chip--ghost justify-between gap-3 lg:min-w-[170px]">
                  <span className="flex items-center gap-2">
                    <SlidersHorizontal className="h-3.5 w-3.5" />
                    <span>Status</span>
                  </span>
                  <div className="flex items-center gap-2">
                    <select
                      value={statusFilter}
                      onChange={(event) => setStatusFilter(event.target.value)}
                      className="bg-transparent text-sm font-semibold text-[var(--admin-text-default)] outline-none"
                    >
                      {statusOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="h-3.5 w-3.5" />
                  </div>
                </label>
              </div>
            </div>
          </div>

          <Transactions items={filteredTransactions} />

          <div className="admin-action-row mt-4 justify-center border-t-0 pt-0">
            <Pagination />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
