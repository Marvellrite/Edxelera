'use client';

import { useState, useEffect } from 'react';
import { mock_data as mock_data_al } from '../mock_data';
import Video_card from '../../components/video_card';

const Page: React.FC = () => {
   const [data, setData] = useState(mock_data_al);
   //    useEffect(() => {
   //       const fetchData = async () => {
   //          const response = await fetch('/continue_learning_data');
   //          const result = await response.json();
   //          setData(result);
   //       };
   //       fetchData();
   //    }, []);

   return (
      <section className="p-6 py-12">
         {/* For Users that have started learning a course */}

         <div className="  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-3">
            {data.map((data, index) => (
               <Video_card key={index} {...data} />
            ))}
         </div>
      </section>
   );
};

export default Page;
