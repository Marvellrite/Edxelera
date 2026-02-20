import { cn } from "@/lib/utils";
import { JSX } from "react"


interface Props {
    icon: JSX.Element,
    title: string,
    numbers: number;
    change: number;
    initialVal: number;
}

const OverviewCard = ({icon, title, numbers, change, initialVal}:Props) => {

    const incrementStatus = change > 0? 1: change < 0? -1 : 0
    const modifiedChange = incrementStatus === 1? `+${change}` : incrementStatus === -1? `-${change}` : change;

  return (
        <article className='bg-white p-3 rounded-xl h-36 flex flex-col justify-between'>
        <div className='flex items-center justify-between'>
            <p className='text-sm'>{title}</p>
            <div className='flex bg-neutral-50 p-1 rounded-full'>{icon}</div>
        </div>

        <div className='flex gap-2 items-center'>
            <h3 className='text-4xl font-semibold'>{numbers.toLocaleString('en-US')}</h3>
            <small className={cn(' rounded-full p-1 text-xs font-semibold', incrementStatus===1 && 'bg-success text-success-foreground', incrementStatus===-1 && 'bg-danger text-danger-foreground'  )}>{modifiedChange}%</small>
        </div>

        <p className='text-xs'>Last Month: <span className='font-semibold'>{initialVal.toLocaleString('en-US')}</span></p>
    </article>
  )
}

export default OverviewCard