"use client"
import Image from 'next/image'
import { ReactSVG } from 'react-svg'
import { useSidebar } from '@/context/sidebar'
import { staffMembers } from '@/mockdata/staff-management'
import Pagination from '@/components/common/pagination'
import { Button } from '@/components/ui/button'
import { ArrowDownLinear } from '@/components/admin_and_instructors/icons/modified'
import CustomAlertDialog from '@/components/admin_and_instructors/features/course/custom-modal'
import { useState } from 'react'

const Page = () => {
    const { toggle } = useSidebar()
    const [isSuspendAdminModalOpen, setIsSuspendAdminModalOpen] = useState(false)
    
    const [isSuspendInstructorModalOpen, setIsSuspendInstructorModalOpen] = useState(false)
 
    const [isDeleteAdminModalOpen, setIsDeleteAdminModalOpen] = useState(false)
    
    const [isDeleteInstructorModalOpen, setIsDeleteInstructorModalOpen] = useState(false)
    
  return (
    <section className={`${toggle ? 'col-span-9' : 'col-span-8'} rounded-2xl p-[14px] space-y-3 overflow-y-scroll no-scrollbar bg-white shadow mt-5`}>
        <p className='text-lg'>Staff Management</p>
        
        
                <div className='flex justify-between items-center mb-[35px] mt-[25px]'>
                    
                            <Button className='text-white items-center  h-12.5 flex bg-primary' > 
                                <ArrowDownLinear/>
                                <span>Export CSV</span>
                            </Button>
                
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
                    <td>User</td>
                    <td>Email</td>
                    <td>User ID</td>
                    <td>Role</td>
                    <td>Status</td>
                    <td>Date Added</td>
                    <td>Actions</td>
                </tr>
            </thead>
            <tbody>
                {staffMembers.map((_, i) => (
                    <tr key={i} className="border-t space-y-5 *:py-3 hover:cursor-pointer">
                        <td className="pe-5">{i + 1}</td>
                        <td>
                            <div className='flex items-center gap-2'>
                                <Image src="/photo.png" alt="" width={100} height={100} className='h-10 w-10' />
                                    <p>{_.name}</p>
                                    <small></small>
                            </div>
                        </td>
                        <td>{_.email}</td>
                        <td>{_.userId}</td>
                        <td>{_.role}</td>
                        <td><span className={` ${ _.status==='active'? "bg-success text-success-foreground":"bg-danger text-danger-foreground"} p-2 rounded-lg capitalize`}>{_.status}</span></td>
                        <td>{_.dateAdded}</td>
                        <td>
                            <div className='flex gap-2'>
                                <button onClick={()=>_.role==='Instructor'?setIsSuspendInstructorModalOpen(true): setIsSuspendAdminModalOpen(true)} className='p-0 hover:bg-gray-50 text-black w-7 h-7 items-center justify-center flex rounded-full' title='Suspend Staff'>
                                    <ReactSVG src='/icons/minus.svg' />
                                </button>
                                <button className='p-0 hover:bg-gray-50 text-black w-7 h-7 items-center justify-center flex rounded-full' title='Edit Staff'>
                                    <ReactSVG src='/icons/edit.svg' />
                                </button>
                                <button onClick={()=>_.role==='Instructor'?setIsDeleteInstructorModalOpen(true): setIsDeleteAdminModalOpen(true)} className='p-0 hover:bg-gray-50 text-black w-7 h-7 items-center justify-center flex rounded-full' title='Delete Staff'>
                                    <ReactSVG src='/icons/trash.svg' />
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

         <CustomAlertDialog 
            isOpen={isSuspendAdminModalOpen} 
            onClose={() => setIsSuspendAdminModalOpen(false)}
            title="Suspend Admin"
            description="Are you sure you want to suspend this admin? You can always unsuspend them at any time."
            actionText="Suspend" />
         
         <CustomAlertDialog 
            isOpen={isSuspendInstructorModalOpen} 
            onClose={() => setIsSuspendInstructorModalOpen(false)}
            title="Suspend Admin"
            description="AAre you sure you want to suspend this instructor? You can always unsuspend them at any time."
            actionText="Suspend" />

         <CustomAlertDialog 
            isOpen={isDeleteAdminModalOpen} 
            onClose={() => setIsDeleteAdminModalOpen(false)}
            title="Suspend Admin"
            description="Are you sure you want to delete this admin? You can always unsuspend them at any time."
            actionText="Delete" />
         
         <CustomAlertDialog 
            isOpen={isDeleteInstructorModalOpen} 
            onClose={() => setIsDeleteInstructorModalOpen(false)}
            title="Suspend Admin"
            description="Are you sure you want to delete this instructor? You can always unsuspend them at any time."
            actionText="Delete" />

        <div className=' w-full flex justify-center'><Pagination/></div>

    </section>
  )
}

export default Page
