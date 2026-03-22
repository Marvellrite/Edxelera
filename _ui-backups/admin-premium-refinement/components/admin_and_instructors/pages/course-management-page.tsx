"use client";

import Link from "next/link";
import { useState } from "react";
import { ReactSVG } from "react-svg";
import { Search, ChevronDown, SlidersHorizontal, MinusCircle, Edit2, Trash2 } from "lucide-react";

import { useSidebar } from "@/context/sidebar.context";
import { courses } from "@/mockdata/course-management";
import { Button } from "@/components/admin_and_instructors/ui/button";
import { Badge } from "@/components/admin_and_instructors/ui/badge";
import { ArrowDownLinear } from "@/components/admin_and_instructors/icons/modified";
import CustomAlertDialog from "@/components/admin_and_instructors/features/course/custom-modal";
import { cn } from "@/lib/utils";

import { DashboardSegment, getCourseRoutes, getDashboardMainPaneClass } from "./route-utils";

type Props = {
  segment: DashboardSegment;
};

const statusStyles: Record<string, string> = {
  Live: "is-live",
  Draft: "is-draft",
  Suspended: "is-suspended",
};

const formatCellValue = (value: string | number) => (value === "--" ? "Not available" : value);

const CourseManagementPage = ({ segment }: Props) => {
  const { toggle } = useSidebar();
  const routes = getCourseRoutes(segment);
  const [isSuspendModalOpen, setIsSuspendModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <section className={`${getDashboardMainPaneClass(toggle)} mt-2 md:mt-4 overflow-y-auto no-scrollbar pb-2`}>
      <div className="admin-page-frame flex flex-col gap-4 md:gap-5">
        <header className="admin-panel rounded-2xl p-4 md:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="admin-eyebrow text-xs font-semibold uppercase tracking-[0.14em]">Courses</p>
              <h1 className="admin-title mt-1 text-2xl font-semibold">Course Management</h1>
              <p className="admin-muted mt-1 max-w-2xl text-sm leading-6">Track course lifecycle, enrollment performance, and publishing status.</p>
            </div>

            <Button asChild className="h-10 w-full rounded-full px-4 text-white shadow-[0_10px_20px_rgba(0,17,70,0.18)] sm:w-auto">
              <Link href={routes.add}>
                <ReactSVG src="https://res.cloudinary.com/dx5iohojj/image/upload/v1773340444/repo-images/public/icons/add.svg" />
                <span>Add New Course</span>
              </Link>
            </Button>
          </div>
        </header>

        <div className="admin-panel rounded-2xl p-4 md:p-5">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-end xl:justify-between">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <Button className="h-10 rounded-full border border-[rgba(0,17,70,0.12)] bg-neutral-900 px-4 text-white hover:bg-neutral-800">
                <ArrowDownLinear className="h-3.5 w-3.5" />
                <span>Export CSV</span>
              </Button>

              {/* <div className="sm:pl-1">
                <p className="admin-soft text-[11px] font-semibold uppercase tracking-[0.14em]">Sync status</p>
                <p className="admin-muted mt-1 text-xs">Last export synced moments ago</p>
              </div>
            </div> */}

            <div className="flex w-full flex-col gap-2 xl:max-w-2xl">
              <div className="flex items-center justify-between gap-3">
                {/* <p className="admin-soft text-[11px] font-semibold uppercase tracking-[0.14em]">Controls</p> */}
                <p className="admin-muted text-xs">Search, sort, and filter the course catalog.</p>
              </div>

              <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center">
                <div className="admin-panel-subtle flex h-11 min-w-0 flex-1 items-center gap-2 rounded-full px-3">
                  <Search className="admin-muted h-4 w-4" />
                  <input
                    type="search"
                    placeholder="Search courses"
                    className="h-full w-full bg-transparent text-sm text-[var(--admin-text-default)] outline-none placeholder:text-[var(--admin-text-soft)]"
                  />
                </div>

                <button className="admin-panel-subtle admin-text flex h-11 items-center justify-center gap-1 rounded-full px-4 text-sm font-medium transition-colors hover:bg-[rgba(238,244,255,0.9)]">
                  <span>Sort by</span>
                  <ChevronDown className="h-3.5 w-3.5" />
                </button>

                <button className="admin-panel-subtle admin-text flex h-11 items-center justify-center gap-1 rounded-full px-4 text-sm font-medium transition-colors hover:bg-[rgba(238,244,255,0.9)]">
                  <span>Filter</span>
                  <SlidersHorizontal className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>

          <div className="admin-table-shell mt-4">
            <table className="admin-data-table min-w-[940px] table-auto text-sm">
              <thead>
                <tr className="text-left text-xs font-semibold uppercase tracking-[0.12em]">
                  <th className="px-4 py-3">#</th>
                  <th className="px-4 py-3">Course ID</th>
                  <th className="px-4 py-3">Course title</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Enrolment</th>
                  <th className="px-4 py-3 text-right">Price</th>
                  <th className="px-4 py-3">Date added</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course, index) => (
                  <tr key={`course-${index}`} className="transition-colors">
                    <td className="admin-muted px-4 py-4 font-semibold">{index + 1}</td>
                    <td className="admin-text px-4 py-4 font-medium">{course.id}</td>
                    <td className="max-w-[320px] px-4 py-4">
                      <p className="admin-title truncate font-semibold">{course.title}</p>
                      <p className="admin-soft mt-1 text-xs">{course.status === "Draft" ? "Pending publishing details" : "Visible in the learning catalog"}</p>
                    </td>
                    <td className="px-4 py-4">
                      <Badge className={cn("admin-status-badge px-2.5 py-1 text-xs font-semibold", statusStyles[course.status])}>
                        {course.status}
                      </Badge>
                    </td>
                    <td className="admin-text px-4 py-4 text-right font-medium">{formatCellValue(course.enrollment)}</td>
                    <td className="admin-text px-4 py-4 text-right font-medium">{formatCellValue(course.price)}</td>
                    <td className="admin-muted px-4 py-4">{formatCellValue(course.dateAdded)}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          className="admin-muted rounded-xl p-2 transition-colors hover:bg-[rgba(238,244,255,0.9)] hover:text-[var(--admin-text-strong)]"
                          onClick={() => setIsSuspendModalOpen(true)}
                          aria-label="Suspend course"
                        >
                          <MinusCircle className="h-4 w-4" />
                        </button>

                        <button
                          className="admin-muted rounded-xl p-2 transition-colors hover:bg-[rgba(238,244,255,0.9)] hover:text-[var(--admin-text-strong)]"
                          aria-label="Edit course"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          className="admin-muted rounded-xl p-2 transition-colors hover:bg-[rgba(237,28,36,0.08)] hover:text-[var(--secondary-700)]"
                          onClick={() => setIsDeleteModalOpen(true)}
                          aria-label="Delete course"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <CustomAlertDialog
        isOpen={isSuspendModalOpen}
        onClose={() => setIsSuspendModalOpen(false)}
        title="Suspend Course"
        description="Make this course invisible to users. This action can always be undone"
        actionText="Suspend"
      />

      <CustomAlertDialog
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Course"
        description="Are you sure you want to delete this course? This action cannot be undone, you might want to suspend the course instead"
        actionText="Yes, Delete"
      />
    </section>
  );
};

export default CourseManagementPage;
