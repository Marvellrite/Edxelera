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

const CourseManagementPage = ({ segment }: Props) => {
  const { toggle } = useSidebar();
  const routes = getCourseRoutes(segment);
  const [isSuspendModalOpen, setIsSuspendModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <section
      className={`${getDashboardMainPaneClass(toggle)} mt-3 md:mt-5 space-y-4 md:space-y-6 rounded-[20px] bg-white p-4 md:p-6 shadow-sm overflow-y-auto no-scrollbar`}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-lg font-normal text-black">Course Management</h1>

        <Button asChild className="flex items-center gap-2 text-white font-normal transition-colors w-full sm:w-auto">
          <Link href={routes.add}>
            <ReactSVG src="/icons/add.svg" />
            <span>Add New Course</span>
          </Link>
        </Button>
      </div>

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <Button className="bg-primary text-white rounded-full px-6 w-full sm:w-auto">
          <ArrowDownLinear className="w-3.5 h-3.5" />
          <span>Export CSV</span>
        </Button>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 flex-1 lg:max-w-2xl">
          <div className="border border-neutral-400 flex items-center gap-3 rounded-full py-2.5 px-4 h-11 flex-1 min-w-0">
            <Search className="w-5 h-5 text-neutral-600" />
            <input
              type="search"
              placeholder="Search"
              className="h-full w-full outline-none text-base text-neutral-600 placeholder:text-neutral-600"
            />
          </div>

          <button className="flex items-center justify-center gap-1 border border-neutral-400 rounded-full py-2.5 px-4 h-11 text-sm whitespace-nowrap hover:bg-neutral-50 transition-colors">
            <span className="text-neutral-900">Sort by</span>
            <ChevronDown className="w-3 h-3 text-neutral-900" />
          </button>

          <button className="flex items-center justify-center gap-1 border border-neutral-400 rounded-full py-2.5 px-4 h-11 text-sm whitespace-nowrap hover:bg-neutral-50 transition-colors">
            <span className="text-neutral-900">Filter</span>
            <SlidersHorizontal className="w-3 h-3 text-neutral-900" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse">
          <thead>
            <tr className="border-b border-neutral-50">
              <th className="text-left py-4 px-2 text-base font-bold text-black">#</th>
              <th className="text-left py-4 px-2 text-base font-bold text-black">Course ID</th>
              <th className="text-left py-4 px-2 text-base font-bold text-black">Course title</th>
              <th className="text-left py-4 px-2 text-base font-bold text-black">Status</th>
              <th className="text-left py-4 px-2 text-base font-bold text-black">Enrolment</th>
              <th className="text-left py-4 px-2 text-base font-bold text-black">Price</th>
              <th className="text-left py-4 px-2 text-base font-bold text-black">Date added</th>
              <th className="text-left py-4 px-2 text-base font-bold text-black">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr key={`course-${index}`} className="border-b border-neutral-50">
                <td className="py-4 px-2 text-base text-neutral-900">{index + 1}</td>
                <td className="py-4 px-2 text-base text-neutral-900">{course.id}</td>
                <td className="py-4 px-2 text-base text-neutral-900">{course.title}</td>
                <td className="py-4 px-2">
                  {course.status === "Live" && (
                    <Badge className="bg-success text-success-foreground rounded-md px-3 py-1 text-base font-normal hover:bg-success">
                      Live
                    </Badge>
                  )}
                  {course.status === "Suspended" && (
                    <Badge className="bg-danger text-danger-foreground rounded-md px-3 py-1 text-base font-normal hover:bg-danger">
                      Suspended
                    </Badge>
                  )}
                  {course.status === "Draft" && (
                    <Badge className="bg-neutral-200 text-draft-foreground rounded-md px-3 py-1 text-base font-normal hover:bg-neutral-200">
                      Draft
                    </Badge>
                  )}
                </td>
                <td className="py-4 px-2 text-base text-neutral-900">{course.enrollment || "--"}</td>
                <td className="py-4 px-2 text-base text-neutral-900">{course.price || "--"}</td>
                <td className="py-4 px-2 text-base text-neutral-900">{course.dateAdded || "--"}</td>
                <td className="py-4 px-2">
                  <div className="flex items-center gap-5">
                    <button
                      className="text-neutral-800 hover:text-neutral-900 transition-colors"
                      onClick={() => setIsSuspendModalOpen(true)}
                    >
                      <MinusCircle className="w-4.5 h-4.5" />
                    </button>

                    <button className="text-neutral-800 hover:text-neutral-900 transition-colors">
                      <Edit2 className="w-4 h-4.5" />
                    </button>
                    <button
                      className="text-neutral-800 hover:text-neutral-900 transition-colors"
                      onClick={() => setIsDeleteModalOpen(true)}
                    >
                      <Trash2 className="w-4 h-4.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
