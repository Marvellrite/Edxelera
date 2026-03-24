import AssessmentResult from "@/components/features/course/quiz/assessment-result";

type ResultPageProps = {
  params: Promise<{
    slug: string;
  }>;
  searchParams?: Promise<{
    status?: string;
    score?: string;
    remainingTrials?: string;
  }>;
};

const normalizeVariant = (status?: string) =>
  status === "failure" ? "failure" : "success";

const parseNumber = (value?: string, fallback = 0) => {
  const parsed = Number(value);

  return Number.isFinite(parsed) ? parsed : fallback;
};

const AssessmentResultPage = async ({
  params,
  searchParams,
}: ResultPageProps) => {
  const { slug } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : undefined;

  const variant = normalizeVariant(resolvedSearchParams?.status);
  const score = parseNumber(
    resolvedSearchParams?.score,
    variant === "success" ? 93 : 29
  );
  const remainingTrials = parseNumber(resolvedSearchParams?.remainingTrials, 2);

  return (
    <AssessmentResult
      variant={variant}
      score={score}
      remainingTrials={remainingTrials}
      primaryAction={{
        label: variant === "success" ? "Next Module" : "Retake Test",
        href:
          variant === "success"
            ? `/course/${slug}/learn`
            : `/course/${slug}/learn/assessment`,
        variant: "default",
        className:
          variant === "success"
            ? "h-[50px] w-full text-medium text-white rounded-[500px]"
            : "h-[50px] w-full",
      }}
      secondaryAction={
        variant === "failure"
          ? {
              label: "Revisit Module",
              href: `/course/${slug}/learn`,
              variant: "secondary",
              className: "h-[50px] w-full",
            }
          : undefined
      }
      reviewAction={{
        label: "Review Answers",
        href: `/course/${slug}/learn/assessment`,
        variant: "outline",
        className: "h-[50px] w-full text-medium text-primary rounded-[500px]",
      }}
    />
  );
};

export default AssessmentResultPage;
