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
    <section
      className={`${getDashboardMainPaneClass(toggle)} mt-3 md:mt-5 space-y-3 rounded-2xl bg-white p-3 shadow overflow-y-auto no-scrollbar`}
    >
      <p className="space-x-2 text-sm md:text-base">
        <Link onClick={() => setIsExitCourseCreationModalOpen(true)} href={routes.list}>
          Course Management
        </Link>
        <span>{"//"}</span>
        <Link href={routes.add}>Add New Course</Link>
      </p>

      <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
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
