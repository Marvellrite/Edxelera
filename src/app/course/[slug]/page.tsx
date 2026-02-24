import CourseHeroSection from '@/components/features/course/course-hero-section';
import CourseDetailsSections from '@/components/features/course/course-details-section';

import { Button } from '@/components/ui/button';
import { CourseMode } from '@/types/course';


const CoursePage = () => {


   // TODO: Will fetch course info and use the deriveStateMode to determine mode
   // TODO: Will pass the course info to the course components 

   const mode: CourseMode = 'completed'

   return (
      <section className="">
         <div className="  pb-10 max-md:pt-0 mx-auto">
            <CourseHeroSection mode={mode} />
            <CourseDetailsSections />

            <div className=" flex justify-center mt-10">
               <Button className=" mx-auto py-3 px-2.5 md:w-full lg:w-99 h-14.25
                rounded-[50px]">
                  Add to Cart (₦150,000)
               </Button>
            </div>
         </div>
      </section>
   );
};

export default CoursePage;
