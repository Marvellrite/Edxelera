"use client"

import Overview from '@/components/admin_and_instructors/overview/overview'
import BarChartComponent from '@/components/admin_and_instructors/overview/barchart'
import DoughnutChart from '@/components/admin_and_instructors/overview/doughnutchart'
import Performance from '@/components/admin_and_instructors/performance'
// import { useSidebar } from './_context/sidebar'
import { useSidebar } from '@/context/sidebar'

const Page = () => {
  const { toggle } = useSidebar();

  return (
    <section  className={`${toggle ? 'col-span-9' : 'col-span-8'} flex flex-col gap-3 transition-all duration-1000 overflow-y-scroll no-scrollbar mt-5`}>
      <Overview />
      <div className='flex gap-2.5'>
        <BarChartComponent   />
        <DoughnutChart />
      </div>
      <Performance />
    </section>
  )
}

export default Page
