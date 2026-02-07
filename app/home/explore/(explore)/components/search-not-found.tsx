import React from 'react'
import {  NotFound} from '@/components/icons/modified'

const CourseNotFound = () => {
  return (
    <div className=' h-full px-6 items-center flex flex-col gap-10 pt-12'>
        <div className=''>
           
            <NotFound/>
        </div>
        <div className=' flex flex-col gap-1 '>
            <span className='font-bold text-md self-center'>No results to show</span>
            <span className=' text-neutral-700 text-center'>
                Please check the spelling or try a <br/> different key word
            </span>
        </div>
    </div>
  )
}

export default CourseNotFound