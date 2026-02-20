import React from 'react'
import { Clock, X } from '@/components/icons/modified'

const IsSearching = () => {
  return (
    <div className=' h-full pt-6'>
        <div className=' mb-4 text-neutral-800'>Recent Searches</div>
        <div className=' flex flex-col text-md text-neutral-700'>
            <div className='flex justify-between h-14.75'>
                    {/* A recent search item */}
                <div className=' flex items-center gap-2'> <Clock/> <span>Product Design</span></div>
                <button className='p-0'><X/></button>
            </div>
            <div className='flex justify-between h-14.75'>
                    {/* A recent search item */}
                <div className=' flex items-center gap-2'> <Clock/> <span>Web Design</span></div>
                <button className='p-0'><X/></button>
            </div>

        </div>
    </div>
  )
}

export default IsSearching