"use client"

import { ReactSVG } from 'react-svg'
import { useSidebar } from '@/context/sidebar'
import { MoreCircle } from '@/components/admin_and_instructors/icons/modified'
import { Button } from '@/components/admin_and_instructors/ui/button'
import Pagination from '@/components/admin_and_instructors/ui/pagination'
import { Add } from '@/components/admin_and_instructors/icons/modified'
import {  notificationsExpanded } from '@/mockdata/notifications'
import { cn } from '@/lib/utils'
import Badge from '@/components/admin_and_instructors/ui/custom/badge-1'
import Link from 'next/link'

const Page = () => {
    const { toggle } = useSidebar();

    return (
    <section className={`${toggle ? 'col-span-9' : 'col-span-8'} rounded-2xl py-6 px-4 space-y-3 overflow-y-scroll no-scrollbar mt-5 bg-white shadow`}>
      <div className="flex justify-between">

        <p className='text-lg'>Notification</p>

        <Button asChild> 
            <Link href='/notifications/add-notification'>
                <Add/> New Notification
            </Link> 
        </Button>
      </div>

        <div className='flex items-center mb-8.75 mt-6.25'>
        
                    <div className='flex justify-between items-center gap-2 w-1/2'>
                        <div className='border border-neutral-400 flex items-center gap-2 rounded-full py-1 px-2 h-11 w-full'>
                            <ReactSVG src='/icons/search-outline.svg' />
                            <input type="search" placeholder='Search...' className="h-full w-full outline-none" />
                        </div>
                        {/* <div className='w-fit'> */}
                            <div className='flex items-center gap-2 w-fit border border-neutral-400 rounded-full py-2 px-3 text-nowrap'>
                                <span>Sort by</span>
                                <ReactSVG src='/icons/dropdown.svg' />
                            </div>
                        {/* </div> */}
                        {/* <div className='w-fit'> */}
                            <div className='flex items-center gap-2 w-fit border rounded-full border-neutral-400 py-2 px-3 text-nowrap'>
                                <span>Filter</span>
                                <ReactSVG src='/icons/filter.svg' />
                            </div>
                        {/* </div> */}
                    </div>
                </div>

        <table className="table-auto w-full">
            <thead className="font-bold">
                <tr className='*:py-3'>
                    <td className="pe-5">#</td>
                    <td>Title</td>
                    <td>Delivery Channels</td>
                    <td className=''>Recipient Group</td>
                    <td>Status</td>
                    <td>Date Created</td>
                    <td>Actions</td>
                </tr>
            </thead>
            <tbody>
                {notificationsExpanded.map((_, i) => (
                    <tr key={i} className="border-t space-y-5 *:py-3">
                        <td className="pe-5">{i + 1}</td>
                        <td className="pe-5">{_.title}</td>
                        <td>
                        {_.deliveryChannels.map((_, i)=> <Badge className='bg-neutral-50 text-black' key={i}>{_}</Badge>)}
                        </td>
                        <td>
                            <div className=' flex w-full gap-3 items-center'>
                                <Badge className="bg-neutral-50 text-black">{_.recipientGroups[0]}</Badge>{ _.recipientGroups.length && `+ ${_.recipientGroups.length} others`}
                            </div>
                        </td>
                        <td> <Badge className={cn(_.status==='Sent'&&"bg-success text-success-foreground", _.status==='Scheduled'&&"bg-warning text-warning-foreground", _.status==="Draft"&&'text-black bg-neutral-50')}>{_.status}</Badge></td>
                        <td>{_.dateCreated}</td>
                        <td>
                            <MoreCircle/>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
              <div className=' w-full flex justify-center'><Pagination/></div>
    </section>
  )
}

export default Page
