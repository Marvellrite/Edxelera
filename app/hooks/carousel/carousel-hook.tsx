import { useCallback, useState, useEffect } from 'react';
import { EmblaCarouselType } from 'embla-carousel';

export const useEmblaHelpers = (emblaApi: EmblaCarouselType) => {
   const [selectedIndex, setSelectedIndex] = useState(0);
   const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
   const [prevDisabled, setPrevDisabled] = useState(true)
   const [nextDisabled, setNextDisabled] = useState(true)

   const onSelect = useCallback(() => {
      if (!emblaApi) return;
      setSelectedIndex(emblaApi.selectedScrollSnap());
      setPrevDisabled(!emblaApi.canScrollPrev())
      setNextDisabled(!emblaApi.canScrollNext())
   }, [emblaApi]);

   const onInit = useCallback(() => {
      if (!emblaApi) return;
      setScrollSnaps(emblaApi.scrollSnapList());
   }, [emblaApi]);

   const scrollPrev = useCallback(() => {
      emblaApi?.scrollPrev()
   }, [emblaApi])

   const scrollNext = useCallback(() => {
      emblaApi?.scrollNext()
   }, [emblaApi])

   useEffect(() => {
      if (!emblaApi) return;
      onInit();
      onSelect();
      emblaApi.on('reInit', onInit).on('reInit', onSelect).on('select', onSelect);

   }, [emblaApi, onInit, onSelect]);

   const scrollTo = useCallback(
      (index: number) => {
         if (!emblaApi) return;
         emblaApi.scrollTo(index);
      },
      [emblaApi],
   );

      return { 
      selectedIndex, 
      scrollSnaps, 
      scrollTo, 
      scrollPrev,
      scrollNext,
      prevDisabled,
      nextDisabled, 
   };
};
