"use client";

import { useState } from "react";
import { Search, DollarSign, CheckCircle2, XCircle, Clock } from "lucide-react";

const mockPayments = [
  { id: "pay-1", reference: "PAY_web-dev_001", user: "John Doe", program: "Web Development Bootcamp", amount: 999, currency: "USD", status: "success", date: "2026-03-10" },
  { id: "pay-2", reference: "PAY_design_001", user: "Jane Smith", program: "Product Design Masterclass", amount: 799, currency: "USD", status: "success", date: "2026-03-09" },
  { id: "pay-3", reference: "PAY_data_001", user: "Mike Chen", program: "Data Science Fundamentals", amount: 1299, currency: "USD", status: "pending", date: "2026-03-08" },
  { id: "pay-4", reference: "PAY_web-dev_002", user: "Alex Johnson", program: "Web Development Bootcamp", amount: 999, currency: "USD", status: "failed", date: "2026-03-07" },
];

const StatusBadge = ({ status }: { status: string }) => {
  const config: Record<string, { icon: React.ElementType; bg: string; color: string; border: string; label: string }> = {
    success: { icon: CheckCircle2, bg: "var(--color-success-50)", color: "var(--color-success-500)", border: "var(--color-success-100)", label: "Success" },
    pending: { icon: Clock, bg: "var(--color-warning-50)", color: "var(--color-warning-500)", border: "var(--color-warning-100)", label: "Pending" },
    failed: { icon: XCircle, bg: "var(--color-brand-secondary-50)", color: "var(--color-brand-secondary-500)", border: "var(--color-brand-secondary-200)", label: "Failed" },
  };
  const c = config[status] ?? config.pending;
  const Icon = c.icon;
  return (
    <span
      className="inline-flex items-center gap-1.5 text-xs font-semibold px-2 py-0.5 rounded-full"
      style={{ backgroundColor: c.bg, color: c.color, border: `1px solid ${c.border}` }}
    >
      <Icon size={11} />
      {c.label}
    </span>
  );
};

export default function AdminPaymentsPage() {
  const [search, setSearch] = useState("");

  const successPayments = mockPayments.filter((p) => p.status === "success");
  const totalRevenue = successPayments.reduce((sum, p) => sum + p.amount, 0);

  const filtered = mockPayments.filter(
    (p) =>
      p.user.toLowerCase().includes(search.toLowerCase()) ||
      p.reference.toLowerCase().includes(search.toLowerCase()) ||
      p.program.toLowerCase().includes(search.toLowerCase())
  );

  const summaryCards = [
    {
      label: "Total Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "var(--color-brand-primary-600)",
      bg: "var(--color-brand-primary-50)",
    },
    {
      label: "Successful",
      value: successPayments.length,
      icon: CheckCircle2,
      color: "var(--color-success-500)",
      bg: "var(--color-success-50)",
    },
    {
      label: "Pending",
      value: mockPayments.filter((p) => p.status === "pending").length,
      icon: Clock,
      color: "var(--color-warning-500)",
      bg: "var(--color-warning-50)",
    },
    {
      label: "Failed",
      value: mockPayments.filter((p) => p.status === "failed").length,
      icon: XCircle,
      color: "var(--color-brand-secondary-500)",
      bg: "var(--color-brand-secondary-50)",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Payments</h1>
        <p className="text-sm" style={{ color: "var(--color-muted-foreground)" }}>
          Monitor and manage all payment transactions
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="rounded-xl p-5 card-hover"
              style={{
                backgroundColor: "var(--color-surface-raised)",
                border: "1px solid var(--color-border)",
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: card.bg }}
                >
                  <Icon size={17} style={{ color: card.color }} />
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground mb-0.5">{card.value}</p>
              <p className="text-xs font-medium" style={{ color: "var(--color-muted-foreground)" }}>
                {card.label}
              </p>
            </div>
          );
        })}
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--color-muted-foreground)" }} />
        <input
          type="text"
          placeholder="Search transactions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg pl-9 pr-4 py-2 text-sm outline-none transition-all"
          style={{
            border: "1px solid var(--color-border)",
            backgroundColor: "var(--color-surface-raised)",
            color: "var(--color-foreground)",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "var(--color-brand-primary-600)";
            e.target.style.boxShadow = "0 0 0 3px rgba(0,17,70,0.08)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "var(--color-border)";
            e.target.style.boxShadow = "none";
          }}
        />
      </div>

      {/* Table */}
      <div
        className="rounded-xl overflow-hidden"
        style={{
          backgroundColor: "var(--color-surface-raised)",
          border: "1px solid var(--color-border)",
        }}
      >
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: "1px solid var(--color-border)", backgroundColor: "var(--color-surface)" }}>
              {["Reference", "User", "Program", "Amount", "Status", "Date", ""].map((h) => (
                <th
                  key={h}
                  className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide"
                  style={{ color: "var(--color-muted-foreground)" }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((payment, idx) => (
              <tr
                key={payment.id}
                className="transition-colors hover:bg-surface"
                style={{
                  borderBottom: idx < filtered.length - 1 ? "1px solid var(--color-border)" : "none",
                }}
              >
                <td className="px-5 py-3.5">
                  <code
                    className="text-xs rounded px-1.5 py-0.5 font-mono"
                    style={{
                      backgroundColor: "var(--color-surface)",
                      color: "var(--color-muted-foreground)",
                      border: "1px solid var(--color-border)",
                    }}
                  >
                    {payment.reference}
                  </code>
                </td>
                <td className="px-5 py-3.5 font-medium text-foreground">{payment.user}</td>
                <td className="px-5 py-3.5 text-sm max-w-[160px] truncate" style={{ color: "var(--color-muted-foreground)" }}>
                  {payment.program}
                </td>
                <td className="px-5 py-3.5">
                  <span className="font-semibold text-foreground">
                    {payment.currency} {payment.amount.toLocaleString()}
                  </span>
                </td>
                <td className="px-5 py-3.5">
                  <StatusBadge status={payment.status} />
                </td>
                <td className="px-5 py-3.5 text-sm" style={{ color: "var(--color-muted-foreground)" }}>
                  {new Date(payment.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </td>
                <td className="px-5 py-3.5">
                  <button className="text-xs font-semibold transition-colors" style={{ color: "var(--color-brand-primary-600)" }}>
                    View
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-5 py-10 text-center text-sm" style={{ color: "var(--color-muted-foreground)" }}>
                  No transactions match your search
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
