"use client"

import { useEffect, useState } from 'react';
import { Dispatch, SetStateAction } from 'react';
// import Header from './header';
import { Button } from '@/components/ui/button';
import CourseDetailsSection from '@/components/features/course/course-details-section';
import CourseLearningPanel from '@/components/features/course/course_learning-panel';
import { ReactSVG } from 'react-svg';
import CommunityComment from '@/components/features/community/comment';
import CommunityCommentInput from '@/components/features/community/comment-input';

export default function Course_started() {

   const [ isLearnOrDetails, setIsLearnOrDetails ] = useState("learn");
   const [ isCourseForumMobileOpen, setIsCourseForumMobileOpen] = useState(false)

   const isLearn = isLearnOrDetails=="learn";

   useEffect(() => {
      const media = window.matchMedia("(max-width:768px)");
      const handleViewportChange = (event: MediaQueryListEvent) => {
         if (!event.matches) {
            setIsCourseForumMobileOpen(false);
         }
      };

      media.addEventListener("change", handleViewportChange);

      return () => media.removeEventListener("change", handleViewportChange);
   }, []);

      const [isModuleLocked, setIsModuleLocked ] = useState(true)


   return (


      <>
         <section className="  max-md:px-0 max-md:py-0 max-md:mt-8 relative w-full">
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
                  <CourseLearningPanel/>
                       :
                  <CourseDetailsSection/>

               }
               </div>
               
               <div className=' flex justify-between px-4 md:hidden bottom-0 w-full '>
               
               { isModuleLocked?
                     <Button className="  rounded-full py-2.5 px-[27px] w-full h-11 ">Go to previous modules</Button>
               
                  :
                  <div>

                     <Button className=" bg-neutral-900 rounded-full py-2.5 px-[27px] w-[89px] h-11 ">Previous</Button>
                     <Button className="  rounded-full py-2.5 px-[27px] w-[89px] h-11 ">Next</Button>
                  </div>
               }

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
            <ReactSVG src='https://res.cloudinary.com/dx5iohojj/image/upload/v1773340455/repo-images/public/icons/back-arrow.svg'/>

            </button>
            <div className=" font-medium text-[24px]">Course Forum</div>
            <div></div>
        </div>

         <div className=' mt-5 space-y-8.5'>
            <CommunityComment forMobile={true}/>
            <CommunityComment forMobile={true}/>
            <CommunityComment forMobile={true}/>
         </div>

         <div className=' fixed w-full flex bottom-0 left-0 px-4 bg-white pb-9 pt-4 items-center gap-3'><CommunityCommentInput setIsThereText={setIsThereText}/> {isThereText && <button className='p-0'><ReactSVG src='https://res.cloudinary.com/dx5iohojj/image/upload/v1773340555/repo-images/public/icons/paper-plane.svg'/></button>}</div>
    </div>
  )
}
