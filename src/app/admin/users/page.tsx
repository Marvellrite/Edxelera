"use client"
import Image from 'next/image'
import { ReactSVG } from 'react-svg'
// import { useSidebar } from '../_context/sidebar'
import { useSidebar } from '@/context/sidebar.context'
import { users } from '@/mockdata/user-management'
// import { Badge } from '@/components/ui/badge'
import { Badge } from '@/components/admin_and_instructors/ui/badge'
import { ArrowDownLinear, X } from '@/components/admin_and_instructors/icons/modified'
import { Button } from '@/components/ui/button'
import { Pagination } from '@/components/common'
import { useState } from 'react'
import { Dialog } from '@/components/admin_and_instructors/ui/custom/dialog'

const Page = () => {
    const { toggle } = useSidebar();
    const [isEditUserOpen, setIsEditUserOpen ] = useState(false)

    return (
    <section className={`${toggle ? 'col-span-9' : 'col-span-8'} rounded-2xl py-6 px-4 space-y-3 overflow-y-scroll no-scrollbar mt-5 bg-white shadow`}>
        <p className='text-lg'>User Management</p>

        <div className='flex justify-between items-center mb-[35px] mt-[25px]'>

                    <Button className='text-white items-center  h-12.5 flex bg-primary' > 
                        <ArrowDownLinear/>
                        <span>Export CSV</span>
                    </Button>
        
                    <div className='flex justify-between items-center gap-2 w-1/2'>
                        <div className='border border-neutral-400 flex items-center gap-2 rounded-full py-1 px-2 h-11 w-full'>
                            <ReactSVG src='https://res.cloudinary.com/dx5iohojj/image/upload/v1773340576/repo-images/public/icons/search-outline.svg' />
                            <input type="search" placeholder='Search...' className="h-full w-full outline-none" />
                        </div>
                        {/* <div className='w-fit'> */}
                            <div className='flex items-center gap-2 w-fit border border-neutral-400 rounded-full py-2 px-3 text-nowrap'>
                                <span>Sort by</span>
                                <ReactSVG src='https://res.cloudinary.com/dx5iohojj/image/upload/v1773340473/repo-images/public/icons/dropdown.svg' />
                            </div>
                        {/* </div> */}
                        {/* <div className='w-fit'> */}
                            <div className='flex items-center gap-2 w-fit border rounded-full border-neutral-400 py-2 px-3 text-nowrap'>
                                <span>Filter</span>
                                <ReactSVG src='https://res.cloudinary.com/dx5iohojj/image/upload/v1773340483/repo-images/public/icons/filter.svg' />
                            </div>
                        {/* </div> */}
                    </div>
                </div>

        <table className="table-auto w-full">
            <thead className="font-bold">
                <tr className='*:py-3'>
                    <td className="pe-5">#</td>
                    <td>User</td>
                    <td>User ID</td>
                    <td className='ps-8'>Course Access</td>
                    <td>Role</td>
                    <td>Status</td>
                    <td>Date Joined</td>
                    <td>Actions</td>
                </tr>
            </thead>
            <tbody>
                {users.map((_, i) => (
                    <tr key={i} className="border-t space-y-5 *:py-3">
                        <td className="pe-5">{i + 1}</td>
                        <td>
                            <div className='flex items-center gap-2'>
                                <Image src={_.avatar} alt="" width={100} height={100} className='h-10 w-10 rounded-full' />
                                <div>
                                    <p>{_.name}</p>
                                    <small>{_.email}</small>
                                </div>
                            </div>
                        </td>
                        <td>{_.userId}</td>
                        <td className=' flex flex-nowrap h-full items-center mb-0 py-0 mt- px-8'>
                            <Badge className='flex items-center bg-neutral-50 text-black px-4 py-1 text-base'>{_.courseAccess[0]?.courseName ?? 'Nil'} {
                                _.courseAccess[0]?.courseName &&<button className='p-0 ps-1 pt-1'><X/></button> }</Badge>  {
                                _.courseAccess[0]?.courseName &&
                                 <span className=' ms-3' > +{[ ..._.courseAccess].length-1} other{[ ..._.courseAccess].length-1>1?'s':""}</span>
                            
                            }           
                        </td>
                        <td>{_.role}</td>
                        <td><span className={` ${_.status==="active"?"bg-success text-success-foreground":_.status==="suspended"?"bg-danger text-danger-foreground":"bg-neutral text-black"} p-2 rounded-lg capitalize `}>{_.status}</span></td>
                        <td>{_.dateJoined}</td>
                        <td>
                            <div className='flex gap-2'>
                                <div className='hover:bg-gray-50 text-black w-7 h-7 items-center justify-center flex rounded-full'>
                                    <ReactSVG src='https://res.cloudinary.com/dx5iohojj/image/upload/v1773340539/repo-images/public/icons/minus.svg' />
                                </div>
                                <div className='hover:bg-gray-50 text-black w-7 h-7 items-center justify-center flex rounded-full'>
                                    <ReactSVG src='https://res.cloudinary.com/dx5iohojj/image/upload/v1773340474/repo-images/public/icons/edit.svg' />
                                </div>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
              <div className=' w-full flex justify-center'><Pagination/></div>

              <Dialog isOpen={isEditUserOpen} title='Edit User' onClose={()=>{}}
                footer={<div className=' w-full'><Button className=' w-full'>Save</Button></div>}>

              </Dialog>
    </section>
  )
}

export default Page
