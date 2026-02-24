import React from 'react'
import { courses } from '@/mockdata/performance'


const Performance = () => {
  return (
    <section className='bg-white rounded-xl border border-neutral-200 p-6 h-fit space-y-5 shadow-premium-sm'>
        <p className='text-lg font-semibold text-neutral-900'>Top Performing Courses</p>

        <table className="table-auto w-full">
            <thead>
                <tr className='*:py-3 *:text-left *:text-sm *:font-semibold *:text-neutral-900 border-b border-neutral-200 bg-neutral-50'>
                    <td className="pe-5">#</td>
                    <td>Course ID</td>
                    <td>Course title</td>
                    <td>Status</td>
                    <td>Enrolment</td>
                    <td>Price</td>
                    <td>Total Revenue</td>
                </tr>
            </thead>
            <tbody>
                {courses.map((__, i) => (
                    <tr key={i} className="border-b border-neutral-200 *:py-4 *:text-sm hover:bg-neutral-50 transition-colors duration-150">
                        <td className="pe-5 text-neutral-700 font-medium">{i + 1}</td>
                        <td className='text-neutral-700'>{__.courseId}</td>
                        <td className='text-neutral-800 font-medium'>{__.courseTitle}</td>
                        <td><span className={` ${__.status==="active"?"bg-green-50 text-green-700":"bg-red-50 text-red-700"} px-3 py-1 rounded-lg capitalize text-xs font-medium`}>{__.status}</span></td>
                        <td className='text-neutral-700'>{__.enrollment}</td>
                        <td className='text-neutral-700'>{__.price}</td>
                        <td className='text-neutral-900 font-semibold'>{__.totalRevenue}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </section>
  )
}

export default Performance
