"use client";

import Link from "next/link";

import Course_poster from "@/components/admin_and_instructors/features/course/course-poster";
import Course_arrangement from "@/components/admin_and_instructors/features/course/course-arrangement";
import { Button } from "@/components/admin_and_instructors/ui/button";
import { useSidebar } from "@/context/sidebar";

import { DashboardSegment, getCourseRoutes, getDashboardMainPaneClass } from "./route-utils";

type Props = {
  segment: DashboardSegment;
};

const CourseViewPage = ({ segment }: Props) => {
  const { toggle } = useSidebar();
  const routes = getCourseRoutes(segment);

  return (
    <section id="scroll-container" className={`${getDashboardMainPaneClass(toggle)} mt-3 md:mt-5 overflow-y-auto no-scrollbar`}>
      <div className="mx-auto rounded-[20px] bg-white p-[14px] shadow gap-[20px]">
        <p className="space-x-2 text-sm md:text-base">
          <Link href={routes.list}>Course Management</Link>
          <span>{"//"}</span>
          <Link href={routes.add}>Add New Course</Link>
          <span>{"//"}</span>
          <Link href={routes.preview}>Preview</Link>
        </p>
        <div className="px-2 md:px-[32px]">
          <Course_poster />
          <Course_arrangement />

          <div className="mt-10 flex flex-col gap-3 md:flex-row md:justify-between">
            <Button variant="outline">Save as draft</Button>
            <Button variant="outline">View Preview</Button>
            <Button>Publish Course</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseViewPage;
