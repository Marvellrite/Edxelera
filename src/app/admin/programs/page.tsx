"use client";

import Link from "next/link";

const mockPrograms = [
  {
    slug: "web-dev-101",
    title: "Web Development Bootcamp",
    instructor: "Sarah Chen",
    enrollments: 45,
    status: "active",
    price: 999,
  },
  {
    slug: "product-design",
    title: "Product Design Masterclass",
    instructor: "Mike Johnson",
    enrollments: 32,
    status: "active",
    price: 799,
  },
  {
    slug: "data-science-101",
    title: "Data Science Fundamentals",
    instructor: "Dr. Lisa Wang",
    enrollments: 0,
    status: "draft",
    price: 1299,
  },
];

export default function AdminProgramsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Programs
          </h1>
          <p className="text-muted-foreground">
            Manage all cohort-based programs
          </p>
        </div>
        <button className="rounded-lg bg-primary text-white px-6 py-2 font-medium hover:bg-primary/90 transition-colors">
          Create Program
        </button>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border bg-background overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted-background border-b border-border">
            <tr>
              <th className="text-left px-6 py-3 font-semibold text-foreground">
                Program
              </th>
              <th className="text-left px-6 py-3 font-semibold text-foreground">
                Instructor
              </th>
              <th className="text-left px-6 py-3 font-semibold text-foreground">
                Enrollments
              </th>
              <th className="text-left px-6 py-3 font-semibold text-foreground">
                Price
              </th>
              <th className="text-left px-6 py-3 font-semibold text-foreground">
                Status
              </th>
              <th className="text-left px-6 py-3 font-semibold text-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {mockPrograms.map((program, idx) => (
              <tr key={idx} className="border-b border-border hover:bg-muted-background transition-colors">
                <td className="px-6 py-4">
                  <p className="font-medium text-foreground">
                    {program.title}
                  </p>
                </td>
                <td className="px-6 py-4 text-foreground">
                  {program.instructor}
                </td>
                <td className="px-6 py-4 text-foreground">
                  {program.enrollments}
                </td>
                <td className="px-6 py-4 text-foreground">
                  ${program.price}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                      program.status === "active"
                        ? "bg-accent/10 text-accent"
                        : "bg-warning/10 text-warning"
                    }`}
                  >
                    {program.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/programs/${program.slug}`}
                      className="text-primary text-sm font-medium hover:text-primary/80 transition-colors"
                    >
                      Edit
                    </Link>
                    <button className="text-secondary text-sm font-medium hover:text-secondary/80 transition-colors">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
