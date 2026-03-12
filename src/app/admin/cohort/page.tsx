"use client"
import { useSidebar } from '@/context/sidebar.context'

const Page = () => {
  const { toggle } = useSidebar()
  
  return (
    <section className={`${toggle ? 'col-span-9' : 'col-span-8'} border-2 rounded-2xl p-3 overflow-y-scroll no-scrollbar`}>
        <p>COHORT MANAGEMENT</p>
    </section>
  )
}

export default Page
