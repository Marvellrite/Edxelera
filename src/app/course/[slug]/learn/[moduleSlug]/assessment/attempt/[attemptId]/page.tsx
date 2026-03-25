"use client"
import {useState} from 'react'
import { Button } from '@/components/ui/button'
import { QuizData } from '@/mockdata/quiz'
import { QuizType } from '@/types/quiz'
import { QuizAnswers } from '@/types/quiz'
import SubmitQuizDialog from '@/components/features/course/quiz/submit-quiz-dialog'
import SuccessResult from '@/components/features/course/quiz/success-result'
import FailureResult from '@/components/features/course/quiz/failure-result'
import QuestionTag from '@/components/features/course/quiz/question-tag'

import { cn } from '@/lib/utils'

const EXPECTED_ANSWERS: QuizAnswers = { 0: "a", 1: "d" };


const ModuleAssessment = () => {
  const quizData: QuizType[] = QuizData;

  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<QuizAnswers>({});
  const [success, setSuccess] = useState(false);
  const [failureResult, setFailureResult] = useState(false);
  const [showReview, setShowReview] = useState(true);
  const [isResultMode, setIsResultMode] = useState(false);

  const getExpectedAnswer = (index: number) =>
    EXPECTED_ANSWERS[index]?.toLowerCase();

  const getUserAnswer = (index: number) =>
    userAnswers[index]?.toLowerCase();

  const isAnswered = (index: number) => Boolean(getUserAnswer(index));

  const getIsCorrect = (index: number): boolean | null => {
    const submitted = getUserAnswer(index);
    const expected = getExpectedAnswer(index);

    if (!submitted) return null;
    return submitted === expected;
  };

  const currentQuiz = quizData[currentQuizIndex];
  const currentCorrectAnswer = getExpectedAnswer(currentQuizIndex);
  const currentUserAnswer = getUserAnswer(currentQuizIndex);

  const allQuestAnswered = quizData.every((_, index) => isAnswered(index));

  const handleSubmit = async () => {
    setIsResultMode(true);

    const hasWrongAnswer = quizData.some((_, index) => getIsCorrect(index) !== true);

    setSuccess(!hasWrongAnswer);
    setFailureResult(hasWrongAnswer);
  };

  const handleSelectOption = (optionIndex: number) => {
    if (isResultMode) return;

    const label = String.fromCharCode(65 + optionIndex).toLowerCase();

    setUserAnswers((prev) => {
      if (prev[currentQuizIndex]?.toLowerCase() === label) {
        const nextAnswers = { ...prev };
        delete nextAnswers[currentQuizIndex];
        return nextAnswers;
      }

      return {
        ...prev,
        [currentQuizIndex]: label,
      };
    });
  };

  return (
    <>
      <section className="px-8 py-10 max-md:px-0 max-md:py-0 max-md:mt-8 relative">
        <div className="py-10 max-md:pt-0 pt-5 mx-auto flex gap-5 min-h-full h-full md:flex-row flex-col">
          <div className="rounded-lg max-sm:border-0 border border-neutral-100 p-4 basis-[60%] max-md:basis-[initial] max-md:min-h-{65%] min-h-full">
            <div className="text-md text-neutral font-normal mb-3">
              Select the correct answer
            </div>

            <div>
              <div className="text-900 text-secondary font-medium mb-3">
                Question {currentQuizIndex + 1} of {quizData.length}
              </div>

              <div className="md:text-[24px] font-medium">
                {currentQuiz.question}
              </div>

              <div className="mt-6 space-y-2 *:block *:w-full *:text-left">
                {currentQuiz.options.map((option, index) => {
                  const label = String.fromCharCode(65 + index);
                  const normalizedLabel = label.toLowerCase();

                  const isCorrectAns =
                    normalizedLabel === currentCorrectAnswer;

                  const isWrongAns =
                    normalizedLabel === currentUserAnswer &&
                    currentUserAnswer !== currentCorrectAnswer;

                  const isChosen = currentUserAnswer === normalizedLabel;

                  return (
                    <button
                      key={label}
                      onClick={() => handleSelectOption(index)}
                      aria-disabled={isResultMode}
                      className={cn(
                        "p-4 rounded-lg bg-neutral-50 text-neutral-800",
                        isChosen && !isResultMode && "bg-neutral text-white",
                        isCorrectAns &&
                          isResultMode &&
                          "bg-green-light border-green text-green border",
                        isWrongAns &&
                          isResultMode &&
                          "bg-red-50 border-red-500 text-red-500 border"
                      )}
                    >
                      <span>{label}. </span>
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-between">
              <div>
                {currentQuizIndex > 0 && (
                  <Button
                    variant={"outline"}
                    onClick={() => setCurrentQuizIndex((index) => index - 1)}
                    className="rounded-full py-2.5 px-[27px] w-[116px] h-11 mt-6 float-right"
                  >
                    Previous
                  </Button>
                )}
              </div>

              {currentQuizIndex === quizData.length - 1 ? (
                <SubmitQuizDialog
                  unanswered={!allQuestAnswered}
                  submitFunction={handleSubmit}
                />
              ) : (
                <Button
                  onClick={() => setCurrentQuizIndex((index) => index + 1)}
                  className="rounded-full py-2.5 px-[27px] w-[116px] h-11 mt-6 float-right"
                >
                  Next
                </Button>
              )}
            </div>
          </div>

          <div className="rounded-lg basis-[40%] ">
            <div className="p-4 border border-neutral-100 max-sm:border-0 sticky top-24">
              <h1 className="text-md">Questions</h1>

              <div className="grid grid-cols-[repeat(auto-fill,74px)] gap-2">
                {quizData.map((_, index) => (
                  <QuestionTag
                    key={index}
                    answered={isAnswered(index)}
                    isCorrect={getIsCorrect(index)}
                    isResultMode={isResultMode}
                    isCurrent={currentQuizIndex === index}
                    onSelect={() => setCurrentQuizIndex(index)}
                  >
                    {index + 1}
                  </QuestionTag>
                ))}
              </div>
            </div>
          </div>
        </div>

        {success && <SuccessResult />}
        {failureResult && <FailureResult />}
      </section>
    </>
  );
};

export default ModuleAssessment
