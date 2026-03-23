"use client";

import { Check, Minus } from "lucide-react";

import {
  getPasswordChecks,
  getPasswordStrength,
  type PasswordChecks,
} from "@/lib/auth/password";
import { cn } from "@/lib/utils";

type PasswordStrengthIndicatorProps = {
  password: string;
  className?: string;
};

const requirementItems: Array<{
  key: keyof PasswordChecks;
  label: string;
}> = [
  { key: "length", label: "At least 8 characters" },
  { key: "uppercase", label: "One uppercase letter" },
  { key: "lowercase", label: "One lowercase letter" },
  { key: "number", label: "One number" },
  { key: "symbol", label: "One special character" },
];

const strengthTone = {
  empty: {
    textClassName: "text-text-muted",
    fillClassName: "bg-neutral-300",
  },
  Weak: {
    textClassName: "text-error",
    fillClassName: "bg-error",
  },
  Fair: {
    textClassName: "text-amber-600",
    fillClassName: "bg-amber-500",
  },
  Good: {
    textClassName: "text-primary-700",
    fillClassName: "bg-primary-500",
  },
  Strong: {
    textClassName: "text-green",
    fillClassName: "bg-green",
  },
} as const;

export function PasswordStrengthIndicator({
  password,
  className,
}: PasswordStrengthIndicatorProps) {
  const checks = getPasswordChecks(password);
  const strength = getPasswordStrength(password);
  const hasTyped = password.length > 0;
  const tone = strength.label ? strengthTone[strength.label] : strengthTone.empty;

  return (
    <div className={cn("space-y-2.5", className)}>
      <div
        className="h-1 w-full overflow-hidden rounded-full bg-neutral-200"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={strength.percent}
        aria-valuetext={strength.label ? `${strength.label} strength` : "No password entered"}
      >
        <div
          className={cn("h-full rounded-full transition-[width] duration-200 ease-out", tone.fillClassName)}
          style={{ width: `${strength.percent}%` }}
        />
      </div>

      <p className={cn("text-xs leading-5", tone.textClassName)} aria-live="polite">
        Password strength: {strength.label ?? "Start typing"}
      </p>

      <ul className="space-y-1.5" aria-label="Password requirements">
        {requirementItems.map((item) => {
          const isMet = checks[item.key];

          return (
            <li
              key={item.key}
              className={cn(
                "flex items-center gap-2 text-xs leading-5",
                isMet ? "text-green" : "text-text-muted",
              )}
            >
              <span className="inline-flex size-4 shrink-0 items-center justify-center" aria-hidden="true">
                {isMet ? <Check className="size-3.5" /> : <Minus className="size-3.5" />}
              </span>
              <span>{item.label}</span>
              <span className="sr-only">
                {hasTyped ? (isMet ? "Requirement met" : "Requirement not met") : "Requirement pending"}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
