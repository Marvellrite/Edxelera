"use client";

import Image from "next/image";
import Link from "next/link";
import { ReactSVG } from "react-svg";
import { ChevronDown } from "lucide-react";

import { useSidebar } from "@/context/sidebar.context";
import { Button } from "@/components/admin_and_instructors/ui/button";
import { DashboardSegment, getCourseRoutes, getDashboardMainPaneClass } from "./route-utils";

type Props = {
  segment: DashboardSegment;
};

const modules = [
  "WEEK 1 - Introduction & Foundations",
  "WEEK 1 - Introduction & Foundations",
  "WEEK 1 - Introduction & Foundations",
  "WEEK 1 - Introduction & Foundations",
  "WEEK 1 - Introduction & Foundations",
  "WEEK 1 - Introduction & Foundations",
  "WEEK 1 - Introduction & Foundations",
];

const AddCoursePreviewPage = ({ segment }: Props) => {
  const { toggle } = useSidebar();
  const routes = getCourseRoutes(segment);

  return (
    <section
      id="scroll-container"
      className={`${getDashboardMainPaneClass(toggle)} mt-3 md:mt-5 space-y-5 rounded-[20px] bg-white p-[14px] overflow-y-auto no-scrollbar`}
    >
      <div className="flex flex-wrap items-center gap-2 md:gap-3 text-sm md:text-lg">
        <Link href={routes.list} className="text-black hover:underline">
          Course Management
        </Link>
        <span className="text-neutral-700">{'//'}</span>
        <Link href={routes.add} className="text-black hover:underline">
          Add New Course
        </Link>
        <span className="text-neutral-700">{'//'}</span>
        <span className="text-black">Preview</span>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-6 rounded-[20px] border border-neutral-50 bg-white p-[14px]">
          <h2 className="text-lg font-normal text-black">Course Details</h2>

          <div className="space-y-3">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="space-y-0.5 rounded-lg bg-white p-3">
                <p className="text-sm text-neutral-700">Course title</p>
                <p className="text-base text-neutral-900">Product Design</p>
              </div>
              <div className="space-y-0.5 rounded-lg bg-white p-3">
                <p className="text-sm text-neutral-700">Duration</p>
                <p className="text-base text-neutral-900">8 Weeks</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="space-y-0.5 rounded-lg bg-white p-3">
                <p className="text-sm text-neutral-700">Price</p>
                <p className="text-base text-neutral-900">N150,000.00</p>
              </div>
              <div className="space-y-0.5 rounded-lg bg-white p-3">
                <p className="text-sm text-neutral-700">Instructor</p>
                <p className="text-base text-neutral-900">Utange Kevin</p>
              </div>
            </div>

            <div className="space-y-0.5 rounded-lg bg-white p-3">
              <p className="text-sm text-neutral-700">Course overview</p>
              <p className="text-base text-neutral-900 leading-6">
                This course is a hands-on introduction to the full spectrum of product design, combining UX strategy
                with UI execution. You will learn how to research user needs, define problems, design intuitive user
                flows, and bring ideas to life with stunning interfaces using Figma. By the end of the course, you
                will have the skills to create user-centered digital products and a portfolio to showcase your work.
              </p>
            </div>

            <div className="relative overflow-hidden rounded-lg border border-neutral-500">
              <Image
                src="https://res.cloudinary.com/dx5iohojj/image/upload/v1773340417/repo-images/public/assets/course-cover.jpg"
                alt="Course cover"
                width={518}
                height={144}
                className="h-36 w-full object-cover"
              />
              <span className="absolute top-2 left-2 rounded px-2 py-0.5 text-sm text-white">Cover image</span>
            </div>
          </div>

          <div className="text-right">
            <Button variant="outline">Edit</Button>
          </div>
        </div>

        <div className="space-y-4 rounded-[20px] border border-neutral-50 bg-white p-4 md:p-6">
          <h2 className="text-lg font-normal text-black">Course Module</h2>

          <div className="space-y-4">
            {modules.map((module, index) => (
              <div key={index} className="flex items-center justify-between border-b border-neutral-200 py-4 last:border-0">
                <div className="flex items-center gap-2">
                  <ReactSVG src="https://res.cloudinary.com/dx5iohojj/image/upload/v1773340549/repo-images/public/icons/note-2.svg" className="w-4 h-4" />
                  <span className="text-base text-black">{module}</span>
                </div>
                <button className="text-neutral-800 hover:text-black transition-colors">
                  <ChevronDown className="w-4 h-2.5" strokeWidth={2} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 pb-4 md:flex-row md:items-center md:justify-between md:pb-8">
        <Button variant="outline">Save as draft</Button>
        <Button asChild variant="outline">
          <Link href={routes.view}>Simulate Preview</Link>
        </Button>
        <Button asChild>
          <Link href={routes.view}>Publish Course</Link>
        </Button>
      </div>
    </section>
  );
};

export default AddCoursePreviewPage;
