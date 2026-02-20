"use client"
import { ReactSVG } from 'react-svg'

const Overview = () => {
  return (
    <section className=' '>
        <p className='text-lg'>Overview</p>

        <div className='grid grid-cols-4 gap-3 mt-3'>
            <article className='bg-white p-3 rounded-xl h-36 flex flex-col justify-between'>
                <div className='flex items-center justify-between'>
                    <p className='text-sm'>Total Users</p>
                    <ReactSVG src='/icons/user-outline.svg' className='flex bg-neutral-50 p-1 rounded-full' afterInjection={(svg) => {svg.setAttribute('width', '16'); svg.setAttribute('height', '16')}} />
                </div>

                <div className='flex gap-2 items-center'>
                    <h3 className='text-4xl font-semibold'>20,000</h3>
                    <small className='bg-success rounded-full p-1 text-xs text-success-foreground font-semibold'>+4.9%</small>
                </div>

                <p className='text-xs'>Last Month: <span className='font-semibold'>19,892</span></p>
            </article>

            <article className='bg-white p-3 rounded-xl h-36 flex flex-col justify-between'>
                <div className='flex items-center justify-between'>
                    <p className='text-sm'>Active Learners</p>
                    <ReactSVG src='/icons/teacher.svg' className='flex bg-neutral-50 p-1 rounded-full' />
                </div>

                <div className='flex gap-2 items-center'>
                    <h3 className='text-4xl font-semibold'>16,487</h3>
                    <small className='bg-success rounded-full p-1 text-xs text-success-foreground font-semibold'>+4.9%</small>
                </div>

                <p className='text-xs'>Last Month: <span className='font-semibold'>13,892</span></p>
            </article>

            <article className='bg-white p-3 rounded-xl h-36 flex flex-col justify-between'>
                <div className='flex items-center justify-between'>
                    <p className='text-sm'>Course Completion Rate</p>
                    <ReactSVG src='/icons/pie.svg' className='flex bg-neutral-50 p-1 rounded-full' />
                </div>

                <div className='flex gap-2 items-center'>
                    <h3 className='text-4xl font-semibold'>87%</h3>
                    <small className='bg-danger rounded-full p-1 text-xs text-danger-foreground font-semibold'>-4.9%</small>
                </div>

                <p className='text-xs'>Last Month: <span className='font-semibold'>92%</span></p>
            </article>

            <article className='bg-white p-3 rounded-xl h-36 flex flex-col justify-between'>
                <div className='flex items-center justify-between'>
                    <p className='text-sm'>Total Revenue</p>
                    <ReactSVG src='/icons/money-receive.svg' className='flex bg-neutral-50 p-1 rounded-full' />
                </div>

                <div className='flex gap-2 items-center'>
                    <h3 className='text-4xl font-semibold'>900,400</h3>
                    <small className='bg-success rounded-full p-1 text-xs text-success-foreground font-semibold'>+4.9%</small>
                </div>

                <p className='text-xs'>Last Month: <span className='font-semibold'>840,000</span></p>
            </article>
        </div>
    </section>
  )
}

export default Overview
