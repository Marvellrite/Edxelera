"use client"

import {useState} from 'react'
import { ReactSVG } from 'react-svg'
import { Button } from '../ui/button'

const AnnouncementBar = () => {
    const [isVisible, setIsVisible] = useState(true)
  return (
    isVisible && 
    <div className='bg-primary text-white h-[94px] flex items-center justify-between px-10'>
        <div></div>
        <Button variant={"link"} className=' text-white font-bold text-md '>
      Christmas Awoof. Up to 50% off our courses. Ends in 3d 50m 45s | Learn courses from us
        </Button>
        <button aria-label='Close announcement bar' className=' text-white ' onClick={()=>setIsVisible(false)}><ReactSVG src='/icons/x.svg'/></button>
    </div>
    
  )
}

export default AnnouncementBar
