import * as React from "react";
import { X } from "lucide-react";
import NotificationItem from "./notification-item";
import { Button } from "@/components/ui/button";
import useDragScroll from "@/hooks/useDragScroll";
import { cn } from "@/lib/utils";

const notifications = [
  {
    title: "Cohort Starting Soon",
    message:
      "Your cohort for Product Design (UI/UX) starts in 2 days - the 24th of August, 2025",
    timestamp: "22nd August, 2025 | 4:00PM",
  },
  {
    title: "Class Started",
    message: "Class has started – join now",
    timestamp: "22nd August, 2025 | 4:00PM",
    action: {
      label: "Go to Course",
      href: "/course/product-design-ui-ux",
    },
  },
  {
    title: "Certification",
    message: "Congratulations! You’ve earned your Certificate of Completion",
    timestamp: "22nd August, 2025 | 4:00PM",
    action: {
      label: "Claim Certificate",
      href: "/certificates/product-design-ui-ux",
    },
  },
];

type NotificationsPanelProps = {
  className?: string;
  onClose?: () => void;
};

export default function NotificationsPanel({
  className,
  onClose,
}: NotificationsPanelProps) {
  const { dragScrollProps, isDragging, scrollRef } = useDragScroll<HTMLDivElement>();

  return (
    <aside
      className={cn(
        "flex h-full min-h-0 w-full max-w-[28rem] flex-col overflow-hidden bg-surface px-8 py-10 max-sm:px-5 max-sm:py-6",
        className
      )}
    >
      <div className="mb-6 flex items-start justify-between gap-4">
        <h2 className=" text-[24px] leading-[150%] font-medium text-(--neutral-900)">
          Notifications
        </h2>

        <Button
          variant="ghost"
          size="icon"
          className="size-10 rounded-full hover:bg-(--neutral-100) translate-x-2"
          onClick={onClose}
        >
          <X className="size-6" />
        </Button>
      </div>

      <div
        ref={scrollRef}
        {...dragScrollProps}
        className={cn(
          "flex min-h-0 flex-1 flex-col gap-10 overflow-y-auto pr-1 [scrollbar-width:thin] [scrollbar-color:rgba(44,44,44,0.22)_rgba(44,44,44,0.06)] [&::-webkit-scrollbar]:w-[1px] [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-white [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[rgba(44,44,44,0.22)] [&::-webkit-scrollbar-thumb:hover]:bg-[rgba(44,44,44,0.3)]",
          isDragging ? "cursor-grabbing select-none" : "cursor-grab"
        )}
      >
        {notifications.map((notification, index) => (
          <NotificationItem
            key={`${notification.title}-${index}`}
            title={notification.title}
            message={notification.message}
            timestamp={notification.timestamp}
            action={
              notification.action
                ? { ...notification.action, onClick: onClose }
                : undefined
            }
          />
        ))}
      </div>
    </aside>
  );
}
