'use client'
import useEmblaCarousel from 'embla-carousel-react';

import { useState, useEffect, FC } from 'react';
import VideoPoster from './video_poster';
import { mock_data } from '../(home)/continue_learning_mock_data';
import { Button } from '@/components/ui/button';
import { useDotButtons } from './continue_learning_carousel/carousel_hook';

interface ContinueLearningProps {
   data: {
      posterSrc: string;
      title: string;
      duration: string;
   }[];
}

const Continue_learning_desktop: FC<ContinueLearningProps> = ({ data }) => {
   const [emblaRef, emblaApi] = useEmblaCarousel({
      dragFree: true,
   });
   const { selectedIndex, scrollSnaps, scrollTo } = useDotButtons(emblaApi!);

   return (
      <div className=" basis-1/2 grow ">
         <div className=" text-md font-normal mb-3 flex justify-between items-center">
            <div className='text-base text-primary'>Continue learning</div>{' '}
            <div className=" space-x-2">
               {/* <Button className=" p-0 bg-primary w-4 h-[8px] rounded-[4px]" active/>{' '}
               <Button className=" p-0 bg-neutral-400 h-[8px] w-[8px] rounded-[4px]" /> */}
               {scrollSnaps.map((_, index) => (
                  <Button
                     key={index}
                     className={` hover:cursor-pointer p-0 rounded-sm h-2   ${index === selectedIndex ? 'bg-primary w-4' : 'bg-neutral-400 w-2'}`}
                     onClick={() => scrollTo(index)}
                  />
               ))}
            </div>
         </div>
         <div ref={emblaRef} className=" overflow-x-hidden rounded-lg overflow-hidden">
            <div className=" flex h-63 flex-nowrap w-full  gap-0 ">
               {data.map((data, index) => (
                  <VideoPoster key={index} {...data} />
               ))}
            </div>
         </div>
      </div>
   );
};

export default Continue_learning_desktop;
