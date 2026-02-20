"use client"
import Overview from '@/components/admin_and_instructors/features/transaction/overview'
import Transactions from '@/components/admin_and_instructors/features/transaction/transactions'
// import { useSidebar } from '../_context/sidebar'
import { useSidebar } from '@/context/sidebar'
import Pagination from '@/components/admin_and_instructors/ui/pagination'

const Page = () => {
  const { toggle } = useSidebar();

  return (
    <section  className={`${toggle ? 'col-span-9' : 'col-span-8'} flex flex-col gap-3 transition-all duration-1000 overflow-y-scroll no-scrollbar mt-5 rounded-4xl`}>
      <Overview />
      <Transactions />
       <div className=' w-full flex justify-center'><Pagination/></div>
    </section>
  )
}

export default Page
