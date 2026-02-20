"use client"
import { Checkbox } from '@/components/ui/custom/checkbox';
import InputAnimated from '@/components/ui/custom/input-animated-1';
import Select from '@/components/ui/custom/select'
import { useState } from 'react';


interface ProgressStatus {
  NotStarted: boolean;
  InProgress: boolean;
  Completed: boolean;
  FailedExam: boolean
}

const AddNotifSide1 = () => {

  const [progressStatus, setProgressStatus] = useState<ProgressStatus>({NotStarted: false, InProgress: false, Completed: false, FailedExam: false})
    
  return (
    <section className='border border-neutral-50 rounded-2xl p-3 space-y-3 h-fit'>
        <p>New Notificaion</p>

        <form className='grid gap-3 grid-cols-2 '>
          <div className=' col-span-2'>

            <InputAnimated placeholder='Title' id='title' />
          </div>
            <Select
              label='Recipient'
              value='All users'
              options={[
                { value: 'all', key: 'All Users' },
                { value: 'learners', key: 'Learners' },
                { value: 'admins', key: 'Admins' },
                { value: 'cohort', key: 'By Cohort' },
                { value: 'course', key: 'By Course' },
                { value: 'enrollment', key: 'By Enrollment Status' },
                { value: 'individual', key: 'Individual Users' }
              ]}
              onChange={(selectedOption)=>{console.log(selectedOption)}}
              className=' cols-span-1'
            />
            <Select
              label='Recipient'
              value='All users'
              options={[
                { value: 'course_enrolled', key: 'Course Enrolled' },
                { value: 'cohort', key: 'Cohort' },
                { value: 'progress', key: 'Progress' },
                { value: 'payment_status', key: 'Payment Status' },
                { value: 'location', key: 'Location' },
              ]}
              onChange={(selectedOption)=>{console.log(selectedOption)}}
              className=' cols-span-1'
            />
            <div>
              <p className=' text-neutral-700 mb-2.5 text-[14px]'>Progress</p>
              <div className='flex flex-col gap-1.5 *:w-fit'>
              <div><Checkbox checked={progressStatus.NotStarted} label='Not Started' onChange={(checked)=>{setProgressStatus((state)=>({...state, NotStarted: checked }))}}/></div>
              <div><Checkbox checked={progressStatus.InProgress} label='In Progress' onChange={(checked)=>{setProgressStatus((state)=>({...state, InProgress: checked }))}}/></div>
              <div><Checkbox checked={progressStatus.Completed} label='Completed' onChange={(checked)=>{setProgressStatus((state)=>({...state, Completed: checked }))}}/></div>
              <div><Checkbox checked={progressStatus.FailedExam} label='Failed Exam' onChange={(checked)=>{setProgressStatus((state)=>({...state, FailedExam: checked }))}}/></div>
              </div>
            </div>
        </form>
    </section>
  )
}

export default AddNotifSide1



