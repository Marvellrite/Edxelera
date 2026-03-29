"use client";

import { useState } from "react";

import InputAnimated from "@/components/admin_and_instructors/ui/custom/input-animated-1";
import Select from "@/components/admin_and_instructors/ui/custom/select";
import { cn } from "@/lib/utils";

type ProgressStatus = "Not Started" | "In Progress" | "Completed" | "Failed Exam";

const progressOptions: ProgressStatus[] = [
  "Not Started",
  "In Progress",
  "Completed",
  "Failed Exam",
];

const AddNotifSide1 = () => {
  const [selectedAudience, setSelectedAudience] = useState("all");
  const [selectedAudienceFilter, setSelectedAudienceFilter] = useState("course_enrolled");
  const [selectedProgress, setSelectedProgress] = useState<ProgressStatus[]>([]);

  const toggleProgress = (option: ProgressStatus) => {
    setSelectedProgress((state) =>
      state.includes(option) ? state.filter((item) => item !== option) : [...state, option]
    );
  };

  return (
    <section className="admin-form-panel">
      <div className="admin-form-panel__header">
        <p className="admin-form-panel__title">Notification Details</p>
        <p className="admin-form-panel__description">
          Define the core message and choose which audience should receive it.
        </p>
      </div>

      <form className="grid gap-4">
        <div className="space-y-2">
          <label htmlFor="notification-title" className="admin-form-label">
            Title
          </label>
          <InputAnimated placeholder="Notification title" id="notification-title" input_id="notification-title" />
          <p className="admin-form-helper">
            Use a short, descriptive title that helps recipients recognize the purpose immediately.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="admin-form-label">Recipient Group</label>
            <Select
              label="Recipient Group"
              value={selectedAudience}
              options={[
                { value: "all", key: "All Users" },
                { value: "learners", key: "Learners" },
                { value: "admins", key: "Admins" },
                { value: "cohort", key: "By Cohort" },
                { value: "course", key: "By Course" },
                { value: "enrollment", key: "By Enrollment Status" },
                { value: "individual", key: "Individual Users" },
              ]}
              onChange={(selectedOption) => {
                setSelectedAudience(selectedOption.value);
              }}
            />
            <p className="admin-form-helper">Choose the primary audience that should receive this notification.</p>
          </div>

          <div className="space-y-2">
            <label className="admin-form-label">Audience Filter</label>
            <Select
              label="Audience Filter"
              value={selectedAudienceFilter}
              options={[
                { value: "course_enrolled", key: "Course Enrolled" },
                { value: "cohort", key: "Cohort" },
                { value: "progress", key: "Progress" },
                { value: "payment_status", key: "Payment Status" },
                { value: "location", key: "Location" },
              ]}
              onChange={(selectedOption) => {
                setSelectedAudienceFilter(selectedOption.value);
              }}
            />
            <p className="admin-form-helper">Apply a secondary rule to narrow the recipients more precisely.</p>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <p className="admin-form-label">Progress Criteria</p>
            <p className="admin-form-helper mt-1">
              Optionally target learners by where they currently are in their journey.
            </p>
          </div>

          <div className="grid gap-2 sm:grid-cols-2">
            {progressOptions.map((option) => {
              const isSelected = selectedProgress.includes(option);

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => toggleProgress(option)}
                  className={cn(
                    "rounded-2xl border px-4 py-3 text-left transition-all duration-200",
                    isSelected
                      ? "border-[rgba(47,79,255,0.22)] bg-[rgba(238,244,255,0.9)] shadow-[inset_0_1px_0_rgba(255,255,255,0.75)]"
                      : "border-[rgba(201,211,223,0.78)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(247,250,255,0.94))] hover:border-[rgba(183,198,216,0.92)]"
                  )}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="admin-data-emphasis">{option}</span>
                    <span
                      className={cn(
                        "inline-flex h-5 w-5 items-center justify-center rounded-full border text-[10px] font-semibold",
                        isSelected
                          ? "border-[rgba(47,79,255,0.18)] bg-[var(--primary-700)] text-white"
                          : "border-[rgba(201,211,223,0.82)] bg-white text-[var(--admin-text-soft)]"
                      )}
                    >
                      {isSelected ? "On" : "Off"}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </form>
    </section>
  );
};

export default AddNotifSide1;
