"use client"

import {useEffect, useRef}  from 'react'
import { useNavScrollStore } from '@/stores';

const NavbarWatcher = () => {

    const setNavScrolled = useNavScrollStore((state)=>state.setIsNavScrolled)
    const watcherRef = useRef<HTMLDivElement|null>(null)

    useEffect(()=>{
        const observer = new IntersectionObserver(([entry])=>{
           setNavScrolled(!entry.isIntersecting)
        })

        if(watcherRef.current===null) return;
        observer.observe(watcherRef.current)
        return ()=> {if(watcherRef.current===null) return; observer.unobserve(watcherRef.current)}
    }, [setNavScrolled])

  return (
    <div ref={watcherRef} className=' absolute w-full h-0 invisible pointer-events-none bg-red top-[250px]'>
      
    </div>
  )
}

export default NavbarWatcher
