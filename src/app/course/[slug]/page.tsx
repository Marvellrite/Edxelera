import CourseHeroSection from '@/components/features/courses/course_poster';
import CourseDetailsSections from '@/components/features/courses/course_arrangement';

import { Button } from '@/components/ui/button';

const CoursePage = () => {
   return (
      <section className="">
         <div className="  py-10 max-md:pt-0 pt-5  mx-auto">
            <CourseHeroSection />
            <CourseDetailsSections />

            <div className=" flex justify-center mt-10">
               <Button className=" mx-auto py-3 px-2.5 w-73 h-10.5 rounded-[500px]">
                  Purchase Course
               </Button>
            </div>
         </div>
      </section>
   );
};

export default CoursePage;
