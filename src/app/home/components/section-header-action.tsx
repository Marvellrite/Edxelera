"use client";

import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SectionHeaderActionProps = {
  className?: string;
  children?: React.ReactNode;
};

const SectionHeaderAction: React.FC<SectionHeaderActionProps> = ({
  className,
  children = "See all",
}) => {
  return (
    <Button
      type="button"
      variant="ghost"
      className={cn(
        "group h-auto rounded-full px-0 py-0 text-sm font-medium text-primary/80",
        "transition-colors duration-200 hover:bg-transparent hover:text-primary",
        "focus-visible:bg-transparent focus-visible:ring-primary/20",
        className,
      )}
    >
      <span className="inline-flex items-center gap-1.5">
        <span>{children}</span>
        <ChevronRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
      </span>
    </Button>
  );
};

export default SectionHeaderAction;
