"use client"

import React, {ClipboardEvent, useRef, useState} from 'react'
import { isOtpvalid } from '@/lib/utils/is-otp-valid'

interface Props {
  length: number,
  onChange?:(otp:string[])=>void,
  onComplete?:(otp:string[])=>void,
  inputMode: 'numeric'|'alphanumeric'
}

export const OtpInputGroup = ({length, onChange, inputMode='alphanumeric', onComplete}:Props) => {

  const [otp, setOtp] = useState<string[]>(Array(length).fill(''))
  const inputsRef = useRef<Array<HTMLInputElement|null>>([])
  
  const handleChange = (value:string, index:number)=>{
    const char = value.slice(-1);

    if (!isOtpvalid(char, inputMode)) {
      return
    }

    const nextOtp = [...otp];
    nextOtp[index] = value
    setOtp(nextOtp) 

    if(index === length-1) {
      return onComplete?.(nextOtp);
    }

    inputsRef.current[index+1]?.focus()
    return onChange?.(nextOtp)
  }


  const handlePaste = (e: ClipboardEvent<HTMLInputElement>)=>{
    if(!inputsRef.current.every(Boolean) || inputsRef.current.length === 0) return

    e.preventDefault()

    const nextOtp:string[] = []

    const pastedText = e.clipboardData.getData("text").split('').filter((text)=>isOtpvalid(text, inputMode)).slice(0, length)

    if(pastedText.length===0) return

    let lastOtpIndex = 0

    pastedText.forEach((char, index)=>{
      if(inputsRef.current[index])
      nextOtp[index] = char
      lastOtpIndex = index
    })

    setOtp(nextOtp)
    onChange?.(nextOtp)

    inputsRef.current![lastOtpIndex]?.focus()

    if(lastOtpIndex===length){
      onComplete?.(nextOtp)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index:number)=>{
    if(e.key==='Backspace'){
      if(otp[index]){
        const nextOtp = [...otp]
        nextOtp[index] = ''
        setOtp(nextOtp)
      }
      else{
        inputsRef.current[index-1]?.focus()
      }
    }
  }

//   const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>)=>{
//   e.target.blur() // Immediately remove focus
// }

  const handleOtpClick = ()=>{
    const emptyIndex = otp.findIndex((_)=>!Boolean(_));
    const targetIndex = emptyIndex !==-1? emptyIndex : otp.length - 1
    inputsRef.current[targetIndex]?.focus()
  }

  const handleMouseDown =(e:React.MouseEvent)=>{
    e.preventDefault()
  }

  return (
    <div className=' flex gap-2 *:rounded-full *:bg-white *:py-4 *:px-5 w-full  *:aspect-59/53 justify-between *:w-12 flex-1' onClick={handleOtpClick} onMouseDown={handleMouseDown}>
        {
          otp.map((_, index)=><input key={index} type='text' value={otp[index]} style={{flexBasis:`${1/length*100-3}%`}} onChange={(e)=>handleChange(e.target.value, index)} ref={(el:null|HTMLInputElement)=>{inputsRef.current[index]=el}} onPaste={handlePaste} maxLength={1} onKeyDown={(e)=>handleKeyDown(e, index)} autoComplete='one-time-code' className="text-center  px-0! hover:bg-neutral-50/70"  />)
        }
    </div>
  )
}
