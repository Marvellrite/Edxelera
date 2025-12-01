"use client"

import { useState } from 'react';
import Header from './header';
import { Button } from '@/components/ui/button';
import CourseArrangement from './course_arrangement';
import CourseStartedLearn from './course_started_learn';

export default function Course_started() {

   const [ isLearnOrDetails, setIsLearnOrDetails ] = useState("learn");

   const isLearn = isLearnOrDetails=="learn";
   return (


      <>
         <Header>
            <h1 className="flex gap-x-5 ">
               <span className=" text-[40px] font-medium ">
                  Product Design (UI/UX)
               </span>
            </h1>
         </Header>
         <section className="px-8  py-10 max-md:px-0 max-md:py-0 max-md:mt-8 ">
            <div className="  py-10 max-md:pt-0 pt-5  mx-auto">
               <div>
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
            </div>
         </section>
      </>
   );
}
