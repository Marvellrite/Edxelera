"use client";

import Image from "next/image";
import { useState } from "react";
import { ReactSVG } from "react-svg";
import { Search, ChevronDown, SlidersHorizontal } from "lucide-react";

import { ArrowDownLinear, X } from "@/components/admin_and_instructors/icons/modified";
import { Badge } from "@/components/admin_and_instructors/ui/badge";
import { Dialog } from "@/components/admin_and_instructors/ui/custom/dialog";
import { Pagination } from "@/components/common";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { users } from "@/mockdata/user-management";

const roleStyles: Record<string, string> = {
  Student: "is-draft",
  Admin: "is-processing",
  Instructor: "is-scheduled",
};

const statusStyles: Record<string, string> = {
  active: "is-success",
  suspended: "is-suspended",
  inactive: "is-draft",
};

function UserRoleBadge({ role }: { role: string }) {
  return (
    <Badge className={cn("admin-status-badge px-2.5 py-1 text-xs font-semibold", roleStyles[role] ?? "is-draft")}>
      {role}
    </Badge>
  );
}

function UserStatusBadge({ status }: { status: string }) {
  const normalizedStatus = status.charAt(0).toUpperCase() + status.slice(1);

  return (
    <Badge className={cn("admin-status-badge px-2.5 py-1 text-xs font-semibold", statusStyles[status] ?? "is-draft")}>
      {normalizedStatus}
    </Badge>
  );
}

function UserCourseAccessCell({
  courses,
}: {
  courses: Array<{ courseName: string }>;
}) {
  const [primaryCourse, ...otherCourses] = courses;

  if (!primaryCourse) {
    return (
      <div className="flex flex-col gap-1">
        <span className="admin-row-subtext font-medium">Nil</span>
        <span className="admin-row-subtext">No course access assigned</span>
      </div>
    );
  }

  return (
    <div className="flex min-w-0 flex-col gap-1">
      <div className="flex min-w-0 items-center gap-2">
        <Badge className="w-fit rounded-full border border-[rgba(201,211,223,0.82)] bg-[rgba(247,249,252,0.98)] px-2.5 py-1 text-[11px] font-semibold text-[var(--admin-text-default)]">
          <span className="truncate">{primaryCourse.courseName}</span>
          <span className="inline-flex rounded-full bg-white/80 p-0.5">
            <X className="h-3 w-3" />
          </span>
        </Badge>

        {otherCourses.length > 0 && (
          <span className="admin-muted truncate text-xs font-medium">{`+${otherCourses.length} other${otherCourses.length > 1 ? "s" : ""}`}</span>
        )}
      </div>

      {otherCourses.length > 0 && (
        <p className="admin-row-subtext truncate">
          {otherCourses.map((course) => course.courseName).join(", ")}
        </p>
      )}
    </div>
  );
}

const Page = () => {
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);

  return (
    <section className="mt-4 min-h-0 min-w-0 flex-1 overflow-y-auto pb-2 no-scrollbar">
      <div className="admin-page-frame flex flex-col gap-4 md:gap-5">
        <header className="admin-panel rounded-2xl px-4 py-4 md:px-6 md:py-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="admin-eyebrow text-xs font-semibold uppercase tracking-[0.14em]">Community</p>
              <h1 className="admin-title mt-1 text-2xl font-semibold">User Management</h1>
              <p className="admin-muted admin-page-lead mt-1.5">
                Review learner access, role assignments, and account status across the platform.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 lg:justify-end">
              <span className="admin-chip admin-chip--compact">{users.length} users</span>
            </div>
          </div>
        </header>

        <div className="admin-panel rounded-2xl p-4 md:p-5">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <button className="admin-chip admin-chip--dark h-10 px-4 text-white" type="button">
                <ArrowDownLinear className="h-3.5 w-3.5" />
                <span>Export CSV</span>
              </button>
            </div>

            <div className="flex w-full flex-col gap-2 xl:max-w-3xl">
              <div className="flex w-full flex-col gap-2 lg:flex-row lg:items-center">
                <div className="admin-input-shell min-w-0 flex-1">
                  <Search className="admin-muted h-4 w-4 shrink-0" />
                  <input
                    type="search"
                    placeholder="Search users by name, email, or course"
                    className="h-full w-full bg-transparent text-sm text-[var(--admin-text-default)] outline-none placeholder:text-[var(--admin-text-soft)]"
                  />
                </div>

                <button className="admin-chip admin-chip--ghost lg:min-w-[116px]" type="button">
                  <span>Sort by</span>
                  <ChevronDown className="h-3.5 w-3.5" />
                </button>

                <button className="admin-chip admin-chip--ghost lg:min-w-[116px]" type="button">
                  <span>Filter</span>
                  <SlidersHorizontal className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>

          <div className="admin-table-shell admin-table-shell--spacious mt-5">
            <table className="admin-data-table min-w-[1080px] table-auto text-sm">
              <thead>
                <tr className="text-left text-xs font-semibold uppercase tracking-[0.12em]">
                  <th className="px-4 py-3">#</th>
                  <th className="px-4 py-3">User</th>
                  <th className="px-4 py-3">User ID</th>
                  <th className="px-4 py-3">Course Access</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Date Joined</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user.id} className="transition-colors">
                    <td className="admin-muted px-4 py-4 font-semibold">{index + 1}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Image
                            src={user.avatar}
                            alt={user.name}
                            width={40}
                            height={40}
                            className="h-10 w-10 rounded-full object-cover"
                          />
                          {user.isOnline && (
                            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-[var(--green)]" />
                          )}
                        </div>

                        <div className="min-w-0">
                          <p className="admin-row-title truncate">{user.name}</p>
                          <p className="admin-row-subtext mt-1 truncate">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-col gap-1">
                        <span className="font-medium text-[var(--admin-text-default)]">#{user.userId}</span>
                        <span className="admin-row-subtext">Internal identifier</span>
                      </div>
                    </td>
                    <td className="max-w-[260px] px-4 py-4">
                      <UserCourseAccessCell courses={user.courseAccess} />
                    </td>
                    <td className="px-4 py-4">
                      <UserRoleBadge role={user.role} />
                    </td>
                    <td className="px-4 py-4">
                      <UserStatusBadge status={user.status} />
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-col gap-1">
                        <span className="font-medium text-[var(--admin-text-default)]">{user.dateJoined}</span>
                        <span className="admin-row-subtext">Account created</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          className="admin-icon-button"
                          aria-label={`Suspend ${user.name}`}
                          title="Suspend User"
                        >
                          <ReactSVG src="https://res.cloudinary.com/dx5iohojj/image/upload/v1773340539/repo-images/public/icons/minus.svg" />
                        </button>
                        <button
                          className="admin-icon-button"
                          aria-label={`Edit ${user.name}`}
                          title="Edit User"
                          onClick={() => setIsEditUserOpen(true)}
                        >
                          <ReactSVG src="https://res.cloudinary.com/dx5iohojj/image/upload/v1773340474/repo-images/public/icons/edit.svg" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="admin-action-row mt-4 justify-center border-t-0 pt-0">
            <Pagination />
          </div>
        </div>

        <Dialog
          isOpen={isEditUserOpen}
          title="Edit User"
          onClose={() => setIsEditUserOpen(false)}
          footer={
            <div className="w-full">
              <Button className="w-full">Save</Button>
            </div>
          }
        >
          <div className="text-sm text-neutral-600">User editing form coming soon.</div>
        </Dialog>
      </div>
    </section>
  );
};

export default Page;
