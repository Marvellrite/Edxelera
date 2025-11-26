import formatMoney from '@/utils/formatMoney';
import Video_poster from '../components/video_poster';
import Course_arrangement from '../components/course_arrangement';

const page = () => {
   return (
      //   <section className="px-8 py-10 flex gap-y-10">
      <section className="px-8 py-10 max-md:px-0 max-md:py-0 max-md:-mt-5 ">
         <div className=" space-y-10 py-10 max-md:pt-0 ">
            <Video_poster />
            <Course_arrangement />
         </div>
      </section>
   );
};

export default page;
