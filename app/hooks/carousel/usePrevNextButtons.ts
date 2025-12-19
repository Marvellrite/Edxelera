import { useCallback, useEffect, useState } from 'react'
import { EmblaCarouselType } from 'embla-carousel'

export const usePrevNextButtons = (emblaApi: EmblaCarouselType) => {
  const [prevDisabled, setPrevDisabled] = useState(true)
  const [nextDisabled, setNextDisabled] = useState(true)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setPrevDisabled(!emblaApi.canScrollPrev())
    setNextDisabled(!emblaApi.canScrollNext())
  }, [emblaApi])

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext()
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return

    onSelect()
    emblaApi
      .on('select', onSelect)
      .on('reInit', onSelect)

  }, [emblaApi, onSelect])

  return {
    scrollPrev,
    scrollNext,
    prevDisabled,
    nextDisabled,
  }
}
