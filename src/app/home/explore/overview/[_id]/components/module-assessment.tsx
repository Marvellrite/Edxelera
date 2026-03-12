"use client"
import {useState, useEffect, Dispatch, SetStateAction} from 'react'
import Header from './header'
import { Button } from '@/components/ui/button'
import { QuizData } from '../mock-data'
import { QuizType } from '../types'
import { QuizAnswers } from '../types'
import SubmitQuizDialog from '@/components/features/course/quiz/submit-quiz-dialog'
import { ReactSVG } from 'react-svg'
import Textarea from '@/components/data/textarea-noHook'
import { StarRating } from '@/components/common'

const ModuleAssessment = () => {
     const refinedQuizData = QuizData.map((q) => ({
    ...q,
    answered: false
    }));

    const [ quizData, setQuizData ] = useState<QuizType[]>(refinedQuizData);
    const [ currentQuizIndex, setCurrentQuizIndex ] = useState(0);
    const [ userAnswers, setUserAnswers ] = useState<QuizAnswers>({0:"b", 1:"a"});
    const [ allQuestAnswered, setAllQuestAnswered ] = useState<boolean>(false);
    const [ congratulations, setCongratulations ] = useState<boolean>(false);
    const [ oops, setOops ] = useState<boolean>(false);
    const [ showReview, setShowReview ] = useState<boolean>(true);
    const [isResultMode, setIsResultMode] = useState<boolean>(true)
    const currentQuiz = quizData[currentQuizIndex]



    const [expectedAnswers, setExpectedAnswers] = useState<QuizAnswers>({0:"a", 1:"d"})
    const currentCorrectAnswer = expectedAnswers[currentQuizIndex]
    const currentUserAnswer = userAnswers[currentQuizIndex]
    

    useEffect(() => {
    const allAnswered = quizData.every(q => q.answered);
    const id = setTimeout(() => setAllQuestAnswered(allAnswered));
    return () => clearTimeout(id);
}, [quizData]);


    const handleSubmit = async()=>{
        alert("submitted")
        console.log("submitted")
    }

  return (
    <>
         <Header>
            <h1 className="flex gap-x-5 items-center justify-between w-full ">
               <span className=" max-md:text-[24px] text-[40px] font-medium  text-center">
                  Module Asessment
               </span>
               
               
            </h1>
         </Header>
         <section className="px-8  py-10 max-md:px-0 max-md:py-0 max-md:mt-8 relative ">
            <div className="  py-10 max-md:pt-0 pt-5  mx-auto flex gap-5 min-h-full h-full md:flex-row flex-col">
               
                <div className=' rounded-lg max-sm:border-0 border border-neutral-100 p-4 basis-[60%] max-md:basis-[initial] max-md:min-h-{65%] min-h-full'>

                    <div className=' text-md text-neutral font-normal mb-3'>Select the correct answer</div>

                    <div>

                        <div className=' text-900 text-primary-900 font-medium mb-3'>Question {`${currentQuizIndex + 1} of ${quizData.length}` } </div>
                        <div className=' md:text-[24px] font-medium'>{currentQuiz.question}</div>
                        <div className=' list- mt-6 space-y-2 *:block *:w-full *:text-left'>
                            {
                                currentQuiz.options.map((option, index)=>{

                                    const label = String.fromCharCode(65+index);
                                    const isCorrectAns = label.toLowerCase() === currentCorrectAnswer.toLowerCase();
                                    const isWrongAns = (label.toLowerCase() === currentUserAnswer.toLowerCase()) && (label !==currentCorrectAnswer.toLowerCase());

                                    // console.log("current user answers", currentUserAnswer)
                                    // console.log("current expected answers", current)

                                    return (<button key={label} onClick={()=>{ setQuizData((questions)=>{
                                            return questions.map((question, index)=> {return (index==currentQuizIndex? {...question, answered: !question.answered}: question)}
                                            )
                                        });  
                                            setUserAnswers((prev)=>{
                                                const tempAnswers = {...prev};
                                                tempAnswers[currentQuizIndex] = label.toLowerCase();
                                                setTimeout(()=>console.log("User answers:",userAnswers), 2000)
                                                return tempAnswers;
                                            });

                                         }} 
                                            
                                            className={`p-4 rounded-lg bg-neutral-50 text-neutral-800 ${isCorrectAns && isResultMode && 'bg-green-light! border-green! text-green! border'} ${isWrongAns && isResultMode && 'bg-red-light! border-red! text-red! border'} `}>
                                                <span>{label}. </span>{option}
                                            </button>)
                                })
                            }
                            
                        </div>
                    </div>
                    <div className=' flex justify-between'>
                        <div>
                        {
                            currentQuizIndex>0 &&
                        <Button variant={"outline"} onClick={()=>setCurrentQuizIndex((index)=>--index)}  className="  rounded-full py-2.5 px-[27px] w-[116px] h-11 mt-6 float-right">Previous</Button>
                        }
                        </div>
                        {
                            currentQuizIndex==quizData.length-1?
                            <SubmitQuizDialog unanswered={!allQuestAnswered} submitFunction={handleSubmit}/>
                            :
                        <Button onClick={()=>setCurrentQuizIndex((index)=>++index)}  className="  rounded-full py-2.5 px-[27px] w-[116px] h-11 mt-6 float-right">Next</Button>
                        }
                    </div>

                </div>

                <div className=' rounded-lg basis-[40%] '>
                    <div className=' p-4  border border-neutral-100 max-sm:border-0'>
                        <h1 className=' text-md'>Questions</h1>
                        <div className=' grid grid-cols-[repeat(auto-fill,74px)] gap-2'>
                            {quizData.map((_, index)=>{

                                const label = String.fromCharCode(65+index);
                                const isCorrectAns = label.toLowerCase() === currentCorrectAnswer.toLowerCase();
                                const isWrongAns = (label.toLowerCase() === currentUserAnswer.toLowerCase()) && (label !==currentCorrectAnswer.toLowerCase());


                                return<QuestionTag answered={ _.answered} setQuestionState={()=>setCurrentQuizIndex(index)} key={index} className={`${isCorrectAns && isResultMode && "bg-green! text-white"} ${isWrongAns && isResultMode && "bg-red! text-white"}`}>{Number(index)+1}</QuestionTag>

                            })}
                        </div>

                    </div>
                </div>
                
            </div>

            {
                congratulations &&
            <Congratulations/>
            }
            {
                oops &&
            <Oops/>
            }
            {
                showReview && <Review onClose={setShowReview}/>
            }


         </section>
      </>
  )
}

const QuestionTag = ({children, answered=false, setQuestionState, className}:{children:number, answered?:boolean, setQuestionState:(no:number)=>void, className?: string})=>{
    return(
        <button onClick={()=>setQuestionState(children)}  className={`rounded-lg  h-10  ${ answered? "bg-neutral text-white": "bg-neutral-50 text-neutral-700"} font-medium ${className}`}>Q{children}</button> 
    )
}

const Congratulations = ()=>{
    return(
        <div className=' w-full h-full fixed top-0 left-0 overflow-y-auto bg-white max-[990px]:pt-30'>
            <div className=' flex items-center justify-center w-full h-full  max-[990px]:flex-col gap-x-10'>
                <div className=' basis-1/2 h-full flex justify-center items-center max-[990px]:flex-col max-[990px]:'>
                    <h1 className="text-center text-[40px] text-medium mb-5.5 text-black min-[990px]:hidden min-[990px]:w-70% mx-auto">Congratulations</h1>
                    <div className=' min-[990px]:w-[90%] mx-auto min-[990px]:max-w-[450px] max-[990px]:size-[280px]'>
                        <ReactSVG beforeInjection={(svg)=>{ svg.setAttribute('style', 'width:100%;height:100%'); svg.setAttribute('preserveAspectRatio', 'xMidYMid meet'); }} src='/icons/confetti-desktop.svg'/>

                    </div>
                    {/* <ReactSVG className=" md:hidden " src='/icons/confetti-mobile.svg'/> */}
                </div>
                <div className=" basis-1/2">
                    <div className=" rounded-[20px] max-[990px]:border-0 border border-neutral-400 p-5 max-w-[480px] min-[990px]:w-[90%]">
                        <h1 className="text-center text-[40px] text-medium  text-black max-[990px]:hidden mb-7">Congratulations</h1>
                        <p className="text-md font-normal text-center">You scored 93% on the assessment. You can choose to go over this module or move on to the next</p>
                        <div className=" space-y-4 mt-10">

                            <Button className=' h-[50px] w-full text-medium text-white rounded-[500px]'>Next Module</Button>
                            <Button variant="outline" className=' h-[50px] w-full text-medium text-primary rounded-[500px]'>Return to Course</Button>
                            <Button variant="outline" className=' h-[50px] w-full text-medium text-primary rounded-[500px]'>Review Answers</Button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Review = ({onClose}:{onClose:Dispatch<SetStateAction<boolean>>})=>{
    return(
        <div className=' w-full h-full fixed top-0 left-0 overflow-y-auto bg-white '>
            <div className=' flex items-center max-[870px]:justify-start justify-center w-full h-full  max-[870px]:flex-col gap-x-10 max-[870px]:py-5.5 max-[870px]:*:w-[85%] max-[480px]:*:w-full max-[545px]:*:w-[95%]'>
                <div className='  basis-1/2 max-[870px]:basis-auto flex justify-center items-center max-[870px]:flex-col max-[870px]:'>
               
                    <div className=' min-[870px]:w-[90%] mx-auto min-[870px]:max-w-[400px]  max-[870px]:hidden'>
                        <ReactSVG beforeInjection={(svg)=>{ svg.setAttribute('style', 'width:100%;height:100%'); svg.setAttribute('preserveAspectRatio', 'xMidYMid meet'); }} src='/icons/confetti-desktop.svg'/>

                    </div>
                    {/* <ReactSVG className=" md:hidden " src='/icons/confetti-mobile.svg'/> */}
                </div>
                <div className=" basis-1/2 max-md:grow">
                    <div className=" rounded-[20px] max-[870px]:border-0 border border-neutral-400 p-5 max-w-[480px] min-[870px]:w-[90%] max-[870px]:max-w-none mx-auto max-[870px]:px-0">
                        <div className=" space-y-6 max-[870px]:w-[70vw] max-[870px]:mx-auto max-[530px]:w-full max-[480px]:px-3">
                        <h1 className=" w-full text-center text-[40px] text-medium mb-5.5 text-black min-[870px]:hidden  mx-auto flex justify-between "> 
                        <button className="p-0" onClick={()=>onClose((state)=>!state)}>
                            <ReactSVG src="/icons/back-arrow.svg"/>
                        </button> 
                        <span>Write a Review</span> 
                        <span></span>
                    </h1>
                        <p className="text-md font-normal text-left">Kindly write a review and rate the course</p> 

                        <div className=" max-[870px]:mx-auto max-w-[500px] max-[870px]:w-full "><StarRating gap={12} size={58} value={0}/></div>      
                        <Textarea minHeight={'88px'} className="" placeholder='Review' name='review' id='review'  />

                        <Button className=' h-[50px] w-full text-medium text-white rounded-[500px]' type="submit">Submit Review</Button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Oops = ()=>{
    return(
        <div className=' w-full h-full fixed top-0 left-0 overflow-y-auto bg-white max-[990px]:pt-30'>
            <div className=' flex items-center justify-center w-full h-full  max-[990px]:flex-col gap-x-10'>
                <div className=' basis-1/2 h-full flex justify-center items-center max-[990px]:flex-col max-[990px]:'>
                    <h1 className="text-center text-[40px] text-medium mb-5.5 text-black min-[990px]:hidden min-[990px]:w-70% mx-auto">Oops...</h1>
                    <div className=' min-[990px]:w-[90%] mx-auto min-[990px]:max-w-[450px] max-[990px]:size-[280px]'>
                        <ReactSVG beforeInjection={(svg)=>{ svg.setAttribute('style', 'width:100%;height:100%'); svg.setAttribute('preserveAspectRatio', 'xMidYMid meet'); }} src='/icons/sad-emoji.svg'/>

                    </div>
                    {/* <ReactSVG className=" md:hidden " src='/icons/confetti-mobile.svg'/> */}
                </div>
                <div className=" basis-1/2">
                    <div className=" rounded-[20px] max-[990px]:border-0 border border-neutral-400 p-5 max-w-[480px] min-[990px]:w-[90%]">
                        <h1 className="text-center text-[40px] text-medium  text-black max-[990px]:hidden mb-7">Oops...</h1>
                        <p className="text-md font-normal text-center">You scored 29% on the assessment and did not qualify to go to the next module. Kindly take the test again. Note that you have only 2 more trials today</p>
                        <div className=" space-y-4 mt-10">

                            <Button className=' h-[50px] w-full text-medium text-white rounded-[500px]'>Retake Test</Button>
                            <Button variant="outline" className=' h-[50px] w-full text-medium text-primary rounded-[500px]'>Revisit Module</Button>
                            <Button variant="outline" className=' h-[50px] w-full text-medium text-primary rounded-[500px]'>Review Answers</Button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



export default ModuleAssessment

