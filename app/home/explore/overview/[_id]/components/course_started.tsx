"use client"

import { useEffect, useState } from 'react';
import { Dispatch, SetStateAction } from 'react';
import Header from './header';
import { Button } from '@/components/ui/button';
import CourseArrangement from './course_arrangement';
import CourseStartedLearn from './course_started_learn';
import { ReactSVG } from 'react-svg';
import Comment from './comment';
import CommentInput from './comment-input';

export default function Course_started() {

   const [ isLearnOrDetails, setIsLearnOrDetails ] = useState("learn");
   const [ isCourseForumMobileOpen, setIsCourseForumMobileOpen] = useState(false)

   const isLearn = isLearnOrDetails=="learn";
   const isMobile = window.matchMedia("(max-width:768px)").matches;

   useEffect(
      ()=>{

         const toggleCourseforumVisibility = ()=>{
            setIsCourseForumMobileOpen((state)=>{
               console.log(state, isMobile)
                  return state && isMobile
            })

         }

         toggleCourseforumVisibility();

         window.addEventListener("resize", toggleCourseforumVisibility)

          return ()=> window.removeEventListener("resize", toggleCourseforumVisibility);

      }, [isMobile]
   )

   return (


      <>
         <Header>
            <h1 className="flex gap-x-5 items-center justify-between w-full ">
               <span className=" max-md:text-[24px] text-[40px] font-medium  text-center">
                  Product Design (UI/UX)
               </span>
               <div className=' md:hidden'>


               <button onClick={()=>setIsCourseForumMobileOpen((state)=>!state)} className="p-0"><ReactSVG src="/icons/reply.svg"/></button>
                  

               </div>
               
            </h1>
         </Header>
         <section className="px-8  py-10 max-md:px-0 max-md:py-0 max-md:mt-8 relative">
            <div className="  py-10 max-md:pt-0 pt-5  mx-auto">
               <div className=' max-md:pb-10'>
                  <div className=" max-md:mb-4 flex items-center gap-x-3 mb-4 mx-auto rounded-[500px] border border-neutral-200 w-[202px] h-[52px] py-2 px-2.5">
                     <Button variant={`${isLearn?"default":"ghost"}`} onClick={()=>setIsLearnOrDetails("learn")} className=" mx-auto py-3 px-2.5 w-[81px] h-9 rounded-[500px] ">
                        Learn
                     </Button>
                     <Button onClick={()=>setIsLearnOrDetails("details")} variant={`${!isLearn?"default":"ghost"}`} className=" mx-auto py-3 px-2.5 w-[89px] h-9 rounded-[500px]">
                        Details
                     </Button>
                  </div>
                  

               {isLearn?
                  <CourseStartedLearn/>
                       :
                  <CourseArrangement/>

               }
               </div>
               
               <div className=' flex justify-between px-4 md:hidden bottom-0 w-full '>
               
                  <Button className=" bg-neutral-900 rounded-full py-2.5 px-[27px] w-[89px] h-11 ">Previous</Button>
                  <Button className="  rounded-full py-2.5 px-[27px] w-[89px] h-11 ">Next</Button>
               </div>

               {isCourseForumMobileOpen && <CourseForumMobile setShowCourseForum={setIsCourseForumMobileOpen}/>}
            </div>
         </section>
      </>
   );
}


const CourseForumMobile = ({setShowCourseForum}: {setShowCourseForum:  Dispatch<SetStateAction<boolean>>})=> {
   const [isThereText, setIsThereText] = useState(false)

   return (
    <div className=' fixed w-full h-full top-0 left-0 bg-white overflow-y-auto'>
        <div className=' flex justify-between px-4 py-2'>
            
            <button className='p-0' onClick={()=>setShowCourseForum((state)=>!state)}>
            <ReactSVG src='/icons/back-arrow.svg'/>

            </button>
            <div className=" font-medium text-[24px]">Course Forum</div>
            <div></div>
        </div>

         <div className=' mt-5 space-y-8.5'>
            <Comment forMobile={true}/>
            <Comment forMobile={true}/>
            <Comment forMobile={true}/>
         </div>

         <div className=' fixed w-full flex bottom-0 left-0 px-4 bg-white pb-9 pt-4 items-center gap-3'><CommentInput setIsThereText={setIsThereText}/> {isThereText && <button className='p-0'><ReactSVG src='/icons/paper-plane.svg'/></button>}</div>
    </div>
  )
}