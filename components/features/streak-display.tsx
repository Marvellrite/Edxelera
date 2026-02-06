import React from 'react'
import { Flash } from '../icons/modified'
import StreakDay, { StreakProps } from '../ui/custom/streak-day'

const streakData:StreakProps[] = [{
    day:'S', status: 'active'
}, {
    day:'M', status: 'inactive'
}, {
    day:'T', status: 'active'
}, {
    day:'W', status: 'active'
}, {
    day:'T', status: 'none', isCurrentDay: true
}, {
    day:'F', status: 'none'
},
{
    day:'S', status: 'none'
},
]

const StreakDisplay = () => {
  return (
    <div className=' grow basis-1/2'>
        <p className=' pb-3 pt-1 text-primary '>Your Streak</p>
        <div className=' rounded-lg bg-streak-surface h-full px-4.5 py-13.5'>
            <div className='space-y-6'>
            <div className=' flex gap-2.5 items-center'>
                <Flash/>
                <span className=' font-medium text-[26px]'>
                    2 days
                </span>
            </div>

            <div className=' flex w-full justify-between'>
                {
                    streakData.map((_, i)=>
                    
                        <StreakDay key={i} {..._} />
                    )
                }
            </div>

            </div>
        </div>

    </div>
  )
}

export default StreakDisplay