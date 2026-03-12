"use client"
import AddNotifySide2 from '@/components/admin_and_instructors/features/notifications/add-notif-side-2'
import AddNotifSide1 from '@/components/admin_and_instructors/features/notifications/add-notif-side-1'
import { useSidebar } from '@/context/sidebar.context'
import CustomAlertDialog from '@/components/admin_and_instructors/features/course/custom-modal'
import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

const Page = () => {
  const { toggle } = useSidebar()
  const [isExitCourseCreationModalOpen, setIsExitCourseCreationModalOpen] = useState(false)
  
  return (
    <section className={`${toggle ? 'col-span-9' : 'col-span-8'} shadow rounded-2xl p-3 overflow-y-scroll no-scrollbar space-y-3 bg-white mt-5`}>
        <p className='space-x-2'>
            <Link onClick={()=>setIsExitCourseCreationModalOpen(true)} href="/Notifications">Notifications</Link> 
            <span>{'//'}</span> <span>Add New Notification</span>
            
        </p>

        <div className='grid grid-cols-2 gap-3'>
            <AddNotifSide1 />
            <AddNotifySide2 />
        </div>

    <div className=' flex justify-between mt-5'>
        <Button variant={'outline'}>Save as Draft</Button>
        <Button variant={'outline'}>Schedule Send</Button>
        <Button>Send Now</Button>
    </div>

        <CustomAlertDialog
           isOpen={isExitCourseCreationModalOpen} 
            onClose={() => setIsExitCourseCreationModalOpen(false)}
            title="Exit Course Creation"
            description="Are you sure you want to exit the course creation page? Your progress will be lost, you can save as draft"
            actionText="Save as Draft"
            cancelText='Leave without Saving'
        />
    </section>
  )
}

export default Page
