'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { FC } from 'react';
import VideoPoster from './video_poster';
import { Button } from '@/components/ui/button';
import { useDotButtons } from './continue_learning_carousel/carousel_hook';
import { cn } from '@/lib/utils';

interface ContinueLearningProps {
   data: {
      posterSrc: string;
      title: string;
      duration: string;
   }[];
}

const Continue_learning_desktop: FC<ContinueLearningProps> = ({ data }) => {
   const [emblaRef, emblaApi] = useEmblaCarousel({ dragFree: true });
   const { selectedIndex, scrollSnaps, scrollTo } = useDotButtons(emblaApi!);

   return (
      <div className="flex flex-col gap-3">
         <div ref={emblaRef} className="overflow-hidden rounded-2xl h-60">
            <div className="flex h-full flex-nowrap gap-0">
               {data.map((item, index) => (
                  <VideoPoster key={index} {...item} />
               ))}
            </div>
         </div>

         {scrollSnaps.length > 1 && (
            <div className="flex items-center justify-center gap-1.5 pt-0.5">
               {scrollSnaps.map((_, index) => (
                  <Button
                     key={index}
                     onClick={() => scrollTo(index)}
                     className={cn(
                        'h-2 min-w-0 rounded-full p-0 transition-all duration-200',
                        index === selectedIndex
                           ? 'w-5 bg-primary'
                           : 'w-2 bg-neutral-400 hover:bg-neutral-500'
                     )}
                  />
               ))}
            </div>
         )}
      </div>
   );
};

export default Continue_learning_desktop;
