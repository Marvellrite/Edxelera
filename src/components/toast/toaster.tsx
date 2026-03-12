'use client'
import { ReactSVG } from "react-svg"
import SuccessIcon from "@/components/toast/icons/Success.icons"
import ErrorIcon from "@/components/toast/icons/Error.icons"
import { ToastOptions } from "react-toastify"
import { string } from "zod"

interface Props {
    msg: {
        title: string,
        body: string
    }
}

export const SuccessToast = ({msg:{title, body}}: Props)=>{
    return(
    <div className="w-full space-y-1 bg-green-light text-green p-4">

        <div className="flex gap-2 items-center ">
            <ReactSVG src="https://res.cloudinary.com/dx5iohojj/image/upload/v1773340598/repo-images/public/icons/success.toaster.svg"/>
            <div className=" text-[16px] font-medium">{title}</div>
        </div>

        <div className=" text-[14px] font-normal mt-2">
            {body}
        </div>
    </div>
    )
}


export const ErrorToast = ({msg:{title, body}}: Props)=>{
    return(
    <div className="w-full space-y-1 bg-red-light text-red p-4">

        <div className="flex gap-2 items-center ">
            <ReactSVG src="https://res.cloudinary.com/dx5iohojj/image/upload/v1773340476/repo-images/public/icons/error.toaster.svg"/>
            <div className=" text-[16px] font-medium">{title}</div>
        </div>

        <div className=" text-[14px] font-normal mt-2">
            {body}
        </div>
    </div>
    )
}

