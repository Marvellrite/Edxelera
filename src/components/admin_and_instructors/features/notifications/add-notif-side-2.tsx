"use client";

import { useMemo, useState } from "react";

import { FolderAdd } from "@/components/admin_and_instructors/icons/modified";
import InputAnimated from "@/components/admin_and_instructors/ui/custom/input-animated-1";
import { cn } from "@/lib/utils";

type DeliveryChannel = "Email Notification" | "Push Notification" | "In-app Notification";

const deliveryChannels: DeliveryChannel[] = [
  "Email Notification",
  "Push Notification",
  "In-app Notification",
];

const AddNotifySide2 = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedChannels, setSelectedChannels] = useState<DeliveryChannel[]>([]);

  const acceptedTypesLabel = useMemo(
    () => "PNG, JPEG, WEBP, SVG, PDF, DOC, DOCX, PPTX",
    []
  );

  const toggleChannel = (channel: DeliveryChannel) => {
    setSelectedChannels((state) =>
      state.includes(channel) ? state.filter((item) => item !== channel) : [...state, channel]
    );
  };

  return (
    <section className="admin-form-panel">
      <div className="admin-form-panel__header">
        <p className="admin-form-panel__title">Message Content</p>
        <p className="admin-form-panel__description">
          Write the notification body, attach a supporting file if needed, and choose delivery channels.
        </p>
      </div>

      <form className="grid gap-4">
        <div className="space-y-2">
          <label htmlFor="notification-body" className="admin-form-label">
            Body
          </label>
          <InputAnimated placeholder="Notification body" id="notification-body" input_id="notification-body" />
          <p className="admin-form-helper">
            Keep the message concise and action-oriented so it reads well across all selected channels.
          </p>
        </div>

        <div className="space-y-2">
          <div>
            <p className="admin-form-label">Attachment</p>
            <p className="admin-form-helper mt-1">
              Optional. Add a supporting resource recipients can download or review.
            </p>
          </div>

          <fieldset className="admin-upload-zone relative rounded-2xl px-4 py-5">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="admin-upload-zone__icon mb-3">
                <FolderAdd />
              </div>

              {selectedFile ? (
                <>
                  <p className="admin-title text-sm font-semibold">{selectedFile.name}</p>
                  <p className="admin-muted mt-1 text-xs">
                    {(selectedFile.size / 1024).toFixed(1)} KB selected
                  </p>
                </>
              ) : (
                <>
                  <p className="admin-title text-sm font-semibold">Upload file (optional)</p>
                  <p className="admin-muted mt-1 text-sm">
                    Click or drag and drop a file into this area.
                  </p>
                </>
              )}

              <p className="admin-form-helper mt-3">{acceptedTypesLabel}</p>
            </div>

            <label className="absolute inset-0 cursor-pointer" htmlFor="notification-upload" />
            <input
              id="notification-upload"
              type="file"
              onChange={(event) => setSelectedFile(event.target.files?.[0] ?? null)}
              className="pointer-events-none fixed h-0 w-0 opacity-0"
            />
          </fieldset>
        </div>

        <div className="space-y-3">
          <div>
            <p className="admin-form-label">Delivery Channels</p>
            <p className="admin-form-helper mt-1">
              Select one or more channels to control how this notification reaches recipients.
            </p>
          </div>

          <div className="grid gap-2">
            {deliveryChannels.map((channel) => {
              const isSelected = selectedChannels.includes(channel);

              return (
                <button
                  key={channel}
                  type="button"
                  onClick={() => toggleChannel(channel)}
                  className={cn(
                    "rounded-2xl border px-4 py-3 text-left transition-all duration-200",
                    isSelected
                      ? "border-[rgba(47,79,255,0.22)] bg-[rgba(238,244,255,0.9)] shadow-[inset_0_1px_0_rgba(255,255,255,0.75)]"
                      : "border-[rgba(201,211,223,0.78)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(247,250,255,0.94))] hover:border-[rgba(183,198,216,0.92)]"
                  )}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-medium text-[var(--admin-text-default)]">{channel}</p>
                      <p className="admin-row-subtext mt-1">
                        {channel === "Email Notification"
                          ? "Best for long-form updates and supporting links."
                          : channel === "Push Notification"
                            ? "Great for time-sensitive nudges and reminders."
                            : "Visible inside the platform for in-app engagement."}
                      </p>
                    </div>

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

export default AddNotifySide2;
