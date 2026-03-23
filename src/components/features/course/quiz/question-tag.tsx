"use client";

import { cn } from "@/lib/utils";

type QuestionTagProps = {
  children: number;
  answered?: boolean;
  isCorrect?: boolean | null;
  isResultMode?: boolean;
  onSelect: () => void;
  isCurrent?: boolean;
};

const QuestionTag = ({
  children,
  answered = false,
  isCorrect = null,
  isResultMode = false,
  onSelect,
  isCurrent,
}: QuestionTagProps) => {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "rounded-lg h-10 font-medium",
        answered ? "bg-neutral text-white" : "bg-neutral-50 text-neutral-700",
        isResultMode && isCorrect === true && "bg-green text-white",
        isResultMode && isCorrect === false && "bg-red-500 text-white",
        isCurrent && "border border-secondary text-secondary",
      )}
    >
      Q{children}
    </button>
  );
};

export default QuestionTag;
