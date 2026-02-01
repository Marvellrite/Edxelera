import Course_poster from './course_poster';
import Course_arrangement from './course_arrangement';

import { Button } from '@/components/ui/button';

const CourseNotBought = () => {
   return (
      <section className="px-8 xl:px-15 py-10 max-md:px-0 max-md:py-0 max-md:-mt-5 ">
         <div className="  py-10 max-md:pt-0 pt-5  mx-auto">
            <Course_poster /> 
            <Course_arrangement />

            <div className=" flex justify-center mt-10">
               <Button className=" mx-auto py-3 px-2.5 w-73 h-10.5 rounded-[500px]">
                  Purchase Course
               </Button>
            </div>
         </div>
      </section>
   );
};

export default CourseNotBought;
