import Video_poster from '../components/video_poster';
import Course_arrangement from '../components/course_arrangement';

import { Button } from '@/components/ui/button';

const page = () => {
   return (
      //   <section className="px-8 py-10 flex gap-y-10">
      <section className="px-8 py-10 max-md:px-0 max-md:py-0 max-md:-mt-5 ">
         <div className=" space-y-10 py-10 max-md:pt-0 ">
            <Video_poster />
            <Course_arrangement />

            <div className=" flex justify-center ">
               <Button className=" mx-auto py-3 px-2.5 w-[292px] h-[42px] rounded-[500px]">
                  Purchase Course
               </Button>
            </div>
         </div>
      </section>
   );
};

export default page;
