"use client";

import Link from "next/link";
import { ReactSVG } from "react-svg";

import { Button } from "@/components/ui/button";

type AssessmentResultVariant = "success" | "failure";

type ActionConfig = {
  label: string;
  href?: string;
  variant?: "default" | "outline" | "secondary";
  className?: string;
};

export type AssessmentResultProps = {
  variant: AssessmentResultVariant;
  score: number;
  remainingTrials?: number;
  primaryAction?: ActionConfig;
  secondaryAction?: ActionConfig;
  reviewAction?: ActionConfig;
};

const RESULT_CONFIG: Record<
  AssessmentResultVariant,
  {
    title: string;
    imageSrc: string;
    description: (score: number, remainingTrials?: number) => string;
    actionsClassName: string;
  }
> = {
  success: {
    title: "Congratulations",
    imageSrc:
      "https://res.cloudinary.com/dx5iohojj/image/upload/v1773340470/repo-images/public/icons/confetti-desktop.svg",
    description: (score) =>
      `You scored ${score}% on the assessment. You can choose to go over this module or move on to the next`,
    actionsClassName: " space-y-4 mt-10 text-[18px]",
  },
  failure: {
    title: "Oops...",
    imageSrc:
      "https://res.cloudinary.com/dx5iohojj/image/upload/v1773340574/repo-images/public/icons/sad-emoji.svg",
    description: (score, remainingTrials = 2) =>
      `You scored ${score}% on the assessment and did not qualify to go to the next module. Kindly take the test again. Note that you have only ${remainingTrials} more trials today`,
    actionsClassName: " space-y-4 mt-10",
  },
};

const DEFAULT_ACTIONS: Record<
  AssessmentResultVariant,
  {
    primaryAction: ActionConfig;
    secondaryAction?: ActionConfig;
    reviewAction: ActionConfig;
  }
> = {
  success: {
    primaryAction: {
      label: "Next Module",
      variant: "default",
      className: "h-[50px] w-full text-medium text-white rounded-[500px]",
    },
    reviewAction: {
      label: "Review Answers",
      variant: "outline",
      className: "h-[50px] w-full text-medium text-primary rounded-[500px]",
    },
  },
  failure: {
    primaryAction: {
      label: "Retake Test",
      variant: "default",
      className: "h-[50px] w-full",
    },
    secondaryAction: {
      label: "Revisit Module",
      variant: "secondary",
      className: "h-[50px] w-full",
    },
    reviewAction: {
      label: "Review Answers",
      variant: "outline",
      className: "h-[50px] w-full text-medium text-primary rounded-[500px]",
    },
  },
};

const ResultActionButton = ({
  label,
  href,
  variant = "default",
  className,
}: ActionConfig) => {
  if (href) {
    return (
      <Button asChild variant={variant} className={className}>
        <Link href={href}>{label}</Link>
      </Button>
    );
  }

  return (
    <Button variant={variant} className={className}>
      {label}
    </Button>
  );
};

const AssessmentResult = ({
  variant,
  score,
  remainingTrials,
  primaryAction,
  secondaryAction,
  reviewAction,
}: AssessmentResultProps) => {
  const config = RESULT_CONFIG[variant];
  const defaultActions = DEFAULT_ACTIONS[variant];

  const resolvedPrimaryAction = primaryAction ?? defaultActions.primaryAction;
  const resolvedSecondaryAction =
    secondaryAction ?? defaultActions.secondaryAction;
  const resolvedReviewAction = reviewAction ?? defaultActions.reviewAction;

  return (
    <div className="fixed inset-0 z-[999] h-full w-full overflow-y-auto bg-white max-[990px]:pt-30">
      <div className=" flex items-center justify-center w-full h-full  max-[990px]:flex-col gap-x-10">
        <div className=" max-[990px]:basis-auto basis-1/2 max-[990px]:h-fit h-full flex justify-center items-center max-[990px]:flex-col min-[990px]:bg-error-light">
          <h1 className="text-center text-[40px] text-medium mb-5.5 text-black min-[990px]:hidden min-[990px]:w-70% mx-auto">
            {config.title}
          </h1>
          <div className=" min-[990px]:w-[90%] mx-auto min-[990px]:max-w-[450px] max-[990px]:size-[280px]">
            <ReactSVG
              beforeInjection={(svg) => {
                svg.setAttribute("style", "width:100%;height:100%");
                svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
              }}
              src={config.imageSrc}
            />
          </div>
        </div>
        <div className=" basis-1/2 flex w-full justify-center max-[990px]:grow">
          <div className=" p-5 max-w-[480px] min-[990px]:w-[90%] max-[990px]:h-full max-[990px]:flex max-[990px]:flex-col max-[990px]:grow max-[990px]:justify-between">
            <h1 className="text-center text-[40px] text-medium  text-black max-[990px]:hidden mb-7">
              {config.title}
            </h1>
            <p className="text-md font-normal text-center">
              {config.description(score, remainingTrials)}
            </p>
            <div className={config.actionsClassName}>
              <ResultActionButton {...resolvedPrimaryAction} />
              {resolvedSecondaryAction ? (
                <ResultActionButton {...resolvedSecondaryAction} />
              ) : null}
              <ResultActionButton {...resolvedReviewAction} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentResult;
