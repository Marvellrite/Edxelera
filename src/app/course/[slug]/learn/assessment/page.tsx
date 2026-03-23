"use client"
import {useState, Dispatch, SetStateAction} from 'react'
import { Button } from '@/components/ui/button'
import { QuizData } from '@/mockdata/quiz'
import { QuizType } from '@/types/quiz'
import { QuizAnswers } from '@/types/quiz'
import SubmitQuizDialog from '@/components/features/course/quiz/submit-quiz-dialog'
import { ReactSVG } from 'react-svg'
import Textarea from '@/components/data/textarea-no-hook'
import { Rating } from '@/components/common'
import SuccessResult from '@/components/features/course/quiz/success-result'
import FailureResult from '@/components/features/course/quiz/failure-result'
import { cn } from '@/lib/utils'

const EXPECTED_ANSWERS: QuizAnswers = { 0: "a", 1: "d" };


const ModuleAssessment = () => {
  const quizData: QuizType[] = QuizData;

  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<QuizAnswers>({});
  const [success, setSuccess] = useState(false);
  const [failureResult, setFailureResult] = useState(false);
  const [showReview, setShowReview] = useState(false);
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

          <div className="rounded-lg basis-[40%]">
            <div className="p-4 border border-neutral-100 max-sm:border-0">
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
        {showReview && <Review onClose={setShowReview} />}
      </section>
    </>
  );
};

const QuestionTag = ({
    children,
    answered=false,
    isCorrect = null,
    isResultMode = false,
    onSelect,
    isCurrent
}:{
    children:number,
    answered?:boolean,
    isCorrect?: boolean | null,
    isResultMode?: boolean,
    onSelect:()=>void,
    isCurrent?: boolean
})=>{
    return(
        <button
            type="button"
            onClick={onSelect}
            className={cn(
                'rounded-lg h-10 font-medium',
                answered ? "bg-neutral text-white" : "bg-neutral-50 text-neutral-700",
                isResultMode && isCorrect === true && "bg-green text-white",
                isResultMode && isCorrect === false && "bg-red-500 text-white",
                isCurrent && 'border border-secondary text-secondary'
            )}
        >
            Q{children}
        </button>
    )
}

const Review = ({onClose}:{onClose:Dispatch<SetStateAction<boolean>>})=>{
    return(
        <div className=' w-full h-full fixed top-0 left-0 overflow-y-auto bg-white '>
            <div className=' flex items-center max-[870px]:justify-start justify-center w-full h-full  max-[870px]:flex-col gap-x-10 max-[870px]:py-5.5 max-[870px]:*:w-[85%] max-[480px]:*:w-full max-[545px]:*:w-[95%]'>
                <div className='  basis-1/2 max-[870px]:basis-auto flex justify-center items-center max-[870px]:flex-col max-[870px]:'>

                    <div className=' min-[870px]:w-[90%] mx-auto min-[870px]:max-w-[400px]  max-[870px]:hidden'>
                        <ReactSVG beforeInjection={(svg)=>{ svg.setAttribute('style', 'width:100%;height:100%'); svg.setAttribute('preserveAspectRatio', 'xMidYMid meet'); }} src='https://res.cloudinary.com/dx5iohojj/image/upload/v1773340470/repo-images/public/icons/confetti-desktop.svg'/>

                    </div>
                    {/* <ReactSVG className=" md:hidden " src='https://res.cloudinary.com/dx5iohojj/image/upload/v1773340471/repo-images/public/icons/confetti-mobile.svg'/> */}
                </div>
                <div className=" basis-1/2 max-md:grow">
                    <div className=" rounded-[20px] max-[870px]:border-0 border border-neutral-400 p-5 max-w-[480px] min-[870px]:w-[90%] max-[870px]:max-w-none mx-auto max-[870px]:px-0">
                        <div className=" space-y-6 max-[870px]:w-[70vw] max-[870px]:mx-auto max-[530px]:w-full max-[480px]:px-3">
                        <h1 className=" w-full text-center text-[40px] text-medium mb-5.5 text-black min-[870px]:hidden  mx-auto flex justify-between ">
                        <button className="p-0" onClick={()=>onClose((state)=>!state)}>
                            <ReactSVG src="https://res.cloudinary.com/dx5iohojj/image/upload/v1773340455/repo-images/public/icons/back-arrow.svg"/>
                        </button>
                        <span>Write a Review</span>
                        <span></span>
                    </h1>
                        <p className="text-md font-normal text-left">Kindly write a review and rate the course</p>

                        <div className=" max-[870px]:mx-auto max-w-[500px] max-[870px]:w-full "><Rating gap={12} size={58} value={0}/></div>
                        <Textarea minHeight={'88px'} className="" placeholder='Review' name='review' id='review'  />

                        <Button className=' h-[50px] w-full text-medium text-white rounded-[500px]' type="submit">Submit Review</Button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}




export default ModuleAssessment
