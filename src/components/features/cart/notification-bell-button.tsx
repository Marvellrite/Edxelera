"use client";

import { Bell } from "@/components/icons/modified";
import { Badge } from "@/components/common";

type NotificationBellButtonProps = {
  count?: number;
  onClick?: () => void;
  className?: string;
};

export default function NotificationBellButton({
  count = 0,
  onClick,
  className = "",
}: NotificationBellButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Notifications"
      className={[
        "group relative inline-flex h-11 w-11 items-center justify-center rounded-full",
        "border border-primary-200/75 hover:border-secondary-200 bg-[linear-gradient(160deg,rgba(255,255,255,0.78),rgba(238,242,255,0.88))]",
        "text-primary shadow-[0_10px_22px_-16px_rgba(var(--primary-bare),0.45)] backdrop-blur-md",
        "transition-[transform,border-color,background,box-shadow,color] duration-300 ease-out",
        "hover:-translate-y-[1px] hover:border-primary-300/85 hover:bg-[linear-gradient(160deg,rgba(255,255,255,0.82),rgba(255,236,236,0.82))] hover:text-primary-500 hover:text-secondary-700 hover:shadow-[0_14px_26px_-18px_rgba(var(--primary-bare),0.55)]",
        "active:translate-y-0 active:scale-[0.985]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2",
        className,
      ].join(" ")}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-[1.5px] rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.45),rgba(255,255,255,0))]"
      />
      <Bell className="relative z-[1] size-[18px] transition-transform duration-300 ease-out group-hover:scale-[1.05] group-active:scale-100" />
      <Badge count={count} className="right-0.5 top-0.5" />
    </button>
  );
}
