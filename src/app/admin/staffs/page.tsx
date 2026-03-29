"use client";

import Image from "next/image";
import { useState, useSyncExternalStore } from "react";
import { ReactSVG } from "react-svg";
import { Search, ChevronDown, SlidersHorizontal, Edit2, MinusCircle, Trash2 } from "lucide-react";

import { ArrowDownLinear, MoreCircle } from "@/components/admin_and_instructors/icons/modified";
import CustomAlertDialog from "@/components/admin_and_instructors/features/course/custom-modal";
import { Badge } from "@/components/admin_and_instructors/ui/badge";
import { Pagination } from "@/components/common";
import { cn } from "@/lib/utils";
import { staffMembers } from "@/mockdata/staff-management";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const roleStyles: Record<string, string> = {
  "Super admin": "is-active",
  Admin: "is-processing",
  Instructor: "is-scheduled",
  "Support admin": "is-draft",
};

const statusStyles: Record<string, string> = {
  active: "is-success",
  inactive: "is-draft",
  suspended: "is-suspended",
};

function StaffRoleBadge({ role }: { role: string }) {
  return (
    <Badge className={cn("admin-status-badge px-2.5 py-1 text-xs font-semibold", roleStyles[role] ?? "is-draft")}>
      {role}
    </Badge>
  );
}

function StaffStatusBadge({ status }: { status: string }) {
  const normalizedStatus = status.charAt(0).toUpperCase() + status.slice(1);

  return (
    <Badge
      className={cn("admin-status-badge px-2.5 py-1 text-xs font-semibold capitalize", statusStyles[status] ?? "is-draft")}
    >
      {normalizedStatus}
    </Badge>
  );
}

const Page = () => {
  const [isSuspendAdminModalOpen, setIsSuspendAdminModalOpen] = useState(false);
  const [isSuspendInstructorModalOpen, setIsSuspendInstructorModalOpen] = useState(false);
  const [isDeleteAdminModalOpen, setIsDeleteAdminModalOpen] = useState(false);
  const [isDeleteInstructorModalOpen, setIsDeleteInstructorModalOpen] = useState(false);
  const [openActionIndex, setOpenActionIndex] = useState<number | null>(null);
  const isHydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  return (
    <section className="mt-4 min-h-0 min-w-0 flex-1 overflow-y-auto pb-2 no-scrollbar">
      <div className="admin-page-frame flex flex-col gap-4 md:gap-5">
        <header className="admin-panel rounded-2xl px-4 py-4 md:px-6 md:py-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="admin-eyebrow text-xs font-semibold uppercase tracking-[0.14em]">Team</p>
              <h1 className="admin-title mt-1 text-2xl font-semibold">Staff Management</h1>
              <p className="admin-muted admin-page-lead mt-1.5">
                Review internal team members, roles, account states, and administrative access at a glance.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 lg:justify-end">
              <span className="admin-chip admin-chip--compact">{staffMembers.length} team members</span>
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
                    placeholder="Search staff by name, email, or role"
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
            <table className="admin-data-table min-w-[1040px] table-auto text-sm">
              <thead>
                <tr className="text-left text-xs font-semibold uppercase tracking-[0.12em]">
                  <th className="px-4 py-3">#</th>
                  <th className="px-4 py-3">User</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">User ID</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Date Added</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {staffMembers.map((staff, index) => (
                  <tr key={staff.id} className="transition-colors">
                    <td className="admin-muted px-4 py-4 font-semibold">{index + 1}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Image
                            src="https://res.cloudinary.com/dx5iohojj/image/upload/v1773340674/repo-images/public/photo.png"
                            alt={staff.name}
                            width={40}
                            height={40}
                            className="h-10 w-10 rounded-full object-cover"
                          />
                          {staff.isOnline && (
                            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-[var(--green)]" />
                          )}
                        </div>

                        <div className="min-w-0">
                          <p className="admin-row-title truncate">{staff.name}</p>
                          <p className="admin-row-subtext mt-1 truncate">{staff.role}</p>
                        </div>
                      </div>
                    </td>
                    <td className="max-w-[240px] px-4 py-4">
                      <p className="admin-data-emphasis truncate">{staff.email}</p>
                      <p className="admin-row-subtext mt-1">Primary contact</p>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-col gap-1">
                        <span className="admin-data-emphasis">#{staff.userId}</span>
                        <span className="admin-row-subtext">Internal identifier</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <StaffRoleBadge role={staff.role} />
                    </td>
                    <td className="px-4 py-4">
                      <StaffStatusBadge status={staff.status} />
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-col gap-1">
                        <span className="admin-data-emphasis">{staff.dateAdded}</span>
                        <span className="admin-row-subtext">Joined the team</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex justify-end">
                        {isHydrated ? (
                          <Popover
                            open={openActionIndex === index}
                            onOpenChange={(isOpen) => setOpenActionIndex(isOpen ? index : null)}
                          >
                            <PopoverTrigger asChild>
                              <button
                                type="button"
                                aria-label={`Open actions for ${staff.name}`}
                                className="inline-flex size-9 items-center justify-center rounded-full border border-transparent transition-colors hover:border-[rgba(201,211,223,0.82)] hover:bg-[rgba(247,249,252,0.98)]"
                              >
                                <MoreCircle />
                              </button>
                            </PopoverTrigger>

                            <PopoverContent
                              align="end"
                              sideOffset={8}
                              className="w-52 rounded-2xl border-neutral-100 p-2 shadow-[0_18px_40px_rgba(15,23,42,0.08)]"
                            >
                              <div className="flex flex-col gap-1">
                                <button
                                  type="button"
                                  onClick={() => {
                                    staff.role === "Instructor"
                                      ? setIsSuspendInstructorModalOpen(true)
                                      : setIsSuspendAdminModalOpen(true);
                                    setOpenActionIndex(null);
                                  }}
                                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm text-neutral-900 transition-colors hover:bg-neutral-50"
                                >
                                  <MinusCircle className="h-4 w-4" />
                                  <span>Suspend Staff</span>
                                </button>

                                <button
                                  type="button"
                                  onClick={() => setOpenActionIndex(null)}
                                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm text-neutral-900 transition-colors hover:bg-neutral-50"
                                >
                                  <Edit2 className="h-4 w-4" />
                                  <span>Edit Staff</span>
                                </button>

                                <button
                                  type="button"
                                  onClick={() => {
                                    staff.role === "Instructor"
                                      ? setIsDeleteInstructorModalOpen(true)
                                      : setIsDeleteAdminModalOpen(true);
                                    setOpenActionIndex(null);
                                  }}
                                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm text-red-600 transition-colors hover:bg-red-50"
                                >
                                  <Trash2 className="h-4 w-4" />
                                  <span>Delete Staff</span>
                                </button>
                              </div>
                            </PopoverContent>
                          </Popover>
                        ) : (
                          <button
                            type="button"
                            aria-label={`Open actions for ${staff.name}`}
                            className="inline-flex size-9 items-center justify-center rounded-full border border-transparent transition-colors hover:border-[rgba(201,211,223,0.82)] hover:bg-[rgba(247,249,252,0.98)]"
                          >
                            <MoreCircle />
                          </button>
                        )}
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

        <CustomAlertDialog
          isOpen={isSuspendAdminModalOpen}
          onClose={() => setIsSuspendAdminModalOpen(false)}
          title="Suspend Admin"
          description="Are you sure you want to suspend this admin? You can always unsuspend them at any time."
          actionText="Suspend"
        />

        <CustomAlertDialog
          isOpen={isSuspendInstructorModalOpen}
          onClose={() => setIsSuspendInstructorModalOpen(false)}
          title="Suspend Instructor"
          description="Are you sure you want to suspend this instructor? You can always unsuspend them at any time."
          actionText="Suspend"
        />

        <CustomAlertDialog
          isOpen={isDeleteAdminModalOpen}
          onClose={() => setIsDeleteAdminModalOpen(false)}
          title="Delete Admin"
          description="Are you sure you want to delete this admin? This action should only be taken when access needs to be permanently removed."
          actionText="Delete"
        />

        <CustomAlertDialog
          isOpen={isDeleteInstructorModalOpen}
          onClose={() => setIsDeleteInstructorModalOpen(false)}
          title="Delete Instructor"
          description="Are you sure you want to delete this instructor? This action should only be taken when access needs to be permanently removed."
          actionText="Delete"
        />
      </div>
    </section>
  );
};

export default Page;
