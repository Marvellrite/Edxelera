"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactSVG } from 'react-svg'
import { useSidebar } from '@/context/sidebar'
import { DashboardSegment } from './pages/route-utils'

type SidebarProps = {
  segment?: DashboardSegment
}

const Sidebar = ({ segment }: SidebarProps) => {
  const pathname = usePathname()
  const resolvedSegment: DashboardSegment =
    segment ?? (pathname.startsWith('/instructor') ? 'instructor' : 'admin')
  const prefix = `/${resolvedSegment}`

  const dashboard = pathname === prefix
  const course = pathname.startsWith(`${prefix}/courses`)
  const cohort = pathname === `${prefix}/cohort`
  const certificates = pathname === '/certificates'
  const users = pathname === `${prefix}/users`
  const staffs = pathname === `${prefix}/staffs`
  const transactions = pathname === `${prefix}/transactions`
  const reports = pathname === `${prefix}/reports`
  const notifications = pathname === `${prefix}/notifications`
  const support = pathname === `${prefix}/support`
  const settings = pathname === `${prefix}/settings`

  const { toggle, setToggle } = useSidebar()

  return (
    <aside className={`${toggle ? 'md:col-span-1' : 'md:col-span-2'} col-span-1 h-full w-full overflow-y-auto no-scrollbar pt-1 md:pt-5`}>
       <div className={`  bg-white h-full w-full rounded-2xl p-5 transition-all duration-1000 overflow-y-scroll no-scrollbar`}>
        <div className={`${toggle ? 'flex-col-reverse gap-2 mb-4' : ''} flex justify-between items-center`}>
          <p>Learning</p>
          <ReactSVG src='/icons/toggle.svg' className='hover:bg-text-neutral-100 p-2 rounded-xl' onClick={() => setToggle(!toggle)} />
        </div>  
        <ul className='space-y-1 mt-2'>
          <li>
            <Link href={prefix} className={`${ dashboard ? 'bg-primary text-white' : 'hover:bg-text-neutral-100'} ${toggle ? 'justify-center' : ''} flex gap-2 items-center py-3 px-4 rounded-xl group`}>
              <ReactSVG src='/icons/home-outline-white.svg' className='group-hover:rotate-180 duration-500' />
              { !toggle && <span>Dashboard</span>}
            </Link>
          </li>
          <li>
            <Link href={`${prefix}/courses`} className={`${ course ? 'bg-primary text-white' : 'hover:bg-text-neutral-100'} ${toggle ? 'justify-center' : ''} flex gap-2 items-center py-3 px-4 rounded-xl group`}>
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
