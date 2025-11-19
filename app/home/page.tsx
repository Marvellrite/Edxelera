import React from 'react';
import VideoPoster from './_components/video_poster';
import { mock_data } from './continue_learning_mock_data';
import { mock_data as mock_data_al } from './also_like_mock_data';
import { Button } from '@/components/ui/button';
import Ratings from './_components/ratings';
import Video_card from './_components/video_card';

const Page: React.FC = () => {
   return (
      <section className="p-6 py-12">
         <div className=" space-y-9">
            <div>
               <p className=" text-md font-normal mb-3">Continue learning</p>
               <div className=" flex h-[252px] gap-3">
                  {mock_data.map((data, index) => (
                     <VideoPoster key={index} {...data} />
                  ))}
               </div>
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

               <div className="  grid grid-cols-1 [@media(min-width:500px)]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {mock_data_al.map((data, index) => (
                     <Video_card key={index} {...data} />
                  ))}
               </div>
            </div>
         </div>
      </section>
   );
};

export default Page;
