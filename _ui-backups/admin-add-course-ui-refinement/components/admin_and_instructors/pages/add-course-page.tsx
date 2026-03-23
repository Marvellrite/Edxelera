"use client";

import { useState } from "react";
import Link from "next/link";

import AddLesson from "@/components/admin_and_instructors/add-lesson";
import AddModules from "@/components/admin_and_instructors/addmodules";
import { useSidebar } from "@/context/sidebar.context";
import CustomAlertDialog from "@/components/admin_and_instructors/features/course/custom-modal";

import { DashboardSegment, getCourseRoutes, getDashboardMainPaneClass } from "./route-utils";

type Props = {
  segment: DashboardSegment;
};

const AddCoursePage = ({ segment }: Props) => {
  const { toggle } = useSidebar();
  const routes = getCourseRoutes(segment);
  const [isExitCourseCreationModalOpen, setIsExitCourseCreationModalOpen] = useState(false);

  return (
    <section className={`${getDashboardMainPaneClass(toggle)} mt-2 md:mt-4 space-y-4 md:space-y-5 overflow-y-auto no-scrollbar pb-2`}>
      <header className="rounded-2xl border border-border/70 bg-white p-4 shadow-sm md:p-5">
        <p className="flex flex-wrap items-center gap-2 text-sm">
          <Link onClick={() => setIsExitCourseCreationModalOpen(true)} href={routes.list} className="text-neutral-500 hover:text-neutral-700">
            Course Management
          </Link>
          <span className="text-neutral-400">/</span>
          <span className="font-medium text-neutral-900">Add New Course</span>
        </p>

        <h1 className="mt-2 text-2xl font-semibold text-neutral-900">Create a new course</h1>
        <p className="mt-1 text-sm text-neutral-500">Set up core details first, then continue to module and lesson creation.</p>
      </header>

      <div className="grid grid-cols-1 gap-4 2xl:grid-cols-2">
        <AddModules />
        <AddLesson previewHref={routes.preview} />
      </div>

      <CustomAlertDialog
        isOpen={isExitCourseCreationModalOpen}
        onClose={() => setIsExitCourseCreationModalOpen(false)}
        title="Exit Course Creation"
        description="Are you sure you want to exit the course creation page? Your progress will be lost, you can save as draft"
        actionText="Save as Draft"
        cancelText="Leave without Saving"
      />
    </section>
  );
};

export default AddCoursePage;
