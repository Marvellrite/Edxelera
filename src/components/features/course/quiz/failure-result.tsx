import AssessmentResult from "@/components/features/course/quiz/assessment-result";

const FailureResult = () => {
  return <AssessmentResult variant="failure" score={29} remainingTrials={2} />;
};

export default FailureResult;
