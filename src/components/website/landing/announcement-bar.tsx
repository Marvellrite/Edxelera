"use client"

import {useState, useEffect} from 'react'
import { ReactSVG } from 'react-svg'
import Link from "next/link"

const AnnouncementBar = () => {
  useEffect(() => {
  console.log('scrollY:', window.scrollY);
}, []);

    const [isVisible, setIsVisible] = useState(true)

    
  return (
    isVisible && 
    <div className='bg-primary text-white h-[94px] flex items-center  justify-between px-4 sm-md:px-12.5 lg:px-10 gap-5 sm-md:-order-1 max-sm-md:order-0'>
        <div className=' hidden lg:block'></div>
        
          <Link href="/promotion" className='  text-white sm-md:font-bold  font-medium text-base lg:text-md text-wrap '>
      Christmas Awoof. Up to 50% off our courses. Ends in 3d 50m 45s | Learn courses from us
          </Link>
        
        <button aria-label='Close announcement bar' className=' text-white hover:text-secondary' onClick={()=>setIsVisible(false)}><ReactSVG src='/icons/x.svg'/></button>
    </div>
    
  )
}

export default AnnouncementBar
