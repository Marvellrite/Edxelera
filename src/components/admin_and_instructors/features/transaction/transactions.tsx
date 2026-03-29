import { Badge } from "@/components/admin_and_instructors/ui/badge";
import formatMoney from "@/lib/utils/formatMoney";
import { cn } from "@/lib/utils";
import { Transaction } from "@/mockdata/transactions";

type TransactionsProps = {
  items: Transaction[];
};

const transactionStatusStyles: Record<string, string> = {
  Successful: "is-success",
  Pending: "is-pending",
  Failed: "is-failed",
  Refunded: "is-refunded",
  Processing: "is-processing",
};

function TransactionStatusBadge({ status }: { status: string }) {
  return (
    <Badge
      className={cn(
        "admin-status-badge px-2.5 py-1 text-xs font-semibold",
        transactionStatusStyles[status] ?? "is-processing"
      )}
    >
      {status}
    </Badge>
  );
}

function formatTransactionDate(dateTime: string) {
  const [date, time] = dateTime.split(" ");
  return { date, time };
}

const Transactions = ({ items }: TransactionsProps) => {
  return (
    <div className="admin-table-shell admin-table-shell--spacious mt-5">
      {items.length > 0 ? (
        <table className="admin-data-table min-w-[980px] table-auto text-sm">
          <thead>
            <tr className="text-left text-xs font-semibold uppercase tracking-[0.12em]">
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Course Title</th>
              <th className="px-4 py-3">Cohort</th>
              <th className="px-4 py-3 text-right">Amount</th>
              <th className="px-4 py-3">Date / Time</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {items.map((transaction, index) => {
              const { date, time } = formatTransactionDate(transaction.dateTime);

              return (
                <tr key={transaction.id} className="transition-colors">
                  <td className="admin-muted px-4 py-4 font-semibold">{index + 1}</td>
                  <td className="max-w-[220px] px-4 py-4">
                    <p className="admin-row-title truncate">{transaction.email}</p>
                    <p className="admin-row-subtext mt-1">Learner payment record</p>
                  </td>
                  <td className="max-w-[260px] px-4 py-4">
                    <p className="admin-row-title truncate">{transaction.courseTitle}</p>
                    <p className="admin-row-subtext mt-1">Course purchase</p>
                  </td>
                  <td className="px-4 py-4">
                    <span className="admin-inline-badge inline-flex rounded-full px-2.5 py-1 text-xs">
                      {transaction.cohort}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex flex-col items-end gap-1">
                      <span className="admin-title text-base font-semibold">
                        NGN {formatMoney(transaction.amount)}
                      </span>
                      <span className="admin-row-subtext">Enrollment payment</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-col gap-1">
                      <span className="admin-data-emphasis">{date}</span>
                      <span className="admin-row-subtext">{time}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <TransactionStatusBadge status={transaction.status} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className="admin-empty-state mx-2 my-2 flex min-h-64 flex-col items-center justify-center px-6 py-10 text-center">
          <p className="admin-empty-state__title">No transactions found</p>
          <p className="admin-empty-state__description mt-2 max-w-md">
            No transaction records match your current search or status filter. Try adjusting the toolbar above.
          </p>
        </div>
      )}
    </div>
  );
};

export default Transactions;
