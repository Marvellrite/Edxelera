"use client";

const mockUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "student",
    joinedAt: "2026-01-15",
    status: "active",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "student",
    joinedAt: "2026-02-01",
    status: "active",
  },
  {
    id: "3",
    name: "Sarah Chen",
    email: "sarah@example.com",
    role: "instructor",
    joinedAt: "2025-12-01",
    status: "active",
  },
  {
    id: "4",
    name: "Mike Johnson",
    email: "mike@example.com",
    role: "instructor",
    joinedAt: "2025-11-15",
    status: "inactive",
  },
];

export default function AdminUsersPage() {
  const students = mockUsers.filter((u) => u.role === "student");
  const instructors = mockUsers.filter((u) => u.role === "instructor");

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Users</h1>
        <p className="text-muted-foreground">Manage platform users and roles</p>
      </div>

      {/* Students */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Students ({students.length})
        </h2>
        <div className="rounded-lg border border-border bg-background overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted-background border-b border-border">
              <tr>
                <th className="text-left px-6 py-3 font-semibold text-foreground">
                  Name
                </th>
                <th className="text-left px-6 py-3 font-semibold text-foreground">
                  Email
                </th>
                <th className="text-left px-6 py-3 font-semibold text-foreground">
                  Joined
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
              {students.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-border hover:bg-muted-background transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-foreground">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 text-foreground">{user.email}</td>
                  <td className="px-6 py-4 text-foreground">
                    {new Date(user.joinedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                        user.status === "active"
                          ? "bg-accent/10 text-accent"
                          : "bg-muted-foreground/10 text-muted-foreground"
                      }`}
                    >
                      {user.status}
                    </span>
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
      </section>

      {/* Instructors */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Instructors ({instructors.length})
        </h2>
        <div className="rounded-lg border border-border bg-background overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted-background border-b border-border">
              <tr>
                <th className="text-left px-6 py-3 font-semibold text-foreground">
                  Name
                </th>
                <th className="text-left px-6 py-3 font-semibold text-foreground">
                  Email
                </th>
                <th className="text-left px-6 py-3 font-semibold text-foreground">
                  Joined
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
              {instructors.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-border hover:bg-muted-background transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-foreground">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 text-foreground">{user.email}</td>
                  <td className="px-6 py-4 text-foreground">
                    {new Date(user.joinedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                        user.status === "active"
                          ? "bg-accent/10 text-accent"
                          : "bg-muted-foreground/10 text-muted-foreground"
                      }`}
                    >
                      {user.status}
                    </span>
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
      </section>
    </div>
  );
}
