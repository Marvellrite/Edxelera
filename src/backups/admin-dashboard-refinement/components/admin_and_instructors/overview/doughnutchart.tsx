"use client"
import { useState } from 'react';
import { useLayer } from 'react-laag'
import { ReactSVG } from 'react-svg';
import { Pie, PieChart, Tooltip } from 'recharts';

const data = [
  { name: 'Corporate Branding & Design', value: 100, fill: '#FC61C7' },
  { name: 'Back End Development', value: 86, fill: '#50A0FF' },
  { name: 'Product Design', value: 75, fill: 'var(--color-primary)' },
  { name: 'Full Stack Development', value: 95, fill: '#7F00D4' },
  { name: 'Social Media Marketing', value: 30, fill: '#FF6200' },
  { name: 'WordPress Development', value: 45, fill: '#040506' },
  { name: 'Data Analytics', value: 55, fill: '#494949' },
  { name: 'Front End Development', value: 80, fill: '#800002' }
];

const DoughnutChart = () => {

    const [isTimeRangePopper, setIsTimeRangePopper] = useState(false)
    // const [referenceElement, setReferenceElement] = useState<HTMLButtonElement | null>(null);
    // const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);

     function closeTimeRangePopper() {
    setIsTimeRangePopper(false);
  }

     const {
    renderLayer,
    triggerProps,
    layerProps,
  } = useLayer({
    isOpen:isTimeRangePopper,
    onOutsideClick: closeTimeRangePopper, // close the menu when the user clicks outside
    onDisappear: closeTimeRangePopper, // close the menu when the menu gets scrolled out of sight
    overflowContainer: false, // keep the menu positioned inside the container
    auto: true, // automatically find the best placement
    placement: "bottom-start", // we prefer to place the menu "top-end"
    triggerOffset: 12, // keep some distance to the trigger
    containerOffset: 16, // give the menu some room to breath relative to the container
  });


  return (
    <section className=' bg-white rounded-2xl p-3.5  space-y-4 flex flex-col   grow shrink' style={{ flexBasis: "calc((496 / (632 + 496)) * 100%)" }}
>
        <div className='flex justify-between items-center'>
            <p className='text-lg'>Course Engagement</p>
            <button {...triggerProps} onClick={()=>setIsTimeRangePopper((_)=>!_)}  className='flex items-center gap-2 rounded-full border border-neutral-400 py-2 px-5 text-sm'>
                <span>All time</span>
                <ReactSVG src='https://res.cloudinary.com/dx5iohojj/image/upload/v1773340473/repo-images/public/icons/dropdown.svg' afterInjection={svg => svg.setAttribute('width', '14')} />
            </button>
        </div>
        
        <div className='flex items-center gap-5 w-auto grow'>
            <PieChart className='basis-1/2 aspect-square mt-9' responsive>
                <Tooltip />
                <Pie
                    data={data}
                    innerRadius="70%"
                    outerRadius="100%"
                    stroke='none'
                    // Corner radius is the rounded edge of each pie slice
                    cornerRadius="7%"
                    fill="#8884d8"
                    // padding angle is the gap between each pie slice
                    paddingAngle={3}
                    dataKey="value"
                    isAnimationActive
                />
            </PieChart>

            <div className='text-sm grid gap-2 grow'>
                <p className='flex items-center gap-2'>
                    <span className='flex h-3 w-3 bg-primary rounded
                    
                    -full'></span>
                    <span>Product Design</span>
                </p>
                <p className='flex items-center gap-2'>
                    <span className='flex h-3 w-3 bg-[#800002] rounded-full'></span>
                    <span>Front End Development</span>
                </p>
                <p className='flex items-center gap-2'>
                    <span className='flex h-3 w-3 bg-[#040506] rounded-full'></span>
                    <span>WordPress Development</span>
                    
                </p>
                <p className='flex items-center gap-2'>
                    <span className='flex h-3 w-3 bg-[#494949] rounded-full'></span>
                    <span>Data Analytics</span>
                </p>
                <p className='flex items-center gap-2'>
                    <span className='flex h-3 w-3 bg-[#7F00D4] rounded-full'></span>
                    <span>Full Stack Development</span>
                </p>
                <p className='flex items-center gap-2'>
                    <span className='flex h-3 w-3 bg-[#50A0FF] rounded-full'></span>
                    <span>Back End Development</span>
                </p>
                <p className='flex items-center gap-2'>
                    <span className='flex h-3 w-3 bg-[#FF6200] rounded-full'></span>
                    <span>Social Media Marketing</span>
                </p>
                <p className='flex items-center gap-2'>
                    <span className='flex h-3 w-3 bg-[#FC61C7] rounded-full'></span>
                    <span>Corporate Branding & Design</span>
                </p>
            </div>
        </div>

{ isTimeRangePopper &&
    renderLayer(<div className=' bg-white' {...layerProps}  
         >
            <ul className=' list-none p-3 text-neutral-700 text-[18px] font-medium'>
                <li ><button className=' p-3.5 rounded-full' onClick={()=>closeTimeRangePopper()}>All time</button></li>
                <li ><button className=' p-3.5 rounded-full' onClick={()=>closeTimeRangePopper()}>This week</button></li>
                <li ><button className=' p-3.5 rounded-full' onClick={()=>closeTimeRangePopper()}>This month</button></li>
                <li ><button className=' p-3.5 rounded-full' onClick={()=>closeTimeRangePopper()}>This year</button></li>
            </ul>
        </div>)
        

}
    </section>
  )
}

export default DoughnutChart
