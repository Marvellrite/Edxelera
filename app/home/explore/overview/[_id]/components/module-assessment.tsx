"use client"
import {useState, useEffect} from 'react'
import Header from './header'
import { Button } from '@/components/ui/button'
import { QuizData } from '../mock-data'
import { QuizType } from '../types'
import { QuizAnswers } from '../types'
import SubmitQuizDialog from './submit_dialogue'
import { ReactSVG } from 'react-svg'

const ModuleAssessment = () => {
     const refinedQuizData = QuizData.map((q) => ({
    ...q,
    answered: false
    }));

    const [ quizData, setQuizData ] = useState<QuizType[]>(refinedQuizData);
    const [ currentQuizIndex, setCurrentQuizIndex ] = useState(0);
    const [ answers, setAnswers ] = useState<QuizAnswers>({});
    const [ allQuestAnswered, setAllQuestAnswered ] = useState<boolean>(false);


    const currentQuiz = quizData[currentQuizIndex]

    
   
    
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

                                    return (<button key={label} onClick={()=>{ setQuizData((questions)=>{
                                            return questions.map((question, index)=> {return (index==currentQuizIndex? {...question, answered: !question.answered}: question)}
                                            )
                                        });  
                                            setAnswers((prev)=>{
                                                const tempAnswers = {...prev};
                                                tempAnswers[currentQuizIndex] = label.toLowerCase();
                                                return tempAnswers;
                                            });

                                         }} 
                                            
                                            className='p-4 rounded-lg bg-neutral-50 text-neutral-800'>
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
                                return<QuestionTag answered={ _.answered} setQuestionState={()=>setCurrentQuizIndex(index)} key={index}>{Number(index)+1}</QuestionTag>

                            })}
                        </div>

                    </div>
                </div>
                
            </div>

            <Congratulations/>
         </section>
      </>
  )
}

const QuestionTag = ({children, answered=false, setQuestionState}:{children:number, answered?:boolean, setQuestionState:(no:number)=>void})=>{
    return(
        <button onClick={()=>setQuestionState(children)}  className={`rounded-lg  h-10  ${ answered? "bg-neutral text-white": "bg-neutral-50 text-neutral-700"} font-medium`}>Q{children}</button> 
    )
}

const Congratulations = ()=>{
    return(
        <div className=' w-full h-full fixed top-0 left-0 overflow-y-auto bg-white max-md:pt-30'>
            <div className=' flex items-center justify-center w-full h-full  max-md:flex-col'>
                <div className=' basis-1/2 h-full flex justify-center items-center max-md:flex-col max-md:'>
                    <h1 className="text-center text-[40px] text-medium mb-5.5 text-black md:hidden">Congratulations</h1>
                    <ReactSVG className=" max-md:hidden " src='/icons/confetti-desktop.svg'/>
                    <ReactSVG className=" md:hidden " src='/icons/confetti-mobile.svg'/>
                </div>
                <div className=" basis-1/2">
                    <div className=" rounded-[20px] max-md:border-0 border border-neutral-400 p-5 max-w-[480px]">
                        <h1 className="text-center text-[40px] md:hidden text-medium mb-5.5 text-black max-md:hidden mb-7">Congratulations</h1>
                        <p className="text-[18px] font-normal text-center">You scored 93% on the assessment. You can choose to go over this module or move on to the next</p>
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



export default ModuleAssessment
