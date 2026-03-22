import { courses } from "@/mockdata/performance";

const currencyFormatter = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

const Performance = () => {
  return (
    <section className="admin-panel rounded-2xl p-4 md:p-5">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
        <div>
          <p className="admin-title text-lg font-semibold">Top Performing Courses</p>
          <p className="admin-muted text-xs">Revenue and enrollment performance across active courses</p>
        </div>
      </div>

      <div className="admin-table-shell">
        <table className="admin-data-table min-w-[760px] table-auto text-sm">
          <thead>
            <tr className="text-left uppercase tracking-wider">
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Course ID</th>
              <th className="px-4 py-3">Course title</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Enrollment</th>
              <th className="px-4 py-3 text-right">Price</th>
              <th className="px-4 py-3 text-right">Total Revenue</th>
            </tr>
          </thead>

          <tbody>
            {courses.map((course, index) => (
              <tr key={course.id} className="transition-colors">
                <td className="admin-muted px-4 py-4 font-semibold">{index + 1}</td>
                <td className="admin-text px-4 py-4 font-medium">{course.courseId}</td>
                <td className="px-4 py-4">
                  <div>
                    <p className="admin-title font-semibold">{course.courseTitle}</p>
                    <p className="admin-soft mt-1 text-xs">Active course performance snapshot</p>
                  </div>
                </td>
                <td className="px-4 py-3.5">
                  <span className={`admin-status-badge capitalize ${course.status === "active" ? "is-active" : "is-suspended"}`}>
                    {course.status}
                  </span>
                </td>
                <td className="admin-text px-4 py-4 text-right font-medium">{course.enrollment.toLocaleString()}</td>
                <td className="admin-text px-4 py-4 text-right font-medium">{currencyFormatter.format(course.price)}</td>
                <td className="admin-title px-4 py-4 text-right font-semibold">
                  {currencyFormatter.format(course.totalRevenue)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Performance;
