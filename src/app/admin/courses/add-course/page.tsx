"use client"

import AddLesson from '@/components/admin_and_instructors/addlesson'
import AddModules from '@/components/admin_and_instructors/addmodules'
import { useSidebar } from '@/context/sidebar'
import CustomAlertDialog from '@/components/admin_and_instructors/features/course/custom-modal'
import Link from 'next/link'
import { useState } from 'react'

const Page = () => {
  const { toggle } = useSidebar()
  const [isExitCourseCreationModalOpen, setIsExitCourseCreationModalOpen] = useState(false)
  
  return (
    <section className={`${toggle ? 'col-span-9' : 'col-span-8'} shadow rounded-2xl p-3 overflow-y-scroll no-scrollbar space-y-3 bg-white mt-5`}>
        <p className='space-x-2'>
            <Link onClick={()=>setIsExitCourseCreationModalOpen(true)} href="/course">Course Management</Link> 
            <span>{'//'}</span>
            <Link href="/course/add-course">Add New Course</Link>
        </p>

        <div className='grid grid-cols-2 gap-3'>
            <AddModules />
            <AddLesson />
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
