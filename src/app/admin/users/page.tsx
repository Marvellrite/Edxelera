"use client";

import { useState } from "react";
import { Search, Filter } from "lucide-react";

const mockUsers = [
  { id: "1", name: "John Doe", email: "john@example.com", role: "student", joinedAt: "2026-01-15", status: "active", enrollments: 2 },
  { id: "2", name: "Jane Smith", email: "jane@example.com", role: "student", joinedAt: "2026-02-01", status: "active", enrollments: 1 },
  { id: "3", name: "Alex Brown", email: "alex@example.com", role: "student", joinedAt: "2026-02-10", status: "inactive", enrollments: 0 },
  { id: "4", name: "Sarah Chen", email: "sarah@example.com", role: "instructor", joinedAt: "2025-12-01", status: "active", enrollments: 2 },
  { id: "5", name: "Mike Johnson", email: "mike@example.com", role: "instructor", joinedAt: "2025-11-15", status: "inactive", enrollments: 1 },
];

const StatusBadge = ({ status }: { status: string }) => (
  <span
    className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full"
    style={
      status === "active"
        ? { backgroundColor: "var(--color-success-50)", color: "var(--color-success-500)", border: "1px solid var(--color-success-100)" }
        : { backgroundColor: "var(--color-border)", color: "var(--color-muted-foreground)" }
    }
  >
    <span className={`w-1.5 h-1.5 rounded-full ${status === "active" ? "bg-success-500" : ""}`}
      style={{ backgroundColor: status === "active" ? "var(--color-success-500)" : "var(--color-muted-foreground)" }}
    />
    {status}
  </span>
);

const RoleBadge = ({ role }: { role: string }) => (
  <span
    className="inline-block text-xs font-semibold px-2 py-0.5 rounded-full capitalize"
    style={
      role === "instructor"
        ? { backgroundColor: "var(--color-brand-primary-50)", color: "var(--color-brand-primary-600)", border: "1px solid var(--color-brand-primary-100)" }
        : { backgroundColor: "var(--color-surface)", color: "var(--color-muted-foreground)", border: "1px solid var(--color-border)" }
    }
  >
    {role}
  </span>
);

export default function AdminUsersPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<"all" | "student" | "instructor">("all");

  const filtered = mockUsers.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === "all" || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-1">Users</h1>
          <p className="text-sm" style={{ color: "var(--color-muted-foreground)" }}>
            Manage platform users and roles
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{
              backgroundColor: "var(--color-brand-primary-50)",
              color: "var(--color-brand-primary-600)",
              border: "1px solid var(--color-brand-primary-100)",
            }}
          >
            {mockUsers.length} total
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div
          className="relative flex-1 max-w-sm"
        >
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--color-muted-foreground)" }} />
          <input
            type="text"
            placeholder="Search by name or email..."
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
        <div className="flex items-center gap-1.5">
          {(["all", "student", "instructor"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setRoleFilter(f)}
              className="rounded-lg px-3 py-1.5 text-xs font-semibold capitalize transition-all duration-200"
              style={
                roleFilter === f
                  ? {
                      backgroundColor: "var(--color-brand-primary-600)",
                      color: "#fff",
                    }
                  : {
                      border: "1px solid var(--color-border)",
                      color: "var(--color-muted-foreground)",
                      backgroundColor: "var(--color-surface-raised)",
                    }
              }
            >
              {f}
            </button>
          ))}
        </div>
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
              {["User", "Role", "Enrollments", "Joined", "Status", ""].map((h) => (
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
            {filtered.map((user, idx) => (
              <tr
                key={user.id}
                className="transition-colors hover:bg-surface"
                style={{
                  borderBottom: idx < filtered.length - 1 ? "1px solid var(--color-border)" : "none",
                }}
              >
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                      style={{ backgroundColor: "var(--color-brand-primary-600)" }}
                    >
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{user.name}</p>
                      <p className="text-xs" style={{ color: "var(--color-muted-foreground)" }}>{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3.5">
                  <RoleBadge role={user.role} />
                </td>
                <td className="px-5 py-3.5">
                  <span className="text-sm font-medium text-foreground">{user.enrollments}</span>
                </td>
                <td className="px-5 py-3.5 text-sm" style={{ color: "var(--color-muted-foreground)" }}>
                  {new Date(user.joinedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </td>
                <td className="px-5 py-3.5">
                  <StatusBadge status={user.status} />
                </td>
                <td className="px-5 py-3.5">
                  <button
                    className="text-xs font-semibold transition-colors"
                    style={{ color: "var(--color-brand-primary-600)" }}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-10 text-center text-sm" style={{ color: "var(--color-muted-foreground)" }}>
                  No users match your search
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
