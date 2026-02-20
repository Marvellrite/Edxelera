"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactSVG } from 'react-svg'
import { useSidebar } from '@/context/sidebar'

const Sidebar = () => {
  const pathname = usePathname()
  const dashboard = pathname === '/admin'
  const course = pathname.startsWith('/admin/course')
  const cohort = pathname === '/admin/cohort'
  const certificates = pathname === '/certificates'
  const users = pathname === '/admin/users'
  const staffs = pathname === '/admin/staffs'
  const transactions = pathname === '/admin/transactions'
  const reports = pathname === '/admin/reports'
  const notifications = pathname === '/admin/notifications'
  const support = pathname === '/admin/support'
  const settings = pathname === '/admin/settings'

  const { toggle, setToggle } = useSidebar()

  return (
    <aside className={` ${toggle ? 'col-span-1' : 'col-span-2'} h-full w-full overflow-y-scroll no-scrollbar   no-scrollbar pt-5`}>
       <div className={`  bg-white h-full w-full rounded-2xl p-5 transition-all duration-1000 overflow-y-scroll no-scrollbar`}>
        <div className={`${toggle ? 'flex-col-reverse gap-2 mb-4' : ''} flex justify-between items-center`}>
          <p>Learning</p>
          <ReactSVG src='/icons/toggle.svg' className='hover:bg-text-neutral-100 p-2 rounded-xl' onClick={() => setToggle(!toggle)} />
        </div>  
        <ul className='space-y-1 mt-2'>
          <li>
            <Link href='/' className={`${ dashboard ? 'bg-primary text-white' : 'hover:bg-text-neutral-100'} ${toggle ? 'justify-center' : ''} flex gap-2 items-center py-3 px-4 rounded-xl group`}>
              <ReactSVG src='/icons/home-outline-white.svg' className='group-hover:rotate-180 duration-500' />
              { !toggle && <span>Dashboard</span>}
            </Link>
          </li>
          <li>
            <Link href='/admin/courses' className={`${ course ? 'bg-primary text-white' : 'hover:bg-text-neutral-100'} ${toggle ? 'justify-center' : ''} flex gap-2 items-center py-3 px-4 rounded-xl group`}>
              <ReactSVG src='/icons/book-outline.svg' className='group-hover:rotate-y-180 duration-500' />
              { !toggle && <span>Course Management</span>}
            </Link>
          </li>
          <li>
            <Link href='/admin/cohort' className={`${ cohort ? 'bg-primary text-white' : 'hover:bg-text-neutral-100'} ${toggle ? 'justify-center' : ''} flex gap-2 items-center py-3 px-4 rounded-xl group`}>
              <ReactSVG src='/icons/people-outline.svg' className='group-hover:rotate-y-180 duration-500' />
              { !toggle && <span>Cohort Management</span>}
            </Link>
          </li>
          <li>
            <Link href='/admin/certificates' className={`${ certificates ? 'bg-primary text-white' : 'hover:bg-text-neutral-100'} ${toggle ? 'justify-center' : ''} flex gap-2 items-center py-3 px-4 rounded-xl group`}>
              <ReactSVG src='/icons/award-outline.svg' className='group-hover:rotate-y-180 duration-500' />
              { !toggle && <span>Certificates</span>}
            </Link>
          </li>
        </ul>

        <p className={`${toggle ? 'text-center' : ''} mt-4`}>Users</p>
        <ul className='space-y-1 mt-2'>
          <li>
            <Link href='/admin/users' className={`${ users ? 'bg-primary text-white' : 'hover:bg-text-neutral-100'} ${toggle ? 'justify-center' : ''} flex gap-2 items-center py-3 px-4 rounded-xl group`}>
              <ReactSVG src='/icons/user-outline.svg' className='group-hover:rotate-y-180 duration-500' />
              { !toggle && <span>User Management</span>}
            </Link>
          </li>
          <li>
            <Link href='/admin/staffs' className={`${ staffs ? 'bg-primary text-white' : 'hover:bg-text-neutral-100'} ${toggle ? 'justify-center' : ''} flex gap-2 items-center py-3 px-4 rounded-xl group`}>
              <ReactSVG src='/icons/users-outline.svg' className='group-hover:rotate-y-180 duration-500' />
              { !toggle && <span>Staff Management</span>}
            </Link>
          </li>
        </ul>

        <p className={`${toggle ? 'text-center' : ''} mt-4`}>Insights</p>
        <ul className='space-y-1 mt-2'>
          <li>
            <Link href='/admin/transactions' className={`${ transactions ? 'bg-primary text-white' : 'hover:bg-text-neutral-100'} ${toggle ? 'justify-center' : ''} flex gap-2 items-center py-3 px-4 rounded-xl group`}>
              <ReactSVG src='/icons/receipt-outline.svg' className='group-hover:rotate-y-180 duration-500' />
              { !toggle && <span>Transactions</span>}
            </Link>
          </li>
          <li>
            <Link href='' className={`${ reports ? 'bg-primary text-white' : 'hover:bg-text-neutral-100'} ${toggle ? 'justify-center' : ''} flex gap-2 items-center py-3 px-4 rounded-xl group`}>
              <ReactSVG src='/icons/chart-outline.svg' className='group-hover:rotate-y-180 duration-500' />
              { !toggle && <span>Reports & Analytics</span>}
            </Link>
          </li>
        </ul>

        <p className={`${toggle ? 'text-center' : ''} mt-4`}>Settings <span className={`${toggle ? 'hidden' : ''}`}>& Communication</span></p>
        <ul className='space-y-1 mt-2'>
          <li>
            <Link href='/admin/notifications' className={`${ notifications ? 'bg-primary text-white' : 'hover:bg-text-neutral-100'} ${toggle ? 'justify-center' : ''} flex gap-2 items-center py-3 px-4 rounded-xl group`}>
              <ReactSVG src='/icons/notification-outline.svg' className='group-hover:rotate-y-180 duration-500' />
              { !toggle && <span>Notifications</span>}
            </Link>
          </li>
          <li>
            <Link href='' className={`${ support ? 'bg-primary text-white' : 'hover:bg-text-neutral-100'} ${toggle ? 'justify-center' : ''} flex gap-2 items-center py-3 px-4 rounded-xl group`}>
              <ReactSVG src='/iconsadmin/port-outline.svg' className='group-hover:rotate-y-180 duration-500' />
              { !toggle && <span>Support</span>}
            </Link>
          </li>
          <li>
            <Link href='' className={`${ settings ? 'bg-primary text-white' : 'hover:bg-text-neutral-100'} ${toggle ? 'justify-center' : ''} flex gap-2 items-center py-3 px-4 rounded-xl group`}>
              <ReactSVG src='/iconsadmin/ting-outline.svg' className='group-hover:rotate-180 duration-500' />
              { !toggle && <span>Settings</span>}
            </Link>
          </li>
        </ul>
      </div>
    </aside>
     
  )
}

export default Sidebar