import React from 'react'
import { courses } from '@/mockdata/performance'


const Performance = () => {
  return (
    <section className='bg-white rounded-2xl p-3.5 h-fit space-y-5'>
        <p className='text-lg'>Top Performing Courses</p>

        <table className="table-auto w-full">
            <thead className="font-bold">
                <tr className='*:py-3'>
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
                    <tr key={i} className="border-t space-y-5 *:py-3.5 border-neutral-50">
                        <td className="pe-5">{i + 1}</td>
                        <td>{__.courseId}</td>
                        <td>{__.courseTitle}</td>
                        <td><span className={` ${__.status==="active"?"bg-success text-success-foreground":"bg-danger text-danger-foreground"}  p-2 rounded-lg capitalize`}>{__.status}</span></td>
                        <td>{__.enrollment}</td>
                        <td>{__.price}</td>
                        <td>{__.totalRevenue}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </section>
  )
}

export default Performance
