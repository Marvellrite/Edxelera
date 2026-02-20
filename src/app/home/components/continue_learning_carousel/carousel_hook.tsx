import { useCallback, useState, useEffect } from 'react';
import { EmblaCarouselType } from 'embla-carousel';

export const useDotButtons = (emblApi: EmblaCarouselType) => {
   const [selectedIndex, setSelectedIndex] = useState(0);
   const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

   const onSelect = useCallback(() => {
      if (!emblApi) return;
      setSelectedIndex(emblApi.selectedScrollSnap());
   }, [emblApi]);

   const onInit = useCallback(() => {
      if (!emblApi) return;
      setScrollSnaps(emblApi.scrollSnapList());
   }, [emblApi]);

   useEffect(() => {
      if (!emblApi) return;
      onInit();
      emblApi.on('reInit', onInit).on('reInit', onSelect).on('select', onSelect);

   }, [emblApi, onInit, onSelect]);

   const scrollTo = useCallback(
      (index: number) => {
         if (!emblApi) return;
         emblApi.scrollTo(index);
      },
      [emblApi],
   );

   return { selectedIndex, scrollSnaps, scrollTo };
};

export const dot_buttons = () => {
   return <div>dot_buttons</div>;
};
