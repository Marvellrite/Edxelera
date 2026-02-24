'use client';

import { useState } from 'react';
import { mock_data } from './continue_learning_mock_data';
import { mock_data as mock_data_al } from './also_like_mock_data';
import { Button } from '@/components/ui/button';
import Video_card from '../components/video_card';
import Continue_learning_mobile from '../components/continue_learning_mobile';
import StreakDisplay from '@/components/features/streak-display'

const Page: React.FC = () => {
   const [data] = useState(mock_data);

   return (
      <section className="p-6 py-10 space-y-8">
         <div className="rounded-3xl border border-primary/10 bg-linear-to-r from-white to-primary-100/35 p-5 shadow-[0_10px_30px_rgba(0,17,70,0.08)] sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-5">
               <div className="space-y-2">
                  <p className="text-sm text-neutral-700">Welcome back 👋</p>
                  <h1 className="text-3xl font-semibold text-primary">Let’s continue your learning streak</h1>
                  <p className="text-neutral-800">Pick up where you stopped and keep your momentum today.</p>
               </div>
               <div className="flex gap-3">
                  <Button className="px-6">Resume Course</Button>
                  <Button variant="outline" className="px-6">Explore More</Button>
               </div>
            </div>
         </div>

         <div className="space-y-9">
            <div className='flex gap-3 lg:flex-row flex-col'>
               <StreakDisplay/>
               <Continue_learning_mobile data={data} />
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-[0_8px_24px_rgba(4,5,6,0.05)]">
               <div className="text-md font-normal mb-3 flex justify-between h-6 text-center">
                  <span className='flex items-center text-base text-primary font-semibold'>You may also like</span>
                  <Button
                     className="text-center rounded-[500px] text-primary text-base p-0 size-fit"
                     variant={'link'}
                  >
                     See all
                  </Button>
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mock_data_al.map((data, index) => (
                     <Video_card hideCta key={index} {...data} />
                  ))}
               </div>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-[0_8px_24px_rgba(4,5,6,0.05)]">
               <div className="text-md font-normal mb-3">
                  <span className='font-semibold text-primary'>Recently viewed courses</span>
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mock_data_al.map((data, index) => (
                     <Video_card hideCta key={index} {...data} />
                  ))}
               </div>
            </div>
         </div>
      </section>
   );
};

export default Page;
