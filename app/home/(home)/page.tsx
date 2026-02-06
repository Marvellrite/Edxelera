'use client';

import { useState, useEffect } from 'react';
import VideoPoster from '../components/video_poster';
import { mock_data } from './continue_learning_mock_data';
import { mock_data as mock_data_al } from './also_like_mock_data';
import { Button } from '@/components/ui/button';
import Ratings from '../components/ratings';
import Video_card from '../components/video_card';
import Continue_learning_desktop from '../components/continue_learning_desktop';
import Continue_learning_mobile from '../components/continue_learning_mobile';
import StreakDisplay from '@/components/features/streak-display'

const Page: React.FC = () => {
   const [data, setData] = useState(mock_data);
   //    useEffect(() => {
   //       const fetchData = async () => {
   //          const response = await fetch('/continue_learning_data');
   //          const result = await response.json();
   //          setData(result);
   //       };
   //       fetchData();
   //    }, []);

   return (
      <section className="p-6 py-12 ">

         <>
         {/* For Users that have started learning a course */}

          <div className=" space-y-9">
            {/* <Continue_learning_desktop data={data} /> */}
            <div className=' flex gap-3'>

               <StreakDisplay/>
               <Continue_learning_mobile data={data} />
            </div>
            <div>
               <div className=" text-md font-normal mb-3 flex justify-between">
                  <span>You may also like</span>
                  <Button
                     className=" rounded-[500px] text-accent"
                     variant={'ghost'}
                  >
                     See all
                  </Button>
               </div>

               <div className="  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-3">
                  {mock_data_al.map((data, index) => (
                     <Video_card key={index} {...data} />
                  ))}
               </div>
            </div>
            <div>
               <div className=" text-md font-normal mb-3">
                  <span>Recently viewed courses</span>
               </div>

               <div className="  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-3">
                  {mock_data_al.map((data, index) => (
                     <Video_card key={index} {...data} />
                  ))}
               </div>
            </div>
         </div>

         
         </>
          

         <>
         {/* For Users that have not started learning a course yet */}
         
          {/* <div className=" space-y-9">
            <div className=" h-[252px] bg-primary rounded-xl flex items-end">
               <div className=" mt-auto flex justify-between items-end text-white p-6 pb-7 basis-full max-md:flex-col max-md:items-start max-md:gap-4 max-md:px-4 max-md:py-3.5">
                  <div className=" space-y-2">
                     <h1 className=" text-[24px] max-md:mb-1">
                        Product Design (UI/UX)
                     </h1>
                     <div className=" font-bold text-md">&#8358;150,000.00</div>
                     <div>8 weeks</div>
                  </div>
                  <div>
                     <Button className="bg-white rounded-[500px] h-[47px] w-[147px] text-primary py-3 px-2.5 font-medium text-[14px]">
                        Enroll Now
                     </Button>
                  </div>
               </div>
            </div>

            <div>
               <div className=" text-md font-normal mb-3 flex justify-between">
                  <span>Explore our courses</span>
                  <Button
                     className=" rounded-[500px] text-accent"
                     variant={'ghost'}
                  >
                     See all
                  </Button>
               </div>

               <div className="  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-3">
                  {mock_data_al.map((data, index) => (
                     <Video_card key={index} {...data} />
                  ))}
               </div>
            </div>
         </div>  */}
         
         </>

      </section>
   );
};

export default Page;
