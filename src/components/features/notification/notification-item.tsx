import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type NotificationAction = {
  label: string;
  href?: string;
  onClick?: () => void;
};

export type NotificationItemProps = {
  title: string;
  message: string;
  timestamp: string;
  action?: NotificationAction;
  className?: string;
};

export default function NotificationItem({
  title,
  message,
  timestamp,
  action,
  className,
}: NotificationItemProps) {
  return (
    <article
      className={cn(
        "flex flex-col items-start gap-4 border-b border-[var(--neutral-100)] pb-4",
        className
      )}
    >
      <h3 className="font-[var(--font-google-sans)] text-[18px] leading-[150%] font-medium text-[var(--neutral-900)]">
        {title}
      </h3>

      <p className="w-full font-[var(--font-google-sans)] text-[16px] leading-[150%] font-normal text-[var(--text-default)]">
        {message}
      </p>

      {action ? (
        action.href ? (
          <Button
            asChild
            className="h-[45px] rounded-full  px-4 py-3  text-[14px]"
          >
            <Link href={action.href}>{action.label}</Link>
          </Button>
        ) : (
          <Button
            type="button"
            onClick={action.onClick}
            className="h-[45px] rounded-full bg-[var(--primary)] px-4 py-3 text-[14px] font-normal"
          >
            {action.label}
          </Button>
        )
      ) : null}

      <time className="font-[var(--font-google-sans)] text-[14px] leading-[150%] font-normal text-[var(--neutral-700)]">
        {timestamp}
      </time>
    </article>
  );
}