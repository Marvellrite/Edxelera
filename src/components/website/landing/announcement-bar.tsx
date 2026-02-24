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
    <div className='bg-linear-to-r from-primary via-primary-600 to-primary text-white h-14 flex items-center justify-center px-4 sm-md:px-6 lg:px-10 gap-6 sm-md:-order-1 max-sm-md:order-0 shadow-premium-md'>
        <Link href="/promotion" className='text-white font-medium text-sm sm-md:text-base text-center flex-1'>
          Christmas Awoof. Up to 50% off our courses. Ends in 3d 50m 45s
        </Link>
        
        <button 
          aria-label='Close announcement bar' 
          className='text-white hover:text-white/80 transition-colors flex-shrink-0 p-1' 
          onClick={()=>setIsVisible(false)}
        >
          <ReactSVG src='/icons/x.svg'/>
        </button>
    </div>
  )
}

export default AnnouncementBar
