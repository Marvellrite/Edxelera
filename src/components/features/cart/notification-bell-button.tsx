"use client";

import * as React from "react";
import { Bell } from "@/components/icons/modified";
import { Badge } from "@/components/common";
import NotificationsPanel from "@/components/features/notification/notifications-panel";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  useAdminNotificationStore,
  useInstructorNotificationStore,
  useNotificationStore,
} from "@/stores";
import { usePathname } from "next/navigation";

type NotificationBellButtonProps = {
  onClick?: () => void;
  className?: string;
};

export default function NotificationBellButton({
  onClick,
  className = "",
}: NotificationBellButtonProps) {
  const [open, setOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");
  const isInstructorRoute = pathname?.startsWith("/instructor");

  const defaultCount = useNotificationStore((state) => state.count);
  const adminCount = useAdminNotificationStore((state) => state.count);
  const instructorCount = useInstructorNotificationStore((state) => state.count);

  const count = isAdminRoute
    ? adminCount
    : isInstructorRoute
      ? instructorCount
      : defaultCount;

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);

    if (nextOpen) {
      onClick?.();
    }
  };

  const buttonClassName = [
    "group relative inline-flex h-11 w-11 items-center justify-center rounded-full",
    "border border-primary-200/75 bg-[linear-gradient(160deg,rgba(255,255,255,0.78),rgba(238,242,255,0.88))] text-primary",
    "shadow-[0_8px_18px_-14px_rgba(var(--primary-bare),0.32)] backdrop-blur-md",
    "transition-[transform,border-color,background,box-shadow,color] duration-300 ease-out",
    "hover:-translate-y-[1px] hover:border-primary-300/85 hover:bg-[linear-gradient(160deg,rgba(255,255,255,0.82),rgba(255,236,236,0.82))] hover:text-secondary-700 hover:shadow-[0_10px_20px_-14px_rgba(var(--primary-bare),0.4)]",
    "active:translate-y-0 active:scale-[0.985]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2",
    "dark:border-[rgba(110,135,186,0.18)] dark:bg-[linear-gradient(160deg,rgba(11,16,32,0.94),rgba(18,28,56,0.92))] dark:text-primary-100",
    "dark:shadow-[inset_0_1px_0_rgba(226,235,255,0.06),0_14px_26px_-18px_rgba(0,0,0,0.62),0_6px_12px_-10px_rgba(11,17,34,0.72)]",
    "dark:hover:border-[rgba(205,92,101,0.28)] dark:hover:bg-[linear-gradient(160deg,rgba(14,21,42,0.96),rgba(34,20,32,0.92))] dark:hover:text-[color:var(--text-strong)] dark:hover:shadow-[inset_0_1px_0_rgba(240,226,229,0.08),0_16px_30px_-18px_rgba(0,0,0,0.7),0_10px_16px_-12px_rgba(26,10,18,0.55)]",
    "dark:focus-visible:ring-primary-300/60 dark:focus-visible:ring-offset-[var(--background)]",
    className,
  ].join(" ");

  const bellButton = (
    <button
      type="button"
      aria-label="Notifications"
      className={buttonClassName}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-[1.5px] rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.45),rgba(255,255,255,0))] dark:bg-[linear-gradient(180deg,rgba(232,239,255,0.07),rgba(232,239,255,0.015)_34%,rgba(232,239,255,0)_72%)]"
      />
      <Bell className="relative z-[1] size-[18px] transition-transform duration-300 ease-out group-hover:scale-[1.05] group-active:scale-100" />
      <Badge count={count} className="right-0.5 top-0.5" />
    </button>
  );

  if (!mounted) {
    return bellButton;
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{bellButton}</DialogTrigger>

      <DialogContent
        showCloseButton={false}
        aria-describedby={undefined}
        className="top-0 right-0 left-auto h-dvh min-h-0 w-full max-w-[28rem] translate-x-0 translate-y-0 overflow-hidden rounded-none border-0 p-0 shadow-2xl duration-300 data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-[28rem] dark:border-l dark:border-white/10 dark:bg-[var(--surface)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.04),-12px_0_32px_rgba(0,0,0,0.42)]"
      >
        <DialogTitle className="sr-only">Notifications</DialogTitle>
        <NotificationsPanel onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
