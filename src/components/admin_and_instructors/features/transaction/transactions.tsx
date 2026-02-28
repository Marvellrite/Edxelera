import React from 'react'
import { transactions } from '@/mockdata/transactions'
import formatMoney from '@/lib/utils/formatMoney'


const Performance = () => {
  return (
    <section className='bg-white rounded-2xl p-3.5 h-fit space-y-5'>
        <p className='text-lg'>Transactions</p>

        <table className="table-auto w-full">
            <thead className="font-bold">
                <tr className='*:py-3'>
                    <td className="pe-5">#</td>
                    <td>Email</td>
                    <td>Course title</td>
                    <td>Cohort</td>
                    <td>Amount</td>
                    <td>Date/Time</td>
                    <td>Status</td>
                </tr>
            </thead>
            <tbody>
                {transactions.map((__, i) => (
                    <tr key={i} className="border-t space-y-5 *:py-3.5 border-neutral-50">
                        <td className="pe-5">{i + 1}</td>
                        <td>{__.email}</td>
                        <td>{__.courseTitle}</td>
                        <td>{__.cohort}</td>
                        <td>{formatMoney(__.amount)}</td>
                        <td>{__.dateTime}</td>
                        <td><span className={` ${__.status==="Successful"?"bg-success text-success-foreground":__.status==="Pending"?"bg-warning text-warning-foreground":"bg-danger text-danger-foreground"}  p-2 rounded-lg capitalize`}>{__.status}</span></td>
                    </tr>
                ))}
            </tbody>
        </table>
    </section>
  )
}

export default Performance
