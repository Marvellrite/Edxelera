import { FireCold, FireNone, FireHot } from '@/components/icons/modified'
import { cn } from '@/lib/utils/utils'

export interface StreakProps {
    status: 'active'| 'none' | 'inactive';
    day: 'S' | 'M' |'T' | 'W'| 'T' | 'F' | 'S';
    isCurrentDay?: boolean
}

const StreakDay = ({status, day, isCurrentDay=false}:StreakProps) => {
  return (
    <div style={{flexBasis:'11.7%'}} className=' flex flex-col justify-center gap-1.5 relative'>
        <p className=' text-md font-medium w-fit self-center'>{day}</p>
        <div  className={cn(' relative flex items-center justify-center aspect-square rounded-full ', status==='active'?'bg-streak-fg-active': status==='inactive'?'bg-streak-fg-inactive':'bg-neutral-400')}>{
            status==='active'?<FireHot width={28} height={36}/>: status==='inactive'?<FireCold/>:<FireNone/>
        }
           {
            isCurrentDay &&
        <div className='size-2.25 rounded-full absolute right-0 top-0 bg-streak-active-marker -translate-x-1/2 translate-y-1/2'></div>
        }
        </div>
     
    </div>
  )
}

export default StreakDay