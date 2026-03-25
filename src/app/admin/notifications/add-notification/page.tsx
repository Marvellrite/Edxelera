"use client";

import Link from "next/link";
import { useState } from "react";

import AddNotifSide1 from "@/components/admin_and_instructors/features/notifications/add-notif-side-1";
import AddNotifySide2 from "@/components/admin_and_instructors/features/notifications/add-notif-side-2";
import CustomAlertDialog from "@/components/admin_and_instructors/features/course/custom-modal";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/context/sidebar.context";

const Page = () => {
  const { toggle } = useSidebar();
  const [isExitCourseCreationModalOpen, setIsExitCourseCreationModalOpen] = useState(false);

  return (
    <section className={`${toggle ? "col-span-9" : "col-span-8"} mt-4 overflow-y-auto pb-3 no-scrollbar`}>
      <div className="admin-page-frame flex flex-col gap-4 md:gap-5">
        <div className="admin-form-hero">
          <p className="flex flex-wrap items-center gap-2 text-sm">
            <Link
              onClick={() => setIsExitCourseCreationModalOpen(true)}
              href="/admin/notifications"
              className="admin-breadcrumb-link"
            >
              Notifications
            </Link>
            <span className="admin-soft">/</span>
            <span className="admin-breadcrumb-current">Add New Notification</span>
          </p>

          <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="admin-eyebrow text-xs font-semibold uppercase tracking-[0.14em]">Communication</p>
              <h1 className="admin-title mt-1 text-2xl font-semibold">New Notification</h1>
              <p className="admin-muted admin-page-lead mt-1.5">
                Compose a notification, target the right audience, and choose how it should be delivered.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 lg:justify-end">
              <span className="admin-chip admin-chip--compact">Draft-friendly workflow</span>
              <span className="admin-chip admin-chip--compact">Cross-channel delivery</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 xl:gap-5">
          <AddNotifSide1 />
          <AddNotifySide2 />
        </div>

        <div className="admin-panel rounded-2xl px-4 py-4 md:px-5">
          <div className="admin-action-row mt-0 border-t-0 pt-0 max-md:justify-stretch">
            <Button variant="ghost" className="max-md:w-full">
              Save as Draft
            </Button>
            <Button variant="outline" className="max-md:w-full">
              Schedule Send
            </Button>
            <Button className="max-md:w-full">Send Now</Button>
          </div>
        </div>
      </div>

      <CustomAlertDialog
        isOpen={isExitCourseCreationModalOpen}
        onClose={() => setIsExitCourseCreationModalOpen(false)}
        title="Exit Notification Creation"
        description="Are you sure you want to leave the notification creation page? Your progress will be lost unless you save it as a draft."
        actionText="Save as Draft"
        cancelText="Leave without Saving"
      />
    </section>
  );
};

export default Page;
