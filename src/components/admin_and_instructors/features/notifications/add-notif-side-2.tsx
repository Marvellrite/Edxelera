"use client"
import {  FolderAdd, } from "@/components/admin_and_instructors/icons/modified"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Lesson } from "@/types/course"
import InputAnimated from "@/components/admin_and_instructors/ui/custom/input-animated-1"
import { Checkbox } from "@/components/admin_and_instructors/ui/custom/checkbox"

interface ProgressStatus {
  EmailNotif: boolean;
  PushNotif: boolean;
  InAppNotif: boolean;
}


const AddNotifySide2 = () => {

  const [progressStatus, setProgressStatus] = useState<ProgressStatus>({EmailNotif: false, PushNotif: false, InAppNotif: false})

  return (
    <div className=' bg-white border border-neutral-50 rounded-2xl p-3 space-y-3 h-fit'>
        <p>New Notifiation</p>

        <form className='grid gap-2 px-2'>
            <InputAnimated placeholder="Body"/>
            <fieldset className={` border rounded-lg py-1 px-2 h-36 relative flex flex-col`}>
                <span className=" text-neutral-700">Upload file (optional)</span>
                <div className=' grow text-center'>
                    <div className=' flex justify-center mb-3'> <FolderAdd/> </div>
                    <div className=' mb-1 text-neutral-800 text-[14px]'>Click or drag and drop file</div>
                    <div className=" text-neutral-600 text-[12px] font-normal">PNG, JPEG, WEBP, SVG, PDF, DOC, DOCX, PPTX</div>
                </div>
                <label className='absolute w-full h-full' htmlFor="thumbnail"></label>
                <input id='thumbnail' type="file"  className='outline-none border-none opacity w-0 h-0 pointer-events-none fixed z' />
            </fieldset>

            <div>
            <p className='text-neutral-700 mb-2.5 text-[14px]'>Delivery Channel</p>
            <div className=' space-y-1.5 *:w-fit'>
                <div><Checkbox checked={progressStatus.EmailNotif} label='Email Notification' onChange={(checked)=>{setProgressStatus((state)=>({...state, EmailNotif: checked }))}}/></div>
                <div><Checkbox checked={progressStatus.PushNotif} label='Push Notification' onChange={(checked)=>{setProgressStatus((state)=>({...state, PushNotif: checked }))}}/></div>
                <div><Checkbox checked={progressStatus.InAppNotif} label='In-app Notification' onChange={(checked)=>{setProgressStatus((state)=>({...state, InAppNotif: checked }))}}/></div>
                

            </div>
            </div>
        </form>
    </div>
  )
}

export default AddNotifySide2