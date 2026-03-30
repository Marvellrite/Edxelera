import { courses } from "@/mock/performance";

const currencyFormatter = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

const Performance = () => {
  return (
    <section className="rounded-2xl border border-border/70 bg-white p-4 shadow-sm md:p-5">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
        <div>
          <p className="text-lg font-semibold text-neutral-900">Top Performing Courses</p>
          <p className="text-xs text-neutral-500">Revenue and enrollment performance across active courses</p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border/70">
        <table className="w-full min-w-[760px] table-auto text-sm">
          <thead>
            <tr className="bg-neutral-50/80 text-left text-xs font-semibold uppercase tracking-wider text-neutral-500">
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
              <tr key={course.id} className="border-t border-border/70 transition-colors hover:bg-neutral-50/60">
                <td className="px-4 py-3.5 font-medium text-neutral-600">{index + 1}</td>
                <td className="px-4 py-3.5 font-medium text-neutral-700">{course.courseId}</td>
                <td className="px-4 py-3.5 text-neutral-800">{course.courseTitle}</td>
                <td className="px-4 py-3.5">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${
                      course.status === "active" ? "bg-success/15 text-success-foreground" : "bg-danger/15 text-danger-foreground"
                    }`}
                  >
                    {course.status}
                  </span>
                </td>
                <td className="px-4 py-3.5 text-right font-medium text-neutral-700">{course.enrollment.toLocaleString()}</td>
                <td className="px-4 py-3.5 text-right font-medium text-neutral-700">{currencyFormatter.format(course.price)}</td>
                <td className="px-4 py-3.5 text-right font-semibold text-neutral-900">
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
