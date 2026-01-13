"use client"

import { useState, useEffect, RefObject } from "react"

import { ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils/utils";

interface Prop {
  observed: RefObject<HTMLDivElement | null>
}

const ScrollToTop = ({observed}:Prop) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(()=>{
    if(observed.current===null) return;
    const observer = new IntersectionObserver(([entry])=>{
      if(entry.isIntersecting) {
        setIsVisible(true)
      }
    }, {threshold: 0.6})

    observer.observe(observed.current)
    return ()=>observer.disconnect()
  }, [observed])

  return (
    <button className={cn(" fixed top-[60%] left-[80%] opacity-0 transition-opacity duration-700 ease-out", isVisible&&" opacity-1")} onClick={()=> window.scroll({
      top: 0,
      behavior: 'smooth',
    })}><ChevronUp/></button>
  )
}

export default ScrollToTop