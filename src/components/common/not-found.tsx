import {  NotFound} from '@/components/icons/modified'
import { Button } from '@/components/ui/button'
import { ReactNode } from 'react'

interface Props {
    msg?: ReactNode,
    ctaText?: string
}

const CourseNotFound = ({msg, ctaText}:Props) => {

    msg = msg || 'Course not found'
    ctaText = ctaText || 'Explore Courses'

  return (
    <div className=' h-full px-6 flex justify-center flex-col items-center '>
        <div className=''>
           
            <NotFound/>
        </div>
        <div className=' flex flex-col gap-1 mt-6'>
            <span className='font-bold text-md self-center'>No results to show</span>
            <span className=' text-neutral-700 text-center'>{msg}
            </span>
        </div>
        <div className='mt-6'>
        <Button className=' w-90'>{ctaText}</Button>

        </div>
    </div>
  )
}

export default CourseNotFound
