"use client";

const mockPayments = [
  {
    id: "pay-1",
    reference: "PAY_web-dev_001",
    user: "John Doe",
    program: "Web Development Bootcamp",
    amount: 999,
    currency: "USD",
    status: "success",
    date: "2026-03-10",
  },
  {
    id: "pay-2",
    reference: "PAY_design_001",
    user: "Jane Smith",
    program: "Product Design Masterclass",
    amount: 799,
    currency: "USD",
    status: "success",
    date: "2026-03-09",
  },
  {
    id: "pay-3",
    reference: "PAY_data_001",
    user: "Mike Chen",
    program: "Data Science Fundamentals",
    amount: 1299,
    currency: "USD",
    status: "pending",
    date: "2026-03-08",
  },
  {
    id: "pay-4",
    reference: "PAY_web-dev_002",
    user: "Alex Johnson",
    program: "Web Development Bootcamp",
    amount: 999,
    currency: "USD",
    status: "failed",
    date: "2026-03-07",
  },
];

export default function AdminPaymentsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Payments</h1>
        <p className="text-muted-foreground">
          Monitor and manage all payment transactions
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-lg border border-border bg-background p-6">
          <p className="text-sm text-muted-foreground mb-2">
            Total Revenue
          </p>
          <p className="text-4xl font-bold text-primary">
            ${mockPayments.reduce((sum, p) => sum + (p.status === "success" ? p.amount : 0), 0)}
          </p>
        </div>
        <div className="rounded-lg border border-border bg-background p-6">
          <p className="text-sm text-muted-foreground mb-2">
            Successful Payments
          </p>
          <p className="text-4xl font-bold text-accent">
            {mockPayments.filter((p) => p.status === "success").length}
          </p>
        </div>
        <div className="rounded-lg border border-border bg-background p-6">
          <p className="text-sm text-muted-foreground mb-2">
            Failed Payments
          </p>
          <p className="text-4xl font-bold text-secondary">
            {mockPayments.filter((p) => p.status === "failed").length}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border bg-background overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted-background border-b border-border">
            <tr>
              <th className="text-left px-6 py-3 font-semibold text-foreground">
                Reference
              </th>
              <th className="text-left px-6 py-3 font-semibold text-foreground">
                User
              </th>
              <th className="text-left px-6 py-3 font-semibold text-foreground">
                Program
              </th>
              <th className="text-left px-6 py-3 font-semibold text-foreground">
                Amount
              </th>
              <th className="text-left px-6 py-3 font-semibold text-foreground">
                Status
              </th>
              <th className="text-left px-6 py-3 font-semibold text-foreground">
                Date
              </th>
              <th className="text-left px-6 py-3 font-semibold text-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {mockPayments.map((payment) => (
              <tr
                key={payment.id}
                className="border-b border-border hover:bg-muted-background transition-colors"
              >
                <td className="px-6 py-4 font-mono text-sm text-foreground">
                  {payment.reference}
                </td>
                <td className="px-6 py-4 text-foreground">{payment.user}</td>
                <td className="px-6 py-4 text-foreground">
                  {payment.program}
                </td>
                <td className="px-6 py-4 font-semibold text-foreground">
                  {payment.currency} {payment.amount}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                      payment.status === "success"
                        ? "bg-accent/10 text-accent"
                        : payment.status === "pending"
                          ? "bg-warning/10 text-warning"
                          : "bg-secondary/10 text-secondary"
                    }`}
                  >
                    {payment.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-foreground">
                  {new Date(payment.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <button className="text-primary text-sm font-medium hover:text-primary/80 transition-colors">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
