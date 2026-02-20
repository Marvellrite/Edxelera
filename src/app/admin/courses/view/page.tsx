'use client'

import Course_poster from '@/components/admin_and_instructors/features/course/course-poster';
import Course_arrangement from '@/components/admin_and_instructors/features/course/course-arrangement';

import { Button } from '@/components/admin_and_instructors/ui/button';
import { useSidebar } from '@/context/sidebar';
import Link from 'next/link';

const CourseNotBought = () => {

    const { toggle } = useSidebar()

   return (
      <section id='scroll-container' className={` ${toggle ? 'col-span-9' : 'col-span-8'}  max-md:-mt-5 mt-5  overflow-y-scroll`}>
        <div className="mx-auto rounded-[20px] shadow  bg-white p-[14px] gap-[20px] ">
            <p className='space-x-2'>
                <Link  href="/course">Course Management</Link> 
                <span>{'//'}</span>
                <Link href="/course/add-course">Add New Course</Link>
                 <span>{'//'}</span>
                <Link href="/course/add-course/preview">Preview</Link>
            </p>
         <div className=' px-[32px] '>
            <Course_poster /> 
            <Course_arrangement />

            <div className=" flex justify-between mt-10  max-md:px-0 max-md:py-0">
                <Button variant={"outline"}>Save as draft</Button>
                <Button variant={"outline"}>View Preview</Button>
               <Button>
                  Publish Course
               </Button>
            </div>
         </div>
        </div>
      </section>
   );
};

export default CourseNotBought;
