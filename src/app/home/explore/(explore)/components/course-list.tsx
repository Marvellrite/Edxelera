import Video_card from '@/app/home/components/video_card';
import React from 'react'
import { mock_data as mock_data_al } from '../../mock_data';

const CourseList = () => {
   return (
      <section className="">
         {/* For Users that have started learning a course */}

         <div className="  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-3">
            {mock_data_al.map((data, index) => (
               <Video_card key={index} hideCta={true} {...data} />
            ))}
         </div>
      </section>
   );
}

export default CourseList