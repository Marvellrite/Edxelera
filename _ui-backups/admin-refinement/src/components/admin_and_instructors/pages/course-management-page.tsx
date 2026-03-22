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

import { DashboardSegment, getCourseRoutes, getDashboardMainPaneClass } from "./route-utils";

type Props = {
  segment: DashboardSegment;
};

const statusStyles: Record<string, string> = {
  Live: "bg-success/15 text-success-foreground border border-success/30",
  Draft: "bg-neutral-100 text-neutral-700 border border-neutral-300",
  Suspended: "bg-danger/15 text-danger-foreground border border-danger/35",
};

const formatCellValue = (value: string | number) => (value === "--" ? "Not available" : value);

const CourseManagementPage = ({ segment }: Props) => {
  const { toggle } = useSidebar();
  const routes = getCourseRoutes(segment);
  const [isSuspendModalOpen, setIsSuspendModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <section className={`${getDashboardMainPaneClass(toggle)} mt-2 md:mt-4 space-y-4 md:space-y-5 overflow-y-auto no-scrollbar pb-2`}>
      <header className="rounded-2xl border border-border/70 bg-white p-4 shadow-sm md:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">Courses</p>
            <h1 className="mt-1 text-2xl font-semibold text-neutral-900">Course Management</h1>
            <p className="mt-1 text-sm text-neutral-500">Track course lifecycle, enrollment performance, and publishing status.</p>
          </div>

          <Button asChild className="h-10 w-full rounded-full px-4 text-white sm:w-auto">
            <Link href={routes.add}>
              <ReactSVG src="https://res.cloudinary.com/dx5iohojj/image/upload/v1773340444/repo-images/public/icons/add.svg" />
              <span>Add New Course</span>
            </Link>
          </Button>
        </div>
      </header>

      <div className="rounded-2xl border border-border/70 bg-white p-4 shadow-sm md:p-5">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <Button className="h-10 rounded-full border border-border bg-neutral-900 px-4 text-white hover:bg-neutral-800">
              <ArrowDownLinear className="h-3.5 w-3.5" />
              <span>Export CSV</span>
            </Button>
            <p className="text-xs text-neutral-500">Last export synced moments ago</p>
          </div>

          <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center xl:max-w-2xl">
            <div className="flex h-10 flex-1 min-w-0 items-center gap-2 rounded-full border border-border px-3">
              <Search className="h-4 w-4 text-neutral-500" />
              <input
                type="search"
                placeholder="Search courses"
                className="h-full w-full bg-transparent text-sm text-neutral-700 outline-none placeholder:text-neutral-400"
              />
            </div>

            <button className="flex h-10 items-center justify-center gap-1 rounded-full border border-border bg-white px-4 text-sm text-neutral-700 transition-colors hover:bg-neutral-50">
              <span>Sort by</span>
              <ChevronDown className="h-3.5 w-3.5" />
            </button>

            <button className="flex h-10 items-center justify-center gap-1 rounded-full border border-border bg-white px-4 text-sm text-neutral-700 transition-colors hover:bg-neutral-50">
              <span>Filter</span>
              <SlidersHorizontal className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div className="mt-4 overflow-x-auto rounded-xl border border-border/70">
          <table className="w-full min-w-[940px] table-auto text-sm">
            <thead>
              <tr className="bg-neutral-50/80 text-left text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500">
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
                <tr key={`course-${index}`} className="border-t border-border/70 text-neutral-700 transition-colors hover:bg-neutral-50/70">
                  <td className="px-4 py-3.5 text-neutral-500">{index + 1}</td>
                  <td className="px-4 py-3.5 font-medium text-neutral-700">{course.id}</td>
                  <td className="max-w-[260px] px-4 py-3.5">
                    <p className="truncate font-medium text-neutral-900">{course.title}</p>
                  </td>
                  <td className="px-4 py-3.5">
                    <Badge className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[course.status]}`}>
                      {course.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3.5 text-right font-medium">{formatCellValue(course.enrollment)}</td>
                  <td className="px-4 py-3.5 text-right font-medium">{formatCellValue(course.price)}</td>
                  <td className="px-4 py-3.5 text-neutral-600">{formatCellValue(course.dateAdded)}</td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        className="rounded-lg p-2 text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
                        onClick={() => setIsSuspendModalOpen(true)}
                        aria-label="Suspend course"
                      >
                        <MinusCircle className="h-4 w-4" />
                      </button>

                      <button className="rounded-lg p-2 text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900" aria-label="Edit course">
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        className="rounded-lg p-2 text-neutral-600 transition-colors hover:bg-danger/10 hover:text-danger-foreground"
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
